/* @flow */
'use strict';

var _ = require('lodash');
var defineComponent = require('../../src/engine').defineComponent;
var keymap = require('../config/keymap').bindings;

exports.Position = defineComponent('Position', {
  x: 0,
  y: 0
});

exports.Velocity = defineComponent('Velocity', {
  Vx: 0,
  Vy: 0
});

exports.Renderable = defineComponent('Renderable', {
  character: '0',
  foreground: 'white'
});

exports.Controllable = defineComponent('Controllable', _.values(keymap.bindings)
 .map(function(control) {
    var result = {};
    result[control] = false;
    return result;
  })
);
