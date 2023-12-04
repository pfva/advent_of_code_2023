import { toArrayOfStrings } from "../utils.js";

const input = toArrayOfStrings("./input.txt");

let cardsTotal = 0;
const numberOfCards = Array.from(input).fill(1);

for (let line of input) {
  const [card, numbers] = line.split(":");
  const [winningNumbers, myNumbers] = numbers.split("|").map((string) =>
    string
      .trim()
      .split(" ")
      .filter((value) => value)
      .map(Number)
  );
  const totalWins = myNumbers.reduce((acc, number) => (winningNumbers.includes(number) ? acc + 1 : acc), 0);

  if (!totalWins) continue;

  // Part One:
  let cardPoints = 1;
  for (let i = 1; i < totalWins; i++) {
    cardPoints *= 2;
  }
  cardsTotal += cardPoints;

  // Part Two:
  for (let i = 1; i <= totalWins; i++) {
    const value = input.indexOf(line);
    numberOfCards[value + i] += numberOfCards[value];
  }
}

const totalNumberOfCards = numberOfCards.reduce((acc, val) => acc + val, 0);

/* Part One */
// Answer:
console.log(cardsTotal);

/* Part Two */
// Answer:
console.log(totalNumberOfCards);
