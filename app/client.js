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

          this.geometries = new Map();
          this.materials = new Map();

          this.renderer = new three.WebGLRenderer({ antialias: true });
          this.camera = new three.PerspectiveCamera();

          this.renderer.setSize(window.innerWidth, window.innerHeight);

          document.body.appendChild(this.renderer.domElement);

          this.camera.position.y = 40;
          this.camera.position.z = 40;

          this.camera.lookAt(new three.Vector3(0.0, 0.0, 0.0));

          this.scene = new three.Scene();

          this.scene.add(new three.AmbientLight(0x404040));

          var directionalLight = new THREE.DirectionalLight(0xdd3333, 1.5);
          directionalLight.position.set(1, 1, 1).normalize();

          this.scene.add(directionalLight);

          this.geometries.set('cylinder', new three.CylinderGeometry(5, 5, 20, 32));
          this.materials.set('phong', new THREE.MeshPhongMaterial({ color: 0xdddddd, specular: 0x009900, shininess: 30, shading: THREE.FlatShading }));

          this.renderer.render(this.scene, this.camera);
      }

      babelHelpers.createClass(ThreeRendererManager, [{
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

  var GG = function () {
      function GG(di) {
          babelHelpers.classCallCheck(this, GG);

          this.entityManager = new EntityManager();

          this.di = di;
      }

      babelHelpers.createClass(GG, [{
          key: 'registerEntityConfiguration',
          value: function registerEntityConfiguration(key, entity) {
              this.entityManager.build();

              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                  for (var _iterator = entity.components[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                      var component = _step.value;

                      this.entityManager.withComponent(component);
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

              this.entityManager.registerConfiguration(key);
          }
      }, {
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
  var mesh = null;
  var appearance = {
  	gemoetry: gemoetry,
  	mesh: mesh
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

  var Components = [];

  function createUnit(entities, _ref) {
      var rendererManager = _ref.rendererManager;

      var _create = this.create(1, 'unit');

      var entity = _create.entity;


      entity.appearance.mesh = rendererManager.addMesh('cylinder', 'phong');

      console.log(entity);
  }

  var Components$1 = ['transform', 'velocity'];

  var movement = (function (entities) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
          for (var _iterator = entities[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var entity = _step.value.entity;
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

  var components = ["appearance", "velocity", "transform"];
  var unit = {
  	components: components
  };

  var gg = new GG(DI);

  gg.entityManager.registerComponent('appearance', appearance);

  gg.entityManager.registerComponent('transform', transform);

  gg.entityManager.registerComponent('velocity', velocity);

  gg.entityManager.registerInitSystem('createunit', Components, createUnit);

  gg.entityManager.registerLogicSystem('movement', Components$1, movement);

  gg.entityManager.registerRenderSystem('render', Components$2, render);

  gg.registerEntityConfiguration('unit', unit);

  gg.start();

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvbWFpbmxvb3AuanMvYnVpbGQvbWFpbmxvb3AubWluLmpzIiwiLi4vc3JjL2xvZ2ljL21haW5sb29wLWxvb3AtbWFuYWdlci5qcyIsIi4uL3NyYy9sb2dpYy9mZXRjaC1maWxlLWxvYWRlci5qcyIsIi4uL3NyYy92aWV3L3RocmVlLXJlbmRlcmVyLW1hbmFnZXIuanMiLCIuLi9zcmMvREkvYnJvd3Nlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9lbnRpdHktZmFjdG9yeS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9jb21wb25lbnQtbWFuYWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9zeXN0ZW0tbWFuYWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9ldmVudC1oYW5kbGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL3NyYy9jb3JlL2VudGl0eS1tYW5hZ2VyLmpzIiwiLi4vc3JjL2dnLmpzIiwiY29tcG9uZW50cy9hcHBlYXJhbmNlLmpzb24iLCJjb21wb25lbnRzL3RyYW5zZm9ybS5qc29uIiwiY29tcG9uZW50cy92ZWxvY2l0eS5qc29uIiwic3lzdGVtcy9pbml0L2NyZWF0ZS11bml0LmpzIiwic3lzdGVtcy9sb2dpYy9tb3ZlbWVudC5qcyIsInN5c3RlbXMvcmVuZGVyL3JlbmRlci5qcyIsImVudGl0aWVzL3VuaXQuanNvbiIsImNsaWVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIG1haW5sb29wLmpzIDEuMC4zLTIwMTYwMzIwXG4gKlxuICogQGF1dGhvciBJc2FhYyBTdWtpbiAoaHR0cDovL3d3dy5pc2FhY3N1a2luLmNvbS8pXG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuXG4hZnVuY3Rpb24oYSl7ZnVuY3Rpb24gYihhKXtpZih2PW8oYiksIShlK2o+YSkpe2ZvcihkKz1hLWUsZT1hLHIoYSxkKSxhPmcrMWUzJiYoZj0uMjUqaCsuNzUqZixnPWEsaD0wKSxoKyssaT0wO2Q+PWM7KWlmKHMoYyksZC09YywrK2k+PTI0MCl7bT0hMDticmVha310KGQvYyksdShmLG0pLG09ITF9fXZhciBjPTFlMy82MCxkPTAsZT0wLGY9NjAsZz0wLGg9MCxpPTAsaj0wLGs9ITEsbD0hMSxtPSExLG49XCJvYmplY3RcIj09dHlwZW9mIHdpbmRvdz93aW5kb3c6YSxvPW4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHxmdW5jdGlvbigpe3ZhciBhPURhdGUubm93KCksYixkO3JldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gYj1EYXRlLm5vdygpLGQ9TWF0aC5tYXgoMCxjLShiLWEpKSxhPWIrZCxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZShiK2QpfSxkKX19KCkscD1uLmNhbmNlbEFuaW1hdGlvbkZyYW1lfHxjbGVhclRpbWVvdXQscT1mdW5jdGlvbigpe30scj1xLHM9cSx0PXEsdT1xLHY7YS5NYWluTG9vcD17Z2V0U2ltdWxhdGlvblRpbWVzdGVwOmZ1bmN0aW9uKCl7cmV0dXJuIGN9LHNldFNpbXVsYXRpb25UaW1lc3RlcDpmdW5jdGlvbihhKXtyZXR1cm4gYz1hLHRoaXN9LGdldEZQUzpmdW5jdGlvbigpe3JldHVybiBmfSxnZXRNYXhBbGxvd2VkRlBTOmZ1bmN0aW9uKCl7cmV0dXJuIDFlMy9qfSxzZXRNYXhBbGxvd2VkRlBTOmZ1bmN0aW9uKGEpe3JldHVyblwidW5kZWZpbmVkXCI9PXR5cGVvZiBhJiYoYT0xLzApLDA9PT1hP3RoaXMuc3RvcCgpOmo9MWUzL2EsdGhpc30scmVzZXRGcmFtZURlbHRhOmZ1bmN0aW9uKCl7dmFyIGE9ZDtyZXR1cm4gZD0wLGF9LHNldEJlZ2luOmZ1bmN0aW9uKGEpe3JldHVybiByPWF8fHIsdGhpc30sc2V0VXBkYXRlOmZ1bmN0aW9uKGEpe3JldHVybiBzPWF8fHMsdGhpc30sc2V0RHJhdzpmdW5jdGlvbihhKXtyZXR1cm4gdD1hfHx0LHRoaXN9LHNldEVuZDpmdW5jdGlvbihhKXtyZXR1cm4gdT1hfHx1LHRoaXN9LHN0YXJ0OmZ1bmN0aW9uKCl7cmV0dXJuIGx8fChsPSEwLHY9byhmdW5jdGlvbihhKXt0KDEpLGs9ITAsZT1hLGc9YSxoPTAsdj1vKGIpfSkpLHRoaXN9LHN0b3A6ZnVuY3Rpb24oKXtyZXR1cm4gaz0hMSxsPSExLHAodiksdGhpc30saXNSdW5uaW5nOmZ1bmN0aW9uKCl7cmV0dXJuIGt9fSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGEuTWFpbkxvb3ApOlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJm51bGwhPT1tb2R1bGUmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUuZXhwb3J0cyYmKG1vZHVsZS5leHBvcnRzPWEuTWFpbkxvb3ApfSh0aGlzKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1haW5sb29wLm1pbi5qcy5tYXAiLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgTWFpbkxvb3AgZnJvbSAnbWFpbmxvb3AuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluTG9vcExvb3BNYW5hZ2VyIHtcbiAgICBzZXRVcGRhdGUodXBkYXRlTWV0aG9kIDogKGRlbHRhIDogbnVtYmVyKSA9PiB2b2lkKSA6IE1haW5Mb29wTG9vcE1hbmFnZXIge1xuICAgICAgICBNYWluTG9vcC5zZXRVcGRhdGUodXBkYXRlTWV0aG9kKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICBzZXRSZW5kZXIocmVuZGVyTWV0aG9kIDogKGludGVycG9sYXRpb25QZXJjZW50YWdlIDogbnVtYmVyKSA9PiB2b2lkKSA6IE1haW5Mb29wTG9vcE1hbmFnZXIge1xuICAgICAgICBNYWluTG9vcC5zZXREcmF3KHJlbmRlck1ldGhvZCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgc3RhcnQoKSA6IHZvaWQge1xuICAgICAgICBNYWluTG9vcC5zdGFydCgpO1xuICAgIH1cbn0iLCIvKiBAZmxvdyAqL1xuLyogZ2xvYmFsIGZldGNoICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbGVMb2FkZXIge1xuICAgIGdldChwYXRoKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChwYXRoKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiByZXMgPT09ICdzdHJpbmcnID8gSlNPTi5wYXJzZShyZXMpIDogcmVzO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn0iLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgdGhyZWUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaHJlZVJlbmRlcmVyTWFuYWdlciB7XG4gICAgcmVuZGVyZXIgICAgIDogdGhyZWUuV2ViR0xSZW5kZXJlcjtcbiAgICBjYW1lcmEgICAgICAgOiB0aHJlZS5DYW1lcmE7XG4gICAgZ2VvbWV0cmllcyAgIDogTWFwPHN0cmluZywgdGhyZWUuR2VvbWV0cnk+O1xuICAgIG1hdGVyaWFscyAgICA6IE1hcDxzdHJpbmcsIHRocmVlLk1hdGVyaWFsPjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5nZW9tZXRyaWVzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLm1hdGVyaWFscyA9IG5ldyBNYXAoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgdGhyZWUuV2ViR0xSZW5kZXJlcih7IGFudGlhbGlhcyA6IHRydWUgfSk7XG4gICAgICAgIHRoaXMuY2FtZXJhICAgPSBuZXcgdGhyZWUuUGVyc3BlY3RpdmVDYW1lcmEoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJlci5kb21FbGVtZW50KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnkgPSA0MDtcbiAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueiA9IDQwO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jYW1lcmEubG9va0F0KG5ldyB0aHJlZS5WZWN0b3IzKDAuMCwgMC4wLCAwLjApKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgdGhyZWUuU2NlbmUoKTtcblxuICAgICAgICB0aGlzLnNjZW5lLmFkZCggbmV3IHRocmVlLkFtYmllbnRMaWdodCggMHg0MDQwNDAgKSApO1xuICAgICAgICBcbiAgICAgICAgdmFyIGRpcmVjdGlvbmFsTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCggMHhkZDMzMzMsIDEuNSApO1xuXHRcdGRpcmVjdGlvbmFsTGlnaHQucG9zaXRpb24uc2V0KCAxLCAxLCAxICkubm9ybWFsaXplKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNjZW5lLmFkZCggZGlyZWN0aW9uYWxMaWdodCApO1xuXG4gICAgICAgIHRoaXMuZ2VvbWV0cmllcy5zZXQoJ2N5bGluZGVyJywgbmV3IHRocmVlLkN5bGluZGVyR2VvbWV0cnkoIDUsIDUsIDIwLCAzMiApKTtcbiAgICAgICAgdGhpcy5tYXRlcmlhbHMuc2V0KCdwaG9uZycsIG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCggeyBjb2xvcjogMHhkZGRkZGQsIHNwZWN1bGFyOiAweDAwOTkwMCwgc2hpbmluZXNzOiAzMCwgc2hhZGluZzogVEhSRUUuRmxhdFNoYWRpbmcgfSApKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0U2NlbmUoKSA6IHRocmVlLlNjZW5lIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NlbmU7XG4gICAgfVxuICAgIFxuICAgIGdldEdlb21ldHJ5KGtleSA6IHN0cmluZykgOiB0aHJlZS5HZW9tZXRyeSB7XG4gICAgICAgIHJldHVybiBnZW9tZXRyaWVzLmdldChrZXkpO1xuICAgIH1cbiAgICBcbiAgICBnZXRNYXRlcmlhbChrZXkgOiBzdHJpbmcpIDogdGhyZWUuTWF0ZXJpYWwge1xuICAgICAgICByZXR1cm4gbWF0ZXJpYWxzLmdldChrZXkpO1xuICAgIH1cbiAgICBcbiAgICBhZGRNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCkge1xuICAgICAgICB2YXIgZ2VvID0gdGhpcy5nZW9tZXRyaWVzLmdldChnZW9tZXRyeSk7XG4gICAgICAgIHZhciBtYXQgPSB0aGlzLm1hdGVyaWFscy5nZXQobWF0ZXJpYWwpO1xuICAgICAgICB2YXIgbWVzaCA9IG5ldyB0aHJlZS5NZXNoKGdlbywgbWF0KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKG1lc2gpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG1lc2g7XG4gICAgfVxuICAgIFxuICAgIHJlbmRlcihpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSA6IG51bWJlcikgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpO1xuICAgIH1cbiAgICBcbiAgICAvLyByZW5kZXIoc2NlbmUgOiB0aHJlZS5TY2VuZSwgaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UgOiBudW1iZXIpIDogdm9pZCB7XG4gICAgLy8gICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gICAgLy8gfVxufVxuIiwiaW1wb3J0IE1haW5Mb29wTG9vcE1hbmFnZXIgZnJvbSAnLi4vbG9naWMvbWFpbmxvb3AtbG9vcC1tYW5hZ2VyJztcbmltcG9ydCBGZXRjaEZpbGVMb2FkZXIgICAgIGZyb20gJy4uL2xvZ2ljL2ZldGNoLWZpbGUtbG9hZGVyJztcblxuaW1wb3J0IFRocmVlUmVuZGVyZXJNYW5hZ2VyIGZyb20gJy4uL3ZpZXcvdGhyZWUtcmVuZGVyZXItbWFuYWdlcic7XG5cbmNvbnN0IGxvb3BNYW5hZ2VyICAgICA9ICgpID0+IG5ldyBNYWluTG9vcExvb3BNYW5hZ2VyKCk7XG5jb25zdCBmaWxlTG9hZGVyICAgICAgPSAoKSA9PiBuZXcgRmV0Y2hGaWxlTG9hZGVyKCk7XG5jb25zdCByZW5kZXJlck1hbmFnZXIgPSAoKSA9PiBuZXcgVGhyZWVSZW5kZXJlck1hbmFnZXIoKTtcblxuZXhwb3J0IHsgbG9vcE1hbmFnZXIsIGZpbGVMb2FkZXIsIHJlbmRlcmVyTWFuYWdlciB9OyIsImltcG9ydCBFbnRpdHlNYW5hZ2VyIGZyb20gJy4vZW50aXR5LW1hbmFnZXInXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudGl0eUZhY3Rvcnkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVycyAgPSBuZXcgTWFwKClcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gbmV3IE1hcCgpXG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVySW5pdGlhbGl6ZXIoa2V5LCBpbml0aWFsaXplcikge1xuICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgfHwga2V5ID09PSAnJykge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdrZXkgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcuJylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdpbml0aWFsaXplciBtdXN0IGJlIGEgZnVuY3Rpb24uJylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5pbml0aWFsaXplcnMuc2V0KGtleSwgaW5pdGlhbGl6ZXIpXG4gICAgfVxuICAgIFxuICAgIGJ1aWxkKCkge1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSBuZXcgTWFwKClcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIFxuICAgIHdpdGhDb21wb25lbnQoa2V5LCBpbml0aWFsaXplcikge1xuICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgfHwga2V5ID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgaW5pdGlhbGl6ZXIgPSB0aGlzLmluaXRpYWxpemVycy5nZXQoa2V5KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uc2V0KGtleSwgaW5pdGlhbGl6ZXIpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGVDb25maWd1cmF0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uXG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZShlbnRpdHlNYW5hZ2VyLCBjb3VudCA9IDEsIGNvbmZpZ3VyYXRpb24gPSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCEoZW50aXR5TWFuYWdlciBpbnN0YW5jZW9mIEVudGl0eU1hbmFnZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gW11cbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbiB8fCB0aGlzLmNvbmZpZ3VyYXRpb25cbiAgICAgICAgXG4gICAgICAgIGxldCBjb21wb25lbnRzID0gW11cbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGNvbXBvbmVudCBvZiBjb25maWd1cmF0aW9uLmtleXMoKSkge1xuICAgICAgICAgICAgY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudClcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGVudGl0aWVzID0gW11cbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7ICsraSkge1xuICAgICAgICAgICAgbGV0IHsgaWQsIGVudGl0eSB9ID0gZW50aXR5TWFuYWdlci5uZXdFbnRpdHkoY29tcG9uZW50cylcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGlkID49IGVudGl0eU1hbmFnZXIuY2FwYWNpdHkpIHtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBbY29tcG9uZW50LCBpbml0aWFsaXplcl0gb2YgY29uZmlndXJhdGlvbikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5pdGlhbGl6ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gaW5pdGlhbGl6ZXIuY2FsbChlbnRpdHlbY29tcG9uZW50XSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVudGl0eVtjb21wb25lbnRdICE9PSAnb2JqZWN0JyAmJiByZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHlbY29tcG9uZW50XSA9IHJlc3VsdFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZW50aXRpZXMucHVzaCh7IGlkLCBlbnRpdHkgfSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLmxlbmd0aCA9PT0gMSA/IGVudGl0aWVzWzBdIDogZW50aXRpZXNcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcG9uZW50TWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IG5ldyBNYXAoKVxuICAgIH1cbiAgICBcbiAgICBuZXdDb21wb25lbnQoa2V5KSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KGtleSlcbiAgICAgICAgXG4gICAgICAgIGlmIChjb21wb25lbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgY29tcG9uZW50KSB7XG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBjb21wb25lbnQoKVxuICAgICAgICAgICAgY2FzZSAnb2JqZWN0JyAgOiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgoY29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXQgPSB7fVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoY29tcG9uZW50KS5mb3JFYWNoKGtleSA9PiByZXRba2V5XSA9IGNvbXBvbmVudFtrZXldKVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldFxuICAgICAgICAgICAgICAgIH0pKGNvbXBvbmVudClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudFxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyQ29tcG9uZW50KGtleSwgY29tcG9uZW50KSB7XG4gICAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyB8fCBrZXkgPT09ICcnKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2tleSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZy4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoY29tcG9uZW50ID09PSBudWxsIHx8IGNvbXBvbmVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvbXBvbmVudCBjYW5ub3QgYmUgbnVsbCBvciB1bmRlZmluZWQuJylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5jb21wb25lbnRzLnNldChrZXksIGNvbXBvbmVudClcblxuICAgICAgICByZXR1cm4ga2V5XG4gICAgfVxuICAgIFxuICAgIGdldENvbXBvbmVudHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudHNcbiAgICB9XG59IiwiZXhwb3J0IGNvbnN0IFN5c3RlbVR5cGUgPSB7XG4gICAgTG9naWMgIDogMCxcbiAgICBSZW5kZXIgOiAxLFxuICAgIEluaXQgICA6IDJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3lzdGVtTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubG9naWNTeXN0ZW1zICA9IG5ldyBNYXAoKVxuICAgICAgICB0aGlzLnJlbmRlclN5c3RlbXMgPSBuZXcgTWFwKClcbiAgICAgICAgdGhpcy5pbml0U3lzdGVtcyAgID0gbmV3IE1hcCgpXG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyU3lzdGVtKGtleSwgdHlwZSwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnIHx8IGtleSA9PT0gJycpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcigna2V5IG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nLicpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlICE9PSBTeXN0ZW1UeXBlLkxvZ2ljICYmIHR5cGUgIT09IFN5c3RlbVR5cGUuUmVuZGVyICYmIHR5cGUgIT09IFN5c3RlbVR5cGUuSW5pdCkge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCd0eXBlIG11c3QgYmUgYSB2YWxpZCBTeXN0ZW1UeXBlLicpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjb21wb25lbnRzKSkge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjb21wb25lbnRzIGFyZ3VtZW50IG11c3QgYmUgYW4gYXJyYXkgb2YgY29tcG9uZW50cy4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbi4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgc3lzdGVtID0ge1xuICAgICAgICAgICAgY29tcG9uZW50cyxcbiAgICAgICAgICAgIGNhbGxiYWNrXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBTeXN0ZW1UeXBlLkxvZ2ljIDogdGhpcy5sb2dpY1N5c3RlbXMuc2V0KGtleSwgc3lzdGVtKTsgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgU3lzdGVtVHlwZS5SZW5kZXIgOiB0aGlzLnJlbmRlclN5c3RlbXMuc2V0KGtleSwgc3lzdGVtKTsgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgU3lzdGVtVHlwZS5Jbml0IDogdGhpcy5pbml0U3lzdGVtcy5zZXQoa2V5LCBzeXN0ZW0pOyBicmVha1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4ga2V5XG4gICAgfVxuICAgIFxuICAgIHJlbW92ZVN5c3RlbShrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9naWNTeXN0ZW1zLmRlbGV0ZShrZXkpIHx8IHRoaXMucmVuZGVyU3lzdGVtcy5kZWxldGUoa2V5KSB8fCB0aGlzLmluaXRTeXN0ZW1zLmRlbGV0ZShrZXkpXG4gICAgfVxufSIsImltcG9ydCBFbnRpdHlNYW5hZ2VyIGZyb20gJy4vZW50aXR5LW1hbmFnZXInXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50SGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IE1hcCgpXG4gICAgfVxuICAgIFxuICAgIGVtcHR5UHJvbWlzZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIFxuICAgIHByb21pc2UoY2FsbGJhY2ssIGNvbnRleHQsIGFyZ3MsIHRpbWVvdXQpIHtcbiAgICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHlwZW9mIGNvbnRleHQgPT09ICAnb2JqZWN0JyA/IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgLi4uYXJncykgOiBjYWxsYmFjay5hcHBseShjb250ZXh0LCAuLi5hcmdzKSlcbiAgICAgICAgICAgICAgICB9LCB0aW1lb3V0KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh0eXBlb2YgY29udGV4dCA9PT0gJ29iamVjdCcgPyBjYWxsYmFjay5jYWxsKGNvbnRleHQsIC4uLmFyZ3MpIDogY2FsbGJhY2suYXBwbHkoY29udGV4dCwgLi4uYXJncykpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIFxuICAgIGxpc3RlbihldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKCF0aGlzLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5zZXQoZXZlbnQsIG5ldyBNYXAoKSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGV2ZW50SWQgPSAtMVxuICAgICAgICBcbiAgICAgICAgdGhpcy5ldmVudHMuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudElkID0gTWF0aC5tYXgoZXZlbnRJZCwgLi4uZXZlbnQua2V5cygpKVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICsrZXZlbnRJZFxuICAgICAgICBcbiAgICAgICAgdGhpcy5ldmVudHMuZ2V0KGV2ZW50KS5zZXQoZXZlbnRJZCwgY2FsbGJhY2spXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZXZlbnRJZFxuICAgIH1cbiAgICBcbiAgICBzdG9wTGlzdGVuKGV2ZW50SWQpIHtcbiAgICAgICAgZm9yIChsZXQgZXZlbnRzIG9mIHRoaXMuZXZlbnRzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpZCBvZiBldmVudHMua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlkID09PSBldmVudElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldmVudHMuZGVsZXRlKGV2ZW50SWQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXIoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcyBpbnN0YW5jZW9mIEVudGl0eU1hbmFnZXIgPyB0aGlzLmV2ZW50SGFuZGxlciA6IHRoaXNcbiAgICAgICAgXG4gICAgICAgIGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpXG4gICAgICAgIFxuICAgICAgICBsZXQgWyBldmVudCBdID0gYXJncy5zcGxpY2UoMCwgMSlcbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnQgIT09ICdzdHJpbmcnIHx8ICFzZWxmLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5lbXB0eVByb21pc2UoKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXVxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY2FsbGJhY2sgb2Ygc2VsZi5ldmVudHMuZ2V0KGV2ZW50KS52YWx1ZXMoKSkge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChzZWxmLnByb21pc2UoY2FsbGJhY2ssIHRoaXMsIGFyZ3MsIDEpKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpXG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXJEZWxheWVkKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXMgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyID8gdGhpcy5ldmVudEhhbmRsZXIgOiB0aGlzXG4gICAgICAgIFxuICAgICAgICBsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKVxuICAgICAgICBcbiAgICAgICAgbGV0IFsgZXZlbnQsIHRpbWVvdXQgXSA9IGFyZ3Muc3BsaWNlKDAsIDIpXG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCAhTnVtYmVyLmlzSW50ZWdlcih0aW1lb3V0KSB8fCAhc2VsZi5ldmVudHMuaGFzKGV2ZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuZW1wdHlQcm9taXNlKClcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHByb21pc2VzID0gW11cbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGNhbGxiYWNrIG9mIHNlbGYuZXZlbnRzLmdldChldmVudCkudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goc2VsZi5wcm9taXNlKGNhbGxiYWNrLCB0aGlzLCBhcmdzLCB0aW1lb3V0KSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKVxuICAgIH1cbn0iLCJpbXBvcnQgRW50aXR5RmFjdG9yeSAgICAgICAgICAgICAgICAgZnJvbSAnLi9lbnRpdHktZmFjdG9yeSdcbmltcG9ydCBDb21wb25lbnRNYW5hZ2VyICAgICAgICAgICAgICBmcm9tICcuL2NvbXBvbmVudC1tYW5hZ2VyJ1xuaW1wb3J0IFN5c3RlbU1hbmFnZXIsIHsgU3lzdGVtVHlwZSB9IGZyb20gJy4vc3lzdGVtLW1hbmFnZXInXG5pbXBvcnQgRXZlbnRIYW5kbGVyICAgICAgICAgICAgICAgICAgZnJvbSAnLi9ldmVudC1oYW5kbGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRpdHlNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcihjYXBhY2l0eSA9IDEwMDApIHtcbiAgICAgICAgdGhpcy5jYXBhY2l0eSAgICAgICAgID0gY2FwYWNpdHlcbiAgICAgICAgdGhpcy5jdXJyZW50TWF4RW50aXR5ID0gLTFcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeSAgICA9IG5ldyBFbnRpdHlGYWN0b3J5KClcbiAgICAgICAgdGhpcy5zeXN0ZW1NYW5hZ2VyICAgID0gbmV3IFN5c3RlbU1hbmFnZXIoKVxuICAgICAgICB0aGlzLmNvbXBvbmVudE1hbmFnZXIgPSBuZXcgQ29tcG9uZW50TWFuYWdlcigpXG4gICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyICAgICA9IG5ldyBFdmVudEhhbmRsZXIoKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdGllcyA9IEFycmF5LmZyb20oeyBsZW5ndGggOiB0aGlzLmNhcGFjaXR5IH0sICgpID0+ICh7IGNvbXBvbmVudHM6IFsgXSB9KSlcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXR5Q29uZmlndXJhdGlvbnMgPSBuZXcgTWFwKClcbiAgICB9XG4gICAgXG4gICAgaW5jcmVhc2VDYXBhY2l0eSgpIHtcbiAgICAgICAgbGV0IG9sZENhcGFjaXR5ID0gdGhpcy5jYXBhY2l0eVxuICAgICAgICBcbiAgICAgICAgdGhpcy5jYXBhY2l0eSAqPSAyXG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0aWVzID0gWy4uLnRoaXMuZW50aXRpZXMsIC4uLkFycmF5LmZyb20oeyBsZW5ndGggOiBvbGRDYXBhY2l0eSB9LCAoKSA9PiAoeyBjb21wb25lbnRzOiBbIF0gfSkpXVxuXG4gICAgICAgIGZvciAobGV0IGkgPSBvbGRDYXBhY2l0eTsgaSA8IHRoaXMuY2FwYWNpdHk7ICsraSkge1xuICAgICAgICAgICAgZm9yIChsZXQgY29tcG9uZW50IG9mIHRoaXMuY29tcG9uZW50TWFuYWdlci5nZXRDb21wb25lbnRzKCkua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tpXVtjb21wb25lbnRdID0gdGhpcy5jb21wb25lbnRNYW5hZ2VyLm5ld0NvbXBvbmVudChjb21wb25lbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbmV3RW50aXR5KGNvbXBvbmVudHMpIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbXBvbmVudHMpKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvbXBvbmVudHMgYXJndW1lbnQgbXVzdCBiZSBhbiBhcnJheSBvZiBjb21wb25lbnRzLicpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBpZCA9IDBcbiAgICAgICAgXG4gICAgICAgIGZvciAoOyBpZCA8IHRoaXMuY2FwYWNpdHk7ICsraWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChpZCA+PSB0aGlzLmNhcGFjaXR5KSB7XG4gICAgICAgICAgICAvLyB0b2RvOiBhdXRvIGluY3JlYXNlIGNhcGFjaXR5P1xuICAgICAgICAgICAgcmV0dXJuIHsgaWQgOiB0aGlzLmNhcGFjaXR5LCBlbnRpdHkgOiBudWxsIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSBpZFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzID0gY29tcG9uZW50c1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHsgaWQsIGVudGl0eSA6IHRoaXMuZW50aXRpZXNbaWRdIH1cbiAgICB9XG4gICAgXG4gICAgZGVsZXRlRW50aXR5KGlkKSB7XG4gICAgICAgIHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMgPSBbXVxuICAgICAgICBcbiAgICAgICAgaWYgKGlkIDwgdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IGlkOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbaV0uY29tcG9uZW50cy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSBpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSAwXG4gICAgfVxuXG4gICAgKmdldEVudGl0aWVzKGNvbXBvbmVudHMgPSBudWxsKSB7XG4gICAgICAgIGZvciAobGV0IGlkID0gMDsgaWQgPD0gdGhpcy5jdXJyZW50TWF4RW50aXR5OyArK2lkKSB7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50cyA9PT0gbnVsbCB8fCBjb21wb25lbnRzLmV2ZXJ5KGNvbXBvbmVudCA9PiB0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzLmluZGV4T2YoY29tcG9uZW50KSAhPT0gLTEpKSB7XG4gICAgICAgICAgICAgICAgeWllbGQgeyBpZCwgZW50aXR5IDogdGhpcy5lbnRpdGllc1tpZF0gfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyQ29uZmlndXJhdGlvbihrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnIHx8IGtleSA9PT0gJycpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcigna2V5IG11c3QgYmUgYSBub24gZW1wdHkgc3RyaW5nLicpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXR5Q29uZmlndXJhdGlvbnMuc2V0KGtleSwgdGhpcy5lbnRpdHlGYWN0b3J5LmNyZWF0ZUNvbmZpZ3VyYXRpb24oKSlcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBrZXlcbiAgICB9XG4gICAgXG4gICAgLy8gQ29tcG9uZW50IE1hbmFnZXJcbiAgICBcbiAgICByZWdpc3RlckNvbXBvbmVudChrZXksIGNvbXBvbmVudCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudE1hbmFnZXIucmVnaXN0ZXJDb21wb25lbnQoa2V5LCBjb21wb25lbnQpXG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBlbnRpdHkgb2YgdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgZW50aXR5W2tleV0gPSB0aGlzLmNvbXBvbmVudE1hbmFnZXIubmV3Q29tcG9uZW50KGtleSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGluaXRpYWxpemVyXG5cbiAgICAgICAgc3dpdGNoICh0eXBlb2YgY29tcG9uZW50KSB7XG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6IGluaXRpYWxpemVyID0gY29tcG9uZW50OyBicmVha1xuICAgICAgICAgICAgY2FzZSAnb2JqZWN0Jzoge1xuICAgICAgICAgICAgICAgIGluaXRpYWxpemVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhjb21wb25lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBjb21wb25lbnRba2V5XVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6IGluaXRpYWxpemVyID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb21wb25lbnQgfTsgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LnJlZ2lzdGVySW5pdGlhbGl6ZXIoa2V5LCBpbml0aWFsaXplcilcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBrZXlcbiAgICB9XG4gICAgXG4gICAgYWRkQ29tcG9uZW50KGlkLCBjb21wb25lbnRLZXkpIHtcbiAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMuaW5kZXhPZihjb21wb25lbnRLZXkpICE9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMucHVzaChjb21wb25lbnRLZXkpXG4gICAgfVxuICAgIFxuICAgIHJlbW92ZUNvbXBvbmVudChpZCwgY29tcG9uZW50KSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMuaW5kZXhPZihjb21wb25lbnQpXG4gICAgICAgIFxuICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdGllc1tpZF0uY29tcG9uZW50cy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuICAgIFxuICAgIC8vIFN5c3RlbSBNYW5hZ2VyXG4gICAgXG4gICAgcmVnaXN0ZXJTeXN0ZW0oa2V5LCB0eXBlLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlZ2lzdGVyU3lzdGVtKGtleSwgdHlwZSwgY29tcG9uZW50cywgY2FsbGJhY2spXG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyTG9naWNTeXN0ZW0oa2V5LCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlZ2lzdGVyU3lzdGVtKGtleSwgU3lzdGVtVHlwZS5Mb2dpYywgY29tcG9uZW50cywgY2FsbGJhY2spXG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyUmVuZGVyU3lzdGVtKGtleSwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbShrZXksIFN5c3RlbVR5cGUuUmVuZGVyLCBjb21wb25lbnRzLCBjYWxsYmFjaylcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJJbml0U3lzdGVtKGtleSwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbShrZXksIFN5c3RlbVR5cGUuSW5pdCwgY29tcG9uZW50cywgY2FsbGJhY2spXG4gICAgfVxuICAgIFxuICAgIHJlbW92ZVN5c3RlbShrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZW1vdmVTeXN0ZW0oa2V5KVxuICAgIH1cbiAgICBcbiAgICBvbkxvZ2ljKG9wdHMpIHtcbiAgICAgICAgZm9yIChsZXQgc3lzdGVtIG9mIHRoaXMuc3lzdGVtTWFuYWdlci5sb2dpY1N5c3RlbXMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMpLCBvcHRzKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uUmVuZGVyKG9wdHMpIHtcbiAgICAgICAgZm9yIChsZXQgc3lzdGVtIG9mIHRoaXMuc3lzdGVtTWFuYWdlci5yZW5kZXJTeXN0ZW1zLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBzeXN0ZW0uY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLmdldEVudGl0aWVzKHN5c3RlbS5jb21wb25lbnRzKSwgb3B0cylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5pdChvcHRzKSB7XG4gICAgICAgIGZvciAobGV0IHN5c3RlbSBvZiB0aGlzLnN5c3RlbU1hbmFnZXIuaW5pdFN5c3RlbXMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMpLCBvcHRzKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIEVudGl0eSBGYWN0b3J5XG4gICAgXG4gICAgcmVnaXN0ZXJJbml0aWFsaXplcihjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LnJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKVxuICAgIH1cbiAgICBcbiAgICBidWlsZCgpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LmJ1aWxkKClcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIFxuICAgIHdpdGhDb21wb25lbnQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS53aXRoQ29tcG9uZW50KGNvbXBvbmVudElkLCBpbml0aWFsaXplcilcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZShjb3VudCwga2V5KSB7XG4gICAgICAgIGxldCBjb25maWd1cmF0aW9uID0gdW5kZWZpbmVkXG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24gPSB0aGlzLmVudGl0eUNvbmZpZ3VyYXRpb25zLmdldChrZXkpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChjb25maWd1cmF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvdWxkIG5vdCBmaW5kIGVudGl0eSBjb25maWd1cmF0aW9uIGZvciB0aGUgc3VwcGxpZWQga2V5LiBpZiB5b3Ugd2lzaCB0byBjcmVhdGUgYW4gZW50aXR5IHdpdGhvdXQgYSBjb25maWd1cmF0aW9uLCBkbyBub3QgcGFzcyBhIGtleS4nKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy5lbnRpdHlGYWN0b3J5LmNyZWF0ZSh0aGlzLCBjb3VudCwgY29uZmlndXJhdGlvbilcbiAgICB9XG4gICAgXG4gICAgLy8gRXZlbnQgSGFuZGxlclxuICAgIFxuICAgIGxpc3RlbihldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLmxpc3RlbihldmVudCwgY2FsbGJhY2spXG4gICAgfVxuICAgIFxuICAgIHN0b3BMaXN0ZW4oZXZlbnRJZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIuc3RvcExpc3RlbihldmVudElkKVxuICAgIH1cbiAgICBcbiAgICB0cmlnZ2VyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlci5jYWxsKHRoaXMsIC4uLmFyZ3VtZW50cylcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlckRlbGF5ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyRGVsYXllZC5jYWxsKHRoaXMsIC4uLmFyZ3VtZW50cylcbiAgICB9XG59IiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IEVudGl0eU1hbmFnZXIgZnJvbSAnZ2ctZW50aXRpZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHRyB7XG4gICAgY29uc3RydWN0b3IoZGkpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlNYW5hZ2VyID0gbmV3IEVudGl0eU1hbmFnZXIoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZGkgPSBkaTtcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJFbnRpdHlDb25maWd1cmF0aW9uKGtleSwgZW50aXR5KSB7XG4gICAgICAgIHRoaXMuZW50aXR5TWFuYWdlci5idWlsZCgpXG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBjb21wb25lbnQgb2YgZW50aXR5LmNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5TWFuYWdlci53aXRoQ29tcG9uZW50KGNvbXBvbmVudClcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlNYW5hZ2VyLnJlZ2lzdGVyQ29uZmlndXJhdGlvbihrZXkpXG4gICAgfVxuICAgIFxuICAgIHN0YXJ0KCkge1xuICAgICAgICBjb25zdCBsb29wTWFuYWdlciAgICAgPSB0aGlzLmRpLmxvb3BNYW5hZ2VyKCk7XG4gICAgICAgIGNvbnN0IHJlbmRlcmVyTWFuYWdlciA9IHRoaXMuZGkucmVuZGVyZXJNYW5hZ2VyKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIub25Jbml0KHsgcmVuZGVyZXJNYW5hZ2VyIH0pO1xuICAgICAgICBcbiAgICAgICAgbG9vcE1hbmFnZXIuc2V0VXBkYXRlKGRlbHRhID0+IHRoaXMuZW50aXR5TWFuYWdlci5vbkxvZ2ljKGRlbHRhKSk7XG4gICAgICAgIFxuICAgICAgICBsb29wTWFuYWdlci5zZXRSZW5kZXIoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbnRpdHlNYW5hZ2VyLm9uUmVuZGVyKHsgZGVsdGEgOiBpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSwgcmVuZGVyZXJNYW5hZ2VyIH0pO1xuICAgICAgICAgICAgcmVuZGVyZXJNYW5hZ2VyLnJlbmRlcihpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgbG9vcE1hbmFnZXIuc3RhcnQoKTtcbiAgICB9XG59XG4vLyBpbXBvcnQgeyBGbGF0U2hhZGluZyB9IGZyb20gJy4vY29uc3RhbnRzL3NoYWRpbmcnO1xuXG4vLyB3aW5kb3cub25sb2FkID0gYXN5bmMgZnVuY3Rpb24oKSB7XG4vLyAgICAgY29uc3QgbGV2ZWxMb2FkZXIgICAgICAgPSBESS5sZXZlbExvYWRlcigpO1xuLy8gICAgIGNvbnN0IG1lc2hMb2FkZXIgICAgICAgID0gREkubWVzaExvYWRlcigpO1xuLy8gICAgIGNvbnN0IG1lc2hNYW5hZ2VyICAgICAgID0gREkubWVzaE1hbmFnZXIoKTtcbi8vICAgICBjb25zdCBzY2VuZU1hbmFnZXIgICAgICA9IERJLnNjZW5lTWFuYWdlcigpO1xuLy8gICAgIGNvbnN0IGVudGl0eU1hbmFnZXIgICAgID0gREkuZW50aXR5TWFuYWdlcigpO1xuLy8gICAgIGNvbnN0IHJlbmRlcmVyTWFuYWdlciAgID0gREkucmVuZGVyZXJNYW5hZ2VyKCk7XG4vLyAgICAgY29uc3QgbG9vcE1hbmFnZXIgICAgICAgPSBESS5sb29wTWFuYWdlcigpO1xuLy8gICAgIGNvbnN0IHBlcmZvcm1hbmNlVmlld2VyID0gREkucGVyZm9ybWFuY2VWaWV3ZXIoKTtcbiAgICBcbi8vICAgICBjb25zdCBzY2VuZUlkID0gc2NlbmVNYW5hZ2VyLmNyZWF0ZVNjZW5lKCk7XG4gICAgXG4vLyAgICAgY29uc3QgbGV2ZWwgID0gYXdhaXQgbGV2ZWxMb2FkZXIubG9hZExldmVsKCdsZXZlbHMvbGV2ZWwtb25lLmpzb24nKTtcbi8vICAgICBjb25zdCBtZXNoSWQgPSBtZXNoTWFuYWdlci5hZGRNZXNoKGF3YWl0IG1lc2hMb2FkZXIubG9hZCgnbWVzaGVzLycgKyBsZXZlbC5tZXNoLCB7IHNoYWRpbmcgOiBGbGF0U2hhZGluZyB9KSk7XG4gICAgXG4vLyAgICAgc2NlbmVNYW5hZ2VyLmFkZFRvU2NlbmUoc2NlbmVJZCwgbWVzaE1hbmFnZXIuZ2V0TWVzaChtZXNoSWQpKTtcbi8vICAgICBzY2VuZU1hbmFnZXIuYWRkQW1iaWVudExpZ2h0VG9TY2VuZShzY2VuZUlkLCAweDEwMTAzMCk7XG4vLyAgXHRzY2VuZU1hbmFnZXIuYWRkRGlyZWN0aW9uYWxMaWdodFRvU2NlbmUoc2NlbmVJZCwgMHhmZmVlZGQsIDAsIDAsIDEpO1xuICAgIFxuLy8gICAgIHZhciBtZXNoSXNBZGRlZCA9IHRydWU7XG4gICAgXG4vLyAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbi8vICAgICAgICAgaWYgKG1lc2hJc0FkZGVkKSB7XG4vLyAgICAgICAgICAgICBzY2VuZU1hbmFnZXIucmVtb3ZlRnJvbVNjZW5lKHNjZW5lSWQsIG1lc2hNYW5hZ2VyLmdldE1lc2gobWVzaElkKSk7XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICBzY2VuZU1hbmFnZXIuYWRkVG9TY2VuZShzY2VuZUlkLCBtZXNoTWFuYWdlci5nZXRNZXNoKG1lc2hJZCkpO1xuLy8gICAgICAgICB9XG4gICAgICAgIFxuLy8gICAgICAgICBtZXNoSXNBZGRlZCA9ICFtZXNoSXNBZGRlZDtcbi8vICAgICB9KTtcbiAgICBcbi8vICAgICBwZXJmb3JtYW5jZVZpZXdlci5zZXRNb2RlKDApO1xuICAgIFxuLy8gICAgIGxvb3BNYW5hZ2VyLnNldFVwZGF0ZShkZWx0YSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgICAgIG1lc2hNYW5hZ2VyLmdldE1lc2gobWVzaElkKS5yb3RhdGlvbi55ICs9IDAuMDAxICogZGVsdGE7XG4vLyAgICAgICAgICAgICAgICAgICAgIGVudGl0eU1hbmFnZXIub25Mb2dpYyhkZWx0YSk7XG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgLnNldFJlbmRlcihpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgICBwZXJmb3JtYW5jZVZpZXdlci5iZWdpbigpO1xuICAgICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgICAgICAgcmVuZGVyZXJNYW5hZ2VyLnJlbmRlcihzY2VuZU1hbmFnZXIuZ2V0U2NlbmUoc2NlbmVJZCksIGludGVycG9sYXRpb25QZXJjZW50YWdlKTtcbiAgICAgICAgICAgICAgICAgICBcbi8vICAgICAgICAgICAgICAgICAgIHBlcmZvcm1hbmNlVmlld2VyLmVuZCgpO1xuLy8gICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAuc3RhcnQoKTtcbi8vIH07Iiwie1xuICAgIFwiZ2Vtb2V0cnlcIjogXCJjeWxpbmRlclwiLFxuICAgIFwibWVzaFwiOiBudWxsXG59Iiwie1xuICAgIFwieFwiOiAxMCxcbiAgICBcInlcIjogMTAsXG4gICAgXCJ6XCI6IDEwXG59Iiwie1xuICAgIFwieFwiOiAyMCxcbiAgICBcInlcIjogMjAsXG4gICAgXCJ6XCI6IDIwXG59IiwiZXhwb3J0IGNvbnN0IENvbXBvbmVudHMgPSBbXVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVVbml0KGVudGl0aWVzLCB7IHJlbmRlcmVyTWFuYWdlciB9KSB7XG4gICAgbGV0IHsgZW50aXR5IH0gPSB0aGlzLmNyZWF0ZSgxLCAndW5pdCcpXG4gICAgXG4gICAgZW50aXR5LmFwcGVhcmFuY2UubWVzaCA9IHJlbmRlcmVyTWFuYWdlci5hZGRNZXNoKCdjeWxpbmRlcicsICdwaG9uZycpXG4gICAgXG4gICAgY29uc29sZS5sb2coZW50aXR5KVxufSIsImV4cG9ydCBjb25zdCBDb21wb25lbnRzID0gWyAndHJhbnNmb3JtJywgJ3ZlbG9jaXR5JyBdO1xuXG5leHBvcnQgZGVmYXVsdCAoZW50aXRpZXMpID0+IHtcbiAgICBmb3IgKHZhciB7IGVudGl0eSB9IG9mIGVudGl0aWVzKSB7XG4gICAgICAgIFxuICAgIH1cbn07IiwiZXhwb3J0IGNvbnN0IENvbXBvbmVudHMgPSBbICd0cmFuc2Zvcm0nLCAnYXBwZWFyYW5jZScgXTtcblxuZXhwb3J0IGRlZmF1bHQgKGVudGl0aWVzKSA9PiB7XG5cbn07Iiwie1xuICAgIFwiY29tcG9uZW50c1wiIDogWyBcImFwcGVhcmFuY2VcIiwgXCJ2ZWxvY2l0eVwiLCBcInRyYW5zZm9ybVwiIF1cbn0iLCJpbXBvcnQgKiBhcyBESSBmcm9tICcuLi9zcmMvREkvYnJvd3NlcidcblxuaW1wb3J0IEdHIGZyb20gJy4uL3NyYy9nZydcblxuY29uc3QgZ2cgPSBuZXcgR0coREkpXG5cbmltcG9ydCBhcHBlYXJhbmNlIGZyb20gJy9ob21lL3VidW50dS93b3Jrc3BhY2UvYXBwL2NvbXBvbmVudHMvYXBwZWFyYW5jZS5qc29uJ1xuZ2cuZW50aXR5TWFuYWdlci5yZWdpc3RlckNvbXBvbmVudCgnYXBwZWFyYW5jZScsIGFwcGVhcmFuY2UpXG5cbmltcG9ydCB0cmFuc2Zvcm0gZnJvbSAnL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9hcHAvY29tcG9uZW50cy90cmFuc2Zvcm0uanNvbidcbmdnLmVudGl0eU1hbmFnZXIucmVnaXN0ZXJDb21wb25lbnQoJ3RyYW5zZm9ybScsIHRyYW5zZm9ybSlcblxuaW1wb3J0IHZlbG9jaXR5IGZyb20gJy9ob21lL3VidW50dS93b3Jrc3BhY2UvYXBwL2NvbXBvbmVudHMvdmVsb2NpdHkuanNvbidcbmdnLmVudGl0eU1hbmFnZXIucmVnaXN0ZXJDb21wb25lbnQoJ3ZlbG9jaXR5JywgdmVsb2NpdHkpXG5cbmltcG9ydCBjcmVhdGV1bml0LCB7IENvbXBvbmVudHMgYXMgY3JlYXRldW5pdENvbXBvbmVudHMgfSBmcm9tICcvaG9tZS91YnVudHUvd29ya3NwYWNlL2FwcC9zeXN0ZW1zL2luaXQvY3JlYXRlLXVuaXQuanMnXG5nZy5lbnRpdHlNYW5hZ2VyLnJlZ2lzdGVySW5pdFN5c3RlbSgnY3JlYXRldW5pdCcsIGNyZWF0ZXVuaXRDb21wb25lbnRzLCBjcmVhdGV1bml0KVxuXG5pbXBvcnQgbW92ZW1lbnQsIHsgQ29tcG9uZW50cyBhcyBtb3ZlbWVudENvbXBvbmVudHMgfSBmcm9tICcvaG9tZS91YnVudHUvd29ya3NwYWNlL2FwcC9zeXN0ZW1zL2xvZ2ljL21vdmVtZW50LmpzJ1xuZ2cuZW50aXR5TWFuYWdlci5yZWdpc3RlckxvZ2ljU3lzdGVtKCdtb3ZlbWVudCcsIG1vdmVtZW50Q29tcG9uZW50cywgbW92ZW1lbnQpXG5cbmltcG9ydCByZW5kZXIsIHsgQ29tcG9uZW50cyBhcyByZW5kZXJDb21wb25lbnRzIH0gZnJvbSAnL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9hcHAvc3lzdGVtcy9yZW5kZXIvcmVuZGVyLmpzJ1xuZ2cuZW50aXR5TWFuYWdlci5yZWdpc3RlclJlbmRlclN5c3RlbSgncmVuZGVyJywgcmVuZGVyQ29tcG9uZW50cywgcmVuZGVyKVxuXG5pbXBvcnQgdW5pdCBmcm9tICcvaG9tZS91YnVudHUvd29ya3NwYWNlL2FwcC9lbnRpdGllcy91bml0Lmpzb24nXG5nZy5yZWdpc3RlckVudGl0eUNvbmZpZ3VyYXRpb24oJ3VuaXQnLCB1bml0KVxuXG5nZy5zdGFydCgpIl0sIm5hbWVzIjpbInRoaXMiLCJGZXRjaEZpbGVMb2FkZXIiLCJDb21wb25lbnRzIiwiY3JlYXRldW5pdENvbXBvbmVudHMiLCJjcmVhdGV1bml0IiwibW92ZW1lbnRDb21wb25lbnRzIiwicmVuZGVyQ29tcG9uZW50cyJdLCJt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