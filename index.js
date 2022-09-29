

// llamo a los elementos del html y los defino a cada uno
const displayLastValue = document.getElementById('last-value');
const displayActualValue = document.getElementById('actual-value');


// llamo a clase Display para que se mantenga escuchando y cambiando cada vez que un boton sea presionado
const display = new Display(displayLastValue, displayActualValue);


// buttonsNumbers y buttonsOperators para llamar a todos los elementos con la clase definida y le agrego
// un evento al click llamando a la funcion addNumber para que agregue numero o llame a la funcion compute 
// si se presiona boton definido como operador
const buttonsNumbers = document.querySelectorAll('.number');
const buttonsOperators = document.querySelectorAll('.operator');

buttonsNumbers.forEach(button => {
    button.addEventListener('click', () => display.addNumber(button.innerHTML));
});
buttonsOperators.forEach(button => {
    button.addEventListener('click', () => display.compute(button.value))
});


// calculadora
class Calculator {
    add(num1, num2) {
        return num1 + num2;
    }
    subtract(num1, num2) {
        return num1 - num2;
    }
    divide(num1, num2) {
        return num1 / num2;
    }
    multiply(num1, num2) {
        return num1 * num2;
    }
} 

// display
class Display {
    constructor(displayLastValue, displayActualValue) {
        this.displayActualValue = displayActualValue;
        this.displayLastValue = displayLastValue;
        this.calculating= new Calculator();
        this.operationType = undefined;
        this.actualValue = '';
        this.lastValue = '';
        this.signs = {
            add: '+',
            divide: '%',
            multiply: 'x',
            subtract: '-', 
        }
    }
    delete() {
        this.actualValue = this.actualValue.toString().slice(0,-1);
        this.printValues();
    }
    deleteAll() {
        this.actualValue = '';
        this.lastValue = '';
        this.operationType = undefined;
        this.printValues();
    }
    compute(type) {
        this.operationType !== 'equal' && this.calculate();
        this.operationType = type;
        this.lastValue = this.actualValue || this.lastValue;
        this.actualValue = '';
        this.printValues();
    }
    addNumber(number) {
        if(number === '.' && this.actualValue.includes('.')) return
        this.actualValue = this.actualValue.toString() + number.toString();
        this.printValues();
    }
    printValues() {
        this.displayActualValue.textContent = this.actualValue;
        this.displayLastValue.textContent = `${this.lastValue} ${this.signs[this.operationType] || ''}`;
    }
    calculate() {
        const lastValue = parseFloat(this.lastValue);
        const actualValue = parseFloat(this.actualValue);
        if(isNaN(actualValue) || isNaN(lastValue)) return
        this.actualValue = this.calculating[this.operationType](lastValue, actualValue);
    }
}