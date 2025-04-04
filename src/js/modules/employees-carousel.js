export function initEmployeesCarousel() {
  const employeesBlocks = document.querySelectorAll('.employees');

  employeesBlocks.forEach(block => {
    const container = block.querySelector('.employees__container');
    if (!container) return;

    const prevButtons = [
      block.querySelector('.employees__nav-icon--left')?.closest('a'),
      block.querySelector('.employees__icon--left')?.closest('a')
    ].filter(Boolean);

    const nextButtons = [
      block.querySelector('.employees__nav-icon--right')?.closest('a'),
      block.querySelector('.employees__icon--right')?.closest('a')
    ].filter(Boolean);

    const firstItem = container.querySelector('.employees__item');
    const scrollAmount = firstItem ? 
      firstItem.offsetWidth + 
      parseInt(getComputedStyle(firstItem).marginRight) : 
      250;

    const scrollTo = (direction) => {
      container.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    };

    prevButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        scrollTo('prev');
      });
    });

    nextButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        scrollTo('next');
      });
    });

    // Полная реализация drag-and-drop
    let isDragging = false;
    let startX, scrollLeft;

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.style.cursor = 'grabbing';
      e.preventDefault(); // Предотвращаем выделение текста
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX); // Можно умножить на коэффициент скорости, например * 2
      container.scrollLeft = scrollLeft - walk;
    });

    container.addEventListener('mouseup', () => {
      isDragging = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mouseleave', () => {
      isDragging = false;
      container.style.cursor = 'grab';
    });
  });
}