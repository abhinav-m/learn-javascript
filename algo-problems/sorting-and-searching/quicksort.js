var arr = [5, 1, 24, 6, 5, 8, 3, 25, 6, 2, 15, 7, 10]


function quickSort(arr, left, right) {
    var index;

    index = partition(arr, left, right)
    if (left < index - 1)
        quickSort(arr, left, index - 1)
    if (index < right)
        quickSort(arr, index, right)

}

function partition(arr, i, j) {

    var pivot = arr[Math.floor((i + j) / 2)]
    while (i <= j) {
        while (arr[i] < pivot)
            i++;
        while (arr[j] > pivot)
            j--;
        if (i <= j) {
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            i++;
            j--;
        }
    }
    return i;
}

quickSort(arr, 0, arr.length - 1);
console.log(arr);