/* @flow */
'use strict';

var engine = require('./src/engine');
var assemblages = require('./src/assemblages');

// var player = engine.getGuid();
// engine.attach(player, [components.Position, components.Velocity ]) // etc...


//?? engine.attach(player, components.someOtherComponent);

// how do i use the assemblages?
var player = engine.makeEntity(assemblages.player) // -> guid: number
