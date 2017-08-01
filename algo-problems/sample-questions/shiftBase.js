function shiftBase(number, base) {
    var answerString = "";
    var rem = 0;
    while (number > 0) {
        rem = number % base;
        answerString += rem > 9 ? convert(rem) : rem;
        number = Math.floor(number / base);

    }

    function convert(num) {
        if (num < 36)
            return (String.fromCharCode('z'.charCodeAt(0) - (35 - num)));
        else if (num > 35 && num < 62)
            return (String.fromCharCode('Z'.charCodeAt(0) - (61 - num)));
        else if (num == 62)
            return ("_");
        else
            return ("-");
    }
    return answerString.split('').reverse().join('');

}

console.log(shiftBase(15, 16), // f
    shiftBase(16, 16), // 10
    shiftBase(255, 16), // ff
    shiftBase(63, 64), // -
    shiftBase(4095, 64), // --
    shiftBase(35, 36), // z
    shiftBase(36, 36), // 10
    shiftBase(8, 8), // 10
    shiftBase(63, 8)); // 77);