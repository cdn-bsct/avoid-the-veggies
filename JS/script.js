/*----------- State Variables ------------------*/
let squSpace = [];
let bombArr = [];
let boardSize;
let newBoard;
let randomNum;

/*----------- Cached Elements ------------------*/
let main = document.querySelector("main");
let gameBoard = document.getElementById("game-board");
let message = document.querySelector("#game-msg");
let difficulty = document.querySelectorAll(".mode");
let easy = document.getElementById("Easy");
let medium = document.getElementById("Medium");
let hard = document.getElementById("Hard");
let resetBtn = document.getElementById("reset");
let devBtn = document.getElementById("dev-mode");
let nav = document.querySelector(".sidebar");
let legendDiv = document.createElement("div");

//----- Event Listeners -----//
difficulty.forEach((button) => {
  button.addEventListener("click", (e) => {
    setDifficulty(e.target);
  });
});
gameBoard.addEventListener("click", function (evt) {
  checkTile(evt.target);
});
resetBtn.addEventListener("click", function () {
  reset();
});
devBtn.addEventListener("click", function () {
  if (devBtn.className != "active") {
    devBtn.classList.add("active");
    devMode();
  }
});

/*----------- Functions ------------------------*/
init();

function init() {
  squSpace = [];
  bombArr = [];
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

  boardSize = x * y;

  while (squSpace.length < boardSize) {
    squSpace.push(null);
    if (squSpace.length === boardSize) {
      break;
    }
  }

  fillBoard(boardSize);
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
    let tileBtn = document.createElement("button");
    tileBtn.classList.add("tile");
    tileBtn.setAttribute("id", `${idx}`);
    gameBoard.appendChild(tileBtn);
  });
}

function bombLocation(size, percent) {
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
  init();

  difficulty.forEach((button) => {
    button.removeAttribute("disabled");
    button.classList.remove("inactive");
    button.classList.remove("active");
  });

  newBoard = document.createElement("div");
  newBoard.setAttribute("id", "game-board");
  gameBoard.replaceWith(newBoard);
  gameBoard = newBoard;
  gameBoard.addEventListener("click", function (evt) {
    checkTile(evt.target);
  });

  devBtn.classList.remove("active");

  let newLegend = document.createElement("div");
  newLegend.setAttribute("class", "legend");
  legendDiv.replaceWith(newLegend);
  legendDiv = newLegend;

  message.classList.remove("victory");
}

function addLegend() {
  legendDiv.classList.add("legend");
  legendDiv.style.setProperty("display", "flex");
  legendDiv.style.setProperty("margin-top", "20px");
  legendDiv.style.setProperty("flex-direction", "column");
  nav.appendChild(legendDiv);

  let checkDiv = document.createElement("div");
  checkDiv.style.setProperty("display", "flex");
  checkDiv.style.setProperty("justify-content", "center");
  checkDiv.style.setProperty("align-items", "center");
  legendDiv.appendChild(checkDiv);

  let clearDiv = document.createElement("div");
  clearDiv.style.setProperty("display", "flex");
  clearDiv.style.setProperty("justify-content", "center");
  clearDiv.style.setProperty("align-items", "center");
  legendDiv.appendChild(clearDiv);

  let icon1 = document.createElement("i");
  icon1.classList.add("material-icons");
  icon1.style.setProperty("font-size", "40px");
  icon1.innerHTML = "check";
  checkDiv.appendChild(icon1);

  let checkRule = document.createElement("h5");
  checkRule.innerHTML = " - Safe Spaces";
  checkDiv.appendChild(checkRule);

  let icon2 = document.createElement("i");
  icon2.classList.add("material-icons");
  icon2.style.setProperty("font-size", "40px");
  icon2.style.setProperty("color", "red");
  icon2.innerHTML = "clear";
  clearDiv.appendChild(icon2);

  let clearRule = document.createElement("h5");
  clearRule.innerHTML = " - Bomb Spaces";
  clearDiv.appendChild(clearRule);
}

