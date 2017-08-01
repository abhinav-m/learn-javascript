function sum(a, b, c) {
    console.log("sum=" + (a + b + c));
}

Function.prototype.callAfter = function(timer, ...args) {

    setTimeout(() => { this.apply(this, args) }, timer);

}


sum.callAfter(1500, 8, 5, 32);