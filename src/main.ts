import "./scss/style.scss";

const sumOfNumsString: unknown[] = []; 
let storingNumbers: number [] = [];
let storingOperators: string[] = [];
let storingAnswer: string[] = [];
let evaluatedExpressions: number[] = [];
let arithmeticEquation: string;
let bracketsFromEquation: RegExpMatchArray | null = null;
let newExpression: string;
let storingOperatorsPlusMinus;
let storingOperatorsPlusMinusString;

const buttonsNumber = document.querySelectorAll<HTMLButtonElement>(".button--number");
const buttonsEqual = document.querySelector<HTMLButtonElement>(".button--equals");
const screenAnswer = document.querySelector<HTMLDivElement>(".screen--answer");
const screenEquation = document.querySelector<HTMLDivElement>(".screen--equation");
const buttonsAll = document.querySelectorAll<HTMLButtonElement>(".button");
const buttonsOperator = document.querySelectorAll<HTMLButtonElement>(".button--operator");
const buttonClear = document.querySelector<HTMLButtonElement>('.button--clear');
const buttonAns = document.querySelector<HTMLButtonElement>(".button--ans");
const screenNight = document.querySelector<HTMLSpanElement>(".moon")
const screenDay = document.querySelector<HTMLSpanElement>(".sun");
const body = document.body

if (!screenEquation || !screenAnswer || !buttonClear || !buttonsEqual || !buttonAns || !screenDay || !screenNight) {
  throw new Error("Issue with selector for container");
}


const handleClickedButtonNumberToArray = (event: Event) => {  
  const value = event.currentTarget as HTMLButtonElement;     
  sumOfNumsString.push(value.innerText);
  if (sumOfNumsString[0] === "+" || sumOfNumsString[0] === "+-" || sumOfNumsString[0] === "*" || sumOfNumsString[0] === "/" ){
    sumOfNumsString.shift()  // If first entry in array is operator, remove it.
  }
};

const turnStringIntoArithmeticEquation = (): void => {
  arithmeticEquation = sumOfNumsString.join("");
  bracketsFromEquation = arithmeticEquation.match(/\([^()]*\)/g);
  const removeBracketsFromEquation = bracketsFromEquation?.map((equation) =>
    equation.slice(1, -1)
  );
  if (removeBracketsFromEquation) {
    evaluatedExpressions = removeBracketsFromEquation.map(performEquationWithinBrackets);
  }
};

const performEquationWithinBrackets = (equation: string) => {
  const splittedEquation = equation.match(/(-?\d+)|([+\-*/])/g);
  if (!splittedEquation) {
    throw new Error("Error with selector");
  }
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
  return result
}

const returnBracketResultToEquation = (): void => {
  newExpression = arithmeticEquation; 
  if (bracketsFromEquation) {
    bracketsFromEquation.forEach((equation, index) => {
      newExpression = newExpression.replace(
        equation,
        evaluatedExpressions[index].toString()
      ); 
    }); 
  }
};

const seperatingArrayIntoNumbersAndOperators = (): void => {
  storingNumbers = (newExpression.match(/\d+(\.\d+)?/g) ?? []).map(Number);  
  if (screenEquation.innerText[0] === "-") {
    storingNumbers[0] = storingNumbers[0] * -1;
  }
  storingOperatorsPlusMinus = newExpression.match(/[^\d.]+/g);
  storingOperatorsPlusMinusString = storingOperatorsPlusMinus?.join("")
  storingOperators = storingOperatorsPlusMinusString?.match(/\D/g) || [];
}

const handleClickedButtonToScreenEquation = (event: Event) => {      
  const inputtedButton = event.currentTarget as HTMLButtonElement;
  if (screenEquation.innerText === "0" && screenEquation.innerText.length == 1 ) {
    screenEquation.innerText = ""; 
  } 
  if (inputtedButton.innerText === "+-") {
    screenEquation.innerText += "-";
  } else {
    screenEquation.innerText += inputtedButton.innerText;
  }
};


const removeRedundantPlus = (operators: string[]) => {
  let minusIndex = operators.findIndex((op) => op === "-");
  while (minusIndex !== -1) {
    let plusIndex = minusIndex - 1;
    while (operators[plusIndex] === "+") {
      operators.splice(plusIndex, 1);
      plusIndex--;
      break           
    }
    minusIndex = operators.findIndex(
      (op, index) => op === "-" && index > minusIndex
    );
  }

  return operators;
};

const postingAnswer = (): void => {                             
  const finalOperators = removeRedundantPlus(storingOperators);
  for (let i = 0; i < storingOperators.length; i++) {
    if (finalOperators[i] === "*") {
      const result = storingNumbers[i] * storingNumbers[i + 1];
      storingNumbers.splice(i, 2, result);
      finalOperators.splice(i, 1);
      i--;
    } else if (finalOperators[i] === "/") {
      const result = storingNumbers[i] / storingNumbers[i + 1];
      storingNumbers.splice(i, 2, result);
      finalOperators.splice(i, 1);
      i--;
    }
  }

  
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

const handleAnswerHoldingButton = (): void => {
  if (
    screenEquation.innerText === "0" &&
    screenEquation.innerText.length == 1
  ) {
    screenEquation.innerText = ""; 
  }
  screenEquation.innerText += buttonAns.innerText.toUpperCase();
  if (storingAnswer.length > 1) {
    storingAnswer.shift;
  }
  for (let i = sumOfNumsString.length; i > 0; i--) {
    sumOfNumsString.pop();
  }
  sumOfNumsString.push(storingAnswer[0]);
  for (let i = storingAnswer.length; i > 0; i--) {
    storingAnswer.pop();
  }
};

const handleStoringOperatorToArray = (event: Event) => {
  const operatorPressed = event.currentTarget as HTMLButtonElement;
  sumOfNumsString.push(operatorPressed.innerText,);    
};

const handleResetCalculator = (): void => {
  if (screenAnswer) {
    screenAnswer.innerText = "";
  }
  screenEquation.innerText = "0";
  for (let i = storingNumbers.length; i > 0; i--) {
    storingNumbers.pop();
  }
  for (let i = sumOfNumsString.length; i > 0; i--) {
    sumOfNumsString.pop();
  }
  for (let i = storingOperators.length; i > 0; i--) {
    storingOperators.pop();
  }
};


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
  
});

buttonsEqual.addEventListener("click", () => {
  turnStringIntoArithmeticEquation();
  returnBracketResultToEquation();
  seperatingArrayIntoNumbersAndOperators();
  postingAnswer();
});

screenNight.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
})

screenDay.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
})








