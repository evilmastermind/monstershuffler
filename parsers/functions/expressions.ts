/*
----------------------------------------------------------------
Expression parser v1.1 by Ismael
----------------------------------------------------------------
This is an enhanced version of the parser I found here:
https://medium.com/@stoopidguy1992/how-to-write-a-math-expression-parser-in-javascript-b5147bc9466b
added features:
- greater than, smaller than and equal (> < =)
- division (/ to round down, \ to round up)
- numbers with signs in front of them (+2, -5)
----------------------------------------------------------------
- 20230805 - two operators together (if the second is - or +, like 6*-5, 6>+3) are now parsed correctly
----------------------------------------------------------------
- 20230805 - added TypeScript support - Ismael
----------------------------------------------------------------
- 20220709 - replaceValues() - if replacement is negative, it's returned between parenthesis
----------------------------------------------------------------
- 20220328 - fixNegatives is now called fixSigns and handles numbers declared positive with + in front of them  - Ismael
----------------------------------------------------------------
- 20220309 - added < and > - Ismael
----------------------------------------------------------------
- 20211206 - script creation - Ismael
----------------------------------------------------------------
*/

import type { Character, Variables } from "@/types";

const fixSigns = (expression: string) => {
  // this part adds 0 before numbers declared with a sign at the beginning of an expression
  // example: -5+3 ===> 0-5+3
  let string = expression;
  if (string[0] === "-" || string[0] === "+") {
    string = "0" + string;
  }
  let x = string.length - 1;
  let i = 0;
  while (i < x) {
    const curCh = string[i];
    if (curCh === "(") {
      // (
      if (string[i + 1] === "-" || string[i + 1] === "+") {
        // (- or (+
        string = string.substring(0, i + 1) + "0" + string.substring(i + 1); // (0- or (0+
        i++;
        x++;
      }
    }
    i++;
  }

  // New regex rule for parts like 6*-5, or 6>+3 => 6*(0-5), 6>(0+3)
  const operatorAndNumberPattern = /([><=/*\\+-])([+-])(\d+(\.\d+)?)/g;
  string = string.replace(operatorAndNumberPattern, "$1($20$3)");
  return string;
};

// split expression by operator, considering parentheses
const split = (expression: string, operator: string) => {
  const result = [];
  let braces = 0;
  let currentChunk = "";
  for (let i = 0; i < expression.length; ++i) {
    const curCh = expression[i];
    if (curCh === "(") {
      braces++;
    } else if (curCh === ")") {
      braces--;
    }
    if (braces === 0 && operator === curCh) {
      result.push(currentChunk);
      currentChunk = "";
    } else currentChunk += curCh;
  }
  if (currentChunk !== "") {
    result.push(currentChunk);
  }
  return result;
};

// this will only parse strings containing the equal (=) operator [ no + ]
const parseEqualSeparatedExpression = (expression: string) => {
  const numbersString = split(expression, "=");
  const numbers = numbersString.map((noStr) => {
    if (noStr[0] === "(") {
      const expr = noStr.slice(1, -1);
      // recursive call to the main function
      return parsePlusSeparatedExpression(expr);
    }
    return +noStr;
  });
  const initialValue = numbers[0];
  const result = numbers
    .slice(1)
    .reduce((acc, no) => (acc === no ? 1 : 0), initialValue);
  return result;
};

// this will only take strings containing > operator [ no + ]
const parseGreaterThanSeparatedExpression = (expression: string) => {
  const numbersString = split(expression, ">");
  const numbers = numbersString.map((noStr) =>
    parseEqualSeparatedExpression(noStr)
  );
  const initialValue = numbers[0];
  const result = numbers
    .slice(1)
    .reduce((acc, no) => (acc > no ? 1 : 0), initialValue);
  return result;
};
// this will only take strings containing < operator [ no + ]
const parseSmallerThanSeparatedExpression = (expression: string) => {
  const numbersString = split(expression, "<");
  const numbers = numbersString.map((noStr) =>
    parseGreaterThanSeparatedExpression(noStr)
  );
  const initialValue = numbers[0];
  const result = numbers
    .slice(1)
    .reduce((acc, no) => (acc < no ? 1 : 0), initialValue);
  return result;
};
// this will only take strings containing \ operator [ no + ]
const parseDivisionCeilSeparatedExpression = (expression: string) => {
  const numbersString = split(expression, "\\");
  const numbers = numbersString.map((noStr) =>
    parseSmallerThanSeparatedExpression(noStr)
  );
  const initialValue = numbers[0];
  const result = numbers
    .slice(1)
    .reduce((acc, no) => (no === 0 ? 0 : Math.ceil(acc / no)), initialValue);
  return result;
};
// this will only take strings containing / operator [ no + ]
const parseDivisionFloorSeparatedExpression = (expression: string) => {
  const numbersString = split(expression, "/");
  const numbers = numbersString.map((noStr) =>
    parseDivisionCeilSeparatedExpression(noStr)
  );
  const initialValue = numbers[0];
  const result = numbers
    .slice(1)
    .reduce((acc, no) => (no === 0 ? 0 : Math.floor(acc / no)), initialValue);
  return result;
};
// this will only take strings containing * operator [ no + ]
const parseMultiplicationSeparatedExpression = (expression: string) => {
  const numbersString = split(expression, "*");
  const numbers = numbersString.map((noStr) =>
    parseDivisionFloorSeparatedExpression(noStr)
  );
  const initialValue = 1.0;
  const result = numbers.reduce((acc, no) => acc * no, initialValue);
  return result;
};
// both * -
const parseMinusSeparatedExpression = (expression: string) => {
  const numbersString = split(expression, "-");
  const numbers = numbersString.map((noStr) =>
    parseMultiplicationSeparatedExpression(noStr)
  );
  const initialValue = numbers[0];
  const result = numbers.slice(1).reduce((acc, no) => acc - no, initialValue);
  return result;
};
// * - +
const parsePlusSeparatedExpression = (expression: string): number => {
  const numbersString = split(expression, "+");
  const numbers = numbersString.map((noStr) =>
    parseMinusSeparatedExpression(noStr)
  );
  const initialValue = 0.0;
  const result = numbers.reduce((acc, no) => acc + no, initialValue);
  return result;
};

// 20220709 - if replacement is negative, it's returned between parenthesis
const replaceValues = (expression: string, mapObj: Variables) => {
  const re = new RegExp(
    "\\b(?:" + Object.keys(mapObj).join("|") + ")\\b",
    "gi"
  );
  return expression.replace(re, function (matched) {
    const key = matched.toUpperCase() as keyof typeof mapObj;
    if (mapObj[key] < 0) return `(${mapObj[key]})`;
    else return mapObj[key].toString();
  });
};

type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

export function parseExpression(
  expression = "",
  character: Character,
  source = ""
): Result<number> {
  const mapObj: Variables = character.variables!;
  let preparedExpression = expression.toString();
  // removing white spaces
  preparedExpression = preparedExpression.replace(/ +/g, "");
  // replacing variables
  const resultAfterReplace = (preparedExpression = replaceValues(
    preparedExpression,
    mapObj
  ));
  // adding 0 before negative numbers
  preparedExpression = fixSigns(preparedExpression);
  // parsing...
  const result = parsePlusSeparatedExpression(preparedExpression);
  if (isNaN(Number(result))) {
    const sourceExpression = source ? ` of ${source}` : "";
    return {
      ok: false,
      error: new Error(
        `Expression parsing ${sourceExpression} failed, possibly because of an unknown 
        (or not yet available) variable, or invalid numbers or signs. After 
        replacing all known variables, the expression looks like this: 
        \`${resultAfterReplace}\`. After attempting to calculate it, the expression 
        looks like this: \`${result}\`.`
      ),
    };
  }
  return {
    ok: true,
    value: result,
  };
}

export function parseExpressionNumeric(
  expression = "",
  character: Character,
  source = ""
): number {
  const result = parseExpression(expression, character, source);
  if (result.ok) return result.value;
  else return 0;
}
