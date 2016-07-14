// /* @flow */

import DI from './DI/browser'

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
        
        this.entityManager.onInit({renderManager: this.rendererManager})
        
        this.loopManager.setUpdate(delta => {
            this.entityManager.onLogic(delta)
        }).setRender(interpolationPercentage => {
            this.entityManager.onRender({delta : interpolationPercentage, renderManager: this.rendererManager})
            this.rendererManager.render(interpolationPercentage)
        })
    }
    
    initEntities(parsedScene) {
        parsedScene.traverse((obj) => {
		    const {components} = obj.userData
		    
			let config = this.entityManager.build()
			    
		    config.withComponent('transform', function() {
		        this.x = obj.position.x
		        this.y = obj.position.y
		        this.z = obj.position.z
	        })
	        
	        
	        if (obj.id) {
	            config.withComponent('appearance', function() {
    	           this.id = obj.id
    	        })
	        }
	        
			if (components) {
			    for (const {key, data} of components) {
		            config.withComponent(key, function() {
		                // todo handle non-objects
		                Object.keys(data).forEach(key => {
		                    if (this[key] == null) {
		                        return
		                    }
		                    
		                    this[key] = data[key]
		                }, this)
		            })
			    }
			    
			    obj.userData.entityId = config.create(1)
			}
		})
    }
    
    load({project, scene, camera}) {
        console.log('loading...')
        
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