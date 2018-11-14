/* 
An object is iterable if
it defines it's iteration behaviour,
such as what values are looped over in a for...of construct,
or the spread syntax.

This is done by the Symbol.iterator property
meaning the object or it's prototype 
or any one up the prototype chain must implement 
the Symbol.prototype property.
*/


//An iterable object 
let iterableObject = {
    //Define the Symbol.iterator 
    //property as a generator function
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
    }
}

//Now we can iterate over the object with the for .. of loop

for(let value of iterableObject){
    console.log(value)
}

//We can also use it with the spread syntax.
console.log([...iterableObject])