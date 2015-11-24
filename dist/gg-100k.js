(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('three')) :
	typeof define === 'function' && define.amd ? define('Test', ['three'], factory) :
	factory(global.THREE);
}(this, function (three) { 'use strict';

	three = 'default' in three ? three['default'] : three;

	var __commonjs_global = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this;

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

	var mainloop = (function (module, global) {
	    var exports = module.exports;
	    /*
	     * A main loop useful for games and other animated applications.
	     */
	    (function () {
	        var root;

	        if (typeof window === 'undefined') {
	            root = global;
	        } else {
	            root = window;
	        }

	        // The amount of time (in milliseconds) to simulate each time update()
	        // runs. See `MainLoop.setSimulationTimestep()` for details.
	        var simulationTimestep = 1000 / 60,

	        // The cumulative amount of in-app time that hasn't been simulated yet.
	        // See the comments inside animate() for details.
	        frameDelta = 0,

	        // The timestamp in milliseconds of the last time the main loop was run.
	        // Used to compute the time elapsed between frames.
	        lastFrameTimeMs = 0,

	        // An exponential moving average of the frames per second.
	        fps = 60,

	        // The timestamp (in milliseconds) of the last time the `fps` moving
	        // average was updated.
	        lastFpsUpdate = 0,

	        // The number of frames delivered in the current second.
	        framesThisSecond = 0,

	        // The number of times update() is called in a given frame. This is only
	        // relevant inside of animate(), but a reference is held externally so that
	        // this variable is not marked for garbage collection every time the main
	        // loop runs.
	        numUpdateSteps = 0,

	        // The minimum amount of time in milliseconds that must pass since the last
	        // frame was executed before another frame can be executed. The
	        // multiplicative inverse caps the FPS (the default of zero means there is
	        // no cap).
	        minFrameDelay = 0,

	        // Whether the main loop is running.
	        running = false,

	        // `true` if `MainLoop.start()` has been called and the most recent time it
	        // was called has not been followed by a call to `MainLoop.stop()`. This is
	        // different than `running` because there is a delay of a few milliseconds
	        // after `MainLoop.start()` is called before the application is considered
	        // "running." This delay is due to waiting for the next frame.
	        started = false,

	        // Whether the simulation has fallen too far behind real time.
	        // Specifically, `panic` will be set to `true` if too many updates occur in
	        // one frame. This is only relevant inside of animate(), but a reference is
	        // held externally so that this variable is not marked for garbage
	        // collection every time the main loop runs.
	        panic = false,

	        // The function that runs the main loop. The unprefixed version of
	        // `window.requestAnimationFrame()` is available in all modern browsers
	        // now, but node.js doesn't have it, so fall back to timers. The polyfill
	        // is adapted from the MIT-licensed
	        // https://github.com/underscorediscovery/realtime-multiplayer-in-html5
	        requestAnimationFrame = root.requestAnimationFrame || (function () {
	            var lastTimestamp = Date.now(),
	                now,
	                timeout;
	            return function (callback) {
	                now = Date.now();
	                // The next frame should run no sooner than the simulation allows,
	                // but as soon as possible if the current frame has already taken
	                // more time to run than is simulated in one timestep.
	                timeout = Math.max(0, simulationTimestep - (now - lastTimestamp));
	                lastTimestamp = now + timeout;
	                return setTimeout(function () {
	                    callback(now + timeout);
	                }, timeout);
	            };
	        })(),

	        // The function that stops the main loop. The unprefixed version of
	        // `window.cancelAnimationFrame()` is available in all modern browsers now,
	        // but node.js doesn't have it, so fall back to timers.
	        cancelAnimationFrame = root.cancelAnimationFrame || clearTimeout,

	        // In all major browsers, replacing non-specified functions with NOOPs
	        // seems to be as fast or slightly faster than using conditions to only
	        // call the functions if they are specified. This is probably due to empty
	        // functions being optimized away. http://jsperf.com/noop-vs-condition
	        NOOP = function NOOP() {},

	        // A function that runs at the beginning of the main loop.
	        // See `MainLoop.setBegin()` for details.
	        begin = NOOP,

	        // A function that runs updates (i.e. AI and physics).
	        // See `MainLoop.setUpdate()` for details.
	        update = NOOP,

	        // A function that draws things on the screen.
	        // See `MainLoop.setDraw()` for details.
	        draw = NOOP,

	        // A function that runs at the end of the main loop.
	        // See `MainLoop.setEnd()` for details.
	        end = NOOP,

	        // The ID of the currently executing frame. Used to cancel frames when
	        // stopping the loop.
	        rafHandle;

	        /**
	         * Manages the main loop that runs updates and rendering.
	         *
	         * The main loop is a core part of any application in which state changes
	         * even if no events are handled. In games, it is typically responsible for
	         * computing physics and AI as well as drawing the result on the screen.
	         *
	         * The body of this particular loop is run every time the browser is ready to
	         * paint another frame. The frequency with which this happens depends primarily
	         * on the monitor's refresh rate, which is typically 60 frames per second. Most
	         * applications aim to run at 60 FPS for this reason, meaning that the main
	         * loop runs about once every 16.7 milliseconds. With this target, everything
	         * that happens in the main loop (e.g. all updates and drawing) needs to occur
	         * within the "budget" of 16.7 milliseconds.  See
	         * `MainLoop.setSimulationTimestep()` for more information about typical
	         * monitor refresh rates and frame rate targets.
	         *
	         * The main loop can be started and stopped, but there can only be one MainLoop
	         * (except that each Web Worker can have its own MainLoop). There are four main
	         * parts of the loop: {@link #setBegin begin}(), {@link #setUpdate update}(),
	         * {@link #setDraw draw}(), and {@link #setEnd end}(), in that order. See the
	         * functions that set each of them for descriptions of what they are used for.
	         * Note that update() can run zero or more times per loop.
	         *
	         * @class MainLoop
	         */
	        root.MainLoop = {
	            /**
	             * Gets how many milliseconds should be simulated by every run of update().
	             *
	             * See `MainLoop.setSimulationTimestep()` for details on this value.
	             *
	             * @return {Number}
	             *   The number of milliseconds that should be simulated by every run of
	             *   {@link #setUpdate update}().
	             */
	            getSimulationTimestep: function getSimulationTimestep() {
	                return simulationTimestep;
	            },

	            /**
	             * Sets how many milliseconds should be simulated by every run of update().
	             *
	             * The perceived frames per second (FPS) is effectively capped at the
	             * multiplicative inverse of the simulation timestep. That is, if the
	             * timestep is 1000 / 60 (which is the default), then the maximum perceived
	             * FPS is effectively 60. Decreasing the timestep increases the maximum
	             * perceived FPS at the cost of running {@link #setUpdate update}() more
	             * times per frame at lower frame rates. Since running update() more times
	             * takes more time to process, this can actually slow down the frame rate.
	             * Additionally, if the amount of time it takes to run update() exceeds or
	             * very nearly exceeds the timestep, the application will freeze and crash
	             * in a spiral of death (unless it is rescued; see `MainLoop.setEnd()` for
	             * an explanation of what can be done if a spiral of death is occurring).
	             *
	             * The exception to this is that interpolating between updates for each
	             * render can increase the perceived frame rate and reduce visual
	             * stuttering. See `MainLoop.setDraw()` for an explanation of how to do
	             * this.
	             *
	             * If you are considering decreasing the simulation timestep in order to
	             * raise the maximum perceived FPS, keep in mind that most monitors can't
	             * display more than 60 FPS. Whether humans can tell the difference among
	             * high frame rates depends on the application, but for reference, film is
	             * usually displayed at 24 FPS, other videos at 30 FPS, most games are
	             * acceptable above 30 FPS, and virtual reality might require 75 FPS to
	             * feel natural. Some gaming monitors go up to 144 FPS. Setting the
	             * timestep below 1000 / 144 is discouraged and below 1000 / 240 is
	             * strongly discouraged. The default of 1000 / 60 is good in most cases.
	             *
	             * The simulation timestep should typically only be changed at
	             * deterministic times (e.g. before the main loop starts for the first
	             * time, and not in response to user input or slow frame rates) to avoid
	             * introducing non-deterministic behavior. The update timestep should be
	             * the same for all players/users in multiplayer/multi-user applications.
	             *
	             * See also `MainLoop.getSimulationTimestep()`.
	             *
	             * @param {Number} timestep
	             *   The number of milliseconds that should be simulated by every run of
	             *   {@link #setUpdate update}().
	             */
	            setSimulationTimestep: function setSimulationTimestep(timestep) {
	                simulationTimestep = timestep;
	                return this;
	            },

	            /**
	             * Returns the exponential moving average of the frames per second.
	             *
	             * @return {Number}
	             *   The exponential moving average of the frames per second.
	             */
	            getFPS: function getFPS() {
	                return fps;
	            },

	            /**
	             * Gets the maximum frame rate.
	             *
	             * Other factors also limit the FPS; see `MainLoop.setSimulationTimestep`
	             * for details.
	             *
	             * See also `MainLoop.setMaxAllowedFPS()`.
	             *
	             * @return {Number}
	             *   The maximum number of frames per second allowed.
	             */
	            getMaxAllowedFPS: function getMaxAllowedFPS() {
	                return 1000 / minFrameDelay;
	            },

	            /**
	             * Sets a maximum frame rate.
	             *
	             * See also `MainLoop.getMaxAllowedFPS()`.
	             *
	             * @param {Number} [fps=Infinity]
	             *   The maximum number of frames per second to execute. If Infinity or not
	             *   passed, there will be no FPS cap (although other factors do limit the
	             *   FPS; see `MainLoop.setSimulationTimestep` for details). If zero, this
	             *   will stop the loop, and when the loop is next started, it will return
	             *   to the previous maximum frame rate. Passing negative values will stall
	             *   the loop until this function is called again with a positive value.
	             *
	             * @chainable
	             */
	            setMaxAllowedFPS: function setMaxAllowedFPS(fps) {
	                if (typeof fps === 'undefined') {
	                    fps = Infinity;
	                }
	                if (fps === 0) {
	                    this.stop();
	                } else {
	                    // Dividing by Infinity returns zero.
	                    minFrameDelay = 1000 / fps;
	                }
	                return this;
	            },

	            /**
	             * Reset the amount of time that has not yet been simulated to zero.
	             *
	             * This introduces non-deterministic behavior if called after the
	             * application has started running (unless it is being reset, in which case
	             * it doesn't matter). However, this can be useful in cases where the
	             * amount of time that has not yet been simulated has grown very large
	             * (for example, when the application's tab gets put in the background and
	             * the browser throttles the timers as a result). In applications with
	             * lockstep the player would get dropped, but in other networked
	             * applications it may be necessary to snap or ease the player/user to the
	             * authoritative state and discard pending updates in the process. In
	             * non-networked applications it may also be acceptable to simply resume
	             * the application where it last left off and ignore the accumulated
	             * unsimulated time.
	             *
	             * @return {Number}
	             *   The cumulative amount of elapsed time in milliseconds that has not yet
	             *   been simulated, but is being discarded as a result of calling this
	             *   function.
	             */
	            resetFrameDelta: function resetFrameDelta() {
	                var oldFrameDelta = frameDelta;
	                frameDelta = 0;
	                return oldFrameDelta;
	            },

	            /**
	             * Sets the function that runs at the beginning of the main loop.
	             *
	             * The begin() function is typically used to process input before the
	             * updates run. Processing input here (in chunks) can reduce the running
	             * time of event handlers, which is useful because long-running event
	             * handlers can sometimes delay frames.
	             *
	             * Unlike {@link #setUpdate update}(), which can run zero or more times per
	             * frame, begin() always runs exactly once per frame. This makes it useful
	             * for any updates that are not dependent on time in the simulation.
	             * Examples include adjusting HUD calculations or performing long-running
	             * updates incrementally. Compared to {@link #setEnd end}(), generally
	             * actions should occur in begin() if they affect anything that
	             * {@link #setUpdate update}() or {@link #setDraw draw}() use.
	             *
	             * @param {Function} begin
	             *   The begin() function.
	             * @param {Number} [begin.timestamp]
	             *   The current timestamp (when the frame started), in milliseconds. This
	             *   should only be used for comparison to other timestamps because the
	             *   epoch (i.e. the "zero" time) depends on the engine running this code.
	             *   In engines that support `DOMHighResTimeStamp` (all modern browsers
	             *   except iOS Safari 8) the epoch is the time the page started loading,
	             *   specifically `performance.timing.navigationStart`. Everywhere else,
	             *   including node.js, the epoch is the Unix epoch (1970-01-01T00:00:00Z).
	             * @param {Number} [begin.delta]
	             *   The total elapsed time that has not yet been simulated, in
	             *   milliseconds.
	             */
	            setBegin: function setBegin(fun) {
	                begin = fun || begin;
	                return this;
	            },

	            /**
	             * Sets the function that runs updates (e.g. AI and physics).
	             *
	             * The update() function should simulate anything that is affected by time.
	             * It can be called zero or more times per frame depending on the frame
	             * rate.
	             *
	             * As with everything in the main loop, the running time of update()
	             * directly affects the frame rate. If update() takes long enough that the
	             * frame rate drops below the target ("budgeted") frame rate, parts of the
	             * update() function that do not need to execute between every frame can be
	             * moved into Web Workers. (Various sources on the internet sometimes
	             * suggest other scheduling patterns using setTimeout() or setInterval().
	             * These approaches sometimes offer modest improvements with minimal
	             * changes to existing code, but because JavaScript is single-threaded, the
	             * updates will still block rendering and drag down the frame rate. Web
	             * Workers execute in separate threads, so they free up more time in the
	             * main loop.)
	             *
	             * This script can be imported into a Web Worker using importScripts() and
	             * used to run a second main loop in the worker. Some considerations:
	             *
	             * - Profile your code before doing the work to move it into Web Workers.
	             *   It could be the rendering that is the bottleneck, in which case the
	             *   solution is to decrease the visual complexity of the scene.
	             * - It doesn't make sense to move the *entire* contents of update() into
	             *   workers unless {@link #setDraw draw}() can interpolate between frames.
	             *   The lowest-hanging fruit is background updates (like calculating
	             *   citizens' happiness in a city-building game), physics that doesn't
	             *   affect the scene (like flags waving in the wind), and anything that is
	             *   occluded or happening far off screen.
	             * - If draw() needs to interpolate physics based on activity that occurs
	             *   in a worker, the worker needs to pass the interpolation value back to
	             *   the main thread so that is is available to draw().
	             * - Web Workers can't access the state of the main thread, so they can't
	             *   directly modify objects in your scene. Moving data to and from Web
	             *   Workers is a pain. The fastest way to do it is with Transferable
	             *   Objects: basically, you can pass an ArrayBuffer to a worker,
	             *   destroying the original reference in the process.
	             *
	             * You can read more about Web Workers and Transferable Objects at
	             * [HTML5 Rocks](http://www.html5rocks.com/en/tutorials/workers/basics/).
	             *
	             * @param {Function} update
	             *   The update() function.
	             * @param {Number} [update.delta]
	             *   The amount of time in milliseconds to simulate in the update. In most
	             *   cases this timestep never changes in order to ensure deterministic
	             *   updates. The timestep is the same as that returned by
	             *   `MainLoop.getSimulationTimestep()`.
	             */
	            setUpdate: function setUpdate(fun) {
	                update = fun || update;
	                return this;
	            },

	            /**
	             * Sets the function that draws things on the screen.
	             *
	             * The draw() function gets passed the percent of time that the next run of
	             * {@link #setUpdate update}() will simulate that has actually elapsed, as
	             * a decimal. In other words, draw() gets passed how far between update()
	             * calls it is. This is useful because the time simulated by update() and
	             * the time between draw() calls is usually different, so the parameter to
	             * draw() can be used to interpolate motion between frames to make
	             * rendering appear smoother. To illustrate, if update() advances the
	             * simulation at each vertical bar in the first row below, and draw() calls
	             * happen at each vertical bar in the second row below, then some frames
	             * will have time left over that is not yet simulated by update() when
	             * rendering occurs in draw():
	             *
	             *     update() timesteps:  |  |  |  |  |  |  |  |  |
	             *     draw() calls:        |   |   |   |   |   |   |
	             *
	             * To interpolate motion for rendering purposes, objects' state after the
	             * last update() must be retained and used to calculate an intermediate
	             * state. Note that this means renders will be up to one update() behind.
	             * This is still better than extrapolating (projecting objects' state after
	             * a future update()) which can produce bizarre results. Storing multiple
	             * states can be difficult to set up, and keep in mind that running this
	             * process takes time that could push the frame rate down, so it's often
	             * not worthwhile unless stuttering is visible.
	             *
	             * @param {Function} draw
	             *   The draw() function.
	             * @param {Number} [draw.interpolationPercentage]
	             *   The cumulative amount of time that hasn't been simulated yet, divided
	             *   by the amount of time that will be simulated the next time update()
	             *   runs. Useful for interpolating frames.
	             */
	            setDraw: function setDraw(fun) {
	                draw = fun || draw;
	                return this;
	            },

	            /**
	             * Sets the function that runs at the end of the main loop.
	             *
	             * Unlike {@link #setUpdate update}(), which can run zero or more times per
	             * frame, end() always runs exactly once per frame. This makes it useful
	             * for any updates that are not dependent on time in the simulation.
	             * Examples include cleaning up any temporary state set up by
	             * {@link #setBegin begin}(), lowering the visual quality if the frame rate
	             * is too low, or performing long-running updates incrementally. Compared
	             * to begin(), generally actions should occur in end() if they use anything
	             * that update() or {@link #setDraw draw}() affect.
	             *
	             * @param {Function} end
	             *   The end() function.
	             * @param {Number} [end.fps]
	             *   The exponential moving average of the frames per second. This is the
	             *   same value returned by `MainLoop.getFPS()`. It can be used to take
	             *   action when the FPS is too low (or to restore to normalcy if the FPS
	             *   moves back up). Examples of actions to take if the FPS is too low
	             *   include exiting the application, lowering the visual quality, stopping
	             *   or reducing activities outside of the main loop like event handlers or
	             *   audio playback, performing non-critical updates less frequently, or
	             *   increasing the simulation timestep (by calling
	             *   `MainLoop.setSimulationTimestep()`). Note that this last option
	             *   results in more time being simulated per update() call, which causes
	             *   the application to behave non-deterministically.
	             * @param {Boolean} [end.panic=false]
	             *   Indicates whether the simulation has fallen too far behind real time.
	             *   Specifically, `panic` will be `true` if too many updates occurred in
	             *   one frame. In networked lockstep applications, the application should
	             *   wait for some amount of time to see if the user can catch up before
	             *   dropping the user. In networked but non-lockstep applications, this
	             *   typically indicates that the user needs to be snapped or eased to the
	             *   current authoritative state. When this happens, it may be convenient
	             *   to call `MainLoop.resetFrameDelta()` to discard accumulated pending
	             *   updates. In non-networked applications, it may be acceptable to allow
	             *   the application to keep running for awhile to see if it will catch up.
	             *   However, this could also cause the application to look like it is
	             *   running very quickly for a few frames as it transitions through the
	             *   intermediate states. An alternative that may be acceptable is to
	             *   simply ignore the unsimulated elapsed time by calling
	             *   `MainLoop.resetFrameDelta()` even though this introduces
	             *   non-deterministic behavior. In all cases, if the application panics
	             *   frequently, this is an indication that the main loop is running too
	             *   slowly. However, most of the time the drop in frame rate will probably
	             *   be noticeable before a panic occurs. To help the application catch up
	             *   after a panic caused by a spiral of death, the same steps can be taken
	             *   that are suggested above if the FPS drops too low.
	             */
	            setEnd: function setEnd(fun) {
	                end = fun || end;
	                return this;
	            },

	            /**
	             * Starts the main loop.
	             *
	             * Note that the application is not considered "running" immediately after
	             * this function returns; rather, it is considered "running" after the
	             * application draws its first frame. The distinction is that event
	             * handlers should remain paused until the application is running, even
	             * after `MainLoop.start()` is called. Check `MainLoop.isRunning()` for the
	             * current status. To act after the application starts, register a callback
	             * with requestAnimationFrame() after calling this function and execute the
	             * action in that callback. It is safe to call `MainLoop.start()` multiple
	             * times even before the application starts running and without calling
	             * `MainLoop.stop()` in between, although there is no reason to do this;
	             * the main loop will only start if it is not already started.
	             *
	             * See also `MainLoop.stop()`.
	             */
	            start: function start() {
	                if (!started) {
	                    // Since the application doesn't start running immediately, track
	                    // whether this function was called and use that to keep it from
	                    // starting the main loop multiple times.
	                    started = true;

	                    // In the main loop, draw() is called after update(), so if we
	                    // entered the main loop immediately, we would never render the
	                    // initial state before any updates occur. Instead, we run one
	                    // frame where all we do is draw, and then start the main loop with
	                    // the next frame.
	                    rafHandle = requestAnimationFrame(function (timestamp) {
	                        // Render the initial state before any updates occur.
	                        draw(1);

	                        // The application isn't considered "running" until the
	                        // application starts drawing.
	                        running = true;

	                        // Reset variables that are used for tracking time so that we
	                        // don't simulate time passed while the application was paused.
	                        lastFrameTimeMs = timestamp;
	                        lastFpsUpdate = timestamp;
	                        framesThisSecond = 0;

	                        // Start the main loop.
	                        rafHandle = requestAnimationFrame(animate);
	                    });
	                }
	                return this;
	            },

	            /**
	             * Stops the main loop.
	             *
	             * Event handling and other background tasks should also be paused when the
	             * main loop is paused.
	             *
	             * Note that pausing in multiplayer/multi-user applications will cause the
	             * player's/user's client to become out of sync. In this case the
	             * simulation should exit, or the player/user needs to be snapped to their
	             * updated position when the main loop is started again.
	             *
	             * See also `MainLoop.start()` and `MainLoop.isRunning()`.
	             */
	            stop: function stop() {
	                running = false;
	                started = false;
	                cancelAnimationFrame(rafHandle);
	                return this;
	            },

	            /**
	             * Returns whether the main loop is currently running.
	             *
	             * See also `MainLoop.start()` and `MainLoop.stop()`.
	             *
	             * @return {Boolean}
	             *   Whether the main loop is currently running.
	             */
	            isRunning: function isRunning() {
	                return running;
	            }
	        };

	        /**
	         * The main loop that runs updates and rendering.
	         *
	         * @param {DOMHighResTimeStamp} timestamp
	         *   The current timestamp. In practice this is supplied by
	         *   requestAnimationFrame at the time that it starts to fire callbacks. This
	         *   should only be used for comparison to other timestamps because the epoch
	         *   (i.e. the "zero" time) depends on the engine running this code. In engines
	         *   that support `DOMHighResTimeStamp` (all modern browsers except iOS Safari
	         *   8) the epoch is the time the page started loading, specifically
	         *   `performance.timing.navigationStart`. Everywhere else, including node.js,
	         *   the epoch is the Unix epoch (1970-01-01T00:00:00Z).
	         *
	         * @ignore
	         */
	        function animate(timestamp) {
	            // Throttle the frame rate (if minFrameDelay is set to a non-zero value by
	            // `MainLoop.setMaxAllowedFPS()`).
	            if (timestamp < lastFrameTimeMs + minFrameDelay) {
	                // Run the loop again the next time the browser is ready to render.
	                rafHandle = requestAnimationFrame(animate);
	                return;
	            }

	            // frameDelta is the cumulative amount of in-app time that hasn't been
	            // simulated yet. Add the time since the last frame. We need to track total
	            // not-yet-simulated time (as opposed to just the time elapsed since the
	            // last frame) because not all actually elapsed time is guaranteed to be
	            // simulated each frame. See the comments below for details.
	            frameDelta += timestamp - lastFrameTimeMs;
	            lastFrameTimeMs = timestamp;

	            // Run any updates that are not dependent on time in the simulation. See
	            // `MainLoop.setBegin()` for additional details on how to use this.
	            begin(timestamp, frameDelta);

	            // Update the estimate of the frame rate, `fps`. Every second, the number
	            // of frames that occurred in that second are included in an exponential
	            // moving average of all frames per second, with an alpha of 0.25. This
	            // means that more recent seconds affect the estimated frame rate more than
	            // older seconds.
	            if (timestamp > lastFpsUpdate + 1000) {
	                // Compute the new exponential moving average with an alpha of 0.25.
	                // Using constants inline is okay here.
	                fps = 0.25 * framesThisSecond + 0.75 * fps;

	                lastFpsUpdate = timestamp;
	                framesThisSecond = 0;
	            }
	            framesThisSecond++;

	            /*
	             * A naive way to move an object along its X-axis might be to write a main
	             * loop containing the statement `obj.x += 10;` which would move the object
	             * 10 units per frame. This approach suffers from the issue that it is
	             * dependent on the frame rate. In other words, if your application is
	             * running slowly (that is, fewer frames per second), your object will also
	             * appear to move slowly, whereas if your application is running quickly
	             * (that is, more frames per second), your object will appear to move
	             * quickly. This is undesirable, especially in multiplayer/multi-user
	             * applications.
	             *
	             * One solution is to multiply the speed by the amount of time that has
	             * passed between rendering frames. For example, if you want your object to
	             * move 600 units per second, you might write `obj.x += 600 * delta`, where
	             * `delta` is the time passed since the last frame. (For convenience, let's
	             * move this statement to an update() function that takes `delta` as a
	             * parameter.) This way, your object will move a constant distance over
	             * time. However, at low frame rates and high speeds, your object will move
	             * large distances every frame, which can cause it to do strange things
	             * such as move through walls. Additionally, we would like our program to
	             * be deterministic. That is, every time we run the application with the
	             * same input, we would like exactly the same output. If the time between
	             * frames (the `delta`) varies, our output will diverge the longer the
	             * program runs due to accumulated rounding errors, even at normal frame
	             * rates.
	             *
	             * A better solution is to separate the amount of time simulated in each
	             * update() from the amount of time between frames. Our update() function
	             * doesn't need to change; we just need to change the delta we pass to it
	             * so that each update() simulates a fixed amount of time (that is, `delta`
	             * should have the same value each time update() is called). The update()
	             * function can be run multiple times per frame if needed to simulate the
	             * total amount of time passed since the last frame. (If the time that has
	             * passed since the last frame is less than the fixed simulation time, we
	             * just won't run an update() until the the next frame. If there is
	             * unsimulated time left over that is less than our timestep, we'll just
	             * leave it to be simulated during the next frame.) This approach avoids
	             * inconsistent rounding errors and ensures that there are no giant leaps
	             * through walls between frames.
	             *
	             * That is what is done below. It introduces a new problem, but it is a
	             * manageable one: if the amount of time spent simulating is consistently
	             * longer than the amount of time between frames, the application could
	             * freeze and crash in a spiral of death. This won't happen as long as the
	             * fixed simulation time is set to a value that is high enough that
	             * update() calls usually take less time than the amount of time they're
	             * simulating. If it does start to happen anyway, see `MainLoop.setEnd()`
	             * for a discussion of ways to stop it.
	             *
	             * Additionally, see `MainLoop.setUpdate()` for a discussion of performance
	             * considerations.
	             *
	             * Further reading for those interested:
	             *
	             * - http://gameprogrammingpatterns.com/game-loop.html
	             * - http://gafferongames.com/game-physics/fix-your-timestep/
	             * - https://gamealchemist.wordpress.com/2013/03/16/thoughts-on-the-javascript-game-loop/
	             * - https://developer.mozilla.org/en-US/docs/Games/Anatomy
	             */
	            numUpdateSteps = 0;
	            while (frameDelta >= simulationTimestep) {
	                update(simulationTimestep);
	                frameDelta -= simulationTimestep;

	                /*
	                 * Sanity check: bail if we run the loop too many times.
	                 *
	                 * One way this could happen is if update() takes longer to run than
	                 * the time it simulates, thereby causing a spiral of death. For ways
	                 * to avoid this, see `MainLoop.setEnd()`. Another way this could
	                 * happen is if the browser throttles serving frames, which typically
	                 * occurs when the tab is in the background or the device battery is
	                 * low. An event outside of the main loop such as audio processing or
	                 * synchronous resource reads could also cause the application to hang
	                 * temporarily and accumulate not-yet-simulated time as a result.
	                 *
	                 * 240 is chosen because, for any sane value of simulationTimestep, 240
	                 * updates will simulate at least one second, and it will simulate four
	                 * seconds with the default value of simulationTimestep. (Safari
	                 * notifies users that the script is taking too long to run if it takes
	                 * more than five seconds.)
	                 *
	                 * If there are more updates to run in a frame than this, the
	                 * application will appear to slow down to the user until it catches
	                 * back up. In networked applications this will usually cause the user
	                 * to get out of sync with their peers, but if the updates are taking
	                 * this long already, they're probably already out of sync.
	                 */
	                if (++numUpdateSteps >= 240) {
	                    panic = true;
	                    break;
	                }
	            }

	            /*
	             * Render the screen. We do this regardless of whether update() has run
	             * during this frame because it is possible to interpolate between updates
	             * to make the frame rate appear faster than updates are actually
	             * happening. See `MainLoop.setDraw()` for an explanation of how to do
	             * that.
	             *
	             * We draw after updating because we want the screen to reflect a state of
	             * the application that is as up-to-date as possible. (`MainLoop.start()`
	             * draws the very first frame in the application's initial state, before
	             * any updates have occurred.) Some sources speculate that rendering
	             * earlier in the requestAnimationFrame callback can get the screen painted
	             * faster; this is mostly not true, and even when it is, it's usually just
	             * a trade-off between rendering the current frame sooner and rendering the
	             * next frame later.
	             *
	             * See `MainLoop.setDraw()` for details about draw() itself.
	             */
	            draw(frameDelta / simulationTimestep);

	            // Run any updates that are not dependent on time in the simulation. See
	            // `MainLoop.setEnd()` for additional details on how to use this.
	            end(fps, panic);

	            panic = false;

	            // Run the loop again the next time the browser is ready to render.
	            rafHandle = requestAnimationFrame(animate);
	        }

	        // AMD support
	        if (typeof define === 'function' && define.amd) {
	            define(root.MainLoop);
	        }
	        // CommonJS support
	        else if ((typeof exports === 'undefined' ? 'undefined' : babelHelpers.typeof(exports)) === 'object') {
	                module.exports = root.MainLoop;
	            }
	    })();
	    return module.exports;
	})({ exports: {} }, __commonjs_global);

	var MainLoopLoopManager = (function () {
	    function MainLoopLoopManager() {
	        babelHelpers.classCallCheck(this, MainLoopLoopManager);
	    }

	    babelHelpers.createClass(MainLoopLoopManager, [{
	        key: 'setUpdate',
	        value: function setUpdate(updateMethod) {
	            mainloop.setUpdate(updateMethod);

	            return this;
	        }
	    }, {
	        key: 'setRender',
	        value: function setRender(renderMethod) {
	            mainloop.setDraw(renderMethod);

	            return this;
	        }
	    }, {
	        key: 'start',
	        value: function start() {
	            mainloop.start();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2ctMTAway5qcyIsInNvdXJjZXMiOlsiLi4vL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9zcmMvbG9naWMvdGhyZWUtcmVuZGVyZXItbWFuYWdlci5qcyIsIi4uLy9ob21lL3VidW50dS93b3Jrc3BhY2Uvc3JjL2xvZ2ljL3RocmVlLXNjZW5lLW1hbmFnZXIuanMiLCIuLi8vaG9tZS91YnVudHUvd29ya3NwYWNlL3NyYy9sb2dpYy90aHJlZS1tZXNoLW1hbmFnZXIuanMiLCIuLi8vaG9tZS91YnVudHUvd29ya3NwYWNlL3NyYy9sb2dpYy90aHJlZS1vYmplY3QtbWVzaC1sb2FkZXIuanMiLCIuLi8vaG9tZS91YnVudHUvd29ya3NwYWNlL25vZGVfbW9kdWxlcy9qcXVlcnktcGFyYW0vanF1ZXJ5LXBhcmFtLmpzIiwiLi4vL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9ub2RlX21vZHVsZXMvcGlua3lzd2Vhci9waW5reXN3ZWFyLmpzIiwiLi4vL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9ub2RlX21vZHVsZXMvcXdlc3Qvc3JjL3F3ZXN0LmpzIiwiLi4vL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9zcmMvbG9naWMvcXdlc3QtYWpheC1sb2FkZXIuanMiLCIuLi8vaG9tZS91YnVudHUvd29ya3NwYWNlL3NyYy9sb2dpYy9sZXZlbC1sb2FkZXIuanMiLCIuLi8vaG9tZS91YnVudHUvd29ya3NwYWNlL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9zeXN0ZW0uanMiLCIuLi8vaG9tZS91YnVudHUvd29ya3NwYWNlL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9jb21wb25lbnQuanMiLCIuLi8vaG9tZS91YnVudHUvd29ya3NwYWNlL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9lbnRpdHkuanMiLCIuLi8vaG9tZS91YnVudHUvd29ya3NwYWNlL25vZGVfbW9kdWxlcy9nZy1lbnRpdGllcy9zcmMvY29yZS9ldmVudC5qcyIsIi4uLy9ob21lL3VidW50dS93b3Jrc3BhY2Uvc3JjL2V4dGVybmFsL21haW5sb29wLmpzIiwiLi4vL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9zcmMvbG9naWMvbWFpbmxvb3AtbG9vcC1tYW5hZ2VyLmpzIiwiLi4vL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9zcmMvdXRpbGl0eS9kZXBlbmRlbmN5LWluamVjdG9yLmpzIiwiLi4vL2hvbWUvdWJ1bnR1L3dvcmtzcGFjZS9zcmMvY29uc3RhbnRzL3NoYWRpbmcuanMiLCIuLi8vaG9tZS91YnVudHUvd29ya3NwYWNlL3NyYy9nZy0xMDBrLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIEBmbG93ICovXG5cbmltcG9ydCB0aHJlZSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRocmVlUmVuZGVyZXJNYW5hZ2VyIHtcbiAgICByZW5kZXJlciAgICAgOiB0aHJlZS5XZWJHTFJlbmRlcmVyO1xuICAgIGNhbWVyYSAgICAgICA6IHRocmVlLkNhbWVyYTtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyB0aHJlZS5XZWJHTFJlbmRlcmVyKCk7XG4gICAgICAgIHRoaXMuY2FtZXJhICAgPSBuZXcgdGhyZWUuUGVyc3BlY3RpdmVDYW1lcmEoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJlci5kb21FbGVtZW50KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnkgPSAyMDtcbiAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueiA9IDIwO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jYW1lcmEubG9va0F0KG5ldyB0aHJlZS5WZWN0b3IzKDAuMCwgMC4wLCAwLjApKTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyKHNjZW5lIDogdGhyZWUuU2NlbmUsIGludGVycG9sYXRpb25QZXJjZW50YWdlIDogbnVtYmVyKSA6IHZvaWQge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcihzY2VuZSwgdGhpcy5jYW1lcmEpO1xuICAgIH1cbn1cbiIsIi8qIEBmbG93ICovXG5cbmltcG9ydCB0aHJlZSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRocmVlU2NlbmVNYW5hZ2VyIHtcbiAgICBzY2VuZXMgOiBBcnJheTx0aHJlZS5TY2VuZT47XG4gICAgXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc2NlbmVzID0gW107XG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZVNjZW5lKCkgOiBudW1iZXIge1xuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgc2NlbmUsIGFkZCBpdCB0byB0aGUgbGlzdCBvZiBzY2VuZXMgYW5kIHJldHVybiBhIGhhbmRsZSAoaWQpIHRvIGl0XG4gICAgICAgIHJldHVybiB0aGlzLnNjZW5lcy5wdXNoKG5ldyB0aHJlZS5TY2VuZSgpKSAtIDE7XG4gICAgfVxuICAgIFxuICAgIGdldFNjZW5lKHNjZW5lSWQgOiBudW1iZXIpIDogdGhyZWUuU2NlbmUge1xuICAgICAgICByZXR1cm4gdGhpcy5zY2VuZXNbc2NlbmVJZF07XG4gICAgfVxuICAgIFxuICAgIGFkZFRvU2NlbmUoc2NlbmVJZCA6IG51bWJlciwgb2JqZWN0IDogdGhyZWUuT2JqZWN0M0QpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuc2NlbmVzW3NjZW5lSWRdLmFkZChvYmplY3QpO1xuICAgIH1cbiAgICBcbiAgICBhZGRBbWJpZW50TGlnaHRUb1NjZW5lKHNjZW5lSWQgOiBudW1iZXIsIGNvbG9yIDogbnVtYmVyKSA6IHZvaWQge1xuICAgICAgICB0aGlzLnNjZW5lc1tzY2VuZUlkXS5hZGQobmV3IHRocmVlLkFtYmllbnRMaWdodChjb2xvcikpO1xuICAgIH1cbiAgICBcbiAgICBhZGREaXJlY3Rpb25hbExpZ2h0VG9TY2VuZShzY2VuZUlkIDogbnVtYmVyLCBjb2xvciA6IG51bWJlciwgeCA6IG51bWJlciwgeSA6IG51bWJlciwgeiA6IG51bWJlcikgOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbGlnaHQgPSBuZXcgdGhyZWUuRGlyZWN0aW9uYWxMaWdodChjb2xvcik7XG5cdCAgICBsaWdodC5wb3NpdGlvbi5zZXQoeCwgeSwgeik7XG5cdFxuICAgICAgICB0aGlzLnNjZW5lc1tzY2VuZUlkXS5hZGQobGlnaHQpO1xuICAgIH1cbiAgICBcbiAgICByZW1vdmVGcm9tU2NlbmUoc2NlbmVJZCA6IG51bWJlciwgb2JqZWN0IDogdGhyZWUuT2JqZWN0M0QpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuc2NlbmVzW3NjZW5lSWRdLnJlbW92ZShvYmplY3QpO1xuICAgIH1cbn0iLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgdGhyZWUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaHJlZU1lc2hNYW5hZ2VyIHtcbiAgICBtZXNoZXMgOiBBcnJheTx0aHJlZS5NZXNoPjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5tZXNoZXMgPSBbXTtcbiAgICB9XG4gICAgXG4gICAgYWRkTWVzaChvYmplY3QgOiB0aHJlZS5NZXNoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lc2hlcy5wdXNoKG9iamVjdCkgLSAxO1xuICAgIH1cbiAgICBcbiAgICBnZXRNZXNoKG1lc2hJZCA6IG51bWJlcikgOiB0aHJlZS5NZXNoIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzaGVzW21lc2hJZF07XG4gICAgfVxufSIsIi8qIEBmbG93ICovXG5cbmltcG9ydCB0aHJlZSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRocmVlT2JqZWN0TWVzaExvYWRlciB7XG4gICAgbG9hZGVyICA6IHRocmVlLk9iamVjdExvYWRlcjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5sb2FkZXIgID0gbmV3IHRocmVlLk9iamVjdExvYWRlcigpO1xuICAgIH1cbiAgICBcbiAgICBvblByb2dyZXNzKCkge1xuICAgICAgICAvLyBwbGFjZWhvbGRlclxuICAgIH1cbiAgICBcbiAgICAvLyB0b2RvIHRoaXMgbm93IHJldHVybnMgYSBzY2VuZS4uIGltcGxpY2F0aW9ucz9cbiAgICAvLyB0b2RvIGFkZCBvcHRpb25zIGFzIGEgZGVzdHJ1Y3RhYmxlIG9iamVjdCAtPiBzdG9wcGVkIGJ5IGZsb3c6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9mbG93L2lzc3Vlcy8xODNcbiAgICBsb2FkKHBhdGggOiBzdHJpbmcsIG9wdGlvbnM/IDogT2JqZWN0KSA6IFByb21pc2Uge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNoYWRpbmcgPSAob3B0aW9ucyB8fCB7IH0pLnNoYWRpbmc7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBzZWxmLmxvYWRlci5sb2FkKHBhdGgsIG9iaiA9PiByZXNvbHZlKG9iaiksIGluZm8gPT4gc2VsZi5vblByb2dyZXNzKGluZm8pLCBlcnIgPT4gcmVqZWN0KGVycikpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKG1lc2ggPT4ge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzaGFkaW5nICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXNoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBtZXNoLnRyYXZlcnNlKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiB0aHJlZS5NZXNoKSB7XG4gICAgICAgICAgICAgICAgICAgY2hpbGQubWF0ZXJpYWwuc2hhZGluZyA9IHNoYWRpbmc7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIG1lc2g7XG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSIsIi8qKlxuICogQHByZXNlcnZlIGpxdWVyeS1wYXJhbSAoYykgMjAxNSBLTk9XTEVER0VDT0RFIHwgTUlUXG4gKi9cbi8qZ2xvYmFsIGRlZmluZSAqL1xuKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgcGFyYW0gPSBmdW5jdGlvbiAoYSkge1xuICAgICAgICB2YXIgYWRkID0gZnVuY3Rpb24gKHMsIGssIHYpIHtcbiAgICAgICAgICAgIHYgPSB0eXBlb2YgdiA9PT0gJ2Z1bmN0aW9uJyA/IHYoKSA6IHYgPT09IG51bGwgPyAnJyA6IHYgPT09IHVuZGVmaW5lZCA/ICcnIDogdjtcbiAgICAgICAgICAgIHNbcy5sZW5ndGhdID0gZW5jb2RlVVJJQ29tcG9uZW50KGspICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHYpO1xuICAgICAgICB9LCBidWlsZFBhcmFtcyA9IGZ1bmN0aW9uIChwcmVmaXgsIG9iaiwgcykge1xuICAgICAgICAgICAgdmFyIGksIGxlbiwga2V5O1xuXG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBvYmoubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQYXJhbXMocHJlZml4ICsgJ1snICsgKHR5cGVvZiBvYmpbaV0gPT09ICdvYmplY3QnID8gaSA6ICcnKSArICddJywgb2JqW2ldLCBzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9iaiAmJiBvYmoudG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJlZml4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRQYXJhbXMocHJlZml4ICsgJ1snICsga2V5ICsgJ10nLCBvYmpba2V5XSwgcywgYWRkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRQYXJhbXMoa2V5LCBvYmpba2V5XSwgcywgYWRkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJlZml4KSB7XG4gICAgICAgICAgICAgICAgYWRkKHMsIHByZWZpeCwgb2JqKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZChzLCBrZXksIG9ialtrZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGJ1aWxkUGFyYW1zKCcnLCBhLCBbXSkuam9pbignJicpLnJlcGxhY2UoLyUyMC9nLCAnKycpO1xuICAgIH07XG5cbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHBhcmFtO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmFtO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBnbG9iYWwucGFyYW0gPSBwYXJhbTtcbiAgICB9XG5cbn0odGhpcykpO1xuIiwiLypcbiAqIFBpbmt5U3dlYXIuanMgMi4yLjIgLSBNaW5pbWFsaXN0aWMgaW1wbGVtZW50YXRpb24gb2YgdGhlIFByb21pc2VzL0ErIHNwZWNcbiAqIFxuICogUHVibGljIERvbWFpbi4gVXNlLCBtb2RpZnkgYW5kIGRpc3RyaWJ1dGUgaXQgYW55IHdheSB5b3UgbGlrZS4gTm8gYXR0cmlidXRpb24gcmVxdWlyZWQuXG4gKlxuICogTk8gV0FSUkFOVFkgRVhQUkVTU0VEIE9SIElNUExJRUQuIFVTRSBBVCBZT1VSIE9XTiBSSVNLLlxuICpcbiAqIFBpbmt5U3dlYXIgaXMgYSB2ZXJ5IHNtYWxsIGltcGxlbWVudGF0aW9uIG9mIHRoZSBQcm9taXNlcy9BKyBzcGVjaWZpY2F0aW9uLiBBZnRlciBjb21waWxhdGlvbiB3aXRoIHRoZVxuICogR29vZ2xlIENsb3N1cmUgQ29tcGlsZXIgYW5kIGd6aXBwaW5nIGl0IHdlaWdocyBsZXNzIHRoYW4gNTAwIGJ5dGVzLiBJdCBpcyBiYXNlZCBvbiB0aGUgaW1wbGVtZW50YXRpb24gZm9yIFxuICogTWluaWZpZWQuanMgYW5kIHNob3VsZCBiZSBwZXJmZWN0IGZvciBlbWJlZGRpbmcuIFxuICpcbiAqXG4gKiBQaW5reVN3ZWFyIGhhcyBqdXN0IHRocmVlIGZ1bmN0aW9ucy5cbiAqXG4gKiBUbyBjcmVhdGUgYSBuZXcgcHJvbWlzZSBpbiBwZW5kaW5nIHN0YXRlLCBjYWxsIHBpbmt5U3dlYXIoKTpcbiAqICAgICAgICAgdmFyIHByb21pc2UgPSBwaW5reVN3ZWFyKCk7XG4gKlxuICogVGhlIHJldHVybmVkIG9iamVjdCBoYXMgYSBQcm9taXNlcy9BKyBjb21wYXRpYmxlIHRoZW4oKSBpbXBsZW1lbnRhdGlvbjpcbiAqICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSkgeyBhbGVydChcIlN1Y2Nlc3MhXCIpOyB9LCBmdW5jdGlvbih2YWx1ZSkgeyBhbGVydChcIkZhaWx1cmUhXCIpOyB9KTtcbiAqXG4gKlxuICogVGhlIHByb21pc2UgcmV0dXJuZWQgYnkgcGlua3lTd2VhcigpIGlzIGEgZnVuY3Rpb24uIFRvIGZ1bGZpbGwgdGhlIHByb21pc2UsIGNhbGwgdGhlIGZ1bmN0aW9uIHdpdGggdHJ1ZSBhcyBmaXJzdCBhcmd1bWVudCBhbmRcbiAqIGFuIG9wdGlvbmFsIGFycmF5IG9mIHZhbHVlcyB0byBwYXNzIHRvIHRoZSB0aGVuKCkgaGFuZGxlci4gQnkgcHV0dGluZyBtb3JlIHRoYW4gb25lIHZhbHVlIGluIHRoZSBhcnJheSwgeW91IGNhbiBwYXNzIG1vcmUgdGhhbiBvbmVcbiAqIHZhbHVlIHRvIHRoZSB0aGVuKCkgaGFuZGxlcnMuIEhlcmUgYW4gZXhhbXBsZSB0byBmdWxmaWxsIGEgcHJvbXNpc2UsIHRoaXMgdGltZSB3aXRoIG9ubHkgb25lIGFyZ3VtZW50OiBcbiAqICAgICAgICAgcHJvbWlzZSh0cnVlLCBbNDJdKTtcbiAqXG4gKiBXaGVuIHRoZSBwcm9taXNlIGhhcyBiZWVuIHJlamVjdGVkLCBjYWxsIGl0IHdpdGggZmFsc2UuIEFnYWluLCB0aGVyZSBtYXkgYmUgbW9yZSB0aGFuIG9uZSBhcmd1bWVudCBmb3IgdGhlIHRoZW4oKSBoYW5kbGVyOlxuICogICAgICAgICBwcm9taXNlKHRydWUsIFs2LCA2LCA2XSk7XG4gKiAgICAgICAgIFxuICogWW91IGNhbiBvYnRhaW4gdGhlIHByb21pc2UncyBjdXJyZW50IHN0YXRlIGJ5IGNhbGxpbmcgdGhlIGZ1bmN0aW9uIHdpdGhvdXQgYXJndW1lbnRzLiBJdCB3aWxsIGJlIHRydWUgaWYgZnVsZmlsbGVkLFxuICogZmFsc2UgaWYgcmVqZWN0ZWQsIGFuZCBvdGhlcndpc2UgdW5kZWZpbmVkLlxuICogXHRcdCAgIHZhciBzdGF0ZSA9IHByb21pc2UoKTsgXG4gKiBcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90aW1qYW5zZW4vUGlua3lTd2Vhci5qc1xuICovXG4oZnVuY3Rpb24odGFyZ2V0KSB7XG5cdHZhciB1bmRlZjtcblxuXHRmdW5jdGlvbiBpc0Z1bmN0aW9uKGYpIHtcblx0XHRyZXR1cm4gdHlwZW9mIGYgPT0gJ2Z1bmN0aW9uJztcblx0fVxuXHRmdW5jdGlvbiBpc09iamVjdChmKSB7XG5cdFx0cmV0dXJuIHR5cGVvZiBmID09ICdvYmplY3QnO1xuXHR9XG5cdGZ1bmN0aW9uIGRlZmVyKGNhbGxiYWNrKSB7XG5cdFx0aWYgKHR5cGVvZiBzZXRJbW1lZGlhdGUgIT0gJ3VuZGVmaW5lZCcpXG5cdFx0XHRzZXRJbW1lZGlhdGUoY2FsbGJhY2spO1xuXHRcdGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9ICd1bmRlZmluZWQnICYmIHByb2Nlc3NbJ25leHRUaWNrJ10pXG5cdFx0XHRwcm9jZXNzWyduZXh0VGljayddKGNhbGxiYWNrKTtcblx0XHRlbHNlXG5cdFx0XHRzZXRUaW1lb3V0KGNhbGxiYWNrLCAwKTtcblx0fVxuXG5cdHRhcmdldFswXVt0YXJnZXRbMV1dID0gZnVuY3Rpb24gcGlua3lTd2VhcihleHRlbmQpIHtcblx0XHR2YXIgc3RhdGU7ICAgICAgICAgICAvLyB1bmRlZmluZWQvbnVsbCA9IHBlbmRpbmcsIHRydWUgPSBmdWxmaWxsZWQsIGZhbHNlID0gcmVqZWN0ZWRcblx0XHR2YXIgdmFsdWVzID0gW107ICAgICAvLyBhbiBhcnJheSBvZiB2YWx1ZXMgYXMgYXJndW1lbnRzIGZvciB0aGUgdGhlbigpIGhhbmRsZXJzXG5cdFx0dmFyIGRlZmVycmVkID0gW107ICAgLy8gZnVuY3Rpb25zIHRvIGNhbGwgd2hlbiBzZXQoKSBpcyBpbnZva2VkXG5cblx0XHR2YXIgc2V0ID0gZnVuY3Rpb24obmV3U3RhdGUsIG5ld1ZhbHVlcykge1xuXHRcdFx0aWYgKHN0YXRlID09IG51bGwgJiYgbmV3U3RhdGUgIT0gbnVsbCkge1xuXHRcdFx0XHRzdGF0ZSA9IG5ld1N0YXRlO1xuXHRcdFx0XHR2YWx1ZXMgPSBuZXdWYWx1ZXM7XG5cdFx0XHRcdGlmIChkZWZlcnJlZC5sZW5ndGgpXG5cdFx0XHRcdFx0ZGVmZXIoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKVxuXHRcdFx0XHRcdFx0XHRkZWZlcnJlZFtpXSgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdH07XG5cblx0XHRzZXRbJ3RoZW4nXSA9IGZ1bmN0aW9uIChvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuXHRcdFx0dmFyIHByb21pc2UyID0gcGlua3lTd2VhcihleHRlbmQpO1xuXHRcdFx0dmFyIGNhbGxDYWxsYmFja3MgPSBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHR0cnkge1xuXHQgICAgXHRcdFx0dmFyIGYgPSAoc3RhdGUgPyBvbkZ1bGZpbGxlZCA6IG9uUmVqZWN0ZWQpO1xuXHQgICAgXHRcdFx0aWYgKGlzRnVuY3Rpb24oZikpIHtcblx0XHQgICBcdFx0XHRcdGZ1bmN0aW9uIHJlc29sdmUoeCkge1xuXHRcdFx0XHRcdFx0ICAgIHZhciB0aGVuLCBjYkNhbGxlZCA9IDA7XG5cdFx0ICAgXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdCAgIFx0XHRcdFx0aWYgKHggJiYgKGlzT2JqZWN0KHgpIHx8IGlzRnVuY3Rpb24oeCkpICYmIGlzRnVuY3Rpb24odGhlbiA9IHhbJ3RoZW4nXSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKHggPT09IHByb21pc2UyKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhlblsnY2FsbCddKHgsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZnVuY3Rpb24oKSB7IGlmICghY2JDYWxsZWQrKykgcmVzb2x2ZS5hcHBseSh1bmRlZixhcmd1bWVudHMpOyB9ICxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmdW5jdGlvbih2YWx1ZSl7IGlmICghY2JDYWxsZWQrKykgcHJvbWlzZTIoZmFsc2UsW3ZhbHVlXSk7fSk7XG5cdFx0XHRcdCAgIFx0XHRcdFx0fVxuXHRcdFx0XHQgICBcdFx0XHRcdGVsc2Vcblx0XHRcdFx0ICAgXHRcdFx0XHRcdHByb21pc2UyKHRydWUsIGFyZ3VtZW50cyk7XG5cdFx0ICAgXHRcdFx0XHRcdH1cblx0XHQgICBcdFx0XHRcdFx0Y2F0Y2goZSkge1xuXHRcdCAgIFx0XHRcdFx0XHRcdGlmICghY2JDYWxsZWQrKylcblx0XHQgICBcdFx0XHRcdFx0XHRcdHByb21pc2UyKGZhbHNlLCBbZV0pO1xuXHRcdCAgIFx0XHRcdFx0XHR9XG5cdFx0ICAgXHRcdFx0XHR9XG5cdFx0ICAgXHRcdFx0XHRyZXNvbHZlKGYuYXBwbHkodW5kZWYsIHZhbHVlcyB8fCBbXSkpO1xuXHRcdCAgIFx0XHRcdH1cblx0XHQgICBcdFx0XHRlbHNlXG5cdFx0ICAgXHRcdFx0XHRwcm9taXNlMihzdGF0ZSwgdmFsdWVzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaCAoZSkge1xuXHRcdFx0XHRcdHByb21pc2UyKGZhbHNlLCBbZV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0aWYgKHN0YXRlICE9IG51bGwpXG5cdFx0XHRcdGRlZmVyKGNhbGxDYWxsYmFja3MpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRkZWZlcnJlZC5wdXNoKGNhbGxDYWxsYmFja3MpO1xuXHRcdFx0cmV0dXJuIHByb21pc2UyO1xuXHRcdH07XG4gICAgICAgIGlmKGV4dGVuZCl7XG4gICAgICAgICAgICBzZXQgPSBleHRlbmQoc2V0KTtcbiAgICAgICAgfVxuXHRcdHJldHVybiBzZXQ7XG5cdH07XG59KSh0eXBlb2YgbW9kdWxlID09ICd1bmRlZmluZWQnID8gW3dpbmRvdywgJ3Bpbmt5U3dlYXInXSA6IFttb2R1bGUsICdleHBvcnRzJ10pO1xuXG4iLCIvKiEgcXdlc3QgMi4yLjMgKGh0dHBzOi8vZ2l0aHViLmNvbS9weXJzbWsvcXdlc3QpICovXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cclxuXHR2YXIgZ2xvYmFsID0gd2luZG93IHx8IHRoaXMsXHJcblx0XHRwaW5reXN3ZWFyID0gcmVxdWlyZSgncGlua3lzd2VhcicpLFxyXG5cdFx0anBhcmFtID0gcmVxdWlyZSgnanF1ZXJ5LXBhcmFtJyksXHJcblx0XHQvLyBEZWZhdWx0IHJlc3BvbnNlIHR5cGUgZm9yIFhEUiBpbiBhdXRvIG1vZGVcclxuXHRcdGRlZmF1bHRYZHJSZXNwb25zZVR5cGUgPSAnanNvbicsXHJcblx0XHQvLyBEZWZhdWx0IGRhdGEgdHlwZVxyXG5cdFx0ZGVmYXVsdERhdGFUeXBlID0gJ3Bvc3QnLFxyXG5cdFx0Ly8gVmFyaWFibGVzIGZvciBsaW1pdCBtZWNoYW5pc21cclxuXHRcdGxpbWl0ID0gbnVsbCxcclxuXHRcdHJlcXVlc3RzID0gMCxcclxuXHRcdHJlcXVlc3Rfc3RhY2sgPSBbXSxcclxuXHRcdC8vIEdldCBYTUxIdHRwUmVxdWVzdCBvYmplY3RcclxuXHRcdGdldFhIUiA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcdHJldHVybiBnbG9iYWwuWE1MSHR0cFJlcXVlc3Q/XHJcblx0XHRcdFx0XHRuZXcgZ2xvYmFsLlhNTEh0dHBSZXF1ZXN0KCk6XHJcblx0XHRcdFx0XHRuZXcgQWN0aXZlWE9iamVjdCgnTWljcm9zb2Z0LlhNTEhUVFAnKTtcclxuXHRcdH0sXHJcblx0XHQvLyBHdWVzcyBYSFIgdmVyc2lvblxyXG5cdFx0eGhyMiA9IChnZXRYSFIoKS5yZXNwb25zZVR5cGU9PT0nJyksXHJcblxyXG5cdC8vIENvcmUgZnVuY3Rpb25cclxuXHRxd2VzdCA9IGZ1bmN0aW9uKG1ldGhvZCwgdXJsLCBkYXRhLCBvcHRpb25zLCBiZWZvcmUpIHtcclxuXHJcblx0XHQvLyBGb3JtYXRcclxuXHRcdG1ldGhvZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpO1xyXG5cdFx0ZGF0YSA9IGRhdGEgfHwgbnVsbDtcclxuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuXHRcdC8vIERlZmluZSB2YXJpYWJsZXNcclxuXHRcdHZhciBuYXRpdmVSZXNwb25zZVBhcnNpbmcgPSBmYWxzZSxcclxuXHRcdFx0Y3Jvc3NPcmlnaW4sXHJcblx0XHRcdHhocixcclxuXHRcdFx0eGRyID0gZmFsc2UsXHJcblx0XHRcdHRpbWVvdXRJbnRlcnZhbCxcclxuXHRcdFx0YWJvcnRlZCA9IGZhbHNlLFxyXG5cdFx0XHRhdHRlbXB0cyA9IDAsXHJcblx0XHRcdGhlYWRlcnMgPSB7fSxcclxuXHRcdFx0bWltZVR5cGVzID0ge1xyXG5cdFx0XHRcdHRleHQ6ICcqLyonLFxyXG5cdFx0XHRcdHhtbDogJ3RleHQveG1sJyxcclxuXHRcdFx0XHRqc29uOiAnYXBwbGljYXRpb24vanNvbicsXHJcblx0XHRcdFx0cG9zdDogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcclxuXHRcdFx0fSxcclxuXHRcdFx0YWNjZXB0ID0ge1xyXG5cdFx0XHRcdHRleHQ6ICcqLyonLFxyXG5cdFx0XHRcdHhtbDogJ2FwcGxpY2F0aW9uL3htbDsgcT0xLjAsIHRleHQveG1sOyBxPTAuOCwgKi8qOyBxPTAuMScsXHJcblx0XHRcdFx0anNvbjogJ2FwcGxpY2F0aW9uL2pzb247IHE9MS4wLCB0ZXh0Lyo7IHE9MC44LCAqLyo7IHE9MC4xJ1xyXG5cdFx0XHR9LFxyXG5cdFx0XHR2YXJzID0gJycsXHJcblx0XHRcdGksIGosXHJcblx0XHRcdHNlcmlhbGl6ZWQsXHJcblx0XHRcdHJlc3BvbnNlLFxyXG5cdFx0XHRzZW5kaW5nID0gZmFsc2UsXHJcblx0XHRcdGRlbGF5ZWQgPSBmYWxzZSxcclxuXHRcdFx0dGltZW91dF9zdGFydCxcclxuXHJcblx0XHQvLyBDcmVhdGUgdGhlIHByb21pc2VcclxuXHRcdHByb21pc2UgPSBwaW5reXN3ZWFyKGZ1bmN0aW9uKHBpbmt5KSB7XHJcblx0XHRcdHBpbmt5WydjYXRjaCddID0gZnVuY3Rpb24oZikge1xyXG5cdFx0XHRcdHJldHVybiBwaW5reS50aGVuKG51bGwsIGYpO1xyXG5cdFx0XHR9O1xyXG5cdFx0XHRwaW5reS5jb21wbGV0ZSA9IGZ1bmN0aW9uKGYpIHtcclxuXHRcdFx0XHRyZXR1cm4gcGlua3kudGhlbihmLCBmKTtcclxuXHRcdFx0fTtcclxuXHRcdFx0Ly8gT3ZlcnJpZGVcclxuXHRcdFx0aWYoJ3Bpbmt5c3dlYXInIGluIG9wdGlvbnMpIHtcclxuXHRcdFx0XHRmb3IoaSBpbiBvcHRpb25zLnBpbmt5c3dlYXIpIHtcclxuXHRcdFx0XHRcdHBpbmt5W2ldID0gb3B0aW9ucy5waW5reXN3ZWFyW2ldO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRwaW5reS5zZW5kID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0Ly8gUHJldmVudCBmdXJ0aGVyIHNlbmQoKSBjYWxsc1xyXG5cdFx0XHRcdGlmKHNlbmRpbmcpIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gUmVhY2hlZCByZXF1ZXN0IGxpbWl0LCBnZXQgb3V0IVxyXG5cdFx0XHRcdGlmKHJlcXVlc3RzID09IGxpbWl0KSB7XHJcblx0XHRcdFx0XHRyZXF1ZXN0X3N0YWNrLnB1c2gocGlua3kpO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQrK3JlcXVlc3RzO1xyXG5cdFx0XHRcdHNlbmRpbmcgPSB0cnVlO1xyXG5cdFx0XHRcdC8vIFN0YXJ0IHRoZSBjaHJvbm9cclxuXHRcdFx0XHR0aW1lb3V0X3N0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblx0XHRcdFx0Ly8gR2V0IFhIUiBvYmplY3RcclxuXHRcdFx0XHR4aHIgPSBnZXRYSFIoKTtcclxuXHRcdFx0XHRpZihjcm9zc09yaWdpbikge1xyXG5cdFx0XHRcdFx0aWYoISgnd2l0aENyZWRlbnRpYWxzJyBpbiB4aHIpICYmIGdsb2JhbC5YRG9tYWluUmVxdWVzdCkge1xyXG5cdFx0XHRcdFx0XHR4aHIgPSBuZXcgWERvbWFpblJlcXVlc3QoKTsgLy8gQ09SUyB3aXRoIElFOC85XHJcblx0XHRcdFx0XHRcdHhkciA9IHRydWU7XHJcblx0XHRcdFx0XHRcdGlmKG1ldGhvZCE9J0dFVCcgJiYgbWV0aG9kIT0nUE9TVCcpIHtcclxuXHRcdFx0XHRcdFx0XHRtZXRob2QgPSAnUE9TVCc7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gT3BlbiBjb25uZWN0aW9uXHJcblx0XHRcdFx0aWYoeGRyKSB7XHJcblx0XHRcdFx0XHR4aHIub3BlbihtZXRob2QsIHVybCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0eGhyLm9wZW4obWV0aG9kLCB1cmwsIG9wdGlvbnMuYXN5bmMsIG9wdGlvbnMudXNlciwgb3B0aW9ucy5wYXNzd29yZCk7XHJcblx0XHRcdFx0XHRpZih4aHIyICYmIG9wdGlvbnMuYXN5bmMpIHtcclxuXHRcdFx0XHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IG9wdGlvbnMud2l0aENyZWRlbnRpYWxzO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBTZXQgaGVhZGVyc1xyXG5cdFx0XHRcdGlmKCF4ZHIpIHtcclxuXHRcdFx0XHRcdGZvcih2YXIgaSBpbiBoZWFkZXJzKSB7XHJcblx0XHRcdFx0XHRcdGlmKGhlYWRlcnNbaV0pIHtcclxuXHRcdFx0XHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcihpLCBoZWFkZXJzW2ldKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBWZXJpZnkgaWYgdGhlIHJlc3BvbnNlIHR5cGUgaXMgc3VwcG9ydGVkIGJ5IHRoZSBjdXJyZW50IGJyb3dzZXJcclxuXHRcdFx0XHRpZih4aHIyICYmIG9wdGlvbnMucmVzcG9uc2VUeXBlIT0nZG9jdW1lbnQnICYmIG9wdGlvbnMucmVzcG9uc2VUeXBlIT0nYXV0bycpIHsgLy8gRG9uJ3QgdmVyaWZ5IGZvciAnZG9jdW1lbnQnIHNpbmNlIHdlJ3JlIHVzaW5nIGFuIGludGVybmFsIHJvdXRpbmVcclxuXHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSBvcHRpb25zLnJlc3BvbnNlVHlwZTtcclxuXHRcdFx0XHRcdFx0bmF0aXZlUmVzcG9uc2VQYXJzaW5nID0gKHhoci5yZXNwb25zZVR5cGU9PW9wdGlvbnMucmVzcG9uc2VUeXBlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNhdGNoKGUpe31cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gUGx1ZyByZXNwb25zZSBoYW5kbGVyXHJcblx0XHRcdFx0aWYoeGhyMiB8fCB4ZHIpIHtcclxuXHRcdFx0XHRcdHhoci5vbmxvYWQgPSBoYW5kbGVSZXNwb25zZTtcclxuXHRcdFx0XHRcdHhoci5vbmVycm9yID0gaGFuZGxlRXJyb3I7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0eGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0XHRpZih4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XHJcblx0XHRcdFx0XHRcdFx0aGFuZGxlUmVzcG9uc2UoKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gT3ZlcnJpZGUgbWltZSB0eXBlIHRvIGVuc3VyZSB0aGUgcmVzcG9uc2UgaXMgd2VsbCBwYXJzZWRcclxuXHRcdFx0XHRpZihvcHRpb25zLnJlc3BvbnNlVHlwZSE9J2F1dG8nICYmICdvdmVycmlkZU1pbWVUeXBlJyBpbiB4aHIpIHtcclxuXHRcdFx0XHRcdHhoci5vdmVycmlkZU1pbWVUeXBlKG1pbWVUeXBlc1tvcHRpb25zLnJlc3BvbnNlVHlwZV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBSdW4gJ2JlZm9yZScgY2FsbGJhY2tcclxuXHRcdFx0XHRpZihiZWZvcmUpIHtcclxuXHRcdFx0XHRcdGJlZm9yZSh4aHIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvLyBTZW5kIHJlcXVlc3RcclxuXHRcdFx0XHRpZih4ZHIpIHtcclxuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1hEb21haW5SZXF1ZXN0XHJcblx0XHRcdFx0XHRcdHhoci5zZW5kKG1ldGhvZCE9J0dFVCc/ZGF0YTpudWxsKTtcclxuXHRcdFx0XHRcdH0sMCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0eGhyLnNlbmQobWV0aG9kIT0nR0VUJz9kYXRhOm51bGwpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHRcdFx0cmV0dXJuIHBpbmt5O1xyXG5cdFx0fSksXHJcblxyXG5cdFx0Ly8gSGFuZGxlIHRoZSByZXNwb25zZVxyXG5cdFx0aGFuZGxlUmVzcG9uc2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0Ly8gUHJlcGFyZVxyXG5cdFx0XHR2YXIgaSwgcmVzcG9uc2VUeXBlO1xyXG5cdFx0XHQtLXJlcXVlc3RzO1xyXG5cdFx0XHRzZW5kaW5nID0gZmFsc2U7XHJcblx0XHRcdC8vIFZlcmlmeSB0aW1lb3V0IHN0YXRlXHJcblx0XHRcdC8vIC0tLSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy83Mjg3NzA2L2llLTktamF2YXNjcmlwdC1lcnJvci1jMDBjMDIzZlxyXG5cdFx0XHRpZihuZXcgRGF0ZSgpLmdldFRpbWUoKS10aW1lb3V0X3N0YXJ0ID49IG9wdGlvbnMudGltZW91dCkge1xyXG5cdFx0XHRcdGlmKCFvcHRpb25zLmF0dGVtcHRzIHx8ICsrYXR0ZW1wdHMhPW9wdGlvbnMuYXR0ZW1wdHMpIHtcclxuXHRcdFx0XHRcdHByb21pc2Uuc2VuZCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdHByb21pc2UoZmFsc2UsIFt4aHIscmVzcG9uc2UsbmV3IEVycm9yKCdUaW1lb3V0ICgnK3VybCsnKScpXSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBMYXVuY2ggbmV4dCBzdGFja2VkIHJlcXVlc3RcclxuXHRcdFx0aWYocmVxdWVzdF9zdGFjay5sZW5ndGgpIHtcclxuXHRcdFx0XHRyZXF1ZXN0X3N0YWNrLnNoaWZ0KCkuc2VuZCgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vIEhhbmRsZSByZXNwb25zZVxyXG5cdFx0XHR0cnl7XHJcblx0XHRcdFx0Ly8gUHJvY2VzcyByZXNwb25zZVxyXG5cdFx0XHRcdGlmKG5hdGl2ZVJlc3BvbnNlUGFyc2luZyAmJiAncmVzcG9uc2UnIGluIHhociAmJiB4aHIucmVzcG9uc2UhPT1udWxsKSB7XHJcblx0XHRcdFx0XHRyZXNwb25zZSA9IHhoci5yZXNwb25zZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZihvcHRpb25zLnJlc3BvbnNlVHlwZSA9PSAnZG9jdW1lbnQnKSB7XHJcblx0XHRcdFx0XHR2YXIgZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcclxuXHRcdFx0XHRcdGZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHRcdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZyYW1lKTtcclxuXHRcdFx0XHRcdGZyYW1lLmNvbnRlbnREb2N1bWVudC5vcGVuKCk7XHJcblx0XHRcdFx0XHRmcmFtZS5jb250ZW50RG9jdW1lbnQud3JpdGUoeGhyLnJlc3BvbnNlKTtcclxuXHRcdFx0XHRcdGZyYW1lLmNvbnRlbnREb2N1bWVudC5jbG9zZSgpO1xyXG5cdFx0XHRcdFx0cmVzcG9uc2UgPSBmcmFtZS5jb250ZW50RG9jdW1lbnQ7XHJcblx0XHRcdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGZyYW1lKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZXtcclxuXHRcdFx0XHRcdC8vIEd1ZXNzIHJlc3BvbnNlIHR5cGVcclxuXHRcdFx0XHRcdHJlc3BvbnNlVHlwZSA9IG9wdGlvbnMucmVzcG9uc2VUeXBlO1xyXG5cdFx0XHRcdFx0aWYocmVzcG9uc2VUeXBlID09ICdhdXRvJykge1xyXG5cdFx0XHRcdFx0XHRpZih4ZHIpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXNwb25zZVR5cGUgPSBkZWZhdWx0WGRyUmVzcG9uc2VUeXBlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHZhciBjdCA9IHhoci5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1UeXBlJykgfHwgJyc7XHJcblx0XHRcdFx0XHRcdFx0aWYoY3QuaW5kZXhPZihtaW1lVHlwZXMuanNvbik+LTEpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlVHlwZSA9ICdqc29uJztcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0ZWxzZSBpZihjdC5pbmRleE9mKG1pbWVUeXBlcy54bWwpPi0xKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZVR5cGUgPSAneG1sJztcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZVR5cGUgPSAndGV4dCc7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQvLyBIYW5kbGUgcmVzcG9uc2UgdHlwZVxyXG5cdFx0XHRcdFx0c3dpdGNoKHJlc3BvbnNlVHlwZSkge1xyXG5cdFx0XHRcdFx0XHRjYXNlICdqc29uJzpcclxuXHRcdFx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYoJ0pTT04nIGluIGdsb2JhbCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBldmFsKCcoJyt4aHIucmVzcG9uc2VUZXh0KycpJyk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGNhdGNoKGUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHRocm93IFwiRXJyb3Igd2hpbGUgcGFyc2luZyBKU09OIGJvZHkgOiBcIitlO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0Y2FzZSAneG1sJzpcclxuXHRcdFx0XHRcdFx0XHQvLyBCYXNlZCBvbiBqUXVlcnkncyBwYXJzZVhNTCgpIGZ1bmN0aW9uXHJcblx0XHRcdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0XHRcdC8vIFN0YW5kYXJkXHJcblx0XHRcdFx0XHRcdFx0XHRpZihnbG9iYWwuRE9NUGFyc2VyKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0gKG5ldyBET01QYXJzZXIoKSkucGFyc2VGcm9tU3RyaW5nKHhoci5yZXNwb25zZVRleHQsJ3RleHQveG1sJyk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHQvLyBJRTw5XHJcblx0XHRcdFx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzcG9uc2UgPSBuZXcgQWN0aXZlWE9iamVjdCgnTWljcm9zb2Z0LlhNTERPTScpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXNwb25zZS5hc3luYyA9ICdmYWxzZSc7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlLmxvYWRYTUwoeGhyLnJlc3BvbnNlVGV4dCk7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGNhdGNoKGUpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0gdW5kZWZpbmVkO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRpZighcmVzcG9uc2UgfHwgIXJlc3BvbnNlLmRvY3VtZW50RWxlbWVudCB8fCByZXNwb25zZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgncGFyc2VyZXJyb3InKS5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHRocm93ICdJbnZhbGlkIFhNTCc7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0XHRcdHJlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gTGF0ZSBzdGF0dXMgY29kZSB2ZXJpZmljYXRpb24gdG8gYWxsb3cgcGFzc2luZyBkYXRhIHdoZW4sIHBlciBleGFtcGxlLCBhIDQwOSBpcyByZXR1cm5lZFxyXG5cdFx0XHRcdC8vIC0tLSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDA0Njk3Mi9tc2llLXJldHVybnMtc3RhdHVzLWNvZGUtb2YtMTIyMy1mb3ItYWpheC1yZXF1ZXN0XHJcblx0XHRcdFx0aWYoJ3N0YXR1cycgaW4geGhyICYmICEvXjJ8MTIyMy8udGVzdCh4aHIuc3RhdHVzKSkge1xyXG5cdFx0XHRcdFx0dGhyb3cgeGhyLnN0YXR1cysnICgnK3hoci5zdGF0dXNUZXh0KycpJztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Ly8gRnVsZmlsbGVkXHJcblx0XHRcdFx0cHJvbWlzZSh0cnVlLCBbeGhyLHJlc3BvbnNlXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y2F0Y2goZSkge1xyXG5cdFx0XHRcdC8vIFJlamVjdGVkXHJcblx0XHRcdFx0cHJvbWlzZShmYWxzZSwgW3hocixyZXNwb25zZSxlXSk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8gSGFuZGxlIGVycm9yc1xyXG5cdFx0aGFuZGxlRXJyb3IgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdC0tcmVxdWVzdHM7XHJcblx0XHRcdHByb21pc2UoZmFsc2UsIFt4aHIsbnVsbCxuZXcgRXJyb3IoJ0Nvbm5lY3Rpb24gYWJvcnRlZCcpXSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIE5vcm1hbGl6ZSBvcHRpb25zXHJcblx0XHRvcHRpb25zLmFzeW5jID0gJ2FzeW5jJyBpbiBvcHRpb25zPyEhb3B0aW9ucy5hc3luYzp0cnVlO1xyXG5cdFx0b3B0aW9ucy5jYWNoZSA9ICdjYWNoZScgaW4gb3B0aW9ucz8hIW9wdGlvbnMuY2FjaGU6ZmFsc2U7XHJcblx0XHRvcHRpb25zLmRhdGFUeXBlID0gJ2RhdGFUeXBlJyBpbiBvcHRpb25zP29wdGlvbnMuZGF0YVR5cGUudG9Mb3dlckNhc2UoKTpkZWZhdWx0RGF0YVR5cGU7XHJcblx0XHRvcHRpb25zLnJlc3BvbnNlVHlwZSA9ICdyZXNwb25zZVR5cGUnIGluIG9wdGlvbnM/b3B0aW9ucy5yZXNwb25zZVR5cGUudG9Mb3dlckNhc2UoKTonYXV0byc7XHJcblx0XHRvcHRpb25zLnVzZXIgPSBvcHRpb25zLnVzZXIgfHwgJyc7XHJcblx0XHRvcHRpb25zLnBhc3N3b3JkID0gb3B0aW9ucy5wYXNzd29yZCB8fCAnJztcclxuXHRcdG9wdGlvbnMud2l0aENyZWRlbnRpYWxzID0gISFvcHRpb25zLndpdGhDcmVkZW50aWFscztcclxuXHRcdG9wdGlvbnMudGltZW91dCA9ICd0aW1lb3V0JyBpbiBvcHRpb25zP3BhcnNlSW50KG9wdGlvbnMudGltZW91dCwxMCk6MzAwMDA7XHJcblx0XHRvcHRpb25zLmF0dGVtcHRzID0gJ2F0dGVtcHRzJyBpbiBvcHRpb25zP3BhcnNlSW50KG9wdGlvbnMuYXR0ZW1wdHMsMTApOjE7XHJcblxyXG5cdFx0Ly8gR3Vlc3MgaWYgd2UncmUgZGVhbGluZyB3aXRoIGEgY3Jvc3Mtb3JpZ2luIHJlcXVlc3RcclxuXHRcdGkgPSB1cmwubWF0Y2goL1xcL1xcLyguKz8pXFwvLyk7XHJcblx0XHRjcm9zc09yaWdpbiA9IGkgJiYgKGlbMV0/aVsxXSE9bG9jYXRpb24uaG9zdDpmYWxzZSk7XHJcblxyXG5cdFx0Ly8gUHJlcGFyZSBkYXRhXHJcblx0XHRpZignQXJyYXlCdWZmZXInIGluIGdsb2JhbCAmJiBkYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcclxuXHRcdFx0b3B0aW9ucy5kYXRhVHlwZSA9ICdhcnJheWJ1ZmZlcic7XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmKCdCbG9iJyBpbiBnbG9iYWwgJiYgZGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcclxuXHRcdFx0b3B0aW9ucy5kYXRhVHlwZSA9ICdibG9iJztcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoJ0RvY3VtZW50JyBpbiBnbG9iYWwgJiYgZGF0YSBpbnN0YW5jZW9mIERvY3VtZW50KSB7XHJcblx0XHRcdG9wdGlvbnMuZGF0YVR5cGUgPSAnZG9jdW1lbnQnO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZignRm9ybURhdGEnIGluIGdsb2JhbCAmJiBkYXRhIGluc3RhbmNlb2YgRm9ybURhdGEpIHtcclxuXHRcdFx0b3B0aW9ucy5kYXRhVHlwZSA9ICdmb3JtZGF0YSc7XHJcblx0XHR9XHJcblx0XHRzd2l0Y2gob3B0aW9ucy5kYXRhVHlwZSkge1xyXG5cdFx0XHRjYXNlICdqc29uJzpcclxuXHRcdFx0XHRkYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3Bvc3QnOlxyXG5cdFx0XHRcdGRhdGEgPSBqcGFyYW0oZGF0YSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUHJlcGFyZSBoZWFkZXJzXHJcblx0XHRpZihvcHRpb25zLmhlYWRlcnMpIHtcclxuXHRcdFx0dmFyIGZvcm1hdCA9IGZ1bmN0aW9uKG1hdGNoLHAxLHAyKSB7XHJcblx0XHRcdFx0cmV0dXJuIHAxICsgcDIudG9VcHBlckNhc2UoKTtcclxuXHRcdFx0fTtcclxuXHRcdFx0Zm9yKGkgaW4gb3B0aW9ucy5oZWFkZXJzKSB7XHJcblx0XHRcdFx0aGVhZGVyc1tpLnJlcGxhY2UoLyhefC0pKFteLV0pL2csZm9ybWF0KV0gPSBvcHRpb25zLmhlYWRlcnNbaV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmKCEoJ0NvbnRlbnQtVHlwZScgaW4gaGVhZGVycykgJiYgbWV0aG9kIT0nR0VUJykge1xyXG5cdFx0XHRpZihvcHRpb25zLmRhdGFUeXBlIGluIG1pbWVUeXBlcykge1xyXG5cdFx0XHRcdGlmKG1pbWVUeXBlc1tvcHRpb25zLmRhdGFUeXBlXSkge1xyXG5cdFx0XHRcdFx0aGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSBtaW1lVHlwZXNbb3B0aW9ucy5kYXRhVHlwZV07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZighaGVhZGVycy5BY2NlcHQpIHtcclxuXHRcdFx0aGVhZGVycy5BY2NlcHQgPSAob3B0aW9ucy5yZXNwb25zZVR5cGUgaW4gYWNjZXB0KT9hY2NlcHRbb3B0aW9ucy5yZXNwb25zZVR5cGVdOicqLyonO1xyXG5cdFx0fVxyXG5cdFx0aWYoIWNyb3NzT3JpZ2luICYmICEoJ1gtUmVxdWVzdGVkLVdpdGgnIGluIGhlYWRlcnMpKSB7IC8vICh0aGF0IGhlYWRlciBicmVha3MgaW4gbGVnYWN5IGJyb3dzZXJzIHdpdGggQ09SUylcclxuXHRcdFx0aGVhZGVyc1snWC1SZXF1ZXN0ZWQtV2l0aCddID0gJ1hNTEh0dHBSZXF1ZXN0JztcclxuXHRcdH1cclxuXHRcdGlmKCFvcHRpb25zLmNhY2hlICYmICEoJ0NhY2hlLUNvbnRyb2wnIGluIGhlYWRlcnMpKSB7XHJcblx0XHRcdGhlYWRlcnNbJ0NhY2hlLUNvbnRyb2wnXSA9ICduby1jYWNoZSc7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUHJlcGFyZSBVUkxcclxuXHRcdGlmKG1ldGhvZD09J0dFVCcgJiYgZGF0YSkge1xyXG5cdFx0XHR2YXJzICs9IGRhdGE7XHJcblx0XHR9XHJcblx0XHRpZih2YXJzKSB7XHJcblx0XHRcdHVybCArPSAoL1xcPy8udGVzdCh1cmwpPycmJzonPycpK3ZhcnM7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gU3RhcnQgdGhlIHJlcXVlc3RcclxuXHRcdGlmKG9wdGlvbnMuYXN5bmMpIHtcclxuXHRcdFx0cHJvbWlzZS5zZW5kKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUmV0dXJuIHByb21pc2VcclxuXHRcdHJldHVybiBwcm9taXNlO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvLyBSZXR1cm4gdGhlIGV4dGVybmFsIHF3ZXN0IG9iamVjdFxyXG5cdHJldHVybiB7XHJcblx0XHRiYXNlOiAnJyxcclxuXHRcdGdldDogZnVuY3Rpb24odXJsLCBkYXRhLCBvcHRpb25zLCBiZWZvcmUpIHtcclxuXHRcdFx0cmV0dXJuIHF3ZXN0KCdHRVQnLCB0aGlzLmJhc2UrdXJsLCBkYXRhLCBvcHRpb25zLCBiZWZvcmUpO1xyXG5cdFx0fSxcclxuXHRcdHBvc3Q6IGZ1bmN0aW9uKHVybCwgZGF0YSwgb3B0aW9ucywgYmVmb3JlKSB7XHJcblx0XHRcdHJldHVybiBxd2VzdCgnUE9TVCcsIHRoaXMuYmFzZSt1cmwsIGRhdGEsIG9wdGlvbnMsIGJlZm9yZSk7XHJcblx0XHR9LFxyXG5cdFx0cHV0OiBmdW5jdGlvbih1cmwsIGRhdGEsIG9wdGlvbnMsIGJlZm9yZSkge1xyXG5cdFx0XHRyZXR1cm4gcXdlc3QoJ1BVVCcsIHRoaXMuYmFzZSt1cmwsIGRhdGEsIG9wdGlvbnMsIGJlZm9yZSk7XHJcblx0XHR9LFxyXG5cdFx0J2RlbGV0ZSc6IGZ1bmN0aW9uKHVybCwgZGF0YSwgb3B0aW9ucywgYmVmb3JlKSB7XHJcblx0XHRcdHJldHVybiBxd2VzdCgnREVMRVRFJywgdGhpcy5iYXNlK3VybCwgZGF0YSwgb3B0aW9ucywgYmVmb3JlKTtcclxuXHRcdH0sXHJcblx0XHRtYXA6IGZ1bmN0aW9uKHR5cGUsIHVybCwgZGF0YSwgb3B0aW9ucywgYmVmb3JlKSB7XHJcblx0XHRcdHJldHVybiBxd2VzdCh0eXBlLnRvVXBwZXJDYXNlKCksIHRoaXMuYmFzZSt1cmwsIGRhdGEsIG9wdGlvbnMsIGJlZm9yZSk7XHJcblx0XHR9LFxyXG5cdFx0eGhyMjogeGhyMixcclxuXHRcdGxpbWl0OiBmdW5jdGlvbihieSkge1xyXG5cdFx0XHRsaW1pdCA9IGJ5O1xyXG5cdFx0fSxcclxuXHRcdHNldERlZmF1bHRYZHJSZXNwb25zZVR5cGU6IGZ1bmN0aW9uKHR5cGUpIHtcclxuXHRcdFx0ZGVmYXVsdFhkclJlc3BvbnNlVHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcclxuXHRcdH0sXHJcblx0XHRzZXREZWZhdWx0RGF0YVR5cGU6IGZ1bmN0aW9uKHR5cGUpIHtcclxuXHRcdFx0ZGVmYXVsdERhdGFUeXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG59KCk7XHJcbiIsIi8qIEBmbG93ICovXG5cbmltcG9ydCBxd2VzdCBmcm9tICdxd2VzdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFF3ZXN0QWpheExvYWRlciB7XG4gICAgZ2V0KHBhdGggOiBzdHJpbmcpIDogUHJvbWlzZSB7XG4gICAgICAgIHJldHVybiBxd2VzdC5nZXQocGF0aCkudGhlbihmdW5jdGlvbih4aHIsIHJlcykge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiByZXMgPT09ICdzdHJpbmcnID8gSlNPTi5wYXJzZShyZXMpIDogcmVzO1xuICAgICAgICB9KTtcbiAgICB9XG59IiwiLyogQGZsb3cgKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGV2ZWxMb2FkZXIge1xuICAgIGFqYXhMb2FkZXIgICA6IElBamF4TG9hZGVyO1xuXG4gICAgY29uc3RydWN0b3IoYWpheExvYWRlciA6IElBamF4TG9hZGVyKSB7XG4gICAgICAgIHRoaXMuYWpheExvYWRlciAgID0gYWpheExvYWRlcjtcbiAgICB9XG4gICAgXG4gICAgYXN5bmMgbG9hZExldmVsKHBhdGggOiBzdHJpbmcpIDogUHJvbWlzZSB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmFqYXhMb2FkZXIuZ2V0KHBhdGgpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBTZWxlY3RvclR5cGUgfSBmcm9tICcuL2VudGl0eSc7XG5cbmV4cG9ydCBjb25zdCBTeXN0ZW1UeXBlID0ge1xuICAgIExvZ2ljICAgOiAwLFxuICAgIFJlbmRlciAgOiAxXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTeXN0ZW1NYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5sb2dpY1N5c3RlbXMgID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnJlbmRlclN5c3RlbXMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyU3lzdGVtKHR5cGUsIHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAodHlwZSAhPT0gU3lzdGVtVHlwZS5Mb2dpYyAmJiB0eXBlICE9PSBTeXN0ZW1UeXBlLlJlbmRlcikge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCd0eXBlIG11c3QgYmUgYSB2YWxpZCBTeXN0ZW1UeXBlLicpO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmIChzZWxlY3RvciAhPT0gU2VsZWN0b3JUeXBlLkdldCAmJiBzZWxlY3RvciAhPT0gU2VsZWN0b3JUeXBlLkdldFdpdGggJiZcbiAgICAgICAgICAgIHNlbGVjdG9yICE9PSBTZWxlY3RvclR5cGUuR2V0V2l0aE9ubHkgJiYgc2VsZWN0b3IgIT09IFNlbGVjdG9yVHlwZS5HZXRXaXRob3V0KSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ3NlbGVjdG9yIG11c3QgYmUgYSB2YWxpZCBTZWxlY3RvclR5cGUuJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50cyAhPT0gJ251bWJlcicpICB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvbXBvbmVudHMgbXVzdCBiZSBhIG51bWJlci4nKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBzeXN0ZW0gPSB7XG4gICAgICAgIHNlbGVjdG9yLFxuICAgICAgICBjb21wb25lbnRzLFxuICAgICAgICBjYWxsYmFja1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgbGV0IHN5c3RlbUlkID0gTWF0aC5tYXgoMCwgLi4udGhpcy5sb2dpY1N5c3RlbXMua2V5cygpLCAuLi50aGlzLnJlbmRlclN5c3RlbXMua2V5cygpKSArIDE7XG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgU3lzdGVtVHlwZS5Mb2dpYyA6IHRoaXMubG9naWNTeXN0ZW1zLnNldChzeXN0ZW1JZCwgc3lzdGVtKTsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFN5c3RlbVR5cGUuUmVuZGVyIDogdGhpcy5yZW5kZXJTeXN0ZW1zLnNldChzeXN0ZW1JZCwgc3lzdGVtKTsgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBzeXN0ZW1JZDtcbiAgICB9XG4gICAgXG4gICAgcmVtb3ZlU3lzdGVtKHN5c3RlbUlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2ljU3lzdGVtcy5kZWxldGUoc3lzdGVtSWQpIHx8IHRoaXMucmVuZGVyU3lzdGVtcy5kZWxldGUoc3lzdGVtSWQpO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wb25lbnRNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRzID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBcbiAgICBuZXdDb21wb25lbnQoY29tcG9uZW50SWQpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50cy5nZXQoY29tcG9uZW50SWQpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGNvbXBvbmVudCA9PT0gbnVsbCB8fCBjb21wb25lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHN3aXRjaCAodHlwZW9mIGNvbXBvbmVudCkge1xuICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOiByZXR1cm4gbmV3IGNvbXBvbmVudCgpO1xuICAgICAgICAgICAgY2FzZSAnb2JqZWN0JyAgOiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgoY29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXQgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGNvbXBvbmVudCkuZm9yRWFjaChrZXkgPT4gcmV0W2tleV0gPSBjb21wb25lbnRba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgICAgICAgIH0pKGNvbXBvbmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCkge1xuICAgICAgICBpZiAoY29tcG9uZW50ID09PSBudWxsIHx8IGNvbXBvbmVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvbXBvbmVudCBjYW5ub3QgYmUgbnVsbC4nKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IG1heCA9IE1hdGgubWF4KC4uLnRoaXMuY29tcG9uZW50cy5rZXlzKCkpO1xuICAgICAgICBcbiAgICAgICAgbGV0IGlkID0gbWF4ID09PSB1bmRlZmluZWQgfHwgbWF4ID09PSBudWxsIHx8IG1heCA9PT0gLUluZmluaXR5ID8gMSA6IG1heCA9PT0gMCA/IDEgOiBtYXggKiAyO1xuXG4gICAgICAgIHRoaXMuY29tcG9uZW50cy5zZXQoaWQsIGNvbXBvbmVudCk7XG5cbiAgICAgICAgcmV0dXJuIGlkO1xuICAgIH1cbiAgICBcbiAgICBnZXRDb21wb25lbnRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wb25lbnRzO1xuICAgIH1cbn0iLCJpbXBvcnQgQ29tcG9uZW50TWFuYWdlciAgICAgICAgICAgICAgZnJvbSAnLi9jb21wb25lbnQnO1xuaW1wb3J0IFN5c3RlbU1hbmFnZXIsIHsgU3lzdGVtVHlwZSB9IGZyb20gJy4vc3lzdGVtJztcbmltcG9ydCBFdmVudEhhbmRsZXIgICAgICAgICAgICAgICAgICBmcm9tICcuL2V2ZW50JztcblxuZXhwb3J0IGNvbnN0IFNlbGVjdG9yVHlwZSA9IHtcbiAgICBHZXQgICAgICAgICA6IDAsXG4gICAgR2V0V2l0aCAgICAgOiAxLFxuICAgIEdldFdpdGhPbmx5IDogMixcbiAgICBHZXRXaXRob3V0ICA6IDNcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudGl0eU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKGNhcGFjaXR5ID0gMTAwMCkge1xuICAgICAgICB0aGlzLmNhcGFjaXR5ICAgICAgICAgPSBjYXBhY2l0eTtcbiAgICAgICAgdGhpcy5jdXJyZW50TWF4RW50aXR5ID0gLTE7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkgICAgPSBuZXcgRW50aXR5RmFjdG9yeSgpO1xuICAgICAgICB0aGlzLnN5c3RlbU1hbmFnZXIgICAgPSBuZXcgU3lzdGVtTWFuYWdlcigpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudE1hbmFnZXIgPSBuZXcgQ29tcG9uZW50TWFuYWdlcigpO1xuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlciAgICAgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0aWVzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogdGhpcy5jYXBhY2l0eSB9LCAoKSA9PiB7IHJldHVybiAwOyB9ICk7XG4gICAgfVxuICAgIFxuICAgIGluY3JlYXNlQ2FwYWNpdHkoKSB7XG4gICAgICAgIGxldCBvbGRDYXBhY2l0eSA9IHRoaXMuY2FwYWNpdHk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNhcGFjaXR5ICo9IDI7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gb2xkQ2FwYWNpdHk7IGkgPCB0aGlzLmNhcGFjaXR5OyArK2kpIHtcbiAgICAgICAgICAgIHRoaXMuZW50aXRpZXNbaV0gPSAwO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBjb21wb25lbnRJZCBvZiB0aGlzLmNvbXBvbmVudE1hbmFnZXIuZ2V0Q29tcG9uZW50cygpLmtleXMoKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IG9sZENhcGFjaXR5OyBpIDwgdGhpcy5jYXBhY2l0eTsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGhpc1tjb21wb25lbnRJZF0ucHVzaCh0aGlzLmNvbXBvbmVudE1hbmFnZXIubmV3Q29tcG9uZW50KGNvbXBvbmVudElkKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbmV3RW50aXR5KGNvbXBvbmVudHMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnRzICE9PSAnbnVtYmVyJyB8fCBjb21wb25lbnRzIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhcGFjaXR5O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgZW50aXR5SWQgPSAwO1xuICAgICAgICBcbiAgICAgICAgZm9yICg7IGVudGl0eUlkIDwgdGhpcy5jYXBhY2l0eTsgKytlbnRpdHlJZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbZW50aXR5SWRdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChlbnRpdHlJZCA+PSB0aGlzLmNhcGFjaXR5KSB7XG4gICAgICAgICAgICAvLyB0b2RvOiBhdXRvIGluY3JlYXNlIGNhcGFjaXR5P1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FwYWNpdHk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChlbnRpdHlJZCA+IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWF4RW50aXR5ID0gZW50aXR5SWQ7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXRpZXNbZW50aXR5SWRdID0gY29tcG9uZW50cztcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBlbnRpdHlJZDtcbiAgICB9XG4gICAgXG4gICAgZGVsZXRlRW50aXR5KGVudGl0eUlkKSB7XG4gICAgICAgIHRoaXMuZW50aXRpZXNbZW50aXR5SWRdID0gMDtcbiAgICAgICAgXG4gICAgICAgIGlmIChlbnRpdHlJZCA8IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gZW50aXR5SWQ7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tpXSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IGk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgICpnZXRFbnRpdGllcyhjb21wb25lbnRzID0gMCwgdHlwZSA9IFNlbGVjdG9yVHlwZS5HZXRXaXRoKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBTZWxlY3RvclR5cGUuR2V0V2l0aDoge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGVudGl0eUlkIGluIHRoaXMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0eUlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2VudGl0eUlkXSAhPT0gMCAmJiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gJiBjb21wb25lbnRzKSA9PT0gY29tcG9uZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgeWllbGQgTWF0aC5mbG9vcihlbnRpdHlJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFNlbGVjdG9yVHlwZS5HZXRXaXRoT25seToge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGVudGl0eUlkIGluIHRoaXMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0eUlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2VudGl0eUlkXSAhPT0gMCAmJiB0aGlzLmVudGl0aWVzW2VudGl0eUlkXSA9PT0gY29tcG9uZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgeWllbGQgTWF0aC5mbG9vcihlbnRpdHlJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFNlbGVjdG9yVHlwZS5HZXRXaXRob3V0OiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW50aXR5SWQgaW4gdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5SWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbZW50aXR5SWRdICE9PSAwICYmICh0aGlzLmVudGl0aWVzW2VudGl0eUlkXSAmIGNvbXBvbmVudHMpICE9PSBjb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCBNYXRoLmZsb29yKGVudGl0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgU2VsZWN0b3JUeXBlLkdldDoge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGVudGl0eUlkIGluIHRoaXMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0eUlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIE1hdGguZmxvb3IoZW50aXR5SWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIENvbXBvbmVudCBNYW5hZ2VyXG4gICAgXG4gICAgcmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgICAgIGxldCBjb21wb25lbnRJZCA9IHRoaXMuY29tcG9uZW50TWFuYWdlci5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xuICAgICAgICBcbiAgICAgICAgdGhpc1tjb21wb25lbnRJZF0gPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jYXBhY2l0eTsgKytpKSB7XG4gICAgICAgICAgICB0aGlzW2NvbXBvbmVudElkXS5wdXNoKHRoaXMuY29tcG9uZW50TWFuYWdlci5uZXdDb21wb25lbnQoY29tcG9uZW50SWQpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGluaXRpYWxpemVyO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZW9mIGNvbXBvbmVudCkge1xuICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOiBpbml0aWFsaXplciA9IGNvbXBvbmVudDsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdvYmplY3QnOiB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbGl6ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKGNvbXBvbmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IGNvbXBvbmVudFtrZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDogaW5pdGlhbGl6ZXIgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbXBvbmVudDsgfTsgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS5yZWdpc3RlckluaXRpYWxpemVyKGNvbXBvbmVudElkLCBpbml0aWFsaXplcik7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gY29tcG9uZW50SWQ7XG4gICAgfVxuICAgIFxuICAgIGFkZENvbXBvbmVudChlbnRpdHlJZCwgY29tcG9uZW50SWQpIHtcbiAgICAgICAgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gfD0gY29tcG9uZW50SWQ7XG4gICAgfVxuICAgIFxuICAgIHJlbW92ZUNvbXBvbmVudChlbnRpdHlJZCwgY29tcG9uZW50SWQpIHtcbiAgICAgICAgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gJj0gfmNvbXBvbmVudElkO1xuICAgIH1cbiAgICBcbiAgICAvLyBTeXN0ZW0gTWFuYWdlclxuICAgIFxuICAgIHJlZ2lzdGVyU3lzdGVtKHR5cGUsIHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlZ2lzdGVyU3lzdGVtKHR5cGUsIHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyTG9naWNTeXN0ZW0oc2VsZWN0b3IsIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVnaXN0ZXJTeXN0ZW0oU3lzdGVtVHlwZS5Mb2dpYywgc2VsZWN0b3IsIGNvbXBvbmVudHMsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJSZW5kZXJTeXN0ZW0oc2VsZWN0b3IsIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVnaXN0ZXJTeXN0ZW0oU3lzdGVtVHlwZS5SZW5kZXIsIHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIFxuICAgIHJlbW92ZVN5c3RlbShzeXN0ZW1JZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlbW92ZVN5c3RlbShzeXN0ZW1JZCk7XG4gICAgfVxuICAgIFxuICAgIG9uTG9naWMoZGVsdGEpIHtcbiAgICAgICAgZm9yIChsZXQgc3lzdGVtIG9mIHRoaXMuc3lzdGVtTWFuYWdlci5sb2dpY1N5c3RlbXMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMsIHN5c3RlbS5zZWxlY3RvciksIGRlbHRhKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvblJlbmRlcihkZWx0YSkge1xuICAgICAgICBmb3IgKGxldCBzeXN0ZW0gb2YgdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlbmRlclN5c3RlbXMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMsIHN5c3RlbS5zZWxlY3RvciksIGRlbHRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEVudGl0eSBGYWN0b3J5XG4gICAgXG4gICAgcmVnaXN0ZXJJbml0aWFsaXplcihjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LnJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKTtcbiAgICB9XG4gICAgXG4gICAgYnVpbGQoKSB7XG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS5idWlsZCgpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIHdpdGhDb21wb25lbnQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS53aXRoQ29tcG9uZW50KGNvbXBvbmVudElkLCBpbml0aWFsaXplcik7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlQ29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW50aXR5RmFjdG9yeS5jcmVhdGVDb25maWd1cmF0aW9uKCk7XG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZShjb3VudCwgY29uZmlndXJhdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnRpdHlGYWN0b3J5LmNyZWF0ZSh0aGlzLCBjb3VudCwgY29uZmlndXJhdGlvbik7XG4gICAgfVxuICAgIFxuICAgIC8vIEV2ZW50IEhhbmRsZXJcbiAgICBcbiAgICBsaXN0ZW4oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci5saXN0ZW4oZXZlbnQsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgXG4gICAgc3RvcExpc3RlbihldmVudElkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci5zdG9wTGlzdGVuKGV2ZW50SWQpO1xuICAgIH1cbiAgICBcbiAgICB0cmlnZ2VyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlci5jYWxsKHRoaXMsIC4uLmFyZ3VtZW50cyk7XG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXJEZWxheWVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlckRlbGF5ZWQuY2FsbCh0aGlzLCAuLi5hcmd1bWVudHMpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEVudGl0eUZhY3Rvcnkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmluaXRpYWxpemVycyAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJJbml0aWFsaXplcihjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGNvbXBvbmVudElkKSB8fCB0eXBlb2YgaW5pdGlhbGl6ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5pbml0aWFsaXplcnMuc2V0KGNvbXBvbmVudElkLCBpbml0aWFsaXplcik7XG4gICAgfVxuICAgIFxuICAgIGJ1aWxkKCkge1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSBuZXcgTWFwKCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgd2l0aENvbXBvbmVudChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKGNvbXBvbmVudElkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgaW5pdGlhbGl6ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGluaXRpYWxpemVyID0gdGhpcy5pbml0aWFsaXplcnMuZ2V0KGNvbXBvbmVudElkKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnNldChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZUNvbmZpZ3VyYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb247XG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZShlbnRpdHlNYW5hZ2VyLCBjb3VudCA9IDEsIGNvbmZpZ3VyYXRpb24gPSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCEoZW50aXR5TWFuYWdlciBpbnN0YW5jZW9mIEVudGl0eU1hbmFnZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgY29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb24gfHwgdGhpcy5jb25maWd1cmF0aW9uO1xuXG4gICAgICAgIGxldCBjb21wb25lbnRzID0gMDtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGNvbXBvbmVudCBvZiBjb25maWd1cmF0aW9uLmtleXMoKSkge1xuICAgICAgICAgICAgY29tcG9uZW50cyB8PSBjb21wb25lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBlbnRpdGllcyA9IFtdO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgKytpKSB7XG4gICAgICAgICAgICBsZXQgZW50aXR5SWQgPSBlbnRpdHlNYW5hZ2VyLm5ld0VudGl0eShjb21wb25lbnRzKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGVudGl0eUlkID49IGVudGl0eU1hbmFnZXIuY2FwYWNpdHkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgW2NvbXBvbmVudElkLCBpbml0aWFsaXplcl0gb2YgY29uZmlndXJhdGlvbikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5pdGlhbGl6ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBpbml0aWFsaXplci5jYWxsKGVudGl0eU1hbmFnZXJbY29tcG9uZW50SWRdW2VudGl0eUlkXSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlbnRpdHlNYW5hZ2VyW2NvbXBvbmVudElkXVtlbnRpdHlJZF0gIT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGVudGl0eU1hbmFnZXJbY29tcG9uZW50SWRdW2VudGl0eUlkXSAhPT0gJ29iamVjdCcgJiYgcmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5TWFuYWdlcltjb21wb25lbnRJZF1bZW50aXR5SWRdID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZW50aXRpZXMucHVzaChlbnRpdHlJZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBlbnRpdGllcy5sZW5ndGggPT09IDEgPyBlbnRpdGllc1swXSA6IGVudGl0aWVzO1xuICAgIH1cbn0iLCJpbXBvcnQgRW50aXR5TWFuYWdlciBmcm9tICcuL2VudGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50SGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBcbiAgICBlbXB0eVByb21pc2UoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHByb21pc2UoY2FsbGJhY2ssIGNvbnRleHQsIGFyZ3MsIHRpbWVvdXQpIHtcbiAgICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHlwZW9mIGNvbnRleHQgPT09ICAnb2JqZWN0JyA/IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgLi4uYXJncykgOiBjYWxsYmFjay5hcHBseShjb250ZXh0LCAuLi5hcmdzKSk7XG4gICAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh0eXBlb2YgY29udGV4dCA9PT0gJ29iamVjdCcgPyBjYWxsYmFjay5jYWxsKGNvbnRleHQsIC4uLmFyZ3MpIDogY2FsbGJhY2suYXBwbHkoY29udGV4dCwgLi4uYXJncykpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgbGlzdGVuKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKCF0aGlzLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5zZXQoZXZlbnQsIG5ldyBNYXAoKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBldmVudElkID0gLTE7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50SWQgPSBNYXRoLm1heChldmVudElkLCAuLi5ldmVudC5rZXlzKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICsrZXZlbnRJZDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZXZlbnRzLmdldChldmVudCkuc2V0KGV2ZW50SWQsIGNhbGxiYWNrKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBldmVudElkO1xuICAgIH1cbiAgICBcbiAgICBzdG9wTGlzdGVuKGV2ZW50SWQpIHtcbiAgICAgICAgZm9yIChsZXQgZXZlbnRzIG9mIHRoaXMuZXZlbnRzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpZCBvZiBldmVudHMua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlkID09PSBldmVudElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldmVudHMuZGVsZXRlKGV2ZW50SWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlcigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlciA/IHRoaXMuZXZlbnRIYW5kbGVyIDogdGhpcztcbiAgICAgICAgXG4gICAgICAgIGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xuICAgICAgICBcbiAgICAgICAgbGV0IFsgZXZlbnQgXSA9IGFyZ3Muc3BsaWNlKDAsIDEpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgIXNlbGYuZXZlbnRzLmhhcyhldmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmVtcHR5UHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGNhbGxiYWNrIG9mIHNlbGYuZXZlbnRzLmdldChldmVudCkudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goc2VsZi5wcm9taXNlKGNhbGxiYWNrLCB0aGlzLCBhcmdzLCAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXJEZWxheWVkKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXMgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyID8gdGhpcy5ldmVudEhhbmRsZXIgOiB0aGlzO1xuICAgICAgICBcbiAgICAgICAgbGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG4gICAgICAgIFxuICAgICAgICBsZXQgWyBldmVudCwgdGltZW91dCBdID0gYXJncy5zcGxpY2UoMCwgMik7XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCAhTnVtYmVyLmlzSW50ZWdlcih0aW1lb3V0KSB8fCAhc2VsZi5ldmVudHMuaGFzKGV2ZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuZW1wdHlQcm9taXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY2FsbGJhY2sgb2Ygc2VsZi5ldmVudHMuZ2V0KGV2ZW50KS52YWx1ZXMoKSkge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChzZWxmLnByb21pc2UoY2FsbGJhY2ssIHRoaXMsIGFyZ3MsIHRpbWVvdXQpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9XG59IiwiLypcbiAqIEEgbWFpbiBsb29wIHVzZWZ1bCBmb3IgZ2FtZXMgYW5kIG90aGVyIGFuaW1hdGVkIGFwcGxpY2F0aW9ucy5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAgIHZhciByb290O1xuICAgIFxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByb290ID0gZ2xvYmFsO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3QgPSB3aW5kb3c7XG4gICAgfVxuICAgIFxuICAgIC8vIFRoZSBhbW91bnQgb2YgdGltZSAoaW4gbWlsbGlzZWNvbmRzKSB0byBzaW11bGF0ZSBlYWNoIHRpbWUgdXBkYXRlKClcbiAgICAvLyBydW5zLiBTZWUgYE1haW5Mb29wLnNldFNpbXVsYXRpb25UaW1lc3RlcCgpYCBmb3IgZGV0YWlscy5cbiAgICB2YXIgc2ltdWxhdGlvblRpbWVzdGVwID0gMTAwMCAvIDYwLFxuXG4gICAgLy8gVGhlIGN1bXVsYXRpdmUgYW1vdW50IG9mIGluLWFwcCB0aW1lIHRoYXQgaGFzbid0IGJlZW4gc2ltdWxhdGVkIHlldC5cbiAgICAvLyBTZWUgdGhlIGNvbW1lbnRzIGluc2lkZSBhbmltYXRlKCkgZm9yIGRldGFpbHMuXG4gICAgZnJhbWVEZWx0YSA9IDAsXG5cbiAgICAvLyBUaGUgdGltZXN0YW1wIGluIG1pbGxpc2Vjb25kcyBvZiB0aGUgbGFzdCB0aW1lIHRoZSBtYWluIGxvb3Agd2FzIHJ1bi5cbiAgICAvLyBVc2VkIHRvIGNvbXB1dGUgdGhlIHRpbWUgZWxhcHNlZCBiZXR3ZWVuIGZyYW1lcy5cbiAgICBsYXN0RnJhbWVUaW1lTXMgPSAwLFxuXG4gICAgLy8gQW4gZXhwb25lbnRpYWwgbW92aW5nIGF2ZXJhZ2Ugb2YgdGhlIGZyYW1lcyBwZXIgc2Vjb25kLlxuICAgIGZwcyA9IDYwLFxuXG4gICAgLy8gVGhlIHRpbWVzdGFtcCAoaW4gbWlsbGlzZWNvbmRzKSBvZiB0aGUgbGFzdCB0aW1lIHRoZSBgZnBzYCBtb3ZpbmdcbiAgICAvLyBhdmVyYWdlIHdhcyB1cGRhdGVkLlxuICAgIGxhc3RGcHNVcGRhdGUgPSAwLFxuXG4gICAgLy8gVGhlIG51bWJlciBvZiBmcmFtZXMgZGVsaXZlcmVkIGluIHRoZSBjdXJyZW50IHNlY29uZC5cbiAgICBmcmFtZXNUaGlzU2Vjb25kID0gMCxcblxuICAgIC8vIFRoZSBudW1iZXIgb2YgdGltZXMgdXBkYXRlKCkgaXMgY2FsbGVkIGluIGEgZ2l2ZW4gZnJhbWUuIFRoaXMgaXMgb25seVxuICAgIC8vIHJlbGV2YW50IGluc2lkZSBvZiBhbmltYXRlKCksIGJ1dCBhIHJlZmVyZW5jZSBpcyBoZWxkIGV4dGVybmFsbHkgc28gdGhhdFxuICAgIC8vIHRoaXMgdmFyaWFibGUgaXMgbm90IG1hcmtlZCBmb3IgZ2FyYmFnZSBjb2xsZWN0aW9uIGV2ZXJ5IHRpbWUgdGhlIG1haW5cbiAgICAvLyBsb29wIHJ1bnMuXG4gICAgbnVtVXBkYXRlU3RlcHMgPSAwLFxuXG4gICAgLy8gVGhlIG1pbmltdW0gYW1vdW50IG9mIHRpbWUgaW4gbWlsbGlzZWNvbmRzIHRoYXQgbXVzdCBwYXNzIHNpbmNlIHRoZSBsYXN0XG4gICAgLy8gZnJhbWUgd2FzIGV4ZWN1dGVkIGJlZm9yZSBhbm90aGVyIGZyYW1lIGNhbiBiZSBleGVjdXRlZC4gVGhlXG4gICAgLy8gbXVsdGlwbGljYXRpdmUgaW52ZXJzZSBjYXBzIHRoZSBGUFMgKHRoZSBkZWZhdWx0IG9mIHplcm8gbWVhbnMgdGhlcmUgaXNcbiAgICAvLyBubyBjYXApLlxuICAgIG1pbkZyYW1lRGVsYXkgPSAwLFxuXG4gICAgLy8gV2hldGhlciB0aGUgbWFpbiBsb29wIGlzIHJ1bm5pbmcuXG4gICAgcnVubmluZyA9IGZhbHNlLFxuXG4gICAgLy8gYHRydWVgIGlmIGBNYWluTG9vcC5zdGFydCgpYCBoYXMgYmVlbiBjYWxsZWQgYW5kIHRoZSBtb3N0IHJlY2VudCB0aW1lIGl0XG4gICAgLy8gd2FzIGNhbGxlZCBoYXMgbm90IGJlZW4gZm9sbG93ZWQgYnkgYSBjYWxsIHRvIGBNYWluTG9vcC5zdG9wKClgLiBUaGlzIGlzXG4gICAgLy8gZGlmZmVyZW50IHRoYW4gYHJ1bm5pbmdgIGJlY2F1c2UgdGhlcmUgaXMgYSBkZWxheSBvZiBhIGZldyBtaWxsaXNlY29uZHNcbiAgICAvLyBhZnRlciBgTWFpbkxvb3Auc3RhcnQoKWAgaXMgY2FsbGVkIGJlZm9yZSB0aGUgYXBwbGljYXRpb24gaXMgY29uc2lkZXJlZFxuICAgIC8vIFwicnVubmluZy5cIiBUaGlzIGRlbGF5IGlzIGR1ZSB0byB3YWl0aW5nIGZvciB0aGUgbmV4dCBmcmFtZS5cbiAgICBzdGFydGVkID0gZmFsc2UsXG5cbiAgICAvLyBXaGV0aGVyIHRoZSBzaW11bGF0aW9uIGhhcyBmYWxsZW4gdG9vIGZhciBiZWhpbmQgcmVhbCB0aW1lLlxuICAgIC8vIFNwZWNpZmljYWxseSwgYHBhbmljYCB3aWxsIGJlIHNldCB0byBgdHJ1ZWAgaWYgdG9vIG1hbnkgdXBkYXRlcyBvY2N1ciBpblxuICAgIC8vIG9uZSBmcmFtZS4gVGhpcyBpcyBvbmx5IHJlbGV2YW50IGluc2lkZSBvZiBhbmltYXRlKCksIGJ1dCBhIHJlZmVyZW5jZSBpc1xuICAgIC8vIGhlbGQgZXh0ZXJuYWxseSBzbyB0aGF0IHRoaXMgdmFyaWFibGUgaXMgbm90IG1hcmtlZCBmb3IgZ2FyYmFnZVxuICAgIC8vIGNvbGxlY3Rpb24gZXZlcnkgdGltZSB0aGUgbWFpbiBsb29wIHJ1bnMuXG4gICAgcGFuaWMgPSBmYWxzZSxcblxuICAgIC8vIFRoZSBmdW5jdGlvbiB0aGF0IHJ1bnMgdGhlIG1haW4gbG9vcC4gVGhlIHVucHJlZml4ZWQgdmVyc2lvbiBvZlxuICAgIC8vIGB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKClgIGlzIGF2YWlsYWJsZSBpbiBhbGwgbW9kZXJuIGJyb3dzZXJzXG4gICAgLy8gbm93LCBidXQgbm9kZS5qcyBkb2Vzbid0IGhhdmUgaXQsIHNvIGZhbGwgYmFjayB0byB0aW1lcnMuIFRoZSBwb2x5ZmlsbFxuICAgIC8vIGlzIGFkYXB0ZWQgZnJvbSB0aGUgTUlULWxpY2Vuc2VkXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3VuZGVyc2NvcmVkaXNjb3ZlcnkvcmVhbHRpbWUtbXVsdGlwbGF5ZXItaW4taHRtbDVcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSByb290LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBsYXN0VGltZXN0YW1wID0gRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIG5vdyxcbiAgICAgICAgICAgIHRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIC8vIFRoZSBuZXh0IGZyYW1lIHNob3VsZCBydW4gbm8gc29vbmVyIHRoYW4gdGhlIHNpbXVsYXRpb24gYWxsb3dzLFxuICAgICAgICAgICAgLy8gYnV0IGFzIHNvb24gYXMgcG9zc2libGUgaWYgdGhlIGN1cnJlbnQgZnJhbWUgaGFzIGFscmVhZHkgdGFrZW5cbiAgICAgICAgICAgIC8vIG1vcmUgdGltZSB0byBydW4gdGhhbiBpcyBzaW11bGF0ZWQgaW4gb25lIHRpbWVzdGVwLlxuICAgICAgICAgICAgdGltZW91dCA9IE1hdGgubWF4KDAsIHNpbXVsYXRpb25UaW1lc3RlcCAtIChub3cgLSBsYXN0VGltZXN0YW1wKSk7XG4gICAgICAgICAgICBsYXN0VGltZXN0YW1wID0gbm93ICsgdGltZW91dDtcbiAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG5vdyArIHRpbWVvdXQpO1xuICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgIH07XG4gICAgfSkoKSxcblxuICAgIC8vIFRoZSBmdW5jdGlvbiB0aGF0IHN0b3BzIHRoZSBtYWluIGxvb3AuIFRoZSB1bnByZWZpeGVkIHZlcnNpb24gb2ZcbiAgICAvLyBgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKClgIGlzIGF2YWlsYWJsZSBpbiBhbGwgbW9kZXJuIGJyb3dzZXJzIG5vdyxcbiAgICAvLyBidXQgbm9kZS5qcyBkb2Vzbid0IGhhdmUgaXQsIHNvIGZhbGwgYmFjayB0byB0aW1lcnMuXG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSByb290LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IGNsZWFyVGltZW91dCxcblxuICAgIC8vIEluIGFsbCBtYWpvciBicm93c2VycywgcmVwbGFjaW5nIG5vbi1zcGVjaWZpZWQgZnVuY3Rpb25zIHdpdGggTk9PUHNcbiAgICAvLyBzZWVtcyB0byBiZSBhcyBmYXN0IG9yIHNsaWdodGx5IGZhc3RlciB0aGFuIHVzaW5nIGNvbmRpdGlvbnMgdG8gb25seVxuICAgIC8vIGNhbGwgdGhlIGZ1bmN0aW9ucyBpZiB0aGV5IGFyZSBzcGVjaWZpZWQuIFRoaXMgaXMgcHJvYmFibHkgZHVlIHRvIGVtcHR5XG4gICAgLy8gZnVuY3Rpb25zIGJlaW5nIG9wdGltaXplZCBhd2F5LiBodHRwOi8vanNwZXJmLmNvbS9ub29wLXZzLWNvbmRpdGlvblxuICAgIE5PT1AgPSBmdW5jdGlvbigpIHt9LFxuXG4gICAgLy8gQSBmdW5jdGlvbiB0aGF0IHJ1bnMgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgbWFpbiBsb29wLlxuICAgIC8vIFNlZSBgTWFpbkxvb3Auc2V0QmVnaW4oKWAgZm9yIGRldGFpbHMuXG4gICAgYmVnaW4gPSBOT09QLFxuXG4gICAgLy8gQSBmdW5jdGlvbiB0aGF0IHJ1bnMgdXBkYXRlcyAoaS5lLiBBSSBhbmQgcGh5c2ljcykuXG4gICAgLy8gU2VlIGBNYWluTG9vcC5zZXRVcGRhdGUoKWAgZm9yIGRldGFpbHMuXG4gICAgdXBkYXRlID0gTk9PUCxcblxuICAgIC8vIEEgZnVuY3Rpb24gdGhhdCBkcmF3cyB0aGluZ3Mgb24gdGhlIHNjcmVlbi5cbiAgICAvLyBTZWUgYE1haW5Mb29wLnNldERyYXcoKWAgZm9yIGRldGFpbHMuXG4gICAgZHJhdyA9IE5PT1AsXG5cbiAgICAvLyBBIGZ1bmN0aW9uIHRoYXQgcnVucyBhdCB0aGUgZW5kIG9mIHRoZSBtYWluIGxvb3AuXG4gICAgLy8gU2VlIGBNYWluTG9vcC5zZXRFbmQoKWAgZm9yIGRldGFpbHMuXG4gICAgZW5kID0gTk9PUCxcblxuICAgIC8vIFRoZSBJRCBvZiB0aGUgY3VycmVudGx5IGV4ZWN1dGluZyBmcmFtZS4gVXNlZCB0byBjYW5jZWwgZnJhbWVzIHdoZW5cbiAgICAvLyBzdG9wcGluZyB0aGUgbG9vcC5cbiAgICByYWZIYW5kbGU7XG5cbi8qKlxuICogTWFuYWdlcyB0aGUgbWFpbiBsb29wIHRoYXQgcnVucyB1cGRhdGVzIGFuZCByZW5kZXJpbmcuXG4gKlxuICogVGhlIG1haW4gbG9vcCBpcyBhIGNvcmUgcGFydCBvZiBhbnkgYXBwbGljYXRpb24gaW4gd2hpY2ggc3RhdGUgY2hhbmdlc1xuICogZXZlbiBpZiBubyBldmVudHMgYXJlIGhhbmRsZWQuIEluIGdhbWVzLCBpdCBpcyB0eXBpY2FsbHkgcmVzcG9uc2libGUgZm9yXG4gKiBjb21wdXRpbmcgcGh5c2ljcyBhbmQgQUkgYXMgd2VsbCBhcyBkcmF3aW5nIHRoZSByZXN1bHQgb24gdGhlIHNjcmVlbi5cbiAqXG4gKiBUaGUgYm9keSBvZiB0aGlzIHBhcnRpY3VsYXIgbG9vcCBpcyBydW4gZXZlcnkgdGltZSB0aGUgYnJvd3NlciBpcyByZWFkeSB0b1xuICogcGFpbnQgYW5vdGhlciBmcmFtZS4gVGhlIGZyZXF1ZW5jeSB3aXRoIHdoaWNoIHRoaXMgaGFwcGVucyBkZXBlbmRzIHByaW1hcmlseVxuICogb24gdGhlIG1vbml0b3IncyByZWZyZXNoIHJhdGUsIHdoaWNoIGlzIHR5cGljYWxseSA2MCBmcmFtZXMgcGVyIHNlY29uZC4gTW9zdFxuICogYXBwbGljYXRpb25zIGFpbSB0byBydW4gYXQgNjAgRlBTIGZvciB0aGlzIHJlYXNvbiwgbWVhbmluZyB0aGF0IHRoZSBtYWluXG4gKiBsb29wIHJ1bnMgYWJvdXQgb25jZSBldmVyeSAxNi43IG1pbGxpc2Vjb25kcy4gV2l0aCB0aGlzIHRhcmdldCwgZXZlcnl0aGluZ1xuICogdGhhdCBoYXBwZW5zIGluIHRoZSBtYWluIGxvb3AgKGUuZy4gYWxsIHVwZGF0ZXMgYW5kIGRyYXdpbmcpIG5lZWRzIHRvIG9jY3VyXG4gKiB3aXRoaW4gdGhlIFwiYnVkZ2V0XCIgb2YgMTYuNyBtaWxsaXNlY29uZHMuICBTZWVcbiAqIGBNYWluTG9vcC5zZXRTaW11bGF0aW9uVGltZXN0ZXAoKWAgZm9yIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdHlwaWNhbFxuICogbW9uaXRvciByZWZyZXNoIHJhdGVzIGFuZCBmcmFtZSByYXRlIHRhcmdldHMuXG4gKlxuICogVGhlIG1haW4gbG9vcCBjYW4gYmUgc3RhcnRlZCBhbmQgc3RvcHBlZCwgYnV0IHRoZXJlIGNhbiBvbmx5IGJlIG9uZSBNYWluTG9vcFxuICogKGV4Y2VwdCB0aGF0IGVhY2ggV2ViIFdvcmtlciBjYW4gaGF2ZSBpdHMgb3duIE1haW5Mb29wKS4gVGhlcmUgYXJlIGZvdXIgbWFpblxuICogcGFydHMgb2YgdGhlIGxvb3A6IHtAbGluayAjc2V0QmVnaW4gYmVnaW59KCksIHtAbGluayAjc2V0VXBkYXRlIHVwZGF0ZX0oKSxcbiAqIHtAbGluayAjc2V0RHJhdyBkcmF3fSgpLCBhbmQge0BsaW5rICNzZXRFbmQgZW5kfSgpLCBpbiB0aGF0IG9yZGVyLiBTZWUgdGhlXG4gKiBmdW5jdGlvbnMgdGhhdCBzZXQgZWFjaCBvZiB0aGVtIGZvciBkZXNjcmlwdGlvbnMgb2Ygd2hhdCB0aGV5IGFyZSB1c2VkIGZvci5cbiAqIE5vdGUgdGhhdCB1cGRhdGUoKSBjYW4gcnVuIHplcm8gb3IgbW9yZSB0aW1lcyBwZXIgbG9vcC5cbiAqXG4gKiBAY2xhc3MgTWFpbkxvb3BcbiAqL1xucm9vdC5NYWluTG9vcCA9IHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGhvdyBtYW55IG1pbGxpc2Vjb25kcyBzaG91bGQgYmUgc2ltdWxhdGVkIGJ5IGV2ZXJ5IHJ1biBvZiB1cGRhdGUoKS5cbiAgICAgKlxuICAgICAqIFNlZSBgTWFpbkxvb3Auc2V0U2ltdWxhdGlvblRpbWVzdGVwKClgIGZvciBkZXRhaWxzIG9uIHRoaXMgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICogICBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IHNob3VsZCBiZSBzaW11bGF0ZWQgYnkgZXZlcnkgcnVuIG9mXG4gICAgICogICB7QGxpbmsgI3NldFVwZGF0ZSB1cGRhdGV9KCkuXG4gICAgICovXG4gICAgZ2V0U2ltdWxhdGlvblRpbWVzdGVwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHNpbXVsYXRpb25UaW1lc3RlcDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyBob3cgbWFueSBtaWxsaXNlY29uZHMgc2hvdWxkIGJlIHNpbXVsYXRlZCBieSBldmVyeSBydW4gb2YgdXBkYXRlKCkuXG4gICAgICpcbiAgICAgKiBUaGUgcGVyY2VpdmVkIGZyYW1lcyBwZXIgc2Vjb25kIChGUFMpIGlzIGVmZmVjdGl2ZWx5IGNhcHBlZCBhdCB0aGVcbiAgICAgKiBtdWx0aXBsaWNhdGl2ZSBpbnZlcnNlIG9mIHRoZSBzaW11bGF0aW9uIHRpbWVzdGVwLiBUaGF0IGlzLCBpZiB0aGVcbiAgICAgKiB0aW1lc3RlcCBpcyAxMDAwIC8gNjAgKHdoaWNoIGlzIHRoZSBkZWZhdWx0KSwgdGhlbiB0aGUgbWF4aW11bSBwZXJjZWl2ZWRcbiAgICAgKiBGUFMgaXMgZWZmZWN0aXZlbHkgNjAuIERlY3JlYXNpbmcgdGhlIHRpbWVzdGVwIGluY3JlYXNlcyB0aGUgbWF4aW11bVxuICAgICAqIHBlcmNlaXZlZCBGUFMgYXQgdGhlIGNvc3Qgb2YgcnVubmluZyB7QGxpbmsgI3NldFVwZGF0ZSB1cGRhdGV9KCkgbW9yZVxuICAgICAqIHRpbWVzIHBlciBmcmFtZSBhdCBsb3dlciBmcmFtZSByYXRlcy4gU2luY2UgcnVubmluZyB1cGRhdGUoKSBtb3JlIHRpbWVzXG4gICAgICogdGFrZXMgbW9yZSB0aW1lIHRvIHByb2Nlc3MsIHRoaXMgY2FuIGFjdHVhbGx5IHNsb3cgZG93biB0aGUgZnJhbWUgcmF0ZS5cbiAgICAgKiBBZGRpdGlvbmFsbHksIGlmIHRoZSBhbW91bnQgb2YgdGltZSBpdCB0YWtlcyB0byBydW4gdXBkYXRlKCkgZXhjZWVkcyBvclxuICAgICAqIHZlcnkgbmVhcmx5IGV4Y2VlZHMgdGhlIHRpbWVzdGVwLCB0aGUgYXBwbGljYXRpb24gd2lsbCBmcmVlemUgYW5kIGNyYXNoXG4gICAgICogaW4gYSBzcGlyYWwgb2YgZGVhdGggKHVubGVzcyBpdCBpcyByZXNjdWVkOyBzZWUgYE1haW5Mb29wLnNldEVuZCgpYCBmb3JcbiAgICAgKiBhbiBleHBsYW5hdGlvbiBvZiB3aGF0IGNhbiBiZSBkb25lIGlmIGEgc3BpcmFsIG9mIGRlYXRoIGlzIG9jY3VycmluZykuXG4gICAgICpcbiAgICAgKiBUaGUgZXhjZXB0aW9uIHRvIHRoaXMgaXMgdGhhdCBpbnRlcnBvbGF0aW5nIGJldHdlZW4gdXBkYXRlcyBmb3IgZWFjaFxuICAgICAqIHJlbmRlciBjYW4gaW5jcmVhc2UgdGhlIHBlcmNlaXZlZCBmcmFtZSByYXRlIGFuZCByZWR1Y2UgdmlzdWFsXG4gICAgICogc3R1dHRlcmluZy4gU2VlIGBNYWluTG9vcC5zZXREcmF3KClgIGZvciBhbiBleHBsYW5hdGlvbiBvZiBob3cgdG8gZG9cbiAgICAgKiB0aGlzLlxuICAgICAqXG4gICAgICogSWYgeW91IGFyZSBjb25zaWRlcmluZyBkZWNyZWFzaW5nIHRoZSBzaW11bGF0aW9uIHRpbWVzdGVwIGluIG9yZGVyIHRvXG4gICAgICogcmFpc2UgdGhlIG1heGltdW0gcGVyY2VpdmVkIEZQUywga2VlcCBpbiBtaW5kIHRoYXQgbW9zdCBtb25pdG9ycyBjYW4ndFxuICAgICAqIGRpc3BsYXkgbW9yZSB0aGFuIDYwIEZQUy4gV2hldGhlciBodW1hbnMgY2FuIHRlbGwgdGhlIGRpZmZlcmVuY2UgYW1vbmdcbiAgICAgKiBoaWdoIGZyYW1lIHJhdGVzIGRlcGVuZHMgb24gdGhlIGFwcGxpY2F0aW9uLCBidXQgZm9yIHJlZmVyZW5jZSwgZmlsbSBpc1xuICAgICAqIHVzdWFsbHkgZGlzcGxheWVkIGF0IDI0IEZQUywgb3RoZXIgdmlkZW9zIGF0IDMwIEZQUywgbW9zdCBnYW1lcyBhcmVcbiAgICAgKiBhY2NlcHRhYmxlIGFib3ZlIDMwIEZQUywgYW5kIHZpcnR1YWwgcmVhbGl0eSBtaWdodCByZXF1aXJlIDc1IEZQUyB0b1xuICAgICAqIGZlZWwgbmF0dXJhbC4gU29tZSBnYW1pbmcgbW9uaXRvcnMgZ28gdXAgdG8gMTQ0IEZQUy4gU2V0dGluZyB0aGVcbiAgICAgKiB0aW1lc3RlcCBiZWxvdyAxMDAwIC8gMTQ0IGlzIGRpc2NvdXJhZ2VkIGFuZCBiZWxvdyAxMDAwIC8gMjQwIGlzXG4gICAgICogc3Ryb25nbHkgZGlzY291cmFnZWQuIFRoZSBkZWZhdWx0IG9mIDEwMDAgLyA2MCBpcyBnb29kIGluIG1vc3QgY2FzZXMuXG4gICAgICpcbiAgICAgKiBUaGUgc2ltdWxhdGlvbiB0aW1lc3RlcCBzaG91bGQgdHlwaWNhbGx5IG9ubHkgYmUgY2hhbmdlZCBhdFxuICAgICAqIGRldGVybWluaXN0aWMgdGltZXMgKGUuZy4gYmVmb3JlIHRoZSBtYWluIGxvb3Agc3RhcnRzIGZvciB0aGUgZmlyc3RcbiAgICAgKiB0aW1lLCBhbmQgbm90IGluIHJlc3BvbnNlIHRvIHVzZXIgaW5wdXQgb3Igc2xvdyBmcmFtZSByYXRlcykgdG8gYXZvaWRcbiAgICAgKiBpbnRyb2R1Y2luZyBub24tZGV0ZXJtaW5pc3RpYyBiZWhhdmlvci4gVGhlIHVwZGF0ZSB0aW1lc3RlcCBzaG91bGQgYmVcbiAgICAgKiB0aGUgc2FtZSBmb3IgYWxsIHBsYXllcnMvdXNlcnMgaW4gbXVsdGlwbGF5ZXIvbXVsdGktdXNlciBhcHBsaWNhdGlvbnMuXG4gICAgICpcbiAgICAgKiBTZWUgYWxzbyBgTWFpbkxvb3AuZ2V0U2ltdWxhdGlvblRpbWVzdGVwKClgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHRpbWVzdGVwXG4gICAgICogICBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IHNob3VsZCBiZSBzaW11bGF0ZWQgYnkgZXZlcnkgcnVuIG9mXG4gICAgICogICB7QGxpbmsgI3NldFVwZGF0ZSB1cGRhdGV9KCkuXG4gICAgICovXG4gICAgc2V0U2ltdWxhdGlvblRpbWVzdGVwOiBmdW5jdGlvbih0aW1lc3RlcCkge1xuICAgICAgICBzaW11bGF0aW9uVGltZXN0ZXAgPSB0aW1lc3RlcDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGV4cG9uZW50aWFsIG1vdmluZyBhdmVyYWdlIG9mIHRoZSBmcmFtZXMgcGVyIHNlY29uZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKiAgIFRoZSBleHBvbmVudGlhbCBtb3ZpbmcgYXZlcmFnZSBvZiB0aGUgZnJhbWVzIHBlciBzZWNvbmQuXG4gICAgICovXG4gICAgZ2V0RlBTOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGZwcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbWF4aW11bSBmcmFtZSByYXRlLlxuICAgICAqXG4gICAgICogT3RoZXIgZmFjdG9ycyBhbHNvIGxpbWl0IHRoZSBGUFM7IHNlZSBgTWFpbkxvb3Auc2V0U2ltdWxhdGlvblRpbWVzdGVwYFxuICAgICAqIGZvciBkZXRhaWxzLlxuICAgICAqXG4gICAgICogU2VlIGFsc28gYE1haW5Mb29wLnNldE1heEFsbG93ZWRGUFMoKWAuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICogICBUaGUgbWF4aW11bSBudW1iZXIgb2YgZnJhbWVzIHBlciBzZWNvbmQgYWxsb3dlZC5cbiAgICAgKi9cbiAgICBnZXRNYXhBbGxvd2VkRlBTOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIDEwMDAgLyBtaW5GcmFtZURlbGF5O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGEgbWF4aW11bSBmcmFtZSByYXRlLlxuICAgICAqXG4gICAgICogU2VlIGFsc28gYE1haW5Mb29wLmdldE1heEFsbG93ZWRGUFMoKWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2Zwcz1JbmZpbml0eV1cbiAgICAgKiAgIFRoZSBtYXhpbXVtIG51bWJlciBvZiBmcmFtZXMgcGVyIHNlY29uZCB0byBleGVjdXRlLiBJZiBJbmZpbml0eSBvciBub3RcbiAgICAgKiAgIHBhc3NlZCwgdGhlcmUgd2lsbCBiZSBubyBGUFMgY2FwIChhbHRob3VnaCBvdGhlciBmYWN0b3JzIGRvIGxpbWl0IHRoZVxuICAgICAqICAgRlBTOyBzZWUgYE1haW5Mb29wLnNldFNpbXVsYXRpb25UaW1lc3RlcGAgZm9yIGRldGFpbHMpLiBJZiB6ZXJvLCB0aGlzXG4gICAgICogICB3aWxsIHN0b3AgdGhlIGxvb3AsIGFuZCB3aGVuIHRoZSBsb29wIGlzIG5leHQgc3RhcnRlZCwgaXQgd2lsbCByZXR1cm5cbiAgICAgKiAgIHRvIHRoZSBwcmV2aW91cyBtYXhpbXVtIGZyYW1lIHJhdGUuIFBhc3NpbmcgbmVnYXRpdmUgdmFsdWVzIHdpbGwgc3RhbGxcbiAgICAgKiAgIHRoZSBsb29wIHVudGlsIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIGFnYWluIHdpdGggYSBwb3NpdGl2ZSB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBzZXRNYXhBbGxvd2VkRlBTOiBmdW5jdGlvbihmcHMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmcHMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBmcHMgPSBJbmZpbml0eTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZnBzID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIERpdmlkaW5nIGJ5IEluZmluaXR5IHJldHVybnMgemVyby5cbiAgICAgICAgICAgIG1pbkZyYW1lRGVsYXkgPSAxMDAwIC8gZnBzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXNldCB0aGUgYW1vdW50IG9mIHRpbWUgdGhhdCBoYXMgbm90IHlldCBiZWVuIHNpbXVsYXRlZCB0byB6ZXJvLlxuICAgICAqXG4gICAgICogVGhpcyBpbnRyb2R1Y2VzIG5vbi1kZXRlcm1pbmlzdGljIGJlaGF2aW9yIGlmIGNhbGxlZCBhZnRlciB0aGVcbiAgICAgKiBhcHBsaWNhdGlvbiBoYXMgc3RhcnRlZCBydW5uaW5nICh1bmxlc3MgaXQgaXMgYmVpbmcgcmVzZXQsIGluIHdoaWNoIGNhc2VcbiAgICAgKiBpdCBkb2Vzbid0IG1hdHRlcikuIEhvd2V2ZXIsIHRoaXMgY2FuIGJlIHVzZWZ1bCBpbiBjYXNlcyB3aGVyZSB0aGVcbiAgICAgKiBhbW91bnQgb2YgdGltZSB0aGF0IGhhcyBub3QgeWV0IGJlZW4gc2ltdWxhdGVkIGhhcyBncm93biB2ZXJ5IGxhcmdlXG4gICAgICogKGZvciBleGFtcGxlLCB3aGVuIHRoZSBhcHBsaWNhdGlvbidzIHRhYiBnZXRzIHB1dCBpbiB0aGUgYmFja2dyb3VuZCBhbmRcbiAgICAgKiB0aGUgYnJvd3NlciB0aHJvdHRsZXMgdGhlIHRpbWVycyBhcyBhIHJlc3VsdCkuIEluIGFwcGxpY2F0aW9ucyB3aXRoXG4gICAgICogbG9ja3N0ZXAgdGhlIHBsYXllciB3b3VsZCBnZXQgZHJvcHBlZCwgYnV0IGluIG90aGVyIG5ldHdvcmtlZFxuICAgICAqIGFwcGxpY2F0aW9ucyBpdCBtYXkgYmUgbmVjZXNzYXJ5IHRvIHNuYXAgb3IgZWFzZSB0aGUgcGxheWVyL3VzZXIgdG8gdGhlXG4gICAgICogYXV0aG9yaXRhdGl2ZSBzdGF0ZSBhbmQgZGlzY2FyZCBwZW5kaW5nIHVwZGF0ZXMgaW4gdGhlIHByb2Nlc3MuIEluXG4gICAgICogbm9uLW5ldHdvcmtlZCBhcHBsaWNhdGlvbnMgaXQgbWF5IGFsc28gYmUgYWNjZXB0YWJsZSB0byBzaW1wbHkgcmVzdW1lXG4gICAgICogdGhlIGFwcGxpY2F0aW9uIHdoZXJlIGl0IGxhc3QgbGVmdCBvZmYgYW5kIGlnbm9yZSB0aGUgYWNjdW11bGF0ZWRcbiAgICAgKiB1bnNpbXVsYXRlZCB0aW1lLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqICAgVGhlIGN1bXVsYXRpdmUgYW1vdW50IG9mIGVsYXBzZWQgdGltZSBpbiBtaWxsaXNlY29uZHMgdGhhdCBoYXMgbm90IHlldFxuICAgICAqICAgYmVlbiBzaW11bGF0ZWQsIGJ1dCBpcyBiZWluZyBkaXNjYXJkZWQgYXMgYSByZXN1bHQgb2YgY2FsbGluZyB0aGlzXG4gICAgICogICBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICByZXNldEZyYW1lRGVsdGE6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb2xkRnJhbWVEZWx0YSA9IGZyYW1lRGVsdGE7XG4gICAgICAgIGZyYW1lRGVsdGEgPSAwO1xuICAgICAgICByZXR1cm4gb2xkRnJhbWVEZWx0YTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZnVuY3Rpb24gdGhhdCBydW5zIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIG1haW4gbG9vcC5cbiAgICAgKlxuICAgICAqIFRoZSBiZWdpbigpIGZ1bmN0aW9uIGlzIHR5cGljYWxseSB1c2VkIHRvIHByb2Nlc3MgaW5wdXQgYmVmb3JlIHRoZVxuICAgICAqIHVwZGF0ZXMgcnVuLiBQcm9jZXNzaW5nIGlucHV0IGhlcmUgKGluIGNodW5rcykgY2FuIHJlZHVjZSB0aGUgcnVubmluZ1xuICAgICAqIHRpbWUgb2YgZXZlbnQgaGFuZGxlcnMsIHdoaWNoIGlzIHVzZWZ1bCBiZWNhdXNlIGxvbmctcnVubmluZyBldmVudFxuICAgICAqIGhhbmRsZXJzIGNhbiBzb21ldGltZXMgZGVsYXkgZnJhbWVzLlxuICAgICAqXG4gICAgICogVW5saWtlIHtAbGluayAjc2V0VXBkYXRlIHVwZGF0ZX0oKSwgd2hpY2ggY2FuIHJ1biB6ZXJvIG9yIG1vcmUgdGltZXMgcGVyXG4gICAgICogZnJhbWUsIGJlZ2luKCkgYWx3YXlzIHJ1bnMgZXhhY3RseSBvbmNlIHBlciBmcmFtZS4gVGhpcyBtYWtlcyBpdCB1c2VmdWxcbiAgICAgKiBmb3IgYW55IHVwZGF0ZXMgdGhhdCBhcmUgbm90IGRlcGVuZGVudCBvbiB0aW1lIGluIHRoZSBzaW11bGF0aW9uLlxuICAgICAqIEV4YW1wbGVzIGluY2x1ZGUgYWRqdXN0aW5nIEhVRCBjYWxjdWxhdGlvbnMgb3IgcGVyZm9ybWluZyBsb25nLXJ1bm5pbmdcbiAgICAgKiB1cGRhdGVzIGluY3JlbWVudGFsbHkuIENvbXBhcmVkIHRvIHtAbGluayAjc2V0RW5kIGVuZH0oKSwgZ2VuZXJhbGx5XG4gICAgICogYWN0aW9ucyBzaG91bGQgb2NjdXIgaW4gYmVnaW4oKSBpZiB0aGV5IGFmZmVjdCBhbnl0aGluZyB0aGF0XG4gICAgICoge0BsaW5rICNzZXRVcGRhdGUgdXBkYXRlfSgpIG9yIHtAbGluayAjc2V0RHJhdyBkcmF3fSgpIHVzZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGJlZ2luXG4gICAgICogICBUaGUgYmVnaW4oKSBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2JlZ2luLnRpbWVzdGFtcF1cbiAgICAgKiAgIFRoZSBjdXJyZW50IHRpbWVzdGFtcCAod2hlbiB0aGUgZnJhbWUgc3RhcnRlZCksIGluIG1pbGxpc2Vjb25kcy4gVGhpc1xuICAgICAqICAgc2hvdWxkIG9ubHkgYmUgdXNlZCBmb3IgY29tcGFyaXNvbiB0byBvdGhlciB0aW1lc3RhbXBzIGJlY2F1c2UgdGhlXG4gICAgICogICBlcG9jaCAoaS5lLiB0aGUgXCJ6ZXJvXCIgdGltZSkgZGVwZW5kcyBvbiB0aGUgZW5naW5lIHJ1bm5pbmcgdGhpcyBjb2RlLlxuICAgICAqICAgSW4gZW5naW5lcyB0aGF0IHN1cHBvcnQgYERPTUhpZ2hSZXNUaW1lU3RhbXBgIChhbGwgbW9kZXJuIGJyb3dzZXJzXG4gICAgICogICBleGNlcHQgaU9TIFNhZmFyaSA4KSB0aGUgZXBvY2ggaXMgdGhlIHRpbWUgdGhlIHBhZ2Ugc3RhcnRlZCBsb2FkaW5nLFxuICAgICAqICAgc3BlY2lmaWNhbGx5IGBwZXJmb3JtYW5jZS50aW1pbmcubmF2aWdhdGlvblN0YXJ0YC4gRXZlcnl3aGVyZSBlbHNlLFxuICAgICAqICAgaW5jbHVkaW5nIG5vZGUuanMsIHRoZSBlcG9jaCBpcyB0aGUgVW5peCBlcG9jaCAoMTk3MC0wMS0wMVQwMDowMDowMFopLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbYmVnaW4uZGVsdGFdXG4gICAgICogICBUaGUgdG90YWwgZWxhcHNlZCB0aW1lIHRoYXQgaGFzIG5vdCB5ZXQgYmVlbiBzaW11bGF0ZWQsIGluXG4gICAgICogICBtaWxsaXNlY29uZHMuXG4gICAgICovXG4gICAgc2V0QmVnaW46IGZ1bmN0aW9uKGZ1bikge1xuICAgICAgICBiZWdpbiA9IGZ1biB8fCBiZWdpbjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGZ1bmN0aW9uIHRoYXQgcnVucyB1cGRhdGVzIChlLmcuIEFJIGFuZCBwaHlzaWNzKS5cbiAgICAgKlxuICAgICAqIFRoZSB1cGRhdGUoKSBmdW5jdGlvbiBzaG91bGQgc2ltdWxhdGUgYW55dGhpbmcgdGhhdCBpcyBhZmZlY3RlZCBieSB0aW1lLlxuICAgICAqIEl0IGNhbiBiZSBjYWxsZWQgemVybyBvciBtb3JlIHRpbWVzIHBlciBmcmFtZSBkZXBlbmRpbmcgb24gdGhlIGZyYW1lXG4gICAgICogcmF0ZS5cbiAgICAgKlxuICAgICAqIEFzIHdpdGggZXZlcnl0aGluZyBpbiB0aGUgbWFpbiBsb29wLCB0aGUgcnVubmluZyB0aW1lIG9mIHVwZGF0ZSgpXG4gICAgICogZGlyZWN0bHkgYWZmZWN0cyB0aGUgZnJhbWUgcmF0ZS4gSWYgdXBkYXRlKCkgdGFrZXMgbG9uZyBlbm91Z2ggdGhhdCB0aGVcbiAgICAgKiBmcmFtZSByYXRlIGRyb3BzIGJlbG93IHRoZSB0YXJnZXQgKFwiYnVkZ2V0ZWRcIikgZnJhbWUgcmF0ZSwgcGFydHMgb2YgdGhlXG4gICAgICogdXBkYXRlKCkgZnVuY3Rpb24gdGhhdCBkbyBub3QgbmVlZCB0byBleGVjdXRlIGJldHdlZW4gZXZlcnkgZnJhbWUgY2FuIGJlXG4gICAgICogbW92ZWQgaW50byBXZWIgV29ya2Vycy4gKFZhcmlvdXMgc291cmNlcyBvbiB0aGUgaW50ZXJuZXQgc29tZXRpbWVzXG4gICAgICogc3VnZ2VzdCBvdGhlciBzY2hlZHVsaW5nIHBhdHRlcm5zIHVzaW5nIHNldFRpbWVvdXQoKSBvciBzZXRJbnRlcnZhbCgpLlxuICAgICAqIFRoZXNlIGFwcHJvYWNoZXMgc29tZXRpbWVzIG9mZmVyIG1vZGVzdCBpbXByb3ZlbWVudHMgd2l0aCBtaW5pbWFsXG4gICAgICogY2hhbmdlcyB0byBleGlzdGluZyBjb2RlLCBidXQgYmVjYXVzZSBKYXZhU2NyaXB0IGlzIHNpbmdsZS10aHJlYWRlZCwgdGhlXG4gICAgICogdXBkYXRlcyB3aWxsIHN0aWxsIGJsb2NrIHJlbmRlcmluZyBhbmQgZHJhZyBkb3duIHRoZSBmcmFtZSByYXRlLiBXZWJcbiAgICAgKiBXb3JrZXJzIGV4ZWN1dGUgaW4gc2VwYXJhdGUgdGhyZWFkcywgc28gdGhleSBmcmVlIHVwIG1vcmUgdGltZSBpbiB0aGVcbiAgICAgKiBtYWluIGxvb3AuKVxuICAgICAqXG4gICAgICogVGhpcyBzY3JpcHQgY2FuIGJlIGltcG9ydGVkIGludG8gYSBXZWIgV29ya2VyIHVzaW5nIGltcG9ydFNjcmlwdHMoKSBhbmRcbiAgICAgKiB1c2VkIHRvIHJ1biBhIHNlY29uZCBtYWluIGxvb3AgaW4gdGhlIHdvcmtlci4gU29tZSBjb25zaWRlcmF0aW9uczpcbiAgICAgKlxuICAgICAqIC0gUHJvZmlsZSB5b3VyIGNvZGUgYmVmb3JlIGRvaW5nIHRoZSB3b3JrIHRvIG1vdmUgaXQgaW50byBXZWIgV29ya2Vycy5cbiAgICAgKiAgIEl0IGNvdWxkIGJlIHRoZSByZW5kZXJpbmcgdGhhdCBpcyB0aGUgYm90dGxlbmVjaywgaW4gd2hpY2ggY2FzZSB0aGVcbiAgICAgKiAgIHNvbHV0aW9uIGlzIHRvIGRlY3JlYXNlIHRoZSB2aXN1YWwgY29tcGxleGl0eSBvZiB0aGUgc2NlbmUuXG4gICAgICogLSBJdCBkb2Vzbid0IG1ha2Ugc2Vuc2UgdG8gbW92ZSB0aGUgKmVudGlyZSogY29udGVudHMgb2YgdXBkYXRlKCkgaW50b1xuICAgICAqICAgd29ya2VycyB1bmxlc3Mge0BsaW5rICNzZXREcmF3IGRyYXd9KCkgY2FuIGludGVycG9sYXRlIGJldHdlZW4gZnJhbWVzLlxuICAgICAqICAgVGhlIGxvd2VzdC1oYW5naW5nIGZydWl0IGlzIGJhY2tncm91bmQgdXBkYXRlcyAobGlrZSBjYWxjdWxhdGluZ1xuICAgICAqICAgY2l0aXplbnMnIGhhcHBpbmVzcyBpbiBhIGNpdHktYnVpbGRpbmcgZ2FtZSksIHBoeXNpY3MgdGhhdCBkb2Vzbid0XG4gICAgICogICBhZmZlY3QgdGhlIHNjZW5lIChsaWtlIGZsYWdzIHdhdmluZyBpbiB0aGUgd2luZCksIGFuZCBhbnl0aGluZyB0aGF0IGlzXG4gICAgICogICBvY2NsdWRlZCBvciBoYXBwZW5pbmcgZmFyIG9mZiBzY3JlZW4uXG4gICAgICogLSBJZiBkcmF3KCkgbmVlZHMgdG8gaW50ZXJwb2xhdGUgcGh5c2ljcyBiYXNlZCBvbiBhY3Rpdml0eSB0aGF0IG9jY3Vyc1xuICAgICAqICAgaW4gYSB3b3JrZXIsIHRoZSB3b3JrZXIgbmVlZHMgdG8gcGFzcyB0aGUgaW50ZXJwb2xhdGlvbiB2YWx1ZSBiYWNrIHRvXG4gICAgICogICB0aGUgbWFpbiB0aHJlYWQgc28gdGhhdCBpcyBpcyBhdmFpbGFibGUgdG8gZHJhdygpLlxuICAgICAqIC0gV2ViIFdvcmtlcnMgY2FuJ3QgYWNjZXNzIHRoZSBzdGF0ZSBvZiB0aGUgbWFpbiB0aHJlYWQsIHNvIHRoZXkgY2FuJ3RcbiAgICAgKiAgIGRpcmVjdGx5IG1vZGlmeSBvYmplY3RzIGluIHlvdXIgc2NlbmUuIE1vdmluZyBkYXRhIHRvIGFuZCBmcm9tIFdlYlxuICAgICAqICAgV29ya2VycyBpcyBhIHBhaW4uIFRoZSBmYXN0ZXN0IHdheSB0byBkbyBpdCBpcyB3aXRoIFRyYW5zZmVyYWJsZVxuICAgICAqICAgT2JqZWN0czogYmFzaWNhbGx5LCB5b3UgY2FuIHBhc3MgYW4gQXJyYXlCdWZmZXIgdG8gYSB3b3JrZXIsXG4gICAgICogICBkZXN0cm95aW5nIHRoZSBvcmlnaW5hbCByZWZlcmVuY2UgaW4gdGhlIHByb2Nlc3MuXG4gICAgICpcbiAgICAgKiBZb3UgY2FuIHJlYWQgbW9yZSBhYm91dCBXZWIgV29ya2VycyBhbmQgVHJhbnNmZXJhYmxlIE9iamVjdHMgYXRcbiAgICAgKiBbSFRNTDUgUm9ja3NdKGh0dHA6Ly93d3cuaHRtbDVyb2Nrcy5jb20vZW4vdHV0b3JpYWxzL3dvcmtlcnMvYmFzaWNzLykuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB1cGRhdGVcbiAgICAgKiAgIFRoZSB1cGRhdGUoKSBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3VwZGF0ZS5kZWx0YV1cbiAgICAgKiAgIFRoZSBhbW91bnQgb2YgdGltZSBpbiBtaWxsaXNlY29uZHMgdG8gc2ltdWxhdGUgaW4gdGhlIHVwZGF0ZS4gSW4gbW9zdFxuICAgICAqICAgY2FzZXMgdGhpcyB0aW1lc3RlcCBuZXZlciBjaGFuZ2VzIGluIG9yZGVyIHRvIGVuc3VyZSBkZXRlcm1pbmlzdGljXG4gICAgICogICB1cGRhdGVzLiBUaGUgdGltZXN0ZXAgaXMgdGhlIHNhbWUgYXMgdGhhdCByZXR1cm5lZCBieVxuICAgICAqICAgYE1haW5Mb29wLmdldFNpbXVsYXRpb25UaW1lc3RlcCgpYC5cbiAgICAgKi9cbiAgICBzZXRVcGRhdGU6IGZ1bmN0aW9uKGZ1bikge1xuICAgICAgICB1cGRhdGUgPSBmdW4gfHwgdXBkYXRlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZnVuY3Rpb24gdGhhdCBkcmF3cyB0aGluZ3Mgb24gdGhlIHNjcmVlbi5cbiAgICAgKlxuICAgICAqIFRoZSBkcmF3KCkgZnVuY3Rpb24gZ2V0cyBwYXNzZWQgdGhlIHBlcmNlbnQgb2YgdGltZSB0aGF0IHRoZSBuZXh0IHJ1biBvZlxuICAgICAqIHtAbGluayAjc2V0VXBkYXRlIHVwZGF0ZX0oKSB3aWxsIHNpbXVsYXRlIHRoYXQgaGFzIGFjdHVhbGx5IGVsYXBzZWQsIGFzXG4gICAgICogYSBkZWNpbWFsLiBJbiBvdGhlciB3b3JkcywgZHJhdygpIGdldHMgcGFzc2VkIGhvdyBmYXIgYmV0d2VlbiB1cGRhdGUoKVxuICAgICAqIGNhbGxzIGl0IGlzLiBUaGlzIGlzIHVzZWZ1bCBiZWNhdXNlIHRoZSB0aW1lIHNpbXVsYXRlZCBieSB1cGRhdGUoKSBhbmRcbiAgICAgKiB0aGUgdGltZSBiZXR3ZWVuIGRyYXcoKSBjYWxscyBpcyB1c3VhbGx5IGRpZmZlcmVudCwgc28gdGhlIHBhcmFtZXRlciB0b1xuICAgICAqIGRyYXcoKSBjYW4gYmUgdXNlZCB0byBpbnRlcnBvbGF0ZSBtb3Rpb24gYmV0d2VlbiBmcmFtZXMgdG8gbWFrZVxuICAgICAqIHJlbmRlcmluZyBhcHBlYXIgc21vb3RoZXIuIFRvIGlsbHVzdHJhdGUsIGlmIHVwZGF0ZSgpIGFkdmFuY2VzIHRoZVxuICAgICAqIHNpbXVsYXRpb24gYXQgZWFjaCB2ZXJ0aWNhbCBiYXIgaW4gdGhlIGZpcnN0IHJvdyBiZWxvdywgYW5kIGRyYXcoKSBjYWxsc1xuICAgICAqIGhhcHBlbiBhdCBlYWNoIHZlcnRpY2FsIGJhciBpbiB0aGUgc2Vjb25kIHJvdyBiZWxvdywgdGhlbiBzb21lIGZyYW1lc1xuICAgICAqIHdpbGwgaGF2ZSB0aW1lIGxlZnQgb3ZlciB0aGF0IGlzIG5vdCB5ZXQgc2ltdWxhdGVkIGJ5IHVwZGF0ZSgpIHdoZW5cbiAgICAgKiByZW5kZXJpbmcgb2NjdXJzIGluIGRyYXcoKTpcbiAgICAgKlxuICAgICAqICAgICB1cGRhdGUoKSB0aW1lc3RlcHM6ICB8ICB8ICB8ICB8ICB8ICB8ICB8ICB8ICB8XG4gICAgICogICAgIGRyYXcoKSBjYWxsczogICAgICAgIHwgICB8ICAgfCAgIHwgICB8ICAgfCAgIHxcbiAgICAgKlxuICAgICAqIFRvIGludGVycG9sYXRlIG1vdGlvbiBmb3IgcmVuZGVyaW5nIHB1cnBvc2VzLCBvYmplY3RzJyBzdGF0ZSBhZnRlciB0aGVcbiAgICAgKiBsYXN0IHVwZGF0ZSgpIG11c3QgYmUgcmV0YWluZWQgYW5kIHVzZWQgdG8gY2FsY3VsYXRlIGFuIGludGVybWVkaWF0ZVxuICAgICAqIHN0YXRlLiBOb3RlIHRoYXQgdGhpcyBtZWFucyByZW5kZXJzIHdpbGwgYmUgdXAgdG8gb25lIHVwZGF0ZSgpIGJlaGluZC5cbiAgICAgKiBUaGlzIGlzIHN0aWxsIGJldHRlciB0aGFuIGV4dHJhcG9sYXRpbmcgKHByb2plY3Rpbmcgb2JqZWN0cycgc3RhdGUgYWZ0ZXJcbiAgICAgKiBhIGZ1dHVyZSB1cGRhdGUoKSkgd2hpY2ggY2FuIHByb2R1Y2UgYml6YXJyZSByZXN1bHRzLiBTdG9yaW5nIG11bHRpcGxlXG4gICAgICogc3RhdGVzIGNhbiBiZSBkaWZmaWN1bHQgdG8gc2V0IHVwLCBhbmQga2VlcCBpbiBtaW5kIHRoYXQgcnVubmluZyB0aGlzXG4gICAgICogcHJvY2VzcyB0YWtlcyB0aW1lIHRoYXQgY291bGQgcHVzaCB0aGUgZnJhbWUgcmF0ZSBkb3duLCBzbyBpdCdzIG9mdGVuXG4gICAgICogbm90IHdvcnRod2hpbGUgdW5sZXNzIHN0dXR0ZXJpbmcgaXMgdmlzaWJsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGRyYXdcbiAgICAgKiAgIFRoZSBkcmF3KCkgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtkcmF3LmludGVycG9sYXRpb25QZXJjZW50YWdlXVxuICAgICAqICAgVGhlIGN1bXVsYXRpdmUgYW1vdW50IG9mIHRpbWUgdGhhdCBoYXNuJ3QgYmVlbiBzaW11bGF0ZWQgeWV0LCBkaXZpZGVkXG4gICAgICogICBieSB0aGUgYW1vdW50IG9mIHRpbWUgdGhhdCB3aWxsIGJlIHNpbXVsYXRlZCB0aGUgbmV4dCB0aW1lIHVwZGF0ZSgpXG4gICAgICogICBydW5zLiBVc2VmdWwgZm9yIGludGVycG9sYXRpbmcgZnJhbWVzLlxuICAgICAqL1xuICAgIHNldERyYXc6IGZ1bmN0aW9uKGZ1bikge1xuICAgICAgICBkcmF3ID0gZnVuIHx8IGRyYXc7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBmdW5jdGlvbiB0aGF0IHJ1bnMgYXQgdGhlIGVuZCBvZiB0aGUgbWFpbiBsb29wLlxuICAgICAqXG4gICAgICogVW5saWtlIHtAbGluayAjc2V0VXBkYXRlIHVwZGF0ZX0oKSwgd2hpY2ggY2FuIHJ1biB6ZXJvIG9yIG1vcmUgdGltZXMgcGVyXG4gICAgICogZnJhbWUsIGVuZCgpIGFsd2F5cyBydW5zIGV4YWN0bHkgb25jZSBwZXIgZnJhbWUuIFRoaXMgbWFrZXMgaXQgdXNlZnVsXG4gICAgICogZm9yIGFueSB1cGRhdGVzIHRoYXQgYXJlIG5vdCBkZXBlbmRlbnQgb24gdGltZSBpbiB0aGUgc2ltdWxhdGlvbi5cbiAgICAgKiBFeGFtcGxlcyBpbmNsdWRlIGNsZWFuaW5nIHVwIGFueSB0ZW1wb3Jhcnkgc3RhdGUgc2V0IHVwIGJ5XG4gICAgICoge0BsaW5rICNzZXRCZWdpbiBiZWdpbn0oKSwgbG93ZXJpbmcgdGhlIHZpc3VhbCBxdWFsaXR5IGlmIHRoZSBmcmFtZSByYXRlXG4gICAgICogaXMgdG9vIGxvdywgb3IgcGVyZm9ybWluZyBsb25nLXJ1bm5pbmcgdXBkYXRlcyBpbmNyZW1lbnRhbGx5LiBDb21wYXJlZFxuICAgICAqIHRvIGJlZ2luKCksIGdlbmVyYWxseSBhY3Rpb25zIHNob3VsZCBvY2N1ciBpbiBlbmQoKSBpZiB0aGV5IHVzZSBhbnl0aGluZ1xuICAgICAqIHRoYXQgdXBkYXRlKCkgb3Ige0BsaW5rICNzZXREcmF3IGRyYXd9KCkgYWZmZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZW5kXG4gICAgICogICBUaGUgZW5kKCkgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtlbmQuZnBzXVxuICAgICAqICAgVGhlIGV4cG9uZW50aWFsIG1vdmluZyBhdmVyYWdlIG9mIHRoZSBmcmFtZXMgcGVyIHNlY29uZC4gVGhpcyBpcyB0aGVcbiAgICAgKiAgIHNhbWUgdmFsdWUgcmV0dXJuZWQgYnkgYE1haW5Mb29wLmdldEZQUygpYC4gSXQgY2FuIGJlIHVzZWQgdG8gdGFrZVxuICAgICAqICAgYWN0aW9uIHdoZW4gdGhlIEZQUyBpcyB0b28gbG93IChvciB0byByZXN0b3JlIHRvIG5vcm1hbGN5IGlmIHRoZSBGUFNcbiAgICAgKiAgIG1vdmVzIGJhY2sgdXApLiBFeGFtcGxlcyBvZiBhY3Rpb25zIHRvIHRha2UgaWYgdGhlIEZQUyBpcyB0b28gbG93XG4gICAgICogICBpbmNsdWRlIGV4aXRpbmcgdGhlIGFwcGxpY2F0aW9uLCBsb3dlcmluZyB0aGUgdmlzdWFsIHF1YWxpdHksIHN0b3BwaW5nXG4gICAgICogICBvciByZWR1Y2luZyBhY3Rpdml0aWVzIG91dHNpZGUgb2YgdGhlIG1haW4gbG9vcCBsaWtlIGV2ZW50IGhhbmRsZXJzIG9yXG4gICAgICogICBhdWRpbyBwbGF5YmFjaywgcGVyZm9ybWluZyBub24tY3JpdGljYWwgdXBkYXRlcyBsZXNzIGZyZXF1ZW50bHksIG9yXG4gICAgICogICBpbmNyZWFzaW5nIHRoZSBzaW11bGF0aW9uIHRpbWVzdGVwIChieSBjYWxsaW5nXG4gICAgICogICBgTWFpbkxvb3Auc2V0U2ltdWxhdGlvblRpbWVzdGVwKClgKS4gTm90ZSB0aGF0IHRoaXMgbGFzdCBvcHRpb25cbiAgICAgKiAgIHJlc3VsdHMgaW4gbW9yZSB0aW1lIGJlaW5nIHNpbXVsYXRlZCBwZXIgdXBkYXRlKCkgY2FsbCwgd2hpY2ggY2F1c2VzXG4gICAgICogICB0aGUgYXBwbGljYXRpb24gdG8gYmVoYXZlIG5vbi1kZXRlcm1pbmlzdGljYWxseS5cbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtlbmQucGFuaWM9ZmFsc2VdXG4gICAgICogICBJbmRpY2F0ZXMgd2hldGhlciB0aGUgc2ltdWxhdGlvbiBoYXMgZmFsbGVuIHRvbyBmYXIgYmVoaW5kIHJlYWwgdGltZS5cbiAgICAgKiAgIFNwZWNpZmljYWxseSwgYHBhbmljYCB3aWxsIGJlIGB0cnVlYCBpZiB0b28gbWFueSB1cGRhdGVzIG9jY3VycmVkIGluXG4gICAgICogICBvbmUgZnJhbWUuIEluIG5ldHdvcmtlZCBsb2Nrc3RlcCBhcHBsaWNhdGlvbnMsIHRoZSBhcHBsaWNhdGlvbiBzaG91bGRcbiAgICAgKiAgIHdhaXQgZm9yIHNvbWUgYW1vdW50IG9mIHRpbWUgdG8gc2VlIGlmIHRoZSB1c2VyIGNhbiBjYXRjaCB1cCBiZWZvcmVcbiAgICAgKiAgIGRyb3BwaW5nIHRoZSB1c2VyLiBJbiBuZXR3b3JrZWQgYnV0IG5vbi1sb2Nrc3RlcCBhcHBsaWNhdGlvbnMsIHRoaXNcbiAgICAgKiAgIHR5cGljYWxseSBpbmRpY2F0ZXMgdGhhdCB0aGUgdXNlciBuZWVkcyB0byBiZSBzbmFwcGVkIG9yIGVhc2VkIHRvIHRoZVxuICAgICAqICAgY3VycmVudCBhdXRob3JpdGF0aXZlIHN0YXRlLiBXaGVuIHRoaXMgaGFwcGVucywgaXQgbWF5IGJlIGNvbnZlbmllbnRcbiAgICAgKiAgIHRvIGNhbGwgYE1haW5Mb29wLnJlc2V0RnJhbWVEZWx0YSgpYCB0byBkaXNjYXJkIGFjY3VtdWxhdGVkIHBlbmRpbmdcbiAgICAgKiAgIHVwZGF0ZXMuIEluIG5vbi1uZXR3b3JrZWQgYXBwbGljYXRpb25zLCBpdCBtYXkgYmUgYWNjZXB0YWJsZSB0byBhbGxvd1xuICAgICAqICAgdGhlIGFwcGxpY2F0aW9uIHRvIGtlZXAgcnVubmluZyBmb3IgYXdoaWxlIHRvIHNlZSBpZiBpdCB3aWxsIGNhdGNoIHVwLlxuICAgICAqICAgSG93ZXZlciwgdGhpcyBjb3VsZCBhbHNvIGNhdXNlIHRoZSBhcHBsaWNhdGlvbiB0byBsb29rIGxpa2UgaXQgaXNcbiAgICAgKiAgIHJ1bm5pbmcgdmVyeSBxdWlja2x5IGZvciBhIGZldyBmcmFtZXMgYXMgaXQgdHJhbnNpdGlvbnMgdGhyb3VnaCB0aGVcbiAgICAgKiAgIGludGVybWVkaWF0ZSBzdGF0ZXMuIEFuIGFsdGVybmF0aXZlIHRoYXQgbWF5IGJlIGFjY2VwdGFibGUgaXMgdG9cbiAgICAgKiAgIHNpbXBseSBpZ25vcmUgdGhlIHVuc2ltdWxhdGVkIGVsYXBzZWQgdGltZSBieSBjYWxsaW5nXG4gICAgICogICBgTWFpbkxvb3AucmVzZXRGcmFtZURlbHRhKClgIGV2ZW4gdGhvdWdoIHRoaXMgaW50cm9kdWNlc1xuICAgICAqICAgbm9uLWRldGVybWluaXN0aWMgYmVoYXZpb3IuIEluIGFsbCBjYXNlcywgaWYgdGhlIGFwcGxpY2F0aW9uIHBhbmljc1xuICAgICAqICAgZnJlcXVlbnRseSwgdGhpcyBpcyBhbiBpbmRpY2F0aW9uIHRoYXQgdGhlIG1haW4gbG9vcCBpcyBydW5uaW5nIHRvb1xuICAgICAqICAgc2xvd2x5LiBIb3dldmVyLCBtb3N0IG9mIHRoZSB0aW1lIHRoZSBkcm9wIGluIGZyYW1lIHJhdGUgd2lsbCBwcm9iYWJseVxuICAgICAqICAgYmUgbm90aWNlYWJsZSBiZWZvcmUgYSBwYW5pYyBvY2N1cnMuIFRvIGhlbHAgdGhlIGFwcGxpY2F0aW9uIGNhdGNoIHVwXG4gICAgICogICBhZnRlciBhIHBhbmljIGNhdXNlZCBieSBhIHNwaXJhbCBvZiBkZWF0aCwgdGhlIHNhbWUgc3RlcHMgY2FuIGJlIHRha2VuXG4gICAgICogICB0aGF0IGFyZSBzdWdnZXN0ZWQgYWJvdmUgaWYgdGhlIEZQUyBkcm9wcyB0b28gbG93LlxuICAgICAqL1xuICAgIHNldEVuZDogZnVuY3Rpb24oZnVuKSB7XG4gICAgICAgIGVuZCA9IGZ1biB8fCBlbmQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTdGFydHMgdGhlIG1haW4gbG9vcC5cbiAgICAgKlxuICAgICAqIE5vdGUgdGhhdCB0aGUgYXBwbGljYXRpb24gaXMgbm90IGNvbnNpZGVyZWQgXCJydW5uaW5nXCIgaW1tZWRpYXRlbHkgYWZ0ZXJcbiAgICAgKiB0aGlzIGZ1bmN0aW9uIHJldHVybnM7IHJhdGhlciwgaXQgaXMgY29uc2lkZXJlZCBcInJ1bm5pbmdcIiBhZnRlciB0aGVcbiAgICAgKiBhcHBsaWNhdGlvbiBkcmF3cyBpdHMgZmlyc3QgZnJhbWUuIFRoZSBkaXN0aW5jdGlvbiBpcyB0aGF0IGV2ZW50XG4gICAgICogaGFuZGxlcnMgc2hvdWxkIHJlbWFpbiBwYXVzZWQgdW50aWwgdGhlIGFwcGxpY2F0aW9uIGlzIHJ1bm5pbmcsIGV2ZW5cbiAgICAgKiBhZnRlciBgTWFpbkxvb3Auc3RhcnQoKWAgaXMgY2FsbGVkLiBDaGVjayBgTWFpbkxvb3AuaXNSdW5uaW5nKClgIGZvciB0aGVcbiAgICAgKiBjdXJyZW50IHN0YXR1cy4gVG8gYWN0IGFmdGVyIHRoZSBhcHBsaWNhdGlvbiBzdGFydHMsIHJlZ2lzdGVyIGEgY2FsbGJhY2tcbiAgICAgKiB3aXRoIHJlcXVlc3RBbmltYXRpb25GcmFtZSgpIGFmdGVyIGNhbGxpbmcgdGhpcyBmdW5jdGlvbiBhbmQgZXhlY3V0ZSB0aGVcbiAgICAgKiBhY3Rpb24gaW4gdGhhdCBjYWxsYmFjay4gSXQgaXMgc2FmZSB0byBjYWxsIGBNYWluTG9vcC5zdGFydCgpYCBtdWx0aXBsZVxuICAgICAqIHRpbWVzIGV2ZW4gYmVmb3JlIHRoZSBhcHBsaWNhdGlvbiBzdGFydHMgcnVubmluZyBhbmQgd2l0aG91dCBjYWxsaW5nXG4gICAgICogYE1haW5Mb29wLnN0b3AoKWAgaW4gYmV0d2VlbiwgYWx0aG91Z2ggdGhlcmUgaXMgbm8gcmVhc29uIHRvIGRvIHRoaXM7XG4gICAgICogdGhlIG1haW4gbG9vcCB3aWxsIG9ubHkgc3RhcnQgaWYgaXQgaXMgbm90IGFscmVhZHkgc3RhcnRlZC5cbiAgICAgKlxuICAgICAqIFNlZSBhbHNvIGBNYWluTG9vcC5zdG9wKClgLlxuICAgICAqL1xuICAgIHN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFzdGFydGVkKSB7XG4gICAgICAgICAgICAvLyBTaW5jZSB0aGUgYXBwbGljYXRpb24gZG9lc24ndCBzdGFydCBydW5uaW5nIGltbWVkaWF0ZWx5LCB0cmFja1xuICAgICAgICAgICAgLy8gd2hldGhlciB0aGlzIGZ1bmN0aW9uIHdhcyBjYWxsZWQgYW5kIHVzZSB0aGF0IHRvIGtlZXAgaXQgZnJvbVxuICAgICAgICAgICAgLy8gc3RhcnRpbmcgdGhlIG1haW4gbG9vcCBtdWx0aXBsZSB0aW1lcy5cbiAgICAgICAgICAgIHN0YXJ0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyBJbiB0aGUgbWFpbiBsb29wLCBkcmF3KCkgaXMgY2FsbGVkIGFmdGVyIHVwZGF0ZSgpLCBzbyBpZiB3ZVxuICAgICAgICAgICAgLy8gZW50ZXJlZCB0aGUgbWFpbiBsb29wIGltbWVkaWF0ZWx5LCB3ZSB3b3VsZCBuZXZlciByZW5kZXIgdGhlXG4gICAgICAgICAgICAvLyBpbml0aWFsIHN0YXRlIGJlZm9yZSBhbnkgdXBkYXRlcyBvY2N1ci4gSW5zdGVhZCwgd2UgcnVuIG9uZVxuICAgICAgICAgICAgLy8gZnJhbWUgd2hlcmUgYWxsIHdlIGRvIGlzIGRyYXcsIGFuZCB0aGVuIHN0YXJ0IHRoZSBtYWluIGxvb3Agd2l0aFxuICAgICAgICAgICAgLy8gdGhlIG5leHQgZnJhbWUuXG4gICAgICAgICAgICByYWZIYW5kbGUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24odGltZXN0YW1wKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVuZGVyIHRoZSBpbml0aWFsIHN0YXRlIGJlZm9yZSBhbnkgdXBkYXRlcyBvY2N1ci5cbiAgICAgICAgICAgICAgICBkcmF3KDEpO1xuXG4gICAgICAgICAgICAgICAgLy8gVGhlIGFwcGxpY2F0aW9uIGlzbid0IGNvbnNpZGVyZWQgXCJydW5uaW5nXCIgdW50aWwgdGhlXG4gICAgICAgICAgICAgICAgLy8gYXBwbGljYXRpb24gc3RhcnRzIGRyYXdpbmcuXG4gICAgICAgICAgICAgICAgcnVubmluZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAvLyBSZXNldCB2YXJpYWJsZXMgdGhhdCBhcmUgdXNlZCBmb3IgdHJhY2tpbmcgdGltZSBzbyB0aGF0IHdlXG4gICAgICAgICAgICAgICAgLy8gZG9uJ3Qgc2ltdWxhdGUgdGltZSBwYXNzZWQgd2hpbGUgdGhlIGFwcGxpY2F0aW9uIHdhcyBwYXVzZWQuXG4gICAgICAgICAgICAgICAgbGFzdEZyYW1lVGltZU1zID0gdGltZXN0YW1wO1xuICAgICAgICAgICAgICAgIGxhc3RGcHNVcGRhdGUgPSB0aW1lc3RhbXA7XG4gICAgICAgICAgICAgICAgZnJhbWVzVGhpc1NlY29uZCA9IDA7XG5cbiAgICAgICAgICAgICAgICAvLyBTdGFydCB0aGUgbWFpbiBsb29wLlxuICAgICAgICAgICAgICAgIHJhZkhhbmRsZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTdG9wcyB0aGUgbWFpbiBsb29wLlxuICAgICAqXG4gICAgICogRXZlbnQgaGFuZGxpbmcgYW5kIG90aGVyIGJhY2tncm91bmQgdGFza3Mgc2hvdWxkIGFsc28gYmUgcGF1c2VkIHdoZW4gdGhlXG4gICAgICogbWFpbiBsb29wIGlzIHBhdXNlZC5cbiAgICAgKlxuICAgICAqIE5vdGUgdGhhdCBwYXVzaW5nIGluIG11bHRpcGxheWVyL211bHRpLXVzZXIgYXBwbGljYXRpb25zIHdpbGwgY2F1c2UgdGhlXG4gICAgICogcGxheWVyJ3MvdXNlcidzIGNsaWVudCB0byBiZWNvbWUgb3V0IG9mIHN5bmMuIEluIHRoaXMgY2FzZSB0aGVcbiAgICAgKiBzaW11bGF0aW9uIHNob3VsZCBleGl0LCBvciB0aGUgcGxheWVyL3VzZXIgbmVlZHMgdG8gYmUgc25hcHBlZCB0byB0aGVpclxuICAgICAqIHVwZGF0ZWQgcG9zaXRpb24gd2hlbiB0aGUgbWFpbiBsb29wIGlzIHN0YXJ0ZWQgYWdhaW4uXG4gICAgICpcbiAgICAgKiBTZWUgYWxzbyBgTWFpbkxvb3Auc3RhcnQoKWAgYW5kIGBNYWluTG9vcC5pc1J1bm5pbmcoKWAuXG4gICAgICovXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShyYWZIYW5kbGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB3aGV0aGVyIHRoZSBtYWluIGxvb3AgaXMgY3VycmVudGx5IHJ1bm5pbmcuXG4gICAgICpcbiAgICAgKiBTZWUgYWxzbyBgTWFpbkxvb3Auc3RhcnQoKWAgYW5kIGBNYWluTG9vcC5zdG9wKClgLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKiAgIFdoZXRoZXIgdGhlIG1haW4gbG9vcCBpcyBjdXJyZW50bHkgcnVubmluZy5cbiAgICAgKi9cbiAgICBpc1J1bm5pbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gcnVubmluZztcbiAgICB9LFxufTtcblxuLyoqXG4gKiBUaGUgbWFpbiBsb29wIHRoYXQgcnVucyB1cGRhdGVzIGFuZCByZW5kZXJpbmcuXG4gKlxuICogQHBhcmFtIHtET01IaWdoUmVzVGltZVN0YW1wfSB0aW1lc3RhbXBcbiAqICAgVGhlIGN1cnJlbnQgdGltZXN0YW1wLiBJbiBwcmFjdGljZSB0aGlzIGlzIHN1cHBsaWVkIGJ5XG4gKiAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSBhdCB0aGUgdGltZSB0aGF0IGl0IHN0YXJ0cyB0byBmaXJlIGNhbGxiYWNrcy4gVGhpc1xuICogICBzaG91bGQgb25seSBiZSB1c2VkIGZvciBjb21wYXJpc29uIHRvIG90aGVyIHRpbWVzdGFtcHMgYmVjYXVzZSB0aGUgZXBvY2hcbiAqICAgKGkuZS4gdGhlIFwiemVyb1wiIHRpbWUpIGRlcGVuZHMgb24gdGhlIGVuZ2luZSBydW5uaW5nIHRoaXMgY29kZS4gSW4gZW5naW5lc1xuICogICB0aGF0IHN1cHBvcnQgYERPTUhpZ2hSZXNUaW1lU3RhbXBgIChhbGwgbW9kZXJuIGJyb3dzZXJzIGV4Y2VwdCBpT1MgU2FmYXJpXG4gKiAgIDgpIHRoZSBlcG9jaCBpcyB0aGUgdGltZSB0aGUgcGFnZSBzdGFydGVkIGxvYWRpbmcsIHNwZWNpZmljYWxseVxuICogICBgcGVyZm9ybWFuY2UudGltaW5nLm5hdmlnYXRpb25TdGFydGAuIEV2ZXJ5d2hlcmUgZWxzZSwgaW5jbHVkaW5nIG5vZGUuanMsXG4gKiAgIHRoZSBlcG9jaCBpcyB0aGUgVW5peCBlcG9jaCAoMTk3MC0wMS0wMVQwMDowMDowMFopLlxuICpcbiAqIEBpZ25vcmVcbiAqL1xuZnVuY3Rpb24gYW5pbWF0ZSh0aW1lc3RhbXApIHtcbiAgICAvLyBUaHJvdHRsZSB0aGUgZnJhbWUgcmF0ZSAoaWYgbWluRnJhbWVEZWxheSBpcyBzZXQgdG8gYSBub24temVybyB2YWx1ZSBieVxuICAgIC8vIGBNYWluTG9vcC5zZXRNYXhBbGxvd2VkRlBTKClgKS5cbiAgICBpZiAodGltZXN0YW1wIDwgbGFzdEZyYW1lVGltZU1zICsgbWluRnJhbWVEZWxheSkge1xuICAgICAgICAvLyBSdW4gdGhlIGxvb3AgYWdhaW4gdGhlIG5leHQgdGltZSB0aGUgYnJvd3NlciBpcyByZWFkeSB0byByZW5kZXIuXG4gICAgICAgIHJhZkhhbmRsZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGZyYW1lRGVsdGEgaXMgdGhlIGN1bXVsYXRpdmUgYW1vdW50IG9mIGluLWFwcCB0aW1lIHRoYXQgaGFzbid0IGJlZW5cbiAgICAvLyBzaW11bGF0ZWQgeWV0LiBBZGQgdGhlIHRpbWUgc2luY2UgdGhlIGxhc3QgZnJhbWUuIFdlIG5lZWQgdG8gdHJhY2sgdG90YWxcbiAgICAvLyBub3QteWV0LXNpbXVsYXRlZCB0aW1lIChhcyBvcHBvc2VkIHRvIGp1c3QgdGhlIHRpbWUgZWxhcHNlZCBzaW5jZSB0aGVcbiAgICAvLyBsYXN0IGZyYW1lKSBiZWNhdXNlIG5vdCBhbGwgYWN0dWFsbHkgZWxhcHNlZCB0aW1lIGlzIGd1YXJhbnRlZWQgdG8gYmVcbiAgICAvLyBzaW11bGF0ZWQgZWFjaCBmcmFtZS4gU2VlIHRoZSBjb21tZW50cyBiZWxvdyBmb3IgZGV0YWlscy5cbiAgICBmcmFtZURlbHRhICs9IHRpbWVzdGFtcCAtIGxhc3RGcmFtZVRpbWVNcztcbiAgICBsYXN0RnJhbWVUaW1lTXMgPSB0aW1lc3RhbXA7XG5cbiAgICAvLyBSdW4gYW55IHVwZGF0ZXMgdGhhdCBhcmUgbm90IGRlcGVuZGVudCBvbiB0aW1lIGluIHRoZSBzaW11bGF0aW9uLiBTZWVcbiAgICAvLyBgTWFpbkxvb3Auc2V0QmVnaW4oKWAgZm9yIGFkZGl0aW9uYWwgZGV0YWlscyBvbiBob3cgdG8gdXNlIHRoaXMuXG4gICAgYmVnaW4odGltZXN0YW1wLCBmcmFtZURlbHRhKTtcblxuICAgIC8vIFVwZGF0ZSB0aGUgZXN0aW1hdGUgb2YgdGhlIGZyYW1lIHJhdGUsIGBmcHNgLiBFdmVyeSBzZWNvbmQsIHRoZSBudW1iZXJcbiAgICAvLyBvZiBmcmFtZXMgdGhhdCBvY2N1cnJlZCBpbiB0aGF0IHNlY29uZCBhcmUgaW5jbHVkZWQgaW4gYW4gZXhwb25lbnRpYWxcbiAgICAvLyBtb3ZpbmcgYXZlcmFnZSBvZiBhbGwgZnJhbWVzIHBlciBzZWNvbmQsIHdpdGggYW4gYWxwaGEgb2YgMC4yNS4gVGhpc1xuICAgIC8vIG1lYW5zIHRoYXQgbW9yZSByZWNlbnQgc2Vjb25kcyBhZmZlY3QgdGhlIGVzdGltYXRlZCBmcmFtZSByYXRlIG1vcmUgdGhhblxuICAgIC8vIG9sZGVyIHNlY29uZHMuXG4gICAgaWYgKHRpbWVzdGFtcCA+IGxhc3RGcHNVcGRhdGUgKyAxMDAwKSB7XG4gICAgICAgIC8vIENvbXB1dGUgdGhlIG5ldyBleHBvbmVudGlhbCBtb3ZpbmcgYXZlcmFnZSB3aXRoIGFuIGFscGhhIG9mIDAuMjUuXG4gICAgICAgIC8vIFVzaW5nIGNvbnN0YW50cyBpbmxpbmUgaXMgb2theSBoZXJlLlxuICAgICAgICBmcHMgPSAwLjI1ICogZnJhbWVzVGhpc1NlY29uZCArIDAuNzUgKiBmcHM7XG5cbiAgICAgICAgbGFzdEZwc1VwZGF0ZSA9IHRpbWVzdGFtcDtcbiAgICAgICAgZnJhbWVzVGhpc1NlY29uZCA9IDA7XG4gICAgfVxuICAgIGZyYW1lc1RoaXNTZWNvbmQrKztcblxuICAgIC8qXG4gICAgICogQSBuYWl2ZSB3YXkgdG8gbW92ZSBhbiBvYmplY3QgYWxvbmcgaXRzIFgtYXhpcyBtaWdodCBiZSB0byB3cml0ZSBhIG1haW5cbiAgICAgKiBsb29wIGNvbnRhaW5pbmcgdGhlIHN0YXRlbWVudCBgb2JqLnggKz0gMTA7YCB3aGljaCB3b3VsZCBtb3ZlIHRoZSBvYmplY3RcbiAgICAgKiAxMCB1bml0cyBwZXIgZnJhbWUuIFRoaXMgYXBwcm9hY2ggc3VmZmVycyBmcm9tIHRoZSBpc3N1ZSB0aGF0IGl0IGlzXG4gICAgICogZGVwZW5kZW50IG9uIHRoZSBmcmFtZSByYXRlLiBJbiBvdGhlciB3b3JkcywgaWYgeW91ciBhcHBsaWNhdGlvbiBpc1xuICAgICAqIHJ1bm5pbmcgc2xvd2x5ICh0aGF0IGlzLCBmZXdlciBmcmFtZXMgcGVyIHNlY29uZCksIHlvdXIgb2JqZWN0IHdpbGwgYWxzb1xuICAgICAqIGFwcGVhciB0byBtb3ZlIHNsb3dseSwgd2hlcmVhcyBpZiB5b3VyIGFwcGxpY2F0aW9uIGlzIHJ1bm5pbmcgcXVpY2tseVxuICAgICAqICh0aGF0IGlzLCBtb3JlIGZyYW1lcyBwZXIgc2Vjb25kKSwgeW91ciBvYmplY3Qgd2lsbCBhcHBlYXIgdG8gbW92ZVxuICAgICAqIHF1aWNrbHkuIFRoaXMgaXMgdW5kZXNpcmFibGUsIGVzcGVjaWFsbHkgaW4gbXVsdGlwbGF5ZXIvbXVsdGktdXNlclxuICAgICAqIGFwcGxpY2F0aW9ucy5cbiAgICAgKlxuICAgICAqIE9uZSBzb2x1dGlvbiBpcyB0byBtdWx0aXBseSB0aGUgc3BlZWQgYnkgdGhlIGFtb3VudCBvZiB0aW1lIHRoYXQgaGFzXG4gICAgICogcGFzc2VkIGJldHdlZW4gcmVuZGVyaW5nIGZyYW1lcy4gRm9yIGV4YW1wbGUsIGlmIHlvdSB3YW50IHlvdXIgb2JqZWN0IHRvXG4gICAgICogbW92ZSA2MDAgdW5pdHMgcGVyIHNlY29uZCwgeW91IG1pZ2h0IHdyaXRlIGBvYmoueCArPSA2MDAgKiBkZWx0YWAsIHdoZXJlXG4gICAgICogYGRlbHRhYCBpcyB0aGUgdGltZSBwYXNzZWQgc2luY2UgdGhlIGxhc3QgZnJhbWUuIChGb3IgY29udmVuaWVuY2UsIGxldCdzXG4gICAgICogbW92ZSB0aGlzIHN0YXRlbWVudCB0byBhbiB1cGRhdGUoKSBmdW5jdGlvbiB0aGF0IHRha2VzIGBkZWx0YWAgYXMgYVxuICAgICAqIHBhcmFtZXRlci4pIFRoaXMgd2F5LCB5b3VyIG9iamVjdCB3aWxsIG1vdmUgYSBjb25zdGFudCBkaXN0YW5jZSBvdmVyXG4gICAgICogdGltZS4gSG93ZXZlciwgYXQgbG93IGZyYW1lIHJhdGVzIGFuZCBoaWdoIHNwZWVkcywgeW91ciBvYmplY3Qgd2lsbCBtb3ZlXG4gICAgICogbGFyZ2UgZGlzdGFuY2VzIGV2ZXJ5IGZyYW1lLCB3aGljaCBjYW4gY2F1c2UgaXQgdG8gZG8gc3RyYW5nZSB0aGluZ3NcbiAgICAgKiBzdWNoIGFzIG1vdmUgdGhyb3VnaCB3YWxscy4gQWRkaXRpb25hbGx5LCB3ZSB3b3VsZCBsaWtlIG91ciBwcm9ncmFtIHRvXG4gICAgICogYmUgZGV0ZXJtaW5pc3RpYy4gVGhhdCBpcywgZXZlcnkgdGltZSB3ZSBydW4gdGhlIGFwcGxpY2F0aW9uIHdpdGggdGhlXG4gICAgICogc2FtZSBpbnB1dCwgd2Ugd291bGQgbGlrZSBleGFjdGx5IHRoZSBzYW1lIG91dHB1dC4gSWYgdGhlIHRpbWUgYmV0d2VlblxuICAgICAqIGZyYW1lcyAodGhlIGBkZWx0YWApIHZhcmllcywgb3VyIG91dHB1dCB3aWxsIGRpdmVyZ2UgdGhlIGxvbmdlciB0aGVcbiAgICAgKiBwcm9ncmFtIHJ1bnMgZHVlIHRvIGFjY3VtdWxhdGVkIHJvdW5kaW5nIGVycm9ycywgZXZlbiBhdCBub3JtYWwgZnJhbWVcbiAgICAgKiByYXRlcy5cbiAgICAgKlxuICAgICAqIEEgYmV0dGVyIHNvbHV0aW9uIGlzIHRvIHNlcGFyYXRlIHRoZSBhbW91bnQgb2YgdGltZSBzaW11bGF0ZWQgaW4gZWFjaFxuICAgICAqIHVwZGF0ZSgpIGZyb20gdGhlIGFtb3VudCBvZiB0aW1lIGJldHdlZW4gZnJhbWVzLiBPdXIgdXBkYXRlKCkgZnVuY3Rpb25cbiAgICAgKiBkb2Vzbid0IG5lZWQgdG8gY2hhbmdlOyB3ZSBqdXN0IG5lZWQgdG8gY2hhbmdlIHRoZSBkZWx0YSB3ZSBwYXNzIHRvIGl0XG4gICAgICogc28gdGhhdCBlYWNoIHVwZGF0ZSgpIHNpbXVsYXRlcyBhIGZpeGVkIGFtb3VudCBvZiB0aW1lICh0aGF0IGlzLCBgZGVsdGFgXG4gICAgICogc2hvdWxkIGhhdmUgdGhlIHNhbWUgdmFsdWUgZWFjaCB0aW1lIHVwZGF0ZSgpIGlzIGNhbGxlZCkuIFRoZSB1cGRhdGUoKVxuICAgICAqIGZ1bmN0aW9uIGNhbiBiZSBydW4gbXVsdGlwbGUgdGltZXMgcGVyIGZyYW1lIGlmIG5lZWRlZCB0byBzaW11bGF0ZSB0aGVcbiAgICAgKiB0b3RhbCBhbW91bnQgb2YgdGltZSBwYXNzZWQgc2luY2UgdGhlIGxhc3QgZnJhbWUuIChJZiB0aGUgdGltZSB0aGF0IGhhc1xuICAgICAqIHBhc3NlZCBzaW5jZSB0aGUgbGFzdCBmcmFtZSBpcyBsZXNzIHRoYW4gdGhlIGZpeGVkIHNpbXVsYXRpb24gdGltZSwgd2VcbiAgICAgKiBqdXN0IHdvbid0IHJ1biBhbiB1cGRhdGUoKSB1bnRpbCB0aGUgdGhlIG5leHQgZnJhbWUuIElmIHRoZXJlIGlzXG4gICAgICogdW5zaW11bGF0ZWQgdGltZSBsZWZ0IG92ZXIgdGhhdCBpcyBsZXNzIHRoYW4gb3VyIHRpbWVzdGVwLCB3ZSdsbCBqdXN0XG4gICAgICogbGVhdmUgaXQgdG8gYmUgc2ltdWxhdGVkIGR1cmluZyB0aGUgbmV4dCBmcmFtZS4pIFRoaXMgYXBwcm9hY2ggYXZvaWRzXG4gICAgICogaW5jb25zaXN0ZW50IHJvdW5kaW5nIGVycm9ycyBhbmQgZW5zdXJlcyB0aGF0IHRoZXJlIGFyZSBubyBnaWFudCBsZWFwc1xuICAgICAqIHRocm91Z2ggd2FsbHMgYmV0d2VlbiBmcmFtZXMuXG4gICAgICpcbiAgICAgKiBUaGF0IGlzIHdoYXQgaXMgZG9uZSBiZWxvdy4gSXQgaW50cm9kdWNlcyBhIG5ldyBwcm9ibGVtLCBidXQgaXQgaXMgYVxuICAgICAqIG1hbmFnZWFibGUgb25lOiBpZiB0aGUgYW1vdW50IG9mIHRpbWUgc3BlbnQgc2ltdWxhdGluZyBpcyBjb25zaXN0ZW50bHlcbiAgICAgKiBsb25nZXIgdGhhbiB0aGUgYW1vdW50IG9mIHRpbWUgYmV0d2VlbiBmcmFtZXMsIHRoZSBhcHBsaWNhdGlvbiBjb3VsZFxuICAgICAqIGZyZWV6ZSBhbmQgY3Jhc2ggaW4gYSBzcGlyYWwgb2YgZGVhdGguIFRoaXMgd29uJ3QgaGFwcGVuIGFzIGxvbmcgYXMgdGhlXG4gICAgICogZml4ZWQgc2ltdWxhdGlvbiB0aW1lIGlzIHNldCB0byBhIHZhbHVlIHRoYXQgaXMgaGlnaCBlbm91Z2ggdGhhdFxuICAgICAqIHVwZGF0ZSgpIGNhbGxzIHVzdWFsbHkgdGFrZSBsZXNzIHRpbWUgdGhhbiB0aGUgYW1vdW50IG9mIHRpbWUgdGhleSdyZVxuICAgICAqIHNpbXVsYXRpbmcuIElmIGl0IGRvZXMgc3RhcnQgdG8gaGFwcGVuIGFueXdheSwgc2VlIGBNYWluTG9vcC5zZXRFbmQoKWBcbiAgICAgKiBmb3IgYSBkaXNjdXNzaW9uIG9mIHdheXMgdG8gc3RvcCBpdC5cbiAgICAgKlxuICAgICAqIEFkZGl0aW9uYWxseSwgc2VlIGBNYWluTG9vcC5zZXRVcGRhdGUoKWAgZm9yIGEgZGlzY3Vzc2lvbiBvZiBwZXJmb3JtYW5jZVxuICAgICAqIGNvbnNpZGVyYXRpb25zLlxuICAgICAqXG4gICAgICogRnVydGhlciByZWFkaW5nIGZvciB0aG9zZSBpbnRlcmVzdGVkOlxuICAgICAqXG4gICAgICogLSBodHRwOi8vZ2FtZXByb2dyYW1taW5ncGF0dGVybnMuY29tL2dhbWUtbG9vcC5odG1sXG4gICAgICogLSBodHRwOi8vZ2FmZmVyb25nYW1lcy5jb20vZ2FtZS1waHlzaWNzL2ZpeC15b3VyLXRpbWVzdGVwL1xuICAgICAqIC0gaHR0cHM6Ly9nYW1lYWxjaGVtaXN0LndvcmRwcmVzcy5jb20vMjAxMy8wMy8xNi90aG91Z2h0cy1vbi10aGUtamF2YXNjcmlwdC1nYW1lLWxvb3AvXG4gICAgICogLSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0dhbWVzL0FuYXRvbXlcbiAgICAgKi9cbiAgICBudW1VcGRhdGVTdGVwcyA9IDA7XG4gICAgd2hpbGUgKGZyYW1lRGVsdGEgPj0gc2ltdWxhdGlvblRpbWVzdGVwKSB7XG4gICAgICAgIHVwZGF0ZShzaW11bGF0aW9uVGltZXN0ZXApO1xuICAgICAgICBmcmFtZURlbHRhIC09IHNpbXVsYXRpb25UaW1lc3RlcDtcblxuICAgICAgICAvKlxuICAgICAgICAgKiBTYW5pdHkgY2hlY2s6IGJhaWwgaWYgd2UgcnVuIHRoZSBsb29wIHRvbyBtYW55IHRpbWVzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBPbmUgd2F5IHRoaXMgY291bGQgaGFwcGVuIGlzIGlmIHVwZGF0ZSgpIHRha2VzIGxvbmdlciB0byBydW4gdGhhblxuICAgICAgICAgKiB0aGUgdGltZSBpdCBzaW11bGF0ZXMsIHRoZXJlYnkgY2F1c2luZyBhIHNwaXJhbCBvZiBkZWF0aC4gRm9yIHdheXNcbiAgICAgICAgICogdG8gYXZvaWQgdGhpcywgc2VlIGBNYWluTG9vcC5zZXRFbmQoKWAuIEFub3RoZXIgd2F5IHRoaXMgY291bGRcbiAgICAgICAgICogaGFwcGVuIGlzIGlmIHRoZSBicm93c2VyIHRocm90dGxlcyBzZXJ2aW5nIGZyYW1lcywgd2hpY2ggdHlwaWNhbGx5XG4gICAgICAgICAqIG9jY3VycyB3aGVuIHRoZSB0YWIgaXMgaW4gdGhlIGJhY2tncm91bmQgb3IgdGhlIGRldmljZSBiYXR0ZXJ5IGlzXG4gICAgICAgICAqIGxvdy4gQW4gZXZlbnQgb3V0c2lkZSBvZiB0aGUgbWFpbiBsb29wIHN1Y2ggYXMgYXVkaW8gcHJvY2Vzc2luZyBvclxuICAgICAgICAgKiBzeW5jaHJvbm91cyByZXNvdXJjZSByZWFkcyBjb3VsZCBhbHNvIGNhdXNlIHRoZSBhcHBsaWNhdGlvbiB0byBoYW5nXG4gICAgICAgICAqIHRlbXBvcmFyaWx5IGFuZCBhY2N1bXVsYXRlIG5vdC15ZXQtc2ltdWxhdGVkIHRpbWUgYXMgYSByZXN1bHQuXG4gICAgICAgICAqXG4gICAgICAgICAqIDI0MCBpcyBjaG9zZW4gYmVjYXVzZSwgZm9yIGFueSBzYW5lIHZhbHVlIG9mIHNpbXVsYXRpb25UaW1lc3RlcCwgMjQwXG4gICAgICAgICAqIHVwZGF0ZXMgd2lsbCBzaW11bGF0ZSBhdCBsZWFzdCBvbmUgc2Vjb25kLCBhbmQgaXQgd2lsbCBzaW11bGF0ZSBmb3VyXG4gICAgICAgICAqIHNlY29uZHMgd2l0aCB0aGUgZGVmYXVsdCB2YWx1ZSBvZiBzaW11bGF0aW9uVGltZXN0ZXAuIChTYWZhcmlcbiAgICAgICAgICogbm90aWZpZXMgdXNlcnMgdGhhdCB0aGUgc2NyaXB0IGlzIHRha2luZyB0b28gbG9uZyB0byBydW4gaWYgaXQgdGFrZXNcbiAgICAgICAgICogbW9yZSB0aGFuIGZpdmUgc2Vjb25kcy4pXG4gICAgICAgICAqXG4gICAgICAgICAqIElmIHRoZXJlIGFyZSBtb3JlIHVwZGF0ZXMgdG8gcnVuIGluIGEgZnJhbWUgdGhhbiB0aGlzLCB0aGVcbiAgICAgICAgICogYXBwbGljYXRpb24gd2lsbCBhcHBlYXIgdG8gc2xvdyBkb3duIHRvIHRoZSB1c2VyIHVudGlsIGl0IGNhdGNoZXNcbiAgICAgICAgICogYmFjayB1cC4gSW4gbmV0d29ya2VkIGFwcGxpY2F0aW9ucyB0aGlzIHdpbGwgdXN1YWxseSBjYXVzZSB0aGUgdXNlclxuICAgICAgICAgKiB0byBnZXQgb3V0IG9mIHN5bmMgd2l0aCB0aGVpciBwZWVycywgYnV0IGlmIHRoZSB1cGRhdGVzIGFyZSB0YWtpbmdcbiAgICAgICAgICogdGhpcyBsb25nIGFscmVhZHksIHRoZXkncmUgcHJvYmFibHkgYWxyZWFkeSBvdXQgb2Ygc3luYy5cbiAgICAgICAgICovXG4gICAgICAgIGlmICgrK251bVVwZGF0ZVN0ZXBzID49IDI0MCkge1xuICAgICAgICAgICAgcGFuaWMgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgICAqIFJlbmRlciB0aGUgc2NyZWVuLiBXZSBkbyB0aGlzIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB1cGRhdGUoKSBoYXMgcnVuXG4gICAgICogZHVyaW5nIHRoaXMgZnJhbWUgYmVjYXVzZSBpdCBpcyBwb3NzaWJsZSB0byBpbnRlcnBvbGF0ZSBiZXR3ZWVuIHVwZGF0ZXNcbiAgICAgKiB0byBtYWtlIHRoZSBmcmFtZSByYXRlIGFwcGVhciBmYXN0ZXIgdGhhbiB1cGRhdGVzIGFyZSBhY3R1YWxseVxuICAgICAqIGhhcHBlbmluZy4gU2VlIGBNYWluTG9vcC5zZXREcmF3KClgIGZvciBhbiBleHBsYW5hdGlvbiBvZiBob3cgdG8gZG9cbiAgICAgKiB0aGF0LlxuICAgICAqXG4gICAgICogV2UgZHJhdyBhZnRlciB1cGRhdGluZyBiZWNhdXNlIHdlIHdhbnQgdGhlIHNjcmVlbiB0byByZWZsZWN0IGEgc3RhdGUgb2ZcbiAgICAgKiB0aGUgYXBwbGljYXRpb24gdGhhdCBpcyBhcyB1cC10by1kYXRlIGFzIHBvc3NpYmxlLiAoYE1haW5Mb29wLnN0YXJ0KClgXG4gICAgICogZHJhd3MgdGhlIHZlcnkgZmlyc3QgZnJhbWUgaW4gdGhlIGFwcGxpY2F0aW9uJ3MgaW5pdGlhbCBzdGF0ZSwgYmVmb3JlXG4gICAgICogYW55IHVwZGF0ZXMgaGF2ZSBvY2N1cnJlZC4pIFNvbWUgc291cmNlcyBzcGVjdWxhdGUgdGhhdCByZW5kZXJpbmdcbiAgICAgKiBlYXJsaWVyIGluIHRoZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgY2FsbGJhY2sgY2FuIGdldCB0aGUgc2NyZWVuIHBhaW50ZWRcbiAgICAgKiBmYXN0ZXI7IHRoaXMgaXMgbW9zdGx5IG5vdCB0cnVlLCBhbmQgZXZlbiB3aGVuIGl0IGlzLCBpdCdzIHVzdWFsbHkganVzdFxuICAgICAqIGEgdHJhZGUtb2ZmIGJldHdlZW4gcmVuZGVyaW5nIHRoZSBjdXJyZW50IGZyYW1lIHNvb25lciBhbmQgcmVuZGVyaW5nIHRoZVxuICAgICAqIG5leHQgZnJhbWUgbGF0ZXIuXG4gICAgICpcbiAgICAgKiBTZWUgYE1haW5Mb29wLnNldERyYXcoKWAgZm9yIGRldGFpbHMgYWJvdXQgZHJhdygpIGl0c2VsZi5cbiAgICAgKi9cbiAgICBkcmF3KGZyYW1lRGVsdGEgLyBzaW11bGF0aW9uVGltZXN0ZXApO1xuXG4gICAgLy8gUnVuIGFueSB1cGRhdGVzIHRoYXQgYXJlIG5vdCBkZXBlbmRlbnQgb24gdGltZSBpbiB0aGUgc2ltdWxhdGlvbi4gU2VlXG4gICAgLy8gYE1haW5Mb29wLnNldEVuZCgpYCBmb3IgYWRkaXRpb25hbCBkZXRhaWxzIG9uIGhvdyB0byB1c2UgdGhpcy5cbiAgICBlbmQoZnBzLCBwYW5pYyk7XG5cbiAgICBwYW5pYyA9IGZhbHNlO1xuXG4gICAgLy8gUnVuIHRoZSBsb29wIGFnYWluIHRoZSBuZXh0IHRpbWUgdGhlIGJyb3dzZXIgaXMgcmVhZHkgdG8gcmVuZGVyLlxuICAgIHJhZkhhbmRsZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbn1cblxuLy8gQU1EIHN1cHBvcnRcbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUocm9vdC5NYWluTG9vcCk7XG59XG4vLyBDb21tb25KUyBzdXBwb3J0XG5lbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHJvb3QuTWFpbkxvb3A7XG59XG5cbn0pKCk7XG4iLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgTWFpbkxvb3AgZnJvbSAnLi4vZXh0ZXJuYWwvbWFpbmxvb3AuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluTG9vcExvb3BNYW5hZ2VyIHtcbiAgICBzZXRVcGRhdGUodXBkYXRlTWV0aG9kIDogKGRlbHRhIDogbnVtYmVyKSA9PiB2b2lkKSA6IE1haW5Mb29wTG9vcE1hbmFnZXIge1xuICAgICAgICBNYWluTG9vcC5zZXRVcGRhdGUodXBkYXRlTWV0aG9kKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICBzZXRSZW5kZXIocmVuZGVyTWV0aG9kIDogKGludGVycG9sYXRpb25QZXJjZW50YWdlIDogbnVtYmVyKSA9PiB2b2lkKSA6IE1haW5Mb29wTG9vcE1hbmFnZXIge1xuICAgICAgICBNYWluTG9vcC5zZXREcmF3KHJlbmRlck1ldGhvZCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgc3RhcnQoKSA6IHZvaWQge1xuICAgICAgICBNYWluTG9vcC5zdGFydCgpO1xuICAgIH1cbn0iLCIvKiBAZmxvdyovXG5cbmltcG9ydCBUaHJlZVJlbmRlcmVyTWFuYWdlciAgZnJvbSAnLi4vbG9naWMvdGhyZWUtcmVuZGVyZXItbWFuYWdlcic7XG5pbXBvcnQgVGhyZWVTY2VuZU1hbmFnZXIgICAgIGZyb20gJy4uL2xvZ2ljL3RocmVlLXNjZW5lLW1hbmFnZXInO1xuaW1wb3J0IFRocmVlTWVzaE1hbmFnZXIgICAgICBmcm9tICcuLi9sb2dpYy90aHJlZS1tZXNoLW1hbmFnZXInO1xuaW1wb3J0IFRocmVlT2JqZWN0TWVzaExvYWRlciBmcm9tICcuLi9sb2dpYy90aHJlZS1vYmplY3QtbWVzaC1sb2FkZXInO1xuaW1wb3J0IFFXZXN0QWpheExvYWRlciAgICAgICBmcm9tICcuLi9sb2dpYy9xd2VzdC1hamF4LWxvYWRlcic7XG5pbXBvcnQgTGV2ZWxMb2FkZXIgICAgICAgICAgIGZyb20gJy4uL2xvZ2ljL2xldmVsLWxvYWRlcic7XG5pbXBvcnQgeyBFbnRpdHlNYW5hZ2VyIH0gICAgIGZyb20gJ2dnLWVudGl0aWVzJztcbmltcG9ydCBNYWluTG9vcExvb3BNYW5hZ2VyICAgZnJvbSAnLi4vbG9naWMvbWFpbmxvb3AtbG9vcC1tYW5hZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIHJlbmRlcmVyTWFuYWdlcigpIDogSVJlbmRlcmVyTWFuYWdlciB7IHJldHVybiBuZXcgVGhyZWVSZW5kZXJlck1hbmFnZXIoKTsgfSxcblxuICAgIHNjZW5lTWFuYWdlcigpIDogSVNjZW5lTWFuYWdlciB7IHJldHVybiBuZXcgVGhyZWVTY2VuZU1hbmFnZXIoKTsgfSxcbiAgICBcbiAgICBtZXNoTWFuYWdlcigpIDogSU1lc2hNYW5hZ2VyIHsgcmV0dXJuIG5ldyBUaHJlZU1lc2hNYW5hZ2VyKCk7IH0sXG5cbiAgICBsZXZlbExvYWRlcigpIDogSUxldmVsTG9hZGVyIHsgcmV0dXJuIG5ldyBMZXZlbExvYWRlcihuZXcgUVdlc3RBamF4TG9hZGVyKCkpOyB9LFxuICAgIFxuICAgIGVudGl0eU1hbmFnZXIoKSA6IElFbnRpdHlNYW5hZ2VyIHsgcmV0dXJuIG5ldyBFbnRpdHlNYW5hZ2VyKCk7IH0sXG4gICAgXG4gICAgbG9vcE1hbmFnZXIoKSA6IElMb29wTWFuYWdlciB7IHJldHVybiBuZXcgTWFpbkxvb3BMb29wTWFuYWdlcigpOyB9LFxuICAgIFxuICAgIG1lc2hMb2FkZXIoKSA6IElNZXNoTG9hZGVyIHsgcmV0dXJuIG5ldyBUaHJlZU9iamVjdE1lc2hMb2FkZXIoKTsgfVxufTsiLCIvKiBAZmxvdyAqL1xuXG5leHBvcnQgY29uc3QgRmxhdFNoYWRpbmcgPSAxO1xuZXhwb3J0IGNvbnN0IFNtb290aFNoYWRpbmcgPSAyOyIsIi8qIEBmbG93ICovXG5cbmltcG9ydCBESSBmcm9tICcuL3V0aWxpdHkvZGVwZW5kZW5jeS1pbmplY3Rvcic7XG5cbmltcG9ydCB7IEZsYXRTaGFkaW5nIH0gZnJvbSAnLi9jb25zdGFudHMvc2hhZGluZyc7XG5cbndpbmRvdy5vbmxvYWQgPSBhc3luYyBmdW5jdGlvbigpIHtcbiAgICBjb25zdCBsZXZlbExvYWRlciA9IERJLmxldmVsTG9hZGVyKCk7XG4gICAgY29uc3QgbGV2ZWwgICAgICAgPSBhd2FpdCBsZXZlbExvYWRlci5sb2FkTGV2ZWwoJ2xldmVscy9sZXZlbC1vbmUuanNvbicpO1xuICAgIFxuICAgIGNvbnN0IG1lc2hMb2FkZXIgID0gREkubWVzaExvYWRlcigpO1xuICAgIGNvbnN0IG1lc2hNYW5hZ2VyID0gREkubWVzaE1hbmFnZXIoKTtcbiAgICBjb25zdCBtZXNoSWQgICAgICA9IG1lc2hNYW5hZ2VyLmFkZE1lc2goYXdhaXQgbWVzaExvYWRlci5sb2FkKCdtZXNoZXMvJyArIGxldmVsLm1lc2gsIHsgc2hhZGluZyA6IEZsYXRTaGFkaW5nIH0pKTtcbiAgICBcbiAgICBjb25zdCBzY2VuZU1hbmFnZXIgPSBESS5zY2VuZU1hbmFnZXIoKTtcbiAgICBjb25zdCBzY2VuZUlkICAgICAgPSBzY2VuZU1hbmFnZXIuY3JlYXRlU2NlbmUoKTtcbiAgICBcbiAgICBzY2VuZU1hbmFnZXIuYWRkVG9TY2VuZShzY2VuZUlkLCBtZXNoTWFuYWdlci5nZXRNZXNoKG1lc2hJZCkpO1xuICAgIHNjZW5lTWFuYWdlci5hZGRBbWJpZW50TGlnaHRUb1NjZW5lKHNjZW5lSWQsIDB4MTAxMDMwKTtcbiBcdHNjZW5lTWFuYWdlci5hZGREaXJlY3Rpb25hbExpZ2h0VG9TY2VuZShzY2VuZUlkLCAweGZmZWVkZCwgMCwgMCwgMSk7XG5cbiAgICBjb25zdCBlbnRpdHlNYW5hZ2VyICAgPSBESS5lbnRpdHlNYW5hZ2VyKCk7XG4gICAgY29uc3QgcmVuZGVyZXJNYW5hZ2VyID0gREkucmVuZGVyZXJNYW5hZ2VyKCk7XG4gICAgY29uc3QgbG9vcE1hbmFnZXIgICAgID0gREkubG9vcE1hbmFnZXIoKTtcbiAgICBcbiAgICB2YXIgbWVzaElzQWRkZWQgPSB0cnVlO1xuICAgIFxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIGlmIChtZXNoSXNBZGRlZCkge1xuICAgICAgICAgICAgc2NlbmVNYW5hZ2VyLnJlbW92ZUZyb21TY2VuZShzY2VuZUlkLCBtZXNoTWFuYWdlci5nZXRNZXNoKG1lc2hJZCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2NlbmVNYW5hZ2VyLmFkZFRvU2NlbmUoc2NlbmVJZCwgbWVzaE1hbmFnZXIuZ2V0TWVzaChtZXNoSWQpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbWVzaElzQWRkZWQgPSAhbWVzaElzQWRkZWQ7XG4gICAgfSk7XG4gICAgXG4gICAgbG9vcE1hbmFnZXIuc2V0VXBkYXRlKGRlbHRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbWVzaE1hbmFnZXIuZ2V0TWVzaChtZXNoSWQpLnJvdGF0aW9uLnkgKz0gMC4wMDEgKiBkZWx0YTtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5TWFuYWdlci5vbkxvZ2ljKGRlbHRhKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgLnNldFJlbmRlcihpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSA9PiByZW5kZXJlck1hbmFnZXIucmVuZGVyKHNjZW5lTWFuYWdlci5nZXRTY2VuZShzY2VuZUlkKSwgaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UpKVxuICAgICAgICAgICAgICAgLnN0YXJ0KCk7XG59OyJdLCJuYW1lcyI6WyJwaW5reXN3ZWFyIiwicmVxdWlyZSQkMSIsInJlcXVpcmUkJDAiLCJNYWluTG9vcCIsIlFXZXN0QWpheExvYWRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBSXFCLG9CQUFvQjtjQUFwQixvQkFBb0IsR0FJdkI7MkNBSkcsb0JBQW9COzthQUs3QixDQUFDLFFBQVEsR0FBRyxJQUFJLEtBQUssQ0FBQyxhQUFhLEVBQUU7YUFDckMsQ0FBQyxNQUFNLEdBQUssSUFBSSxLQUFLLENBQUMsaUJBQWlCLEVBQUU7O2FBRXpDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUM7O2lCQUVwRCxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7O2FBRS9DLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBRTthQUN2QixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUU7O2FBRXZCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQzs7OzhCQWZ2QyxvQkFBb0I7O2dDQWtCOUIsS0FBbUIsRUFBRSx1QkFBZ0MsRUFBUztpQkFDN0QsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDOzs7WUFuQjNCLG9CQUFvQjs7O0tDQXBCLGlCQUFpQjtjQUFqQixpQkFBaUIsR0FHcEI7MkNBSEcsaUJBQWlCOzthQUkxQixDQUFDLE1BQU0sR0FBRyxFQUFFOzs7OEJBSkgsaUJBQWlCOzt1Q0FPWDs7b0JBRVosSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDOzs7O2tDQUd6QyxPQUFnQixFQUFnQjtvQkFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7Ozs7b0NBR3BCLE9BQWdCLEVBQUUsTUFBdUIsRUFBUztpQkFDckQsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQzs7OztnREFHYixPQUFnQixFQUFFLEtBQWMsRUFBUztpQkFDeEQsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7OztvREFHaEMsT0FBZ0IsRUFBRSxLQUFjLEVBQUUsQ0FBVSxFQUFFLENBQVUsRUFBRSxDQUFVLEVBQVM7aUJBQzlGLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7a0JBQzdDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7aUJBRXBCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7Ozs7eUNBR25CLE9BQWdCLEVBQUUsTUFBdUIsRUFBUztpQkFDMUQsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7O1lBaEN0QixpQkFBaUI7OztLQ0FqQixnQkFBZ0I7Y0FBaEIsZ0JBQWdCLEdBR25COzJDQUhHLGdCQUFnQjs7YUFJekIsQ0FBQyxNQUFNLEdBQUcsRUFBRTs7OzhCQUpILGdCQUFnQjs7aUNBT3pCLE1BQW1CLEVBQVc7b0JBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7Ozs7aUNBRy9CLE1BQWUsRUFBZTtvQkFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7OztZQVpiLGdCQUFnQjs7O0tDQWhCLHFCQUFxQjtjQUFyQixxQkFBcUIsR0FHeEI7MkNBSEcscUJBQXFCOzthQUk5QixDQUFDLE1BQU0sR0FBSSxJQUFJLEtBQUssQ0FBQyxZQUFZLEVBQUU7Ozs4QkFKMUIscUJBQXFCOztzQ0FPekI7Ozs7Ozs7OzhCQU1SLElBQWEsRUFBRSxPQUFpQixFQUFZO2lCQUN2QyxJQUFJLEdBQUcsSUFBSTs7aUJBRVgsT0FBTyxHQUFHLENBQUMsT0FBTyxJQUFJLEVBQUcsQ0FBQSxDQUFFLE9BQU87O29CQUVqQyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUs7cUJBQ2hDO3lCQUNJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBQSxHQUFHO2dDQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUM7c0JBQUEsRUFBRSxVQUFBLElBQUk7Z0NBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7c0JBQUEsRUFBRSxVQUFBLEdBQUc7Z0NBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQztzQkFBQSxDQUFDO2tCQUNqRyxDQUFDLE9BQU8sS0FBSyxFQUFFOzJCQUNOLENBQUMsS0FBSyxDQUFDOztjQUVwQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSSxFQUFJO3FCQUNSLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTs0QkFDdEIsSUFBSTs7O3FCQUdYLENBQUMsUUFBUSxDQUFDLFVBQUEsS0FBSyxFQUFJO3lCQUNmLEtBQUssWUFBWSxLQUFLLENBQUMsSUFBSSxFQUFFOzhCQUN6QixDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsT0FBTzs7a0JBRXRDLENBQUM7O3dCQUVLLElBQUk7Y0FDZCxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsR0FBRyxFQUFJO3dCQUNMLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztjQUNwQixDQUFDOzs7WUF0Q1cscUJBQXFCOzs7Ozs7Ozs7TUNBekMsVUFBVSxNQUFNLEVBQUU7cUJBQ0g7O2FBRVIsS0FBSyxHQUFHLFNBQVIsS0FBSyxDQUFhLENBQUMsRUFBRTtpQkFDakIsR0FBRyxHQUFHLFNBQU4sR0FBRyxDQUFhLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2tCQUN4QixHQUFHLE9BQU8sQ0FBQyxLQUFLLFVBQVUsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLEVBQUUsR0FBRyxDQUFDLEtBQUssU0FBUyxHQUFHLEVBQUUsR0FBRyxDQUFDO2tCQUM3RSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO2NBQ3BFO2lCQUFFLFdBQVcsR0FBRyxTQUFkLFdBQVcsQ0FBYSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRTtxQkFDbkMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHOztxQkFFWCxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssZ0JBQWdCLEVBQUU7MEJBQ3JELENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQ0FDN0IsQ0FBQyxNQUFNLEdBQUcsR0FBRyxJQUFJLG9CQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBSyxRQUFRLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQSxHQUFJLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztrQkFFekYsTUFBTSxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssaUJBQWlCLEVBQUU7MEJBQy9DLEdBQUcsSUFBSSxHQUFHLEVBQUU7NkJBQ1QsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtpQ0FDckIsTUFBTSxFQUFFOzRDQUNHLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDOzhCQUMxRCxNQUFNOzRDQUNRLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDOzs7O2tCQUlqRCxNQUFNLElBQUksTUFBTSxFQUFFO3dCQUNaLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUM7a0JBQ3RCLE1BQU07MEJBQ0UsR0FBRyxJQUFJLEdBQUcsRUFBRTs0QkFDVixDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7d0JBR3RCLENBQUM7Y0FDWDtvQkFDTSxXQUFXLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUM7VUFDL0Q7O2FBRUcsUUFBTyxNQUFNLHFEQUFOLE1BQU0sT0FBSyxRQUFRLElBQUksb0JBQU8sTUFBTSxDQUFDLE9BQU8sTUFBSyxRQUFRLEVBQUU7bUJBQzVELENBQUMsT0FBTyxHQUFHLEtBQUs7VUFDekIsTUFBTSxJQUFJLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFO21CQUM3QyxDQUFDLEVBQUUsRUFBRSxZQUFZO3dCQUNaLEtBQUs7Y0FDZixDQUFDO1VBQ0wsTUFBTTttQkFDRyxDQUFDLEtBQUssR0FBRyxLQUFLOztNQUczQixDQUFBLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQ2ZOLFVBQVMsTUFBTSxFQUFFO09BQ2IsS0FBSzs7WUFFQSxVQUFVLENBQUMsQ0FBQyxFQUFFO1dBQ2YsT0FBTyxDQUFDLElBQUksVUFBVTs7WUFFckIsUUFBUSxDQUFDLENBQUMsRUFBRTtXQUNiLFFBQU8sQ0FBQyxxREFBRCxDQUFDLE1BQUksUUFBUTs7WUFFbkIsS0FBSyxDQUFDLFFBQVEsRUFBRTtRQUNwQixPQUFPLFlBQVksSUFBSSxXQUFXLEVBQ3JDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFDbEIsSUFBSSxPQUFPLE9BQU8sSUFBSSxXQUFXLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUM1RCxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BRTdCLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDOzs7U0FHbkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLFVBQVUsQ0FBQyxNQUFNLEVBQUU7UUFDOUMsS0FBSztRQUNMLE1BQU0sR0FBRyxFQUFFO1FBQ1gsUUFBUSxHQUFHLEVBQUU7O1FBRWIsR0FBRyxHQUFHLGFBQVMsUUFBUSxFQUFFLFNBQVMsRUFBRTtTQUNuQyxLQUFLLElBQUksSUFBSSxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7V0FDakMsR0FBRyxRQUFRO1lBQ1YsR0FBRyxTQUFTO1VBQ2QsUUFBUSxDQUFDLE1BQU0sRUFDbEIsS0FBSyxDQUFDLFlBQVc7WUFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO2dCQUMvQixDQUFDLENBQUMsQ0FBQyxFQUFFOztPQUNkLENBQUM7O1lBRUcsS0FBSztLQUNaOztPQUVFLENBQUMsTUFBTSxDQUFDLEdBQUcsVUFBVSxXQUFXLEVBQUUsVUFBVSxFQUFFO1NBQzVDLFFBQVEsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO1NBQzdCLGFBQWEsR0FBRyxTQUFoQixhQUFhLEdBQWM7VUFDdkI7V0FDQyxDQUFDLEdBQUksS0FBSyxHQUFHLFdBQVcsR0FBRyxVQUFVO1dBQ3JDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRTs7YUFDVCxPQUFPLEdBQWhCLFNBQVMsT0FBTyxDQUFDLENBQUMsRUFBRTtjQUNmLElBQUk7Y0FBRSxRQUFRLEdBQUcsQ0FBQztjQUNsQjtlQUNDLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBLElBQUssVUFBVSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTtnQkFDdEUsQ0FBQyxLQUFLLFFBQVEsRUFDakIsTUFBTSxJQUFJLFNBQVMsRUFBRTtnQkFDbEIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQ2IsWUFBVztpQkFBTSxFQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDLFNBQVMsQ0FBQzthQUFHLEVBQy9ELFVBQVMsS0FBSyxFQUFDO2lCQUFNLEVBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQUUsQ0FBQztrQkFHM0QsUUFBUSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUM7WUFFM0IsT0FBTSxDQUFDLEVBQUU7ZUFDSixFQUFDLFFBQVEsRUFBRSxFQUNkLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztnQkFHaEIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLElBQUksRUFBRSxDQUFDLENBQUM7O2NBR3JDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO1FBRTVCLE9BQU8sQ0FBQyxFQUFFO2VBQ0QsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7TUFFckI7U0FDRyxLQUFLLElBQUksSUFBSSxFQUNoQixLQUFLLENBQUMsYUFBYSxDQUFDLE1BRXBCLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQ3RCLFFBQVE7S0FDZjtRQUNRLE1BQU0sRUFBQztRQUNILEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQzs7V0FFcEIsR0FBRztJQUNWO0dBQ0QsQ0FBQSxDQUFFLE9BQU8sTUFBTSxJQUFJLFdBQVcsR0FBRyxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQzs7Ozs7Ozs7UUNqSHpFLENBQUMsT0FBTyxHQUFHLENBQUEsWUFBVzs7T0FFdkIsTUFBTSxHQUFHLE1BQU0sSUFBSSxJQUFJO09BQzFCLFlBQVUsR0FBRyxVQUFxQjtPQUNsQyxNQUFNLEdBQUcsV0FBdUI7Ozt5QkFFVixHQUFHLE1BQU07OztrQkFFaEIsR0FBRyxNQUFNOzs7U0FFbkIsR0FBRyxJQUFJO09BQ1osUUFBUSxHQUFHLENBQUM7T0FDWixhQUFhLEdBQUcsRUFBRTs7O1NBRVosR0FBRyxTQUFULE1BQU0sR0FBYTtXQUNYLE1BQU0sQ0FBQyxjQUFjLEdBQzFCLElBQUksTUFBTSxDQUFDLGNBQWMsRUFBRSxHQUMzQixJQUFJLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztJQUN4Qzs7O09BRUcsR0FBSSxNQUFNLEVBQUUsQ0FBQyxZQUFZLEtBQUcsRUFBRTs7OztRQUc5QixHQUFHLFNBQVIsS0FBSyxDQUFZLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUU7OztVQUc5QyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUU7UUFDekIsR0FBRyxJQUFJLElBQUksSUFBSTtXQUNaLEdBQUcsT0FBTyxJQUFJLEVBQUU7OztRQUduQixxQkFBcUIsR0FBRyxLQUFLO1FBQ2hDLFdBQVc7UUFDWCxHQUFHO1FBQ0gsR0FBRyxHQUFHLEtBQUs7UUFDWCxlQUFlO1FBQ2YsT0FBTyxHQUFHLEtBQUs7UUFDZixRQUFRLEdBQUcsQ0FBQztRQUNaLE9BQU8sR0FBRyxFQUFFO1FBQ1osU0FBUyxHQUFHO1NBQ1AsRUFBRSxLQUFLO1FBQ1IsRUFBRSxVQUFVO1NBQ1gsRUFBRSxrQkFBa0I7U0FDcEIsRUFBRTtLQUNOO1FBQ0QsTUFBTSxHQUFHO1NBQ0osRUFBRSxLQUFLO1FBQ1IsRUFBRSxxREFBcUQ7U0FDdEQsRUFBRTtLQUNOO1FBQ0QsSUFBSSxHQUFHLEVBQUU7UUFDVCxDQUFDO1FBQUUsQ0FBQztRQUNKLFVBQVU7UUFDVixRQUFRO1FBQ1IsT0FBTyxHQUFHLEtBQUs7UUFDZixPQUFPLEdBQUcsS0FBSztRQUNmLGFBQWE7Ozs7V0FHUCxHQUFHLFlBQVUsQ0FBQyxVQUFTLEtBQUssRUFBRTtVQUMvQixDQUFDLE9BQU8sQ0FBQyxHQUFHLFVBQVMsQ0FBQyxFQUFFO2FBQ3JCLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztNQUMxQjtVQUNJLENBQUMsUUFBUSxHQUFHLFVBQVMsQ0FBQyxFQUFFO2FBQ3JCLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztNQUN2Qjs7U0FFRSxZQUFZLElBQUksT0FBTyxFQUFFO1dBQ3ZCLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7OztVQUc3QixDQUFDLElBQUksR0FBRyxZQUFXOztVQUVwQixPQUFPLEVBQUU7Ozs7VUFJVCxRQUFRLElBQUksTUFBSyxFQUFFO29CQUNSLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzs7O1FBR3hCLFFBQVE7YUFDSCxHQUFHLElBQUk7O21CQUVELEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUU7O1NBRWpDLEdBQUcsTUFBTSxFQUFFO1VBQ1gsV0FBVyxFQUFFO1dBQ1osRUFBRSxpQkFBaUIsSUFBSSxHQUFHLENBQUEsSUFBSyxNQUFNLENBQUMsY0FBYyxFQUFFO1dBQ3JELEdBQUcsSUFBSSxjQUFjLEVBQUU7V0FDdkIsR0FBRyxJQUFJO1lBQ1AsTUFBTSxJQUFFLEtBQUssSUFBSSxNQUFNLElBQUUsTUFBTSxFQUFFO2VBQzdCLEdBQUcsTUFBTTs7Ozs7VUFLZixHQUFHLEVBQUU7VUFDSixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO09BQ3JCLE1BQ0k7VUFDRCxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDO1dBQ2pFLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1dBQ3RCLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxlQUFlOzs7O1VBSTVDLENBQUMsR0FBRyxFQUFFO1lBQ0osSUFBSSxDQUFDLElBQUksT0FBTyxFQUFFO1lBQ2xCLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNYLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7VUFLbkMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxZQUFZLElBQUUsVUFBVSxJQUFJLE9BQU8sQ0FBQyxZQUFZLElBQUUsTUFBTSxFQUFFOztXQUN4RTtXQUNBLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZOzZCQUNsQixHQUFJLEdBQUcsQ0FBQyxZQUFZLElBQUUsT0FBTyxDQUFDLFlBQVk7UUFDL0QsQ0FDRCxPQUFNLENBQUMsRUFBQzs7O1VBR04sSUFBSSxJQUFJLEdBQUcsRUFBRTtVQUNaLENBQUMsTUFBTSxHQUFHLGNBQWM7VUFDeEIsQ0FBQyxPQUFPLEdBQUcsV0FBVztPQUN6QixNQUNJO1VBQ0QsQ0FBQyxrQkFBa0IsR0FBRyxZQUFXO1lBQ2hDLEdBQUcsQ0FBQyxVQUFVLElBQUksQ0FBQyxFQUFFO3VCQUNULEVBQUU7O1FBRWpCOzs7VUFHQyxPQUFPLENBQUMsWUFBWSxJQUFFLE1BQU0sSUFBSSxrQkFBa0IsSUFBSSxHQUFHLEVBQUU7VUFDMUQsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDOzs7VUFHbkQsTUFBTSxFQUFFO2FBQ0osQ0FBQyxHQUFHLENBQUM7OztVQUdULEdBQUcsRUFBRTtpQkFDRyxDQUFDLFlBQVU7O1dBQ2pCLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBRSxLQUFLLEdBQUMsSUFBSSxHQUFDLElBQUksQ0FBQztRQUNqQyxFQUFDLENBQUMsQ0FBQztPQUNKLE1BQ0k7VUFDRCxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUUsS0FBSyxHQUFDLElBQUksR0FBQyxJQUFJLENBQUM7O01BRWxDO1lBQ00sS0FBSztLQUNaLENBQUM7Ozs7a0JBR1ksR0FBRyxTQUFqQixjQUFjLEdBQWM7O1NBRXZCLENBQUMsRUFBRSxZQUFZO09BQ2pCLFFBQVE7WUFDSCxHQUFHLEtBQUs7OztTQUdaLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUMsYUFBYSxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7VUFDdEQsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLEVBQUUsUUFBUSxJQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUU7Y0FDOUMsQ0FBQyxJQUFJLEVBQUU7T0FDZCxNQUNJO2NBQ0csQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLElBQUksS0FBSyxDQUFDLFdBQVcsR0FBQyxHQUFHLEdBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7Ozs7U0FLNUQsYUFBYSxDQUFDLE1BQU0sRUFBRTttQkFDWCxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRTs7O1NBRzFCOztVQUVDLHFCQUFxQixJQUFJLFVBQVUsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBRyxJQUFJLEVBQUU7ZUFDN0QsR0FBRyxHQUFHLENBQUMsUUFBUTtPQUN2QixNQUNJLElBQUcsT0FBTyxDQUFDLFlBQVksSUFBSSxVQUFVLEVBQUU7V0FDdkMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO1lBQ3ZDLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNO2VBQ3BCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDM0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFO1lBQ3ZCLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO1lBQ3BDLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRTtlQUNyQixHQUFHLEtBQUssQ0FBQyxlQUFlO2VBQ3hCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7T0FDaEMsTUFDRzs7bUJBRVMsR0FBRyxPQUFPLENBQUMsWUFBWTtXQUNoQyxZQUFZLElBQUksTUFBTSxFQUFFO1lBQ3ZCLEdBQUcsRUFBRTtxQkFDSyxHQUFHLHNCQUFzQjtTQUNyQyxNQUNJO2FBQ0EsRUFBRSxHQUFHLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFO2FBQ2pELEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFFO3NCQUNyQixHQUFHLE1BQU07VUFDckIsTUFDSSxJQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFFO3NCQUN6QixHQUFHLEtBQUs7VUFDcEIsTUFDSTtzQkFDUSxHQUFHLE1BQU07Ozs7O2VBS2pCLFlBQVk7YUFDYixNQUFNO2FBQ047Y0FDQSxNQUFNLElBQUksTUFBTSxFQUFFO21CQUNaLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDO1dBQ3ZDLE1BQ0k7bUJBQ0ksR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUMsR0FBRyxDQUFDOztVQUUxQyxDQUNELE9BQU0sQ0FBQyxFQUFFO2dCQUNGLGtDQUFrQyxHQUFDLENBQUM7OzthQUd2QyxLQUFLOzthQUVMOztjQUVBLE1BQU0sQ0FBQyxTQUFTLEVBQUU7bUJBQ1osR0FBRyxJQUFLLFNBQVMsRUFBRSxDQUFFLGVBQWUsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFDLFVBQVUsQ0FBQzs7O2VBR3JFO29CQUNJLEdBQUcsSUFBSSxhQUFhLENBQUMsa0JBQWtCLENBQUM7b0JBQ3hDLENBQUMsS0FBSyxHQUFHLE9BQU87b0JBQ2hCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7O1VBRW5DLENBQ0QsT0FBTSxDQUFDLEVBQUU7a0JBQ0EsR0FBRyxTQUFTOzthQUVsQixDQUFDLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLElBQUksUUFBUSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sRUFBRTtnQkFDM0YsYUFBYTs7OztpQkFJWixHQUFHLEdBQUcsQ0FBQyxZQUFZOzs7OztVQUszQixRQUFRLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7YUFDNUMsR0FBRyxDQUFDLE1BQU0sR0FBQyxJQUFJLEdBQUMsR0FBRyxDQUFDLFVBQVUsR0FBQyxHQUFHOzs7YUFHbEMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUMsUUFBUSxDQUFDLENBQUM7TUFDN0IsQ0FDRCxPQUFNLENBQUMsRUFBRTs7YUFFRCxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUM7O0tBRWpDOzs7O2VBR1UsR0FBRyxTQUFkLFdBQVcsQ0FBWSxDQUFDLEVBQUU7T0FDdkIsUUFBUTtZQUNILENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7S0FDMUQ7OztXQUdNLENBQUMsS0FBSyxHQUFHLE9BQU8sSUFBSSxPQUFPLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUMsSUFBSTtXQUNoRCxDQUFDLEtBQUssR0FBRyxPQUFPLElBQUksT0FBTyxHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFDLEtBQUs7V0FDakQsQ0FBQyxRQUFRLEdBQUcsVUFBVSxJQUFJLE9BQU8sR0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxHQUFDLGVBQWU7V0FDaEYsQ0FBQyxZQUFZLEdBQUcsY0FBYyxJQUFJLE9BQU8sR0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxHQUFDLE1BQU07V0FDbkYsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFO1dBQzFCLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLElBQUksRUFBRTtXQUNsQyxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWU7V0FDNUMsQ0FBQyxPQUFPLEdBQUcsU0FBUyxJQUFJLE9BQU8sR0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBQyxFQUFFLENBQUMsR0FBQyxLQUFLO1dBQ2xFLENBQUMsUUFBUSxHQUFHLFVBQVUsSUFBSSxPQUFPLEdBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQzs7O0tBR3ZFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7ZUFDakIsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRSxRQUFRLENBQUMsSUFBSSxHQUFDLEtBQUssQ0FBQTs7O1FBRy9DLGFBQWEsSUFBSSxNQUFNLElBQUksSUFBSSxZQUFZLFdBQVcsRUFBRTtZQUNuRCxDQUFDLFFBQVEsR0FBRyxhQUFhO0tBQ2hDLE1BQ0ksSUFBRyxNQUFNLElBQUksTUFBTSxJQUFJLElBQUksWUFBWSxJQUFJLEVBQUU7WUFDMUMsQ0FBQyxRQUFRLEdBQUcsTUFBTTtLQUN6QixNQUNJLElBQUcsVUFBVSxJQUFJLE1BQU0sSUFBSSxJQUFJLFlBQVksUUFBUSxFQUFFO1lBQ2xELENBQUMsUUFBUSxHQUFHLFVBQVU7S0FDN0IsTUFDSSxJQUFHLFVBQVUsSUFBSSxNQUFNLElBQUksSUFBSSxZQUFZLFFBQVEsRUFBRTtZQUNsRCxDQUFDLFFBQVEsR0FBRyxVQUFVOztZQUV2QixPQUFPLENBQUMsUUFBUTtVQUNqQixNQUFNO1VBQ04sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQzs7VUFFdkIsTUFBTTtVQUNOLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQzs7OztRQUlsQixPQUFPLENBQUMsT0FBTyxFQUFFO1NBQ2YsTUFBTSxHQUFHLFNBQVQsTUFBTSxDQUFZLEtBQUssRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFFO2FBQzNCLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFO01BQzVCO1VBQ0csQ0FBQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7YUFDbEIsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7UUFHN0QsRUFBRSxjQUFjLElBQUksT0FBTyxDQUFBLElBQUssTUFBTSxJQUFFLEtBQUssRUFBRTtTQUM5QyxPQUFPLENBQUMsUUFBUSxJQUFJLFNBQVMsRUFBRTtVQUM5QixTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2NBQ3hCLENBQUMsY0FBYyxDQUFDLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7Ozs7UUFJckQsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ1osQ0FBQyxNQUFNLEdBQUcsT0FBUSxDQUFDLFlBQVksSUFBSSxNQUFNLEdBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBQyxLQUFLOztRQUVsRixDQUFDLFdBQVcsSUFBSSxFQUFFLGtCQUFrQixJQUFJLE9BQU8sQ0FBQSxFQUFHOztZQUM3QyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsZ0JBQWdCOztRQUU1QyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxlQUFlLElBQUksT0FBTyxDQUFBLEVBQUc7WUFDNUMsQ0FBQyxlQUFlLENBQUMsR0FBRyxVQUFVOzs7O1FBSW5DLE1BQU0sSUFBRSxLQUFLLElBQUksSUFBSSxFQUFFO1NBQ3JCLElBQUksSUFBSTs7UUFFVixJQUFJLEVBQUU7UUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBQyxHQUFHLEdBQUMsR0FBRyxDQUFBLEdBQUUsSUFBSTs7OztRQUlsQyxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ1YsQ0FBQyxJQUFJLEVBQUU7Ozs7V0FJUixPQUFPO0lBRWQ7OztVQUdNO1FBQ0YsRUFBRSxFQUFFO09BQ0wsRUFBRSxhQUFTLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRTtZQUNsQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO0tBQ3pEO1FBQ0csRUFBRSxjQUFTLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRTtZQUNuQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO0tBQzFEO09BQ0UsRUFBRSxhQUFTLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRTtZQUNsQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLEdBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO0tBQ3pEO1lBQ08sRUFBRSxpQkFBUyxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUU7WUFDdkMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxHQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQztLQUM1RDtPQUNFLEVBQUUsYUFBUyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFO1lBQ3hDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksR0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUM7S0FDdEU7UUFDRyxFQUFFLElBQUk7U0FDTCxFQUFFLGVBQVMsRUFBRSxFQUFFO1dBQ2QsR0FBRyxFQUFFO0tBQ1Y7NkJBQ3dCLEVBQUUsbUNBQVMsSUFBSSxFQUFFOzJCQUNuQixHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7S0FDM0M7c0JBQ2lCLEVBQUUsNEJBQVMsSUFBSSxFQUFFO29CQUNuQixHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7O0lBRXJDO0dBRUQsQ0FBQSxFQUFFOzs7O0tDN1hrQixlQUFlO2NBQWYsZUFBZTsyQ0FBZixlQUFlOzs7OEJBQWYsZUFBZTs7NkJBQzVCLElBQWEsRUFBWTtvQkFDbEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBUyxHQUFHLEVBQUUsR0FBRyxFQUFFO3dCQUNwQyxPQUFPLEdBQUcsS0FBSyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHO2NBQ3pELENBQUM7OztZQUpXLGVBQWU7OztLQ0ZmLFdBQVc7Y0FBWCxXQUFXLENBR2hCLFVBQXdCLEVBQUU7MkNBSHJCLFdBQVc7O2FBSXBCLENBQUMsVUFBVSxHQUFLLFVBQVU7Ozs4QkFKakIsV0FBVzs7OzhGQU9aLElBQWE7Ozs7Ozt3Q0FDWixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBUnpCLFdBQVc7OztDQ0F6QixJQUFNLFVBQVUsR0FBRztVQUNqQixFQUFLLENBQUM7V0FDTCxFQUFJO0VBQ2I7O0tBRW9CLGFBQWE7Y0FBYixhQUFhLEdBQ2hCOzJDQURHLGFBQWE7O2FBRXRCLENBQUMsWUFBWSxHQUFJLElBQUksR0FBRyxFQUFFO2FBQzFCLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxFQUFFOzs7OEJBSGpCLGFBQWE7O3dDQU1mLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRTs7O2lCQUM3QyxJQUFJLEtBQUssVUFBVSxDQUFDLEtBQUssSUFBSSxJQUFJLEtBQUssVUFBVSxDQUFDLE1BQU0sRUFBRTt1QkFDbkQsU0FBUyxDQUFDLGtDQUFrQyxDQUFDOzs7aUJBR25ELFFBQVEsS0FBSyxZQUFZLENBQUMsR0FBRyxJQUFJLFFBQVEsS0FBSyxZQUFZLENBQUMsT0FBTyxJQUNsRSxRQUFRLEtBQUssWUFBWSxDQUFDLFdBQVcsSUFBSSxRQUFRLEtBQUssWUFBWSxDQUFDLFVBQVUsRUFBRTt1QkFDekUsU0FBUyxDQUFDLHdDQUF3QyxDQUFDOzs7aUJBR3pELE9BQU8sVUFBVSxLQUFLLFFBQVEsRUFBRzt1QkFDM0IsU0FBUyxDQUFDLDhCQUE4QixDQUFDOzs7aUJBRy9DLE9BQU8sUUFBUSxLQUFLLFVBQVUsRUFBRTt1QkFDMUIsU0FBUyxDQUFDLDhCQUE4QixDQUFDOzs7aUJBRy9DLE1BQU0sR0FBRzt5QkFDTCxFQUFSLFFBQVE7MkJBQ0UsRUFBVixVQUFVO3lCQUNGLEVBQVI7Y0FDQzs7aUJBRUcsUUFBUSxHQUFHLFNBQUEsSUFBSSxFQUFDLEdBQUcsTUFBQSxTQUFDLENBQUMsd0NBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsa0NBQUssSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsR0FBQyxHQUFHLENBQUM7O3FCQUVqRixJQUFJO3NCQUNILFVBQVUsQ0FBQyxLQUFLO3lCQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7c0JBQzNELFVBQVUsQ0FBQyxNQUFNO3lCQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7OztvQkFHL0QsUUFBUTs7OztzQ0FHTixRQUFRLEVBQUU7b0JBQ1osSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDOzs7WUF6Q25FLGFBQWE7OztLQ1BiLGdCQUFnQjtjQUFoQixnQkFBZ0IsR0FDbkI7MkNBREcsZ0JBQWdCOzthQUV6QixDQUFDLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBRTs7OzhCQUZkLGdCQUFnQjs7c0NBS3BCLFdBQVcsRUFBRTtpQkFDbEIsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQzs7aUJBRTVDLFNBQVMsS0FBSyxJQUFJLElBQUksU0FBUyxLQUFLLFNBQVMsRUFBRTt3QkFDeEMsSUFBSTs7OzRCQUdBLFNBQVMscURBQVQsU0FBUztzQkFDZixVQUFVOzRCQUFTLElBQUksU0FBUyxFQUFFO3NCQUNsQyxRQUFROztnQ0FDRixDQUFDLFVBQUMsU0FBUyxFQUFLO2lDQUNmLEdBQUcsR0FBRyxFQUFFOzttQ0FFTixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO3dDQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDOzhCQUFBLENBQUM7O29DQUV6RCxHQUFHOzBCQUNiLENBQUEsQ0FBRSxTQUFTLENBQUM7Ozs7b0JBSWQsU0FBUzs7OzsyQ0FHRixTQUFTLEVBQUU7OztpQkFDckIsU0FBUyxLQUFLLElBQUksSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO3VCQUN6QyxTQUFTLENBQUMsMkJBQTJCLENBQUM7OztpQkFHNUMsR0FBRyxHQUFHLFNBQUEsSUFBSSxFQUFDLEdBQUcsTUFBQSx1Q0FBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxFQUFDOztpQkFFekMsRUFBRSxHQUFHLEdBQUcsS0FBSyxTQUFTLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDOztpQkFFekYsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUM7O29CQUUzQixFQUFFOzs7O3lDQUdHO29CQUNMLElBQUksQ0FBQyxVQUFVOzs7WUEzQ1QsZ0JBQWdCOzs7O0NDSTlCLElBQU0sWUFBWSxHQUFHO1FBQ3JCLEVBQVcsQ0FBQztZQUNSLEVBQU8sQ0FBQztnQkFDSixFQUFHLENBQUM7ZUFDTCxFQUFJO0VBQ2pCOztLQUVvQixhQUFhO2NBQWIsYUFBYSxHQUNEO2FBQWpCLFFBQVEseURBQUcsSUFBSTsyQ0FEVixhQUFhOzthQUV0QixDQUFDLFFBQVEsR0FBVyxRQUFRO2FBQzVCLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDOzthQUV0QixDQUFDLGFBQWEsR0FBTSxJQUFJLGFBQWEsRUFBRTthQUN2QyxDQUFDLGFBQWEsR0FBTSxJQUFJLGFBQWEsRUFBRTthQUN2QyxDQUFDLGdCQUFnQixHQUFHLElBQUksZ0JBQWdCLEVBQUU7YUFDMUMsQ0FBQyxZQUFZLEdBQU8sSUFBSSxZQUFZLEVBQUU7O2FBRXRDLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLFlBQU07b0JBQVMsQ0FBQztVQUFHLENBQUU7Ozs4QkFWOUQsYUFBYTs7NENBYVg7aUJBQ1gsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFROztpQkFFM0IsQ0FBQyxRQUFRLElBQUksQ0FBQzs7a0JBRWIsSUFBSSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFO3FCQUMxQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDOzs7Ozs7OztzQ0FHQSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxFQUFFLDhIQUFFO3lCQUE3RCxXQUFXOzswQkFDWCxJQUFJLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUU7NkJBQzFDLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21DQUt6RSxVQUFVLEVBQUU7aUJBQ2QsT0FBTyxVQUFVLEtBQUssUUFBUSxJQUFJLFVBQVUsSUFBSSxDQUFDLEVBQUU7d0JBQzVDLElBQUksQ0FBQyxRQUFROzs7aUJBR3BCLFFBQVEsR0FBRyxDQUFDOztvQkFFVCxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRTtxQkFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7Ozs7O2lCQUtuQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTs7d0JBRXBCLElBQUksQ0FBQyxRQUFROzs7aUJBR3BCLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7cUJBQzlCLENBQUMsZ0JBQWdCLEdBQUcsUUFBUTs7O2lCQUdoQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxVQUFVOztvQkFFN0IsUUFBUTs7OztzQ0FHTixRQUFRLEVBQUU7aUJBQ2YsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQzs7aUJBRXZCLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Ozs7a0JBSWpDLElBQUksQ0FBQyxHQUFHLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFO3FCQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRTt5QkFDcEIsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDOzs7Ozs7Ozs7aUJBT3hCLFVBQVUsMkRBQUcsQ0FBQztpQkFBRSxJQUFJLDJEQUFHLFlBQVksQ0FBQyxPQUFPO2lCQTBDbkMsUUFBUTs7Ozs7MkNBekNqQixJQUFJOzZEQUNILFlBQVksQ0FBQyxPQUFPLHVCQWFwQixZQUFZLENBQUMsV0FBVyx3QkFheEIsWUFBWSxDQUFDLFVBQVUsd0JBYXZCLFlBQVksQ0FBQyxHQUFHOzs7O21FQXRDSSxJQUFJLENBQUMsUUFBUTs7Ozs7Ozs7cUNBQWpCOzttQ0FDVCxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFBOzs7Ozs7OzttQ0FJaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFVBQVUsQ0FBQSxLQUFNLFVBQVUsQ0FBQTs7Ozs7O29DQUNoRixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQzs7Ozs7Ozs7OzttRUFPYixJQUFJLENBQUMsUUFBUTs7Ozs7Ozs7cUNBQWpCOzttQ0FDVCxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFBOzs7Ozs7OzttQ0FJaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxVQUFVLENBQUE7Ozs7OztvQ0FDakUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7Ozs7bUVBT2IsSUFBSSxDQUFDLFFBQVE7Ozs7Ozs7O3FDQUFqQjs7bUNBQ1QsUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQTs7Ozs7Ozs7bUNBSWhDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxVQUFVLENBQUEsS0FBTSxVQUFVLENBQUE7Ozs7OztvQ0FDaEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7Ozs7bUVBT2IsSUFBSSxDQUFDLFFBQVE7Ozs7Ozs7O3FDQUFqQjs7bUNBQ1QsUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQTs7Ozs7Ozs7O29DQUk5QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzJDQVV4QixTQUFTLEVBQUU7aUJBQ3JCLFdBQVcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDOztpQkFFaEUsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFOztrQkFFakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFO3FCQUNoQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7aUJBR3ZFLFdBQVcsWUFBQTs7NEJBRUEsU0FBUyxxREFBVCxTQUFTO3NCQUNmLFVBQVU7Z0NBQWEsR0FBRyxTQUFTLENBQUM7c0JBQ3BDLFFBQVE7O29DQUNFLEdBQUcsWUFBVzs7Ozs7O3VEQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLG1JQUFFO3lDQUEvQixHQUFHOzt5Q0FDSixDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBRWpDOzs7OztnQ0FJZSxHQUFHLFlBQVc7Z0NBQVMsU0FBUztzQkFBRyxDQUFDOzs7aUJBR3hELENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUM7O29CQUV6RCxXQUFXOzs7O3NDQUdULFFBQVEsRUFBRSxXQUFXLEVBQUU7aUJBQzVCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLFdBQVc7Ozs7eUNBRzFCLFFBQVEsRUFBRSxXQUFXLEVBQUU7aUJBQy9CLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVzs7Ozs7Ozt3Q0FLNUIsSUFBSSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFO29CQUMxQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUM7Ozs7NkNBRzlELFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFO29CQUN6QyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDOzs7OzhDQUd6RSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRTtvQkFDMUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQzs7OztzQ0FHbEYsUUFBUSxFQUFFO29CQUNaLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQzs7OztpQ0FHNUMsS0FBSyxFQUFFOzs7Ozs7dUNBQ1EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLG1JQUFFO3lCQUFwRCxNQUFNOzsyQkFDTCxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsS0FBSyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQUl0RixLQUFLLEVBQUU7Ozs7Ozt1Q0FDTyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsbUlBQUU7eUJBQXJELE1BQU07OzJCQUNMLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkNBTTNFLFdBQVcsRUFBRSxXQUFXLEVBQUU7aUJBQ3RDLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUM7Ozs7aUNBRzVEO2lCQUNBLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRTs7b0JBRW5CLElBQUk7Ozs7dUNBR0QsV0FBVyxFQUFFLFdBQVcsRUFBRTtpQkFDaEMsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUM7O29CQUVuRCxJQUFJOzs7OytDQUdPO29CQUNYLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLEVBQUU7Ozs7Z0NBRzVDLEtBQUssRUFBRSxhQUFhLEVBQUU7b0JBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsYUFBYSxDQUFDOzs7Ozs7O2dDQUt6RCxLQUFLLEVBQUUsUUFBUSxFQUFFO29CQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUM7Ozs7b0NBR3pDLE9BQU8sRUFBRTtvQkFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7Ozs7bUNBR3RDOzs7b0JBQ0MseUJBQUEsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUMsSUFBSSxNQUFBLHlCQUFDLElBQUksb0NBQUssU0FBUyxHQUFDOzs7OzBDQUc1Qzs7O29CQUNOLDBCQUFBLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFDLElBQUksTUFBQSwwQkFBQyxJQUFJLG9DQUFLLFNBQVMsR0FBQzs7O1lBOU9uRCxhQUFhOzs7S0FrUHJCLGFBQWE7Y0FBYixhQUFhLEdBQ1I7MkNBREwsYUFBYTs7YUFFZCxDQUFDLFlBQVksR0FBSSxJQUFJLEdBQUcsRUFBRTthQUMxQixDQUFDLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBRTs7OzhCQUh6QixhQUFhOzs2Q0FNRixXQUFXLEVBQUUsV0FBVyxFQUFFO2lCQUN0QyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksT0FBTyxXQUFXLEtBQUssVUFBVSxFQUFFOzs7O2lCQUlyRSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQzs7OztpQ0FHM0M7aUJBQ0EsQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQUU7O29CQUV2QixJQUFJOzs7O3VDQUdELFdBQVcsRUFBRSxXQUFXLEVBQUU7aUJBQ2hDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRTt3QkFDekIsSUFBSTs7O2lCQUdYLE9BQU8sV0FBVyxLQUFLLFVBQVUsRUFBRTs0QkFDeEIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7OztpQkFHaEQsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUM7O29CQUV6QyxJQUFJOzs7OytDQUdPO29CQUNYLElBQUksQ0FBQyxhQUFhOzs7O2dDQUd0QixhQUFhLEVBQXdDO2lCQUF0QyxLQUFLLHlEQUFHLENBQUM7aUJBQUUsYUFBYSx5REFBRyxTQUFTOztpQkFDbEQsRUFBRSxhQUFhLFlBQVksYUFBYSxDQUFBLEVBQUc7d0JBQ3BDLEVBQUU7OzswQkFHQSxHQUFHLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYTs7aUJBRS9DLFVBQVUsR0FBRyxDQUFDOzs7Ozs7O3VDQUVJLGFBQWEsQ0FBQyxJQUFJLEVBQUUsbUlBQUU7eUJBQW5DLFNBQVM7OytCQUNKLElBQUksU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7aUJBR3ZCLFFBQVEsR0FBRyxFQUFFOztrQkFFWixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRTtxQkFDeEIsU0FBUSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDOztxQkFFOUMsU0FBUSxJQUFJLGFBQWEsQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7OzsyQ0FJRCxhQUFhLG1JQUFFOzs7NkJBQTVDLFdBQVc7NkJBQUUsV0FBVzs7NkJBQzFCLE9BQU8sV0FBVyxLQUFLLFVBQVUsRUFBRTs7Ozs2QkFJbkMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVEsQ0FBQyxDQUFDOzs2QkFFL0QsT0FBTyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUSxDQUFDLEtBQUssVUFBVSxJQUFJLG9CQUFPLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFRLENBQUMsTUFBSyxRQUFRLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTswQ0FDbkksQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFRLENBQUMsR0FBRyxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7eUJBSTdDLENBQUMsSUFBSSxDQUFDLFNBQVEsQ0FBQzs7O29CQUdwQixRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUTs7O1lBM0VoRCxhQUFhOzs7S0MzUEwsWUFBWTtjQUFaLFlBQVksR0FDZjsyQ0FERyxZQUFZOzthQUVyQixDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRTs7OzhCQUZWLFlBQVk7O3dDQUtkO29CQUNKLElBQUksT0FBTyxDQUFDLFVBQUEsT0FBTyxFQUFJO3dCQUNuQixFQUFFO2NBQ1osQ0FBQzs7OztpQ0FHRSxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7aUJBQ2xDLE9BQU8sRUFBRTt3QkFDRixJQUFJLE9BQU8sQ0FBQyxVQUFBLE9BQU8sRUFBSTsrQkFDaEIsQ0FBQyxZQUFVO2dDQUNWLENBQUMsUUFBTyxPQUFPLHFEQUFQLE9BQU8sT0FBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksTUFBQSxDQUFiLFFBQVEsR0FBTSxPQUFPLHdDQUFLLElBQUksR0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLE1BQUEsQ0FBZCxRQUFRLEdBQU8sT0FBTyx3Q0FBSyxJQUFJLEdBQUMsQ0FBQztzQkFDN0csRUFBRSxPQUFPLENBQUM7a0JBQ2QsQ0FBQzs7O29CQUdDLElBQUksT0FBTyxDQUFDLFVBQUEsT0FBTyxFQUFJO3dCQUNuQixDQUFDLFFBQU8sT0FBTyxxREFBUCxPQUFPLE9BQUssUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLE1BQUEsQ0FBYixRQUFRLEdBQU0sT0FBTyx3Q0FBSyxJQUFJLEdBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxNQUFBLENBQWQsUUFBUSxHQUFPLE9BQU8sd0NBQUssSUFBSSxHQUFDLENBQUM7Y0FDNUcsQ0FBQzs7OztnQ0FHQyxLQUFLLEVBQUUsUUFBUSxFQUFFO2lCQUNoQixPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksT0FBTyxRQUFRLEtBQUssVUFBVSxFQUFFOzs7O2lCQUk3RCxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO3FCQUNyQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksR0FBRyxFQUFFLENBQUM7OztpQkFHakMsT0FBTyxHQUFHLENBQUMsQ0FBQzs7aUJBRVosQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxFQUFJOzs7d0JBQ2xCLEdBQUcsU0FBQSxJQUFJLEVBQUMsR0FBRyxNQUFBLFNBQUMsT0FBTyx3Q0FBSyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUM7Y0FDL0MsQ0FBQzs7ZUFFQSxPQUFPOztpQkFFTCxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUM7O29CQUV0QyxPQUFPOzs7O29DQUdQLE9BQU8sRUFBRTs7Ozs7O3NDQUNHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLDhIQUFFO3lCQUFoQyxNQUFNOzs7Ozs7K0NBQ0ksTUFBTSxDQUFDLElBQUksRUFBRSxtSUFBRTtpQ0FBckIsRUFBRTs7aUNBQ0gsRUFBRSxLQUFLLE9BQU8sRUFBRTt3Q0FDVCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQUtsQyxLQUFLOzs7O21DQUdOO2lCQUNGLElBQUksR0FBRyxJQUFJLFlBQVksYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSTs7aUJBRS9ELElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzs7Z0NBRWhCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7OztpQkFBM0IsS0FBSzs7aUJBRVAsT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7d0JBQy9DLElBQUksQ0FBQyxZQUFZLEVBQUU7OztpQkFHMUIsUUFBUSxHQUFHLEVBQUU7Ozs7Ozs7dUNBRUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUFFLG1JQUFFO3lCQUE3QyxRQUFROzs2QkFDTCxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztvQkFHakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7Ozs7MENBR2Y7aUJBQ1QsSUFBSSxHQUFHLElBQUksWUFBWSxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJOztpQkFFL0QsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDOztpQ0FFUCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Ozs7aUJBQXBDLEtBQUs7aUJBQUUsT0FBTzs7aUJBRWhCLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTt3QkFDN0UsSUFBSSxDQUFDLFlBQVksRUFBRTs7O2lCQUcxQixRQUFRLEdBQUcsRUFBRTs7Ozs7Ozt1Q0FFSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsbUlBQUU7eUJBQTdDLFFBQVE7OzZCQUNMLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQUd2RCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQzs7O1lBaEdmLFlBQVk7Ozs7Ozs7O01DQ2hDLFlBQVc7YUFDSixJQUFJOzthQUVKLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtpQkFDM0IsR0FBRyxNQUFNO1VBQ2hCLE1BQU07aUJBQ0MsR0FBRyxNQUFNOzs7OzthQUtiLGtCQUFrQixHQUFHLElBQUksR0FBRyxFQUFFOzs7O21CQUl4QixHQUFHLENBQUM7Ozs7d0JBSUMsR0FBRyxDQUFDOzs7WUFHaEIsR0FBRyxFQUFFOzs7O3NCQUlLLEdBQUcsQ0FBQzs7O3lCQUdELEdBQUcsQ0FBQzs7Ozs7O3VCQU1OLEdBQUcsQ0FBQzs7Ozs7O3NCQU1MLEdBQUcsQ0FBQzs7O2dCQUdWLEdBQUcsS0FBSzs7Ozs7OztnQkFPUixHQUFHLEtBQUs7Ozs7Ozs7Y0FPVixHQUFHLEtBQUs7Ozs7Ozs7OEJBT1EsR0FBRyxJQUFJLENBQUMscUJBQXFCLElBQUksQ0FBQyxZQUFXO2lCQUMxRCxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTtpQkFDMUIsR0FBRztpQkFDSCxPQUFPO29CQUNKLFVBQVMsUUFBUSxFQUFFO29CQUNuQixHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUU7Ozs7d0JBSVQsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxrQkFBa0IsSUFBSSxHQUFHLEdBQUcsYUFBYSxDQUFBLENBQUU7OEJBQ3BELEdBQUcsR0FBRyxHQUFHLE9BQU87d0JBQ3RCLFVBQVUsQ0FBQyxZQUFXOzZCQUNqQixDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUM7a0JBQzFCLEVBQUUsT0FBTyxDQUFDO2NBQ2Q7VUFDSixDQUFBLEVBQUc7Ozs7OzZCQUtnQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxZQUFZOzs7Ozs7YUFNNUQsR0FBRyxTQUFQLElBQUksR0FBYyxFQUFFOzs7O2NBSWYsR0FBRyxJQUFJOzs7O2VBSU4sR0FBRyxJQUFJOzs7O2FBSVQsR0FBRyxJQUFJOzs7O1lBSVIsR0FBRyxJQUFJOzs7O2tCQUlEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2FBNEJULENBQUMsUUFBUSxHQUFHOzs7Ozs7Ozs7O2tDQVVTLEVBQUUsaUNBQVc7d0JBQ3ZCLGtCQUFrQjtjQUM1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NBNENvQixFQUFFLCtCQUFTLFFBQVEsRUFBRTttQ0FDcEIsR0FBRyxRQUFRO3dCQUN0QixJQUFJO2NBQ2Q7Ozs7Ozs7O21CQVFLLEVBQUUsa0JBQVc7d0JBQ1IsR0FBRztjQUNiOzs7Ozs7Ozs7Ozs7OzZCQWFlLEVBQUUsNEJBQVc7d0JBQ2xCLElBQUksR0FBRyxhQUFhO2NBQzlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFpQmUsRUFBRSwwQkFBUyxHQUFHLEVBQUU7cUJBQ3hCLE9BQU8sR0FBRyxLQUFLLFdBQVcsRUFBRTt3QkFDekIsR0FBRyxRQUFROztxQkFFZCxHQUFHLEtBQUssQ0FBQyxFQUFFO3lCQUNQLENBQUMsSUFBSSxFQUFFO3dCQUVWOztrQ0FFWSxHQUFHLElBQUksR0FBRyxHQUFHOzt3QkFFdkIsSUFBSTtjQUNkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkF1QmMsRUFBRSwyQkFBVztxQkFDcEIsYUFBYSxHQUFHLFVBQVU7MkJBQ3BCLEdBQUcsQ0FBQzt3QkFDUCxhQUFhO2NBQ3ZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkFnQ08sRUFBRSxrQkFBUyxHQUFHLEVBQUU7c0JBQ2YsR0FBRyxHQUFHLElBQUksS0FBSzt3QkFDYixJQUFJO2NBQ2Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NCQXFEUSxFQUFFLG1CQUFTLEdBQUcsRUFBRTt1QkFDZixHQUFHLEdBQUcsSUFBSSxNQUFNO3dCQUNmLElBQUk7Y0FDZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQW9DTSxFQUFFLGlCQUFTLEdBQUcsRUFBRTtxQkFDZixHQUFHLEdBQUcsSUFBSSxJQUFJO3dCQUNYLElBQUk7Y0FDZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQW1ESyxFQUFFLGdCQUFTLEdBQUcsRUFBRTtvQkFDZixHQUFHLEdBQUcsSUFBSSxHQUFHO3dCQUNULElBQUk7Y0FDZDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFtQkksRUFBRSxpQkFBVztxQkFDVixDQUFDLE9BQU8sRUFBRTs7Ozs0QkFJSCxHQUFHLElBQUk7Ozs7Ozs7OEJBT0wsR0FBRyxxQkFBcUIsQ0FBQyxVQUFTLFNBQVMsRUFBRTs7NkJBRTlDLENBQUMsQ0FBQyxDQUFDOzs7O2dDQUlBLEdBQUcsSUFBSTs7Ozt3Q0FJQyxHQUFHLFNBQVM7c0NBQ2QsR0FBRyxTQUFTO3lDQUNULEdBQUcsQ0FBQzs7O2tDQUdYLEdBQUcscUJBQXFCLENBQUMsT0FBTyxDQUFDO3NCQUM3QyxDQUFDOzt3QkFFQyxJQUFJO2NBQ2Q7Ozs7Ozs7Ozs7Ozs7OztpQkFlRyxFQUFFLGdCQUFXO3dCQUNOLEdBQUcsS0FBSzt3QkFDUixHQUFHLEtBQUs7cUNBQ0ssQ0FBQyxTQUFTLENBQUM7d0JBQ3hCLElBQUk7Y0FDZDs7Ozs7Ozs7OztzQkFVUSxFQUFFLHFCQUFXO3dCQUNYLE9BQU87O1VBRXJCOzs7Ozs7Ozs7Ozs7Ozs7OztrQkFpQlEsT0FBTyxDQUFDLFNBQVMsRUFBRTs7O2lCQUdwQixTQUFTLEdBQUcsZUFBZSxHQUFHLGFBQWEsRUFBRTs7MEJBRXBDLEdBQUcscUJBQXFCLENBQUMsT0FBTyxDQUFDOzs7Ozs7Ozs7dUJBU3BDLElBQUksU0FBUyxHQUFHLGVBQWU7NEJBQzFCLEdBQUcsU0FBUzs7OztrQkFJdEIsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDOzs7Ozs7O2lCQU94QixTQUFTLEdBQUcsYUFBYSxHQUFHLElBQUksRUFBRTs7O29CQUcvQixHQUFHLElBQUksR0FBRyxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsR0FBRzs7OEJBRTdCLEdBQUcsU0FBUztpQ0FDVCxHQUFHLENBQUM7OzZCQUVSLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkJBNkRKLEdBQUcsQ0FBQztvQkFDWCxVQUFVLElBQUksa0JBQWtCLEVBQUU7dUJBQy9CLENBQUMsa0JBQWtCLENBQUM7MkJBQ2hCLElBQUksa0JBQWtCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkEwQjVCLEVBQUUsY0FBYyxJQUFJLEdBQUcsRUFBRTswQkFDcEIsR0FBRyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkF1QmhCLENBQUMsVUFBVSxHQUFHLGtCQUFrQixDQUFDOzs7O2dCQUlsQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUM7O2tCQUVWLEdBQUcsS0FBSzs7O3NCQUdKLEdBQUcscUJBQXFCLENBQUMsT0FBTyxDQUFDOzs7O2FBSTFDLE9BQU8sTUFBTSxLQUFLLFVBQVUsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFO21CQUN0QyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7OztjQUdwQixJQUFJLFFBQU8sT0FBTyxxREFBUCxPQUFPLE9BQUssUUFBUSxFQUFFO3VCQUM1QixDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUTs7TUFHakMsQ0FBQSxFQUFHOzs7O0tDM3RCaUIsbUJBQW1CO2NBQW5CLG1CQUFtQjsyQ0FBbkIsbUJBQW1COzs7OEJBQW5CLG1CQUFtQjs7bUNBQzFCLFlBQXVDLEVBQXdCO3FCQUM3RCxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7O29CQUV6QixJQUFJOzs7O21DQUdMLFlBQXlELEVBQXdCO3FCQUMvRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7O29CQUV2QixJQUFJOzs7O2lDQUdBO3FCQUNILENBQUMsS0FBSyxFQUFFOzs7WUFkSCxtQkFBbUI7OztVQ096QjtvQkFDSSw2QkFBc0I7Z0JBQVMsSUFBSSxvQkFBb0IsRUFBRTtNQUFHO2lCQUUvRCwwQkFBbUI7Z0JBQVMsSUFBSSxpQkFBaUIsRUFBRTtNQUFHO2dCQUV2RCx5QkFBa0I7Z0JBQVMsSUFBSSxnQkFBZ0IsRUFBRTtNQUFHO2dCQUVwRCx5QkFBa0I7Z0JBQVMsSUFBSSxXQUFXLENBQUMsSUFBSSxlQUFlLEVBQUUsQ0FBQztNQUFHO2tCQUVsRSwyQkFBb0I7Z0JBQVMsSUFBSSxhQUFhLEVBQUU7TUFBRztnQkFFckQseUJBQWtCO2dCQUFTLElBQUksbUJBQW1CLEVBQUU7TUFBRztlQUV4RCx3QkFBaUI7Z0JBQVMsSUFBSSxxQkFBcUIsRUFBRTs7RUFDbEU7O0NDdkJNLElBQU0sV0FBVyxHQUFHLENBQUM7O0NDSTVCLE1BQU0sQ0FBQyxNQUFNLHlEQUFHO1NBQ04sV0FBVyxFQUNYLEtBQUssRUFFTCxVQUFVLEVBQ1YsV0FBVyxFQUNYLE1BQU0sRUFFTixZQUFZLEVBQ1osT0FBTyxFQU1QLGFBQWEsRUFDYixlQUFlLEVBQ2YsV0FBVyxFQUViLFdBQVc7Ozs7O2dDQWxCRSxHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUU7OzRCQUNWLFdBQVcsQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUM7OzswQkFBN0Q7K0JBRUssR0FBSSxFQUFFLENBQUMsVUFBVSxFQUFFO2dDQUNsQixHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUU7bUNBQ2hCLFdBQVc7OzRCQUFlLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUcsV0FBVyxFQUFFLENBQUM7Ozs7MkJBQXBHLGVBQW9CLE9BQU87aUNBRXJCLEdBQUcsRUFBRSxDQUFDLFlBQVksRUFBRTs0QkFDekIsR0FBUSxZQUFZLENBQUMsV0FBVyxFQUFFOztpQ0FFbkMsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7aUNBQ2pELENBQUMsc0JBQXNCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQztpQ0FDNUMsQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDOztrQ0FFOUMsR0FBSyxFQUFFLENBQUMsYUFBYSxFQUFFO29DQUNyQixHQUFHLEVBQUUsQ0FBQyxlQUFlLEVBQUU7Z0NBQzNCLEdBQU8sRUFBRSxDQUFDLFdBQVcsRUFBRTtnQ0FFekIsR0FBRyxJQUFJOzs2QkFFZCxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFBLENBQUMsRUFBSTs2QkFDaEMsV0FBVyxFQUFFO3lDQUNELENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzBCQUNyRSxNQUFNO3lDQUNTLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7b0NBR3RELEdBQUcsQ0FBQyxXQUFXO3NCQUM3QixDQUFDOztnQ0FFUyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUssRUFBSTtvQ0FDSixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxLQUFLO3NDQUMxQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7c0JBQy9CLENBQUMsQ0FDRixTQUFTLENBQUMsVUFBQSx1QkFBdUI7Z0NBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLHVCQUF1QixDQUFDO3NCQUFBLENBQUMsQ0FDckgsS0FBSyxFQUFFOzs7Ozs7OztFQUN0QixFQUFBOzsifQ==