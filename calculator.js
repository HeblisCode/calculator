//calculator object**********************************************************************************************************
const calculator = {
  currentNumber: [],
  operationArray: [],
  result: null,

  pushDigit(digit) {
    if (this.result !== null && this.operationArray.length === 1) {
      this.clear();
    }
    //prevents multiple dots
    if (
      digit === "." &&
      this.currentNumber[this.currentNumber.length - 1] === "."
    ) {
      return;
    }
    this.currentNumber.push(digit);
  },

  pushOperation(operation) {
    if (this.currentNumber.length !== 0) {
      this.operationArray.push(this.currentNumber.join(""));
      this.currentNumber = [];
    }

    //prevents multiple operations
    let last = this.operationArray[this.operationArray.length - 1];
    if (isNaN(last) && last !== "(" && last !== ")") {
      this.operationArray.pop();
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
    if (this.currentNumber.length === 0) {
      this.currentNumber = this.operationArray.pop().split("");
    }
    this.currentNumber.pop();
  },

  clear() {
    this.currentNumber = [];
    this.operationArray = [];
    this.result = null;
  },

  evaluate() {
    if (this.currentNumber.length !== 0) {
      this.operationArray.push(this.currentNumber.join(""));
    }
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
  calculator.pushDigit(e.target.id);
}
function clickOperation(e) {
  calculator.pushOperation(e.target.id);
}
function clickParentheses(e) {
  calculator.pushParentheses(e.target.id);
}

//keypress event listener****************************************************************************************************
function pressKey(e) {
  const operators = ["+", "/", "*", "-"];

  if (!isNaN(e.key) || e.key === ".") {
    calculator.pushDigit(e.key);
  } else if (operators.indexOf(e.key) >= 0) {
    calculator.pushOperation(e.key);
  } else if (e.key === "Enter") {
    calculator.evaluate();
  } else if (e.key === "(" || e.key === ")") {
    calculator.pushParentheses(e.key);
  } else if (e.key === "c") {
    calculator.delete();
  } else if (e.key === "a") {
    calculator.clear();
  }
}

//init function**************************************************************************************************************
function init() {
  const numbers = document.querySelectorAll(".number");
  const operations = document.querySelectorAll(".operation");
  const parentheses = document.querySelectorAll(".parentheses");
  const deleteButton = document.querySelector("#delete");
  const equal = document.querySelector("#equal");
  const clear = document.querySelector("#clear");

  //buttons event listeners
  numbers.forEach((number) =>
    number.addEventListener("mousedown", clickNumber)
  );
  operations.forEach((operation) =>
    operation.addEventListener("mousedown", clickOperation)
  );
  parentheses.forEach((par) =>
    par.addEventListener("mousedown", clickParentheses)
  );
  deleteButton.addEventListener("mousedown", () => calculator.delete());
  equal.addEventListener("mousedown", () => calculator.evaluate());
  clear.addEventListener("mousedown", () => calculator.clear());

  //update view on every click or key press
  window.addEventListener("click", function () {
    updateOperationScreen(calculator.operationArray);
    updateCurrentScreen(calculator.currentNumber);
  });
  window.addEventListener("keyup", function () {
    updateOperationScreen(calculator.operationArray);
    updateCurrentScreen(calculator.currentNumber);
  });

  //keypress event listener
  window.addEventListener("keypress", (e) => pressKey(e));
}

init();
