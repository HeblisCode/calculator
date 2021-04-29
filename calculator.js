const calculator = {
  currentNumber: null,
  operationArray: ["1", "+", "4"],

  pushDigit(digit) {
    this.currentNumber.push(digit);
  },

  pushOperation(operation) {
    if (calculator.currentNumber === null) {
      this.operationArray.push(operation);
    } else {
      this.operationArray.push(this.currentNumber.join(""));
      this.operationArray.push(operation);
    }
  },

  evaluate() {
    return evaluate(this.operationArray); //see evaluate.js
  },
};

console.log(calculator.evaluate());
