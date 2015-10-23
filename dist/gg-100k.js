'use strict';

var _slice = Array.prototype.slice;

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (MainLoop, three) {
    'use strict';

    MainLoop = 'default' in MainLoop ? MainLoop['default'] : MainLoop;
    three = 'default' in three ? three['default'] : three;

    var SystemType = {
        Logic: 0,
        Render: 1
    };

    var SystemManager = (function () {
        function SystemManager() {
            _classCallCheck(this, SystemManager);

            this.logicSystems = new Map();
            this.renderSystems = new Map();
        }

        _createClass(SystemManager, [{
            key: 'registerSystem',
            value: function registerSystem(type, selector, components, callback) {
                if (type !== SystemType.Logic && type !== SystemType.Render) {
                    throw TypeError('type must be a valid SystemType.');
                }

                if (selector !== SelectorType.Get && selector !== SelectorType.GetWith && selector !== SelectorType.GetWithOnly && selector !== SelectorType.GetWithout) {
                    throw TypeError('selector must be a valid SelectorType.');
                }

                if (typeof components !== 'number') {
                    throw TypeError('components must be a number.');
                }

                if (typeof callback !== 'function') {
                    throw TypeError('callback must be a function.');
                }

                var system = {
                    selector: selector,
                    components: components,
                    callback: callback
                };

                var systemId = Math.max.apply(Math, [0].concat(_toConsumableArray(this.logicSystems.keys()), _toConsumableArray(this.renderSystems.keys()))) + 1;

                switch (type) {
                    case SystemType.Logic:
                        this.logicSystems.set(systemId, system);break;
                    case SystemType.Render:
                        this.renderSystems.set(systemId, system);break;
                }

                return systemId;
            }
        }, {
            key: 'removeSystem',
            value: function removeSystem(systemId) {
                return this.logicSystems['delete'](systemId) || this.renderSystems['delete'](systemId);
            }
        }]);

        return SystemManager;
    })();

    var EventHandler = (function () {
        function EventHandler() {
            _classCallCheck(this, EventHandler);

            this.events = new Map();
        }

        _createClass(EventHandler, [{
            key: 'emptyPromise',
            value: function emptyPromise() {
                return new Promise(function (resolve) {
                    resolve();
                });
            }
        }, {
            key: 'promise',
            value: function promise(callback, context, args, timeout) {
                if (timeout) {
                    return new Promise(function (resolve) {
                        setTimeout(function () {
                            resolve(typeof context === 'object' ? callback.call.apply(callback, [context].concat(_toConsumableArray(args))) : callback.apply.apply(callback, [context].concat(_toConsumableArray(args))));
                        }, timeout);
                    });
                }

                return new Promise(function (resolve) {
                    resolve(typeof context === 'object' ? callback.call.apply(callback, [context].concat(_toConsumableArray(args))) : callback.apply.apply(callback, [context].concat(_toConsumableArray(args))));
                });
            }
        }, {
            key: 'listen',
            value: function listen(event, callback) {
                if (typeof event !== 'string' || typeof callback !== 'function') {
                    return;
                }

                if (!this.events.has(event)) {
                    this.events.set(event, new Map());
                }

                var eventId = -1;

                this.events.forEach(function (event) {
                    eventId = Math.max.apply(Math, [eventId].concat(_toConsumableArray(event.keys())));
                });

                ++eventId;

                this.events.get(event).set(eventId, callback);

                return eventId;
            }
        }, {
            key: 'stopListen',
            value: function stopListen(eventId) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.events.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var events = _step.value;
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = events.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var id = _step2.value;

                                if (id === eventId) {
                                    return events['delete'](eventId);
                                }
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                                    _iterator2['return']();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator['return']) {
                            _iterator['return']();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return false;
            }
        }, {
            key: 'trigger',
            value: function trigger() {
                var self = this instanceof EntityManager ? this.eventHandler : this;

                var args = Array.from(arguments);

                var _args$splice = args.splice(0, 1);

                var _args$splice2 = _slicedToArray(_args$splice, 1);

                var event = _args$splice2[0];

                if (typeof event !== 'string' || !self.events.has(event)) {
                    return self.emptyPromise();
                }

                var promises = [];

                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = self.events.get(event).values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var callback = _step3.value;

                        promises.push(self.promise(callback, this, args, 1));
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                            _iterator3['return']();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                return Promise.all(promises);
            }
        }, {
            key: 'triggerDelayed',
            value: function triggerDelayed() {
                var self = this instanceof EntityManager ? this.eventHandler : this;

                var args = Array.from(arguments);

                var _args$splice3 = args.splice(0, 2);

                var _args$splice32 = _slicedToArray(_args$splice3, 2);

                var event = _args$splice32[0];
                var timeout = _args$splice32[1];

                if (typeof event !== 'string' || !Number.isInteger(timeout) || !self.events.has(event)) {
                    return self.emptyPromise();
                }

                var promises = [];

                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = self.events.get(event).values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var callback = _step4.value;

                        promises.push(self.promise(callback, this, args, timeout));
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                            _iterator4['return']();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }

                return Promise.all(promises);
            }
        }]);

        return EventHandler;
    })();

    var ComponentManager = (function () {
        function ComponentManager() {
            _classCallCheck(this, ComponentManager);

            this.components = new Map();
        }

        _createClass(ComponentManager, [{
            key: 'newComponent',
            value: function newComponent(componentId) {
                var component = this.components.get(componentId);

                if (component === null || component === undefined) {
                    return null;
                }

                switch (typeof component) {
                    case 'function':
                        return new component();
                    case 'object':
                        {
                            return (function (component) {
                                var ret = {};

                                Object.keys(component).forEach(function (key) {
                                    return ret[key] = component[key];
                                });

                                return ret;
                            })(component);
                        }
                }

                return component;
            }
        }, {
            key: 'registerComponent',
            value: function registerComponent(component) {
                if (component === null || component === undefined) {
                    throw TypeError('component cannot be null.');
                }

                var max = Math.max.apply(Math, _toConsumableArray(this.components.keys()));

                var id = max === undefined || max === null || max === -Infinity ? 1 : max === 0 ? 1 : max * 2;

                this.components.set(id, component);

                return id;
            }
        }, {
            key: 'getComponents',
            value: function getComponents() {
                return this.components;
            }
        }]);

        return ComponentManager;
    })();

    var SelectorType = {
        Get: 0,
        GetWith: 1,
        GetWithOnly: 2,
        GetWithout: 3
    };

    var EntityManager = (function () {
        function EntityManager() {
            var capacity = arguments.length <= 0 || arguments[0] === undefined ? 1000 : arguments[0];

            _classCallCheck(this, EntityManager);

            this.capacity = capacity;
            this.currentMaxEntity = -1;

            this.entityFactory = new EntityFactory();
            this.systemManager = new SystemManager();
            this.componentManager = new ComponentManager();
            this.eventHandler = new EventHandler();

            this.entities = Array.from({ length: this.capacity }, function () {
                return 0;
            });
        }

        _createClass(EntityManager, [{
            key: 'increaseCapacity',
            value: function increaseCapacity() {
                var oldCapacity = this.capacity;

                this.capacity *= 2;

                for (var i = oldCapacity; i < this.capacity; ++i) {
                    this.entities[i] = 0;
                }

                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = this.componentManager.getComponents().keys()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var componentId = _step5.value;

                        for (var i = oldCapacity; i < this.capacity; ++i) {
                            this[componentId].push(this.componentManager.newComponent(componentId));
                        }
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5['return']) {
                            _iterator5['return']();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }
            }
        }, {
            key: 'newEntity',
            value: function newEntity(components) {
                if (typeof components !== 'number' || components <= 0) {
                    return this.capacity;
                }

                var entityId = 0;

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
        }, {
            key: 'deleteEntity',
            value: function deleteEntity(entityId) {
                this.entities[entityId] = 0;

                if (entityId < this.currentMaxEntity) {
                    return;
                }

                for (var i = entityId; i >= 0; --i) {
                    if (this.entities[i] !== 0) {
                        this.currentMaxEntity = i;

                        return;
                    }
                }
            }
        }, {
            key: 'getEntities',
            value: regeneratorRuntime.mark(function getEntities() {
                var components = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
                var type = arguments.length <= 1 || arguments[1] === undefined ? SelectorType.GetWith : arguments[1];
                var entityId;
                return regeneratorRuntime.wrap(function getEntities$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            context$3$0.t0 = type;
                            context$3$0.next = context$3$0.t0 === SelectorType.GetWith ? 3 : context$3$0.t0 === SelectorType.GetWithOnly ? 14 : context$3$0.t0 === SelectorType.GetWithout ? 25 : context$3$0.t0 === SelectorType.Get ? 36 : 46;
                            break;

                        case 3:
                            context$3$0.t1 = regeneratorRuntime.keys(this.entities);

                        case 4:
                            if ((context$3$0.t2 = context$3$0.t1()).done) {
                                context$3$0.next = 13;
                                break;
                            }

                            entityId = context$3$0.t2.value;

                            if (!(entityId > this.currentMaxEntity)) {
                                context$3$0.next = 8;
                                break;
                            }

                            return context$3$0.abrupt('return');

                        case 8:
                            if (!(this.entities[entityId] !== 0 && (this.entities[entityId] & components) === components)) {
                                context$3$0.next = 11;
                                break;
                            }

                            context$3$0.next = 11;
                            return Math.floor(entityId);

                        case 11:
                            context$3$0.next = 4;
                            break;

                        case 13:
                            return context$3$0.abrupt('break', 46);

                        case 14:
                            context$3$0.t3 = regeneratorRuntime.keys(this.entities);

                        case 15:
                            if ((context$3$0.t4 = context$3$0.t3()).done) {
                                context$3$0.next = 24;
                                break;
                            }

                            entityId = context$3$0.t4.value;

                            if (!(entityId > this.currentMaxEntity)) {
                                context$3$0.next = 19;
                                break;
                            }

                            return context$3$0.abrupt('return');

                        case 19:
                            if (!(this.entities[entityId] !== 0 && this.entities[entityId] === components)) {
                                context$3$0.next = 22;
                                break;
                            }

                            context$3$0.next = 22;
                            return Math.floor(entityId);

                        case 22:
                            context$3$0.next = 15;
                            break;

                        case 24:
                            return context$3$0.abrupt('break', 46);

                        case 25:
                            context$3$0.t5 = regeneratorRuntime.keys(this.entities);

                        case 26:
                            if ((context$3$0.t6 = context$3$0.t5()).done) {
                                context$3$0.next = 35;
                                break;
                            }

                            entityId = context$3$0.t6.value;

                            if (!(entityId > this.currentMaxEntity)) {
                                context$3$0.next = 30;
                                break;
                            }

                            return context$3$0.abrupt('return');

                        case 30:
                            if (!(this.entities[entityId] !== 0 && (this.entities[entityId] & components) !== components)) {
                                context$3$0.next = 33;
                                break;
                            }

                            context$3$0.next = 33;
                            return Math.floor(entityId);

                        case 33:
                            context$3$0.next = 26;
                            break;

                        case 35:
                            return context$3$0.abrupt('break', 46);

                        case 36:
                            context$3$0.t7 = regeneratorRuntime.keys(this.entities);

                        case 37:
                            if ((context$3$0.t8 = context$3$0.t7()).done) {
                                context$3$0.next = 45;
                                break;
                            }

                            entityId = context$3$0.t8.value;

                            if (!(entityId > this.currentMaxEntity)) {
                                context$3$0.next = 41;
                                break;
                            }

                            return context$3$0.abrupt('return');

                        case 41:
                            context$3$0.next = 43;
                            return Math.floor(entityId);

                        case 43:
                            context$3$0.next = 37;
                            break;

                        case 45:
                            return context$3$0.abrupt('break', 46);

                        case 46:
                        case 'end':
                            return context$3$0.stop();
                    }
                }, getEntities, this);
            })

            // Component Manager

        }, {
            key: 'registerComponent',
            value: function registerComponent(component) {
                var componentId = this.componentManager.registerComponent(component);

                this[componentId] = [];

                for (var i = 0; i < this.capacity; ++i) {
                    this[componentId].push(this.componentManager.newComponent(componentId));
                }

                var initializer = undefined;

                switch (typeof component) {
                    case 'function':
                        initializer = component;break;
                    case 'object':
                        {
                            initializer = function () {
                                var _iteratorNormalCompletion6 = true;
                                var _didIteratorError6 = false;
                                var _iteratorError6 = undefined;

                                try {
                                    for (var _iterator6 = Object.keys(component)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                        var key = _step6.value;

                                        this[key] = component[key];
                                    }
                                } catch (err) {
                                    _didIteratorError6 = true;
                                    _iteratorError6 = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion6 && _iterator6['return']) {
                                            _iterator6['return']();
                                        }
                                    } finally {
                                        if (_didIteratorError6) {
                                            throw _iteratorError6;
                                        }
                                    }
                                }
                            };

                            break;
                        }
                    default:
                        initializer = function () {
                            return component;
                        };break;
                }

                this.entityFactory.registerInitializer(componentId, initializer);

                return componentId;
            }
        }, {
            key: 'addComponent',
            value: function addComponent(entityId, componentId) {
                this.entities[entityId] |= componentId;
            }
        }, {
            key: 'removeComponent',
            value: function removeComponent(entityId, componentId) {
                this.entities[entityId] &= ~componentId;
            }

            // System Manager

        }, {
            key: 'registerSystem',
            value: function registerSystem(type, selector, components, callback) {
                return this.systemManager.registerSystem(type, selector, components, callback);
            }
        }, {
            key: 'registerLogicSystem',
            value: function registerLogicSystem(selector, components, callback) {
                return this.systemManager.registerSystem(SystemType.Logic, selector, components, callback);
            }
        }, {
            key: 'registerRenderSystem',
            value: function registerRenderSystem(selector, components, callback) {
                return this.systemManager.registerSystem(SystemType.Render, selector, components, callback);
            }
        }, {
            key: 'removeSystem',
            value: function removeSystem(systemId) {
                return this.systemManager.removeSystem(systemId);
            }
        }, {
            key: 'onLogic',
            value: function onLogic(delta) {
                var _iteratorNormalCompletion7 = true;
                var _didIteratorError7 = false;
                var _iteratorError7 = undefined;

                try {
                    for (var _iterator7 = this.systemManager.logicSystems.values()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                        var system = _step7.value;

                        system.callback.call(this, this.getEntities(system.components, system.selector), delta);
                    }
                } catch (err) {
                    _didIteratorError7 = true;
                    _iteratorError7 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion7 && _iterator7['return']) {
                            _iterator7['return']();
                        }
                    } finally {
                        if (_didIteratorError7) {
                            throw _iteratorError7;
                        }
                    }
                }
            }
        }, {
            key: 'onRender',
            value: function onRender(delta) {
                var _iteratorNormalCompletion8 = true;
                var _didIteratorError8 = false;
                var _iteratorError8 = undefined;

                try {
                    for (var _iterator8 = this.systemManager.renderSystems.values()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                        var system = _step8.value;

                        system.callback.call(this, this.getEntities(system.components, system.selector), delta);
                    }
                } catch (err) {
                    _didIteratorError8 = true;
                    _iteratorError8 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion8 && _iterator8['return']) {
                            _iterator8['return']();
                        }
                    } finally {
                        if (_didIteratorError8) {
                            throw _iteratorError8;
                        }
                    }
                }
            }

            // Entity Factory

        }, {
            key: 'registerInitializer',
            value: function registerInitializer(componentId, initializer) {
                this.entityFactory.registerInitializer(componentId, initializer);
            }
        }, {
            key: 'build',
            value: function build() {
                this.entityFactory.build();

                return this;
            }
        }, {
            key: 'withComponent',
            value: function withComponent(componentId, initializer) {
                this.entityFactory.withComponent(componentId, initializer);

                return this;
            }
        }, {
            key: 'createConfiguration',
            value: function createConfiguration() {
                return this.entityFactory.createConfiguration();
            }
        }, {
            key: 'create',
            value: function create(count, configuration) {
                return this.entityFactory.create(this, count, configuration);
            }

            // Event Handler

        }, {
            key: 'listen',
            value: function listen(event, callback) {
                return this.eventHandler.listen(event, callback);
            }
        }, {
            key: 'stopListen',
            value: function stopListen(eventId) {
                return this.eventHandler.stopListen(eventId);
            }
        }, {
            key: 'trigger',
            value: function trigger() {
                var _eventHandler$trigger;

                return (_eventHandler$trigger = this.eventHandler.trigger).call.apply(_eventHandler$trigger, [this].concat(_slice.call(arguments)));
            }
        }, {
            key: 'triggerDelayed',
            value: function triggerDelayed() {
                var _eventHandler$triggerDelayed;

                return (_eventHandler$triggerDelayed = this.eventHandler.triggerDelayed).call.apply(_eventHandler$triggerDelayed, [this].concat(_slice.call(arguments)));
            }
        }]);

        return EntityManager;
    })();

    var EntityFactory = (function () {
        function EntityFactory() {
            _classCallCheck(this, EntityFactory);

            this.initializers = new Map();
            this.configuration = new Map();
        }

        _createClass(EntityFactory, [{
            key: 'registerInitializer',
            value: function registerInitializer(componentId, initializer) {
                if (!Number.isInteger(componentId) || typeof initializer !== 'function') {
                    return;
                }

                this.initializers.set(componentId, initializer);
            }
        }, {
            key: 'build',
            value: function build() {
                this.configuration = new Map();

                return this;
            }
        }, {
            key: 'withComponent',
            value: function withComponent(componentId, initializer) {
                if (!Number.isInteger(componentId)) {
                    return this;
                }

                if (typeof initializer !== 'function') {
                    initializer = this.initializers.get(componentId);
                }

                this.configuration.set(componentId, initializer);

                return this;
            }
        }, {
            key: 'createConfiguration',
            value: function createConfiguration() {
                return this.configuration;
            }
        }, {
            key: 'create',
            value: function create(entityManager) {
                var count = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
                var configuration = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

                if (!(entityManager instanceof EntityManager)) {
                    return [];
                }

                configuration = configuration || this.configuration;

                var components = 0;

                var _iteratorNormalCompletion9 = true;
                var _didIteratorError9 = false;
                var _iteratorError9 = undefined;

                try {
                    for (var _iterator9 = configuration.keys()[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                        var component = _step9.value;

                        components |= component;
                    }
                } catch (err) {
                    _didIteratorError9 = true;
                    _iteratorError9 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion9 && _iterator9['return']) {
                            _iterator9['return']();
                        }
                    } finally {
                        if (_didIteratorError9) {
                            throw _iteratorError9;
                        }
                    }
                }

                var entities = [];

                for (var i = 0; i < count; ++i) {
                    var entityId = entityManager.newEntity(components);

                    if (entityId >= entityManager.capacity) {
                        continue;
                    }

                    var _iteratorNormalCompletion10 = true;
                    var _didIteratorError10 = false;
                    var _iteratorError10 = undefined;

                    try {
                        for (var _iterator10 = configuration[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                            var _step10$value = _slicedToArray(_step10.value, 2);

                            var componentId = _step10$value[0];
                            var initializer = _step10$value[1];

                            if (typeof initializer !== 'function') {
                                continue;
                            }

                            var result = initializer.call(entityManager[componentId][entityId]);

                            if (typeof entityManager[componentId][entityId] !== 'function' && typeof entityManager[componentId][entityId] !== 'object' && result !== undefined) {
                                entityManager[componentId][entityId] = result;
                            }
                        }
                    } catch (err) {
                        _didIteratorError10 = true;
                        _iteratorError10 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion10 && _iterator10['return']) {
                                _iterator10['return']();
                            }
                        } finally {
                            if (_didIteratorError10) {
                                throw _iteratorError10;
                            }
                        }
                    }

                    entities.push(entityId);
                }

                return entities.length === 1 ? entities[0] : entities;
            }
        }]);

        return EntityFactory;
    })();

    var ThreeRendererManager = (function () {
        function ThreeRendererManager() {
            _classCallCheck(this, ThreeRendererManager);

            this.renderer = new three.WebGLRenderer();
            this.currentScene = new three.Scene();
            this.camera = new three.PerspectiveCamera();

            this.renderer.setSize(window.innerWidth, window.innerHeight);

            document.body.appendChild(this.renderer.domElement);

            var geometry = new three.BoxGeometry(1, 1, 1);
            var material = new three.MeshBasicMaterial({ color: 0x00ff00 });
            this.cube = new three.Mesh(geometry, material);

            this.currentScene.add(this.cube);

            this.camera.position.z = 5;
        }

        _createClass(ThreeRendererManager, [{
            key: 'render',
            value: function render(interpolationPercentage) {
                this.cube.rotation.x += 0.1;
                this.cube.rotation.y += 0.1;

                this.renderer.render(this.currentScene, this.camera);
            }
        }]);

        return ThreeRendererManager;
    })();

    var Game = (function () {
        function Game(entityManager, rendererManager) {
            _classCallCheck(this, Game);

            this.entityManager = entityManager;
            this.rendererManager = rendererManager;
        }

        _createClass(Game, [{
            key: 'update',
            value: function update(delta) {
                this.entityManager.onLogic(delta);
            }
        }, {
            key: 'render',
            value: function render(interpolationPercentage) {
                this.rendererManager.render(interpolationPercentage);
            }
        }]);

        return Game;
    })();

    window.onload = function () {
        var game = new Game(new EntityManager(), new ThreeRendererManager());

        console.log(EntityManager);

        MainLoop.setUpdate(function (delta) {
            game.update(delta);
        }).setDraw(function (interpolationPercentage) {
            game.render(interpolationPercentage);
        }).start();
    };
})(MainLoop, THREE);

