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

type Guid = number;
