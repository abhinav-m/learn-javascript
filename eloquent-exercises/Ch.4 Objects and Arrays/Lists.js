function arrayToList(arr) {
    var list = {
        value: arr[0],
        next: null
    };
    let head = list;

    for (let i = 1; i < arr.length; i++) {
        list.next = {
            value: arr[i],
            next: null
        }
        list = list.next;
    }

    return head;
}

function listToArray(list) {
    let arr = [];
    while (list != null) {
        arr.push(list.value)
        list = list.next;
    }
    return arr;
}

function prepend(list, v) {
    return { value: v, next: list }
}

function nth(list, n) {
    if (!list)
        return undefined;
    else if (n - 1 === 0) //base case nth element reached.
        return list.value;
    else {
        console.log(list.value)
        return nth(list.next, n - 1)
    }
}

var l = arrayToList([1, 2, 3, 4, 5, 6, 7])
l = prepend(l, 10)
console.log(listToArray(l))


console.log(nth(l, 5));

//Eloquent solution
function arrayToListEl(arr) {
    let list = null; //This is the last node in the list, null.
    for (let i = arr.length - 1; i >= 0; i--) { //Starting from the reverse of the array so we have a reference to the head of the list
        list = { value: arr[i], next: list } //Assign next as the previous list reference (initially null) , and assign list as the new object we create.
    }
    return list
}

console.log(arrayToListEl([1, 2, 3, 4]))