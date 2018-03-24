// Analogous to the some method, arrays also have an every method. This one
// returns true when the given function returns true for every element in the array.
// In a way, some is a version of the || operator that acts on arrays, and every is
// like the && operator.
// Implement every as a function that takes an array and a predicate function
// as parameters. Write two versions, one using a loop and one using the some
// method.


function every(array, predicate) {
  for (let val of array) {
    if (!predicate(val))
      return false;
  }
  return true;
}

console.log(every_2([1, 2, 3, 4, 5], v => v > 0));

//Array.every is an inverse of array.some with the predicate flipped.
//Check is there a value which is true for !predicate?
//Some will return true in that case, failing our every statement.
//Flip result of some to get result of every.
function every_2(array, predicate) {
  return !array.some(val => !predicate(val));
}
/* If flipped predicate is true for value
   returned by array.some, every fails.
   if array.some returns false for flipped
   predicate, that means every value satisfies
   the predicate (unflipped) */