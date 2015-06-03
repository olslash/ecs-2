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

exports.makeSystem = function(componentNames: Array<string>,
  impl: (components: ComponentRecord) => void): System {

  return {
    // systems get references to the full arrays of every component they specify
    tick: function() {
      var components: ComponentRecord = {};

      componentNames.forEach(function(component) {
        var componentList = store.getComponentList(component);

        if(componentList) {
          components[component] = componentList;
        }
      });

      impl(components);
    }
  };
}

// given a ComponentRecord, iterate only the entities that all have a component
// at that index. Lets a system iterate only relevant entites
// (ones that have all required the components)
exports.iterateMatching = function(components: ComponentRecord,
  cb: (match: Entity) => void) {

  var shortestComponentList: Array<Component> = _.reduce(components, function(shortest, comp) {
      if(comp.length < shortest.length) {
        return comp;
      }

      return shortest;
  })

  shortestComponentList.forEach(function(comp, i) {
    var hasAllRequiredComponents = _.every(components, function(val) {
      return !!val[i]
    });

    if(hasAllRequiredComponents) {
      var match = _.mapValues(components, function(val) {
        return val[i];
      });

      cb(match, i)
    }
  })
}

// return a guid (for entities)
var nextGuid = 0;
function getGuid(): Guid {
  return nextGuid++;
};
