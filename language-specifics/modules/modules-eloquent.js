/*
Modules divide programs into clusters of code that, by some criterion,
belong together.

Though JavaScript provides no actual module construct yet, objects
can be used to create publicly accessible subnamespaces, and functions
can be used to create an isolated, private namespace inside of a module.

In a “flat” project, which isn’t structured as a set of modules, it is not
apparent which parts of the code are needed to use a particular function.

Putting pieces of functionality that stand on their own into separate
files and modules makes them easier to track, update, and share because
all the various pieces of code that want to use the module load it from
the same actual file.

Taking this idea even further, imagine an online service that tracks
and distributes hundreds of thousands of such libraries, allowing you to
search for the functionality you need and, once you find it, set up your
project to automatically download it.

This service exists. It is called NPM (npmjs.org). NPM consists of an
online database of modules and a tool for downloading and upgrading
the modules your program depends on. It grew out of Node.js, the
browserless JavaScript environment , but
can also be useful when programming for the browser.
*/

//-------------------------------------------------------------------------

/*Functions are the only things in JavaScript that create a new scope. So
if we want our modules to have their own scope, we will have to base
them on functions. */

var months = ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

function monthName(number) {
    return months[number]
}

/*If this code was in a module, the monthName would be part of the modules
 interface, and the months variable would be part of the global scope. */
console.log(monthName(1));

/*The above code can be improved as: 
  This helps remove names from the global scope 
  
  In the following example names is a local variable in 
  an unnamed function.
  The function is created and immediately called , with its return value 
  the actual function  (monthName above) that we want to use
     
  We could have pages and pages of code
  in this function, with 100 local variables, and they would all be internal
  to our module—visible to the module itself but not to outside code.
  */
var monthMod = function() {
    var names = ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    return function(number) {
        return names[number];
    }
}();

console.log(monthMod(3));

/*A similar pattern can be used to isolate code 
from the outside world entirely as shown: */

(function() {
    function cube(x) {
        return x * x * x
    }
    var hundred = 100;

    console.log(cube(hundred))
})();

/* The above function does not expose any interface
   thus doesn't pollute the namespace in js. 

   The syntax rules of functions are as follows: 
   Function declarations eg function ABC ()... require a name (ABC here)
   In the above statement, since we are not providing a name to the function,
   and we want javascript to treat it as an expression and not a declaration, 
   we wrap the function in parenthesis

   You can think of the extra wrapping parentheses as
    a trick to force the function to be interpreted as an expression. */

//-------------------------------------------------------------------------

/* Objects as interfaces
    What if we wanted multiple functions exposed from our module 
    We must wrap the function in an object. */

var monthAndNumber = function() {
    var names = ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return {
        name: function(number) { return names[number]; },
        number: function(name) { return names.indexOf(name) }
    }
}();

console.log(monthAndNumber.name(monthAndNumber.number('Aug')));


//-------------------------------------------------------------------------

/*  For bigger modules, gathering all exported values into an 
    object at the end of the function becomes awkward since many of the exported
    functions are likely to be big and you’d prefer to write them somewhere
    else, near related internal code. 
        
    A convenient alternative is to declare
    an object (conventionally named exports ) and add properties to that
    whenever we are defining something that needs to be exported.
    
    In the following example, the module function takes its interface object as an
    argument, allowing code outside of the function to create it and store
    it in a variable. (Outside of a function, this refers to the global scope
    object.) */

(function(exports) {
    var names = ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    exports.name = function(number) {
        return names[number]
    };

    exports.number = function(name) {
        return names.indexOf(name);
    };
})(global.monthMap = {});



console.log(monthMap.name(monthMap.number('May')))

//-------------------------------------------------------------------------

/* The previous pattern is commonly used by JavaScript modules intended
for the browser. The module will claim a single global variable and wrap
its code in a function in order to have its own private namespace.
 But this pattern still causes problems if multiple modules happen to claim
the same name or if you want to load two versions of a module alongside
each other.

With a little plumbing, we can create a system that allows one module
to directly ask for the interface object of another module, without going
through the global scope. 

Our goal is a require function that, when
given a module name, will load that module’s file (from disk or the Web,
depending on the platform we are running on) and return the appropriate
interface value.

This is similar to how it would be implemented in Node.

The following is a minimal implementation of require :
function require ( name ) {
var code = new Function (" exports " , readFile ( name ));
var exports = {};
code ( exports ) ;
return exports ;
}
console . log ( require (" weekDay ") . name (1) );
// → Monday

*/


//-------------------------------------------------------------------------