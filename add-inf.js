/* Function to add all arguments provided and return result. */

//ES 5
function addAll(){
	var args = Array.prototype.slice.call(arguments);
	//  var args = [].slice.call(arguments);
	var sum = 0;
	for(var i = 0;i< args.length;i++)
		sum += args[i];

	return sum;
}

console.log(addAll())
console.log(addAll(2))
console.log(addAll(2,3,5))
console.log(addAll(2,-1,3,5))

//Using ES6
//Can't be an arrow function because using arguments object.
function addAll_es6() {
	return [...arguments].reduce((a,b) => a + b ,0)
}

console.log(addAll_es6())
console.log(addAll_es6(2))
console.log(addAll_es6(2,3,5))
console.log(addAll_es6(2,-1,3,5))

