import "./style.scss";

const sumOfNumsString: unknown[] = []; // String to hold inputted numbers
const equationOnScreen: string[] = [];
const storingOperatorType: string[] = [];
let finalAnswer: number = 0; // Variable to hold final answer
let currentSum: number = 0;
let firstNumberAsNumber = 0;
let seconNumberAsNumber = 0;

// Declaring variables for html elements
const buttonsNumber = document.querySelectorAll<HTMLButtonElement>(".button--number");
const buttonsEqual = document.querySelector<HTMLButtonElement>(".button--equals");
const screenAnswer = document.querySelector<HTMLDivElement>(".screen--answer");
const buttonAdd = document.querySelector<HTMLButtonElement>(".button--add");
const buttonSubtract = document.querySelector<HTMLButtonElement>(".button--subtract");
const buttonMultiply = document.querySelector<HTMLButtonElement>(".button--multiply");
const buttonDivide = document.querySelector<HTMLButtonElement>(".button--divide");
const screenEquation = document.querySelector<HTMLDivElement>(".screen--equation");
const buttonsAll = document.querySelectorAll<HTMLButtonElement>(".button");
const buttonsOperator = document.querySelectorAll<HTMLButtonElement>(".button--operator")

const handleClickedButtonNumberToArray = (event: Event) => {
  // Takes value of clicked button
  const value = event.currentTarget as HTMLButtonElement; // and adds the value to an array
  console.log(value.innerText);
  sumOfNumsString.push(value.innerText);
  console.log(sumOfNumsString);
};

const handleStoringOperatorToArray =  (event: Event) => {
  const operatorPressed = event.currentTarget as HTMLButtonElement;
  storingOperatorType.push(operatorPressed.innerText)
  console.log(storingOperatorType)
}

const handleClickedButtonToScreenEquation = (event: Event) => {           // Function to put last pressed button into screen
  const inputtedButton = event.currentTarget as HTMLButtonElement;
  if (screenEquation) {
    if (screenEquation.innerText === "0" && screenEquation.innerText.length == 1 ){
      screenEquation.innerText = "";        // Removes the 0 on screen when typing starts
    };
  };
  if (screenEquation) {
    screenEquation.innerText += inputtedButton.innerText;
  };
};

const addingNumbers = (): number => {
  // Adds all the numbers within array
  let firstNumber = sumOfNumsString.join(""); // Joins all numbers so far in a string
  firstNumberAsNumber = parseFloat(firstNumber); // Turns joined string vers of number into number type
  const sumOfNums: number[] = []; // Creates array with number type
  sumOfNums.push(firstNumberAsNumber); // Puts number type number into an array
  console.log(firstNumberAsNumber);
  console.log(sumOfNumsString);
  for (let i: number = 0; i < sumOfNumsString.length; i = 0){    // Clears array
    sumOfNumsString.shift();
  }
  console.log(sumOfNumsString);
  return firstNumberAsNumber;
};

const addingNumbers2 = (): number => {
  let secondNumber = sumOfNumsString.join("");
  seconNumberAsNumber = parseFloat(secondNumber);
  return seconNumberAsNumber;
};

console.log(firstNumberAsNumber);

const result = addingNumbers();
console.log(result);

const postingAnswer = (): void => {
  // Changes the answer section on calc to answer
  if (screenAnswer) {
    screenAnswer.innerText = (firstNumberAsNumber + seconNumberAsNumber).toString();
  } else {
    console.error("ERROR");
  }
};

// Multiple event listeners

buttonsNumber.forEach((buttonNumber) => {
  buttonNumber.addEventListener("click", handleClickedButtonNumberToArray);
});

buttonsAll.forEach((button) => {
  button.addEventListener("click", handleClickedButtonToScreenEquation)
})

buttonsOperator.forEach((operator) => {
  operator.addEventListener("click", handleStoringOperatorToArray)
})

if (buttonAdd) {
  buttonAdd.addEventListener("click", ()=> {
     addingNumbers();

  })
}

if (buttonsEqual) {
  buttonsEqual.addEventListener("click", () => {
    addingNumbers2(); // Calls two functions, adding numbers first to get
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