//# sourceMappingURL=data:application/json;base64,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RSxFQUFFLElBQUksb0JBQW9CLEVBQUUsQ0FBQyxDQUFDOztBQUVyRSxlQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDOztBQUUzQixnQkFBUSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUssRUFBSTtBQUFFLGdCQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQUUsQ0FBQyxDQUMzQyxPQUFPLENBQUMsVUFBQSx1QkFBdUIsRUFBSTtBQUFFLGdCQUFJLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUM7U0FBRSxDQUFDLENBQzdFLEtBQUssRUFBRSxDQUFDO0tBQ3BCLENBQUM7Q0FFTCxDQUFBLENBQUUsUUFBUSxFQUFDLEtBQUssQ0FBQyxDQUFDIiwiZmlsZSI6InVuZGVmaW5lZCIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoTWFpbkxvb3AsdGhyZWUpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gICAgTWFpbkxvb3AgPSAnZGVmYXVsdCcgaW4gTWFpbkxvb3AgPyBNYWluTG9vcFsnZGVmYXVsdCddIDogTWFpbkxvb3A7XG4gICAgdGhyZWUgPSAnZGVmYXVsdCcgaW4gdGhyZWUgPyB0aHJlZVsnZGVmYXVsdCddIDogdGhyZWU7XG5cbiAgICBjb25zdCBTeXN0ZW1UeXBlID0ge1xuICAgICAgICBMb2dpYyAgIDogMCxcbiAgICAgICAgUmVuZGVyICA6IDFcbiAgICB9O1xuXG4gICAgY2xhc3MgU3lzdGVtTWFuYWdlciB7XG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgdGhpcy5sb2dpY1N5c3RlbXMgID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJTeXN0ZW1zID0gbmV3IE1hcCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZWdpc3RlclN5c3RlbSh0eXBlLCBzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmICh0eXBlICE9PSBTeXN0ZW1UeXBlLkxvZ2ljICYmIHR5cGUgIT09IFN5c3RlbVR5cGUuUmVuZGVyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCd0eXBlIG11c3QgYmUgYSB2YWxpZCBTeXN0ZW1UeXBlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGlmIChzZWxlY3RvciAhPT0gU2VsZWN0b3JUeXBlLkdldCAmJiBzZWxlY3RvciAhPT0gU2VsZWN0b3JUeXBlLkdldFdpdGggJiZcbiAgICAgICAgICAgICAgICBzZWxlY3RvciAhPT0gU2VsZWN0b3JUeXBlLkdldFdpdGhPbmx5ICYmIHNlbGVjdG9yICE9PSBTZWxlY3RvclR5cGUuR2V0V2l0aG91dCkge1xuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignc2VsZWN0b3IgbXVzdCBiZSBhIHZhbGlkIFNlbGVjdG9yVHlwZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnRzICE9PSAnbnVtYmVyJykgIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvbXBvbmVudHMgbXVzdCBiZSBhIG51bWJlci4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgc3lzdGVtID0ge1xuICAgICAgICAgICAgc2VsZWN0b3IsXG4gICAgICAgICAgICBjb21wb25lbnRzLFxuICAgICAgICAgICAgY2FsbGJhY2tcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBzeXN0ZW1JZCA9IE1hdGgubWF4KDAsIC4uLnRoaXMubG9naWNTeXN0ZW1zLmtleXMoKSwgLi4udGhpcy5yZW5kZXJTeXN0ZW1zLmtleXMoKSkgKyAxO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFN5c3RlbVR5cGUuTG9naWMgOiB0aGlzLmxvZ2ljU3lzdGVtcy5zZXQoc3lzdGVtSWQsIHN5c3RlbSk7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU3lzdGVtVHlwZS5SZW5kZXIgOiB0aGlzLnJlbmRlclN5c3RlbXMuc2V0KHN5c3RlbUlkLCBzeXN0ZW0pOyBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHN5c3RlbUlkO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZW1vdmVTeXN0ZW0oc3lzdGVtSWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvZ2ljU3lzdGVtcy5kZWxldGUoc3lzdGVtSWQpIHx8IHRoaXMucmVuZGVyU3lzdGVtcy5kZWxldGUoc3lzdGVtSWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgRXZlbnRIYW5kbGVyIHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBNYXAoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZW1wdHlQcm9taXNlKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwcm9taXNlKGNhbGxiYWNrLCBjb250ZXh0LCBhcmdzLCB0aW1lb3V0KSB7XG4gICAgICAgICAgICBpZiAodGltZW91dCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0eXBlb2YgY29udGV4dCA9PT0gICdvYmplY3QnID8gY2FsbGJhY2suY2FsbChjb250ZXh0LCAuLi5hcmdzKSA6IGNhbGxiYWNrLmFwcGx5KGNvbnRleHQsIC4uLmFyZ3MpKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHR5cGVvZiBjb250ZXh0ID09PSAnb2JqZWN0JyA/IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgLi4uYXJncykgOiBjYWxsYmFjay5hcHBseShjb250ZXh0LCAuLi5hcmdzKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGlzdGVuKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIXRoaXMuZXZlbnRzLmhhcyhldmVudCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50cy5zZXQoZXZlbnQsIG5ldyBNYXAoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBldmVudElkID0gLTE7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50SWQgPSBNYXRoLm1heChldmVudElkLCAuLi5ldmVudC5rZXlzKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICsrZXZlbnRJZDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5ldmVudHMuZ2V0KGV2ZW50KS5zZXQoZXZlbnRJZCwgY2FsbGJhY2spO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gZXZlbnRJZDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgc3RvcExpc3RlbihldmVudElkKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBldmVudHMgb2YgdGhpcy5ldmVudHMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpZCBvZiBldmVudHMua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpZCA9PT0gZXZlbnRJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50cy5kZWxldGUoZXZlbnRJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdHJpZ2dlcigpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcyBpbnN0YW5jZW9mIEVudGl0eU1hbmFnZXIgPyB0aGlzLmV2ZW50SGFuZGxlciA6IHRoaXM7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgWyBldmVudCBdID0gYXJncy5zcGxpY2UoMCwgMSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXZlbnQgIT09ICdzdHJpbmcnIHx8ICFzZWxmLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuZW1wdHlQcm9taXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBwcm9taXNlcyA9IFtdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBjYWxsYmFjayBvZiBzZWxmLmV2ZW50cy5nZXQoZXZlbnQpLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChzZWxmLnByb21pc2UoY2FsbGJhY2ssIHRoaXMsIGFyZ3MsIDEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdHJpZ2dlckRlbGF5ZWQoKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXMgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyID8gdGhpcy5ldmVudEhhbmRsZXIgOiB0aGlzO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IFsgZXZlbnQsIHRpbWVvdXQgXSA9IGFyZ3Muc3BsaWNlKDAsIDIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCAhTnVtYmVyLmlzSW50ZWdlcih0aW1lb3V0KSB8fCAhc2VsZi5ldmVudHMuaGFzKGV2ZW50KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmVtcHR5UHJvbWlzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgY2FsbGJhY2sgb2Ygc2VsZi5ldmVudHMuZ2V0KGV2ZW50KS52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2goc2VsZi5wcm9taXNlKGNhbGxiYWNrLCB0aGlzLCBhcmdzLCB0aW1lb3V0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBDb21wb25lbnRNYW5hZ2VyIHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBuZXcgTWFwKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIG5ld0NvbXBvbmVudChjb21wb25lbnRJZCkge1xuICAgICAgICAgICAgbGV0IGNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50cy5nZXQoY29tcG9uZW50SWQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoY29tcG9uZW50ID09PSBudWxsIHx8IGNvbXBvbmVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzogcmV0dXJuIG5ldyBjb21wb25lbnQoKTtcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnICA6IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgoY29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmV0ID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGNvbXBvbmVudCkuZm9yRWFjaChrZXkgPT4gcmV0W2tleV0gPSBjb21wb25lbnRba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICAgICAgICAgIH0pKGNvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnQgPT09IG51bGwgfHwgY29tcG9uZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvbXBvbmVudCBjYW5ub3QgYmUgbnVsbC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IG1heCA9IE1hdGgubWF4KC4uLnRoaXMuY29tcG9uZW50cy5rZXlzKCkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgaWQgPSBtYXggPT09IHVuZGVmaW5lZCB8fCBtYXggPT09IG51bGwgfHwgbWF4ID09PSAtSW5maW5pdHkgPyAxIDogbWF4ID09PSAwID8gMSA6IG1heCAqIDI7XG5cbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50cy5zZXQoaWQsIGNvbXBvbmVudCk7XG5cbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZ2V0Q29tcG9uZW50cygpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudHM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBTZWxlY3RvclR5cGUgPSB7XG4gICAgICAgIEdldCAgICAgICAgIDogMCxcbiAgICAgICAgR2V0V2l0aCAgICAgOiAxLFxuICAgICAgICBHZXRXaXRoT25seSA6IDIsXG4gICAgICAgIEdldFdpdGhvdXQgIDogM1xuICAgIH07XG5cbiAgICBjbGFzcyBFbnRpdHlNYW5hZ2VyIHtcbiAgICAgICAgY29uc3RydWN0b3IoY2FwYWNpdHkgPSAxMDAwKSB7XG4gICAgICAgICAgICB0aGlzLmNhcGFjaXR5ICAgICAgICAgPSBjYXBhY2l0eTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IC0xO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkgICAgPSBuZXcgRW50aXR5RmFjdG9yeSgpO1xuICAgICAgICAgICAgdGhpcy5zeXN0ZW1NYW5hZ2VyICAgID0gbmV3IFN5c3RlbU1hbmFnZXIoKTtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50TWFuYWdlciA9IG5ldyBDb21wb25lbnRNYW5hZ2VyKCk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50SGFuZGxlciAgICAgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZW50aXRpZXMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiB0aGlzLmNhcGFjaXR5IH0sICgpID0+IHsgcmV0dXJuIDA7IH0gKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaW5jcmVhc2VDYXBhY2l0eSgpIHtcbiAgICAgICAgICAgIGxldCBvbGRDYXBhY2l0eSA9IHRoaXMuY2FwYWNpdHk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuY2FwYWNpdHkgKj0gMjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IG9sZENhcGFjaXR5OyBpIDwgdGhpcy5jYXBhY2l0eTsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tpXSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IGNvbXBvbmVudElkIG9mIHRoaXMuY29tcG9uZW50TWFuYWdlci5nZXRDb21wb25lbnRzKCkua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IG9sZENhcGFjaXR5OyBpIDwgdGhpcy5jYXBhY2l0eTsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbY29tcG9uZW50SWRdLnB1c2godGhpcy5jb21wb25lbnRNYW5hZ2VyLm5ld0NvbXBvbmVudChjb21wb25lbnRJZCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbmV3RW50aXR5KGNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50cyAhPT0gJ251bWJlcicgfHwgY29tcG9uZW50cyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FwYWNpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBlbnRpdHlJZCA9IDA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAoOyBlbnRpdHlJZCA8IHRoaXMuY2FwYWNpdHk7ICsrZW50aXR5SWQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZW50aXR5SWQgPj0gdGhpcy5jYXBhY2l0eSkge1xuICAgICAgICAgICAgICAgIC8vIHRvZG86IGF1dG8gaW5jcmVhc2UgY2FwYWNpdHk/XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FwYWNpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChlbnRpdHlJZCA+IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IGVudGl0eUlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eUlkXSA9IGNvbXBvbmVudHM7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHlJZDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZGVsZXRlRW50aXR5KGVudGl0eUlkKSB7XG4gICAgICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eUlkXSA9IDA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChlbnRpdHlJZCA8IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGVudGl0eUlkOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2ldICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IGk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAqZ2V0RW50aXRpZXMoY29tcG9uZW50cyA9IDAsIHR5cGUgPSBTZWxlY3RvclR5cGUuR2V0V2l0aCkge1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBTZWxlY3RvclR5cGUuR2V0V2l0aDoge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRpdHlJZCBpbiB0aGlzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5SWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2VudGl0eUlkXSAhPT0gMCAmJiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gJiBjb21wb25lbnRzKSA9PT0gY29tcG9uZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIE1hdGguZmxvb3IoZW50aXR5SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBTZWxlY3RvclR5cGUuR2V0V2l0aE9ubHk6IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZW50aXR5SWQgaW4gdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0eUlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gIT09IDAgJiYgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gPT09IGNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCBNYXRoLmZsb29yKGVudGl0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgU2VsZWN0b3JUeXBlLkdldFdpdGhvdXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZW50aXR5SWQgaW4gdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0eUlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gIT09IDAgJiYgKHRoaXMuZW50aXRpZXNbZW50aXR5SWRdICYgY29tcG9uZW50cykgIT09IGNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCBNYXRoLmZsb29yKGVudGl0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgU2VsZWN0b3JUeXBlLkdldDoge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRpdHlJZCBpbiB0aGlzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5SWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIE1hdGguZmxvb3IoZW50aXR5SWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDb21wb25lbnQgTWFuYWdlclxuICAgICAgICBcbiAgICAgICAgcmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgICAgICAgICBsZXQgY29tcG9uZW50SWQgPSB0aGlzLmNvbXBvbmVudE1hbmFnZXIucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpc1tjb21wb25lbnRJZF0gPSBbXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNhcGFjaXR5OyArK2kpIHtcbiAgICAgICAgICAgICAgICB0aGlzW2NvbXBvbmVudElkXS5wdXNoKHRoaXMuY29tcG9uZW50TWFuYWdlci5uZXdDb21wb25lbnQoY29tcG9uZW50SWQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGluaXRpYWxpemVyO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6IGluaXRpYWxpemVyID0gY29tcG9uZW50OyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOiB7XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMoY29tcG9uZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IGNvbXBvbmVudFtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogaW5pdGlhbGl6ZXIgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbXBvbmVudDsgfTsgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS5yZWdpc3RlckluaXRpYWxpemVyKGNvbXBvbmVudElkLCBpbml0aWFsaXplcik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRJZDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYWRkQ29tcG9uZW50KGVudGl0eUlkLCBjb21wb25lbnRJZCkge1xuICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gfD0gY29tcG9uZW50SWQ7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJlbW92ZUNvbXBvbmVudChlbnRpdHlJZCwgY29tcG9uZW50SWQpIHtcbiAgICAgICAgICAgIHRoaXMuZW50aXRpZXNbZW50aXR5SWRdICY9IH5jb21wb25lbnRJZDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gU3lzdGVtIE1hbmFnZXJcbiAgICAgICAgXG4gICAgICAgIHJlZ2lzdGVyU3lzdGVtKHR5cGUsIHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbSh0eXBlLCBzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZWdpc3RlckxvZ2ljU3lzdGVtKHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbShTeXN0ZW1UeXBlLkxvZ2ljLCBzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZWdpc3RlclJlbmRlclN5c3RlbShzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVnaXN0ZXJTeXN0ZW0oU3lzdGVtVHlwZS5SZW5kZXIsIHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJlbW92ZVN5c3RlbShzeXN0ZW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZW1vdmVTeXN0ZW0oc3lzdGVtSWQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBvbkxvZ2ljKGRlbHRhKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBzeXN0ZW0gb2YgdGhpcy5zeXN0ZW1NYW5hZ2VyLmxvZ2ljU3lzdGVtcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMsIHN5c3RlbS5zZWxlY3RvciksIGRlbHRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgb25SZW5kZXIoZGVsdGEpIHtcbiAgICAgICAgICAgIGZvciAobGV0IHN5c3RlbSBvZiB0aGlzLnN5c3RlbU1hbmFnZXIucmVuZGVyU3lzdGVtcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMsIHN5c3RlbS5zZWxlY3RvciksIGRlbHRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEVudGl0eSBGYWN0b3J5XG4gICAgICAgIFxuICAgICAgICByZWdpc3RlckluaXRpYWxpemVyKGNvbXBvbmVudElkLCBpbml0aWFsaXplcikge1xuICAgICAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LnJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYnVpbGQoKSB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkuYnVpbGQoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHdpdGhDb21wb25lbnQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eUZhY3Rvcnkud2l0aENvbXBvbmVudChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY3JlYXRlQ29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVudGl0eUZhY3RvcnkuY3JlYXRlQ29uZmlndXJhdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjcmVhdGUoY291bnQsIGNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVudGl0eUZhY3RvcnkuY3JlYXRlKHRoaXMsIGNvdW50LCBjb25maWd1cmF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gRXZlbnQgSGFuZGxlclxuICAgICAgICBcbiAgICAgICAgbGlzdGVuKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLmxpc3RlbihldmVudCwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBzdG9wTGlzdGVuKGV2ZW50SWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci5zdG9wTGlzdGVuKGV2ZW50SWQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0cmlnZ2VyKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLnRyaWdnZXIuY2FsbCh0aGlzLCAuLi5hcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0cmlnZ2VyRGVsYXllZCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyRGVsYXllZC5jYWxsKHRoaXMsIC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBFbnRpdHlGYWN0b3J5IHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVycyAgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSBuZXcgTWFwKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoY29tcG9uZW50SWQpIHx8IHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplcnMuc2V0KGNvbXBvbmVudElkLCBpbml0aWFsaXplcik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGJ1aWxkKCkge1xuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgd2l0aENvbXBvbmVudChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihjb21wb25lbnRJZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGluaXRpYWxpemVyID0gdGhpcy5pbml0aWFsaXplcnMuZ2V0KGNvbXBvbmVudElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnNldChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY3JlYXRlQ29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNyZWF0ZShlbnRpdHlNYW5hZ2VyLCBjb3VudCA9IDEsIGNvbmZpZ3VyYXRpb24gPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICghKGVudGl0eU1hbmFnZXIgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBjb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbiB8fCB0aGlzLmNvbmZpZ3VyYXRpb247XG5cbiAgICAgICAgICAgIGxldCBjb21wb25lbnRzID0gMDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgY29tcG9uZW50IG9mIGNvbmZpZ3VyYXRpb24ua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50cyB8PSBjb21wb25lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBlbnRpdGllcyA9IFtdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyArK2kpIHtcbiAgICAgICAgICAgICAgICBsZXQgZW50aXR5SWQgPSBlbnRpdHlNYW5hZ2VyLm5ld0VudGl0eShjb21wb25lbnRzKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZW50aXR5SWQgPj0gZW50aXR5TWFuYWdlci5jYXBhY2l0eSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgW2NvbXBvbmVudElkLCBpbml0aWFsaXplcl0gb2YgY29uZmlndXJhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGluaXRpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGluaXRpYWxpemVyLmNhbGwoZW50aXR5TWFuYWdlcltjb21wb25lbnRJZF1bZW50aXR5SWRdKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZW50aXR5TWFuYWdlcltjb21wb25lbnRJZF1bZW50aXR5SWRdICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBlbnRpdHlNYW5hZ2VyW2NvbXBvbmVudElkXVtlbnRpdHlJZF0gIT09ICdvYmplY3QnICYmIHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHlNYW5hZ2VyW2NvbXBvbmVudElkXVtlbnRpdHlJZF0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZW50aXRpZXMucHVzaChlbnRpdHlJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBlbnRpdGllcy5sZW5ndGggPT09IDEgPyBlbnRpdGllc1swXSA6IGVudGl0aWVzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgVGhyZWVSZW5kZXJlck1hbmFnZXIge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIgICAgID0gbmV3IHRocmVlLldlYkdMUmVuZGVyZXIoKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lID0gbmV3IHRocmVlLlNjZW5lKCk7XG4gICAgICAgICAgICB0aGlzLmNhbWVyYSAgICAgICA9IG5ldyB0aHJlZS5QZXJzcGVjdGl2ZUNhbWVyYSgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJlci5kb21FbGVtZW50KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGdlb21ldHJ5ID0gbmV3IHRocmVlLkJveEdlb21ldHJ5KDEsIDEsIDEpO1xuICAgICAgICAgICAgbGV0IG1hdGVyaWFsID0gbmV3IHRocmVlLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4MDBmZjAwIH0pO1xuICAgICAgICAgICAgdGhpcy5jdWJlICAgICA9IG5ldyB0aHJlZS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNjZW5lLmFkZCh0aGlzLmN1YmUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi56ID0gNTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbmRlcihpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSkge1xuICAgICAgICAgICAgdGhpcy5jdWJlLnJvdGF0aW9uLnggKz0gMC4xO1xuICAgICAgICAgICAgdGhpcy5jdWJlLnJvdGF0aW9uLnkgKz0gMC4xO1xuXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLmN1cnJlbnRTY2VuZSwgdGhpcy5jYW1lcmEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogQGZsb3cgKi9cblxuICAgIGNsYXNzIEdhbWUge1xuICAgICAgICBjb25zdHJ1Y3RvcihlbnRpdHlNYW5hZ2VyLCByZW5kZXJlck1hbmFnZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5TWFuYWdlciAgID0gZW50aXR5TWFuYWdlcjtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXJNYW5hZ2VyID0gcmVuZGVyZXJNYW5hZ2VyO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlKGRlbHRhKSB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIub25Mb2dpYyhkZWx0YSk7XG4gICAgICAgIH1cblxuICAgICAgICByZW5kZXIoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXJNYW5hZ2VyLnJlbmRlcihpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBnYW1lID0gbmV3IEdhbWUobmV3IEVudGl0eU1hbmFnZXIoKSwgbmV3IFRocmVlUmVuZGVyZXJNYW5hZ2VyKCkpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKEVudGl0eU1hbmFnZXIpO1xuICAgICAgICBcbiAgICAgICAgTWFpbkxvb3Auc2V0VXBkYXRlKGRlbHRhID0+IHsgZ2FtZS51cGRhdGUoZGVsdGEpOyB9KVxuICAgICAgICAgICAgICAgIC5zZXREcmF3KGludGVycG9sYXRpb25QZXJjZW50YWdlID0+IHsgZ2FtZS5yZW5kZXIoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UpOyB9KVxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH07XG5cbn0pKE1haW5Mb29wLFRIUkVFKTsiXX0=
