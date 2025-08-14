// Función regular
function verificarParidad(num) {
    if (num % 2 === 0) {
        console.log(num + " es par");
    } else {
        console.log(num + " es impar");
    }
}

// Función flecha
const verificarParidadFlecha = (num) => {
    (num % 2 === 0)
        ? console.log(`${num} es par`)
        : console.log(`${num} es impar`);
}

// Pedir número por consola del navegador
let numero = parseInt(prompt("Digite un número:"), 10);

// Llamar ambas funciones
verificarParidad(numero);
verificarParidadFlecha(numero);

//hola