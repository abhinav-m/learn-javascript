
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

/*
Arrow functions can never have duplicate named parameters, whether in strict or non-strict mode.
Arrow functions do not have an arguments binding. 
However, they have access to the arguments object of the closest non-arrow parent function.
 Named and rest parameters are heavily relied upon to capture the arguments passed to arrow functions.
Arrow functions can never be used as constructor functions. 
Hence, they can never be invoked with the new keyword. 
As such, a prototype property does not exist for an arrow function.
The value of this inside an arrow function remains the same throughout the lifecycle
 of the function and is always bound to the value of this in the closest non-arrow parent function.
*/

/* 
  Difference between for in 
  and for of
*/

const triangle = {
  a:1,
  b:2,
  c:3
}


// For in loop iterates over enumerable properties of object
for (let prop in triangle) {
  console.log(`triangle.${prop}=${triangle[prop]}`)
}

function ColoredTriangle(color) {
  this.color = color;
}


// Inheriting from triangle
ColoredTriangle.prototype = triangle;

// Instantiating
const redTriangle = new ColoredTriangle('Red');

// Prints inherited property as well as the object properties
// (looks up prototype chain)
for (const prop in redTriangle){
  console.log(`redTriangle.${prop}=${redTriangle[prop]}`)
}

// This is because 'in' keyword looks up prototype chain
// as well itself
console.log(a in redTriangle)

// To correct add hasOwnProperty check
for (const prop in redTriangle){
  // Doesn't lookup prototype chain
  if (redTriangle.hasOwnProperty(prop)) {
    console.log(`redTriangle.${prop}=${redTriangle[prop]}`)
  }
}

/*
The for...in statement iterates over 
the enumerable properties of an object.

The for...of statement iterates over 
values that the iterable object defines to be iterated over.

Examples of iterable objects include:
Arrays, Maps, Sets, Custom implemented iterable objects using Symbol.iterator
and Generators returning iterables
*/

// Prints all values
for (const a in [1,2,3,4]){
  console.log(a)
}


Object.prototype.objCustom = function() {};
Array.prototype.arrCustom = function() {};

const iterable = [3, 5, 7];
iterable.foo = 'hello';

// Prints over all enumerable + inherited properties
for (const i in iterable) {
  console.log(i); // logs "0", "1", "2", "foo", "arrCustom", "objCustom"
}

// Prints over own properties
for (const i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i); // logs "0", "1", "2", "foo"
  }
}

// Prints all values of iterable
for (const i of iterable) {
  console.log(i); // logs 3, 5, 7
}

/*
 Question 5 - Closure to create a private counter
*/

function Counter(base = 0) {
  var _count = base
  return {
    increment: () => {_count += 1},
    get : () => _count,
    decrement: () => {_count -= 1}
  }

}

let cnt = Counter(0)

console.log(cnt.get())
cnt.increment()
console.log(cnt.get())
cnt.decrement()
console.log(cnt.get())
cnt.increment()
cnt.increment()
console.log(cnt.get())



/*
  Question 6:
  IIFE executes , what will be the output
*/
// (function() {
//   var a = b = 5;
// })();

// // Answer 5
// console.log(b);

/*
  Above expression gets expanded to
  var a= b;
  b = 5;
  b is NOT declared in the function anywhere
  thus gets declared in global scope thus gets logged.
*/

/*  
  Question 6: Explain hoisting with examples
*/

hoisted_1 = 23
console.log(hoisted_1)
var hoisted_1;


hoisted_function_2()


function hoisted_function_2() {
  console.log("hoisted function 2")
}

// NOTE: IMPORTANT only declarations are hoisted not initializationss
console.log(hoisted_3)
hoisted_3 = "hoisted_3"
var hoisted_3;

// Only function declarations are hoisted in JavaScript, 
//function expressions are not hoisted.
// For example: this code won’t work.

helloWorld();  // TypeError: helloWorld is not a function
var helloWorld = function(){
  console.log('Hello World!');
}

// Similarly, classes are hoisted but not class expressions




hoisted_4 = "hoisted_4"
console.log(hoisted_4)
var hoisted_4;


/*
  Question 7
  What is event driven programming
*/



/*
Question 8
Create a function pipe that performs 
left-to-right function composition by returning 
a function that accepts one argument.

*/

function pipe(...fns) {
  const fnArguments = Array(...fns)
  return function(x) {
    let result = null;
    console.log(fns)
    fnArguments.forEach(fn => {
      if(!result) {
        result = fn(x)
      } else {
        result = fn(result)
      }
      console.log(result)
    })

    return result
  }
  
}

const square = v => v * v
const double = v => v * 2
const addOne = v => v + 1
const res = pipe(square, double, addOne)
console.log(res(3))


/* 
   Question 9 
   m
*/
var myObject = {
  property: this,
  regularFunction: function() {
    return this
  },
  arrowFunction: () => {
    return this
  },
  iife: (function() {
    return this
  })()
}
console.log(myObject.regularFunction())// myObject because executed in myObject context
console.log(myObject["regularFunction"]())// myObject because executed in myObject context

