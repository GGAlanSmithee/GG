(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('three')) :
	typeof define === 'function' && define.amd ? define('GG', ['three'], factory) :
	(global.GG = factory(global.THREE));
}(this, function (three) { 'use strict';

	three = 'default' in three ? three['default'] : three;

	class EntityFactory {
	    constructor() {
	        this.initializers  = new Map()
	        this.configuration = new Map()
	    }
	    
	    registerInitializer(id, initializer) {
	        if (!Number.isInteger(id) || id <= 0) {
	            throw TypeError('id must be a posetive integer.')
	        }
	        
	        if (typeof initializer !== 'function') {
	            throw TypeError('initializer must be a function.')
	        }
	        
	        this.initializers.set(id, initializer)
	    }
	    
	    build() {
	        this.configuration = new Map()
	        
	        return this
	    }
	    
	    withComponent(componentId, initializer) {
	        if (!Number.isInteger(componentId) || componentId <= 0) {
	            return this
	        }
	        
	        if (typeof initializer !== 'function') {
	            initializer = this.initializers.get(componentId)
	        }
	        
	        this.configuration.set(componentId, initializer)
	        
	        return this
	    }
	    
	    createConfiguration() {
	        return this.configuration
	    }
	    
	    create(entityManager, count = 1, configuration = undefined) {
	        if (!(entityManager instanceof EntityManager)) {
	            return []
	        }
	    
	        if (configuration == null) {
	            configuration = this.configuration
	        }
	        
	        const components = Array.from(configuration.keys()).reduce((curr, next) => curr |= next, 0)
	        
	        let entities = []
	        
	        for (let i = 0; i < count; ++i) {
	            let { id, entity } = entityManager.newEntity(components)
	            
	            if (id >= entityManager.capacity) {
	                break
	            }
	            
	            for (let [component, initializer] of configuration) {
	                if (typeof initializer !== 'function') {
	                    continue
	                }

	                let result = initializer.call(entity[component])
	                
	                if (typeof entity[component] !== 'object' && result !== undefined) {
	                    entity[component] = result
	                }
	            }
	            
	            entities.push({ id, entity })
	        }
	        
	        return entities.length === 1 ? entities[0] : entities
	    }
	}

	class ComponentManager {
	    constructor() {
	        this.components = new Map()
	    }
	    
	    newComponent(componentId) {
	        let component = this.components.get(componentId)
	        
	        if (component === null || component === undefined) {
	            return null
	        }
	        
	        switch (typeof component) {
	            case 'function':
	                return new component()
	            case 'object'  : {
	                return ((component) => {
	                    let ret = {}
	                    
	                    Object.keys(component).forEach(key => ret[key] = component[key])
	                    
	                    return ret
	                })(component)
	            }
	            default:
	                return component
	        }
	    }
	    
	    registerComponent(component) {
	        if (component === null || component === undefined) {
	            throw TypeError('component cannot be null or undefined.')
	        }
	        
	        const max = Math.max(...this.components.keys())
	        
	        const id = max === undefined || max === null || max === -Infinity ? 1 : max === 0 ? 1 : max * 2

	        this.components.set(id, component)

	        return id
	    }
	    
	    getComponents() {
	        return this.components
	    }
	}

	const SystemType = {
	    Logic  : 0,
	    Render : 1,
	    Init   : 2
	}

	class SystemManager {
	    constructor() {
	        this.logicSystems  = new Map()
	        this.renderSystems = new Map()
	        this.initSystems   = new Map()
	    }
	    
	    registerSystem(type, components, callback) {
	        if (type !== SystemType.Logic && type !== SystemType.Render && type !== SystemType.Init) {
	            throw TypeError('type must be a valid SystemType.')
	        }
	        
	        if (typeof components !== 'number')  {
	            throw TypeError('components must be a number.')
	        }
	        
	        if (typeof callback !== 'function') {
	            throw TypeError('callback must be a function.')
	        }
	        
	        const system = {
	            components,
	            callback
	        }
	        
	        const systemId = Math.max(0, ...this.logicSystems.keys(), ...this.renderSystems.keys(), ...this.initSystems.keys()) + 1
	        
	        switch (type) {
	            case SystemType.Logic : this.logicSystems.set(systemId, system); break
	            case SystemType.Render : this.renderSystems.set(systemId, system); break
	            case SystemType.Init : this.initSystems.set(systemId, system); break
	        }
	        
	        return systemId
	    }
	    
	    removeSystem(systemId) {
	        return this.logicSystems.delete(systemId) || this.renderSystems.delete(systemId) || this.initSystems.delete(systemId)
	    }
	}

	const emptyPromise = () => {
	    return new Promise(resolve => {
	        resolve()
	    })
	}

	const promise = (callback, context, args, timeout) => {
	    if (timeout) {
	        return new Promise(resolve => {
	            setTimeout(function(){
	                resolve(typeof context ===  'object' ? callback.call(context, ...args) : callback.apply(context, ...args))
	            }, timeout)
	        })
	    }
	    
	    return new Promise(resolve => {
	        resolve(typeof context === 'object' ? callback.call(context, ...args) : callback.apply(context, ...args))
	    })
	}
	    
	class EventHandler {
	    constructor() {
	        this.events = new Map()
	    }
	    
	    listen(event, callback) {
	        if (typeof event !== 'string' || typeof callback !== 'function') {
	            return
	        }
	        
	        if (!this.events.has(event)) {
	            this.events.set(event, new Map())
	        }
	        
	        let eventId = -1
	        
	        this.events.forEach(event => {
	            eventId = Math.max(eventId, ...event.keys())
	        });
	        
	        ++eventId
	        
	        this.events.get(event).set(eventId, callback)
	        
	        return eventId
	    }
	    
	    stopListen(eventId) {
	        for (let events of this.events.values()) {
	            for (let id of events.keys()) {
	                if (id === eventId) {
	                    return events.delete(eventId)
	                }
	            }
	        }

	        return false
	    }
	    
	    trigger() {
	        let self = this instanceof EntityManager ? this.eventHandler : this
	        
	        let args = Array.from(arguments)
	        
	        let [ event ] = args.splice(0, 1)
	        
	        if (typeof event !== 'string' || !self.events.has(event)) {
	            return emptyPromise()
	        }
	        
	        let promises = []
	        
	        for (let callback of self.events.get(event).values()) {
	            promises.push(promise(callback, this, args))
	        }
	        
	        return Promise.all(promises)
	    }
	    
	    triggerDelayed() {
	        let self = this instanceof EntityManager ? this.eventHandler : this
	        
	        let args = Array.from(arguments)
	        
	        let [ event, timeout ] = args.splice(0, 2)
	        
	        if (typeof event !== 'string' || !Number.isInteger(timeout) || !self.events.has(event)) {
	            return emptyPromise()
	        }
	        
	        let promises = []
	        
	        for (let callback of self.events.get(event).values()) {
	            promises.push(promise(callback, this, args, timeout))
	        }
	        
	        return Promise.all(promises)
	    }
	}

	class EntityManager {
	    constructor(capacity = 1000) {
	        this.capacity         = capacity
	        this.currentMaxEntity = -1
	        
	        this.entityFactory    = new EntityFactory()
	        this.systemManager    = new SystemManager()
	        this.componentManager = new ComponentManager()
	        this.eventHandler     = new EventHandler()
	        
	        this.entityConfigurations = new Map()
	        this.componentLookup      = new Map()
	        
	        this.entities = Array.from({ length : this.capacity }, () => ({ components: 0 }))
	    }
	    
	    increaseCapacity() {
	        let oldCapacity = this.capacity
	        
	        this.capacity *= 2
	        
	        this.entities = [...this.entities, ...Array.from({ length : oldCapacity }, () => ({ components: 0 }))]

	        for (let i = oldCapacity; i < this.capacity; ++i) {
	            let entity = this.entities[i]
	            
	            for (const componentId of this.componentManager.getComponents().keys()) {
	                let componentName = null
	                
	                for (let [key, value] of this.componentLookup.entries()) {
	                    if (value === componentId) {
	                        componentName = key
	                        
	                        break
	                    }
	                }

	                entity[componentId] = this.componentManager.newComponent(componentId)
	                
	                Object.defineProperty(entity, componentName, { get() { return this[componentId] }, configurable: true })
	            }
	        }
	    }
	    
	    newEntity(components) {
	        if (Array.isArray(components)) {
	            components = Array.from(this.componentLookup).reduce((curr, next) => ['', curr[1] | next[1]], ['', 0])[1]
	        }
	        
	        if (!Number.isInteger(components) || components <= 0) {
	            return { id : this.capacity, entity : null }
	        }
	        
	        let id = 0
	        
	        for (; id < this.capacity; ++id) {
	            if (this.entities[id].components === 0) {
	                break
	            }
	        }
	        
	        if (id >= this.capacity) {
	            // todo: auto increase capacity?
	            return { id : this.capacity, entity : null }
	        }
	        
	        if (id > this.currentMaxEntity) {
	            this.currentMaxEntity = id
	        }
	        
	        this.entities[id].components = components
	        
	        return { id, entity : this.entities[id] }
	    }
	    
	    deleteEntity(id) {
	        //todo add sanity check
	        this.entities[id].components = 0
	        
	        if (id < this.currentMaxEntity) {
	            return
	        }
	        
	        for (let i = id; i >= 0; --i) {
	            if (this.entities[i].components !== 0) {
	                this.currentMaxEntity = i
	                
	                return
	            }
	        }

	        this.currentMaxEntity = 0
	    }

	    // Does not allow components to be anything other than a bitmask for performance reasons
	    // This method will be called for every system for every loop (which might be as high as 60 / second)
	    *getEntities(components = 0) {
	        for (let id = 0; id <= this.currentMaxEntity; ++id) {
	            if (components === 0 || (this.entities[id].components & components) === components) {
	                yield { id, entity : this.entities[id] }
	            }
	        }
	    }
	    
	    registerConfiguration() {
	        const configurationId = Math.max(0, ...this.entityConfigurations.keys()) + 1
	        
	        this.entityConfigurations.set(configurationId, this.entityFactory.createConfiguration())
	        
	        return configurationId
	    }
	    
	    // Component Manager
	    
	    registerComponent(name, component) {
	        if (typeof name !== 'string' || name.length === 0) {
	            throw TypeError('name must be a non-empty string.')
	        }
	        
	        if (this.componentLookup.get(name) != null) {
	            return
	        }
	        
	        const componentId = this.componentManager.registerComponent(component)
	        
	        this.componentLookup.set(name, componentId)
	        
	        for (let entity of this.entities) {
	            entity[componentId] = this.componentManager.newComponent(componentId)
	            Object.defineProperty(entity, name, { get() { return this[componentId] }, configurable: true })
	        }
	        
	        let initializer

	        switch (typeof component) {
	            case 'function': initializer = component; break
	            case 'object': {
	                initializer = function() {
	                    for (let key of Object.keys(component)) {
	                        this[key] = component[key]
	                    }
	                }
	            
	                break
	            }
	            default: initializer = function() { return component }; break
	        }
	        
	        this.entityFactory.registerInitializer(componentId, initializer)
	        
	        return componentId
	    }
	    
	    addComponent(entityId, component) {
	        if (typeof component === 'string') {
	            this.entities[entityId].components |= this.componentLookup.get(component)
	        } else {
	            this.entities[entityId].components |= component
	        }
	    }
	    
	    removeComponent(entityId, component) {
	        if (typeof component === 'string') {
	            this.entities[entityId].components &= ~this.componentLookup.get(component)
	        } else {
	            this.entities[entityId].components &= ~component   
	        }
	    }
	    
	    // System Manager
	    
	    registerSystem(type, components, callback) {
	        if (Array.isArray(components)) {
	            components = Array.from(this.componentLookup).reduce((curr, next) => ['', curr[1] | next[1]], ['', 0])[1]
	        }
	        
	        return this.systemManager.registerSystem(type, components, callback)
	    }
	    
	    registerLogicSystem(components, callback) {
	        return this.registerSystem(SystemType.Logic, components, callback)
	    }
	    
	    registerRenderSystem(components, callback) {
	        return this.registerSystem(SystemType.Render, components, callback)
	    }
	    
	    registerInitSystem(components, callback) {
	        return this.registerSystem(SystemType.Init, components, callback)
	    }
	    
	    removeSystem(systemId) {
	        return this.systemManager.removeSystem(systemId)
	    }
	    
	    onLogic(opts) {
	        for (let system of this.systemManager.logicSystems.values()) {
	            system.callback.call(this, this.getEntities(system.components), opts)
	        }
	    }
	    
	    onRender(opts) {
	        for (let system of this.systemManager.renderSystems.values()) {
	            system.callback.call(this, this.getEntities(system.components), opts)
	        }
	    }

	    onInit(opts) {
	        for (let system of this.systemManager.initSystems.values()) {
	            system.callback.call(this, this.getEntities(system.components), opts)
	        }
	    }
	    
	    // Entity Factory
	    
	    registerInitializer(component, initializer) {
	        if (typeof component === 'string') {
	            this.entityFactory.registerInitializer(this.componentLookup.get(component), initializer)
	        } else {
	            this.entityFactory.registerInitializer(component, initializer)
	        }
	    }
	    
	    build() {
	        this.entityFactory.build()
	        
	        return this
	    }
	    
	    withComponent(component, initializer) {
	        if (typeof component === 'string') {
	            this.entityFactory.withComponent(this.componentLookup.get(component), initializer)
	        } else {
	            this.entityFactory.withComponent(component, initializer)
	        }
	        
	        return this
	    }
	    
	    create(count, configurationId) {
	        let configuration = undefined
	        
	        if (Number.isInteger(configurationId) && configurationId > 0) {
	            configuration = this.entityConfigurations.get(configurationId)
	            
	            if (configuration === undefined) {
	                throw Error('Could not find entity configuration. If you wish to create entities without a configuration, do not pass a configurationId.')
	            }
	        }
	        
	        return this.entityFactory.create(this, count, configuration)
	    }
	    
	    // Event Handler
	    
	    listen(event, callback) {
	        return this.eventHandler.listen(event, callback)
	    }
	    
	    stopListen(eventId) {
	        return this.eventHandler.stopListen(eventId)
	    }
	    
	    trigger() {
	        return this.eventHandler.trigger.call(this, ...arguments)
	    }
	    
	    triggerDelayed() {
	        return this.eventHandler.triggerDelayed.call(this, ...arguments)
	    }
	}

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {}

	function interopDefault(ex) {
		return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var mainloop_min = createCommonjsModule(function (module) {
	/**
	 * mainloop.js 1.0.3-20160320
	 *
	 * @author Isaac Sukin (http://www.isaacsukin.com/)
	 * @license MIT
	 */

	!function(a){function b(a){if(v=o(b),!(e+j>a)){for(d+=a-e,e=a,r(a,d),a>g+1e3&&(f=.25*h+.75*f,g=a,h=0),h++,i=0;d>=c;)if(s(c),d-=c,++i>=240){m=!0;break}t(d/c),u(f,m),m=!1}}var c=1e3/60,d=0,e=0,f=60,g=0,h=0,i=0,j=0,k=!1,l=!1,m=!1,n="object"==typeof window?window:a,o=n.requestAnimationFrame||function(){var a=Date.now(),b,d;return function(e){return b=Date.now(),d=Math.max(0,c-(b-a)),a=b+d,setTimeout(function(){e(b+d)},d)}}(),p=n.cancelAnimationFrame||clearTimeout,q=function(){},r=q,s=q,t=q,u=q,v;a.MainLoop={getSimulationTimestep:function(){return c},setSimulationTimestep:function(a){return c=a,this},getFPS:function(){return f},getMaxAllowedFPS:function(){return 1e3/j},setMaxAllowedFPS:function(a){return"undefined"==typeof a&&(a=1/0),0===a?this.stop():j=1e3/a,this},resetFrameDelta:function(){var a=d;return d=0,a},setBegin:function(a){return r=a||r,this},setUpdate:function(a){return s=a||s,this},setDraw:function(a){return t=a||t,this},setEnd:function(a){return u=a||u,this},start:function(){return l||(l=!0,v=o(function(a){t(1),k=!0,e=a,g=a,h=0,v=o(b)})),this},stop:function(){return k=!1,l=!1,p(v),this},isRunning:function(){return k}},"function"==typeof define&&define.amd?define(a.MainLoop):"object"==typeof module&&null!==module&&"object"==typeof module.exports&&(module.exports=a.MainLoop)}(commonjsGlobal);
	});

	var MainLoop = interopDefault(mainloop_min);

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

	var MainLoopLoopManager = function () {
	    function MainLoopLoopManager() {
	        classCallCheck(this, MainLoopLoopManager);
	    }

	    createClass(MainLoopLoopManager, [{
	        key: 'setUpdate',

	        // setUpdate(updateMethod : (delta : number) => void) : MainLoopLoopManager {
	        value: function setUpdate(updateMethod) {
	            MainLoop.setUpdate(updateMethod);

	            return this;
	        }
	    }, {
	        key: 'setRender',
	        value: function setRender(renderMethod) {
	            MainLoop.setDraw(renderMethod);

	            return this;
	        }
	    }, {
	        key: 'start',
	        value: function start() {
	            MainLoop.start();
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            MainLoop.stop();
	        }
	    }]);
	    return MainLoopLoopManager;
	}();

	var ThreeObjectMeshLoader = function () {
	    function ThreeObjectMeshLoader() {
	        classCallCheck(this, ThreeObjectMeshLoader);

	        this.loader = new three.ObjectLoader();
	    }

	    createClass(ThreeObjectMeshLoader, [{
	        key: 'onProgress',
	        value: function onProgress() {
	            // placeholder
	        }
	    }, {
	        key: 'parse',
	        value: function parse(json) {
	            return this.loader.parse(json);
	        }

	        // todo this now returns a scene.. implications?
	        // todo add options as a destructable object -> stopped by flow: https://github.com/facebook/flow/issues/183

	    }, {
	        key: 'load',
	        value: function load(path, options) {
	            var self = this;

	            var shading = (options || {}).shading;

	            return new Promise(function (resolve, reject) {
	                try {
	                    self.loader.load(path, function (obj) {
	                        return resolve(obj);
	                    }, function (info) {
	                        return self.onProgress(info);
	                    }, function (err) {
	                        return reject(err);
	                    });
	                } catch (error) {
	                    reject(error);
	                }
	            }).then(function (mesh) {
	                if (typeof shading !== 'number') {
	                    return mesh;
	                }

	                mesh.traverse(function (child) {
	                    if (child instanceof three.Mesh) {
	                        child.material.shading = shading;
	                    }
	                });

	                return mesh;
	            }).catch(function (err) {
	                console.warn(err);
	            });
	        }
	    }]);
	    return ThreeObjectMeshLoader;
	}();

	var ThreeRendererManager = function () {
	    // geometries   : Map<string, three.Geometry>;
	    // materials    : Map<string, three.Material>;

	    function ThreeRendererManager() {
	        classCallCheck(this, ThreeRendererManager);

	        this.renderer = new three.WebGLRenderer({ antialias: true });
	        this.renderer.setClearColor(0x000000);
	        this.renderer.setPixelRatio(window.devicePixelRatio);
	    }

	    createClass(ThreeRendererManager, [{
	        key: 'enableShadows',
	        value: function enableShadows() {
	            this.renderer.shadowMap.enabled = true;
	        }
	    }, {
	        key: 'isFullScreen',
	        value: function isFullScreen() {
	            return this.renderer._fullScreen;
	        }

	        //todo make into getter / setter ?

	    }, {
	        key: 'setScene',
	        value: function setScene(scene) {
	            this.scene = scene;
	        }
	    }, {
	        key: 'setCamera',
	        value: function setCamera(camera, width, height) {
	            this.camera = camera;
	        }
	    }, {
	        key: 'setSize',
	        value: function setSize(width, height) {
	            if (!this.isFullScreen()) {
	                this.camera.aspect = (width || 500) / (height || 500);
	            }

	            this.camera.updateProjectionMatrix();

	            if (!this.isFullScreen()) {
	                this.renderer.setSize(width || 500, height || 500);
	            }
	        }
	    }, {
	        key: 'getDom',
	        value: function getDom() {
	            return this.renderer.domElement;
	        }
	    }, {
	        key: 'getScene',
	        value: function getScene() {
	            return this.scene;
	        }
	    }, {
	        key: 'getGeometry',
	        value: function getGeometry(key) {
	            return geometries.get(key);
	        }
	    }, {
	        key: 'getMaterial',
	        value: function getMaterial(key) {
	            return materials.get(key);
	        }
	    }, {
	        key: 'addMesh',
	        value: function addMesh(geometry, material) {
	            var geo = this.geometries.get(geometry);
	            var mat = this.materials.get(material);
	            var mesh = new three.Mesh(geo, mat);

	            this.scene.add(mesh);

	            return mesh;
	        }
	    }, {
	        key: 'render',
	        value: function render(interpolationPercentage) {
	            this.renderer.render(this.scene, this.camera);
	        }

	        // render(scene : three.Scene, interpolationPercentage : number) : void {
	        //     this.renderer.render(scene, this.camera);
	        // }

	    }]);
	    return ThreeRendererManager;
	}();

	var _loopManager = new MainLoopLoopManager();
	// const _fileLoader      = new FetchFileLoader()
	var _loader = new ThreeObjectMeshLoader();
	var _rendererManager = new ThreeRendererManager();
	var _entityManager = new EntityManager();

	var loopManager = function loopManager() {
	  return _loopManager;
	};
	// const fileLoader      = () => _fileLoader
	var loader = function loader() {
	  return _loader;
	};
	var rendererManager = function rendererManager() {
	  return _rendererManager;
	};
	var entityManager = function entityManager() {
	  return _entityManager;
	};

	var DI = { loopManager: loopManager, loader: loader, rendererManager: rendererManager, entityManager: entityManager };

	var COMPONENT = {
	    TRANSFORM: 'transform',
	    APPEARANCE: 'appearance'
	};

	var GG = function () {
	    function GG() {
	        var _this = this;

	        classCallCheck(this, GG);

	        // width and height set to 500 just to have it as in the editor for the time being
	        this.width = 500;
	        this.height = 500;

	        this.entityManager = DI.entityManager();
	        this.loopManager = DI.loopManager();
	        this.rendererManager = DI.rendererManager();
	        this.loader = DI.loader();

	        this.dom = this.rendererManager.getDom();

	        this.initComponents();
	        this.initSystems();

	        this.entityManager.onInit({ renderManager: this.rendererManager });

	        this.loopManager.setUpdate(function (delta) {
	            _this.entityManager.onLogic(delta);
	        }).setRender(function (interpolationPercentage) {
	            _this.entityManager.onRender({ delta: interpolationPercentage, renderManager: _this.rendererManager });
	            _this.rendererManager.render(interpolationPercentage);
	        });
	    }

	    createClass(GG, [{
	        key: 'setEntityData',
	        value: function setEntityData(entityData) {
	            this.entityData = entityData;
	        }
	    }, {
	        key: 'initComponents',
	        value: function initComponents() {
	            this.entityManager.registerComponent(COMPONENT.TRANSFORM, { x: 0, y: 0, z: 0 });
	            this.entityManager.registerComponent(COMPONENT.APPEARANCE, { id: 0 });
	        }
	    }, {
	        key: 'initSystems',
	        value: function initSystems() {
	            var renderComponents = [COMPONENT.TRANSFORM, COMPONENT.APPEARANCE];

	            var render = function render(entities, _ref) {
	                var renderManager = _ref.renderManager;
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;

	                try {
	                    for (var _iterator = entities[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var entity = _step.value.entity;
	                        var appearance = entity.appearance;
	                        var transform = entity.transform;


	                        var obj = renderManager.scene.getObjectById(appearance.id);

	                        if (obj === undefined) {
	                            continue;
	                        }

	                        obj.position.x = transform.x;
	                        obj.position.y = transform.y;
	                        obj.position.z = transform.z;
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }
	            };

	            this.entityManager.registerRenderSystem(renderComponents, render);
	        }
	    }, {
	        key: 'initEntities',
	        value: function initEntities(parsedScene) {
	            var _this2 = this;

	            parsedScene.traverse(function (obj) {
	                var config = _this2.entityManager.build();

	                config.withComponent(COMPONENT.TRANSFORM, function () {
	                    this.x = obj.position.x;
	                    this.y = obj.position.y;
	                    this.z = obj.position.z;
	                });

	                //todo: make only visible objects get this
	                if (obj.id && obj.visible) {
	                    config.withComponent(COMPONENT.APPEARANCE, function () {
	                        this.id = obj.id;
	                    });
	                }

	                var components = _this2.entityData[obj.uuid];

	                if (components) {
	                    Object.keys(components).forEach(function (key) {
	                        var data = components[key];

	                        config.withComponent(key, function () {
	                            var _this3 = this;

	                            // todo handle non-objects
	                            Object.keys(data).forEach(function (key) {
	                                if (_this3[key] == null || data[key] == null || _this3[key] === data[key]) {
	                                    return;
	                                }

	                                _this3[key] = data[key];
	                            }, this);
	                        });
	                    }, _this2);
	                }

	                config.create(1);
	            });
	        }
	    }, {
	        key: 'load',
	        value: function load(_ref2) {
	            var project = _ref2.project;
	            var scene = _ref2.scene;
	            var camera = _ref2.camera;

	            var parsedScene = this.loader.parse(scene);
	            var parsedCamera = this.loader.parse(camera);

	            this.initEntities(parsedScene);

	            if (project.shadows) {
	                this.rendererManager.enableShadows();
	            }

	            //todo: check for camera and scene first? throw if not?
	            this.rendererManager.setScene(parsedScene);
	            this.rendererManager.setCamera(parsedCamera, this.width, this.height);
	        }
	    }, {
	        key: 'setSize',
	        value: function setSize(width, height) {
	            this.width = width;
	            this.height = height;

	            this.rendererManager.setSize(this.width, this.height);
	        }
	    }, {
	        key: 'getDom',
	        value: function getDom() {
	            return this.rendererManager.getDom();
	        }
	    }, {
	        key: 'play',
	        value: function play() {
	            this.loopManager.start();
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            this.loopManager.stop();
	        }
	    }]);
	    return GG;
	}();

	return GG;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9lbnRpdHktZmFjdG9yeS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9jb21wb25lbnQtbWFuYWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9zeXN0ZW0tbWFuYWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9ldmVudC1oYW5kbGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL3NyYy9jb3JlL2VudGl0eS1tYW5hZ2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL21haW5sb29wLmpzL2J1aWxkL21haW5sb29wLm1pbi5qcyIsIi4uL3NyYy9sb2dpYy9tYWlubG9vcC1sb29wLW1hbmFnZXIuanMiLCIuLi9zcmMvbG9naWMvdGhyZWUtb2JqZWN0LW1lc2gtbG9hZGVyLmpzIiwiLi4vc3JjL3ZpZXcvdGhyZWUtcmVuZGVyZXItbWFuYWdlci5qcyIsIi4uL3NyYy9ESS9icm93c2VyLmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eU1hbmFnZXIgfSBmcm9tICcuL2VudGl0eS1tYW5hZ2VyJ1xuXG5jbGFzcyBFbnRpdHlGYWN0b3J5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplcnMgID0gbmV3IE1hcCgpXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IG5ldyBNYXAoKVxuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckluaXRpYWxpemVyKGlkLCBpbml0aWFsaXplcikge1xuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoaWQpIHx8IGlkIDw9IDApIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignaWQgbXVzdCBiZSBhIHBvc2V0aXZlIGludGVnZXIuJylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdpbml0aWFsaXplciBtdXN0IGJlIGEgZnVuY3Rpb24uJylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5pbml0aWFsaXplcnMuc2V0KGlkLCBpbml0aWFsaXplcilcbiAgICB9XG4gICAgXG4gICAgYnVpbGQoKSB7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IG5ldyBNYXAoKVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgXG4gICAgd2l0aENvbXBvbmVudChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGNvbXBvbmVudElkKSB8fCBjb21wb25lbnRJZCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGluaXRpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBpbml0aWFsaXplciA9IHRoaXMuaW5pdGlhbGl6ZXJzLmdldChjb21wb25lbnRJZClcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnNldChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGVDb25maWd1cmF0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uXG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZShlbnRpdHlNYW5hZ2VyLCBjb3VudCA9IDEsIGNvbmZpZ3VyYXRpb24gPSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCEoZW50aXR5TWFuYWdlciBpbnN0YW5jZW9mIEVudGl0eU1hbmFnZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gW11cbiAgICAgICAgfVxuICAgIFxuICAgICAgICBpZiAoY29uZmlndXJhdGlvbiA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25maWd1cmF0aW9uID0gdGhpcy5jb25maWd1cmF0aW9uXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudHMgPSBBcnJheS5mcm9tKGNvbmZpZ3VyYXRpb24ua2V5cygpKS5yZWR1Y2UoKGN1cnIsIG5leHQpID0+IGN1cnIgfD0gbmV4dCwgMClcbiAgICAgICAgXG4gICAgICAgIGxldCBlbnRpdGllcyA9IFtdXG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyArK2kpIHtcbiAgICAgICAgICAgIGxldCB7IGlkLCBlbnRpdHkgfSA9IGVudGl0eU1hbmFnZXIubmV3RW50aXR5KGNvbXBvbmVudHMpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChpZCA+PSBlbnRpdHlNYW5hZ2VyLmNhcGFjaXR5KSB7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgW2NvbXBvbmVudCwgaW5pdGlhbGl6ZXJdIG9mIGNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGluaXRpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGluaXRpYWxpemVyLmNhbGwoZW50aXR5W2NvbXBvbmVudF0pXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlbnRpdHlbY29tcG9uZW50XSAhPT0gJ29iamVjdCcgJiYgcmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5W2NvbXBvbmVudF0gPSByZXN1bHRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGVudGl0aWVzLnB1c2goeyBpZCwgZW50aXR5IH0pXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBlbnRpdGllcy5sZW5ndGggPT09IDEgPyBlbnRpdGllc1swXSA6IGVudGl0aWVzXG4gICAgfVxufVxuXG5leHBvcnQgeyBFbnRpdHlGYWN0b3J5IH1cbiIsImNsYXNzIENvbXBvbmVudE1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBuZXcgTWFwKClcbiAgICB9XG4gICAgXG4gICAgbmV3Q29tcG9uZW50KGNvbXBvbmVudElkKSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KGNvbXBvbmVudElkKVxuICAgICAgICBcbiAgICAgICAgaWYgKGNvbXBvbmVudCA9PT0gbnVsbCB8fCBjb21wb25lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgY29tcG9uZW50KSB7XG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBjb21wb25lbnQoKVxuICAgICAgICAgICAgY2FzZSAnb2JqZWN0JyAgOiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgoY29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXQgPSB7fVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoY29tcG9uZW50KS5mb3JFYWNoKGtleSA9PiByZXRba2V5XSA9IGNvbXBvbmVudFtrZXldKVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldFxuICAgICAgICAgICAgICAgIH0pKGNvbXBvbmVudClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudFxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCkge1xuICAgICAgICBpZiAoY29tcG9uZW50ID09PSBudWxsIHx8IGNvbXBvbmVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvbXBvbmVudCBjYW5ub3QgYmUgbnVsbCBvciB1bmRlZmluZWQuJylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoLi4udGhpcy5jb21wb25lbnRzLmtleXMoKSlcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGlkID0gbWF4ID09PSB1bmRlZmluZWQgfHwgbWF4ID09PSBudWxsIHx8IG1heCA9PT0gLUluZmluaXR5ID8gMSA6IG1heCA9PT0gMCA/IDEgOiBtYXggKiAyXG5cbiAgICAgICAgdGhpcy5jb21wb25lbnRzLnNldChpZCwgY29tcG9uZW50KVxuXG4gICAgICAgIHJldHVybiBpZFxuICAgIH1cbiAgICBcbiAgICBnZXRDb21wb25lbnRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnRzXG4gICAgfVxufVxuXG5leHBvcnQgeyBDb21wb25lbnRNYW5hZ2VyIH1cbiIsImV4cG9ydCBjb25zdCBTeXN0ZW1UeXBlID0ge1xuICAgIExvZ2ljICA6IDAsXG4gICAgUmVuZGVyIDogMSxcbiAgICBJbml0ICAgOiAyXG59XG5cbmNsYXNzIFN5c3RlbU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmxvZ2ljU3lzdGVtcyAgPSBuZXcgTWFwKClcbiAgICAgICAgdGhpcy5yZW5kZXJTeXN0ZW1zID0gbmV3IE1hcCgpXG4gICAgICAgIHRoaXMuaW5pdFN5c3RlbXMgICA9IG5ldyBNYXAoKVxuICAgIH1cbiAgICBcbiAgICByZWdpc3RlclN5c3RlbSh0eXBlLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAodHlwZSAhPT0gU3lzdGVtVHlwZS5Mb2dpYyAmJiB0eXBlICE9PSBTeXN0ZW1UeXBlLlJlbmRlciAmJiB0eXBlICE9PSBTeXN0ZW1UeXBlLkluaXQpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcigndHlwZSBtdXN0IGJlIGEgdmFsaWQgU3lzdGVtVHlwZS4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGNvbXBvbmVudHMgIT09ICdudW1iZXInKSAge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjb21wb25lbnRzIG11c3QgYmUgYSBudW1iZXIuJylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24uJylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3Qgc3lzdGVtID0ge1xuICAgICAgICAgICAgY29tcG9uZW50cyxcbiAgICAgICAgICAgIGNhbGxiYWNrXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHN5c3RlbUlkID0gTWF0aC5tYXgoMCwgLi4udGhpcy5sb2dpY1N5c3RlbXMua2V5cygpLCAuLi50aGlzLnJlbmRlclN5c3RlbXMua2V5cygpLCAuLi50aGlzLmluaXRTeXN0ZW1zLmtleXMoKSkgKyAxXG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgU3lzdGVtVHlwZS5Mb2dpYyA6IHRoaXMubG9naWNTeXN0ZW1zLnNldChzeXN0ZW1JZCwgc3lzdGVtKTsgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgU3lzdGVtVHlwZS5SZW5kZXIgOiB0aGlzLnJlbmRlclN5c3RlbXMuc2V0KHN5c3RlbUlkLCBzeXN0ZW0pOyBicmVha1xuICAgICAgICAgICAgY2FzZSBTeXN0ZW1UeXBlLkluaXQgOiB0aGlzLmluaXRTeXN0ZW1zLnNldChzeXN0ZW1JZCwgc3lzdGVtKTsgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHN5c3RlbUlkXG4gICAgfVxuICAgIFxuICAgIHJlbW92ZVN5c3RlbShzeXN0ZW1JZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2dpY1N5c3RlbXMuZGVsZXRlKHN5c3RlbUlkKSB8fCB0aGlzLnJlbmRlclN5c3RlbXMuZGVsZXRlKHN5c3RlbUlkKSB8fCB0aGlzLmluaXRTeXN0ZW1zLmRlbGV0ZShzeXN0ZW1JZClcbiAgICB9XG59XG5cbmV4cG9ydCB7IFN5c3RlbU1hbmFnZXIgfVxuIiwiaW1wb3J0IHsgRW50aXR5TWFuYWdlciB9IGZyb20gJy4vZW50aXR5LW1hbmFnZXInXG5cbmNvbnN0IGVtcHR5UHJvbWlzZSA9ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIHJlc29sdmUoKVxuICAgIH0pXG59XG5cbmNvbnN0IHByb21pc2UgPSAoY2FsbGJhY2ssIGNvbnRleHQsIGFyZ3MsIHRpbWVvdXQpID0+IHtcbiAgICBpZiAodGltZW91dCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0eXBlb2YgY29udGV4dCA9PT0gICdvYmplY3QnID8gY2FsbGJhY2suY2FsbChjb250ZXh0LCAuLi5hcmdzKSA6IGNhbGxiYWNrLmFwcGx5KGNvbnRleHQsIC4uLmFyZ3MpKVxuICAgICAgICAgICAgfSwgdGltZW91dClcbiAgICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICByZXNvbHZlKHR5cGVvZiBjb250ZXh0ID09PSAnb2JqZWN0JyA/IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgLi4uYXJncykgOiBjYWxsYmFjay5hcHBseShjb250ZXh0LCAuLi5hcmdzKSlcbiAgICB9KVxufVxuICAgIFxuY2xhc3MgRXZlbnRIYW5kbGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgTWFwKClcbiAgICB9XG4gICAgXG4gICAgbGlzdGVuKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoIXRoaXMuZXZlbnRzLmhhcyhldmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnNldChldmVudCwgbmV3IE1hcCgpKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgZXZlbnRJZCA9IC0xXG4gICAgICAgIFxuICAgICAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50SWQgPSBNYXRoLm1heChldmVudElkLCAuLi5ldmVudC5rZXlzKCkpXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgKytldmVudElkXG4gICAgICAgIFxuICAgICAgICB0aGlzLmV2ZW50cy5nZXQoZXZlbnQpLnNldChldmVudElkLCBjYWxsYmFjaylcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBldmVudElkXG4gICAgfVxuICAgIFxuICAgIHN0b3BMaXN0ZW4oZXZlbnRJZCkge1xuICAgICAgICBmb3IgKGxldCBldmVudHMgb2YgdGhpcy5ldmVudHMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGlkIG9mIGV2ZW50cy5rZXlzKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaWQgPT09IGV2ZW50SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50cy5kZWxldGUoZXZlbnRJZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlcigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlciA/IHRoaXMuZXZlbnRIYW5kbGVyIDogdGhpc1xuICAgICAgICBcbiAgICAgICAgbGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cylcbiAgICAgICAgXG4gICAgICAgIGxldCBbIGV2ZW50IF0gPSBhcmdzLnNwbGljZSgwLCAxKVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgIXNlbGYuZXZlbnRzLmhhcyhldmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBlbXB0eVByb21pc2UoKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXVxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY2FsbGJhY2sgb2Ygc2VsZi5ldmVudHMuZ2V0KGV2ZW50KS52YWx1ZXMoKSkge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChwcm9taXNlKGNhbGxiYWNrLCB0aGlzLCBhcmdzKSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKVxuICAgIH1cbiAgICBcbiAgICB0cmlnZ2VyRGVsYXllZCgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlciA/IHRoaXMuZXZlbnRIYW5kbGVyIDogdGhpc1xuICAgICAgICBcbiAgICAgICAgbGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cylcbiAgICAgICAgXG4gICAgICAgIGxldCBbIGV2ZW50LCB0aW1lb3V0IF0gPSBhcmdzLnNwbGljZSgwLCAyKVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgIU51bWJlci5pc0ludGVnZXIodGltZW91dCkgfHwgIXNlbGYuZXZlbnRzLmhhcyhldmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBlbXB0eVByb21pc2UoKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXVxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY2FsbGJhY2sgb2Ygc2VsZi5ldmVudHMuZ2V0KGV2ZW50KS52YWx1ZXMoKSkge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChwcm9taXNlKGNhbGxiYWNrLCB0aGlzLCBhcmdzLCB0aW1lb3V0KSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKVxuICAgIH1cbn1cblxuZXhwb3J0IHsgRXZlbnRIYW5kbGVyIH1cbiIsImltcG9ydCB7IEVudGl0eUZhY3RvcnkgfSAgICAgICAgICAgICBmcm9tICcuL2VudGl0eS1mYWN0b3J5J1xuaW1wb3J0IHsgQ29tcG9uZW50TWFuYWdlciB9ICAgICAgICAgIGZyb20gJy4vY29tcG9uZW50LW1hbmFnZXInXG5pbXBvcnQgeyBTeXN0ZW1NYW5hZ2VyLCBTeXN0ZW1UeXBlIH0gZnJvbSAnLi9zeXN0ZW0tbWFuYWdlcidcbmltcG9ydCB7IEV2ZW50SGFuZGxlciB9ICAgICAgICAgICAgICBmcm9tICcuL2V2ZW50LWhhbmRsZXInXG5cbmNsYXNzIEVudGl0eU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKGNhcGFjaXR5ID0gMTAwMCkge1xuICAgICAgICB0aGlzLmNhcGFjaXR5ICAgICAgICAgPSBjYXBhY2l0eVxuICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSAtMVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5ICAgID0gbmV3IEVudGl0eUZhY3RvcnkoKVxuICAgICAgICB0aGlzLnN5c3RlbU1hbmFnZXIgICAgPSBuZXcgU3lzdGVtTWFuYWdlcigpXG4gICAgICAgIHRoaXMuY29tcG9uZW50TWFuYWdlciA9IG5ldyBDb21wb25lbnRNYW5hZ2VyKClcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIgICAgID0gbmV3IEV2ZW50SGFuZGxlcigpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0eUNvbmZpZ3VyYXRpb25zID0gbmV3IE1hcCgpXG4gICAgICAgIHRoaXMuY29tcG9uZW50TG9va3VwICAgICAgPSBuZXcgTWFwKClcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXRpZXMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoIDogdGhpcy5jYXBhY2l0eSB9LCAoKSA9PiAoeyBjb21wb25lbnRzOiAwIH0pKVxuICAgIH1cbiAgICBcbiAgICBpbmNyZWFzZUNhcGFjaXR5KCkge1xuICAgICAgICBsZXQgb2xkQ2FwYWNpdHkgPSB0aGlzLmNhcGFjaXR5XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNhcGFjaXR5ICo9IDJcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXRpZXMgPSBbLi4udGhpcy5lbnRpdGllcywgLi4uQXJyYXkuZnJvbSh7IGxlbmd0aCA6IG9sZENhcGFjaXR5IH0sICgpID0+ICh7IGNvbXBvbmVudHM6IDAgfSkpXVxuXG4gICAgICAgIGZvciAobGV0IGkgPSBvbGRDYXBhY2l0eTsgaSA8IHRoaXMuY2FwYWNpdHk7ICsraSkge1xuICAgICAgICAgICAgbGV0IGVudGl0eSA9IHRoaXMuZW50aXRpZXNbaV1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChjb25zdCBjb21wb25lbnRJZCBvZiB0aGlzLmNvbXBvbmVudE1hbmFnZXIuZ2V0Q29tcG9uZW50cygpLmtleXMoKSkge1xuICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnROYW1lID0gbnVsbFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGZvciAobGV0IFtrZXksIHZhbHVlXSBvZiB0aGlzLmNvbXBvbmVudExvb2t1cC5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBjb21wb25lbnRJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50TmFtZSA9IGtleVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZW50aXR5W2NvbXBvbmVudElkXSA9IHRoaXMuY29tcG9uZW50TWFuYWdlci5uZXdDb21wb25lbnQoY29tcG9uZW50SWQpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVudGl0eSwgY29tcG9uZW50TmFtZSwgeyBnZXQoKSB7IHJldHVybiB0aGlzW2NvbXBvbmVudElkXSB9LCBjb25maWd1cmFibGU6IHRydWUgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBuZXdFbnRpdHkoY29tcG9uZW50cykge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjb21wb25lbnRzKSkge1xuICAgICAgICAgICAgY29tcG9uZW50cyA9IEFycmF5LmZyb20odGhpcy5jb21wb25lbnRMb29rdXApLnJlZHVjZSgoY3VyciwgbmV4dCkgPT4gWycnLCBjdXJyWzFdIHwgbmV4dFsxXV0sIFsnJywgMF0pWzFdXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihjb21wb25lbnRzKSB8fCBjb21wb25lbnRzIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7IGlkIDogdGhpcy5jYXBhY2l0eSwgZW50aXR5IDogbnVsbCB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBpZCA9IDBcbiAgICAgICAgXG4gICAgICAgIGZvciAoOyBpZCA8IHRoaXMuY2FwYWNpdHk7ICsraWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGlkID49IHRoaXMuY2FwYWNpdHkpIHtcbiAgICAgICAgICAgIC8vIHRvZG86IGF1dG8gaW5jcmVhc2UgY2FwYWNpdHk/XG4gICAgICAgICAgICByZXR1cm4geyBpZCA6IHRoaXMuY2FwYWNpdHksIGVudGl0eSA6IG51bGwgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoaWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IGlkXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMgPSBjb21wb25lbnRzXG4gICAgICAgIFxuICAgICAgICByZXR1cm4geyBpZCwgZW50aXR5IDogdGhpcy5lbnRpdGllc1tpZF0gfVxuICAgIH1cbiAgICBcbiAgICBkZWxldGVFbnRpdHkoaWQpIHtcbiAgICAgICAgLy90b2RvIGFkZCBzYW5pdHkgY2hlY2tcbiAgICAgICAgdGhpcy5lbnRpdGllc1tpZF0uY29tcG9uZW50cyA9IDBcbiAgICAgICAgXG4gICAgICAgIGlmIChpZCA8IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSBpZDsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2ldLmNvbXBvbmVudHMgIT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSBpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSAwXG4gICAgfVxuXG4gICAgLy8gRG9lcyBub3QgYWxsb3cgY29tcG9uZW50cyB0byBiZSBhbnl0aGluZyBvdGhlciB0aGFuIGEgYml0bWFzayBmb3IgcGVyZm9ybWFuY2UgcmVhc29uc1xuICAgIC8vIFRoaXMgbWV0aG9kIHdpbGwgYmUgY2FsbGVkIGZvciBldmVyeSBzeXN0ZW0gZm9yIGV2ZXJ5IGxvb3AgKHdoaWNoIG1pZ2h0IGJlIGFzIGhpZ2ggYXMgNjAgLyBzZWNvbmQpXG4gICAgKmdldEVudGl0aWVzKGNvbXBvbmVudHMgPSAwKSB7XG4gICAgICAgIGZvciAobGV0IGlkID0gMDsgaWQgPD0gdGhpcy5jdXJyZW50TWF4RW50aXR5OyArK2lkKSB7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50cyA9PT0gMCB8fCAodGhpcy5lbnRpdGllc1tpZF0uY29tcG9uZW50cyAmIGNvbXBvbmVudHMpID09PSBjb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgeWllbGQgeyBpZCwgZW50aXR5IDogdGhpcy5lbnRpdGllc1tpZF0gfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyQ29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgY29uc3QgY29uZmlndXJhdGlvbklkID0gTWF0aC5tYXgoMCwgLi4udGhpcy5lbnRpdHlDb25maWd1cmF0aW9ucy5rZXlzKCkpICsgMVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlDb25maWd1cmF0aW9ucy5zZXQoY29uZmlndXJhdGlvbklkLCB0aGlzLmVudGl0eUZhY3RvcnkuY3JlYXRlQ29uZmlndXJhdGlvbigpKVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGNvbmZpZ3VyYXRpb25JZFxuICAgIH1cbiAgICBcbiAgICAvLyBDb21wb25lbnQgTWFuYWdlclxuICAgIFxuICAgIHJlZ2lzdGVyQ29tcG9uZW50KG5hbWUsIGNvbXBvbmVudCkge1xuICAgICAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnIHx8IG5hbWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ25hbWUgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcuJylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50TG9va3VwLmdldChuYW1lKSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3QgY29tcG9uZW50SWQgPSB0aGlzLmNvbXBvbmVudE1hbmFnZXIucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KVxuICAgICAgICBcbiAgICAgICAgdGhpcy5jb21wb25lbnRMb29rdXAuc2V0KG5hbWUsIGNvbXBvbmVudElkKVxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgZW50aXR5IG9mIHRoaXMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgIGVudGl0eVtjb21wb25lbnRJZF0gPSB0aGlzLmNvbXBvbmVudE1hbmFnZXIubmV3Q29tcG9uZW50KGNvbXBvbmVudElkKVxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVudGl0eSwgbmFtZSwgeyBnZXQoKSB7IHJldHVybiB0aGlzW2NvbXBvbmVudElkXSB9LCBjb25maWd1cmFibGU6IHRydWUgfSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGluaXRpYWxpemVyXG5cbiAgICAgICAgc3dpdGNoICh0eXBlb2YgY29tcG9uZW50KSB7XG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6IGluaXRpYWxpemVyID0gY29tcG9uZW50OyBicmVha1xuICAgICAgICAgICAgY2FzZSAnb2JqZWN0Jzoge1xuICAgICAgICAgICAgICAgIGluaXRpYWxpemVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhjb21wb25lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBjb21wb25lbnRba2V5XVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6IGluaXRpYWxpemVyID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb21wb25lbnQgfTsgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LnJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudElkXG4gICAgfVxuICAgIFxuICAgIGFkZENvbXBvbmVudChlbnRpdHlJZCwgY29tcG9uZW50KSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0uY29tcG9uZW50cyB8PSB0aGlzLmNvbXBvbmVudExvb2t1cC5nZXQoY29tcG9uZW50KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0uY29tcG9uZW50cyB8PSBjb21wb25lbnRcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZW1vdmVDb21wb25lbnQoZW50aXR5SWQsIGNvbXBvbmVudCkge1xuICAgICAgICBpZiAodHlwZW9mIGNvbXBvbmVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuZW50aXRpZXNbZW50aXR5SWRdLmNvbXBvbmVudHMgJj0gfnRoaXMuY29tcG9uZW50TG9va3VwLmdldChjb21wb25lbnQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eUlkXS5jb21wb25lbnRzICY9IH5jb21wb25lbnQgICBcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBTeXN0ZW0gTWFuYWdlclxuICAgIFxuICAgIHJlZ2lzdGVyU3lzdGVtKHR5cGUsIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbXBvbmVudHMpKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzID0gQXJyYXkuZnJvbSh0aGlzLmNvbXBvbmVudExvb2t1cCkucmVkdWNlKChjdXJyLCBuZXh0KSA9PiBbJycsIGN1cnJbMV0gfCBuZXh0WzFdXSwgWycnLCAwXSlbMV1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbSh0eXBlLCBjb21wb25lbnRzLCBjYWxsYmFjaylcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJMb2dpY1N5c3RlbShjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RlclN5c3RlbShTeXN0ZW1UeXBlLkxvZ2ljLCBjb21wb25lbnRzLCBjYWxsYmFjaylcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJSZW5kZXJTeXN0ZW0oY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXJTeXN0ZW0oU3lzdGVtVHlwZS5SZW5kZXIsIGNvbXBvbmVudHMsIGNhbGxiYWNrKVxuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckluaXRTeXN0ZW0oY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXJTeXN0ZW0oU3lzdGVtVHlwZS5Jbml0LCBjb21wb25lbnRzLCBjYWxsYmFjaylcbiAgICB9XG4gICAgXG4gICAgcmVtb3ZlU3lzdGVtKHN5c3RlbUlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVtb3ZlU3lzdGVtKHN5c3RlbUlkKVxuICAgIH1cbiAgICBcbiAgICBvbkxvZ2ljKG9wdHMpIHtcbiAgICAgICAgZm9yIChsZXQgc3lzdGVtIG9mIHRoaXMuc3lzdGVtTWFuYWdlci5sb2dpY1N5c3RlbXMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMpLCBvcHRzKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uUmVuZGVyKG9wdHMpIHtcbiAgICAgICAgZm9yIChsZXQgc3lzdGVtIG9mIHRoaXMuc3lzdGVtTWFuYWdlci5yZW5kZXJTeXN0ZW1zLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBzeXN0ZW0uY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLmdldEVudGl0aWVzKHN5c3RlbS5jb21wb25lbnRzKSwgb3B0cylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5pdChvcHRzKSB7XG4gICAgICAgIGZvciAobGV0IHN5c3RlbSBvZiB0aGlzLnN5c3RlbU1hbmFnZXIuaW5pdFN5c3RlbXMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMpLCBvcHRzKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIEVudGl0eSBGYWN0b3J5XG4gICAgXG4gICAgcmVnaXN0ZXJJbml0aWFsaXplcihjb21wb25lbnQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LnJlZ2lzdGVySW5pdGlhbGl6ZXIodGhpcy5jb21wb25lbnRMb29rdXAuZ2V0KGNvbXBvbmVudCksIGluaXRpYWxpemVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LnJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50LCBpbml0aWFsaXplcilcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBidWlsZCgpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LmJ1aWxkKClcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIFxuICAgIHdpdGhDb21wb25lbnQoY29tcG9uZW50LCBpbml0aWFsaXplcikge1xuICAgICAgICBpZiAodHlwZW9mIGNvbXBvbmVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS53aXRoQ29tcG9uZW50KHRoaXMuY29tcG9uZW50TG9va3VwLmdldChjb21wb25lbnQpLCBpbml0aWFsaXplcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS53aXRoQ29tcG9uZW50KGNvbXBvbmVudCwgaW5pdGlhbGl6ZXIpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZShjb3VudCwgY29uZmlndXJhdGlvbklkKSB7XG4gICAgICAgIGxldCBjb25maWd1cmF0aW9uID0gdW5kZWZpbmVkXG4gICAgICAgIFxuICAgICAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihjb25maWd1cmF0aW9uSWQpICYmIGNvbmZpZ3VyYXRpb25JZCA+IDApIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24gPSB0aGlzLmVudGl0eUNvbmZpZ3VyYXRpb25zLmdldChjb25maWd1cmF0aW9uSWQpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChjb25maWd1cmF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcignQ291bGQgbm90IGZpbmQgZW50aXR5IGNvbmZpZ3VyYXRpb24uIElmIHlvdSB3aXNoIHRvIGNyZWF0ZSBlbnRpdGllcyB3aXRob3V0IGEgY29uZmlndXJhdGlvbiwgZG8gbm90IHBhc3MgYSBjb25maWd1cmF0aW9uSWQuJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuZW50aXR5RmFjdG9yeS5jcmVhdGUodGhpcywgY291bnQsIGNvbmZpZ3VyYXRpb24pXG4gICAgfVxuICAgIFxuICAgIC8vIEV2ZW50IEhhbmRsZXJcbiAgICBcbiAgICBsaXN0ZW4oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci5saXN0ZW4oZXZlbnQsIGNhbGxiYWNrKVxuICAgIH1cbiAgICBcbiAgICBzdG9wTGlzdGVuKGV2ZW50SWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLnN0b3BMaXN0ZW4oZXZlbnRJZClcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLnRyaWdnZXIuY2FsbCh0aGlzLCAuLi5hcmd1bWVudHMpXG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXJEZWxheWVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlckRlbGF5ZWQuY2FsbCh0aGlzLCAuLi5hcmd1bWVudHMpXG4gICAgfVxufVxuXG5leHBvcnQgeyBFbnRpdHlNYW5hZ2VyIH1cbiIsIi8qKlxuICogbWFpbmxvb3AuanMgMS4wLjMtMjAxNjAzMjBcbiAqXG4gKiBAYXV0aG9yIElzYWFjIFN1a2luIChodHRwOi8vd3d3LmlzYWFjc3VraW4uY29tLylcbiAqIEBsaWNlbnNlIE1JVFxuICovXG5cbiFmdW5jdGlvbihhKXtmdW5jdGlvbiBiKGEpe2lmKHY9byhiKSwhKGUraj5hKSl7Zm9yKGQrPWEtZSxlPWEscihhLGQpLGE+ZysxZTMmJihmPS4yNSpoKy43NSpmLGc9YSxoPTApLGgrKyxpPTA7ZD49YzspaWYocyhjKSxkLT1jLCsraT49MjQwKXttPSEwO2JyZWFrfXQoZC9jKSx1KGYsbSksbT0hMX19dmFyIGM9MWUzLzYwLGQ9MCxlPTAsZj02MCxnPTAsaD0wLGk9MCxqPTAsaz0hMSxsPSExLG09ITEsbj1cIm9iamVjdFwiPT10eXBlb2Ygd2luZG93P3dpbmRvdzphLG89bi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fGZ1bmN0aW9uKCl7dmFyIGE9RGF0ZS5ub3coKSxiLGQ7cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiBiPURhdGUubm93KCksZD1NYXRoLm1heCgwLGMtKGItYSkpLGE9YitkLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtlKGIrZCl9LGQpfX0oKSxwPW4uY2FuY2VsQW5pbWF0aW9uRnJhbWV8fGNsZWFyVGltZW91dCxxPWZ1bmN0aW9uKCl7fSxyPXEscz1xLHQ9cSx1PXEsdjthLk1haW5Mb29wPXtnZXRTaW11bGF0aW9uVGltZXN0ZXA6ZnVuY3Rpb24oKXtyZXR1cm4gY30sc2V0U2ltdWxhdGlvblRpbWVzdGVwOmZ1bmN0aW9uKGEpe3JldHVybiBjPWEsdGhpc30sZ2V0RlBTOmZ1bmN0aW9uKCl7cmV0dXJuIGZ9LGdldE1heEFsbG93ZWRGUFM6ZnVuY3Rpb24oKXtyZXR1cm4gMWUzL2p9LHNldE1heEFsbG93ZWRGUFM6ZnVuY3Rpb24oYSl7cmV0dXJuXCJ1bmRlZmluZWRcIj09dHlwZW9mIGEmJihhPTEvMCksMD09PWE/dGhpcy5zdG9wKCk6aj0xZTMvYSx0aGlzfSxyZXNldEZyYW1lRGVsdGE6ZnVuY3Rpb24oKXt2YXIgYT1kO3JldHVybiBkPTAsYX0sc2V0QmVnaW46ZnVuY3Rpb24oYSl7cmV0dXJuIHI9YXx8cix0aGlzfSxzZXRVcGRhdGU6ZnVuY3Rpb24oYSl7cmV0dXJuIHM9YXx8cyx0aGlzfSxzZXREcmF3OmZ1bmN0aW9uKGEpe3JldHVybiB0PWF8fHQsdGhpc30sc2V0RW5kOmZ1bmN0aW9uKGEpe3JldHVybiB1PWF8fHUsdGhpc30sc3RhcnQ6ZnVuY3Rpb24oKXtyZXR1cm4gbHx8KGw9ITAsdj1vKGZ1bmN0aW9uKGEpe3QoMSksaz0hMCxlPWEsZz1hLGg9MCx2PW8oYil9KSksdGhpc30sc3RvcDpmdW5jdGlvbigpe3JldHVybiBrPSExLGw9ITEscCh2KSx0aGlzfSxpc1J1bm5pbmc6ZnVuY3Rpb24oKXtyZXR1cm4ga319LFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoYS5NYWluTG9vcCk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbnVsbCE9PW1vZHVsZSYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZS5leHBvcnRzJiYobW9kdWxlLmV4cG9ydHM9YS5NYWluTG9vcCl9KHRoaXMpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFpbmxvb3AubWluLmpzLm1hcCIsIi8qIEBmbG93ICovXG5cbmltcG9ydCBNYWluTG9vcCBmcm9tICdtYWlubG9vcC5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbkxvb3BMb29wTWFuYWdlciB7XG4gICAgLy8gc2V0VXBkYXRlKHVwZGF0ZU1ldGhvZCA6IChkZWx0YSA6IG51bWJlcikgPT4gdm9pZCkgOiBNYWluTG9vcExvb3BNYW5hZ2VyIHtcbiAgICBzZXRVcGRhdGUodXBkYXRlTWV0aG9kKSB7XG4gICAgICAgIE1haW5Mb29wLnNldFVwZGF0ZSh1cGRhdGVNZXRob2QpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBcbiAgICBzZXRSZW5kZXIocmVuZGVyTWV0aG9kIDogKGludGVycG9sYXRpb25QZXJjZW50YWdlIDogbnVtYmVyKSA9PiB2b2lkKSA6IE1haW5Mb29wTG9vcE1hbmFnZXIge1xuICAgICAgICBNYWluTG9vcC5zZXREcmF3KHJlbmRlck1ldGhvZClcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIFxuICAgIHN0YXJ0KCkgOiB2b2lkIHtcbiAgICAgICAgTWFpbkxvb3Auc3RhcnQoKVxuICAgIH1cbiAgICBcbiAgICBzdG9wKCkgOiB2b2lkIHtcbiAgICAgICAgTWFpbkxvb3Auc3RvcCgpXG4gICAgfVxufSIsIi8qIEBmbG93ICovXG5cbmltcG9ydCB0aHJlZSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRocmVlT2JqZWN0TWVzaExvYWRlciB7XG4gICAgbG9hZGVyICA6IHRocmVlLk9iamVjdExvYWRlcjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5sb2FkZXIgID0gbmV3IHRocmVlLk9iamVjdExvYWRlcigpO1xuICAgIH1cbiAgICBcbiAgICBvblByb2dyZXNzKCkge1xuICAgICAgICAvLyBwbGFjZWhvbGRlclxuICAgIH1cbiAgICBcbiAgICBwYXJzZShqc29uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRlci5wYXJzZShqc29uKVxuICAgIH1cbiAgICBcbiAgICAvLyB0b2RvIHRoaXMgbm93IHJldHVybnMgYSBzY2VuZS4uIGltcGxpY2F0aW9ucz9cbiAgICAvLyB0b2RvIGFkZCBvcHRpb25zIGFzIGEgZGVzdHJ1Y3RhYmxlIG9iamVjdCAtPiBzdG9wcGVkIGJ5IGZsb3c6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9mbG93L2lzc3Vlcy8xODNcbiAgICBsb2FkKHBhdGggOiBzdHJpbmcsIG9wdGlvbnM/IDogT2JqZWN0KSA6IFByb21pc2Uge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNoYWRpbmcgPSAob3B0aW9ucyB8fCB7IH0pLnNoYWRpbmc7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzZWxmLmxvYWRlci5sb2FkKHBhdGgsIG9iaiA9PiByZXNvbHZlKG9iaiksIGluZm8gPT4gc2VsZi5vblByb2dyZXNzKGluZm8pLCBlcnIgPT4gcmVqZWN0KGVycikpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKG1lc2ggPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzaGFkaW5nICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXNoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBtZXNoLnRyYXZlcnNlKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiB0aHJlZS5NZXNoKSB7XG4gICAgICAgICAgICAgICAgICAgY2hpbGQubWF0ZXJpYWwuc2hhZGluZyA9IHNoYWRpbmc7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIG1lc2g7XG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSIsIi8qIEBmbG93ICovXG5cbmltcG9ydCB0aHJlZSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRocmVlUmVuZGVyZXJNYW5hZ2VyIHtcbiAgICByZW5kZXJlciAgICAgOiB0aHJlZS5XZWJHTFJlbmRlcmVyO1xuICAgIGNhbWVyYSAgICAgICA6IHRocmVlLkNhbWVyYTtcbiAgICAvLyBnZW9tZXRyaWVzICAgOiBNYXA8c3RyaW5nLCB0aHJlZS5HZW9tZXRyeT47XG4gICAgLy8gbWF0ZXJpYWxzICAgIDogTWFwPHN0cmluZywgdGhyZWUuTWF0ZXJpYWw+O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IHRocmVlLldlYkdMUmVuZGVyZXIoeyBhbnRpYWxpYXMgOiB0cnVlIH0pO1xuXHRcdHRoaXMucmVuZGVyZXIuc2V0Q2xlYXJDb2xvciggMHgwMDAwMDAgKTtcblx0XHR0aGlzLnJlbmRlcmVyLnNldFBpeGVsUmF0aW8oIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvICk7XG4gICAgfVxuICAgIFxuICAgIGVuYWJsZVNoYWRvd3MoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlXG4gICAgfVxuICAgIFxuICAgIGlzRnVsbFNjcmVlbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuX2Z1bGxTY3JlZW5cbiAgICB9XG4gICAgXG4gICAgLy90b2RvIG1ha2UgaW50byBnZXR0ZXIgLyBzZXR0ZXIgP1xuICAgIHNldFNjZW5lKHNjZW5lKSB7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZVxuICAgIH1cbiAgICBcbiAgICBzZXRDYW1lcmEoY2FtZXJhLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhXG4gICAgfVxuICAgIFxuICAgIHNldFNpemUod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNGdWxsU2NyZWVuKCkpIHtcblx0XHQgICAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gKHdpZHRoIHx8IDUwMCkgLyAoaGVpZ2h0IHx8IDUwMClcbiAgICBcdH1cblx0XHRcblx0XHR0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KClcblx0XHRcblx0XHRpZiAoIXRoaXMuaXNGdWxsU2NyZWVuKCkpIHtcblx0ICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUod2lkdGggfHwgNTAwLCBoZWlnaHQgfHwgNTAwKVxuXHRcdH1cbiAgICB9XG4gICAgXG4gICAgZ2V0RG9tKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5kb21FbGVtZW50XG4gICAgfVxuICAgIFxuICAgIGdldFNjZW5lKCkgOiB0aHJlZS5TY2VuZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjZW5lO1xuICAgIH1cbiAgICBcbiAgICBnZXRHZW9tZXRyeShrZXkgOiBzdHJpbmcpIDogdGhyZWUuR2VvbWV0cnkge1xuICAgICAgICByZXR1cm4gZ2VvbWV0cmllcy5nZXQoa2V5KTtcbiAgICB9XG4gICAgXG4gICAgZ2V0TWF0ZXJpYWwoa2V5IDogc3RyaW5nKSA6IHRocmVlLk1hdGVyaWFsIHtcbiAgICAgICAgcmV0dXJuIG1hdGVyaWFscy5nZXQoa2V5KTtcbiAgICB9XG4gICAgXG4gICAgYWRkTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpIHtcbiAgICAgICAgdmFyIGdlbyA9IHRoaXMuZ2VvbWV0cmllcy5nZXQoZ2VvbWV0cnkpO1xuICAgICAgICB2YXIgbWF0ID0gdGhpcy5tYXRlcmlhbHMuZ2V0KG1hdGVyaWFsKTtcbiAgICAgICAgdmFyIG1lc2ggPSBuZXcgdGhyZWUuTWVzaChnZW8sIG1hdCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNjZW5lLmFkZChtZXNoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBtZXNoO1xuICAgIH1cbiAgICBcbiAgICByZW5kZXIoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UgOiBudW1iZXIpIDogdm9pZCB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhKTtcbiAgICB9XG4gICAgXG4gICAgLy8gcmVuZGVyKHNjZW5lIDogdGhyZWUuU2NlbmUsIGludGVycG9sYXRpb25QZXJjZW50YWdlIDogbnVtYmVyKSA6IHZvaWQge1xuICAgIC8vICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcihzY2VuZSwgdGhpcy5jYW1lcmEpO1xuICAgIC8vIH1cbn1cbiIsImltcG9ydCB7RW50aXR5TWFuYWdlcn0gICAgICAgZnJvbSAnZ2ctZW50aXRpZXMnXG5pbXBvcnQgTWFpbkxvb3BMb29wTWFuYWdlciAgIGZyb20gJy4uL2xvZ2ljL21haW5sb29wLWxvb3AtbWFuYWdlcidcbi8vIGltcG9ydCBGZXRjaEZpbGVMb2FkZXIgICAgICAgZnJvbSAnLi4vbG9naWMvZmV0Y2gtZmlsZS1sb2FkZXInXG5pbXBvcnQgVGhyZWVPYmplY3RNZXNoTG9hZGVyIGZyb20gJy4uL2xvZ2ljL3RocmVlLW9iamVjdC1tZXNoLWxvYWRlcidcblxuaW1wb3J0IFRocmVlUmVuZGVyZXJNYW5hZ2VyIGZyb20gJy4uL3ZpZXcvdGhyZWUtcmVuZGVyZXItbWFuYWdlcidcblxuY29uc3QgX2xvb3BNYW5hZ2VyICAgICA9IG5ldyBNYWluTG9vcExvb3BNYW5hZ2VyKClcbi8vIGNvbnN0IF9maWxlTG9hZGVyICAgICAgPSBuZXcgRmV0Y2hGaWxlTG9hZGVyKClcbmNvbnN0IF9sb2FkZXIgICAgICAgICAgPSBuZXcgVGhyZWVPYmplY3RNZXNoTG9hZGVyKClcbmNvbnN0IF9yZW5kZXJlck1hbmFnZXIgPSBuZXcgVGhyZWVSZW5kZXJlck1hbmFnZXIoKVxuY29uc3QgX2VudGl0eU1hbmFnZXIgICA9IG5ldyBFbnRpdHlNYW5hZ2VyKClcblxuY29uc3QgbG9vcE1hbmFnZXIgICAgID0gKCkgPT4gX2xvb3BNYW5hZ2VyXG4vLyBjb25zdCBmaWxlTG9hZGVyICAgICAgPSAoKSA9PiBfZmlsZUxvYWRlclxuY29uc3QgbG9hZGVyICAgICAgICAgID0gKCkgPT4gX2xvYWRlclxuY29uc3QgcmVuZGVyZXJNYW5hZ2VyID0gKCkgPT4gX3JlbmRlcmVyTWFuYWdlclxuY29uc3QgZW50aXR5TWFuYWdlciAgID0gKCkgPT4gX2VudGl0eU1hbmFnZXJcblxuZXhwb3J0IGRlZmF1bHQge2xvb3BNYW5hZ2VyLCBsb2FkZXIsIHJlbmRlcmVyTWFuYWdlciwgZW50aXR5TWFuYWdlcn1cbmV4cG9ydCB7bG9vcE1hbmFnZXIsIGxvYWRlciwgcmVuZGVyZXJNYW5hZ2VyLCBlbnRpdHlNYW5hZ2VyfSIsIi8vIC8qIEBmbG93ICovXG5cbi8vIHRvZG8gbWFrZSBESSBub3QgYmUgaGFyZGNvZGVkXG5pbXBvcnQgREkgZnJvbSAnLi9ESS9icm93c2VyJ1xuXG5jb25zdCBDT01QT05FTlQgPSB7XG4gICAgVFJBTlNGT1JNOiAndHJhbnNmb3JtJyxcbiAgICBBUFBFQVJBTkNFOiAnYXBwZWFyYW5jZSdcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR0cge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIFx0Ly8gd2lkdGggYW5kIGhlaWdodCBzZXQgdG8gNTAwIGp1c3QgdG8gaGF2ZSBpdCBhcyBpbiB0aGUgZWRpdG9yIGZvciB0aGUgdGltZSBiZWluZ1xuICAgIFx0dGhpcy53aWR0aCAgPSA1MDBcbiAgICBcdHRoaXMuaGVpZ2h0ID0gNTAwXG5cbiAgICAgICAgdGhpcy5lbnRpdHlNYW5hZ2VyICAgPSBESS5lbnRpdHlNYW5hZ2VyKClcbiAgICAgICAgdGhpcy5sb29wTWFuYWdlciAgICAgPSBESS5sb29wTWFuYWdlcigpXG4gICAgICAgIHRoaXMucmVuZGVyZXJNYW5hZ2VyID0gREkucmVuZGVyZXJNYW5hZ2VyKClcbiAgICAgICAgdGhpcy5sb2FkZXJcdFx0XHQgPSBESS5sb2FkZXIoKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5kb20gPSB0aGlzLnJlbmRlcmVyTWFuYWdlci5nZXREb20oKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5pbml0Q29tcG9uZW50cygpXG4gICAgICAgIHRoaXMuaW5pdFN5c3RlbXMoKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlNYW5hZ2VyLm9uSW5pdCh7cmVuZGVyTWFuYWdlcjogdGhpcy5yZW5kZXJlck1hbmFnZXJ9KVxuICAgICAgICBcbiAgICAgICAgdGhpcy5sb29wTWFuYWdlci5zZXRVcGRhdGUoZGVsdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbnRpdHlNYW5hZ2VyLm9uTG9naWMoZGVsdGEpXG4gICAgICAgIH0pLnNldFJlbmRlcihpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIub25SZW5kZXIoe2RlbHRhIDogaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UsIHJlbmRlck1hbmFnZXI6IHRoaXMucmVuZGVyZXJNYW5hZ2VyfSlcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXJNYW5hZ2VyLnJlbmRlcihpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSlcbiAgICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgc2V0RW50aXR5RGF0YShlbnRpdHlEYXRhKSB7XG4gICAgICAgIHRoaXMuZW50aXR5RGF0YSA9IGVudGl0eURhdGFcbiAgICB9XG5cbiAgICBpbml0Q29tcG9uZW50cygpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlNYW5hZ2VyLnJlZ2lzdGVyQ29tcG9uZW50KENPTVBPTkVOVC5UUkFOU0ZPUk0sICB7eDogMCwgeTogMCwgejogMH0pXG4gICAgICAgIHRoaXMuZW50aXR5TWFuYWdlci5yZWdpc3RlckNvbXBvbmVudChDT01QT05FTlQuQVBQRUFSQU5DRSwge2lkOiAwfSlcbiAgICB9XG4gICAgXG4gICAgaW5pdFN5c3RlbXMoKSB7XG4gICAgICAgIGNvbnN0IHJlbmRlckNvbXBvbmVudHMgPSBbXG4gICAgICAgICAgICBDT01QT05FTlQuVFJBTlNGT1JNLFxuICAgICAgICAgICAgQ09NUE9ORU5ULkFQUEVBUkFOQ0VcbiAgICAgICAgXVxuICAgICAgICBcbiAgICAgICAgY29uc3QgcmVuZGVyID0gKGVudGl0aWVzLCB7cmVuZGVyTWFuYWdlcn0pID0+IHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qge2VudGl0eX0gb2YgZW50aXRpZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7YXBwZWFyYW5jZSwgdHJhbnNmb3JtfSA9IGVudGl0eVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IG9iaiA9IHJlbmRlck1hbmFnZXIuc2NlbmUuZ2V0T2JqZWN0QnlJZChhcHBlYXJhbmNlLmlkKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChvYmogPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBvYmoucG9zaXRpb24ueCA9IHRyYW5zZm9ybS54XG4gICAgICAgICAgICAgICAgb2JqLnBvc2l0aW9uLnkgPSB0cmFuc2Zvcm0ueVxuICAgICAgICAgICAgICAgIG9iai5wb3NpdGlvbi56ID0gdHJhbnNmb3JtLnpcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlNYW5hZ2VyLnJlZ2lzdGVyUmVuZGVyU3lzdGVtKHJlbmRlckNvbXBvbmVudHMsIHJlbmRlcilcbiAgICB9XG4gICAgXG4gICAgaW5pdEVudGl0aWVzKHBhcnNlZFNjZW5lKSB7XG4gICAgICAgIHBhcnNlZFNjZW5lLnRyYXZlcnNlKChvYmopID0+IHtcblx0XHQgICAgbGV0IGNvbmZpZyA9IHRoaXMuZW50aXR5TWFuYWdlci5idWlsZCgpXG5cdFx0XHQgICAgXG5cdFx0ICAgIGNvbmZpZy53aXRoQ29tcG9uZW50KENPTVBPTkVOVC5UUkFOU0ZPUk0sIGZ1bmN0aW9uKCkge1xuXHRcdCAgICAgICAgdGhpcy54ID0gb2JqLnBvc2l0aW9uLnhcblx0XHQgICAgICAgIHRoaXMueSA9IG9iai5wb3NpdGlvbi55XG5cdFx0ICAgICAgICB0aGlzLnogPSBvYmoucG9zaXRpb24uelxuXHQgICAgICAgIH0pXG5cdCAgICAgICAgXG5cdCAgICAgICAgLy90b2RvOiBtYWtlIG9ubHkgdmlzaWJsZSBvYmplY3RzIGdldCB0aGlzXG5cdCAgICAgICAgaWYgKG9iai5pZCAmJiBvYmoudmlzaWJsZSkge1xuXHQgICAgICAgICAgICBjb25maWcud2l0aENvbXBvbmVudChDT01QT05FTlQuQVBQRUFSQU5DRSwgZnVuY3Rpb24oKSB7XG4gICAgXHQgICAgICAgICAgIHRoaXMuaWQgPSBvYmouaWRcbiAgICBcdCAgICAgICAgfSlcblx0ICAgICAgICB9XG5cdCAgICAgICAgXG5cdCAgICAgICAgY29uc3QgY29tcG9uZW50cyA9IHRoaXMuZW50aXR5RGF0YVtvYmoudXVpZF1cblxuXHRcdFx0aWYgKGNvbXBvbmVudHMpIHtcdCAgICAgICAgXG5cdFx0XHQgICAgT2JqZWN0LmtleXMoY29tcG9uZW50cykuZm9yRWFjaChrZXkgPT4ge1xuXHQgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGNvbXBvbmVudHNba2V5XVxuXHQgICAgICAgICAgICAgICAgXG5cdCAgICAgICAgICAgICAgICBjb25maWcud2l0aENvbXBvbmVudChrZXksIGZ1bmN0aW9uKCkge1xuXHRcdCAgICAgICAgICAgICAgICAvLyB0b2RvIGhhbmRsZSBub24tb2JqZWN0c1xuXHRcdCAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1trZXldID09IG51bGwgfHwgZGF0YVtrZXldID09IG51bGwgfHwgdGhpc1trZXldID09PSBkYXRhW2tleV0pIHtcblx0XHQgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cblx0XHQgICAgICAgICAgICAgICAgICAgIH1cblx0XHQgICAgICAgICAgICAgICAgICAgIFxuXHRcdCAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gZGF0YVtrZXldXG5cdFx0ICAgICAgICAgICAgICAgIH0sIHRoaXMpXG5cdFx0ICAgICAgICAgICAgfSlcblx0ICAgICAgICAgICAgfSwgdGhpcylcblx0XHRcdH1cblxuXHRcdFx0Y29uZmlnLmNyZWF0ZSgxKVxuXHRcdH0pXG4gICAgfVxuICAgIFxuICAgIGxvYWQoe3Byb2plY3QsIHNjZW5lLCBjYW1lcmF9KSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZFNjZW5lID0gdGhpcy5sb2FkZXIucGFyc2Uoc2NlbmUpXG4gICAgICAgIGNvbnN0IHBhcnNlZENhbWVyYSA9IHRoaXMubG9hZGVyLnBhcnNlKGNhbWVyYSlcblx0XHRcblx0XHR0aGlzLmluaXRFbnRpdGllcyhwYXJzZWRTY2VuZSlcblxuICAgIFx0aWYgKHByb2plY3Quc2hhZG93cykge1xuXHRcdFx0dGhpcy5yZW5kZXJlck1hbmFnZXIuZW5hYmxlU2hhZG93cygpXG5cdFx0fVxuXHRcdFxuICAgIFx0Ly90b2RvOiBjaGVjayBmb3IgY2FtZXJhIGFuZCBzY2VuZSBmaXJzdD8gdGhyb3cgaWYgbm90P1xuICAgIFx0dGhpcy5yZW5kZXJlck1hbmFnZXIuc2V0U2NlbmUocGFyc2VkU2NlbmUpXG4gICAgXHR0aGlzLnJlbmRlcmVyTWFuYWdlci5zZXRDYW1lcmEocGFyc2VkQ2FtZXJhLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcblx0fVxuICAgIFxuICAgIHNldFNpemUod2lkdGgsIGhlaWdodCkgIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlbmRlcmVyTWFuYWdlci5zZXRTaXplKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KVxuICAgIH1cbiAgICBcbiAgICBnZXREb20oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyTWFuYWdlci5nZXREb20oKVxuICAgIH1cbiAgICBcbiAgICBwbGF5KCkge1xuICAgICAgICB0aGlzLmxvb3BNYW5hZ2VyLnN0YXJ0KClcbiAgICB9XG4gICAgXG4gICAgc3RvcCgpIHtcbiAgICAgICAgdGhpcy5sb29wTWFuYWdlci5zdG9wKClcbiAgICB9XG59Il0sIm5hbWVzIjpbInRoaXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0NBRUEsTUFBTSxhQUFhLENBQUM7QUFDcEIsQ0FBQSxJQUFJLFdBQVcsR0FBRztBQUNsQixDQUFBLFFBQVEsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLEdBQUcsRUFBRTtBQUN0QyxDQUFBLFFBQVEsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBRTtBQUN0QyxDQUFBLEtBQUs7QUFD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LENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxPQUFPLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLE9BQU8sTUFBTSxFQUFFLElBQUksR0FBRyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDQSxjQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0NIendDOzs7Ozs7OztBQUNqQixDQUFBO21DQUNVLGNBQWM7QUFDcEIsQ0FBQSxx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
