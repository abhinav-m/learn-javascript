//Check if given string ends with argument


const solution = (str, ending) => str.slice(-ending.length) === ending


function solution(str, ending) {

    return str.endsWith(ending);
}

const solution = (s, e) => s.endsWith(e)