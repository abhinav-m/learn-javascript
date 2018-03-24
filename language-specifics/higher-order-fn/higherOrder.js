$(document).ready(function() {
    var myArray = [1, 2, 3, 4, 5];
    //Basic example, similar to foreach
    console.log('---forEach example');
    forEach(myArray, function(number) {
        number += 2;
	console.log(number);
    });
    //Similar forEach example
    console.log('---logEach example');
    logEach(myArray);
    //Functions creating new functions
    //Abstracting over ACTIONS, not values.
    //Also an example of closure
    var greaterThan10 = greaterThan(10);
    console.log(greaterThan10(11));
    //Another example of the same
    //Changes noisy function to boolean one.
    var changeFn = noisy(Boolean);
    changeFn(0);
    //Change example of control flow

    repeat(3, function(n) {
        unless(n % 2, function() {
            console.log(n + " is even.");
        });
    });


});

/* In the context of programming, these kinds of vocabularies are usually
called abstractions. Abstractions hide details and give us the ability to
talk about problems at a higher (or more abstract) level. */

//Here we have abstracted a function as action, and applied it
//to the array elements, thus , whatever function will be passed here
//will be automatically applied to each array element to get results as intended.
function forEach(array, action) {
    for (var i = 0; i < array.length; i++)
        action(array[i]);
}

/* Functions that operate on other functions, either by taking them as
arguments or by returning them, are called higher-order functions.
The term comes from mathematics, where the distinction between
functions and other values is taken more seriously.*/
function logEach(array) {
    for (var i = 0; i < array.length; i++)
        console.log(array[i]);
}

/*Higher-order functions allow us to abstract over actions, not just val-
ues. They come in several forms. For example, you can have functions
that create new functions. */

function greaterThan(m) {
    return function(n) {
        return n > m;
    }
}

/* Example of function changing other functions */

function noisy(f) {
    return function(arg) {
        console.log("calling with" + arg);
        var val = f(arg);
        console.log("called with ", arg, "got ," + val);
    }
}

/* Functions which provide new type of control flow can also be written */
//Example 1: Executes a function based on a condition.
function unless(test, then) {
    if (!test) then();
}
//Example 2: Executes a loop a required number of times.
function repeat(times, body) {
    for (var i = 0; i < times; i++)
        body();
}
