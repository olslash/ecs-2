/* @flow */
'use strict';

var components = {};

exports.hasComponent = function hasComponent(componentName: string): boolean {
  return components.hasOwnProperty(componentName);
};

// exports.getComponent = function getComponent(componentName: string): ?Component {
//
// };

exports.attachComponent = function attachComponent(entityId: number,
  componentName: string): boolean {

  return false;
}

// exports.makeComponent = function makeComponent() {
//
// }
