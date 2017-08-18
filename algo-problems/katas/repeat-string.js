/* Write a function named repeater() that takes two arguments (a string and an integer), and returns a new string where the input string is repeated that many times. For example:

repeater('a', 5)
should return

'aaaaa'
and

repeater('Na', 16)
should return

'NaNaNaNaNaNaNaNaNaNaNaNaNaNaNaNa` */

const repeater = (string, n) => Array(n).fill(string).join("")
    //Recursive
const repeater = (s, n) => n < 1 ? '' : s + repeater(s, n - 1)