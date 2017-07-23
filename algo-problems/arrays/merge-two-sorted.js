var array1, array2;
array1 = [5, 11, 16, 22, 34, 50];
array2 = [10, 12, 15, 23, 25, 40, 46, 48, 60];
var index1 = 0,
    index2 = 0;
var outputArr = [];
var curIndex = 0;
while (index1 < array1.length && index2 < array2.length) {
    outputArr[curIndex++] = array1[index1] <= array2[index2] ? array1[index1++] : array2[index2++];
}

if (index1 < array1.length)
    while (index1 < array1.length)
        outputArr[curIndex++] = array1[index1++];
else if (index2 < array2.length)
    while (index2 < array2.length)
        outputArr[curIndex++] = array2[index2++];

console.log(outputArr)