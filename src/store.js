/* @flow */
'use strict';

var components: ComponentRecord = {};

exports.hasComponent = function(componentType: string): boolean {
  return components.hasOwnProperty(componentType);
};

exports.getComponentList = function(componentType: string): ?Array<Component> {
  return components[componentType] || null;
};

exports.attachComponent = function(entityId: number,
  component: Component): void {

  var componentType = component.type;

  if(!exports.hasComponent(componentType)) {
    allocate(componentType);
  }

  components[componentType][entityId] = component;
}

// make a entry in the component store for a new component type
function allocate(componentType: string): void {
  components[componentType] = [];
}
