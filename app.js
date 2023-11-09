const board = document.querySelector(".board");
const width = 8;
const colors = ["Blue", "Green", "Orange", "Purple", "Red", "Yellow"];
let selectedColor = null;
let selectedColorIndex = null;
let randomColors = [];

window.onload = () => startGame();

getRandomColors = () => {
  for (let i = 0; i < width * width; i++) {
    const randomcolor = colors[Math.floor(Math.random() * colors.length)];
    randomColors.push(randomcolor);
  }
};

createBoard = () => {
  getRandomColors();

  randomColors.forEach((color, index) => {
    card = document.createElement("img");
    card.classList.add("card");
    card.setAttribute("id", index);
    card.setAttribute("src", "./images/" + color + ".png");
    card.setAttribute("draggable", true);
    card.setAttribute("alt", color);
    board.append(card);

    // Event listeners for cards
    card.addEventListener("dragstart", () => dragStart(color, index));
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

dragStart = (color, index) => {
  selectedColorIndex = index;
  selectedColor = color;
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
  // cleaning variables
  selectedColor = null;
  selectedColorIndex = null;
};

dragDrop = (index) => {
  if (selectedColor !== null) {
    let validMoves = [index - 1, index - width, index + 1, index + width];

    if (validMoves.includes(selectedColorIndex)) {
      // switch colors
      const tempIndex = randomColors[selectedColorIndex];

      randomColors[selectedColorIndex] = randomColors[index];
      randomColors[index] = tempIndex;

      updateBoard();
    }
  }
};

updateBoard = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    const color = randomColors[index];
    card.setAttribute("src", "./images/" + color + ".png");
    card.setAttribute("alt", color);
  });
};
