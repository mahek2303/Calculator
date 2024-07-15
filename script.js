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
