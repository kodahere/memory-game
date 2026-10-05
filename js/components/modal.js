export function createModal() {
  const element = document.createElement("div");
  element.className = "modal";

  const content = document.createElement("div");
  content.className = "modal__content";

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "modal__close";
  closeBtn.textContent = "×";

  const title = document.createElement("h2");
  title.className = "modal__title";

  const body = document.createElement("div");
  body.className = "modal__body";

  content.append(closeBtn, title, body);
  element.append(content);

  function open({ title: newTitle, content: newContent }) {
    title.textContent = newTitle;
    body.innerHTML = "";
    body.append(newContent);
    element.classList.add("modal--open");
  }

  function close() {
    element.classList.remove("modal--open");
  }

  closeBtn.addEventListener("click", close);

  element.addEventListener("click", (e) => {
    if (e.target === element) close();
  });

  return {
    element,
    open,
    close,
  };
}