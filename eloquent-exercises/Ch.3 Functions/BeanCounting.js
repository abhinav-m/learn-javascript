function countBs(str) {
    return countChar(str, 'B')
}

function countChar(str, c) {
    let count = 0;
    for (let i = 0; i < str.length; i++)
        if (str.charAt(i) === c) count++;

    return count;
}

console.log(countBs('BaByBbbbBBbB'))