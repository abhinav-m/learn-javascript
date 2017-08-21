//This is how a class is initialized in javascript
//This object's prototype property will be taken from Object
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.description = function() {
        console.log("My name is " + this.name + ". I am " + this.age + " years old.");
    }
}

/*Properties of objects are actually not directly stored in objects, but linked to the object 
instance through the prototype object (on constructor). __proto__ property 
Thus methods can be found walking upwards the prototype chain.*/
function Animal(species, name, diet) {
    this.diet = diet;
    this.name = name;
    this.species = species;
    this.description = function() {
        console.log("The name of this animal is " + this.name + ". It belongs to the species " + this.species);
    };
    this.eats = function() {
        console.log("This animal has a " + diet + " diet.");
    }

}

function Car(hp, model, company) {
    this.hp = hp;
    this.model = model;
    this.company = company;
    this.tires = 4;
};

Car.prototype.drive = function startCar() {
    console.log(this.company + " car started.");
}

Car.prototype.stop = function stopCar() {
    console.log(this.company + " car stopped. Model: " + this.model);
}

$(document).ready(function() {
    //This instantiates the object, the __proto__ property of this object will be the constructor function above.
    //There is a chaining upwards link from multiply inherited objects.
    var person1 = new Person("Abhinav", "24");
    person1.description();
    console.log("Proto property of person1 :" + person1.__proto__);
    //The constructor() function is inherited from prototype object which was used to instantiate this object.
    console.log(person1.constructor);
    //Constructor can be accessed through object instantiated from the parent directly, this can be useful when the 
    //original constructor can't be accessed for some reason.
    //NOTE: new keyword must be used to bind a new base or "this" or "base object" to the new object.
    var person2 = new person1.constructor("Akash", 27);
    person2.description();
    //This prints person 1's description again, which wont be modified by above.
    person1.description();

    //A generic object can also be created using the Object() constructor as shown:
    var newPerson = new Object();
    newPerson.name = "Dhruv";
    newPerson.age = 25;
    newPerson.description = function() {
        console.log("My name is " + this.name + ". I am " + this.age + " years old.");
    };
    newPerson.description();
    //Create() method can also be used to create new objects, this copies
    //the values instantiated in object person1, useful when only few objects are to be instantiated.
    //Not supported in IE8. 
    var newerPerson = Object.create(person1);
    newerPerson.description();


    /*JavaScript is often described as a prototype-based language
     — each object has a prototype object, which acts as a template object that it inherits methods and properties from. 
      An object's prototype object may also have a prototype object, which it inherits methods and properties from, and so on.
      This is often referred to as a prototype chain, 
      and explains why different objects have properties and methods defined on other objects available to them.*/
    var dog = new Animal("canine", "Billy", "carnivore");
    dog.description();
    dog.eats();

    //This should chain up and print the Object's(highest) __proto__ property.
    console.log(dog.__proto__.__proto__);

    /*In the following function call
    The browser initially checks to see if the person1 object has a valueOf() method available on it.
    It doesn't, so the browser then checks to see if the person1 object's prototype object (Person) has a valueOf() method available on it.
    It doesn't either, so the browser then checks to see if the Person() constructor's prototype object (Object) has a valueOf() method available on it. 
    It does, so it is called, and all is good!

    Methods and properties are not copied from one object to another in the prototype chain
     — they are accessed by walking up the chain as described above.*/
    console.log(dog.valueOf());

    /*Inherited properties and methods are defined in the 
    Object.ProtoType property , this can be called a sub-namespace
    Object.prototype is an object in itself, and  methods and properties defined here are inherited through
    the prototype chain.
    From MDN:he prototype property's value is an object, 
    which is basically a bucket for storing properties and methods that we want to be inherited by objects further down the prototype chain.
     */
    console.log("Animal constructor's prototype:" + Animal.prototype);
    console.log("Object constructor's prototype:" + Object.prototype);


    /*From MDN:
    The prototype property is one of the most confusingly-named parts of JavaScript
     — you might think that this points to the prototype object of the current object,
      but it doesn't (that's an internal object that can be accessed by __proto__, remember?). 
      prototype instead is a property containing an object on which you define members that you want to be inherited.*/

    //This property should be available to all built from Person() constrcutor, through the ProtoType object.
    Person.prototype.nextYear = function() {
            console.log(this.name + " will be " + this.age + 1 + " years old next year");
        }
        //Test This proves that the browser moves upwards in the prototype chain to find
        //This proves what we said earlier about the prototype chain, and the browser looking upwards in the chain
        //to find methods that aren't defined on the object instance itself rather than those methods being copied to the instance
    person1.nextYear();
    person2.nextYear();
    newerPerson.nextYear();

    //Even properties can be defined using prototype, but 
    //They are generally not useful, and don't make sense
    //As Test.ProtoType.prop = "abc"; <- Constant, why not define inside constructor function itself.
    //If we try Test.prototype.prop = this.first+this.last; <- WRONG , this refers to scope of window object.
    //Functions are best used here as shown above. Infact, this is a common pattern
    /*FROM MDN:  // Constructor with property definitions

		function Test(a, b, c, d) {
  		// property definitions
			};

			// First method definition

			Test.prototype.x = function() { ... }

		// Second method definition

		Test.prototype.y = function() { ... }

		// etc.
	*/
    //This is an example of the above mentioned property, defined at the top of the program.
    var merc = new Car("2455", "Mercedes-S", "Mercedes");
    var jag = new Car("5333", "Jaguar-Sports", "Jaguar");
    merc.drive();
    merc.stop();
    jag.drive();
    jag.stop();
});