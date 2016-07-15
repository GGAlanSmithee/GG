(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('three')) :
  typeof define === 'function' && define.amd ? define('GG', ['three'], factory) :
  (global.GG = factory(global.THREE));
}(this, function (three) { 'use strict';

  three = 'default' in three ? three['default'] : three;

  var __commonjs_global = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this;
  function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports, __commonjs_global), module.exports; }

  var ggEntities = __commonjs(function (module, exports, global) {
  (function (global, factory) {
      typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
      typeof define === 'function' && define.amd ? define('GGEntities', ['exports'], factory) :
      (factory((global.GGEntities = global.GGEntities || {})));
  }(__commonjs_global, function (exports) { 'use strict';

      var babelHelpers = {};
      babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
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

      var EntityFactory = function () {
          function EntityFactory() {
              babelHelpers.classCallCheck(this, EntityFactory);

              this.initializers = new Map();
              this.configuration = new Map();
          }

          babelHelpers.createClass(EntityFactory, [{
              key: 'registerInitializer',
              value: function registerInitializer(key, initializer) {
                  if (typeof key !== 'string' || key === '') {
                      throw TypeError('key must be a non-empty string.');
                  }

                  if (typeof initializer !== 'function') {
                      throw TypeError('initializer must be a function.');
                  }

                  this.initializers.set(key, initializer);
              }
          }, {
              key: 'build',
              value: function build() {
                  this.configuration = new Map();

                  return this;
              }
          }, {
              key: 'withComponent',
              value: function withComponent(key, initializer) {
                  if (typeof key !== 'string' || key === '') {
                      return this;
                  }

                  if (typeof initializer !== 'function') {
                      initializer = this.initializers.get(key);
                  }

                  this.configuration.set(key, initializer);

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

                  var components = [];

                  var _iteratorNormalCompletion = true;
                  var _didIteratorError = false;
                  var _iteratorError = undefined;

                  try {
                      for (var _iterator = configuration.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                          var component = _step.value;

                          components.push(component);
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

                  var entities = [];

                  for (var i = 0; i < count; ++i) {
                      var _entityManager$newEnt = entityManager.newEntity(components);

                      var id = _entityManager$newEnt.id;
                      var entity = _entityManager$newEnt.entity;


                      if (id >= entityManager.capacity) {
                          break;
                      }

                      var _iteratorNormalCompletion2 = true;
                      var _didIteratorError2 = false;
                      var _iteratorError2 = undefined;

                      try {
                          for (var _iterator2 = configuration[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                              var _step2$value = babelHelpers.slicedToArray(_step2.value, 2);

                              var component = _step2$value[0];
                              var initializer = _step2$value[1];

                              if (typeof initializer !== 'function') {
                                  continue;
                              }

                              var result = initializer.call(entity[component]);

                              if (babelHelpers.typeof(entity[component]) !== 'object' && result !== undefined) {
                                  entity[component] = result;
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

                      entities.push({ id: id, entity: entity });
                  }

                  return entities.length === 1 ? entities[0] : entities;
              }
          }]);
          return EntityFactory;
      }();

      var ComponentManager = function () {
          function ComponentManager() {
              babelHelpers.classCallCheck(this, ComponentManager);

              this.components = new Map();
          }

          babelHelpers.createClass(ComponentManager, [{
              key: 'newComponent',
              value: function newComponent(key) {
                  var component = this.components.get(key);

                  if (component == null) {
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
                      default:
                          return component;
                  }
              }
          }, {
              key: 'registerComponent',
              value: function registerComponent(key, component) {
                  if (typeof key !== 'string' || key === '') {
                      throw TypeError('key must be a non-empty string.');
                  }

                  if (component === null || component === undefined) {
                      throw TypeError('component cannot be null or undefined.');
                  }

                  this.components.set(key, component);

                  return key;
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
          Render: 1,
          Init: 2
      };

      var SystemManager = function () {
          function SystemManager() {
              babelHelpers.classCallCheck(this, SystemManager);

              this.logicSystems = new Map();
              this.renderSystems = new Map();
              this.initSystems = new Map();
          }

          babelHelpers.createClass(SystemManager, [{
              key: 'registerSystem',
              value: function registerSystem(key, type, components, callback) {
                  if (typeof key !== 'string' || key === '') {
                      throw TypeError('key must be a non-empty string.');
                  }

                  if (type !== SystemType.Logic && type !== SystemType.Render && type !== SystemType.Init) {
                      throw TypeError('type must be a valid SystemType.');
                  }

                  if (!Array.isArray(components)) {
                      throw TypeError('components argument must be an array of components.');
                  }

                  if (typeof callback !== 'function') {
                      throw TypeError('callback must be a function.');
                  }

                  var system = {
                      components: components,
                      callback: callback
                  };

                  switch (type) {
                      case SystemType.Logic:
                          this.logicSystems.set(key, system);break;
                      case SystemType.Render:
                          this.renderSystems.set(key, system);break;
                      case SystemType.Init:
                          this.initSystems.set(key, system);break;
                  }

                  return key;
              }
          }, {
              key: 'removeSystem',
              value: function removeSystem(key) {
                  return this.logicSystems.delete(key) || this.renderSystems.delete(key) || this.initSystems.delete(key);
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
                  return { components: [] };
              });

              this.entityConfigurations = new Map();
          }

          babelHelpers.createClass(EntityManager, [{
              key: 'increaseCapacity',
              value: function increaseCapacity() {
                  var oldCapacity = this.capacity;

                  this.capacity *= 2;

                  this.entities = [].concat(babelHelpers.toConsumableArray(this.entities), babelHelpers.toConsumableArray(Array.from({ length: oldCapacity }, function () {
                      return { components: [] };
                  })));

                  for (var i = oldCapacity; i < this.capacity; ++i) {
                      var _iteratorNormalCompletion = true;
                      var _didIteratorError = false;
                      var _iteratorError = undefined;

                      try {
                          for (var _iterator = this.componentManager.getComponents().keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                              var component = _step.value;

                              this.entities[i][component] = this.componentManager.newComponent(component);
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
              }
          }, {
              key: 'newEntity',
              value: function newEntity(components) {
                  if (!Array.isArray(components)) {
                      throw TypeError('components argument must be an array of components.');
                  }

                  var id = 0;

                  for (; id < this.capacity; ++id) {
                      if (this.entities[id].components.length === 0) {
                          break;
                      }
                  }

                  if (id >= this.capacity) {
                      // todo: auto increase capacity?
                      return { id: this.capacity, entity: null };
                  }

                  if (id > this.currentMaxEntity) {
                      this.currentMaxEntity = id;
                  }

                  this.entities[id].components = components;

                  return { id: id, entity: this.entities[id] };
              }
          }, {
              key: 'deleteEntity',
              value: function deleteEntity(id) {
                  this.entities[id].components = [];

                  if (id < this.currentMaxEntity) {
                      return;
                  }

                  for (var i = id; i >= 0; --i) {
                      if (this.entities[i].components.length !== 0) {
                          this.currentMaxEntity = i;

                          return;
                      }
                  }

                  this.currentMaxEntity = 0;
              }
          }, {
              key: 'getEntities',
              value: regeneratorRuntime.mark(function getEntities() {
                  var _this = this;

                  var components = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                  var _loop, id;

                  return regeneratorRuntime.wrap(function getEntities$(_context2) {
                      while (1) {
                          switch (_context2.prev = _context2.next) {
                              case 0:
                                  _loop = regeneratorRuntime.mark(function _loop(id) {
                                      return regeneratorRuntime.wrap(function _loop$(_context) {
                                          while (1) {
                                              switch (_context.prev = _context.next) {
                                                  case 0:
                                                      if (!(components === null || components.every(function (component) {
                                                          return _this.entities[id].components.indexOf(component) !== -1;
                                                      }))) {
                                                          _context.next = 3;
                                                          break;
                                                      }

                                                      _context.next = 3;
                                                      return { id: id, entity: _this.entities[id] };

                                                  case 3:
                                                  case 'end':
                                                      return _context.stop();
                                              }
                                          }
                                      }, _loop, _this);
                                  });
                                  id = 0;

                              case 2:
                                  if (!(id <= this.currentMaxEntity)) {
                                      _context2.next = 7;
                                      break;
                                  }

                                  return _context2.delegateYield(_loop(id), 't0', 4);

                              case 4:
                                  ++id;
                                  _context2.next = 2;
                                  break;

                              case 7:
                              case 'end':
                                  return _context2.stop();
                          }
                      }
                  }, getEntities, this);
              })
          }, {
              key: 'registerConfiguration',
              value: function registerConfiguration(key) {
                  if (typeof key !== 'string' || key === '') {
                      throw TypeError('key must be a non empty string.');
                  }

                  this.entityConfigurations.set(key, this.entityFactory.createConfiguration());

                  return key;
              }

              // Component Manager

          }, {
              key: 'registerComponent',
              value: function registerComponent(key, component) {
                  this.componentManager.registerComponent(key, component);

                  var _iteratorNormalCompletion2 = true;
                  var _didIteratorError2 = false;
                  var _iteratorError2 = undefined;

                  try {
                      for (var _iterator2 = this.entities[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                          var entity = _step2.value;

                          entity[key] = this.componentManager.newComponent(key);
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

                  var initializer = void 0;

                  switch (typeof component === 'undefined' ? 'undefined' : babelHelpers.typeof(component)) {
                      case 'function':
                          initializer = component;break;
                      case 'object':
                          {
                              initializer = function initializer() {
                                  var _iteratorNormalCompletion3 = true;
                                  var _didIteratorError3 = false;
                                  var _iteratorError3 = undefined;

                                  try {
                                      for (var _iterator3 = Object.keys(component)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                          var _key = _step3.value;

                                          this[_key] = component[_key];
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
                              };

                              break;
                          }
                      default:
                          initializer = function initializer() {
                              return component;
                          };break;
                  }

                  this.entityFactory.registerInitializer(key, initializer);

                  return key;
              }
          }, {
              key: 'addComponent',
              value: function addComponent(id, componentKey) {
                  if (this.entities[id].components.indexOf(componentKey) !== -1) {
                      return;
                  }

                  this.entities[id].components.push(componentKey);
              }
          }, {
              key: 'removeComponent',
              value: function removeComponent(id, component) {
                  var index = this.entities[id].components.indexOf(component);

                  if (index === -1) {
                      return;
                  }

                  this.entities[id].components.splice(index, 1);
              }

              // System Manager

          }, {
              key: 'registerSystem',
              value: function registerSystem(key, type, components, callback) {
                  return this.systemManager.registerSystem(key, type, components, callback);
              }
          }, {
              key: 'registerLogicSystem',
              value: function registerLogicSystem(key, components, callback) {
                  return this.systemManager.registerSystem(key, SystemType.Logic, components, callback);
              }
          }, {
              key: 'registerRenderSystem',
              value: function registerRenderSystem(key, components, callback) {
                  return this.systemManager.registerSystem(key, SystemType.Render, components, callback);
              }
          }, {
              key: 'registerInitSystem',
              value: function registerInitSystem(key, components, callback) {
                  return this.systemManager.registerSystem(key, SystemType.Init, components, callback);
              }
          }, {
              key: 'removeSystem',
              value: function removeSystem(key) {
                  return this.systemManager.removeSystem(key);
              }
          }, {
              key: 'onLogic',
              value: function onLogic(opts) {
                  var _iteratorNormalCompletion4 = true;
                  var _didIteratorError4 = false;
                  var _iteratorError4 = undefined;

                  try {
                      for (var _iterator4 = this.systemManager.logicSystems.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                          var system = _step4.value;

                          system.callback.call(this, this.getEntities(system.components), opts);
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
          }, {
              key: 'onRender',
              value: function onRender(opts) {
                  var _iteratorNormalCompletion5 = true;
                  var _didIteratorError5 = false;
                  var _iteratorError5 = undefined;

                  try {
                      for (var _iterator5 = this.systemManager.renderSystems.values()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                          var system = _step5.value;

                          system.callback.call(this, this.getEntities(system.components), opts);
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
              }
          }, {
              key: 'onInit',
              value: function onInit(opts) {
                  var _iteratorNormalCompletion6 = true;
                  var _didIteratorError6 = false;
                  var _iteratorError6 = undefined;

                  try {
                      for (var _iterator6 = this.systemManager.initSystems.values()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                          var system = _step6.value;

                          system.callback.call(this, this.getEntities(system.components), opts);
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
              key: 'create',
              value: function create(count, key) {
                  var configuration = undefined;

                  if (typeof key === 'string') {
                      configuration = this.entityConfigurations.get(key);

                      if (configuration === undefined) {
                          throw TypeError('could not find entity configuration for the supplied key. if you wish to create an entity without a configuration, do not pass a key.');
                      }
                  }

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

      exports['default'] = EntityManager;
      exports.EntityManager = EntityManager;
      exports.EntityFactory = EntityFactory;
      exports.SystemManager = SystemManager;
      exports.SystemType = SystemType;
      exports.ComponentManager = ComponentManager;
      exports.EventHandler = EventHandler;

  }));
  });

  var EntityManager = (ggEntities && typeof ggEntities === 'object' && 'default' in ggEntities ? ggEntities['default'] : ggEntities);

  var mainloop_min = __commonjs(function (module, exports, global) {
  /**
   * mainloop.js 1.0.3-20160320
   *
   * @author Isaac Sukin (http://www.isaacsukin.com/)
   * @license MIT
   */

  !function(a){function b(a){if(v=o(b),!(e+j>a)){for(d+=a-e,e=a,r(a,d),a>g+1e3&&(f=.25*h+.75*f,g=a,h=0),h++,i=0;d>=c;)if(s(c),d-=c,++i>=240){m=!0;break}t(d/c),u(f,m),m=!1}}var c=1e3/60,d=0,e=0,f=60,g=0,h=0,i=0,j=0,k=!1,l=!1,m=!1,n="object"==typeof window?window:a,o=n.requestAnimationFrame||function(){var a=Date.now(),b,d;return function(e){return b=Date.now(),d=Math.max(0,c-(b-a)),a=b+d,setTimeout(function(){e(b+d)},d)}}(),p=n.cancelAnimationFrame||clearTimeout,q=function(){},r=q,s=q,t=q,u=q,v;a.MainLoop={getSimulationTimestep:function(){return c},setSimulationTimestep:function(a){return c=a,this},getFPS:function(){return f},getMaxAllowedFPS:function(){return 1e3/j},setMaxAllowedFPS:function(a){return"undefined"==typeof a&&(a=1/0),0===a?this.stop():j=1e3/a,this},resetFrameDelta:function(){var a=d;return d=0,a},setBegin:function(a){return r=a||r,this},setUpdate:function(a){return s=a||s,this},setDraw:function(a){return t=a||t,this},setEnd:function(a){return u=a||u,this},start:function(){return l||(l=!0,v=o(function(a){t(1),k=!0,e=a,g=a,h=0,v=o(b)})),this},stop:function(){return k=!1,l=!1,p(v),this},isRunning:function(){return k}},"function"==typeof define&&define.amd?define(a.MainLoop):"object"==typeof module&&null!==module&&"object"==typeof module.exports&&(module.exports=a.MainLoop)}(__commonjs_global);
  });

  var MainLoop = (mainloop_min && typeof mainloop_min === 'object' && 'default' in mainloop_min ? mainloop_min['default'] : mainloop_min);

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

  var SYSTEM = {
      RENDER: 'render'
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

              this.entityManager.registerRenderSystem(SYSTEM.RENDER, renderComponents, render);
          }
      }, {
          key: 'initEntities',
          value: function initEntities(parsedScene) {
              var _this2 = this;

              parsedScene.traverse(function (obj) {
                  var components = obj.userData.components;


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

                  if (components) {
                      var _iteratorNormalCompletion2 = true;
                      var _didIteratorError2 = false;
                      var _iteratorError2 = undefined;

                      try {
                          var _loop = function _loop() {
                              var _step2$value = _step2.value;
                              var key = _step2$value.key;
                              var data = _step2$value.data;

                              if (data == null) {
                                  config.withComponent(key);
                              } else {
                                  config.withComponent(key, function () {
                                      var _this3 = this;

                                      // todo handle non-objects
                                      Object.keys(data).forEach(function (key) {
                                          if (_this3[key] == null || data[key] == null) {
                                              return;
                                          }

                                          _this3[key] = data[key];
                                      }, this);
                                  });
                              }
                          };

                          for (var _iterator2 = components[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                              _loop();
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

                      obj.userData.entityId = config.create(1);
                  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2cuanMiLCJzb3VyY2VzIjpbIi4uLy4uL2VuZ2luZS9ub2RlX21vZHVsZXMvZ2ctZW50aXRpZXMvZGlzdC9nZy1lbnRpdGllcy5qcyIsIi4uLy4uL2VuZ2luZS9ub2RlX21vZHVsZXMvbWFpbmxvb3AuanMvYnVpbGQvbWFpbmxvb3AubWluLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vX19iYWJlbEhlbHBlcnNfXyIsIi4uLy4uL2VuZ2luZS9zcmMvbG9naWMvbWFpbmxvb3AtbG9vcC1tYW5hZ2VyLmpzIiwiLi4vLi4vZW5naW5lL3NyYy9sb2dpYy90aHJlZS1vYmplY3QtbWVzaC1sb2FkZXIuanMiLCIuLi8uLi9lbmdpbmUvc3JjL3ZpZXcvdGhyZWUtcmVuZGVyZXItbWFuYWdlci5qcyIsIi4uLy4uL2VuZ2luZS9zcmMvREkvYnJvd3Nlci5qcyIsIi4uLy4uL2VuZ2luZS9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcbiAgICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoJ0dHRW50aXRpZXMnLCBbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuICAgIChmYWN0b3J5KChnbG9iYWwuR0dFbnRpdGllcyA9IGdsb2JhbC5HR0VudGl0aWVzIHx8IHt9KSkpO1xufSh0aGlzLCBmdW5jdGlvbiAoZXhwb3J0cykgeyAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgYmFiZWxIZWxwZXJzID0ge307XG4gICAgYmFiZWxIZWxwZXJzLnR5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gICAgfSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gICAgfTtcblxuICAgIGJhYmVsSGVscGVycy5jbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgICAgIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGJhYmVsSGVscGVycy5jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgICAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gICAgICB9O1xuICAgIH0oKTtcblxuICAgIGJhYmVsSGVscGVycy5zbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHtcbiAgICAgICAgdmFyIF9hcnIgPSBbXTtcbiAgICAgICAgdmFyIF9uID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9kID0gZmFsc2U7XG4gICAgICAgIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgICAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgICAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIF9kID0gdHJ1ZTtcbiAgICAgICAgICBfZSA9IGVycjtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gX2FycjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgICAgIHJldHVybiBhcnI7XG4gICAgICAgIH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7XG4gICAgICAgICAgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KCk7XG5cbiAgICBiYWJlbEhlbHBlcnMudG9Db25zdW1hYmxlQXJyYXkgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIGFycjJbaV0gPSBhcnJbaV07XG5cbiAgICAgICAgcmV0dXJuIGFycjI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShhcnIpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBiYWJlbEhlbHBlcnM7XG5cbiAgICB2YXIgRW50aXR5RmFjdG9yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gRW50aXR5RmFjdG9yeSgpIHtcbiAgICAgICAgICAgIGJhYmVsSGVscGVycy5jbGFzc0NhbGxDaGVjayh0aGlzLCBFbnRpdHlGYWN0b3J5KTtcblxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplcnMgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSBuZXcgTWFwKCk7XG4gICAgICAgIH1cblxuICAgICAgICBiYWJlbEhlbHBlcnMuY3JlYXRlQ2xhc3MoRW50aXR5RmFjdG9yeSwgW3tcbiAgICAgICAgICAgIGtleTogJ3JlZ2lzdGVySW5pdGlhbGl6ZXInLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlZ2lzdGVySW5pdGlhbGl6ZXIoa2V5LCBpbml0aWFsaXplcikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyB8fCBrZXkgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcigna2V5IG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nLicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5pdGlhbGl6ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdpbml0aWFsaXplciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplcnMuc2V0KGtleSwgaW5pdGlhbGl6ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdidWlsZCcsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYnVpbGQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gbmV3IE1hcCgpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ3dpdGhDb21wb25lbnQnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHdpdGhDb21wb25lbnQoa2V5LCBpbml0aWFsaXplcikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyB8fCBrZXkgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5pdGlhbGl6ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6ZXIgPSB0aGlzLmluaXRpYWxpemVycy5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uc2V0KGtleSwgaW5pdGlhbGl6ZXIpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ2NyZWF0ZUNvbmZpZ3VyYXRpb24nLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZUNvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlndXJhdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnY3JlYXRlJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGUoZW50aXR5TWFuYWdlcikge1xuICAgICAgICAgICAgICAgIHZhciBjb3VudCA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IDEgOiBhcmd1bWVudHNbMV07XG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpZ3VyYXRpb24gPSBhcmd1bWVudHMubGVuZ3RoIDw9IDIgfHwgYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiBhcmd1bWVudHNbMl07XG5cbiAgICAgICAgICAgICAgICBpZiAoIShlbnRpdHlNYW5hZ2VyIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uIHx8IHRoaXMuY29uZmlndXJhdGlvbjtcblxuICAgICAgICAgICAgICAgIHZhciBjb21wb25lbnRzID0gW107XG5cbiAgICAgICAgICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gY29uZmlndXJhdGlvbi5rZXlzKClbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29tcG9uZW50ID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgZW50aXRpZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2VudGl0eU1hbmFnZXIkbmV3RW50ID0gZW50aXR5TWFuYWdlci5uZXdFbnRpdHkoY29tcG9uZW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGlkID0gX2VudGl0eU1hbmFnZXIkbmV3RW50LmlkO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZW50aXR5ID0gX2VudGl0eU1hbmFnZXIkbmV3RW50LmVudGl0eTtcblxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpZCA+PSBlbnRpdHlNYW5hZ2VyLmNhcGFjaXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IGNvbmZpZ3VyYXRpb25bU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3N0ZXAyJHZhbHVlID0gYmFiZWxIZWxwZXJzLnNsaWNlZFRvQXJyYXkoX3N0ZXAyLnZhbHVlLCAyKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb21wb25lbnQgPSBfc3RlcDIkdmFsdWVbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluaXRpYWxpemVyID0gX3N0ZXAyJHZhbHVlWzFdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gaW5pdGlhbGl6ZXIuY2FsbChlbnRpdHlbY29tcG9uZW50XSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFiZWxIZWxwZXJzLnR5cGVvZihlbnRpdHlbY29tcG9uZW50XSkgIT09ICdvYmplY3QnICYmIHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eVtjb21wb25lbnRdID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjIucmV0dXJuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pdGVyYXRvcjIucmV0dXJuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBlbnRpdGllcy5wdXNoKHsgaWQ6IGlkLCBlbnRpdHk6IGVudGl0eSB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZW50aXRpZXMubGVuZ3RoID09PSAxID8gZW50aXRpZXNbMF0gOiBlbnRpdGllcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfV0pO1xuICAgICAgICByZXR1cm4gRW50aXR5RmFjdG9yeTtcbiAgICB9KCk7XG5cbiAgICB2YXIgQ29tcG9uZW50TWFuYWdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gQ29tcG9uZW50TWFuYWdlcigpIHtcbiAgICAgICAgICAgIGJhYmVsSGVscGVycy5jbGFzc0NhbGxDaGVjayh0aGlzLCBDb21wb25lbnRNYW5hZ2VyKTtcblxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzID0gbmV3IE1hcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYmFiZWxIZWxwZXJzLmNyZWF0ZUNsYXNzKENvbXBvbmVudE1hbmFnZXIsIFt7XG4gICAgICAgICAgICBrZXk6ICduZXdDb21wb25lbnQnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG5ld0NvbXBvbmVudChrZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRzLmdldChrZXkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIGNvbXBvbmVudCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IGJhYmVsSGVscGVycy50eXBlb2YoY29tcG9uZW50KSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IGNvbXBvbmVudCgpO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXQgPSB7fTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjb21wb25lbnQpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldFtrZXldID0gY29tcG9uZW50W2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfShjb21wb25lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ3JlZ2lzdGVyQ29tcG9uZW50JyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZWdpc3RlckNvbXBvbmVudChrZXksIGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyB8fCBrZXkgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcigna2V5IG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nLicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnQgPT09IG51bGwgfHwgY29tcG9uZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjb21wb25lbnQgY2Fubm90IGJlIG51bGwgb3IgdW5kZWZpbmVkLicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50cy5zZXQoa2V5LCBjb21wb25lbnQpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnZ2V0Q29tcG9uZW50cycsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q29tcG9uZW50cygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnRzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XSk7XG4gICAgICAgIHJldHVybiBDb21wb25lbnRNYW5hZ2VyO1xuICAgIH0oKTtcblxuICAgIHZhciBTeXN0ZW1UeXBlID0ge1xuICAgICAgICBMb2dpYzogMCxcbiAgICAgICAgUmVuZGVyOiAxLFxuICAgICAgICBJbml0OiAyXG4gICAgfTtcblxuICAgIHZhciBTeXN0ZW1NYW5hZ2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBTeXN0ZW1NYW5hZ2VyKCkge1xuICAgICAgICAgICAgYmFiZWxIZWxwZXJzLmNsYXNzQ2FsbENoZWNrKHRoaXMsIFN5c3RlbU1hbmFnZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmxvZ2ljU3lzdGVtcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyU3lzdGVtcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdFN5c3RlbXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIH1cblxuICAgICAgICBiYWJlbEhlbHBlcnMuY3JlYXRlQ2xhc3MoU3lzdGVtTWFuYWdlciwgW3tcbiAgICAgICAgICAgIGtleTogJ3JlZ2lzdGVyU3lzdGVtJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZWdpc3RlclN5c3RlbShrZXksIHR5cGUsIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnIHx8IGtleSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdrZXkgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcuJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgIT09IFN5c3RlbVR5cGUuTG9naWMgJiYgdHlwZSAhPT0gU3lzdGVtVHlwZS5SZW5kZXIgJiYgdHlwZSAhPT0gU3lzdGVtVHlwZS5Jbml0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcigndHlwZSBtdXN0IGJlIGEgdmFsaWQgU3lzdGVtVHlwZS4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29tcG9uZW50cykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjb21wb25lbnRzIGFyZ3VtZW50IG11c3QgYmUgYW4gYXJyYXkgb2YgY29tcG9uZW50cy4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBzeXN0ZW0gPSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudHM6IGNvbXBvbmVudHMsXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBjYWxsYmFja1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTeXN0ZW1UeXBlLkxvZ2ljOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpY1N5c3RlbXMuc2V0KGtleSwgc3lzdGVtKTticmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBTeXN0ZW1UeXBlLlJlbmRlcjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyU3lzdGVtcy5zZXQoa2V5LCBzeXN0ZW0pO2JyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFN5c3RlbVR5cGUuSW5pdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdFN5c3RlbXMuc2V0KGtleSwgc3lzdGVtKTticmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdyZW1vdmVTeXN0ZW0nLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZVN5c3RlbShrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2dpY1N5c3RlbXMuZGVsZXRlKGtleSkgfHwgdGhpcy5yZW5kZXJTeXN0ZW1zLmRlbGV0ZShrZXkpIHx8IHRoaXMuaW5pdFN5c3RlbXMuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1dKTtcbiAgICAgICAgcmV0dXJuIFN5c3RlbU1hbmFnZXI7XG4gICAgfSgpO1xuXG4gICAgdmFyIEV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gRXZlbnRIYW5kbGVyKCkge1xuICAgICAgICAgICAgYmFiZWxIZWxwZXJzLmNsYXNzQ2FsbENoZWNrKHRoaXMsIEV2ZW50SGFuZGxlcik7XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IE1hcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYmFiZWxIZWxwZXJzLmNyZWF0ZUNsYXNzKEV2ZW50SGFuZGxlciwgW3tcbiAgICAgICAgICAgIGtleTogJ2VtcHR5UHJvbWlzZScsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZW1wdHlQcm9taXNlKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ3Byb21pc2UnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHByb21pc2UoY2FsbGJhY2ssIGNvbnRleHQsIGFyZ3MsIHRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGltZW91dCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKHR5cGVvZiBjb250ZXh0ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogYmFiZWxIZWxwZXJzLnR5cGVvZihjb250ZXh0KSkgPT09ICdvYmplY3QnID8gY2FsbGJhY2suY2FsbC5hcHBseShjYWxsYmFjaywgW2NvbnRleHRdLmNvbmNhdChiYWJlbEhlbHBlcnMudG9Db25zdW1hYmxlQXJyYXkoYXJncykpKSA6IGNhbGxiYWNrLmFwcGx5LmFwcGx5KGNhbGxiYWNrLCBbY29udGV4dF0uY29uY2F0KGJhYmVsSGVscGVycy50b0NvbnN1bWFibGVBcnJheShhcmdzKSkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgodHlwZW9mIGNvbnRleHQgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBiYWJlbEhlbHBlcnMudHlwZW9mKGNvbnRleHQpKSA9PT0gJ29iamVjdCcgPyBjYWxsYmFjay5jYWxsLmFwcGx5KGNhbGxiYWNrLCBbY29udGV4dF0uY29uY2F0KGJhYmVsSGVscGVycy50b0NvbnN1bWFibGVBcnJheShhcmdzKSkpIDogY2FsbGJhY2suYXBwbHkuYXBwbHkoY2FsbGJhY2ssIFtjb250ZXh0XS5jb25jYXQoYmFiZWxIZWxwZXJzLnRvQ29uc3VtYWJsZUFycmF5KGFyZ3MpKSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdsaXN0ZW4nLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGxpc3RlbihldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5ldmVudHMuaGFzKGV2ZW50KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50cy5zZXQoZXZlbnQsIG5ldyBNYXAoKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50SWQgPSAtMTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50SWQgPSBNYXRoLm1heC5hcHBseShNYXRoLCBbZXZlbnRJZF0uY29uY2F0KGJhYmVsSGVscGVycy50b0NvbnN1bWFibGVBcnJheShldmVudC5rZXlzKCkpKSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICArK2V2ZW50SWQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50cy5nZXQoZXZlbnQpLnNldChldmVudElkLCBjYWxsYmFjayk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnRJZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnc3RvcExpc3RlbicsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc3RvcExpc3RlbihldmVudElkKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IHRoaXMuZXZlbnRzLnZhbHVlcygpW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50cyA9IF9zdGVwLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IGV2ZW50cy5rZXlzKClbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlkID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpZCA9PT0gZXZlbnRJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50cy5kZWxldGUoZXZlbnRJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yMi5yZXR1cm4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICd0cmlnZ2VyJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiB0cmlnZ2VyKCkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcyBpbnN0YW5jZW9mIEVudGl0eU1hbmFnZXIgPyB0aGlzLmV2ZW50SGFuZGxlciA6IHRoaXM7XG5cbiAgICAgICAgICAgICAgICB2YXIgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcblxuICAgICAgICAgICAgICAgIHZhciBfYXJncyRzcGxpY2UgPSBhcmdzLnNwbGljZSgwLCAxKTtcblxuICAgICAgICAgICAgICAgIHZhciBfYXJncyRzcGxpY2UyID0gYmFiZWxIZWxwZXJzLnNsaWNlZFRvQXJyYXkoX2FyZ3Mkc3BsaWNlLCAxKTtcblxuICAgICAgICAgICAgICAgIHZhciBldmVudCA9IF9hcmdzJHNwbGljZTJbMF07XG5cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZXZlbnQgIT09ICdzdHJpbmcnIHx8ICFzZWxmLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmVtcHR5UHJvbWlzZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBwcm9taXNlcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yMyA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjMgPSBzZWxmLmV2ZW50cy5nZXQoZXZlbnQpLnZhbHVlcygpW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAzOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gKF9zdGVwMyA9IF9pdGVyYXRvcjMubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBfc3RlcDMudmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2goc2VsZi5wcm9taXNlKGNhbGxiYWNrLCB0aGlzLCBhcmdzLCAxKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3IzID0gZXJyO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zICYmIF9pdGVyYXRvcjMucmV0dXJuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yMy5yZXR1cm4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICd0cmlnZ2VyRGVsYXllZCcsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdHJpZ2dlckRlbGF5ZWQoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlciA/IHRoaXMuZXZlbnRIYW5kbGVyIDogdGhpcztcblxuICAgICAgICAgICAgICAgIHZhciBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xuXG4gICAgICAgICAgICAgICAgdmFyIF9hcmdzJHNwbGljZTMgPSBhcmdzLnNwbGljZSgwLCAyKTtcblxuICAgICAgICAgICAgICAgIHZhciBfYXJncyRzcGxpY2U0ID0gYmFiZWxIZWxwZXJzLnNsaWNlZFRvQXJyYXkoX2FyZ3Mkc3BsaWNlMywgMik7XG5cbiAgICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBfYXJncyRzcGxpY2U0WzBdO1xuICAgICAgICAgICAgICAgIHZhciB0aW1lb3V0ID0gX2FyZ3Mkc3BsaWNlNFsxXTtcblxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgIU51bWJlci5pc0ludGVnZXIodGltZW91dCkgfHwgIXNlbGYuZXZlbnRzLmhhcyhldmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuZW1wdHlQcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHByb21pc2VzID0gW107XG5cbiAgICAgICAgICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3I0ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yNCA9IHNlbGYuZXZlbnRzLmdldChldmVudCkudmFsdWVzKClbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDQ7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgPSAoX3N0ZXA0ID0gX2l0ZXJhdG9yNC5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCA9IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IF9zdGVwNC52YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChzZWxmLnByb21pc2UoY2FsbGJhY2ssIHRoaXMsIGFyZ3MsIHRpbWVvdXQpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3JFcnJvcjQgPSBlcnI7XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgJiYgX2l0ZXJhdG9yNC5yZXR1cm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3I0LnJldHVybigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yNDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1dKTtcbiAgICAgICAgcmV0dXJuIEV2ZW50SGFuZGxlcjtcbiAgICB9KCk7XG5cbiAgICB2YXIgRW50aXR5TWFuYWdlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gRW50aXR5TWFuYWdlcigpIHtcbiAgICAgICAgICAgIHZhciBjYXBhY2l0eSA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMCB8fCBhcmd1bWVudHNbMF0gPT09IHVuZGVmaW5lZCA/IDEwMDAgOiBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICBiYWJlbEhlbHBlcnMuY2xhc3NDYWxsQ2hlY2sodGhpcywgRW50aXR5TWFuYWdlcik7XG5cbiAgICAgICAgICAgIHRoaXMuY2FwYWNpdHkgPSBjYXBhY2l0eTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IC0xO1xuXG4gICAgICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkgPSBuZXcgRW50aXR5RmFjdG9yeSgpO1xuICAgICAgICAgICAgdGhpcy5zeXN0ZW1NYW5hZ2VyID0gbmV3IFN5c3RlbU1hbmFnZXIoKTtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50TWFuYWdlciA9IG5ldyBDb21wb25lbnRNYW5hZ2VyKCk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50SGFuZGxlciA9IG5ldyBFdmVudEhhbmRsZXIoKTtcblxuICAgICAgICAgICAgdGhpcy5lbnRpdGllcyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IHRoaXMuY2FwYWNpdHkgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGNvbXBvbmVudHM6IFtdIH07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5lbnRpdHlDb25maWd1cmF0aW9ucyA9IG5ldyBNYXAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJhYmVsSGVscGVycy5jcmVhdGVDbGFzcyhFbnRpdHlNYW5hZ2VyLCBbe1xuICAgICAgICAgICAga2V5OiAnaW5jcmVhc2VDYXBhY2l0eScsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaW5jcmVhc2VDYXBhY2l0eSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgb2xkQ2FwYWNpdHkgPSB0aGlzLmNhcGFjaXR5O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jYXBhY2l0eSAqPSAyO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdGllcyA9IFtdLmNvbmNhdChiYWJlbEhlbHBlcnMudG9Db25zdW1hYmxlQXJyYXkodGhpcy5lbnRpdGllcyksIGJhYmVsSGVscGVycy50b0NvbnN1bWFibGVBcnJheShBcnJheS5mcm9tKHsgbGVuZ3RoOiBvbGRDYXBhY2l0eSB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGNvbXBvbmVudHM6IFtdIH07XG4gICAgICAgICAgICAgICAgfSkpKTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBvbGRDYXBhY2l0eTsgaSA8IHRoaXMuY2FwYWNpdHk7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IHRoaXMuY29tcG9uZW50TWFuYWdlci5nZXRDb21wb25lbnRzKCkua2V5cygpW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb21wb25lbnQgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW50aXRpZXNbaV1bY29tcG9uZW50XSA9IHRoaXMuY29tcG9uZW50TWFuYWdlci5uZXdDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnbmV3RW50aXR5JyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBuZXdFbnRpdHkoY29tcG9uZW50cykge1xuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjb21wb25lbnRzKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvbXBvbmVudHMgYXJndW1lbnQgbXVzdCBiZSBhbiBhcnJheSBvZiBjb21wb25lbnRzLicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBpZCA9IDA7XG5cbiAgICAgICAgICAgICAgICBmb3IgKDsgaWQgPCB0aGlzLmNhcGFjaXR5OyArK2lkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaWQgPj0gdGhpcy5jYXBhY2l0eSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB0b2RvOiBhdXRvIGluY3JlYXNlIGNhcGFjaXR5P1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpZDogdGhpcy5jYXBhY2l0eSwgZW50aXR5OiBudWxsIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IGlkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMgPSBjb21wb25lbnRzO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgaWQ6IGlkLCBlbnRpdHk6IHRoaXMuZW50aXRpZXNbaWRdIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ2RlbGV0ZUVudGl0eScsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZGVsZXRlRW50aXR5KGlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tpZF0uY29tcG9uZW50cyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlkIDwgdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gaWQ7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2ldLmNvbXBvbmVudHMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSBpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdnZXRFbnRpdGllcycsXG4gICAgICAgICAgICB2YWx1ZTogcmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoZnVuY3Rpb24gZ2V0RW50aXRpZXMoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgICAgIHZhciBjb21wb25lbnRzID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGFyZ3VtZW50c1swXTtcblxuICAgICAgICAgICAgICAgIHZhciBfbG9vcCwgaWQ7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gZ2V0RW50aXRpZXMkKF9jb250ZXh0Mikge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dDIucHJldiA9IF9jb250ZXh0Mi5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbG9vcCA9IHJlZ2VuZXJhdG9yUnVudGltZS5tYXJrKGZ1bmN0aW9uIF9sb29wKGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVnZW5lcmF0b3JSdW50aW1lLndyYXAoZnVuY3Rpb24gX2xvb3AkKF9jb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChfY29udGV4dC5wcmV2ID0gX2NvbnRleHQubmV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGNvbXBvbmVudHMgPT09IG51bGwgfHwgY29tcG9uZW50cy5ldmVyeShmdW5jdGlvbiAoY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5lbnRpdGllc1tpZF0uY29tcG9uZW50cy5pbmRleE9mKGNvbXBvbmVudCkgIT09IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQubmV4dCA9IDM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgaWQ6IGlkLCBlbnRpdHk6IF90aGlzLmVudGl0aWVzW2lkXSB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdlbmQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBfbG9vcCwgX3RoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShpZCA8PSB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuZGVsZWdhdGVZaWVsZChfbG9vcChpZCksICd0MCcsIDQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArK2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dDIubmV4dCA9IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29udGV4dDIuc3RvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgZ2V0RW50aXRpZXMsIHRoaXMpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAncmVnaXN0ZXJDb25maWd1cmF0aW9uJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZWdpc3RlckNvbmZpZ3VyYXRpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnIHx8IGtleSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdrZXkgbXVzdCBiZSBhIG5vbiBlbXB0eSBzdHJpbmcuJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdHlDb25maWd1cmF0aW9ucy5zZXQoa2V5LCB0aGlzLmVudGl0eUZhY3RvcnkuY3JlYXRlQ29uZmlndXJhdGlvbigpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENvbXBvbmVudCBNYW5hZ2VyXG5cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAncmVnaXN0ZXJDb21wb25lbnQnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlZ2lzdGVyQ29tcG9uZW50KGtleSwgY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRNYW5hZ2VyLnJlZ2lzdGVyQ29tcG9uZW50KGtleSwgY29tcG9uZW50KTtcblxuICAgICAgICAgICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gdGhpcy5lbnRpdGllc1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVudGl0eSA9IF9zdGVwMi52YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5W2tleV0gPSB0aGlzLmNvbXBvbmVudE1hbmFnZXIubmV3Q29tcG9uZW50KGtleSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjIucmV0dXJuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yMi5yZXR1cm4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgaW5pdGlhbGl6ZXIgPSB2b2lkIDA7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjb21wb25lbnQgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBiYWJlbEhlbHBlcnMudHlwZW9mKGNvbXBvbmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6ZXIgPSBjb21wb25lbnQ7YnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6ZXIgPSBmdW5jdGlvbiBpbml0aWFsaXplcigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IzID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IzID0gT2JqZWN0LmtleXMoY29tcG9uZW50KVtTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMzsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IChfc3RlcDMgPSBfaXRlcmF0b3IzLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfa2V5ID0gX3N0ZXAzLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tfa2V5XSA9IGNvbXBvbmVudFtfa2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3IzID0gZXJyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zICYmIF9pdGVyYXRvcjMucmV0dXJuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pdGVyYXRvcjMucmV0dXJuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplciA9IGZ1bmN0aW9uIGluaXRpYWxpemVyKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O2JyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS5yZWdpc3RlckluaXRpYWxpemVyKGtleSwgaW5pdGlhbGl6ZXIpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnYWRkQ29tcG9uZW50JyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRDb21wb25lbnQoaWQsIGNvbXBvbmVudEtleSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzLmluZGV4T2YoY29tcG9uZW50S2V5KSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMucHVzaChjb21wb25lbnRLZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdyZW1vdmVDb21wb25lbnQnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZUNvbXBvbmVudChpZCwgY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5lbnRpdGllc1tpZF0uY29tcG9uZW50cy5pbmRleE9mKGNvbXBvbmVudCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFN5c3RlbSBNYW5hZ2VyXG5cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAncmVnaXN0ZXJTeXN0ZW0nLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlZ2lzdGVyU3lzdGVtKGtleSwgdHlwZSwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlZ2lzdGVyU3lzdGVtKGtleSwgdHlwZSwgY29tcG9uZW50cywgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdyZWdpc3RlckxvZ2ljU3lzdGVtJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZWdpc3RlckxvZ2ljU3lzdGVtKGtleSwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlZ2lzdGVyU3lzdGVtKGtleSwgU3lzdGVtVHlwZS5Mb2dpYywgY29tcG9uZW50cywgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdyZWdpc3RlclJlbmRlclN5c3RlbScsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVnaXN0ZXJSZW5kZXJTeXN0ZW0oa2V5LCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVnaXN0ZXJTeXN0ZW0oa2V5LCBTeXN0ZW1UeXBlLlJlbmRlciwgY29tcG9uZW50cywgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdyZWdpc3RlckluaXRTeXN0ZW0nLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlZ2lzdGVySW5pdFN5c3RlbShrZXksIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbShrZXksIFN5c3RlbVR5cGUuSW5pdCwgY29tcG9uZW50cywgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdyZW1vdmVTeXN0ZW0nLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZVN5c3RlbShrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlbW92ZVN5c3RlbShrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdvbkxvZ2ljJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBvbkxvZ2ljKG9wdHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3I0ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yNCA9IHRoaXMuc3lzdGVtTWFuYWdlci5sb2dpY1N5c3RlbXMudmFsdWVzKClbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDQ7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgPSAoX3N0ZXA0ID0gX2l0ZXJhdG9yNC5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCA9IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzeXN0ZW0gPSBfc3RlcDQudmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMpLCBvcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3JFcnJvcjQgPSBlcnI7XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQgJiYgX2l0ZXJhdG9yNC5yZXR1cm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3I0LnJldHVybigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yNDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnb25SZW5kZXInLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uUmVuZGVyKG9wdHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3I1ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yNSA9IHRoaXMuc3lzdGVtTWFuYWdlci5yZW5kZXJTeXN0ZW1zLnZhbHVlcygpW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA1OyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb241ID0gKF9zdGVwNSA9IF9pdGVyYXRvcjUubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjUgPSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3lzdGVtID0gX3N0ZXA1LnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzeXN0ZW0uY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLmdldEVudGl0aWVzKHN5c3RlbS5jb21wb25lbnRzKSwgb3B0cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3I1ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3I1ID0gZXJyO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb241ICYmIF9pdGVyYXRvcjUucmV0dXJuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yNS5yZXR1cm4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ29uSW5pdCcsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gb25Jbml0KG9wdHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjYgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjYgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3I2ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yNiA9IHRoaXMuc3lzdGVtTWFuYWdlci5pbml0U3lzdGVtcy52YWx1ZXMoKVtTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwNjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNiA9IChfc3RlcDYgPSBfaXRlcmF0b3I2Lm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb242ID0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN5c3RlbSA9IF9zdGVwNi52YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3lzdGVtLmNhbGxiYWNrLmNhbGwodGhpcywgdGhpcy5nZXRFbnRpdGllcyhzeXN0ZW0uY29tcG9uZW50cyksIG9wdHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yNiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIF9pdGVyYXRvckVycm9yNiA9IGVycjtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNiAmJiBfaXRlcmF0b3I2LnJldHVybikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pdGVyYXRvcjYucmV0dXJuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3I2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I2O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBFbnRpdHkgRmFjdG9yeVxuXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ3JlZ2lzdGVySW5pdGlhbGl6ZXInLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LnJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnYnVpbGQnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGJ1aWxkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS5idWlsZCgpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ3dpdGhDb21wb25lbnQnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHdpdGhDb21wb25lbnQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LndpdGhDb21wb25lbnQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdjcmVhdGUnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZShjb3VudCwga2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpZ3VyYXRpb24gPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbiA9IHRoaXMuZW50aXR5Q29uZmlndXJhdGlvbnMuZ2V0KGtleSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpZ3VyYXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjb3VsZCBub3QgZmluZCBlbnRpdHkgY29uZmlndXJhdGlvbiBmb3IgdGhlIHN1cHBsaWVkIGtleS4gaWYgeW91IHdpc2ggdG8gY3JlYXRlIGFuIGVudGl0eSB3aXRob3V0IGEgY29uZmlndXJhdGlvbiwgZG8gbm90IHBhc3MgYSBrZXkuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbnRpdHlGYWN0b3J5LmNyZWF0ZSh0aGlzLCBjb3VudCwgY29uZmlndXJhdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEV2ZW50IEhhbmRsZXJcblxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdsaXN0ZW4nLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGxpc3RlbihldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIubGlzdGVuKGV2ZW50LCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ3N0b3BMaXN0ZW4nLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHN0b3BMaXN0ZW4oZXZlbnRJZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci5zdG9wTGlzdGVuKGV2ZW50SWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICd0cmlnZ2VyJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiB0cmlnZ2VyKCkge1xuICAgICAgICAgICAgICAgIHZhciBfZXZlbnRIYW5kbGVyJHRyaWdnZXI7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKF9ldmVudEhhbmRsZXIkdHJpZ2dlciA9IHRoaXMuZXZlbnRIYW5kbGVyLnRyaWdnZXIpLmNhbGwuYXBwbHkoX2V2ZW50SGFuZGxlciR0cmlnZ2VyLCBbdGhpc10uY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAndHJpZ2dlckRlbGF5ZWQnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHRyaWdnZXJEZWxheWVkKCkge1xuICAgICAgICAgICAgICAgIHZhciBfZXZlbnRIYW5kbGVyJHRyaWdnZXIyO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChfZXZlbnRIYW5kbGVyJHRyaWdnZXIyID0gdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlckRlbGF5ZWQpLmNhbGwuYXBwbHkoX2V2ZW50SGFuZGxlciR0cmlnZ2VyMiwgW3RoaXNdLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1dKTtcbiAgICAgICAgcmV0dXJuIEVudGl0eU1hbmFnZXI7XG4gICAgfSgpO1xuXG4gICAgZXhwb3J0c1snZGVmYXVsdCddID0gRW50aXR5TWFuYWdlcjtcbiAgICBleHBvcnRzLkVudGl0eU1hbmFnZXIgPSBFbnRpdHlNYW5hZ2VyO1xuICAgIGV4cG9ydHMuRW50aXR5RmFjdG9yeSA9IEVudGl0eUZhY3Rvcnk7XG4gICAgZXhwb3J0cy5TeXN0ZW1NYW5hZ2VyID0gU3lzdGVtTWFuYWdlcjtcbiAgICBleHBvcnRzLlN5c3RlbVR5cGUgPSBTeXN0ZW1UeXBlO1xuICAgIGV4cG9ydHMuQ29tcG9uZW50TWFuYWdlciA9IENvbXBvbmVudE1hbmFnZXI7XG4gICAgZXhwb3J0cy5FdmVudEhhbmRsZXIgPSBFdmVudEhhbmRsZXI7XG5cbn0pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWjJjdFpXNTBhWFJwWlhNdWFuTWlMQ0p6YjNWeVkyVnpJanBiSWk0dUwzTnlZeTlqYjNKbEwyVnVkR2wwZVMxbVlXTjBiM0o1TG1weklpd2lMaTR2YzNKakwyTnZjbVV2WTI5dGNHOXVaVzUwTFcxaGJtRm5aWEl1YW5NaUxDSXVMaTl6Y21NdlkyOXlaUzl6ZVhOMFpXMHRiV0Z1WVdkbGNpNXFjeUlzSWk0dUwzTnlZeTlqYjNKbEwyVjJaVzUwTFdoaGJtUnNaWEl1YW5NaUxDSXVMaTl6Y21NdlkyOXlaUzlsYm5ScGRIa3RiV0Z1WVdkbGNpNXFjeUpkTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lKcGJYQnZjblFnUlc1MGFYUjVUV0Z1WVdkbGNpQm1jbTl0SUNjdUwyVnVkR2wwZVMxdFlXNWhaMlZ5SjF4dVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCamJHRnpjeUJGYm5ScGRIbEdZV04wYjNKNUlIdGNiaUFnSUNCamIyNXpkSEoxWTNSdmNpZ3BJSHRjYmlBZ0lDQWdJQ0FnZEdocGN5NXBibWwwYVdGc2FYcGxjbk1nSUQwZ2JtVjNJRTFoY0NncFhHNGdJQ0FnSUNBZ0lIUm9hWE11WTI5dVptbG5kWEpoZEdsdmJpQTlJRzVsZHlCTllYQW9LVnh1SUNBZ0lIMWNiaUFnSUNCY2JpQWdJQ0J5WldkcGMzUmxja2x1YVhScFlXeHBlbVZ5S0d0bGVTd2dhVzVwZEdsaGJHbDZaWElwSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLSFI1Y0dWdlppQnJaWGtnSVQwOUlDZHpkSEpwYm1jbklIeDhJR3RsZVNBOVBUMGdKeWNwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFJvY205M0lGUjVjR1ZGY25KdmNpZ25hMlY1SUcxMWMzUWdZbVVnWVNCdWIyNHRaVzF3ZEhrZ2MzUnlhVzVuTGljcFhHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJR2xtSUNoMGVYQmxiMllnYVc1cGRHbGhiR2w2WlhJZ0lUMDlJQ2RtZFc1amRHbHZiaWNwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFJvY205M0lGUjVjR1ZGY25KdmNpZ25hVzVwZEdsaGJHbDZaWElnYlhWemRDQmlaU0JoSUdaMWJtTjBhVzl1TGljcFhHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJSFJvYVhNdWFXNXBkR2xoYkdsNlpYSnpMbk5sZENoclpYa3NJR2x1YVhScFlXeHBlbVZ5S1Z4dUlDQWdJSDFjYmlBZ0lDQmNiaUFnSUNCaWRXbHNaQ2dwSUh0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVqYjI1bWFXZDFjbUYwYVc5dUlEMGdibVYzSUUxaGNDZ3BYRzRnSUNBZ0lDQWdJRnh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdkR2hwYzF4dUlDQWdJSDFjYmlBZ0lDQmNiaUFnSUNCM2FYUm9RMjl0Y0c5dVpXNTBLR3RsZVN3Z2FXNXBkR2xoYkdsNlpYSXBJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tIUjVjR1Z2WmlCclpYa2dJVDA5SUNkemRISnBibWNuSUh4OElHdGxlU0E5UFQwZ0p5Y3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCMGFHbHpYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUdsbUlDaDBlWEJsYjJZZ2FXNXBkR2xoYkdsNlpYSWdJVDA5SUNkbWRXNWpkR2x2YmljcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsdWFYUnBZV3hwZW1WeUlEMGdkR2hwY3k1cGJtbDBhV0ZzYVhwbGNuTXVaMlYwS0d0bGVTbGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnZEdocGN5NWpiMjVtYVdkMWNtRjBhVzl1TG5ObGRDaHJaWGtzSUdsdWFYUnBZV3hwZW1WeUtWeHVJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIUm9hWE5jYmlBZ0lDQjlYRzRnSUNBZ1hHNGdJQ0FnWTNKbFlYUmxRMjl1Wm1sbmRYSmhkR2x2YmlncElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIUm9hWE11WTI5dVptbG5kWEpoZEdsdmJseHVJQ0FnSUgxY2JpQWdJQ0JjYmlBZ0lDQmpjbVZoZEdVb1pXNTBhWFI1VFdGdVlXZGxjaXdnWTI5MWJuUWdQU0F4TENCamIyNW1hV2QxY21GMGFXOXVJRDBnZFc1a1pXWnBibVZrS1NCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2doS0dWdWRHbDBlVTFoYm1GblpYSWdhVzV6ZEdGdVkyVnZaaUJGYm5ScGRIbE5ZVzVoWjJWeUtTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUZ0ZFhHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNCY2JpQWdJQ0FnSUNBZ1kyOXVabWxuZFhKaGRHbHZiaUE5SUdOdmJtWnBaM1Z5WVhScGIyNGdmSHdnZEdocGN5NWpiMjVtYVdkMWNtRjBhVzl1WEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCc1pYUWdZMjl0Y0c5dVpXNTBjeUE5SUZ0ZFhHNGdJQ0FnSUNBZ0lGeHVJQ0FnSUNBZ0lDQm1iM0lnS0d4bGRDQmpiMjF3YjI1bGJuUWdiMllnWTI5dVptbG5kWEpoZEdsdmJpNXJaWGx6S0NrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdOdmJYQnZibVZ1ZEhNdWNIVnphQ2hqYjIxd2IyNWxiblFwWEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lHeGxkQ0JsYm5ScGRHbGxjeUE5SUZ0ZFhHNGdJQ0FnSUNBZ0lGeHVJQ0FnSUNBZ0lDQm1iM0lnS0d4bGRDQnBJRDBnTURzZ2FTQThJR052ZFc1ME95QXJLMmtwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR3hsZENCN0lHbGtMQ0JsYm5ScGRIa2dmU0E5SUdWdWRHbDBlVTFoYm1GblpYSXVibVYzUlc1MGFYUjVLR052YlhCdmJtVnVkSE1wWEc0Z0lDQWdJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaHBaQ0ErUFNCbGJuUnBkSGxOWVc1aFoyVnlMbU5oY0dGamFYUjVLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWW5KbFlXdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJRnh1SUNBZ0lDQWdJQ0FnSUNBZ1ptOXlJQ2hzWlhRZ1cyTnZiWEJ2Ym1WdWRDd2dhVzVwZEdsaGJHbDZaWEpkSUc5bUlHTnZibVpwWjNWeVlYUnBiMjRwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9kSGx3Wlc5bUlHbHVhWFJwWVd4cGVtVnlJQ0U5UFNBblpuVnVZM1JwYjI0bktTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdOdmJuUnBiblZsWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2JHVjBJSEpsYzNWc2RDQTlJR2x1YVhScFlXeHBlbVZ5TG1OaGJHd29aVzUwYVhSNVcyTnZiWEJ2Ym1WdWRGMHBYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0hSNWNHVnZaaUJsYm5ScGRIbGJZMjl0Y0c5dVpXNTBYU0FoUFQwZ0oyOWlhbVZqZENjZ0ppWWdjbVZ6ZFd4MElDRTlQU0IxYm1SbFptbHVaV1FwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdaVzUwYVhSNVcyTnZiWEJ2Ym1WdWRGMGdQU0J5WlhOMWJIUmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnSUNBZ0lHVnVkR2wwYVdWekxuQjFjMmdvZXlCcFpDd2daVzUwYVhSNUlIMHBYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJsYm5ScGRHbGxjeTVzWlc1bmRHZ2dQVDA5SURFZ1B5QmxiblJwZEdsbGMxc3dYU0E2SUdWdWRHbDBhV1Z6WEc0Z0lDQWdmVnh1ZlNJc0ltVjRjRzl5ZENCa1pXWmhkV3gwSUdOc1lYTnpJRU52YlhCdmJtVnVkRTFoYm1GblpYSWdlMXh1SUNBZ0lHTnZibk4wY25WamRHOXlLQ2tnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMbU52YlhCdmJtVnVkSE1nUFNCdVpYY2dUV0Z3S0NsY2JpQWdJQ0I5WEc0Z0lDQWdYRzRnSUNBZ2JtVjNRMjl0Y0c5dVpXNTBLR3RsZVNrZ2UxeHVJQ0FnSUNBZ0lDQnNaWFFnWTI5dGNHOXVaVzUwSUQwZ2RHaHBjeTVqYjIxd2IyNWxiblJ6TG1kbGRDaHJaWGtwWEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCcFppQW9ZMjl0Y0c5dVpXNTBJRDA5SUc1MWJHd3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCdWRXeHNYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUhOM2FYUmphQ0FvZEhsd1pXOW1JR052YlhCdmJtVnVkQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdZMkZ6WlNBblpuVnVZM1JwYjI0bk9seHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCdVpYY2dZMjl0Y0c5dVpXNTBLQ2xjYmlBZ0lDQWdJQ0FnSUNBZ0lHTmhjMlVnSjI5aWFtVmpkQ2NnSURvZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlBb0tHTnZiWEJ2Ym1WdWRDa2dQVDRnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnNaWFFnY21WMElEMGdlMzFjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRTlpYW1WamRDNXJaWGx6S0dOdmJYQnZibVZ1ZENrdVptOXlSV0ZqYUNoclpYa2dQVDRnY21WMFcydGxlVjBnUFNCamIyMXdiMjVsYm5SYmEyVjVYU2xjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQnlaWFJjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5S1NoamIyMXdiMjVsYm5RcFhHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQmtaV1poZFd4ME9seHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCamIyMXdiMjVsYm5SY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JpQWdJQ0JjYmlBZ0lDQnlaV2RwYzNSbGNrTnZiWEJ2Ym1WdWRDaHJaWGtzSUdOdmJYQnZibVZ1ZENrZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvZEhsd1pXOW1JR3RsZVNBaFBUMGdKM04wY21sdVp5Y2dmSHdnYTJWNUlEMDlQU0FuSnlrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZEdoeWIzY2dWSGx3WlVWeWNtOXlLQ2RyWlhrZ2JYVnpkQ0JpWlNCaElHNXZiaTFsYlhCMGVTQnpkSEpwYm1jdUp5bGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnYVdZZ0tHTnZiWEJ2Ym1WdWRDQTlQVDBnYm5Wc2JDQjhmQ0JqYjIxd2IyNWxiblFnUFQwOUlIVnVaR1ZtYVc1bFpDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHliM2NnVkhsd1pVVnljbTl5S0NkamIyMXdiMjVsYm5RZ1kyRnVibTkwSUdKbElHNTFiR3dnYjNJZ2RXNWtaV1pwYm1Wa0xpY3BYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUhSb2FYTXVZMjl0Y0c5dVpXNTBjeTV6WlhRb2EyVjVMQ0JqYjIxd2IyNWxiblFwWEc1Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUd0bGVWeHVJQ0FnSUgxY2JpQWdJQ0JjYmlBZ0lDQm5aWFJEYjIxd2IyNWxiblJ6S0NrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2RHaHBjeTVqYjIxd2IyNWxiblJ6WEc0Z0lDQWdmVnh1ZlNJc0ltVjRjRzl5ZENCamIyNXpkQ0JUZVhOMFpXMVVlWEJsSUQwZ2UxeHVJQ0FnSUV4dloybGpJQ0E2SURBc1hHNGdJQ0FnVW1WdVpHVnlJRG9nTVN4Y2JpQWdJQ0JKYm1sMElDQWdPaUF5WEc1OVhHNWNibVY0Y0c5eWRDQmtaV1poZFd4MElHTnNZWE56SUZONWMzUmxiVTFoYm1GblpYSWdlMXh1SUNBZ0lHTnZibk4wY25WamRHOXlLQ2tnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMbXh2WjJsalUzbHpkR1Z0Y3lBZ1BTQnVaWGNnVFdGd0tDbGNiaUFnSUNBZ0lDQWdkR2hwY3k1eVpXNWtaWEpUZVhOMFpXMXpJRDBnYm1WM0lFMWhjQ2dwWEc0Z0lDQWdJQ0FnSUhSb2FYTXVhVzVwZEZONWMzUmxiWE1nSUNBOUlHNWxkeUJOWVhBb0tWeHVJQ0FnSUgxY2JpQWdJQ0JjYmlBZ0lDQnlaV2RwYzNSbGNsTjVjM1JsYlNoclpYa3NJSFI1Y0dVc0lHTnZiWEJ2Ym1WdWRITXNJR05oYkd4aVlXTnJLU0I3WEc0Z0lDQWdJQ0FnSUdsbUlDaDBlWEJsYjJZZ2EyVjVJQ0U5UFNBbmMzUnlhVzVuSnlCOGZDQnJaWGtnUFQwOUlDY25LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjBhSEp2ZHlCVWVYQmxSWEp5YjNJb0oydGxlU0J0ZFhOMElHSmxJR0VnYm05dUxXVnRjSFI1SUhOMGNtbHVaeTRuS1Z4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lGeHVJQ0FnSUNBZ0lDQnBaaUFvZEhsd1pTQWhQVDBnVTNsemRHVnRWSGx3WlM1TWIyZHBZeUFtSmlCMGVYQmxJQ0U5UFNCVGVYTjBaVzFVZVhCbExsSmxibVJsY2lBbUppQjBlWEJsSUNFOVBTQlRlWE4wWlcxVWVYQmxMa2x1YVhRcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhSb2NtOTNJRlI1Y0dWRmNuSnZjaWduZEhsd1pTQnRkWE4wSUdKbElHRWdkbUZzYVdRZ1UzbHpkR1Z0Vkhsd1pTNG5LVnh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCcFppQW9JVUZ5Y21GNUxtbHpRWEp5WVhrb1kyOXRjRzl1Wlc1MGN5a3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIUm9jbTkzSUZSNWNHVkZjbkp2Y2lnblkyOXRjRzl1Wlc1MGN5QmhjbWQxYldWdWRDQnRkWE4wSUdKbElHRnVJR0Z5Y21GNUlHOW1JR052YlhCdmJtVnVkSE11SnlsY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdhV1lnS0hSNWNHVnZaaUJqWVd4c1ltRmpheUFoUFQwZ0oyWjFibU4wYVc5dUp5a2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHliM2NnVkhsd1pVVnljbTl5S0NkallXeHNZbUZqYXlCdGRYTjBJR0psSUdFZ1puVnVZM1JwYjI0dUp5bGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnYkdWMElITjVjM1JsYlNBOUlIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdOdmJYQnZibVZ1ZEhNc1hHNGdJQ0FnSUNBZ0lDQWdJQ0JqWVd4c1ltRmphMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCemQybDBZMmdnS0hSNWNHVXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHTmhjMlVnVTNsemRHVnRWSGx3WlM1TWIyZHBZeUE2SUhSb2FYTXViRzluYVdOVGVYTjBaVzF6TG5ObGRDaHJaWGtzSUhONWMzUmxiU2s3SUdKeVpXRnJYRzRnSUNBZ0lDQWdJQ0FnSUNCallYTmxJRk41YzNSbGJWUjVjR1V1VW1WdVpHVnlJRG9nZEdocGN5NXlaVzVrWlhKVGVYTjBaVzF6TG5ObGRDaHJaWGtzSUhONWMzUmxiU2s3SUdKeVpXRnJYRzRnSUNBZ0lDQWdJQ0FnSUNCallYTmxJRk41YzNSbGJWUjVjR1V1U1c1cGRDQTZJSFJvYVhNdWFXNXBkRk41YzNSbGJYTXVjMlYwS0d0bGVTd2djM2x6ZEdWdEtUc2dZbkpsWVd0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlHdGxlVnh1SUNBZ0lIMWNiaUFnSUNCY2JpQWdJQ0J5WlcxdmRtVlRlWE4wWlcwb2EyVjVLU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUIwYUdsekxteHZaMmxqVTNsemRHVnRjeTVrWld4bGRHVW9hMlY1S1NCOGZDQjBhR2x6TG5KbGJtUmxjbE41YzNSbGJYTXVaR1ZzWlhSbEtHdGxlU2tnZkh3Z2RHaHBjeTVwYm1sMFUzbHpkR1Z0Y3k1a1pXeGxkR1VvYTJWNUtWeHVJQ0FnSUgxY2JuMGlMQ0pwYlhCdmNuUWdSVzUwYVhSNVRXRnVZV2RsY2lCbWNtOXRJQ2N1TDJWdWRHbDBlUzF0WVc1aFoyVnlKMXh1WEc1bGVIQnZjblFnWkdWbVlYVnNkQ0JqYkdGemN5QkZkbVZ1ZEVoaGJtUnNaWElnZTF4dUlDQWdJR052Ym5OMGNuVmpkRzl5S0NrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG1WMlpXNTBjeUE5SUc1bGR5Qk5ZWEFvS1Z4dUlDQWdJSDFjYmlBZ0lDQmNiaUFnSUNCbGJYQjBlVkJ5YjIxcGMyVW9LU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJ1WlhjZ1VISnZiV2x6WlNoeVpYTnZiSFpsSUQwK0lIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGMyOXNkbVVvS1Z4dUlDQWdJQ0FnSUNCOUtWeHVJQ0FnSUgxY2JpQWdJQ0JjYmlBZ0lDQndjbTl0YVhObEtHTmhiR3hpWVdOckxDQmpiMjUwWlhoMExDQmhjbWR6TENCMGFXMWxiM1YwS1NCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2gwYVcxbGIzVjBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2JtVjNJRkJ5YjIxcGMyVW9jbVZ6YjJ4MlpTQTlQaUI3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYzJWMFZHbHRaVzkxZENobWRXNWpkR2x2YmlncGUxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J5WlhOdmJIWmxLSFI1Y0dWdlppQmpiMjUwWlhoMElEMDlQU0FnSjI5aWFtVmpkQ2NnUHlCallXeHNZbUZqYXk1allXeHNLR052Ym5SbGVIUXNJQzR1TG1GeVozTXBJRG9nWTJGc2JHSmhZMnN1WVhCd2JIa29ZMjl1ZEdWNGRDd2dMaTR1WVhKbmN5a3BYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmU3dnZEdsdFpXOTFkQ2xjYmlBZ0lDQWdJQ0FnSUNBZ0lIMHBYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJ1WlhjZ1VISnZiV2x6WlNoeVpYTnZiSFpsSUQwK0lIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGMyOXNkbVVvZEhsd1pXOW1JR052Ym5SbGVIUWdQVDA5SUNkdlltcGxZM1FuSUQ4Z1kyRnNiR0poWTJzdVkyRnNiQ2hqYjI1MFpYaDBMQ0F1TGk1aGNtZHpLU0E2SUdOaGJHeGlZV05yTG1Gd2NHeDVLR052Ym5SbGVIUXNJQzR1TG1GeVozTXBLVnh1SUNBZ0lDQWdJQ0I5S1Z4dUlDQWdJSDFjYmlBZ0lDQmNiaUFnSUNCc2FYTjBaVzRvWlhabGJuUXNJR05oYkd4aVlXTnJLU0I3WEc0Z0lDQWdJQ0FnSUdsbUlDaDBlWEJsYjJZZ1pYWmxiblFnSVQwOUlDZHpkSEpwYm1jbklIeDhJSFI1Y0dWdlppQmpZV3hzWW1GamF5QWhQVDBnSjJaMWJtTjBhVzl1SnlrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUdsbUlDZ2hkR2hwY3k1bGRtVnVkSE11YUdGektHVjJaVzUwS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NWxkbVZ1ZEhNdWMyVjBLR1YyWlc1MExDQnVaWGNnVFdGd0tDa3BYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUd4bGRDQmxkbVZ1ZEVsa0lEMGdMVEZjYmlBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUhSb2FYTXVaWFpsYm5SekxtWnZja1ZoWTJnb1pYWmxiblFnUFQ0Z2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnWlhabGJuUkpaQ0E5SUUxaGRHZ3ViV0Y0S0dWMlpXNTBTV1FzSUM0dUxtVjJaVzUwTG10bGVYTW9LU2xjYmlBZ0lDQWdJQ0FnZlNrN1hHNGdJQ0FnSUNBZ0lGeHVJQ0FnSUNBZ0lDQXJLMlYyWlc1MFNXUmNiaUFnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJSFJvYVhNdVpYWmxiblJ6TG1kbGRDaGxkbVZ1ZENrdWMyVjBLR1YyWlc1MFNXUXNJR05oYkd4aVlXTnJLVnh1SUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJR1YyWlc1MFNXUmNiaUFnSUNCOVhHNGdJQ0FnWEc0Z0lDQWdjM1J2Y0V4cGMzUmxiaWhsZG1WdWRFbGtLU0I3WEc0Z0lDQWdJQ0FnSUdadmNpQW9iR1YwSUdWMlpXNTBjeUJ2WmlCMGFHbHpMbVYyWlc1MGN5NTJZV3gxWlhNb0tTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1ptOXlJQ2hzWlhRZ2FXUWdiMllnWlhabGJuUnpMbXRsZVhNb0tTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNocFpDQTlQVDBnWlhabGJuUkpaQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1pYWmxiblJ6TG1SbGJHVjBaU2hsZG1WdWRFbGtLVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJtWVd4elpWeHVJQ0FnSUgxY2JpQWdJQ0JjYmlBZ0lDQjBjbWxuWjJWeUtDa2dlMXh1SUNBZ0lDQWdJQ0JzWlhRZ2MyVnNaaUE5SUhSb2FYTWdhVzV6ZEdGdVkyVnZaaUJGYm5ScGRIbE5ZVzVoWjJWeUlEOGdkR2hwY3k1bGRtVnVkRWhoYm1Sc1pYSWdPaUIwYUdselhHNGdJQ0FnSUNBZ0lGeHVJQ0FnSUNBZ0lDQnNaWFFnWVhKbmN5QTlJRUZ5Y21GNUxtWnliMjBvWVhKbmRXMWxiblJ6S1Z4dUlDQWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ2JHVjBJRnNnWlhabGJuUWdYU0E5SUdGeVozTXVjM0JzYVdObEtEQXNJREVwWEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCcFppQW9kSGx3Wlc5bUlHVjJaVzUwSUNFOVBTQW5jM1J5YVc1bkp5QjhmQ0FoYzJWc1ppNWxkbVZ1ZEhNdWFHRnpLR1YyWlc1MEtTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUhObGJHWXVaVzF3ZEhsUWNtOXRhWE5sS0NsY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdiR1YwSUhCeWIyMXBjMlZ6SUQwZ1cxMWNiaUFnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJR1p2Y2lBb2JHVjBJR05oYkd4aVlXTnJJRzltSUhObGJHWXVaWFpsYm5SekxtZGxkQ2hsZG1WdWRDa3VkbUZzZFdWektDa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIQnliMjFwYzJWekxuQjFjMmdvYzJWc1ppNXdjbTl0YVhObEtHTmhiR3hpWVdOckxDQjBhR2x6TENCaGNtZHpMQ0F4S1NsY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlGQnliMjFwYzJVdVlXeHNLSEJ5YjIxcGMyVnpLVnh1SUNBZ0lIMWNiaUFnSUNCY2JpQWdJQ0IwY21sbloyVnlSR1ZzWVhsbFpDZ3BJSHRjYmlBZ0lDQWdJQ0FnYkdWMElITmxiR1lnUFNCMGFHbHpJR2x1YzNSaGJtTmxiMllnUlc1MGFYUjVUV0Z1WVdkbGNpQS9JSFJvYVhNdVpYWmxiblJJWVc1a2JHVnlJRG9nZEdocGMxeHVJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdiR1YwSUdGeVozTWdQU0JCY25KaGVTNW1jbTl0S0dGeVozVnRaVzUwY3lsY2JpQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lHeGxkQ0JiSUdWMlpXNTBMQ0IwYVcxbGIzVjBJRjBnUFNCaGNtZHpMbk53YkdsalpTZ3dMQ0F5S1Z4dUlDQWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ2FXWWdLSFI1Y0dWdlppQmxkbVZ1ZENBaFBUMGdKM04wY21sdVp5Y2dmSHdnSVU1MWJXSmxjaTVwYzBsdWRHVm5aWElvZEdsdFpXOTFkQ2tnZkh3Z0lYTmxiR1l1WlhabGJuUnpMbWhoY3lobGRtVnVkQ2twSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQnpaV3htTG1WdGNIUjVVSEp2YldselpTZ3BYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUd4bGRDQndjbTl0YVhObGN5QTlJRnRkWEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCbWIzSWdLR3hsZENCallXeHNZbUZqYXlCdlppQnpaV3htTG1WMlpXNTBjeTVuWlhRb1pYWmxiblFwTG5aaGJIVmxjeWdwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J3Y205dGFYTmxjeTV3ZFhOb0tITmxiR1l1Y0hKdmJXbHpaU2hqWVd4c1ltRmpheXdnZEdocGN5d2dZWEpuY3l3Z2RHbHRaVzkxZENrcFhHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQlFjbTl0YVhObExtRnNiQ2h3Y205dGFYTmxjeWxjYmlBZ0lDQjlYRzU5SWl3aWFXMXdiM0owSUVWdWRHbDBlVVpoWTNSdmNua2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHWnliMjBnSnk0dlpXNTBhWFI1TFdaaFkzUnZjbmtuWEc1cGJYQnZjblFnUTI5dGNHOXVaVzUwVFdGdVlXZGxjaUFnSUNBZ0lDQWdJQ0FnSUNBZ1puSnZiU0FuTGk5amIyMXdiMjVsYm5RdGJXRnVZV2RsY2lkY2JtbHRjRzl5ZENCVGVYTjBaVzFOWVc1aFoyVnlMQ0I3SUZONWMzUmxiVlI1Y0dVZ2ZTQm1jbTl0SUNjdUwzTjVjM1JsYlMxdFlXNWhaMlZ5SjF4dWFXMXdiM0owSUVWMlpXNTBTR0Z1Wkd4bGNpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHWnliMjBnSnk0dlpYWmxiblF0YUdGdVpHeGxjaWRjYmx4dVpYaHdiM0owSUdSbFptRjFiSFFnWTJ4aGMzTWdSVzUwYVhSNVRXRnVZV2RsY2lCN1hHNGdJQ0FnWTI5dWMzUnlkV04wYjNJb1kyRndZV05wZEhrZ1BTQXhNREF3S1NCN1hHNGdJQ0FnSUNBZ0lIUm9hWE11WTJGd1lXTnBkSGtnSUNBZ0lDQWdJQ0E5SUdOaGNHRmphWFI1WEc0Z0lDQWdJQ0FnSUhSb2FYTXVZM1Z5Y21WdWRFMWhlRVZ1ZEdsMGVTQTlJQzB4WEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCMGFHbHpMbVZ1ZEdsMGVVWmhZM1J2Y25rZ0lDQWdQU0J1WlhjZ1JXNTBhWFI1Um1GamRHOXllU2dwWEc0Z0lDQWdJQ0FnSUhSb2FYTXVjM2x6ZEdWdFRXRnVZV2RsY2lBZ0lDQTlJRzVsZHlCVGVYTjBaVzFOWVc1aFoyVnlLQ2xjYmlBZ0lDQWdJQ0FnZEdocGN5NWpiMjF3YjI1bGJuUk5ZVzVoWjJWeUlEMGdibVYzSUVOdmJYQnZibVZ1ZEUxaGJtRm5aWElvS1Z4dUlDQWdJQ0FnSUNCMGFHbHpMbVYyWlc1MFNHRnVaR3hsY2lBZ0lDQWdQU0J1WlhjZ1JYWmxiblJJWVc1a2JHVnlLQ2xjYmlBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUhSb2FYTXVaVzUwYVhScFpYTWdQU0JCY25KaGVTNW1jbTl0S0hzZ2JHVnVaM1JvSURvZ2RHaHBjeTVqWVhCaFkybDBlU0I5TENBb0tTQTlQaUFvZXlCamIyMXdiMjVsYm5Sek9pQmJJRjBnZlNrcFhHNGdJQ0FnSUNBZ0lGeHVJQ0FnSUNBZ0lDQjBhR2x6TG1WdWRHbDBlVU52Ym1acFozVnlZWFJwYjI1eklEMGdibVYzSUUxaGNDZ3BYRzRnSUNBZ2ZWeHVJQ0FnSUZ4dUlDQWdJR2x1WTNKbFlYTmxRMkZ3WVdOcGRIa29LU0I3WEc0Z0lDQWdJQ0FnSUd4bGRDQnZiR1JEWVhCaFkybDBlU0E5SUhSb2FYTXVZMkZ3WVdOcGRIbGNiaUFnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJSFJvYVhNdVkyRndZV05wZEhrZ0tqMGdNbHh1SUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnZEdocGN5NWxiblJwZEdsbGN5QTlJRnN1TGk1MGFHbHpMbVZ1ZEdsMGFXVnpMQ0F1TGk1QmNuSmhlUzVtY205dEtIc2diR1Z1WjNSb0lEb2diMnhrUTJGd1lXTnBkSGtnZlN3Z0tDa2dQVDRnS0hzZ1kyOXRjRzl1Wlc1MGN6b2dXeUJkSUgwcEtWMWNibHh1SUNBZ0lDQWdJQ0JtYjNJZ0tHeGxkQ0JwSUQwZ2IyeGtRMkZ3WVdOcGRIazdJR2tnUENCMGFHbHpMbU5oY0dGamFYUjVPeUFySzJrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdadmNpQW9iR1YwSUdOdmJYQnZibVZ1ZENCdlppQjBhR2x6TG1OdmJYQnZibVZ1ZEUxaGJtRm5aWEl1WjJWMFEyOXRjRzl1Wlc1MGN5Z3BMbXRsZVhNb0tTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdVpXNTBhWFJwWlhOYmFWMWJZMjl0Y0c5dVpXNTBYU0E5SUhSb2FYTXVZMjl0Y0c5dVpXNTBUV0Z1WVdkbGNpNXVaWGREYjIxd2IyNWxiblFvWTI5dGNHOXVaVzUwS1Z4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdmVnh1SUNBZ0lGeHVJQ0FnSUc1bGQwVnVkR2wwZVNoamIyMXdiMjVsYm5SektTQjdYRzRnSUNBZ0lDQWdJR2xtSUNnaFFYSnlZWGt1YVhOQmNuSmhlU2hqYjIxd2IyNWxiblJ6S1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZEdoeWIzY2dWSGx3WlVWeWNtOXlLQ2RqYjIxd2IyNWxiblJ6SUdGeVozVnRaVzUwSUcxMWMzUWdZbVVnWVc0Z1lYSnlZWGtnYjJZZ1kyOXRjRzl1Wlc1MGN5NG5LVnh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCc1pYUWdhV1FnUFNBd1hHNGdJQ0FnSUNBZ0lGeHVJQ0FnSUNBZ0lDQm1iM0lnS0RzZ2FXUWdQQ0IwYUdsekxtTmhjR0ZqYVhSNU95QXJLMmxrS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2RHaHBjeTVsYm5ScGRHbGxjMXRwWkYwdVkyOXRjRzl1Wlc1MGN5NXNaVzVuZEdnZ1BUMDlJREFwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCaWNtVmhhMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJRnh1SUNBZ0lDQWdJQ0JwWmlBb2FXUWdQajBnZEdocGN5NWpZWEJoWTJsMGVTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0x5OGdkRzlrYnpvZ1lYVjBieUJwYm1OeVpXRnpaU0JqWVhCaFkybDBlVDljYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCN0lHbGtJRG9nZEdocGN5NWpZWEJoWTJsMGVTd2daVzUwYVhSNUlEb2diblZzYkNCOVhHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJR2xtSUNocFpDQStJSFJvYVhNdVkzVnljbVZ1ZEUxaGVFVnVkR2wwZVNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NWpkWEp5Wlc1MFRXRjRSVzUwYVhSNUlEMGdhV1JjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ2RHaHBjeTVsYm5ScGRHbGxjMXRwWkYwdVkyOXRjRzl1Wlc1MGN5QTlJR052YlhCdmJtVnVkSE5jYmlBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUI3SUdsa0xDQmxiblJwZEhrZ09pQjBhR2x6TG1WdWRHbDBhV1Z6VzJsa1hTQjlYRzRnSUNBZ2ZWeHVJQ0FnSUZ4dUlDQWdJR1JsYkdWMFpVVnVkR2wwZVNocFpDa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxtVnVkR2wwYVdWelcybGtYUzVqYjIxd2IyNWxiblJ6SUQwZ1cxMWNiaUFnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJR2xtSUNocFpDQThJSFJvYVhNdVkzVnljbVZ1ZEUxaGVFVnVkR2wwZVNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUdadmNpQW9iR1YwSUdrZ1BTQnBaRHNnYVNBK1BTQXdPeUF0TFdrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaDBhR2x6TG1WdWRHbDBhV1Z6VzJsZExtTnZiWEJ2Ym1WdWRITXViR1Z1WjNSb0lDRTlQU0F3S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTVqZFhKeVpXNTBUV0Y0Ulc1MGFYUjVJRDBnYVZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnlibHh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnZEdocGN5NWpkWEp5Wlc1MFRXRjRSVzUwYVhSNUlEMGdNRnh1SUNBZ0lIMWNibHh1SUNBZ0lDcG5aWFJGYm5ScGRHbGxjeWhqYjIxd2IyNWxiblJ6SUQwZ2JuVnNiQ2tnZTF4dUlDQWdJQ0FnSUNCbWIzSWdLR3hsZENCcFpDQTlJREE3SUdsa0lEdzlJSFJvYVhNdVkzVnljbVZ1ZEUxaGVFVnVkR2wwZVRzZ0t5dHBaQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0dOdmJYQnZibVZ1ZEhNZ1BUMDlJRzUxYkd3Z2ZId2dZMjl0Y0c5dVpXNTBjeTVsZG1WeWVTaGpiMjF3YjI1bGJuUWdQVDRnZEdocGN5NWxiblJwZEdsbGMxdHBaRjB1WTI5dGNHOXVaVzUwY3k1cGJtUmxlRTltS0dOdmJYQnZibVZ1ZENrZ0lUMDlJQzB4S1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIbHBaV3hrSUhzZ2FXUXNJR1Z1ZEdsMGVTQTZJSFJvYVhNdVpXNTBhWFJwWlhOYmFXUmRJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lIMWNiaUFnSUNCY2JpQWdJQ0J5WldkcGMzUmxja052Ym1acFozVnlZWFJwYjI0b2EyVjVLU0I3WEc0Z0lDQWdJQ0FnSUdsbUlDaDBlWEJsYjJZZ2EyVjVJQ0U5UFNBbmMzUnlhVzVuSnlCOGZDQnJaWGtnUFQwOUlDY25LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjBhSEp2ZHlCVWVYQmxSWEp5YjNJb0oydGxlU0J0ZFhOMElHSmxJR0VnYm05dUlHVnRjSFI1SUhOMGNtbHVaeTRuS1Z4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lGeHVJQ0FnSUNBZ0lDQjBhR2x6TG1WdWRHbDBlVU52Ym1acFozVnlZWFJwYjI1ekxuTmxkQ2hyWlhrc0lIUm9hWE11Wlc1MGFYUjVSbUZqZEc5eWVTNWpjbVZoZEdWRGIyNW1hV2QxY21GMGFXOXVLQ2twWEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnYTJWNVhHNGdJQ0FnZlZ4dUlDQWdJRnh1SUNBZ0lDOHZJRU52YlhCdmJtVnVkQ0JOWVc1aFoyVnlYRzRnSUNBZ1hHNGdJQ0FnY21WbmFYTjBaWEpEYjIxd2IyNWxiblFvYTJWNUxDQmpiMjF3YjI1bGJuUXBJSHRjYmlBZ0lDQWdJQ0FnZEdocGN5NWpiMjF3YjI1bGJuUk5ZVzVoWjJWeUxuSmxaMmx6ZEdWeVEyOXRjRzl1Wlc1MEtHdGxlU3dnWTI5dGNHOXVaVzUwS1Z4dUlDQWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ1ptOXlJQ2hzWlhRZ1pXNTBhWFI1SUc5bUlIUm9hWE11Wlc1MGFYUnBaWE1wSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR1Z1ZEdsMGVWdHJaWGxkSUQwZ2RHaHBjeTVqYjIxd2IyNWxiblJOWVc1aFoyVnlMbTVsZDBOdmJYQnZibVZ1ZENoclpYa3BYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUd4bGRDQnBibWwwYVdGc2FYcGxjbHh1WEc0Z0lDQWdJQ0FnSUhOM2FYUmphQ0FvZEhsd1pXOW1JR052YlhCdmJtVnVkQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdZMkZ6WlNBblpuVnVZM1JwYjI0bk9pQnBibWwwYVdGc2FYcGxjaUE5SUdOdmJYQnZibVZ1ZERzZ1luSmxZV3RjYmlBZ0lDQWdJQ0FnSUNBZ0lHTmhjMlVnSjI5aWFtVmpkQ2M2SUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcGJtbDBhV0ZzYVhwbGNpQTlJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQm1iM0lnS0d4bGRDQnJaWGtnYjJZZ1QySnFaV04wTG10bGVYTW9ZMjl0Y0c5dVpXNTBLU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZEdocGMxdHJaWGxkSUQwZ1kyOXRjRzl1Wlc1MFcydGxlVjFjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdKeVpXRnJYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdJQ0JrWldaaGRXeDBPaUJwYm1sMGFXRnNhWHBsY2lBOUlHWjFibU4wYVc5dUtDa2dleUJ5WlhSMWNtNGdZMjl0Y0c5dVpXNTBJSDA3SUdKeVpXRnJYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUhSb2FYTXVaVzUwYVhSNVJtRmpkRzl5ZVM1eVpXZHBjM1JsY2tsdWFYUnBZV3hwZW1WeUtHdGxlU3dnYVc1cGRHbGhiR2w2WlhJcFhHNGdJQ0FnSUNBZ0lGeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2EyVjVYRzRnSUNBZ2ZWeHVJQ0FnSUZ4dUlDQWdJR0ZrWkVOdmJYQnZibVZ1ZENocFpDd2dZMjl0Y0c5dVpXNTBTMlY1S1NCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2gwYUdsekxtVnVkR2wwYVdWelcybGtYUzVqYjIxd2IyNWxiblJ6TG1sdVpHVjRUMllvWTI5dGNHOXVaVzUwUzJWNUtTQWhQVDBnTFRFcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnlibHh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCMGFHbHpMbVZ1ZEdsMGFXVnpXMmxrWFM1amIyMXdiMjVsYm5SekxuQjFjMmdvWTI5dGNHOXVaVzUwUzJWNUtWeHVJQ0FnSUgxY2JpQWdJQ0JjYmlBZ0lDQnlaVzF2ZG1WRGIyMXdiMjVsYm5Rb2FXUXNJR052YlhCdmJtVnVkQ2tnZTF4dUlDQWdJQ0FnSUNCc1pYUWdhVzVrWlhnZ1BTQjBhR2x6TG1WdWRHbDBhV1Z6VzJsa1hTNWpiMjF3YjI1bGJuUnpMbWx1WkdWNFQyWW9ZMjl0Y0c5dVpXNTBLVnh1SUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnYVdZZ0tHbHVaR1Y0SUQwOVBTQXRNU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdVhHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJSFJvYVhNdVpXNTBhWFJwWlhOYmFXUmRMbU52YlhCdmJtVnVkSE11YzNCc2FXTmxLR2x1WkdWNExDQXhLVnh1SUNBZ0lIMWNiaUFnSUNCY2JpQWdJQ0F2THlCVGVYTjBaVzBnVFdGdVlXZGxjbHh1SUNBZ0lGeHVJQ0FnSUhKbFoybHpkR1Z5VTNsemRHVnRLR3RsZVN3Z2RIbHdaU3dnWTI5dGNHOXVaVzUwY3l3Z1kyRnNiR0poWTJzcElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIUm9hWE11YzNsemRHVnRUV0Z1WVdkbGNpNXlaV2RwYzNSbGNsTjVjM1JsYlNoclpYa3NJSFI1Y0dVc0lHTnZiWEJ2Ym1WdWRITXNJR05oYkd4aVlXTnJLVnh1SUNBZ0lIMWNiaUFnSUNCY2JpQWdJQ0J5WldkcGMzUmxja3h2WjJsalUzbHpkR1Z0S0d0bGVTd2dZMjl0Y0c5dVpXNTBjeXdnWTJGc2JHSmhZMnNwSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSb2FYTXVjM2x6ZEdWdFRXRnVZV2RsY2k1eVpXZHBjM1JsY2xONWMzUmxiU2hyWlhrc0lGTjVjM1JsYlZSNWNHVXVURzluYVdNc0lHTnZiWEJ2Ym1WdWRITXNJR05oYkd4aVlXTnJLVnh1SUNBZ0lIMWNiaUFnSUNCY2JpQWdJQ0J5WldkcGMzUmxjbEpsYm1SbGNsTjVjM1JsYlNoclpYa3NJR052YlhCdmJtVnVkSE1zSUdOaGJHeGlZV05yS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCMGFHbHpMbk41YzNSbGJVMWhibUZuWlhJdWNtVm5hWE4wWlhKVGVYTjBaVzBvYTJWNUxDQlRlWE4wWlcxVWVYQmxMbEpsYm1SbGNpd2dZMjl0Y0c5dVpXNTBjeXdnWTJGc2JHSmhZMnNwWEc0Z0lDQWdmVnh1SUNBZ0lGeHVJQ0FnSUhKbFoybHpkR1Z5U1c1cGRGTjVjM1JsYlNoclpYa3NJR052YlhCdmJtVnVkSE1zSUdOaGJHeGlZV05yS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCMGFHbHpMbk41YzNSbGJVMWhibUZuWlhJdWNtVm5hWE4wWlhKVGVYTjBaVzBvYTJWNUxDQlRlWE4wWlcxVWVYQmxMa2x1YVhRc0lHTnZiWEJ2Ym1WdWRITXNJR05oYkd4aVlXTnJLVnh1SUNBZ0lIMWNiaUFnSUNCY2JpQWdJQ0J5WlcxdmRtVlRlWE4wWlcwb2EyVjVLU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUIwYUdsekxuTjVjM1JsYlUxaGJtRm5aWEl1Y21WdGIzWmxVM2x6ZEdWdEtHdGxlU2xjYmlBZ0lDQjlYRzRnSUNBZ1hHNGdJQ0FnYjI1TWIyZHBZeWh2Y0hSektTQjdYRzRnSUNBZ0lDQWdJR1p2Y2lBb2JHVjBJSE41YzNSbGJTQnZaaUIwYUdsekxuTjVjM1JsYlUxaGJtRm5aWEl1Ykc5bmFXTlRlWE4wWlcxekxuWmhiSFZsY3lncEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCemVYTjBaVzB1WTJGc2JHSmhZMnN1WTJGc2JDaDBhR2x6TENCMGFHbHpMbWRsZEVWdWRHbDBhV1Z6S0hONWMzUmxiUzVqYjIxd2IyNWxiblJ6S1N3Z2IzQjBjeWxjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ0lDQmNiaUFnSUNCdmJsSmxibVJsY2lodmNIUnpLU0I3WEc0Z0lDQWdJQ0FnSUdadmNpQW9iR1YwSUhONWMzUmxiU0J2WmlCMGFHbHpMbk41YzNSbGJVMWhibUZuWlhJdWNtVnVaR1Z5VTNsemRHVnRjeTUyWVd4MVpYTW9LU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjM2x6ZEdWdExtTmhiR3hpWVdOckxtTmhiR3dvZEdocGN5d2dkR2hwY3k1blpYUkZiblJwZEdsbGN5aHplWE4wWlcwdVkyOXRjRzl1Wlc1MGN5a3NJRzl3ZEhNcFhHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNCOVhHNWNiaUFnSUNCdmJrbHVhWFFvYjNCMGN5a2dlMXh1SUNBZ0lDQWdJQ0JtYjNJZ0tHeGxkQ0J6ZVhOMFpXMGdiMllnZEdocGN5NXplWE4wWlcxTllXNWhaMlZ5TG1sdWFYUlRlWE4wWlcxekxuWmhiSFZsY3lncEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCemVYTjBaVzB1WTJGc2JHSmhZMnN1WTJGc2JDaDBhR2x6TENCMGFHbHpMbWRsZEVWdWRHbDBhV1Z6S0hONWMzUmxiUzVqYjIxd2IyNWxiblJ6S1N3Z2IzQjBjeWxjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ0lDQmNiaUFnSUNBdkx5QkZiblJwZEhrZ1JtRmpkRzl5ZVZ4dUlDQWdJRnh1SUNBZ0lISmxaMmx6ZEdWeVNXNXBkR2xoYkdsNlpYSW9ZMjl0Y0c5dVpXNTBTV1FzSUdsdWFYUnBZV3hwZW1WeUtTQjdYRzRnSUNBZ0lDQWdJSFJvYVhNdVpXNTBhWFI1Um1GamRHOXllUzV5WldkcGMzUmxja2x1YVhScFlXeHBlbVZ5S0dOdmJYQnZibVZ1ZEVsa0xDQnBibWwwYVdGc2FYcGxjaWxjYmlBZ0lDQjlYRzRnSUNBZ1hHNGdJQ0FnWW5WcGJHUW9LU0I3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVaVzUwYVhSNVJtRmpkRzl5ZVM1aWRXbHNaQ2dwWEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnZEdocGMxeHVJQ0FnSUgxY2JpQWdJQ0JjYmlBZ0lDQjNhWFJvUTI5dGNHOXVaVzUwS0dOdmJYQnZibVZ1ZEVsa0xDQnBibWwwYVdGc2FYcGxjaWtnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMbVZ1ZEdsMGVVWmhZM1J2Y25rdWQybDBhRU52YlhCdmJtVnVkQ2hqYjIxd2IyNWxiblJKWkN3Z2FXNXBkR2xoYkdsNlpYSXBYRzRnSUNBZ0lDQWdJRnh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdkR2hwYzF4dUlDQWdJSDFjYmlBZ0lDQmNiaUFnSUNCamNtVmhkR1VvWTI5MWJuUXNJR3RsZVNrZ2UxeHVJQ0FnSUNBZ0lDQnNaWFFnWTI5dVptbG5kWEpoZEdsdmJpQTlJSFZ1WkdWbWFXNWxaRnh1SUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnYVdZZ0tIUjVjR1Z2WmlCclpYa2dQVDA5SUNkemRISnBibWNuS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JqYjI1bWFXZDFjbUYwYVc5dUlEMGdkR2hwY3k1bGJuUnBkSGxEYjI1bWFXZDFjbUYwYVc5dWN5NW5aWFFvYTJWNUtWeHVJQ0FnSUNBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvWTI5dVptbG5kWEpoZEdsdmJpQTlQVDBnZFc1a1pXWnBibVZrS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RHaHliM2NnVkhsd1pVVnljbTl5S0NkamIzVnNaQ0J1YjNRZ1ptbHVaQ0JsYm5ScGRIa2dZMjl1Wm1sbmRYSmhkR2x2YmlCbWIzSWdkR2hsSUhOMWNIQnNhV1ZrSUd0bGVTNGdhV1lnZVc5MUlIZHBjMmdnZEc4Z1kzSmxZWFJsSUdGdUlHVnVkR2wwZVNCM2FYUm9iM1YwSUdFZ1kyOXVabWxuZFhKaGRHbHZiaXdnWkc4Z2JtOTBJSEJoYzNNZ1lTQnJaWGt1SnlsY2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSb2FYTXVaVzUwYVhSNVJtRmpkRzl5ZVM1amNtVmhkR1VvZEdocGN5d2dZMjkxYm5Rc0lHTnZibVpwWjNWeVlYUnBiMjRwWEc0Z0lDQWdmVnh1SUNBZ0lGeHVJQ0FnSUM4dklFVjJaVzUwSUVoaGJtUnNaWEpjYmlBZ0lDQmNiaUFnSUNCc2FYTjBaVzRvWlhabGJuUXNJR05oYkd4aVlXTnJLU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUIwYUdsekxtVjJaVzUwU0dGdVpHeGxjaTVzYVhOMFpXNG9aWFpsYm5Rc0lHTmhiR3hpWVdOcktWeHVJQ0FnSUgxY2JpQWdJQ0JjYmlBZ0lDQnpkRzl3VEdsemRHVnVLR1YyWlc1MFNXUXBJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSFJvYVhNdVpYWmxiblJJWVc1a2JHVnlMbk4wYjNCTWFYTjBaVzRvWlhabGJuUkpaQ2xjYmlBZ0lDQjlYRzRnSUNBZ1hHNGdJQ0FnZEhKcFoyZGxjaWdwSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSb2FYTXVaWFpsYm5SSVlXNWtiR1Z5TG5SeWFXZG5aWEl1WTJGc2JDaDBhR2x6TENBdUxpNWhjbWQxYldWdWRITXBYRzRnSUNBZ2ZWeHVJQ0FnSUZ4dUlDQWdJSFJ5YVdkblpYSkVaV3hoZVdWa0tDa2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdkR2hwY3k1bGRtVnVkRWhoYm1Sc1pYSXVkSEpwWjJkbGNrUmxiR0Y1WldRdVkyRnNiQ2gwYUdsekxDQXVMaTVoY21kMWJXVnVkSE1wWEc0Z0lDQWdmVnh1ZlNKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pT3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdVVUZGY1VJN1FVRkRha0lzU1VGQlFTeGhRVVJwUWl4aFFVTnFRaXhIUVVGak96aERRVVJITEdWQlEwZzdPMEZCUTFZc1NVRkJRU3hoUVVGTExGbEJRVXdzUjBGQmNVSXNTVUZCU1N4SFFVRktMRVZCUVhKQ0xFTkJSRlU3UVVGRlZpeEpRVUZCTEdGQlFVc3NZVUZCVEN4SFFVRnhRaXhKUVVGSkxFZEJRVW9zUlVGQmNrSXNRMEZHVlR0VFFVRmtPenRwUTBGRWFVSTdPMmRFUVUxSExFdEJRVXNzWVVGQllUdEJRVU5zUXl4SlFVRkJMR2RDUVVGSkxFOUJRVThzUjBGQlVDeExRVUZsTEZGQlFXWXNTVUZCTWtJc1VVRkJVU3hGUVVGU0xFVkJRVms3UVVGRGRrTXNTVUZCUVN4elFrRkJUU3hWUVVGVkxHbERRVUZXTEVOQlFVNHNRMEZFZFVNN2FVSkJRVE5ET3p0QlFVbEJMRWxCUVVFc1owSkJRVWtzVDBGQlR5eFhRVUZRTEV0QlFYVkNMRlZCUVhaQ0xFVkJRVzFETzBGQlEyNURMRWxCUVVFc2MwSkJRVTBzVlVGQlZTeHBRMEZCVml4RFFVRk9MRU5CUkcxRE8ybENRVUYyUXpzN1FVRkpRU3hKUVVGQkxHbENRVUZMTEZsQlFVd3NRMEZCYTBJc1IwRkJiRUlzUTBGQmMwSXNSMEZCZEVJc1JVRkJNa0lzVjBGQk0wSXNSVUZVYTBNN096czdiME5CV1RsQ08wRkJRMG9zU1VGQlFTeHBRa0ZCU3l4aFFVRk1MRWRCUVhGQ0xFbEJRVWtzUjBGQlNpeEZRVUZ5UWl4RFFVUkpPenRCUVVkS0xFbEJRVUVzYlVKQlFVOHNTVUZCVUN4RFFVaEpPenM3T3pCRFFVMU5MRXRCUVVzc1lVRkJZVHRCUVVNMVFpeEpRVUZCTEdkQ1FVRkpMRTlCUVU4c1IwRkJVQ3hMUVVGbExGRkJRV1lzU1VGQk1rSXNVVUZCVVN4RlFVRlNMRVZCUVZrN1FVRkRka01zU1VGQlFTeDFRa0ZCVHl4SlFVRlFMRU5CUkhWRE8ybENRVUV6UXpzN1FVRkpRU3hKUVVGQkxHZENRVUZKTEU5QlFVOHNWMEZCVUN4TFFVRjFRaXhWUVVGMlFpeEZRVUZ0UXp0QlFVTnVReXhKUVVGQkxEaENRVUZqTEV0QlFVc3NXVUZCVEN4RFFVRnJRaXhIUVVGc1FpeERRVUZ6UWl4SFFVRjBRaXhEUVVGa0xFTkJSRzFETzJsQ1FVRjJRenM3UVVGSlFTeEpRVUZCTEdsQ1FVRkxMR0ZCUVV3c1EwRkJiVUlzUjBGQmJrSXNRMEZCZFVJc1IwRkJka0lzUlVGQk5FSXNWMEZCTlVJc1JVRlVORUk3TzBGQlZ6VkNMRWxCUVVFc2JVSkJRVThzU1VGQlVDeERRVmcwUWpzN096dHJSRUZqVmp0QlFVTnNRaXhKUVVGQkxHMUNRVUZQTEV0QlFVc3NZVUZCVEN4RFFVUlhPenM3TzIxRFFVbG1MR1ZCUVhGRU8yOUNRVUYwUXl3NFJFRkJVU3hwUWtGQk9FSTdiMEpCUVROQ0xITkZRVUZuUWl4NVFrRkJWenM3UVVGRGVFUXNTVUZCUVN4blFrRkJTU3hGUVVGRkxIbENRVUY1UWl4aFFVRjZRaXhEUVVGR0xFVkJRVEpETzBGQlF6TkRMRWxCUVVFc2RVSkJRVThzUlVGQlVDeERRVVF5UXp0cFFrRkJMME03TzBGQlNVRXNTVUZCUVN3MFFrRkJaMElzYVVKQlFXbENMRXRCUVVzc1lVRkJUQ3hEUVV4MVFqczdRVUZQZUVRc1NVRkJRU3huUWtGQlNTeGhRVUZoTEVWQlFXSXNRMEZRYjBRN096czdPenM3UVVGVGVFUXNTVUZCUVN4eFEwRkJjMElzWTBGQll5eEpRVUZrTERSQ1FVRjBRaXh2UjBGQk5FTTdORUpCUVc1RExIZENRVUZ0UXpzN1FVRkRlRU1zU1VGQlFTd3JRa0ZCVnl4SlFVRllMRU5CUVdkQ0xGTkJRV2hDTEVWQlJIZERPM0ZDUVVFMVF6czdPenM3T3pzN096czdPenM3YVVKQlZIZEVPenRCUVdGNFJDeEpRVUZCTEdkQ1FVRkpMRmRCUVZjc1JVRkJXQ3hEUVdKdlJEczdRVUZsZUVRc1NVRkJRU3hwUWtGQlN5eEpRVUZKTEVsQlFVa3NRMEZCU2l4RlFVRlBMRWxCUVVrc1MwRkJTaXhGUVVGWExFVkJRVVVzUTBGQlJpeEZRVUZMTzJkRVFVTlFMR05CUVdNc1UwRkJaQ3hEUVVGM1FpeFZRVUY0UWl4RlFVUlBPenQzUWtGRGRFSXNPRUpCUkhOQ08zZENRVU5zUWl4elEwRkVhMEk3T3p0QlFVYzFRaXhKUVVGQkxHOUNRVUZKTEUxQlFVMHNZMEZCWXl4UlFVRmtMRVZCUVhkQ08wRkJRemxDTEVsQlFVRXNNRUpCUkRoQ08zRkNRVUZzUXpzN01FUkJTRFJDT3pzN096dEJRVTgxUWl4SlFVRkJMREJEUVVGeFF5eDNRMEZCY2tNc2QwZEJRVzlFT3pzN1owTkJRVEZETERSQ1FVRXdRenRuUTBGQkwwSXNPRUpCUVN0Q096dEJRVU5vUkN4SlFVRkJMRFJDUVVGSkxFOUJRVThzVjBGQlVDeExRVUYxUWl4VlFVRjJRaXhGUVVGdFF6dEJRVU51UXl4SlFVRkJMSEZEUVVSdFF6czJRa0ZCZGtNN08wRkJTVUVzU1VGQlFTdzBRa0ZCU1N4VFFVRlRMRmxCUVZrc1NVRkJXaXhEUVVGcFFpeFBRVUZQTEZOQlFWQXNRMEZCYWtJc1EwRkJWQ3hEUVV3MFF6czdRVUZQYUVRc1NVRkJRU3cwUWtGQlNTeHZRa0ZCVHl4UFFVRlBMRk5CUVZBc1JVRkJVQ3hMUVVFMlFpeFJRVUUzUWl4SlFVRjVReXhYUVVGWExGTkJRVmdzUlVGQmMwSTdRVUZETDBRc1NVRkJRU3h0UTBGQlR5eFRRVUZRTEVsQlFXOUNMRTFCUVhCQ0xFTkJSQ3RFT3paQ1FVRnVSVHQ1UWtGUVNqczdPenM3T3pzN096czdPenM3Y1VKQlVEUkNPenRCUVcxQ05VSXNTVUZCUVN4NVFrRkJVeXhKUVVGVUxFTkJRV01zUlVGQlJTeE5RVUZHTEVWQlFVMHNZMEZCVGl4RlFVRmtMRVZCYmtJMFFqdHBRa0ZCYUVNN08wRkJjMEpCTEVsQlFVRXNiVUpCUVU4c1UwRkJVeXhOUVVGVUxFdEJRVzlDTEVOQlFYQkNMRWRCUVhkQ0xGTkJRVk1zUTBGQlZDeERRVUY0UWl4SFFVRnpReXhSUVVGMFF5eERRWEpEYVVRN096dGxRVEZETTBNN096dFJRMFpCTzBGQlEycENMRWxCUVVFc1lVRkVhVUlzWjBKQlEycENMRWRCUVdNN09FTkJSRWNzYTBKQlEwZzdPMEZCUTFZc1NVRkJRU3hoUVVGTExGVkJRVXdzUjBGQmEwSXNTVUZCU1N4SFFVRktMRVZCUVd4Q0xFTkJSRlU3VTBGQlpEczdhVU5CUkdsQ096dDVRMEZMU2l4TFFVRkxPMEZCUTJRc1NVRkJRU3huUWtGQlNTeFpRVUZaTEV0QlFVc3NWVUZCVEN4RFFVRm5RaXhIUVVGb1FpeERRVUZ2UWl4SFFVRndRaXhEUVVGYUxFTkJSRlU3TzBGQlIyUXNTVUZCUVN4blFrRkJTU3hoUVVGaExFbEJRV0lzUlVGQmJVSTdRVUZEYmtJc1NVRkJRU3gxUWtGQlR5eEpRVUZRTEVOQlJHMUNPMmxDUVVGMlFqczdRVUZKUVN4SlFVRkJMREpDUVVGbExIZEZRVUZtTzBGQlEwa3NTVUZCUVN4eFFrRkJTeXhWUVVGTU8wRkJRMGtzU1VGQlFTd3lRa0ZCVHl4SlFVRkpMRk5CUVVvc1JVRkJVQ3hEUVVSS08wRkJSRW9zU1VGQlFTeHhRa0ZIVXl4UlFVRk1PMEZCUVdsQ0xFbEJRVUU3UVVGRFlpeEpRVUZCTEN0Q1FVRlBMRlZCUVVVc1UwRkJSQ3hGUVVGbE8wRkJRMjVDTEVsQlFVRXNaME5CUVVrc1RVRkJUU3hGUVVGT0xFTkJSR1U3TzBGQlIyNUNMRWxCUVVFc2JVTkJRVThzU1VGQlVDeERRVUZaTEZOQlFWb3NSVUZCZFVJc1QwRkJka0lzUTBGQkswSTdNa05CUVU4c1NVRkJTU3hIUVVGS0xFbEJRVmNzVlVGQlZTeEhRVUZXTEVOQlFWZzdhVU5CUVZBc1EwRkJMMElzUTBGSWJVSTdPMEZCUzI1Q0xFbEJRVUVzYlVOQlFVOHNSMEZCVUN4RFFVeHRRanMyUWtGQlppeERRVTFNTEZOQlRra3NRMEZCVUN4RFFVUmhPM2xDUVVGcVFqdEJRVWhLTEVsQlFVRTdRVUZoVVN4SlFVRkJMREpDUVVGUExGTkJRVkFzUTBGRVNqdEJRVnBLTEVsQlFVRXNZVUZRWXpzN096czRRMEYzUWtFc1MwRkJTeXhYUVVGWE8wRkJRemxDTEVsQlFVRXNaMEpCUVVrc1QwRkJUeXhIUVVGUUxFdEJRV1VzVVVGQlppeEpRVUV5UWl4UlFVRlJMRVZCUVZJc1JVRkJXVHRCUVVOMlF5eEpRVUZCTEhOQ1FVRk5MRlZCUVZVc2FVTkJRVllzUTBGQlRpeERRVVIxUXp0cFFrRkJNME03TzBGQlNVRXNTVUZCUVN4blFrRkJTU3hqUVVGakxFbEJRV1FzU1VGQmMwSXNZMEZCWXl4VFFVRmtMRVZCUVhsQ08wRkJReTlETEVsQlFVRXNjMEpCUVUwc1ZVRkJWU3gzUTBGQlZpeERRVUZPTEVOQlJDdERPMmxDUVVGdVJEczdRVUZKUVN4SlFVRkJMR2xDUVVGTExGVkJRVXdzUTBGQlowSXNSMEZCYUVJc1EwRkJiMElzUjBGQmNFSXNSVUZCZVVJc1UwRkJla0lzUlVGVU9FSTdPMEZCVnpsQ0xFbEJRVUVzYlVKQlFVOHNSMEZCVUN4RFFWZzRRanM3T3pzMFEwRmpiRUk3UVVGRFdpeEpRVUZCTEcxQ1FVRlBMRXRCUVVzc1ZVRkJUQ3hEUVVSTE96czdaVUV6UTBNN096dEpRMEZrTEVsQlFVMHNZVUZCWVR0QlFVTjBRaXhKUVVGQkxGZEJRVk1zUTBGQlZEdEJRVU5CTEVsQlFVRXNXVUZCVXl4RFFVRlVPMEZCUTBFc1NVRkJRU3hWUVVGVExFTkJRVlE3UzBGSVV5eERRVUZpT3p0UlFVMXhRanRCUVVOcVFpeEpRVUZCTEdGQlJHbENMR0ZCUTJwQ0xFZEJRV003T0VOQlJFY3NaVUZEU0RzN1FVRkRWaXhKUVVGQkxHRkJRVXNzV1VGQlRDeEhRVUZ4UWl4SlFVRkpMRWRCUVVvc1JVRkJja0lzUTBGRVZUdEJRVVZXTEVsQlFVRXNZVUZCU3l4aFFVRk1MRWRCUVhGQ0xFbEJRVWtzUjBGQlNpeEZRVUZ5UWl4RFFVWlZPMEZCUjFZc1NVRkJRU3hoUVVGTExGZEJRVXdzUjBGQmNVSXNTVUZCU1N4SFFVRktMRVZCUVhKQ0xFTkJTRlU3VTBGQlpEczdhVU5CUkdsQ096c3lRMEZQUml4TFFVRkxMRTFCUVUwc1dVRkJXU3hWUVVGVk8wRkJRelZETEVsQlFVRXNaMEpCUVVrc1QwRkJUeXhIUVVGUUxFdEJRV1VzVVVGQlppeEpRVUV5UWl4UlFVRlJMRVZCUVZJc1JVRkJXVHRCUVVOMlF5eEpRVUZCTEhOQ1FVRk5MRlZCUVZVc2FVTkJRVllzUTBGQlRpeERRVVIxUXp0cFFrRkJNME03TzBGQlNVRXNTVUZCUVN4blFrRkJTU3hUUVVGVExGZEJRVmNzUzBGQldDeEpRVUZ2UWl4VFFVRlRMRmRCUVZjc1RVRkJXQ3hKUVVGeFFpeFRRVUZUTEZkQlFWY3NTVUZCV0N4RlFVRnBRanRCUVVOeVJpeEpRVUZCTEhOQ1FVRk5MRlZCUVZVc2EwTkJRVllzUTBGQlRpeERRVVJ4Ump0cFFrRkJla1k3TzBGQlNVRXNTVUZCUVN4blFrRkJTU3hEUVVGRExFMUJRVTBzVDBGQlRpeERRVUZqTEZWQlFXUXNRMEZCUkN4RlFVRTBRanRCUVVNMVFpeEpRVUZCTEhOQ1FVRk5MRlZCUVZVc2NVUkJRVllzUTBGQlRpeERRVVEwUWp0cFFrRkJhRU03TzBGQlNVRXNTVUZCUVN4blFrRkJTU3hQUVVGUExGRkJRVkFzUzBGQmIwSXNWVUZCY0VJc1JVRkJaME03UVVGRGFFTXNTVUZCUVN4elFrRkJUU3hWUVVGVkxEaENRVUZXTEVOQlFVNHNRMEZFWjBNN2FVSkJRWEJET3p0QlFVbEJMRWxCUVVFc1owSkJRVWtzVTBGQlV6dEJRVU5VTEVsQlFVRXNjME5CUkZNN1FVRkZWQ3hKUVVGQkxHdERRVVpUTzJsQ1FVRlVMRU5CYWtKM1F6czdRVUZ6UWpWRExFbEJRVUVzYjBKQlFWRXNTVUZCVWp0QlFVTkpMRWxCUVVFc2NVSkJRVXNzVjBGQlZ5eExRVUZZTzBGQlFXMUNMRWxCUVVFc2VVSkJRVXNzV1VGQlRDeERRVUZyUWl4SFFVRnNRaXhEUVVGelFpeEhRVUYwUWl4RlFVRXlRaXhOUVVFelFpeEZRVUY0UWp0QlFVUktMRWxCUVVFc2NVSkJSVk1zVjBGQlZ5eE5RVUZZTzBGQlFXOUNMRWxCUVVFc2VVSkJRVXNzWVVGQlRDeERRVUZ0UWl4SFFVRnVRaXhEUVVGMVFpeEhRVUYyUWl4RlFVRTBRaXhOUVVFMVFpeEZRVUY2UWp0QlFVWktMRWxCUVVFc2NVSkJSMU1zVjBGQlZ5eEpRVUZZTzBGQlFXdENMRWxCUVVFc2VVSkJRVXNzVjBGQlRDeERRVUZwUWl4SFFVRnFRaXhEUVVGeFFpeEhRVUZ5UWl4RlFVRXdRaXhOUVVFeFFpeEZRVUYyUWp0QlFVaEtMRWxCUVVFc1lVRjBRalJET3p0QlFUUkNOVU1zU1VGQlFTeHRRa0ZCVHl4SFFVRlFMRU5CTlVJMFF6czdPenQ1UTBFclFtNURMRXRCUVVzN1FVRkRaQ3hKUVVGQkxHMUNRVUZQTEV0QlFVc3NXVUZCVEN4RFFVRnJRaXhOUVVGc1FpeERRVUY1UWl4SFFVRjZRaXhMUVVGcFF5eExRVUZMTEdGQlFVd3NRMEZCYlVJc1RVRkJia0lzUTBGQk1FSXNSMEZCTVVJc1EwRkJha01zU1VGQmJVVXNTMEZCU3l4WFFVRk1MRU5CUVdsQ0xFMUJRV3BDTEVOQlFYZENMRWRCUVhoQ0xFTkJRVzVGTEVOQlJFODdPenRsUVhSRFJEczdPMUZEU2tFN1FVRkRha0lzU1VGQlFTeGhRVVJwUWl4WlFVTnFRaXhIUVVGak96aERRVVJITEdOQlEwZzdPMEZCUTFZc1NVRkJRU3hoUVVGTExFMUJRVXdzUjBGQll5eEpRVUZKTEVkQlFVb3NSVUZCWkN4RFFVUlZPMU5CUVdRN08ybERRVVJwUWpzN01rTkJTMFk3UVVGRFdDeEpRVUZCTEcxQ1FVRlBMRWxCUVVrc1QwRkJTaXhEUVVGWkxHMUNRVUZYTzBGQlF6RkNMRWxCUVVFc01FSkJSREJDTzJsQ1FVRllMRU5CUVc1Q0xFTkJSRmM3T3pzN2IwTkJUVkFzVlVGQlZTeFRRVUZUTEUxQlFVMHNVMEZCVXp0QlFVTjBReXhKUVVGQkxHZENRVUZKTEU5QlFVb3NSVUZCWVR0QlFVTlVMRWxCUVVFc2RVSkJRVThzU1VGQlNTeFBRVUZLTEVOQlFWa3NiVUpCUVZjN1FVRkRNVUlzU1VGQlFTd3JRa0ZCVnl4WlFVRlZPMEZCUTJwQ0xFbEJRVUVzWjBOQlFWRXNVVUZCVHl4eFJVRkJVQ3hMUVVGdlFpeFJRVUZ3UWl4SFFVRXJRaXhUUVVGVExFbEJRVlFzYTBKQlFXTXNLME5CUVZrc1RVRkJNVUlzUTBGQkwwSXNSMEZCYVVVc1UwRkJVeXhMUVVGVUxHdENRVUZsTEN0RFFVRlpMRTFCUVROQ0xFTkJRV3BGTEVOQlFWSXNRMEZFYVVJN2VVSkJRVllzUlVGRlVpeFBRVVpJTEVWQlJEQkNPM0ZDUVVGWUxFTkJRVzVDTEVOQlJGTTdhVUpCUVdJN08wRkJVVUVzU1VGQlFTeHRRa0ZCVHl4SlFVRkpMRTlCUVVvc1EwRkJXU3h0UWtGQlZ6dEJRVU14UWl4SlFVRkJMSGRDUVVGUkxGRkJRVThzY1VWQlFWQXNTMEZCYlVJc1VVRkJia0lzUjBGQk9FSXNVMEZCVXl4SlFVRlVMR3RDUVVGakxDdERRVUZaTEUxQlFURkNMRU5CUVRsQ0xFZEJRV2RGTEZOQlFWTXNTMEZCVkN4clFrRkJaU3dyUTBGQldTeE5RVUV6UWl4RFFVRm9SU3hEUVVGU0xFTkJSREJDTzJsQ1FVRllMRU5CUVc1Q0xFTkJWSE5ET3pzN08yMURRV051UXl4UFFVRlBMRlZCUVZVN1FVRkRjRUlzU1VGQlFTeG5Ra0ZCU1N4UFFVRlBMRXRCUVZBc1MwRkJhVUlzVVVGQmFrSXNTVUZCTmtJc1QwRkJUeXhSUVVGUUxFdEJRVzlDTEZWQlFYQkNMRVZCUVdkRE8wRkJRemRFTEVsQlFVRXNkVUpCUkRaRU8ybENRVUZxUlRzN1FVRkpRU3hKUVVGQkxHZENRVUZKTEVOQlFVTXNTMEZCU3l4TlFVRk1MRU5CUVZrc1IwRkJXaXhEUVVGblFpeExRVUZvUWl4RFFVRkVMRVZCUVhsQ08wRkJRM3BDTEVsQlFVRXNjVUpCUVVzc1RVRkJUQ3hEUVVGWkxFZEJRVm9zUTBGQlowSXNTMEZCYUVJc1JVRkJkVUlzU1VGQlNTeEhRVUZLTEVWQlFYWkNMRVZCUkhsQ08ybENRVUUzUWpzN1FVRkpRU3hKUVVGQkxHZENRVUZKTEZWQlFWVXNRMEZCUXl4RFFVRkVMRU5CVkUwN08wRkJWM0JDTEVsQlFVRXNhVUpCUVVzc1RVRkJUQ3hEUVVGWkxFOUJRVm9zUTBGQmIwSXNhVUpCUVZNN1FVRkRla0lzU1VGQlFTd3dRa0ZCVlN4TFFVRkxMRWRCUVV3c1kwRkJVeXdyUTBGQldTeE5RVUZOTEVsQlFVNHNTVUZCY2tJc1EwRkJWaXhEUVVSNVFqdHBRa0ZCVkN4RFFVRndRaXhEUVZodlFqczdRVUZsY0VJc1NVRkJRU3hqUVVGRkxFOUJRVVlzUTBGbWIwSTdPMEZCYVVKd1FpeEpRVUZCTEdsQ1FVRkxMRTFCUVV3c1EwRkJXU3hIUVVGYUxFTkJRV2RDTEV0QlFXaENMRVZCUVhWQ0xFZEJRWFpDTEVOQlFUSkNMRTlCUVROQ0xFVkJRVzlETEZGQlFYQkRMRVZCYWtKdlFqczdRVUZ0UW5CQ0xFbEJRVUVzYlVKQlFVOHNUMEZCVUN4RFFXNUNiMEk3T3pzN2RVTkJjMEppTEZOQlFWTTdPenM3T3p0QlFVTm9RaXhKUVVGQkxIRkRRVUZ0UWl4TFFVRkxMRTFCUVV3c1EwRkJXU3hOUVVGYUxEUkNRVUZ1UWl4dlIwRkJlVU03TkVKQlFXaERMSEZDUVVGblF6czdPenM3TzBGQlEzSkRMRWxCUVVFc09FTkJRV1VzVDBGQlR5eEpRVUZRTERaQ1FVRm1MSGRIUVVFNFFqdHZRMEZCY2tJc2EwSkJRWEZDT3p0QlFVTXhRaXhKUVVGQkxHZERRVUZKTEU5QlFVOHNUMEZCVUN4RlFVRm5RanRCUVVOb1FpeEpRVUZCTEhWRFFVRlBMRTlCUVU4c1RVRkJVQ3hEUVVGakxFOUJRV1FzUTBGQlVDeERRVVJuUWp0cFEwRkJjRUk3TmtKQlJFbzdPenM3T3pzN096czdPenM3TzNsQ1FVUnhRenR4UWtGQmVrTTdPenM3T3pzN096czdPenM3TzJsQ1FVUm5RanM3UVVGVGFFSXNTVUZCUVN4dFFrRkJUeXhMUVVGUUxFTkJWR2RDT3pzN08zTkRRVmxXTzBGQlEwNHNTVUZCUVN4blFrRkJTU3hQUVVGUExHZENRVUZuUWl4aFFVRm9RaXhIUVVGblF5eExRVUZMTEZsQlFVd3NSMEZCYjBJc1NVRkJjRVFzUTBGRVREczdRVUZIVGl4SlFVRkJMR2RDUVVGSkxFOUJRVThzVFVGQlRTeEpRVUZPTEVOQlFWY3NVMEZCV0N4RFFVRlFMRU5CU0VVN08yMURRVXRWTEV0QlFVc3NUVUZCVEN4RFFVRlpMRU5CUVZvc1JVRkJaU3hEUVVGbUxFVkJURlk3T3pzN2IwSkJTMEVzZVVKQlRFRTdPenRCUVU5T0xFbEJRVUVzWjBKQlFVa3NUMEZCVHl4TFFVRlFMRXRCUVdsQ0xGRkJRV3BDTEVsQlFUWkNMRU5CUVVNc1MwRkJTeXhOUVVGTUxFTkJRVmtzUjBGQldpeERRVUZuUWl4TFFVRm9RaXhEUVVGRUxFVkJRWGxDTzBGQlEzUkVMRWxCUVVFc2RVSkJRVThzUzBGQlN5eFpRVUZNTEVWQlFWQXNRMEZFYzBRN2FVSkJRVEZFT3p0QlFVbEJMRWxCUVVFc1owSkJRVWtzVjBGQlZ5eEZRVUZZTEVOQldFVTdPenM3T3pzN1FVRmhUaXhKUVVGQkxITkRRVUZ4UWl4TFFVRkxMRTFCUVV3c1EwRkJXU3hIUVVGYUxFTkJRV2RDTEV0QlFXaENMRVZCUVhWQ0xFMUJRWFpDTERaQ1FVRnlRaXgzUjBGQmMwUTdORUpCUVRkRExIZENRVUUyUXpzN1FVRkRiRVFzU1VGQlFTdzJRa0ZCVXl4SlFVRlVMRU5CUVdNc1MwRkJTeXhQUVVGTUxFTkJRV0VzVVVGQllpeEZRVUYxUWl4SlFVRjJRaXhGUVVFMlFpeEpRVUUzUWl4RlFVRnRReXhEUVVGdVF5eERRVUZrTEVWQlJHdEVPM0ZDUVVGMFJEczdPenM3T3pzN096czdPenM3YVVKQllrMDdPMEZCYVVKT0xFbEJRVUVzYlVKQlFVOHNVVUZCVVN4SFFVRlNMRU5CUVZrc1VVRkJXaXhEUVVGUUxFTkJha0pOT3pzN096WkRRVzlDVHp0QlFVTmlMRWxCUVVFc1owSkJRVWtzVDBGQlR5eG5Ra0ZCWjBJc1lVRkJhRUlzUjBGQlowTXNTMEZCU3l4WlFVRk1MRWRCUVc5Q0xFbEJRWEJFTEVOQlJFVTdPMEZCUjJJc1NVRkJRU3huUWtGQlNTeFBRVUZQTEUxQlFVMHNTVUZCVGl4RFFVRlhMRk5CUVZnc1EwRkJVQ3hEUVVoVE96dHZRMEZMV1N4TFFVRkxMRTFCUVV3c1EwRkJXU3hEUVVGYUxFVkJRV1VzUTBGQlppeEZRVXhhT3pzN08yOUNRVXRRTEhsQ1FVeFBPMjlDUVV0QkxESkNRVXhCT3pzN1FVRlBZaXhKUVVGQkxHZENRVUZKTEU5QlFVOHNTMEZCVUN4TFFVRnBRaXhSUVVGcVFpeEpRVUUyUWl4RFFVRkRMRTlCUVU4c1UwRkJVQ3hEUVVGcFFpeFBRVUZxUWl4RFFVRkVMRWxCUVRoQ0xFTkJRVU1zUzBGQlN5eE5RVUZNTEVOQlFWa3NSMEZCV2l4RFFVRm5RaXhMUVVGb1FpeERRVUZFTEVWQlFYbENPMEZCUTNCR0xFbEJRVUVzZFVKQlFVOHNTMEZCU3l4WlFVRk1MRVZCUVZBc1EwRkViMFk3YVVKQlFYaEdPenRCUVVsQkxFbEJRVUVzWjBKQlFVa3NWMEZCVnl4RlFVRllMRU5CV0ZNN096czdPenM3UVVGaFlpeEpRVUZCTEhORFFVRnhRaXhMUVVGTExFMUJRVXdzUTBGQldTeEhRVUZhTEVOQlFXZENMRXRCUVdoQ0xFVkJRWFZDTEUxQlFYWkNMRFpDUVVGeVFpeDNSMEZCYzBRN05FSkJRVGRETEhkQ1FVRTJRenM3UVVGRGJFUXNTVUZCUVN3MlFrRkJVeXhKUVVGVUxFTkJRV01zUzBGQlN5eFBRVUZNTEVOQlFXRXNVVUZCWWl4RlFVRjFRaXhKUVVGMlFpeEZRVUUyUWl4SlFVRTNRaXhGUVVGdFF5eFBRVUZ1UXl4RFFVRmtMRVZCUkd0RU8zRkNRVUYwUkRzN096czdPenM3T3pzN096czdhVUpCWW1FN08wRkJhVUppTEVsQlFVRXNiVUpCUVU4c1VVRkJVU3hIUVVGU0xFTkJRVmtzVVVGQldpeERRVUZRTEVOQmFrSmhPenM3WlVFdlJVRTdPenRSUTBkQk8wRkJRMnBDTEVsQlFVRXNZVUZFYVVJc1lVRkRha0lzUjBGQk5rSTdaMEpCUVdwQ0xHbEZRVUZYTEc5Q1FVRk5PemhEUVVSYUxHVkJRMWs3TzBGQlEzcENMRWxCUVVFc1lVRkJTeXhSUVVGTUxFZEJRWGRDTEZGQlFYaENMRU5CUkhsQ08wRkJSWHBDTEVsQlFVRXNZVUZCU3l4blFrRkJUQ3hIUVVGM1FpeERRVUZETEVOQlFVUXNRMEZHUXpzN1FVRkpla0lzU1VGQlFTeGhRVUZMTEdGQlFVd3NSMEZCZDBJc1NVRkJTU3hoUVVGS0xFVkJRWGhDTEVOQlNubENPMEZCUzNwQ0xFbEJRVUVzWVVGQlN5eGhRVUZNTEVkQlFYZENMRWxCUVVrc1lVRkJTaXhGUVVGNFFpeERRVXg1UWp0QlFVMTZRaXhKUVVGQkxHRkJRVXNzWjBKQlFVd3NSMEZCZDBJc1NVRkJTU3huUWtGQlNpeEZRVUY0UWl4RFFVNTVRanRCUVU5NlFpeEpRVUZCTEdGQlFVc3NXVUZCVEN4SFFVRjNRaXhKUVVGSkxGbEJRVW9zUlVGQmVFSXNRMEZRZVVJN08wRkJVM3BDTEVsQlFVRXNZVUZCU3l4UlFVRk1MRWRCUVdkQ0xFMUJRVTBzU1VGQlRpeERRVUZYTEVWQlFVVXNVVUZCVXl4TFFVRkxMRkZCUVV3c1JVRkJkRUlzUlVGQmRVTTdkVUpCUVU4c1JVRkJSU3haUVVGWkxFVkJRVm83WVVGQlZDeERRVUYyUkN4RFFWUjVRanM3UVVGWGVrSXNTVUZCUVN4aFFVRkxMRzlDUVVGTUxFZEJRVFJDTEVsQlFVa3NSMEZCU2l4RlFVRTFRaXhEUVZoNVFqdFRRVUUzUWpzN2FVTkJSR2xDT3pzclEwRmxSVHRCUVVObUxFbEJRVUVzWjBKQlFVa3NZMEZCWXl4TFFVRkxMRkZCUVV3c1EwRkVTRHM3UVVGSFppeEpRVUZCTEdsQ1FVRkxMRkZCUVV3c1NVRkJhVUlzUTBGQmFrSXNRMEZJWlRzN1FVRkxaaXhKUVVGQkxHbENRVUZMTEZGQlFVd3NORU5CUVc5Q0xFdEJRVXNzVVVGQlRDeHJRMEZCYTBJc1RVRkJUU3hKUVVGT0xFTkJRVmNzUlVGQlJTeFJRVUZUTEZkQlFWUXNSVUZCWWl4RlFVRnhRenN5UWtGQlR5eEZRVUZGTEZsQlFWa3NSVUZCV2p0cFFrRkJWQ3hIUVVFelJTeERRVXhsT3p0QlFVOW1MRWxCUVVFc2FVSkJRVXNzU1VGQlNTeEpRVUZKTEZkQlFVb3NSVUZCYVVJc1NVRkJTU3hMUVVGTExGRkJRVXdzUlVGQlpTeEZRVUZGTEVOQlFVWXNSVUZCU3pzN096czdPMEZCUXpsRExFbEJRVUVzZVVOQlFYTkNMRXRCUVVzc1owSkJRVXdzUTBGQmMwSXNZVUZCZEVJc1IwRkJjME1zU1VGQmRFTXNORUpCUVhSQ0xHOUhRVUZ2UlR0blEwRkJNMFFzZDBKQlFUSkVPenRCUVVOb1JTeEpRVUZCTERaQ1FVRkxMRkZCUVV3c1EwRkJZeXhEUVVGa0xFVkJRV2xDTEZOQlFXcENMRWxCUVRoQ0xFdEJRVXNzWjBKQlFVd3NRMEZCYzBJc1dVRkJkRUlzUTBGQmJVTXNVMEZCYmtNc1EwRkJPVUlzUTBGRVowVTdlVUpCUVhCRk96czdPenM3T3pzN096czdPenR4UWtGRU9FTTdhVUpCUVd4RU96czdPM05EUVU5TkxGbEJRVms3UVVGRGJFSXNTVUZCUVN4blFrRkJTU3hEUVVGRExFMUJRVTBzVDBGQlRpeERRVUZqTEZWQlFXUXNRMEZCUkN4RlFVRTBRanRCUVVNMVFpeEpRVUZCTEhOQ1FVRk5MRlZCUVZVc2NVUkJRVllzUTBGQlRpeERRVVEwUWp0cFFrRkJhRU03TzBGQlNVRXNTVUZCUVN4blFrRkJTU3hMUVVGTExFTkJRVXdzUTBGTVl6czdRVUZQYkVJc1NVRkJRU3h0UWtGQlR5eExRVUZMTEV0QlFVc3NVVUZCVEN4RlFVRmxMRVZCUVVVc1JVRkJSaXhGUVVGTk8wRkJRemRDTEVsQlFVRXNiMEpCUVVrc1MwRkJTeXhSUVVGTUxFTkJRV01zUlVGQlpDeEZRVUZyUWl4VlFVRnNRaXhEUVVFMlFpeE5RVUUzUWl4TFFVRjNReXhEUVVGNFF5eEZRVUV5UXp0QlFVTXpReXhKUVVGQkxEQkNRVVF5UXp0eFFrRkJMME03YVVKQlJFbzdPMEZCVFVFc1NVRkJRU3huUWtGQlNTeE5RVUZOTEV0QlFVc3NVVUZCVEN4RlFVRmxPenRCUVVWeVFpeEpRVUZCTEhWQ1FVRlBMRVZCUVVVc1NVRkJTeXhMUVVGTExGRkJRVXdzUlVGQlpTeFJRVUZUTEVsQlFWUXNSVUZCTjBJc1EwRkdjVUk3YVVKQlFYcENPenRCUVV0QkxFbEJRVUVzWjBKQlFVa3NTMEZCU3l4TFFVRkxMR2RDUVVGTUxFVkJRWFZDTzBGQlF6VkNMRWxCUVVFc2NVSkJRVXNzWjBKQlFVd3NSMEZCZDBJc1JVRkJlRUlzUTBGRU5FSTdhVUpCUVdoRE96dEJRVWxCTEVsQlFVRXNhVUpCUVVzc1VVRkJUQ3hEUVVGakxFVkJRV1FzUlVGQmEwSXNWVUZCYkVJc1IwRkJLMElzVlVGQkwwSXNRMEYwUW10Q096dEJRWGRDYkVJc1NVRkJRU3h0UWtGQlR5eEZRVUZGTEUxQlFVWXNSVUZCVFN4UlFVRlRMRXRCUVVzc1VVRkJUQ3hEUVVGakxFVkJRV1FzUTBGQlZDeEZRVUZpTEVOQmVFSnJRanM3T3p0NVEwRXlRbFFzU1VGQlNUdEJRVU5pTEVsQlFVRXNhVUpCUVVzc1VVRkJUQ3hEUVVGakxFVkJRV1FzUlVGQmEwSXNWVUZCYkVJc1IwRkJLMElzUlVGQkwwSXNRMEZFWVRzN1FVRkhZaXhKUVVGQkxHZENRVUZKTEV0QlFVc3NTMEZCU3l4blFrRkJUQ3hGUVVGMVFqdEJRVU0xUWl4SlFVRkJMSFZDUVVRMFFqdHBRa0ZCYUVNN08wRkJTVUVzU1VGQlFTeHBRa0ZCU3l4SlFVRkpMRWxCUVVrc1JVRkJTaXhGUVVGUkxFdEJRVXNzUTBGQlRDeEZRVUZSTEVWQlFVVXNRMEZCUml4RlFVRkxPMEZCUXpGQ0xFbEJRVUVzYjBKQlFVa3NTMEZCU3l4UlFVRk1MRU5CUVdNc1EwRkJaQ3hGUVVGcFFpeFZRVUZxUWl4RFFVRTBRaXhOUVVFMVFpeExRVUYxUXl4RFFVRjJReXhGUVVFd1F6dEJRVU14UXl4SlFVRkJMSGxDUVVGTExHZENRVUZNTEVkQlFYZENMRU5CUVhoQ0xFTkJSREJET3p0QlFVY3hReXhKUVVGQkxESkNRVWd3UXp0eFFrRkJPVU03YVVKQlJFbzdPMEZCVVVFc1NVRkJRU3hwUWtGQlN5eG5Ra0ZCVEN4SFFVRjNRaXhEUVVGNFFpeERRV1poT3pzN096czdPMjlDUVd0Q1NpeHRSVUZCWVRzN01rSkJRMkk3T3pzN096czdPenM3T3pCRVFVTkVMR1ZCUVdVc1NVRkJaaXhKUVVGMVFpeFhRVUZYTEV0QlFWZ3NRMEZCYVVJN0swUkJRV0VzVFVGQlN5eFJRVUZNTEVOQlFXTXNSVUZCWkN4RlFVRnJRaXhWUVVGc1FpeERRVUUyUWl4UFFVRTNRaXhEUVVGeFF5eFRRVUZ5UXl4TlFVRnZSQ3hEUVVGRExFTkJRVVE3Y1VSQlFXcEZMRU5CUVhoRE96czdPenM3TWtSQlEwMHNSVUZCUlN4TlFVRkdMRVZCUVUwc1VVRkJVeXhOUVVGTExGRkJRVXdzUTBGQll5eEZRVUZrTEVOQlFWUTdPenM3T3pzN096dEJRVVpZTEVsQlFVRXNhVU5CUVVzN096dHpRMEZCUnl4TlFVRk5MRXRCUVVzc1owSkJRVXc3T3pzN08zRkZRVUZrT3pzN1FVRkJjVU1zU1VGQlFTdzRRa0ZCUlN4RlFVRkdPenM3T3pzN096czdPenM3TzJ0RVFVODFRaXhMUVVGTE8wRkJRM1pDTEVsQlFVRXNaMEpCUVVrc1QwRkJUeXhIUVVGUUxFdEJRV1VzVVVGQlppeEpRVUV5UWl4UlFVRlJMRVZCUVZJc1JVRkJXVHRCUVVOMlF5eEpRVUZCTEhOQ1FVRk5MRlZCUVZVc2FVTkJRVllzUTBGQlRpeERRVVIxUXp0cFFrRkJNME03TzBGQlNVRXNTVUZCUVN4cFFrRkJTeXh2UWtGQlRDeERRVUV3UWl4SFFVRXhRaXhEUVVFNFFpeEhRVUU1UWl4RlFVRnRReXhMUVVGTExHRkJRVXdzUTBGQmJVSXNiVUpCUVc1Q0xFVkJRVzVETEVWQlRIVkNPenRCUVU5MlFpeEpRVUZCTEcxQ1FVRlBMRWRCUVZBc1EwRlFkVUk3T3pzN096czdPRU5CV1ZRc1MwRkJTeXhYUVVGWE8wRkJRemxDTEVsQlFVRXNhVUpCUVVzc1owSkJRVXdzUTBGQmMwSXNhVUpCUVhSQ0xFTkJRWGRETEVkQlFYaERMRVZCUVRaRExGTkJRVGRETEVWQlJEaENPenM3T3pzN08wRkJSemxDTEVsQlFVRXNjME5CUVcxQ0xFdEJRVXNzVVVGQlRDd3lRa0ZCYmtJc2QwZEJRV3RET3pSQ1FVRjZRaXh6UWtGQmVVSTdPMEZCUXpsQ0xFbEJRVUVzTWtKQlFVOHNSMEZCVUN4SlFVRmpMRXRCUVVzc1owSkJRVXdzUTBGQmMwSXNXVUZCZEVJc1EwRkJiVU1zUjBGQmJrTXNRMEZCWkN4RFFVUTRRanR4UWtGQmJFTTdPenM3T3pzN096czdPenM3TzJsQ1FVZzRRanM3UVVGUE9VSXNTVUZCUVN4blFrRkJTU3h2UWtGQlNpeERRVkE0UWpzN1FVRlRPVUlzU1VGQlFTd3lRa0ZCWlN4M1JVRkJaanRCUVVOSkxFbEJRVUVzY1VKQlFVc3NWVUZCVER0QlFVRnBRaXhKUVVGQkxHdERRVUZqTEZOQlFXUXNRMEZCYWtJN1FVRkVTaXhKUVVGQkxIRkNRVVZUTEZGQlFVdzdRVUZCWlN4SlFVRkJPMEZCUTFnc1NVRkJRU3h6UTBGQll5eDFRa0ZCVnpzN096czdPMEZCUTNKQ0xFbEJRVUVzYzBSQlFXZENMRTlCUVU4c1NVRkJVQ3hEUVVGWkxGTkJRVm9zTkVKQlFXaENMSGRIUVVGM1F6czBRMEZCTDBJc2IwSkJRU3RDT3p0QlFVTndReXhKUVVGQkxIbERRVUZMTEVsQlFVd3NTVUZCV1N4VlFVRlZMRWxCUVZZc1EwRkJXaXhEUVVSdlF6dHhRMEZCZUVNN096czdPenM3T3pzN096czdPMmxEUVVSeFFqczJRa0ZCV0N4RFFVUklPenRCUVU5WUxFbEJRVUVzT0VKQlVGYzdlVUpCUVdZN1FVRkdTaXhKUVVGQk8wRkJWMkVzU1VGQlFTeHJRMEZCWXl4MVFrRkJWenRCUVVGRkxFbEJRVUVzSzBKQlFVOHNVMEZCVUN4RFFVRkdPM2xDUVVGWUxFTkJRWFpDTzBGQldFb3NTVUZCUVN4aFFWUTRRanM3UVVGMVFqbENMRWxCUVVFc2FVSkJRVXNzWVVGQlRDeERRVUZ0UWl4dFFrRkJia0lzUTBGQmRVTXNSMEZCZGtNc1JVRkJORU1zVjBGQk5VTXNSVUYyUWpoQ096dEJRWGxDT1VJc1NVRkJRU3h0UWtGQlR5eEhRVUZRTEVOQmVrSTRRanM3T3p0NVEwRTBRbkpDTEVsQlFVa3NZMEZCWXp0QlFVTXpRaXhKUVVGQkxHZENRVUZKTEV0QlFVc3NVVUZCVEN4RFFVRmpMRVZCUVdRc1JVRkJhMElzVlVGQmJFSXNRMEZCTmtJc1QwRkJOMElzUTBGQmNVTXNXVUZCY2tNc1RVRkJkVVFzUTBGQlF5eERRVUZFTEVWQlFVazdRVUZETTBRc1NVRkJRU3gxUWtGRU1rUTdhVUpCUVM5RU96dEJRVWxCTEVsQlFVRXNhVUpCUVVzc1VVRkJUQ3hEUVVGakxFVkJRV1FzUlVGQmEwSXNWVUZCYkVJc1EwRkJOa0lzU1VGQk4wSXNRMEZCYTBNc1dVRkJiRU1zUlVGTU1rSTdPenM3TkVOQlVXWXNTVUZCU1N4WFFVRlhPMEZCUXpOQ0xFbEJRVUVzWjBKQlFVa3NVVUZCVVN4TFFVRkxMRkZCUVV3c1EwRkJZeXhGUVVGa0xFVkJRV3RDTEZWQlFXeENMRU5CUVRaQ0xFOUJRVGRDTEVOQlFYRkRMRk5CUVhKRExFTkJRVklzUTBGRWRVSTdPMEZCUnpOQ0xFbEJRVUVzWjBKQlFVa3NWVUZCVlN4RFFVRkRMRU5CUVVRc1JVRkJTVHRCUVVOa0xFbEJRVUVzZFVKQlJHTTdhVUpCUVd4Q096dEJRVWxCTEVsQlFVRXNhVUpCUVVzc1VVRkJUQ3hEUVVGakxFVkJRV1FzUlVGQmEwSXNWVUZCYkVJc1EwRkJOa0lzVFVGQk4wSXNRMEZCYjBNc1MwRkJjRU1zUlVGQk1rTXNRMEZCTTBNc1JVRlFNa0k3T3pzN096czdNa05CV1doQ0xFdEJRVXNzVFVGQlRTeFpRVUZaTEZWQlFWVTdRVUZETlVNc1NVRkJRU3h0UWtGQlR5eExRVUZMTEdGQlFVd3NRMEZCYlVJc1kwRkJia0lzUTBGQmEwTXNSMEZCYkVNc1JVRkJkVU1zU1VGQmRrTXNSVUZCTmtNc1ZVRkJOME1zUlVGQmVVUXNVVUZCZWtRc1EwRkJVQ3hEUVVRMFF6czdPenRuUkVGSk5VSXNTMEZCU3l4WlFVRlpMRlZCUVZVN1FVRkRNME1zU1VGQlFTeHRRa0ZCVHl4TFFVRkxMR0ZCUVV3c1EwRkJiVUlzWTBGQmJrSXNRMEZCYTBNc1IwRkJiRU1zUlVGQmRVTXNWMEZCVnl4TFFVRllMRVZCUVd0Q0xGVkJRWHBFTEVWQlFYRkZMRkZCUVhKRkxFTkJRVkFzUTBGRU1rTTdPenM3YVVSQlNURkNMRXRCUVVzc1dVRkJXU3hWUVVGVk8wRkJRelZETEVsQlFVRXNiVUpCUVU4c1MwRkJTeXhoUVVGTUxFTkJRVzFDTEdOQlFXNUNMRU5CUVd0RExFZEJRV3hETEVWQlFYVkRMRmRCUVZjc1RVRkJXQ3hGUVVGdFFpeFZRVUV4UkN4RlFVRnpSU3hSUVVGMFJTeERRVUZRTEVOQlJEUkRPenM3T3l0RFFVazNRaXhMUVVGTExGbEJRVmtzVlVGQlZUdEJRVU14UXl4SlFVRkJMRzFDUVVGUExFdEJRVXNzWVVGQlRDeERRVUZ0UWl4alFVRnVRaXhEUVVGclF5eEhRVUZzUXl4RlFVRjFReXhYUVVGWExFbEJRVmdzUlVGQmFVSXNWVUZCZUVRc1JVRkJiMFVzVVVGQmNFVXNRMEZCVUN4RFFVUXdRenM3T3p0NVEwRkpha01zUzBGQlN6dEJRVU5rTEVsQlFVRXNiVUpCUVU4c1MwRkJTeXhoUVVGTUxFTkJRVzFDTEZsQlFXNUNMRU5CUVdkRExFZEJRV2hETEVOQlFWQXNRMEZFWXpzN096dHZRMEZKVml4TlFVRk5PenM3T3pzN1FVRkRWaXhKUVVGQkxITkRRVUZ0UWl4TFFVRkxMR0ZCUVV3c1EwRkJiVUlzV1VGQmJrSXNRMEZCWjBNc1RVRkJhRU1zTmtKQlFXNUNMSGRIUVVFMlJEczBRa0ZCY0VRc2MwSkJRVzlFT3p0QlFVTjZSQ3hKUVVGQkxESkNRVUZQTEZGQlFWQXNRMEZCWjBJc1NVRkJhRUlzUTBGQmNVSXNTVUZCY2tJc1JVRkJNa0lzUzBGQlN5eFhRVUZNTEVOQlFXbENMRTlCUVU4c1ZVRkJVQ3hEUVVFMVF5eEZRVUZuUlN4SlFVRm9SU3hGUVVSNVJEdHhRa0ZCTjBRN096czdPenM3T3pzN096czdPMmxDUVVSVk96czdPM0ZEUVUxTUxFMUJRVTA3T3pzN096dEJRVU5ZTEVsQlFVRXNjME5CUVcxQ0xFdEJRVXNzWVVGQlRDeERRVUZ0UWl4aFFVRnVRaXhEUVVGcFF5eE5RVUZxUXl3MlFrRkJia0lzZDBkQlFUaEVPelJDUVVGeVJDeHpRa0ZCY1VRN08wRkJRekZFTEVsQlFVRXNNa0pCUVU4c1VVRkJVQ3hEUVVGblFpeEpRVUZvUWl4RFFVRnhRaXhKUVVGeVFpeEZRVUV5UWl4TFFVRkxMRmRCUVV3c1EwRkJhVUlzVDBGQlR5eFZRVUZRTEVOQlFUVkRMRVZCUVdkRkxFbEJRV2hGTEVWQlJEQkVPM0ZDUVVFNVJEczdPenM3T3pzN096czdPenM3YVVKQlJGYzdPenM3YlVOQlRWSXNUVUZCVFRzN096czdPMEZCUTFRc1NVRkJRU3h6UTBGQmJVSXNTMEZCU3l4aFFVRk1MRU5CUVcxQ0xGZEJRVzVDTEVOQlFTdENMRTFCUVM5Q0xEWkNRVUZ1UWl4M1IwRkJORVE3TkVKQlFXNUVMSE5DUVVGdFJEczdRVUZEZUVRc1NVRkJRU3d5UWtGQlR5eFJRVUZRTEVOQlFXZENMRWxCUVdoQ0xFTkJRWEZDTEVsQlFYSkNMRVZCUVRKQ0xFdEJRVXNzVjBGQlRDeERRVUZwUWl4UFFVRlBMRlZCUVZBc1EwRkJOVU1zUlVGQlowVXNTVUZCYUVVc1JVRkVkMFE3Y1VKQlFUVkVPenM3T3pzN096czdPenM3T3p0cFFrRkVVenM3T3pzN096dG5SRUZSVHl4aFFVRmhMR0ZCUVdFN1FVRkRNVU1zU1VGQlFTeHBRa0ZCU3l4aFFVRk1MRU5CUVcxQ0xHMUNRVUZ1UWl4RFFVRjFReXhYUVVGMlF5eEZRVUZ2UkN4WFFVRndSQ3hGUVVRd1F6czdPenR2UTBGSmRFTTdRVUZEU2l4SlFVRkJMR2xDUVVGTExHRkJRVXdzUTBGQmJVSXNTMEZCYmtJc1IwRkVTVHM3UVVGSFNpeEpRVUZCTEcxQ1FVRlBMRWxCUVZBc1EwRklTVHM3T3pzd1EwRk5UU3hoUVVGaExHRkJRV0U3UVVGRGNFTXNTVUZCUVN4cFFrRkJTeXhoUVVGTUxFTkJRVzFDTEdGQlFXNUNMRU5CUVdsRExGZEJRV3BETEVWQlFUaERMRmRCUVRsRExFVkJSRzlET3p0QlFVZHdReXhKUVVGQkxHMUNRVUZQTEVsQlFWQXNRMEZJYjBNN096czdiVU5CVFdwRExFOUJRVThzUzBGQlN6dEJRVU5tTEVsQlFVRXNaMEpCUVVrc1owSkJRV2RDTEZOQlFXaENMRU5CUkZjN08wRkJSMllzU1VGQlFTeG5Ra0ZCU1N4UFFVRlBMRWRCUVZBc1MwRkJaU3hSUVVGbUxFVkJRWGxDTzBGQlEzcENMRWxCUVVFc1owTkJRV2RDTEV0QlFVc3NiMEpCUVV3c1EwRkJNRUlzUjBGQk1VSXNRMEZCT0VJc1IwRkJPVUlzUTBGQmFFSXNRMEZFZVVJN08wRkJSM3BDTEVsQlFVRXNiMEpCUVVrc2EwSkJRV3RDTEZOQlFXeENMRVZCUVRaQ08wRkJRemRDTEVsQlFVRXNNRUpCUVUwc1ZVRkJWU3gxU1VGQlZpeERRVUZPTEVOQlJEWkNPM0ZDUVVGcVF6dHBRa0ZJU2pzN1FVRlJRU3hKUVVGQkxHMUNRVUZQTEV0QlFVc3NZVUZCVEN4RFFVRnRRaXhOUVVGdVFpeERRVUV3UWl4SlFVRXhRaXhGUVVGblF5eExRVUZvUXl4RlFVRjFReXhoUVVGMlF5eERRVUZRTEVOQldHVTdPenM3T3pzN2JVTkJaMEphTEU5QlFVOHNWVUZCVlR0QlFVTndRaXhKUVVGQkxHMUNRVUZQTEV0QlFVc3NXVUZCVEN4RFFVRnJRaXhOUVVGc1FpeERRVUY1UWl4TFFVRjZRaXhGUVVGblF5eFJRVUZvUXl4RFFVRlFMRU5CUkc5Q096czdPM1ZEUVVsaUxGTkJRVk03UVVGRGFFSXNTVUZCUVN4dFFrRkJUeXhMUVVGTExGbEJRVXdzUTBGQmEwSXNWVUZCYkVJc1EwRkJOa0lzVDBGQk4wSXNRMEZCVUN4RFFVUm5RanM3T3p0elEwRkpWanM3TzBGQlEwNHNTVUZCUVN4dFFrRkJUeXc0UWtGQlN5eFpRVUZNTEVOQlFXdENMRTlCUVd4Q0xFVkJRVEJDTEVsQlFURkNMQ3RDUVVFclFpeDNRMEZCVXl4WFFVRjRReXhEUVVGUUxFTkJSRTA3T3pzN05rTkJTVTg3T3p0QlFVTmlMRWxCUVVFc2JVSkJRVThzSzBKQlFVc3NXVUZCVEN4RFFVRnJRaXhqUVVGc1FpeEZRVUZwUXl4SlFVRnFReXhuUTBGQmMwTXNkME5CUVZNc1YwRkJMME1zUTBGQlVDeERRVVJoT3pzN1pVRnNUMEU3T3pzN096czdPenM3T3lKOSIsIi8qKlxuICogbWFpbmxvb3AuanMgMS4wLjMtMjAxNjAzMjBcbiAqXG4gKiBAYXV0aG9yIElzYWFjIFN1a2luIChodHRwOi8vd3d3LmlzYWFjc3VraW4uY29tLylcbiAqIEBsaWNlbnNlIE1JVFxuICovXG5cbiFmdW5jdGlvbihhKXtmdW5jdGlvbiBiKGEpe2lmKHY9byhiKSwhKGUraj5hKSl7Zm9yKGQrPWEtZSxlPWEscihhLGQpLGE+ZysxZTMmJihmPS4yNSpoKy43NSpmLGc9YSxoPTApLGgrKyxpPTA7ZD49YzspaWYocyhjKSxkLT1jLCsraT49MjQwKXttPSEwO2JyZWFrfXQoZC9jKSx1KGYsbSksbT0hMX19dmFyIGM9MWUzLzYwLGQ9MCxlPTAsZj02MCxnPTAsaD0wLGk9MCxqPTAsaz0hMSxsPSExLG09ITEsbj1cIm9iamVjdFwiPT10eXBlb2Ygd2luZG93P3dpbmRvdzphLG89bi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fGZ1bmN0aW9uKCl7dmFyIGE9RGF0ZS5ub3coKSxiLGQ7cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiBiPURhdGUubm93KCksZD1NYXRoLm1heCgwLGMtKGItYSkpLGE9YitkLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtlKGIrZCl9LGQpfX0oKSxwPW4uY2FuY2VsQW5pbWF0aW9uRnJhbWV8fGNsZWFyVGltZW91dCxxPWZ1bmN0aW9uKCl7fSxyPXEscz1xLHQ9cSx1PXEsdjthLk1haW5Mb29wPXtnZXRTaW11bGF0aW9uVGltZXN0ZXA6ZnVuY3Rpb24oKXtyZXR1cm4gY30sc2V0U2ltdWxhdGlvblRpbWVzdGVwOmZ1bmN0aW9uKGEpe3JldHVybiBjPWEsdGhpc30sZ2V0RlBTOmZ1bmN0aW9uKCl7cmV0dXJuIGZ9LGdldE1heEFsbG93ZWRGUFM6ZnVuY3Rpb24oKXtyZXR1cm4gMWUzL2p9LHNldE1heEFsbG93ZWRGUFM6ZnVuY3Rpb24oYSl7cmV0dXJuXCJ1bmRlZmluZWRcIj09dHlwZW9mIGEmJihhPTEvMCksMD09PWE/dGhpcy5zdG9wKCk6aj0xZTMvYSx0aGlzfSxyZXNldEZyYW1lRGVsdGE6ZnVuY3Rpb24oKXt2YXIgYT1kO3JldHVybiBkPTAsYX0sc2V0QmVnaW46ZnVuY3Rpb24oYSl7cmV0dXJuIHI9YXx8cix0aGlzfSxzZXRVcGRhdGU6ZnVuY3Rpb24oYSl7cmV0dXJuIHM9YXx8cyx0aGlzfSxzZXREcmF3OmZ1bmN0aW9uKGEpe3JldHVybiB0PWF8fHQsdGhpc30sc2V0RW5kOmZ1bmN0aW9uKGEpe3JldHVybiB1PWF8fHUsdGhpc30sc3RhcnQ6ZnVuY3Rpb24oKXtyZXR1cm4gbHx8KGw9ITAsdj1vKGZ1bmN0aW9uKGEpe3QoMSksaz0hMCxlPWEsZz1hLGg9MCx2PW8oYil9KSksdGhpc30sc3RvcDpmdW5jdGlvbigpe3JldHVybiBrPSExLGw9ITEscCh2KSx0aGlzfSxpc1J1bm5pbmc6ZnVuY3Rpb24oKXtyZXR1cm4ga319LFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoYS5NYWluTG9vcCk6XCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmbnVsbCE9PW1vZHVsZSYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZS5leHBvcnRzJiYobW9kdWxlLmV4cG9ydHM9YS5NYWluTG9vcCl9KHRoaXMpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFpbmxvb3AubWluLmpzLm1hcCIsInZhciBiYWJlbEhlbHBlcnMgPSB7fTtcbmV4cG9ydCB2YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iajtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG59O1xuXG5leHBvcnQgdmFyIGpzeCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuZm9yICYmIFN5bWJvbC5mb3IoXCJyZWFjdC5lbGVtZW50XCIpIHx8IDB4ZWFjNztcbiAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZVJhd1JlYWN0RWxlbWVudCh0eXBlLCBwcm9wcywga2V5LCBjaGlsZHJlbikge1xuICAgIHZhciBkZWZhdWx0UHJvcHMgPSB0eXBlICYmIHR5cGUuZGVmYXVsdFByb3BzO1xuICAgIHZhciBjaGlsZHJlbkxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAzO1xuXG4gICAgaWYgKCFwcm9wcyAmJiBjaGlsZHJlbkxlbmd0aCAhPT0gMCkge1xuICAgICAgcHJvcHMgPSB7fTtcbiAgICB9XG5cbiAgICBpZiAocHJvcHMgJiYgZGVmYXVsdFByb3BzKSB7XG4gICAgICBmb3IgKHZhciBwcm9wTmFtZSBpbiBkZWZhdWx0UHJvcHMpIHtcbiAgICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXByb3BzKSB7XG4gICAgICBwcm9wcyA9IGRlZmF1bHRQcm9wcyB8fCB7fTtcbiAgICB9XG5cbiAgICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgfSBlbHNlIGlmIChjaGlsZHJlbkxlbmd0aCA+IDEpIHtcbiAgICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgM107XG4gICAgICB9XG5cbiAgICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgJCR0eXBlb2Y6IFJFQUNUX0VMRU1FTlRfVFlQRSxcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICBrZXk6IGtleSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6ICcnICsga2V5LFxuICAgICAgcmVmOiBudWxsLFxuICAgICAgcHJvcHM6IHByb3BzLFxuICAgICAgX293bmVyOiBudWxsXG4gICAgfTtcbiAgfTtcbn0oKTtcblxuZXhwb3J0IHZhciBhc3luY1RvR2VuZXJhdG9yID0gZnVuY3Rpb24gKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGdlbiA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZ1bmN0aW9uIHN0ZXAoa2V5LCBhcmcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgICAgICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RlcChcInRocm93XCIsIGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0ZXAoXCJuZXh0XCIpO1xuICAgIH0pO1xuICB9O1xufTtcblxuZXhwb3J0IHZhciBjbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5leHBvcnQgdmFyIGNyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG5leHBvcnQgdmFyIGRlZmluZUVudW1lcmFibGVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKG9iaiwgZGVzY3MpIHtcbiAgZm9yICh2YXIga2V5IGluIGRlc2NzKSB7XG4gICAgdmFyIGRlc2MgPSBkZXNjc1trZXldO1xuICAgIGRlc2MuY29uZmlndXJhYmxlID0gZGVzYy5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2MpIGRlc2Mud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgZGVzYyk7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxuZXhwb3J0IHZhciBkZWZhdWx0cyA9IGZ1bmN0aW9uIChvYmosIGRlZmF1bHRzKSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZGVmYXVsdHMpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIHZhciB2YWx1ZSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZGVmYXVsdHMsIGtleSk7XG5cbiAgICBpZiAodmFsdWUgJiYgdmFsdWUuY29uZmlndXJhYmxlICYmIG9ialtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG5leHBvcnQgdmFyIGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG5leHBvcnQgdmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cbmV4cG9ydCB2YXIgZ2V0ID0gZnVuY3Rpb24gZ2V0KG9iamVjdCwgcHJvcGVydHksIHJlY2VpdmVyKSB7XG4gIGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbiAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpO1xuXG4gIGlmIChkZXNjID09PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7XG5cbiAgICBpZiAocGFyZW50ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZ2V0KHBhcmVudCwgcHJvcGVydHksIHJlY2VpdmVyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoXCJ2YWx1ZVwiIGluIGRlc2MpIHtcbiAgICByZXR1cm4gZGVzYy52YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7XG5cbiAgICBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTtcbiAgfVxufTtcblxuZXhwb3J0IHZhciBpbmhlcml0cyA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07XG5cbmV4cG9ydCB2YXIgX2luc3RhbmNlb2YgPSBmdW5jdGlvbiAobGVmdCwgcmlnaHQpIHtcbiAgaWYgKHJpZ2h0ICE9IG51bGwgJiYgdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiByaWdodFtTeW1ib2wuaGFzSW5zdGFuY2VdKSB7XG4gICAgcmV0dXJuIHJpZ2h0W1N5bWJvbC5oYXNJbnN0YW5jZV0obGVmdCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxlZnQgaW5zdGFuY2VvZiByaWdodDtcbiAgfVxufTtcblxuZXhwb3J0IHZhciBpbnRlcm9wUmVxdWlyZURlZmF1bHQgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgZGVmYXVsdDogb2JqXG4gIH07XG59O1xuXG5leHBvcnQgdmFyIGludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSBmdW5jdGlvbiAob2JqKSB7XG4gIGlmIChvYmogJiYgb2JqLl9fZXNNb2R1bGUpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9IGVsc2Uge1xuICAgIHZhciBuZXdPYmogPSB7fTtcblxuICAgIGlmIChvYmogIT0gbnVsbCkge1xuICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgbmV3T2JqW2tleV0gPSBvYmpba2V5XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBuZXdPYmouZGVmYXVsdCA9IG9iajtcbiAgICByZXR1cm4gbmV3T2JqO1xuICB9XG59O1xuXG5leHBvcnQgdmFyIG5ld0Fycm93Q2hlY2sgPSBmdW5jdGlvbiAoaW5uZXJUaGlzLCBib3VuZFRoaXMpIHtcbiAgaWYgKGlubmVyVGhpcyAhPT0gYm91bmRUaGlzKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBpbnN0YW50aWF0ZSBhbiBhcnJvdyBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxuZXhwb3J0IHZhciBvYmplY3REZXN0cnVjdHVyaW5nRW1wdHkgPSBmdW5jdGlvbiAob2JqKSB7XG4gIGlmIChvYmogPT0gbnVsbCkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBkZXN0cnVjdHVyZSB1bmRlZmluZWRcIik7XG59O1xuXG5leHBvcnQgdmFyIG9iamVjdFdpdGhvdXRQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKG9iaiwga2V5cykge1xuICB2YXIgdGFyZ2V0ID0ge307XG5cbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlO1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlO1xuICAgIHRhcmdldFtpXSA9IG9ialtpXTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG5leHBvcnQgdmFyIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4gPSBmdW5jdGlvbiAoc2VsZiwgY2FsbCkge1xuICBpZiAoIXNlbGYpIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjtcbn07XG5cbmV4cG9ydCB2YXIgc2VsZkdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogZ2xvYmFsO1xuXG5leHBvcnQgdmFyIHNldCA9IGZ1bmN0aW9uIHNldChvYmplY3QsIHByb3BlcnR5LCB2YWx1ZSwgcmVjZWl2ZXIpIHtcbiAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpO1xuXG4gIGlmIChkZXNjID09PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7XG5cbiAgICBpZiAocGFyZW50ICE9PSBudWxsKSB7XG4gICAgICBzZXQocGFyZW50LCBwcm9wZXJ0eSwgdmFsdWUsIHJlY2VpdmVyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoXCJ2YWx1ZVwiIGluIGRlc2MgJiYgZGVzYy53cml0YWJsZSkge1xuICAgIGRlc2MudmFsdWUgPSB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2V0dGVyID0gZGVzYy5zZXQ7XG5cbiAgICBpZiAoc2V0dGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNldHRlci5jYWxsKHJlY2VpdmVyLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuZXhwb3J0IHZhciBzbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkge1xuICAgIHZhciBfYXJyID0gW107XG4gICAgdmFyIF9uID0gdHJ1ZTtcbiAgICB2YXIgX2QgPSBmYWxzZTtcbiAgICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gdHJ1ZTtcbiAgICAgIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX2FycjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkge1xuICAgICAgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG4gICAgfVxuICB9O1xufSgpO1xuXG5leHBvcnQgdmFyIHNsaWNlZFRvQXJyYXlMb29zZSA9IGZ1bmN0aW9uIChhcnIsIGkpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIHJldHVybiBhcnI7XG4gIH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7XG4gICAgdmFyIF9hcnIgPSBbXTtcblxuICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZTspIHtcbiAgICAgIF9hcnIucHVzaChfc3RlcC52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gX2FycjtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgfVxufTtcblxuZXhwb3J0IHZhciB0YWdnZWRUZW1wbGF0ZUxpdGVyYWwgPSBmdW5jdGlvbiAoc3RyaW5ncywgcmF3KSB7XG4gIHJldHVybiBPYmplY3QuZnJlZXplKE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHN0cmluZ3MsIHtcbiAgICByYXc6IHtcbiAgICAgIHZhbHVlOiBPYmplY3QuZnJlZXplKHJhdylcbiAgICB9XG4gIH0pKTtcbn07XG5cbmV4cG9ydCB2YXIgdGFnZ2VkVGVtcGxhdGVMaXRlcmFsTG9vc2UgPSBmdW5jdGlvbiAoc3RyaW5ncywgcmF3KSB7XG4gIHN0cmluZ3MucmF3ID0gcmF3O1xuICByZXR1cm4gc3RyaW5ncztcbn07XG5cbmV4cG9ydCB2YXIgdGVtcG9yYWxSZWYgPSBmdW5jdGlvbiAodmFsLCBuYW1lLCB1bmRlZikge1xuICBpZiAodmFsID09PSB1bmRlZikge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihuYW1lICsgXCIgaXMgbm90IGRlZmluZWQgLSB0ZW1wb3JhbCBkZWFkIHpvbmVcIik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxufTtcblxuZXhwb3J0IHZhciB0ZW1wb3JhbFVuZGVmaW5lZCA9IHt9O1xuXG5leHBvcnQgdmFyIHRvQXJyYXkgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGFycikgPyBhcnIgOiBBcnJheS5mcm9tKGFycik7XG59O1xuXG5leHBvcnQgdmFyIHRvQ29uc3VtYWJsZUFycmF5ID0gZnVuY3Rpb24gKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgYXJyMltpXSA9IGFycltpXTtcblxuICAgIHJldHVybiBhcnIyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBBcnJheS5mcm9tKGFycik7XG4gIH1cbn07XG5cbmJhYmVsSGVscGVycztcblxuZXhwb3J0IHsgX3R5cGVvZiBhcyB0eXBlb2YsIF9leHRlbmRzIGFzIGV4dGVuZHMsIF9pbnN0YW5jZW9mIGFzIGluc3RhbmNlb2YgfSIsIi8qIEBmbG93ICovXG5cbmltcG9ydCBNYWluTG9vcCBmcm9tICdtYWlubG9vcC5qcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbkxvb3BMb29wTWFuYWdlciB7XG4gICAgLy8gc2V0VXBkYXRlKHVwZGF0ZU1ldGhvZCA6IChkZWx0YSA6IG51bWJlcikgPT4gdm9pZCkgOiBNYWluTG9vcExvb3BNYW5hZ2VyIHtcbiAgICBzZXRVcGRhdGUodXBkYXRlTWV0aG9kKSB7XG4gICAgICAgIE1haW5Mb29wLnNldFVwZGF0ZSh1cGRhdGVNZXRob2QpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBcbiAgICBzZXRSZW5kZXIocmVuZGVyTWV0aG9kIDogKGludGVycG9sYXRpb25QZXJjZW50YWdlIDogbnVtYmVyKSA9PiB2b2lkKSA6IE1haW5Mb29wTG9vcE1hbmFnZXIge1xuICAgICAgICBNYWluTG9vcC5zZXREcmF3KHJlbmRlck1ldGhvZClcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIFxuICAgIHN0YXJ0KCkgOiB2b2lkIHtcbiAgICAgICAgTWFpbkxvb3Auc3RhcnQoKVxuICAgIH1cbiAgICBcbiAgICBzdG9wKCkgOiB2b2lkIHtcbiAgICAgICAgTWFpbkxvb3Auc3RvcCgpXG4gICAgfVxufSIsIi8qIEBmbG93ICovXG5cbmltcG9ydCB0aHJlZSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRocmVlT2JqZWN0TWVzaExvYWRlciB7XG4gICAgbG9hZGVyICA6IHRocmVlLk9iamVjdExvYWRlcjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5sb2FkZXIgID0gbmV3IHRocmVlLk9iamVjdExvYWRlcigpO1xuICAgIH1cbiAgICBcbiAgICBvblByb2dyZXNzKCkge1xuICAgICAgICAvLyBwbGFjZWhvbGRlclxuICAgIH1cbiAgICBcbiAgICBwYXJzZShqc29uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvYWRlci5wYXJzZShqc29uKVxuICAgIH1cbiAgICBcbiAgICAvLyB0b2RvIHRoaXMgbm93IHJldHVybnMgYSBzY2VuZS4uIGltcGxpY2F0aW9ucz9cbiAgICAvLyB0b2RvIGFkZCBvcHRpb25zIGFzIGEgZGVzdHJ1Y3RhYmxlIG9iamVjdCAtPiBzdG9wcGVkIGJ5IGZsb3c6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9mbG93L2lzc3Vlcy8xODNcbiAgICBsb2FkKHBhdGggOiBzdHJpbmcsIG9wdGlvbnM/IDogT2JqZWN0KSA6IFByb21pc2Uge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNoYWRpbmcgPSAob3B0aW9ucyB8fCB7IH0pLnNoYWRpbmc7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzZWxmLmxvYWRlci5sb2FkKHBhdGgsIG9iaiA9PiByZXNvbHZlKG9iaiksIGluZm8gPT4gc2VsZi5vblByb2dyZXNzKGluZm8pLCBlcnIgPT4gcmVqZWN0KGVycikpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKG1lc2ggPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzaGFkaW5nICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXNoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBtZXNoLnRyYXZlcnNlKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiB0aHJlZS5NZXNoKSB7XG4gICAgICAgICAgICAgICAgICAgY2hpbGQubWF0ZXJpYWwuc2hhZGluZyA9IHNoYWRpbmc7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIG1lc2g7XG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSIsIi8qIEBmbG93ICovXG5cbmltcG9ydCB0aHJlZSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRocmVlUmVuZGVyZXJNYW5hZ2VyIHtcbiAgICByZW5kZXJlciAgICAgOiB0aHJlZS5XZWJHTFJlbmRlcmVyO1xuICAgIGNhbWVyYSAgICAgICA6IHRocmVlLkNhbWVyYTtcbiAgICAvLyBnZW9tZXRyaWVzICAgOiBNYXA8c3RyaW5nLCB0aHJlZS5HZW9tZXRyeT47XG4gICAgLy8gbWF0ZXJpYWxzICAgIDogTWFwPHN0cmluZywgdGhyZWUuTWF0ZXJpYWw+O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IHRocmVlLldlYkdMUmVuZGVyZXIoeyBhbnRpYWxpYXMgOiB0cnVlIH0pO1xuXHRcdHRoaXMucmVuZGVyZXIuc2V0Q2xlYXJDb2xvciggMHgwMDAwMDAgKTtcblx0XHR0aGlzLnJlbmRlcmVyLnNldFBpeGVsUmF0aW8oIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvICk7XG4gICAgfVxuICAgIFxuICAgIGVuYWJsZVNoYWRvd3MoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSB0cnVlXG4gICAgfVxuICAgIFxuICAgIGlzRnVsbFNjcmVlbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuX2Z1bGxTY3JlZW5cbiAgICB9XG4gICAgXG4gICAgLy90b2RvIG1ha2UgaW50byBnZXR0ZXIgLyBzZXR0ZXIgP1xuICAgIHNldFNjZW5lKHNjZW5lKSB7XG4gICAgICAgIHRoaXMuc2NlbmUgPSBzY2VuZVxuICAgIH1cbiAgICBcbiAgICBzZXRDYW1lcmEoY2FtZXJhLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhXG4gICAgfVxuICAgIFxuICAgIHNldFNpemUod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNGdWxsU2NyZWVuKCkpIHtcblx0XHQgICAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gKHdpZHRoIHx8IDUwMCkgLyAoaGVpZ2h0IHx8IDUwMClcbiAgICBcdH1cblx0XHRcblx0XHR0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KClcblx0XHRcblx0XHRpZiAoIXRoaXMuaXNGdWxsU2NyZWVuKCkpIHtcblx0ICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUod2lkdGggfHwgNTAwLCBoZWlnaHQgfHwgNTAwKVxuXHRcdH1cbiAgICB9XG4gICAgXG4gICAgZ2V0RG9tKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5kb21FbGVtZW50XG4gICAgfVxuICAgIFxuICAgIGdldFNjZW5lKCkgOiB0aHJlZS5TY2VuZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjZW5lO1xuICAgIH1cbiAgICBcbiAgICBnZXRHZW9tZXRyeShrZXkgOiBzdHJpbmcpIDogdGhyZWUuR2VvbWV0cnkge1xuICAgICAgICByZXR1cm4gZ2VvbWV0cmllcy5nZXQoa2V5KTtcbiAgICB9XG4gICAgXG4gICAgZ2V0TWF0ZXJpYWwoa2V5IDogc3RyaW5nKSA6IHRocmVlLk1hdGVyaWFsIHtcbiAgICAgICAgcmV0dXJuIG1hdGVyaWFscy5nZXQoa2V5KTtcbiAgICB9XG4gICAgXG4gICAgYWRkTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpIHtcbiAgICAgICAgdmFyIGdlbyA9IHRoaXMuZ2VvbWV0cmllcy5nZXQoZ2VvbWV0cnkpO1xuICAgICAgICB2YXIgbWF0ID0gdGhpcy5tYXRlcmlhbHMuZ2V0KG1hdGVyaWFsKTtcbiAgICAgICAgdmFyIG1lc2ggPSBuZXcgdGhyZWUuTWVzaChnZW8sIG1hdCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNjZW5lLmFkZChtZXNoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBtZXNoO1xuICAgIH1cbiAgICBcbiAgICByZW5kZXIoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UgOiBudW1iZXIpIDogdm9pZCB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhKTtcbiAgICB9XG4gICAgXG4gICAgLy8gcmVuZGVyKHNjZW5lIDogdGhyZWUuU2NlbmUsIGludGVycG9sYXRpb25QZXJjZW50YWdlIDogbnVtYmVyKSA6IHZvaWQge1xuICAgIC8vICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcihzY2VuZSwgdGhpcy5jYW1lcmEpO1xuICAgIC8vIH1cbn1cbiIsImltcG9ydCBFbnRpdHlNYW5hZ2VyICAgICAgICAgZnJvbSAnZ2ctZW50aXRpZXMnXG5pbXBvcnQgTWFpbkxvb3BMb29wTWFuYWdlciAgIGZyb20gJy4uL2xvZ2ljL21haW5sb29wLWxvb3AtbWFuYWdlcidcbi8vIGltcG9ydCBGZXRjaEZpbGVMb2FkZXIgICAgICAgZnJvbSAnLi4vbG9naWMvZmV0Y2gtZmlsZS1sb2FkZXInXG5pbXBvcnQgVGhyZWVPYmplY3RNZXNoTG9hZGVyIGZyb20gJy4uL2xvZ2ljL3RocmVlLW9iamVjdC1tZXNoLWxvYWRlcidcblxuaW1wb3J0IFRocmVlUmVuZGVyZXJNYW5hZ2VyIGZyb20gJy4uL3ZpZXcvdGhyZWUtcmVuZGVyZXItbWFuYWdlcidcblxuY29uc3QgX2xvb3BNYW5hZ2VyICAgICA9IG5ldyBNYWluTG9vcExvb3BNYW5hZ2VyKClcbi8vIGNvbnN0IF9maWxlTG9hZGVyICAgICAgPSBuZXcgRmV0Y2hGaWxlTG9hZGVyKClcbmNvbnN0IF9sb2FkZXIgICAgICAgICAgPSBuZXcgVGhyZWVPYmplY3RNZXNoTG9hZGVyKClcbmNvbnN0IF9yZW5kZXJlck1hbmFnZXIgPSBuZXcgVGhyZWVSZW5kZXJlck1hbmFnZXIoKVxuY29uc3QgX2VudGl0eU1hbmFnZXIgICA9IG5ldyBFbnRpdHlNYW5hZ2VyKClcblxuY29uc3QgbG9vcE1hbmFnZXIgICAgID0gKCkgPT4gX2xvb3BNYW5hZ2VyXG4vLyBjb25zdCBmaWxlTG9hZGVyICAgICAgPSAoKSA9PiBfZmlsZUxvYWRlclxuY29uc3QgbG9hZGVyICAgICAgICAgID0gKCkgPT4gX2xvYWRlclxuY29uc3QgcmVuZGVyZXJNYW5hZ2VyID0gKCkgPT4gX3JlbmRlcmVyTWFuYWdlclxuY29uc3QgZW50aXR5TWFuYWdlciAgID0gKCkgPT4gX2VudGl0eU1hbmFnZXJcblxuZXhwb3J0IGRlZmF1bHQge2xvb3BNYW5hZ2VyLCBsb2FkZXIsIHJlbmRlcmVyTWFuYWdlciwgZW50aXR5TWFuYWdlcn1cbmV4cG9ydCB7bG9vcE1hbmFnZXIsIGxvYWRlciwgcmVuZGVyZXJNYW5hZ2VyLCBlbnRpdHlNYW5hZ2VyfSIsIi8vIC8qIEBmbG93ICovXG5cbmltcG9ydCBESSBmcm9tICcuL0RJL2Jyb3dzZXInXG5cbmNvbnN0IENPTVBPTkVOVCA9IHtcbiAgICBUUkFOU0ZPUk06ICd0cmFuc2Zvcm0nLFxuICAgIEFQUEVBUkFOQ0U6ICdhcHBlYXJhbmNlJ1xufVxuXG5jb25zdCBTWVNURU0gPSB7XG4gICAgUkVOREVSOiAncmVuZGVyJ1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHRyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgXHQvLyB3aWR0aCBhbmQgaGVpZ2h0IHNldCB0byA1MDAganVzdCB0byBoYXZlIGl0IGFzIGluIHRoZSBlZGl0b3IgZm9yIHRoZSB0aW1lIGJlaW5nXG4gICAgXHR0aGlzLndpZHRoICA9IDUwMFxuICAgIFx0dGhpcy5oZWlnaHQgPSA1MDBcbiAgICBcdFxuICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIgICA9IERJLmVudGl0eU1hbmFnZXIoKVxuICAgICAgICB0aGlzLmxvb3BNYW5hZ2VyICAgICA9IERJLmxvb3BNYW5hZ2VyKClcbiAgICAgICAgdGhpcy5yZW5kZXJlck1hbmFnZXIgPSBESS5yZW5kZXJlck1hbmFnZXIoKVxuICAgICAgICB0aGlzLmxvYWRlclx0XHRcdCA9IERJLmxvYWRlcigpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmRvbSA9IHRoaXMucmVuZGVyZXJNYW5hZ2VyLmdldERvbSgpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmluaXRDb21wb25lbnRzKClcbiAgICAgICAgdGhpcy5pbml0U3lzdGVtcygpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIub25Jbml0KHtyZW5kZXJNYW5hZ2VyOiB0aGlzLnJlbmRlcmVyTWFuYWdlcn0pXG4gICAgICAgIFxuICAgICAgICB0aGlzLmxvb3BNYW5hZ2VyLnNldFVwZGF0ZShkZWx0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIub25Mb2dpYyhkZWx0YSlcbiAgICAgICAgfSkuc2V0UmVuZGVyKGludGVycG9sYXRpb25QZXJjZW50YWdlID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5TWFuYWdlci5vblJlbmRlcih7ZGVsdGEgOiBpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSwgcmVuZGVyTWFuYWdlcjogdGhpcy5yZW5kZXJlck1hbmFnZXJ9KVxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlck1hbmFnZXIucmVuZGVyKGludGVycG9sYXRpb25QZXJjZW50YWdlKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGluaXRDb21wb25lbnRzKCkge1xuICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIucmVnaXN0ZXJDb21wb25lbnQoQ09NUE9ORU5ULlRSQU5TRk9STSwgIHt4OiAwLCB5OiAwLCB6OiAwfSlcbiAgICAgICAgdGhpcy5lbnRpdHlNYW5hZ2VyLnJlZ2lzdGVyQ29tcG9uZW50KENPTVBPTkVOVC5BUFBFQVJBTkNFLCB7aWQ6IDB9KVxuICAgIH1cbiAgICBcbiAgICBpbml0U3lzdGVtcygpIHtcbiAgICAgICAgY29uc3QgcmVuZGVyQ29tcG9uZW50cyA9IFtcbiAgICAgICAgICAgIENPTVBPTkVOVC5UUkFOU0ZPUk0sXG4gICAgICAgICAgICBDT01QT05FTlQuQVBQRUFSQU5DRVxuICAgICAgICBdXG4gICAgICAgIFxuICAgICAgICBjb25zdCByZW5kZXIgPSAoZW50aXRpZXMsIHtyZW5kZXJNYW5hZ2VyfSkgPT4ge1xuICAgICAgICAgICAgZm9yIChjb25zdCB7ZW50aXR5fSBvZiBlbnRpdGllcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHthcHBlYXJhbmNlLCB0cmFuc2Zvcm19ID0gZW50aXR5XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3Qgb2JqID0gcmVuZGVyTWFuYWdlci5zY2VuZS5nZXRPYmplY3RCeUlkKGFwcGVhcmFuY2UuaWQpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIG9iai5wb3NpdGlvbi54ID0gdHJhbnNmb3JtLnhcbiAgICAgICAgICAgICAgICBvYmoucG9zaXRpb24ueSA9IHRyYW5zZm9ybS55XG4gICAgICAgICAgICAgICAgb2JqLnBvc2l0aW9uLnogPSB0cmFuc2Zvcm0uelxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIucmVnaXN0ZXJSZW5kZXJTeXN0ZW0oU1lTVEVNLlJFTkRFUiwgcmVuZGVyQ29tcG9uZW50cywgcmVuZGVyKVxuICAgIH1cbiAgICBcbiAgICBpbml0RW50aXRpZXMocGFyc2VkU2NlbmUpIHtcbiAgICAgICAgcGFyc2VkU2NlbmUudHJhdmVyc2UoKG9iaikgPT4ge1xuXHRcdCAgICBjb25zdCB7Y29tcG9uZW50c30gPSBvYmoudXNlckRhdGFcblx0XHQgICAgXG5cdFx0XHRsZXQgY29uZmlnID0gdGhpcy5lbnRpdHlNYW5hZ2VyLmJ1aWxkKClcblx0XHRcdCAgICBcblx0XHQgICAgY29uZmlnLndpdGhDb21wb25lbnQoQ09NUE9ORU5ULlRSQU5TRk9STSwgZnVuY3Rpb24oKSB7XG5cdFx0ICAgICAgICB0aGlzLnggPSBvYmoucG9zaXRpb24ueFxuXHRcdCAgICAgICAgdGhpcy55ID0gb2JqLnBvc2l0aW9uLnlcblx0XHQgICAgICAgIHRoaXMueiA9IG9iai5wb3NpdGlvbi56XG5cdCAgICAgICAgfSlcblx0ICAgICAgICBcblx0ICAgICAgICAvL3RvZG86IG1ha2Ugb25seSB2aXNpYmxlIG9iamVjdHMgZ2V0IHRoaXNcblx0ICAgICAgICBpZiAob2JqLmlkICYmIG9iai52aXNpYmxlKSB7XG5cdCAgICAgICAgICAgIGNvbmZpZy53aXRoQ29tcG9uZW50KENPTVBPTkVOVC5BUFBFQVJBTkNFLCBmdW5jdGlvbigpIHtcbiAgICBcdCAgICAgICAgICAgdGhpcy5pZCA9IG9iai5pZFxuICAgIFx0ICAgICAgICB9KVxuXHQgICAgICAgIH1cblx0ICAgICAgICBcblx0XHRcdGlmIChjb21wb25lbnRzKSB7XG5cdFx0XHQgICAgZm9yIChjb25zdCB7a2V5LCBkYXRhfSBvZiBjb21wb25lbnRzKSB7XG5cdFx0XHQgICAgICAgIGlmIChkYXRhID09IG51bGwpIHtcblx0XHRcdCAgICAgICAgICAgIGNvbmZpZy53aXRoQ29tcG9uZW50KGtleSlcblx0XHRcdCAgICAgICAgfSBlbHNlIHtcblx0XHRcdCAgICAgICAgICAgIGNvbmZpZy53aXRoQ29tcG9uZW50KGtleSwgZnVuY3Rpb24oKSB7XG4gICAgXHRcdCAgICAgICAgICAgICAgICAvLyB0b2RvIGhhbmRsZSBub24tb2JqZWN0c1xuICAgIFx0XHQgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaChrZXkgPT4ge1xuICAgIFx0XHQgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzW2tleV0gPT0gbnVsbCB8fCBkYXRhW2tleV0gPT0gbnVsbCkge1xuICAgIFx0XHQgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICBcdFx0ICAgICAgICAgICAgICAgICAgICB9XG4gICAgXHRcdCAgICAgICAgICAgICAgICAgICAgXG4gICAgXHRcdCAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gZGF0YVtrZXldXG4gICAgXHRcdCAgICAgICAgICAgICAgICB9LCB0aGlzKVxuICAgIFx0XHQgICAgICAgICAgICB9KVxuXHRcdFx0ICAgICAgICB9XG5cdFx0XHQgICAgfVxuXHRcdFx0ICAgIFxuXHRcdFx0ICAgIG9iai51c2VyRGF0YS5lbnRpdHlJZCA9IGNvbmZpZy5jcmVhdGUoMSlcblx0XHRcdH1cblx0XHR9KVxuICAgIH1cbiAgICBcbiAgICBsb2FkKHtwcm9qZWN0LCBzY2VuZSwgY2FtZXJhfSkge1xuICAgICAgICBjb25zdCBwYXJzZWRTY2VuZSA9IHRoaXMubG9hZGVyLnBhcnNlKHNjZW5lKVxuICAgICAgICBjb25zdCBwYXJzZWRDYW1lcmEgPSB0aGlzLmxvYWRlci5wYXJzZShjYW1lcmEpXG5cdFx0XG5cdFx0dGhpcy5pbml0RW50aXRpZXMocGFyc2VkU2NlbmUpXG5cbiAgICBcdGlmIChwcm9qZWN0LnNoYWRvd3MpIHtcblx0XHRcdHRoaXMucmVuZGVyZXJNYW5hZ2VyLmVuYWJsZVNoYWRvd3MoKVxuXHRcdH1cblx0XHRcbiAgICBcdC8vdG9kbzogY2hlY2sgZm9yIGNhbWVyYSBhbmQgc2NlbmUgZmlyc3Q/IHRocm93IGlmIG5vdD9cbiAgICBcdHRoaXMucmVuZGVyZXJNYW5hZ2VyLnNldFNjZW5lKHBhcnNlZFNjZW5lKVxuICAgIFx0dGhpcy5yZW5kZXJlck1hbmFnZXIuc2V0Q2FtZXJhKHBhcnNlZENhbWVyYSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpXG5cdH1cbiAgICBcbiAgICBzZXRTaXplKHdpZHRoLCBoZWlnaHQpICB7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aFxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodFxuICAgICAgICBcbiAgICAgICAgdGhpcy5yZW5kZXJlck1hbmFnZXIuc2V0U2l6ZSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcbiAgICB9XG4gICAgXG4gICAgZ2V0RG9tKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJlck1hbmFnZXIuZ2V0RG9tKClcbiAgICB9XG4gICAgXG4gICAgcGxheSgpIHtcbiAgICAgICAgdGhpcy5sb29wTWFuYWdlci5zdGFydCgpXG4gICAgfVxuICAgIFxuICAgIHN0b3AoKSB7XG4gICAgICAgIHRoaXMubG9vcE1hbmFnZXIuc3RvcCgpXG4gICAgfVxufSJdLCJuYW1lcyI6WyJ0aGlzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxFQUFBLENBQUMsVUFBVSxNQUFNLEVBQUUsT0FBTyxFQUFFO01BQ3hCLE9BQU8sT0FBTyxLQUFLLFFBQVEsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztNQUMvRSxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksTUFBTSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxDQUFDO09BQ3RGLE9BQU8sRUFBRSxNQUFNLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztHQUM1RCxDQUFDQSxpQkFBSSxFQUFFLFVBQVUsT0FBTyxFQUFFLEVBQUUsWUFBWSxDQUFDOztNQUV0QyxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7TUFDdEIsWUFBWSxDQUFDLE1BQU0sR0FBRyxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksT0FBTyxNQUFNLENBQUMsUUFBUSxLQUFLLFFBQVEsR0FBRyxVQUFVLEdBQUcsRUFBRTtRQUN6RyxPQUFPLE9BQU8sR0FBRyxDQUFDO09BQ25CLEdBQUcsVUFBVSxHQUFHLEVBQUU7UUFDakIsT0FB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QyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxPQUFPLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLE9BQU8sTUFBTSxFQUFFLElBQUksR0FBRyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDQSxpQkFBSSxDQUFDLENBQUM7Ozs7O0VDd0V2eEMsSUFBSSxjQUFjLEdBQUcsVUFBVSxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQzdELEVBQUEsRUFBRSxJQUFJLENBQUMsQ0FBQyxRQUFRLFlBQVksV0FBVyxDQUFDLEVBQUU7QUFDMUMsRUFBQSxJQUFJLE1BQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztBQUM3RCxFQUFBLEdBQUc7QUFDSCxFQUFBLENBQUMsQ0FBQzs7QUFFRixFQUFPLElBQUksV0FBVyxHQUFHLFlBQVk7QUFDckMsRUFBQSxFQUFFLFNBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUMzQyxFQUFBLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDM0MsRUFBQSxNQUFNLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQyxFQUFBLE1BQU0sVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQztBQUM3RCxFQUFBLE1BQU0sVUFBVSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7QUFDckMsRUFBQSxNQUFNLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztBQUM1RCxFQUFBLE1BQU0sTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUNoRSxFQUFBLEtBQUs7QUFDTCxFQUFBLEdBQUc7O0FBRUgsRUFBQSxFQUFFLE9BQU8sVUFBVSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRTtBQUN6RCxFQUFBLElBQUksSUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUN4RSxFQUFBLElBQUksSUFBSSxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ2hFLEVBQUEsSUFBSSxPQUFPLFdBQVcsQ0FBQztBQUN2QixFQUFBLEdBQUcsQ0FBQztBQUNKLEVBQUEsQ0FBQyxFQUFFLENBQUM7O01DakdpQjs7Ozs7Ozs7O29DQUVQLGNBQWM7QUFDcEIsRUFBQSxxQkFBUyxTQUFULENBQW1CLFlBQW5COztBQUVBLEVBQUEsbUJBQU8sSUFBUDtBQUNILEVBQUE7OztvQ0FFUyxjQUFpRjtBQUN2RixFQUFBLHFCQUFTLE9BQVQsQ0FBaUIsWUFBakI7O0FBRUEsRUFBQSxtQkFBTyxJQUFQO0FBQ0gsRUFBQTs7O2tDQUVjO0FBQ1gsRUFBQSxxQkFBUyxLQUFUO0FBQ0gsRUFBQTs7O2lDQUVhO0FBQ1YsRUFBQSxxQkFBUyxJQUFUO0FBQ0gsRUFBQTs7Ozs7TUNwQmdCO0FBR2pCLEVBQUEscUNBQWM7QUFBQSxFQUFBOztBQUNWLEVBQUEsYUFBSyxNQUFMLEdBQWUsSUFBSSxNQUFNLFlBQVYsRUFBZjtBQUNILEVBQUE7Ozs7dUNBRVk7O0FBRVosRUFBQTs7O2dDQUVLLE1BQU07QUFDUixFQUFBLG1CQUFPLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsSUFBbEIsQ0FBUDtBQUNILEVBQUE7Ozs7Ozs7K0JBSUksTUFBZSxTQUE2QjtBQUM3QyxFQUFBLGdCQUFNLE9BQU8sSUFBYjs7QUFFQSxFQUFBLGdCQUFNLFVBQVUsQ0FBQyxXQUFXLEVBQVosRUFBaUIsT0FBakM7O0FBRUEsRUFBQSxtQkFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQ3BDLEVBQUEsb0JBQUk7QUFDQSxFQUFBLHlCQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLElBQWpCLEVBQXVCO0FBQUEsRUFBQSwrQkFBTyxRQUFRLEdBQVIsQ0FBUDtBQUFBLEVBQUEscUJBQXZCLEVBQTRDO0FBQUEsRUFBQSwrQkFBUSxLQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBUjtBQUFBLEVBQUEscUJBQTVDLEVBQTJFO0FBQUEsRUFBQSwrQkFBTyxPQUFPLEdBQVAsQ0FBUDtBQUFBLEVBQUEscUJBQTNFO0FBQ0gsRUFBQSxpQkFGRCxDQUVFLE9BQU8sS0FBUCxFQUFjO0FBQ1osRUFBQSwyQkFBTyxLQUFQO0FBQ0gsRUFBQTtBQUNKLEVBQUEsYUFOTSxFQU1KLElBTkksQ0FNQyxnQkFBUTtBQUNaLEVBQUEsb0JBQUksT0FBTyxPQUFQLEtBQW1CLFFBQXZCLEVBQWlDO0FBQzdCLEVBQUEsMkJBQU8sSUFBUDtBQUNILEVBQUE7O0FBRUQsRUFBQSxxQkFBSyxRQUFMLENBQWMsaUJBQVM7QUFDbkIsRUFBQSx3QkFBSSxpQkFBaUIsTUFBTSxJQUEzQixFQUFpQztBQUM5QixFQUFBLDhCQUFNLFFBQU4sQ0FBZSxPQUFmLEdBQXlCLE9BQXpCO0FBQ0gsRUFBQTtBQUNILEVBQUEsaUJBSkQ7O0FBTUEsRUFBQSx1QkFBTyxJQUFQO0FBQ0gsRUFBQSxhQWxCTSxFQWtCSixLQWxCSSxDQWtCRSxlQUFPO0FBQ1osRUFBQSx3QkFBUSxJQUFSLENBQWEsR0FBYjtBQUNILEVBQUEsYUFwQk0sQ0FBUDtBQXFCSCxFQUFBOzs7OztNQzNDZ0I7Ozs7QUFNakIsRUFBQSxvQ0FBYztBQUFBLEVBQUE7O0FBQ1YsRUFBQSxhQUFLLFFBQUwsR0FBZ0IsSUFBSSxNQUFNLGFBQVYsQ0FBd0IsRUFBRSxXQUFZLElBQWQsRUFBeEIsQ0FBaEI7QUFDTixFQUFBLGFBQUssUUFBTCxDQUFjLGFBQWQsQ0FBNkIsUUFBN0I7QUFDQSxFQUFBLGFBQUssUUFBTCxDQUFjLGFBQWQsQ0FBNkIsT0FBTyxnQkFBcEM7QUFDRyxFQUFBOzs7OzBDQUVlO0FBQ1osRUFBQSxpQkFBSyxRQUFMLENBQWMsU0FBZCxDQUF3QixPQUF4QixHQUFrQyxJQUFsQztBQUNILEVBQUE7Ozt5Q0FFYztBQUNYLEVBQUEsbUJBQU8sS0FBSyxRQUFMLENBQWMsV0FBckI7QUFDSCxFQUFBOzs7Ozs7bUNBR1EsT0FBTztBQUNaLEVBQUEsaUJBQUssS0FBTCxHQUFhLEtBQWI7QUFDSCxFQUFBOzs7b0NBRVMsUUFBUSxPQUFPLFFBQVE7QUFDN0IsRUFBQSxpQkFBSyxNQUFMLEdBQWMsTUFBZDtBQUNILEVBQUE7OztrQ0FFTyxPQUFPLFFBQVE7QUFDbkIsRUFBQSxnQkFBSSxDQUFDLEtBQUssWUFBTCxFQUFMLEVBQTBCO0FBQzVCLEVBQUEscUJBQUssTUFBTCxDQUFZLE1BQVosR0FBcUIsQ0FBQyxTQUFTLEdBQVYsS0FBa0IsVUFBVSxHQUE1QixDQUFyQjtBQUNBLEVBQUE7O0FBRUosRUFBQSxpQkFBSyxNQUFMLENBQVksc0JBQVo7O0FBRUEsRUFBQSxnQkFBSSxDQUFDLEtBQUssWUFBTCxFQUFMLEVBQTBCO0FBQ25CLEVBQUEscUJBQUssUUFBTCxDQUFjLE9BQWQsQ0FBc0IsU0FBUyxHQUEvQixFQUFvQyxVQUFVLEdBQTlDO0FBQ04sRUFBQTtBQUNFLEVBQUE7OzttQ0FFUTtBQUNMLEVBQUEsbUJBQU8sS0FBSyxRQUFMLENBQWMsVUFBckI7QUFDSCxFQUFBOzs7cUNBRXdCO0FBQ3JCLEVBQUEsbUJBQU8sS0FBSyxLQUFaO0FBQ0gsRUFBQTs7O3NDQUVXLEtBQStCO0FBQ3ZDLEVBQUEsbUJBQU8sV0FBVyxHQUFYLENBQWUsR0FBZixDQUFQO0FBQ0gsRUFBQTs7O3NDQUVXLEtBQStCO0FBQ3ZDLEVBQUEsbUJBQU8sVUFBVSxHQUFWLENBQWMsR0FBZCxDQUFQO0FBQ0gsRUFBQTs7O2tDQUVPLFVBQVUsVUFBVTtBQUN4QixFQUFBLGdCQUFJLE1BQU0sS0FBSyxVQUFMLENBQWdCLEdBQWhCLENBQW9CLFFBQXBCLENBQVY7QUFDQSxFQUFBLGdCQUFJLE1BQU0sS0FBSyxTQUFMLENBQWUsR0FBZixDQUFtQixRQUFuQixDQUFWO0FBQ0EsRUFBQSxnQkFBSSxPQUFPLElBQUksTUFBTSxJQUFWLENBQWUsR0FBZixFQUFvQixHQUFwQixDQUFYOztBQUVBLEVBQUEsaUJBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxJQUFmOztBQUVBLEVBQUEsbUJBQU8sSUFBUDtBQUNILEVBQUE7OztpQ0FFTSx5QkFBeUM7QUFDNUMsRUFBQSxpQkFBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixLQUFLLEtBQTFCLEVBQWlDLEtBQUssTUFBdEM7QUFDSCxFQUFBOzs7Ozs7Ozs7O0VDbEVMLElBQU0sZUFBbUIsSUFBSSxtQkFBSixFQUF6Qjs7QUFFQSxFQUFBLElBQU0sVUFBbUIsSUFBSSxxQkFBSixFQUF6QjtBQUNBLEVBQUEsSUFBTSxtQkFBbUIsSUFBSSxvQkFBSixFQUF6QjtBQUNBLEVBQUEsSUFBTSxpQkFBbUIsSUFBSSxhQUFKLEVBQXpCOztBQUVBLEVBQUEsSUFBTSxjQUFrQixTQUFsQixXQUFrQjtBQUFBLEVBQUEsU0FBTSxZQUFOO0FBQUEsRUFBQSxDQUF4Qjs7QUFFQSxFQUFBLElBQU0sU0FBa0IsU0FBbEIsTUFBa0I7QUFBQSxFQUFBLFNBQU0sT0FBTjtBQUFBLEVBQUEsQ0FBeEI7QUFDQSxFQUFBLElBQU0sa0JBQWtCLFNBQWxCLGVBQWtCO0FBQUEsRUFBQSxTQUFNLGdCQUFOO0FBQUEsRUFBQSxDQUF4QjtBQUNBLEVBQUEsSUFBTSxnQkFBa0IsU0FBbEIsYUFBa0I7QUFBQSxFQUFBLFNBQU0sY0FBTjtBQUFBLEVBQUEsQ0FBeEI7O0FBRUEsV0FBZSxFQUFDLHdCQUFELEVBQWMsY0FBZCxFQUFzQixnQ0FBdEIsRUFBdUMsNEJBQXZDLEVBQWY7O0VDZkEsSUFBTSxZQUFZO0FBQ2QsRUFBQSxlQUFXLFdBREc7QUFFZCxFQUFBLGdCQUFZO0FBRkUsRUFBQSxDQUFsQjs7QUFLQSxFQUFBLElBQU0sU0FBUztBQUNYLEVBQUEsWUFBUTtBQURHLEVBQUEsQ0FBZjs7TUFJcUI7QUFDakIsRUFBQSxrQkFBYztBQUFBLEVBQUE7O0FBQUEsRUFBQTs7O0FBRWIsRUFBQSxhQUFLLEtBQUwsR0FBYyxHQUFkO0FBQ0EsRUFBQSxhQUFLLE1BQUwsR0FBYyxHQUFkOztBQUVHLEVBQUEsYUFBSyxhQUFMLEdBQXVCLEdBQUcsYUFBSCxFQUF2QjtBQUNBLEVBQUEsYUFBSyxXQUFMLEdBQXVCLEdBQUcsV0FBSCxFQUF2QjtBQUNBLEVBQUEsYUFBSyxlQUFMLEdBQXVCLEdBQUcsZUFBSCxFQUF2QjtBQUNBLEVBQUEsYUFBSyxNQUFMLEdBQWlCLEdBQUcsTUFBSCxFQUFqQjs7QUFFQSxFQUFBLGFBQUssR0FBTCxHQUFXLEtBQUssZUFBTCxDQUFxQixNQUFyQixFQUFYOztBQUVBLEVBQUEsYUFBSyxjQUFMO0FBQ0EsRUFBQSxhQUFLLFdBQUw7O0FBRUEsRUFBQSxhQUFLLGFBQUwsQ0FBbUIsTUFBbkIsQ0FBMEIsRUFBQyxlQUFlLEtBQUssZUFBckIsRUFBMUI7O0FBRUEsRUFBQSxhQUFLLFdBQUwsQ0FBaUIsU0FBakIsQ0FBMkIsaUJBQVM7QUFDaEMsRUFBQSxrQkFBSyxhQUFMLENBQW1CLE9BQW5CLENBQTJCLEtBQTNCO0FBQ0gsRUFBQSxTQUZELEVBRUcsU0FGSCxDQUVhLG1DQUEyQjtBQUNwQyxFQUFBLGtCQUFLLGFBQUwsQ0FBbUIsUUFBbkIsQ0FBNEIsRUFBQyxPQUFRLHVCQUFULEVBQWtDLGVBQWUsTUFBSyxlQUF0RCxFQUE1QjtBQUNBLEVBQUEsa0JBQUssZUFBTCxDQUFxQixNQUFyQixDQUE0Qix1QkFBNUI7QUFDSCxFQUFBLFNBTEQ7QUFNSCxFQUFBOzs7OzJDQUVnQjtBQUNiLEVBQUEsaUJBQUssYUFBTCxDQUFtQixpQkFBbkIsQ0FBcUMsVUFBVSxTQUEvQyxFQUEyRCxFQUFDLEdBQUcsQ0FBSixFQUFPLEdBQUcsQ0FBVixFQUFhLEdBQUcsQ0FBaEIsRUFBM0Q7QUFDQSxFQUFBLGlCQUFLLGFBQUwsQ0FBbUIsaUJBQW5CLENBQXFDLFVBQVUsVUFBL0MsRUFBMkQsRUFBQyxJQUFJLENBQUwsRUFBM0Q7QUFDSCxFQUFBOzs7d0NBRWE7QUFDVixFQUFBLGdCQUFNLG1CQUFtQixDQUNyQixVQUFVLFNBRFcsRUFFckIsVUFBVSxVQUZXLENBQXpCOztBQUtBLEVBQUEsZ0JBQU0sU0FBUyxTQUFULE1BQVMsQ0FBQyxRQUFELFFBQStCO0FBQUEsRUFBQSxvQkFBbkIsYUFBbUIsUUFBbkIsYUFBbUI7QUFBQSxFQUFBO0FBQUEsRUFBQTtBQUFBLEVBQUE7O0FBQUEsRUFBQTtBQUMxQyxFQUFBLHlDQUF1QixRQUF2Qiw4SEFBaUM7QUFBQSxFQUFBLDRCQUFyQixNQUFxQixlQUFyQixNQUFxQjtBQUFBLEVBQUEsNEJBQ3RCLFVBRHNCLEdBQ0csTUFESCxDQUN0QixVQURzQjtBQUFBLEVBQUEsNEJBQ1YsU0FEVSxHQUNHLE1BREgsQ0FDVixTQURVOzs7QUFHN0IsRUFBQSw0QkFBTSxNQUFNLGNBQWMsS0FBZCxDQUFvQixhQUFwQixDQUFrQyxXQUFXLEVBQTdDLENBQVo7O0FBRUEsRUFBQSw0QkFBSSxRQUFRLFNBQVosRUFBdUI7QUFDbkIsRUFBQTtBQUNILEVBQUE7O0FBRUQsRUFBQSw0QkFBSSxRQUFKLENBQWEsQ0FBYixHQUFpQixVQUFVLENBQTNCO0FBQ0EsRUFBQSw0QkFBSSxRQUFKLENBQWEsQ0FBYixHQUFpQixVQUFVLENBQTNCO0FBQ0EsRUFBQSw0QkFBSSxRQUFKLENBQWEsQ0FBYixHQUFpQixVQUFVLENBQTNCO0FBQ0gsRUFBQTtBQWJ5QyxFQUFBO0FBQUEsRUFBQTtBQUFBLEVBQUE7QUFBQSxFQUFBO0FBQUEsRUFBQTtBQUFBLEVBQUE7QUFBQSxFQUFBO0FBQUEsRUFBQTtBQUFBLEVBQUE7QUFBQSxFQUFBO0FBQUEsRUFBQTtBQUFBLEVBQUE7QUFBQSxFQUFBO0FBQUEsRUFBQTtBQWM3QyxFQUFBLGFBZEQ7O0FBZ0JBLEVBQUEsaUJBQUssYUFBTCxDQUFtQixvQkFBbkIsQ0FBd0MsT0FBTyxNQUEvQyxFQUF1RCxnQkFBdkQsRUFBeUUsTUFBekU7QUFDSCxFQUFBOzs7dUNBRVksYUFBYTtBQUFBLEVBQUE7O0FBQ3RCLEVBQUEsd0JBQVksUUFBWixDQUFxQixVQUFDLEdBQUQsRUFBUztBQUFBLEVBQUEsb0JBQ3pCLFVBRHlCLEdBQ1gsSUFBSSxRQURPLENBQ3pCLFVBRHlCOzs7QUFHbkMsRUFBQSxvQkFBSSxTQUFTLE9BQUssYUFBTCxDQUFtQixLQUFuQixFQUFiOztBQUVHLEVBQUEsdUJBQU8sYUFBUCxDQUFxQixVQUFVLFNBQS9CLEVBQTBDLFlBQVc7QUFDakQsRUFBQSx5QkFBSyxDQUFMLEdBQVMsSUFBSSxRQUFKLENBQWEsQ0FBdEI7QUFDQSxFQUFBLHlCQUFLLENBQUwsR0FBUyxJQUFJLFFBQUosQ0FBYSxDQUF0QjtBQUNBLEVBQUEseUJBQUssQ0FBTCxHQUFTLElBQUksUUFBSixDQUFhLENBQXRCO0FBQ0EsRUFBQSxpQkFKSjs7O0FBT0csRUFBQSxvQkFBSSxJQUFJLEVBQUosSUFBVSxJQUFJLE9BQWxCLEVBQTJCO0FBQ3ZCLEVBQUEsMkJBQU8sYUFBUCxDQUFxQixVQUFVLFVBQS9CLEVBQTJDLFlBQVc7QUFDbkQsRUFBQSw2QkFBSyxFQUFMLEdBQVUsSUFBSSxFQUFkO0FBQ0YsRUFBQSxxQkFGRDtBQUdILEVBQUE7O0FBRVAsRUFBQSxvQkFBSSxVQUFKLEVBQWdCO0FBQUEsRUFBQTtBQUFBLEVBQUE7QUFBQSxFQUFBOztBQUFBLEVBQUE7QUFBQSxFQUFBO0FBQUEsRUFBQTtBQUFBLEVBQUEsZ0NBQ0EsR0FEQSxnQkFDQSxHQURBO0FBQUEsRUFBQSxnQ0FDSyxJQURMLGdCQUNLLElBREw7O0FBRVIsRUFBQSxnQ0FBSSxRQUFRLElBQVosRUFBa0I7QUFDZCxFQUFBLHVDQUFPLGFBQVAsQ0FBcUIsR0FBckI7QUFDSCxFQUFBLDZCQUZELE1BRU87QUFDSCxFQUFBLHVDQUFPLGFBQVAsQ0FBcUIsR0FBckIsRUFBMEIsWUFBVztBQUFBLEVBQUE7OztBQUU5QixFQUFBLDJDQUFPLElBQVAsQ0FBWSxJQUFaLEVBQWtCLE9BQWxCLENBQTBCLGVBQU87QUFDN0IsRUFBQSw0Q0FBSSxPQUFLLEdBQUwsS0FBYSxJQUFiLElBQXFCLEtBQUssR0FBTCxLQUFhLElBQXRDLEVBQTRDO0FBQ3hDLEVBQUE7QUFDSCxFQUFBOztBQUVELEVBQUEsK0NBQUssR0FBTCxJQUFZLEtBQUssR0FBTCxDQUFaO0FBQ0gsRUFBQSxxQ0FORCxFQU1HLElBTkg7QUFPSCxFQUFBLGlDQVRKO0FBVUgsRUFBQTtBQWZPLEVBQUE7O0FBQ1osRUFBQSw4Q0FBMEIsVUFBMUIsbUlBQXNDO0FBQUEsRUFBQTtBQWVyQyxFQUFBO0FBaEJXLEVBQUE7QUFBQSxFQUFBO0FBQUEsRUFBQTtBQUFBLEVBQUE7QUFBQSxFQUFBO0FBQUEsRUFBQTtBQUFBLEVBQUE7QUFBQSxFQUFBO0FBQUEsRUFBQTtBQUFBLEVBQUE7QUFBQSxFQUFBO0FBQUEsRUFBQTtBQUFBLEVBQUE7QUFBQSxFQUFBOztBQWtCWixFQUFBLHdCQUFJLFFBQUosQ0FBYSxRQUFiLEdBQXdCLE9BQU8sTUFBUCxDQUFjLENBQWQsQ0FBeEI7QUFDSCxFQUFBO0FBQ0QsRUFBQSxhQXRDSztBQXVDSCxFQUFBOzs7c0NBRThCO0FBQUEsRUFBQSxnQkFBekIsT0FBeUIsU0FBekIsT0FBeUI7QUFBQSxFQUFBLGdCQUFoQixLQUFnQixTQUFoQixLQUFnQjtBQUFBLEVBQUEsZ0JBQVQsTUFBUyxTQUFULE1BQVM7O0FBQzNCLEVBQUEsZ0JBQU0sY0FBYyxLQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLEtBQWxCLENBQXBCO0FBQ0EsRUFBQSxnQkFBTSxlQUFlLEtBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsTUFBbEIsQ0FBckI7O0FBRU4sRUFBQSxpQkFBSyxZQUFMLENBQWtCLFdBQWxCOztBQUVHLEVBQUEsZ0JBQUksUUFBUSxPQUFaLEVBQXFCO0FBQ3ZCLEVBQUEscUJBQUssZUFBTCxDQUFxQixhQUFyQjtBQUNBLEVBQUE7OztBQUdFLEVBQUEsaUJBQUssZUFBTCxDQUFxQixRQUFyQixDQUE4QixXQUE5QjtBQUNBLEVBQUEsaUJBQUssZUFBTCxDQUFxQixTQUFyQixDQUErQixZQUEvQixFQUE2QyxLQUFLLEtBQWxELEVBQXlELEtBQUssTUFBOUQ7QUFDSCxFQUFBOzs7a0NBRVUsT0FBTyxRQUFTO0FBQ3BCLEVBQUEsaUJBQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxFQUFBLGlCQUFLLE1BQUwsR0FBYyxNQUFkOztBQUVBLEVBQUEsaUJBQUssZUFBTCxDQUFxQixPQUFyQixDQUE2QixLQUFLLEtBQWxDLEVBQXlDLEtBQUssTUFBOUM7QUFDSCxFQUFBOzs7bUNBRVE7QUFDTCxFQUFBLG1CQUFPLEtBQUssZUFBTCxDQUFxQixNQUFyQixFQUFQO0FBQ0gsRUFBQTs7O2lDQUVNO0FBQ0gsRUFBQSxpQkFBSyxXQUFMLENBQWlCLEtBQWpCO0FBQ0gsRUFBQTs7O2lDQUVNO0FBQ0gsRUFBQSxpQkFBSyxXQUFMLENBQWlCLElBQWpCO0FBQ0gsRUFBQTs7Ozs7OzsifQ==