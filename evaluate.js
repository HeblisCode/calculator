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
  return b === 0 ? "ERROR" : a / b; //return "ERROR" if you divide by 0;
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
      break;
  }

  array.splice(indexOfOperation - 1, 3, result);
  return array;
}

//takes an array of operations without parentheses
//returns the results of the operations
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
  }
  while (array.indexOf("+") > 0) {
    currentOperation = "+";
    array = doOperation(
      array,
      array.indexOf(currentOperation),
      currentOperation
    );
  }
  while (array.indexOf("-") > 0) {
    currentOperation = "-";
    array = doOperation(
      array,
      array.indexOf(currentOperation),
      currentOperation
    );
  }
  return array[0];
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
      console.log(parOpenIndex + " open");
    } else if (array[i] === ")") {
      parCloseIndex = i;
      console.log(parCloseIndex);
      parResult = evaluateArray(
        array.splice(parOpenIndex + 1, parCloseIndex - parOpenIndex - 1)
      );
      array.splice(parOpenIndex, 2, parResult);
      console.log(parOpenIndex + " open");
      console.log(parCloseIndex);
      console.log(array.join(""));
      return array;
    }
    continue;
  }
}

//takes an array with pharenteses and operations
//return the result to the whole operation chain
function evaluate(array) {
  while (array.indexOf("(") >= 0) {
    array = evaluateParentheses(array);
  }
  return evaluateArray(array);
}
