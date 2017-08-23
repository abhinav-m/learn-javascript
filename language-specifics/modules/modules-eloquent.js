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




//-------------------------------------------------------------------------

/*
    Evaluating data as code
    There are several ways to take data (a string of code) and run it as part
    of the current program.

    The most obvious way is the special operator eval , which will execute
    a string of code in the current scope. 
    
    This is usually a bad idea because it breaks some of the sane properties that scopes normally have, such as
    being isolated from the outside world.

*/

// A better way of interpreting data as code is to use the Function constructor. 

//This takes two arguments, a string containing a comma-seperated list of argument names,
// and a string containing the functions body.
var multiplyNums = new Function('x,y', "return x * y");

//logs 20
console.log(multiplyNums(5, 4))


//-------------------------------------------------------------------------



/* The following is a minimal implementation of require :

Lets break it down.
function require(name) {
    //We assume we have a readFile function that returns a string to us 
    //Using a function constructor, we use this string to create our function dynamically
    //and thus wrap it in it's own namespace.
    var code = new Function(" exports ", readFile(name));
    var exports = {};
    code(exports);
    return exports;
}


Assuming readFile(name) has a file which contains the following code:
//Note now we don't need to wrap this function since it is being executed
//in it's own namespace shown above since, reference of exports object is being passed 
//to it, we add properties we want to use to that object thus , importing it.
var names = [" Sunday " , " Monday " , " Tuesday ", " Wednesday ",
" Thursday " , " Friday ", " Saturday "];
exports . name = function ( number ) {
return names [ number ];
};

exports . number = function ( name ) {
return names . indexOf ( name ) ;
};

*/

//-------------------------------------------------------------------------

/* 
The simplistic implementation of require given previously has several 
problems. For one, it will load and run a module every time it is require
d, so if several modules have the same dependency or a require call is
put inside a function that will be called multiple times, time and energy
will be wasted.

This can be solved by storing the modules that have already been
loaded in an object and simply returning the existing value when one is
loaded multiple times.

The second problem is that it is not possible for a module to directly
export a value other than the exports object, such as a function. For
example, a module might want to export only the constructor of the
object type it defines.

Right now, it cannot do that because require
always uses the exports object it creates as the exported value.

The traditional solution for this is to provide modules with another
variable, module , which is an object that has a property exports .

This property initially points at the empty object created by require but can
be overwritten with another value in order to export something else. */

/* 

function require ( name ) {
//Checking if our cache has the property name, (name of the module)
//returning it if it does.

if ( name in require . cache )
return require . cache [ name ];

//Now we pass two arguments to our Function constructor, module and exports.
var code = new Function (" exports , module ", readFile ( name ));
var exports = {} , module = { exports : exports };
//Executing and setting the references same as above.
code ( exports , module ) ;
//IMPORTANT PART:  
// Using the require.cache property (which is declared below)
// We add the current module name passed to require as a PROPERTY of the cache object
// and the value of the property is the module.exports object
require . cache [ name ] = module . exports ;
return module . exports ;
}
//Creating an object without a prototype
require . cache = Object . create ( null ); 

We now have a module system that uses a single global variable ( require )
to allow modules to find and use each other without going through the
global scope.
This style of module system is called CommonJS modules, after the
pseudo-standard that first specified it. It is built into the Node.js sys-
tem. Real implementations do a lot more than the example



*/