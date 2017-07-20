

//This is how a class is initialized in javascript
//This object's prototype property will be taken from Object
function Person(name,age) {
	this.name = name;
	this.age = age;
	this.description = function () {
	console.log("My name is "+this.name+". I am "+this.age+" years old.");
	}
}



$(document).ready(function() {
	//This instantiates the object, the __proto__ property of this object will be the constructor function above.
	//There is a chaining upwards link from multiply inherited objects.
	var person1 = new Person("Abhinav","24");
	person1.description();
	//The constructor() function is inherited from prototype object which was used to instantiate this object.
	console.log(person1.constructor);
	//Constructor can be accessed through object instantiated from the parent directly, this can be useful when the 
	//original constructor can't be accessed for some reason.
	//NOTE: new keyword must be used to bind a new base or "this" or "base object" to the new object.
	var person2 = new person1.constructor("Akash",27);	
	person2.description();
	//This prints person 1's description again, which wont be modified by above.
	person1.description();

	//A generic object can also be created using the Object() constructor as shown:
	var newPerson = new Object();
	newPerson.name = "Dhruv";
	newPerson.age = 25;
	newPerson.description = function() {
	console.log("My name is "+this.name+". I am "+this.age+" years old.");
	};
	newPerson.description();

	
});