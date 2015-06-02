/* @flow */
'use strict';

var engine = require('./src/engine');
var assemblages = require('./src/assemblages');

var player = engine.makeEntity(assemblages.player) // -> guid: number
