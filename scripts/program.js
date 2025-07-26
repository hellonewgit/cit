document.addEventListener("DOMContentLoaded", () => {
  const setupAccordion = (selector, blockClass, toggleClass, triggerClass, contentClass) => {
    const blocks = document.querySelectorAll(selector);

    blocks.forEach((block) => {
      const toggle = block.querySelector(`.${toggleClass}`);
      const trigger = block.querySelector(`.${triggerClass}`);
      const content = block.querySelector(`.${contentClass}`);

      const handleToggle = () => {
        const isExpanded = toggle.getAttribute("aria-expanded") === "true";

        // Закрываем все блоки
        blocks.forEach((b) => {
          const t = b.querySelector(`.${toggleClass}`);
          const c = b.querySelector(`.${contentClass}`);
          b.classList.remove(`${blockClass}_open`);
          t.setAttribute("aria-expanded", "false");
          c.style.maxHeight = null;
        });

        // Открываем текущий, если он был закрыт
        if (!isExpanded) {
          block.classList.add(`${blockClass}_open`);
          toggle.setAttribute("aria-expanded", "true");
          content.style.maxHeight = content.scrollHeight + "px";
        }
      };

      toggle.addEventListener("click", handleToggle);
      trigger.addEventListener("click", handleToggle);
    });
  };

  setupAccordion(".program__block", "program__block", "program__toggle", "program__block-description", "program__content");
  setupAccordion(".faq__block", "faq__block", "faq__toggle", "faq__question", "faq__content");
});
