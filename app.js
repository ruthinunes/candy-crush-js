const board = document.querySelector(".board");
const width = 8;
const candyColors = ["blue", "green", "orange", "purple", "red", "yellow"];
let randomCandies = [];

console.log(board);
for (let i = 0; i < width * width; i++) {
  const randomCandy =
    candyColors[Math.floor(Math.random() * candyColors.length)];
  randomCandies.push(randomCandy);
}
console.log(randomCandies);
randomCandies.forEach((candy) => {
  document.createElement("div").className = "";
  console.log(candy);
});
