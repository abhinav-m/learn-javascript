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