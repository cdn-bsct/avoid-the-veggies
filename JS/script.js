/*----------- State Variables ------------------*/
let squSpace = [];
let newBoard;
let randomNum;
let squ;
let press;
let areaTotal;

/*----------- Cached Elements ------------------*/
let gameBoard = document.getElementById("game-board");
let message = document.querySelector("#game-msg");
let difficulty = document.querySelectorAll(".mode");
let easy = document.getElementById("Easy");
let medium = document.getElementById("Medium");
let hard = document.getElementById("Hard");
let resetBtn = document.getElementById("reset");
let devBtn = document.getElementById("dev-mode");

//----- Event Listeners -----//
difficulty.forEach((button) => {
  button.addEventListener("click", (e) => {
    setDifficulty(e.target);
  });
});

gameBoard.addEventListener("click", function (evt) {
  press = evt.target;
  playGame();
});

resetBtn.addEventListener("click", function () {
  reset();
});

devBtn.addEventListener("click", devMode);

/*----------- Functions ------------------------*/
init();

function init() {
  squSpace = [];
  message.innerHTML = "Let's see what kind of pizza you will be enjoying";
}

function setDifficulty(mode) {
  if (mode.innerHTML === "Easy") {
    document.getElementById("Easy").classList.add("active");
    disableButtons(medium, hard);
    createBoard(10, 10);
  } else if (mode.innerHTML === "Medium") {
    document.getElementById("Medium").classList.add("active");
    disableButtons(easy, hard);
    createBoard(12, 12);
  } else {
    document.getElementById("Hard").classList.add("active");
    disableButtons(easy, medium);
    createBoard(15, 15);
  }
}

function disableButtons(btn1, btn2) {
  btn1.setAttribute("disabled", "");
  btn2.setAttribute("disabled", "");
  btn1.classList.add("inactive");
  btn2.classList.add("inactive");
}

function createBoard(x, y) {
  gameBoard.style.setProperty(`grid-template-columns`, `repeat(${x}, 50px)`);
  gameBoard.style.setProperty(`grid-template-rows`, `repeat(${y}, 50px)`);

  let size = x * y;

  while (squSpace.length < size) {
    squSpace.push(null);
    if (squSpace.length === size) {
      break;
    }
  }

  fillBoard(size);
}

function fillBoard(size) {
  if (size === 100) bombPercent = 0.3;
  if (size === 144) bombPercent = 0.375;
  if (size === 225) bombPercent = 0.45;

  let bombs = bombLocation(size, bombPercent);
  bombs.forEach((bomb) => {
    squSpace.splice(bomb, 1, "bomb");
  });

  squSpace.forEach((tile, idx) => {
    let tileDiv = document.createElement("div");
    tileDiv.style.setProperty("width", "50px");
    tileDiv.style.setProperty("height", "50px");
    tileDiv.classList.add("tile");
    tileDiv.setAttribute("id", `${idx}`);
    gameBoard.appendChild(tileDiv);
  });
}

function bombLocation(size, percent) {
  let bombArr = [];
  let counter = 0;
  while (counter != Math.floor(size * percent)) {
    let x = Math.floor(Math.random() * size);
    if (!bombArr.includes(x)) {
      bombArr.push(x);
      counter++;
    }
  }
  return bombArr;
}

function reset() {
  difficulty.forEach((button) => {
    button.removeAttribute("disabled");
    button.classList.remove("inactive");
    button.classList.remove("active");
  });

  newBoard = document.createElement("div");
  newBoard.setAttribute("id", "game-board");
  newBoard.addEventListener("click", function (evt) {
    press = evt.target;
    playGame();
  });
  gameBoard.replaceWith(newBoard);
  gameBoard = newBoard;

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
    message.innerHTML = "OH YEAH! Enjoy your meat lovers pizza! ";
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

function makeBoard(gameBoard) {
  for (let i = 0; i < 100; i++) {
    squ = document.createElement("button");
    squ.className = "safe";
    squ.value = 0;
    squ.id = i;
    gameBoard.appendChild(squ);
    squSpace.push(squ);
  }

  for (i = 0; i < 30; i++) {
    randomNum = Math.floor(Math.random() * 100);
    squSpace.forEach(function (el) {
      if (el.id == randomNum) {
        el.className = "bomb";
      }
    });
  }

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
        i + 10 <= 99 &&
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
      if (
        i < 99 &&
        i % 10 &&
        i - 10 > 0 &&
        squSpace[i - 11].className === "bomb"
      ) {
        squSpace[i].value = ++areaTotal;
      }
      // check up right
      if (
        i < 99 &&
        (i % 10) - 9 &&
        i - 10 > 0 &&
        squSpace[i - 9].className === "bomb"
      ) {
        squSpace[i].value = ++areaTotal;
      }
    }
  }
}
