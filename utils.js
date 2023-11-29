import { readFileSync } from "node:fs";

export const toArrayOfNumbers = (filePath) =>
  readFileSync(filePath, { encoding: "utf-8" }).trimEnd().split("\n").map(Number);

export const toArrayOfStrings = (filePath) =>
  readFileSync(filePath, { encoding: "utf-8" }).trimEnd().toString().split("\n");

export const toArrayOfArrays = (filePath) =>
  readFileSync(filePath, { encoding: "utf-8" })
    .trimEnd()
    .toString()
    .split("\n")
    .map((item) => item.split(" "));
