/*Write a function called 'sum' that should be usable as follows:

sum(1, 2, 3) // should return 6
sum(1)(2)(3) // should return 6
sum(1, 2)(3) // should 6

Note, the function can have any number of arguments, not just 3.*/
/* 
function sum() {
    
     var arrayOfArgs = [...args].reduce((sum, elem) => sum + elem, 0);


    if (argArray.length === 1)
        return argArray[0];
    else {
        var value = argArray.reduce((sum, elem) => sum + elem, 0);
        var addFn = function(value, ...args) {
            var sum = [...args].reduce((sum, elem) => sum + elem, 0);
            return sum + value;
        }
        return addFn;
    }

} */



/* function sum(...args) {
    var val = args.reduce((a, b) => a + b)


    return function(...subargs) {
        var addedArr = [...subargs].push(val);
        (...subargs) => subargs.length === 0 ? val : sum(addedArr, 0);
    }
} */

/*
/*const sum = (...args) =>
      (...subargs) => subargs.length === 0
                      ? args.reduce((a, b) => a + b)
                      : sum(...subargs, ...args)*/

function sum(...args) {
    return function(...subargs) {
        return (subargs.length === 0 ? args.reduce((a, b) => a + b) : sum(...subargs, ...args));
    }
}

/* const sum = (...args) =>
   var val = args.reduce((a, b) => a + b):
       (...subargs) => subargs.length === 0 ?
       args.reduce((a, b) => a + b) :
       sum(...subargs, ...args);  */

console.log(sum(1, 2, 3)(6)());