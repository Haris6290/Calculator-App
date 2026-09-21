let currentNumber = "";
let previousNumber = "";
let operator = null;

const currentDisplay = document.getElementById("current-display");
const previousDisplay = document.getElementById("previous-display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const percentageButton = document.getElementById("percentage");
const equalsButton = document.querySelector(".equals");


function updateDisplay() {
    currentDisplay.textContent = currentNumber || "0";

    if (operator && previousNumber) {
        previousDisplay.textContent = previousNumber + " " + operator;
    } else {
        previousDisplay.textContent = "";
    }
}


function addNumber(number) {

    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    if (number === "." && currentNumber === "") {
        currentNumber = "0.";
    } else {
        currentNumber += number;
    }

    updateDisplay();
}


function chooseOperator(selectedOperator) {

    if (currentNumber === "" && previousNumber === "") {
        return;
    }

    if (currentNumber !== "" && previousNumber !== "") {
        calculate();
    }

    operator = selectedOperator;
    previousNumber = currentNumber;
    currentNumber = "";

    updateDisplay();
}


function calculate() {

    if (previousNumber === "" || currentNumber === "" || operator === null) {
        return;
    }

    const firstNumber = parseFloat(previousNumber);
    const secondNumber = parseFloat(currentNumber);

    let result;

    if (operator === "+") {
        result = firstNumber + secondNumber;
    } 
    else if (operator === "−") {
        result = firstNumber - secondNumber;
    } 
    else if (operator === "×") {
        result = firstNumber * secondNumber;
    } 
    else if (operator === "÷") {

        if (secondNumber === 0) {
            currentNumber = "Error";
            previousNumber = "";
            operator = null;
            updateDisplay();
            return;
        }

        result = firstNumber / secondNumber;
    }

    currentNumber = String(result);
    previousNumber = "";
    operator = null;

    updateDisplay();
}


function clearCalculator() {

    currentNumber = "";
    previousNumber = "";
    operator = null;

    updateDisplay();
}


function deleteNumber() {

    currentNumber = currentNumber.slice(0, -1);

    updateDisplay();
}


function calculatePercentage() {

    if (currentNumber === "") {
        return;
    }

    currentNumber = String(parseFloat(currentNumber) / 100);

    updateDisplay();
}


numberButtons.forEach(button => {

    button.addEventListener("click", () => {
        addNumber(button.textContent);
    });

});


operatorButtons.forEach(button => {

    button.addEventListener("click", () => {
        chooseOperator(button.textContent);
    });

});


equalsButton.addEventListener("click", calculate);

clearButton.addEventListener("click", clearCalculator);

deleteButton.addEventListener("click", deleteNumber);

percentageButton.addEventListener("click", calculatePercentage);