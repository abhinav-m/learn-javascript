/*  DEFINITION:
    Closures are a combination of the function enclosed or bundled together
    with references to its surrounding state (lexical environment)
    https://stackoverflow.com/questions/12599965/lexical-environment-and-function-scope
*/



// CASE 1:

// Parent function
// function closure_one() {
//     // Closure with variable "test"
//     var test = "Abhinav";
//     // Inner function has access to 
//     // test variable without it 
//     // being declared (closure)
//     function displayTest(){
//         console.log(test);
//     }
//     displayTest();
// }

// // parent function call
// closure_one();

/*  CASE 2:
    Here instead of executing the function
    we return the inner function. The inner
    function,in javascript will still have access
    to the lexical environment after being returned
    , thus executes successfully

*/

// function closure_two() {
//     // Closure with variable "test"
//     var test = "Abhinav";
//     // Inner function has access to 
//     // test variable without it 
//     // being declared (closure)
//     function displayTest(){
//         console.log(test);
//     }
//     // Return the function 
//     // instead of executing it
//     return displayTest
// }

// // Initialise returned closure function
// var closureFuncTwo = closure_two();
// // Execute and see variable is still printed
// // Thus maintaining its state
// closureFuncTwo();


/*  CASE 3:
    Creating a function factory with 
    a closure. Simple example to make
    a multiplier using a closure
*/

// Argument is in the lexical environment
function makeMultiplier(x) {
    // Return function with
    // enclosed "x" in the lexical environment 
    return function(y) {
        return x * y;
    }
}

// Factory of multipliers by a particular number
// Has numbers 2,4,5 stored in their respective "x"
// lexical environment
var multiplyByTwo = makeMultiplier(2);
var multiplyByFour = makeMultiplier(4);
var multiplyByFive = makeMultiplier(5);

console.log(multiplyByTwo(3))
console.log(multiplyByFour(3))
console.log(multiplyByFive(3))