//This is how a class is initialized in javascript
//This object's prototype property will be taken from Object

function Person(name, age, gender, interests) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.interests = interests;

};

Person.prototype.greeting = function() {
    console.log("Hello , my name is " + this.name);
}


function Teacher(name, age, gender, interests, subject) {
    //The call functions allows you to call some other function,
    //but in the correct context.First parameter is 'this' to
    //be passed to the function when invoking it, the rest
    //are those that should be passed to the function when invoked.
    //Note:Reassigning properties is possible to , but that is NOT inheritance.

    Person.call(this, name, age, gender, interests);
    this.subject = subject;
    /*
    We need to do one more thing before we move on. After adding the last line,
    Teacher.prototype's constructor property is now equal to Person(),
     because we just set Teacher.prototype to reference an object that inherits its properties from Person.prototype!
    Try saving your code, loading the page in a browser, and entering Teacher.prototype.constructor into the console to verify.
    */

};
Teacher.prototype = Object.create(Person.prototype);
Teacher.prototype.constructor = Teacher;
//This writes it's own version of greeting() function.
Teacher.prototype.greeting = function() {
    console.log("Hello, im a teacher My name is" + this.name);
}




$(document).ready(function() {
    var person = new Person("abhinav", 24, "M", "code");
    person.greeting();
    var myTeacher = new Teacher("ABC", 24, "F", "history", "history");
    myTeacher.greeting();
});