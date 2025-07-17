// Функция для инициализации скриптов для хедера
function initHeaderScripts() {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");

  if (!burger || !nav) return;

  // Открытие/закрытие меню
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav--active");
    burger.classList.toggle("burger--active");
  });

  // Закрытие меню при клике вне области меню
  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !burger.contains(event.target)) {
      nav.classList.remove("nav--active");
      burger.classList.remove("burger--active");
    }
  });
}

initHeaderScripts();
// Мобильное меню выпадающее 
document.addEventListener("DOMContentLoaded", () => {
  const headings = document.querySelectorAll(".nav__mob-heading");

  headings.forEach((heading) => {
    heading.addEventListener("click", () => {
      const parentItem = heading.parentElement;
      const content = parentItem.querySelector("ul");
      const icon = heading.querySelector(".nav__mob-icon");
      const isActive = parentItem.classList.contains("active");

      // Закрываем все элементы, кроме текущего
      document.querySelectorAll(".nav__dropdown-item").forEach((item) => {
        const itemContent = item.querySelector("ul");
        const itemIcon = item.querySelector(".nav__mob-icon");
        if (itemContent && itemIcon) {
          itemContent.style.maxHeight = 0;
          item.classList.remove("active");
          itemIcon.textContent = "+";
          itemIcon.classList.remove("active");
        }
      });

      // Если текущий элемент не активен, открываем его
      if (isActive) {
        const contentHeight = content.scrollHeight;
        content.style.maxHeight = `${contentHeight}px`;
        parentItem.classList.add("active");
        icon.textContent = "−";
        icon.classList.add("active");
      }
    });
  });
});



const headings = document.querySelectorAll(".nav__mob-heading");

headings.forEach((heading) => {
  heading.addEventListener("click", () => {
    const parentItem = heading.parentElement;
    const isActive = parentItem.classList.contains("active");

    // Закрываем все остальные элементы
    document.querySelectorAll(".nav__dropdown-item.active").forEach((item) => {
      item.classList.remove("active");
    });

    // Если текущий элемент не был активен, открываем его
    if (!isActive) {
      parentItem.classList.add("active");
    }
  });
});

// Функция для инициализации скриптов для футера
function initFooterScripts() {
  const accordions = document.querySelectorAll(".footer__accordion-header");
  if (!accordions.length) return;

  accordions.forEach((accordion) => {
    accordion.addEventListener("click", () => {
      const content = accordion.nextElementSibling; // Контент под кнопкой
      const icon = accordion.querySelector(".footer__accordion-icon");

      // Закрываем все остальные аккордеоны
      document.querySelectorAll(".footer__accordion-content").forEach((item) => {
        if (item !== content) {
          item.classList.remove("open");
          item.style.maxHeight = null;
        }
      });

      // Переключаем текущий аккордеон
      if (content.classList.contains("open")) {
        content.classList.remove("open");
        content.style.maxHeight = null; // Скрываем
        icon.textContent = "+"; // Меняем значок на "+"
      } else {
        content.classList.add("open");
        content.style.maxHeight = content.scrollHeight + "px"; // Открываем
        icon.textContent = "−"; // Меняем значок на "−"
      }
    });
  });
}

initFooterScripts();

// Экранирующая функция для безопасности
const sanitizeHTML = text => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

// Получаем все кнопки фильтров
const filterButtons = document.querySelectorAll('.programs__filter');

// Добавляем событие для каждого фильтра
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Удаляем класс 'active' у всех кнопок
    filterButtons.forEach(btn => btn.classList.remove('programs__filter_active'));

    // Добавляем класс 'active' к нажатой кнопке
    button.classList.add('programs__filter_active');

    // Выполняем фильтрацию курсов
    const filter = button.getAttribute('data-filter');
    renderCourses(filter);
  });
});

