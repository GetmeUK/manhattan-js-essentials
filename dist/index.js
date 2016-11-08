(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ManhattanEssentials"] = factory();
	else
		root["ManhattanEssentials"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	var config, create, dispatch, escapeRegExp, ignore, listen, many, one,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	create = function(tag, props) {
	  var element, k, v;
	  if (props == null) {
	    props = {};
	  }
	  element = document.createElement(tag);
	  for (k in props) {
	    v = props[k];
	    if ((indexOf.call(element, k) >= 0)) {
	      element[k] = v;
	    } else {
	      element.setAttribute(k, v);
	    }
	  }
	  return element;
	};

	many = function(selectors, container) {
	  if (container == null) {
	    container = document;
	  }
	  return Array.prototype.slice.call(container.querySelectorAll(selectors));
	};

	one = function(selectors, container) {
	  if (container == null) {
	    container = document;
	  }
	  return container.querySelector(selectors);
	};

	dispatch = function(element, eventType, props) {
	  var event, k, v;
	  if (props == null) {
	    props = {};
	  }
	  event = document.createEvent('Event');
	  event.initEvent(eventType, true, true);
	  for (k in props) {
	    v = props[k];
	    event[k] = v;
	  }
	  return element.dispatchEvent(event);
	};

	ignore = function(element, listeners) {
	  var eventType, eventTypes, func, results;
	  results = [];
	  for (eventTypes in listeners) {
	    func = listeners[eventTypes];
	    results.push((function() {
	      var i, len, ref, results1;
	      ref = eventTypes.split(/\s+/);
	      results1 = [];
	      for (i = 0, len = ref.length; i < len; i++) {
	        eventType = ref[i];
	        results1.push(element.removeEventListener(eventType, func));
	      }
	      return results1;
	    })());
	  }
	  return results;
	};

	listen = function(element, listeners) {
	  var eventType, eventTypes, func, results;
	  results = [];
	  for (eventTypes in listeners) {
	    func = listeners[eventTypes];
	    results.push((function() {
	      var i, len, ref, results1;
	      ref = eventTypes.split(/\s+/);
	      results1 = [];
	      for (i = 0, len = ref.length; i < len; i++) {
	        eventType = ref[i];
	        results1.push(element.addEventListener(eventType, func));
	      }
	      return results1;
	    })());
	  }
	  return results;
	};

	config = function(inst, props, args, element, prefix) {
	  var attr, k, results, v;
	  if (prefix == null) {
	    prefix = 'data-';
	  }
	  results = [];
	  for (k in props) {
	    v = props[k];
	    inst[k] = v;
	    if (args.hasOwnProperty(k)) {
	      inst[k] = args[k];
	    }
	    attr = prefix + k.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	    if (element.hasAttribute(attr)) {
	      if (typeof v === 'number') {
	        results.push(inst[k] = parseInt(element.getAttribute(attr)));
	      } else if (v === false) {
	        results.push(inst[k] = true);
	      } else {
	        results.push(inst[k] = element.getAttribute(attr));
	      }
	    } else {
	      results.push(void 0);
	    }
	  }
	  return results;
	};

	escapeRegExp = function(s) {
	  return s.replace(/[\^\$\\\.\*\+\?\(\)\[\]\{\}\|]/g, '\\$&');
	};

	module.exports = {
	  create: create,
	  one: one,
	  many: many,
	  dispatch: dispatch,
	  ignore: ignore,
	  listen: listen,
	  config: config,
	  escapeRegExp: escapeRegExp
	};


/***/ }
/******/ ])
});
;