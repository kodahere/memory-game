export function createHeader({ onNewGame, onShowLeaders }) {
  const header = document.createElement("header");
  header.className = "header";

  const stats = document.createElement("div");
  stats.className = "header__stats";

  const movesLabel = document.createElement("span");
  movesLabel.textContent = "Ходы: ";

  const movesValue = document.createElement("span");
  movesValue.className = "header__moves";
  movesValue.textContent = "0";

  const pairsLabel = document.createElement("span");
  pairsLabel.textContent = "Пары: ";

  const pairsValue = document.createElement("span");
  pairsValue.className = "header__pairs";
  pairsValue.textContent = "0 / 8";

  stats.append(movesLabel, movesValue, pairsLabel, pairsValue);

  const controls = document.createElement("div");
  controls.className = "header__controls";

  const newGameBtn = document.createElement("button");
  newGameBtn.type = "button";
  newGameBtn.className = "btn btn--new";
  newGameBtn.textContent = "Новая игра";

  const leadersBtn = document.createElement("button");
  leadersBtn.type = "button";
  leadersBtn.className = "btn btn--leaders";
  leadersBtn.textContent = "Лидеры";

  controls.append(newGameBtn, leadersBtn);
  header.append(stats, controls);

  newGameBtn.addEventListener('click', onNewGame);
  leadersBtn.addEventListener('click', onShowLeaders);

  return {
    element: header,
    updateMoves: (n) => {
      movesValue.textContent = String(n);
    },
    updatePairs: (found, total) => {
      pairsValue.textContent = `${found} / ${total}`;
    },
  };
}

