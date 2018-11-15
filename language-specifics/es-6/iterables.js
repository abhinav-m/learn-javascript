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


/* 
yield* is an expression
that iterates over the operand and
yields EACH value returned by it.
The value of yield* expression itself is the value returned 
by that iterator when it's closed (i.e., when done is true).
*/

function* generatorOne() {
    yield 2;
    yield 3;
    yield 4;
}


function* generatorTwo() {
    yield 1;
    //Delegates the iterator returned from generatorOne to be run here.
    yield* generatorOne();
    yield 5;
    yield 6; 
}

let iteratorTwo = generatorTwo();
let iteratorThree = generatorTwo();
for(value of iteratorTwo){
    console.log(value);
}

console.log(iteratorThree.next())
console.log(iteratorThree.next())
console.log(iteratorThree.next())
console.log(iteratorThree.next())
console.log(iteratorThree.next())
console.log(iteratorThree.next())
console.log(iteratorThree.next())
