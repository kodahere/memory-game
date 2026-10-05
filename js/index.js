import { createHeader } from './components/header.js';

const header = createHeader({
    onNewGame: () => console.log('Новая игра нажата'),
    onShowLeaders: () => console.log('Лидеры нажаты')
});

document.body.append(header.element);

header.updateMoves(0);
header.updatePairs(0, 8);