function reverseArray(arr) {
    var rev = [];
    for (let i = arr.length - 1; i >= 0; i--)
        rev.push(arr[i])

    return rev;
}

function reverseInPlace(arr) {
    for (let i = 0, j = arr.length - 1; i < Math.floor(arr.length / 2); i++, j--) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}


console.log(reverseArray([1, 2, 3, 4]))
console.log(reverseInPlace([1, 2, 3, 4]))

//Eloquent Solution:

function reverseInPlaceEl(arr) {
    for (let i = 0; i < Math.floor(arr.length / 2); i++) {
        let temp = arr[i];
        arr[i] = arr[arr.length - 1 - i];
        arr[arr.length - 1 - i] = temp;
    }
}