'use strict';

var _slice = Array.prototype.slice;

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x7, _x8, _x9) { var _again = true; _function: while (_again) { var object = _x7, property = _x8, receiver = _x9; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x7 = parent; _x8 = property; _x9 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (exports, MainLoop, three, _qwest) {
    'use strict';

    MainLoop = 'default' in MainLoop ? MainLoop['default'] : MainLoop;
    three = 'default' in three ? three['default'] : three;
    _qwest = 'default' in _qwest ? _qwest['default'] : _qwest;

    function interfaceImplementationCheck(base, self) {
        var methodsNotImplemented = [];

        Object.getOwnPropertyNames(base.prototype).forEach(function (method) {
            if (!Object.getPrototypeOf(self).hasOwnProperty(method)) {
                methodsNotImplemented.push(method);
            }
        });

        if (methodsNotImplemented.length > 0) {
            throw new TypeError([self.constructor.name, 'does not implement', base.name, 'methods'].concat(methodsNotImplemented).join(' '));
        }
    }

    function interfaceInstantiationCheck(base, self, derrivedClass) {
        if (!(self instanceof derrivedClass)) {
            throw TypeError('Cannot instantiate interface', base.name);
        }
    }

    var Interface = function Interface(type, implementingClasses) {
        _classCallCheck(this, Interface);

        interfaceInstantiationCheck(type, this, implementingClasses);
        interfaceImplementationCheck(type, this);
    };

    var IRenderer = (function (_Interface) {
        _inherits(IRenderer, _Interface);

        function IRenderer(derrivedClass) {
            _classCallCheck(this, IRenderer);

            _get(Object.getPrototypeOf(IRenderer.prototype), 'constructor', this).call(this, IRenderer, derrivedClass);
        }

        _createClass(IRenderer, [{
            key: 'update',
            value: function update(delta) {}
        }, {
            key: 'draw',
            value: function draw(interpolationPercentage, scene) {}
        }]);

        return IRenderer;
    })(Interface);

    var ThreeRenderer = (function (_IRenderer) {
        _inherits(ThreeRenderer, _IRenderer);

        function ThreeRenderer() {
            _classCallCheck(this, ThreeRenderer);

            _get(Object.getPrototypeOf(ThreeRenderer.prototype), 'constructor', this).call(this, ThreeRenderer);

            // todo: check with three for compatability
            if (typeof window === 'undefined') {
                throw Error('the WebGLRenderer can only be used in a browser environment.');
            }

            this.scene = new three.Scene();

            this.camera = new three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
            this.camera.position.x = -10;
            this.camera.position.y = 14;
            this.camera.position.z = 10;

            this.renderer = new three.WebGLRenderer();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(this.renderer.domElement);

            var geometry = new three.BoxGeometry(1, 1, 1);
            var material = new three.MeshBasicMaterial({ color: 0x00ff00 });
            this.cube = new three.Mesh(geometry, material);
            this.scene.add(this.cube);

            this.camera.position.z = 5;
        }

        _createClass(ThreeRenderer, [{
            key: 'update',
            value: function update(delta) {
                this.cube.rotation.x += 0.1;
                this.cube.rotation.y += 0.1;
            }
        }, {
            key: 'draw',
            value: function draw(interpolationPercentage, scene) {
                this.camera.lookAt(scene.position);
                this.camera.updateMatrixWorld();

                this.renderer.render(scene, this.camera);
            }
        }]);

        return ThreeRenderer;
    })(IRenderer);

    var DebugRenderer = (function (_IRenderer2) {
        _inherits(DebugRenderer, _IRenderer2);

        function DebugRenderer() {
            _classCallCheck(this, DebugRenderer);

            _get(Object.getPrototypeOf(DebugRenderer.prototype), 'constructor', this).call(this, DebugRenderer);
        }

        _createClass(DebugRenderer, [{
            key: 'update',
            value: function update(delta) {
                console.log('debug update', delta);
            }
        }, {
            key: 'draw',
            value: function draw(interpolationPercentage, scene) {
                console.log('debug draw', interpolationPercentage, scene);
            }
        }]);

        return DebugRenderer;
    })(IRenderer);

    var Level = function Level(name, scene, navMeshGroup) {
        _classCallCheck(this, Level);

        this.name = name;
        this.scene = scene;
        this.navMeshGroup = navMeshGroup;
    }

    // http://davidwalsh.name/async-generators
    // run (async) a generator to completion
    // Note: simplified approach: no error handling here
    ;

    function spawn(generator) {
        var it = generator(),
            ret;

        // asynchronously iterate over generator
        (function iterate(val) {
            ret = it.next(val);

            if (!ret.done) {
                if ('then' in ret.value) {
                    // wait on the promise
                    ret.value.then(iterate);
                }
                // immediate value: just send right back in
                else {
                        // avoid synchronous recursion
                        setTimeout(function () {
                            iterate(ret.value);
                        }, 0);
                    }
            }
        })();
    }

    var IMeshLoader = (function (_Interface2) {
        _inherits(IMeshLoader, _Interface2);

        function IMeshLoader(derrivedClass) {
            _classCallCheck(this, IMeshLoader);

            _get(Object.getPrototypeOf(IMeshLoader.prototype), 'constructor', this).call(this, IMeshLoader, derrivedClass);
        }

        _createClass(IMeshLoader, [{
            key: 'load',
            value: function load(path) {}
        }]);

        return IMeshLoader;
    })(Interface);

    var ThreeJSONMeshLoader = (function (_IMeshLoader) {
        _inherits(ThreeJSONMeshLoader, _IMeshLoader);

        function ThreeJSONMeshLoader() {
            _classCallCheck(this, ThreeJSONMeshLoader);

            _get(Object.getPrototypeOf(ThreeJSONMeshLoader.prototype), 'constructor', this).call(this, ThreeJSONMeshLoader);

            this.jsonLoader = new three.JSONLoader();
        }

        _createClass(ThreeJSONMeshLoader, [{
            key: 'load',
            value: function load(path) {
                var _this = this;

                return new Promise(function (resolve, reject) {
                    _this.jsonLoader.load(path, function (geometry, materials) {
                        resolve(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                            color: 0xd79fd4,
                            opacity: 0.5,
                            transparent: true
                        })));
                    });
                }).then(function (mesh) {
                    return mesh;
                })['catch'](function (err) {
                    console.warn(err);
                });
            }
        }]);

        return ThreeJSONMeshLoader;
    })(IMeshLoader);

    var IAjaxLoader = (function (_Interface3) {
        _inherits(IAjaxLoader, _Interface3);

        function IAjaxLoader(derrivedClass) {
            _classCallCheck(this, IAjaxLoader);

            _get(Object.getPrototypeOf(IAjaxLoader.prototype), 'constructor', this).call(this, IAjaxLoader, derrivedClass);
        }

        _createClass(IAjaxLoader, [{
            key: 'get',
            value: function get(path) {
                return qwest.get(path).then(function (xhr, response) {
                    return JSON.parse(response.text);
                });
            }
        }]);

        return IAjaxLoader;
    })(Interface);

    var QwestAjaxLoader = (function (_IAjaxLoader) {
        _inherits(QwestAjaxLoader, _IAjaxLoader);

        function QwestAjaxLoader() {
            _classCallCheck(this, QwestAjaxLoader);

            _get(Object.getPrototypeOf(QwestAjaxLoader.prototype), 'constructor', this).call(this, QwestAjaxLoader);
        }

        _createClass(QwestAjaxLoader, [{
            key: 'get',
            value: function get(path) {
                return _qwest.get(path).then(function (xhr, response) {
                    return JSON.parse(response);
                });
            }
        }]);

        return QwestAjaxLoader;
    })(IAjaxLoader);

    function CreateMeshLoader() {
        return new ThreeJSONMeshLoader();
    }

    function CreateAjaxLoader() {
        return new QwestAjaxLoader();
    }

    var ISceneService = (function (_Interface4) {
        _inherits(ISceneService, _Interface4);

        function ISceneService(derrivedClass) {
            _classCallCheck(this, ISceneService);

            _get(Object.getPrototypeOf(ISceneService.prototype), 'constructor', this).call(this, ISceneService, derrivedClass);
        }

        _createClass(ISceneService, [{
            key: 'createScene',
            value: function createScene(mesh) {}
        }]);

        return ISceneService;
    })(Interface);

    var ThreeSceneService = (function (_ISceneService) {
        _inherits(ThreeSceneService, _ISceneService);

        function ThreeSceneService() {
            _classCallCheck(this, ThreeSceneService);

            _get(Object.getPrototypeOf(ThreeSceneService.prototype), 'constructor', this).call(this, ThreeSceneService);
        }

        _createClass(ThreeSceneService, [{
            key: 'createScene',
            value: function createScene() {
                return new three.Scene();
            }
        }]);

        return ThreeSceneService;
    })(ISceneService);

    function CreateSceneService() {
        return new ThreeSceneService();
    }

    var ILevelService = (function (_Interface5) {
        _inherits(ILevelService, _Interface5);

        function ILevelService(derrivedClass) {
            _classCallCheck(this, ILevelService);

            _get(Object.getPrototypeOf(ILevelService.prototype), 'constructor', this).call(this, ILevelService, derrivedClass);
        }

        _createClass(ILevelService, [{
            key: 'loadLevel',
            value: function loadLevel(path) {}
        }]);

        return ILevelService;
    })(Interface);

    var LevelService = (function (_ILevelService) {
        _inherits(LevelService, _ILevelService);

        function LevelService() {
            _classCallCheck(this, LevelService);

            _get(Object.getPrototypeOf(LevelService.prototype), 'constructor', this).call(this, LevelService);

            this.ajaxLOader = CreateAjaxLoader();
            this.sceneService = CreateSceneService();
            this.meshLoader = CreateMeshLoader();
        }

        _createClass(LevelService, [{
            key: 'loadLevel',
            value: function loadLevel(path) {
                var self = this;

                return new Promise(function (resolve, reject) {
                    spawn(regeneratorRuntime.mark(function callee$4$0() {
                        var scene, levelData, mesh, navMesh;
                        return regeneratorRuntime.wrap(function callee$4$0$(context$5$0) {
                            while (1) switch (context$5$0.prev = context$5$0.next) {
                                case 0:
                                    scene = self.sceneService.createScene();
                                    context$5$0.next = 3;
                                    return self.ajaxLOader.get(path);

                                case 3:
                                    levelData = context$5$0.sent;

                                    if (!levelData) {
                                        reject('Failed to load level ' + level);
                                    }

                                    context$5$0.next = 7;
                                    return self.meshLoader.load('meshes/' + levelData['mesh']);

                                case 7:
                                    mesh = context$5$0.sent;

                                    if (!mesh) {
                                        reject('Faield to load mesh ' + levelData['mesh']);
                                    }

                                    scene.add(mesh);

                                    context$5$0.next = 12;
                                    return self.meshLoader.load('meshes/' + levelData['nav-mesh']);

                                case 12:
                                    navMesh = context$5$0.sent;

                                    if (!navMesh) {
                                        reject('Faield to load mesh ' + levelData['nav-mesh']);
                                    }

                                    scene.add(navMesh);

                                    resolve(new Level(levelData['name'], scene, 'testgroup'));

                                case 16:
                                case 'end':
                                    return context$5$0.stop();
                            }
                        }, callee$4$0, this);
                    }));
                }).then(function (level) {
                    return level;
                })['catch'](function (msg) {
                    console.warn(msg);
                });
            }
        }]);

        return LevelService;
    })(ILevelService);

    var SystemType = {
        Logic: 0,
        Render: 1
    };

    var SystemManager = (function () {
        function SystemManager() {
            _classCallCheck(this, SystemManager);

            this.logicSystems = new Map();
            this.renderSystems = new Map();
        }

        _createClass(SystemManager, [{
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

                var systemId = Math.max.apply(Math, [0].concat(_toConsumableArray(this.logicSystems.keys()), _toConsumableArray(this.renderSystems.keys()))) + 1;

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
                return this.logicSystems['delete'](systemId) || this.renderSystems['delete'](systemId);
            }
        }]);

        return SystemManager;
    })();

    var EventHandler = (function () {
        function EventHandler() {
            _classCallCheck(this, EventHandler);

            this.events = new Map();
        }

        _createClass(EventHandler, [{
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
                            resolve(typeof context === 'object' ? callback.call.apply(callback, [context].concat(_toConsumableArray(args))) : callback.apply.apply(callback, [context].concat(_toConsumableArray(args))));
                        }, timeout);
                    });
                }

                return new Promise(function (resolve) {
                    resolve(typeof context === 'object' ? callback.call.apply(callback, [context].concat(_toConsumableArray(args))) : callback.apply.apply(callback, [context].concat(_toConsumableArray(args))));
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
                    eventId = Math.max.apply(Math, [eventId].concat(_toConsumableArray(event.keys())));
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
                                    return events['delete'](eventId);
                                }
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                                    _iterator2['return']();
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
                        if (!_iteratorNormalCompletion && _iterator['return']) {
                            _iterator['return']();
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

                var _args$splice2 = _slicedToArray(_args$splice, 1);

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
                        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                            _iterator3['return']();
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

                var _args$splice32 = _slicedToArray(_args$splice3, 2);

                var event = _args$splice32[0];
                var timeout = _args$splice32[1];

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
                        if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                            _iterator4['return']();
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

    var ComponentManager = (function () {
        function ComponentManager() {
            _classCallCheck(this, ComponentManager);

            this.components = new Map();
        }

        _createClass(ComponentManager, [{
            key: 'newComponent',
            value: function newComponent(componentId) {
                var component = this.components.get(componentId);

                if (component === null || component === undefined) {
                    return null;
                }

                switch (typeof component) {
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
                if (component === null || component === undefined) {
                    throw TypeError('component cannot be null.');
                }

                var max = Math.max.apply(Math, _toConsumableArray(this.components.keys()));

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

    var SelectorType = {
        Get: 0,
        GetWith: 1,
        GetWithOnly: 2,
        GetWithout: 3
    };

    var EntityManager = (function () {
        function EntityManager() {
            var capacity = arguments.length <= 0 || arguments[0] === undefined ? 1000 : arguments[0];

            _classCallCheck(this, EntityManager);

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

        _createClass(EntityManager, [{
            key: 'increaseCapacity',
            value: function increaseCapacity() {
                var oldCapacity = this.capacity;

                this.capacity *= 2;

                for (var i = oldCapacity; i < this.capacity; ++i) {
                    this.entities[i] = 0;
                }

                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = this.componentManager.getComponents().keys()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var componentId = _step5.value;

                        for (var i = oldCapacity; i < this.capacity; ++i) {
                            this[componentId].push(this.componentManager.newComponent(componentId));
                        }
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5['return']) {
                            _iterator5['return']();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
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
                var entityId;
                return regeneratorRuntime.wrap(function getEntities$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            context$3$0.t0 = type;
                            context$3$0.next = context$3$0.t0 === SelectorType.GetWith ? 3 : context$3$0.t0 === SelectorType.GetWithOnly ? 14 : context$3$0.t0 === SelectorType.GetWithout ? 25 : context$3$0.t0 === SelectorType.Get ? 36 : 46;
                            break;

                        case 3:
                            context$3$0.t1 = regeneratorRuntime.keys(this.entities);

                        case 4:
                            if ((context$3$0.t2 = context$3$0.t1()).done) {
                                context$3$0.next = 13;
                                break;
                            }

                            entityId = context$3$0.t2.value;

                            if (!(entityId > this.currentMaxEntity)) {
                                context$3$0.next = 8;
                                break;
                            }

                            return context$3$0.abrupt('return');

                        case 8:
                            if (!(this.entities[entityId] !== 0 && (this.entities[entityId] & components) === components)) {
                                context$3$0.next = 11;
                                break;
                            }

                            context$3$0.next = 11;
                            return Math.floor(entityId);

                        case 11:
                            context$3$0.next = 4;
                            break;

                        case 13:
                            return context$3$0.abrupt('break', 46);

                        case 14:
                            context$3$0.t3 = regeneratorRuntime.keys(this.entities);

                        case 15:
                            if ((context$3$0.t4 = context$3$0.t3()).done) {
                                context$3$0.next = 24;
                                break;
                            }

                            entityId = context$3$0.t4.value;

                            if (!(entityId > this.currentMaxEntity)) {
                                context$3$0.next = 19;
                                break;
                            }

                            return context$3$0.abrupt('return');

                        case 19:
                            if (!(this.entities[entityId] !== 0 && this.entities[entityId] === components)) {
                                context$3$0.next = 22;
                                break;
                            }

                            context$3$0.next = 22;
                            return Math.floor(entityId);

                        case 22:
                            context$3$0.next = 15;
                            break;

                        case 24:
                            return context$3$0.abrupt('break', 46);

                        case 25:
                            context$3$0.t5 = regeneratorRuntime.keys(this.entities);

                        case 26:
                            if ((context$3$0.t6 = context$3$0.t5()).done) {
                                context$3$0.next = 35;
                                break;
                            }

                            entityId = context$3$0.t6.value;

                            if (!(entityId > this.currentMaxEntity)) {
                                context$3$0.next = 30;
                                break;
                            }

                            return context$3$0.abrupt('return');

                        case 30:
                            if (!(this.entities[entityId] !== 0 && (this.entities[entityId] & components) !== components)) {
                                context$3$0.next = 33;
                                break;
                            }

                            context$3$0.next = 33;
                            return Math.floor(entityId);

                        case 33:
                            context$3$0.next = 26;
                            break;

                        case 35:
                            return context$3$0.abrupt('break', 46);

                        case 36:
                            context$3$0.t7 = regeneratorRuntime.keys(this.entities);

                        case 37:
                            if ((context$3$0.t8 = context$3$0.t7()).done) {
                                context$3$0.next = 45;
                                break;
                            }

                            entityId = context$3$0.t8.value;

                            if (!(entityId > this.currentMaxEntity)) {
                                context$3$0.next = 41;
                                break;
                            }

                            return context$3$0.abrupt('return');

                        case 41:
                            context$3$0.next = 43;
                            return Math.floor(entityId);

                        case 43:
                            context$3$0.next = 37;
                            break;

                        case 45:
                            return context$3$0.abrupt('break', 46);

                        case 46:
                        case 'end':
                            return context$3$0.stop();
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

                switch (typeof component) {
                    case 'function':
                        initializer = component;break;
                    case 'object':
                        {
                            initializer = function () {
                                var _iteratorNormalCompletion6 = true;
                                var _didIteratorError6 = false;
                                var _iteratorError6 = undefined;

                                try {
                                    for (var _iterator6 = Object.keys(component)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                        var key = _step6.value;

                                        this[key] = component[key];
                                    }
                                } catch (err) {
                                    _didIteratorError6 = true;
                                    _iteratorError6 = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion6 && _iterator6['return']) {
                                            _iterator6['return']();
                                        }
                                    } finally {
                                        if (_didIteratorError6) {
                                            throw _iteratorError6;
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
                var _iteratorNormalCompletion7 = true;
                var _didIteratorError7 = false;
                var _iteratorError7 = undefined;

                try {
                    for (var _iterator7 = this.systemManager.logicSystems.values()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                        var system = _step7.value;

                        system.callback.call(this, this.getEntities(system.components, system.selector), delta);
                    }
                } catch (err) {
                    _didIteratorError7 = true;
                    _iteratorError7 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion7 && _iterator7['return']) {
                            _iterator7['return']();
                        }
                    } finally {
                        if (_didIteratorError7) {
                            throw _iteratorError7;
                        }
                    }
                }
            }
        }, {
            key: 'onRender',
            value: function onRender(delta) {
                var _iteratorNormalCompletion8 = true;
                var _didIteratorError8 = false;
                var _iteratorError8 = undefined;

                try {
                    for (var _iterator8 = this.systemManager.renderSystems.values()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                        var system = _step8.value;

                        system.callback.call(this, this.getEntities(system.components, system.selector), delta);
                    }
                } catch (err) {
                    _didIteratorError8 = true;
                    _iteratorError8 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion8 && _iterator8['return']) {
                            _iterator8['return']();
                        }
                    } finally {
                        if (_didIteratorError8) {
                            throw _iteratorError8;
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

                return (_eventHandler$trigger = this.eventHandler.trigger).call.apply(_eventHandler$trigger, [this].concat(_slice.call(arguments)));
            }
        }, {
            key: 'triggerDelayed',
            value: function triggerDelayed() {
                var _eventHandler$triggerDelayed;

                return (_eventHandler$triggerDelayed = this.eventHandler.triggerDelayed).call.apply(_eventHandler$triggerDelayed, [this].concat(_slice.call(arguments)));
            }
        }]);

        return EntityManager;
    })();

    var EntityFactory = (function () {
        function EntityFactory() {
            _classCallCheck(this, EntityFactory);

            this.initializers = new Map();
            this.configuration = new Map();
        }

        _createClass(EntityFactory, [{
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

                var _iteratorNormalCompletion9 = true;
                var _didIteratorError9 = false;
                var _iteratorError9 = undefined;

                try {
                    for (var _iterator9 = configuration.keys()[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                        var component = _step9.value;

                        components |= component;
                    }
                } catch (err) {
                    _didIteratorError9 = true;
                    _iteratorError9 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion9 && _iterator9['return']) {
                            _iterator9['return']();
                        }
                    } finally {
                        if (_didIteratorError9) {
                            throw _iteratorError9;
                        }
                    }
                }

                var entities = [];

                for (var i = 0; i < count; ++i) {
                    var entityId = entityManager.newEntity(components);

                    if (entityId >= entityManager.capacity) {
                        continue;
                    }

                    var _iteratorNormalCompletion10 = true;
                    var _didIteratorError10 = false;
                    var _iteratorError10 = undefined;

                    try {
                        for (var _iterator10 = configuration[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                            var _step10$value = _slicedToArray(_step10.value, 2);

                            var componentId = _step10$value[0];
                            var initializer = _step10$value[1];

                            if (typeof initializer !== 'function') {
                                continue;
                            }

                            var result = initializer.call(entityManager[componentId][entityId]);

                            if (typeof entityManager[componentId][entityId] !== 'function' && typeof entityManager[componentId][entityId] !== 'object' && result !== undefined) {
                                entityManager[componentId][entityId] = result;
                            }
                        }
                    } catch (err) {
                        _didIteratorError10 = true;
                        _iteratorError10 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion10 && _iterator10['return']) {
                                _iterator10['return']();
                            }
                        } finally {
                            if (_didIteratorError10) {
                                throw _iteratorError10;
                            }
                        }
                    }

                    entities.push(entityId);
                }

                return entities.length === 1 ? entities[0] : entities;
            }
        }]);

        return EntityFactory;
    })();

    var Game = (function () {
        function Game(renderer) {
            _classCallCheck(this, Game);

            this.renderer = renderer;
            this.level = null;
            this.entityManager = new EntityManager(200);
        }

        _createClass(Game, [{
            key: 'setLevel',
            value: function setLevel(level) {
                this.level = level;
            }
        }, {
            key: 'update',
            value: function update(delta) {
                this.renderer.update(delta);
            }
        }, {
            key: 'draw',
            value: function draw(interpolationPercentage) {
                this.renderer.draw(interpolationPercentage, this.level.scene);
            }
        }]);

        return Game;
    })();

    var App = (function () {
        function App() {
            var game = arguments.length <= 0 || arguments[0] === undefined ? new Game(new ThreeRenderer()) : arguments[0];

            _classCallCheck(this, App);

            this.game = game;
            this.three = three;
        }

        _createClass(App, [{
            key: 'update',
            value: function update(delta) {
                this.game.update(delta);
            }
        }, {
            key: 'draw',
            value: function draw(interpolationPercentage) {
                this.game.draw(interpolationPercentage);
            }
        }, {
            key: 'run',
            value: function run() {
                var levelService = new GG100k.LevelService();

                var app = this;

                spawn(regeneratorRuntime.mark(function callee$3$0() {
                    var level, ambient, directionalLight;
                    return regeneratorRuntime.wrap(function callee$3$0$(context$4$0) {
                        while (1) switch (context$4$0.prev = context$4$0.next) {
                            case 0:
                                context$4$0.next = 2;
                                return levelService.loadLevel('levels/level-one.js');

                            case 2:
                                level = context$4$0.sent;
                                ambient = new three.AmbientLight(0x101030);

                                level.scene.add(ambient);

                                directionalLight = new three.DirectionalLight(0xffeedd);

                                directionalLight.position.set(0, 0.5, 0.5);
                                level.scene.add(directionalLight);

                                app.game.setLevel(level);

                                MainLoop.setUpdate(function (delta) {
                                    app.update(delta);
                                }).setDraw(function (interpolationPercentage) {
                                    app.draw(interpolationPercentage);
                                }).start();

                            case 10:
                            case 'end':
                                return context$4$0.stop();
                        }
                    }, callee$3$0, this);
                }));
            }
        }]);

        return App;
    })();

    exports.App = App;
    exports.Game = Game;
    exports.LevelService = LevelService;
    exports.IRenderer = IRenderer;
    exports.DebugRenderer = DebugRenderer;
    exports.ThreeRenderer = ThreeRenderer;
})(this.GG100k = {}, MainLoop, THREE, qwest);

//# sourceMappingURL=data:application/json;base64,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RyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQ0FBRSxDQUFDLENBQzFDLE9BQU8sQ0FBQyxVQUFBLHVCQUF1QixFQUFJO0FBQUUsdUNBQUcsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztpQ0FBRSxDQUFDLENBQzFFLEtBQUssRUFBRSxDQUFDOzs7Ozs7O2lCQUNwQixFQUFDLENBQUM7YUFDTjs7O2VBbkNDLEdBQUc7OztBQXNDVCxXQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNsQixXQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNwQixXQUFPLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztBQUNwQyxXQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUM5QixXQUFPLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUN0QyxXQUFPLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztDQUV6QyxDQUFBLENBQUcsVUFBSyxNQUFNLEdBQUcsRUFBRSxFQUFFLFFBQVEsRUFBQyxLQUFLLEVBQUMsS0FBSyxDQUFDLENBQUMiLCJmaWxlIjoidW5kZWZpbmVkIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChleHBvcnRzLE1haW5Mb29wLHRocmVlLF9xd2VzdCkgeyAndXNlIHN0cmljdCc7XG5cbiAgICBNYWluTG9vcCA9ICdkZWZhdWx0JyBpbiBNYWluTG9vcCA/IE1haW5Mb29wWydkZWZhdWx0J10gOiBNYWluTG9vcDtcbiAgICB0aHJlZSA9ICdkZWZhdWx0JyBpbiB0aHJlZSA/IHRocmVlWydkZWZhdWx0J10gOiB0aHJlZTtcbiAgICBfcXdlc3QgPSAnZGVmYXVsdCcgaW4gX3F3ZXN0ID8gX3F3ZXN0WydkZWZhdWx0J10gOiBfcXdlc3Q7XG5cbiAgICBmdW5jdGlvbiBpbnRlcmZhY2VJbXBsZW1lbnRhdGlvbkNoZWNrKGJhc2UsIHNlbGYpIHtcbiAgICAgICAgbGV0IG1ldGhvZHNOb3RJbXBsZW1lbnRlZCA9IFtdO1xuXG4gICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGJhc2UucHJvdG90eXBlKS5mb3JFYWNoKG1ldGhvZCA9PiB7XG4gICAgICAgICAgICBpZiAoIU9iamVjdC5nZXRQcm90b3R5cGVPZihzZWxmKS5oYXNPd25Qcm9wZXJ0eShtZXRob2QpKSB7XG4gICAgICAgICAgICAgICAgbWV0aG9kc05vdEltcGxlbWVudGVkLnB1c2gobWV0aG9kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBpZiAobWV0aG9kc05vdEltcGxlbWVudGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoW3NlbGYuY29uc3RydWN0b3IubmFtZSwgJ2RvZXMgbm90IGltcGxlbWVudCcsIGJhc2UubmFtZSwgJ21ldGhvZHMnLCAuLi5tZXRob2RzTm90SW1wbGVtZW50ZWRdLmpvaW4oJyAnKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnRlcmZhY2VJbnN0YW50aWF0aW9uQ2hlY2soYmFzZSwgc2VsZiwgZGVycml2ZWRDbGFzcykge1xuICAgICAgICBpZiAoIShzZWxmIGluc3RhbmNlb2YgZGVycml2ZWRDbGFzcykpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignQ2Fubm90IGluc3RhbnRpYXRlIGludGVyZmFjZScsIGJhc2UubmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBJbnRlcmZhY2Uge1xuICAgICAgICBjb25zdHJ1Y3Rvcih0eXBlLCBpbXBsZW1lbnRpbmdDbGFzc2VzKSB7XG4gICAgICAgICAgICBpbnRlcmZhY2VJbnN0YW50aWF0aW9uQ2hlY2sodHlwZSwgdGhpcywgaW1wbGVtZW50aW5nQ2xhc3Nlcyk7XG4gICAgICAgICAgICBpbnRlcmZhY2VJbXBsZW1lbnRhdGlvbkNoZWNrKHR5cGUsIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgSVJlbmRlcmVyIGV4dGVuZHMgSW50ZXJmYWNlIHtcbiAgICAgICAgY29uc3RydWN0b3IoZGVycml2ZWRDbGFzcykge1xuICAgICAgICAgICAgc3VwZXIoSVJlbmRlcmVyLCBkZXJyaXZlZENsYXNzKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdXBkYXRlKGRlbHRhKSB7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGRyYXcoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UsIHNjZW5lKSB7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBUaHJlZVJlbmRlcmVyIGV4dGVuZHMgSVJlbmRlcmVyIHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcihUaHJlZVJlbmRlcmVyKTtcblxuICAgICAgICAgICAgLy8gdG9kbzogY2hlY2sgd2l0aCB0aHJlZSBmb3IgY29tcGF0YWJpbGl0eVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ3RoZSBXZWJHTFJlbmRlcmVyIGNhbiBvbmx5IGJlIHVzZWQgaW4gYSBicm93c2VyIGVudmlyb25tZW50LicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNjZW5lICA9IG5ldyB0aHJlZS5TY2VuZSgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmNhbWVyYSA9IG5ldyB0aHJlZS5QZXJzcGVjdGl2ZUNhbWVyYSggNDUsIHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LCAxLCAyMDAwICk7XG4gICAgXHRcdHRoaXMuY2FtZXJhLnBvc2l0aW9uLnggPSAtMTA7XG4gICAgXHRcdHRoaXMuY2FtZXJhLnBvc2l0aW9uLnkgPSAxNDtcbiAgICBcdFx0dGhpcy5jYW1lcmEucG9zaXRpb24ueiA9IDEwO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IHRocmVlLldlYkdMUmVuZGVyZXIoKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJlci5kb21FbGVtZW50KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGdlb21ldHJ5ID0gbmV3IHRocmVlLkJveEdlb21ldHJ5KCAxLCAxLCAxICk7XG4gICAgICAgICAgICB2YXIgbWF0ZXJpYWwgPSBuZXcgdGhyZWUuTWVzaEJhc2ljTWF0ZXJpYWwoIHsgY29sb3I6IDB4MDBmZjAwIH0gKTtcbiAgICAgICAgICAgIHRoaXMuY3ViZSA9IG5ldyB0aHJlZS5NZXNoKCBnZW9tZXRyeSwgbWF0ZXJpYWwgKTtcbiAgICAgICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuY3ViZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnogPSA1O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB1cGRhdGUoZGVsdGEpIHtcbiAgICAgICAgICAgIHRoaXMuY3ViZS5yb3RhdGlvbi54ICs9IDAuMTtcbiAgICAgICAgICAgIHRoaXMuY3ViZS5yb3RhdGlvbi55ICs9IDAuMTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZHJhdyhpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSwgc2NlbmUpIHtcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLmxvb2tBdChzY2VuZS5wb3NpdGlvbik7XG4gICAgXHRcdHRoaXMuY2FtZXJhLnVwZGF0ZU1hdHJpeFdvcmxkKCk7XG4gICAgXHRcdFxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoc2NlbmUsIHRoaXMuY2FtZXJhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIERlYnVnUmVuZGVyZXIgZXh0ZW5kcyBJUmVuZGVyZXIge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKERlYnVnUmVuZGVyZXIpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHVwZGF0ZShkZWx0YSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2RlYnVnIHVwZGF0ZScsIGRlbHRhKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZHJhdyhpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSwgc2NlbmUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkZWJ1ZyBkcmF3JywgaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UsIHNjZW5lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIExldmVsIHtcbiAgICAgICAgY29uc3RydWN0b3IobmFtZSwgc2NlbmUsIG5hdk1lc2hHcm91cCkge1xuICAgICAgICAgICAgdGhpcy5uYW1lICAgICAgICAgPSBuYW1lO1xuICAgICAgICAgICAgdGhpcy5zY2VuZSAgICAgICAgPSBzY2VuZTtcbiAgICAgICAgICAgIHRoaXMubmF2TWVzaEdyb3VwID0gbmF2TWVzaEdyb3VwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gaHR0cDovL2Rhdmlkd2Fsc2gubmFtZS9hc3luYy1nZW5lcmF0b3JzXG4gICAgLy8gcnVuIChhc3luYykgYSBnZW5lcmF0b3IgdG8gY29tcGxldGlvblxuICAgIC8vIE5vdGU6IHNpbXBsaWZpZWQgYXBwcm9hY2g6IG5vIGVycm9yIGhhbmRsaW5nIGhlcmVcbiAgICBmdW5jdGlvbiBzcGF3bihnZW5lcmF0b3IpIHtcbiAgICAgICAgdmFyIGl0ID0gZ2VuZXJhdG9yKCksIHJldDtcblxuICAgICAgICAvLyBhc3luY2hyb25vdXNseSBpdGVyYXRlIG92ZXIgZ2VuZXJhdG9yXG4gICAgICAgIChmdW5jdGlvbiBpdGVyYXRlKHZhbCl7XG4gICAgICAgICAgICByZXQgPSBpdC5uZXh0KHZhbCk7XG5cbiAgICAgICAgICAgIGlmICghcmV0LmRvbmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoJ3RoZW4nIGluIHJldC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB3YWl0IG9uIHRoZSBwcm9taXNlXG4gICAgICAgICAgICAgICAgICAgIHJldC52YWx1ZS50aGVuKGl0ZXJhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpbW1lZGlhdGUgdmFsdWU6IGp1c3Qgc2VuZCByaWdodCBiYWNrIGluXG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGF2b2lkIHN5bmNocm9ub3VzIHJlY3Vyc2lvblxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlcmF0ZShyZXQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKCk7XG4gICAgfVxuXG4gICAgY2xhc3MgSU1lc2hMb2FkZXIgZXh0ZW5kcyBJbnRlcmZhY2Uge1xuICAgICAgICBjb25zdHJ1Y3RvcihkZXJyaXZlZENsYXNzKSB7XG4gICAgICAgICAgICBzdXBlcihJTWVzaExvYWRlciwgZGVycml2ZWRDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxvYWQocGF0aCkge1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgVGhyZWVKU09OTWVzaExvYWRlciBleHRlbmRzIElNZXNoTG9hZGVyIHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcihUaHJlZUpTT05NZXNoTG9hZGVyKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5qc29uTG9hZGVyID0gbmV3IHRocmVlLkpTT05Mb2FkZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbG9hZChwYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuanNvbkxvYWRlci5sb2FkKHBhdGgsIChnZW9tZXRyeSwgbWF0ZXJpYWxzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgICAgIFx0XHQgICAgICAgIFx0XHRjb2xvcjogMHhkNzlmZDQsXG4gICAgICAgIFx0XHQgICAgICAgIFx0XHRvcGFjaXR5OiAwLjUsXG4gICAgICAgIFx0XHQgICAgICAgIFx0XHR0cmFuc3BhcmVudDogdHJ1ZVxuICAgICAgICBcdFx0ICAgICAgICBcdH0pKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KS50aGVuKG1lc2ggPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXNoO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgSUFqYXhMb2FkZXIgZXh0ZW5kcyBJbnRlcmZhY2Uge1xuICAgICAgICBjb25zdHJ1Y3RvcihkZXJyaXZlZENsYXNzKSB7XG4gICAgICAgICAgICBzdXBlcihJQWpheExvYWRlciwgZGVycml2ZWRDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGdldChwYXRoKSB7XG4gICAgICAgICAgICByZXR1cm4gcXdlc3QuZ2V0KHBhdGgpLnRoZW4oZnVuY3Rpb24oeGhyLCByZXNwb25zZSkgeyByZXR1cm4gSlNPTi5wYXJzZShyZXNwb25zZS50ZXh0KTsgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBRd2VzdEFqYXhMb2FkZXIgZXh0ZW5kcyBJQWpheExvYWRlciB7XG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoUXdlc3RBamF4TG9hZGVyKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZ2V0KHBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBfcXdlc3QuZ2V0KHBhdGgpLnRoZW4oZnVuY3Rpb24oeGhyLCByZXNwb25zZSkgeyByZXR1cm4gSlNPTi5wYXJzZShyZXNwb25zZSk7IH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gQ3JlYXRlTWVzaExvYWRlcigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUaHJlZUpTT05NZXNoTG9hZGVyKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gQ3JlYXRlQWpheExvYWRlcigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBRd2VzdEFqYXhMb2FkZXIoKTtcbiAgICB9XG5cbiAgICBjbGFzcyBJU2NlbmVTZXJ2aWNlIGV4dGVuZHMgSW50ZXJmYWNlIHtcbiAgICAgICAgY29uc3RydWN0b3IoZGVycml2ZWRDbGFzcykge1xuICAgICAgICAgICAgc3VwZXIoSVNjZW5lU2VydmljZSwgZGVycml2ZWRDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNyZWF0ZVNjZW5lKG1lc2gpIHtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIFRocmVlU2NlbmVTZXJ2aWNlIGV4dGVuZHMgSVNjZW5lU2VydmljZSB7XG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoVGhyZWVTY2VuZVNlcnZpY2UpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjcmVhdGVTY2VuZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgdGhyZWUuU2NlbmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIENyZWF0ZVNjZW5lU2VydmljZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUaHJlZVNjZW5lU2VydmljZSgpO1xuICAgIH1cblxuICAgIGNsYXNzIElMZXZlbFNlcnZpY2UgZXh0ZW5kcyBJbnRlcmZhY2Uge1xuICAgICAgICBjb25zdHJ1Y3RvcihkZXJyaXZlZENsYXNzKSB7XG4gICAgICAgICAgICBzdXBlcihJTGV2ZWxTZXJ2aWNlLCBkZXJyaXZlZENsYXNzKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbG9hZExldmVsKHBhdGgpIHtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIExldmVsU2VydmljZSBleHRlbmRzIElMZXZlbFNlcnZpY2Uge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKExldmVsU2VydmljZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuYWpheExPYWRlciAgID0gQ3JlYXRlQWpheExvYWRlcigpO1xuICAgICAgICAgICAgdGhpcy5zY2VuZVNlcnZpY2UgPSBDcmVhdGVTY2VuZVNlcnZpY2UoKTtcbiAgICAgICAgICAgIHRoaXMubWVzaExvYWRlciAgID0gQ3JlYXRlTWVzaExvYWRlcigpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsb2FkTGV2ZWwocGF0aCkge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHNwYXduKGZ1bmN0aW9uICooKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzY2VuZSA9IHNlbGYuc2NlbmVTZXJ2aWNlLmNyZWF0ZVNjZW5lKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGxldmVsRGF0YSA9IHlpZWxkIHNlbGYuYWpheExPYWRlci5nZXQocGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoIWxldmVsRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCdGYWlsZWQgdG8gbG9hZCBsZXZlbCAnICsgbGV2ZWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgbWVzaCA9IHlpZWxkIHNlbGYubWVzaExvYWRlci5sb2FkKCdtZXNoZXMvJyArIGxldmVsRGF0YVsnbWVzaCddKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICghbWVzaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCdGYWllbGQgdG8gbG9hZCBtZXNoICcgKyBsZXZlbERhdGFbJ21lc2gnXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHNjZW5lLmFkZChtZXNoKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGxldCBuYXZNZXNoID0geWllbGQgc2VsZi5tZXNoTG9hZGVyLmxvYWQoJ21lc2hlcy8nICsgbGV2ZWxEYXRhWyduYXYtbWVzaCddKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICghbmF2TWVzaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCdGYWllbGQgdG8gbG9hZCBtZXNoICcgKyBsZXZlbERhdGFbJ25hdi1tZXNoJ10pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBzY2VuZS5hZGQobmF2TWVzaCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG5ldyBMZXZlbChsZXZlbERhdGFbJ25hbWUnXSwgc2NlbmUsICd0ZXN0Z3JvdXAnKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KS50aGVuKGxldmVsID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGV2ZWw7XG4gICAgICAgICAgICB9KS5jYXRjaChtc2cgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2Fybihtc2cpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBTeXN0ZW1UeXBlID0ge1xuICAgICAgICBMb2dpYyAgIDogMCxcbiAgICAgICAgUmVuZGVyICA6IDFcbiAgICB9O1xuXG4gICAgY2xhc3MgU3lzdGVtTWFuYWdlciB7XG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgdGhpcy5sb2dpY1N5c3RlbXMgID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJTeXN0ZW1zID0gbmV3IE1hcCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZWdpc3RlclN5c3RlbSh0eXBlLCBzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmICh0eXBlICE9PSBTeXN0ZW1UeXBlLkxvZ2ljICYmIHR5cGUgIT09IFN5c3RlbVR5cGUuUmVuZGVyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCd0eXBlIG11c3QgYmUgYSB2YWxpZCBTeXN0ZW1UeXBlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGlmIChzZWxlY3RvciAhPT0gU2VsZWN0b3JUeXBlLkdldCAmJiBzZWxlY3RvciAhPT0gU2VsZWN0b3JUeXBlLkdldFdpdGggJiZcbiAgICAgICAgICAgICAgICBzZWxlY3RvciAhPT0gU2VsZWN0b3JUeXBlLkdldFdpdGhPbmx5ICYmIHNlbGVjdG9yICE9PSBTZWxlY3RvclR5cGUuR2V0V2l0aG91dCkge1xuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignc2VsZWN0b3IgbXVzdCBiZSBhIHZhbGlkIFNlbGVjdG9yVHlwZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnRzICE9PSAnbnVtYmVyJykgIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvbXBvbmVudHMgbXVzdCBiZSBhIG51bWJlci4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignY2FsbGJhY2sgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgc3lzdGVtID0ge1xuICAgICAgICAgICAgc2VsZWN0b3IsXG4gICAgICAgICAgICBjb21wb25lbnRzLFxuICAgICAgICAgICAgY2FsbGJhY2tcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBzeXN0ZW1JZCA9IE1hdGgubWF4KDAsIC4uLnRoaXMubG9naWNTeXN0ZW1zLmtleXMoKSwgLi4udGhpcy5yZW5kZXJTeXN0ZW1zLmtleXMoKSkgKyAxO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFN5c3RlbVR5cGUuTG9naWMgOiB0aGlzLmxvZ2ljU3lzdGVtcy5zZXQoc3lzdGVtSWQsIHN5c3RlbSk7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgU3lzdGVtVHlwZS5SZW5kZXIgOiB0aGlzLnJlbmRlclN5c3RlbXMuc2V0KHN5c3RlbUlkLCBzeXN0ZW0pOyBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHN5c3RlbUlkO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZW1vdmVTeXN0ZW0oc3lzdGVtSWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvZ2ljU3lzdGVtcy5kZWxldGUoc3lzdGVtSWQpIHx8IHRoaXMucmVuZGVyU3lzdGVtcy5kZWxldGUoc3lzdGVtSWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgRXZlbnRIYW5kbGVyIHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBNYXAoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZW1wdHlQcm9taXNlKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwcm9taXNlKGNhbGxiYWNrLCBjb250ZXh0LCBhcmdzLCB0aW1lb3V0KSB7XG4gICAgICAgICAgICBpZiAodGltZW91dCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0eXBlb2YgY29udGV4dCA9PT0gICdvYmplY3QnID8gY2FsbGJhY2suY2FsbChjb250ZXh0LCAuLi5hcmdzKSA6IGNhbGxiYWNrLmFwcGx5KGNvbnRleHQsIC4uLmFyZ3MpKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHR5cGVvZiBjb250ZXh0ID09PSAnb2JqZWN0JyA/IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgLi4uYXJncykgOiBjYWxsYmFjay5hcHBseShjb250ZXh0LCAuLi5hcmdzKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGlzdGVuKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgdHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoIXRoaXMuZXZlbnRzLmhhcyhldmVudCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50cy5zZXQoZXZlbnQsIG5ldyBNYXAoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBldmVudElkID0gLTE7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50SWQgPSBNYXRoLm1heChldmVudElkLCAuLi5ldmVudC5rZXlzKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICsrZXZlbnRJZDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5ldmVudHMuZ2V0KGV2ZW50KS5zZXQoZXZlbnRJZCwgY2FsbGJhY2spO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gZXZlbnRJZDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgc3RvcExpc3RlbihldmVudElkKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBldmVudHMgb2YgdGhpcy5ldmVudHMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpZCBvZiBldmVudHMua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpZCA9PT0gZXZlbnRJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50cy5kZWxldGUoZXZlbnRJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdHJpZ2dlcigpIHtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcyBpbnN0YW5jZW9mIEVudGl0eU1hbmFnZXIgPyB0aGlzLmV2ZW50SGFuZGxlciA6IHRoaXM7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgWyBldmVudCBdID0gYXJncy5zcGxpY2UoMCwgMSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXZlbnQgIT09ICdzdHJpbmcnIHx8ICFzZWxmLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuZW1wdHlQcm9taXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBwcm9taXNlcyA9IFtdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBjYWxsYmFjayBvZiBzZWxmLmV2ZW50cy5nZXQoZXZlbnQpLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChzZWxmLnByb21pc2UoY2FsbGJhY2ssIHRoaXMsIGFyZ3MsIDEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdHJpZ2dlckRlbGF5ZWQoKSB7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXMgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyID8gdGhpcy5ldmVudEhhbmRsZXIgOiB0aGlzO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IFsgZXZlbnQsIHRpbWVvdXQgXSA9IGFyZ3Muc3BsaWNlKDAsIDIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCAhTnVtYmVyLmlzSW50ZWdlcih0aW1lb3V0KSB8fCAhc2VsZi5ldmVudHMuaGFzKGV2ZW50KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmVtcHR5UHJvbWlzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgY2FsbGJhY2sgb2Ygc2VsZi5ldmVudHMuZ2V0KGV2ZW50KS52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2goc2VsZi5wcm9taXNlKGNhbGxiYWNrLCB0aGlzLCBhcmdzLCB0aW1lb3V0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBDb21wb25lbnRNYW5hZ2VyIHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBuZXcgTWFwKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIG5ld0NvbXBvbmVudChjb21wb25lbnRJZCkge1xuICAgICAgICAgICAgbGV0IGNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50cy5nZXQoY29tcG9uZW50SWQpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoY29tcG9uZW50ID09PSBudWxsIHx8IGNvbXBvbmVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZW9mIGNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzogcmV0dXJuIG5ldyBjb21wb25lbnQoKTtcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnICA6IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgoY29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmV0ID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGNvbXBvbmVudCkuZm9yRWFjaChrZXkgPT4gcmV0W2tleV0gPSBjb21wb25lbnRba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICAgICAgICAgIH0pKGNvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGlmIChjb21wb25lbnQgPT09IG51bGwgfHwgY29tcG9uZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ2NvbXBvbmVudCBjYW5ub3QgYmUgbnVsbC4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IG1heCA9IE1hdGgubWF4KC4uLnRoaXMuY29tcG9uZW50cy5rZXlzKCkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgaWQgPSBtYXggPT09IHVuZGVmaW5lZCB8fCBtYXggPT09IG51bGwgfHwgbWF4ID09PSAtSW5maW5pdHkgPyAxIDogbWF4ID09PSAwID8gMSA6IG1heCAqIDI7XG5cbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50cy5zZXQoaWQsIGNvbXBvbmVudCk7XG5cbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZ2V0Q29tcG9uZW50cygpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudHM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBTZWxlY3RvclR5cGUgPSB7XG4gICAgICAgIEdldCAgICAgICAgIDogMCxcbiAgICAgICAgR2V0V2l0aCAgICAgOiAxLFxuICAgICAgICBHZXRXaXRoT25seSA6IDIsXG4gICAgICAgIEdldFdpdGhvdXQgIDogM1xuICAgIH07XG5cbiAgICBjbGFzcyBFbnRpdHlNYW5hZ2VyIHtcbiAgICAgICAgY29uc3RydWN0b3IoY2FwYWNpdHkgPSAxMDAwKSB7XG4gICAgICAgICAgICB0aGlzLmNhcGFjaXR5ICAgICAgICAgPSBjYXBhY2l0eTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IC0xO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkgICAgPSBuZXcgRW50aXR5RmFjdG9yeSgpO1xuICAgICAgICAgICAgdGhpcy5zeXN0ZW1NYW5hZ2VyICAgID0gbmV3IFN5c3RlbU1hbmFnZXIoKTtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50TWFuYWdlciA9IG5ldyBDb21wb25lbnRNYW5hZ2VyKCk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50SGFuZGxlciAgICAgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZW50aXRpZXMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiB0aGlzLmNhcGFjaXR5IH0sICgpID0+IHsgcmV0dXJuIDA7IH0gKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaW5jcmVhc2VDYXBhY2l0eSgpIHtcbiAgICAgICAgICAgIGxldCBvbGRDYXBhY2l0eSA9IHRoaXMuY2FwYWNpdHk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuY2FwYWNpdHkgKj0gMjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IG9sZENhcGFjaXR5OyBpIDwgdGhpcy5jYXBhY2l0eTsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tpXSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IGNvbXBvbmVudElkIG9mIHRoaXMuY29tcG9uZW50TWFuYWdlci5nZXRDb21wb25lbnRzKCkua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IG9sZENhcGFjaXR5OyBpIDwgdGhpcy5jYXBhY2l0eTsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbY29tcG9uZW50SWRdLnB1c2godGhpcy5jb21wb25lbnRNYW5hZ2VyLm5ld0NvbXBvbmVudChjb21wb25lbnRJZCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbmV3RW50aXR5KGNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29tcG9uZW50cyAhPT0gJ251bWJlcicgfHwgY29tcG9uZW50cyA8PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FwYWNpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBlbnRpdHlJZCA9IDA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAoOyBlbnRpdHlJZCA8IHRoaXMuY2FwYWNpdHk7ICsrZW50aXR5SWQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZW50aXR5SWQgPj0gdGhpcy5jYXBhY2l0eSkge1xuICAgICAgICAgICAgICAgIC8vIHRvZG86IGF1dG8gaW5jcmVhc2UgY2FwYWNpdHk/XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FwYWNpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChlbnRpdHlJZCA+IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IGVudGl0eUlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eUlkXSA9IGNvbXBvbmVudHM7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBlbnRpdHlJZDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZGVsZXRlRW50aXR5KGVudGl0eUlkKSB7XG4gICAgICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eUlkXSA9IDA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChlbnRpdHlJZCA8IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGVudGl0eUlkOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2ldICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IGk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAqZ2V0RW50aXRpZXMoY29tcG9uZW50cyA9IDAsIHR5cGUgPSBTZWxlY3RvclR5cGUuR2V0V2l0aCkge1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBTZWxlY3RvclR5cGUuR2V0V2l0aDoge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRpdHlJZCBpbiB0aGlzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5SWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2VudGl0eUlkXSAhPT0gMCAmJiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gJiBjb21wb25lbnRzKSA9PT0gY29tcG9uZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIE1hdGguZmxvb3IoZW50aXR5SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBTZWxlY3RvclR5cGUuR2V0V2l0aE9ubHk6IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZW50aXR5SWQgaW4gdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0eUlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gIT09IDAgJiYgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gPT09IGNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCBNYXRoLmZsb29yKGVudGl0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgU2VsZWN0b3JUeXBlLkdldFdpdGhvdXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgZW50aXR5SWQgaW4gdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0eUlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gIT09IDAgJiYgKHRoaXMuZW50aXRpZXNbZW50aXR5SWRdICYgY29tcG9uZW50cykgIT09IGNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCBNYXRoLmZsb29yKGVudGl0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgU2VsZWN0b3JUeXBlLkdldDoge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRpdHlJZCBpbiB0aGlzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5SWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIE1hdGguZmxvb3IoZW50aXR5SWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDb21wb25lbnQgTWFuYWdlclxuICAgICAgICBcbiAgICAgICAgcmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgICAgICAgICBsZXQgY29tcG9uZW50SWQgPSB0aGlzLmNvbXBvbmVudE1hbmFnZXIucmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpc1tjb21wb25lbnRJZF0gPSBbXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNhcGFjaXR5OyArK2kpIHtcbiAgICAgICAgICAgICAgICB0aGlzW2NvbXBvbmVudElkXS5wdXNoKHRoaXMuY29tcG9uZW50TWFuYWdlci5uZXdDb21wb25lbnQoY29tcG9uZW50SWQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGluaXRpYWxpemVyO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6IGluaXRpYWxpemVyID0gY29tcG9uZW50OyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOiB7XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxpemVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMoY29tcG9uZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IGNvbXBvbmVudFtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogaW5pdGlhbGl6ZXIgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbXBvbmVudDsgfTsgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS5yZWdpc3RlckluaXRpYWxpemVyKGNvbXBvbmVudElkLCBpbml0aWFsaXplcik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBjb21wb25lbnRJZDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYWRkQ29tcG9uZW50KGVudGl0eUlkLCBjb21wb25lbnRJZCkge1xuICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gfD0gY29tcG9uZW50SWQ7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJlbW92ZUNvbXBvbmVudChlbnRpdHlJZCwgY29tcG9uZW50SWQpIHtcbiAgICAgICAgICAgIHRoaXMuZW50aXRpZXNbZW50aXR5SWRdICY9IH5jb21wb25lbnRJZDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gU3lzdGVtIE1hbmFnZXJcbiAgICAgICAgXG4gICAgICAgIHJlZ2lzdGVyU3lzdGVtKHR5cGUsIHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbSh0eXBlLCBzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZWdpc3RlckxvZ2ljU3lzdGVtKHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbShTeXN0ZW1UeXBlLkxvZ2ljLCBzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZWdpc3RlclJlbmRlclN5c3RlbShzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVnaXN0ZXJTeXN0ZW0oU3lzdGVtVHlwZS5SZW5kZXIsIHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJlbW92ZVN5c3RlbShzeXN0ZW1JZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZW1vdmVTeXN0ZW0oc3lzdGVtSWQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBvbkxvZ2ljKGRlbHRhKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBzeXN0ZW0gb2YgdGhpcy5zeXN0ZW1NYW5hZ2VyLmxvZ2ljU3lzdGVtcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMsIHN5c3RlbS5zZWxlY3RvciksIGRlbHRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgb25SZW5kZXIoZGVsdGEpIHtcbiAgICAgICAgICAgIGZvciAobGV0IHN5c3RlbSBvZiB0aGlzLnN5c3RlbU1hbmFnZXIucmVuZGVyU3lzdGVtcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMsIHN5c3RlbS5zZWxlY3RvciksIGRlbHRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEVudGl0eSBGYWN0b3J5XG4gICAgICAgIFxuICAgICAgICByZWdpc3RlckluaXRpYWxpemVyKGNvbXBvbmVudElkLCBpbml0aWFsaXplcikge1xuICAgICAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LnJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYnVpbGQoKSB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkuYnVpbGQoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHdpdGhDb21wb25lbnQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eUZhY3Rvcnkud2l0aENvbXBvbmVudChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY3JlYXRlQ29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVudGl0eUZhY3RvcnkuY3JlYXRlQ29uZmlndXJhdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjcmVhdGUoY291bnQsIGNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVudGl0eUZhY3RvcnkuY3JlYXRlKHRoaXMsIGNvdW50LCBjb25maWd1cmF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gRXZlbnQgSGFuZGxlclxuICAgICAgICBcbiAgICAgICAgbGlzdGVuKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLmxpc3RlbihldmVudCwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBzdG9wTGlzdGVuKGV2ZW50SWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci5zdG9wTGlzdGVuKGV2ZW50SWQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0cmlnZ2VyKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLnRyaWdnZXIuY2FsbCh0aGlzLCAuLi5hcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0cmlnZ2VyRGVsYXllZCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyRGVsYXllZC5jYWxsKHRoaXMsIC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBFbnRpdHlGYWN0b3J5IHtcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVycyAgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSBuZXcgTWFwKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoY29tcG9uZW50SWQpIHx8IHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplcnMuc2V0KGNvbXBvbmVudElkLCBpbml0aWFsaXplcik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGJ1aWxkKCkge1xuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgd2l0aENvbXBvbmVudChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihjb21wb25lbnRJZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGluaXRpYWxpemVyID0gdGhpcy5pbml0aWFsaXplcnMuZ2V0KGNvbXBvbmVudElkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uLnNldChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY3JlYXRlQ29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNyZWF0ZShlbnRpdHlNYW5hZ2VyLCBjb3VudCA9IDEsIGNvbmZpZ3VyYXRpb24gPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICghKGVudGl0eU1hbmFnZXIgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBjb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbiB8fCB0aGlzLmNvbmZpZ3VyYXRpb247XG5cbiAgICAgICAgICAgIGxldCBjb21wb25lbnRzID0gMDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yIChsZXQgY29tcG9uZW50IG9mIGNvbmZpZ3VyYXRpb24ua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50cyB8PSBjb21wb25lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBlbnRpdGllcyA9IFtdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyArK2kpIHtcbiAgICAgICAgICAgICAgICBsZXQgZW50aXR5SWQgPSBlbnRpdHlNYW5hZ2VyLm5ld0VudGl0eShjb21wb25lbnRzKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoZW50aXR5SWQgPj0gZW50aXR5TWFuYWdlci5jYXBhY2l0eSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgW2NvbXBvbmVudElkLCBpbml0aWFsaXplcl0gb2YgY29uZmlndXJhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGluaXRpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGluaXRpYWxpemVyLmNhbGwoZW50aXR5TWFuYWdlcltjb21wb25lbnRJZF1bZW50aXR5SWRdKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZW50aXR5TWFuYWdlcltjb21wb25lbnRJZF1bZW50aXR5SWRdICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBlbnRpdHlNYW5hZ2VyW2NvbXBvbmVudElkXVtlbnRpdHlJZF0gIT09ICdvYmplY3QnICYmIHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHlNYW5hZ2VyW2NvbXBvbmVudElkXVtlbnRpdHlJZF0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZW50aXRpZXMucHVzaChlbnRpdHlJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBlbnRpdGllcy5sZW5ndGggPT09IDEgPyBlbnRpdGllc1swXSA6IGVudGl0aWVzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgR2FtZSB7XG4gICAgICAgIGNvbnN0cnVjdG9yKHJlbmRlcmVyKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyICAgICAgPSByZW5kZXJlcjtcbiAgICAgICAgICAgIHRoaXMubGV2ZWwgICAgICAgICA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIgPSBuZXcgRW50aXR5TWFuYWdlcigyMDApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBzZXRMZXZlbChsZXZlbCkge1xuICAgICAgICAgICAgdGhpcy5sZXZlbCA9IGxldmVsO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB1cGRhdGUoZGVsdGEpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIudXBkYXRlKGRlbHRhKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZHJhdyhpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5kcmF3KGludGVycG9sYXRpb25QZXJjZW50YWdlLCB0aGlzLmxldmVsLnNjZW5lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIEFwcCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKGdhbWUgPSBuZXcgR2FtZShuZXcgVGhyZWVSZW5kZXJlcigpKSkge1xuICAgICAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgICAgIHRoaXMudGhyZWUgPSB0aHJlZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdXBkYXRlKGRlbHRhKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUudXBkYXRlKGRlbHRhKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZHJhdyhpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSkge1xuICAgICAgICAgICAgdGhpcy5nYW1lLmRyYXcoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBydW4oKSB7XG4gICAgICAgICAgICBsZXQgbGV2ZWxTZXJ2aWNlID0gbmV3IEdHMTAway5MZXZlbFNlcnZpY2UoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGFwcCA9IHRoaXM7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNwYXduKGZ1bmN0aW9uICooKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxldmVsID0geWllbGQgbGV2ZWxTZXJ2aWNlLmxvYWRMZXZlbCgnbGV2ZWxzL2xldmVsLW9uZS5qcycpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCBhbWJpZW50ID0gbmV3IHRocmVlLkFtYmllbnRMaWdodCggMHgxMDEwMzAgKTsgXG4gICAgIFx0XHRcdGxldmVsLnNjZW5lLmFkZChhbWJpZW50KTsgXG5cbiAgICAgXHRcdFx0bGV0IGRpcmVjdGlvbmFsTGlnaHQgPSBuZXcgdGhyZWUuRGlyZWN0aW9uYWxMaWdodCggMHhmZmVlZGQgKTsgXG4gICAgIFx0XHRcdGRpcmVjdGlvbmFsTGlnaHQucG9zaXRpb24uc2V0KCAwLCAwLjUsIDAuNSApOyBcbiAgICAgXHRcdFx0bGV2ZWwuc2NlbmUuYWRkKCBkaXJlY3Rpb25hbExpZ2h0ICk7IFxuXG4gICAgICAgICAgICAgICAgYXBwLmdhbWUuc2V0TGV2ZWwobGV2ZWwpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIE1haW5Mb29wLnNldFVwZGF0ZShkZWx0YSA9PiB7IGFwcC51cGRhdGUoZGVsdGEpOyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldERyYXcoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UgPT4geyBhcHAuZHJhdyhpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSk7IH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuc3RhcnQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0cy5BcHAgPSBBcHA7XG4gICAgZXhwb3J0cy5HYW1lID0gR2FtZTtcbiAgICBleHBvcnRzLkxldmVsU2VydmljZSA9IExldmVsU2VydmljZTtcbiAgICBleHBvcnRzLklSZW5kZXJlciA9IElSZW5kZXJlcjtcbiAgICBleHBvcnRzLkRlYnVnUmVuZGVyZXIgPSBEZWJ1Z1JlbmRlcmVyO1xuICAgIGV4cG9ydHMuVGhyZWVSZW5kZXJlciA9IFRocmVlUmVuZGVyZXI7XG5cbn0pKCh0aGlzLkdHMTAwayA9IHt9KSxNYWluTG9vcCxUSFJFRSxxd2VzdCk7Il19
