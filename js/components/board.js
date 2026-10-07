export function createBoard() {
  const element = document.createElement("div");
  element.className = "board";

  function setCards(cards) {
    element.replaceChildren();
    element.append(...cards.map((card) => card.element));
  }

  return {
    element,
    setCards,
  };
}