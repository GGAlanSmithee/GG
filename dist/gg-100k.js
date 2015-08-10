(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GG100k = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Entities = require('gg-entities');
Entities = 'default' in Entities ? Entities['default'] : Entities;
var MainLoop = require('mainloop.js');
MainLoop = 'default' in MainLoop ? MainLoop['default'] : MainLoop;

var Game = (function () {
    function Game(renderer) {
        _classCallCheck(this, Game);

        this.renderer = renderer;

        this.entityManager = new Entities.EntityManager(200);
    }

    _createClass(Game, [{
        key: 'update',
        value: function update(delta) {
            this.renderer.update(delta);
        }
    }, {
        key: 'draw',
        value: function draw(interpolationPercentage) {
            this.renderer.draw(interpolationPercentage);
        }
    }]);

    return Game;
})();

exports.Game = Game;

var interfaceInstantiationCheck = function interfaceInstantiationCheck(base, self, derrivedClasses) {
    var isDerrived = false;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = derrivedClasses[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var derrivedClass = _step.value;

            if (self instanceof derrivedClass) {
                isDerrived = true;

                break;
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

    if (!isDerrived) {
        var derrivedClassesNames = [];

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = derrivedClasses[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var derrivedClass = _step2.value;

                derrivedClassesNames.push(derrivedClass.name);
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

        derrivedClassesNames = derrivedClassesNames.join(' or ');

        throw TypeError(['Cannot instantiate interface', base.name, 'use', derrivedClassesNames, 'instead'].join(' '));
    }
};

var interfaceImplementationCheck = function interfaceImplementationCheck(base, self) {
    var methodsNotImplemented = [];

    Object.getOwnPropertyNames(base.prototype).forEach(function (method) {
        if (!Object.getPrototypeOf(self).hasOwnProperty(method)) {
            methodsNotImplemented.push(method);
        }
    });

    if (methodsNotImplemented.length > 0) {
        throw new TypeError([self.constructor.name, 'does not implement', base.name, 'methods'].concat(methodsNotImplemented).join(' '));
    }
};

var Interface = function Interface(type, implementingClasses) {
    _classCallCheck(this, Interface);

    interfaceInstantiationCheck(type, this, implementingClasses);
    interfaceImplementationCheck(type, this);
};

var IRenderer = (function (_Interface) {
    _inherits(IRenderer, _Interface);

    function IRenderer() {
        _classCallCheck(this, IRenderer);

        _get(Object.getPrototypeOf(IRenderer.prototype), 'constructor', this).call(this, IRenderer, [DebugRenderer, ThreeRenderer]);
    }

    _createClass(IRenderer, [{
        key: 'update',
        value: function update(delta) {}
    }, {
        key: 'draw',
        value: function draw(interpolationPercentage) {}
    }]);

    return IRenderer;
})(Interface);

exports.IRenderer = IRenderer;

var DebugRenderer = (function (_IRenderer) {
    _inherits(DebugRenderer, _IRenderer);

    function DebugRenderer() {
        _classCallCheck(this, DebugRenderer);

        _get(Object.getPrototypeOf(DebugRenderer.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(DebugRenderer, [{
        key: 'update',
        value: function update(delta) {
            console.log('debug update', delta);
        }
    }, {
        key: 'draw',
        value: function draw(interpolationPercentage) {
            console.log('debug draw', interpolationPercentage);
        }
    }]);

    return DebugRenderer;
})(IRenderer);

exports.DebugRenderer = DebugRenderer;

var ThreeRenderer = (function (_IRenderer2) {
    _inherits(ThreeRenderer, _IRenderer2);

    function ThreeRenderer() {
        _classCallCheck(this, ThreeRenderer);

        _get(Object.getPrototypeOf(ThreeRenderer.prototype), 'constructor', this).call(this);

        if (typeof window === 'undefined') {
            throw Error('ThreeRenderer can only be used in a browser environment.');
        }

        var THREE = window.THREE;

        if (!THREE) {
            throw Error('ThreeRenderer requires three.js, include it first.');
        }

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(geometry, material);
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
        value: function draw(interpolationPercentage) {
            this.renderer.render(this.scene, this.camera);
        }
    }]);

    return ThreeRenderer;
})(IRenderer);

exports.ThreeRenderer = ThreeRenderer;

var App = (function () {
    function App() {
        var game = arguments.length <= 0 || arguments[0] === undefined ? new Game(new ThreeRenderer()) : arguments[0];

        _classCallCheck(this, App);

        this.game = game;
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
            var _this = this;

            MainLoop.setUpdate(function (delta) {
                _this.update(delta);
            }).setDraw(function (interpolationPercentage) {
                _this.draw(interpolationPercentage);
            }).start();
        }
    }]);

    return App;
})();

exports.App = App;

},{"gg-entities":2,"mainloop.js":3}],2:[function(require,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GGEntities = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _slice = Array.prototype.slice;

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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

exports.ComponentManager = ComponentManager;

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

exports.SystemManager = SystemManager;
exports.SystemType = SystemType;

var EventHandler = (function () {
    function EventHandler() {
        _classCallCheck(this, EventHandler);

        this.events = new Map();
    }

    _createClass(EventHandler, [{
        key: 'emptyPromise',
        value: function emptyPromise() {
            return new Promise(function (resolve, reject) {
                resolve();
            });
        }
    }, {
        key: 'promise',
        value: function promise(callback, context, args, timeout) {
            if (timeout) {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve(typeof context === 'object' ? callback.call.apply(callback, [context].concat(_toConsumableArray(args))) : callback.apply.apply(callback, [context].concat(_toConsumableArray(args))));
                    }, timeout);
                });
            }

            return new Promise(function (resolve, reject) {
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

exports.EventHandler = EventHandler;

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

        this.entities = Array.from({ length: this.capacity }, function (v) {
            return v = 0;
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
            return regeneratorRuntime.wrap(function getEntities$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.t0 = type;
                        context$2$0.next = context$2$0.t0 === SelectorType.GetWith ? 3 : context$2$0.t0 === SelectorType.GetWithOnly ? 14 : context$2$0.t0 === SelectorType.GetWithout ? 25 : context$2$0.t0 === SelectorType.Get ? 36 : 46;
                        break;

                    case 3:
                        context$2$0.t1 = regeneratorRuntime.keys(this.entities);

                    case 4:
                        if ((context$2$0.t2 = context$2$0.t1()).done) {
                            context$2$0.next = 13;
                            break;
                        }

                        entityId = context$2$0.t2.value;

                        if (!(entityId > this.currentMaxEntity)) {
                            context$2$0.next = 8;
                            break;
                        }

                        return context$2$0.abrupt('return');

                    case 8:
                        if (!(this.entities[entityId] !== 0 && (this.entities[entityId] & components) === components)) {
                            context$2$0.next = 11;
                            break;
                        }

                        context$2$0.next = 11;
                        return Math.floor(entityId);

                    case 11:
                        context$2$0.next = 4;
                        break;

                    case 13:
                        return context$2$0.abrupt('break', 46);

                    case 14:
                        context$2$0.t3 = regeneratorRuntime.keys(this.entities);

                    case 15:
                        if ((context$2$0.t4 = context$2$0.t3()).done) {
                            context$2$0.next = 24;
                            break;
                        }

                        entityId = context$2$0.t4.value;

                        if (!(entityId > this.currentMaxEntity)) {
                            context$2$0.next = 19;
                            break;
                        }

                        return context$2$0.abrupt('return');

                    case 19:
                        if (!(this.entities[entityId] !== 0 && this.entities[entityId] === components)) {
                            context$2$0.next = 22;
                            break;
                        }

                        context$2$0.next = 22;
                        return Math.floor(entityId);

                    case 22:
                        context$2$0.next = 15;
                        break;

                    case 24:
                        return context$2$0.abrupt('break', 46);

                    case 25:
                        context$2$0.t5 = regeneratorRuntime.keys(this.entities);

                    case 26:
                        if ((context$2$0.t6 = context$2$0.t5()).done) {
                            context$2$0.next = 35;
                            break;
                        }

                        entityId = context$2$0.t6.value;

                        if (!(entityId > this.currentMaxEntity)) {
                            context$2$0.next = 30;
                            break;
                        }

                        return context$2$0.abrupt('return');

                    case 30:
                        if (!(this.entities[entityId] !== 0 && (this.entities[entityId] & components) !== components)) {
                            context$2$0.next = 33;
                            break;
                        }

                        context$2$0.next = 33;
                        return Math.floor(entityId);

                    case 33:
                        context$2$0.next = 26;
                        break;

                    case 35:
                        return context$2$0.abrupt('break', 46);

                    case 36:
                        context$2$0.t7 = regeneratorRuntime.keys(this.entities);

                    case 37:
                        if ((context$2$0.t8 = context$2$0.t7()).done) {
                            context$2$0.next = 45;
                            break;
                        }

                        entityId = context$2$0.t8.value;

                        if (!(entityId > this.currentMaxEntity)) {
                            context$2$0.next = 41;
                            break;
                        }

                        return context$2$0.abrupt('return');

                    case 41:
                        context$2$0.next = 43;
                        return Math.floor(entityId);

                    case 43:
                        context$2$0.next = 37;
                        break;

                    case 45:
                        return context$2$0.abrupt('break', 46);

                    case 46:
                    case 'end':
                        return context$2$0.stop();
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

exports.EntityManager = EntityManager;
exports.SelectorType = SelectorType;

},{}]},{},[1])(1)
});


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(require,module,exports){
/**
 * mainloop.js 1.0.0-20150117
 *
 * @author Isaac Sukin (http://www.isaacsukin.com/)
 * @license MIT
 */

!function(a){function b(a){if(e+j>a)return u=n(b),void 0;for(d+=a-e,e=a,q(a,d),a>g+1e3&&(f=.25*h+.75*f,g=a,h=0),h++,i=0;d>=c;)if(r(c),d-=c,++i>=240){m=!0;break}s(d/c),t(f,m),m=!1,u=n(b)}var c=1e3/60,d=0,e=0,f=60,g=0,h=0,i=0,j=0,k=!1,l=!1,m=!1,n=a.requestAnimationFrame||function(){var a=Date.now(),b,d;return function(e){return b=Date.now(),d=Math.max(0,c-(b-a)),a=b+d,setTimeout(function(){e(b+d)},d)}}(),o=a.cancelAnimationFrame||clearTimeout,p=function(){},q=p,r=p,s=p,t=p,u;a.MainLoop={getSimulationTimestep:function(){return c},setSimulationTimestep:function(a){return c=a,this},getFPS:function(){return f},getMaxAllowedFPS:function(){return 1e3/j},setMaxAllowedFPS:function(a){return"undefined"==typeof a&&(a=1/0),0===a?this.stop():j=1e3/a,this},resetFrameDelta:function(){var a=d;return d=0,a},setBegin:function(a){return q=a||q,this},setUpdate:function(a){return r=a||r,this},setDraw:function(a){return s=a||s,this},setEnd:function(a){return t=a||t,this},start:function(){return l||(l=!0,n(function(a){s(1),k=!0,e=a,g=a,h=0,u=n(b)})),this},stop:function(){return k=!1,l=!1,o(u),this},isRunning:function(){return k}},"function"==typeof define&&define.amd?define(a.MainLoop):"object"==typeof exports&&(module.exports=a.MainLoop)}(this);

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL2Rpc3QvYnVuZGxlLmpzIiwibm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL2Rpc3Qvbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL2Rpc3Qvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9ob21lL3VidW50dS93b3Jrc3BhY2UvYnVpbGQvZ2ctZW50aXRpZXMuanMiLCJub2RlX21vZHVsZXMvbWFpbmxvb3AuanMvYnVpbGQvbWFpbmxvb3AubWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOzs7Ozs7Ozs7O0FBRWIsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3RDLFFBQVEsR0FBSSxTQUFTLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxRQUFRLEFBQUMsQ0FBQztBQUNwRSxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDdEMsUUFBUSxHQUFJLFNBQVMsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFFBQVEsQUFBQyxDQUFDOztJQUU5RCxJQUFJO0FBQ0ssYUFEVCxJQUFJLENBQ00sUUFBUSxFQUFFOzhCQURwQixJQUFJOztBQUVGLFlBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDOztBQUV6QixZQUFJLENBQUMsYUFBYSxHQUFHLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN4RDs7aUJBTEMsSUFBSTs7ZUFPQSxnQkFBQyxLQUFLLEVBQUU7QUFDVixnQkFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0I7Oztl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QyxXQUFXOzRCQUFFLFdBQVc7O0FBQzlCLDRCQUFJLE9BQU8sV0FBVyxLQUFLLFVBQVUsRUFBRTtBQUNuQyxxQ0FBUzt5QkFDWjs7QUFFRCw0QkFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7QUFFcEUsNEJBQUksT0FBTyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssVUFBVSxJQUFJLE9BQU8sYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLFFBQVEsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO0FBQ2hKLHlDQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDO3lCQUNqRDtxQkFDSjs7Ozs7Ozs7Ozs7Ozs7OztBQUVELHdCQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzNCOztBQUVELG1CQUFPLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUM7U0FDekQ7OztXQTVFQyxhQUFhOzs7QUErRW5CLE9BQU8sQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0FBQ3RDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDOzs7Ozs7Ozs7QUN2aEJwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRW50aXRpZXMgPSByZXF1aXJlKCdnZy1lbnRpdGllcycpO1xuRW50aXRpZXMgPSAoJ2RlZmF1bHQnIGluIEVudGl0aWVzID8gRW50aXRpZXNbJ2RlZmF1bHQnXSA6IEVudGl0aWVzKTtcbnZhciBNYWluTG9vcCA9IHJlcXVpcmUoJ21haW5sb29wLmpzJyk7XG5NYWluTG9vcCA9ICgnZGVmYXVsdCcgaW4gTWFpbkxvb3AgPyBNYWluTG9vcFsnZGVmYXVsdCddIDogTWFpbkxvb3ApO1xuXG5jbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcihyZW5kZXJlcikge1xuICAgICAgICB0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXI7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIgPSBuZXcgRW50aXRpZXMuRW50aXR5TWFuYWdlcigyMDApO1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGUoZGVsdGEpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci51cGRhdGUoZGVsdGEpO1xuICAgIH1cbiAgICBcbiAgICBkcmF3KGludGVycG9sYXRpb25QZXJjZW50YWdlKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuZHJhdyhpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSk7XG4gICAgfVxufVxuXG5leHBvcnRzLkdhbWUgPSBHYW1lO1xuXG52YXIgaW50ZXJmYWNlSW5zdGFudGlhdGlvbkNoZWNrID0gZnVuY3Rpb24oYmFzZSwgc2VsZiwgZGVycml2ZWRDbGFzc2VzKSB7XG4gICAgbGV0IGlzRGVycml2ZWQgPSBmYWxzZTtcbiAgICBcbiAgICBmb3IgKGxldCBkZXJyaXZlZENsYXNzIG9mIGRlcnJpdmVkQ2xhc3Nlcykge1xuICAgICAgICBpZiAoc2VsZiBpbnN0YW5jZW9mIGRlcnJpdmVkQ2xhc3MpIHtcbiAgICAgICAgICAgIGlzRGVycml2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBpZiAoIWlzRGVycml2ZWQpIHtcbiAgICAgICAgbGV0IGRlcnJpdmVkQ2xhc3Nlc05hbWVzID0gW107XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBkZXJyaXZlZENsYXNzIG9mIGRlcnJpdmVkQ2xhc3Nlcykge1xuICAgICAgICAgICAgZGVycml2ZWRDbGFzc2VzTmFtZXMucHVzaChkZXJyaXZlZENsYXNzLm5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBkZXJyaXZlZENsYXNzZXNOYW1lcyA9IGRlcnJpdmVkQ2xhc3Nlc05hbWVzLmpvaW4oJyBvciAnKTtcbiAgICAgICAgXG4gICAgICAgIHRocm93IFR5cGVFcnJvcihbJ0Nhbm5vdCBpbnN0YW50aWF0ZSBpbnRlcmZhY2UnLCBiYXNlLm5hbWUsICd1c2UnLCBkZXJyaXZlZENsYXNzZXNOYW1lcywgJ2luc3RlYWQnXS5qb2luKCcgJykpO1xuICAgIH1cbn1cblxudmFyIGludGVyZmFjZUltcGxlbWVudGF0aW9uQ2hlY2sgPSBmdW5jdGlvbihiYXNlLCBzZWxmKSB7XG4gICAgbGV0IG1ldGhvZHNOb3RJbXBsZW1lbnRlZCA9IFtdO1xuXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYmFzZS5wcm90b3R5cGUpLmZvckVhY2gobWV0aG9kID0+IHtcbiAgICAgICAgaWYgKCFPYmplY3QuZ2V0UHJvdG90eXBlT2Yoc2VsZikuaGFzT3duUHJvcGVydHkobWV0aG9kKSkge1xuICAgICAgICAgICAgbWV0aG9kc05vdEltcGxlbWVudGVkLnB1c2gobWV0aG9kKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIGlmIChtZXRob2RzTm90SW1wbGVtZW50ZWQubGVuZ3RoID4gMCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFtzZWxmLmNvbnN0cnVjdG9yLm5hbWUsICdkb2VzIG5vdCBpbXBsZW1lbnQnLCBiYXNlLm5hbWUsICdtZXRob2RzJywgLi4ubWV0aG9kc05vdEltcGxlbWVudGVkXS5qb2luKCcgJykpO1xuICAgIH1cbn1cblxuY2xhc3MgSW50ZXJmYWNlIHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlLCBpbXBsZW1lbnRpbmdDbGFzc2VzKSB7XG4gICAgICAgIGludGVyZmFjZUluc3RhbnRpYXRpb25DaGVjayh0eXBlLCB0aGlzLCBpbXBsZW1lbnRpbmdDbGFzc2VzKTtcbiAgICAgICAgaW50ZXJmYWNlSW1wbGVtZW50YXRpb25DaGVjayh0eXBlLCB0aGlzKTtcbiAgICB9XG59XG5cbmNsYXNzIElSZW5kZXJlciBleHRlbmRzIEludGVyZmFjZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKElSZW5kZXJlciwgW0RlYnVnUmVuZGVyZXIsIFRocmVlUmVuZGVyZXJdKTtcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlKGRlbHRhKSB7XG4gICAgfVxuICAgIFxuICAgIGRyYXcoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UpIHtcbiAgICB9XG59XG5cbmV4cG9ydHMuSVJlbmRlcmVyID0gSVJlbmRlcmVyO1xuXG5jbGFzcyBEZWJ1Z1JlbmRlcmVyIGV4dGVuZHMgSVJlbmRlcmVyIHtcbiAgICB1cGRhdGUoZGVsdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2RlYnVnIHVwZGF0ZScsIGRlbHRhKTtcbiAgICB9XG4gICAgXG4gICAgZHJhdyhpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnZGVidWcgZHJhdycsIGludGVycG9sYXRpb25QZXJjZW50YWdlKTtcbiAgICB9XG59XG5cbmV4cG9ydHMuRGVidWdSZW5kZXJlciA9IERlYnVnUmVuZGVyZXI7XG5cbmNsYXNzIFRocmVlUmVuZGVyZXIgZXh0ZW5kcyBJUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1RocmVlUmVuZGVyZXIgY2FuIG9ubHkgYmUgdXNlZCBpbiBhIGJyb3dzZXIgZW52aXJvbm1lbnQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciBUSFJFRSA9IHdpbmRvdy5USFJFRTtcbiAgICAgICAgXG4gICAgICAgIGlmICghVEhSRUUpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdUaHJlZVJlbmRlcmVyIHJlcXVpcmVzIHRocmVlLmpzLCBpbmNsdWRlIGl0IGZpcnN0LicpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNjZW5lICA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICAgICAgICB0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg3NSwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDAuMSwgMTAwMCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudCk7XG4gICAgICAgIFxuICAgICAgICB2YXIgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoIDEsIDEsIDEgKTtcbiAgICAgICAgdmFyIG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKCB7IGNvbG9yOiAweDAwZmYwMCB9ICk7XG4gICAgICAgIHRoaXMuY3ViZSA9IG5ldyBUSFJFRS5NZXNoKCBnZW9tZXRyeSwgbWF0ZXJpYWwgKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5jdWJlKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnogPSA1O1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGUoZGVsdGEpIHtcbiAgICAgICAgdGhpcy5jdWJlLnJvdGF0aW9uLnggKz0gMC4xO1xuICAgICAgICB0aGlzLmN1YmUucm90YXRpb24ueSArPSAwLjE7XG4gICAgfVxuICAgIFxuICAgIGRyYXcoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpO1xuICAgIH1cbn1cblxuZXhwb3J0cy5UaHJlZVJlbmRlcmVyID0gVGhyZWVSZW5kZXJlcjtcblxuY2xhc3MgQXBwIHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lID0gbmV3IEdhbWUobmV3IFRocmVlUmVuZGVyZXIoKSkpIHtcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlKGRlbHRhKSB7XG4gICAgICAgIHRoaXMuZ2FtZS51cGRhdGUoZGVsdGEpO1xuICAgIH1cbiAgICBcbiAgICBkcmF3KGludGVycG9sYXRpb25QZXJjZW50YWdlKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5kcmF3KGludGVycG9sYXRpb25QZXJjZW50YWdlKTtcbiAgICB9XG4gICAgXG4gICAgcnVuKCkge1xuICAgICAgICBNYWluTG9vcC5zZXRVcGRhdGUoZGVsdGEgPT4geyB0aGlzLnVwZGF0ZShkZWx0YSk7IH0pXG4gICAgICAgICAgICAgICAgLnNldERyYXcoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UgPT4geyB0aGlzLmRyYXcoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UpOyB9KVxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xuICAgIH1cbn1cblxuZXhwb3J0cy5BcHAgPSBBcHA7IiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIENvbXBvbmVudE1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIFxuICAgIG5ld0NvbXBvbmVudChjb21wb25lbnRJZCkge1xuICAgICAgICBsZXQgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRzLmdldChjb21wb25lbnRJZCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoY29tcG9uZW50ID09PSBudWxsIHx8IGNvbXBvbmVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgY29tcG9uZW50KSB7XG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6IHJldHVybiBuZXcgY29tcG9uZW50KCk7XG4gICAgICAgICAgICBjYXNlICdvYmplY3QnICA6IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKChjb21wb25lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJldCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoY29tcG9uZW50KS5mb3JFYWNoKGtleSA9PiByZXRba2V5XSA9IGNvbXBvbmVudFtrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgICAgICAgfSkoY29tcG9uZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgICAgIGlmIChjb21wb25lbnQgPT09IG51bGwgfHwgY29tcG9uZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignY29tcG9uZW50IGNhbm5vdCBiZSBudWxsLicpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgbWF4ID0gTWF0aC5tYXgoLi4udGhpcy5jb21wb25lbnRzLmtleXMoKSk7XG4gICAgICAgIFxuICAgICAgICBsZXQgaWQgPSBtYXggPT09IHVuZGVmaW5lZCB8fCBtYXggPT09IG51bGwgfHwgbWF4ID09PSAtSW5maW5pdHkgPyAxIDogbWF4ID09PSAwID8gMSA6IG1heCAqIDI7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnRzLnNldChpZCwgY29tcG9uZW50KTtcblxuICAgICAgICByZXR1cm4gaWQ7XG4gICAgfVxuICAgIFxuICAgIGdldENvbXBvbmVudHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBvbmVudHM7XG4gICAgfVxufVxuXG5leHBvcnRzLkNvbXBvbmVudE1hbmFnZXIgPSBDb21wb25lbnRNYW5hZ2VyO1xuXG5jb25zdCBTeXN0ZW1UeXBlID0ge1xuICAgIExvZ2ljICAgOiAwLFxuICAgIFJlbmRlciAgOiAxXG59O1xuXG5jbGFzcyBTeXN0ZW1NYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5sb2dpY1N5c3RlbXMgID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLnJlbmRlclN5c3RlbXMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyU3lzdGVtKHR5cGUsIHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgIFx0aWYgKHR5cGUgIT09IFN5c3RlbVR5cGUuTG9naWMgJiYgdHlwZSAhPT0gU3lzdGVtVHlwZS5SZW5kZXIpIHtcbiAgICBcdCAgICB0aHJvdyBUeXBlRXJyb3IoJ3R5cGUgbXVzdCBiZSBhIHZhbGlkIFN5c3RlbVR5cGUuJyk7XG4gICAgXHR9XG4gICAgXHRcbiAgICBcdGlmIChzZWxlY3RvciAhPT0gU2VsZWN0b3JUeXBlLkdldCAmJiBzZWxlY3RvciAhPT0gU2VsZWN0b3JUeXBlLkdldFdpdGggJiZcbiAgICBcdCAgICBzZWxlY3RvciAhPT0gU2VsZWN0b3JUeXBlLkdldFdpdGhPbmx5ICYmIHNlbGVjdG9yICE9PSBTZWxlY3RvclR5cGUuR2V0V2l0aG91dCkge1xuICAgIFx0ICAgIHRocm93IFR5cGVFcnJvcignc2VsZWN0b3IgbXVzdCBiZSBhIHZhbGlkIFNlbGVjdG9yVHlwZS4nKTtcbiAgICBcdH1cbiAgICBcdFxuICAgIFx0aWYgKHR5cGVvZiBjb21wb25lbnRzICE9PSAnbnVtYmVyJykgIHtcbiAgICBcdFx0dGhyb3cgVHlwZUVycm9yKCdjb21wb25lbnRzIG11c3QgYmUgYSBudW1iZXIuJyk7XG4gICAgXHR9XG4gICAgXHRcbiAgICBcdGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICBcdFx0dGhyb3cgVHlwZUVycm9yKCdjYWxsYmFjayBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgXHR9XG4gICAgXHRcbiAgICBcdGxldCBzeXN0ZW0gPSB7XG4gICAgXHRcdHNlbGVjdG9yLFxuICAgIFx0XHRjb21wb25lbnRzLFxuICAgIFx0XHRjYWxsYmFja1xuICAgIFx0fTtcbiAgICBcbiAgICAgICAgbGV0IHN5c3RlbUlkID0gTWF0aC5tYXgoMCwgLi4udGhpcy5sb2dpY1N5c3RlbXMua2V5cygpLCAuLi50aGlzLnJlbmRlclN5c3RlbXMua2V5cygpKSArIDE7XG4gICAgXHRcbiAgICBcdHN3aXRjaCAodHlwZSkge1xuICAgIFx0ICAgIGNhc2UgU3lzdGVtVHlwZS5Mb2dpYyAgOiB0aGlzLmxvZ2ljU3lzdGVtcy5zZXQoc3lzdGVtSWQsIHN5c3RlbSk7ICBicmVhaztcbiAgICBcdCAgICBjYXNlIFN5c3RlbVR5cGUuUmVuZGVyIDogdGhpcy5yZW5kZXJTeXN0ZW1zLnNldChzeXN0ZW1JZCwgc3lzdGVtKTsgYnJlYWs7XG4gICAgXHR9XG5cbiAgICBcdHJldHVybiBzeXN0ZW1JZDtcbiAgICB9XG4gICAgXG4gICAgcmVtb3ZlU3lzdGVtKHN5c3RlbUlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ2ljU3lzdGVtcy5kZWxldGUoc3lzdGVtSWQpIHx8IHRoaXMucmVuZGVyU3lzdGVtcy5kZWxldGUoc3lzdGVtSWQpO1xuICAgIH1cbn1cblxuZXhwb3J0cy5TeXN0ZW1NYW5hZ2VyID0gU3lzdGVtTWFuYWdlcjtcbmV4cG9ydHMuU3lzdGVtVHlwZSA9IFN5c3RlbVR5cGU7XG5cbmNsYXNzIEV2ZW50SGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBcbiAgICBlbXB0eVByb21pc2UoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHByb21pc2UoY2FsbGJhY2ssIGNvbnRleHQsIGFyZ3MsIHRpbWVvdXQpIHtcbiAgICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHlwZW9mIGNvbnRleHQgPT09ICAnb2JqZWN0JyA/IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgLi4uYXJncykgOiBjYWxsYmFjay5hcHBseShjb250ZXh0LCAuLi5hcmdzKSk7XG4gICAgICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgcmVzb2x2ZSh0eXBlb2YgY29udGV4dCA9PT0gJ29iamVjdCcgPyBjYWxsYmFjay5jYWxsKGNvbnRleHQsIC4uLmFyZ3MpIDogY2FsbGJhY2suYXBwbHkoY29udGV4dCwgLi4uYXJncykpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgbGlzdGVuKGV2ZW50LCBjYWxsYmFjaykge1xuICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKCF0aGlzLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5zZXQoZXZlbnQsIG5ldyBNYXAoKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBldmVudElkID0gLTE7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50SWQgPSBNYXRoLm1heChldmVudElkLCAuLi5ldmVudC5rZXlzKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICsrZXZlbnRJZDtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZXZlbnRzLmdldChldmVudCkuc2V0KGV2ZW50SWQsIGNhbGxiYWNrKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBldmVudElkO1xuICAgIH1cbiAgICBcbiAgICBzdG9wTGlzdGVuKGV2ZW50SWQpIHtcbiAgICAgICAgZm9yIChsZXQgZXZlbnRzIG9mIHRoaXMuZXZlbnRzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpZCBvZiBldmVudHMua2V5cygpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlkID09PSBldmVudElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldmVudHMuZGVsZXRlKGV2ZW50SWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlcigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlciA/IHRoaXMuZXZlbnRIYW5kbGVyIDogdGhpcztcbiAgICAgICAgXG4gICAgICAgIGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpO1xuICAgICAgICBcbiAgICAgICAgbGV0IFsgZXZlbnQgXSA9IGFyZ3Muc3BsaWNlKDAsIDEpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBldmVudCAhPT0gJ3N0cmluZycgfHwgIXNlbGYuZXZlbnRzLmhhcyhldmVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmVtcHR5UHJvbWlzZSgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGNhbGxiYWNrIG9mIHNlbGYuZXZlbnRzLmdldChldmVudCkudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2goc2VsZi5wcm9taXNlKGNhbGxiYWNrLCB0aGlzLCBhcmdzLCAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXJEZWxheWVkKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXMgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyID8gdGhpcy5ldmVudEhhbmRsZXIgOiB0aGlzO1xuICAgICAgICBcbiAgICAgICAgbGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG4gICAgICAgIFxuICAgICAgICBsZXQgWyBldmVudCwgdGltZW91dCBdID0gYXJncy5zcGxpY2UoMCwgMik7XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCAhTnVtYmVyLmlzSW50ZWdlcih0aW1lb3V0KSB8fCAhc2VsZi5ldmVudHMuaGFzKGV2ZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuZW1wdHlQcm9taXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY2FsbGJhY2sgb2Ygc2VsZi5ldmVudHMuZ2V0KGV2ZW50KS52YWx1ZXMoKSkge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChzZWxmLnByb21pc2UoY2FsbGJhY2ssIHRoaXMsIGFyZ3MsIHRpbWVvdXQpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9XG59XG5cbmV4cG9ydHMuRXZlbnRIYW5kbGVyID0gRXZlbnRIYW5kbGVyO1xuXG5jb25zdCBTZWxlY3RvclR5cGUgPSB7XG4gICAgR2V0ICAgICAgICAgOiAwLFxuICAgIEdldFdpdGggICAgIDogMSxcbiAgICBHZXRXaXRoT25seSA6IDIsXG4gICAgR2V0V2l0aG91dCAgOiAzXG59O1xuXG5jbGFzcyBFbnRpdHlNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcihjYXBhY2l0eSA9IDEwMDApIHtcbiAgICAgICAgdGhpcy5jYXBhY2l0eSAgICAgICAgID0gY2FwYWNpdHk7XG4gICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IC0xO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5ICAgID0gbmV3IEVudGl0eUZhY3RvcnkoKTtcbiAgICAgICAgdGhpcy5zeXN0ZW1NYW5hZ2VyICAgID0gbmV3IFN5c3RlbU1hbmFnZXIoKTtcbiAgICAgICAgdGhpcy5jb21wb25lbnRNYW5hZ2VyID0gbmV3IENvbXBvbmVudE1hbmFnZXIoKTtcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXIgICAgID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdGllcyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IHRoaXMuY2FwYWNpdHkgfSwgdiA9PiB2ID0gMCk7XG4gICAgfVxuICAgIFxuICAgIGluY3JlYXNlQ2FwYWNpdHkoKSB7XG4gICAgICAgIGxldCBvbGRDYXBhY2l0eSA9IHRoaXMuY2FwYWNpdHk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNhcGFjaXR5ICo9IDI7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gb2xkQ2FwYWNpdHk7IGkgPCB0aGlzLmNhcGFjaXR5OyArK2kpIHtcbiAgICAgICAgICAgIHRoaXMuZW50aXRpZXNbaV0gPSAwO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBjb21wb25lbnRJZCBvZiB0aGlzLmNvbXBvbmVudE1hbmFnZXIuZ2V0Q29tcG9uZW50cygpLmtleXMoKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IG9sZENhcGFjaXR5OyBpIDwgdGhpcy5jYXBhY2l0eTsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGhpc1tjb21wb25lbnRJZF0ucHVzaCh0aGlzLmNvbXBvbmVudE1hbmFnZXIubmV3Q29tcG9uZW50KGNvbXBvbmVudElkKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbmV3RW50aXR5KGNvbXBvbmVudHMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnRzICE9PSAnbnVtYmVyJyB8fCBjb21wb25lbnRzIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhcGFjaXR5O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgZW50aXR5SWQgPSAwO1xuICAgICAgICBcbiAgICAgICAgZm9yICg7IGVudGl0eUlkIDwgdGhpcy5jYXBhY2l0eTsgKytlbnRpdHlJZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbZW50aXR5SWRdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChlbnRpdHlJZCA+PSB0aGlzLmNhcGFjaXR5KSB7XG4gICAgICAgICAgICAvLyB0b2RvOiBhdXRvIGluY3JlYXNlIGNhcGFjaXR5P1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FwYWNpdHk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChlbnRpdHlJZCA+IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TWF4RW50aXR5ID0gZW50aXR5SWQ7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXRpZXNbZW50aXR5SWRdID0gY29tcG9uZW50cztcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBlbnRpdHlJZDtcbiAgICB9XG4gICAgXG4gICAgZGVsZXRlRW50aXR5KGVudGl0eUlkKSB7XG4gICAgICAgIHRoaXMuZW50aXRpZXNbZW50aXR5SWRdID0gMDtcbiAgICAgICAgXG4gICAgICAgIGlmIChlbnRpdHlJZCA8IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gZW50aXR5SWQ7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tpXSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1heEVudGl0eSA9IGk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgICpnZXRFbnRpdGllcyhjb21wb25lbnRzID0gMCwgdHlwZSA9IFNlbGVjdG9yVHlwZS5HZXRXaXRoKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBTZWxlY3RvclR5cGUuR2V0V2l0aDoge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGVudGl0eUlkIGluIHRoaXMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0eUlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2VudGl0eUlkXSAhPT0gMCAmJiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gJiBjb21wb25lbnRzKSA9PT0gY29tcG9uZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgeWllbGQgTWF0aC5mbG9vcihlbnRpdHlJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFNlbGVjdG9yVHlwZS5HZXRXaXRoT25seToge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGVudGl0eUlkIGluIHRoaXMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0eUlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2VudGl0eUlkXSAhPT0gMCAmJiB0aGlzLmVudGl0aWVzW2VudGl0eUlkXSA9PT0gY29tcG9uZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgeWllbGQgTWF0aC5mbG9vcihlbnRpdHlJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFNlbGVjdG9yVHlwZS5HZXRXaXRob3V0OiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW50aXR5SWQgaW4gdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5SWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbZW50aXR5SWRdICE9PSAwICYmICh0aGlzLmVudGl0aWVzW2VudGl0eUlkXSAmIGNvbXBvbmVudHMpICE9PSBjb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCBNYXRoLmZsb29yKGVudGl0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgU2VsZWN0b3JUeXBlLkdldDoge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGVudGl0eUlkIGluIHRoaXMuZW50aXRpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0eUlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIE1hdGguZmxvb3IoZW50aXR5SWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIENvbXBvbmVudCBNYW5hZ2VyXG4gICAgXG4gICAgcmVnaXN0ZXJDb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgICAgIGxldCBjb21wb25lbnRJZCA9IHRoaXMuY29tcG9uZW50TWFuYWdlci5yZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpO1xuICAgICAgICBcbiAgICAgICAgdGhpc1tjb21wb25lbnRJZF0gPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jYXBhY2l0eTsgKytpKSB7XG4gICAgICAgICAgICB0aGlzW2NvbXBvbmVudElkXS5wdXNoKHRoaXMuY29tcG9uZW50TWFuYWdlci5uZXdDb21wb25lbnQoY29tcG9uZW50SWQpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGluaXRpYWxpemVyO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZW9mIGNvbXBvbmVudCkge1xuICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOiBpbml0aWFsaXplciA9IGNvbXBvbmVudDsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdvYmplY3QnOiB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbGl6ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKGNvbXBvbmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IGNvbXBvbmVudFtrZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDogaW5pdGlhbGl6ZXIgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbXBvbmVudDsgfTsgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS5yZWdpc3RlckluaXRpYWxpemVyKGNvbXBvbmVudElkLCBpbml0aWFsaXplcik7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gY29tcG9uZW50SWQ7XG4gICAgfVxuICAgIFxuICAgIGFkZENvbXBvbmVudChlbnRpdHlJZCwgY29tcG9uZW50SWQpIHtcbiAgICAgICAgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gfD0gY29tcG9uZW50SWQ7XG4gICAgfVxuICAgIFxuICAgIHJlbW92ZUNvbXBvbmVudChlbnRpdHlJZCwgY29tcG9uZW50SWQpIHtcbiAgICAgICAgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gJj0gfmNvbXBvbmVudElkO1xuICAgIH1cbiAgICBcbiAgICAvLyBTeXN0ZW0gTWFuYWdlclxuICAgIFxuICAgIHJlZ2lzdGVyU3lzdGVtKHR5cGUsIHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlZ2lzdGVyU3lzdGVtKHR5cGUsIHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyTG9naWNTeXN0ZW0oc2VsZWN0b3IsIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVnaXN0ZXJTeXN0ZW0oU3lzdGVtVHlwZS5Mb2dpYywgc2VsZWN0b3IsIGNvbXBvbmVudHMsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJSZW5kZXJTeXN0ZW0oc2VsZWN0b3IsIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVnaXN0ZXJTeXN0ZW0oU3lzdGVtVHlwZS5SZW5kZXIsIHNlbGVjdG9yLCBjb21wb25lbnRzLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIFxuICAgIHJlbW92ZVN5c3RlbShzeXN0ZW1JZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlbW92ZVN5c3RlbShzeXN0ZW1JZCk7XG4gICAgfVxuICAgIFxuICAgIG9uTG9naWMoZGVsdGEpIHtcbiAgICAgICAgZm9yIChsZXQgc3lzdGVtIG9mIHRoaXMuc3lzdGVtTWFuYWdlci5sb2dpY1N5c3RlbXMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMsIHN5c3RlbS5zZWxlY3RvciksIGRlbHRhKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvblJlbmRlcihkZWx0YSkge1xuICAgICAgICBmb3IgKGxldCBzeXN0ZW0gb2YgdGhpcy5zeXN0ZW1NYW5hZ2VyLnJlbmRlclN5c3RlbXMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHN5c3RlbS5jYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuZ2V0RW50aXRpZXMoc3lzdGVtLmNvbXBvbmVudHMsIHN5c3RlbS5zZWxlY3RvciksIGRlbHRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEVudGl0eSBGYWN0b3J5XG4gICAgXG4gICAgcmVnaXN0ZXJJbml0aWFsaXplcihjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LnJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKTtcbiAgICB9XG4gICAgXG4gICAgYnVpbGQoKSB7XG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS5idWlsZCgpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIHdpdGhDb21wb25lbnQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgIHRoaXMuZW50aXR5RmFjdG9yeS53aXRoQ29tcG9uZW50KGNvbXBvbmVudElkLCBpbml0aWFsaXplcik7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlQ29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW50aXR5RmFjdG9yeS5jcmVhdGVDb25maWd1cmF0aW9uKCk7XG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZShjb3VudCwgY29uZmlndXJhdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnRpdHlGYWN0b3J5LmNyZWF0ZSh0aGlzLCBjb3VudCwgY29uZmlndXJhdGlvbik7XG4gICAgfVxuICAgIFxuICAgIC8vIEV2ZW50IEhhbmRsZXJcbiAgICBcbiAgICBsaXN0ZW4oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci5saXN0ZW4oZXZlbnQsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgXG4gICAgc3RvcExpc3RlbihldmVudElkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci5zdG9wTGlzdGVuKGV2ZW50SWQpO1xuICAgIH1cbiAgICBcbiAgICB0cmlnZ2VyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlci5jYWxsKHRoaXMsIC4uLmFyZ3VtZW50cyk7XG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXJEZWxheWVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlckRlbGF5ZWQuY2FsbCh0aGlzLCAuLi5hcmd1bWVudHMpO1xuICAgIH1cbn1cblxuY2xhc3MgRW50aXR5RmFjdG9yeSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXJzICA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckluaXRpYWxpemVyKGNvbXBvbmVudElkLCBpbml0aWFsaXplcikge1xuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoY29tcG9uZW50SWQpIHx8IHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmluaXRpYWxpemVycy5zZXQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKTtcbiAgICB9XG4gICAgXG4gICAgYnVpbGQoKSB7XG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IG5ldyBNYXAoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICB3aXRoQ29tcG9uZW50KGNvbXBvbmVudElkLCBpbml0aWFsaXplcikge1xuICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIoY29tcG9uZW50SWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgaW5pdGlhbGl6ZXIgPSB0aGlzLmluaXRpYWxpemVycy5nZXQoY29tcG9uZW50SWQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uc2V0KGNvbXBvbmVudElkLCBpbml0aWFsaXplcik7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlQ29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlndXJhdGlvbjtcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlKGVudGl0eU1hbmFnZXIsIGNvdW50ID0gMSwgY29uZmlndXJhdGlvbiA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoIShlbnRpdHlNYW5hZ2VyIGluc3RhbmNlb2YgRW50aXR5TWFuYWdlcikpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbiB8fCB0aGlzLmNvbmZpZ3VyYXRpb247XG5cbiAgICAgICAgbGV0IGNvbXBvbmVudHMgPSAwO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY29tcG9uZW50IG9mIGNvbmZpZ3VyYXRpb24ua2V5cygpKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzIHw9IGNvbXBvbmVudDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGVudGl0aWVzID0gW107XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyArK2kpIHtcbiAgICAgICAgICAgIGxldCBlbnRpdHlJZCA9IGVudGl0eU1hbmFnZXIubmV3RW50aXR5KGNvbXBvbmVudHMpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZW50aXR5SWQgPj0gZW50aXR5TWFuYWdlci5jYXBhY2l0eSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBbY29tcG9uZW50SWQsIGluaXRpYWxpemVyXSBvZiBjb25maWd1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsaXplciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGluaXRpYWxpemVyLmNhbGwoZW50aXR5TWFuYWdlcltjb21wb25lbnRJZF1bZW50aXR5SWRdKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVudGl0eU1hbmFnZXJbY29tcG9uZW50SWRdW2VudGl0eUlkXSAhPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZW50aXR5TWFuYWdlcltjb21wb25lbnRJZF1bZW50aXR5SWRdICE9PSAnb2JqZWN0JyAmJiByZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHlNYW5hZ2VyW2NvbXBvbmVudElkXVtlbnRpdHlJZF0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBlbnRpdGllcy5wdXNoKGVudGl0eUlkKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGVudGl0aWVzLmxlbmd0aCA9PT0gMSA/IGVudGl0aWVzWzBdIDogZW50aXRpZXM7XG4gICAgfVxufVxuXG5leHBvcnRzLkVudGl0eU1hbmFnZXIgPSBFbnRpdHlNYW5hZ2VyO1xuZXhwb3J0cy5TZWxlY3RvclR5cGUgPSBTZWxlY3RvclR5cGU7XG5cbiIsIi8qKlxuICogbWFpbmxvb3AuanMgMS4wLjAtMjAxNTAxMTdcbiAqXG4gKiBAYXV0aG9yIElzYWFjIFN1a2luIChodHRwOi8vd3d3LmlzYWFjc3VraW4uY29tLylcbiAqIEBsaWNlbnNlIE1JVFxuICovXG5cbiFmdW5jdGlvbihhKXtmdW5jdGlvbiBiKGEpe2lmKGUraj5hKXJldHVybiB1PW4oYiksdm9pZCAwO2ZvcihkKz1hLWUsZT1hLHEoYSxkKSxhPmcrMWUzJiYoZj0uMjUqaCsuNzUqZixnPWEsaD0wKSxoKyssaT0wO2Q+PWM7KWlmKHIoYyksZC09YywrK2k+PTI0MCl7bT0hMDticmVha31zKGQvYyksdChmLG0pLG09ITEsdT1uKGIpfXZhciBjPTFlMy82MCxkPTAsZT0wLGY9NjAsZz0wLGg9MCxpPTAsaj0wLGs9ITEsbD0hMSxtPSExLG49YS5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fGZ1bmN0aW9uKCl7dmFyIGE9RGF0ZS5ub3coKSxiLGQ7cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiBiPURhdGUubm93KCksZD1NYXRoLm1heCgwLGMtKGItYSkpLGE9YitkLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtlKGIrZCl9LGQpfX0oKSxvPWEuY2FuY2VsQW5pbWF0aW9uRnJhbWV8fGNsZWFyVGltZW91dCxwPWZ1bmN0aW9uKCl7fSxxPXAscj1wLHM9cCx0PXAsdTthLk1haW5Mb29wPXtnZXRTaW11bGF0aW9uVGltZXN0ZXA6ZnVuY3Rpb24oKXtyZXR1cm4gY30sc2V0U2ltdWxhdGlvblRpbWVzdGVwOmZ1bmN0aW9uKGEpe3JldHVybiBjPWEsdGhpc30sZ2V0RlBTOmZ1bmN0aW9uKCl7cmV0dXJuIGZ9LGdldE1heEFsbG93ZWRGUFM6ZnVuY3Rpb24oKXtyZXR1cm4gMWUzL2p9LHNldE1heEFsbG93ZWRGUFM6ZnVuY3Rpb24oYSl7cmV0dXJuXCJ1bmRlZmluZWRcIj09dHlwZW9mIGEmJihhPTEvMCksMD09PWE/dGhpcy5zdG9wKCk6aj0xZTMvYSx0aGlzfSxyZXNldEZyYW1lRGVsdGE6ZnVuY3Rpb24oKXt2YXIgYT1kO3JldHVybiBkPTAsYX0sc2V0QmVnaW46ZnVuY3Rpb24oYSl7cmV0dXJuIHE9YXx8cSx0aGlzfSxzZXRVcGRhdGU6ZnVuY3Rpb24oYSl7cmV0dXJuIHI9YXx8cix0aGlzfSxzZXREcmF3OmZ1bmN0aW9uKGEpe3JldHVybiBzPWF8fHMsdGhpc30sc2V0RW5kOmZ1bmN0aW9uKGEpe3JldHVybiB0PWF8fHQsdGhpc30sc3RhcnQ6ZnVuY3Rpb24oKXtyZXR1cm4gbHx8KGw9ITAsbihmdW5jdGlvbihhKXtzKDEpLGs9ITAsZT1hLGc9YSxoPTAsdT1uKGIpfSkpLHRoaXN9LHN0b3A6ZnVuY3Rpb24oKXtyZXR1cm4gaz0hMSxsPSExLG8odSksdGhpc30saXNSdW5uaW5nOmZ1bmN0aW9uKCl7cmV0dXJuIGt9fSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGEuTWFpbkxvb3ApOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiYobW9kdWxlLmV4cG9ydHM9YS5NYWluTG9vcCl9KHRoaXMpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFpbmxvb3AubWluLmpzLm1hcCJdfQ==
