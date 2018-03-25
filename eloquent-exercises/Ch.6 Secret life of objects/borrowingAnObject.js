let map = {
  one: true,
  two: true,
  hasOwnProperty: true
};

Object.prototype.hasOwnProperty.call(map, "one");

console.log(Object.prototype.hasOwnProperty.call(map, "one"));