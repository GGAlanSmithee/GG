(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('three')) :
	typeof define === 'function' && define.amd ? define('GG', ['three'], factory) :
	(global.GG = factory(global.THREE));
}(this, (function (three) { 'use strict';

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

// import FetchFileLoader       from '../logic/fetch-file-loader'
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

// /*  */

// todo make DI not be hardcoded
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

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uLy4uL2VuZ2luZS9ub2RlX21vZHVsZXMvZ2ctZW50aXRpZXMvc3JjL2NvcmUvZW50aXR5LWZhY3RvcnkuanMiLCIuLi8uLi9lbmdpbmUvbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL3NyYy9jb3JlL2NvbXBvbmVudC1tYW5hZ2VyLmpzIiwiLi4vLi4vZW5naW5lL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9zeXN0ZW0tbWFuYWdlci5qcyIsIi4uLy4uL2VuZ2luZS9ub2RlX21vZHVsZXMvZ2ctZW50aXRpZXMvc3JjL2NvcmUvZXZlbnQtaGFuZGxlci5qcyIsIi4uLy4uL2VuZ2luZS9ub2RlX21vZHVsZXMvZ2ctZW50aXRpZXMvc3JjL2NvcmUvZW50aXR5LW1hbmFnZXIuanMiLCIuLi8uLi9lbmdpbmUvbm9kZV9tb2R1bGVzL21haW5sb29wLmpzL2J1aWxkL21haW5sb29wLm1pbi5qcyIsIi4uLy4uL2VuZ2luZS9zcmMvbG9naWMvbWFpbmxvb3AtbG9vcC1tYW5hZ2VyLmpzIiwiLi4vLi4vZW5naW5lL3NyYy9sb2dpYy90aHJlZS1vYmplY3QtbWVzaC1sb2FkZXIuanMiLCIuLi8uLi9lbmdpbmUvc3JjL3ZpZXcvdGhyZWUtcmVuZGVyZXItbWFuYWdlci5qcyIsIi4uLy4uL2VuZ2luZS9zcmMvREkvYnJvd3Nlci5qcyIsIi4uLy4uL2VuZ2luZS9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5TWFuYWdlciB9IGZyb20gJy4vZW50aXR5LW1hbmFnZXInXG5cbmNsYXNzIEVudGl0eUZhY3Rvcnkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVycyAgPSBuZXcgTWFwKClcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gbmV3IE1hcCgpXG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVySW5pdGlhbGl6ZXIoaWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihpZCkgfHwgaWQgPD0gMCkge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdpZCBtdXN0IGJlIGEgcG9zZXRpdmUgaW50ZWdlci4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGluaXRpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2luaXRpYWxpemVyIG11c3QgYmUgYSBmdW5jdGlvbi4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmluaXRpYWxpemVycy5zZXQoaWQsIGluaXRpYWxpemVyKVxuICAgIH1cbiAgICBcbiAgICBidWlsZCgpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gbmV3IE1hcCgpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBcbiAgICB3aXRoQ29tcG9uZW50KGNvbXBvbmVudElkLCBpbml0aWFsaXplcikge1xuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoY29tcG9uZW50SWQpIHx8IGNvbXBvbmVudElkIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgaW5pdGlhbGl6ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGluaXRpYWxpemVyID0gdGhpcy5pbml0aWFsaXplcnMuZ2V0KGNvbXBvbmVudElkKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uc2V0KGNvbXBvbmVudElkLCBpbml0aWFsaXplcilcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZUNvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb25cbiAgICB9XG4gICAgXG4gICAgY3JlYXRlKGVudGl0eU1hbmFnZXIsIGNvdW50ID0gMSwgY29uZmlndXJhdGlvbiA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIShlbnRpdHlNYW5hZ2VyIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlcikpIHtcbiAgICAgICAgICAgIHJldHVybiBbXVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmIChjb25maWd1cmF0aW9uID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24gPSB0aGlzLmNvbmZpZ3VyYXRpb25cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3QgY29tcG9uZW50cyA9IEFycmF5LmZyb20oY29uZmlndXJhdGlvbi5rZXlzKCkpLnJlZHVjZSgoY3VyciwgbmV4dCkgPT4gY3VyciB8PSBuZXh0LCAwKVxuICAgICAgICBcbiAgICAgICAgbGV0IGVudGl0aWVzID0gW11cbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7ICsraSkge1xuICAgICAgICAgICAgbGV0IHsgaWQsIGVudGl0eSB9ID0gZW50aXR5TWFuYWdlci5uZXdFbnRpdHkoY29tcG9uZW50cylcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGlkID49IGVudGl0eU1hbmFnZXIuY2FwYWNpdHkpIHtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBbY29tcG9uZW50LCBpbml0aWFsaXplcl0gb2YgY29uZmlndXJhdGlvbikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5pdGlhbGl6ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gaW5pdGlhbGl6ZXIuY2FsbChlbnRpdHlbY29tcG9uZW50XSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVudGl0eVtjb21wb25lbnRdICE9PSAnb2JqZWN0JyAmJiByZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHlbY29tcG9uZW50XSA9IHJlc3VsdFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZW50aXRpZXMucHVzaCh7IGlkLCBlbnRpdHkgfSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLmxlbmd0aCA9PT0gMSA/IGVudGl0aWVzWzBdIDogZW50aXRpZXNcbiAgICB9XG59XG5cbmV4cG9ydCB7IEVudGl0eUZhY3RvcnkgfVxuIiwiY2xhc3MgQ29tcG9uZW50TWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IG5ldyBNYXAoKVxuICAgIH1cbiAgICBcbiAgICBuZXdDb21wb25lbnQoY29tcG9uZW50SWQpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50cy5nZXQoY29tcG9uZW50SWQpXG4gICAgICAgIFxuICAgICAgICBpZiAoY29tcG9uZW50ID09PSBudWxsIHx8IGNvbXBvbmVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IGNvbXBvbmVudCgpXG4gICAgICAgICAgICBjYXNlICdvYmplY3QnICA6IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKChjb21wb25lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJldCA9IHt9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjb21wb25lbnQpLmZvckVhY2goa2V5ID0+IHJldFtrZXldID0gY29tcG9uZW50W2tleV0pXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0XG4gICAgICAgICAgICAgICAgfSkoY29tcG9uZW50KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9uZW50XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgICAgIGlmIChjb21wb25lbnQgPT09IG51bGwgfHwgY29tcG9uZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignY29tcG9uZW50IGNhbm5vdCBiZSBudWxsIG9yIHVuZGVmaW5lZC4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBtYXggPSBNYXRoLm1heCguLi50aGlzLmNvbXBvbmVudHMua2V5cygpKVxuICAgICAgICBcbiAgICAgICAgY29uc3QgaWQgPSBtYXggPT09IHVuZGVmaW5lZCB8fCBtYXggPT09IG51bGwgfHwgbWF4ID09PSAtSW5maW5pdHkgPyAxIDogbWF4ID09PSAwID8gMSA6IG1heCAqIDJcblxuICAgICAgICB0aGlzLmNvbXBvbmVudHMuc2V0KGlkLCBjb21wb25lbnQpXG5cbiAgICAgICAgcmV0dXJuIGlkXG4gICAgfVxuICAgIFxuICAgIGdldENvbXBvbmVudHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudHNcbiAgICB9XG59XG5cbmV4cG9ydCB7IENvbXBvbmVudE1hbmFnZXIgfVxuIiwiZXhwb3J0IGNvbnN0IFN5c3RlbVR5cGUgPSB7XG4gICAgTG9naWMgIDogMCxcbiAgICBSZW5kZXIgOiAxLFxuICAgIEluaXQgICA6IDJcbn1cblxuY2xhc3MgU3lzdGVtTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubG9naWNTeXN0ZW1zICA9IG5ldyBNYXAoKVxuICAgICAgICB0aGlzLnJlbmRlclN5c3RlbXMgPSBuZXcgTWFwKClcbiAgICAgICAgdGhpcy5pbml0U3lzdGVtcyAgID0gbmV3IE1hcCgpXG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyU3lzdGVtKHR5cGUsIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlICE9PSBTeXN0ZW1UeXBlLkxvZ2ljICYmIHR5cGUgIT09IFN5c3RlbVR5cGUuUmVuZGVyICYmIHR5cGUgIT09IFN5c3RlbVR5cGUuSW5pdCkge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCd0eXBlIG11c3QgYmUgYSB2YWxpZCBTeXN0ZW1UeXBlLicpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50cyAhPT0gJ251bWJlcicpICB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvbXBvbmVudHMgbXVzdCBiZSBhIG51bWJlci4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbi4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzeXN0ZW0gPSB7XG4gICAgICAgICAgICBjb21wb25lbnRzLFxuICAgICAgICAgICAgY2FsbGJhY2tcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3Qgc3lzdGVtSWQgPSBNYXRoLm1heCgwLCAuLi50aGlzLmxvZ2ljU3lzdGVtcy5rZXlzKCksIC4uLnRoaXMucmVuZGVyU3lzdGVtcy5rZXlzKCksIC4uLnRoaXMuaW5pdFN5c3RlbXMua2V5cygpKSArIDFcbiAgICAgICAgXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBTeXN0ZW1UeXBlLkxvZ2ljIDogdGhpcy5sb2dpY1N5c3RlbXMuc2V0KHN5c3RlbUlkLCBzeXN0ZW0pOyBicmVha1xuICAgICAgICAgICAgY2FzZSBTeXN0ZW1UeXBlLlJlbmRlciA6IHRoaXMucmVuZGVyU3lzdGVtcy5zZXQoc3lzdGVtSWQsIHN5c3RlbSk7IGJyZWFrXG4gICAgICAgICAgICBjYXNlIFN5c3RlbVR5cGUuSW5pdCA6IHRoaXMuaW5pdFN5c3RlbXMuc2V0KHN5c3RlbUlkLCBzeXN0ZW0pOyBicmVha1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gc3lzdGVtSWRcbiAgICB9XG4gICAgXG4gICAgcmVtb3ZlU3lzdGVtKHN5c3RlbUlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2ljU3lzdGVtcy5kZWxldGUoc3lzdGVtSWQpIHx8IHRoaXMucmVuZGVyU3lzdGVtcy5kZWxldGUoc3lzdGVtSWQpIHx8IHRoaXMuaW5pdFN5c3RlbXMuZGVsZXRlKHN5c3RlbUlkKVxuICAgIH1cbn1cblxuZXhwb3J0IHsgU3lzdGVtTWFuYWdlciB9XG4iLCJpbXBvcnQgeyBFbnRpdHlNYW5hZ2VyIH0gZnJvbSAnLi9lbnRpdHktbWFuYWdlcidcblxuY29uc3QgZW1wdHlQcm9taXNlID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgfSlcbn1cblxuY29uc3QgcHJvbWlzZSA9IChjYWxsYmFjaywgY29udGV4dCwgYXJncywgdGltZW91dCkgPT4ge1xuICAgIGlmICh0aW1lb3V0KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHR5cGVvZiBjb250ZXh0ID09PSAgJ29iamVjdCcgPyBjYWxsYmFjay5jYWxsKGNvbnRleHQsIC4uLmFyZ3MpIDogY2FsbGJhY2suYXBwbHkoY29udGV4dCwgLi4uYXJncykpXG4gICAgICAgICAgICB9LCB0aW1lb3V0KVxuICAgICAgICB9KVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIHJlc29sdmUodHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnID8gY2FsbGJhY2suY2FsbChjb250ZXh0LCAuLi5hcmdzKSA6IGNhbGxiYWNrLmFwcGx5KGNvbnRleHQsIC4uLmFyZ3MpKVxuICAgIH0pXG59XG4gICAgXG5jbGFzcyBFdmVudEhhbmRsZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBNYXAoKVxuICAgIH1cbiAgICBcbiAgICBsaXN0ZW4oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnQgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICghdGhpcy5ldmVudHMuaGFzKGV2ZW50KSkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMuc2V0KGV2ZW50LCBuZXcgTWFwKCkpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBldmVudElkID0gLTFcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnRJZCA9IE1hdGgubWF4KGV2ZW50SWQsIC4uLmV2ZW50LmtleXMoKSlcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICArK2V2ZW50SWRcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZXZlbnRzLmdldChldmVudCkuc2V0KGV2ZW50SWQsIGNhbGxiYWNrKVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGV2ZW50SWRcbiAgICB9XG4gICAgXG4gICAgc3RvcExpc3RlbihldmVudElkKSB7XG4gICAgICAgIGZvciAobGV0IGV2ZW50cyBvZiB0aGlzLmV2ZW50cy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaWQgb2YgZXZlbnRzLmtleXMoKSkge1xuICAgICAgICAgICAgICAgIGlmIChpZCA9PT0gZXZlbnRJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnRzLmRlbGV0ZShldmVudElkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBcbiAgICB0cmlnZ2VyKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXMgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyID8gdGhpcy5ldmVudEhhbmRsZXIgOiB0aGlzXG4gICAgICAgIFxuICAgICAgICBsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKVxuICAgICAgICBcbiAgICAgICAgbGV0IFsgZXZlbnQgXSA9IGFyZ3Muc3BsaWNlKDAsIDEpXG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCAhc2VsZi5ldmVudHMuaGFzKGV2ZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIGVtcHR5UHJvbWlzZSgpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdXG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBjYWxsYmFjayBvZiBzZWxmLmV2ZW50cy5nZXQoZXZlbnQpLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHByb21pc2UoY2FsbGJhY2ssIHRoaXMsIGFyZ3MpKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpXG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXJEZWxheWVkKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXMgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyID8gdGhpcy5ldmVudEhhbmRsZXIgOiB0aGlzXG4gICAgICAgIFxuICAgICAgICBsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKVxuICAgICAgICBcbiAgICAgICAgbGV0IFsgZXZlbnQsIHRpbWVvdXQgXSA9IGFyZ3Muc3BsaWNlKDAsIDIpXG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCAhTnVtYmVyLmlzSW50ZWdlcih0aW1lb3V0KSB8fCAhc2VsZi5ldmVudHMuaGFzKGV2ZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIGVtcHR5UHJvbWlzZSgpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdXG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBjYWxsYmFjayBvZiBzZWxmLmV2ZW50cy5nZXQoZXZlbnQpLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHByb21pc2UoY2FsbGJhY2ssIHRoaXMsIGFyZ3MsIHRpbWVvdXQpKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpXG4gICAgfVxufVxuXG5leHBvcnQgeyBFdmVudEhhbmRsZXIgfVxuIiwiaW1wb3J0IHsgRW50aXR5RmFjdG9yeSB9ICAgICAgICAgICAgIGZyb20gJy4vZW50aXR5LWZhY3RvcnknXG5pbXBvcnQgeyBDb21wb25lbnRNYW5hZ2VyIH0gICAgICAgICAgZnJvbSAnLi9jb21wb25lbnQtbWFuYWdlcidcbmltcG9ydCB7IFN5c3RlbU1hbmFnZXIsIFN5c3RlbVR5cGUgfSBmcm9tICcuL3N5c3RlbS1tYW5hZ2VyJ1xuaW1wb3J0IHsgRXZlbnRIYW5kbGVyIH0gICAgICAgICAgICAgIGZyb20gJy4vZXZlbnQtaGFuZGxlcidcblxuY2xhc3MgRW50aXR5TWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoY2FwYWNpdHkgPSAxMDAwKSB7XG4gICAgICAgIHRoaXMuY2FwYWNpdHkgICAgICAgICA9IGNhcGFjaXR5XG4gICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IC0xXG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkgICAgPSBuZXcgRW50aXR5RmFjdG9yeSgpXG4gICAgICAgIHRoaXMuc3lzdGVtTWFuYWdlciAgICA9IG5ldyBTeXN0ZW1NYW5hZ2VyKClcbiAgICAgICAgdGhpcy5jb21wb25lbnRNYW5hZ2VyID0gbmV3IENvbXBvbmVudE1hbmFnZXIoKVxuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlciAgICAgPSBuZXcgRXZlbnRIYW5kbGVyKClcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXR5Q29uZmlndXJhdGlvbnMgPSBuZXcgTWFwKClcbiAgICAgICAgdGhpcy5jb21wb25lbnRMb29rdXAgICAgICA9IG5ldyBNYXAoKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdGllcyA9IEFycmF5LmZyb20oeyBsZW5ndGggOiB0aGlzLmNhcGFjaXR5IH0sICgpID0+ICh7IGNvbXBvbmVudHM6IDAgfSkpXG4gICAgfVxuICAgIFxuICAgIGluY3JlYXNlQ2FwYWNpdHkoKSB7XG4gICAgICAgIGxldCBvbGRDYXBhY2l0eSA9IHRoaXMuY2FwYWNpdHlcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2FwYWNpdHkgKj0gMlxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdGllcyA9IFsuLi50aGlzLmVudGl0aWVzLCAuLi5BcnJheS5mcm9tKHsgbGVuZ3RoIDogb2xkQ2FwYWNpdHkgfSwgKCkgPT4gKHsgY29tcG9uZW50czogMCB9KSldXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IG9sZENhcGFjaXR5OyBpIDwgdGhpcy5jYXBhY2l0eTsgKytpKSB7XG4gICAgICAgICAgICBsZXQgZW50aXR5ID0gdGhpcy5lbnRpdGllc1tpXVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNvbXBvbmVudElkIG9mIHRoaXMuY29tcG9uZW50TWFuYWdlci5nZXRDb21wb25lbnRzKCkua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbXBvbmVudE5hbWUgPSBudWxsXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgW2tleSwgdmFsdWVdIG9mIHRoaXMuY29tcG9uZW50TG9va3VwLmVudHJpZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IGNvbXBvbmVudElkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnROYW1lID0ga2V5XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlbnRpdHlbY29tcG9uZW50SWRdID0gdGhpcy5jb21wb25lbnRNYW5hZ2VyLm5ld0NvbXBvbmVudChjb21wb25lbnRJZClcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZW50aXR5LCBjb21wb25lbnROYW1lLCB7IGdldCgpIHsgcmV0dXJuIHRoaXNbY29tcG9uZW50SWRdIH0sIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG5ld0VudGl0eShjb21wb25lbnRzKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbXBvbmVudHMpKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzID0gQXJyYXkuZnJvbSh0aGlzLmNvbXBvbmVudExvb2t1cCkucmVkdWNlKChjdXJyLCBuZXh0KSA9PiBbJycsIGN1cnJbMV0gfCBuZXh0WzFdXSwgWycnLCAwXSlbMV1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGNvbXBvbmVudHMpIHx8IGNvbXBvbmVudHMgPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgaWQgOiB0aGlzLmNhcGFjaXR5LCBlbnRpdHkgOiBudWxsIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGlkID0gMFxuICAgICAgICBcbiAgICAgICAgZm9yICg7IGlkIDwgdGhpcy5jYXBhY2l0eTsgKytpZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMgPT09IDApIHtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoaWQgPj0gdGhpcy5jYXBhY2l0eSkge1xuICAgICAgICAgICAgLy8gdG9kbzogYXV0byBpbmNyZWFzZSBjYXBhY2l0eT9cbiAgICAgICAgICAgIHJldHVybiB7IGlkIDogdGhpcy5jYXBhY2l0eSwgZW50aXR5IDogbnVsbCB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChpZCA+IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWF4RW50aXR5ID0gaWRcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdGllc1tpZF0uY29tcG9uZW50cyA9IGNvbXBvbmVudHNcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB7IGlkLCBlbnRpdHkgOiB0aGlzLmVudGl0aWVzW2lkXSB9XG4gICAgfVxuICAgIFxuICAgIGRlbGV0ZUVudGl0eShpZCkge1xuICAgICAgICAvL3RvZG8gYWRkIHNhbml0eSBjaGVja1xuICAgICAgICB0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzID0gMFxuICAgICAgICBcbiAgICAgICAgaWYgKGlkIDwgdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IGlkOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbaV0uY29tcG9uZW50cyAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IGlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IDBcbiAgICB9XG5cbiAgICAvLyBEb2VzIG5vdCBhbGxvdyBjb21wb25lbnRzIHRvIGJlIGFueXRoaW5nIG90aGVyIHRoYW4gYSBiaXRtYXNrIGZvciBwZXJmb3JtYW5jZSByZWFzb25zXG4gICAgLy8gVGhpcyBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgZm9yIGV2ZXJ5IHN5c3RlbSBmb3IgZXZlcnkgbG9vcCAod2hpY2ggbWlnaHQgYmUgYXMgaGlnaCBhcyA2MCAvIHNlY29uZClcbiAgICAqZ2V0RW50aXRpZXMoY29tcG9uZW50cyA9IDApIHtcbiAgICAgICAgZm9yIChsZXQgaWQgPSAwOyBpZCA8PSB0aGlzLmN1cnJlbnRNYXhFbnRpdHk7ICsraWQpIHtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnRzID09PSAwIHx8ICh0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzICYgY29tcG9uZW50cykgPT09IGNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCB7IGlkLCBlbnRpdHkgOiB0aGlzLmVudGl0aWVzW2lkXSB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJDb25maWd1cmF0aW9uKCkge1xuICAgICAgICBjb25zdCBjb25maWd1cmF0aW9uSWQgPSBNYXRoLm1heCgwLCAuLi50aGlzLmVudGl0eUNvbmZpZ3VyYXRpb25zLmtleXMoKSkgKyAxXG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0eUNvbmZpZ3VyYXRpb25zLnNldChjb25maWd1cmF0aW9uSWQsIHRoaXMuZW50aXR5RmFjdG9yeS5jcmVhdGVDb25maWd1cmF0aW9uKCkpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gY29uZmlndXJhdGlvbklkXG4gICAgfVxuICAgIFxuICAgIC8vIENvbXBvbmVudCBNYW5hZ2VyXG4gICAgXG4gICAgcmVnaXN0ZXJDb21wb25lbnQobmFtZSwgY29tcG9uZW50KSB7XG4gICAgICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycgfHwgbmFtZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignbmFtZSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZy4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5jb21wb25lbnRMb29rdXAuZ2V0KG5hbWUpICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb21wb25lbnRJZCA9IHRoaXMuY29tcG9uZW50TWFuYWdlci5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbXBvbmVudExvb2t1cC5zZXQobmFtZSwgY29tcG9uZW50SWQpXG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBlbnRpdHkgb2YgdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgZW50aXR5W2NvbXBvbmVudElkXSA9IHRoaXMuY29tcG9uZW50TWFuYWdlci5uZXdDb21wb25lbnQoY29tcG9uZW50SWQpXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZW50aXR5LCBuYW1lLCB7IGdldCgpIHsgcmV0dXJuIHRoaXNbY29tcG9uZW50SWRdIH0sIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgaW5pdGlhbGl6ZXJcblxuICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzogaW5pdGlhbGl6ZXIgPSBjb21wb25lbnQ7IGJyZWFrXG4gICAgICAgICAgICBjYXNlICdvYmplY3QnOiB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbGl6ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKGNvbXBvbmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IGNvbXBvbmVudFtrZXldXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDogaW5pdGlhbGl6ZXIgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbXBvbmVudCB9OyBicmVha1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkucmVnaXN0ZXJJbml0aWFsaXplcihjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gY29tcG9uZW50SWRcbiAgICB9XG4gICAgXG4gICAgYWRkQ29tcG9uZW50KGVudGl0eUlkLCBjb21wb25lbnQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eUlkXS5jb21wb25lbnRzIHw9IHRoaXMuY29tcG9uZW50TG9va3VwLmdldChjb21wb25lbnQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eUlkXS5jb21wb25lbnRzIHw9IGNvbXBvbmVudFxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJlbW92ZUNvbXBvbmVudChlbnRpdHlJZCwgY29tcG9uZW50KSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0uY29tcG9uZW50cyAmPSB+dGhpcy5jb21wb25lbnRMb29rdXAuZ2V0KGNvbXBvbmVudClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZW50aXRpZXNbZW50aXR5SWRdLmNvbXBvbmVudHMgJj0gfmNvbXBvbmVudCAgIFxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIFN5c3RlbSBNYW5hZ2VyXG4gICAgXG4gICAgcmVnaXN0ZXJTeXN0ZW0odHlwZSwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29tcG9uZW50cykpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMgPSBBcnJheS5mcm9tKHRoaXMuY29tcG9uZW50TG9va3VwKS5yZWR1Y2UoKGN1cnIsIG5leHQpID0+IFsnJywgY3VyclsxXSB8IG5leHRbMV1dLCBbJycsIDBdKVsxXVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlZ2lzdGVyU3lzdGVtKHR5cGUsIGNvbXBvbmVudHMsIGNhbGxiYWNrKVxuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckxvZ2ljU3lzdGVtKGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyU3lzdGVtKFN5c3RlbVR5cGUuTG9naWMsIGNvbXBvbmVudHMsIGNhbGxiYWNrKVxuICAgIH1cbiAgICBcbiAgICByZWdpc3RlclJlbmRlclN5c3RlbShjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RlclN5c3RlbShTeXN0ZW1UeXBlLlJlbmRlciwgY29tcG9uZW50cywgY2FsbGJhY2spXG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVySW5pdFN5c3RlbShjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RlclN5c3RlbShTeXN0ZW1UeXBlLkluaXQsIGNvbXBvbmVudHMsIGNhbGxiYWNrKVxuICAgIH1cbiAgICBcbiAgICByZW1vdmVTeXN0ZW0oc3lzdGVtSWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZW1vdmVTeXN0ZW0oc3lzdGVtSWQpXG4gICAgfVxuICAgIFxuICAgIG9uTG9naWMob3B0cykge1xuICAgICAgICBmb3IgKGxldCBzeXN0ZW0gb2YgdGhpcy5zeXN0ZW1NYW5hZ2VyLmxvZ2ljU3lzdGVtcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgc3lzdGVtLmNhbGxiYWNrLmNhbGwodGhpcywgdGhpcy5nZXRFbnRpdGllcyhzeXN0ZW0uY29tcG9uZW50cyksIG9wdHMpXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgb25SZW5kZXIob3B0cykge1xuICAgICAgICBmb3IgKGxldCBzeXN0ZW0gb2YgdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlbmRlclN5c3RlbXMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMpLCBvcHRzKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Jbml0KG9wdHMpIHtcbiAgICAgICAgZm9yIChsZXQgc3lzdGVtIG9mIHRoaXMuc3lzdGVtTWFuYWdlci5pbml0U3lzdGVtcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgc3lzdGVtLmNhbGxiYWNrLmNhbGwodGhpcywgdGhpcy5nZXRFbnRpdGllcyhzeXN0ZW0uY29tcG9uZW50cyksIG9wdHMpXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gRW50aXR5IEZhY3RvcnlcbiAgICBcbiAgICByZWdpc3RlckluaXRpYWxpemVyKGNvbXBvbmVudCwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkucmVnaXN0ZXJJbml0aWFsaXplcih0aGlzLmNvbXBvbmVudExvb2t1cC5nZXQoY29tcG9uZW50KSwgaW5pdGlhbGl6ZXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkucmVnaXN0ZXJJbml0aWFsaXplcihjb21wb25lbnQsIGluaXRpYWxpemVyKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGJ1aWxkKCkge1xuICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkuYnVpbGQoKVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgXG4gICAgd2l0aENvbXBvbmVudChjb21wb25lbnQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LndpdGhDb21wb25lbnQodGhpcy5jb21wb25lbnRMb29rdXAuZ2V0KGNvbXBvbmVudCksIGluaXRpYWxpemVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LndpdGhDb21wb25lbnQoY29tcG9uZW50LCBpbml0aWFsaXplcilcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlKGNvdW50LCBjb25maWd1cmF0aW9uSWQpIHtcbiAgICAgICAgbGV0IGNvbmZpZ3VyYXRpb24gPSB1bmRlZmluZWRcbiAgICAgICAgXG4gICAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKGNvbmZpZ3VyYXRpb25JZCkgJiYgY29uZmlndXJhdGlvbklkID4gMCkge1xuICAgICAgICAgICAgY29uZmlndXJhdGlvbiA9IHRoaXMuZW50aXR5Q29uZmlndXJhdGlvbnMuZ2V0KGNvbmZpZ3VyYXRpb25JZClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGNvbmZpZ3VyYXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCdDb3VsZCBub3QgZmluZCBlbnRpdHkgY29uZmlndXJhdGlvbi4gSWYgeW91IHdpc2ggdG8gY3JlYXRlIGVudGl0aWVzIHdpdGhvdXQgYSBjb25maWd1cmF0aW9uLCBkbyBub3QgcGFzcyBhIGNvbmZpZ3VyYXRpb25JZC4nKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy5lbnRpdHlGYWN0b3J5LmNyZWF0ZSh0aGlzLCBjb3VudCwgY29uZmlndXJhdGlvbilcbiAgICB9XG4gICAgXG4gICAgLy8gRXZlbnQgSGFuZGxlclxuICAgIFxuICAgIGxpc3RlbihldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLmxpc3RlbihldmVudCwgY2FsbGJhY2spXG4gICAgfVxuICAgIFxuICAgIHN0b3BMaXN0ZW4oZXZlbnRJZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIuc3RvcExpc3RlbihldmVudElkKVxuICAgIH1cbiAgICBcbiAgICB0cmlnZ2VyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlci5jYWxsKHRoaXMsIC4uLmFyZ3VtZW50cylcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlckRlbGF5ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyRGVsYXllZC5jYWxsKHRoaXMsIC4uLmFyZ3VtZW50cylcbiAgICB9XG59XG5cbmV4cG9ydCB7IEVudGl0eU1hbmFnZXIgfVxuIiwiLyoqXG4gKiBtYWlubG9vcC5qcyAxLjAuMy0yMDE2MDMyMFxuICpcbiAqIEBhdXRob3IgSXNhYWMgU3VraW4gKGh0dHA6Ly93d3cuaXNhYWNzdWtpbi5jb20vKVxuICogQGxpY2Vuc2UgTUlUXG4gKi9cblxuIWZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGIoYSl7aWYodj1vKGIpLCEoZStqPmEpKXtmb3IoZCs9YS1lLGU9YSxyKGEsZCksYT5nKzFlMyYmKGY9LjI1KmgrLjc1KmYsZz1hLGg9MCksaCsrLGk9MDtkPj1jOylpZihzKGMpLGQtPWMsKytpPj0yNDApe209ITA7YnJlYWt9dChkL2MpLHUoZixtKSxtPSExfX12YXIgYz0xZTMvNjAsZD0wLGU9MCxmPTYwLGc9MCxoPTAsaT0wLGo9MCxrPSExLGw9ITEsbT0hMSxuPVwib2JqZWN0XCI9PXR5cGVvZiB3aW5kb3c/d2luZG93OmEsbz1uLnJlcXVlc3RBbmltYXRpb25GcmFtZXx8ZnVuY3Rpb24oKXt2YXIgYT1EYXRlLm5vdygpLGIsZDtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIGI9RGF0ZS5ub3coKSxkPU1hdGgubWF4KDAsYy0oYi1hKSksYT1iK2Qsc2V0VGltZW91dChmdW5jdGlvbigpe2UoYitkKX0sZCl9fSgpLHA9bi5jYW5jZWxBbmltYXRpb25GcmFtZXx8Y2xlYXJUaW1lb3V0LHE9ZnVuY3Rpb24oKXt9LHI9cSxzPXEsdD1xLHU9cSx2O2EuTWFpbkxvb3A9e2dldFNpbXVsYXRpb25UaW1lc3RlcDpmdW5jdGlvbigpe3JldHVybiBjfSxzZXRTaW11bGF0aW9uVGltZXN0ZXA6ZnVuY3Rpb24oYSl7cmV0dXJuIGM9YSx0aGlzfSxnZXRGUFM6ZnVuY3Rpb24oKXtyZXR1cm4gZn0sZ2V0TWF4QWxsb3dlZEZQUzpmdW5jdGlvbigpe3JldHVybiAxZTMvan0sc2V0TWF4QWxsb3dlZEZQUzpmdW5jdGlvbihhKXtyZXR1cm5cInVuZGVmaW5lZFwiPT10eXBlb2YgYSYmKGE9MS8wKSwwPT09YT90aGlzLnN0b3AoKTpqPTFlMy9hLHRoaXN9LHJlc2V0RnJhbWVEZWx0YTpmdW5jdGlvbigpe3ZhciBhPWQ7cmV0dXJuIGQ9MCxhfSxzZXRCZWdpbjpmdW5jdGlvbihhKXtyZXR1cm4gcj1hfHxyLHRoaXN9LHNldFVwZGF0ZTpmdW5jdGlvbihhKXtyZXR1cm4gcz1hfHxzLHRoaXN9LHNldERyYXc6ZnVuY3Rpb24oYSl7cmV0dXJuIHQ9YXx8dCx0aGlzfSxzZXRFbmQ6ZnVuY3Rpb24oYSl7cmV0dXJuIHU9YXx8dSx0aGlzfSxzdGFydDpmdW5jdGlvbigpe3JldHVybiBsfHwobD0hMCx2PW8oZnVuY3Rpb24oYSl7dCgxKSxrPSEwLGU9YSxnPWEsaD0wLHY9byhiKX0pKSx0aGlzfSxzdG9wOmZ1bmN0aW9uKCl7cmV0dXJuIGs9ITEsbD0hMSxwKHYpLHRoaXN9LGlzUnVubmluZzpmdW5jdGlvbigpe3JldHVybiBrfX0sXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShhLk1haW5Mb29wKTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZudWxsIT09bW9kdWxlJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlLmV4cG9ydHMmJihtb2R1bGUuZXhwb3J0cz1hLk1haW5Mb29wKX0odGhpcyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWlubG9vcC5taW4uanMubWFwIiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IE1haW5Mb29wIGZyb20gJ21haW5sb29wLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluTG9vcExvb3BNYW5hZ2VyIHtcbiAgICAvLyBzZXRVcGRhdGUodXBkYXRlTWV0aG9kIDogKGRlbHRhIDogbnVtYmVyKSA9PiB2b2lkKSA6IE1haW5Mb29wTG9vcE1hbmFnZXIge1xuICAgIHNldFVwZGF0ZSh1cGRhdGVNZXRob2QpIHtcbiAgICAgICAgTWFpbkxvb3Auc2V0VXBkYXRlKHVwZGF0ZU1ldGhvZClcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIFxuICAgIHNldFJlbmRlcihyZW5kZXJNZXRob2QgOiAoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UgOiBudW1iZXIpID0+IHZvaWQpIDogTWFpbkxvb3BMb29wTWFuYWdlciB7XG4gICAgICAgIE1haW5Mb29wLnNldERyYXcocmVuZGVyTWV0aG9kKVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgXG4gICAgc3RhcnQoKSA6IHZvaWQge1xuICAgICAgICBNYWluTG9vcC5zdGFydCgpXG4gICAgfVxuICAgIFxuICAgIHN0b3AoKSA6IHZvaWQge1xuICAgICAgICBNYWluTG9vcC5zdG9wKClcbiAgICB9XG59IiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IHRocmVlIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGhyZWVPYmplY3RNZXNoTG9hZGVyIHtcbiAgICBsb2FkZXIgIDogdGhyZWUuT2JqZWN0TG9hZGVyO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmxvYWRlciAgPSBuZXcgdGhyZWUuT2JqZWN0TG9hZGVyKCk7XG4gICAgfVxuICAgIFxuICAgIG9uUHJvZ3Jlc3MoKSB7XG4gICAgICAgIC8vIHBsYWNlaG9sZGVyXG4gICAgfVxuICAgIFxuICAgIHBhcnNlKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZGVyLnBhcnNlKGpzb24pXG4gICAgfVxuICAgIFxuICAgIC8vIHRvZG8gdGhpcyBub3cgcmV0dXJucyBhIHNjZW5lLi4gaW1wbGljYXRpb25zP1xuICAgIC8vIHRvZG8gYWRkIG9wdGlvbnMgYXMgYSBkZXN0cnVjdGFibGUgb2JqZWN0IC0+IHN0b3BwZWQgYnkgZmxvdzogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvaXNzdWVzLzE4M1xuICAgIGxvYWQocGF0aCA6IHN0cmluZywgb3B0aW9ucz8gOiBPYmplY3QpIDogUHJvbWlzZSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc2hhZGluZyA9IChvcHRpb25zIHx8IHsgfSkuc2hhZGluZztcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHNlbGYubG9hZGVyLmxvYWQocGF0aCwgb2JqID0+IHJlc29sdmUob2JqKSwgaW5mbyA9PiBzZWxmLm9uUHJvZ3Jlc3MoaW5mbyksIGVyciA9PiByZWplY3QoZXJyKSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4obWVzaCA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNoYWRpbmcgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc2g7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG1lc2gudHJhdmVyc2UoY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIHRocmVlLk1lc2gpIHtcbiAgICAgICAgICAgICAgICAgICBjaGlsZC5tYXRlcmlhbC5zaGFkaW5nID0gc2hhZGluZztcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gbWVzaDtcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG59IiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IHRocmVlIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGhyZWVSZW5kZXJlck1hbmFnZXIge1xuICAgIHJlbmRlcmVyICAgICA6IHRocmVlLldlYkdMUmVuZGVyZXI7XG4gICAgY2FtZXJhICAgICAgIDogdGhyZWUuQ2FtZXJhO1xuICAgIC8vIGdlb21ldHJpZXMgICA6IE1hcDxzdHJpbmcsIHRocmVlLkdlb21ldHJ5PjtcbiAgICAvLyBtYXRlcmlhbHMgICAgOiBNYXA8c3RyaW5nLCB0aHJlZS5NYXRlcmlhbD47XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgdGhyZWUuV2ViR0xSZW5kZXJlcih7IGFudGlhbGlhcyA6IHRydWUgfSk7XG5cdFx0dGhpcy5yZW5kZXJlci5zZXRDbGVhckNvbG9yKCAweDAwMDAwMCApO1xuXHRcdHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyggd2luZG93LmRldmljZVBpeGVsUmF0aW8gKTtcbiAgICB9XG4gICAgXG4gICAgZW5hYmxlU2hhZG93cygpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWVcbiAgICB9XG4gICAgXG4gICAgaXNGdWxsU2NyZWVuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5fZnVsbFNjcmVlblxuICAgIH1cbiAgICBcbiAgICAvL3RvZG8gbWFrZSBpbnRvIGdldHRlciAvIHNldHRlciA/XG4gICAgc2V0U2NlbmUoc2NlbmUpIHtcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lXG4gICAgfVxuICAgIFxuICAgIHNldENhbWVyYShjYW1lcmEsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmFcbiAgICB9XG4gICAgXG4gICAgc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0Z1bGxTY3JlZW4oKSkge1xuXHRcdCAgICB0aGlzLmNhbWVyYS5hc3BlY3QgPSAod2lkdGggfHwgNTAwKSAvIChoZWlnaHQgfHwgNTAwKVxuICAgIFx0fVxuXHRcdFxuXHRcdHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKVxuXHRcdFxuXHRcdGlmICghdGhpcy5pc0Z1bGxTY3JlZW4oKSkge1xuXHQgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCB8fCA1MDAsIGhlaWdodCB8fCA1MDApXG5cdFx0fVxuICAgIH1cbiAgICBcbiAgICBnZXREb20oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnRcbiAgICB9XG4gICAgXG4gICAgZ2V0U2NlbmUoKSA6IHRocmVlLlNjZW5lIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NlbmU7XG4gICAgfVxuICAgIFxuICAgIGdldEdlb21ldHJ5KGtleSA6IHN0cmluZykgOiB0aHJlZS5HZW9tZXRyeSB7XG4gICAgICAgIHJldHVybiBnZW9tZXRyaWVzLmdldChrZXkpO1xuICAgIH1cbiAgICBcbiAgICBnZXRNYXRlcmlhbChrZXkgOiBzdHJpbmcpIDogdGhyZWUuTWF0ZXJpYWwge1xuICAgICAgICByZXR1cm4gbWF0ZXJpYWxzLmdldChrZXkpO1xuICAgIH1cbiAgICBcbiAgICBhZGRNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCkge1xuICAgICAgICB2YXIgZ2VvID0gdGhpcy5nZW9tZXRyaWVzLmdldChnZW9tZXRyeSk7XG4gICAgICAgIHZhciBtYXQgPSB0aGlzLm1hdGVyaWFscy5nZXQobWF0ZXJpYWwpO1xuICAgICAgICB2YXIgbWVzaCA9IG5ldyB0aHJlZS5NZXNoKGdlbywgbWF0KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKG1lc2gpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG1lc2g7XG4gICAgfVxuICAgIFxuICAgIHJlbmRlcihpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSA6IG51bWJlcikgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpO1xuICAgIH1cbiAgICBcbiAgICAvLyByZW5kZXIoc2NlbmUgOiB0aHJlZS5TY2VuZSwgaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UgOiBudW1iZXIpIDogdm9pZCB7XG4gICAgLy8gICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gICAgLy8gfVxufVxuIiwiaW1wb3J0IHtFbnRpdHlNYW5hZ2VyfSAgICAgICBmcm9tICdnZy1lbnRpdGllcydcbmltcG9ydCBNYWluTG9vcExvb3BNYW5hZ2VyICAgZnJvbSAnLi4vbG9naWMvbWFpbmxvb3AtbG9vcC1tYW5hZ2VyJ1xuLy8gaW1wb3J0IEZldGNoRmlsZUxvYWRlciAgICAgICBmcm9tICcuLi9sb2dpYy9mZXRjaC1maWxlLWxvYWRlcidcbmltcG9ydCBUaHJlZU9iamVjdE1lc2hMb2FkZXIgZnJvbSAnLi4vbG9naWMvdGhyZWUtb2JqZWN0LW1lc2gtbG9hZGVyJ1xuXG5pbXBvcnQgVGhyZWVSZW5kZXJlck1hbmFnZXIgZnJvbSAnLi4vdmlldy90aHJlZS1yZW5kZXJlci1tYW5hZ2VyJ1xuXG5jb25zdCBfbG9vcE1hbmFnZXIgICAgID0gbmV3IE1haW5Mb29wTG9vcE1hbmFnZXIoKVxuLy8gY29uc3QgX2ZpbGVMb2FkZXIgICAgICA9IG5ldyBGZXRjaEZpbGVMb2FkZXIoKVxuY29uc3QgX2xvYWRlciAgICAgICAgICA9IG5ldyBUaHJlZU9iamVjdE1lc2hMb2FkZXIoKVxuY29uc3QgX3JlbmRlcmVyTWFuYWdlciA9IG5ldyBUaHJlZVJlbmRlcmVyTWFuYWdlcigpXG5jb25zdCBfZW50aXR5TWFuYWdlciAgID0gbmV3IEVudGl0eU1hbmFnZXIoKVxuXG5jb25zdCBsb29wTWFuYWdlciAgICAgPSAoKSA9PiBfbG9vcE1hbmFnZXJcbi8vIGNvbnN0IGZpbGVMb2FkZXIgICAgICA9ICgpID0+IF9maWxlTG9hZGVyXG5jb25zdCBsb2FkZXIgICAgICAgICAgPSAoKSA9PiBfbG9hZGVyXG5jb25zdCByZW5kZXJlck1hbmFnZXIgPSAoKSA9PiBfcmVuZGVyZXJNYW5hZ2VyXG5jb25zdCBlbnRpdHlNYW5hZ2VyICAgPSAoKSA9PiBfZW50aXR5TWFuYWdlclxuXG5leHBvcnQgZGVmYXVsdCB7bG9vcE1hbmFnZXIsIGxvYWRlciwgcmVuZGVyZXJNYW5hZ2VyLCBlbnRpdHlNYW5hZ2VyfVxuZXhwb3J0IHtsb29wTWFuYWdlciwgbG9hZGVyLCByZW5kZXJlck1hbmFnZXIsIGVudGl0eU1hbmFnZXJ9IiwiLy8gLyogQGZsb3cgKi9cblxuLy8gdG9kbyBtYWtlIERJIG5vdCBiZSBoYXJkY29kZWRcbmltcG9ydCBESSBmcm9tICcuL0RJL2Jyb3dzZXInXG5cbmNvbnN0IENPTVBPTkVOVCA9IHtcbiAgICBUUkFOU0ZPUk06ICd0cmFuc2Zvcm0nLFxuICAgIEFQUEVBUkFOQ0U6ICdhcHBlYXJhbmNlJ1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHRyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgXHQvLyB3aWR0aCBhbmQgaGVpZ2h0IHNldCB0byA1MDAganVzdCB0byBoYXZlIGl0IGFzIGluIHRoZSBlZGl0b3IgZm9yIHRoZSB0aW1lIGJlaW5nXG4gICAgXHR0aGlzLndpZHRoICA9IDUwMFxuICAgIFx0dGhpcy5oZWlnaHQgPSA1MDBcblxuICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIgICA9IERJLmVudGl0eU1hbmFnZXIoKVxuICAgICAgICB0aGlzLmxvb3BNYW5hZ2VyICAgICA9IERJLmxvb3BNYW5hZ2VyKClcbiAgICAgICAgdGhpcy5yZW5kZXJlck1hbmFnZXIgPSBESS5yZW5kZXJlck1hbmFnZXIoKVxuICAgICAgICB0aGlzLmxvYWRlclx0XHRcdCA9IERJLmxvYWRlcigpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmRvbSA9IHRoaXMucmVuZGVyZXJNYW5hZ2VyLmdldERvbSgpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmluaXRDb21wb25lbnRzKClcbiAgICAgICAgdGhpcy5pbml0U3lzdGVtcygpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIub25Jbml0KHtyZW5kZXJNYW5hZ2VyOiB0aGlzLnJlbmRlcmVyTWFuYWdlcn0pXG4gICAgICAgIFxuICAgICAgICB0aGlzLmxvb3BNYW5hZ2VyLnNldFVwZGF0ZShkZWx0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIub25Mb2dpYyhkZWx0YSlcbiAgICAgICAgfSkuc2V0UmVuZGVyKGludGVycG9sYXRpb25QZXJjZW50YWdlID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5TWFuYWdlci5vblJlbmRlcih7ZGVsdGEgOiBpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSwgcmVuZGVyTWFuYWdlcjogdGhpcy5yZW5kZXJlck1hbmFnZXJ9KVxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlck1hbmFnZXIucmVuZGVyKGludGVycG9sYXRpb25QZXJjZW50YWdlKVxuICAgICAgICB9KVxuICAgIH1cbiAgICBcbiAgICBzZXRFbnRpdHlEYXRhKGVudGl0eURhdGEpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlEYXRhID0gZW50aXR5RGF0YVxuICAgIH1cblxuICAgIGluaXRDb21wb25lbnRzKCkge1xuICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIucmVnaXN0ZXJDb21wb25lbnQoQ09NUE9ORU5ULlRSQU5TRk9STSwgIHt4OiAwLCB5OiAwLCB6OiAwfSlcbiAgICAgICAgdGhpcy5lbnRpdHlNYW5hZ2VyLnJlZ2lzdGVyQ29tcG9uZW50KENPTVBPTkVOVC5BUFBFQVJBTkNFLCB7aWQ6IDB9KVxuICAgIH1cbiAgICBcbiAgICBpbml0U3lzdGVtcygpIHtcbiAgICAgICAgY29uc3QgcmVuZGVyQ29tcG9uZW50cyA9IFtcbiAgICAgICAgICAgIENPTVBPTkVOVC5UUkFOU0ZPUk0sXG4gICAgICAgICAgICBDT01QT05FTlQuQVBQRUFSQU5DRVxuICAgICAgICBdXG4gICAgICAgIFxuICAgICAgICBjb25zdCByZW5kZXIgPSAoZW50aXRpZXMsIHtyZW5kZXJNYW5hZ2VyfSkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB7ZW50aXR5fSBvZiBlbnRpdGllcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHthcHBlYXJhbmNlLCB0cmFuc2Zvcm19ID0gZW50aXR5XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3Qgb2JqID0gcmVuZGVyTWFuYWdlci5zY2VuZS5nZXRPYmplY3RCeUlkKGFwcGVhcmFuY2UuaWQpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIG9iai5wb3NpdGlvbi54ID0gdHJhbnNmb3JtLnhcbiAgICAgICAgICAgICAgICBvYmoucG9zaXRpb24ueSA9IHRyYW5zZm9ybS55XG4gICAgICAgICAgICAgICAgb2JqLnBvc2l0aW9uLnogPSB0cmFuc2Zvcm0uelxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIucmVnaXN0ZXJSZW5kZXJTeXN0ZW0ocmVuZGVyQ29tcG9uZW50cywgcmVuZGVyKVxuICAgIH1cbiAgICBcbiAgICBpbml0RW50aXRpZXMocGFyc2VkU2NlbmUpIHtcbiAgICAgICAgcGFyc2VkU2NlbmUudHJhdmVyc2UoKG9iaikgPT4ge1xuXHRcdCAgICBsZXQgY29uZmlnID0gdGhpcy5lbnRpdHlNYW5hZ2VyLmJ1aWxkKClcblx0XHRcdCAgICBcblx0XHQgICAgY29uZmlnLndpdGhDb21wb25lbnQoQ09NUE9ORU5ULlRSQU5TRk9STSwgZnVuY3Rpb24oKSB7XG5cdFx0ICAgICAgICB0aGlzLnggPSBvYmoucG9zaXRpb24ueFxuXHRcdCAgICAgICAgdGhpcy55ID0gb2JqLnBvc2l0aW9uLnlcblx0XHQgICAgICAgIHRoaXMueiA9IG9iai5wb3NpdGlvbi56XG5cdCAgICAgICAgfSlcblx0ICAgICAgICBcblx0ICAgICAgICAvL3RvZG86IG1ha2Ugb25seSB2aXNpYmxlIG9iamVjdHMgZ2V0IHRoaXNcblx0ICAgICAgICBpZiAob2JqLmlkICYmIG9iai52aXNpYmxlKSB7XG5cdCAgICAgICAgICAgIGNvbmZpZy53aXRoQ29tcG9uZW50KENPTVBPTkVOVC5BUFBFQVJBTkNFLCBmdW5jdGlvbigpIHtcbiAgICBcdCAgICAgICAgICAgdGhpcy5pZCA9IG9iai5pZFxuICAgIFx0ICAgICAgICB9KVxuXHQgICAgICAgIH1cblx0ICAgICAgICBcblx0ICAgICAgICBjb25zdCBjb21wb25lbnRzID0gdGhpcy5lbnRpdHlEYXRhW29iai51dWlkXVxuXG5cdFx0XHRpZiAoY29tcG9uZW50cykge1x0ICAgICAgICBcblx0XHRcdCAgICBPYmplY3Qua2V5cyhjb21wb25lbnRzKS5mb3JFYWNoKGtleSA9PiB7XG5cdCAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gY29tcG9uZW50c1trZXldXG5cdCAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgIGNvbmZpZy53aXRoQ29tcG9uZW50KGtleSwgZnVuY3Rpb24oKSB7XG5cdFx0ICAgICAgICAgICAgICAgIC8vIHRvZG8gaGFuZGxlIG5vbi1vYmplY3RzXG5cdFx0ICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goa2V5ID0+IHtcblx0XHQgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzW2tleV0gPT0gbnVsbCB8fCBkYXRhW2tleV0gPT0gbnVsbCB8fCB0aGlzW2tleV0gPT09IGRhdGFba2V5XSkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuXHRcdCAgICAgICAgICAgICAgICAgICAgfVxuXHRcdCAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBkYXRhW2tleV1cblx0XHQgICAgICAgICAgICAgICAgfSwgdGhpcylcblx0XHQgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICB9LCB0aGlzKVxuXHRcdFx0fVxuXG5cdFx0XHRjb25maWcuY3JlYXRlKDEpXG5cdFx0fSlcbiAgICB9XG4gICAgXG4gICAgbG9hZCh7cHJvamVjdCwgc2NlbmUsIGNhbWVyYX0pIHtcbiAgICAgICAgY29uc3QgcGFyc2VkU2NlbmUgPSB0aGlzLmxvYWRlci5wYXJzZShzY2VuZSlcbiAgICAgICAgY29uc3QgcGFyc2VkQ2FtZXJhID0gdGhpcy5sb2FkZXIucGFyc2UoY2FtZXJhKVxuXHRcdFxuXHRcdHRoaXMuaW5pdEVudGl0aWVzKHBhcnNlZFNjZW5lKVxuXG4gICAgXHRpZiAocHJvamVjdC5zaGFkb3dzKSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVyTWFuYWdlci5lbmFibGVTaGFkb3dzKClcblx0XHR9XG5cdFx0XG4gICAgXHQvL3RvZG86IGNoZWNrIGZvciBjYW1lcmEgYW5kIHNjZW5lIGZpcnN0PyB0aHJvdyBpZiBub3Q/XG4gICAgXHR0aGlzLnJlbmRlcmVyTWFuYWdlci5zZXRTY2VuZShwYXJzZWRTY2VuZSlcbiAgICBcdHRoaXMucmVuZGVyZXJNYW5hZ2VyLnNldENhbWVyYShwYXJzZWRDYW1lcmEsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KVxuXHR9XG4gICAgXG4gICAgc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSAge1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGhcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHRcbiAgICAgICAgXG4gICAgICAgIHRoaXMucmVuZGVyZXJNYW5hZ2VyLnNldFNpemUodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpXG4gICAgfVxuICAgIFxuICAgIGdldERvbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXJNYW5hZ2VyLmdldERvbSgpXG4gICAgfVxuICAgIFxuICAgIHBsYXkoKSB7XG4gICAgICAgIHRoaXMubG9vcE1hbmFnZXIuc3RhcnQoKVxuICAgIH1cbiAgICBcbiAgICBzdG9wKCkge1xuICAgICAgICB0aGlzLmxvb3BNYW5hZ2VyLnN0b3AoKVxuICAgIH1cbn0iXSwibmFtZXMiOlsidGhpcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFFQSxNQUFNLGFBQWEsQ0FBQztJQUNoQixXQUFXLEdBQUc7UUFDVixJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksR0FBRyxFQUFFO1FBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQUU7S0FDakM7O0lBRUQsbUJBQW1CLENBQUMsRUFBRSxFQUFFLFdBQVcsRUFBRTtRQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ2xDLE1BQU0sU0FBUyxDQUFDLGdDQUFnQyxDQUFDO1NBQ3BEOztRQUVELElBQUksT0FBTyxXQUFXLEtBQUssVUFBVSxFQUFFO1lBQ25DLE1BQU0sU0FBUyxDQUFDLGlDQUFpQyxDQUFDO1NBQ3JEOztRQUVELElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUM7S0FDekM7O0lBRUQsS0FBSyxHQUFHO1FBQ0osSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBRTs7UUFFOUIsT0FBTyxJQUFJO0tBQ2Q7O0lBRUQsYUFBYSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUU7UUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksV0FBVyxJQUFJLENBQUMsRUFBRTtZQUNwRCxPQUFPLElBQUk7U0FDZDs7UUFFRCxJQUFJLE9BQU8sV0FBVyxLQUFLLFVBQVUsRUFBRTtZQUNuQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO1NBQ25EOztRQUVELElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUM7O1FBRWhELE9BQU8sSUFBSTtLQUNkOztJQUVELG1CQUFtQixHQUFHO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGFBQWE7S0FDNUI7O0lBRUQsTUFBTSxDQUFDLGFBQWEsRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLGFBQWEsR0FBRyxTQUFTLEVBQUU7UUFDeEQsSUFBSSxDQUFDLENBQUMsYUFBYSxZQUFZLGFBQWEsQ0FBQyxFQUFFO1lBQzNDLE9BQU8sRUFBRTtTQUNaOztRQUVELElBQUksYUFBYSxJQUFJLElBQUksRUFBRTtZQUN2QixhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWE7U0FDckM7O1FBRUQsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDOztRQUUzRixJQUFJLFFBQVEsR0FBRyxFQUFFOztRQUVqQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQzVCLElBQUksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7O1lBRXhELElBQUksRUFBRSxJQUFJLGFBQWEsQ0FBQyxRQUFRLEVBQUU7Z0JBQzlCLEtBQUs7YUFDUjs7WUFFRCxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLElBQUksYUFBYSxFQUFFO2dCQUNoRCxJQUFJLE9BQU8sV0FBVyxLQUFLLFVBQVUsRUFBRTtvQkFDbkMsUUFBUTtpQkFDWDs7Z0JBRUQsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7O2dCQUVoRCxJQUFJLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLFFBQVEsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO29CQUMvRCxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTTtpQkFDN0I7YUFDSjs7WUFFRCxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDO1NBQ2hDOztRQUVELE9BQU8sUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVE7S0FDeEQ7Q0FDSixBQUVEOztBQ25GQSxNQUFNLGdCQUFnQixDQUFDO0lBQ25CLFdBQVcsR0FBRztRQUNWLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQUU7S0FDOUI7O0lBRUQsWUFBWSxDQUFDLFdBQVcsRUFBRTtRQUN0QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7O1FBRWhELElBQUksU0FBUyxLQUFLLElBQUksSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQy9DLE9BQU8sSUFBSTtTQUNkOztRQUVELFFBQVEsT0FBTyxTQUFTO1lBQ3BCLEtBQUssVUFBVTtnQkFDWCxPQUFPLElBQUksU0FBUyxFQUFFO1lBQzFCLEtBQUssUUFBUSxJQUFJO2dCQUNiLE9BQU8sQ0FBQyxDQUFDLFNBQVMsS0FBSztvQkFDbkIsSUFBSSxHQUFHLEdBQUcsRUFBRTs7b0JBRVosTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7O29CQUVoRSxPQUFPLEdBQUc7aUJBQ2IsQ0FBQyxDQUFDLFNBQVMsQ0FBQzthQUNoQjtZQUNEO2dCQUNJLE9BQU8sU0FBUztTQUN2QjtLQUNKOztJQUVELGlCQUFpQixDQUFDLFNBQVMsRUFBRTtRQUN6QixJQUFJLFNBQVMsS0FBSyxJQUFJLElBQUksU0FBUyxLQUFLLFNBQVMsRUFBRTtZQUMvQyxNQUFNLFNBQVMsQ0FBQyx3Q0FBd0MsQ0FBQztTQUM1RDs7UUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7UUFFL0MsTUFBTSxFQUFFLEdBQUcsR0FBRyxLQUFLLFNBQVMsSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7O1FBRS9GLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUM7O1FBRWxDLE9BQU8sRUFBRTtLQUNaOztJQUVELGFBQWEsR0FBRztRQUNaLE9BQU8sSUFBSSxDQUFDLFVBQVU7S0FDekI7Q0FDSixBQUVEOztBQ2hETyxNQUFNLFVBQVUsR0FBRztJQUN0QixLQUFLLElBQUksQ0FBQztJQUNWLE1BQU0sR0FBRyxDQUFDO0lBQ1YsSUFBSSxLQUFLLENBQUM7Q0FDYjs7QUFFRCxNQUFNLGFBQWEsQ0FBQztJQUNoQixXQUFXLEdBQUc7UUFDVixJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksR0FBRyxFQUFFO1FBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQUU7UUFDOUIsSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLEdBQUcsRUFBRTtLQUNqQzs7SUFFRCxjQUFjLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUU7UUFDdkMsSUFBSSxJQUFJLEtBQUssVUFBVSxDQUFDLEtBQUssSUFBSSxJQUFJLEtBQUssVUFBVSxDQUFDLE1BQU0sSUFBSSxJQUFJLEtBQUssVUFBVSxDQUFDLElBQUksRUFBRTtZQUNyRixNQUFNLFNBQVMsQ0FBQyxrQ0FBa0MsQ0FBQztTQUN0RDs7UUFFRCxJQUFJLE9BQU8sVUFBVSxLQUFLLFFBQVEsR0FBRztZQUNqQyxNQUFNLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQztTQUNsRDs7UUFFRCxJQUFJLE9BQU8sUUFBUSxLQUFLLFVBQVUsRUFBRTtZQUNoQyxNQUFNLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQztTQUNsRDs7UUFFRCxNQUFNLE1BQU0sR0FBRztZQUNYLFVBQVU7WUFDVixRQUFRO1NBQ1g7O1FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDOztRQUV2SCxRQUFRLElBQUk7WUFDUixLQUFLLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSztZQUN0RSxLQUFLLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSztZQUN4RSxLQUFLLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSztTQUN2RTs7UUFFRCxPQUFPLFFBQVE7S0FDbEI7O0lBRUQsWUFBWSxDQUFDLFFBQVEsRUFBRTtRQUNuQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztLQUN4SDtDQUNKLEFBRUQ7O0FDN0NBLE1BQU0sWUFBWSxHQUFHLE1BQU07SUFDdkIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUk7UUFDMUIsT0FBTyxFQUFFO0tBQ1osQ0FBQztDQUNMOztBQUVELE1BQU0sT0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxLQUFLO0lBQ2xELElBQUksT0FBTyxFQUFFO1FBQ1QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUk7WUFDMUIsVUFBVSxDQUFDLFVBQVU7Z0JBQ2pCLE9BQU8sQ0FBQyxPQUFPLE9BQU8sTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO2FBQzdHLEVBQUUsT0FBTyxDQUFDO1NBQ2QsQ0FBQztLQUNMOztJQUVELE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxJQUFJO1FBQzFCLE9BQU8sQ0FBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQzVHLENBQUM7Q0FDTDs7QUFFRCxNQUFNLFlBQVksQ0FBQztJQUNmLFdBQVcsR0FBRztRQUNWLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUU7S0FDMUI7O0lBRUQsTUFBTSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUU7UUFDcEIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksT0FBTyxRQUFRLEtBQUssVUFBVSxFQUFFO1lBQzdELE1BQU07U0FDVDs7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksR0FBRyxFQUFFLENBQUM7U0FDcEM7O1FBRUQsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDOztRQUVoQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUk7WUFDekIsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQy9DLENBQUMsQ0FBQzs7UUFFSCxFQUFFLE9BQU87O1FBRVQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUM7O1FBRTdDLE9B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U0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsT0FB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
