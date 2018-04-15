/* Write an expression that matches only JavaScript-style numbers. It must sup-
port an optional minus or plus sign in front of the number, the decimal dot,
and exponent notation— 5e-3 or 1E10 — again with an optional sign in front of
the exponent. Also note that it is not necessary for there to be digits in front
of or after the dot, but the number cannot be a dot alone. That is, .5 and 5.
are valid JavaScript numbers, but a lone dot isn’t. */

let pattern = /(\+|\-)?\d/g;
let tests = ['0.05', '-99', '-23.5', '222.3.22'];
tests.forEach(v => console.log(pattern.test(v)));
