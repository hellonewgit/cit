document.addEventListener("DOMContentLoaded", () => {
  // Логика открытия и закрытия блоков
  const blocks = document.querySelectorAll(".program__block");

  blocks.forEach((block) => {
    const toggle = block.querySelector(".program__toggle");
    const toggleText = block.querySelector(".program__block-description");
    const content = block.querySelector(".program__content");

    toggle.addEventListener("click", () => {
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        // Закрыть текущий блок
        block.classList.remove("program__block_open");
        toggle.setAttribute("aria-expanded", "false");
        content.style.maxHeight = null; // Сбрасываем высоту
      } else {
        // Открыть текущий блок
        block.classList.add("program__block_open");
        toggle.setAttribute("aria-expanded", "true");
        content.style.maxHeight = content.scrollHeight + "px"; // Устанавливаем высоту по контенту
      }
    });
    toggleText.addEventListener("click", () => {
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        // Закрыть текущий блок
        block.classList.remove("program__block_open");
        toggle.setAttribute("aria-expanded", "false");
        content.style.maxHeight = null; // Сбрасываем высоту
      } else {
        // Открыть текущий блок
        block.classList.add("program__block_open");
        toggle.setAttribute("aria-expanded", "true");
        content.style.maxHeight = content.scrollHeight + "px"; // Устанавливаем высоту по контенту
      }
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  // Логика открытия и закрытия вопросов
  const blocks = document.querySelectorAll(".faq__block");

  blocks.forEach((block) => {
    const toggle = block.querySelector(".faq__toggle");
    const question = block.querySelector(".faq__question");
    const content = block.querySelector(".faq__content");

    const toggleContent = () => {
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        block.classList.remove("faq__block_open");
        toggle.setAttribute("aria-expanded", "false");
        content.style.maxHeight = null; // Сбрасываем высоту
      } else {
        block.classList.add("faq__block_open");
        toggle.setAttribute("aria-expanded", "true");
        content.style.maxHeight = content.scrollHeight + "px"; // Устанавливаем высоту по контенту
      }
    };

    toggle.addEventListener("click", toggleContent);
    question.addEventListener("click", toggleContent);
  });
});
