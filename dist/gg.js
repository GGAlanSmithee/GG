(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('three')) :
	typeof define === 'function' && define.amd ? define('GG', ['three'], factory) :
	(factory(global.THREE));
}(this, function (three) { 'use strict';

	three = 'default' in three ? three['default'] : three;

	var __commonjs_global = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this;
	function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports, __commonjs_global), module.exports; }


	var babelHelpers = {};
	babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
	};

	babelHelpers.asyncToGenerator = function (fn) {
	  return function () {
	    var gen = fn.apply(this, arguments);
	    return new Promise(function (resolve, reject) {
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
	          return Promise.resolve(value).then(function (value) {
	            return step("next", value);
	          }, function (err) {
	            return step("throw", err);
	          });
	        }
	      }

	      return step("next");
	    });
	  };
	};

	babelHelpers.classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	babelHelpers.createClass = function () {
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

	babelHelpers.slicedToArray = function () {
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
	}();

	babelHelpers.toConsumableArray = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  } else {
	    return Array.from(arr);
	  }
	};

	babelHelpers;

	var ComponentManager = function () {
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
	                        return function (component) {
	                            var ret = {};

	                            Object.keys(component).forEach(function (key) {
	                                return ret[key] = component[key];
	                            });

	                            return ret;
	                        }(component);
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

	            var max = Math.max.apply(Math, babelHelpers.toConsumableArray(this.components.keys()));

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
	}();

	var SystemType = {
	    Logic: 0,
	    Render: 1
	};

	var SystemManager = function () {
	    function SystemManager() {
	        babelHelpers.classCallCheck(this, SystemManager);

	        this.logicSystems = new Map();
	        this.renderSystems = new Map();
	    }

	    babelHelpers.createClass(SystemManager, [{
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

	            var systemId = Math.max.apply(Math, [0].concat(babelHelpers.toConsumableArray(this.logicSystems.keys()), babelHelpers.toConsumableArray(this.renderSystems.keys()))) + 1;

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
	}();

	var EventHandler = function () {
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
	                eventId = Math.max.apply(Math, [eventId].concat(babelHelpers.toConsumableArray(event.keys())));
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
	}();

	var SelectorType = {
	    Get: 0,
	    GetWith: 1,
	    GetWithOnly: 2,
	    GetWithout: 3
	};

	var EntityManager = function () {
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

	                    for (var _i = oldCapacity; _i < this.capacity; ++_i) {
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
	            var components = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	            var type = arguments.length <= 1 || arguments[1] === undefined ? SelectorType.GetWith : arguments[1];

	            var entityId, _entityId, _entityId2, _entityId3;

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

	                            _entityId = _context.t4.value;

	                            if (!(_entityId > this.currentMaxEntity)) {
	                                _context.next = 19;
	                                break;
	                            }

	                            return _context.abrupt('return');

	                        case 19:
	                            if (!(this.entities[_entityId] !== 0 && this.entities[_entityId] === components)) {
	                                _context.next = 22;
	                                break;
	                            }

	                            _context.next = 22;
	                            return Math.floor(_entityId);

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

	                            _entityId2 = _context.t6.value;

	                            if (!(_entityId2 > this.currentMaxEntity)) {
	                                _context.next = 30;
	                                break;
	                            }

	                            return _context.abrupt('return');

	                        case 30:
	                            if (!(this.entities[_entityId2] !== 0 && (this.entities[_entityId2] & components) !== components)) {
	                                _context.next = 33;
	                                break;
	                            }

	                            _context.next = 33;
	                            return Math.floor(_entityId2);

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

	                            _entityId3 = _context.t8.value;

	                            if (!(_entityId3 > this.currentMaxEntity)) {
	                                _context.next = 41;
	                                break;
	                            }

	                            return _context.abrupt('return');

	                        case 41:
	                            _context.next = 43;
	                            return Math.floor(_entityId3);

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

	            var initializer = void 0;

	            switch (typeof component === 'undefined' ? 'undefined' : babelHelpers.typeof(component)) {
	                case 'function':
	                    initializer = component;break;
	                case 'object':
	                    {
	                        initializer = function initializer() {
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
	                    initializer = function initializer() {
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
	}();

	var EntityFactory = function () {
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
	                var entityId = entityManager.newEntity(components);

	                if (entityId >= entityManager.capacity) {
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

	                        var result = initializer.call(entityManager[componentId][entityId]);

	                        if (typeof entityManager[componentId][entityId] !== 'function' && babelHelpers.typeof(entityManager[componentId][entityId]) !== 'object' && result !== undefined) {
	                            entityManager[componentId][entityId] = result;
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

	                entities.push(entityId);
	            }

	            return entities.length === 1 ? entities[0] : entities;
	        }
	    }]);
	    return EntityFactory;
	}();

	var ThreeRendererManager = function () {
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
	}();

	var Stats = __commonjs(function (module) {
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
	});

	var Stats$1 = Stats && (typeof Stats === 'undefined' ? 'undefined' : babelHelpers.typeof(Stats)) === 'object' && 'default' in Stats ? Stats['default'] : Stats;

	var StatsPerformanceViewer = function () {
	    function StatsPerformanceViewer() {
	        babelHelpers.classCallCheck(this, StatsPerformanceViewer);

	        this.stats = new Stats$1();

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
	}();

	var ThreeSceneManager = function () {
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
	}();

	var ThreeMeshManager = function () {
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
	}();

	var ThreeObjectMeshLoader = function () {
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
	}();

	var jqueryParam = __commonjs(function (module, exports, global) {
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
	    })(__commonjs_global);
	});

	var require$$0 = jqueryParam && (typeof jqueryParam === 'undefined' ? 'undefined' : babelHelpers.typeof(jqueryParam)) === 'object' && 'default' in jqueryParam ? jqueryParam['default'] : jqueryParam;

	var pinkyswear = __commonjs(function (module) {
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
	});

	var require$$1 = pinkyswear && (typeof pinkyswear === 'undefined' ? 'undefined' : babelHelpers.typeof(pinkyswear)) === 'object' && 'default' in pinkyswear ? pinkyswear['default'] : pinkyswear;

	var qwest = __commonjs(function (module) {
		/*! qwest 4.3.2 (https://github.com/pyrsmk/qwest) */

		module.exports = function () {

			var global = window || this,
			    pinkyswear = require$$1,
			    jparam = require$$0,
			    defaultOptions = {},

			// Default response type for XDR in auto mode
			defaultXdrResponseType = 'json',

			// Default data type
			defaultDataType = 'post',

			// Variables for limit mechanism
			_limit = null,
			    requests = 0,
			    request_stack = [],

			// Get XMLHttpRequest object
			getXHR = global.XMLHttpRequest ? function () {
				return new global.XMLHttpRequest();
			} : function () {
				return new ActiveXObject('Microsoft.XMLHTTP');
			},

			// Guess XHR version
			xhr2 = getXHR().responseType === '',


			// Core function
			qwest = function qwest(method, url, data, options, before) {
				// Format
				method = method.toUpperCase();
				data = data || null;
				options = options || {};
				for (var name in defaultOptions) {
					if (!(name in options)) {
						if (babelHelpers.typeof(defaultOptions[name]) == 'object' && babelHelpers.typeof(options[name]) == 'object') {
							for (var name2 in defaultOptions[name]) {
								options[name][name2] = defaultOptions[name][name2];
							}
						} else {
							options[name] = defaultOptions[name];
						}
					}
				}

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
					post: 'application/x-www-form-urlencoded',
					document: 'text/html'
				},
				    accept = {
					text: '*/*',
					xml: 'application/xml; q=1.0, text/xml; q=0.8, */*; q=0.1',
					json: 'application/json; q=1.0, text/*; q=0.8, */*; q=0.1'
				},
				    i,
				    j,
				    serialized,
				    response,
				    sending = false,
				    delayed = false,
				    timeout_start,


				// Create the promise
				promise = pinkyswear(function (pinky) {
					pinky.abort = function () {
						if (xhr) {
							xhr.abort();
							aborted = true;
							--requests;
						}
					};
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
						// Verify if the request has not been previously aborted
						if (aborted) {
							if (request_stack.length) {
								request_stack.shift().send();
							}
							return;
						}
						// The sending is running
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
						if (xhr2 && options.responseType != 'auto') {
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
							// http://cypressnorth.com/programming/internet-explorer-aborting-ajax-requests-fixed/
							xhr.onprogress = function () {};
							xhr.ontimeout = function () {};
							xhr.onerror = function () {};
							// https://developer.mozilla.org/en-US/docs/Web/API/XDomainRequest
							setTimeout(function () {
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
					sending = false;
					// Launch next stacked request
					if (request_stack.length) {
						request_stack.shift().send();
					}
					// Verify if the request has not been previously aborted
					if (aborted) {
						return;
					}
					// Decrease number of requests
					--requests;
					// Verify timeout state
					// --- https://stackoverflow.com/questions/7287706/ie-9-javascript-error-c00c023f
					if (new Date().getTime() - timeout_start >= options.timeout) {
						if (!options.attempts || ++attempts != options.attempts) {
							promise.send();
						} else {
							promise(false, [new Error('Timeout (' + url + ')'), xhr, response]);
						}
						return;
					}
					// Handle response
					try {
						// Process response
						if (nativeResponseParsing && 'response' in xhr && xhr.response !== null) {
							response = xhr.response;
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
									if (xhr.responseText.length) {
										try {
											if ('JSON' in global) {
												response = JSON.parse(xhr.responseText);
											} else {
												response = eval('(' + xhr.responseText + ')');
											}
										} catch (e) {
											throw "Error while parsing JSON body : " + e;
										}
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
						promise(false, [e, xhr, response]);
					}
				},


				// Handle errors
				handleError = function handleError(e) {
					if (!aborted) {
						--requests;
						promise(false, [new Error('Connection aborted'), xhr, null]);
					}
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
				if (data !== null) {
					switch (options.dataType) {
						case 'json':
							data = JSON.stringify(data);
							break;
						case 'post':
							data = jparam(data);
					}
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
				if (method == 'GET' && data && typeof data == 'string') {
					url += (/\?/.test(url) ? '&' : '?') + data;
				}

				// Start the request
				if (options.async) {
					promise.send();
				}

				// Return promise
				return promise;
			};

			// Define external qwest object
			var getNewPromise = function getNewPromise(q) {
				// Prepare
				var promises = [],
				    loading = 0,
				    values = [];
				// Create a new promise to handle all requests
				return pinkyswear(function (pinky) {
					// Basic request method
					var method_index = -1,
					    createMethod = function createMethod(method) {
						return function (url, data, options, before) {
							var index = ++method_index;
							++loading;
							promises.push(qwest(method, pinky.base + url, data, options, before).then(function (xhr, response) {
								values[index] = arguments;
								if (! --loading) {
									pinky(true, values.length == 1 ? values[0] : [values]);
								}
							}, function () {
								pinky(false, arguments);
							}));
							return pinky;
						};
					};
					// Define external API
					pinky.get = createMethod('GET');
					pinky.post = createMethod('POST');
					pinky.put = createMethod('PUT');
					pinky['delete'] = createMethod('DELETE');
					pinky['catch'] = function (f) {
						return pinky.then(null, f);
					};
					pinky.complete = function (f) {
						var func = function func() {
							f(); // otherwise arguments will be passed to the callback
						};
						return pinky.then(func, func);
					};
					pinky.map = function (type, url, data, options, before) {
						return createMethod(type.toUpperCase()).call(this, url, data, options, before);
					};
					// Populate methods from external object
					for (var prop in q) {
						if (!(prop in pinky)) {
							pinky[prop] = q[prop];
						}
					}
					// Set last methods
					pinky.send = function () {
						for (var i = 0, j = promises.length; i < j; ++i) {
							promises[i].send();
						}
						return pinky;
					};
					pinky.abort = function () {
						for (var i = 0, j = promises.length; i < j; ++i) {
							promises[i].abort();
						}
						return pinky;
					};
					return pinky;
				});
			},
			    q = {
				base: '',
				get: function get() {
					return getNewPromise(q).get.apply(this, arguments);
				},
				post: function post() {
					return getNewPromise(q).post.apply(this, arguments);
				},
				put: function put() {
					return getNewPromise(q).put.apply(this, arguments);
				},
				'delete': function _delete() {
					return getNewPromise(q)['delete'].apply(this, arguments);
				},
				map: function map() {
					return getNewPromise(q).map.apply(this, arguments);
				},
				xhr2: xhr2,
				limit: function limit(by) {
					_limit = by;
					return q;
				},
				setDefaultOptions: function setDefaultOptions(options) {
					defaultOptions = options;
					return q;
				},
				setDefaultXdrResponseType: function setDefaultXdrResponseType(type) {
					defaultXdrResponseType = type.toLowerCase();
					return q;
				},
				setDefaultDataType: function setDefaultDataType(type) {
					defaultDataType = type.toLowerCase();
					return q;
				},
				getOpenRequests: function getOpenRequests() {
					return requests;
				}
			};

			return q;
		}();
	});

	var qwest$1 = qwest && (typeof qwest === 'undefined' ? 'undefined' : babelHelpers.typeof(qwest)) === 'object' && 'default' in qwest ? qwest['default'] : qwest;

	var QwestAjaxLoader = function () {
	    function QwestAjaxLoader() {
	        babelHelpers.classCallCheck(this, QwestAjaxLoader);
	    }

	    babelHelpers.createClass(QwestAjaxLoader, [{
	        key: 'get',
	        value: function get(path) {
	            return qwest$1.get(path).then(function (xhr, res) {
	                return typeof res === 'string' ? JSON.parse(res) : res;
	            });
	        }
	    }]);
	    return QwestAjaxLoader;
	}();

	var LevelLoader = function () {
	    function LevelLoader(ajaxLoader) {
	        babelHelpers.classCallCheck(this, LevelLoader);

	        this.ajaxLoader = ajaxLoader;
	    }

	    babelHelpers.createClass(LevelLoader, [{
	        key: "loadLevel",
	        value: function () {
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

	            function loadLevel(_x) {
	                return ref.apply(this, arguments);
	            }

	            return loadLevel;
	        }()
	    }]);
	    return LevelLoader;
	}();

	var mainloop = __commonjs(function (module, exports, global) {
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
	        requestAnimationFrame = root.requestAnimationFrame || function () {
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
	        }(),


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
	});

	var MainLoop = mainloop && (typeof mainloop === 'undefined' ? 'undefined' : babelHelpers.typeof(mainloop)) === 'object' && 'default' in mainloop ? mainloop['default'] : mainloop;

	var MainLoopLoopManager = function () {
	    function MainLoopLoopManager() {
	        babelHelpers.classCallCheck(this, MainLoopLoopManager);
	    }

	    babelHelpers.createClass(MainLoopLoopManager, [{
	        key: 'setUpdate',
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
	    }]);
	    return MainLoopLoopManager;
	}();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2cuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9jb21wb25lbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2ctZW50aXRpZXMvc3JjL2NvcmUvc3lzdGVtLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL3NyYy9jb3JlL2V2ZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL3NyYy9jb3JlL2VudGl0eS5qcyIsIi4uL3NyYy92aWV3L3RocmVlLXJlbmRlcmVyLW1hbmFnZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvc3RhdHMuanMvc3JjL1N0YXRzLmpzIiwiLi4vc3JjL3ZpZXcvc3RhdHMtcGVyZm9ybWFuY2Utdmlld2VyLmpzIiwiLi4vc3JjL2xvZ2ljL3RocmVlLXNjZW5lLW1hbmFnZXIuanMiLCIuLi9zcmMvbG9naWMvdGhyZWUtbWVzaC1tYW5hZ2VyLmpzIiwiLi4vc3JjL2xvZ2ljL3RocmVlLW9iamVjdC1tZXNoLWxvYWRlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9qcXVlcnktcGFyYW0vanF1ZXJ5LXBhcmFtLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bpbmt5c3dlYXIvcGlua3lzd2Vhci5qcyIsIi4uL25vZGVfbW9kdWxlcy9xd2VzdC9zcmMvcXdlc3QuanMiLCIuLi9zcmMvbG9naWMvcXdlc3QtYWpheC1sb2FkZXIuanMiLCIuLi9zcmMvbG9naWMvbGV2ZWwtbG9hZGVyLmpzIiwiLi4vc3JjL2V4dGVybmFsL21haW5sb29wLmpzIiwiLi4vc3JjL2xvZ2ljL21haW5sb29wLWxvb3AtbWFuYWdlci5qcyIsIi4uL3NyYy91dGlsaXR5L2RlcGVuZGVuY3ktaW5qZWN0b3IuanMiLCIuLi9zcmMvY29uc3RhbnRzL3NoYWRpbmcuanMiLCIuLi9zcmMvZ2cuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcG9uZW50TWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgXG4gICAgbmV3Q29tcG9uZW50KGNvbXBvbmVudElkKSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KGNvbXBvbmVudElkKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChjb21wb25lbnQgPT09IG51bGwgfHwgY29tcG9uZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzogcmV0dXJuIG5ldyBjb21wb25lbnQoKTtcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCcgIDoge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKGNvbXBvbmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmV0ID0ge307XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjb21wb25lbnQpLmZvckVhY2goa2V5ID0+IHJldFtrZXldID0gY29tcG9uZW50W2tleV0pO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgICAgICB9KShjb21wb25lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICAgICAgaWYgKGNvbXBvbmVudCA9PT0gbnVsbCB8fCBjb21wb25lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjb21wb25lbnQgY2Fubm90IGJlIG51bGwuJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBtYXggPSBNYXRoLm1heCguLi50aGlzLmNvbXBvbmVudHMua2V5cygpKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBpZCA9IG1heCA9PT0gdW5kZWZpbmVkIHx8IG1heCA9PT0gbnVsbCB8fCBtYXggPT09IC1JbmZpbml0eSA/IDEgOiBtYXggPT09IDAgPyAxIDogbWF4ICogMjtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudHMuc2V0KGlkLCBjb21wb25lbnQpO1xuXG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9XG4gICAgXG4gICAgZ2V0Q29tcG9uZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50cztcbiAgICB9XG59IiwiaW1wb3J0IHsgU2VsZWN0b3JUeXBlIH0gZnJvbSAnLi9lbnRpdHknO1xuXG5leHBvcnQgY29uc3QgU3lzdGVtVHlwZSA9IHtcbiAgICBMb2dpYyAgIDogMCxcbiAgICBSZW5kZXIgIDogMVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3lzdGVtTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubG9naWNTeXN0ZW1zICA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJTeXN0ZW1zID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBcbiAgICByZWdpc3RlclN5c3RlbSh0eXBlLCBzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGUgIT09IFN5c3RlbVR5cGUuTG9naWMgJiYgdHlwZSAhPT0gU3lzdGVtVHlwZS5SZW5kZXIpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcigndHlwZSBtdXN0IGJlIGEgdmFsaWQgU3lzdGVtVHlwZS4nKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBpZiAoc2VsZWN0b3IgIT09IFNlbGVjdG9yVHlwZS5HZXQgJiYgc2VsZWN0b3IgIT09IFNlbGVjdG9yVHlwZS5HZXRXaXRoICYmXG4gICAgICAgICAgICBzZWxlY3RvciAhPT0gU2VsZWN0b3JUeXBlLkdldFdpdGhPbmx5ICYmIHNlbGVjdG9yICE9PSBTZWxlY3RvclR5cGUuR2V0V2l0aG91dCkge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdzZWxlY3RvciBtdXN0IGJlIGEgdmFsaWQgU2VsZWN0b3JUeXBlLicpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGNvbXBvbmVudHMgIT09ICdudW1iZXInKSAge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjb21wb25lbnRzIG11c3QgYmUgYSBudW1iZXIuJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgc3lzdGVtID0ge1xuICAgICAgICBzZWxlY3RvcixcbiAgICAgICAgY29tcG9uZW50cyxcbiAgICAgICAgY2FsbGJhY2tcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIGxldCBzeXN0ZW1JZCA9IE1hdGgubWF4KDAsIC4uLnRoaXMubG9naWNTeXN0ZW1zLmtleXMoKSwgLi4udGhpcy5yZW5kZXJTeXN0ZW1zLmtleXMoKSkgKyAxO1xuICAgICAgICBcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFN5c3RlbVR5cGUuTG9naWMgOiB0aGlzLmxvZ2ljU3lzdGVtcy5zZXQoc3lzdGVtSWQsIHN5c3RlbSk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTeXN0ZW1UeXBlLlJlbmRlciA6IHRoaXMucmVuZGVyU3lzdGVtcy5zZXQoc3lzdGVtSWQsIHN5c3RlbSk7IGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gc3lzdGVtSWQ7XG4gICAgfVxuICAgIFxuICAgIHJlbW92ZVN5c3RlbShzeXN0ZW1JZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2dpY1N5c3RlbXMuZGVsZXRlKHN5c3RlbUlkKSB8fCB0aGlzLnJlbmRlclN5c3RlbXMuZGVsZXRlKHN5c3RlbUlkKTtcbiAgICB9XG59IiwiaW1wb3J0IEVudGl0eU1hbmFnZXIgZnJvbSAnLi9lbnRpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudEhhbmRsZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgXG4gICAgZW1wdHlQcm9taXNlKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBwcm9taXNlKGNhbGxiYWNrLCBjb250ZXh0LCBhcmdzLCB0aW1lb3V0KSB7XG4gICAgICAgIGlmICh0aW1lb3V0KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHR5cGVvZiBjb250ZXh0ID09PSAgJ29iamVjdCcgPyBjYWxsYmFjay5jYWxsKGNvbnRleHQsIC4uLmFyZ3MpIDogY2FsbGJhY2suYXBwbHkoY29udGV4dCwgLi4uYXJncykpO1xuICAgICAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUodHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnID8gY2FsbGJhY2suY2FsbChjb250ZXh0LCAuLi5hcmdzKSA6IGNhbGxiYWNrLmFwcGx5KGNvbnRleHQsIC4uLmFyZ3MpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIGxpc3RlbihldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICghdGhpcy5ldmVudHMuaGFzKGV2ZW50KSkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMuc2V0KGV2ZW50LCBuZXcgTWFwKCkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgZXZlbnRJZCA9IC0xO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5ldmVudHMuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudElkID0gTWF0aC5tYXgoZXZlbnRJZCwgLi4uZXZlbnQua2V5cygpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICArK2V2ZW50SWQ7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmV2ZW50cy5nZXQoZXZlbnQpLnNldChldmVudElkLCBjYWxsYmFjayk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZXZlbnRJZDtcbiAgICB9XG4gICAgXG4gICAgc3RvcExpc3RlbihldmVudElkKSB7XG4gICAgICAgIGZvciAobGV0IGV2ZW50cyBvZiB0aGlzLmV2ZW50cy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaWQgb2YgZXZlbnRzLmtleXMoKSkge1xuICAgICAgICAgICAgICAgIGlmIChpZCA9PT0gZXZlbnRJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnRzLmRlbGV0ZShldmVudElkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXIoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcyBpbnN0YW5jZW9mIEVudGl0eU1hbmFnZXIgPyB0aGlzLmV2ZW50SGFuZGxlciA6IHRoaXM7XG4gICAgICAgIFxuICAgICAgICBsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBbIGV2ZW50IF0gPSBhcmdzLnNwbGljZSgwLCAxKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnQgIT09ICdzdHJpbmcnIHx8ICFzZWxmLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5lbXB0eVByb21pc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHByb21pc2VzID0gW107XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBjYWxsYmFjayBvZiBzZWxmLmV2ZW50cy5nZXQoZXZlbnQpLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHNlbGYucHJvbWlzZShjYWxsYmFjaywgdGhpcywgYXJncywgMSkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH1cbiAgICBcbiAgICB0cmlnZ2VyRGVsYXllZCgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlciA/IHRoaXMuZXZlbnRIYW5kbGVyIDogdGhpcztcbiAgICAgICAgXG4gICAgICAgIGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xuICAgICAgICBcbiAgICAgICAgbGV0IFsgZXZlbnQsIHRpbWVvdXQgXSA9IGFyZ3Muc3BsaWNlKDAsIDIpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgIU51bWJlci5pc0ludGVnZXIodGltZW91dCkgfHwgIXNlbGYuZXZlbnRzLmhhcyhldmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmVtcHR5UHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGNhbGxiYWNrIG9mIHNlbGYuZXZlbnRzLmdldChldmVudCkudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goc2VsZi5wcm9taXNlKGNhbGxiYWNrLCB0aGlzLCBhcmdzLCB0aW1lb3V0KSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxufSIsImltcG9ydCBDb21wb25lbnRNYW5hZ2VyICAgICAgICAgICAgICBmcm9tICcuL2NvbXBvbmVudCc7XG5pbXBvcnQgU3lzdGVtTWFuYWdlciwgeyBTeXN0ZW1UeXBlIH0gZnJvbSAnLi9zeXN0ZW0nO1xuaW1wb3J0IEV2ZW50SGFuZGxlciAgICAgICAgICAgICAgICAgIGZyb20gJy4vZXZlbnQnO1xuXG5leHBvcnQgY29uc3QgU2VsZWN0b3JUeXBlID0ge1xuICAgIEdldCAgICAgICAgIDogMCxcbiAgICBHZXRXaXRoICAgICA6IDEsXG4gICAgR2V0V2l0aE9ubHkgOiAyLFxuICAgIEdldFdpdGhvdXQgIDogM1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5TWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoY2FwYWNpdHkgPSAxMDAwKSB7XG4gICAgICAgIHRoaXMuY2FwYWNpdHkgICAgICAgICA9IGNhcGFjaXR5O1xuICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSAtMTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeSAgICA9IG5ldyBFbnRpdHlGYWN0b3J5KCk7XG4gICAgICAgIHRoaXMuc3lzdGVtTWFuYWdlciAgICA9IG5ldyBTeXN0ZW1NYW5hZ2VyKCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50TWFuYWdlciA9IG5ldyBDb21wb25lbnRNYW5hZ2VyKCk7XG4gICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyICAgICA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXRpZXMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiB0aGlzLmNhcGFjaXR5IH0sICgpID0+IHsgcmV0dXJuIDA7IH0gKTtcbiAgICB9XG4gICAgXG4gICAgaW5jcmVhc2VDYXBhY2l0eSgpIHtcbiAgICAgICAgbGV0IG9sZENhcGFjaXR5ID0gdGhpcy5jYXBhY2l0eTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2FwYWNpdHkgKj0gMjtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSBvbGRDYXBhY2l0eTsgaSA8IHRoaXMuY2FwYWNpdHk7ICsraSkge1xuICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tpXSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGNvbXBvbmVudElkIG9mIHRoaXMuY29tcG9uZW50TWFuYWdlci5nZXRDb21wb25lbnRzKCkua2V5cygpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gb2xkQ2FwYWNpdHk7IGkgPCB0aGlzLmNhcGFjaXR5OyArK2kpIHtcbiAgICAgICAgICAgICAgICB0aGlzW2NvbXBvbmVudElkXS5wdXNoKHRoaXMuY29tcG9uZW50TWFuYWdlci5uZXdDb21wb25lbnQoY29tcG9uZW50SWQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBuZXdFbnRpdHkoY29tcG9uZW50cykge1xuICAgICAgICBpZiAodHlwZW9mIGNvbXBvbmVudHMgIT09ICdudW1iZXInIHx8IGNvbXBvbmVudHMgPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FwYWNpdHk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBlbnRpdHlJZCA9IDA7XG4gICAgICAgIFxuICAgICAgICBmb3IgKDsgZW50aXR5SWQgPCB0aGlzLmNhcGFjaXR5OyArK2VudGl0eUlkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gPT09IDApIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGVudGl0eUlkID49IHRoaXMuY2FwYWNpdHkpIHtcbiAgICAgICAgICAgIC8vIHRvZG86IGF1dG8gaW5jcmVhc2UgY2FwYWNpdHk/XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXBhY2l0eTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGVudGl0eUlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSBlbnRpdHlJZDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gPSBjb21wb25lbnRzO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGVudGl0eUlkO1xuICAgIH1cbiAgICBcbiAgICBkZWxldGVFbnRpdHkoZW50aXR5SWQpIHtcbiAgICAgICAgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gPSAwO1xuICAgICAgICBcbiAgICAgICAgaWYgKGVudGl0eUlkIDwgdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSBlbnRpdHlJZDsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2ldICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TWF4RW50aXR5ID0gaTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgKmdldEVudGl0aWVzKGNvbXBvbmVudHMgPSAwLCB0eXBlID0gU2VsZWN0b3JUeXBlLkdldFdpdGgpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFNlbGVjdG9yVHlwZS5HZXRXaXRoOiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW50aXR5SWQgaW4gdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5SWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbZW50aXR5SWRdICE9PSAwICYmICh0aGlzLmVudGl0aWVzW2VudGl0eUlkXSAmIGNvbXBvbmVudHMpID09PSBjb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCBNYXRoLmZsb29yKGVudGl0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgU2VsZWN0b3JUeXBlLkdldFdpdGhPbmx5OiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW50aXR5SWQgaW4gdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5SWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbZW50aXR5SWRdICE9PSAwICYmIHRoaXMuZW50aXRpZXNbZW50aXR5SWRdID09PSBjb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCBNYXRoLmZsb29yKGVudGl0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgU2VsZWN0b3JUeXBlLkdldFdpdGhvdXQ6IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRpdHlJZCBpbiB0aGlzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdHlJZCA+IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gIT09IDAgJiYgKHRoaXMuZW50aXRpZXNbZW50aXR5SWRdICYgY29tcG9uZW50cykgIT09IGNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIE1hdGguZmxvb3IoZW50aXR5SWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBTZWxlY3RvclR5cGUuR2V0OiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW50aXR5SWQgaW4gdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5SWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgTWF0aC5mbG9vcihlbnRpdHlJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ29tcG9uZW50IE1hbmFnZXJcbiAgICBcbiAgICByZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudElkID0gdGhpcy5jb21wb25lbnRNYW5hZ2VyLnJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzW2NvbXBvbmVudElkXSA9IFtdO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNhcGFjaXR5OyArK2kpIHtcbiAgICAgICAgICAgIHRoaXNbY29tcG9uZW50SWRdLnB1c2godGhpcy5jb21wb25lbnRNYW5hZ2VyLm5ld0NvbXBvbmVudChjb21wb25lbnRJZCkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgaW5pdGlhbGl6ZXI7XG5cbiAgICAgICAgc3dpdGNoICh0eXBlb2YgY29tcG9uZW50KSB7XG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6IGluaXRpYWxpemVyID0gY29tcG9uZW50OyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6IHtcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMoY29tcG9uZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gY29tcG9uZW50W2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OiBpbml0aWFsaXplciA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29tcG9uZW50OyB9OyBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LnJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBjb21wb25lbnRJZDtcbiAgICB9XG4gICAgXG4gICAgYWRkQ29tcG9uZW50KGVudGl0eUlkLCBjb21wb25lbnRJZCkge1xuICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eUlkXSB8PSBjb21wb25lbnRJZDtcbiAgICB9XG4gICAgXG4gICAgcmVtb3ZlQ29tcG9uZW50KGVudGl0eUlkLCBjb21wb25lbnRJZCkge1xuICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eUlkXSAmPSB+Y29tcG9uZW50SWQ7XG4gICAgfVxuICAgIFxuICAgIC8vIFN5c3RlbSBNYW5hZ2VyXG4gICAgXG4gICAgcmVnaXN0ZXJTeXN0ZW0odHlwZSwgc2VsZWN0b3IsIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVnaXN0ZXJTeXN0ZW0odHlwZSwgc2VsZWN0b3IsIGNvbXBvbmVudHMsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJMb2dpY1N5c3RlbShzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbShTeXN0ZW1UeXBlLkxvZ2ljLCBzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spO1xuICAgIH1cbiAgICBcbiAgICByZWdpc3RlclJlbmRlclN5c3RlbShzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbShTeXN0ZW1UeXBlLlJlbmRlciwgc2VsZWN0b3IsIGNvbXBvbmVudHMsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgXG4gICAgcmVtb3ZlU3lzdGVtKHN5c3RlbUlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVtb3ZlU3lzdGVtKHN5c3RlbUlkKTtcbiAgICB9XG4gICAgXG4gICAgb25Mb2dpYyhkZWx0YSkge1xuICAgICAgICBmb3IgKGxldCBzeXN0ZW0gb2YgdGhpcy5zeXN0ZW1NYW5hZ2VyLmxvZ2ljU3lzdGVtcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgc3lzdGVtLmNhbGxiYWNrLmNhbGwodGhpcywgdGhpcy5nZXRFbnRpdGllcyhzeXN0ZW0uY29tcG9uZW50cywgc3lzdGVtLnNlbGVjdG9yKSwgZGVsdGEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uUmVuZGVyKGRlbHRhKSB7XG4gICAgICAgIGZvciAobGV0IHN5c3RlbSBvZiB0aGlzLnN5c3RlbU1hbmFnZXIucmVuZGVyU3lzdGVtcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgc3lzdGVtLmNhbGxiYWNrLmNhbGwodGhpcywgdGhpcy5nZXRFbnRpdGllcyhzeXN0ZW0uY29tcG9uZW50cywgc3lzdGVtLnNlbGVjdG9yKSwgZGVsdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gRW50aXR5IEZhY3RvcnlcbiAgICBcbiAgICByZWdpc3RlckluaXRpYWxpemVyKGNvbXBvbmVudElkLCBpbml0aWFsaXplcikge1xuICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkucmVnaXN0ZXJJbml0aWFsaXplcihjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpO1xuICAgIH1cbiAgICBcbiAgICBidWlsZCgpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LmJ1aWxkKCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgd2l0aENvbXBvbmVudChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LndpdGhDb21wb25lbnQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGVDb25maWd1cmF0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnRpdHlGYWN0b3J5LmNyZWF0ZUNvbmZpZ3VyYXRpb24oKTtcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlKGNvdW50LCBjb25maWd1cmF0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVudGl0eUZhY3RvcnkuY3JlYXRlKHRoaXMsIGNvdW50LCBjb25maWd1cmF0aW9uKTtcbiAgICB9XG4gICAgXG4gICAgLy8gRXZlbnQgSGFuZGxlclxuICAgIFxuICAgIGxpc3RlbihldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLmxpc3RlbihldmVudCwgY2FsbGJhY2spO1xuICAgIH1cbiAgICBcbiAgICBzdG9wTGlzdGVuKGV2ZW50SWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLnN0b3BMaXN0ZW4oZXZlbnRJZCk7XG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyLmNhbGwodGhpcywgLi4uYXJndW1lbnRzKTtcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlckRlbGF5ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyRGVsYXllZC5jYWxsKHRoaXMsIC4uLmFyZ3VtZW50cyk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRW50aXR5RmFjdG9yeSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXJzICA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckluaXRpYWxpemVyKGNvbXBvbmVudElkLCBpbml0aWFsaXplcikge1xuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoY29tcG9uZW50SWQpIHx8IHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmluaXRpYWxpemVycy5zZXQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKTtcbiAgICB9XG4gICAgXG4gICAgYnVpbGQoKSB7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IG5ldyBNYXAoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICB3aXRoQ29tcG9uZW50KGNvbXBvbmVudElkLCBpbml0aWFsaXplcikge1xuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoY29tcG9uZW50SWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgaW5pdGlhbGl6ZXIgPSB0aGlzLmluaXRpYWxpemVycy5nZXQoY29tcG9uZW50SWQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uc2V0KGNvbXBvbmVudElkLCBpbml0aWFsaXplcik7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlQ29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlndXJhdGlvbjtcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlKGVudGl0eU1hbmFnZXIsIGNvdW50ID0gMSwgY29uZmlndXJhdGlvbiA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIShlbnRpdHlNYW5hZ2VyIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlcikpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbiB8fCB0aGlzLmNvbmZpZ3VyYXRpb247XG5cbiAgICAgICAgbGV0IGNvbXBvbmVudHMgPSAwO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY29tcG9uZW50IG9mIGNvbmZpZ3VyYXRpb24ua2V5cygpKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzIHw9IGNvbXBvbmVudDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGVudGl0aWVzID0gW107XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyArK2kpIHtcbiAgICAgICAgICAgIGxldCBlbnRpdHlJZCA9IGVudGl0eU1hbmFnZXIubmV3RW50aXR5KGNvbXBvbmVudHMpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZW50aXR5SWQgPj0gZW50aXR5TWFuYWdlci5jYXBhY2l0eSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBbY29tcG9uZW50SWQsIGluaXRpYWxpemVyXSBvZiBjb25maWd1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGluaXRpYWxpemVyLmNhbGwoZW50aXR5TWFuYWdlcltjb21wb25lbnRJZF1bZW50aXR5SWRdKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVudGl0eU1hbmFnZXJbY29tcG9uZW50SWRdW2VudGl0eUlkXSAhPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZW50aXR5TWFuYWdlcltjb21wb25lbnRJZF1bZW50aXR5SWRdICE9PSAnb2JqZWN0JyAmJiByZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHlNYW5hZ2VyW2NvbXBvbmVudElkXVtlbnRpdHlJZF0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBlbnRpdGllcy5wdXNoKGVudGl0eUlkKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLmxlbmd0aCA9PT0gMSA/IGVudGl0aWVzWzBdIDogZW50aXRpZXM7XG4gICAgfVxufSIsIi8qIEBmbG93ICovXG5cbmltcG9ydCB0aHJlZSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRocmVlUmVuZGVyZXJNYW5hZ2VyIHtcbiAgICByZW5kZXJlciAgICAgOiB0aHJlZS5XZWJHTFJlbmRlcmVyO1xuICAgIGNhbWVyYSAgICAgICA6IHRocmVlLkNhbWVyYTtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyB0aHJlZS5XZWJHTFJlbmRlcmVyKHsgYW50aWFsaWFzIDogdHJ1ZSB9KTtcbiAgICAgICAgdGhpcy5jYW1lcmEgICA9IG5ldyB0aHJlZS5QZXJzcGVjdGl2ZUNhbWVyYSgpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueSA9IDIwO1xuICAgICAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi56ID0gMjA7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNhbWVyYS5sb29rQXQobmV3IHRocmVlLlZlY3RvcjMoMC4wLCAwLjAsIDAuMCkpO1xuICAgIH1cbiAgICBcbiAgICByZW5kZXIoc2NlbmUgOiB0aHJlZS5TY2VuZSwgaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UgOiBudW1iZXIpIDogdm9pZCB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xuICovXG5cbnZhciBTdGF0cyA9IGZ1bmN0aW9uICgpIHtcblxuXHR2YXIgbm93ID0gKCBzZWxmLnBlcmZvcm1hbmNlICYmIHNlbGYucGVyZm9ybWFuY2Uubm93ICkgPyBzZWxmLnBlcmZvcm1hbmNlLm5vdy5iaW5kKCBwZXJmb3JtYW5jZSApIDogRGF0ZS5ub3c7XG5cblx0dmFyIHN0YXJ0VGltZSA9IG5vdygpLCBwcmV2VGltZSA9IHN0YXJ0VGltZTtcblx0dmFyIGZyYW1lcyA9IDAsIG1vZGUgPSAwO1xuXG5cdGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoIHRhZywgaWQsIGNzcyApIHtcblxuXHRcdHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggdGFnICk7XG5cdFx0ZWxlbWVudC5pZCA9IGlkO1xuXHRcdGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IGNzcztcblx0XHRyZXR1cm4gZWxlbWVudDtcblxuXHR9XG5cblx0ZnVuY3Rpb24gY3JlYXRlUGFuZWwoIGlkLCBmZywgYmcgKSB7XG5cblx0XHR2YXIgZGl2ID0gY3JlYXRlRWxlbWVudCggJ2RpdicsIGlkLCAncGFkZGluZzowIDAgM3B4IDNweDt0ZXh0LWFsaWduOmxlZnQ7YmFja2dyb3VuZDonICsgYmcgKTtcblxuXHRcdHZhciB0ZXh0ID0gY3JlYXRlRWxlbWVudCggJ2RpdicsIGlkICsgJ1RleHQnLCAnZm9udC1mYW1pbHk6SGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7Zm9udC1zaXplOjlweDtmb250LXdlaWdodDpib2xkO2xpbmUtaGVpZ2h0OjE1cHg7Y29sb3I6JyArIGZnICk7XG5cdFx0dGV4dC5pbm5lckhUTUwgPSBpZC50b1VwcGVyQ2FzZSgpO1xuXHRcdGRpdi5hcHBlbmRDaGlsZCggdGV4dCApO1xuXG5cdFx0dmFyIGdyYXBoID0gY3JlYXRlRWxlbWVudCggJ2RpdicsIGlkICsgJ0dyYXBoJywgJ3dpZHRoOjc0cHg7aGVpZ2h0OjMwcHg7YmFja2dyb3VuZDonICsgZmcgKTtcblx0XHRkaXYuYXBwZW5kQ2hpbGQoIGdyYXBoICk7XG5cblx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCA3NDsgaSArKyApIHtcblxuXHRcdFx0Z3JhcGguYXBwZW5kQ2hpbGQoIGNyZWF0ZUVsZW1lbnQoICdzcGFuJywgJycsICd3aWR0aDoxcHg7aGVpZ2h0OjMwcHg7ZmxvYXQ6bGVmdDtvcGFjaXR5OjAuOTtiYWNrZ3JvdW5kOicgKyBiZyApICk7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gZGl2O1xuXG5cdH1cblxuXHRmdW5jdGlvbiBzZXRNb2RlKCB2YWx1ZSApIHtcblxuXHRcdHZhciBjaGlsZHJlbiA9IGNvbnRhaW5lci5jaGlsZHJlbjtcblxuXHRcdGZvciAoIHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0Y2hpbGRyZW5bIGkgXS5zdHlsZS5kaXNwbGF5ID0gaSA9PT0gdmFsdWUgPyAnYmxvY2snIDogJ25vbmUnO1xuXG5cdFx0fVxuXG5cdFx0bW9kZSA9IHZhbHVlO1xuXG5cdH1cblxuXHRmdW5jdGlvbiB1cGRhdGVHcmFwaCggZG9tLCB2YWx1ZSApIHtcblxuXHRcdHZhciBjaGlsZCA9IGRvbS5hcHBlbmRDaGlsZCggZG9tLmZpcnN0Q2hpbGQgKTtcblx0XHRjaGlsZC5zdHlsZS5oZWlnaHQgPSBNYXRoLm1pbiggMzAsIDMwIC0gdmFsdWUgKiAzMCApICsgJ3B4JztcblxuXHR9XG5cblx0Ly9cblxuXHR2YXIgY29udGFpbmVyID0gY3JlYXRlRWxlbWVudCggJ2RpdicsICdzdGF0cycsICd3aWR0aDo4MHB4O29wYWNpdHk6MC45O2N1cnNvcjpwb2ludGVyJyApO1xuXHRjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlZG93bicsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG5cblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHNldE1vZGUoICsrIG1vZGUgJSBjb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoICk7XG5cblx0fSwgZmFsc2UgKTtcblxuXHQvLyBGUFNcblxuXHR2YXIgZnBzID0gMCwgZnBzTWluID0gSW5maW5pdHksIGZwc01heCA9IDA7XG5cblx0dmFyIGZwc0RpdiA9IGNyZWF0ZVBhbmVsKCAnZnBzJywgJyMwZmYnLCAnIzAwMicgKTtcblx0dmFyIGZwc1RleHQgPSBmcHNEaXYuY2hpbGRyZW5bIDAgXTtcblx0dmFyIGZwc0dyYXBoID0gZnBzRGl2LmNoaWxkcmVuWyAxIF07XG5cblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKCBmcHNEaXYgKTtcblxuXHQvLyBNU1xuXG5cdHZhciBtcyA9IDAsIG1zTWluID0gSW5maW5pdHksIG1zTWF4ID0gMDtcblxuXHR2YXIgbXNEaXYgPSBjcmVhdGVQYW5lbCggJ21zJywgJyMwZjAnLCAnIzAyMCcgKTtcblx0dmFyIG1zVGV4dCA9IG1zRGl2LmNoaWxkcmVuWyAwIF07XG5cdHZhciBtc0dyYXBoID0gbXNEaXYuY2hpbGRyZW5bIDEgXTtcblxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoIG1zRGl2ICk7XG5cblx0Ly8gTUVNXG5cblx0aWYgKCBzZWxmLnBlcmZvcm1hbmNlICYmIHNlbGYucGVyZm9ybWFuY2UubWVtb3J5ICkge1xuXG5cdFx0dmFyIG1lbSA9IDAsIG1lbU1pbiA9IEluZmluaXR5LCBtZW1NYXggPSAwO1xuXG5cdFx0dmFyIG1lbURpdiA9IGNyZWF0ZVBhbmVsKCAnbWInLCAnI2YwOCcsICcjMjAxJyApO1xuXHRcdHZhciBtZW1UZXh0ID0gbWVtRGl2LmNoaWxkcmVuWyAwIF07XG5cdFx0dmFyIG1lbUdyYXBoID0gbWVtRGl2LmNoaWxkcmVuWyAxIF07XG5cblx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQoIG1lbURpdiApO1xuXG5cdH1cblxuXHQvL1xuXG5cdHNldE1vZGUoIG1vZGUgKTtcblxuXHRyZXR1cm4ge1xuXG5cdFx0UkVWSVNJT046IDE0LFxuXG5cdFx0ZG9tRWxlbWVudDogY29udGFpbmVyLFxuXG5cdFx0c2V0TW9kZTogc2V0TW9kZSxcblxuXHRcdGJlZ2luOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHN0YXJ0VGltZSA9IG5vdygpO1xuXG5cdFx0fSxcblxuXHRcdGVuZDogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHR2YXIgdGltZSA9IG5vdygpO1xuXG5cdFx0XHRtcyA9IHRpbWUgLSBzdGFydFRpbWU7XG5cdFx0XHRtc01pbiA9IE1hdGgubWluKCBtc01pbiwgbXMgKTtcblx0XHRcdG1zTWF4ID0gTWF0aC5tYXgoIG1zTWF4LCBtcyApO1xuXG5cdFx0XHRtc1RleHQudGV4dENvbnRlbnQgPSAoIG1zIHwgMCApICsgJyBNUyAoJyArICggbXNNaW4gfCAwICkgKyAnLScgKyAoIG1zTWF4IHwgMCApICsgJyknO1xuXHRcdFx0dXBkYXRlR3JhcGgoIG1zR3JhcGgsIG1zIC8gMjAwICk7XG5cblx0XHRcdGZyYW1lcyArKztcblxuXHRcdFx0aWYgKCB0aW1lID4gcHJldlRpbWUgKyAxMDAwICkge1xuXG5cdFx0XHRcdGZwcyA9IE1hdGgucm91bmQoICggZnJhbWVzICogMTAwMCApIC8gKCB0aW1lIC0gcHJldlRpbWUgKSApO1xuXHRcdFx0XHRmcHNNaW4gPSBNYXRoLm1pbiggZnBzTWluLCBmcHMgKTtcblx0XHRcdFx0ZnBzTWF4ID0gTWF0aC5tYXgoIGZwc01heCwgZnBzICk7XG5cblx0XHRcdFx0ZnBzVGV4dC50ZXh0Q29udGVudCA9IGZwcyArICcgRlBTICgnICsgZnBzTWluICsgJy0nICsgZnBzTWF4ICsgJyknO1xuXHRcdFx0XHR1cGRhdGVHcmFwaCggZnBzR3JhcGgsIGZwcyAvIDEwMCApO1xuXG5cdFx0XHRcdHByZXZUaW1lID0gdGltZTtcblx0XHRcdFx0ZnJhbWVzID0gMDtcblxuXHRcdFx0XHRpZiAoIG1lbSAhPT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdFx0dmFyIGhlYXBTaXplID0gcGVyZm9ybWFuY2UubWVtb3J5LnVzZWRKU0hlYXBTaXplO1xuXHRcdFx0XHRcdHZhciBoZWFwU2l6ZUxpbWl0ID0gcGVyZm9ybWFuY2UubWVtb3J5LmpzSGVhcFNpemVMaW1pdDtcblxuXHRcdFx0XHRcdG1lbSA9IE1hdGgucm91bmQoIGhlYXBTaXplICogMC4wMDAwMDA5NTQgKTtcblx0XHRcdFx0XHRtZW1NaW4gPSBNYXRoLm1pbiggbWVtTWluLCBtZW0gKTtcblx0XHRcdFx0XHRtZW1NYXggPSBNYXRoLm1heCggbWVtTWF4LCBtZW0gKTtcblxuXHRcdFx0XHRcdG1lbVRleHQudGV4dENvbnRlbnQgPSBtZW0gKyAnIE1CICgnICsgbWVtTWluICsgJy0nICsgbWVtTWF4ICsgJyknO1xuXHRcdFx0XHRcdHVwZGF0ZUdyYXBoKCBtZW1HcmFwaCwgaGVhcFNpemUgLyBoZWFwU2l6ZUxpbWl0ICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0aW1lO1xuXG5cdFx0fSxcblxuXHRcdHVwZGF0ZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRzdGFydFRpbWUgPSB0aGlzLmVuZCgpO1xuXG5cdFx0fVxuXG5cdH07XG5cbn07XG5cbmlmICggdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgKSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBTdGF0cztcblxufVxuIiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IFN0YXRzIGZyb20gJ3N0YXRzLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdHNQZXJmb3JtYW5jZVZpZXdlciB7XG4gICAgc3RhdHMgOiBTdGF0cztcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zdGF0cyA9IG5ldyBTdGF0cygpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRzLmRvbUVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICAgICAgdGhpcy5zdGF0cy5kb21FbGVtZW50LnN0eWxlLmxlZnQgPSAnMHB4JztcbiAgICAgICAgICAgIHRoaXMuc3RhdHMuZG9tRWxlbWVudC5zdHlsZS50b3AgPSAnMHB4JztcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5zdGF0cy5kb21FbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBzZXRNb2RlKG1vZGU6IDAgfCAxKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RhdHMuc2V0TW9kZShtb2RlKTtcbiAgICB9XG4gICAgXG4gICAgYmVnaW4oKSA6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXRzLmJlZ2luKCk7XG4gICAgfVxuICAgIFxuICAgIGVuZCgpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RhdHMuZW5kKCk7XG4gICAgfVxufVxuIiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IHRocmVlIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGhyZWVTY2VuZU1hbmFnZXIge1xuICAgIHNjZW5lcyA6IEFycmF5PHRocmVlLlNjZW5lPjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zY2VuZXMgPSBbXTtcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlU2NlbmUoKSA6IG51bWJlciB7XG4gICAgICAgIC8vIENyZWF0ZSBhIG5ldyBzY2VuZSwgYWRkIGl0IHRvIHRoZSBsaXN0IG9mIHNjZW5lcyBhbmQgcmV0dXJuIGEgaGFuZGxlIChpZCkgdG8gaXRcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NlbmVzLnB1c2gobmV3IHRocmVlLlNjZW5lKCkpIC0gMTtcbiAgICB9XG4gICAgXG4gICAgZ2V0U2NlbmUoc2NlbmVJZCA6IG51bWJlcikgOiB0aHJlZS5TY2VuZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjZW5lc1tzY2VuZUlkXTtcbiAgICB9XG4gICAgXG4gICAgYWRkVG9TY2VuZShzY2VuZUlkIDogbnVtYmVyLCBvYmplY3QgOiB0aHJlZS5PYmplY3QzRCkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zY2VuZXNbc2NlbmVJZF0uYWRkKG9iamVjdCk7XG4gICAgfVxuICAgIFxuICAgIGFkZEFtYmllbnRMaWdodFRvU2NlbmUoc2NlbmVJZCA6IG51bWJlciwgY29sb3IgOiBudW1iZXIpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuc2NlbmVzW3NjZW5lSWRdLmFkZChuZXcgdGhyZWUuQW1iaWVudExpZ2h0KGNvbG9yKSk7XG4gICAgfVxuICAgIFxuICAgIGFkZERpcmVjdGlvbmFsTGlnaHRUb1NjZW5lKHNjZW5lSWQgOiBudW1iZXIsIGNvbG9yIDogbnVtYmVyLCB4IDogbnVtYmVyLCB5IDogbnVtYmVyLCB6IDogbnVtYmVyKSA6IHZvaWQge1xuICAgICAgICBjb25zdCBsaWdodCA9IG5ldyB0aHJlZS5EaXJlY3Rpb25hbExpZ2h0KGNvbG9yKTtcblx0ICAgIGxpZ2h0LnBvc2l0aW9uLnNldCh4LCB5LCB6KTtcblx0XG4gICAgICAgIHRoaXMuc2NlbmVzW3NjZW5lSWRdLmFkZChsaWdodCk7XG4gICAgfVxuICAgIFxuICAgIHJlbW92ZUZyb21TY2VuZShzY2VuZUlkIDogbnVtYmVyLCBvYmplY3QgOiB0aHJlZS5PYmplY3QzRCkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zY2VuZXNbc2NlbmVJZF0ucmVtb3ZlKG9iamVjdCk7XG4gICAgfVxufSIsIi8qIEBmbG93ICovXG5cbmltcG9ydCB0aHJlZSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRocmVlTWVzaE1hbmFnZXIge1xuICAgIG1lc2hlcyA6IEFycmF5PHRocmVlLk1lc2g+O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm1lc2hlcyA9IFtdO1xuICAgIH1cbiAgICBcbiAgICBhZGRNZXNoKG9iamVjdCA6IHRocmVlLk1lc2gpIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzaGVzLnB1c2gob2JqZWN0KSAtIDE7XG4gICAgfVxuICAgIFxuICAgIGdldE1lc2gobWVzaElkIDogbnVtYmVyKSA6IHRocmVlLk1lc2gge1xuICAgICAgICByZXR1cm4gdGhpcy5tZXNoZXNbbWVzaElkXTtcbiAgICB9XG59IiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IHRocmVlIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGhyZWVPYmplY3RNZXNoTG9hZGVyIHtcbiAgICBsb2FkZXIgIDogdGhyZWUuT2JqZWN0TG9hZGVyO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmxvYWRlciAgPSBuZXcgdGhyZWUuT2JqZWN0TG9hZGVyKCk7XG4gICAgfVxuICAgIFxuICAgIG9uUHJvZ3Jlc3MoKSB7XG4gICAgICAgIC8vIHBsYWNlaG9sZGVyXG4gICAgfVxuICAgIFxuICAgIC8vIHRvZG8gdGhpcyBub3cgcmV0dXJucyBhIHNjZW5lLi4gaW1wbGljYXRpb25zP1xuICAgIC8vIHRvZG8gYWRkIG9wdGlvbnMgYXMgYSBkZXN0cnVjdGFibGUgb2JqZWN0IC0+IHN0b3BwZWQgYnkgZmxvdzogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvaXNzdWVzLzE4M1xuICAgIGxvYWQocGF0aCA6IHN0cmluZywgb3B0aW9ucz8gOiBPYmplY3QpIDogUHJvbWlzZSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc2hhZGluZyA9IChvcHRpb25zIHx8IHsgfSkuc2hhZGluZztcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHNlbGYubG9hZGVyLmxvYWQocGF0aCwgb2JqID0+IHJlc29sdmUob2JqKSwgaW5mbyA9PiBzZWxmLm9uUHJvZ3Jlc3MoaW5mbyksIGVyciA9PiByZWplY3QoZXJyKSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4obWVzaCA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNoYWRpbmcgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc2g7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG1lc2gudHJhdmVyc2UoY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIHRocmVlLk1lc2gpIHtcbiAgICAgICAgICAgICAgICAgICBjaGlsZC5tYXRlcmlhbC5zaGFkaW5nID0gc2hhZGluZztcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gbWVzaDtcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG59IiwiLyoqXG4gKiBAcHJlc2VydmUganF1ZXJ5LXBhcmFtIChjKSAyMDE1IEtOT1dMRURHRUNPREUgfCBNSVRcbiAqL1xuLypnbG9iYWwgZGVmaW5lICovXG4oZnVuY3Rpb24gKGdsb2JhbCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBwYXJhbSA9IGZ1bmN0aW9uIChhKSB7XG4gICAgICAgIHZhciBhZGQgPSBmdW5jdGlvbiAocywgaywgdikge1xuICAgICAgICAgICAgdiA9IHR5cGVvZiB2ID09PSAnZnVuY3Rpb24nID8gdigpIDogdiA9PT0gbnVsbCA/ICcnIDogdiA9PT0gdW5kZWZpbmVkID8gJycgOiB2O1xuICAgICAgICAgICAgc1tzLmxlbmd0aF0gPSBlbmNvZGVVUklDb21wb25lbnQoaykgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodik7XG4gICAgICAgIH0sIGJ1aWxkUGFyYW1zID0gZnVuY3Rpb24gKHByZWZpeCwgb2JqLCBzKSB7XG4gICAgICAgICAgICB2YXIgaSwgbGVuLCBrZXk7XG5cbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IG9iai5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBidWlsZFBhcmFtcyhwcmVmaXggKyAnWycgKyAodHlwZW9mIG9ialtpXSA9PT0gJ29iamVjdCcgPyBpIDogJycpICsgJ10nLCBvYmpbaV0sIHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqICYmIG9iai50b1N0cmluZygpID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICAgICAgICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmVmaXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZFBhcmFtcyhwcmVmaXggKyAnWycgKyBrZXkgKyAnXScsIG9ialtrZXldLCBzLCBhZGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZFBhcmFtcyhrZXksIG9ialtrZXldLCBzLCBhZGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChwcmVmaXgpIHtcbiAgICAgICAgICAgICAgICBhZGQocywgcHJlZml4LCBvYmopO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkKHMsIGtleSwgb2JqW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYnVpbGRQYXJhbXMoJycsIGEsIFtdKS5qb2luKCcmJykucmVwbGFjZSgvJTIwL2csICcrJyk7XG4gICAgfTtcblxuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gcGFyYW07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyYW07XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGdsb2JhbC5wYXJhbSA9IHBhcmFtO1xuICAgIH1cblxufSh0aGlzKSk7XG4iLCIvKlxuICogUGlua3lTd2Vhci5qcyAyLjIuMiAtIE1pbmltYWxpc3RpYyBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUHJvbWlzZXMvQSsgc3BlY1xuICogXG4gKiBQdWJsaWMgRG9tYWluLiBVc2UsIG1vZGlmeSBhbmQgZGlzdHJpYnV0ZSBpdCBhbnkgd2F5IHlvdSBsaWtlLiBObyBhdHRyaWJ1dGlvbiByZXF1aXJlZC5cbiAqXG4gKiBOTyBXQVJSQU5UWSBFWFBSRVNTRUQgT1IgSU1QTElFRC4gVVNFIEFUIFlPVVIgT1dOIFJJU0suXG4gKlxuICogUGlua3lTd2VhciBpcyBhIHZlcnkgc21hbGwgaW1wbGVtZW50YXRpb24gb2YgdGhlIFByb21pc2VzL0ErIHNwZWNpZmljYXRpb24uIEFmdGVyIGNvbXBpbGF0aW9uIHdpdGggdGhlXG4gKiBHb29nbGUgQ2xvc3VyZSBDb21waWxlciBhbmQgZ3ppcHBpbmcgaXQgd2VpZ2hzIGxlc3MgdGhhbiA1MDAgYnl0ZXMuIEl0IGlzIGJhc2VkIG9uIHRoZSBpbXBsZW1lbnRhdGlvbiBmb3IgXG4gKiBNaW5pZmllZC5qcyBhbmQgc2hvdWxkIGJlIHBlcmZlY3QgZm9yIGVtYmVkZGluZy4gXG4gKlxuICpcbiAqIFBpbmt5U3dlYXIgaGFzIGp1c3QgdGhyZWUgZnVuY3Rpb25zLlxuICpcbiAqIFRvIGNyZWF0ZSBhIG5ldyBwcm9taXNlIGluIHBlbmRpbmcgc3RhdGUsIGNhbGwgcGlua3lTd2VhcigpOlxuICogICAgICAgICB2YXIgcHJvbWlzZSA9IHBpbmt5U3dlYXIoKTtcbiAqXG4gKiBUaGUgcmV0dXJuZWQgb2JqZWN0IGhhcyBhIFByb21pc2VzL0ErIGNvbXBhdGlibGUgdGhlbigpIGltcGxlbWVudGF0aW9uOlxuICogICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7IGFsZXJ0KFwiU3VjY2VzcyFcIik7IH0sIGZ1bmN0aW9uKHZhbHVlKSB7IGFsZXJ0KFwiRmFpbHVyZSFcIik7IH0pO1xuICpcbiAqXG4gKiBUaGUgcHJvbWlzZSByZXR1cm5lZCBieSBwaW5reVN3ZWFyKCkgaXMgYSBmdW5jdGlvbi4gVG8gZnVsZmlsbCB0aGUgcHJvbWlzZSwgY2FsbCB0aGUgZnVuY3Rpb24gd2l0aCB0cnVlIGFzIGZpcnN0IGFyZ3VtZW50IGFuZFxuICogYW4gb3B0aW9uYWwgYXJyYXkgb2YgdmFsdWVzIHRvIHBhc3MgdG8gdGhlIHRoZW4oKSBoYW5kbGVyLiBCeSBwdXR0aW5nIG1vcmUgdGhhbiBvbmUgdmFsdWUgaW4gdGhlIGFycmF5LCB5b3UgY2FuIHBhc3MgbW9yZSB0aGFuIG9uZVxuICogdmFsdWUgdG8gdGhlIHRoZW4oKSBoYW5kbGVycy4gSGVyZSBhbiBleGFtcGxlIHRvIGZ1bGZpbGwgYSBwcm9tc2lzZSwgdGhpcyB0aW1lIHdpdGggb25seSBvbmUgYXJndW1lbnQ6IFxuICogICAgICAgICBwcm9taXNlKHRydWUsIFs0Ml0pO1xuICpcbiAqIFdoZW4gdGhlIHByb21pc2UgaGFzIGJlZW4gcmVqZWN0ZWQsIGNhbGwgaXQgd2l0aCBmYWxzZS4gQWdhaW4sIHRoZXJlIG1heSBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50IGZvciB0aGUgdGhlbigpIGhhbmRsZXI6XG4gKiAgICAgICAgIHByb21pc2UodHJ1ZSwgWzYsIDYsIDZdKTtcbiAqICAgICAgICAgXG4gKiBZb3UgY2FuIG9idGFpbiB0aGUgcHJvbWlzZSdzIGN1cnJlbnQgc3RhdGUgYnkgY2FsbGluZyB0aGUgZnVuY3Rpb24gd2l0aG91dCBhcmd1bWVudHMuIEl0IHdpbGwgYmUgdHJ1ZSBpZiBmdWxmaWxsZWQsXG4gKiBmYWxzZSBpZiByZWplY3RlZCwgYW5kIG90aGVyd2lzZSB1bmRlZmluZWQuXG4gKiBcdFx0ICAgdmFyIHN0YXRlID0gcHJvbWlzZSgpOyBcbiAqIFxuICogaHR0cHM6Ly9naXRodWIuY29tL3RpbWphbnNlbi9QaW5reVN3ZWFyLmpzXG4gKi9cbihmdW5jdGlvbih0YXJnZXQpIHtcblx0dmFyIHVuZGVmO1xuXG5cdGZ1bmN0aW9uIGlzRnVuY3Rpb24oZikge1xuXHRcdHJldHVybiB0eXBlb2YgZiA9PSAnZnVuY3Rpb24nO1xuXHR9XG5cdGZ1bmN0aW9uIGlzT2JqZWN0KGYpIHtcblx0XHRyZXR1cm4gdHlwZW9mIGYgPT0gJ29iamVjdCc7XG5cdH1cblx0ZnVuY3Rpb24gZGVmZXIoY2FsbGJhY2spIHtcblx0XHRpZiAodHlwZW9mIHNldEltbWVkaWF0ZSAhPSAndW5kZWZpbmVkJylcblx0XHRcdHNldEltbWVkaWF0ZShjYWxsYmFjayk7XG5cdFx0ZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzc1snbmV4dFRpY2snXSlcblx0XHRcdHByb2Nlc3NbJ25leHRUaWNrJ10oY2FsbGJhY2spO1xuXHRcdGVsc2Vcblx0XHRcdHNldFRpbWVvdXQoY2FsbGJhY2ssIDApO1xuXHR9XG5cblx0dGFyZ2V0WzBdW3RhcmdldFsxXV0gPSBmdW5jdGlvbiBwaW5reVN3ZWFyKGV4dGVuZCkge1xuXHRcdHZhciBzdGF0ZTsgICAgICAgICAgIC8vIHVuZGVmaW5lZC9udWxsID0gcGVuZGluZywgdHJ1ZSA9IGZ1bGZpbGxlZCwgZmFsc2UgPSByZWplY3RlZFxuXHRcdHZhciB2YWx1ZXMgPSBbXTsgICAgIC8vIGFuIGFycmF5IG9mIHZhbHVlcyBhcyBhcmd1bWVudHMgZm9yIHRoZSB0aGVuKCkgaGFuZGxlcnNcblx0XHR2YXIgZGVmZXJyZWQgPSBbXTsgICAvLyBmdW5jdGlvbnMgdG8gY2FsbCB3aGVuIHNldCgpIGlzIGludm9rZWRcblxuXHRcdHZhciBzZXQgPSBmdW5jdGlvbihuZXdTdGF0ZSwgbmV3VmFsdWVzKSB7XG5cdFx0XHRpZiAoc3RhdGUgPT0gbnVsbCAmJiBuZXdTdGF0ZSAhPSBudWxsKSB7XG5cdFx0XHRcdHN0YXRlID0gbmV3U3RhdGU7XG5cdFx0XHRcdHZhbHVlcyA9IG5ld1ZhbHVlcztcblx0XHRcdFx0aWYgKGRlZmVycmVkLmxlbmd0aClcblx0XHRcdFx0XHRkZWZlcihmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspXG5cdFx0XHRcdFx0XHRcdGRlZmVycmVkW2ldKCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cdFx0fTtcblxuXHRcdHNldFsndGhlbiddID0gZnVuY3Rpb24gKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG5cdFx0XHR2YXIgcHJvbWlzZTIgPSBwaW5reVN3ZWFyKGV4dGVuZCk7XG5cdFx0XHR2YXIgY2FsbENhbGxiYWNrcyA9IGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdHRyeSB7XG5cdCAgICBcdFx0XHR2YXIgZiA9IChzdGF0ZSA/IG9uRnVsZmlsbGVkIDogb25SZWplY3RlZCk7XG5cdCAgICBcdFx0XHRpZiAoaXNGdW5jdGlvbihmKSkge1xuXHRcdCAgIFx0XHRcdFx0ZnVuY3Rpb24gcmVzb2x2ZSh4KSB7XG5cdFx0XHRcdFx0XHQgICAgdmFyIHRoZW4sIGNiQ2FsbGVkID0gMDtcblx0XHQgICBcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0ICAgXHRcdFx0XHRpZiAoeCAmJiAoaXNPYmplY3QoeCkgfHwgaXNGdW5jdGlvbih4KSkgJiYgaXNGdW5jdGlvbih0aGVuID0geFsndGhlbiddKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoeCA9PT0gcHJvbWlzZTIpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGVuWydjYWxsJ10oeCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbigpIHsgaWYgKCFjYkNhbGxlZCsrKSByZXNvbHZlLmFwcGx5KHVuZGVmLGFyZ3VtZW50cyk7IH0gLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uKHZhbHVlKXsgaWYgKCFjYkNhbGxlZCsrKSBwcm9taXNlMihmYWxzZSxbdmFsdWVdKTt9KTtcblx0XHRcdFx0ICAgXHRcdFx0XHR9XG5cdFx0XHRcdCAgIFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHQgICBcdFx0XHRcdFx0cHJvbWlzZTIodHJ1ZSwgYXJndW1lbnRzKTtcblx0XHQgICBcdFx0XHRcdFx0fVxuXHRcdCAgIFx0XHRcdFx0XHRjYXRjaChlKSB7XG5cdFx0ICAgXHRcdFx0XHRcdFx0aWYgKCFjYkNhbGxlZCsrKVxuXHRcdCAgIFx0XHRcdFx0XHRcdFx0cHJvbWlzZTIoZmFsc2UsIFtlXSk7XG5cdFx0ICAgXHRcdFx0XHRcdH1cblx0XHQgICBcdFx0XHRcdH1cblx0XHQgICBcdFx0XHRcdHJlc29sdmUoZi5hcHBseSh1bmRlZiwgdmFsdWVzIHx8IFtdKSk7XG5cdFx0ICAgXHRcdFx0fVxuXHRcdCAgIFx0XHRcdGVsc2Vcblx0XHQgICBcdFx0XHRcdHByb21pc2UyKHN0YXRlLCB2YWx1ZXMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0cHJvbWlzZTIoZmFsc2UsIFtlXSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRpZiAoc3RhdGUgIT0gbnVsbClcblx0XHRcdFx0ZGVmZXIoY2FsbENhbGxiYWNrcyk7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdGRlZmVycmVkLnB1c2goY2FsbENhbGxiYWNrcyk7XG5cdFx0XHRyZXR1cm4gcHJvbWlzZTI7XG5cdFx0fTtcbiAgICAgICAgaWYoZXh0ZW5kKXtcbiAgICAgICAgICAgIHNldCA9IGV4dGVuZChzZXQpO1xuICAgICAgICB9XG5cdFx0cmV0dXJuIHNldDtcblx0fTtcbn0pKHR5cGVvZiBtb2R1bGUgPT0gJ3VuZGVmaW5lZCcgPyBbd2luZG93LCAncGlua3lTd2VhciddIDogW21vZHVsZSwgJ2V4cG9ydHMnXSk7XG5cbiIsIi8qISBxd2VzdCA0LjMuMiAoaHR0cHM6Ly9naXRodWIuY29tL3B5cnNtay9xd2VzdCkgKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cdHZhciBnbG9iYWwgPSB3aW5kb3cgfHwgdGhpcyxcclxuXHRcdHBpbmt5c3dlYXIgPSByZXF1aXJlKCdwaW5reXN3ZWFyJyksXHJcblx0XHRqcGFyYW0gPSByZXF1aXJlKCdqcXVlcnktcGFyYW0nKSxcclxuXHRcdGRlZmF1bHRPcHRpb25zID0ge30sXHJcblx0XHQvLyBEZWZhdWx0IHJlc3BvbnNlIHR5cGUgZm9yIFhEUiBpbiBhdXRvIG1vZGVcclxuXHRcdGRlZmF1bHRYZHJSZXNwb25zZVR5cGUgPSAnanNvbicsXHJcblx0XHQvLyBEZWZhdWx0IGRhdGEgdHlwZVxyXG5cdFx0ZGVmYXVsdERhdGFUeXBlID0gJ3Bvc3QnLFxyXG5cdFx0Ly8gVmFyaWFibGVzIGZvciBsaW1pdCBtZWNoYW5pc21cclxuXHRcdGxpbWl0ID0gbnVsbCxcclxuXHRcdHJlcXVlc3RzID0gMCxcclxuXHRcdHJlcXVlc3Rfc3RhY2sgPSBbXSxcclxuXHRcdC8vIEdldCBYTUxIdHRwUmVxdWVzdCBvYmplY3RcclxuXHRcdGdldFhIUiA9IGdsb2JhbC5YTUxIdHRwUmVxdWVzdD8gZnVuY3Rpb24oKXtcclxuXHRcdFx0cmV0dXJuIG5ldyBnbG9iYWwuWE1MSHR0cFJlcXVlc3QoKTtcclxuXHRcdH06IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTWljcm9zb2Z0LlhNTEhUVFAnKTtcclxuXHRcdH0sXHJcblx0XHQvLyBHdWVzcyBYSFIgdmVyc2lvblxyXG5cdFx0eGhyMiA9IChnZXRYSFIoKS5yZXNwb25zZVR5cGU9PT0nJyksXHJcblxyXG5cdC8vIENvcmUgZnVuY3Rpb25cclxuXHRxd2VzdCA9IGZ1bmN0aW9uKG1ldGhvZCwgdXJsLCBkYXRhLCBvcHRpb25zLCBiZWZvcmUpIHtcclxuXHRcdC8vIEZvcm1hdFxyXG5cdFx0bWV0aG9kID0gbWV0aG9kLnRvVXBwZXJDYXNlKCk7XHJcblx0XHRkYXRhID0gZGF0YSB8fCBudWxsO1xyXG5cdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0XHRmb3IodmFyIG5hbWUgaW4gZGVmYXVsdE9wdGlvbnMpIHtcclxuXHRcdFx0aWYoIShuYW1lIGluIG9wdGlvbnMpKSB7XHJcblx0XHRcdFx0aWYodHlwZW9mIGRlZmF1bHRPcHRpb25zW25hbWVdID09ICdvYmplY3QnICYmIHR5cGVvZiBvcHRpb25zW25hbWVdID09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0XHRmb3IodmFyIG5hbWUyIGluIGRlZmF1bHRPcHRpb25zW25hbWVdKSB7XHJcblx0XHRcdFx0XHRcdG9wdGlvbnNbbmFtZV1bbmFtZTJdID0gZGVmYXVsdE9wdGlvbnNbbmFtZV1bbmFtZTJdO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdG9wdGlvbnNbbmFtZV0gPSBkZWZhdWx0T3B0aW9uc1tuYW1lXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBEZWZpbmUgdmFyaWFibGVzXHJcblx0XHR2YXIgbmF0aXZlUmVzcG9uc2VQYXJzaW5nID0gZmFsc2UsXHJcblx0XHRcdGNyb3NzT3JpZ2luLFxyXG5cdFx0XHR4aHIsXHJcblx0XHRcdHhkciA9IGZhbHNlLFxyXG5cdFx0XHR0aW1lb3V0SW50ZXJ2YWwsXHJcblx0XHRcdGFib3J0ZWQgPSBmYWxzZSxcclxuXHRcdFx0YXR0ZW1wdHMgPSAwLFxyXG5cdFx0XHRoZWFkZXJzID0ge30sXHJcblx0XHRcdG1pbWVUeXBlcyA9IHtcclxuXHRcdFx0XHR0ZXh0OiAnKi8qJyxcclxuXHRcdFx0XHR4bWw6ICd0ZXh0L3htbCcsXHJcblx0XHRcdFx0anNvbjogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG5cdFx0XHRcdHBvc3Q6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxyXG5cdFx0XHRcdGRvY3VtZW50OiAndGV4dC9odG1sJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRhY2NlcHQgPSB7XHJcblx0XHRcdFx0dGV4dDogJyovKicsXHJcblx0XHRcdFx0eG1sOiAnYXBwbGljYXRpb24veG1sOyBxPTEuMCwgdGV4dC94bWw7IHE9MC44LCAqLyo7IHE9MC4xJyxcclxuXHRcdFx0XHRqc29uOiAnYXBwbGljYXRpb24vanNvbjsgcT0xLjAsIHRleHQvKjsgcT0wLjgsICovKjsgcT0wLjEnXHJcblx0XHRcdH0sXHJcblx0XHRcdGksIGosXHJcblx0XHRcdHNlcmlhbGl6ZWQsXHJcblx0XHRcdHJlc3BvbnNlLFxyXG5cdFx0XHRzZW5kaW5nID0gZmFsc2UsXHJcblx0XHRcdGRlbGF5ZWQgPSBmYWxzZSxcclxuXHRcdFx0dGltZW91dF9zdGFydCxcclxuXHJcblx0XHQvLyBDcmVhdGUgdGhlIHByb21pc2VcclxuXHRcdHByb21pc2UgPSBwaW5reXN3ZWFyKGZ1bmN0aW9uKHBpbmt5KSB7XHJcblx0XHRcdHBpbmt5LmFib3J0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0aWYoeGhyKSB7XHJcblx0XHRcdFx0XHR4aHIuYWJvcnQoKTtcclxuXHRcdFx0XHRcdGFib3J0ZWQgPSB0cnVlO1xyXG5cdFx0XHRcdFx0LS1yZXF1ZXN0cztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblx0XHRcdHBpbmt5LnNlbmQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQvLyBQcmV2ZW50IGZ1cnRoZXIgc2VuZCgpIGNhbGxzXHJcblx0XHRcdFx0aWYoc2VuZGluZykge1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBSZWFjaGVkIHJlcXVlc3QgbGltaXQsIGdldCBvdXQhXHJcblx0XHRcdFx0aWYocmVxdWVzdHMgPT0gbGltaXQpIHtcclxuXHRcdFx0XHRcdHJlcXVlc3Rfc3RhY2sucHVzaChwaW5reSk7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIFZlcmlmeSBpZiB0aGUgcmVxdWVzdCBoYXMgbm90IGJlZW4gcHJldmlvdXNseSBhYm9ydGVkXHJcblx0XHRcdFx0aWYoYWJvcnRlZCkge1xyXG5cdFx0XHRcdFx0aWYocmVxdWVzdF9zdGFjay5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0cmVxdWVzdF9zdGFjay5zaGlmdCgpLnNlbmQoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gVGhlIHNlbmRpbmcgaXMgcnVubmluZ1xyXG5cdFx0XHRcdCsrcmVxdWVzdHM7XHJcblx0XHRcdFx0c2VuZGluZyA9IHRydWU7XHJcblx0XHRcdFx0Ly8gU3RhcnQgdGhlIGNocm9ub1xyXG5cdFx0XHRcdHRpbWVvdXRfc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHRcdFx0XHQvLyBHZXQgWEhSIG9iamVjdFxyXG5cdFx0XHRcdHhociA9IGdldFhIUigpO1xyXG5cdFx0XHRcdGlmKGNyb3NzT3JpZ2luKSB7XHJcblx0XHRcdFx0XHRpZighKCd3aXRoQ3JlZGVudGlhbHMnIGluIHhocikgJiYgZ2xvYmFsLlhEb21haW5SZXF1ZXN0KSB7XHJcblx0XHRcdFx0XHRcdHhociA9IG5ldyBYRG9tYWluUmVxdWVzdCgpOyAvLyBDT1JTIHdpdGggSUU4LzlcclxuXHRcdFx0XHRcdFx0eGRyID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0aWYobWV0aG9kIT0nR0VUJyAmJiBtZXRob2QhPSdQT1NUJykge1xyXG5cdFx0XHRcdFx0XHRcdG1ldGhvZCA9ICdQT1NUJztcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBPcGVuIGNvbm5lY3Rpb25cclxuXHRcdFx0XHRpZih4ZHIpIHtcclxuXHRcdFx0XHRcdHhoci5vcGVuKG1ldGhvZCwgdXJsKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHR4aHIub3BlbihtZXRob2QsIHVybCwgb3B0aW9ucy5hc3luYywgb3B0aW9ucy51c2VyLCBvcHRpb25zLnBhc3N3b3JkKTtcclxuXHRcdFx0XHRcdGlmKHhocjIgJiYgb3B0aW9ucy5hc3luYykge1xyXG5cdFx0XHRcdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gb3B0aW9ucy53aXRoQ3JlZGVudGlhbHM7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIFNldCBoZWFkZXJzXHJcblx0XHRcdFx0aWYoIXhkcikge1xyXG5cdFx0XHRcdFx0Zm9yKHZhciBpIGluIGhlYWRlcnMpIHtcclxuXHRcdFx0XHRcdFx0aWYoaGVhZGVyc1tpXSkge1xyXG5cdFx0XHRcdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKGksIGhlYWRlcnNbaV0pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIFZlcmlmeSBpZiB0aGUgcmVzcG9uc2UgdHlwZSBpcyBzdXBwb3J0ZWQgYnkgdGhlIGN1cnJlbnQgYnJvd3NlclxyXG5cdFx0XHRcdGlmKHhocjIgJiYgb3B0aW9ucy5yZXNwb25zZVR5cGUhPSdhdXRvJykge1xyXG5cdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMucmVzcG9uc2VUeXBlO1xyXG5cdFx0XHRcdFx0XHRuYXRpdmVSZXNwb25zZVBhcnNpbmcgPSAoeGhyLnJlc3BvbnNlVHlwZSA9PSBvcHRpb25zLnJlc3BvbnNlVHlwZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjYXRjaChlKXt9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIFBsdWcgcmVzcG9uc2UgaGFuZGxlclxyXG5cdFx0XHRcdGlmKHhocjIgfHwgeGRyKSB7XHJcblx0XHRcdFx0XHR4aHIub25sb2FkID0gaGFuZGxlUmVzcG9uc2U7XHJcblx0XHRcdFx0XHR4aHIub25lcnJvciA9IGhhbmRsZUVycm9yO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0aWYoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xyXG5cdFx0XHRcdFx0XHRcdGhhbmRsZVJlc3BvbnNlKCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIE92ZXJyaWRlIG1pbWUgdHlwZSB0byBlbnN1cmUgdGhlIHJlc3BvbnNlIGlzIHdlbGwgcGFyc2VkXHJcblx0XHRcdFx0aWYob3B0aW9ucy5yZXNwb25zZVR5cGUgIT0gJ2F1dG8nICYmICdvdmVycmlkZU1pbWVUeXBlJyBpbiB4aHIpIHtcclxuXHRcdFx0XHRcdHhoci5vdmVycmlkZU1pbWVUeXBlKG1pbWVUeXBlc1tvcHRpb25zLnJlc3BvbnNlVHlwZV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBSdW4gJ2JlZm9yZScgY2FsbGJhY2tcclxuXHRcdFx0XHRpZihiZWZvcmUpIHtcclxuXHRcdFx0XHRcdGJlZm9yZSh4aHIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBTZW5kIHJlcXVlc3RcclxuXHRcdFx0XHRpZih4ZHIpIHtcclxuXHRcdFx0XHRcdC8vIGh0dHA6Ly9jeXByZXNzbm9ydGguY29tL3Byb2dyYW1taW5nL2ludGVybmV0LWV4cGxvcmVyLWFib3J0aW5nLWFqYXgtcmVxdWVzdHMtZml4ZWQvXHJcblx0XHRcdFx0XHR4aHIub25wcm9ncmVzcyA9IGZ1bmN0aW9uKCl7fTtcclxuXHRcdFx0XHRcdHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpe307XHJcblx0XHRcdFx0XHR4aHIub25lcnJvciA9IGZ1bmN0aW9uKCl7fTtcclxuXHRcdFx0XHRcdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9YRG9tYWluUmVxdWVzdFxyXG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0eGhyLnNlbmQobWV0aG9kICE9ICdHRVQnPyBkYXRhIDogbnVsbCk7XHJcblx0XHRcdFx0XHR9LCAwKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHR4aHIuc2VuZChtZXRob2QgIT0gJ0dFVCcgPyBkYXRhIDogbnVsbCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cdFx0XHRyZXR1cm4gcGlua3k7XHJcblx0XHR9KSxcclxuXHJcblx0XHQvLyBIYW5kbGUgdGhlIHJlc3BvbnNlXHJcblx0XHRoYW5kbGVSZXNwb25zZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHQvLyBQcmVwYXJlXHJcblx0XHRcdHZhciBpLCByZXNwb25zZVR5cGU7XHJcblx0XHRcdHNlbmRpbmcgPSBmYWxzZTtcclxuXHRcdFx0Ly8gTGF1bmNoIG5leHQgc3RhY2tlZCByZXF1ZXN0XHJcblx0XHRcdGlmKHJlcXVlc3Rfc3RhY2subGVuZ3RoKSB7XHJcblx0XHRcdFx0cmVxdWVzdF9zdGFjay5zaGlmdCgpLnNlbmQoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBWZXJpZnkgaWYgdGhlIHJlcXVlc3QgaGFzIG5vdCBiZWVuIHByZXZpb3VzbHkgYWJvcnRlZFxyXG5cdFx0XHRpZihhYm9ydGVkKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vIERlY3JlYXNlIG51bWJlciBvZiByZXF1ZXN0c1xyXG5cdFx0XHQtLXJlcXVlc3RzO1xyXG5cdFx0XHQvLyBWZXJpZnkgdGltZW91dCBzdGF0ZVxyXG5cdFx0XHQvLyAtLS0gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNzI4NzcwNi9pZS05LWphdmFzY3JpcHQtZXJyb3ItYzAwYzAyM2ZcclxuXHRcdFx0aWYobmV3IERhdGUoKS5nZXRUaW1lKCktdGltZW91dF9zdGFydCA+PSBvcHRpb25zLnRpbWVvdXQpIHtcclxuXHRcdFx0XHRpZighb3B0aW9ucy5hdHRlbXB0cyB8fCArK2F0dGVtcHRzIT1vcHRpb25zLmF0dGVtcHRzKSB7XHJcblx0XHRcdFx0XHRwcm9taXNlLnNlbmQoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRwcm9taXNlKGZhbHNlLCBbbmV3IEVycm9yKCdUaW1lb3V0ICgnK3VybCsnKScpLCB4aHIsIHJlc3BvbnNlXSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBIYW5kbGUgcmVzcG9uc2VcclxuXHRcdFx0dHJ5e1xyXG5cdFx0XHRcdC8vIFByb2Nlc3MgcmVzcG9uc2VcclxuXHRcdFx0XHRpZihuYXRpdmVSZXNwb25zZVBhcnNpbmcgJiYgJ3Jlc3BvbnNlJyBpbiB4aHIgJiYgeGhyLnJlc3BvbnNlIT09bnVsbCkge1xyXG5cdFx0XHRcdFx0cmVzcG9uc2UgPSB4aHIucmVzcG9uc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2V7XHJcblx0XHRcdFx0XHQvLyBHdWVzcyByZXNwb25zZSB0eXBlXHJcblx0XHRcdFx0XHRyZXNwb25zZVR5cGUgPSBvcHRpb25zLnJlc3BvbnNlVHlwZTtcclxuXHRcdFx0XHRcdGlmKHJlc3BvbnNlVHlwZSA9PSAnYXV0bycpIHtcclxuXHRcdFx0XHRcdFx0aWYoeGRyKSB7XHJcblx0XHRcdFx0XHRcdFx0cmVzcG9uc2VUeXBlID0gZGVmYXVsdFhkclJlc3BvbnNlVHlwZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgY3QgPSB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpIHx8ICcnO1xyXG5cdFx0XHRcdFx0XHRcdGlmKGN0LmluZGV4T2YobWltZVR5cGVzLmpzb24pPi0xKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZVR5cGUgPSAnanNvbic7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGVsc2UgaWYoY3QuaW5kZXhPZihtaW1lVHlwZXMueG1sKT4tMSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2VUeXBlID0gJ3htbCc7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2VUeXBlID0gJ3RleHQnO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Ly8gSGFuZGxlIHJlc3BvbnNlIHR5cGVcclxuXHRcdFx0XHRcdHN3aXRjaChyZXNwb25zZVR5cGUpIHtcclxuXHRcdFx0XHRcdFx0Y2FzZSAnanNvbic6XHJcblx0XHRcdFx0XHRcdFx0aWYoeGhyLnJlc3BvbnNlVGV4dC5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmKCdKU09OJyBpbiBnbG9iYWwpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBldmFsKCcoJyt4aHIucmVzcG9uc2VUZXh0KycpJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdGNhdGNoKGUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgXCJFcnJvciB3aGlsZSBwYXJzaW5nIEpTT04gYm9keSA6IFwiK2U7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRjYXNlICd4bWwnOlxyXG5cdFx0XHRcdFx0XHRcdC8vIEJhc2VkIG9uIGpRdWVyeSdzIHBhcnNlWE1MKCkgZnVuY3Rpb25cclxuXHRcdFx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gU3RhbmRhcmRcclxuXHRcdFx0XHRcdFx0XHRcdGlmKGdsb2JhbC5ET01QYXJzZXIpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgPSAobmV3IERPTVBhcnNlcigpKS5wYXJzZUZyb21TdHJpbmcoeGhyLnJlc3BvbnNlVGV4dCwndGV4dC94bWwnKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdC8vIElFPDlcclxuXHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9IG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MRE9NJyk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlLmFzeW5jID0gJ2ZhbHNlJztcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UubG9hZFhNTCh4aHIucmVzcG9uc2VUZXh0KTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0Y2F0Y2goZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgPSB1bmRlZmluZWQ7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGlmKCFyZXNwb25zZSB8fCAhcmVzcG9uc2UuZG9jdW1lbnRFbGVtZW50IHx8IHJlc3BvbnNlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwYXJzZXJlcnJvcicpLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0dGhyb3cgJ0ludmFsaWQgWE1MJztcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgPSB4aHIucmVzcG9uc2VUZXh0O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBMYXRlIHN0YXR1cyBjb2RlIHZlcmlmaWNhdGlvbiB0byBhbGxvdyBwYXNzaW5nIGRhdGEgd2hlbiwgcGVyIGV4YW1wbGUsIGEgNDA5IGlzIHJldHVybmVkXHJcblx0XHRcdFx0Ly8gLS0tIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwMDQ2OTcyL21zaWUtcmV0dXJucy1zdGF0dXMtY29kZS1vZi0xMjIzLWZvci1hamF4LXJlcXVlc3RcclxuXHRcdFx0XHRpZignc3RhdHVzJyBpbiB4aHIgJiYgIS9eMnwxMjIzLy50ZXN0KHhoci5zdGF0dXMpKSB7XHJcblx0XHRcdFx0XHR0aHJvdyB4aHIuc3RhdHVzKycgKCcreGhyLnN0YXR1c1RleHQrJyknO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBGdWxmaWxsZWRcclxuXHRcdFx0XHRwcm9taXNlKHRydWUsIFt4aHIsIHJlc3BvbnNlXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2F0Y2goZSkge1xyXG5cdFx0XHRcdC8vIFJlamVjdGVkXHJcblx0XHRcdFx0cHJvbWlzZShmYWxzZSwgW2UsIHhociwgcmVzcG9uc2VdKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHJcblx0XHQvLyBIYW5kbGUgZXJyb3JzXHJcblx0XHRoYW5kbGVFcnJvciA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0aWYoIWFib3J0ZWQpIHtcclxuXHRcdFx0XHQtLXJlcXVlc3RzO1xyXG5cdFx0XHRcdHByb21pc2UoZmFsc2UsIFtuZXcgRXJyb3IoJ0Nvbm5lY3Rpb24gYWJvcnRlZCcpLCB4aHIsIG51bGxdKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBOb3JtYWxpemUgb3B0aW9uc1xyXG5cdFx0b3B0aW9ucy5hc3luYyA9ICdhc3luYycgaW4gb3B0aW9ucz8hIW9wdGlvbnMuYXN5bmM6dHJ1ZTtcclxuXHRcdG9wdGlvbnMuY2FjaGUgPSAnY2FjaGUnIGluIG9wdGlvbnM/ISFvcHRpb25zLmNhY2hlOmZhbHNlO1xyXG5cdFx0b3B0aW9ucy5kYXRhVHlwZSA9ICdkYXRhVHlwZScgaW4gb3B0aW9ucz9vcHRpb25zLmRhdGFUeXBlLnRvTG93ZXJDYXNlKCk6ZGVmYXVsdERhdGFUeXBlO1xyXG5cdFx0b3B0aW9ucy5yZXNwb25zZVR5cGUgPSAncmVzcG9uc2VUeXBlJyBpbiBvcHRpb25zP29wdGlvbnMucmVzcG9uc2VUeXBlLnRvTG93ZXJDYXNlKCk6J2F1dG8nO1xyXG5cdFx0b3B0aW9ucy51c2VyID0gb3B0aW9ucy51c2VyIHx8ICcnO1xyXG5cdFx0b3B0aW9ucy5wYXNzd29yZCA9IG9wdGlvbnMucGFzc3dvcmQgfHwgJyc7XHJcblx0XHRvcHRpb25zLndpdGhDcmVkZW50aWFscyA9ICEhb3B0aW9ucy53aXRoQ3JlZGVudGlhbHM7XHJcblx0XHRvcHRpb25zLnRpbWVvdXQgPSAndGltZW91dCcgaW4gb3B0aW9ucz9wYXJzZUludChvcHRpb25zLnRpbWVvdXQsMTApOjMwMDAwO1xyXG5cdFx0b3B0aW9ucy5hdHRlbXB0cyA9ICdhdHRlbXB0cycgaW4gb3B0aW9ucz9wYXJzZUludChvcHRpb25zLmF0dGVtcHRzLDEwKToxO1xyXG5cclxuXHRcdC8vIEd1ZXNzIGlmIHdlJ3JlIGRlYWxpbmcgd2l0aCBhIGNyb3NzLW9yaWdpbiByZXF1ZXN0XHJcblx0XHRpID0gdXJsLm1hdGNoKC9cXC9cXC8oLis/KVxcLy8pO1xyXG5cdFx0Y3Jvc3NPcmlnaW4gPSBpICYmIChpWzFdP2lbMV0hPWxvY2F0aW9uLmhvc3Q6ZmFsc2UpO1xyXG5cclxuXHRcdC8vIFByZXBhcmUgZGF0YVxyXG5cdFx0aWYoJ0FycmF5QnVmZmVyJyBpbiBnbG9iYWwgJiYgZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XHJcblx0XHRcdG9wdGlvbnMuZGF0YVR5cGUgPSAnYXJyYXlidWZmZXInO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZignQmxvYicgaW4gZ2xvYmFsICYmIGRhdGEgaW5zdGFuY2VvZiBCbG9iKSB7XHJcblx0XHRcdG9wdGlvbnMuZGF0YVR5cGUgPSAnYmxvYic7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKCdEb2N1bWVudCcgaW4gZ2xvYmFsICYmIGRhdGEgaW5zdGFuY2VvZiBEb2N1bWVudCkge1xyXG5cdFx0XHRvcHRpb25zLmRhdGFUeXBlID0gJ2RvY3VtZW50JztcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoJ0Zvcm1EYXRhJyBpbiBnbG9iYWwgJiYgZGF0YSBpbnN0YW5jZW9mIEZvcm1EYXRhKSB7XHJcblx0XHRcdG9wdGlvbnMuZGF0YVR5cGUgPSAnZm9ybWRhdGEnO1xyXG5cdFx0fVxyXG5cdFx0aWYoZGF0YSAhPT0gbnVsbCkge1xyXG5cdFx0XHRzd2l0Y2gob3B0aW9ucy5kYXRhVHlwZSkge1xyXG5cdFx0XHRcdGNhc2UgJ2pzb24nOlxyXG5cdFx0XHRcdFx0ZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAncG9zdCc6XHJcblx0XHRcdFx0XHRkYXRhID0ganBhcmFtKGRhdGEpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUHJlcGFyZSBoZWFkZXJzXHJcblx0XHRpZihvcHRpb25zLmhlYWRlcnMpIHtcclxuXHRcdFx0dmFyIGZvcm1hdCA9IGZ1bmN0aW9uKG1hdGNoLHAxLHAyKSB7XHJcblx0XHRcdFx0cmV0dXJuIHAxICsgcDIudG9VcHBlckNhc2UoKTtcclxuXHRcdFx0fTtcclxuXHRcdFx0Zm9yKGkgaW4gb3B0aW9ucy5oZWFkZXJzKSB7XHJcblx0XHRcdFx0aGVhZGVyc1tpLnJlcGxhY2UoLyhefC0pKFteLV0pL2csZm9ybWF0KV0gPSBvcHRpb25zLmhlYWRlcnNbaV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmKCEoJ0NvbnRlbnQtVHlwZScgaW4gaGVhZGVycykgJiYgbWV0aG9kIT0nR0VUJykge1xyXG5cdFx0XHRpZihvcHRpb25zLmRhdGFUeXBlIGluIG1pbWVUeXBlcykge1xyXG5cdFx0XHRcdGlmKG1pbWVUeXBlc1tvcHRpb25zLmRhdGFUeXBlXSkge1xyXG5cdFx0XHRcdFx0aGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSBtaW1lVHlwZXNbb3B0aW9ucy5kYXRhVHlwZV07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZighaGVhZGVycy5BY2NlcHQpIHtcclxuXHRcdFx0aGVhZGVycy5BY2NlcHQgPSAob3B0aW9ucy5yZXNwb25zZVR5cGUgaW4gYWNjZXB0KT9hY2NlcHRbb3B0aW9ucy5yZXNwb25zZVR5cGVdOicqLyonO1xyXG5cdFx0fVxyXG5cdFx0aWYoIWNyb3NzT3JpZ2luICYmICEoJ1gtUmVxdWVzdGVkLVdpdGgnIGluIGhlYWRlcnMpKSB7IC8vICh0aGF0IGhlYWRlciBicmVha3MgaW4gbGVnYWN5IGJyb3dzZXJzIHdpdGggQ09SUylcclxuXHRcdFx0aGVhZGVyc1snWC1SZXF1ZXN0ZWQtV2l0aCddID0gJ1hNTEh0dHBSZXF1ZXN0JztcclxuXHRcdH1cclxuXHRcdGlmKCFvcHRpb25zLmNhY2hlICYmICEoJ0NhY2hlLUNvbnRyb2wnIGluIGhlYWRlcnMpKSB7XHJcblx0XHRcdGhlYWRlcnNbJ0NhY2hlLUNvbnRyb2wnXSA9ICduby1jYWNoZSc7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUHJlcGFyZSBVUkxcclxuXHRcdGlmKG1ldGhvZCA9PSAnR0VUJyAmJiBkYXRhICYmIHR5cGVvZiBkYXRhID09ICdzdHJpbmcnKSB7XHJcblx0XHRcdHVybCArPSAoL1xcPy8udGVzdCh1cmwpPycmJzonPycpICsgZGF0YTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBTdGFydCB0aGUgcmVxdWVzdFxyXG5cdFx0aWYob3B0aW9ucy5hc3luYykge1xyXG5cdFx0XHRwcm9taXNlLnNlbmQoKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBSZXR1cm4gcHJvbWlzZVxyXG5cdFx0cmV0dXJuIHByb21pc2U7XHJcblxyXG5cdH07XHJcblx0XHJcblx0Ly8gRGVmaW5lIGV4dGVybmFsIHF3ZXN0IG9iamVjdFxyXG5cdHZhciBnZXROZXdQcm9taXNlID0gZnVuY3Rpb24ocSkge1xyXG5cdFx0XHQvLyBQcmVwYXJlXHJcblx0XHRcdHZhciBwcm9taXNlcyA9IFtdLFxyXG5cdFx0XHRcdGxvYWRpbmcgPSAwLFxyXG5cdFx0XHRcdHZhbHVlcyA9IFtdO1xyXG5cdFx0XHQvLyBDcmVhdGUgYSBuZXcgcHJvbWlzZSB0byBoYW5kbGUgYWxsIHJlcXVlc3RzXHJcblx0XHRcdHJldHVybiBwaW5reXN3ZWFyKGZ1bmN0aW9uKHBpbmt5KSB7XHJcblx0XHRcdFx0Ly8gQmFzaWMgcmVxdWVzdCBtZXRob2RcclxuXHRcdFx0XHR2YXIgbWV0aG9kX2luZGV4ID0gLTEsXHJcblx0XHRcdFx0XHRjcmVhdGVNZXRob2QgPSBmdW5jdGlvbihtZXRob2QpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uKHVybCwgZGF0YSwgb3B0aW9ucywgYmVmb3JlKSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIGluZGV4ID0gKyttZXRob2RfaW5kZXg7XHJcblx0XHRcdFx0XHRcdFx0Kytsb2FkaW5nO1xyXG5cdFx0XHRcdFx0XHRcdHByb21pc2VzLnB1c2gocXdlc3QobWV0aG9kLCBwaW5reS5iYXNlICsgdXJsLCBkYXRhLCBvcHRpb25zLCBiZWZvcmUpLnRoZW4oZnVuY3Rpb24oeGhyLCByZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWVzW2luZGV4XSA9IGFyZ3VtZW50cztcclxuXHRcdFx0XHRcdFx0XHRcdGlmKCEtLWxvYWRpbmcpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cGlua3kodHJ1ZSwgdmFsdWVzLmxlbmd0aCA9PSAxID8gdmFsdWVzWzBdIDogW3ZhbHVlc10pO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0sIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cGlua3koZmFsc2UsIGFyZ3VtZW50cyk7XHJcblx0XHRcdFx0XHRcdFx0fSkpO1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBwaW5reTtcclxuXHRcdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0Ly8gRGVmaW5lIGV4dGVybmFsIEFQSVxyXG5cdFx0XHRcdHBpbmt5LmdldCA9IGNyZWF0ZU1ldGhvZCgnR0VUJyk7XHJcblx0XHRcdFx0cGlua3kucG9zdCA9IGNyZWF0ZU1ldGhvZCgnUE9TVCcpO1xyXG5cdFx0XHRcdHBpbmt5LnB1dCA9IGNyZWF0ZU1ldGhvZCgnUFVUJyk7XHJcblx0XHRcdFx0cGlua3lbJ2RlbGV0ZSddID0gY3JlYXRlTWV0aG9kKCdERUxFVEUnKTtcclxuXHRcdFx0XHRwaW5reVsnY2F0Y2gnXSA9IGZ1bmN0aW9uKGYpIHtcclxuXHRcdFx0XHRcdHJldHVybiBwaW5reS50aGVuKG51bGwsIGYpO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0cGlua3kuY29tcGxldGUgPSBmdW5jdGlvbihmKSB7XHJcblx0XHRcdFx0XHR2YXIgZnVuYyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRmKCk7IC8vIG90aGVyd2lzZSBhcmd1bWVudHMgd2lsbCBiZSBwYXNzZWQgdG8gdGhlIGNhbGxiYWNrXHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdFx0cmV0dXJuIHBpbmt5LnRoZW4oZnVuYywgZnVuYyk7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHRwaW5reS5tYXAgPSBmdW5jdGlvbih0eXBlLCB1cmwsIGRhdGEsIG9wdGlvbnMsIGJlZm9yZSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGNyZWF0ZU1ldGhvZCh0eXBlLnRvVXBwZXJDYXNlKCkpLmNhbGwodGhpcywgdXJsLCBkYXRhLCBvcHRpb25zLCBiZWZvcmUpO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0Ly8gUG9wdWxhdGUgbWV0aG9kcyBmcm9tIGV4dGVybmFsIG9iamVjdFxyXG5cdFx0XHRcdGZvcih2YXIgcHJvcCBpbiBxKSB7XHJcblx0XHRcdFx0XHRpZighKHByb3AgaW4gcGlua3kpKSB7XHJcblx0XHRcdFx0XHRcdHBpbmt5W3Byb3BdID0gcVtwcm9wXTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gU2V0IGxhc3QgbWV0aG9kc1xyXG5cdFx0XHRcdHBpbmt5LnNlbmQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdGZvcih2YXIgaT0wLCBqPXByb21pc2VzLmxlbmd0aDsgaTxqOyArK2kpIHtcclxuXHRcdFx0XHRcdFx0cHJvbWlzZXNbaV0uc2VuZCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmV0dXJuIHBpbmt5O1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0cGlua3kuYWJvcnQgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdGZvcih2YXIgaT0wLCBqPXByb21pc2VzLmxlbmd0aDsgaTxqOyArK2kpIHtcclxuXHRcdFx0XHRcdFx0cHJvbWlzZXNbaV0uYWJvcnQoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiBwaW5reTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHJldHVybiBwaW5reTtcclxuXHRcdFx0fSk7XHJcblx0XHR9LFxyXG5cdFx0cSA9IHtcclxuXHRcdFx0YmFzZTogJycsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIGdldE5ld1Byb21pc2UocSkuZ2V0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdH0sXHJcblx0XHRcdHBvc3Q6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBnZXROZXdQcm9taXNlKHEpLnBvc3QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0cHV0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gZ2V0TmV3UHJvbWlzZShxKS5wdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0J2RlbGV0ZSc6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBnZXROZXdQcm9taXNlKHEpWydkZWxldGUnXS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRtYXA6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBnZXROZXdQcm9taXNlKHEpLm1hcC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR4aHIyOiB4aHIyLFxyXG5cdFx0XHRsaW1pdDogZnVuY3Rpb24oYnkpIHtcclxuXHRcdFx0XHRsaW1pdCA9IGJ5O1xyXG5cdFx0XHRcdHJldHVybiBxO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRzZXREZWZhdWx0T3B0aW9uczogZnVuY3Rpb24ob3B0aW9ucykge1xyXG5cdFx0XHRcdGRlZmF1bHRPcHRpb25zID0gb3B0aW9ucztcclxuXHRcdFx0XHRyZXR1cm4gcTtcclxuXHRcdFx0fSxcclxuXHRcdFx0c2V0RGVmYXVsdFhkclJlc3BvbnNlVHlwZTogZnVuY3Rpb24odHlwZSkge1xyXG5cdFx0XHRcdGRlZmF1bHRYZHJSZXNwb25zZVR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0cmV0dXJuIHE7XHJcblx0XHRcdH0sXHJcblx0XHRcdHNldERlZmF1bHREYXRhVHlwZTogZnVuY3Rpb24odHlwZSkge1xyXG5cdFx0XHRcdGRlZmF1bHREYXRhVHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0XHRyZXR1cm4gcTtcclxuXHRcdFx0fSxcclxuXHRcdFx0Z2V0T3BlblJlcXVlc3RzOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gcmVxdWVzdHM7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHJcblx0cmV0dXJuIHE7XHJcblxyXG59KCk7XHJcbiIsIi8qIEBmbG93ICovXG5cbmltcG9ydCBxd2VzdCBmcm9tICdxd2VzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFF3ZXN0QWpheExvYWRlciB7XG4gICAgZ2V0KHBhdGggOiBzdHJpbmcpIDogUHJvbWlzZSB7XG4gICAgICAgIHJldHVybiBxd2VzdC5nZXQocGF0aCkudGhlbihmdW5jdGlvbih4aHIsIHJlcykge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiByZXMgPT09ICdzdHJpbmcnID8gSlNPTi5wYXJzZShyZXMpIDogcmVzO1xuICAgICAgICB9KTtcbiAgICB9XG59IiwiLyogQGZsb3cgKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGV2ZWxMb2FkZXIge1xuICAgIGFqYXhMb2FkZXIgICA6IElBamF4TG9hZGVyO1xuXG4gICAgY29uc3RydWN0b3IoYWpheExvYWRlciA6IElBamF4TG9hZGVyKSB7XG4gICAgICAgIHRoaXMuYWpheExvYWRlciAgID0gYWpheExvYWRlcjtcbiAgICB9XG4gICAgXG4gICAgYXN5bmMgbG9hZExldmVsKHBhdGggOiBzdHJpbmcpIDogUHJvbWlzZSB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmFqYXhMb2FkZXIuZ2V0KHBhdGgpO1xuICAgIH1cbn0iLCIvKlxuICogQSBtYWluIGxvb3AgdXNlZnVsIGZvciBnYW1lcyBhbmQgb3RoZXIgYW5pbWF0ZWQgYXBwbGljYXRpb25zLlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJvb3Q7XG4gICAgXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJvb3QgPSBnbG9iYWw7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdCA9IHdpbmRvdztcbiAgICB9XG4gICAgXG4gICAgLy8gVGhlIGFtb3VudCBvZiB0aW1lIChpbiBtaWxsaXNlY29uZHMpIHRvIHNpbXVsYXRlIGVhY2ggdGltZSB1cGRhdGUoKVxuICAgIC8vIHJ1bnMuIFNlZSBgTWFpbkxvb3Auc2V0U2ltdWxhdGlvblRpbWVzdGVwKClgIGZvciBkZXRhaWxzLlxuICAgIHZhciBzaW11bGF0aW9uVGltZXN0ZXAgPSAxMDAwIC8gNjAsXG5cbiAgICAvLyBUaGUgY3VtdWxhdGl2ZSBhbW91bnQgb2YgaW4tYXBwIHRpbWUgdGhhdCBoYXNuJ3QgYmVlbiBzaW11bGF0ZWQgeWV0LlxuICAgIC8vIFNlZSB0aGUgY29tbWVudHMgaW5zaWRlIGFuaW1hdGUoKSBmb3IgZGV0YWlscy5cbiAgICBmcmFtZURlbHRhID0gMCxcblxuICAgIC8vIFRoZSB0aW1lc3RhbXAgaW4gbWlsbGlzZWNvbmRzIG9mIHRoZSBsYXN0IHRpbWUgdGhlIG1haW4gbG9vcCB3YXMgcnVuLlxuICAgIC8vIFVzZWQgdG8gY29tcHV0ZSB0aGUgdGltZSBlbGFwc2VkIGJldHdlZW4gZnJhbWVzLlxuICAgIGxhc3RGcmFtZVRpbWVNcyA9IDAsXG5cbiAgICAvLyBBbiBleHBvbmVudGlhbCBtb3ZpbmcgYXZlcmFnZSBvZiB0aGUgZnJhbWVzIHBlciBzZWNvbmQuXG4gICAgZnBzID0gNjAsXG5cbiAgICAvLyBUaGUgdGltZXN0YW1wIChpbiBtaWxsaXNlY29uZHMpIG9mIHRoZSBsYXN0IHRpbWUgdGhlIGBmcHNgIG1vdmluZ1xuICAgIC8vIGF2ZXJhZ2Ugd2FzIHVwZGF0ZWQuXG4gICAgbGFzdEZwc1VwZGF0ZSA9IDAsXG5cbiAgICAvLyBUaGUgbnVtYmVyIG9mIGZyYW1lcyBkZWxpdmVyZWQgaW4gdGhlIGN1cnJlbnQgc2Vjb25kLlxuICAgIGZyYW1lc1RoaXNTZWNvbmQgPSAwLFxuXG4gICAgLy8gVGhlIG51bWJlciBvZiB0aW1lcyB1cGRhdGUoKSBpcyBjYWxsZWQgaW4gYSBnaXZlbiBmcmFtZS4gVGhpcyBpcyBvbmx5XG4gICAgLy8gcmVsZXZhbnQgaW5zaWRlIG9mIGFuaW1hdGUoKSwgYnV0IGEgcmVmZXJlbmNlIGlzIGhlbGQgZXh0ZXJuYWxseSBzbyB0aGF0XG4gICAgLy8gdGhpcyB2YXJpYWJsZSBpcyBub3QgbWFya2VkIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24gZXZlcnkgdGltZSB0aGUgbWFpblxuICAgIC8vIGxvb3AgcnVucy5cbiAgICBudW1VcGRhdGVTdGVwcyA9IDAsXG5cbiAgICAvLyBUaGUgbWluaW11bSBhbW91bnQgb2YgdGltZSBpbiBtaWxsaXNlY29uZHMgdGhhdCBtdXN0IHBhc3Mgc2luY2UgdGhlIGxhc3RcbiAgICAvLyBmcmFtZSB3YXMgZXhlY3V0ZWQgYmVmb3JlIGFub3RoZXIgZnJhbWUgY2FuIGJlIGV4ZWN1dGVkLiBUaGVcbiAgICAvLyBtdWx0aXBsaWNhdGl2ZSBpbnZlcnNlIGNhcHMgdGhlIEZQUyAodGhlIGRlZmF1bHQgb2YgemVybyBtZWFucyB0aGVyZSBpc1xuICAgIC8vIG5vIGNhcCkuXG4gICAgbWluRnJhbWVEZWxheSA9IDAsXG5cbiAgICAvLyBXaGV0aGVyIHRoZSBtYWluIGxvb3AgaXMgcnVubmluZy5cbiAgICBydW5uaW5nID0gZmFsc2UsXG5cbiAgICAvLyBgdHJ1ZWAgaWYgYE1haW5Mb29wLnN0YXJ0KClgIGhhcyBiZWVuIGNhbGxlZCBhbmQgdGhlIG1vc3QgcmVjZW50IHRpbWUgaXRcbiAgICAvLyB3YXMgY2FsbGVkIGhhcyBub3QgYmVlbiBmb2xsb3dlZCBieSBhIGNhbGwgdG8gYE1haW5Mb29wLnN0b3AoKWAuIFRoaXMgaXNcbiAgICAvLyBkaWZmZXJlbnQgdGhhbiBgcnVubmluZ2AgYmVjYXVzZSB0aGVyZSBpcyBhIGRlbGF5IG9mIGEgZmV3IG1pbGxpc2Vjb25kc1xuICAgIC8vIGFmdGVyIGBNYWluTG9vcC5zdGFydCgpYCBpcyBjYWxsZWQgYmVmb3JlIHRoZSBhcHBsaWNhdGlvbiBpcyBjb25zaWRlcmVkXG4gICAgLy8gXCJydW5uaW5nLlwiIFRoaXMgZGVsYXkgaXMgZHVlIHRvIHdhaXRpbmcgZm9yIHRoZSBuZXh0IGZyYW1lLlxuICAgIHN0YXJ0ZWQgPSBmYWxzZSxcblxuICAgIC8vIFdoZXRoZXIgdGhlIHNpbXVsYXRpb24gaGFzIGZhbGxlbiB0b28gZmFyIGJlaGluZCByZWFsIHRpbWUuXG4gICAgLy8gU3BlY2lmaWNhbGx5LCBgcGFuaWNgIHdpbGwgYmUgc2V0IHRvIGB0cnVlYCBpZiB0b28gbWFueSB1cGRhdGVzIG9jY3VyIGluXG4gICAgLy8gb25lIGZyYW1lLiBUaGlzIGlzIG9ubHkgcmVsZXZhbnQgaW5zaWRlIG9mIGFuaW1hdGUoKSwgYnV0IGEgcmVmZXJlbmNlIGlzXG4gICAgLy8gaGVsZCBleHRlcm5hbGx5IHNvIHRoYXQgdGhpcyB2YXJpYWJsZSBpcyBub3QgbWFya2VkIGZvciBnYXJiYWdlXG4gICAgLy8gY29sbGVjdGlvbiBldmVyeSB0aW1lIHRoZSBtYWluIGxvb3AgcnVucy5cbiAgICBwYW5pYyA9IGZhbHNlLFxuXG4gICAgLy8gVGhlIGZ1bmN0aW9uIHRoYXQgcnVucyB0aGUgbWFpbiBsb29wLiBUaGUgdW5wcmVmaXhlZCB2ZXJzaW9uIG9mXG4gICAgLy8gYHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKWAgaXMgYXZhaWxhYmxlIGluIGFsbCBtb2Rlcm4gYnJvd3NlcnNcbiAgICAvLyBub3csIGJ1dCBub2RlLmpzIGRvZXNuJ3QgaGF2ZSBpdCwgc28gZmFsbCBiYWNrIHRvIHRpbWVycy4gVGhlIHBvbHlmaWxsXG4gICAgLy8gaXMgYWRhcHRlZCBmcm9tIHRoZSBNSVQtbGljZW5zZWRcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdW5kZXJzY29yZWRpc2NvdmVyeS9yZWFsdGltZS1tdWx0aXBsYXllci1pbi1odG1sNVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHJvb3QucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGxhc3RUaW1lc3RhbXAgPSBEYXRlLm5vdygpLFxuICAgICAgICAgICAgbm93LFxuICAgICAgICAgICAgdGltZW91dDtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgLy8gVGhlIG5leHQgZnJhbWUgc2hvdWxkIHJ1biBubyBzb29uZXIgdGhhbiB0aGUgc2ltdWxhdGlvbiBhbGxvd3MsXG4gICAgICAgICAgICAvLyBidXQgYXMgc29vbiBhcyBwb3NzaWJsZSBpZiB0aGUgY3VycmVudCBmcmFtZSBoYXMgYWxyZWFkeSB0YWtlblxuICAgICAgICAgICAgLy8gbW9yZSB0aW1lIHRvIHJ1biB0aGFuIGlzIHNpbXVsYXRlZCBpbiBvbmUgdGltZXN0ZXAuXG4gICAgICAgICAgICB0aW1lb3V0ID0gTWF0aC5tYXgoMCwgc2ltdWxhdGlvblRpbWVzdGVwIC0gKG5vdyAtIGxhc3RUaW1lc3RhbXApKTtcbiAgICAgICAgICAgIGxhc3RUaW1lc3RhbXAgPSBub3cgKyB0aW1lb3V0O1xuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobm93ICsgdGltZW91dCk7XG4gICAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgfTtcbiAgICB9KSgpLFxuXG4gICAgLy8gVGhlIGZ1bmN0aW9uIHRoYXQgc3RvcHMgdGhlIG1haW4gbG9vcC4gVGhlIHVucHJlZml4ZWQgdmVyc2lvbiBvZlxuICAgIC8vIGB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoKWAgaXMgYXZhaWxhYmxlIGluIGFsbCBtb2Rlcm4gYnJvd3NlcnMgbm93LFxuICAgIC8vIGJ1dCBub2RlLmpzIGRvZXNuJ3QgaGF2ZSBpdCwgc28gZmFsbCBiYWNrIHRvIHRpbWVycy5cbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSA9IHJvb3QuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgY2xlYXJUaW1lb3V0LFxuXG4gICAgLy8gSW4gYWxsIG1ham9yIGJyb3dzZXJzLCByZXBsYWNpbmcgbm9uLXNwZWNpZmllZCBmdW5jdGlvbnMgd2l0aCBOT09Qc1xuICAgIC8vIHNlZW1zIHRvIGJlIGFzIGZhc3Qgb3Igc2xpZ2h0bHkgZmFzdGVyIHRoYW4gdXNpbmcgY29uZGl0aW9ucyB0byBvbmx5XG4gICAgLy8gY2FsbCB0aGUgZnVuY3Rpb25zIGlmIHRoZXkgYXJlIHNwZWNpZmllZC4gVGhpcyBpcyBwcm9iYWJseSBkdWUgdG8gZW1wdHlcbiAgICAvLyBmdW5jdGlvbnMgYmVpbmcgb3B0aW1pemVkIGF3YXkuIGh0dHA6Ly9qc3BlcmYuY29tL25vb3AtdnMtY29uZGl0aW9uXG4gICAgTk9PUCA9IGZ1bmN0aW9uKCkge30sXG5cbiAgICAvLyBBIGZ1bmN0aW9uIHRoYXQgcnVucyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBtYWluIGxvb3AuXG4gICAgLy8gU2VlIGBNYWluTG9vcC5zZXRCZWdpbigpYCBmb3IgZGV0YWlscy5cbiAgICBiZWdpbiA9IE5PT1AsXG5cbiAgICAvLyBBIGZ1bmN0aW9uIHRoYXQgcnVucyB1cGRhdGVzIChpLmUuIEFJIGFuZCBwaHlzaWNzKS5cbiAgICAvLyBTZWUgYE1haW5Mb29wLnNldFVwZGF0ZSgpYCBmb3IgZGV0YWlscy5cbiAgICB1cGRhdGUgPSBOT09QLFxuXG4gICAgLy8gQSBmdW5jdGlvbiB0aGF0IGRyYXdzIHRoaW5ncyBvbiB0aGUgc2NyZWVuLlxuICAgIC8vIFNlZSBgTWFpbkxvb3Auc2V0RHJhdygpYCBmb3IgZGV0YWlscy5cbiAgICBkcmF3ID0gTk9PUCxcblxuICAgIC8vIEEgZnVuY3Rpb24gdGhhdCBydW5zIGF0IHRoZSBlbmQgb2YgdGhlIG1haW4gbG9vcC5cbiAgICAvLyBTZWUgYE1haW5Mb29wLnNldEVuZCgpYCBmb3IgZGV0YWlscy5cbiAgICBlbmQgPSBOT09QLFxuXG4gICAgLy8gVGhlIElEIG9mIHRoZSBjdXJyZW50bHkgZXhlY3V0aW5nIGZyYW1lLiBVc2VkIHRvIGNhbmNlbCBmcmFtZXMgd2hlblxuICAgIC8vIHN0b3BwaW5nIHRoZSBsb29wLlxuICAgIHJhZkhhbmRsZTtcblxuLyoqXG4gKiBNYW5hZ2VzIHRoZSBtYWluIGxvb3AgdGhhdCBydW5zIHVwZGF0ZXMgYW5kIHJlbmRlcmluZy5cbiAqXG4gKiBUaGUgbWFpbiBsb29wIGlzIGEgY29yZSBwYXJ0IG9mIGFueSBhcHBsaWNhdGlvbiBpbiB3aGljaCBzdGF0ZSBjaGFuZ2VzXG4gKiBldmVuIGlmIG5vIGV2ZW50cyBhcmUgaGFuZGxlZC4gSW4gZ2FtZXMsIGl0IGlzIHR5cGljYWxseSByZXNwb25zaWJsZSBmb3JcbiAqIGNvbXB1dGluZyBwaHlzaWNzIGFuZCBBSSBhcyB3ZWxsIGFzIGRyYXdpbmcgdGhlIHJlc3VsdCBvbiB0aGUgc2NyZWVuLlxuICpcbiAqIFRoZSBib2R5IG9mIHRoaXMgcGFydGljdWxhciBsb29wIGlzIHJ1biBldmVyeSB0aW1lIHRoZSBicm93c2VyIGlzIHJlYWR5IHRvXG4gKiBwYWludCBhbm90aGVyIGZyYW1lLiBUaGUgZnJlcXVlbmN5IHdpdGggd2hpY2ggdGhpcyBoYXBwZW5zIGRlcGVuZHMgcHJpbWFyaWx5XG4gKiBvbiB0aGUgbW9uaXRvcidzIHJlZnJlc2ggcmF0ZSwgd2hpY2ggaXMgdHlwaWNhbGx5IDYwIGZyYW1lcyBwZXIgc2Vjb25kLiBNb3N0XG4gKiBhcHBsaWNhdGlvbnMgYWltIHRvIHJ1biBhdCA2MCBGUFMgZm9yIHRoaXMgcmVhc29uLCBtZWFuaW5nIHRoYXQgdGhlIG1haW5cbiAqIGxvb3AgcnVucyBhYm91dCBvbmNlIGV2ZXJ5IDE2LjcgbWlsbGlzZWNvbmRzLiBXaXRoIHRoaXMgdGFyZ2V0LCBldmVyeXRoaW5nXG4gKiB0aGF0IGhhcHBlbnMgaW4gdGhlIG1haW4gbG9vcCAoZS5nLiBhbGwgdXBkYXRlcyBhbmQgZHJhd2luZykgbmVlZHMgdG8gb2NjdXJcbiAqIHdpdGhpbiB0aGUgXCJidWRnZXRcIiBvZiAxNi43IG1pbGxpc2Vjb25kcy4gIFNlZVxuICogYE1haW5Mb29wLnNldFNpbXVsYXRpb25UaW1lc3RlcCgpYCBmb3IgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCB0eXBpY2FsXG4gKiBtb25pdG9yIHJlZnJlc2ggcmF0ZXMgYW5kIGZyYW1lIHJhdGUgdGFyZ2V0cy5cbiAqXG4gKiBUaGUgbWFpbiBsb29wIGNhbiBiZSBzdGFydGVkIGFuZCBzdG9wcGVkLCBidXQgdGhlcmUgY2FuIG9ubHkgYmUgb25lIE1haW5Mb29wXG4gKiAoZXhjZXB0IHRoYXQgZWFjaCBXZWIgV29ya2VyIGNhbiBoYXZlIGl0cyBvd24gTWFpbkxvb3ApLiBUaGVyZSBhcmUgZm91ciBtYWluXG4gKiBwYXJ0cyBvZiB0aGUgbG9vcDoge0BsaW5rICNzZXRCZWdpbiBiZWdpbn0oKSwge0BsaW5rICNzZXRVcGRhdGUgdXBkYXRlfSgpLFxuICoge0BsaW5rICNzZXREcmF3IGRyYXd9KCksIGFuZCB7QGxpbmsgI3NldEVuZCBlbmR9KCksIGluIHRoYXQgb3JkZXIuIFNlZSB0aGVcbiAqIGZ1bmN0aW9ucyB0aGF0IHNldCBlYWNoIG9mIHRoZW0gZm9yIGRlc2NyaXB0aW9ucyBvZiB3aGF0IHRoZXkgYXJlIHVzZWQgZm9yLlxuICogTm90ZSB0aGF0IHVwZGF0ZSgpIGNhbiBydW4gemVybyBvciBtb3JlIHRpbWVzIHBlciBsb29wLlxuICpcbiAqIEBjbGFzcyBNYWluTG9vcFxuICovXG5yb290Lk1haW5Mb29wID0ge1xuICAgIC8qKlxuICAgICAqIEdldHMgaG93IG1hbnkgbWlsbGlzZWNvbmRzIHNob3VsZCBiZSBzaW11bGF0ZWQgYnkgZXZlcnkgcnVuIG9mIHVwZGF0ZSgpLlxuICAgICAqXG4gICAgICogU2VlIGBNYWluTG9vcC5zZXRTaW11bGF0aW9uVGltZXN0ZXAoKWAgZm9yIGRldGFpbHMgb24gdGhpcyB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKiAgIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgc2hvdWxkIGJlIHNpbXVsYXRlZCBieSBldmVyeSBydW4gb2ZcbiAgICAgKiAgIHtAbGluayAjc2V0VXBkYXRlIHVwZGF0ZX0oKS5cbiAgICAgKi9cbiAgICBnZXRTaW11bGF0aW9uVGltZXN0ZXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gc2ltdWxhdGlvblRpbWVzdGVwO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGhvdyBtYW55IG1pbGxpc2Vjb25kcyBzaG91bGQgYmUgc2ltdWxhdGVkIGJ5IGV2ZXJ5IHJ1biBvZiB1cGRhdGUoKS5cbiAgICAgKlxuICAgICAqIFRoZSBwZXJjZWl2ZWQgZnJhbWVzIHBlciBzZWNvbmQgKEZQUykgaXMgZWZmZWN0aXZlbHkgY2FwcGVkIGF0IHRoZVxuICAgICAqIG11bHRpcGxpY2F0aXZlIGludmVyc2Ugb2YgdGhlIHNpbXVsYXRpb24gdGltZXN0ZXAuIFRoYXQgaXMsIGlmIHRoZVxuICAgICAqIHRpbWVzdGVwIGlzIDEwMDAgLyA2MCAod2hpY2ggaXMgdGhlIGRlZmF1bHQpLCB0aGVuIHRoZSBtYXhpbXVtIHBlcmNlaXZlZFxuICAgICAqIEZQUyBpcyBlZmZlY3RpdmVseSA2MC4gRGVjcmVhc2luZyB0aGUgdGltZXN0ZXAgaW5jcmVhc2VzIHRoZSBtYXhpbXVtXG4gICAgICogcGVyY2VpdmVkIEZQUyBhdCB0aGUgY29zdCBvZiBydW5uaW5nIHtAbGluayAjc2V0VXBkYXRlIHVwZGF0ZX0oKSBtb3JlXG4gICAgICogdGltZXMgcGVyIGZyYW1lIGF0IGxvd2VyIGZyYW1lIHJhdGVzLiBTaW5jZSBydW5uaW5nIHVwZGF0ZSgpIG1vcmUgdGltZXNcbiAgICAgKiB0YWtlcyBtb3JlIHRpbWUgdG8gcHJvY2VzcywgdGhpcyBjYW4gYWN0dWFsbHkgc2xvdyBkb3duIHRoZSBmcmFtZSByYXRlLlxuICAgICAqIEFkZGl0aW9uYWxseSwgaWYgdGhlIGFtb3VudCBvZiB0aW1lIGl0IHRha2VzIHRvIHJ1biB1cGRhdGUoKSBleGNlZWRzIG9yXG4gICAgICogdmVyeSBuZWFybHkgZXhjZWVkcyB0aGUgdGltZXN0ZXAsIHRoZSBhcHBsaWNhdGlvbiB3aWxsIGZyZWV6ZSBhbmQgY3Jhc2hcbiAgICAgKiBpbiBhIHNwaXJhbCBvZiBkZWF0aCAodW5sZXNzIGl0IGlzIHJlc2N1ZWQ7IHNlZSBgTWFpbkxvb3Auc2V0RW5kKClgIGZvclxuICAgICAqIGFuIGV4cGxhbmF0aW9uIG9mIHdoYXQgY2FuIGJlIGRvbmUgaWYgYSBzcGlyYWwgb2YgZGVhdGggaXMgb2NjdXJyaW5nKS5cbiAgICAgKlxuICAgICAqIFRoZSBleGNlcHRpb24gdG8gdGhpcyBpcyB0aGF0IGludGVycG9sYXRpbmcgYmV0d2VlbiB1cGRhdGVzIGZvciBlYWNoXG4gICAgICogcmVuZGVyIGNhbiBpbmNyZWFzZSB0aGUgcGVyY2VpdmVkIGZyYW1lIHJhdGUgYW5kIHJlZHVjZSB2aXN1YWxcbiAgICAgKiBzdHV0dGVyaW5nLiBTZWUgYE1haW5Mb29wLnNldERyYXcoKWAgZm9yIGFuIGV4cGxhbmF0aW9uIG9mIGhvdyB0byBkb1xuICAgICAqIHRoaXMuXG4gICAgICpcbiAgICAgKiBJZiB5b3UgYXJlIGNvbnNpZGVyaW5nIGRlY3JlYXNpbmcgdGhlIHNpbXVsYXRpb24gdGltZXN0ZXAgaW4gb3JkZXIgdG9cbiAgICAgKiByYWlzZSB0aGUgbWF4aW11bSBwZXJjZWl2ZWQgRlBTLCBrZWVwIGluIG1pbmQgdGhhdCBtb3N0IG1vbml0b3JzIGNhbid0XG4gICAgICogZGlzcGxheSBtb3JlIHRoYW4gNjAgRlBTLiBXaGV0aGVyIGh1bWFucyBjYW4gdGVsbCB0aGUgZGlmZmVyZW5jZSBhbW9uZ1xuICAgICAqIGhpZ2ggZnJhbWUgcmF0ZXMgZGVwZW5kcyBvbiB0aGUgYXBwbGljYXRpb24sIGJ1dCBmb3IgcmVmZXJlbmNlLCBmaWxtIGlzXG4gICAgICogdXN1YWxseSBkaXNwbGF5ZWQgYXQgMjQgRlBTLCBvdGhlciB2aWRlb3MgYXQgMzAgRlBTLCBtb3N0IGdhbWVzIGFyZVxuICAgICAqIGFjY2VwdGFibGUgYWJvdmUgMzAgRlBTLCBhbmQgdmlydHVhbCByZWFsaXR5IG1pZ2h0IHJlcXVpcmUgNzUgRlBTIHRvXG4gICAgICogZmVlbCBuYXR1cmFsLiBTb21lIGdhbWluZyBtb25pdG9ycyBnbyB1cCB0byAxNDQgRlBTLiBTZXR0aW5nIHRoZVxuICAgICAqIHRpbWVzdGVwIGJlbG93IDEwMDAgLyAxNDQgaXMgZGlzY291cmFnZWQgYW5kIGJlbG93IDEwMDAgLyAyNDAgaXNcbiAgICAgKiBzdHJvbmdseSBkaXNjb3VyYWdlZC4gVGhlIGRlZmF1bHQgb2YgMTAwMCAvIDYwIGlzIGdvb2QgaW4gbW9zdCBjYXNlcy5cbiAgICAgKlxuICAgICAqIFRoZSBzaW11bGF0aW9uIHRpbWVzdGVwIHNob3VsZCB0eXBpY2FsbHkgb25seSBiZSBjaGFuZ2VkIGF0XG4gICAgICogZGV0ZXJtaW5pc3RpYyB0aW1lcyAoZS5nLiBiZWZvcmUgdGhlIG1haW4gbG9vcCBzdGFydHMgZm9yIHRoZSBmaXJzdFxuICAgICAqIHRpbWUsIGFuZCBub3QgaW4gcmVzcG9uc2UgdG8gdXNlciBpbnB1dCBvciBzbG93IGZyYW1lIHJhdGVzKSB0byBhdm9pZFxuICAgICAqIGludHJvZHVjaW5nIG5vbi1kZXRlcm1pbmlzdGljIGJlaGF2aW9yLiBUaGUgdXBkYXRlIHRpbWVzdGVwIHNob3VsZCBiZVxuICAgICAqIHRoZSBzYW1lIGZvciBhbGwgcGxheWVycy91c2VycyBpbiBtdWx0aXBsYXllci9tdWx0aS11c2VyIGFwcGxpY2F0aW9ucy5cbiAgICAgKlxuICAgICAqIFNlZSBhbHNvIGBNYWluTG9vcC5nZXRTaW11bGF0aW9uVGltZXN0ZXAoKWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGltZXN0ZXBcbiAgICAgKiAgIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgc2hvdWxkIGJlIHNpbXVsYXRlZCBieSBldmVyeSBydW4gb2ZcbiAgICAgKiAgIHtAbGluayAjc2V0VXBkYXRlIHVwZGF0ZX0oKS5cbiAgICAgKi9cbiAgICBzZXRTaW11bGF0aW9uVGltZXN0ZXA6IGZ1bmN0aW9uKHRpbWVzdGVwKSB7XG4gICAgICAgIHNpbXVsYXRpb25UaW1lc3RlcCA9IHRpbWVzdGVwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZXhwb25lbnRpYWwgbW92aW5nIGF2ZXJhZ2Ugb2YgdGhlIGZyYW1lcyBwZXIgc2Vjb25kLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqICAgVGhlIGV4cG9uZW50aWFsIG1vdmluZyBhdmVyYWdlIG9mIHRoZSBmcmFtZXMgcGVyIHNlY29uZC5cbiAgICAgKi9cbiAgICBnZXRGUFM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZnBzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBtYXhpbXVtIGZyYW1lIHJhdGUuXG4gICAgICpcbiAgICAgKiBPdGhlciBmYWN0b3JzIGFsc28gbGltaXQgdGhlIEZQUzsgc2VlIGBNYWluTG9vcC5zZXRTaW11bGF0aW9uVGltZXN0ZXBgXG4gICAgICogZm9yIGRldGFpbHMuXG4gICAgICpcbiAgICAgKiBTZWUgYWxzbyBgTWFpbkxvb3Auc2V0TWF4QWxsb3dlZEZQUygpYC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKiAgIFRoZSBtYXhpbXVtIG51bWJlciBvZiBmcmFtZXMgcGVyIHNlY29uZCBhbGxvd2VkLlxuICAgICAqL1xuICAgIGdldE1heEFsbG93ZWRGUFM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gMTAwMCAvIG1pbkZyYW1lRGVsYXk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgYSBtYXhpbXVtIGZyYW1lIHJhdGUuXG4gICAgICpcbiAgICAgKiBTZWUgYWxzbyBgTWFpbkxvb3AuZ2V0TWF4QWxsb3dlZEZQUygpYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbZnBzPUluZmluaXR5XVxuICAgICAqICAgVGhlIG1heGltdW0gbnVtYmVyIG9mIGZyYW1lcyBwZXIgc2Vjb25kIHRvIGV4ZWN1dGUuIElmIEluZmluaXR5IG9yIG5vdFxuICAgICAqICAgcGFzc2VkLCB0aGVyZSB3aWxsIGJlIG5vIEZQUyBjYXAgKGFsdGhvdWdoIG90aGVyIGZhY3RvcnMgZG8gbGltaXQgdGhlXG4gICAgICogICBGUFM7IHNlZSBgTWFpbkxvb3Auc2V0U2ltdWxhdGlvblRpbWVzdGVwYCBmb3IgZGV0YWlscykuIElmIHplcm8sIHRoaXNcbiAgICAgKiAgIHdpbGwgc3RvcCB0aGUgbG9vcCwgYW5kIHdoZW4gdGhlIGxvb3AgaXMgbmV4dCBzdGFydGVkLCBpdCB3aWxsIHJldHVyblxuICAgICAqICAgdG8gdGhlIHByZXZpb3VzIG1heGltdW0gZnJhbWUgcmF0ZS4gUGFzc2luZyBuZWdhdGl2ZSB2YWx1ZXMgd2lsbCBzdGFsbFxuICAgICAqICAgdGhlIGxvb3AgdW50aWwgdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgYWdhaW4gd2l0aCBhIHBvc2l0aXZlIHZhbHVlLlxuICAgICAqXG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIHNldE1heEFsbG93ZWRGUFM6IGZ1bmN0aW9uKGZwcykge1xuICAgICAgICBpZiAodHlwZW9mIGZwcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGZwcyA9IEluZmluaXR5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChmcHMgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gRGl2aWRpbmcgYnkgSW5maW5pdHkgcmV0dXJucyB6ZXJvLlxuICAgICAgICAgICAgbWluRnJhbWVEZWxheSA9IDEwMDAgLyBmcHM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlc2V0IHRoZSBhbW91bnQgb2YgdGltZSB0aGF0IGhhcyBub3QgeWV0IGJlZW4gc2ltdWxhdGVkIHRvIHplcm8uXG4gICAgICpcbiAgICAgKiBUaGlzIGludHJvZHVjZXMgbm9uLWRldGVybWluaXN0aWMgYmVoYXZpb3IgaWYgY2FsbGVkIGFmdGVyIHRoZVxuICAgICAqIGFwcGxpY2F0aW9uIGhhcyBzdGFydGVkIHJ1bm5pbmcgKHVubGVzcyBpdCBpcyBiZWluZyByZXNldCwgaW4gd2hpY2ggY2FzZVxuICAgICAqIGl0IGRvZXNuJ3QgbWF0dGVyKS4gSG93ZXZlciwgdGhpcyBjYW4gYmUgdXNlZnVsIGluIGNhc2VzIHdoZXJlIHRoZVxuICAgICAqIGFtb3VudCBvZiB0aW1lIHRoYXQgaGFzIG5vdCB5ZXQgYmVlbiBzaW11bGF0ZWQgaGFzIGdyb3duIHZlcnkgbGFyZ2VcbiAgICAgKiAoZm9yIGV4YW1wbGUsIHdoZW4gdGhlIGFwcGxpY2F0aW9uJ3MgdGFiIGdldHMgcHV0IGluIHRoZSBiYWNrZ3JvdW5kIGFuZFxuICAgICAqIHRoZSBicm93c2VyIHRocm90dGxlcyB0aGUgdGltZXJzIGFzIGEgcmVzdWx0KS4gSW4gYXBwbGljYXRpb25zIHdpdGhcbiAgICAgKiBsb2Nrc3RlcCB0aGUgcGxheWVyIHdvdWxkIGdldCBkcm9wcGVkLCBidXQgaW4gb3RoZXIgbmV0d29ya2VkXG4gICAgICogYXBwbGljYXRpb25zIGl0IG1heSBiZSBuZWNlc3NhcnkgdG8gc25hcCBvciBlYXNlIHRoZSBwbGF5ZXIvdXNlciB0byB0aGVcbiAgICAgKiBhdXRob3JpdGF0aXZlIHN0YXRlIGFuZCBkaXNjYXJkIHBlbmRpbmcgdXBkYXRlcyBpbiB0aGUgcHJvY2Vzcy4gSW5cbiAgICAgKiBub24tbmV0d29ya2VkIGFwcGxpY2F0aW9ucyBpdCBtYXkgYWxzbyBiZSBhY2NlcHRhYmxlIHRvIHNpbXBseSByZXN1bWVcbiAgICAgKiB0aGUgYXBwbGljYXRpb24gd2hlcmUgaXQgbGFzdCBsZWZ0IG9mZiBhbmQgaWdub3JlIHRoZSBhY2N1bXVsYXRlZFxuICAgICAqIHVuc2ltdWxhdGVkIHRpbWUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICogICBUaGUgY3VtdWxhdGl2ZSBhbW91bnQgb2YgZWxhcHNlZCB0aW1lIGluIG1pbGxpc2Vjb25kcyB0aGF0IGhhcyBub3QgeWV0XG4gICAgICogICBiZWVuIHNpbXVsYXRlZCwgYnV0IGlzIGJlaW5nIGRpc2NhcmRlZCBhcyBhIHJlc3VsdCBvZiBjYWxsaW5nIHRoaXNcbiAgICAgKiAgIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIHJlc2V0RnJhbWVEZWx0YTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvbGRGcmFtZURlbHRhID0gZnJhbWVEZWx0YTtcbiAgICAgICAgZnJhbWVEZWx0YSA9IDA7XG4gICAgICAgIHJldHVybiBvbGRGcmFtZURlbHRhO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBmdW5jdGlvbiB0aGF0IHJ1bnMgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgbWFpbiBsb29wLlxuICAgICAqXG4gICAgICogVGhlIGJlZ2luKCkgZnVuY3Rpb24gaXMgdHlwaWNhbGx5IHVzZWQgdG8gcHJvY2VzcyBpbnB1dCBiZWZvcmUgdGhlXG4gICAgICogdXBkYXRlcyBydW4uIFByb2Nlc3NpbmcgaW5wdXQgaGVyZSAoaW4gY2h1bmtzKSBjYW4gcmVkdWNlIHRoZSBydW5uaW5nXG4gICAgICogdGltZSBvZiBldmVudCBoYW5kbGVycywgd2hpY2ggaXMgdXNlZnVsIGJlY2F1c2UgbG9uZy1ydW5uaW5nIGV2ZW50XG4gICAgICogaGFuZGxlcnMgY2FuIHNvbWV0aW1lcyBkZWxheSBmcmFtZXMuXG4gICAgICpcbiAgICAgKiBVbmxpa2Uge0BsaW5rICNzZXRVcGRhdGUgdXBkYXRlfSgpLCB3aGljaCBjYW4gcnVuIHplcm8gb3IgbW9yZSB0aW1lcyBwZXJcbiAgICAgKiBmcmFtZSwgYmVnaW4oKSBhbHdheXMgcnVucyBleGFjdGx5IG9uY2UgcGVyIGZyYW1lLiBUaGlzIG1ha2VzIGl0IHVzZWZ1bFxuICAgICAqIGZvciBhbnkgdXBkYXRlcyB0aGF0IGFyZSBub3QgZGVwZW5kZW50IG9uIHRpbWUgaW4gdGhlIHNpbXVsYXRpb24uXG4gICAgICogRXhhbXBsZXMgaW5jbHVkZSBhZGp1c3RpbmcgSFVEIGNhbGN1bGF0aW9ucyBvciBwZXJmb3JtaW5nIGxvbmctcnVubmluZ1xuICAgICAqIHVwZGF0ZXMgaW5jcmVtZW50YWxseS4gQ29tcGFyZWQgdG8ge0BsaW5rICNzZXRFbmQgZW5kfSgpLCBnZW5lcmFsbHlcbiAgICAgKiBhY3Rpb25zIHNob3VsZCBvY2N1ciBpbiBiZWdpbigpIGlmIHRoZXkgYWZmZWN0IGFueXRoaW5nIHRoYXRcbiAgICAgKiB7QGxpbmsgI3NldFVwZGF0ZSB1cGRhdGV9KCkgb3Ige0BsaW5rICNzZXREcmF3IGRyYXd9KCkgdXNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gYmVnaW5cbiAgICAgKiAgIFRoZSBiZWdpbigpIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbYmVnaW4udGltZXN0YW1wXVxuICAgICAqICAgVGhlIGN1cnJlbnQgdGltZXN0YW1wICh3aGVuIHRoZSBmcmFtZSBzdGFydGVkKSwgaW4gbWlsbGlzZWNvbmRzLiBUaGlzXG4gICAgICogICBzaG91bGQgb25seSBiZSB1c2VkIGZvciBjb21wYXJpc29uIHRvIG90aGVyIHRpbWVzdGFtcHMgYmVjYXVzZSB0aGVcbiAgICAgKiAgIGVwb2NoIChpLmUuIHRoZSBcInplcm9cIiB0aW1lKSBkZXBlbmRzIG9uIHRoZSBlbmdpbmUgcnVubmluZyB0aGlzIGNvZGUuXG4gICAgICogICBJbiBlbmdpbmVzIHRoYXQgc3VwcG9ydCBgRE9NSGlnaFJlc1RpbWVTdGFtcGAgKGFsbCBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgKiAgIGV4Y2VwdCBpT1MgU2FmYXJpIDgpIHRoZSBlcG9jaCBpcyB0aGUgdGltZSB0aGUgcGFnZSBzdGFydGVkIGxvYWRpbmcsXG4gICAgICogICBzcGVjaWZpY2FsbHkgYHBlcmZvcm1hbmNlLnRpbWluZy5uYXZpZ2F0aW9uU3RhcnRgLiBFdmVyeXdoZXJlIGVsc2UsXG4gICAgICogICBpbmNsdWRpbmcgbm9kZS5qcywgdGhlIGVwb2NoIGlzIHRoZSBVbml4IGVwb2NoICgxOTcwLTAxLTAxVDAwOjAwOjAwWikuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtiZWdpbi5kZWx0YV1cbiAgICAgKiAgIFRoZSB0b3RhbCBlbGFwc2VkIHRpbWUgdGhhdCBoYXMgbm90IHlldCBiZWVuIHNpbXVsYXRlZCwgaW5cbiAgICAgKiAgIG1pbGxpc2Vjb25kcy5cbiAgICAgKi9cbiAgICBzZXRCZWdpbjogZnVuY3Rpb24oZnVuKSB7XG4gICAgICAgIGJlZ2luID0gZnVuIHx8IGJlZ2luO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZnVuY3Rpb24gdGhhdCBydW5zIHVwZGF0ZXMgKGUuZy4gQUkgYW5kIHBoeXNpY3MpLlxuICAgICAqXG4gICAgICogVGhlIHVwZGF0ZSgpIGZ1bmN0aW9uIHNob3VsZCBzaW11bGF0ZSBhbnl0aGluZyB0aGF0IGlzIGFmZmVjdGVkIGJ5IHRpbWUuXG4gICAgICogSXQgY2FuIGJlIGNhbGxlZCB6ZXJvIG9yIG1vcmUgdGltZXMgcGVyIGZyYW1lIGRlcGVuZGluZyBvbiB0aGUgZnJhbWVcbiAgICAgKiByYXRlLlxuICAgICAqXG4gICAgICogQXMgd2l0aCBldmVyeXRoaW5nIGluIHRoZSBtYWluIGxvb3AsIHRoZSBydW5uaW5nIHRpbWUgb2YgdXBkYXRlKClcbiAgICAgKiBkaXJlY3RseSBhZmZlY3RzIHRoZSBmcmFtZSByYXRlLiBJZiB1cGRhdGUoKSB0YWtlcyBsb25nIGVub3VnaCB0aGF0IHRoZVxuICAgICAqIGZyYW1lIHJhdGUgZHJvcHMgYmVsb3cgdGhlIHRhcmdldCAoXCJidWRnZXRlZFwiKSBmcmFtZSByYXRlLCBwYXJ0cyBvZiB0aGVcbiAgICAgKiB1cGRhdGUoKSBmdW5jdGlvbiB0aGF0IGRvIG5vdCBuZWVkIHRvIGV4ZWN1dGUgYmV0d2VlbiBldmVyeSBmcmFtZSBjYW4gYmVcbiAgICAgKiBtb3ZlZCBpbnRvIFdlYiBXb3JrZXJzLiAoVmFyaW91cyBzb3VyY2VzIG9uIHRoZSBpbnRlcm5ldCBzb21ldGltZXNcbiAgICAgKiBzdWdnZXN0IG90aGVyIHNjaGVkdWxpbmcgcGF0dGVybnMgdXNpbmcgc2V0VGltZW91dCgpIG9yIHNldEludGVydmFsKCkuXG4gICAgICogVGhlc2UgYXBwcm9hY2hlcyBzb21ldGltZXMgb2ZmZXIgbW9kZXN0IGltcHJvdmVtZW50cyB3aXRoIG1pbmltYWxcbiAgICAgKiBjaGFuZ2VzIHRvIGV4aXN0aW5nIGNvZGUsIGJ1dCBiZWNhdXNlIEphdmFTY3JpcHQgaXMgc2luZ2xlLXRocmVhZGVkLCB0aGVcbiAgICAgKiB1cGRhdGVzIHdpbGwgc3RpbGwgYmxvY2sgcmVuZGVyaW5nIGFuZCBkcmFnIGRvd24gdGhlIGZyYW1lIHJhdGUuIFdlYlxuICAgICAqIFdvcmtlcnMgZXhlY3V0ZSBpbiBzZXBhcmF0ZSB0aHJlYWRzLCBzbyB0aGV5IGZyZWUgdXAgbW9yZSB0aW1lIGluIHRoZVxuICAgICAqIG1haW4gbG9vcC4pXG4gICAgICpcbiAgICAgKiBUaGlzIHNjcmlwdCBjYW4gYmUgaW1wb3J0ZWQgaW50byBhIFdlYiBXb3JrZXIgdXNpbmcgaW1wb3J0U2NyaXB0cygpIGFuZFxuICAgICAqIHVzZWQgdG8gcnVuIGEgc2Vjb25kIG1haW4gbG9vcCBpbiB0aGUgd29ya2VyLiBTb21lIGNvbnNpZGVyYXRpb25zOlxuICAgICAqXG4gICAgICogLSBQcm9maWxlIHlvdXIgY29kZSBiZWZvcmUgZG9pbmcgdGhlIHdvcmsgdG8gbW92ZSBpdCBpbnRvIFdlYiBXb3JrZXJzLlxuICAgICAqICAgSXQgY291bGQgYmUgdGhlIHJlbmRlcmluZyB0aGF0IGlzIHRoZSBib3R0bGVuZWNrLCBpbiB3aGljaCBjYXNlIHRoZVxuICAgICAqICAgc29sdXRpb24gaXMgdG8gZGVjcmVhc2UgdGhlIHZpc3VhbCBjb21wbGV4aXR5IG9mIHRoZSBzY2VuZS5cbiAgICAgKiAtIEl0IGRvZXNuJ3QgbWFrZSBzZW5zZSB0byBtb3ZlIHRoZSAqZW50aXJlKiBjb250ZW50cyBvZiB1cGRhdGUoKSBpbnRvXG4gICAgICogICB3b3JrZXJzIHVubGVzcyB7QGxpbmsgI3NldERyYXcgZHJhd30oKSBjYW4gaW50ZXJwb2xhdGUgYmV0d2VlbiBmcmFtZXMuXG4gICAgICogICBUaGUgbG93ZXN0LWhhbmdpbmcgZnJ1aXQgaXMgYmFja2dyb3VuZCB1cGRhdGVzIChsaWtlIGNhbGN1bGF0aW5nXG4gICAgICogICBjaXRpemVucycgaGFwcGluZXNzIGluIGEgY2l0eS1idWlsZGluZyBnYW1lKSwgcGh5c2ljcyB0aGF0IGRvZXNuJ3RcbiAgICAgKiAgIGFmZmVjdCB0aGUgc2NlbmUgKGxpa2UgZmxhZ3Mgd2F2aW5nIGluIHRoZSB3aW5kKSwgYW5kIGFueXRoaW5nIHRoYXQgaXNcbiAgICAgKiAgIG9jY2x1ZGVkIG9yIGhhcHBlbmluZyBmYXIgb2ZmIHNjcmVlbi5cbiAgICAgKiAtIElmIGRyYXcoKSBuZWVkcyB0byBpbnRlcnBvbGF0ZSBwaHlzaWNzIGJhc2VkIG9uIGFjdGl2aXR5IHRoYXQgb2NjdXJzXG4gICAgICogICBpbiBhIHdvcmtlciwgdGhlIHdvcmtlciBuZWVkcyB0byBwYXNzIHRoZSBpbnRlcnBvbGF0aW9uIHZhbHVlIGJhY2sgdG9cbiAgICAgKiAgIHRoZSBtYWluIHRocmVhZCBzbyB0aGF0IGlzIGlzIGF2YWlsYWJsZSB0byBkcmF3KCkuXG4gICAgICogLSBXZWIgV29ya2VycyBjYW4ndCBhY2Nlc3MgdGhlIHN0YXRlIG9mIHRoZSBtYWluIHRocmVhZCwgc28gdGhleSBjYW4ndFxuICAgICAqICAgZGlyZWN0bHkgbW9kaWZ5IG9iamVjdHMgaW4geW91ciBzY2VuZS4gTW92aW5nIGRhdGEgdG8gYW5kIGZyb20gV2ViXG4gICAgICogICBXb3JrZXJzIGlzIGEgcGFpbi4gVGhlIGZhc3Rlc3Qgd2F5IHRvIGRvIGl0IGlzIHdpdGggVHJhbnNmZXJhYmxlXG4gICAgICogICBPYmplY3RzOiBiYXNpY2FsbHksIHlvdSBjYW4gcGFzcyBhbiBBcnJheUJ1ZmZlciB0byBhIHdvcmtlcixcbiAgICAgKiAgIGRlc3Ryb3lpbmcgdGhlIG9yaWdpbmFsIHJlZmVyZW5jZSBpbiB0aGUgcHJvY2Vzcy5cbiAgICAgKlxuICAgICAqIFlvdSBjYW4gcmVhZCBtb3JlIGFib3V0IFdlYiBXb3JrZXJzIGFuZCBUcmFuc2ZlcmFibGUgT2JqZWN0cyBhdFxuICAgICAqIFtIVE1MNSBSb2Nrc10oaHR0cDovL3d3dy5odG1sNXJvY2tzLmNvbS9lbi90dXRvcmlhbHMvd29ya2Vycy9iYXNpY3MvKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHVwZGF0ZVxuICAgICAqICAgVGhlIHVwZGF0ZSgpIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbdXBkYXRlLmRlbHRhXVxuICAgICAqICAgVGhlIGFtb3VudCBvZiB0aW1lIGluIG1pbGxpc2Vjb25kcyB0byBzaW11bGF0ZSBpbiB0aGUgdXBkYXRlLiBJbiBtb3N0XG4gICAgICogICBjYXNlcyB0aGlzIHRpbWVzdGVwIG5ldmVyIGNoYW5nZXMgaW4gb3JkZXIgdG8gZW5zdXJlIGRldGVybWluaXN0aWNcbiAgICAgKiAgIHVwZGF0ZXMuIFRoZSB0aW1lc3RlcCBpcyB0aGUgc2FtZSBhcyB0aGF0IHJldHVybmVkIGJ5XG4gICAgICogICBgTWFpbkxvb3AuZ2V0U2ltdWxhdGlvblRpbWVzdGVwKClgLlxuICAgICAqL1xuICAgIHNldFVwZGF0ZTogZnVuY3Rpb24oZnVuKSB7XG4gICAgICAgIHVwZGF0ZSA9IGZ1biB8fCB1cGRhdGU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBmdW5jdGlvbiB0aGF0IGRyYXdzIHRoaW5ncyBvbiB0aGUgc2NyZWVuLlxuICAgICAqXG4gICAgICogVGhlIGRyYXcoKSBmdW5jdGlvbiBnZXRzIHBhc3NlZCB0aGUgcGVyY2VudCBvZiB0aW1lIHRoYXQgdGhlIG5leHQgcnVuIG9mXG4gICAgICoge0BsaW5rICNzZXRVcGRhdGUgdXBkYXRlfSgpIHdpbGwgc2ltdWxhdGUgdGhhdCBoYXMgYWN0dWFsbHkgZWxhcHNlZCwgYXNcbiAgICAgKiBhIGRlY2ltYWwuIEluIG90aGVyIHdvcmRzLCBkcmF3KCkgZ2V0cyBwYXNzZWQgaG93IGZhciBiZXR3ZWVuIHVwZGF0ZSgpXG4gICAgICogY2FsbHMgaXQgaXMuIFRoaXMgaXMgdXNlZnVsIGJlY2F1c2UgdGhlIHRpbWUgc2ltdWxhdGVkIGJ5IHVwZGF0ZSgpIGFuZFxuICAgICAqIHRoZSB0aW1lIGJldHdlZW4gZHJhdygpIGNhbGxzIGlzIHVzdWFsbHkgZGlmZmVyZW50LCBzbyB0aGUgcGFyYW1ldGVyIHRvXG4gICAgICogZHJhdygpIGNhbiBiZSB1c2VkIHRvIGludGVycG9sYXRlIG1vdGlvbiBiZXR3ZWVuIGZyYW1lcyB0byBtYWtlXG4gICAgICogcmVuZGVyaW5nIGFwcGVhciBzbW9vdGhlci4gVG8gaWxsdXN0cmF0ZSwgaWYgdXBkYXRlKCkgYWR2YW5jZXMgdGhlXG4gICAgICogc2ltdWxhdGlvbiBhdCBlYWNoIHZlcnRpY2FsIGJhciBpbiB0aGUgZmlyc3Qgcm93IGJlbG93LCBhbmQgZHJhdygpIGNhbGxzXG4gICAgICogaGFwcGVuIGF0IGVhY2ggdmVydGljYWwgYmFyIGluIHRoZSBzZWNvbmQgcm93IGJlbG93LCB0aGVuIHNvbWUgZnJhbWVzXG4gICAgICogd2lsbCBoYXZlIHRpbWUgbGVmdCBvdmVyIHRoYXQgaXMgbm90IHlldCBzaW11bGF0ZWQgYnkgdXBkYXRlKCkgd2hlblxuICAgICAqIHJlbmRlcmluZyBvY2N1cnMgaW4gZHJhdygpOlxuICAgICAqXG4gICAgICogICAgIHVwZGF0ZSgpIHRpbWVzdGVwczogIHwgIHwgIHwgIHwgIHwgIHwgIHwgIHwgIHxcbiAgICAgKiAgICAgZHJhdygpIGNhbGxzOiAgICAgICAgfCAgIHwgICB8ICAgfCAgIHwgICB8ICAgfFxuICAgICAqXG4gICAgICogVG8gaW50ZXJwb2xhdGUgbW90aW9uIGZvciByZW5kZXJpbmcgcHVycG9zZXMsIG9iamVjdHMnIHN0YXRlIGFmdGVyIHRoZVxuICAgICAqIGxhc3QgdXBkYXRlKCkgbXVzdCBiZSByZXRhaW5lZCBhbmQgdXNlZCB0byBjYWxjdWxhdGUgYW4gaW50ZXJtZWRpYXRlXG4gICAgICogc3RhdGUuIE5vdGUgdGhhdCB0aGlzIG1lYW5zIHJlbmRlcnMgd2lsbCBiZSB1cCB0byBvbmUgdXBkYXRlKCkgYmVoaW5kLlxuICAgICAqIFRoaXMgaXMgc3RpbGwgYmV0dGVyIHRoYW4gZXh0cmFwb2xhdGluZyAocHJvamVjdGluZyBvYmplY3RzJyBzdGF0ZSBhZnRlclxuICAgICAqIGEgZnV0dXJlIHVwZGF0ZSgpKSB3aGljaCBjYW4gcHJvZHVjZSBiaXphcnJlIHJlc3VsdHMuIFN0b3JpbmcgbXVsdGlwbGVcbiAgICAgKiBzdGF0ZXMgY2FuIGJlIGRpZmZpY3VsdCB0byBzZXQgdXAsIGFuZCBrZWVwIGluIG1pbmQgdGhhdCBydW5uaW5nIHRoaXNcbiAgICAgKiBwcm9jZXNzIHRha2VzIHRpbWUgdGhhdCBjb3VsZCBwdXNoIHRoZSBmcmFtZSByYXRlIGRvd24sIHNvIGl0J3Mgb2Z0ZW5cbiAgICAgKiBub3Qgd29ydGh3aGlsZSB1bmxlc3Mgc3R1dHRlcmluZyBpcyB2aXNpYmxlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZHJhd1xuICAgICAqICAgVGhlIGRyYXcoKSBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2RyYXcuaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2VdXG4gICAgICogICBUaGUgY3VtdWxhdGl2ZSBhbW91bnQgb2YgdGltZSB0aGF0IGhhc24ndCBiZWVuIHNpbXVsYXRlZCB5ZXQsIGRpdmlkZWRcbiAgICAgKiAgIGJ5IHRoZSBhbW91bnQgb2YgdGltZSB0aGF0IHdpbGwgYmUgc2ltdWxhdGVkIHRoZSBuZXh0IHRpbWUgdXBkYXRlKClcbiAgICAgKiAgIHJ1bnMuIFVzZWZ1bCBmb3IgaW50ZXJwb2xhdGluZyBmcmFtZXMuXG4gICAgICovXG4gICAgc2V0RHJhdzogZnVuY3Rpb24oZnVuKSB7XG4gICAgICAgIGRyYXcgPSBmdW4gfHwgZHJhdztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGZ1bmN0aW9uIHRoYXQgcnVucyBhdCB0aGUgZW5kIG9mIHRoZSBtYWluIGxvb3AuXG4gICAgICpcbiAgICAgKiBVbmxpa2Uge0BsaW5rICNzZXRVcGRhdGUgdXBkYXRlfSgpLCB3aGljaCBjYW4gcnVuIHplcm8gb3IgbW9yZSB0aW1lcyBwZXJcbiAgICAgKiBmcmFtZSwgZW5kKCkgYWx3YXlzIHJ1bnMgZXhhY3RseSBvbmNlIHBlciBmcmFtZS4gVGhpcyBtYWtlcyBpdCB1c2VmdWxcbiAgICAgKiBmb3IgYW55IHVwZGF0ZXMgdGhhdCBhcmUgbm90IGRlcGVuZGVudCBvbiB0aW1lIGluIHRoZSBzaW11bGF0aW9uLlxuICAgICAqIEV4YW1wbGVzIGluY2x1ZGUgY2xlYW5pbmcgdXAgYW55IHRlbXBvcmFyeSBzdGF0ZSBzZXQgdXAgYnlcbiAgICAgKiB7QGxpbmsgI3NldEJlZ2luIGJlZ2lufSgpLCBsb3dlcmluZyB0aGUgdmlzdWFsIHF1YWxpdHkgaWYgdGhlIGZyYW1lIHJhdGVcbiAgICAgKiBpcyB0b28gbG93LCBvciBwZXJmb3JtaW5nIGxvbmctcnVubmluZyB1cGRhdGVzIGluY3JlbWVudGFsbHkuIENvbXBhcmVkXG4gICAgICogdG8gYmVnaW4oKSwgZ2VuZXJhbGx5IGFjdGlvbnMgc2hvdWxkIG9jY3VyIGluIGVuZCgpIGlmIHRoZXkgdXNlIGFueXRoaW5nXG4gICAgICogdGhhdCB1cGRhdGUoKSBvciB7QGxpbmsgI3NldERyYXcgZHJhd30oKSBhZmZlY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBlbmRcbiAgICAgKiAgIFRoZSBlbmQoKSBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2VuZC5mcHNdXG4gICAgICogICBUaGUgZXhwb25lbnRpYWwgbW92aW5nIGF2ZXJhZ2Ugb2YgdGhlIGZyYW1lcyBwZXIgc2Vjb25kLiBUaGlzIGlzIHRoZVxuICAgICAqICAgc2FtZSB2YWx1ZSByZXR1cm5lZCBieSBgTWFpbkxvb3AuZ2V0RlBTKClgLiBJdCBjYW4gYmUgdXNlZCB0byB0YWtlXG4gICAgICogICBhY3Rpb24gd2hlbiB0aGUgRlBTIGlzIHRvbyBsb3cgKG9yIHRvIHJlc3RvcmUgdG8gbm9ybWFsY3kgaWYgdGhlIEZQU1xuICAgICAqICAgbW92ZXMgYmFjayB1cCkuIEV4YW1wbGVzIG9mIGFjdGlvbnMgdG8gdGFrZSBpZiB0aGUgRlBTIGlzIHRvbyBsb3dcbiAgICAgKiAgIGluY2x1ZGUgZXhpdGluZyB0aGUgYXBwbGljYXRpb24sIGxvd2VyaW5nIHRoZSB2aXN1YWwgcXVhbGl0eSwgc3RvcHBpbmdcbiAgICAgKiAgIG9yIHJlZHVjaW5nIGFjdGl2aXRpZXMgb3V0c2lkZSBvZiB0aGUgbWFpbiBsb29wIGxpa2UgZXZlbnQgaGFuZGxlcnMgb3JcbiAgICAgKiAgIGF1ZGlvIHBsYXliYWNrLCBwZXJmb3JtaW5nIG5vbi1jcml0aWNhbCB1cGRhdGVzIGxlc3MgZnJlcXVlbnRseSwgb3JcbiAgICAgKiAgIGluY3JlYXNpbmcgdGhlIHNpbXVsYXRpb24gdGltZXN0ZXAgKGJ5IGNhbGxpbmdcbiAgICAgKiAgIGBNYWluTG9vcC5zZXRTaW11bGF0aW9uVGltZXN0ZXAoKWApLiBOb3RlIHRoYXQgdGhpcyBsYXN0IG9wdGlvblxuICAgICAqICAgcmVzdWx0cyBpbiBtb3JlIHRpbWUgYmVpbmcgc2ltdWxhdGVkIHBlciB1cGRhdGUoKSBjYWxsLCB3aGljaCBjYXVzZXNcbiAgICAgKiAgIHRoZSBhcHBsaWNhdGlvbiB0byBiZWhhdmUgbm9uLWRldGVybWluaXN0aWNhbGx5LlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2VuZC5wYW5pYz1mYWxzZV1cbiAgICAgKiAgIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzaW11bGF0aW9uIGhhcyBmYWxsZW4gdG9vIGZhciBiZWhpbmQgcmVhbCB0aW1lLlxuICAgICAqICAgU3BlY2lmaWNhbGx5LCBgcGFuaWNgIHdpbGwgYmUgYHRydWVgIGlmIHRvbyBtYW55IHVwZGF0ZXMgb2NjdXJyZWQgaW5cbiAgICAgKiAgIG9uZSBmcmFtZS4gSW4gbmV0d29ya2VkIGxvY2tzdGVwIGFwcGxpY2F0aW9ucywgdGhlIGFwcGxpY2F0aW9uIHNob3VsZFxuICAgICAqICAgd2FpdCBmb3Igc29tZSBhbW91bnQgb2YgdGltZSB0byBzZWUgaWYgdGhlIHVzZXIgY2FuIGNhdGNoIHVwIGJlZm9yZVxuICAgICAqICAgZHJvcHBpbmcgdGhlIHVzZXIuIEluIG5ldHdvcmtlZCBidXQgbm9uLWxvY2tzdGVwIGFwcGxpY2F0aW9ucywgdGhpc1xuICAgICAqICAgdHlwaWNhbGx5IGluZGljYXRlcyB0aGF0IHRoZSB1c2VyIG5lZWRzIHRvIGJlIHNuYXBwZWQgb3IgZWFzZWQgdG8gdGhlXG4gICAgICogICBjdXJyZW50IGF1dGhvcml0YXRpdmUgc3RhdGUuIFdoZW4gdGhpcyBoYXBwZW5zLCBpdCBtYXkgYmUgY29udmVuaWVudFxuICAgICAqICAgdG8gY2FsbCBgTWFpbkxvb3AucmVzZXRGcmFtZURlbHRhKClgIHRvIGRpc2NhcmQgYWNjdW11bGF0ZWQgcGVuZGluZ1xuICAgICAqICAgdXBkYXRlcy4gSW4gbm9uLW5ldHdvcmtlZCBhcHBsaWNhdGlvbnMsIGl0IG1heSBiZSBhY2NlcHRhYmxlIHRvIGFsbG93XG4gICAgICogICB0aGUgYXBwbGljYXRpb24gdG8ga2VlcCBydW5uaW5nIGZvciBhd2hpbGUgdG8gc2VlIGlmIGl0IHdpbGwgY2F0Y2ggdXAuXG4gICAgICogICBIb3dldmVyLCB0aGlzIGNvdWxkIGFsc28gY2F1c2UgdGhlIGFwcGxpY2F0aW9uIHRvIGxvb2sgbGlrZSBpdCBpc1xuICAgICAqICAgcnVubmluZyB2ZXJ5IHF1aWNrbHkgZm9yIGEgZmV3IGZyYW1lcyBhcyBpdCB0cmFuc2l0aW9ucyB0aHJvdWdoIHRoZVxuICAgICAqICAgaW50ZXJtZWRpYXRlIHN0YXRlcy4gQW4gYWx0ZXJuYXRpdmUgdGhhdCBtYXkgYmUgYWNjZXB0YWJsZSBpcyB0b1xuICAgICAqICAgc2ltcGx5IGlnbm9yZSB0aGUgdW5zaW11bGF0ZWQgZWxhcHNlZCB0aW1lIGJ5IGNhbGxpbmdcbiAgICAgKiAgIGBNYWluTG9vcC5yZXNldEZyYW1lRGVsdGEoKWAgZXZlbiB0aG91Z2ggdGhpcyBpbnRyb2R1Y2VzXG4gICAgICogICBub24tZGV0ZXJtaW5pc3RpYyBiZWhhdmlvci4gSW4gYWxsIGNhc2VzLCBpZiB0aGUgYXBwbGljYXRpb24gcGFuaWNzXG4gICAgICogICBmcmVxdWVudGx5LCB0aGlzIGlzIGFuIGluZGljYXRpb24gdGhhdCB0aGUgbWFpbiBsb29wIGlzIHJ1bm5pbmcgdG9vXG4gICAgICogICBzbG93bHkuIEhvd2V2ZXIsIG1vc3Qgb2YgdGhlIHRpbWUgdGhlIGRyb3AgaW4gZnJhbWUgcmF0ZSB3aWxsIHByb2JhYmx5XG4gICAgICogICBiZSBub3RpY2VhYmxlIGJlZm9yZSBhIHBhbmljIG9jY3Vycy4gVG8gaGVscCB0aGUgYXBwbGljYXRpb24gY2F0Y2ggdXBcbiAgICAgKiAgIGFmdGVyIGEgcGFuaWMgY2F1c2VkIGJ5IGEgc3BpcmFsIG9mIGRlYXRoLCB0aGUgc2FtZSBzdGVwcyBjYW4gYmUgdGFrZW5cbiAgICAgKiAgIHRoYXQgYXJlIHN1Z2dlc3RlZCBhYm92ZSBpZiB0aGUgRlBTIGRyb3BzIHRvbyBsb3cuXG4gICAgICovXG4gICAgc2V0RW5kOiBmdW5jdGlvbihmdW4pIHtcbiAgICAgICAgZW5kID0gZnVuIHx8IGVuZDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyB0aGUgbWFpbiBsb29wLlxuICAgICAqXG4gICAgICogTm90ZSB0aGF0IHRoZSBhcHBsaWNhdGlvbiBpcyBub3QgY29uc2lkZXJlZCBcInJ1bm5pbmdcIiBpbW1lZGlhdGVseSBhZnRlclxuICAgICAqIHRoaXMgZnVuY3Rpb24gcmV0dXJuczsgcmF0aGVyLCBpdCBpcyBjb25zaWRlcmVkIFwicnVubmluZ1wiIGFmdGVyIHRoZVxuICAgICAqIGFwcGxpY2F0aW9uIGRyYXdzIGl0cyBmaXJzdCBmcmFtZS4gVGhlIGRpc3RpbmN0aW9uIGlzIHRoYXQgZXZlbnRcbiAgICAgKiBoYW5kbGVycyBzaG91bGQgcmVtYWluIHBhdXNlZCB1bnRpbCB0aGUgYXBwbGljYXRpb24gaXMgcnVubmluZywgZXZlblxuICAgICAqIGFmdGVyIGBNYWluTG9vcC5zdGFydCgpYCBpcyBjYWxsZWQuIENoZWNrIGBNYWluTG9vcC5pc1J1bm5pbmcoKWAgZm9yIHRoZVxuICAgICAqIGN1cnJlbnQgc3RhdHVzLiBUbyBhY3QgYWZ0ZXIgdGhlIGFwcGxpY2F0aW9uIHN0YXJ0cywgcmVnaXN0ZXIgYSBjYWxsYmFja1xuICAgICAqIHdpdGggcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCkgYWZ0ZXIgY2FsbGluZyB0aGlzIGZ1bmN0aW9uIGFuZCBleGVjdXRlIHRoZVxuICAgICAqIGFjdGlvbiBpbiB0aGF0IGNhbGxiYWNrLiBJdCBpcyBzYWZlIHRvIGNhbGwgYE1haW5Mb29wLnN0YXJ0KClgIG11bHRpcGxlXG4gICAgICogdGltZXMgZXZlbiBiZWZvcmUgdGhlIGFwcGxpY2F0aW9uIHN0YXJ0cyBydW5uaW5nIGFuZCB3aXRob3V0IGNhbGxpbmdcbiAgICAgKiBgTWFpbkxvb3Auc3RvcCgpYCBpbiBiZXR3ZWVuLCBhbHRob3VnaCB0aGVyZSBpcyBubyByZWFzb24gdG8gZG8gdGhpcztcbiAgICAgKiB0aGUgbWFpbiBsb29wIHdpbGwgb25seSBzdGFydCBpZiBpdCBpcyBub3QgYWxyZWFkeSBzdGFydGVkLlxuICAgICAqXG4gICAgICogU2VlIGFsc28gYE1haW5Mb29wLnN0b3AoKWAuXG4gICAgICovXG4gICAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBhcHBsaWNhdGlvbiBkb2Vzbid0IHN0YXJ0IHJ1bm5pbmcgaW1tZWRpYXRlbHksIHRyYWNrXG4gICAgICAgICAgICAvLyB3aGV0aGVyIHRoaXMgZnVuY3Rpb24gd2FzIGNhbGxlZCBhbmQgdXNlIHRoYXQgdG8ga2VlcCBpdCBmcm9tXG4gICAgICAgICAgICAvLyBzdGFydGluZyB0aGUgbWFpbiBsb29wIG11bHRpcGxlIHRpbWVzLlxuICAgICAgICAgICAgc3RhcnRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIEluIHRoZSBtYWluIGxvb3AsIGRyYXcoKSBpcyBjYWxsZWQgYWZ0ZXIgdXBkYXRlKCksIHNvIGlmIHdlXG4gICAgICAgICAgICAvLyBlbnRlcmVkIHRoZSBtYWluIGxvb3AgaW1tZWRpYXRlbHksIHdlIHdvdWxkIG5ldmVyIHJlbmRlciB0aGVcbiAgICAgICAgICAgIC8vIGluaXRpYWwgc3RhdGUgYmVmb3JlIGFueSB1cGRhdGVzIG9jY3VyLiBJbnN0ZWFkLCB3ZSBydW4gb25lXG4gICAgICAgICAgICAvLyBmcmFtZSB3aGVyZSBhbGwgd2UgZG8gaXMgZHJhdywgYW5kIHRoZW4gc3RhcnQgdGhlIG1haW4gbG9vcCB3aXRoXG4gICAgICAgICAgICAvLyB0aGUgbmV4dCBmcmFtZS5cbiAgICAgICAgICAgIHJhZkhhbmRsZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbih0aW1lc3RhbXApIHtcbiAgICAgICAgICAgICAgICAvLyBSZW5kZXIgdGhlIGluaXRpYWwgc3RhdGUgYmVmb3JlIGFueSB1cGRhdGVzIG9jY3VyLlxuICAgICAgICAgICAgICAgIGRyYXcoMSk7XG5cbiAgICAgICAgICAgICAgICAvLyBUaGUgYXBwbGljYXRpb24gaXNuJ3QgY29uc2lkZXJlZCBcInJ1bm5pbmdcIiB1bnRpbCB0aGVcbiAgICAgICAgICAgICAgICAvLyBhcHBsaWNhdGlvbiBzdGFydHMgZHJhd2luZy5cbiAgICAgICAgICAgICAgICBydW5uaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIC8vIFJlc2V0IHZhcmlhYmxlcyB0aGF0IGFyZSB1c2VkIGZvciB0cmFja2luZyB0aW1lIHNvIHRoYXQgd2VcbiAgICAgICAgICAgICAgICAvLyBkb24ndCBzaW11bGF0ZSB0aW1lIHBhc3NlZCB3aGlsZSB0aGUgYXBwbGljYXRpb24gd2FzIHBhdXNlZC5cbiAgICAgICAgICAgICAgICBsYXN0RnJhbWVUaW1lTXMgPSB0aW1lc3RhbXA7XG4gICAgICAgICAgICAgICAgbGFzdEZwc1VwZGF0ZSA9IHRpbWVzdGFtcDtcbiAgICAgICAgICAgICAgICBmcmFtZXNUaGlzU2Vjb25kID0gMDtcblxuICAgICAgICAgICAgICAgIC8vIFN0YXJ0IHRoZSBtYWluIGxvb3AuXG4gICAgICAgICAgICAgICAgcmFmSGFuZGxlID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0b3BzIHRoZSBtYWluIGxvb3AuXG4gICAgICpcbiAgICAgKiBFdmVudCBoYW5kbGluZyBhbmQgb3RoZXIgYmFja2dyb3VuZCB0YXNrcyBzaG91bGQgYWxzbyBiZSBwYXVzZWQgd2hlbiB0aGVcbiAgICAgKiBtYWluIGxvb3AgaXMgcGF1c2VkLlxuICAgICAqXG4gICAgICogTm90ZSB0aGF0IHBhdXNpbmcgaW4gbXVsdGlwbGF5ZXIvbXVsdGktdXNlciBhcHBsaWNhdGlvbnMgd2lsbCBjYXVzZSB0aGVcbiAgICAgKiBwbGF5ZXIncy91c2VyJ3MgY2xpZW50IHRvIGJlY29tZSBvdXQgb2Ygc3luYy4gSW4gdGhpcyBjYXNlIHRoZVxuICAgICAqIHNpbXVsYXRpb24gc2hvdWxkIGV4aXQsIG9yIHRoZSBwbGF5ZXIvdXNlciBuZWVkcyB0byBiZSBzbmFwcGVkIHRvIHRoZWlyXG4gICAgICogdXBkYXRlZCBwb3NpdGlvbiB3aGVuIHRoZSBtYWluIGxvb3AgaXMgc3RhcnRlZCBhZ2Fpbi5cbiAgICAgKlxuICAgICAqIFNlZSBhbHNvIGBNYWluTG9vcC5zdGFydCgpYCBhbmQgYE1haW5Mb29wLmlzUnVubmluZygpYC5cbiAgICAgKi9cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgICAgICBzdGFydGVkID0gZmFsc2U7XG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJhZkhhbmRsZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgdGhlIG1haW4gbG9vcCBpcyBjdXJyZW50bHkgcnVubmluZy5cbiAgICAgKlxuICAgICAqIFNlZSBhbHNvIGBNYWluTG9vcC5zdGFydCgpYCBhbmQgYE1haW5Mb29wLnN0b3AoKWAuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqICAgV2hldGhlciB0aGUgbWFpbiBsb29wIGlzIGN1cnJlbnRseSBydW5uaW5nLlxuICAgICAqL1xuICAgIGlzUnVubmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBydW5uaW5nO1xuICAgIH0sXG59O1xuXG4vKipcbiAqIFRoZSBtYWluIGxvb3AgdGhhdCBydW5zIHVwZGF0ZXMgYW5kIHJlbmRlcmluZy5cbiAqXG4gKiBAcGFyYW0ge0RPTUhpZ2hSZXNUaW1lU3RhbXB9IHRpbWVzdGFtcFxuICogICBUaGUgY3VycmVudCB0aW1lc3RhbXAuIEluIHByYWN0aWNlIHRoaXMgaXMgc3VwcGxpZWQgYnlcbiAqICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGF0IHRoZSB0aW1lIHRoYXQgaXQgc3RhcnRzIHRvIGZpcmUgY2FsbGJhY2tzLiBUaGlzXG4gKiAgIHNob3VsZCBvbmx5IGJlIHVzZWQgZm9yIGNvbXBhcmlzb24gdG8gb3RoZXIgdGltZXN0YW1wcyBiZWNhdXNlIHRoZSBlcG9jaFxuICogICAoaS5lLiB0aGUgXCJ6ZXJvXCIgdGltZSkgZGVwZW5kcyBvbiB0aGUgZW5naW5lIHJ1bm5pbmcgdGhpcyBjb2RlLiBJbiBlbmdpbmVzXG4gKiAgIHRoYXQgc3VwcG9ydCBgRE9NSGlnaFJlc1RpbWVTdGFtcGAgKGFsbCBtb2Rlcm4gYnJvd3NlcnMgZXhjZXB0IGlPUyBTYWZhcmlcbiAqICAgOCkgdGhlIGVwb2NoIGlzIHRoZSB0aW1lIHRoZSBwYWdlIHN0YXJ0ZWQgbG9hZGluZywgc3BlY2lmaWNhbGx5XG4gKiAgIGBwZXJmb3JtYW5jZS50aW1pbmcubmF2aWdhdGlvblN0YXJ0YC4gRXZlcnl3aGVyZSBlbHNlLCBpbmNsdWRpbmcgbm9kZS5qcyxcbiAqICAgdGhlIGVwb2NoIGlzIHRoZSBVbml4IGVwb2NoICgxOTcwLTAxLTAxVDAwOjAwOjAwWikuXG4gKlxuICogQGlnbm9yZVxuICovXG5mdW5jdGlvbiBhbmltYXRlKHRpbWVzdGFtcCkge1xuICAgIC8vIFRocm90dGxlIHRoZSBmcmFtZSByYXRlIChpZiBtaW5GcmFtZURlbGF5IGlzIHNldCB0byBhIG5vbi16ZXJvIHZhbHVlIGJ5XG4gICAgLy8gYE1haW5Mb29wLnNldE1heEFsbG93ZWRGUFMoKWApLlxuICAgIGlmICh0aW1lc3RhbXAgPCBsYXN0RnJhbWVUaW1lTXMgKyBtaW5GcmFtZURlbGF5KSB7XG4gICAgICAgIC8vIFJ1biB0aGUgbG9vcCBhZ2FpbiB0aGUgbmV4dCB0aW1lIHRoZSBicm93c2VyIGlzIHJlYWR5IHRvIHJlbmRlci5cbiAgICAgICAgcmFmSGFuZGxlID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZnJhbWVEZWx0YSBpcyB0aGUgY3VtdWxhdGl2ZSBhbW91bnQgb2YgaW4tYXBwIHRpbWUgdGhhdCBoYXNuJ3QgYmVlblxuICAgIC8vIHNpbXVsYXRlZCB5ZXQuIEFkZCB0aGUgdGltZSBzaW5jZSB0aGUgbGFzdCBmcmFtZS4gV2UgbmVlZCB0byB0cmFjayB0b3RhbFxuICAgIC8vIG5vdC15ZXQtc2ltdWxhdGVkIHRpbWUgKGFzIG9wcG9zZWQgdG8ganVzdCB0aGUgdGltZSBlbGFwc2VkIHNpbmNlIHRoZVxuICAgIC8vIGxhc3QgZnJhbWUpIGJlY2F1c2Ugbm90IGFsbCBhY3R1YWxseSBlbGFwc2VkIHRpbWUgaXMgZ3VhcmFudGVlZCB0byBiZVxuICAgIC8vIHNpbXVsYXRlZCBlYWNoIGZyYW1lLiBTZWUgdGhlIGNvbW1lbnRzIGJlbG93IGZvciBkZXRhaWxzLlxuICAgIGZyYW1lRGVsdGEgKz0gdGltZXN0YW1wIC0gbGFzdEZyYW1lVGltZU1zO1xuICAgIGxhc3RGcmFtZVRpbWVNcyA9IHRpbWVzdGFtcDtcblxuICAgIC8vIFJ1biBhbnkgdXBkYXRlcyB0aGF0IGFyZSBub3QgZGVwZW5kZW50IG9uIHRpbWUgaW4gdGhlIHNpbXVsYXRpb24uIFNlZVxuICAgIC8vIGBNYWluTG9vcC5zZXRCZWdpbigpYCBmb3IgYWRkaXRpb25hbCBkZXRhaWxzIG9uIGhvdyB0byB1c2UgdGhpcy5cbiAgICBiZWdpbih0aW1lc3RhbXAsIGZyYW1lRGVsdGEpO1xuXG4gICAgLy8gVXBkYXRlIHRoZSBlc3RpbWF0ZSBvZiB0aGUgZnJhbWUgcmF0ZSwgYGZwc2AuIEV2ZXJ5IHNlY29uZCwgdGhlIG51bWJlclxuICAgIC8vIG9mIGZyYW1lcyB0aGF0IG9jY3VycmVkIGluIHRoYXQgc2Vjb25kIGFyZSBpbmNsdWRlZCBpbiBhbiBleHBvbmVudGlhbFxuICAgIC8vIG1vdmluZyBhdmVyYWdlIG9mIGFsbCBmcmFtZXMgcGVyIHNlY29uZCwgd2l0aCBhbiBhbHBoYSBvZiAwLjI1LiBUaGlzXG4gICAgLy8gbWVhbnMgdGhhdCBtb3JlIHJlY2VudCBzZWNvbmRzIGFmZmVjdCB0aGUgZXN0aW1hdGVkIGZyYW1lIHJhdGUgbW9yZSB0aGFuXG4gICAgLy8gb2xkZXIgc2Vjb25kcy5cbiAgICBpZiAodGltZXN0YW1wID4gbGFzdEZwc1VwZGF0ZSArIDEwMDApIHtcbiAgICAgICAgLy8gQ29tcHV0ZSB0aGUgbmV3IGV4cG9uZW50aWFsIG1vdmluZyBhdmVyYWdlIHdpdGggYW4gYWxwaGEgb2YgMC4yNS5cbiAgICAgICAgLy8gVXNpbmcgY29uc3RhbnRzIGlubGluZSBpcyBva2F5IGhlcmUuXG4gICAgICAgIGZwcyA9IDAuMjUgKiBmcmFtZXNUaGlzU2Vjb25kICsgMC43NSAqIGZwcztcblxuICAgICAgICBsYXN0RnBzVXBkYXRlID0gdGltZXN0YW1wO1xuICAgICAgICBmcmFtZXNUaGlzU2Vjb25kID0gMDtcbiAgICB9XG4gICAgZnJhbWVzVGhpc1NlY29uZCsrO1xuXG4gICAgLypcbiAgICAgKiBBIG5haXZlIHdheSB0byBtb3ZlIGFuIG9iamVjdCBhbG9uZyBpdHMgWC1heGlzIG1pZ2h0IGJlIHRvIHdyaXRlIGEgbWFpblxuICAgICAqIGxvb3AgY29udGFpbmluZyB0aGUgc3RhdGVtZW50IGBvYmoueCArPSAxMDtgIHdoaWNoIHdvdWxkIG1vdmUgdGhlIG9iamVjdFxuICAgICAqIDEwIHVuaXRzIHBlciBmcmFtZS4gVGhpcyBhcHByb2FjaCBzdWZmZXJzIGZyb20gdGhlIGlzc3VlIHRoYXQgaXQgaXNcbiAgICAgKiBkZXBlbmRlbnQgb24gdGhlIGZyYW1lIHJhdGUuIEluIG90aGVyIHdvcmRzLCBpZiB5b3VyIGFwcGxpY2F0aW9uIGlzXG4gICAgICogcnVubmluZyBzbG93bHkgKHRoYXQgaXMsIGZld2VyIGZyYW1lcyBwZXIgc2Vjb25kKSwgeW91ciBvYmplY3Qgd2lsbCBhbHNvXG4gICAgICogYXBwZWFyIHRvIG1vdmUgc2xvd2x5LCB3aGVyZWFzIGlmIHlvdXIgYXBwbGljYXRpb24gaXMgcnVubmluZyBxdWlja2x5XG4gICAgICogKHRoYXQgaXMsIG1vcmUgZnJhbWVzIHBlciBzZWNvbmQpLCB5b3VyIG9iamVjdCB3aWxsIGFwcGVhciB0byBtb3ZlXG4gICAgICogcXVpY2tseS4gVGhpcyBpcyB1bmRlc2lyYWJsZSwgZXNwZWNpYWxseSBpbiBtdWx0aXBsYXllci9tdWx0aS11c2VyXG4gICAgICogYXBwbGljYXRpb25zLlxuICAgICAqXG4gICAgICogT25lIHNvbHV0aW9uIGlzIHRvIG11bHRpcGx5IHRoZSBzcGVlZCBieSB0aGUgYW1vdW50IG9mIHRpbWUgdGhhdCBoYXNcbiAgICAgKiBwYXNzZWQgYmV0d2VlbiByZW5kZXJpbmcgZnJhbWVzLiBGb3IgZXhhbXBsZSwgaWYgeW91IHdhbnQgeW91ciBvYmplY3QgdG9cbiAgICAgKiBtb3ZlIDYwMCB1bml0cyBwZXIgc2Vjb25kLCB5b3UgbWlnaHQgd3JpdGUgYG9iai54ICs9IDYwMCAqIGRlbHRhYCwgd2hlcmVcbiAgICAgKiBgZGVsdGFgIGlzIHRoZSB0aW1lIHBhc3NlZCBzaW5jZSB0aGUgbGFzdCBmcmFtZS4gKEZvciBjb252ZW5pZW5jZSwgbGV0J3NcbiAgICAgKiBtb3ZlIHRoaXMgc3RhdGVtZW50IHRvIGFuIHVwZGF0ZSgpIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYGRlbHRhYCBhcyBhXG4gICAgICogcGFyYW1ldGVyLikgVGhpcyB3YXksIHlvdXIgb2JqZWN0IHdpbGwgbW92ZSBhIGNvbnN0YW50IGRpc3RhbmNlIG92ZXJcbiAgICAgKiB0aW1lLiBIb3dldmVyLCBhdCBsb3cgZnJhbWUgcmF0ZXMgYW5kIGhpZ2ggc3BlZWRzLCB5b3VyIG9iamVjdCB3aWxsIG1vdmVcbiAgICAgKiBsYXJnZSBkaXN0YW5jZXMgZXZlcnkgZnJhbWUsIHdoaWNoIGNhbiBjYXVzZSBpdCB0byBkbyBzdHJhbmdlIHRoaW5nc1xuICAgICAqIHN1Y2ggYXMgbW92ZSB0aHJvdWdoIHdhbGxzLiBBZGRpdGlvbmFsbHksIHdlIHdvdWxkIGxpa2Ugb3VyIHByb2dyYW0gdG9cbiAgICAgKiBiZSBkZXRlcm1pbmlzdGljLiBUaGF0IGlzLCBldmVyeSB0aW1lIHdlIHJ1biB0aGUgYXBwbGljYXRpb24gd2l0aCB0aGVcbiAgICAgKiBzYW1lIGlucHV0LCB3ZSB3b3VsZCBsaWtlIGV4YWN0bHkgdGhlIHNhbWUgb3V0cHV0LiBJZiB0aGUgdGltZSBiZXR3ZWVuXG4gICAgICogZnJhbWVzICh0aGUgYGRlbHRhYCkgdmFyaWVzLCBvdXIgb3V0cHV0IHdpbGwgZGl2ZXJnZSB0aGUgbG9uZ2VyIHRoZVxuICAgICAqIHByb2dyYW0gcnVucyBkdWUgdG8gYWNjdW11bGF0ZWQgcm91bmRpbmcgZXJyb3JzLCBldmVuIGF0IG5vcm1hbCBmcmFtZVxuICAgICAqIHJhdGVzLlxuICAgICAqXG4gICAgICogQSBiZXR0ZXIgc29sdXRpb24gaXMgdG8gc2VwYXJhdGUgdGhlIGFtb3VudCBvZiB0aW1lIHNpbXVsYXRlZCBpbiBlYWNoXG4gICAgICogdXBkYXRlKCkgZnJvbSB0aGUgYW1vdW50IG9mIHRpbWUgYmV0d2VlbiBmcmFtZXMuIE91ciB1cGRhdGUoKSBmdW5jdGlvblxuICAgICAqIGRvZXNuJ3QgbmVlZCB0byBjaGFuZ2U7IHdlIGp1c3QgbmVlZCB0byBjaGFuZ2UgdGhlIGRlbHRhIHdlIHBhc3MgdG8gaXRcbiAgICAgKiBzbyB0aGF0IGVhY2ggdXBkYXRlKCkgc2ltdWxhdGVzIGEgZml4ZWQgYW1vdW50IG9mIHRpbWUgKHRoYXQgaXMsIGBkZWx0YWBcbiAgICAgKiBzaG91bGQgaGF2ZSB0aGUgc2FtZSB2YWx1ZSBlYWNoIHRpbWUgdXBkYXRlKCkgaXMgY2FsbGVkKS4gVGhlIHVwZGF0ZSgpXG4gICAgICogZnVuY3Rpb24gY2FuIGJlIHJ1biBtdWx0aXBsZSB0aW1lcyBwZXIgZnJhbWUgaWYgbmVlZGVkIHRvIHNpbXVsYXRlIHRoZVxuICAgICAqIHRvdGFsIGFtb3VudCBvZiB0aW1lIHBhc3NlZCBzaW5jZSB0aGUgbGFzdCBmcmFtZS4gKElmIHRoZSB0aW1lIHRoYXQgaGFzXG4gICAgICogcGFzc2VkIHNpbmNlIHRoZSBsYXN0IGZyYW1lIGlzIGxlc3MgdGhhbiB0aGUgZml4ZWQgc2ltdWxhdGlvbiB0aW1lLCB3ZVxuICAgICAqIGp1c3Qgd29uJ3QgcnVuIGFuIHVwZGF0ZSgpIHVudGlsIHRoZSB0aGUgbmV4dCBmcmFtZS4gSWYgdGhlcmUgaXNcbiAgICAgKiB1bnNpbXVsYXRlZCB0aW1lIGxlZnQgb3ZlciB0aGF0IGlzIGxlc3MgdGhhbiBvdXIgdGltZXN0ZXAsIHdlJ2xsIGp1c3RcbiAgICAgKiBsZWF2ZSBpdCB0byBiZSBzaW11bGF0ZWQgZHVyaW5nIHRoZSBuZXh0IGZyYW1lLikgVGhpcyBhcHByb2FjaCBhdm9pZHNcbiAgICAgKiBpbmNvbnNpc3RlbnQgcm91bmRpbmcgZXJyb3JzIGFuZCBlbnN1cmVzIHRoYXQgdGhlcmUgYXJlIG5vIGdpYW50IGxlYXBzXG4gICAgICogdGhyb3VnaCB3YWxscyBiZXR3ZWVuIGZyYW1lcy5cbiAgICAgKlxuICAgICAqIFRoYXQgaXMgd2hhdCBpcyBkb25lIGJlbG93LiBJdCBpbnRyb2R1Y2VzIGEgbmV3IHByb2JsZW0sIGJ1dCBpdCBpcyBhXG4gICAgICogbWFuYWdlYWJsZSBvbmU6IGlmIHRoZSBhbW91bnQgb2YgdGltZSBzcGVudCBzaW11bGF0aW5nIGlzIGNvbnNpc3RlbnRseVxuICAgICAqIGxvbmdlciB0aGFuIHRoZSBhbW91bnQgb2YgdGltZSBiZXR3ZWVuIGZyYW1lcywgdGhlIGFwcGxpY2F0aW9uIGNvdWxkXG4gICAgICogZnJlZXplIGFuZCBjcmFzaCBpbiBhIHNwaXJhbCBvZiBkZWF0aC4gVGhpcyB3b24ndCBoYXBwZW4gYXMgbG9uZyBhcyB0aGVcbiAgICAgKiBmaXhlZCBzaW11bGF0aW9uIHRpbWUgaXMgc2V0IHRvIGEgdmFsdWUgdGhhdCBpcyBoaWdoIGVub3VnaCB0aGF0XG4gICAgICogdXBkYXRlKCkgY2FsbHMgdXN1YWxseSB0YWtlIGxlc3MgdGltZSB0aGFuIHRoZSBhbW91bnQgb2YgdGltZSB0aGV5J3JlXG4gICAgICogc2ltdWxhdGluZy4gSWYgaXQgZG9lcyBzdGFydCB0byBoYXBwZW4gYW55d2F5LCBzZWUgYE1haW5Mb29wLnNldEVuZCgpYFxuICAgICAqIGZvciBhIGRpc2N1c3Npb24gb2Ygd2F5cyB0byBzdG9wIGl0LlxuICAgICAqXG4gICAgICogQWRkaXRpb25hbGx5LCBzZWUgYE1haW5Mb29wLnNldFVwZGF0ZSgpYCBmb3IgYSBkaXNjdXNzaW9uIG9mIHBlcmZvcm1hbmNlXG4gICAgICogY29uc2lkZXJhdGlvbnMuXG4gICAgICpcbiAgICAgKiBGdXJ0aGVyIHJlYWRpbmcgZm9yIHRob3NlIGludGVyZXN0ZWQ6XG4gICAgICpcbiAgICAgKiAtIGh0dHA6Ly9nYW1lcHJvZ3JhbW1pbmdwYXR0ZXJucy5jb20vZ2FtZS1sb29wLmh0bWxcbiAgICAgKiAtIGh0dHA6Ly9nYWZmZXJvbmdhbWVzLmNvbS9nYW1lLXBoeXNpY3MvZml4LXlvdXItdGltZXN0ZXAvXG4gICAgICogLSBodHRwczovL2dhbWVhbGNoZW1pc3Qud29yZHByZXNzLmNvbS8yMDEzLzAzLzE2L3Rob3VnaHRzLW9uLXRoZS1qYXZhc2NyaXB0LWdhbWUtbG9vcC9cbiAgICAgKiAtIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvR2FtZXMvQW5hdG9teVxuICAgICAqL1xuICAgIG51bVVwZGF0ZVN0ZXBzID0gMDtcbiAgICB3aGlsZSAoZnJhbWVEZWx0YSA+PSBzaW11bGF0aW9uVGltZXN0ZXApIHtcbiAgICAgICAgdXBkYXRlKHNpbXVsYXRpb25UaW1lc3RlcCk7XG4gICAgICAgIGZyYW1lRGVsdGEgLT0gc2ltdWxhdGlvblRpbWVzdGVwO1xuXG4gICAgICAgIC8qXG4gICAgICAgICAqIFNhbml0eSBjaGVjazogYmFpbCBpZiB3ZSBydW4gdGhlIGxvb3AgdG9vIG1hbnkgdGltZXMuXG4gICAgICAgICAqXG4gICAgICAgICAqIE9uZSB3YXkgdGhpcyBjb3VsZCBoYXBwZW4gaXMgaWYgdXBkYXRlKCkgdGFrZXMgbG9uZ2VyIHRvIHJ1biB0aGFuXG4gICAgICAgICAqIHRoZSB0aW1lIGl0IHNpbXVsYXRlcywgdGhlcmVieSBjYXVzaW5nIGEgc3BpcmFsIG9mIGRlYXRoLiBGb3Igd2F5c1xuICAgICAgICAgKiB0byBhdm9pZCB0aGlzLCBzZWUgYE1haW5Mb29wLnNldEVuZCgpYC4gQW5vdGhlciB3YXkgdGhpcyBjb3VsZFxuICAgICAgICAgKiBoYXBwZW4gaXMgaWYgdGhlIGJyb3dzZXIgdGhyb3R0bGVzIHNlcnZpbmcgZnJhbWVzLCB3aGljaCB0eXBpY2FsbHlcbiAgICAgICAgICogb2NjdXJzIHdoZW4gdGhlIHRhYiBpcyBpbiB0aGUgYmFja2dyb3VuZCBvciB0aGUgZGV2aWNlIGJhdHRlcnkgaXNcbiAgICAgICAgICogbG93LiBBbiBldmVudCBvdXRzaWRlIG9mIHRoZSBtYWluIGxvb3Agc3VjaCBhcyBhdWRpbyBwcm9jZXNzaW5nIG9yXG4gICAgICAgICAqIHN5bmNocm9ub3VzIHJlc291cmNlIHJlYWRzIGNvdWxkIGFsc28gY2F1c2UgdGhlIGFwcGxpY2F0aW9uIHRvIGhhbmdcbiAgICAgICAgICogdGVtcG9yYXJpbHkgYW5kIGFjY3VtdWxhdGUgbm90LXlldC1zaW11bGF0ZWQgdGltZSBhcyBhIHJlc3VsdC5cbiAgICAgICAgICpcbiAgICAgICAgICogMjQwIGlzIGNob3NlbiBiZWNhdXNlLCBmb3IgYW55IHNhbmUgdmFsdWUgb2Ygc2ltdWxhdGlvblRpbWVzdGVwLCAyNDBcbiAgICAgICAgICogdXBkYXRlcyB3aWxsIHNpbXVsYXRlIGF0IGxlYXN0IG9uZSBzZWNvbmQsIGFuZCBpdCB3aWxsIHNpbXVsYXRlIGZvdXJcbiAgICAgICAgICogc2Vjb25kcyB3aXRoIHRoZSBkZWZhdWx0IHZhbHVlIG9mIHNpbXVsYXRpb25UaW1lc3RlcC4gKFNhZmFyaVxuICAgICAgICAgKiBub3RpZmllcyB1c2VycyB0aGF0IHRoZSBzY3JpcHQgaXMgdGFraW5nIHRvbyBsb25nIHRvIHJ1biBpZiBpdCB0YWtlc1xuICAgICAgICAgKiBtb3JlIHRoYW4gZml2ZSBzZWNvbmRzLilcbiAgICAgICAgICpcbiAgICAgICAgICogSWYgdGhlcmUgYXJlIG1vcmUgdXBkYXRlcyB0byBydW4gaW4gYSBmcmFtZSB0aGFuIHRoaXMsIHRoZVxuICAgICAgICAgKiBhcHBsaWNhdGlvbiB3aWxsIGFwcGVhciB0byBzbG93IGRvd24gdG8gdGhlIHVzZXIgdW50aWwgaXQgY2F0Y2hlc1xuICAgICAgICAgKiBiYWNrIHVwLiBJbiBuZXR3b3JrZWQgYXBwbGljYXRpb25zIHRoaXMgd2lsbCB1c3VhbGx5IGNhdXNlIHRoZSB1c2VyXG4gICAgICAgICAqIHRvIGdldCBvdXQgb2Ygc3luYyB3aXRoIHRoZWlyIHBlZXJzLCBidXQgaWYgdGhlIHVwZGF0ZXMgYXJlIHRha2luZ1xuICAgICAgICAgKiB0aGlzIGxvbmcgYWxyZWFkeSwgdGhleSdyZSBwcm9iYWJseSBhbHJlYWR5IG91dCBvZiBzeW5jLlxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKCsrbnVtVXBkYXRlU3RlcHMgPj0gMjQwKSB7XG4gICAgICAgICAgICBwYW5pYyA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgICogUmVuZGVyIHRoZSBzY3JlZW4uIFdlIGRvIHRoaXMgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHVwZGF0ZSgpIGhhcyBydW5cbiAgICAgKiBkdXJpbmcgdGhpcyBmcmFtZSBiZWNhdXNlIGl0IGlzIHBvc3NpYmxlIHRvIGludGVycG9sYXRlIGJldHdlZW4gdXBkYXRlc1xuICAgICAqIHRvIG1ha2UgdGhlIGZyYW1lIHJhdGUgYXBwZWFyIGZhc3RlciB0aGFuIHVwZGF0ZXMgYXJlIGFjdHVhbGx5XG4gICAgICogaGFwcGVuaW5nLiBTZWUgYE1haW5Mb29wLnNldERyYXcoKWAgZm9yIGFuIGV4cGxhbmF0aW9uIG9mIGhvdyB0byBkb1xuICAgICAqIHRoYXQuXG4gICAgICpcbiAgICAgKiBXZSBkcmF3IGFmdGVyIHVwZGF0aW5nIGJlY2F1c2Ugd2Ugd2FudCB0aGUgc2NyZWVuIHRvIHJlZmxlY3QgYSBzdGF0ZSBvZlxuICAgICAqIHRoZSBhcHBsaWNhdGlvbiB0aGF0IGlzIGFzIHVwLXRvLWRhdGUgYXMgcG9zc2libGUuIChgTWFpbkxvb3Auc3RhcnQoKWBcbiAgICAgKiBkcmF3cyB0aGUgdmVyeSBmaXJzdCBmcmFtZSBpbiB0aGUgYXBwbGljYXRpb24ncyBpbml0aWFsIHN0YXRlLCBiZWZvcmVcbiAgICAgKiBhbnkgdXBkYXRlcyBoYXZlIG9jY3VycmVkLikgU29tZSBzb3VyY2VzIHNwZWN1bGF0ZSB0aGF0IHJlbmRlcmluZ1xuICAgICAqIGVhcmxpZXIgaW4gdGhlIHJlcXVlc3RBbmltYXRpb25GcmFtZSBjYWxsYmFjayBjYW4gZ2V0IHRoZSBzY3JlZW4gcGFpbnRlZFxuICAgICAqIGZhc3RlcjsgdGhpcyBpcyBtb3N0bHkgbm90IHRydWUsIGFuZCBldmVuIHdoZW4gaXQgaXMsIGl0J3MgdXN1YWxseSBqdXN0XG4gICAgICogYSB0cmFkZS1vZmYgYmV0d2VlbiByZW5kZXJpbmcgdGhlIGN1cnJlbnQgZnJhbWUgc29vbmVyIGFuZCByZW5kZXJpbmcgdGhlXG4gICAgICogbmV4dCBmcmFtZSBsYXRlci5cbiAgICAgKlxuICAgICAqIFNlZSBgTWFpbkxvb3Auc2V0RHJhdygpYCBmb3IgZGV0YWlscyBhYm91dCBkcmF3KCkgaXRzZWxmLlxuICAgICAqL1xuICAgIGRyYXcoZnJhbWVEZWx0YSAvIHNpbXVsYXRpb25UaW1lc3RlcCk7XG5cbiAgICAvLyBSdW4gYW55IHVwZGF0ZXMgdGhhdCBhcmUgbm90IGRlcGVuZGVudCBvbiB0aW1lIGluIHRoZSBzaW11bGF0aW9uLiBTZWVcbiAgICAvLyBgTWFpbkxvb3Auc2V0RW5kKClgIGZvciBhZGRpdGlvbmFsIGRldGFpbHMgb24gaG93IHRvIHVzZSB0aGlzLlxuICAgIGVuZChmcHMsIHBhbmljKTtcblxuICAgIHBhbmljID0gZmFsc2U7XG5cbiAgICAvLyBSdW4gdGhlIGxvb3AgYWdhaW4gdGhlIG5leHQgdGltZSB0aGUgYnJvd3NlciBpcyByZWFkeSB0byByZW5kZXIuXG4gICAgcmFmSGFuZGxlID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xufVxuXG4vLyBBTUQgc3VwcG9ydFxuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShyb290Lk1haW5Mb29wKTtcbn1cbi8vIENvbW1vbkpTIHN1cHBvcnRcbmVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gcm9vdC5NYWluTG9vcDtcbn1cblxufSkoKTtcbiIsIi8qIEBmbG93ICovXG5cbmltcG9ydCBNYWluTG9vcCBmcm9tICcuLi9leHRlcm5hbC9tYWlubG9vcC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW5Mb29wTG9vcE1hbmFnZXIge1xuICAgIHNldFVwZGF0ZSh1cGRhdGVNZXRob2QgOiAoZGVsdGEgOiBudW1iZXIpID0+IHZvaWQpIDogTWFpbkxvb3BMb29wTWFuYWdlciB7XG4gICAgICAgIE1haW5Mb29wLnNldFVwZGF0ZSh1cGRhdGVNZXRob2QpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIHNldFJlbmRlcihyZW5kZXJNZXRob2QgOiAoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UgOiBudW1iZXIpID0+IHZvaWQpIDogTWFpbkxvb3BMb29wTWFuYWdlciB7XG4gICAgICAgIE1haW5Mb29wLnNldERyYXcocmVuZGVyTWV0aG9kKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICBzdGFydCgpIDogdm9pZCB7XG4gICAgICAgIE1haW5Mb29wLnN0YXJ0KCk7XG4gICAgfVxufSIsIi8qIEBmbG93Ki9cblxuaW1wb3J0IHsgRW50aXR5TWFuYWdlciB9IGZyb20gJ2dnLWVudGl0aWVzJztcblxuaW1wb3J0IFRocmVlUmVuZGVyZXJNYW5hZ2VyICAgZnJvbSAnLi4vdmlldy90aHJlZS1yZW5kZXJlci1tYW5hZ2VyJztcbmltcG9ydCBTdGF0c1BlcmZvcm1hbmNlVmlld2VyIGZyb20gJy4uL3ZpZXcvc3RhdHMtcGVyZm9ybWFuY2Utdmlld2VyJztcblxuaW1wb3J0IFRocmVlU2NlbmVNYW5hZ2VyICAgICBmcm9tICcuLi9sb2dpYy90aHJlZS1zY2VuZS1tYW5hZ2VyJztcbmltcG9ydCBUaHJlZU1lc2hNYW5hZ2VyICAgICAgZnJvbSAnLi4vbG9naWMvdGhyZWUtbWVzaC1tYW5hZ2VyJztcbmltcG9ydCBUaHJlZU9iamVjdE1lc2hMb2FkZXIgZnJvbSAnLi4vbG9naWMvdGhyZWUtb2JqZWN0LW1lc2gtbG9hZGVyJztcbmltcG9ydCBRV2VzdEFqYXhMb2FkZXIgICAgICAgZnJvbSAnLi4vbG9naWMvcXdlc3QtYWpheC1sb2FkZXInO1xuaW1wb3J0IExldmVsTG9hZGVyICAgICAgICAgICBmcm9tICcuLi9sb2dpYy9sZXZlbC1sb2FkZXInO1xuaW1wb3J0IE1haW5Mb29wTG9vcE1hbmFnZXIgICBmcm9tICcuLi9sb2dpYy9tYWlubG9vcC1sb29wLW1hbmFnZXInO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcmVuZGVyZXJNYW5hZ2VyKCkgOiBJUmVuZGVyZXJNYW5hZ2VyIHsgcmV0dXJuIG5ldyBUaHJlZVJlbmRlcmVyTWFuYWdlcigpOyB9LFxuXG4gICAgc2NlbmVNYW5hZ2VyKCkgOiBJU2NlbmVNYW5hZ2VyIHsgcmV0dXJuIG5ldyBUaHJlZVNjZW5lTWFuYWdlcigpOyB9LFxuICAgIFxuICAgIG1lc2hNYW5hZ2VyKCkgOiBJTWVzaE1hbmFnZXIgeyByZXR1cm4gbmV3IFRocmVlTWVzaE1hbmFnZXIoKTsgfSxcblxuICAgIGxldmVsTG9hZGVyKCkgOiBJTGV2ZWxMb2FkZXIgeyByZXR1cm4gbmV3IExldmVsTG9hZGVyKG5ldyBRV2VzdEFqYXhMb2FkZXIoKSk7IH0sXG4gICAgXG4gICAgZW50aXR5TWFuYWdlcigpIDogSUVudGl0eU1hbmFnZXIgeyByZXR1cm4gbmV3IEVudGl0eU1hbmFnZXIoKTsgfSxcbiAgICBcbiAgICBsb29wTWFuYWdlcigpIDogSUxvb3BNYW5hZ2VyIHsgcmV0dXJuIG5ldyBNYWluTG9vcExvb3BNYW5hZ2VyKCk7IH0sXG4gICAgXG4gICAgbWVzaExvYWRlcigpIDogSU1lc2hMb2FkZXIgeyByZXR1cm4gbmV3IFRocmVlT2JqZWN0TWVzaExvYWRlcigpOyB9LFxuICAgIFxuICAgIHBlcmZvcm1hbmNlVmlld2VyKCkgOiBJUGVyZm9ybWFuY2VWaWV3ZXIgeyByZXR1cm4gbmV3IFN0YXRzUGVyZm9ybWFuY2VWaWV3ZXIoKTsgfVxufTsiLCIvKiBAZmxvdyAqL1xuXG5leHBvcnQgY29uc3QgRmxhdFNoYWRpbmcgPSAxO1xuZXhwb3J0IGNvbnN0IFNtb290aFNoYWRpbmcgPSAyOyIsIi8qIEBmbG93ICovXG5cbmltcG9ydCBESSBmcm9tICcuL3V0aWxpdHkvZGVwZW5kZW5jeS1pbmplY3Rvcic7XG5cbmltcG9ydCB7IEZsYXRTaGFkaW5nIH0gZnJvbSAnLi9jb25zdGFudHMvc2hhZGluZyc7XG5cbndpbmRvdy5vbmxvYWQgPSBhc3luYyBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBsZXZlbExvYWRlciA9IERJLmxldmVsTG9hZGVyKCk7XG4gICAgY29uc3QgbGV2ZWwgICAgICAgPSBhd2FpdCBsZXZlbExvYWRlci5sb2FkTGV2ZWwoJ2xldmVscy9sZXZlbC1vbmUuanNvbicpO1xuICAgIFxuICAgIGNvbnN0IG1lc2hMb2FkZXIgID0gREkubWVzaExvYWRlcigpO1xuICAgIGNvbnN0IG1lc2hNYW5hZ2VyID0gREkubWVzaE1hbmFnZXIoKTtcbiAgICBjb25zdCBtZXNoSWQgICAgICA9IG1lc2hNYW5hZ2VyLmFkZE1lc2goYXdhaXQgbWVzaExvYWRlci5sb2FkKCdtZXNoZXMvJyArIGxldmVsLm1lc2gsIHsgc2hhZGluZyA6IEZsYXRTaGFkaW5nIH0pKTtcbiAgICBcbiAgICBjb25zdCBzY2VuZU1hbmFnZXIgPSBESS5zY2VuZU1hbmFnZXIoKTtcbiAgICBjb25zdCBzY2VuZUlkICAgICAgPSBzY2VuZU1hbmFnZXIuY3JlYXRlU2NlbmUoKTtcbiAgICBcbiAgICBzY2VuZU1hbmFnZXIuYWRkVG9TY2VuZShzY2VuZUlkLCBtZXNoTWFuYWdlci5nZXRNZXNoKG1lc2hJZCkpO1xuICAgIHNjZW5lTWFuYWdlci5hZGRBbWJpZW50TGlnaHRUb1NjZW5lKHNjZW5lSWQsIDB4MTAxMDMwKTtcbiBcdHNjZW5lTWFuYWdlci5hZGREaXJlY3Rpb25hbExpZ2h0VG9TY2VuZShzY2VuZUlkLCAweGZmZWVkZCwgMCwgMCwgMSk7XG5cbiAgICBjb25zdCBlbnRpdHlNYW5hZ2VyICAgPSBESS5lbnRpdHlNYW5hZ2VyKCk7XG4gICAgY29uc3QgcmVuZGVyZXJNYW5hZ2VyID0gREkucmVuZGVyZXJNYW5hZ2VyKCk7XG4gICAgY29uc3QgbG9vcE1hbmFnZXIgICAgID0gREkubG9vcE1hbmFnZXIoKTtcbiAgICBcbiAgICB2YXIgbWVzaElzQWRkZWQgPSB0cnVlO1xuICAgIFxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIGlmIChtZXNoSXNBZGRlZCkge1xuICAgICAgICAgICAgc2NlbmVNYW5hZ2VyLnJlbW92ZUZyb21TY2VuZShzY2VuZUlkLCBtZXNoTWFuYWdlci5nZXRNZXNoKG1lc2hJZCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2NlbmVNYW5hZ2VyLmFkZFRvU2NlbmUoc2NlbmVJZCwgbWVzaE1hbmFnZXIuZ2V0TWVzaChtZXNoSWQpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbWVzaElzQWRkZWQgPSAhbWVzaElzQWRkZWQ7XG4gICAgfSk7XG4gICAgXG4gICAgY29uc3QgcGVyZm9ybWFuY2VWaWV3ZXIgPSBESS5wZXJmb3JtYW5jZVZpZXdlcigpO1xuICAgIFxuICAgIHBlcmZvcm1hbmNlVmlld2VyLnNldE1vZGUoMCk7XG4gICAgXG4gICAgbG9vcE1hbmFnZXIuc2V0VXBkYXRlKGRlbHRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbWVzaE1hbmFnZXIuZ2V0TWVzaChtZXNoSWQpLnJvdGF0aW9uLnkgKz0gMC4wMDEgKiBkZWx0YTtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5TWFuYWdlci5vbkxvZ2ljKGRlbHRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgLnNldFJlbmRlcihpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgcGVyZm9ybWFuY2VWaWV3ZXIuYmVnaW4oKTtcbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICByZW5kZXJlck1hbmFnZXIucmVuZGVyKHNjZW5lTWFuYWdlci5nZXRTY2VuZShzY2VuZUlkKSwgaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UpO1xuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgIHBlcmZvcm1hbmNlVmlld2VyLmVuZCgpO1xuICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgIC5zdGFydCgpO1xufTsiXSwibmFtZXMiOlsiU3RhdHMiLCJ0aGlzIiwicXdlc3QiLCJRV2VzdEFqYXhMb2FkZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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