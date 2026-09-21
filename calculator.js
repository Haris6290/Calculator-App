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


// Update display
function updateDisplay() {

    currentDisplay.textContent = currentNumber || "0";

    if (operator && previousNumber) {
        previousDisplay.textContent = previousNumber + " " + operator;
    }
    else {
        previousDisplay.textContent = "";
    }
}


// Add number
function addNumber(number) {

    // Start a new calculation after an error
    if (currentNumber === "Error") {
        currentNumber = "";
    }

    // Prevent multiple decimal points
    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    // Add zero before decimal point
    if (number === "." && currentNumber === "") {
        currentNumber = "0.";
    }
    else {
        currentNumber += number;
    }

    updateDisplay();
}


// Choose operator
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


// Calculate result
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

        // Prevent division by zero
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


// Clear calculator
function clearCalculator() {

    currentNumber = "";
    previousNumber = "";
    operator = null;

    updateDisplay();
}


// Delete last number
function deleteNumber() {

    if (currentNumber === "Error") {
        clearCalculator();
        return;
    }

    currentNumber = currentNumber.slice(0, -1);

    updateDisplay();
}


// Calculate percentage
function calculatePercentage() {

    if (currentNumber === "" || currentNumber === "Error") {
        return;
    }

    currentNumber = String(parseFloat(currentNumber) / 100);

    updateDisplay();
}


// Number button clicks
numberButtons.forEach(button => {

    button.addEventListener("click", () => {
        addNumber(button.textContent);
    });

});


// Operator button clicks
operatorButtons.forEach(button => {

    button.addEventListener("click", () => {
        chooseOperator(button.textContent);
    });

});


// Other button clicks
equalsButton.addEventListener("click", calculate);

clearButton.addEventListener("click", clearCalculator);

deleteButton.addEventListener("click", deleteNumber);

percentageButton.addEventListener("click", calculatePercentage);


// Keyboard support
document.addEventListener("keydown", (event) => {

    const key = event.key;

    // Numbers and decimal
    if (!isNaN(key) || key === ".") {
        addNumber(key);
    }

    // Addition
    else if (key === "+") {
        chooseOperator("+");
    }

    // Subtraction
    else if (key === "-") {
        chooseOperator("−");
    }

    // Multiplication
    else if (key === "*") {
        chooseOperator("×");
    }

    // Division
    else if (key === "/") {
        event.preventDefault();
        chooseOperator("÷");
    }

    // Equals
    else if (key === "Enter" || key === "=") {
        calculate();
    }

    // Delete
    else if (key === "Backspace") {
        deleteNumber();
    }

    // Clear
    else if (key === "Escape") {
        clearCalculator();
    }

    // Percentage
    else if (key === "%") {
        calculatePercentage();
    }

});