const symbols = ['🍎', '🍌', '🍒', '🍇', '🍓', '🍍', '🥝', '🥭'];

let cards = [...symbols, ...symbols];
let flippedCards = [];
let matches = 0;
let clickable = true;

const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('reset-btn');

restartButton.addEventListener('click', restartGame);

init();

function init() {
  clickable = true;
  matches = 0;
  flippedCards = [];
  shuffle(cards);
  renderCards();
}

function restartGame() {
  init();
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function renderCards() {
  gameBoard.innerHTML = '';
  cards.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.addEventListener('click', handleCardClick);
    gameBoard.appendChild(card);
  });
}

function handleCardClick() {
  if (!clickable || flippedCards.length === 2) return;

  const index = parseInt(this.dataset.index);
  const symbol = cards[index];

  if (flippedCards.includes(index)) return;

  this.textContent = symbol;
  flippedCards.push(index);

  if (flippedCards.length === 2) {
    clickable = false;
    setTimeout(checkMatch, 1000);
  }


}




function checkMatch() {
  const [index1, index2] = flippedCards;
  const symbol1 = cards[index1];
  const symbol2 = cards[index2];

  const cardsElements = document.querySelectorAll('.card');

  if (symbol1 === symbol2) {
    cardsElements[index1].classList.add('hide');
    cardsElements[index2].classList.add('hide');
    matches++;
     if (matches === symbols.length) {
      setTimeout(() => {
        alert('Has unido todas las parejas correctamente');
       disableInput();
      }, 500);
    }
  } else {
    cardsElements[index1].textContent = '';
    cardsElements[index2].textContent = '';
  }

  flippedCards = [];
  clickable = true;
}



