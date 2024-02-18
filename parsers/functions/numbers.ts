export function numberToWord(number: number | string, language = "en") {
  if (typeof number === "string") {
    number = parseInt(number);
  }
  if (isNaN(number)) return "";
  switch (language) {
    default:
      return numberToWordEn(number);
      break;
  }
}

// System for American Numbering
const thVal = ["", "thousand", "million", "billion", "trillion"];
// System for uncomment this line for Number of English
// let thVal = ['','thousand','million', 'milliard','billion'];

const dgVal = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const tnVal = [
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];
const twVal = [
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

function numberToWordEn(number: number) {
  let s = number.toString();
  s = s.replace(/[, ]/g, "");
  if (number !== parseFloat(s)) return "not a number ";
  let xVal = s.indexOf(".");
  if (xVal === -1) xVal = s.length;
  if (xVal > 15) return "too big";
  const nVal = s.split("");
  let strVal = "";
  let skVal = 0;
  for (let i = 0; i < xVal; i++) {
    if ((xVal - i) % 3 === 2) {
      if (nVal[i] === "1") {
        strVal += tnVal[Number(nVal[i + 1])] + " ";
        i++;
        skVal = 1;
      } else if (nVal[i] !== "0") {
        strVal += twVal[parseInt(nVal[i]) - 2] + " ";
        skVal = 1;
      }
    } else if (nVal[i] !== "0") {
      strVal += dgVal[parseInt(nVal[i])] + " ";
      if ((xVal - i) % 3 === 0) strVal += "hundred ";
      skVal = 1;
    }
    if ((xVal - i) % 3 === 1) {
      if (skVal) strVal += thVal[(xVal - i - 1) / 3] + " ";
      skVal = 0;
    }
  }
  if (xVal !== s.length) {
    const yVal = s.length;
    strVal += "point ";
    for (let i = xVal + 1; i < yVal; i++)
      strVal += dgVal[parseInt(nVal[i])] + " ";
  }
  return strVal.replace(/\s+/g, " ").trim();
}

export function addOrdinal(value: number | string, language = "en") {
  if (typeof value === "string") {
    value = parseInt(value);
  }
  switch (language) {
    default:
      return addOrdinalEn(value);
      break;
  }
}

function addOrdinalEn(number: number) {
  const j = number % 10;
  const k = number % 100;
  if (j === 1 && k !== 11) {
    return "st";
  }
  if (j === 2 && k !== 12) {
    return "nd";
  }
  if (j === 3 && k !== 13) {
    return "rd";
  }
  return "th";
}

export function roundDiceSides(value: number) {
  if (value < 5) return 4;
  if (value < 7) return 6;
  if (value < 9) return 8;
  if (value < 11) return 10;
  if (value < 16) return 12;
  return 20;
}
