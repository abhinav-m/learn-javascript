/* 
Say you have a function primitiveMultiply that, in 20 percent of cases, mul-
tiplies two numbers, and in the other 80 percent, raises an exception of type
MultiplicatorUnitFailure . Write a function that wraps this clunky function
and just keeps trying until a call succeeds, after which it returns the result.
Make sure you handle only the exceptions you are trying to handle. 
*/

//Simple function to throw new error.
function MultiplicatorUnitFailure(message) {
  this.message = message;
}

//Function setup to fail a number of times.
function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure('Failed multiplying');
  }
}

function reliableMultiply(a, b) {
  //Execute function till it succeeds.
  while (true) {
    try {
      return primitiveMultiply(a, b);
    } catch (error) {
      //If error is not of type MultiplicatorUnitFailure, throw error,
      //Otherwise let it pass.
      console.log(error.message);
      if (!(error instanceof MultiplicatorUnitFailure)) {
        throw error;
      }
    }
  }
}

console.log(reliableMultiply(9, 7));
