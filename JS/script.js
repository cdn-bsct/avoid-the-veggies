/*----------- Constant Variables ---------------*/

/*----------- State Variables ------------------*/
let squSpace = [];
let gameBoard;
let randomNum;
let squ;
let press;
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
devBtn = document.getElementById("dev-mode").addEventListener("click", devMode);
/*----------- Functions ------------------------*/
init();

function init() {
  makeBoard();
}

function reset() {
  console.log(gameBoard);
  location.reload();
  // gameBoard.remove()

  // let main = document.querySelector('main')
  // let newBoard = document.createElement('div')
  // newBoard.setAttribute('id','game-board')
  // newBoard.style.setProperty('display', 'grid')
  // newBoard.style.setProperty('grid-template-columns','repeat(10, 50px)')
  // newBoard.style.setProperty('grid-template-rows','repeat(10, 50px)')
  // newBoard.style.setProperty('justify-content', 'center')
  // main.append(newBoard)

  init();
}

function devMode() {
  squSpace.forEach(function (el) {
    let x = el.className;
    el.innerHTML = x;
    el.style.setProperty("font-size", "12px");
  });
}

function endGame() {
  x = document.getElementsByClassName("safe");
  for (let i = 0; i < x.length; i++) {
    x[i].disabled = true;
  }
  y = document.getElementsByClassName("bomb");
  for (let i = 0; i < y.length; i++) {
    y[i].disabled = true;
    y[i].style.setProperty("background-color", "green");
  }
  message.innerHTML =
    "DARN! It looks like you will be enjoying some veggies tonight..sorry";
}

function checkWin(btn) {
  squSpace[btn.id] = "null";

  let onlyBombs = squSpace.find(function (el) {
    if (el.className === "safe") {
      return true;
    }
  });

  if (onlyBombs == undefined) {
    y = document.getElementsByClassName("bomb");
    for (let i = 0; i < y.length; i++) {
        y[i].disabled = true;
    }
    message.innerHTML =
    "OH YEAH! Enjoy your meat lovers pizza! ";
}
}

function playGame() {
  if (press.className === "bomb") {
    endGame();
  } else if (press.className === "safe" && press.value >= 0) {
    press.innerHTML = press.value;
    press.disabled = true;
    press.style.setProperty("background-color", "rgb(178,20,20)");
    checkWin(press);
  }
}

function makeBoard() {
  //generate the empty board
  for (let i = 0; i < 100; i++) {
    squ = document.createElement("button");
    squ.className = "safe";
    squ.value = 0;
    squ.id = i;
    gameBoard.append(squ);
    squSpace.push(squ);
  }
  //add the bombs into the board
  for (i = 0; i < 30; i++) {
    randomNum = Math.floor(Math.random() * 100);
    squSpace.forEach(function (el) {
      if (el.id == randomNum) {
        el.className = "bomb";
      }
    });
  }
  // determine the numbers on the board
  for (let i = 0; i < squSpace.length; i++) {
    areaTotal = 0;
    if (squSpace[i].className === "safe") {
      // check left
      if (i > 0 && i % 10 && squSpace[i - 1].className === "bomb") {
        squSpace[i].value = ++areaTotal;
      }
      // check right
      if (i < 99 && (i % 10) - 9 && squSpace[i + 1].className === "bomb") {
        squSpace[i].value = ++areaTotal;
      }
      // check down
      if (i > 0 && i + 10 < 99 && squSpace[i + 10].className === "bomb") {
        squSpace[i].value = ++areaTotal;
      }
      // check up
      if (i < 99 && i - 10 > 0 && squSpace[i - 10].className === "bomb") {
        squSpace[i].value = ++areaTotal;
      }
      // check down left
      if (
        i > 0 &&
        i % 10 &&
        i + 10 < 99 &&
        squSpace[i + 9].className === "bomb"
      ) {
        squSpace[i].value = ++areaTotal;
      }
      // check down right
      if (
        i > 0 &&
        (i % 10) - 9 &&
        i + 10 < 99 &&
        squSpace[i + 11].className === "bomb"
      ) {
        squSpace[i].value = ++areaTotal;
      }
      // check up left
      if (i < 99 && i - 10 > 0 && squSpace[i - 11].className === "bomb") {
        squSpace[i].value = ++areaTotal;
      }
      // check up right
      if (i < 99 && i - 10 > 0 && squSpace[i - 9].className === "bomb") {
        squSpace[i].value = ++areaTotal;
      }
    }
  }
}
