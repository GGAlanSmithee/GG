require('babel-polyfill');

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define('server.js', factory) :
  (factory());
}(this, function () { 'use strict';

  var __commonjs_global = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this;
  function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports, __commonjs_global), module.exports; }


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

  /* global fetch */

  var FileLoader = function () {
      function FileLoader() {
          babelHelpers.classCallCheck(this, FileLoader);
      }

      babelHelpers.createClass(FileLoader, [{
          key: 'get',
          value: function get(path) {
              return fetch(path).then(function (res) {
                  return typeof res === 'string' ? JSON.parse(res) : res;
              }).catch(function (err) {
                  console.warn(err);
              });
          }
      }]);
      return FileLoader;
  }();

  var ConsoleRendererManager = function () {
      function ConsoleRendererManager() {
          babelHelpers.classCallCheck(this, ConsoleRendererManager);
      }

      babelHelpers.createClass(ConsoleRendererManager, [{
          key: 'render',
          value: function render(scene, interpolationPercentage) {
              console.log('node rendering...');
          }
      }]);
      return ConsoleRendererManager;
  }();

  var loopManager = function loopManager() {
    return new MainLoopLoopManager();
  };
  var fileLoader = function fileLoader() {
    return new FileLoader();
  };
  var rendererManager = function rendererManager() {
    return new ConsoleRendererManager();
  };



  var DI = Object.freeze({
    loopManager: loopManager,
    fileLoader: fileLoader,
    rendererManager: rendererManager
  });

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

  var GG = function () {
      function GG(di) {
          babelHelpers.classCallCheck(this, GG);

          this.entityManager = new EntityManager();

          this.di = di;
      }

      babelHelpers.createClass(GG, [{
          key: 'start',
          value: function start() {
              var _this = this;

              var loopManager = this.di.loopManager();
              var rendererManager = this.di.rendererManager();

              this.entityManager.onInit({ rendererManager: rendererManager });

              loopManager.setUpdate(function (delta) {
                  return _this.entityManager.onLogic(delta);
              });

              loopManager.setRender(function (interpolationPercentage) {
                  _this.entityManager.onRender({ delta: interpolationPercentage, rendererManager: rendererManager });
                  rendererManager.render(interpolationPercentage);
              });

              loopManager.start();
          }
      }]);
      return GG;
  }();

  var gemoetry = "cylinder";
  var appearance = {
  	gemoetry: gemoetry
  };

  var x = 10;
  var y = 10;
  var z = 10;
  var transform = {
  	x: x,
  	y: y,
  	z: z
  };

  var x$1 = 20;
  var y$1 = 20;
  var z$1 = 20;
  var velocity = {
  	x: x$1,
  	y: y$1,
  	z: z$1
  };

  var Components = ['appearance'];

  var meshes = (function (entities, _ref) {
      var rendererManager = _ref.rendererManager;

      rendererManager.addMesh('cylinder', 'phong');
  })

  var Components$1 = ['transform', 'velocity'];

  var movement = (function (entities) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
          for (var _iterator = entities[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var entity = _step.value.entity;

              console.log(entity);
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
  })

  var Components$2 = ['transform', 'appearance'];

  var render = (function (entities) {})

  var gg = new GG(DI);

  gg.entityManager.registerComponent('appearance', appearance);

  gg.entityManager.registerComponent('transform', transform);

  gg.entityManager.registerComponent('velocity', velocity);

  gg.entityManager.registerInitSystem('meshes', Components, meshes);

  gg.entityManager.registerLogicSystem('movement', Components$1, movement);

  gg.entityManager.registerRenderSystem('render', Components$2, render);

  gg.start();

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvbWFpbmxvb3AuanMvYnVpbGQvbWFpbmxvb3AubWluLmpzIiwiLi4vc3JjL2xvZ2ljL21haW5sb29wLWxvb3AtbWFuYWdlci5qcyIsIi4uL3NyYy9sb2dpYy9mZXRjaC1maWxlLWxvYWRlci5qcyIsIi4uL3NyYy92aWV3L2NvbnNvbGUtcmVuZGVyZXItbWFuYWdlci5qcyIsIi4uL3NyYy9ESS9ub2RlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL3NyYy9jb3JlL2VudGl0eS1mYWN0b3J5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL3NyYy9jb3JlL2NvbXBvbmVudC1tYW5hZ2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL3NyYy9jb3JlL3N5c3RlbS1tYW5hZ2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL3NyYy9jb3JlL2V2ZW50LWhhbmRsZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2ctZW50aXRpZXMvc3JjL2NvcmUvZW50aXR5LW1hbmFnZXIuanMiLCIuLi9zcmMvZ2cuanMiLCJzcGVjaWFsL2FwcGVhcmFuY2UuanNvbiIsInNwZWNpYWwvdHJhbnNmb3JtLmpzb24iLCJzcGVjaWFsL3ZlbG9jaXR5Lmpzb24iLCJzeXN0ZW1zL2luaXQvbWVzaGVzLmpzIiwic3lzdGVtcy9sb2dpYy9tb3ZlbWVudC5qcyIsInN5c3RlbXMvcmVuZGVyL3JlbmRlci5qcyIsInNlcnZlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIG1haW5sb29wLmpzIDEuMC4zLTIwMTYwMzIwXG4gKlxuICogQGF1dGhvciBJc2FhYyBTdWtpbiAoaHR0cDovL3d3dy5pc2FhY3N1a2luLmNvbS8pXG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuXG4hZnVuY3Rpb24oYSl7ZnVuY3Rpb24gYihhKXtpZih2PW8oYiksIShlK2o+YSkpe2ZvcihkKz1hLWUsZT1hLHIoYSxkKSxhPmcrMWUzJiYoZj0uMjUqaCsuNzUqZixnPWEsaD0wKSxoKyssaT0wO2Q+PWM7KWlmKHMoYyksZC09YywrK2k+PTI0MCl7bT0hMDticmVha310KGQvYyksdShmLG0pLG09ITF9fXZhciBjPTFlMy82MCxkPTAsZT0wLGY9NjAsZz0wLGg9MCxpPTAsaj0wLGs9ITEsbD0hMSxtPSExLG49XCJvYmplY3RcIj09dHlwZW9mIHdpbmRvdz93aW5kb3c6YSxvPW4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHxmdW5jdGlvbigpe3ZhciBhPURhdGUubm93KCksYixkO3JldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gYj1EYXRlLm5vdygpLGQ9TWF0aC5tYXgoMCxjLShiLWEpKSxhPWIrZCxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZShiK2QpfSxkKX19KCkscD1uLmNhbmNlbEFuaW1hdGlvbkZyYW1lfHxjbGVhclRpbWVvdXQscT1mdW5jdGlvbigpe30scj1xLHM9cSx0PXEsdT1xLHY7YS5NYWluTG9vcD17Z2V0U2ltdWxhdGlvblRpbWVzdGVwOmZ1bmN0aW9uKCl7cmV0dXJuIGN9LHNldFNpbXVsYXRpb25UaW1lc3RlcDpmdW5jdGlvbihhKXtyZXR1cm4gYz1hLHRoaXN9LGdldEZQUzpmdW5jdGlvbigpe3JldHVybiBmfSxnZXRNYXhBbGxvd2VkRlBTOmZ1bmN0aW9uKCl7cmV0dXJuIDFlMy9qfSxzZXRNYXhBbGxvd2VkRlBTOmZ1bmN0aW9uKGEpe3JldHVyblwidW5kZWZpbmVkXCI9PXR5cGVvZiBhJiYoYT0xLzApLDA9PT1hP3RoaXMuc3RvcCgpOmo9MWUzL2EsdGhpc30scmVzZXRGcmFtZURlbHRhOmZ1bmN0aW9uKCl7dmFyIGE9ZDtyZXR1cm4gZD0wLGF9LHNldEJlZ2luOmZ1bmN0aW9uKGEpe3JldHVybiByPWF8fHIsdGhpc30sc2V0VXBkYXRlOmZ1bmN0aW9uKGEpe3JldHVybiBzPWF8fHMsdGhpc30sc2V0RHJhdzpmdW5jdGlvbihhKXtyZXR1cm4gdD1hfHx0LHRoaXN9LHNldEVuZDpmdW5jdGlvbihhKXtyZXR1cm4gdT1hfHx1LHRoaXN9LHN0YXJ0OmZ1bmN0aW9uKCl7cmV0dXJuIGx8fChsPSEwLHY9byhmdW5jdGlvbihhKXt0KDEpLGs9ITAsZT1hLGc9YSxoPTAsdj1vKGIpfSkpLHRoaXN9LHN0b3A6ZnVuY3Rpb24oKXtyZXR1cm4gaz0hMSxsPSExLHAodiksdGhpc30saXNSdW5uaW5nOmZ1bmN0aW9uKCl7cmV0dXJuIGt9fSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGEuTWFpbkxvb3ApOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm51bGwhPT1tb2R1bGUmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUuZXhwb3J0cyYmKG1vZHVsZS5leHBvcnRzPWEuTWFpbkxvb3ApfSh0aGlzKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1haW5sb29wLm1pbi5qcy5tYXAiLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgTWFpbkxvb3AgZnJvbSAnbWFpbmxvb3AuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluTG9vcExvb3BNYW5hZ2VyIHtcbiAgICBzZXRVcGRhdGUodXBkYXRlTWV0aG9kIDogKGRlbHRhIDogbnVtYmVyKSA9PiB2b2lkKSA6IE1haW5Mb29wTG9vcE1hbmFnZXIge1xuICAgICAgICBNYWluTG9vcC5zZXRVcGRhdGUodXBkYXRlTWV0aG9kKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICBzZXRSZW5kZXIocmVuZGVyTWV0aG9kIDogKGludGVycG9sYXRpb25QZXJjZW50YWdlIDogbnVtYmVyKSA9PiB2b2lkKSA6IE1haW5Mb29wTG9vcE1hbmFnZXIge1xuICAgICAgICBNYWluTG9vcC5zZXREcmF3KHJlbmRlck1ldGhvZCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgc3RhcnQoKSA6IHZvaWQge1xuICAgICAgICBNYWluTG9vcC5zdGFydCgpO1xuICAgIH1cbn0iLCIvKiBAZmxvdyAqL1xuLyogZ2xvYmFsIGZldGNoICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbGVMb2FkZXIge1xuICAgIGdldChwYXRoKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChwYXRoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiByZXMgPT09ICdzdHJpbmcnID8gSlNPTi5wYXJzZShyZXMpIDogcmVzO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn0iLCIvKiBAZmxvdyAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25zb2xlUmVuZGVyZXJNYW5hZ2VyIHtcbiAgICByZW5kZXIoc2NlbmUsIGludGVycG9sYXRpb25QZXJjZW50YWdlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdub2RlIHJlbmRlcmluZy4uLicpO1xuICAgIH1cbn1cbiIsImltcG9ydCBNYWluTG9vcExvb3BNYW5hZ2VyIGZyb20gJy4uL2xvZ2ljL21haW5sb29wLWxvb3AtbWFuYWdlcic7XG5pbXBvcnQgRmV0Y2hGaWxlTG9hZGVyICAgICBmcm9tICcuLi9sb2dpYy9mZXRjaC1maWxlLWxvYWRlcic7XG5cbmltcG9ydCBDb25zb2xlUmVuZGVyZXJNYW5hZ2VyIGZyb20gJy4uL3ZpZXcvY29uc29sZS1yZW5kZXJlci1tYW5hZ2VyJztcblxuY29uc3QgbG9vcE1hbmFnZXIgICAgID0gKCkgPT4gbmV3IE1haW5Mb29wTG9vcE1hbmFnZXIoKTtcbmNvbnN0IGZpbGVMb2FkZXIgICAgICA9ICgpID0+IG5ldyBGZXRjaEZpbGVMb2FkZXIoKTtcbmNvbnN0IHJlbmRlcmVyTWFuYWdlciA9ICgpID0+IG5ldyBDb25zb2xlUmVuZGVyZXJNYW5hZ2VyKCk7XG5cbmV4cG9ydCB7IGxvb3BNYW5hZ2VyLCBmaWxlTG9hZGVyLCByZW5kZXJlck1hbmFnZXIgfTsiLCJpbXBvcnQgRW50aXR5TWFuYWdlciBmcm9tICcuL2VudGl0eS1tYW5hZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5RmFjdG9yeSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXJzICA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckluaXRpYWxpemVyKGtleSwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnIHx8IGtleSA9PT0gJycpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcigna2V5IG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nLicpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGluaXRpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2luaXRpYWxpemVyIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5pbml0aWFsaXplcnMuc2V0KGtleSwgaW5pdGlhbGl6ZXIpO1xuICAgIH1cbiAgICBcbiAgICBidWlsZCgpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gbmV3IE1hcCgpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIHdpdGhDb21wb25lbnQoa2V5LCBpbml0aWFsaXplcikge1xuICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgfHwga2V5ID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgaW5pdGlhbGl6ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGluaXRpYWxpemVyID0gdGhpcy5pbml0aWFsaXplcnMuZ2V0KGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5zZXQoa2V5LCBpbml0aWFsaXplcik7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlQ29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlndXJhdGlvbjtcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlKGVudGl0eU1hbmFnZXIsIGNvdW50ID0gMSwgY29uZmlndXJhdGlvbiA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIShlbnRpdHlNYW5hZ2VyIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlcikpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbiB8fCB0aGlzLmNvbmZpZ3VyYXRpb247XG4gICAgICAgIFxuICAgICAgICBsZXQgY29tcG9uZW50cyA9IFtdO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY29tcG9uZW50IG9mIGNvbmZpZ3VyYXRpb24ua2V5cygpKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzLnB1c2goY29tcG9uZW50KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGVudGl0aWVzID0gW107XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyArK2kpIHtcbiAgICAgICAgICAgIGxldCB7IGlkLCBlbnRpdHkgfSA9IGVudGl0eU1hbmFnZXIubmV3RW50aXR5KGNvbXBvbmVudHMpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoaWQgPj0gZW50aXR5TWFuYWdlci5jYXBhY2l0eSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBbY29tcG9uZW50LCBpbml0aWFsaXplcl0gb2YgY29uZmlndXJhdGlvbikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5pdGlhbGl6ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGluaXRpYWxpemVyLmNhbGwoZW50aXR5W2NvbXBvbmVudF0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZW50aXR5W2NvbXBvbmVudF0gIT09ICdvYmplY3QnICYmIHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eVtjb21wb25lbnRdID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZW50aXRpZXMucHVzaCh7IGlkLCBlbnRpdHkgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBlbnRpdGllcy5sZW5ndGggPT09IDEgPyBlbnRpdGllc1swXSA6IGVudGl0aWVzO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wb25lbnRNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBcbiAgICBuZXdDb21wb25lbnQoa2V5KSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KGtleSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoY29tcG9uZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IGNvbXBvbmVudCgpO1xuICAgICAgICAgICAgY2FzZSAnb2JqZWN0JyAgOiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgoY29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXQgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGNvbXBvbmVudCkuZm9yRWFjaChrZXkgPT4gcmV0W2tleV0gPSBjb21wb25lbnRba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgICAgIH0pKGNvbXBvbmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJDb21wb25lbnQoa2V5LCBjb21wb25lbnQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnIHx8IGtleSA9PT0gJycpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcigna2V5IG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nLicpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoY29tcG9uZW50ID09PSBudWxsIHx8IGNvbXBvbmVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvbXBvbmVudCBjYW5ub3QgYmUgbnVsbCBvciB1bmRlZmluZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuY29tcG9uZW50cy5zZXQoa2V5LCBjb21wb25lbnQpO1xuXG4gICAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuICAgIFxuICAgIGdldENvbXBvbmVudHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudHM7XG4gICAgfVxufSIsImV4cG9ydCBjb25zdCBTeXN0ZW1UeXBlID0ge1xuICAgIExvZ2ljICA6IDAsXG4gICAgUmVuZGVyIDogMSxcbiAgICBJbml0ICAgOiAyXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTeXN0ZW1NYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5sb2dpY1N5c3RlbXMgID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnJlbmRlclN5c3RlbXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuaW5pdFN5c3RlbXMgICA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJTeXN0ZW0oa2V5LCB0eXBlLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgfHwga2V5ID09PSAnJykge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdrZXkgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcuJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlICE9PSBTeXN0ZW1UeXBlLkxvZ2ljICYmIHR5cGUgIT09IFN5c3RlbVR5cGUuUmVuZGVyICYmIHR5cGUgIT09IFN5c3RlbVR5cGUuSW5pdCkge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCd0eXBlIG11c3QgYmUgYSB2YWxpZCBTeXN0ZW1UeXBlLicpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29tcG9uZW50cykpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignY29tcG9uZW50cyBhcmd1bWVudCBtdXN0IGJlIGFuIGFycmF5IG9mIGNvbXBvbmVudHMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgc3lzdGVtID0ge1xuICAgICAgICAgICAgY29tcG9uZW50cyxcbiAgICAgICAgICAgIGNhbGxiYWNrXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgU3lzdGVtVHlwZS5Mb2dpYyA6IHRoaXMubG9naWNTeXN0ZW1zLnNldChrZXksIHN5c3RlbSk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTeXN0ZW1UeXBlLlJlbmRlciA6IHRoaXMucmVuZGVyU3lzdGVtcy5zZXQoa2V5LCBzeXN0ZW0pOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgU3lzdGVtVHlwZS5Jbml0IDogdGhpcy5pbml0U3lzdGVtcy5zZXQoa2V5LCBzeXN0ZW0pOyBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gICAgXG4gICAgcmVtb3ZlU3lzdGVtKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2dpY1N5c3RlbXMuZGVsZXRlKGtleSkgfHwgdGhpcy5yZW5kZXJTeXN0ZW1zLmRlbGV0ZShrZXkpIHx8IHRoaXMuaW5pdFN5c3RlbXMuZGVsZXRlKGtleSk7XG4gICAgfVxufSIsImltcG9ydCBFbnRpdHlNYW5hZ2VyIGZyb20gJy4vZW50aXR5LW1hbmFnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudEhhbmRsZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgXG4gICAgZW1wdHlQcm9taXNlKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBwcm9taXNlKGNhbGxiYWNrLCBjb250ZXh0LCBhcmdzLCB0aW1lb3V0KSB7XG4gICAgICAgIGlmICh0aW1lb3V0KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHR5cGVvZiBjb250ZXh0ID09PSAgJ29iamVjdCcgPyBjYWxsYmFjay5jYWxsKGNvbnRleHQsIC4uLmFyZ3MpIDogY2FsbGJhY2suYXBwbHkoY29udGV4dCwgLi4uYXJncykpO1xuICAgICAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUodHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnID8gY2FsbGJhY2suY2FsbChjb250ZXh0LCAuLi5hcmdzKSA6IGNhbGxiYWNrLmFwcGx5KGNvbnRleHQsIC4uLmFyZ3MpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIGxpc3RlbihldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICghdGhpcy5ldmVudHMuaGFzKGV2ZW50KSkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMuc2V0KGV2ZW50LCBuZXcgTWFwKCkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgZXZlbnRJZCA9IC0xO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5ldmVudHMuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudElkID0gTWF0aC5tYXgoZXZlbnRJZCwgLi4uZXZlbnQua2V5cygpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICArK2V2ZW50SWQ7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmV2ZW50cy5nZXQoZXZlbnQpLnNldChldmVudElkLCBjYWxsYmFjayk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZXZlbnRJZDtcbiAgICB9XG4gICAgXG4gICAgc3RvcExpc3RlbihldmVudElkKSB7XG4gICAgICAgIGZvciAobGV0IGV2ZW50cyBvZiB0aGlzLmV2ZW50cy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaWQgb2YgZXZlbnRzLmtleXMoKSkge1xuICAgICAgICAgICAgICAgIGlmIChpZCA9PT0gZXZlbnRJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnRzLmRlbGV0ZShldmVudElkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXIoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcyBpbnN0YW5jZW9mIEVudGl0eU1hbmFnZXIgPyB0aGlzLmV2ZW50SGFuZGxlciA6IHRoaXM7XG4gICAgICAgIFxuICAgICAgICBsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBbIGV2ZW50IF0gPSBhcmdzLnNwbGljZSgwLCAxKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnQgIT09ICdzdHJpbmcnIHx8ICFzZWxmLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5lbXB0eVByb21pc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHByb21pc2VzID0gW107XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBjYWxsYmFjayBvZiBzZWxmLmV2ZW50cy5nZXQoZXZlbnQpLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHNlbGYucHJvbWlzZShjYWxsYmFjaywgdGhpcywgYXJncywgMSkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH1cbiAgICBcbiAgICB0cmlnZ2VyRGVsYXllZCgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlciA/IHRoaXMuZXZlbnRIYW5kbGVyIDogdGhpcztcbiAgICAgICAgXG4gICAgICAgIGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xuICAgICAgICBcbiAgICAgICAgbGV0IFsgZXZlbnQsIHRpbWVvdXQgXSA9IGFyZ3Muc3BsaWNlKDAsIDIpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgIU51bWJlci5pc0ludGVnZXIodGltZW91dCkgfHwgIXNlbGYuZXZlbnRzLmhhcyhldmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmVtcHR5UHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGNhbGxiYWNrIG9mIHNlbGYuZXZlbnRzLmdldChldmVudCkudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goc2VsZi5wcm9taXNlKGNhbGxiYWNrLCB0aGlzLCBhcmdzLCB0aW1lb3V0KSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxufSIsImltcG9ydCBFbnRpdHlGYWN0b3J5ICAgICAgICAgICAgICAgICBmcm9tICcuL2VudGl0eS1mYWN0b3J5JztcbmltcG9ydCBDb21wb25lbnRNYW5hZ2VyICAgICAgICAgICAgICBmcm9tICcuL2NvbXBvbmVudC1tYW5hZ2VyJztcbmltcG9ydCBTeXN0ZW1NYW5hZ2VyLCB7IFN5c3RlbVR5cGUgfSBmcm9tICcuL3N5c3RlbS1tYW5hZ2VyJztcbmltcG9ydCBFdmVudEhhbmRsZXIgICAgICAgICAgICAgICAgICBmcm9tICcuL2V2ZW50LWhhbmRsZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRpdHlNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcihjYXBhY2l0eSA9IDEwMDApIHtcbiAgICAgICAgdGhpcy5jYXBhY2l0eSAgICAgICAgID0gY2FwYWNpdHk7XG4gICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IC0xO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5ICAgID0gbmV3IEVudGl0eUZhY3RvcnkoKTtcbiAgICAgICAgdGhpcy5zeXN0ZW1NYW5hZ2VyICAgID0gbmV3IFN5c3RlbU1hbmFnZXIoKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRNYW5hZ2VyID0gbmV3IENvbXBvbmVudE1hbmFnZXIoKTtcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIgICAgID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdGllcyA9IEFycmF5LmZyb20oeyBsZW5ndGggOiB0aGlzLmNhcGFjaXR5IH0sICgpID0+ICh7IGNvbXBvbmVudHM6IFsgXSB9KSk7XG4gICAgfVxuICAgIFxuICAgIGluY3JlYXNlQ2FwYWNpdHkoKSB7XG4gICAgICAgIGxldCBvbGRDYXBhY2l0eSA9IHRoaXMuY2FwYWNpdHk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNhcGFjaXR5ICo9IDI7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0aWVzID0gWy4uLnRoaXMuZW50aXRpZXMsIC4uLkFycmF5LmZyb20oeyBsZW5ndGggOiBvbGRDYXBhY2l0eSB9LCAoKSA9PiAoeyBjb21wb25lbnRzOiBbIF0gfSkpXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gb2xkQ2FwYWNpdHk7IGkgPCB0aGlzLmNhcGFjaXR5OyArK2kpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbXBvbmVudCBvZiB0aGlzLmNvbXBvbmVudE1hbmFnZXIuZ2V0Q29tcG9uZW50cygpLmtleXMoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW50aXRpZXNbaV1bY29tcG9uZW50XSA9IHRoaXMuY29tcG9uZW50TWFuYWdlci5uZXdDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBuZXdFbnRpdHkoY29tcG9uZW50cykge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29tcG9uZW50cykpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignY29tcG9uZW50cyBhcmd1bWVudCBtdXN0IGJlIGFuIGFycmF5IG9mIGNvbXBvbmVudHMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBpZCA9IDA7XG4gICAgICAgIFxuICAgICAgICBmb3IgKDsgaWQgPCB0aGlzLmNhcGFjaXR5OyArK2lkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tpZF0uY29tcG9uZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGlkID49IHRoaXMuY2FwYWNpdHkpIHtcbiAgICAgICAgICAgIC8vIHRvZG86IGF1dG8gaW5jcmVhc2UgY2FwYWNpdHk/XG4gICAgICAgICAgICByZXR1cm4geyBpZCA6IHRoaXMuY2FwYWNpdHksIGVudGl0eSA6IG51bGwgfTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSBpZDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdGllc1tpZF0uY29tcG9uZW50cyA9IGNvbXBvbmVudHM7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4geyBpZCwgZW50aXR5IDogdGhpcy5lbnRpdGllc1tpZF0gfTtcbiAgICB9XG4gICAgXG4gICAgZGVsZXRlRW50aXR5KGlkKSB7XG4gICAgICAgIHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGlmIChpZCA8IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gaWQ7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tpXS5jb21wb25lbnRzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IGk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdXJyZW50TWF4RW50aXR5ID0gMDtcbiAgICB9XG5cbiAgICAqZ2V0RW50aXRpZXMoY29tcG9uZW50cyA9IG51bGwpIHtcbiAgICAgICAgZm9yIChsZXQgaWQgPSAwOyBpZCA8PSB0aGlzLmN1cnJlbnRNYXhFbnRpdHk7ICsraWQpIHtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnRzID09PSBudWxsIHx8IGNvbXBvbmVudHMuZXZlcnkoY29tcG9uZW50ID0+IHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMuaW5kZXhPZihjb21wb25lbnQpICE9PSAtMSkpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCB7IGlkLCBlbnRpdHkgOiB0aGlzLmVudGl0aWVzW2lkXSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIENvbXBvbmVudCBNYW5hZ2VyXG4gICAgXG4gICAgcmVnaXN0ZXJDb21wb25lbnQoa2V5LCBjb21wb25lbnQpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRNYW5hZ2VyLnJlZ2lzdGVyQ29tcG9uZW50KGtleSwgY29tcG9uZW50KTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGVudGl0eSBvZiB0aGlzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICBlbnRpdHlba2V5XSA9IHRoaXMuY29tcG9uZW50TWFuYWdlci5uZXdDb21wb25lbnQoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGluaXRpYWxpemVyO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZW9mIGNvbXBvbmVudCkge1xuICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOiBpbml0aWFsaXplciA9IGNvbXBvbmVudDsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdvYmplY3QnOiB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbGl6ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKGNvbXBvbmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IGNvbXBvbmVudFtrZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDogaW5pdGlhbGl6ZXIgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbXBvbmVudDsgfTsgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS5yZWdpc3RlckluaXRpYWxpemVyKGtleSwgaW5pdGlhbGl6ZXIpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gICAgXG4gICAgYWRkQ29tcG9uZW50KGlkLCBjb21wb25lbnRLZXkpIHtcbiAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMuaW5kZXhPZihjb21wb25lbnRLZXkpICE9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzLnB1c2goY29tcG9uZW50S2V5KTtcbiAgICB9XG4gICAgXG4gICAgcmVtb3ZlQ29tcG9uZW50KGlkLCBjb21wb25lbnQpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5lbnRpdGllc1tpZF0uY29tcG9uZW50cy5pbmRleE9mKGNvbXBvbmVudCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgXG4gICAgLy8gU3lzdGVtIE1hbmFnZXJcbiAgICBcbiAgICByZWdpc3RlclN5c3RlbShrZXksIHR5cGUsIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVnaXN0ZXJTeXN0ZW0oa2V5LCB0eXBlLCBjb21wb25lbnRzLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyTG9naWNTeXN0ZW0oa2V5LCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlZ2lzdGVyU3lzdGVtKGtleSwgU3lzdGVtVHlwZS5Mb2dpYywgY29tcG9uZW50cywgY2FsbGJhY2spO1xuICAgIH1cbiAgICBcbiAgICByZWdpc3RlclJlbmRlclN5c3RlbShrZXksIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVnaXN0ZXJTeXN0ZW0oa2V5LCBTeXN0ZW1UeXBlLlJlbmRlciwgY29tcG9uZW50cywgY2FsbGJhY2spO1xuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckluaXRTeXN0ZW0oa2V5LCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlZ2lzdGVyU3lzdGVtKGtleSwgU3lzdGVtVHlwZS5Jbml0LCBjb21wb25lbnRzLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIFxuICAgIHJlbW92ZVN5c3RlbShrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZW1vdmVTeXN0ZW0oa2V5KTtcbiAgICB9XG4gICAgXG4gICAgb25Mb2dpYyhvcHRzKSB7XG4gICAgICAgIGZvciAobGV0IHN5c3RlbSBvZiB0aGlzLnN5c3RlbU1hbmFnZXIubG9naWNTeXN0ZW1zLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBzeXN0ZW0uY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLmdldEVudGl0aWVzKHN5c3RlbS5jb21wb25lbnRzKSwgb3B0cyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgb25SZW5kZXIob3B0cykge1xuICAgICAgICBmb3IgKGxldCBzeXN0ZW0gb2YgdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlbmRlclN5c3RlbXMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMpLCBvcHRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5pdChvcHRzKSB7XG4gICAgICAgIGZvciAobGV0IHN5c3RlbSBvZiB0aGlzLnN5c3RlbU1hbmFnZXIuaW5pdFN5c3RlbXMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMpLCBvcHRzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBFbnRpdHkgRmFjdG9yeVxuICAgIFxuICAgIHJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS5yZWdpc3RlckluaXRpYWxpemVyKGNvbXBvbmVudElkLCBpbml0aWFsaXplcik7XG4gICAgfVxuICAgIFxuICAgIGJ1aWxkKCkge1xuICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkuYnVpbGQoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICB3aXRoQ29tcG9uZW50KGNvbXBvbmVudElkLCBpbml0aWFsaXplcikge1xuICAgICAgICB0aGlzLmVudGl0eUZhY3Rvcnkud2l0aENvbXBvbmVudChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZUNvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVudGl0eUZhY3RvcnkuY3JlYXRlQ29uZmlndXJhdGlvbigpO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGUoY291bnQsIGNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW50aXR5RmFjdG9yeS5jcmVhdGUodGhpcywgY291bnQsIGNvbmZpZ3VyYXRpb24pO1xuICAgIH1cbiAgICBcbiAgICAvLyBFdmVudCBIYW5kbGVyXG4gICAgXG4gICAgbGlzdGVuKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIubGlzdGVuKGV2ZW50LCBjYWxsYmFjayk7XG4gICAgfVxuICAgIFxuICAgIHN0b3BMaXN0ZW4oZXZlbnRJZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIuc3RvcExpc3RlbihldmVudElkKTtcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLnRyaWdnZXIuY2FsbCh0aGlzLCAuLi5hcmd1bWVudHMpO1xuICAgIH1cbiAgICBcbiAgICB0cmlnZ2VyRGVsYXllZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLnRyaWdnZXJEZWxheWVkLmNhbGwodGhpcywgLi4uYXJndW1lbnRzKTtcbiAgICB9XG59IiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IEVudGl0eU1hbmFnZXIgZnJvbSAnZ2ctZW50aXRpZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHRyB7XG4gICAgY29uc3RydWN0b3IoZGkpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlNYW5hZ2VyID0gbmV3IEVudGl0eU1hbmFnZXIoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZGkgPSBkaTtcbiAgICB9XG4gICAgXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGNvbnN0IGxvb3BNYW5hZ2VyICAgICA9IHRoaXMuZGkubG9vcE1hbmFnZXIoKTtcbiAgICAgICAgY29uc3QgcmVuZGVyZXJNYW5hZ2VyID0gdGhpcy5kaS5yZW5kZXJlck1hbmFnZXIoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXR5TWFuYWdlci5vbkluaXQoeyByZW5kZXJlck1hbmFnZXIgfSk7XG4gICAgICAgIFxuICAgICAgICBsb29wTWFuYWdlci5zZXRVcGRhdGUoZGVsdGEgPT4gdGhpcy5lbnRpdHlNYW5hZ2VyLm9uTG9naWMoZGVsdGEpKTtcbiAgICAgICAgXG4gICAgICAgIGxvb3BNYW5hZ2VyLnNldFJlbmRlcihpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIub25SZW5kZXIoeyBkZWx0YSA6IGludGVycG9sYXRpb25QZXJjZW50YWdlLCByZW5kZXJlck1hbmFnZXIgfSk7XG4gICAgICAgICAgICByZW5kZXJlck1hbmFnZXIucmVuZGVyKGludGVycG9sYXRpb25QZXJjZW50YWdlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBsb29wTWFuYWdlci5zdGFydCgpO1xuICAgIH1cbn1cbi8vIGltcG9ydCB7IEZsYXRTaGFkaW5nIH0gZnJvbSAnLi9jb25zdGFudHMvc2hhZGluZyc7XG5cbi8vIHdpbmRvdy5vbmxvYWQgPSBhc3luYyBmdW5jdGlvbigpIHtcbi8vICAgICBjb25zdCBsZXZlbExvYWRlciAgICAgICA9IERJLmxldmVsTG9hZGVyKCk7XG4vLyAgICAgY29uc3QgbWVzaExvYWRlciAgICAgICAgPSBESS5tZXNoTG9hZGVyKCk7XG4vLyAgICAgY29uc3QgbWVzaE1hbmFnZXIgICAgICAgPSBESS5tZXNoTWFuYWdlcigpO1xuLy8gICAgIGNvbnN0IHNjZW5lTWFuYWdlciAgICAgID0gREkuc2NlbmVNYW5hZ2VyKCk7XG4vLyAgICAgY29uc3QgZW50aXR5TWFuYWdlciAgICAgPSBESS5lbnRpdHlNYW5hZ2VyKCk7XG4vLyAgICAgY29uc3QgcmVuZGVyZXJNYW5hZ2VyICAgPSBESS5yZW5kZXJlck1hbmFnZXIoKTtcbi8vICAgICBjb25zdCBsb29wTWFuYWdlciAgICAgICA9IERJLmxvb3BNYW5hZ2VyKCk7XG4vLyAgICAgY29uc3QgcGVyZm9ybWFuY2VWaWV3ZXIgPSBESS5wZXJmb3JtYW5jZVZpZXdlcigpO1xuICAgIFxuLy8gICAgIGNvbnN0IHNjZW5lSWQgPSBzY2VuZU1hbmFnZXIuY3JlYXRlU2NlbmUoKTtcbiAgICBcbi8vICAgICBjb25zdCBsZXZlbCAgPSBhd2FpdCBsZXZlbExvYWRlci5sb2FkTGV2ZWwoJ2xldmVscy9sZXZlbC1vbmUuanNvbicpO1xuLy8gICAgIGNvbnN0IG1lc2hJZCA9IG1lc2hNYW5hZ2VyLmFkZE1lc2goYXdhaXQgbWVzaExvYWRlci5sb2FkKCdtZXNoZXMvJyArIGxldmVsLm1lc2gsIHsgc2hhZGluZyA6IEZsYXRTaGFkaW5nIH0pKTtcbiAgICBcbi8vICAgICBzY2VuZU1hbmFnZXIuYWRkVG9TY2VuZShzY2VuZUlkLCBtZXNoTWFuYWdlci5nZXRNZXNoKG1lc2hJZCkpO1xuLy8gICAgIHNjZW5lTWFuYWdlci5hZGRBbWJpZW50TGlnaHRUb1NjZW5lKHNjZW5lSWQsIDB4MTAxMDMwKTtcbi8vICBcdHNjZW5lTWFuYWdlci5hZGREaXJlY3Rpb25hbExpZ2h0VG9TY2VuZShzY2VuZUlkLCAweGZmZWVkZCwgMCwgMCwgMSk7XG4gICAgXG4vLyAgICAgdmFyIG1lc2hJc0FkZGVkID0gdHJ1ZTtcbiAgICBcbi8vICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuLy8gICAgICAgICBpZiAobWVzaElzQWRkZWQpIHtcbi8vICAgICAgICAgICAgIHNjZW5lTWFuYWdlci5yZW1vdmVGcm9tU2NlbmUoc2NlbmVJZCwgbWVzaE1hbmFnZXIuZ2V0TWVzaChtZXNoSWQpKTtcbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgIHNjZW5lTWFuYWdlci5hZGRUb1NjZW5lKHNjZW5lSWQsIG1lc2hNYW5hZ2VyLmdldE1lc2gobWVzaElkKSk7XG4vLyAgICAgICAgIH1cbiAgICAgICAgXG4vLyAgICAgICAgIG1lc2hJc0FkZGVkID0gIW1lc2hJc0FkZGVkO1xuLy8gICAgIH0pO1xuICAgIFxuLy8gICAgIHBlcmZvcm1hbmNlVmlld2VyLnNldE1vZGUoMCk7XG4gICAgXG4vLyAgICAgbG9vcE1hbmFnZXIuc2V0VXBkYXRlKGRlbHRhID0+IHtcbi8vICAgICAgICAgICAgICAgICAgICAgbWVzaE1hbmFnZXIuZ2V0TWVzaChtZXNoSWQpLnJvdGF0aW9uLnkgKz0gMC4wMDEgKiBkZWx0YTtcbi8vICAgICAgICAgICAgICAgICAgICAgZW50aXR5TWFuYWdlci5vbkxvZ2ljKGRlbHRhKTtcbi8vICAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAuc2V0UmVuZGVyKGludGVycG9sYXRpb25QZXJjZW50YWdlID0+IHtcbi8vICAgICAgICAgICAgICAgICAgIHBlcmZvcm1hbmNlVmlld2VyLmJlZ2luKCk7XG4gICAgICAgICAgICAgICAgICAgXG4vLyAgICAgICAgICAgICAgICAgICByZW5kZXJlck1hbmFnZXIucmVuZGVyKHNjZW5lTWFuYWdlci5nZXRTY2VuZShzY2VuZUlkKSwgaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UpO1xuICAgICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgICAgICAgcGVyZm9ybWFuY2VWaWV3ZXIuZW5kKCk7XG4vLyAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgIC5zdGFydCgpO1xuLy8gfTsiLCJ7XG4gICAgXCJnZW1vZXRyeVwiIDogXCJjeWxpbmRlclwiXG59Iiwie1xuICAgIFwieFwiOiAxMCxcbiAgICBcInlcIjogMTAsXG4gICAgXCJ6XCI6IDEwXG59Iiwie1xuICAgIFwieFwiOiAyMCxcbiAgICBcInlcIjogMjAsXG4gICAgXCJ6XCI6IDIwXG59IiwiZXhwb3J0IGNvbnN0IENvbXBvbmVudHMgPSBbICdhcHBlYXJhbmNlJyBdO1xuXG5leHBvcnQgZGVmYXVsdCAoZW50aXRpZXMsIHsgcmVuZGVyZXJNYW5hZ2VyIH0pID0+IHtcbiAgICByZW5kZXJlck1hbmFnZXIuYWRkTWVzaCgnY3lsaW5kZXInLCAncGhvbmcnKTtcbn07IiwiZXhwb3J0IGNvbnN0IENvbXBvbmVudHMgPSBbICd0cmFuc2Zvcm0nLCAndmVsb2NpdHknIF07XG5cbmV4cG9ydCBkZWZhdWx0IChlbnRpdGllcykgPT4ge1xuICAgIGZvciAodmFyIHsgZW50aXR5IH0gb2YgZW50aXRpZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2coZW50aXR5KTtcbiAgICB9XG59OyIsImV4cG9ydCBjb25zdCBDb21wb25lbnRzID0gWyAndHJhbnNmb3JtJywgJ2FwcGVhcmFuY2UnIF07XG5cbmV4cG9ydCBkZWZhdWx0IChlbnRpdGllcykgPT4ge1xuXG59OyIsImltcG9ydCAqIGFzIERJIGZyb20gJy4uL3NyYy9ESS9ub2RlJztcblxuaW1wb3J0IEdHIGZyb20gJy4uL3NyYy9nZyc7XG5cbmNvbnN0IGdnID0gbmV3IEdHKERJKTtcblxuaW1wb3J0IGFwcGVhcmFuY2UgZnJvbSAnL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9hcHAvc3BlY2lhbC9hcHBlYXJhbmNlLmpzb24nO1xuZ2cuZW50aXR5TWFuYWdlci5yZWdpc3RlckNvbXBvbmVudCgnYXBwZWFyYW5jZScsIGFwcGVhcmFuY2UpO1xuXG5pbXBvcnQgdHJhbnNmb3JtIGZyb20gJy9ob21lL3VidW50dS93b3Jrc3BhY2UvYXBwL3NwZWNpYWwvdHJhbnNmb3JtLmpzb24nO1xuZ2cuZW50aXR5TWFuYWdlci5yZWdpc3RlckNvbXBvbmVudCgndHJhbnNmb3JtJywgdHJhbnNmb3JtKTtcblxuaW1wb3J0IHZlbG9jaXR5IGZyb20gJy9ob21lL3VidW50dS93b3Jrc3BhY2UvYXBwL3NwZWNpYWwvdmVsb2NpdHkuanNvbic7XG5nZy5lbnRpdHlNYW5hZ2VyLnJlZ2lzdGVyQ29tcG9uZW50KCd2ZWxvY2l0eScsIHZlbG9jaXR5KTtcblxuaW1wb3J0IG1lc2hlcywgeyBDb21wb25lbnRzIGFzIG1lc2hlc0NvbXBvbmVudHMgfSBmcm9tICcvaG9tZS91YnVudHUvd29ya3NwYWNlL2FwcC9zeXN0ZW1zL2luaXQvbWVzaGVzJztcbmdnLmVudGl0eU1hbmFnZXIucmVnaXN0ZXJJbml0U3lzdGVtKCdtZXNoZXMnLCBtZXNoZXNDb21wb25lbnRzLCBtZXNoZXMpO1xuXG5pbXBvcnQgbW92ZW1lbnQsIHsgQ29tcG9uZW50cyBhcyBtb3ZlbWVudENvbXBvbmVudHMgfSBmcm9tICcvaG9tZS91YnVudHUvd29ya3NwYWNlL2FwcC9zeXN0ZW1zL2xvZ2ljL21vdmVtZW50JztcbmdnLmVudGl0eU1hbmFnZXIucmVnaXN0ZXJMb2dpY1N5c3RlbSgnbW92ZW1lbnQnLCBtb3ZlbWVudENvbXBvbmVudHMsIG1vdmVtZW50KTtcblxuaW1wb3J0IHJlbmRlciwgeyBDb21wb25lbnRzIGFzIHJlbmRlckNvbXBvbmVudHMgfSBmcm9tICcvaG9tZS91YnVudHUvd29ya3NwYWNlL2FwcC9zeXN0ZW1zL3JlbmRlci9yZW5kZXInO1xuZ2cuZW50aXR5TWFuYWdlci5yZWdpc3RlclJlbmRlclN5c3RlbSgncmVuZGVyJywgcmVuZGVyQ29tcG9uZW50cywgcmVuZGVyKTtcblxuZ2cuc3RhcnQoKTsiXSwibmFtZXMiOlsidGhpcyIsIkZldGNoRmlsZUxvYWRlciIsIkNvbXBvbmVudHMiLCJtZXNoZXNDb21wb25lbnRzIiwibW92ZW1lbnRDb21wb25lbnRzIiwicmVuZGVyQ29tcG9uZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0EsRUFBQSxHQUFDLFVBQVMsQ0FBVCxFQUFXO0FBQUMsRUFBQSxhQUFTLENBQVQsQ0FBVyxDQUFYLEVBQWE7QUFBQyxFQUFBLFVBQUcsSUFBRSxFQUFFLENBQUYsQ0FBRixFQUFPLEVBQUUsSUFBRSxDQUFGLEdBQUksQ0FBSixDQUFGLEVBQVM7QUFBQyxFQUFBLGFBQUksS0FBRyxJQUFFLENBQUYsRUFBSSxJQUFFLENBQUYsRUFBSSxFQUFFLENBQUYsRUFBSSxDQUFKLENBQVgsRUFBa0IsSUFBRSxJQUFFLEdBQUYsS0FBUSxJQUFFLE1BQUksQ0FBSixHQUFNLE1BQUksQ0FBSixFQUFNLElBQUUsQ0FBRixFQUFJLElBQUUsQ0FBRixDQUE1QixFQUFpQyxHQUFuRCxFQUF1RCxJQUFFLENBQUYsRUFBSSxLQUFHLENBQUg7QUFBTSxFQUFBLGNBQUcsRUFBRSxDQUFGLEdBQUssS0FBRyxDQUFILEVBQUssRUFBRSxDQUFGLElBQUssR0FBTCxFQUFTO0FBQUMsRUFBQSxnQkFBRSxDQUFDLENBQUQsQ0FBSDthQUF0QjtXQUFyRSxDQUF1RyxDQUFFLElBQUUs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