console.log(myObject.property) // NOT myObject; lexical `this` ie, global object
console.log(myObject.arrowFunction()) // NOT myObject; lexical `this` ie, global object
console.log(myObject.iife)// NOT myObject; lexical `this` because wrapped and returns lexical this
const regularFunction = myObject.regularFunction // Here we take a reference to the function
console.log(regularFunction()) // NOT myObject; lexical `this`,  because executed in global context



/* 
    Question 9:
    Write an example function doing the same job as bind

*/

function newBind(fn,ctx) {
  return function () {
    return fn.call(ctx)
  }
}


function example() {
  console.log(this)
}

const boundTest = newBind(example,{a:true})

boundTest.call({b:true})

// Returns  a function which applys all the argument and context passed to the first function
const newBindArrow = (fn,context) => (...args) => fn.apply(context,args)

const boundTest2 = newBindArrow(example,{"abc":true})

// Still runs with bound value
boundTest2.call({"xyz":true})

/*  Q 10
    Output of this function is 
    undefined due to hoisting
    of variable. Use strict prevents hoisting

*/
var foo = 1
var foobar = function() {
  console.log(foo)
  var foo = 2
}
foobar()

/* 
  Q 11
  Strict mode
  Including 'use strict' at the beginning of your JavaScript source file enables strict mode, 
  which enforces more strict parsing and error handling of JavaScript code.

  In non-strict mode, global this is the global object (window in browsers), while in strict mode global this is undefined.

  It is considered a good practice and offers a lot of benefits, such as:

  Easier debugging due to eliminating silent errors.
  Disallows variable redefinition.
  Prevents accidental global variables.
  Oftentimes provides increased performance over identical code that is not running in strict mode.
  Simplifies eval() and arguments.
  Helps make JavaScript more secure.
  Good to hear
  Eliminates this coercion, throwing an error when this references a value of null or undefined.

  Throws an error on invalid usage of delete.

  Prohibits some syntax likely to be defined in future versions of ECMAScript

*/

/* 
  Q 12: Explain callbacks
*/

// Callbacks are functions which are executed 
// at a later time. They can be synchronous or 
// asynchronous

// An example of synchronous function
function mapFunc(array,callback) {
    const result = []
    for(let i = 0;i<array.length;i++) {
      result.push(callback(array[i]),i) 
    }
    return result
}

// An example of asynchronous callback would be
// Logs clicked when function is clicked
function onClickFunc() {
  console.log('clicked')
}

// document.addEventListener('click',onClickFunc)


/* 
  Q 13
  Difference between expression and statement

*/

// Expression produces a value of some sort
console.log(5===5)
console.log("abc".length)
console.log(5+5)


// Statement is used to perform an action or just the declaration
var statTest = 5;
// Defining the statement function
function statement() {

}
// Expression statement
// Since RHS evaluates to an expression
// and LHS is a statement
const y =5;
const x = 3;
var testStatement = y>= 0? x: y;

// Function expression
var testFunc = function(x,y) {
  return x +y
}

/* 
  Q 13:
  What does 0.1 + 0.2 === 0.3 
  evaluate to?
*/

//Answer False
console.log(0.1+0.2)

// JS uses 64 bit floating numbers
// causing math precision errors
// To remedy this, following can be used:

function almostEqual(a,b,epsilon=0.0001) {
  return Math.abs(a-b) <= epsilon
}

console.log(almostEqual(0.1+0.2,0.3))

/*
  Q:14
  Is JS pass by value or 
  pass by reference
*/

// JS is always pass by value but in case of objects
// a reference to the object is passed

/* 
  Q:15
  Difference between
  var,let, const and no keyword
*/

// No keyword binds to global scope
// ie, window in dom and global in node.js

// var function levels scope, goes to the top

//let and const are block level, const cant be reassigned

// var i will have value 10 after stack empties
for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    // logs `10` ten times
    console.log(i)
  })
}

/* Solutions with `var` */
for (var i = 0; i < 10; i++) {
  // Passed as an argument will use the value as-is in
  // that point in time
  setTimeout(console.log, 0, i)
}

for (var i = 0; i < 10; i++) {
  // Create a new function scope that will use the value
  // as-is in that point in time
  ;(i => {
    setTimeout(() => {
      console.log(i)
    })
  })(i)
}

// solution with let
// For each iteration, assigns a new i value
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    // logs 0, 1, 2, 3, ...
    console.log(i)
  })
}

const myObject = {}
myObject.prop = "hello!" // No error
myObject = "hello" // Error

// All declarations are hoisted to the top of their scope.

// However, with let and const there is a concept 
// called the temporal dead zone (TDZ). 
// While the declarations are still hoisted, 
// there is a period between entering scope
//  and being declared where they cannot be accessed.

/* 

so are let and const variables not hoisted?
The answer is a bit more complicated than that.
All declarations (function, var, let, const and class)
 are hoisted in JavaScript, while the var declarations 
 are initialized with undefined,
 but let and const declarations remain uninitialized.
*/