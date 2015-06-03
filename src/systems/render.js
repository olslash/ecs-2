/* @flow */
'use strict';

var _     = require('lodash');

var e = require('../engine');

type Pixel = {
  foreground: string;
  character : string;
}

type Grid = Array< Array<Pixel> >;

var gridSize = 25;
var bgPixel: Pixel = {
  foreground: 'green',
  character: '.'
}

module.exports = e.makeSystem(['Renderable', 'Position'], function(components) {
  // build grid background
  var grid: Grid = _.map(new Array(gridSize), function() {
    return _.fill(Array(gridSize), bgPixel);
  });

  // write changes to the grid
  e.iterateMatching(components, function(entity) {
    grid[Math.floor(entity.Position.y)][Math.floor(entity.Position.x)] = {
      foreground: entity.Renderable.foreground,
      character: entity.Renderable.character
    };
  })

  // write to screen
  _.each(grid, function(row, y) {
    _.each(row, function(pixel: Pixel, x) {
      // charm.foreground(pixel.foreground);
      process.stdout.write(pixel.character);
    });
    console.log('\r')
  });
  process.stdout.write('\u001B[2J\u001B[0;0f')
});
