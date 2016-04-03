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

  var mainloop_min = __commonjs(function (module, exports, global) {
    /**
     * mainloop.js 1.0.3-20160320
     *
     * @author Isaac Sukin (http://www.isaacsukin.com/)
     * @license MIT
     */

    !function (a) {
      function b(a) {
        if (v = o(b), !(e + j > a)) {
          for (d += a - e, e = a, r(a, d), a > g + 1e3 && (f = .25 * h + .75 * f, g = a, h = 0), h++, i = 0; d >= c;) {
            if (s(c), d -= c, ++i >= 240) {
              m = !0;break;
            }
          }t(d / c), u(f, m), m = !1;
        }
      }var c = 1e3 / 60,
          d = 0,
          e = 0,
          f = 60,
          g = 0,
          h = 0,
          i = 0,
          j = 0,
          k = !1,
          l = !1,
          m = !1,
          n = "object" == (typeof window === "undefined" ? "undefined" : babelHelpers.typeof(window)) ? window : a,
          o = n.requestAnimationFrame || function () {
        var a = Date.now(),
            b,
            d;return function (e) {
          return b = Date.now(), d = Math.max(0, c - (b - a)), a = b + d, setTimeout(function () {
            e(b + d);
          }, d);
        };
      }(),
          p = n.cancelAnimationFrame || clearTimeout,
          q = function q() {},
          r = q,
          s = q,
          t = q,
          u = q,
          v;a.MainLoop = { getSimulationTimestep: function getSimulationTimestep() {
          return c;
        }, setSimulationTimestep: function setSimulationTimestep(a) {
          return c = a, this;
        }, getFPS: function getFPS() {
          return f;
        }, getMaxAllowedFPS: function getMaxAllowedFPS() {
          return 1e3 / j;
        }, setMaxAllowedFPS: function setMaxAllowedFPS(a) {
          return "undefined" == typeof a && (a = 1 / 0), 0 === a ? this.stop() : j = 1e3 / a, this;
        }, resetFrameDelta: function resetFrameDelta() {
          var a = d;return d = 0, a;
        }, setBegin: function setBegin(a) {
          return r = a || r, this;
        }, setUpdate: function setUpdate(a) {
          return s = a || s, this;
        }, setDraw: function setDraw(a) {
          return t = a || t, this;
        }, setEnd: function setEnd(a) {
          return u = a || u, this;
        }, start: function start() {
          return l || (l = !0, v = o(function (a) {
            t(1), k = !0, e = a, g = a, h = 0, v = o(b);
          })), this;
        }, stop: function stop() {
          return k = !1, l = !1, p(v), this;
        }, isRunning: function isRunning() {
          return k;
        } }, "function" == typeof define && define.amd ? define(a.MainLoop) : "object" == (typeof module === "undefined" ? "undefined" : babelHelpers.typeof(module)) && null !== module && "object" == babelHelpers.typeof(module.exports) && (module.exports = a.MainLoop);
    }(__commonjs_global);
    });

  var MainLoop = mainloop_min && (typeof mainloop_min === "undefined" ? "undefined" : babelHelpers.typeof(mainloop_min)) === 'object' && 'default' in mainloop_min ? mainloop_min['default'] : mainloop_min;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2cuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9jb21wb25lbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2ctZW50aXRpZXMvc3JjL2NvcmUvc3lzdGVtLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL3NyYy9jb3JlL2V2ZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL3NyYy9jb3JlL2VudGl0eS5qcyIsIi4uL3NyYy92aWV3L3RocmVlLXJlbmRlcmVyLW1hbmFnZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvc3RhdHMuanMvc3JjL1N0YXRzLmpzIiwiLi4vc3JjL3ZpZXcvc3RhdHMtcGVyZm9ybWFuY2Utdmlld2VyLmpzIiwiLi4vc3JjL2xvZ2ljL3RocmVlLXNjZW5lLW1hbmFnZXIuanMiLCIuLi9zcmMvbG9naWMvdGhyZWUtbWVzaC1tYW5hZ2VyLmpzIiwiLi4vc3JjL2xvZ2ljL3RocmVlLW9iamVjdC1tZXNoLWxvYWRlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9qcXVlcnktcGFyYW0vanF1ZXJ5LXBhcmFtLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3Bpbmt5c3dlYXIvcGlua3lzd2Vhci5qcyIsIi4uL25vZGVfbW9kdWxlcy9xd2VzdC9zcmMvcXdlc3QuanMiLCIuLi9zcmMvbG9naWMvcXdlc3QtYWpheC1sb2FkZXIuanMiLCIuLi9zcmMvbG9naWMvbGV2ZWwtbG9hZGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL21haW5sb29wLmpzL2J1aWxkL21haW5sb29wLm1pbi5qcyIsIi4uL3NyYy9sb2dpYy9tYWlubG9vcC1sb29wLW1hbmFnZXIuanMiLCIuLi9zcmMvdXRpbGl0eS9kZXBlbmRlbmN5LWluamVjdG9yLmpzIiwiLi4vc3JjL2NvbnN0YW50cy9zaGFkaW5nLmpzIiwiLi4vc3JjL2dnLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBvbmVudE1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIFxuICAgIG5ld0NvbXBvbmVudChjb21wb25lbnRJZCkge1xuICAgICAgICBsZXQgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRzLmdldChjb21wb25lbnRJZCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoY29tcG9uZW50ID09PSBudWxsIHx8IGNvbXBvbmVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgY29tcG9uZW50KSB7XG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6IHJldHVybiBuZXcgY29tcG9uZW50KCk7XG4gICAgICAgICAgICBjYXNlICdvYmplY3QnICA6IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKChjb21wb25lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJldCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoY29tcG9uZW50KS5mb3JFYWNoKGtleSA9PiByZXRba2V5XSA9IGNvbXBvbmVudFtrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICAgICAgfSkoY29tcG9uZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgICAgIGlmIChjb21wb25lbnQgPT09IG51bGwgfHwgY29tcG9uZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignY29tcG9uZW50IGNhbm5vdCBiZSBudWxsLicpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgbWF4ID0gTWF0aC5tYXgoLi4udGhpcy5jb21wb25lbnRzLmtleXMoKSk7XG4gICAgICAgIFxuICAgICAgICBsZXQgaWQgPSBtYXggPT09IHVuZGVmaW5lZCB8fCBtYXggPT09IG51bGwgfHwgbWF4ID09PSAtSW5maW5pdHkgPyAxIDogbWF4ID09PSAwID8gMSA6IG1heCAqIDI7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnRzLnNldChpZCwgY29tcG9uZW50KTtcblxuICAgICAgICByZXR1cm4gaWQ7XG4gICAgfVxuICAgIFxuICAgIGdldENvbXBvbmVudHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudHM7XG4gICAgfVxufSIsImltcG9ydCB7IFNlbGVjdG9yVHlwZSB9IGZyb20gJy4vZW50aXR5JztcblxuZXhwb3J0IGNvbnN0IFN5c3RlbVR5cGUgPSB7XG4gICAgTG9naWMgICA6IDAsXG4gICAgUmVuZGVyICA6IDFcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN5c3RlbU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmxvZ2ljU3lzdGVtcyAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMucmVuZGVyU3lzdGVtcyA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJTeXN0ZW0odHlwZSwgc2VsZWN0b3IsIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlICE9PSBTeXN0ZW1UeXBlLkxvZ2ljICYmIHR5cGUgIT09IFN5c3RlbVR5cGUuUmVuZGVyKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ3R5cGUgbXVzdCBiZSBhIHZhbGlkIFN5c3RlbVR5cGUuJyk7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgaWYgKHNlbGVjdG9yICE9PSBTZWxlY3RvclR5cGUuR2V0ICYmIHNlbGVjdG9yICE9PSBTZWxlY3RvclR5cGUuR2V0V2l0aCAmJlxuICAgICAgICAgICAgc2VsZWN0b3IgIT09IFNlbGVjdG9yVHlwZS5HZXRXaXRoT25seSAmJiBzZWxlY3RvciAhPT0gU2VsZWN0b3JUeXBlLkdldFdpdGhvdXQpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignc2VsZWN0b3IgbXVzdCBiZSBhIHZhbGlkIFNlbGVjdG9yVHlwZS4nKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnRzICE9PSAnbnVtYmVyJykgIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignY29tcG9uZW50cyBtdXN0IGJlIGEgbnVtYmVyLicpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHN5c3RlbSA9IHtcbiAgICAgICAgc2VsZWN0b3IsXG4gICAgICAgIGNvbXBvbmVudHMsXG4gICAgICAgIGNhbGxiYWNrXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBsZXQgc3lzdGVtSWQgPSBNYXRoLm1heCgwLCAuLi50aGlzLmxvZ2ljU3lzdGVtcy5rZXlzKCksIC4uLnRoaXMucmVuZGVyU3lzdGVtcy5rZXlzKCkpICsgMTtcbiAgICAgICAgXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBTeXN0ZW1UeXBlLkxvZ2ljIDogdGhpcy5sb2dpY1N5c3RlbXMuc2V0KHN5c3RlbUlkLCBzeXN0ZW0pOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU3lzdGVtVHlwZS5SZW5kZXIgOiB0aGlzLnJlbmRlclN5c3RlbXMuc2V0KHN5c3RlbUlkLCBzeXN0ZW0pOyBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHN5c3RlbUlkO1xuICAgIH1cbiAgICBcbiAgICByZW1vdmVTeXN0ZW0oc3lzdGVtSWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9naWNTeXN0ZW1zLmRlbGV0ZShzeXN0ZW1JZCkgfHwgdGhpcy5yZW5kZXJTeXN0ZW1zLmRlbGV0ZShzeXN0ZW1JZCk7XG4gICAgfVxufSIsImltcG9ydCBFbnRpdHlNYW5hZ2VyIGZyb20gJy4vZW50aXR5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRIYW5kbGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIFxuICAgIGVtcHR5UHJvbWlzZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcHJvbWlzZShjYWxsYmFjaywgY29udGV4dCwgYXJncywgdGltZW91dCkge1xuICAgICAgICBpZiAodGltZW91dCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0eXBlb2YgY29udGV4dCA9PT0gICdvYmplY3QnID8gY2FsbGJhY2suY2FsbChjb250ZXh0LCAuLi5hcmdzKSA6IGNhbGxiYWNrLmFwcGx5KGNvbnRleHQsIC4uLmFyZ3MpKTtcbiAgICAgICAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHR5cGVvZiBjb250ZXh0ID09PSAnb2JqZWN0JyA/IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgLi4uYXJncykgOiBjYWxsYmFjay5hcHBseShjb250ZXh0LCAuLi5hcmdzKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBsaXN0ZW4oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnQgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoIXRoaXMuZXZlbnRzLmhhcyhldmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnNldChldmVudCwgbmV3IE1hcCgpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGV2ZW50SWQgPSAtMTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnRJZCA9IE1hdGgubWF4KGV2ZW50SWQsIC4uLmV2ZW50LmtleXMoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgKytldmVudElkO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5ldmVudHMuZ2V0KGV2ZW50KS5zZXQoZXZlbnRJZCwgY2FsbGJhY2spO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGV2ZW50SWQ7XG4gICAgfVxuICAgIFxuICAgIHN0b3BMaXN0ZW4oZXZlbnRJZCkge1xuICAgICAgICBmb3IgKGxldCBldmVudHMgb2YgdGhpcy5ldmVudHMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGlkIG9mIGV2ZW50cy5rZXlzKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaWQgPT09IGV2ZW50SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50cy5kZWxldGUoZXZlbnRJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICB0cmlnZ2VyKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXMgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyID8gdGhpcy5ldmVudEhhbmRsZXIgOiB0aGlzO1xuICAgICAgICBcbiAgICAgICAgbGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG4gICAgICAgIFxuICAgICAgICBsZXQgWyBldmVudCBdID0gYXJncy5zcGxpY2UoMCwgMSk7XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCAhc2VsZi5ldmVudHMuaGFzKGV2ZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuZW1wdHlQcm9taXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY2FsbGJhY2sgb2Ygc2VsZi5ldmVudHMuZ2V0KGV2ZW50KS52YWx1ZXMoKSkge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChzZWxmLnByb21pc2UoY2FsbGJhY2ssIHRoaXMsIGFyZ3MsIDEpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlckRlbGF5ZWQoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcyBpbnN0YW5jZW9mIEVudGl0eU1hbmFnZXIgPyB0aGlzLmV2ZW50SGFuZGxlciA6IHRoaXM7XG4gICAgICAgIFxuICAgICAgICBsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBbIGV2ZW50LCB0aW1lb3V0IF0gPSBhcmdzLnNwbGljZSgwLCAyKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnQgIT09ICdzdHJpbmcnIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKHRpbWVvdXQpIHx8ICFzZWxmLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5lbXB0eVByb21pc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHByb21pc2VzID0gW107XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBjYWxsYmFjayBvZiBzZWxmLmV2ZW50cy5nZXQoZXZlbnQpLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHNlbGYucHJvbWlzZShjYWxsYmFjaywgdGhpcywgYXJncywgdGltZW91dCkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH1cbn0iLCJpbXBvcnQgQ29tcG9uZW50TWFuYWdlciAgICAgICAgICAgICAgZnJvbSAnLi9jb21wb25lbnQnO1xuaW1wb3J0IFN5c3RlbU1hbmFnZXIsIHsgU3lzdGVtVHlwZSB9IGZyb20gJy4vc3lzdGVtJztcbmltcG9ydCBFdmVudEhhbmRsZXIgICAgICAgICAgICAgICAgICBmcm9tICcuL2V2ZW50JztcblxuZXhwb3J0IGNvbnN0IFNlbGVjdG9yVHlwZSA9IHtcbiAgICBHZXQgICAgICAgICA6IDAsXG4gICAgR2V0V2l0aCAgICAgOiAxLFxuICAgIEdldFdpdGhPbmx5IDogMixcbiAgICBHZXRXaXRob3V0ICA6IDNcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudGl0eU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKGNhcGFjaXR5ID0gMTAwMCkge1xuICAgICAgICB0aGlzLmNhcGFjaXR5ICAgICAgICAgPSBjYXBhY2l0eTtcbiAgICAgICAgdGhpcy5jdXJyZW50TWF4RW50aXR5ID0gLTE7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkgICAgPSBuZXcgRW50aXR5RmFjdG9yeSgpO1xuICAgICAgICB0aGlzLnN5c3RlbU1hbmFnZXIgICAgPSBuZXcgU3lzdGVtTWFuYWdlcigpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudE1hbmFnZXIgPSBuZXcgQ29tcG9uZW50TWFuYWdlcigpO1xuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlciAgICAgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0aWVzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogdGhpcy5jYXBhY2l0eSB9LCAoKSA9PiB7IHJldHVybiAwOyB9ICk7XG4gICAgfVxuICAgIFxuICAgIGluY3JlYXNlQ2FwYWNpdHkoKSB7XG4gICAgICAgIGxldCBvbGRDYXBhY2l0eSA9IHRoaXMuY2FwYWNpdHk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNhcGFjaXR5ICo9IDI7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gb2xkQ2FwYWNpdHk7IGkgPCB0aGlzLmNhcGFjaXR5OyArK2kpIHtcbiAgICAgICAgICAgIHRoaXMuZW50aXRpZXNbaV0gPSAwO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBjb21wb25lbnRJZCBvZiB0aGlzLmNvbXBvbmVudE1hbmFnZXIuZ2V0Q29tcG9uZW50cygpLmtleXMoKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IG9sZENhcGFjaXR5OyBpIDwgdGhpcy5jYXBhY2l0eTsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGhpc1tjb21wb25lbnRJZF0ucHVzaCh0aGlzLmNvbXBvbmVudE1hbmFnZXIubmV3Q29tcG9uZW50KGNvbXBvbmVudElkKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbmV3RW50aXR5KGNvbXBvbmVudHMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnRzICE9PSAnbnVtYmVyJyB8fCBjb21wb25lbnRzIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhcGFjaXR5O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgZW50aXR5SWQgPSAwO1xuICAgICAgICBcbiAgICAgICAgZm9yICg7IGVudGl0eUlkIDwgdGhpcy5jYXBhY2l0eTsgKytlbnRpdHlJZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbZW50aXR5SWRdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChlbnRpdHlJZCA+PSB0aGlzLmNhcGFjaXR5KSB7XG4gICAgICAgICAgICAvLyB0b2RvOiBhdXRvIGluY3JlYXNlIGNhcGFjaXR5P1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FwYWNpdHk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChlbnRpdHlJZCA+IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWF4RW50aXR5ID0gZW50aXR5SWQ7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXRpZXNbZW50aXR5SWRdID0gY29tcG9uZW50cztcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBlbnRpdHlJZDtcbiAgICB9XG4gICAgXG4gICAgZGVsZXRlRW50aXR5KGVudGl0eUlkKSB7XG4gICAgICAgIHRoaXMuZW50aXRpZXNbZW50aXR5SWRdID0gMDtcbiAgICAgICAgXG4gICAgICAgIGlmIChlbnRpdHlJZCA8IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gZW50aXR5SWQ7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tpXSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IGk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgICpnZXRFbnRpdGllcyhjb21wb25lbnRzID0gMCwgdHlwZSA9IFNlbGVjdG9yVHlwZS5HZXRXaXRoKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBTZWxlY3RvclR5cGUuR2V0V2l0aDoge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGVudGl0eUlkIGluIHRoaXMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0eUlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2VudGl0eUlkXSAhPT0gMCAmJiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gJiBjb21wb25lbnRzKSA9PT0gY29tcG9uZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgeWllbGQgTWF0aC5mbG9vcihlbnRpdHlJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFNlbGVjdG9yVHlwZS5HZXRXaXRoT25seToge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGVudGl0eUlkIGluIHRoaXMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0eUlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2VudGl0eUlkXSAhPT0gMCAmJiB0aGlzLmVudGl0aWVzW2VudGl0eUlkXSA9PT0gY29tcG9uZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgeWllbGQgTWF0aC5mbG9vcihlbnRpdHlJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFNlbGVjdG9yVHlwZS5HZXRXaXRob3V0OiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW50aXR5SWQgaW4gdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5SWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbZW50aXR5SWRdICE9PSAwICYmICh0aGlzLmVudGl0aWVzW2VudGl0eUlkXSAmIGNvbXBvbmVudHMpICE9PSBjb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCBNYXRoLmZsb29yKGVudGl0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgU2VsZWN0b3JUeXBlLkdldDoge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGVudGl0eUlkIGluIHRoaXMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0eUlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIE1hdGguZmxvb3IoZW50aXR5SWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIENvbXBvbmVudCBNYW5hZ2VyXG4gICAgXG4gICAgcmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgICAgIGxldCBjb21wb25lbnRJZCA9IHRoaXMuY29tcG9uZW50TWFuYWdlci5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xuICAgICAgICBcbiAgICAgICAgdGhpc1tjb21wb25lbnRJZF0gPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jYXBhY2l0eTsgKytpKSB7XG4gICAgICAgICAgICB0aGlzW2NvbXBvbmVudElkXS5wdXNoKHRoaXMuY29tcG9uZW50TWFuYWdlci5uZXdDb21wb25lbnQoY29tcG9uZW50SWQpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGluaXRpYWxpemVyO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZW9mIGNvbXBvbmVudCkge1xuICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOiBpbml0aWFsaXplciA9IGNvbXBvbmVudDsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdvYmplY3QnOiB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbGl6ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKGNvbXBvbmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IGNvbXBvbmVudFtrZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDogaW5pdGlhbGl6ZXIgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbXBvbmVudDsgfTsgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS5yZWdpc3RlckluaXRpYWxpemVyKGNvbXBvbmVudElkLCBpbml0aWFsaXplcik7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gY29tcG9uZW50SWQ7XG4gICAgfVxuICAgIFxuICAgIGFkZENvbXBvbmVudChlbnRpdHlJZCwgY29tcG9uZW50SWQpIHtcbiAgICAgICAgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gfD0gY29tcG9uZW50SWQ7XG4gICAgfVxuICAgIFxuICAgIHJlbW92ZUNvbXBvbmVudChlbnRpdHlJZCwgY29tcG9uZW50SWQpIHtcbiAgICAgICAgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gJj0gfmNvbXBvbmVudElkO1xuICAgIH1cbiAgICBcbiAgICAvLyBTeXN0ZW0gTWFuYWdlclxuICAgIFxuICAgIHJlZ2lzdGVyU3lzdGVtKHR5cGUsIHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlZ2lzdGVyU3lzdGVtKHR5cGUsIHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyTG9naWNTeXN0ZW0oc2VsZWN0b3IsIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVnaXN0ZXJTeXN0ZW0oU3lzdGVtVHlwZS5Mb2dpYywgc2VsZWN0b3IsIGNvbXBvbmVudHMsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJSZW5kZXJTeXN0ZW0oc2VsZWN0b3IsIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVnaXN0ZXJTeXN0ZW0oU3lzdGVtVHlwZS5SZW5kZXIsIHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIFxuICAgIHJlbW92ZVN5c3RlbShzeXN0ZW1JZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlbW92ZVN5c3RlbShzeXN0ZW1JZCk7XG4gICAgfVxuICAgIFxuICAgIG9uTG9naWMoZGVsdGEpIHtcbiAgICAgICAgZm9yIChsZXQgc3lzdGVtIG9mIHRoaXMuc3lzdGVtTWFuYWdlci5sb2dpY1N5c3RlbXMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMsIHN5c3RlbS5zZWxlY3RvciksIGRlbHRhKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvblJlbmRlcihkZWx0YSkge1xuICAgICAgICBmb3IgKGxldCBzeXN0ZW0gb2YgdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlbmRlclN5c3RlbXMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMsIHN5c3RlbS5zZWxlY3RvciksIGRlbHRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEVudGl0eSBGYWN0b3J5XG4gICAgXG4gICAgcmVnaXN0ZXJJbml0aWFsaXplcihjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LnJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKTtcbiAgICB9XG4gICAgXG4gICAgYnVpbGQoKSB7XG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS5idWlsZCgpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIHdpdGhDb21wb25lbnQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS53aXRoQ29tcG9uZW50KGNvbXBvbmVudElkLCBpbml0aWFsaXplcik7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlQ29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW50aXR5RmFjdG9yeS5jcmVhdGVDb25maWd1cmF0aW9uKCk7XG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZShjb3VudCwgY29uZmlndXJhdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnRpdHlGYWN0b3J5LmNyZWF0ZSh0aGlzLCBjb3VudCwgY29uZmlndXJhdGlvbik7XG4gICAgfVxuICAgIFxuICAgIC8vIEV2ZW50IEhhbmRsZXJcbiAgICBcbiAgICBsaXN0ZW4oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci5saXN0ZW4oZXZlbnQsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgXG4gICAgc3RvcExpc3RlbihldmVudElkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci5zdG9wTGlzdGVuKGV2ZW50SWQpO1xuICAgIH1cbiAgICBcbiAgICB0cmlnZ2VyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlci5jYWxsKHRoaXMsIC4uLmFyZ3VtZW50cyk7XG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXJEZWxheWVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlckRlbGF5ZWQuY2FsbCh0aGlzLCAuLi5hcmd1bWVudHMpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEVudGl0eUZhY3Rvcnkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVycyAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJJbml0aWFsaXplcihjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGNvbXBvbmVudElkKSB8fCB0eXBlb2YgaW5pdGlhbGl6ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5pbml0aWFsaXplcnMuc2V0KGNvbXBvbmVudElkLCBpbml0aWFsaXplcik7XG4gICAgfVxuICAgIFxuICAgIGJ1aWxkKCkge1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSBuZXcgTWFwKCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgd2l0aENvbXBvbmVudChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGNvbXBvbmVudElkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgaW5pdGlhbGl6ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGluaXRpYWxpemVyID0gdGhpcy5pbml0aWFsaXplcnMuZ2V0KGNvbXBvbmVudElkKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnNldChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZUNvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb247XG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZShlbnRpdHlNYW5hZ2VyLCBjb3VudCA9IDEsIGNvbmZpZ3VyYXRpb24gPSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCEoZW50aXR5TWFuYWdlciBpbnN0YW5jZW9mIEVudGl0eU1hbmFnZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgY29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb24gfHwgdGhpcy5jb25maWd1cmF0aW9uO1xuXG4gICAgICAgIGxldCBjb21wb25lbnRzID0gMDtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGNvbXBvbmVudCBvZiBjb25maWd1cmF0aW9uLmtleXMoKSkge1xuICAgICAgICAgICAgY29tcG9uZW50cyB8PSBjb21wb25lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBlbnRpdGllcyA9IFtdO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgKytpKSB7XG4gICAgICAgICAgICBsZXQgZW50aXR5SWQgPSBlbnRpdHlNYW5hZ2VyLm5ld0VudGl0eShjb21wb25lbnRzKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGVudGl0eUlkID49IGVudGl0eU1hbmFnZXIuY2FwYWNpdHkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgW2NvbXBvbmVudElkLCBpbml0aWFsaXplcl0gb2YgY29uZmlndXJhdGlvbikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5pdGlhbGl6ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBpbml0aWFsaXplci5jYWxsKGVudGl0eU1hbmFnZXJbY29tcG9uZW50SWRdW2VudGl0eUlkXSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlbnRpdHlNYW5hZ2VyW2NvbXBvbmVudElkXVtlbnRpdHlJZF0gIT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGVudGl0eU1hbmFnZXJbY29tcG9uZW50SWRdW2VudGl0eUlkXSAhPT0gJ29iamVjdCcgJiYgcmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5TWFuYWdlcltjb21wb25lbnRJZF1bZW50aXR5SWRdID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZW50aXRpZXMucHVzaChlbnRpdHlJZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBlbnRpdGllcy5sZW5ndGggPT09IDEgPyBlbnRpdGllc1swXSA6IGVudGl0aWVzO1xuICAgIH1cbn0iLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgdGhyZWUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaHJlZVJlbmRlcmVyTWFuYWdlciB7XG4gICAgcmVuZGVyZXIgICAgIDogdGhyZWUuV2ViR0xSZW5kZXJlcjtcbiAgICBjYW1lcmEgICAgICAgOiB0aHJlZS5DYW1lcmE7XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgdGhyZWUuV2ViR0xSZW5kZXJlcih7IGFudGlhbGlhcyA6IHRydWUgfSk7XG4gICAgICAgIHRoaXMuY2FtZXJhICAgPSBuZXcgdGhyZWUuUGVyc3BlY3RpdmVDYW1lcmEoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJlci5kb21FbGVtZW50KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnkgPSAyMDtcbiAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueiA9IDIwO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jYW1lcmEubG9va0F0KG5ldyB0aHJlZS5WZWN0b3IzKDAuMCwgMC4wLCAwLjApKTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyKHNjZW5lIDogdGhyZWUuU2NlbmUsIGludGVycG9sYXRpb25QZXJjZW50YWdlIDogbnVtYmVyKSA6IHZvaWQge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcihzY2VuZSwgdGhpcy5jYW1lcmEpO1xuICAgIH1cbn1cbiIsIi8qKlxuICogQGF1dGhvciBtcmRvb2IgLyBodHRwOi8vbXJkb29iLmNvbS9cbiAqL1xuXG52YXIgU3RhdHMgPSBmdW5jdGlvbiAoKSB7XG5cblx0dmFyIG5vdyA9ICggc2VsZi5wZXJmb3JtYW5jZSAmJiBzZWxmLnBlcmZvcm1hbmNlLm5vdyApID8gc2VsZi5wZXJmb3JtYW5jZS5ub3cuYmluZCggcGVyZm9ybWFuY2UgKSA6IERhdGUubm93O1xuXG5cdHZhciBzdGFydFRpbWUgPSBub3coKSwgcHJldlRpbWUgPSBzdGFydFRpbWU7XG5cdHZhciBmcmFtZXMgPSAwLCBtb2RlID0gMDtcblxuXHRmdW5jdGlvbiBjcmVhdGVFbGVtZW50KCB0YWcsIGlkLCBjc3MgKSB7XG5cblx0XHR2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIHRhZyApO1xuXHRcdGVsZW1lbnQuaWQgPSBpZDtcblx0XHRlbGVtZW50LnN0eWxlLmNzc1RleHQgPSBjc3M7XG5cdFx0cmV0dXJuIGVsZW1lbnQ7XG5cblx0fVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZVBhbmVsKCBpZCwgZmcsIGJnICkge1xuXG5cdFx0dmFyIGRpdiA9IGNyZWF0ZUVsZW1lbnQoICdkaXYnLCBpZCwgJ3BhZGRpbmc6MCAwIDNweCAzcHg7dGV4dC1hbGlnbjpsZWZ0O2JhY2tncm91bmQ6JyArIGJnICk7XG5cblx0XHR2YXIgdGV4dCA9IGNyZWF0ZUVsZW1lbnQoICdkaXYnLCBpZCArICdUZXh0JywgJ2ZvbnQtZmFtaWx5OkhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmO2ZvbnQtc2l6ZTo5cHg7Zm9udC13ZWlnaHQ6Ym9sZDtsaW5lLWhlaWdodDoxNXB4O2NvbG9yOicgKyBmZyApO1xuXHRcdHRleHQuaW5uZXJIVE1MID0gaWQudG9VcHBlckNhc2UoKTtcblx0XHRkaXYuYXBwZW5kQ2hpbGQoIHRleHQgKTtcblxuXHRcdHZhciBncmFwaCA9IGNyZWF0ZUVsZW1lbnQoICdkaXYnLCBpZCArICdHcmFwaCcsICd3aWR0aDo3NHB4O2hlaWdodDozMHB4O2JhY2tncm91bmQ6JyArIGZnICk7XG5cdFx0ZGl2LmFwcGVuZENoaWxkKCBncmFwaCApO1xuXG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgNzQ7IGkgKysgKSB7XG5cblx0XHRcdGdyYXBoLmFwcGVuZENoaWxkKCBjcmVhdGVFbGVtZW50KCAnc3BhbicsICcnLCAnd2lkdGg6MXB4O2hlaWdodDozMHB4O2Zsb2F0OmxlZnQ7b3BhY2l0eTowLjk7YmFja2dyb3VuZDonICsgYmcgKSApO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRpdjtcblxuXHR9XG5cblx0ZnVuY3Rpb24gc2V0TW9kZSggdmFsdWUgKSB7XG5cblx0XHR2YXIgY2hpbGRyZW4gPSBjb250YWluZXIuY2hpbGRyZW47XG5cblx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdGNoaWxkcmVuWyBpIF0uc3R5bGUuZGlzcGxheSA9IGkgPT09IHZhbHVlID8gJ2Jsb2NrJyA6ICdub25lJztcblxuXHRcdH1cblxuXHRcdG1vZGUgPSB2YWx1ZTtcblxuXHR9XG5cblx0ZnVuY3Rpb24gdXBkYXRlR3JhcGgoIGRvbSwgdmFsdWUgKSB7XG5cblx0XHR2YXIgY2hpbGQgPSBkb20uYXBwZW5kQ2hpbGQoIGRvbS5maXJzdENoaWxkICk7XG5cdFx0Y2hpbGQuc3R5bGUuaGVpZ2h0ID0gTWF0aC5taW4oIDMwLCAzMCAtIHZhbHVlICogMzAgKSArICdweCc7XG5cblx0fVxuXG5cdC8vXG5cblx0dmFyIGNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoICdkaXYnLCAnc3RhdHMnLCAnd2lkdGg6ODBweDtvcGFjaXR5OjAuOTtjdXJzb3I6cG9pbnRlcicgKTtcblx0Y29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWRvd24nLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRzZXRNb2RlKCArKyBtb2RlICUgY29udGFpbmVyLmNoaWxkcmVuLmxlbmd0aCApO1xuXG5cdH0sIGZhbHNlICk7XG5cblx0Ly8gRlBTXG5cblx0dmFyIGZwcyA9IDAsIGZwc01pbiA9IEluZmluaXR5LCBmcHNNYXggPSAwO1xuXG5cdHZhciBmcHNEaXYgPSBjcmVhdGVQYW5lbCggJ2ZwcycsICcjMGZmJywgJyMwMDInICk7XG5cdHZhciBmcHNUZXh0ID0gZnBzRGl2LmNoaWxkcmVuWyAwIF07XG5cdHZhciBmcHNHcmFwaCA9IGZwc0Rpdi5jaGlsZHJlblsgMSBdO1xuXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZCggZnBzRGl2ICk7XG5cblx0Ly8gTVNcblxuXHR2YXIgbXMgPSAwLCBtc01pbiA9IEluZmluaXR5LCBtc01heCA9IDA7XG5cblx0dmFyIG1zRGl2ID0gY3JlYXRlUGFuZWwoICdtcycsICcjMGYwJywgJyMwMjAnICk7XG5cdHZhciBtc1RleHQgPSBtc0Rpdi5jaGlsZHJlblsgMCBdO1xuXHR2YXIgbXNHcmFwaCA9IG1zRGl2LmNoaWxkcmVuWyAxIF07XG5cblx0Y29udGFpbmVyLmFwcGVuZENoaWxkKCBtc0RpdiApO1xuXG5cdC8vIE1FTVxuXG5cdGlmICggc2VsZi5wZXJmb3JtYW5jZSAmJiBzZWxmLnBlcmZvcm1hbmNlLm1lbW9yeSApIHtcblxuXHRcdHZhciBtZW0gPSAwLCBtZW1NaW4gPSBJbmZpbml0eSwgbWVtTWF4ID0gMDtcblxuXHRcdHZhciBtZW1EaXYgPSBjcmVhdGVQYW5lbCggJ21iJywgJyNmMDgnLCAnIzIwMScgKTtcblx0XHR2YXIgbWVtVGV4dCA9IG1lbURpdi5jaGlsZHJlblsgMCBdO1xuXHRcdHZhciBtZW1HcmFwaCA9IG1lbURpdi5jaGlsZHJlblsgMSBdO1xuXG5cdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKCBtZW1EaXYgKTtcblxuXHR9XG5cblx0Ly9cblxuXHRzZXRNb2RlKCBtb2RlICk7XG5cblx0cmV0dXJuIHtcblxuXHRcdFJFVklTSU9OOiAxNCxcblxuXHRcdGRvbUVsZW1lbnQ6IGNvbnRhaW5lcixcblxuXHRcdHNldE1vZGU6IHNldE1vZGUsXG5cblx0XHRiZWdpbjogZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRzdGFydFRpbWUgPSBub3coKTtcblxuXHRcdH0sXG5cblx0XHRlbmQ6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0dmFyIHRpbWUgPSBub3coKTtcblxuXHRcdFx0bXMgPSB0aW1lIC0gc3RhcnRUaW1lO1xuXHRcdFx0bXNNaW4gPSBNYXRoLm1pbiggbXNNaW4sIG1zICk7XG5cdFx0XHRtc01heCA9IE1hdGgubWF4KCBtc01heCwgbXMgKTtcblxuXHRcdFx0bXNUZXh0LnRleHRDb250ZW50ID0gKCBtcyB8IDAgKSArICcgTVMgKCcgKyAoIG1zTWluIHwgMCApICsgJy0nICsgKCBtc01heCB8IDAgKSArICcpJztcblx0XHRcdHVwZGF0ZUdyYXBoKCBtc0dyYXBoLCBtcyAvIDIwMCApO1xuXG5cdFx0XHRmcmFtZXMgKys7XG5cblx0XHRcdGlmICggdGltZSA+IHByZXZUaW1lICsgMTAwMCApIHtcblxuXHRcdFx0XHRmcHMgPSBNYXRoLnJvdW5kKCAoIGZyYW1lcyAqIDEwMDAgKSAvICggdGltZSAtIHByZXZUaW1lICkgKTtcblx0XHRcdFx0ZnBzTWluID0gTWF0aC5taW4oIGZwc01pbiwgZnBzICk7XG5cdFx0XHRcdGZwc01heCA9IE1hdGgubWF4KCBmcHNNYXgsIGZwcyApO1xuXG5cdFx0XHRcdGZwc1RleHQudGV4dENvbnRlbnQgPSBmcHMgKyAnIEZQUyAoJyArIGZwc01pbiArICctJyArIGZwc01heCArICcpJztcblx0XHRcdFx0dXBkYXRlR3JhcGgoIGZwc0dyYXBoLCBmcHMgLyAxMDAgKTtcblxuXHRcdFx0XHRwcmV2VGltZSA9IHRpbWU7XG5cdFx0XHRcdGZyYW1lcyA9IDA7XG5cblx0XHRcdFx0aWYgKCBtZW0gIT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRcdHZhciBoZWFwU2l6ZSA9IHBlcmZvcm1hbmNlLm1lbW9yeS51c2VkSlNIZWFwU2l6ZTtcblx0XHRcdFx0XHR2YXIgaGVhcFNpemVMaW1pdCA9IHBlcmZvcm1hbmNlLm1lbW9yeS5qc0hlYXBTaXplTGltaXQ7XG5cblx0XHRcdFx0XHRtZW0gPSBNYXRoLnJvdW5kKCBoZWFwU2l6ZSAqIDAuMDAwMDAwOTU0ICk7XG5cdFx0XHRcdFx0bWVtTWluID0gTWF0aC5taW4oIG1lbU1pbiwgbWVtICk7XG5cdFx0XHRcdFx0bWVtTWF4ID0gTWF0aC5tYXgoIG1lbU1heCwgbWVtICk7XG5cblx0XHRcdFx0XHRtZW1UZXh0LnRleHRDb250ZW50ID0gbWVtICsgJyBNQiAoJyArIG1lbU1pbiArICctJyArIG1lbU1heCArICcpJztcblx0XHRcdFx0XHR1cGRhdGVHcmFwaCggbWVtR3JhcGgsIGhlYXBTaXplIC8gaGVhcFNpemVMaW1pdCApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGltZTtcblxuXHRcdH0sXG5cblx0XHR1cGRhdGU6IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0c3RhcnRUaW1lID0gdGhpcy5lbmQoKTtcblxuXHRcdH1cblxuXHR9O1xuXG59O1xuXG5pZiAoIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICkge1xuXG5cdG1vZHVsZS5leHBvcnRzID0gU3RhdHM7XG5cbn1cbiIsIi8qIEBmbG93ICovXG5cbmltcG9ydCBTdGF0cyBmcm9tICdzdGF0cy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRzUGVyZm9ybWFuY2VWaWV3ZXIge1xuICAgIHN0YXRzIDogU3RhdHM7XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc3RhdHMgPSBuZXcgU3RhdHMoKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy5zdGF0cy5kb21FbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgICAgIHRoaXMuc3RhdHMuZG9tRWxlbWVudC5zdHlsZS5sZWZ0ID0gJzBweCc7XG4gICAgICAgICAgICB0aGlzLnN0YXRzLmRvbUVsZW1lbnQuc3R5bGUudG9wID0gJzBweCc7XG4gICAgICAgICAgICAgXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuc3RhdHMuZG9tRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgc2V0TW9kZShtb2RlOiAwIHwgMSk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXRzLnNldE1vZGUobW9kZSk7XG4gICAgfVxuICAgIFxuICAgIGJlZ2luKCkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdGF0cy5iZWdpbigpO1xuICAgIH1cbiAgICBcbiAgICBlbmQoKSA6IHZvaWQge1xuICAgICAgICB0aGlzLnN0YXRzLmVuZCgpO1xuICAgIH1cbn1cbiIsIi8qIEBmbG93ICovXG5cbmltcG9ydCB0aHJlZSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRocmVlU2NlbmVNYW5hZ2VyIHtcbiAgICBzY2VuZXMgOiBBcnJheTx0aHJlZS5TY2VuZT47XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc2NlbmVzID0gW107XG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZVNjZW5lKCkgOiBudW1iZXIge1xuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgc2NlbmUsIGFkZCBpdCB0byB0aGUgbGlzdCBvZiBzY2VuZXMgYW5kIHJldHVybiBhIGhhbmRsZSAoaWQpIHRvIGl0XG4gICAgICAgIHJldHVybiB0aGlzLnNjZW5lcy5wdXNoKG5ldyB0aHJlZS5TY2VuZSgpKSAtIDE7XG4gICAgfVxuICAgIFxuICAgIGdldFNjZW5lKHNjZW5lSWQgOiBudW1iZXIpIDogdGhyZWUuU2NlbmUge1xuICAgICAgICByZXR1cm4gdGhpcy5zY2VuZXNbc2NlbmVJZF07XG4gICAgfVxuICAgIFxuICAgIGFkZFRvU2NlbmUoc2NlbmVJZCA6IG51bWJlciwgb2JqZWN0IDogdGhyZWUuT2JqZWN0M0QpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuc2NlbmVzW3NjZW5lSWRdLmFkZChvYmplY3QpO1xuICAgIH1cbiAgICBcbiAgICBhZGRBbWJpZW50TGlnaHRUb1NjZW5lKHNjZW5lSWQgOiBudW1iZXIsIGNvbG9yIDogbnVtYmVyKSA6IHZvaWQge1xuICAgICAgICB0aGlzLnNjZW5lc1tzY2VuZUlkXS5hZGQobmV3IHRocmVlLkFtYmllbnRMaWdodChjb2xvcikpO1xuICAgIH1cbiAgICBcbiAgICBhZGREaXJlY3Rpb25hbExpZ2h0VG9TY2VuZShzY2VuZUlkIDogbnVtYmVyLCBjb2xvciA6IG51bWJlciwgeCA6IG51bWJlciwgeSA6IG51bWJlciwgeiA6IG51bWJlcikgOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbGlnaHQgPSBuZXcgdGhyZWUuRGlyZWN0aW9uYWxMaWdodChjb2xvcik7XG5cdCAgICBsaWdodC5wb3NpdGlvbi5zZXQoeCwgeSwgeik7XG5cdFxuICAgICAgICB0aGlzLnNjZW5lc1tzY2VuZUlkXS5hZGQobGlnaHQpO1xuICAgIH1cbiAgICBcbiAgICByZW1vdmVGcm9tU2NlbmUoc2NlbmVJZCA6IG51bWJlciwgb2JqZWN0IDogdGhyZWUuT2JqZWN0M0QpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuc2NlbmVzW3NjZW5lSWRdLnJlbW92ZShvYmplY3QpO1xuICAgIH1cbn0iLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgdGhyZWUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaHJlZU1lc2hNYW5hZ2VyIHtcbiAgICBtZXNoZXMgOiBBcnJheTx0aHJlZS5NZXNoPjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5tZXNoZXMgPSBbXTtcbiAgICB9XG4gICAgXG4gICAgYWRkTWVzaChvYmplY3QgOiB0aHJlZS5NZXNoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lc2hlcy5wdXNoKG9iamVjdCkgLSAxO1xuICAgIH1cbiAgICBcbiAgICBnZXRNZXNoKG1lc2hJZCA6IG51bWJlcikgOiB0aHJlZS5NZXNoIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzaGVzW21lc2hJZF07XG4gICAgfVxufSIsIi8qIEBmbG93ICovXG5cbmltcG9ydCB0aHJlZSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRocmVlT2JqZWN0TWVzaExvYWRlciB7XG4gICAgbG9hZGVyICA6IHRocmVlLk9iamVjdExvYWRlcjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5sb2FkZXIgID0gbmV3IHRocmVlLk9iamVjdExvYWRlcigpO1xuICAgIH1cbiAgICBcbiAgICBvblByb2dyZXNzKCkge1xuICAgICAgICAvLyBwbGFjZWhvbGRlclxuICAgIH1cbiAgICBcbiAgICAvLyB0b2RvIHRoaXMgbm93IHJldHVybnMgYSBzY2VuZS4uIGltcGxpY2F0aW9ucz9cbiAgICAvLyB0b2RvIGFkZCBvcHRpb25zIGFzIGEgZGVzdHJ1Y3RhYmxlIG9iamVjdCAtPiBzdG9wcGVkIGJ5IGZsb3c6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9mbG93L2lzc3Vlcy8xODNcbiAgICBsb2FkKHBhdGggOiBzdHJpbmcsIG9wdGlvbnM/IDogT2JqZWN0KSA6IFByb21pc2Uge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNoYWRpbmcgPSAob3B0aW9ucyB8fCB7IH0pLnNoYWRpbmc7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzZWxmLmxvYWRlci5sb2FkKHBhdGgsIG9iaiA9PiByZXNvbHZlKG9iaiksIGluZm8gPT4gc2VsZi5vblByb2dyZXNzKGluZm8pLCBlcnIgPT4gcmVqZWN0KGVycikpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKG1lc2ggPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzaGFkaW5nICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXNoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBtZXNoLnRyYXZlcnNlKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiB0aHJlZS5NZXNoKSB7XG4gICAgICAgICAgICAgICAgICAgY2hpbGQubWF0ZXJpYWwuc2hhZGluZyA9IHNoYWRpbmc7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIG1lc2g7XG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSIsIi8qKlxuICogQHByZXNlcnZlIGpxdWVyeS1wYXJhbSAoYykgMjAxNSBLTk9XTEVER0VDT0RFIHwgTUlUXG4gKi9cbi8qZ2xvYmFsIGRlZmluZSAqL1xuKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgcGFyYW0gPSBmdW5jdGlvbiAoYSkge1xuICAgICAgICB2YXIgYWRkID0gZnVuY3Rpb24gKHMsIGssIHYpIHtcbiAgICAgICAgICAgIHYgPSB0eXBlb2YgdiA9PT0gJ2Z1bmN0aW9uJyA/IHYoKSA6IHYgPT09IG51bGwgPyAnJyA6IHYgPT09IHVuZGVmaW5lZCA/ICcnIDogdjtcbiAgICAgICAgICAgIHNbcy5sZW5ndGhdID0gZW5jb2RlVVJJQ29tcG9uZW50KGspICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHYpO1xuICAgICAgICB9LCBidWlsZFBhcmFtcyA9IGZ1bmN0aW9uIChwcmVmaXgsIG9iaiwgcykge1xuICAgICAgICAgICAgdmFyIGksIGxlbiwga2V5O1xuXG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBvYmoubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQYXJhbXMocHJlZml4ICsgJ1snICsgKHR5cGVvZiBvYmpbaV0gPT09ICdvYmplY3QnID8gaSA6ICcnKSArICddJywgb2JqW2ldLCBzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9iaiAmJiBvYmoudG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJlZml4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRQYXJhbXMocHJlZml4ICsgJ1snICsga2V5ICsgJ10nLCBvYmpba2V5XSwgcywgYWRkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRQYXJhbXMoa2V5LCBvYmpba2V5XSwgcywgYWRkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJlZml4KSB7XG4gICAgICAgICAgICAgICAgYWRkKHMsIHByZWZpeCwgb2JqKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZChzLCBrZXksIG9ialtrZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGJ1aWxkUGFyYW1zKCcnLCBhLCBbXSkuam9pbignJicpLnJlcGxhY2UoLyUyMC9nLCAnKycpO1xuICAgIH07XG5cbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHBhcmFtO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmFtO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBnbG9iYWwucGFyYW0gPSBwYXJhbTtcbiAgICB9XG5cbn0odGhpcykpO1xuIiwiLypcbiAqIFBpbmt5U3dlYXIuanMgMi4yLjIgLSBNaW5pbWFsaXN0aWMgaW1wbGVtZW50YXRpb24gb2YgdGhlIFByb21pc2VzL0ErIHNwZWNcbiAqIFxuICogUHVibGljIERvbWFpbi4gVXNlLCBtb2RpZnkgYW5kIGRpc3RyaWJ1dGUgaXQgYW55IHdheSB5b3UgbGlrZS4gTm8gYXR0cmlidXRpb24gcmVxdWlyZWQuXG4gKlxuICogTk8gV0FSUkFOVFkgRVhQUkVTU0VEIE9SIElNUExJRUQuIFVTRSBBVCBZT1VSIE9XTiBSSVNLLlxuICpcbiAqIFBpbmt5U3dlYXIgaXMgYSB2ZXJ5IHNtYWxsIGltcGxlbWVudGF0aW9uIG9mIHRoZSBQcm9taXNlcy9BKyBzcGVjaWZpY2F0aW9uLiBBZnRlciBjb21waWxhdGlvbiB3aXRoIHRoZVxuICogR29vZ2xlIENsb3N1cmUgQ29tcGlsZXIgYW5kIGd6aXBwaW5nIGl0IHdlaWdocyBsZXNzIHRoYW4gNTAwIGJ5dGVzLiBJdCBpcyBiYXNlZCBvbiB0aGUgaW1wbGVtZW50YXRpb24gZm9yIFxuICogTWluaWZpZWQuanMgYW5kIHNob3VsZCBiZSBwZXJmZWN0IGZvciBlbWJlZGRpbmcuIFxuICpcbiAqXG4gKiBQaW5reVN3ZWFyIGhhcyBqdXN0IHRocmVlIGZ1bmN0aW9ucy5cbiAqXG4gKiBUbyBjcmVhdGUgYSBuZXcgcHJvbWlzZSBpbiBwZW5kaW5nIHN0YXRlLCBjYWxsIHBpbmt5U3dlYXIoKTpcbiAqICAgICAgICAgdmFyIHByb21pc2UgPSBwaW5reVN3ZWFyKCk7XG4gKlxuICogVGhlIHJldHVybmVkIG9iamVjdCBoYXMgYSBQcm9taXNlcy9BKyBjb21wYXRpYmxlIHRoZW4oKSBpbXBsZW1lbnRhdGlvbjpcbiAqICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSkgeyBhbGVydChcIlN1Y2Nlc3MhXCIpOyB9LCBmdW5jdGlvbih2YWx1ZSkgeyBhbGVydChcIkZhaWx1cmUhXCIpOyB9KTtcbiAqXG4gKlxuICogVGhlIHByb21pc2UgcmV0dXJuZWQgYnkgcGlua3lTd2VhcigpIGlzIGEgZnVuY3Rpb24uIFRvIGZ1bGZpbGwgdGhlIHByb21pc2UsIGNhbGwgdGhlIGZ1bmN0aW9uIHdpdGggdHJ1ZSBhcyBmaXJzdCBhcmd1bWVudCBhbmRcbiAqIGFuIG9wdGlvbmFsIGFycmF5IG9mIHZhbHVlcyB0byBwYXNzIHRvIHRoZSB0aGVuKCkgaGFuZGxlci4gQnkgcHV0dGluZyBtb3JlIHRoYW4gb25lIHZhbHVlIGluIHRoZSBhcnJheSwgeW91IGNhbiBwYXNzIG1vcmUgdGhhbiBvbmVcbiAqIHZhbHVlIHRvIHRoZSB0aGVuKCkgaGFuZGxlcnMuIEhlcmUgYW4gZXhhbXBsZSB0byBmdWxmaWxsIGEgcHJvbXNpc2UsIHRoaXMgdGltZSB3aXRoIG9ubHkgb25lIGFyZ3VtZW50OiBcbiAqICAgICAgICAgcHJvbWlzZSh0cnVlLCBbNDJdKTtcbiAqXG4gKiBXaGVuIHRoZSBwcm9taXNlIGhhcyBiZWVuIHJlamVjdGVkLCBjYWxsIGl0IHdpdGggZmFsc2UuIEFnYWluLCB0aGVyZSBtYXkgYmUgbW9yZSB0aGFuIG9uZSBhcmd1bWVudCBmb3IgdGhlIHRoZW4oKSBoYW5kbGVyOlxuICogICAgICAgICBwcm9taXNlKHRydWUsIFs2LCA2LCA2XSk7XG4gKiAgICAgICAgIFxuICogWW91IGNhbiBvYnRhaW4gdGhlIHByb21pc2UncyBjdXJyZW50IHN0YXRlIGJ5IGNhbGxpbmcgdGhlIGZ1bmN0aW9uIHdpdGhvdXQgYXJndW1lbnRzLiBJdCB3aWxsIGJlIHRydWUgaWYgZnVsZmlsbGVkLFxuICogZmFsc2UgaWYgcmVqZWN0ZWQsIGFuZCBvdGhlcndpc2UgdW5kZWZpbmVkLlxuICogXHRcdCAgIHZhciBzdGF0ZSA9IHByb21pc2UoKTsgXG4gKiBcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90aW1qYW5zZW4vUGlua3lTd2Vhci5qc1xuICovXG4oZnVuY3Rpb24odGFyZ2V0KSB7XG5cdHZhciB1bmRlZjtcblxuXHRmdW5jdGlvbiBpc0Z1bmN0aW9uKGYpIHtcblx0XHRyZXR1cm4gdHlwZW9mIGYgPT0gJ2Z1bmN0aW9uJztcblx0fVxuXHRmdW5jdGlvbiBpc09iamVjdChmKSB7XG5cdFx0cmV0dXJuIHR5cGVvZiBmID09ICdvYmplY3QnO1xuXHR9XG5cdGZ1bmN0aW9uIGRlZmVyKGNhbGxiYWNrKSB7XG5cdFx0aWYgKHR5cGVvZiBzZXRJbW1lZGlhdGUgIT0gJ3VuZGVmaW5lZCcpXG5cdFx0XHRzZXRJbW1lZGlhdGUoY2FsbGJhY2spO1xuXHRcdGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9ICd1bmRlZmluZWQnICYmIHByb2Nlc3NbJ25leHRUaWNrJ10pXG5cdFx0XHRwcm9jZXNzWyduZXh0VGljayddKGNhbGxiYWNrKTtcblx0XHRlbHNlXG5cdFx0XHRzZXRUaW1lb3V0KGNhbGxiYWNrLCAwKTtcblx0fVxuXG5cdHRhcmdldFswXVt0YXJnZXRbMV1dID0gZnVuY3Rpb24gcGlua3lTd2VhcihleHRlbmQpIHtcblx0XHR2YXIgc3RhdGU7ICAgICAgICAgICAvLyB1bmRlZmluZWQvbnVsbCA9IHBlbmRpbmcsIHRydWUgPSBmdWxmaWxsZWQsIGZhbHNlID0gcmVqZWN0ZWRcblx0XHR2YXIgdmFsdWVzID0gW107ICAgICAvLyBhbiBhcnJheSBvZiB2YWx1ZXMgYXMgYXJndW1lbnRzIGZvciB0aGUgdGhlbigpIGhhbmRsZXJzXG5cdFx0dmFyIGRlZmVycmVkID0gW107ICAgLy8gZnVuY3Rpb25zIHRvIGNhbGwgd2hlbiBzZXQoKSBpcyBpbnZva2VkXG5cblx0XHR2YXIgc2V0ID0gZnVuY3Rpb24obmV3U3RhdGUsIG5ld1ZhbHVlcykge1xuXHRcdFx0aWYgKHN0YXRlID09IG51bGwgJiYgbmV3U3RhdGUgIT0gbnVsbCkge1xuXHRcdFx0XHRzdGF0ZSA9IG5ld1N0YXRlO1xuXHRcdFx0XHR2YWx1ZXMgPSBuZXdWYWx1ZXM7XG5cdFx0XHRcdGlmIChkZWZlcnJlZC5sZW5ndGgpXG5cdFx0XHRcdFx0ZGVmZXIoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKVxuXHRcdFx0XHRcdFx0XHRkZWZlcnJlZFtpXSgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdH07XG5cblx0XHRzZXRbJ3RoZW4nXSA9IGZ1bmN0aW9uIChvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuXHRcdFx0dmFyIHByb21pc2UyID0gcGlua3lTd2VhcihleHRlbmQpO1xuXHRcdFx0dmFyIGNhbGxDYWxsYmFja3MgPSBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHR0cnkge1xuXHQgICAgXHRcdFx0dmFyIGYgPSAoc3RhdGUgPyBvbkZ1bGZpbGxlZCA6IG9uUmVqZWN0ZWQpO1xuXHQgICAgXHRcdFx0aWYgKGlzRnVuY3Rpb24oZikpIHtcblx0XHQgICBcdFx0XHRcdGZ1bmN0aW9uIHJlc29sdmUoeCkge1xuXHRcdFx0XHRcdFx0ICAgIHZhciB0aGVuLCBjYkNhbGxlZCA9IDA7XG5cdFx0ICAgXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdCAgIFx0XHRcdFx0aWYgKHggJiYgKGlzT2JqZWN0KHgpIHx8IGlzRnVuY3Rpb24oeCkpICYmIGlzRnVuY3Rpb24odGhlbiA9IHhbJ3RoZW4nXSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHggPT09IHByb21pc2UyKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhlblsnY2FsbCddKHgsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24oKSB7IGlmICghY2JDYWxsZWQrKykgcmVzb2x2ZS5hcHBseSh1bmRlZixhcmd1bWVudHMpOyB9ICxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbih2YWx1ZSl7IGlmICghY2JDYWxsZWQrKykgcHJvbWlzZTIoZmFsc2UsW3ZhbHVlXSk7fSk7XG5cdFx0XHRcdCAgIFx0XHRcdFx0fVxuXHRcdFx0XHQgICBcdFx0XHRcdGVsc2Vcblx0XHRcdFx0ICAgXHRcdFx0XHRcdHByb21pc2UyKHRydWUsIGFyZ3VtZW50cyk7XG5cdFx0ICAgXHRcdFx0XHRcdH1cblx0XHQgICBcdFx0XHRcdFx0Y2F0Y2goZSkge1xuXHRcdCAgIFx0XHRcdFx0XHRcdGlmICghY2JDYWxsZWQrKylcblx0XHQgICBcdFx0XHRcdFx0XHRcdHByb21pc2UyKGZhbHNlLCBbZV0pO1xuXHRcdCAgIFx0XHRcdFx0XHR9XG5cdFx0ICAgXHRcdFx0XHR9XG5cdFx0ICAgXHRcdFx0XHRyZXNvbHZlKGYuYXBwbHkodW5kZWYsIHZhbHVlcyB8fCBbXSkpO1xuXHRcdCAgIFx0XHRcdH1cblx0XHQgICBcdFx0XHRlbHNlXG5cdFx0ICAgXHRcdFx0XHRwcm9taXNlMihzdGF0ZSwgdmFsdWVzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaCAoZSkge1xuXHRcdFx0XHRcdHByb21pc2UyKGZhbHNlLCBbZV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0aWYgKHN0YXRlICE9IG51bGwpXG5cdFx0XHRcdGRlZmVyKGNhbGxDYWxsYmFja3MpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRkZWZlcnJlZC5wdXNoKGNhbGxDYWxsYmFja3MpO1xuXHRcdFx0cmV0dXJuIHByb21pc2UyO1xuXHRcdH07XG4gICAgICAgIGlmKGV4dGVuZCl7XG4gICAgICAgICAgICBzZXQgPSBleHRlbmQoc2V0KTtcbiAgICAgICAgfVxuXHRcdHJldHVybiBzZXQ7XG5cdH07XG59KSh0eXBlb2YgbW9kdWxlID09ICd1bmRlZmluZWQnID8gW3dpbmRvdywgJ3Bpbmt5U3dlYXInXSA6IFttb2R1bGUsICdleHBvcnRzJ10pO1xuXG4iLCIvKiEgcXdlc3QgNC4zLjIgKGh0dHBzOi8vZ2l0aHViLmNvbS9weXJzbWsvcXdlc3QpICovXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHR2YXIgZ2xvYmFsID0gd2luZG93IHx8IHRoaXMsXHJcblx0XHRwaW5reXN3ZWFyID0gcmVxdWlyZSgncGlua3lzd2VhcicpLFxyXG5cdFx0anBhcmFtID0gcmVxdWlyZSgnanF1ZXJ5LXBhcmFtJyksXHJcblx0XHRkZWZhdWx0T3B0aW9ucyA9IHt9LFxyXG5cdFx0Ly8gRGVmYXVsdCByZXNwb25zZSB0eXBlIGZvciBYRFIgaW4gYXV0byBtb2RlXHJcblx0XHRkZWZhdWx0WGRyUmVzcG9uc2VUeXBlID0gJ2pzb24nLFxyXG5cdFx0Ly8gRGVmYXVsdCBkYXRhIHR5cGVcclxuXHRcdGRlZmF1bHREYXRhVHlwZSA9ICdwb3N0JyxcclxuXHRcdC8vIFZhcmlhYmxlcyBmb3IgbGltaXQgbWVjaGFuaXNtXHJcblx0XHRsaW1pdCA9IG51bGwsXHJcblx0XHRyZXF1ZXN0cyA9IDAsXHJcblx0XHRyZXF1ZXN0X3N0YWNrID0gW10sXHJcblx0XHQvLyBHZXQgWE1MSHR0cFJlcXVlc3Qgb2JqZWN0XHJcblx0XHRnZXRYSFIgPSBnbG9iYWwuWE1MSHR0cFJlcXVlc3Q/IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiBuZXcgZ2xvYmFsLlhNTEh0dHBSZXF1ZXN0KCk7XHJcblx0XHR9OiBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxIVFRQJyk7XHJcblx0XHR9LFxyXG5cdFx0Ly8gR3Vlc3MgWEhSIHZlcnNpb25cclxuXHRcdHhocjIgPSAoZ2V0WEhSKCkucmVzcG9uc2VUeXBlPT09JycpLFxyXG5cclxuXHQvLyBDb3JlIGZ1bmN0aW9uXHJcblx0cXdlc3QgPSBmdW5jdGlvbihtZXRob2QsIHVybCwgZGF0YSwgb3B0aW9ucywgYmVmb3JlKSB7XHJcblx0XHQvLyBGb3JtYXRcclxuXHRcdG1ldGhvZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpO1xyXG5cdFx0ZGF0YSA9IGRhdGEgfHwgbnVsbDtcclxuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdFx0Zm9yKHZhciBuYW1lIGluIGRlZmF1bHRPcHRpb25zKSB7XHJcblx0XHRcdGlmKCEobmFtZSBpbiBvcHRpb25zKSkge1xyXG5cdFx0XHRcdGlmKHR5cGVvZiBkZWZhdWx0T3B0aW9uc1tuYW1lXSA9PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb3B0aW9uc1tuYW1lXSA9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdFx0Zm9yKHZhciBuYW1lMiBpbiBkZWZhdWx0T3B0aW9uc1tuYW1lXSkge1xyXG5cdFx0XHRcdFx0XHRvcHRpb25zW25hbWVdW25hbWUyXSA9IGRlZmF1bHRPcHRpb25zW25hbWVdW25hbWUyXTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRvcHRpb25zW25hbWVdID0gZGVmYXVsdE9wdGlvbnNbbmFtZV07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRGVmaW5lIHZhcmlhYmxlc1xyXG5cdFx0dmFyIG5hdGl2ZVJlc3BvbnNlUGFyc2luZyA9IGZhbHNlLFxyXG5cdFx0XHRjcm9zc09yaWdpbixcclxuXHRcdFx0eGhyLFxyXG5cdFx0XHR4ZHIgPSBmYWxzZSxcclxuXHRcdFx0dGltZW91dEludGVydmFsLFxyXG5cdFx0XHRhYm9ydGVkID0gZmFsc2UsXHJcblx0XHRcdGF0dGVtcHRzID0gMCxcclxuXHRcdFx0aGVhZGVycyA9IHt9LFxyXG5cdFx0XHRtaW1lVHlwZXMgPSB7XHJcblx0XHRcdFx0dGV4dDogJyovKicsXHJcblx0XHRcdFx0eG1sOiAndGV4dC94bWwnLFxyXG5cdFx0XHRcdGpzb246ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuXHRcdFx0XHRwb3N0OiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcclxuXHRcdFx0XHRkb2N1bWVudDogJ3RleHQvaHRtbCdcclxuXHRcdFx0fSxcclxuXHRcdFx0YWNjZXB0ID0ge1xyXG5cdFx0XHRcdHRleHQ6ICcqLyonLFxyXG5cdFx0XHRcdHhtbDogJ2FwcGxpY2F0aW9uL3htbDsgcT0xLjAsIHRleHQveG1sOyBxPTAuOCwgKi8qOyBxPTAuMScsXHJcblx0XHRcdFx0anNvbjogJ2FwcGxpY2F0aW9uL2pzb247IHE9MS4wLCB0ZXh0Lyo7IHE9MC44LCAqLyo7IHE9MC4xJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRpLCBqLFxyXG5cdFx0XHRzZXJpYWxpemVkLFxyXG5cdFx0XHRyZXNwb25zZSxcclxuXHRcdFx0c2VuZGluZyA9IGZhbHNlLFxyXG5cdFx0XHRkZWxheWVkID0gZmFsc2UsXHJcblx0XHRcdHRpbWVvdXRfc3RhcnQsXHJcblxyXG5cdFx0Ly8gQ3JlYXRlIHRoZSBwcm9taXNlXHJcblx0XHRwcm9taXNlID0gcGlua3lzd2VhcihmdW5jdGlvbihwaW5reSkge1xyXG5cdFx0XHRwaW5reS5hYm9ydCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdGlmKHhocikge1xyXG5cdFx0XHRcdFx0eGhyLmFib3J0KCk7XHJcblx0XHRcdFx0XHRhYm9ydGVkID0gdHJ1ZTtcclxuXHRcdFx0XHRcdC0tcmVxdWVzdHM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cdFx0XHRwaW5reS5zZW5kID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Ly8gUHJldmVudCBmdXJ0aGVyIHNlbmQoKSBjYWxsc1xyXG5cdFx0XHRcdGlmKHNlbmRpbmcpIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gUmVhY2hlZCByZXF1ZXN0IGxpbWl0LCBnZXQgb3V0IVxyXG5cdFx0XHRcdGlmKHJlcXVlc3RzID09IGxpbWl0KSB7XHJcblx0XHRcdFx0XHRyZXF1ZXN0X3N0YWNrLnB1c2gocGlua3kpO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBWZXJpZnkgaWYgdGhlIHJlcXVlc3QgaGFzIG5vdCBiZWVuIHByZXZpb3VzbHkgYWJvcnRlZFxyXG5cdFx0XHRcdGlmKGFib3J0ZWQpIHtcclxuXHRcdFx0XHRcdGlmKHJlcXVlc3Rfc3RhY2subGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdHJlcXVlc3Rfc3RhY2suc2hpZnQoKS5zZW5kKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIFRoZSBzZW5kaW5nIGlzIHJ1bm5pbmdcclxuXHRcdFx0XHQrK3JlcXVlc3RzO1xyXG5cdFx0XHRcdHNlbmRpbmcgPSB0cnVlO1xyXG5cdFx0XHRcdC8vIFN0YXJ0IHRoZSBjaHJvbm9cclxuXHRcdFx0XHR0aW1lb3V0X3N0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblx0XHRcdFx0Ly8gR2V0IFhIUiBvYmplY3RcclxuXHRcdFx0XHR4aHIgPSBnZXRYSFIoKTtcclxuXHRcdFx0XHRpZihjcm9zc09yaWdpbikge1xyXG5cdFx0XHRcdFx0aWYoISgnd2l0aENyZWRlbnRpYWxzJyBpbiB4aHIpICYmIGdsb2JhbC5YRG9tYWluUmVxdWVzdCkge1xyXG5cdFx0XHRcdFx0XHR4aHIgPSBuZXcgWERvbWFpblJlcXVlc3QoKTsgLy8gQ09SUyB3aXRoIElFOC85XHJcblx0XHRcdFx0XHRcdHhkciA9IHRydWU7XHJcblx0XHRcdFx0XHRcdGlmKG1ldGhvZCE9J0dFVCcgJiYgbWV0aG9kIT0nUE9TVCcpIHtcclxuXHRcdFx0XHRcdFx0XHRtZXRob2QgPSAnUE9TVCc7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gT3BlbiBjb25uZWN0aW9uXHJcblx0XHRcdFx0aWYoeGRyKSB7XHJcblx0XHRcdFx0XHR4aHIub3BlbihtZXRob2QsIHVybCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0eGhyLm9wZW4obWV0aG9kLCB1cmwsIG9wdGlvbnMuYXN5bmMsIG9wdGlvbnMudXNlciwgb3B0aW9ucy5wYXNzd29yZCk7XHJcblx0XHRcdFx0XHRpZih4aHIyICYmIG9wdGlvbnMuYXN5bmMpIHtcclxuXHRcdFx0XHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IG9wdGlvbnMud2l0aENyZWRlbnRpYWxzO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBTZXQgaGVhZGVyc1xyXG5cdFx0XHRcdGlmKCF4ZHIpIHtcclxuXHRcdFx0XHRcdGZvcih2YXIgaSBpbiBoZWFkZXJzKSB7XHJcblx0XHRcdFx0XHRcdGlmKGhlYWRlcnNbaV0pIHtcclxuXHRcdFx0XHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcihpLCBoZWFkZXJzW2ldKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBWZXJpZnkgaWYgdGhlIHJlc3BvbnNlIHR5cGUgaXMgc3VwcG9ydGVkIGJ5IHRoZSBjdXJyZW50IGJyb3dzZXJcclxuXHRcdFx0XHRpZih4aHIyICYmIG9wdGlvbnMucmVzcG9uc2VUeXBlIT0nYXV0bycpIHtcclxuXHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSBvcHRpb25zLnJlc3BvbnNlVHlwZTtcclxuXHRcdFx0XHRcdFx0bmF0aXZlUmVzcG9uc2VQYXJzaW5nID0gKHhoci5yZXNwb25zZVR5cGUgPT0gb3B0aW9ucy5yZXNwb25zZVR5cGUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y2F0Y2goZSl7fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBQbHVnIHJlc3BvbnNlIGhhbmRsZXJcclxuXHRcdFx0XHRpZih4aHIyIHx8IHhkcikge1xyXG5cdFx0XHRcdFx0eGhyLm9ubG9hZCA9IGhhbmRsZVJlc3BvbnNlO1xyXG5cdFx0XHRcdFx0eGhyLm9uZXJyb3IgPSBoYW5kbGVFcnJvcjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdGlmKHhoci5yZWFkeVN0YXRlID09IDQpIHtcclxuXHRcdFx0XHRcdFx0XHRoYW5kbGVSZXNwb25zZSgpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBPdmVycmlkZSBtaW1lIHR5cGUgdG8gZW5zdXJlIHRoZSByZXNwb25zZSBpcyB3ZWxsIHBhcnNlZFxyXG5cdFx0XHRcdGlmKG9wdGlvbnMucmVzcG9uc2VUeXBlICE9ICdhdXRvJyAmJiAnb3ZlcnJpZGVNaW1lVHlwZScgaW4geGhyKSB7XHJcblx0XHRcdFx0XHR4aHIub3ZlcnJpZGVNaW1lVHlwZShtaW1lVHlwZXNbb3B0aW9ucy5yZXNwb25zZVR5cGVdKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gUnVuICdiZWZvcmUnIGNhbGxiYWNrXHJcblx0XHRcdFx0aWYoYmVmb3JlKSB7XHJcblx0XHRcdFx0XHRiZWZvcmUoeGhyKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gU2VuZCByZXF1ZXN0XHJcblx0XHRcdFx0aWYoeGRyKSB7XHJcblx0XHRcdFx0XHQvLyBodHRwOi8vY3lwcmVzc25vcnRoLmNvbS9wcm9ncmFtbWluZy9pbnRlcm5ldC1leHBsb3Jlci1hYm9ydGluZy1hamF4LXJlcXVlc3RzLWZpeGVkL1xyXG5cdFx0XHRcdFx0eGhyLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbigpe307XHJcblx0XHRcdFx0XHR4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKXt9O1xyXG5cdFx0XHRcdFx0eGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpe307XHJcblx0XHRcdFx0XHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvWERvbWFpblJlcXVlc3RcclxuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdHhoci5zZW5kKG1ldGhvZCAhPSAnR0VUJz8gZGF0YSA6IG51bGwpO1xyXG5cdFx0XHRcdFx0fSwgMCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0eGhyLnNlbmQobWV0aG9kICE9ICdHRVQnID8gZGF0YSA6IG51bGwpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHRcdFx0cmV0dXJuIHBpbmt5O1xyXG5cdFx0fSksXHJcblxyXG5cdFx0Ly8gSGFuZGxlIHRoZSByZXNwb25zZVxyXG5cdFx0aGFuZGxlUmVzcG9uc2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0Ly8gUHJlcGFyZVxyXG5cdFx0XHR2YXIgaSwgcmVzcG9uc2VUeXBlO1xyXG5cdFx0XHRzZW5kaW5nID0gZmFsc2U7XHJcblx0XHRcdC8vIExhdW5jaCBuZXh0IHN0YWNrZWQgcmVxdWVzdFxyXG5cdFx0XHRpZihyZXF1ZXN0X3N0YWNrLmxlbmd0aCkge1xyXG5cdFx0XHRcdHJlcXVlc3Rfc3RhY2suc2hpZnQoKS5zZW5kKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gVmVyaWZ5IGlmIHRoZSByZXF1ZXN0IGhhcyBub3QgYmVlbiBwcmV2aW91c2x5IGFib3J0ZWRcclxuXHRcdFx0aWYoYWJvcnRlZCkge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBEZWNyZWFzZSBudW1iZXIgb2YgcmVxdWVzdHNcclxuXHRcdFx0LS1yZXF1ZXN0cztcclxuXHRcdFx0Ly8gVmVyaWZ5IHRpbWVvdXQgc3RhdGVcclxuXHRcdFx0Ly8gLS0tIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzcyODc3MDYvaWUtOS1qYXZhc2NyaXB0LWVycm9yLWMwMGMwMjNmXHJcblx0XHRcdGlmKG5ldyBEYXRlKCkuZ2V0VGltZSgpLXRpbWVvdXRfc3RhcnQgPj0gb3B0aW9ucy50aW1lb3V0KSB7XHJcblx0XHRcdFx0aWYoIW9wdGlvbnMuYXR0ZW1wdHMgfHwgKythdHRlbXB0cyE9b3B0aW9ucy5hdHRlbXB0cykge1xyXG5cdFx0XHRcdFx0cHJvbWlzZS5zZW5kKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0cHJvbWlzZShmYWxzZSwgW25ldyBFcnJvcignVGltZW91dCAoJyt1cmwrJyknKSwgeGhyLCByZXNwb25zZV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gSGFuZGxlIHJlc3BvbnNlXHJcblx0XHRcdHRyeXtcclxuXHRcdFx0XHQvLyBQcm9jZXNzIHJlc3BvbnNlXHJcblx0XHRcdFx0aWYobmF0aXZlUmVzcG9uc2VQYXJzaW5nICYmICdyZXNwb25zZScgaW4geGhyICYmIHhoci5yZXNwb25zZSE9PW51bGwpIHtcclxuXHRcdFx0XHRcdHJlc3BvbnNlID0geGhyLnJlc3BvbnNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNle1xyXG5cdFx0XHRcdFx0Ly8gR3Vlc3MgcmVzcG9uc2UgdHlwZVxyXG5cdFx0XHRcdFx0cmVzcG9uc2VUeXBlID0gb3B0aW9ucy5yZXNwb25zZVR5cGU7XHJcblx0XHRcdFx0XHRpZihyZXNwb25zZVR5cGUgPT0gJ2F1dG8nKSB7XHJcblx0XHRcdFx0XHRcdGlmKHhkcikge1xyXG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlVHlwZSA9IGRlZmF1bHRYZHJSZXNwb25zZVR5cGU7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0dmFyIGN0ID0geGhyLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LVR5cGUnKSB8fCAnJztcclxuXHRcdFx0XHRcdFx0XHRpZihjdC5pbmRleE9mKG1pbWVUeXBlcy5qc29uKT4tMSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2VUeXBlID0gJ2pzb24nO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRlbHNlIGlmKGN0LmluZGV4T2YobWltZVR5cGVzLnhtbCk+LTEpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlVHlwZSA9ICd4bWwnO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlVHlwZSA9ICd0ZXh0JztcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdC8vIEhhbmRsZSByZXNwb25zZSB0eXBlXHJcblx0XHRcdFx0XHRzd2l0Y2gocmVzcG9uc2VUeXBlKSB7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ2pzb24nOlxyXG5cdFx0XHRcdFx0XHRcdGlmKHhoci5yZXNwb25zZVRleHQubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZignSlNPTicgaW4gZ2xvYmFsKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0gZXZhbCgnKCcreGhyLnJlc3BvbnNlVGV4dCsnKScpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRjYXRjaChlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRocm93IFwiRXJyb3Igd2hpbGUgcGFyc2luZyBKU09OIGJvZHkgOiBcIitlO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0Y2FzZSAneG1sJzpcclxuXHRcdFx0XHRcdFx0XHQvLyBCYXNlZCBvbiBqUXVlcnkncyBwYXJzZVhNTCgpIGZ1bmN0aW9uXHJcblx0XHRcdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0XHRcdC8vIFN0YW5kYXJkXHJcblx0XHRcdFx0XHRcdFx0XHRpZihnbG9iYWwuRE9NUGFyc2VyKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0gKG5ldyBET01QYXJzZXIoKSkucGFyc2VGcm9tU3RyaW5nKHhoci5yZXNwb25zZVRleHQsJ3RleHQveG1sJyk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHQvLyBJRTw5XHJcblx0XHRcdFx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBuZXcgQWN0aXZlWE9iamVjdCgnTWljcm9zb2Z0LlhNTERPTScpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZS5hc3luYyA9ICdmYWxzZSc7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlLmxvYWRYTUwoeGhyLnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGNhdGNoKGUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRpZighcmVzcG9uc2UgfHwgIXJlc3BvbnNlLmRvY3VtZW50RWxlbWVudCB8fCByZXNwb25zZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgncGFyc2VyZXJyb3InKS5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHRocm93ICdJbnZhbGlkIFhNTCc7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gTGF0ZSBzdGF0dXMgY29kZSB2ZXJpZmljYXRpb24gdG8gYWxsb3cgcGFzc2luZyBkYXRhIHdoZW4sIHBlciBleGFtcGxlLCBhIDQwOSBpcyByZXR1cm5lZFxyXG5cdFx0XHRcdC8vIC0tLSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDA0Njk3Mi9tc2llLXJldHVybnMtc3RhdHVzLWNvZGUtb2YtMTIyMy1mb3ItYWpheC1yZXF1ZXN0XHJcblx0XHRcdFx0aWYoJ3N0YXR1cycgaW4geGhyICYmICEvXjJ8MTIyMy8udGVzdCh4aHIuc3RhdHVzKSkge1xyXG5cdFx0XHRcdFx0dGhyb3cgeGhyLnN0YXR1cysnICgnK3hoci5zdGF0dXNUZXh0KycpJztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gRnVsZmlsbGVkXHJcblx0XHRcdFx0cHJvbWlzZSh0cnVlLCBbeGhyLCByZXNwb25zZV0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNhdGNoKGUpIHtcclxuXHRcdFx0XHQvLyBSZWplY3RlZFxyXG5cdFx0XHRcdHByb21pc2UoZmFsc2UsIFtlLCB4aHIsIHJlc3BvbnNlXSk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8gSGFuZGxlIGVycm9yc1xyXG5cdFx0aGFuZGxlRXJyb3IgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGlmKCFhYm9ydGVkKSB7XHJcblx0XHRcdFx0LS1yZXF1ZXN0cztcclxuXHRcdFx0XHRwcm9taXNlKGZhbHNlLCBbbmV3IEVycm9yKCdDb25uZWN0aW9uIGFib3J0ZWQnKSwgeGhyLCBudWxsXSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gTm9ybWFsaXplIG9wdGlvbnNcclxuXHRcdG9wdGlvbnMuYXN5bmMgPSAnYXN5bmMnIGluIG9wdGlvbnM/ISFvcHRpb25zLmFzeW5jOnRydWU7XHJcblx0XHRvcHRpb25zLmNhY2hlID0gJ2NhY2hlJyBpbiBvcHRpb25zPyEhb3B0aW9ucy5jYWNoZTpmYWxzZTtcclxuXHRcdG9wdGlvbnMuZGF0YVR5cGUgPSAnZGF0YVR5cGUnIGluIG9wdGlvbnM/b3B0aW9ucy5kYXRhVHlwZS50b0xvd2VyQ2FzZSgpOmRlZmF1bHREYXRhVHlwZTtcclxuXHRcdG9wdGlvbnMucmVzcG9uc2VUeXBlID0gJ3Jlc3BvbnNlVHlwZScgaW4gb3B0aW9ucz9vcHRpb25zLnJlc3BvbnNlVHlwZS50b0xvd2VyQ2FzZSgpOidhdXRvJztcclxuXHRcdG9wdGlvbnMudXNlciA9IG9wdGlvbnMudXNlciB8fCAnJztcclxuXHRcdG9wdGlvbnMucGFzc3dvcmQgPSBvcHRpb25zLnBhc3N3b3JkIHx8ICcnO1xyXG5cdFx0b3B0aW9ucy53aXRoQ3JlZGVudGlhbHMgPSAhIW9wdGlvbnMud2l0aENyZWRlbnRpYWxzO1xyXG5cdFx0b3B0aW9ucy50aW1lb3V0ID0gJ3RpbWVvdXQnIGluIG9wdGlvbnM/cGFyc2VJbnQob3B0aW9ucy50aW1lb3V0LDEwKTozMDAwMDtcclxuXHRcdG9wdGlvbnMuYXR0ZW1wdHMgPSAnYXR0ZW1wdHMnIGluIG9wdGlvbnM/cGFyc2VJbnQob3B0aW9ucy5hdHRlbXB0cywxMCk6MTtcclxuXHJcblx0XHQvLyBHdWVzcyBpZiB3ZSdyZSBkZWFsaW5nIHdpdGggYSBjcm9zcy1vcmlnaW4gcmVxdWVzdFxyXG5cdFx0aSA9IHVybC5tYXRjaCgvXFwvXFwvKC4rPylcXC8vKTtcclxuXHRcdGNyb3NzT3JpZ2luID0gaSAmJiAoaVsxXT9pWzFdIT1sb2NhdGlvbi5ob3N0OmZhbHNlKTtcclxuXHJcblx0XHQvLyBQcmVwYXJlIGRhdGFcclxuXHRcdGlmKCdBcnJheUJ1ZmZlcicgaW4gZ2xvYmFsICYmIGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xyXG5cdFx0XHRvcHRpb25zLmRhdGFUeXBlID0gJ2FycmF5YnVmZmVyJztcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoJ0Jsb2InIGluIGdsb2JhbCAmJiBkYXRhIGluc3RhbmNlb2YgQmxvYikge1xyXG5cdFx0XHRvcHRpb25zLmRhdGFUeXBlID0gJ2Jsb2InO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZignRG9jdW1lbnQnIGluIGdsb2JhbCAmJiBkYXRhIGluc3RhbmNlb2YgRG9jdW1lbnQpIHtcclxuXHRcdFx0b3B0aW9ucy5kYXRhVHlwZSA9ICdkb2N1bWVudCc7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKCdGb3JtRGF0YScgaW4gZ2xvYmFsICYmIGRhdGEgaW5zdGFuY2VvZiBGb3JtRGF0YSkge1xyXG5cdFx0XHRvcHRpb25zLmRhdGFUeXBlID0gJ2Zvcm1kYXRhJztcclxuXHRcdH1cclxuXHRcdGlmKGRhdGEgIT09IG51bGwpIHtcclxuXHRcdFx0c3dpdGNoKG9wdGlvbnMuZGF0YVR5cGUpIHtcclxuXHRcdFx0XHRjYXNlICdqc29uJzpcclxuXHRcdFx0XHRcdGRhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ3Bvc3QnOlxyXG5cdFx0XHRcdFx0ZGF0YSA9IGpwYXJhbShkYXRhKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFByZXBhcmUgaGVhZGVyc1xyXG5cdFx0aWYob3B0aW9ucy5oZWFkZXJzKSB7XHJcblx0XHRcdHZhciBmb3JtYXQgPSBmdW5jdGlvbihtYXRjaCxwMSxwMikge1xyXG5cdFx0XHRcdHJldHVybiBwMSArIHAyLnRvVXBwZXJDYXNlKCk7XHJcblx0XHRcdH07XHJcblx0XHRcdGZvcihpIGluIG9wdGlvbnMuaGVhZGVycykge1xyXG5cdFx0XHRcdGhlYWRlcnNbaS5yZXBsYWNlKC8oXnwtKShbXi1dKS9nLGZvcm1hdCldID0gb3B0aW9ucy5oZWFkZXJzW2ldO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZighKCdDb250ZW50LVR5cGUnIGluIGhlYWRlcnMpICYmIG1ldGhvZCE9J0dFVCcpIHtcclxuXHRcdFx0aWYob3B0aW9ucy5kYXRhVHlwZSBpbiBtaW1lVHlwZXMpIHtcclxuXHRcdFx0XHRpZihtaW1lVHlwZXNbb3B0aW9ucy5kYXRhVHlwZV0pIHtcclxuXHRcdFx0XHRcdGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gbWltZVR5cGVzW29wdGlvbnMuZGF0YVR5cGVdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYoIWhlYWRlcnMuQWNjZXB0KSB7XHJcblx0XHRcdGhlYWRlcnMuQWNjZXB0ID0gKG9wdGlvbnMucmVzcG9uc2VUeXBlIGluIGFjY2VwdCk/YWNjZXB0W29wdGlvbnMucmVzcG9uc2VUeXBlXTonKi8qJztcclxuXHRcdH1cclxuXHRcdGlmKCFjcm9zc09yaWdpbiAmJiAhKCdYLVJlcXVlc3RlZC1XaXRoJyBpbiBoZWFkZXJzKSkgeyAvLyAodGhhdCBoZWFkZXIgYnJlYWtzIGluIGxlZ2FjeSBicm93c2VycyB3aXRoIENPUlMpXHJcblx0XHRcdGhlYWRlcnNbJ1gtUmVxdWVzdGVkLVdpdGgnXSA9ICdYTUxIdHRwUmVxdWVzdCc7XHJcblx0XHR9XHJcblx0XHRpZighb3B0aW9ucy5jYWNoZSAmJiAhKCdDYWNoZS1Db250cm9sJyBpbiBoZWFkZXJzKSkge1xyXG5cdFx0XHRoZWFkZXJzWydDYWNoZS1Db250cm9sJ10gPSAnbm8tY2FjaGUnO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFByZXBhcmUgVVJMXHJcblx0XHRpZihtZXRob2QgPT0gJ0dFVCcgJiYgZGF0YSAmJiB0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJykge1xyXG5cdFx0XHR1cmwgKz0gKC9cXD8vLnRlc3QodXJsKT8nJic6Jz8nKSArIGRhdGE7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gU3RhcnQgdGhlIHJlcXVlc3RcclxuXHRcdGlmKG9wdGlvbnMuYXN5bmMpIHtcclxuXHRcdFx0cHJvbWlzZS5zZW5kKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUmV0dXJuIHByb21pc2VcclxuXHRcdHJldHVybiBwcm9taXNlO1xyXG5cclxuXHR9O1xyXG5cdFxyXG5cdC8vIERlZmluZSBleHRlcm5hbCBxd2VzdCBvYmplY3RcclxuXHR2YXIgZ2V0TmV3UHJvbWlzZSA9IGZ1bmN0aW9uKHEpIHtcclxuXHRcdFx0Ly8gUHJlcGFyZVxyXG5cdFx0XHR2YXIgcHJvbWlzZXMgPSBbXSxcclxuXHRcdFx0XHRsb2FkaW5nID0gMCxcclxuXHRcdFx0XHR2YWx1ZXMgPSBbXTtcclxuXHRcdFx0Ly8gQ3JlYXRlIGEgbmV3IHByb21pc2UgdG8gaGFuZGxlIGFsbCByZXF1ZXN0c1xyXG5cdFx0XHRyZXR1cm4gcGlua3lzd2VhcihmdW5jdGlvbihwaW5reSkge1xyXG5cdFx0XHRcdC8vIEJhc2ljIHJlcXVlc3QgbWV0aG9kXHJcblx0XHRcdFx0dmFyIG1ldGhvZF9pbmRleCA9IC0xLFxyXG5cdFx0XHRcdFx0Y3JlYXRlTWV0aG9kID0gZnVuY3Rpb24obWV0aG9kKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBmdW5jdGlvbih1cmwsIGRhdGEsIG9wdGlvbnMsIGJlZm9yZSkge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBpbmRleCA9ICsrbWV0aG9kX2luZGV4O1xyXG5cdFx0XHRcdFx0XHRcdCsrbG9hZGluZztcclxuXHRcdFx0XHRcdFx0XHRwcm9taXNlcy5wdXNoKHF3ZXN0KG1ldGhvZCwgcGlua3kuYmFzZSArIHVybCwgZGF0YSwgb3B0aW9ucywgYmVmb3JlKS50aGVuKGZ1bmN0aW9uKHhociwgcmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlc1tpbmRleF0gPSBhcmd1bWVudHM7XHJcblx0XHRcdFx0XHRcdFx0XHRpZighLS1sb2FkaW5nKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHBpbmt5KHRydWUsIHZhbHVlcy5sZW5ndGggPT0gMSA/IHZhbHVlc1swXSA6IFt2YWx1ZXNdKTtcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9LCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHBpbmt5KGZhbHNlLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRcdFx0XHRcdH0pKTtcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcGlua3k7XHJcblx0XHRcdFx0XHRcdH07XHJcblx0XHRcdFx0XHR9O1xyXG5cdFx0XHRcdC8vIERlZmluZSBleHRlcm5hbCBBUElcclxuXHRcdFx0XHRwaW5reS5nZXQgPSBjcmVhdGVNZXRob2QoJ0dFVCcpO1xyXG5cdFx0XHRcdHBpbmt5LnBvc3QgPSBjcmVhdGVNZXRob2QoJ1BPU1QnKTtcclxuXHRcdFx0XHRwaW5reS5wdXQgPSBjcmVhdGVNZXRob2QoJ1BVVCcpO1xyXG5cdFx0XHRcdHBpbmt5WydkZWxldGUnXSA9IGNyZWF0ZU1ldGhvZCgnREVMRVRFJyk7XHJcblx0XHRcdFx0cGlua3lbJ2NhdGNoJ10gPSBmdW5jdGlvbihmKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gcGlua3kudGhlbihudWxsLCBmKTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHBpbmt5LmNvbXBsZXRlID0gZnVuY3Rpb24oZikge1xyXG5cdFx0XHRcdFx0dmFyIGZ1bmMgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0ZigpOyAvLyBvdGhlcndpc2UgYXJndW1lbnRzIHdpbGwgYmUgcGFzc2VkIHRvIHRoZSBjYWxsYmFja1xyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHRcdHJldHVybiBwaW5reS50aGVuKGZ1bmMsIGZ1bmMpO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdFx0cGlua3kubWFwID0gZnVuY3Rpb24odHlwZSwgdXJsLCBkYXRhLCBvcHRpb25zLCBiZWZvcmUpIHtcclxuXHRcdFx0XHRcdHJldHVybiBjcmVhdGVNZXRob2QodHlwZS50b1VwcGVyQ2FzZSgpKS5jYWxsKHRoaXMsIHVybCwgZGF0YSwgb3B0aW9ucywgYmVmb3JlKTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdC8vIFBvcHVsYXRlIG1ldGhvZHMgZnJvbSBleHRlcm5hbCBvYmplY3RcclxuXHRcdFx0XHRmb3IodmFyIHByb3AgaW4gcSkge1xyXG5cdFx0XHRcdFx0aWYoIShwcm9wIGluIHBpbmt5KSkge1xyXG5cdFx0XHRcdFx0XHRwaW5reVtwcm9wXSA9IHFbcHJvcF07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIFNldCBsYXN0IG1ldGhvZHNcclxuXHRcdFx0XHRwaW5reS5zZW5kID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRmb3IodmFyIGk9MCwgaj1wcm9taXNlcy5sZW5ndGg7IGk8ajsgKytpKSB7XHJcblx0XHRcdFx0XHRcdHByb21pc2VzW2ldLnNlbmQoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiBwaW5reTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHRcdHBpbmt5LmFib3J0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRmb3IodmFyIGk9MCwgaj1wcm9taXNlcy5sZW5ndGg7IGk8ajsgKytpKSB7XHJcblx0XHRcdFx0XHRcdHByb21pc2VzW2ldLmFib3J0KCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gcGlua3k7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0XHRyZXR1cm4gcGlua3k7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSxcclxuXHRcdHEgPSB7XHJcblx0XHRcdGJhc2U6ICcnLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBnZXROZXdQcm9taXNlKHEpLmdldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRwb3N0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gZ2V0TmV3UHJvbWlzZShxKS5wb3N0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdH0sXHJcblx0XHRcdHB1dDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIGdldE5ld1Byb21pc2UocSkucHV0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdH0sXHJcblx0XHRcdCdkZWxldGUnOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gZ2V0TmV3UHJvbWlzZShxKVsnZGVsZXRlJ10uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0bWFwOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gZ2V0TmV3UHJvbWlzZShxKS5tYXAuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0eGhyMjogeGhyMixcclxuXHRcdFx0bGltaXQ6IGZ1bmN0aW9uKGJ5KSB7XHJcblx0XHRcdFx0bGltaXQgPSBieTtcclxuXHRcdFx0XHRyZXR1cm4gcTtcclxuXHRcdFx0fSxcclxuXHRcdFx0c2V0RGVmYXVsdE9wdGlvbnM6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuXHRcdFx0XHRkZWZhdWx0T3B0aW9ucyA9IG9wdGlvbnM7XHJcblx0XHRcdFx0cmV0dXJuIHE7XHJcblx0XHRcdH0sXHJcblx0XHRcdHNldERlZmF1bHRYZHJSZXNwb25zZVR5cGU6IGZ1bmN0aW9uKHR5cGUpIHtcclxuXHRcdFx0XHRkZWZhdWx0WGRyUmVzcG9uc2VUeXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRcdHJldHVybiBxO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRzZXREZWZhdWx0RGF0YVR5cGU6IGZ1bmN0aW9uKHR5cGUpIHtcclxuXHRcdFx0XHRkZWZhdWx0RGF0YVR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0cmV0dXJuIHE7XHJcblx0XHRcdH0sXHJcblx0XHRcdGdldE9wZW5SZXF1ZXN0czogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIHJlcXVlc3RzO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFxyXG5cdHJldHVybiBxO1xyXG5cclxufSgpO1xyXG4iLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgcXdlc3QgZnJvbSAncXdlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRd2VzdEFqYXhMb2FkZXIge1xuICAgIGdldChwYXRoIDogc3RyaW5nKSA6IFByb21pc2Uge1xuICAgICAgICByZXR1cm4gcXdlc3QuZ2V0KHBhdGgpLnRoZW4oZnVuY3Rpb24oeGhyLCByZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgcmVzID09PSAnc3RyaW5nJyA/IEpTT04ucGFyc2UocmVzKSA6IHJlcztcbiAgICAgICAgfSk7XG4gICAgfVxufSIsIi8qIEBmbG93ICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExldmVsTG9hZGVyIHtcbiAgICBhamF4TG9hZGVyICAgOiBJQWpheExvYWRlcjtcblxuICAgIGNvbnN0cnVjdG9yKGFqYXhMb2FkZXIgOiBJQWpheExvYWRlcikge1xuICAgICAgICB0aGlzLmFqYXhMb2FkZXIgICA9IGFqYXhMb2FkZXI7XG4gICAgfVxuICAgIFxuICAgIGFzeW5jIGxvYWRMZXZlbChwYXRoIDogc3RyaW5nKSA6IFByb21pc2Uge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5hamF4TG9hZGVyLmdldChwYXRoKTtcbiAgICB9XG59IiwiLyoqXG4gKiBtYWlubG9vcC5qcyAxLjAuMy0yMDE2MDMyMFxuICpcbiAqIEBhdXRob3IgSXNhYWMgU3VraW4gKGh0dHA6Ly93d3cuaXNhYWNzdWtpbi5jb20vKVxuICogQGxpY2Vuc2UgTUlUXG4gKi9cblxuIWZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGIoYSl7aWYodj1vKGIpLCEoZStqPmEpKXtmb3IoZCs9YS1lLGU9YSxyKGEsZCksYT5nKzFlMyYmKGY9LjI1KmgrLjc1KmYsZz1hLGg9MCksaCsrLGk9MDtkPj1jOylpZihzKGMpLGQtPWMsKytpPj0yNDApe209ITA7YnJlYWt9dChkL2MpLHUoZixtKSxtPSExfX12YXIgYz0xZTMvNjAsZD0wLGU9MCxmPTYwLGc9MCxoPTAsaT0wLGo9MCxrPSExLGw9ITEsbT0hMSxuPVwib2JqZWN0XCI9PXR5cGVvZiB3aW5kb3c/d2luZG93OmEsbz1uLnJlcXVlc3RBbmltYXRpb25GcmFtZXx8ZnVuY3Rpb24oKXt2YXIgYT1EYXRlLm5vdygpLGIsZDtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIGI9RGF0ZS5ub3coKSxkPU1hdGgubWF4KDAsYy0oYi1hKSksYT1iK2Qsc2V0VGltZW91dChmdW5jdGlvbigpe2UoYitkKX0sZCl9fSgpLHA9bi5jYW5jZWxBbmltYXRpb25GcmFtZXx8Y2xlYXJUaW1lb3V0LHE9ZnVuY3Rpb24oKXt9LHI9cSxzPXEsdD1xLHU9cSx2O2EuTWFpbkxvb3A9e2dldFNpbXVsYXRpb25UaW1lc3RlcDpmdW5jdGlvbigpe3JldHVybiBjfSxzZXRTaW11bGF0aW9uVGltZXN0ZXA6ZnVuY3Rpb24oYSl7cmV0dXJuIGM9YSx0aGlzfSxnZXRGUFM6ZnVuY3Rpb24oKXtyZXR1cm4gZn0sZ2V0TWF4QWxsb3dlZEZQUzpmdW5jdGlvbigpe3JldHVybiAxZTMvan0sc2V0TWF4QWxsb3dlZEZQUzpmdW5jdGlvbihhKXtyZXR1cm5cInVuZGVmaW5lZFwiPT10eXBlb2YgYSYmKGE9MS8wKSwwPT09YT90aGlzLnN0b3AoKTpqPTFlMy9hLHRoaXN9LHJlc2V0RnJhbWVEZWx0YTpmdW5jdGlvbigpe3ZhciBhPWQ7cmV0dXJuIGQ9MCxhfSxzZXRCZWdpbjpmdW5jdGlvbihhKXtyZXR1cm4gcj1hfHxyLHRoaXN9LHNldFVwZGF0ZTpmdW5jdGlvbihhKXtyZXR1cm4gcz1hfHxzLHRoaXN9LHNldERyYXc6ZnVuY3Rpb24oYSl7cmV0dXJuIHQ9YXx8dCx0aGlzfSxzZXRFbmQ6ZnVuY3Rpb24oYSl7cmV0dXJuIHU9YXx8dSx0aGlzfSxzdGFydDpmdW5jdGlvbigpe3JldHVybiBsfHwobD0hMCx2PW8oZnVuY3Rpb24oYSl7dCgxKSxrPSEwLGU9YSxnPWEsaD0wLHY9byhiKX0pKSx0aGlzfSxzdG9wOmZ1bmN0aW9uKCl7cmV0dXJuIGs9ITEsbD0hMSxwKHYpLHRoaXN9LGlzUnVubmluZzpmdW5jdGlvbigpe3JldHVybiBrfX0sXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShhLk1haW5Mb29wKTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZudWxsIT09bW9kdWxlJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlLmV4cG9ydHMmJihtb2R1bGUuZXhwb3J0cz1hLk1haW5Mb29wKX0odGhpcyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWlubG9vcC5taW4uanMubWFwIiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IE1haW5Mb29wIGZyb20gJ21haW5sb29wLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbkxvb3BMb29wTWFuYWdlciB7XG4gICAgc2V0VXBkYXRlKHVwZGF0ZU1ldGhvZCA6IChkZWx0YSA6IG51bWJlcikgPT4gdm9pZCkgOiBNYWluTG9vcExvb3BNYW5hZ2VyIHtcbiAgICAgICAgTWFpbkxvb3Auc2V0VXBkYXRlKHVwZGF0ZU1ldGhvZCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgc2V0UmVuZGVyKHJlbmRlck1ldGhvZCA6IChpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSA6IG51bWJlcikgPT4gdm9pZCkgOiBNYWluTG9vcExvb3BNYW5hZ2VyIHtcbiAgICAgICAgTWFpbkxvb3Auc2V0RHJhdyhyZW5kZXJNZXRob2QpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIHN0YXJ0KCkgOiB2b2lkIHtcbiAgICAgICAgTWFpbkxvb3Auc3RhcnQoKTtcbiAgICB9XG59IiwiLyogQGZsb3cqL1xuXG5pbXBvcnQgeyBFbnRpdHlNYW5hZ2VyIH0gZnJvbSAnZ2ctZW50aXRpZXMnO1xuXG5pbXBvcnQgVGhyZWVSZW5kZXJlck1hbmFnZXIgICBmcm9tICcuLi92aWV3L3RocmVlLXJlbmRlcmVyLW1hbmFnZXInO1xuaW1wb3J0IFN0YXRzUGVyZm9ybWFuY2VWaWV3ZXIgZnJvbSAnLi4vdmlldy9zdGF0cy1wZXJmb3JtYW5jZS12aWV3ZXInO1xuXG5pbXBvcnQgVGhyZWVTY2VuZU1hbmFnZXIgICAgIGZyb20gJy4uL2xvZ2ljL3RocmVlLXNjZW5lLW1hbmFnZXInO1xuaW1wb3J0IFRocmVlTWVzaE1hbmFnZXIgICAgICBmcm9tICcuLi9sb2dpYy90aHJlZS1tZXNoLW1hbmFnZXInO1xuaW1wb3J0IFRocmVlT2JqZWN0TWVzaExvYWRlciBmcm9tICcuLi9sb2dpYy90aHJlZS1vYmplY3QtbWVzaC1sb2FkZXInO1xuaW1wb3J0IFFXZXN0QWpheExvYWRlciAgICAgICBmcm9tICcuLi9sb2dpYy9xd2VzdC1hamF4LWxvYWRlcic7XG5pbXBvcnQgTGV2ZWxMb2FkZXIgICAgICAgICAgIGZyb20gJy4uL2xvZ2ljL2xldmVsLWxvYWRlcic7XG5pbXBvcnQgTWFpbkxvb3BMb29wTWFuYWdlciAgIGZyb20gJy4uL2xvZ2ljL21haW5sb29wLWxvb3AtbWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICByZW5kZXJlck1hbmFnZXIoKSA6IElSZW5kZXJlck1hbmFnZXIgeyByZXR1cm4gbmV3IFRocmVlUmVuZGVyZXJNYW5hZ2VyKCk7IH0sXG5cbiAgICBzY2VuZU1hbmFnZXIoKSA6IElTY2VuZU1hbmFnZXIgeyByZXR1cm4gbmV3IFRocmVlU2NlbmVNYW5hZ2VyKCk7IH0sXG4gICAgXG4gICAgbWVzaE1hbmFnZXIoKSA6IElNZXNoTWFuYWdlciB7IHJldHVybiBuZXcgVGhyZWVNZXNoTWFuYWdlcigpOyB9LFxuXG4gICAgbGV2ZWxMb2FkZXIoKSA6IElMZXZlbExvYWRlciB7IHJldHVybiBuZXcgTGV2ZWxMb2FkZXIobmV3IFFXZXN0QWpheExvYWRlcigpKTsgfSxcbiAgICBcbiAgICBlbnRpdHlNYW5hZ2VyKCkgOiBJRW50aXR5TWFuYWdlciB7IHJldHVybiBuZXcgRW50aXR5TWFuYWdlcigpOyB9LFxuICAgIFxuICAgIGxvb3BNYW5hZ2VyKCkgOiBJTG9vcE1hbmFnZXIgeyByZXR1cm4gbmV3IE1haW5Mb29wTG9vcE1hbmFnZXIoKTsgfSxcbiAgICBcbiAgICBtZXNoTG9hZGVyKCkgOiBJTWVzaExvYWRlciB7IHJldHVybiBuZXcgVGhyZWVPYmplY3RNZXNoTG9hZGVyKCk7IH0sXG4gICAgXG4gICAgcGVyZm9ybWFuY2VWaWV3ZXIoKSA6IElQZXJmb3JtYW5jZVZpZXdlciB7IHJldHVybiBuZXcgU3RhdHNQZXJmb3JtYW5jZVZpZXdlcigpOyB9XG59OyIsIi8qIEBmbG93ICovXG5cbmV4cG9ydCBjb25zdCBGbGF0U2hhZGluZyA9IDE7XG5leHBvcnQgY29uc3QgU21vb3RoU2hhZGluZyA9IDI7IiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IERJIGZyb20gJy4vdXRpbGl0eS9kZXBlbmRlbmN5LWluamVjdG9yJztcblxuaW1wb3J0IHsgRmxhdFNoYWRpbmcgfSBmcm9tICcuL2NvbnN0YW50cy9zaGFkaW5nJztcblxud2luZG93Lm9ubG9hZCA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGxldmVsTG9hZGVyID0gREkubGV2ZWxMb2FkZXIoKTtcbiAgICBjb25zdCBsZXZlbCAgICAgICA9IGF3YWl0IGxldmVsTG9hZGVyLmxvYWRMZXZlbCgnbGV2ZWxzL2xldmVsLW9uZS5qc29uJyk7XG4gICAgXG4gICAgY29uc3QgbWVzaExvYWRlciAgPSBESS5tZXNoTG9hZGVyKCk7XG4gICAgY29uc3QgbWVzaE1hbmFnZXIgPSBESS5tZXNoTWFuYWdlcigpO1xuICAgIGNvbnN0IG1lc2hJZCAgICAgID0gbWVzaE1hbmFnZXIuYWRkTWVzaChhd2FpdCBtZXNoTG9hZGVyLmxvYWQoJ21lc2hlcy8nICsgbGV2ZWwubWVzaCwgeyBzaGFkaW5nIDogRmxhdFNoYWRpbmcgfSkpO1xuICAgIFxuICAgIGNvbnN0IHNjZW5lTWFuYWdlciA9IERJLnNjZW5lTWFuYWdlcigpO1xuICAgIGNvbnN0IHNjZW5lSWQgICAgICA9IHNjZW5lTWFuYWdlci5jcmVhdGVTY2VuZSgpO1xuICAgIFxuICAgIHNjZW5lTWFuYWdlci5hZGRUb1NjZW5lKHNjZW5lSWQsIG1lc2hNYW5hZ2VyLmdldE1lc2gobWVzaElkKSk7XG4gICAgc2NlbmVNYW5hZ2VyLmFkZEFtYmllbnRMaWdodFRvU2NlbmUoc2NlbmVJZCwgMHgxMDEwMzApO1xuIFx0c2NlbmVNYW5hZ2VyLmFkZERpcmVjdGlvbmFsTGlnaHRUb1NjZW5lKHNjZW5lSWQsIDB4ZmZlZWRkLCAwLCAwLCAxKTtcblxuICAgIGNvbnN0IGVudGl0eU1hbmFnZXIgICA9IERJLmVudGl0eU1hbmFnZXIoKTtcbiAgICBjb25zdCByZW5kZXJlck1hbmFnZXIgPSBESS5yZW5kZXJlck1hbmFnZXIoKTtcbiAgICBjb25zdCBsb29wTWFuYWdlciAgICAgPSBESS5sb29wTWFuYWdlcigpO1xuICAgIFxuICAgIHZhciBtZXNoSXNBZGRlZCA9IHRydWU7XG4gICAgXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgaWYgKG1lc2hJc0FkZGVkKSB7XG4gICAgICAgICAgICBzY2VuZU1hbmFnZXIucmVtb3ZlRnJvbVNjZW5lKHNjZW5lSWQsIG1lc2hNYW5hZ2VyLmdldE1lc2gobWVzaElkKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzY2VuZU1hbmFnZXIuYWRkVG9TY2VuZShzY2VuZUlkLCBtZXNoTWFuYWdlci5nZXRNZXNoKG1lc2hJZCkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBtZXNoSXNBZGRlZCA9ICFtZXNoSXNBZGRlZDtcbiAgICB9KTtcbiAgICBcbiAgICBjb25zdCBwZXJmb3JtYW5jZVZpZXdlciA9IERJLnBlcmZvcm1hbmNlVmlld2VyKCk7XG4gICAgXG4gICAgcGVyZm9ybWFuY2VWaWV3ZXIuc2V0TW9kZSgwKTtcbiAgICBcbiAgICBsb29wTWFuYWdlci5zZXRVcGRhdGUoZGVsdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBtZXNoTWFuYWdlci5nZXRNZXNoKG1lc2hJZCkucm90YXRpb24ueSArPSAwLjAwMSAqIGRlbHRhO1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHlNYW5hZ2VyLm9uTG9naWMoZGVsdGEpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAuc2V0UmVuZGVyKGludGVycG9sYXRpb25QZXJjZW50YWdlID0+IHtcbiAgICAgICAgICAgICAgICAgICBwZXJmb3JtYW5jZVZpZXdlci5iZWdpbigpO1xuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyTWFuYWdlci5yZW5kZXIoc2NlbmVNYW5hZ2VyLmdldFNjZW5lKHNjZW5lSWQpLCBpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSk7XG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgcGVyZm9ybWFuY2VWaWV3ZXIuZW5kKCk7XG4gICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgLnN0YXJ0KCk7XG59OyJdLCJuYW1lcyI6WyJTdGF0cyIsInRoaXMiLCJxd2VzdCIsIlFXZXN0QWpheExvYWRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFBcUI7QUFDakIsRUFBQSxhQURpQixnQkFDakIsR0FBYzs0Q0FERyxrQkFDSDs7QUFDVixFQUFBLGFBQUssVUFBTCxHQUFrQixJQUFJLEdBQUosRUFBbEIsQ0FEVTtPQUFkOzsrQkFEaUI7O3VDQUtKLGFBQWE7QUFDdEIsRUFBQSxnQkFBSSxZQUFZLEtBQUssVUFBTCxDQUFnQixHQUFoQixDQUFvQixXQUFwQixDQUFaLENBRGtCOztBQUd0QixFQUFBLGdCQUFJLGNBQWMsSUFBZCxJQUFzQixjQUFjLFNBQWQsRUFBeUI7QUFDL0MsRUFBQSx1QkFBTyxJQUFQLENBRCtDO2VBQW5EOztBQUlBLEVBQUEsMkJBQWUsd0VBQWY7QUFDSSxFQUFBLHFCQUFLLFVBQUw7QUFBaUIsRUFBQSwyQkFBTyxJQUFJLFNBQUosRUFBUCxDQUFqQjtBQURKLEVBQUEscUJBRVMsUUFBTDtBQUFpQixFQUFBO0FBQ2IsRUFBQSwrQkFBTyxVQUFFLFNBQUQsRUFBZTtBQUNuQixFQUFBLGdDQUFJLE1BQU0sRUFBTixDQURlOztBQUduQixFQUFBLG1DQUFPLElBQVAsQ0FBWSxTQUFaLEVBQXVCLE9BQXZCLENBQStCO3lDQUFPLElBQUksR0FBSixJQUFXLFVB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