for (let i = 0; i < 7; i++) {
    let str = ''
    for (let j = 0; j <= i; j++)
        str += '#'
    console.log(str)
}


//Eloquent solution:
for (var str = '#'; str.length < 8; str += '#')
    console.log(str)