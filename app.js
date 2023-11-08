const board = document.querySelector(".board");
const width = 8;
const candies = ["Blue", "Green", "Orange", "Purple", "Red", "Yellow"];
let randomCandies = [];

window.onload = () => startGame();

startGame = () => {
  for (let i = 0; i < width * width; i++) {
    const randomCandy = candies[Math.floor(Math.random() * candies.length)];
    randomCandies.push(randomCandy);
  }
  randomCandies.forEach((candy, index) => {
    card = document.createElement("img");
    card.classList.add("cell");
    card.setAttribute("data-id", index);
    card.setAttribute("src", "./images/" + candy + ".png");
    board.append(card);
  });
};
