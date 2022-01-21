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
    to the lexical environment, thus executes successfully

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