import { createHeader } from './components/header.js';
import { createBoard } from './components/board.js';
import { createCard } from './components/card.js';

const header = createHeader({
  onNewGame: () => console.log('Новая игра нажата'),
  onShowLeaders: () => console.log('Лидеры нажаты'),
});

const CHAMPIONS = ['Yasuo', 'Lux', 'Jinx', 'Ahri', 'Ezreal', 'Garen', 'Teemo', 'Zed'];
const doubled = CHAMPIONS.concat(CHAMPIONS);

const cards = doubled.map((value, index) => {
  return createCard({
    id: index,
    value: value,
    onClick: (cardId) => console.log('clicked card', cardId),
  });
});

const board = createBoard();
board.setCards(cards);

document.body.append(header.element, board.element);

header.updateMoves(0);
header.updatePairs(0, 8);