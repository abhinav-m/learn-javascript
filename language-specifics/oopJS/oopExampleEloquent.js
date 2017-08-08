/* Methods are simply properties that hold function values. 
   This is a simple method : */

var fox = {};

//Here this will refer to the fox object.
fox.speak = function(line) {
    console.log("The fox says " + line + "!");
}

fox.speak(" I like fishes. ");
/*
Usually a method needs to do something with the object it was called
on. When a function is called as a method—looked up as a property and
immediately called, as in object.method() —the special variable this in its
body will point to the object that it was called on. */


//----------------------------------------------------------------------------

//Above code can be refactored to produce a better version , 
//which can be used on more than one object.

function speak(line) {
    console.log("I am a " + this.type + " and I wanna say " + line);

}

var rabbit = { type: "rabbit", speak: speak };
var billi = { type: "billi", speak: speak };

//Here the this keyword allows us to get the output we desire by referencing this.type
rabbit.speak("rabbit stuff");
billi.speak("billi stuff");


//----------------------------------------------------------------------------

/*Apply , call and bind methods are some methods which can be used to assign `this` value to function calls
  and simulate them as methods*/

// Apply needs it's arguments as an array. Example
var cat = { type: "cat" };
speak.apply(cat, ["meow"]);

//Call can take arguments normally.
//Here we pass the this object as a parameter to the function.
speak.call({ type: "bat" }, "I'm batman");

//----------------------------------------------------------------------------

var empty = {};

//These will still print function and object values due to looking up through the prototype chain.
//Explanation below.
console.log(empty.toString);
console.log(empty.toString());



/*In addition to their properties, all objects contain prototype property. 
    A prototype is another object that is used as a fallback source of properties.
    When an object gets a request for a property that it does not have, its prototype will be
    searched for the property, then the prototype’s prototype, and so on.
    So who is the prototype of that empty object? It is the great ancestral
    prototype, the entity behind almost all objects, Object.prototype .*/

//Since this is an empty object, it's prototype would be Object.prototype as it is the topmost object.
console.log(Object.getPrototypeOf({}) === Object.prototype);
//This will return NULL as there is nothing upwards the prototype chain of Object.
console.log(Object.getPrototypeOf(Object.prototype))
    //Two things to note here:
    //  This will return Object.prototype property(a function) since Object is the base entity,
    //  and has it's own prototype property.
console.log(Object.getPrototypeOf(Object))

/*
The prototype relations of JavaScript objects form a tree-shaped struc-
ture, and at the root of this structure sits Object.prototype . It provides a
few methods that show up in all objects, such as toString , which converts
an object to a string representation.
*/

//----------------------------------------------------------------------------

/*
Many objects don’t directly have Object.prototype as their prototype,
but instead have another object, which provides its own default properties.*/

//Functions derive from Function.prototype,
console.log(Object.getPrototypeOf(isNaN) === Function.prototype);
//Arrays derive from Array.prototype
console.log(Object.getPrototypeOf([]) === Array.prototype);

//Such prototype objects (as above) often have protoypes themselves :
console.log(Object.getPrototypeOf(Function.prototype) === Object.prototype);

//Object.getPrototypeOf() fetches the prototype of an object.


//----------------------------------------------------------------------------

//Object.create can be used to create an object with a specific prototype.

var animalPrototype = {
    say: function(what) {
        console.log(this.type + " says " + what);
    }
}

//This will create an object with it's prototype property set as the given object.
var cat = Object.create(animalPrototype);
cat.type = "cat";
cat.say("Meow");

//This will return true as cat.prototype will be animalPrototype due to Object.create function.
console.log(Object.getPrototypeOf(cat) === animalPrototype);

/* Thus animalPrototype can be used to be assigned to an object's prototype.
  This will allow it to have it's own property like type above , and get a shared set of properties.*/

//----------------------------------------------------------------------------

/*
A more convenient way to create objects that derive from some shared
prototype is to use a constructor. In JavaScript, calling a function with
the new keyword in front of it causes it to be treated as a constructor.

The constructor will have its this variable bound to a fresh object, and
unless it explicitly returns another object value, this new object will be
returned from the call. 

An object created with new is said to be an instance of its constructor.*/

function Animal(type) {
    this.type = type;
}

var horse = new Animal("Black horse");
var dog = new Animal("Labrador dog");

console.log(horse.type);
console.log(dog.type);

/* Constructors, and in fact all functions automatically get a property named prototype 
which by default holds an empty and plain object
This object is derived from Object.prototype and every instance created of this object
from it's constructor function will have it as it's prototype */

//Returns empty object
console.log(Animal.prototype)

Animal.prototype.says = function(words) {
    console.log(this.type + " says " + words);
}

//Both dog and horse are created from Animal constructor and can access says property through their prototype
dog.says("woof");
horse.says("Nehehehe");

/* It is important to note how a constructor function has it's OWN prototype property. (as shown above)
and how objects prototype can be determined using Object.getPrototypeOf() 
The constructor's function prototype will be: Function.prototype since constructors are functions.
It's prototype value will be the prototype of instances created through it BUT NOT ITS OWN PROTOTYPE.*/