//
// The evaluate function accept any array with this structure
// array = ["1", "+", "2", "*", "(", "4", "-", "1", ")"];
// if the parentheses structure is not correct or there's a
// division by 0 it returns ["SYNTAX ERROR"] or ["ERROR DIV 0"]
//
function evaluate(array) {
  if (!parseArray(array)) return ["SYNTAX ERROR"];
  if (array[0] === "-") array.unshift("0");
  while (array.indexOf("(") >= 0) {
    if (array.indexOf("ERROR DIV 0") >= 0) return ["ERROR DIV 0"];
    array = evaluateParentheses(array);
  }
  let result = evaluateArray(array);
  console.log(result);
  return isNaN(result) ? ["SYNTAX ERROR"] : result;
}

//basic operation, they take number arguments and return a number
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return b === 0 ? "ERROR DIV 0" : a / b; //return "ERROR DIV 0" if you divide by 0;
}

//takes an array like ["1", "+", "1", "-", "3"], the index of the operation (1), and the operation to do ("+")
//returns an array with the result of the operation ["2", "-", "3"]
function doOperation(array, indexOfOperation, operation) {
  let first = array[indexOfOperation - 1];
  let second = array[indexOfOperation + 1];
  let result;

  switch (operation) {
    case "+":
      result = add(+first, +second);
      break;
    case "-":
      result = subtract(+first, +second);
      break;
    case "*":
      result = multiply(+first, +second);
      break;
    case "/":
      result = divide(+first, +second);
      if (result === "ERROR DIV 0") return ["ERROR DIV 0"];
      break;
  }

  array.splice(indexOfOperation - 1, 3, result);
  return array;
}

//takes an array of operations without parentheses
//returns an array with the result of the operations
function evaluateArray(array) {
  let currentOperation;
  while (array.indexOf("*") > 0) {
    currentOperation = "*";
    array = doOperation(
      array,
      array.indexOf(currentOperation),
      currentOperation
    );
  }
  while (array.indexOf("/") > 0) {
    currentOperation = "/";
    array = doOperation(
      array,
      array.indexOf(currentOperation),
      currentOperation
    );
    if (array.indexOf("ERROR DIV 0") >= 0) return ["ERROR DIV 0"];
  }
  while (array.indexOf("-") > 0) {
    currentOperation = "-";
    array = doOperation(
      array,
      array.indexOf(currentOperation),
      currentOperation
    );
  }
  while (array.indexOf("+") > 0) {
    currentOperation = "+";
    array = doOperation(
      array,
      array.indexOf(currentOperation),
      currentOperation
    );
  }
  return array;
}

//takes an array with parentheses
//returns the array with the innermost paretheses solved
function evaluateParentheses(array) {
  let parOpenIndex;
  let parCloseIndex;
  let parResult;

  for (let i = 0; i < array.length; i++) {
    if (array[i] === "(") {
      parOpenIndex = i;
    } else if (array[i] === ")") {
      parCloseIndex = i;
      parResult = evaluateArray(
        array.splice(parOpenIndex + 1, parCloseIndex - parOpenIndex - 1)
      );
      if (parResult.indexOf("ERROR DIV 0") >= 0) return ["ERROR DIV 0"];
      array.splice(parOpenIndex, 2, parResult);
      return array;
    }
    continue;
  }
}

//checks if the structure is correct
function parseArray(array) {
  let parentheses = array.reduce(
    function (obj, element) {
      if (element === "(") {
        obj.open++;
        return obj;
      } else if (element === ")") {
        obj.close++;
        return obj;
      }
      return obj;
    },
    { open: 0, close: 0 }
  );
  return parentheses.open === parentheses.close;
}
