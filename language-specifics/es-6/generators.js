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