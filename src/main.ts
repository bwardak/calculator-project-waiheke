import "./style.scss";

const sumOfNumsString: unknown[] = []; // String to hold inputted numbers
const storingNumbers: number | string [] = [];
let answer: number = 0; // Variable to hold final answer
let firstNumberAsNumber = 0;
const numbersWithOperator: unknown [] = [];

const buttonsNumber = document.querySelectorAll<HTMLButtonElement>(".button--number");
const buttonsEqual = document.querySelector<HTMLButtonElement>(".button--equals");
const screenAnswer = document.querySelector<HTMLDivElement>(".screen--answer");
const screenEquation = document.querySelector<HTMLDivElement>(".screen--equation");
const buttonsAll = document.querySelectorAll<HTMLButtonElement>(".button");
const buttonsOperator = document.querySelectorAll<HTMLButtonElement>(".button--operator");
const buttonClear = document.querySelector<HTMLButtonElement>('.button--clear')

const handleClickedButtonNumberToArray = (event: Event) => {
  // Takes value of clicked button
  const value = event.currentTarget as HTMLButtonElement; // and adds the value to an array
  // console.log(value.innerText);
  sumOfNumsString.push(value.innerText);
  // console.log(sumOfNumsString);
};



const handleClickedButtonToScreenEquation = (event: Event) => {
  // Function to put last pressed button into screen
  const inputtedButton = event.currentTarget as HTMLButtonElement;
  if (screenEquation) {
    if (screenEquation.innerText === "0" && screenEquation.innerText.length == 1 ) {
      screenEquation.innerText = ""; // Removes the 0 on screen when typing starts
    }
  }
  if (screenEquation) {
    screenEquation.innerText += inputtedButton.innerText;
  }
};

const addingNumbers = (): void => {
  let firstNumber = sumOfNumsString.join(""); 
  firstNumberAsNumber = parseFloat(firstNumber);
  if (!isNaN(firstNumberAsNumber)){
    storingNumbers.push(firstNumberAsNumber);
  }
  for (let i: number = 0; i < sumOfNumsString.length; i = 0) {
    sumOfNumsString.shift();
  }
};



const postingAnswer = (): void => {
  // Changes the answer section on calc to answer
  for (let i = 0; i < numbersWithOperator.length; i++){

    if (screenAnswer) {
      if (numbersWithOperator[i] === "+") {
        answer = (storingNumbers[0] + storingNumbers[1]);
      } else if (numbersWithOperator[i] === "x") {
        answer = (storingNumbers[0] * storingNumbers[1]);
      } else if (numbersWithOperator[i] === "-") {
        answer = (storingNumbers[0] - storingNumbers[1]);
      } else if (numbersWithOperator[i] === "÷") {
        answer = (storingNumbers[0] / storingNumbers[1]);
      }
    } else {
      console.error("ERROR");
    }
    storingNumbers.splice(0, 2);
    storingNumbers.unshift(answer)
    if(screenAnswer){
    screenAnswer.innerText = answer.toString()
    }
  }
};

const handleStoringOperatorToArray = (event: Event) => {
  const operatorPressed = event.currentTarget as HTMLButtonElement;
  numbersWithOperator.push(operatorPressed.innerText,);
};

const handleResetCalculator = () => {
  if (screenAnswer){
    screenAnswer.innerText = "";
  }
  if (screenEquation){
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
}

// Multiple event listeners

buttonsNumber.forEach((buttonNumber) => {
  buttonNumber.addEventListener("click", handleClickedButtonNumberToArray);
});

buttonsAll.forEach((button) => {
  button.addEventListener("click", handleClickedButtonToScreenEquation);
});

if (buttonClear) {
  buttonClear.addEventListener("click", handleResetCalculator);
}

buttonsOperator.forEach((operator) => {
  operator.addEventListener("click", handleStoringOperatorToArray);
  operator.addEventListener("click", addingNumbers);
});

if (buttonsEqual) {
  buttonsEqual.addEventListener("click", () => {
    addingNumbers(); // Calls two functions, adding numbers first to get
    postingAnswer(); // Final answer for postingAnswer()
  });
}

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

// for (let i: number = 0; i < sumOfNums.length; i++) {
//     if (!sumOfNums[0]){
//       if (sumOfNums[i] === "+"){
//         additionSum += sumOfNums[i + 1];
//         i++;
//       } else if (sumOfNums[i] === "-") {
//         subtractionSum -= sumOfNums [i + 1];
//         i++;
//       } else if(sumOfNums[i] === "*"){
//         multiplySum *= sumOfNums[i + 1];
//         i++;
//       } else if (sumOfNums[i] === "/"){
//         divisionSum /= sumOfNums[i + 1];
//         i++;
//       }                                                        Saved code that i may go back to
