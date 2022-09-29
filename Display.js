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
    // borrar el ultimo elemento del string
    delete() {
        this.actualValue = this.actualValue.toString().slice(0,-1);
        this.printValues();
    }
    // reset todo (C de clear)
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
    // agregando numeros
    addNumber(number) {
        // si es punto y ya existe uno que no lo agregue
        if(number === '.' && this.actualValue.includes('.')) return
        // que agregue sumandolo al string
        this.actualValue = this.actualValue.toString() + number.toString();
        // llamo para que imprima
        this.printValues();
    }
    // imprimiento valores
    printValues() {
        this.displayActualValue.textContent = this.actualValue;
        this.displayLastValue.textContent = `${this.lastValue} ${this.signs[this.operationType] || ''}`;
    }
    // toma valores y los calcula
    calculate() {
        // lo convierto a numero
        const lastValue = parseFloat(this.lastValue);
        const actualValue = parseFloat(this.actualValue);

        if(isNaN(actualValue) || isNaN(lastValue)) return
        this.actualValue = this.calculating[this.operationType](lastValue, actualValue);
    }
}