(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('three')) :
    typeof define === 'function' && define.amd ? define('Test', ['three'], factory) :
    factory(global.THREE);
}(this, function (three) { 'use strict';

    three = 'default' in three ? three['default'] : three;

    var babelHelpers = {};

    babelHelpers.typeof = function (obj) {
      return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };

    babelHelpers.asyncToGenerator = function (fn) {
      return function () {
        var gen = fn.apply(this, arguments);
        return new Promise(function (resolve, reject) {
          var callNext = step.bind(null, "next");
          var callThrow = step.bind(null, "throw");

          function step(key, arg) {
            try {
              var info = gen[key](arg);
              var value = info.value;
            } catch (error) {
              reject(error);
              return;
            }

            if (info.done) {
              resolve(value);
            } else {
              Promise.resolve(value).then(callNext, callThrow);
            }
          }

          callNext();
        });
      };
    };

    babelHelpers.classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    babelHelpers.createClass = (function () {
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
    })();

    babelHelpers.slicedToArray = (function () {
      function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;

        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);

            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"]) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }

        return _arr;
      }

      return function (arr, i) {
        if (Array.isArray(arr)) {
          return arr;
        } else if (Symbol.iterator in Object(arr)) {
          return sliceIterator(arr, i);
        } else {
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
      };
    })();

    babelHelpers.toConsumableArray = function (arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

        return arr2;
      } else {
        return Array.from(arr);
      }
    };

    babelHelpers;
    var SystemType = {
        Logic: 0,
        Render: 1
    };

    var SystemManager = (function () {
        function SystemManager() {
            babelHelpers.classCallCheck(this, SystemManager);

            this.logicSystems = new Map();
            this.renderSystems = new Map();
        }

        babelHelpers.createClass(SystemManager, [{
            key: 'registerSystem',
            value: function registerSystem(type, selector, components, callback) {
                var _Math;

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

                var systemId = (_Math = Math).max.apply(_Math, [0].concat(babelHelpers.toConsumableArray(this.logicSystems.keys()), babelHelpers.toConsumableArray(this.renderSystems.keys()))) + 1;

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
                return this.logicSystems.delete(systemId) || this.renderSystems.delete(systemId);
            }
        }]);
        return SystemManager;
    })();

    var EventHandler = (function () {
        function EventHandler() {
            babelHelpers.classCallCheck(this, EventHandler);

            this.events = new Map();
        }

        babelHelpers.createClass(EventHandler, [{
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
                            resolve((typeof context === 'undefined' ? 'undefined' : babelHelpers.typeof(context)) === 'object' ? callback.call.apply(callback, [context].concat(babelHelpers.toConsumableArray(args))) : callback.apply.apply(callback, [context].concat(babelHelpers.toConsumableArray(args))));
                        }, timeout);
                    });
                }

                return new Promise(function (resolve) {
                    resolve((typeof context === 'undefined' ? 'undefined' : babelHelpers.typeof(context)) === 'object' ? callback.call.apply(callback, [context].concat(babelHelpers.toConsumableArray(args))) : callback.apply.apply(callback, [context].concat(babelHelpers.toConsumableArray(args))));
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
                    var _Math;

                    eventId = (_Math = Math).max.apply(_Math, [eventId].concat(babelHelpers.toConsumableArray(event.keys())));
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
                                    return events.delete(eventId);
                                }
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
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
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
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

                var _args$splice2 = babelHelpers.slicedToArray(_args$splice, 1);

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
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
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

                var _args$splice4 = babelHelpers.slicedToArray(_args$splice3, 2);

                var event = _args$splice4[0];
                var timeout = _args$splice4[1];

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
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
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
            babelHelpers.classCallCheck(this, ComponentManager);

            this.components = new Map();
        }

        babelHelpers.createClass(ComponentManager, [{
            key: 'newComponent',
            value: function newComponent(componentId) {
                var component = this.components.get(componentId);

                if (component === null || component === undefined) {
                    return null;
                }

                switch (typeof component === 'undefined' ? 'undefined' : babelHelpers.typeof(component)) {
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
                var _Math;

                if (component === null || component === undefined) {
                    throw TypeError('component cannot be null.');
                }

                var max = (_Math = Math).max.apply(_Math, babelHelpers.toConsumableArray(this.components.keys()));

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
            babelHelpers.classCallCheck(this, EntityManager);
            var capacity = arguments.length <= 0 || arguments[0] === undefined ? 1000 : arguments[0];

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

        babelHelpers.createClass(EntityManager, [{
            key: 'increaseCapacity',
            value: function increaseCapacity() {
                var oldCapacity = this.capacity;

                this.capacity *= 2;

                for (var i = oldCapacity; i < this.capacity; ++i) {
                    this.entities[i] = 0;
                }

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.componentManager.getComponents().keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var componentId = _step.value;

                        for (var i = oldCapacity; i < this.capacity; ++i) {
                            this[componentId].push(this.componentManager.newComponent(componentId));
                        }
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
            value: function getEntities() {
                var components = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
                var type = arguments.length <= 1 || arguments[1] === undefined ? SelectorType.GetWith : arguments[1];
                var entityId;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.t0 = type;
                                _context.next = _context.t0 === SelectorType.GetWith ? 3 : _context.t0 === SelectorType.GetWithOnly ? 14 : _context.t0 === SelectorType.GetWithout ? 25 : _context.t0 === SelectorType.Get ? 36 : 46;
                                break;

                            case 3:
                                _context.t1 = regeneratorRuntime.keys(this.entities);

                            case 4:
                                if ((_context.t2 = _context.t1()).done) {
                                    _context.next = 13;
                                    break;
                                }

                                entityId = _context.t2.value;

                                if (!(entityId > this.currentMaxEntity)) {
                                    _context.next = 8;
                                    break;
                                }

                                return _context.abrupt('return');

                            case 8:
                                if (!(this.entities[entityId] !== 0 && (this.entities[entityId] & components) === components)) {
                                    _context.next = 11;
                                    break;
                                }

                                _context.next = 11;
                                return Math.floor(entityId);

                            case 11:
                                _context.next = 4;
                                break;

                            case 13:
                                return _context.abrupt('break', 46);

                            case 14:
                                _context.t3 = regeneratorRuntime.keys(this.entities);

                            case 15:
                                if ((_context.t4 = _context.t3()).done) {
                                    _context.next = 24;
                                    break;
                                }

                                entityId = _context.t4.value;

                                if (!(entityId > this.currentMaxEntity)) {
                                    _context.next = 19;
                                    break;
                                }

                                return _context.abrupt('return');

                            case 19:
                                if (!(this.entities[entityId] !== 0 && this.entities[entityId] === components)) {
                                    _context.next = 22;
                                    break;
                                }

                                _context.next = 22;
                                return Math.floor(entityId);

                            case 22:
                                _context.next = 15;
                                break;

                            case 24:
                                return _context.abrupt('break', 46);

                            case 25:
                                _context.t5 = regeneratorRuntime.keys(this.entities);

                            case 26:
                                if ((_context.t6 = _context.t5()).done) {
                                    _context.next = 35;
                                    break;
                                }

                                entityId = _context.t6.value;

                                if (!(entityId > this.currentMaxEntity)) {
                                    _context.next = 30;
                                    break;
                                }

                                return _context.abrupt('return');

                            case 30:
                                if (!(this.entities[entityId] !== 0 && (this.entities[entityId] & components) !== components)) {
                                    _context.next = 33;
                                    break;
                                }

                                _context.next = 33;
                                return Math.floor(entityId);

                            case 33:
                                _context.next = 26;
                                break;

                            case 35:
                                return _context.abrupt('break', 46);

                            case 36:
                                _context.t7 = regeneratorRuntime.keys(this.entities);

                            case 37:
                                if ((_context.t8 = _context.t7()).done) {
                                    _context.next = 45;
                                    break;
                                }

                                entityId = _context.t8.value;

                                if (!(entityId > this.currentMaxEntity)) {
                                    _context.next = 41;
                                    break;
                                }

                                return _context.abrupt('return');

                            case 41:
                                _context.next = 43;
                                return Math.floor(entityId);

                            case 43:
                                _context.next = 37;
                                break;

                            case 45:
                                return _context.abrupt('break', 46);

                            case 46:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }

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

                switch (typeof component === 'undefined' ? 'undefined' : babelHelpers.typeof(component)) {
                    case 'function':
                        initializer = component;break;
                    case 'object':
                        {
                            initializer = function () {
                                var _iteratorNormalCompletion2 = true;
                                var _didIteratorError2 = false;
                                var _iteratorError2 = undefined;

                                try {
                                    for (var _iterator2 = Object.keys(component)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                        var key = _step2.value;

                                        this[key] = component[key];
                                    }
                                } catch (err) {
                                    _didIteratorError2 = true;
                                    _iteratorError2 = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                            _iterator2.return();
                                        }
                                    } finally {
                                        if (_didIteratorError2) {
                                            throw _iteratorError2;
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
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = this.systemManager.logicSystems.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var system = _step3.value;

                        system.callback.call(this, this.getEntities(system.components, system.selector), delta);
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            }
        }, {
            key: 'onRender',
            value: function onRender(delta) {
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = this.systemManager.renderSystems.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var system = _step4.value;

                        system.callback.call(this, this.getEntities(system.components, system.selector), delta);
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
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

                return (_eventHandler$trigger = this.eventHandler.trigger).call.apply(_eventHandler$trigger, [this].concat(Array.prototype.slice.call(arguments)));
            }
        }, {
            key: 'triggerDelayed',
            value: function triggerDelayed() {
                var _eventHandler$trigger2;

                return (_eventHandler$trigger2 = this.eventHandler.triggerDelayed).call.apply(_eventHandler$trigger2, [this].concat(Array.prototype.slice.call(arguments)));
            }
        }]);
        return EntityManager;
    })();

    var EntityFactory = (function () {
        function EntityFactory() {
            babelHelpers.classCallCheck(this, EntityFactory);

            this.initializers = new Map();
            this.configuration = new Map();
        }

        babelHelpers.createClass(EntityFactory, [{
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

                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = configuration.keys()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var component = _step5.value;

                        components |= component;
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }

                var entities = [];

                for (var i = 0; i < count; ++i) {
                    var _entityId = entityManager.newEntity(components);

                    if (_entityId >= entityManager.capacity) {
                        continue;
                    }

                    var _iteratorNormalCompletion6 = true;
                    var _didIteratorError6 = false;
                    var _iteratorError6 = undefined;

                    try {
                        for (var _iterator6 = configuration[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                            var _step6$value = babelHelpers.slicedToArray(_step6.value, 2);

                            var componentId = _step6$value[0];
                            var initializer = _step6$value[1];

                            if (typeof initializer !== 'function') {
                                continue;
                            }

                            var result = initializer.call(entityManager[componentId][_entityId]);

                            if (typeof entityManager[componentId][_entityId] !== 'function' && babelHelpers.typeof(entityManager[componentId][_entityId]) !== 'object' && result !== undefined) {
                                entityManager[componentId][_entityId] = result;
                            }
                        }
                    } catch (err) {
                        _didIteratorError6 = true;
                        _iteratorError6 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                _iterator6.return();
                            }
                        } finally {
                            if (_didIteratorError6) {
                                throw _iteratorError6;
                            }
                        }
                    }

                    entities.push(_entityId);
                }

                return entities.length === 1 ? entities[0] : entities;
            }
        }]);
        return EntityFactory;
    })();

    var entityManager = new EntityManager();

    window.onload = function () {
        var Test = (function () {
            var ref = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var greeting;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return new Promise(function (resolve, reject) {
                                    resolve("hi");
                                }).then(function (result) {
                                    return result;
                                }).catch(function (error) {
                                    console.warn(error);
                                });

                            case 2:
                                greeting = _context.sent;

                                console.log(greeting);

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
            return function Test() {
                return ref.apply(this, arguments);
            };
        })();

        ;

        Test();

        console.log(entityManager);
        console.log(three);
    };

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0LmpzIiwic291cmNlcyI6WyIuLi8vaG9tZS91YnVudHUvd29ya3NwYWNlL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9zeXN0ZW0uanMiLCIuLi8vaG9tZS91YnVudHUvd29ya3NwYWNlL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9ldmVudC5qcyIsIi4uLy9ob21lL3VidW50dS93b3Jrc3BhY2Uvbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL3NyYy9jb3JlL2NvbXBvbmVudC5qcyIsIi4uLy9ob21lL3VidW50dS93b3Jrc3BhY2Uvbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL3NyYy9jb3JlL2VudGl0eS5qcyIsIi4uLy9ob21lL3VidW50dS93b3Jrc3BhY2UvdGVzdC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWxlY3RvclR5cGUgfSBmcm9tICcuL2VudGl0eSc7XG5cbmV4cG9ydCBjb25zdCBTeXN0ZW1UeXBlID0ge1xuICAgIExvZ2ljICAgOiAwLFxuICAgIFJlbmRlciAgOiAxXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTeXN0ZW1NYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5sb2dpY1N5c3RlbXMgID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnJlbmRlclN5c3RlbXMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyU3lzdGVtKHR5cGUsIHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAodHlwZSAhPT0gU3lzdGVtVHlwZS5Mb2dpYyAmJiB0eXBlICE9PSBTeXN0ZW1UeXBlLlJlbmRlcikge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCd0eXBlIG11c3QgYmUgYSB2YWxpZCBTeXN0ZW1UeXBlLicpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmIChzZWxlY3RvciAhPT0gU2VsZWN0b3JUeXBlLkdldCAmJiBzZWxlY3RvciAhPT0gU2VsZWN0b3JUeXBlLkdldFdpdGggJiZcbiAgICAgICAgICAgIHNlbGVjdG9yICE9PSBTZWxlY3RvclR5cGUuR2V0V2l0aE9ubHkgJiYgc2VsZWN0b3IgIT09IFNlbGVjdG9yVHlwZS5HZXRXaXRob3V0KSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ3NlbGVjdG9yIG11c3QgYmUgYSB2YWxpZCBTZWxlY3RvclR5cGUuJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50cyAhPT0gJ251bWJlcicpICB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvbXBvbmVudHMgbXVzdCBiZSBhIG51bWJlci4nKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBzeXN0ZW0gPSB7XG4gICAgICAgIHNlbGVjdG9yLFxuICAgICAgICBjb21wb25lbnRzLFxuICAgICAgICBjYWxsYmFja1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgbGV0IHN5c3RlbUlkID0gTWF0aC5tYXgoMCwgLi4udGhpcy5sb2dpY1N5c3RlbXMua2V5cygpLCAuLi50aGlzLnJlbmRlclN5c3RlbXMua2V5cygpKSArIDE7XG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgU3lzdGVtVHlwZS5Mb2dpYyA6IHRoaXMubG9naWNTeXN0ZW1zLnNldChzeXN0ZW1JZCwgc3lzdGVtKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFN5c3RlbVR5cGUuUmVuZGVyIDogdGhpcy5yZW5kZXJTeXN0ZW1zLnNldChzeXN0ZW1JZCwgc3lzdGVtKTsgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBzeXN0ZW1JZDtcbiAgICB9XG4gICAgXG4gICAgcmVtb3ZlU3lzdGVtKHN5c3RlbUlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2ljU3lzdGVtcy5kZWxldGUoc3lzdGVtSWQpIHx8IHRoaXMucmVuZGVyU3lzdGVtcy5kZWxldGUoc3lzdGVtSWQpO1xuICAgIH1cbn0iLCJpbXBvcnQgRW50aXR5TWFuYWdlciBmcm9tICcuL2VudGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50SGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBcbiAgICBlbXB0eVByb21pc2UoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHByb21pc2UoY2FsbGJhY2ssIGNvbnRleHQsIGFyZ3MsIHRpbWVvdXQpIHtcbiAgICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHlwZW9mIGNvbnRleHQgPT09ICAnb2JqZWN0JyA/IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgLi4uYXJncykgOiBjYWxsYmFjay5hcHBseShjb250ZXh0LCAuLi5hcmdzKSk7XG4gICAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh0eXBlb2YgY29udGV4dCA9PT0gJ29iamVjdCcgPyBjYWxsYmFjay5jYWxsKGNvbnRleHQsIC4uLmFyZ3MpIDogY2FsbGJhY2suYXBwbHkoY29udGV4dCwgLi4uYXJncykpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgbGlzdGVuKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKCF0aGlzLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5zZXQoZXZlbnQsIG5ldyBNYXAoKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBldmVudElkID0gLTE7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50SWQgPSBNYXRoLm1heChldmVudElkLCAuLi5ldmVudC5rZXlzKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICsrZXZlbnRJZDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZXZlbnRzLmdldChldmVudCkuc2V0KGV2ZW50SWQsIGNhbGxiYWNrKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBldmVudElkO1xuICAgIH1cbiAgICBcbiAgICBzdG9wTGlzdGVuKGV2ZW50SWQpIHtcbiAgICAgICAgZm9yIChsZXQgZXZlbnRzIG9mIHRoaXMuZXZlbnRzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpZCBvZiBldmVudHMua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlkID09PSBldmVudElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldmVudHMuZGVsZXRlKGV2ZW50SWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlcigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlciA/IHRoaXMuZXZlbnRIYW5kbGVyIDogdGhpcztcbiAgICAgICAgXG4gICAgICAgIGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xuICAgICAgICBcbiAgICAgICAgbGV0IFsgZXZlbnQgXSA9IGFyZ3Muc3BsaWNlKDAsIDEpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgIXNlbGYuZXZlbnRzLmhhcyhldmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmVtcHR5UHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGNhbGxiYWNrIG9mIHNlbGYuZXZlbnRzLmdldChldmVudCkudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goc2VsZi5wcm9taXNlKGNhbGxiYWNrLCB0aGlzLCBhcmdzLCAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXJEZWxheWVkKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXMgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyID8gdGhpcy5ldmVudEhhbmRsZXIgOiB0aGlzO1xuICAgICAgICBcbiAgICAgICAgbGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG4gICAgICAgIFxuICAgICAgICBsZXQgWyBldmVudCwgdGltZW91dCBdID0gYXJncy5zcGxpY2UoMCwgMik7XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCAhTnVtYmVyLmlzSW50ZWdlcih0aW1lb3V0KSB8fCAhc2VsZi5ldmVudHMuaGFzKGV2ZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuZW1wdHlQcm9taXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY2FsbGJhY2sgb2Ygc2VsZi5ldmVudHMuZ2V0KGV2ZW50KS52YWx1ZXMoKSkge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChzZWxmLnByb21pc2UoY2FsbGJhY2ssIHRoaXMsIGFyZ3MsIHRpbWVvdXQpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcG9uZW50TWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgXG4gICAgbmV3Q29tcG9uZW50KGNvbXBvbmVudElkKSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KGNvbXBvbmVudElkKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChjb21wb25lbnQgPT09IG51bGwgfHwgY29tcG9uZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzogcmV0dXJuIG5ldyBjb21wb25lbnQoKTtcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCcgIDoge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKGNvbXBvbmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmV0ID0ge307XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjb21wb25lbnQpLmZvckVhY2goa2V5ID0+IHJldFtrZXldID0gY29tcG9uZW50W2tleV0pO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgICAgICB9KShjb21wb25lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICAgICAgaWYgKGNvbXBvbmVudCA9PT0gbnVsbCB8fCBjb21wb25lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjb21wb25lbnQgY2Fubm90IGJlIG51bGwuJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBtYXggPSBNYXRoLm1heCguLi50aGlzLmNvbXBvbmVudHMua2V5cygpKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBpZCA9IG1heCA9PT0gdW5kZWZpbmVkIHx8IG1heCA9PT0gbnVsbCB8fCBtYXggPT09IC1JbmZpbml0eSA/IDEgOiBtYXggPT09IDAgPyAxIDogbWF4ICogMjtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudHMuc2V0KGlkLCBjb21wb25lbnQpO1xuXG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9XG4gICAgXG4gICAgZ2V0Q29tcG9uZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50cztcbiAgICB9XG59IiwiaW1wb3J0IENvbXBvbmVudE1hbmFnZXIgICAgICAgICAgICAgIGZyb20gJy4vY29tcG9uZW50JztcbmltcG9ydCBTeXN0ZW1NYW5hZ2VyLCB7IFN5c3RlbVR5cGUgfSBmcm9tICcuL3N5c3RlbSc7XG5pbXBvcnQgRXZlbnRIYW5kbGVyICAgICAgICAgICAgICAgICAgZnJvbSAnLi9ldmVudCc7XG5cbmV4cG9ydCBjb25zdCBTZWxlY3RvclR5cGUgPSB7XG4gICAgR2V0ICAgICAgICAgOiAwLFxuICAgIEdldFdpdGggICAgIDogMSxcbiAgICBHZXRXaXRoT25seSA6IDIsXG4gICAgR2V0V2l0aG91dCAgOiAzXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRpdHlNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcihjYXBhY2l0eSA9IDEwMDApIHtcbiAgICAgICAgdGhpcy5jYXBhY2l0eSAgICAgICAgID0gY2FwYWNpdHk7XG4gICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IC0xO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5ICAgID0gbmV3IEVudGl0eUZhY3RvcnkoKTtcbiAgICAgICAgdGhpcy5zeXN0ZW1NYW5hZ2VyICAgID0gbmV3IFN5c3RlbU1hbmFnZXIoKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRNYW5hZ2VyID0gbmV3IENvbXBvbmVudE1hbmFnZXIoKTtcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIgICAgID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdGllcyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IHRoaXMuY2FwYWNpdHkgfSwgKCkgPT4geyByZXR1cm4gMDsgfSApO1xuICAgIH1cbiAgICBcbiAgICBpbmNyZWFzZUNhcGFjaXR5KCkge1xuICAgICAgICBsZXQgb2xkQ2FwYWNpdHkgPSB0aGlzLmNhcGFjaXR5O1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jYXBhY2l0eSAqPSAyO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IG9sZENhcGFjaXR5OyBpIDwgdGhpcy5jYXBhY2l0eTsgKytpKSB7XG4gICAgICAgICAgICB0aGlzLmVudGl0aWVzW2ldID0gMDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY29tcG9uZW50SWQgb2YgdGhpcy5jb21wb25lbnRNYW5hZ2VyLmdldENvbXBvbmVudHMoKS5rZXlzKCkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBvbGRDYXBhY2l0eTsgaSA8IHRoaXMuY2FwYWNpdHk7ICsraSkge1xuICAgICAgICAgICAgICAgIHRoaXNbY29tcG9uZW50SWRdLnB1c2godGhpcy5jb21wb25lbnRNYW5hZ2VyLm5ld0NvbXBvbmVudChjb21wb25lbnRJZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG5ld0VudGl0eShjb21wb25lbnRzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50cyAhPT0gJ251bWJlcicgfHwgY29tcG9uZW50cyA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXBhY2l0eTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGVudGl0eUlkID0gMDtcbiAgICAgICAgXG4gICAgICAgIGZvciAoOyBlbnRpdHlJZCA8IHRoaXMuY2FwYWNpdHk7ICsrZW50aXR5SWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2VudGl0eUlkXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoZW50aXR5SWQgPj0gdGhpcy5jYXBhY2l0eSkge1xuICAgICAgICAgICAgLy8gdG9kbzogYXV0byBpbmNyZWFzZSBjYXBhY2l0eT9cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhcGFjaXR5O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoZW50aXR5SWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IGVudGl0eUlkO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eUlkXSA9IGNvbXBvbmVudHM7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZW50aXR5SWQ7XG4gICAgfVxuICAgIFxuICAgIGRlbGV0ZUVudGl0eShlbnRpdHlJZCkge1xuICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eUlkXSA9IDA7XG4gICAgICAgIFxuICAgICAgICBpZiAoZW50aXR5SWQgPCB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IGVudGl0eUlkOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbaV0gIT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSBpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAqZ2V0RW50aXRpZXMoY29tcG9uZW50cyA9IDAsIHR5cGUgPSBTZWxlY3RvclR5cGUuR2V0V2l0aCkge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgU2VsZWN0b3JUeXBlLkdldFdpdGg6IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRpdHlJZCBpbiB0aGlzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdHlJZCA+IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gIT09IDAgJiYgKHRoaXMuZW50aXRpZXNbZW50aXR5SWRdICYgY29tcG9uZW50cykgPT09IGNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIE1hdGguZmxvb3IoZW50aXR5SWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBTZWxlY3RvclR5cGUuR2V0V2l0aE9ubHk6IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRpdHlJZCBpbiB0aGlzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdHlJZCA+IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gIT09IDAgJiYgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gPT09IGNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIE1hdGguZmxvb3IoZW50aXR5SWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBTZWxlY3RvclR5cGUuR2V0V2l0aG91dDoge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGVudGl0eUlkIGluIHRoaXMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0eUlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2VudGl0eUlkXSAhPT0gMCAmJiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gJiBjb21wb25lbnRzKSAhPT0gY29tcG9uZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgeWllbGQgTWF0aC5mbG9vcihlbnRpdHlJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFNlbGVjdG9yVHlwZS5HZXQ6IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRpdHlJZCBpbiB0aGlzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdHlJZCA+IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB5aWVsZCBNYXRoLmZsb29yKGVudGl0eUlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDb21wb25lbnQgTWFuYWdlclxuICAgIFxuICAgIHJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCkge1xuICAgICAgICBsZXQgY29tcG9uZW50SWQgPSB0aGlzLmNvbXBvbmVudE1hbmFnZXIucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXNbY29tcG9uZW50SWRdID0gW107XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2FwYWNpdHk7ICsraSkge1xuICAgICAgICAgICAgdGhpc1tjb21wb25lbnRJZF0ucHVzaCh0aGlzLmNvbXBvbmVudE1hbmFnZXIubmV3Q29tcG9uZW50KGNvbXBvbmVudElkKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBpbml0aWFsaXplcjtcblxuICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzogaW5pdGlhbGl6ZXIgPSBjb21wb25lbnQ7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnb2JqZWN0Jzoge1xuICAgICAgICAgICAgICAgIGluaXRpYWxpemVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhjb21wb25lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBjb21wb25lbnRba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6IGluaXRpYWxpemVyID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb21wb25lbnQ7IH07IGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkucmVnaXN0ZXJJbml0aWFsaXplcihjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudElkO1xuICAgIH1cbiAgICBcbiAgICBhZGRDb21wb25lbnQoZW50aXR5SWQsIGNvbXBvbmVudElkKSB7XG4gICAgICAgIHRoaXMuZW50aXRpZXNbZW50aXR5SWRdIHw9IGNvbXBvbmVudElkO1xuICAgIH1cbiAgICBcbiAgICByZW1vdmVDb21wb25lbnQoZW50aXR5SWQsIGNvbXBvbmVudElkKSB7XG4gICAgICAgIHRoaXMuZW50aXRpZXNbZW50aXR5SWRdICY9IH5jb21wb25lbnRJZDtcbiAgICB9XG4gICAgXG4gICAgLy8gU3lzdGVtIE1hbmFnZXJcbiAgICBcbiAgICByZWdpc3RlclN5c3RlbSh0eXBlLCBzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbSh0eXBlLCBzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spO1xuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckxvZ2ljU3lzdGVtKHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlZ2lzdGVyU3lzdGVtKFN5c3RlbVR5cGUuTG9naWMsIHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyUmVuZGVyU3lzdGVtKHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlZ2lzdGVyU3lzdGVtKFN5c3RlbVR5cGUuUmVuZGVyLCBzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spO1xuICAgIH1cbiAgICBcbiAgICByZW1vdmVTeXN0ZW0oc3lzdGVtSWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZW1vdmVTeXN0ZW0oc3lzdGVtSWQpO1xuICAgIH1cbiAgICBcbiAgICBvbkxvZ2ljKGRlbHRhKSB7XG4gICAgICAgIGZvciAobGV0IHN5c3RlbSBvZiB0aGlzLnN5c3RlbU1hbmFnZXIubG9naWNTeXN0ZW1zLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBzeXN0ZW0uY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLmdldEVudGl0aWVzKHN5c3RlbS5jb21wb25lbnRzLCBzeXN0ZW0uc2VsZWN0b3IpLCBkZWx0YSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgb25SZW5kZXIoZGVsdGEpIHtcbiAgICAgICAgZm9yIChsZXQgc3lzdGVtIG9mIHRoaXMuc3lzdGVtTWFuYWdlci5yZW5kZXJTeXN0ZW1zLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBzeXN0ZW0uY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLmdldEVudGl0aWVzKHN5c3RlbS5jb21wb25lbnRzLCBzeXN0ZW0uc2VsZWN0b3IpLCBkZWx0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBFbnRpdHkgRmFjdG9yeVxuICAgIFxuICAgIHJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS5yZWdpc3RlckluaXRpYWxpemVyKGNvbXBvbmVudElkLCBpbml0aWFsaXplcik7XG4gICAgfVxuICAgIFxuICAgIGJ1aWxkKCkge1xuICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkuYnVpbGQoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICB3aXRoQ29tcG9uZW50KGNvbXBvbmVudElkLCBpbml0aWFsaXplcikge1xuICAgICAgICB0aGlzLmVudGl0eUZhY3Rvcnkud2l0aENvbXBvbmVudChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZUNvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVudGl0eUZhY3RvcnkuY3JlYXRlQ29uZmlndXJhdGlvbigpO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGUoY291bnQsIGNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW50aXR5RmFjdG9yeS5jcmVhdGUodGhpcywgY291bnQsIGNvbmZpZ3VyYXRpb24pO1xuICAgIH1cbiAgICBcbiAgICAvLyBFdmVudCBIYW5kbGVyXG4gICAgXG4gICAgbGlzdGVuKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIubGlzdGVuKGV2ZW50LCBjYWxsYmFjayk7XG4gICAgfVxuICAgIFxuICAgIHN0b3BMaXN0ZW4oZXZlbnRJZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIuc3RvcExpc3RlbihldmVudElkKTtcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLnRyaWdnZXIuY2FsbCh0aGlzLCAuLi5hcmd1bWVudHMpO1xuICAgIH1cbiAgICBcbiAgICB0cmlnZ2VyRGVsYXllZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLnRyaWdnZXJEZWxheWVkLmNhbGwodGhpcywgLi4uYXJndW1lbnRzKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFbnRpdHlGYWN0b3J5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplcnMgID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihjb21wb25lbnRJZCkgfHwgdHlwZW9mIGluaXRpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXJzLnNldChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpO1xuICAgIH1cbiAgICBcbiAgICBidWlsZCgpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gbmV3IE1hcCgpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIHdpdGhDb21wb25lbnQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihjb21wb25lbnRJZCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGluaXRpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBpbml0aWFsaXplciA9IHRoaXMuaW5pdGlhbGl6ZXJzLmdldChjb21wb25lbnRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5zZXQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGVDb25maWd1cmF0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGUoZW50aXR5TWFuYWdlciwgY291bnQgPSAxLCBjb25maWd1cmF0aW9uID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICghKGVudGl0eU1hbmFnZXIgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyKSkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGNvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uIHx8IHRoaXMuY29uZmlndXJhdGlvbjtcblxuICAgICAgICBsZXQgY29tcG9uZW50cyA9IDA7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBjb21wb25lbnQgb2YgY29uZmlndXJhdGlvbi5rZXlzKCkpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMgfD0gY29tcG9uZW50O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgZW50aXRpZXMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7ICsraSkge1xuICAgICAgICAgICAgbGV0IGVudGl0eUlkID0gZW50aXR5TWFuYWdlci5uZXdFbnRpdHkoY29tcG9uZW50cyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChlbnRpdHlJZCA+PSBlbnRpdHlNYW5hZ2VyLmNhcGFjaXR5KSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IFtjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXJdIG9mIGNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGluaXRpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gaW5pdGlhbGl6ZXIuY2FsbChlbnRpdHlNYW5hZ2VyW2NvbXBvbmVudElkXVtlbnRpdHlJZF0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZW50aXR5TWFuYWdlcltjb21wb25lbnRJZF1bZW50aXR5SWRdICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBlbnRpdHlNYW5hZ2VyW2NvbXBvbmVudElkXVtlbnRpdHlJZF0gIT09ICdvYmplY3QnICYmIHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eU1hbmFnZXJbY29tcG9uZW50SWRdW2VudGl0eUlkXSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGVudGl0aWVzLnB1c2goZW50aXR5SWQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZW50aXRpZXMubGVuZ3RoID09PSAxID8gZW50aXRpZXNbMF0gOiBlbnRpdGllcztcbiAgICB9XG59IiwiaW1wb3J0IHsgRW50aXR5TWFuYWdlciB9IGZyb20gJ2dnLWVudGl0aWVzJztcbmltcG9ydCB0aHJlZSBmcm9tICd0aHJlZSc7XG5cbmNvbnN0IGVudGl0eU1hbmFnZXIgPSBuZXcgRW50aXR5TWFuYWdlcigpO1xuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgYXN5bmMgZnVuY3Rpb24gVGVzdCgpIHtcbiAgICAgICAgY29uc3QgZ3JlZXRpbmcgPSBhd2FpdCBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoXCJoaVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICBjb25zb2xlLmxvZyhncmVldGluZyk7XG4gICAgfTtcblxuICAgIFRlc3QoKTtcblxuICAgIGNvbnNvbGUubG9nKGVudGl0eU1hbmFnZXIpO1xuICAgIGNvbnNvbGUubG9nKHRocmVlKTtcbn07Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTyxJQUFNLFVBQVUsR0FBRzthQUNqQixFQUFLLENBQUM7Y0FDTCxFQUFJO0tBQ2I7O1FBRW9CLGFBQWE7aUJBQWIsYUFBYSxHQUNoQjs4Q0FERyxhQUFhOztnQkFFdEIsQ0FBQyxZQUFZLEdBQUksSUFBSSxHQUFHLEVBQUU7Z0JBQzFCLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxFQUFFOzs7aUNBSGpCLGFBQWE7OzJDQU1mLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRTs7O29CQUM3QyxJQUFJLEtBQUssVUFBVSxDQUFDLEtBQUssSUFBSSxJQUFJLEtBQUssVUFBVSxDQUFDLE1BQU0sRUFBRTswQkFDbkQsU0FBUyxDQUFDLGtDQUFrQyxDQUFDOzs7b0JBR25ELFFBQVEsS0FBSyxZQUFZLENBQUMsR0FBRyxJQUFJLFFBQVEsS0FBSyxZQUFZLENBQUMsT0FBTyxJQUNsRSxRQUFRLEtBQUssWUFBWSxDQUFDLFdBQVcsSUFBSSxRQUFRLEtBQUssWUFBWSxDQUFDLFVBQVUsRUFBRTswQkFDekUsU0FBUyxDQUFDLHdDQUF3QyxDQUFDOzs7b0JBR3pELE9BQU8sVUFBVSxLQUFLLFFBQVEsRUFBRzswQkFDM0IsU0FBUyxDQUFDLDhCQUE4QixDQUFDOzs7b0JBRy9DLE9BQU8sUUFBUSxLQUFLLFVBQVUsRUFBRTswQkFDMUIsU0FBUyxDQUFDLDhCQUE4QixDQUFDOzs7b0JBRy9DLE1BQU0sR0FBRzs0QkFDTCxFQUFSLFFBQVE7OEJBQ0UsRUFBVixVQUFVOzRCQUNGLEVBQVI7aUJBQ0M7O29CQUVHLFFBQVEsR0FBRyxTQUFBLElBQUksRUFBQyxHQUFHLE1BQUEsU0FBQyxDQUFDLHdDQUFLLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLGtDQUFLLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEdBQUMsR0FBRyxDQUFDOzt3QkFFakYsSUFBSTt5QkFDSCxVQUFVLENBQUMsS0FBSzs0QkFBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO3lCQUMzRCxVQUFVLENBQUMsTUFBTTs0QkFBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDOzs7dUJBRy9ELFFBQVE7Ozs7eUNBR04sUUFBUSxFQUFFO3VCQUNaLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQzs7O2VBekNuRSxhQUFhOzs7UUNMYixZQUFZO2lCQUFaLFlBQVksR0FDZjs4Q0FERyxZQUFZOztnQkFFckIsQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUU7OztpQ0FGVixZQUFZOzsyQ0FLZDt1QkFDSixJQUFJLE9BQU8sQ0FBQyxVQUFBLE9BQU8sRUFBSTsyQkFDbkIsRUFBRTtpQkFDWixDQUFDOzs7O29DQUdFLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtvQkFDbEMsT0FBTyxFQUFFOzJCQUNGLElBQUksT0FBTyxDQUFDLFVBQUEsT0FBTyxFQUFJO2tDQUNoQixDQUFDLFlBQVU7bUNBQ1YsQ0FBQyxRQUFPLE9BQU8scURBQVAsT0FBTyxPQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxNQUFBLENBQWIsUUFBUSxHQUFNLE9BQU8sd0NBQUssSUFBSSxHQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssTUFBQSxDQUFkLFFBQVEsR0FBTyxPQUFPLHdDQUFLLElBQUksR0FBQyxDQUFDO3lCQUM3RyxFQUFFLE9BQU8sQ0FBQztxQkFDZCxDQUFDOzs7dUJBR0MsSUFBSSxPQUFPLENBQUMsVUFBQSxPQUFPLEVBQUk7MkJBQ25CLENBQUMsUUFBTyxPQUFPLHFEQUFQLE9BQU8sT0FBSyxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksTUFBQSxDQUFiLFFBQVEsR0FBTSxPQUFPLHdDQUFLLElBQUksR0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLE1BQUEsQ0FBZCxRQUFRLEdBQU8sT0FBTyx3Q0FBSyxJQUFJLEdBQUMsQ0FBQztpQkFDNUcsQ0FBQzs7OzttQ0FHQyxLQUFLLEVBQUUsUUFBUSxFQUFFO29CQUNoQixPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksT0FBTyxRQUFRLEtBQUssVUFBVSxFQUFFOzs7O29CQUk3RCxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO3dCQUNyQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksR0FBRyxFQUFFLENBQUM7OztvQkFHakMsT0FBTyxHQUFHLENBQUMsQ0FBQzs7b0JBRVosQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxFQUFJOzs7MkJBQ2xCLEdBQUcsU0FBQSxJQUFJLEVBQUMsR0FBRyxNQUFBLFNBQUMsT0FBTyx3Q0FBSyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUM7aUJBQy9DLENBQUM7O2tCQUVBLE9BQU87O29CQUVMLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQzs7dUJBRXRDLE9BQU87Ozs7dUNBR1AsT0FBTyxFQUFFOzs7Ozs7eUNBQ0csSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsOEhBQUU7NEJBQWhDLE1BQU07Ozs7OztrREFDSSxNQUFNLENBQUMsSUFBSSxFQUFFLG1JQUFFO29DQUFyQixFQUFFOztvQ0FDSCxFQUFFLEtBQUssT0FBTyxFQUFFOzJDQUNULE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBS2xDLEtBQUs7Ozs7c0NBR047b0JBQ0YsSUFBSSxHQUFHLElBQUksWUFBWSxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJOztvQkFFL0QsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDOzttQ0FFaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzs7O29CQUEzQixLQUFLOztvQkFFUCxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTsyQkFDL0MsSUFBSSxDQUFDLFlBQVksRUFBRTs7O29CQUcxQixRQUFRLEdBQUcsRUFBRTs7Ozs7OzswQ0FFSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsbUlBQUU7NEJBQTdDLFFBQVE7O2dDQUNMLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O3VCQUdqRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQzs7Ozs2Q0FHZjtvQkFDVCxJQUFJLEdBQUcsSUFBSSxZQUFZLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUk7O29CQUUvRCxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7O29DQUVQLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7OztvQkFBcEMsS0FBSztvQkFBRSxPQUFPOztvQkFFaEIsT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFOzJCQUM3RSxJQUFJLENBQUMsWUFBWSxFQUFFOzs7b0JBRzFCLFFBQVEsR0FBRyxFQUFFOzs7Ozs7OzBDQUVJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRSxtSUFBRTs0QkFBN0MsUUFBUTs7Z0NBQ0wsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBR3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDOzs7ZUFoR2YsWUFBWTs7O1FDRlosZ0JBQWdCO2lCQUFoQixnQkFBZ0IsR0FDbkI7OENBREcsZ0JBQWdCOztnQkFFekIsQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQUU7OztpQ0FGZCxnQkFBZ0I7O3lDQUtwQixXQUFXLEVBQUU7b0JBQ2xCLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7O29CQUU1QyxTQUFTLEtBQUssSUFBSSxJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7MkJBQ3hDLElBQUk7OzsrQkFHQSxTQUFTLHFEQUFULFNBQVM7eUJBQ2YsVUFBVTsrQkFBUyxJQUFJLFNBQVMsRUFBRTt5QkFDbEMsUUFBUTs7bUNBQ0YsQ0FBQyxVQUFDLFNBQVMsRUFBSztvQ0FDZixHQUFHLEdBQUcsRUFBRTs7c0NBRU4sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRzsyQ0FBSSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQztpQ0FBQSxDQUFDOzt1Q0FFekQsR0FBRzs2QkFDYixDQUFBLENBQUUsU0FBUyxDQUFDOzs7O3VCQUlkLFNBQVM7Ozs7OENBR0YsU0FBUyxFQUFFOzs7b0JBQ3JCLFNBQVMsS0FBSyxJQUFJLElBQUksU0FBUyxLQUFLLFNBQVMsRUFBRTswQkFDekMsU0FBUyxDQUFDLDJCQUEyQixDQUFDOzs7b0JBRzVDLEdBQUcsR0FBRyxTQUFBLElBQUksRUFBQyxHQUFHLE1BQUEsdUNBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsRUFBQzs7b0JBRXpDLEVBQUUsR0FBRyxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQzs7b0JBRXpGLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDOzt1QkFFM0IsRUFBRTs7Ozs0Q0FHRzt1QkFDTCxJQUFJLENBQUMsVUFBVTs7O2VBM0NULGdCQUFnQjs7O0lDSTlCLElBQU0sWUFBWSxHQUFHO1dBQ3JCLEVBQVcsQ0FBQztlQUNSLEVBQU8sQ0FBQzttQkFDSixFQUFHLENBQUM7a0JBQ0wsRUFBSTtLQUNqQjs7UUFFb0IsYUFBYTtpQkFBYixhQUFhLEdBQ0Q7OENBRFosYUFBYTtnQkFDbEIsUUFBUSx5REFBRyxJQUFJOztnQkFDbkIsQ0FBQyxRQUFRLEdBQVcsUUFBUTtnQkFDNUIsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7O2dCQUV0QixDQUFDLGFBQWEsR0FBTSxJQUFJLGFBQWEsRUFBRTtnQkFDdkMsQ0FBQyxhQUFhLEdBQU0sSUFBSSxhQUFhLEVBQUU7Z0JBQ3ZDLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRTtnQkFDMUMsQ0FBQyxZQUFZLEdBQU8sSUFBSSxZQUFZLEVBQUU7O2dCQUV0QyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxZQUFNO3VCQUFTLENBQUM7YUFBRyxDQUFFOzs7aUNBVjlELGFBQWE7OytDQWFYO29CQUNYLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUTs7b0JBRTNCLENBQUMsUUFBUSxJQUFJLENBQUM7O3FCQUViLElBQUksQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRTt3QkFDMUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQzs7Ozs7Ozs7eUNBR0EsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksRUFBRSw4SEFBRTs0QkFBN0QsV0FBVzs7NkJBQ1gsSUFBSSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFO2dDQUMxQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0FLekUsVUFBVSxFQUFFO29CQUNkLE9BQU8sVUFBVSxLQUFLLFFBQVEsSUFBSSxVQUFVLElBQUksQ0FBQyxFQUFFOzJCQUM1QyxJQUFJLENBQUMsUUFBUTs7O29CQUdwQixRQUFRLEdBQUcsQ0FBQzs7dUJBRVQsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUU7d0JBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFOzs7OztvQkFLbkMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7OzJCQUVwQixJQUFJLENBQUMsUUFBUTs7O29CQUdwQixRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFO3dCQUM5QixDQUFDLGdCQUFnQixHQUFHLFFBQVE7OztvQkFHaEMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsVUFBVTs7dUJBRTdCLFFBQVE7Ozs7eUNBR04sUUFBUSxFQUFFO29CQUNmLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7O29CQUV2QixRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFOzs7O3FCQUlqQyxJQUFJLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTt3QkFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUU7NEJBQ3BCLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQzs7Ozs7Ozs7O29CQU94QixVQUFVLHlEQUFHLENBQUM7b0JBQUUsSUFBSSx5REFBRyxZQUFZLENBQUMsT0FBTztvQkEwQ25DLFFBQVE7Ozs7OzhDQXpDakIsSUFBSTtnRUFDSCxZQUFZLENBQUMsT0FBTyx1QkFhcEIsWUFBWSxDQUFDLFdBQVcsd0JBYXhCLFlBQVksQ0FBQyxVQUFVLHdCQWF2QixZQUFZLENBQUMsR0FBRzs7OztzRUF0Q0ksSUFBSSxDQUFDLFFBQVE7Ozs7Ozs7O3dDQUFqQjs7c0NBQ1QsUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQTs7Ozs7Ozs7c0NBSWhDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxVQUFVLENBQUEsS0FBTSxVQUFVLENBQUE7Ozs7Ozt1Q0FDaEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7Ozs7c0VBT2IsSUFBSSxDQUFDLFFBQVE7Ozs7Ozs7O3dDQUFqQjs7c0NBQ1QsUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQTs7Ozs7Ozs7c0NBSWhDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssVUFBVSxDQUFBOzs7Ozs7dUNBQ2pFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDOzs7Ozs7Ozs7O3NFQU9iLElBQUksQ0FBQyxRQUFROzs7Ozs7Ozt3Q0FBakI7O3NDQUNULFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUE7Ozs7Ozs7O3NDQUloQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsVUFBVSxDQUFBLEtBQU0sVUFBVSxDQUFBOzs7Ozs7dUNBQ2hGLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDOzs7Ozs7Ozs7O3NFQU9iLElBQUksQ0FBQyxRQUFROzs7Ozs7Ozt3Q0FBakI7O3NDQUNULFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUE7Ozs7Ozs7Ozt1Q0FJOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4Q0FVeEIsU0FBUyxFQUFFO29CQUNyQixXQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQzs7b0JBRWhFLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRTs7cUJBRWpCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRTt3QkFDaEMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQzs7O29CQUd2RSxXQUFXLFlBQUE7OytCQUVBLFNBQVMscURBQVQsU0FBUzt5QkFDZixVQUFVO21DQUFhLEdBQUcsU0FBUyxDQUFDO3lCQUNwQyxRQUFROzt1Q0FDRSxHQUFHLFlBQVc7Ozs7OzswREFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtSUFBRTs0Q0FBL0IsR0FBRzs7NENBQ0osQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OzZCQUVqQzs7Ozs7bUNBSWUsR0FBRyxZQUFXO21DQUFTLFNBQVM7eUJBQUcsQ0FBQzs7O29CQUd4RCxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDOzt1QkFFekQsV0FBVzs7Ozt5Q0FHVCxRQUFRLEVBQUUsV0FBVyxFQUFFO29CQUM1QixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxXQUFXOzs7OzRDQUcxQixRQUFRLEVBQUUsV0FBVyxFQUFFO29CQUMvQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVc7Ozs7Ozs7MkNBSzVCLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRTt1QkFDMUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDOzs7O2dEQUc5RCxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRTt1QkFDekMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQzs7OztpREFHekUsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUU7dUJBQzFDLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUM7Ozs7eUNBR2xGLFFBQVEsRUFBRTt1QkFDWixJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7Ozs7b0NBRzVDLEtBQUssRUFBRTs7Ozs7OzBDQUNRLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxtSUFBRTs0QkFBcEQsTUFBTTs7OEJBQ0wsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQ0FJdEYsS0FBSyxFQUFFOzs7Ozs7MENBQ08sSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLG1JQUFFOzRCQUFyRCxNQUFNOzs4QkFDTCxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsS0FBSyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dEQU0zRSxXQUFXLEVBQUUsV0FBVyxFQUFFO29CQUN0QyxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDOzs7O29DQUc1RDtvQkFDQSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUU7O3VCQUVuQixJQUFJOzs7OzBDQUdELFdBQVcsRUFBRSxXQUFXLEVBQUU7b0JBQ2hDLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDOzt1QkFFbkQsSUFBSTs7OztrREFHTzt1QkFDWCxJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixFQUFFOzs7O21DQUc1QyxLQUFLLEVBQUUsYUFBYSxFQUFFO3VCQUNsQixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLGFBQWEsQ0FBQzs7Ozs7OzttQ0FLekQsS0FBSyxFQUFFLFFBQVEsRUFBRTt1QkFDYixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDOzs7O3VDQUd6QyxPQUFPLEVBQUU7dUJBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDOzs7O3NDQUd0Qzs7O3VCQUNDLHlCQUFBLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFDLElBQUksTUFBQSx5QkFBQyxJQUFJLG9DQUFLLFNBQVMsR0FBQzs7Ozs2Q0FHNUM7Ozt1QkFDTiwwQkFBQSxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBQyxJQUFJLE1BQUEsMEJBQUMsSUFBSSxvQ0FBSyxTQUFTLEdBQUM7OztlQTlPbkQsYUFBYTs7O1FBa1ByQixhQUFhO2lCQUFiLGFBQWEsR0FDUjs4Q0FETCxhQUFhOztnQkFFZCxDQUFDLFlBQVksR0FBSSxJQUFJLEdBQUcsRUFBRTtnQkFDMUIsQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQUU7OztpQ0FIekIsYUFBYTs7Z0RBTUYsV0FBVyxFQUFFLFdBQVcsRUFBRTtvQkFDdEMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLE9BQU8sV0FBVyxLQUFLLFVBQVUsRUFBRTs7OztvQkFJckUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUM7Ozs7b0NBRzNDO29CQUNBLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxFQUFFOzt1QkFFdkIsSUFBSTs7OzswQ0FHRCxXQUFXLEVBQUUsV0FBVyxFQUFFO29CQUNoQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQUU7MkJBQ3pCLElBQUk7OztvQkFHWCxPQUFPLFdBQVcsS0FBSyxVQUFVLEVBQUU7K0JBQ3hCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDOzs7b0JBR2hELENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDOzt1QkFFekMsSUFBSTs7OztrREFHTzt1QkFDWCxJQUFJLENBQUMsYUFBYTs7OzttQ0FHdEIsYUFBYSxFQUF3QztvQkFBdEMsS0FBSyx5REFBRyxDQUFDO29CQUFFLGFBQWEseURBQUcsU0FBUzs7b0JBQ2xELEVBQUUsYUFBYSxZQUFZLGFBQWEsQ0FBQSxFQUFHOzJCQUNwQyxFQUFFOzs7NkJBR0EsR0FBRyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWE7O29CQUUvQyxVQUFVLEdBQUcsQ0FBQzs7Ozs7OzswQ0FFSSxhQUFhLENBQUMsSUFBSSxFQUFFLG1JQUFFOzRCQUFuQyxTQUFTOztrQ0FDSixJQUFJLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQUd2QixRQUFRLEdBQUcsRUFBRTs7cUJBRVosSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUU7d0JBQ3hCLFNBQVEsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzs7d0JBRTlDLFNBQVEsSUFBSSxhQUFhLENBQUMsUUFBUSxFQUFFOzs7Ozs7Ozs7OENBSUQsYUFBYSxtSUFBRTs7O2dDQUE1QyxXQUFXO2dDQUFFLFdBQVc7O2dDQUMxQixPQUFPLFdBQVcsS0FBSyxVQUFVLEVBQUU7Ozs7Z0NBSW5DLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFRLENBQUMsQ0FBQzs7Z0NBRS9ELE9BQU8sYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVEsQ0FBQyxLQUFLLFVBQVUsSUFBSSxvQkFBTyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUSxDQUFDLE1BQUssUUFBUSxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7NkNBQ25JLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUSxDQUFDLEdBQUcsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQUk3QyxDQUFDLElBQUksQ0FBQyxTQUFRLENBQUM7Ozt1QkFHcEIsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVE7OztlQTNFaEQsYUFBYTs7O0lDMVAxQixJQUFNLGFBQWEsR0FBRyxJQUFJLGFBQWEsRUFBRTs7SUFFekMsTUFBTSxDQUFDLE1BQU0sR0FBRyxZQUFXOzs0RUFDdkI7b0JBQ1UsUUFBUTs7Ozs7O3VDQUFTLElBQUksT0FBTyxDQUFDLFVBQVMsT0FBTyxFQUFFLE1BQU0sRUFBRTsyQ0FDMUIsQ0FBQyxJQUFJLENBQUM7aUNBQ2hCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBUyxNQUFNLEVBQUU7MkNBQ2QsTUFBTTtpQ0FDaEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFTLEtBQUssRUFBRTsyQ0FDZCxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7aUNBQ3RCLENBQUM7Ozt3Q0FOWjs7dUNBUVAsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDOzs7Ozs7OzthQUN4Qjs0QkFWYyxJQUFJOzs7Ozs7O1lBWWYsRUFBRTs7ZUFFQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7ZUFDbkIsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO0tBQ3JCOzsifQ==