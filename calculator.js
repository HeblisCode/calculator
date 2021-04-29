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
  ///
  calculator.pushDigit(e.target.id);
  updateCurrentScreen(calculator.currentNumber);
  updateOperationScreen(calculator.operationArray);
}
function clickOperation(e) {
  let last = calculator.operationArray[calculator.operationArray.length - 1];
  if (isNaN(last) && last !== "(" && last !== ")") {
    calculator.operationArray.pop();
  }
  calculator.pushOperation(e.target.id);
  updateCurrentScreen(calculator.currentNumber);
  updateOperationScreen(calculator.operationArray);
}
function clickParentheses(e) {
  calculator.pushParentheses(e.target.id);
  updateCurrentScreen(calculator.currentNumber);
  updateOperationScreen(calculator.operationArray);
}
function clickEqual() {
  calculator.operationArray.push(calculator.currentNumber.join("")); //push the last number
  updateOperationScreen(calculator.operationArray);
  updateCurrentScreen(calculator.evaluate());
}
function clickClear() {
  calculator.clear();
  updateCurrentScreen(calculator.currentNumber);
  updateOperationScreen(calculator.operationArray);
}

//init function**************************************************************************************************************
function init() {
  const numbers = document.querySelectorAll(".number");
  const operations = document.querySelectorAll(".operation");
  const parentheses = document.querySelectorAll(".parentheses");
  const equal = document.querySelector("#equal");
  const clear = document.querySelector("#clear");

  numbers.forEach((number) => number.addEventListener("click", clickNumber));
  operations.forEach((operation) =>
    operation.addEventListener("click", clickOperation)
  );
  parentheses.forEach((par) => par.addEventListener("click", clickParentheses));
  equal.addEventListener("click", clickEqual);
  clear.addEventListener("click", clickClear);
}

init();
