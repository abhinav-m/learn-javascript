/* 
Generators allow the creation of iterators 
by maintaining an internal state.
This is done by creating a function whose 
execution is not continuous.

When called initially, 
generator functions do not execute any of their code, 
instead returning a type of iterator called a Generator.
When a value is consumed by calling the generator's next method, 
the Generator function executes until it encounters the yield keyword.

*/

//EXAMPLE A -> Range iterator using generators.
//Function returns an iterator known as a generator
function* makeRangeIterator(start = 0 ,end =Infinity ,step=1){
    let iterationCount = 0;
    for(let i = start;i<end;i++) {
        iterationCount++;
        yield i;
    }
    return iterationCount;
}

let rangeGenerator = makeRangeIterator(1,10,1);

let result = rangeGenerator.next();
while(!result.done){
    result = rangeGenerator.next();
    console.log(result)
}

//EXAMPLE B -> Fibonacci series using generators.
function* makefibonacciGenerator(count) {
    let current = 0,next=1;
    for(let i =0;i<count;i++) {
        let temp = current;
        yield current;
        current = next;
        next = current + temp;
    }
}

let fibonacciGenerator = makefibonacciGenerator(5);

let fibonacciResult = fibonacciGenerator.next();
while(!fibonacciResult.done){
    console.log(fibonacciResult);
    fibonacciResult = fibonacciGenerator.next();
}

//Advanced generators:
/* 
The next method returned by a generator 
can also accept a value which can be used to modify the 
internal state of the generator function.

A value passed to next() will be treated as
the result of the LAST YIELD expression that paused the generator.

*/

function* fibonacciRestartingGenerator() {
    let current = 0, next = 1;
    while(true) {
        let reset = yield current;
        let temp = current;
        current  = next
        next = next + temp;
        if(reset) {
            current = 0;
            next = 1;
        }
    }
}

let fiboRestartingIterator = fibonacciRestartingGenerator();
console.log("** Starting restarting generator **")
console.log(fiboRestartingIterator.next())
console.log(fiboRestartingIterator.next())
console.log(fiboRestartingIterator.next())
console.log(fiboRestartingIterator.next())
console.log("** Resetting state of generator **")
//Here after the generator is resumed from yielding the last 
//value ie,2 it resets its state by the value passed to it true.
console.log(fiboRestartingIterator.next(true))
console.log(fiboRestartingIterator.next())
console.log(fiboRestartingIterator.next())
console.log(fiboRestartingIterator.next())