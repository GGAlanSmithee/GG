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

              console.log('adding mesh!', geo, mat, mesh);

              this.scene.add(mesh);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvbWFpbmxvb3AuanMvYnVpbGQvbWFpbmxvb3AubWluLmpzIiwiLi4vc3JjL2xvZ2ljL21haW5sb29wLWxvb3AtbWFuYWdlci5qcyIsIi4uL3NyYy9sb2dpYy9mZXRjaC1maWxlLWxvYWRlci5qcyIsIi4uL3NyYy92aWV3L3RocmVlLXJlbmRlcmVyLW1hbmFnZXIuanMiLCIuLi9zcmMvREkvYnJvd3Nlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9lbnRpdHktZmFjdG9yeS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9jb21wb25lbnQtbWFuYWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9zeXN0ZW0tbWFuYWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9ldmVudC1oYW5kbGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL3NyYy9jb3JlL2VudGl0eS1tYW5hZ2VyLmpzIiwiLi4vc3JjL2dnLmpzIiwic3BlY2lhbC9hcHBlYXJhbmNlLmpzb24iLCJzcGVjaWFsL3RyYW5zZm9ybS5qc29uIiwic3BlY2lhbC92ZWxvY2l0eS5qc29uIiwic3lzdGVtcy9pbml0L21lc2hlcy5qcyIsInN5c3RlbXMvbG9naWMvbW92ZW1lbnQuanMiLCJzeXN0ZW1zL3JlbmRlci9yZW5kZXIuanMiLCJjbGllbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBtYWlubG9vcC5qcyAxLjAuMy0yMDE2MDMyMFxuICpcbiAqIEBhdXRob3IgSXNhYWMgU3VraW4gKGh0dHA6Ly93d3cuaXNhYWNzdWtpbi5jb20vKVxuICogQGxpY2Vuc2UgTUlUXG4gKi9cblxuIWZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGIoYSl7aWYodj1vKGIpLCEoZStqPmEpKXtmb3IoZCs9YS1lLGU9YSxyKGEsZCksYT5nKzFlMyYmKGY9LjI1KmgrLjc1KmYsZz1hLGg9MCksaCsrLGk9MDtkPj1jOylpZihzKGMpLGQtPWMsKytpPj0yNDApe209ITA7YnJlYWt9dChkL2MpLHUoZixtKSxtPSExfX12YXIgYz0xZTMvNjAsZD0wLGU9MCxmPTYwLGc9MCxoPTAsaT0wLGo9MCxrPSExLGw9ITEsbT0hMSxuPVwib2JqZWN0XCI9PXR5cGVvZiB3aW5kb3c/d2luZG93OmEsbz1uLnJlcXVlc3RBbmltYXRpb25GcmFtZXx8ZnVuY3Rpb24oKXt2YXIgYT1EYXRlLm5vdygpLGIsZDtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIGI9RGF0ZS5ub3coKSxkPU1hdGgubWF4KDAsYy0oYi1hKSksYT1iK2Qsc2V0VGltZW91dChmdW5jdGlvbigpe2UoYitkKX0sZCl9fSgpLHA9bi5jYW5jZWxBbmltYXRpb25GcmFtZXx8Y2xlYXJUaW1lb3V0LHE9ZnVuY3Rpb24oKXt9LHI9cSxzPXEsdD1xLHU9cSx2O2EuTWFpbkxvb3A9e2dldFNpbXVsYXRpb25UaW1lc3RlcDpmdW5jdGlvbigpe3JldHVybiBjfSxzZXRTaW11bGF0aW9uVGltZXN0ZXA6ZnVuY3Rpb24oYSl7cmV0dXJuIGM9YSx0aGlzfSxnZXRGUFM6ZnVuY3Rpb24oKXtyZXR1cm4gZn0sZ2V0TWF4QWxsb3dlZEZQUzpmdW5jdGlvbigpe3JldHVybiAxZTMvan0sc2V0TWF4QWxsb3dlZEZQUzpmdW5jdGlvbihhKXtyZXR1cm5cInVuZGVmaW5lZFwiPT10eXBlb2YgYSYmKGE9MS8wKSwwPT09YT90aGlzLnN0b3AoKTpqPTFlMy9hLHRoaXN9LHJlc2V0RnJhbWVEZWx0YTpmdW5jdGlvbigpe3ZhciBhPWQ7cmV0dXJuIGQ9MCxhfSxzZXRCZWdpbjpmdW5jdGlvbihhKXtyZXR1cm4gcj1hfHxyLHRoaXN9LHNldFVwZGF0ZTpmdW5jdGlvbihhKXtyZXR1cm4gcz1hfHxzLHRoaXN9LHNldERyYXc6ZnVuY3Rpb24oYSl7cmV0dXJuIHQ9YXx8dCx0aGlzfSxzZXRFbmQ6ZnVuY3Rpb24oYSl7cmV0dXJuIHU9YXx8dSx0aGlzfSxzdGFydDpmdW5jdGlvbigpe3JldHVybiBsfHwobD0hMCx2PW8oZnVuY3Rpb24oYSl7dCgxKSxrPSEwLGU9YSxnPWEsaD0wLHY9byhiKX0pKSx0aGlzfSxzdG9wOmZ1bmN0aW9uKCl7cmV0dXJuIGs9ITEsbD0hMSxwKHYpLHRoaXN9LGlzUnVubmluZzpmdW5jdGlvbigpe3JldHVybiBrfX0sXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShhLk1haW5Mb29wKTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZudWxsIT09bW9kdWxlJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlLmV4cG9ydHMmJihtb2R1bGUuZXhwb3J0cz1hLk1haW5Mb29wKX0odGhpcyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWlubG9vcC5taW4uanMubWFwIiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IE1haW5Mb29wIGZyb20gJ21haW5sb29wLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbkxvb3BMb29wTWFuYWdlciB7XG4gICAgc2V0VXBkYXRlKHVwZGF0ZU1ldGhvZCA6IChkZWx0YSA6IG51bWJlcikgPT4gdm9pZCkgOiBNYWluTG9vcExvb3BNYW5hZ2VyIHtcbiAgICAgICAgTWFpbkxvb3Auc2V0VXBkYXRlKHVwZGF0ZU1ldGhvZCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgc2V0UmVuZGVyKHJlbmRlck1ldGhvZCA6IChpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSA6IG51bWJlcikgPT4gdm9pZCkgOiBNYWluTG9vcExvb3BNYW5hZ2VyIHtcbiAgICAgICAgTWFpbkxvb3Auc2V0RHJhdyhyZW5kZXJNZXRob2QpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIHN0YXJ0KCkgOiB2b2lkIHtcbiAgICAgICAgTWFpbkxvb3Auc3RhcnQoKTtcbiAgICB9XG59IiwiLyogQGZsb3cgKi9cbi8qIGdsb2JhbCBmZXRjaCAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWxlTG9hZGVyIHtcbiAgICBnZXQocGF0aCkge1xuICAgICAgICByZXR1cm4gZmV0Y2gocGF0aCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgcmVzID09PSAnc3RyaW5nJyA/IEpTT04ucGFyc2UocmVzKSA6IHJlcztcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59IiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IHRocmVlIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGhyZWVSZW5kZXJlck1hbmFnZXIge1xuICAgIHJlbmRlcmVyICAgICA6IHRocmVlLldlYkdMUmVuZGVyZXI7XG4gICAgY2FtZXJhICAgICAgIDogdGhyZWUuQ2FtZXJhO1xuICAgIGdlb21ldHJpZXMgICA6IE1hcDxzdHJpbmcsIHRocmVlLkdlb21ldHJ5PjtcbiAgICBtYXRlcmlhbHMgICAgOiBNYXA8c3RyaW5nLCB0aHJlZS5NYXRlcmlhbD47XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZ2VvbWV0cmllcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5tYXRlcmlhbHMgPSBuZXcgTWFwKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IHRocmVlLldlYkdMUmVuZGVyZXIoeyBhbnRpYWxpYXMgOiB0cnVlIH0pO1xuICAgICAgICB0aGlzLmNhbWVyYSAgID0gbmV3IHRocmVlLlBlcnNwZWN0aXZlQ2FtZXJhKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi55ID0gNDA7XG4gICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnogPSA0MDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2FtZXJhLmxvb2tBdChuZXcgdGhyZWUuVmVjdG9yMygwLjAsIDAuMCwgMC4wKSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IHRocmVlLlNjZW5lKCk7XG5cbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoIG5ldyB0aHJlZS5BbWJpZW50TGlnaHQoIDB4NDA0MDQwICkgKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBkaXJlY3Rpb25hbExpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoIDB4ZGQzMzMzLCAxLjUgKTtcblx0XHRkaXJlY3Rpb25hbExpZ2h0LnBvc2l0aW9uLnNldCggMSwgMSwgMSApLm5vcm1hbGl6ZSgpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoIGRpcmVjdGlvbmFsTGlnaHQgKTtcblxuICAgICAgICB0aGlzLmdlb21ldHJpZXMuc2V0KCdjeWxpbmRlcicsIG5ldyB0aHJlZS5DeWxpbmRlckdlb21ldHJ5KCA1LCA1LCAyMCwgMzIgKSk7XG4gICAgICAgIHRoaXMubWF0ZXJpYWxzLnNldCgncGhvbmcnLCBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoIHsgY29sb3I6IDB4ZGRkZGRkLCBzcGVjdWxhcjogMHgwMDk5MDAsIHNoaW5pbmVzczogMzAsIHNoYWRpbmc6IFRIUkVFLkZsYXRTaGFkaW5nIH0gKSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gICAgfVxuICAgIFxuICAgIGdldFNjZW5lKCkgOiB0aHJlZS5TY2VuZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjZW5lO1xuICAgIH1cbiAgICBcbiAgICBnZXRHZW9tZXRyeShrZXkgOiBzdHJpbmcpIDogdGhyZWUuR2VvbWV0cnkge1xuICAgICAgICByZXR1cm4gZ2VvbWV0cmllcy5nZXQoa2V5KTtcbiAgICB9XG4gICAgXG4gICAgZ2V0TWF0ZXJpYWwoa2V5IDogc3RyaW5nKSA6IHRocmVlLk1hdGVyaWFsIHtcbiAgICAgICAgcmV0dXJuIG1hdGVyaWFscy5nZXQoa2V5KTtcbiAgICB9XG4gICAgXG4gICAgYWRkTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpIHtcbiAgICAgICAgdmFyIGdlbyA9IHRoaXMuZ2VvbWV0cmllcy5nZXQoZ2VvbWV0cnkpO1xuICAgICAgICB2YXIgbWF0ID0gdGhpcy5tYXRlcmlhbHMuZ2V0KG1hdGVyaWFsKTtcbiAgICAgICAgdmFyIG1lc2ggPSBuZXcgdGhyZWUuTWVzaChnZW8sIG1hdCk7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZygnYWRkaW5nIG1lc2ghJywgZ2VvLCBtYXQsIG1lc2gpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQobWVzaCk7XG4gICAgfVxuICAgIFxuICAgIHJlbmRlcihpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSA6IG51bWJlcikgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpO1xuICAgIH1cbiAgICBcbiAgICAvLyByZW5kZXIoc2NlbmUgOiB0aHJlZS5TY2VuZSwgaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UgOiBudW1iZXIpIDogdm9pZCB7XG4gICAgLy8gICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gICAgLy8gfVxufVxuIiwiaW1wb3J0IE1haW5Mb29wTG9vcE1hbmFnZXIgZnJvbSAnLi4vbG9naWMvbWFpbmxvb3AtbG9vcC1tYW5hZ2VyJztcbmltcG9ydCBGZXRjaEZpbGVMb2FkZXIgICAgIGZyb20gJy4uL2xvZ2ljL2ZldGNoLWZpbGUtbG9hZGVyJztcblxuaW1wb3J0IFRocmVlUmVuZGVyZXJNYW5hZ2VyIGZyb20gJy4uL3ZpZXcvdGhyZWUtcmVuZGVyZXItbWFuYWdlcic7XG5cbmNvbnN0IGxvb3BNYW5hZ2VyICAgICA9ICgpID0+IG5ldyBNYWluTG9vcExvb3BNYW5hZ2VyKCk7XG5jb25zdCBmaWxlTG9hZGVyICAgICAgPSAoKSA9PiBuZXcgRmV0Y2hGaWxlTG9hZGVyKCk7XG5jb25zdCByZW5kZXJlck1hbmFnZXIgPSAoKSA9PiBuZXcgVGhyZWVSZW5kZXJlck1hbmFnZXIoKTtcblxuZXhwb3J0IHsgbG9vcE1hbmFnZXIsIGZpbGVMb2FkZXIsIHJlbmRlcmVyTWFuYWdlciB9OyIsImltcG9ydCBFbnRpdHlNYW5hZ2VyIGZyb20gJy4vZW50aXR5LW1hbmFnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRpdHlGYWN0b3J5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplcnMgID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVySW5pdGlhbGl6ZXIoa2V5LCBpbml0aWFsaXplcikge1xuICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgfHwga2V5ID09PSAnJykge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdrZXkgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcuJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgaW5pdGlhbGl6ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignaW5pdGlhbGl6ZXIgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmluaXRpYWxpemVycy5zZXQoa2V5LCBpbml0aWFsaXplcik7XG4gICAgfVxuICAgIFxuICAgIGJ1aWxkKCkge1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSBuZXcgTWFwKCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgd2l0aENvbXBvbmVudChrZXksIGluaXRpYWxpemVyKSB7XG4gICAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyB8fCBrZXkgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgaW5pdGlhbGl6ZXIgPSB0aGlzLmluaXRpYWxpemVycy5nZXQoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnNldChrZXksIGluaXRpYWxpemVyKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGVDb25maWd1cmF0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGUoZW50aXR5TWFuYWdlciwgY291bnQgPSAxLCBjb25maWd1cmF0aW9uID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICghKGVudGl0eU1hbmFnZXIgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyKSkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGNvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uIHx8IHRoaXMuY29uZmlndXJhdGlvbjtcbiAgICAgICAgXG4gICAgICAgIGxldCBjb21wb25lbnRzID0gW107XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBjb21wb25lbnQgb2YgY29uZmlndXJhdGlvbi5rZXlzKCkpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgZW50aXRpZXMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7ICsraSkge1xuICAgICAgICAgICAgbGV0IHsgaWQsIGVudGl0eSB9ID0gZW50aXR5TWFuYWdlci5uZXdFbnRpdHkoY29tcG9uZW50cyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChpZCA+PSBlbnRpdHlNYW5hZ2VyLmNhcGFjaXR5KSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IFtjb21wb25lbnQsIGluaXRpYWxpemVyXSBvZiBjb25maWd1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gaW5pdGlhbGl6ZXIuY2FsbChlbnRpdHlbY29tcG9uZW50XSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlbnRpdHlbY29tcG9uZW50XSAhPT0gJ29iamVjdCcgJiYgcmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5W2NvbXBvbmVudF0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBlbnRpdGllcy5wdXNoKHsgaWQsIGVudGl0eSB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLmxlbmd0aCA9PT0gMSA/IGVudGl0aWVzWzBdIDogZW50aXRpZXM7XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBvbmVudE1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIFxuICAgIG5ld0NvbXBvbmVudChrZXkpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50cy5nZXQoa2V5KTtcbiAgICAgICAgXG4gICAgICAgIGlmIChjb21wb25lbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHN3aXRjaCAodHlwZW9mIGNvbXBvbmVudCkge1xuICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgY29tcG9uZW50KCk7XG4gICAgICAgICAgICBjYXNlICdvYmplY3QnICA6IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKChjb21wb25lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJldCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoY29tcG9uZW50KS5mb3JFYWNoKGtleSA9PiByZXRba2V5XSA9IGNvbXBvbmVudFtrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICAgICAgfSkoY29tcG9uZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckNvbXBvbmVudChrZXksIGNvbXBvbmVudCkge1xuICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgfHwga2V5ID09PSAnJykge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdrZXkgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcuJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChjb21wb25lbnQgPT09IG51bGwgfHwgY29tcG9uZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignY29tcG9uZW50IGNhbm5vdCBiZSBudWxsIG9yIHVuZGVmaW5lZC4nKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5jb21wb25lbnRzLnNldChrZXksIGNvbXBvbmVudCk7XG5cbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gICAgXG4gICAgZ2V0Q29tcG9uZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50cztcbiAgICB9XG59IiwiZXhwb3J0IGNvbnN0IFN5c3RlbVR5cGUgPSB7XG4gICAgTG9naWMgIDogMCxcbiAgICBSZW5kZXIgOiAxLFxuICAgIEluaXQgICA6IDJcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN5c3RlbU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmxvZ2ljU3lzdGVtcyAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMucmVuZGVyU3lzdGVtcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5pbml0U3lzdGVtcyAgID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBcbiAgICByZWdpc3RlclN5c3RlbShrZXksIHR5cGUsIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyB8fCBrZXkgPT09ICcnKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2tleSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZy4nKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGUgIT09IFN5c3RlbVR5cGUuTG9naWMgJiYgdHlwZSAhPT0gU3lzdGVtVHlwZS5SZW5kZXIgJiYgdHlwZSAhPT0gU3lzdGVtVHlwZS5Jbml0KSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ3R5cGUgbXVzdCBiZSBhIHZhbGlkIFN5c3RlbVR5cGUuJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjb21wb25lbnRzKSkge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjb21wb25lbnRzIGFyZ3VtZW50IG11c3QgYmUgYW4gYXJyYXkgb2YgY29tcG9uZW50cy4nKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBzeXN0ZW0gPSB7XG4gICAgICAgICAgICBjb21wb25lbnRzLFxuICAgICAgICAgICAgY2FsbGJhY2tcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBTeXN0ZW1UeXBlLkxvZ2ljIDogdGhpcy5sb2dpY1N5c3RlbXMuc2V0KGtleSwgc3lzdGVtKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFN5c3RlbVR5cGUuUmVuZGVyIDogdGhpcy5yZW5kZXJTeXN0ZW1zLnNldChrZXksIHN5c3RlbSk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTeXN0ZW1UeXBlLkluaXQgOiB0aGlzLmluaXRTeXN0ZW1zLnNldChrZXksIHN5c3RlbSk7IGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgICBcbiAgICByZW1vdmVTeXN0ZW0oa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2ljU3lzdGVtcy5kZWxldGUoa2V5KSB8fCB0aGlzLnJlbmRlclN5c3RlbXMuZGVsZXRlKGtleSkgfHwgdGhpcy5pbml0U3lzdGVtcy5kZWxldGUoa2V5KTtcbiAgICB9XG59IiwiaW1wb3J0IEVudGl0eU1hbmFnZXIgZnJvbSAnLi9lbnRpdHktbWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50SGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBcbiAgICBlbXB0eVByb21pc2UoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHByb21pc2UoY2FsbGJhY2ssIGNvbnRleHQsIGFyZ3MsIHRpbWVvdXQpIHtcbiAgICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHlwZW9mIGNvbnRleHQgPT09ICAnb2JqZWN0JyA/IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgLi4uYXJncykgOiBjYWxsYmFjay5hcHBseShjb250ZXh0LCAuLi5hcmdzKSk7XG4gICAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh0eXBlb2YgY29udGV4dCA9PT0gJ29iamVjdCcgPyBjYWxsYmFjay5jYWxsKGNvbnRleHQsIC4uLmFyZ3MpIDogY2FsbGJhY2suYXBwbHkoY29udGV4dCwgLi4uYXJncykpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgbGlzdGVuKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKCF0aGlzLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5zZXQoZXZlbnQsIG5ldyBNYXAoKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBldmVudElkID0gLTE7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50SWQgPSBNYXRoLm1heChldmVudElkLCAuLi5ldmVudC5rZXlzKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICsrZXZlbnRJZDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZXZlbnRzLmdldChldmVudCkuc2V0KGV2ZW50SWQsIGNhbGxiYWNrKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBldmVudElkO1xuICAgIH1cbiAgICBcbiAgICBzdG9wTGlzdGVuKGV2ZW50SWQpIHtcbiAgICAgICAgZm9yIChsZXQgZXZlbnRzIG9mIHRoaXMuZXZlbnRzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpZCBvZiBldmVudHMua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlkID09PSBldmVudElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldmVudHMuZGVsZXRlKGV2ZW50SWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlcigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlciA/IHRoaXMuZXZlbnRIYW5kbGVyIDogdGhpcztcbiAgICAgICAgXG4gICAgICAgIGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xuICAgICAgICBcbiAgICAgICAgbGV0IFsgZXZlbnQgXSA9IGFyZ3Muc3BsaWNlKDAsIDEpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgIXNlbGYuZXZlbnRzLmhhcyhldmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmVtcHR5UHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGNhbGxiYWNrIG9mIHNlbGYuZXZlbnRzLmdldChldmVudCkudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goc2VsZi5wcm9taXNlKGNhbGxiYWNrLCB0aGlzLCBhcmdzLCAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXJEZWxheWVkKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXMgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyID8gdGhpcy5ldmVudEhhbmRsZXIgOiB0aGlzO1xuICAgICAgICBcbiAgICAgICAgbGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG4gICAgICAgIFxuICAgICAgICBsZXQgWyBldmVudCwgdGltZW91dCBdID0gYXJncy5zcGxpY2UoMCwgMik7XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCAhTnVtYmVyLmlzSW50ZWdlcih0aW1lb3V0KSB8fCAhc2VsZi5ldmVudHMuaGFzKGV2ZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuZW1wdHlQcm9taXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY2FsbGJhY2sgb2Ygc2VsZi5ldmVudHMuZ2V0KGV2ZW50KS52YWx1ZXMoKSkge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChzZWxmLnByb21pc2UoY2FsbGJhY2ssIHRoaXMsIGFyZ3MsIHRpbWVvdXQpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9XG59IiwiaW1wb3J0IEVudGl0eUZhY3RvcnkgICAgICAgICAgICAgICAgIGZyb20gJy4vZW50aXR5LWZhY3RvcnknO1xuaW1wb3J0IENvbXBvbmVudE1hbmFnZXIgICAgICAgICAgICAgIGZyb20gJy4vY29tcG9uZW50LW1hbmFnZXInO1xuaW1wb3J0IFN5c3RlbU1hbmFnZXIsIHsgU3lzdGVtVHlwZSB9IGZyb20gJy4vc3lzdGVtLW1hbmFnZXInO1xuaW1wb3J0IEV2ZW50SGFuZGxlciAgICAgICAgICAgICAgICAgIGZyb20gJy4vZXZlbnQtaGFuZGxlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudGl0eU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKGNhcGFjaXR5ID0gMTAwMCkge1xuICAgICAgICB0aGlzLmNhcGFjaXR5ICAgICAgICAgPSBjYXBhY2l0eTtcbiAgICAgICAgdGhpcy5jdXJyZW50TWF4RW50aXR5ID0gLTE7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkgICAgPSBuZXcgRW50aXR5RmFjdG9yeSgpO1xuICAgICAgICB0aGlzLnN5c3RlbU1hbmFnZXIgICAgPSBuZXcgU3lzdGVtTWFuYWdlcigpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudE1hbmFnZXIgPSBuZXcgQ29tcG9uZW50TWFuYWdlcigpO1xuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlciAgICAgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0aWVzID0gQXJyYXkuZnJvbSh7IGxlbmd0aCA6IHRoaXMuY2FwYWNpdHkgfSwgKCkgPT4gKHsgY29tcG9uZW50czogWyBdIH0pKTtcbiAgICB9XG4gICAgXG4gICAgaW5jcmVhc2VDYXBhY2l0eSgpIHtcbiAgICAgICAgbGV0IG9sZENhcGFjaXR5ID0gdGhpcy5jYXBhY2l0eTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2FwYWNpdHkgKj0gMjtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXRpZXMgPSBbLi4udGhpcy5lbnRpdGllcywgLi4uQXJyYXkuZnJvbSh7IGxlbmd0aCA6IG9sZENhcGFjaXR5IH0sICgpID0+ICh7IGNvbXBvbmVudHM6IFsgXSB9KSldO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBvbGRDYXBhY2l0eTsgaSA8IHRoaXMuY2FwYWNpdHk7ICsraSkge1xuICAgICAgICAgICAgZm9yIChsZXQgY29tcG9uZW50IG9mIHRoaXMuY29tcG9uZW50TWFuYWdlci5nZXRDb21wb25lbnRzKCkua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tpXVtjb21wb25lbnRdID0gdGhpcy5jb21wb25lbnRNYW5hZ2VyLm5ld0NvbXBvbmVudChjb21wb25lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG5ld0VudGl0eShjb21wb25lbnRzKSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjb21wb25lbnRzKSkge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjb21wb25lbnRzIGFyZ3VtZW50IG11c3QgYmUgYW4gYXJyYXkgb2YgY29tcG9uZW50cy4nKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGlkID0gMDtcbiAgICAgICAgXG4gICAgICAgIGZvciAoOyBpZCA8IHRoaXMuY2FwYWNpdHk7ICsraWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoaWQgPj0gdGhpcy5jYXBhY2l0eSkge1xuICAgICAgICAgICAgLy8gdG9kbzogYXV0byBpbmNyZWFzZSBjYXBhY2l0eT9cbiAgICAgICAgICAgIHJldHVybiB7IGlkIDogdGhpcy5jYXBhY2l0eSwgZW50aXR5IDogbnVsbCB9O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoaWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IGlkO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzID0gY29tcG9uZW50cztcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB7IGlkLCBlbnRpdHkgOiB0aGlzLmVudGl0aWVzW2lkXSB9O1xuICAgIH1cbiAgICBcbiAgICBkZWxldGVFbnRpdHkoaWQpIHtcbiAgICAgICAgdGhpcy5lbnRpdGllc1tpZF0uY29tcG9uZW50cyA9IFtdO1xuICAgICAgICBcbiAgICAgICAgaWYgKGlkIDwgdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSBpZDsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2ldLmNvbXBvbmVudHMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TWF4RW50aXR5ID0gaTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSAwO1xuICAgIH1cblxuICAgICpnZXRFbnRpdGllcyhjb21wb25lbnRzID0gbnVsbCkge1xuICAgICAgICBmb3IgKGxldCBpZCA9IDA7IGlkIDw9IHRoaXMuY3VycmVudE1heEVudGl0eTsgKytpZCkge1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudHMgPT09IG51bGwgfHwgY29tcG9uZW50cy5ldmVyeShjb21wb25lbnQgPT4gdGhpcy5lbnRpdGllc1tpZF0uY29tcG9uZW50cy5pbmRleE9mKGNvbXBvbmVudCkgIT09IC0xKSkge1xuICAgICAgICAgICAgICAgIHlpZWxkIHsgaWQsIGVudGl0eSA6IHRoaXMuZW50aXRpZXNbaWRdIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gQ29tcG9uZW50IE1hbmFnZXJcbiAgICBcbiAgICByZWdpc3RlckNvbXBvbmVudChrZXksIGNvbXBvbmVudCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudE1hbmFnZXIucmVnaXN0ZXJDb21wb25lbnQoa2V5LCBjb21wb25lbnQpO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgZW50aXR5IG9mIHRoaXMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgIGVudGl0eVtrZXldID0gdGhpcy5jb21wb25lbnRNYW5hZ2VyLm5ld0NvbXBvbmVudChrZXkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgaW5pdGlhbGl6ZXI7XG5cbiAgICAgICAgc3dpdGNoICh0eXBlb2YgY29tcG9uZW50KSB7XG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6IGluaXRpYWxpemVyID0gY29tcG9uZW50OyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6IHtcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMoY29tcG9uZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gY29tcG9uZW50W2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OiBpbml0aWFsaXplciA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29tcG9uZW50OyB9OyBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LnJlZ2lzdGVySW5pdGlhbGl6ZXIoa2V5LCBpbml0aWFsaXplcik7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgICBcbiAgICBhZGRDb21wb25lbnQoaWQsIGNvbXBvbmVudEtleSkge1xuICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tpZF0uY29tcG9uZW50cy5pbmRleE9mKGNvbXBvbmVudEtleSkgIT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMucHVzaChjb21wb25lbnRLZXkpO1xuICAgIH1cbiAgICBcbiAgICByZW1vdmVDb21wb25lbnQoaWQsIGNvbXBvbmVudCkge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzLmluZGV4T2YoY29tcG9uZW50KTtcbiAgICAgICAgXG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdGllc1tpZF0uY29tcG9uZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICBcbiAgICAvLyBTeXN0ZW0gTWFuYWdlclxuICAgIFxuICAgIHJlZ2lzdGVyU3lzdGVtKGtleSwgdHlwZSwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbShrZXksIHR5cGUsIGNvbXBvbmVudHMsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJMb2dpY1N5c3RlbShrZXksIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVnaXN0ZXJTeXN0ZW0oa2V5LCBTeXN0ZW1UeXBlLkxvZ2ljLCBjb21wb25lbnRzLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyUmVuZGVyU3lzdGVtKGtleSwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbShrZXksIFN5c3RlbVR5cGUuUmVuZGVyLCBjb21wb25lbnRzLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVySW5pdFN5c3RlbShrZXksIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVnaXN0ZXJTeXN0ZW0oa2V5LCBTeXN0ZW1UeXBlLkluaXQsIGNvbXBvbmVudHMsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgXG4gICAgcmVtb3ZlU3lzdGVtKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlbW92ZVN5c3RlbShrZXkpO1xuICAgIH1cbiAgICBcbiAgICBvbkxvZ2ljKG9wdHMpIHtcbiAgICAgICAgZm9yIChsZXQgc3lzdGVtIG9mIHRoaXMuc3lzdGVtTWFuYWdlci5sb2dpY1N5c3RlbXMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMpLCBvcHRzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvblJlbmRlcihvcHRzKSB7XG4gICAgICAgIGZvciAobGV0IHN5c3RlbSBvZiB0aGlzLnN5c3RlbU1hbmFnZXIucmVuZGVyU3lzdGVtcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgc3lzdGVtLmNhbGxiYWNrLmNhbGwodGhpcywgdGhpcy5nZXRFbnRpdGllcyhzeXN0ZW0uY29tcG9uZW50cyksIG9wdHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Jbml0KG9wdHMpIHtcbiAgICAgICAgZm9yIChsZXQgc3lzdGVtIG9mIHRoaXMuc3lzdGVtTWFuYWdlci5pbml0U3lzdGVtcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgc3lzdGVtLmNhbGxiYWNrLmNhbGwodGhpcywgdGhpcy5nZXRFbnRpdGllcyhzeXN0ZW0uY29tcG9uZW50cyksIG9wdHMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIEVudGl0eSBGYWN0b3J5XG4gICAgXG4gICAgcmVnaXN0ZXJJbml0aWFsaXplcihjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LnJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKTtcbiAgICB9XG4gICAgXG4gICAgYnVpbGQoKSB7XG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS5idWlsZCgpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIHdpdGhDb21wb25lbnQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS53aXRoQ29tcG9uZW50KGNvbXBvbmVudElkLCBpbml0aWFsaXplcik7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlQ29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW50aXR5RmFjdG9yeS5jcmVhdGVDb25maWd1cmF0aW9uKCk7XG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZShjb3VudCwgY29uZmlndXJhdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnRpdHlGYWN0b3J5LmNyZWF0ZSh0aGlzLCBjb3VudCwgY29uZmlndXJhdGlvbik7XG4gICAgfVxuICAgIFxuICAgIC8vIEV2ZW50IEhhbmRsZXJcbiAgICBcbiAgICBsaXN0ZW4oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci5saXN0ZW4oZXZlbnQsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgXG4gICAgc3RvcExpc3RlbihldmVudElkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci5zdG9wTGlzdGVuKGV2ZW50SWQpO1xuICAgIH1cbiAgICBcbiAgICB0cmlnZ2VyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlci5jYWxsKHRoaXMsIC4uLmFyZ3VtZW50cyk7XG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXJEZWxheWVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlckRlbGF5ZWQuY2FsbCh0aGlzLCAuLi5hcmd1bWVudHMpO1xuICAgIH1cbn0iLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgRW50aXR5TWFuYWdlciBmcm9tICdnZy1lbnRpdGllcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdHIHtcbiAgICBjb25zdHJ1Y3RvcihkaSkge1xuICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIgPSBuZXcgRW50aXR5TWFuYWdlcigpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5kaSA9IGRpO1xuICAgIH1cbiAgICBcbiAgICBzdGFydCgpIHtcbiAgICAgICAgY29uc3QgbG9vcE1hbmFnZXIgICAgID0gdGhpcy5kaS5sb29wTWFuYWdlcigpO1xuICAgICAgICBjb25zdCByZW5kZXJlck1hbmFnZXIgPSB0aGlzLmRpLnJlbmRlcmVyTWFuYWdlcigpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlNYW5hZ2VyLm9uSW5pdCh7IHJlbmRlcmVyTWFuYWdlciB9KTtcbiAgICAgICAgXG4gICAgICAgIGxvb3BNYW5hZ2VyLnNldFVwZGF0ZShkZWx0YSA9PiB0aGlzLmVudGl0eU1hbmFnZXIub25Mb2dpYyhkZWx0YSkpO1xuICAgICAgICBcbiAgICAgICAgbG9vcE1hbmFnZXIuc2V0UmVuZGVyKGludGVycG9sYXRpb25QZXJjZW50YWdlID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5TWFuYWdlci5vblJlbmRlcih7IGRlbHRhIDogaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UsIHJlbmRlcmVyTWFuYWdlciB9KTtcbiAgICAgICAgICAgIHJlbmRlcmVyTWFuYWdlci5yZW5kZXIoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGxvb3BNYW5hZ2VyLnN0YXJ0KCk7XG4gICAgfVxufVxuLy8gaW1wb3J0IHsgRmxhdFNoYWRpbmcgfSBmcm9tICcuL2NvbnN0YW50cy9zaGFkaW5nJztcblxuLy8gd2luZG93Lm9ubG9hZCA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuLy8gICAgIGNvbnN0IGxldmVsTG9hZGVyICAgICAgID0gREkubGV2ZWxMb2FkZXIoKTtcbi8vICAgICBjb25zdCBtZXNoTG9hZGVyICAgICAgICA9IERJLm1lc2hMb2FkZXIoKTtcbi8vICAgICBjb25zdCBtZXNoTWFuYWdlciAgICAgICA9IERJLm1lc2hNYW5hZ2VyKCk7XG4vLyAgICAgY29uc3Qgc2NlbmVNYW5hZ2VyICAgICAgPSBESS5zY2VuZU1hbmFnZXIoKTtcbi8vICAgICBjb25zdCBlbnRpdHlNYW5hZ2VyICAgICA9IERJLmVudGl0eU1hbmFnZXIoKTtcbi8vICAgICBjb25zdCByZW5kZXJlck1hbmFnZXIgICA9IERJLnJlbmRlcmVyTWFuYWdlcigpO1xuLy8gICAgIGNvbnN0IGxvb3BNYW5hZ2VyICAgICAgID0gREkubG9vcE1hbmFnZXIoKTtcbi8vICAgICBjb25zdCBwZXJmb3JtYW5jZVZpZXdlciA9IERJLnBlcmZvcm1hbmNlVmlld2VyKCk7XG4gICAgXG4vLyAgICAgY29uc3Qgc2NlbmVJZCA9IHNjZW5lTWFuYWdlci5jcmVhdGVTY2VuZSgpO1xuICAgIFxuLy8gICAgIGNvbnN0IGxldmVsICA9IGF3YWl0IGxldmVsTG9hZGVyLmxvYWRMZXZlbCgnbGV2ZWxzL2xldmVsLW9uZS5qc29uJyk7XG4vLyAgICAgY29uc3QgbWVzaElkID0gbWVzaE1hbmFnZXIuYWRkTWVzaChhd2FpdCBtZXNoTG9hZGVyLmxvYWQoJ21lc2hlcy8nICsgbGV2ZWwubWVzaCwgeyBzaGFkaW5nIDogRmxhdFNoYWRpbmcgfSkpO1xuICAgIFxuLy8gICAgIHNjZW5lTWFuYWdlci5hZGRUb1NjZW5lKHNjZW5lSWQsIG1lc2hNYW5hZ2VyLmdldE1lc2gobWVzaElkKSk7XG4vLyAgICAgc2NlbmVNYW5hZ2VyLmFkZEFtYmllbnRMaWdodFRvU2NlbmUoc2NlbmVJZCwgMHgxMDEwMzApO1xuLy8gIFx0c2NlbmVNYW5hZ2VyLmFkZERpcmVjdGlvbmFsTGlnaHRUb1NjZW5lKHNjZW5lSWQsIDB4ZmZlZWRkLCAwLCAwLCAxKTtcbiAgICBcbi8vICAgICB2YXIgbWVzaElzQWRkZWQgPSB0cnVlO1xuICAgIFxuLy8gICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4vLyAgICAgICAgIGlmIChtZXNoSXNBZGRlZCkge1xuLy8gICAgICAgICAgICAgc2NlbmVNYW5hZ2VyLnJlbW92ZUZyb21TY2VuZShzY2VuZUlkLCBtZXNoTWFuYWdlci5nZXRNZXNoKG1lc2hJZCkpO1xuLy8gICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgc2NlbmVNYW5hZ2VyLmFkZFRvU2NlbmUoc2NlbmVJZCwgbWVzaE1hbmFnZXIuZ2V0TWVzaChtZXNoSWQpKTtcbi8vICAgICAgICAgfVxuICAgICAgICBcbi8vICAgICAgICAgbWVzaElzQWRkZWQgPSAhbWVzaElzQWRkZWQ7XG4vLyAgICAgfSk7XG4gICAgXG4vLyAgICAgcGVyZm9ybWFuY2VWaWV3ZXIuc2V0TW9kZSgwKTtcbiAgICBcbi8vICAgICBsb29wTWFuYWdlci5zZXRVcGRhdGUoZGVsdGEgPT4ge1xuLy8gICAgICAgICAgICAgICAgICAgICBtZXNoTWFuYWdlci5nZXRNZXNoKG1lc2hJZCkucm90YXRpb24ueSArPSAwLjAwMSAqIGRlbHRhO1xuLy8gICAgICAgICAgICAgICAgICAgICBlbnRpdHlNYW5hZ2VyLm9uTG9naWMoZGVsdGEpO1xuLy8gICAgICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAgIC5zZXRSZW5kZXIoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UgPT4ge1xuLy8gICAgICAgICAgICAgICAgICAgcGVyZm9ybWFuY2VWaWV3ZXIuYmVnaW4oKTtcbiAgICAgICAgICAgICAgICAgICBcbi8vICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyTWFuYWdlci5yZW5kZXIoc2NlbmVNYW5hZ2VyLmdldFNjZW5lKHNjZW5lSWQpLCBpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSk7XG4gICAgICAgICAgICAgICAgICAgXG4vLyAgICAgICAgICAgICAgICAgICBwZXJmb3JtYW5jZVZpZXdlci5lbmQoKTtcbi8vICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgLnN0YXJ0KCk7XG4vLyB9OyIsIntcbiAgICBcImdlbW9ldHJ5XCIgOiBcImN5bGluZGVyXCJcbn0iLCJ7XG4gICAgXCJ4XCI6IDEwLFxuICAgIFwieVwiOiAxMCxcbiAgICBcInpcIjogMTBcbn0iLCJ7XG4gICAgXCJ4XCI6IDIwLFxuICAgIFwieVwiOiAyMCxcbiAgICBcInpcIjogMjBcbn0iLCJleHBvcnQgY29uc3QgQ29tcG9uZW50cyA9IFsgJ2FwcGVhcmFuY2UnIF07XG5cbmV4cG9ydCBkZWZhdWx0IChlbnRpdGllcywgeyByZW5kZXJlck1hbmFnZXIgfSkgPT4ge1xuICAgIHJlbmRlcmVyTWFuYWdlci5hZGRNZXNoKCdjeWxpbmRlcicsICdwaG9uZycpO1xufTsiLCJleHBvcnQgY29uc3QgQ29tcG9uZW50cyA9IFsgJ3RyYW5zZm9ybScsICd2ZWxvY2l0eScgXTtcblxuZXhwb3J0IGRlZmF1bHQgKGVudGl0aWVzKSA9PiB7XG4gICAgZm9yICh2YXIgeyBlbnRpdHkgfSBvZiBlbnRpdGllcykge1xuICAgICAgICBjb25zb2xlLmxvZyhlbnRpdHkpO1xuICAgIH1cbn07IiwiZXhwb3J0IGNvbnN0IENvbXBvbmVudHMgPSBbICd0cmFuc2Zvcm0nLCAnYXBwZWFyYW5jZScgXTtcblxuZXhwb3J0IGRlZmF1bHQgKGVudGl0aWVzKSA9PiB7XG5cbn07IiwiaW1wb3J0ICogYXMgREkgZnJvbSAnLi4vc3JjL0RJL2Jyb3dzZXInO1xuXG5pbXBvcnQgR0cgZnJvbSAnLi4vc3JjL2dnJztcblxuY29uc3QgZ2cgPSBuZXcgR0coREkpO1xuXG5pbXBvcnQgYXBwZWFyYW5jZSBmcm9tICcvaG9tZS91YnVudHUvd29ya3NwYWNlL2FwcC9zcGVjaWFsL2FwcGVhcmFuY2UuanNvbic7XG5nZy5lbnRpdHlNYW5hZ2VyLnJlZ2lzdGVyQ29tcG9uZW50KCdhcHBlYXJhbmNlJywgYXBwZWFyYW5jZSk7XG5cbmltcG9ydCB0cmFuc2Zvcm0gZnJvbSAnL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9hcHAvc3BlY2lhbC90cmFuc2Zvcm0uanNvbic7XG5nZy5lbnRpdHlNYW5hZ2VyLnJlZ2lzdGVyQ29tcG9uZW50KCd0cmFuc2Zvcm0nLCB0cmFuc2Zvcm0pO1xuXG5pbXBvcnQgdmVsb2NpdHkgZnJvbSAnL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9hcHAvc3BlY2lhbC92ZWxvY2l0eS5qc29uJztcbmdnLmVudGl0eU1hbmFnZXIucmVnaXN0ZXJDb21wb25lbnQoJ3ZlbG9jaXR5JywgdmVsb2NpdHkpO1xuXG5pbXBvcnQgbWVzaGVzLCB7IENvbXBvbmVudHMgYXMgbWVzaGVzQ29tcG9uZW50cyB9IGZyb20gJy9ob21lL3VidW50dS93b3Jrc3BhY2UvYXBwL3N5c3RlbXMvaW5pdC9tZXNoZXMnO1xuZ2cuZW50aXR5TWFuYWdlci5yZWdpc3RlckluaXRTeXN0ZW0oJ21lc2hlcycsIG1lc2hlc0NvbXBvbmVudHMsIG1lc2hlcyk7XG5cbmltcG9ydCBtb3ZlbWVudCwgeyBDb21wb25lbnRzIGFzIG1vdmVtZW50Q29tcG9uZW50cyB9IGZyb20gJy9ob21lL3VidW50dS93b3Jrc3BhY2UvYXBwL3N5c3RlbXMvbG9naWMvbW92ZW1lbnQnO1xuZ2cuZW50aXR5TWFuYWdlci5yZWdpc3RlckxvZ2ljU3lzdGVtKCdtb3ZlbWVudCcsIG1vdmVtZW50Q29tcG9uZW50cywgbW92ZW1lbnQpO1xuXG5pbXBvcnQgcmVuZGVyLCB7IENvbXBvbmVudHMgYXMgcmVuZGVyQ29tcG9uZW50cyB9IGZyb20gJy9ob21lL3VidW50dS93b3Jrc3BhY2UvYXBwL3N5c3RlbXMvcmVuZGVyL3JlbmRlcic7XG5nZy5lbnRpdHlNYW5hZ2VyLnJlZ2lzdGVyUmVuZGVyU3lzdGVtKCdyZW5kZXInLCByZW5kZXJDb21wb25lbnRzLCByZW5kZXIpO1xuXG5nZy5zdGFydCgpOyJdLCJuYW1lcyI6WyJ0aGlzIiwiRmV0Y2hGaWxlTG9hZGVyIiwiQ29tcG9uZW50cyIsIm1lc2hlc0NvbXBvbmVudHMiLCJtb3ZlbWVudENvbXBvbmVudHMiLCJyZW5kZXJDb21wb25lbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9BLEVBQUEsR0FBQyxVQUFTLENBQVQsRUFBVztBQUFDLEVBQUEsYUFBUyxDQUFULENBQVcsQ0FBWCxFQUFhO0FBQUMsRUFBQSxVQUFHLElBQUUsRUFBRSxDQUFGLENBQUYsRUFBTyxFQUFFLElBQUUsQ0FBRixHQUFJLENBQUosQ0FBRixFQUFTO0FBQUMsRUFB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