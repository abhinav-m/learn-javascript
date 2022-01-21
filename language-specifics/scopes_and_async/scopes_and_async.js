/* Case 1 : closure formed
    with each value of i 
    output is correct due to closure.
*/
// function asyncTask(value) {
//   setTimeout(() => {
//     console.log(value);
//   }, value * 1000);
// }

// for (var i = 1; i <= 5; i++) {
//   asyncTask(i);
// }

/* Case 2: 
    setTimeout is called directly
    simulating an async operation
    with the reference of var variable
    'j' j will have reference to it's 
    last value when loop exits ie,6
    Also, this code will be executed on stack
    while setTimeout will be queued in event 
    loop.
*/
// for (var j = 1; j <= 5; j++) {
//   setTimeout(function() {
//     console.log(j);
//   }, j * 1000);
// }

// //Note this is the same with an arrow function, since the variable
// //is declared with the var keyword.
// for (var j = 1; j <= 5; j++) {
//   setTimeout(() => {
//     console.log(j);
//   }, j * 1000);
// }

/* Case 3:
    setTimeout is called with 
    variable declared by using let
    simulating async operation,
    let is block scoped, thus each
    iteration causes a new value of 
    variable to be referenced from inside 
    setTimeout function.

*/

// for (let j = 1; j <= 5; j++) {
//   setTimeout(function() {
//     console.log(j);
//   }, j * 1000);
// }

//Same with arrow function inside setTimeout
// for (let j = 1; j <= 5; j++) {
//   setTimeout(() => {
//     console.log(j);
//   }, j * 1000);
// }

/* Case 4: 
   Wrapping setTimeout in an IIFE to 
   create a closure, and bind each 
   variable (declared using var)
   in the loop iteration.
// */
// for (var j = 1; j <= 5; j++) {
//   (function(j) {
//     setTimeout(function() {
//       console.log(j);
//     }, j * 1000);
//   })(j);
// }

// //Using an anonymous function for IIFE , arrow function inside.
// for (var j = 1; j <= 5; j++) {
//   (function(j) {
//     setTimeout(() => {
//       console.log(j);
//     }, j * 1000);
//   })(j);
// }

// //Using an arrow function for IIFE, and arrow function inside.
// for (var j = 1; j <= 5; j++) {
//   (j => {
//     setTimeout(() => {
//       console.log(j);
//     }, j * 1000);
//   })(j);
//}

/* Case 5:
   Using an async function and await with promises 
   to serialize operations(make them run one 
   after another) 

*/

//TODO: Read more about this.
// Note here we dont have to multiply
// 1000 by i  as each promise is waited upon
// to be fulfilled due to async /await (generators)
// function simulateAsync(i) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(i);
//     }, 1000);
//   });
// }
// //Each value is awaited and runs after 1 second.
// async function loop() {
//   for (var i = 1; i <= 5; i++) {
//     let returned = await simulateAsync(i);
//     console.log(returned);
//   }
// }

// loop();
