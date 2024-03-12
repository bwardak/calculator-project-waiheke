import "./style.scss";

const sumOfNumsString: unknown[] = []; // String to hold inputted numbers
let storingNumbers: number [] = [];
let storingOperators: string[] = [];
let storingAnswer: string[] = [];
let answer: number = 0; // Variable to hold final answer
let firstNumberAsNumber = 0;
const numbersWithOperator: unknown [] = [];
let evaluatedExpressions: number[] = [];
let arithmeticEquation: string;
let bracketsFromEquation: RegExpMatchArray | null = null;
let newExpression: string;

const buttonsNumber = document.querySelectorAll<HTMLButtonElement>(".button--number");
const buttonsEqual = document.querySelector<HTMLButtonElement>(".button--equals");
const screenAnswer = document.querySelector<HTMLDivElement>(".screen--answer");
const screenEquation = document.querySelector<HTMLDivElement>(".screen--equation");
const buttonsAll = document.querySelectorAll<HTMLButtonElement>(".button");
const buttonsOperator = document.querySelectorAll<HTMLButtonElement>(".button--operator");
const buttonClear = document.querySelector<HTMLButtonElement>('.button--clear');
const buttonAns = document.querySelector<HTMLButtonElement>(".button--ans");

if (!screenEquation || !screenAnswer || !buttonClear || !buttonsEqual || !buttonAns) {
  throw new Error("Issue with selector for container");
}

const handleClickedButtonNumberToArray = (event: Event) => {  // Takes value of clicked button
  const value = event.currentTarget as HTMLButtonElement;     // and adds the value to an array
  sumOfNumsString.push(value.innerText);
  console.log(sumOfNumsString)
};

const turnStringIntoArithmeticEquation = () => {
  arithmeticEquation = sumOfNumsString.join(""); 
  bracketsFromEquation = arithmeticEquation.match(/\([^()]*\)/g);

  const removeBracketsFromEquation = bracketsFromEquation?.map(equation =>
    equation.slice(1, -1));

  if (removeBracketsFromEquation) {
    evaluatedExpressions = removeBracketsFromEquation.map(performEquationWithinBrackets);
}
}

const performEquationWithinBrackets = (equation) => {
  const splittedEquation = equation.match(/(-?\d+)|([+\-*/])/g);
  console.log(splittedEquation)
  let result = parseFloat(splittedEquation[0]);

  for (let i = 1; i < splittedEquation.length; i+= 2){
    const operator = splittedEquation[i];
    const number = parseFloat(splittedEquation[i + 1]);

    switch (operator) {
      case "+":
        result += number;
        break;
      case "-":
        result -= number;
        break;
      case "*":
        result *= number;
        break;
      case "/":
        result /= number;
        break;
    }
  }
  console.log(result)
  return result
}

const returnBracketResultToEquation = () => {
  newExpression = arithmeticEquation;             // Creates shallow copy of original arithmetic equation
    if (bracketsFromEquation){
    bracketsFromEquation.forEach((equation, index) => {
      newExpression = newExpression.replace(equation, evaluatedExpressions[index].toString())  // replaces the bracketed strings with
    })                                                                                         // their calculated values
  }
}

const seperatingArrayIntoNumbersAndOperators = () => {
  console.log(newExpression)
  storingNumbers = newExpression.match(/\d+(\.\d+)?/g)?.map(Number);
  console.log(storingNumbers)
  storingOperators = newExpression.match(/[^\d.]+/g);
  console.log(storingOperators)
}

const handleClickedButtonToScreenEquation = (event: Event) => {      // Function to put last pressed button into screen
  const inputtedButton = event.currentTarget as HTMLButtonElement;
    if (screenEquation.innerText === "0" && screenEquation.innerText.length == 1 ) {
      screenEquation.innerText = ""; // Removes the 0 on screen when typing starts
    } 
    if (inputtedButton.innerText === "+-") {
      screenEquation.innerText += "-";
    }else {
      screenEquation.innerText += inputtedButton.innerText;
    }
    
};


const addingNumbers = (): void => {
  let firstNumber = newExpression 
  firstNumberAsNumber = parseFloat(firstNumber);
  if (!isNaN(firstNumberAsNumber)){
    storingNumbers.push(firstNumberAsNumber);
  }
  for (let i: number = 0; i < sumOfNumsString.length; i = 0) {
    sumOfNumsString.shift();
  }
};

