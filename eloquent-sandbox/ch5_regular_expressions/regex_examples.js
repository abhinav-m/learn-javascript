/* When you put a plus sign ( + ) after something in a regular expression, it
indicates that the element may be repeated more than once. Thus, /\d+/
matches one or more digit characters. */
console.log(/\d+/.test(123)); //-> true.

//The star ( * ) has a similar meaning but also allows the pattern to match zero times
console.log(/\d*/.test()); // -> true.

//A question mark makes a part of a pattern optional, meaning it may occur zero or one time.
console.log(/colou?r/.test('color')); //Logs true
console.log(/colou?r/.test('colour')); //Logs true

/* To indicate that a pattern should occur a precise number of times, use curly
braces. Putting {4} after an element, for example, requires it to occur exactly
four times. It is also possible to specify a range this way: {2,4} means the
element must occur at least twice and at most four times. */

let dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/; //Pattern for testing date time(simple)
console.log(dateTime.test('5-3-1993 5:30')); //logs true.

/* You can also specify open-ended ranges when using curly braces by omitting
the number after the comma. So {5,} means five or more times. */

console.log(/\d{3,}/.test('244')); //logs true when 3 or more digits are present(open ended range.)

/* To use an operator like * or + on more than one element at a time, you have to
use parentheses. A part of a regular expression that is enclosed in parentheses
counts as a single element as far as the operators following it are concerned. */

//Matches strings like starting with la.. and group matches any number
//of da daa daaa because of parenthesis and + operator.
console.log(/la+(da+)+/.test('laaaaaadadaadaaa')); //Logs true.

/* The test method is the absolute simplest way to match a regular expression.
It tells you only whether it matched and nothing else. Regular expressions also
have an exec (execute) method that will return null if no match was found
and return an object with information about the match otherwise. */

let match = /\d+/.exec('one two 100');
console.log(match);
//output [ '100', index: 8, input: 'one two 100' ] -> string matched, index found at(beginning),input.
console.log(/\d+/.exec('one two')); //output null
//Strings have a match method behaving similarly.
console.log('one two 100'.match(/\d+/)); //[ '100', index: 8, input: 'one two 100' ]

/* 
When the regular expression contains subexpressions grouped with paren-
theses, the text that matched those groups will also show up in the array.
The whole match is always the first element. The next element is the part
matched by the first group (the one whose opening parenthesis comes first in
the expression), then the second group, and so on. */

let quotedText = /"([^"]*)"/; //Matches characters in quotes "" ,forming a group with characters not having quotes ""
//First result is the whole match , second is the first group matched (using parenthesis) and so on.
console.log(quotedText.exec('I say "hi"')); // [ '"hi"', 'hi', index: 6, input: 'I say "hi"' ]

/* 
When a group does not end up being matched at all (for example, when fol-
lowed by a question mark), its position in the output array will hold undefined . */

console.log(/bad(ly)?/.exec('bad'));
// → [ 'bad', undefined, index: 0, input: 'bad' ]

/* 
Similarly, when a group is matched multiple times, only the last match ends
up in the array. */
console.log(/(\d)+/.exec('123'));
//3 present in array(last match.)
// → ['123', '3', (index: 0), (input: '123')];

/* Creating date object from a string */
function getDate(string) {
  //Use parenthesis to group values of date,month and year ignoring the whole match with _ (first argument)
  let [_, date, month, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
  return new Date(year, month - 1, date);
}

console.log(getDate('25-3-1993'));

/* If we want to enforce that the match must span the whole string, we can add
the markers ^ and $ . The caret matches the start of the input string, while the
dollar sign matches the end. */

//So, /^\d+$/ matches a string consisting entirely of one or more digits,
console.log(/^\d+$/.test('22554252'));

// /^!/ matches any string that starts with an exclamation mark,
console.log(/^!/.test('!test'));

// /!$/ matches any string ending with an exclamation mark.
console.log(/!$/.test('test!'));

// /x^/ does not match any string (there cannot be an x before the start of the string). can be thought of as invalid.
console.log(/1^/.test('xxsds'));

/* 
A word boundary can be the
start or end of the string or any point in the string that has a word character
(as in \w ) on one side and a nonword character on the other.

Note that a boundary marker doesn’t match an actual character. It just
enforces that the regular expression matches only when a certain condition
holds at the place where it appears in the pattern.
*/

console.log(/cat/.test('concatenate'));
// → true
//Word boundary can be anything (non alphanumeric character.)
//Just enforces that the regular exp matches the conditions
console.log(/\bcat\b/.test('con.cat enate'));
// → true
console.log(/\bcat\b/.test('con cat-enate'));
// - true
console.log(/\bcat\b/.test('con.catenate'));
// - false

/* The pipe character ( | ) denotes a choice between the pattern to its
left and the pattern to its right. */

let testDate = /\b\d+ (Jan|\d{1,2}|Feb)s?\b/;

console.log(testDate.test('14 25s'));
// → true

let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.test('15 pigs'));
//149; // → true
console.log(animalCount.test('15 pigchickens'));
// → false

//Pattern which matches a binary number followed by b
// or a decimal number, or a hex number.
console.log(/\b([01]+b|[\da-f]+h|\d+)\b/.test('105252'));

//Replace method which replaces bc with ef in string.
console.log('abcbcbcd'.replace(/bc/, 'ef'));

//If 'g' is added, all values of 'bc' are replaced.
console.log('abcbcbcd'.replace(/bc/, 'ef'));

//Replacing firstname and lastname in a name string
//Matches with parenthesis are accessed with $1 $2 ... $9 Whole match can be referred to  as $&
console.log('Abhinav, Mishra'.replace(/(\w+), (\w+)/, '$2-$1'));

//Replacement can be done using functions as well.
//first argument is the string, convert it to uppercase.
console.log(
  'cid is better than fbi'.replace(/\b(cid|fbi)\b/g, str => str.toUpperCase())
);

let stock = '1 lemon 10 cabbages and 101 eggs';

//The first value is the whole match, amount is the first parenthesis argument.
//unit is the second parenthesis argument.
function decreaseStock(match, amount, unit) {
  amount -= 1;

  if (amount === 0) {
    amount = 'No';
  } else if (amount === 1) {
    //Remove plural 's' from string.
    unit = unit.slice(0, unit.length - 1);
  }
  return amount + ' ' + unit;
}

//g is important to replace all matches.
console.log(stock.replace(/(\d+) (\w+)/g, decreaseStock));

function stripComments(code) {
  //Regex to remove comments in code.
  return code.replace(/\/\/.*|\/\*[^]*\*\//g, '');
  /*
  /\/\ -> Two escaped backslashes \\
  '.' -> Any character except line break(newline \n character)
  '*' -> all characters.
  '|' -> Or statement
   \/\* -> Escaped backslash and * 
   [^]* -> Any character(s) not in the empty set of character ^ is not [] is set of characters. * represents many.
   \*\/ Escaped * with an escaped \ character -> *\ matching end of the block comment.
  
  Matches // comments with anything in front of them
  */
}
console.log(stripComments('x= 10; //ten!'));

//This fails because [^*] is a greedy matcher,it will go to the end of the string and backtrack from there
//Which will lead to the 2nd */ being encountered, and treated as the end of the regex.
console.log(stripComments('1 /* a */+/* b */ 1'));

/* If you put a question mark after them ( +? , *? , ?? , {}? ), they become
nongreedy and start by matching as little as possible, matching more only when
the remaining pattern does not fit the smaller match. */
console.log('1 /* a */+/* b */ 1'.replace(/\/\/.*|\/\*[^]*?\*\//g, ''));
