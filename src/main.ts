import "./style.scss";
                                  // Declaring variables for html elements
const buttonsNumber =
  document.querySelectorAll<HTMLButtonElement>(".button--number");
const buttonsEqual =
  document.querySelector<HTMLButtonElement>(".button--equals");
const screenAnswer = document.querySelector<HTMLDivElement>(".screen--answer");

const sumOfNumsString: string[] = [];   // String to hold inputted numbers
let finalAnswer = 0;            // Variable to hold final answer


const handleClickedButtonNumberToArray = (event: Event) => {    // Takes value of clicked button
  const value = event.currentTarget as HTMLButtonElement;       // and adds the value to an array
  console.log(value.innerText);
  sumOfNumsString.push(value.innerText);
  console.log(sumOfNumsString);
};

const addingNumbers = (): number => {                            // Adds all the numbers within array
  const sumOfNums: number[] = sumOfNumsString.map(Number); // Creates array with number type  
  for (let i: number = 0; i < sumOfNums.length; i++) {
    finalAnswer += sumOfNums[i];
  }
  console.log(finalAnswer);
  return finalAnswer;
};

const result = addingNumbers();
console.log(result);

const postingAnswer = (): void => {               // Changes the answer section on calc to answer
  if (screenAnswer) {
    (screenAnswer.innerText = finalAnswer.toString());
  } else {
    (console.error("ERROR"));
  }
};

// Multiple event listeners

buttonsNumber.forEach((buttonNumber) => {
  buttonNumber.addEventListener("click", handleClickedButtonNumberToArray);
});

if (buttonsEqual) {
  buttonsEqual.addEventListener("click", () => {
    addingNumbers();
    postingAnswer();
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
