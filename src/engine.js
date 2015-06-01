/* @flow */
'use strict';

var _ = require('lodash');

var store = require('./store');

// return a guid (for entities)
var nextGuid = 0;
exports.getGuid = function(): Guid {
  return nextGuid++;
};

exports.defineComponent = function makeComponent(type: string,
  fields: Object): ComponentFactory {

  // verify a component with this name doesn't already exist
  if(store.hasComponent(type)) {
    console.warn('WARN: trying to create a duplicate component type:', type)
  }

  var createComponentInstance = function(): Component {
    // FIXME: implement as factory
  };

  var result: ComponentFactory = {
    type: type,
    getInstance: createComponentInstance
  };

  return result;
};


exports.attachComponent = function(entityId: number, components: [Object]) {
  // store.attachComponent(entityId, )
};

// make a new entity and optionally attach the specified components to it.
exports.makeEntity = function(components: ?[Component]): Guid {
  var guid = exports.getGuid();

  if(components && components.length > 0) {
    // attach a new instance of each component in the list to the relevant data
    // structure in store
    components.forEach(function(component) {
      store.attachComponent(guid, component.getInstance)
    });

  }

  return guid;
};
