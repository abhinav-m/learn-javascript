var myObject = {
    'abcd': 1,
    'xyz': 2,
    3: 'xyz'
}

console.log(myObject.xyz) //Evaluates property itself , must be a valid variable name, and directly names the property
console.log(myObject['a' + 'b' + 'c' + 'd']) //Evaluates the expression in square brackets to access the property
console.log(myObject[3]) // Not a valid variable name therefore squarebrackets used to evaluate.

//-------------------------------------------------------------------------------------------------- 

/*Arguments object: Whenever a function is called, a special variable named arguments is added
to the environment in which the function body runs. This variable refers
to an object that holds all of the arguments passed to the function.
Remember that in JavaScript you are allowed to pass more (or fewer)
arguments to a function than the number of parameters the function
itself declares. */

function myFunction() {
    //Converting the arguments object to an array.
    var args = Array.prototype.slice.call(arguments)
    for (let i = 0; i < args.length; i++)
        console.log(`Argument ${i+1} =${args[i]}`)
}

myFunction(1, 2, 3, 4, 5, 6, 7, 8)


//--------------------------------------------------------------------------------------------------
/*The global scope, the space in which global variables live, can also be
approached as an object in JavaScript. Each global variable is present as
a property of this object. 

-> In browsers, the global scope object is stored
in the window variable.

-> In Node the 'global' variable is used to store the global object.*/
console.log(global)

//--------------------------------------------------------------------------------------------------


//Won't work strings are immutable.
var str = 'abhinav'

str[3] = 'X'

console.log(str)

var object1 = { value: 10 }
var object2 = object1;
var object3 = { value: 10 }

console.log(object1 === object2) // true because points to same reference
console.log(object1 === object3) // false compares reference, object 3 has other reference.