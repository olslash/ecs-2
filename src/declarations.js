type Guid = number;

// entities are implied only, generated on demand, and usually only
// partially-represented (systems get only the components they care about,
// not an entire entity)
type Entity = {
  [componentType: string]: Component
};

type Component = {
  // is a map of string -> primitive
  [field: string]: string | number | boolean,
  // has a type property
  type: string
};

type ComponentFactory = {
  type: string,
  getInstance: () => Component
};

// raw component data fed to a system tick()
type ComponentRecord = { [componentType: string]: Array<Component> };

type System = {
  // called by game loop, defined w/ system-- contains system logic
  tick: () => void
};
