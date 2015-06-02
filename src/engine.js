/* @flow */
'use strict';

var _ = require('lodash');

var store = require('./store');

// make a new entity and optionally attach the specified components to it.
exports.makeEntity = function(components: Array<Component> = []): Guid {
  var guid = getGuid();

  if(components.length > 0) {
    // attach a new instance of each component in the list to the relevant data
    // structure in store
    components.forEach(function(component) {
      store.attachComponent(guid, component.getInstance())
    });
  }

  return guid;
};


exports.defineComponent = function(type: string,
  fields: Object): ComponentFactory {

  // verify a component with this name doesn't already exist
  if(store.hasComponent(type)) {
    console.warn('WARN: trying to create a duplicate component type:', type)
  }

  var createComponentInstance = function(): Component {
    var instance = {
      type: type
    }

    Object.assign(instance, fields);

    return instance;
  };

  return {
    type: type,
    getInstance: createComponentInstance
  };
};


exports.attachComponent = function(entityId: number, components: Array<Component>) {
  components.forEach(function(component) {
    store.attachComponent(entityId, component);
  });
};

// return a guid (for entities)
var nextGuid = 0;
function getGuid(): Guid {
  return nextGuid++;
};
