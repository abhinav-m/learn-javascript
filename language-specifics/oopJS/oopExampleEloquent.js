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
    ///A thing to note here:
    //  This will return Object.prototype property(a function) since Object is the base entity,
    //  and has it's own prototype property.
console.log(Object.getPrototypeOf(Object))

/*
The prototype relations of JavaScript objects form a tree-shaped structure,
 and at the root of this structure sits Object.prototype . It provides a
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

//----------------------------------------------------------------------------

/* Overriding derived properties
When you add a property to an object, whether it is present in the
prototype or not, the property is added to the object itself, which will
henceforth have it as its own property. If there is a property by the same
name in the prototype, this property will no longer affect the object. The
prototype itself is not changed. This is also known as shadowing. */

function Car(model) {
    this.drive = function() {
        console.log(this.model + " starts")
    }

    this.description = function() {
        console.log("Model " + model + " has " + this.wheels + " wheels");
    }
}
//Lets assign Car.prototype.wheels as 3
Car.prototype.wheels = 3;

var mercedes = new Car("merc");
var bugati = new Car("bugati");
mercedes.drive();
//Without shadowing print's the Car prototype property
mercedes.description();
bugati.description();

//Shadow the property / override it here
mercedes.wheels = 4;
//Prints overridden property
mercedes.description();

//Another example of the same feature is calling toString() on an array , 
//this function is shadowed / overriden in Array.prototype.toString
//Hence it prints array elements seperated by commas.
console.log([1, 2, 3, 4, 5].toString());

//Another proof of the same
console.log(Array.prototype.toString === Object.prototype.toString);
//This shows that Array.prototype.toString is not the same as Object.prototype.toString, thus it is not derived
//Hence it is shadowed/ overridden.
console.log(Object.prototype.toString.call([1, 2]));

/*function doesn’t know about arrays, so it simply puts the word “object”
and the name of the type between square brackets.*/

//----------------------------------------------------------------------------

/*Prototype interference 
A prototype may be used to add new properties and methods to all objects based on an object.
Although this is convenient, there are situations that it causes problems:*/

var pizza = {}

function addProperties(prop, name) {
    pizza[prop] = name;
}

addProperties("crust", "thin");
addProperties("cheese", "mozzerella");
addProperties("type", "margherita");

//Adding a random property to Object.prototype , this will make it show up in our for `in` loop
Object.prototype.awful = "pineapple";

for (var desc in pizza)
    console.log(desc);

//These return true as these properties can be found using the base object prototype
//But these are not available directly in our object. This can be a problem.
console.log("awful" in pizza);
//Note how toString didn't show up in the above for in loop.
console.log("toString" in pizza);

//This difference arises from Javascript distinguishing between enumerable and non - enumerable properties.
//All properties created by us are enumerable, Javascript's base Object.prototype's standard properties are non enumerable,
//this is why they don't show up in a for `in` loop

//Deleting the problematic property here.
delete Object.prototype.awful;

/*
It is possible to define our own nonenumerable properties by using
the Object.defineProperty function, which allows us to control the type of
property we are creating. */
Object.defineProperty(Object.prototype, "hiddenawful", { enumerable: false, value: "pineapple" });

//Now it won't be enumerated over via this loop.
for (var desc in pizza)
    console.log(desc)

//This will still return true
console.log("hiddenawful" in pizza)
    //We still face the issue of the property returning "true" in case of using `in`
    //To solve this issue we can use the object's hasOwnProperty() method.
    //This tells us if the object itself has this property , without looking at its prototypes.
    //Often more useful than the `in` operator.
console.log(pizza.hasOwnProperty("toString"));
//returns false

/*When we are worried about some code interfering with our base Object prototype,
    we can write for/ in loops as:
    */
for (var name in pizza) {
    if (pizza.hasOwnProperty(name))
        console.log("pizza owns " + name);
}

