import "./style.scss";

const sumOfNumsString: unknown[] = []; // String to hold inputted numbers
let storingNumbers: number [] = [];
let storingOperators: string[] = [];
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
const buttonClear = document.querySelector<HTMLButtonElement>('.button--clear')

if (!screenEquation || !screenAnswer || !buttonClear || !buttonsEqual) {
  throw new Error("Issue with selector for container");
}

const handleClickedButtonNumberToArray = (event: Event) => {  // Takes value of clicked button
  const value = event.currentTarget as HTMLButtonElement;     // and adds the value to an array
  sumOfNumsString.push(value.innerText);
  console.log(sumOfNumsString)
};

const turnStringIntoArithmeticEquation = () => {
  arithmeticEquation = sumOfNumsString.join("");
  console.log(arithmeticEquation)
  bracketsFromEquation = arithmeticEquation.match(/\([^()]*\)/g);

  console.log(bracketsFromEquation)
  const removeBracketsFromEquation = bracketsFromEquation?.map(equation =>
    equation.slice(1, -1));
  console.log(removeBracketsFromEquation)

  if (removeBracketsFromEquation) {
    evaluatedExpressions = removeBracketsFromEquation.map(performEquationWithinBrackets);
    console.log(evaluatedExpressions);
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
  newExpression = arithmeticEquation;
    if (bracketsFromEquation){
    bracketsFromEquation.forEach((equation, index) => {
      newExpression = newExpression.replace(equation, evaluatedExpressions[index].toString())
    })
  }
  console.log(newExpression)
}

const seperatingArrayIntoNumbersAndOperators = () => {
  storingNumbers = newExpression.match(/\d+/g)?.map(Number);
  console.log(storingNumbers)
  storingOperators = newExpression.match(/\D/g);
  console.log(storingOperators)
}

const handleClickedButtonToScreenEquation = (event: Event) => {      // Function to put last pressed button into screen
  const inputtedButton = event.currentTarget as HTMLButtonElement;
    if (screenEquation.innerText === "0" && screenEquation.innerText.length == 1 ) {
      screenEquation.innerText = ""; // Removes the 0 on screen when typing starts
    }
    screenEquation.innerText += inputtedButton.innerText;
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

const postingAnswer = (): void => {                             // Changes the answer section on calc to answer
  for (let i = 0; i < storingOperators.length; i++){
      if (storingOperators[i] === "+") {
        answer = (storingNumbers[0] + storingNumbers[1]);
      } else if (storingOperators[i] === "x") {
        answer = (storingNumbers[0] * storingNumbers[1]);
      } else if (storingOperators[i] === "-") {
        answer = (storingNumbers[0] - storingNumbers[1]);
      } else if (storingOperators[i] === "÷") {
        answer = (storingNumbers[0] / storingNumbers[1]);
      }
    storingNumbers.splice(0, 2);
    storingNumbers.unshift(answer)
    screenAnswer.innerText = answer.toString()
  }
};

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
    for (let i = numbersWithOperator.length; i > 0; i--){
      numbersWithOperator.pop()
    }
    for (let i = storingNumbers.length; i > 0; i--){
      storingNumbers.pop()
    }
    for (let i = sumOfNumsString.length; i > 0; i--) {
      sumOfNumsString.pop();
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




