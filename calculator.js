//calculator object**********************************************************************************************************
const calculator = {
  currentNumber: [],
  operationArray: [],

  pushDigit(digit) {
    this.currentNumber.push(digit);
  },

  pushOperation(operation) {
    if (this.currentNumber.length === 0) {
      this.operationArray.push(operation);
    } else {
      this.operationArray.push(this.currentNumber.join(""));
      this.operationArray.push(operation);
      this.currentNumber = [];
    }
  },

  parseArray() {
    return true;
  },

  clear() {
    this.currentNumber = [];
    this.operationArray = [];
  },

  evaluate() {
    this.operationArray.push(this.currentNumber.join(""));
    updateOldScreen(calculator.operationArray);
    this.currentNumber = [];
    if (!this.parseArray()) return "ERROR";
    this.operationArray = evaluate(this.operationArray); //see evaluate.js
    return this.operationArray;
  },
};

//update view funtion********************************************************************************************************
function updateCurrentScreen(array) {
  const currentScreen = document.querySelector("#currentScreen");
  currentScreen.innerText = array.join("");
}
function updateOldScreen(array) {
  const oldScreen = document.querySelector("#oldScreen");
  oldScreen.innerText = array.join("");
}

//click event listeners******************************************************************************************************
function clickNumber(e) {
  calculator.pushDigit(e.target.id);
  updateCurrentScreen(calculator.currentNumber);
}
function clickOperation(e) {
  calculator.pushOperation(e.target.id);
  updateCurrentScreen(calculator.currentNumber);
  updateOldScreen(calculator.operationArray);
}
function clickEqual() {
  updateCurrentScreen(calculator.evaluate());
}
function clickClear() {
  calculator.clear();
  updateCurrentScreen(calculator.currentNumber);
  updateOldScreen(calculator.operationArray);
}

function init() {
  const numbers = document.querySelectorAll(".number");
  const operations = document.querySelectorAll(".operation");
  const equal = document.querySelector("#equal");
  const clear = document.querySelector("#clear");

  numbers.forEach((number) => number.addEventListener("click", clickNumber));
  operations.forEach((operation) =>
    operation.addEventListener("click", clickOperation)
  );
  equal.addEventListener("click", clickEqual);
  clear.addEventListener("click", clickClear);
}

init();
