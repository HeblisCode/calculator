//calculator object**********************************************************************************************************
const calculator = {
  currentNumber: [],
  operationArray: [],
  result: null,

  pushDigit(digit) {
    if (this.result !== null && this.operationArray.length === 1) {
      this.clear();
    }
    this.currentNumber.push(digit);
  },

  pushOperation(operation) {
    if (this.currentNumber.length !== 0) {
      this.operationArray.push(this.currentNumber.join(""));
      this.currentNumber = [];
    }
    this.operationArray.push(operation);
  },

  pushParentheses(parentheses) {
    if (this.currentNumber.length !== 0) {
      this.operationArray.push(this.currentNumber.join(""));
      this.currentNumber = [];
    }
    this.operationArray.push(parentheses);
  },

  delete() {
    this.currentNumber.pop();
  },

  clear() {
    this.currentNumber = [];
    this.operationArray = [];
    this.result = null;
  },

  //last number is pushed by the click listener
  evaluate() {
    this.currentNumber = [];
    this.operationArray = evaluate(this.operationArray); //see evaluate.js
    this.result = this.operationArray[0];
    return this.operationArray;
  },
};

//update view funtion********************************************************************************************************
function updateCurrentScreen(array) {
  const currentScreen = document.querySelector("#currentScreen");
  currentScreen.innerText = array.join("");
}
function updateOperationScreen(array) {
  const operationScreen = document.querySelector("#operationScreen");
  operationScreen.innerText = array.join("");
}

//click event listeners******************************************************************************************************
function clickNumber(e) {
  ///prevent multiple dots
  if (
    e.target.id === "." &&
    calculator.currentNumber[calculator.currentNumber.length - 1] === "."
  ) {
    return;
  }
  calculator.pushDigit(e.target.id);
}
function clickOperation(e) {
  let last = calculator.operationArray[calculator.operationArray.length - 1];
  //prevent multiple operations
  if (isNaN(last) && last !== "(" && last !== ")") {
    calculator.operationArray.pop();
  }
  calculator.pushOperation(e.target.id);
}
function clickParentheses(e) {
  calculator.pushParentheses(e.target.id);
}
function clickEqual() {
  calculator.operationArray.push(calculator.currentNumber.join("")); //push the last number
  updateCurrentScreen(calculator.evaluate());
}

//init function**************************************************************************************************************
function init() {
  const numbers = document.querySelectorAll(".number");
  const operations = document.querySelectorAll(".operation");
  const parentheses = document.querySelectorAll(".parentheses");
  const deleteButton = document.querySelector("#delete");
  const equal = document.querySelector("#equal");
  const clear = document.querySelector("#clear");

  //buttons event listener
  numbers.forEach((number) => number.addEventListener("click", clickNumber));
  operations.forEach((operation) =>
    operation.addEventListener("click", clickOperation)
  );
  parentheses.forEach((par) => par.addEventListener("click", clickParentheses));
  deleteButton.addEventListener("click", () => calculator.delete());
  equal.addEventListener("click", clickEqual);
  clear.addEventListener("click", () => calculator.clear());

  //update view on every click or key press
  window.addEventListener("click", function () {
    updateOperationScreen(calculator.operationArray);
    updateCurrentScreen(calculator.currentNumber);
  });
  window.addEventListener("keypress", function (e) {
    updateOperationScreen(calculator.operationArray);
    updateCurrentScreen(calculator.currentNumber);
    console.log(e);
  });
}

window.onload = init;
