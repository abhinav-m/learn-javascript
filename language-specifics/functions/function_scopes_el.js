
var addAndMultiply = function() {
	var result = 0;

	var add = function(num) {
		result += num;
	}

	var multiply = function(num) {
		result *= num;
	}

	add(5);
	multiply(2);
	add(5);
	multiply(3);

	return result;
}

console.log(addAndMultiply())