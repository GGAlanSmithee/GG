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

          this.entityManager.onInit({ renderManager: this.rendererManager });

          this.loopManager.setUpdate(function (delta) {
              _this.entityManager.onLogic(delta);
          }).setRender(function (interpolationPercentage) {
              _this.entityManager.onRender({ delta: interpolationPercentage, renderManager: _this.rendererManager });
              _this.rendererManager.render(interpolationPercentage);
          });
      }

      createClass(GG, [{
          key: 'initEntities',
          value: function initEntities(parsedScene) {
              var _this2 = this;

              parsedScene.traverse(function (obj) {
                  var components = obj.userData.components;


                  var config = _this2.entityManager.build();

                  config.withComponent('transform', function () {
                      this.x = obj.position.x;
                      this.y = obj.position.y;
                      this.z = obj.position.z;
                  });

                  if (obj.id) {
                      config.withComponent('appearance', function () {
                          this.id = obj.id;
                      });
                  }

                  if (components) {
                      var _iteratorNormalCompletion = true;
                      var _didIteratorError = false;
                      var _iteratorError = undefined;

                      try {
                          for (var _iterator = components[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                              var _step$value = _step.value;
                              var key = _step$value.key;
                              var data = _step$value.data;

                              //   config.withComponent(key, data)
                              config.withComponent(key);
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

                      obj.userData.entityId = config.create(1);
                  }
              });
          }
      }, {
          key: 'load',
          value: function load(_ref) {
              var project = _ref.project;
              var scene = _ref.scene;
              var camera = _ref.camera;

              console.log('loading...');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2cuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9kaXN0L2dnLWVudGl0aWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL21haW5sb29wLmpzL2J1aWxkL21haW5sb29wLm1pbi5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL19fYmFiZWxIZWxwZXJzX18iLCIuLi9zcmMvbG9naWMvbWFpbmxvb3AtbG9vcC1tYW5hZ2VyLmpzIiwiLi4vc3JjL2xvZ2ljL3RocmVlLW9iamVjdC1tZXNoLWxvYWRlci5qcyIsIi4uL3NyYy92aWV3L3RocmVlLXJlbmRlcmVyLW1hbmFnZXIuanMiLCIuLi9zcmMvREkvYnJvd3Nlci5qcyIsIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cykgOlxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZSgnR0dFbnRpdGllcycsIFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6XG4gICAgKGZhY3RvcnkoKGdsb2JhbC5HR0VudGl0aWVzID0gZ2xvYmFsLkdHRW50aXRpZXMgfHwge30pKSk7XG59KHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxuICAgIHZhciBiYWJlbEhlbHBlcnMgPSB7fTtcbiAgICBiYWJlbEhlbHBlcnMudHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgICB9IDogZnVuY3Rpb24gKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgICB9O1xuXG4gICAgYmFiZWxIZWxwZXJzLmNsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICAgICAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgYmFiZWxIZWxwZXJzLmNyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICAgICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICAgICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgICAgIH07XG4gICAgfSgpO1xuXG4gICAgYmFiZWxIZWxwZXJzLnNsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkge1xuICAgICAgICB2YXIgX2FyciA9IFtdO1xuICAgICAgICB2YXIgX24gPSB0cnVlO1xuICAgICAgICB2YXIgX2QgPSBmYWxzZTtcbiAgICAgICAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgX2QgPSB0cnVlO1xuICAgICAgICAgIF9lID0gZXJyO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBfYXJyO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICAgICAgcmV0dXJuIGFycjtcbiAgICAgICAgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHtcbiAgICAgICAgICByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0oKTtcblxuICAgIGJhYmVsSGVscGVycy50b0NvbnN1bWFibGVBcnJheSA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgYXJyMltpXSA9IGFycltpXTtcblxuICAgICAgICByZXR1cm4gYXJyMjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKGFycik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGJhYmVsSGVscGVycztcblxuICAgIHZhciBFbnRpdHlGYWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBFbnRpdHlGYWN0b3J5KCkge1xuICAgICAgICAgICAgYmFiZWxIZWxwZXJzLmNsYXNzQ2FsbENoZWNrKHRoaXMsIEVudGl0eUZhY3RvcnkpO1xuXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVycyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IG5ldyBNYXAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJhYmVsSGVscGVycy5jcmVhdGVDbGFzcyhFbnRpdHlGYWN0b3J5LCBbe1xuICAgICAgICAgICAga2V5OiAncmVnaXN0ZXJJbml0aWFsaXplcicsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVnaXN0ZXJJbml0aWFsaXplcihrZXksIGluaXRpYWxpemVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnIHx8IGtleSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdrZXkgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcuJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2luaXRpYWxpemVyIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVycy5zZXQoa2V5LCBpbml0aWFsaXplcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ2J1aWxkJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBidWlsZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnd2l0aENvbXBvbmVudCcsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gd2l0aENvbXBvbmVudChrZXksIGluaXRpYWxpemVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnIHx8IGtleSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplciA9IHRoaXMuaW5pdGlhbGl6ZXJzLmdldChrZXkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5zZXQoa2V5LCBpbml0aWFsaXplcik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnY3JlYXRlQ29uZmlndXJhdGlvbicsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlQ29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdjcmVhdGUnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZShlbnRpdHlNYW5hZ2VyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAxIHx8IGFyZ3VtZW50c1sxXSA9PT0gdW5kZWZpbmVkID8gMSA6IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgICAgICB2YXIgY29uZmlndXJhdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMiB8fCBhcmd1bWVudHNbMl0gPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1syXTtcblxuICAgICAgICAgICAgICAgIGlmICghKGVudGl0eU1hbmFnZXIgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb24gfHwgdGhpcy5jb25maWd1cmF0aW9uO1xuXG4gICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudHMgPSBbXTtcblxuICAgICAgICAgICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBjb25maWd1cmF0aW9uLmtleXMoKVtTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb21wb25lbnQgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBlbnRpdGllcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfZW50aXR5TWFuYWdlciRuZXdFbnQgPSBlbnRpdHlNYW5hZ2VyLm5ld0VudGl0eShjb21wb25lbnRzKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgaWQgPSBfZW50aXR5TWFuYWdlciRuZXdFbnQuaWQ7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbnRpdHkgPSBfZW50aXR5TWFuYWdlciRuZXdFbnQuZW50aXR5O1xuXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlkID49IGVudGl0eU1hbmFnZXIuY2FwYWNpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IyID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gY29uZmlndXJhdGlvbltTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfc3RlcDIkdmFsdWUgPSBiYWJlbEhlbHBlcnMuc2xpY2VkVG9BcnJheShfc3RlcDIudmFsdWUsIDIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudCA9IF9zdGVwMiR2YWx1ZVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5pdGlhbGl6ZXIgPSBfc3RlcDIkdmFsdWVbMV07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGluaXRpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBpbml0aWFsaXplci5jYWxsKGVudGl0eVtjb21wb25lbnRdKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYWJlbEhlbHBlcnMudHlwZW9mKGVudGl0eVtjb21wb25lbnRdKSAhPT0gJ29iamVjdCcgJiYgcmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5W2NvbXBvbmVudF0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3JFcnJvcjIgPSBlcnI7XG4gICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMi5yZXR1cm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yMi5yZXR1cm4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGVudGl0aWVzLnB1c2goeyBpZDogaWQsIGVudGl0eTogZW50aXR5IH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBlbnRpdGllcy5sZW5ndGggPT09IDEgPyBlbnRpdGllc1swXSA6IGVudGl0aWVzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XSk7XG4gICAgICAgIHJldHVybiBFbnRpdHlGYWN0b3J5O1xuICAgIH0oKTtcblxuICAgIHZhciBDb21wb25lbnRNYW5hZ2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBDb21wb25lbnRNYW5hZ2VyKCkge1xuICAgICAgICAgICAgYmFiZWxIZWxwZXJzLmNsYXNzQ2FsbENoZWNrKHRoaXMsIENvbXBvbmVudE1hbmFnZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBuZXcgTWFwKCk7XG4gICAgICAgIH1cblxuICAgICAgICBiYWJlbEhlbHBlcnMuY3JlYXRlQ2xhc3MoQ29tcG9uZW50TWFuYWdlciwgW3tcbiAgICAgICAgICAgIGtleTogJ25ld0NvbXBvbmVudCcsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbmV3Q29tcG9uZW50KGtleSkge1xuICAgICAgICAgICAgICAgIHZhciBjb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KGtleSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgY29tcG9uZW50ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogYmFiZWxIZWxwZXJzLnR5cGVvZihjb21wb25lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgY29tcG9uZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJldCA9IHt9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGNvbXBvbmVudCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0W2tleV0gPSBjb21wb25lbnRba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KGNvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAncmVnaXN0ZXJDb21wb25lbnQnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlZ2lzdGVyQ29tcG9uZW50KGtleSwgY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnIHx8IGtleSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdrZXkgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcuJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudCA9PT0gbnVsbCB8fCBjb21wb25lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvbXBvbmVudCBjYW5ub3QgYmUgbnVsbCBvciB1bmRlZmluZWQuJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzLnNldChrZXksIGNvbXBvbmVudCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdnZXRDb21wb25lbnRzJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDb21wb25lbnRzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudHM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1dKTtcbiAgICAgICAgcmV0dXJuIENvbXBvbmVudE1hbmFnZXI7XG4gICAgfSgpO1xuXG4gICAgdmFyIFN5c3RlbVR5cGUgPSB7XG4gICAgICAgIExvZ2ljOiAwLFxuICAgICAgICBSZW5kZXI6IDEsXG4gICAgICAgIEluaXQ6IDJcbiAgICB9O1xuXG4gICAgdmFyIFN5c3RlbU1hbmFnZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFN5c3RlbU1hbmFnZXIoKSB7XG4gICAgICAgICAgICBiYWJlbEhlbHBlcnMuY2xhc3NDYWxsQ2hlY2sodGhpcywgU3lzdGVtTWFuYWdlcik7XG5cbiAgICAgICAgICAgIHRoaXMubG9naWNTeXN0ZW1zID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJTeXN0ZW1zID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgdGhpcy5pbml0U3lzdGVtcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJhYmVsSGVscGVycy5jcmVhdGVDbGFzcyhTeXN0ZW1NYW5hZ2VyLCBbe1xuICAgICAgICAgICAga2V5OiAncmVnaXN0ZXJTeXN0ZW0nLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlZ2lzdGVyU3lzdGVtKGtleSwgdHlwZSwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgfHwga2V5ID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2tleSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZy4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZSAhPT0gU3lzdGVtVHlwZS5Mb2dpYyAmJiB0eXBlICE9PSBTeXN0ZW1UeXBlLlJlbmRlciAmJiB0eXBlICE9PSBTeXN0ZW1UeXBlLkluaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCd0eXBlIG11c3QgYmUgYSB2YWxpZCBTeXN0ZW1UeXBlLicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjb21wb25lbnRzKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvbXBvbmVudHMgYXJndW1lbnQgbXVzdCBiZSBhbiBhcnJheSBvZiBjb21wb25lbnRzLicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHN5c3RlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50czogY29tcG9uZW50cyxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFN5c3RlbVR5cGUuTG9naWM6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2ljU3lzdGVtcy5zZXQoa2V5LCBzeXN0ZW0pO2JyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFN5c3RlbVR5cGUuUmVuZGVyOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJTeXN0ZW1zLnNldChrZXksIHN5c3RlbSk7YnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgU3lzdGVtVHlwZS5Jbml0OlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0U3lzdGVtcy5zZXQoa2V5LCBzeXN0ZW0pO2JyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ3JlbW92ZVN5c3RlbScsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlU3lzdGVtKGtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvZ2ljU3lzdGVtcy5kZWxldGUoa2V5KSB8fCB0aGlzLnJlbmRlclN5c3RlbXMuZGVsZXRlKGtleSkgfHwgdGhpcy5pbml0U3lzdGVtcy5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfV0pO1xuICAgICAgICByZXR1cm4gU3lzdGVtTWFuYWdlcjtcbiAgICB9KCk7XG5cbiAgICB2YXIgRXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBFdmVudEhhbmRsZXIoKSB7XG4gICAgICAgICAgICBiYWJlbEhlbHBlcnMuY2xhc3NDYWxsQ2hlY2sodGhpcywgRXZlbnRIYW5kbGVyKTtcblxuICAgICAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgTWFwKCk7XG4gICAgICAgIH1cblxuICAgICAgICBiYWJlbEhlbHBlcnMuY3JlYXRlQ2xhc3MoRXZlbnRIYW5kbGVyLCBbe1xuICAgICAgICAgICAga2V5OiAnZW1wdHlQcm9taXNlJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBlbXB0eVByb21pc2UoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAncHJvbWlzZScsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcHJvbWlzZShjYWxsYmFjaywgY29udGV4dCwgYXJncywgdGltZW91dCkge1xuICAgICAgICAgICAgICAgIGlmICh0aW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgodHlwZW9mIGNvbnRleHQgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBiYWJlbEhlbHBlcnMudHlwZW9mKGNvbnRleHQpKSA9PT0gJ29iamVjdCcgPyBjYWxsYmFjay5jYWxsLmFwcGx5KGNhbGxiYWNrLCBbY29udGV4dF0uY29uY2F0KGJhYmVsSGVscGVycy50b0NvbnN1bWFibGVBcnJheShhcmdzKSkpIDogY2FsbGJhY2suYXBwbHkuYXBwbHkoY2FsbGJhY2ssIFtjb250ZXh0XS5jb25jYXQoYmFiZWxIZWxwZXJzLnRvQ29uc3VtYWJsZUFycmF5KGFyZ3MpKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCh0eXBlb2YgY29udGV4dCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IGJhYmVsSGVscGVycy50eXBlb2YoY29udGV4dCkpID09PSAnb2JqZWN0JyA/IGNhbGxiYWNrLmNhbGwuYXBwbHkoY2FsbGJhY2ssIFtjb250ZXh0XS5jb25jYXQoYmFiZWxIZWxwZXJzLnRvQ29uc3VtYWJsZUFycmF5KGFyZ3MpKSkgOiBjYWxsYmFjay5hcHBseS5hcHBseShjYWxsYmFjaywgW2NvbnRleHRdLmNvbmNhdChiYWJlbEhlbHBlcnMudG9Db25zdW1hYmxlQXJyYXkoYXJncykpKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ2xpc3RlbicsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbGlzdGVuKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZXZlbnQgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzLnNldChldmVudCwgbmV3IE1hcCgpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgZXZlbnRJZCA9IC0xO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5ldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRJZCA9IE1hdGgubWF4LmFwcGx5KE1hdGgsIFtldmVudElkXS5jb25jYXQoYmFiZWxIZWxwZXJzLnRvQ29uc3VtYWJsZUFycmF5KGV2ZW50LmtleXMoKSkpKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICsrZXZlbnRJZDtcblxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzLmdldChldmVudCkuc2V0KGV2ZW50SWQsIGNhbGxiYWNrKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBldmVudElkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdzdG9wTGlzdGVuJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzdG9wTGlzdGVuKGV2ZW50SWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gdGhpcy5ldmVudHMudmFsdWVzKClbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXZlbnRzID0gX3N0ZXAudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gZXZlbnRzLmtleXMoKVtTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWQgPSBfc3RlcDIudmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkID09PSBldmVudElkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnRzLmRlbGV0ZShldmVudElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjIucmV0dXJuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3IyLnJldHVybigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ3RyaWdnZXInLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHRyaWdnZXIoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlciA/IHRoaXMuZXZlbnRIYW5kbGVyIDogdGhpcztcblxuICAgICAgICAgICAgICAgIHZhciBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xuXG4gICAgICAgICAgICAgICAgdmFyIF9hcmdzJHNwbGljZSA9IGFyZ3Muc3BsaWNlKDAsIDEpO1xuXG4gICAgICAgICAgICAgICAgdmFyIF9hcmdzJHNwbGljZTIgPSBiYWJlbEhlbHBlcnMuc2xpY2VkVG9BcnJheShfYXJncyRzcGxpY2UsIDEpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gX2FyZ3Mkc3BsaWNlMlswXTtcblxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgIXNlbGYuZXZlbnRzLmhhcyhldmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuZW1wdHlQcm9taXNlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHByb21pc2VzID0gW107XG5cbiAgICAgICAgICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IzID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMyA9IHNlbGYuZXZlbnRzLmdldChldmVudCkudmFsdWVzKClbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDM7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSAoX3N0ZXAzID0gX2l0ZXJhdG9yMy5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IF9zdGVwMy52YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChzZWxmLnByb21pc2UoY2FsbGJhY2ssIHRoaXMsIGFyZ3MsIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3JFcnJvcjMgPSBlcnI7XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgJiYgX2l0ZXJhdG9yMy5yZXR1cm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3IzLnJldHVybigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ3RyaWdnZXJEZWxheWVkJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiB0cmlnZ2VyRGVsYXllZCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXMgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyID8gdGhpcy5ldmVudEhhbmRsZXIgOiB0aGlzO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG5cbiAgICAgICAgICAgICAgICB2YXIgX2FyZ3Mkc3BsaWNlMyA9IGFyZ3Muc3BsaWNlKDAsIDIpO1xuXG4gICAgICAgICAgICAgICAgdmFyIF9hcmdzJHNwbGljZTQgPSBiYWJlbEhlbHBlcnMuc2xpY2VkVG9BcnJheShfYXJncyRzcGxpY2UzLCAyKTtcblxuICAgICAgICAgICAgICAgIHZhciBldmVudCA9IF9hcmdzJHNwbGljZTRbMF07XG4gICAgICAgICAgICAgICAgdmFyIHRpbWVvdXQgPSBfYXJncyRzcGxpY2U0WzFdO1xuXG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCAhTnVtYmVyLmlzSW50ZWdlcih0aW1lb3V0KSB8fCAhc2VsZi5ldmVudHMuaGFzKGV2ZW50KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5lbXB0eVByb21pc2UoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yNCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjQgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3I0ID0gc2VsZi5ldmVudHMuZ2V0KGV2ZW50KS52YWx1ZXMoKVtTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwNDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCA9IChfc3RlcDQgPSBfaXRlcmF0b3I0Lm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ID0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gX3N0ZXA0LnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHNlbGYucHJvbWlzZShjYWxsYmFjaywgdGhpcywgYXJncywgdGltZW91dCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yNCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIF9pdGVyYXRvckVycm9yNCA9IGVycjtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCAmJiBfaXRlcmF0b3I0LnJldHVybikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pdGVyYXRvcjQucmV0dXJuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3I0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfV0pO1xuICAgICAgICByZXR1cm4gRXZlbnRIYW5kbGVyO1xuICAgIH0oKTtcblxuICAgIHZhciBFbnRpdHlNYW5hZ2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBFbnRpdHlNYW5hZ2VyKCkge1xuICAgICAgICAgICAgdmFyIGNhcGFjaXR5ID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8gMTAwMCA6IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIGJhYmVsSGVscGVycy5jbGFzc0NhbGxDaGVjayh0aGlzLCBFbnRpdHlNYW5hZ2VyKTtcblxuICAgICAgICAgICAgdGhpcy5jYXBhY2l0eSA9IGNhcGFjaXR5O1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWF4RW50aXR5ID0gLTE7XG5cbiAgICAgICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeSA9IG5ldyBFbnRpdHlGYWN0b3J5KCk7XG4gICAgICAgICAgICB0aGlzLnN5c3RlbU1hbmFnZXIgPSBuZXcgU3lzdGVtTWFuYWdlcigpO1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRNYW5hZ2VyID0gbmV3IENvbXBvbmVudE1hbmFnZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuXG4gICAgICAgICAgICB0aGlzLmVudGl0aWVzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogdGhpcy5jYXBhY2l0eSB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgY29tcG9uZW50czogW10gfTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmVudGl0eUNvbmZpZ3VyYXRpb25zID0gbmV3IE1hcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYmFiZWxIZWxwZXJzLmNyZWF0ZUNsYXNzKEVudGl0eU1hbmFnZXIsIFt7XG4gICAgICAgICAgICBrZXk6ICdpbmNyZWFzZUNhcGFjaXR5JyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBpbmNyZWFzZUNhcGFjaXR5KCkge1xuICAgICAgICAgICAgICAgIHZhciBvbGRDYXBhY2l0eSA9IHRoaXMuY2FwYWNpdHk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNhcGFjaXR5ICo9IDI7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmVudGl0aWVzID0gW10uY29uY2F0KGJhYmVsSGVscGVycy50b0NvbnN1bWFibGVBcnJheSh0aGlzLmVudGl0aWVzKSwgYmFiZWxIZWxwZXJzLnRvQ29uc3VtYWJsZUFycmF5KEFycmF5LmZyb20oeyBsZW5ndGg6IG9sZENhcGFjaXR5IH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgY29tcG9uZW50czogW10gfTtcbiAgICAgICAgICAgICAgICB9KSkpO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IG9sZENhcGFjaXR5OyBpIDwgdGhpcy5jYXBhY2l0eTsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gdGhpcy5jb21wb25lbnRNYW5hZ2VyLmdldENvbXBvbmVudHMoKS5rZXlzKClbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudCA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tpXVtjb21wb25lbnRdID0gdGhpcy5jb21wb25lbnRNYW5hZ2VyLm5ld0NvbXBvbmVudChjb21wb25lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICduZXdFbnRpdHknLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG5ld0VudGl0eShjb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbXBvbmVudHMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignY29tcG9uZW50cyBhcmd1bWVudCBtdXN0IGJlIGFuIGFycmF5IG9mIGNvbXBvbmVudHMuJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGlkID0gMDtcblxuICAgICAgICAgICAgICAgIGZvciAoOyBpZCA8IHRoaXMuY2FwYWNpdHk7ICsraWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpZCA+PSB0aGlzLmNhcGFjaXR5KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRvZG86IGF1dG8gaW5jcmVhc2UgY2FwYWNpdHk/XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGlkOiB0aGlzLmNhcGFjaXR5LCBlbnRpdHk6IG51bGwgfTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TWF4RW50aXR5ID0gaWQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tpZF0uY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4geyBpZDogaWQsIGVudGl0eTogdGhpcy5lbnRpdGllc1tpZF0gfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnZGVsZXRlRW50aXR5JyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkZWxldGVFbnRpdHkoaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzID0gW107XG5cbiAgICAgICAgICAgICAgICBpZiAoaWQgPCB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBpZDsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbaV0uY29tcG9uZW50cy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IGk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ2dldEVudGl0aWVzJyxcbiAgICAgICAgICAgIHZhbHVlOiByZWdlbmVyYXRvclJ1bnRpbWUubWFyayhmdW5jdGlvbiBnZXRFbnRpdGllcygpIHtcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudHMgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyBudWxsIDogYXJndW1lbnRzWzBdO1xuXG4gICAgICAgICAgICAgICAgdmFyIF9sb29wLCBpZDtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZWdlbmVyYXRvclJ1bnRpbWUud3JhcChmdW5jdGlvbiBnZXRFbnRpdGllcyQoX2NvbnRleHQyKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0Mi5wcmV2ID0gX2NvbnRleHQyLm5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9sb29wID0gcmVnZW5lcmF0b3JSdW50aW1lLm1hcmsoZnVuY3Rpb24gX2xvb3AoaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWdlbmVyYXRvclJ1bnRpbWUud3JhcChmdW5jdGlvbiBfbG9vcCQoX2NvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jb250ZXh0LnByZXYgPSBfY29udGV4dC5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoY29tcG9uZW50cyA9PT0gbnVsbCB8fCBjb21wb25lbnRzLmV2ZXJ5KGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzLmluZGV4T2YoY29tcG9uZW50KSAhPT0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBpZDogaWQsIGVudGl0eTogX3RoaXMuZW50aXRpZXNbaWRdIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0LnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIF9sb29wLCBfdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZCA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGlkIDw9IHRoaXMuY3VycmVudE1heEVudGl0eSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gNztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5kZWxlZ2F0ZVlpZWxkKF9sb29wKGlkKSwgJ3QwJywgNCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsraWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9jb250ZXh0Mi5uZXh0ID0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb250ZXh0Mi5zdG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBnZXRFbnRpdGllcywgdGhpcyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdyZWdpc3RlckNvbmZpZ3VyYXRpb24nLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlZ2lzdGVyQ29uZmlndXJhdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgfHwga2V5ID09PSAnJykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2tleSBtdXN0IGJlIGEgbm9uIGVtcHR5IHN0cmluZy4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmVudGl0eUNvbmZpZ3VyYXRpb25zLnNldChrZXksIHRoaXMuZW50aXR5RmFjdG9yeS5jcmVhdGVDb25maWd1cmF0aW9uKCkpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQ29tcG9uZW50IE1hbmFnZXJcblxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdyZWdpc3RlckNvbXBvbmVudCcsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVnaXN0ZXJDb21wb25lbnQoa2V5LCBjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudE1hbmFnZXIucmVnaXN0ZXJDb21wb25lbnQoa2V5LCBjb21wb25lbnQpO1xuXG4gICAgICAgICAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSB0aGlzLmVudGl0aWVzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZW50aXR5ID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHlba2V5XSA9IHRoaXMuY29tcG9uZW50TWFuYWdlci5uZXdDb21wb25lbnQoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3JFcnJvcjIgPSBlcnI7XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMi5yZXR1cm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3IyLnJldHVybigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBpbml0aWFsaXplciA9IHZvaWQgMDtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIGNvbXBvbmVudCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IGJhYmVsSGVscGVycy50eXBlb2YoY29tcG9uZW50KSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplciA9IGNvbXBvbmVudDticmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsaXplciA9IGZ1bmN0aW9uIGluaXRpYWxpemVyKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjMgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjMgPSBPYmplY3Qua2V5cyhjb21wb25lbnQpW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAzOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gKF9zdGVwMyA9IF9pdGVyYXRvcjMubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9rZXkgPSBfc3RlcDMudmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW19rZXldID0gY29tcG9uZW50W19rZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yMyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3JFcnJvcjMgPSBlcnI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgJiYgX2l0ZXJhdG9yMy5yZXR1cm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yMy5yZXR1cm4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVyID0gZnVuY3Rpb24gaW5pdGlhbGl6ZXIoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07YnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LnJlZ2lzdGVySW5pdGlhbGl6ZXIoa2V5LCBpbml0aWFsaXplcik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdhZGRDb21wb25lbnQnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGFkZENvbXBvbmVudChpZCwgY29tcG9uZW50S2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMuaW5kZXhPZihjb21wb25lbnRLZXkpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tpZF0uY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudEtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ3JlbW92ZUNvbXBvbmVudCcsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlQ29tcG9uZW50KGlkLCBjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzLmluZGV4T2YoY29tcG9uZW50KTtcblxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU3lzdGVtIE1hbmFnZXJcblxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdyZWdpc3RlclN5c3RlbScsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVnaXN0ZXJTeXN0ZW0oa2V5LCB0eXBlLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVnaXN0ZXJTeXN0ZW0oa2V5LCB0eXBlLCBjb21wb25lbnRzLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ3JlZ2lzdGVyTG9naWNTeXN0ZW0nLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlZ2lzdGVyTG9naWNTeXN0ZW0oa2V5LCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVnaXN0ZXJTeXN0ZW0oa2V5LCBTeXN0ZW1UeXBlLkxvZ2ljLCBjb21wb25lbnRzLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ3JlZ2lzdGVyUmVuZGVyU3lzdGVtJyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZWdpc3RlclJlbmRlclN5c3RlbShrZXksIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbShrZXksIFN5c3RlbVR5cGUuUmVuZGVyLCBjb21wb25lbnRzLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ3JlZ2lzdGVySW5pdFN5c3RlbScsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVnaXN0ZXJJbml0U3lzdGVtKGtleSwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlZ2lzdGVyU3lzdGVtKGtleSwgU3lzdGVtVHlwZS5Jbml0LCBjb21wb25lbnRzLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ3JlbW92ZVN5c3RlbScsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlU3lzdGVtKGtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVtb3ZlU3lzdGVtKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ29uTG9naWMnLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uTG9naWMob3B0cykge1xuICAgICAgICAgICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yNCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjQgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3I0ID0gdGhpcy5zeXN0ZW1NYW5hZ2VyLmxvZ2ljU3lzdGVtcy52YWx1ZXMoKVtTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwNDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCA9IChfc3RlcDQgPSBfaXRlcmF0b3I0Lm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240ID0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN5c3RlbSA9IF9zdGVwNC52YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3lzdGVtLmNhbGxiYWNrLmNhbGwodGhpcywgdGhpcy5nZXRFbnRpdGllcyhzeXN0ZW0uY29tcG9uZW50cyksIG9wdHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yNCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIF9pdGVyYXRvckVycm9yNCA9IGVycjtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNCAmJiBfaXRlcmF0b3I0LnJldHVybikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pdGVyYXRvcjQucmV0dXJuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3I0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdvblJlbmRlcicsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gb25SZW5kZXIob3B0cykge1xuICAgICAgICAgICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yNSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjUgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3I1ID0gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlbmRlclN5c3RlbXMudmFsdWVzKClbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDU7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjUgPSAoX3N0ZXA1ID0gX2l0ZXJhdG9yNS5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNSA9IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzeXN0ZW0gPSBfc3RlcDUudmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMpLCBvcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3JFcnJvcjUgPSBlcnI7XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjUgJiYgX2l0ZXJhdG9yNS5yZXR1cm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3I1LnJldHVybigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yNTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnb25Jbml0JyxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBvbkluaXQob3B0cykge1xuICAgICAgICAgICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNiA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yNiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjYgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3I2ID0gdGhpcy5zeXN0ZW1NYW5hZ2VyLmluaXRTeXN0ZW1zLnZhbHVlcygpW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA2OyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb242ID0gKF9zdGVwNiA9IF9pdGVyYXRvcjYubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjYgPSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3lzdGVtID0gX3N0ZXA2LnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzeXN0ZW0uY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLmdldEVudGl0aWVzKHN5c3RlbS5jb21wb25lbnRzKSwgb3B0cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3I2ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3I2ID0gZXJyO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb242ICYmIF9pdGVyYXRvcjYucmV0dXJuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yNi5yZXR1cm4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjY7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEVudGl0eSBGYWN0b3J5XG5cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAncmVnaXN0ZXJJbml0aWFsaXplcicsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVnaXN0ZXJJbml0aWFsaXplcihjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkucmVnaXN0ZXJJbml0aWFsaXplcihjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICdidWlsZCcsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYnVpbGQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LmJ1aWxkKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnd2l0aENvbXBvbmVudCcsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gd2l0aENvbXBvbmVudChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVudGl0eUZhY3Rvcnkud2l0aENvbXBvbmVudChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ2NyZWF0ZScsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlKGNvdW50LCBrZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29uZmlndXJhdGlvbiA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9uID0gdGhpcy5lbnRpdHlDb25maWd1cmF0aW9ucy5nZXQoa2V5KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZmlndXJhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvdWxkIG5vdCBmaW5kIGVudGl0eSBjb25maWd1cmF0aW9uIGZvciB0aGUgc3VwcGxpZWQga2V5LiBpZiB5b3Ugd2lzaCB0byBjcmVhdGUgYW4gZW50aXR5IHdpdGhvdXQgYSBjb25maWd1cmF0aW9uLCBkbyBub3QgcGFzcyBhIGtleS4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVudGl0eUZhY3RvcnkuY3JlYXRlKHRoaXMsIGNvdW50LCBjb25maWd1cmF0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRXZlbnQgSGFuZGxlclxuXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ2xpc3RlbicsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbGlzdGVuKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci5saXN0ZW4oZXZlbnQsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAnc3RvcExpc3RlbicsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc3RvcExpc3RlbihldmVudElkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLnN0b3BMaXN0ZW4oZXZlbnRJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogJ3RyaWdnZXInLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHRyaWdnZXIoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9ldmVudEhhbmRsZXIkdHJpZ2dlcjtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoX2V2ZW50SGFuZGxlciR0cmlnZ2VyID0gdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlcikuY2FsbC5hcHBseShfZXZlbnRIYW5kbGVyJHRyaWdnZXIsIFt0aGlzXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6ICd0cmlnZ2VyRGVsYXllZCcsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdHJpZ2dlckRlbGF5ZWQoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9ldmVudEhhbmRsZXIkdHJpZ2dlcjI7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKF9ldmVudEhhbmRsZXIkdHJpZ2dlcjIgPSB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyRGVsYXllZCkuY2FsbC5hcHBseShfZXZlbnRIYW5kbGVyJHRyaWdnZXIyLCBbdGhpc10uY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfV0pO1xuICAgICAgICByZXR1cm4gRW50aXR5TWFuYWdlcjtcbiAgICB9KCk7XG5cbiAgICBleHBvcnRzWydkZWZhdWx0J10gPSBFbnRpdHlNYW5hZ2VyO1xuICAgIGV4cG9ydHMuRW50aXR5TWFuYWdlciA9IEVudGl0eU1hbmFnZXI7XG4gICAgZXhwb3J0cy5FbnRpdHlGYWN0b3J5ID0gRW50aXR5RmFjdG9yeTtcbiAgICBleHBvcnRzLlN5c3RlbU1hbmFnZXIgPSBTeXN0ZW1NYW5hZ2VyO1xuICAgIGV4cG9ydHMuU3lzdGVtVHlwZSA9IFN5c3RlbVR5cGU7XG4gICAgZXhwb3J0cy5Db21wb25lbnRNYW5hZ2VyID0gQ29tcG9uZW50TWFuYWdlcjtcbiAgICBleHBvcnRzLkV2ZW50SGFuZGxlciA9IEV2ZW50SGFuZGxlcjtcblxufSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2laMmN0Wlc1MGFYUnBaWE11YW5NaUxDSnpiM1Z5WTJWeklqcGJJaTR1TDNOeVl5OWpiM0psTDJWdWRHbDBlUzFtWVdOMGIzSjVMbXB6SWl3aUxpNHZjM0pqTDJOdmNtVXZZMjl0Y0c5dVpXNTBMVzFoYm1GblpYSXVhbk1pTENJdUxpOXpjbU12WTI5eVpTOXplWE4wWlcwdGJXRnVZV2RsY2k1cWN5SXNJaTR1TDNOeVl5OWpiM0psTDJWMlpXNTBMV2hoYm1Sc1pYSXVhbk1pTENJdUxpOXpjbU12WTI5eVpTOWxiblJwZEhrdGJXRnVZV2RsY2k1cWN5SmRMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUpwYlhCdmNuUWdSVzUwYVhSNVRXRnVZV2RsY2lCbWNtOXRJQ2N1TDJWdWRHbDBlUzF0WVc1aFoyVnlKMXh1WEc1bGVIQnZjblFnWkdWbVlYVnNkQ0JqYkdGemN5QkZiblJwZEhsR1lXTjBiM0o1SUh0Y2JpQWdJQ0JqYjI1emRISjFZM1J2Y2lncElIdGNiaUFnSUNBZ0lDQWdkR2hwY3k1cGJtbDBhV0ZzYVhwbGNuTWdJRDBnYm1WM0lFMWhjQ2dwWEc0Z0lDQWdJQ0FnSUhSb2FYTXVZMjl1Wm1sbmRYSmhkR2x2YmlBOUlHNWxkeUJOWVhBb0tWeHVJQ0FnSUgxY2JpQWdJQ0JjYmlBZ0lDQnlaV2RwYzNSbGNrbHVhWFJwWVd4cGVtVnlLR3RsZVN3Z2FXNXBkR2xoYkdsNlpYSXBJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tIUjVjR1Z2WmlCclpYa2dJVDA5SUNkemRISnBibWNuSUh4OElHdGxlU0E5UFQwZ0p5Y3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIUm9jbTkzSUZSNWNHVkZjbkp2Y2lnbmEyVjVJRzExYzNRZ1ltVWdZU0J1YjI0dFpXMXdkSGtnYzNSeWFXNW5MaWNwWEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lHbG1JQ2gwZVhCbGIyWWdhVzVwZEdsaGJHbDZaWElnSVQwOUlDZG1kVzVqZEdsdmJpY3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIUm9jbTkzSUZSNWNHVkZjbkp2Y2lnbmFXNXBkR2xoYkdsNlpYSWdiWFZ6ZENCaVpTQmhJR1oxYm1OMGFXOXVMaWNwWEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lIUm9hWE11YVc1cGRHbGhiR2w2WlhKekxuTmxkQ2hyWlhrc0lHbHVhWFJwWVd4cGVtVnlLVnh1SUNBZ0lIMWNiaUFnSUNCY2JpQWdJQ0JpZFdsc1pDZ3BJSHRjYmlBZ0lDQWdJQ0FnZEdocGN5NWpiMjVtYVdkMWNtRjBhVzl1SUQwZ2JtVjNJRTFoY0NncFhHNGdJQ0FnSUNBZ0lGeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2RHaHBjMXh1SUNBZ0lIMWNiaUFnSUNCY2JpQWdJQ0IzYVhSb1EyOXRjRzl1Wlc1MEtHdGxlU3dnYVc1cGRHbGhiR2w2WlhJcElIdGNiaUFnSUNBZ0lDQWdhV1lnS0hSNWNHVnZaaUJyWlhrZ0lUMDlJQ2R6ZEhKcGJtY25JSHg4SUd0bGVTQTlQVDBnSnljcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUIwYUdselhHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJR2xtSUNoMGVYQmxiMllnYVc1cGRHbGhiR2w2WlhJZ0lUMDlJQ2RtZFc1amRHbHZiaWNwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2x1YVhScFlXeHBlbVZ5SUQwZ2RHaHBjeTVwYm1sMGFXRnNhWHBsY25NdVoyVjBLR3RsZVNsY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdkR2hwY3k1amIyNW1hV2QxY21GMGFXOXVMbk5sZENoclpYa3NJR2x1YVhScFlXeHBlbVZ5S1Z4dUlDQWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSb2FYTmNiaUFnSUNCOVhHNGdJQ0FnWEc0Z0lDQWdZM0psWVhSbFEyOXVabWxuZFhKaGRHbHZiaWdwSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSb2FYTXVZMjl1Wm1sbmRYSmhkR2x2Ymx4dUlDQWdJSDFjYmlBZ0lDQmNiaUFnSUNCamNtVmhkR1VvWlc1MGFYUjVUV0Z1WVdkbGNpd2dZMjkxYm5RZ1BTQXhMQ0JqYjI1bWFXZDFjbUYwYVc5dUlEMGdkVzVrWldacGJtVmtLU0I3WEc0Z0lDQWdJQ0FnSUdsbUlDZ2hLR1Z1ZEdsMGVVMWhibUZuWlhJZ2FXNXpkR0Z1WTJWdlppQkZiblJwZEhsTllXNWhaMlZ5S1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJRnRkWEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0JjYmlBZ0lDQWdJQ0FnWTI5dVptbG5kWEpoZEdsdmJpQTlJR052Ym1acFozVnlZWFJwYjI0Z2ZId2dkR2hwY3k1amIyNW1hV2QxY21GMGFXOXVYRzRnSUNBZ0lDQWdJRnh1SUNBZ0lDQWdJQ0JzWlhRZ1kyOXRjRzl1Wlc1MGN5QTlJRnRkWEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCbWIzSWdLR3hsZENCamIyMXdiMjVsYm5RZ2IyWWdZMjl1Wm1sbmRYSmhkR2x2Ymk1clpYbHpLQ2twSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR052YlhCdmJtVnVkSE11Y0hWemFDaGpiMjF3YjI1bGJuUXBYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUd4bGRDQmxiblJwZEdsbGN5QTlJRnRkWEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCbWIzSWdLR3hsZENCcElEMGdNRHNnYVNBOElHTnZkVzUwT3lBcksya3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHeGxkQ0I3SUdsa0xDQmxiblJwZEhrZ2ZTQTlJR1Z1ZEdsMGVVMWhibUZuWlhJdWJtVjNSVzUwYVhSNUtHTnZiWEJ2Ym1WdWRITXBYRzRnSUNBZ0lDQWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNocFpDQStQU0JsYm5ScGRIbE5ZVzVoWjJWeUxtTmhjR0ZqYVhSNUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZbkpsWVd0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lGeHVJQ0FnSUNBZ0lDQWdJQ0FnWm05eUlDaHNaWFFnVzJOdmJYQnZibVZ1ZEN3Z2FXNXBkR2xoYkdsNlpYSmRJRzltSUdOdmJtWnBaM1Z5WVhScGIyNHBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2RIbHdaVzltSUdsdWFYUnBZV3hwZW1WeUlDRTlQU0FuWm5WdVkzUnBiMjRuS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR052Ym5ScGJuVmxYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYkdWMElISmxjM1ZzZENBOUlHbHVhWFJwWVd4cGVtVnlMbU5oYkd3b1pXNTBhWFI1VzJOdmJYQnZibVZ1ZEYwcFhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLSFI1Y0dWdlppQmxiblJwZEhsYlkyOXRjRzl1Wlc1MFhTQWhQVDBnSjI5aWFtVmpkQ2NnSmlZZ2NtVnpkV3gwSUNFOVBTQjFibVJsWm1sdVpXUXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1pXNTBhWFI1VzJOdmJYQnZibVZ1ZEYwZ1BTQnlaWE4xYkhSY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdJQ0FnSUdWdWRHbDBhV1Z6TG5CMWMyZ29leUJwWkN3Z1pXNTBhWFI1SUgwcFhHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQmxiblJwZEdsbGN5NXNaVzVuZEdnZ1BUMDlJREVnUHlCbGJuUnBkR2xsYzFzd1hTQTZJR1Z1ZEdsMGFXVnpYRzRnSUNBZ2ZWeHVmU0lzSW1WNGNHOXlkQ0JrWldaaGRXeDBJR05zWVhOeklFTnZiWEJ2Ym1WdWRFMWhibUZuWlhJZ2UxeHVJQ0FnSUdOdmJuTjBjblZqZEc5eUtDa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxtTnZiWEJ2Ym1WdWRITWdQU0J1WlhjZ1RXRndLQ2xjYmlBZ0lDQjlYRzRnSUNBZ1hHNGdJQ0FnYm1WM1EyOXRjRzl1Wlc1MEtHdGxlU2tnZTF4dUlDQWdJQ0FnSUNCc1pYUWdZMjl0Y0c5dVpXNTBJRDBnZEdocGN5NWpiMjF3YjI1bGJuUnpMbWRsZENoclpYa3BYRzRnSUNBZ0lDQWdJRnh1SUNBZ0lDQWdJQ0JwWmlBb1kyOXRjRzl1Wlc1MElEMDlJRzUxYkd3cElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJ1ZFd4c1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJSE4zYVhSamFDQW9kSGx3Wlc5bUlHTnZiWEJ2Ym1WdWRDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1kyRnpaU0FuWm5WdVkzUnBiMjRuT2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJ1WlhjZ1kyOXRjRzl1Wlc1MEtDbGNiaUFnSUNBZ0lDQWdJQ0FnSUdOaGMyVWdKMjlpYW1WamRDY2dJRG9nZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUFvS0dOdmJYQnZibVZ1ZENrZ1BUNGdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCc1pYUWdjbVYwSUQwZ2UzMWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lFOWlhbVZqZEM1clpYbHpLR052YlhCdmJtVnVkQ2t1Wm05eVJXRmphQ2hyWlhrZ1BUNGdjbVYwVzJ0bGVWMGdQU0JqYjIxd2IyNWxiblJiYTJWNVhTbGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCeVpYUmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlLU2hqYjIxd2IyNWxiblFwWEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnSUNCa1pXWmhkV3gwT2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJqYjIxd2IyNWxiblJjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ0lDQmNiaUFnSUNCeVpXZHBjM1JsY2tOdmJYQnZibVZ1ZENoclpYa3NJR052YlhCdmJtVnVkQ2tnZTF4dUlDQWdJQ0FnSUNCcFppQW9kSGx3Wlc5bUlHdGxlU0FoUFQwZ0ozTjBjbWx1WnljZ2ZId2dhMlY1SUQwOVBTQW5KeWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdkR2h5YjNjZ1ZIbHdaVVZ5Y205eUtDZHJaWGtnYlhWemRDQmlaU0JoSUc1dmJpMWxiWEIwZVNCemRISnBibWN1SnlsY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdhV1lnS0dOdmJYQnZibVZ1ZENBOVBUMGdiblZzYkNCOGZDQmpiMjF3YjI1bGJuUWdQVDA5SUhWdVpHVm1hVzVsWkNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZEdoeWIzY2dWSGx3WlVWeWNtOXlLQ2RqYjIxd2IyNWxiblFnWTJGdWJtOTBJR0psSUc1MWJHd2diM0lnZFc1a1pXWnBibVZrTGljcFhHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJSFJvYVhNdVkyOXRjRzl1Wlc1MGN5NXpaWFFvYTJWNUxDQmpiMjF3YjI1bGJuUXBYRzVjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJR3RsZVZ4dUlDQWdJSDFjYmlBZ0lDQmNiaUFnSUNCblpYUkRiMjF3YjI1bGJuUnpLQ2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnZEdocGN5NWpiMjF3YjI1bGJuUnpYRzRnSUNBZ2ZWeHVmU0lzSW1WNGNHOXlkQ0JqYjI1emRDQlRlWE4wWlcxVWVYQmxJRDBnZTF4dUlDQWdJRXh2WjJsaklDQTZJREFzWEc0Z0lDQWdVbVZ1WkdWeUlEb2dNU3hjYmlBZ0lDQkpibWwwSUNBZ09pQXlYRzU5WEc1Y2JtVjRjRzl5ZENCa1pXWmhkV3gwSUdOc1lYTnpJRk41YzNSbGJVMWhibUZuWlhJZ2UxeHVJQ0FnSUdOdmJuTjBjblZqZEc5eUtDa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxteHZaMmxqVTNsemRHVnRjeUFnUFNCdVpYY2dUV0Z3S0NsY2JpQWdJQ0FnSUNBZ2RHaHBjeTV5Wlc1a1pYSlRlWE4wWlcxeklEMGdibVYzSUUxaGNDZ3BYRzRnSUNBZ0lDQWdJSFJvYVhNdWFXNXBkRk41YzNSbGJYTWdJQ0E5SUc1bGR5Qk5ZWEFvS1Z4dUlDQWdJSDFjYmlBZ0lDQmNiaUFnSUNCeVpXZHBjM1JsY2xONWMzUmxiU2hyWlhrc0lIUjVjR1VzSUdOdmJYQnZibVZ1ZEhNc0lHTmhiR3hpWVdOcktTQjdYRzRnSUNBZ0lDQWdJR2xtSUNoMGVYQmxiMllnYTJWNUlDRTlQU0FuYzNSeWFXNW5KeUI4ZkNCclpYa2dQVDA5SUNjbktTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFISnZkeUJVZVhCbFJYSnliM0lvSjJ0bGVTQnRkWE4wSUdKbElHRWdibTl1TFdWdGNIUjVJSE4wY21sdVp5NG5LVnh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCcFppQW9kSGx3WlNBaFBUMGdVM2x6ZEdWdFZIbHdaUzVNYjJkcFl5QW1KaUIwZVhCbElDRTlQU0JUZVhOMFpXMVVlWEJsTGxKbGJtUmxjaUFtSmlCMGVYQmxJQ0U5UFNCVGVYTjBaVzFVZVhCbExrbHVhWFFwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFJvY205M0lGUjVjR1ZGY25KdmNpZ25kSGx3WlNCdGRYTjBJR0psSUdFZ2RtRnNhV1FnVTNsemRHVnRWSGx3WlM0bktWeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJRnh1SUNBZ0lDQWdJQ0JwWmlBb0lVRnljbUY1TG1selFYSnlZWGtvWTI5dGNHOXVaVzUwY3lrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhSb2NtOTNJRlI1Y0dWRmNuSnZjaWduWTI5dGNHOXVaVzUwY3lCaGNtZDFiV1Z1ZENCdGRYTjBJR0psSUdGdUlHRnljbUY1SUc5bUlHTnZiWEJ2Ym1WdWRITXVKeWxjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ2FXWWdLSFI1Y0dWdlppQmpZV3hzWW1GamF5QWhQVDBnSjJaMWJtTjBhVzl1SnlrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZEdoeWIzY2dWSGx3WlVWeWNtOXlLQ2RqWVd4c1ltRmpheUJ0ZFhOMElHSmxJR0VnWm5WdVkzUnBiMjR1SnlsY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdiR1YwSUhONWMzUmxiU0E5SUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR052YlhCdmJtVnVkSE1zWEc0Z0lDQWdJQ0FnSUNBZ0lDQmpZV3hzWW1GamExeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJRnh1SUNBZ0lDQWdJQ0J6ZDJsMFkyZ2dLSFI1Y0dVcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdOaGMyVWdVM2x6ZEdWdFZIbHdaUzVNYjJkcFl5QTZJSFJvYVhNdWJHOW5hV05UZVhOMFpXMXpMbk5sZENoclpYa3NJSE41YzNSbGJTazdJR0p5WldGclhHNGdJQ0FnSUNBZ0lDQWdJQ0JqWVhObElGTjVjM1JsYlZSNWNHVXVVbVZ1WkdWeUlEb2dkR2hwY3k1eVpXNWtaWEpUZVhOMFpXMXpMbk5sZENoclpYa3NJSE41YzNSbGJTazdJR0p5WldGclhHNGdJQ0FnSUNBZ0lDQWdJQ0JqWVhObElGTjVjM1JsYlZSNWNHVXVTVzVwZENBNklIUm9hWE11YVc1cGRGTjVjM1JsYlhNdWMyVjBLR3RsZVN3Z2MzbHpkR1Z0S1RzZ1luSmxZV3RjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUd0bGVWeHVJQ0FnSUgxY2JpQWdJQ0JjYmlBZ0lDQnlaVzF2ZG1WVGVYTjBaVzBvYTJWNUtTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQjBhR2x6TG14dloybGpVM2x6ZEdWdGN5NWtaV3hsZEdVb2EyVjVLU0I4ZkNCMGFHbHpMbkpsYm1SbGNsTjVjM1JsYlhNdVpHVnNaWFJsS0d0bGVTa2dmSHdnZEdocGN5NXBibWwwVTNsemRHVnRjeTVrWld4bGRHVW9hMlY1S1Z4dUlDQWdJSDFjYm4waUxDSnBiWEJ2Y25RZ1JXNTBhWFI1VFdGdVlXZGxjaUJtY205dElDY3VMMlZ1ZEdsMGVTMXRZVzVoWjJWeUoxeHVYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQmpiR0Z6Y3lCRmRtVnVkRWhoYm1Sc1pYSWdlMXh1SUNBZ0lHTnZibk4wY25WamRHOXlLQ2tnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMbVYyWlc1MGN5QTlJRzVsZHlCTllYQW9LVnh1SUNBZ0lIMWNiaUFnSUNCY2JpQWdJQ0JsYlhCMGVWQnliMjFwYzJVb0tTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQnVaWGNnVUhKdmJXbHpaU2h5WlhOdmJIWmxJRDArSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsYzI5c2RtVW9LVnh1SUNBZ0lDQWdJQ0I5S1Z4dUlDQWdJSDFjYmlBZ0lDQmNiaUFnSUNCd2NtOXRhWE5sS0dOaGJHeGlZV05yTENCamIyNTBaWGgwTENCaGNtZHpMQ0IwYVcxbGIzVjBLU0I3WEc0Z0lDQWdJQ0FnSUdsbUlDaDBhVzFsYjNWMEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnYm1WM0lGQnliMjFwYzJVb2NtVnpiMngyWlNBOVBpQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjMlYwVkdsdFpXOTFkQ2htZFc1amRHbHZiaWdwZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaWE52YkhabEtIUjVjR1Z2WmlCamIyNTBaWGgwSUQwOVBTQWdKMjlpYW1WamRDY2dQeUJqWVd4c1ltRmpheTVqWVd4c0tHTnZiblJsZUhRc0lDNHVMbUZ5WjNNcElEb2dZMkZzYkdKaFkyc3VZWEJ3Ykhrb1kyOXVkR1Y0ZEN3Z0xpNHVZWEpuY3lrcFhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZTd2dkR2x0Wlc5MWRDbGNiaUFnSUNBZ0lDQWdJQ0FnSUgwcFhHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQnVaWGNnVUhKdmJXbHpaU2h5WlhOdmJIWmxJRDArSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsYzI5c2RtVW9kSGx3Wlc5bUlHTnZiblJsZUhRZ1BUMDlJQ2R2WW1wbFkzUW5JRDhnWTJGc2JHSmhZMnN1WTJGc2JDaGpiMjUwWlhoMExDQXVMaTVoY21kektTQTZJR05oYkd4aVlXTnJMbUZ3Y0d4NUtHTnZiblJsZUhRc0lDNHVMbUZ5WjNNcEtWeHVJQ0FnSUNBZ0lDQjlLVnh1SUNBZ0lIMWNiaUFnSUNCY2JpQWdJQ0JzYVhOMFpXNG9aWFpsYm5Rc0lHTmhiR3hpWVdOcktTQjdYRzRnSUNBZ0lDQWdJR2xtSUNoMGVYQmxiMllnWlhabGJuUWdJVDA5SUNkemRISnBibWNuSUh4OElIUjVjR1Z2WmlCallXeHNZbUZqYXlBaFBUMGdKMloxYm1OMGFXOXVKeWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdVhHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJR2xtSUNnaGRHaHBjeTVsZG1WdWRITXVhR0Z6S0dWMlpXNTBLU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1bGRtVnVkSE11YzJWMEtHVjJaVzUwTENCdVpYY2dUV0Z3S0NrcFhHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJR3hsZENCbGRtVnVkRWxrSUQwZ0xURmNiaUFnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJSFJvYVhNdVpYWmxiblJ6TG1admNrVmhZMmdvWlhabGJuUWdQVDRnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdaWFpsYm5SSlpDQTlJRTFoZEdndWJXRjRLR1YyWlc1MFNXUXNJQzR1TG1WMlpXNTBMbXRsZVhNb0tTbGNiaUFnSUNBZ0lDQWdmU2s3WEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNBcksyVjJaVzUwU1dSY2JpQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lIUm9hWE11WlhabGJuUnpMbWRsZENobGRtVnVkQ2t1YzJWMEtHVjJaVzUwU1dRc0lHTmhiR3hpWVdOcktWeHVJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlHVjJaVzUwU1dSY2JpQWdJQ0I5WEc0Z0lDQWdYRzRnSUNBZ2MzUnZjRXhwYzNSbGJpaGxkbVZ1ZEVsa0tTQjdYRzRnSUNBZ0lDQWdJR1p2Y2lBb2JHVjBJR1YyWlc1MGN5QnZaaUIwYUdsekxtVjJaVzUwY3k1MllXeDFaWE1vS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnWm05eUlDaHNaWFFnYVdRZ2IyWWdaWFpsYm5SekxtdGxlWE1vS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2hwWkNBOVBUMGdaWFpsYm5SSlpDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnWlhabGJuUnpMbVJsYkdWMFpTaGxkbVZ1ZEVsa0tWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQm1ZV3h6WlZ4dUlDQWdJSDFjYmlBZ0lDQmNiaUFnSUNCMGNtbG5aMlZ5S0NrZ2UxeHVJQ0FnSUNBZ0lDQnNaWFFnYzJWc1ppQTlJSFJvYVhNZ2FXNXpkR0Z1WTJWdlppQkZiblJwZEhsTllXNWhaMlZ5SUQ4Z2RHaHBjeTVsZG1WdWRFaGhibVJzWlhJZ09pQjBhR2x6WEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCc1pYUWdZWEpuY3lBOUlFRnljbUY1TG1aeWIyMG9ZWEpuZFcxbGJuUnpLVnh1SUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnYkdWMElGc2daWFpsYm5RZ1hTQTlJR0Z5WjNNdWMzQnNhV05sS0RBc0lERXBYRzRnSUNBZ0lDQWdJRnh1SUNBZ0lDQWdJQ0JwWmlBb2RIbHdaVzltSUdWMlpXNTBJQ0U5UFNBbmMzUnlhVzVuSnlCOGZDQWhjMlZzWmk1bGRtVnVkSE11YUdGektHVjJaVzUwS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJSE5sYkdZdVpXMXdkSGxRY205dGFYTmxLQ2xjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ2JHVjBJSEJ5YjIxcGMyVnpJRDBnVzExY2JpQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lHWnZjaUFvYkdWMElHTmhiR3hpWVdOcklHOW1JSE5sYkdZdVpYWmxiblJ6TG1kbGRDaGxkbVZ1ZENrdWRtRnNkV1Z6S0NrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhCeWIyMXBjMlZ6TG5CMWMyZ29jMlZzWmk1d2NtOXRhWE5sS0dOaGJHeGlZV05yTENCMGFHbHpMQ0JoY21kekxDQXhLU2xjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUZCeWIyMXBjMlV1WVd4c0tIQnliMjFwYzJWektWeHVJQ0FnSUgxY2JpQWdJQ0JjYmlBZ0lDQjBjbWxuWjJWeVJHVnNZWGxsWkNncElIdGNiaUFnSUNBZ0lDQWdiR1YwSUhObGJHWWdQU0IwYUdseklHbHVjM1JoYm1ObGIyWWdSVzUwYVhSNVRXRnVZV2RsY2lBL0lIUm9hWE11WlhabGJuUklZVzVrYkdWeUlEb2dkR2hwYzF4dUlDQWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ2JHVjBJR0Z5WjNNZ1BTQkJjbkpoZVM1bWNtOXRLR0Z5WjNWdFpXNTBjeWxjYmlBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUd4bGRDQmJJR1YyWlc1MExDQjBhVzFsYjNWMElGMGdQU0JoY21kekxuTndiR2xqWlNnd0xDQXlLVnh1SUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnYVdZZ0tIUjVjR1Z2WmlCbGRtVnVkQ0FoUFQwZ0ozTjBjbWx1WnljZ2ZId2dJVTUxYldKbGNpNXBjMGx1ZEdWblpYSW9kR2x0Wlc5MWRDa2dmSHdnSVhObGJHWXVaWFpsYm5SekxtaGhjeWhsZG1WdWRDa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCelpXeG1MbVZ0Y0hSNVVISnZiV2x6WlNncFhHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJR3hsZENCd2NtOXRhWE5sY3lBOUlGdGRYRzRnSUNBZ0lDQWdJRnh1SUNBZ0lDQWdJQ0JtYjNJZ0tHeGxkQ0JqWVd4c1ltRmpheUJ2WmlCelpXeG1MbVYyWlc1MGN5NW5aWFFvWlhabGJuUXBMblpoYkhWbGN5Z3BLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQndjbTl0YVhObGN5NXdkWE5vS0hObGJHWXVjSEp2YldselpTaGpZV3hzWW1GamF5d2dkR2hwY3l3Z1lYSm5jeXdnZEdsdFpXOTFkQ2twWEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCUWNtOXRhWE5sTG1Gc2JDaHdjbTl0YVhObGN5bGNiaUFnSUNCOVhHNTlJaXdpYVcxd2IzSjBJRVZ1ZEdsMGVVWmhZM1J2Y25rZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdaeWIyMGdKeTR2Wlc1MGFYUjVMV1poWTNSdmNua25YRzVwYlhCdmNuUWdRMjl0Y0c5dVpXNTBUV0Z1WVdkbGNpQWdJQ0FnSUNBZ0lDQWdJQ0FnWm5KdmJTQW5MaTlqYjIxd2IyNWxiblF0YldGdVlXZGxjaWRjYm1sdGNHOXlkQ0JUZVhOMFpXMU5ZVzVoWjJWeUxDQjdJRk41YzNSbGJWUjVjR1VnZlNCbWNtOXRJQ2N1TDNONWMzUmxiUzF0WVc1aFoyVnlKMXh1YVcxd2IzSjBJRVYyWlc1MFNHRnVaR3hsY2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdaeWIyMGdKeTR2WlhabGJuUXRhR0Z1Wkd4bGNpZGNibHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdZMnhoYzNNZ1JXNTBhWFI1VFdGdVlXZGxjaUI3WEc0Z0lDQWdZMjl1YzNSeWRXTjBiM0lvWTJGd1lXTnBkSGtnUFNBeE1EQXdLU0I3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVZMkZ3WVdOcGRIa2dJQ0FnSUNBZ0lDQTlJR05oY0dGamFYUjVYRzRnSUNBZ0lDQWdJSFJvYVhNdVkzVnljbVZ1ZEUxaGVFVnVkR2wwZVNBOUlDMHhYRzRnSUNBZ0lDQWdJRnh1SUNBZ0lDQWdJQ0IwYUdsekxtVnVkR2wwZVVaaFkzUnZjbmtnSUNBZ1BTQnVaWGNnUlc1MGFYUjVSbUZqZEc5eWVTZ3BYRzRnSUNBZ0lDQWdJSFJvYVhNdWMzbHpkR1Z0VFdGdVlXZGxjaUFnSUNBOUlHNWxkeUJUZVhOMFpXMU5ZVzVoWjJWeUtDbGNiaUFnSUNBZ0lDQWdkR2hwY3k1amIyMXdiMjVsYm5STllXNWhaMlZ5SUQwZ2JtVjNJRU52YlhCdmJtVnVkRTFoYm1GblpYSW9LVnh1SUNBZ0lDQWdJQ0IwYUdsekxtVjJaVzUwU0dGdVpHeGxjaUFnSUNBZ1BTQnVaWGNnUlhabGJuUklZVzVrYkdWeUtDbGNiaUFnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJSFJvYVhNdVpXNTBhWFJwWlhNZ1BTQkJjbkpoZVM1bWNtOXRLSHNnYkdWdVozUm9JRG9nZEdocGN5NWpZWEJoWTJsMGVTQjlMQ0FvS1NBOVBpQW9leUJqYjIxd2IyNWxiblJ6T2lCYklGMGdmU2twWEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCMGFHbHpMbVZ1ZEdsMGVVTnZibVpwWjNWeVlYUnBiMjV6SUQwZ2JtVjNJRTFoY0NncFhHNGdJQ0FnZlZ4dUlDQWdJRnh1SUNBZ0lHbHVZM0psWVhObFEyRndZV05wZEhrb0tTQjdYRzRnSUNBZ0lDQWdJR3hsZENCdmJHUkRZWEJoWTJsMGVTQTlJSFJvYVhNdVkyRndZV05wZEhsY2JpQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lIUm9hWE11WTJGd1lXTnBkSGtnS2owZ01seHVJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdkR2hwY3k1bGJuUnBkR2xsY3lBOUlGc3VMaTUwYUdsekxtVnVkR2wwYVdWekxDQXVMaTVCY25KaGVTNW1jbTl0S0hzZ2JHVnVaM1JvSURvZ2IyeGtRMkZ3WVdOcGRIa2dmU3dnS0NrZ1BUNGdLSHNnWTI5dGNHOXVaVzUwY3pvZ1d5QmRJSDBwS1YxY2JseHVJQ0FnSUNBZ0lDQm1iM0lnS0d4bGRDQnBJRDBnYjJ4a1EyRndZV05wZEhrN0lHa2dQQ0IwYUdsekxtTmhjR0ZqYVhSNU95QXJLMmtwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR1p2Y2lBb2JHVjBJR052YlhCdmJtVnVkQ0J2WmlCMGFHbHpMbU52YlhCdmJtVnVkRTFoYm1GblpYSXVaMlYwUTI5dGNHOXVaVzUwY3lncExtdGxlWE1vS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11Wlc1MGFYUnBaWE5iYVYxYlkyOXRjRzl1Wlc1MFhTQTlJSFJvYVhNdVkyOXRjRzl1Wlc1MFRXRnVZV2RsY2k1dVpYZERiMjF3YjI1bGJuUW9ZMjl0Y0c5dVpXNTBLVnh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ2ZWeHVJQ0FnSUZ4dUlDQWdJRzVsZDBWdWRHbDBlU2hqYjIxd2IyNWxiblJ6S1NCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2doUVhKeVlYa3VhWE5CY25KaGVTaGpiMjF3YjI1bGJuUnpLU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdkR2h5YjNjZ1ZIbHdaVVZ5Y205eUtDZGpiMjF3YjI1bGJuUnpJR0Z5WjNWdFpXNTBJRzExYzNRZ1ltVWdZVzRnWVhKeVlYa2diMllnWTI5dGNHOXVaVzUwY3k0bktWeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJRnh1SUNBZ0lDQWdJQ0JzWlhRZ2FXUWdQU0F3WEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCbWIzSWdLRHNnYVdRZ1BDQjBhR2x6TG1OaGNHRmphWFI1T3lBcksybGtLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvZEdocGN5NWxiblJwZEdsbGMxdHBaRjB1WTI5dGNHOXVaVzUwY3k1c1pXNW5kR2dnUFQwOUlEQXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JpY21WaGExeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lGeHVJQ0FnSUNBZ0lDQnBaaUFvYVdRZ1BqMGdkR2hwY3k1allYQmhZMmwwZVNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnTHk4Z2RHOWtiem9nWVhWMGJ5QnBibU55WldGelpTQmpZWEJoWTJsMGVUOWNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUI3SUdsa0lEb2dkR2hwY3k1allYQmhZMmwwZVN3Z1pXNTBhWFI1SURvZ2JuVnNiQ0I5WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lHbG1JQ2hwWkNBK0lIUm9hWE11WTNWeWNtVnVkRTFoZUVWdWRHbDBlU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1amRYSnlaVzUwVFdGNFJXNTBhWFI1SUQwZ2FXUmNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnZEdocGN5NWxiblJwZEdsbGMxdHBaRjB1WTI5dGNHOXVaVzUwY3lBOUlHTnZiWEJ2Ym1WdWRITmNiaUFnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQjdJR2xrTENCbGJuUnBkSGtnT2lCMGFHbHpMbVZ1ZEdsMGFXVnpXMmxrWFNCOVhHNGdJQ0FnZlZ4dUlDQWdJRnh1SUNBZ0lHUmxiR1YwWlVWdWRHbDBlU2hwWkNrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG1WdWRHbDBhV1Z6VzJsa1hTNWpiMjF3YjI1bGJuUnpJRDBnVzExY2JpQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lHbG1JQ2hwWkNBOElIUm9hWE11WTNWeWNtVnVkRTFoZUVWdWRHbDBlU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdVhHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJR1p2Y2lBb2JHVjBJR2tnUFNCcFpEc2dhU0ErUFNBd095QXRMV2twSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoMGFHbHpMbVZ1ZEdsMGFXVnpXMmxkTG1OdmJYQnZibVZ1ZEhNdWJHVnVaM1JvSUNFOVBTQXdLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NWpkWEp5Wlc1MFRXRjRSVzUwYVhSNUlEMGdhVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJseHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDQWdkR2hwY3k1amRYSnlaVzUwVFdGNFJXNTBhWFI1SUQwZ01GeHVJQ0FnSUgxY2JseHVJQ0FnSUNwblpYUkZiblJwZEdsbGN5aGpiMjF3YjI1bGJuUnpJRDBnYm5Wc2JDa2dlMXh1SUNBZ0lDQWdJQ0JtYjNJZ0tHeGxkQ0JwWkNBOUlEQTdJR2xrSUR3OUlIUm9hWE11WTNWeWNtVnVkRTFoZUVWdWRHbDBlVHNnS3l0cFpDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLR052YlhCdmJtVnVkSE1nUFQwOUlHNTFiR3dnZkh3Z1kyOXRjRzl1Wlc1MGN5NWxkbVZ5ZVNoamIyMXdiMjVsYm5RZ1BUNGdkR2hwY3k1bGJuUnBkR2xsYzF0cFpGMHVZMjl0Y0c5dVpXNTBjeTVwYm1SbGVFOW1LR052YlhCdmJtVnVkQ2tnSVQwOUlDMHhLU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhscFpXeGtJSHNnYVdRc0lHVnVkR2wwZVNBNklIUm9hWE11Wlc1MGFYUnBaWE5iYVdSZElIMWNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JpQWdJQ0JjYmlBZ0lDQnlaV2RwYzNSbGNrTnZibVpwWjNWeVlYUnBiMjRvYTJWNUtTQjdYRzRnSUNBZ0lDQWdJR2xtSUNoMGVYQmxiMllnYTJWNUlDRTlQU0FuYzNSeWFXNW5KeUI4ZkNCclpYa2dQVDA5SUNjbktTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFISnZkeUJVZVhCbFJYSnliM0lvSjJ0bGVTQnRkWE4wSUdKbElHRWdibTl1SUdWdGNIUjVJSE4wY21sdVp5NG5LVnh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCMGFHbHpMbVZ1ZEdsMGVVTnZibVpwWjNWeVlYUnBiMjV6TG5ObGRDaHJaWGtzSUhSb2FYTXVaVzUwYVhSNVJtRmpkRzl5ZVM1amNtVmhkR1ZEYjI1bWFXZDFjbUYwYVc5dUtDa3BYRzRnSUNBZ0lDQWdJRnh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdhMlY1WEc0Z0lDQWdmVnh1SUNBZ0lGeHVJQ0FnSUM4dklFTnZiWEJ2Ym1WdWRDQk5ZVzVoWjJWeVhHNGdJQ0FnWEc0Z0lDQWdjbVZuYVhOMFpYSkRiMjF3YjI1bGJuUW9hMlY1TENCamIyMXdiMjVsYm5RcElIdGNiaUFnSUNBZ0lDQWdkR2hwY3k1amIyMXdiMjVsYm5STllXNWhaMlZ5TG5KbFoybHpkR1Z5UTI5dGNHOXVaVzUwS0d0bGVTd2dZMjl0Y0c5dVpXNTBLVnh1SUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnWm05eUlDaHNaWFFnWlc1MGFYUjVJRzltSUhSb2FYTXVaVzUwYVhScFpYTXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHVnVkR2wwZVZ0clpYbGRJRDBnZEdocGN5NWpiMjF3YjI1bGJuUk5ZVzVoWjJWeUxtNWxkME52YlhCdmJtVnVkQ2hyWlhrcFhHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJR3hsZENCcGJtbDBhV0ZzYVhwbGNseHVYRzRnSUNBZ0lDQWdJSE4zYVhSamFDQW9kSGx3Wlc5bUlHTnZiWEJ2Ym1WdWRDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1kyRnpaU0FuWm5WdVkzUnBiMjRuT2lCcGJtbDBhV0ZzYVhwbGNpQTlJR052YlhCdmJtVnVkRHNnWW5KbFlXdGNiaUFnSUNBZ0lDQWdJQ0FnSUdOaGMyVWdKMjlpYW1WamRDYzZJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwYm1sMGFXRnNhWHBsY2lBOUlHWjFibU4wYVc5dUtDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbWIzSWdLR3hsZENCclpYa2diMllnVDJKcVpXTjBMbXRsZVhNb1kyOXRjRzl1Wlc1MEtTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR2hwYzF0clpYbGRJRDBnWTI5dGNHOXVaVzUwVzJ0bGVWMWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR0p5WldGclhHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQmtaV1poZFd4ME9pQnBibWwwYVdGc2FYcGxjaUE5SUdaMWJtTjBhVzl1S0NrZ2V5QnlaWFIxY200Z1kyOXRjRzl1Wlc1MElIMDdJR0p5WldGclhHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJSFJvYVhNdVpXNTBhWFI1Um1GamRHOXllUzV5WldkcGMzUmxja2x1YVhScFlXeHBlbVZ5S0d0bGVTd2dhVzVwZEdsaGJHbDZaWElwWEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnYTJWNVhHNGdJQ0FnZlZ4dUlDQWdJRnh1SUNBZ0lHRmtaRU52YlhCdmJtVnVkQ2hwWkN3Z1kyOXRjRzl1Wlc1MFMyVjVLU0I3WEc0Z0lDQWdJQ0FnSUdsbUlDaDBhR2x6TG1WdWRHbDBhV1Z6VzJsa1hTNWpiMjF3YjI1bGJuUnpMbWx1WkdWNFQyWW9ZMjl0Y0c5dVpXNTBTMlY1S1NBaFBUMGdMVEVwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJseHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJRnh1SUNBZ0lDQWdJQ0IwYUdsekxtVnVkR2wwYVdWelcybGtYUzVqYjIxd2IyNWxiblJ6TG5CMWMyZ29ZMjl0Y0c5dVpXNTBTMlY1S1Z4dUlDQWdJSDFjYmlBZ0lDQmNiaUFnSUNCeVpXMXZkbVZEYjIxd2IyNWxiblFvYVdRc0lHTnZiWEJ2Ym1WdWRDa2dlMXh1SUNBZ0lDQWdJQ0JzWlhRZ2FXNWtaWGdnUFNCMGFHbHpMbVZ1ZEdsMGFXVnpXMmxrWFM1amIyMXdiMjVsYm5SekxtbHVaR1Y0VDJZb1kyOXRjRzl1Wlc1MEtWeHVJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdhV1lnS0dsdVpHVjRJRDA5UFNBdE1Ta2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lIUm9hWE11Wlc1MGFYUnBaWE5iYVdSZExtTnZiWEJ2Ym1WdWRITXVjM0JzYVdObEtHbHVaR1Y0TENBeEtWeHVJQ0FnSUgxY2JpQWdJQ0JjYmlBZ0lDQXZMeUJUZVhOMFpXMGdUV0Z1WVdkbGNseHVJQ0FnSUZ4dUlDQWdJSEpsWjJsemRHVnlVM2x6ZEdWdEtHdGxlU3dnZEhsd1pTd2dZMjl0Y0c5dVpXNTBjeXdnWTJGc2JHSmhZMnNwSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSb2FYTXVjM2x6ZEdWdFRXRnVZV2RsY2k1eVpXZHBjM1JsY2xONWMzUmxiU2hyWlhrc0lIUjVjR1VzSUdOdmJYQnZibVZ1ZEhNc0lHTmhiR3hpWVdOcktWeHVJQ0FnSUgxY2JpQWdJQ0JjYmlBZ0lDQnlaV2RwYzNSbGNreHZaMmxqVTNsemRHVnRLR3RsZVN3Z1kyOXRjRzl1Wlc1MGN5d2dZMkZzYkdKaFkyc3BJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSFJvYVhNdWMzbHpkR1Z0VFdGdVlXZGxjaTV5WldkcGMzUmxjbE41YzNSbGJTaHJaWGtzSUZONWMzUmxiVlI1Y0dVdVRHOW5hV01zSUdOdmJYQnZibVZ1ZEhNc0lHTmhiR3hpWVdOcktWeHVJQ0FnSUgxY2JpQWdJQ0JjYmlBZ0lDQnlaV2RwYzNSbGNsSmxibVJsY2xONWMzUmxiU2hyWlhrc0lHTnZiWEJ2Ym1WdWRITXNJR05oYkd4aVlXTnJLU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUIwYUdsekxuTjVjM1JsYlUxaGJtRm5aWEl1Y21WbmFYTjBaWEpUZVhOMFpXMG9hMlY1TENCVGVYTjBaVzFVZVhCbExsSmxibVJsY2l3Z1kyOXRjRzl1Wlc1MGN5d2dZMkZzYkdKaFkyc3BYRzRnSUNBZ2ZWeHVJQ0FnSUZ4dUlDQWdJSEpsWjJsemRHVnlTVzVwZEZONWMzUmxiU2hyWlhrc0lHTnZiWEJ2Ym1WdWRITXNJR05oYkd4aVlXTnJLU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUIwYUdsekxuTjVjM1JsYlUxaGJtRm5aWEl1Y21WbmFYTjBaWEpUZVhOMFpXMG9hMlY1TENCVGVYTjBaVzFVZVhCbExrbHVhWFFzSUdOdmJYQnZibVZ1ZEhNc0lHTmhiR3hpWVdOcktWeHVJQ0FnSUgxY2JpQWdJQ0JjYmlBZ0lDQnlaVzF2ZG1WVGVYTjBaVzBvYTJWNUtTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQjBhR2x6TG5ONWMzUmxiVTFoYm1GblpYSXVjbVZ0YjNabFUzbHpkR1Z0S0d0bGVTbGNiaUFnSUNCOVhHNGdJQ0FnWEc0Z0lDQWdiMjVNYjJkcFl5aHZjSFJ6S1NCN1hHNGdJQ0FnSUNBZ0lHWnZjaUFvYkdWMElITjVjM1JsYlNCdlppQjBhR2x6TG5ONWMzUmxiVTFoYm1GblpYSXViRzluYVdOVGVYTjBaVzF6TG5aaGJIVmxjeWdwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J6ZVhOMFpXMHVZMkZzYkdKaFkyc3VZMkZzYkNoMGFHbHpMQ0IwYUdsekxtZGxkRVZ1ZEdsMGFXVnpLSE41YzNSbGJTNWpiMjF3YjI1bGJuUnpLU3dnYjNCMGN5bGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lIMWNiaUFnSUNCY2JpQWdJQ0J2YmxKbGJtUmxjaWh2Y0hSektTQjdYRzRnSUNBZ0lDQWdJR1p2Y2lBb2JHVjBJSE41YzNSbGJTQnZaaUIwYUdsekxuTjVjM1JsYlUxaGJtRm5aWEl1Y21WdVpHVnlVM2x6ZEdWdGN5NTJZV3gxWlhNb0tTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2MzbHpkR1Z0TG1OaGJHeGlZV05yTG1OaGJHd29kR2hwY3l3Z2RHaHBjeTVuWlhSRmJuUnBkR2xsY3loemVYTjBaVzB1WTI5dGNHOXVaVzUwY3lrc0lHOXdkSE1wWEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0I5WEc1Y2JpQWdJQ0J2YmtsdWFYUW9iM0IwY3lrZ2UxeHVJQ0FnSUNBZ0lDQm1iM0lnS0d4bGRDQnplWE4wWlcwZ2IyWWdkR2hwY3k1emVYTjBaVzFOWVc1aFoyVnlMbWx1YVhSVGVYTjBaVzF6TG5aaGJIVmxjeWdwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J6ZVhOMFpXMHVZMkZzYkdKaFkyc3VZMkZzYkNoMGFHbHpMQ0IwYUdsekxtZGxkRVZ1ZEdsMGFXVnpLSE41YzNSbGJTNWpiMjF3YjI1bGJuUnpLU3dnYjNCMGN5bGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lIMWNiaUFnSUNCY2JpQWdJQ0F2THlCRmJuUnBkSGtnUm1GamRHOXllVnh1SUNBZ0lGeHVJQ0FnSUhKbFoybHpkR1Z5U1c1cGRHbGhiR2w2WlhJb1kyOXRjRzl1Wlc1MFNXUXNJR2x1YVhScFlXeHBlbVZ5S1NCN1hHNGdJQ0FnSUNBZ0lIUm9hWE11Wlc1MGFYUjVSbUZqZEc5eWVTNXlaV2RwYzNSbGNrbHVhWFJwWVd4cGVtVnlLR052YlhCdmJtVnVkRWxrTENCcGJtbDBhV0ZzYVhwbGNpbGNiaUFnSUNCOVhHNGdJQ0FnWEc0Z0lDQWdZblZwYkdRb0tTQjdYRzRnSUNBZ0lDQWdJSFJvYVhNdVpXNTBhWFI1Um1GamRHOXllUzVpZFdsc1pDZ3BYRzRnSUNBZ0lDQWdJRnh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdkR2hwYzF4dUlDQWdJSDFjYmlBZ0lDQmNiaUFnSUNCM2FYUm9RMjl0Y0c5dVpXNTBLR052YlhCdmJtVnVkRWxrTENCcGJtbDBhV0ZzYVhwbGNpa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxtVnVkR2wwZVVaaFkzUnZjbmt1ZDJsMGFFTnZiWEJ2Ym1WdWRDaGpiMjF3YjI1bGJuUkpaQ3dnYVc1cGRHbGhiR2w2WlhJcFhHNGdJQ0FnSUNBZ0lGeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2RHaHBjMXh1SUNBZ0lIMWNiaUFnSUNCY2JpQWdJQ0JqY21WaGRHVW9ZMjkxYm5Rc0lHdGxlU2tnZTF4dUlDQWdJQ0FnSUNCc1pYUWdZMjl1Wm1sbmRYSmhkR2x2YmlBOUlIVnVaR1ZtYVc1bFpGeHVJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdhV1lnS0hSNWNHVnZaaUJyWlhrZ1BUMDlJQ2R6ZEhKcGJtY25LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpiMjVtYVdkMWNtRjBhVzl1SUQwZ2RHaHBjeTVsYm5ScGRIbERiMjVtYVdkMWNtRjBhVzl1Y3k1blpYUW9hMlY1S1Z4dUlDQWdJQ0FnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9ZMjl1Wm1sbmRYSmhkR2x2YmlBOVBUMGdkVzVrWldacGJtVmtLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZEdoeWIzY2dWSGx3WlVWeWNtOXlLQ2RqYjNWc1pDQnViM1FnWm1sdVpDQmxiblJwZEhrZ1kyOXVabWxuZFhKaGRHbHZiaUJtYjNJZ2RHaGxJSE4xY0hCc2FXVmtJR3RsZVM0Z2FXWWdlVzkxSUhkcGMyZ2dkRzhnWTNKbFlYUmxJR0Z1SUdWdWRHbDBlU0IzYVhSb2IzVjBJR0VnWTI5dVptbG5kWEpoZEdsdmJpd2daRzhnYm05MElIQmhjM01nWVNCclpYa3VKeWxjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSFJvYVhNdVpXNTBhWFI1Um1GamRHOXllUzVqY21WaGRHVW9kR2hwY3l3Z1kyOTFiblFzSUdOdmJtWnBaM1Z5WVhScGIyNHBYRzRnSUNBZ2ZWeHVJQ0FnSUZ4dUlDQWdJQzh2SUVWMlpXNTBJRWhoYm1Sc1pYSmNiaUFnSUNCY2JpQWdJQ0JzYVhOMFpXNG9aWFpsYm5Rc0lHTmhiR3hpWVdOcktTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQjBhR2x6TG1WMlpXNTBTR0Z1Wkd4bGNpNXNhWE4wWlc0b1pYWmxiblFzSUdOaGJHeGlZV05yS1Z4dUlDQWdJSDFjYmlBZ0lDQmNiaUFnSUNCemRHOXdUR2x6ZEdWdUtHVjJaVzUwU1dRcElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIUm9hWE11WlhabGJuUklZVzVrYkdWeUxuTjBiM0JNYVhOMFpXNG9aWFpsYm5SSlpDbGNiaUFnSUNCOVhHNGdJQ0FnWEc0Z0lDQWdkSEpwWjJkbGNpZ3BJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSFJvYVhNdVpYWmxiblJJWVc1a2JHVnlMblJ5YVdkblpYSXVZMkZzYkNoMGFHbHpMQ0F1TGk1aGNtZDFiV1Z1ZEhNcFhHNGdJQ0FnZlZ4dUlDQWdJRnh1SUNBZ0lIUnlhV2RuWlhKRVpXeGhlV1ZrS0NrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2RHaHBjeTVsZG1WdWRFaGhibVJzWlhJdWRISnBaMmRsY2tSbGJHRjVaV1F1WTJGc2JDaDBhR2x6TENBdUxpNWhjbWQxYldWdWRITXBYRzRnSUNBZ2ZWeHVmU0pkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN1VVRkZjVUk3UVVGRGFrSXNTVUZCUVN4aFFVUnBRaXhoUVVOcVFpeEhRVUZqT3poRFFVUkhMR1ZCUTBnN08wRkJRMVlzU1VGQlFTeGhRVUZMTEZsQlFVd3NSMEZCY1VJc1NVRkJTU3hIUVVGS0xFVkJRWEpDTEVOQlJGVTdRVUZGVml4SlFVRkJMR0ZCUVVzc1lVRkJUQ3hIUVVGeFFpeEpRVUZKTEVkQlFVb3NSVUZCY2tJc1EwRkdWVHRUUVVGa096dHBRMEZFYVVJN08yZEVRVTFITEV0QlFVc3NZVUZCWVR0QlFVTnNReXhKUVVGQkxHZENRVUZKTEU5QlFVOHNSMEZCVUN4TFFVRmxMRkZCUVdZc1NVRkJNa0lzVVVGQlVTeEZRVUZTTEVWQlFWazdRVUZEZGtNc1NVRkJRU3h6UWtGQlRTeFZRVUZWTEdsRFFVRldMRU5CUVU0c1EwRkVkVU03YVVKQlFUTkRPenRCUVVsQkxFbEJRVUVzWjBKQlFVa3NUMEZCVHl4WFFVRlFMRXRCUVhWQ0xGVkJRWFpDTEVWQlFXMURPMEZCUTI1RExFbEJRVUVzYzBKQlFVMHNWVUZCVlN4cFEwRkJWaXhEUVVGT0xFTkJSRzFETzJsQ1FVRjJRenM3UVVGSlFTeEpRVUZCTEdsQ1FVRkxMRmxCUVV3c1EwRkJhMElzUjBGQmJFSXNRMEZCYzBJc1IwRkJkRUlzUlVGQk1rSXNWMEZCTTBJc1JVRlVhME03T3pzN2IwTkJXVGxDTzBGQlEwb3NTVUZCUVN4cFFrRkJTeXhoUVVGTUxFZEJRWEZDTEVsQlFVa3NSMEZCU2l4RlFVRnlRaXhEUVVSSk96dEJRVWRLTEVsQlFVRXNiVUpCUVU4c1NVRkJVQ3hEUVVoSk96czdPekJEUVUxTkxFdEJRVXNzWVVGQllUdEJRVU0xUWl4SlFVRkJMR2RDUVVGSkxFOUJRVThzUjBGQlVDeExRVUZsTEZGQlFXWXNTVUZCTWtJc1VVRkJVU3hGUVVGU0xFVkJRVms3UVVGRGRrTXNTVUZCUVN4MVFrRkJUeXhKUVVGUUxFTkJSSFZETzJsQ1FVRXpRenM3UVVGSlFTeEpRVUZCTEdkQ1FVRkpMRTlCUVU4c1YwRkJVQ3hMUVVGMVFpeFZRVUYyUWl4RlFVRnRRenRCUVVOdVF5eEpRVUZCTERoQ1FVRmpMRXRCUVVzc1dVRkJUQ3hEUVVGclFpeEhRVUZzUWl4RFFVRnpRaXhIUVVGMFFpeERRVUZrTEVOQlJHMURPMmxDUVVGMlF6czdRVUZKUVN4SlFVRkJMR2xDUVVGTExHRkJRVXdzUTBGQmJVSXNSMEZCYmtJc1EwRkJkVUlzUjBGQmRrSXNSVUZCTkVJc1YwRkJOVUlzUlVGVU5FSTdPMEZCVnpWQ0xFbEJRVUVzYlVKQlFVOHNTVUZCVUN4RFFWZzBRanM3T3p0clJFRmpWanRCUVVOc1FpeEpRVUZCTEcxQ1FVRlBMRXRCUVVzc1lVRkJUQ3hEUVVSWE96czdPMjFEUVVsbUxHVkJRWEZFTzI5Q1FVRjBReXc0UkVGQlVTeHBRa0ZCT0VJN2IwSkJRVE5DTEhORlFVRm5RaXg1UWtGQlZ6czdRVUZEZUVRc1NVRkJRU3huUWtGQlNTeEZRVUZGTEhsQ1FVRjVRaXhoUVVGNlFpeERRVUZHTEVWQlFUSkRPMEZCUXpORExFbEJRVUVzZFVKQlFVOHNSVUZCVUN4RFFVUXlRenRwUWtGQkwwTTdPMEZCU1VFc1NVRkJRU3cwUWtGQlowSXNhVUpCUVdsQ0xFdEJRVXNzWVVGQlRDeERRVXgxUWpzN1FVRlBlRVFzU1VGQlFTeG5Ra0ZCU1N4aFFVRmhMRVZCUVdJc1EwRlFiMFE3T3pzN096czdRVUZUZUVRc1NVRkJRU3h4UTBGQmMwSXNZMEZCWXl4SlFVRmtMRFJDUVVGMFFpeHZSMEZCTkVNN05FSkJRVzVETEhkQ1FVRnRRenM3UVVGRGVFTXNTVUZCUVN3clFrRkJWeXhKUVVGWUxFTkJRV2RDTEZOQlFXaENMRVZCUkhkRE8zRkNRVUUxUXpzN096czdPenM3T3pzN096czdhVUpCVkhkRU96dEJRV0Y0UkN4SlFVRkJMR2RDUVVGSkxGZEJRVmNzUlVGQldDeERRV0p2UkRzN1FVRmxlRVFzU1VGQlFTeHBRa0ZCU3l4SlFVRkpMRWxCUVVrc1EwRkJTaXhGUVVGUExFbEJRVWtzUzBGQlNpeEZRVUZYTEVWQlFVVXNRMEZCUml4RlFVRkxPMmRFUVVOUUxHTkJRV01zVTBGQlpDeERRVUYzUWl4VlFVRjRRaXhGUVVSUE96dDNRa0ZEZEVJc09FSkJSSE5DTzNkQ1FVTnNRaXh6UTBGRWEwSTdPenRCUVVjMVFpeEpRVUZCTEc5Q1FVRkpMRTFCUVUwc1kwRkJZeXhSUVVGa0xFVkJRWGRDTzBGQlF6bENMRWxCUVVFc01FSkJSRGhDTzNGQ1FVRnNRenM3TUVSQlNEUkNPenM3T3p0QlFVODFRaXhKUVVGQkxEQkRRVUZ4UXl4M1EwRkJja01zZDBkQlFXOUVPenM3WjBOQlFURkRMRFJDUVVFd1F6dG5RMEZCTDBJc09FSkJRU3RDT3p0QlFVTm9SQ3hKUVVGQkxEUkNRVUZKTEU5QlFVOHNWMEZCVUN4TFFVRjFRaXhWUVVGMlFpeEZRVUZ0UXp0QlFVTnVReXhKUVVGQkxIRkRRVVJ0UXpzMlFrRkJka003TzBGQlNVRXNTVUZCUVN3MFFrRkJTU3hUUVVGVExGbEJRVmtzU1VGQldpeERRVUZwUWl4UFFVRlBMRk5CUVZBc1EwRkJha0lzUTBGQlZDeERRVXcwUXpzN1FVRlBhRVFzU1VGQlFTdzBRa0ZCU1N4dlFrRkJUeXhQUVVGUExGTkJRVkFzUlVGQlVDeExRVUUyUWl4UlFVRTNRaXhKUVVGNVF5eFhRVUZYTEZOQlFWZ3NSVUZCYzBJN1FVRkRMMFFzU1VGQlFTeHRRMEZCVHl4VFFVRlFMRWxCUVc5Q0xFMUJRWEJDTEVOQlJDdEVPelpDUVVGdVJUdDVRa0ZRU2pzN096czdPenM3T3pzN096czdjVUpCVURSQ096dEJRVzFDTlVJc1NVRkJRU3g1UWtGQlV5eEpRVUZVTEVOQlFXTXNSVUZCUlN4TlFVRkdMRVZCUVUwc1kwRkJUaXhGUVVGa0xFVkJia0kwUWp0cFFrRkJhRU03TzBGQmMwSkJMRWxCUVVFc2JVSkJRVThzVTBGQlV5eE5RVUZVTEV0QlFXOUNMRU5CUVhCQ0xFZEJRWGRDTEZOQlFWTXNRMEZCVkN4RFFVRjRRaXhIUVVGelF5eFJRVUYwUXl4RFFYSkRhVVE3T3p0bFFURkRNME03T3p0UlEwWkJPMEZCUTJwQ0xFbEJRVUVzWVVGRWFVSXNaMEpCUTJwQ0xFZEJRV003T0VOQlJFY3NhMEpCUTBnN08wRkJRMVlzU1VGQlFTeGhRVUZMTEZWQlFVd3NSMEZCYTBJc1NVRkJTU3hIUVVGS0xFVkJRV3hDTEVOQlJGVTdVMEZCWkRzN2FVTkJSR2xDT3p0NVEwRkxTaXhMUVVGTE8wRkJRMlFzU1VGQlFTeG5Ra0ZCU1N4WlFVRlpMRXRCUVVzc1ZVRkJUQ3hEUVVGblFpeEhRVUZvUWl4RFFVRnZRaXhIUVVGd1FpeERRVUZhTEVOQlJGVTdPMEZCUjJRc1NVRkJRU3huUWtGQlNTeGhRVUZoTEVsQlFXSXNSVUZCYlVJN1FVRkRia0lzU1VGQlFTeDFRa0ZCVHl4SlFVRlFMRU5CUkcxQ08ybENRVUYyUWpzN1FVRkpRU3hKUVVGQkxESkNRVUZsTEhkRlFVRm1PMEZCUTBrc1NVRkJRU3h4UWtGQlN5eFZRVUZNTzBGQlEwa3NTVUZCUVN3eVFrRkJUeXhKUVVGSkxGTkJRVW9zUlVGQlVDeERRVVJLTzBGQlJFb3NTVUZCUVN4eFFrRkhVeXhSUVVGTU8wRkJRV2xDTEVsQlFVRTdRVUZEWWl4SlFVRkJMQ3RDUVVGUExGVkJRVVVzVTBGQlJDeEZRVUZsTzBGQlEyNUNMRWxCUVVFc1owTkJRVWtzVFVGQlRTeEZRVUZPTEVOQlJHVTdPMEZCUjI1Q0xFbEJRVUVzYlVOQlFVOHNTVUZCVUN4RFFVRlpMRk5CUVZvc1JVRkJkVUlzVDBGQmRrSXNRMEZCSzBJN01rTkJRVThzU1VGQlNTeEhRVUZLTEVsQlFWY3NWVUZCVlN4SFFVRldMRU5CUVZnN2FVTkJRVkFzUTBGQkwwSXNRMEZJYlVJN08wRkJTMjVDTEVsQlFVRXNiVU5CUVU4c1IwRkJVQ3hEUVV4dFFqczJRa0ZCWml4RFFVMU1MRk5CVGtrc1EwRkJVQ3hEUVVSaE8zbENRVUZxUWp0QlFVaEtMRWxCUVVFN1FVRmhVU3hKUVVGQkxESkNRVUZQTEZOQlFWQXNRMEZFU2p0QlFWcEtMRWxCUVVFc1lVRlFZenM3T3pzNFEwRjNRa0VzUzBGQlN5eFhRVUZYTzBGQlF6bENMRWxCUVVFc1owSkJRVWtzVDBGQlR5eEhRVUZRTEV0QlFXVXNVVUZCWml4SlFVRXlRaXhSUVVGUkxFVkJRVklzUlVGQldUdEJRVU4yUXl4SlFVRkJMSE5DUVVGTkxGVkJRVlVzYVVOQlFWWXNRMEZCVGl4RFFVUjFRenRwUWtGQk0wTTdPMEZCU1VFc1NVRkJRU3huUWtGQlNTeGpRVUZqTEVsQlFXUXNTVUZCYzBJc1kwRkJZeXhUUVVGa0xFVkJRWGxDTzBGQlF5OURMRWxCUVVFc2MwSkJRVTBzVlVGQlZTeDNRMEZCVml4RFFVRk9MRU5CUkN0RE8ybENRVUZ1UkRzN1FVRkpRU3hKUVVGQkxHbENRVUZMTEZWQlFVd3NRMEZCWjBJc1IwRkJhRUlzUTBGQmIwSXNSMEZCY0VJc1JVRkJlVUlzVTBGQmVrSXNSVUZVT0VJN08wRkJWemxDTEVsQlFVRXNiVUpCUVU4c1IwRkJVQ3hEUVZnNFFqczdPenMwUTBGamJFSTdRVUZEV2l4SlFVRkJMRzFDUVVGUExFdEJRVXNzVlVGQlRDeERRVVJMT3pzN1pVRXpRME03T3p0SlEwRmtMRWxCUVUwc1lVRkJZVHRCUVVOMFFpeEpRVUZCTEZkQlFWTXNRMEZCVkR0QlFVTkJMRWxCUVVFc1dVRkJVeXhEUVVGVU8wRkJRMEVzU1VGQlFTeFZRVUZUTEVOQlFWUTdTMEZJVXl4RFFVRmlPenRSUVUxeFFqdEJRVU5xUWl4SlFVRkJMR0ZCUkdsQ0xHRkJRMnBDTEVkQlFXTTdPRU5CUkVjc1pVRkRTRHM3UVVGRFZpeEpRVUZCTEdGQlFVc3NXVUZCVEN4SFFVRnhRaXhKUVVGSkxFZEJRVW9zUlVGQmNrSXNRMEZFVlR0QlFVVldMRWxCUVVFc1lVRkJTeXhoUVVGTUxFZEJRWEZDTEVsQlFVa3NSMEZCU2l4RlFVRnlRaXhEUVVaVk8wRkJSMVlzU1VGQlFTeGhRVUZMTEZkQlFVd3NSMEZCY1VJc1NVRkJTU3hIUVVGS0xFVkJRWEpDTEVOQlNGVTdVMEZCWkRzN2FVTkJSR2xDT3pzeVEwRlBSaXhMUVVGTExFMUJRVTBzV1VGQldTeFZRVUZWTzBGQlF6VkRMRWxCUVVFc1owSkJRVWtzVDBGQlR5eEhRVUZRTEV0QlFXVXNVVUZCWml4SlFVRXlRaXhSUVVGUkxFVkJRVklzUlVGQldUdEJRVU4yUXl4SlFVRkJMSE5DUVVGTkxGVkJRVlVzYVVOQlFWWXNRMEZCVGl4RFFVUjFRenRwUWtGQk0wTTdPMEZCU1VFc1NVRkJRU3huUWtGQlNTeFRRVUZUTEZkQlFWY3NTMEZCV0N4SlFVRnZRaXhUUVVGVExGZEJRVmNzVFVGQldDeEpRVUZ4UWl4VFFVRlRMRmRCUVZjc1NVRkJXQ3hGUVVGcFFqdEJRVU55Uml4SlFVRkJMSE5DUVVGTkxGVkJRVlVzYTBOQlFWWXNRMEZCVGl4RFFVUnhSanRwUWtGQmVrWTdPMEZCU1VFc1NVRkJRU3huUWtGQlNTeERRVUZETEUxQlFVMHNUMEZCVGl4RFFVRmpMRlZCUVdRc1EwRkJSQ3hGUVVFMFFqdEJRVU0xUWl4SlFVRkJMSE5DUVVGTkxGVkJRVlVzY1VSQlFWWXNRMEZCVGl4RFFVUTBRanRwUWtGQmFFTTdPMEZCU1VFc1NVRkJRU3huUWtGQlNTeFBRVUZQTEZGQlFWQXNTMEZCYjBJc1ZVRkJjRUlzUlVGQlowTTdRVUZEYUVNc1NVRkJRU3h6UWtGQlRTeFZRVUZWTERoQ1FVRldMRU5CUVU0c1EwRkVaME03YVVKQlFYQkRPenRCUVVsQkxFbEJRVUVzWjBKQlFVa3NVMEZCVXp0QlFVTlVMRWxCUVVFc2MwTkJSRk03UVVGRlZDeEpRVUZCTEd0RFFVWlRPMmxDUVVGVUxFTkJha0ozUXpzN1FVRnpRalZETEVsQlFVRXNiMEpCUVZFc1NVRkJVanRCUVVOSkxFbEJRVUVzY1VKQlFVc3NWMEZCVnl4TFFVRllPMEZCUVcxQ0xFbEJRVUVzZVVKQlFVc3NXVUZCVEN4RFFVRnJRaXhIUVVGc1FpeERRVUZ6UWl4SFFVRjBRaXhGUVVFeVFpeE5RVUV6UWl4RlFVRjRRanRCUVVSS0xFbEJRVUVzY1VKQlJWTXNWMEZCVnl4TlFVRllPMEZCUVc5Q0xFbEJRVUVzZVVKQlFVc3NZVUZCVEN4RFFVRnRRaXhIUVVGdVFpeERRVUYxUWl4SFFVRjJRaXhGUVVFMFFpeE5RVUUxUWl4RlFVRjZRanRCUVVaS0xFbEJRVUVzY1VKQlIxTXNWMEZCVnl4SlFVRllPMEZCUVd0Q0xFbEJRVUVzZVVKQlFVc3NWMEZCVEN4RFFVRnBRaXhIUVVGcVFpeERRVUZ4UWl4SFFVRnlRaXhGUVVFd1FpeE5RVUV4UWl4RlFVRjJRanRCUVVoS0xFbEJRVUVzWVVGMFFqUkRPenRCUVRSQ05VTXNTVUZCUVN4dFFrRkJUeXhIUVVGUUxFTkJOVUkwUXpzN096dDVRMEVyUW01RExFdEJRVXM3UVVGRFpDeEpRVUZCTEcxQ1FVRlBMRXRCUVVzc1dVRkJUQ3hEUVVGclFpeE5RVUZzUWl4RFFVRjVRaXhIUVVGNlFpeExRVUZwUXl4TFFVRkxMR0ZCUVV3c1EwRkJiVUlzVFVGQmJrSXNRMEZCTUVJc1IwRkJNVUlzUTBGQmFrTXNTVUZCYlVVc1MwRkJTeXhYUVVGTUxFTkJRV2xDTEUxQlFXcENMRU5CUVhkQ0xFZEJRWGhDTEVOQlFXNUZMRU5CUkU4N096dGxRWFJEUkRzN08xRkRTa0U3UVVGRGFrSXNTVUZCUVN4aFFVUnBRaXhaUVVOcVFpeEhRVUZqT3poRFFVUkhMR05CUTBnN08wRkJRMVlzU1VGQlFTeGhRVUZMTEUxQlFVd3NSMEZCWXl4SlFVRkpMRWRCUVVvc1JVRkJaQ3hEUVVSVk8xTkJRV1E3TzJsRFFVUnBRanM3TWtOQlMwWTdRVUZEV0N4SlFVRkJMRzFDUVVGUExFbEJRVWtzVDBGQlNpeERRVUZaTEcxQ1FVRlhPMEZCUXpGQ0xFbEJRVUVzTUVKQlJEQkNPMmxDUVVGWUxFTkJRVzVDTEVOQlJGYzdPenM3YjBOQlRWQXNWVUZCVlN4VFFVRlRMRTFCUVUwc1UwRkJVenRCUVVOMFF5eEpRVUZCTEdkQ1FVRkpMRTlCUVVvc1JVRkJZVHRCUVVOVUxFbEJRVUVzZFVKQlFVOHNTVUZCU1N4UFFVRktMRU5CUVZrc2JVSkJRVmM3UVVGRE1VSXNTVUZCUVN3clFrRkJWeXhaUVVGVk8wRkJRMnBDTEVsQlFVRXNaME5CUVZFc1VVRkJUeXh4UlVGQlVDeExRVUZ2UWl4UlFVRndRaXhIUVVFclFpeFRRVUZUTEVsQlFWUXNhMEpCUVdNc0swTkJRVmtzVFVGQk1VSXNRMEZCTDBJc1IwRkJhVVVzVTBGQlV5eExRVUZVTEd0Q1FVRmxMQ3REUVVGWkxFMUJRVE5DTEVOQlFXcEZMRU5CUVZJc1EwRkVhVUk3ZVVKQlFWWXNSVUZGVWl4UFFVWklMRVZCUkRCQ08zRkNRVUZZTEVOQlFXNUNMRU5CUkZNN2FVSkJRV0k3TzBGQlVVRXNTVUZCUVN4dFFrRkJUeXhKUVVGSkxFOUJRVW9zUTBGQldTeHRRa0ZCVnp0QlFVTXhRaXhKUVVGQkxIZENRVUZSTEZGQlFVOHNjVVZCUVZBc1MwRkJiVUlzVVVGQmJrSXNSMEZCT0VJc1UwRkJVeXhKUVVGVUxHdENRVUZqTEN0RFFVRlpMRTFCUVRGQ0xFTkJRVGxDTEVkQlFXZEZMRk5CUVZNc1MwRkJWQ3hyUWtGQlpTd3JRMEZCV1N4TlFVRXpRaXhEUVVGb1JTeERRVUZTTEVOQlJEQkNPMmxDUVVGWUxFTkJRVzVDTEVOQlZITkRPenM3TzIxRFFXTnVReXhQUVVGUExGVkJRVlU3UVVGRGNFSXNTVUZCUVN4blFrRkJTU3hQUVVGUExFdEJRVkFzUzBGQmFVSXNVVUZCYWtJc1NVRkJOa0lzVDBGQlR5eFJRVUZRTEV0QlFXOUNMRlZCUVhCQ0xFVkJRV2RETzBGQlF6ZEVMRWxCUVVFc2RVSkJSRFpFTzJsQ1FVRnFSVHM3UVVGSlFTeEpRVUZCTEdkQ1FVRkpMRU5CUVVNc1MwRkJTeXhOUVVGTUxFTkJRVmtzUjBGQldpeERRVUZuUWl4TFFVRm9RaXhEUVVGRUxFVkJRWGxDTzBGQlEzcENMRWxCUVVFc2NVSkJRVXNzVFVGQlRDeERRVUZaTEVkQlFWb3NRMEZCWjBJc1MwRkJhRUlzUlVGQmRVSXNTVUZCU1N4SFFVRktMRVZCUVhaQ0xFVkJSSGxDTzJsQ1FVRTNRanM3UVVGSlFTeEpRVUZCTEdkQ1FVRkpMRlZCUVZVc1EwRkJReXhEUVVGRUxFTkJWRTA3TzBGQlYzQkNMRWxCUVVFc2FVSkJRVXNzVFVGQlRDeERRVUZaTEU5QlFWb3NRMEZCYjBJc2FVSkJRVk03UVVGRGVrSXNTVUZCUVN3d1FrRkJWU3hMUVVGTExFZEJRVXdzWTBGQlV5d3JRMEZCV1N4TlFVRk5MRWxCUVU0c1NVRkJja0lzUTBGQlZpeERRVVI1UWp0cFFrRkJWQ3hEUVVGd1FpeERRVmh2UWpzN1FVRmxjRUlzU1VGQlFTeGpRVUZGTEU5QlFVWXNRMEZtYjBJN08wRkJhVUp3UWl4SlFVRkJMR2xDUVVGTExFMUJRVXdzUTBGQldTeEhRVUZhTEVOQlFXZENMRXRCUVdoQ0xFVkJRWFZDTEVkQlFYWkNMRU5CUVRKQ0xFOUJRVE5DTEVWQlFXOURMRkZCUVhCRExFVkJha0p2UWpzN1FVRnRRbkJDTEVsQlFVRXNiVUpCUVU4c1QwRkJVQ3hEUVc1Q2IwSTdPenM3ZFVOQmMwSmlMRk5CUVZNN096czdPenRCUVVOb1FpeEpRVUZCTEhGRFFVRnRRaXhMUVVGTExFMUJRVXdzUTBGQldTeE5RVUZhTERSQ1FVRnVRaXh2UjBGQmVVTTdORUpCUVdoRExIRkNRVUZuUXpzN096czdPMEZCUTNKRExFbEJRVUVzT0VOQlFXVXNUMEZCVHl4SlFVRlFMRFpDUVVGbUxIZEhRVUU0UWp0dlEwRkJja0lzYTBKQlFYRkNPenRCUVVNeFFpeEpRVUZCTEdkRFFVRkpMRTlCUVU4c1QwRkJVQ3hGUVVGblFqdEJRVU5vUWl4SlFVRkJMSFZEUVVGUExFOUJRVThzVFVGQlVDeERRVUZqTEU5QlFXUXNRMEZCVUN4RFFVUm5RanRwUTBGQmNFSTdOa0pCUkVvN096czdPenM3T3pzN096czdPM2xDUVVSeFF6dHhRa0ZCZWtNN096czdPenM3T3pzN096czdPMmxDUVVSblFqczdRVUZUYUVJc1NVRkJRU3h0UWtGQlR5eExRVUZRTEVOQlZHZENPenM3TzNORFFWbFdPMEZCUTA0c1NVRkJRU3huUWtGQlNTeFBRVUZQTEdkQ1FVRm5RaXhoUVVGb1FpeEhRVUZuUXl4TFFVRkxMRmxCUVV3c1IwRkJiMElzU1VGQmNFUXNRMEZFVERzN1FVRkhUaXhKUVVGQkxHZENRVUZKTEU5QlFVOHNUVUZCVFN4SlFVRk9MRU5CUVZjc1UwRkJXQ3hEUVVGUUxFTkJTRVU3TzIxRFFVdFZMRXRCUVVzc1RVRkJUQ3hEUVVGWkxFTkJRVm9zUlVGQlpTeERRVUZtTEVWQlRGWTdPenM3YjBKQlMwRXNlVUpCVEVFN096dEJRVTlPTEVsQlFVRXNaMEpCUVVrc1QwRkJUeXhMUVVGUUxFdEJRV2xDTEZGQlFXcENMRWxCUVRaQ0xFTkJRVU1zUzBGQlN5eE5RVUZNTEVOQlFWa3NSMEZCV2l4RFFVRm5RaXhMUVVGb1FpeERRVUZFTEVWQlFYbENPMEZCUTNSRUxFbEJRVUVzZFVKQlFVOHNTMEZCU3l4WlFVRk1MRVZCUVZBc1EwRkVjMFE3YVVKQlFURkVPenRCUVVsQkxFbEJRVUVzWjBKQlFVa3NWMEZCVnl4RlFVRllMRU5CV0VVN096czdPenM3UVVGaFRpeEpRVUZCTEhORFFVRnhRaXhMUVVGTExFMUJRVXdzUTBGQldTeEhRVUZhTEVOQlFXZENMRXRCUVdoQ0xFVkJRWFZDTEUxQlFYWkNMRFpDUVVGeVFpeDNSMEZCYzBRN05FSkJRVGRETEhkQ1FVRTJRenM3UVVGRGJFUXNTVUZCUVN3MlFrRkJVeXhKUVVGVUxFTkJRV01zUzBGQlN5eFBRVUZNTEVOQlFXRXNVVUZCWWl4RlFVRjFRaXhKUVVGMlFpeEZRVUUyUWl4SlFVRTNRaXhGUVVGdFF5eERRVUZ1UXl4RFFVRmtMRVZCUkd0RU8zRkNRVUYwUkRzN096czdPenM3T3pzN096czdhVUpCWWswN08wRkJhVUpPTEVsQlFVRXNiVUpCUVU4c1VVRkJVU3hIUVVGU0xFTkJRVmtzVVVGQldpeERRVUZRTEVOQmFrSk5PenM3T3paRFFXOUNUenRCUVVOaUxFbEJRVUVzWjBKQlFVa3NUMEZCVHl4blFrRkJaMElzWVVGQmFFSXNSMEZCWjBNc1MwRkJTeXhaUVVGTUxFZEJRVzlDTEVsQlFYQkVMRU5CUkVVN08wRkJSMklzU1VGQlFTeG5Ra0ZCU1N4UFFVRlBMRTFCUVUwc1NVRkJUaXhEUVVGWExGTkJRVmdzUTBGQlVDeERRVWhUT3p0dlEwRkxXU3hMUVVGTExFMUJRVXdzUTBGQldTeERRVUZhTEVWQlFXVXNRMEZCWml4RlFVeGFPenM3TzI5Q1FVdFFMSGxDUVV4UE8yOUNRVXRCTERKQ1FVeEJPenM3UVVGUFlpeEpRVUZCTEdkQ1FVRkpMRTlCUVU4c1MwRkJVQ3hMUVVGcFFpeFJRVUZxUWl4SlFVRTJRaXhEUVVGRExFOUJRVThzVTBGQlVDeERRVUZwUWl4UFFVRnFRaXhEUVVGRUxFbEJRVGhDTEVOQlFVTXNTMEZCU3l4TlFVRk1MRU5CUVZrc1IwRkJXaXhEUVVGblFpeExRVUZvUWl4RFFVRkVMRVZCUVhsQ08wRkJRM0JHTEVsQlFVRXNkVUpCUVU4c1MwRkJTeXhaUVVGTUxFVkJRVkFzUTBGRWIwWTdhVUpCUVhoR096dEJRVWxCTEVsQlFVRXNaMEpCUVVrc1YwRkJWeXhGUVVGWUxFTkJXRk03T3pzN096czdRVUZoWWl4SlFVRkJMSE5EUVVGeFFpeExRVUZMTEUxQlFVd3NRMEZCV1N4SFFVRmFMRU5CUVdkQ0xFdEJRV2hDTEVWQlFYVkNMRTFCUVhaQ0xEWkNRVUZ5UWl4M1IwRkJjMFE3TkVKQlFUZERMSGRDUVVFMlF6czdRVUZEYkVRc1NVRkJRU3cyUWtGQlV5eEpRVUZVTEVOQlFXTXNTMEZCU3l4UFFVRk1MRU5CUVdFc1VVRkJZaXhGUVVGMVFpeEpRVUYyUWl4RlFVRTJRaXhKUVVFM1FpeEZRVUZ0UXl4UFFVRnVReXhEUVVGa0xFVkJSR3RFTzNGQ1FVRjBSRHM3T3pzN096czdPenM3T3pzN2FVSkJZbUU3TzBGQmFVSmlMRWxCUVVFc2JVSkJRVThzVVVGQlVTeEhRVUZTTEVOQlFWa3NVVUZCV2l4RFFVRlFMRU5CYWtKaE96czdaVUV2UlVFN096dFJRMGRCTzBGQlEycENMRWxCUVVFc1lVRkVhVUlzWVVGRGFrSXNSMEZCTmtJN1owSkJRV3BDTEdsRlFVRlhMRzlDUVVGTk96aERRVVJhTEdWQlExazdPMEZCUTNwQ0xFbEJRVUVzWVVGQlN5eFJRVUZNTEVkQlFYZENMRkZCUVhoQ0xFTkJSSGxDTzBGQlJYcENMRWxCUVVFc1lVRkJTeXhuUWtGQlRDeEhRVUYzUWl4RFFVRkRMRU5CUVVRc1EwRkdRenM3UVVGSmVrSXNTVUZCUVN4aFFVRkxMR0ZCUVV3c1IwRkJkMElzU1VGQlNTeGhRVUZLTEVWQlFYaENMRU5CU25sQ08wRkJTM3BDTEVsQlFVRXNZVUZCU3l4aFFVRk1MRWRCUVhkQ0xFbEJRVWtzWVVGQlNpeEZRVUY0UWl4RFFVeDVRanRCUVUxNlFpeEpRVUZCTEdGQlFVc3NaMEpCUVV3c1IwRkJkMElzU1VGQlNTeG5Ra0ZCU2l4RlFVRjRRaXhEUVU1NVFqdEJRVTk2UWl4SlFVRkJMR0ZCUVVzc1dVRkJUQ3hIUVVGM1FpeEpRVUZKTEZsQlFVb3NSVUZCZUVJc1EwRlFlVUk3TzBGQlUzcENMRWxCUVVFc1lVRkJTeXhSUVVGTUxFZEJRV2RDTEUxQlFVMHNTVUZCVGl4RFFVRlhMRVZCUVVVc1VVRkJVeXhMUVVGTExGRkJRVXdzUlVGQmRFSXNSVUZCZFVNN2RVSkJRVThzUlVGQlJTeFpRVUZaTEVWQlFWbzdZVUZCVkN4RFFVRjJSQ3hEUVZSNVFqczdRVUZYZWtJc1NVRkJRU3hoUVVGTExHOUNRVUZNTEVkQlFUUkNMRWxCUVVrc1IwRkJTaXhGUVVFMVFpeERRVmg1UWp0VFFVRTNRanM3YVVOQlJHbENPenNyUTBGbFJUdEJRVU5tTEVsQlFVRXNaMEpCUVVrc1kwRkJZeXhMUVVGTExGRkJRVXdzUTBGRVNEczdRVUZIWml4SlFVRkJMR2xDUVVGTExGRkJRVXdzU1VGQmFVSXNRMEZCYWtJc1EwRklaVHM3UVVGTFppeEpRVUZCTEdsQ1FVRkxMRkZCUVV3c05FTkJRVzlDTEV0QlFVc3NVVUZCVEN4clEwRkJhMElzVFVGQlRTeEpRVUZPTEVOQlFWY3NSVUZCUlN4UlFVRlRMRmRCUVZRc1JVRkJZaXhGUVVGeFF6c3lRa0ZCVHl4RlFVRkZMRmxCUVZrc1JVRkJXanRwUWtGQlZDeEhRVUV6UlN4RFFVeGxPenRCUVU5bUxFbEJRVUVzYVVKQlFVc3NTVUZCU1N4SlFVRkpMRmRCUVVvc1JVRkJhVUlzU1VGQlNTeExRVUZMTEZGQlFVd3NSVUZCWlN4RlFVRkZMRU5CUVVZc1JVRkJTenM3T3pzN08wRkJRemxETEVsQlFVRXNlVU5CUVhOQ0xFdEJRVXNzWjBKQlFVd3NRMEZCYzBJc1lVRkJkRUlzUjBGQmMwTXNTVUZCZEVNc05FSkJRWFJDTEc5SFFVRnZSVHRuUTBGQk0wUXNkMEpCUVRKRU96dEJRVU5vUlN4SlFVRkJMRFpDUVVGTExGRkJRVXdzUTBGQll5eERRVUZrTEVWQlFXbENMRk5CUVdwQ0xFbEJRVGhDTEV0QlFVc3NaMEpCUVV3c1EwRkJjMElzV1VGQmRFSXNRMEZCYlVNc1UwRkJia01zUTBGQk9VSXNRMEZFWjBVN2VVSkJRWEJGT3pzN096czdPenM3T3pzN096dHhRa0ZFT0VNN2FVSkJRV3hFT3pzN08zTkRRVTlOTEZsQlFWazdRVUZEYkVJc1NVRkJRU3huUWtGQlNTeERRVUZETEUxQlFVMHNUMEZCVGl4RFFVRmpMRlZCUVdRc1EwRkJSQ3hGUVVFMFFqdEJRVU0xUWl4SlFVRkJMSE5DUVVGTkxGVkJRVlVzY1VSQlFWWXNRMEZCVGl4RFFVUTBRanRwUWtGQmFFTTdPMEZCU1VFc1NVRkJRU3huUWtGQlNTeExRVUZMTEVOQlFVd3NRMEZNWXpzN1FVRlBiRUlzU1VGQlFTeHRRa0ZCVHl4TFFVRkxMRXRCUVVzc1VVRkJUQ3hGUVVGbExFVkJRVVVzUlVGQlJpeEZRVUZOTzBGQlF6ZENMRWxCUVVFc2IwSkJRVWtzUzBGQlN5eFJRVUZNTEVOQlFXTXNSVUZCWkN4RlFVRnJRaXhWUVVGc1FpeERRVUUyUWl4TlFVRTNRaXhMUVVGM1F5eERRVUY0UXl4RlFVRXlRenRCUVVNelF5eEpRVUZCTERCQ1FVUXlRenR4UWtGQkwwTTdhVUpCUkVvN08wRkJUVUVzU1VGQlFTeG5Ra0ZCU1N4TlFVRk5MRXRCUVVzc1VVRkJUQ3hGUVVGbE96dEJRVVZ5UWl4SlFVRkJMSFZDUVVGUExFVkJRVVVzU1VGQlN5eExRVUZMTEZGQlFVd3NSVUZCWlN4UlFVRlRMRWxCUVZRc1JVRkJOMElzUTBGR2NVSTdhVUpCUVhwQ096dEJRVXRCTEVsQlFVRXNaMEpCUVVrc1MwRkJTeXhMUVVGTExHZENRVUZNTEVWQlFYVkNPMEZCUXpWQ0xFbEJRVUVzY1VKQlFVc3NaMEpCUVV3c1IwRkJkMElzUlVGQmVFSXNRMEZFTkVJN2FVSkJRV2hET3p0QlFVbEJMRWxCUVVFc2FVSkJRVXNzVVVGQlRDeERRVUZqTEVWQlFXUXNSVUZCYTBJc1ZVRkJiRUlzUjBGQkswSXNWVUZCTDBJc1EwRjBRbXRDT3p0QlFYZENiRUlzU1VGQlFTeHRRa0ZCVHl4RlFVRkZMRTFCUVVZc1JVRkJUU3hSUVVGVExFdEJRVXNzVVVGQlRDeERRVUZqTEVWQlFXUXNRMEZCVkN4RlFVRmlMRU5CZUVKclFqczdPenQ1UTBFeVFsUXNTVUZCU1R0QlFVTmlMRWxCUVVFc2FVSkJRVXNzVVVGQlRDeERRVUZqTEVWQlFXUXNSVUZCYTBJc1ZVRkJiRUlzUjBGQkswSXNSVUZCTDBJc1EwRkVZVHM3UVVGSFlpeEpRVUZCTEdkQ1FVRkpMRXRCUVVzc1MwRkJTeXhuUWtGQlRDeEZRVUYxUWp0QlFVTTFRaXhKUVVGQkxIVkNRVVEwUWp0cFFrRkJhRU03TzBGQlNVRXNTVUZCUVN4cFFrRkJTeXhKUVVGSkxFbEJRVWtzUlVGQlNpeEZRVUZSTEV0QlFVc3NRMEZCVEN4RlFVRlJMRVZCUVVVc1EwRkJSaXhGUVVGTE8wRkJRekZDTEVsQlFVRXNiMEpCUVVrc1MwRkJTeXhSUVVGTUxFTkJRV01zUTBGQlpDeEZRVUZwUWl4VlFVRnFRaXhEUVVFMFFpeE5RVUUxUWl4TFFVRjFReXhEUVVGMlF5eEZRVUV3UXp0QlFVTXhReXhKUVVGQkxIbENRVUZMTEdkQ1FVRk1MRWRCUVhkQ0xFTkJRWGhDTEVOQlJEQkRPenRCUVVjeFF5eEpRVUZCTERKQ1FVZ3dRenR4UWtGQk9VTTdhVUpCUkVvN08wRkJVVUVzU1VGQlFTeHBRa0ZCU3l4blFrRkJUQ3hIUVVGM1FpeERRVUY0UWl4RFFXWmhPenM3T3pzN08yOUNRV3RDU2l4dFJVRkJZVHM3TWtKQlEySTdPenM3T3pzN096czdPekJFUVVORUxHVkJRV1VzU1VGQlppeEpRVUYxUWl4WFFVRlhMRXRCUVZnc1EwRkJhVUk3SzBSQlFXRXNUVUZCU3l4UlFVRk1MRU5CUVdNc1JVRkJaQ3hGUVVGclFpeFZRVUZzUWl4RFFVRTJRaXhQUVVFM1FpeERRVUZ4UXl4VFFVRnlReXhOUVVGdlJDeERRVUZETEVOQlFVUTdjVVJCUVdwRkxFTkJRWGhET3pzN096czdNa1JCUTAwc1JVRkJSU3hOUVVGR0xFVkJRVTBzVVVGQlV5eE5RVUZMTEZGQlFVd3NRMEZCWXl4RlFVRmtMRU5CUVZRN096czdPenM3T3p0QlFVWllMRWxCUVVFc2FVTkJRVXM3T3p0elEwRkJSeXhOUVVGTkxFdEJRVXNzWjBKQlFVdzdPenM3TzNGRlFVRmtPenM3UVVGQmNVTXNTVUZCUVN3NFFrRkJSU3hGUVVGR096czdPenM3T3pzN096czdPMnRFUVU4MVFpeExRVUZMTzBGQlEzWkNMRWxCUVVFc1owSkJRVWtzVDBGQlR5eEhRVUZRTEV0QlFXVXNVVUZCWml4SlFVRXlRaXhSUVVGUkxFVkJRVklzUlVGQldUdEJRVU4yUXl4SlFVRkJMSE5DUVVGTkxGVkJRVlVzYVVOQlFWWXNRMEZCVGl4RFFVUjFRenRwUWtGQk0wTTdPMEZCU1VFc1NVRkJRU3hwUWtGQlN5eHZRa0ZCVEN4RFFVRXdRaXhIUVVFeFFpeERRVUU0UWl4SFFVRTVRaXhGUVVGdFF5eExRVUZMTEdGQlFVd3NRMEZCYlVJc2JVSkJRVzVDTEVWQlFXNURMRVZCVEhWQ096dEJRVTkyUWl4SlFVRkJMRzFDUVVGUExFZEJRVkFzUTBGUWRVSTdPenM3T3pzN09FTkJXVlFzUzBGQlN5eFhRVUZYTzBGQlF6bENMRWxCUVVFc2FVSkJRVXNzWjBKQlFVd3NRMEZCYzBJc2FVSkJRWFJDTEVOQlFYZERMRWRCUVhoRExFVkJRVFpETEZOQlFUZERMRVZCUkRoQ096czdPenM3TzBGQlJ6bENMRWxCUVVFc2MwTkJRVzFDTEV0QlFVc3NVVUZCVEN3eVFrRkJia0lzZDBkQlFXdERPelJDUVVGNlFpeHpRa0ZCZVVJN08wRkJRemxDTEVsQlFVRXNNa0pCUVU4c1IwRkJVQ3hKUVVGakxFdEJRVXNzWjBKQlFVd3NRMEZCYzBJc1dVRkJkRUlzUTBGQmJVTXNSMEZCYmtNc1EwRkJaQ3hEUVVRNFFqdHhRa0ZCYkVNN096czdPenM3T3pzN096czdPMmxDUVVnNFFqczdRVUZQT1VJc1NVRkJRU3huUWtGQlNTeHZRa0ZCU2l4RFFWQTRRanM3UVVGVE9VSXNTVUZCUVN3eVFrRkJaU3gzUlVGQlpqdEJRVU5KTEVsQlFVRXNjVUpCUVVzc1ZVRkJURHRCUVVGcFFpeEpRVUZCTEd0RFFVRmpMRk5CUVdRc1EwRkJha0k3UVVGRVNpeEpRVUZCTEhGQ1FVVlRMRkZCUVV3N1FVRkJaU3hKUVVGQk8wRkJRMWdzU1VGQlFTeHpRMEZCWXl4MVFrRkJWenM3T3pzN08wRkJRM0pDTEVsQlFVRXNjMFJCUVdkQ0xFOUJRVThzU1VGQlVDeERRVUZaTEZOQlFWb3NORUpCUVdoQ0xIZEhRVUYzUXpzMFEwRkJMMElzYjBKQlFTdENPenRCUVVOd1F5eEpRVUZCTEhsRFFVRkxMRWxCUVV3c1NVRkJXU3hWUVVGVkxFbEJRVllzUTBGQldpeERRVVJ2UXp0eFEwRkJlRU03T3pzN096czdPenM3T3pzN08ybERRVVJ4UWpzMlFrRkJXQ3hEUVVSSU96dEJRVTlZTEVsQlFVRXNPRUpCVUZjN2VVSkJRV1k3UVVGR1NpeEpRVUZCTzBGQlYyRXNTVUZCUVN4clEwRkJZeXgxUWtGQlZ6dEJRVUZGTEVsQlFVRXNLMEpCUVU4c1UwRkJVQ3hEUVVGR08zbENRVUZZTEVOQlFYWkNPMEZCV0Vvc1NVRkJRU3hoUVZRNFFqczdRVUYxUWpsQ0xFbEJRVUVzYVVKQlFVc3NZVUZCVEN4RFFVRnRRaXh0UWtGQmJrSXNRMEZCZFVNc1IwRkJka01zUlVGQk5FTXNWMEZCTlVNc1JVRjJRamhDT3p0QlFYbENPVUlzU1VGQlFTeHRRa0ZCVHl4SFFVRlFMRU5CZWtJNFFqczdPenQ1UTBFMFFuSkNMRWxCUVVrc1kwRkJZenRCUVVNelFpeEpRVUZCTEdkQ1FVRkpMRXRCUVVzc1VVRkJUQ3hEUVVGakxFVkJRV1FzUlVGQmEwSXNWVUZCYkVJc1EwRkJOa0lzVDBGQk4wSXNRMEZCY1VNc1dVRkJja01zVFVGQmRVUXNRMEZCUXl4RFFVRkVMRVZCUVVrN1FVRkRNMFFzU1VGQlFTeDFRa0ZFTWtRN2FVSkJRUzlFT3p0QlFVbEJMRWxCUVVFc2FVSkJRVXNzVVVGQlRDeERRVUZqTEVWQlFXUXNSVUZCYTBJc1ZVRkJiRUlzUTBGQk5rSXNTVUZCTjBJc1EwRkJhME1zV1VGQmJFTXNSVUZNTWtJN096czdORU5CVVdZc1NVRkJTU3hYUVVGWE8wRkJRek5DTEVsQlFVRXNaMEpCUVVrc1VVRkJVU3hMUVVGTExGRkJRVXdzUTBGQll5eEZRVUZrTEVWQlFXdENMRlZCUVd4Q0xFTkJRVFpDTEU5QlFUZENMRU5CUVhGRExGTkJRWEpETEVOQlFWSXNRMEZFZFVJN08wRkJSek5DTEVsQlFVRXNaMEpCUVVrc1ZVRkJWU3hEUVVGRExFTkJRVVFzUlVGQlNUdEJRVU5rTEVsQlFVRXNkVUpCUkdNN2FVSkJRV3hDT3p0QlFVbEJMRWxCUVVFc2FVSkJRVXNzVVVGQlRDeERRVUZqTEVWQlFXUXNSVUZCYTBJc1ZVRkJiRUlzUTBGQk5rSXNUVUZCTjBJc1EwRkJiME1zUzBGQmNFTXNSVUZCTWtNc1EwRkJNME1zUlVGUU1rSTdPenM3T3pzN01rTkJXV2hDTEV0QlFVc3NUVUZCVFN4WlFVRlpMRlZCUVZVN1FVRkROVU1zU1VGQlFTeHRRa0ZCVHl4TFFVRkxMR0ZCUVV3c1EwRkJiVUlzWTBGQmJrSXNRMEZCYTBNc1IwRkJiRU1zUlVGQmRVTXNTVUZCZGtNc1JVRkJOa01zVlVGQk4wTXNSVUZCZVVRc1VVRkJla1FzUTBGQlVDeERRVVEwUXpzN096dG5SRUZKTlVJc1MwRkJTeXhaUVVGWkxGVkJRVlU3UVVGRE0wTXNTVUZCUVN4dFFrRkJUeXhMUVVGTExHRkJRVXdzUTBGQmJVSXNZMEZCYmtJc1EwRkJhME1zUjBGQmJFTXNSVUZCZFVNc1YwRkJWeXhMUVVGWUxFVkJRV3RDTEZWQlFYcEVMRVZCUVhGRkxGRkJRWEpGTEVOQlFWQXNRMEZFTWtNN096czdhVVJCU1RGQ0xFdEJRVXNzV1VGQldTeFZRVUZWTzBGQlF6VkRMRWxCUVVFc2JVSkJRVThzUzBGQlN5eGhRVUZNTEVOQlFXMUNMR05CUVc1Q0xFTkJRV3RETEVkQlFXeERMRVZCUVhWRExGZEJRVmNzVFVGQldDeEZRVUZ0UWl4VlFVRXhSQ3hGUVVGelJTeFJRVUYwUlN4RFFVRlFMRU5CUkRSRE96czdPeXREUVVrM1FpeExRVUZMTEZsQlFWa3NWVUZCVlR0QlFVTXhReXhKUVVGQkxHMUNRVUZQTEV0QlFVc3NZVUZCVEN4RFFVRnRRaXhqUVVGdVFpeERRVUZyUXl4SFFVRnNReXhGUVVGMVF5eFhRVUZYTEVsQlFWZ3NSVUZCYVVJc1ZVRkJlRVFzUlVGQmIwVXNVVUZCY0VVc1EwRkJVQ3hEUVVRd1F6czdPenQ1UTBGSmFrTXNTMEZCU3p0QlFVTmtMRWxCUVVFc2JVSkJRVThzUzBGQlN5eGhRVUZNTEVOQlFXMUNMRmxCUVc1Q0xFTkJRV2RETEVkQlFXaERMRU5CUVZBc1EwRkVZenM3T3p0dlEwRkpWaXhOUVVGTk96czdPenM3UVVGRFZpeEpRVUZCTEhORFFVRnRRaXhMUVVGTExHRkJRVXdzUTBGQmJVSXNXVUZCYmtJc1EwRkJaME1zVFVGQmFFTXNOa0pCUVc1Q0xIZEhRVUUyUkRzMFFrRkJjRVFzYzBKQlFXOUVPenRCUVVONlJDeEpRVUZCTERKQ1FVRlBMRkZCUVZBc1EwRkJaMElzU1VGQmFFSXNRMEZCY1VJc1NVRkJja0lzUlVGQk1rSXNTMEZCU3l4WFFVRk1MRU5CUVdsQ0xFOUJRVThzVlVGQlVDeERRVUUxUXl4RlFVRm5SU3hKUVVGb1JTeEZRVVI1UkR0eFFrRkJOMFE3T3pzN096czdPenM3T3pzN08ybENRVVJWT3pzN08zRkRRVTFNTEUxQlFVMDdPenM3T3p0QlFVTllMRWxCUVVFc2MwTkJRVzFDTEV0QlFVc3NZVUZCVEN4RFFVRnRRaXhoUVVGdVFpeERRVUZwUXl4TlFVRnFReXcyUWtGQmJrSXNkMGRCUVRoRU96UkNRVUZ5UkN4elFrRkJjVVE3TzBGQlF6RkVMRWxCUVVFc01rSkJRVThzVVVGQlVDeERRVUZuUWl4SlFVRm9RaXhEUVVGeFFpeEpRVUZ5UWl4RlFVRXlRaXhMUVVGTExGZEJRVXdzUTBGQmFVSXNUMEZCVHl4VlFVRlFMRU5CUVRWRExFVkJRV2RGTEVsQlFXaEZMRVZCUkRCRU8zRkNRVUU1UkRzN096czdPenM3T3pzN096czdhVUpCUkZjN096czdiVU5CVFZJc1RVRkJUVHM3T3pzN08wRkJRMVFzU1VGQlFTeHpRMEZCYlVJc1MwRkJTeXhoUVVGTUxFTkJRVzFDTEZkQlFXNUNMRU5CUVN0Q0xFMUJRUzlDTERaQ1FVRnVRaXgzUjBGQk5FUTdORUpCUVc1RUxITkNRVUZ0UkRzN1FVRkRlRVFzU1VGQlFTd3lRa0ZCVHl4UlFVRlFMRU5CUVdkQ0xFbEJRV2hDTEVOQlFYRkNMRWxCUVhKQ0xFVkJRVEpDTEV0QlFVc3NWMEZCVEN4RFFVRnBRaXhQUVVGUExGVkJRVkFzUTBGQk5VTXNSVUZCWjBVc1NVRkJhRVVzUlVGRWQwUTdjVUpCUVRWRU96czdPenM3T3pzN096czdPenRwUWtGRVV6czdPenM3T3p0blJFRlJUeXhoUVVGaExHRkJRV0U3UVVGRE1VTXNTVUZCUVN4cFFrRkJTeXhoUVVGTUxFTkJRVzFDTEcxQ1FVRnVRaXhEUVVGMVF5eFhRVUYyUXl4RlFVRnZSQ3hYUVVGd1JDeEZRVVF3UXpzN096dHZRMEZKZEVNN1FVRkRTaXhKUVVGQkxHbENRVUZMTEdGQlFVd3NRMEZCYlVJc1MwRkJia0lzUjBGRVNUczdRVUZIU2l4SlFVRkJMRzFDUVVGUExFbEJRVkFzUTBGSVNUczdPenN3UTBGTlRTeGhRVUZoTEdGQlFXRTdRVUZEY0VNc1NVRkJRU3hwUWtGQlN5eGhRVUZNTEVOQlFXMUNMR0ZCUVc1Q0xFTkJRV2xETEZkQlFXcERMRVZCUVRoRExGZEJRVGxETEVWQlJHOURPenRCUVVkd1F5eEpRVUZCTEcxQ1FVRlBMRWxCUVZBc1EwRkliME03T3pzN2JVTkJUV3BETEU5QlFVOHNTMEZCU3p0QlFVTm1MRWxCUVVFc1owSkJRVWtzWjBKQlFXZENMRk5CUVdoQ0xFTkJSRmM3TzBGQlIyWXNTVUZCUVN4blFrRkJTU3hQUVVGUExFZEJRVkFzUzBGQlpTeFJRVUZtTEVWQlFYbENPMEZCUTNwQ0xFbEJRVUVzWjBOQlFXZENMRXRCUVVzc2IwSkJRVXdzUTBGQk1FSXNSMEZCTVVJc1EwRkJPRUlzUjBGQk9VSXNRMEZCYUVJc1EwRkVlVUk3TzBGQlIzcENMRWxCUVVFc2IwSkJRVWtzYTBKQlFXdENMRk5CUVd4Q0xFVkJRVFpDTzBGQlF6ZENMRWxCUVVFc01FSkJRVTBzVlVGQlZTeDFTVUZCVml4RFFVRk9MRU5CUkRaQ08zRkNRVUZxUXp0cFFrRklTanM3UVVGUlFTeEpRVUZCTEcxQ1FVRlBMRXRCUVVzc1lVRkJUQ3hEUVVGdFFpeE5RVUZ1UWl4RFFVRXdRaXhKUVVFeFFpeEZRVUZuUXl4TFFVRm9ReXhGUVVGMVF5eGhRVUYyUXl4RFFVRlFMRU5CV0dVN096czdPenM3YlVOQlowSmFMRTlCUVU4c1ZVRkJWVHRCUVVOd1FpeEpRVUZCTEcxQ1FVRlBMRXRCUVVzc1dVRkJUQ3hEUVVGclFpeE5RVUZzUWl4RFFVRjVRaXhMUVVGNlFpeEZRVUZuUXl4UlFVRm9ReXhEUVVGUUxFTkJSRzlDT3pzN08zVkRRVWxpTEZOQlFWTTdRVUZEYUVJc1NVRkJRU3h0UWtGQlR5eExRVUZMTEZsQlFVd3NRMEZCYTBJc1ZVRkJiRUlzUTBGQk5rSXNUMEZCTjBJc1EwRkJVQ3hEUVVSblFqczdPenR6UTBGSlZqczdPMEZCUTA0c1NVRkJRU3h0UWtGQlR5dzRRa0ZCU3l4WlFVRk1MRU5CUVd0Q0xFOUJRV3hDTEVWQlFUQkNMRWxCUVRGQ0xDdENRVUVyUWl4M1EwRkJVeXhYUVVGNFF5eERRVUZRTEVOQlJFMDdPenM3TmtOQlNVODdPenRCUVVOaUxFbEJRVUVzYlVKQlFVOHNLMEpCUVVzc1dVRkJUQ3hEUVVGclFpeGpRVUZzUWl4RlFVRnBReXhKUVVGcVF5eG5RMEZCYzBNc2QwTkJRVk1zVjBGQkwwTXNRMEZCVUN4RFFVUmhPenM3WlVGc1QwRTdPenM3T3pzN096czdPeUo5IiwiLyoqXG4gKiBtYWlubG9vcC5qcyAxLjAuMy0yMDE2MDMyMFxuICpcbiAqIEBhdXRob3IgSXNhYWMgU3VraW4gKGh0dHA6Ly93d3cuaXNhYWNzdWtpbi5jb20vKVxuICogQGxpY2Vuc2UgTUlUXG4gKi9cblxuIWZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGIoYSl7aWYodj1vKGIpLCEoZStqPmEpKXtmb3IoZCs9YS1lLGU9YSxyKGEsZCksYT5nKzFlMyYmKGY9LjI1KmgrLjc1KmYsZz1hLGg9MCksaCsrLGk9MDtkPj1jOylpZihzKGMpLGQtPWMsKytpPj0yNDApe209ITA7YnJlYWt9dChkL2MpLHUoZixtKSxtPSExfX12YXIgYz0xZTMvNjAsZD0wLGU9MCxmPTYwLGc9MCxoPTAsaT0wLGo9MCxrPSExLGw9ITEsbT0hMSxuPVwib2JqZWN0XCI9PXR5cGVvZiB3aW5kb3c/d2luZG93OmEsbz1uLnJlcXVlc3RBbmltYXRpb25GcmFtZXx8ZnVuY3Rpb24oKXt2YXIgYT1EYXRlLm5vdygpLGIsZDtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIGI9RGF0ZS5ub3coKSxkPU1hdGgubWF4KDAsYy0oYi1hKSksYT1iK2Qsc2V0VGltZW91dChmdW5jdGlvbigpe2UoYitkKX0sZCl9fSgpLHA9bi5jYW5jZWxBbmltYXRpb25GcmFtZXx8Y2xlYXJUaW1lb3V0LHE9ZnVuY3Rpb24oKXt9LHI9cSxzPXEsdD1xLHU9cSx2O2EuTWFpbkxvb3A9e2dldFNpbXVsYXRpb25UaW1lc3RlcDpmdW5jdGlvbigpe3JldHVybiBjfSxzZXRTaW11bGF0aW9uVGltZXN0ZXA6ZnVuY3Rpb24oYSl7cmV0dXJuIGM9YSx0aGlzfSxnZXRGUFM6ZnVuY3Rpb24oKXtyZXR1cm4gZn0sZ2V0TWF4QWxsb3dlZEZQUzpmdW5jdGlvbigpe3JldHVybiAxZTMvan0sc2V0TWF4QWxsb3dlZEZQUzpmdW5jdGlvbihhKXtyZXR1cm5cInVuZGVmaW5lZFwiPT10eXBlb2YgYSYmKGE9MS8wKSwwPT09YT90aGlzLnN0b3AoKTpqPTFlMy9hLHRoaXN9LHJlc2V0RnJhbWVEZWx0YTpmdW5jdGlvbigpe3ZhciBhPWQ7cmV0dXJuIGQ9MCxhfSxzZXRCZWdpbjpmdW5jdGlvbihhKXtyZXR1cm4gcj1hfHxyLHRoaXN9LHNldFVwZGF0ZTpmdW5jdGlvbihhKXtyZXR1cm4gcz1hfHxzLHRoaXN9LHNldERyYXc6ZnVuY3Rpb24oYSl7cmV0dXJuIHQ9YXx8dCx0aGlzfSxzZXRFbmQ6ZnVuY3Rpb24oYSl7cmV0dXJuIHU9YXx8dSx0aGlzfSxzdGFydDpmdW5jdGlvbigpe3JldHVybiBsfHwobD0hMCx2PW8oZnVuY3Rpb24oYSl7dCgxKSxrPSEwLGU9YSxnPWEsaD0wLHY9byhiKX0pKSx0aGlzfSxzdG9wOmZ1bmN0aW9uKCl7cmV0dXJuIGs9ITEsbD0hMSxwKHYpLHRoaXN9LGlzUnVubmluZzpmdW5jdGlvbigpe3JldHVybiBrfX0sXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShhLk1haW5Mb29wKTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZudWxsIT09bW9kdWxlJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlLmV4cG9ydHMmJihtb2R1bGUuZXhwb3J0cz1hLk1haW5Mb29wKX0odGhpcyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWlubG9vcC5taW4uanMubWFwIiwidmFyIGJhYmVsSGVscGVycyA9IHt9O1xuZXhwb3J0IHZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbn07XG5cbmV4cG9ydCB2YXIganN4ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5mb3IgJiYgU3ltYm9sLmZvcihcInJlYWN0LmVsZW1lbnRcIikgfHwgMHhlYWM3O1xuICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlUmF3UmVhY3RFbGVtZW50KHR5cGUsIHByb3BzLCBrZXksIGNoaWxkcmVuKSB7XG4gICAgdmFyIGRlZmF1bHRQcm9wcyA9IHR5cGUgJiYgdHlwZS5kZWZhdWx0UHJvcHM7XG4gICAgdmFyIGNoaWxkcmVuTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCAtIDM7XG5cbiAgICBpZiAoIXByb3BzICYmIGNoaWxkcmVuTGVuZ3RoICE9PSAwKSB7XG4gICAgICBwcm9wcyA9IHt9O1xuICAgIH1cblxuICAgIGlmIChwcm9wcyAmJiBkZWZhdWx0UHJvcHMpIHtcbiAgICAgIGZvciAodmFyIHByb3BOYW1lIGluIGRlZmF1bHRQcm9wcykge1xuICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSB2b2lkIDApIHtcbiAgICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBkZWZhdWx0UHJvcHNbcHJvcE5hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghcHJvcHMpIHtcbiAgICAgIHByb3BzID0gZGVmYXVsdFByb3BzIHx8IHt9O1xuICAgIH1cblxuICAgIGlmIChjaGlsZHJlbkxlbmd0aCA9PT0gMSkge1xuICAgICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgICAgdmFyIGNoaWxkQXJyYXkgPSBBcnJheShjaGlsZHJlbkxlbmd0aCk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgICBjaGlsZEFycmF5W2ldID0gYXJndW1lbnRzW2kgKyAzXTtcbiAgICAgIH1cblxuICAgICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZEFycmF5O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAkJHR5cGVvZjogUkVBQ1RfRUxFTUVOVF9UWVBFLFxuICAgICAgdHlwZTogdHlwZSxcbiAgICAgIGtleToga2V5ID09PSB1bmRlZmluZWQgPyBudWxsIDogJycgKyBrZXksXG4gICAgICByZWY6IG51bGwsXG4gICAgICBwcm9wczogcHJvcHMsXG4gICAgICBfb3duZXI6IG51bGxcbiAgICB9O1xuICB9O1xufSgpO1xuXG5leHBvcnQgdmFyIGFzeW5jVG9HZW5lcmF0b3IgPSBmdW5jdGlvbiAoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZ2VuID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZnVuY3Rpb24gc3RlcChrZXksIGFyZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RlcChcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGVwKFwidGhyb3dcIiwgZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RlcChcIm5leHRcIik7XG4gICAgfSk7XG4gIH07XG59O1xuXG5leHBvcnQgdmFyIGNsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07XG5cbmV4cG9ydCB2YXIgY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cbmV4cG9ydCB2YXIgZGVmaW5lRW51bWVyYWJsZVByb3BlcnRpZXMgPSBmdW5jdGlvbiAob2JqLCBkZXNjcykge1xuICBmb3IgKHZhciBrZXkgaW4gZGVzY3MpIHtcbiAgICB2YXIgZGVzYyA9IGRlc2NzW2tleV07XG4gICAgZGVzYy5jb25maWd1cmFibGUgPSBkZXNjLmVudW1lcmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzYykgZGVzYy53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCBkZXNjKTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG5leHBvcnQgdmFyIGRlZmF1bHRzID0gZnVuY3Rpb24gKG9iaiwgZGVmYXVsdHMpIHtcbiAgdmFyIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhkZWZhdWx0cyk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgdmFyIHZhbHVlID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihkZWZhdWx0cywga2V5KTtcblxuICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5jb25maWd1cmFibGUgJiYgb2JqW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbmV4cG9ydCB2YXIgZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbmV4cG9ydCB2YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuZXhwb3J0IHZhciBnZXQgPSBmdW5jdGlvbiBnZXQob2JqZWN0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTtcblxuICAgIGlmIChwYXJlbnQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBnZXQocGFyZW50LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChcInZhbHVlXCIgaW4gZGVzYykge1xuICAgIHJldHVybiBkZXNjLnZhbHVlO1xuICB9IGVsc2Uge1xuICAgIHZhciBnZXR0ZXIgPSBkZXNjLmdldDtcblxuICAgIGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpO1xuICB9XG59O1xuXG5leHBvcnQgdmFyIGluaGVyaXRzID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufTtcblxuZXhwb3J0IHZhciBfaW5zdGFuY2VvZiA9IGZ1bmN0aW9uIChsZWZ0LCByaWdodCkge1xuICBpZiAocmlnaHQgIT0gbnVsbCAmJiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIHJpZ2h0W1N5bWJvbC5oYXNJbnN0YW5jZV0pIHtcbiAgICByZXR1cm4gcmlnaHRbU3ltYm9sLmhhc0luc3RhbmNlXShsZWZ0KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGVmdCBpbnN0YW5jZW9mIHJpZ2h0O1xuICB9XG59O1xuXG5leHBvcnQgdmFyIGludGVyb3BSZXF1aXJlRGVmYXVsdCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBkZWZhdWx0OiBvYmpcbiAgfTtcbn07XG5cbmV4cG9ydCB2YXIgaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkge1xuICAgIHJldHVybiBvYmo7XG4gIH0gZWxzZSB7XG4gICAgdmFyIG5ld09iaiA9IHt9O1xuXG4gICAgaWYgKG9iaiAhPSBudWxsKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldO1xuICAgICAgfVxuICAgIH1cblxuICAgIG5ld09iai5kZWZhdWx0ID0gb2JqO1xuICAgIHJldHVybiBuZXdPYmo7XG4gIH1cbn07XG5cbmV4cG9ydCB2YXIgbmV3QXJyb3dDaGVjayA9IGZ1bmN0aW9uIChpbm5lclRoaXMsIGJvdW5kVGhpcykge1xuICBpZiAoaW5uZXJUaGlzICE9PSBib3VuZFRoaXMpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGluc3RhbnRpYXRlIGFuIGFycm93IGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5leHBvcnQgdmFyIG9iamVjdERlc3RydWN0dXJpbmdFbXB0eSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgaWYgKG9iaiA9PSBudWxsKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGRlc3RydWN0dXJlIHVuZGVmaW5lZFwiKTtcbn07XG5cbmV4cG9ydCB2YXIgb2JqZWN0V2l0aG91dFByb3BlcnRpZXMgPSBmdW5jdGlvbiAob2JqLCBrZXlzKSB7XG4gIHZhciB0YXJnZXQgPSB7fTtcblxuICBmb3IgKHZhciBpIGluIG9iaikge1xuICAgIGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7XG4gICAgdGFyZ2V0W2ldID0gb2JqW2ldO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cbmV4cG9ydCB2YXIgcG9zc2libGVDb25zdHJ1Y3RvclJldHVybiA9IGZ1bmN0aW9uIChzZWxmLCBjYWxsKSB7XG4gIGlmICghc2VsZikge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmO1xufTtcblxuZXhwb3J0IHZhciBzZWxmR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiBnbG9iYWw7XG5cbmV4cG9ydCB2YXIgc2V0ID0gZnVuY3Rpb24gc2V0KG9iamVjdCwgcHJvcGVydHksIHZhbHVlLCByZWNlaXZlcikge1xuICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTtcblxuICAgIGlmIChwYXJlbnQgIT09IG51bGwpIHtcbiAgICAgIHNldChwYXJlbnQsIHByb3BlcnR5LCB2YWx1ZSwgcmVjZWl2ZXIpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChcInZhbHVlXCIgaW4gZGVzYyAmJiBkZXNjLndyaXRhYmxlKSB7XG4gICAgZGVzYy52YWx1ZSA9IHZhbHVlO1xuICB9IGVsc2Uge1xuICAgIHZhciBzZXR0ZXIgPSBkZXNjLnNldDtcblxuICAgIGlmIChzZXR0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2V0dGVyLmNhbGwocmVjZWl2ZXIsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59O1xuXG5leHBvcnQgdmFyIHNsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7XG4gICAgdmFyIF9hcnIgPSBbXTtcbiAgICB2YXIgX24gPSB0cnVlO1xuICAgIHZhciBfZCA9IGZhbHNlO1xuICAgIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2QgPSB0cnVlO1xuICAgICAgX2UgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBfYXJyO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7XG4gICAgICByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgICB9XG4gIH07XG59KCk7XG5cbmV4cG9ydCB2YXIgc2xpY2VkVG9BcnJheUxvb3NlID0gZnVuY3Rpb24gKGFyciwgaSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgcmV0dXJuIGFycjtcbiAgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHtcbiAgICB2YXIgX2FyciA9IFtdO1xuXG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lOykge1xuICAgICAgX2Fyci5wdXNoKF9zdGVwLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBfYXJyO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xuICB9XG59O1xuXG5leHBvcnQgdmFyIHRhZ2dlZFRlbXBsYXRlTGl0ZXJhbCA9IGZ1bmN0aW9uIChzdHJpbmdzLCByYXcpIHtcbiAgcmV0dXJuIE9iamVjdC5mcmVlemUoT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoc3RyaW5ncywge1xuICAgIHJhdzoge1xuICAgICAgdmFsdWU6IE9iamVjdC5mcmVlemUocmF3KVxuICAgIH1cbiAgfSkpO1xufTtcblxuZXhwb3J0IHZhciB0YWdnZWRUZW1wbGF0ZUxpdGVyYWxMb29zZSA9IGZ1bmN0aW9uIChzdHJpbmdzLCByYXcpIHtcbiAgc3RyaW5ncy5yYXcgPSByYXc7XG4gIHJldHVybiBzdHJpbmdzO1xufTtcblxuZXhwb3J0IHZhciB0ZW1wb3JhbFJlZiA9IGZ1bmN0aW9uICh2YWwsIG5hbWUsIHVuZGVmKSB7XG4gIGlmICh2YWwgPT09IHVuZGVmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKG5hbWUgKyBcIiBpcyBub3QgZGVmaW5lZCAtIHRlbXBvcmFsIGRlYWQgem9uZVwiKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsO1xuICB9XG59O1xuXG5leHBvcnQgdmFyIHRlbXBvcmFsVW5kZWZpbmVkID0ge307XG5cbmV4cG9ydCB2YXIgdG9BcnJheSA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXJyKSA/IGFyciA6IEFycmF5LmZyb20oYXJyKTtcbn07XG5cbmV4cG9ydCB2YXIgdG9Db25zdW1hYmxlQXJyYXkgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSBhcnIyW2ldID0gYXJyW2ldO1xuXG4gICAgcmV0dXJuIGFycjI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oYXJyKTtcbiAgfVxufTtcblxuYmFiZWxIZWxwZXJzO1xuXG5leHBvcnQgeyBfdHlwZW9mIGFzIHR5cGVvZiwgX2V4dGVuZHMgYXMgZXh0ZW5kcywgX2luc3RhbmNlb2YgYXMgaW5zdGFuY2VvZiB9IiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IE1haW5Mb29wIGZyb20gJ21haW5sb29wLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluTG9vcExvb3BNYW5hZ2VyIHtcbiAgICAvLyBzZXRVcGRhdGUodXBkYXRlTWV0aG9kIDogKGRlbHRhIDogbnVtYmVyKSA9PiB2b2lkKSA6IE1haW5Mb29wTG9vcE1hbmFnZXIge1xuICAgIHNldFVwZGF0ZSh1cGRhdGVNZXRob2QpIHtcbiAgICAgICAgTWFpbkxvb3Auc2V0VXBkYXRlKHVwZGF0ZU1ldGhvZClcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIFxuICAgIHNldFJlbmRlcihyZW5kZXJNZXRob2QgOiAoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UgOiBudW1iZXIpID0+IHZvaWQpIDogTWFpbkxvb3BMb29wTWFuYWdlciB7XG4gICAgICAgIE1haW5Mb29wLnNldERyYXcocmVuZGVyTWV0aG9kKVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgXG4gICAgc3RhcnQoKSA6IHZvaWQge1xuICAgICAgICBNYWluTG9vcC5zdGFydCgpXG4gICAgfVxuICAgIFxuICAgIHN0b3AoKSA6IHZvaWQge1xuICAgICAgICBNYWluTG9vcC5zdG9wKClcbiAgICB9XG59IiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IHRocmVlIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGhyZWVPYmplY3RNZXNoTG9hZGVyIHtcbiAgICBsb2FkZXIgIDogdGhyZWUuT2JqZWN0TG9hZGVyO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmxvYWRlciAgPSBuZXcgdGhyZWUuT2JqZWN0TG9hZGVyKCk7XG4gICAgfVxuICAgIFxuICAgIG9uUHJvZ3Jlc3MoKSB7XG4gICAgICAgIC8vIHBsYWNlaG9sZGVyXG4gICAgfVxuICAgIFxuICAgIHBhcnNlKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZGVyLnBhcnNlKGpzb24pXG4gICAgfVxuICAgIFxuICAgIC8vIHRvZG8gdGhpcyBub3cgcmV0dXJucyBhIHNjZW5lLi4gaW1wbGljYXRpb25zP1xuICAgIC8vIHRvZG8gYWRkIG9wdGlvbnMgYXMgYSBkZXN0cnVjdGFibGUgb2JqZWN0IC0+IHN0b3BwZWQgYnkgZmxvdzogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvaXNzdWVzLzE4M1xuICAgIGxvYWQocGF0aCA6IHN0cmluZywgb3B0aW9ucz8gOiBPYmplY3QpIDogUHJvbWlzZSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc2hhZGluZyA9IChvcHRpb25zIHx8IHsgfSkuc2hhZGluZztcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHNlbGYubG9hZGVyLmxvYWQocGF0aCwgb2JqID0+IHJlc29sdmUob2JqKSwgaW5mbyA9PiBzZWxmLm9uUHJvZ3Jlc3MoaW5mbyksIGVyciA9PiByZWplY3QoZXJyKSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4obWVzaCA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNoYWRpbmcgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc2g7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG1lc2gudHJhdmVyc2UoY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIHRocmVlLk1lc2gpIHtcbiAgICAgICAgICAgICAgICAgICBjaGlsZC5tYXRlcmlhbC5zaGFkaW5nID0gc2hhZGluZztcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gbWVzaDtcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG59IiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IHRocmVlIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGhyZWVSZW5kZXJlck1hbmFnZXIge1xuICAgIHJlbmRlcmVyICAgICA6IHRocmVlLldlYkdMUmVuZGVyZXI7XG4gICAgY2FtZXJhICAgICAgIDogdGhyZWUuQ2FtZXJhO1xuICAgIC8vIGdlb21ldHJpZXMgICA6IE1hcDxzdHJpbmcsIHRocmVlLkdlb21ldHJ5PjtcbiAgICAvLyBtYXRlcmlhbHMgICAgOiBNYXA8c3RyaW5nLCB0aHJlZS5NYXRlcmlhbD47XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgdGhyZWUuV2ViR0xSZW5kZXJlcih7IGFudGlhbGlhcyA6IHRydWUgfSk7XG5cdFx0dGhpcy5yZW5kZXJlci5zZXRDbGVhckNvbG9yKCAweDAwMDAwMCApO1xuXHRcdHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyggd2luZG93LmRldmljZVBpeGVsUmF0aW8gKTtcbiAgICB9XG4gICAgXG4gICAgZW5hYmxlU2hhZG93cygpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWVcbiAgICB9XG4gICAgXG4gICAgaXNGdWxsU2NyZWVuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5fZnVsbFNjcmVlblxuICAgIH1cbiAgICBcbiAgICAvL3RvZG8gbWFrZSBpbnRvIGdldHRlciAvIHNldHRlciA/XG4gICAgc2V0U2NlbmUoc2NlbmUpIHtcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lXG4gICAgfVxuICAgIFxuICAgIHNldENhbWVyYShjYW1lcmEsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmFcbiAgICB9XG4gICAgXG4gICAgc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0Z1bGxTY3JlZW4oKSkge1xuXHRcdCAgICB0aGlzLmNhbWVyYS5hc3BlY3QgPSAod2lkdGggfHwgNTAwKSAvIChoZWlnaHQgfHwgNTAwKVxuICAgIFx0fVxuXHRcdFxuXHRcdHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKVxuXHRcdFxuXHRcdGlmICghdGhpcy5pc0Z1bGxTY3JlZW4oKSkge1xuXHQgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCB8fCA1MDAsIGhlaWdodCB8fCA1MDApXG5cdFx0fVxuICAgIH1cbiAgICBcbiAgICBnZXREb20oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnRcbiAgICB9XG4gICAgXG4gICAgZ2V0U2NlbmUoKSA6IHRocmVlLlNjZW5lIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NlbmU7XG4gICAgfVxuICAgIFxuICAgIGdldEdlb21ldHJ5KGtleSA6IHN0cmluZykgOiB0aHJlZS5HZW9tZXRyeSB7XG4gICAgICAgIHJldHVybiBnZW9tZXRyaWVzLmdldChrZXkpO1xuICAgIH1cbiAgICBcbiAgICBnZXRNYXRlcmlhbChrZXkgOiBzdHJpbmcpIDogdGhyZWUuTWF0ZXJpYWwge1xuICAgICAgICByZXR1cm4gbWF0ZXJpYWxzLmdldChrZXkpO1xuICAgIH1cbiAgICBcbiAgICBhZGRNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCkge1xuICAgICAgICB2YXIgZ2VvID0gdGhpcy5nZW9tZXRyaWVzLmdldChnZW9tZXRyeSk7XG4gICAgICAgIHZhciBtYXQgPSB0aGlzLm1hdGVyaWFscy5nZXQobWF0ZXJpYWwpO1xuICAgICAgICB2YXIgbWVzaCA9IG5ldyB0aHJlZS5NZXNoKGdlbywgbWF0KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKG1lc2gpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG1lc2g7XG4gICAgfVxuICAgIFxuICAgIHJlbmRlcihpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSA6IG51bWJlcikgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpO1xuICAgIH1cbiAgICBcbiAgICAvLyByZW5kZXIoc2NlbmUgOiB0aHJlZS5TY2VuZSwgaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UgOiBudW1iZXIpIDogdm9pZCB7XG4gICAgLy8gICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gICAgLy8gfVxufVxuIiwiaW1wb3J0IEVudGl0eU1hbmFnZXIgICAgICAgICBmcm9tICdnZy1lbnRpdGllcydcbmltcG9ydCBNYWluTG9vcExvb3BNYW5hZ2VyICAgZnJvbSAnLi4vbG9naWMvbWFpbmxvb3AtbG9vcC1tYW5hZ2VyJ1xuLy8gaW1wb3J0IEZldGNoRmlsZUxvYWRlciAgICAgICBmcm9tICcuLi9sb2dpYy9mZXRjaC1maWxlLWxvYWRlcidcbmltcG9ydCBUaHJlZU9iamVjdE1lc2hMb2FkZXIgZnJvbSAnLi4vbG9naWMvdGhyZWUtb2JqZWN0LW1lc2gtbG9hZGVyJ1xuXG5pbXBvcnQgVGhyZWVSZW5kZXJlck1hbmFnZXIgZnJvbSAnLi4vdmlldy90aHJlZS1yZW5kZXJlci1tYW5hZ2VyJ1xuXG5jb25zdCBfbG9vcE1hbmFnZXIgICAgID0gbmV3IE1haW5Mb29wTG9vcE1hbmFnZXIoKVxuLy8gY29uc3QgX2ZpbGVMb2FkZXIgICAgICA9IG5ldyBGZXRjaEZpbGVMb2FkZXIoKVxuY29uc3QgX2xvYWRlciAgICAgICAgICA9IG5ldyBUaHJlZU9iamVjdE1lc2hMb2FkZXIoKVxuY29uc3QgX3JlbmRlcmVyTWFuYWdlciA9IG5ldyBUaHJlZVJlbmRlcmVyTWFuYWdlcigpXG5jb25zdCBfZW50aXR5TWFuYWdlciAgID0gbmV3IEVudGl0eU1hbmFnZXIoKVxuXG5jb25zdCBsb29wTWFuYWdlciAgICAgPSAoKSA9PiBfbG9vcE1hbmFnZXJcbi8vIGNvbnN0IGZpbGVMb2FkZXIgICAgICA9ICgpID0+IF9maWxlTG9hZGVyXG5jb25zdCBsb2FkZXIgICAgICAgICAgPSAoKSA9PiBfbG9hZGVyXG5jb25zdCByZW5kZXJlck1hbmFnZXIgPSAoKSA9PiBfcmVuZGVyZXJNYW5hZ2VyXG5jb25zdCBlbnRpdHlNYW5hZ2VyICAgPSAoKSA9PiBfZW50aXR5TWFuYWdlclxuXG5leHBvcnQgZGVmYXVsdCB7bG9vcE1hbmFnZXIsIGxvYWRlciwgcmVuZGVyZXJNYW5hZ2VyLCBlbnRpdHlNYW5hZ2VyfVxuZXhwb3J0IHtsb29wTWFuYWdlciwgbG9hZGVyLCByZW5kZXJlck1hbmFnZXIsIGVudGl0eU1hbmFnZXJ9IiwiLy8gLyogQGZsb3cgKi9cblxuaW1wb3J0IERJIGZyb20gJy4vREkvYnJvd3NlcidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR0cge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIFx0Ly8gd2lkdGggYW5kIGhlaWdodCBzZXQgdG8gNTAwIGp1c3QgdG8gaGF2ZSBpdCBhcyBpbiB0aGUgZWRpdG9yIGZvciB0aGUgdGltZSBiZWluZ1xuICAgIFx0dGhpcy53aWR0aCAgPSA1MDBcbiAgICBcdHRoaXMuaGVpZ2h0ID0gNTAwXG4gICAgXHRcbiAgICAgICAgdGhpcy5lbnRpdHlNYW5hZ2VyICAgPSBESS5lbnRpdHlNYW5hZ2VyKClcbiAgICAgICAgdGhpcy5sb29wTWFuYWdlciAgICAgPSBESS5sb29wTWFuYWdlcigpXG4gICAgICAgIHRoaXMucmVuZGVyZXJNYW5hZ2VyID0gREkucmVuZGVyZXJNYW5hZ2VyKClcbiAgICAgICAgdGhpcy5sb2FkZXJcdFx0XHQgPSBESS5sb2FkZXIoKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5kb20gPSB0aGlzLnJlbmRlcmVyTWFuYWdlci5nZXREb20oKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlNYW5hZ2VyLm9uSW5pdCh7cmVuZGVyTWFuYWdlcjogdGhpcy5yZW5kZXJlck1hbmFnZXJ9KVxuICAgICAgICBcbiAgICAgICAgdGhpcy5sb29wTWFuYWdlci5zZXRVcGRhdGUoZGVsdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbnRpdHlNYW5hZ2VyLm9uTG9naWMoZGVsdGEpXG4gICAgICAgIH0pLnNldFJlbmRlcihpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIub25SZW5kZXIoe2RlbHRhIDogaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UsIHJlbmRlck1hbmFnZXI6IHRoaXMucmVuZGVyZXJNYW5hZ2VyfSlcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXJNYW5hZ2VyLnJlbmRlcihpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSlcbiAgICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgaW5pdEVudGl0aWVzKHBhcnNlZFNjZW5lKSB7XG4gICAgICAgIHBhcnNlZFNjZW5lLnRyYXZlcnNlKChvYmopID0+IHtcblx0XHQgICAgY29uc3Qge2NvbXBvbmVudHN9ID0gb2JqLnVzZXJEYXRhXG5cdFx0ICAgIFxuXHRcdFx0bGV0IGNvbmZpZyA9IHRoaXMuZW50aXR5TWFuYWdlci5idWlsZCgpXG5cdFx0XHQgICAgXG5cdFx0ICAgIGNvbmZpZy53aXRoQ29tcG9uZW50KCd0cmFuc2Zvcm0nLCBmdW5jdGlvbigpIHtcblx0XHQgICAgICAgIHRoaXMueCA9IG9iai5wb3NpdGlvbi54XG5cdFx0ICAgICAgICB0aGlzLnkgPSBvYmoucG9zaXRpb24ueVxuXHRcdCAgICAgICAgdGhpcy56ID0gb2JqLnBvc2l0aW9uLnpcblx0ICAgICAgICB9KVxuXHQgICAgICAgIFxuXHQgICAgICAgIFxuXHQgICAgICAgIGlmIChvYmouaWQpIHtcblx0ICAgICAgICAgICAgY29uZmlnLndpdGhDb21wb25lbnQoJ2FwcGVhcmFuY2UnLCBmdW5jdGlvbigpIHtcbiAgICBcdCAgICAgICAgICAgdGhpcy5pZCA9IG9iai5pZFxuICAgIFx0ICAgICAgICB9KVxuXHQgICAgICAgIH1cblx0ICAgICAgICBcblx0XHRcdGlmIChjb21wb25lbnRzKSB7XG5cdFx0XHQgICAgZm9yIChjb25zdCB7a2V5LCBkYXRhfSBvZiBjb21wb25lbnRzKSB7XG5cdFx0XHQgICAgIC8vICAgY29uZmlnLndpdGhDb21wb25lbnQoa2V5LCBkYXRhKVxuXHRcdCAgICAgICAgICAgIGNvbmZpZy53aXRoQ29tcG9uZW50KGtleSlcblx0XHRcdCAgICB9XG5cdFx0XHQgICAgXG5cdFx0XHQgICAgb2JqLnVzZXJEYXRhLmVudGl0eUlkID0gY29uZmlnLmNyZWF0ZSgxKVxuXHRcdFx0fVxuXHRcdH0pXG4gICAgfVxuICAgIFxuICAgIGxvYWQoe3Byb2plY3QsIHNjZW5lLCBjYW1lcmF9KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdsb2FkaW5nLi4uJylcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHBhcnNlZFNjZW5lID0gdGhpcy5sb2FkZXIucGFyc2Uoc2NlbmUpXG4gICAgICAgIGNvbnN0IHBhcnNlZENhbWVyYSA9IHRoaXMubG9hZGVyLnBhcnNlKGNhbWVyYSlcblx0XHRcblx0XHR0aGlzLmluaXRFbnRpdGllcyhwYXJzZWRTY2VuZSlcblxuICAgIFx0aWYgKHByb2plY3Quc2hhZG93cykge1xuXHRcdFx0dGhpcy5yZW5kZXJlck1hbmFnZXIuZW5hYmxlU2hhZG93cygpXG5cdFx0fVxuXHRcdFxuICAgIFx0Ly90b2RvOiBjaGVjayBmb3IgY2FtZXJhIGFuZCBzY2VuZSBmaXJzdD8gdGhyb3cgaWYgbm90P1xuICAgIFx0dGhpcy5yZW5kZXJlck1hbmFnZXIuc2V0U2NlbmUocGFyc2VkU2NlbmUpXG4gICAgXHR0aGlzLnJlbmRlcmVyTWFuYWdlci5zZXRDYW1lcmEocGFyc2VkQ2FtZXJhLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcblx0fVxuICAgIFxuICAgIHNldFNpemUod2lkdGgsIGhlaWdodCkgIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlbmRlcmVyTWFuYWdlci5zZXRTaXplKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KVxuICAgIH1cbiAgICBcbiAgICBnZXREb20oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyTWFuYWdlci5nZXREb20oKVxuICAgIH1cbiAgICBcbiAgICBwbGF5KCkge1xuICAgICAgICB0aGlzLmxvb3BNYW5hZ2VyLnN0YXJ0KClcbiAgICB9XG4gICAgXG4gICAgc3RvcCgpIHtcbiAgICAgICAgdGhpcy5sb29wTWFuYWdlci5zdG9wKClcbiAgICB9XG59Il0sIm5hbWVzIjpbInRoaXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLEVBQUEsQ0FBQyxVQUFVLE1BQU0sRUFBRSxPQUFPLEVBQUU7TUFDeEIsT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO01BQy9FLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxNQUFNLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLENBQUM7T0FDdEYsT0FBTyxFQUFFLE1BQU0sQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0dBQzVELENBQUNBLGlCQUFJLEVBQUUsVUFBVSxPQUFPLEVBQUUsRUFBRSxZQUFZLENBQUM7O01BRXRDLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztNQUN0QixZQUFZLENBQUMsTUFBTSxHQUFHLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxPQUFPLE1BQU0sQ0FBQyxRQUFRLEtBQUssUUFBUSxHQUFHLFVBQVUsR0FBRyxFQUFFO1FBQ3pHLE9BQU8sT0FBTyxHQUFHLENBQUM7T0FDbkIsR0FBRyxVQUFVLEdBQUcs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LEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLE9BQU8sTUFBTSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxNQUFNLEVBQUUsSUFBSSxHQUFHLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUNBLGlCQUFJLENBQUMsQ0FBQzs7Ozs7RUN3RXZ4QyxJQUFJLGNBQWMsR0FBRyxVQUFVLFFBQVEsRUFBRSxXQUFXLEVBQUU7QUFDN0QsRUFBQSxFQUFFLElBQUksQ0FBQyxDQUFDLFFBQVEsWUFBWSxXQUFXLENBQUMsRUFBRTtBQUMxQyxFQUFBLElBQUksTUFBTSxJQUFJLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0FBQzdELEVBQUEsR0FBRztBQUNILEVBQUEsQ0FBQyxDQUFDOztBQUVGLEVB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