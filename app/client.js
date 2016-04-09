(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('three')) :
  typeof define === 'function' && define.amd ? define('client.js', ['three'], factory) :
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

  var loopManager = function loopManager() {
    return new MainLoopLoopManager();
  };
  var fileLoader = function fileLoader() {
    return new FileLoader();
  };
  var rendererManager = function rendererManager() {
    return new ThreeRendererManager();
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

  var gemoetry = "cylinder";
  var AppearanceComponent = {
  	gemoetry: gemoetry
  };

  var x = 10;
  var y = 10;
  var z = 10;
  var TransformComponent = {
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
  var Components = 0;

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

  var Selector$1 = SelectorType.GetWith;
  var Components$1 = TransformComponent | AppearanceComponent;

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

  gg.entityManager.registerComponent(AppearanceComponent);

  gg.entityManager.registerComponent(TransformComponent);

  gg.entityManager.registerComponent(velocity);

  gg.entityManager.registerLogicSystem(Selector, Components, movement);

  gg.entityManager.registerRenderSystem(Selector$1, Components$1, render);

  gg.start();

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvbWFpbmxvb3AuanMvYnVpbGQvbWFpbmxvb3AubWluLmpzIiwiLi4vc3JjL2xvZ2ljL21haW5sb29wLWxvb3AtbWFuYWdlci5qcyIsIi4uL3NyYy9sb2dpYy9mZXRjaC1maWxlLWxvYWRlci5qcyIsIi4uL3NyYy92aWV3L3RocmVlLXJlbmRlcmVyLW1hbmFnZXIuanMiLCIuLi9zcmMvREkvYnJvd3Nlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9jb21wb25lbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvZ2ctZW50aXRpZXMvc3JjL2NvcmUvc3lzdGVtLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL3NyYy9jb3JlL2V2ZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL3NyYy9jb3JlL2VudGl0eS5qcyIsIi4uL3NyYy9nZy5qcyIsInNwZWNpYWwvYXBwZWFyYW5jZS5qc29uIiwic3BlY2lhbC90cmFuc2Zvcm0uanNvbiIsInNwZWNpYWwvdmVsb2NpdHkuanNvbiIsInN5c3RlbXMvbG9naWMvbW92ZW1lbnQuanMiLCJzeXN0ZW1zL3JlbmRlci9yZW5kZXIuanMiLCJjbGllbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBtYWlubG9vcC5qcyAxLjAuMy0yMDE2MDMyMFxuICpcbiAqIEBhdXRob3IgSXNhYWMgU3VraW4gKGh0dHA6Ly93d3cuaXNhYWNzdWtpbi5jb20vKVxuICogQGxpY2Vuc2UgTUlUXG4gKi9cblxuIWZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGIoYSl7aWYodj1vKGIpLCEoZStqPmEpKXtmb3IoZCs9YS1lLGU9YSxyKGEsZCksYT5nKzFlMyYmKGY9LjI1KmgrLjc1KmYsZz1hLGg9MCksaCsrLGk9MDtkPj1jOylpZihzKGMpLGQtPWMsKytpPj0yNDApe209ITA7YnJlYWt9dChkL2MpLHUoZixtKSxtPSExfX12YXIgYz0xZTMvNjAsZD0wLGU9MCxmPTYwLGc9MCxoPTAsaT0wLGo9MCxrPSExLGw9ITEsbT0hMSxuPVwib2JqZWN0XCI9PXR5cGVvZiB3aW5kb3c/d2luZG93OmEsbz1uLnJlcXVlc3RBbmltYXRpb25GcmFtZXx8ZnVuY3Rpb24oKXt2YXIgYT1EYXRlLm5vdygpLGIsZDtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIGI9RGF0ZS5ub3coKSxkPU1hdGgubWF4KDAsYy0oYi1hKSksYT1iK2Qsc2V0VGltZW91dChmdW5jdGlvbigpe2UoYitkKX0sZCl9fSgpLHA9bi5jYW5jZWxBbmltYXRpb25GcmFtZXx8Y2xlYXJUaW1lb3V0LHE9ZnVuY3Rpb24oKXt9LHI9cSxzPXEsdD1xLHU9cSx2O2EuTWFpbkxvb3A9e2dldFNpbXVsYXRpb25UaW1lc3RlcDpmdW5jdGlvbigpe3JldHVybiBjfSxzZXRTaW11bGF0aW9uVGltZXN0ZXA6ZnVuY3Rpb24oYSl7cmV0dXJuIGM9YSx0aGlzfSxnZXRGUFM6ZnVuY3Rpb24oKXtyZXR1cm4gZn0sZ2V0TWF4QWxsb3dlZEZQUzpmdW5jdGlvbigpe3JldHVybiAxZTMvan0sc2V0TWF4QWxsb3dlZEZQUzpmdW5jdGlvbihhKXtyZXR1cm5cInVuZGVmaW5lZFwiPT10eXBlb2YgYSYmKGE9MS8wKSwwPT09YT90aGlzLnN0b3AoKTpqPTFlMy9hLHRoaXN9LHJlc2V0RnJhbWVEZWx0YTpmdW5jdGlvbigpe3ZhciBhPWQ7cmV0dXJuIGQ9MCxhfSxzZXRCZWdpbjpmdW5jdGlvbihhKXtyZXR1cm4gcj1hfHxyLHRoaXN9LHNldFVwZGF0ZTpmdW5jdGlvbihhKXtyZXR1cm4gcz1hfHxzLHRoaXN9LHNldERyYXc6ZnVuY3Rpb24oYSl7cmV0dXJuIHQ9YXx8dCx0aGlzfSxzZXRFbmQ6ZnVuY3Rpb24oYSl7cmV0dXJuIHU9YXx8dSx0aGlzfSxzdGFydDpmdW5jdGlvbigpe3JldHVybiBsfHwobD0hMCx2PW8oZnVuY3Rpb24oYSl7dCgxKSxrPSEwLGU9YSxnPWEsaD0wLHY9byhiKX0pKSx0aGlzfSxzdG9wOmZ1bmN0aW9uKCl7cmV0dXJuIGs9ITEsbD0hMSxwKHYpLHRoaXN9LGlzUnVubmluZzpmdW5jdGlvbigpe3JldHVybiBrfX0sXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShhLk1haW5Mb29wKTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZudWxsIT09bW9kdWxlJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlLmV4cG9ydHMmJihtb2R1bGUuZXhwb3J0cz1hLk1haW5Mb29wKX0odGhpcyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWlubG9vcC5taW4uanMubWFwIiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IE1haW5Mb29wIGZyb20gJ21haW5sb29wLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbkxvb3BMb29wTWFuYWdlciB7XG4gICAgc2V0VXBkYXRlKHVwZGF0ZU1ldGhvZCA6IChkZWx0YSA6IG51bWJlcikgPT4gdm9pZCkgOiBNYWluTG9vcExvb3BNYW5hZ2VyIHtcbiAgICAgICAgTWFpbkxvb3Auc2V0VXBkYXRlKHVwZGF0ZU1ldGhvZCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgc2V0UmVuZGVyKHJlbmRlck1ldGhvZCA6IChpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSA6IG51bWJlcikgPT4gdm9pZCkgOiBNYWluTG9vcExvb3BNYW5hZ2VyIHtcbiAgICAgICAgTWFpbkxvb3Auc2V0RHJhdyhyZW5kZXJNZXRob2QpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIHN0YXJ0KCkgOiB2b2lkIHtcbiAgICAgICAgTWFpbkxvb3Auc3RhcnQoKTtcbiAgICB9XG59IiwiLyogQGZsb3cgKi9cbi8qIGdsb2JhbCBmZXRjaCAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWxlTG9hZGVyIHtcbiAgICBnZXQocGF0aCkge1xuICAgICAgICByZXR1cm4gZmV0Y2gocGF0aCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgcmVzID09PSAnc3RyaW5nJyA/IEpTT04ucGFyc2UocmVzKSA6IHJlcztcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59IiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IHRocmVlIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGhyZWVSZW5kZXJlck1hbmFnZXIge1xuICAgIHJlbmRlcmVyICAgICA6IHRocmVlLldlYkdMUmVuZGVyZXI7XG4gICAgY2FtZXJhICAgICAgIDogdGhyZWUuQ2FtZXJhO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IHRocmVlLldlYkdMUmVuZGVyZXIoeyBhbnRpYWxpYXMgOiB0cnVlIH0pO1xuICAgICAgICB0aGlzLmNhbWVyYSAgID0gbmV3IHRocmVlLlBlcnNwZWN0aXZlQ2FtZXJhKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi55ID0gMjA7XG4gICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnogPSAyMDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2FtZXJhLmxvb2tBdChuZXcgdGhyZWUuVmVjdG9yMygwLjAsIDAuMCwgMC4wKSk7XG4gICAgfVxuICAgIFxuICAgIHJlbmRlcihzY2VuZSA6IHRocmVlLlNjZW5lLCBpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSA6IG51bWJlcikgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoc2NlbmUsIHRoaXMuY2FtZXJhKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgTWFpbkxvb3BMb29wTWFuYWdlciBmcm9tICcuLi9sb2dpYy9tYWlubG9vcC1sb29wLW1hbmFnZXInO1xuaW1wb3J0IEZldGNoRmlsZUxvYWRlciAgICAgZnJvbSAnLi4vbG9naWMvZmV0Y2gtZmlsZS1sb2FkZXInO1xuXG5pbXBvcnQgVGhyZWVSZW5kZXJlck1hbmFnZXIgZnJvbSAnLi4vdmlldy90aHJlZS1yZW5kZXJlci1tYW5hZ2VyJztcblxuY29uc3QgbG9vcE1hbmFnZXIgICAgID0gKCkgPT4gbmV3IE1haW5Mb29wTG9vcE1hbmFnZXIoKTtcbmNvbnN0IGZpbGVMb2FkZXIgICAgICA9ICgpID0+IG5ldyBGZXRjaEZpbGVMb2FkZXIoKTtcbmNvbnN0IHJlbmRlcmVyTWFuYWdlciA9ICgpID0+IG5ldyBUaHJlZVJlbmRlcmVyTWFuYWdlcigpO1xuXG5leHBvcnQgeyBsb29wTWFuYWdlciwgZmlsZUxvYWRlciwgcmVuZGVyZXJNYW5hZ2VyIH07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcG9uZW50TWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgXG4gICAgbmV3Q29tcG9uZW50KGNvbXBvbmVudElkKSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KGNvbXBvbmVudElkKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChjb21wb25lbnQgPT09IG51bGwgfHwgY29tcG9uZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzogcmV0dXJuIG5ldyBjb21wb25lbnQoKTtcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCcgIDoge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKGNvbXBvbmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmV0ID0ge307XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjb21wb25lbnQpLmZvckVhY2goa2V5ID0+IHJldFtrZXldID0gY29tcG9uZW50W2tleV0pO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgICAgICB9KShjb21wb25lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICAgICAgaWYgKGNvbXBvbmVudCA9PT0gbnVsbCB8fCBjb21wb25lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjb21wb25lbnQgY2Fubm90IGJlIG51bGwuJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBtYXggPSBNYXRoLm1heCguLi50aGlzLmNvbXBvbmVudHMua2V5cygpKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBpZCA9IG1heCA9PT0gdW5kZWZpbmVkIHx8IG1heCA9PT0gbnVsbCB8fCBtYXggPT09IC1JbmZpbml0eSA/IDEgOiBtYXggPT09IDAgPyAxIDogbWF4ICogMjtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudHMuc2V0KGlkLCBjb21wb25lbnQpO1xuXG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9XG4gICAgXG4gICAgZ2V0Q29tcG9uZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50cztcbiAgICB9XG59IiwiaW1wb3J0IHsgU2VsZWN0b3JUeXBlIH0gZnJvbSAnLi9lbnRpdHknO1xuXG5leHBvcnQgY29uc3QgU3lzdGVtVHlwZSA9IHtcbiAgICBMb2dpYyAgIDogMCxcbiAgICBSZW5kZXIgIDogMVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3lzdGVtTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubG9naWNTeXN0ZW1zICA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJTeXN0ZW1zID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBcbiAgICByZWdpc3RlclN5c3RlbSh0eXBlLCBzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGUgIT09IFN5c3RlbVR5cGUuTG9naWMgJiYgdHlwZSAhPT0gU3lzdGVtVHlwZS5SZW5kZXIpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcigndHlwZSBtdXN0IGJlIGEgdmFsaWQgU3lzdGVtVHlwZS4nKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBpZiAoc2VsZWN0b3IgIT09IFNlbGVjdG9yVHlwZS5HZXQgJiYgc2VsZWN0b3IgIT09IFNlbGVjdG9yVHlwZS5HZXRXaXRoICYmXG4gICAgICAgICAgICBzZWxlY3RvciAhPT0gU2VsZWN0b3JUeXBlLkdldFdpdGhPbmx5ICYmIHNlbGVjdG9yICE9PSBTZWxlY3RvclR5cGUuR2V0V2l0aG91dCkge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdzZWxlY3RvciBtdXN0IGJlIGEgdmFsaWQgU2VsZWN0b3JUeXBlLicpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGNvbXBvbmVudHMgIT09ICdudW1iZXInKSAge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjb21wb25lbnRzIG11c3QgYmUgYSBudW1iZXIuJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgc3lzdGVtID0ge1xuICAgICAgICBzZWxlY3RvcixcbiAgICAgICAgY29tcG9uZW50cyxcbiAgICAgICAgY2FsbGJhY2tcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIGxldCBzeXN0ZW1JZCA9IE1hdGgubWF4KDAsIC4uLnRoaXMubG9naWNTeXN0ZW1zLmtleXMoKSwgLi4udGhpcy5yZW5kZXJTeXN0ZW1zLmtleXMoKSkgKyAxO1xuICAgICAgICBcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFN5c3RlbVR5cGUuTG9naWMgOiB0aGlzLmxvZ2ljU3lzdGVtcy5zZXQoc3lzdGVtSWQsIHN5c3RlbSk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTeXN0ZW1UeXBlLlJlbmRlciA6IHRoaXMucmVuZGVyU3lzdGVtcy5zZXQoc3lzdGVtSWQsIHN5c3RlbSk7IGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gc3lzdGVtSWQ7XG4gICAgfVxuICAgIFxuICAgIHJlbW92ZVN5c3RlbShzeXN0ZW1JZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2dpY1N5c3RlbXMuZGVsZXRlKHN5c3RlbUlkKSB8fCB0aGlzLnJlbmRlclN5c3RlbXMuZGVsZXRlKHN5c3RlbUlkKTtcbiAgICB9XG59IiwiaW1wb3J0IEVudGl0eU1hbmFnZXIgZnJvbSAnLi9lbnRpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudEhhbmRsZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgXG4gICAgZW1wdHlQcm9taXNlKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBwcm9taXNlKGNhbGxiYWNrLCBjb250ZXh0LCBhcmdzLCB0aW1lb3V0KSB7XG4gICAgICAgIGlmICh0aW1lb3V0KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHR5cGVvZiBjb250ZXh0ID09PSAgJ29iamVjdCcgPyBjYWxsYmFjay5jYWxsKGNvbnRleHQsIC4uLmFyZ3MpIDogY2FsbGJhY2suYXBwbHkoY29udGV4dCwgLi4uYXJncykpO1xuICAgICAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUodHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnID8gY2FsbGJhY2suY2FsbChjb250ZXh0LCAuLi5hcmdzKSA6IGNhbGxiYWNrLmFwcGx5KGNvbnRleHQsIC4uLmFyZ3MpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIGxpc3RlbihldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICghdGhpcy5ldmVudHMuaGFzKGV2ZW50KSkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMuc2V0KGV2ZW50LCBuZXcgTWFwKCkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgZXZlbnRJZCA9IC0xO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5ldmVudHMuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudElkID0gTWF0aC5tYXgoZXZlbnRJZCwgLi4uZXZlbnQua2V5cygpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICArK2V2ZW50SWQ7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmV2ZW50cy5nZXQoZXZlbnQpLnNldChldmVudElkLCBjYWxsYmFjayk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZXZlbnRJZDtcbiAgICB9XG4gICAgXG4gICAgc3RvcExpc3RlbihldmVudElkKSB7XG4gICAgICAgIGZvciAobGV0IGV2ZW50cyBvZiB0aGlzLmV2ZW50cy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaWQgb2YgZXZlbnRzLmtleXMoKSkge1xuICAgICAgICAgICAgICAgIGlmIChpZCA9PT0gZXZlbnRJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnRzLmRlbGV0ZShldmVudElkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXIoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcyBpbnN0YW5jZW9mIEVudGl0eU1hbmFnZXIgPyB0aGlzLmV2ZW50SGFuZGxlciA6IHRoaXM7XG4gICAgICAgIFxuICAgICAgICBsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBbIGV2ZW50IF0gPSBhcmdzLnNwbGljZSgwLCAxKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnQgIT09ICdzdHJpbmcnIHx8ICFzZWxmLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5lbXB0eVByb21pc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHByb21pc2VzID0gW107XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBjYWxsYmFjayBvZiBzZWxmLmV2ZW50cy5nZXQoZXZlbnQpLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHNlbGYucHJvbWlzZShjYWxsYmFjaywgdGhpcywgYXJncywgMSkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH1cbiAgICBcbiAgICB0cmlnZ2VyRGVsYXllZCgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlciA/IHRoaXMuZXZlbnRIYW5kbGVyIDogdGhpcztcbiAgICAgICAgXG4gICAgICAgIGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xuICAgICAgICBcbiAgICAgICAgbGV0IFsgZXZlbnQsIHRpbWVvdXQgXSA9IGFyZ3Muc3BsaWNlKDAsIDIpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgIU51bWJlci5pc0ludGVnZXIodGltZW91dCkgfHwgIXNlbGYuZXZlbnRzLmhhcyhldmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmVtcHR5UHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGNhbGxiYWNrIG9mIHNlbGYuZXZlbnRzLmdldChldmVudCkudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goc2VsZi5wcm9taXNlKGNhbGxiYWNrLCB0aGlzLCBhcmdzLCB0aW1lb3V0KSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxufSIsImltcG9ydCBDb21wb25lbnRNYW5hZ2VyICAgICAgICAgICAgICBmcm9tICcuL2NvbXBvbmVudCc7XG5pbXBvcnQgU3lzdGVtTWFuYWdlciwgeyBTeXN0ZW1UeXBlIH0gZnJvbSAnLi9zeXN0ZW0nO1xuaW1wb3J0IEV2ZW50SGFuZGxlciAgICAgICAgICAgICAgICAgIGZyb20gJy4vZXZlbnQnO1xuXG5leHBvcnQgY29uc3QgU2VsZWN0b3JUeXBlID0ge1xuICAgIEdldCAgICAgICAgIDogMCxcbiAgICBHZXRXaXRoICAgICA6IDEsXG4gICAgR2V0V2l0aE9ubHkgOiAyLFxuICAgIEdldFdpdGhvdXQgIDogM1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5TWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoY2FwYWNpdHkgPSAxMDAwKSB7XG4gICAgICAgIHRoaXMuY2FwYWNpdHkgICAgICAgICA9IGNhcGFjaXR5O1xuICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSAtMTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeSAgICA9IG5ldyBFbnRpdHlGYWN0b3J5KCk7XG4gICAgICAgIHRoaXMuc3lzdGVtTWFuYWdlciAgICA9IG5ldyBTeXN0ZW1NYW5hZ2VyKCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50TWFuYWdlciA9IG5ldyBDb21wb25lbnRNYW5hZ2VyKCk7XG4gICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyICAgICA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXRpZXMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiB0aGlzLmNhcGFjaXR5IH0sICgpID0+IHsgcmV0dXJuIDA7IH0gKTtcbiAgICB9XG4gICAgXG4gICAgaW5jcmVhc2VDYXBhY2l0eSgpIHtcbiAgICAgICAgbGV0IG9sZENhcGFjaXR5ID0gdGhpcy5jYXBhY2l0eTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2FwYWNpdHkgKj0gMjtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSBvbGRDYXBhY2l0eTsgaSA8IHRoaXMuY2FwYWNpdHk7ICsraSkge1xuICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tpXSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGNvbXBvbmVudElkIG9mIHRoaXMuY29tcG9uZW50TWFuYWdlci5nZXRDb21wb25lbnRzKCkua2V5cygpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gb2xkQ2FwYWNpdHk7IGkgPCB0aGlzLmNhcGFjaXR5OyArK2kpIHtcbiAgICAgICAgICAgICAgICB0aGlzW2NvbXBvbmVudElkXS5wdXNoKHRoaXMuY29tcG9uZW50TWFuYWdlci5uZXdDb21wb25lbnQoY29tcG9uZW50SWQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBuZXdFbnRpdHkoY29tcG9uZW50cykge1xuICAgICAgICBpZiAodHlwZW9mIGNvbXBvbmVudHMgIT09ICdudW1iZXInIHx8IGNvbXBvbmVudHMgPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FwYWNpdHk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBlbnRpdHlJZCA9IDA7XG4gICAgICAgIFxuICAgICAgICBmb3IgKDsgZW50aXR5SWQgPCB0aGlzLmNhcGFjaXR5OyArK2VudGl0eUlkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gPT09IDApIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGVudGl0eUlkID49IHRoaXMuY2FwYWNpdHkpIHtcbiAgICAgICAgICAgIC8vIHRvZG86IGF1dG8gaW5jcmVhc2UgY2FwYWNpdHk/XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXBhY2l0eTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGVudGl0eUlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSBlbnRpdHlJZDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gPSBjb21wb25lbnRzO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGVudGl0eUlkO1xuICAgIH1cbiAgICBcbiAgICBkZWxldGVFbnRpdHkoZW50aXR5SWQpIHtcbiAgICAgICAgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gPSAwO1xuICAgICAgICBcbiAgICAgICAgaWYgKGVudGl0eUlkIDwgdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSBlbnRpdHlJZDsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2ldICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TWF4RW50aXR5ID0gaTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgKmdldEVudGl0aWVzKGNvbXBvbmVudHMgPSAwLCB0eXBlID0gU2VsZWN0b3JUeXBlLkdldFdpdGgpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFNlbGVjdG9yVHlwZS5HZXRXaXRoOiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW50aXR5SWQgaW4gdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5SWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbZW50aXR5SWRdICE9PSAwICYmICh0aGlzLmVudGl0aWVzW2VudGl0eUlkXSAmIGNvbXBvbmVudHMpID09PSBjb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCBNYXRoLmZsb29yKGVudGl0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgU2VsZWN0b3JUeXBlLkdldFdpdGhPbmx5OiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW50aXR5SWQgaW4gdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5SWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbZW50aXR5SWRdICE9PSAwICYmIHRoaXMuZW50aXRpZXNbZW50aXR5SWRdID09PSBjb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCBNYXRoLmZsb29yKGVudGl0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgU2VsZWN0b3JUeXBlLkdldFdpdGhvdXQ6IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRpdHlJZCBpbiB0aGlzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdHlJZCA+IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gIT09IDAgJiYgKHRoaXMuZW50aXRpZXNbZW50aXR5SWRdICYgY29tcG9uZW50cykgIT09IGNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIE1hdGguZmxvb3IoZW50aXR5SWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBTZWxlY3RvclR5cGUuR2V0OiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW50aXR5SWQgaW4gdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5SWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgTWF0aC5mbG9vcihlbnRpdHlJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ29tcG9uZW50IE1hbmFnZXJcbiAgICBcbiAgICByZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudElkID0gdGhpcy5jb21wb25lbnRNYW5hZ2VyLnJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzW2NvbXBvbmVudElkXSA9IFtdO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNhcGFjaXR5OyArK2kpIHtcbiAgICAgICAgICAgIHRoaXNbY29tcG9uZW50SWRdLnB1c2godGhpcy5jb21wb25lbnRNYW5hZ2VyLm5ld0NvbXBvbmVudChjb21wb25lbnRJZCkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgaW5pdGlhbGl6ZXI7XG5cbiAgICAgICAgc3dpdGNoICh0eXBlb2YgY29tcG9uZW50KSB7XG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6IGluaXRpYWxpemVyID0gY29tcG9uZW50OyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6IHtcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMoY29tcG9uZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gY29tcG9uZW50W2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OiBpbml0aWFsaXplciA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29tcG9uZW50OyB9OyBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LnJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBjb21wb25lbnRJZDtcbiAgICB9XG4gICAgXG4gICAgYWRkQ29tcG9uZW50KGVudGl0eUlkLCBjb21wb25lbnRJZCkge1xuICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eUlkXSB8PSBjb21wb25lbnRJZDtcbiAgICB9XG4gICAgXG4gICAgcmVtb3ZlQ29tcG9uZW50KGVudGl0eUlkLCBjb21wb25lbnRJZCkge1xuICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eUlkXSAmPSB+Y29tcG9uZW50SWQ7XG4gICAgfVxuICAgIFxuICAgIC8vIFN5c3RlbSBNYW5hZ2VyXG4gICAgXG4gICAgcmVnaXN0ZXJTeXN0ZW0odHlwZSwgc2VsZWN0b3IsIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVnaXN0ZXJTeXN0ZW0odHlwZSwgc2VsZWN0b3IsIGNvbXBvbmVudHMsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJMb2dpY1N5c3RlbShzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbShTeXN0ZW1UeXBlLkxvZ2ljLCBzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spO1xuICAgIH1cbiAgICBcbiAgICByZWdpc3RlclJlbmRlclN5c3RlbShzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbShTeXN0ZW1UeXBlLlJlbmRlciwgc2VsZWN0b3IsIGNvbXBvbmVudHMsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgXG4gICAgcmVtb3ZlU3lzdGVtKHN5c3RlbUlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVtb3ZlU3lzdGVtKHN5c3RlbUlkKTtcbiAgICB9XG4gICAgXG4gICAgb25Mb2dpYyhkZWx0YSwgb3B0cykge1xuICAgICAgICBmb3IgKGxldCBzeXN0ZW0gb2YgdGhpcy5zeXN0ZW1NYW5hZ2VyLmxvZ2ljU3lzdGVtcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgc3lzdGVtLmNhbGxiYWNrLmNhbGwodGhpcywgdGhpcy5nZXRFbnRpdGllcyhzeXN0ZW0uY29tcG9uZW50cywgc3lzdGVtLnNlbGVjdG9yKSwgZGVsdGEsIG9wdHMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uUmVuZGVyKGRlbHRhLCBvcHRzKSB7XG4gICAgICAgIGZvciAobGV0IHN5c3RlbSBvZiB0aGlzLnN5c3RlbU1hbmFnZXIucmVuZGVyU3lzdGVtcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgc3lzdGVtLmNhbGxiYWNrLmNhbGwodGhpcywgdGhpcy5nZXRFbnRpdGllcyhzeXN0ZW0uY29tcG9uZW50cywgc3lzdGVtLnNlbGVjdG9yKSwgZGVsdGEsIG9wdHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gRW50aXR5IEZhY3RvcnlcbiAgICBcbiAgICByZWdpc3RlckluaXRpYWxpemVyKGNvbXBvbmVudElkLCBpbml0aWFsaXplcikge1xuICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkucmVnaXN0ZXJJbml0aWFsaXplcihjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpO1xuICAgIH1cbiAgICBcbiAgICBidWlsZCgpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LmJ1aWxkKCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgd2l0aENvbXBvbmVudChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LndpdGhDb21wb25lbnQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGVDb25maWd1cmF0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnRpdHlGYWN0b3J5LmNyZWF0ZUNvbmZpZ3VyYXRpb24oKTtcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlKGNvdW50LCBjb25maWd1cmF0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVudGl0eUZhY3RvcnkuY3JlYXRlKHRoaXMsIGNvdW50LCBjb25maWd1cmF0aW9uKTtcbiAgICB9XG4gICAgXG4gICAgLy8gRXZlbnQgSGFuZGxlclxuICAgIFxuICAgIGxpc3RlbihldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLmxpc3RlbihldmVudCwgY2FsbGJhY2spO1xuICAgIH1cbiAgICBcbiAgICBzdG9wTGlzdGVuKGV2ZW50SWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLnN0b3BMaXN0ZW4oZXZlbnRJZCk7XG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyLmNhbGwodGhpcywgLi4uYXJndW1lbnRzKTtcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlckRlbGF5ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyRGVsYXllZC5jYWxsKHRoaXMsIC4uLmFyZ3VtZW50cyk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRW50aXR5RmFjdG9yeSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXJzICA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckluaXRpYWxpemVyKGNvbXBvbmVudElkLCBpbml0aWFsaXplcikge1xuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoY29tcG9uZW50SWQpIHx8IHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmluaXRpYWxpemVycy5zZXQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKTtcbiAgICB9XG4gICAgXG4gICAgYnVpbGQoKSB7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IG5ldyBNYXAoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICB3aXRoQ29tcG9uZW50KGNvbXBvbmVudElkLCBpbml0aWFsaXplcikge1xuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoY29tcG9uZW50SWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgaW5pdGlhbGl6ZXIgPSB0aGlzLmluaXRpYWxpemVycy5nZXQoY29tcG9uZW50SWQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uc2V0KGNvbXBvbmVudElkLCBpbml0aWFsaXplcik7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlQ29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlndXJhdGlvbjtcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlKGVudGl0eU1hbmFnZXIsIGNvdW50ID0gMSwgY29uZmlndXJhdGlvbiA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIShlbnRpdHlNYW5hZ2VyIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlcikpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbiB8fCB0aGlzLmNvbmZpZ3VyYXRpb247XG5cbiAgICAgICAgbGV0IGNvbXBvbmVudHMgPSAwO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY29tcG9uZW50IG9mIGNvbmZpZ3VyYXRpb24ua2V5cygpKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzIHw9IGNvbXBvbmVudDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGVudGl0aWVzID0gW107XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyArK2kpIHtcbiAgICAgICAgICAgIGxldCBlbnRpdHlJZCA9IGVudGl0eU1hbmFnZXIubmV3RW50aXR5KGNvbXBvbmVudHMpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZW50aXR5SWQgPj0gZW50aXR5TWFuYWdlci5jYXBhY2l0eSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBbY29tcG9uZW50SWQsIGluaXRpYWxpemVyXSBvZiBjb25maWd1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGluaXRpYWxpemVyLmNhbGwoZW50aXR5TWFuYWdlcltjb21wb25lbnRJZF1bZW50aXR5SWRdKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVudGl0eU1hbmFnZXJbY29tcG9uZW50SWRdW2VudGl0eUlkXSAhPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZW50aXR5TWFuYWdlcltjb21wb25lbnRJZF1bZW50aXR5SWRdICE9PSAnb2JqZWN0JyAmJiByZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHlNYW5hZ2VyW2NvbXBvbmVudElkXVtlbnRpdHlJZF0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBlbnRpdGllcy5wdXNoKGVudGl0eUlkKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLmxlbmd0aCA9PT0gMSA/IGVudGl0aWVzWzBdIDogZW50aXRpZXM7XG4gICAgfVxufSIsIi8qIEBmbG93ICovXG5cbmltcG9ydCB7IEVudGl0eU1hbmFnZXIgfSBmcm9tICdnZy1lbnRpdGllcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdHIHtcbiAgICBjb25zdHJ1Y3RvcihkaSkge1xuICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIgPSBuZXcgRW50aXR5TWFuYWdlcigpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5kaSA9IGRpO1xuICAgIH1cbiAgICBcbiAgICBzdGFydCgpIHtcbiAgICAgICAgLy8gY29uc3QgZmlsZUxvYWRlciA9IERJLmZpbGVMb2FkZXIoKTtcbiAgICAgICAgXG4gICAgICAgIC8vIGZpbGVMb2FkZXIuZ2V0KHBhdGgpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgIC8vIH0pO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgbG9vcE1hbmFnZXIgICAgID0gdGhpcy5kaS5sb29wTWFuYWdlcigpO1xuICAgICAgICBjb25zdCByZW5kZXJlck1hbmFnZXIgPSB0aGlzLmRpLnJlbmRlcmVyTWFuYWdlcigpO1xuICAgICAgICBcbiAgICAgICAgbG9vcE1hbmFnZXIuc2V0VXBkYXRlKGRlbHRhID0+IHRoaXMuZW50aXR5TWFuYWdlci5vbkxvZ2ljKGRlbHRhKSk7XG4gICAgICAgIFxuICAgICAgICBsb29wTWFuYWdlci5zZXRSZW5kZXIoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UgPT4gdGhpcy5lbnRpdHlNYW5hZ2VyLm9uUmVuZGVyKGludGVycG9sYXRpb25QZXJjZW50YWdlLCB7IHJlbmRlcmVyTWFuYWdlciB9KSk7XG4gICAgICAgIFxuICAgICAgICBsb29wTWFuYWdlci5zdGFydCgpO1xuICAgIH1cbn1cbi8vIGltcG9ydCB7IEZsYXRTaGFkaW5nIH0gZnJvbSAnLi9jb25zdGFudHMvc2hhZGluZyc7XG5cbi8vIHdpbmRvdy5vbmxvYWQgPSBhc3luYyBmdW5jdGlvbigpIHtcbi8vICAgICBjb25zdCBsZXZlbExvYWRlciAgICAgICA9IERJLmxldmVsTG9hZGVyKCk7XG4vLyAgICAgY29uc3QgbWVzaExvYWRlciAgICAgICAgPSBESS5tZXNoTG9hZGVyKCk7XG4vLyAgICAgY29uc3QgbWVzaE1hbmFnZXIgICAgICAgPSBESS5tZXNoTWFuYWdlcigpO1xuLy8gICAgIGNvbnN0IHNjZW5lTWFuYWdlciAgICAgID0gREkuc2NlbmVNYW5hZ2VyKCk7XG4vLyAgICAgY29uc3QgZW50aXR5TWFuYWdlciAgICAgPSBESS5lbnRpdHlNYW5hZ2VyKCk7XG4vLyAgICAgY29uc3QgcmVuZGVyZXJNYW5hZ2VyICAgPSBESS5yZW5kZXJlck1hbmFnZXIoKTtcbi8vICAgICBjb25zdCBsb29wTWFuYWdlciAgICAgICA9IERJLmxvb3BNYW5hZ2VyKCk7XG4vLyAgICAgY29uc3QgcGVyZm9ybWFuY2VWaWV3ZXIgPSBESS5wZXJmb3JtYW5jZVZpZXdlcigpO1xuICAgIFxuLy8gICAgIGNvbnN0IHNjZW5lSWQgPSBzY2VuZU1hbmFnZXIuY3JlYXRlU2NlbmUoKTtcbiAgICBcbi8vICAgICBjb25zdCBsZXZlbCAgPSBhd2FpdCBsZXZlbExvYWRlci5sb2FkTGV2ZWwoJ2xldmVscy9sZXZlbC1vbmUuanNvbicpO1xuLy8gICAgIGNvbnN0IG1lc2hJZCA9IG1lc2hNYW5hZ2VyLmFkZE1lc2goYXdhaXQgbWVzaExvYWRlci5sb2FkKCdtZXNoZXMvJyArIGxldmVsLm1lc2gsIHsgc2hhZGluZyA6IEZsYXRTaGFkaW5nIH0pKTtcbiAgICBcbi8vICAgICBzY2VuZU1hbmFnZXIuYWRkVG9TY2VuZShzY2VuZUlkLCBtZXNoTWFuYWdlci5nZXRNZXNoKG1lc2hJZCkpO1xuLy8gICAgIHNjZW5lTWFuYWdlci5hZGRBbWJpZW50TGlnaHRUb1NjZW5lKHNjZW5lSWQsIDB4MTAxMDMwKTtcbi8vICBcdHNjZW5lTWFuYWdlci5hZGREaXJlY3Rpb25hbExpZ2h0VG9TY2VuZShzY2VuZUlkLCAweGZmZWVkZCwgMCwgMCwgMSk7XG4gICAgXG4vLyAgICAgdmFyIG1lc2hJc0FkZGVkID0gdHJ1ZTtcbiAgICBcbi8vICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuLy8gICAgICAgICBpZiAobWVzaElzQWRkZWQpIHtcbi8vICAgICAgICAgICAgIHNjZW5lTWFuYWdlci5yZW1vdmVGcm9tU2NlbmUoc2NlbmVJZCwgbWVzaE1hbmFnZXIuZ2V0TWVzaChtZXNoSWQpKTtcbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgIHNjZW5lTWFuYWdlci5hZGRUb1NjZW5lKHNjZW5lSWQsIG1lc2hNYW5hZ2VyLmdldE1lc2gobWVzaElkKSk7XG4vLyAgICAgICAgIH1cbiAgICAgICAgXG4vLyAgICAgICAgIG1lc2hJc0FkZGVkID0gIW1lc2hJc0FkZGVkO1xuLy8gICAgIH0pO1xuICAgIFxuLy8gICAgIHBlcmZvcm1hbmNlVmlld2VyLnNldE1vZGUoMCk7XG4gICAgXG4vLyAgICAgbG9vcE1hbmFnZXIuc2V0VXBkYXRlKGRlbHRhID0+IHtcbi8vICAgICAgICAgICAgICAgICAgICAgbWVzaE1hbmFnZXIuZ2V0TWVzaChtZXNoSWQpLnJvdGF0aW9uLnkgKz0gMC4wMDEgKiBkZWx0YTtcbi8vICAgICAgICAgICAgICAgICAgICAgZW50aXR5TWFuYWdlci5vbkxvZ2ljKGRlbHRhKTtcbi8vICAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAuc2V0UmVuZGVyKGludGVycG9sYXRpb25QZXJjZW50YWdlID0+IHtcbi8vICAgICAgICAgICAgICAgICAgIHBlcmZvcm1hbmNlVmlld2VyLmJlZ2luKCk7XG4gICAgICAgICAgICAgICAgICAgXG4vLyAgICAgICAgICAgICAgICAgICByZW5kZXJlck1hbmFnZXIucmVuZGVyKHNjZW5lTWFuYWdlci5nZXRTY2VuZShzY2VuZUlkKSwgaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UpO1xuICAgICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgICAgICAgcGVyZm9ybWFuY2VWaWV3ZXIuZW5kKCk7XG4vLyAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgIC5zdGFydCgpO1xuLy8gfTsiLCJ7XG4gICAgXCJnZW1vZXRyeVwiIDogXCJjeWxpbmRlclwiXG59Iiwie1xuICAgIFwieFwiOiAxMCxcbiAgICBcInlcIjogMTAsXG4gICAgXCJ6XCI6IDEwXG59Iiwie1xuICAgIFwieFwiOiAyMCxcbiAgICBcInlcIjogMjAsXG4gICAgXCJ6XCI6IDIwXG59IiwiaW1wb3J0IHsgU2VsZWN0b3JUeXBlIH0gZnJvbSAnZ2ctZW50aXRpZXMnO1xuXG5leHBvcnQgY29uc3QgU2VsZWN0b3IgICA9IFNlbGVjdG9yVHlwZS5HZXRXaXRoO1xuZXhwb3J0IGNvbnN0IENvbXBvbmVudHMgPSAwO1xuXG5leHBvcnQgZGVmYXVsdCAoZW50aXRpZXMpID0+IHtcbiAgICBmb3IgKHZhciBlbnRpdHkgb2YgZW50aXRpZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2coZW50aXR5KTtcbiAgICB9XG59OyIsImltcG9ydCB7IFNlbGVjdG9yVHlwZSB9IGZyb20gJ2dnLWVudGl0aWVzJztcblxuaW1wb3J0IFRyYW5zZm9ybUNvbXBvbmVudCBmcm9tICcuLi8uLi9zcGVjaWFsL3RyYW5zZm9ybS5qc29uJztcbmltcG9ydCBBcHBlYXJhbmNlQ29tcG9uZW50IGZyb20gJy4uLy4uL3NwZWNpYWwvYXBwZWFyYW5jZS5qc29uJztcblxuZXhwb3J0IGNvbnN0IFNlbGVjdG9yICAgPSBTZWxlY3RvclR5cGUuR2V0V2l0aDtcbmV4cG9ydCBjb25zdCBDb21wb25lbnRzID0gVHJhbnNmb3JtQ29tcG9uZW50IHwgQXBwZWFyYW5jZUNvbXBvbmVudDtcblxuZXhwb3J0IGRlZmF1bHQgKGVudGl0aWVzLCBkZWx0YSwgb3B0cykgPT4ge1xuICAgIGNvbnNvbGUubG9nKFNlbGVjdG9yLCBvcHRzKTtcbiAgICBcbiAgICBmb3IgKHZhciBlbnRpdHkgb2YgZW50aXRpZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2coZW50aXR5KTtcbiAgICB9XG59OyIsImltcG9ydCAqIGFzIERJIGZyb20gJy4uL3NyYy9ESS9icm93c2VyJztcblxuaW1wb3J0IEdHIGZyb20gJy4uL3NyYy9nZyc7XG5cbmNvbnN0IGdnID0gbmV3IEdHKERJKTtcblxuaW1wb3J0IGFwcGVhcmFuY2UgZnJvbSAnL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9hcHAvc3BlY2lhbC9hcHBlYXJhbmNlLmpzb24nO1xuZ2cuZW50aXR5TWFuYWdlci5yZWdpc3RlckNvbXBvbmVudChhcHBlYXJhbmNlKTtcblxuaW1wb3J0IHRyYW5zZm9ybSBmcm9tICcvaG9tZS91YnVudHUvd29ya3NwYWNlL2FwcC9zcGVjaWFsL3RyYW5zZm9ybS5qc29uJztcbmdnLmVudGl0eU1hbmFnZXIucmVnaXN0ZXJDb21wb25lbnQodHJhbnNmb3JtKTtcblxuaW1wb3J0IHZlbG9jaXR5IGZyb20gJy9ob21lL3VidW50dS93b3Jrc3BhY2UvYXBwL3NwZWNpYWwvdmVsb2NpdHkuanNvbic7XG5nZy5lbnRpdHlNYW5hZ2VyLnJlZ2lzdGVyQ29tcG9uZW50KHZlbG9jaXR5KTtcblxuaW1wb3J0IG1vdmVtZW50LCB7IFNlbGVjdG9yIGFzIG1vdmVtZW50U2VsZWN0b3IsIENvbXBvbmVudHMgYXMgbW92ZW1lbnRDb21wb25lbnRzIH0gZnJvbSAnL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9hcHAvc3lzdGVtcy9sb2dpYy9tb3ZlbWVudCc7XG5nZy5lbnRpdHlNYW5hZ2VyLnJlZ2lzdGVyTG9naWNTeXN0ZW0obW92ZW1lbnRTZWxlY3RvciwgbW92ZW1lbnRDb21wb25lbnRzLCBtb3ZlbWVudCk7XG5cbmltcG9ydCByZW5kZXIsIHsgU2VsZWN0b3IgYXMgcmVuZGVyU2VsZWN0b3IsIENvbXBvbmVudHMgYXMgcmVuZGVyQ29tcG9uZW50cyB9IGZyb20gJy9ob21lL3VidW50dS93b3Jrc3BhY2UvYXBwL3N5c3RlbXMvcmVuZGVyL3JlbmRlcic7XG5nZy5lbnRpdHlNYW5hZ2VyLnJlZ2lzdGVyUmVuZGVyU3lzdGVtKHJlbmRlclNlbGVjdG9yLCByZW5kZXJDb21wb25lbnRzLCByZW5kZXIpO1xuXG5nZy5zdGFydCgpOyJdLCJuYW1lcyI6WyJ0aGlzIiwiRmV0Y2hGaWxlTG9hZGVyIiwiU2VsZWN0b3IiLCJDb21wb25lbnRzIiwiYXBwZWFyYW5jZSIsInRyYW5zZm9ybSIsIm1vdmVtZW50U2VsZWN0b3IiLCJtb3ZlbWVudENvbXBvbmVudHMiLCJyZW5kZXJTZWxlY3RvciIsInJlbmRlckNvbXBvbmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0EsRUFBQSxHQUFDLFVBQVMsQ0FBVCxFQUFXO0FBQUMsRUFBQSxhQUFTLENBQVQsQ0FBVyxDQUFYLEVBQWE7QUFBQyxFQUFBLFVBQUcsSUFBRSxFQUFFLENBQUYsQ0FBRixFQUFPLEVBQUUsSUFBRSxDQUFGLEdBQUksQ0FBSixDQUFGLEVBQVM7QUFBQyxFQUFBLGFBQUksS0FBRyxJQUFFLENBQUYsRUFBSSxJQUFFLENBQUYsRUFBSSxFQUFFLENBQUYsRUFBSSxDQUFKLENBQVgsRUFBa0IsSUFBRSxJQUFFLEdBQUYsS0FBUSxJQUFFLE1BQUksQ0FBSixHQUFNLE1BQUksQ0FBSixFQUFNLElBQUUsQ0FBRixFQUFJLElBQUUsQ0FBRixDQUE1QixFQUFpQyxHQUFuRCxFQUF1RCxJQUFFLENBQUYsRUFBSSxLQUFHLENBQUg7QUFBTSxFQUFBLGNBQUcsRUFBRSxDQUFGLEdBQUssS0FBRyxD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