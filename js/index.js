import { createHeader } from './components/header.js';
import { createBoard } from './components/board.js';
import { createCard } from './components/card.js';
import { createModal } from './components/modal.js';

const header = createHeader({
  onNewGame: () => console.log('Новая игра нажата'),
  onShowLeaders: () => console.log('Лидеры нажаты'),
});

const winModal = createModal();

const CHAMPIONS = ['Yasuo', 'Lux', 'Jinx', 'Ahri', 'Ezreal', 'Garen', 'Teemo', 'Zed'];
const doubled = CHAMPIONS.concat(CHAMPIONS);

const cards = doubled.map((value, index) => {
  return createCard({
    id: index,
    value: value,
    onClick: handleCardClick,
  });
});

let moves = 0;
let pairs = 0;
let firstCard = null;
let isBoardLocked = false;

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
        winModal.open({ title: 'Победа!', content: message });
      }, 700);
    }

    firstCard = null;
    isBoardLocked = false;
  } else {
    setTimeout(() => {
      firstCard.close();
      card.close();
      firstCard = null;
      isBoardLocked = false;
    }, 1000);
  }
}

const board = createBoard();
board.setCards(cards);

document.body.append(header.element, winModal.element, board.element);