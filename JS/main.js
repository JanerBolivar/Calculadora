document.addEventListener('DOMContentLoaded', () => {
    const operationDisplay = document.querySelector('.operation');
    const resultDisplay = document.querySelector('.result');
    const buttons = document.querySelectorAll('button');
    let currentOperation = '';
    let currentResult = 0;
    let lastOperationComplete = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.value;

            if (value === 'C') {
                clear();
            } else if (value === '=') {
                calculate();
                lastOperationComplete = true;
            } else {
                appendValue(value);
            }

            updateDisplay();
        });
    });

    function appendValue(value) {
        if (lastOperationComplete) {
            if (isOperator(value)) {
                currentOperation = currentResult + value;
            } else {
                currentOperation = value;
                currentResult = 0;
            }
            lastOperationComplete = false;
        } else {
            if (isOperator(value) && isOperator(currentOperation.slice(-1))) {
                currentOperation = currentOperation.slice(0, -1) + value;
            } else {
                currentOperation += value;
            }
        }
    }

    function isOperator(char) {
        return ['+', '-', '*', '/'].includes(char);
    }

    function calculate() {
        try {
            currentResult = eval(currentOperation);
            currentOperation += '=' + currentResult;
        } catch (error) {
            currentResult = 'Error';
            currentOperation = 'Error';
        }
    }

    function clear() {
        currentOperation = '';
        currentResult = 0;
        lastOperationComplete = false;
    }

    function updateDisplay() {
        operationDisplay.textContent = currentOperation || '0';
        resultDisplay.textContent = currentResult;
    }
});