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