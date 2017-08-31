function deepEqual(a, b) {
    if (typeof(a) === 'object' && typeof(b) === 'object') {
        for (var prop in a) {
            if (typeof(a[prop]) === 'object' && typeof(b[prop]) === 'object')
                deepEqual(a[prop], b[prop])
            else if (a[prop] !== b[prop])
                return false;
        }
        return true;
    } else {
        return a === b
    }
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