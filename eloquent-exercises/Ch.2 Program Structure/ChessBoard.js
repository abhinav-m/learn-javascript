function chessGrid() {
    var board = '';
    for (let i = 0; i < 8; i++) {
        let str = ''
        for (let j = 0; j < 8; j++)
            if ((i + j) % 2 === 0) // flipping value of odd and even by adding i and j together. 
                str += ' '
            else
                str += '#'
        board += i < 7 ? str + '\n' : str;
    }

    return board;
}

console.log(chessGrid())