const removeRedundantPlus = (operators: string[]) => {
  let minusIndex = operators.findIndex((op) => op === "-");

  while (minusIndex !== -1) {
    let plusIndex = minusIndex - 1;
    while (operators[plusIndex] === "+") {
      operators.splice(plusIndex, 1);
      plusIndex--;
      break           // Breaks loop so it doesnt remove every + before -
    }
    minusIndex = operators.findIndex(
      (op, index) => op === "-" && index > minusIndex
    );
  }

  return operators;
};

const postingAnswer = (): void => {                             // Changes the answer section on calc to answer
  const finalOperators = removeRedundantPlus(storingOperators);
  console.log(finalOperators)
  for (let i = 0; i < storingOperators.length; i++) {
    if (finalOperators[i] === "*") {
      const result = storingNumbers[i] * storingNumbers[i + 1];
      storingNumbers.splice(i, 2, result);
      finalOperators.splice(i, 1);
      i--;
      console.log(result)
      console.log(finalOperators)
    } else if (finalOperators[i] === "/") {
      const result = storingNumbers[i] / storingNumbers[i + 1];
      storingNumbers.splice(i, 2, result);
      finalOperators.splice(i, 1);
      i--;
      console.log(result);
      console.log(finalOperators);
    }
  }

  // Then perform addition and subtraction
  let result = storingNumbers[0];
  for (let i = 1; i < storingNumbers.length; i++) {
    const operator = finalOperators[i - 1];
    switch (operator) {
      case "+":
        result += storingNumbers[i];
        break;
      case "-":
        result -= storingNumbers[i];
        break;
    }
  }
  screenAnswer.innerText = result.toString();
  storingAnswer.push(result.toString())
};

const handleAnswerHoldingButton = () => {
  console.log(storingAnswer);
  if (
    screenEquation.innerText === "0" &&
    screenEquation.innerText.length == 1
  ) {
    screenEquation.innerText = ""; // Removes the 0 on screen when typing starts
  }
  screenEquation.innerText += buttonAns.innerText.toUpperCase();
  sumOfNumsString.push(storingAnswer[0])
  for (let i = storingAnswer.length; i > 0; i--) {
    storingAnswer.pop();
  }
  console.log(storingAnswer[0]);
  
  console.log(sumOfNumsString);
  
}

const handleStoringOperatorToArray = (event: Event) => {
  const operatorPressed = event.currentTarget as HTMLButtonElement;
  sumOfNumsString.push(operatorPressed.innerText,);    // change back to storingoperator.push if bidmas doesnt work
  console.log(sumOfNumsString)
};

const handleResetCalculator = () => {
  if (screenAnswer){
    screenAnswer.innerText = "";
  }
    screenEquation.innerText = "0";
    for (let i = storingNumbers.length; i > 0; i--){
      storingNumbers.pop()
    }
    for (let i = sumOfNumsString.length; i > 0; i--) {
      sumOfNumsString.pop();
    }
    for (let i = storingOperators.length; i > 0; i--){
      storingOperators.pop()
    }
}

// Multiple event listeners

buttonsNumber.forEach((buttonNumber) => {
  buttonNumber.addEventListener("click", handleClickedButtonNumberToArray);
});

buttonsAll.forEach((button) => {
  button.addEventListener("click", handleClickedButtonToScreenEquation);
});

buttonClear.addEventListener("click", handleResetCalculator);

buttonAns.addEventListener("click", () => {
  handleResetCalculator();
  handleAnswerHoldingButton();
  
})

buttonsOperator.forEach((operator) => {
  operator.addEventListener("click", handleStoringOperatorToArray);
  //operator.addEventListener("click", addingNumbers);
});

buttonsEqual.addEventListener("click", () => {
  //addingNumbers(); // Calls two functions, adding numbers first to get
   // Final answer for postingAnswer()
  turnStringIntoArithmeticEquation();
  returnBracketResultToEquation();
  seperatingArrayIntoNumbersAndOperators();
  postingAnswer();
});


// Button clicks when clicking middle
// Makes the buttons only add the numbers and the rest get ommitted
// for loop for order of operations, [i] of % -1 + 1
// Put numbers in array, turn numbers around %/X into numbers and then perform task
// Alternatively use REGEX
// - First find numbers in between brackets, then befre '^' (exponential), then before/after
//   X/%, then before/after +/-
// - Adds each to an array per category, a
// Pressing operator turns array so far into one number, and moves to another array
// Put first number in array, and then stored operator, and then second number
// - Use if to see what the operator is, and if match, do firstNumb *operator* secondNumb and reset array
// Create Clear and complete clear
// If i enter just a operator, gives NAN
// Entering without an operator should give the number back
// Add brackets to first array, join them into an array and then turn whats inside into a number BEFORE ANY THING ELSE
// If screen.answer !== "" do ans




