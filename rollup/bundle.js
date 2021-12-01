'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dayjs = require('dayjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);

function showCurrent() {
  console.log('当前时间: ' + dayjs__default["default"]().format('YYYY-MM-DD HH:mm:ss'));
}

exports.showCurrent = showCurrent;
