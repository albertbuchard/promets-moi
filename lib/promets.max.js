(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("promets", [], factory);
	else if(typeof exports === 'object')
		exports["promets"] = factory();
	else
		root["promets"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function noop() {}

var debuglog = noop();
if (typeof window !== 'undefined') {
  window.PM_DEBUG_MODE_ON = false;
  exports.debuglog = debuglog = window.PM_DEBUG_MODE_ON ? console.log.bind(console) : noop;
}

/**
 * From http://www.datchley.name/promise-patterns-anti-patterns/
 * @param  {int} ms delay in ms
 * @return {promise} promise which will resolve in delay ms
 */
function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

/**
 * Replace the now defunc Promise.defer()
 * @method Deferred
 */
function Deferred() {
  var _this = this;

  this.resolve = null;
  this.reject = null;
  this.resolved = false;
  this.rejected = false;
  this.pending = true;
  this.status = 0;
  /*
   * Create Pomise object.
   * Initially in pending state.
   */
  this.promise = new Promise(function (resolve, reject) {
    _this.resolve = function (data) {
      _this.resolved = true;
      _this.pending = false;
      resolve(data);
    };
    _this.reject = function (e) {
      _this.rejected = true;
      _this.pending = false;
      reject(e);
    };
  });
}

/**
 * Allows to return an error for missing parameters.
 * @param  {String} param Optional string to add after the error.
 */
function mandatory() {
  var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  throw new Error('Missing parameter ' + param);
}

Object.defineProperty(Object.prototype, 'observe', {
  value: function observe() {
    var attribute = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : mandatory();

    var _this2 = this;

    var lookForValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var rate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;

    var deferred = new Deferred();
    debuglog('Started observing ', this, ' attribute ', attribute, ' for value ', lookForValue, ' current value ', this[attribute]);
    var checkForValue = function checkForValue() {
      if (_this2[attribute] === lookForValue) {
        debuglog('Finished observing ', _this2, ' attribute ', attribute, ' for value ', lookForValue, ' current value ', _this2[attribute]);
        deferred.resolve(lookForValue);
      } else {
        debuglog('im still observing ', _this2, ' attribute ', attribute, ' for value ', lookForValue, ' current value ', _this2[attribute]);
        delay(rate).then(checkForValue);
      }
    };
    checkForValue();
    return deferred.promise;
  },
  enumerable: false
});

exports.Deferred = Deferred;
exports.delay = delay;
exports.debuglog = debuglog;
exports.Object = Object;

/***/ })
/******/ ]);
});
//# sourceMappingURL=promets.max.js.map