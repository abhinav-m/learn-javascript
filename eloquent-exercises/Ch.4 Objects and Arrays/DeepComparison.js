function deepEqual(a, b) {
    //Base case, if a == b , return true
    if (a === b)
        return true; //One of a or b is not an object, return false.

    if (a === null || b === null || typeof(a) != 'object' || typeof(b) != 'object') {
        return false;
    }

    //Count props in both objects..
    var propsInA = 0,
        propsInB = 0;

    for (var prop in a) {
        propsInA++;
    }

    for (var prop in b) {
        propsInB++; //if prop doesnt exist in a , and exists in b, return false or, recursive case returns false.
        if (!(prop in a) || !deepEqual(a[prop], b[prop]))
            return false;
    }
    //both have equal number of props, nothing returned false, therefore if props are equal in number, they are same objects.
    return propsInA === propsInB;

}


var a = {
    abc: 1,
    xyz: 2,
    lmn: { a: 1, b: 2 },
    e: 3,
    f: 4,
    g: 5
}

var b = {
    abc: 1,
    xyz: 2,
    lmn: { a: 1, b: 2, c: 3 },
    e: 3,
    f: 4,
    g: 5
}

console.log(deepEqual(a, b))