// Маска для поля ввода
document.addEventListener("DOMContentLoaded", function () {
  const phoneInputs = document.querySelectorAll(".phone-number");

  phoneInputs.forEach((phoneInput) => {
    IMask(phoneInput, {
      mask: '+7 (000) 000-00-00', // Маска для российского номера телефона
      lazy: false, // Маска всегда отображается
      placeholderChar: '_', // Символ заполнителя
      overwrite: true, // Включает режим замены символов
    });
  });
});

function addHoverEffect() {
  const cards = document.querySelectorAll(".course-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // Позиция курсора относительно карточки
      const y = e.clientY - rect.top;

      // Создаём "огонёк"
      const flame = document.createElement("div");
      flame.classList.add("flame");
      flame.style.left = `${x}px`;
      flame.style.top = `${y}px`;

      // Добавляем "огонёк" в карточку
      card.appendChild(flame);

      // Удаляем "огонёк" после завершения анимации
      flame.addEventListener("animationend", () => {
        flame.remove();
      });
    });
  });
}
addHoverEffect();

// Показать/скрыть контент отзыва
document.addEventListener("DOMContentLoaded", () => {
  const reviewLinks = document.querySelectorAll(".reviews__link");

  reviewLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Отменяем стандартное поведение ссылки

      const blockquote = link.previousElementSibling; // Находим соседний элемент reviews__text
      const isExpanded = blockquote.classList.toggle("expanded"); // Переключаем класс expanded

      if (isExpanded) {
        // Вычисляем и устанавливаем высоту для плавного раскрытия
        blockquote.style.height = `${blockquote.scrollHeight}px`;
        setTimeout(() => {
          blockquote.style.height = "auto"; // Устанавливаем auto после анимации для адаптивности
        }, 500); // Время совпадает с transition в CSS
      } else {
        // Для сворачивания вычисляем текущую высоту
        blockquote.style.height = `${blockquote.scrollHeight}px`;
        requestAnimationFrame(() => {
          blockquote.style.height = "160px"; // Высота в свернутом состоянии
        });
      }

      // Обновляем текст ссылки
      link.innerHTML = isExpanded
        ? 'Скрыть благодарственное письмо <img src="images/link-24.svg" alt="link" />'
        : 'Открыть благодарственное письмо <img src="images/link-24.svg" alt="link" />';
    });
  });
});

/// Слайдер статьи 
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".slider-articles__container");
  const articles = Array.from(container.querySelectorAll(".slider-articles__card")); // Только карточки с модификатором
  const prevButton = document.querySelector(".slider-articles__arrow--prev");
  const nextButton = document.querySelector(".slider-articles__arrow--next");

  let currentIndex = 0;

  // Рассчитываем ширину одной карточки
  const getCardWidth = () => {
    if (window.innerWidth > 1024) return 100 / 3; // На десктопе 3 карточки видны
    if (window.innerWidth > 767) return 100 / 2; // На планшете 2 карточки видны
    return 90; // На мобильных ширина карточки 90%
  };

  // Обновляем transform для плавного перелистывания
  const updateSlider = () => {
    const offset = -currentIndex * getCardWidth(); // Смещение на одну карточку
    container.style.transform = `translateX(${offset}%)`;
  };

  // Обработчик для кнопки Next
  const nextSlide = () => {
    if (currentIndex < articles.length - 1) {
      currentIndex++; // Листаем вперёд на одну карточку
    } else {
      currentIndex = 0; // Зацикливание: возвращаемся к началу
    }
    updateSlider();
  };

  // Обработчик для кнопки Prev
  const prevSlide = () => {
    if (currentIndex > 0) {
      currentIndex--; // Листаем назад на одну карточку
    } else {
      currentIndex = articles.length - 1; // Зацикливание: переходим к последней карточке
    }
    updateSlider();
  };

  // Привязка событий к кнопкам
  nextButton.addEventListener("click", nextSlide);
  prevButton.addEventListener("click", prevSlide);

  // Свайп на мобильных устройствах
  let startX = 0;
  let endX = 0;

  container.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX;
  });

  container.addEventListener("touchend", (event) => {
    endX = event.changedTouches[0].clientX;
    handleSwipe();
  });

  const handleSwipe = () => {
    const swipeThreshold = 50; // Минимальное расстояние для свайпа

    if (startX - endX > swipeThreshold) {
      nextSlide(); // Свайп влево
    } else if (endX - startX > swipeThreshold) {
      prevSlide(); // Свайп вправо
    }
  };

  // Автоматическое листание
  const autoScroll = () => {
    nextSlide(); // Листаем вперёд по одной карточке
  };

  let autoScrollInterval = setInterval(autoScroll, 5000); // Листаем каждые 5 секунд

  // Останавливаем авто-прокрутку при взаимодействии
  [nextButton, prevButton, container].forEach((element) => {
    element.addEventListener("mouseenter", () => clearInterval(autoScrollInterval));
    element.addEventListener("mouseleave", () => {
      autoScrollInterval = setInterval(autoScroll, 5000);
    });
  });

  // Инициализация
  updateSlider();
});

