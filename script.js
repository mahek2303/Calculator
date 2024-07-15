const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

// Function to update the calculator display
function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

updateDisplay();

// Event listener for button clicks
const keys = document.querySelector('#calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event; // Get the clicked element
    const { value } = target; // Get the value of the clicked element
    if (!target.matches('button')) {
        return; // Ignore clicks that are not on buttons
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
        case '%':
        case '+/-':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'all-clear':
            resetCalculator();
            break;
        default:
            if (Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }
    }

    updateDisplay();
});

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue); // Parse the current display value to a float

    // Handle +/- button
    if (nextOperator === '+/-') {
        calculator.displayValue = (parseFloat(calculator.displayValue) * -1).toString();
        return;
    }

    // Handle % button
    if (nextOperator === '%') {
        calculator.displayValue = (parseFloat(calculator.displayValue) / 100).toString();
        return;
    }

    // If an operator already exists and waiting for the second operand is true, update the operator and return
    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand == null && !isNaN(inputValue)) {
        // If firstOperand is null and the input value is a number, set the first operand
        calculator.firstOperand = inputValue;
    } else if (operator) {
        // If an operator exists, perform the calculation
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`; // Round the result to avoid floating-point precision issues
        calculator.firstOperand = result; // Set the result as the new first operand
    }

    calculator.waitingForSecondOperand = true; // Set the flag to wait for the second operand
    calculator.operator = nextOperator; // Update the operator
}

// Function to perform calculations
function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            return firstOperand / secondOperand;
        default:
            return secondOperand;
    }
}

// Function to handle digit button clicks
function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        // If waiting for the second operand, set the display value to the digit
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        // Otherwise, append the digit to the current display value
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand) {
        // If waiting for the second operand, set the display value to '0.' and reset the flag
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        return;
    }

    if (!calculator.displayValue.includes(dot)) {
        // If the display value does not already include a decimal point, append the dot
        calculator.displayValue += dot;
    }
}

// all clear function. resets the calculator
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}
