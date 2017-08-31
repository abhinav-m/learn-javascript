function isEven(num) {
    if (num === 1)
        return false;
    if (num === 0)
        return true;
    return num > 0 ? isEven(num - 2) : isEven(num + 2)
}

console.log(isEven(50))
console.log(isEven(75))
console.log(isEven(-48))

//Eloquent solution
function isEven(n) {
    if (n == 0)
        return true;
    else if (n == 1)
        return false;
    else if (n < 0)
        return isEven(-n);
    else
        return isEven(n - 2);
}