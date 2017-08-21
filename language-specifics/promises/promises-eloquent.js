/* Promises wrap an asynchronous action in an object, which can be passed around and told
to do certain things when the action finishes or fails.

Promises help you naturally handle errors, and write cleaner code by not having callback parameters, and without modifying the underlying architecture (i.e. you can implement them in pure JavaScript and use them to wrap existing asynchronous operations).

eg syntax new Promise(  //executor function(resolve, reject) { ... } );

Executor : A function that is passed with the arguments resolve and reject.
The executor function is executed immediately by the Promise implementation,
passing resolve and reject functions
(the executor is called before the Promise constructor even returns the created object).
The resolve and reject functions, when called, resolve or reject the promise, respectively.

The executor normally initiates some asynchronous work, and then, once that completes, 
either calls the resolve function to resolve the promise or else rejects it if an error occurred.
If an error is thrown in the executor function, the promise is rejected. 
The return value of the executor is ignored.

A Promise is a proxy for a value not necessarily known when the promise is created. 
It allows you to associate handlers with an asynchronous action's eventual success value or failure reason. 
This lets asynchronous methods return values like synchronous methods: instead of immediately returning the final value, 
the asynchronous method returns a promise to supply the value at some point in the future.

A Promise is in one of these states:

pending: initial state, neither fulfilled nor rejected.
fulfilled: meaning that the operation completed successfully.
rejected: meaning that the operation failed.

A pending promise can either be fulfilled with a value, or rejected with a reason (error). 

When either of these options happens, the associated handlers queued up by a promise's then method are called.

(If the promise has already been fulfilled or rejected when a corresponding handler is attached,
the handler will be called, so there is no race condition between an asynchronous operation completing 
and its handlers being attached.)

Promise.prototype.catch(onRejected)

Appends a rejection handler callback to the promise, 
and returns a new promise resolving to the return value of the callback if it is called, 
or to its original fulfillment value if the promise is instead fulfilled.

Promise.prototype.then(onFulfilled, onRejected)

Appends fulfillment and rejection handlers to the promise, and returns a new promise 
resolving to the return value of the called handler,
or to its original settled value if the promise was not handled
  (i.e. if the relevant handler onFulfilled or onRejected is not a function).

*/

//------------------------------------------------------------------------------------
/* Creating a promise:
A Promise object is created using the new keyword and its constructor.
This constructor takes as its argument a function, called the "executor function".
This function should take two functions as parameters. 
The first of these functions (resolve) is called when the asynchronous task completes successfully 
and returns the results of the task as a value.
 The second (reject) is called when the task fails, and returns the reason for failure,
  which is typically an error object. */


const myFirstPromise = new Promise((resolve, reject) => {
    // Do something asynchronously which
    // eventually calls either:
    //    resolve(somevalue)
    //   or
    //    reject(somevalue)
})


//------------------------------------------------------------------------------------

//This is how a simple function can be provided with a promise functionality
//Resolve and reject here represent the completion/failure of the xmlhttprequest object
function myAsyncFunction(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
};


//------------------------------------------------------------------------------------
/* We call resolve(...) when what we were doing made async successful, and reject(...) when it failed.
        In this example, we use setTimeout(...) to simulate async code. 
        In reality, you will probably be using something like XHR or an HTML5 API.*/

let myPromise = new Promise((resolve, reject) => {


    //Using setTimeout to simulate async code.
    setTimeout(() => resolve("Promises are done for!"), 1000);
})
myPromise.then((message) => console.log(message))
    // message is whatever we passed in the resolve(...) function above.
    // It doesn't have to be a string, but if it is only a succeed message, it probably will be.

/* Understanding the chain of events:
1. A new promise is created with the declaration let myPromise = , and the EXECUTOR function provided is called 
IMMEDIATELY, even before the new promise object that was created is returned.
2. The executor function has been passed two functions  resolve and reject which set the status of the promise to
fulfilled or rejected, respectively. Asynchronous operation is simulated with setTimeout, when it completes, it calls
resolve() with the string "Promises are done for!". This sets the state of the promise object to "RESOLVED"
3. The Promise.prototype.then(onFulfilled, onRejected) function has added a onFullFilled handler to the promise
which is called from resolve() in the second step (as resolve represents fulfillment of the promise) this logs the 
message in the console. 
4. NOTE : .then also  returns a new promise  resolving to the return value of the called handler,can be used for 
chaining purposes. */

//------------------------------------------------------------------------------------