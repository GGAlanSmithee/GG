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
  var id = 0;
  var appearance = {
  	gemoetry: gemoetry,
  	id: id
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


      entity.appearance.id = rendererManager.addMesh('cylinder', 'phong');

      console.log(entity);
  }

  var Components$1 = ['appearance'];

  var meshes = (function (entities, _ref) {
      // rendererManager.addMesh('cylinder', 'phong')

      var rendererManager = _ref.rendererManager;
  })

  var Components$2 = ['transform', 'velocity'];

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

  var Components$3 = ['transform', 'appearance'];

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

  gg.entityManager.registerInitSystem('meshes', Components$1, meshes);

  gg.entityManager.registerLogicSystem('movement', Components$2, movement);

  gg.entityManager.registerRenderSystem('render', Components$3, render);

  gg.registerEntityConfiguration('unit', unit);

  gg.start();

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvbWFpbmxvb3AuanMvYnVpbGQvbWFpbmxvb3AubWluLmpzIiwiLi4vc3JjL2xvZ2ljL21haW5sb29wLWxvb3AtbWFuYWdlci5qcyIsIi4uL3NyYy9sb2dpYy9mZXRjaC1maWxlLWxvYWRlci5qcyIsIi4uL3NyYy92aWV3L3RocmVlLXJlbmRlcmVyLW1hbmFnZXIuanMiLCIuLi9zcmMvREkvYnJvd3Nlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9lbnRpdHktZmFjdG9yeS5qcyIsIi4uL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9jb21wb25lbnQtbWFuYWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9zeXN0ZW0tbWFuYWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9ldmVudC1oYW5kbGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL3NyYy9jb3JlL2VudGl0eS1tYW5hZ2VyLmpzIiwiLi4vc3JjL2dnLmpzIiwiY29tcG9uZW50cy9hcHBlYXJhbmNlLmpzb24iLCJjb21wb25lbnRzL3RyYW5zZm9ybS5qc29uIiwiY29tcG9uZW50cy92ZWxvY2l0eS5qc29uIiwic3lzdGVtcy9pbml0L2NyZWF0ZS11bml0LmpzIiwic3lzdGVtcy9pbml0L21lc2hlcy5qcyIsInN5c3RlbXMvbG9naWMvbW92ZW1lbnQuanMiLCJzeXN0ZW1zL3JlbmRlci9yZW5kZXIuanMiLCJlbnRpdGllcy91bml0Lmpzb24iLCJjbGllbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBtYWlubG9vcC5qcyAxLjAuMy0yMDE2MDMyMFxuICpcbiAqIEBhdXRob3IgSXNhYWMgU3VraW4gKGh0dHA6Ly93d3cuaXNhYWNzdWtpbi5jb20vKVxuICogQGxpY2Vuc2UgTUlUXG4gKi9cblxuIWZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGIoYSl7aWYodj1vKGIpLCEoZStqPmEpKXtmb3IoZCs9YS1lLGU9YSxyKGEsZCksYT5nKzFlMyYmKGY9LjI1KmgrLjc1KmYsZz1hLGg9MCksaCsrLGk9MDtkPj1jOylpZihzKGMpLGQtPWMsKytpPj0yNDApe209ITA7YnJlYWt9dChkL2MpLHUoZixtKSxtPSExfX12YXIgYz0xZTMvNjAsZD0wLGU9MCxmPTYwLGc9MCxoPTAsaT0wLGo9MCxrPSExLGw9ITEsbT0hMSxuPVwib2JqZWN0XCI9PXR5cGVvZiB3aW5kb3c/d2luZG93OmEsbz1uLnJlcXVlc3RBbmltYXRpb25GcmFtZXx8ZnVuY3Rpb24oKXt2YXIgYT1EYXRlLm5vdygpLGIsZDtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIGI9RGF0ZS5ub3coKSxkPU1hdGgubWF4KDAsYy0oYi1hKSksYT1iK2Qsc2V0VGltZW91dChmdW5jdGlvbigpe2UoYitkKX0sZCl9fSgpLHA9bi5jYW5jZWxBbmltYXRpb25GcmFtZXx8Y2xlYXJUaW1lb3V0LHE9ZnVuY3Rpb24oKXt9LHI9cSxzPXEsdD1xLHU9cSx2O2EuTWFpbkxvb3A9e2dldFNpbXVsYXRpb25UaW1lc3RlcDpmdW5jdGlvbigpe3JldHVybiBjfSxzZXRTaW11bGF0aW9uVGltZXN0ZXA6ZnVuY3Rpb24oYSl7cmV0dXJuIGM9YSx0aGlzfSxnZXRGUFM6ZnVuY3Rpb24oKXtyZXR1cm4gZn0sZ2V0TWF4QWxsb3dlZEZQUzpmdW5jdGlvbigpe3JldHVybiAxZTMvan0sc2V0TWF4QWxsb3dlZEZQUzpmdW5jdGlvbihhKXtyZXR1cm5cInVuZGVmaW5lZFwiPT10eXBlb2YgYSYmKGE9MS8wKSwwPT09YT90aGlzLnN0b3AoKTpqPTFlMy9hLHRoaXN9LHJlc2V0RnJhbWVEZWx0YTpmdW5jdGlvbigpe3ZhciBhPWQ7cmV0dXJuIGQ9MCxhfSxzZXRCZWdpbjpmdW5jdGlvbihhKXtyZXR1cm4gcj1hfHxyLHRoaXN9LHNldFVwZGF0ZTpmdW5jdGlvbihhKXtyZXR1cm4gcz1hfHxzLHRoaXN9LHNldERyYXc6ZnVuY3Rpb24oYSl7cmV0dXJuIHQ9YXx8dCx0aGlzfSxzZXRFbmQ6ZnVuY3Rpb24oYSl7cmV0dXJuIHU9YXx8dSx0aGlzfSxzdGFydDpmdW5jdGlvbigpe3JldHVybiBsfHwobD0hMCx2PW8oZnVuY3Rpb24oYSl7dCgxKSxrPSEwLGU9YSxnPWEsaD0wLHY9byhiKX0pKSx0aGlzfSxzdG9wOmZ1bmN0aW9uKCl7cmV0dXJuIGs9ITEsbD0hMSxwKHYpLHRoaXN9LGlzUnVubmluZzpmdW5jdGlvbigpe3JldHVybiBrfX0sXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShhLk1haW5Mb29wKTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZudWxsIT09bW9kdWxlJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlLmV4cG9ydHMmJihtb2R1bGUuZXhwb3J0cz1hLk1haW5Mb29wKX0odGhpcyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWlubG9vcC5taW4uanMubWFwIiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IE1haW5Mb29wIGZyb20gJ21haW5sb29wLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbkxvb3BMb29wTWFuYWdlciB7XG4gICAgc2V0VXBkYXRlKHVwZGF0ZU1ldGhvZCA6IChkZWx0YSA6IG51bWJlcikgPT4gdm9pZCkgOiBNYWluTG9vcExvb3BNYW5hZ2VyIHtcbiAgICAgICAgTWFpbkxvb3Auc2V0VXBkYXRlKHVwZGF0ZU1ldGhvZCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgc2V0UmVuZGVyKHJlbmRlck1ldGhvZCA6IChpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSA6IG51bWJlcikgPT4gdm9pZCkgOiBNYWluTG9vcExvb3BNYW5hZ2VyIHtcbiAgICAgICAgTWFpbkxvb3Auc2V0RHJhdyhyZW5kZXJNZXRob2QpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIHN0YXJ0KCkgOiB2b2lkIHtcbiAgICAgICAgTWFpbkxvb3Auc3RhcnQoKTtcbiAgICB9XG59IiwiLyogQGZsb3cgKi9cbi8qIGdsb2JhbCBmZXRjaCAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWxlTG9hZGVyIHtcbiAgICBnZXQocGF0aCkge1xuICAgICAgICByZXR1cm4gZmV0Y2gocGF0aCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgcmVzID09PSAnc3RyaW5nJyA/IEpTT04ucGFyc2UocmVzKSA6IHJlcztcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59IiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IHRocmVlIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGhyZWVSZW5kZXJlck1hbmFnZXIge1xuICAgIHJlbmRlcmVyICAgICA6IHRocmVlLldlYkdMUmVuZGVyZXI7XG4gICAgY2FtZXJhICAgICAgIDogdGhyZWUuQ2FtZXJhO1xuICAgIGdlb21ldHJpZXMgICA6IE1hcDxzdHJpbmcsIHRocmVlLkdlb21ldHJ5PjtcbiAgICBtYXRlcmlhbHMgICAgOiBNYXA8c3RyaW5nLCB0aHJlZS5NYXRlcmlhbD47XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZ2VvbWV0cmllcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5tYXRlcmlhbHMgPSBuZXcgTWFwKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IHRocmVlLldlYkdMUmVuZGVyZXIoeyBhbnRpYWxpYXMgOiB0cnVlIH0pO1xuICAgICAgICB0aGlzLmNhbWVyYSAgID0gbmV3IHRocmVlLlBlcnNwZWN0aXZlQ2FtZXJhKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi55ID0gNDA7XG4gICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnogPSA0MDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2FtZXJhLmxvb2tBdChuZXcgdGhyZWUuVmVjdG9yMygwLjAsIDAuMCwgMC4wKSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IHRocmVlLlNjZW5lKCk7XG5cbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoIG5ldyB0aHJlZS5BbWJpZW50TGlnaHQoIDB4NDA0MDQwICkgKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBkaXJlY3Rpb25hbExpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoIDB4ZGQzMzMzLCAxLjUgKTtcblx0XHRkaXJlY3Rpb25hbExpZ2h0LnBvc2l0aW9uLnNldCggMSwgMSwgMSApLm5vcm1hbGl6ZSgpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoIGRpcmVjdGlvbmFsTGlnaHQgKTtcblxuICAgICAgICB0aGlzLmdlb21ldHJpZXMuc2V0KCdjeWxpbmRlcicsIG5ldyB0aHJlZS5DeWxpbmRlckdlb21ldHJ5KCA1LCA1LCAyMCwgMzIgKSk7XG4gICAgICAgIHRoaXMubWF0ZXJpYWxzLnNldCgncGhvbmcnLCBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoIHsgY29sb3I6IDB4ZGRkZGRkLCBzcGVjdWxhcjogMHgwMDk5MDAsIHNoaW5pbmVzczogMzAsIHNoYWRpbmc6IFRIUkVFLkZsYXRTaGFkaW5nIH0gKSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gICAgfVxuICAgIFxuICAgIGdldFNjZW5lKCkgOiB0aHJlZS5TY2VuZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjZW5lO1xuICAgIH1cbiAgICBcbiAgICBnZXRHZW9tZXRyeShrZXkgOiBzdHJpbmcpIDogdGhyZWUuR2VvbWV0cnkge1xuICAgICAgICByZXR1cm4gZ2VvbWV0cmllcy5nZXQoa2V5KTtcbiAgICB9XG4gICAgXG4gICAgZ2V0TWF0ZXJpYWwoa2V5IDogc3RyaW5nKSA6IHRocmVlLk1hdGVyaWFsIHtcbiAgICAgICAgcmV0dXJuIG1hdGVyaWFscy5nZXQoa2V5KTtcbiAgICB9XG4gICAgXG4gICAgYWRkTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpIHtcbiAgICAgICAgdmFyIGdlbyA9IHRoaXMuZ2VvbWV0cmllcy5nZXQoZ2VvbWV0cnkpO1xuICAgICAgICB2YXIgbWF0ID0gdGhpcy5tYXRlcmlhbHMuZ2V0KG1hdGVyaWFsKTtcbiAgICAgICAgdmFyIG1lc2ggPSBuZXcgdGhyZWUuTWVzaChnZW8sIG1hdCk7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZygnYWRkaW5nIG1lc2ghJywgZ2VvLCBtYXQsIG1lc2gpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQobWVzaCk7XG4gICAgfVxuICAgIFxuICAgIHJlbmRlcihpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSA6IG51bWJlcikgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpO1xuICAgIH1cbiAgICBcbiAgICAvLyByZW5kZXIoc2NlbmUgOiB0aHJlZS5TY2VuZSwgaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UgOiBudW1iZXIpIDogdm9pZCB7XG4gICAgLy8gICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gICAgLy8gfVxufVxuIiwiaW1wb3J0IE1haW5Mb29wTG9vcE1hbmFnZXIgZnJvbSAnLi4vbG9naWMvbWFpbmxvb3AtbG9vcC1tYW5hZ2VyJztcbmltcG9ydCBGZXRjaEZpbGVMb2FkZXIgICAgIGZyb20gJy4uL2xvZ2ljL2ZldGNoLWZpbGUtbG9hZGVyJztcblxuaW1wb3J0IFRocmVlUmVuZGVyZXJNYW5hZ2VyIGZyb20gJy4uL3ZpZXcvdGhyZWUtcmVuZGVyZXItbWFuYWdlcic7XG5cbmNvbnN0IGxvb3BNYW5hZ2VyICAgICA9ICgpID0+IG5ldyBNYWluTG9vcExvb3BNYW5hZ2VyKCk7XG5jb25zdCBmaWxlTG9hZGVyICAgICAgPSAoKSA9PiBuZXcgRmV0Y2hGaWxlTG9hZGVyKCk7XG5jb25zdCByZW5kZXJlck1hbmFnZXIgPSAoKSA9PiBuZXcgVGhyZWVSZW5kZXJlck1hbmFnZXIoKTtcblxuZXhwb3J0IHsgbG9vcE1hbmFnZXIsIGZpbGVMb2FkZXIsIHJlbmRlcmVyTWFuYWdlciB9OyIsImltcG9ydCBFbnRpdHlNYW5hZ2VyIGZyb20gJy4vZW50aXR5LW1hbmFnZXInXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudGl0eUZhY3Rvcnkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVycyAgPSBuZXcgTWFwKClcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gbmV3IE1hcCgpXG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVySW5pdGlhbGl6ZXIoa2V5LCBpbml0aWFsaXplcikge1xuICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgfHwga2V5ID09PSAnJykge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdrZXkgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcuJylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdpbml0aWFsaXplciBtdXN0IGJlIGEgZnVuY3Rpb24uJylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5pbml0aWFsaXplcnMuc2V0KGtleSwgaW5pdGlhbGl6ZXIpXG4gICAgfVxuICAgIFxuICAgIGJ1aWxkKCkge1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSBuZXcgTWFwKClcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIFxuICAgIHdpdGhDb21wb25lbnQoa2V5LCBpbml0aWFsaXplcikge1xuICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgfHwga2V5ID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgaW5pdGlhbGl6ZXIgPSB0aGlzLmluaXRpYWxpemVycy5nZXQoa2V5KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uc2V0KGtleSwgaW5pdGlhbGl6ZXIpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGVDb25maWd1cmF0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uXG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZShlbnRpdHlNYW5hZ2VyLCBjb3VudCA9IDEsIGNvbmZpZ3VyYXRpb24gPSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCEoZW50aXR5TWFuYWdlciBpbnN0YW5jZW9mIEVudGl0eU1hbmFnZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gW11cbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbiB8fCB0aGlzLmNvbmZpZ3VyYXRpb25cbiAgICAgICAgXG4gICAgICAgIGxldCBjb21wb25lbnRzID0gW11cbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGNvbXBvbmVudCBvZiBjb25maWd1cmF0aW9uLmtleXMoKSkge1xuICAgICAgICAgICAgY29tcG9uZW50cy5wdXNoKGNvbXBvbmVudClcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGVudGl0aWVzID0gW11cbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7ICsraSkge1xuICAgICAgICAgICAgbGV0IHsgaWQsIGVudGl0eSB9ID0gZW50aXR5TWFuYWdlci5uZXdFbnRpdHkoY29tcG9uZW50cylcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGlkID49IGVudGl0eU1hbmFnZXIuY2FwYWNpdHkpIHtcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBbY29tcG9uZW50LCBpbml0aWFsaXplcl0gb2YgY29uZmlndXJhdGlvbikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5pdGlhbGl6ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gaW5pdGlhbGl6ZXIuY2FsbChlbnRpdHlbY29tcG9uZW50XSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVudGl0eVtjb21wb25lbnRdICE9PSAnb2JqZWN0JyAmJiByZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHlbY29tcG9uZW50XSA9IHJlc3VsdFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZW50aXRpZXMucHVzaCh7IGlkLCBlbnRpdHkgfSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLmxlbmd0aCA9PT0gMSA/IGVudGl0aWVzWzBdIDogZW50aXRpZXNcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcG9uZW50TWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IG5ldyBNYXAoKVxuICAgIH1cbiAgICBcbiAgICBuZXdDb21wb25lbnQoa2V5KSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KGtleSlcbiAgICAgICAgXG4gICAgICAgIGlmIChjb21wb25lbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgY29tcG9uZW50KSB7XG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBjb21wb25lbnQoKVxuICAgICAgICAgICAgY2FzZSAnb2JqZWN0JyAgOiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgoY29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXQgPSB7fVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoY29tcG9uZW50KS5mb3JFYWNoKGtleSA9PiByZXRba2V5XSA9IGNvbXBvbmVudFtrZXldKVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldFxuICAgICAgICAgICAgICAgIH0pKGNvbXBvbmVudClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudFxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyQ29tcG9uZW50KGtleSwgY29tcG9uZW50KSB7XG4gICAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyB8fCBrZXkgPT09ICcnKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2tleSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZy4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoY29tcG9uZW50ID09PSBudWxsIHx8IGNvbXBvbmVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvbXBvbmVudCBjYW5ub3QgYmUgbnVsbCBvciB1bmRlZmluZWQuJylcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5jb21wb25lbnRzLnNldChrZXksIGNvbXBvbmVudClcblxuICAgICAgICByZXR1cm4ga2V5XG4gICAgfVxuICAgIFxuICAgIGdldENvbXBvbmVudHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudHNcbiAgICB9XG59IiwiZXhwb3J0IGNvbnN0IFN5c3RlbVR5cGUgPSB7XG4gICAgTG9naWMgIDogMCxcbiAgICBSZW5kZXIgOiAxLFxuICAgIEluaXQgICA6IDJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3lzdGVtTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubG9naWNTeXN0ZW1zICA9IG5ldyBNYXAoKVxuICAgICAgICB0aGlzLnJlbmRlclN5c3RlbXMgPSBuZXcgTWFwKClcbiAgICAgICAgdGhpcy5pbml0U3lzdGVtcyAgID0gbmV3IE1hcCgpXG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyU3lzdGVtKGtleSwgdHlwZSwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnIHx8IGtleSA9PT0gJycpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcigna2V5IG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nLicpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlICE9PSBTeXN0ZW1UeXBlLkxvZ2ljICYmIHR5cGUgIT09IFN5c3RlbVR5cGUuUmVuZGVyICYmIHR5cGUgIT09IFN5c3RlbVR5cGUuSW5pdCkge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCd0eXBlIG11c3QgYmUgYSB2YWxpZCBTeXN0ZW1UeXBlLicpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjb21wb25lbnRzKSkge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjb21wb25lbnRzIGFyZ3VtZW50IG11c3QgYmUgYW4gYXJyYXkgb2YgY29tcG9uZW50cy4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbi4nKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgc3lzdGVtID0ge1xuICAgICAgICAgICAgY29tcG9uZW50cyxcbiAgICAgICAgICAgIGNhbGxiYWNrXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBTeXN0ZW1UeXBlLkxvZ2ljIDogdGhpcy5sb2dpY1N5c3RlbXMuc2V0KGtleSwgc3lzdGVtKTsgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgU3lzdGVtVHlwZS5SZW5kZXIgOiB0aGlzLnJlbmRlclN5c3RlbXMuc2V0KGtleSwgc3lzdGVtKTsgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgU3lzdGVtVHlwZS5Jbml0IDogdGhpcy5pbml0U3lzdGVtcy5zZXQoa2V5LCBzeXN0ZW0pOyBicmVha1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4ga2V5XG4gICAgfVxuICAgIFxuICAgIHJlbW92ZVN5c3RlbShrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9naWNTeXN0ZW1zLmRlbGV0ZShrZXkpIHx8IHRoaXMucmVuZGVyU3lzdGVtcy5kZWxldGUoa2V5KSB8fCB0aGlzLmluaXRTeXN0ZW1zLmRlbGV0ZShrZXkpXG4gICAgfVxufSIsImltcG9ydCBFbnRpdHlNYW5hZ2VyIGZyb20gJy4vZW50aXR5LW1hbmFnZXInXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50SGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IE1hcCgpXG4gICAgfVxuICAgIFxuICAgIGVtcHR5UHJvbWlzZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIFxuICAgIHByb21pc2UoY2FsbGJhY2ssIGNvbnRleHQsIGFyZ3MsIHRpbWVvdXQpIHtcbiAgICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHlwZW9mIGNvbnRleHQgPT09ICAnb2JqZWN0JyA/IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgLi4uYXJncykgOiBjYWxsYmFjay5hcHBseShjb250ZXh0LCAuLi5hcmdzKSlcbiAgICAgICAgICAgICAgICB9LCB0aW1lb3V0KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh0eXBlb2YgY29udGV4dCA9PT0gJ29iamVjdCcgPyBjYWxsYmFjay5jYWxsKGNvbnRleHQsIC4uLmFyZ3MpIDogY2FsbGJhY2suYXBwbHkoY29udGV4dCwgLi4uYXJncykpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIFxuICAgIGxpc3RlbihldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKCF0aGlzLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5zZXQoZXZlbnQsIG5ldyBNYXAoKSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGV2ZW50SWQgPSAtMVxuICAgICAgICBcbiAgICAgICAgdGhpcy5ldmVudHMuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudElkID0gTWF0aC5tYXgoZXZlbnRJZCwgLi4uZXZlbnQua2V5cygpKVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICsrZXZlbnRJZFxuICAgICAgICBcbiAgICAgICAgdGhpcy5ldmVudHMuZ2V0KGV2ZW50KS5zZXQoZXZlbnRJZCwgY2FsbGJhY2spXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZXZlbnRJZFxuICAgIH1cbiAgICBcbiAgICBzdG9wTGlzdGVuKGV2ZW50SWQpIHtcbiAgICAgICAgZm9yIChsZXQgZXZlbnRzIG9mIHRoaXMuZXZlbnRzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpZCBvZiBldmVudHMua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlkID09PSBldmVudElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldmVudHMuZGVsZXRlKGV2ZW50SWQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXIoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcyBpbnN0YW5jZW9mIEVudGl0eU1hbmFnZXIgPyB0aGlzLmV2ZW50SGFuZGxlciA6IHRoaXNcbiAgICAgICAgXG4gICAgICAgIGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpXG4gICAgICAgIFxuICAgICAgICBsZXQgWyBldmVudCBdID0gYXJncy5zcGxpY2UoMCwgMSlcbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnQgIT09ICdzdHJpbmcnIHx8ICFzZWxmLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5lbXB0eVByb21pc2UoKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXVxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY2FsbGJhY2sgb2Ygc2VsZi5ldmVudHMuZ2V0KGV2ZW50KS52YWx1ZXMoKSkge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChzZWxmLnByb21pc2UoY2FsbGJhY2ssIHRoaXMsIGFyZ3MsIDEpKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpXG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXJEZWxheWVkKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXMgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyID8gdGhpcy5ldmVudEhhbmRsZXIgOiB0aGlzXG4gICAgICAgIFxuICAgICAgICBsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKVxuICAgICAgICBcbiAgICAgICAgbGV0IFsgZXZlbnQsIHRpbWVvdXQgXSA9IGFyZ3Muc3BsaWNlKDAsIDIpXG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCAhTnVtYmVyLmlzSW50ZWdlcih0aW1lb3V0KSB8fCAhc2VsZi5ldmVudHMuaGFzKGV2ZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuZW1wdHlQcm9taXNlKClcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHByb21pc2VzID0gW11cbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGNhbGxiYWNrIG9mIHNlbGYuZXZlbnRzLmdldChldmVudCkudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goc2VsZi5wcm9taXNlKGNhbGxiYWNrLCB0aGlzLCBhcmdzLCB0aW1lb3V0KSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKVxuICAgIH1cbn0iLCJpbXBvcnQgRW50aXR5RmFjdG9yeSAgICAgICAgICAgICAgICAgZnJvbSAnLi9lbnRpdHktZmFjdG9yeSdcbmltcG9ydCBDb21wb25lbnRNYW5hZ2VyICAgICAgICAgICAgICBmcm9tICcuL2NvbXBvbmVudC1tYW5hZ2VyJ1xuaW1wb3J0IFN5c3RlbU1hbmFnZXIsIHsgU3lzdGVtVHlwZSB9IGZyb20gJy4vc3lzdGVtLW1hbmFnZXInXG5pbXBvcnQgRXZlbnRIYW5kbGVyICAgICAgICAgICAgICAgICAgZnJvbSAnLi9ldmVudC1oYW5kbGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRpdHlNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcihjYXBhY2l0eSA9IDEwMDApIHtcbiAgICAgICAgdGhpcy5jYXBhY2l0eSAgICAgICAgID0gY2FwYWNpdHlcbiAgICAgICAgdGhpcy5jdXJyZW50TWF4RW50aXR5ID0gLTFcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeSAgICA9IG5ldyBFbnRpdHlGYWN0b3J5KClcbiAgICAgICAgdGhpcy5zeXN0ZW1NYW5hZ2VyICAgID0gbmV3IFN5c3RlbU1hbmFnZXIoKVxuICAgICAgICB0aGlzLmNvbXBvbmVudE1hbmFnZXIgPSBuZXcgQ29tcG9uZW50TWFuYWdlcigpXG4gICAgICAgIHRoaXMuZXZlbnRIYW5kbGVyICAgICA9IG5ldyBFdmVudEhhbmRsZXIoKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdGllcyA9IEFycmF5LmZyb20oeyBsZW5ndGggOiB0aGlzLmNhcGFjaXR5IH0sICgpID0+ICh7IGNvbXBvbmVudHM6IFsgXSB9KSlcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXR5Q29uZmlndXJhdGlvbnMgPSBuZXcgTWFwKClcbiAgICB9XG4gICAgXG4gICAgaW5jcmVhc2VDYXBhY2l0eSgpIHtcbiAgICAgICAgbGV0IG9sZENhcGFjaXR5ID0gdGhpcy5jYXBhY2l0eVxuICAgICAgICBcbiAgICAgICAgdGhpcy5jYXBhY2l0eSAqPSAyXG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0aWVzID0gWy4uLnRoaXMuZW50aXRpZXMsIC4uLkFycmF5LmZyb20oeyBsZW5ndGggOiBvbGRDYXBhY2l0eSB9LCAoKSA9PiAoeyBjb21wb25lbnRzOiBbIF0gfSkpXVxuXG4gICAgICAgIGZvciAobGV0IGkgPSBvbGRDYXBhY2l0eTsgaSA8IHRoaXMuY2FwYWNpdHk7ICsraSkge1xuICAgICAgICAgICAgZm9yIChsZXQgY29tcG9uZW50IG9mIHRoaXMuY29tcG9uZW50TWFuYWdlci5nZXRDb21wb25lbnRzKCkua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tpXVtjb21wb25lbnRdID0gdGhpcy5jb21wb25lbnRNYW5hZ2VyLm5ld0NvbXBvbmVudChjb21wb25lbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbmV3RW50aXR5KGNvbXBvbmVudHMpIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbXBvbmVudHMpKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvbXBvbmVudHMgYXJndW1lbnQgbXVzdCBiZSBhbiBhcnJheSBvZiBjb21wb25lbnRzLicpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBpZCA9IDBcbiAgICAgICAgXG4gICAgICAgIGZvciAoOyBpZCA8IHRoaXMuY2FwYWNpdHk7ICsraWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChpZCA+PSB0aGlzLmNhcGFjaXR5KSB7XG4gICAgICAgICAgICAvLyB0b2RvOiBhdXRvIGluY3JlYXNlIGNhcGFjaXR5P1xuICAgICAgICAgICAgcmV0dXJuIHsgaWQgOiB0aGlzLmNhcGFjaXR5LCBlbnRpdHkgOiBudWxsIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSBpZFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzID0gY29tcG9uZW50c1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHsgaWQsIGVudGl0eSA6IHRoaXMuZW50aXRpZXNbaWRdIH1cbiAgICB9XG4gICAgXG4gICAgZGVsZXRlRW50aXR5KGlkKSB7XG4gICAgICAgIHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMgPSBbXVxuICAgICAgICBcbiAgICAgICAgaWYgKGlkIDwgdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IGlkOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbaV0uY29tcG9uZW50cy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSBpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSAwXG4gICAgfVxuXG4gICAgKmdldEVudGl0aWVzKGNvbXBvbmVudHMgPSBudWxsKSB7XG4gICAgICAgIGZvciAobGV0IGlkID0gMDsgaWQgPD0gdGhpcy5jdXJyZW50TWF4RW50aXR5OyArK2lkKSB7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50cyA9PT0gbnVsbCB8fCBjb21wb25lbnRzLmV2ZXJ5KGNvbXBvbmVudCA9PiB0aGlzLmVudGl0aWVzW2lkXS5jb21wb25lbnRzLmluZGV4T2YoY29tcG9uZW50KSAhPT0gLTEpKSB7XG4gICAgICAgICAgICAgICAgeWllbGQgeyBpZCwgZW50aXR5IDogdGhpcy5lbnRpdGllc1tpZF0gfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyQ29uZmlndXJhdGlvbihrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09ICdzdHJpbmcnIHx8IGtleSA9PT0gJycpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcigna2V5IG11c3QgYmUgYSBub24gZW1wdHkgc3RyaW5nLicpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXR5Q29uZmlndXJhdGlvbnMuc2V0KGtleSwgdGhpcy5lbnRpdHlGYWN0b3J5LmNyZWF0ZUNvbmZpZ3VyYXRpb24oKSlcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBrZXlcbiAgICB9XG4gICAgXG4gICAgLy8gQ29tcG9uZW50IE1hbmFnZXJcbiAgICBcbiAgICByZWdpc3RlckNvbXBvbmVudChrZXksIGNvbXBvbmVudCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudE1hbmFnZXIucmVnaXN0ZXJDb21wb25lbnQoa2V5LCBjb21wb25lbnQpXG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBlbnRpdHkgb2YgdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgZW50aXR5W2tleV0gPSB0aGlzLmNvbXBvbmVudE1hbmFnZXIubmV3Q29tcG9uZW50KGtleSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGluaXRpYWxpemVyXG5cbiAgICAgICAgc3dpdGNoICh0eXBlb2YgY29tcG9uZW50KSB7XG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6IGluaXRpYWxpemVyID0gY29tcG9uZW50OyBicmVha1xuICAgICAgICAgICAgY2FzZSAnb2JqZWN0Jzoge1xuICAgICAgICAgICAgICAgIGluaXRpYWxpemVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhjb21wb25lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBjb21wb25lbnRba2V5XVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6IGluaXRpYWxpemVyID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb21wb25lbnQgfTsgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LnJlZ2lzdGVySW5pdGlhbGl6ZXIoa2V5LCBpbml0aWFsaXplcilcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBrZXlcbiAgICB9XG4gICAgXG4gICAgYWRkQ29tcG9uZW50KGlkLCBjb21wb25lbnRLZXkpIHtcbiAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMuaW5kZXhPZihjb21wb25lbnRLZXkpICE9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMucHVzaChjb21wb25lbnRLZXkpXG4gICAgfVxuICAgIFxuICAgIHJlbW92ZUNvbXBvbmVudChpZCwgY29tcG9uZW50KSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZW50aXRpZXNbaWRdLmNvbXBvbmVudHMuaW5kZXhPZihjb21wb25lbnQpXG4gICAgICAgIFxuICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdGllc1tpZF0uY29tcG9uZW50cy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuICAgIFxuICAgIC8vIFN5c3RlbSBNYW5hZ2VyXG4gICAgXG4gICAgcmVnaXN0ZXJTeXN0ZW0oa2V5LCB0eXBlLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlZ2lzdGVyU3lzdGVtKGtleSwgdHlwZSwgY29tcG9uZW50cywgY2FsbGJhY2spXG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyTG9naWNTeXN0ZW0oa2V5LCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlZ2lzdGVyU3lzdGVtKGtleSwgU3lzdGVtVHlwZS5Mb2dpYywgY29tcG9uZW50cywgY2FsbGJhY2spXG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyUmVuZGVyU3lzdGVtKGtleSwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbShrZXksIFN5c3RlbVR5cGUuUmVuZGVyLCBjb21wb25lbnRzLCBjYWxsYmFjaylcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJJbml0U3lzdGVtKGtleSwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbShrZXksIFN5c3RlbVR5cGUuSW5pdCwgY29tcG9uZW50cywgY2FsbGJhY2spXG4gICAgfVxuICAgIFxuICAgIHJlbW92ZVN5c3RlbShrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZW1vdmVTeXN0ZW0oa2V5KVxuICAgIH1cbiAgICBcbiAgICBvbkxvZ2ljKG9wdHMpIHtcbiAgICAgICAgZm9yIChsZXQgc3lzdGVtIG9mIHRoaXMuc3lzdGVtTWFuYWdlci5sb2dpY1N5c3RlbXMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMpLCBvcHRzKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uUmVuZGVyKG9wdHMpIHtcbiAgICAgICAgZm9yIChsZXQgc3lzdGVtIG9mIHRoaXMuc3lzdGVtTWFuYWdlci5yZW5kZXJTeXN0ZW1zLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBzeXN0ZW0uY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLmdldEVudGl0aWVzKHN5c3RlbS5jb21wb25lbnRzKSwgb3B0cylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5pdChvcHRzKSB7XG4gICAgICAgIGZvciAobGV0IHN5c3RlbSBvZiB0aGlzLnN5c3RlbU1hbmFnZXIuaW5pdFN5c3RlbXMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMpLCBvcHRzKVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIEVudGl0eSBGYWN0b3J5XG4gICAgXG4gICAgcmVnaXN0ZXJJbml0aWFsaXplcihjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LnJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKVxuICAgIH1cbiAgICBcbiAgICBidWlsZCgpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LmJ1aWxkKClcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIFxuICAgIHdpdGhDb21wb25lbnQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS53aXRoQ29tcG9uZW50KGNvbXBvbmVudElkLCBpbml0aWFsaXplcilcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZShjb3VudCwga2V5KSB7XG4gICAgICAgIGxldCBjb25maWd1cmF0aW9uID0gdW5kZWZpbmVkXG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24gPSB0aGlzLmVudGl0eUNvbmZpZ3VyYXRpb25zLmdldChrZXkpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChjb25maWd1cmF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvdWxkIG5vdCBmaW5kIGVudGl0eSBjb25maWd1cmF0aW9uIGZvciB0aGUgc3VwcGxpZWQga2V5LiBpZiB5b3Ugd2lzaCB0byBjcmVhdGUgYW4gZW50aXR5IHdpdGhvdXQgYSBjb25maWd1cmF0aW9uLCBkbyBub3QgcGFzcyBhIGtleS4nKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy5lbnRpdHlGYWN0b3J5LmNyZWF0ZSh0aGlzLCBjb3VudCwgY29uZmlndXJhdGlvbilcbiAgICB9XG4gICAgXG4gICAgLy8gRXZlbnQgSGFuZGxlclxuICAgIFxuICAgIGxpc3RlbihldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLmxpc3RlbihldmVudCwgY2FsbGJhY2spXG4gICAgfVxuICAgIFxuICAgIHN0b3BMaXN0ZW4oZXZlbnRJZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIuc3RvcExpc3RlbihldmVudElkKVxuICAgIH1cbiAgICBcbiAgICB0cmlnZ2VyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlci5jYWxsKHRoaXMsIC4uLmFyZ3VtZW50cylcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlckRlbGF5ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyRGVsYXllZC5jYWxsKHRoaXMsIC4uLmFyZ3VtZW50cylcbiAgICB9XG59IiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IEVudGl0eU1hbmFnZXIgZnJvbSAnZ2ctZW50aXRpZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHRyB7XG4gICAgY29uc3RydWN0b3IoZGkpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlNYW5hZ2VyID0gbmV3IEVudGl0eU1hbmFnZXIoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZGkgPSBkaTtcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJFbnRpdHlDb25maWd1cmF0aW9uKGtleSwgZW50aXR5KSB7XG4gICAgICAgIHRoaXMuZW50aXR5TWFuYWdlci5idWlsZCgpXG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBjb21wb25lbnQgb2YgZW50aXR5LmNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5TWFuYWdlci53aXRoQ29tcG9uZW50KGNvbXBvbmVudClcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlNYW5hZ2VyLnJlZ2lzdGVyQ29uZmlndXJhdGlvbihrZXkpXG4gICAgfVxuICAgIFxuICAgIHN0YXJ0KCkge1xuICAgICAgICBjb25zdCBsb29wTWFuYWdlciAgICAgPSB0aGlzLmRpLmxvb3BNYW5hZ2VyKCk7XG4gICAgICAgIGNvbnN0IHJlbmRlcmVyTWFuYWdlciA9IHRoaXMuZGkucmVuZGVyZXJNYW5hZ2VyKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIub25Jbml0KHsgcmVuZGVyZXJNYW5hZ2VyIH0pO1xuICAgICAgICBcbiAgICAgICAgbG9vcE1hbmFnZXIuc2V0VXBkYXRlKGRlbHRhID0+IHRoaXMuZW50aXR5TWFuYWdlci5vbkxvZ2ljKGRlbHRhKSk7XG4gICAgICAgIFxuICAgICAgICBsb29wTWFuYWdlci5zZXRSZW5kZXIoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbnRpdHlNYW5hZ2VyLm9uUmVuZGVyKHsgZGVsdGEgOiBpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSwgcmVuZGVyZXJNYW5hZ2VyIH0pO1xuICAgICAgICAgICAgcmVuZGVyZXJNYW5hZ2VyLnJlbmRlcihpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgbG9vcE1hbmFnZXIuc3RhcnQoKTtcbiAgICB9XG59XG4vLyBpbXBvcnQgeyBGbGF0U2hhZGluZyB9IGZyb20gJy4vY29uc3RhbnRzL3NoYWRpbmcnO1xuXG4vLyB3aW5kb3cub25sb2FkID0gYXN5bmMgZnVuY3Rpb24oKSB7XG4vLyAgICAgY29uc3QgbGV2ZWxMb2FkZXIgICAgICAgPSBESS5sZXZlbExvYWRlcigpO1xuLy8gICAgIGNvbnN0IG1lc2hMb2FkZXIgICAgICAgID0gREkubWVzaExvYWRlcigpO1xuLy8gICAgIGNvbnN0IG1lc2hNYW5hZ2VyICAgICAgID0gREkubWVzaE1hbmFnZXIoKTtcbi8vICAgICBjb25zdCBzY2VuZU1hbmFnZXIgICAgICA9IERJLnNjZW5lTWFuYWdlcigpO1xuLy8gICAgIGNvbnN0IGVudGl0eU1hbmFnZXIgICAgID0gREkuZW50aXR5TWFuYWdlcigpO1xuLy8gICAgIGNvbnN0IHJlbmRlcmVyTWFuYWdlciAgID0gREkucmVuZGVyZXJNYW5hZ2VyKCk7XG4vLyAgICAgY29uc3QgbG9vcE1hbmFnZXIgICAgICAgPSBESS5sb29wTWFuYWdlcigpO1xuLy8gICAgIGNvbnN0IHBlcmZvcm1hbmNlVmlld2VyID0gREkucGVyZm9ybWFuY2VWaWV3ZXIoKTtcbiAgICBcbi8vICAgICBjb25zdCBzY2VuZUlkID0gc2NlbmVNYW5hZ2VyLmNyZWF0ZVNjZW5lKCk7XG4gICAgXG4vLyAgICAgY29uc3QgbGV2ZWwgID0gYXdhaXQgbGV2ZWxMb2FkZXIubG9hZExldmVsKCdsZXZlbHMvbGV2ZWwtb25lLmpzb24nKTtcbi8vICAgICBjb25zdCBtZXNoSWQgPSBtZXNoTWFuYWdlci5hZGRNZXNoKGF3YWl0IG1lc2hMb2FkZXIubG9hZCgnbWVzaGVzLycgKyBsZXZlbC5tZXNoLCB7IHNoYWRpbmcgOiBGbGF0U2hhZGluZyB9KSk7XG4gICAgXG4vLyAgICAgc2NlbmVNYW5hZ2VyLmFkZFRvU2NlbmUoc2NlbmVJZCwgbWVzaE1hbmFnZXIuZ2V0TWVzaChtZXNoSWQpKTtcbi8vICAgICBzY2VuZU1hbmFnZXIuYWRkQW1iaWVudExpZ2h0VG9TY2VuZShzY2VuZUlkLCAweDEwMTAzMCk7XG4vLyAgXHRzY2VuZU1hbmFnZXIuYWRkRGlyZWN0aW9uYWxMaWdodFRvU2NlbmUoc2NlbmVJZCwgMHhmZmVlZGQsIDAsIDAsIDEpO1xuICAgIFxuLy8gICAgIHZhciBtZXNoSXNBZGRlZCA9IHRydWU7XG4gICAgXG4vLyAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbi8vICAgICAgICAgaWYgKG1lc2hJc0FkZGVkKSB7XG4vLyAgICAgICAgICAgICBzY2VuZU1hbmFnZXIucmVtb3ZlRnJvbVNjZW5lKHNjZW5lSWQsIG1lc2hNYW5hZ2VyLmdldE1lc2gobWVzaElkKSk7XG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICBzY2VuZU1hbmFnZXIuYWRkVG9TY2VuZShzY2VuZUlkLCBtZXNoTWFuYWdlci5nZXRNZXNoKG1lc2hJZCkpO1xuLy8gICAgICAgICB9XG4gICAgICAgIFxuLy8gICAgICAgICBtZXNoSXNBZGRlZCA9ICFtZXNoSXNBZGRlZDtcbi8vICAgICB9KTtcbiAgICBcbi8vICAgICBwZXJmb3JtYW5jZVZpZXdlci5zZXRNb2RlKDApO1xuICAgIFxuLy8gICAgIGxvb3BNYW5hZ2VyLnNldFVwZGF0ZShkZWx0YSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgICAgIG1lc2hNYW5hZ2VyLmdldE1lc2gobWVzaElkKS5yb3RhdGlvbi55ICs9IDAuMDAxICogZGVsdGE7XG4vLyAgICAgICAgICAgICAgICAgICAgIGVudGl0eU1hbmFnZXIub25Mb2dpYyhkZWx0YSk7XG4vLyAgICAgICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgICAgLnNldFJlbmRlcihpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgICBwZXJmb3JtYW5jZVZpZXdlci5iZWdpbigpO1xuICAgICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgICAgICAgcmVuZGVyZXJNYW5hZ2VyLnJlbmRlcihzY2VuZU1hbmFnZXIuZ2V0U2NlbmUoc2NlbmVJZCksIGludGVycG9sYXRpb25QZXJjZW50YWdlKTtcbiAgICAgICAgICAgICAgICAgICBcbi8vICAgICAgICAgICAgICAgICAgIHBlcmZvcm1hbmNlVmlld2VyLmVuZCgpO1xuLy8gICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAuc3RhcnQoKTtcbi8vIH07Iiwie1xuICAgIFwiZ2Vtb2V0cnlcIjogXCJjeWxpbmRlclwiLFxuICAgIFwiaWRcIjogMFxufSIsIntcbiAgICBcInhcIjogMTAsXG4gICAgXCJ5XCI6IDEwLFxuICAgIFwielwiOiAxMFxufSIsIntcbiAgICBcInhcIjogMjAsXG4gICAgXCJ5XCI6IDIwLFxuICAgIFwielwiOiAyMFxufSIsImV4cG9ydCBjb25zdCBDb21wb25lbnRzID0gW11cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlVW5pdChlbnRpdGllcywgeyByZW5kZXJlck1hbmFnZXIgfSkge1xuICAgIGxldCB7IGVudGl0eSB9ID0gdGhpcy5jcmVhdGUoMSwgJ3VuaXQnKVxuICAgIFxuICAgIGVudGl0eS5hcHBlYXJhbmNlLmlkID0gcmVuZGVyZXJNYW5hZ2VyLmFkZE1lc2goJ2N5bGluZGVyJywgJ3Bob25nJylcbiAgICBcbiAgICBjb25zb2xlLmxvZyhlbnRpdHkpXG59IiwiZXhwb3J0IGNvbnN0IENvbXBvbmVudHMgPSBbICdhcHBlYXJhbmNlJyBdO1xuXG5leHBvcnQgZGVmYXVsdCAoZW50aXRpZXMsIHsgcmVuZGVyZXJNYW5hZ2VyIH0pID0+IHtcbiAgICAvLyByZW5kZXJlck1hbmFnZXIuYWRkTWVzaCgnY3lsaW5kZXInLCAncGhvbmcnKVxufSIsImV4cG9ydCBjb25zdCBDb21wb25lbnRzID0gWyAndHJhbnNmb3JtJywgJ3ZlbG9jaXR5JyBdO1xuXG5leHBvcnQgZGVmYXVsdCAoZW50aXRpZXMpID0+IHtcbiAgICBmb3IgKHZhciB7IGVudGl0eSB9IG9mIGVudGl0aWVzKSB7XG4gICAgICAgIFxuICAgIH1cbn07IiwiZXhwb3J0IGNvbnN0IENvbXBvbmVudHMgPSBbICd0cmFuc2Zvcm0nLCAnYXBwZWFyYW5jZScgXTtcblxuZXhwb3J0IGRlZmF1bHQgKGVudGl0aWVzKSA9PiB7XG5cbn07Iiwie1xuICAgIFwiY29tcG9uZW50c1wiIDogWyBcImFwcGVhcmFuY2VcIiwgXCJ2ZWxvY2l0eVwiLCBcInRyYW5zZm9ybVwiIF1cbn0iLCJpbXBvcnQgKiBhcyBESSBmcm9tICcuLi9zcmMvREkvYnJvd3NlcidcblxuaW1wb3J0IEdHIGZyb20gJy4uL3NyYy9nZydcblxuY29uc3QgZ2cgPSBuZXcgR0coREkpXG5cbmltcG9ydCBhcHBlYXJhbmNlIGZyb20gJy9ob21lL3VidW50dS93b3Jrc3BhY2UvYXBwL2NvbXBvbmVudHMvYXBwZWFyYW5jZS5qc29uJ1xuZ2cuZW50aXR5TWFuYWdlci5yZWdpc3RlckNvbXBvbmVudCgnYXBwZWFyYW5jZScsIGFwcGVhcmFuY2UpXG5cbmltcG9ydCB0cmFuc2Zvcm0gZnJvbSAnL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9hcHAvY29tcG9uZW50cy90cmFuc2Zvcm0uanNvbidcbmdnLmVudGl0eU1hbmFnZXIucmVnaXN0ZXJDb21wb25lbnQoJ3RyYW5zZm9ybScsIHRyYW5zZm9ybSlcblxuaW1wb3J0IHZlbG9jaXR5IGZyb20gJy9ob21lL3VidW50dS93b3Jrc3BhY2UvYXBwL2NvbXBvbmVudHMvdmVsb2NpdHkuanNvbidcbmdnLmVudGl0eU1hbmFnZXIucmVnaXN0ZXJDb21wb25lbnQoJ3ZlbG9jaXR5JywgdmVsb2NpdHkpXG5cbmltcG9ydCBjcmVhdGV1bml0LCB7IENvbXBvbmVudHMgYXMgY3JlYXRldW5pdENvbXBvbmVudHMgfSBmcm9tICcvaG9tZS91YnVudHUvd29ya3NwYWNlL2FwcC9zeXN0ZW1zL2luaXQvY3JlYXRlLXVuaXQuanMnXG5nZy5lbnRpdHlNYW5hZ2VyLnJlZ2lzdGVySW5pdFN5c3RlbSgnY3JlYXRldW5pdCcsIGNyZWF0ZXVuaXRDb21wb25lbnRzLCBjcmVhdGV1bml0KVxuXG5pbXBvcnQgbWVzaGVzLCB7IENvbXBvbmVudHMgYXMgbWVzaGVzQ29tcG9uZW50cyB9IGZyb20gJy9ob21lL3VidW50dS93b3Jrc3BhY2UvYXBwL3N5c3RlbXMvaW5pdC9tZXNoZXMuanMnXG5nZy5lbnRpdHlNYW5hZ2VyLnJlZ2lzdGVySW5pdFN5c3RlbSgnbWVzaGVzJywgbWVzaGVzQ29tcG9uZW50cywgbWVzaGVzKVxuXG5pbXBvcnQgbW92ZW1lbnQsIHsgQ29tcG9uZW50cyBhcyBtb3ZlbWVudENvbXBvbmVudHMgfSBmcm9tICcvaG9tZS91YnVudHUvd29ya3NwYWNlL2FwcC9zeXN0ZW1zL2xvZ2ljL21vdmVtZW50LmpzJ1xuZ2cuZW50aXR5TWFuYWdlci5yZWdpc3RlckxvZ2ljU3lzdGVtKCdtb3ZlbWVudCcsIG1vdmVtZW50Q29tcG9uZW50cywgbW92ZW1lbnQpXG5cbmltcG9ydCByZW5kZXIsIHsgQ29tcG9uZW50cyBhcyByZW5kZXJDb21wb25lbnRzIH0gZnJvbSAnL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9hcHAvc3lzdGVtcy9yZW5kZXIvcmVuZGVyLmpzJ1xuZ2cuZW50aXR5TWFuYWdlci5yZWdpc3RlclJlbmRlclN5c3RlbSgncmVuZGVyJywgcmVuZGVyQ29tcG9uZW50cywgcmVuZGVyKVxuXG5pbXBvcnQgdW5pdCBmcm9tICcvaG9tZS91YnVudHUvd29ya3NwYWNlL2FwcC9lbnRpdGllcy91bml0Lmpzb24nXG5nZy5yZWdpc3RlckVudGl0eUNvbmZpZ3VyYXRpb24oJ3VuaXQnLCB1bml0KVxuXG5nZy5zdGFydCgpIl0sIm5hbWVzIjpbInRoaXMiLCJGZXRjaEZpbGVMb2FkZXIiLCJDb21wb25lbnRzIiwiY3JlYXRldW5pdENvbXBvbmVudHMiLCJjcmVhdGV1bml0IiwibWVzaGVzQ29tcG9uZW50cyIsIm1vdmVtZW50Q29tcG9uZW50cyIsInJlbmRlckNvbXBvbmVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0EsRUFBQSxHQUFDLFVBQVMsQ0FBVCxFQUFXO0FBQUMsRUFBQSxhQUFTLENBQVQsQ0FBVyxDQUFYLEVBQWE7QUFBQyxFQUFBLFVBQUcsSUFBRSxFQUFFLENBQUYsQ0FBRixFQUFPLEVBQUUsSUFBRSxDQUFGLEdBQUksQ0FBSixDQUFGLEVBQVM7QUFBQyxFQUFBLGFBQUksS0FBRyxJQUFFLENBQUYsRUFBSSxJQUFFLENBQUYsRUFBSSxFQUFFLENBQUYsRUFBSSxDQUFKLENBQVgsRUFBa0IsSUFBRSxJQUFFLEdBQUYsS0FBUSxJQUFFLE1BQUksQ0FBSixHQUFNLE1BQUksQ0FBSixFQUFNLElBQUUsQ0FBRixFQUFJLElBQUUsQ0FBRixDQUE1QixFQUFpQyxHQUFuRCxFQUF1RCxJQUFFLENBQUYsRUFBSSxLQUFHLENBQUg7QUFBTSxFQUFBLGNBQUcsRUFBRSxDQUFGLEdBQUss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