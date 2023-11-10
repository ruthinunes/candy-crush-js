const board = document.querySelector(".board");
const startBtn = document.querySelector(".start");
const scoreElem = document.querySelector(".score");
const width = 8;
const candies = ["Blue", "Green", "Orange", "Purple", "Red", "Yellow"];
let selectedcandy = null;
let selectedcandyIndex = null;
let randomCandies = [];
let gameStarted = false;
let score = 0;

startBtn.addEventListener("click", () => {
  if (!gameStarted) {
    startGame();
  }
  startBtn.disabled = true;
});

getrandomCandies = () => {
  for (let i = 0; i < width * width; i++) {
    const randomcandy = candies[Math.floor(Math.random() * candies.length)];
    randomCandies.push(randomcandy);
  }
};

createBoard = () => {
  getrandomCandies();

  randomCandies.forEach((candy, index) => {
    card = document.createElement("img");
    card.classList.add("card");
    card.setAttribute("id", index);
    card.setAttribute("src", "./images/" + candy + ".png");
    card.setAttribute("draggable", true);
    card.setAttribute("alt", candy);
    board.append(card);

    // Event listeners for cards
    card.addEventListener("dragstart", () => dragStart(candy, index));
    card.addEventListener("dragover", (e) => dragOver(e));
    card.addEventListener("dragenter", (e) => dragEnter(e));
    card.addEventListener("dragleave", () => dragLeave());
    card.addEventListener("dragend", () => dragEnd());
    card.addEventListener("drop", () => dragDrop(index));
  });
};

startGame = () => {
  gameStarted = true;
  createBoard();
  window.setInterval(() => {
    crushCandies();
    slideDown();
    generateNewCandies();
  }, 300);
};

dragStart = (candy, index) => {
  selectedcandyIndex = index;
  selectedcandy = candy;
};

dragOver = (e) => {
  e.preventDefault();
};

dragEnter = (e) => {
  e.preventDefault();
};

dragLeave = () => {};

dragEnd = () => {
  updateBoard();
  // cleaning variables
  selectedcandy = null;
  selectedcandyIndex = null;
};

dragDrop = (index) => {
  if (selectedcandy !== null) {
    let validMoves = [index - 1, index - width, index + 1, index + width];

    if (
      validMoves.includes(selectedcandyIndex) &&
      randomCandies[index] !== ""
    ) {
      // temporarily swap candies
      const tempIndex = randomCandies[selectedcandyIndex];
      randomCandies[selectedcandyIndex] = randomCandies[index];
      randomCandies[index] = tempIndex;

      // check if the swap results in a valid move
      if (checkValidSlide()) {
        crushCandies();
        updateBoard();
      } else {
        // revert the swap if it's not a valid move
        randomCandies[index] = randomCandies[selectedcandyIndex];
        randomCandies[selectedcandyIndex] = tempIndex;
      }
    }
  }
};

updateBoard = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    const candy = randomCandies[index];

    if (candy === "") {
      card.setAttribute("src", "./images/blank.png");
    } else {
      card.setAttribute("src", "./images/" + candy + ".png");
    }
    card.setAttribute("alt", candy);
  });
};

// Checking for matches
checkValidSlide = () => {
  for (let i = 0; i < width * width; i++) {
    if (i % width < width - 2) {
      // check horizontal combinations
      if (
        randomCandies[i] !== "" &&
        randomCandies[i] === randomCandies[i + 1] &&
        randomCandies[i + 1] === randomCandies[i + 2]
      ) {
        return true;
      }
    }

    if (i < width * (width - 2)) {
      // check vertical combinations
      if (
        randomCandies[i] !== "" &&
        randomCandies[i] === randomCandies[i + width] &&
        randomCandies[i + width] === randomCandies[i + width * 2]
      ) {
        return true;
      }
    }
  }

  return false;
};

checkCombinationGeneric = (matrix) => {
  let combinationLength = matrix.length;
  let candiesToCheck = [];

  for (let i = 0; i < combinationLength; i++) {
    candiesToCheck.push(randomCandies[matrix[i]]);
  }

  if (isCombinationValid(candiesToCheck)) {
    for (let i = 0; i < combinationLength; i++) {
      randomCandies[matrix[i]] = "";
    }
    score += 30;
    slideDown();
    updateScore();
  }
};

isCombinationValid = (candiesToCheck) => {
  let isValid = true;
  const referenceCandy = candiesToCheck[0];

  for (let i = 0; i < candiesToCheck.length; i++) {
    let candy = candiesToCheck[i];

    if (candy !== referenceCandy) {
      isValid = false;
      break;
    }
  }
  return isValid;
};

crushThree = () => {
  for (i = 0; i <= 61; i++) {
    let row = [i, i + 1, i + 2];
    let col = [i, i + width, i + width * 2];

    checkCombinationGeneric(row);
    checkCombinationGeneric(col);
  }
  updateBoard();
};

crushFour = () => {
  for (i = 0; i <= 60; i++) {
    let row = [i, i + 1, i + 2, i + 3];
    let col = [i, i + width, i + width * 2, i + width * 3];

    checkCombinationGeneric(row);
    checkCombinationGeneric(col);
  }
  updateBoard();
};

crushFive = () => {
  for (i = 0; i <= 59; i++) {
    let row = [i, i + 1, i + 2, i + 3, i + 4];
    let col = [i, i + width, i + width * 2, i + width * 3, i + width * 4];

    checkCombinationGeneric(row);
    checkCombinationGeneric(col);
  }
  updateBoard();
};

crushCandies = () => {
  crushFive();
  crushFour();
  crushThree();
};

generateNewCandies = () => {
  for (let i = 0; i < width; i++) {
    if (randomCandies[i] === "") {
      const randomcandy = candies[Math.floor(Math.random() * candies.length)];
      randomCandies[i] = randomcandy;
    }
  }
  updateBoard();
};

slideDown = () => {
  for (let i = 0; i < width * width - width; i++) {
    if (randomCandies[i + width] === "") {
      const temp = randomCandies[i];
      randomCandies[i] = randomCandies[i + width];
      randomCandies[i + width] = temp;
    }
  }

  updateBoard();
};

updateScore = () => {
  scoreElem.textContent = `Score: ${score}`;
};
