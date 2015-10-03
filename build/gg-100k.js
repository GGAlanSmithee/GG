(function (MainLoop,three) { 'use strict';

    MainLoop = 'default' in MainLoop ? MainLoop['default'] : MainLoop;
    three = 'default' in three ? three['default'] : three;

    class ThreeRendererManager {
        constructor() {
            this.renderer     = new three.WebGLRenderer();
            this.currentScene = new three.Scene();
            this.camera       = new three.PerspectiveCamera();
            
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            
            document.body.appendChild(this.renderer.domElement);
            
            let geometry = new three.BoxGeometry(1, 1, 1);
            let material = new three.MeshBasicMaterial({ color: 0x00ff00 });
            this.cube     = new three.Mesh(geometry, material);
            
            this.currentScene.add(this.cube);
            
            this.camera.position.z = 5;
        }

        render(interpolationPercentage) {
            this.cube.rotation.x += 0.1;
            this.cube.rotation.y += 0.1;

            this.renderer.render(this.currentScene, this.camera);
        }
    }

    const SystemType = {
        Logic   : 0,
        Render  : 1
    };

    class SystemManager {
        constructor() {
            this.logicSystems  = new Map();
            this.renderSystems = new Map();
        }
        
        registerSystem(type, selector, components, callback) {
            if (type !== SystemType.Logic && type !== SystemType.Render) {
                throw TypeError('type must be a valid SystemType.');
            }
        
            if (selector !== SelectorType.Get && selector !== SelectorType.GetWith &&
                selector !== SelectorType.GetWithOnly && selector !== SelectorType.GetWithout) {
                throw TypeError('selector must be a valid SelectorType.');
            }
            
            if (typeof components !== 'number')  {
                throw TypeError('components must be a number.');
            }
            
            if (typeof callback !== 'function') {
                throw TypeError('callback must be a function.');
            }
            
            let system = {
            selector,
            components,
            callback
            };
            
            let systemId = Math.max(0, ...this.logicSystems.keys(), ...this.renderSystems.keys()) + 1;
            
            switch (type) {
                case SystemType.Logic : this.logicSystems.set(systemId, system); break;
                case SystemType.Render : this.renderSystems.set(systemId, system); break;
            }
            
            return systemId;
        }
        
        removeSystem(systemId) {
            return this.logicSystems.delete(systemId) || this.renderSystems.delete(systemId);
        }
    }

    class EventHandler {
        constructor() {
            this.events = new Map();
        }
        
        emptyPromise() {
            return new Promise(resolve => {
                resolve();
            });
        }
        
        promise(callback, context, args, timeout) {
            if (timeout) {
                return new Promise(resolve => {
                    setTimeout(function(){
                        resolve(typeof context ===  'object' ? callback.call(context, ...args) : callback.apply(context, ...args));
                    }, timeout);
                });
            }
            
            return new Promise(resolve => {
                resolve(typeof context === 'object' ? callback.call(context, ...args) : callback.apply(context, ...args));
            });
        }
        
        listen(event, callback) {
            if (typeof event !== 'string' || typeof callback !== 'function') {
                return;
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
            
            return eventId;
        }
        
        stopListen(eventId) {
            for (let events of this.events.values()) {
                for (let id of events.keys()) {
                    if (id === eventId) {
                        return events.delete(eventId);
                    }
                }
            }

            return false;
        }
        
        trigger() {
            let self = this instanceof EntityManager ? this.eventHandler : this;
            
            let args = Array.from(arguments);
            
            let [ event ] = args.splice(0, 1);
            
            if (typeof event !== 'string' || !self.events.has(event)) {
                return self.emptyPromise();
            }
            
            let promises = [];
            
            for (let callback of self.events.get(event).values()) {
                promises.push(self.promise(callback, this, args, 1));
            }
            
            return Promise.all(promises);
        }
        
        triggerDelayed() {
            let self = this instanceof EntityManager ? this.eventHandler : this;
            
            let args = Array.from(arguments);
            
            let [ event, timeout ] = args.splice(0, 2);
            
            if (typeof event !== 'string' || !Number.isInteger(timeout) || !self.events.has(event)) {
                return self.emptyPromise();
            }
            
            let promises = [];
            
            for (let callback of self.events.get(event).values()) {
                promises.push(self.promise(callback, this, args, timeout));
            }
            
            return Promise.all(promises);
        }
    }

    class ComponentManager {
        constructor() {
            this.components = new Map();
        }
        
        newComponent(componentId) {
            let component = this.components.get(componentId);
            
            if (component === null || component === undefined) {
                return null;
            }
            
            switch (typeof component) {
                case 'function': return new component();
                case 'object'  : {
                    return ((component) => {
                        let ret = {};
                        
                        Object.keys(component).forEach(key => ret[key] = component[key]);
                        
                        return ret;
                    })(component);
                }
            }
            
            return component;
        }
        
        registerComponent(component) {
            if (component === null || component === undefined) {
                throw TypeError('component cannot be null.');
            }
            
            let max = Math.max(...this.components.keys());
            
            let id = max === undefined || max === null || max === -Infinity ? 1 : max === 0 ? 1 : max * 2;

            this.components.set(id, component);

            return id;
        }
        
        getComponents() {
            return this.components;
        }
    }

    const SelectorType = {
        Get         : 0,
        GetWith     : 1,
        GetWithOnly : 2,
        GetWithout  : 3
    };

    class EntityManager {
        constructor(capacity = 1000) {
            this.capacity         = capacity;
            this.currentMaxEntity = -1;
            
            this.entityFactory    = new EntityFactory();
            this.systemManager    = new SystemManager();
            this.componentManager = new ComponentManager();
            this.eventHandler     = new EventHandler();
            
            this.entities = Array.from({ length: this.capacity }, () => { return 0; } );
        }
        
        increaseCapacity() {
            let oldCapacity = this.capacity;
            
            this.capacity *= 2;
            
            for (let i = oldCapacity; i < this.capacity; ++i) {
                this.entities[i] = 0;
            }
            
            for (let componentId of this.componentManager.getComponents().keys()) {
                for (let i = oldCapacity; i < this.capacity; ++i) {
                    this[componentId].push(this.componentManager.newComponent(componentId));
                }
            }
        }
        
        newEntity(components) {
            if (typeof components !== 'number' || components <= 0) {
                return this.capacity;
            }
            
            let entityId = 0;
            
            for (; entityId < this.capacity; ++entityId) {
                if (this.entities[entityId] === 0) {
                    break;
                }
            }
            
            if (entityId >= this.capacity) {
                // todo: auto increase capacity?
                return this.capacity;
            }
            
            if (entityId > this.currentMaxEntity) {
                this.currentMaxEntity = entityId;
            }
            
            this.entities[entityId] = components;
            
            return entityId;
        }
        
        deleteEntity(entityId) {
            this.entities[entityId] = 0;
            
            if (entityId < this.currentMaxEntity) {
                return;
            }
            
            for (let i = entityId; i >= 0; --i) {
                if (this.entities[i] !== 0) {
                    this.currentMaxEntity = i;
                    
                    return;
                }
            }
        }
        
        *getEntities(components = 0, type = SelectorType.GetWith) {
            switch (type) {
                case SelectorType.GetWith: {
                    for (let entityId in this.entities) {
                        if (entityId > this.currentMaxEntity) {
                            return;
                        }
                        
                        if (this.entities[entityId] !== 0 && (this.entities[entityId] & components) === components) {
                            yield Math.floor(entityId);
                        }
                    }
                    
                    break;
                }
                case SelectorType.GetWithOnly: {
                    for (let entityId in this.entities) {
                        if (entityId > this.currentMaxEntity) {
                            return;
                        }
                        
                        if (this.entities[entityId] !== 0 && this.entities[entityId] === components) {
                            yield Math.floor(entityId);
                        }
                    }
                    
                    break;
                }
                case SelectorType.GetWithout: {
                    for (let entityId in this.entities) {
                        if (entityId > this.currentMaxEntity) {
                            return;
                        }
                        
                        if (this.entities[entityId] !== 0 && (this.entities[entityId] & components) !== components) {
                            yield Math.floor(entityId);
                        }
                    }
                    
                    break;
                }
                case SelectorType.Get: {
                    for (let entityId in this.entities) {
                        if (entityId > this.currentMaxEntity) {
                            return;
                        }
                        
                        yield Math.floor(entityId);
                    }
                    
                    break;
                }
            }
        }

        // Component Manager
        
        registerComponent(component) {
            let componentId = this.componentManager.registerComponent(component);
            
            this[componentId] = [];
            
            for (let i = 0; i < this.capacity; ++i) {
                this[componentId].push(this.componentManager.newComponent(componentId));
            }
            
            let initializer;

            switch (typeof component) {
                case 'function': initializer = component; break;
                case 'object': {
                    initializer = function() {
                        for (let key of Object.keys(component)) {
                            this[key] = component[key];
                        }
                    };
                
                    break;
                }
                default: initializer = function() { return component; }; break;
            }
            
            this.entityFactory.registerInitializer(componentId, initializer);
            
            return componentId;
        }
        
        addComponent(entityId, componentId) {
            this.entities[entityId] |= componentId;
        }
        
        removeComponent(entityId, componentId) {
            this.entities[entityId] &= ~componentId;
        }
        
        // System Manager
        
        registerSystem(type, selector, components, callback) {
            return this.systemManager.registerSystem(type, selector, components, callback);
        }
        
        registerLogicSystem(selector, components, callback) {
            return this.systemManager.registerSystem(SystemType.Logic, selector, components, callback);
        }
        
        registerRenderSystem(selector, components, callback) {
            return this.systemManager.registerSystem(SystemType.Render, selector, components, callback);
        }
        
        removeSystem(systemId) {
            return this.systemManager.removeSystem(systemId);
        }
        
        onLogic(delta) {
            for (let system of this.systemManager.logicSystems.values()) {
                system.callback.call(this, this.getEntities(system.components, system.selector), delta);
            }
        }
        
        onRender(delta) {
            for (let system of this.systemManager.renderSystems.values()) {
                system.callback.call(this, this.getEntities(system.components, system.selector), delta);
            }
        }

        // Entity Factory
        
        registerInitializer(componentId, initializer) {
            this.entityFactory.registerInitializer(componentId, initializer);
        }
        
        build() {
            this.entityFactory.build();
            
            return this;
        }
        
        withComponent(componentId, initializer) {
            this.entityFactory.withComponent(componentId, initializer);
            
            return this;
        }
        
        createConfiguration() {
            return this.entityFactory.createConfiguration();
        }
        
        create(count, configuration) {
            return this.entityFactory.create(this, count, configuration);
        }
        
        // Event Handler
        
        listen(event, callback) {
            return this.eventHandler.listen(event, callback);
        }
        
        stopListen(eventId) {
            return this.eventHandler.stopListen(eventId);
        }
        
        trigger() {
            return this.eventHandler.trigger.call(this, ...arguments);
        }
        
        triggerDelayed() {
            return this.eventHandler.triggerDelayed.call(this, ...arguments);
        }
    }

    class EntityFactory {
        constructor() {
            this.initializers  = new Map();
            this.configuration = new Map();
        }
        
        registerInitializer(componentId, initializer) {
            if (!Number.isInteger(componentId) || typeof initializer !== 'function') {
                return;
            }
            
            this.initializers.set(componentId, initializer);
        }
        
        build() {
            this.configuration = new Map();
            
            return this;
        }
        
        withComponent(componentId, initializer) {
            if (!Number.isInteger(componentId)) {
                return this;
            }
            
            if (typeof initializer !== 'function') {
                initializer = this.initializers.get(componentId);
            }
            
            this.configuration.set(componentId, initializer);
            
            return this;
        }
        
        createConfiguration() {
            return this.configuration;
        }
        
        create(entityManager, count = 1, configuration = undefined) {
            if (!(entityManager instanceof EntityManager)) {
                return [];
            }
        
            configuration = configuration || this.configuration;

            let components = 0;
            
            for (let component of configuration.keys()) {
                components |= component;
            }
            
            let entities = [];
            
            for (let i = 0; i < count; ++i) {
                let entityId = entityManager.newEntity(components);
                
                if (entityId >= entityManager.capacity) {
                    continue;
                }
                
                for (let [componentId, initializer] of configuration) {
                    if (typeof initializer !== 'function') {
                        continue;
                    }
                    
                    let result = initializer.call(entityManager[componentId][entityId]);
                    
                    if (typeof entityManager[componentId][entityId] !== 'function' && typeof entityManager[componentId][entityId] !== 'object' && result !== undefined) {
                        entityManager[componentId][entityId] = result;
                    }
                }
                
                entities.push(entityId);
            }
            
            return entities.length === 1 ? entities[0] : entities;
        }
    }

    /* @flow */

    class Game {
        constructor(entityManager, rendererManager) {
            this.entityManager   = entityManager;
            this.rendererManager = rendererManager;
        }

        update(delta) {
            this.entityManager.onLogic(delta);
        }

        render(interpolationPercentage) {
            this.rendererManager.render(interpolationPercentage);
        }
    }

    window.onload = function() {
        let game = new Game(new EntityManager(), new ThreeRendererManager());

        MainLoop.setUpdate(delta => { game.update(delta); })
                .setDraw(interpolationPercentage => { game.render(interpolationPercentage); })
                .start();
    };

})(MainLoop,THREE);