/*----------- Constant Variables ---------------*/

/*----------- State Variables ------------------*/
let squSpace = [];
let dblCheck = [];
let vegSpace = [];
let matchBoard = [];
let gameBoard;
let randomNum;
let squ;
let press;
let eraseBoard;
let message;
let matchSquare;
let areaTotal;

/*----------- Cached Elements ------------------*/
gameBoard = document.getElementById("game-board");
gameBoard.addEventListener("click", function (evt) {
  press = evt.target;
  playGame();
});
message = document.querySelector("#game-msg");
resetBtn = document.getElementById("reset").addEventListener("click", reset);

/*----------- Functions ------------------------*/
init();

function init() {
  makeBoard();
}

function reset() {
  init();
}

function playGame() {
  console.dir(press);
}

function makeBoard() {
  //generate the empty board
  for (let i = 0; i < 100; i++) {
    squ = document.createElement("button");
    squ.innerHTML = "safe";
    squ.id = i;
    gameBoard.append(squ);
    squSpace.push(squ);
  }
  //add the bombs into the board
  for (i = 0; i < 30; i++) {
    randomNum = Math.floor(Math.random() * 100);
    squSpace.forEach(function (el) {
      if (el.id == randomNum) {
        el.innerHTML = "bomb";
      }
    });
  }
  // determine the numbers on the board
 
  for (let i = 0; i < squSpace.length; i++) {
    areaTotal = 0;
    if (squSpace[i].innerHTML === "safe") {
        // check left
      if (i > 0 && i % 10 && squSpace[i - 1].innerHTML === "bomb") {
        squSpace[i].value = ++areaTotal;
      }
        // check right
      if (i < 99 && i % 10 - 9 && squSpace[i + 1].innerHTML === "bomb") {
        squSpace[i].value = ++areaTotal;
      }
        // check down
      if (i > 0 && i + 10 < 99 && squSpace[i + 10].innerHTML === "bomb") {
        squSpace[i].value = ++areaTotal;
      }
        // check up
      if (i < 99 && i - 10 > 0 && squSpace[i - 10].innerHTML === "bomb") {
        squSpace[i].value = ++areaTotal;
      }
        // check down left
      if (i > 0 && i % 10 && i + 10 < 99 && squSpace[i + 9].innerHTML === "bomb") {
        squSpace[i].value = ++areaTotal;
      }
        // check down right
      if (i > 0 && i % 10 - 9 && i + 10 < 99 && squSpace[i + 11].innerHTML === "bomb") {
        squSpace[i].value = ++areaTotal;
      } 
        // check up left
      if (i < 99 && i - 10 > 0 && squSpace[i - 11].innerHTML === "bomb") {
        squSpace[i].value = ++areaTotal;
      }
        // check up right
      if (i < 99 && i - 10 > 0  && squSpace[i - 9].innerHTML === "bomb") {
        squSpace[i].value = ++areaTotal;
      }

    }
  }
}
