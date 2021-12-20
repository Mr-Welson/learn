(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  function hello() {
    console.log('hello gulp');
  }

  module.exports = {
    hello
  };

}));
