/*Write a function called repeatStr which repeats the given string string exactly n times.

repeatStr(6, "I") // "IIIIII"
repeatStr(5, "Hello") // "HelloHelloHelloHelloHello" */

const repeatStr = (n, s) => n === 1 ? s : s += repeatStr(n - 1, s)