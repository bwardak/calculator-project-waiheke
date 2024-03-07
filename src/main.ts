import "./style.scss";

const buttonsNumber =
  document.querySelectorAll<HTMLButtonElement>(".button--number");
const buttonsEqual =
  document.querySelector<HTMLButtonElement>(".buttons--equals");
const screenAnswer = document.querySelector<HTMLDivElement>(".screen--answer");

// const equationAnswer = (event: Event) => {
//   const answer = event.currentTarget as HTMLDivElement;
//   answer.innerText = sumOfEquation;
// };

const sumOfNumsString: string[] = [];
let finalAnswer = 0;

// if (!buttonsNumber || !buttonsEqual || !screenAnswer || !sumOfNumsString ) {
//   throw new Error("Issues with Selector");
// }

const handleClickButtonWithEvent = (event: Event) => {
  const value = event.currentTarget as HTMLButtonElement;
  console.log(value.innerText);
  sumOfNumsString.push(value.innerText)
  console.log(sumOfNumsString)
};


const addingNumbers = (): number => {
  const sumOfNums = sumOfNumsString.filter((e) => typeof e === "string") as number[];
  for (let i: number = 0; i < sumOfNums.length; i++) {
    finalAnswer += sumOfNums[i]
  }
  console.log(sumOfNums)
  return finalAnswer
}

const result = addingNumbers();
console.log(result)

const postingAnswer = (): number => {
  addingNumbers()
  let outputAnswer = finalAnswer;
  console.log(outputAnswer)
  if (screenAnswer)
  return screenAnswer.innerText = outputAnswer as string;
}





// Multiple event listeners

buttonsNumber.forEach((buttonNumber) => {
  buttonNumber.addEventListener("click", handleClickButtonWithEvent);
});

if (buttonsEqual) {
  buttonsEqual.addEventListener("click", postingAnswer);
}

if (screenAnswer){
  screenAnswer.addEventListener("click", postingAnswer)
}






// Button clicks when clicking middle
// Makes the buttons only add the numbers and the rest get ommitted
