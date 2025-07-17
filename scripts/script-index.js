const filters = document.querySelectorAll('.programs__filter');
const cards = document.querySelectorAll('.course-card');

// Добавляем обработчик событий на кнопки фильтра
filters.forEach(button => {
  button.addEventListener('click', () => {
    // Снимаем активный класс с предыдущей кнопки
    filters.forEach(btn => btn.classList.remove('programs__filter_active'));
    // Добавляем активный класс на текущую кнопку
    button.classList.add('programs__filter_active');

    // Получаем категорию из data-filter
    const category = button.getAttribute('data-filter');

    // Показываем или скрываем карточки в зависимости от категории
    cards.forEach(card => {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = 'block';  // Показываем карточку
      } else {
        card.style.display = 'none';   // Скрываем карточку
      }
    });
  });
});


// Функция для переключения активного фильтра и рендеринга карточек
document.querySelectorAll('.programs__filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.programs__filter').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.getAttribute('data-filter');
    renderCourses(filter);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const stepCards = document.querySelectorAll('.step-card'); // Выбираем все шаги

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible'); // Добавляем класс для анимации
          }, index * 300); // Увеличиваем задержку для каждого блока
        } else {
          // Убираем класс, чтобы анимация могла повторяться
          entry.target.classList.remove('visible');
        }
      });
    },
    {
      threshold: 0.1, // Элемент считается видимым, если 10% его области находится в зоне видимости
    }
  );

  stepCards.forEach(card => {
    observer.observe(card); // Добавляем наблюдатель для каждого блока
  });
});