//However there is another concern here that needs to be handled.
//What if hasOwnProperty() ITSELF is defined on our object and it's value tampered with?
//We can create a prototype - less object to handle this using Object.create() 
//Remember, Object.create creates an object for us with a specific passed prototype, passing null to it 
//would cause it's prototype to be null (pizza.prototype) Thus, no matter what tampering is done with Object.prototype
//It wouldn't affect our object. Also, for in loops can be used as all properties would belong to the object itself
//without hasOwnProperty() sludge.

var myPizza = Object.create(null);
myPizza["toppings"] = "olives,onions,chicken";
myPizza["crust"] = "thin";

//This will print false now as the pizza doesn't have the base object's prototype anymore.
console.log("toString" in myPizza);
//true
console.log("toppings" in myPizza);
/* For in loops can be used safely without hasOwnProperty() , no matter what is being done to the Object.prototype above */

//----------------------------------------------------------------------------

/* Polymorphism explained:
    When the toString function is called on an object, it calls toString on the object to try and create
    a meaningful string to return.
    Some of the standard prototypes eg, Array.protoype , Function.prototype define their own versions of the toString method
    to create a method which returns more useful information than "[Object object]". 
    This simple instance is an example of a powerful idea.
    When a piece of code is written to work with objects of a certain interface eg, toString method any kind of object 
    can be `plugged` in to use this interface, and it will work.
    Polymorphic code can work with values of different types, as long as they support the interface it expects */

//----------------------------------------------------------------------------

/* Getters and setters:
    Non method properties shouldn't be used in interfaces as a principle.
    Rather than directly accessing a simple value property, getSomething and setSomething methods can be used to read and write the property.
    This approach has the downside of having to end up writing and reading , a lot of additional methods. 
    In javascript a technique is provided for this purpose. We can specify properties, that from outside look like normal properties,
    but secretly have methods associated with them. */

var garbage = {
    content: ["eggshell", "wrappers", "chewinggum", "worms"],
    get height() {
        return this.content.length;
    },
    set height(value) {
        console.log("Im a rebel, i wont set height as " + value + " for you");
    }
}

console.log(garbage.height); //Read attempt on height property, where getter and setter's are defined will return 4
garbage.height = 200; //This will run the set method, and ignore the attempt to set the value directly.

/*  In an object literal, the get or set notation for properties allows you
to specify a function to be run when the property is read or written. 

You can also add such a property to an existing object, for example a
prototype, using the Object.defineProperty function (which we previously
used to create nonenumerable properties). eg: */

//We cant assign it directly to garbage.prototype as garbage isn't created with new keyword.
Object.defineProperty(Object.prototype, "lastGarbage", { get: function() { return this.content[this.content.length - 1]; } });


function Example(value) {
    this.value = value;
}
var ex = new Example(5);
//Here we assign it to Example.prototype and access it using subtractOne
Object.defineProperty(Example.prototype, "subtractOne", { get: function() { return this.value - 1 } });
//Last value in the array
console.log(garbage.lastGarbage);
//Current value minus one
console.log(ex.subtractOne);

//----------------------------------------------------------------------------

/* Inheritance in JS:
    We can use similar objects constructors through call method available to us in javascript global object to create a new object.
    This pattern is called inheritance. It allows us to build slightly different data types from existing data types with relatively little work. 
    Typically,the new constructor will call the old constructor (using the call method in order to be able to give  the new object as its this value). Once
    this constructor has been called, we can assume that all the fields that the old object type is supposed to contain have been added. We arrange 
    for the constructor’s prototype to derive from the old prototype so that instances of this type will also have access to the properties in that
    prototype. Finally, we can override some of these properties by adding them to our new prototype. Example: */

function Vehicle(type, wheels, hp) {
    this.wheels = wheels;
    this.hp = hp;

    this.drive = () => console.log(type + " which has " + wheels + " wheels and " + hp + " horsepower drives off");
    this.stop = () => console.log(type + " which has " + wheels + " wheels and " + hp + " horsepower comes to a stop.")

    Vehicle.prototype.vroom = function() {
        console.log(type + " vrooms");
    }
    Vehicle.prototype.vroom = Vehicle.prototype.vroom.bind(this);

}


