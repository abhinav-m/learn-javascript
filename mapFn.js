function map(fn,array) {
	var result = [];
	for(var i = 0;i<array.length;i++)
		result.push(fn(array[i]))
	return result;
}

