/*----------- Constant Variables ---------------*/

/*----------- State Variables ------------------*/
let vegBoard = [];
let redundant = [];
let randomNum;
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
        squ = document.createElement('div')
        squ.classList = "square"
        squ.id = i
        vegBoard.push(squ.id)
        gameBoard.append(squ)
    }
    
    for (i = 0; i < 30; i++) {
        randomNum = Math.floor(Math.random() * 100)
        vegBoard.forEach(function(el){
            if (el == randomNum) {
                redundant.push(el)
                redundant.forEach( function (re) {
                    if (el !== re) {
                        let matchSquare = document.getElementById(el)
                        matchSquare.innerHTML = "V"
                    } 
                })               
            }
        })
        }
}
