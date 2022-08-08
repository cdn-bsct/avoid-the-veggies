/*----------- Constant Variables ---------------*/

/*----------- State Variables ------------------*/
let vegBoard = [];
let redundant = [];
let gameBoard;
let randomNum;
let squ;
let press;
let eraseBoard;
/*----------- Cached Elements ------------------*/
gameBoard = document.getElementById('game-board')
gameBoard.addEventListener('click', function (evt){
    press = evt.target
    playGame();
})
resetBtn = document.getElementById('reset').addEventListener('click', reset)

/*----------- Functions ------------------------*/
init () 

function init() {
    makeBoard();
}

function reset() {
    init();
}

function playGame() {
    console.log(press.innerText)
  
}

function makeBoard() {
    console.log('i got the div board')
    for (let i = 0; i < 100; i++) {
        squ = document.createElement('button')
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
                        matchSquare.innerText = "V"
                    } 
                })               
            }
        })
    }
}
