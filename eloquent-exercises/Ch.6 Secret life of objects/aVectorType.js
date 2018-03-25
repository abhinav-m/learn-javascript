/*
Write a class Vec that represents a vector in two-dimensional space. It takes
x and y parameters (numbers), which it should save to properties of the same
name.
Give the Vec prototype two methods, plus and minus , that take another
vector as a parameter and return a new vector that has the sum or difference
of the two vectors’ ( this and the parameter) x and y values.
Add a getter property length to the prototype that computes the length of
the vector—that is, the distance of the point (x, y) from the origin (0, 0).
*/

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(vector) {
    return new Vec(vector.x + this.x, vector.y + this.y)
  }

  minus(vector) {
    return new Vec(vector.x - this.x, vector.y - this.y)

  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

let vec1 = new Vec(1, 2);
let vec2 = new Vec(2, 3);

let vec3 = vec1.plus(vec2);
let vec4 = vec3.minus(vec2);

console.log(vec1);
console.log(vec2);
console.log(vec3);
console.log(vec4);

console.log(vec3.length);