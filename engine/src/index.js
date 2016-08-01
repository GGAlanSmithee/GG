// /* @flow */

// todo make DI not be hardcoded
import DI from './DI/browser'

const COMPONENT = {
    TRANSFORM: 'transform',
    APPEARANCE: 'appearance'
}

export default class GG {
    constructor() {
    	// width and height set to 500 just to have it as in the editor for the time being
    	this.width  = 500
    	this.height = 500

        this.entityManager   = DI.entityManager()
        this.loopManager     = DI.loopManager()
        this.rendererManager = DI.rendererManager()
        this.loader			 = DI.loader()
        
        this.dom = this.rendererManager.getDom()
        
        this.initComponents()
        this.initSystems()
        
        this.entityManager.onInit({renderManager: this.rendererManager})
        
        this.loopManager.setUpdate(delta => {
            this.entityManager.onLogic(delta)
        }).setRender(interpolationPercentage => {
            this.entityManager.onRender({delta : interpolationPercentage, renderManager: this.rendererManager})
            this.rendererManager.render(interpolationPercentage)
        })
    }
    
    setEntityData(entityData) {
        this.entityData = entityData
    }

    initComponents() {
        this.entityManager.registerComponent(COMPONENT.TRANSFORM,  {x: 0, y: 0, z: 0})
        this.entityManager.registerComponent(COMPONENT.APPEARANCE, {id: 0})
    }
    
    initSystems() {
        const renderComponents = [
            COMPONENT.TRANSFORM,
            COMPONENT.APPEARANCE
        ]
        
        const render = (entities, {renderManager}) => {
            for (const {entity} of entities) {
                const {appearance, transform} = entity
                
                const obj = renderManager.scene.getObjectById(appearance.id)
                
                if (obj === undefined) {
                    continue
                }
                
                obj.position.x = transform.x
                obj.position.y = transform.y
                obj.position.z = transform.z
            }
        }
        
        this.entityManager.registerRenderSystem(renderComponents, render)
    }
    
    initEntities(parsedScene) {
        parsedScene.traverse((obj) => {
		    let config = this.entityManager.build()
			    
		    config.withComponent(COMPONENT.TRANSFORM, function() {
		        this.x = obj.position.x
		        this.y = obj.position.y
		        this.z = obj.position.z
	        })
	        
	        //todo: make only visible objects get this
	        if (obj.id && obj.visible) {
	            config.withComponent(COMPONENT.APPEARANCE, function() {
    	           this.id = obj.id
    	        })
	        }
	        
	        const components = this.entityData[obj.uuid]

			if (components) {	        
			    Object.keys(components).forEach(key => {
	                const data = components[key]
	                
	                config.withComponent(key, function() {
		                // todo handle non-objects
		                Object.keys(data).forEach(key => {
		                    if (this[key] == null || data[key] == null || this[key] === data[key]) {
		                        return
		                    }
		                    
		                    this[key] = data[key]
		                }, this)
		            })
	            }, this)
			}

			config.create(1)
		})
    }
    
    load({project, scene, camera}) {
        const parsedScene = this.loader.parse(scene)
        const parsedCamera = this.loader.parse(camera)
		
		this.initEntities(parsedScene)

    	if (project.shadows) {
			this.rendererManager.enableShadows()
		}
		
    	//todo: check for camera and scene first? throw if not?
    	this.rendererManager.setScene(parsedScene)
    	this.rendererManager.setCamera(parsedCamera, this.width, this.height)
	}
    
    setSize(width, height)  {
        this.width = width
        this.height = height
        
        this.rendererManager.setSize(this.width, this.height)
    }
    
    getDom() {
        return this.rendererManager.getDom()
    }
    
    play() {
        this.loopManager.start()
    }
    
    stop() {
        this.loopManager.stop()
    }
}