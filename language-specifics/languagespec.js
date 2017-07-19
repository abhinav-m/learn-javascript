var globalVar;

$(document).ready(function() {
//This variable has global scope (window scope) in browser
globalVar = "globalScope";
console.log("currently global scope");
differentScope();
var object1 = {};
var object2 = object1;
console.log(object1==object2);
optionalArguments(1,2);
optionalArgumentsExp(2);
testGlobal();
});


function differentScope() {
//WRONG! globalVar get's hoisted to the top and console.log prints undefined, not the global variable.
console.log("different value here for globalVar :"+globalVar);
var globalVar;
globalVar = "localFunctionScope";
console.log("different value here for globalVar :"+globalVar);

{
//Doesnt create a local variable {} is basically an object declaration
 globalVar = "stillFunctionCreatedScope";
console.log("this is the same variable as outside as { } doesn't create it's own scope. Proof:"+globalVar);
}

{
//However let keyword allows declaration of block scope local variable
let globalVar = "blockCreatedScope";
console.log("'let' keyword allows creation of variables with scope within the current block. Proof:"+globalVar);
}

console.log("this will print the later initialized variable as it's scope is shared (declared using var) ie function's scope. Proof:"+globalVar);
globalVar = "changed-in-different-scope";
}


function testGlobal () {
console.log(" global variable's value.Proof: "+globalVar);
//This will throw reference error as variables declared with let are TDZ The temporal dead zone is not a syntactic location, but rather the time between the variable (scope) creation and the initialisation.  and not initialised. 
//let globalVar = "makinitLocal";
}


function optionalArguments (a,b,c) {
//Should print 6
//If provided with less arguments, one variable will get value undefined, printed value will be NaN.
//We can use optional arguments as, this gives a "default argument" makes function flexible.
if(c==undefined)
c=0;

console.log(a+b+c);

}


function optionalArgumentsExp(a,b){
	if(b==undefined)
	b = 2;
var res = 1;
for(var count = 0; count<b;count++)
res = res* a;
console.log("Prints square if provided with no argument, otherwise can be exponentiated as neede"+res);
}


//Local variables are created each time a function is called, thus using nested function calls can "save/freeze a local variable declaration"
//This property of Javascript is called closure. Local variables are created for every instance of function called and not "trampled over"
function closureDivideExample(number)
{
	var fn =	function divBy(num) {
		return =num/number;
	}

	return fn;
}



