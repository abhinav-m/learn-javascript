
// Q1
// What happens when we run the following snippet?
// In other words, what happens when we try to 
// log n to the console?

// const r = (() => {
//     const n = 1;
//     const m = 2;
//     return n + m;
//   })();
//   console.log(n);

// Answer:
// r gets the value of 3
// n gets reference error because its defined inside an IIFE and 
// doesnt pollute global scope


// Q2
// Write the equivalent of the following
// using ES5 syntax

// class Person {
//   constructor(name) {
//     this.name = name;
//   }
//   hello() {
//     return 'hello ' + this.name;
//   }
// }

// class Developer extends Person {
//   constructor(name, title) {
//     super(name);
//     this.title = title;
//   }
//   getTitle() {
//     return this.title;
//   }
// }

// Base class for person
function Person(name) {
  this.name = name;

}

// Add Common property to prototype chain
Person.prototype.hello = function() {
  return "Hello " + this.name
}

function Developer(name,title) {
  // Creates a person under current context
  // Multi level inheritance
  Person.call(this,name)
  this.title = title
}

// Create new prototype based of Persons existing prototype
// Effectively linking person prototype
// Multi level inheritance
Developer.prototype = Object.create(Person.prototype)

// Override existing person constructor prototype with Developer prototype
Developer.prototype.constructor = Developer;

Developer.prototype.work = function() {
  return this.hello() +  "I am a " + this.title
}

const d = new Developer("Abhinav ", "Full stack");
console.log(d.work());

/*  
    What happens when you use the
    new keyword ?
*/

// Constructor function of Car
function Car(make,year,model) {
  this.make = make;
  this.model = model;
  this.year = year;
}

// 1. Use new keyword to instantiate a constructor function
const c1 = new Car();

//2.  A new object is created (plain javascript )
//3. This new object's prototype is linked to constructor function Car's prototype.
// THUS any function linked to constructor function's prototype are accessible to 
// all objects linked to the prototype
//4. Newly created object is bound as context in the constuctor function Car. Ie, this now refers
// to newly created object inside the constructor function
//5. this is returned explicitly from the Car constructor function

/*
FROM MDN:
  When the code new Foo(...) is executed, the following things happen:

A new object is created, inheriting from Foo.prototype.
The constructor function Foo is called with the specified arguments, 
and with this bound to the newly created object. new Foo is equivalent to new Foo(), 
i.e. if no argument list is specified, Foo is called without arguments.
The object (not null, false, 3.1415 or other primitive types) returned by
 the constructor function becomes the result of the whole new expression.
  If the constructor function doesn't explicitly return an object, 
  the object created in step 1 is used instead (normally constructors don't return a value,
   but they can choose to do so if they want to override the normal object creation process).
You can always add a property to a previously defined object instance.
  
For example, the statement car1.color = "black" adds a property color to car1,
 and assigns it a value of "black".

However, this does not affect any other objects. 
To add the new property to all objects of the same type, you must add the property 
to the definition of the Car object type.

You can add a shared property to a previously defined object type by using the 
Function.prototype property. This defines a property that is shared by all objects 
created with that function, rather than by just one instance of the object type. 
The following code adds a color property with value "original color" 
to all objects of type Car, and then overwrites
 that value with the string "black" only in the instance object car1.
 
 For more information, see prototype.
*/

// Question 3

const a = () => {}
function B() {

}

console.log(typeof a)
console.log(typeof B)
console.log(Object.getPrototypeOf(a))
console.log(Object.getPrototypeOf(B))
console.log(a.prototype)
console.log(B.prototype)