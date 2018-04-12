/*
Code golf is a term used for the game of trying to express a particular
program in as few characters as possible. 

Similarly, regexp golf is the
practice of writing as tiny a regular expression as possible to match a
given pattern, and only that pattern.

For each of the following items, write a regular expression to test
whether any of the given substrings occur in a string. The regular
expression should match only strings containing one of the substrings
described. Do not worry about word boundaries unless explicitly men-
tioned. When your expression works, see whether you can make it any
smaller.


*/

//car and cat
let pattern_1 = /car|t/;
//can also be /ca[rt]/
console.log('car and cat');
console.log(pattern_1.test('catandcar'));

//pop and prop
let pattern_2 = /pr?op/;

let cases = ['he pop', 'prop in react', 'hip hop', 'k pop'];

console.log('prop or pop');
verify(pattern_2, cases);

//ferry ferrari ferret
let pattern_3 = /ferr(et|y|ari)/;

console.log('ferrari ferry ferret');
verify(pattern_3, ['ferrari', 'ferry', 'ferret', 'ferrero']);

//any word ending in ious
let pattern_4 = /[a-z]ious/;

console.log('spacious', 'any word ending in ious');
verify(pattern_4, ['spacious ', 'luxurious', 'typhus']);

//Eloquent solution -> /ious\b/
function verify(pattern, cases) {
  for (let str of cases) {
    console.log(`The pattern matched -> ${pattern.test(str)}`);
  }
}

//A whitespace character followed by a period, comma, colon, or semicolon

console.log(
  'A whitespace character followed by a period, comma, colon, or semicolon'
);

let pattern_5 = / (.|,|:|;|)/;
//Eloquent solution -> /\s [.|,|:|;|/;
verify(pattern_5, ['ez .', 'hello :', 'Test ;', 'No;', 'False.', 'Incorrect:']);

//A word longer than six letters
let pattern_6 = /\w{7,}/;

//A whitespace character followed by a period, comma, colon, or semicolon
verify(pattern_6, ['tottenham', 'arsenal', '12345678', '123456']);

//A word without the letter e
console.log('A word without the letter e');
let pattern_7 = /\b[^\We]+\b/i;
verify(
  pattern_7,
  ['red platypus', 'wobbling nest'],
  ['earth bed', 'learning ape', 'BEET']
);