function devMode() {
  addLegend();

  squSpace.forEach((el, idx) => {
    if (el === "bomb") {
      let w = document.getElementById(`${idx}`);
      let x = document.createElement("i");
      x.setAttribute("id", `${idx}`);
      x.classList.add("material-icons");
      x.style.setProperty("color", "red");
      x.innerHTML = "clear";
      w.appendChild(x);
    } else {
      let y = document.getElementById(`${idx}`);
      let z = document.createElement("i");
      z.classList.add("material-icons");
      z.setAttribute("id", `${idx}`);
      z.innerHTML = "check";
      y.appendChild(z);
    }
  });
}

function checkTile(tile) {
  let selected = squSpace[parseInt(tile.id)];
  if (selected === "bomb") {
    endGame();
  } else {
    tile.style.setProperty("background-color", "#aa4400");
    tile.setAttribute("disabled", "true");
    tile.innerHTML = aroundMe(tile);
  }
}

function endGame() {
  message.innerHTML =
    "DARN! It looks like you will be enjoying some veggies tonight..sorry";

  let gameTiles = document.querySelectorAll(".tile");
  gameTiles.forEach((tile) => {
    tile.setAttribute("disabled", "true");
    squSpace[tile.id] === "bomb"
      ? tile.style.setProperty("background-color", "rgb(101, 151, 25)")
      : tile.style.setProperty("background-color", "#a88852");
  });
}

function aroundMe(tile) {
  currLocation = parseInt(tile.id);
  bombCount = 0;

  switch (boardSize) {
    case 100:
      leftEdge = [-10, -9, 1, 10, 11];
      rightEdge = [-11, -10, -1, 9, 10];
      middle = [-11, -10, -9, -1, 1, 9, 10, 11];

      if (currLocation % 10 === 0) {
        leftEdge.forEach((position) => {
          if (squSpace[currLocation + position] === "bomb") bombCount++;
          squSpace[currLocation] = "safe";
        });
      } else if (currLocation % 10 === 9) {
        rightEdge.forEach((position) => {
          if (squSpace[currLocation + position] === "bomb") bombCount++;
          squSpace[currLocation] = "safe";
        });
      } else {
        middle.forEach((position) => {
          if (squSpace[currLocation + position] === "bomb") bombCount++;
          squSpace[currLocation] = "safe";
        });
      }

      checkWin();
      break;

    case 144:
      leftEdge = [-12, -11, 1, 12, 13];
      rightEdge = [-13, -12, -1, 11, 12];
      middle = [-13, -12, -11, -1, 1, 11, 12, 13];

      if (currLocation % 12 === 0) {
        leftEdge.forEach((position) => {
          if (squSpace[currLocation + position] === "bomb") bombCount++;
          squSpace[currLocation] = "safe";
        });
      } else if (currLocation % 12 === 11) {
        rightEdge.forEach((position) => {
          if (squSpace[currLocation + position] === "bomb") bombCount++;
          squSpace[currLocation] = "safe";
        });
      } else {
        middle.forEach((position) => {
          if (squSpace[currLocation + position] === "bomb") bombCount++;
          squSpace[currLocation] = "safe";
        });
      }

      checkWin();
      break;

    case 225:
      leftEdge = [-15, -14, 1, 15, 16];
      rightEdge = [-16, -15, -1, 14, 15];
      middle = [-16, -15, -14, -1, 1, 14, 15, 16];

      if (currLocation % 15 === 0) {
        leftEdge.forEach((position) => {
          if (squSpace[currLocation + position] === "bomb") bombCount++;
          squSpace[currLocation] = "safe";
        });
      } else if (currLocation % 15 === 14) {
        rightEdge.forEach((position) => {
          if (squSpace[currLocation + position] === "bomb") bombCount++;
          squSpace[currLocation] = "safe";
        });
      } else {
        middle.forEach((position) => {
          if (squSpace[currLocation + position] === "bomb") bombCount++;
          squSpace[currLocation] = "safe";
        });
      }

      checkWin();

      break;
  }

  return bombCount;
}

function checkWin() {
  if (!squSpace.includes(null)) victory();
}

function victory() {
  message.innerHTML = "WINNER WINNER CHICKEN DINNER! NO VEGGIE PIZZA FOR YOU!!";
  message.classList.add("victory");
}
