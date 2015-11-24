(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('three')) :
  typeof define === 'function' && define.amd ? define('Test', ['three'], factory) :
  factory(global.THREE);
}(this, function (three) { 'use strict';

  three = 'default' in three ? three['default'] : three;

  var babelHelpers = {};

  babelHelpers.typeof = function (obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  babelHelpers.asyncToGenerator = function (fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        var callNext = step.bind(null, "next");
        var callThrow = step.bind(null, "throw");

        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            Promise.resolve(value).then(callNext, callThrow);
          }
        }

        callNext();
      });
    };
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = (function () {
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
  })();

  babelHelpers.slicedToArray = (function () {
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
  })();

  babelHelpers.toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  babelHelpers;
  var ThreeRendererManager = (function () {
      function ThreeRendererManager() {
          babelHelpers.classCallCheck(this, ThreeRendererManager);

          this.renderer = new three.WebGLRenderer();
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
  })();

  var ThreeSceneManager = (function () {
      function ThreeSceneManager() {
          babelHelpers.classCallCheck(this, ThreeSceneManager);

          this.scenes = [];
      }

      babelHelpers.createClass(ThreeSceneManager, [{
          key: 'createScene',
          value: function createScene() {
              // Create a new scene, add it to the list of scenes and return a handle (id) to it
              return this.scenes.push(new three.Scene()) - 1;
          }
      }, {
          key: 'getScene',
          value: function getScene(sceneId) {
              return this.scenes[sceneId];
          }
      }, {
          key: 'addToScene',
          value: function addToScene(sceneId, object) {
              this.scenes[sceneId].add(object);
          }
      }, {
          key: 'addAmbientLightToScene',
          value: function addAmbientLightToScene(sceneId, color) {
              this.scenes[sceneId].add(new three.AmbientLight(color));
          }
      }, {
          key: 'addDirectionalLightToScene',
          value: function addDirectionalLightToScene(sceneId, color, x, y, z) {
              var light = new three.DirectionalLight(color);
              light.position.set(x, y, z);

              this.scenes[sceneId].add(light);
          }
      }, {
          key: 'removeFromScene',
          value: function removeFromScene(sceneId, object) {
              this.scenes[sceneId].remove(object);
          }
      }]);
      return ThreeSceneManager;
  })();

  var ThreeMeshManager = (function () {
      function ThreeMeshManager() {
          babelHelpers.classCallCheck(this, ThreeMeshManager);

          this.meshes = [];
      }

      babelHelpers.createClass(ThreeMeshManager, [{
          key: 'addMesh',
          value: function addMesh(object) {
              return this.meshes.push(object) - 1;
          }
      }, {
          key: 'getMesh',
          value: function getMesh(meshId) {
              return this.meshes[meshId];
          }
      }]);
      return ThreeMeshManager;
  })();

  var ThreeObjectMeshLoader = (function () {
      function ThreeObjectMeshLoader() {
          babelHelpers.classCallCheck(this, ThreeObjectMeshLoader);

          this.loader = new three.ObjectLoader();
      }

      babelHelpers.createClass(ThreeObjectMeshLoader, [{
          key: 'onProgress',
          value: function onProgress() {}
          // placeholder

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
  })();

  var jqueryParam = (function (module) {
      var exports = module.exports;
      /**
       * @preserve jquery-param (c) 2015 KNOWLEDGECODE | MIT
       */
      /*global define */
      (function (global) {
          'use strict';

          var param = function param(a) {
              var add = function add(s, k, v) {
                  v = typeof v === 'function' ? v() : v === null ? '' : v === undefined ? '' : v;
                  s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
              },
                  buildParams = function buildParams(prefix, obj, s) {
                  var i, len, key;

                  if (Object.prototype.toString.call(obj) === '[object Array]') {
                      for (i = 0, len = obj.length; i < len; i++) {
                          buildParams(prefix + '[' + (babelHelpers.typeof(obj[i]) === 'object' ? i : '') + ']', obj[i], s);
                      }
                  } else if (obj && obj.toString() === '[object Object]') {
                      for (key in obj) {
                          if (obj.hasOwnProperty(key)) {
                              if (prefix) {
                                  buildParams(prefix + '[' + key + ']', obj[key], s, add);
                              } else {
                                  buildParams(key, obj[key], s, add);
                              }
                          }
                      }
                  } else if (prefix) {
                      add(s, prefix, obj);
                  } else {
                      for (key in obj) {
                          add(s, key, obj[key]);
                      }
                  }
                  return s;
              };
              return buildParams('', a, []).join('&').replace(/%20/g, '+');
          };

          if ((typeof module === 'undefined' ? 'undefined' : babelHelpers.typeof(module)) === 'object' && babelHelpers.typeof(module.exports) === 'object') {
              module.exports = param;
          } else if (typeof define === 'function' && define.amd) {
              define([], function () {
                  return param;
              });
          } else {
              global.param = param;
          }
      })(this);
      return module.exports;
  })({ exports: {} });

  var pinkyswear = (function (module) {
  	var exports = module.exports;
  	/*
    * PinkySwear.js 2.2.2 - Minimalistic implementation of the Promises/A+ spec
    * 
    * Public Domain. Use, modify and distribute it any way you like. No attribution required.
    *
    * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
    *
    * PinkySwear is a very small implementation of the Promises/A+ specification. After compilation with the
    * Google Closure Compiler and gzipping it weighs less than 500 bytes. It is based on the implementation for 
    * Minified.js and should be perfect for embedding. 
    *
    *
    * PinkySwear has just three functions.
    *
    * To create a new promise in pending state, call pinkySwear():
    *         var promise = pinkySwear();
    *
    * The returned object has a Promises/A+ compatible then() implementation:
    *          promise.then(function(value) { alert("Success!"); }, function(value) { alert("Failure!"); });
    *
    *
    * The promise returned by pinkySwear() is a function. To fulfill the promise, call the function with true as first argument and
    * an optional array of values to pass to the then() handler. By putting more than one value in the array, you can pass more than one
    * value to the then() handlers. Here an example to fulfill a promsise, this time with only one argument: 
    *         promise(true, [42]);
    *
    * When the promise has been rejected, call it with false. Again, there may be more than one argument for the then() handler:
    *         promise(true, [6, 6, 6]);
    *         
    * You can obtain the promise's current state by calling the function without arguments. It will be true if fulfilled,
    * false if rejected, and otherwise undefined.
    * 		   var state = promise(); 
    * 
    * https://github.com/timjansen/PinkySwear.js
    */
  	(function (target) {
  		var undef;

  		function isFunction(f) {
  			return typeof f == 'function';
  		}
  		function isObject(f) {
  			return (typeof f === 'undefined' ? 'undefined' : babelHelpers.typeof(f)) == 'object';
  		}
  		function defer(callback) {
  			if (typeof setImmediate != 'undefined') setImmediate(callback);else if (typeof process != 'undefined' && process['nextTick']) process['nextTick'](callback);else setTimeout(callback, 0);
  		}

  		target[0][target[1]] = function pinkySwear(extend) {
  			var state; // undefined/null = pending, true = fulfilled, false = rejected
  			var values = []; // an array of values as arguments for the then() handlers
  			var deferred = []; // functions to call when set() is invoked

  			var set = function set(newState, newValues) {
  				if (state == null && newState != null) {
  					state = newState;
  					values = newValues;
  					if (deferred.length) defer(function () {
  						for (var i = 0; i < deferred.length; i++) {
  							deferred[i]();
  						}
  					});
  				}
  				return state;
  			};

  			set['then'] = function (onFulfilled, onRejected) {
  				var promise2 = pinkySwear(extend);
  				var callCallbacks = function callCallbacks() {
  					try {
  						var f = state ? onFulfilled : onRejected;
  						if (isFunction(f)) {
  							(function () {
  								var resolve = function resolve(x) {
  									var then,
  									    cbCalled = 0;
  									try {
  										if (x && (isObject(x) || isFunction(x)) && isFunction(then = x['then'])) {
  											if (x === promise2) throw new TypeError();
  											then['call'](x, function () {
  												if (! cbCalled++) resolve.apply(undef, arguments);
  											}, function (value) {
  												if (! cbCalled++) promise2(false, [value]);
  											});
  										} else promise2(true, arguments);
  									} catch (e) {
  										if (! cbCalled++) promise2(false, [e]);
  									}
  								};

  								resolve(f.apply(undef, values || []));
  							})();
  						} else promise2(state, values);
  					} catch (e) {
  						promise2(false, [e]);
  					}
  				};
  				if (state != null) defer(callCallbacks);else deferred.push(callCallbacks);
  				return promise2;
  			};
  			if (extend) {
  				set = extend(set);
  			}
  			return set;
  		};
  	})(typeof module == 'undefined' ? [window, 'pinkySwear'] : [module, 'exports']);
  	return module.exports;
  })({ exports: {} });

  var qwest = (function (module) {
  	var exports = module.exports;
  	/*! qwest 2.2.3 (https://github.com/pyrsmk/qwest) */

  	module.exports = (function () {

  		var global = window || this,
  		    pinkyswear$$ = pinkyswear,
  		    jparam = jqueryParam,
  		   
  		// Default response type for XDR in auto mode
  		defaultXdrResponseType = 'json',
  		   
  		// Default data type
  		defaultDataType = 'post',
  		   
  		// Variables for limit mechanism
  		_limit = null,
  		    requests = 0,
  		    request_stack = [],
  		   
  		// Get XMLHttpRequest object
  		getXHR = function getXHR() {
  			return global.XMLHttpRequest ? new global.XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  		},
  		   
  		// Guess XHR version
  		xhr2 = getXHR().responseType === '',
  		   

  		// Core function
  		qwest = function qwest(method, url, data, options, before) {

  			// Format
  			method = method.toUpperCase();
  			data = data || null;
  			options = options || {};

  			// Define variables
  			var nativeResponseParsing = false,
  			    crossOrigin,
  			    xhr,
  			    xdr = false,
  			    timeoutInterval,
  			    aborted = false,
  			    attempts = 0,
  			    headers = {},
  			    mimeTypes = {
  				text: '*/*',
  				xml: 'text/xml',
  				json: 'application/json',
  				post: 'application/x-www-form-urlencoded'
  			},
  			    accept = {
  				text: '*/*',
  				xml: 'application/xml; q=1.0, text/xml; q=0.8, */*; q=0.1',
  				json: 'application/json; q=1.0, text/*; q=0.8, */*; q=0.1'
  			},
  			    vars = '',
  			    i,
  			    j,
  			    serialized,
  			    response,
  			    sending = false,
  			    delayed = false,
  			    timeout_start,
  			   

  			// Create the promise
  			promise = pinkyswear$$(function (pinky) {
  				pinky['catch'] = function (f) {
  					return pinky.then(null, f);
  				};
  				pinky.complete = function (f) {
  					return pinky.then(f, f);
  				};
  				// Override
  				if ('pinkyswear' in options) {
  					for (i in options.pinkyswear) {
  						pinky[i] = options.pinkyswear[i];
  					}
  				}
  				pinky.send = function () {
  					// Prevent further send() calls
  					if (sending) {
  						return;
  					}
  					// Reached request limit, get out!
  					if (requests == _limit) {
  						request_stack.push(pinky);
  						return;
  					}
  					++requests;
  					sending = true;
  					// Start the chrono
  					timeout_start = new Date().getTime();
  					// Get XHR object
  					xhr = getXHR();
  					if (crossOrigin) {
  						if (!('withCredentials' in xhr) && global.XDomainRequest) {
  							xhr = new XDomainRequest(); // CORS with IE8/9
  							xdr = true;
  							if (method != 'GET' && method != 'POST') {
  								method = 'POST';
  							}
  						}
  					}
  					// Open connection
  					if (xdr) {
  						xhr.open(method, url);
  					} else {
  						xhr.open(method, url, options.async, options.user, options.password);
  						if (xhr2 && options.async) {
  							xhr.withCredentials = options.withCredentials;
  						}
  					}
  					// Set headers
  					if (!xdr) {
  						for (var i in headers) {
  							if (headers[i]) {
  								xhr.setRequestHeader(i, headers[i]);
  							}
  						}
  					}
  					// Verify if the response type is supported by the current browser
  					if (xhr2 && options.responseType != 'document' && options.responseType != 'auto') {
  						// Don't verify for 'document' since we're using an internal routine
  						try {
  							xhr.responseType = options.responseType;
  							nativeResponseParsing = xhr.responseType == options.responseType;
  						} catch (e) {}
  					}
  					// Plug response handler
  					if (xhr2 || xdr) {
  						xhr.onload = handleResponse;
  						xhr.onerror = handleError;
  					} else {
  						xhr.onreadystatechange = function () {
  							if (xhr.readyState == 4) {
  								handleResponse();
  							}
  						};
  					}
  					// Override mime type to ensure the response is well parsed
  					if (options.responseType != 'auto' && 'overrideMimeType' in xhr) {
  						xhr.overrideMimeType(mimeTypes[options.responseType]);
  					}
  					// Run 'before' callback
  					if (before) {
  						before(xhr);
  					}
  					// Send request
  					if (xdr) {
  						setTimeout(function () {
  							// https://developer.mozilla.org/en-US/docs/Web/API/XDomainRequest
  							xhr.send(method != 'GET' ? data : null);
  						}, 0);
  					} else {
  						xhr.send(method != 'GET' ? data : null);
  					}
  				};
  				return pinky;
  			}),
  			   

  			// Handle the response
  			handleResponse = function handleResponse() {
  				// Prepare
  				var i, responseType;
  				--requests;
  				sending = false;
  				// Verify timeout state
  				// --- https://stackoverflow.com/questions/7287706/ie-9-javascript-error-c00c023f
  				if (new Date().getTime() - timeout_start >= options.timeout) {
  					if (!options.attempts || ++attempts != options.attempts) {
  						promise.send();
  					} else {
  						promise(false, [xhr, response, new Error('Timeout (' + url + ')')]);
  					}
  					return;
  				}
  				// Launch next stacked request
  				if (request_stack.length) {
  					request_stack.shift().send();
  				}
  				// Handle response
  				try {
  					// Process response
  					if (nativeResponseParsing && 'response' in xhr && xhr.response !== null) {
  						response = xhr.response;
  					} else if (options.responseType == 'document') {
  						var frame = document.createElement('iframe');
  						frame.style.display = 'none';
  						document.body.appendChild(frame);
  						frame.contentDocument.open();
  						frame.contentDocument.write(xhr.response);
  						frame.contentDocument.close();
  						response = frame.contentDocument;
  						document.body.removeChild(frame);
  					} else {
  						// Guess response type
  						responseType = options.responseType;
  						if (responseType == 'auto') {
  							if (xdr) {
  								responseType = defaultXdrResponseType;
  							} else {
  								var ct = xhr.getResponseHeader('Content-Type') || '';
  								if (ct.indexOf(mimeTypes.json) > -1) {
  									responseType = 'json';
  								} else if (ct.indexOf(mimeTypes.xml) > -1) {
  									responseType = 'xml';
  								} else {
  									responseType = 'text';
  								}
  							}
  						}
  						// Handle response type
  						switch (responseType) {
  							case 'json':
  								try {
  									if ('JSON' in global) {
  										response = JSON.parse(xhr.responseText);
  									} else {
  										response = eval('(' + xhr.responseText + ')');
  									}
  								} catch (e) {
  									throw "Error while parsing JSON body : " + e;
  								}
  								break;
  							case 'xml':
  								// Based on jQuery's parseXML() function
  								try {
  									// Standard
  									if (global.DOMParser) {
  										response = new DOMParser().parseFromString(xhr.responseText, 'text/xml');
  									}
  									// IE<9
  									else {
  											response = new ActiveXObject('Microsoft.XMLDOM');
  											response.async = 'false';
  											response.loadXML(xhr.responseText);
  										}
  								} catch (e) {
  									response = undefined;
  								}
  								if (!response || !response.documentElement || response.getElementsByTagName('parsererror').length) {
  									throw 'Invalid XML';
  								}
  								break;
  							default:
  								response = xhr.responseText;
  						}
  					}
  					// Late status code verification to allow passing data when, per example, a 409 is returned
  					// --- https://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  					if ('status' in xhr && !/^2|1223/.test(xhr.status)) {
  						throw xhr.status + ' (' + xhr.statusText + ')';
  					}
  					// Fulfilled
  					promise(true, [xhr, response]);
  				} catch (e) {
  					// Rejected
  					promise(false, [xhr, response, e]);
  				}
  			},
  			   

  			// Handle errors
  			handleError = function handleError(e) {
  				--requests;
  				promise(false, [xhr, null, new Error('Connection aborted')]);
  			};

  			// Normalize options
  			options.async = 'async' in options ? !!options.async : true;
  			options.cache = 'cache' in options ? !!options.cache : false;
  			options.dataType = 'dataType' in options ? options.dataType.toLowerCase() : defaultDataType;
  			options.responseType = 'responseType' in options ? options.responseType.toLowerCase() : 'auto';
  			options.user = options.user || '';
  			options.password = options.password || '';
  			options.withCredentials = !!options.withCredentials;
  			options.timeout = 'timeout' in options ? parseInt(options.timeout, 10) : 30000;
  			options.attempts = 'attempts' in options ? parseInt(options.attempts, 10) : 1;

  			// Guess if we're dealing with a cross-origin request
  			i = url.match(/\/\/(.+?)\//);
  			crossOrigin = i && (i[1] ? i[1] != location.host : false);

  			// Prepare data
  			if ('ArrayBuffer' in global && data instanceof ArrayBuffer) {
  				options.dataType = 'arraybuffer';
  			} else if ('Blob' in global && data instanceof Blob) {
  				options.dataType = 'blob';
  			} else if ('Document' in global && data instanceof Document) {
  				options.dataType = 'document';
  			} else if ('FormData' in global && data instanceof FormData) {
  				options.dataType = 'formdata';
  			}
  			switch (options.dataType) {
  				case 'json':
  					data = JSON.stringify(data);
  					break;
  				case 'post':
  					data = jparam(data);
  			}

  			// Prepare headers
  			if (options.headers) {
  				var format = function format(match, p1, p2) {
  					return p1 + p2.toUpperCase();
  				};
  				for (i in options.headers) {
  					headers[i.replace(/(^|-)([^-])/g, format)] = options.headers[i];
  				}
  			}
  			if (!('Content-Type' in headers) && method != 'GET') {
  				if (options.dataType in mimeTypes) {
  					if (mimeTypes[options.dataType]) {
  						headers['Content-Type'] = mimeTypes[options.dataType];
  					}
  				}
  			}
  			if (!headers.Accept) {
  				headers.Accept = options.responseType in accept ? accept[options.responseType] : '*/*';
  			}
  			if (!crossOrigin && !('X-Requested-With' in headers)) {
  				// (that header breaks in legacy browsers with CORS)
  				headers['X-Requested-With'] = 'XMLHttpRequest';
  			}
  			if (!options.cache && !('Cache-Control' in headers)) {
  				headers['Cache-Control'] = 'no-cache';
  			}

  			// Prepare URL
  			if (method == 'GET' && data) {
  				vars += data;
  			}
  			if (vars) {
  				url += (/\?/.test(url) ? '&' : '?') + vars;
  			}

  			// Start the request
  			if (options.async) {
  				promise.send();
  			}

  			// Return promise
  			return promise;
  		};

  		// Return the external qwest object
  		return {
  			base: '',
  			get: function get(url, data, options, before) {
  				return qwest('GET', this.base + url, data, options, before);
  			},
  			post: function post(url, data, options, before) {
  				return qwest('POST', this.base + url, data, options, before);
  			},
  			put: function put(url, data, options, before) {
  				return qwest('PUT', this.base + url, data, options, before);
  			},
  			'delete': function _delete(url, data, options, before) {
  				return qwest('DELETE', this.base + url, data, options, before);
  			},
  			map: function map(type, url, data, options, before) {
  				return qwest(type.toUpperCase(), this.base + url, data, options, before);
  			},
  			xhr2: xhr2,
  			limit: function limit(by) {
  				_limit = by;
  			},
  			setDefaultXdrResponseType: function setDefaultXdrResponseType(type) {
  				defaultXdrResponseType = type.toLowerCase();
  			},
  			setDefaultDataType: function setDefaultDataType(type) {
  				defaultDataType = type.toLowerCase();
  			}
  		};
  	})();
  	return module.exports;
  })({ exports: {} });

  var QwestAjaxLoader = (function () {
      function QwestAjaxLoader() {
          babelHelpers.classCallCheck(this, QwestAjaxLoader);
      }

      babelHelpers.createClass(QwestAjaxLoader, [{
          key: 'get',
          value: function get(path) {
              return qwest.get(path).then(function (xhr, res) {
                  return typeof res === 'string' ? JSON.parse(res) : res;
              });
          }
      }]);
      return QwestAjaxLoader;
  })();

  var LevelLoader = (function () {
      function LevelLoader(ajaxLoader) {
          babelHelpers.classCallCheck(this, LevelLoader);

          this.ajaxLoader = ajaxLoader;
      }

      babelHelpers.createClass(LevelLoader, [{
          key: "loadLevel",
          value: (function () {
              var ref = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee(path) {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                          switch (_context.prev = _context.next) {
                              case 0:
                                  _context.next = 2;
                                  return this.ajaxLoader.get(path);

                              case 2:
                                  return _context.abrupt("return", _context.sent);

                              case 3:
                              case "end":
                                  return _context.stop();
                          }
                      }
                  }, _callee, this);
              }));
              return function loadLevel(_x) {
                  return ref.apply(this, arguments);
              };
          })()
      }]);
      return LevelLoader;
  })();

  var SystemType = {
      Logic: 0,
      Render: 1
  };

  var SystemManager = (function () {
      function SystemManager() {
          babelHelpers.classCallCheck(this, SystemManager);

          this.logicSystems = new Map();
          this.renderSystems = new Map();
      }

      babelHelpers.createClass(SystemManager, [{
          key: 'registerSystem',
          value: function registerSystem(type, selector, components, callback) {
              var _Math;

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

              var systemId = (_Math = Math).max.apply(_Math, [0].concat(babelHelpers.toConsumableArray(this.logicSystems.keys()), babelHelpers.toConsumableArray(this.renderSystems.keys()))) + 1;

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
  })();

  var ComponentManager = (function () {
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
                          return (function (component) {
                              var ret = {};

                              Object.keys(component).forEach(function (key) {
                                  return ret[key] = component[key];
                              });

                              return ret;
                          })(component);
                      }
              }

              return component;
          }
      }, {
          key: 'registerComponent',
          value: function registerComponent(component) {
              var _Math;

              if (component === null || component === undefined) {
                  throw TypeError('component cannot be null.');
              }

              var max = (_Math = Math).max.apply(_Math, babelHelpers.toConsumableArray(this.components.keys()));

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
  })();

  var _arguments = arguments;
  var SelectorType = {
      Get: 0,
      GetWith: 1,
      GetWithOnly: 2,
      GetWithout: 3
  };

  var EntityManager = (function () {
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

                      for (var i = oldCapacity; i < this.capacity; ++i) {
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
              var components = _arguments.length <= 0 || _arguments[0] === undefined ? 0 : _arguments[0];
              var type = _arguments.length <= 1 || _arguments[1] === undefined ? SelectorType.GetWith : _arguments[1];
              var entityId;
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

                              entityId = _context.t4.value;

                              if (!(entityId > this.currentMaxEntity)) {
                                  _context.next = 19;
                                  break;
                              }

                              return _context.abrupt('return');

                          case 19:
                              if (!(this.entities[entityId] !== 0 && this.entities[entityId] === components)) {
                                  _context.next = 22;
                                  break;
                              }

                              _context.next = 22;
                              return Math.floor(entityId);

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

                              entityId = _context.t6.value;

                              if (!(entityId > this.currentMaxEntity)) {
                                  _context.next = 30;
                                  break;
                              }

                              return _context.abrupt('return');

                          case 30:
                              if (!(this.entities[entityId] !== 0 && (this.entities[entityId] & components) !== components)) {
                                  _context.next = 33;
                                  break;
                              }

                              _context.next = 33;
                              return Math.floor(entityId);

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

                              entityId = _context.t8.value;

                              if (!(entityId > this.currentMaxEntity)) {
                                  _context.next = 41;
                                  break;
                              }

                              return _context.abrupt('return');

                          case 41:
                              _context.next = 43;
                              return Math.floor(entityId);

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

              var initializer = undefined;

              switch (typeof component === 'undefined' ? 'undefined' : babelHelpers.typeof(component)) {
                  case 'function':
                      initializer = component;break;
                  case 'object':
                      {
                          initializer = function () {
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
                      initializer = function () {
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
          value: function onLogic(delta) {
              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                  for (var _iterator3 = this.systemManager.logicSystems.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                      var system = _step3.value;

                      system.callback.call(this, this.getEntities(system.components, system.selector), delta);
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
          value: function onRender(delta) {
              var _iteratorNormalCompletion4 = true;
              var _didIteratorError4 = false;
              var _iteratorError4 = undefined;

              try {
                  for (var _iterator4 = this.systemManager.renderSystems.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                      var system = _step4.value;

                      system.callback.call(this, this.getEntities(system.components, system.selector), delta);
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
  })();

  var EntityFactory = (function () {
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
                  var _entityId = entityManager.newEntity(components);

                  if (_entityId >= entityManager.capacity) {
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

                          var result = initializer.call(entityManager[componentId][_entityId]);

                          if (typeof entityManager[componentId][_entityId] !== 'function' && babelHelpers.typeof(entityManager[componentId][_entityId]) !== 'object' && result !== undefined) {
                              entityManager[componentId][_entityId] = result;
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

                  entities.push(_entityId);
              }

              return entities.length === 1 ? entities[0] : entities;
          }
      }]);
      return EntityFactory;
  })();

  var EventHandler = (function () {
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
                  var _Math;

                  eventId = (_Math = Math).max.apply(_Math, [eventId].concat(babelHelpers.toConsumableArray(event.keys())));
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
  })();

  var mainloop_min = (function (module) {
    var exports = module.exports;
    /**
     * mainloop.js 1.0.1-20150816
     *
     * @author Isaac Sukin (http://www.isaacsukin.com/)
     * @license MIT
     */

    !(function (a) {
      function b(a) {
        if (e + j > a) return u = n(b), void 0;for (d += a - e, e = a, q(a, d), a > g + 1e3 && (f = .25 * h + .75 * f, g = a, h = 0), h++, i = 0; d >= c;) {
          if ((r(c), d -= c, ++i >= 240)) {
            m = !0;break;
          }
        }s(d / c), t(f, m), m = !1, u = n(b);
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
          n = a.requestAnimationFrame || (function () {
        var a = Date.now(),
            b,
            d;return function (e) {
          return b = Date.now(), d = Math.max(0, c - (b - a)), a = b + d, setTimeout(function () {
            e(b + d);
          }, d);
        };
      })(),
          o = a.cancelAnimationFrame || clearTimeout,
          p = function p() {},
          q = p,
          r = p,
          s = p,
          t = p,
          u;a.MainLoop = { getSimulationTimestep: function getSimulationTimestep() {
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
          return q = a || q, this;
        }, setUpdate: function setUpdate(a) {
          return r = a || r, this;
        }, setDraw: function setDraw(a) {
          return s = a || s, this;
        }, setEnd: function setEnd(a) {
          return t = a || t, this;
        }, start: function start() {
          return l || (l = !0, u = n(function (a) {
            s(1), k = !0, e = a, g = a, h = 0, u = n(b);
          })), this;
        }, stop: function stop() {
          return k = !1, l = !1, o(u), this;
        }, isRunning: function isRunning() {
          return k;
        } }, "function" == typeof define && define.amd ? define(a.MainLoop) : "object" == (typeof exports === "undefined" ? "undefined" : babelHelpers.typeof(exports)) && (module.exports = a.MainLoop);
    })(this);
      return module.exports;
  })({ exports: {} });

  var MainLoopLoopManager = (function () {
      function MainLoopLoopManager() {
          babelHelpers.classCallCheck(this, MainLoopLoopManager);
      }

      babelHelpers.createClass(MainLoopLoopManager, [{
          key: 'setUpdate',
          value: function setUpdate(updateMethod) {
              mainloop_min.setUpdate(updateMethod);

              return this;
          }
      }, {
          key: 'setRender',
          value: function setRender(renderMethod) {
              mainloop_min.setDraw(renderMethod);

              return this;
          }
      }, {
          key: 'start',
          value: function start() {
              mainloop_min.start();
          }
      }]);
      return MainLoopLoopManager;
  })();

  var DI = {
      rendererManager: function rendererManager() {
          return new ThreeRendererManager();
      },
      sceneManager: function sceneManager() {
          return new ThreeSceneManager();
      },
      meshManager: function meshManager() {
          return new ThreeMeshManager();
      },
      levelLoader: function levelLoader() {
          return new LevelLoader(new QwestAjaxLoader());
      },
      entityManager: function entityManager() {
          return new EntityManager();
      },
      loopManager: function loopManager() {
          return new MainLoopLoopManager();
      },
      meshLoader: function meshLoader() {
          return new ThreeObjectMeshLoader();
      }
  };

  var FlatShading = 1;

  window.onload = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var levelLoader, level, meshLoader, meshManager, meshId, sceneManager, sceneId, entityManager, rendererManager, loopManager, meshIsAdded;
      return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
              switch (_context.prev = _context.next) {
                  case 0:
                      levelLoader = DI.levelLoader();
                      _context.next = 3;
                      return levelLoader.loadLevel('levels/level-one.json');

                  case 3:
                      level = _context.sent;
                      meshLoader = DI.meshLoader();
                      meshManager = DI.meshManager();
                      _context.t0 = meshManager;
                      _context.next = 9;
                      return meshLoader.load('meshes/' + level.mesh, { shading: FlatShading });

                  case 9:
                      _context.t1 = _context.sent;
                      meshId = _context.t0.addMesh.call(_context.t0, _context.t1);
                      sceneManager = DI.sceneManager();
                      sceneId = sceneManager.createScene();

                      sceneManager.addToScene(sceneId, meshManager.getMesh(meshId));
                      sceneManager.addAmbientLightToScene(sceneId, 0x101030);
                      sceneManager.addDirectionalLightToScene(sceneId, 0xffeedd, 0, 0, 1);

                      entityManager = DI.entityManager();
                      rendererManager = DI.rendererManager();
                      loopManager = DI.loopManager();
                      meshIsAdded = true;

                      document.addEventListener('click', function (e) {
                          if (meshIsAdded) {
                              sceneManager.removeFromScene(sceneId, meshManager.getMesh(meshId));
                          } else {
                              sceneManager.addToScene(sceneId, meshManager.getMesh(meshId));
                          }

                          meshIsAdded = !meshIsAdded;
                      });

                      loopManager.setUpdate(function (delta) {
                          meshManager.getMesh(meshId).rotation.y += 0.001 * delta;
                          entityManager.onLogic(delta);
                      }).setRender(function (interpolationPercentage) {
                          return rendererManager.render(sceneManager.getScene(sceneId), interpolationPercentage);
                      }).start();

                  case 22:
                  case 'end':
                      return _context.stop();
              }
          }
      }, _callee, this);
  }));

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2ctMTAway5qcyIsInNvdXJjZXMiOlsiLi4vL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9zcmMvbG9naWMvdGhyZWUtcmVuZGVyZXItbWFuYWdlci5qcyIsIi4uLy9ob21lL3VidW50dS93b3Jrc3BhY2Uvc3JjL2xvZ2ljL3RocmVlLXNjZW5lLW1hbmFnZXIuanMiLCIuLi8vaG9tZS91YnVudHUvd29ya3NwYWNlL3NyYy9sb2dpYy90aHJlZS1tZXNoLW1hbmFnZXIuanMiLCIuLi8vaG9tZS91YnVudHUvd29ya3NwYWNlL3NyYy9sb2dpYy90aHJlZS1vYmplY3QtbWVzaC1sb2FkZXIuanMiLCIuLi8vaG9tZS91YnVudHUvd29ya3NwYWNlL25vZGVfbW9kdWxlcy9qcXVlcnktcGFyYW0vanF1ZXJ5LXBhcmFtLmpzIiwiLi4vL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9ub2RlX21vZHVsZXMvcGlua3lzd2Vhci9waW5reXN3ZWFyLmpzIiwiLi4vL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9ub2RlX21vZHVsZXMvcXdlc3Qvc3JjL3F3ZXN0LmpzIiwiLi4vL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9zcmMvbG9naWMvcXdlc3QtYWpheC1sb2FkZXIuanMiLCIuLi8vaG9tZS91YnVudHUvd29ya3NwYWNlL3NyYy9sb2dpYy9sZXZlbC1sb2FkZXIuanMiLCIuLi8vaG9tZS91YnVudHUvd29ya3NwYWNlL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9zeXN0ZW0uanMiLCIuLi8vaG9tZS91YnVudHUvd29ya3NwYWNlL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9jb21wb25lbnQuanMiLCIuLi8vaG9tZS91YnVudHUvd29ya3NwYWNlL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9lbnRpdHkuanMiLCIuLi8vaG9tZS91YnVudHUvd29ya3NwYWNlL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9ldmVudC5qcyIsIi4uLy9ob21lL3VidW50dS93b3Jrc3BhY2Uvbm9kZV9tb2R1bGVzL21haW5sb29wLmpzL2J1aWxkL21haW5sb29wLm1pbi5qcyIsIi4uLy9ob21lL3VidW50dS93b3Jrc3BhY2Uvc3JjL2xvZ2ljL21haW5sb29wLWxvb3AtbWFuYWdlci5qcyIsIi4uLy9ob21lL3VidW50dS93b3Jrc3BhY2Uvc3JjL3V0aWxpdHkvZGVwZW5kZW5jeS1pbmplY3Rvci5qcyIsIi4uLy9ob21lL3VidW50dS93b3Jrc3BhY2Uvc3JjL2NvbnN0YW50cy9zaGFkaW5nLmpzIiwiLi4vL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9zcmMvZ2ctMTAway5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgdGhyZWUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaHJlZVJlbmRlcmVyTWFuYWdlciB7XG4gICAgcmVuZGVyZXIgICAgIDogdGhyZWUuV2ViR0xSZW5kZXJlcjtcbiAgICBjYW1lcmEgICAgICAgOiB0aHJlZS5DYW1lcmE7XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgdGhyZWUuV2ViR0xSZW5kZXJlcigpO1xuICAgICAgICB0aGlzLmNhbWVyYSAgID0gbmV3IHRocmVlLlBlcnNwZWN0aXZlQ2FtZXJhKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi55ID0gMjA7XG4gICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnogPSAyMDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2FtZXJhLmxvb2tBdChuZXcgdGhyZWUuVmVjdG9yMygwLjAsIDAuMCwgMC4wKSk7XG4gICAgfVxuICAgIFxuICAgIHJlbmRlcihzY2VuZSA6IHRocmVlLlNjZW5lLCBpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSA6IG51bWJlcikgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoc2NlbmUsIHRoaXMuY2FtZXJhKTtcbiAgICB9XG59XG4iLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgdGhyZWUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaHJlZVNjZW5lTWFuYWdlciB7XG4gICAgc2NlbmVzIDogQXJyYXk8dGhyZWUuU2NlbmU+O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnNjZW5lcyA9IFtdO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGVTY2VuZSgpIDogbnVtYmVyIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHNjZW5lLCBhZGQgaXQgdG8gdGhlIGxpc3Qgb2Ygc2NlbmVzIGFuZCByZXR1cm4gYSBoYW5kbGUgKGlkKSB0byBpdFxuICAgICAgICByZXR1cm4gdGhpcy5zY2VuZXMucHVzaChuZXcgdGhyZWUuU2NlbmUoKSkgLSAxO1xuICAgIH1cbiAgICBcbiAgICBnZXRTY2VuZShzY2VuZUlkIDogbnVtYmVyKSA6IHRocmVlLlNjZW5lIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NlbmVzW3NjZW5lSWRdO1xuICAgIH1cbiAgICBcbiAgICBhZGRUb1NjZW5lKHNjZW5lSWQgOiBudW1iZXIsIG9iamVjdCA6IHRocmVlLk9iamVjdDNEKSA6IHZvaWQge1xuICAgICAgICB0aGlzLnNjZW5lc1tzY2VuZUlkXS5hZGQob2JqZWN0KTtcbiAgICB9XG4gICAgXG4gICAgYWRkQW1iaWVudExpZ2h0VG9TY2VuZShzY2VuZUlkIDogbnVtYmVyLCBjb2xvciA6IG51bWJlcikgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zY2VuZXNbc2NlbmVJZF0uYWRkKG5ldyB0aHJlZS5BbWJpZW50TGlnaHQoY29sb3IpKTtcbiAgICB9XG4gICAgXG4gICAgYWRkRGlyZWN0aW9uYWxMaWdodFRvU2NlbmUoc2NlbmVJZCA6IG51bWJlciwgY29sb3IgOiBudW1iZXIsIHggOiBudW1iZXIsIHkgOiBudW1iZXIsIHogOiBudW1iZXIpIDogdm9pZCB7XG4gICAgICAgIGNvbnN0IGxpZ2h0ID0gbmV3IHRocmVlLkRpcmVjdGlvbmFsTGlnaHQoY29sb3IpO1xuXHQgICAgbGlnaHQucG9zaXRpb24uc2V0KHgsIHksIHopO1xuXHRcbiAgICAgICAgdGhpcy5zY2VuZXNbc2NlbmVJZF0uYWRkKGxpZ2h0KTtcbiAgICB9XG4gICAgXG4gICAgcmVtb3ZlRnJvbVNjZW5lKHNjZW5lSWQgOiBudW1iZXIsIG9iamVjdCA6IHRocmVlLk9iamVjdDNEKSA6IHZvaWQge1xuICAgICAgICB0aGlzLnNjZW5lc1tzY2VuZUlkXS5yZW1vdmUob2JqZWN0KTtcbiAgICB9XG59IiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IHRocmVlIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGhyZWVNZXNoTWFuYWdlciB7XG4gICAgbWVzaGVzIDogQXJyYXk8dGhyZWUuTWVzaD47XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubWVzaGVzID0gW107XG4gICAgfVxuICAgIFxuICAgIGFkZE1lc2gob2JqZWN0IDogdGhyZWUuTWVzaCkgOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5tZXNoZXMucHVzaChvYmplY3QpIC0gMTtcbiAgICB9XG4gICAgXG4gICAgZ2V0TWVzaChtZXNoSWQgOiBudW1iZXIpIDogdGhyZWUuTWVzaCB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lc2hlc1ttZXNoSWRdO1xuICAgIH1cbn0iLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgdGhyZWUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaHJlZU9iamVjdE1lc2hMb2FkZXIge1xuICAgIGxvYWRlciAgOiB0aHJlZS5PYmplY3RMb2FkZXI7XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubG9hZGVyICA9IG5ldyB0aHJlZS5PYmplY3RMb2FkZXIoKTtcbiAgICB9XG4gICAgXG4gICAgb25Qcm9ncmVzcygpIHtcbiAgICAgICAgLy8gcGxhY2Vob2xkZXJcbiAgICB9XG4gICAgXG4gICAgLy8gdG9kbyB0aGlzIG5vdyByZXR1cm5zIGEgc2NlbmUuLiBpbXBsaWNhdGlvbnM/XG4gICAgLy8gdG9kbyBhZGQgb3B0aW9ucyBhcyBhIGRlc3RydWN0YWJsZSBvYmplY3QgLT4gc3RvcHBlZCBieSBmbG93OiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svZmxvdy9pc3N1ZXMvMTgzXG4gICAgbG9hZChwYXRoIDogc3RyaW5nLCBvcHRpb25zPyA6IE9iamVjdCkgOiBQcm9taXNlIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzaGFkaW5nID0gKG9wdGlvbnMgfHwgeyB9KS5zaGFkaW5nO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgc2VsZi5sb2FkZXIubG9hZChwYXRoLCBvYmogPT4gcmVzb2x2ZShvYmopLCBpbmZvID0+IHNlbGYub25Qcm9ncmVzcyhpbmZvKSwgZXJyID0+IHJlamVjdChlcnIpKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbihtZXNoID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2hhZGluZyAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWVzaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbWVzaC50cmF2ZXJzZShjaGlsZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgdGhyZWUuTWVzaCkge1xuICAgICAgICAgICAgICAgICAgIGNoaWxkLm1hdGVyaWFsLnNoYWRpbmcgPSBzaGFkaW5nO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBtZXNoO1xuICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cbn0iLCIvKipcbiAqIEBwcmVzZXJ2ZSBqcXVlcnktcGFyYW0gKGMpIDIwMTUgS05PV0xFREdFQ09ERSB8IE1JVFxuICovXG4vKmdsb2JhbCBkZWZpbmUgKi9cbihmdW5jdGlvbiAoZ2xvYmFsKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIHBhcmFtID0gZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgdmFyIGFkZCA9IGZ1bmN0aW9uIChzLCBrLCB2KSB7XG4gICAgICAgICAgICB2ID0gdHlwZW9mIHYgPT09ICdmdW5jdGlvbicgPyB2KCkgOiB2ID09PSBudWxsID8gJycgOiB2ID09PSB1bmRlZmluZWQgPyAnJyA6IHY7XG4gICAgICAgICAgICBzW3MubGVuZ3RoXSA9IGVuY29kZVVSSUNvbXBvbmVudChrKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2KTtcbiAgICAgICAgfSwgYnVpbGRQYXJhbXMgPSBmdW5jdGlvbiAocHJlZml4LCBvYmosIHMpIHtcbiAgICAgICAgICAgIHZhciBpLCBsZW4sIGtleTtcblxuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gb2JqLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGFyYW1zKHByZWZpeCArICdbJyArICh0eXBlb2Ygb2JqW2ldID09PSAnb2JqZWN0JyA/IGkgOiAnJykgKyAnXScsIG9ialtpXSwgcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChvYmogJiYgb2JqLnRvU3RyaW5nKCkgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgICAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByZWZpeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkUGFyYW1zKHByZWZpeCArICdbJyArIGtleSArICddJywgb2JqW2tleV0sIHMsIGFkZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkUGFyYW1zKGtleSwgb2JqW2tleV0sIHMsIGFkZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByZWZpeCkge1xuICAgICAgICAgICAgICAgIGFkZChzLCBwcmVmaXgsIG9iaik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICAgICAgICAgICAgICBhZGQocywga2V5LCBvYmpba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHM7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBidWlsZFBhcmFtcygnJywgYSwgW10pLmpvaW4oJyYnKS5yZXBsYWNlKC8lMjAvZywgJysnKTtcbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBwYXJhbTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJhbTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZ2xvYmFsLnBhcmFtID0gcGFyYW07XG4gICAgfVxuXG59KHRoaXMpKTtcbiIsIi8qXG4gKiBQaW5reVN3ZWFyLmpzIDIuMi4yIC0gTWluaW1hbGlzdGljIGltcGxlbWVudGF0aW9uIG9mIHRoZSBQcm9taXNlcy9BKyBzcGVjXG4gKiBcbiAqIFB1YmxpYyBEb21haW4uIFVzZSwgbW9kaWZ5IGFuZCBkaXN0cmlidXRlIGl0IGFueSB3YXkgeW91IGxpa2UuIE5vIGF0dHJpYnV0aW9uIHJlcXVpcmVkLlxuICpcbiAqIE5PIFdBUlJBTlRZIEVYUFJFU1NFRCBPUiBJTVBMSUVELiBVU0UgQVQgWU9VUiBPV04gUklTSy5cbiAqXG4gKiBQaW5reVN3ZWFyIGlzIGEgdmVyeSBzbWFsbCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgUHJvbWlzZXMvQSsgc3BlY2lmaWNhdGlvbi4gQWZ0ZXIgY29tcGlsYXRpb24gd2l0aCB0aGVcbiAqIEdvb2dsZSBDbG9zdXJlIENvbXBpbGVyIGFuZCBnemlwcGluZyBpdCB3ZWlnaHMgbGVzcyB0aGFuIDUwMCBieXRlcy4gSXQgaXMgYmFzZWQgb24gdGhlIGltcGxlbWVudGF0aW9uIGZvciBcbiAqIE1pbmlmaWVkLmpzIGFuZCBzaG91bGQgYmUgcGVyZmVjdCBmb3IgZW1iZWRkaW5nLiBcbiAqXG4gKlxuICogUGlua3lTd2VhciBoYXMganVzdCB0aHJlZSBmdW5jdGlvbnMuXG4gKlxuICogVG8gY3JlYXRlIGEgbmV3IHByb21pc2UgaW4gcGVuZGluZyBzdGF0ZSwgY2FsbCBwaW5reVN3ZWFyKCk6XG4gKiAgICAgICAgIHZhciBwcm9taXNlID0gcGlua3lTd2VhcigpO1xuICpcbiAqIFRoZSByZXR1cm5lZCBvYmplY3QgaGFzIGEgUHJvbWlzZXMvQSsgY29tcGF0aWJsZSB0aGVuKCkgaW1wbGVtZW50YXRpb246XG4gKiAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpIHsgYWxlcnQoXCJTdWNjZXNzIVwiKTsgfSwgZnVuY3Rpb24odmFsdWUpIHsgYWxlcnQoXCJGYWlsdXJlIVwiKTsgfSk7XG4gKlxuICpcbiAqIFRoZSBwcm9taXNlIHJldHVybmVkIGJ5IHBpbmt5U3dlYXIoKSBpcyBhIGZ1bmN0aW9uLiBUbyBmdWxmaWxsIHRoZSBwcm9taXNlLCBjYWxsIHRoZSBmdW5jdGlvbiB3aXRoIHRydWUgYXMgZmlyc3QgYXJndW1lbnQgYW5kXG4gKiBhbiBvcHRpb25hbCBhcnJheSBvZiB2YWx1ZXMgdG8gcGFzcyB0byB0aGUgdGhlbigpIGhhbmRsZXIuIEJ5IHB1dHRpbmcgbW9yZSB0aGFuIG9uZSB2YWx1ZSBpbiB0aGUgYXJyYXksIHlvdSBjYW4gcGFzcyBtb3JlIHRoYW4gb25lXG4gKiB2YWx1ZSB0byB0aGUgdGhlbigpIGhhbmRsZXJzLiBIZXJlIGFuIGV4YW1wbGUgdG8gZnVsZmlsbCBhIHByb21zaXNlLCB0aGlzIHRpbWUgd2l0aCBvbmx5IG9uZSBhcmd1bWVudDogXG4gKiAgICAgICAgIHByb21pc2UodHJ1ZSwgWzQyXSk7XG4gKlxuICogV2hlbiB0aGUgcHJvbWlzZSBoYXMgYmVlbiByZWplY3RlZCwgY2FsbCBpdCB3aXRoIGZhbHNlLiBBZ2FpbiwgdGhlcmUgbWF5IGJlIG1vcmUgdGhhbiBvbmUgYXJndW1lbnQgZm9yIHRoZSB0aGVuKCkgaGFuZGxlcjpcbiAqICAgICAgICAgcHJvbWlzZSh0cnVlLCBbNiwgNiwgNl0pO1xuICogICAgICAgICBcbiAqIFlvdSBjYW4gb2J0YWluIHRoZSBwcm9taXNlJ3MgY3VycmVudCBzdGF0ZSBieSBjYWxsaW5nIHRoZSBmdW5jdGlvbiB3aXRob3V0IGFyZ3VtZW50cy4gSXQgd2lsbCBiZSB0cnVlIGlmIGZ1bGZpbGxlZCxcbiAqIGZhbHNlIGlmIHJlamVjdGVkLCBhbmQgb3RoZXJ3aXNlIHVuZGVmaW5lZC5cbiAqIFx0XHQgICB2YXIgc3RhdGUgPSBwcm9taXNlKCk7IFxuICogXG4gKiBodHRwczovL2dpdGh1Yi5jb20vdGltamFuc2VuL1Bpbmt5U3dlYXIuanNcbiAqL1xuKGZ1bmN0aW9uKHRhcmdldCkge1xuXHR2YXIgdW5kZWY7XG5cblx0ZnVuY3Rpb24gaXNGdW5jdGlvbihmKSB7XG5cdFx0cmV0dXJuIHR5cGVvZiBmID09ICdmdW5jdGlvbic7XG5cdH1cblx0ZnVuY3Rpb24gaXNPYmplY3QoZikge1xuXHRcdHJldHVybiB0eXBlb2YgZiA9PSAnb2JqZWN0Jztcblx0fVxuXHRmdW5jdGlvbiBkZWZlcihjYWxsYmFjaykge1xuXHRcdGlmICh0eXBlb2Ygc2V0SW1tZWRpYXRlICE9ICd1bmRlZmluZWQnKVxuXHRcdFx0c2V0SW1tZWRpYXRlKGNhbGxiYWNrKTtcblx0XHRlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzWyduZXh0VGljayddKVxuXHRcdFx0cHJvY2Vzc1snbmV4dFRpY2snXShjYWxsYmFjayk7XG5cdFx0ZWxzZVxuXHRcdFx0c2V0VGltZW91dChjYWxsYmFjaywgMCk7XG5cdH1cblxuXHR0YXJnZXRbMF1bdGFyZ2V0WzFdXSA9IGZ1bmN0aW9uIHBpbmt5U3dlYXIoZXh0ZW5kKSB7XG5cdFx0dmFyIHN0YXRlOyAgICAgICAgICAgLy8gdW5kZWZpbmVkL251bGwgPSBwZW5kaW5nLCB0cnVlID0gZnVsZmlsbGVkLCBmYWxzZSA9IHJlamVjdGVkXG5cdFx0dmFyIHZhbHVlcyA9IFtdOyAgICAgLy8gYW4gYXJyYXkgb2YgdmFsdWVzIGFzIGFyZ3VtZW50cyBmb3IgdGhlIHRoZW4oKSBoYW5kbGVyc1xuXHRcdHZhciBkZWZlcnJlZCA9IFtdOyAgIC8vIGZ1bmN0aW9ucyB0byBjYWxsIHdoZW4gc2V0KCkgaXMgaW52b2tlZFxuXG5cdFx0dmFyIHNldCA9IGZ1bmN0aW9uKG5ld1N0YXRlLCBuZXdWYWx1ZXMpIHtcblx0XHRcdGlmIChzdGF0ZSA9PSBudWxsICYmIG5ld1N0YXRlICE9IG51bGwpIHtcblx0XHRcdFx0c3RhdGUgPSBuZXdTdGF0ZTtcblx0XHRcdFx0dmFsdWVzID0gbmV3VmFsdWVzO1xuXHRcdFx0XHRpZiAoZGVmZXJyZWQubGVuZ3RoKVxuXHRcdFx0XHRcdGRlZmVyKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKylcblx0XHRcdFx0XHRcdFx0ZGVmZXJyZWRbaV0oKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdGF0ZTtcblx0XHR9O1xuXG5cdFx0c2V0Wyd0aGVuJ10gPSBmdW5jdGlvbiAob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcblx0XHRcdHZhciBwcm9taXNlMiA9IHBpbmt5U3dlYXIoZXh0ZW5kKTtcblx0XHRcdHZhciBjYWxsQ2FsbGJhY2tzID0gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0dHJ5IHtcblx0ICAgIFx0XHRcdHZhciBmID0gKHN0YXRlID8gb25GdWxmaWxsZWQgOiBvblJlamVjdGVkKTtcblx0ICAgIFx0XHRcdGlmIChpc0Z1bmN0aW9uKGYpKSB7XG5cdFx0ICAgXHRcdFx0XHRmdW5jdGlvbiByZXNvbHZlKHgpIHtcblx0XHRcdFx0XHRcdCAgICB2YXIgdGhlbiwgY2JDYWxsZWQgPSAwO1xuXHRcdCAgIFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHQgICBcdFx0XHRcdGlmICh4ICYmIChpc09iamVjdCh4KSB8fCBpc0Z1bmN0aW9uKHgpKSAmJiBpc0Z1bmN0aW9uKHRoZW4gPSB4Wyd0aGVuJ10pKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICh4ID09PSBwcm9taXNlMilcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoZW5bJ2NhbGwnXSh4LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGZ1bmN0aW9uKCkgeyBpZiAoIWNiQ2FsbGVkKyspIHJlc29sdmUuYXBwbHkodW5kZWYsYXJndW1lbnRzKTsgfSAsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24odmFsdWUpeyBpZiAoIWNiQ2FsbGVkKyspIHByb21pc2UyKGZhbHNlLFt2YWx1ZV0pO30pO1xuXHRcdFx0XHQgICBcdFx0XHRcdH1cblx0XHRcdFx0ICAgXHRcdFx0XHRlbHNlXG5cdFx0XHRcdCAgIFx0XHRcdFx0XHRwcm9taXNlMih0cnVlLCBhcmd1bWVudHMpO1xuXHRcdCAgIFx0XHRcdFx0XHR9XG5cdFx0ICAgXHRcdFx0XHRcdGNhdGNoKGUpIHtcblx0XHQgICBcdFx0XHRcdFx0XHRpZiAoIWNiQ2FsbGVkKyspXG5cdFx0ICAgXHRcdFx0XHRcdFx0XHRwcm9taXNlMihmYWxzZSwgW2VdKTtcblx0XHQgICBcdFx0XHRcdFx0fVxuXHRcdCAgIFx0XHRcdFx0fVxuXHRcdCAgIFx0XHRcdFx0cmVzb2x2ZShmLmFwcGx5KHVuZGVmLCB2YWx1ZXMgfHwgW10pKTtcblx0XHQgICBcdFx0XHR9XG5cdFx0ICAgXHRcdFx0ZWxzZVxuXHRcdCAgIFx0XHRcdFx0cHJvbWlzZTIoc3RhdGUsIHZhbHVlcyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRwcm9taXNlMihmYWxzZSwgW2VdKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGlmIChzdGF0ZSAhPSBudWxsKVxuXHRcdFx0XHRkZWZlcihjYWxsQ2FsbGJhY2tzKTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0ZGVmZXJyZWQucHVzaChjYWxsQ2FsbGJhY2tzKTtcblx0XHRcdHJldHVybiBwcm9taXNlMjtcblx0XHR9O1xuICAgICAgICBpZihleHRlbmQpe1xuICAgICAgICAgICAgc2V0ID0gZXh0ZW5kKHNldCk7XG4gICAgICAgIH1cblx0XHRyZXR1cm4gc2V0O1xuXHR9O1xufSkodHlwZW9mIG1vZHVsZSA9PSAndW5kZWZpbmVkJyA/IFt3aW5kb3csICdwaW5reVN3ZWFyJ10gOiBbbW9kdWxlLCAnZXhwb3J0cyddKTtcblxuIiwiLyohIHF3ZXN0IDIuMi4zIChodHRwczovL2dpdGh1Yi5jb20vcHlyc21rL3F3ZXN0KSAqL1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHJcblx0dmFyIGdsb2JhbCA9IHdpbmRvdyB8fCB0aGlzLFxyXG5cdFx0cGlua3lzd2VhciA9IHJlcXVpcmUoJ3Bpbmt5c3dlYXInKSxcclxuXHRcdGpwYXJhbSA9IHJlcXVpcmUoJ2pxdWVyeS1wYXJhbScpLFxyXG5cdFx0Ly8gRGVmYXVsdCByZXNwb25zZSB0eXBlIGZvciBYRFIgaW4gYXV0byBtb2RlXHJcblx0XHRkZWZhdWx0WGRyUmVzcG9uc2VUeXBlID0gJ2pzb24nLFxyXG5cdFx0Ly8gRGVmYXVsdCBkYXRhIHR5cGVcclxuXHRcdGRlZmF1bHREYXRhVHlwZSA9ICdwb3N0JyxcclxuXHRcdC8vIFZhcmlhYmxlcyBmb3IgbGltaXQgbWVjaGFuaXNtXHJcblx0XHRsaW1pdCA9IG51bGwsXHJcblx0XHRyZXF1ZXN0cyA9IDAsXHJcblx0XHRyZXF1ZXN0X3N0YWNrID0gW10sXHJcblx0XHQvLyBHZXQgWE1MSHR0cFJlcXVlc3Qgb2JqZWN0XHJcblx0XHRnZXRYSFIgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHRyZXR1cm4gZ2xvYmFsLlhNTEh0dHBSZXF1ZXN0P1xyXG5cdFx0XHRcdFx0bmV3IGdsb2JhbC5YTUxIdHRwUmVxdWVzdCgpOlxyXG5cdFx0XHRcdFx0bmV3IEFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxIVFRQJyk7XHJcblx0XHR9LFxyXG5cdFx0Ly8gR3Vlc3MgWEhSIHZlcnNpb25cclxuXHRcdHhocjIgPSAoZ2V0WEhSKCkucmVzcG9uc2VUeXBlPT09JycpLFxyXG5cclxuXHQvLyBDb3JlIGZ1bmN0aW9uXHJcblx0cXdlc3QgPSBmdW5jdGlvbihtZXRob2QsIHVybCwgZGF0YSwgb3B0aW9ucywgYmVmb3JlKSB7XHJcblxyXG5cdFx0Ly8gRm9ybWF0XHJcblx0XHRtZXRob2QgPSBtZXRob2QudG9VcHBlckNhc2UoKTtcclxuXHRcdGRhdGEgPSBkYXRhIHx8IG51bGw7XHJcblx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcblx0XHQvLyBEZWZpbmUgdmFyaWFibGVzXHJcblx0XHR2YXIgbmF0aXZlUmVzcG9uc2VQYXJzaW5nID0gZmFsc2UsXHJcblx0XHRcdGNyb3NzT3JpZ2luLFxyXG5cdFx0XHR4aHIsXHJcblx0XHRcdHhkciA9IGZhbHNlLFxyXG5cdFx0XHR0aW1lb3V0SW50ZXJ2YWwsXHJcblx0XHRcdGFib3J0ZWQgPSBmYWxzZSxcclxuXHRcdFx0YXR0ZW1wdHMgPSAwLFxyXG5cdFx0XHRoZWFkZXJzID0ge30sXHJcblx0XHRcdG1pbWVUeXBlcyA9IHtcclxuXHRcdFx0XHR0ZXh0OiAnKi8qJyxcclxuXHRcdFx0XHR4bWw6ICd0ZXh0L3htbCcsXHJcblx0XHRcdFx0anNvbjogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG5cdFx0XHRcdHBvc3Q6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXHJcblx0XHRcdH0sXHJcblx0XHRcdGFjY2VwdCA9IHtcclxuXHRcdFx0XHR0ZXh0OiAnKi8qJyxcclxuXHRcdFx0XHR4bWw6ICdhcHBsaWNhdGlvbi94bWw7IHE9MS4wLCB0ZXh0L3htbDsgcT0wLjgsICovKjsgcT0wLjEnLFxyXG5cdFx0XHRcdGpzb246ICdhcHBsaWNhdGlvbi9qc29uOyBxPTEuMCwgdGV4dC8qOyBxPTAuOCwgKi8qOyBxPTAuMSdcclxuXHRcdFx0fSxcclxuXHRcdFx0dmFycyA9ICcnLFxyXG5cdFx0XHRpLCBqLFxyXG5cdFx0XHRzZXJpYWxpemVkLFxyXG5cdFx0XHRyZXNwb25zZSxcclxuXHRcdFx0c2VuZGluZyA9IGZhbHNlLFxyXG5cdFx0XHRkZWxheWVkID0gZmFsc2UsXHJcblx0XHRcdHRpbWVvdXRfc3RhcnQsXHJcblxyXG5cdFx0Ly8gQ3JlYXRlIHRoZSBwcm9taXNlXHJcblx0XHRwcm9taXNlID0gcGlua3lzd2VhcihmdW5jdGlvbihwaW5reSkge1xyXG5cdFx0XHRwaW5reVsnY2F0Y2gnXSA9IGZ1bmN0aW9uKGYpIHtcclxuXHRcdFx0XHRyZXR1cm4gcGlua3kudGhlbihudWxsLCBmKTtcclxuXHRcdFx0fTtcclxuXHRcdFx0cGlua3kuY29tcGxldGUgPSBmdW5jdGlvbihmKSB7XHJcblx0XHRcdFx0cmV0dXJuIHBpbmt5LnRoZW4oZiwgZik7XHJcblx0XHRcdH07XHJcblx0XHRcdC8vIE92ZXJyaWRlXHJcblx0XHRcdGlmKCdwaW5reXN3ZWFyJyBpbiBvcHRpb25zKSB7XHJcblx0XHRcdFx0Zm9yKGkgaW4gb3B0aW9ucy5waW5reXN3ZWFyKSB7XHJcblx0XHRcdFx0XHRwaW5reVtpXSA9IG9wdGlvbnMucGlua3lzd2VhcltpXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cGlua3kuc2VuZCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdC8vIFByZXZlbnQgZnVydGhlciBzZW5kKCkgY2FsbHNcclxuXHRcdFx0XHRpZihzZW5kaW5nKSB7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIFJlYWNoZWQgcmVxdWVzdCBsaW1pdCwgZ2V0IG91dCFcclxuXHRcdFx0XHRpZihyZXF1ZXN0cyA9PSBsaW1pdCkge1xyXG5cdFx0XHRcdFx0cmVxdWVzdF9zdGFjay5wdXNoKHBpbmt5KTtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0KytyZXF1ZXN0cztcclxuXHRcdFx0XHRzZW5kaW5nID0gdHJ1ZTtcclxuXHRcdFx0XHQvLyBTdGFydCB0aGUgY2hyb25vXHJcblx0XHRcdFx0dGltZW91dF9zdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cdFx0XHRcdC8vIEdldCBYSFIgb2JqZWN0XHJcblx0XHRcdFx0eGhyID0gZ2V0WEhSKCk7XHJcblx0XHRcdFx0aWYoY3Jvc3NPcmlnaW4pIHtcclxuXHRcdFx0XHRcdGlmKCEoJ3dpdGhDcmVkZW50aWFscycgaW4geGhyKSAmJiBnbG9iYWwuWERvbWFpblJlcXVlc3QpIHtcclxuXHRcdFx0XHRcdFx0eGhyID0gbmV3IFhEb21haW5SZXF1ZXN0KCk7IC8vIENPUlMgd2l0aCBJRTgvOVxyXG5cdFx0XHRcdFx0XHR4ZHIgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRpZihtZXRob2QhPSdHRVQnICYmIG1ldGhvZCE9J1BPU1QnKSB7XHJcblx0XHRcdFx0XHRcdFx0bWV0aG9kID0gJ1BPU1QnO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIE9wZW4gY29ubmVjdGlvblxyXG5cdFx0XHRcdGlmKHhkcikge1xyXG5cdFx0XHRcdFx0eGhyLm9wZW4obWV0aG9kLCB1cmwpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdHhoci5vcGVuKG1ldGhvZCwgdXJsLCBvcHRpb25zLmFzeW5jLCBvcHRpb25zLnVzZXIsIG9wdGlvbnMucGFzc3dvcmQpO1xyXG5cdFx0XHRcdFx0aWYoeGhyMiAmJiBvcHRpb25zLmFzeW5jKSB7XHJcblx0XHRcdFx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSBvcHRpb25zLndpdGhDcmVkZW50aWFscztcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gU2V0IGhlYWRlcnNcclxuXHRcdFx0XHRpZigheGRyKSB7XHJcblx0XHRcdFx0XHRmb3IodmFyIGkgaW4gaGVhZGVycykge1xyXG5cdFx0XHRcdFx0XHRpZihoZWFkZXJzW2ldKSB7XHJcblx0XHRcdFx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoaSwgaGVhZGVyc1tpXSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gVmVyaWZ5IGlmIHRoZSByZXNwb25zZSB0eXBlIGlzIHN1cHBvcnRlZCBieSB0aGUgY3VycmVudCBicm93c2VyXHJcblx0XHRcdFx0aWYoeGhyMiAmJiBvcHRpb25zLnJlc3BvbnNlVHlwZSE9J2RvY3VtZW50JyAmJiBvcHRpb25zLnJlc3BvbnNlVHlwZSE9J2F1dG8nKSB7IC8vIERvbid0IHZlcmlmeSBmb3IgJ2RvY3VtZW50JyBzaW5jZSB3ZSdyZSB1c2luZyBhbiBpbnRlcm5hbCByb3V0aW5lXHJcblx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gb3B0aW9ucy5yZXNwb25zZVR5cGU7XHJcblx0XHRcdFx0XHRcdG5hdGl2ZVJlc3BvbnNlUGFyc2luZyA9ICh4aHIucmVzcG9uc2VUeXBlPT1vcHRpb25zLnJlc3BvbnNlVHlwZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjYXRjaChlKXt9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIFBsdWcgcmVzcG9uc2UgaGFuZGxlclxyXG5cdFx0XHRcdGlmKHhocjIgfHwgeGRyKSB7XHJcblx0XHRcdFx0XHR4aHIub25sb2FkID0gaGFuZGxlUmVzcG9uc2U7XHJcblx0XHRcdFx0XHR4aHIub25lcnJvciA9IGhhbmRsZUVycm9yO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0aWYoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xyXG5cdFx0XHRcdFx0XHRcdGhhbmRsZVJlc3BvbnNlKCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIE92ZXJyaWRlIG1pbWUgdHlwZSB0byBlbnN1cmUgdGhlIHJlc3BvbnNlIGlzIHdlbGwgcGFyc2VkXHJcblx0XHRcdFx0aWYob3B0aW9ucy5yZXNwb25zZVR5cGUhPSdhdXRvJyAmJiAnb3ZlcnJpZGVNaW1lVHlwZScgaW4geGhyKSB7XHJcblx0XHRcdFx0XHR4aHIub3ZlcnJpZGVNaW1lVHlwZShtaW1lVHlwZXNbb3B0aW9ucy5yZXNwb25zZVR5cGVdKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gUnVuICdiZWZvcmUnIGNhbGxiYWNrXHJcblx0XHRcdFx0aWYoYmVmb3JlKSB7XHJcblx0XHRcdFx0XHRiZWZvcmUoeGhyKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gU2VuZCByZXF1ZXN0XHJcblx0XHRcdFx0aWYoeGRyKSB7XHJcblx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9YRG9tYWluUmVxdWVzdFxyXG5cdFx0XHRcdFx0XHR4aHIuc2VuZChtZXRob2QhPSdHRVQnP2RhdGE6bnVsbCk7XHJcblx0XHRcdFx0XHR9LDApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdHhoci5zZW5kKG1ldGhvZCE9J0dFVCc/ZGF0YTpudWxsKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblx0XHRcdHJldHVybiBwaW5reTtcclxuXHRcdH0pLFxyXG5cclxuXHRcdC8vIEhhbmRsZSB0aGUgcmVzcG9uc2VcclxuXHRcdGhhbmRsZVJlc3BvbnNlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdC8vIFByZXBhcmVcclxuXHRcdFx0dmFyIGksIHJlc3BvbnNlVHlwZTtcclxuXHRcdFx0LS1yZXF1ZXN0cztcclxuXHRcdFx0c2VuZGluZyA9IGZhbHNlO1xyXG5cdFx0XHQvLyBWZXJpZnkgdGltZW91dCBzdGF0ZVxyXG5cdFx0XHQvLyAtLS0gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNzI4NzcwNi9pZS05LWphdmFzY3JpcHQtZXJyb3ItYzAwYzAyM2ZcclxuXHRcdFx0aWYobmV3IERhdGUoKS5nZXRUaW1lKCktdGltZW91dF9zdGFydCA+PSBvcHRpb25zLnRpbWVvdXQpIHtcclxuXHRcdFx0XHRpZighb3B0aW9ucy5hdHRlbXB0cyB8fCArK2F0dGVtcHRzIT1vcHRpb25zLmF0dGVtcHRzKSB7XHJcblx0XHRcdFx0XHRwcm9taXNlLnNlbmQoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRwcm9taXNlKGZhbHNlLCBbeGhyLHJlc3BvbnNlLG5ldyBFcnJvcignVGltZW91dCAoJyt1cmwrJyknKV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gTGF1bmNoIG5leHQgc3RhY2tlZCByZXF1ZXN0XHJcblx0XHRcdGlmKHJlcXVlc3Rfc3RhY2subGVuZ3RoKSB7XHJcblx0XHRcdFx0cmVxdWVzdF9zdGFjay5zaGlmdCgpLnNlbmQoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBIYW5kbGUgcmVzcG9uc2VcclxuXHRcdFx0dHJ5e1xyXG5cdFx0XHRcdC8vIFByb2Nlc3MgcmVzcG9uc2VcclxuXHRcdFx0XHRpZihuYXRpdmVSZXNwb25zZVBhcnNpbmcgJiYgJ3Jlc3BvbnNlJyBpbiB4aHIgJiYgeGhyLnJlc3BvbnNlIT09bnVsbCkge1xyXG5cdFx0XHRcdFx0cmVzcG9uc2UgPSB4aHIucmVzcG9uc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYob3B0aW9ucy5yZXNwb25zZVR5cGUgPT0gJ2RvY3VtZW50Jykge1xyXG5cdFx0XHRcdFx0dmFyIGZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XHJcblx0XHRcdFx0XHRmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmcmFtZSk7XHJcblx0XHRcdFx0XHRmcmFtZS5jb250ZW50RG9jdW1lbnQub3BlbigpO1xyXG5cdFx0XHRcdFx0ZnJhbWUuY29udGVudERvY3VtZW50LndyaXRlKHhoci5yZXNwb25zZSk7XHJcblx0XHRcdFx0XHRmcmFtZS5jb250ZW50RG9jdW1lbnQuY2xvc2UoKTtcclxuXHRcdFx0XHRcdHJlc3BvbnNlID0gZnJhbWUuY29udGVudERvY3VtZW50O1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChmcmFtZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2V7XHJcblx0XHRcdFx0XHQvLyBHdWVzcyByZXNwb25zZSB0eXBlXHJcblx0XHRcdFx0XHRyZXNwb25zZVR5cGUgPSBvcHRpb25zLnJlc3BvbnNlVHlwZTtcclxuXHRcdFx0XHRcdGlmKHJlc3BvbnNlVHlwZSA9PSAnYXV0bycpIHtcclxuXHRcdFx0XHRcdFx0aWYoeGRyKSB7XHJcblx0XHRcdFx0XHRcdFx0cmVzcG9uc2VUeXBlID0gZGVmYXVsdFhkclJlc3BvbnNlVHlwZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgY3QgPSB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpIHx8ICcnO1xyXG5cdFx0XHRcdFx0XHRcdGlmKGN0LmluZGV4T2YobWltZVR5cGVzLmpzb24pPi0xKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZVR5cGUgPSAnanNvbic7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGVsc2UgaWYoY3QuaW5kZXhPZihtaW1lVHlwZXMueG1sKT4tMSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2VUeXBlID0gJ3htbCc7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2VUeXBlID0gJ3RleHQnO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Ly8gSGFuZGxlIHJlc3BvbnNlIHR5cGVcclxuXHRcdFx0XHRcdHN3aXRjaChyZXNwb25zZVR5cGUpIHtcclxuXHRcdFx0XHRcdFx0Y2FzZSAnanNvbic6XHJcblx0XHRcdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0XHRcdGlmKCdKU09OJyBpbiBnbG9iYWwpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0gZXZhbCgnKCcreGhyLnJlc3BvbnNlVGV4dCsnKScpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRjYXRjaChlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR0aHJvdyBcIkVycm9yIHdoaWxlIHBhcnNpbmcgSlNPTiBib2R5IDogXCIrZTtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdGNhc2UgJ3htbCc6XHJcblx0XHRcdFx0XHRcdFx0Ly8gQmFzZWQgb24galF1ZXJ5J3MgcGFyc2VYTUwoKSBmdW5jdGlvblxyXG5cdFx0XHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdFx0XHQvLyBTdGFuZGFyZFxyXG5cdFx0XHRcdFx0XHRcdFx0aWYoZ2xvYmFsLkRPTVBhcnNlcikge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9IChuZXcgRE9NUGFyc2VyKCkpLnBhcnNlRnJvbVN0cmluZyh4aHIucmVzcG9uc2VUZXh0LCd0ZXh0L3htbCcpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0Ly8gSUU8OVxyXG5cdFx0XHRcdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0gbmV3IEFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxET00nKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UuYXN5bmMgPSAnZmFsc2UnO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZS5sb2FkWE1MKHhoci5yZXNwb25zZVRleHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRjYXRjaChlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9IHVuZGVmaW5lZDtcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0aWYoIXJlc3BvbnNlIHx8ICFyZXNwb25zZS5kb2N1bWVudEVsZW1lbnQgfHwgcmVzcG9uc2UuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3BhcnNlcmVycm9yJykubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR0aHJvdyAnSW52YWxpZCBYTUwnO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9IHhoci5yZXNwb25zZVRleHQ7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIExhdGUgc3RhdHVzIGNvZGUgdmVyaWZpY2F0aW9uIHRvIGFsbG93IHBhc3NpbmcgZGF0YSB3aGVuLCBwZXIgZXhhbXBsZSwgYSA0MDkgaXMgcmV0dXJuZWRcclxuXHRcdFx0XHQvLyAtLS0gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTAwNDY5NzIvbXNpZS1yZXR1cm5zLXN0YXR1cy1jb2RlLW9mLTEyMjMtZm9yLWFqYXgtcmVxdWVzdFxyXG5cdFx0XHRcdGlmKCdzdGF0dXMnIGluIHhociAmJiAhL14yfDEyMjMvLnRlc3QoeGhyLnN0YXR1cykpIHtcclxuXHRcdFx0XHRcdHRocm93IHhoci5zdGF0dXMrJyAoJyt4aHIuc3RhdHVzVGV4dCsnKSc7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdC8vIEZ1bGZpbGxlZFxyXG5cdFx0XHRcdHByb21pc2UodHJ1ZSwgW3hocixyZXNwb25zZV0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNhdGNoKGUpIHtcclxuXHRcdFx0XHQvLyBSZWplY3RlZFxyXG5cdFx0XHRcdHByb21pc2UoZmFsc2UsIFt4aHIscmVzcG9uc2UsZV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIEhhbmRsZSBlcnJvcnNcclxuXHRcdGhhbmRsZUVycm9yID0gZnVuY3Rpb24oZSkge1xyXG5cdFx0XHQtLXJlcXVlc3RzO1xyXG5cdFx0XHRwcm9taXNlKGZhbHNlLCBbeGhyLG51bGwsbmV3IEVycm9yKCdDb25uZWN0aW9uIGFib3J0ZWQnKV0pO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvLyBOb3JtYWxpemUgb3B0aW9uc1xyXG5cdFx0b3B0aW9ucy5hc3luYyA9ICdhc3luYycgaW4gb3B0aW9ucz8hIW9wdGlvbnMuYXN5bmM6dHJ1ZTtcclxuXHRcdG9wdGlvbnMuY2FjaGUgPSAnY2FjaGUnIGluIG9wdGlvbnM/ISFvcHRpb25zLmNhY2hlOmZhbHNlO1xyXG5cdFx0b3B0aW9ucy5kYXRhVHlwZSA9ICdkYXRhVHlwZScgaW4gb3B0aW9ucz9vcHRpb25zLmRhdGFUeXBlLnRvTG93ZXJDYXNlKCk6ZGVmYXVsdERhdGFUeXBlO1xyXG5cdFx0b3B0aW9ucy5yZXNwb25zZVR5cGUgPSAncmVzcG9uc2VUeXBlJyBpbiBvcHRpb25zP29wdGlvbnMucmVzcG9uc2VUeXBlLnRvTG93ZXJDYXNlKCk6J2F1dG8nO1xyXG5cdFx0b3B0aW9ucy51c2VyID0gb3B0aW9ucy51c2VyIHx8ICcnO1xyXG5cdFx0b3B0aW9ucy5wYXNzd29yZCA9IG9wdGlvbnMucGFzc3dvcmQgfHwgJyc7XHJcblx0XHRvcHRpb25zLndpdGhDcmVkZW50aWFscyA9ICEhb3B0aW9ucy53aXRoQ3JlZGVudGlhbHM7XHJcblx0XHRvcHRpb25zLnRpbWVvdXQgPSAndGltZW91dCcgaW4gb3B0aW9ucz9wYXJzZUludChvcHRpb25zLnRpbWVvdXQsMTApOjMwMDAwO1xyXG5cdFx0b3B0aW9ucy5hdHRlbXB0cyA9ICdhdHRlbXB0cycgaW4gb3B0aW9ucz9wYXJzZUludChvcHRpb25zLmF0dGVtcHRzLDEwKToxO1xyXG5cclxuXHRcdC8vIEd1ZXNzIGlmIHdlJ3JlIGRlYWxpbmcgd2l0aCBhIGNyb3NzLW9yaWdpbiByZXF1ZXN0XHJcblx0XHRpID0gdXJsLm1hdGNoKC9cXC9cXC8oLis/KVxcLy8pO1xyXG5cdFx0Y3Jvc3NPcmlnaW4gPSBpICYmIChpWzFdP2lbMV0hPWxvY2F0aW9uLmhvc3Q6ZmFsc2UpO1xyXG5cclxuXHRcdC8vIFByZXBhcmUgZGF0YVxyXG5cdFx0aWYoJ0FycmF5QnVmZmVyJyBpbiBnbG9iYWwgJiYgZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XHJcblx0XHRcdG9wdGlvbnMuZGF0YVR5cGUgPSAnYXJyYXlidWZmZXInO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZignQmxvYicgaW4gZ2xvYmFsICYmIGRhdGEgaW5zdGFuY2VvZiBCbG9iKSB7XHJcblx0XHRcdG9wdGlvbnMuZGF0YVR5cGUgPSAnYmxvYic7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKCdEb2N1bWVudCcgaW4gZ2xvYmFsICYmIGRhdGEgaW5zdGFuY2VvZiBEb2N1bWVudCkge1xyXG5cdFx0XHRvcHRpb25zLmRhdGFUeXBlID0gJ2RvY3VtZW50JztcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoJ0Zvcm1EYXRhJyBpbiBnbG9iYWwgJiYgZGF0YSBpbnN0YW5jZW9mIEZvcm1EYXRhKSB7XHJcblx0XHRcdG9wdGlvbnMuZGF0YVR5cGUgPSAnZm9ybWRhdGEnO1xyXG5cdFx0fVxyXG5cdFx0c3dpdGNoKG9wdGlvbnMuZGF0YVR5cGUpIHtcclxuXHRcdFx0Y2FzZSAnanNvbic6XHJcblx0XHRcdFx0ZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdwb3N0JzpcclxuXHRcdFx0XHRkYXRhID0ganBhcmFtKGRhdGEpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFByZXBhcmUgaGVhZGVyc1xyXG5cdFx0aWYob3B0aW9ucy5oZWFkZXJzKSB7XHJcblx0XHRcdHZhciBmb3JtYXQgPSBmdW5jdGlvbihtYXRjaCxwMSxwMikge1xyXG5cdFx0XHRcdHJldHVybiBwMSArIHAyLnRvVXBwZXJDYXNlKCk7XHJcblx0XHRcdH07XHJcblx0XHRcdGZvcihpIGluIG9wdGlvbnMuaGVhZGVycykge1xyXG5cdFx0XHRcdGhlYWRlcnNbaS5yZXBsYWNlKC8oXnwtKShbXi1dKS9nLGZvcm1hdCldID0gb3B0aW9ucy5oZWFkZXJzW2ldO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZighKCdDb250ZW50LVR5cGUnIGluIGhlYWRlcnMpICYmIG1ldGhvZCE9J0dFVCcpIHtcclxuXHRcdFx0aWYob3B0aW9ucy5kYXRhVHlwZSBpbiBtaW1lVHlwZXMpIHtcclxuXHRcdFx0XHRpZihtaW1lVHlwZXNbb3B0aW9ucy5kYXRhVHlwZV0pIHtcclxuXHRcdFx0XHRcdGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gbWltZVR5cGVzW29wdGlvbnMuZGF0YVR5cGVdO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYoIWhlYWRlcnMuQWNjZXB0KSB7XHJcblx0XHRcdGhlYWRlcnMuQWNjZXB0ID0gKG9wdGlvbnMucmVzcG9uc2VUeXBlIGluIGFjY2VwdCk/YWNjZXB0W29wdGlvbnMucmVzcG9uc2VUeXBlXTonKi8qJztcclxuXHRcdH1cclxuXHRcdGlmKCFjcm9zc09yaWdpbiAmJiAhKCdYLVJlcXVlc3RlZC1XaXRoJyBpbiBoZWFkZXJzKSkgeyAvLyAodGhhdCBoZWFkZXIgYnJlYWtzIGluIGxlZ2FjeSBicm93c2VycyB3aXRoIENPUlMpXHJcblx0XHRcdGhlYWRlcnNbJ1gtUmVxdWVzdGVkLVdpdGgnXSA9ICdYTUxIdHRwUmVxdWVzdCc7XHJcblx0XHR9XHJcblx0XHRpZighb3B0aW9ucy5jYWNoZSAmJiAhKCdDYWNoZS1Db250cm9sJyBpbiBoZWFkZXJzKSkge1xyXG5cdFx0XHRoZWFkZXJzWydDYWNoZS1Db250cm9sJ10gPSAnbm8tY2FjaGUnO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFByZXBhcmUgVVJMXHJcblx0XHRpZihtZXRob2Q9PSdHRVQnICYmIGRhdGEpIHtcclxuXHRcdFx0dmFycyArPSBkYXRhO1xyXG5cdFx0fVxyXG5cdFx0aWYodmFycykge1xyXG5cdFx0XHR1cmwgKz0gKC9cXD8vLnRlc3QodXJsKT8nJic6Jz8nKSt2YXJzO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFN0YXJ0IHRoZSByZXF1ZXN0XHJcblx0XHRpZihvcHRpb25zLmFzeW5jKSB7XHJcblx0XHRcdHByb21pc2Uuc2VuZCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFJldHVybiBwcm9taXNlXHJcblx0XHRyZXR1cm4gcHJvbWlzZTtcclxuXHJcblx0fTtcclxuXHJcblx0Ly8gUmV0dXJuIHRoZSBleHRlcm5hbCBxd2VzdCBvYmplY3RcclxuXHRyZXR1cm4ge1xyXG5cdFx0YmFzZTogJycsXHJcblx0XHRnZXQ6IGZ1bmN0aW9uKHVybCwgZGF0YSwgb3B0aW9ucywgYmVmb3JlKSB7XHJcblx0XHRcdHJldHVybiBxd2VzdCgnR0VUJywgdGhpcy5iYXNlK3VybCwgZGF0YSwgb3B0aW9ucywgYmVmb3JlKTtcclxuXHRcdH0sXHJcblx0XHRwb3N0OiBmdW5jdGlvbih1cmwsIGRhdGEsIG9wdGlvbnMsIGJlZm9yZSkge1xyXG5cdFx0XHRyZXR1cm4gcXdlc3QoJ1BPU1QnLCB0aGlzLmJhc2UrdXJsLCBkYXRhLCBvcHRpb25zLCBiZWZvcmUpO1xyXG5cdFx0fSxcclxuXHRcdHB1dDogZnVuY3Rpb24odXJsLCBkYXRhLCBvcHRpb25zLCBiZWZvcmUpIHtcclxuXHRcdFx0cmV0dXJuIHF3ZXN0KCdQVVQnLCB0aGlzLmJhc2UrdXJsLCBkYXRhLCBvcHRpb25zLCBiZWZvcmUpO1xyXG5cdFx0fSxcclxuXHRcdCdkZWxldGUnOiBmdW5jdGlvbih1cmwsIGRhdGEsIG9wdGlvbnMsIGJlZm9yZSkge1xyXG5cdFx0XHRyZXR1cm4gcXdlc3QoJ0RFTEVURScsIHRoaXMuYmFzZSt1cmwsIGRhdGEsIG9wdGlvbnMsIGJlZm9yZSk7XHJcblx0XHR9LFxyXG5cdFx0bWFwOiBmdW5jdGlvbih0eXBlLCB1cmwsIGRhdGEsIG9wdGlvbnMsIGJlZm9yZSkge1xyXG5cdFx0XHRyZXR1cm4gcXdlc3QodHlwZS50b1VwcGVyQ2FzZSgpLCB0aGlzLmJhc2UrdXJsLCBkYXRhLCBvcHRpb25zLCBiZWZvcmUpO1xyXG5cdFx0fSxcclxuXHRcdHhocjI6IHhocjIsXHJcblx0XHRsaW1pdDogZnVuY3Rpb24oYnkpIHtcclxuXHRcdFx0bGltaXQgPSBieTtcclxuXHRcdH0sXHJcblx0XHRzZXREZWZhdWx0WGRyUmVzcG9uc2VUeXBlOiBmdW5jdGlvbih0eXBlKSB7XHJcblx0XHRcdGRlZmF1bHRYZHJSZXNwb25zZVR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XHJcblx0XHR9LFxyXG5cdFx0c2V0RGVmYXVsdERhdGFUeXBlOiBmdW5jdGlvbih0eXBlKSB7XHJcblx0XHRcdGRlZmF1bHREYXRhVHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxufSgpO1xyXG4iLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgcXdlc3QgZnJvbSAncXdlc3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBRd2VzdEFqYXhMb2FkZXIge1xuICAgIGdldChwYXRoIDogc3RyaW5nKSA6IFByb21pc2Uge1xuICAgICAgICByZXR1cm4gcXdlc3QuZ2V0KHBhdGgpLnRoZW4oZnVuY3Rpb24oeGhyLCByZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgcmVzID09PSAnc3RyaW5nJyA/IEpTT04ucGFyc2UocmVzKSA6IHJlcztcbiAgICAgICAgfSk7XG4gICAgfVxufSIsIi8qIEBmbG93ICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExldmVsTG9hZGVyIHtcbiAgICBhamF4TG9hZGVyICAgOiBJQWpheExvYWRlcjtcblxuICAgIGNvbnN0cnVjdG9yKGFqYXhMb2FkZXIgOiBJQWpheExvYWRlcikge1xuICAgICAgICB0aGlzLmFqYXhMb2FkZXIgICA9IGFqYXhMb2FkZXI7XG4gICAgfVxuICAgIFxuICAgIGFzeW5jIGxvYWRMZXZlbChwYXRoIDogc3RyaW5nKSA6IFByb21pc2Uge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5hamF4TG9hZGVyLmdldChwYXRoKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgU2VsZWN0b3JUeXBlIH0gZnJvbSAnLi9lbnRpdHknO1xuXG5leHBvcnQgY29uc3QgU3lzdGVtVHlwZSA9IHtcbiAgICBMb2dpYyAgIDogMCxcbiAgICBSZW5kZXIgIDogMVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3lzdGVtTWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubG9naWNTeXN0ZW1zICA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJTeXN0ZW1zID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBcbiAgICByZWdpc3RlclN5c3RlbSh0eXBlLCBzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGUgIT09IFN5c3RlbVR5cGUuTG9naWMgJiYgdHlwZSAhPT0gU3lzdGVtVHlwZS5SZW5kZXIpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcigndHlwZSBtdXN0IGJlIGEgdmFsaWQgU3lzdGVtVHlwZS4nKTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBpZiAoc2VsZWN0b3IgIT09IFNlbGVjdG9yVHlwZS5HZXQgJiYgc2VsZWN0b3IgIT09IFNlbGVjdG9yVHlwZS5HZXRXaXRoICYmXG4gICAgICAgICAgICBzZWxlY3RvciAhPT0gU2VsZWN0b3JUeXBlLkdldFdpdGhPbmx5ICYmIHNlbGVjdG9yICE9PSBTZWxlY3RvclR5cGUuR2V0V2l0aG91dCkge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdzZWxlY3RvciBtdXN0IGJlIGEgdmFsaWQgU2VsZWN0b3JUeXBlLicpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGNvbXBvbmVudHMgIT09ICdudW1iZXInKSAge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjb21wb25lbnRzIG11c3QgYmUgYSBudW1iZXIuJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgc3lzdGVtID0ge1xuICAgICAgICBzZWxlY3RvcixcbiAgICAgICAgY29tcG9uZW50cyxcbiAgICAgICAgY2FsbGJhY2tcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIGxldCBzeXN0ZW1JZCA9IE1hdGgubWF4KDAsIC4uLnRoaXMubG9naWNTeXN0ZW1zLmtleXMoKSwgLi4udGhpcy5yZW5kZXJTeXN0ZW1zLmtleXMoKSkgKyAxO1xuICAgICAgICBcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFN5c3RlbVR5cGUuTG9naWMgOiB0aGlzLmxvZ2ljU3lzdGVtcy5zZXQoc3lzdGVtSWQsIHN5c3RlbSk7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTeXN0ZW1UeXBlLlJlbmRlciA6IHRoaXMucmVuZGVyU3lzdGVtcy5zZXQoc3lzdGVtSWQsIHN5c3RlbSk7IGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gc3lzdGVtSWQ7XG4gICAgfVxuICAgIFxuICAgIHJlbW92ZVN5c3RlbShzeXN0ZW1JZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2dpY1N5c3RlbXMuZGVsZXRlKHN5c3RlbUlkKSB8fCB0aGlzLnJlbmRlclN5c3RlbXMuZGVsZXRlKHN5c3RlbUlkKTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcG9uZW50TWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgXG4gICAgbmV3Q29tcG9uZW50KGNvbXBvbmVudElkKSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KGNvbXBvbmVudElkKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChjb21wb25lbnQgPT09IG51bGwgfHwgY29tcG9uZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzogcmV0dXJuIG5ldyBjb21wb25lbnQoKTtcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCcgIDoge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKGNvbXBvbmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmV0ID0ge307XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjb21wb25lbnQpLmZvckVhY2goa2V5ID0+IHJldFtrZXldID0gY29tcG9uZW50W2tleV0pO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgICAgICB9KShjb21wb25lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICAgICAgaWYgKGNvbXBvbmVudCA9PT0gbnVsbCB8fCBjb21wb25lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjb21wb25lbnQgY2Fubm90IGJlIG51bGwuJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBtYXggPSBNYXRoLm1heCguLi50aGlzLmNvbXBvbmVudHMua2V5cygpKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBpZCA9IG1heCA9PT0gdW5kZWZpbmVkIHx8IG1heCA9PT0gbnVsbCB8fCBtYXggPT09IC1JbmZpbml0eSA/IDEgOiBtYXggPT09IDAgPyAxIDogbWF4ICogMjtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudHMuc2V0KGlkLCBjb21wb25lbnQpO1xuXG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9XG4gICAgXG4gICAgZ2V0Q29tcG9uZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50cztcbiAgICB9XG59IiwiaW1wb3J0IENvbXBvbmVudE1hbmFnZXIgICAgICAgICAgICAgIGZyb20gJy4vY29tcG9uZW50JztcbmltcG9ydCBTeXN0ZW1NYW5hZ2VyLCB7IFN5c3RlbVR5cGUgfSBmcm9tICcuL3N5c3RlbSc7XG5pbXBvcnQgRXZlbnRIYW5kbGVyICAgICAgICAgICAgICAgICAgZnJvbSAnLi9ldmVudCc7XG5cbmV4cG9ydCBjb25zdCBTZWxlY3RvclR5cGUgPSB7XG4gICAgR2V0ICAgICAgICAgOiAwLFxuICAgIEdldFdpdGggICAgIDogMSxcbiAgICBHZXRXaXRoT25seSA6IDIsXG4gICAgR2V0V2l0aG91dCAgOiAzXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRpdHlNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcihjYXBhY2l0eSA9IDEwMDApIHtcbiAgICAgICAgdGhpcy5jYXBhY2l0eSAgICAgICAgID0gY2FwYWNpdHk7XG4gICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IC0xO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5ICAgID0gbmV3IEVudGl0eUZhY3RvcnkoKTtcbiAgICAgICAgdGhpcy5zeXN0ZW1NYW5hZ2VyICAgID0gbmV3IFN5c3RlbU1hbmFnZXIoKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRNYW5hZ2VyID0gbmV3IENvbXBvbmVudE1hbmFnZXIoKTtcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIgICAgID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdGllcyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IHRoaXMuY2FwYWNpdHkgfSwgKCkgPT4geyByZXR1cm4gMDsgfSApO1xuICAgIH1cbiAgICBcbiAgICBpbmNyZWFzZUNhcGFjaXR5KCkge1xuICAgICAgICBsZXQgb2xkQ2FwYWNpdHkgPSB0aGlzLmNhcGFjaXR5O1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jYXBhY2l0eSAqPSAyO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IG9sZENhcGFjaXR5OyBpIDwgdGhpcy5jYXBhY2l0eTsgKytpKSB7XG4gICAgICAgICAgICB0aGlzLmVudGl0aWVzW2ldID0gMDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY29tcG9uZW50SWQgb2YgdGhpcy5jb21wb25lbnRNYW5hZ2VyLmdldENvbXBvbmVudHMoKS5rZXlzKCkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSBvbGRDYXBhY2l0eTsgaSA8IHRoaXMuY2FwYWNpdHk7ICsraSkge1xuICAgICAgICAgICAgICAgIHRoaXNbY29tcG9uZW50SWRdLnB1c2godGhpcy5jb21wb25lbnRNYW5hZ2VyLm5ld0NvbXBvbmVudChjb21wb25lbnRJZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG5ld0VudGl0eShjb21wb25lbnRzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50cyAhPT0gJ251bWJlcicgfHwgY29tcG9uZW50cyA8PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXBhY2l0eTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGVudGl0eUlkID0gMDtcbiAgICAgICAgXG4gICAgICAgIGZvciAoOyBlbnRpdHlJZCA8IHRoaXMuY2FwYWNpdHk7ICsrZW50aXR5SWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2VudGl0eUlkXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoZW50aXR5SWQgPj0gdGhpcy5jYXBhY2l0eSkge1xuICAgICAgICAgICAgLy8gdG9kbzogYXV0byBpbmNyZWFzZSBjYXBhY2l0eT9cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhcGFjaXR5O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoZW50aXR5SWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IGVudGl0eUlkO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eUlkXSA9IGNvbXBvbmVudHM7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZW50aXR5SWQ7XG4gICAgfVxuICAgIFxuICAgIGRlbGV0ZUVudGl0eShlbnRpdHlJZCkge1xuICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eUlkXSA9IDA7XG4gICAgICAgIFxuICAgICAgICBpZiAoZW50aXR5SWQgPCB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IGVudGl0eUlkOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbaV0gIT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSBpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAqZ2V0RW50aXRpZXMoY29tcG9uZW50cyA9IDAsIHR5cGUgPSBTZWxlY3RvclR5cGUuR2V0V2l0aCkge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgU2VsZWN0b3JUeXBlLkdldFdpdGg6IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRpdHlJZCBpbiB0aGlzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdHlJZCA+IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gIT09IDAgJiYgKHRoaXMuZW50aXRpZXNbZW50aXR5SWRdICYgY29tcG9uZW50cykgPT09IGNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIE1hdGguZmxvb3IoZW50aXR5SWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBTZWxlY3RvclR5cGUuR2V0V2l0aE9ubHk6IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRpdHlJZCBpbiB0aGlzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdHlJZCA+IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gIT09IDAgJiYgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gPT09IGNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIE1hdGguZmxvb3IoZW50aXR5SWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBTZWxlY3RvclR5cGUuR2V0V2l0aG91dDoge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGVudGl0eUlkIGluIHRoaXMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0eUlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2VudGl0eUlkXSAhPT0gMCAmJiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gJiBjb21wb25lbnRzKSAhPT0gY29tcG9uZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgeWllbGQgTWF0aC5mbG9vcihlbnRpdHlJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFNlbGVjdG9yVHlwZS5HZXQ6IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRpdHlJZCBpbiB0aGlzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdHlJZCA+IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB5aWVsZCBNYXRoLmZsb29yKGVudGl0eUlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDb21wb25lbnQgTWFuYWdlclxuICAgIFxuICAgIHJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCkge1xuICAgICAgICBsZXQgY29tcG9uZW50SWQgPSB0aGlzLmNvbXBvbmVudE1hbmFnZXIucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXNbY29tcG9uZW50SWRdID0gW107XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2FwYWNpdHk7ICsraSkge1xuICAgICAgICAgICAgdGhpc1tjb21wb25lbnRJZF0ucHVzaCh0aGlzLmNvbXBvbmVudE1hbmFnZXIubmV3Q29tcG9uZW50KGNvbXBvbmVudElkKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBpbml0aWFsaXplcjtcblxuICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzogaW5pdGlhbGl6ZXIgPSBjb21wb25lbnQ7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnb2JqZWN0Jzoge1xuICAgICAgICAgICAgICAgIGluaXRpYWxpemVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhjb21wb25lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBjb21wb25lbnRba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6IGluaXRpYWxpemVyID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb21wb25lbnQ7IH07IGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkucmVnaXN0ZXJJbml0aWFsaXplcihjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudElkO1xuICAgIH1cbiAgICBcbiAgICBhZGRDb21wb25lbnQoZW50aXR5SWQsIGNvbXBvbmVudElkKSB7XG4gICAgICAgIHRoaXMuZW50aXRpZXNbZW50aXR5SWRdIHw9IGNvbXBvbmVudElkO1xuICAgIH1cbiAgICBcbiAgICByZW1vdmVDb21wb25lbnQoZW50aXR5SWQsIGNvbXBvbmVudElkKSB7XG4gICAgICAgIHRoaXMuZW50aXRpZXNbZW50aXR5SWRdICY9IH5jb21wb25lbnRJZDtcbiAgICB9XG4gICAgXG4gICAgLy8gU3lzdGVtIE1hbmFnZXJcbiAgICBcbiAgICByZWdpc3RlclN5c3RlbSh0eXBlLCBzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbSh0eXBlLCBzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spO1xuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckxvZ2ljU3lzdGVtKHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlZ2lzdGVyU3lzdGVtKFN5c3RlbVR5cGUuTG9naWMsIHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyUmVuZGVyU3lzdGVtKHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlZ2lzdGVyU3lzdGVtKFN5c3RlbVR5cGUuUmVuZGVyLCBzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spO1xuICAgIH1cbiAgICBcbiAgICByZW1vdmVTeXN0ZW0oc3lzdGVtSWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZW1vdmVTeXN0ZW0oc3lzdGVtSWQpO1xuICAgIH1cbiAgICBcbiAgICBvbkxvZ2ljKGRlbHRhKSB7XG4gICAgICAgIGZvciAobGV0IHN5c3RlbSBvZiB0aGlzLnN5c3RlbU1hbmFnZXIubG9naWNTeXN0ZW1zLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBzeXN0ZW0uY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLmdldEVudGl0aWVzKHN5c3RlbS5jb21wb25lbnRzLCBzeXN0ZW0uc2VsZWN0b3IpLCBkZWx0YSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgb25SZW5kZXIoZGVsdGEpIHtcbiAgICAgICAgZm9yIChsZXQgc3lzdGVtIG9mIHRoaXMuc3lzdGVtTWFuYWdlci5yZW5kZXJTeXN0ZW1zLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBzeXN0ZW0uY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLmdldEVudGl0aWVzKHN5c3RlbS5jb21wb25lbnRzLCBzeXN0ZW0uc2VsZWN0b3IpLCBkZWx0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBFbnRpdHkgRmFjdG9yeVxuICAgIFxuICAgIHJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS5yZWdpc3RlckluaXRpYWxpemVyKGNvbXBvbmVudElkLCBpbml0aWFsaXplcik7XG4gICAgfVxuICAgIFxuICAgIGJ1aWxkKCkge1xuICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkuYnVpbGQoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICB3aXRoQ29tcG9uZW50KGNvbXBvbmVudElkLCBpbml0aWFsaXplcikge1xuICAgICAgICB0aGlzLmVudGl0eUZhY3Rvcnkud2l0aENvbXBvbmVudChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZUNvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVudGl0eUZhY3RvcnkuY3JlYXRlQ29uZmlndXJhdGlvbigpO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGUoY291bnQsIGNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW50aXR5RmFjdG9yeS5jcmVhdGUodGhpcywgY291bnQsIGNvbmZpZ3VyYXRpb24pO1xuICAgIH1cbiAgICBcbiAgICAvLyBFdmVudCBIYW5kbGVyXG4gICAgXG4gICAgbGlzdGVuKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIubGlzdGVuKGV2ZW50LCBjYWxsYmFjayk7XG4gICAgfVxuICAgIFxuICAgIHN0b3BMaXN0ZW4oZXZlbnRJZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIuc3RvcExpc3RlbihldmVudElkKTtcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLnRyaWdnZXIuY2FsbCh0aGlzLCAuLi5hcmd1bWVudHMpO1xuICAgIH1cbiAgICBcbiAgICB0cmlnZ2VyRGVsYXllZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLnRyaWdnZXJEZWxheWVkLmNhbGwodGhpcywgLi4uYXJndW1lbnRzKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFbnRpdHlGYWN0b3J5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplcnMgID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihjb21wb25lbnRJZCkgfHwgdHlwZW9mIGluaXRpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXJzLnNldChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpO1xuICAgIH1cbiAgICBcbiAgICBidWlsZCgpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gbmV3IE1hcCgpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIHdpdGhDb21wb25lbnQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihjb21wb25lbnRJZCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGluaXRpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBpbml0aWFsaXplciA9IHRoaXMuaW5pdGlhbGl6ZXJzLmdldChjb21wb25lbnRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5zZXQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGVDb25maWd1cmF0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGUoZW50aXR5TWFuYWdlciwgY291bnQgPSAxLCBjb25maWd1cmF0aW9uID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICghKGVudGl0eU1hbmFnZXIgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyKSkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGNvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uIHx8IHRoaXMuY29uZmlndXJhdGlvbjtcblxuICAgICAgICBsZXQgY29tcG9uZW50cyA9IDA7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBjb21wb25lbnQgb2YgY29uZmlndXJhdGlvbi5rZXlzKCkpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMgfD0gY29tcG9uZW50O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgZW50aXRpZXMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7ICsraSkge1xuICAgICAgICAgICAgbGV0IGVudGl0eUlkID0gZW50aXR5TWFuYWdlci5uZXdFbnRpdHkoY29tcG9uZW50cyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChlbnRpdHlJZCA+PSBlbnRpdHlNYW5hZ2VyLmNhcGFjaXR5KSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IFtjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXJdIG9mIGNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGluaXRpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gaW5pdGlhbGl6ZXIuY2FsbChlbnRpdHlNYW5hZ2VyW2NvbXBvbmVudElkXVtlbnRpdHlJZF0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZW50aXR5TWFuYWdlcltjb21wb25lbnRJZF1bZW50aXR5SWRdICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBlbnRpdHlNYW5hZ2VyW2NvbXBvbmVudElkXVtlbnRpdHlJZF0gIT09ICdvYmplY3QnICYmIHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eU1hbmFnZXJbY29tcG9uZW50SWRdW2VudGl0eUlkXSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGVudGl0aWVzLnB1c2goZW50aXR5SWQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZW50aXRpZXMubGVuZ3RoID09PSAxID8gZW50aXRpZXNbMF0gOiBlbnRpdGllcztcbiAgICB9XG59IiwiaW1wb3J0IEVudGl0eU1hbmFnZXIgZnJvbSAnLi9lbnRpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudEhhbmRsZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgXG4gICAgZW1wdHlQcm9taXNlKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBwcm9taXNlKGNhbGxiYWNrLCBjb250ZXh0LCBhcmdzLCB0aW1lb3V0KSB7XG4gICAgICAgIGlmICh0aW1lb3V0KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHR5cGVvZiBjb250ZXh0ID09PSAgJ29iamVjdCcgPyBjYWxsYmFjay5jYWxsKGNvbnRleHQsIC4uLmFyZ3MpIDogY2FsbGJhY2suYXBwbHkoY29udGV4dCwgLi4uYXJncykpO1xuICAgICAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUodHlwZW9mIGNvbnRleHQgPT09ICdvYmplY3QnID8gY2FsbGJhY2suY2FsbChjb250ZXh0LCAuLi5hcmdzKSA6IGNhbGxiYWNrLmFwcGx5KGNvbnRleHQsIC4uLmFyZ3MpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIGxpc3RlbihldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICghdGhpcy5ldmVudHMuaGFzKGV2ZW50KSkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHMuc2V0KGV2ZW50LCBuZXcgTWFwKCkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgZXZlbnRJZCA9IC0xO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5ldmVudHMuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudElkID0gTWF0aC5tYXgoZXZlbnRJZCwgLi4uZXZlbnQua2V5cygpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICArK2V2ZW50SWQ7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmV2ZW50cy5nZXQoZXZlbnQpLnNldChldmVudElkLCBjYWxsYmFjayk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZXZlbnRJZDtcbiAgICB9XG4gICAgXG4gICAgc3RvcExpc3RlbihldmVudElkKSB7XG4gICAgICAgIGZvciAobGV0IGV2ZW50cyBvZiB0aGlzLmV2ZW50cy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaWQgb2YgZXZlbnRzLmtleXMoKSkge1xuICAgICAgICAgICAgICAgIGlmIChpZCA9PT0gZXZlbnRJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnRzLmRlbGV0ZShldmVudElkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXIoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcyBpbnN0YW5jZW9mIEVudGl0eU1hbmFnZXIgPyB0aGlzLmV2ZW50SGFuZGxlciA6IHRoaXM7XG4gICAgICAgIFxuICAgICAgICBsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBbIGV2ZW50IF0gPSBhcmdzLnNwbGljZSgwLCAxKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnQgIT09ICdzdHJpbmcnIHx8ICFzZWxmLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5lbXB0eVByb21pc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHByb21pc2VzID0gW107XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBjYWxsYmFjayBvZiBzZWxmLmV2ZW50cy5nZXQoZXZlbnQpLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHNlbGYucHJvbWlzZShjYWxsYmFjaywgdGhpcywgYXJncywgMSkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH1cbiAgICBcbiAgICB0cmlnZ2VyRGVsYXllZCgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlciA/IHRoaXMuZXZlbnRIYW5kbGVyIDogdGhpcztcbiAgICAgICAgXG4gICAgICAgIGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xuICAgICAgICBcbiAgICAgICAgbGV0IFsgZXZlbnQsIHRpbWVvdXQgXSA9IGFyZ3Muc3BsaWNlKDAsIDIpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgIU51bWJlci5pc0ludGVnZXIodGltZW91dCkgfHwgIXNlbGYuZXZlbnRzLmhhcyhldmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmVtcHR5UHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGNhbGxiYWNrIG9mIHNlbGYuZXZlbnRzLmdldChldmVudCkudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goc2VsZi5wcm9taXNlKGNhbGxiYWNrLCB0aGlzLCBhcmdzLCB0aW1lb3V0KSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxufSIsIi8qKlxuICogbWFpbmxvb3AuanMgMS4wLjEtMjAxNTA4MTZcbiAqXG4gKiBAYXV0aG9yIElzYWFjIFN1a2luIChodHRwOi8vd3d3LmlzYWFjc3VraW4uY29tLylcbiAqIEBsaWNlbnNlIE1JVFxuICovXG5cbiFmdW5jdGlvbihhKXtmdW5jdGlvbiBiKGEpe2lmKGUraj5hKXJldHVybiB1PW4oYiksdm9pZCAwO2ZvcihkKz1hLWUsZT1hLHEoYSxkKSxhPmcrMWUzJiYoZj0uMjUqaCsuNzUqZixnPWEsaD0wKSxoKyssaT0wO2Q+PWM7KWlmKHIoYyksZC09YywrK2k+PTI0MCl7bT0hMDticmVha31zKGQvYyksdChmLG0pLG09ITEsdT1uKGIpfXZhciBjPTFlMy82MCxkPTAsZT0wLGY9NjAsZz0wLGg9MCxpPTAsaj0wLGs9ITEsbD0hMSxtPSExLG49YS5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fGZ1bmN0aW9uKCl7dmFyIGE9RGF0ZS5ub3coKSxiLGQ7cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiBiPURhdGUubm93KCksZD1NYXRoLm1heCgwLGMtKGItYSkpLGE9YitkLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtlKGIrZCl9LGQpfX0oKSxvPWEuY2FuY2VsQW5pbWF0aW9uRnJhbWV8fGNsZWFyVGltZW91dCxwPWZ1bmN0aW9uKCl7fSxxPXAscj1wLHM9cCx0PXAsdTthLk1haW5Mb29wPXtnZXRTaW11bGF0aW9uVGltZXN0ZXA6ZnVuY3Rpb24oKXtyZXR1cm4gY30sc2V0U2ltdWxhdGlvblRpbWVzdGVwOmZ1bmN0aW9uKGEpe3JldHVybiBjPWEsdGhpc30sZ2V0RlBTOmZ1bmN0aW9uKCl7cmV0dXJuIGZ9LGdldE1heEFsbG93ZWRGUFM6ZnVuY3Rpb24oKXtyZXR1cm4gMWUzL2p9LHNldE1heEFsbG93ZWRGUFM6ZnVuY3Rpb24oYSl7cmV0dXJuXCJ1bmRlZmluZWRcIj09dHlwZW9mIGEmJihhPTEvMCksMD09PWE/dGhpcy5zdG9wKCk6aj0xZTMvYSx0aGlzfSxyZXNldEZyYW1lRGVsdGE6ZnVuY3Rpb24oKXt2YXIgYT1kO3JldHVybiBkPTAsYX0sc2V0QmVnaW46ZnVuY3Rpb24oYSl7cmV0dXJuIHE9YXx8cSx0aGlzfSxzZXRVcGRhdGU6ZnVuY3Rpb24oYSl7cmV0dXJuIHI9YXx8cix0aGlzfSxzZXREcmF3OmZ1bmN0aW9uKGEpe3JldHVybiBzPWF8fHMsdGhpc30sc2V0RW5kOmZ1bmN0aW9uKGEpe3JldHVybiB0PWF8fHQsdGhpc30sc3RhcnQ6ZnVuY3Rpb24oKXtyZXR1cm4gbHx8KGw9ITAsdT1uKGZ1bmN0aW9uKGEpe3MoMSksaz0hMCxlPWEsZz1hLGg9MCx1PW4oYil9KSksdGhpc30sc3RvcDpmdW5jdGlvbigpe3JldHVybiBrPSExLGw9ITEsbyh1KSx0aGlzfSxpc1J1bm5pbmc6ZnVuY3Rpb24oKXtyZXR1cm4ga319LFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoYS5NYWluTG9vcCk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJihtb2R1bGUuZXhwb3J0cz1hLk1haW5Mb29wKX0odGhpcyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYWlubG9vcC5taW4uanMubWFwIiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IE1haW5Mb29wIGZyb20gJ21haW5sb29wLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbkxvb3BMb29wTWFuYWdlciB7XG4gICAgc2V0VXBkYXRlKHVwZGF0ZU1ldGhvZCA6IChkZWx0YSA6IG51bWJlcikgPT4gdm9pZCkgOiBNYWluTG9vcExvb3BNYW5hZ2VyIHtcbiAgICAgICAgTWFpbkxvb3Auc2V0VXBkYXRlKHVwZGF0ZU1ldGhvZCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgc2V0UmVuZGVyKHJlbmRlck1ldGhvZCA6IChpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSA6IG51bWJlcikgPT4gdm9pZCkgOiBNYWluTG9vcExvb3BNYW5hZ2VyIHtcbiAgICAgICAgTWFpbkxvb3Auc2V0RHJhdyhyZW5kZXJNZXRob2QpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIHN0YXJ0KCkgOiB2b2lkIHtcbiAgICAgICAgTWFpbkxvb3Auc3RhcnQoKTtcbiAgICB9XG59IiwiLyogQGZsb3cqL1xuXG5pbXBvcnQgVGhyZWVSZW5kZXJlck1hbmFnZXIgIGZyb20gJy4uL2xvZ2ljL3RocmVlLXJlbmRlcmVyLW1hbmFnZXInO1xuaW1wb3J0IFRocmVlU2NlbmVNYW5hZ2VyICAgICBmcm9tICcuLi9sb2dpYy90aHJlZS1zY2VuZS1tYW5hZ2VyJztcbmltcG9ydCBUaHJlZU1lc2hNYW5hZ2VyICAgICAgZnJvbSAnLi4vbG9naWMvdGhyZWUtbWVzaC1tYW5hZ2VyJztcbmltcG9ydCBUaHJlZU9iamVjdE1lc2hMb2FkZXIgZnJvbSAnLi4vbG9naWMvdGhyZWUtb2JqZWN0LW1lc2gtbG9hZGVyJztcbmltcG9ydCBRV2VzdEFqYXhMb2FkZXIgICAgICAgZnJvbSAnLi4vbG9naWMvcXdlc3QtYWpheC1sb2FkZXInO1xuaW1wb3J0IExldmVsTG9hZGVyICAgICAgICAgICBmcm9tICcuLi9sb2dpYy9sZXZlbC1sb2FkZXInO1xuaW1wb3J0IHsgRW50aXR5TWFuYWdlciB9ICAgICBmcm9tICdnZy1lbnRpdGllcyc7XG5pbXBvcnQgTWFpbkxvb3BMb29wTWFuYWdlciAgIGZyb20gJy4uL2xvZ2ljL21haW5sb29wLWxvb3AtbWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICByZW5kZXJlck1hbmFnZXIoKSA6IElSZW5kZXJlck1hbmFnZXIgeyByZXR1cm4gbmV3IFRocmVlUmVuZGVyZXJNYW5hZ2VyKCk7IH0sXG5cbiAgICBzY2VuZU1hbmFnZXIoKSA6IElTY2VuZU1hbmFnZXIgeyByZXR1cm4gbmV3IFRocmVlU2NlbmVNYW5hZ2VyKCk7IH0sXG4gICAgXG4gICAgbWVzaE1hbmFnZXIoKSA6IElNZXNoTWFuYWdlciB7IHJldHVybiBuZXcgVGhyZWVNZXNoTWFuYWdlcigpOyB9LFxuXG4gICAgbGV2ZWxMb2FkZXIoKSA6IElMZXZlbExvYWRlciB7IHJldHVybiBuZXcgTGV2ZWxMb2FkZXIobmV3IFFXZXN0QWpheExvYWRlcigpKTsgfSxcbiAgICBcbiAgICBlbnRpdHlNYW5hZ2VyKCkgOiBJRW50aXR5TWFuYWdlciB7IHJldHVybiBuZXcgRW50aXR5TWFuYWdlcigpOyB9LFxuICAgIFxuICAgIGxvb3BNYW5hZ2VyKCkgOiBJTG9vcE1hbmFnZXIgeyByZXR1cm4gbmV3IE1haW5Mb29wTG9vcE1hbmFnZXIoKTsgfSxcbiAgICBcbiAgICBtZXNoTG9hZGVyKCkgOiBJTWVzaExvYWRlciB7IHJldHVybiBuZXcgVGhyZWVPYmplY3RNZXNoTG9hZGVyKCk7IH1cbn07IiwiLyogQGZsb3cgKi9cblxuZXhwb3J0IGNvbnN0IEZsYXRTaGFkaW5nID0gMTtcbmV4cG9ydCBjb25zdCBTbW9vdGhTaGFkaW5nID0gMjsiLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgREkgZnJvbSAnLi91dGlsaXR5L2RlcGVuZGVuY3ktaW5qZWN0b3InO1xuXG5pbXBvcnQgeyBGbGF0U2hhZGluZyB9IGZyb20gJy4vY29uc3RhbnRzL3NoYWRpbmcnO1xuXG53aW5kb3cub25sb2FkID0gYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgbGV2ZWxMb2FkZXIgPSBESS5sZXZlbExvYWRlcigpO1xuICAgIGNvbnN0IGxldmVsICAgICAgID0gYXdhaXQgbGV2ZWxMb2FkZXIubG9hZExldmVsKCdsZXZlbHMvbGV2ZWwtb25lLmpzb24nKTtcbiAgICBcbiAgICBjb25zdCBtZXNoTG9hZGVyICA9IERJLm1lc2hMb2FkZXIoKTtcbiAgICBjb25zdCBtZXNoTWFuYWdlciA9IERJLm1lc2hNYW5hZ2VyKCk7XG4gICAgY29uc3QgbWVzaElkICAgICAgPSBtZXNoTWFuYWdlci5hZGRNZXNoKGF3YWl0IG1lc2hMb2FkZXIubG9hZCgnbWVzaGVzLycgKyBsZXZlbC5tZXNoLCB7IHNoYWRpbmcgOiBGbGF0U2hhZGluZyB9KSk7XG4gICAgXG4gICAgY29uc3Qgc2NlbmVNYW5hZ2VyID0gREkuc2NlbmVNYW5hZ2VyKCk7XG4gICAgY29uc3Qgc2NlbmVJZCAgICAgID0gc2NlbmVNYW5hZ2VyLmNyZWF0ZVNjZW5lKCk7XG4gICAgXG4gICAgc2NlbmVNYW5hZ2VyLmFkZFRvU2NlbmUoc2NlbmVJZCwgbWVzaE1hbmFnZXIuZ2V0TWVzaChtZXNoSWQpKTtcbiAgICBzY2VuZU1hbmFnZXIuYWRkQW1iaWVudExpZ2h0VG9TY2VuZShzY2VuZUlkLCAweDEwMTAzMCk7XG4gXHRzY2VuZU1hbmFnZXIuYWRkRGlyZWN0aW9uYWxMaWdodFRvU2NlbmUoc2NlbmVJZCwgMHhmZmVlZGQsIDAsIDAsIDEpO1xuXG4gICAgY29uc3QgZW50aXR5TWFuYWdlciAgID0gREkuZW50aXR5TWFuYWdlcigpO1xuICAgIGNvbnN0IHJlbmRlcmVyTWFuYWdlciA9IERJLnJlbmRlcmVyTWFuYWdlcigpO1xuICAgIGNvbnN0IGxvb3BNYW5hZ2VyICAgICA9IERJLmxvb3BNYW5hZ2VyKCk7XG4gICAgXG4gICAgdmFyIG1lc2hJc0FkZGVkID0gdHJ1ZTtcbiAgICBcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBpZiAobWVzaElzQWRkZWQpIHtcbiAgICAgICAgICAgIHNjZW5lTWFuYWdlci5yZW1vdmVGcm9tU2NlbmUoc2NlbmVJZCwgbWVzaE1hbmFnZXIuZ2V0TWVzaChtZXNoSWQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNjZW5lTWFuYWdlci5hZGRUb1NjZW5lKHNjZW5lSWQsIG1lc2hNYW5hZ2VyLmdldE1lc2gobWVzaElkKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIG1lc2hJc0FkZGVkID0gIW1lc2hJc0FkZGVkO1xuICAgIH0pO1xuICAgIFxuICAgIGxvb3BNYW5hZ2VyLnNldFVwZGF0ZShkZWx0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG1lc2hNYW5hZ2VyLmdldE1lc2gobWVzaElkKS5yb3RhdGlvbi55ICs9IDAuMDAxICogZGVsdGE7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eU1hbmFnZXIub25Mb2dpYyhkZWx0YSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgIC5zZXRSZW5kZXIoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UgPT4gcmVuZGVyZXJNYW5hZ2VyLnJlbmRlcihzY2VuZU1hbmFnZXIuZ2V0U2NlbmUoc2NlbmVJZCksIGludGVycG9sYXRpb25QZXJjZW50YWdlKSlcbiAgICAgICAgICAgICAgIC5zdGFydCgpO1xufTsiXSwibmFtZXMiOlsicGlua3lzd2VhciIsInJlcXVpcmUkJDEiLCJyZXF1aXJlJCQwIiwiTWFpbkxvb3AiLCJRV2VzdEFqYXhMb2FkZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFJcUIsb0JBQW9CO2VBQXBCLG9CQUFvQixHQUl2Qjs0Q0FKRyxvQkFBb0I7O2NBSzdCLENBQUMsUUFBUSxHQUFHLElBQUksS0FBSyxDQUFDLGFBQWEsRUFBRTtjQUNyQyxDQUFDLE1BQU0sR0FBSyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsRUFBRTs7Y0FFekMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQzs7a0JBRXBELENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQzs7Y0FFL0MsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFFO2NBQ3ZCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRTs7Y0FFdkIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7K0JBZnZDLG9C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