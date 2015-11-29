(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('three')) :
	typeof define === 'function' && define.amd ? define('GG', ['three'], factory) :
	factory(global.THREE);
}(this, function (three) { 'use strict';

	three = 'default' in three ? three['default'] : three;

	var __commonjs_global = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this;

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

	var _arguments = arguments;
	var SelectorType = {
	    Get: 0,
	    GetWith: 1,
	    GetWithOnly: 2,
	    GetWithout: 3
	};

	var EntityManager = (function () {
	    function EntityManager() {
	        var capacity = arguments.length <= 0 || arguments[0] === undefined ? 1000 : arguments[0];
	        babelHelpers.classCallCheck(this, EntityManager);

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
	        value: regeneratorRuntime.mark(function getEntities() {
	            var components = _arguments.length <= 0 || _arguments[0] === undefined ? 0 : _arguments[0];
	            var type = _arguments.length <= 1 || _arguments[1] === undefined ? SelectorType.GetWith : _arguments[1];
	            var entityId;
	            return regeneratorRuntime.wrap(function getEntities$(_context) {
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

	var ThreeRendererManager = (function () {
	    function ThreeRendererManager() {
	        babelHelpers.classCallCheck(this, ThreeRendererManager);

	        this.renderer = new three.WebGLRenderer({ antialias: true });
	        this.camera = new three.PerspectiveCamera();

	        this.renderer.setSize(window.innerWidth, window.innerHeight);

	        document.body.appendChild(this.renderer.domElement);

	        this.camera.position.y = 20;
	        this.camera.position.z = 20;

	        this.camera.lookAt(new three.Vector3(0.0, 0.0, 0.0));
	    }

	    babelHelpers.createClass(ThreeRendererManager, [{
	        key: 'render',
	        value: function render(scene, interpolationPercentage) {
	            this.renderer.render(scene, this.camera);
	        }
	    }]);
	    return ThreeRendererManager;
	})();

	var Stats = (function (module) {
		var exports = module.exports;
		/**
	  * @author mrdoob / http://mrdoob.com/
	  */

		var Stats = function Stats() {

			var now = self.performance && self.performance.now ? self.performance.now.bind(performance) : Date.now;

			var startTime = now(),
			    prevTime = startTime;
			var frames = 0,
			    mode = 0;

			function createElement(tag, id, css) {

				var element = document.createElement(tag);
				element.id = id;
				element.style.cssText = css;
				return element;
			}

			function createPanel(id, fg, bg) {

				var div = createElement('div', id, 'padding:0 0 3px 3px;text-align:left;background:' + bg);

				var text = createElement('div', id + 'Text', 'font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px;color:' + fg);
				text.innerHTML = id.toUpperCase();
				div.appendChild(text);

				var graph = createElement('div', id + 'Graph', 'width:74px;height:30px;background:' + fg);
				div.appendChild(graph);

				for (var i = 0; i < 74; i++) {

					graph.appendChild(createElement('span', '', 'width:1px;height:30px;float:left;opacity:0.9;background:' + bg));
				}

				return div;
			}

			function setMode(value) {

				var children = container.children;

				for (var i = 0; i < children.length; i++) {

					children[i].style.display = i === value ? 'block' : 'none';
				}

				mode = value;
			}

			function updateGraph(dom, value) {

				var child = dom.appendChild(dom.firstChild);
				child.style.height = Math.min(30, 30 - value * 30) + 'px';
			}

			//

			var container = createElement('div', 'stats', 'width:80px;opacity:0.9;cursor:pointer');
			container.addEventListener('mousedown', function (event) {

				event.preventDefault();
				setMode(++mode % container.children.length);
			}, false);

			// FPS

			var fps = 0,
			    fpsMin = Infinity,
			    fpsMax = 0;

			var fpsDiv = createPanel('fps', '#0ff', '#002');
			var fpsText = fpsDiv.children[0];
			var fpsGraph = fpsDiv.children[1];

			container.appendChild(fpsDiv);

			// MS

			var ms = 0,
			    msMin = Infinity,
			    msMax = 0;

			var msDiv = createPanel('ms', '#0f0', '#020');
			var msText = msDiv.children[0];
			var msGraph = msDiv.children[1];

			container.appendChild(msDiv);

			// MEM

			if (self.performance && self.performance.memory) {

				var mem = 0,
				    memMin = Infinity,
				    memMax = 0;

				var memDiv = createPanel('mb', '#f08', '#201');
				var memText = memDiv.children[0];
				var memGraph = memDiv.children[1];

				container.appendChild(memDiv);
			}

			//

			setMode(mode);

			return {

				REVISION: 14,

				domElement: container,

				setMode: setMode,

				begin: function begin() {

					startTime = now();
				},

				end: function end() {

					var time = now();

					ms = time - startTime;
					msMin = Math.min(msMin, ms);
					msMax = Math.max(msMax, ms);

					msText.textContent = (ms | 0) + ' MS (' + (msMin | 0) + '-' + (msMax | 0) + ')';
					updateGraph(msGraph, ms / 200);

					frames++;

					if (time > prevTime + 1000) {

						fps = Math.round(frames * 1000 / (time - prevTime));
						fpsMin = Math.min(fpsMin, fps);
						fpsMax = Math.max(fpsMax, fps);

						fpsText.textContent = fps + ' FPS (' + fpsMin + '-' + fpsMax + ')';
						updateGraph(fpsGraph, fps / 100);

						prevTime = time;
						frames = 0;

						if (mem !== undefined) {

							var heapSize = performance.memory.usedJSHeapSize;
							var heapSizeLimit = performance.memory.jsHeapSizeLimit;

							mem = Math.round(heapSize * 0.000000954);
							memMin = Math.min(memMin, mem);
							memMax = Math.max(memMax, mem);

							memText.textContent = mem + ' MB (' + memMin + '-' + memMax + ')';
							updateGraph(memGraph, heapSize / heapSizeLimit);
						}
					}

					return time;
				},

				update: function update() {

					startTime = this.end();
				}

			};
		};

		if ((typeof module === 'undefined' ? 'undefined' : babelHelpers.typeof(module)) === 'object') {

			module.exports = Stats;
		}
		return module.exports;
	})({ exports: {} });

	var StatsPerformanceViewer = (function () {
	    function StatsPerformanceViewer() {
	        babelHelpers.classCallCheck(this, StatsPerformanceViewer);

	        this.stats = new Stats();

	        if (typeof window !== 'undefined') {
	            this.stats.domElement.style.position = 'absolute';
	            this.stats.domElement.style.left = '0px';
	            this.stats.domElement.style.top = '0px';

	            document.body.appendChild(this.stats.domElement);
	        }
	    }

	    babelHelpers.createClass(StatsPerformanceViewer, [{
	        key: 'setMode',
	        value: function setMode(mode) {
	            this.stats.setMode(mode);
	        }
	    }, {
	        key: 'begin',
	        value: function begin() {
	            this.stats.begin();
	        }
	    }, {
	        key: 'end',
	        value: function end() {
	            this.stats.end();
	        }
	    }]);
	    return StatsPerformanceViewer;
	})();

	var ThreeSceneManager = (function () {
	    function ThreeSceneManager() {
	        babelHelpers.classCallCheck(this, ThreeSceneManager);

	        this.scenes = [];
	    }

	    babelHelpers.createClass(ThreeSceneManager, [{
	        key: 'createScene',
	        value: function createScene() {
	            // Create a new scene, add it to the list of scenes and return a handle (id) to it
	            return this.scenes.push(new three.Scene()) - 1;
	        }
	    }, {
	        key: 'getScene',
	        value: function getScene(sceneId) {
	            return this.scenes[sceneId];
	        }
	    }, {
	        key: 'addToScene',
	        value: function addToScene(sceneId, object) {
	            this.scenes[sceneId].add(object);
	        }
	    }, {
	        key: 'addAmbientLightToScene',
	        value: function addAmbientLightToScene(sceneId, color) {
	            this.scenes[sceneId].add(new three.AmbientLight(color));
	        }
	    }, {
	        key: 'addDirectionalLightToScene',
	        value: function addDirectionalLightToScene(sceneId, color, x, y, z) {
	            var light = new three.DirectionalLight(color);
	            light.position.set(x, y, z);

	            this.scenes[sceneId].add(light);
	        }
	    }, {
	        key: 'removeFromScene',
	        value: function removeFromScene(sceneId, object) {
	            this.scenes[sceneId].remove(object);
	        }
	    }]);
	    return ThreeSceneManager;
	})();

	var ThreeMeshManager = (function () {
	    function ThreeMeshManager() {
	        babelHelpers.classCallCheck(this, ThreeMeshManager);

	        this.meshes = [];
	    }

	    babelHelpers.createClass(ThreeMeshManager, [{
	        key: 'addMesh',
	        value: function addMesh(object) {
	            return this.meshes.push(object) - 1;
	        }
	    }, {
	        key: 'getMesh',
	        value: function getMesh(meshId) {
	            return this.meshes[meshId];
	        }
	    }]);
	    return ThreeMeshManager;
	})();

	var ThreeObjectMeshLoader = (function () {
	    function ThreeObjectMeshLoader() {
	        babelHelpers.classCallCheck(this, ThreeObjectMeshLoader);

	        this.loader = new three.ObjectLoader();
	    }

	    babelHelpers.createClass(ThreeObjectMeshLoader, [{
	        key: 'onProgress',
	        value: function onProgress() {}
	        // placeholder

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
	})();

	var jqueryParam = (function (module) {
	    var exports = module.exports;
	    /**
	     * @preserve jquery-param (c) 2015 KNOWLEDGECODE | MIT
	     */
	    /*global define */
	    (function (global) {
	        'use strict';

	        var param = function param(a) {
	            var add = function add(s, k, v) {
	                v = typeof v === 'function' ? v() : v === null ? '' : v === undefined ? '' : v;
	                s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
	            },
	                buildParams = function buildParams(prefix, obj, s) {
	                var i, len, key;

	                if (Object.prototype.toString.call(obj) === '[object Array]') {
	                    for (i = 0, len = obj.length; i < len; i++) {
	                        buildParams(prefix + '[' + (babelHelpers.typeof(obj[i]) === 'object' ? i : '') + ']', obj[i], s);
	                    }
	                } else if (obj && obj.toString() === '[object Object]') {
	                    for (key in obj) {
	                        if (obj.hasOwnProperty(key)) {
	                            if (prefix) {
	                                buildParams(prefix + '[' + key + ']', obj[key], s, add);
	                            } else {
	                                buildParams(key, obj[key], s, add);
	                            }
	                        }
	                    }
	                } else if (prefix) {
	                    add(s, prefix, obj);
	                } else {
	                    for (key in obj) {
	                        add(s, key, obj[key]);
	                    }
	                }
	                return s;
	            };
	            return buildParams('', a, []).join('&').replace(/%20/g, '+');
	        };

	        if ((typeof module === 'undefined' ? 'undefined' : babelHelpers.typeof(module)) === 'object' && babelHelpers.typeof(module.exports) === 'object') {
	            module.exports = param;
	        } else if (typeof define === 'function' && define.amd) {
	            define([], function () {
	                return param;
	            });
	        } else {
	            global.param = param;
	        }
	    })(this);
	    return module.exports;
	})({ exports: {} });

	var pinkyswear = (function (module) {
		var exports = module.exports;
		/*
	  * PinkySwear.js 2.2.2 - Minimalistic implementation of the Promises/A+ spec
	  * 
	  * Public Domain. Use, modify and distribute it any way you like. No attribution required.
	  *
	  * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
	  *
	  * PinkySwear is a very small implementation of the Promises/A+ specification. After compilation with the
	  * Google Closure Compiler and gzipping it weighs less than 500 bytes. It is based on the implementation for 
	  * Minified.js and should be perfect for embedding. 
	  *
	  *
	  * PinkySwear has just three functions.
	  *
	  * To create a new promise in pending state, call pinkySwear():
	  *         var promise = pinkySwear();
	  *
	  * The returned object has a Promises/A+ compatible then() implementation:
	  *          promise.then(function(value) { alert("Success!"); }, function(value) { alert("Failure!"); });
	  *
	  *
	  * The promise returned by pinkySwear() is a function. To fulfill the promise, call the function with true as first argument and
	  * an optional array of values to pass to the then() handler. By putting more than one value in the array, you can pass more than one
	  * value to the then() handlers. Here an example to fulfill a promsise, this time with only one argument: 
	  *         promise(true, [42]);
	  *
	  * When the promise has been rejected, call it with false. Again, there may be more than one argument for the then() handler:
	  *         promise(true, [6, 6, 6]);
	  *         
	  * You can obtain the promise's current state by calling the function without arguments. It will be true if fulfilled,
	  * false if rejected, and otherwise undefined.
	  * 		   var state = promise(); 
	  * 
	  * https://github.com/timjansen/PinkySwear.js
	  */
		(function (target) {
			var undef;

			function isFunction(f) {
				return typeof f == 'function';
			}
			function isObject(f) {
				return (typeof f === 'undefined' ? 'undefined' : babelHelpers.typeof(f)) == 'object';
			}
			function defer(callback) {
				if (typeof setImmediate != 'undefined') setImmediate(callback);else if (typeof process != 'undefined' && process['nextTick']) process['nextTick'](callback);else setTimeout(callback, 0);
			}

			target[0][target[1]] = function pinkySwear(extend) {
				var state; // undefined/null = pending, true = fulfilled, false = rejected
				var values = []; // an array of values as arguments for the then() handlers
				var deferred = []; // functions to call when set() is invoked

				var set = function set(newState, newValues) {
					if (state == null && newState != null) {
						state = newState;
						values = newValues;
						if (deferred.length) defer(function () {
							for (var i = 0; i < deferred.length; i++) {
								deferred[i]();
							}
						});
					}
					return state;
				};

				set['then'] = function (onFulfilled, onRejected) {
					var promise2 = pinkySwear(extend);
					var callCallbacks = function callCallbacks() {
						try {
							var f = state ? onFulfilled : onRejected;
							if (isFunction(f)) {
								(function () {
									var resolve = function resolve(x) {
										var then,
										    cbCalled = 0;
										try {
											if (x && (isObject(x) || isFunction(x)) && isFunction(then = x['then'])) {
												if (x === promise2) throw new TypeError();
												then['call'](x, function () {
													if (! cbCalled++) resolve.apply(undef, arguments);
												}, function (value) {
													if (! cbCalled++) promise2(false, [value]);
												});
											} else promise2(true, arguments);
										} catch (e) {
											if (! cbCalled++) promise2(false, [e]);
										}
									};

									resolve(f.apply(undef, values || []));
								})();
							} else promise2(state, values);
						} catch (e) {
							promise2(false, [e]);
						}
					};
					if (state != null) defer(callCallbacks);else deferred.push(callCallbacks);
					return promise2;
				};
				if (extend) {
					set = extend(set);
				}
				return set;
			};
		})(typeof module == 'undefined' ? [window, 'pinkySwear'] : [module, 'exports']);
		return module.exports;
	})({ exports: {} });

	var qwest = (function (module) {
		var exports = module.exports;
		/*! qwest 2.2.3 (https://github.com/pyrsmk/qwest) */

		module.exports = (function () {

			var global = window || this,
			    pinkyswear$$ = pinkyswear,
			    jparam = jqueryParam,
			   
			// Default response type for XDR in auto mode
			defaultXdrResponseType = 'json',
			   
			// Default data type
			defaultDataType = 'post',
			   
			// Variables for limit mechanism
			_limit = null,
			    requests = 0,
			    request_stack = [],
			   
			// Get XMLHttpRequest object
			getXHR = function getXHR() {
				return global.XMLHttpRequest ? new global.XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
			},
			   
			// Guess XHR version
			xhr2 = getXHR().responseType === '',
			   

			// Core function
			qwest = function qwest(method, url, data, options, before) {

				// Format
				method = method.toUpperCase();
				data = data || null;
				options = options || {};

				// Define variables
				var nativeResponseParsing = false,
				    crossOrigin,
				    xhr,
				    xdr = false,
				    timeoutInterval,
				    aborted = false,
				    attempts = 0,
				    headers = {},
				    mimeTypes = {
					text: '*/*',
					xml: 'text/xml',
					json: 'application/json',
					post: 'application/x-www-form-urlencoded'
				},
				    accept = {
					text: '*/*',
					xml: 'application/xml; q=1.0, text/xml; q=0.8, */*; q=0.1',
					json: 'application/json; q=1.0, text/*; q=0.8, */*; q=0.1'
				},
				    vars = '',
				    i,
				    j,
				    serialized,
				    response,
				    sending = false,
				    delayed = false,
				    timeout_start,
				   

				// Create the promise
				promise = pinkyswear$$(function (pinky) {
					pinky['catch'] = function (f) {
						return pinky.then(null, f);
					};
					pinky.complete = function (f) {
						return pinky.then(f, f);
					};
					// Override
					if ('pinkyswear' in options) {
						for (i in options.pinkyswear) {
							pinky[i] = options.pinkyswear[i];
						}
					}
					pinky.send = function () {
						// Prevent further send() calls
						if (sending) {
							return;
						}
						// Reached request limit, get out!
						if (requests == _limit) {
							request_stack.push(pinky);
							return;
						}
						++requests;
						sending = true;
						// Start the chrono
						timeout_start = new Date().getTime();
						// Get XHR object
						xhr = getXHR();
						if (crossOrigin) {
							if (!('withCredentials' in xhr) && global.XDomainRequest) {
								xhr = new XDomainRequest(); // CORS with IE8/9
								xdr = true;
								if (method != 'GET' && method != 'POST') {
									method = 'POST';
								}
							}
						}
						// Open connection
						if (xdr) {
							xhr.open(method, url);
						} else {
							xhr.open(method, url, options.async, options.user, options.password);
							if (xhr2 && options.async) {
								xhr.withCredentials = options.withCredentials;
							}
						}
						// Set headers
						if (!xdr) {
							for (var i in headers) {
								if (headers[i]) {
									xhr.setRequestHeader(i, headers[i]);
								}
							}
						}
						// Verify if the response type is supported by the current browser
						if (xhr2 && options.responseType != 'document' && options.responseType != 'auto') {
							// Don't verify for 'document' since we're using an internal routine
							try {
								xhr.responseType = options.responseType;
								nativeResponseParsing = xhr.responseType == options.responseType;
							} catch (e) {}
						}
						// Plug response handler
						if (xhr2 || xdr) {
							xhr.onload = handleResponse;
							xhr.onerror = handleError;
						} else {
							xhr.onreadystatechange = function () {
								if (xhr.readyState == 4) {
									handleResponse();
								}
							};
						}
						// Override mime type to ensure the response is well parsed
						if (options.responseType != 'auto' && 'overrideMimeType' in xhr) {
							xhr.overrideMimeType(mimeTypes[options.responseType]);
						}
						// Run 'before' callback
						if (before) {
							before(xhr);
						}
						// Send request
						if (xdr) {
							setTimeout(function () {
								// https://developer.mozilla.org/en-US/docs/Web/API/XDomainRequest
								xhr.send(method != 'GET' ? data : null);
							}, 0);
						} else {
							xhr.send(method != 'GET' ? data : null);
						}
					};
					return pinky;
				}),
				   

				// Handle the response
				handleResponse = function handleResponse() {
					// Prepare
					var i, responseType;
					--requests;
					sending = false;
					// Verify timeout state
					// --- https://stackoverflow.com/questions/7287706/ie-9-javascript-error-c00c023f
					if (new Date().getTime() - timeout_start >= options.timeout) {
						if (!options.attempts || ++attempts != options.attempts) {
							promise.send();
						} else {
							promise(false, [xhr, response, new Error('Timeout (' + url + ')')]);
						}
						return;
					}
					// Launch next stacked request
					if (request_stack.length) {
						request_stack.shift().send();
					}
					// Handle response
					try {
						// Process response
						if (nativeResponseParsing && 'response' in xhr && xhr.response !== null) {
							response = xhr.response;
						} else if (options.responseType == 'document') {
							var frame = document.createElement('iframe');
							frame.style.display = 'none';
							document.body.appendChild(frame);
							frame.contentDocument.open();
							frame.contentDocument.write(xhr.response);
							frame.contentDocument.close();
							response = frame.contentDocument;
							document.body.removeChild(frame);
						} else {
							// Guess response type
							responseType = options.responseType;
							if (responseType == 'auto') {
								if (xdr) {
									responseType = defaultXdrResponseType;
								} else {
									var ct = xhr.getResponseHeader('Content-Type') || '';
									if (ct.indexOf(mimeTypes.json) > -1) {
										responseType = 'json';
									} else if (ct.indexOf(mimeTypes.xml) > -1) {
										responseType = 'xml';
									} else {
										responseType = 'text';
									}
								}
							}
							// Handle response type
							switch (responseType) {
								case 'json':
									try {
										if ('JSON' in global) {
											response = JSON.parse(xhr.responseText);
										} else {
											response = eval('(' + xhr.responseText + ')');
										}
									} catch (e) {
										throw "Error while parsing JSON body : " + e;
									}
									break;
								case 'xml':
									// Based on jQuery's parseXML() function
									try {
										// Standard
										if (global.DOMParser) {
											response = new DOMParser().parseFromString(xhr.responseText, 'text/xml');
										}
										// IE<9
										else {
												response = new ActiveXObject('Microsoft.XMLDOM');
												response.async = 'false';
												response.loadXML(xhr.responseText);
											}
									} catch (e) {
										response = undefined;
									}
									if (!response || !response.documentElement || response.getElementsByTagName('parsererror').length) {
										throw 'Invalid XML';
									}
									break;
								default:
									response = xhr.responseText;
							}
						}
						// Late status code verification to allow passing data when, per example, a 409 is returned
						// --- https://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
						if ('status' in xhr && !/^2|1223/.test(xhr.status)) {
							throw xhr.status + ' (' + xhr.statusText + ')';
						}
						// Fulfilled
						promise(true, [xhr, response]);
					} catch (e) {
						// Rejected
						promise(false, [xhr, response, e]);
					}
				},
				   

				// Handle errors
				handleError = function handleError(e) {
					--requests;
					promise(false, [xhr, null, new Error('Connection aborted')]);
				};

				// Normalize options
				options.async = 'async' in options ? !!options.async : true;
				options.cache = 'cache' in options ? !!options.cache : false;
				options.dataType = 'dataType' in options ? options.dataType.toLowerCase() : defaultDataType;
				options.responseType = 'responseType' in options ? options.responseType.toLowerCase() : 'auto';
				options.user = options.user || '';
				options.password = options.password || '';
				options.withCredentials = !!options.withCredentials;
				options.timeout = 'timeout' in options ? parseInt(options.timeout, 10) : 30000;
				options.attempts = 'attempts' in options ? parseInt(options.attempts, 10) : 1;

				// Guess if we're dealing with a cross-origin request
				i = url.match(/\/\/(.+?)\//);
				crossOrigin = i && (i[1] ? i[1] != location.host : false);

				// Prepare data
				if ('ArrayBuffer' in global && data instanceof ArrayBuffer) {
					options.dataType = 'arraybuffer';
				} else if ('Blob' in global && data instanceof Blob) {
					options.dataType = 'blob';
				} else if ('Document' in global && data instanceof Document) {
					options.dataType = 'document';
				} else if ('FormData' in global && data instanceof FormData) {
					options.dataType = 'formdata';
				}
				switch (options.dataType) {
					case 'json':
						data = JSON.stringify(data);
						break;
					case 'post':
						data = jparam(data);
				}

				// Prepare headers
				if (options.headers) {
					var format = function format(match, p1, p2) {
						return p1 + p2.toUpperCase();
					};
					for (i in options.headers) {
						headers[i.replace(/(^|-)([^-])/g, format)] = options.headers[i];
					}
				}
				if (!('Content-Type' in headers) && method != 'GET') {
					if (options.dataType in mimeTypes) {
						if (mimeTypes[options.dataType]) {
							headers['Content-Type'] = mimeTypes[options.dataType];
						}
					}
				}
				if (!headers.Accept) {
					headers.Accept = options.responseType in accept ? accept[options.responseType] : '*/*';
				}
				if (!crossOrigin && !('X-Requested-With' in headers)) {
					// (that header breaks in legacy browsers with CORS)
					headers['X-Requested-With'] = 'XMLHttpRequest';
				}
				if (!options.cache && !('Cache-Control' in headers)) {
					headers['Cache-Control'] = 'no-cache';
				}

				// Prepare URL
				if (method == 'GET' && data) {
					vars += data;
				}
				if (vars) {
					url += (/\?/.test(url) ? '&' : '?') + vars;
				}

				// Start the request
				if (options.async) {
					promise.send();
				}

				// Return promise
				return promise;
			};

			// Return the external qwest object
			return {
				base: '',
				get: function get(url, data, options, before) {
					return qwest('GET', this.base + url, data, options, before);
				},
				post: function post(url, data, options, before) {
					return qwest('POST', this.base + url, data, options, before);
				},
				put: function put(url, data, options, before) {
					return qwest('PUT', this.base + url, data, options, before);
				},
				'delete': function _delete(url, data, options, before) {
					return qwest('DELETE', this.base + url, data, options, before);
				},
				map: function map(type, url, data, options, before) {
					return qwest(type.toUpperCase(), this.base + url, data, options, before);
				},
				xhr2: xhr2,
				limit: function limit(by) {
					_limit = by;
				},
				setDefaultXdrResponseType: function setDefaultXdrResponseType(type) {
					defaultXdrResponseType = type.toLowerCase();
				},
				setDefaultDataType: function setDefaultDataType(type) {
					defaultDataType = type.toLowerCase();
				}
			};
		})();
		return module.exports;
	})({ exports: {} });

	var QwestAjaxLoader = (function () {
	    function QwestAjaxLoader() {
	        babelHelpers.classCallCheck(this, QwestAjaxLoader);
	    }

	    babelHelpers.createClass(QwestAjaxLoader, [{
	        key: 'get',
	        value: function get(path) {
	            return qwest.get(path).then(function (xhr, res) {
	                return typeof res === 'string' ? JSON.parse(res) : res;
	            });
	        }
	    }]);
	    return QwestAjaxLoader;
	})();

	var LevelLoader = (function () {
	    function LevelLoader(ajaxLoader) {
	        babelHelpers.classCallCheck(this, LevelLoader);

	        this.ajaxLoader = ajaxLoader;
	    }

	    babelHelpers.createClass(LevelLoader, [{
	        key: "loadLevel",
	        value: (function () {
	            var ref = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee(path) {
	                return regeneratorRuntime.wrap(function _callee$(_context) {
	                    while (1) {
	                        switch (_context.prev = _context.next) {
	                            case 0:
	                                _context.next = 2;
	                                return this.ajaxLoader.get(path);

	                            case 2:
	                                return _context.abrupt("return", _context.sent);

	                            case 3:
	                            case "end":
	                                return _context.stop();
	                        }
	                    }
	                }, _callee, this);
	            }));
	            return function loadLevel(_x) {
	                return ref.apply(this, arguments);
	            };
	        })()
	    }]);
	    return LevelLoader;
	})();

	var mainloop = (function (module, global) {
	    var exports = module.exports;
	    /*
	     * A main loop useful for games and other animated applications.
	     */
	    (function () {
	        var root;

	        if (typeof window === 'undefined') {
	            root = global;
	        } else {
	            root = window;
	        }

	        // The amount of time (in milliseconds) to simulate each time update()
	        // runs. See `MainLoop.setSimulationTimestep()` for details.
	        var simulationTimestep = 1000 / 60,

	        // The cumulative amount of in-app time that hasn't been simulated yet.
	        // See the comments inside animate() for details.
	        frameDelta = 0,

	        // The timestamp in milliseconds of the last time the main loop was run.
	        // Used to compute the time elapsed between frames.
	        lastFrameTimeMs = 0,

	        // An exponential moving average of the frames per second.
	        fps = 60,

	        // The timestamp (in milliseconds) of the last time the `fps` moving
	        // average was updated.
	        lastFpsUpdate = 0,

	        // The number of frames delivered in the current second.
	        framesThisSecond = 0,

	        // The number of times update() is called in a given frame. This is only
	        // relevant inside of animate(), but a reference is held externally so that
	        // this variable is not marked for garbage collection every time the main
	        // loop runs.
	        numUpdateSteps = 0,

	        // The minimum amount of time in milliseconds that must pass since the last
	        // frame was executed before another frame can be executed. The
	        // multiplicative inverse caps the FPS (the default of zero means there is
	        // no cap).
	        minFrameDelay = 0,

	        // Whether the main loop is running.
	        running = false,

	        // `true` if `MainLoop.start()` has been called and the most recent time it
	        // was called has not been followed by a call to `MainLoop.stop()`. This is
	        // different than `running` because there is a delay of a few milliseconds
	        // after `MainLoop.start()` is called before the application is considered
	        // "running." This delay is due to waiting for the next frame.
	        started = false,

	        // Whether the simulation has fallen too far behind real time.
	        // Specifically, `panic` will be set to `true` if too many updates occur in
	        // one frame. This is only relevant inside of animate(), but a reference is
	        // held externally so that this variable is not marked for garbage
	        // collection every time the main loop runs.
	        panic = false,

	        // The function that runs the main loop. The unprefixed version of
	        // `window.requestAnimationFrame()` is available in all modern browsers
	        // now, but node.js doesn't have it, so fall back to timers. The polyfill
	        // is adapted from the MIT-licensed
	        // https://github.com/underscorediscovery/realtime-multiplayer-in-html5
	        requestAnimationFrame = root.requestAnimationFrame || (function () {
	            var lastTimestamp = Date.now(),
	                now,
	                timeout;
	            return function (callback) {
	                now = Date.now();
	                // The next frame should run no sooner than the simulation allows,
	                // but as soon as possible if the current frame has already taken
	                // more time to run than is simulated in one timestep.
	                timeout = Math.max(0, simulationTimestep - (now - lastTimestamp));
	                lastTimestamp = now + timeout;
	                return setTimeout(function () {
	                    callback(now + timeout);
	                }, timeout);
	            };
	        })(),

	        // The function that stops the main loop. The unprefixed version of
	        // `window.cancelAnimationFrame()` is available in all modern browsers now,
	        // but node.js doesn't have it, so fall back to timers.
	        cancelAnimationFrame = root.cancelAnimationFrame || clearTimeout,

	        // In all major browsers, replacing non-specified functions with NOOPs
	        // seems to be as fast or slightly faster than using conditions to only
	        // call the functions if they are specified. This is probably due to empty
	        // functions being optimized away. http://jsperf.com/noop-vs-condition
	        NOOP = function NOOP() {},

	        // A function that runs at the beginning of the main loop.
	        // See `MainLoop.setBegin()` for details.
	        begin = NOOP,

	        // A function that runs updates (i.e. AI and physics).
	        // See `MainLoop.setUpdate()` for details.
	        update = NOOP,

	        // A function that draws things on the screen.
	        // See `MainLoop.setDraw()` for details.
	        draw = NOOP,

	        // A function that runs at the end of the main loop.
	        // See `MainLoop.setEnd()` for details.
	        end = NOOP,

	        // The ID of the currently executing frame. Used to cancel frames when
	        // stopping the loop.
	        rafHandle;

	        /**
	         * Manages the main loop that runs updates and rendering.
	         *
	         * The main loop is a core part of any application in which state changes
	         * even if no events are handled. In games, it is typically responsible for
	         * computing physics and AI as well as drawing the result on the screen.
	         *
	         * The body of this particular loop is run every time the browser is ready to
	         * paint another frame. The frequency with which this happens depends primarily
	         * on the monitor's refresh rate, which is typically 60 frames per second. Most
	         * applications aim to run at 60 FPS for this reason, meaning that the main
	         * loop runs about once every 16.7 milliseconds. With this target, everything
	         * that happens in the main loop (e.g. all updates and drawing) needs to occur
	         * within the "budget" of 16.7 milliseconds.  See
	         * `MainLoop.setSimulationTimestep()` for more information about typical
	         * monitor refresh rates and frame rate targets.
	         *
	         * The main loop can be started and stopped, but there can only be one MainLoop
	         * (except that each Web Worker can have its own MainLoop). There are four main
	         * parts of the loop: {@link #setBegin begin}(), {@link #setUpdate update}(),
	         * {@link #setDraw draw}(), and {@link #setEnd end}(), in that order. See the
	         * functions that set each of them for descriptions of what they are used for.
	         * Note that update() can run zero or more times per loop.
	         *
	         * @class MainLoop
	         */
	        root.MainLoop = {
	            /**
	             * Gets how many milliseconds should be simulated by every run of update().
	             *
	             * See `MainLoop.setSimulationTimestep()` for details on this value.
	             *
	             * @return {Number}
	             *   The number of milliseconds that should be simulated by every run of
	             *   {@link #setUpdate update}().
	             */
	            getSimulationTimestep: function getSimulationTimestep() {
	                return simulationTimestep;
	            },

	            /**
	             * Sets how many milliseconds should be simulated by every run of update().
	             *
	             * The perceived frames per second (FPS) is effectively capped at the
	             * multiplicative inverse of the simulation timestep. That is, if the
	             * timestep is 1000 / 60 (which is the default), then the maximum perceived
	             * FPS is effectively 60. Decreasing the timestep increases the maximum
	             * perceived FPS at the cost of running {@link #setUpdate update}() more
	             * times per frame at lower frame rates. Since running update() more times
	             * takes more time to process, this can actually slow down the frame rate.
	             * Additionally, if the amount of time it takes to run update() exceeds or
	             * very nearly exceeds the timestep, the application will freeze and crash
	             * in a spiral of death (unless it is rescued; see `MainLoop.setEnd()` for
	             * an explanation of what can be done if a spiral of death is occurring).
	             *
	             * The exception to this is that interpolating between updates for each
	             * render can increase the perceived frame rate and reduce visual
	             * stuttering. See `MainLoop.setDraw()` for an explanation of how to do
	             * this.
	             *
	             * If you are considering decreasing the simulation timestep in order to
	             * raise the maximum perceived FPS, keep in mind that most monitors can't
	             * display more than 60 FPS. Whether humans can tell the difference among
	             * high frame rates depends on the application, but for reference, film is
	             * usually displayed at 24 FPS, other videos at 30 FPS, most games are
	             * acceptable above 30 FPS, and virtual reality might require 75 FPS to
	             * feel natural. Some gaming monitors go up to 144 FPS. Setting the
	             * timestep below 1000 / 144 is discouraged and below 1000 / 240 is
	             * strongly discouraged. The default of 1000 / 60 is good in most cases.
	             *
	             * The simulation timestep should typically only be changed at
	             * deterministic times (e.g. before the main loop starts for the first
	             * time, and not in response to user input or slow frame rates) to avoid
	             * introducing non-deterministic behavior. The update timestep should be
	             * the same for all players/users in multiplayer/multi-user applications.
	             *
	             * See also `MainLoop.getSimulationTimestep()`.
	             *
	             * @param {Number} timestep
	             *   The number of milliseconds that should be simulated by every run of
	             *   {@link #setUpdate update}().
	             */
	            setSimulationTimestep: function setSimulationTimestep(timestep) {
	                simulationTimestep = timestep;
	                return this;
	            },

	            /**
	             * Returns the exponential moving average of the frames per second.
	             *
	             * @return {Number}
	             *   The exponential moving average of the frames per second.
	             */
	            getFPS: function getFPS() {
	                return fps;
	            },

	            /**
	             * Gets the maximum frame rate.
	             *
	             * Other factors also limit the FPS; see `MainLoop.setSimulationTimestep`
	             * for details.
	             *
	             * See also `MainLoop.setMaxAllowedFPS()`.
	             *
	             * @return {Number}
	             *   The maximum number of frames per second allowed.
	             */
	            getMaxAllowedFPS: function getMaxAllowedFPS() {
	                return 1000 / minFrameDelay;
	            },

	            /**
	             * Sets a maximum frame rate.
	             *
	             * See also `MainLoop.getMaxAllowedFPS()`.
	             *
	             * @param {Number} [fps=Infinity]
	             *   The maximum number of frames per second to execute. If Infinity or not
	             *   passed, there will be no FPS cap (although other factors do limit the
	             *   FPS; see `MainLoop.setSimulationTimestep` for details). If zero, this
	             *   will stop the loop, and when the loop is next started, it will return
	             *   to the previous maximum frame rate. Passing negative values will stall
	             *   the loop until this function is called again with a positive value.
	             *
	             * @chainable
	             */
	            setMaxAllowedFPS: function setMaxAllowedFPS(fps) {
	                if (typeof fps === 'undefined') {
	                    fps = Infinity;
	                }
	                if (fps === 0) {
	                    this.stop();
	                } else {
	                    // Dividing by Infinity returns zero.
	                    minFrameDelay = 1000 / fps;
	                }
	                return this;
	            },

	            /**
	             * Reset the amount of time that has not yet been simulated to zero.
	             *
	             * This introduces non-deterministic behavior if called after the
	             * application has started running (unless it is being reset, in which case
	             * it doesn't matter). However, this can be useful in cases where the
	             * amount of time that has not yet been simulated has grown very large
	             * (for example, when the application's tab gets put in the background and
	             * the browser throttles the timers as a result). In applications with
	             * lockstep the player would get dropped, but in other networked
	             * applications it may be necessary to snap or ease the player/user to the
	             * authoritative state and discard pending updates in the process. In
	             * non-networked applications it may also be acceptable to simply resume
	             * the application where it last left off and ignore the accumulated
	             * unsimulated time.
	             *
	             * @return {Number}
	             *   The cumulative amount of elapsed time in milliseconds that has not yet
	             *   been simulated, but is being discarded as a result of calling this
	             *   function.
	             */
	            resetFrameDelta: function resetFrameDelta() {
	                var oldFrameDelta = frameDelta;
	                frameDelta = 0;
	                return oldFrameDelta;
	            },

	            /**
	             * Sets the function that runs at the beginning of the main loop.
	             *
	             * The begin() function is typically used to process input before the
	             * updates run. Processing input here (in chunks) can reduce the running
	             * time of event handlers, which is useful because long-running event
	             * handlers can sometimes delay frames.
	             *
	             * Unlike {@link #setUpdate update}(), which can run zero or more times per
	             * frame, begin() always runs exactly once per frame. This makes it useful
	             * for any updates that are not dependent on time in the simulation.
	             * Examples include adjusting HUD calculations or performing long-running
	             * updates incrementally. Compared to {@link #setEnd end}(), generally
	             * actions should occur in begin() if they affect anything that
	             * {@link #setUpdate update}() or {@link #setDraw draw}() use.
	             *
	             * @param {Function} begin
	             *   The begin() function.
	             * @param {Number} [begin.timestamp]
	             *   The current timestamp (when the frame started), in milliseconds. This
	             *   should only be used for comparison to other timestamps because the
	             *   epoch (i.e. the "zero" time) depends on the engine running this code.
	             *   In engines that support `DOMHighResTimeStamp` (all modern browsers
	             *   except iOS Safari 8) the epoch is the time the page started loading,
	             *   specifically `performance.timing.navigationStart`. Everywhere else,
	             *   including node.js, the epoch is the Unix epoch (1970-01-01T00:00:00Z).
	             * @param {Number} [begin.delta]
	             *   The total elapsed time that has not yet been simulated, in
	             *   milliseconds.
	             */
	            setBegin: function setBegin(fun) {
	                begin = fun || begin;
	                return this;
	            },

	            /**
	             * Sets the function that runs updates (e.g. AI and physics).
	             *
	             * The update() function should simulate anything that is affected by time.
	             * It can be called zero or more times per frame depending on the frame
	             * rate.
	             *
	             * As with everything in the main loop, the running time of update()
	             * directly affects the frame rate. If update() takes long enough that the
	             * frame rate drops below the target ("budgeted") frame rate, parts of the
	             * update() function that do not need to execute between every frame can be
	             * moved into Web Workers. (Various sources on the internet sometimes
	             * suggest other scheduling patterns using setTimeout() or setInterval().
	             * These approaches sometimes offer modest improvements with minimal
	             * changes to existing code, but because JavaScript is single-threaded, the
	             * updates will still block rendering and drag down the frame rate. Web
	             * Workers execute in separate threads, so they free up more time in the
	             * main loop.)
	             *
	             * This script can be imported into a Web Worker using importScripts() and
	             * used to run a second main loop in the worker. Some considerations:
	             *
	             * - Profile your code before doing the work to move it into Web Workers.
	             *   It could be the rendering that is the bottleneck, in which case the
	             *   solution is to decrease the visual complexity of the scene.
	             * - It doesn't make sense to move the *entire* contents of update() into
	             *   workers unless {@link #setDraw draw}() can interpolate between frames.
	             *   The lowest-hanging fruit is background updates (like calculating
	             *   citizens' happiness in a city-building game), physics that doesn't
	             *   affect the scene (like flags waving in the wind), and anything that is
	             *   occluded or happening far off screen.
	             * - If draw() needs to interpolate physics based on activity that occurs
	             *   in a worker, the worker needs to pass the interpolation value back to
	             *   the main thread so that is is available to draw().
	             * - Web Workers can't access the state of the main thread, so they can't
	             *   directly modify objects in your scene. Moving data to and from Web
	             *   Workers is a pain. The fastest way to do it is with Transferable
	             *   Objects: basically, you can pass an ArrayBuffer to a worker,
	             *   destroying the original reference in the process.
	             *
	             * You can read more about Web Workers and Transferable Objects at
	             * [HTML5 Rocks](http://www.html5rocks.com/en/tutorials/workers/basics/).
	             *
	             * @param {Function} update
	             *   The update() function.
	             * @param {Number} [update.delta]
	             *   The amount of time in milliseconds to simulate in the update. In most
	             *   cases this timestep never changes in order to ensure deterministic
	             *   updates. The timestep is the same as that returned by
	             *   `MainLoop.getSimulationTimestep()`.
	             */
	            setUpdate: function setUpdate(fun) {
	                update = fun || update;
	                return this;
	            },

	            /**
	             * Sets the function that draws things on the screen.
	             *
	             * The draw() function gets passed the percent of time that the next run of
	             * {@link #setUpdate update}() will simulate that has actually elapsed, as
	             * a decimal. In other words, draw() gets passed how far between update()
	             * calls it is. This is useful because the time simulated by update() and
	             * the time between draw() calls is usually different, so the parameter to
	             * draw() can be used to interpolate motion between frames to make
	             * rendering appear smoother. To illustrate, if update() advances the
	             * simulation at each vertical bar in the first row below, and draw() calls
	             * happen at each vertical bar in the second row below, then some frames
	             * will have time left over that is not yet simulated by update() when
	             * rendering occurs in draw():
	             *
	             *     update() timesteps:  |  |  |  |  |  |  |  |  |
	             *     draw() calls:        |   |   |   |   |   |   |
	             *
	             * To interpolate motion for rendering purposes, objects' state after the
	             * last update() must be retained and used to calculate an intermediate
	             * state. Note that this means renders will be up to one update() behind.
	             * This is still better than extrapolating (projecting objects' state after
	             * a future update()) which can produce bizarre results. Storing multiple
	             * states can be difficult to set up, and keep in mind that running this
	             * process takes time that could push the frame rate down, so it's often
	             * not worthwhile unless stuttering is visible.
	             *
	             * @param {Function} draw
	             *   The draw() function.
	             * @param {Number} [draw.interpolationPercentage]
	             *   The cumulative amount of time that hasn't been simulated yet, divided
	             *   by the amount of time that will be simulated the next time update()
	             *   runs. Useful for interpolating frames.
	             */
	            setDraw: function setDraw(fun) {
	                draw = fun || draw;
	                return this;
	            },

	            /**
	             * Sets the function that runs at the end of the main loop.
	             *
	             * Unlike {@link #setUpdate update}(), which can run zero or more times per
	             * frame, end() always runs exactly once per frame. This makes it useful
	             * for any updates that are not dependent on time in the simulation.
	             * Examples include cleaning up any temporary state set up by
	             * {@link #setBegin begin}(), lowering the visual quality if the frame rate
	             * is too low, or performing long-running updates incrementally. Compared
	             * to begin(), generally actions should occur in end() if they use anything
	             * that update() or {@link #setDraw draw}() affect.
	             *
	             * @param {Function} end
	             *   The end() function.
	             * @param {Number} [end.fps]
	             *   The exponential moving average of the frames per second. This is the
	             *   same value returned by `MainLoop.getFPS()`. It can be used to take
	             *   action when the FPS is too low (or to restore to normalcy if the FPS
	             *   moves back up). Examples of actions to take if the FPS is too low
	             *   include exiting the application, lowering the visual quality, stopping
	             *   or reducing activities outside of the main loop like event handlers or
	             *   audio playback, performing non-critical updates less frequently, or
	             *   increasing the simulation timestep (by calling
	             *   `MainLoop.setSimulationTimestep()`). Note that this last option
	             *   results in more time being simulated per update() call, which causes
	             *   the application to behave non-deterministically.
	             * @param {Boolean} [end.panic=false]
	             *   Indicates whether the simulation has fallen too far behind real time.
	             *   Specifically, `panic` will be `true` if too many updates occurred in
	             *   one frame. In networked lockstep applications, the application should
	             *   wait for some amount of time to see if the user can catch up before
	             *   dropping the user. In networked but non-lockstep applications, this
	             *   typically indicates that the user needs to be snapped or eased to the
	             *   current authoritative state. When this happens, it may be convenient
	             *   to call `MainLoop.resetFrameDelta()` to discard accumulated pending
	             *   updates. In non-networked applications, it may be acceptable to allow
	             *   the application to keep running for awhile to see if it will catch up.
	             *   However, this could also cause the application to look like it is
	             *   running very quickly for a few frames as it transitions through the
	             *   intermediate states. An alternative that may be acceptable is to
	             *   simply ignore the unsimulated elapsed time by calling
	             *   `MainLoop.resetFrameDelta()` even though this introduces
	             *   non-deterministic behavior. In all cases, if the application panics
	             *   frequently, this is an indication that the main loop is running too
	             *   slowly. However, most of the time the drop in frame rate will probably
	             *   be noticeable before a panic occurs. To help the application catch up
	             *   after a panic caused by a spiral of death, the same steps can be taken
	             *   that are suggested above if the FPS drops too low.
	             */
	            setEnd: function setEnd(fun) {
	                end = fun || end;
	                return this;
	            },

	            /**
	             * Starts the main loop.
	             *
	             * Note that the application is not considered "running" immediately after
	             * this function returns; rather, it is considered "running" after the
	             * application draws its first frame. The distinction is that event
	             * handlers should remain paused until the application is running, even
	             * after `MainLoop.start()` is called. Check `MainLoop.isRunning()` for the
	             * current status. To act after the application starts, register a callback
	             * with requestAnimationFrame() after calling this function and execute the
	             * action in that callback. It is safe to call `MainLoop.start()` multiple
	             * times even before the application starts running and without calling
	             * `MainLoop.stop()` in between, although there is no reason to do this;
	             * the main loop will only start if it is not already started.
	             *
	             * See also `MainLoop.stop()`.
	             */
	            start: function start() {
	                if (!started) {
	                    // Since the application doesn't start running immediately, track
	                    // whether this function was called and use that to keep it from
	                    // starting the main loop multiple times.
	                    started = true;

	                    // In the main loop, draw() is called after update(), so if we
	                    // entered the main loop immediately, we would never render the
	                    // initial state before any updates occur. Instead, we run one
	                    // frame where all we do is draw, and then start the main loop with
	                    // the next frame.
	                    rafHandle = requestAnimationFrame(function (timestamp) {
	                        // Render the initial state before any updates occur.
	                        draw(1);

	                        // The application isn't considered "running" until the
	                        // application starts drawing.
	                        running = true;

	                        // Reset variables that are used for tracking time so that we
	                        // don't simulate time passed while the application was paused.
	                        lastFrameTimeMs = timestamp;
	                        lastFpsUpdate = timestamp;
	                        framesThisSecond = 0;

	                        // Start the main loop.
	                        rafHandle = requestAnimationFrame(animate);
	                    });
	                }
	                return this;
	            },

	            /**
	             * Stops the main loop.
	             *
	             * Event handling and other background tasks should also be paused when the
	             * main loop is paused.
	             *
	             * Note that pausing in multiplayer/multi-user applications will cause the
	             * player's/user's client to become out of sync. In this case the
	             * simulation should exit, or the player/user needs to be snapped to their
	             * updated position when the main loop is started again.
	             *
	             * See also `MainLoop.start()` and `MainLoop.isRunning()`.
	             */
	            stop: function stop() {
	                running = false;
	                started = false;
	                cancelAnimationFrame(rafHandle);
	                return this;
	            },

	            /**
	             * Returns whether the main loop is currently running.
	             *
	             * See also `MainLoop.start()` and `MainLoop.stop()`.
	             *
	             * @return {Boolean}
	             *   Whether the main loop is currently running.
	             */
	            isRunning: function isRunning() {
	                return running;
	            }
	        };

	        /**
	         * The main loop that runs updates and rendering.
	         *
	         * @param {DOMHighResTimeStamp} timestamp
	         *   The current timestamp. In practice this is supplied by
	         *   requestAnimationFrame at the time that it starts to fire callbacks. This
	         *   should only be used for comparison to other timestamps because the epoch
	         *   (i.e. the "zero" time) depends on the engine running this code. In engines
	         *   that support `DOMHighResTimeStamp` (all modern browsers except iOS Safari
	         *   8) the epoch is the time the page started loading, specifically
	         *   `performance.timing.navigationStart`. Everywhere else, including node.js,
	         *   the epoch is the Unix epoch (1970-01-01T00:00:00Z).
	         *
	         * @ignore
	         */
	        function animate(timestamp) {
	            // Throttle the frame rate (if minFrameDelay is set to a non-zero value by
	            // `MainLoop.setMaxAllowedFPS()`).
	            if (timestamp < lastFrameTimeMs + minFrameDelay) {
	                // Run the loop again the next time the browser is ready to render.
	                rafHandle = requestAnimationFrame(animate);
	                return;
	            }

	            // frameDelta is the cumulative amount of in-app time that hasn't been
	            // simulated yet. Add the time since the last frame. We need to track total
	            // not-yet-simulated time (as opposed to just the time elapsed since the
	            // last frame) because not all actually elapsed time is guaranteed to be
	            // simulated each frame. See the comments below for details.
	            frameDelta += timestamp - lastFrameTimeMs;
	            lastFrameTimeMs = timestamp;

	            // Run any updates that are not dependent on time in the simulation. See
	            // `MainLoop.setBegin()` for additional details on how to use this.
	            begin(timestamp, frameDelta);

	            // Update the estimate of the frame rate, `fps`. Every second, the number
	            // of frames that occurred in that second are included in an exponential
	            // moving average of all frames per second, with an alpha of 0.25. This
	            // means that more recent seconds affect the estimated frame rate more than
	            // older seconds.
	            if (timestamp > lastFpsUpdate + 1000) {
	                // Compute the new exponential moving average with an alpha of 0.25.
	                // Using constants inline is okay here.
	                fps = 0.25 * framesThisSecond + 0.75 * fps;

	                lastFpsUpdate = timestamp;
	                framesThisSecond = 0;
	            }
	            framesThisSecond++;

	            /*
	             * A naive way to move an object along its X-axis might be to write a main
	             * loop containing the statement `obj.x += 10;` which would move the object
	             * 10 units per frame. This approach suffers from the issue that it is
	             * dependent on the frame rate. In other words, if your application is
	             * running slowly (that is, fewer frames per second), your object will also
	             * appear to move slowly, whereas if your application is running quickly
	             * (that is, more frames per second), your object will appear to move
	             * quickly. This is undesirable, especially in multiplayer/multi-user
	             * applications.
	             *
	             * One solution is to multiply the speed by the amount of time that has
	             * passed between rendering frames. For example, if you want your object to
	             * move 600 units per second, you might write `obj.x += 600 * delta`, where
	             * `delta` is the time passed since the last frame. (For convenience, let's
	             * move this statement to an update() function that takes `delta` as a
	             * parameter.) This way, your object will move a constant distance over
	             * time. However, at low frame rates and high speeds, your object will move
	             * large distances every frame, which can cause it to do strange things
	             * such as move through walls. Additionally, we would like our program to
	             * be deterministic. That is, every time we run the application with the
	             * same input, we would like exactly the same output. If the time between
	             * frames (the `delta`) varies, our output will diverge the longer the
	             * program runs due to accumulated rounding errors, even at normal frame
	             * rates.
	             *
	             * A better solution is to separate the amount of time simulated in each
	             * update() from the amount of time between frames. Our update() function
	             * doesn't need to change; we just need to change the delta we pass to it
	             * so that each update() simulates a fixed amount of time (that is, `delta`
	             * should have the same value each time update() is called). The update()
	             * function can be run multiple times per frame if needed to simulate the
	             * total amount of time passed since the last frame. (If the time that has
	             * passed since the last frame is less than the fixed simulation time, we
	             * just won't run an update() until the the next frame. If there is
	             * unsimulated time left over that is less than our timestep, we'll just
	             * leave it to be simulated during the next frame.) This approach avoids
	             * inconsistent rounding errors and ensures that there are no giant leaps
	             * through walls between frames.
	             *
	             * That is what is done below. It introduces a new problem, but it is a
	             * manageable one: if the amount of time spent simulating is consistently
	             * longer than the amount of time between frames, the application could
	             * freeze and crash in a spiral of death. This won't happen as long as the
	             * fixed simulation time is set to a value that is high enough that
	             * update() calls usually take less time than the amount of time they're
	             * simulating. If it does start to happen anyway, see `MainLoop.setEnd()`
	             * for a discussion of ways to stop it.
	             *
	             * Additionally, see `MainLoop.setUpdate()` for a discussion of performance
	             * considerations.
	             *
	             * Further reading for those interested:
	             *
	             * - http://gameprogrammingpatterns.com/game-loop.html
	             * - http://gafferongames.com/game-physics/fix-your-timestep/
	             * - https://gamealchemist.wordpress.com/2013/03/16/thoughts-on-the-javascript-game-loop/
	             * - https://developer.mozilla.org/en-US/docs/Games/Anatomy
	             */
	            numUpdateSteps = 0;
	            while (frameDelta >= simulationTimestep) {
	                update(simulationTimestep);
	                frameDelta -= simulationTimestep;

	                /*
	                 * Sanity check: bail if we run the loop too many times.
	                 *
	                 * One way this could happen is if update() takes longer to run than
	                 * the time it simulates, thereby causing a spiral of death. For ways
	                 * to avoid this, see `MainLoop.setEnd()`. Another way this could
	                 * happen is if the browser throttles serving frames, which typically
	                 * occurs when the tab is in the background or the device battery is
	                 * low. An event outside of the main loop such as audio processing or
	                 * synchronous resource reads could also cause the application to hang
	                 * temporarily and accumulate not-yet-simulated time as a result.
	                 *
	                 * 240 is chosen because, for any sane value of simulationTimestep, 240
	                 * updates will simulate at least one second, and it will simulate four
	                 * seconds with the default value of simulationTimestep. (Safari
	                 * notifies users that the script is taking too long to run if it takes
	                 * more than five seconds.)
	                 *
	                 * If there are more updates to run in a frame than this, the
	                 * application will appear to slow down to the user until it catches
	                 * back up. In networked applications this will usually cause the user
	                 * to get out of sync with their peers, but if the updates are taking
	                 * this long already, they're probably already out of sync.
	                 */
	                if (++numUpdateSteps >= 240) {
	                    panic = true;
	                    break;
	                }
	            }

	            /*
	             * Render the screen. We do this regardless of whether update() has run
	             * during this frame because it is possible to interpolate between updates
	             * to make the frame rate appear faster than updates are actually
	             * happening. See `MainLoop.setDraw()` for an explanation of how to do
	             * that.
	             *
	             * We draw after updating because we want the screen to reflect a state of
	             * the application that is as up-to-date as possible. (`MainLoop.start()`
	             * draws the very first frame in the application's initial state, before
	             * any updates have occurred.) Some sources speculate that rendering
	             * earlier in the requestAnimationFrame callback can get the screen painted
	             * faster; this is mostly not true, and even when it is, it's usually just
	             * a trade-off between rendering the current frame sooner and rendering the
	             * next frame later.
	             *
	             * See `MainLoop.setDraw()` for details about draw() itself.
	             */
	            draw(frameDelta / simulationTimestep);

	            // Run any updates that are not dependent on time in the simulation. See
	            // `MainLoop.setEnd()` for additional details on how to use this.
	            end(fps, panic);

	            panic = false;

	            // Run the loop again the next time the browser is ready to render.
	            rafHandle = requestAnimationFrame(animate);
	        }

	        // AMD support
	        if (typeof define === 'function' && define.amd) {
	            define(root.MainLoop);
	        }
	        // CommonJS support
	        else if ((typeof exports === 'undefined' ? 'undefined' : babelHelpers.typeof(exports)) === 'object') {
	                module.exports = root.MainLoop;
	            }
	    })();
	    return module.exports;
	})({ exports: {} }, __commonjs_global);

	var MainLoopLoopManager = (function () {
	    function MainLoopLoopManager() {
	        babelHelpers.classCallCheck(this, MainLoopLoopManager);
	    }

	    babelHelpers.createClass(MainLoopLoopManager, [{
	        key: 'setUpdate',
	        value: function setUpdate(updateMethod) {
	            mainloop.setUpdate(updateMethod);

	            return this;
	        }
	    }, {
	        key: 'setRender',
	        value: function setRender(renderMethod) {
	            mainloop.setDraw(renderMethod);

	            return this;
	        }
	    }, {
	        key: 'start',
	        value: function start() {
	            mainloop.start();
	        }
	    }]);
	    return MainLoopLoopManager;
	})();

	var DI = {
	    rendererManager: function rendererManager() {
	        return new ThreeRendererManager();
	    },
	    sceneManager: function sceneManager() {
	        return new ThreeSceneManager();
	    },
	    meshManager: function meshManager() {
	        return new ThreeMeshManager();
	    },
	    levelLoader: function levelLoader() {
	        return new LevelLoader(new QwestAjaxLoader());
	    },
	    entityManager: function entityManager() {
	        return new EntityManager();
	    },
	    loopManager: function loopManager() {
	        return new MainLoopLoopManager();
	    },
	    meshLoader: function meshLoader() {
	        return new ThreeObjectMeshLoader();
	    },
	    performanceViewer: function performanceViewer() {
	        return new StatsPerformanceViewer();
	    }
	};

	var FlatShading = 1;

	window.onload = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	    var levelLoader, level, meshLoader, meshManager, meshId, sceneManager, sceneId, entityManager, rendererManager, loopManager, meshIsAdded, performanceViewer;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	        while (1) {
	            switch (_context.prev = _context.next) {
	                case 0:
	                    levelLoader = DI.levelLoader();
	                    _context.next = 3;
	                    return levelLoader.loadLevel('levels/level-one.json');

	                case 3:
	                    level = _context.sent;
	                    meshLoader = DI.meshLoader();
	                    meshManager = DI.meshManager();
	                    _context.t0 = meshManager;
	                    _context.next = 9;
	                    return meshLoader.load('meshes/' + level.mesh, { shading: FlatShading });

	                case 9:
	                    _context.t1 = _context.sent;
	                    meshId = _context.t0.addMesh.call(_context.t0, _context.t1);
	                    sceneManager = DI.sceneManager();
	                    sceneId = sceneManager.createScene();

	                    sceneManager.addToScene(sceneId, meshManager.getMesh(meshId));
	                    sceneManager.addAmbientLightToScene(sceneId, 0x101030);
	                    sceneManager.addDirectionalLightToScene(sceneId, 0xffeedd, 0, 0, 1);

	                    entityManager = DI.entityManager();
	                    rendererManager = DI.rendererManager();
	                    loopManager = DI.loopManager();
	                    meshIsAdded = true;

	                    document.addEventListener('click', function (e) {
	                        if (meshIsAdded) {
	                            sceneManager.removeFromScene(sceneId, meshManager.getMesh(meshId));
	                        } else {
	                            sceneManager.addToScene(sceneId, meshManager.getMesh(meshId));
	                        }

	                        meshIsAdded = !meshIsAdded;
	                    });

	                    performanceViewer = DI.performanceViewer();

	                    performanceViewer.setMode(0);

	                    loopManager.setUpdate(function (delta) {
	                        meshManager.getMesh(meshId).rotation.y += 0.001 * delta;
	                        entityManager.onLogic(delta);
	                    }).setRender(function (interpolationPercentage) {
	                        performanceViewer.begin();

	                        rendererManager.render(sceneManager.getScene(sceneId), interpolationPercentage);

	                        performanceViewer.end();
	                    }).start();

	                case 24:
	                case 'end':
	                    return _context.stop();
	            }
	        }
	    }, _callee, this);
	}));

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2cuanMiLCJzb3VyY2VzIjpbIi4uLy9ob21lL3VidW50dS93b3Jrc3BhY2Uvbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL3NyYy9jb3JlL3N5c3RlbS5qcyIsIi4uLy9ob21lL3VidW50dS93b3Jrc3BhY2Uvbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL3NyYy9jb3JlL2NvbXBvbmVudC5qcyIsIi4uLy9ob21lL3VidW50dS93b3Jrc3BhY2Uvbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL3NyYy9jb3JlL2VudGl0eS5qcyIsIi4uLy9ob21lL3VidW50dS93b3Jrc3BhY2Uvbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL3NyYy9jb3JlL2V2ZW50LmpzIiwiLi4vL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9zcmMvdmlldy90aHJlZS1yZW5kZXJlci1tYW5hZ2VyLmpzIiwiLi4vL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9ub2RlX21vZHVsZXMvc3RhdHMuanMvc3JjL1N0YXRzLmpzIiwiLi4vL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9zcmMvdmlldy9zdGF0cy1wZXJmb3JtYW5jZS12aWV3ZXIuanMiLCIuLi8vaG9tZS91YnVudHUvd29ya3NwYWNlL3NyYy9sb2dpYy90aHJlZS1zY2VuZS1tYW5hZ2VyLmpzIiwiLi4vL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9zcmMvbG9naWMvdGhyZWUtbWVzaC1tYW5hZ2VyLmpzIiwiLi4vL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9zcmMvbG9naWMvdGhyZWUtb2JqZWN0LW1lc2gtbG9hZGVyLmpzIiwiLi4vL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9ub2RlX21vZHVsZXMvanF1ZXJ5LXBhcmFtL2pxdWVyeS1wYXJhbS5qcyIsIi4uLy9ob21lL3VidW50dS93b3Jrc3BhY2Uvbm9kZV9tb2R1bGVzL3Bpbmt5c3dlYXIvcGlua3lzd2Vhci5qcyIsIi4uLy9ob21lL3VidW50dS93b3Jrc3BhY2Uvbm9kZV9tb2R1bGVzL3F3ZXN0L3NyYy9xd2VzdC5qcyIsIi4uLy9ob21lL3VidW50dS93b3Jrc3BhY2Uvc3JjL2xvZ2ljL3F3ZXN0LWFqYXgtbG9hZGVyLmpzIiwiLi4vL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9zcmMvbG9naWMvbGV2ZWwtbG9hZGVyLmpzIiwiLi4vL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9zcmMvZXh0ZXJuYWwvbWFpbmxvb3AuanMiLCIuLi8vaG9tZS91YnVudHUvd29ya3NwYWNlL3NyYy9sb2dpYy9tYWlubG9vcC1sb29wLW1hbmFnZXIuanMiLCIuLi8vaG9tZS91YnVudHUvd29ya3NwYWNlL3NyYy91dGlsaXR5L2RlcGVuZGVuY3ktaW5qZWN0b3IuanMiLCIuLi8vaG9tZS91YnVudHUvd29ya3NwYWNlL3NyYy9jb25zdGFudHMvc2hhZGluZy5qcyIsIi4uLy9ob21lL3VidW50dS93b3Jrc3BhY2Uvc3JjL2dnLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlbGVjdG9yVHlwZSB9IGZyb20gJy4vZW50aXR5JztcblxuZXhwb3J0IGNvbnN0IFN5c3RlbVR5cGUgPSB7XG4gICAgTG9naWMgICA6IDAsXG4gICAgUmVuZGVyICA6IDFcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN5c3RlbU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmxvZ2ljU3lzdGVtcyAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMucmVuZGVyU3lzdGVtcyA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJTeXN0ZW0odHlwZSwgc2VsZWN0b3IsIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlICE9PSBTeXN0ZW1UeXBlLkxvZ2ljICYmIHR5cGUgIT09IFN5c3RlbVR5cGUuUmVuZGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ3R5cGUgbXVzdCBiZSBhIHZhbGlkIFN5c3RlbVR5cGUuJyk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgaWYgKHNlbGVjdG9yICE9PSBTZWxlY3RvclR5cGUuR2V0ICYmIHNlbGVjdG9yICE9PSBTZWxlY3RvclR5cGUuR2V0V2l0aCAmJlxuICAgICAgICAgICAgc2VsZWN0b3IgIT09IFNlbGVjdG9yVHlwZS5HZXRXaXRoT25seSAmJiBzZWxlY3RvciAhPT0gU2VsZWN0b3JUeXBlLkdldFdpdGhvdXQpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignc2VsZWN0b3IgbXVzdCBiZSBhIHZhbGlkIFNlbGVjdG9yVHlwZS4nKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnRzICE9PSAnbnVtYmVyJykgIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignY29tcG9uZW50cyBtdXN0IGJlIGEgbnVtYmVyLicpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHN5c3RlbSA9IHtcbiAgICAgICAgc2VsZWN0b3IsXG4gICAgICAgIGNvbXBvbmVudHMsXG4gICAgICAgIGNhbGxiYWNrXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBsZXQgc3lzdGVtSWQgPSBNYXRoLm1heCgwLCAuLi50aGlzLmxvZ2ljU3lzdGVtcy5rZXlzKCksIC4uLnRoaXMucmVuZGVyU3lzdGVtcy5rZXlzKCkpICsgMTtcbiAgICAgICAgXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBTeXN0ZW1UeXBlLkxvZ2ljIDogdGhpcy5sb2dpY1N5c3RlbXMuc2V0KHN5c3RlbUlkLCBzeXN0ZW0pOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU3lzdGVtVHlwZS5SZW5kZXIgOiB0aGlzLnJlbmRlclN5c3RlbXMuc2V0KHN5c3RlbUlkLCBzeXN0ZW0pOyBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHN5c3RlbUlkO1xuICAgIH1cbiAgICBcbiAgICByZW1vdmVTeXN0ZW0oc3lzdGVtSWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9naWNTeXN0ZW1zLmRlbGV0ZShzeXN0ZW1JZCkgfHwgdGhpcy5yZW5kZXJTeXN0ZW1zLmRlbGV0ZShzeXN0ZW1JZCk7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBvbmVudE1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIFxuICAgIG5ld0NvbXBvbmVudChjb21wb25lbnRJZCkge1xuICAgICAgICBsZXQgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRzLmdldChjb21wb25lbnRJZCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoY29tcG9uZW50ID09PSBudWxsIHx8IGNvbXBvbmVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgY29tcG9uZW50KSB7XG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6IHJldHVybiBuZXcgY29tcG9uZW50KCk7XG4gICAgICAgICAgICBjYXNlICdvYmplY3QnICA6IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKChjb21wb25lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJldCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoY29tcG9uZW50KS5mb3JFYWNoKGtleSA9PiByZXRba2V5XSA9IGNvbXBvbmVudFtrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICAgICAgfSkoY29tcG9uZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgICAgIGlmIChjb21wb25lbnQgPT09IG51bGwgfHwgY29tcG9uZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignY29tcG9uZW50IGNhbm5vdCBiZSBudWxsLicpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgbWF4ID0gTWF0aC5tYXgoLi4udGhpcy5jb21wb25lbnRzLmtleXMoKSk7XG4gICAgICAgIFxuICAgICAgICBsZXQgaWQgPSBtYXggPT09IHVuZGVmaW5lZCB8fCBtYXggPT09IG51bGwgfHwgbWF4ID09PSAtSW5maW5pdHkgPyAxIDogbWF4ID09PSAwID8gMSA6IG1heCAqIDI7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnRzLnNldChpZCwgY29tcG9uZW50KTtcblxuICAgICAgICByZXR1cm4gaWQ7XG4gICAgfVxuICAgIFxuICAgIGdldENvbXBvbmVudHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudHM7XG4gICAgfVxufSIsImltcG9ydCBDb21wb25lbnRNYW5hZ2VyICAgICAgICAgICAgICBmcm9tICcuL2NvbXBvbmVudCc7XG5pbXBvcnQgU3lzdGVtTWFuYWdlciwgeyBTeXN0ZW1UeXBlIH0gZnJvbSAnLi9zeXN0ZW0nO1xuaW1wb3J0IEV2ZW50SGFuZGxlciAgICAgICAgICAgICAgICAgIGZyb20gJy4vZXZlbnQnO1xuXG5leHBvcnQgY29uc3QgU2VsZWN0b3JUeXBlID0ge1xuICAgIEdldCAgICAgICAgIDogMCxcbiAgICBHZXRXaXRoICAgICA6IDEsXG4gICAgR2V0V2l0aE9ubHkgOiAyLFxuICAgIEdldFdpdGhvdXQgIDogM1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5TWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoY2FwYWNpdHkgPSAxMDAwKSB7XG4gICAgICAgIHRoaXMuY2FwYWNpdHkgICAgICAgICA9IGNhcGFjaXR5O1xuICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSAtMTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeSAgICA9IG5ldyBFbnRpdHlGYWN0b3J5KCk7XG4gICAgICAgIHRoaXMuc3lzdGVtTWFuYWdlciAgICA9IG5ldyBTeXN0ZW1NYW5hZ2VyKCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50TWFuYWdlciA9IG5ldyBDb21wb25lbnRNYW5hZ2VyKCk7XG4gICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyICAgICA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXRpZXMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiB0aGlzLmNhcGFjaXR5IH0sICgpID0+IHsgcmV0dXJuIDA7IH0gKTtcbiAgICB9XG4gICAgXG4gICAgaW5jcmVhc2VDYXBhY2l0eSgpIHtcbiAgICAgICAgbGV0IG9sZENhcGFjaXR5ID0gdGhpcy5jYXBhY2l0eTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2FwYWNpdHkgKj0gMjtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSBvbGRDYXBhY2l0eTsgaSA8IHRoaXMuY2FwYWNpdHk7ICsraSkge1xuICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tpXSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGNvbXBvbmVudElkIG9mIHRoaXMuY29tcG9uZW50TWFuYWdlci5nZXRDb21wb25lbnRzKCkua2V5cygpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gb2xkQ2FwYWNpdHk7IGkgPCB0aGlzLmNhcGFjaXR5OyArK2kpIHtcbiAgICAgICAgICAgICAgICB0aGlzW2NvbXBvbmVudElkXS5wdXNoKHRoaXMuY29tcG9uZW50TWFuYWdlci5uZXdDb21wb25lbnQoY29tcG9uZW50SWQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBuZXdFbnRpdHkoY29tcG9uZW50cykge1xuICAgICAgICBpZiAodHlwZW9mIGNvbXBvbmVudHMgIT09ICdudW1iZXInIHx8IGNvbXBvbmVudHMgPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FwYWNpdHk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBlbnRpdHlJZCA9IDA7XG4gICAgICAgIFxuICAgICAgICBmb3IgKDsgZW50aXR5SWQgPCB0aGlzLmNhcGFjaXR5OyArK2VudGl0eUlkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gPT09IDApIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGVudGl0eUlkID49IHRoaXMuY2FwYWNpdHkpIHtcbiAgICAgICAgICAgIC8vIHRvZG86IGF1dG8gaW5jcmVhc2UgY2FwYWNpdHk/XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXBhY2l0eTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGVudGl0eUlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSBlbnRpdHlJZDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gPSBjb21wb25lbnRzO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGVudGl0eUlkO1xuICAgIH1cbiAgICBcbiAgICBkZWxldGVFbnRpdHkoZW50aXR5SWQpIHtcbiAgICAgICAgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gPSAwO1xuICAgICAgICBcbiAgICAgICAgaWYgKGVudGl0eUlkIDwgdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSBlbnRpdHlJZDsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2ldICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TWF4RW50aXR5ID0gaTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgKmdldEVudGl0aWVzKGNvbXBvbmVudHMgPSAwLCB0eXBlID0gU2VsZWN0b3JUeXBlLkdldFdpdGgpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFNlbGVjdG9yVHlwZS5HZXRXaXRoOiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW50aXR5SWQgaW4gdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5SWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbZW50aXR5SWRdICE9PSAwICYmICh0aGlzLmVudGl0aWVzW2VudGl0eUlkXSAmIGNvbXBvbmVudHMpID09PSBjb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCBNYXRoLmZsb29yKGVudGl0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgU2VsZWN0b3JUeXBlLkdldFdpdGhPbmx5OiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW50aXR5SWQgaW4gdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5SWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbZW50aXR5SWRdICE9PSAwICYmIHRoaXMuZW50aXRpZXNbZW50aXR5SWRdID09PSBjb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCBNYXRoLmZsb29yKGVudGl0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgU2VsZWN0b3JUeXBlLkdldFdpdGhvdXQ6IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRpdHlJZCBpbiB0aGlzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdHlJZCA+IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gIT09IDAgJiYgKHRoaXMuZW50aXRpZXNbZW50aXR5SWRdICYgY29tcG9uZW50cykgIT09IGNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIE1hdGguZmxvb3IoZW50aXR5SWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBTZWxlY3RvclR5cGUuR2V0OiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW50aXR5SWQgaW4gdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5SWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgTWF0aC5mbG9vcihlbnRpdHlJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ29tcG9uZW50IE1hbmFnZXJcbiAgICBcbiAgICByZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudElkID0gdGhpcy5jb21wb25lbnRNYW5hZ2VyLnJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzW2NvbXBvbmVudElkXSA9IFtdO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNhcGFjaXR5OyArK2kpIHtcbiAgICAgICAgICAgIHRoaXNbY29tcG9uZW50SWRdLnB1c2godGhpcy5jb21wb25lbnRNYW5hZ2VyLm5ld0NvbXBvbmVudChjb21wb25lbnRJZCkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgaW5pdGlhbGl6ZXI7XG5cbiAgICAgICAgc3dpdGNoICh0eXBlb2YgY29tcG9uZW50KSB7XG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6IGluaXRpYWxpemVyID0gY29tcG9uZW50OyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6IHtcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMoY29tcG9uZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gY29tcG9uZW50W2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OiBpbml0aWFsaXplciA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29tcG9uZW50OyB9OyBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LnJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBjb21wb25lbnRJZDtcbiAgICB9XG4gICAgXG4gICAgYWRkQ29tcG9uZW50KGVudGl0eUlkLCBjb21wb25lbnRJZCkge1xuICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eUlkXSB8PSBjb21wb25lbnRJZDtcbiAgICB9XG4gICAgXG4gICAgcmVtb3ZlQ29tcG9uZW50KGVudGl0eUlkLCBjb21wb25lbnRJZCkge1xuICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eUlkXSAmPSB+Y29tcG9uZW50SWQ7XG4gICAgfVxuICAgIFxuICAgIC8vIFN5c3RlbSBNYW5hZ2VyXG4gICAgXG4gICAgcmVnaXN0ZXJTeXN0ZW0odHlwZSwgc2VsZWN0b3IsIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVnaXN0ZXJTeXN0ZW0odHlwZSwgc2VsZWN0b3IsIGNvbXBvbmVudHMsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJMb2dpY1N5c3RlbShzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbShTeXN0ZW1UeXBlLkxvZ2ljLCBzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spO1xuICAgIH1cbiAgICBcbiAgICByZWdpc3RlclJlbmRlclN5c3RlbShzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbShTeXN0ZW1UeXBlLlJlbmRlciwgc2VsZWN0b3IsIGNvbXBvbmVudHMsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgXG4gICAgcmVtb3ZlU3lzdGVtKHN5c3RlbUlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVtb3ZlU3lzdGVtKHN5c3RlbUlkKTtcbiAgICB9XG4gICAgXG4gICAgb25Mb2dpYyhkZWx0YSkge1xuICAgICAgICBmb3IgKGxldCBzeXN0ZW0gb2YgdGhpcy5zeXN0ZW1NYW5hZ2VyLmxvZ2ljU3lzdGVtcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgc3lzdGVtLmNhbGxiYWNrLmNhbGwodGhpcywgdGhpcy5nZXRFbnRpdGllcyhzeXN0ZW0uY29tcG9uZW50cywgc3lzdGVtLnNlbGVjdG9yKSwgZGVsdGEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uUmVuZGVyKGRlbHRhKSB7XG4gICAgICAgIGZvciAobGV0IHN5c3RlbSBvZiB0aGlzLnN5c3RlbU1hbmFnZXIucmVuZGVyU3lzdGVtcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgc3lzdGVtLmNhbGxiYWNrLmNhbGwodGhpcywgdGhpcy5nZXRFbnRpdGllcyhzeXN0ZW0uY29tcG9uZW50cywgc3lzdGVtLnNlbGVjdG9yKSwgZGVsdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gRW50aXR5IEZhY3RvcnlcbiAgICBcbiAgICByZWdpc3RlckluaXRpYWxpemVyKGNvbXBvbmVudElkLCBpbml0aWFsaXplcikge1xuICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkucmVnaXN0ZXJJbml0aWFsaXplcihjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpO1xuICAgIH1cbiAgICBcbiAgICBidWlsZCgpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LmJ1aWxkKCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgd2l0aENvbXBvbmVudChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LndpdGhDb21wb25lbnQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGVDb25maWd1cmF0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnRpdHlGYWN0b3J5LmNyZWF0ZUNvbmZpZ3VyYXRpb24oKTtcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlKGNvdW50LCBjb25maWd1cmF0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVudGl0eUZhY3RvcnkuY3JlYXRlKHRoaXMsIGNvdW50LCBjb25maWd1cmF0aW9uKTtcbiAgICB9XG4gICAgXG4gICAgLy8gRXZlbnQgSGFuZGxlclxuICAgIFxuICAgIGxpc3RlbihldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLmxpc3RlbihldmVudCwgY2FsbGJhY2spO1xuICAgIH1cbiAgICBcbiAgICBzdG9wTGlzdGVuKGV2ZW50SWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLnN0b3BMaXN0ZW4oZXZlbnRJZCk7XG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyLmNhbGwodGhpcywgLi4uYXJndW1lbnRzKTtcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlckRlbGF5ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyRGVsYXllZC5jYWxsKHRoaXMsIC4uLmFyZ3VtZW50cyk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRW50aXR5RmFjdG9yeSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXJzICA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckluaXRpYWxpemVyKGNvbXBvbmVudElkLCBpbml0aWFsaXplcikge1xuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoY29tcG9uZW50SWQpIHx8IHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmluaXRpYWxpemVycy5zZXQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKTtcbiAgICB9XG4gICAgXG4gICAgYnVpbGQoKSB7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IG5ldyBNYXAoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICB3aXRoQ29tcG9uZW50KGNvbXBvbmVudElkLCBpbml0aWFsaXplcikge1xuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoY29tcG9uZW50SWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgaW5pdGlhbGl6ZXIgPSB0aGlzLmluaXRpYWxpemVycy5nZXQoY29tcG9uZW50SWQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uc2V0KGNvbXBvbmVudElkLCBpbml0aWFsaXplcik7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlQ29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlndXJhdGlvbjtcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlKGVudGl0eU1hbmFnZXIsIGNvdW50ID0gMSwgY29uZmlndXJhdGlvbiA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIShlbnRpdHlNYW5hZ2VyIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlcikpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbiB8fCB0aGlzLmNvbmZpZ3VyYXRpb247XG5cbiAgICAgICAgbGV0IGNvbXBvbmVudHMgPSAwO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY29tcG9uZW50IG9mIGNvbmZpZ3VyYXRpb24ua2V5cygpKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzIHw9IGNvbXBvbmVudDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGVudGl0aWVzID0gW107XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyArK2kpIHtcbiAgICAgICAgICAgIGxldCBlbnRpdHlJZCA9IGVudGl0eU1hbmFnZXIubmV3RW50aXR5KGNvbXBvbmVudHMpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZW50aXR5SWQgPj0gZW50aXR5TWFuYWdlci5jYXBhY2l0eSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBbY29tcG9uZW50SWQsIGluaXRpYWxpemVyXSBvZiBjb25maWd1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGluaXRpYWxpemVyLmNhbGwoZW50aXR5TWFuYWdlcltjb21wb25lbnRJZF1bZW50aXR5SWRdKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVudGl0eU1hbmFnZXJbY29tcG9uZW50SWRdW2VudGl0eUlkXSAhPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZW50aXR5TWFuYWdlcltjb21wb25lbnRJZF1bZW50aXR5SWRdICE9PSAnb2JqZWN0JyAmJiByZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHlNYW5hZ2VyW2NvbXBvbmVudElkXVtlbnRpdHlJZF0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBlbnRpdGllcy5wdXNoKGVudGl0eUlkKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLmxlbmd0aCA9PT0gMSA/IGVudGl0aWVzWzBdIDogZW50aXRpZXM7XG4gICAgfVxufSIsImltcG9ydCBFbnRpdHlNYW5hZ2VyIGZyb20gJy4vZW50aXR5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRIYW5kbGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIFxuICAgIGVtcHR5UHJvbWlzZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcHJvbWlzZShjYWxsYmFjaywgY29udGV4dCwgYXJncywgdGltZW91dCkge1xuICAgICAgICBpZiAodGltZW91dCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0eXBlb2YgY29udGV4dCA9PT0gICdvYmplY3QnID8gY2FsbGJhY2suY2FsbChjb250ZXh0LCAuLi5hcmdzKSA6IGNhbGxiYWNrLmFwcGx5KGNvbnRleHQsIC4uLmFyZ3MpKTtcbiAgICAgICAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHR5cGVvZiBjb250ZXh0ID09PSAnb2JqZWN0JyA/IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgLi4uYXJncykgOiBjYWxsYmFjay5hcHBseShjb250ZXh0LCAuLi5hcmdzKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBsaXN0ZW4oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnQgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoIXRoaXMuZXZlbnRzLmhhcyhldmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnNldChldmVudCwgbmV3IE1hcCgpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGV2ZW50SWQgPSAtMTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnRJZCA9IE1hdGgubWF4KGV2ZW50SWQsIC4uLmV2ZW50LmtleXMoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgKytldmVudElkO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5ldmVudHMuZ2V0KGV2ZW50KS5zZXQoZXZlbnRJZCwgY2FsbGJhY2spO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGV2ZW50SWQ7XG4gICAgfVxuICAgIFxuICAgIHN0b3BMaXN0ZW4oZXZlbnRJZCkge1xuICAgICAgICBmb3IgKGxldCBldmVudHMgb2YgdGhpcy5ldmVudHMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGlkIG9mIGV2ZW50cy5rZXlzKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaWQgPT09IGV2ZW50SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50cy5kZWxldGUoZXZlbnRJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICB0cmlnZ2VyKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXMgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyID8gdGhpcy5ldmVudEhhbmRsZXIgOiB0aGlzO1xuICAgICAgICBcbiAgICAgICAgbGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG4gICAgICAgIFxuICAgICAgICBsZXQgWyBldmVudCBdID0gYXJncy5zcGxpY2UoMCwgMSk7XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCAhc2VsZi5ldmVudHMuaGFzKGV2ZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuZW1wdHlQcm9taXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY2FsbGJhY2sgb2Ygc2VsZi5ldmVudHMuZ2V0KGV2ZW50KS52YWx1ZXMoKSkge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChzZWxmLnByb21pc2UoY2FsbGJhY2ssIHRoaXMsIGFyZ3MsIDEpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlckRlbGF5ZWQoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcyBpbnN0YW5jZW9mIEVudGl0eU1hbmFnZXIgPyB0aGlzLmV2ZW50SGFuZGxlciA6IHRoaXM7XG4gICAgICAgIFxuICAgICAgICBsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBbIGV2ZW50LCB0aW1lb3V0IF0gPSBhcmdzLnNwbGljZSgwLCAyKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnQgIT09ICdzdHJpbmcnIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKHRpbWVvdXQpIHx8ICFzZWxmLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5lbXB0eVByb21pc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHByb21pc2VzID0gW107XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBjYWxsYmFjayBvZiBzZWxmLmV2ZW50cy5nZXQoZXZlbnQpLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHNlbGYucHJvbWlzZShjYWxsYmFjaywgdGhpcywgYXJncywgdGltZW91dCkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH1cbn0iLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgdGhyZWUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaHJlZVJlbmRlcmVyTWFuYWdlciB7XG4gICAgcmVuZGVyZXIgICAgIDogdGhyZWUuV2ViR0xSZW5kZXJlcjtcbiAgICBjYW1lcmEgICAgICAgOiB0aHJlZS5DYW1lcmE7XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgdGhyZWUuV2ViR0xSZW5kZXJlcih7IGFudGlhbGlhcyA6IHRydWUgfSk7XG4gICAgICAgIHRoaXMuY2FtZXJhICAgPSBuZXcgdGhyZWUuUGVyc3BlY3RpdmVDYW1lcmEoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJlci5kb21FbGVtZW50KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnkgPSAyMDtcbiAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueiA9IDIwO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jYW1lcmEubG9va0F0KG5ldyB0aHJlZS5WZWN0b3IzKDAuMCwgMC4wLCAwLjApKTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyKHNjZW5lIDogdGhyZWUuU2NlbmUsIGludGVycG9sYXRpb25QZXJjZW50YWdlIDogbnVtYmVyKSA6IHZvaWQge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcihzY2VuZSwgdGhpcy5jYW1lcmEpO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGF1dGhvciBtcmRvb2IgLyBodHRwOi8vbXJkb29iLmNvbS9cbiAqL1xuXG52YXIgU3RhdHMgPSBmdW5jdGlvbiAoKSB7XG5cblx0dmFyIG5vdyA9ICggc2VsZi5wZXJmb3JtYW5jZSAmJiBzZWxmLnBlcmZvcm1hbmNlLm5vdyApID8gc2VsZi5wZXJmb3JtYW5jZS5ub3cuYmluZCggcGVyZm9ybWFuY2UgKSA6IERhdGUubm93O1xuXG5cdHZhciBzdGFydFRpbWUgPSBub3coKSwgcHJldlRpbWUgPSBzdGFydFRpbWU7XG5cdHZhciBmcmFtZXMgPSAwLCBtb2RlID0gMDtcblxuXHRmdW5jdGlvbiBjcmVhdGVFbGVtZW50KCB0YWcsIGlkLCBjc3MgKSB7XG5cblx0XHR2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIHRhZyApO1xuXHRcdGVsZW1lbnQuaWQgPSBpZDtcblx0XHRlbGVtZW50LnN0eWxlLmNzc1RleHQgPSBjc3M7XG5cdFx0cmV0dXJuIGVsZW1lbnQ7XG5cblx0fVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZVBhbmVsKCBpZCwgZmcsIGJnICkge1xuXG5cdFx0dmFyIGRpdiA9IGNyZWF0ZUVsZW1lbnQoICdkaXYnLCBpZCwgJ3BhZGRpbmc6MCAwIDNweCAzcHg7dGV4dC1hbGlnbjpsZWZ0O2JhY2tncm91bmQ6JyArIGJnICk7XG5cblx0XHR2YXIgdGV4dCA9IGNyZWF0ZUVsZW1lbnQoICdkaXYnLCBpZCArICdUZXh0JywgJ2ZvbnQtZmFtaWx5OkhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmO2ZvbnQtc2l6ZTo5cHg7Zm9udC13ZWlnaHQ6Ym9sZDtsaW5lLWhlaWdodDoxNXB4O2NvbG9yOicgKyBmZyApO1xuXHRcdHRleHQuaW5uZXJIVE1MID0gaWQudG9VcHBlckNhc2UoKTtcblx0XHRkaXYuYXBwZW5kQ2hpbGQoIHRleHQgKTtcblxuXHRcdHZhciBncmFwaCA9IGNyZWF0ZUVsZW1lbnQoICdkaXYnLCBpZCArICdHcmFwaCcsICd3aWR0aDo3NHB4O2hlaWdodDozMHB4O2JhY2tncm91bmQ6JyArIGZnICk7XG5cdFx0ZGl2LmFwcGVuZENoaWxkKCBncmFwaCApO1xuXG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgNzQ7IGkgKysgKSB7XG5cblx0XHRcdGdyYXBoLmFwcGVuZENoaWxkKCBjcmVhdGVFbGVtZW50KCAnc3BhbicsICcnLCAnd2lkdGg6MXB4O2hlaWdodDozMHB4O2Zsb2F0OmxlZnQ7b3BhY2l0eTowLjk7YmFja2dyb3VuZDonICsgYmcgKSApO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRpdjtcblxuXHR9XG5cblx0ZnVuY3Rpb24gc2V0TW9kZSggdmFsdWUgKSB7XG5cblx0XHR2YXIgY2hpbGRyZW4gPSBjb250YWluZXIuY2hpbGRyZW47XG5cblx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdGNoaWxkcmVuWyBpIF0uc3R5bGUuZGlzcGxheSA9IGkgPT09IHZhbHVlID8gJ2Jsb2NrJyA6ICdub25lJztcblxuXHRcdH1cblxuXHRcdG1vZGUgPSB2YWx1ZTtcblxuXHR9XG5cblx0ZnVuY3Rpb24gdXBkYXRlR3JhcGgoIGRvbSwgdmFsdWUgKSB7XG5cblx0XHR2YXIgY2hpbGQgPSBkb20uYXBwZW5kQ2hpbGQoIGRvbS5maXJzdENoaWxkICk7XG5cdFx0Y2hpbGQuc3R5bGUuaGVpZ2h0ID0gTWF0aC5taW4oIDMwLCAzMCAtIHZhbHVlICogMzAgKSArICdweCc7XG5cblx0fVxuXG5cdC8vXG5cblx0dmFyIGNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoICdkaXYnLCAnc3RhdHMnLCAnd2lkdGg6ODBweDtvcGFjaXR5OjAuOTtjdXJzb3I6cG9pbnRlcicgKTtcblx0Y29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWRvd24nLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRzZXRNb2RlKCArKyBtb2RlICUgY29udGFpbmVyLmNoaWxkcmVuLmxlbmd0aCApO1xuXG5cdH0sIGZhbHNlICk7XG5cblx0Ly8gRlBTXG5cblx0dmFyIGZwcyA9IDAsIGZwc01pbiA9IEluZmluaXR5LCBmcHNNYXggPSAwO1xuXG5cdHZhciBmcHNEaXYgPSBjcmVhdGVQYW5lbCggJ2ZwcycsICcjMGZmJywgJyMwMDInICk7XG5cdHZhciBmcHNUZXh0ID0gZnBzRGl2LmNoaWxkcmVuWyAwIF07XG5cdHZhciBmcHNHcmFwaCA9IGZwc0Rpdi5jaGlsZHJlblsgMSBdO1xuXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZCggZnBzRGl2ICk7XG5cblx0Ly8gTVNcblxuXHR2YXIgbXMgPSAwLCBtc01pbiA9IEluZmluaXR5LCBtc01heCA9IDA7XG5cblx0dmFyIG1zRGl2ID0gY3JlYXRlUGFuZWwoICdtcycsICcjMGYwJywgJyMwMjAnICk7XG5cdHZhciBtc1RleHQgPSBtc0Rpdi5jaGlsZHJlblsgMCBdO1xuXHR2YXIgbXNHcmFwaCA9IG1zRGl2LmNoaWxkcmVuWyAxIF07XG5cblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKCBtc0RpdiApO1xuXG5cdC8vIE1FTVxuXG5cdGlmICggc2VsZi5wZXJmb3JtYW5jZSAmJiBzZWxmLnBlcmZvcm1hbmNlLm1lbW9yeSApIHtcblxuXHRcdHZhciBtZW0gPSAwLCBtZW1NaW4gPSBJbmZpbml0eSwgbWVtTWF4ID0gMDtcblxuXHRcdHZhciBtZW1EaXYgPSBjcmVhdGVQYW5lbCggJ21iJywgJyNmMDgnLCAnIzIwMScgKTtcblx0XHR2YXIgbWVtVGV4dCA9IG1lbURpdi5jaGlsZHJlblsgMCBdO1xuXHRcdHZhciBtZW1HcmFwaCA9IG1lbURpdi5jaGlsZHJlblsgMSBdO1xuXG5cdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKCBtZW1EaXYgKTtcblxuXHR9XG5cblx0Ly9cblxuXHRzZXRNb2RlKCBtb2RlICk7XG5cblx0cmV0dXJuIHtcblxuXHRcdFJFVklTSU9OOiAxNCxcblxuXHRcdGRvbUVsZW1lbnQ6IGNvbnRhaW5lcixcblxuXHRcdHNldE1vZGU6IHNldE1vZGUsXG5cblx0XHRiZWdpbjogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRzdGFydFRpbWUgPSBub3coKTtcblxuXHRcdH0sXG5cblx0XHRlbmQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0dmFyIHRpbWUgPSBub3coKTtcblxuXHRcdFx0bXMgPSB0aW1lIC0gc3RhcnRUaW1lO1xuXHRcdFx0bXNNaW4gPSBNYXRoLm1pbiggbXNNaW4sIG1zICk7XG5cdFx0XHRtc01heCA9IE1hdGgubWF4KCBtc01heCwgbXMgKTtcblxuXHRcdFx0bXNUZXh0LnRleHRDb250ZW50ID0gKCBtcyB8IDAgKSArICcgTVMgKCcgKyAoIG1zTWluIHwgMCApICsgJy0nICsgKCBtc01heCB8IDAgKSArICcpJztcblx0XHRcdHVwZGF0ZUdyYXBoKCBtc0dyYXBoLCBtcyAvIDIwMCApO1xuXG5cdFx0XHRmcmFtZXMgKys7XG5cblx0XHRcdGlmICggdGltZSA+IHByZXZUaW1lICsgMTAwMCApIHtcblxuXHRcdFx0XHRmcHMgPSBNYXRoLnJvdW5kKCAoIGZyYW1lcyAqIDEwMDAgKSAvICggdGltZSAtIHByZXZUaW1lICkgKTtcblx0XHRcdFx0ZnBzTWluID0gTWF0aC5taW4oIGZwc01pbiwgZnBzICk7XG5cdFx0XHRcdGZwc01heCA9IE1hdGgubWF4KCBmcHNNYXgsIGZwcyApO1xuXG5cdFx0XHRcdGZwc1RleHQudGV4dENvbnRlbnQgPSBmcHMgKyAnIEZQUyAoJyArIGZwc01pbiArICctJyArIGZwc01heCArICcpJztcblx0XHRcdFx0dXBkYXRlR3JhcGgoIGZwc0dyYXBoLCBmcHMgLyAxMDAgKTtcblxuXHRcdFx0XHRwcmV2VGltZSA9IHRpbWU7XG5cdFx0XHRcdGZyYW1lcyA9IDA7XG5cblx0XHRcdFx0aWYgKCBtZW0gIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRcdHZhciBoZWFwU2l6ZSA9IHBlcmZvcm1hbmNlLm1lbW9yeS51c2VkSlNIZWFwU2l6ZTtcblx0XHRcdFx0XHR2YXIgaGVhcFNpemVMaW1pdCA9IHBlcmZvcm1hbmNlLm1lbW9yeS5qc0hlYXBTaXplTGltaXQ7XG5cblx0XHRcdFx0XHRtZW0gPSBNYXRoLnJvdW5kKCBoZWFwU2l6ZSAqIDAuMDAwMDAwOTU0ICk7XG5cdFx0XHRcdFx0bWVtTWluID0gTWF0aC5taW4oIG1lbU1pbiwgbWVtICk7XG5cdFx0XHRcdFx0bWVtTWF4ID0gTWF0aC5tYXgoIG1lbU1heCwgbWVtICk7XG5cblx0XHRcdFx0XHRtZW1UZXh0LnRleHRDb250ZW50ID0gbWVtICsgJyBNQiAoJyArIG1lbU1pbiArICctJyArIG1lbU1heCArICcpJztcblx0XHRcdFx0XHR1cGRhdGVHcmFwaCggbWVtR3JhcGgsIGhlYXBTaXplIC8gaGVhcFNpemVMaW1pdCApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGltZTtcblxuXHRcdH0sXG5cblx0XHR1cGRhdGU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0c3RhcnRUaW1lID0gdGhpcy5lbmQoKTtcblxuXHRcdH1cblxuXHR9O1xuXG59O1xuXG5pZiAoIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICkge1xuXG5cdG1vZHVsZS5leHBvcnRzID0gU3RhdHM7XG5cbn1cbiIsIi8qIEBmbG93ICovXG5cbmltcG9ydCBTdGF0cyBmcm9tICdzdGF0cy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRzUGVyZm9ybWFuY2VWaWV3ZXIge1xuICAgIHN0YXRzIDogU3RhdHM7XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc3RhdHMgPSBuZXcgU3RhdHMoKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy5zdGF0cy5kb21FbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgICAgIHRoaXMuc3RhdHMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0ID0gJzBweCc7XG4gICAgICAgICAgICB0aGlzLnN0YXRzLmRvbUVsZW1lbnQuc3R5bGUudG9wID0gJzBweCc7XG4gICAgICAgICAgICAgXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuc3RhdHMuZG9tRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgc2V0TW9kZShtb2RlOiAwIHwgMSk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXRzLnNldE1vZGUobW9kZSk7XG4gICAgfVxuICAgIFxuICAgIGJlZ2luKCkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdGF0cy5iZWdpbigpO1xuICAgIH1cbiAgICBcbiAgICBlbmQoKSA6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXRzLmVuZCgpO1xuICAgIH1cbn1cbiIsIi8qIEBmbG93ICovXG5cbmltcG9ydCB0aHJlZSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRocmVlU2NlbmVNYW5hZ2VyIHtcbiAgICBzY2VuZXMgOiBBcnJheTx0aHJlZS5TY2VuZT47XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc2NlbmVzID0gW107XG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZVNjZW5lKCkgOiBudW1iZXIge1xuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgc2NlbmUsIGFkZCBpdCB0byB0aGUgbGlzdCBvZiBzY2VuZXMgYW5kIHJldHVybiBhIGhhbmRsZSAoaWQpIHRvIGl0XG4gICAgICAgIHJldHVybiB0aGlzLnNjZW5lcy5wdXNoKG5ldyB0aHJlZS5TY2VuZSgpKSAtIDE7XG4gICAgfVxuICAgIFxuICAgIGdldFNjZW5lKHNjZW5lSWQgOiBudW1iZXIpIDogdGhyZWUuU2NlbmUge1xuICAgICAgICByZXR1cm4gdGhpcy5zY2VuZXNbc2NlbmVJZF07XG4gICAgfVxuICAgIFxuICAgIGFkZFRvU2NlbmUoc2NlbmVJZCA6IG51bWJlciwgb2JqZWN0IDogdGhyZWUuT2JqZWN0M0QpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuc2NlbmVzW3NjZW5lSWRdLmFkZChvYmplY3QpO1xuICAgIH1cbiAgICBcbiAgICBhZGRBbWJpZW50TGlnaHRUb1NjZW5lKHNjZW5lSWQgOiBudW1iZXIsIGNvbG9yIDogbnVtYmVyKSA6IHZvaWQge1xuICAgICAgICB0aGlzLnNjZW5lc1tzY2VuZUlkXS5hZGQobmV3IHRocmVlLkFtYmllbnRMaWdodChjb2xvcikpO1xuICAgIH1cbiAgICBcbiAgICBhZGREaXJlY3Rpb25hbExpZ2h0VG9TY2VuZShzY2VuZUlkIDogbnVtYmVyLCBjb2xvciA6IG51bWJlciwgeCA6IG51bWJlciwgeSA6IG51bWJlciwgeiA6IG51bWJlcikgOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbGlnaHQgPSBuZXcgdGhyZWUuRGlyZWN0aW9uYWxMaWdodChjb2xvcik7XG5cdCAgICBsaWdodC5wb3NpdGlvbi5zZXQoeCwgeSwgeik7XG5cdFxuICAgICAgICB0aGlzLnNjZW5lc1tzY2VuZUlkXS5hZGQobGlnaHQpO1xuICAgIH1cbiAgICBcbiAgICByZW1vdmVGcm9tU2NlbmUoc2NlbmVJZCA6IG51bWJlciwgb2JqZWN0IDogdGhyZWUuT2JqZWN0M0QpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuc2NlbmVzW3NjZW5lSWRdLnJlbW92ZShvYmplY3QpO1xuICAgIH1cbn0iLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgdGhyZWUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaHJlZU1lc2hNYW5hZ2VyIHtcbiAgICBtZXNoZXMgOiBBcnJheTx0aHJlZS5NZXNoPjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5tZXNoZXMgPSBbXTtcbiAgICB9XG4gICAgXG4gICAgYWRkTWVzaChvYmplY3QgOiB0aHJlZS5NZXNoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lc2hlcy5wdXNoKG9iamVjdCkgLSAxO1xuICAgIH1cbiAgICBcbiAgICBnZXRNZXNoKG1lc2hJZCA6IG51bWJlcikgOiB0aHJlZS5NZXNoIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzaGVzW21lc2hJZF07XG4gICAgfVxufSIsIi8qIEBmbG93ICovXG5cbmltcG9ydCB0aHJlZSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRocmVlT2JqZWN0TWVzaExvYWRlciB7XG4gICAgbG9hZGVyICA6IHRocmVlLk9iamVjdExvYWRlcjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5sb2FkZXIgID0gbmV3IHRocmVlLk9iamVjdExvYWRlcigpO1xuICAgIH1cbiAgICBcbiAgICBvblByb2dyZXNzKCkge1xuICAgICAgICAvLyBwbGFjZWhvbGRlclxuICAgIH1cbiAgICBcbiAgICAvLyB0b2RvIHRoaXMgbm93IHJldHVybnMgYSBzY2VuZS4uIGltcGxpY2F0aW9ucz9cbiAgICAvLyB0b2RvIGFkZCBvcHRpb25zIGFzIGEgZGVzdHJ1Y3RhYmxlIG9iamVjdCAtPiBzdG9wcGVkIGJ5IGZsb3c6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9mbG93L2lzc3Vlcy8xODNcbiAgICBsb2FkKHBhdGggOiBzdHJpbmcsIG9wdGlvbnM/IDogT2JqZWN0KSA6IFByb21pc2Uge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNoYWRpbmcgPSAob3B0aW9ucyB8fCB7IH0pLnNoYWRpbmc7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzZWxmLmxvYWRlci5sb2FkKHBhdGgsIG9iaiA9PiByZXNvbHZlKG9iaiksIGluZm8gPT4gc2VsZi5vblByb2dyZXNzKGluZm8pLCBlcnIgPT4gcmVqZWN0KGVycikpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKG1lc2ggPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzaGFkaW5nICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXNoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBtZXNoLnRyYXZlcnNlKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiB0aHJlZS5NZXNoKSB7XG4gICAgICAgICAgICAgICAgICAgY2hpbGQubWF0ZXJpYWwuc2hhZGluZyA9IHNoYWRpbmc7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIG1lc2g7XG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSIsIi8qKlxuICogQHByZXNlcnZlIGpxdWVyeS1wYXJhbSAoYykgMjAxNSBLTk9XTEVER0VDT0RFIHwgTUlUXG4gKi9cbi8qZ2xvYmFsIGRlZmluZSAqL1xuKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgcGFyYW0gPSBmdW5jdGlvbiAoYSkge1xuICAgICAgICB2YXIgYWRkID0gZnVuY3Rpb24gKHMsIGssIHYpIHtcbiAgICAgICAgICAgIHYgPSB0eXBlb2YgdiA9PT0gJ2Z1bmN0aW9uJyA/IHYoKSA6IHYgPT09IG51bGwgPyAnJyA6IHYgPT09IHVuZGVmaW5lZCA/ICcnIDogdjtcbiAgICAgICAgICAgIHNbcy5sZW5ndGhdID0gZW5jb2RlVVJJQ29tcG9uZW50KGspICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHYpO1xuICAgICAgICB9LCBidWlsZFBhcmFtcyA9IGZ1bmN0aW9uIChwcmVmaXgsIG9iaiwgcykge1xuICAgICAgICAgICAgdmFyIGksIGxlbiwga2V5O1xuXG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBvYmoubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQYXJhbXMocHJlZml4ICsgJ1snICsgKHR5cGVvZiBvYmpbaV0gPT09ICdvYmplY3QnID8gaSA6ICcnKSArICddJywgb2JqW2ldLCBzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9iaiAmJiBvYmoudG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJlZml4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRQYXJhbXMocHJlZml4ICsgJ1snICsga2V5ICsgJ10nLCBvYmpba2V5XSwgcywgYWRkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRQYXJhbXMoa2V5LCBvYmpba2V5XSwgcywgYWRkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJlZml4KSB7XG4gICAgICAgICAgICAgICAgYWRkKHMsIHByZWZpeCwgb2JqKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZChzLCBrZXksIG9ialtrZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGJ1aWxkUGFyYW1zKCcnLCBhLCBbXSkuam9pbignJicpLnJlcGxhY2UoLyUyMC9nLCAnKycpO1xuICAgIH07XG5cbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHBhcmFtO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmFtO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBnbG9iYWwucGFyYW0gPSBwYXJhbTtcbiAgICB9XG5cbn0odGhpcykpO1xuIiwiLypcbiAqIFBpbmt5U3dlYXIuanMgMi4yLjIgLSBNaW5pbWFsaXN0aWMgaW1wbGVtZW50YXRpb24gb2YgdGhlIFByb21pc2VzL0ErIHNwZWNcbiAqIFxuICogUHVibGljIERvbWFpbi4gVXNlLCBtb2RpZnkgYW5kIGRpc3RyaWJ1dGUgaXQgYW55IHdheSB5b3UgbGlrZS4gTm8gYXR0cmlidXRpb24gcmVxdWlyZWQuXG4gKlxuICogTk8gV0FSUkFOVFkgRVhQUkVTU0VEIE9SIElNUExJRUQuIFVTRSBBVCBZT1VSIE9XTiBSSVNLLlxuICpcbiAqIFBpbmt5U3dlYXIgaXMgYSB2ZXJ5IHNtYWxsIGltcGxlbWVudGF0aW9uIG9mIHRoZSBQcm9taXNlcy9BKyBzcGVjaWZpY2F0aW9uLiBBZnRlciBjb21waWxhdGlvbiB3aXRoIHRoZVxuICogR29vZ2xlIENsb3N1cmUgQ29tcGlsZXIgYW5kIGd6aXBwaW5nIGl0IHdlaWdocyBsZXNzIHRoYW4gNTAwIGJ5dGVzLiBJdCBpcyBiYXNlZCBvbiB0aGUgaW1wbGVtZW50YXRpb24gZm9yIFxuICogTWluaWZpZWQuanMgYW5kIHNob3VsZCBiZSBwZXJmZWN0IGZvciBlbWJlZGRpbmcuIFxuICpcbiAqXG4gKiBQaW5reVN3ZWFyIGhhcyBqdXN0IHRocmVlIGZ1bmN0aW9ucy5cbiAqXG4gKiBUbyBjcmVhdGUgYSBuZXcgcHJvbWlzZSBpbiBwZW5kaW5nIHN0YXRlLCBjYWxsIHBpbmt5U3dlYXIoKTpcbiAqICAgICAgICAgdmFyIHByb21pc2UgPSBwaW5reVN3ZWFyKCk7XG4gKlxuICogVGhlIHJldHVybmVkIG9iamVjdCBoYXMgYSBQcm9taXNlcy9BKyBjb21wYXRpYmxlIHRoZW4oKSBpbXBsZW1lbnRhdGlvbjpcbiAqICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSkgeyBhbGVydChcIlN1Y2Nlc3MhXCIpOyB9LCBmdW5jdGlvbih2YWx1ZSkgeyBhbGVydChcIkZhaWx1cmUhXCIpOyB9KTtcbiAqXG4gKlxuICogVGhlIHByb21pc2UgcmV0dXJuZWQgYnkgcGlua3lTd2VhcigpIGlzIGEgZnVuY3Rpb24uIFRvIGZ1bGZpbGwgdGhlIHByb21pc2UsIGNhbGwgdGhlIGZ1bmN0aW9uIHdpdGggdHJ1ZSBhcyBmaXJzdCBhcmd1bWVudCBhbmRcbiAqIGFuIG9wdGlvbmFsIGFycmF5IG9mIHZhbHVlcyB0byBwYXNzIHRvIHRoZSB0aGVuKCkgaGFuZGxlci4gQnkgcHV0dGluZyBtb3JlIHRoYW4gb25lIHZhbHVlIGluIHRoZSBhcnJheSwgeW91IGNhbiBwYXNzIG1vcmUgdGhhbiBvbmVcbiAqIHZhbHVlIHRvIHRoZSB0aGVuKCkgaGFuZGxlcnMuIEhlcmUgYW4gZXhhbXBsZSB0byBmdWxmaWxsIGEgcHJvbXNpc2UsIHRoaXMgdGltZSB3aXRoIG9ubHkgb25lIGFyZ3VtZW50OiBcbiAqICAgICAgICAgcHJvbWlzZSh0cnVlLCBbNDJdKTtcbiAqXG4gKiBXaGVuIHRoZSBwcm9taXNlIGhhcyBiZWVuIHJlamVjdGVkLCBjYWxsIGl0IHdpdGggZmFsc2UuIEFnYWluLCB0aGVyZSBtYXkgYmUgbW9yZSB0aGFuIG9uZSBhcmd1bWVudCBmb3IgdGhlIHRoZW4oKSBoYW5kbGVyOlxuICogICAgICAgICBwcm9taXNlKHRydWUsIFs2LCA2LCA2XSk7XG4gKiAgICAgICAgIFxuICogWW91IGNhbiBvYnRhaW4gdGhlIHByb21pc2UncyBjdXJyZW50IHN0YXRlIGJ5IGNhbGxpbmcgdGhlIGZ1bmN0aW9uIHdpdGhvdXQgYXJndW1lbnRzLiBJdCB3aWxsIGJlIHRydWUgaWYgZnVsZmlsbGVkLFxuICogZmFsc2UgaWYgcmVqZWN0ZWQsIGFuZCBvdGhlcndpc2UgdW5kZWZpbmVkLlxuICogXHRcdCAgIHZhciBzdGF0ZSA9IHByb21pc2UoKTsgXG4gKiBcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90aW1qYW5zZW4vUGlua3lTd2Vhci5qc1xuICovXG4oZnVuY3Rpb24odGFyZ2V0KSB7XG5cdHZhciB1bmRlZjtcblxuXHRmdW5jdGlvbiBpc0Z1bmN0aW9uKGYpIHtcblx0XHRyZXR1cm4gdHlwZW9mIGYgPT0gJ2Z1bmN0aW9uJztcblx0fVxuXHRmdW5jdGlvbiBpc09iamVjdChmKSB7XG5cdFx0cmV0dXJuIHR5cGVvZiBmID09ICdvYmplY3QnO1xuXHR9XG5cdGZ1bmN0aW9uIGRlZmVyKGNhbGxiYWNrKSB7XG5cdFx0aWYgKHR5cGVvZiBzZXRJbW1lZGlhdGUgIT0gJ3VuZGVmaW5lZCcpXG5cdFx0XHRzZXRJbW1lZGlhdGUoY2FsbGJhY2spO1xuXHRcdGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9ICd1bmRlZmluZWQnICYmIHByb2Nlc3NbJ25leHRUaWNrJ10pXG5cdFx0XHRwcm9jZXNzWyduZXh0VGljayddKGNhbGxiYWNrKTtcblx0XHRlbHNlXG5cdFx0XHRzZXRUaW1lb3V0KGNhbGxiYWNrLCAwKTtcblx0fVxuXG5cdHRhcmdldFswXVt0YXJnZXRbMV1dID0gZnVuY3Rpb24gcGlua3lTd2VhcihleHRlbmQpIHtcblx0XHR2YXIgc3RhdGU7ICAgICAgICAgICAvLyB1bmRlZmluZWQvbnVsbCA9IHBlbmRpbmcsIHRydWUgPSBmdWxmaWxsZWQsIGZhbHNlID0gcmVqZWN0ZWRcblx0XHR2YXIgdmFsdWVzID0gW107ICAgICAvLyBhbiBhcnJheSBvZiB2YWx1ZXMgYXMgYXJndW1lbnRzIGZvciB0aGUgdGhlbigpIGhhbmRsZXJzXG5cdFx0dmFyIGRlZmVycmVkID0gW107ICAgLy8gZnVuY3Rpb25zIHRvIGNhbGwgd2hlbiBzZXQoKSBpcyBpbnZva2VkXG5cblx0XHR2YXIgc2V0ID0gZnVuY3Rpb24obmV3U3RhdGUsIG5ld1ZhbHVlcykge1xuXHRcdFx0aWYgKHN0YXRlID09IG51bGwgJiYgbmV3U3RhdGUgIT0gbnVsbCkge1xuXHRcdFx0XHRzdGF0ZSA9IG5ld1N0YXRlO1xuXHRcdFx0XHR2YWx1ZXMgPSBuZXdWYWx1ZXM7XG5cdFx0XHRcdGlmIChkZWZlcnJlZC5sZW5ndGgpXG5cdFx0XHRcdFx0ZGVmZXIoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKVxuXHRcdFx0XHRcdFx0XHRkZWZlcnJlZFtpXSgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdH07XG5cblx0XHRzZXRbJ3RoZW4nXSA9IGZ1bmN0aW9uIChvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuXHRcdFx0dmFyIHByb21pc2UyID0gcGlua3lTd2VhcihleHRlbmQpO1xuXHRcdFx0dmFyIGNhbGxDYWxsYmFja3MgPSBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHR0cnkge1xuXHQgICAgXHRcdFx0dmFyIGYgPSAoc3RhdGUgPyBvbkZ1bGZpbGxlZCA6IG9uUmVqZWN0ZWQpO1xuXHQgICAgXHRcdFx0aWYgKGlzRnVuY3Rpb24oZikpIHtcblx0XHQgICBcdFx0XHRcdGZ1bmN0aW9uIHJlc29sdmUoeCkge1xuXHRcdFx0XHRcdFx0ICAgIHZhciB0aGVuLCBjYkNhbGxlZCA9IDA7XG5cdFx0ICAgXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdCAgIFx0XHRcdFx0aWYgKHggJiYgKGlzT2JqZWN0KHgpIHx8IGlzRnVuY3Rpb24oeCkpICYmIGlzRnVuY3Rpb24odGhlbiA9IHhbJ3RoZW4nXSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHggPT09IHByb21pc2UyKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhlblsnY2FsbCddKHgsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24oKSB7IGlmICghY2JDYWxsZWQrKykgcmVzb2x2ZS5hcHBseSh1bmRlZixhcmd1bWVudHMpOyB9ICxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbih2YWx1ZSl7IGlmICghY2JDYWxsZWQrKykgcHJvbWlzZTIoZmFsc2UsW3ZhbHVlXSk7fSk7XG5cdFx0XHRcdCAgIFx0XHRcdFx0fVxuXHRcdFx0XHQgICBcdFx0XHRcdGVsc2Vcblx0XHRcdFx0ICAgXHRcdFx0XHRcdHByb21pc2UyKHRydWUsIGFyZ3VtZW50cyk7XG5cdFx0ICAgXHRcdFx0XHRcdH1cblx0XHQgICBcdFx0XHRcdFx0Y2F0Y2goZSkge1xuXHRcdCAgIFx0XHRcdFx0XHRcdGlmICghY2JDYWxsZWQrKylcblx0XHQgICBcdFx0XHRcdFx0XHRcdHByb21pc2UyKGZhbHNlLCBbZV0pO1xuXHRcdCAgIFx0XHRcdFx0XHR9XG5cdFx0ICAgXHRcdFx0XHR9XG5cdFx0ICAgXHRcdFx0XHRyZXNvbHZlKGYuYXBwbHkodW5kZWYsIHZhbHVlcyB8fCBbXSkpO1xuXHRcdCAgIFx0XHRcdH1cblx0XHQgICBcdFx0XHRlbHNlXG5cdFx0ICAgXHRcdFx0XHRwcm9taXNlMihzdGF0ZSwgdmFsdWVzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaCAoZSkge1xuXHRcdFx0XHRcdHByb21pc2UyKGZhbHNlLCBbZV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0aWYgKHN0YXRlICE9IG51bGwpXG5cdFx0XHRcdGRlZmVyKGNhbGxDYWxsYmFja3MpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRkZWZlcnJlZC5wdXNoKGNhbGxDYWxsYmFja3MpO1xuXHRcdFx0cmV0dXJuIHByb21pc2UyO1xuXHRcdH07XG4gICAgICAgIGlmKGV4dGVuZCl7XG4gICAgICAgICAgICBzZXQgPSBleHRlbmQoc2V0KTtcbiAgICAgICAgfVxuXHRcdHJldHVybiBzZXQ7XG5cdH07XG59KSh0eXBlb2YgbW9kdWxlID09ICd1bmRlZmluZWQnID8gW3dpbmRvdywgJ3Bpbmt5U3dlYXInXSA6IFttb2R1bGUsICdleHBvcnRzJ10pO1xuXG4iLCIvKiEgcXdlc3QgMi4yLjMgKGh0dHBzOi8vZ2l0aHViLmNvbS9weXJzbWsvcXdlc3QpICovXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHR2YXIgZ2xvYmFsID0gd2luZG93IHx8IHRoaXMsXHJcblx0XHRwaW5reXN3ZWFyID0gcmVxdWlyZSgncGlua3lzd2VhcicpLFxyXG5cdFx0anBhcmFtID0gcmVxdWlyZSgnanF1ZXJ5LXBhcmFtJyksXHJcblx0XHQvLyBEZWZhdWx0IHJlc3BvbnNlIHR5cGUgZm9yIFhEUiBpbiBhdXRvIG1vZGVcclxuXHRcdGRlZmF1bHRYZHJSZXNwb25zZVR5cGUgPSAnanNvbicsXHJcblx0XHQvLyBEZWZhdWx0IGRhdGEgdHlwZVxyXG5cdFx0ZGVmYXVsdERhdGFUeXBlID0gJ3Bvc3QnLFxyXG5cdFx0Ly8gVmFyaWFibGVzIGZvciBsaW1pdCBtZWNoYW5pc21cclxuXHRcdGxpbWl0ID0gbnVsbCxcclxuXHRcdHJlcXVlc3RzID0gMCxcclxuXHRcdHJlcXVlc3Rfc3RhY2sgPSBbXSxcclxuXHRcdC8vIEdldCBYTUxIdHRwUmVxdWVzdCBvYmplY3RcclxuXHRcdGdldFhIUiA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiBnbG9iYWwuWE1MSHR0cFJlcXVlc3Q/XHJcblx0XHRcdFx0XHRuZXcgZ2xvYmFsLlhNTEh0dHBSZXF1ZXN0KCk6XHJcblx0XHRcdFx0XHRuZXcgQWN0aXZlWE9iamVjdCgnTWljcm9zb2Z0LlhNTEhUVFAnKTtcclxuXHRcdH0sXHJcblx0XHQvLyBHdWVzcyBYSFIgdmVyc2lvblxyXG5cdFx0eGhyMiA9IChnZXRYSFIoKS5yZXNwb25zZVR5cGU9PT0nJyksXHJcblxyXG5cdC8vIENvcmUgZnVuY3Rpb25cclxuXHRxd2VzdCA9IGZ1bmN0aW9uKG1ldGhvZCwgdXJsLCBkYXRhLCBvcHRpb25zLCBiZWZvcmUpIHtcclxuXHJcblx0XHQvLyBGb3JtYXRcclxuXHRcdG1ldGhvZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpO1xyXG5cdFx0ZGF0YSA9IGRhdGEgfHwgbnVsbDtcclxuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuXHRcdC8vIERlZmluZSB2YXJpYWJsZXNcclxuXHRcdHZhciBuYXRpdmVSZXNwb25zZVBhcnNpbmcgPSBmYWxzZSxcclxuXHRcdFx0Y3Jvc3NPcmlnaW4sXHJcblx0XHRcdHhocixcclxuXHRcdFx0eGRyID0gZmFsc2UsXHJcblx0XHRcdHRpbWVvdXRJbnRlcnZhbCxcclxuXHRcdFx0YWJvcnRlZCA9IGZhbHNlLFxyXG5cdFx0XHRhdHRlbXB0cyA9IDAsXHJcblx0XHRcdGhlYWRlcnMgPSB7fSxcclxuXHRcdFx0bWltZVR5cGVzID0ge1xyXG5cdFx0XHRcdHRleHQ6ICcqLyonLFxyXG5cdFx0XHRcdHhtbDogJ3RleHQveG1sJyxcclxuXHRcdFx0XHRqc29uOiAnYXBwbGljYXRpb24vanNvbicsXHJcblx0XHRcdFx0cG9zdDogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcclxuXHRcdFx0fSxcclxuXHRcdFx0YWNjZXB0ID0ge1xyXG5cdFx0XHRcdHRleHQ6ICcqLyonLFxyXG5cdFx0XHRcdHhtbDogJ2FwcGxpY2F0aW9uL3htbDsgcT0xLjAsIHRleHQveG1sOyBxPTAuOCwgKi8qOyBxPTAuMScsXHJcblx0XHRcdFx0anNvbjogJ2FwcGxpY2F0aW9uL2pzb247IHE9MS4wLCB0ZXh0Lyo7IHE9MC44LCAqLyo7IHE9MC4xJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR2YXJzID0gJycsXHJcblx0XHRcdGksIGosXHJcblx0XHRcdHNlcmlhbGl6ZWQsXHJcblx0XHRcdHJlc3BvbnNlLFxyXG5cdFx0XHRzZW5kaW5nID0gZmFsc2UsXHJcblx0XHRcdGRlbGF5ZWQgPSBmYWxzZSxcclxuXHRcdFx0dGltZW91dF9zdGFydCxcclxuXHJcblx0XHQvLyBDcmVhdGUgdGhlIHByb21pc2VcclxuXHRcdHByb21pc2UgPSBwaW5reXN3ZWFyKGZ1bmN0aW9uKHBpbmt5KSB7XHJcblx0XHRcdHBpbmt5WydjYXRjaCddID0gZnVuY3Rpb24oZikge1xyXG5cdFx0XHRcdHJldHVybiBwaW5reS50aGVuKG51bGwsIGYpO1xyXG5cdFx0XHR9O1xyXG5cdFx0XHRwaW5reS5jb21wbGV0ZSA9IGZ1bmN0aW9uKGYpIHtcclxuXHRcdFx0XHRyZXR1cm4gcGlua3kudGhlbihmLCBmKTtcclxuXHRcdFx0fTtcclxuXHRcdFx0Ly8gT3ZlcnJpZGVcclxuXHRcdFx0aWYoJ3Bpbmt5c3dlYXInIGluIG9wdGlvbnMpIHtcclxuXHRcdFx0XHRmb3IoaSBpbiBvcHRpb25zLnBpbmt5c3dlYXIpIHtcclxuXHRcdFx0XHRcdHBpbmt5W2ldID0gb3B0aW9ucy5waW5reXN3ZWFyW2ldO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRwaW5reS5zZW5kID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Ly8gUHJldmVudCBmdXJ0aGVyIHNlbmQoKSBjYWxsc1xyXG5cdFx0XHRcdGlmKHNlbmRpbmcpIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gUmVhY2hlZCByZXF1ZXN0IGxpbWl0LCBnZXQgb3V0IVxyXG5cdFx0XHRcdGlmKHJlcXVlc3RzID09IGxpbWl0KSB7XHJcblx0XHRcdFx0XHRyZXF1ZXN0X3N0YWNrLnB1c2gocGlua3kpO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQrK3JlcXVlc3RzO1xyXG5cdFx0XHRcdHNlbmRpbmcgPSB0cnVlO1xyXG5cdFx0XHRcdC8vIFN0YXJ0IHRoZSBjaHJvbm9cclxuXHRcdFx0XHR0aW1lb3V0X3N0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblx0XHRcdFx0Ly8gR2V0IFhIUiBvYmplY3RcclxuXHRcdFx0XHR4aHIgPSBnZXRYSFIoKTtcclxuXHRcdFx0XHRpZihjcm9zc09yaWdpbikge1xyXG5cdFx0XHRcdFx0aWYoISgnd2l0aENyZWRlbnRpYWxzJyBpbiB4aHIpICYmIGdsb2JhbC5YRG9tYWluUmVxdWVzdCkge1xyXG5cdFx0XHRcdFx0XHR4aHIgPSBuZXcgWERvbWFpblJlcXVlc3QoKTsgLy8gQ09SUyB3aXRoIElFOC85XHJcblx0XHRcdFx0XHRcdHhkciA9IHRydWU7XHJcblx0XHRcdFx0XHRcdGlmKG1ldGhvZCE9J0dFVCcgJiYgbWV0aG9kIT0nUE9TVCcpIHtcclxuXHRcdFx0XHRcdFx0XHRtZXRob2QgPSAnUE9TVCc7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gT3BlbiBjb25uZWN0aW9uXHJcblx0XHRcdFx0aWYoeGRyKSB7XHJcblx0XHRcdFx0XHR4aHIub3BlbihtZXRob2QsIHVybCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0eGhyLm9wZW4obWV0aG9kLCB1cmwsIG9wdGlvbnMuYXN5bmMsIG9wdGlvbnMudXNlciwgb3B0aW9ucy5wYXNzd29yZCk7XHJcblx0XHRcdFx0XHRpZih4aHIyICYmIG9wdGlvbnMuYXN5bmMpIHtcclxuXHRcdFx0XHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IG9wdGlvbnMud2l0aENyZWRlbnRpYWxzO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBTZXQgaGVhZGVyc1xyXG5cdFx0XHRcdGlmKCF4ZHIpIHtcclxuXHRcdFx0XHRcdGZvcih2YXIgaSBpbiBoZWFkZXJzKSB7XHJcblx0XHRcdFx0XHRcdGlmKGhlYWRlcnNbaV0pIHtcclxuXHRcdFx0XHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcihpLCBoZWFkZXJzW2ldKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBWZXJpZnkgaWYgdGhlIHJlc3BvbnNlIHR5cGUgaXMgc3VwcG9ydGVkIGJ5IHRoZSBjdXJyZW50IGJyb3dzZXJcclxuXHRcdFx0XHRpZih4aHIyICYmIG9wdGlvbnMucmVzcG9uc2VUeXBlIT0nZG9jdW1lbnQnICYmIG9wdGlvbnMucmVzcG9uc2VUeXBlIT0nYXV0bycpIHsgLy8gRG9uJ3QgdmVyaWZ5IGZvciAnZG9jdW1lbnQnIHNpbmNlIHdlJ3JlIHVzaW5nIGFuIGludGVybmFsIHJvdXRpbmVcclxuXHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSBvcHRpb25zLnJlc3BvbnNlVHlwZTtcclxuXHRcdFx0XHRcdFx0bmF0aXZlUmVzcG9uc2VQYXJzaW5nID0gKHhoci5yZXNwb25zZVR5cGU9PW9wdGlvbnMucmVzcG9uc2VUeXBlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNhdGNoKGUpe31cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gUGx1ZyByZXNwb25zZSBoYW5kbGVyXHJcblx0XHRcdFx0aWYoeGhyMiB8fCB4ZHIpIHtcclxuXHRcdFx0XHRcdHhoci5vbmxvYWQgPSBoYW5kbGVSZXNwb25zZTtcclxuXHRcdFx0XHRcdHhoci5vbmVycm9yID0gaGFuZGxlRXJyb3I7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRpZih4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XHJcblx0XHRcdFx0XHRcdFx0aGFuZGxlUmVzcG9uc2UoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gT3ZlcnJpZGUgbWltZSB0eXBlIHRvIGVuc3VyZSB0aGUgcmVzcG9uc2UgaXMgd2VsbCBwYXJzZWRcclxuXHRcdFx0XHRpZihvcHRpb25zLnJlc3BvbnNlVHlwZSE9J2F1dG8nICYmICdvdmVycmlkZU1pbWVUeXBlJyBpbiB4aHIpIHtcclxuXHRcdFx0XHRcdHhoci5vdmVycmlkZU1pbWVUeXBlKG1pbWVUeXBlc1tvcHRpb25zLnJlc3BvbnNlVHlwZV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBSdW4gJ2JlZm9yZScgY2FsbGJhY2tcclxuXHRcdFx0XHRpZihiZWZvcmUpIHtcclxuXHRcdFx0XHRcdGJlZm9yZSh4aHIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBTZW5kIHJlcXVlc3RcclxuXHRcdFx0XHRpZih4ZHIpIHtcclxuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1hEb21haW5SZXF1ZXN0XHJcblx0XHRcdFx0XHRcdHhoci5zZW5kKG1ldGhvZCE9J0dFVCc/ZGF0YTpudWxsKTtcclxuXHRcdFx0XHRcdH0sMCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0eGhyLnNlbmQobWV0aG9kIT0nR0VUJz9kYXRhOm51bGwpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHRcdFx0cmV0dXJuIHBpbmt5O1xyXG5cdFx0fSksXHJcblxyXG5cdFx0Ly8gSGFuZGxlIHRoZSByZXNwb25zZVxyXG5cdFx0aGFuZGxlUmVzcG9uc2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0Ly8gUHJlcGFyZVxyXG5cdFx0XHR2YXIgaSwgcmVzcG9uc2VUeXBlO1xyXG5cdFx0XHQtLXJlcXVlc3RzO1xyXG5cdFx0XHRzZW5kaW5nID0gZmFsc2U7XHJcblx0XHRcdC8vIFZlcmlmeSB0aW1lb3V0IHN0YXRlXHJcblx0XHRcdC8vIC0tLSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy83Mjg3NzA2L2llLTktamF2YXNjcmlwdC1lcnJvci1jMDBjMDIzZlxyXG5cdFx0XHRpZihuZXcgRGF0ZSgpLmdldFRpbWUoKS10aW1lb3V0X3N0YXJ0ID49IG9wdGlvbnMudGltZW91dCkge1xyXG5cdFx0XHRcdGlmKCFvcHRpb25zLmF0dGVtcHRzIHx8ICsrYXR0ZW1wdHMhPW9wdGlvbnMuYXR0ZW1wdHMpIHtcclxuXHRcdFx0XHRcdHByb21pc2Uuc2VuZCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdHByb21pc2UoZmFsc2UsIFt4aHIscmVzcG9uc2UsbmV3IEVycm9yKCdUaW1lb3V0ICgnK3VybCsnKScpXSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBMYXVuY2ggbmV4dCBzdGFja2VkIHJlcXVlc3RcclxuXHRcdFx0aWYocmVxdWVzdF9zdGFjay5sZW5ndGgpIHtcclxuXHRcdFx0XHRyZXF1ZXN0X3N0YWNrLnNoaWZ0KCkuc2VuZCgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vIEhhbmRsZSByZXNwb25zZVxyXG5cdFx0XHR0cnl7XHJcblx0XHRcdFx0Ly8gUHJvY2VzcyByZXNwb25zZVxyXG5cdFx0XHRcdGlmKG5hdGl2ZVJlc3BvbnNlUGFyc2luZyAmJiAncmVzcG9uc2UnIGluIHhociAmJiB4aHIucmVzcG9uc2UhPT1udWxsKSB7XHJcblx0XHRcdFx0XHRyZXNwb25zZSA9IHhoci5yZXNwb25zZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZihvcHRpb25zLnJlc3BvbnNlVHlwZSA9PSAnZG9jdW1lbnQnKSB7XHJcblx0XHRcdFx0XHR2YXIgZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcclxuXHRcdFx0XHRcdGZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHRcdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZyYW1lKTtcclxuXHRcdFx0XHRcdGZyYW1lLmNvbnRlbnREb2N1bWVudC5vcGVuKCk7XHJcblx0XHRcdFx0XHRmcmFtZS5jb250ZW50RG9jdW1lbnQud3JpdGUoeGhyLnJlc3BvbnNlKTtcclxuXHRcdFx0XHRcdGZyYW1lLmNvbnRlbnREb2N1bWVudC5jbG9zZSgpO1xyXG5cdFx0XHRcdFx0cmVzcG9uc2UgPSBmcmFtZS5jb250ZW50RG9jdW1lbnQ7XHJcblx0XHRcdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGZyYW1lKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZXtcclxuXHRcdFx0XHRcdC8vIEd1ZXNzIHJlc3BvbnNlIHR5cGVcclxuXHRcdFx0XHRcdHJlc3BvbnNlVHlwZSA9IG9wdGlvbnMucmVzcG9uc2VUeXBlO1xyXG5cdFx0XHRcdFx0aWYocmVzcG9uc2VUeXBlID09ICdhdXRvJykge1xyXG5cdFx0XHRcdFx0XHRpZih4ZHIpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXNwb25zZVR5cGUgPSBkZWZhdWx0WGRyUmVzcG9uc2VUeXBlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBjdCA9IHhoci5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1UeXBlJykgfHwgJyc7XHJcblx0XHRcdFx0XHRcdFx0aWYoY3QuaW5kZXhPZihtaW1lVHlwZXMuanNvbik+LTEpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlVHlwZSA9ICdqc29uJztcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0ZWxzZSBpZihjdC5pbmRleE9mKG1pbWVUeXBlcy54bWwpPi0xKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZVR5cGUgPSAneG1sJztcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZVR5cGUgPSAndGV4dCc7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvLyBIYW5kbGUgcmVzcG9uc2UgdHlwZVxyXG5cdFx0XHRcdFx0c3dpdGNoKHJlc3BvbnNlVHlwZSkge1xyXG5cdFx0XHRcdFx0XHRjYXNlICdqc29uJzpcclxuXHRcdFx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYoJ0pTT04nIGluIGdsb2JhbCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBldmFsKCcoJyt4aHIucmVzcG9uc2VUZXh0KycpJyk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGNhdGNoKGUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHRocm93IFwiRXJyb3Igd2hpbGUgcGFyc2luZyBKU09OIGJvZHkgOiBcIitlO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0Y2FzZSAneG1sJzpcclxuXHRcdFx0XHRcdFx0XHQvLyBCYXNlZCBvbiBqUXVlcnkncyBwYXJzZVhNTCgpIGZ1bmN0aW9uXHJcblx0XHRcdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0XHRcdC8vIFN0YW5kYXJkXHJcblx0XHRcdFx0XHRcdFx0XHRpZihnbG9iYWwuRE9NUGFyc2VyKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0gKG5ldyBET01QYXJzZXIoKSkucGFyc2VGcm9tU3RyaW5nKHhoci5yZXNwb25zZVRleHQsJ3RleHQveG1sJyk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHQvLyBJRTw5XHJcblx0XHRcdFx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBuZXcgQWN0aXZlWE9iamVjdCgnTWljcm9zb2Z0LlhNTERPTScpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZS5hc3luYyA9ICdmYWxzZSc7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlLmxvYWRYTUwoeGhyLnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGNhdGNoKGUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRpZighcmVzcG9uc2UgfHwgIXJlc3BvbnNlLmRvY3VtZW50RWxlbWVudCB8fCByZXNwb25zZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgncGFyc2VyZXJyb3InKS5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHRocm93ICdJbnZhbGlkIFhNTCc7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gTGF0ZSBzdGF0dXMgY29kZSB2ZXJpZmljYXRpb24gdG8gYWxsb3cgcGFzc2luZyBkYXRhIHdoZW4sIHBlciBleGFtcGxlLCBhIDQwOSBpcyByZXR1cm5lZFxyXG5cdFx0XHRcdC8vIC0tLSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDA0Njk3Mi9tc2llLXJldHVybnMtc3RhdHVzLWNvZGUtb2YtMTIyMy1mb3ItYWpheC1yZXF1ZXN0XHJcblx0XHRcdFx0aWYoJ3N0YXR1cycgaW4geGhyICYmICEvXjJ8MTIyMy8udGVzdCh4aHIuc3RhdHVzKSkge1xyXG5cdFx0XHRcdFx0dGhyb3cgeGhyLnN0YXR1cysnICgnK3hoci5zdGF0dXNUZXh0KycpJztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gRnVsZmlsbGVkXHJcblx0XHRcdFx0cHJvbWlzZSh0cnVlLCBbeGhyLHJlc3BvbnNlXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2F0Y2goZSkge1xyXG5cdFx0XHRcdC8vIFJlamVjdGVkXHJcblx0XHRcdFx0cHJvbWlzZShmYWxzZSwgW3hocixyZXNwb25zZSxlXSk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8gSGFuZGxlIGVycm9yc1xyXG5cdFx0aGFuZGxlRXJyb3IgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdC0tcmVxdWVzdHM7XHJcblx0XHRcdHByb21pc2UoZmFsc2UsIFt4aHIsbnVsbCxuZXcgRXJyb3IoJ0Nvbm5lY3Rpb24gYWJvcnRlZCcpXSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIE5vcm1hbGl6ZSBvcHRpb25zXHJcblx0XHRvcHRpb25zLmFzeW5jID0gJ2FzeW5jJyBpbiBvcHRpb25zPyEhb3B0aW9ucy5hc3luYzp0cnVlO1xyXG5cdFx0b3B0aW9ucy5jYWNoZSA9ICdjYWNoZScgaW4gb3B0aW9ucz8hIW9wdGlvbnMuY2FjaGU6ZmFsc2U7XHJcblx0XHRvcHRpb25zLmRhdGFUeXBlID0gJ2RhdGFUeXBlJyBpbiBvcHRpb25zP29wdGlvbnMuZGF0YVR5cGUudG9Mb3dlckNhc2UoKTpkZWZhdWx0RGF0YVR5cGU7XHJcblx0XHRvcHRpb25zLnJlc3BvbnNlVHlwZSA9ICdyZXNwb25zZVR5cGUnIGluIG9wdGlvbnM/b3B0aW9ucy5yZXNwb25zZVR5cGUudG9Mb3dlckNhc2UoKTonYXV0byc7XHJcblx0XHRvcHRpb25zLnVzZXIgPSBvcHRpb25zLnVzZXIgfHwgJyc7XHJcblx0XHRvcHRpb25zLnBhc3N3b3JkID0gb3B0aW9ucy5wYXNzd29yZCB8fCAnJztcclxuXHRcdG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gISFvcHRpb25zLndpdGhDcmVkZW50aWFscztcclxuXHRcdG9wdGlvbnMudGltZW91dCA9ICd0aW1lb3V0JyBpbiBvcHRpb25zP3BhcnNlSW50KG9wdGlvbnMudGltZW91dCwxMCk6MzAwMDA7XHJcblx0XHRvcHRpb25zLmF0dGVtcHRzID0gJ2F0dGVtcHRzJyBpbiBvcHRpb25zP3BhcnNlSW50KG9wdGlvbnMuYXR0ZW1wdHMsMTApOjE7XHJcblxyXG5cdFx0Ly8gR3Vlc3MgaWYgd2UncmUgZGVhbGluZyB3aXRoIGEgY3Jvc3Mtb3JpZ2luIHJlcXVlc3RcclxuXHRcdGkgPSB1cmwubWF0Y2goL1xcL1xcLyguKz8pXFwvLyk7XHJcblx0XHRjcm9zc09yaWdpbiA9IGkgJiYgKGlbMV0/aVsxXSE9bG9jYXRpb24uaG9zdDpmYWxzZSk7XHJcblxyXG5cdFx0Ly8gUHJlcGFyZSBkYXRhXHJcblx0XHRpZignQXJyYXlCdWZmZXInIGluIGdsb2JhbCAmJiBkYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcclxuXHRcdFx0b3B0aW9ucy5kYXRhVHlwZSA9ICdhcnJheWJ1ZmZlcic7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKCdCbG9iJyBpbiBnbG9iYWwgJiYgZGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcclxuXHRcdFx0b3B0aW9ucy5kYXRhVHlwZSA9ICdibG9iJztcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoJ0RvY3VtZW50JyBpbiBnbG9iYWwgJiYgZGF0YSBpbnN0YW5jZW9mIERvY3VtZW50KSB7XHJcblx0XHRcdG9wdGlvbnMuZGF0YVR5cGUgPSAnZG9jdW1lbnQnO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZignRm9ybURhdGEnIGluIGdsb2JhbCAmJiBkYXRhIGluc3RhbmNlb2YgRm9ybURhdGEpIHtcclxuXHRcdFx0b3B0aW9ucy5kYXRhVHlwZSA9ICdmb3JtZGF0YSc7XHJcblx0XHR9XHJcblx0XHRzd2l0Y2gob3B0aW9ucy5kYXRhVHlwZSkge1xyXG5cdFx0XHRjYXNlICdqc29uJzpcclxuXHRcdFx0XHRkYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3Bvc3QnOlxyXG5cdFx0XHRcdGRhdGEgPSBqcGFyYW0oZGF0YSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUHJlcGFyZSBoZWFkZXJzXHJcblx0XHRpZihvcHRpb25zLmhlYWRlcnMpIHtcclxuXHRcdFx0dmFyIGZvcm1hdCA9IGZ1bmN0aW9uKG1hdGNoLHAxLHAyKSB7XHJcblx0XHRcdFx0cmV0dXJuIHAxICsgcDIudG9VcHBlckNhc2UoKTtcclxuXHRcdFx0fTtcclxuXHRcdFx0Zm9yKGkgaW4gb3B0aW9ucy5oZWFkZXJzKSB7XHJcblx0XHRcdFx0aGVhZGVyc1tpLnJlcGxhY2UoLyhefC0pKFteLV0pL2csZm9ybWF0KV0gPSBvcHRpb25zLmhlYWRlcnNbaV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmKCEoJ0NvbnRlbnQtVHlwZScgaW4gaGVhZGVycykgJiYgbWV0aG9kIT0nR0VUJykge1xyXG5cdFx0XHRpZihvcHRpb25zLmRhdGFUeXBlIGluIG1pbWVUeXBlcykge1xyXG5cdFx0XHRcdGlmKG1pbWVUeXBlc1tvcHRpb25zLmRhdGFUeXBlXSkge1xyXG5cdFx0XHRcdFx0aGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSBtaW1lVHlwZXNbb3B0aW9ucy5kYXRhVHlwZV07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZighaGVhZGVycy5BY2NlcHQpIHtcclxuXHRcdFx0aGVhZGVycy5BY2NlcHQgPSAob3B0aW9ucy5yZXNwb25zZVR5cGUgaW4gYWNjZXB0KT9hY2NlcHRbb3B0aW9ucy5yZXNwb25zZVR5cGVdOicqLyonO1xyXG5cdFx0fVxyXG5cdFx0aWYoIWNyb3NzT3JpZ2luICYmICEoJ1gtUmVxdWVzdGVkLVdpdGgnIGluIGhlYWRlcnMpKSB7IC8vICh0aGF0IGhlYWRlciBicmVha3MgaW4gbGVnYWN5IGJyb3dzZXJzIHdpdGggQ09SUylcclxuXHRcdFx0aGVhZGVyc1snWC1SZXF1ZXN0ZWQtV2l0aCddID0gJ1hNTEh0dHBSZXF1ZXN0JztcclxuXHRcdH1cclxuXHRcdGlmKCFvcHRpb25zLmNhY2hlICYmICEoJ0NhY2hlLUNvbnRyb2wnIGluIGhlYWRlcnMpKSB7XHJcblx0XHRcdGhlYWRlcnNbJ0NhY2hlLUNvbnRyb2wnXSA9ICduby1jYWNoZSc7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUHJlcGFyZSBVUkxcclxuXHRcdGlmKG1ldGhvZD09J0dFVCcgJiYgZGF0YSkge1xyXG5cdFx0XHR2YXJzICs9IGRhdGE7XHJcblx0XHR9XHJcblx0XHRpZih2YXJzKSB7XHJcblx0XHRcdHVybCArPSAoL1xcPy8udGVzdCh1cmwpPycmJzonPycpK3ZhcnM7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gU3RhcnQgdGhlIHJlcXVlc3RcclxuXHRcdGlmKG9wdGlvbnMuYXN5bmMpIHtcclxuXHRcdFx0cHJvbWlzZS5zZW5kKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUmV0dXJuIHByb21pc2VcclxuXHRcdHJldHVybiBwcm9taXNlO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvLyBSZXR1cm4gdGhlIGV4dGVybmFsIHF3ZXN0IG9iamVjdFxyXG5cdHJldHVybiB7XHJcblx0XHRiYXNlOiAnJyxcclxuXHRcdGdldDogZnVuY3Rpb24odXJsLCBkYXRhLCBvcHRpb25zLCBiZWZvcmUpIHtcclxuXHRcdFx0cmV0dXJuIHF3ZXN0KCdHRVQnLCB0aGlzLmJhc2UrdXJsLCBkYXRhLCBvcHRpb25zLCBiZWZvcmUpO1xyXG5cdFx0fSxcclxuXHRcdHBvc3Q6IGZ1bmN0aW9uKHVybCwgZGF0YSwgb3B0aW9ucywgYmVmb3JlKSB7XHJcblx0XHRcdHJldHVybiBxd2VzdCgnUE9TVCcsIHRoaXMuYmFzZSt1cmwsIGRhdGEsIG9wdGlvbnMsIGJlZm9yZSk7XHJcblx0XHR9LFxyXG5cdFx0cHV0OiBmdW5jdGlvbih1cmwsIGRhdGEsIG9wdGlvbnMsIGJlZm9yZSkge1xyXG5cdFx0XHRyZXR1cm4gcXdlc3QoJ1BVVCcsIHRoaXMuYmFzZSt1cmwsIGRhdGEsIG9wdGlvbnMsIGJlZm9yZSk7XHJcblx0XHR9LFxyXG5cdFx0J2RlbGV0ZSc6IGZ1bmN0aW9uKHVybCwgZGF0YSwgb3B0aW9ucywgYmVmb3JlKSB7XHJcblx0XHRcdHJldHVybiBxd2VzdCgnREVMRVRFJywgdGhpcy5iYXNlK3VybCwgZGF0YSwgb3B0aW9ucywgYmVmb3JlKTtcclxuXHRcdH0sXHJcblx0XHRtYXA6IGZ1bmN0aW9uKHR5cGUsIHVybCwgZGF0YSwgb3B0aW9ucywgYmVmb3JlKSB7XHJcblx0XHRcdHJldHVybiBxd2VzdCh0eXBlLnRvVXBwZXJDYXNlKCksIHRoaXMuYmFzZSt1cmwsIGRhdGEsIG9wdGlvbnMsIGJlZm9yZSk7XHJcblx0XHR9LFxyXG5cdFx0eGhyMjogeGhyMixcclxuXHRcdGxpbWl0OiBmdW5jdGlvbihieSkge1xyXG5cdFx0XHRsaW1pdCA9IGJ5O1xyXG5cdFx0fSxcclxuXHRcdHNldERlZmF1bHRYZHJSZXNwb25zZVR5cGU6IGZ1bmN0aW9uKHR5cGUpIHtcclxuXHRcdFx0ZGVmYXVsdFhkclJlc3BvbnNlVHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcclxuXHRcdH0sXHJcblx0XHRzZXREZWZhdWx0RGF0YVR5cGU6IGZ1bmN0aW9uKHR5cGUpIHtcclxuXHRcdFx0ZGVmYXVsdERhdGFUeXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG59KCk7XHJcbiIsIi8qIEBmbG93ICovXG5cbmltcG9ydCBxd2VzdCBmcm9tICdxd2VzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFF3ZXN0QWpheExvYWRlciB7XG4gICAgZ2V0KHBhdGggOiBzdHJpbmcpIDogUHJvbWlzZSB7XG4gICAgICAgIHJldHVybiBxd2VzdC5nZXQocGF0aCkudGhlbihmdW5jdGlvbih4aHIsIHJlcykge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiByZXMgPT09ICdzdHJpbmcnID8gSlNPTi5wYXJzZShyZXMpIDogcmVzO1xuICAgICAgICB9KTtcbiAgICB9XG59IiwiLyogQGZsb3cgKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGV2ZWxMb2FkZXIge1xuICAgIGFqYXhMb2FkZXIgICA6IElBamF4TG9hZGVyO1xuXG4gICAgY29uc3RydWN0b3IoYWpheExvYWRlciA6IElBamF4TG9hZGVyKSB7XG4gICAgICAgIHRoaXMuYWpheExvYWRlciAgID0gYWpheExvYWRlcjtcbiAgICB9XG4gICAgXG4gICAgYXN5bmMgbG9hZExldmVsKHBhdGggOiBzdHJpbmcpIDogUHJvbWlzZSB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmFqYXhMb2FkZXIuZ2V0KHBhdGgpO1xuICAgIH1cbn0iLCIvKlxuICogQSBtYWluIGxvb3AgdXNlZnVsIGZvciBnYW1lcyBhbmQgb3RoZXIgYW5pbWF0ZWQgYXBwbGljYXRpb25zLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJvb3Q7XG4gICAgXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJvb3QgPSBnbG9iYWw7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdCA9IHdpbmRvdztcbiAgICB9XG4gICAgXG4gICAgLy8gVGhlIGFtb3VudCBvZiB0aW1lIChpbiBtaWxsaXNlY29uZHMpIHRvIHNpbXVsYXRlIGVhY2ggdGltZSB1cGRhdGUoKVxuICAgIC8vIHJ1bnMuIFNlZSBgTWFpbkxvb3Auc2V0U2ltdWxhdGlvblRpbWVzdGVwKClgIGZvciBkZXRhaWxzLlxuICAgIHZhciBzaW11bGF0aW9uVGltZXN0ZXAgPSAxMDAwIC8gNjAsXG5cbiAgICAvLyBUaGUgY3VtdWxhdGl2ZSBhbW91bnQgb2YgaW4tYXBwIHRpbWUgdGhhdCBoYXNuJ3QgYmVlbiBzaW11bGF0ZWQgeWV0LlxuICAgIC8vIFNlZSB0aGUgY29tbWVudHMgaW5zaWRlIGFuaW1hdGUoKSBmb3IgZGV0YWlscy5cbiAgICBmcmFtZURlbHRhID0gMCxcblxuICAgIC8vIFRoZSB0aW1lc3RhbXAgaW4gbWlsbGlzZWNvbmRzIG9mIHRoZSBsYXN0IHRpbWUgdGhlIG1haW4gbG9vcCB3YXMgcnVuLlxuICAgIC8vIFVzZWQgdG8gY29tcHV0ZSB0aGUgdGltZSBlbGFwc2VkIGJldHdlZW4gZnJhbWVzLlxuICAgIGxhc3RGcmFtZVRpbWVNcyA9IDAsXG5cbiAgICAvLyBBbiBleHBvbmVudGlhbCBtb3ZpbmcgYXZlcmFnZSBvZiB0aGUgZnJhbWVzIHBlciBzZWNvbmQuXG4gICAgZnBzID0gNjAsXG5cbiAgICAvLyBUaGUgdGltZXN0YW1wIChpbiBtaWxsaXNlY29uZHMpIG9mIHRoZSBsYXN0IHRpbWUgdGhlIGBmcHNgIG1vdmluZ1xuICAgIC8vIGF2ZXJhZ2Ugd2FzIHVwZGF0ZWQuXG4gICAgbGFzdEZwc1VwZGF0ZSA9IDAsXG5cbiAgICAvLyBUaGUgbnVtYmVyIG9mIGZyYW1lcyBkZWxpdmVyZWQgaW4gdGhlIGN1cnJlbnQgc2Vjb25kLlxuICAgIGZyYW1lc1RoaXNTZWNvbmQgPSAwLFxuXG4gICAgLy8gVGhlIG51bWJlciBvZiB0aW1lcyB1cGRhdGUoKSBpcyBjYWxsZWQgaW4gYSBnaXZlbiBmcmFtZS4gVGhpcyBpcyBvbmx5XG4gICAgLy8gcmVsZXZhbnQgaW5zaWRlIG9mIGFuaW1hdGUoKSwgYnV0IGEgcmVmZXJlbmNlIGlzIGhlbGQgZXh0ZXJuYWxseSBzbyB0aGF0XG4gICAgLy8gdGhpcyB2YXJpYWJsZSBpcyBub3QgbWFya2VkIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24gZXZlcnkgdGltZSB0aGUgbWFpblxuICAgIC8vIGxvb3AgcnVucy5cbiAgICBudW1VcGRhdGVTdGVwcyA9IDAsXG5cbiAgICAvLyBUaGUgbWluaW11bSBhbW91bnQgb2YgdGltZSBpbiBtaWxsaXNlY29uZHMgdGhhdCBtdXN0IHBhc3Mgc2luY2UgdGhlIGxhc3RcbiAgICAvLyBmcmFtZSB3YXMgZXhlY3V0ZWQgYmVmb3JlIGFub3RoZXIgZnJhbWUgY2FuIGJlIGV4ZWN1dGVkLiBUaGVcbiAgICAvLyBtdWx0aXBsaWNhdGl2ZSBpbnZlcnNlIGNhcHMgdGhlIEZQUyAodGhlIGRlZmF1bHQgb2YgemVybyBtZWFucyB0aGVyZSBpc1xuICAgIC8vIG5vIGNhcCkuXG4gICAgbWluRnJhbWVEZWxheSA9IDAsXG5cbiAgICAvLyBXaGV0aGVyIHRoZSBtYWluIGxvb3AgaXMgcnVubmluZy5cbiAgICBydW5uaW5nID0gZmFsc2UsXG5cbiAgICAvLyBgdHJ1ZWAgaWYgYE1haW5Mb29wLnN0YXJ0KClgIGhhcyBiZWVuIGNhbGxlZCBhbmQgdGhlIG1vc3QgcmVjZW50IHRpbWUgaXRcbiAgICAvLyB3YXMgY2FsbGVkIGhhcyBub3QgYmVlbiBmb2xsb3dlZCBieSBhIGNhbGwgdG8gYE1haW5Mb29wLnN0b3AoKWAuIFRoaXMgaXNcbiAgICAvLyBkaWZmZXJlbnQgdGhhbiBgcnVubmluZ2AgYmVjYXVzZSB0aGVyZSBpcyBhIGRlbGF5IG9mIGEgZmV3IG1pbGxpc2Vjb25kc1xuICAgIC8vIGFmdGVyIGBNYWluTG9vcC5zdGFydCgpYCBpcyBjYWxsZWQgYmVmb3JlIHRoZSBhcHBsaWNhdGlvbiBpcyBjb25zaWRlcmVkXG4gICAgLy8gXCJydW5uaW5nLlwiIFRoaXMgZGVsYXkgaXMgZHVlIHRvIHdhaXRpbmcgZm9yIHRoZSBuZXh0IGZyYW1lLlxuICAgIHN0YXJ0ZWQgPSBmYWxzZSxcblxuICAgIC8vIFdoZXRoZXIgdGhlIHNpbXVsYXRpb24gaGFzIGZhbGxlbiB0b28gZmFyIGJlaGluZCByZWFsIHRpbWUuXG4gICAgLy8gU3BlY2lmaWNhbGx5LCBgcGFuaWNgIHdpbGwgYmUgc2V0IHRvIGB0cnVlYCBpZiB0b28gbWFueSB1cGRhdGVzIG9jY3VyIGluXG4gICAgLy8gb25lIGZyYW1lLiBUaGlzIGlzIG9ubHkgcmVsZXZhbnQgaW5zaWRlIG9mIGFuaW1hdGUoKSwgYnV0IGEgcmVmZXJlbmNlIGlzXG4gICAgLy8gaGVsZCBleHRlcm5hbGx5IHNvIHRoYXQgdGhpcyB2YXJpYWJsZSBpcyBub3QgbWFya2VkIGZvciBnYXJiYWdlXG4gICAgLy8gY29sbGVjdGlvbiBldmVyeSB0aW1lIHRoZSBtYWluIGxvb3AgcnVucy5cbiAgICBwYW5pYyA9IGZhbHNlLFxuXG4gICAgLy8gVGhlIGZ1bmN0aW9uIHRoYXQgcnVucyB0aGUgbWFpbiBsb29wLiBUaGUgdW5wcmVmaXhlZCB2ZXJzaW9uIG9mXG4gICAgLy8gYHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKWAgaXMgYXZhaWxhYmxlIGluIGFsbCBtb2Rlcm4gYnJvd3NlcnNcbiAgICAvLyBub3csIGJ1dCBub2RlLmpzIGRvZXNuJ3QgaGF2ZSBpdCwgc28gZmFsbCBiYWNrIHRvIHRpbWVycy4gVGhlIHBvbHlmaWxsXG4gICAgLy8gaXMgYWRhcHRlZCBmcm9tIHRoZSBNSVQtbGljZW5zZWRcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdW5kZXJzY29yZWRpc2NvdmVyeS9yZWFsdGltZS1tdWx0aXBsYXllci1pbi1odG1sNVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHJvb3QucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGxhc3RUaW1lc3RhbXAgPSBEYXRlLm5vdygpLFxuICAgICAgICAgICAgbm93LFxuICAgICAgICAgICAgdGltZW91dDtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgLy8gVGhlIG5leHQgZnJhbWUgc2hvdWxkIHJ1biBubyBzb29uZXIgdGhhbiB0aGUgc2ltdWxhdGlvbiBhbGxvd3MsXG4gICAgICAgICAgICAvLyBidXQgYXMgc29vbiBhcyBwb3NzaWJsZSBpZiB0aGUgY3VycmVudCBmcmFtZSBoYXMgYWxyZWFkeSB0YWtlblxuICAgICAgICAgICAgLy8gbW9yZSB0aW1lIHRvIHJ1biB0aGFuIGlzIHNpbXVsYXRlZCBpbiBvbmUgdGltZXN0ZXAuXG4gICAgICAgICAgICB0aW1lb3V0ID0gTWF0aC5tYXgoMCwgc2ltdWxhdGlvblRpbWVzdGVwIC0gKG5vdyAtIGxhc3RUaW1lc3RhbXApKTtcbiAgICAgICAgICAgIGxhc3RUaW1lc3RhbXAgPSBub3cgKyB0aW1lb3V0O1xuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobm93ICsgdGltZW91dCk7XG4gICAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgfTtcbiAgICB9KSgpLFxuXG4gICAgLy8gVGhlIGZ1bmN0aW9uIHRoYXQgc3RvcHMgdGhlIG1haW4gbG9vcC4gVGhlIHVucHJlZml4ZWQgdmVyc2lvbiBvZlxuICAgIC8vIGB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoKWAgaXMgYXZhaWxhYmxlIGluIGFsbCBtb2Rlcm4gYnJvd3NlcnMgbm93LFxuICAgIC8vIGJ1dCBub2RlLmpzIGRvZXNuJ3QgaGF2ZSBpdCwgc28gZmFsbCBiYWNrIHRvIHRpbWVycy5cbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSA9IHJvb3QuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgY2xlYXJUaW1lb3V0LFxuXG4gICAgLy8gSW4gYWxsIG1ham9yIGJyb3dzZXJzLCByZXBsYWNpbmcgbm9uLXNwZWNpZmllZCBmdW5jdGlvbnMgd2l0aCBOT09Qc1xuICAgIC8vIHNlZW1zIHRvIGJlIGFzIGZhc3Qgb3Igc2xpZ2h0bHkgZmFzdGVyIHRoYW4gdXNpbmcgY29uZGl0aW9ucyB0byBvbmx5XG4gICAgLy8gY2FsbCB0aGUgZnVuY3Rpb25zIGlmIHRoZXkgYXJlIHNwZWNpZmllZC4gVGhpcyBpcyBwcm9iYWJseSBkdWUgdG8gZW1wdHlcbiAgICAvLyBmdW5jdGlvbnMgYmVpbmcgb3B0aW1pemVkIGF3YXkuIGh0dHA6Ly9qc3BlcmYuY29tL25vb3AtdnMtY29uZGl0aW9uXG4gICAgTk9PUCA9IGZ1bmN0aW9uKCkge30sXG5cbiAgICAvLyBBIGZ1bmN0aW9uIHRoYXQgcnVucyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBtYWluIGxvb3AuXG4gICAgLy8gU2VlIGBNYWluTG9vcC5zZXRCZWdpbigpYCBmb3IgZGV0YWlscy5cbiAgICBiZWdpbiA9IE5PT1AsXG5cbiAgICAvLyBBIGZ1bmN0aW9uIHRoYXQgcnVucyB1cGRhdGVzIChpLmUuIEFJIGFuZCBwaHlzaWNzKS5cbiAgICAvLyBTZWUgYE1haW5Mb29wLnNldFVwZGF0ZSgpYCBmb3IgZGV0YWlscy5cbiAgICB1cGRhdGUgPSBOT09QLFxuXG4gICAgLy8gQSBmdW5jdGlvbiB0aGF0IGRyYXdzIHRoaW5ncyBvbiB0aGUgc2NyZWVuLlxuICAgIC8vIFNlZSBgTWFpbkxvb3Auc2V0RHJhdygpYCBmb3IgZGV0YWlscy5cbiAgICBkcmF3ID0gTk9PUCxcblxuICAgIC8vIEEgZnVuY3Rpb24gdGhhdCBydW5zIGF0IHRoZSBlbmQgb2YgdGhlIG1haW4gbG9vcC5cbiAgICAvLyBTZWUgYE1haW5Mb29wLnNldEVuZCgpYCBmb3IgZGV0YWlscy5cbiAgICBlbmQgPSBOT09QLFxuXG4gICAgLy8gVGhlIElEIG9mIHRoZSBjdXJyZW50bHkgZXhlY3V0aW5nIGZyYW1lLiBVc2VkIHRvIGNhbmNlbCBmcmFtZXMgd2hlblxuICAgIC8vIHN0b3BwaW5nIHRoZSBsb29wLlxuICAgIHJhZkhhbmRsZTtcblxuLyoqXG4gKiBNYW5hZ2VzIHRoZSBtYWluIGxvb3AgdGhhdCBydW5zIHVwZGF0ZXMgYW5kIHJlbmRlcmluZy5cbiAqXG4gKiBUaGUgbWFpbiBsb29wIGlzIGEgY29yZSBwYXJ0IG9mIGFueSBhcHBsaWNhdGlvbiBpbiB3aGljaCBzdGF0ZSBjaGFuZ2VzXG4gKiBldmVuIGlmIG5vIGV2ZW50cyBhcmUgaGFuZGxlZC4gSW4gZ2FtZXMsIGl0IGlzIHR5cGljYWxseSByZXNwb25zaWJsZSBmb3JcbiAqIGNvbXB1dGluZyBwaHlzaWNzIGFuZCBBSSBhcyB3ZWxsIGFzIGRyYXdpbmcgdGhlIHJlc3VsdCBvbiB0aGUgc2NyZWVuLlxuICpcbiAqIFRoZSBib2R5IG9mIHRoaXMgcGFydGljdWxhciBsb29wIGlzIHJ1biBldmVyeSB0aW1lIHRoZSBicm93c2VyIGlzIHJlYWR5IHRvXG4gKiBwYWludCBhbm90aGVyIGZyYW1lLiBUaGUgZnJlcXVlbmN5IHdpdGggd2hpY2ggdGhpcyBoYXBwZW5zIGRlcGVuZHMgcHJpbWFyaWx5XG4gKiBvbiB0aGUgbW9uaXRvcidzIHJlZnJlc2ggcmF0ZSwgd2hpY2ggaXMgdHlwaWNhbGx5IDYwIGZyYW1lcyBwZXIgc2Vjb25kLiBNb3N0XG4gKiBhcHBsaWNhdGlvbnMgYWltIHRvIHJ1biBhdCA2MCBGUFMgZm9yIHRoaXMgcmVhc29uLCBtZWFuaW5nIHRoYXQgdGhlIG1haW5cbiAqIGxvb3AgcnVucyBhYm91dCBvbmNlIGV2ZXJ5IDE2LjcgbWlsbGlzZWNvbmRzLiBXaXRoIHRoaXMgdGFyZ2V0LCBldmVyeXRoaW5nXG4gKiB0aGF0IGhhcHBlbnMgaW4gdGhlIG1haW4gbG9vcCAoZS5nLiBhbGwgdXBkYXRlcyBhbmQgZHJhd2luZykgbmVlZHMgdG8gb2NjdXJcbiAqIHdpdGhpbiB0aGUgXCJidWRnZXRcIiBvZiAxNi43IG1pbGxpc2Vjb25kcy4gIFNlZVxuICogYE1haW5Mb29wLnNldFNpbXVsYXRpb25UaW1lc3RlcCgpYCBmb3IgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCB0eXBpY2FsXG4gKiBtb25pdG9yIHJlZnJlc2ggcmF0ZXMgYW5kIGZyYW1lIHJhdGUgdGFyZ2V0cy5cbiAqXG4gKiBUaGUgbWFpbiBsb29wIGNhbiBiZSBzdGFydGVkIGFuZCBzdG9wcGVkLCBidXQgdGhlcmUgY2FuIG9ubHkgYmUgb25lIE1haW5Mb29wXG4gKiAoZXhjZXB0IHRoYXQgZWFjaCBXZWIgV29ya2VyIGNhbiBoYXZlIGl0cyBvd24gTWFpbkxvb3ApLiBUaGVyZSBhcmUgZm91ciBtYWluXG4gKiBwYXJ0cyBvZiB0aGUgbG9vcDoge0BsaW5rICNzZXRCZWdpbiBiZWdpbn0oKSwge0BsaW5rICNzZXRVcGRhdGUgdXBkYXRlfSgpLFxuICoge0BsaW5rICNzZXREcmF3IGRyYXd9KCksIGFuZCB7QGxpbmsgI3NldEVuZCBlbmR9KCksIGluIHRoYXQgb3JkZXIuIFNlZSB0aGVcbiAqIGZ1bmN0aW9ucyB0aGF0IHNldCBlYWNoIG9mIHRoZW0gZm9yIGRlc2NyaXB0aW9ucyBvZiB3aGF0IHRoZXkgYXJlIHVzZWQgZm9yLlxuICogTm90ZSB0aGF0IHVwZGF0ZSgpIGNhbiBydW4gemVybyBvciBtb3JlIHRpbWVzIHBlciBsb29wLlxuICpcbiAqIEBjbGFzcyBNYWluTG9vcFxuICovXG5yb290Lk1haW5Mb29wID0ge1xuICAgIC8qKlxuICAgICAqIEdldHMgaG93IG1hbnkgbWlsbGlzZWNvbmRzIHNob3VsZCBiZSBzaW11bGF0ZWQgYnkgZXZlcnkgcnVuIG9mIHVwZGF0ZSgpLlxuICAgICAqXG4gICAgICogU2VlIGBNYWluTG9vcC5zZXRTaW11bGF0aW9uVGltZXN0ZXAoKWAgZm9yIGRldGFpbHMgb24gdGhpcyB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKiAgIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgc2hvdWxkIGJlIHNpbXVsYXRlZCBieSBldmVyeSBydW4gb2ZcbiAgICAgKiAgIHtAbGluayAjc2V0VXBkYXRlIHVwZGF0ZX0oKS5cbiAgICAgKi9cbiAgICBnZXRTaW11bGF0aW9uVGltZXN0ZXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gc2ltdWxhdGlvblRpbWVzdGVwO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGhvdyBtYW55IG1pbGxpc2Vjb25kcyBzaG91bGQgYmUgc2ltdWxhdGVkIGJ5IGV2ZXJ5IHJ1biBvZiB1cGRhdGUoKS5cbiAgICAgKlxuICAgICAqIFRoZSBwZXJjZWl2ZWQgZnJhbWVzIHBlciBzZWNvbmQgKEZQUykgaXMgZWZmZWN0aXZlbHkgY2FwcGVkIGF0IHRoZVxuICAgICAqIG11bHRpcGxpY2F0aXZlIGludmVyc2Ugb2YgdGhlIHNpbXVsYXRpb24gdGltZXN0ZXAuIFRoYXQgaXMsIGlmIHRoZVxuICAgICAqIHRpbWVzdGVwIGlzIDEwMDAgLyA2MCAod2hpY2ggaXMgdGhlIGRlZmF1bHQpLCB0aGVuIHRoZSBtYXhpbXVtIHBlcmNlaXZlZFxuICAgICAqIEZQUyBpcyBlZmZlY3RpdmVseSA2MC4gRGVjcmVhc2luZyB0aGUgdGltZXN0ZXAgaW5jcmVhc2VzIHRoZSBtYXhpbXVtXG4gICAgICogcGVyY2VpdmVkIEZQUyBhdCB0aGUgY29zdCBvZiBydW5uaW5nIHtAbGluayAjc2V0VXBkYXRlIHVwZGF0ZX0oKSBtb3JlXG4gICAgICogdGltZXMgcGVyIGZyYW1lIGF0IGxvd2VyIGZyYW1lIHJhdGVzLiBTaW5jZSBydW5uaW5nIHVwZGF0ZSgpIG1vcmUgdGltZXNcbiAgICAgKiB0YWtlcyBtb3JlIHRpbWUgdG8gcHJvY2VzcywgdGhpcyBjYW4gYWN0dWFsbHkgc2xvdyBkb3duIHRoZSBmcmFtZSByYXRlLlxuICAgICAqIEFkZGl0aW9uYWxseSwgaWYgdGhlIGFtb3VudCBvZiB0aW1lIGl0IHRha2VzIHRvIHJ1biB1cGRhdGUoKSBleGNlZWRzIG9yXG4gICAgICogdmVyeSBuZWFybHkgZXhjZWVkcyB0aGUgdGltZXN0ZXAsIHRoZSBhcHBsaWNhdGlvbiB3aWxsIGZyZWV6ZSBhbmQgY3Jhc2hcbiAgICAgKiBpbiBhIHNwaXJhbCBvZiBkZWF0aCAodW5sZXNzIGl0IGlzIHJlc2N1ZWQ7IHNlZSBgTWFpbkxvb3Auc2V0RW5kKClgIGZvclxuICAgICAqIGFuIGV4cGxhbmF0aW9uIG9mIHdoYXQgY2FuIGJlIGRvbmUgaWYgYSBzcGlyYWwgb2YgZGVhdGggaXMgb2NjdXJyaW5nKS5cbiAgICAgKlxuICAgICAqIFRoZSBleGNlcHRpb24gdG8gdGhpcyBpcyB0aGF0IGludGVycG9sYXRpbmcgYmV0d2VlbiB1cGRhdGVzIGZvciBlYWNoXG4gICAgICogcmVuZGVyIGNhbiBpbmNyZWFzZSB0aGUgcGVyY2VpdmVkIGZyYW1lIHJhdGUgYW5kIHJlZHVjZSB2aXN1YWxcbiAgICAgKiBzdHV0dGVyaW5nLiBTZWUgYE1haW5Mb29wLnNldERyYXcoKWAgZm9yIGFuIGV4cGxhbmF0aW9uIG9mIGhvdyB0byBkb1xuICAgICAqIHRoaXMuXG4gICAgICpcbiAgICAgKiBJZiB5b3UgYXJlIGNvbnNpZGVyaW5nIGRlY3JlYXNpbmcgdGhlIHNpbXVsYXRpb24gdGltZXN0ZXAgaW4gb3JkZXIgdG9cbiAgICAgKiByYWlzZSB0aGUgbWF4aW11bSBwZXJjZWl2ZWQgRlBTLCBrZWVwIGluIG1pbmQgdGhhdCBtb3N0IG1vbml0b3JzIGNhbid0XG4gICAgICogZGlzcGxheSBtb3JlIHRoYW4gNjAgRlBTLiBXaGV0aGVyIGh1bWFucyBjYW4gdGVsbCB0aGUgZGlmZmVyZW5jZSBhbW9uZ1xuICAgICAqIGhpZ2ggZnJhbWUgcmF0ZXMgZGVwZW5kcyBvbiB0aGUgYXBwbGljYXRpb24sIGJ1dCBmb3IgcmVmZXJlbmNlLCBmaWxtIGlzXG4gICAgICogdXN1YWxseSBkaXNwbGF5ZWQgYXQgMjQgRlBTLCBvdGhlciB2aWRlb3MgYXQgMzAgRlBTLCBtb3N0IGdhbWVzIGFyZVxuICAgICAqIGFjY2VwdGFibGUgYWJvdmUgMzAgRlBTLCBhbmQgdmlydHVhbCByZWFsaXR5IG1pZ2h0IHJlcXVpcmUgNzUgRlBTIHRvXG4gICAgICogZmVlbCBuYXR1cmFsLiBTb21lIGdhbWluZyBtb25pdG9ycyBnbyB1cCB0byAxNDQgRlBTLiBTZXR0aW5nIHRoZVxuICAgICAqIHRpbWVzdGVwIGJlbG93IDEwMDAgLyAxNDQgaXMgZGlzY291cmFnZWQgYW5kIGJlbG93IDEwMDAgLyAyNDAgaXNcbiAgICAgKiBzdHJvbmdseSBkaXNjb3VyYWdlZC4gVGhlIGRlZmF1bHQgb2YgMTAwMCAvIDYwIGlzIGdvb2QgaW4gbW9zdCBjYXNlcy5cbiAgICAgKlxuICAgICAqIFRoZSBzaW11bGF0aW9uIHRpbWVzdGVwIHNob3VsZCB0eXBpY2FsbHkgb25seSBiZSBjaGFuZ2VkIGF0XG4gICAgICogZGV0ZXJtaW5pc3RpYyB0aW1lcyAoZS5nLiBiZWZvcmUgdGhlIG1haW4gbG9vcCBzdGFydHMgZm9yIHRoZSBmaXJzdFxuICAgICAqIHRpbWUsIGFuZCBub3QgaW4gcmVzcG9uc2UgdG8gdXNlciBpbnB1dCBvciBzbG93IGZyYW1lIHJhdGVzKSB0byBhdm9pZFxuICAgICAqIGludHJvZHVjaW5nIG5vbi1kZXRlcm1pbmlzdGljIGJlaGF2aW9yLiBUaGUgdXBkYXRlIHRpbWVzdGVwIHNob3VsZCBiZVxuICAgICAqIHRoZSBzYW1lIGZvciBhbGwgcGxheWVycy91c2VycyBpbiBtdWx0aXBsYXllci9tdWx0aS11c2VyIGFwcGxpY2F0aW9ucy5cbiAgICAgKlxuICAgICAqIFNlZSBhbHNvIGBNYWluTG9vcC5nZXRTaW11bGF0aW9uVGltZXN0ZXAoKWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGltZXN0ZXBcbiAgICAgKiAgIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgc2hvdWxkIGJlIHNpbXVsYXRlZCBieSBldmVyeSBydW4gb2ZcbiAgICAgKiAgIHtAbGluayAjc2V0VXBkYXRlIHVwZGF0ZX0oKS5cbiAgICAgKi9cbiAgICBzZXRTaW11bGF0aW9uVGltZXN0ZXA6IGZ1bmN0aW9uKHRpbWVzdGVwKSB7XG4gICAgICAgIHNpbXVsYXRpb25UaW1lc3RlcCA9IHRpbWVzdGVwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZXhwb25lbnRpYWwgbW92aW5nIGF2ZXJhZ2Ugb2YgdGhlIGZyYW1lcyBwZXIgc2Vjb25kLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqICAgVGhlIGV4cG9uZW50aWFsIG1vdmluZyBhdmVyYWdlIG9mIHRoZSBmcmFtZXMgcGVyIHNlY29uZC5cbiAgICAgKi9cbiAgICBnZXRGUFM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZnBzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBtYXhpbXVtIGZyYW1lIHJhdGUuXG4gICAgICpcbiAgICAgKiBPdGhlciBmYWN0b3JzIGFsc28gbGltaXQgdGhlIEZQUzsgc2VlIGBNYWluTG9vcC5zZXRTaW11bGF0aW9uVGltZXN0ZXBgXG4gICAgICogZm9yIGRldGFpbHMuXG4gICAgICpcbiAgICAgKiBTZWUgYWxzbyBgTWFpbkxvb3Auc2V0TWF4QWxsb3dlZEZQUygpYC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKiAgIFRoZSBtYXhpbXVtIG51bWJlciBvZiBmcmFtZXMgcGVyIHNlY29uZCBhbGxvd2VkLlxuICAgICAqL1xuICAgIGdldE1heEFsbG93ZWRGUFM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gMTAwMCAvIG1pbkZyYW1lRGVsYXk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgYSBtYXhpbXVtIGZyYW1lIHJhdGUuXG4gICAgICpcbiAgICAgKiBTZWUgYWxzbyBgTWFpbkxvb3AuZ2V0TWF4QWxsb3dlZEZQUygpYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbZnBzPUluZmluaXR5XVxuICAgICAqICAgVGhlIG1heGltdW0gbnVtYmVyIG9mIGZyYW1lcyBwZXIgc2Vjb25kIHRvIGV4ZWN1dGUuIElmIEluZmluaXR5IG9yIG5vdFxuICAgICAqICAgcGFzc2VkLCB0aGVyZSB3aWxsIGJlIG5vIEZQUyBjYXAgKGFsdGhvdWdoIG90aGVyIGZhY3RvcnMgZG8gbGltaXQgdGhlXG4gICAgICogICBGUFM7IHNlZSBgTWFpbkxvb3Auc2V0U2ltdWxhdGlvblRpbWVzdGVwYCBmb3IgZGV0YWlscykuIElmIHplcm8sIHRoaXNcbiAgICAgKiAgIHdpbGwgc3RvcCB0aGUgbG9vcCwgYW5kIHdoZW4gdGhlIGxvb3AgaXMgbmV4dCBzdGFydGVkLCBpdCB3aWxsIHJldHVyblxuICAgICAqICAgdG8gdGhlIHByZXZpb3VzIG1heGltdW0gZnJhbWUgcmF0ZS4gUGFzc2luZyBuZWdhdGl2ZSB2YWx1ZXMgd2lsbCBzdGFsbFxuICAgICAqICAgdGhlIGxvb3AgdW50aWwgdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgYWdhaW4gd2l0aCBhIHBvc2l0aXZlIHZhbHVlLlxuICAgICAqXG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIHNldE1heEFsbG93ZWRGUFM6IGZ1bmN0aW9uKGZwcykge1xuICAgICAgICBpZiAodHlwZW9mIGZwcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGZwcyA9IEluZmluaXR5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChmcHMgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gRGl2aWRpbmcgYnkgSW5maW5pdHkgcmV0dXJucyB6ZXJvLlxuICAgICAgICAgICAgbWluRnJhbWVEZWxheSA9IDEwMDAgLyBmcHM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlc2V0IHRoZSBhbW91bnQgb2YgdGltZSB0aGF0IGhhcyBub3QgeWV0IGJlZW4gc2ltdWxhdGVkIHRvIHplcm8uXG4gICAgICpcbiAgICAgKiBUaGlzIGludHJvZHVjZXMgbm9uLWRldGVybWluaXN0aWMgYmVoYXZpb3IgaWYgY2FsbGVkIGFmdGVyIHRoZVxuICAgICAqIGFwcGxpY2F0aW9uIGhhcyBzdGFydGVkIHJ1bm5pbmcgKHVubGVzcyBpdCBpcyBiZWluZyByZXNldCwgaW4gd2hpY2ggY2FzZVxuICAgICAqIGl0IGRvZXNuJ3QgbWF0dGVyKS4gSG93ZXZlciwgdGhpcyBjYW4gYmUgdXNlZnVsIGluIGNhc2VzIHdoZXJlIHRoZVxuICAgICAqIGFtb3VudCBvZiB0aW1lIHRoYXQgaGFzIG5vdCB5ZXQgYmVlbiBzaW11bGF0ZWQgaGFzIGdyb3duIHZlcnkgbGFyZ2VcbiAgICAgKiAoZm9yIGV4YW1wbGUsIHdoZW4gdGhlIGFwcGxpY2F0aW9uJ3MgdGFiIGdldHMgcHV0IGluIHRoZSBiYWNrZ3JvdW5kIGFuZFxuICAgICAqIHRoZSBicm93c2VyIHRocm90dGxlcyB0aGUgdGltZXJzIGFzIGEgcmVzdWx0KS4gSW4gYXBwbGljYXRpb25zIHdpdGhcbiAgICAgKiBsb2Nrc3RlcCB0aGUgcGxheWVyIHdvdWxkIGdldCBkcm9wcGVkLCBidXQgaW4gb3RoZXIgbmV0d29ya2VkXG4gICAgICogYXBwbGljYXRpb25zIGl0IG1heSBiZSBuZWNlc3NhcnkgdG8gc25hcCBvciBlYXNlIHRoZSBwbGF5ZXIvdXNlciB0byB0aGVcbiAgICAgKiBhdXRob3JpdGF0aXZlIHN0YXRlIGFuZCBkaXNjYXJkIHBlbmRpbmcgdXBkYXRlcyBpbiB0aGUgcHJvY2Vzcy4gSW5cbiAgICAgKiBub24tbmV0d29ya2VkIGFwcGxpY2F0aW9ucyBpdCBtYXkgYWxzbyBiZSBhY2NlcHRhYmxlIHRvIHNpbXBseSByZXN1bWVcbiAgICAgKiB0aGUgYXBwbGljYXRpb24gd2hlcmUgaXQgbGFzdCBsZWZ0IG9mZiBhbmQgaWdub3JlIHRoZSBhY2N1bXVsYXRlZFxuICAgICAqIHVuc2ltdWxhdGVkIHRpbWUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICogICBUaGUgY3VtdWxhdGl2ZSBhbW91bnQgb2YgZWxhcHNlZCB0aW1lIGluIG1pbGxpc2Vjb25kcyB0aGF0IGhhcyBub3QgeWV0XG4gICAgICogICBiZWVuIHNpbXVsYXRlZCwgYnV0IGlzIGJlaW5nIGRpc2NhcmRlZCBhcyBhIHJlc3VsdCBvZiBjYWxsaW5nIHRoaXNcbiAgICAgKiAgIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIHJlc2V0RnJhbWVEZWx0YTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvbGRGcmFtZURlbHRhID0gZnJhbWVEZWx0YTtcbiAgICAgICAgZnJhbWVEZWx0YSA9IDA7XG4gICAgICAgIHJldHVybiBvbGRGcmFtZURlbHRhO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBmdW5jdGlvbiB0aGF0IHJ1bnMgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgbWFpbiBsb29wLlxuICAgICAqXG4gICAgICogVGhlIGJlZ2luKCkgZnVuY3Rpb24gaXMgdHlwaWNhbGx5IHVzZWQgdG8gcHJvY2VzcyBpbnB1dCBiZWZvcmUgdGhlXG4gICAgICogdXBkYXRlcyBydW4uIFByb2Nlc3NpbmcgaW5wdXQgaGVyZSAoaW4gY2h1bmtzKSBjYW4gcmVkdWNlIHRoZSBydW5uaW5nXG4gICAgICogdGltZSBvZiBldmVudCBoYW5kbGVycywgd2hpY2ggaXMgdXNlZnVsIGJlY2F1c2UgbG9uZy1ydW5uaW5nIGV2ZW50XG4gICAgICogaGFuZGxlcnMgY2FuIHNvbWV0aW1lcyBkZWxheSBmcmFtZXMuXG4gICAgICpcbiAgICAgKiBVbmxpa2Uge0BsaW5rICNzZXRVcGRhdGUgdXBkYXRlfSgpLCB3aGljaCBjYW4gcnVuIHplcm8gb3IgbW9yZSB0aW1lcyBwZXJcbiAgICAgKiBmcmFtZSwgYmVnaW4oKSBhbHdheXMgcnVucyBleGFjdGx5IG9uY2UgcGVyIGZyYW1lLiBUaGlzIG1ha2VzIGl0IHVzZWZ1bFxuICAgICAqIGZvciBhbnkgdXBkYXRlcyB0aGF0IGFyZSBub3QgZGVwZW5kZW50IG9uIHRpbWUgaW4gdGhlIHNpbXVsYXRpb24uXG4gICAgICogRXhhbXBsZXMgaW5jbHVkZSBhZGp1c3RpbmcgSFVEIGNhbGN1bGF0aW9ucyBvciBwZXJmb3JtaW5nIGxvbmctcnVubmluZ1xuICAgICAqIHVwZGF0ZXMgaW5jcmVtZW50YWxseS4gQ29tcGFyZWQgdG8ge0BsaW5rICNzZXRFbmQgZW5kfSgpLCBnZW5lcmFsbHlcbiAgICAgKiBhY3Rpb25zIHNob3VsZCBvY2N1ciBpbiBiZWdpbigpIGlmIHRoZXkgYWZmZWN0IGFueXRoaW5nIHRoYXRcbiAgICAgKiB7QGxpbmsgI3NldFVwZGF0ZSB1cGRhdGV9KCkgb3Ige0BsaW5rICNzZXREcmF3IGRyYXd9KCkgdXNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gYmVnaW5cbiAgICAgKiAgIFRoZSBiZWdpbigpIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbYmVnaW4udGltZXN0YW1wXVxuICAgICAqICAgVGhlIGN1cnJlbnQgdGltZXN0YW1wICh3aGVuIHRoZSBmcmFtZSBzdGFydGVkKSwgaW4gbWlsbGlzZWNvbmRzLiBUaGlzXG4gICAgICogICBzaG91bGQgb25seSBiZSB1c2VkIGZvciBjb21wYXJpc29uIHRvIG90aGVyIHRpbWVzdGFtcHMgYmVjYXVzZSB0aGVcbiAgICAgKiAgIGVwb2NoIChpLmUuIHRoZSBcInplcm9cIiB0aW1lKSBkZXBlbmRzIG9uIHRoZSBlbmdpbmUgcnVubmluZyB0aGlzIGNvZGUuXG4gICAgICogICBJbiBlbmdpbmVzIHRoYXQgc3VwcG9ydCBgRE9NSGlnaFJlc1RpbWVTdGFtcGAgKGFsbCBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgKiAgIGV4Y2VwdCBpT1MgU2FmYXJpIDgpIHRoZSBlcG9jaCBpcyB0aGUgdGltZSB0aGUgcGFnZSBzdGFydGVkIGxvYWRpbmcsXG4gICAgICogICBzcGVjaWZpY2FsbHkgYHBlcmZvcm1hbmNlLnRpbWluZy5uYXZpZ2F0aW9uU3RhcnRgLiBFdmVyeXdoZXJlIGVsc2UsXG4gICAgICogICBpbmNsdWRpbmcgbm9kZS5qcywgdGhlIGVwb2NoIGlzIHRoZSBVbml4IGVwb2NoICgxOTcwLTAxLTAxVDAwOjAwOjAwWikuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtiZWdpbi5kZWx0YV1cbiAgICAgKiAgIFRoZSB0b3RhbCBlbGFwc2VkIHRpbWUgdGhhdCBoYXMgbm90IHlldCBiZWVuIHNpbXVsYXRlZCwgaW5cbiAgICAgKiAgIG1pbGxpc2Vjb25kcy5cbiAgICAgKi9cbiAgICBzZXRCZWdpbjogZnVuY3Rpb24oZnVuKSB7XG4gICAgICAgIGJlZ2luID0gZnVuIHx8IGJlZ2luO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZnVuY3Rpb24gdGhhdCBydW5zIHVwZGF0ZXMgKGUuZy4gQUkgYW5kIHBoeXNpY3MpLlxuICAgICAqXG4gICAgICogVGhlIHVwZGF0ZSgpIGZ1bmN0aW9uIHNob3VsZCBzaW11bGF0ZSBhbnl0aGluZyB0aGF0IGlzIGFmZmVjdGVkIGJ5IHRpbWUuXG4gICAgICogSXQgY2FuIGJlIGNhbGxlZCB6ZXJvIG9yIG1vcmUgdGltZXMgcGVyIGZyYW1lIGRlcGVuZGluZyBvbiB0aGUgZnJhbWVcbiAgICAgKiByYXRlLlxuICAgICAqXG4gICAgICogQXMgd2l0aCBldmVyeXRoaW5nIGluIHRoZSBtYWluIGxvb3AsIHRoZSBydW5uaW5nIHRpbWUgb2YgdXBkYXRlKClcbiAgICAgKiBkaXJlY3RseSBhZmZlY3RzIHRoZSBmcmFtZSByYXRlLiBJZiB1cGRhdGUoKSB0YWtlcyBsb25nIGVub3VnaCB0aGF0IHRoZVxuICAgICAqIGZyYW1lIHJhdGUgZHJvcHMgYmVsb3cgdGhlIHRhcmdldCAoXCJidWRnZXRlZFwiKSBmcmFtZSByYXRlLCBwYXJ0cyBvZiB0aGVcbiAgICAgKiB1cGRhdGUoKSBmdW5jdGlvbiB0aGF0IGRvIG5vdCBuZWVkIHRvIGV4ZWN1dGUgYmV0d2VlbiBldmVyeSBmcmFtZSBjYW4gYmVcbiAgICAgKiBtb3ZlZCBpbnRvIFdlYiBXb3JrZXJzLiAoVmFyaW91cyBzb3VyY2VzIG9uIHRoZSBpbnRlcm5ldCBzb21ldGltZXNcbiAgICAgKiBzdWdnZXN0IG90aGVyIHNjaGVkdWxpbmcgcGF0dGVybnMgdXNpbmcgc2V0VGltZW91dCgpIG9yIHNldEludGVydmFsKCkuXG4gICAgICogVGhlc2UgYXBwcm9hY2hlcyBzb21ldGltZXMgb2ZmZXIgbW9kZXN0IGltcHJvdmVtZW50cyB3aXRoIG1pbmltYWxcbiAgICAgKiBjaGFuZ2VzIHRvIGV4aXN0aW5nIGNvZGUsIGJ1dCBiZWNhdXNlIEphdmFTY3JpcHQgaXMgc2luZ2xlLXRocmVhZGVkLCB0aGVcbiAgICAgKiB1cGRhdGVzIHdpbGwgc3RpbGwgYmxvY2sgcmVuZGVyaW5nIGFuZCBkcmFnIGRvd24gdGhlIGZyYW1lIHJhdGUuIFdlYlxuICAgICAqIFdvcmtlcnMgZXhlY3V0ZSBpbiBzZXBhcmF0ZSB0aHJlYWRzLCBzbyB0aGV5IGZyZWUgdXAgbW9yZSB0aW1lIGluIHRoZVxuICAgICAqIG1haW4gbG9vcC4pXG4gICAgICpcbiAgICAgKiBUaGlzIHNjcmlwdCBjYW4gYmUgaW1wb3J0ZWQgaW50byBhIFdlYiBXb3JrZXIgdXNpbmcgaW1wb3J0U2NyaXB0cygpIGFuZFxuICAgICAqIHVzZWQgdG8gcnVuIGEgc2Vjb25kIG1haW4gbG9vcCBpbiB0aGUgd29ya2VyLiBTb21lIGNvbnNpZGVyYXRpb25zOlxuICAgICAqXG4gICAgICogLSBQcm9maWxlIHlvdXIgY29kZSBiZWZvcmUgZG9pbmcgdGhlIHdvcmsgdG8gbW92ZSBpdCBpbnRvIFdlYiBXb3JrZXJzLlxuICAgICAqICAgSXQgY291bGQgYmUgdGhlIHJlbmRlcmluZyB0aGF0IGlzIHRoZSBib3R0bGVuZWNrLCBpbiB3aGljaCBjYXNlIHRoZVxuICAgICAqICAgc29sdXRpb24gaXMgdG8gZGVjcmVhc2UgdGhlIHZpc3VhbCBjb21wbGV4aXR5IG9mIHRoZSBzY2VuZS5cbiAgICAgKiAtIEl0IGRvZXNuJ3QgbWFrZSBzZW5zZSB0byBtb3ZlIHRoZSAqZW50aXJlKiBjb250ZW50cyBvZiB1cGRhdGUoKSBpbnRvXG4gICAgICogICB3b3JrZXJzIHVubGVzcyB7QGxpbmsgI3NldERyYXcgZHJhd30oKSBjYW4gaW50ZXJwb2xhdGUgYmV0d2VlbiBmcmFtZXMuXG4gICAgICogICBUaGUgbG93ZXN0LWhhbmdpbmcgZnJ1aXQgaXMgYmFja2dyb3VuZCB1cGRhdGVzIChsaWtlIGNhbGN1bGF0aW5nXG4gICAgICogICBjaXRpemVucycgaGFwcGluZXNzIGluIGEgY2l0eS1idWlsZGluZyBnYW1lKSwgcGh5c2ljcyB0aGF0IGRvZXNuJ3RcbiAgICAgKiAgIGFmZmVjdCB0aGUgc2NlbmUgKGxpa2UgZmxhZ3Mgd2F2aW5nIGluIHRoZSB3aW5kKSwgYW5kIGFueXRoaW5nIHRoYXQgaXNcbiAgICAgKiAgIG9jY2x1ZGVkIG9yIGhhcHBlbmluZyBmYXIgb2ZmIHNjcmVlbi5cbiAgICAgKiAtIElmIGRyYXcoKSBuZWVkcyB0byBpbnRlcnBvbGF0ZSBwaHlzaWNzIGJhc2VkIG9uIGFjdGl2aXR5IHRoYXQgb2NjdXJzXG4gICAgICogICBpbiBhIHdvcmtlciwgdGhlIHdvcmtlciBuZWVkcyB0byBwYXNzIHRoZSBpbnRlcnBvbGF0aW9uIHZhbHVlIGJhY2sgdG9cbiAgICAgKiAgIHRoZSBtYWluIHRocmVhZCBzbyB0aGF0IGlzIGlzIGF2YWlsYWJsZSB0byBkcmF3KCkuXG4gICAgICogLSBXZWIgV29ya2VycyBjYW4ndCBhY2Nlc3MgdGhlIHN0YXRlIG9mIHRoZSBtYWluIHRocmVhZCwgc28gdGhleSBjYW4ndFxuICAgICAqICAgZGlyZWN0bHkgbW9kaWZ5IG9iamVjdHMgaW4geW91ciBzY2VuZS4gTW92aW5nIGRhdGEgdG8gYW5kIGZyb20gV2ViXG4gICAgICogICBXb3JrZXJzIGlzIGEgcGFpbi4gVGhlIGZhc3Rlc3Qgd2F5IHRvIGRvIGl0IGlzIHdpdGggVHJhbnNmZXJhYmxlXG4gICAgICogICBPYmplY3RzOiBiYXNpY2FsbHksIHlvdSBjYW4gcGFzcyBhbiBBcnJheUJ1ZmZlciB0byBhIHdvcmtlcixcbiAgICAgKiAgIGRlc3Ryb3lpbmcgdGhlIG9yaWdpbmFsIHJlZmVyZW5jZSBpbiB0aGUgcHJvY2Vzcy5cbiAgICAgKlxuICAgICAqIFlvdSBjYW4gcmVhZCBtb3JlIGFib3V0IFdlYiBXb3JrZXJzIGFuZCBUcmFuc2ZlcmFibGUgT2JqZWN0cyBhdFxuICAgICAqIFtIVE1MNSBSb2Nrc10oaHR0cDovL3d3dy5odG1sNXJvY2tzLmNvbS9lbi90dXRvcmlhbHMvd29ya2Vycy9iYXNpY3MvKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHVwZGF0ZVxuICAgICAqICAgVGhlIHVwZGF0ZSgpIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbdXBkYXRlLmRlbHRhXVxuICAgICAqICAgVGhlIGFtb3VudCBvZiB0aW1lIGluIG1pbGxpc2Vjb25kcyB0byBzaW11bGF0ZSBpbiB0aGUgdXBkYXRlLiBJbiBtb3N0XG4gICAgICogICBjYXNlcyB0aGlzIHRpbWVzdGVwIG5ldmVyIGNoYW5nZXMgaW4gb3JkZXIgdG8gZW5zdXJlIGRldGVybWluaXN0aWNcbiAgICAgKiAgIHVwZGF0ZXMuIFRoZSB0aW1lc3RlcCBpcyB0aGUgc2FtZSBhcyB0aGF0IHJldHVybmVkIGJ5XG4gICAgICogICBgTWFpbkxvb3AuZ2V0U2ltdWxhdGlvblRpbWVzdGVwKClgLlxuICAgICAqL1xuICAgIHNldFVwZGF0ZTogZnVuY3Rpb24oZnVuKSB7XG4gICAgICAgIHVwZGF0ZSA9IGZ1biB8fCB1cGRhdGU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBmdW5jdGlvbiB0aGF0IGRyYXdzIHRoaW5ncyBvbiB0aGUgc2NyZWVuLlxuICAgICAqXG4gICAgICogVGhlIGRyYXcoKSBmdW5jdGlvbiBnZXRzIHBhc3NlZCB0aGUgcGVyY2VudCBvZiB0aW1lIHRoYXQgdGhlIG5leHQgcnVuIG9mXG4gICAgICoge0BsaW5rICNzZXRVcGRhdGUgdXBkYXRlfSgpIHdpbGwgc2ltdWxhdGUgdGhhdCBoYXMgYWN0dWFsbHkgZWxhcHNlZCwgYXNcbiAgICAgKiBhIGRlY2ltYWwuIEluIG90aGVyIHdvcmRzLCBkcmF3KCkgZ2V0cyBwYXNzZWQgaG93IGZhciBiZXR3ZWVuIHVwZGF0ZSgpXG4gICAgICogY2FsbHMgaXQgaXMuIFRoaXMgaXMgdXNlZnVsIGJlY2F1c2UgdGhlIHRpbWUgc2ltdWxhdGVkIGJ5IHVwZGF0ZSgpIGFuZFxuICAgICAqIHRoZSB0aW1lIGJldHdlZW4gZHJhdygpIGNhbGxzIGlzIHVzdWFsbHkgZGlmZmVyZW50LCBzbyB0aGUgcGFyYW1ldGVyIHRvXG4gICAgICogZHJhdygpIGNhbiBiZSB1c2VkIHRvIGludGVycG9sYXRlIG1vdGlvbiBiZXR3ZWVuIGZyYW1lcyB0byBtYWtlXG4gICAgICogcmVuZGVyaW5nIGFwcGVhciBzbW9vdGhlci4gVG8gaWxsdXN0cmF0ZSwgaWYgdXBkYXRlKCkgYWR2YW5jZXMgdGhlXG4gICAgICogc2ltdWxhdGlvbiBhdCBlYWNoIHZlcnRpY2FsIGJhciBpbiB0aGUgZmlyc3Qgcm93IGJlbG93LCBhbmQgZHJhdygpIGNhbGxzXG4gICAgICogaGFwcGVuIGF0IGVhY2ggdmVydGljYWwgYmFyIGluIHRoZSBzZWNvbmQgcm93IGJlbG93LCB0aGVuIHNvbWUgZnJhbWVzXG4gICAgICogd2lsbCBoYXZlIHRpbWUgbGVmdCBvdmVyIHRoYXQgaXMgbm90IHlldCBzaW11bGF0ZWQgYnkgdXBkYXRlKCkgd2hlblxuICAgICAqIHJlbmRlcmluZyBvY2N1cnMgaW4gZHJhdygpOlxuICAgICAqXG4gICAgICogICAgIHVwZGF0ZSgpIHRpbWVzdGVwczogIHwgIHwgIHwgIHwgIHwgIHwgIHwgIHwgIHxcbiAgICAgKiAgICAgZHJhdygpIGNhbGxzOiAgICAgICAgfCAgIHwgICB8ICAgfCAgIHwgICB8ICAgfFxuICAgICAqXG4gICAgICogVG8gaW50ZXJwb2xhdGUgbW90aW9uIGZvciByZW5kZXJpbmcgcHVycG9zZXMsIG9iamVjdHMnIHN0YXRlIGFmdGVyIHRoZVxuICAgICAqIGxhc3QgdXBkYXRlKCkgbXVzdCBiZSByZXRhaW5lZCBhbmQgdXNlZCB0byBjYWxjdWxhdGUgYW4gaW50ZXJtZWRpYXRlXG4gICAgICogc3RhdGUuIE5vdGUgdGhhdCB0aGlzIG1lYW5zIHJlbmRlcnMgd2lsbCBiZSB1cCB0byBvbmUgdXBkYXRlKCkgYmVoaW5kLlxuICAgICAqIFRoaXMgaXMgc3RpbGwgYmV0dGVyIHRoYW4gZXh0cmFwb2xhdGluZyAocHJvamVjdGluZyBvYmplY3RzJyBzdGF0ZSBhZnRlclxuICAgICAqIGEgZnV0dXJlIHVwZGF0ZSgpKSB3aGljaCBjYW4gcHJvZHVjZSBiaXphcnJlIHJlc3VsdHMuIFN0b3JpbmcgbXVsdGlwbGVcbiAgICAgKiBzdGF0ZXMgY2FuIGJlIGRpZmZpY3VsdCB0byBzZXQgdXAsIGFuZCBrZWVwIGluIG1pbmQgdGhhdCBydW5uaW5nIHRoaXNcbiAgICAgKiBwcm9jZXNzIHRha2VzIHRpbWUgdGhhdCBjb3VsZCBwdXNoIHRoZSBmcmFtZSByYXRlIGRvd24sIHNvIGl0J3Mgb2Z0ZW5cbiAgICAgKiBub3Qgd29ydGh3aGlsZSB1bmxlc3Mgc3R1dHRlcmluZyBpcyB2aXNpYmxlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZHJhd1xuICAgICAqICAgVGhlIGRyYXcoKSBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2RyYXcuaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2VdXG4gICAgICogICBUaGUgY3VtdWxhdGl2ZSBhbW91bnQgb2YgdGltZSB0aGF0IGhhc24ndCBiZWVuIHNpbXVsYXRlZCB5ZXQsIGRpdmlkZWRcbiAgICAgKiAgIGJ5IHRoZSBhbW91bnQgb2YgdGltZSB0aGF0IHdpbGwgYmUgc2ltdWxhdGVkIHRoZSBuZXh0IHRpbWUgdXBkYXRlKClcbiAgICAgKiAgIHJ1bnMuIFVzZWZ1bCBmb3IgaW50ZXJwb2xhdGluZyBmcmFtZXMuXG4gICAgICovXG4gICAgc2V0RHJhdzogZnVuY3Rpb24oZnVuKSB7XG4gICAgICAgIGRyYXcgPSBmdW4gfHwgZHJhdztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGZ1bmN0aW9uIHRoYXQgcnVucyBhdCB0aGUgZW5kIG9mIHRoZSBtYWluIGxvb3AuXG4gICAgICpcbiAgICAgKiBVbmxpa2Uge0BsaW5rICNzZXRVcGRhdGUgdXBkYXRlfSgpLCB3aGljaCBjYW4gcnVuIHplcm8gb3IgbW9yZSB0aW1lcyBwZXJcbiAgICAgKiBmcmFtZSwgZW5kKCkgYWx3YXlzIHJ1bnMgZXhhY3RseSBvbmNlIHBlciBmcmFtZS4gVGhpcyBtYWtlcyBpdCB1c2VmdWxcbiAgICAgKiBmb3IgYW55IHVwZGF0ZXMgdGhhdCBhcmUgbm90IGRlcGVuZGVudCBvbiB0aW1lIGluIHRoZSBzaW11bGF0aW9uLlxuICAgICAqIEV4YW1wbGVzIGluY2x1ZGUgY2xlYW5pbmcgdXAgYW55IHRlbXBvcmFyeSBzdGF0ZSBzZXQgdXAgYnlcbiAgICAgKiB7QGxpbmsgI3NldEJlZ2luIGJlZ2lufSgpLCBsb3dlcmluZyB0aGUgdmlzdWFsIHF1YWxpdHkgaWYgdGhlIGZyYW1lIHJhdGVcbiAgICAgKiBpcyB0b28gbG93LCBvciBwZXJmb3JtaW5nIGxvbmctcnVubmluZyB1cGRhdGVzIGluY3JlbWVudGFsbHkuIENvbXBhcmVkXG4gICAgICogdG8gYmVnaW4oKSwgZ2VuZXJhbGx5IGFjdGlvbnMgc2hvdWxkIG9jY3VyIGluIGVuZCgpIGlmIHRoZXkgdXNlIGFueXRoaW5nXG4gICAgICogdGhhdCB1cGRhdGUoKSBvciB7QGxpbmsgI3NldERyYXcgZHJhd30oKSBhZmZlY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBlbmRcbiAgICAgKiAgIFRoZSBlbmQoKSBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2VuZC5mcHNdXG4gICAgICogICBUaGUgZXhwb25lbnRpYWwgbW92aW5nIGF2ZXJhZ2Ugb2YgdGhlIGZyYW1lcyBwZXIgc2Vjb25kLiBUaGlzIGlzIHRoZVxuICAgICAqICAgc2FtZSB2YWx1ZSByZXR1cm5lZCBieSBgTWFpbkxvb3AuZ2V0RlBTKClgLiBJdCBjYW4gYmUgdXNlZCB0byB0YWtlXG4gICAgICogICBhY3Rpb24gd2hlbiB0aGUgRlBTIGlzIHRvbyBsb3cgKG9yIHRvIHJlc3RvcmUgdG8gbm9ybWFsY3kgaWYgdGhlIEZQU1xuICAgICAqICAgbW92ZXMgYmFjayB1cCkuIEV4YW1wbGVzIG9mIGFjdGlvbnMgdG8gdGFrZSBpZiB0aGUgRlBTIGlzIHRvbyBsb3dcbiAgICAgKiAgIGluY2x1ZGUgZXhpdGluZyB0aGUgYXBwbGljYXRpb24sIGxvd2VyaW5nIHRoZSB2aXN1YWwgcXVhbGl0eSwgc3RvcHBpbmdcbiAgICAgKiAgIG9yIHJlZHVjaW5nIGFjdGl2aXRpZXMgb3V0c2lkZSBvZiB0aGUgbWFpbiBsb29wIGxpa2UgZXZlbnQgaGFuZGxlcnMgb3JcbiAgICAgKiAgIGF1ZGlvIHBsYXliYWNrLCBwZXJmb3JtaW5nIG5vbi1jcml0aWNhbCB1cGRhdGVzIGxlc3MgZnJlcXVlbnRseSwgb3JcbiAgICAgKiAgIGluY3JlYXNpbmcgdGhlIHNpbXVsYXRpb24gdGltZXN0ZXAgKGJ5IGNhbGxpbmdcbiAgICAgKiAgIGBNYWluTG9vcC5zZXRTaW11bGF0aW9uVGltZXN0ZXAoKWApLiBOb3RlIHRoYXQgdGhpcyBsYXN0IG9wdGlvblxuICAgICAqICAgcmVzdWx0cyBpbiBtb3JlIHRpbWUgYmVpbmcgc2ltdWxhdGVkIHBlciB1cGRhdGUoKSBjYWxsLCB3aGljaCBjYXVzZXNcbiAgICAgKiAgIHRoZSBhcHBsaWNhdGlvbiB0byBiZWhhdmUgbm9uLWRldGVybWluaXN0aWNhbGx5LlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2VuZC5wYW5pYz1mYWxzZV1cbiAgICAgKiAgIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzaW11bGF0aW9uIGhhcyBmYWxsZW4gdG9vIGZhciBiZWhpbmQgcmVhbCB0aW1lLlxuICAgICAqICAgU3BlY2lmaWNhbGx5LCBgcGFuaWNgIHdpbGwgYmUgYHRydWVgIGlmIHRvbyBtYW55IHVwZGF0ZXMgb2NjdXJyZWQgaW5cbiAgICAgKiAgIG9uZSBmcmFtZS4gSW4gbmV0d29ya2VkIGxvY2tzdGVwIGFwcGxpY2F0aW9ucywgdGhlIGFwcGxpY2F0aW9uIHNob3VsZFxuICAgICAqICAgd2FpdCBmb3Igc29tZSBhbW91bnQgb2YgdGltZSB0byBzZWUgaWYgdGhlIHVzZXIgY2FuIGNhdGNoIHVwIGJlZm9yZVxuICAgICAqICAgZHJvcHBpbmcgdGhlIHVzZXIuIEluIG5ldHdvcmtlZCBidXQgbm9uLWxvY2tzdGVwIGFwcGxpY2F0aW9ucywgdGhpc1xuICAgICAqICAgdHlwaWNhbGx5IGluZGljYXRlcyB0aGF0IHRoZSB1c2VyIG5lZWRzIHRvIGJlIHNuYXBwZWQgb3IgZWFzZWQgdG8gdGhlXG4gICAgICogICBjdXJyZW50IGF1dGhvcml0YXRpdmUgc3RhdGUuIFdoZW4gdGhpcyBoYXBwZW5zLCBpdCBtYXkgYmUgY29udmVuaWVudFxuICAgICAqICAgdG8gY2FsbCBgTWFpbkxvb3AucmVzZXRGcmFtZURlbHRhKClgIHRvIGRpc2NhcmQgYWNjdW11bGF0ZWQgcGVuZGluZ1xuICAgICAqICAgdXBkYXRlcy4gSW4gbm9uLW5ldHdvcmtlZCBhcHBsaWNhdGlvbnMsIGl0IG1heSBiZSBhY2NlcHRhYmxlIHRvIGFsbG93XG4gICAgICogICB0aGUgYXBwbGljYXRpb24gdG8ga2VlcCBydW5uaW5nIGZvciBhd2hpbGUgdG8gc2VlIGlmIGl0IHdpbGwgY2F0Y2ggdXAuXG4gICAgICogICBIb3dldmVyLCB0aGlzIGNvdWxkIGFsc28gY2F1c2UgdGhlIGFwcGxpY2F0aW9uIHRvIGxvb2sgbGlrZSBpdCBpc1xuICAgICAqICAgcnVubmluZyB2ZXJ5IHF1aWNrbHkgZm9yIGEgZmV3IGZyYW1lcyBhcyBpdCB0cmFuc2l0aW9ucyB0aHJvdWdoIHRoZVxuICAgICAqICAgaW50ZXJtZWRpYXRlIHN0YXRlcy4gQW4gYWx0ZXJuYXRpdmUgdGhhdCBtYXkgYmUgYWNjZXB0YWJsZSBpcyB0b1xuICAgICAqICAgc2ltcGx5IGlnbm9yZSB0aGUgdW5zaW11bGF0ZWQgZWxhcHNlZCB0aW1lIGJ5IGNhbGxpbmdcbiAgICAgKiAgIGBNYWluTG9vcC5yZXNldEZyYW1lRGVsdGEoKWAgZXZlbiB0aG91Z2ggdGhpcyBpbnRyb2R1Y2VzXG4gICAgICogICBub24tZGV0ZXJtaW5pc3RpYyBiZWhhdmlvci4gSW4gYWxsIGNhc2VzLCBpZiB0aGUgYXBwbGljYXRpb24gcGFuaWNzXG4gICAgICogICBmcmVxdWVudGx5LCB0aGlzIGlzIGFuIGluZGljYXRpb24gdGhhdCB0aGUgbWFpbiBsb29wIGlzIHJ1bm5pbmcgdG9vXG4gICAgICogICBzbG93bHkuIEhvd2V2ZXIsIG1vc3Qgb2YgdGhlIHRpbWUgdGhlIGRyb3AgaW4gZnJhbWUgcmF0ZSB3aWxsIHByb2JhYmx5XG4gICAgICogICBiZSBub3RpY2VhYmxlIGJlZm9yZSBhIHBhbmljIG9jY3Vycy4gVG8gaGVscCB0aGUgYXBwbGljYXRpb24gY2F0Y2ggdXBcbiAgICAgKiAgIGFmdGVyIGEgcGFuaWMgY2F1c2VkIGJ5IGEgc3BpcmFsIG9mIGRlYXRoLCB0aGUgc2FtZSBzdGVwcyBjYW4gYmUgdGFrZW5cbiAgICAgKiAgIHRoYXQgYXJlIHN1Z2dlc3RlZCBhYm92ZSBpZiB0aGUgRlBTIGRyb3BzIHRvbyBsb3cuXG4gICAgICovXG4gICAgc2V0RW5kOiBmdW5jdGlvbihmdW4pIHtcbiAgICAgICAgZW5kID0gZnVuIHx8IGVuZDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyB0aGUgbWFpbiBsb29wLlxuICAgICAqXG4gICAgICogTm90ZSB0aGF0IHRoZSBhcHBsaWNhdGlvbiBpcyBub3QgY29uc2lkZXJlZCBcInJ1bm5pbmdcIiBpbW1lZGlhdGVseSBhZnRlclxuICAgICAqIHRoaXMgZnVuY3Rpb24gcmV0dXJuczsgcmF0aGVyLCBpdCBpcyBjb25zaWRlcmVkIFwicnVubmluZ1wiIGFmdGVyIHRoZVxuICAgICAqIGFwcGxpY2F0aW9uIGRyYXdzIGl0cyBmaXJzdCBmcmFtZS4gVGhlIGRpc3RpbmN0aW9uIGlzIHRoYXQgZXZlbnRcbiAgICAgKiBoYW5kbGVycyBzaG91bGQgcmVtYWluIHBhdXNlZCB1bnRpbCB0aGUgYXBwbGljYXRpb24gaXMgcnVubmluZywgZXZlblxuICAgICAqIGFmdGVyIGBNYWluTG9vcC5zdGFydCgpYCBpcyBjYWxsZWQuIENoZWNrIGBNYWluTG9vcC5pc1J1bm5pbmcoKWAgZm9yIHRoZVxuICAgICAqIGN1cnJlbnQgc3RhdHVzLiBUbyBhY3QgYWZ0ZXIgdGhlIGFwcGxpY2F0aW9uIHN0YXJ0cywgcmVnaXN0ZXIgYSBjYWxsYmFja1xuICAgICAqIHdpdGggcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCkgYWZ0ZXIgY2FsbGluZyB0aGlzIGZ1bmN0aW9uIGFuZCBleGVjdXRlIHRoZVxuICAgICAqIGFjdGlvbiBpbiB0aGF0IGNhbGxiYWNrLiBJdCBpcyBzYWZlIHRvIGNhbGwgYE1haW5Mb29wLnN0YXJ0KClgIG11bHRpcGxlXG4gICAgICogdGltZXMgZXZlbiBiZWZvcmUgdGhlIGFwcGxpY2F0aW9uIHN0YXJ0cyBydW5uaW5nIGFuZCB3aXRob3V0IGNhbGxpbmdcbiAgICAgKiBgTWFpbkxvb3Auc3RvcCgpYCBpbiBiZXR3ZWVuLCBhbHRob3VnaCB0aGVyZSBpcyBubyByZWFzb24gdG8gZG8gdGhpcztcbiAgICAgKiB0aGUgbWFpbiBsb29wIHdpbGwgb25seSBzdGFydCBpZiBpdCBpcyBub3QgYWxyZWFkeSBzdGFydGVkLlxuICAgICAqXG4gICAgICogU2VlIGFsc28gYE1haW5Mb29wLnN0b3AoKWAuXG4gICAgICovXG4gICAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBhcHBsaWNhdGlvbiBkb2Vzbid0IHN0YXJ0IHJ1bm5pbmcgaW1tZWRpYXRlbHksIHRyYWNrXG4gICAgICAgICAgICAvLyB3aGV0aGVyIHRoaXMgZnVuY3Rpb24gd2FzIGNhbGxlZCBhbmQgdXNlIHRoYXQgdG8ga2VlcCBpdCBmcm9tXG4gICAgICAgICAgICAvLyBzdGFydGluZyB0aGUgbWFpbiBsb29wIG11bHRpcGxlIHRpbWVzLlxuICAgICAgICAgICAgc3RhcnRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIEluIHRoZSBtYWluIGxvb3AsIGRyYXcoKSBpcyBjYWxsZWQgYWZ0ZXIgdXBkYXRlKCksIHNvIGlmIHdlXG4gICAgICAgICAgICAvLyBlbnRlcmVkIHRoZSBtYWluIGxvb3AgaW1tZWRpYXRlbHksIHdlIHdvdWxkIG5ldmVyIHJlbmRlciB0aGVcbiAgICAgICAgICAgIC8vIGluaXRpYWwgc3RhdGUgYmVmb3JlIGFueSB1cGRhdGVzIG9jY3VyLiBJbnN0ZWFkLCB3ZSBydW4gb25lXG4gICAgICAgICAgICAvLyBmcmFtZSB3aGVyZSBhbGwgd2UgZG8gaXMgZHJhdywgYW5kIHRoZW4gc3RhcnQgdGhlIG1haW4gbG9vcCB3aXRoXG4gICAgICAgICAgICAvLyB0aGUgbmV4dCBmcmFtZS5cbiAgICAgICAgICAgIHJhZkhhbmRsZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbih0aW1lc3RhbXApIHtcbiAgICAgICAgICAgICAgICAvLyBSZW5kZXIgdGhlIGluaXRpYWwgc3RhdGUgYmVmb3JlIGFueSB1cGRhdGVzIG9jY3VyLlxuICAgICAgICAgICAgICAgIGRyYXcoMSk7XG5cbiAgICAgICAgICAgICAgICAvLyBUaGUgYXBwbGljYXRpb24gaXNuJ3QgY29uc2lkZXJlZCBcInJ1bm5pbmdcIiB1bnRpbCB0aGVcbiAgICAgICAgICAgICAgICAvLyBhcHBsaWNhdGlvbiBzdGFydHMgZHJhd2luZy5cbiAgICAgICAgICAgICAgICBydW5uaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIC8vIFJlc2V0IHZhcmlhYmxlcyB0aGF0IGFyZSB1c2VkIGZvciB0cmFja2luZyB0aW1lIHNvIHRoYXQgd2VcbiAgICAgICAgICAgICAgICAvLyBkb24ndCBzaW11bGF0ZSB0aW1lIHBhc3NlZCB3aGlsZSB0aGUgYXBwbGljYXRpb24gd2FzIHBhdXNlZC5cbiAgICAgICAgICAgICAgICBsYXN0RnJhbWVUaW1lTXMgPSB0aW1lc3RhbXA7XG4gICAgICAgICAgICAgICAgbGFzdEZwc1VwZGF0ZSA9IHRpbWVzdGFtcDtcbiAgICAgICAgICAgICAgICBmcmFtZXNUaGlzU2Vjb25kID0gMDtcblxuICAgICAgICAgICAgICAgIC8vIFN0YXJ0IHRoZSBtYWluIGxvb3AuXG4gICAgICAgICAgICAgICAgcmFmSGFuZGxlID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0b3BzIHRoZSBtYWluIGxvb3AuXG4gICAgICpcbiAgICAgKiBFdmVudCBoYW5kbGluZyBhbmQgb3RoZXIgYmFja2dyb3VuZCB0YXNrcyBzaG91bGQgYWxzbyBiZSBwYXVzZWQgd2hlbiB0aGVcbiAgICAgKiBtYWluIGxvb3AgaXMgcGF1c2VkLlxuICAgICAqXG4gICAgICogTm90ZSB0aGF0IHBhdXNpbmcgaW4gbXVsdGlwbGF5ZXIvbXVsdGktdXNlciBhcHBsaWNhdGlvbnMgd2lsbCBjYXVzZSB0aGVcbiAgICAgKiBwbGF5ZXIncy91c2VyJ3MgY2xpZW50IHRvIGJlY29tZSBvdXQgb2Ygc3luYy4gSW4gdGhpcyBjYXNlIHRoZVxuICAgICAqIHNpbXVsYXRpb24gc2hvdWxkIGV4aXQsIG9yIHRoZSBwbGF5ZXIvdXNlciBuZWVkcyB0byBiZSBzbmFwcGVkIHRvIHRoZWlyXG4gICAgICogdXBkYXRlZCBwb3NpdGlvbiB3aGVuIHRoZSBtYWluIGxvb3AgaXMgc3RhcnRlZCBhZ2Fpbi5cbiAgICAgKlxuICAgICAqIFNlZSBhbHNvIGBNYWluTG9vcC5zdGFydCgpYCBhbmQgYE1haW5Mb29wLmlzUnVubmluZygpYC5cbiAgICAgKi9cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgICAgICBzdGFydGVkID0gZmFsc2U7XG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJhZkhhbmRsZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgdGhlIG1haW4gbG9vcCBpcyBjdXJyZW50bHkgcnVubmluZy5cbiAgICAgKlxuICAgICAqIFNlZSBhbHNvIGBNYWluTG9vcC5zdGFydCgpYCBhbmQgYE1haW5Mb29wLnN0b3AoKWAuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqICAgV2hldGhlciB0aGUgbWFpbiBsb29wIGlzIGN1cnJlbnRseSBydW5uaW5nLlxuICAgICAqL1xuICAgIGlzUnVubmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBydW5uaW5nO1xuICAgIH0sXG59O1xuXG4vKipcbiAqIFRoZSBtYWluIGxvb3AgdGhhdCBydW5zIHVwZGF0ZXMgYW5kIHJlbmRlcmluZy5cbiAqXG4gKiBAcGFyYW0ge0RPTUhpZ2hSZXNUaW1lU3RhbXB9IHRpbWVzdGFtcFxuICogICBUaGUgY3VycmVudCB0aW1lc3RhbXAuIEluIHByYWN0aWNlIHRoaXMgaXMgc3VwcGxpZWQgYnlcbiAqICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGF0IHRoZSB0aW1lIHRoYXQgaXQgc3RhcnRzIHRvIGZpcmUgY2FsbGJhY2tzLiBUaGlzXG4gKiAgIHNob3VsZCBvbmx5IGJlIHVzZWQgZm9yIGNvbXBhcmlzb24gdG8gb3RoZXIgdGltZXN0YW1wcyBiZWNhdXNlIHRoZSBlcG9jaFxuICogICAoaS5lLiB0aGUgXCJ6ZXJvXCIgdGltZSkgZGVwZW5kcyBvbiB0aGUgZW5naW5lIHJ1bm5pbmcgdGhpcyBjb2RlLiBJbiBlbmdpbmVzXG4gKiAgIHRoYXQgc3VwcG9ydCBgRE9NSGlnaFJlc1RpbWVTdGFtcGAgKGFsbCBtb2Rlcm4gYnJvd3NlcnMgZXhjZXB0IGlPUyBTYWZhcmlcbiAqICAgOCkgdGhlIGVwb2NoIGlzIHRoZSB0aW1lIHRoZSBwYWdlIHN0YXJ0ZWQgbG9hZGluZywgc3BlY2lmaWNhbGx5XG4gKiAgIGBwZXJmb3JtYW5jZS50aW1pbmcubmF2aWdhdGlvblN0YXJ0YC4gRXZlcnl3aGVyZSBlbHNlLCBpbmNsdWRpbmcgbm9kZS5qcyxcbiAqICAgdGhlIGVwb2NoIGlzIHRoZSBVbml4IGVwb2NoICgxOTcwLTAxLTAxVDAwOjAwOjAwWikuXG4gKlxuICogQGlnbm9yZVxuICovXG5mdW5jdGlvbiBhbmltYXRlKHRpbWVzdGFtcCkge1xuICAgIC8vIFRocm90dGxlIHRoZSBmcmFtZSByYXRlIChpZiBtaW5GcmFtZURlbGF5IGlzIHNldCB0byBhIG5vbi16ZXJvIHZhbHVlIGJ5XG4gICAgLy8gYE1haW5Mb29wLnNldE1heEFsbG93ZWRGUFMoKWApLlxuICAgIGlmICh0aW1lc3RhbXAgPCBsYXN0RnJhbWVUaW1lTXMgKyBtaW5GcmFtZURlbGF5KSB7XG4gICAgICAgIC8vIFJ1biB0aGUgbG9vcCBhZ2FpbiB0aGUgbmV4dCB0aW1lIHRoZSBicm93c2VyIGlzIHJlYWR5IHRvIHJlbmRlci5cbiAgICAgICAgcmFmSGFuZGxlID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZnJhbWVEZWx0YSBpcyB0aGUgY3VtdWxhdGl2ZSBhbW91bnQgb2YgaW4tYXBwIHRpbWUgdGhhdCBoYXNuJ3QgYmVlblxuICAgIC8vIHNpbXVsYXRlZCB5ZXQuIEFkZCB0aGUgdGltZSBzaW5jZSB0aGUgbGFzdCBmcmFtZS4gV2UgbmVlZCB0byB0cmFjayB0b3RhbFxuICAgIC8vIG5vdC15ZXQtc2ltdWxhdGVkIHRpbWUgKGFzIG9wcG9zZWQgdG8ganVzdCB0aGUgdGltZSBlbGFwc2VkIHNpbmNlIHRoZVxuICAgIC8vIGxhc3QgZnJhbWUpIGJlY2F1c2Ugbm90IGFsbCBhY3R1YWxseSBlbGFwc2VkIHRpbWUgaXMgZ3VhcmFudGVlZCB0byBiZVxuICAgIC8vIHNpbXVsYXRlZCBlYWNoIGZyYW1lLiBTZWUgdGhlIGNvbW1lbnRzIGJlbG93IGZvciBkZXRhaWxzLlxuICAgIGZyYW1lRGVsdGEgKz0gdGltZXN0YW1wIC0gbGFzdEZyYW1lVGltZU1zO1xuICAgIGxhc3RGcmFtZVRpbWVNcyA9IHRpbWVzdGFtcDtcblxuICAgIC8vIFJ1biBhbnkgdXBkYXRlcyB0aGF0IGFyZSBub3QgZGVwZW5kZW50IG9uIHRpbWUgaW4gdGhlIHNpbXVsYXRpb24uIFNlZVxuICAgIC8vIGBNYWluTG9vcC5zZXRCZWdpbigpYCBmb3IgYWRkaXRpb25hbCBkZXRhaWxzIG9uIGhvdyB0byB1c2UgdGhpcy5cbiAgICBiZWdpbih0aW1lc3RhbXAsIGZyYW1lRGVsdGEpO1xuXG4gICAgLy8gVXBkYXRlIHRoZSBlc3RpbWF0ZSBvZiB0aGUgZnJhbWUgcmF0ZSwgYGZwc2AuIEV2ZXJ5IHNlY29uZCwgdGhlIG51bWJlclxuICAgIC8vIG9mIGZyYW1lcyB0aGF0IG9jY3VycmVkIGluIHRoYXQgc2Vjb25kIGFyZSBpbmNsdWRlZCBpbiBhbiBleHBvbmVudGlhbFxuICAgIC8vIG1vdmluZyBhdmVyYWdlIG9mIGFsbCBmcmFtZXMgcGVyIHNlY29uZCwgd2l0aCBhbiBhbHBoYSBvZiAwLjI1LiBUaGlzXG4gICAgLy8gbWVhbnMgdGhhdCBtb3JlIHJlY2VudCBzZWNvbmRzIGFmZmVjdCB0aGUgZXN0aW1hdGVkIGZyYW1lIHJhdGUgbW9yZSB0aGFuXG4gICAgLy8gb2xkZXIgc2Vjb25kcy5cbiAgICBpZiAodGltZXN0YW1wID4gbGFzdEZwc1VwZGF0ZSArIDEwMDApIHtcbiAgICAgICAgLy8gQ29tcHV0ZSB0aGUgbmV3IGV4cG9uZW50aWFsIG1vdmluZyBhdmVyYWdlIHdpdGggYW4gYWxwaGEgb2YgMC4yNS5cbiAgICAgICAgLy8gVXNpbmcgY29uc3RhbnRzIGlubGluZSBpcyBva2F5IGhlcmUuXG4gICAgICAgIGZwcyA9IDAuMjUgKiBmcmFtZXNUaGlzU2Vjb25kICsgMC43NSAqIGZwcztcblxuICAgICAgICBsYXN0RnBzVXBkYXRlID0gdGltZXN0YW1wO1xuICAgICAgICBmcmFtZXNUaGlzU2Vjb25kID0gMDtcbiAgICB9XG4gICAgZnJhbWVzVGhpc1NlY29uZCsrO1xuXG4gICAgLypcbiAgICAgKiBBIG5haXZlIHdheSB0byBtb3ZlIGFuIG9iamVjdCBhbG9uZyBpdHMgWC1heGlzIG1pZ2h0IGJlIHRvIHdyaXRlIGEgbWFpblxuICAgICAqIGxvb3AgY29udGFpbmluZyB0aGUgc3RhdGVtZW50IGBvYmoueCArPSAxMDtgIHdoaWNoIHdvdWxkIG1vdmUgdGhlIG9iamVjdFxuICAgICAqIDEwIHVuaXRzIHBlciBmcmFtZS4gVGhpcyBhcHByb2FjaCBzdWZmZXJzIGZyb20gdGhlIGlzc3VlIHRoYXQgaXQgaXNcbiAgICAgKiBkZXBlbmRlbnQgb24gdGhlIGZyYW1lIHJhdGUuIEluIG90aGVyIHdvcmRzLCBpZiB5b3VyIGFwcGxpY2F0aW9uIGlzXG4gICAgICogcnVubmluZyBzbG93bHkgKHRoYXQgaXMsIGZld2VyIGZyYW1lcyBwZXIgc2Vjb25kKSwgeW91ciBvYmplY3Qgd2lsbCBhbHNvXG4gICAgICogYXBwZWFyIHRvIG1vdmUgc2xvd2x5LCB3aGVyZWFzIGlmIHlvdXIgYXBwbGljYXRpb24gaXMgcnVubmluZyBxdWlja2x5XG4gICAgICogKHRoYXQgaXMsIG1vcmUgZnJhbWVzIHBlciBzZWNvbmQpLCB5b3VyIG9iamVjdCB3aWxsIGFwcGVhciB0byBtb3ZlXG4gICAgICogcXVpY2tseS4gVGhpcyBpcyB1bmRlc2lyYWJsZSwgZXNwZWNpYWxseSBpbiBtdWx0aXBsYXllci9tdWx0aS11c2VyXG4gICAgICogYXBwbGljYXRpb25zLlxuICAgICAqXG4gICAgICogT25lIHNvbHV0aW9uIGlzIHRvIG11bHRpcGx5IHRoZSBzcGVlZCBieSB0aGUgYW1vdW50IG9mIHRpbWUgdGhhdCBoYXNcbiAgICAgKiBwYXNzZWQgYmV0d2VlbiByZW5kZXJpbmcgZnJhbWVzLiBGb3IgZXhhbXBsZSwgaWYgeW91IHdhbnQgeW91ciBvYmplY3QgdG9cbiAgICAgKiBtb3ZlIDYwMCB1bml0cyBwZXIgc2Vjb25kLCB5b3UgbWlnaHQgd3JpdGUgYG9iai54ICs9IDYwMCAqIGRlbHRhYCwgd2hlcmVcbiAgICAgKiBgZGVsdGFgIGlzIHRoZSB0aW1lIHBhc3NlZCBzaW5jZSB0aGUgbGFzdCBmcmFtZS4gKEZvciBjb252ZW5pZW5jZSwgbGV0J3NcbiAgICAgKiBtb3ZlIHRoaXMgc3RhdGVtZW50IHRvIGFuIHVwZGF0ZSgpIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYGRlbHRhYCBhcyBhXG4gICAgICogcGFyYW1ldGVyLikgVGhpcyB3YXksIHlvdXIgb2JqZWN0IHdpbGwgbW92ZSBhIGNvbnN0YW50IGRpc3RhbmNlIG92ZXJcbiAgICAgKiB0aW1lLiBIb3dldmVyLCBhdCBsb3cgZnJhbWUgcmF0ZXMgYW5kIGhpZ2ggc3BlZWRzLCB5b3VyIG9iamVjdCB3aWxsIG1vdmVcbiAgICAgKiBsYXJnZSBkaXN0YW5jZXMgZXZlcnkgZnJhbWUsIHdoaWNoIGNhbiBjYXVzZSBpdCB0byBkbyBzdHJhbmdlIHRoaW5nc1xuICAgICAqIHN1Y2ggYXMgbW92ZSB0aHJvdWdoIHdhbGxzLiBBZGRpdGlvbmFsbHksIHdlIHdvdWxkIGxpa2Ugb3VyIHByb2dyYW0gdG9cbiAgICAgKiBiZSBkZXRlcm1pbmlzdGljLiBUaGF0IGlzLCBldmVyeSB0aW1lIHdlIHJ1biB0aGUgYXBwbGljYXRpb24gd2l0aCB0aGVcbiAgICAgKiBzYW1lIGlucHV0LCB3ZSB3b3VsZCBsaWtlIGV4YWN0bHkgdGhlIHNhbWUgb3V0cHV0LiBJZiB0aGUgdGltZSBiZXR3ZWVuXG4gICAgICogZnJhbWVzICh0aGUgYGRlbHRhYCkgdmFyaWVzLCBvdXIgb3V0cHV0IHdpbGwgZGl2ZXJnZSB0aGUgbG9uZ2VyIHRoZVxuICAgICAqIHByb2dyYW0gcnVucyBkdWUgdG8gYWNjdW11bGF0ZWQgcm91bmRpbmcgZXJyb3JzLCBldmVuIGF0IG5vcm1hbCBmcmFtZVxuICAgICAqIHJhdGVzLlxuICAgICAqXG4gICAgICogQSBiZXR0ZXIgc29sdXRpb24gaXMgdG8gc2VwYXJhdGUgdGhlIGFtb3VudCBvZiB0aW1lIHNpbXVsYXRlZCBpbiBlYWNoXG4gICAgICogdXBkYXRlKCkgZnJvbSB0aGUgYW1vdW50IG9mIHRpbWUgYmV0d2VlbiBmcmFtZXMuIE91ciB1cGRhdGUoKSBmdW5jdGlvblxuICAgICAqIGRvZXNuJ3QgbmVlZCB0byBjaGFuZ2U7IHdlIGp1c3QgbmVlZCB0byBjaGFuZ2UgdGhlIGRlbHRhIHdlIHBhc3MgdG8gaXRcbiAgICAgKiBzbyB0aGF0IGVhY2ggdXBkYXRlKCkgc2ltdWxhdGVzIGEgZml4ZWQgYW1vdW50IG9mIHRpbWUgKHRoYXQgaXMsIGBkZWx0YWBcbiAgICAgKiBzaG91bGQgaGF2ZSB0aGUgc2FtZSB2YWx1ZSBlYWNoIHRpbWUgdXBkYXRlKCkgaXMgY2FsbGVkKS4gVGhlIHVwZGF0ZSgpXG4gICAgICogZnVuY3Rpb24gY2FuIGJlIHJ1biBtdWx0aXBsZSB0aW1lcyBwZXIgZnJhbWUgaWYgbmVlZGVkIHRvIHNpbXVsYXRlIHRoZVxuICAgICAqIHRvdGFsIGFtb3VudCBvZiB0aW1lIHBhc3NlZCBzaW5jZSB0aGUgbGFzdCBmcmFtZS4gKElmIHRoZSB0aW1lIHRoYXQgaGFzXG4gICAgICogcGFzc2VkIHNpbmNlIHRoZSBsYXN0IGZyYW1lIGlzIGxlc3MgdGhhbiB0aGUgZml4ZWQgc2ltdWxhdGlvbiB0aW1lLCB3ZVxuICAgICAqIGp1c3Qgd29uJ3QgcnVuIGFuIHVwZGF0ZSgpIHVudGlsIHRoZSB0aGUgbmV4dCBmcmFtZS4gSWYgdGhlcmUgaXNcbiAgICAgKiB1bnNpbXVsYXRlZCB0aW1lIGxlZnQgb3ZlciB0aGF0IGlzIGxlc3MgdGhhbiBvdXIgdGltZXN0ZXAsIHdlJ2xsIGp1c3RcbiAgICAgKiBsZWF2ZSBpdCB0byBiZSBzaW11bGF0ZWQgZHVyaW5nIHRoZSBuZXh0IGZyYW1lLikgVGhpcyBhcHByb2FjaCBhdm9pZHNcbiAgICAgKiBpbmNvbnNpc3RlbnQgcm91bmRpbmcgZXJyb3JzIGFuZCBlbnN1cmVzIHRoYXQgdGhlcmUgYXJlIG5vIGdpYW50IGxlYXBzXG4gICAgICogdGhyb3VnaCB3YWxscyBiZXR3ZWVuIGZyYW1lcy5cbiAgICAgKlxuICAgICAqIFRoYXQgaXMgd2hhdCBpcyBkb25lIGJlbG93LiBJdCBpbnRyb2R1Y2VzIGEgbmV3IHByb2JsZW0sIGJ1dCBpdCBpcyBhXG4gICAgICogbWFuYWdlYWJsZSBvbmU6IGlmIHRoZSBhbW91bnQgb2YgdGltZSBzcGVudCBzaW11bGF0aW5nIGlzIGNvbnNpc3RlbnRseVxuICAgICAqIGxvbmdlciB0aGFuIHRoZSBhbW91bnQgb2YgdGltZSBiZXR3ZWVuIGZyYW1lcywgdGhlIGFwcGxpY2F0aW9uIGNvdWxkXG4gICAgICogZnJlZXplIGFuZCBjcmFzaCBpbiBhIHNwaXJhbCBvZiBkZWF0aC4gVGhpcyB3b24ndCBoYXBwZW4gYXMgbG9uZyBhcyB0aGVcbiAgICAgKiBmaXhlZCBzaW11bGF0aW9uIHRpbWUgaXMgc2V0IHRvIGEgdmFsdWUgdGhhdCBpcyBoaWdoIGVub3VnaCB0aGF0XG4gICAgICogdXBkYXRlKCkgY2FsbHMgdXN1YWxseSB0YWtlIGxlc3MgdGltZSB0aGFuIHRoZSBhbW91bnQgb2YgdGltZSB0aGV5J3JlXG4gICAgICogc2ltdWxhdGluZy4gSWYgaXQgZG9lcyBzdGFydCB0byBoYXBwZW4gYW55d2F5LCBzZWUgYE1haW5Mb29wLnNldEVuZCgpYFxuICAgICAqIGZvciBhIGRpc2N1c3Npb24gb2Ygd2F5cyB0byBzdG9wIGl0LlxuICAgICAqXG4gICAgICogQWRkaXRpb25hbGx5LCBzZWUgYE1haW5Mb29wLnNldFVwZGF0ZSgpYCBmb3IgYSBkaXNjdXNzaW9uIG9mIHBlcmZvcm1hbmNlXG4gICAgICogY29uc2lkZXJhdGlvbnMuXG4gICAgICpcbiAgICAgKiBGdXJ0aGVyIHJlYWRpbmcgZm9yIHRob3NlIGludGVyZXN0ZWQ6XG4gICAgICpcbiAgICAgKiAtIGh0dHA6Ly9nYW1lcHJvZ3JhbW1pbmdwYXR0ZXJucy5jb20vZ2FtZS1sb29wLmh0bWxcbiAgICAgKiAtIGh0dHA6Ly9nYWZmZXJvbmdhbWVzLmNvbS9nYW1lLXBoeXNpY3MvZml4LXlvdXItdGltZXN0ZXAvXG4gICAgICogLSBodHRwczovL2dhbWVhbGNoZW1pc3Qud29yZHByZXNzLmNvbS8yMDEzLzAzLzE2L3Rob3VnaHRzLW9uLXRoZS1qYXZhc2NyaXB0LWdhbWUtbG9vcC9cbiAgICAgKiAtIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvR2FtZXMvQW5hdG9teVxuICAgICAqL1xuICAgIG51bVVwZGF0ZVN0ZXBzID0gMDtcbiAgICB3aGlsZSAoZnJhbWVEZWx0YSA+PSBzaW11bGF0aW9uVGltZXN0ZXApIHtcbiAgICAgICAgdXBkYXRlKHNpbXVsYXRpb25UaW1lc3RlcCk7XG4gICAgICAgIGZyYW1lRGVsdGEgLT0gc2ltdWxhdGlvblRpbWVzdGVwO1xuXG4gICAgICAgIC8qXG4gICAgICAgICAqIFNhbml0eSBjaGVjazogYmFpbCBpZiB3ZSBydW4gdGhlIGxvb3AgdG9vIG1hbnkgdGltZXMuXG4gICAgICAgICAqXG4gICAgICAgICAqIE9uZSB3YXkgdGhpcyBjb3VsZCBoYXBwZW4gaXMgaWYgdXBkYXRlKCkgdGFrZXMgbG9uZ2VyIHRvIHJ1biB0aGFuXG4gICAgICAgICAqIHRoZSB0aW1lIGl0IHNpbXVsYXRlcywgdGhlcmVieSBjYXVzaW5nIGEgc3BpcmFsIG9mIGRlYXRoLiBGb3Igd2F5c1xuICAgICAgICAgKiB0byBhdm9pZCB0aGlzLCBzZWUgYE1haW5Mb29wLnNldEVuZCgpYC4gQW5vdGhlciB3YXkgdGhpcyBjb3VsZFxuICAgICAgICAgKiBoYXBwZW4gaXMgaWYgdGhlIGJyb3dzZXIgdGhyb3R0bGVzIHNlcnZpbmcgZnJhbWVzLCB3aGljaCB0eXBpY2FsbHlcbiAgICAgICAgICogb2NjdXJzIHdoZW4gdGhlIHRhYiBpcyBpbiB0aGUgYmFja2dyb3VuZCBvciB0aGUgZGV2aWNlIGJhdHRlcnkgaXNcbiAgICAgICAgICogbG93LiBBbiBldmVudCBvdXRzaWRlIG9mIHRoZSBtYWluIGxvb3Agc3VjaCBhcyBhdWRpbyBwcm9jZXNzaW5nIG9yXG4gICAgICAgICAqIHN5bmNocm9ub3VzIHJlc291cmNlIHJlYWRzIGNvdWxkIGFsc28gY2F1c2UgdGhlIGFwcGxpY2F0aW9uIHRvIGhhbmdcbiAgICAgICAgICogdGVtcG9yYXJpbHkgYW5kIGFjY3VtdWxhdGUgbm90LXlldC1zaW11bGF0ZWQgdGltZSBhcyBhIHJlc3VsdC5cbiAgICAgICAgICpcbiAgICAgICAgICogMjQwIGlzIGNob3NlbiBiZWNhdXNlLCBmb3IgYW55IHNhbmUgdmFsdWUgb2Ygc2ltdWxhdGlvblRpbWVzdGVwLCAyNDBcbiAgICAgICAgICogdXBkYXRlcyB3aWxsIHNpbXVsYXRlIGF0IGxlYXN0IG9uZSBzZWNvbmQsIGFuZCBpdCB3aWxsIHNpbXVsYXRlIGZvdXJcbiAgICAgICAgICogc2Vjb25kcyB3aXRoIHRoZSBkZWZhdWx0IHZhbHVlIG9mIHNpbXVsYXRpb25UaW1lc3RlcC4gKFNhZmFyaVxuICAgICAgICAgKiBub3RpZmllcyB1c2VycyB0aGF0IHRoZSBzY3JpcHQgaXMgdGFraW5nIHRvbyBsb25nIHRvIHJ1biBpZiBpdCB0YWtlc1xuICAgICAgICAgKiBtb3JlIHRoYW4gZml2ZSBzZWNvbmRzLilcbiAgICAgICAgICpcbiAgICAgICAgICogSWYgdGhlcmUgYXJlIG1vcmUgdXBkYXRlcyB0byBydW4gaW4gYSBmcmFtZSB0aGFuIHRoaXMsIHRoZVxuICAgICAgICAgKiBhcHBsaWNhdGlvbiB3aWxsIGFwcGVhciB0byBzbG93IGRvd24gdG8gdGhlIHVzZXIgdW50aWwgaXQgY2F0Y2hlc1xuICAgICAgICAgKiBiYWNrIHVwLiBJbiBuZXR3b3JrZWQgYXBwbGljYXRpb25zIHRoaXMgd2lsbCB1c3VhbGx5IGNhdXNlIHRoZSB1c2VyXG4gICAgICAgICAqIHRvIGdldCBvdXQgb2Ygc3luYyB3aXRoIHRoZWlyIHBlZXJzLCBidXQgaWYgdGhlIHVwZGF0ZXMgYXJlIHRha2luZ1xuICAgICAgICAgKiB0aGlzIGxvbmcgYWxyZWFkeSwgdGhleSdyZSBwcm9iYWJseSBhbHJlYWR5IG91dCBvZiBzeW5jLlxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKCsrbnVtVXBkYXRlU3RlcHMgPj0gMjQwKSB7XG4gICAgICAgICAgICBwYW5pYyA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgICogUmVuZGVyIHRoZSBzY3JlZW4uIFdlIGRvIHRoaXMgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHVwZGF0ZSgpIGhhcyBydW5cbiAgICAgKiBkdXJpbmcgdGhpcyBmcmFtZSBiZWNhdXNlIGl0IGlzIHBvc3NpYmxlIHRvIGludGVycG9sYXRlIGJldHdlZW4gdXBkYXRlc1xuICAgICAqIHRvIG1ha2UgdGhlIGZyYW1lIHJhdGUgYXBwZWFyIGZhc3RlciB0aGFuIHVwZGF0ZXMgYXJlIGFjdHVhbGx5XG4gICAgICogaGFwcGVuaW5nLiBTZWUgYE1haW5Mb29wLnNldERyYXcoKWAgZm9yIGFuIGV4cGxhbmF0aW9uIG9mIGhvdyB0byBkb1xuICAgICAqIHRoYXQuXG4gICAgICpcbiAgICAgKiBXZSBkcmF3IGFmdGVyIHVwZGF0aW5nIGJlY2F1c2Ugd2Ugd2FudCB0aGUgc2NyZWVuIHRvIHJlZmxlY3QgYSBzdGF0ZSBvZlxuICAgICAqIHRoZSBhcHBsaWNhdGlvbiB0aGF0IGlzIGFzIHVwLXRvLWRhdGUgYXMgcG9zc2libGUuIChgTWFpbkxvb3Auc3RhcnQoKWBcbiAgICAgKiBkcmF3cyB0aGUgdmVyeSBmaXJzdCBmcmFtZSBpbiB0aGUgYXBwbGljYXRpb24ncyBpbml0aWFsIHN0YXRlLCBiZWZvcmVcbiAgICAgKiBhbnkgdXBkYXRlcyBoYXZlIG9jY3VycmVkLikgU29tZSBzb3VyY2VzIHNwZWN1bGF0ZSB0aGF0IHJlbmRlcmluZ1xuICAgICAqIGVhcmxpZXIgaW4gdGhlIHJlcXVlc3RBbmltYXRpb25GcmFtZSBjYWxsYmFjayBjYW4gZ2V0IHRoZSBzY3JlZW4gcGFpbnRlZFxuICAgICAqIGZhc3RlcjsgdGhpcyBpcyBtb3N0bHkgbm90IHRydWUsIGFuZCBldmVuIHdoZW4gaXQgaXMsIGl0J3MgdXN1YWxseSBqdXN0XG4gICAgICogYSB0cmFkZS1vZmYgYmV0d2VlbiByZW5kZXJpbmcgdGhlIGN1cnJlbnQgZnJhbWUgc29vbmVyIGFuZCByZW5kZXJpbmcgdGhlXG4gICAgICogbmV4dCBmcmFtZSBsYXRlci5cbiAgICAgKlxuICAgICAqIFNlZSBgTWFpbkxvb3Auc2V0RHJhdygpYCBmb3IgZGV0YWlscyBhYm91dCBkcmF3KCkgaXRzZWxmLlxuICAgICAqL1xuICAgIGRyYXcoZnJhbWVEZWx0YSAvIHNpbXVsYXRpb25UaW1lc3RlcCk7XG5cbiAgICAvLyBSdW4gYW55IHVwZGF0ZXMgdGhhdCBhcmUgbm90IGRlcGVuZGVudCBvbiB0aW1lIGluIHRoZSBzaW11bGF0aW9uLiBTZWVcbiAgICAvLyBgTWFpbkxvb3Auc2V0RW5kKClgIGZvciBhZGRpdGlvbmFsIGRldGFpbHMgb24gaG93IHRvIHVzZSB0aGlzLlxuICAgIGVuZChmcHMsIHBhbmljKTtcblxuICAgIHBhbmljID0gZmFsc2U7XG5cbiAgICAvLyBSdW4gdGhlIGxvb3AgYWdhaW4gdGhlIG5leHQgdGltZSB0aGUgYnJvd3NlciBpcyByZWFkeSB0byByZW5kZXIuXG4gICAgcmFmSGFuZGxlID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xufVxuXG4vLyBBTUQgc3VwcG9ydFxuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShyb290Lk1haW5Mb29wKTtcbn1cbi8vIENvbW1vbkpTIHN1cHBvcnRcbmVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gcm9vdC5NYWluTG9vcDtcbn1cblxufSkoKTtcbiIsIi8qIEBmbG93ICovXG5cbmltcG9ydCBNYWluTG9vcCBmcm9tICcuLi9leHRlcm5hbC9tYWlubG9vcC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5Mb29wTG9vcE1hbmFnZXIge1xuICAgIHNldFVwZGF0ZSh1cGRhdGVNZXRob2QgOiAoZGVsdGEgOiBudW1iZXIpID0+IHZvaWQpIDogTWFpbkxvb3BMb29wTWFuYWdlciB7XG4gICAgICAgIE1haW5Mb29wLnNldFVwZGF0ZSh1cGRhdGVNZXRob2QpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIHNldFJlbmRlcihyZW5kZXJNZXRob2QgOiAoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UgOiBudW1iZXIpID0+IHZvaWQpIDogTWFpbkxvb3BMb29wTWFuYWdlciB7XG4gICAgICAgIE1haW5Mb29wLnNldERyYXcocmVuZGVyTWV0aG9kKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICBzdGFydCgpIDogdm9pZCB7XG4gICAgICAgIE1haW5Mb29wLnN0YXJ0KCk7XG4gICAgfVxufSIsIi8qIEBmbG93Ki9cblxuaW1wb3J0IHsgRW50aXR5TWFuYWdlciB9IGZyb20gJ2dnLWVudGl0aWVzJztcblxuaW1wb3J0IFRocmVlUmVuZGVyZXJNYW5hZ2VyICAgZnJvbSAnLi4vdmlldy90aHJlZS1yZW5kZXJlci1tYW5hZ2VyJztcbmltcG9ydCBTdGF0c1BlcmZvcm1hbmNlVmlld2VyIGZyb20gJy4uL3ZpZXcvc3RhdHMtcGVyZm9ybWFuY2Utdmlld2VyJztcblxuaW1wb3J0IFRocmVlU2NlbmVNYW5hZ2VyICAgICBmcm9tICcuLi9sb2dpYy90aHJlZS1zY2VuZS1tYW5hZ2VyJztcbmltcG9ydCBUaHJlZU1lc2hNYW5hZ2VyICAgICAgZnJvbSAnLi4vbG9naWMvdGhyZWUtbWVzaC1tYW5hZ2VyJztcbmltcG9ydCBUaHJlZU9iamVjdE1lc2hMb2FkZXIgZnJvbSAnLi4vbG9naWMvdGhyZWUtb2JqZWN0LW1lc2gtbG9hZGVyJztcbmltcG9ydCBRV2VzdEFqYXhMb2FkZXIgICAgICAgZnJvbSAnLi4vbG9naWMvcXdlc3QtYWpheC1sb2FkZXInO1xuaW1wb3J0IExldmVsTG9hZGVyICAgICAgICAgICBmcm9tICcuLi9sb2dpYy9sZXZlbC1sb2FkZXInO1xuaW1wb3J0IE1haW5Mb29wTG9vcE1hbmFnZXIgICBmcm9tICcuLi9sb2dpYy9tYWlubG9vcC1sb29wLW1hbmFnZXInO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcmVuZGVyZXJNYW5hZ2VyKCkgOiBJUmVuZGVyZXJNYW5hZ2VyIHsgcmV0dXJuIG5ldyBUaHJlZVJlbmRlcmVyTWFuYWdlcigpOyB9LFxuXG4gICAgc2NlbmVNYW5hZ2VyKCkgOiBJU2NlbmVNYW5hZ2VyIHsgcmV0dXJuIG5ldyBUaHJlZVNjZW5lTWFuYWdlcigpOyB9LFxuICAgIFxuICAgIG1lc2hNYW5hZ2VyKCkgOiBJTWVzaE1hbmFnZXIgeyByZXR1cm4gbmV3IFRocmVlTWVzaE1hbmFnZXIoKTsgfSxcblxuICAgIGxldmVsTG9hZGVyKCkgOiBJTGV2ZWxMb2FkZXIgeyByZXR1cm4gbmV3IExldmVsTG9hZGVyKG5ldyBRV2VzdEFqYXhMb2FkZXIoKSk7IH0sXG4gICAgXG4gICAgZW50aXR5TWFuYWdlcigpIDogSUVudGl0eU1hbmFnZXIgeyByZXR1cm4gbmV3IEVudGl0eU1hbmFnZXIoKTsgfSxcbiAgICBcbiAgICBsb29wTWFuYWdlcigpIDogSUxvb3BNYW5hZ2VyIHsgcmV0dXJuIG5ldyBNYWluTG9vcExvb3BNYW5hZ2VyKCk7IH0sXG4gICAgXG4gICAgbWVzaExvYWRlcigpIDogSU1lc2hMb2FkZXIgeyByZXR1cm4gbmV3IFRocmVlT2JqZWN0TWVzaExvYWRlcigpOyB9LFxuICAgIFxuICAgIHBlcmZvcm1hbmNlVmlld2VyKCkgOiBJUGVyZm9ybWFuY2VWaWV3ZXIgeyByZXR1cm4gbmV3IFN0YXRzUGVyZm9ybWFuY2VWaWV3ZXIoKTsgfVxufTsiLCIvKiBAZmxvdyAqL1xuXG5leHBvcnQgY29uc3QgRmxhdFNoYWRpbmcgPSAxO1xuZXhwb3J0IGNvbnN0IFNtb290aFNoYWRpbmcgPSAyOyIsIi8qIEBmbG93ICovXG5cbmltcG9ydCBESSBmcm9tICcuL3V0aWxpdHkvZGVwZW5kZW5jeS1pbmplY3Rvcic7XG5cbmltcG9ydCB7IEZsYXRTaGFkaW5nIH0gZnJvbSAnLi9jb25zdGFudHMvc2hhZGluZyc7XG5cbndpbmRvdy5vbmxvYWQgPSBhc3luYyBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBsZXZlbExvYWRlciA9IERJLmxldmVsTG9hZGVyKCk7XG4gICAgY29uc3QgbGV2ZWwgICAgICAgPSBhd2FpdCBsZXZlbExvYWRlci5sb2FkTGV2ZWwoJ2xldmVscy9sZXZlbC1vbmUuanNvbicpO1xuICAgIFxuICAgIGNvbnN0IG1lc2hMb2FkZXIgID0gREkubWVzaExvYWRlcigpO1xuICAgIGNvbnN0IG1lc2hNYW5hZ2VyID0gREkubWVzaE1hbmFnZXIoKTtcbiAgICBjb25zdCBtZXNoSWQgICAgICA9IG1lc2hNYW5hZ2VyLmFkZE1lc2goYXdhaXQgbWVzaExvYWRlci5sb2FkKCdtZXNoZXMvJyArIGxldmVsLm1lc2gsIHsgc2hhZGluZyA6IEZsYXRTaGFkaW5nIH0pKTtcbiAgICBcbiAgICBjb25zdCBzY2VuZU1hbmFnZXIgPSBESS5zY2VuZU1hbmFnZXIoKTtcbiAgICBjb25zdCBzY2VuZUlkICAgICAgPSBzY2VuZU1hbmFnZXIuY3JlYXRlU2NlbmUoKTtcbiAgICBcbiAgICBzY2VuZU1hbmFnZXIuYWRkVG9TY2VuZShzY2VuZUlkLCBtZXNoTWFuYWdlci5nZXRNZXNoKG1lc2hJZCkpO1xuICAgIHNjZW5lTWFuYWdlci5hZGRBbWJpZW50TGlnaHRUb1NjZW5lKHNjZW5lSWQsIDB4MTAxMDMwKTtcbiBcdHNjZW5lTWFuYWdlci5hZGREaXJlY3Rpb25hbExpZ2h0VG9TY2VuZShzY2VuZUlkLCAweGZmZWVkZCwgMCwgMCwgMSk7XG5cbiAgICBjb25zdCBlbnRpdHlNYW5hZ2VyICAgPSBESS5lbnRpdHlNYW5hZ2VyKCk7XG4gICAgY29uc3QgcmVuZGVyZXJNYW5hZ2VyID0gREkucmVuZGVyZXJNYW5hZ2VyKCk7XG4gICAgY29uc3QgbG9vcE1hbmFnZXIgICAgID0gREkubG9vcE1hbmFnZXIoKTtcbiAgICBcbiAgICB2YXIgbWVzaElzQWRkZWQgPSB0cnVlO1xuICAgIFxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIGlmIChtZXNoSXNBZGRlZCkge1xuICAgICAgICAgICAgc2NlbmVNYW5hZ2VyLnJlbW92ZUZyb21TY2VuZShzY2VuZUlkLCBtZXNoTWFuYWdlci5nZXRNZXNoKG1lc2hJZCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2NlbmVNYW5hZ2VyLmFkZFRvU2NlbmUoc2NlbmVJZCwgbWVzaE1hbmFnZXIuZ2V0TWVzaChtZXNoSWQpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbWVzaElzQWRkZWQgPSAhbWVzaElzQWRkZWQ7XG4gICAgfSk7XG4gICAgXG4gICAgY29uc3QgcGVyZm9ybWFuY2VWaWV3ZXIgPSBESS5wZXJmb3JtYW5jZVZpZXdlcigpO1xuICAgIFxuICAgIHBlcmZvcm1hbmNlVmlld2VyLnNldE1vZGUoMCk7XG4gICAgXG4gICAgbG9vcE1hbmFnZXIuc2V0VXBkYXRlKGRlbHRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbWVzaE1hbmFnZXIuZ2V0TWVzaChtZXNoSWQpLnJvdGF0aW9uLnkgKz0gMC4wMDEgKiBkZWx0YTtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5TWFuYWdlci5vbkxvZ2ljKGRlbHRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgLnNldFJlbmRlcihpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgcGVyZm9ybWFuY2VWaWV3ZXIuYmVnaW4oKTtcbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICByZW5kZXJlck1hbmFnZXIucmVuZGVyKHNjZW5lTWFuYWdlci5nZXRTY2VuZShzY2VuZUlkKSwgaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UpO1xuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgIHBlcmZvcm1hbmNlVmlld2VyLmVuZCgpO1xuICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgIC5zdGFydCgpO1xufTsiXSwibmFtZXMiOlsicGlua3lzd2VhciIsInJlcXVpcmUkJDEiLCJyZXF1aXJlJCQwIiwiTWFpbkxvb3AiLCJRV2VzdEFqYXhMb2FkZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQUVPLElBQU0sVUFBVSxHQUFHO1VBQ2pCLEVBQUssQ0FBQztXQUNMLEVBQUk7RUFDYjs7S0FFb0IsYUFBYTtjQUFiLGFBQWEsR0FDaEI7MkNBREcsYUFBYTs7YUFFdEIsQ0FBQyxZQUFZLEdBQUksSUFBSSxHQUFHLEVBQUU7YUFDMUIsQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQUU7Ozs4QkFIakIsYUFBYTs7d0NBTWYsSUFBSSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFOzs7aUJBQzdDLElBQUksS0FBSyxVQUFVLENBQUMsS0FBSyxJQUFJLElBQUksS0FBSyxVQUFVLENBQUMsTUFBTSxFQUFFO3VCQUNuRCxTQUFTLENBQUMsa0NBQWtDLENBQUM7OztpQkFHbkQsUUFBUSxLQUFLLFlBQVksQ0FBQyxHQUFHLElBQUksUUFBUSxLQUFLLFlBQVksQ0FBQyxPQUFPLElBQ2xFLFFBQVEsS0FBSyxZQUFZLENBQUMsV0FBVyxJQUFJLFFBQVEsS0FBSyxZQUFZLENBQUMsVUFBVSxFQUFFO3VCQUN6RSxTQUFTLENBQUMsd0NBQXdDLENBQUM7OztpQkFHekQsT0FBTyxVQUFVLEtBQUssUUFBUSxFQUFHO3VCQUMzQixTQUFTLENBQUMsOEJBQThCLENBQUM7OztpQkFHL0MsT0FBTyxRQUFRLEtBQUssVUFBVSxFQUFFO3VCQUMxQixTQUFTLENBQUMsOEJBQThCLENBQUM7OztpQkFHL0MsTUFBTSxHQUFHO3lCQUNMLEVBQVIsUUFBUTsyQkFD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