/*
Template literals are string literals allowing embedded expressions. 
You can use multi-line strings and string interpolation features with them. 
They were called "template strings" in prior editions of the ES2015 specification. */


/*
Template literals are enclosed by the back-tick (` `) (grave accent) character instead of double or single quotes.
*/
var templateString1 = `Example of template strings`
console.log(templateString1)

/* Template literals can contain place holders.
These are indicated by the Dollar sign and curly braces (${expression}).
The expressions in the place holders and the text between them get passed to a function.
 The default function just concatenates the parts into a single string. */

console.log(`${"text"}test`) //prints texttest

/*
If there is an expression preceding the template literal (tag here),  the template string is called "tagged template literal".
In that case, the tag expression (usually a function) gets called with the processed template literal,
 which you can then manipulate before outputting.*/


// To escape a back-tick in a template literal, put a backslash \ before the back-tick.
console.log(`\`` === '`'); //These are the same.

/*
Any new line characters inserted in the source are part of the template literal. 
Using normal strings, you would have to use the following syntax in order to get multi-line strings:
*/

console.log('string text line 1\n' +
    'string text line 2');
// "string text line 1
// string text line 2"
//To get the same effect with multi-line strings, you can now write:
console.log(`first line ends here
second line ends here`)

/* In order to embed expressions within normal strings, you would use the following syntax:*/

var a = 5;
var b = 10;
console.log('Fifteen is ' + (a + b) + ' and\nnot ' + (2 * a + b) + '.');
// "Fifteen is 15 and
// not 20."

//Now, with template literals, you are able to make use of the syntactic sugar making substitutions like this more readable:

console.log(`Fifteen is ${a+b} and 
not ${2*a+b}`)


/*
A more advanced form of template literals are tagged template literals.
 Tags allow you to parse template literals with a function. */

/* The first argument of a tag function contains an array of string values. 
The remaining arguments are related to the expressions.
 In the end, your function can return your manipulated string 
 (or it can return something completely different as described in the next example). 
 The name of the function used for the tag can be named whatever you want. */

var person = "Abhinav"
var age = 24;

function testTag(strings, person, age) {
    var str0 = strings[0];
    var str1 = strings[1]

    var ageStr;
    if (age > 99) {
        ageStr = 'centenarian';
    } else {
        ageStr = 'youngster';
    }

    return (str0 + person + str1 + ageStr);
}


//We apply tag infront of the template string to use it as a function
var output = testTag `that ${person} is a ${age}`;
//Person and age are passed to the tag function as computed inside the ${expression}
//The strings are 'that ' and 'is a ' and passed to the array of strings.
console.log(output)

function template(strings, ...keys) {
    return (function(...values) {
        var dict = values[values.length - 1] || {};
        var result = [strings[0]];
        keys.forEach(function(key, i) {
            var value = Number.isInteger(key) ? values[key] : dict[key];
            result.push(value, strings[i + 1]);
        })
        return result.join('')
    })
}

var t1Closure = template `${0}${1}${0}!`
var t2Closure = template `${0} ${'foo'}!`
console.log(t1Closure('Y', 'A'));
console.log(t2Closure('Hello', { foo: 'World' }));

//Raw Strings
/* The special raw property, available on the first function argument of tagged template literals,
 allows you to access the raw strings as they were entered,
  without processing escape sequences. */

function tag(strings, ...values) {
    console.log(strings.raw[0]);
}

tag `string text line 1 \n string text line 2`;
// logs "string text line 1 \n string text line 2" ,
// including the two characters '\' and 'n'
// In addition, the String.raw() method exists to create raw strings just like the
// default template function and string concatenation would create.


var str = String.raw `Hi\n${2+3}!`;
// "Hi\n5!"

str.length;
// 6

str.split('').join(',');
// "H,i,\,n,5,!"
console.log(str);