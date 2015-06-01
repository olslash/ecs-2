type Component = {
  // is a map of string -> primitive
  [key: string]: string | number | boolean,
  // has a type property
  type: string
};

type ComponentFactory = {
  type: string,
  getInstance: () => Component
};

type Guid = number;
