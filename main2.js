// Lista de palabras para adivinar
const words = ["GATO", "PERRO", "CASA", "ARBOL", "SOL","HOLA"];

// Elegir una palabra al azar
let word = words[Math.floor(Math.random() * words.length)];

// Arreglo para almacenar las letras adivinadas
let guessedLetters = [];

// Contador de intentos
let attemptsLeft = 10;



// Función para mostrar la palabra a adivinar
function displayWord() {
    let display = '';
    for (let i = 0; i < word.length; i++) {
        if (guessedLetters.includes(word[i])) {
            display += word[i] + ' ';
        } else {
            display += '_ ';
        }
    }
    document.getElementById('wordDisplay').textContent = display.trim();
}

// Función para adivinar una letra
function guessLetter() {
    let letter = document.getElementById('letterInput').value.toUpperCase();
    if (letter && !guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        if (!word.includes(letter)) {
            attemptsLeft--;
        }
        displayWord();
        checkGameStatus();
    }
    document.getElementById('letterInput').value = '';
}

// Función para verificar si el juego ha terminado
function checkGameStatus() {
    if (attemptsLeft === 0) {
        showMessage('¡Has perdido! La palabra era: ' + word);
        disableInput();
    } else if (!document.getElementById('wordDisplay').textContent.includes('_')) {
        showMessage(' FELICIDADES Has adivinado la palabra correctamente.');
        disableInput();
    } else {
        document.getElementById('attempts').textContent = attemptsLeft;
    }
}

// Función para mostrar mensajes al usuario
function showMessage(message) {
    document.getElementById('message').textContent = message;
}

// Función para deshabilitar la entrada de letras después de que se gana o pierde el juego
function disableInput() {
    document.getElementById('letterInput').disabled = true;
    document.querySelector('button').disabled = true;
}

// Inicializar el juego al cargar la página
window.onload = function() {
    displayWord();
}
