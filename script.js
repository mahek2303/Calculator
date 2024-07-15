const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

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
    const inputValue = parseFloat(displayValue); 

    if (nextOperator === '+/-') {
        calculator.displayValue = (parseFloat(calculator.displayValue) * -1).toString();
        return;
    }

    if (nextOperator === '%') {
        calculator.displayValue = (parseFloat(calculator.displayValue) / 100).toString();
        return;
    }

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`; 
        calculator.firstOperand = result; 
    }

    calculator.waitingForSecondOperand = true; 
    calculator.operator = nextOperator;
}

