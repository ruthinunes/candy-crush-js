const board = document.querySelector(".board");
const startBtn = document.querySelector(".start");
const width = 8;
const candies = ["Blue", "Green", "Orange", "Purple", "Red", "Yellow"];
let selectedcandy = null;
let selectedcandyIndex = null;
let randomcandies = [];

window.onload = () => {
  startGame();
};

startBtn.addEventListener("click", () =>
  window.setInterval(() => {
    crushCandies();
  }, 300)
);

getRandomcandies = () => {
  for (let i = 0; i < width * width; i++) {
    const randomcandy = candies[Math.floor(Math.random() * candies.length)];
    randomcandies.push(randomcandy);
  }
};

createBoard = () => {
  getRandomcandies();

  randomcandies.forEach((candy, index) => {
    card = document.createElement("img");
    card.classList.add("card");
    card.setAttribute("id", index);
    card.setAttribute("src", "./images/" + candy + ".png");
    card.setAttribute("draggable", true);
    card.setAttribute("alt", candy);
    board.append(card);

    // Event listeners for cards
    card.addEventListener("dragstart", () => dragStart(candy, index));
    card.addEventListener("dragover", (e) => dragOver(index, e));
    card.addEventListener("dragenter", (e) => dragEnter(index, e));
    card.addEventListener("dragleave", () => dragLeave(index));
    card.addEventListener("dragend", () => dragEnd(index));
    card.addEventListener("drop", () => dragDrop(index));
  });
};

startGame = () => {
  createBoard();
};

dragStart = (candy, index) => {
  selectedcandyIndex = index;
  selectedcandy = candy;
};

dragOver = (index, e) => {
  e.preventDefault();
  // console.log(index, "dragOver");
};

dragEnter = (index, e) => {
  e.preventDefault();
};

dragLeave = (index) => {
  // console.log(index, "dragLeave");
};

dragEnd = (index) => {
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
      randomcandies[index] !== ""
    ) {
      // switch candies
      const tempIndex = randomcandies[selectedcandyIndex];

      randomcandies[selectedcandyIndex] = randomcandies[index];
      randomcandies[index] = tempIndex;

      crushCandies();
      updateBoard();
    }
  }
};

updateBoard = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    const candy = randomcandies[index];

    if (candy === "") {
      card.setAttribute("src", "./images/blank.png");
    } else {
      card.setAttribute("src", "./images/" + candy + ".png");
    }
    card.setAttribute("alt", candy);
  });
};

// Checking for matches
crushCandies = () => {
  crushThree();
  // crushFour
  // crushFive()
};

crushThree = () => {
  for (i = 0; i <= 61; i++) {
    const isBlank = randomcandies[i] === "";
    let row = [i, i + 1, i + 2];
    let col = [i, i + width, i + width * 2];

    checkCombination(row, isBlank); // check row
    checkCombination(col, isBlank); // check column
  }
  updateBoard();
};

checkCombination = (matrix, isBlank) => {
  let candy1 = randomcandies[matrix[0]];
  let candy2 = randomcandies[matrix[1]];
  let candy3 = randomcandies[matrix[2]];

  if (candy1 === candy2 && candy2 === candy3 && !isBlank) {
    randomcandies[matrix[0]] = "";
    randomcandies[matrix[1]] = "";
    randomcandies[matrix[2]] = "";
  }
};
