/*An arrow function expression has a shorter syntax than a function
 expression and does not bind its own this, arguments, super, or new.target.
  These function expressions are best suited for non-method functions, and
   they cannot be used as constructors.

   The new.target property lets you detect whether a function or constructor
   was called using the new operator.
   In constructors and functions instantiated with the new operator,
   new.target returns a reference to the constructor or function.
   In normal function calls, new.target is undefined.

*/

var a = 5;
var b = 5;
console.log(add(a, b));

//One way to define arrow functions
//use return statements as
// { } consider the statements inside the functions to be multiple.
const arrowAdd = (a, b) => {
    console.log("new.target will be undefined here " + new.target);
    return (a + b);
}

var myObject = {
    i: 10,
    //Should print global object, and undefined
    b: () => console.log("Anonymous method inside object won't bind it's own this should be global this" + this.i + this),
    //Should print it's i and object itself.
    c: function() {
        console.log(this.i, this);
    }
}

myObject.b();
myObject.c();

//Arrow functions cant be used as constructors.
var Foo = () => {};
//var foo = new Foo(); // TypeError: Foo is not a constructor

// equivalent to: (param1, param2, …, paramN) => { return expression; }
const equivArrowAdd = (a, b) => (a + b)

const printNum = () => {
    console.log("Without arguments " + (a + b));
}

console.log("With arguments , no return function and { } block " + equivArrowAdd(a, b));
console.log("with arguments and {} block" + arrowAdd(a, b));
printNum();

//Parenthesize the body of function to return an object literal expression:
//params => ({foo: bar})
const objectReturn = () => ({ a: 1, b: 2 })


console.log(objectReturn());

function add(a, b) {
    return (a + b)
}



/* Rest parameters and default parameters are supported
(param1, param2, ...rest) => { statements }
(param1 = defaultValue1, param2, …, paramN = defaultValueN) => { statements }
*/

//The rest parameter syntax allows us to represent an indefinite number of arguments as an array.
function restExample(firstArg, secondArg, ...restArgs) {
    console.log("First argument " + firstArg + " Second argument " + secondArg + " Rest of the arguments " + restArgs);
}

//Rest parameters have been introduced to reduce the boilerplate code
// that was induced by the arguments object

function f(a, b) {
    //Here we use the arguments object to get the arguments in an array
    var args = Array.prototype.slice.call(arguments, f.length);
}

// to be equivalent of using rest parametrs

function f(a, b, ...args) {

}
restExample(1, 2, 3, 4, 5, 6, 7, 8, 9);
/*
Difference between rest parameters and the arguments object
There are three main differences between rest parameters and the arguments object:
> rest parameters are only the ones that haven't been given a separate name,
 while the arguments object contains all arguments passed to the function;
> the arguments object is not a real array, while rest parameters are Array instances, meaning methods like sort, map, forEach or pop can be applied on it directly;
the arguments object has additional functionality specific to itself (like the callee property). */

function multFact(factor, ...args) {
    return args.map(num => num * factor);
}
//gives error as the map function's first argument will be an array itself.
var arr = multFact(3, [1, 2, 3, 4, 5]);
//runs properly as ...args contains NUMBERS instead of an array.
var arr = multFact(3, 1, 2, 3, 4, 5, 6);
console.log(arr);


/* Arrow functions don't bind an arguments object
Thus, in this example, arguments is simply a reference to the same name in the enclosing scope:*/

var arguments = 3;
//Prints 3
const myFn = () => arguments;
console.log("In a normal function, this would return the arguments object, since it is an arrow function, it will return the arguments variable defined in enclosing scope \n" + myFn())

//In this example since the anonymous function is scoped inside
//another function, it will print the arguments object of said function
//Also uses closure
function foo() {
    var f = (i) => arguments[0] + i; // foo's implicit arguments binding
    return f(2);
}

console.log(foo(1)); // 3