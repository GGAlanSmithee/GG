(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('three')) :
  typeof define === 'function' && define.amd ? define('GG', ['three'], factory) :
  (global.GG = factory(global.THREE));
}(this, function (three) { 'use strict';

  three = 'default' in three ? three['default'] : three;

  var __commonjs_global = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this;
  function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports, __commonjs_global), module.exports; }

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
  //const _entityManager   = new EntityManager()

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
  // const entityManager   = () => _entityManager

  var DI = { loopManager: loopManager, loader: loader, rendererManager: rendererManager };

  var GG = function () {
      function GG() {
          var _this = this;

          classCallCheck(this, GG);

          // width and height set to 500 just to have it as in the editor for the time being
          this.width = 500;
          this.height = 500;

          // this.entityManager   = DI.entityManager()
          this.loopManager = DI.loopManager();
          this.rendererManager = DI.rendererManager();
          this.loader = DI.loader();

          this.dom = this.rendererManager.getDom();

          // this.entityManager.onInit({renderManager: this.rendererManager})

          this.loopManager.setUpdate(function (delta) {
              // this.entityManager.onLogic(delta)
          }).setRender(function (interpolationPercentage) {
              // this.entityManager.onRender({delta : interpolationPercentage, renderManager: this.rendererManager})
              _this.rendererManager.render(interpolationPercentage);
          });
      }

      createClass(GG, [{
          key: 'registerEntityConfiguration',
          value: function registerEntityConfiguration(key, entity) {
              // this.entityManager.build()

              // for (let component of entity.components) {
              //     this.entityManager.withComponent(component)
              // }

              // this.entityManager.registerConfiguration(key)
          }
      }, {
          key: 'load',
          value: function load(_ref) {
              var project = _ref.project;
              var scene = _ref.scene;
              var camera = _ref.camera;

              var parsedScene = this.loader.parse(scene);
              var parsedCamera = this.loader.parse(camera);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2cuanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9tYWlubG9vcC5qcy9idWlsZC9tYWlubG9vcC5taW4uanMiLCIuLi8uLi8uLi8uLi8uLi9fX2JhYmVsSGVscGVyc19fIiwiLi4vc3JjL2xvZ2ljL21haW5sb29wLWxvb3AtbWFuYWdlci5qcyIsIi4uL3NyYy9sb2dpYy90aHJlZS1vYmplY3QtbWVzaC1sb2FkZXIuanMiLCIuLi9zcmMvdmlldy90aHJlZS1yZW5kZXJlci1tYW5hZ2VyLmpzIiwiLi4vc3JjL0RJL2Jyb3dzZXIuanMiLCIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBtYWlubG9vcC5qcyAxLjAuMy0yMDE2MDMyMFxuICpcbiAqIEBhdXRob3IgSXNhYWMgU3VraW4gKGh0dHA6Ly93d3cuaXNhYWNzdWtpbi5jb20vKVxuICogQGxpY2Vuc2UgTUlUXG4gKi9cblxuIWZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGIoYSl7aWYodj1vKGIpLCEoZStqPmEpKXtmb3IoZCs9YS1lLGU9YSxyKGEsZCksYT5nKzFlMyYmKGY9LjI1KmgrLjc1KmYsZz1hLGg9MCksaCsrLGk9MDtkPj1jOylpZihzKGMpLGQtPWMsKytpPj0yNDApe209ITA7YnJlYWt9dChkL2MpLHUoZixtKSxtPSExfX12YXIgYz0xZTMvNjAsZD0wLGU9MCxmPTYwLGc9MCxoPTAsaT0wLGo9MCxrPSExLGw9ITEsbT0hMSxuPVwib2JqZWN0XCI9PXR5cGVvZiB3aW5kb3c/d2luZG93OmEsbz1uLnJlcXVlc3RBbmltYXRpb25GcmFtZXx8ZnVuY3Rpb24oKXt2YXIgYT1EYXRlLm5vdygpLGIsZDtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIGI9RGF0ZS5ub3coKSxkPU1hdGgubWF4KDAsYy0oYi1hKSksYT1iK2Qsc2V0VGltZW91dChmdW5jdGlvbigpe2UoYitkKX0sZCl9fSgpLHA9bi5jYW5jZWxBbmltYXRpb25GcmFtZXx8Y2xlYXJUaW1lb3V0LHE9ZnVuY3Rpb24oKXt9LHI9cSxzPXEsdD1xLHU9cSx2O2EuTWFpbkxvb3A9e2dldFNpbXVsYXRpb25UaW1lc3RlcDpmdW5jdGlvbigpe3JldHVybiBjfSxzZXRTaW11bGF0aW9uVGltZXN0ZXA6ZnVuY3Rpb24oYSl7cmV0dXJuIGM9YSx0aGlzfSxnZXRGUFM6ZnVuY3Rpb24oKXtyZXR1cm4gZn0sZ2V0TWF4QWxsb3dlZEZQUzpmdW5jdGlvbigpe3JldHVybiAxZTMvan0sc2V0TWF4QWxsb3dlZEZQUzpmdW5jdGlvbihhKXtyZXR1cm5cInVuZGVmaW5lZFwiPT10eXBlb2YgYSYmKGE9MS8wKSwwPT09YT90aGlzLnN0b3AoKTpqPTFlMy9hLHRoaXN9LHJlc2V0RnJhbWVEZWx0YTpmdW5jdGlvbigpe3ZhciBhPWQ7cmV0dXJuIGQ9MCxhfSxzZXRCZWdpbjpmdW5jdGlvbihhKXtyZXR1cm4gcj1hfHxyLHRoaXN9LHNldFVwZGF0ZTpmdW5jdGlvbihhKXtyZXR1cm4gcz1hfHxzLHRoaXN9LHNldERyYXc6ZnVuY3Rpb24oYSl7cmV0dXJuIHQ9YXx8dCx0aGlzfSxzZXRFbmQ6ZnVuY3Rpb24oYSl7cmV0dXJuIHU9YXx8dSx0aGlzfSxzdGFydDpmdW5jdGlvbigpe3JldHVybiBsfHwobD0hMCx2PW8oZnVuY3Rpb24oYSl7dCgxKSxrPSEwLGU9YSxnPWEsaD0wLHY9byhiKX0pKSx0aGlzfSxzdG9wOmZ1bmN0aW9uKCl7cmV0dXJuIGs9ITEsbD0hMSxwKHYpLHRoaXN9LGlzUnVubmluZzpmdW5jdGlvbigpe3JldHVybiBrfX0sXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShhLk1haW5Mb29wKTpcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZudWxsIT09bW9kdWxlJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlLmV4cG9ydHMmJihtb2R1bGUuZXhwb3J0cz1hLk1haW5Mb29wKX0odGhpcyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWlubG9vcC5taW4uanMubWFwIiwidmFyIGJhYmVsSGVscGVycyA9IHt9O1xuZXhwb3J0IHZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbn07XG5cbmV4cG9ydCB2YXIganN4ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5mb3IgJiYgU3ltYm9sLmZvcihcInJlYWN0LmVsZW1lbnRcIikgfHwgMHhlYWM3O1xuICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlUmF3UmVhY3RFbGVtZW50KHR5cGUsIHByb3BzLCBrZXksIGNoaWxkcmVuKSB7XG4gICAgdmFyIGRlZmF1bHRQcm9wcyA9IHR5cGUgJiYgdHlwZS5kZWZhdWx0UHJvcHM7XG4gICAgdmFyIGNoaWxkcmVuTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCAtIDM7XG5cbiAgICBpZiAoIXByb3BzICYmIGNoaWxkcmVuTGVuZ3RoICE9PSAwKSB7XG4gICAgICBwcm9wcyA9IHt9O1xuICAgIH1cblxuICAgIGlmIChwcm9wcyAmJiBkZWZhdWx0UHJvcHMpIHtcbiAgICAgIGZvciAodmFyIHByb3BOYW1lIGluIGRlZmF1bHRQcm9wcykge1xuICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSB2b2lkIDApIHtcbiAgICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBkZWZhdWx0UHJvcHNbcHJvcE5hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghcHJvcHMpIHtcbiAgICAgIHByb3BzID0gZGVmYXVsdFByb3BzIHx8IHt9O1xuICAgIH1cblxuICAgIGlmIChjaGlsZHJlbkxlbmd0aCA9PT0gMSkge1xuICAgICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgICAgdmFyIGNoaWxkQXJyYXkgPSBBcnJheShjaGlsZHJlbkxlbmd0aCk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgICBjaGlsZEFycmF5W2ldID0gYXJndW1lbnRzW2kgKyAzXTtcbiAgICAgIH1cblxuICAgICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZEFycmF5O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAkJHR5cGVvZjogUkVBQ1RfRUxFTUVOVF9UWVBFLFxuICAgICAgdHlwZTogdHlwZSxcbiAgICAgIGtleToga2V5ID09PSB1bmRlZmluZWQgPyBudWxsIDogJycgKyBrZXksXG4gICAgICByZWY6IG51bGwsXG4gICAgICBwcm9wczogcHJvcHMsXG4gICAgICBfb3duZXI6IG51bGxcbiAgICB9O1xuICB9O1xufSgpO1xuXG5leHBvcnQgdmFyIGFzeW5jVG9HZW5lcmF0b3IgPSBmdW5jdGlvbiAoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZ2VuID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZnVuY3Rpb24gc3RlcChrZXksIGFyZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RlcChcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGVwKFwidGhyb3dcIiwgZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RlcChcIm5leHRcIik7XG4gICAgfSk7XG4gIH07XG59O1xuXG5leHBvcnQgdmFyIGNsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07XG5cbmV4cG9ydCB2YXIgY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cbmV4cG9ydCB2YXIgZGVmaW5lRW51bWVyYWJsZVByb3BlcnRpZXMgPSBmdW5jdGlvbiAob2JqLCBkZXNjcykge1xuICBmb3IgKHZhciBrZXkgaW4gZGVzY3MpIHtcbiAgICB2YXIgZGVzYyA9IGRlc2NzW2tleV07XG4gICAgZGVzYy5jb25maWd1cmFibGUgPSBkZXNjLmVudW1lcmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzYykgZGVzYy53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCBkZXNjKTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG5leHBvcnQgdmFyIGRlZmF1bHRzID0gZnVuY3Rpb24gKG9iaiwgZGVmYXVsdHMpIHtcbiAgdmFyIGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhkZWZhdWx0cyk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgdmFyIHZhbHVlID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihkZWZhdWx0cywga2V5KTtcblxuICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5jb25maWd1cmFibGUgJiYgb2JqW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbmV4cG9ydCB2YXIgZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbmV4cG9ydCB2YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuZXhwb3J0IHZhciBnZXQgPSBmdW5jdGlvbiBnZXQob2JqZWN0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTtcblxuICAgIGlmIChwYXJlbnQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBnZXQocGFyZW50LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChcInZhbHVlXCIgaW4gZGVzYykge1xuICAgIHJldHVybiBkZXNjLnZhbHVlO1xuICB9IGVsc2Uge1xuICAgIHZhciBnZXR0ZXIgPSBkZXNjLmdldDtcblxuICAgIGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpO1xuICB9XG59O1xuXG5leHBvcnQgdmFyIGluaGVyaXRzID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufTtcblxuZXhwb3J0IHZhciBfaW5zdGFuY2VvZiA9IGZ1bmN0aW9uIChsZWZ0LCByaWdodCkge1xuICBpZiAocmlnaHQgIT0gbnVsbCAmJiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIHJpZ2h0W1N5bWJvbC5oYXNJbnN0YW5jZV0pIHtcbiAgICByZXR1cm4gcmlnaHRbU3ltYm9sLmhhc0luc3RhbmNlXShsZWZ0KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGVmdCBpbnN0YW5jZW9mIHJpZ2h0O1xuICB9XG59O1xuXG5leHBvcnQgdmFyIGludGVyb3BSZXF1aXJlRGVmYXVsdCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBkZWZhdWx0OiBvYmpcbiAgfTtcbn07XG5cbmV4cG9ydCB2YXIgaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IGZ1bmN0aW9uIChvYmopIHtcbiAgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkge1xuICAgIHJldHVybiBvYmo7XG4gIH0gZWxzZSB7XG4gICAgdmFyIG5ld09iaiA9IHt9O1xuXG4gICAgaWYgKG9iaiAhPSBudWxsKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSBuZXdPYmpba2V5XSA9IG9ialtrZXldO1xuICAgICAgfVxuICAgIH1cblxuICAgIG5ld09iai5kZWZhdWx0ID0gb2JqO1xuICAgIHJldHVybiBuZXdPYmo7XG4gIH1cbn07XG5cbmV4cG9ydCB2YXIgbmV3QXJyb3dDaGVjayA9IGZ1bmN0aW9uIChpbm5lclRoaXMsIGJvdW5kVGhpcykge1xuICBpZiAoaW5uZXJUaGlzICE9PSBib3VuZFRoaXMpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGluc3RhbnRpYXRlIGFuIGFycm93IGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5leHBvcnQgdmFyIG9iamVjdERlc3RydWN0dXJpbmdFbXB0eSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgaWYgKG9iaiA9PSBudWxsKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGRlc3RydWN0dXJlIHVuZGVmaW5lZFwiKTtcbn07XG5cbmV4cG9ydCB2YXIgb2JqZWN0V2l0aG91dFByb3BlcnRpZXMgPSBmdW5jdGlvbiAob2JqLCBrZXlzKSB7XG4gIHZhciB0YXJnZXQgPSB7fTtcblxuICBmb3IgKHZhciBpIGluIG9iaikge1xuICAgIGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7XG4gICAgdGFyZ2V0W2ldID0gb2JqW2ldO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cbmV4cG9ydCB2YXIgcG9zc2libGVDb25zdHJ1Y3RvclJldHVybiA9IGZ1bmN0aW9uIChzZWxmLCBjYWxsKSB7XG4gIGlmICghc2VsZikge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmO1xufTtcblxuZXhwb3J0IHZhciBzZWxmR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiBnbG9iYWw7XG5cbmV4cG9ydCB2YXIgc2V0ID0gZnVuY3Rpb24gc2V0KG9iamVjdCwgcHJvcGVydHksIHZhbHVlLCByZWNlaXZlcikge1xuICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7XG5cbiAgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTtcblxuICAgIGlmIChwYXJlbnQgIT09IG51bGwpIHtcbiAgICAgIHNldChwYXJlbnQsIHByb3BlcnR5LCB2YWx1ZSwgcmVjZWl2ZXIpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChcInZhbHVlXCIgaW4gZGVzYyAmJiBkZXNjLndyaXRhYmxlKSB7XG4gICAgZGVzYy52YWx1ZSA9IHZhbHVlO1xuICB9IGVsc2Uge1xuICAgIHZhciBzZXR0ZXIgPSBkZXNjLnNldDtcblxuICAgIGlmIChzZXR0ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgc2V0dGVyLmNhbGwocmVjZWl2ZXIsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59O1xuXG5leHBvcnQgdmFyIHNsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7XG4gICAgdmFyIF9hcnIgPSBbXTtcbiAgICB2YXIgX24gPSB0cnVlO1xuICAgIHZhciBfZCA9IGZhbHNlO1xuICAgIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2QgPSB0cnVlO1xuICAgICAgX2UgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBfYXJyO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7XG4gICAgICByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgICB9XG4gIH07XG59KCk7XG5cbmV4cG9ydCB2YXIgc2xpY2VkVG9BcnJheUxvb3NlID0gZnVuY3Rpb24gKGFyciwgaSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgcmV0dXJuIGFycjtcbiAgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHtcbiAgICB2YXIgX2FyciA9IFtdO1xuXG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lOykge1xuICAgICAgX2Fyci5wdXNoKF9zdGVwLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBfYXJyO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xuICB9XG59O1xuXG5leHBvcnQgdmFyIHRhZ2dlZFRlbXBsYXRlTGl0ZXJhbCA9IGZ1bmN0aW9uIChzdHJpbmdzLCByYXcpIHtcbiAgcmV0dXJuIE9iamVjdC5mcmVlemUoT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoc3RyaW5ncywge1xuICAgIHJhdzoge1xuICAgICAgdmFsdWU6IE9iamVjdC5mcmVlemUocmF3KVxuICAgIH1cbiAgfSkpO1xufTtcblxuZXhwb3J0IHZhciB0YWdnZWRUZW1wbGF0ZUxpdGVyYWxMb29zZSA9IGZ1bmN0aW9uIChzdHJpbmdzLCByYXcpIHtcbiAgc3RyaW5ncy5yYXcgPSByYXc7XG4gIHJldHVybiBzdHJpbmdzO1xufTtcblxuZXhwb3J0IHZhciB0ZW1wb3JhbFJlZiA9IGZ1bmN0aW9uICh2YWwsIG5hbWUsIHVuZGVmKSB7XG4gIGlmICh2YWwgPT09IHVuZGVmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKG5hbWUgKyBcIiBpcyBub3QgZGVmaW5lZCAtIHRlbXBvcmFsIGRlYWQgem9uZVwiKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsO1xuICB9XG59O1xuXG5leHBvcnQgdmFyIHRlbXBvcmFsVW5kZWZpbmVkID0ge307XG5cbmV4cG9ydCB2YXIgdG9BcnJheSA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXJyKSA/IGFyciA6IEFycmF5LmZyb20oYXJyKTtcbn07XG5cbmV4cG9ydCB2YXIgdG9Db25zdW1hYmxlQXJyYXkgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSBhcnIyW2ldID0gYXJyW2ldO1xuXG4gICAgcmV0dXJuIGFycjI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oYXJyKTtcbiAgfVxufTtcblxuYmFiZWxIZWxwZXJzO1xuXG5leHBvcnQgeyBfdHlwZW9mIGFzIHR5cGVvZiwgX2V4dGVuZHMgYXMgZXh0ZW5kcywgX2luc3RhbmNlb2YgYXMgaW5zdGFuY2VvZiB9IiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IE1haW5Mb29wIGZyb20gJ21haW5sb29wLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluTG9vcExvb3BNYW5hZ2VyIHtcbiAgICAvLyBzZXRVcGRhdGUodXBkYXRlTWV0aG9kIDogKGRlbHRhIDogbnVtYmVyKSA9PiB2b2lkKSA6IE1haW5Mb29wTG9vcE1hbmFnZXIge1xuICAgIHNldFVwZGF0ZSh1cGRhdGVNZXRob2QpIHtcbiAgICAgICAgTWFpbkxvb3Auc2V0VXBkYXRlKHVwZGF0ZU1ldGhvZClcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICAgIFxuICAgIHNldFJlbmRlcihyZW5kZXJNZXRob2QgOiAoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UgOiBudW1iZXIpID0+IHZvaWQpIDogTWFpbkxvb3BMb29wTWFuYWdlciB7XG4gICAgICAgIE1haW5Mb29wLnNldERyYXcocmVuZGVyTWV0aG9kKVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgXG4gICAgc3RhcnQoKSA6IHZvaWQge1xuICAgICAgICBNYWluTG9vcC5zdGFydCgpXG4gICAgfVxuICAgIFxuICAgIHN0b3AoKSA6IHZvaWQge1xuICAgICAgICBNYWluTG9vcC5zdG9wKClcbiAgICB9XG59IiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IHRocmVlIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGhyZWVPYmplY3RNZXNoTG9hZGVyIHtcbiAgICBsb2FkZXIgIDogdGhyZWUuT2JqZWN0TG9hZGVyO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmxvYWRlciAgPSBuZXcgdGhyZWUuT2JqZWN0TG9hZGVyKCk7XG4gICAgfVxuICAgIFxuICAgIG9uUHJvZ3Jlc3MoKSB7XG4gICAgICAgIC8vIHBsYWNlaG9sZGVyXG4gICAgfVxuICAgIFxuICAgIHBhcnNlKGpzb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9hZGVyLnBhcnNlKGpzb24pXG4gICAgfVxuICAgIFxuICAgIC8vIHRvZG8gdGhpcyBub3cgcmV0dXJucyBhIHNjZW5lLi4gaW1wbGljYXRpb25zP1xuICAgIC8vIHRvZG8gYWRkIG9wdGlvbnMgYXMgYSBkZXN0cnVjdGFibGUgb2JqZWN0IC0+IHN0b3BwZWQgYnkgZmxvdzogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvaXNzdWVzLzE4M1xuICAgIGxvYWQocGF0aCA6IHN0cmluZywgb3B0aW9ucz8gOiBPYmplY3QpIDogUHJvbWlzZSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc2hhZGluZyA9IChvcHRpb25zIHx8IHsgfSkuc2hhZGluZztcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHNlbGYubG9hZGVyLmxvYWQocGF0aCwgb2JqID0+IHJlc29sdmUob2JqKSwgaW5mbyA9PiBzZWxmLm9uUHJvZ3Jlc3MoaW5mbyksIGVyciA9PiByZWplY3QoZXJyKSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4obWVzaCA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNoYWRpbmcgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc2g7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG1lc2gudHJhdmVyc2UoY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIHRocmVlLk1lc2gpIHtcbiAgICAgICAgICAgICAgICAgICBjaGlsZC5tYXRlcmlhbC5zaGFkaW5nID0gc2hhZGluZztcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gbWVzaDtcbiAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG59IiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IHRocmVlIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGhyZWVSZW5kZXJlck1hbmFnZXIge1xuICAgIHJlbmRlcmVyICAgICA6IHRocmVlLldlYkdMUmVuZGVyZXI7XG4gICAgY2FtZXJhICAgICAgIDogdGhyZWUuQ2FtZXJhO1xuICAgIC8vIGdlb21ldHJpZXMgICA6IE1hcDxzdHJpbmcsIHRocmVlLkdlb21ldHJ5PjtcbiAgICAvLyBtYXRlcmlhbHMgICAgOiBNYXA8c3RyaW5nLCB0aHJlZS5NYXRlcmlhbD47XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgdGhyZWUuV2ViR0xSZW5kZXJlcih7IGFudGlhbGlhcyA6IHRydWUgfSk7XG5cdFx0dGhpcy5yZW5kZXJlci5zZXRDbGVhckNvbG9yKCAweDAwMDAwMCApO1xuXHRcdHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyggd2luZG93LmRldmljZVBpeGVsUmF0aW8gKTtcbiAgICB9XG4gICAgXG4gICAgZW5hYmxlU2hhZG93cygpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWVcbiAgICB9XG4gICAgXG4gICAgaXNGdWxsU2NyZWVuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5fZnVsbFNjcmVlblxuICAgIH1cbiAgICBcbiAgICAvL3RvZG8gbWFrZSBpbnRvIGdldHRlciAvIHNldHRlciA/XG4gICAgc2V0U2NlbmUoc2NlbmUpIHtcbiAgICAgICAgdGhpcy5zY2VuZSA9IHNjZW5lXG4gICAgfVxuICAgIFxuICAgIHNldENhbWVyYShjYW1lcmEsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmFcbiAgICB9XG4gICAgXG4gICAgc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0Z1bGxTY3JlZW4oKSkge1xuXHRcdCAgICB0aGlzLmNhbWVyYS5hc3BlY3QgPSAod2lkdGggfHwgNTAwKSAvIChoZWlnaHQgfHwgNTAwKVxuICAgIFx0fVxuXHRcdFxuXHRcdHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKVxuXHRcdFxuXHRcdGlmICghdGhpcy5pc0Z1bGxTY3JlZW4oKSkge1xuXHQgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCB8fCA1MDAsIGhlaWdodCB8fCA1MDApXG5cdFx0fVxuICAgIH1cbiAgICBcbiAgICBnZXREb20oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnRcbiAgICB9XG4gICAgXG4gICAgZ2V0U2NlbmUoKSA6IHRocmVlLlNjZW5lIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NlbmU7XG4gICAgfVxuICAgIFxuICAgIGdldEdlb21ldHJ5KGtleSA6IHN0cmluZykgOiB0aHJlZS5HZW9tZXRyeSB7XG4gICAgICAgIHJldHVybiBnZW9tZXRyaWVzLmdldChrZXkpO1xuICAgIH1cbiAgICBcbiAgICBnZXRNYXRlcmlhbChrZXkgOiBzdHJpbmcpIDogdGhyZWUuTWF0ZXJpYWwge1xuICAgICAgICByZXR1cm4gbWF0ZXJpYWxzLmdldChrZXkpO1xuICAgIH1cbiAgICBcbiAgICBhZGRNZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCkge1xuICAgICAgICB2YXIgZ2VvID0gdGhpcy5nZW9tZXRyaWVzLmdldChnZW9tZXRyeSk7XG4gICAgICAgIHZhciBtYXQgPSB0aGlzLm1hdGVyaWFscy5nZXQobWF0ZXJpYWwpO1xuICAgICAgICB2YXIgbWVzaCA9IG5ldyB0aHJlZS5NZXNoKGdlbywgbWF0KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKG1lc2gpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG1lc2g7XG4gICAgfVxuICAgIFxuICAgIHJlbmRlcihpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSA6IG51bWJlcikgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpO1xuICAgIH1cbiAgICBcbiAgICAvLyByZW5kZXIoc2NlbmUgOiB0aHJlZS5TY2VuZSwgaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UgOiBudW1iZXIpIDogdm9pZCB7XG4gICAgLy8gICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gICAgLy8gfVxufVxuIiwiLy9pbXBvcnQgRW50aXR5TWFuYWdlciAgICAgICAgIGZyb20gJ2dnLWVudGl0aWVzJ1xuaW1wb3J0IE1haW5Mb29wTG9vcE1hbmFnZXIgICBmcm9tICcuLi9sb2dpYy9tYWlubG9vcC1sb29wLW1hbmFnZXInXG4vLyBpbXBvcnQgRmV0Y2hGaWxlTG9hZGVyICAgICAgIGZyb20gJy4uL2xvZ2ljL2ZldGNoLWZpbGUtbG9hZGVyJ1xuaW1wb3J0IFRocmVlT2JqZWN0TWVzaExvYWRlciBmcm9tICcuLi9sb2dpYy90aHJlZS1vYmplY3QtbWVzaC1sb2FkZXInXG5cbmltcG9ydCBUaHJlZVJlbmRlcmVyTWFuYWdlciBmcm9tICcuLi92aWV3L3RocmVlLXJlbmRlcmVyLW1hbmFnZXInXG5cbmNvbnN0IF9sb29wTWFuYWdlciAgICAgPSBuZXcgTWFpbkxvb3BMb29wTWFuYWdlcigpXG4vLyBjb25zdCBfZmlsZUxvYWRlciAgICAgID0gbmV3IEZldGNoRmlsZUxvYWRlcigpXG5jb25zdCBfbG9hZGVyICAgICAgICAgID0gbmV3IFRocmVlT2JqZWN0TWVzaExvYWRlcigpXG5jb25zdCBfcmVuZGVyZXJNYW5hZ2VyID0gbmV3IFRocmVlUmVuZGVyZXJNYW5hZ2VyKClcbi8vY29uc3QgX2VudGl0eU1hbmFnZXIgICA9IG5ldyBFbnRpdHlNYW5hZ2VyKClcblxuY29uc3QgbG9vcE1hbmFnZXIgICAgID0gKCkgPT4gX2xvb3BNYW5hZ2VyXG4vLyBjb25zdCBmaWxlTG9hZGVyICAgICAgPSAoKSA9PiBfZmlsZUxvYWRlclxuY29uc3QgbG9hZGVyICAgICAgICAgID0gKCkgPT4gX2xvYWRlclxuY29uc3QgcmVuZGVyZXJNYW5hZ2VyID0gKCkgPT4gX3JlbmRlcmVyTWFuYWdlclxuLy8gY29uc3QgZW50aXR5TWFuYWdlciAgID0gKCkgPT4gX2VudGl0eU1hbmFnZXJcblxuZXhwb3J0IGRlZmF1bHQge2xvb3BNYW5hZ2VyLCBsb2FkZXIsIHJlbmRlcmVyTWFuYWdlcn1cbmV4cG9ydCB7bG9vcE1hbmFnZXIsIGxvYWRlciwgcmVuZGVyZXJNYW5hZ2VyfSIsIi8vIC8qIEBmbG93ICovXG5cbmltcG9ydCBESSBmcm9tICcuL0RJL2Jyb3dzZXInXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdHIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICBcdC8vIHdpZHRoIGFuZCBoZWlnaHQgc2V0IHRvIDUwMCBqdXN0IHRvIGhhdmUgaXQgYXMgaW4gdGhlIGVkaXRvciBmb3IgdGhlIHRpbWUgYmVpbmdcbiAgICBcdHRoaXMud2lkdGggID0gNTAwXG4gICAgXHR0aGlzLmhlaWdodCA9IDUwMFxuICAgIFx0XG4gICAgICAgIC8vIHRoaXMuZW50aXR5TWFuYWdlciAgID0gREkuZW50aXR5TWFuYWdlcigpXG4gICAgICAgIHRoaXMubG9vcE1hbmFnZXIgICAgID0gREkubG9vcE1hbmFnZXIoKVxuICAgICAgICB0aGlzLnJlbmRlcmVyTWFuYWdlciA9IERJLnJlbmRlcmVyTWFuYWdlcigpXG4gICAgICAgIHRoaXMubG9hZGVyXHRcdFx0ID0gREkubG9hZGVyKClcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZG9tID0gdGhpcy5yZW5kZXJlck1hbmFnZXIuZ2V0RG9tKClcbiAgICAgICAgXG4gICAgICAgIC8vIHRoaXMuZW50aXR5TWFuYWdlci5vbkluaXQoe3JlbmRlck1hbmFnZXI6IHRoaXMucmVuZGVyZXJNYW5hZ2VyfSlcbiAgICAgICAgXG4gICAgICAgIHRoaXMubG9vcE1hbmFnZXIuc2V0VXBkYXRlKGRlbHRhID0+IHtcbiAgICAgICAgICAgIC8vIHRoaXMuZW50aXR5TWFuYWdlci5vbkxvZ2ljKGRlbHRhKVxuICAgICAgICB9KS5zZXRSZW5kZXIoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UgPT4ge1xuICAgICAgICAgICAgLy8gdGhpcy5lbnRpdHlNYW5hZ2VyLm9uUmVuZGVyKHtkZWx0YSA6IGludGVycG9sYXRpb25QZXJjZW50YWdlLCByZW5kZXJNYW5hZ2VyOiB0aGlzLnJlbmRlcmVyTWFuYWdlcn0pXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyTWFuYWdlci5yZW5kZXIoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UpXG4gICAgICAgIH0pXG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyRW50aXR5Q29uZmlndXJhdGlvbihrZXksIGVudGl0eSkge1xuICAgICAgICAvLyB0aGlzLmVudGl0eU1hbmFnZXIuYnVpbGQoKVxuICAgICAgICBcbiAgICAgICAgLy8gZm9yIChsZXQgY29tcG9uZW50IG9mIGVudGl0eS5jb21wb25lbnRzKSB7XG4gICAgICAgIC8vICAgICB0aGlzLmVudGl0eU1hbmFnZXIud2l0aENvbXBvbmVudChjb21wb25lbnQpXG4gICAgICAgIC8vIH1cbiAgICAgICAgXG4gICAgICAgIC8vIHRoaXMuZW50aXR5TWFuYWdlci5yZWdpc3RlckNvbmZpZ3VyYXRpb24oa2V5KVxuICAgIH1cbiAgICBcbiAgICBsb2FkKHtwcm9qZWN0LCBzY2VuZSwgY2FtZXJhfSkge1xuICAgICAgICBjb25zdCBwYXJzZWRTY2VuZSA9IHRoaXMubG9hZGVyLnBhcnNlKHNjZW5lKVxuICAgICAgICBjb25zdCBwYXJzZWRDYW1lcmEgPSB0aGlzLmxvYWRlci5wYXJzZShjYW1lcmEpXG4gICAgICAgIFxuICAgIFx0aWYgKHByb2plY3Quc2hhZG93cykge1xuXHRcdFx0dGhpcy5yZW5kZXJlck1hbmFnZXIuZW5hYmxlU2hhZG93cygpXG5cdFx0fVxuXHRcdFxuICAgIFx0Ly90b2RvOiBjaGVjayBmb3IgY2FtZXJhIGFuZCBzY2VuZSBmaXJzdD8gdGhyb3cgaWYgbm90P1xuICAgIFx0dGhpcy5yZW5kZXJlck1hbmFnZXIuc2V0U2NlbmUocGFyc2VkU2NlbmUpXG4gICAgXHR0aGlzLnJlbmRlcmVyTWFuYWdlci5zZXRDYW1lcmEocGFyc2VkQ2FtZXJhLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodClcblx0fVxuICAgIFxuICAgIHNldFNpemUod2lkdGgsIGhlaWdodCkgIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlbmRlcmVyTWFuYWdlci5zZXRTaXplKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KVxuICAgIH1cbiAgICBcbiAgICBnZXREb20oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyTWFuYWdlci5nZXREb20oKVxuICAgIH1cbiAgICBcbiAgICBwbGF5KCkge1xuICAgICAgICB0aGlzLmxvb3BNYW5hZ2VyLnN0YXJ0KClcbiAgICB9XG4gICAgXG4gICAgc3RvcCgpIHtcbiAgICAgICAgdGhpcy5sb29wTWFuYWdlci5zdG9wKClcbiAgICB9XG59Il0sIm5hbWVzIjpbInRoaXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLEVBQUE7Ozs7Ozs7QUFPQSxFQUFBLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxPQUFPLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLE9BQU8s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