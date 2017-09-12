var globalVar;

$(document).ready(function() {
    //Scope example
    //This variable has global scope (window scope) in browser
    globalVar = "globalScope";
    console.log("currently global scope");
    differentScope();
    //Will print true because hold the same reference.
    var object1 = { a: 1, b: 2, c: 3 };
    var object2 = object1;
    console.log(object1 == object2);


    //Closure examples
    var divByTwo = closureDivideExample(2);
    var divByThree = closureDivideExample(3);
    //Should Print 2 and 3
    console.log(divByTwo(4));
    console.log(divByThree(9));
    //CLOSURE IIFE example
    //This returns incorrectly bounded function to current reference of i
    var exampleObjects = [{ prop: 3 }, { prop: 5 }, { prop: 6 }];
    var setProps = closureWrongWay(exampleObjects);
    var firstProp = setProps[0];
    var secondProp = setProps[1];
    console.log("Should be 11, but due to wrong closure prints 13. " + firstProp.prop());
    console.log("Should be 12,but due to wrong closure prints 13 " + secondProp.prop());
    var myPrivProp = closurePrivatePropExample();
    //This corrects above problem , and assigns the actual value on each loop iteration by 
    //invoking the function immediately using   Immediately Invoked Function Expression (IIFE)
    var setProps = closureRightWay(exampleObjects);
    var firstProp = setProps[0];
    var secondProp = setProps[1];
    var thirProp = setProps[2];

    console.log("Should be 10 " + firstProp.prop); //note how we are not calling the function here , it's already called with frozen value of i.
    console.log("Should be 11 " + secondProp.prop);
    console.log("Should be 12 " + thirProp.prop);

    //Example on making properties private using closure. 	
    //Should reference inner property value
    console.log("Should be 10 " + myPrivProp.getProp());
    myPrivProp.setProp(11);
    console.log("Should be 11 " + myPrivProp.getProp());

    //Optional arguments example

    optionalArguments(1, 2);
    optionalArgumentsExp(2);

    testGlobal();
});


function differentScope() {
    //WRONG! globalVar get's hoisted to the top and console.log prints undefined, not the global variable.
    console.log("different value here for globalVar :" + globalVar);
    var globalVar;
    globalVar = "localFunctionScope";
    console.log("different value here for globalVar :" + globalVar);

    {
        //Doesnt create a local variable {} is basically an object declaration
        globalVar = "stillFunctionCreatedScope";
        console.log("this is the same variable as outside as { } doesn't create it's own scope. Proof:" + globalVar);
    }

    {
        //However let keyword allows declaration of block scope local variable
        let globalVar = "blockCreatedScope";
        console.log("'let' keyword allows creation of variables with scope within the current block. Proof:" + globalVar);
    }

    console.log("this will print the later initialized variable as it's scope is shared (declared using var) ie function's scope. Proof:" + globalVar);
    globalVar = "changed-in-different-scope";
}


function testGlobal() {
    console.log(" global variable's value.Proof: " + globalVar);

    //This will throw reference error as variables declared with let are TDZ The temporal dead zone is not a syntactic location, but rather the time between the variable (scope) creation and the initialisation.  and not initialised. 
    //let globalVar = "makinitLocal";
}


function optionalArguments(a, b, c) {
    //Should print 6
    //If provided with less arguments, one variable will get value undefined, printed value will be NaN.
    //We can use optional arguments as, this gives a "default argument" makes function flexible.
    if (c === undefined)
        c = 0;

    console.log(a + b + c);

}

//Exponentiation example. (squares without value of b, else exponentiates to the value of b provided.)
function optionalArgumentsExp(a, b) {
    if (b === undefined)
        b = 2;
    var res = 1;
    for (var count = 0; count < b; count++)
        res = res * a;
    console.log("Prints square if provided with no argument, otherwise can be exponentiated as needed " + res);
}


//Local variables are created each time a function is called, thus using nested function calls can "save/freeze a local variable declaration"
//This property of Javascript is called closure. Local variables are created for every instance of function called and not "trampled over"
function closureDivideExample(number) {
    console.log("Value of frozen variable number = " + number);
    var fn = function divBy(num) {
        return num / number;
    }

    return fn;
}


function closurePrivatePropExample() {
    var privProp = 10;

    // We are returning an object with some inner functions​
    // All the inner functions have access to the outer function's variables​

    return {
        // This inner function will return the UPDATED privProp variable​
        // It will return the current value of privProp, even after the setProp function changes it
        getProp: function() {
            return privProp;
        },

        setProp: function(value) {
            privProp = value;
        }
    }


}


function closureWrongWay(objects) {

    var myNum = 10;
    //Each object's property is being assigned myNum+i
    //However since the function will be called when the closure get's initialized and used, this will return wrong value.
    //Value of i will be 3 (last value in loop as loop gets executed in outer function call.) when this function is actually used.
    //Can be fixed in two ways, IIFE as shown below, or by using let keyword for variable i.
    for (var i = 0; i < objects.length; i++)
        objects[i]["prop"] = function() {
            return myNum + i;
        }

    return objects;
}

function closureRightWay(objects) {
    var i;
    var myNum = 10;
    //Here we use  Immediately Invoked Function Expression (IIFE) to solve this shortcoming
    for (i = 0; i < objects.length; i++) {
        objects[i]["prop"] = function(j) {
            return function() {
                return myNum + j;
            }()
        }(i); //By adding() at the end of the function we execute it immediately and return value of myNum +j, instead of returning function.
    } //Immediately invoke the function with current value of i passed to j after each iteration therefore correcting it.
    return objects;
}