/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/popup/popup.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/module/message.js":
/*!******************************!*\
  !*** ./js/module/message.js ***!
  \******************************/
/*! exports provided: Message, MessageType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Message\", function() { return Message; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MessageType\", function() { return MessageType; });\n/**\r\n * Message构造函数\r\n * @param type - Message类型\r\n * @param content - Message内容\r\n * @constructor\r\n */\r\nfunction Message(type, content) {\r\n    this.type       = type;\r\n    this.content    = content;\r\n}\r\n\r\n/**\r\n * 定义message类型，用于background/popup/content之间的信息通信\r\n * @type {{init: number}}\r\n */\r\nconst MessageType = {\r\n    ERROR: 0,\r\n    INIT: 1,\r\n    RECEIVED: 2\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./js/module/message.js?");

/***/ }),

/***/ "./js/popup/popup.js":
/*!***************************!*\
  !*** ./js/popup/popup.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _module_message_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../module/message.js */ \"./js/module/message.js\");\n// const bg = chrome.extension.getBackgroundPage();\r\n//\r\n// console.log(bg.getTabId());\r\n// chrome.runtime.sendMessage('Hello', function (response) {\r\n//     console.log(response);\r\n// });\r\n\r\n\r\nchrome.tabs.query({active: true, currentWindow: true}, function(tabs)\r\n{\r\n    chrome.tabs.sendMessage(tabs[0].id, new _module_message_js__WEBPACK_IMPORTED_MODULE_0__[\"Message\"](_module_message_js__WEBPACK_IMPORTED_MODULE_0__[\"MessageType\"].INIT, 'init'), function(response) {\r\n        console.group('popup received response', response);\r\n        switch (response.type || _module_message_js__WEBPACK_IMPORTED_MODULE_0__[\"MessageType\"].ERROR) {\r\n            case _module_message_js__WEBPACK_IMPORTED_MODULE_0__[\"MessageType\"].ERROR:\r\n                console.log('error', response);\r\n                break;\r\n            case _module_message_js__WEBPACK_IMPORTED_MODULE_0__[\"MessageType\"].RECEIVED:\r\n                console.log('content script received');\r\n                break;\r\n        }\r\n        console.groupEnd();\r\n    });\r\n});\r\n\n\n//# sourceURL=webpack:///./js/popup/popup.js?");

/***/ })

/******/ });