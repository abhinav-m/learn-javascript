function Test(a, b) {
    this.a = a;
    this.b = b;
}

Test.prototype.val = function() {
    this.a++;
    this.b++;
    console.log('common property , this = ' + this)
}

var test1 = new Test(1, 2);
var test2 = new Test(3, 4);

console.log(test1.a, test1.b)
console.log(test2.a, test2.b)

test1.val();

console.log(test1.a, test1.b)
console.log(test2.a, test2.b)