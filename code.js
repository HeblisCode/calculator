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

function doOperation(array, indexOfOperation, operation) {
  //[1, +, 2]
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

let testArray = ["4", "+", "7"];
console.log(doOperation(testArray, 1, "+"));
