import { toArrayOfStrings } from "../utils.js";

const input = toArrayOfStrings("./input.txt");

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

const sum = input.reduce((acc, line) => {
  const [game, rounds] = line.split(":");
  const gameIndex = Number(game.split(" ")[1]);
  const draws = rounds.split(";").map((round) => round.trimStart());
  const cubes = draws.reduce((acc, hand) => {
    hand
      .split(", ")
      .map((item) => item.split(" "))
      .map(([amount, color]) => {
        // Record the highest amount of cubes of each color
        acc[color] = acc[color] ? (acc[color] > Number(amount) ? acc[color] : Number(amount)) : Number(amount);
      });
    return acc;
  }, {});

  const power = cubes.red * cubes.green * cubes.blue;

  // Part One:
  // if (cubes.blue <= MAX_BLUE && cubes.red <= MAX_RED && cubes.green <= MAX_GREEN) {
  //   return acc + gameIndex;
  // } else {
  //   return acc;
  // }

  // Part Two:
  return acc + power;
}, 0);

// Answer:
console.log(sum);
