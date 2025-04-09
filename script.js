
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operatorBtn = undefined

    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (this.currentOperand.replace('.', '').length >= 12) return;
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') { this.compute() }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''

        if (Math.abs(computation) > 1e+98) {
            this.currentOperand = Infinity;
        } else {
            this.currentOperand = computation.toString().length > 12
                ? computation.toExponential(6)
                : computation;
        }
        

            


    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null && this.previousOperand !== '') {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }

}

const equalBtn = document.querySelector(".equal");
const allClearBtn = document.querySelector(".allClear")
const backspaceBtn = document.querySelector(".backspace")
const operatorBtn = document.querySelectorAll(".operator")
const numberBtn = document.querySelectorAll(".num")
const previousOperandTextElement = document.querySelector(".previousOperand")
const currentOperandTextElement = document.querySelector(".currentOperand")


const calculator = new Calculator(previousOperand, currentOperand);

numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()

    })
})

operatorBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()

    })
})

equalBtn.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearBtn.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

backspaceBtn.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

// SHIFT + ALT + F makes all the code tidy