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
    let parentheses = this.operationArray.reduce(
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
  },

  clear() {
    this.currentNumber = [];
    this.operationArray = [];
  },

  evaluate() {
    this.operationArray.push(this.currentNumber.join(""));
    updateOperationScreen(calculator.operationArray);
    this.currentNumber = [];
    if (!this.parseArray()) {
      updateCurrentScreen(["ERROR"]);
      return;
    }
    this.operationArray = evaluate(this.operationArray); //see evaluate.js
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
  if (
    e.target.id === "." &&
    calculator.currentNumber[calculator.currentNumber.length - 1] === "."
  ) {
    return;
  }
  calculator.pushDigit(e.target.id);
  updateCurrentScreen(calculator.currentNumber);
}
function clickOperation(e) {
  calculator.pushOperation(e.target.id);
  updateCurrentScreen(calculator.currentNumber);
  updateOperationScreen(calculator.operationArray);
}
function clickEqual() {
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
