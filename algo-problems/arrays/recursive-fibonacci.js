var a = 1;
var b = 0;
var temp;
var n = 5;
//looping
for (var i = 0; i < n; i++) {
    temp = a + b;
    console.log(temp);
    a = b;
    b = temp;
}
i = 0;
n = 5;
fiboRecursive(5);

function fiboRecursive(n) {
    if (n <= 1)
        return 1;
    var a = fiboRecursive(n - 1) + fiboRecursive(n - 2);
    console.log(a);
}