(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define('GGEntities', ['exports'], factory) :
  (factory((global.GGEntities = global.GGEntities || {})));
}(this, function (exports) { 'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

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

  var slicedToArray = function () {
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

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  var EntityFactory = function () {
      function EntityFactory() {
          classCallCheck(this, EntityFactory);

          this.initializers = new Map();
          this.configuration = new Map();
      }

      createClass(EntityFactory, [{
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
                          var _step2$value = slicedToArray(_step2.value, 2);

                          var component = _step2$value[0];
                          var initializer = _step2$value[1];

                          if (typeof initializer !== 'function') {
                              continue;
                          }

                          var result = initializer.call(entity[component]);

                          if (_typeof(entity[component]) !== 'object' && result !== undefined) {
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
          classCallCheck(this, ComponentManager);

          this.components = new Map();
      }

      createClass(ComponentManager, [{
          key: 'newComponent',
          value: function newComponent(key) {
              var component = this.components.get(key);

              if (component == null) {
                  return null;
              }

              switch (typeof component === 'undefined' ? 'undefined' : _typeof(component)) {
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
          classCallCheck(this, SystemManager);

          this.logicSystems = new Map();
          this.renderSystems = new Map();
          this.initSystems = new Map();
      }

      createClass(SystemManager, [{
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

  var emptyPromise = function emptyPromise() {
      return new Promise(function (resolve) {
          resolve();
      });
  };

  var promise = function promise(callback, context, args, timeout) {
      if (timeout) {
          return new Promise(function (resolve) {
              setTimeout(function () {
                  resolve((typeof context === 'undefined' ? 'undefined' : _typeof(context)) === 'object' ? callback.call.apply(callback, [context].concat(toConsumableArray(args))) : callback.apply.apply(callback, [context].concat(toConsumableArray(args))));
              }, timeout);
          });
      }

      return new Promise(function (resolve) {
          resolve((typeof context === 'undefined' ? 'undefined' : _typeof(context)) === 'object' ? callback.call.apply(callback, [context].concat(toConsumableArray(args))) : callback.apply.apply(callback, [context].concat(toConsumableArray(args))));
      });
  };

  var EventHandler = function () {
      function EventHandler() {
          classCallCheck(this, EventHandler);

          this.events = new Map();
      }

      createClass(EventHandler, [{
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
                  eventId = Math.max.apply(Math, [eventId].concat(toConsumableArray(event.keys())));
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

              var _args$splice2 = slicedToArray(_args$splice, 1);

              var event = _args$splice2[0];


              if (typeof event !== 'string' || !self.events.has(event)) {
                  return emptyPromise();
              }

              var promises = [];

              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                  for (var _iterator3 = self.events.get(event).values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                      var callback = _step3.value;

                      promises.push(promise(callback, this, args));
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

              var _args$splice4 = slicedToArray(_args$splice3, 2);

              var event = _args$splice4[0];
              var timeout = _args$splice4[1];


              if (typeof event !== 'string' || !Number.isInteger(timeout) || !self.events.has(event)) {
                  return emptyPromise();
              }

              var promises = [];

              var _iteratorNormalCompletion4 = true;
              var _didIteratorError4 = false;
              var _iteratorError4 = undefined;

              try {
                  for (var _iterator4 = self.events.get(event).values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                      var callback = _step4.value;

                      promises.push(promise(callback, this, args, timeout));
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
          classCallCheck(this, EntityManager);

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

      createClass(EntityManager, [{
          key: 'increaseCapacity',
          value: function increaseCapacity() {
              var oldCapacity = this.capacity;

              this.capacity *= 2;

              this.entities = [].concat(toConsumableArray(this.entities), toConsumableArray(Array.from({ length: oldCapacity }, function () {
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

              switch (typeof component === 'undefined' ? 'undefined' : _typeof(component)) {
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

  exports.EntityManager = EntityManager;
  exports.EntityFactory = EntityFactory;
  exports.SystemManager = SystemManager;
  exports.SystemType = SystemType;
  exports.ComponentManager = ComponentManager;
  exports.EventHandler = EventHandler;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL3NyYy9jb3JlL2VudGl0eS1mYWN0b3J5LmpzIiwiLi4vc3JjL2NvcmUvY29tcG9uZW50LW1hbmFnZXIuanMiLCIuLi9zcmMvY29yZS9zeXN0ZW0tbWFuYWdlci5qcyIsIi4uL3NyYy9jb3JlL2V2ZW50LWhhbmRsZXIuanMiLCIuLi9zcmMvY29yZS9lbnRpdHktbWFuYWdlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlNYW5hZ2VyIH0gZnJvbSAnLi9lbnRpdHktbWFuYWdlcidcblxuY2xhc3MgRW50aXR5RmFjdG9yeSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXJzICA9IG5ldyBNYXAoKVxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSBuZXcgTWFwKClcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJJbml0aWFsaXplcihrZXksIGluaXRpYWxpemVyKSB7XG4gICAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyB8fCBrZXkgPT09ICcnKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2tleSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZy4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGluaXRpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2luaXRpYWxpemVyIG11c3QgYmUgYSBmdW5jdGlvbi4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmluaXRpYWxpemVycy5zZXQoa2V5LCBpbml0aWFsaXplcilcbiAgICB9XG4gICAgXG4gICAgYnVpbGQoKSB7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IG5ldyBNYXAoKVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgXG4gICAgd2l0aENvbXBvbmVudChrZXksIGluaXRpYWxpemVyKSB7XG4gICAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyB8fCBrZXkgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGluaXRpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBpbml0aWFsaXplciA9IHRoaXMuaW5pdGlhbGl6ZXJzLmdldChrZXkpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5zZXQoa2V5LCBpbml0aWFsaXplcilcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZUNvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb25cbiAgICB9XG4gICAgXG4gICAgY3JlYXRlKGVudGl0eU1hbmFnZXIsIGNvdW50ID0gMSwgY29uZmlndXJhdGlvbiA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIShlbnRpdHlNYW5hZ2VyIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlcikpIHtcbiAgICAgICAgICAgIHJldHVybiBbXVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIGNvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uIHx8IHRoaXMuY29uZmlndXJhdGlvblxuICAgICAgICBcbiAgICAgICAgbGV0IGNvbXBvbmVudHMgPSBbXVxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY29tcG9uZW50IG9mIGNvbmZpZ3VyYXRpb24ua2V5cygpKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzLnB1c2goY29tcG9uZW50KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgZW50aXRpZXMgPSBbXVxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgKytpKSB7XG4gICAgICAgICAgICBsZXQgeyBpZCwgZW50aXR5IH0gPSBlbnRpdHlNYW5hZ2VyLm5ld0VudGl0eShjb21wb25lbnRzKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoaWQgPj0gZW50aXR5TWFuYWdlci5jYXBhY2l0eSkge1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IFtjb21wb25lbnQsIGluaXRpYWxpemVyXSBvZiBjb25maWd1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBpbml0aWFsaXplci5jYWxsKGVudGl0eVtjb21wb25lbnRdKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZW50aXR5W2NvbXBvbmVudF0gIT09ICdvYmplY3QnICYmIHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eVtjb21wb25lbnRdID0gcmVzdWx0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBlbnRpdGllcy5wdXNoKHsgaWQsIGVudGl0eSB9KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZW50aXRpZXMubGVuZ3RoID09PSAxID8gZW50aXRpZXNbMF0gOiBlbnRpdGllc1xuICAgIH1cbn1cblxuZXhwb3J0IHsgRW50aXR5RmFjdG9yeSB9IiwiY2xhc3MgQ29tcG9uZW50TWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IG5ldyBNYXAoKVxuICAgIH1cbiAgICBcbiAgICBuZXdDb21wb25lbnQoa2V5KSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KGtleSlcbiAgICAgICAgXG4gICAgICAgIGlmIChjb21wb25lbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgY29tcG9uZW50KSB7XG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBjb21wb25lbnQoKVxuICAgICAgICAgICAgY2FzZSAnb2JqZWN0JyAgOiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgoY29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXQgPSB7fVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoY29tcG9uZW50KS5mb3JFYWNoKGtleSA9PiByZXRba2V5XSA9IGNvbXBvbmVudFtrZXldKVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldFxuICAgICAgICAgICAgICAgIH0pKGNvbXBvbmVudClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudFxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyQ29tcG9uZW50KGtleSwgY29tcG9uZW50KSB7XG4gICAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyB8fCBrZXkgPT09ICcnKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2tleSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZy4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoY29tcG9uZW50ID09PSBudWxsIHx8IGNvbXBvbmVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvbXBvbmVudCBjYW5ub3QgYmUgbnVsbCBvciB1bmRlZmluZWQuJylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5jb21wb25lbnRzLnNldChrZXksIGNvbXBvbmVudClcblxuICAgICAgICByZXR1cm4ga2V5XG4gICAgfVxuICAgIFxuICAgIGdldENvbXBvbmVudHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudHNcbiAgICB9XG59XG5cbmV4cG9ydCB7IENvbXBvbmVudE1hbmFnZXIgfSIsImV4cG9ydCBjb25zdCBTeXN0ZW1UeXBlID0ge1xuICAgIExvZ2ljICA6IDAsXG4gICAgUmVuZGVyIDogMSxcbiAgICBJbml0ICAgOiAyXG59XG5cbmNsYXNzIFN5c3RlbU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmxvZ2ljU3lzdGVtcyAgPSBuZXcgTWFwKClcbiAgICAgICAgdGhpcy5yZW5kZXJTeXN0ZW1zID0gbmV3IE1hcCgpXG4gICAgICAgIHRoaXMuaW5pdFN5c3RlbXMgICA9IG5ldyBNYXAoKVxuICAgIH1cbiAgICBcbiAgICByZWdpc3RlclN5c3RlbShrZXksIHR5cGUsIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyB8fCBrZXkgPT09ICcnKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2tleSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZy4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZSAhPT0gU3lzdGVtVHlwZS5Mb2dpYyAmJiB0eXBlICE9PSBTeXN0ZW1UeXBlLlJlbmRlciAmJiB0eXBlICE9PSBTeXN0ZW1UeXBlLkluaXQpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcigndHlwZSBtdXN0IGJlIGEgdmFsaWQgU3lzdGVtVHlwZS4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29tcG9uZW50cykpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignY29tcG9uZW50cyBhcmd1bWVudCBtdXN0IGJlIGFuIGFycmF5IG9mIGNvbXBvbmVudHMuJylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24uJylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHN5c3RlbSA9IHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMsXG4gICAgICAgICAgICBjYWxsYmFja1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgU3lzdGVtVHlwZS5Mb2dpYyA6IHRoaXMubG9naWNTeXN0ZW1zLnNldChrZXksIHN5c3RlbSk7IGJyZWFrXG4gICAgICAgICAgICBjYXNlIFN5c3RlbVR5cGUuUmVuZGVyIDogdGhpcy5yZW5kZXJTeXN0ZW1zLnNldChrZXksIHN5c3RlbSk7IGJyZWFrXG4gICAgICAgICAgICBjYXNlIFN5c3RlbVR5cGUuSW5pdCA6IHRoaXMuaW5pdFN5c3RlbXMuc2V0KGtleSwgc3lzdGVtKTsgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGtleVxuICAgIH1cbiAgICBcbiAgICByZW1vdmVTeXN0ZW0oa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2ljU3lzdGVtcy5kZWxldGUoa2V5KSB8fCB0aGlzLnJlbmRlclN5c3RlbXMuZGVsZXRlKGtleSkgfHwgdGhpcy5pbml0U3lzdGVtcy5kZWxldGUoa2V5KVxuICAgIH1cbn1cblxuZXhwb3J0IHsgU3lzdGVtTWFuYWdlciB9IiwiaW1wb3J0IHsgRW50aXR5TWFuYWdlciB9IGZyb20gJy4vZW50aXR5LW1hbmFnZXInXG5cbmNvbnN0IGVtcHR5UHJvbWlzZSA9ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIHJlc29sdmUoKVxuICAgIH0pXG59XG5cbmNvbnN0IHByb21pc2UgPSAoY2FsbGJhY2ssIGNvbnRleHQsIGFyZ3MsIHRpbWVvdXQpID0+IHtcbiAgICBpZiAodGltZW91dCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0eXBlb2YgY29udGV4dCA9PT0gICdvYmplY3QnID8gY2FsbGJhY2suY2FsbChjb250ZXh0LCAuLi5hcmdzKSA6IGNhbGxiYWNrLmFwcGx5KGNvbnRleHQsIC4uLmFyZ3MpKVxuICAgICAgICAgICAgfSwgdGltZW91dClcbiAgICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICByZXNvbHZlKHR5cGVvZiBjb250ZXh0ID09PSAnb2JqZWN0JyA/IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgLi4uYXJncykgOiBjYWxsYmFjay5hcHBseShjb250ZXh0LCAuLi5hcmdzKSlcbiAgICB9KVxufVxuICAgIFxuY2xhc3MgRXZlbnRIYW5kbGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgTWFwKClcbiAgICB9XG4gICAgXG4gICAgbGlzdGVuKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoIXRoaXMuZXZlbnRzLmhhcyhldmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnNldChldmVudCwgbmV3IE1hcCgpKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgZXZlbnRJZCA9IC0xXG4gICAgICAgIFxuICAgICAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50SWQgPSBNYXRoLm1heChldmVudElkLCAuLi5ldmVudC5rZXlzKCkpXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgKytldmVudElkXG4gICAgICAgIFxuICAgICAgICB0aGlzLmV2ZW50cy5nZXQoZXZlbnQpLnNldChldmVudElkLCBjYWxsYmFjaylcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBldmVudElkXG4gICAgfVxuICAgIFxuICAgIHN0b3BMaXN0ZW4oZXZlbnRJZCkge1xuICAgICAgICBmb3IgKGxldCBldmVudHMgb2YgdGhpcy5ldmVudHMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGlkIG9mIGV2ZW50cy5rZXlzKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaWQgPT09IGV2ZW50SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50cy5kZWxldGUoZXZlbnRJZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlcigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlciA/IHRoaXMuZXZlbnRIYW5kbGVyIDogdGhpc1xuICAgICAgICBcbiAgICAgICAgbGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cylcbiAgICAgICAgXG4gICAgICAgIGxldCBbIGV2ZW50IF0gPSBhcmdzLnNwbGljZSgwLCAxKVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgIXNlbGYuZXZlbnRzLmhhcyhldmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBlbXB0eVByb21pc2UoKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXVxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY2FsbGJhY2sgb2Ygc2VsZi5ldmVudHMuZ2V0KGV2ZW50KS52YWx1ZXMoKSkge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChwcm9taXNlKGNhbGxiYWNrLCB0aGlzLCBhcmdzKSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKVxuICAgIH1cbiAgICBcbiAgICB0cmlnZ2VyRGVsYXllZCgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlciA/IHRoaXMuZXZlbnRIYW5kbGVyIDogdGhpc1xuICAgICAgICBcbiAgICAgICAgbGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cylcbiAgICAgICAgXG4gICAgICAgIGxldCBbIGV2ZW50LCB0aW1lb3V0IF0gPSBhcmdzLnNwbGljZSgwLCAyKVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgIU51bWJlci5pc0ludGVnZXIodGltZW91dCkgfHwgIXNlbGYuZXZlbnRzLmhhcyhldmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBlbXB0eVByb21pc2UoKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXVxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY2FsbGJhY2sgb2Ygc2VsZi5ldmVudHMuZ2V0KGV2ZW50KS52YWx1ZXMoKSkge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChwcm9taXNlKGNhbGxiYWNrLCB0aGlzLCBhcmdzLCB0aW1lb3V0KSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKVxuICAgIH1cbn1cblxuZXhwb3J0IHsgRXZlbnRIYW5kbGVyIH0iLCJpbXBvcnQgeyBFbnRpdHlGYWN0b3J5IH0gICAgICAgICAgICAgZnJvbSAnLi9lbnRpdHktZmFjdG9yeSdcbmltcG9ydCB7IENvbXBvbmVudE1hbmFnZXIgfSAgICAgICAgICBmcm9tICcuL2NvbXBvbmVudC1tYW5hZ2VyJ1xuaW1wb3J0IHsgU3lzdGVtTWFuYWdlciwgU3lzdGVtVHlwZSB9IGZyb20gJy4vc3lzdGVtLW1hbmFnZXInXG5pbXBvcnQgeyBFdmVudEhhbmRsZXIgfSAgICAgICAgICAgICAgZnJvbSAnLi9ldmVudC1oYW5kbGVyJ1xuXG5jbGFzcyBFbnRpdHlNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcihjYXBhY2l0eSA9IDEwMDApIHtcbiAgICAgICAgdGhpcy5jYXBhY2l0eSAgICAgICAgID0gY2FwYWNpdHlcbiAgICAgICAgdGhpcy5jdXJyZW50TWF4RW50aXR5ID0gLTFcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeSAgICA9IG5ldyBFbnRpdHlGYWN0b3J5KClcbiAgICAgICAgdGhpcy5zeXN0ZW1NYW5hZ2VyICAgID0gbmV3IFN5c3RlbU1hbmFnZXIoKVxuICAgICAgICB0aGlzLmNvbXBvbmVudE1hbmFnZXIgPSBuZXcgQ29tcG9uZW50TWFuYWdlcigpXG4gICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyICAgICA9IG5ldyBFdmVudEhhbmRsZXIoKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdGllcyA9IEFycmF5LmZyb20oeyBsZW5ndGggOiB0aGlzLmNhcGFjaXR5IH0sICgpID0+ICh7IGNvbXBvbmVudHM6IFsgXSB9KSlcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXR5Q29uZmlndXJhdGlvbnMgPSBuZXcgTWFwKClcbiAgICB9XG4gICAgXG4gICAgaW5jcmVhc2VDYXBhY2l0eSgpIHtcbiAgICAgICAgbGV0IG9sZENhcGFjaXR5ID0gdGhpcy5jYXBhY2l0eVxuICAgICAgICBcbiAgICAgICAgdGhpcy5jYXBhY2l0eSAqPSAyXG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0aWVzID0gWy4uLnRoaXMuZW50aXRpZXMsIC4uLkFycmF5LmZyb20oeyBsZW5ndGggOiBvbGRDYXBhY2l0eSB9LCAoKSA9PiAoeyBjb21wb25lbnRzOiBbIF0gfSkpXVxuXG4gICAgICAgIGZvciAobGV0IGkgPSBvbGRDYXBhY2l0eTsgaSA8IHRoaXMuY2FwYWNpdHk7ICsraSkge1xuICAgICAgICAgICAgZm9yIChsZXQgY29tcG9uZW50IG9mIHRoaXMuY29tcG9uZW50TWFuYWdlci5nZXRDb21wb25lbnRzKCkua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tpXVtjb21wb25lbnRdID0gdGhpcy5jb21wb25lbnRNYW5hZ2VyLm5ld0NvbXBvbmVudChjb21wb25lbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbmV3RW50aXR5KGNvbXBvbmVudHMpIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbXBvbmVudHMpKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvbXBvbmVudHMgYXJndW1lbnQgbXVzdCBiZSBhbiBhcnJheSBvZiBjb21wb25lbnRzLicpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBpZCA9IDBcbiAgICAgICAgXG4gICAgICAgIGZvciAoOyBpZCA8IHRoaXMuY2FwYWNpdHk7ICsraWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChpZCA+PSB0aGlzLmNhcGFjaXR5KSB7XG4gICAgICAgICAgICAvLyB0b2RvOiBhdXRvIGluY3JlYXNlIGNhcGFjaXR5P1xuICAgICAgICAgICAgcmV0dXJuIHsgaWQgOiB0aGlzLmNhcGFjaXR5LCBlbnRpdHkgOiBudWxsIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSBpZFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzID0gY29tcG9uZW50c1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHsgaWQsIGVudGl0eSA6IHRoaXMuZW50aXRpZXNbaWRdIH1cbiAgICB9XG4gICAgXG4gICAgZGVsZXRlRW50aXR5KGlkKSB7XG4gICAgICAgIHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMgPSBbXVxuICAgICAgICBcbiAgICAgICAgaWYgKGlkIDwgdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IGlkOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbaV0uY29tcG9uZW50cy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSBpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSAwXG4gICAgfVxuXG4gICAgKmdldEVudGl0aWVzKGNvbXBvbmVudHMgPSBudWxsKSB7XG4gICAgICAgIGZvciAobGV0IGlkID0gMDsgaWQgPD0gdGhpcy5jdXJyZW50TWF4RW50aXR5OyArK2lkKSB7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50cyA9PT0gbnVsbCB8fCBjb21wb25lbnRzLmV2ZXJ5KGNvbXBvbmVudCA9PiB0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzLmluZGV4T2YoY29tcG9uZW50KSAhPT0gLTEpKSB7XG4gICAgICAgICAgICAgICAgeWllbGQgeyBpZCwgZW50aXR5IDogdGhpcy5lbnRpdGllc1tpZF0gfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyQ29uZmlndXJhdGlvbihrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnIHx8IGtleSA9PT0gJycpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcigna2V5IG11c3QgYmUgYSBub24gZW1wdHkgc3RyaW5nLicpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXR5Q29uZmlndXJhdGlvbnMuc2V0KGtleSwgdGhpcy5lbnRpdHlGYWN0b3J5LmNyZWF0ZUNvbmZpZ3VyYXRpb24oKSlcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBrZXlcbiAgICB9XG4gICAgXG4gICAgLy8gQ29tcG9uZW50IE1hbmFnZXJcbiAgICBcbiAgICByZWdpc3RlckNvbXBvbmVudChrZXksIGNvbXBvbmVudCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudE1hbmFnZXIucmVnaXN0ZXJDb21wb25lbnQoa2V5LCBjb21wb25lbnQpXG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBlbnRpdHkgb2YgdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgZW50aXR5W2tleV0gPSB0aGlzLmNvbXBvbmVudE1hbmFnZXIubmV3Q29tcG9uZW50KGtleSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGluaXRpYWxpemVyXG5cbiAgICAgICAgc3dpdGNoICh0eXBlb2YgY29tcG9uZW50KSB7XG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6IGluaXRpYWxpemVyID0gY29tcG9uZW50OyBicmVha1xuICAgICAgICAgICAgY2FzZSAnb2JqZWN0Jzoge1xuICAgICAgICAgICAgICAgIGluaXRpYWxpemVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhjb21wb25lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBjb21wb25lbnRba2V5XVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6IGluaXRpYWxpemVyID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb21wb25lbnQgfTsgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LnJlZ2lzdGVySW5pdGlhbGl6ZXIoa2V5LCBpbml0aWFsaXplcilcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBrZXlcbiAgICB9XG4gICAgXG4gICAgYWRkQ29tcG9uZW50KGlkLCBjb21wb25lbnRLZXkpIHtcbiAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMuaW5kZXhPZihjb21wb25lbnRLZXkpICE9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMucHVzaChjb21wb25lbnRLZXkpXG4gICAgfVxuICAgIFxuICAgIHJlbW92ZUNvbXBvbmVudChpZCwgY29tcG9uZW50KSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMuaW5kZXhPZihjb21wb25lbnQpXG4gICAgICAgIFxuICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdGllc1tpZF0uY29tcG9uZW50cy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuICAgIFxuICAgIC8vIFN5c3RlbSBNYW5hZ2VyXG4gICAgXG4gICAgcmVnaXN0ZXJTeXN0ZW0oa2V5LCB0eXBlLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlZ2lzdGVyU3lzdGVtKGtleSwgdHlwZSwgY29tcG9uZW50cywgY2FsbGJhY2spXG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyTG9naWNTeXN0ZW0oa2V5LCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlZ2lzdGVyU3lzdGVtKGtleSwgU3lzdGVtVHlwZS5Mb2dpYywgY29tcG9uZW50cywgY2FsbGJhY2spXG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyUmVuZGVyU3lzdGVtKGtleSwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbShrZXksIFN5c3RlbVR5cGUuUmVuZGVyLCBjb21wb25lbnRzLCBjYWxsYmFjaylcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJJbml0U3lzdGVtKGtleSwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbShrZXksIFN5c3RlbVR5cGUuSW5pdCwgY29tcG9uZW50cywgY2FsbGJhY2spXG4gICAgfVxuICAgIFxuICAgIHJlbW92ZVN5c3RlbShrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZW1vdmVTeXN0ZW0oa2V5KVxuICAgIH1cbiAgICBcbiAgICBvbkxvZ2ljKG9wdHMpIHtcbiAgICAgICAgZm9yIChsZXQgc3lzdGVtIG9mIHRoaXMuc3lzdGVtTWFuYWdlci5sb2dpY1N5c3RlbXMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMpLCBvcHRzKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uUmVuZGVyKG9wdHMpIHtcbiAgICAgICAgZm9yIChsZXQgc3lzdGVtIG9mIHRoaXMuc3lzdGVtTWFuYWdlci5yZW5kZXJTeXN0ZW1zLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBzeXN0ZW0uY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLmdldEVudGl0aWVzKHN5c3RlbS5jb21wb25lbnRzKSwgb3B0cylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5pdChvcHRzKSB7XG4gICAgICAgIGZvciAobGV0IHN5c3RlbSBvZiB0aGlzLnN5c3RlbU1hbmFnZXIuaW5pdFN5c3RlbXMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMpLCBvcHRzKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIEVudGl0eSBGYWN0b3J5XG4gICAgXG4gICAgcmVnaXN0ZXJJbml0aWFsaXplcihjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LnJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKVxuICAgIH1cbiAgICBcbiAgICBidWlsZCgpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LmJ1aWxkKClcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIFxuICAgIHdpdGhDb21wb25lbnQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS53aXRoQ29tcG9uZW50KGNvbXBvbmVudElkLCBpbml0aWFsaXplcilcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZShjb3VudCwga2V5KSB7XG4gICAgICAgIGxldCBjb25maWd1cmF0aW9uID0gdW5kZWZpbmVkXG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24gPSB0aGlzLmVudGl0eUNvbmZpZ3VyYXRpb25zLmdldChrZXkpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChjb25maWd1cmF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvdWxkIG5vdCBmaW5kIGVudGl0eSBjb25maWd1cmF0aW9uIGZvciB0aGUgc3VwcGxpZWQga2V5LiBpZiB5b3Ugd2lzaCB0byBjcmVhdGUgYW4gZW50aXR5IHdpdGhvdXQgYSBjb25maWd1cmF0aW9uLCBkbyBub3QgcGFzcyBhIGtleS4nKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy5lbnRpdHlGYWN0b3J5LmNyZWF0ZSh0aGlzLCBjb3VudCwgY29uZmlndXJhdGlvbilcbiAgICB9XG4gICAgXG4gICAgLy8gRXZlbnQgSGFuZGxlclxuICAgIFxuICAgIGxpc3RlbihldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLmxpc3RlbihldmVudCwgY2FsbGJhY2spXG4gICAgfVxuICAgIFxuICAgIHN0b3BMaXN0ZW4oZXZlbnRJZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIuc3RvcExpc3RlbihldmVudElkKVxuICAgIH1cbiAgICBcbiAgICB0cmlnZ2VyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlci5jYWxsKHRoaXMsIC4uLmFyZ3VtZW50cylcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlckRlbGF5ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyRGVsYXllZC5jYWxsKHRoaXMsIC4uLmFyZ3VtZW50cylcbiAgICB9XG59XG5cbmV4cG9ydCB7IEVudGl0eU1hbmFnZXIgfSJdLCJuYW1lcyI6WyJiYWJlbEhlbHBlcnMudHlwZW9mIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFFTTtBQUNGLEVBQUEsNkJBQWM7QUFBQSxFQUFBOztBQUNWLEVBQUEsYUFBSyxZQUFMLEdBQXFCLElBQUksR0FBSixFQUFyQjtBQUNBLEVBQUEsYUFBSyxhQUFMLEdBQXFCLElBQUksR0FBSixFQUFyQjtBQUNILEVBQUE7Ozs7OENBRW1CLEtBQUssYUFBYTtBQUNsQyxFQUFBLGdCQUFJLE9BQU8sR0FBUCxLQUFlLFFBQWYsSUFBMkIsUUFBUSxFQUF2QyxFQUEyQztBQUN2QyxFQUFBLHNCQUFNLFVBQVUsaUNBQVYsQ0FBTjtBQUNILEVBQUE7O0FBRUQsRUFBQSxnQkFBSSxPQUFPLFdBQVAsS0FBdUIsVUFBM0IsRUFBdUM7QUFDbkMsRUFBQSxzQkFBTSxVQUFVLGlDQUFWLENBQU47QUFDSCxFQUFBOztBQUVELEVBQUEsaUJBQUssWUFBTCxDQUFrQixHQUFsQixDQUFzQixHQUF0QixFQUEyQixXQUEzQjtBQUNILEVBQUE7OztrQ0FFTztBQUNKLEVBQUEsaUJBQUssYUFBTCxHQUFxQixJQUFJLEdBQUosRUFBckI7O0FBRUEsRUFBQSxtQkFBTyxJQUFQO0FBQ0gsRUFBQTs7O3dDQUVhLEtBQUssYUFBYTtBQUM1QixFQUFBLGdCQUFJLE9BQU8sR0FBUCxLQUFlLFFBQWYsSUFBMkIsUUFBUSxFQUF2QyxFQUEyQztBQUN2QyxFQUFBLHVCQUFPLElBQVA7QUFDSCxFQUFBOztBQUVELEVBQUEsZ0JBQUksT0FBTyxXQUFQLEtBQXVCLFVBQTNCLEVBQXVDO0FBQ25DLEVBQUEsOEJBQWMsS0FBSyxZQUFMLENBQWtCLEdB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
