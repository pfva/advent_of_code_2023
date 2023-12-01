import { toArrayOfStrings } from "../utils.js";

/* Part One */

const input = toArrayOfStrings("./input.txt");
const rows = input.map((row) => row.split("").filter((item) => !isNaN(item)));
const numbers = rows.reduce((acc, row) => acc + parseInt(row[0] + row.at(-1)), 0);

// Answer:
console.log(numbers);

/* Part Two */

const digits = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const numbersAndStrings = input.reduce((acc, row) => {
  const containedDigits = digits.filter((digit) => row.includes(digit));
  const digitMap = {};

  // Find index of string digits
  for (let digit of containedDigits) {
    digitMap[row.indexOf(digit)] = (digits.indexOf(digit) + 1).toString();
    digitMap[row.lastIndexOf(digit)] = (digits.lastIndexOf(digit) + 1).toString();
  }

  // Find index of numbers
  const numbers = row.split("").filter((item) => !isNaN(item));
  for (let number of numbers) {
    digitMap[row.indexOf(number)] = number;
    digitMap[row.lastIndexOf(number)] = number;
  }

  // Combine first and last digit
  const indices = Object.values(digitMap);
  const firstDigit = indices[0];
  const lastDigit = indices.at(-1);
  return acc + parseInt(firstDigit + lastDigit);
}, 0);

// Answer:
console.log(numbersAndStrings);