var myCar = new Vehicle("car", 4, "500");
myCar.drive();
myCar.vroom();

function Truck(...args) {
    Vehicle.call(this, ...args);
}


//The following won't work since it's a property of Vehicle.prototype and we don't have our own prototype setup to match our inherited parent.
//monsterTruck.vroom();

//To accomplish that,

Truck.prototype = Object.create(Vehicle.prototype);

//Here monsterTruck is initialized with the drive function  as drive function is  a property of Vehicle.
//and we can assume all properties available in vehicle are available here.
var monsterTruck = new Truck("MONSTER", 16, "5000");
monsterTruck.drive();
monsterTruck.stop();



var testTruck = new Truck("normal", 8, "5000");
testTruck.vroom();

/* Inheritance is a fundamental part of the object-oriented tradition, along-
side encapsulation and polymorphism. But while the latter two are now
generally regarded as wonderful ideas, inheritance is somewhat contro-
versial.
The main reason for this is that it is often confused with polymorphism,
sold as a more powerful tool than it really is, and subsequently overused
in all kinds of ugly ways. Whereas encapsulation and polymorphism
can be used to separate pieces of code from each other, reducing the
tangledness of the overall program, inheritance fundamentally ties types
together, creating more tangle. */

//----------------------------------------------------------------------------

/*InstanceOf operator 
It is occasionally useful to know whether an object was derived from
a specific constructor. For this, JavaScript provides a binary operator
called instanceof .
*/

console.log(new Truck("1", 2, "3") instanceof Truck); //true

//This looks through inherited types. Truck is an instance of  vehicle
//because Truck.prototype derives from Vehicle.prototype. 
//This operator can also be applied to standard constructors like arrays.
//Almost every object is an instance of Object.
console.log(new Truck("1", 2, "3") instanceof Vehicle); //true
console.log([] instanceof Array)
console.log(new Vehicle("1", 2, "3") instanceof Truck); //false


function Base(a, b) {
    this.a = a;
    this.b = b;
}

Base.prototype.c = "test";

function Derived(...args) {
    Base.call(...args);
}

//Without setting Derived.prototype object as Base's prototype object, instanceOf returns false:
console.log(new Derived(1, 2) instanceof Base);
//After assigning Prototype of Derived as Base's prototype, it would return true.
Derived.prototype = Object.create(Base.prototype);
//Returns true. Therefore, instanceOf checks whether Derived.prototype is derived from Base.prototype.
console.log(new Derived(1, 2) instanceof Base);


//----------------------------------------------------------------------------
/*
Summary
So objects are a bit complicated. 

They have prototypes, which are other objects, and will act as if they have
properties they don’t have as long as the prototype has that property.

Simple objects have Object.prototype as their prototype.

Constructors, which are functions whose names usually start with a
capital letter, can be used with the new operator to create new objects.

The new object’s prototype will be the object found in the prototype
property of the constructor function. You can make good use of this by
putting the properties that all values of a given type share into their pro-
totype.

The instanceof operator can, given an object and a constructor,
tell you whether that object is an instance of that constructor.

One useful thing to do with objects is to specify an interface for them
and tell everybody that they are supposed to talk to your object only
through that interface. The rest of the details that make up your object
are now encapsulated, hidden behind the interface.

Once you are talking in terms of interfaces, who says that only one kind
of object may implement this interface? Having different objects expose
the same interface and then writing code that works on any object with
the interface is called polymorphism. It is very useful. (eg toString)

When implementing multiple types that differ in only some details, it
can be helpful to simply make the prototype of your new type derive
from the prototype of your old type and have your new constructor call
the old one. This gives you an object type similar to the old type but
for which you can add and override properties as you see fit.
    */