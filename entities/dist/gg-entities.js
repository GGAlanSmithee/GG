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

  exports['default'] = EntityManager;
  exports.EntityManager = EntityManager;
  exports.EntityFactory = EntityFactory;
  exports.SystemManager = SystemManager;
  exports.SystemType = SystemType;
  exports.ComponentManager = ComponentManager;
  exports.EventHandler = EventHandler;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2ctZW50aXRpZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL1x1MDAwMGJhYmVsSGVscGVycyIsIi4uL3NyYy9jb3JlL2VudGl0eS1mYWN0b3J5LmpzIiwiLi4vc3JjL2NvcmUvY29tcG9uZW50LW1hbmFnZXIuanMiLCIuLi9zcmMvY29yZS9zeXN0ZW0tbWFuYWdlci5qcyIsIi4uL3NyYy9jb3JlL2V2ZW50LWhhbmRsZXIuanMiLCIuLi9zcmMvY29yZS9lbnRpdHktbWFuYWdlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFiZWxIZWxwZXJzID0ge307XG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iajtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG59O1xuXG5leHBvcnQgdmFyIGpzeCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuZm9yICYmIFN5bWJvbC5mb3IoXCJyZWFjdC5lbGVtZW50XCIpIHx8IDB4ZWFjNztcbiAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZVJhd1JlYWN0RWxlbWVudCh0eXBlLCBwcm9wcywga2V5LCBjaGlsZHJlbikge1xuICAgIHZhciBkZWZhdWx0UHJvcHMgPSB0eXBlICYmIHR5cGUuZGVmYXVsdFByb3BzO1xuICAgIHZhciBjaGlsZHJlbkxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAzO1xuXG4gICAgaWYgKCFwcm9wcyAmJiBjaGlsZHJlbkxlbmd0aCAhPT0gMCkge1xuICAgICAgcHJvcHMgPSB7fTtcbiAgICB9XG5cbiAgICBpZiAocHJvcHMgJiYgZGVmYXVsdFByb3BzKSB7XG4gICAgICBmb3IgKHZhciBwcm9wTmFtZSBpbiBkZWZhdWx0UHJvcHMpIHtcbiAgICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXByb3BzKSB7XG4gICAgICBwcm9wcyA9IGRlZmF1bHRQcm9wcyB8fCB7fTtcbiAgICB9XG5cbiAgICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgfSBlbHNlIGlmIChjaGlsZHJlbkxlbmd0aCA+IDEpIHtcbiAgICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgM107XG4gICAgICB9XG5cbiAgICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgJCR0eXBlb2Y6IFJFQUNUX0VMRU1FTlRfVFlQRSxcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICBrZXk6IGtleSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6ICcnICsga2V5LFxuICAgICAgcmVmOiBudWxsLFxuICAgICAgcHJvcHM6IHByb3BzLFxuICAgICAgX293bmVyOiBudWxsXG4gICAgfTtcbiAgfTtcbn0oKTtcblxuZXhwb3J0IHZhciBhc3luY1RvR2VuZXJhdG9yID0gZnVuY3Rpb24gKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGdlbiA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZ1bmN0aW9uIHN0ZXAoa2V5LCBhcmcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgICAgICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RlcChcInRocm93XCIsIGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN0ZXAoXCJuZXh0XCIpO1xuICAgIH0pO1xuICB9O1xufTtcblxuZXhwb3J0IHZhciBjbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5leHBvcnQgdmFyIGNyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG5leHBvcnQgdmFyIGRlZmluZUVudW1lcmFibGVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKG9iaiwgZGVzY3MpIHtcbiAgZm9yICh2YXIga2V5IGluIGRlc2NzKSB7XG4gICAgdmFyIGRlc2MgPSBkZXNjc1trZXldO1xuICAgIGRlc2MuY29uZmlndXJhYmxlID0gZGVzYy5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2MpIGRlc2Mud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgZGVzYyk7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxuZXhwb3J0IHZhciBkZWZhdWx0cyA9IGZ1bmN0aW9uIChvYmosIGRlZmF1bHRzKSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZGVmYXVsdHMpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIHZhciB2YWx1ZSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZGVmYXVsdHMsIGtleSk7XG5cbiAgICBpZiAodmFsdWUgJiYgdmFsdWUuY29uZmlndXJhYmxlICYmIG9ialtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG5leHBvcnQgdmFyIGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuZXhwb3J0IHZhciBnZXQgPSBmdW5jdGlvbiBnZXQob2JqZWN0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTtcblxuICAgIGlmIChwYXJlbnQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBnZXQocGFyZW50LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChcInZhbHVlXCIgaW4gZGVzYykge1xuICAgIHJldHVybiBkZXNjLnZhbHVlO1xuICB9IGVsc2Uge1xuICAgIHZhciBnZXR0ZXIgPSBkZXNjLmdldDtcblxuICAgIGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpO1xuICB9XG59O1xuXG5leHBvcnQgdmFyIGluaGVyaXRzID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufTtcblxudmFyIF9pbnN0YW5jZW9mID0gZnVuY3Rpb24gKGxlZnQsIHJpZ2h0KSB7XG4gIGlmIChyaWdodCAhPSBudWxsICYmIHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgcmlnaHRbU3ltYm9sLmhhc0luc3RhbmNlXSkge1xuICAgIHJldHVybiByaWdodFtTeW1ib2wuaGFzSW5zdGFuY2VdKGxlZnQpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsZWZ0IGluc3RhbmNlb2YgcmlnaHQ7XG4gIH1cbn07XG5cbmV4cG9ydCB2YXIgaW50ZXJvcFJlcXVpcmVEZWZhdWx0ID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIGRlZmF1bHQ6IG9ialxuICB9O1xufTtcblxuZXhwb3J0IHZhciBpbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gZnVuY3Rpb24gKG9iaikge1xuICBpZiAob2JqICYmIG9iai5fX2VzTW9kdWxlKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbmV3T2JqID0ge307XG5cbiAgICBpZiAob2JqICE9IG51bGwpIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIG5ld09ialtrZXldID0gb2JqW2tleV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgbmV3T2JqLmRlZmF1bHQgPSBvYmo7XG4gICAgcmV0dXJuIG5ld09iajtcbiAgfVxufTtcblxuZXhwb3J0IHZhciBuZXdBcnJvd0NoZWNrID0gZnVuY3Rpb24gKGlubmVyVGhpcywgYm91bmRUaGlzKSB7XG4gIGlmIChpbm5lclRoaXMgIT09IGJvdW5kVGhpcykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgaW5zdGFudGlhdGUgYW4gYXJyb3cgZnVuY3Rpb25cIik7XG4gIH1cbn07XG5cbmV4cG9ydCB2YXIgb2JqZWN0RGVzdHJ1Y3R1cmluZ0VtcHR5ID0gZnVuY3Rpb24gKG9iaikge1xuICBpZiAob2JqID09IG51bGwpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgZGVzdHJ1Y3R1cmUgdW5kZWZpbmVkXCIpO1xufTtcblxuZXhwb3J0IHZhciBvYmplY3RXaXRob3V0UHJvcGVydGllcyA9IGZ1bmN0aW9uIChvYmosIGtleXMpIHtcbiAgdmFyIHRhcmdldCA9IHt9O1xuXG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTtcbiAgICB0YXJnZXRbaV0gPSBvYmpbaV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuZXhwb3J0IHZhciBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuID0gZnVuY3Rpb24gKHNlbGYsIGNhbGwpIHtcbiAgaWYgKCFzZWxmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59O1xuXG5leHBvcnQgdmFyIHNlbGZHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IGdsb2JhbDtcblxuZXhwb3J0IHZhciBzZXQgPSBmdW5jdGlvbiBzZXQob2JqZWN0LCBwcm9wZXJ0eSwgdmFsdWUsIHJlY2VpdmVyKSB7XG4gIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTtcblxuICBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpO1xuXG4gICAgaWYgKHBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgc2V0KHBhcmVudCwgcHJvcGVydHksIHZhbHVlLCByZWNlaXZlcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKFwidmFsdWVcIiBpbiBkZXNjICYmIGRlc2Mud3JpdGFibGUpIHtcbiAgICBkZXNjLnZhbHVlID0gdmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHNldHRlciA9IGRlc2Muc2V0O1xuXG4gICAgaWYgKHNldHRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBzZXR0ZXIuY2FsbChyZWNlaXZlciwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbmV4cG9ydCB2YXIgc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHtcbiAgICB2YXIgX2FyciA9IFtdO1xuICAgIHZhciBfbiA9IHRydWU7XG4gICAgdmFyIF9kID0gZmFsc2U7XG4gICAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZCA9IHRydWU7XG4gICAgICBfZSA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF9hcnI7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHtcbiAgICAgIHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xuICAgIH1cbiAgfTtcbn0oKTtcblxuZXhwb3J0IHZhciBzbGljZWRUb0FycmF5TG9vc2UgPSBmdW5jdGlvbiAoYXJyLCBpKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICByZXR1cm4gYXJyO1xuICB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkge1xuICAgIHZhciBfYXJyID0gW107XG5cbiAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmU7KSB7XG4gICAgICBfYXJyLnB1c2goX3N0ZXAudmFsdWUpO1xuXG4gICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIF9hcnI7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG4gIH1cbn07XG5cbmV4cG9ydCB2YXIgdGFnZ2VkVGVtcGxhdGVMaXRlcmFsID0gZnVuY3Rpb24gKHN0cmluZ3MsIHJhdykge1xuICByZXR1cm4gT2JqZWN0LmZyZWV6ZShPYmplY3QuZGVmaW5lUHJvcGVydGllcyhzdHJpbmdzLCB7XG4gICAgcmF3OiB7XG4gICAgICB2YWx1ZTogT2JqZWN0LmZyZWV6ZShyYXcpXG4gICAgfVxuICB9KSk7XG59O1xuXG5leHBvcnQgdmFyIHRhZ2dlZFRlbXBsYXRlTGl0ZXJhbExvb3NlID0gZnVuY3Rpb24gKHN0cmluZ3MsIHJhdykge1xuICBzdHJpbmdzLnJhdyA9IHJhdztcbiAgcmV0dXJuIHN0cmluZ3M7XG59O1xuXG5leHBvcnQgdmFyIHRlbXBvcmFsUmVmID0gZnVuY3Rpb24gKHZhbCwgbmFtZSwgdW5kZWYpIHtcbiAgaWYgKHZhbCA9PT0gdW5kZWYpIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IobmFtZSArIFwiIGlzIG5vdCBkZWZpbmVkIC0gdGVtcG9yYWwgZGVhZCB6b25lXCIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWw7XG4gIH1cbn07XG5cbmV4cG9ydCB2YXIgdGVtcG9yYWxVbmRlZmluZWQgPSB7fTtcblxuZXhwb3J0IHZhciB0b0FycmF5ID0gZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShhcnIpID8gYXJyIDogQXJyYXkuZnJvbShhcnIpO1xufTtcblxuZXhwb3J0IHZhciB0b0NvbnN1bWFibGVBcnJheSA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIGFycjJbaV0gPSBhcnJbaV07XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShhcnIpO1xuICB9XG59O1xuXG5iYWJlbEhlbHBlcnM7XG5cbmV4cG9ydCB7IF90eXBlb2YgYXMgdHlwZW9mLCBfZXh0ZW5kcyBhcyBleHRlbmRzLCBfaW5zdGFuY2VvZiBhcyBpbnN0YW5jZW9mIH0iLCJpbXBvcnQgRW50aXR5TWFuYWdlciBmcm9tICcuL2VudGl0eS1tYW5hZ2VyJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRpdHlGYWN0b3J5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplcnMgID0gbmV3IE1hcCgpXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IG5ldyBNYXAoKVxuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckluaXRpYWxpemVyKGtleSwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnIHx8IGtleSA9PT0gJycpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcigna2V5IG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nLicpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgaW5pdGlhbGl6ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignaW5pdGlhbGl6ZXIgbXVzdCBiZSBhIGZ1bmN0aW9uLicpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXJzLnNldChrZXksIGluaXRpYWxpemVyKVxuICAgIH1cbiAgICBcbiAgICBidWlsZCgpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gbmV3IE1hcCgpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBcbiAgICB3aXRoQ29tcG9uZW50KGtleSwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnIHx8IGtleSA9PT0gJycpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgaW5pdGlhbGl6ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGluaXRpYWxpemVyID0gdGhpcy5pbml0aWFsaXplcnMuZ2V0KGtleSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnNldChrZXksIGluaXRpYWxpemVyKVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlQ29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlndXJhdGlvblxuICAgIH1cbiAgICBcbiAgICBjcmVhdGUoZW50aXR5TWFuYWdlciwgY291bnQgPSAxLCBjb25maWd1cmF0aW9uID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICghKGVudGl0eU1hbmFnZXIgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyKSkge1xuICAgICAgICAgICAgcmV0dXJuIFtdXG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgY29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb24gfHwgdGhpcy5jb25maWd1cmF0aW9uXG4gICAgICAgIFxuICAgICAgICBsZXQgY29tcG9uZW50cyA9IFtdXG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBjb21wb25lbnQgb2YgY29uZmlndXJhdGlvbi5rZXlzKCkpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMucHVzaChjb21wb25lbnQpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBlbnRpdGllcyA9IFtdXG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyArK2kpIHtcbiAgICAgICAgICAgIGxldCB7IGlkLCBlbnRpdHkgfSA9IGVudGl0eU1hbmFnZXIubmV3RW50aXR5KGNvbXBvbmVudHMpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChpZCA+PSBlbnRpdHlNYW5hZ2VyLmNhcGFjaXR5KSB7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgW2NvbXBvbmVudCwgaW5pdGlhbGl6ZXJdIG9mIGNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGluaXRpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGluaXRpYWxpemVyLmNhbGwoZW50aXR5W2NvbXBvbmVudF0pXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlbnRpdHlbY29tcG9uZW50XSAhPT0gJ29iamVjdCcgJiYgcmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5W2NvbXBvbmVudF0gPSByZXN1bHRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGVudGl0aWVzLnB1c2goeyBpZCwgZW50aXR5IH0pXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBlbnRpdGllcy5sZW5ndGggPT09IDEgPyBlbnRpdGllc1swXSA6IGVudGl0aWVzXG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBvbmVudE1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBuZXcgTWFwKClcbiAgICB9XG4gICAgXG4gICAgbmV3Q29tcG9uZW50KGtleSkge1xuICAgICAgICBsZXQgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRzLmdldChrZXkpXG4gICAgICAgIFxuICAgICAgICBpZiAoY29tcG9uZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHN3aXRjaCAodHlwZW9mIGNvbXBvbmVudCkge1xuICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgY29tcG9uZW50KClcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCcgIDoge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKGNvbXBvbmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmV0ID0ge31cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGNvbXBvbmVudCkuZm9yRWFjaChrZXkgPT4gcmV0W2tleV0gPSBjb21wb25lbnRba2V5XSlcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXRcbiAgICAgICAgICAgICAgICB9KShjb21wb25lbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckNvbXBvbmVudChrZXksIGNvbXBvbmVudCkge1xuICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgfHwga2V5ID09PSAnJykge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdrZXkgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcuJylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGNvbXBvbmVudCA9PT0gbnVsbCB8fCBjb21wb25lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjb21wb25lbnQgY2Fubm90IGJlIG51bGwgb3IgdW5kZWZpbmVkLicpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuY29tcG9uZW50cy5zZXQoa2V5LCBjb21wb25lbnQpXG5cbiAgICAgICAgcmV0dXJuIGtleVxuICAgIH1cbiAgICBcbiAgICBnZXRDb21wb25lbnRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnRzXG4gICAgfVxufSIsImV4cG9ydCBjb25zdCBTeXN0ZW1UeXBlID0ge1xuICAgIExvZ2ljICA6IDAsXG4gICAgUmVuZGVyIDogMSxcbiAgICBJbml0ICAgOiAyXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN5c3RlbU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmxvZ2ljU3lzdGVtcyAgPSBuZXcgTWFwKClcbiAgICAgICAgdGhpcy5yZW5kZXJTeXN0ZW1zID0gbmV3IE1hcCgpXG4gICAgICAgIHRoaXMuaW5pdFN5c3RlbXMgICA9IG5ldyBNYXAoKVxuICAgIH1cbiAgICBcbiAgICByZWdpc3RlclN5c3RlbShrZXksIHR5cGUsIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyB8fCBrZXkgPT09ICcnKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2tleSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZy4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZSAhPT0gU3lzdGVtVHlwZS5Mb2dpYyAmJiB0eXBlICE9PSBTeXN0ZW1UeXBlLlJlbmRlciAmJiB0eXBlICE9PSBTeXN0ZW1UeXBlLkluaXQpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcigndHlwZSBtdXN0IGJlIGEgdmFsaWQgU3lzdGVtVHlwZS4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29tcG9uZW50cykpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignY29tcG9uZW50cyBhcmd1bWVudCBtdXN0IGJlIGFuIGFycmF5IG9mIGNvbXBvbmVudHMuJylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24uJylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHN5c3RlbSA9IHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMsXG4gICAgICAgICAgICBjYWxsYmFja1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgU3lzdGVtVHlwZS5Mb2dpYyA6IHRoaXMubG9naWNTeXN0ZW1zLnNldChrZXksIHN5c3RlbSk7IGJyZWFrXG4gICAgICAgICAgICBjYXNlIFN5c3RlbVR5cGUuUmVuZGVyIDogdGhpcy5yZW5kZXJTeXN0ZW1zLnNldChrZXksIHN5c3RlbSk7IGJyZWFrXG4gICAgICAgICAgICBjYXNlIFN5c3RlbVR5cGUuSW5pdCA6IHRoaXMuaW5pdFN5c3RlbXMuc2V0KGtleSwgc3lzdGVtKTsgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGtleVxuICAgIH1cbiAgICBcbiAgICByZW1vdmVTeXN0ZW0oa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2ljU3lzdGVtcy5kZWxldGUoa2V5KSB8fCB0aGlzLnJlbmRlclN5c3RlbXMuZGVsZXRlKGtleSkgfHwgdGhpcy5pbml0U3lzdGVtcy5kZWxldGUoa2V5KVxuICAgIH1cbn0iLCJpbXBvcnQgRW50aXR5TWFuYWdlciBmcm9tICcuL2VudGl0eS1tYW5hZ2VyJ1xuXG5jb25zdCBlbXB0eVByb21pc2UgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICByZXNvbHZlKClcbiAgICB9KVxufVxuXG5jb25zdCBwcm9taXNlID0gKGNhbGxiYWNrLCBjb250ZXh0LCBhcmdzLCB0aW1lb3V0KSA9PiB7XG4gICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHlwZW9mIGNvbnRleHQgPT09ICAnb2JqZWN0JyA/IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgLi4uYXJncykgOiBjYWxsYmFjay5hcHBseShjb250ZXh0LCAuLi5hcmdzKSlcbiAgICAgICAgICAgIH0sIHRpbWVvdXQpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIFxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgcmVzb2x2ZSh0eXBlb2YgY29udGV4dCA9PT0gJ29iamVjdCcgPyBjYWxsYmFjay5jYWxsKGNvbnRleHQsIC4uLmFyZ3MpIDogY2FsbGJhY2suYXBwbHkoY29udGV4dCwgLi4uYXJncykpXG4gICAgfSlcbn1cbiAgICBcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50SGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IE1hcCgpXG4gICAgfVxuICAgIFxuICAgIGxpc3RlbihldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKCF0aGlzLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5zZXQoZXZlbnQsIG5ldyBNYXAoKSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGV2ZW50SWQgPSAtMVxuICAgICAgICBcbiAgICAgICAgdGhpcy5ldmVudHMuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudElkID0gTWF0aC5tYXgoZXZlbnRJZCwgLi4uZXZlbnQua2V5cygpKVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICsrZXZlbnRJZFxuICAgICAgICBcbiAgICAgICAgdGhpcy5ldmVudHMuZ2V0KGV2ZW50KS5zZXQoZXZlbnRJZCwgY2FsbGJhY2spXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZXZlbnRJZFxuICAgIH1cbiAgICBcbiAgICBzdG9wTGlzdGVuKGV2ZW50SWQpIHtcbiAgICAgICAgZm9yIChsZXQgZXZlbnRzIG9mIHRoaXMuZXZlbnRzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpZCBvZiBldmVudHMua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlkID09PSBldmVudElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldmVudHMuZGVsZXRlKGV2ZW50SWQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXIoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcyBpbnN0YW5jZW9mIEVudGl0eU1hbmFnZXIgPyB0aGlzLmV2ZW50SGFuZGxlciA6IHRoaXNcbiAgICAgICAgXG4gICAgICAgIGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpXG4gICAgICAgIFxuICAgICAgICBsZXQgWyBldmVudCBdID0gYXJncy5zcGxpY2UoMCwgMSlcbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnQgIT09ICdzdHJpbmcnIHx8ICFzZWxmLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZW1wdHlQcm9taXNlKClcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHByb21pc2VzID0gW11cbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGNhbGxiYWNrIG9mIHNlbGYuZXZlbnRzLmdldChldmVudCkudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2gocHJvbWlzZShjYWxsYmFjaywgdGhpcywgYXJncykpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcylcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlckRlbGF5ZWQoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcyBpbnN0YW5jZW9mIEVudGl0eU1hbmFnZXIgPyB0aGlzLmV2ZW50SGFuZGxlciA6IHRoaXNcbiAgICAgICAgXG4gICAgICAgIGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpXG4gICAgICAgIFxuICAgICAgICBsZXQgWyBldmVudCwgdGltZW91dCBdID0gYXJncy5zcGxpY2UoMCwgMilcbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnQgIT09ICdzdHJpbmcnIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKHRpbWVvdXQpIHx8ICFzZWxmLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZW1wdHlQcm9taXNlKClcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHByb21pc2VzID0gW11cbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGNhbGxiYWNrIG9mIHNlbGYuZXZlbnRzLmdldChldmVudCkudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2gocHJvbWlzZShjYWxsYmFjaywgdGhpcywgYXJncywgdGltZW91dCkpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcylcbiAgICB9XG59IiwiaW1wb3J0IEVudGl0eUZhY3RvcnkgICAgICAgICAgICAgICAgIGZyb20gJy4vZW50aXR5LWZhY3RvcnknXG5pbXBvcnQgQ29tcG9uZW50TWFuYWdlciAgICAgICAgICAgICAgZnJvbSAnLi9jb21wb25lbnQtbWFuYWdlcidcbmltcG9ydCBTeXN0ZW1NYW5hZ2VyLCB7IFN5c3RlbVR5cGUgfSBmcm9tICcuL3N5c3RlbS1tYW5hZ2VyJ1xuaW1wb3J0IEV2ZW50SGFuZGxlciAgICAgICAgICAgICAgICAgIGZyb20gJy4vZXZlbnQtaGFuZGxlcidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5TWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoY2FwYWNpdHkgPSAxMDAwKSB7XG4gICAgICAgIHRoaXMuY2FwYWNpdHkgICAgICAgICA9IGNhcGFjaXR5XG4gICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IC0xXG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkgICAgPSBuZXcgRW50aXR5RmFjdG9yeSgpXG4gICAgICAgIHRoaXMuc3lzdGVtTWFuYWdlciAgICA9IG5ldyBTeXN0ZW1NYW5hZ2VyKClcbiAgICAgICAgdGhpcy5jb21wb25lbnRNYW5hZ2VyID0gbmV3IENvbXBvbmVudE1hbmFnZXIoKVxuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlciAgICAgPSBuZXcgRXZlbnRIYW5kbGVyKClcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXRpZXMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoIDogdGhpcy5jYXBhY2l0eSB9LCAoKSA9PiAoeyBjb21wb25lbnRzOiBbIF0gfSkpXG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0eUNvbmZpZ3VyYXRpb25zID0gbmV3IE1hcCgpXG4gICAgfVxuICAgIFxuICAgIGluY3JlYXNlQ2FwYWNpdHkoKSB7XG4gICAgICAgIGxldCBvbGRDYXBhY2l0eSA9IHRoaXMuY2FwYWNpdHlcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2FwYWNpdHkgKj0gMlxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdGllcyA9IFsuLi50aGlzLmVudGl0aWVzLCAuLi5BcnJheS5mcm9tKHsgbGVuZ3RoIDogb2xkQ2FwYWNpdHkgfSwgKCkgPT4gKHsgY29tcG9uZW50czogWyBdIH0pKV1cblxuICAgICAgICBmb3IgKGxldCBpID0gb2xkQ2FwYWNpdHk7IGkgPCB0aGlzLmNhcGFjaXR5OyArK2kpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbXBvbmVudCBvZiB0aGlzLmNvbXBvbmVudE1hbmFnZXIuZ2V0Q29tcG9uZW50cygpLmtleXMoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW50aXRpZXNbaV1bY29tcG9uZW50XSA9IHRoaXMuY29tcG9uZW50TWFuYWdlci5uZXdDb21wb25lbnQoY29tcG9uZW50KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG5ld0VudGl0eShjb21wb25lbnRzKSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjb21wb25lbnRzKSkge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjb21wb25lbnRzIGFyZ3VtZW50IG11c3QgYmUgYW4gYXJyYXkgb2YgY29tcG9uZW50cy4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgaWQgPSAwXG4gICAgICAgIFxuICAgICAgICBmb3IgKDsgaWQgPCB0aGlzLmNhcGFjaXR5OyArK2lkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tpZF0uY29tcG9uZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoaWQgPj0gdGhpcy5jYXBhY2l0eSkge1xuICAgICAgICAgICAgLy8gdG9kbzogYXV0byBpbmNyZWFzZSBjYXBhY2l0eT9cbiAgICAgICAgICAgIHJldHVybiB7IGlkIDogdGhpcy5jYXBhY2l0eSwgZW50aXR5IDogbnVsbCB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChpZCA+IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWF4RW50aXR5ID0gaWRcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdGllc1tpZF0uY29tcG9uZW50cyA9IGNvbXBvbmVudHNcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB7IGlkLCBlbnRpdHkgOiB0aGlzLmVudGl0aWVzW2lkXSB9XG4gICAgfVxuICAgIFxuICAgIGRlbGV0ZUVudGl0eShpZCkge1xuICAgICAgICB0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzID0gW11cbiAgICAgICAgXG4gICAgICAgIGlmIChpZCA8IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSBpZDsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2ldLmNvbXBvbmVudHMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TWF4RW50aXR5ID0gaVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdXJyZW50TWF4RW50aXR5ID0gMFxuICAgIH1cblxuICAgICpnZXRFbnRpdGllcyhjb21wb25lbnRzID0gbnVsbCkge1xuICAgICAgICBmb3IgKGxldCBpZCA9IDA7IGlkIDw9IHRoaXMuY3VycmVudE1heEVudGl0eTsgKytpZCkge1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudHMgPT09IG51bGwgfHwgY29tcG9uZW50cy5ldmVyeShjb21wb25lbnQgPT4gdGhpcy5lbnRpdGllc1tpZF0uY29tcG9uZW50cy5pbmRleE9mKGNvbXBvbmVudCkgIT09IC0xKSkge1xuICAgICAgICAgICAgICAgIHlpZWxkIHsgaWQsIGVudGl0eSA6IHRoaXMuZW50aXRpZXNbaWRdIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckNvbmZpZ3VyYXRpb24oa2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyB8fCBrZXkgPT09ICcnKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2tleSBtdXN0IGJlIGEgbm9uIGVtcHR5IHN0cmluZy4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0eUNvbmZpZ3VyYXRpb25zLnNldChrZXksIHRoaXMuZW50aXR5RmFjdG9yeS5jcmVhdGVDb25maWd1cmF0aW9uKCkpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4ga2V5XG4gICAgfVxuICAgIFxuICAgIC8vIENvbXBvbmVudCBNYW5hZ2VyXG4gICAgXG4gICAgcmVnaXN0ZXJDb21wb25lbnQoa2V5LCBjb21wb25lbnQpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRNYW5hZ2VyLnJlZ2lzdGVyQ29tcG9uZW50KGtleSwgY29tcG9uZW50KVxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgZW50aXR5IG9mIHRoaXMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgIGVudGl0eVtrZXldID0gdGhpcy5jb21wb25lbnRNYW5hZ2VyLm5ld0NvbXBvbmVudChrZXkpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBpbml0aWFsaXplclxuXG4gICAgICAgIHN3aXRjaCAodHlwZW9mIGNvbXBvbmVudCkge1xuICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOiBpbml0aWFsaXplciA9IGNvbXBvbmVudDsgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6IHtcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMoY29tcG9uZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gY29tcG9uZW50W2tleV1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OiBpbml0aWFsaXplciA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29tcG9uZW50IH07IGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS5yZWdpc3RlckluaXRpYWxpemVyKGtleSwgaW5pdGlhbGl6ZXIpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4ga2V5XG4gICAgfVxuICAgIFxuICAgIGFkZENvbXBvbmVudChpZCwgY29tcG9uZW50S2V5KSB7XG4gICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzLmluZGV4T2YoY29tcG9uZW50S2V5KSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzLnB1c2goY29tcG9uZW50S2V5KVxuICAgIH1cbiAgICBcbiAgICByZW1vdmVDb21wb25lbnQoaWQsIGNvbXBvbmVudCkge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzLmluZGV4T2YoY29tcG9uZW50KVxuICAgICAgICBcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMuc3BsaWNlKGluZGV4LCAxKVxuICAgIH1cbiAgICBcbiAgICAvLyBTeXN0ZW0gTWFuYWdlclxuICAgIFxuICAgIHJlZ2lzdGVyU3lzdGVtKGtleSwgdHlwZSwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbShrZXksIHR5cGUsIGNvbXBvbmVudHMsIGNhbGxiYWNrKVxuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckxvZ2ljU3lzdGVtKGtleSwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbShrZXksIFN5c3RlbVR5cGUuTG9naWMsIGNvbXBvbmVudHMsIGNhbGxiYWNrKVxuICAgIH1cbiAgICBcbiAgICByZWdpc3RlclJlbmRlclN5c3RlbShrZXksIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVnaXN0ZXJTeXN0ZW0oa2V5LCBTeXN0ZW1UeXBlLlJlbmRlciwgY29tcG9uZW50cywgY2FsbGJhY2spXG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVySW5pdFN5c3RlbShrZXksIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVnaXN0ZXJTeXN0ZW0oa2V5LCBTeXN0ZW1UeXBlLkluaXQsIGNvbXBvbmVudHMsIGNhbGxiYWNrKVxuICAgIH1cbiAgICBcbiAgICByZW1vdmVTeXN0ZW0oa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVtb3ZlU3lzdGVtKGtleSlcbiAgICB9XG4gICAgXG4gICAgb25Mb2dpYyhvcHRzKSB7XG4gICAgICAgIGZvciAobGV0IHN5c3RlbSBvZiB0aGlzLnN5c3RlbU1hbmFnZXIubG9naWNTeXN0ZW1zLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBzeXN0ZW0uY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLmdldEVudGl0aWVzKHN5c3RlbS5jb21wb25lbnRzKSwgb3B0cylcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvblJlbmRlcihvcHRzKSB7XG4gICAgICAgIGZvciAobGV0IHN5c3RlbSBvZiB0aGlzLnN5c3RlbU1hbmFnZXIucmVuZGVyU3lzdGVtcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgc3lzdGVtLmNhbGxiYWNrLmNhbGwodGhpcywgdGhpcy5nZXRFbnRpdGllcyhzeXN0ZW0uY29tcG9uZW50cyksIG9wdHMpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkluaXQob3B0cykge1xuICAgICAgICBmb3IgKGxldCBzeXN0ZW0gb2YgdGhpcy5zeXN0ZW1NYW5hZ2VyLmluaXRTeXN0ZW1zLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBzeXN0ZW0uY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLmdldEVudGl0aWVzKHN5c3RlbS5jb21wb25lbnRzKSwgb3B0cylcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBFbnRpdHkgRmFjdG9yeVxuICAgIFxuICAgIHJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS5yZWdpc3RlckluaXRpYWxpemVyKGNvbXBvbmVudElkLCBpbml0aWFsaXplcilcbiAgICB9XG4gICAgXG4gICAgYnVpbGQoKSB7XG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS5idWlsZCgpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBcbiAgICB3aXRoQ29tcG9uZW50KGNvbXBvbmVudElkLCBpbml0aWFsaXplcikge1xuICAgICAgICB0aGlzLmVudGl0eUZhY3Rvcnkud2l0aENvbXBvbmVudChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGUoY291bnQsIGtleSkge1xuICAgICAgICBsZXQgY29uZmlndXJhdGlvbiA9IHVuZGVmaW5lZFxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBjb25maWd1cmF0aW9uID0gdGhpcy5lbnRpdHlDb25maWd1cmF0aW9ucy5nZXQoa2V5KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoY29uZmlndXJhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjb3VsZCBub3QgZmluZCBlbnRpdHkgY29uZmlndXJhdGlvbiBmb3IgdGhlIHN1cHBsaWVkIGtleS4gaWYgeW91IHdpc2ggdG8gY3JlYXRlIGFuIGVudGl0eSB3aXRob3V0IGEgY29uZmlndXJhdGlvbiwgZG8gbm90IHBhc3MgYSBrZXkuJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuZW50aXR5RmFjdG9yeS5jcmVhdGUodGhpcywgY291bnQsIGNvbmZpZ3VyYXRpb24pXG4gICAgfVxuICAgIFxuICAgIC8vIEV2ZW50IEhhbmRsZXJcbiAgICBcbiAgICBsaXN0ZW4oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci5saXN0ZW4oZXZlbnQsIGNhbGxiYWNrKVxuICAgIH1cbiAgICBcbiAgICBzdG9wTGlzdGVuKGV2ZW50SWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLnN0b3BMaXN0ZW4oZXZlbnRJZClcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLnRyaWdnZXIuY2FsbCh0aGlzLCAuLi5hcmd1bWVudHMpXG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXJEZWxheWVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlckRlbGF5ZWQuY2FsbCh0aGlzLCAuLi5hcmd1bWVudHMpXG4gICAgfVxufSJdLCJuYW1lcyI6WyJiYWJlbEhlbHBlcnMudHlwZW9mIl0sIm1hcHBpbmdzIjoiOzs7Ozs7RUFDQSxJQUFJLE9BQU8sR0FBRyxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksT0FBTyxNQUFNLENBQUMsUUFBUSxLQUFLLFFBQVEsR0FBRyxVQUFVLEdBQUcsRUFBRTtBQUNuRyxFQUFBLEVBQUUsT0FBTyxPQUFPLEdBQUcsQ0FBQztBQUNwQixFQUFBLENBQUMsR0FBRyxVQUFVLEdBQUcsRUFBRTtBQUNuQixFQUFBLEVBQUUsT0FBTyxHQUFHLElBQUksT0FBTyxNQUFNLEtBQUssVUFBVSxJQUFJLEdBQUcsQ0FBQyxXQUFXLEtBQUssTUFBTSxHQUFHLFFBQVEsR0FBRyxPQUFPLEdBQUcsQ0FBQztBQUNuRyxFQUFBLENBQUMsQ0FBQzs7QUFFRixBQTJDQSxBQTZCQSxBQUFPLEVBQUEsSUFBSSxjQUFjLEdBQUcsVUFBVSxRQUFRLEVBQUUsV0FBVyxFQUFFO0FBQzdELEVBQUEsRUFBRSxJQUFJLENBQUMsQ0FBQyxRQUFRLFlBQVksV0FBVyxDQUFDLEVBQUU7QUFDMUMsRUFBQSxJQUFJLE1BQU0sSUFBSSxTQUFTLENBQUMsbUNBQW1DLENBQUMsQ0FBQztBQUM3RCxFQUFBLEdBQUc7QUFDSCxFQUFBLENBQUMsQ0FBQzs7QUFFRixBQUFPLEVBQUEsSUFBSSxXQUFXLEdBQUcsWUFBWTtBQUNyQyxFQUFBLEVBQUUsU0FBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0FBQzNDLEVBQUEsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMzQyxFQUFBLE1BQU0sSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FB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