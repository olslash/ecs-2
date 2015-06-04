/* @flow */
'use strict';

var _     = require('lodash');

var e = require('../../src/engine');

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
    var thisRow = _.map(row, function(pixel: Pixel, x) {
      // charm.foreground(pixel.foreground);
      return pixel.character;
    });
    console.log(thisRow.join(''))
  });
  // console.clear();
});
