//An iterator function that iterates over a collection (array in this case)
//Said to maintain it's internal 'state' which is a simple sequence here.
let makeIterator = function(arr){ 
    let currentIndex = 0; 
    //Curried function returns a new function
    return { 
        next(){ 
            //Simple check if index is out of bounds,
            //Return an object with current value of the iterator and 
            //a 'done' boolean which tells if the iterator has completed it's iteration.
            return currentIndex < arr.length 
                ? { value: arr[currentIndex++], done : false } 
                : { done: true}; 
        } 
    }; 
}

/* 
The method signature above is known as 
the iteration protocol, basically a next() function 
which gives the next value in the sequence ( or iterable)
and a boolean called done which represents whether the 
iterable has been consumed in it's entirety or not.
*/

let iteratorFunction = makeIterator([1,2]);

const value1 = iteratorFunction.next().value;
const value2 = iteratorFunction.next().value;

console.log(value1,value2)
console.log(iteratorFunction.next())

let iteratorFunctionTwo = makeIterator([1,2,3,4])
while(true) {
    let curIteration = iteratorFunction.next();
    if(curIteration.done)
    break;
    console.log(curIteration.value)

}

/* While it is easy to imagine that all iterators could be expressed as arrays,
 this is not true. Arrays must be allocated in their entirety, 
 but iterators are consumed only as neccessary 
 and thus can express sequences of unlimited size, 
 such as the range of integers between 0 and Infinity. */

 //EXAMPLE A -> Iterator to generate range

 function makeRangeIterator(start=0 , end = Infinity, step = 1) {
     //Assign local variables to start to keep the function pure
     //(private property)
     let currentValue = start;
     //To return the total times 
     let iterationCount = 0;
     return{ 
         next() {
        //Including the start and end value.
        if(currentValue <= end ) {
            let result = { value: currentValue, done:false }
            currentValue = currentValue + step;
            iterationCount++;
            return result;
        } else {
            //Return the iteration count when the iterator finishes.
            return { value:iterationCount , done:true};
        }
     }
    }
 }

 //Iterator to count
 let countIterator = makeRangeIterator(1,10,1);
 while(1){
     let current = countIterator.next();
     if(current.done) 
        break;
     console.log(current.value)
 }

 //Iterator to make even number series.
 let evenIterator = makeRangeIterator(2,10,2);
 while(1){
    let current = evenIterator.next();
    if(current.done) 
       break;
    console.log(current.value)
}


//EXAMPLE -> B 
// Iterator to generate fibonacci series
//upto count n

function fibonacciIterator(count) {
    let current =0 , next= 1;
    let total = 0;
    //Iterator is simply an object with a next() function
    // which returns the next value in the sequence
    let iterator = {
        next: function() {
            //If total number of elements in the series have been generated
           if(total < count ){ 
           //Current value of the iterator done -> whether iteration has completed.      
           let result = { value:current ,done:false};
           let temp = current;
           current = next;
           next = next + temp;
           total++;
           return result;
        } else {
            return { value:total,done:true}
        }

        }
    }
    return iterator;
}

let fiboIterator = fibonacciIterator(5);

while(1){
   let current = fiboIterator.next();
   if(current.done) 
      break;
   console.log(current.value)
}

/* 
Another way to use the iterator
*/

let oddIterator = makeRangeIterator(1,23,2);
let result = oddIterator.next();
while(!result.done) {
   console.log(result);
   result = oddIterator.next()
}
console.log(result)