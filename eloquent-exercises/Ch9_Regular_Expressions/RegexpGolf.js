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
let pattern_1 = /car|t/

console.log(pattern_1.test('catandcar'));

//pop and prop
let pattern_2 = /pr?op/

let cases = ["he pop", "prop in react", "hip hop", "k pop"]

verify(pattern_2, cases);



function verify(pattern, cases) {
    for (let str of cases) {

        console.log(`The pattern matched -> ${pattern.test(str)}`)
    }
}