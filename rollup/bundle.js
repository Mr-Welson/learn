'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dayjs = require('dayjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);

// CommonJS Module

var showCurrent = function showCurrent() {
  console.log('\u5F53\u524D\u65F6\u95F4: ' + dayjs__default["default"]().format('YYYY-MM-DD HH:mm:ss'));
};

exports.showCurrent = showCurrent;
