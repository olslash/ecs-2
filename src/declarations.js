type Component = {
  // is a map of string -> primitive
  [field: string]: string | number | boolean,
  // has a type property
  type: string
};

type System = {
  tick: (components: Array<Component>) => void
};

type ComponentFactory = {
  type: string,
  getInstance: () => Component
};

type Guid = number;
