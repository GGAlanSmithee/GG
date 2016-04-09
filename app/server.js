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
          value: function onLogic(delta, opts) {
              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                  for (var _iterator3 = this.systemManager.logicSystems.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                      var system = _step3.value;

                      system.callback.call(this, this.getEntities(system.components, system.selector), delta, opts);
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
          value: function onRender(delta, opts) {
              var _iteratorNormalCompletion4 = true;
              var _didIteratorError4 = false;
              var _iteratorError4 = undefined;

              try {
                  for (var _iterator4 = this.systemManager.renderSystems.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                      var system = _step4.value;

                      system.callback.call(this, this.getEntities(system.components, system.selector), delta, opts);
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

              // const fileLoader = DI.fileLoader();

              // fileLoader.get(path).then(res => {
              //     console.log(res);
              // });

              var loopManager = this.di.loopManager();
              var rendererManager = this.di.rendererManager();

              loopManager.setUpdate(function (delta) {
                  return _this.entityManager.onLogic(delta);
              });

              loopManager.setRender(function (interpolationPercentage) {
                  return _this.entityManager.onRender(interpolationPercentage, { rendererManager: rendererManager });
              });

              loopManager.start();
          }
      }]);
      return GG;
  }();

  var name = "Jesper";
  var age = 30;
  var test = {
  	name: name,
  	age: age
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

  var Selector = SelectorType.GetWith;

  var movement = (function (entities) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
          for (var _iterator = entities[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var entity = _step.value;

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

  var Selector$1 = SelectorType.Get;

  var render = (function (entities, delta, opts) {
      console.log(Selector$1, opts);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
          for (var _iterator = entities[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var entity = _step.value;

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

  var gg = new GG(DI);

  gg.entityManager.registerComponent(test);

  gg.entityManager.registerComponent(transform);

  gg.entityManager.registerComponent(velocity);

  gg.entityManager.registerLogicSystem(Selector, 0, movement);

  gg.entityManager.registerRenderSystem(Selector$1, 0, render);

  gg.start();

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvbWFpbmxvb3AuanMvYnVpbGQvbWFpbmxvb3AubWluLmpzIiwiLi4vc3JjL2xvZ2ljL21haW5sb29wLWxvb3AtbWFuYWdlci5qcyIsIi4uL3NyYy9sb2dpYy9mZXRjaC1maWxlLWxvYWRlci5qcyIsIi4uL3NyYy92aWV3L2NvbnNvbGUtcmVuZGVyZXItbWFuYWdlci5qcyIsIi4uL3NyYy9ESS9ub2RlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL3NyYy9jb3JlL2NvbXBvbmVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9zeXN0ZW0uanMiLCIuLi9ub2RlX21vZHVsZXMvZ2ctZW50aXRpZXMvc3JjL2NvcmUvZXZlbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2ctZW50aXRpZXMvc3JjL2NvcmUvZW50aXR5LmpzIiwiLi4vc3JjL2dnLmpzIiwic3BlY2lhbC90ZXN0Lmpzb24iLCJzcGVjaWFsL3RyYW5zZm9ybS5qc29uIiwic3BlY2lhbC92ZWxvY2l0eS5qc29uIiwic3lzdGVtcy9sb2dpYy9tb3ZlbWVudC5qcyIsInN5c3RlbXMvcmVuZGVyL3JlbmRlci5qcyIsInNlcnZlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIG1haW5sb29wLmpzIDEuMC4zLTIwMTYwMzIwXG4gKlxuICogQGF1dGhvciBJc2FhYyBTdWtpbiAoaHR0cDovL3d3dy5pc2FhY3N1a2luLmNvbS8pXG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuXG4hZnVuY3Rpb24oYSl7ZnVuY3Rpb24gYihhKXtpZih2PW8oYiksIShlK2o+YSkpe2ZvcihkKz1hLWUsZT1hLHIoYSxkKSxhPmcrMWUzJiYoZj0uMjUqaCsuNzUqZixnPWEsaD0wKSxoKyssaT0wO2Q+PWM7KWlmKHMoYyksZC09YywrK2k+PTI0MCl7bT0hMDticmVha310KGQvYyksdShmLG0pLG09ITF9fXZhciBjPTFlMy82MCxkPTAsZT0wLGY9NjAsZz0wLGg9MCxpPTAsaj0wLGs9ITEsbD0hMSxtPSExLG49XCJvYmplY3RcIj09dHlwZW9mIHdpbmRvdz93aW5kb3c6YSxvPW4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHxmdW5jdGlvbigpe3ZhciBhPURhdGUubm93KCksYixkO3JldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gYj1EYXRlLm5vdygpLGQ9TWF0aC5tYXgoMCxjLShiLWEpKSxhPWIrZCxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZShiK2QpfSxkKX19KCkscD1uLmNhbmNlbEFuaW1hdGlvbkZyYW1lfHxjbGVhclRpbWVvdXQscT1mdW5jdGlvbigpe30scj1xLHM9cSx0PXEsdT1xLHY7YS5NYWluTG9vcD17Z2V0U2ltdWxhdGlvblRpbWVzdGVwOmZ1bmN0aW9uKCl7cmV0dXJuIGN9LHNldFNpbXVsYXRpb25UaW1lc3RlcDpmdW5jdGlvbihhKXtyZXR1cm4gYz1hLHRoaXN9LGdldEZQUzpmdW5jdGlvbigpe3JldHVybiBmfSxnZXRNYXhBbGxvd2VkRlBTOmZ1bmN0aW9uKCl7cmV0dXJuIDFlMy9qfSxzZXRNYXhBbGxvd2VkRlBTOmZ1bmN0aW9uKGEpe3JldHVyblwidW5kZWZpbmVkXCI9PXR5cGVvZiBhJiYoYT0xLzApLDA9PT1hP3RoaXMuc3RvcCgpOmo9MWUzL2EsdGhpc30scmVzZXRGcmFtZURlbHRhOmZ1bmN0aW9uKCl7dmFyIGE9ZDtyZXR1cm4gZD0wLGF9LHNldEJlZ2luOmZ1bmN0aW9uKGEpe3JldHVybiByPWF8fHIsdGhpc30sc2V0VXBkYXRlOmZ1bmN0aW9uKGEpe3JldHVybiBzPWF8fHMsdGhpc30sc2V0RHJhdzpmdW5jdGlvbihhKXtyZXR1cm4gdD1hfHx0LHRoaXN9LHNldEVuZDpmdW5jdGlvbihhKXtyZXR1cm4gdT1hfHx1LHRoaXN9LHN0YXJ0OmZ1bmN0aW9uKCl7cmV0dXJuIGx8fChsPSEwLHY9byhmdW5jdGlvbihhKXt0KDEpLGs9ITAsZT1hLGc9YSxoPTAsdj1vKGIpfSkpLHRoaXN9LHN0b3A6ZnVuY3Rpb24oKXtyZXR1cm4gaz0hMSxsPSExLHAodiksdGhpc30saXNSdW5uaW5nOmZ1bmN0aW9uKCl7cmV0dXJuIGt9fSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGEuTWFpbkxvb3ApOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm51bGwhPT1tb2R1bGUmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUuZXhwb3J0cyYmKG1vZHVsZS5leHBvcnRzPWEuTWFpbkxvb3ApfSh0aGlzKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1haW5sb29wLm1pbi5qcy5tYXAiLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgTWFpbkxvb3AgZnJvbSAnbWFpbmxvb3AuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluTG9vcExvb3BNYW5hZ2VyIHtcbiAgICBzZXRVcGRhdGUodXBkYXRlTWV0aG9kIDogKGRlbHRhIDogbnVtYmVyKSA9PiB2b2lkKSA6IE1haW5Mb29wTG9vcE1hbmFnZXIge1xuICAgICAgICBNYWluTG9vcC5zZXRVcGRhdGUodXBkYXRlTWV0aG9kKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICBzZXRSZW5kZXIocmVuZGVyTWV0aG9kIDogKGludGVycG9sYXRpb25QZXJjZW50YWdlIDogbnVtYmVyKSA9PiB2b2lkKSA6IE1haW5Mb29wTG9vcE1hbmFnZXIge1xuICAgICAgICBNYWluTG9vcC5zZXREcmF3KHJlbmRlck1ldGhvZCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgc3RhcnQoKSA6IHZvaWQge1xuICAgICAgICBNYWluTG9vcC5zdGFydCgpO1xuICAgIH1cbn0iLCIvKiBAZmxvdyAqL1xuLyogZ2xvYmFsIGZldGNoICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbGVMb2FkZXIge1xuICAgIGdldChwYXRoKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChwYXRoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiByZXMgPT09ICdzdHJpbmcnID8gSlNPTi5wYXJzZShyZXMpIDogcmVzO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn0iLCIvKiBAZmxvdyAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25zb2xlUmVuZGVyZXJNYW5hZ2VyIHtcbiAgICByZW5kZXIoc2NlbmUsIGludGVycG9sYXRpb25QZXJjZW50YWdlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdub2RlIHJlbmRlcmluZy4uLicpO1xuICAgIH1cbn1cbiIsImltcG9ydCBNYWluTG9vcExvb3BNYW5hZ2VyIGZyb20gJy4uL2xvZ2ljL21haW5sb29wLWxvb3AtbWFuYWdlcic7XG5pbXBvcnQgRmV0Y2hGaWxlTG9hZGVyICAgICBmcm9tICcuLi9sb2dpYy9mZXRjaC1maWxlLWxvYWRlcic7XG5cbmltcG9ydCBDb25zb2xlUmVuZGVyZXJNYW5hZ2VyIGZyb20gJy4uL3ZpZXcvY29uc29sZS1yZW5kZXJlci1tYW5hZ2VyJztcblxuY29uc3QgbG9vcE1hbmFnZXIgICAgID0gKCkgPT4gbmV3IE1haW5Mb29wTG9vcE1hbmFnZXIoKTtcbmNvbnN0IGZpbGVMb2FkZXIgICAgICA9ICgpID0+IG5ldyBGZXRjaEZpbGVMb2FkZXIoKTtcbmNvbnN0IHJlbmRlcmVyTWFuYWdlciA9ICgpID0+IG5ldyBDb25zb2xlUmVuZGVyZXJNYW5hZ2VyKCk7XG5cbmV4cG9ydCB7IGxvb3BNYW5hZ2VyLCBmaWxlTG9hZGVyLCByZW5kZXJlck1hbmFnZXIgfTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wb25lbnRNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBcbiAgICBuZXdDb21wb25lbnQoY29tcG9uZW50SWQpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50cy5nZXQoY29tcG9uZW50SWQpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGNvbXBvbmVudCA9PT0gbnVsbCB8fCBjb21wb25lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHN3aXRjaCAodHlwZW9mIGNvbXBvbmVudCkge1xuICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOiByZXR1cm4gbmV3IGNvbXBvbmVudCgpO1xuICAgICAgICAgICAgY2FzZSAnb2JqZWN0JyAgOiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgoY29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXQgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGNvbXBvbmVudCkuZm9yRWFjaChrZXkgPT4gcmV0W2tleV0gPSBjb21wb25lbnRba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgICAgIH0pKGNvbXBvbmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCkge1xuICAgICAgICBpZiAoY29tcG9uZW50ID09PSBudWxsIHx8IGNvbXBvbmVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvbXBvbmVudCBjYW5ub3QgYmUgbnVsbC4nKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IG1heCA9IE1hdGgubWF4KC4uLnRoaXMuY29tcG9uZW50cy5rZXlzKCkpO1xuICAgICAgICBcbiAgICAgICAgbGV0IGlkID0gbWF4ID09PSB1bmRlZmluZWQgfHwgbWF4ID09PSBudWxsIHx8IG1heCA9PT0gLUluZmluaXR5ID8gMSA6IG1heCA9PT0gMCA/IDEgOiBtYXggKiAyO1xuXG4gICAgICAgIHRoaXMuY29tcG9uZW50cy5zZXQoaWQsIGNvbXBvbmVudCk7XG5cbiAgICAgICAgcmV0dXJuIGlkO1xuICAgIH1cbiAgICBcbiAgICBnZXRDb21wb25lbnRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnRzO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBTZWxlY3RvclR5cGUgfSBmcm9tICcuL2VudGl0eSc7XG5cbmV4cG9ydCBjb25zdCBTeXN0ZW1UeXBlID0ge1xuICAgIExvZ2ljICAgOiAwLFxuICAgIFJlbmRlciAgOiAxXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTeXN0ZW1NYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5sb2dpY1N5c3RlbXMgID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnJlbmRlclN5c3RlbXMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyU3lzdGVtKHR5cGUsIHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAodHlwZSAhPT0gU3lzdGVtVHlwZS5Mb2dpYyAmJiB0eXBlICE9PSBTeXN0ZW1UeXBlLlJlbmRlcikge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCd0eXBlIG11c3QgYmUgYSB2YWxpZCBTeXN0ZW1UeXBlLicpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmIChzZWxlY3RvciAhPT0gU2VsZWN0b3JUeXBlLkdldCAmJiBzZWxlY3RvciAhPT0gU2VsZWN0b3JUeXBlLkdldFdpdGggJiZcbiAgICAgICAgICAgIHNlbGVjdG9yICE9PSBTZWxlY3RvclR5cGUuR2V0V2l0aE9ubHkgJiYgc2VsZWN0b3IgIT09IFNlbGVjdG9yVHlwZS5HZXRXaXRob3V0KSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ3NlbGVjdG9yIG11c3QgYmUgYSB2YWxpZCBTZWxlY3RvclR5cGUuJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50cyAhPT0gJ251bWJlcicpICB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvbXBvbmVudHMgbXVzdCBiZSBhIG51bWJlci4nKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBzeXN0ZW0gPSB7XG4gICAgICAgIHNlbGVjdG9yLFxuICAgICAgICBjb21wb25lbnRzLFxuICAgICAgICBjYWxsYmFja1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgbGV0IHN5c3RlbUlkID0gTWF0aC5tYXgoMCwgLi4udGhpcy5sb2dpY1N5c3RlbXMua2V5cygpLCAuLi50aGlzLnJlbmRlclN5c3RlbXMua2V5cygpKSArIDE7XG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgU3lzdGVtVHlwZS5Mb2dpYyA6IHRoaXMubG9naWNTeXN0ZW1zLnNldChzeXN0ZW1JZCwgc3lzdGVtKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFN5c3RlbVR5cGUuUmVuZGVyIDogdGhpcy5yZW5kZXJTeXN0ZW1zLnNldChzeXN0ZW1JZCwgc3lzdGVtKTsgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBzeXN0ZW1JZDtcbiAgICB9XG4gICAgXG4gICAgcmVtb3ZlU3lzdGVtKHN5c3RlbUlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2ljU3lzdGVtcy5kZWxldGUoc3lzdGVtSWQpIHx8IHRoaXMucmVuZGVyU3lzdGVtcy5kZWxldGUoc3lzdGVtSWQpO1xuICAgIH1cbn0iLCJpbXBvcnQgRW50aXR5TWFuYWdlciBmcm9tICcuL2VudGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50SGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBcbiAgICBlbXB0eVByb21pc2UoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHByb21pc2UoY2FsbGJhY2ssIGNvbnRleHQsIGFyZ3MsIHRpbWVvdXQpIHtcbiAgICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHlwZW9mIGNvbnRleHQgPT09ICAnb2JqZWN0JyA/IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgLi4uYXJncykgOiBjYWxsYmFjay5hcHBseShjb250ZXh0LCAuLi5hcmdzKSk7XG4gICAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh0eXBlb2YgY29udGV4dCA9PT0gJ29iamVjdCcgPyBjYWxsYmFjay5jYWxsKGNvbnRleHQsIC4uLmFyZ3MpIDogY2FsbGJhY2suYXBwbHkoY29udGV4dCwgLi4uYXJncykpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgbGlzdGVuKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKCF0aGlzLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5zZXQoZXZlbnQsIG5ldyBNYXAoKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBldmVudElkID0gLTE7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50SWQgPSBNYXRoLm1heChldmVudElkLCAuLi5ldmVudC5rZXlzKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICsrZXZlbnRJZDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZXZlbnRzLmdldChldmVudCkuc2V0KGV2ZW50SWQsIGNhbGxiYWNrKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBldmVudElkO1xuICAgIH1cbiAgICBcbiAgICBzdG9wTGlzdGVuKGV2ZW50SWQpIHtcbiAgICAgICAgZm9yIChsZXQgZXZlbnRzIG9mIHRoaXMuZXZlbnRzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpZCBvZiBldmVudHMua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlkID09PSBldmVudElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldmVudHMuZGVsZXRlKGV2ZW50SWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlcigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlciA/IHRoaXMuZXZlbnRIYW5kbGVyIDogdGhpcztcbiAgICAgICAgXG4gICAgICAgIGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xuICAgICAgICBcbiAgICAgICAgbGV0IFsgZXZlbnQgXSA9IGFyZ3Muc3BsaWNlKDAsIDEpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgIXNlbGYuZXZlbnRzLmhhcyhldmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmVtcHR5UHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGNhbGxiYWNrIG9mIHNlbGYuZXZlbnRzLmdldChldmVudCkudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goc2VsZi5wcm9taXNlKGNhbGxiYWNrLCB0aGlzLCBhcmdzLCAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXJEZWxheWVkKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXMgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyID8gdGhpcy5ldmVudEhhbmRsZXIgOiB0aGlzO1xuICAgICAgICBcbiAgICAgICAgbGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG4gICAgICAgIFxuICAgICAgICBsZXQgWyBldmVudCwgdGltZW91dCBdID0gYXJncy5zcGxpY2UoMCwgMik7XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCAhTnVtYmVyLmlzSW50ZWdlcih0aW1lb3V0KSB8fCAhc2VsZi5ldmVudHMuaGFzKGV2ZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuZW1wdHlQcm9taXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY2FsbGJhY2sgb2Ygc2VsZi5ldmVudHMuZ2V0KGV2ZW50KS52YWx1ZXMoKSkge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChzZWxmLnByb21pc2UoY2FsbGJhY2ssIHRoaXMsIGFyZ3MsIHRpbWVvdXQpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9XG59IiwiaW1wb3J0IENvbXBvbmVudE1hbmFnZXIgICAgICAgICAgICAgIGZyb20gJy4vY29tcG9uZW50JztcbmltcG9ydCBTeXN0ZW1NYW5hZ2VyLCB7IFN5c3RlbVR5cGUgfSBmcm9tICcuL3N5c3RlbSc7XG5pbXBvcnQgRXZlbnRIYW5kbGVyICAgICAgICAgICAgICAgICAgZnJvbSAnLi9ldmVudCc7XG5cbmV4cG9ydCBjb25zdCBTZWxlY3RvclR5cGUgPSB7XG4gICAgR2V0ICAgICAgICAgOiAwLFxuICAgIEdldFdpdGggICAgIDogMSxcbiAgICBHZXRXaXRoT25seSA6IDIsXG4gICAgR2V0V2l0aG91dCAgOiAzXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRpdHlNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcihjYXBhY2l0eSA9IDEwMDApIHtcbiAgICAgICAgdGhpcy5jYXBhY2l0eSAgICAgICAgID0gY2FwYWNpdHk7XG4gICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IC0xO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5ICAgID0gbmV3IEVudGl0eUZhY3RvcnkoKTtcbiAgICAgICAgdGhpcy5zeXN0ZW1NYW5hZ2VyICAgID0gbmV3IFN5c3RlbU1hbmFnZXIoKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRNYW5hZ2VyID0gbmV3IENvbXBvbmVudE1hbmFnZXIoKTtcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIgICAgID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdGllcyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IHRoaXMuY2FwYWNpdHkgfSwgKCkgPT4geyByZXR1cm4gMDsgfSApO1xuICAgIH1cbiAgICBcbiAgICBpbmNyZWFzZUNhcGFjaXR5KCkge1xuICAgICAgICBsZXQgb2xkQ2FwYWNpdHkgPSB0aGlzLmNhcGFjaXR5O1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jYXBhY2l0eSAqPSAyO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IG9sZENhcGFjaXR5OyBpIDwgdGhpcy5jYXBhY2l0eTsgKytpKSB7XG4gICAgICAgICAgICB0aGlzLmVudGl0aWVzW2ldID0gMDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY29tcG9uZW50SWQgb2YgdGhpcy5jb21wb25lbnRNYW5hZ2VyLmdldENvbXBvbmVudHMoKS5rZXlzKCkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBvbGRDYXBhY2l0eTsgaSA8IHRoaXMuY2FwYWNpdHk7ICsraSkge1xuICAgICAgICAgICAgICAgIHRoaXNbY29tcG9uZW50SWRdLnB1c2godGhpcy5jb21wb25lbnRNYW5hZ2VyLm5ld0NvbXBvbmVudChjb21wb25lbnRJZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG5ld0VudGl0eShjb21wb25lbnRzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50cyAhPT0gJ251bWJlcicgfHwgY29tcG9uZW50cyA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXBhY2l0eTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGVudGl0eUlkID0gMDtcbiAgICAgICAgXG4gICAgICAgIGZvciAoOyBlbnRpdHlJZCA8IHRoaXMuY2FwYWNpdHk7ICsrZW50aXR5SWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2VudGl0eUlkXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoZW50aXR5SWQgPj0gdGhpcy5jYXBhY2l0eSkge1xuICAgICAgICAgICAgLy8gdG9kbzogYXV0byBpbmNyZWFzZSBjYXBhY2l0eT9cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhcGFjaXR5O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoZW50aXR5SWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IGVudGl0eUlkO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eUlkXSA9IGNvbXBvbmVudHM7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZW50aXR5SWQ7XG4gICAgfVxuICAgIFxuICAgIGRlbGV0ZUVudGl0eShlbnRpdHlJZCkge1xuICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eUlkXSA9IDA7XG4gICAgICAgIFxuICAgICAgICBpZiAoZW50aXR5SWQgPCB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IGVudGl0eUlkOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbaV0gIT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSBpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAqZ2V0RW50aXRpZXMoY29tcG9uZW50cyA9IDAsIHR5cGUgPSBTZWxlY3RvclR5cGUuR2V0V2l0aCkge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgU2VsZWN0b3JUeXBlLkdldFdpdGg6IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRpdHlJZCBpbiB0aGlzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdHlJZCA+IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gIT09IDAgJiYgKHRoaXMuZW50aXRpZXNbZW50aXR5SWRdICYgY29tcG9uZW50cykgPT09IGNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIE1hdGguZmxvb3IoZW50aXR5SWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBTZWxlY3RvclR5cGUuR2V0V2l0aE9ubHk6IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRpdHlJZCBpbiB0aGlzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdHlJZCA+IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gIT09IDAgJiYgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gPT09IGNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIE1hdGguZmxvb3IoZW50aXR5SWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBTZWxlY3RvclR5cGUuR2V0V2l0aG91dDoge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGVudGl0eUlkIGluIHRoaXMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0eUlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2VudGl0eUlkXSAhPT0gMCAmJiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gJiBjb21wb25lbnRzKSAhPT0gY29tcG9uZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgeWllbGQgTWF0aC5mbG9vcihlbnRpdHlJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFNlbGVjdG9yVHlwZS5HZXQ6IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRpdHlJZCBpbiB0aGlzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdHlJZCA+IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB5aWVsZCBNYXRoLmZsb29yKGVudGl0eUlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDb21wb25lbnQgTWFuYWdlclxuICAgIFxuICAgIHJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCkge1xuICAgICAgICBsZXQgY29tcG9uZW50SWQgPSB0aGlzLmNvbXBvbmVudE1hbmFnZXIucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXNbY29tcG9uZW50SWRdID0gW107XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2FwYWNpdHk7ICsraSkge1xuICAgICAgICAgICAgdGhpc1tjb21wb25lbnRJZF0ucHVzaCh0aGlzLmNvbXBvbmVudE1hbmFnZXIubmV3Q29tcG9uZW50KGNvbXBvbmVudElkKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBpbml0aWFsaXplcjtcblxuICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzogaW5pdGlhbGl6ZXIgPSBjb21wb25lbnQ7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnb2JqZWN0Jzoge1xuICAgICAgICAgICAgICAgIGluaXRpYWxpemVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhjb21wb25lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBjb21wb25lbnRba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6IGluaXRpYWxpemVyID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb21wb25lbnQ7IH07IGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkucmVnaXN0ZXJJbml0aWFsaXplcihjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudElkO1xuICAgIH1cbiAgICBcbiAgICBhZGRDb21wb25lbnQoZW50aXR5SWQsIGNvbXBvbmVudElkKSB7XG4gICAgICAgIHRoaXMuZW50aXRpZXNbZW50aXR5SWRdIHw9IGNvbXBvbmVudElkO1xuICAgIH1cbiAgICBcbiAgICByZW1vdmVDb21wb25lbnQoZW50aXR5SWQsIGNvbXBvbmVudElkKSB7XG4gICAgICAgIHRoaXMuZW50aXRpZXNbZW50aXR5SWRdICY9IH5jb21wb25lbnRJZDtcbiAgICB9XG4gICAgXG4gICAgLy8gU3lzdGVtIE1hbmFnZXJcbiAgICBcbiAgICByZWdpc3RlclN5c3RlbSh0eXBlLCBzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbSh0eXBlLCBzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spO1xuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckxvZ2ljU3lzdGVtKHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlZ2lzdGVyU3lzdGVtKFN5c3RlbVR5cGUuTG9naWMsIHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyUmVuZGVyU3lzdGVtKHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlZ2lzdGVyU3lzdGVtKFN5c3RlbVR5cGUuUmVuZGVyLCBzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spO1xuICAgIH1cbiAgICBcbiAgICByZW1vdmVTeXN0ZW0oc3lzdGVtSWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZW1vdmVTeXN0ZW0oc3lzdGVtSWQpO1xuICAgIH1cbiAgICBcbiAgICBvbkxvZ2ljKGRlbHRhLCBvcHRzKSB7XG4gICAgICAgIGZvciAobGV0IHN5c3RlbSBvZiB0aGlzLnN5c3RlbU1hbmFnZXIubG9naWNTeXN0ZW1zLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBzeXN0ZW0uY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLmdldEVudGl0aWVzKHN5c3RlbS5jb21wb25lbnRzLCBzeXN0ZW0uc2VsZWN0b3IpLCBkZWx0YSwgb3B0cyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgb25SZW5kZXIoZGVsdGEsIG9wdHMpIHtcbiAgICAgICAgZm9yIChsZXQgc3lzdGVtIG9mIHRoaXMuc3lzdGVtTWFuYWdlci5yZW5kZXJTeXN0ZW1zLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBzeXN0ZW0uY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLmdldEVudGl0aWVzKHN5c3RlbS5jb21wb25lbnRzLCBzeXN0ZW0uc2VsZWN0b3IpLCBkZWx0YSwgb3B0cyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBFbnRpdHkgRmFjdG9yeVxuICAgIFxuICAgIHJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS5yZWdpc3RlckluaXRpYWxpemVyKGNvbXBvbmVudElkLCBpbml0aWFsaXplcik7XG4gICAgfVxuICAgIFxuICAgIGJ1aWxkKCkge1xuICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkuYnVpbGQoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICB3aXRoQ29tcG9uZW50KGNvbXBvbmVudElkLCBpbml0aWFsaXplcikge1xuICAgICAgICB0aGlzLmVudGl0eUZhY3Rvcnkud2l0aENvbXBvbmVudChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZUNvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVudGl0eUZhY3RvcnkuY3JlYXRlQ29uZmlndXJhdGlvbigpO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGUoY291bnQsIGNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW50aXR5RmFjdG9yeS5jcmVhdGUodGhpcywgY291bnQsIGNvbmZpZ3VyYXRpb24pO1xuICAgIH1cbiAgICBcbiAgICAvLyBFdmVudCBIYW5kbGVyXG4gICAgXG4gICAgbGlzdGVuKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIubGlzdGVuKGV2ZW50LCBjYWxsYmFjayk7XG4gICAgfVxuICAgIFxuICAgIHN0b3BMaXN0ZW4oZXZlbnRJZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIuc3RvcExpc3RlbihldmVudElkKTtcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLnRyaWdnZXIuY2FsbCh0aGlzLCAuLi5hcmd1bWVudHMpO1xuICAgIH1cbiAgICBcbiAgICB0cmlnZ2VyRGVsYXllZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLnRyaWdnZXJEZWxheWVkLmNhbGwodGhpcywgLi4uYXJndW1lbnRzKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFbnRpdHlGYWN0b3J5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplcnMgID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihjb21wb25lbnRJZCkgfHwgdHlwZW9mIGluaXRpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXJzLnNldChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpO1xuICAgIH1cbiAgICBcbiAgICBidWlsZCgpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gbmV3IE1hcCgpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIHdpdGhDb21wb25lbnQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihjb21wb25lbnRJZCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGluaXRpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBpbml0aWFsaXplciA9IHRoaXMuaW5pdGlhbGl6ZXJzLmdldChjb21wb25lbnRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5zZXQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGVDb25maWd1cmF0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGUoZW50aXR5TWFuYWdlciwgY291bnQgPSAxLCBjb25maWd1cmF0aW9uID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICghKGVudGl0eU1hbmFnZXIgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyKSkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGNvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uIHx8IHRoaXMuY29uZmlndXJhdGlvbjtcblxuICAgICAgICBsZXQgY29tcG9uZW50cyA9IDA7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBjb21wb25lbnQgb2YgY29uZmlndXJhdGlvbi5rZXlzKCkpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMgfD0gY29tcG9uZW50O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgZW50aXRpZXMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7ICsraSkge1xuICAgICAgICAgICAgbGV0IGVudGl0eUlkID0gZW50aXR5TWFuYWdlci5uZXdFbnRpdHkoY29tcG9uZW50cyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChlbnRpdHlJZCA+PSBlbnRpdHlNYW5hZ2VyLmNhcGFjaXR5KSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IFtjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXJdIG9mIGNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGluaXRpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gaW5pdGlhbGl6ZXIuY2FsbChlbnRpdHlNYW5hZ2VyW2NvbXBvbmVudElkXVtlbnRpdHlJZF0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZW50aXR5TWFuYWdlcltjb21wb25lbnRJZF1bZW50aXR5SWRdICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBlbnRpdHlNYW5hZ2VyW2NvbXBvbmVudElkXVtlbnRpdHlJZF0gIT09ICdvYmplY3QnICYmIHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eU1hbmFnZXJbY29tcG9uZW50SWRdW2VudGl0eUlkXSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGVudGl0aWVzLnB1c2goZW50aXR5SWQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZW50aXRpZXMubGVuZ3RoID09PSAxID8gZW50aXRpZXNbMF0gOiBlbnRpdGllcztcbiAgICB9XG59IiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IHsgRW50aXR5TWFuYWdlciB9IGZyb20gJ2dnLWVudGl0aWVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR0cge1xuICAgIGNvbnN0cnVjdG9yKGRpKSB7XG4gICAgICAgIHRoaXMuZW50aXR5TWFuYWdlciA9IG5ldyBFbnRpdHlNYW5hZ2VyKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmRpID0gZGk7XG4gICAgfVxuICAgIFxuICAgIHN0YXJ0KCkge1xuICAgICAgICAvLyBjb25zdCBmaWxlTG9hZGVyID0gREkuZmlsZUxvYWRlcigpO1xuICAgICAgICBcbiAgICAgICAgLy8gZmlsZUxvYWRlci5nZXQocGF0aCkudGhlbihyZXMgPT4ge1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgLy8gfSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBsb29wTWFuYWdlciAgICAgPSB0aGlzLmRpLmxvb3BNYW5hZ2VyKCk7XG4gICAgICAgIGNvbnN0IHJlbmRlcmVyTWFuYWdlciA9IHRoaXMuZGkucmVuZGVyZXJNYW5hZ2VyKCk7XG4gICAgICAgIFxuICAgICAgICBsb29wTWFuYWdlci5zZXRVcGRhdGUoZGVsdGEgPT4gdGhpcy5lbnRpdHlNYW5hZ2VyLm9uTG9naWMoZGVsdGEpKTtcbiAgICAgICAgXG4gICAgICAgIGxvb3BNYW5hZ2VyLnNldFJlbmRlcihpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSA9PiB0aGlzLmVudGl0eU1hbmFnZXIub25SZW5kZXIoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UsIHsgcmVuZGVyZXJNYW5hZ2VyIH0pKTtcbiAgICAgICAgXG4gICAgICAgIGxvb3BNYW5hZ2VyLnN0YXJ0KCk7XG4gICAgfVxufVxuLy8gaW1wb3J0IHsgRmxhdFNoYWRpbmcgfSBmcm9tICcuL2NvbnN0YW50cy9zaGFkaW5nJztcblxuLy8gd2luZG93Lm9ubG9hZCA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuLy8gICAgIGNvbnN0IGxldmVsTG9hZGVyICAgICAgID0gREkubGV2ZWxMb2FkZXIoKTtcbi8vICAgICBjb25zdCBtZXNoTG9hZGVyICAgICAgICA9IERJLm1lc2hMb2FkZXIoKTtcbi8vICAgICBjb25zdCBtZXNoTWFuYWdlciAgICAgICA9IERJLm1lc2hNYW5hZ2VyKCk7XG4vLyAgICAgY29uc3Qgc2NlbmVNYW5hZ2VyICAgICAgPSBESS5zY2VuZU1hbmFnZXIoKTtcbi8vICAgICBjb25zdCBlbnRpdHlNYW5hZ2VyICAgICA9IERJLmVudGl0eU1hbmFnZXIoKTtcbi8vICAgICBjb25zdCByZW5kZXJlck1hbmFnZXIgICA9IERJLnJlbmRlcmVyTWFuYWdlcigpO1xuLy8gICAgIGNvbnN0IGxvb3BNYW5hZ2VyICAgICAgID0gREkubG9vcE1hbmFnZXIoKTtcbi8vICAgICBjb25zdCBwZXJmb3JtYW5jZVZpZXdlciA9IERJLnBlcmZvcm1hbmNlVmlld2VyKCk7XG4gICAgXG4vLyAgICAgY29uc3Qgc2NlbmVJZCA9IHNjZW5lTWFuYWdlci5jcmVhdGVTY2VuZSgpO1xuICAgIFxuLy8gICAgIGNvbnN0IGxldmVsICA9IGF3YWl0IGxldmVsTG9hZGVyLmxvYWRMZXZlbCgnbGV2ZWxzL2xldmVsLW9uZS5qc29uJyk7XG4vLyAgICAgY29uc3QgbWVzaElkID0gbWVzaE1hbmFnZXIuYWRkTWVzaChhd2FpdCBtZXNoTG9hZGVyLmxvYWQoJ21lc2hlcy8nICsgbGV2ZWwubWVzaCwgeyBzaGFkaW5nIDogRmxhdFNoYWRpbmcgfSkpO1xuICAgIFxuLy8gICAgIHNjZW5lTWFuYWdlci5hZGRUb1NjZW5lKHNjZW5lSWQsIG1lc2hNYW5hZ2VyLmdldE1lc2gobWVzaElkKSk7XG4vLyAgICAgc2NlbmVNYW5hZ2VyLmFkZEFtYmllbnRMaWdodFRvU2NlbmUoc2NlbmVJZCwgMHgxMDEwMzApO1xuLy8gIFx0c2NlbmVNYW5hZ2VyLmFkZERpcmVjdGlvbmFsTGlnaHRUb1NjZW5lKHNjZW5lSWQsIDB4ZmZlZWRkLCAwLCAwLCAxKTtcbiAgICBcbi8vICAgICB2YXIgbWVzaElzQWRkZWQgPSB0cnVlO1xuICAgIFxuLy8gICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4vLyAgICAgICAgIGlmIChtZXNoSXNBZGRlZCkge1xuLy8gICAgICAgICAgICAgc2NlbmVNYW5hZ2VyLnJlbW92ZUZyb21TY2VuZShzY2VuZUlkLCBtZXNoTWFuYWdlci5nZXRNZXNoKG1lc2hJZCkpO1xuLy8gICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgc2NlbmVNYW5hZ2VyLmFkZFRvU2NlbmUoc2NlbmVJZCwgbWVzaE1hbmFnZXIuZ2V0TWVzaChtZXNoSWQpKTtcbi8vICAgICAgICAgfVxuICAgICAgICBcbi8vICAgICAgICAgbWVzaElzQWRkZWQgPSAhbWVzaElzQWRkZWQ7XG4vLyAgICAgfSk7XG4gICAgXG4vLyAgICAgcGVyZm9ybWFuY2VWaWV3ZXIuc2V0TW9kZSgwKTtcbiAgICBcbi8vICAgICBsb29wTWFuYWdlci5zZXRVcGRhdGUoZGVsdGEgPT4ge1xuLy8gICAgICAgICAgICAgICAgICAgICBtZXNoTWFuYWdlci5nZXRNZXNoKG1lc2hJZCkucm90YXRpb24ueSArPSAwLjAwMSAqIGRlbHRhO1xuLy8gICAgICAgICAgICAgICAgICAgICBlbnRpdHlNYW5hZ2VyLm9uTG9naWMoZGVsdGEpO1xuLy8gICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgIC5zZXRSZW5kZXIoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UgPT4ge1xuLy8gICAgICAgICAgICAgICAgICAgcGVyZm9ybWFuY2VWaWV3ZXIuYmVnaW4oKTtcbiAgICAgICAgICAgICAgICAgICBcbi8vICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyTWFuYWdlci5yZW5kZXIoc2NlbmVNYW5hZ2VyLmdldFNjZW5lKHNjZW5lSWQpLCBpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSk7XG4gICAgICAgICAgICAgICAgICAgXG4vLyAgICAgICAgICAgICAgICAgICBwZXJmb3JtYW5jZVZpZXdlci5lbmQoKTtcbi8vICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgLnN0YXJ0KCk7XG4vLyB9OyIsIntcbiAgICBcIm5hbWVcIiA6IFwiSmVzcGVyXCIsXG4gICAgXCJhZ2VcIiA6IDMwXG59Iiwie1xuICAgIFwieFwiOiAxMCxcbiAgICBcInlcIjogMTAsXG4gICAgXCJ6XCI6IDEwXG59Iiwie1xuICAgIFwieFwiOiAyMCxcbiAgICBcInlcIjogMjAsXG4gICAgXCJ6XCI6IDIwXG59IiwiaW1wb3J0IHsgU2VsZWN0b3JUeXBlIH0gZnJvbSAnZ2ctZW50aXRpZXMnO1xuXG5leHBvcnQgY29uc3QgU2VsZWN0b3IgPSBTZWxlY3RvclR5cGUuR2V0V2l0aDtcblxuZXhwb3J0IGRlZmF1bHQgKGVudGl0aWVzKSA9PiB7XG4gICAgZm9yICh2YXIgZW50aXR5IG9mIGVudGl0aWVzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVudGl0eSk7XG4gICAgfVxufTsiLCJpbXBvcnQgeyBTZWxlY3RvclR5cGUgfSBmcm9tICdnZy1lbnRpdGllcyc7XG5cbmV4cG9ydCBjb25zdCBTZWxlY3RvciA9IFNlbGVjdG9yVHlwZS5HZXQ7XG5cbmV4cG9ydCBkZWZhdWx0IChlbnRpdGllcywgZGVsdGEsIG9wdHMpID0+IHtcbiAgICBjb25zb2xlLmxvZyhTZWxlY3Rvciwgb3B0cyk7XG4gICAgXG4gICAgZm9yICh2YXIgZW50aXR5IG9mIGVudGl0aWVzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVudGl0eSk7XG4gICAgfVxufTsiLCJpbXBvcnQgKiBhcyBESSBmcm9tICcuLi9zcmMvREkvbm9kZSc7XG5cbmltcG9ydCBHRyBmcm9tICcuLi9zcmMvZ2cnO1xuXG5jb25zdCBnZyA9IG5ldyBHRyhESSk7XG5cbmltcG9ydCB0ZXN0IGZyb20gJy9ob21lL3VidW50dS93b3Jrc3BhY2UvYXBwL3NwZWNpYWwvdGVzdC5qc29uJztcbmdnLmVudGl0eU1hbmFnZXIucmVnaXN0ZXJDb21wb25lbnQodGVzdCk7XG5cbmltcG9ydCB0cmFuc2Zvcm0gZnJvbSAnL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9hcHAvc3BlY2lhbC90cmFuc2Zvcm0uanNvbic7XG5nZy5lbnRpdHlNYW5hZ2VyLnJlZ2lzdGVyQ29tcG9uZW50KHRyYW5zZm9ybSk7XG5cbmltcG9ydCB2ZWxvY2l0eSBmcm9tICcvaG9tZS91YnVudHUvd29ya3NwYWNlL2FwcC9zcGVjaWFsL3ZlbG9jaXR5Lmpzb24nO1xuZ2cuZW50aXR5TWFuYWdlci5yZWdpc3RlckNvbXBvbmVudCh2ZWxvY2l0eSk7XG5cbmltcG9ydCBtb3ZlbWVudCwgeyBTZWxlY3RvciBhcyBtb3ZlbWVudFNlbGVjdG9yIH0gZnJvbSAnL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9hcHAvc3lzdGVtcy9sb2dpYy9tb3ZlbWVudCc7XG5nZy5lbnRpdHlNYW5hZ2VyLnJlZ2lzdGVyTG9naWNTeXN0ZW0obW92ZW1lbnRTZWxlY3RvciwgMCwgbW92ZW1lbnQpO1xuXG5pbXBvcnQgcmVuZGVyLCB7IFNlbGVjdG9yIGFzIHJlbmRlclNlbGVjdG9yIH0gZnJvbSAnL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9hcHAvc3lzdGVtcy9yZW5kZXIvcmVuZGVyJztcbmdnLmVudGl0eU1hbmFnZXIucmVnaXN0ZXJSZW5kZXJTeXN0ZW0ocmVuZGVyU2VsZWN0b3IsIDAsIHJlbmRlcik7XG5cbmdnLnN0YXJ0KCk7Il0sIm5hbWVzIjpbInRoaXMiLCJGZXRjaEZpbGVMb2FkZXIiLCJTZWxlY3RvciIsIm1vdmVtZW50U2VsZWN0b3IiLCJyZW5kZXJTZWxlY3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0EsRUFBQSxHQUFDLFVBQVMsQ0FBVCxFQUFXO0FBQUMsRUFBQSxhQUFTLENBQVQsQ0FBVyxDQUFYLEVBQWE7QUFBQyxFQUFBLFVBQUcsSUFBRSxFQUFFLENBQUYsQ0FBRixFQUFPLEVBQUUsSUFBRSxDQUFGLEdBQUksQ0FBSixDQUFGLEVBQVM7QUFBQyxFQUFBLGFBQUksS0FBRyxJQUFFLENBQUYsRUFBSSxJQUFFLENBQUYsRUFBSSxFQUFFLENBQUYsRUFBSSxDQUFKLENBQVgsRUFBa0IsSUFBRSxJQUFFLEdBQUYsS0FBUSxJQUFFLE1BQUksQ0FBSixHQUFNLE1BQUksQ0FBSixFQUFNLElBQUUsQ0FBRixFQUFJLElBQUUsQ0FBRixDQUE1QixFQUFpQyxHQUFuRCxFQUF1RCxJQUFFLENBQUYsRUFBSSxLQUFHLENBQUg7QUFBTSxFQUFBLGNBQUcsRUFBRSxDQUFGLEdBQUssS0FBRyxDQUFILEVBQUssRUFBRSxDQUFGLElBQUssR0FBTCxFQUFTO0FBQUMsRUFBQSxnQkFBRSxDQUFDLENBQUQsQ0FBSDthQUF0QjtXQUFyRSxDQUF1RyxDQUFFLElBQUUsQ0FBRixDQUFGLEVBQU8sRUFBRSxDQUFGLEVBQUksQ0FBSixDQUFQLEVBQWMsSUFBRSxDQUFD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