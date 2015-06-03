/* @flow */
'use strict';

var _ = require('lodash');

var e = require('./engine');
var c = require('./components');
var assemblages = require('./assemblages');

var player = e.makeEntity(assemblages.player);
// test:
var player2 = e.makeEntity(assemblages.player);
var player3 = e.makeEntity([c.Position]);
var player3 = e.makeEntity([c.Renderable]);

var s: System = e.makeSystem(['Position', 'Renderable'], function(components) {
  e.iterateMatching(components, function(entity) {
    _.noop(entity)

  });
});

var renderSystem = require('./systems/render');

var fps = 0;

function gameLoop() {
  fps ++;
  // todo: bookkeeping of systems-- automatically tick all of them
  s.tick()
  renderSystem.tick()
  setImmediate(gameLoop)
}

setInterval(function() {
  console.log('FPS: ' + fps)
  fps = 0;
}, 1000)

gameLoop()