// Функция для добавления кнопки в DOM
function createScrollTopButton() {
  const button = document.createElement('button');
  button.id = 'scrollTopBtn';
  button.classList.add('scroll-top-btn');
  button.textContent = '↑'; // Текст на кнопке

  // Добавляем кнопку в body
  document.body.appendChild(button);

  // Плавная прокрутка наверх
  button.addEventListener('click', function () {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });

  // Управление видимостью кнопки в зависимости от прокрутки
  window.onscroll = function () {
      if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
          button.style.display = "flex";
      } else {
          button.style.display = "none";
      }
  };
}

// Функция для проверки, должен ли быть добавлен элемент
function checkAndCreateButton() {
  // Проверяем, есть ли класс 'has-scroll-btn' на body
  if (document.body.classList.contains('has-scroll-btn')) {
      createScrollTopButton();
  }
}

// Запускаем проверку при загрузке страницы
document.addEventListener('DOMContentLoaded', checkAndCreateButton);


document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.modal'); // Находим модальное окно
  const showModalButtons = document.querySelectorAll('.show-modal'); // Все кнопки с классом "show-modal"
  const closeModalButton = modal.querySelector('.modal__close'); // Кнопка закрытия модального окна
  const body = document.body; // Для управления прокруткой страницы

  // Функция открытия модального окна
  function openModal() {
    modal.style.display = 'flex'; // Показываем модальное окно
    modal.parentElement.classList.add('modal-overlay'); // Добавляем фон-затемнение
    body.style.overflow = 'hidden'; // Отключаем прокрутку страницы
  }

  // Функция закрытия модального окна
  function closeModal() {
    modal.style.display = 'none'; // Скрываем модальное окно
    modal.parentElement.classList.remove('modal-overlay'); // Убираем фон-затемнение
    body.style.overflow = ''; // Восстанавливаем прокрутку страницы
  }

  // Назначаем обработчики событий для кнопок открытия
  showModalButtons.forEach(button => {
    button.addEventListener('click', openModal);
  });

  // Закрытие модального окна при клике вне его содержимого
  modal.parentElement.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal-overlay')) { // Проверяем, что клик был по фону
      closeModal();
    }
  });

  // Закрытие окна при нажатии на клавишу Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'flex') {
      closeModal();
    }
  });

  // Закрытие окна по клику на кнопку с классом "modal__close"
  if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const animateBlocks = document.querySelectorAll('.animate-block');

  // Добавляем класс анимации к дочерним элементам
  const animateItems = (block) => {
    const items = block.children;
    Array.from(items).forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('animate'); // Добавляем класс для анимации
      }, index * 200); // Последовательная задержка
    });
  };

  // Наблюдение за появлением блоков
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateItems(entry.target); // Анимируем элементы
          observer.unobserve(entry.target); // Убираем наблюдение
        }
      });
    },
    { threshold: 0.1 } // 10% блока видны
  );

  // Добавляем наблюдение за каждым блоком
  animateBlocks.forEach((block) => observer.observe(block));
});



