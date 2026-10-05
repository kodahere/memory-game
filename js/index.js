import { createHeader } from './components/header.js';
import { createBoard } from './components/board.js';
import { createCard } from './components/card.js';
import { createModal } from './components/modal.js';

const CHAMPIONS = ['Yasuo', 'Lux', 'Jinx', 'Ahri', 'Ezreal', 'Garen', 'Teemo', 'Zed'];

let moves = 0;
let pairs = 0;
let firstCard = null;
let isBoardLocked = false;
let mismatchTimer = null;
let cards = [];

const header = createHeader({
  onNewGame: startNewGame,
  onShowLeaders: () => console.log('Лидеры нажаты'),
});

const winModal = createModal();

const board = createBoard();
document.body.append(header.element, winModal.element, board.element);


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createCards() {
  const doubled = CHAMPIONS.concat(CHAMPIONS);
  const shuffled = shuffle(doubled);

  return shuffled.map((value, index) => {
    return createCard({
      id: index,
      value: value,
      onClick: handleCardClick,
    });
  });
}

function startNewGame() {
  winModal.close();

  if (mismatchTimer !== null) {
    clearTimeout(mismatchTimer);
    mismatchTimer = null;
  }

  firstCard = null;
  isBoardLocked = false;
  moves = 0;
  pairs = 0;

  header.updateMoves(0);
  header.updatePairs(0, 8);

  cards = createCards();
  board.setCards(cards);
}

function handleCardClick(cardId) {
  if (isBoardLocked) return;

  const card = cards.find((c) => c.getId() === cardId);
  if (!card) return;

  if (firstCard === null) {
    card.open();
    firstCard = card;
    return;
  }

  card.open();
  isBoardLocked = true;
  moves++;
  header.updateMoves(moves);

  if (firstCard.getValue() === card.getValue()) {
    firstCard.lock();
    card.lock();
    pairs++;
    header.updatePairs(pairs, 8);

    if (pairs === 8) {
      setTimeout(() => {
        const message = document.createElement('p');
        message.textContent = `Вы нашли все пары за ${moves} ходов!`;

        const newGameBtn = document.createElement('button');
        newGameBtn.type = 'button';
        newGameBtn.className = 'btn btn--new';
        newGameBtn.textContent = 'Новая игра';
        newGameBtn.addEventListener('click', startNewGame);

        const content = document.createElement('div');
        content.append(message, newGameBtn);

        winModal.open({ title: 'Победа!', content });
      }, 700);
    }

    firstCard = null;
    isBoardLocked = false;
  } else {
    mismatchTimer = setTimeout(() => {
      firstCard.close();
      card.close();
      firstCard = null;
      isBoardLocked = false;
      mismatchTimer = null;
    }, 1000);
  }
}

startNewGame();