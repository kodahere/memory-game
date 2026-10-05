export function createCard({ id, value, onClick }) {
  let isOpen = false;
  let isLocked = false;

  const element = document.createElement("div");
  element.className = "card";

  const inner = document.createElement("div");
  inner.className = "card__inner";

  const front = document.createElement("div");
  front.className = "card__front";
  front.textContent = value;

  const back = document.createElement("div");
  back.className = "card__back";

  inner.append(front, back);
  element.append(inner);

  function render() {
    element.classList.toggle("card--open", isOpen);
    element.classList.toggle("card--locked", isLocked);
  }

  function open() {
    isOpen = true;
    render();
  }

  function close() {
    isOpen = false;
    render();
  }

  function lock() {
    isLocked = true;
    isOpen = true;
    render();
  }

  function reset() {
    isOpen = false;
    isLocked = false;
    render();
  }

  element.addEventListener("click", () => {
    if (isLocked) return;
    if (isOpen) return;
    onClick(id);
  });

  render();

  return {
    element,
    getId: () => id,
    getValue: () => value,
    isOpen: () => isOpen,
    isLocked: () => isLocked,
    open,
    close,
    lock,
    reset,
  };
}
