/*----------- Constant Variables ---------------*/
const totalSquares = 100;
/*----------- State Variables ------------------*/

/*----------- Cached Elements ------------------*/
gameBoard = document.getElementById('game-board')
resetBtn = document.getElementById('reset').addEventListener('click', reset)
/*----------- Functions ------------------------*/
init () 

function init() {
    makeBoard();
}

function reset() {
    console.log('button clicked')
}

function makeBoard() {
    console.log('i got the div board')
    for (let i = 0; i < 100; i++) {
        let squ= document.createElement('div')
        squ.classList = "square"
        gameBoard.append(squ)
    }
}
