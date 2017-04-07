(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define('GG', ['exports', 'three'], factory) :
	(factory((global.GG = global.GG || {}),global.THREE));
}(this, (function (exports,three) { 'use strict';

three = 'default' in three ? three['default'] : three;

class EntityFactory {
    constructor() {
        this.init()
    }
    
    init() {
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
        this.init()
    }
    
    init() {
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
        this.init()
    }
    
    init() {
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
        this.init()
    }
    
    init() {
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
        this.init(capacity)
    }
    
    init(capacity) {
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

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

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
            mainloop_min.setUpdate(updateMethod);

            return this;
        }
    }, {
        key: 'setRender',
        value: function setRender(renderMethod) {
            mainloop_min.setDraw(renderMethod);

            return this;
        }
    }, {
        key: 'start',
        value: function start() {
            mainloop_min.start();
        }
    }, {
        key: 'stop',
        value: function stop() {
            mainloop_min.stop();
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

exports.GG = GG;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uLy4uL2VuZ2luZS9ub2RlX21vZHVsZXMvZ2ctZW50aXRpZXMvc3JjL2NvcmUvZW50aXR5LWZhY3RvcnkuanMiLCIuLi8uLi9lbmdpbmUvbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL3NyYy9jb3JlL2NvbXBvbmVudC1tYW5hZ2VyLmpzIiwiLi4vLi4vZW5naW5lL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9zeXN0ZW0tbWFuYWdlci5qcyIsIi4uLy4uL2VuZ2luZS9ub2RlX21vZHVsZXMvZ2ctZW50aXRpZXMvc3JjL2NvcmUvZXZlbnQtaGFuZGxlci5qcyIsIi4uLy4uL2VuZ2luZS9ub2RlX21vZHVsZXMvZ2ctZW50aXRpZXMvc3JjL2NvcmUvZW50aXR5LW1hbmFnZXIuanMiLCIuLi8uLi9lbmdpbmUvbm9kZV9tb2R1bGVzL21haW5sb29wLmpzL2J1aWxkL21haW5sb29wLm1pbi5qcyIsIi4uLy4uL2VuZ2luZS9zcmMvbG9naWMvbWFpbmxvb3AtbG9vcC1tYW5hZ2VyLmpzIiwiLi4vLi4vZW5naW5lL3NyYy9sb2dpYy90aHJlZS1vYmplY3QtbWVzaC1sb2FkZXIuanMiLCIuLi8uLi9lbmdpbmUvc3JjL3ZpZXcvdGhyZWUtcmVuZGVyZXItbWFuYWdlci5qcyIsIi4uLy4uL2VuZ2luZS9zcmMvREkvYnJvd3Nlci5qcyIsIi4uLy4uL2VuZ2luZS9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5TWFuYWdlciB9IGZyb20gJy4vZW50aXR5LW1hbmFnZXInXG5cbmNsYXNzIEVudGl0eUZhY3Rvcnkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmluaXQoKVxuICAgIH1cbiAgICBcbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVycyAgPSBuZXcgTWFwKClcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gbmV3IE1hcCgpXG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVySW5pdGlhbGl6ZXIoaWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihpZCkgfHwgaWQgPD0gMCkge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdpZCBtdXN0IGJlIGEgcG9zZXRpdmUgaW50ZWdlci4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGluaXRpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2luaXRpYWxpemVyIG11c3QgYmUgYSBmdW5jdGlvbi4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmluaXRpYWxpemVycy5zZXQoaWQsIGluaXRpYWxpemVyKVxuICAgIH1cbiAgICBcbiAgICBidWlsZCgpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gbmV3IE1hcCgpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBcbiAgICB3aXRoQ29tcG9uZW50KGNvbXBvbmVudElkLCBpbml0aWFsaXplcikge1xuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoY29tcG9uZW50SWQpIHx8IGNvbXBvbmVudElkIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgaW5pdGlhbGl6ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGluaXRpYWxpemVyID0gdGhpcy5pbml0aWFsaXplcnMuZ2V0KGNvbXBvbmVudElkKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uc2V0KGNvbXBvbmVudElkLCBpbml0aWFsaXplcilcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZUNvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb25cbiAgICB9XG4gICAgXG4gICAgY3JlYXRlKGVudGl0eU1hbmFnZXIsIGNvdW50ID0gMSwgY29uZmlndXJhdGlvbiA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIShlbnRpdHlNYW5hZ2VyIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlcikpIHtcbiAgICAgICAgICAgIHJldHVybiBbXVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmIChjb25maWd1cmF0aW9uID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24gPSB0aGlzLmNvbmZpZ3VyYXRpb25cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3QgY29tcG9uZW50cyA9IEFycmF5LmZyb20oY29uZmlndXJhdGlvbi5rZXlzKCkpLnJlZHVjZSgoY3VyciwgbmV4dCkgPT4gY3VyciB8PSBuZXh0LCAwKVxuICAgICAgICBcbiAgICAgICAgbGV0IGVudGl0aWVzID0gW11cbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7ICsraSkge1xuICAgICAgICAgICAgbGV0IHsgaWQsIGVudGl0eSB9ID0gZW50aXR5TWFuYWdlci5uZXdFbnRpdHkoY29tcG9uZW50cylcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGlkID49IGVudGl0eU1hbmFnZXIuY2FwYWNpdHkpIHtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBbY29tcG9uZW50LCBpbml0aWFsaXplcl0gb2YgY29uZmlndXJhdGlvbikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5pdGlhbGl6ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gaW5pdGlhbGl6ZXIuY2FsbChlbnRpdHlbY29tcG9uZW50XSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVudGl0eVtjb21wb25lbnRdICE9PSAnb2JqZWN0JyAmJiByZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHlbY29tcG9uZW50XSA9IHJlc3VsdFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZW50aXRpZXMucHVzaCh7IGlkLCBlbnRpdHkgfSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLmxlbmd0aCA9PT0gMSA/IGVudGl0aWVzWzBdIDogZW50aXRpZXNcbiAgICB9XG59XG5cbmV4cG9ydCB7IEVudGl0eUZhY3RvcnkgfVxuIiwiY2xhc3MgQ29tcG9uZW50TWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpXG4gICAgfVxuICAgIFxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IG5ldyBNYXAoKVxuICAgIH1cbiAgICBcbiAgICBuZXdDb21wb25lbnQoY29tcG9uZW50SWQpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50cy5nZXQoY29tcG9uZW50SWQpXG4gICAgICAgIFxuICAgICAgICBpZiAoY29tcG9uZW50ID09PSBudWxsIHx8IGNvbXBvbmVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IGNvbXBvbmVudCgpXG4gICAgICAgICAgICBjYXNlICdvYmplY3QnICA6IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKChjb21wb25lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJldCA9IHt9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjb21wb25lbnQpLmZvckVhY2goa2V5ID0+IHJldFtrZXldID0gY29tcG9uZW50W2tleV0pXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0XG4gICAgICAgICAgICAgICAgfSkoY29tcG9uZW50KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9uZW50XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgICAgIGlmIChjb21wb25lbnQgPT09IG51bGwgfHwgY29tcG9uZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignY29tcG9uZW50IGNhbm5vdCBiZSBudWxsIG9yIHVuZGVmaW5lZC4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBtYXggPSBNYXRoLm1heCguLi50aGlzLmNvbXBvbmVudHMua2V5cygpKVxuICAgICAgICBcbiAgICAgICAgY29uc3QgaWQgPSBtYXggPT09IHVuZGVmaW5lZCB8fCBtYXggPT09IG51bGwgfHwgbWF4ID09PSAtSW5maW5pdHkgPyAxIDogbWF4ID09PSAwID8gMSA6IG1heCAqIDJcblxuICAgICAgICB0aGlzLmNvbXBvbmVudHMuc2V0KGlkLCBjb21wb25lbnQpXG5cbiAgICAgICAgcmV0dXJuIGlkXG4gICAgfVxuICAgIFxuICAgIGdldENvbXBvbmVudHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudHNcbiAgICB9XG59XG5cbmV4cG9ydCB7IENvbXBvbmVudE1hbmFnZXIgfVxuIiwiZXhwb3J0IGNvbnN0IFN5c3RlbVR5cGUgPSB7XG4gICAgTG9naWMgIDogMCxcbiAgICBSZW5kZXIgOiAxLFxuICAgIEluaXQgICA6IDJcbn1cblxuY2xhc3MgU3lzdGVtTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpXG4gICAgfVxuICAgIFxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMubG9naWNTeXN0ZW1zICA9IG5ldyBNYXAoKVxuICAgICAgICB0aGlzLnJlbmRlclN5c3RlbXMgPSBuZXcgTWFwKClcbiAgICAgICAgdGhpcy5pbml0U3lzdGVtcyAgID0gbmV3IE1hcCgpXG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyU3lzdGVtKHR5cGUsIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlICE9PSBTeXN0ZW1UeXBlLkxvZ2ljICYmIHR5cGUgIT09IFN5c3RlbVR5cGUuUmVuZGVyICYmIHR5cGUgIT09IFN5c3RlbVR5cGUuSW5pdCkge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCd0eXBlIG11c3QgYmUgYSB2YWxpZCBTeXN0ZW1UeXBlLicpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50cyAhPT0gJ251bWJlcicpICB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvbXBvbmVudHMgbXVzdCBiZSBhIG51bWJlci4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbi4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzeXN0ZW0gPSB7XG4gICAgICAgICAgICBjb21wb25lbnRzLFxuICAgICAgICAgICAgY2FsbGJhY2tcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3Qgc3lzdGVtSWQgPSBNYXRoLm1heCgwLCAuLi50aGlzLmxvZ2ljU3lzdGVtcy5rZXlzKCksIC4uLnRoaXMucmVuZGVyU3lzdGVtcy5rZXlzKCksIC4uLnRoaXMuaW5pdFN5c3RlbXMua2V5cygpKSArIDFcbiAgICAgICAgXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBTeXN0ZW1UeXBlLkxvZ2ljIDogdGhpcy5sb2dpY1N5c3RlbXMuc2V0KHN5c3RlbUlkLCBzeXN0ZW0pOyBicmVha1xuICAgICAgICAgICAgY2FzZSBTeXN0ZW1UeXBlLlJlbmRlciA6IHRoaXMucmVuZGVyU3lzdGVtcy5zZXQoc3lzdGVtSWQsIHN5c3RlbSk7IGJyZWFrXG4gICAgICAgICAgICBjYXNlIFN5c3RlbVR5cGUuSW5pdCA6IHRoaXMuaW5pdFN5c3RlbXMuc2V0KHN5c3RlbUlkLCBzeXN0ZW0pOyBicmVha1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gc3lzdGVtSWRcbiAgICB9XG4gICAgXG4gICAgcmVtb3ZlU3lzdGVtKHN5c3RlbUlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2ljU3lzdGVtcy5kZWxldGUoc3lzdGVtSWQpIHx8IHRoaXMucmVuZGVyU3lzdGVtcy5kZWxldGUoc3lzdGVtSWQpIHx8IHRoaXMuaW5pdFN5c3RlbXMuZGVsZXRlKHN5c3RlbUlkKVxuICAgIH1cbn1cblxuZXhwb3J0IHsgU3lzdGVtTWFuYWdlciB9XG4iLCJpbXBvcnQgeyBFbnRpdHlNYW5hZ2VyIH0gZnJvbSAnLi9lbnRpdHktbWFuYWdlcidcblxuY29uc3QgZW1wdHlQcm9taXNlID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgfSlcbn1cblxuY29uc3QgcHJvbWlzZSA9IChjYWxsYmFjaywgY29udGV4dCwgYXJncywgdGltZW91dCkgPT4ge1xuICAgIGlmICh0aW1lb3V0KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHR5cGVvZiBjb250ZXh0ID09PSAgJ29iamVjdCcgPyBjYWxsYmFjay5jYWxsKGNvbnRleHQsIC4uLmFyZ3MpIDogY2FsbGJhY2suYXBwbHkoY29udGV4dCwgLi4uYXJncykpXG4gICAgICAgICAgICB9LCB0aW1lb3V0KVxuICAgICAgICB9KVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIHJlc29sdmUodHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnID8gY2FsbGJhY2suY2FsbChjb250ZXh0LCAuLi5hcmdzKSA6IGNhbGxiYWNrLmFwcGx5KGNvbnRleHQsIC4uLmFyZ3MpKVxuICAgIH0pXG59XG4gICAgXG5jbGFzcyBFdmVudEhhbmRsZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmluaXQoKVxuICAgIH1cbiAgICBcbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBNYXAoKVxuICAgIH1cbiAgICBcbiAgICBsaXN0ZW4oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnQgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICghdGhpcy5ldmVudHMuaGFzKGV2ZW50KSkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMuc2V0KGV2ZW50LCBuZXcgTWFwKCkpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBldmVudElkID0gLTFcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnRJZCA9IE1hdGgubWF4KGV2ZW50SWQsIC4uLmV2ZW50LmtleXMoKSlcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICArK2V2ZW50SWRcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZXZlbnRzLmdldChldmVudCkuc2V0KGV2ZW50SWQsIGNhbGxiYWNrKVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGV2ZW50SWRcbiAgICB9XG4gICAgXG4gICAgc3RvcExpc3RlbihldmVudElkKSB7XG4gICAgICAgIGZvciAobGV0IGV2ZW50cyBvZiB0aGlzLmV2ZW50cy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaWQgb2YgZXZlbnRzLmtleXMoKSkge1xuICAgICAgICAgICAgICAgIGlmIChpZCA9PT0gZXZlbnRJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnRzLmRlbGV0ZShldmVudElkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBcbiAgICB0cmlnZ2VyKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXMgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyID8gdGhpcy5ldmVudEhhbmRsZXIgOiB0aGlzXG4gICAgICAgIFxuICAgICAgICBsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKVxuICAgICAgICBcbiAgICAgICAgbGV0IFsgZXZlbnQgXSA9IGFyZ3Muc3BsaWNlKDAsIDEpXG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCAhc2VsZi5ldmVudHMuaGFzKGV2ZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIGVtcHR5UHJvbWlzZSgpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdXG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBjYWxsYmFjayBvZiBzZWxmLmV2ZW50cy5nZXQoZXZlbnQpLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHByb21pc2UoY2FsbGJhY2ssIHRoaXMsIGFyZ3MpKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpXG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXJEZWxheWVkKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXMgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyID8gdGhpcy5ldmVudEhhbmRsZXIgOiB0aGlzXG4gICAgICAgIFxuICAgICAgICBsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKVxuICAgICAgICBcbiAgICAgICAgbGV0IFsgZXZlbnQsIHRpbWVvdXQgXSA9IGFyZ3Muc3BsaWNlKDAsIDIpXG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCAhTnVtYmVyLmlzSW50ZWdlcih0aW1lb3V0KSB8fCAhc2VsZi5ldmVudHMuaGFzKGV2ZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIGVtcHR5UHJvbWlzZSgpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdXG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBjYWxsYmFjayBvZiBzZWxmLmV2ZW50cy5nZXQoZXZlbnQpLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHByb21pc2UoY2FsbGJhY2ssIHRoaXMsIGFyZ3MsIHRpbWVvdXQpKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpXG4gICAgfVxufVxuXG5leHBvcnQgeyBFdmVudEhhbmRsZXIgfVxuIiwiaW1wb3J0IHsgRW50aXR5RmFjdG9yeSB9ICAgICAgICAgICAgIGZyb20gJy4vZW50aXR5LWZhY3RvcnknXG5pbXBvcnQgeyBDb21wb25lbnRNYW5hZ2VyIH0gICAgICAgICAgZnJvbSAnLi9jb21wb25lbnQtbWFuYWdlcidcbmltcG9ydCB7IFN5c3RlbU1hbmFnZXIsIFN5c3RlbVR5cGUgfSBmcm9tICcuL3N5c3RlbS1tYW5hZ2VyJ1xuaW1wb3J0IHsgRXZlbnRIYW5kbGVyIH0gICAgICAgICAgICAgIGZyb20gJy4vZXZlbnQtaGFuZGxlcidcblxuY2xhc3MgRW50aXR5TWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoY2FwYWNpdHkgPSAxMDAwKSB7XG4gICAgICAgIHRoaXMuaW5pdChjYXBhY2l0eSlcbiAgICB9XG4gICAgXG4gICAgaW5pdChjYXBhY2l0eSkge1xuICAgICAgICB0aGlzLmNhcGFjaXR5ICAgICAgICAgPSBjYXBhY2l0eVxuICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSAtMVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5ICAgID0gbmV3IEVudGl0eUZhY3RvcnkoKVxuICAgICAgICB0aGlzLnN5c3RlbU1hbmFnZXIgICAgPSBuZXcgU3lzdGVtTWFuYWdlcigpXG4gICAgICAgIHRoaXMuY29tcG9uZW50TWFuYWdlciA9IG5ldyBDb21wb25lbnRNYW5hZ2VyKClcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIgICAgID0gbmV3IEV2ZW50SGFuZGxlcigpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0eUNvbmZpZ3VyYXRpb25zID0gbmV3IE1hcCgpXG4gICAgICAgIHRoaXMuY29tcG9uZW50TG9va3VwICAgICAgPSBuZXcgTWFwKClcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXRpZXMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoIDogdGhpcy5jYXBhY2l0eSB9LCAoKSA9PiAoeyBjb21wb25lbnRzOiAwIH0pKVxuICAgIH1cbiAgICBcbiAgICBpbmNyZWFzZUNhcGFjaXR5KCkge1xuICAgICAgICBsZXQgb2xkQ2FwYWNpdHkgPSB0aGlzLmNhcGFjaXR5XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNhcGFjaXR5ICo9IDJcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXRpZXMgPSBbLi4udGhpcy5lbnRpdGllcywgLi4uQXJyYXkuZnJvbSh7IGxlbmd0aCA6IG9sZENhcGFjaXR5IH0sICgpID0+ICh7IGNvbXBvbmVudHM6IDAgfSkpXVxuXG4gICAgICAgIGZvciAobGV0IGkgPSBvbGRDYXBhY2l0eTsgaSA8IHRoaXMuY2FwYWNpdHk7ICsraSkge1xuICAgICAgICAgICAgbGV0IGVudGl0eSA9IHRoaXMuZW50aXRpZXNbaV1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChjb25zdCBjb21wb25lbnRJZCBvZiB0aGlzLmNvbXBvbmVudE1hbmFnZXIuZ2V0Q29tcG9uZW50cygpLmtleXMoKSkge1xuICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnROYW1lID0gbnVsbFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGZvciAobGV0IFtrZXksIHZhbHVlXSBvZiB0aGlzLmNvbXBvbmVudExvb2t1cC5lbnRyaWVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBjb21wb25lbnRJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50TmFtZSA9IGtleVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZW50aXR5W2NvbXBvbmVudElkXSA9IHRoaXMuY29tcG9uZW50TWFuYWdlci5uZXdDb21wb25lbnQoY29tcG9uZW50SWQpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVudGl0eSwgY29tcG9uZW50TmFtZSwgeyBnZXQoKSB7IHJldHVybiB0aGlzW2NvbXBvbmVudElkXSB9LCBjb25maWd1cmFibGU6IHRydWUgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBuZXdFbnRpdHkoY29tcG9uZW50cykge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjb21wb25lbnRzKSkge1xuICAgICAgICAgICAgY29tcG9uZW50cyA9IEFycmF5LmZyb20odGhpcy5jb21wb25lbnRMb29rdXApLnJlZHVjZSgoY3VyciwgbmV4dCkgPT4gWycnLCBjdXJyWzFdIHwgbmV4dFsxXV0sIFsnJywgMF0pWzFdXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihjb21wb25lbnRzKSB8fCBjb21wb25lbnRzIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiB7IGlkIDogdGhpcy5jYXBhY2l0eSwgZW50aXR5IDogbnVsbCB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBpZCA9IDBcbiAgICAgICAgXG4gICAgICAgIGZvciAoOyBpZCA8IHRoaXMuY2FwYWNpdHk7ICsraWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGlkID49IHRoaXMuY2FwYWNpdHkpIHtcbiAgICAgICAgICAgIC8vIHRvZG86IGF1dG8gaW5jcmVhc2UgY2FwYWNpdHk/XG4gICAgICAgICAgICByZXR1cm4geyBpZCA6IHRoaXMuY2FwYWNpdHksIGVudGl0eSA6IG51bGwgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoaWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IGlkXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMgPSBjb21wb25lbnRzXG4gICAgICAgIFxuICAgICAgICByZXR1cm4geyBpZCwgZW50aXR5IDogdGhpcy5lbnRpdGllc1tpZF0gfVxuICAgIH1cbiAgICBcbiAgICBkZWxldGVFbnRpdHkoaWQpIHtcbiAgICAgICAgLy90b2RvIGFkZCBzYW5pdHkgY2hlY2tcbiAgICAgICAgdGhpcy5lbnRpdGllc1tpZF0uY29tcG9uZW50cyA9IDBcbiAgICAgICAgXG4gICAgICAgIGlmIChpZCA8IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSBpZDsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2ldLmNvbXBvbmVudHMgIT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSBpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSAwXG4gICAgfVxuXG4gICAgLy8gRG9lcyBub3QgYWxsb3cgY29tcG9uZW50cyB0byBiZSBhbnl0aGluZyBvdGhlciB0aGFuIGEgYml0bWFzayBmb3IgcGVyZm9ybWFuY2UgcmVhc29uc1xuICAgIC8vIFRoaXMgbWV0aG9kIHdpbGwgYmUgY2FsbGVkIGZvciBldmVyeSBzeXN0ZW0gZm9yIGV2ZXJ5IGxvb3AgKHdoaWNoIG1pZ2h0IGJlIGFzIGhpZ2ggYXMgNjAgLyBzZWNvbmQpXG4gICAgKmdldEVudGl0aWVzKGNvbXBvbmVudHMgPSAwKSB7XG4gICAgICAgIGZvciAobGV0IGlkID0gMDsgaWQgPD0gdGhpcy5jdXJyZW50TWF4RW50aXR5OyArK2lkKSB7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50cyA9PT0gMCB8fCAodGhpcy5lbnRpdGllc1tpZF0uY29tcG9uZW50cyAmIGNvbXBvbmVudHMpID09PSBjb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgeWllbGQgeyBpZCwgZW50aXR5IDogdGhpcy5lbnRpdGllc1tpZF0gfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyQ29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgY29uc3QgY29uZmlndXJhdGlvbklkID0gTWF0aC5tYXgoMCwgLi4udGhpcy5lbnRpdHlDb25maWd1cmF0aW9ucy5rZXlzKCkpICsgMVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlDb25maWd1cmF0aW9ucy5zZXQoY29uZmlndXJhdGlvbklkLCB0aGlzLmVudGl0eUZhY3RvcnkuY3JlYXRlQ29uZmlndXJhdGlvbigpKVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGNvbmZpZ3VyYXRpb25JZFxuICAgIH1cbiAgICBcbiAgICAvLyBDb21wb25lbnQgTWFuYWdlclxuICAgIFxuICAgIHJlZ2lzdGVyQ29tcG9uZW50KG5hbWUsIGNvbXBvbmVudCkge1xuICAgICAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnIHx8IG5hbWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ25hbWUgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcuJylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuY29tcG9uZW50TG9va3VwLmdldChuYW1lKSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3QgY29tcG9uZW50SWQgPSB0aGlzLmNvbXBvbmVudE1hbmFnZXIucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KVxuICAgICAgICBcbiAgICAgICAgdGhpcy5jb21wb25lbnRMb29rdXAuc2V0KG5hbWUsIGNvbXBvbmVudElkKVxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgZW50aXR5IG9mIHRoaXMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgIGVudGl0eVtjb21wb25lbnRJZF0gPSB0aGlzLmNvbXBvbmVudE1hbmFnZXIubmV3Q29tcG9uZW50KGNvbXBvbmVudElkKVxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVudGl0eSwgbmFtZSwgeyBnZXQoKSB7IHJldHVybiB0aGlzW2NvbXBvbmVudElkXSB9LCBjb25maWd1cmFibGU6IHRydWUgfSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGluaXRpYWxpemVyXG5cbiAgICAgICAgc3dpdGNoICh0eXBlb2YgY29tcG9uZW50KSB7XG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6IGluaXRpYWxpemVyID0gY29tcG9uZW50OyBicmVha1xuICAgICAgICAgICAgY2FzZSAnb2JqZWN0Jzoge1xuICAgICAgICAgICAgICAgIGluaXRpYWxpemVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhjb21wb25lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBjb21wb25lbnRba2V5XVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6IGluaXRpYWxpemVyID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb21wb25lbnQgfTsgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LnJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudElkXG4gICAgfVxuICAgIFxuICAgIGFkZENvbXBvbmVudChlbnRpdHlJZCwgY29tcG9uZW50KSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0uY29tcG9uZW50cyB8PSB0aGlzLmNvbXBvbmVudExvb2t1cC5nZXQoY29tcG9uZW50KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0uY29tcG9uZW50cyB8PSBjb21wb25lbnRcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZW1vdmVDb21wb25lbnQoZW50aXR5SWQsIGNvbXBvbmVudCkge1xuICAgICAgICBpZiAodHlwZW9mIGNvbXBvbmVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuZW50aXRpZXNbZW50aXR5SWRdLmNvbXBvbmVudHMgJj0gfnRoaXMuY29tcG9uZW50TG9va3VwLmdldChjb21wb25lbnQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eUlkXS5jb21wb25lbnRzICY9IH5jb21wb25lbnQgICBcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBTeXN0ZW0gTWFuYWdlclxuICAgIFxuICAgIHJlZ2lzdGVyU3lzdGVtKHR5cGUsIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbXBvbmVudHMpKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzID0gQXJyYXkuZnJvbSh0aGlzLmNvbXBvbmVudExvb2t1cCkucmVkdWNlKChjdXJyLCBuZXh0KSA9PiBbJycsIGN1cnJbMV0gfCBuZXh0WzFdXSwgWycnLCAwXSlbMV1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbSh0eXBlLCBjb21wb25lbnRzLCBjYWxsYmFjaylcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJMb2dpY1N5c3RlbShjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RlclN5c3RlbShTeXN0ZW1UeXBlLkxvZ2ljLCBjb21wb25lbnRzLCBjYWxsYmFjaylcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJSZW5kZXJTeXN0ZW0oY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXJTeXN0ZW0oU3lzdGVtVHlwZS5SZW5kZXIsIGNvbXBvbmVudHMsIGNhbGxiYWNrKVxuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckluaXRTeXN0ZW0oY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXJTeXN0ZW0oU3lzdGVtVHlwZS5Jbml0LCBjb21wb25lbnRzLCBjYWxsYmFjaylcbiAgICB9XG4gICAgXG4gICAgcmVtb3ZlU3lzdGVtKHN5c3RlbUlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVtb3ZlU3lzdGVtKHN5c3RlbUlkKVxuICAgIH1cbiAgICBcbiAgICBvbkxvZ2ljKG9wdHMpIHtcbiAgICAgICAgZm9yIChsZXQgc3lzdGVtIG9mIHRoaXMuc3lzdGVtTWFuYWdlci5sb2dpY1N5c3RlbXMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMpLCBvcHRzKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uUmVuZGVyKG9wdHMpIHtcbiAgICAgICAgZm9yIChsZXQgc3lzdGVtIG9mIHRoaXMuc3lzdGVtTWFuYWdlci5yZW5kZXJTeXN0ZW1zLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBzeXN0ZW0uY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLmdldEVudGl0aWVzKHN5c3RlbS5jb21wb25lbnRzKSwgb3B0cylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5pdChvcHRzKSB7XG4gICAgICAgIGZvciAobGV0IHN5c3RlbSBvZiB0aGlzLnN5c3RlbU1hbmFnZXIuaW5pdFN5c3RlbXMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMpLCBvcHRzKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIEVudGl0eSBGYWN0b3J5XG4gICAgXG4gICAgcmVnaXN0ZXJJbml0aWFsaXplcihjb21wb25lbnQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LnJlZ2lzdGVySW5pdGlhbGl6ZXIodGhpcy5jb21wb25lbnRMb29rdXAuZ2V0KGNvbXBvbmVudCksIGluaXRpYWxpemVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LnJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50LCBpbml0aWFsaXplcilcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBidWlsZCgpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LmJ1aWxkKClcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIFxuICAgIHdpdGhDb21wb25lbnQoY29tcG9uZW50LCBpbml0aWFsaXplcikge1xuICAgICAgICBpZiAodHlwZW9mIGNvbXBvbmVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS53aXRoQ29tcG9uZW50KHRoaXMuY29tcG9uZW50TG9va3VwLmdldChjb21wb25lbnQpLCBpbml0aWFsaXplcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS53aXRoQ29tcG9uZW50KGNvbXBvbmVudCwgaW5pdGlhbGl6ZXIpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZShjb3VudCwgY29uZmlndXJhdGlvbklkKSB7XG4gICAgICAgIGxldCBjb25maWd1cmF0aW9uID0gdW5kZWZpbmVkXG4gICAgICAgIFxuICAgICAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcihjb25maWd1cmF0aW9uSWQpICYmIGNvbmZpZ3VyYXRpb25JZCA+IDApIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24gPSB0aGlzLmVudGl0eUNvbmZpZ3VyYXRpb25zLmdldChjb25maWd1cmF0aW9uSWQpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChjb25maWd1cmF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcignQ291bGQgbm90IGZpbmQgZW50aXR5IGNvbmZpZ3VyYXRpb24uIElmIHlvdSB3aXNoIHRvIGNyZWF0ZSBlbnRpdGllcyB3aXRob3V0IGEgY29uZmlndXJhdGlvbiwgZG8gbm90IHBhc3MgYSBjb25maWd1cmF0aW9uSWQuJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuZW50aXR5RmFjdG9yeS5jcmVhdGUodGhpcywgY291bnQsIGNvbmZpZ3VyYXRpb24pXG4gICAgfVxuICAgIFxuICAgIC8vIEV2ZW50IEhhbmRsZXJcbiAgICBcbiAgICBsaXN0ZW4oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci5saXN0ZW4oZXZlbnQsIGNhbGxiYWNrKVxuICAgIH1cbiAgICBcbiAgICBzdG9wTGlzdGVuKGV2ZW50SWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLnN0b3BMaXN0ZW4oZXZlbnRJZClcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLnRyaWdnZXIuY2FsbCh0aGlzLCAuLi5hcmd1bWVudHMpXG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXJEZWxheWVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlckRlbGF5ZWQuY2FsbCh0aGlzLCAuLi5hcmd1bWVudHMpXG4gICAgfVxufVxuXG5leHBvcnQgeyBFbnRpdHlNYW5hZ2VyIH1cbiIsIi8qKlxuICogbWFpbmxvb3AuanMgMS4wLjMtMjAxNjAzMjBcbiAqXG4gKiBAYXV0aG9yIElzYWFjIFN1a2luIChodHRwOi8vd3d3LmlzYWFjc3VraW4uY29tLylcbiAqIEBsaWNlbnNlIE1JVFxuICovXG5cbiFmdW5jdGlvbihhKXtmdW5jdGlvbiBiKGEpe2lmKHY9byhiKSwhKGUraj5hKSl7Zm9yKGQrPWEtZSxlPWEscihhLGQpLGE+ZysxZTMmJihmPS4yNSpoKy43NSpmLGc9YSxoPTApLGgrKyxpPTA7ZD49YzspaWYocyhjKSxkLT1jLCsraT49MjQwKXttPSEwO2JyZWFrfXQoZC9jKSx1KGYsbSksbT0hMX19dmFyIGM9MWUzLzYwLGQ9MCxlPTAsZj02MCxnPTAsaD0wLGk9MCxqPTAsaz0hMSxsPSExLG09ITEsbj1cIm9iamVjdFwiPT10eXBlb2Ygd2luZG93P3dpbmRvdzphLG89bi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fGZ1bmN0aW9uKCl7dmFyIGE9RGF0ZS5ub3coKSxiLGQ7cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiBiPURhdGUubm93KCksZD1NYXRoLm1heCgwLGMtKGItYSkpLGE9YitkLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtlKGIrZCl9LGQpfX0oKSxwPW4uY2FuY2VsQW5pbWF0aW9uRnJhbWV8fGNsZWFyVGltZW91dCxxPWZ1bmN0aW9uKCl7fSxyPXEscz1xLHQ9cSx1PXEsdjthLk1haW5Mb29wPXtnZXRTaW11bGF0aW9uVGltZXN0ZXA6ZnVuY3Rpb24oKXtyZXR1cm4gY30sc2V0U2ltdWxhdGlvblRpbWVzdGVwOmZ1bmN0aW9uKGEpe3JldHVybiBjPWEsdGhpc30sZ2V0RlBTOmZ1bmN0aW9uKCl7cmV0dXJuIGZ9LGdldE1heEFsbG93ZWRGUFM6ZnVuY3Rpb24oKXtyZXR1cm4gMWUzL2p9LHNldE1heEFsbG93ZWRGUFM6ZnVuY3Rpb24oYSl7cmV0dXJuXCJ1bmRlZmluZWRcIj09dHlwZW9mIGEmJihhPTEvMCksMD09PWE/dGhpcy5zdG9wKCk6aj0xZTMvYSx0aGlzfSxyZXNldEZyYW1lRGVsdGE6ZnVuY3Rpb24oKXt2YXIgYT1kO3JldHVybiBkPTAsYX0sc2V0QmVnaW46ZnVuY3Rpb24oYSl7cmV0dXJuIHI9YXx8cix0aGlzfSxzZXRVcGRhdGU6ZnVuY3Rpb24oYSl7cmV0dXJuIHM9YXx8cyx0aGlzfSxzZXREcmF3OmZ1bmN0aW9uKGEpe3JldHVybiB0PWF8fHQsdGhpc30sc2V0RW5kOmZ1bmN0aW9uKGEpe3JldHVybiB1PWF8fHUsdGhpc30sc3RhcnQ6ZnVuY3Rpb24oKXtyZXR1cm4gbHx8KGw9ITAsdj1vKGZ1bmN0aW9uKGEpe3QoMSksaz0hMCxlPWEsZz1hLGg9MCx2PW8oYil9KSksdGhpc30sc3RvcDpmdW5jdGlvbigpe3JldHVybiBrPSExLGw9ITEscCh2KSx0aGlzfSxpc1J1bm5pbmc6ZnVuY3Rpb24oKXtyZXR1cm4ga319LFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoYS5NYWluTG9vcCk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbnVsbCE9PW1vZHVsZSYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZS5leHBvcnRzJiYobW9kdWxlLmV4cG9ydHM9YS5NYWluTG9vcCl9KHRoaXMpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFpbmxvb3AubWluLmpzLm1hcCIsIi8qIEBmbG93ICovXG5cbmltcG9ydCBNYWluTG9vcCBmcm9tICdtYWlubG9vcC5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbkxvb3BMb29wTWFuYWdlciB7XG4gICAgLy8gc2V0VXBkYXRlKHVwZGF0ZU1ldGhvZCA6IChkZWx0YSA6IG51bWJlcikgPT4gdm9pZCkgOiBNYWluTG9vcExvb3BNYW5hZ2VyIHtcbiAgICBzZXRVcGRhdGUodXBkYXRlTWV0aG9kKSB7XG4gICAgICAgIE1haW5Mb29wLnNldFVwZGF0ZSh1cGRhdGVNZXRob2QpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBcbiAgICBzZXRSZW5kZXIocmVuZGVyTWV0aG9kIDogKGludGVycG9sYXRpb25QZXJjZW50YWdlIDogbnVtYmVyKSA9PiB2b2lkKSA6IE1haW5Mb29wTG9vcE1hbmFnZXIge1xuICAgICAgICBNYWluTG9vcC5zZXREcmF3KHJlbmRlck1ldGhvZClcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIFxuICAgIHN0YXJ0KCkgOiB2b2lkIHtcbiAgICAgICAgTWFpbkxvb3Auc3RhcnQoKVxuICAgIH1cbiAgICBcbiAgICBzdG9wKCkgOiB2b2lkIHtcbiAgICAgICAgTWFpbkxvb3Auc3RvcCgpXG4gICAgfVxufSIsIi8qIEBmbG93ICovXG5cbmltcG9ydCB0aHJlZSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRocmVlT2JqZWN0TWVzaExvYWRlciB7XG4gICAgbG9hZGVyICA6IHRocmVlLk9iamVjdExvYWRlcjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5sb2FkZXIgID0gbmV3IHRocmVlLk9iamVjdExvYWRlcigpO1xuICAgIH1cbiAgICBcbiAgICBvblByb2dyZXNzKCkge1xuICAgICAgICAvLyBwbGFjZWhvbGRlclxuICAgIH1cbiAgICBcbiAgICBwYXJzZShqc29uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRlci5wYXJzZShqc29uKVxuICAgIH1cbiAgICBcbiAgICAvLyB0b2RvIHRoaXMgbm93IHJldHVybnMgYSBzY2VuZS4uIGltcGxpY2F0aW9ucz9cbiAgICAvLyB0b2RvIGFkZCBvcHRpb25zIGFzIGEgZGVzdHJ1Y3RhYmxlIG9iamVjdCAtPiBzdG9wcGVkIGJ5IGZsb3c6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9mbG93L2lzc3Vlcy8xODNcbiAgICBsb2FkKHBhdGggOiBzdHJpbmcsIG9wdGlvbnM/IDogT2JqZWN0KSA6IFByb21pc2Uge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNoYWRpbmcgPSAob3B0aW9ucyB8fCB7IH0pLnNoYWRpbmc7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzZWxmLmxvYWRlci5sb2FkKHBhdGgsIG9iaiA9PiByZXNvbHZlKG9iaiksIGluZm8gPT4gc2VsZi5vblByb2dyZXNzKGluZm8pLCBlcnIgPT4gcmVqZWN0KGVycikpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKG1lc2ggPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzaGFkaW5nICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXNoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBtZXNoLnRyYXZlcnNlKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiB0aHJlZS5NZXNoKSB7XG4gICAgICAgICAgICAgICAgICAgY2hpbGQubWF0ZXJpYWwuc2hhZGluZyA9IHNoYWRpbmc7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIG1lc2g7XG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSIsIi8qIEBmbG93ICovXG5cbmltcG9ydCB0aHJlZSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRocmVlUmVuZGVyZXJNYW5hZ2VyIHtcbiAgICByZW5kZXJlciAgICAgOiB0aHJlZS5XZWJHTFJlbmRlcmVyO1xuICAgIGNhbWVyYSAgICAgICA6IHRocmVlLkNhbWVyYTtcbiAgICAvLyBnZW9tZXRyaWVzICAgOiBNYXA8c3RyaW5nLCB0aHJlZS5HZW9tZXRyeT47XG4gICAgLy8gbWF0ZXJpYWxzICAgIDogTWFwPHN0cmluZywgdGhyZWUuTWF0ZXJpYWw+O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IHRocmVlLldlYkdMUmVuZGVyZXIoeyBhbnRpYWxpYXMgOiB0cnVlIH0pO1xuXHRcdHRoaXMucmVuZGVyZXIuc2V0Q2xlYXJDb2xvciggMHgwMDAwMDAgKTtcblx0XHR0aGlzLnJlbmRlcmVyLnNldFBpeGVsUmF0aW8oIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvICk7XG4gICAgfVxuICAgIFxuICAgIGVuYWJsZVNoYWRvd3MoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlXG4gICAgfVxuICAgIFxuICAgIGlzRnVsbFNjcmVlbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuX2Z1bGxTY3JlZW5cbiAgICB9XG4gICAgXG4gICAgLy90b2RvIG1ha2UgaW50byBnZXR0ZXIgLyBzZXR0ZXIgP1xuICAgIHNldFNjZW5lKHNjZW5lKSB7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZVxuICAgIH1cbiAgICBcbiAgICBzZXRDYW1lcmEoY2FtZXJhLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhXG4gICAgfVxuICAgIFxuICAgIHNldFNpemUod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNGdWxsU2NyZWVuKCkpIHtcblx0XHQgICAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gKHdpZHRoIHx8IDUwMCkgLyAoaGVpZ2h0IHx8IDUwMClcbiAgICBcdH1cblx0XHRcblx0XHR0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KClcblx0XHRcblx0XHRpZiAoIXRoaXMuaXNGdWxsU2NyZWVuKCkpIHtcblx0ICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUod2lkdGggfHwgNTAwLCBoZWlnaHQgfHwgNTAwKVxuXHRcdH1cbiAgICB9XG4gICAgXG4gICAgZ2V0RG9tKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5kb21FbGVtZW50XG4gICAgfVxuICAgIFxuICAgIGdldFNjZW5lKCkgOiB0aHJlZS5TY2VuZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjZW5lO1xuICAgIH1cbiAgICBcbiAgICBnZXRHZW9tZXRyeShrZXkgOiBzdHJpbmcpIDogdGhyZWUuR2VvbWV0cnkge1xuICAgICAgICByZXR1cm4gZ2VvbWV0cmllcy5nZXQoa2V5KTtcbiAgICB9XG4gICAgXG4gICAgZ2V0TWF0ZXJpYWwoa2V5IDogc3RyaW5nKSA6IHRocmVlLk1hdGVyaWFsIHtcbiAgICAgICAgcmV0dXJuIG1hdGVyaWFscy5nZXQoa2V5KTtcbiAgICB9XG4gICAgXG4gICAgYWRkTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpIHtcbiAgICAgICAgdmFyIGdlbyA9IHRoaXMuZ2VvbWV0cmllcy5nZXQoZ2VvbWV0cnkpO1xuICAgICAgICB2YXIgbWF0ID0gdGhpcy5tYXRlcmlhbHMuZ2V0KG1hdGVyaWFsKTtcbiAgICAgICAgdmFyIG1lc2ggPSBuZXcgdGhyZWUuTWVzaChnZW8sIG1hdCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNjZW5lLmFkZChtZXNoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBtZXNoO1xuICAgIH1cbiAgICBcbiAgICByZW5kZXIoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UgOiBudW1iZXIpIDogdm9pZCB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhKTtcbiAgICB9XG4gICAgXG4gICAgLy8gcmVuZGVyKHNjZW5lIDogdGhyZWUuU2NlbmUsIGludGVycG9sYXRpb25QZXJjZW50YWdlIDogbnVtYmVyKSA6IHZvaWQge1xuICAgIC8vICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcihzY2VuZSwgdGhpcy5jYW1lcmEpO1xuICAgIC8vIH1cbn1cbiIsImltcG9ydCB7RW50aXR5TWFuYWdlcn0gICAgICAgZnJvbSAnZ2ctZW50aXRpZXMnXG5pbXBvcnQgTWFpbkxvb3BMb29wTWFuYWdlciAgIGZyb20gJy4uL2xvZ2ljL21haW5sb29wLWxvb3AtbWFuYWdlcidcbi8vIGltcG9ydCBGZXRjaEZpbGVMb2FkZXIgICAgICAgZnJvbSAnLi4vbG9naWMvZmV0Y2gtZmlsZS1sb2FkZXInXG5pbXBvcnQgVGhyZWVPYmplY3RNZXNoTG9hZGVyIGZyb20gJy4uL2xvZ2ljL3RocmVlLW9iamVjdC1tZXNoLWxvYWRlcidcblxuaW1wb3J0IFRocmVlUmVuZGVyZXJNYW5hZ2VyIGZyb20gJy4uL3ZpZXcvdGhyZWUtcmVuZGVyZXItbWFuYWdlcidcblxuY29uc3QgX2xvb3BNYW5hZ2VyICAgICA9IG5ldyBNYWluTG9vcExvb3BNYW5hZ2VyKClcbi8vIGNvbnN0IF9maWxlTG9hZGVyICAgICAgPSBuZXcgRmV0Y2hGaWxlTG9hZGVyKClcbmNvbnN0IF9sb2FkZXIgICAgICAgICAgPSBuZXcgVGhyZWVPYmplY3RNZXNoTG9hZGVyKClcbmNvbnN0IF9yZW5kZXJlck1hbmFnZXIgPSBuZXcgVGhyZWVSZW5kZXJlck1hbmFnZXIoKVxuY29uc3QgX2VudGl0eU1hbmFnZXIgICA9IG5ldyBFbnRpdHlNYW5hZ2VyKClcblxuY29uc3QgbG9vcE1hbmFnZXIgICAgID0gKCkgPT4gX2xvb3BNYW5hZ2VyXG4vLyBjb25zdCBmaWxlTG9hZGVyICAgICAgPSAoKSA9PiBfZmlsZUxvYWRlclxuY29uc3QgbG9hZGVyICAgICAgICAgID0gKCkgPT4gX2xvYWRlclxuY29uc3QgcmVuZGVyZXJNYW5hZ2VyID0gKCkgPT4gX3JlbmRlcmVyTWFuYWdlclxuY29uc3QgZW50aXR5TWFuYWdlciAgID0gKCkgPT4gX2VudGl0eU1hbmFnZXJcblxuZXhwb3J0IGRlZmF1bHQge2xvb3BNYW5hZ2VyLCBsb2FkZXIsIHJlbmRlcmVyTWFuYWdlciwgZW50aXR5TWFuYWdlcn1cbmV4cG9ydCB7bG9vcE1hbmFnZXIsIGxvYWRlciwgcmVuZGVyZXJNYW5hZ2VyLCBlbnRpdHlNYW5hZ2VyfSIsIi8vIC8qIEBmbG93ICovXG5cbi8vIHRvZG8gbWFrZSBESSBub3QgYmUgaGFyZGNvZGVkXG5pbXBvcnQgREkgZnJvbSAnLi9ESS9icm93c2VyJ1xuXG5jb25zdCBDT01QT05FTlQgPSB7XG4gICAgVFJBTlNGT1JNOiAndHJhbnNmb3JtJyxcbiAgICBBUFBFQVJBTkNFOiAnYXBwZWFyYW5jZSdcbn1cblxuZXhwb3J0IGNsYXNzIEdHIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICBcdC8vIHdpZHRoIGFuZCBoZWlnaHQgc2V0IHRvIDUwMCBqdXN0IHRvIGhhdmUgaXQgYXMgaW4gdGhlIGVkaXRvciBmb3IgdGhlIHRpbWUgYmVpbmdcbiAgICBcdHRoaXMud2lkdGggID0gNTAwXG4gICAgXHR0aGlzLmhlaWdodCA9IDUwMFxuXG4gICAgICAgIHRoaXMuZW50aXR5TWFuYWdlciAgID0gREkuZW50aXR5TWFuYWdlcigpXG4gICAgICAgIHRoaXMubG9vcE1hbmFnZXIgICAgID0gREkubG9vcE1hbmFnZXIoKVxuICAgICAgICB0aGlzLnJlbmRlcmVyTWFuYWdlciA9IERJLnJlbmRlcmVyTWFuYWdlcigpXG4gICAgICAgIHRoaXMubG9hZGVyXHRcdFx0ID0gREkubG9hZGVyKClcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZG9tID0gdGhpcy5yZW5kZXJlck1hbmFnZXIuZ2V0RG9tKClcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaW5pdENvbXBvbmVudHMoKVxuICAgICAgICB0aGlzLmluaXRTeXN0ZW1zKClcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXR5TWFuYWdlci5vbkluaXQoe3JlbmRlck1hbmFnZXI6IHRoaXMucmVuZGVyZXJNYW5hZ2VyfSlcbiAgICAgICAgXG4gICAgICAgIHRoaXMubG9vcE1hbmFnZXIuc2V0VXBkYXRlKGRlbHRhID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5TWFuYWdlci5vbkxvZ2ljKGRlbHRhKVxuICAgICAgICB9KS5zZXRSZW5kZXIoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbnRpdHlNYW5hZ2VyLm9uUmVuZGVyKHtkZWx0YSA6IGludGVycG9sYXRpb25QZXJjZW50YWdlLCByZW5kZXJNYW5hZ2VyOiB0aGlzLnJlbmRlcmVyTWFuYWdlcn0pXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyTWFuYWdlci5yZW5kZXIoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIFxuICAgIHNldEVudGl0eURhdGEoZW50aXR5RGF0YSkge1xuICAgICAgICB0aGlzLmVudGl0eURhdGEgPSBlbnRpdHlEYXRhXG4gICAgfVxuXG4gICAgaW5pdENvbXBvbmVudHMoKSB7XG4gICAgICAgIHRoaXMuZW50aXR5TWFuYWdlci5yZWdpc3RlckNvbXBvbmVudChDT01QT05FTlQuVFJBTlNGT1JNLCAge3g6IDAsIHk6IDAsIHo6IDB9KVxuICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIucmVnaXN0ZXJDb21wb25lbnQoQ09NUE9ORU5ULkFQUEVBUkFOQ0UsIHtpZDogMH0pXG4gICAgfVxuICAgIFxuICAgIGluaXRTeXN0ZW1zKCkge1xuICAgICAgICBjb25zdCByZW5kZXJDb21wb25lbnRzID0gW1xuICAgICAgICAgICAgQ09NUE9ORU5ULlRSQU5TRk9STSxcbiAgICAgICAgICAgIENPTVBPTkVOVC5BUFBFQVJBTkNFXG4gICAgICAgIF1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHJlbmRlciA9IChlbnRpdGllcywge3JlbmRlck1hbmFnZXJ9KSA9PiB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHtlbnRpdHl9IG9mIGVudGl0aWVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qge2FwcGVhcmFuY2UsIHRyYW5zZm9ybX0gPSBlbnRpdHlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCBvYmogPSByZW5kZXJNYW5hZ2VyLnNjZW5lLmdldE9iamVjdEJ5SWQoYXBwZWFyYW5jZS5pZClcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAob2JqID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgb2JqLnBvc2l0aW9uLnggPSB0cmFuc2Zvcm0ueFxuICAgICAgICAgICAgICAgIG9iai5wb3NpdGlvbi55ID0gdHJhbnNmb3JtLnlcbiAgICAgICAgICAgICAgICBvYmoucG9zaXRpb24ueiA9IHRyYW5zZm9ybS56XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXR5TWFuYWdlci5yZWdpc3RlclJlbmRlclN5c3RlbShyZW5kZXJDb21wb25lbnRzLCByZW5kZXIpXG4gICAgfVxuICAgIFxuICAgIGluaXRFbnRpdGllcyhwYXJzZWRTY2VuZSkge1xuICAgICAgICBwYXJzZWRTY2VuZS50cmF2ZXJzZSgob2JqKSA9PiB7XG5cdFx0ICAgIGxldCBjb25maWcgPSB0aGlzLmVudGl0eU1hbmFnZXIuYnVpbGQoKVxuXHRcdFx0ICAgIFxuXHRcdCAgICBjb25maWcud2l0aENvbXBvbmVudChDT01QT05FTlQuVFJBTlNGT1JNLCBmdW5jdGlvbigpIHtcblx0XHQgICAgICAgIHRoaXMueCA9IG9iai5wb3NpdGlvbi54XG5cdFx0ICAgICAgICB0aGlzLnkgPSBvYmoucG9zaXRpb24ueVxuXHRcdCAgICAgICAgdGhpcy56ID0gb2JqLnBvc2l0aW9uLnpcblx0ICAgICAgICB9KVxuXHQgICAgICAgIFxuXHQgICAgICAgIC8vdG9kbzogbWFrZSBvbmx5IHZpc2libGUgb2JqZWN0cyBnZXQgdGhpc1xuXHQgICAgICAgIGlmIChvYmouaWQgJiYgb2JqLnZpc2libGUpIHtcblx0ICAgICAgICAgICAgY29uZmlnLndpdGhDb21wb25lbnQoQ09NUE9ORU5ULkFQUEVBUkFOQ0UsIGZ1bmN0aW9uKCkge1xuICAgIFx0ICAgICAgICAgICB0aGlzLmlkID0gb2JqLmlkXG4gICAgXHQgICAgICAgIH0pXG5cdCAgICAgICAgfVxuXHQgICAgICAgIFxuXHQgICAgICAgIGNvbnN0IGNvbXBvbmVudHMgPSB0aGlzLmVudGl0eURhdGFbb2JqLnV1aWRdXG5cblx0XHRcdGlmIChjb21wb25lbnRzKSB7XHQgICAgICAgIFxuXHRcdFx0ICAgIE9iamVjdC5rZXlzKGNvbXBvbmVudHMpLmZvckVhY2goa2V5ID0+IHtcblx0ICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBjb21wb25lbnRzW2tleV1cblx0ICAgICAgICAgICAgICAgIFxuXHQgICAgICAgICAgICAgICAgY29uZmlnLndpdGhDb21wb25lbnQoa2V5LCBmdW5jdGlvbigpIHtcblx0XHQgICAgICAgICAgICAgICAgLy8gdG9kbyBoYW5kbGUgbm9uLW9iamVjdHNcblx0XHQgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaChrZXkgPT4ge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNba2V5XSA9PSBudWxsIHx8IGRhdGFba2V5XSA9PSBudWxsIHx8IHRoaXNba2V5XSA9PT0gZGF0YVtrZXldKSB7XG5cdFx0ICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG5cdFx0ICAgICAgICAgICAgICAgICAgICB9XG5cdFx0ICAgICAgICAgICAgICAgICAgICBcblx0XHQgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IGRhdGFba2V5XVxuXHRcdCAgICAgICAgICAgICAgICB9LCB0aGlzKVxuXHRcdCAgICAgICAgICAgIH0pXG5cdCAgICAgICAgICAgIH0sIHRoaXMpXG5cdFx0XHR9XG5cblx0XHRcdGNvbmZpZy5jcmVhdGUoMSlcblx0XHR9KVxuICAgIH1cbiAgICBcbiAgICBsb2FkKHtwcm9qZWN0LCBzY2VuZSwgY2FtZXJhfSkge1xuICAgICAgICBjb25zdCBwYXJzZWRTY2VuZSA9IHRoaXMubG9hZGVyLnBhcnNlKHNjZW5lKVxuICAgICAgICBjb25zdCBwYXJzZWRDYW1lcmEgPSB0aGlzLmxvYWRlci5wYXJzZShjYW1lcmEpXG5cdFx0XG5cdFx0dGhpcy5pbml0RW50aXRpZXMocGFyc2VkU2NlbmUpXG5cbiAgICBcdGlmIChwcm9qZWN0LnNoYWRvd3MpIHtcblx0XHRcdHRoaXMucmVuZGVyZXJNYW5hZ2VyLmVuYWJsZVNoYWRvd3MoKVxuXHRcdH1cblx0XHRcbiAgICBcdC8vdG9kbzogY2hlY2sgZm9yIGNhbWVyYSBhbmQgc2NlbmUgZmlyc3Q/IHRocm93IGlmIG5vdD9cbiAgICBcdHRoaXMucmVuZGVyZXJNYW5hZ2VyLnNldFNjZW5lKHBhcnNlZFNjZW5lKVxuICAgIFx0dGhpcy5yZW5kZXJlck1hbmFnZXIuc2V0Q2FtZXJhKHBhcnNlZENhbWVyYSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpXG5cdH1cbiAgICBcbiAgICBzZXRTaXplKHdpZHRoLCBoZWlnaHQpICB7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aFxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodFxuICAgICAgICBcbiAgICAgICAgdGhpcy5yZW5kZXJlck1hbmFnZXIuc2V0U2l6ZSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcbiAgICB9XG4gICAgXG4gICAgZ2V0RG9tKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJlck1hbmFnZXIuZ2V0RG9tKClcbiAgICB9XG4gICAgXG4gICAgcGxheSgpIHtcbiAgICAgICAgdGhpcy5sb29wTWFuYWdlci5zdGFydCgpXG4gICAgfVxuICAgIFxuICAgIHN0b3AoKSB7XG4gICAgICAgIHRoaXMubG9vcE1hbmFnZXIuc3RvcCgpXG4gICAgfVxufSJdLCJuYW1lcyI6WyJ0aGlzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUVBLE1BQU0sYUFBYSxDQUFDO0lBQ2hCLFdBQVcsR0FBRztRQUNWLElBQUksQ0FBQyxJQUFJLEVBQUU7S0FDZDs7SUFFRCxJQUFJLEdBQUc7UUFDSCxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksR0FBRyxFQUFFO1FBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQUU7S0FDakM7O0lBRUQsbUJBQW1CLENBQUMsRUFBRSxFQUFFLFdBQVcsRUFBRTtRQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ2xDLE1BQU0sU0FBUyxDQUFDLGdDQUFnQyxDQUFDO1NBQ3BEOztRQUVELElBQUksT0FBTyxXQUFXLEtBQUssVUFBVSxFQUFFO1lBQ25DLE1BQU0sU0FBUyxDQUFDLGlDQUFpQyxDQUFDO1NBQ3JEOztRQUVELElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUM7S0FDekM7O0lBRUQsS0FBSyxHQUFHO1FBQ0osSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBRTs7UUFFOUIsT0FBTyxJQUFJO0tBQ2Q7O0lBRUQsYUFBYSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUU7UUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksV0FBVyxJQUFJLENBQUMsRUFBRTtZQUNwRCxPQUFPLElBQUk7U0FDZDs7UUFFRCxJQUFJLE9BQU8sV0FBVyxLQUFLLFVBQVUsRUFBRTtZQUNuQyxXQUFXLEdB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Q0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FB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
