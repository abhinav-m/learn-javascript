var myObject = {
    'abcd': 1,
    'xyz': 2,
    3: 'xyz'
}

console.log(myObject.xyz) //Evaluates property itself , must be a valid variable name, and directly names the property
console.log(myObject['a' + 'b' + 'c' + 'd']) //Evaluates the expression in square brackets to access the property
console.log(myObject[3]) // Not a valid variable name therefore squarebrackets used to evaluate.