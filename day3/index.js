import { toArrayOfStrings } from "../utils.js";

/* Part One */

const lines = toArrayOfStrings("./input.txt");

const createNumberPosition = (lines, line, i) => ({
  line: lines.indexOf(line),
  firstIndex: i - numberBuffer.length,
  lastIndex: i - 1,
});

const isSymbol = (char) => {
  // Check for index out of bounds
  if (typeof char === "undefined") return false;

  const symbolRegex = /[^0-9.]/;
  return symbolRegex.test(char);
};

const numbers = {};
let numberBuffer = "";

for (let line of lines) {
  for (let i = 0; i <= line.length; i++) {
    const char = line[i];
    if (!isNaN(+char)) {
      // Found a number (add the digit to the buffer)
      numberBuffer += char;
    } else {
      // Found a non-number
      if (numberBuffer.length > 0) {
        // There's a number in the buffer
        if (numbers[numberBuffer]) {
          // Number already exists
          numbers[numberBuffer] = {
            indices: [...numbers[numberBuffer].indices, createNumberPosition(lines, line, i)],
          };
        } else {
          // Number doesn't exist yet
          numbers[numberBuffer] = {
            indices: [createNumberPosition(lines, line, i)],
          };
        }
        // Reset the buffer
        numberBuffer = "";
      }
    }
  }
}

const sum = Object.entries(numbers).reduce((acc, [key, val]) => {
  let isEnginePart = 0;
  for (let index of val.indices) {
    // Search rows above and below
    for (let char = index.firstIndex - 1; char <= index.lastIndex + 1; char++) {
      if (isSymbol(lines?.[index.line - 1]?.[char]) || isSymbol(lines?.[index.line + 1]?.[char])) {
        isEnginePart++;
        break;
      }
    }
    // Search chars before and after number
    if (isSymbol(lines?.[index.line]?.[index.firstIndex - 1]) || isSymbol(lines?.[index.line]?.[index.lastIndex + 1])) {
      isEnginePart++;
    }
  }

  return isEnginePart ? acc + Number(key) * isEnginePart : acc;
}, 0);

// Answer:
console.log(sum);

/* Part Two */

const gears = [];

for (let line of lines) {
  for (let i = 0; i <= line.length; i++) {
    if (line[i] === "*") {
      gears.push({ line: lines.indexOf(line), index: i });
    }
  }
}

for (let gear of gears) {
  gear.numberNeighbors = 0;
  gear.numbers = [];

  const adjacentLines = Object.entries(numbers)
    .map(([number, value]) =>
      value.indices
        .filter((index) => index.line === gear.line || index.line === gear.line - 1 || index.line === gear.line + 1)
        .map((line) => {
          line.number = Number(number);
          return line;
        })
    )
    .filter((index) => index.length)
    .flat();

  for (let line of adjacentLines) {
    if (gear.index >= line.firstIndex - 1 && gear.index <= line.lastIndex + 1) {
      gear.numberNeighbors += 1;
      gear.numbers.push(line.number);
    }
  }
}

const gearRatios = gears
  .filter((gear) => gear.numberNeighbors === 2)
  .map((gear) => gear.numbers.reduce((acc, number) => acc * number, 1));

const sumGearRatios = gearRatios.reduce((acc, ratio) => acc + ratio, 0);

// Answer:
console.log(sumGearRatios);
