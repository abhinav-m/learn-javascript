/* Write a function like Ruby's map, but with this syntax: map(function, array) */

function map(fn,array) {
	var result = [];
	for(var i = 0;i<array.length;i++)
		result.push(fn(array[i]))
	return result;
}


