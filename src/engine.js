/* @flow */
'use strict';

var _ = require('lodash');

var store = require('./store');

// make a new entity and optionally attach the specified components to it.
exports.makeEntity = function(components: Array<ComponentFactory>): Guid {
  var guid = getGuid();

  components.forEach(function(component: ComponentFactory) {
    store.attachComponent(guid, component.getInstance())
  });

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

    _.assign(instance, fields);

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

exports.makeSystem = function(components: Array<string>,
  impl: (components: Array<Component>) => void): System {

  return {
    // systems get references to the full arrays of every component they specify
    tick: function() {
      // TODO: gather components specified from store,
      // then call onTick with those
      // store.getComponentBy
      // FIXME: where does validation happen to say that a given entity
      // posesses all the components needed? Right now we'd just pass the
      // requested component arrays but should those be filtered? seems slow
      // -- generated member function that verifies?
    },

    onTick: impl
  };
}

// return a guid (for entities)
var nextGuid = 0;
function getGuid(): Guid {
  return nextGuid++;
};
