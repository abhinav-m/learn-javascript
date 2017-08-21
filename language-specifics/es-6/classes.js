/* JavaScript classes introduced in ECMAScript 2015 are primarily syntactical sugar over JavaScript's existing prototype-based inheritance.
 The class syntax is not introducing a new object-oriented inheritance model to JavaScript.
JavaScript classes provide a much simpler and clearer syntax to create objects and deal with inheritance. */


//Class syntax has two components class expressions and class declarations.

//IMPORTANT DISTINCTION B/W Function declaration and class declarations:
//Function definitions are hoisted, class declarations aren't.
//var p = new Rectangle(5, 6); // ReferenceError

//This is a class declaration.
class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}
// valid here
var p = new Rectangle(6, 7)

console.log(p.height);


/* A class expression is another way to define a class.
 Class expressions can be named or unnamed.
  The name given to a named class expression is local to the class's body.*/


//Unnamed class expression.
var RectangleUnnamed = class {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}

//Named class expression
//The name given to a named class expression is local to the class's body.
//Therefore, it doesnt produce any conflict with the above class with the same name.
var RectangleNamed = class Rectangle {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

}

//Object is created by referring to the named class expression.
var obj = new RectangleNamed(5, 6);
console.log("Height =" + obj.height + "Width =" + obj.width);

/*
Writing Animal.eat(coconut) is same as Animal.eat.call(Animal, coconut),
 while eat(coconut) is same as Animal.eat.call(undefined, coconut).
 The first argument to call is the value passed for this.
  So in Animal.eat(), this is Animal, while in eat(), this is undefined.
  Unless you are in non-strict mode, where a non-object this gets auto-boxed to an object.
  For example, numbers get boxed into Number wrapper class, strings into String,
  and null or undefined gets autoboxed to the global object (window in a web browser,
  ordinary global variables are properties of that object,
  for example undefined refers to the same as window.undefined) */


//The bodies of class declarations and class expressions are executed in strict mode i.e. constructor,
//static and prototype methods, getter and setter functions are executed in strict mode.
//Strict mode makes several changes to normal JavaScript semantics. First, strict mode eliminates some JavaScript silent errors by changing them to throw errors. Second, strict mode fixes mistakes that make it difficult for JavaScript engines to perform optimizations: strict mode code can sometimes be made to run faster than identical code that's not strict mode.
//Third, strict mode prohibits some syntax likely to be defined in future versions of ECMAScript.

class Animal {
    speak() {
        return this;
    }
    static eat() {
        return this;
    }
}

let animalObj = new Animal();
console.log("this should return object, as an object is attached, and it verifies class in strict mode" + animalObj.speak()); // Animal {}
let speak = animalObj.speak;
console.log("This will return undefined, as no autoboxing occurs in case of clas definition,as it runs in strict mode" + speak()); // undefined
//Same for these two
console.log(Animal.eat()) // class Animal
let eat = Animal.eat;
console.log(eat()); // undefined


//Using a function for the class declaration auto boxes the global object for the class.
function AnimalFn() {}

AnimalFn.prototype.speak = function() {
    return this;
}

AnimalFn.eat = function() {
    return this;
}

let animalFn = new AnimalFn();
let fnspeak = animalFn.speak;
console.log("Represents global object because of non strict mode auto boxing of class declaration using functions" + fnspeak()); // global object

let fnEat = AnimalFn.eat;
console.log("Same, global object due to function " + fnEat()); // global object


//Sub classes example
//If there is a constructor present in sub-class,
// it needs to first call super() before using "this".
class Car {
    constructor(name) {
        this.name = name;
    }

    start() {
        console.log(this.name + " driver turns the key");
    }
}
//The extends keyword is used in class declarations or class expressions
//to create a class as a child of another class.
class Mercedes extends Car {
    start() {
        console.log(this.name + " revs the engine");
    }
}

var merc = new Mercedes("Mercedes-S-Class");
merc.start();

//Function based classes can also be extended.

function Tree(sciName) {
    this.sciName = sciName;

    function wood() {
        console.log("gives wood");
    }

}

//Allowing purpose to be inherited further down the prototype chain
Tree.prototype.purpose = function() {
    console.log(this.sciName + " gives oxygen")

}

class TulsiTree extends Tree {
    /*   purpose() {
          console.log("This tree has herbal properties");
      } */
}

var tTree = new TulsiTree("tulsi");
tTree.purpose();
//Wont work as not part of the prototype inheritance chain
//tTree.wood();

/*
Note that classes cannot extend regular (non-constructible) objects.
 If you want to inherit from a regular object, you can instead use Object.setPrototypeOf():
 */

//Inheritance done through classes without using keyword extends
//and using setPrototypeOf

//Function based classes can also be extended.

function NewTREE(sciName) {

    function wood() {
        console.log("gives wood");
    }

}

//Allowing purpose to be inherited further down the prototype chain
NewTREE.prototype.purpose = function() {
    console.log(this.sciName + " gives oxygen")

}

class PalmTree {
    constructor(sciName) {
        this.sciName = sciName;
    }
}



Object.setPrototypeOf(PalmTree.prototype, new NewTREE());

var treeMine = new PalmTree("Palm");
treeMine.purpose();