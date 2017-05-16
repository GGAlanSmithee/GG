(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define('GG', ['exports', 'three'], factory) :
	(factory((global.GG = global.GG || {}),global.THREE));
}(this, (function (exports,three) { 'use strict';

three = 'default' in three ? three['default'] : three;

class EntityFactory {
    constructor() {
        this.init();
    }
    
    init() {
        this.initializers  = new Map();
        this.configuration = new Map();
    }
    
    registerInitializer(id, initializer) {
        if (!Number.isInteger(id) || id <= 0) {
            throw TypeError('id must be a posetive integer.')
        }
        
        if (typeof initializer !== 'function') {
            throw TypeError('initializer must be a function.')
        }
        
        this.initializers.set(id, initializer);
    }
    
    build() {
        this.configuration = new Map();
        
        return this
    }
    
    withComponent(componentId, initializer) {
        if (!Number.isInteger(componentId) || componentId <= 0) {
            return this
        }
        
        if (typeof initializer !== 'function') {
            initializer = this.initializers.get(componentId);
        }
        
        this.configuration.set(componentId, initializer);
        
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
            configuration = this.configuration;
        }
        
        const components = Array.from(configuration.keys()).reduce((curr, next) => curr |= next, 0);
        
        let entities = [];
        
        for (let i = 0; i < count; ++i) {
            let { id, entity } = entityManager.newEntity(components);
            
            if (id >= entityManager.capacity) {
                break
            }
            
            for (let [component, initializer] of configuration) {
                if (typeof initializer !== 'function') {
                    continue
                }

                let result = initializer.call(entity[component]);
                
                if (typeof entity[component] !== 'object' && result !== undefined) {
                    entity[component] = result;
                }
            }
            
            entities.push({ id, entity });
        }
        
        return entities.length === 1 ? entities[0] : entities
    }
}

/**
 * This function adds one to its input.
 * @param {number} input any number
 * @returns {number} that number, plus one.
 */
class ComponentManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.components = new Map();
    }
    
    newComponent(componentId) {
        let component = this.components.get(componentId);
        
        if (component === null || component === undefined) {
            return null
        }
        
        switch (typeof component) {
            case 'function':
                return new component()
            case 'object'  : {
                return ((component) => {
                    let ret = {};
                    
                    Object.keys(component).forEach(key => ret[key] = component[key]);
                    
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
        
        const max = Math.max(...this.components.keys());
        
        const id = max === undefined || max === null || max === -Infinity ? 1 : max === 0 ? 1 : max * 2;

        this.components.set(id, component);

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
};

class SystemManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.logicSystems  = new Map();
        this.renderSystems = new Map();
        this.initSystems   = new Map();
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
        };
        
        const systemId = Math.max(0, ...this.logicSystems.keys(), ...this.renderSystems.keys(), ...this.initSystems.keys()) + 1;
        
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
        resolve();
    })
};

const promise = (callback, context, args, timeout) => {
    if (timeout) {
        return new Promise(resolve => {
            setTimeout(function(){
                resolve(typeof context ===  'object' ? callback.call(context, ...args) : callback.apply(context, ...args));
            }, timeout);
        })
    }
    
    return new Promise(resolve => {
        resolve(typeof context === 'object' ? callback.call(context, ...args) : callback.apply(context, ...args));
    })
};
    
class EventHandler {
    constructor() {
        this.init();
    }
    
    init() {
        this.events = new Map();
    }
    
    listen(event, callback) {
        if (typeof event !== 'string' || typeof callback !== 'function') {
            return
        }
        
        if (!this.events.has(event)) {
            this.events.set(event, new Map());
        }
        
        let eventId = -1;
        
        this.events.forEach(event => {
            eventId = Math.max(eventId, ...event.keys());
        });
        
        ++eventId;
        
        this.events.get(event).set(eventId, callback);
        
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
        let self = this instanceof EntityManager ? this.eventHandler : this;
        
        let args = Array.from(arguments);
        
        let [ event ] = args.splice(0, 1);
        
        if (typeof event !== 'string' || !self.events.has(event)) {
            return emptyPromise()
        }
        
        let promises = [];
        
        for (let callback of self.events.get(event).values()) {
            promises.push(promise(callback, this, args));
        }
        
        return Promise.all(promises)
    }
    
    triggerDelayed() {
        let self = this instanceof EntityManager ? this.eventHandler : this;
        
        let args = Array.from(arguments);
        
        let [ event, timeout ] = args.splice(0, 2);
        
        if (typeof event !== 'string' || !Number.isInteger(timeout) || !self.events.has(event)) {
            return emptyPromise()
        }
        
        let promises = [];
        
        for (let callback of self.events.get(event).values()) {
            promises.push(promise(callback, this, args, timeout));
        }
        
        return Promise.all(promises)
    }
}

class EntityManager {
    constructor(capacity = 1000) {
        this.init(capacity);
    }
    
    init(capacity) {
        this.capacity         = capacity;
        this.currentMaxEntity = -1;
        
        this.entityFactory    = new EntityFactory();
        this.systemManager    = new SystemManager();
        this.componentManager = new ComponentManager();
        this.eventHandler     = new EventHandler();
        
        this.entityConfigurations = new Map();
        this.componentLookup      = new Map();
        
        this.entities = Array.from({ length : this.capacity }, () => ({ components: 0 }));
    }
    
    increaseCapacity() {
        let oldCapacity = this.capacity;
        
        this.capacity *= 2;
        
        this.entities = [...this.entities, ...Array.from({ length : oldCapacity }, () => ({ components: 0 }))];

        for (let i = oldCapacity; i < this.capacity; ++i) {
            let entity = this.entities[i];
            
            for (const componentId of this.componentManager.getComponents().keys()) {
                let componentName = null;
                
                for (let [key, value] of this.componentLookup.entries()) {
                    if (value === componentId) {
                        componentName = key;
                        
                        break
                    }
                }

                entity[componentId] = this.componentManager.newComponent(componentId);
                
                Object.defineProperty(entity, componentName, { get() { return this[componentId] }, configurable: true });
            }
        }
    }
    
    newEntity(components) {
        if (Array.isArray(components)) {
            components = Array.from(this.componentLookup).reduce((curr, next) => ['', curr[1] | next[1]], ['', 0])[1];
        }
        
        if (!Number.isInteger(components) || components <= 0) {
            return { id : this.capacity, entity : null }
        }
        
        let id = 0;
        
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
            this.currentMaxEntity = id;
        }
        
        this.entities[id].components = components;
        
        return { id, entity : this.entities[id] }
    }
    
    deleteEntity(id) {
        //todo add sanity check
        this.entities[id].components = 0;
        
        if (id < this.currentMaxEntity) {
            return
        }
        
        for (let i = id; i >= 0; --i) {
            if (this.entities[i].components !== 0) {
                this.currentMaxEntity = i;
                
                return
            }
        }

        this.currentMaxEntity = 0;
    }

    // Does not allow components to be anything other than a bitmask for performance reasons
    // This method will be called for every system for every loop (which might be as high as 60 / second)
    *getEntities(components = 0) {
        for (let id = 0; id <= this.currentMaxEntity; ++id) {
            if (components === 0 || (this.entities[id].components & components) === components) {
                yield { id, entity : this.entities[id] };
            }
        }
    }
    
    registerConfiguration() {
        const configurationId = Math.max(0, ...this.entityConfigurations.keys()) + 1;
        
        this.entityConfigurations.set(configurationId, this.entityFactory.createConfiguration());
        
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
        
        const componentId = this.componentManager.registerComponent(component);
        
        this.componentLookup.set(name, componentId);
        
        for (let entity of this.entities) {
            entity[componentId] = this.componentManager.newComponent(componentId);
            Object.defineProperty(entity, name, { get() { return this[componentId] }, configurable: true });
        }
        
        let initializer;

        switch (typeof component) {
            case 'function': initializer = component; break
            case 'object': {
                initializer = function() {
                    for (let key of Object.keys(component)) {
                        this[key] = component[key];
                    }
                };
            
                break
            }
            default: initializer = function() { return component }; break
        }
        
        this.entityFactory.registerInitializer(componentId, initializer);
        
        return componentId
    }
    
    addComponent(entityId, component) {
        if (typeof component === 'string') {
            this.entities[entityId].components |= this.componentLookup.get(component);
        } else {
            this.entities[entityId].components |= component;
        }
    }
    
    removeComponent(entityId, component) {
        if (typeof component === 'string') {
            this.entities[entityId].components &= ~this.componentLookup.get(component);
        } else {
            this.entities[entityId].components &= ~component;   
        }
    }
    
    // System Manager
    
    registerSystem(type, components, callback) {
        if (Array.isArray(components)) {
            components = Array.from(this.componentLookup).reduce((curr, next) => ['', curr[1] | next[1]], ['', 0])[1];
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
            system.callback.call(this, this.getEntities(system.components), opts);
        }
    }
    
    onRender(opts) {
        for (let system of this.systemManager.renderSystems.values()) {
            system.callback.call(this, this.getEntities(system.components), opts);
        }
    }

    onInit(opts) {
        for (let system of this.systemManager.initSystems.values()) {
            system.callback.call(this, this.getEntities(system.components), opts);
        }
    }
    
    // Entity Factory
    
    registerInitializer(component, initializer) {
        if (typeof component === 'string') {
            this.entityFactory.registerInitializer(this.componentLookup.get(component), initializer);
        } else {
            this.entityFactory.registerInitializer(component, initializer);
        }
    }
    
    build() {
        this.entityFactory.build();
        
        return this
    }
    
    withComponent(component, initializer) {
        if (typeof component === 'string') {
            this.entityFactory.withComponent(this.componentLookup.get(component), initializer);
        } else {
            this.entityFactory.withComponent(component, initializer);
        }
        
        return this
    }
    
    create(count, configurationId) {
        let configuration = undefined;
        
        if (Number.isInteger(configurationId) && configurationId > 0) {
            configuration = this.entityConfigurations.get(configurationId);
            
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

!function(a){function b(a){if(v=o(b),!(e+j>a)){for(d+=a-e,e=a,r(a,d),a>g+1e3&&(f=.25*h+.75*f,g=a,h=0),h++,i=0;d>=c;)if(s(c),d-=c,++i>=240){m=!0;break}t(d/c),u(f,m),m=!1;}}var c=1e3/60,d=0,e=0,f=60,g=0,h=0,i=0,j=0,k=!1,l=!1,m=!1,n="object"==typeof window?window:a,o=n.requestAnimationFrame||function(){var a=Date.now(),b,d;return function(e){return b=Date.now(),d=Math.max(0,c-(b-a)),a=b+d,setTimeout(function(){e(b+d);},d)}}(),p=n.cancelAnimationFrame||clearTimeout,q=function(){},r=q,s=q,t=q,u=q,v;a.MainLoop={getSimulationTimestep:function(){return c},setSimulationTimestep:function(a){return c=a,this},getFPS:function(){return f},getMaxAllowedFPS:function(){return 1e3/j},setMaxAllowedFPS:function(a){return"undefined"==typeof a&&(a=1/0),0===a?this.stop():j=1e3/a,this},resetFrameDelta:function(){var a=d;return d=0,a},setBegin:function(a){return r=a||r,this},setUpdate:function(a){return s=a||s,this},setDraw:function(a){return t=a||t,this},setEnd:function(a){return u=a||u,this},start:function(){return l||(l=!0,v=o(function(a){t(1),k=!0,e=a,g=a,h=0,v=o(b);})),this},stop:function(){return k=!1,l=!1,p(v),this},isRunning:function(){return k}},"function"==typeof undefined&&undefined.amd?undefined(a.MainLoop):"object"=='object'&&null!==module&&"object"=='object'&&(module.exports=a.MainLoop);}(commonjsGlobal);

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
                        var appearance = entity.appearance,
                            transform = entity.transform;


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
            var project = _ref2.project,
                scene = _ref2.scene,
                camera = _ref2.camera;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2cuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9lbnRpdHktZmFjdG9yeS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9jb21wb25lbnQtbWFuYWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9zeXN0ZW0tbWFuYWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9ldmVudC1oYW5kbGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL3NyYy9jb3JlL2VudGl0eS1tYW5hZ2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL21haW5sb29wLmpzL2J1aWxkL21haW5sb29wLm1pbi5qcyIsIi4uL3NyYy9sb2dpYy9tYWlubG9vcC1sb29wLW1hbmFnZXIuanMiLCIuLi9zcmMvbG9naWMvdGhyZWUtb2JqZWN0LW1lc2gtbG9hZGVyLmpzIiwiLi4vc3JjL3ZpZXcvdGhyZWUtcmVuZGVyZXItbWFuYWdlci5qcyIsIi4uL3NyYy9ESS9icm93c2VyLmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudGl0eU1hbmFnZXIgfSBmcm9tICcuL2VudGl0eS1tYW5hZ2VyJ1xuXG5jbGFzcyBFbnRpdHlGYWN0b3J5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pbml0KClcbiAgICB9XG4gICAgXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplcnMgID0gbmV3IE1hcCgpXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IG5ldyBNYXAoKVxuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckluaXRpYWxpemVyKGlkLCBpbml0aWFsaXplcikge1xuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoaWQpIHx8IGlkIDw9IDApIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignaWQgbXVzdCBiZSBhIHBvc2V0aXZlIGludGVnZXIuJylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdpbml0aWFsaXplciBtdXN0IGJlIGEgZnVuY3Rpb24uJylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5pbml0aWFsaXplcnMuc2V0KGlkLCBpbml0aWFsaXplcilcbiAgICB9XG4gICAgXG4gICAgYnVpbGQoKSB7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IG5ldyBNYXAoKVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgXG4gICAgd2l0aENvbXBvbmVudChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGNvbXBvbmVudElkKSB8fCBjb21wb25lbnRJZCA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGluaXRpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBpbml0aWFsaXplciA9IHRoaXMuaW5pdGlhbGl6ZXJzLmdldChjb21wb25lbnRJZClcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnNldChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGVDb25maWd1cmF0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uXG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZShlbnRpdHlNYW5hZ2VyLCBjb3VudCA9IDEsIGNvbmZpZ3VyYXRpb24gPSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCEoZW50aXR5TWFuYWdlciBpbnN0YW5jZW9mIEVudGl0eU1hbmFnZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gW11cbiAgICAgICAgfVxuICAgIFxuICAgICAgICBpZiAoY29uZmlndXJhdGlvbiA9PSBudWxsKSB7XG4gICAgICAgICAgICBjb25maWd1cmF0aW9uID0gdGhpcy5jb25maWd1cmF0aW9uXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudHMgPSBBcnJheS5mcm9tKGNvbmZpZ3VyYXRpb24ua2V5cygpKS5yZWR1Y2UoKGN1cnIsIG5leHQpID0+IGN1cnIgfD0gbmV4dCwgMClcbiAgICAgICAgXG4gICAgICAgIGxldCBlbnRpdGllcyA9IFtdXG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyArK2kpIHtcbiAgICAgICAgICAgIGxldCB7IGlkLCBlbnRpdHkgfSA9IGVudGl0eU1hbmFnZXIubmV3RW50aXR5KGNvbXBvbmVudHMpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChpZCA+PSBlbnRpdHlNYW5hZ2VyLmNhcGFjaXR5KSB7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgW2NvbXBvbmVudCwgaW5pdGlhbGl6ZXJdIG9mIGNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGluaXRpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGluaXRpYWxpemVyLmNhbGwoZW50aXR5W2NvbXBvbmVudF0pXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlbnRpdHlbY29tcG9uZW50XSAhPT0gJ29iamVjdCcgJiYgcmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5W2NvbXBvbmVudF0gPSByZXN1bHRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGVudGl0aWVzLnB1c2goeyBpZCwgZW50aXR5IH0pXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBlbnRpdGllcy5sZW5ndGggPT09IDEgPyBlbnRpdGllc1swXSA6IGVudGl0aWVzXG4gICAgfVxufVxuXG5leHBvcnQgeyBFbnRpdHlGYWN0b3J5IH1cbiIsIi8qKlxuICogVGhpcyBmdW5jdGlvbiBhZGRzIG9uZSB0byBpdHMgaW5wdXQuXG4gKiBAcGFyYW0ge251bWJlcn0gaW5wdXQgYW55IG51bWJlclxuICogQHJldHVybnMge251bWJlcn0gdGhhdCBudW1iZXIsIHBsdXMgb25lLlxuICovXG5jbGFzcyBDb21wb25lbnRNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pbml0KClcbiAgICB9XG4gICAgXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0gbmV3IE1hcCgpXG4gICAgfVxuICAgIFxuICAgIG5ld0NvbXBvbmVudChjb21wb25lbnRJZCkge1xuICAgICAgICBsZXQgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRzLmdldChjb21wb25lbnRJZClcbiAgICAgICAgXG4gICAgICAgIGlmIChjb21wb25lbnQgPT09IG51bGwgfHwgY29tcG9uZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHN3aXRjaCAodHlwZW9mIGNvbXBvbmVudCkge1xuICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgY29tcG9uZW50KClcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCcgIDoge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKGNvbXBvbmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmV0ID0ge31cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGNvbXBvbmVudCkuZm9yRWFjaChrZXkgPT4gcmV0W2tleV0gPSBjb21wb25lbnRba2V5XSlcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXRcbiAgICAgICAgICAgICAgICB9KShjb21wb25lbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICAgICAgaWYgKGNvbXBvbmVudCA9PT0gbnVsbCB8fCBjb21wb25lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjb21wb25lbnQgY2Fubm90IGJlIG51bGwgb3IgdW5kZWZpbmVkLicpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KC4uLnRoaXMuY29tcG9uZW50cy5rZXlzKCkpXG4gICAgICAgIFxuICAgICAgICBjb25zdCBpZCA9IG1heCA9PT0gdW5kZWZpbmVkIHx8IG1heCA9PT0gbnVsbCB8fCBtYXggPT09IC1JbmZpbml0eSA/IDEgOiBtYXggPT09IDAgPyAxIDogbWF4ICogMlxuXG4gICAgICAgIHRoaXMuY29tcG9uZW50cy5zZXQoaWQsIGNvbXBvbmVudClcblxuICAgICAgICByZXR1cm4gaWRcbiAgICB9XG4gICAgXG4gICAgZ2V0Q29tcG9uZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50c1xuICAgIH1cbn1cblxuZXhwb3J0IHsgQ29tcG9uZW50TWFuYWdlciB9XG4iLCJleHBvcnQgY29uc3QgU3lzdGVtVHlwZSA9IHtcbiAgICBMb2dpYyAgOiAwLFxuICAgIFJlbmRlciA6IDEsXG4gICAgSW5pdCAgIDogMlxufVxuXG5jbGFzcyBTeXN0ZW1NYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pbml0KClcbiAgICB9XG4gICAgXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5sb2dpY1N5c3RlbXMgID0gbmV3IE1hcCgpXG4gICAgICAgIHRoaXMucmVuZGVyU3lzdGVtcyA9IG5ldyBNYXAoKVxuICAgICAgICB0aGlzLmluaXRTeXN0ZW1zICAgPSBuZXcgTWFwKClcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJTeXN0ZW0odHlwZSwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGUgIT09IFN5c3RlbVR5cGUuTG9naWMgJiYgdHlwZSAhPT0gU3lzdGVtVHlwZS5SZW5kZXIgJiYgdHlwZSAhPT0gU3lzdGVtVHlwZS5Jbml0KSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ3R5cGUgbXVzdCBiZSBhIHZhbGlkIFN5c3RlbVR5cGUuJylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnRzICE9PSAnbnVtYmVyJykgIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignY29tcG9uZW50cyBtdXN0IGJlIGEgbnVtYmVyLicpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uLicpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHN5c3RlbSA9IHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMsXG4gICAgICAgICAgICBjYWxsYmFja1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzeXN0ZW1JZCA9IE1hdGgubWF4KDAsIC4uLnRoaXMubG9naWNTeXN0ZW1zLmtleXMoKSwgLi4udGhpcy5yZW5kZXJTeXN0ZW1zLmtleXMoKSwgLi4udGhpcy5pbml0U3lzdGVtcy5rZXlzKCkpICsgMVxuICAgICAgICBcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFN5c3RlbVR5cGUuTG9naWMgOiB0aGlzLmxvZ2ljU3lzdGVtcy5zZXQoc3lzdGVtSWQsIHN5c3RlbSk7IGJyZWFrXG4gICAgICAgICAgICBjYXNlIFN5c3RlbVR5cGUuUmVuZGVyIDogdGhpcy5yZW5kZXJTeXN0ZW1zLnNldChzeXN0ZW1JZCwgc3lzdGVtKTsgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgU3lzdGVtVHlwZS5Jbml0IDogdGhpcy5pbml0U3lzdGVtcy5zZXQoc3lzdGVtSWQsIHN5c3RlbSk7IGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBzeXN0ZW1JZFxuICAgIH1cbiAgICBcbiAgICByZW1vdmVTeXN0ZW0oc3lzdGVtSWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9naWNTeXN0ZW1zLmRlbGV0ZShzeXN0ZW1JZCkgfHwgdGhpcy5yZW5kZXJTeXN0ZW1zLmRlbGV0ZShzeXN0ZW1JZCkgfHwgdGhpcy5pbml0U3lzdGVtcy5kZWxldGUoc3lzdGVtSWQpXG4gICAgfVxufVxuXG5leHBvcnQgeyBTeXN0ZW1NYW5hZ2VyIH1cbiIsImltcG9ydCB7IEVudGl0eU1hbmFnZXIgfSBmcm9tICcuL2VudGl0eS1tYW5hZ2VyJ1xuXG5jb25zdCBlbXB0eVByb21pc2UgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICByZXNvbHZlKClcbiAgICB9KVxufVxuXG5jb25zdCBwcm9taXNlID0gKGNhbGxiYWNrLCBjb250ZXh0LCBhcmdzLCB0aW1lb3V0KSA9PiB7XG4gICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHlwZW9mIGNvbnRleHQgPT09ICAnb2JqZWN0JyA/IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgLi4uYXJncykgOiBjYWxsYmFjay5hcHBseShjb250ZXh0LCAuLi5hcmdzKSlcbiAgICAgICAgICAgIH0sIHRpbWVvdXQpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIFxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgcmVzb2x2ZSh0eXBlb2YgY29udGV4dCA9PT0gJ29iamVjdCcgPyBjYWxsYmFjay5jYWxsKGNvbnRleHQsIC4uLmFyZ3MpIDogY2FsbGJhY2suYXBwbHkoY29udGV4dCwgLi4uYXJncykpXG4gICAgfSlcbn1cbiAgICBcbmNsYXNzIEV2ZW50SGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW5pdCgpXG4gICAgfVxuICAgIFxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IE1hcCgpXG4gICAgfVxuICAgIFxuICAgIGxpc3RlbihldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKCF0aGlzLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5zZXQoZXZlbnQsIG5ldyBNYXAoKSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGV2ZW50SWQgPSAtMVxuICAgICAgICBcbiAgICAgICAgdGhpcy5ldmVudHMuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudElkID0gTWF0aC5tYXgoZXZlbnRJZCwgLi4uZXZlbnQua2V5cygpKVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgKytldmVudElkXG4gICAgICAgIFxuICAgICAgICB0aGlzLmV2ZW50cy5nZXQoZXZlbnQpLnNldChldmVudElkLCBjYWxsYmFjaylcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBldmVudElkXG4gICAgfVxuICAgIFxuICAgIHN0b3BMaXN0ZW4oZXZlbnRJZCkge1xuICAgICAgICBmb3IgKGxldCBldmVudHMgb2YgdGhpcy5ldmVudHMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGlkIG9mIGV2ZW50cy5rZXlzKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaWQgPT09IGV2ZW50SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50cy5kZWxldGUoZXZlbnRJZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlcigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlciA/IHRoaXMuZXZlbnRIYW5kbGVyIDogdGhpc1xuICAgICAgICBcbiAgICAgICAgbGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cylcbiAgICAgICAgXG4gICAgICAgIGxldCBbIGV2ZW50IF0gPSBhcmdzLnNwbGljZSgwLCAxKVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgIXNlbGYuZXZlbnRzLmhhcyhldmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBlbXB0eVByb21pc2UoKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXVxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY2FsbGJhY2sgb2Ygc2VsZi5ldmVudHMuZ2V0KGV2ZW50KS52YWx1ZXMoKSkge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChwcm9taXNlKGNhbGxiYWNrLCB0aGlzLCBhcmdzKSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKVxuICAgIH1cbiAgICBcbiAgICB0cmlnZ2VyRGVsYXllZCgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlciA/IHRoaXMuZXZlbnRIYW5kbGVyIDogdGhpc1xuICAgICAgICBcbiAgICAgICAgbGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cylcbiAgICAgICAgXG4gICAgICAgIGxldCBbIGV2ZW50LCB0aW1lb3V0IF0gPSBhcmdzLnNwbGljZSgwLCAyKVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgIU51bWJlci5pc0ludGVnZXIodGltZW91dCkgfHwgIXNlbGYuZXZlbnRzLmhhcyhldmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBlbXB0eVByb21pc2UoKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXVxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY2FsbGJhY2sgb2Ygc2VsZi5ldmVudHMuZ2V0KGV2ZW50KS52YWx1ZXMoKSkge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChwcm9taXNlKGNhbGxiYWNrLCB0aGlzLCBhcmdzLCB0aW1lb3V0KSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKVxuICAgIH1cbn1cblxuZXhwb3J0IHsgRXZlbnRIYW5kbGVyIH1cbiIsImltcG9ydCB7IEVudGl0eUZhY3RvcnkgfSAgICAgICAgICAgICBmcm9tICcuL2VudGl0eS1mYWN0b3J5J1xuaW1wb3J0IHsgQ29tcG9uZW50TWFuYWdlciB9ICAgICAgICAgIGZyb20gJy4vY29tcG9uZW50LW1hbmFnZXInXG5pbXBvcnQgeyBTeXN0ZW1NYW5hZ2VyLCBTeXN0ZW1UeXBlIH0gZnJvbSAnLi9zeXN0ZW0tbWFuYWdlcidcbmltcG9ydCB7IEV2ZW50SGFuZGxlciB9ICAgICAgICAgICAgICBmcm9tICcuL2V2ZW50LWhhbmRsZXInXG5cbmNsYXNzIEVudGl0eU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKGNhcGFjaXR5ID0gMTAwMCkge1xuICAgICAgICB0aGlzLmluaXQoY2FwYWNpdHkpXG4gICAgfVxuICAgIFxuICAgIGluaXQoY2FwYWNpdHkpIHtcbiAgICAgICAgdGhpcy5jYXBhY2l0eSAgICAgICAgID0gY2FwYWNpdHlcbiAgICAgICAgdGhpcy5jdXJyZW50TWF4RW50aXR5ID0gLTFcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeSAgICA9IG5ldyBFbnRpdHlGYWN0b3J5KClcbiAgICAgICAgdGhpcy5zeXN0ZW1NYW5hZ2VyICAgID0gbmV3IFN5c3RlbU1hbmFnZXIoKVxuICAgICAgICB0aGlzLmNvbXBvbmVudE1hbmFnZXIgPSBuZXcgQ29tcG9uZW50TWFuYWdlcigpXG4gICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyICAgICA9IG5ldyBFdmVudEhhbmRsZXIoKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlDb25maWd1cmF0aW9ucyA9IG5ldyBNYXAoKVxuICAgICAgICB0aGlzLmNvbXBvbmVudExvb2t1cCAgICAgID0gbmV3IE1hcCgpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0aWVzID0gQXJyYXkuZnJvbSh7IGxlbmd0aCA6IHRoaXMuY2FwYWNpdHkgfSwgKCkgPT4gKHsgY29tcG9uZW50czogMCB9KSlcbiAgICB9XG4gICAgXG4gICAgaW5jcmVhc2VDYXBhY2l0eSgpIHtcbiAgICAgICAgbGV0IG9sZENhcGFjaXR5ID0gdGhpcy5jYXBhY2l0eVxuICAgICAgICBcbiAgICAgICAgdGhpcy5jYXBhY2l0eSAqPSAyXG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0aWVzID0gWy4uLnRoaXMuZW50aXRpZXMsIC4uLkFycmF5LmZyb20oeyBsZW5ndGggOiBvbGRDYXBhY2l0eSB9LCAoKSA9PiAoeyBjb21wb25lbnRzOiAwIH0pKV1cblxuICAgICAgICBmb3IgKGxldCBpID0gb2xkQ2FwYWNpdHk7IGkgPCB0aGlzLmNhcGFjaXR5OyArK2kpIHtcbiAgICAgICAgICAgIGxldCBlbnRpdHkgPSB0aGlzLmVudGl0aWVzW2ldXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAoY29uc3QgY29tcG9uZW50SWQgb2YgdGhpcy5jb21wb25lbnRNYW5hZ2VyLmdldENvbXBvbmVudHMoKS5rZXlzKCkpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50TmFtZSA9IG51bGxcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2YgdGhpcy5jb21wb25lbnRMb29rdXAuZW50cmllcygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gY29tcG9uZW50SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudE5hbWUgPSBrZXlcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVudGl0eVtjb21wb25lbnRJZF0gPSB0aGlzLmNvbXBvbmVudE1hbmFnZXIubmV3Q29tcG9uZW50KGNvbXBvbmVudElkKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbnRpdHksIGNvbXBvbmVudE5hbWUsIHsgZ2V0KCkgeyByZXR1cm4gdGhpc1tjb21wb25lbnRJZF0gfSwgY29uZmlndXJhYmxlOiB0cnVlIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbmV3RW50aXR5KGNvbXBvbmVudHMpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29tcG9uZW50cykpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMgPSBBcnJheS5mcm9tKHRoaXMuY29tcG9uZW50TG9va3VwKS5yZWR1Y2UoKGN1cnIsIG5leHQpID0+IFsnJywgY3VyclsxXSB8IG5leHRbMV1dLCBbJycsIDBdKVsxXVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoY29tcG9uZW50cykgfHwgY29tcG9uZW50cyA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4geyBpZCA6IHRoaXMuY2FwYWNpdHksIGVudGl0eSA6IG51bGwgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgaWQgPSAwXG4gICAgICAgIFxuICAgICAgICBmb3IgKDsgaWQgPCB0aGlzLmNhcGFjaXR5OyArK2lkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tpZF0uY29tcG9uZW50cyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChpZCA+PSB0aGlzLmNhcGFjaXR5KSB7XG4gICAgICAgICAgICAvLyB0b2RvOiBhdXRvIGluY3JlYXNlIGNhcGFjaXR5P1xuICAgICAgICAgICAgcmV0dXJuIHsgaWQgOiB0aGlzLmNhcGFjaXR5LCBlbnRpdHkgOiBudWxsIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSBpZFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzID0gY29tcG9uZW50c1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHsgaWQsIGVudGl0eSA6IHRoaXMuZW50aXRpZXNbaWRdIH1cbiAgICB9XG4gICAgXG4gICAgZGVsZXRlRW50aXR5KGlkKSB7XG4gICAgICAgIC8vdG9kbyBhZGQgc2FuaXR5IGNoZWNrXG4gICAgICAgIHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMgPSAwXG4gICAgICAgIFxuICAgICAgICBpZiAoaWQgPCB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gaWQ7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tpXS5jb21wb25lbnRzICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TWF4RW50aXR5ID0gaVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdXJyZW50TWF4RW50aXR5ID0gMFxuICAgIH1cblxuICAgIC8vIERvZXMgbm90IGFsbG93IGNvbXBvbmVudHMgdG8gYmUgYW55dGhpbmcgb3RoZXIgdGhhbiBhIGJpdG1hc2sgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnNcbiAgICAvLyBUaGlzIG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBmb3IgZXZlcnkgc3lzdGVtIGZvciBldmVyeSBsb29wICh3aGljaCBtaWdodCBiZSBhcyBoaWdoIGFzIDYwIC8gc2Vjb25kKVxuICAgICpnZXRFbnRpdGllcyhjb21wb25lbnRzID0gMCkge1xuICAgICAgICBmb3IgKGxldCBpZCA9IDA7IGlkIDw9IHRoaXMuY3VycmVudE1heEVudGl0eTsgKytpZCkge1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudHMgPT09IDAgfHwgKHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMgJiBjb21wb25lbnRzKSA9PT0gY29tcG9uZW50cykge1xuICAgICAgICAgICAgICAgIHlpZWxkIHsgaWQsIGVudGl0eSA6IHRoaXMuZW50aXRpZXNbaWRdIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckNvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZ3VyYXRpb25JZCA9IE1hdGgubWF4KDAsIC4uLnRoaXMuZW50aXR5Q29uZmlndXJhdGlvbnMua2V5cygpKSArIDFcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXR5Q29uZmlndXJhdGlvbnMuc2V0KGNvbmZpZ3VyYXRpb25JZCwgdGhpcy5lbnRpdHlGYWN0b3J5LmNyZWF0ZUNvbmZpZ3VyYXRpb24oKSlcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBjb25maWd1cmF0aW9uSWRcbiAgICB9XG4gICAgXG4gICAgLy8gQ29tcG9uZW50IE1hbmFnZXJcbiAgICBcbiAgICByZWdpc3RlckNvbXBvbmVudChuYW1lLCBjb21wb25lbnQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJyB8fCBuYW1lLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCduYW1lIG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nLicpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudExvb2t1cC5nZXQobmFtZSkgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudElkID0gdGhpcy5jb21wb25lbnRNYW5hZ2VyLnJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudClcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY29tcG9uZW50TG9va3VwLnNldChuYW1lLCBjb21wb25lbnRJZClcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGVudGl0eSBvZiB0aGlzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICBlbnRpdHlbY29tcG9uZW50SWRdID0gdGhpcy5jb21wb25lbnRNYW5hZ2VyLm5ld0NvbXBvbmVudChjb21wb25lbnRJZClcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbnRpdHksIG5hbWUsIHsgZ2V0KCkgeyByZXR1cm4gdGhpc1tjb21wb25lbnRJZF0gfSwgY29uZmlndXJhYmxlOiB0cnVlIH0pXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBpbml0aWFsaXplclxuXG4gICAgICAgIHN3aXRjaCAodHlwZW9mIGNvbXBvbmVudCkge1xuICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOiBpbml0aWFsaXplciA9IGNvbXBvbmVudDsgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6IHtcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMoY29tcG9uZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gY29tcG9uZW50W2tleV1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OiBpbml0aWFsaXplciA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29tcG9uZW50IH07IGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS5yZWdpc3RlckluaXRpYWxpemVyKGNvbXBvbmVudElkLCBpbml0aWFsaXplcilcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBjb21wb25lbnRJZFxuICAgIH1cbiAgICBcbiAgICBhZGRDb21wb25lbnQoZW50aXR5SWQsIGNvbXBvbmVudCkge1xuICAgICAgICBpZiAodHlwZW9mIGNvbXBvbmVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuZW50aXRpZXNbZW50aXR5SWRdLmNvbXBvbmVudHMgfD0gdGhpcy5jb21wb25lbnRMb29rdXAuZ2V0KGNvbXBvbmVudClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZW50aXRpZXNbZW50aXR5SWRdLmNvbXBvbmVudHMgfD0gY29tcG9uZW50XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmVtb3ZlQ29tcG9uZW50KGVudGl0eUlkLCBjb21wb25lbnQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eUlkXS5jb21wb25lbnRzICY9IH50aGlzLmNvbXBvbmVudExvb2t1cC5nZXQoY29tcG9uZW50KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0uY29tcG9uZW50cyAmPSB+Y29tcG9uZW50ICAgXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gU3lzdGVtIE1hbmFnZXJcbiAgICBcbiAgICByZWdpc3RlclN5c3RlbSh0eXBlLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjb21wb25lbnRzKSkge1xuICAgICAgICAgICAgY29tcG9uZW50cyA9IEFycmF5LmZyb20odGhpcy5jb21wb25lbnRMb29rdXApLnJlZHVjZSgoY3VyciwgbmV4dCkgPT4gWycnLCBjdXJyWzFdIHwgbmV4dFsxXV0sIFsnJywgMF0pWzFdXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVnaXN0ZXJTeXN0ZW0odHlwZSwgY29tcG9uZW50cywgY2FsbGJhY2spXG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyTG9naWNTeXN0ZW0oY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXJTeXN0ZW0oU3lzdGVtVHlwZS5Mb2dpYywgY29tcG9uZW50cywgY2FsbGJhY2spXG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyUmVuZGVyU3lzdGVtKGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyU3lzdGVtKFN5c3RlbVR5cGUuUmVuZGVyLCBjb21wb25lbnRzLCBjYWxsYmFjaylcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJJbml0U3lzdGVtKGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZ2lzdGVyU3lzdGVtKFN5c3RlbVR5cGUuSW5pdCwgY29tcG9uZW50cywgY2FsbGJhY2spXG4gICAgfVxuICAgIFxuICAgIHJlbW92ZVN5c3RlbShzeXN0ZW1JZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlbW92ZVN5c3RlbShzeXN0ZW1JZClcbiAgICB9XG4gICAgXG4gICAgb25Mb2dpYyhvcHRzKSB7XG4gICAgICAgIGZvciAobGV0IHN5c3RlbSBvZiB0aGlzLnN5c3RlbU1hbmFnZXIubG9naWNTeXN0ZW1zLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBzeXN0ZW0uY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLmdldEVudGl0aWVzKHN5c3RlbS5jb21wb25lbnRzKSwgb3B0cylcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvblJlbmRlcihvcHRzKSB7XG4gICAgICAgIGZvciAobGV0IHN5c3RlbSBvZiB0aGlzLnN5c3RlbU1hbmFnZXIucmVuZGVyU3lzdGVtcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgc3lzdGVtLmNhbGxiYWNrLmNhbGwodGhpcywgdGhpcy5nZXRFbnRpdGllcyhzeXN0ZW0uY29tcG9uZW50cyksIG9wdHMpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkluaXQob3B0cykge1xuICAgICAgICBmb3IgKGxldCBzeXN0ZW0gb2YgdGhpcy5zeXN0ZW1NYW5hZ2VyLmluaXRTeXN0ZW1zLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBzeXN0ZW0uY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLmdldEVudGl0aWVzKHN5c3RlbS5jb21wb25lbnRzKSwgb3B0cylcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBFbnRpdHkgRmFjdG9yeVxuICAgIFxuICAgIHJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50LCBpbml0aWFsaXplcikge1xuICAgICAgICBpZiAodHlwZW9mIGNvbXBvbmVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS5yZWdpc3RlckluaXRpYWxpemVyKHRoaXMuY29tcG9uZW50TG9va3VwLmdldChjb21wb25lbnQpLCBpbml0aWFsaXplcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS5yZWdpc3RlckluaXRpYWxpemVyKGNvbXBvbmVudCwgaW5pdGlhbGl6ZXIpXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgYnVpbGQoKSB7XG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS5idWlsZCgpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBcbiAgICB3aXRoQ29tcG9uZW50KGNvbXBvbmVudCwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eUZhY3Rvcnkud2l0aENvbXBvbmVudCh0aGlzLmNvbXBvbmVudExvb2t1cC5nZXQoY29tcG9uZW50KSwgaW5pdGlhbGl6ZXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eUZhY3Rvcnkud2l0aENvbXBvbmVudChjb21wb25lbnQsIGluaXRpYWxpemVyKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGUoY291bnQsIGNvbmZpZ3VyYXRpb25JZCkge1xuICAgICAgICBsZXQgY29uZmlndXJhdGlvbiA9IHVuZGVmaW5lZFxuICAgICAgICBcbiAgICAgICAgaWYgKE51bWJlci5pc0ludGVnZXIoY29uZmlndXJhdGlvbklkKSAmJiBjb25maWd1cmF0aW9uSWQgPiAwKSB7XG4gICAgICAgICAgICBjb25maWd1cmF0aW9uID0gdGhpcy5lbnRpdHlDb25maWd1cmF0aW9ucy5nZXQoY29uZmlndXJhdGlvbklkKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoY29uZmlndXJhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIGVudGl0eSBjb25maWd1cmF0aW9uLiBJZiB5b3Ugd2lzaCB0byBjcmVhdGUgZW50aXRpZXMgd2l0aG91dCBhIGNvbmZpZ3VyYXRpb24sIGRvIG5vdCBwYXNzIGEgY29uZmlndXJhdGlvbklkLicpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLmVudGl0eUZhY3RvcnkuY3JlYXRlKHRoaXMsIGNvdW50LCBjb25maWd1cmF0aW9uKVxuICAgIH1cbiAgICBcbiAgICAvLyBFdmVudCBIYW5kbGVyXG4gICAgXG4gICAgbGlzdGVuKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIubGlzdGVuKGV2ZW50LCBjYWxsYmFjaylcbiAgICB9XG4gICAgXG4gICAgc3RvcExpc3RlbihldmVudElkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci5zdG9wTGlzdGVuKGV2ZW50SWQpXG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyLmNhbGwodGhpcywgLi4uYXJndW1lbnRzKVxuICAgIH1cbiAgICBcbiAgICB0cmlnZ2VyRGVsYXllZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLnRyaWdnZXJEZWxheWVkLmNhbGwodGhpcywgLi4uYXJndW1lbnRzKVxuICAgIH1cbn1cblxuZXhwb3J0IHsgRW50aXR5TWFuYWdlciB9XG4iLCIvKipcbiAqIG1haW5sb29wLmpzIDEuMC4zLTIwMTYwMzIwXG4gKlxuICogQGF1dGhvciBJc2FhYyBTdWtpbiAoaHR0cDovL3d3dy5pc2FhY3N1a2luLmNvbS8pXG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuXG4hZnVuY3Rpb24oYSl7ZnVuY3Rpb24gYihhKXtpZih2PW8oYiksIShlK2o+YSkpe2ZvcihkKz1hLWUsZT1hLHIoYSxkKSxhPmcrMWUzJiYoZj0uMjUqaCsuNzUqZixnPWEsaD0wKSxoKyssaT0wO2Q+PWM7KWlmKHMoYyksZC09YywrK2k+PTI0MCl7bT0hMDticmVha310KGQvYyksdShmLG0pLG09ITF9fXZhciBjPTFlMy82MCxkPTAsZT0wLGY9NjAsZz0wLGg9MCxpPTAsaj0wLGs9ITEsbD0hMSxtPSExLG49XCJvYmplY3RcIj09dHlwZW9mIHdpbmRvdz93aW5kb3c6YSxvPW4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHxmdW5jdGlvbigpe3ZhciBhPURhdGUubm93KCksYixkO3JldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gYj1EYXRlLm5vdygpLGQ9TWF0aC5tYXgoMCxjLShiLWEpKSxhPWIrZCxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZShiK2QpfSxkKX19KCkscD1uLmNhbmNlbEFuaW1hdGlvbkZyYW1lfHxjbGVhclRpbWVvdXQscT1mdW5jdGlvbigpe30scj1xLHM9cSx0PXEsdT1xLHY7YS5NYWluTG9vcD17Z2V0U2ltdWxhdGlvblRpbWVzdGVwOmZ1bmN0aW9uKCl7cmV0dXJuIGN9LHNldFNpbXVsYXRpb25UaW1lc3RlcDpmdW5jdGlvbihhKXtyZXR1cm4gYz1hLHRoaXN9LGdldEZQUzpmdW5jdGlvbigpe3JldHVybiBmfSxnZXRNYXhBbGxvd2VkRlBTOmZ1bmN0aW9uKCl7cmV0dXJuIDFlMy9qfSxzZXRNYXhBbGxvd2VkRlBTOmZ1bmN0aW9uKGEpe3JldHVyblwidW5kZWZpbmVkXCI9PXR5cGVvZiBhJiYoYT0xLzApLDA9PT1hP3RoaXMuc3RvcCgpOmo9MWUzL2EsdGhpc30scmVzZXRGcmFtZURlbHRhOmZ1bmN0aW9uKCl7dmFyIGE9ZDtyZXR1cm4gZD0wLGF9LHNldEJlZ2luOmZ1bmN0aW9uKGEpe3JldHVybiByPWF8fHIsdGhpc30sc2V0VXBkYXRlOmZ1bmN0aW9uKGEpe3JldHVybiBzPWF8fHMsdGhpc30sc2V0RHJhdzpmdW5jdGlvbihhKXtyZXR1cm4gdD1hfHx0LHRoaXN9LHNldEVuZDpmdW5jdGlvbihhKXtyZXR1cm4gdT1hfHx1LHRoaXN9LHN0YXJ0OmZ1bmN0aW9uKCl7cmV0dXJuIGx8fChsPSEwLHY9byhmdW5jdGlvbihhKXt0KDEpLGs9ITAsZT1hLGc9YSxoPTAsdj1vKGIpfSkpLHRoaXN9LHN0b3A6ZnVuY3Rpb24oKXtyZXR1cm4gaz0hMSxsPSExLHAodiksdGhpc30saXNSdW5uaW5nOmZ1bmN0aW9uKCl7cmV0dXJuIGt9fSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGEuTWFpbkxvb3ApOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm51bGwhPT1tb2R1bGUmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUuZXhwb3J0cyYmKG1vZHVsZS5leHBvcnRzPWEuTWFpbkxvb3ApfSh0aGlzKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1haW5sb29wLm1pbi5qcy5tYXAiLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgTWFpbkxvb3AgZnJvbSAnbWFpbmxvb3AuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5Mb29wTG9vcE1hbmFnZXIge1xuICAgIC8vIHNldFVwZGF0ZSh1cGRhdGVNZXRob2QgOiAoZGVsdGEgOiBudW1iZXIpID0+IHZvaWQpIDogTWFpbkxvb3BMb29wTWFuYWdlciB7XG4gICAgc2V0VXBkYXRlKHVwZGF0ZU1ldGhvZCkge1xuICAgICAgICBNYWluTG9vcC5zZXRVcGRhdGUodXBkYXRlTWV0aG9kKVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgXG4gICAgc2V0UmVuZGVyKHJlbmRlck1ldGhvZCA6IChpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSA6IG51bWJlcikgPT4gdm9pZCkgOiBNYWluTG9vcExvb3BNYW5hZ2VyIHtcbiAgICAgICAgTWFpbkxvb3Auc2V0RHJhdyhyZW5kZXJNZXRob2QpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBcbiAgICBzdGFydCgpIDogdm9pZCB7XG4gICAgICAgIE1haW5Mb29wLnN0YXJ0KClcbiAgICB9XG4gICAgXG4gICAgc3RvcCgpIDogdm9pZCB7XG4gICAgICAgIE1haW5Mb29wLnN0b3AoKVxuICAgIH1cbn0iLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgdGhyZWUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaHJlZU9iamVjdE1lc2hMb2FkZXIge1xuICAgIGxvYWRlciAgOiB0aHJlZS5PYmplY3RMb2FkZXI7XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubG9hZGVyICA9IG5ldyB0aHJlZS5PYmplY3RMb2FkZXIoKTtcbiAgICB9XG4gICAgXG4gICAgb25Qcm9ncmVzcygpIHtcbiAgICAgICAgLy8gcGxhY2Vob2xkZXJcbiAgICB9XG4gICAgXG4gICAgcGFyc2UoanNvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2FkZXIucGFyc2UoanNvbilcbiAgICB9XG4gICAgXG4gICAgLy8gdG9kbyB0aGlzIG5vdyByZXR1cm5zIGEgc2NlbmUuLiBpbXBsaWNhdGlvbnM/XG4gICAgLy8gdG9kbyBhZGQgb3B0aW9ucyBhcyBhIGRlc3RydWN0YWJsZSBvYmplY3QgLT4gc3RvcHBlZCBieSBmbG93OiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svZmxvdy9pc3N1ZXMvMTgzXG4gICAgbG9hZChwYXRoIDogc3RyaW5nLCBvcHRpb25zPyA6IE9iamVjdCkgOiBQcm9taXNlIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzaGFkaW5nID0gKG9wdGlvbnMgfHwgeyB9KS5zaGFkaW5nO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgc2VsZi5sb2FkZXIubG9hZChwYXRoLCBvYmogPT4gcmVzb2x2ZShvYmopLCBpbmZvID0+IHNlbGYub25Qcm9ncmVzcyhpbmZvKSwgZXJyID0+IHJlamVjdChlcnIpKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbihtZXNoID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2hhZGluZyAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWVzaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbWVzaC50cmF2ZXJzZShjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgdGhyZWUuTWVzaCkge1xuICAgICAgICAgICAgICAgICAgIGNoaWxkLm1hdGVyaWFsLnNoYWRpbmcgPSBzaGFkaW5nO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBtZXNoO1xuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cbn0iLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgdGhyZWUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaHJlZVJlbmRlcmVyTWFuYWdlciB7XG4gICAgcmVuZGVyZXIgICAgIDogdGhyZWUuV2ViR0xSZW5kZXJlcjtcbiAgICBjYW1lcmEgICAgICAgOiB0aHJlZS5DYW1lcmE7XG4gICAgLy8gZ2VvbWV0cmllcyAgIDogTWFwPHN0cmluZywgdGhyZWUuR2VvbWV0cnk+O1xuICAgIC8vIG1hdGVyaWFscyAgICA6IE1hcDxzdHJpbmcsIHRocmVlLk1hdGVyaWFsPjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyB0aHJlZS5XZWJHTFJlbmRlcmVyKHsgYW50aWFsaWFzIDogdHJ1ZSB9KTtcblx0XHR0aGlzLnJlbmRlcmVyLnNldENsZWFyQ29sb3IoIDB4MDAwMDAwICk7XG5cdFx0dGhpcy5yZW5kZXJlci5zZXRQaXhlbFJhdGlvKCB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyApO1xuICAgIH1cbiAgICBcbiAgICBlbmFibGVTaGFkb3dzKCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gdHJ1ZVxuICAgIH1cbiAgICBcbiAgICBpc0Z1bGxTY3JlZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLl9mdWxsU2NyZWVuXG4gICAgfVxuICAgIFxuICAgIC8vdG9kbyBtYWtlIGludG8gZ2V0dGVyIC8gc2V0dGVyID9cbiAgICBzZXRTY2VuZShzY2VuZSkge1xuICAgICAgICB0aGlzLnNjZW5lID0gc2NlbmVcbiAgICB9XG4gICAgXG4gICAgc2V0Q2FtZXJhKGNhbWVyYSwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYVxuICAgIH1cbiAgICBcbiAgICBzZXRTaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRnVsbFNjcmVlbigpKSB7XG5cdFx0ICAgIHRoaXMuY2FtZXJhLmFzcGVjdCA9ICh3aWR0aCB8fCA1MDApIC8gKGhlaWdodCB8fCA1MDApXG4gICAgXHR9XG5cdFx0XG5cdFx0dGhpcy5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpXG5cdFx0XG5cdFx0aWYgKCF0aGlzLmlzRnVsbFNjcmVlbigpKSB7XG5cdCAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHdpZHRoIHx8IDUwMCwgaGVpZ2h0IHx8IDUwMClcblx0XHR9XG4gICAgfVxuICAgIFxuICAgIGdldERvbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudFxuICAgIH1cbiAgICBcbiAgICBnZXRTY2VuZSgpIDogdGhyZWUuU2NlbmUge1xuICAgICAgICByZXR1cm4gdGhpcy5zY2VuZTtcbiAgICB9XG4gICAgXG4gICAgZ2V0R2VvbWV0cnkoa2V5IDogc3RyaW5nKSA6IHRocmVlLkdlb21ldHJ5IHtcbiAgICAgICAgcmV0dXJuIGdlb21ldHJpZXMuZ2V0KGtleSk7XG4gICAgfVxuICAgIFxuICAgIGdldE1hdGVyaWFsKGtleSA6IHN0cmluZykgOiB0aHJlZS5NYXRlcmlhbCB7XG4gICAgICAgIHJldHVybiBtYXRlcmlhbHMuZ2V0KGtleSk7XG4gICAgfVxuICAgIFxuICAgIGFkZE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKSB7XG4gICAgICAgIHZhciBnZW8gPSB0aGlzLmdlb21ldHJpZXMuZ2V0KGdlb21ldHJ5KTtcbiAgICAgICAgdmFyIG1hdCA9IHRoaXMubWF0ZXJpYWxzLmdldChtYXRlcmlhbCk7XG4gICAgICAgIHZhciBtZXNoID0gbmV3IHRocmVlLk1lc2goZ2VvLCBtYXQpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQobWVzaCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbWVzaDtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyKGludGVycG9sYXRpb25QZXJjZW50YWdlIDogbnVtYmVyKSA6IHZvaWQge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gICAgfVxuICAgIFxuICAgIC8vIHJlbmRlcihzY2VuZSA6IHRocmVlLlNjZW5lLCBpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSA6IG51bWJlcikgOiB2b2lkIHtcbiAgICAvLyAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoc2NlbmUsIHRoaXMuY2FtZXJhKTtcbiAgICAvLyB9XG59XG4iLCJpbXBvcnQge0VudGl0eU1hbmFnZXJ9ICAgICAgIGZyb20gJ2dnLWVudGl0aWVzJ1xuaW1wb3J0IE1haW5Mb29wTG9vcE1hbmFnZXIgICBmcm9tICcuLi9sb2dpYy9tYWlubG9vcC1sb29wLW1hbmFnZXInXG4vLyBpbXBvcnQgRmV0Y2hGaWxlTG9hZGVyICAgICAgIGZyb20gJy4uL2xvZ2ljL2ZldGNoLWZpbGUtbG9hZGVyJ1xuaW1wb3J0IFRocmVlT2JqZWN0TWVzaExvYWRlciBmcm9tICcuLi9sb2dpYy90aHJlZS1vYmplY3QtbWVzaC1sb2FkZXInXG5cbmltcG9ydCBUaHJlZVJlbmRlcmVyTWFuYWdlciBmcm9tICcuLi92aWV3L3RocmVlLXJlbmRlcmVyLW1hbmFnZXInXG5cbmNvbnN0IF9sb29wTWFuYWdlciAgICAgPSBuZXcgTWFpbkxvb3BMb29wTWFuYWdlcigpXG4vLyBjb25zdCBfZmlsZUxvYWRlciAgICAgID0gbmV3IEZldGNoRmlsZUxvYWRlcigpXG5jb25zdCBfbG9hZGVyICAgICAgICAgID0gbmV3IFRocmVlT2JqZWN0TWVzaExvYWRlcigpXG5jb25zdCBfcmVuZGVyZXJNYW5hZ2VyID0gbmV3IFRocmVlUmVuZGVyZXJNYW5hZ2VyKClcbmNvbnN0IF9lbnRpdHlNYW5hZ2VyICAgPSBuZXcgRW50aXR5TWFuYWdlcigpXG5cbmNvbnN0IGxvb3BNYW5hZ2VyICAgICA9ICgpID0+IF9sb29wTWFuYWdlclxuLy8gY29uc3QgZmlsZUxvYWRlciAgICAgID0gKCkgPT4gX2ZpbGVMb2FkZXJcbmNvbnN0IGxvYWRlciAgICAgICAgICA9ICgpID0+IF9sb2FkZXJcbmNvbnN0IHJlbmRlcmVyTWFuYWdlciA9ICgpID0+IF9yZW5kZXJlck1hbmFnZXJcbmNvbnN0IGVudGl0eU1hbmFnZXIgICA9ICgpID0+IF9lbnRpdHlNYW5hZ2VyXG5cbmV4cG9ydCBkZWZhdWx0IHtsb29wTWFuYWdlciwgbG9hZGVyLCByZW5kZXJlck1hbmFnZXIsIGVudGl0eU1hbmFnZXJ9XG5leHBvcnQge2xvb3BNYW5hZ2VyLCBsb2FkZXIsIHJlbmRlcmVyTWFuYWdlciwgZW50aXR5TWFuYWdlcn0iLCIvLyAvKiBAZmxvdyAqL1xuXG4vLyB0b2RvIG1ha2UgREkgbm90IGJlIGhhcmRjb2RlZFxuaW1wb3J0IERJIGZyb20gJy4vREkvYnJvd3NlcidcblxuY29uc3QgQ09NUE9ORU5UID0ge1xuICAgIFRSQU5TRk9STTogJ3RyYW5zZm9ybScsXG4gICAgQVBQRUFSQU5DRTogJ2FwcGVhcmFuY2UnXG59XG5cbmV4cG9ydCBjbGFzcyBHRyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgXHQvLyB3aWR0aCBhbmQgaGVpZ2h0IHNldCB0byA1MDAganVzdCB0byBoYXZlIGl0IGFzIGluIHRoZSBlZGl0b3IgZm9yIHRoZSB0aW1lIGJlaW5nXG4gICAgXHR0aGlzLndpZHRoICA9IDUwMFxuICAgIFx0dGhpcy5oZWlnaHQgPSA1MDBcblxuICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIgICA9IERJLmVudGl0eU1hbmFnZXIoKVxuICAgICAgICB0aGlzLmxvb3BNYW5hZ2VyICAgICA9IERJLmxvb3BNYW5hZ2VyKClcbiAgICAgICAgdGhpcy5yZW5kZXJlck1hbmFnZXIgPSBESS5yZW5kZXJlck1hbmFnZXIoKVxuICAgICAgICB0aGlzLmxvYWRlclx0XHRcdCA9IERJLmxvYWRlcigpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmRvbSA9IHRoaXMucmVuZGVyZXJNYW5hZ2VyLmdldERvbSgpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmluaXRDb21wb25lbnRzKClcbiAgICAgICAgdGhpcy5pbml0U3lzdGVtcygpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIub25Jbml0KHtyZW5kZXJNYW5hZ2VyOiB0aGlzLnJlbmRlcmVyTWFuYWdlcn0pXG4gICAgICAgIFxuICAgICAgICB0aGlzLmxvb3BNYW5hZ2VyLnNldFVwZGF0ZShkZWx0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIub25Mb2dpYyhkZWx0YSlcbiAgICAgICAgfSkuc2V0UmVuZGVyKGludGVycG9sYXRpb25QZXJjZW50YWdlID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5TWFuYWdlci5vblJlbmRlcih7ZGVsdGEgOiBpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSwgcmVuZGVyTWFuYWdlcjogdGhpcy5yZW5kZXJlck1hbmFnZXJ9KVxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlck1hbmFnZXIucmVuZGVyKGludGVycG9sYXRpb25QZXJjZW50YWdlKVxuICAgICAgICB9KVxuICAgIH1cbiAgICBcbiAgICBzZXRFbnRpdHlEYXRhKGVudGl0eURhdGEpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlEYXRhID0gZW50aXR5RGF0YVxuICAgIH1cblxuICAgIGluaXRDb21wb25lbnRzKCkge1xuICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIucmVnaXN0ZXJDb21wb25lbnQoQ09NUE9ORU5ULlRSQU5TRk9STSwgIHt4OiAwLCB5OiAwLCB6OiAwfSlcbiAgICAgICAgdGhpcy5lbnRpdHlNYW5hZ2VyLnJlZ2lzdGVyQ29tcG9uZW50KENPTVBPTkVOVC5BUFBFQVJBTkNFLCB7aWQ6IDB9KVxuICAgIH1cbiAgICBcbiAgICBpbml0U3lzdGVtcygpIHtcbiAgICAgICAgY29uc3QgcmVuZGVyQ29tcG9uZW50cyA9IFtcbiAgICAgICAgICAgIENPTVBPTkVOVC5UUkFOU0ZPUk0sXG4gICAgICAgICAgICBDT01QT05FTlQuQVBQRUFSQU5DRVxuICAgICAgICBdXG4gICAgICAgIFxuICAgICAgICBjb25zdCByZW5kZXIgPSAoZW50aXRpZXMsIHtyZW5kZXJNYW5hZ2VyfSkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB7ZW50aXR5fSBvZiBlbnRpdGllcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHthcHBlYXJhbmNlLCB0cmFuc2Zvcm19ID0gZW50aXR5XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3Qgb2JqID0gcmVuZGVyTWFuYWdlci5zY2VuZS5nZXRPYmplY3RCeUlkKGFwcGVhcmFuY2UuaWQpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIG9iai5wb3NpdGlvbi54ID0gdHJhbnNmb3JtLnhcbiAgICAgICAgICAgICAgICBvYmoucG9zaXRpb24ueSA9IHRyYW5zZm9ybS55XG4gICAgICAgICAgICAgICAgb2JqLnBvc2l0aW9uLnogPSB0cmFuc2Zvcm0uelxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIucmVnaXN0ZXJSZW5kZXJTeXN0ZW0ocmVuZGVyQ29tcG9uZW50cywgcmVuZGVyKVxuICAgIH1cbiAgICBcbiAgICBpbml0RW50aXRpZXMocGFyc2VkU2NlbmUpIHtcbiAgICAgICAgcGFyc2VkU2NlbmUudHJhdmVyc2UoKG9iaikgPT4ge1xuXHRcdCAgICBsZXQgY29uZmlnID0gdGhpcy5lbnRpdHlNYW5hZ2VyLmJ1aWxkKClcblx0XHRcdCAgICBcblx0XHQgICAgY29uZmlnLndpdGhDb21wb25lbnQoQ09NUE9ORU5ULlRSQU5TRk9STSwgZnVuY3Rpb24oKSB7XG5cdFx0ICAgICAgICB0aGlzLnggPSBvYmoucG9zaXRpb24ueFxuXHRcdCAgICAgICAgdGhpcy55ID0gb2JqLnBvc2l0aW9uLnlcblx0XHQgICAgICAgIHRoaXMueiA9IG9iai5wb3NpdGlvbi56XG5cdCAgICAgICAgfSlcblx0ICAgICAgICBcblx0ICAgICAgICAvL3RvZG86IG1ha2Ugb25seSB2aXNpYmxlIG9iamVjdHMgZ2V0IHRoaXNcblx0ICAgICAgICBpZiAob2JqLmlkICYmIG9iai52aXNpYmxlKSB7XG5cdCAgICAgICAgICAgIGNvbmZpZy53aXRoQ29tcG9uZW50KENPTVBPTkVOVC5BUFBFQVJBTkNFLCBmdW5jdGlvbigpIHtcbiAgICBcdCAgICAgICAgICAgdGhpcy5pZCA9IG9iai5pZFxuICAgIFx0ICAgICAgICB9KVxuXHQgICAgICAgIH1cblx0ICAgICAgICBcblx0ICAgICAgICBjb25zdCBjb21wb25lbnRzID0gdGhpcy5lbnRpdHlEYXRhW29iai51dWlkXVxuXG5cdFx0XHRpZiAoY29tcG9uZW50cykge1x0ICAgICAgICBcblx0XHRcdCAgICBPYmplY3Qua2V5cyhjb21wb25lbnRzKS5mb3JFYWNoKGtleSA9PiB7XG5cdCAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gY29tcG9uZW50c1trZXldXG5cdCAgICAgICAgICAgICAgICBcblx0ICAgICAgICAgICAgICAgIGNvbmZpZy53aXRoQ29tcG9uZW50KGtleSwgZnVuY3Rpb24oKSB7XG5cdFx0ICAgICAgICAgICAgICAgIC8vIHRvZG8gaGFuZGxlIG5vbi1vYmplY3RzXG5cdFx0ICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goa2V5ID0+IHtcblx0XHQgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzW2tleV0gPT0gbnVsbCB8fCBkYXRhW2tleV0gPT0gbnVsbCB8fCB0aGlzW2tleV0gPT09IGRhdGFba2V5XSkge1xuXHRcdCAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuXHRcdCAgICAgICAgICAgICAgICAgICAgfVxuXHRcdCAgICAgICAgICAgICAgICAgICAgXG5cdFx0ICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBkYXRhW2tleV1cblx0XHQgICAgICAgICAgICAgICAgfSwgdGhpcylcblx0XHQgICAgICAgICAgICB9KVxuXHQgICAgICAgICAgICB9LCB0aGlzKVxuXHRcdFx0fVxuXG5cdFx0XHRjb25maWcuY3JlYXRlKDEpXG5cdFx0fSlcbiAgICB9XG4gICAgXG4gICAgbG9hZCh7cHJvamVjdCwgc2NlbmUsIGNhbWVyYX0pIHtcbiAgICAgICAgY29uc3QgcGFyc2VkU2NlbmUgPSB0aGlzLmxvYWRlci5wYXJzZShzY2VuZSlcbiAgICAgICAgY29uc3QgcGFyc2VkQ2FtZXJhID0gdGhpcy5sb2FkZXIucGFyc2UoY2FtZXJhKVxuXHRcdFxuXHRcdHRoaXMuaW5pdEVudGl0aWVzKHBhcnNlZFNjZW5lKVxuXG4gICAgXHRpZiAocHJvamVjdC5zaGFkb3dzKSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVyTWFuYWdlci5lbmFibGVTaGFkb3dzKClcblx0XHR9XG5cdFx0XG4gICAgXHQvL3RvZG86IGNoZWNrIGZvciBjYW1lcmEgYW5kIHNjZW5lIGZpcnN0PyB0aHJvdyBpZiBub3Q/XG4gICAgXHR0aGlzLnJlbmRlcmVyTWFuYWdlci5zZXRTY2VuZShwYXJzZWRTY2VuZSlcbiAgICBcdHRoaXMucmVuZGVyZXJNYW5hZ2VyLnNldENhbWVyYShwYXJzZWRDYW1lcmEsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KVxuXHR9XG4gICAgXG4gICAgc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSAge1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGhcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHRcbiAgICAgICAgXG4gICAgICAgIHRoaXMucmVuZGVyZXJNYW5hZ2VyLnNldFNpemUodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpXG4gICAgfVxuICAgIFxuICAgIGdldERvbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXJNYW5hZ2VyLmdldERvbSgpXG4gICAgfVxuICAgIFxuICAgIHBsYXkoKSB7XG4gICAgICAgIHRoaXMubG9vcE1hbmFnZXIuc3RhcnQoKVxuICAgIH1cbiAgICBcbiAgICBzdG9wKCkge1xuICAgICAgICB0aGlzLmxvb3BNYW5hZ2VyLnN0b3AoKVxuICAgIH1cbn0iXSwibmFtZXMiOlsiZGVmaW5lIiwidGhpcyIsIk1haW5Mb29wTG9vcE1hbmFnZXIiLCJ1cGRhdGVNZXRob2QiLCJzZXRVcGRhdGUiLCJyZW5kZXJNZXRob2QiLCJzZXREcmF3Iiwic3RhcnQiLCJzdG9wIiwiVGhyZWVPYmplY3RNZXNoTG9hZGVyIiwibG9hZGVyIiwidGhyZWUiLCJPYmplY3RMb2FkZXIiLCJqc29uIiwicGFyc2UiLCJwYXRoIiwib3B0aW9ucyIsInNlbGYiLCJzaGFkaW5nIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJsb2FkIiwib2JqIiwib25Qcm9ncmVzcyIsImluZm8iLCJlcnIiLCJlcnJvciIsInRoZW4iLCJtZXNoIiwidHJhdmVyc2UiLCJjaGlsZCIsIk1lc2giLCJtYXRlcmlhbCIsImNhdGNoIiwid2FybiIsIlRocmVlUmVuZGVyZXJNYW5hZ2VyIiwicmVuZGVyZXIiLCJXZWJHTFJlbmRlcmVyIiwiYW50aWFsaWFzIiwic2V0Q2xlYXJDb2xvciIsInNldFBpeGVsUmF0aW8iLCJ3aW5kb3ciLCJkZXZpY2VQaXhlbFJhdGlvIiwic2hhZG93TWFwIiwiZW5hYmxlZCIsIl9mdWxsU2NyZWVuIiwic2NlbmUiLCJjYW1lcmEiLCJ3aWR0aCIsImhlaWdodCIsImlzRnVsbFNjcmVlbiIsImFzcGVjdCIsInVwZGF0ZVByb2plY3Rpb25NYXRyaXgiLCJzZXRTaXplIiwiZG9tRWxlbWVudCIsImtleSIsImdlb21ldHJpZXMiLCJnZXQiLCJtYXRlcmlhbHMiLCJnZW9tZXRyeSIsImdlbyIsIm1hdCIsImFkZCIsImludGVycG9sYXRpb25QZXJjZW50YWdlIiwicmVuZGVyIiwiX2xvb3BNYW5hZ2VyIiwiX2xvYWRlciIsIl9yZW5kZXJlck1hbmFnZXIiLCJfZW50aXR5TWFuYWdlciIsIkVudGl0eU1hbmFnZXIiLCJsb29wTWFuYWdlciIsInJlbmRlcmVyTWFuYWdlciIsImVudGl0eU1hbmFnZXIiLCJDT01QT05FTlQiLCJHRyIsIkRJIiwiZG9tIiwiZ2V0RG9tIiwiaW5pdENvbXBvbmVudHMiLCJpbml0U3lzdGVtcyIsIm9uSW5pdCIsInJlbmRlck1hbmFnZXIiLCJvbkxvZ2ljIiwiZGVsdGEiLCJzZXRSZW5kZXIiLCJvblJlbmRlciIsImVudGl0eURhdGEiLCJyZWdpc3RlckNvbXBvbmVudCIsIlRSQU5TRk9STSIsIngiLCJ5IiwieiIsIkFQUEVBUkFOQ0UiLCJpZCIsInJlbmRlckNvbXBvbmVudHMiLCJlbnRpdGllcyIsImVudGl0eSIsImFwcGVhcmFuY2UiLCJ0cmFuc2Zvcm0iLCJnZXRPYmplY3RCeUlkIiwidW5kZWZpbmVkIiwicG9zaXRpb24iLCJyZWdpc3RlclJlbmRlclN5c3RlbSIsInBhcnNlZFNjZW5lIiwiY29uZmlnIiwiYnVpbGQiLCJ3aXRoQ29tcG9uZW50IiwidmlzaWJsZSIsImNvbXBvbmVudHMiLCJ1dWlkIiwia2V5cyIsImZvckVhY2giLCJkYXRhIiwiY3JlYXRlIiwicHJvamVjdCIsInBhcnNlZENhbWVyYSIsImluaXRFbnRpdGllcyIsInNoYWRvd3MiLCJlbmFibGVTaGFkb3dzIiwic2V0U2NlbmUiLCJzZXRDYW1lcmEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBRUEsTUFBTSxhQUFhLENBQUM7SUFDaEIsV0FBVyxHQUFHO1FBQ1YsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO0tBQ2Q7O0lBRUQsSUFBSSxHQUFHO1FBQ0gsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtLQUNqQzs7SUFFRCxtQkFBbUIsQ0FBQyxFQUFFLEVBQUUsV0FBVyxFQUFFO1FBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDbEMsTUFBTSxTQUFTLENBQUMsZ0NBQWdDLENBQUM7U0FDcEQ7O1FBRUQsSUFBSSxPQUFPLFdBQVcsS0FBSyxVQUFVLEVBQUU7WUFDbkMsTUFBTSxTQUFTLENBQUMsaUNBQWlDLENBQUM7U0FDckQ7O1FBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFBO0tBQ3pDOztJQUVELEtBQUssR0FBRztRQUNKLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTs7UUFFOUIsT0FBTyxJQUFJO0tBQ2Q7O0lBRUQsYUFBYSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUU7UUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksV0FBVyxJQUFJLENBQUMsRUFBRTtZQUNwRCxPQUFPLElBQUk7U0FDZDs7UUFFRCxJQUFJLE9BQU8sV0FBVyxLQUFLLFVBQVUsRUFBRTtZQUNuQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7U0FDbkQ7O1FBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFBOztRQUVoRCxPQUFPLElBQUk7S0FDZDs7SUFFRCxtQkFBbUIsR0FBRztRQUNsQixPQUFPLElBQUksQ0FBQyxhQUFhO0tBQzVCOztJQUVELE1BQU0sQ0FBQyxhQUFhLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxhQUFhLEdBQUcsU0FBUyxFQUFFO1FBQ3hELElBQUksRUFBRSxhQUFhLFlBQVksYUFBYSxDQUFDLEVBQUU7WUFDM0MsT0FBTyxFQUFFO1NBQ1o7O1FBRUQsSUFBSSxhQUFhLElBQUksSUFBSSxFQUFFO1lBQ3ZCLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFBO1NBQ3JDOztRQUVELE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBOztRQUUzRixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUE7O1FBRWpCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDNUIsSUFBSSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFBOztZQUV4RCxJQUFJLEVBQUUsSUFBSSxhQUFhLENBQUMsUUFBUSxFQUFFO2dCQUM5QixLQUFLO2FBQ1I7O1lBRUQsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxJQUFJLGFBQWEsRUFBRTtnQkFDaEQsSUFBSSxPQUFPLFdBQVcsS0FBSyxVQUFVLEVBQUU7b0JBQ25DLFFBQVE7aUJBQ1g7O2dCQUVELElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7O2dCQUVoRCxJQUFJLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLFFBQVEsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO29CQUMvRCxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxDQUFBO2lCQUM3QjthQUNKOztZQUVELFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTtTQUNoQzs7UUFFRCxPQUFPLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRO0tBQ3hEO0NBQ0osQUFFRCxBQUF3Qjs7QUN2RnhCOzs7OztBQUtBLE1BQU0sZ0JBQWdCLENBQUM7SUFDbkIsV0FBVyxHQUFHO1FBQ1YsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO0tBQ2Q7O0lBRUQsSUFBSSxHQUFHO1FBQ0gsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0tBQzlCOztJQUVELFlBQVksQ0FBQyxXQUFXLEVBQUU7UUFDdEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7O1FBRWhELElBQUksU0FBUyxLQUFLLElBQUksSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQy9DLE9BQU8sSUFBSTtTQUNkOztRQUVELFFBQVEsT0FBTyxTQUFTO1lBQ3BCLEtBQUssVUFBVTtnQkFDWCxPQUFPLElBQUksU0FBUyxFQUFFO1lBQzFCLEtBQUssUUFBUSxJQUFJO2dCQUNiLE9BQU8sQ0FBQyxDQUFDLFNBQVMsS0FBSztvQkFDbkIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBOztvQkFFWixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBOztvQkFFaEUsT0FBTyxHQUFHO2lCQUNiLEVBQUUsU0FBUyxDQUFDO2FBQ2hCO1lBQ0Q7Z0JBQ0ksT0FBTyxTQUFTO1NBQ3ZCO0tBQ0o7O0lBRUQsaUJBQWlCLENBQUMsU0FBUyxFQUFFO1FBQ3pCLElBQUksU0FBUyxLQUFLLElBQUksSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQy9DLE1BQU0sU0FBUyxDQUFDLHdDQUF3QyxDQUFDO1NBQzVEOztRQUVELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7O1FBRS9DLE1BQU0sRUFBRSxHQUFHLEdBQUcsS0FBSyxTQUFTLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUE7O1FBRS9GLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQTs7UUFFbEMsT0FBTyxFQUFFO0tBQ1o7O0lBRUQsYUFBYSxHQUFHO1FBQ1osT0FBTyxJQUFJLENBQUMsVUFBVTtLQUN6QjtDQUNKLEFBRUQsQUFBMkI7O0FDekRwQixNQUFNLFVBQVUsR0FBRztJQUN0QixLQUFLLElBQUksQ0FBQztJQUNWLE1BQU0sR0FBRyxDQUFDO0lBQ1YsSUFBSSxLQUFLLENBQUM7Q0FDYixDQUFBOztBQUVELE1BQU0sYUFBYSxDQUFDO0lBQ2hCLFdBQVcsR0FBRztRQUNWLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtLQUNkOztJQUVELElBQUksR0FBRztRQUNILElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUM5QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7UUFDOUIsSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLEdBQUcsRUFBRSxDQUFBO0tBQ2pDOztJQUVELGNBQWMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRTtRQUN2QyxJQUFJLElBQUksS0FBSyxVQUFVLENBQUMsS0FBSyxJQUFJLElBQUksS0FBSyxVQUFVLENBQUMsTUFBTSxJQUFJLElBQUksS0FBSyxVQUFVLENBQUMsSUFBSSxFQUFFO1lBQ3JGLE1BQU0sU0FBUyxDQUFDLGtDQUFrQyxDQUFDO1NBQ3REOztRQUVELElBQUksT0FBTyxVQUFVLEtBQUssUUFBUSxHQUFHO1lBQ2pDLE1BQU0sU0FBUyxDQUFDLDhCQUE4QixDQUFDO1NBQ2xEOztRQUVELElBQUksT0FBTyxRQUFRLEtBQUssVUFBVSxFQUFFO1lBQ2hDLE1BQU0sU0FBUyxDQUFDLDhCQUE4QixDQUFDO1NBQ2xEOztRQUVELE1BQU0sTUFBTSxHQUFHO1lBQ1gsVUFBVTtZQUNWLFFBQVE7U0FDWCxDQUFBOztRQUVELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBOztRQUV2SCxRQUFRLElBQUk7WUFDUixLQUFLLFVBQVUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSztZQUN0RSxLQUFLLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSztZQUN4RSxLQUFLLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSztTQUN2RTs7UUFFRCxPQUFPLFFBQVE7S0FDbEI7O0lBRUQsWUFBWSxDQUFDLFFBQVEsRUFBRTtRQUNuQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztLQUN4SDtDQUNKLEFBRUQsQUFBd0I7O0FDakR4QixNQUFNLFlBQVksR0FBRyxNQUFNO0lBQ3ZCLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxJQUFJO1FBQzFCLE9BQU8sRUFBRSxDQUFBO0tBQ1osQ0FBQztDQUNMLENBQUE7O0FBRUQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEtBQUs7SUFDbEQsSUFBSSxPQUFPLEVBQUU7UUFDVCxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sSUFBSTtZQUMxQixVQUFVLENBQUMsVUFBVTtnQkFDakIsT0FBTyxDQUFDLE9BQU8sT0FBTyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQTthQUM3RyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1NBQ2QsQ0FBQztLQUNMOztJQUVELE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxJQUFJO1FBQzFCLE9BQU8sQ0FBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUE7S0FDNUcsQ0FBQztDQUNMLENBQUE7O0FBRUQsTUFBTSxZQUFZLENBQUM7SUFDZixXQUFXLEdBQUc7UUFDVixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7S0FDZDs7SUFFRCxJQUFJLEdBQUc7UUFDSCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7S0FDMUI7O0lBRUQsTUFBTSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUU7UUFDcEIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksT0FBTyxRQUFRLEtBQUssVUFBVSxFQUFFO1lBQzdELE1BQU07U0FDVDs7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQTtTQUNwQzs7UUFFRCxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQTs7UUFFaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJO1lBQ3pCLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1NBQy9DLENBQUMsQ0FBQTs7UUFFRixFQUFFLE9BQU8sQ0FBQTs7UUFFVCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFBOztRQUU3QyxPQUFPLE9BQU87S0FDakI7O0lBRUQsVUFBVSxDQUFDLE9BQU8sRUFBRTtRQUNoQixLQUFLLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDckMsS0FBSyxJQUFJLEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzFCLElBQUksRUFBRSxLQUFLLE9BQU8sRUFBRTtvQkFDaEIsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztpQkFDaEM7YUFDSjtTQUNKOztRQUVELE9BQU8sS0FBSztLQUNmOztJQUVELE9BQU8sR0FBRztRQUNOLElBQUksSUFBSSxHQUFHLElBQUksWUFBWSxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUE7O1FBRW5FLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7O1FBRWhDLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTs7UUFFakMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0RCxPQUFPLFlBQVksRUFBRTtTQUN4Qjs7UUFFRCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUE7O1FBRWpCLEtBQUssSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDbEQsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFBO1NBQy9DOztRQUVELE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7S0FDL0I7O0lBRUQsY0FBYyxHQUFHO1FBQ2IsSUFBSSxJQUFJLEdBQUcsSUFBSSxZQUFZLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQTs7UUFFbkUsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTs7UUFFaEMsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTs7UUFFMUMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDcEYsT0FBTyxZQUFZLEVBQUU7U0FDeEI7O1FBRUQsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFBOztRQUVqQixLQUFLLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ2xELFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUE7U0FDeEQ7O1FBRUQsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztLQUMvQjtDQUNKLEFBRUQsQUFBdUI7O0FDckd2QixNQUFNLGFBQWEsQ0FBQztJQUNoQixXQUFXLENBQUMsUUFBUSxHQUFHLElBQUksRUFBRTtRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0tBQ3RCOztJQUVELElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDWCxJQUFJLENBQUMsUUFBUSxXQUFXLFFBQVEsQ0FBQTtRQUNoQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLENBQUE7O1FBRTFCLElBQUksQ0FBQyxhQUFhLE1BQU0sSUFBSSxhQUFhLEVBQUUsQ0FBQTtRQUMzQyxJQUFJLENBQUMsYUFBYSxNQUFNLElBQUksYUFBYSxFQUFFLENBQUE7UUFDM0MsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQTtRQUM5QyxJQUFJLENBQUMsWUFBWSxPQUFPLElBQUksWUFBWSxFQUFFLENBQUE7O1FBRTFDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ3JDLElBQUksQ0FBQyxlQUFlLFFBQVEsSUFBSSxHQUFHLEVBQUUsQ0FBQTs7UUFFckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtLQUNwRjs7SUFFRCxnQkFBZ0IsR0FBRztRQUNmLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUE7O1FBRS9CLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFBOztRQUVsQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sR0FBRyxXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBOztRQUV0RyxLQUFLLElBQUksQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUM5QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBOztZQUU3QixLQUFLLE1BQU0sV0FBVyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDcEUsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFBOztnQkFFeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQ3JELElBQUksS0FBSyxLQUFLLFdBQVcsRUFBRTt3QkFDdkIsYUFBYSxHQUFHLEdBQUcsQ0FBQTs7d0JBRW5CLEtBQUs7cUJBQ1I7aUJBQ0o7O2dCQUVELE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFBOztnQkFFckUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLEVBQUUsR0FBRyxHQUFHLEVBQUUsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTthQUMzRztTQUNKO0tBQ0o7O0lBRUQsU0FBUyxDQUFDLFVBQVUsRUFBRTtRQUNsQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDM0IsVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDNUc7O1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksVUFBVSxJQUFJLENBQUMsRUFBRTtZQUNsRCxPQUFPLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxHQUFHLElBQUksRUFBRTtTQUMvQzs7UUFFRCxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUE7O1FBRVYsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUM3QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxLQUFLLENBQUMsRUFBRTtnQkFDcEMsS0FBSzthQUNSO1NBQ0o7O1FBRUQsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTs7WUFFckIsT0FBTyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sR0FBRyxJQUFJLEVBQUU7U0FDL0M7O1FBRUQsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQzVCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUE7U0FDN0I7O1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFBOztRQUV6QyxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0tBQzVDOztJQUVELFlBQVksQ0FBQyxFQUFFLEVBQUU7O1FBRWIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFBOztRQUVoQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDNUIsTUFBTTtTQUNUOztRQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDMUIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsS0FBSyxDQUFDLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUE7O2dCQUV6QixNQUFNO2FBQ1Q7U0FDSjs7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFBO0tBQzVCOzs7O0lBSUQsQ0FBQyxXQUFXLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRTtRQUN6QixLQUFLLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQ2hELElBQUksVUFBVSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxHQUFHLFVBQVUsTUFBTSxVQUFVLEVBQUU7Z0JBQ2hGLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQTthQUMzQztTQUNKO0tBQ0o7O0lBRUQscUJBQXFCLEdBQUc7UUFDcEIsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUE7O1FBRTVFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFBOztRQUV4RixPQUFPLGVBQWU7S0FDekI7Ozs7SUFJRCxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO1FBQy9CLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQy9DLE1BQU0sU0FBUyxDQUFDLGtDQUFrQyxDQUFDO1NBQ3REOztRQUVELElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ3hDLE1BQU07U0FDVDs7UUFFRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUE7O1FBRXRFLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQTs7UUFFM0MsS0FBSyxJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzlCLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQ3JFLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEdBQUcsR0FBRyxFQUFFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7U0FDbEc7O1FBRUQsSUFBSSxXQUFXLENBQUE7O1FBRWYsUUFBUSxPQUFPLFNBQVM7WUFDcEIsS0FBSyxVQUFVLEVBQUUsV0FBVyxHQUFHLFNBQVMsQ0FBQyxDQUFDLEtBQUs7WUFDL0MsS0FBSyxRQUFRLEVBQUU7Z0JBQ1gsV0FBVyxHQUFHLFdBQVc7b0JBQ3JCLEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTt3QkFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtxQkFDN0I7aUJBQ0osQ0FBQTs7Z0JBRUQsS0FBSzthQUNSO1lBQ0QsU0FBUyxXQUFXLEdBQUcsV0FBVyxFQUFFLE9BQU8sU0FBUyxFQUFFLENBQUMsQ0FBQyxLQUFLO1NBQ2hFOztRQUVELElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFBOztRQUVoRSxPQUFPLFdBQVc7S0FDckI7O0lBRUQsWUFBWSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUU7UUFDOUIsSUFBSSxPQUFPLFNBQVMsS0FBSyxRQUFRLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7U0FDNUUsTUFBTTtZQUNILElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxJQUFJLFNBQVMsQ0FBQTtTQUNsRDtLQUNKOztJQUVELGVBQWUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFO1FBQ2pDLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxFQUFFO1lBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7U0FDN0UsTUFBTTtZQUNILElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxJQUFJLENBQUMsU0FBUyxDQUFBO1NBQ25EO0tBQ0o7Ozs7SUFJRCxjQUFjLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUU7UUFDdkMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQzNCLFVBQVUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQzVHOztRQUVELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUM7S0FDdkU7O0lBRUQsbUJBQW1CLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRTtRQUN0QyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDO0tBQ3JFOztJQUVELG9CQUFvQixDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUU7UUFDdkMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQztLQUN0RTs7SUFFRCxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUM7S0FDcEU7O0lBRUQsWUFBWSxDQUFDLFFBQVEsRUFBRTtRQUNuQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztLQUNuRDs7SUFFRCxPQUFPLENBQUMsSUFBSSxFQUFFO1FBQ1YsS0FBSyxJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUN6RCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDeEU7S0FDSjs7SUFFRCxRQUFRLENBQUMsSUFBSSxFQUFFO1FBQ1gsS0FBSyxJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUMxRCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDeEU7S0FDSjs7SUFFRCxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ1QsS0FBSyxJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUN4RCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDeEU7S0FDSjs7OztJQUlELG1CQUFtQixDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUU7UUFDeEMsSUFBSSxPQUFPLFNBQVMsS0FBSyxRQUFRLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtTQUMzRixNQUFNO1lBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUE7U0FDakU7S0FDSjs7SUFFRCxLQUFLLEdBQUc7UUFDSixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFBOztRQUUxQixPQUFPLElBQUk7S0FDZDs7SUFFRCxhQUFhLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRTtRQUNsQyxJQUFJLE9BQU8sU0FBUyxLQUFLLFFBQVEsRUFBRTtZQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtTQUNyRixNQUFNO1lBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFBO1NBQzNEOztRQUVELE9BQU8sSUFBSTtLQUNkOztJQUVELE1BQU0sQ0FBQyxLQUFLLEVBQUUsZUFBZSxFQUFFO1FBQzNCLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQTs7UUFFN0IsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxJQUFJLGVBQWUsR0FBRyxDQUFDLEVBQUU7WUFDMUQsYUFBYSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7O1lBRTlELElBQUksYUFBYSxLQUFLLFNBQVMsRUFBRTtnQkFDN0IsTUFBTSxLQUFLLENBQUMsNkhBQTZILENBQUM7YUFDN0k7U0FDSjs7UUFFRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsYUFBYSxDQUFDO0tBQy9EOzs7O0lBSUQsTUFBTSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUU7UUFDcEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDO0tBQ25EOztJQUVELFVBQVUsQ0FBQyxPQUFPLEVBQUU7UUFDaEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7S0FDL0M7O0lBRUQsT0FBTyxHQUFHO1FBQ04sT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsU0FBUyxDQUFDO0tBQzVEOztJQUVELGNBQWMsR0FBRztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLFNBQVMsQ0FBQztLQUNuRTtDQUNKLEFBRUQsQUFBd0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbFJ4QixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxF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
