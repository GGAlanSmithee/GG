(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GG100k = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MainLoop = require('mainloop.js');
MainLoop = 'default' in MainLoop ? MainLoop['default'] : MainLoop;

var Entities = require('gg-entities');

var Game = (function () {
    function Game() {
        _classCallCheck(this, Game);

        this.entityManager = new Entities.EntityManager(200);
    }

    _createClass(Game, [{
        key: 'update',
        value: function update(delta) {
            this.entityManager.onLogic(delta);
        }
    }, {
        key: 'draw',
        value: function draw(interpolationPercentage) {
            this.entityManager.onRender(interpolationPercentage);
        }
    }]);

    return Game;
})();

var App = (function () {
    function App() {
        _classCallCheck(this, App);

        this.game = new Game();
    }

    _createClass(App, [{
        key: 'update',
        value: function update(delta) {
            console.log('...updating');

            this.game.update(delta);
        }
    }, {
        key: 'draw',
        value: function draw(interpolationPercentage) {
            console.log('...drawing');

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
/*
 * A main loop useful for games and other animated applications.
 */
(function(root) {

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
    requestAnimationFrame = root.requestAnimationFrame || (function() {
        var lastTimestamp = Date.now(),
            now,
            timeout;
        return function(callback) {
            now = Date.now();
            // The next frame should run no sooner than the simulation allows,
            // but as soon as possible if the current frame has already taken
            // more time to run than is simulated in one timestep.
            timeout = Math.max(0, simulationTimestep - (now - lastTimestamp));
            lastTimestamp = now + timeout;
            return setTimeout(function() {
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
    NOOP = function() {},

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
    getSimulationTimestep: function() {
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
    setSimulationTimestep: function(timestep) {
        simulationTimestep = timestep;
        return this;
    },

    /**
     * Returns the exponential moving average of the frames per second.
     *
     * @return {Number}
     *   The exponential moving average of the frames per second.
     */
    getFPS: function() {
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
    getMaxAllowedFPS: function() {
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
    setMaxAllowedFPS: function(fps) {
        if (typeof fps === 'undefined') {
            fps = Infinity;
        }
        if (fps === 0) {
            this.stop();
        }
        else {
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
    resetFrameDelta: function() {
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
    setBegin: function(fun) {
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
    setUpdate: function(fun) {
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
    setDraw: function(fun) {
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
    setEnd: function(fun) {
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
    start: function() {
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
            requestAnimationFrame(function(timestamp) {
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
    stop: function() {
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
    isRunning: function() {
        return running;
    },
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
     * rates. Also, if the amount of time spent simulating is consistently
     * longer than the amount of time between frames, the application will
     * freeze and crash in a spiral of death.
     *
     * A better solution is to separate the amount of time simulated in each
     * update() from the amount of time between frames. Our update() function
     * doesn't need to change; we just need to change the delta we pass to it
     * so that each update() simulates a fixed amount of time (that is, `delta`
     * should have the same value each time update() is called). The update()
     * function can be run multiple times per frame if needed to simulate the
     * total amount of time passed since the last frame. (If the time that has
     * passed since the last frame is less than the fixed simulation time, we
     * just won't run an update() until the the next frame.) This approach
     * avoids inconsistent rounding errors and ensures that there are no giant
     * leaps through walls between frames. It also avoids the spiral of death
     * as long as the fixed simulation time is set to a value that is high
     * enough that update() calls usually take less time than the amount of
     * time they're simulating. See `MainLoop.setMaxUpdatesPerDraw()` and
     * `MainLoop.setEnd()` for discussions of other ways to avoid the spiral of
     * death.
     *
     * That is what is done below.
     *
     * See `MainLoop.setUpdate()` for a discussion of performance
     * considerations.
     *
     * Additional reading for those interested:
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
else if (typeof exports === 'object') {
    module.exports = root.MainLoop;
}

})(this);

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS91YnVudHUvd29ya3NwYWNlL2Rpc3QvYnVuZGxlLmpzIiwibm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL2Rpc3Qvbm9kZV9tb2R1bGVzL2dnLWVudGl0aWVzL2Rpc3Qvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9ob21lL3VidW50dS93b3Jrc3BhY2UvYnVpbGQvZ2ctZW50aXRpZXMuanMiLCJub2RlX21vZHVsZXMvbWFpbmxvb3AuanMvc3JjL21haW5sb29wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOzs7Ozs7QUFFYixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDdEMsUUFBUSxHQUFJLFNBQVMsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFFBQVEsQUFBQyxDQUFDOztBQUVwRSxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7O0lBRWhDLElBQUk7QUFDSyxhQURULElBQUksR0FDUTs4QkFEWixJQUFJOztBQUVGLFlBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3hEOztpQkFIQyxJQUFJOztlQUtBLGdCQUFDLEtBQUssRUFBRTtBQUNWLGdCQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNyQzs7O2VBRUcsY0FBQyx1QkFBdUIsRUFBRTtBQUMxQixnQkFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQztTQUN4RDs7O1dBWEMsSUFBSTs7O0lBY0osR0FBRztBQUNNLGFBRFQsR0FBRyxHQUNTOzhCQURaLEdB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIE1haW5Mb29wID0gcmVxdWlyZSgnbWFpbmxvb3AuanMnKTtcbk1haW5Mb29wID0gKCdkZWZhdWx0JyBpbiBNYWluTG9vcCA/IE1haW5Mb29wWydkZWZhdWx0J10gOiBNYWluTG9vcCk7XG5cbnZhciBFbnRpdGllcyA9IHJlcXVpcmUoJ2dnLWVudGl0aWVzJyk7XG5cbmNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmVudGl0eU1hbmFnZXIgPSBuZXcgRW50aXRpZXMuRW50aXR5TWFuYWdlcigyMDApO1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGUoZGVsdGEpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlNYW5hZ2VyLm9uTG9naWMoZGVsdGEpO1xuICAgIH1cbiAgICBcbiAgICBkcmF3KGludGVycG9sYXRpb25QZXJjZW50YWdlKSB7XG4gICAgICAgIHRoaXMuZW50aXR5TWFuYWdlci5vblJlbmRlcihpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSk7XG4gICAgfVxufVxuXG5jbGFzcyBBcHAge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmdhbWUgPSBuZXcgR2FtZSgpO1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGUoZGVsdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coJy4uLnVwZGF0aW5nJyk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmdhbWUudXBkYXRlKGRlbHRhKTtcbiAgICB9XG4gICAgXG4gICAgZHJhdyhpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnLi4uZHJhd2luZycpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5nYW1lLmRyYXcoaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2UpO1xuICAgIH1cbiAgICBcbiAgICBydW4oKSB7XG4gICAgICAgIE1haW5Mb29wLnNldFVwZGF0ZShkZWx0YSA9PiB7IHRoaXMudXBkYXRlKGRlbHRhKTsgfSlcbiAgICAgICAgICAgICAgICAuc2V0RHJhdyhpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSA9PiB7IHRoaXMuZHJhdyhpbnRlcnBvbGF0aW9uUGVyY2VudGFnZSk7IH0pXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgfVxufVxuXG5leHBvcnRzLkFwcCA9IEFwcDsiLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgQ29tcG9uZW50TWFuYWdlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgXG4gICAgbmV3Q29tcG9uZW50KGNvbXBvbmVudElkKSB7XG4gICAgICAgIGxldCBjb21wb25lbnQgPSB0aGlzLmNvbXBvbmVudHMuZ2V0KGNvbXBvbmVudElkKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChjb21wb25lbnQgPT09IG51bGwgfHwgY29tcG9uZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBzd2l0Y2ggKHR5cGVvZiBjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzogcmV0dXJuIG5ldyBjb21wb25lbnQoKTtcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCcgIDoge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKGNvbXBvbmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmV0ID0ge307XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjb21wb25lbnQpLmZvckVhY2goa2V5ID0+IHJldFtrZXldID0gY29tcG9uZW50W2tleV0pO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICAgICAgICB9KShjb21wb25lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gY29tcG9uZW50O1xuICAgIH1cbiAgICBcbiAgICByZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICAgICAgaWYgKGNvbXBvbmVudCA9PT0gbnVsbCB8fCBjb21wb25lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCdjb21wb25lbnQgY2Fubm90IGJlIG51bGwuJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBtYXggPSBNYXRoLm1heCguLi50aGlzLmNvbXBvbmVudHMua2V5cygpKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBpZCA9IG1heCA9PT0gdW5kZWZpbmVkIHx8IG1heCA9PT0gbnVsbCB8fCBtYXggPT09IC1JbmZpbml0eSA/IDEgOiBtYXggPT09IDAgPyAxIDogbWF4ICogMjtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudHMuc2V0KGlkLCBjb21wb25lbnQpO1xuXG4gICAgICAgIHJldHVybiBpZDtcbiAgICB9XG4gICAgXG4gICAgZ2V0Q29tcG9uZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcG9uZW50cztcbiAgICB9XG59XG5cbmV4cG9ydHMuQ29tcG9uZW50TWFuYWdlciA9IENvbXBvbmVudE1hbmFnZXI7XG5cbmNvbnN0IFN5c3RlbVR5cGUgPSB7XG4gICAgTG9naWMgICA6IDAsXG4gICAgUmVuZGVyICA6IDFcbn07XG5cbmNsYXNzIFN5c3RlbU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmxvZ2ljU3lzdGVtcyAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMucmVuZGVyU3lzdGVtcyA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJTeXN0ZW0odHlwZSwgc2VsZWN0b3IsIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgXHRpZiAodHlwZSAhPT0gU3lzdGVtVHlwZS5Mb2dpYyAmJiB0eXBlICE9PSBTeXN0ZW1UeXBlLlJlbmRlcikge1xuICAgIFx0ICAgIHRocm93IFR5cGVFcnJvcigndHlwZSBtdXN0IGJlIGEgdmFsaWQgU3lzdGVtVHlwZS4nKTtcbiAgICBcdH1cbiAgICBcdFxuICAgIFx0aWYgKHNlbGVjdG9yICE9PSBTZWxlY3RvclR5cGUuR2V0ICYmIHNlbGVjdG9yICE9PSBTZWxlY3RvclR5cGUuR2V0V2l0aCAmJlxuICAgIFx0ICAgIHNlbGVjdG9yICE9PSBTZWxlY3RvclR5cGUuR2V0V2l0aE9ubHkgJiYgc2VsZWN0b3IgIT09IFNlbGVjdG9yVHlwZS5HZXRXaXRob3V0KSB7XG4gICAgXHQgICAgdGhyb3cgVHlwZUVycm9yKCdzZWxlY3RvciBtdXN0IGJlIGEgdmFsaWQgU2VsZWN0b3JUeXBlLicpO1xuICAgIFx0fVxuICAgIFx0XG4gICAgXHRpZiAodHlwZW9mIGNvbXBvbmVudHMgIT09ICdudW1iZXInKSAge1xuICAgIFx0XHR0aHJvdyBUeXBlRXJyb3IoJ2NvbXBvbmVudHMgbXVzdCBiZSBhIG51bWJlci4nKTtcbiAgICBcdH1cbiAgICBcdFxuICAgIFx0aWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIFx0XHR0aHJvdyBUeXBlRXJyb3IoJ2NhbGxiYWNrIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgICBcdH1cbiAgICBcdFxuICAgIFx0bGV0IHN5c3RlbSA9IHtcbiAgICBcdFx0c2VsZWN0b3IsXG4gICAgXHRcdGNvbXBvbmVudHMsXG4gICAgXHRcdGNhbGxiYWNrXG4gICAgXHR9O1xuICAgIFxuICAgICAgICBsZXQgc3lzdGVtSWQgPSBNYXRoLm1heCgwLCAuLi50aGlzLmxvZ2ljU3lzdGVtcy5rZXlzKCksIC4uLnRoaXMucmVuZGVyU3lzdGVtcy5rZXlzKCkpICsgMTtcbiAgICBcdFxuICAgIFx0c3dpdGNoICh0eXBlKSB7XG4gICAgXHQgICAgY2FzZSBTeXN0ZW1UeXBlLkxvZ2ljICA6IHRoaXMubG9naWNTeXN0ZW1zLnNldChzeXN0ZW1JZCwgc3lzdGVtKTsgIGJyZWFrO1xuICAgIFx0ICAgIGNhc2UgU3lzdGVtVHlwZS5SZW5kZXIgOiB0aGlzLnJlbmRlclN5c3RlbXMuc2V0KHN5c3RlbUlkLCBzeXN0ZW0pOyBicmVhaztcbiAgICBcdH1cblxuICAgIFx0cmV0dXJuIHN5c3RlbUlkO1xuICAgIH1cbiAgICBcbiAgICByZW1vdmVTeXN0ZW0oc3lzdGVtSWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9naWNTeXN0ZW1zLmRlbGV0ZShzeXN0ZW1JZCkgfHwgdGhpcy5yZW5kZXJTeXN0ZW1zLmRlbGV0ZShzeXN0ZW1JZCk7XG4gICAgfVxufVxuXG5leHBvcnRzLlN5c3RlbU1hbmFnZXIgPSBTeXN0ZW1NYW5hZ2VyO1xuZXhwb3J0cy5TeXN0ZW1UeXBlID0gU3lzdGVtVHlwZTtcblxuY2xhc3MgRXZlbnRIYW5kbGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIFxuICAgIGVtcHR5UHJvbWlzZSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcHJvbWlzZShjYWxsYmFjaywgY29udGV4dCwgYXJncywgdGltZW91dCkge1xuICAgICAgICBpZiAodGltZW91dCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0eXBlb2YgY29udGV4dCA9PT0gICdvYmplY3QnID8gY2FsbGJhY2suY2FsbChjb250ZXh0LCAuLi5hcmdzKSA6IGNhbGxiYWNrLmFwcGx5KGNvbnRleHQsIC4uLmFyZ3MpKTtcbiAgICAgICAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICByZXNvbHZlKHR5cGVvZiBjb250ZXh0ID09PSAnb2JqZWN0JyA/IGNhbGxiYWNrLmNhbGwoY29udGV4dCwgLi4uYXJncykgOiBjYWxsYmFjay5hcHBseShjb250ZXh0LCAuLi5hcmdzKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBsaXN0ZW4oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnQgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoIXRoaXMuZXZlbnRzLmhhcyhldmVudCkpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnNldChldmVudCwgbmV3IE1hcCgpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGV2ZW50SWQgPSAtMTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnRJZCA9IE1hdGgubWF4KGV2ZW50SWQsIC4uLmV2ZW50LmtleXMoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgKytldmVudElkO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5ldmVudHMuZ2V0KGV2ZW50KS5zZXQoZXZlbnRJZCwgY2FsbGJhY2spO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGV2ZW50SWQ7XG4gICAgfVxuICAgIFxuICAgIHN0b3BMaXN0ZW4oZXZlbnRJZCkge1xuICAgICAgICBmb3IgKGxldCBldmVudHMgb2YgdGhpcy5ldmVudHMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGlkIG9mIGV2ZW50cy5rZXlzKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaWQgPT09IGV2ZW50SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50cy5kZWxldGUoZXZlbnRJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICB0cmlnZ2VyKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXMgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyID8gdGhpcy5ldmVudEhhbmRsZXIgOiB0aGlzO1xuICAgICAgICBcbiAgICAgICAgbGV0IGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG4gICAgICAgIFxuICAgICAgICBsZXQgWyBldmVudCBdID0gYXJncy5zcGxpY2UoMCwgMSk7XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGV2ZW50ICE9PSAnc3RyaW5nJyB8fCAhc2VsZi5ldmVudHMuaGFzKGV2ZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuZW1wdHlQcm9taXNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgY2FsbGJhY2sgb2Ygc2VsZi5ldmVudHMuZ2V0KGV2ZW50KS52YWx1ZXMoKSkge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChzZWxmLnByb21pc2UoY2FsbGJhY2ssIHRoaXMsIGFyZ3MsIDEpKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlckRlbGF5ZWQoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcyBpbnN0YW5jZW9mIEVudGl0eU1hbmFnZXIgPyB0aGlzLmV2ZW50SGFuZGxlciA6IHRoaXM7XG4gICAgICAgIFxuICAgICAgICBsZXQgYXJncyA9IEFycmF5LmZyb20oYXJndW1lbnRzKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBbIGV2ZW50LCB0aW1lb3V0IF0gPSBhcmdzLnNwbGljZSgwLCAyKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgZXZlbnQgIT09ICdzdHJpbmcnIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKHRpbWVvdXQpIHx8ICFzZWxmLmV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5lbXB0eVByb21pc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IHByb21pc2VzID0gW107XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBjYWxsYmFjayBvZiBzZWxmLmV2ZW50cy5nZXQoZXZlbnQpLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHNlbGYucHJvbWlzZShjYWxsYmFjaywgdGhpcywgYXJncywgdGltZW91dCkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH1cbn1cblxuZXhwb3J0cy5FdmVudEhhbmRsZXIgPSBFdmVudEhhbmRsZXI7XG5cbmNvbnN0IFNlbGVjdG9yVHlwZSA9IHtcbiAgICBHZXQgICAgICAgICA6IDAsXG4gICAgR2V0V2l0aCAgICAgOiAxLFxuICAgIEdldFdpdGhPbmx5IDogMixcbiAgICBHZXRXaXRob3V0ICA6IDNcbn07XG5cbmNsYXNzIEVudGl0eU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKGNhcGFjaXR5ID0gMTAwMCkge1xuICAgICAgICB0aGlzLmNhcGFjaXR5ICAgICAgICAgPSBjYXBhY2l0eTtcbiAgICAgICAgdGhpcy5jdXJyZW50TWF4RW50aXR5ID0gLTE7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkgICAgPSBuZXcgRW50aXR5RmFjdG9yeSgpO1xuICAgICAgICB0aGlzLnN5c3RlbU1hbmFnZXIgICAgPSBuZXcgU3lzdGVtTWFuYWdlcigpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudE1hbmFnZXIgPSBuZXcgQ29tcG9uZW50TWFuYWdlcigpO1xuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlciAgICAgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudGl0aWVzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogdGhpcy5jYXBhY2l0eSB9LCB2ID0+IHYgPSAwKTtcbiAgICB9XG4gICAgXG4gICAgaW5jcmVhc2VDYXBhY2l0eSgpIHtcbiAgICAgICAgbGV0IG9sZENhcGFjaXR5ID0gdGhpcy5jYXBhY2l0eTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2FwYWNpdHkgKj0gMjtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSBvbGRDYXBhY2l0eTsgaSA8IHRoaXMuY2FwYWNpdHk7ICsraSkge1xuICAgICAgICAgICAgdGhpcy5lbnRpdGllc1tpXSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGNvbXBvbmVudElkIG9mIHRoaXMuY29tcG9uZW50TWFuYWdlci5nZXRDb21wb25lbnRzKCkua2V5cygpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gb2xkQ2FwYWNpdHk7IGkgPCB0aGlzLmNhcGFjaXR5OyArK2kpIHtcbiAgICAgICAgICAgICAgICB0aGlzW2NvbXBvbmVudElkXS5wdXNoKHRoaXMuY29tcG9uZW50TWFuYWdlci5uZXdDb21wb25lbnQoY29tcG9uZW50SWQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBuZXdFbnRpdHkoY29tcG9uZW50cykge1xuICAgICAgICBpZiAodHlwZW9mIGNvbXBvbmVudHMgIT09ICdudW1iZXInIHx8IGNvbXBvbmVudHMgPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FwYWNpdHk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBlbnRpdHlJZCA9IDA7XG4gICAgICAgIFxuICAgICAgICBmb3IgKDsgZW50aXR5SWQgPCB0aGlzLmNhcGFjaXR5OyArK2VudGl0eUlkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gPT09IDApIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGVudGl0eUlkID49IHRoaXMuY2FwYWNpdHkpIHtcbiAgICAgICAgICAgIC8vIHRvZG86IGF1dG8gaW5jcmVhc2UgY2FwYWNpdHk/XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYXBhY2l0eTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGVudGl0eUlkID4gdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNYXhFbnRpdHkgPSBlbnRpdHlJZDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gPSBjb21wb25lbnRzO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGVudGl0eUlkO1xuICAgIH1cbiAgICBcbiAgICBkZWxldGVFbnRpdHkoZW50aXR5SWQpIHtcbiAgICAgICAgdGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gPSAwO1xuICAgICAgICBcbiAgICAgICAgaWYgKGVudGl0eUlkIDwgdGhpcy5jdXJyZW50TWF4RW50aXR5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSBlbnRpdHlJZDsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVudGl0aWVzW2ldICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TWF4RW50aXR5ID0gaTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgKmdldEVudGl0aWVzKGNvbXBvbmVudHMgPSAwLCB0eXBlID0gU2VsZWN0b3JUeXBlLkdldFdpdGgpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFNlbGVjdG9yVHlwZS5HZXRXaXRoOiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW50aXR5SWQgaW4gdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5SWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbZW50aXR5SWRdICE9PSAwICYmICh0aGlzLmVudGl0aWVzW2VudGl0eUlkXSAmIGNvbXBvbmVudHMpID09PSBjb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCBNYXRoLmZsb29yKGVudGl0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgU2VsZWN0b3JUeXBlLkdldFdpdGhPbmx5OiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW50aXR5SWQgaW4gdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5SWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW50aXRpZXNbZW50aXR5SWRdICE9PSAwICYmIHRoaXMuZW50aXRpZXNbZW50aXR5SWRdID09PSBjb21wb25lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCBNYXRoLmZsb29yKGVudGl0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgU2VsZWN0b3JUeXBlLkdldFdpdGhvdXQ6IHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBlbnRpdHlJZCBpbiB0aGlzLmVudGl0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRpdHlJZCA+IHRoaXMuY3VycmVudE1heEVudGl0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbnRpdGllc1tlbnRpdHlJZF0gIT09IDAgJiYgKHRoaXMuZW50aXRpZXNbZW50aXR5SWRdICYgY29tcG9uZW50cykgIT09IGNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIE1hdGguZmxvb3IoZW50aXR5SWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBTZWxlY3RvclR5cGUuR2V0OiB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW50aXR5SWQgaW4gdGhpcy5lbnRpdGllcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5SWQgPiB0aGlzLmN1cnJlbnRNYXhFbnRpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgTWF0aC5mbG9vcihlbnRpdHlJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ29tcG9uZW50IE1hbmFnZXJcbiAgICBcbiAgICByZWdpc3RlckNvbXBvbmVudChjb21wb25lbnQpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudElkID0gdGhpcy5jb21wb25lbnRNYW5hZ2VyLnJlZ2lzdGVyQ29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzW2NvbXBvbmVudElkXSA9IFtdO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNhcGFjaXR5OyArK2kpIHtcbiAgICAgICAgICAgIHRoaXNbY29tcG9uZW50SWRdLnB1c2godGhpcy5jb21wb25lbnRNYW5hZ2VyLm5ld0NvbXBvbmVudChjb21wb25lbnRJZCkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgaW5pdGlhbGl6ZXI7XG5cbiAgICAgICAgc3dpdGNoICh0eXBlb2YgY29tcG9uZW50KSB7XG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6IGluaXRpYWxpemVyID0gY29tcG9uZW50OyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6IHtcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMoY29tcG9uZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gY29tcG9uZW50W2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWZhdWx0OiBpbml0aWFsaXplciA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29tcG9uZW50OyB9OyBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LnJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBjb21wb25lbnRJZDtcbiAgICB9XG4gICAgXG4gICAgYWRkQ29tcG9uZW50KGVudGl0eUlkLCBjb21wb25lbnRJZCkge1xuICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eUlkXSB8PSBjb21wb25lbnRJZDtcbiAgICB9XG4gICAgXG4gICAgcmVtb3ZlQ29tcG9uZW50KGVudGl0eUlkLCBjb21wb25lbnRJZCkge1xuICAgICAgICB0aGlzLmVudGl0aWVzW2VudGl0eUlkXSAmPSB+Y29tcG9uZW50SWQ7XG4gICAgfVxuICAgIFxuICAgIC8vIFN5c3RlbSBNYW5hZ2VyXG4gICAgXG4gICAgcmVnaXN0ZXJTeXN0ZW0odHlwZSwgc2VsZWN0b3IsIGNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVnaXN0ZXJTeXN0ZW0odHlwZSwgc2VsZWN0b3IsIGNvbXBvbmVudHMsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJMb2dpY1N5c3RlbShzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbShTeXN0ZW1UeXBlLkxvZ2ljLCBzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spO1xuICAgIH1cbiAgICBcbiAgICByZWdpc3RlclJlbmRlclN5c3RlbShzZWxlY3RvciwgY29tcG9uZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3lzdGVtTWFuYWdlci5yZWdpc3RlclN5c3RlbShTeXN0ZW1UeXBlLlJlbmRlciwgc2VsZWN0b3IsIGNvbXBvbmVudHMsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgXG4gICAgcmVtb3ZlU3lzdGVtKHN5c3RlbUlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5c3RlbU1hbmFnZXIucmVtb3ZlU3lzdGVtKHN5c3RlbUlkKTtcbiAgICB9XG4gICAgXG4gICAgb25Mb2dpYyhkZWx0YSkge1xuICAgICAgICBmb3IgKGxldCBzeXN0ZW0gb2YgdGhpcy5zeXN0ZW1NYW5hZ2VyLmxvZ2ljU3lzdGVtcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgc3lzdGVtLmNhbGxiYWNrLmNhbGwodGhpcywgdGhpcy5nZXRFbnRpdGllcyhzeXN0ZW0uY29tcG9uZW50cywgc3lzdGVtLnNlbGVjdG9yKSwgZGVsdGEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uUmVuZGVyKGRlbHRhKSB7XG4gICAgICAgIGZvciAobGV0IHN5c3RlbSBvZiB0aGlzLnN5c3RlbU1hbmFnZXIucmVuZGVyU3lzdGVtcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgc3lzdGVtLmNhbGxiYWNrLmNhbGwodGhpcywgdGhpcy5nZXRFbnRpdGllcyhzeXN0ZW0uY29tcG9uZW50cywgc3lzdGVtLnNlbGVjdG9yKSwgZGVsdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gRW50aXR5IEZhY3RvcnlcbiAgICBcbiAgICByZWdpc3RlckluaXRpYWxpemVyKGNvbXBvbmVudElkLCBpbml0aWFsaXplcikge1xuICAgICAgICB0aGlzLmVudGl0eUZhY3RvcnkucmVnaXN0ZXJJbml0aWFsaXplcihjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpO1xuICAgIH1cbiAgICBcbiAgICBidWlsZCgpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LmJ1aWxkKCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgXG4gICAgd2l0aENvbXBvbmVudChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpIHtcbiAgICAgICAgdGhpcy5lbnRpdHlGYWN0b3J5LndpdGhDb21wb25lbnQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGVDb25maWd1cmF0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnRpdHlGYWN0b3J5LmNyZWF0ZUNvbmZpZ3VyYXRpb24oKTtcbiAgICB9XG4gICAgXG4gICAgY3JlYXRlKGNvdW50LCBjb25maWd1cmF0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVudGl0eUZhY3RvcnkuY3JlYXRlKHRoaXMsIGNvdW50LCBjb25maWd1cmF0aW9uKTtcbiAgICB9XG4gICAgXG4gICAgLy8gRXZlbnQgSGFuZGxlclxuICAgIFxuICAgIGxpc3RlbihldmVudCwgY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLmxpc3RlbihldmVudCwgY2FsbGJhY2spO1xuICAgIH1cbiAgICBcbiAgICBzdG9wTGlzdGVuKGV2ZW50SWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRIYW5kbGVyLnN0b3BMaXN0ZW4oZXZlbnRJZCk7XG4gICAgfVxuICAgIFxuICAgIHRyaWdnZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyLmNhbGwodGhpcywgLi4uYXJndW1lbnRzKTtcbiAgICB9XG4gICAgXG4gICAgdHJpZ2dlckRlbGF5ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyRGVsYXllZC5jYWxsKHRoaXMsIC4uLmFyZ3VtZW50cyk7XG4gICAgfVxufVxuXG5jbGFzcyBFbnRpdHlGYWN0b3J5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplcnMgID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVySW5pdGlhbGl6ZXIoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihjb21wb25lbnRJZCkgfHwgdHlwZW9mIGluaXRpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZXJzLnNldChjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXIpO1xuICAgIH1cbiAgICBcbiAgICBidWlsZCgpIHtcbiAgICAgICAgdGhpcy5jb25maWd1cmF0aW9uID0gbmV3IE1hcCgpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFxuICAgIHdpdGhDb21wb25lbnQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKSB7XG4gICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihjb21wb25lbnRJZCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGluaXRpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBpbml0aWFsaXplciA9IHRoaXMuaW5pdGlhbGl6ZXJzLmdldChjb21wb25lbnRJZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5zZXQoY29tcG9uZW50SWQsIGluaXRpYWxpemVyKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGVDb25maWd1cmF0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uO1xuICAgIH1cbiAgICBcbiAgICBjcmVhdGUoZW50aXR5TWFuYWdlciwgY291bnQgPSAxLCBjb25maWd1cmF0aW9uID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICghKGVudGl0eU1hbmFnZXIgaW5zdGFuY2VvZiBFbnRpdHlNYW5hZ2VyKSkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGNvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uIHx8IHRoaXMuY29uZmlndXJhdGlvbjtcblxuICAgICAgICBsZXQgY29tcG9uZW50cyA9IDA7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBjb21wb25lbnQgb2YgY29uZmlndXJhdGlvbi5rZXlzKCkpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMgfD0gY29tcG9uZW50O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBsZXQgZW50aXRpZXMgPSBbXTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7ICsraSkge1xuICAgICAgICAgICAgbGV0IGVudGl0eUlkID0gZW50aXR5TWFuYWdlci5uZXdFbnRpdHkoY29tcG9uZW50cyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChlbnRpdHlJZCA+PSBlbnRpdHlNYW5hZ2VyLmNhcGFjaXR5KSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAobGV0IFtjb21wb25lbnRJZCwgaW5pdGlhbGl6ZXJdIG9mIGNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGluaXRpYWxpemVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gaW5pdGlhbGl6ZXIuY2FsbChlbnRpdHlNYW5hZ2VyW2NvbXBvbmVudElkXVtlbnRpdHlJZF0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZW50aXR5TWFuYWdlcltjb21wb25lbnRJZF1bZW50aXR5SWRdICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBlbnRpdHlNYW5hZ2VyW2NvbXBvbmVudElkXVtlbnRpdHlJZF0gIT09ICdvYmplY3QnICYmIHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eU1hbmFnZXJbY29tcG9uZW50SWRdW2VudGl0eUlkXSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGVudGl0aWVzLnB1c2goZW50aXR5SWQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZW50aXRpZXMubGVuZ3RoID09PSAxID8gZW50aXRpZXNbMF0gOiBlbnRpdGllcztcbiAgICB9XG59XG5cbmV4cG9ydHMuRW50aXR5TWFuYWdlciA9IEVudGl0eU1hbmFnZXI7XG5leHBvcnRzLlNlbGVjdG9yVHlwZSA9IFNlbGVjdG9yVHlwZTtcblxuIiwiLypcbiAqIEEgbWFpbiBsb29wIHVzZWZ1bCBmb3IgZ2FtZXMgYW5kIG90aGVyIGFuaW1hdGVkIGFwcGxpY2F0aW9ucy5cbiAqL1xuKGZ1bmN0aW9uKHJvb3QpIHtcblxuICAgIC8vIFRoZSBhbW91bnQgb2YgdGltZSAoaW4gbWlsbGlzZWNvbmRzKSB0byBzaW11bGF0ZSBlYWNoIHRpbWUgdXBkYXRlKClcbiAgICAvLyBydW5zLiBTZWUgYE1haW5Mb29wLnNldFNpbXVsYXRpb25UaW1lc3RlcCgpYCBmb3IgZGV0YWlscy5cbnZhciBzaW11bGF0aW9uVGltZXN0ZXAgPSAxMDAwIC8gNjAsXG5cbiAgICAvLyBUaGUgY3VtdWxhdGl2ZSBhbW91bnQgb2YgaW4tYXBwIHRpbWUgdGhhdCBoYXNuJ3QgYmVlbiBzaW11bGF0ZWQgeWV0LlxuICAgIC8vIFNlZSB0aGUgY29tbWVudHMgaW5zaWRlIGFuaW1hdGUoKSBmb3IgZGV0YWlscy5cbiAgICBmcmFtZURlbHRhID0gMCxcblxuICAgIC8vIFRoZSB0aW1lc3RhbXAgaW4gbWlsbGlzZWNvbmRzIG9mIHRoZSBsYXN0IHRpbWUgdGhlIG1haW4gbG9vcCB3YXMgcnVuLlxuICAgIC8vIFVzZWQgdG8gY29tcHV0ZSB0aGUgdGltZSBlbGFwc2VkIGJldHdlZW4gZnJhbWVzLlxuICAgIGxhc3RGcmFtZVRpbWVNcyA9IDAsXG5cbiAgICAvLyBBbiBleHBvbmVudGlhbCBtb3ZpbmcgYXZlcmFnZSBvZiB0aGUgZnJhbWVzIHBlciBzZWNvbmQuXG4gICAgZnBzID0gNjAsXG5cbiAgICAvLyBUaGUgdGltZXN0YW1wIChpbiBtaWxsaXNlY29uZHMpIG9mIHRoZSBsYXN0IHRpbWUgdGhlIGBmcHNgIG1vdmluZ1xuICAgIC8vIGF2ZXJhZ2Ugd2FzIHVwZGF0ZWQuXG4gICAgbGFzdEZwc1VwZGF0ZSA9IDAsXG5cbiAgICAvLyBUaGUgbnVtYmVyIG9mIGZyYW1lcyBkZWxpdmVyZWQgaW4gdGhlIGN1cnJlbnQgc2Vjb25kLlxuICAgIGZyYW1lc1RoaXNTZWNvbmQgPSAwLFxuXG4gICAgLy8gVGhlIG51bWJlciBvZiB0aW1lcyB1cGRhdGUoKSBpcyBjYWxsZWQgaW4gYSBnaXZlbiBmcmFtZS4gVGhpcyBpcyBvbmx5XG4gICAgLy8gcmVsZXZhbnQgaW5zaWRlIG9mIGFuaW1hdGUoKSwgYnV0IGEgcmVmZXJlbmNlIGlzIGhlbGQgZXh0ZXJuYWxseSBzbyB0aGF0XG4gICAgLy8gdGhpcyB2YXJpYWJsZSBpcyBub3QgbWFya2VkIGZvciBnYXJiYWdlIGNvbGxlY3Rpb24gZXZlcnkgdGltZSB0aGUgbWFpblxuICAgIC8vIGxvb3AgcnVucy5cbiAgICBudW1VcGRhdGVTdGVwcyA9IDAsXG5cbiAgICAvLyBUaGUgbWluaW11bSBhbW91bnQgb2YgdGltZSBpbiBtaWxsaXNlY29uZHMgdGhhdCBtdXN0IHBhc3Mgc2luY2UgdGhlIGxhc3RcbiAgICAvLyBmcmFtZSB3YXMgZXhlY3V0ZWQgYmVmb3JlIGFub3RoZXIgZnJhbWUgY2FuIGJlIGV4ZWN1dGVkLiBUaGVcbiAgICAvLyBtdWx0aXBsaWNhdGl2ZSBpbnZlcnNlIGNhcHMgdGhlIEZQUyAodGhlIGRlZmF1bHQgb2YgemVybyBtZWFucyB0aGVyZSBpc1xuICAgIC8vIG5vIGNhcCkuXG4gICAgbWluRnJhbWVEZWxheSA9IDAsXG5cbiAgICAvLyBXaGV0aGVyIHRoZSBtYWluIGxvb3AgaXMgcnVubmluZy5cbiAgICBydW5uaW5nID0gZmFsc2UsXG5cbiAgICAvLyBgdHJ1ZWAgaWYgYE1haW5Mb29wLnN0YXJ0KClgIGhhcyBiZWVuIGNhbGxlZCBhbmQgdGhlIG1vc3QgcmVjZW50IHRpbWUgaXRcbiAgICAvLyB3YXMgY2FsbGVkIGhhcyBub3QgYmVlbiBmb2xsb3dlZCBieSBhIGNhbGwgdG8gYE1haW5Mb29wLnN0b3AoKWAuIFRoaXMgaXNcbiAgICAvLyBkaWZmZXJlbnQgdGhhbiBgcnVubmluZ2AgYmVjYXVzZSB0aGVyZSBpcyBhIGRlbGF5IG9mIGEgZmV3IG1pbGxpc2Vjb25kc1xuICAgIC8vIGFmdGVyIGBNYWluTG9vcC5zdGFydCgpYCBpcyBjYWxsZWQgYmVmb3JlIHRoZSBhcHBsaWNhdGlvbiBpcyBjb25zaWRlcmVkXG4gICAgLy8gXCJydW5uaW5nLlwiIFRoaXMgZGVsYXkgaXMgZHVlIHRvIHdhaXRpbmcgZm9yIHRoZSBuZXh0IGZyYW1lLlxuICAgIHN0YXJ0ZWQgPSBmYWxzZSxcblxuICAgIC8vIFdoZXRoZXIgdGhlIHNpbXVsYXRpb24gaGFzIGZhbGxlbiB0b28gZmFyIGJlaGluZCByZWFsIHRpbWUuXG4gICAgLy8gU3BlY2lmaWNhbGx5LCBgcGFuaWNgIHdpbGwgYmUgc2V0IHRvIGB0cnVlYCBpZiB0b28gbWFueSB1cGRhdGVzIG9jY3VyIGluXG4gICAgLy8gb25lIGZyYW1lLiBUaGlzIGlzIG9ubHkgcmVsZXZhbnQgaW5zaWRlIG9mIGFuaW1hdGUoKSwgYnV0IGEgcmVmZXJlbmNlIGlzXG4gICAgLy8gaGVsZCBleHRlcm5hbGx5IHNvIHRoYXQgdGhpcyB2YXJpYWJsZSBpcyBub3QgbWFya2VkIGZvciBnYXJiYWdlXG4gICAgLy8gY29sbGVjdGlvbiBldmVyeSB0aW1lIHRoZSBtYWluIGxvb3AgcnVucy5cbiAgICBwYW5pYyA9IGZhbHNlLFxuXG4gICAgLy8gVGhlIGZ1bmN0aW9uIHRoYXQgcnVucyB0aGUgbWFpbiBsb29wLiBUaGUgdW5wcmVmaXhlZCB2ZXJzaW9uIG9mXG4gICAgLy8gYHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKWAgaXMgYXZhaWxhYmxlIGluIGFsbCBtb2Rlcm4gYnJvd3NlcnNcbiAgICAvLyBub3csIGJ1dCBub2RlLmpzIGRvZXNuJ3QgaGF2ZSBpdCwgc28gZmFsbCBiYWNrIHRvIHRpbWVycy4gVGhlIHBvbHlmaWxsXG4gICAgLy8gaXMgYWRhcHRlZCBmcm9tIHRoZSBNSVQtbGljZW5zZWRcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdW5kZXJzY29yZWRpc2NvdmVyeS9yZWFsdGltZS1tdWx0aXBsYXllci1pbi1odG1sNVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHJvb3QucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGxhc3RUaW1lc3RhbXAgPSBEYXRlLm5vdygpLFxuICAgICAgICAgICAgbm93LFxuICAgICAgICAgICAgdGltZW91dDtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgLy8gVGhlIG5leHQgZnJhbWUgc2hvdWxkIHJ1biBubyBzb29uZXIgdGhhbiB0aGUgc2ltdWxhdGlvbiBhbGxvd3MsXG4gICAgICAgICAgICAvLyBidXQgYXMgc29vbiBhcyBwb3NzaWJsZSBpZiB0aGUgY3VycmVudCBmcmFtZSBoYXMgYWxyZWFkeSB0YWtlblxuICAgICAgICAgICAgLy8gbW9yZSB0aW1lIHRvIHJ1biB0aGFuIGlzIHNpbXVsYXRlZCBpbiBvbmUgdGltZXN0ZXAuXG4gICAgICAgICAgICB0aW1lb3V0ID0gTWF0aC5tYXgoMCwgc2ltdWxhdGlvblRpbWVzdGVwIC0gKG5vdyAtIGxhc3RUaW1lc3RhbXApKTtcbiAgICAgICAgICAgIGxhc3RUaW1lc3RhbXAgPSBub3cgKyB0aW1lb3V0O1xuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobm93ICsgdGltZW91dCk7XG4gICAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgfTtcbiAgICB9KSgpLFxuXG4gICAgLy8gVGhlIGZ1bmN0aW9uIHRoYXQgc3RvcHMgdGhlIG1haW4gbG9vcC4gVGhlIHVucHJlZml4ZWQgdmVyc2lvbiBvZlxuICAgIC8vIGB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoKWAgaXMgYXZhaWxhYmxlIGluIGFsbCBtb2Rlcm4gYnJvd3NlcnMgbm93LFxuICAgIC8vIGJ1dCBub2RlLmpzIGRvZXNuJ3QgaGF2ZSBpdCwgc28gZmFsbCBiYWNrIHRvIHRpbWVycy5cbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSA9IHJvb3QuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgY2xlYXJUaW1lb3V0LFxuXG4gICAgLy8gSW4gYWxsIG1ham9yIGJyb3dzZXJzLCByZXBsYWNpbmcgbm9uLXNwZWNpZmllZCBmdW5jdGlvbnMgd2l0aCBOT09Qc1xuICAgIC8vIHNlZW1zIHRvIGJlIGFzIGZhc3Qgb3Igc2xpZ2h0bHkgZmFzdGVyIHRoYW4gdXNpbmcgY29uZGl0aW9ucyB0byBvbmx5XG4gICAgLy8gY2FsbCB0aGUgZnVuY3Rpb25zIGlmIHRoZXkgYXJlIHNwZWNpZmllZC4gVGhpcyBpcyBwcm9iYWJseSBkdWUgdG8gZW1wdHlcbiAgICAvLyBmdW5jdGlvbnMgYmVpbmcgb3B0aW1pemVkIGF3YXkuIGh0dHA6Ly9qc3BlcmYuY29tL25vb3AtdnMtY29uZGl0aW9uXG4gICAgTk9PUCA9IGZ1bmN0aW9uKCkge30sXG5cbiAgICAvLyBBIGZ1bmN0aW9uIHRoYXQgcnVucyBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBtYWluIGxvb3AuXG4gICAgLy8gU2VlIGBNYWluTG9vcC5zZXRCZWdpbigpYCBmb3IgZGV0YWlscy5cbiAgICBiZWdpbiA9IE5PT1AsXG5cbiAgICAvLyBBIGZ1bmN0aW9uIHRoYXQgcnVucyB1cGRhdGVzIChpLmUuIEFJIGFuZCBwaHlzaWNzKS5cbiAgICAvLyBTZWUgYE1haW5Mb29wLnNldFVwZGF0ZSgpYCBmb3IgZGV0YWlscy5cbiAgICB1cGRhdGUgPSBOT09QLFxuXG4gICAgLy8gQSBmdW5jdGlvbiB0aGF0IGRyYXdzIHRoaW5ncyBvbiB0aGUgc2NyZWVuLlxuICAgIC8vIFNlZSBgTWFpbkxvb3Auc2V0RHJhdygpYCBmb3IgZGV0YWlscy5cbiAgICBkcmF3ID0gTk9PUCxcblxuICAgIC8vIEEgZnVuY3Rpb24gdGhhdCBydW5zIGF0IHRoZSBlbmQgb2YgdGhlIG1haW4gbG9vcC5cbiAgICAvLyBTZWUgYE1haW5Mb29wLnNldEVuZCgpYCBmb3IgZGV0YWlscy5cbiAgICBlbmQgPSBOT09QLFxuXG4gICAgLy8gVGhlIElEIG9mIHRoZSBjdXJyZW50bHkgZXhlY3V0aW5nIGZyYW1lLiBVc2VkIHRvIGNhbmNlbCBmcmFtZXMgd2hlblxuICAgIC8vIHN0b3BwaW5nIHRoZSBsb29wLlxuICAgIHJhZkhhbmRsZTtcblxuLyoqXG4gKiBNYW5hZ2VzIHRoZSBtYWluIGxvb3AgdGhhdCBydW5zIHVwZGF0ZXMgYW5kIHJlbmRlcmluZy5cbiAqXG4gKiBUaGUgbWFpbiBsb29wIGlzIGEgY29yZSBwYXJ0IG9mIGFueSBhcHBsaWNhdGlvbiBpbiB3aGljaCBzdGF0ZSBjaGFuZ2VzXG4gKiBldmVuIGlmIG5vIGV2ZW50cyBhcmUgaGFuZGxlZC4gSW4gZ2FtZXMsIGl0IGlzIHR5cGljYWxseSByZXNwb25zaWJsZSBmb3JcbiAqIGNvbXB1dGluZyBwaHlzaWNzIGFuZCBBSSBhcyB3ZWxsIGFzIGRyYXdpbmcgdGhlIHJlc3VsdCBvbiB0aGUgc2NyZWVuLlxuICpcbiAqIFRoZSBib2R5IG9mIHRoaXMgcGFydGljdWxhciBsb29wIGlzIHJ1biBldmVyeSB0aW1lIHRoZSBicm93c2VyIGlzIHJlYWR5IHRvXG4gKiBwYWludCBhbm90aGVyIGZyYW1lLiBUaGUgZnJlcXVlbmN5IHdpdGggd2hpY2ggdGhpcyBoYXBwZW5zIGRlcGVuZHMgcHJpbWFyaWx5XG4gKiBvbiB0aGUgbW9uaXRvcidzIHJlZnJlc2ggcmF0ZSwgd2hpY2ggaXMgdHlwaWNhbGx5IDYwIGZyYW1lcyBwZXIgc2Vjb25kLiBNb3N0XG4gKiBhcHBsaWNhdGlvbnMgYWltIHRvIHJ1biBhdCA2MCBGUFMgZm9yIHRoaXMgcmVhc29uLCBtZWFuaW5nIHRoYXQgdGhlIG1haW5cbiAqIGxvb3AgcnVucyBhYm91dCBvbmNlIGV2ZXJ5IDE2LjcgbWlsbGlzZWNvbmRzLiBXaXRoIHRoaXMgdGFyZ2V0LCBldmVyeXRoaW5nXG4gKiB0aGF0IGhhcHBlbnMgaW4gdGhlIG1haW4gbG9vcCAoZS5nLiBhbGwgdXBkYXRlcyBhbmQgZHJhd2luZykgbmVlZHMgdG8gb2NjdXJcbiAqIHdpdGhpbiB0aGUgXCJidWRnZXRcIiBvZiAxNi43IG1pbGxpc2Vjb25kcy4gIFNlZVxuICogYE1haW5Mb29wLnNldFNpbXVsYXRpb25UaW1lc3RlcCgpYCBmb3IgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCB0eXBpY2FsXG4gKiBtb25pdG9yIHJlZnJlc2ggcmF0ZXMgYW5kIGZyYW1lIHJhdGUgdGFyZ2V0cy5cbiAqXG4gKiBUaGUgbWFpbiBsb29wIGNhbiBiZSBzdGFydGVkIGFuZCBzdG9wcGVkLCBidXQgdGhlcmUgY2FuIG9ubHkgYmUgb25lIE1haW5Mb29wXG4gKiAoZXhjZXB0IHRoYXQgZWFjaCBXZWIgV29ya2VyIGNhbiBoYXZlIGl0cyBvd24gTWFpbkxvb3ApLiBUaGVyZSBhcmUgZm91ciBtYWluXG4gKiBwYXJ0cyBvZiB0aGUgbG9vcDoge0BsaW5rICNzZXRCZWdpbiBiZWdpbn0oKSwge0BsaW5rICNzZXRVcGRhdGUgdXBkYXRlfSgpLFxuICoge0BsaW5rICNzZXREcmF3IGRyYXd9KCksIGFuZCB7QGxpbmsgI3NldEVuZCBlbmR9KCksIGluIHRoYXQgb3JkZXIuIFNlZSB0aGVcbiAqIGZ1bmN0aW9ucyB0aGF0IHNldCBlYWNoIG9mIHRoZW0gZm9yIGRlc2NyaXB0aW9ucyBvZiB3aGF0IHRoZXkgYXJlIHVzZWQgZm9yLlxuICogTm90ZSB0aGF0IHVwZGF0ZSgpIGNhbiBydW4gemVybyBvciBtb3JlIHRpbWVzIHBlciBsb29wLlxuICpcbiAqIEBjbGFzcyBNYWluTG9vcFxuICovXG5yb290Lk1haW5Mb29wID0ge1xuICAgIC8qKlxuICAgICAqIEdldHMgaG93IG1hbnkgbWlsbGlzZWNvbmRzIHNob3VsZCBiZSBzaW11bGF0ZWQgYnkgZXZlcnkgcnVuIG9mIHVwZGF0ZSgpLlxuICAgICAqXG4gICAgICogU2VlIGBNYWluTG9vcC5zZXRTaW11bGF0aW9uVGltZXN0ZXAoKWAgZm9yIGRldGFpbHMgb24gdGhpcyB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKiAgIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgc2hvdWxkIGJlIHNpbXVsYXRlZCBieSBldmVyeSBydW4gb2ZcbiAgICAgKiAgIHtAbGluayAjc2V0VXBkYXRlIHVwZGF0ZX0oKS5cbiAgICAgKi9cbiAgICBnZXRTaW11bGF0aW9uVGltZXN0ZXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gc2ltdWxhdGlvblRpbWVzdGVwO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIGhvdyBtYW55IG1pbGxpc2Vjb25kcyBzaG91bGQgYmUgc2ltdWxhdGVkIGJ5IGV2ZXJ5IHJ1biBvZiB1cGRhdGUoKS5cbiAgICAgKlxuICAgICAqIFRoZSBwZXJjZWl2ZWQgZnJhbWVzIHBlciBzZWNvbmQgKEZQUykgaXMgZWZmZWN0aXZlbHkgY2FwcGVkIGF0IHRoZVxuICAgICAqIG11bHRpcGxpY2F0aXZlIGludmVyc2Ugb2YgdGhlIHNpbXVsYXRpb24gdGltZXN0ZXAuIFRoYXQgaXMsIGlmIHRoZVxuICAgICAqIHRpbWVzdGVwIGlzIDEwMDAgLyA2MCAod2hpY2ggaXMgdGhlIGRlZmF1bHQpLCB0aGVuIHRoZSBtYXhpbXVtIHBlcmNlaXZlZFxuICAgICAqIEZQUyBpcyBlZmZlY3RpdmVseSA2MC4gRGVjcmVhc2luZyB0aGUgdGltZXN0ZXAgaW5jcmVhc2VzIHRoZSBtYXhpbXVtXG4gICAgICogcGVyY2VpdmVkIEZQUyBhdCB0aGUgY29zdCBvZiBydW5uaW5nIHtAbGluayAjc2V0VXBkYXRlIHVwZGF0ZX0oKSBtb3JlXG4gICAgICogdGltZXMgcGVyIGZyYW1lIGF0IGxvd2VyIGZyYW1lIHJhdGVzLiBTaW5jZSBydW5uaW5nIHVwZGF0ZSgpIG1vcmUgdGltZXNcbiAgICAgKiB0YWtlcyBtb3JlIHRpbWUgdG8gcHJvY2VzcywgdGhpcyBjYW4gYWN0dWFsbHkgc2xvdyBkb3duIHRoZSBmcmFtZSByYXRlLlxuICAgICAqIEFkZGl0aW9uYWxseSwgaWYgdGhlIGFtb3VudCBvZiB0aW1lIGl0IHRha2VzIHRvIHJ1biB1cGRhdGUoKSBleGNlZWRzIG9yXG4gICAgICogdmVyeSBuZWFybHkgZXhjZWVkcyB0aGUgdGltZXN0ZXAsIHRoZSBhcHBsaWNhdGlvbiB3aWxsIGZyZWV6ZSBhbmQgY3Jhc2hcbiAgICAgKiBpbiBhIHNwaXJhbCBvZiBkZWF0aCAodW5sZXNzIGl0IGlzIHJlc2N1ZWQ7IHNlZSBgTWFpbkxvb3Auc2V0RW5kKClgIGZvclxuICAgICAqIGFuIGV4cGxhbmF0aW9uIG9mIHdoYXQgY2FuIGJlIGRvbmUgaWYgYSBzcGlyYWwgb2YgZGVhdGggaXMgb2NjdXJyaW5nKS5cbiAgICAgKlxuICAgICAqIFRoZSBleGNlcHRpb24gdG8gdGhpcyBpcyB0aGF0IGludGVycG9sYXRpbmcgYmV0d2VlbiB1cGRhdGVzIGZvciBlYWNoXG4gICAgICogcmVuZGVyIGNhbiBpbmNyZWFzZSB0aGUgcGVyY2VpdmVkIGZyYW1lIHJhdGUgYW5kIHJlZHVjZSB2aXN1YWxcbiAgICAgKiBzdHV0dGVyaW5nLiBTZWUgYE1haW5Mb29wLnNldERyYXcoKWAgZm9yIGFuIGV4cGxhbmF0aW9uIG9mIGhvdyB0byBkb1xuICAgICAqIHRoaXMuXG4gICAgICpcbiAgICAgKiBJZiB5b3UgYXJlIGNvbnNpZGVyaW5nIGRlY3JlYXNpbmcgdGhlIHNpbXVsYXRpb24gdGltZXN0ZXAgaW4gb3JkZXIgdG9cbiAgICAgKiByYWlzZSB0aGUgbWF4aW11bSBwZXJjZWl2ZWQgRlBTLCBrZWVwIGluIG1pbmQgdGhhdCBtb3N0IG1vbml0b3JzIGNhbid0XG4gICAgICogZGlzcGxheSBtb3JlIHRoYW4gNjAgRlBTLiBXaGV0aGVyIGh1bWFucyBjYW4gdGVsbCB0aGUgZGlmZmVyZW5jZSBhbW9uZ1xuICAgICAqIGhpZ2ggZnJhbWUgcmF0ZXMgZGVwZW5kcyBvbiB0aGUgYXBwbGljYXRpb24sIGJ1dCBmb3IgcmVmZXJlbmNlLCBmaWxtIGlzXG4gICAgICogdXN1YWxseSBkaXNwbGF5ZWQgYXQgMjQgRlBTLCBvdGhlciB2aWRlb3MgYXQgMzAgRlBTLCBtb3N0IGdhbWVzIGFyZVxuICAgICAqIGFjY2VwdGFibGUgYWJvdmUgMzAgRlBTLCBhbmQgdmlydHVhbCByZWFsaXR5IG1pZ2h0IHJlcXVpcmUgNzUgRlBTIHRvXG4gICAgICogZmVlbCBuYXR1cmFsLiBTb21lIGdhbWluZyBtb25pdG9ycyBnbyB1cCB0byAxNDQgRlBTLiBTZXR0aW5nIHRoZVxuICAgICAqIHRpbWVzdGVwIGJlbG93IDEwMDAgLyAxNDQgaXMgZGlzY291cmFnZWQgYW5kIGJlbG93IDEwMDAgLyAyNDAgaXNcbiAgICAgKiBzdHJvbmdseSBkaXNjb3VyYWdlZC4gVGhlIGRlZmF1bHQgb2YgMTAwMCAvIDYwIGlzIGdvb2QgaW4gbW9zdCBjYXNlcy5cbiAgICAgKlxuICAgICAqIFRoZSBzaW11bGF0aW9uIHRpbWVzdGVwIHNob3VsZCB0eXBpY2FsbHkgb25seSBiZSBjaGFuZ2VkIGF0XG4gICAgICogZGV0ZXJtaW5pc3RpYyB0aW1lcyAoZS5nLiBiZWZvcmUgdGhlIG1haW4gbG9vcCBzdGFydHMgZm9yIHRoZSBmaXJzdFxuICAgICAqIHRpbWUsIGFuZCBub3QgaW4gcmVzcG9uc2UgdG8gdXNlciBpbnB1dCBvciBzbG93IGZyYW1lIHJhdGVzKSB0byBhdm9pZFxuICAgICAqIGludHJvZHVjaW5nIG5vbi1kZXRlcm1pbmlzdGljIGJlaGF2aW9yLiBUaGUgdXBkYXRlIHRpbWVzdGVwIHNob3VsZCBiZVxuICAgICAqIHRoZSBzYW1lIGZvciBhbGwgcGxheWVycy91c2VycyBpbiBtdWx0aXBsYXllci9tdWx0aS11c2VyIGFwcGxpY2F0aW9ucy5cbiAgICAgKlxuICAgICAqIFNlZSBhbHNvIGBNYWluTG9vcC5nZXRTaW11bGF0aW9uVGltZXN0ZXAoKWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdGltZXN0ZXBcbiAgICAgKiAgIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgc2hvdWxkIGJlIHNpbXVsYXRlZCBieSBldmVyeSBydW4gb2ZcbiAgICAgKiAgIHtAbGluayAjc2V0VXBkYXRlIHVwZGF0ZX0oKS5cbiAgICAgKi9cbiAgICBzZXRTaW11bGF0aW9uVGltZXN0ZXA6IGZ1bmN0aW9uKHRpbWVzdGVwKSB7XG4gICAgICAgIHNpbXVsYXRpb25UaW1lc3RlcCA9IHRpbWVzdGVwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZXhwb25lbnRpYWwgbW92aW5nIGF2ZXJhZ2Ugb2YgdGhlIGZyYW1lcyBwZXIgc2Vjb25kLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqICAgVGhlIGV4cG9uZW50aWFsIG1vdmluZyBhdmVyYWdlIG9mIHRoZSBmcmFtZXMgcGVyIHNlY29uZC5cbiAgICAgKi9cbiAgICBnZXRGUFM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZnBzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBtYXhpbXVtIGZyYW1lIHJhdGUuXG4gICAgICpcbiAgICAgKiBPdGhlciBmYWN0b3JzIGFsc28gbGltaXQgdGhlIEZQUzsgc2VlIGBNYWluTG9vcC5zZXRTaW11bGF0aW9uVGltZXN0ZXBgXG4gICAgICogZm9yIGRldGFpbHMuXG4gICAgICpcbiAgICAgKiBTZWUgYWxzbyBgTWFpbkxvb3Auc2V0TWF4QWxsb3dlZEZQUygpYC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKiAgIFRoZSBtYXhpbXVtIG51bWJlciBvZiBmcmFtZXMgcGVyIHNlY29uZCBhbGxvd2VkLlxuICAgICAqL1xuICAgIGdldE1heEFsbG93ZWRGUFM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gMTAwMCAvIG1pbkZyYW1lRGVsYXk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgYSBtYXhpbXVtIGZyYW1lIHJhdGUuXG4gICAgICpcbiAgICAgKiBTZWUgYWxzbyBgTWFpbkxvb3AuZ2V0TWF4QWxsb3dlZEZQUygpYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbZnBzPUluZmluaXR5XVxuICAgICAqICAgVGhlIG1heGltdW0gbnVtYmVyIG9mIGZyYW1lcyBwZXIgc2Vjb25kIHRvIGV4ZWN1dGUuIElmIEluZmluaXR5IG9yIG5vdFxuICAgICAqICAgcGFzc2VkLCB0aGVyZSB3aWxsIGJlIG5vIEZQUyBjYXAgKGFsdGhvdWdoIG90aGVyIGZhY3RvcnMgZG8gbGltaXQgdGhlXG4gICAgICogICBGUFM7IHNlZSBgTWFpbkxvb3Auc2V0U2ltdWxhdGlvblRpbWVzdGVwYCBmb3IgZGV0YWlscykuIElmIHplcm8sIHRoaXNcbiAgICAgKiAgIHdpbGwgc3RvcCB0aGUgbG9vcCwgYW5kIHdoZW4gdGhlIGxvb3AgaXMgbmV4dCBzdGFydGVkLCBpdCB3aWxsIHJldHVyblxuICAgICAqICAgdG8gdGhlIHByZXZpb3VzIG1heGltdW0gZnJhbWUgcmF0ZS4gUGFzc2luZyBuZWdhdGl2ZSB2YWx1ZXMgd2lsbCBzdGFsbFxuICAgICAqICAgdGhlIGxvb3AgdW50aWwgdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgYWdhaW4gd2l0aCBhIHBvc2l0aXZlIHZhbHVlLlxuICAgICAqXG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIHNldE1heEFsbG93ZWRGUFM6IGZ1bmN0aW9uKGZwcykge1xuICAgICAgICBpZiAodHlwZW9mIGZwcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGZwcyA9IEluZmluaXR5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChmcHMgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gRGl2aWRpbmcgYnkgSW5maW5pdHkgcmV0dXJucyB6ZXJvLlxuICAgICAgICAgICAgbWluRnJhbWVEZWxheSA9IDEwMDAgLyBmcHM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlc2V0IHRoZSBhbW91bnQgb2YgdGltZSB0aGF0IGhhcyBub3QgeWV0IGJlZW4gc2ltdWxhdGVkIHRvIHplcm8uXG4gICAgICpcbiAgICAgKiBUaGlzIGludHJvZHVjZXMgbm9uLWRldGVybWluaXN0aWMgYmVoYXZpb3IgaWYgY2FsbGVkIGFmdGVyIHRoZVxuICAgICAqIGFwcGxpY2F0aW9uIGhhcyBzdGFydGVkIHJ1bm5pbmcgKHVubGVzcyBpdCBpcyBiZWluZyByZXNldCwgaW4gd2hpY2ggY2FzZVxuICAgICAqIGl0IGRvZXNuJ3QgbWF0dGVyKS4gSG93ZXZlciwgdGhpcyBjYW4gYmUgdXNlZnVsIGluIGNhc2VzIHdoZXJlIHRoZVxuICAgICAqIGFtb3VudCBvZiB0aW1lIHRoYXQgaGFzIG5vdCB5ZXQgYmVlbiBzaW11bGF0ZWQgaGFzIGdyb3duIHZlcnkgbGFyZ2VcbiAgICAgKiAoZm9yIGV4YW1wbGUsIHdoZW4gdGhlIGFwcGxpY2F0aW9uJ3MgdGFiIGdldHMgcHV0IGluIHRoZSBiYWNrZ3JvdW5kIGFuZFxuICAgICAqIHRoZSBicm93c2VyIHRocm90dGxlcyB0aGUgdGltZXJzIGFzIGEgcmVzdWx0KS4gSW4gYXBwbGljYXRpb25zIHdpdGhcbiAgICAgKiBsb2Nrc3RlcCB0aGUgcGxheWVyIHdvdWxkIGdldCBkcm9wcGVkLCBidXQgaW4gb3RoZXIgbmV0d29ya2VkXG4gICAgICogYXBwbGljYXRpb25zIGl0IG1heSBiZSBuZWNlc3NhcnkgdG8gc25hcCBvciBlYXNlIHRoZSBwbGF5ZXIvdXNlciB0byB0aGVcbiAgICAgKiBhdXRob3JpdGF0aXZlIHN0YXRlIGFuZCBkaXNjYXJkIHBlbmRpbmcgdXBkYXRlcyBpbiB0aGUgcHJvY2Vzcy4gSW5cbiAgICAgKiBub24tbmV0d29ya2VkIGFwcGxpY2F0aW9ucyBpdCBtYXkgYWxzbyBiZSBhY2NlcHRhYmxlIHRvIHNpbXBseSByZXN1bWVcbiAgICAgKiB0aGUgYXBwbGljYXRpb24gd2hlcmUgaXQgbGFzdCBsZWZ0IG9mZiBhbmQgaWdub3JlIHRoZSBhY2N1bXVsYXRlZFxuICAgICAqIHVuc2ltdWxhdGVkIHRpbWUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICogICBUaGUgY3VtdWxhdGl2ZSBhbW91bnQgb2YgZWxhcHNlZCB0aW1lIGluIG1pbGxpc2Vjb25kcyB0aGF0IGhhcyBub3QgeWV0XG4gICAgICogICBiZWVuIHNpbXVsYXRlZCwgYnV0IGlzIGJlaW5nIGRpc2NhcmRlZCBhcyBhIHJlc3VsdCBvZiBjYWxsaW5nIHRoaXNcbiAgICAgKiAgIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIHJlc2V0RnJhbWVEZWx0YTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvbGRGcmFtZURlbHRhID0gZnJhbWVEZWx0YTtcbiAgICAgICAgZnJhbWVEZWx0YSA9IDA7XG4gICAgICAgIHJldHVybiBvbGRGcmFtZURlbHRhO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBmdW5jdGlvbiB0aGF0IHJ1bnMgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgbWFpbiBsb29wLlxuICAgICAqXG4gICAgICogVGhlIGJlZ2luKCkgZnVuY3Rpb24gaXMgdHlwaWNhbGx5IHVzZWQgdG8gcHJvY2VzcyBpbnB1dCBiZWZvcmUgdGhlXG4gICAgICogdXBkYXRlcyBydW4uIFByb2Nlc3NpbmcgaW5wdXQgaGVyZSAoaW4gY2h1bmtzKSBjYW4gcmVkdWNlIHRoZSBydW5uaW5nXG4gICAgICogdGltZSBvZiBldmVudCBoYW5kbGVycywgd2hpY2ggaXMgdXNlZnVsIGJlY2F1c2UgbG9uZy1ydW5uaW5nIGV2ZW50XG4gICAgICogaGFuZGxlcnMgY2FuIHNvbWV0aW1lcyBkZWxheSBmcmFtZXMuXG4gICAgICpcbiAgICAgKiBVbmxpa2Uge0BsaW5rICNzZXRVcGRhdGUgdXBkYXRlfSgpLCB3aGljaCBjYW4gcnVuIHplcm8gb3IgbW9yZSB0aW1lcyBwZXJcbiAgICAgKiBmcmFtZSwgYmVnaW4oKSBhbHdheXMgcnVucyBleGFjdGx5IG9uY2UgcGVyIGZyYW1lLiBUaGlzIG1ha2VzIGl0IHVzZWZ1bFxuICAgICAqIGZvciBhbnkgdXBkYXRlcyB0aGF0IGFyZSBub3QgZGVwZW5kZW50IG9uIHRpbWUgaW4gdGhlIHNpbXVsYXRpb24uXG4gICAgICogRXhhbXBsZXMgaW5jbHVkZSBhZGp1c3RpbmcgSFVEIGNhbGN1bGF0aW9ucyBvciBwZXJmb3JtaW5nIGxvbmctcnVubmluZ1xuICAgICAqIHVwZGF0ZXMgaW5jcmVtZW50YWxseS4gQ29tcGFyZWQgdG8ge0BsaW5rICNzZXRFbmQgZW5kfSgpLCBnZW5lcmFsbHlcbiAgICAgKiBhY3Rpb25zIHNob3VsZCBvY2N1ciBpbiBiZWdpbigpIGlmIHRoZXkgYWZmZWN0IGFueXRoaW5nIHRoYXRcbiAgICAgKiB7QGxpbmsgI3NldFVwZGF0ZSB1cGRhdGV9KCkgb3Ige0BsaW5rICNzZXREcmF3IGRyYXd9KCkgdXNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gYmVnaW5cbiAgICAgKiAgIFRoZSBiZWdpbigpIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbYmVnaW4udGltZXN0YW1wXVxuICAgICAqICAgVGhlIGN1cnJlbnQgdGltZXN0YW1wICh3aGVuIHRoZSBmcmFtZSBzdGFydGVkKSwgaW4gbWlsbGlzZWNvbmRzLiBUaGlzXG4gICAgICogICBzaG91bGQgb25seSBiZSB1c2VkIGZvciBjb21wYXJpc29uIHRvIG90aGVyIHRpbWVzdGFtcHMgYmVjYXVzZSB0aGVcbiAgICAgKiAgIGVwb2NoIChpLmUuIHRoZSBcInplcm9cIiB0aW1lKSBkZXBlbmRzIG9uIHRoZSBlbmdpbmUgcnVubmluZyB0aGlzIGNvZGUuXG4gICAgICogICBJbiBlbmdpbmVzIHRoYXQgc3VwcG9ydCBgRE9NSGlnaFJlc1RpbWVTdGFtcGAgKGFsbCBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgKiAgIGV4Y2VwdCBpT1MgU2FmYXJpIDgpIHRoZSBlcG9jaCBpcyB0aGUgdGltZSB0aGUgcGFnZSBzdGFydGVkIGxvYWRpbmcsXG4gICAgICogICBzcGVjaWZpY2FsbHkgYHBlcmZvcm1hbmNlLnRpbWluZy5uYXZpZ2F0aW9uU3RhcnRgLiBFdmVyeXdoZXJlIGVsc2UsXG4gICAgICogICBpbmNsdWRpbmcgbm9kZS5qcywgdGhlIGVwb2NoIGlzIHRoZSBVbml4IGVwb2NoICgxOTcwLTAxLTAxVDAwOjAwOjAwWikuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtiZWdpbi5kZWx0YV1cbiAgICAgKiAgIFRoZSB0b3RhbCBlbGFwc2VkIHRpbWUgdGhhdCBoYXMgbm90IHlldCBiZWVuIHNpbXVsYXRlZCwgaW5cbiAgICAgKiAgIG1pbGxpc2Vjb25kcy5cbiAgICAgKi9cbiAgICBzZXRCZWdpbjogZnVuY3Rpb24oZnVuKSB7XG4gICAgICAgIGJlZ2luID0gZnVuIHx8IGJlZ2luO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZnVuY3Rpb24gdGhhdCBydW5zIHVwZGF0ZXMgKGUuZy4gQUkgYW5kIHBoeXNpY3MpLlxuICAgICAqXG4gICAgICogVGhlIHVwZGF0ZSgpIGZ1bmN0aW9uIHNob3VsZCBzaW11bGF0ZSBhbnl0aGluZyB0aGF0IGlzIGFmZmVjdGVkIGJ5IHRpbWUuXG4gICAgICogSXQgY2FuIGJlIGNhbGxlZCB6ZXJvIG9yIG1vcmUgdGltZXMgcGVyIGZyYW1lIGRlcGVuZGluZyBvbiB0aGUgZnJhbWVcbiAgICAgKiByYXRlLlxuICAgICAqXG4gICAgICogQXMgd2l0aCBldmVyeXRoaW5nIGluIHRoZSBtYWluIGxvb3AsIHRoZSBydW5uaW5nIHRpbWUgb2YgdXBkYXRlKClcbiAgICAgKiBkaXJlY3RseSBhZmZlY3RzIHRoZSBmcmFtZSByYXRlLiBJZiB1cGRhdGUoKSB0YWtlcyBsb25nIGVub3VnaCB0aGF0IHRoZVxuICAgICAqIGZyYW1lIHJhdGUgZHJvcHMgYmVsb3cgdGhlIHRhcmdldCAoXCJidWRnZXRlZFwiKSBmcmFtZSByYXRlLCBwYXJ0cyBvZiB0aGVcbiAgICAgKiB1cGRhdGUoKSBmdW5jdGlvbiB0aGF0IGRvIG5vdCBuZWVkIHRvIGV4ZWN1dGUgYmV0d2VlbiBldmVyeSBmcmFtZSBjYW4gYmVcbiAgICAgKiBtb3ZlZCBpbnRvIFdlYiBXb3JrZXJzLiAoVmFyaW91cyBzb3VyY2VzIG9uIHRoZSBpbnRlcm5ldCBzb21ldGltZXNcbiAgICAgKiBzdWdnZXN0IG90aGVyIHNjaGVkdWxpbmcgcGF0dGVybnMgdXNpbmcgc2V0VGltZW91dCgpIG9yIHNldEludGVydmFsKCkuXG4gICAgICogVGhlc2UgYXBwcm9hY2hlcyBzb21ldGltZXMgb2ZmZXIgbW9kZXN0IGltcHJvdmVtZW50cyB3aXRoIG1pbmltYWxcbiAgICAgKiBjaGFuZ2VzIHRvIGV4aXN0aW5nIGNvZGUsIGJ1dCBiZWNhdXNlIEphdmFTY3JpcHQgaXMgc2luZ2xlLXRocmVhZGVkLCB0aGVcbiAgICAgKiB1cGRhdGVzIHdpbGwgc3RpbGwgYmxvY2sgcmVuZGVyaW5nIGFuZCBkcmFnIGRvd24gdGhlIGZyYW1lIHJhdGUuIFdlYlxuICAgICAqIFdvcmtlcnMgZXhlY3V0ZSBpbiBzZXBhcmF0ZSB0aHJlYWRzLCBzbyB0aGV5IGZyZWUgdXAgbW9yZSB0aW1lIGluIHRoZVxuICAgICAqIG1haW4gbG9vcC4pXG4gICAgICpcbiAgICAgKiBUaGlzIHNjcmlwdCBjYW4gYmUgaW1wb3J0ZWQgaW50byBhIFdlYiBXb3JrZXIgdXNpbmcgaW1wb3J0U2NyaXB0cygpIGFuZFxuICAgICAqIHVzZWQgdG8gcnVuIGEgc2Vjb25kIG1haW4gbG9vcCBpbiB0aGUgd29ya2VyLiBTb21lIGNvbnNpZGVyYXRpb25zOlxuICAgICAqXG4gICAgICogLSBQcm9maWxlIHlvdXIgY29kZSBiZWZvcmUgZG9pbmcgdGhlIHdvcmsgdG8gbW92ZSBpdCBpbnRvIFdlYiBXb3JrZXJzLlxuICAgICAqICAgSXQgY291bGQgYmUgdGhlIHJlbmRlcmluZyB0aGF0IGlzIHRoZSBib3R0bGVuZWNrLCBpbiB3aGljaCBjYXNlIHRoZVxuICAgICAqICAgc29sdXRpb24gaXMgdG8gZGVjcmVhc2UgdGhlIHZpc3VhbCBjb21wbGV4aXR5IG9mIHRoZSBzY2VuZS5cbiAgICAgKiAtIEl0IGRvZXNuJ3QgbWFrZSBzZW5zZSB0byBtb3ZlIHRoZSAqZW50aXJlKiBjb250ZW50cyBvZiB1cGRhdGUoKSBpbnRvXG4gICAgICogICB3b3JrZXJzIHVubGVzcyB7QGxpbmsgI3NldERyYXcgZHJhd30oKSBjYW4gaW50ZXJwb2xhdGUgYmV0d2VlbiBmcmFtZXMuXG4gICAgICogICBUaGUgbG93ZXN0LWhhbmdpbmcgZnJ1aXQgaXMgYmFja2dyb3VuZCB1cGRhdGVzIChsaWtlIGNhbGN1bGF0aW5nXG4gICAgICogICBjaXRpemVucycgaGFwcGluZXNzIGluIGEgY2l0eS1idWlsZGluZyBnYW1lKSwgcGh5c2ljcyB0aGF0IGRvZXNuJ3RcbiAgICAgKiAgIGFmZmVjdCB0aGUgc2NlbmUgKGxpa2UgZmxhZ3Mgd2F2aW5nIGluIHRoZSB3aW5kKSwgYW5kIGFueXRoaW5nIHRoYXQgaXNcbiAgICAgKiAgIG9jY2x1ZGVkIG9yIGhhcHBlbmluZyBmYXIgb2ZmIHNjcmVlbi5cbiAgICAgKiAtIElmIGRyYXcoKSBuZWVkcyB0byBpbnRlcnBvbGF0ZSBwaHlzaWNzIGJhc2VkIG9uIGFjdGl2aXR5IHRoYXQgb2NjdXJzXG4gICAgICogICBpbiBhIHdvcmtlciwgdGhlIHdvcmtlciBuZWVkcyB0byBwYXNzIHRoZSBpbnRlcnBvbGF0aW9uIHZhbHVlIGJhY2sgdG9cbiAgICAgKiAgIHRoZSBtYWluIHRocmVhZCBzbyB0aGF0IGlzIGlzIGF2YWlsYWJsZSB0byBkcmF3KCkuXG4gICAgICogLSBXZWIgV29ya2VycyBjYW4ndCBhY2Nlc3MgdGhlIHN0YXRlIG9mIHRoZSBtYWluIHRocmVhZCwgc28gdGhleSBjYW4ndFxuICAgICAqICAgZGlyZWN0bHkgbW9kaWZ5IG9iamVjdHMgaW4geW91ciBzY2VuZS4gTW92aW5nIGRhdGEgdG8gYW5kIGZyb20gV2ViXG4gICAgICogICBXb3JrZXJzIGlzIGEgcGFpbi4gVGhlIGZhc3Rlc3Qgd2F5IHRvIGRvIGl0IGlzIHdpdGggVHJhbnNmZXJhYmxlXG4gICAgICogICBPYmplY3RzOiBiYXNpY2FsbHksIHlvdSBjYW4gcGFzcyBhbiBBcnJheUJ1ZmZlciB0byBhIHdvcmtlcixcbiAgICAgKiAgIGRlc3Ryb3lpbmcgdGhlIG9yaWdpbmFsIHJlZmVyZW5jZSBpbiB0aGUgcHJvY2Vzcy5cbiAgICAgKlxuICAgICAqIFlvdSBjYW4gcmVhZCBtb3JlIGFib3V0IFdlYiBXb3JrZXJzIGFuZCBUcmFuc2ZlcmFibGUgT2JqZWN0cyBhdFxuICAgICAqIFtIVE1MNSBSb2Nrc10oaHR0cDovL3d3dy5odG1sNXJvY2tzLmNvbS9lbi90dXRvcmlhbHMvd29ya2Vycy9iYXNpY3MvKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHVwZGF0ZVxuICAgICAqICAgVGhlIHVwZGF0ZSgpIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbdXBkYXRlLmRlbHRhXVxuICAgICAqICAgVGhlIGFtb3VudCBvZiB0aW1lIGluIG1pbGxpc2Vjb25kcyB0byBzaW11bGF0ZSBpbiB0aGUgdXBkYXRlLiBJbiBtb3N0XG4gICAgICogICBjYXNlcyB0aGlzIHRpbWVzdGVwIG5ldmVyIGNoYW5nZXMgaW4gb3JkZXIgdG8gZW5zdXJlIGRldGVybWluaXN0aWNcbiAgICAgKiAgIHVwZGF0ZXMuIFRoZSB0aW1lc3RlcCBpcyB0aGUgc2FtZSBhcyB0aGF0IHJldHVybmVkIGJ5XG4gICAgICogICBgTWFpbkxvb3AuZ2V0U2ltdWxhdGlvblRpbWVzdGVwKClgLlxuICAgICAqL1xuICAgIHNldFVwZGF0ZTogZnVuY3Rpb24oZnVuKSB7XG4gICAgICAgIHVwZGF0ZSA9IGZ1biB8fCB1cGRhdGU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBmdW5jdGlvbiB0aGF0IGRyYXdzIHRoaW5ncyBvbiB0aGUgc2NyZWVuLlxuICAgICAqXG4gICAgICogVGhlIGRyYXcoKSBmdW5jdGlvbiBnZXRzIHBhc3NlZCB0aGUgcGVyY2VudCBvZiB0aW1lIHRoYXQgdGhlIG5leHQgcnVuIG9mXG4gICAgICoge0BsaW5rICNzZXRVcGRhdGUgdXBkYXRlfSgpIHdpbGwgc2ltdWxhdGUgdGhhdCBoYXMgYWN0dWFsbHkgZWxhcHNlZCwgYXNcbiAgICAgKiBhIGRlY2ltYWwuIEluIG90aGVyIHdvcmRzLCBkcmF3KCkgZ2V0cyBwYXNzZWQgaG93IGZhciBiZXR3ZWVuIHVwZGF0ZSgpXG4gICAgICogY2FsbHMgaXQgaXMuIFRoaXMgaXMgdXNlZnVsIGJlY2F1c2UgdGhlIHRpbWUgc2ltdWxhdGVkIGJ5IHVwZGF0ZSgpIGFuZFxuICAgICAqIHRoZSB0aW1lIGJldHdlZW4gZHJhdygpIGNhbGxzIGlzIHVzdWFsbHkgZGlmZmVyZW50LCBzbyB0aGUgcGFyYW1ldGVyIHRvXG4gICAgICogZHJhdygpIGNhbiBiZSB1c2VkIHRvIGludGVycG9sYXRlIG1vdGlvbiBiZXR3ZWVuIGZyYW1lcyB0byBtYWtlXG4gICAgICogcmVuZGVyaW5nIGFwcGVhciBzbW9vdGhlci4gVG8gaWxsdXN0cmF0ZSwgaWYgdXBkYXRlKCkgYWR2YW5jZXMgdGhlXG4gICAgICogc2ltdWxhdGlvbiBhdCBlYWNoIHZlcnRpY2FsIGJhciBpbiB0aGUgZmlyc3Qgcm93IGJlbG93LCBhbmQgZHJhdygpIGNhbGxzXG4gICAgICogaGFwcGVuIGF0IGVhY2ggdmVydGljYWwgYmFyIGluIHRoZSBzZWNvbmQgcm93IGJlbG93LCB0aGVuIHNvbWUgZnJhbWVzXG4gICAgICogd2lsbCBoYXZlIHRpbWUgbGVmdCBvdmVyIHRoYXQgaXMgbm90IHlldCBzaW11bGF0ZWQgYnkgdXBkYXRlKCkgd2hlblxuICAgICAqIHJlbmRlcmluZyBvY2N1cnMgaW4gZHJhdygpOlxuICAgICAqXG4gICAgICogICAgIHVwZGF0ZSgpIHRpbWVzdGVwczogIHwgIHwgIHwgIHwgIHwgIHwgIHwgIHwgIHxcbiAgICAgKiAgICAgZHJhdygpIGNhbGxzOiAgICAgICAgfCAgIHwgICB8ICAgfCAgIHwgICB8ICAgfFxuICAgICAqXG4gICAgICogVG8gaW50ZXJwb2xhdGUgbW90aW9uIGZvciByZW5kZXJpbmcgcHVycG9zZXMsIG9iamVjdHMnIHN0YXRlIGFmdGVyIHRoZVxuICAgICAqIGxhc3QgdXBkYXRlKCkgbXVzdCBiZSByZXRhaW5lZCBhbmQgdXNlZCB0byBjYWxjdWxhdGUgYW4gaW50ZXJtZWRpYXRlXG4gICAgICogc3RhdGUuIE5vdGUgdGhhdCB0aGlzIG1lYW5zIHJlbmRlcnMgd2lsbCBiZSB1cCB0byBvbmUgdXBkYXRlKCkgYmVoaW5kLlxuICAgICAqIFRoaXMgaXMgc3RpbGwgYmV0dGVyIHRoYW4gZXh0cmFwb2xhdGluZyAocHJvamVjdGluZyBvYmplY3RzJyBzdGF0ZSBhZnRlclxuICAgICAqIGEgZnV0dXJlIHVwZGF0ZSgpKSB3aGljaCBjYW4gcHJvZHVjZSBiaXphcnJlIHJlc3VsdHMuIFN0b3JpbmcgbXVsdGlwbGVcbiAgICAgKiBzdGF0ZXMgY2FuIGJlIGRpZmZpY3VsdCB0byBzZXQgdXAsIGFuZCBrZWVwIGluIG1pbmQgdGhhdCBydW5uaW5nIHRoaXNcbiAgICAgKiBwcm9jZXNzIHRha2VzIHRpbWUgdGhhdCBjb3VsZCBwdXNoIHRoZSBmcmFtZSByYXRlIGRvd24sIHNvIGl0J3Mgb2Z0ZW5cbiAgICAgKiBub3Qgd29ydGh3aGlsZSB1bmxlc3Mgc3R1dHRlcmluZyBpcyB2aXNpYmxlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZHJhd1xuICAgICAqICAgVGhlIGRyYXcoKSBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2RyYXcuaW50ZXJwb2xhdGlvblBlcmNlbnRhZ2VdXG4gICAgICogICBUaGUgY3VtdWxhdGl2ZSBhbW91bnQgb2YgdGltZSB0aGF0IGhhc24ndCBiZWVuIHNpbXVsYXRlZCB5ZXQsIGRpdmlkZWRcbiAgICAgKiAgIGJ5IHRoZSBhbW91bnQgb2YgdGltZSB0aGF0IHdpbGwgYmUgc2ltdWxhdGVkIHRoZSBuZXh0IHRpbWUgdXBkYXRlKClcbiAgICAgKiAgIHJ1bnMuIFVzZWZ1bCBmb3IgaW50ZXJwb2xhdGluZyBmcmFtZXMuXG4gICAgICovXG4gICAgc2V0RHJhdzogZnVuY3Rpb24oZnVuKSB7XG4gICAgICAgIGRyYXcgPSBmdW4gfHwgZHJhdztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGZ1bmN0aW9uIHRoYXQgcnVucyBhdCB0aGUgZW5kIG9mIHRoZSBtYWluIGxvb3AuXG4gICAgICpcbiAgICAgKiBVbmxpa2Uge0BsaW5rICNzZXRVcGRhdGUgdXBkYXRlfSgpLCB3aGljaCBjYW4gcnVuIHplcm8gb3IgbW9yZSB0aW1lcyBwZXJcbiAgICAgKiBmcmFtZSwgZW5kKCkgYWx3YXlzIHJ1bnMgZXhhY3RseSBvbmNlIHBlciBmcmFtZS4gVGhpcyBtYWtlcyBpdCB1c2VmdWxcbiAgICAgKiBmb3IgYW55IHVwZGF0ZXMgdGhhdCBhcmUgbm90IGRlcGVuZGVudCBvbiB0aW1lIGluIHRoZSBzaW11bGF0aW9uLlxuICAgICAqIEV4YW1wbGVzIGluY2x1ZGUgY2xlYW5pbmcgdXAgYW55IHRlbXBvcmFyeSBzdGF0ZSBzZXQgdXAgYnlcbiAgICAgKiB7QGxpbmsgI3NldEJlZ2luIGJlZ2lufSgpLCBsb3dlcmluZyB0aGUgdmlzdWFsIHF1YWxpdHkgaWYgdGhlIGZyYW1lIHJhdGVcbiAgICAgKiBpcyB0b28gbG93LCBvciBwZXJmb3JtaW5nIGxvbmctcnVubmluZyB1cGRhdGVzIGluY3JlbWVudGFsbHkuIENvbXBhcmVkXG4gICAgICogdG8gYmVnaW4oKSwgZ2VuZXJhbGx5IGFjdGlvbnMgc2hvdWxkIG9jY3VyIGluIGVuZCgpIGlmIHRoZXkgdXNlIGFueXRoaW5nXG4gICAgICogdGhhdCB1cGRhdGUoKSBvciB7QGxpbmsgI3NldERyYXcgZHJhd30oKSBhZmZlY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBlbmRcbiAgICAgKiAgIFRoZSBlbmQoKSBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2VuZC5mcHNdXG4gICAgICogICBUaGUgZXhwb25lbnRpYWwgbW92aW5nIGF2ZXJhZ2Ugb2YgdGhlIGZyYW1lcyBwZXIgc2Vjb25kLiBUaGlzIGlzIHRoZVxuICAgICAqICAgc2FtZSB2YWx1ZSByZXR1cm5lZCBieSBgTWFpbkxvb3AuZ2V0RlBTKClgLiBJdCBjYW4gYmUgdXNlZCB0byB0YWtlXG4gICAgICogICBhY3Rpb24gd2hlbiB0aGUgRlBTIGlzIHRvbyBsb3cgKG9yIHRvIHJlc3RvcmUgdG8gbm9ybWFsY3kgaWYgdGhlIEZQU1xuICAgICAqICAgbW92ZXMgYmFjayB1cCkuIEV4YW1wbGVzIG9mIGFjdGlvbnMgdG8gdGFrZSBpZiB0aGUgRlBTIGlzIHRvbyBsb3dcbiAgICAgKiAgIGluY2x1ZGUgZXhpdGluZyB0aGUgYXBwbGljYXRpb24sIGxvd2VyaW5nIHRoZSB2aXN1YWwgcXVhbGl0eSwgc3RvcHBpbmdcbiAgICAgKiAgIG9yIHJlZHVjaW5nIGFjdGl2aXRpZXMgb3V0c2lkZSBvZiB0aGUgbWFpbiBsb29wIGxpa2UgZXZlbnQgaGFuZGxlcnMgb3JcbiAgICAgKiAgIGF1ZGlvIHBsYXliYWNrLCBwZXJmb3JtaW5nIG5vbi1jcml0aWNhbCB1cGRhdGVzIGxlc3MgZnJlcXVlbnRseSwgb3JcbiAgICAgKiAgIGluY3JlYXNpbmcgdGhlIHNpbXVsYXRpb24gdGltZXN0ZXAgKGJ5IGNhbGxpbmdcbiAgICAgKiAgIGBNYWluTG9vcC5zZXRTaW11bGF0aW9uVGltZXN0ZXAoKWApLiBOb3RlIHRoYXQgdGhpcyBsYXN0IG9wdGlvblxuICAgICAqICAgcmVzdWx0cyBpbiBtb3JlIHRpbWUgYmVpbmcgc2ltdWxhdGVkIHBlciB1cGRhdGUoKSBjYWxsLCB3aGljaCBjYXVzZXNcbiAgICAgKiAgIHRoZSBhcHBsaWNhdGlvbiB0byBiZWhhdmUgbm9uLWRldGVybWluaXN0aWNhbGx5LlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2VuZC5wYW5pYz1mYWxzZV1cbiAgICAgKiAgIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzaW11bGF0aW9uIGhhcyBmYWxsZW4gdG9vIGZhciBiZWhpbmQgcmVhbCB0aW1lLlxuICAgICAqICAgU3BlY2lmaWNhbGx5LCBgcGFuaWNgIHdpbGwgYmUgYHRydWVgIGlmIHRvbyBtYW55IHVwZGF0ZXMgb2NjdXJyZWQgaW5cbiAgICAgKiAgIG9uZSBmcmFtZS4gSW4gbmV0d29ya2VkIGxvY2tzdGVwIGFwcGxpY2F0aW9ucywgdGhlIGFwcGxpY2F0aW9uIHNob3VsZFxuICAgICAqICAgd2FpdCBmb3Igc29tZSBhbW91bnQgb2YgdGltZSB0byBzZWUgaWYgdGhlIHVzZXIgY2FuIGNhdGNoIHVwIGJlZm9yZVxuICAgICAqICAgZHJvcHBpbmcgdGhlIHVzZXIuIEluIG5ldHdvcmtlZCBidXQgbm9uLWxvY2tzdGVwIGFwcGxpY2F0aW9ucywgdGhpc1xuICAgICAqICAgdHlwaWNhbGx5IGluZGljYXRlcyB0aGF0IHRoZSB1c2VyIG5lZWRzIHRvIGJlIHNuYXBwZWQgb3IgZWFzZWQgdG8gdGhlXG4gICAgICogICBjdXJyZW50IGF1dGhvcml0YXRpdmUgc3RhdGUuIFdoZW4gdGhpcyBoYXBwZW5zLCBpdCBtYXkgYmUgY29udmVuaWVudFxuICAgICAqICAgdG8gY2FsbCBgTWFpbkxvb3AucmVzZXRGcmFtZURlbHRhKClgIHRvIGRpc2NhcmQgYWNjdW11bGF0ZWQgcGVuZGluZ1xuICAgICAqICAgdXBkYXRlcy4gSW4gbm9uLW5ldHdvcmtlZCBhcHBsaWNhdGlvbnMsIGl0IG1heSBiZSBhY2NlcHRhYmxlIHRvIGFsbG93XG4gICAgICogICB0aGUgYXBwbGljYXRpb24gdG8ga2VlcCBydW5uaW5nIGZvciBhd2hpbGUgdG8gc2VlIGlmIGl0IHdpbGwgY2F0Y2ggdXAuXG4gICAgICogICBIb3dldmVyLCB0aGlzIGNvdWxkIGFsc28gY2F1c2UgdGhlIGFwcGxpY2F0aW9uIHRvIGxvb2sgbGlrZSBpdCBpc1xuICAgICAqICAgcnVubmluZyB2ZXJ5IHF1aWNrbHkgZm9yIGEgZmV3IGZyYW1lcyBhcyBpdCB0cmFuc2l0aW9ucyB0aHJvdWdoIHRoZVxuICAgICAqICAgaW50ZXJtZWRpYXRlIHN0YXRlcy4gQW4gYWx0ZXJuYXRpdmUgdGhhdCBtYXkgYmUgYWNjZXB0YWJsZSBpcyB0b1xuICAgICAqICAgc2ltcGx5IGlnbm9yZSB0aGUgdW5zaW11bGF0ZWQgZWxhcHNlZCB0aW1lIGJ5IGNhbGxpbmdcbiAgICAgKiAgIGBNYWluTG9vcC5yZXNldEZyYW1lRGVsdGEoKWAgZXZlbiB0aG91Z2ggdGhpcyBpbnRyb2R1Y2VzXG4gICAgICogICBub24tZGV0ZXJtaW5pc3RpYyBiZWhhdmlvci4gSW4gYWxsIGNhc2VzLCBpZiB0aGUgYXBwbGljYXRpb24gcGFuaWNzXG4gICAgICogICBmcmVxdWVudGx5LCB0aGlzIGlzIGFuIGluZGljYXRpb24gdGhhdCB0aGUgbWFpbiBsb29wIGlzIHJ1bm5pbmcgdG9vXG4gICAgICogICBzbG93bHkuIEhvd2V2ZXIsIG1vc3Qgb2YgdGhlIHRpbWUgdGhlIGRyb3AgaW4gZnJhbWUgcmF0ZSB3aWxsIHByb2JhYmx5XG4gICAgICogICBiZSBub3RpY2VhYmxlIGJlZm9yZSBhIHBhbmljIG9jY3Vycy4gVG8gaGVscCB0aGUgYXBwbGljYXRpb24gY2F0Y2ggdXBcbiAgICAgKiAgIGFmdGVyIGEgcGFuaWMgY2F1c2VkIGJ5IGEgc3BpcmFsIG9mIGRlYXRoLCB0aGUgc2FtZSBzdGVwcyBjYW4gYmUgdGFrZW5cbiAgICAgKiAgIHRoYXQgYXJlIHN1Z2dlc3RlZCBhYm92ZSBpZiB0aGUgRlBTIGRyb3BzIHRvbyBsb3cuXG4gICAgICovXG4gICAgc2V0RW5kOiBmdW5jdGlvbihmdW4pIHtcbiAgICAgICAgZW5kID0gZnVuIHx8IGVuZDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyB0aGUgbWFpbiBsb29wLlxuICAgICAqXG4gICAgICogTm90ZSB0aGF0IHRoZSBhcHBsaWNhdGlvbiBpcyBub3QgY29uc2lkZXJlZCBcInJ1bm5pbmdcIiBpbW1lZGlhdGVseSBhZnRlclxuICAgICAqIHRoaXMgZnVuY3Rpb24gcmV0dXJuczsgcmF0aGVyLCBpdCBpcyBjb25zaWRlcmVkIFwicnVubmluZ1wiIGFmdGVyIHRoZVxuICAgICAqIGFwcGxpY2F0aW9uIGRyYXdzIGl0cyBmaXJzdCBmcmFtZS4gVGhlIGRpc3RpbmN0aW9uIGlzIHRoYXQgZXZlbnRcbiAgICAgKiBoYW5kbGVycyBzaG91bGQgcmVtYWluIHBhdXNlZCB1bnRpbCB0aGUgYXBwbGljYXRpb24gaXMgcnVubmluZywgZXZlblxuICAgICAqIGFmdGVyIGBNYWluTG9vcC5zdGFydCgpYCBpcyBjYWxsZWQuIENoZWNrIGBNYWluTG9vcC5pc1J1bm5pbmcoKWAgZm9yIHRoZVxuICAgICAqIGN1cnJlbnQgc3RhdHVzLiBUbyBhY3QgYWZ0ZXIgdGhlIGFwcGxpY2F0aW9uIHN0YXJ0cywgcmVnaXN0ZXIgYSBjYWxsYmFja1xuICAgICAqIHdpdGggcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCkgYWZ0ZXIgY2FsbGluZyB0aGlzIGZ1bmN0aW9uIGFuZCBleGVjdXRlIHRoZVxuICAgICAqIGFjdGlvbiBpbiB0aGF0IGNhbGxiYWNrLiBJdCBpcyBzYWZlIHRvIGNhbGwgYE1haW5Mb29wLnN0YXJ0KClgIG11bHRpcGxlXG4gICAgICogdGltZXMgZXZlbiBiZWZvcmUgdGhlIGFwcGxpY2F0aW9uIHN0YXJ0cyBydW5uaW5nIGFuZCB3aXRob3V0IGNhbGxpbmdcbiAgICAgKiBgTWFpbkxvb3Auc3RvcCgpYCBpbiBiZXR3ZWVuLCBhbHRob3VnaCB0aGVyZSBpcyBubyByZWFzb24gdG8gZG8gdGhpcztcbiAgICAgKiB0aGUgbWFpbiBsb29wIHdpbGwgb25seSBzdGFydCBpZiBpdCBpcyBub3QgYWxyZWFkeSBzdGFydGVkLlxuICAgICAqXG4gICAgICogU2VlIGFsc28gYE1haW5Mb29wLnN0b3AoKWAuXG4gICAgICovXG4gICAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBhcHBsaWNhdGlvbiBkb2Vzbid0IHN0YXJ0IHJ1bm5pbmcgaW1tZWRpYXRlbHksIHRyYWNrXG4gICAgICAgICAgICAvLyB3aGV0aGVyIHRoaXMgZnVuY3Rpb24gd2FzIGNhbGxlZCBhbmQgdXNlIHRoYXQgdG8ga2VlcCBpdCBmcm9tXG4gICAgICAgICAgICAvLyBzdGFydGluZyB0aGUgbWFpbiBsb29wIG11bHRpcGxlIHRpbWVzLlxuICAgICAgICAgICAgc3RhcnRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIEluIHRoZSBtYWluIGxvb3AsIGRyYXcoKSBpcyBjYWxsZWQgYWZ0ZXIgdXBkYXRlKCksIHNvIGlmIHdlXG4gICAgICAgICAgICAvLyBlbnRlcmVkIHRoZSBtYWluIGxvb3AgaW1tZWRpYXRlbHksIHdlIHdvdWxkIG5ldmVyIHJlbmRlciB0aGVcbiAgICAgICAgICAgIC8vIGluaXRpYWwgc3RhdGUgYmVmb3JlIGFueSB1cGRhdGVzIG9jY3VyLiBJbnN0ZWFkLCB3ZSBydW4gb25lXG4gICAgICAgICAgICAvLyBmcmFtZSB3aGVyZSBhbGwgd2UgZG8gaXMgZHJhdywgYW5kIHRoZW4gc3RhcnQgdGhlIG1haW4gbG9vcCB3aXRoXG4gICAgICAgICAgICAvLyB0aGUgbmV4dCBmcmFtZS5cbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbih0aW1lc3RhbXApIHtcbiAgICAgICAgICAgICAgICAvLyBSZW5kZXIgdGhlIGluaXRpYWwgc3RhdGUgYmVmb3JlIGFueSB1cGRhdGVzIG9jY3VyLlxuICAgICAgICAgICAgICAgIGRyYXcoMSk7XG5cbiAgICAgICAgICAgICAgICAvLyBUaGUgYXBwbGljYXRpb24gaXNuJ3QgY29uc2lkZXJlZCBcInJ1bm5pbmdcIiB1bnRpbCB0aGVcbiAgICAgICAgICAgICAgICAvLyBhcHBsaWNhdGlvbiBzdGFydHMgZHJhd2luZy5cbiAgICAgICAgICAgICAgICBydW5uaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIC8vIFJlc2V0IHZhcmlhYmxlcyB0aGF0IGFyZSB1c2VkIGZvciB0cmFja2luZyB0aW1lIHNvIHRoYXQgd2VcbiAgICAgICAgICAgICAgICAvLyBkb24ndCBzaW11bGF0ZSB0aW1lIHBhc3NlZCB3aGlsZSB0aGUgYXBwbGljYXRpb24gd2FzIHBhdXNlZC5cbiAgICAgICAgICAgICAgICBsYXN0RnJhbWVUaW1lTXMgPSB0aW1lc3RhbXA7XG4gICAgICAgICAgICAgICAgbGFzdEZwc1VwZGF0ZSA9IHRpbWVzdGFtcDtcbiAgICAgICAgICAgICAgICBmcmFtZXNUaGlzU2Vjb25kID0gMDtcblxuICAgICAgICAgICAgICAgIC8vIFN0YXJ0IHRoZSBtYWluIGxvb3AuXG4gICAgICAgICAgICAgICAgcmFmSGFuZGxlID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0b3BzIHRoZSBtYWluIGxvb3AuXG4gICAgICpcbiAgICAgKiBFdmVudCBoYW5kbGluZyBhbmQgb3RoZXIgYmFja2dyb3VuZCB0YXNrcyBzaG91bGQgYWxzbyBiZSBwYXVzZWQgd2hlbiB0aGVcbiAgICAgKiBtYWluIGxvb3AgaXMgcGF1c2VkLlxuICAgICAqXG4gICAgICogTm90ZSB0aGF0IHBhdXNpbmcgaW4gbXVsdGlwbGF5ZXIvbXVsdGktdXNlciBhcHBsaWNhdGlvbnMgd2lsbCBjYXVzZSB0aGVcbiAgICAgKiBwbGF5ZXIncy91c2VyJ3MgY2xpZW50IHRvIGJlY29tZSBvdXQgb2Ygc3luYy4gSW4gdGhpcyBjYXNlIHRoZVxuICAgICAqIHNpbXVsYXRpb24gc2hvdWxkIGV4aXQsIG9yIHRoZSBwbGF5ZXIvdXNlciBuZWVkcyB0byBiZSBzbmFwcGVkIHRvIHRoZWlyXG4gICAgICogdXBkYXRlZCBwb3NpdGlvbiB3aGVuIHRoZSBtYWluIGxvb3AgaXMgc3RhcnRlZCBhZ2Fpbi5cbiAgICAgKlxuICAgICAqIFNlZSBhbHNvIGBNYWluTG9vcC5zdGFydCgpYCBhbmQgYE1haW5Mb29wLmlzUnVubmluZygpYC5cbiAgICAgKi9cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgICAgICBzdGFydGVkID0gZmFsc2U7XG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJhZkhhbmRsZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgdGhlIG1haW4gbG9vcCBpcyBjdXJyZW50bHkgcnVubmluZy5cbiAgICAgKlxuICAgICAqIFNlZSBhbHNvIGBNYWluTG9vcC5zdGFydCgpYCBhbmQgYE1haW5Mb29wLnN0b3AoKWAuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqICAgV2hldGhlciB0aGUgbWFpbiBsb29wIGlzIGN1cnJlbnRseSBydW5uaW5nLlxuICAgICAqL1xuICAgIGlzUnVubmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBydW5uaW5nO1xuICAgIH0sXG59O1xuXG4vKipcbiAqIFRoZSBtYWluIGxvb3AgdGhhdCBydW5zIHVwZGF0ZXMgYW5kIHJlbmRlcmluZy5cbiAqXG4gKiBAcGFyYW0ge0RPTUhpZ2hSZXNUaW1lU3RhbXB9IHRpbWVzdGFtcFxuICogICBUaGUgY3VycmVudCB0aW1lc3RhbXAuIEluIHByYWN0aWNlIHRoaXMgaXMgc3VwcGxpZWQgYnlcbiAqICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGF0IHRoZSB0aW1lIHRoYXQgaXQgc3RhcnRzIHRvIGZpcmUgY2FsbGJhY2tzLiBUaGlzXG4gKiAgIHNob3VsZCBvbmx5IGJlIHVzZWQgZm9yIGNvbXBhcmlzb24gdG8gb3RoZXIgdGltZXN0YW1wcyBiZWNhdXNlIHRoZSBlcG9jaFxuICogICAoaS5lLiB0aGUgXCJ6ZXJvXCIgdGltZSkgZGVwZW5kcyBvbiB0aGUgZW5naW5lIHJ1bm5pbmcgdGhpcyBjb2RlLiBJbiBlbmdpbmVzXG4gKiAgIHRoYXQgc3VwcG9ydCBgRE9NSGlnaFJlc1RpbWVTdGFtcGAgKGFsbCBtb2Rlcm4gYnJvd3NlcnMgZXhjZXB0IGlPUyBTYWZhcmlcbiAqICAgOCkgdGhlIGVwb2NoIGlzIHRoZSB0aW1lIHRoZSBwYWdlIHN0YXJ0ZWQgbG9hZGluZywgc3BlY2lmaWNhbGx5XG4gKiAgIGBwZXJmb3JtYW5jZS50aW1pbmcubmF2aWdhdGlvblN0YXJ0YC4gRXZlcnl3aGVyZSBlbHNlLCBpbmNsdWRpbmcgbm9kZS5qcyxcbiAqICAgdGhlIGVwb2NoIGlzIHRoZSBVbml4IGVwb2NoICgxOTcwLTAxLTAxVDAwOjAwOjAwWikuXG4gKlxuICogQGlnbm9yZVxuICovXG5mdW5jdGlvbiBhbmltYXRlKHRpbWVzdGFtcCkge1xuICAgIC8vIFRocm90dGxlIHRoZSBmcmFtZSByYXRlIChpZiBtaW5GcmFtZURlbGF5IGlzIHNldCB0byBhIG5vbi16ZXJvIHZhbHVlIGJ5XG4gICAgLy8gYE1haW5Mb29wLnNldE1heEFsbG93ZWRGUFMoKWApLlxuICAgIGlmICh0aW1lc3RhbXAgPCBsYXN0RnJhbWVUaW1lTXMgKyBtaW5GcmFtZURlbGF5KSB7XG4gICAgICAgIC8vIFJ1biB0aGUgbG9vcCBhZ2FpbiB0aGUgbmV4dCB0aW1lIHRoZSBicm93c2VyIGlzIHJlYWR5IHRvIHJlbmRlci5cbiAgICAgICAgcmFmSGFuZGxlID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZnJhbWVEZWx0YSBpcyB0aGUgY3VtdWxhdGl2ZSBhbW91bnQgb2YgaW4tYXBwIHRpbWUgdGhhdCBoYXNuJ3QgYmVlblxuICAgIC8vIHNpbXVsYXRlZCB5ZXQuIEFkZCB0aGUgdGltZSBzaW5jZSB0aGUgbGFzdCBmcmFtZS4gV2UgbmVlZCB0byB0cmFjayB0b3RhbFxuICAgIC8vIG5vdC15ZXQtc2ltdWxhdGVkIHRpbWUgKGFzIG9wcG9zZWQgdG8ganVzdCB0aGUgdGltZSBlbGFwc2VkIHNpbmNlIHRoZVxuICAgIC8vIGxhc3QgZnJhbWUpIGJlY2F1c2Ugbm90IGFsbCBhY3R1YWxseSBlbGFwc2VkIHRpbWUgaXMgZ3VhcmFudGVlZCB0byBiZVxuICAgIC8vIHNpbXVsYXRlZCBlYWNoIGZyYW1lLiBTZWUgdGhlIGNvbW1lbnRzIGJlbG93IGZvciBkZXRhaWxzLlxuICAgIGZyYW1lRGVsdGEgKz0gdGltZXN0YW1wIC0gbGFzdEZyYW1lVGltZU1zO1xuICAgIGxhc3RGcmFtZVRpbWVNcyA9IHRpbWVzdGFtcDtcblxuICAgIC8vIFJ1biBhbnkgdXBkYXRlcyB0aGF0IGFyZSBub3QgZGVwZW5kZW50IG9uIHRpbWUgaW4gdGhlIHNpbXVsYXRpb24uIFNlZVxuICAgIC8vIGBNYWluTG9vcC5zZXRCZWdpbigpYCBmb3IgYWRkaXRpb25hbCBkZXRhaWxzIG9uIGhvdyB0byB1c2UgdGhpcy5cbiAgICBiZWdpbih0aW1lc3RhbXAsIGZyYW1lRGVsdGEpO1xuXG4gICAgLy8gVXBkYXRlIHRoZSBlc3RpbWF0ZSBvZiB0aGUgZnJhbWUgcmF0ZSwgYGZwc2AuIEV2ZXJ5IHNlY29uZCwgdGhlIG51bWJlclxuICAgIC8vIG9mIGZyYW1lcyB0aGF0IG9jY3VycmVkIGluIHRoYXQgc2Vjb25kIGFyZSBpbmNsdWRlZCBpbiBhbiBleHBvbmVudGlhbFxuICAgIC8vIG1vdmluZyBhdmVyYWdlIG9mIGFsbCBmcmFtZXMgcGVyIHNlY29uZCwgd2l0aCBhbiBhbHBoYSBvZiAwLjI1LiBUaGlzXG4gICAgLy8gbWVhbnMgdGhhdCBtb3JlIHJlY2VudCBzZWNvbmRzIGFmZmVjdCB0aGUgZXN0aW1hdGVkIGZyYW1lIHJhdGUgbW9yZSB0aGFuXG4gICAgLy8gb2xkZXIgc2Vjb25kcy5cbiAgICBpZiAodGltZXN0YW1wID4gbGFzdEZwc1VwZGF0ZSArIDEwMDApIHtcbiAgICAgICAgLy8gQ29tcHV0ZSB0aGUgbmV3IGV4cG9uZW50aWFsIG1vdmluZyBhdmVyYWdlIHdpdGggYW4gYWxwaGEgb2YgMC4yNS5cbiAgICAgICAgLy8gVXNpbmcgY29uc3RhbnRzIGlubGluZSBpcyBva2F5IGhlcmUuXG4gICAgICAgIGZwcyA9IDAuMjUgKiBmcmFtZXNUaGlzU2Vjb25kICsgMC43NSAqIGZwcztcblxuICAgICAgICBsYXN0RnBzVXBkYXRlID0gdGltZXN0YW1wO1xuICAgICAgICBmcmFtZXNUaGlzU2Vjb25kID0gMDtcbiAgICB9XG4gICAgZnJhbWVzVGhpc1NlY29uZCsrO1xuXG4gICAgLypcbiAgICAgKiBBIG5haXZlIHdheSB0byBtb3ZlIGFuIG9iamVjdCBhbG9uZyBpdHMgWC1heGlzIG1pZ2h0IGJlIHRvIHdyaXRlIGEgbWFpblxuICAgICAqIGxvb3AgY29udGFpbmluZyB0aGUgc3RhdGVtZW50IGBvYmoueCArPSAxMDtgIHdoaWNoIHdvdWxkIG1vdmUgdGhlIG9iamVjdFxuICAgICAqIDEwIHVuaXRzIHBlciBmcmFtZS4gVGhpcyBhcHByb2FjaCBzdWZmZXJzIGZyb20gdGhlIGlzc3VlIHRoYXQgaXQgaXNcbiAgICAgKiBkZXBlbmRlbnQgb24gdGhlIGZyYW1lIHJhdGUuIEluIG90aGVyIHdvcmRzLCBpZiB5b3VyIGFwcGxpY2F0aW9uIGlzXG4gICAgICogcnVubmluZyBzbG93bHkgKHRoYXQgaXMsIGZld2VyIGZyYW1lcyBwZXIgc2Vjb25kKSwgeW91ciBvYmplY3Qgd2lsbCBhbHNvXG4gICAgICogYXBwZWFyIHRvIG1vdmUgc2xvd2x5LCB3aGVyZWFzIGlmIHlvdXIgYXBwbGljYXRpb24gaXMgcnVubmluZyBxdWlja2x5XG4gICAgICogKHRoYXQgaXMsIG1vcmUgZnJhbWVzIHBlciBzZWNvbmQpLCB5b3VyIG9iamVjdCB3aWxsIGFwcGVhciB0byBtb3ZlXG4gICAgICogcXVpY2tseS4gVGhpcyBpcyB1bmRlc2lyYWJsZSwgZXNwZWNpYWxseSBpbiBtdWx0aXBsYXllci9tdWx0aS11c2VyXG4gICAgICogYXBwbGljYXRpb25zLlxuICAgICAqXG4gICAgICogT25lIHNvbHV0aW9uIGlzIHRvIG11bHRpcGx5IHRoZSBzcGVlZCBieSB0aGUgYW1vdW50IG9mIHRpbWUgdGhhdCBoYXNcbiAgICAgKiBwYXNzZWQgYmV0d2VlbiByZW5kZXJpbmcgZnJhbWVzLiBGb3IgZXhhbXBsZSwgaWYgeW91IHdhbnQgeW91ciBvYmplY3QgdG9cbiAgICAgKiBtb3ZlIDYwMCB1bml0cyBwZXIgc2Vjb25kLCB5b3UgbWlnaHQgd3JpdGUgYG9iai54ICs9IDYwMCAqIGRlbHRhYCwgd2hlcmVcbiAgICAgKiBgZGVsdGFgIGlzIHRoZSB0aW1lIHBhc3NlZCBzaW5jZSB0aGUgbGFzdCBmcmFtZS4gKEZvciBjb252ZW5pZW5jZSwgbGV0J3NcbiAgICAgKiBtb3ZlIHRoaXMgc3RhdGVtZW50IHRvIGFuIHVwZGF0ZSgpIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYGRlbHRhYCBhcyBhXG4gICAgICogcGFyYW1ldGVyLikgVGhpcyB3YXksIHlvdXIgb2JqZWN0IHdpbGwgbW92ZSBhIGNvbnN0YW50IGRpc3RhbmNlIG92ZXJcbiAgICAgKiB0aW1lLiBIb3dldmVyLCBhdCBsb3cgZnJhbWUgcmF0ZXMgYW5kIGhpZ2ggc3BlZWRzLCB5b3VyIG9iamVjdCB3aWxsIG1vdmVcbiAgICAgKiBsYXJnZSBkaXN0YW5jZXMgZXZlcnkgZnJhbWUsIHdoaWNoIGNhbiBjYXVzZSBpdCB0byBkbyBzdHJhbmdlIHRoaW5nc1xuICAgICAqIHN1Y2ggYXMgbW92ZSB0aHJvdWdoIHdhbGxzLiBBZGRpdGlvbmFsbHksIHdlIHdvdWxkIGxpa2Ugb3VyIHByb2dyYW0gdG9cbiAgICAgKiBiZSBkZXRlcm1pbmlzdGljLiBUaGF0IGlzLCBldmVyeSB0aW1lIHdlIHJ1biB0aGUgYXBwbGljYXRpb24gd2l0aCB0aGVcbiAgICAgKiBzYW1lIGlucHV0LCB3ZSB3b3VsZCBsaWtlIGV4YWN0bHkgdGhlIHNhbWUgb3V0cHV0LiBJZiB0aGUgdGltZSBiZXR3ZWVuXG4gICAgICogZnJhbWVzICh0aGUgYGRlbHRhYCkgdmFyaWVzLCBvdXIgb3V0cHV0IHdpbGwgZGl2ZXJnZSB0aGUgbG9uZ2VyIHRoZVxuICAgICAqIHByb2dyYW0gcnVucyBkdWUgdG8gYWNjdW11bGF0ZWQgcm91bmRpbmcgZXJyb3JzLCBldmVuIGF0IG5vcm1hbCBmcmFtZVxuICAgICAqIHJhdGVzLiBBbHNvLCBpZiB0aGUgYW1vdW50IG9mIHRpbWUgc3BlbnQgc2ltdWxhdGluZyBpcyBjb25zaXN0ZW50bHlcbiAgICAgKiBsb25nZXIgdGhhbiB0aGUgYW1vdW50IG9mIHRpbWUgYmV0d2VlbiBmcmFtZXMsIHRoZSBhcHBsaWNhdGlvbiB3aWxsXG4gICAgICogZnJlZXplIGFuZCBjcmFzaCBpbiBhIHNwaXJhbCBvZiBkZWF0aC5cbiAgICAgKlxuICAgICAqIEEgYmV0dGVyIHNvbHV0aW9uIGlzIHRvIHNlcGFyYXRlIHRoZSBhbW91bnQgb2YgdGltZSBzaW11bGF0ZWQgaW4gZWFjaFxuICAgICAqIHVwZGF0ZSgpIGZyb20gdGhlIGFtb3VudCBvZiB0aW1lIGJldHdlZW4gZnJhbWVzLiBPdXIgdXBkYXRlKCkgZnVuY3Rpb25cbiAgICAgKiBkb2Vzbid0IG5lZWQgdG8gY2hhbmdlOyB3ZSBqdXN0IG5lZWQgdG8gY2hhbmdlIHRoZSBkZWx0YSB3ZSBwYXNzIHRvIGl0XG4gICAgICogc28gdGhhdCBlYWNoIHVwZGF0ZSgpIHNpbXVsYXRlcyBhIGZpeGVkIGFtb3VudCBvZiB0aW1lICh0aGF0IGlzLCBgZGVsdGFgXG4gICAgICogc2hvdWxkIGhhdmUgdGhlIHNhbWUgdmFsdWUgZWFjaCB0aW1lIHVwZGF0ZSgpIGlzIGNhbGxlZCkuIFRoZSB1cGRhdGUoKVxuICAgICAqIGZ1bmN0aW9uIGNhbiBiZSBydW4gbXVsdGlwbGUgdGltZXMgcGVyIGZyYW1lIGlmIG5lZWRlZCB0byBzaW11bGF0ZSB0aGVcbiAgICAgKiB0b3RhbCBhbW91bnQgb2YgdGltZSBwYXNzZWQgc2luY2UgdGhlIGxhc3QgZnJhbWUuIChJZiB0aGUgdGltZSB0aGF0IGhhc1xuICAgICAqIHBhc3NlZCBzaW5jZSB0aGUgbGFzdCBmcmFtZSBpcyBsZXNzIHRoYW4gdGhlIGZpeGVkIHNpbXVsYXRpb24gdGltZSwgd2VcbiAgICAgKiBqdXN0IHdvbid0IHJ1biBhbiB1cGRhdGUoKSB1bnRpbCB0aGUgdGhlIG5leHQgZnJhbWUuKSBUaGlzIGFwcHJvYWNoXG4gICAgICogYXZvaWRzIGluY29uc2lzdGVudCByb3VuZGluZyBlcnJvcnMgYW5kIGVuc3VyZXMgdGhhdCB0aGVyZSBhcmUgbm8gZ2lhbnRcbiAgICAgKiBsZWFwcyB0aHJvdWdoIHdhbGxzIGJldHdlZW4gZnJhbWVzLiBJdCBhbHNvIGF2b2lkcyB0aGUgc3BpcmFsIG9mIGRlYXRoXG4gICAgICogYXMgbG9uZyBhcyB0aGUgZml4ZWQgc2ltdWxhdGlvbiB0aW1lIGlzIHNldCB0byBhIHZhbHVlIHRoYXQgaXMgaGlnaFxuICAgICAqIGVub3VnaCB0aGF0IHVwZGF0ZSgpIGNhbGxzIHVzdWFsbHkgdGFrZSBsZXNzIHRpbWUgdGhhbiB0aGUgYW1vdW50IG9mXG4gICAgICogdGltZSB0aGV5J3JlIHNpbXVsYXRpbmcuIFNlZSBgTWFpbkxvb3Auc2V0TWF4VXBkYXRlc1BlckRyYXcoKWAgYW5kXG4gICAgICogYE1haW5Mb29wLnNldEVuZCgpYCBmb3IgZGlzY3Vzc2lvbnMgb2Ygb3RoZXIgd2F5cyB0byBhdm9pZCB0aGUgc3BpcmFsIG9mXG4gICAgICogZGVhdGguXG4gICAgICpcbiAgICAgKiBUaGF0IGlzIHdoYXQgaXMgZG9uZSBiZWxvdy5cbiAgICAgKlxuICAgICAqIFNlZSBgTWFpbkxvb3Auc2V0VXBkYXRlKClgIGZvciBhIGRpc2N1c3Npb24gb2YgcGVyZm9ybWFuY2VcbiAgICAgKiBjb25zaWRlcmF0aW9ucy5cbiAgICAgKlxuICAgICAqIEFkZGl0aW9uYWwgcmVhZGluZyBmb3IgdGhvc2UgaW50ZXJlc3RlZDpcbiAgICAgKlxuICAgICAqIC0gaHR0cDovL2dhbWVwcm9ncmFtbWluZ3BhdHRlcm5zLmNvbS9nYW1lLWxvb3AuaHRtbFxuICAgICAqIC0gaHR0cDovL2dhZmZlcm9uZ2FtZXMuY29tL2dhbWUtcGh5c2ljcy9maXgteW91ci10aW1lc3RlcC9cbiAgICAgKiAtIGh0dHBzOi8vZ2FtZWFsY2hlbWlzdC53b3JkcHJlc3MuY29tLzIwMTMvMDMvMTYvdGhvdWdodHMtb24tdGhlLWphdmFzY3JpcHQtZ2FtZS1sb29wL1xuICAgICAqIC0gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9HYW1lcy9BbmF0b215XG4gICAgICovXG4gICAgbnVtVXBkYXRlU3RlcHMgPSAwO1xuICAgIHdoaWxlIChmcmFtZURlbHRhID49IHNpbXVsYXRpb25UaW1lc3RlcCkge1xuICAgICAgICB1cGRhdGUoc2ltdWxhdGlvblRpbWVzdGVwKTtcbiAgICAgICAgZnJhbWVEZWx0YSAtPSBzaW11bGF0aW9uVGltZXN0ZXA7XG5cbiAgICAgICAgLypcbiAgICAgICAgICogU2FuaXR5IGNoZWNrOiBiYWlsIGlmIHdlIHJ1biB0aGUgbG9vcCB0b28gbWFueSB0aW1lcy5cbiAgICAgICAgICpcbiAgICAgICAgICogT25lIHdheSB0aGlzIGNvdWxkIGhhcHBlbiBpcyBpZiB1cGRhdGUoKSB0YWtlcyBsb25nZXIgdG8gcnVuIHRoYW5cbiAgICAgICAgICogdGhlIHRpbWUgaXQgc2ltdWxhdGVzLCB0aGVyZWJ5IGNhdXNpbmcgYSBzcGlyYWwgb2YgZGVhdGguIEZvciB3YXlzXG4gICAgICAgICAqIHRvIGF2b2lkIHRoaXMsIHNlZSBgTWFpbkxvb3Auc2V0RW5kKClgLiBBbm90aGVyIHdheSB0aGlzIGNvdWxkXG4gICAgICAgICAqIGhhcHBlbiBpcyBpZiB0aGUgYnJvd3NlciB0aHJvdHRsZXMgc2VydmluZyBmcmFtZXMsIHdoaWNoIHR5cGljYWxseVxuICAgICAgICAgKiBvY2N1cnMgd2hlbiB0aGUgdGFiIGlzIGluIHRoZSBiYWNrZ3JvdW5kIG9yIHRoZSBkZXZpY2UgYmF0dGVyeSBpc1xuICAgICAgICAgKiBsb3cuIEFuIGV2ZW50IG91dHNpZGUgb2YgdGhlIG1haW4gbG9vcCBzdWNoIGFzIGF1ZGlvIHByb2Nlc3Npbmcgb3JcbiAgICAgICAgICogc3luY2hyb25vdXMgcmVzb3VyY2UgcmVhZHMgY291bGQgYWxzbyBjYXVzZSB0aGUgYXBwbGljYXRpb24gdG8gaGFuZ1xuICAgICAgICAgKiB0ZW1wb3JhcmlseSBhbmQgYWNjdW11bGF0ZSBub3QteWV0LXNpbXVsYXRlZCB0aW1lIGFzIGEgcmVzdWx0LlxuICAgICAgICAgKlxuICAgICAgICAgKiAyNDAgaXMgY2hvc2VuIGJlY2F1c2UsIGZvciBhbnkgc2FuZSB2YWx1ZSBvZiBzaW11bGF0aW9uVGltZXN0ZXAsIDI0MFxuICAgICAgICAgKiB1cGRhdGVzIHdpbGwgc2ltdWxhdGUgYXQgbGVhc3Qgb25lIHNlY29uZCwgYW5kIGl0IHdpbGwgc2ltdWxhdGUgZm91clxuICAgICAgICAgKiBzZWNvbmRzIHdpdGggdGhlIGRlZmF1bHQgdmFsdWUgb2Ygc2ltdWxhdGlvblRpbWVzdGVwLiAoU2FmYXJpXG4gICAgICAgICAqIG5vdGlmaWVzIHVzZXJzIHRoYXQgdGhlIHNjcmlwdCBpcyB0YWtpbmcgdG9vIGxvbmcgdG8gcnVuIGlmIGl0IHRha2VzXG4gICAgICAgICAqIG1vcmUgdGhhbiBmaXZlIHNlY29uZHMuKVxuICAgICAgICAgKlxuICAgICAgICAgKiBJZiB0aGVyZSBhcmUgbW9yZSB1cGRhdGVzIHRvIHJ1biBpbiBhIGZyYW1lIHRoYW4gdGhpcywgdGhlXG4gICAgICAgICAqIGFwcGxpY2F0aW9uIHdpbGwgYXBwZWFyIHRvIHNsb3cgZG93biB0byB0aGUgdXNlciB1bnRpbCBpdCBjYXRjaGVzXG4gICAgICAgICAqIGJhY2sgdXAuIEluIG5ldHdvcmtlZCBhcHBsaWNhdGlvbnMgdGhpcyB3aWxsIHVzdWFsbHkgY2F1c2UgdGhlIHVzZXJcbiAgICAgICAgICogdG8gZ2V0IG91dCBvZiBzeW5jIHdpdGggdGhlaXIgcGVlcnMsIGJ1dCBpZiB0aGUgdXBkYXRlcyBhcmUgdGFraW5nXG4gICAgICAgICAqIHRoaXMgbG9uZyBhbHJlYWR5LCB0aGV5J3JlIHByb2JhYmx5IGFscmVhZHkgb3V0IG9mIHN5bmMuXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoKytudW1VcGRhdGVTdGVwcyA+PSAyNDApIHtcbiAgICAgICAgICAgIHBhbmljID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBSZW5kZXIgdGhlIHNjcmVlbi4gV2UgZG8gdGhpcyByZWdhcmRsZXNzIG9mIHdoZXRoZXIgdXBkYXRlKCkgaGFzIHJ1blxuICAgICAqIGR1cmluZyB0aGlzIGZyYW1lIGJlY2F1c2UgaXQgaXMgcG9zc2libGUgdG8gaW50ZXJwb2xhdGUgYmV0d2VlbiB1cGRhdGVzXG4gICAgICogdG8gbWFrZSB0aGUgZnJhbWUgcmF0ZSBhcHBlYXIgZmFzdGVyIHRoYW4gdXBkYXRlcyBhcmUgYWN0dWFsbHlcbiAgICAgKiBoYXBwZW5pbmcuIFNlZSBgTWFpbkxvb3Auc2V0RHJhdygpYCBmb3IgYW4gZXhwbGFuYXRpb24gb2YgaG93IHRvIGRvXG4gICAgICogdGhhdC5cbiAgICAgKlxuICAgICAqIFdlIGRyYXcgYWZ0ZXIgdXBkYXRpbmcgYmVjYXVzZSB3ZSB3YW50IHRoZSBzY3JlZW4gdG8gcmVmbGVjdCBhIHN0YXRlIG9mXG4gICAgICogdGhlIGFwcGxpY2F0aW9uIHRoYXQgaXMgYXMgdXAtdG8tZGF0ZSBhcyBwb3NzaWJsZS4gKGBNYWluTG9vcC5zdGFydCgpYFxuICAgICAqIGRyYXdzIHRoZSB2ZXJ5IGZpcnN0IGZyYW1lIGluIHRoZSBhcHBsaWNhdGlvbidzIGluaXRpYWwgc3RhdGUsIGJlZm9yZVxuICAgICAqIGFueSB1cGRhdGVzIGhhdmUgb2NjdXJyZWQuKSBTb21lIHNvdXJjZXMgc3BlY3VsYXRlIHRoYXQgcmVuZGVyaW5nXG4gICAgICogZWFybGllciBpbiB0aGUgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGNhbGxiYWNrIGNhbiBnZXQgdGhlIHNjcmVlbiBwYWludGVkXG4gICAgICogZmFzdGVyOyB0aGlzIGlzIG1vc3RseSBub3QgdHJ1ZSwgYW5kIGV2ZW4gd2hlbiBpdCBpcywgaXQncyB1c3VhbGx5IGp1c3RcbiAgICAgKiBhIHRyYWRlLW9mZiBiZXR3ZWVuIHJlbmRlcmluZyB0aGUgY3VycmVudCBmcmFtZSBzb29uZXIgYW5kIHJlbmRlcmluZyB0aGVcbiAgICAgKiBuZXh0IGZyYW1lIGxhdGVyLlxuICAgICAqXG4gICAgICogU2VlIGBNYWluTG9vcC5zZXREcmF3KClgIGZvciBkZXRhaWxzIGFib3V0IGRyYXcoKSBpdHNlbGYuXG4gICAgICovXG4gICAgZHJhdyhmcmFtZURlbHRhIC8gc2ltdWxhdGlvblRpbWVzdGVwKTtcblxuICAgIC8vIFJ1biBhbnkgdXBkYXRlcyB0aGF0IGFyZSBub3QgZGVwZW5kZW50IG9uIHRpbWUgaW4gdGhlIHNpbXVsYXRpb24uIFNlZVxuICAgIC8vIGBNYWluTG9vcC5zZXRFbmQoKWAgZm9yIGFkZGl0aW9uYWwgZGV0YWlscyBvbiBob3cgdG8gdXNlIHRoaXMuXG4gICAgZW5kKGZwcywgcGFuaWMpO1xuXG4gICAgcGFuaWMgPSBmYWxzZTtcblxuICAgIC8vIFJ1biB0aGUgbG9vcCBhZ2FpbiB0aGUgbmV4dCB0aW1lIHRoZSBicm93c2VyIGlzIHJlYWR5IHRvIHJlbmRlci5cbiAgICByYWZIYW5kbGUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG59XG5cbi8vIEFNRCBzdXBwb3J0XG5pZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKHJvb3QuTWFpbkxvb3ApO1xufVxuLy8gQ29tbW9uSlMgc3VwcG9ydFxuZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSByb290Lk1haW5Mb29wO1xufVxuXG59KSh0aGlzKTtcbiJdfQ==
