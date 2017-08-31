function range(start, end, step) {
    if (step === null)
        step = 1;
    let arr = [];
    if (start <= end) {
        for (let i = start; i <= end; i += step)
            arr.push(i)

    } else {
        for (let i = start; i >= end; i += step)
            arr.push(i)
    }
    return arr;

}

function sum(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++)
        sum += arr[i];
    return sum;
}


console.log(range(5, 2, -1))