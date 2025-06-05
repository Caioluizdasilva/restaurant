document.addEventListener('DOMContentLoaded', () => {
  const productCards = document.querySelector('.product-cards');
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');
  
  let scrollAmount = 0;
  const cardWidth = 216; // largura do card + gap
  
  function updateButtonVisibility() {
    prevButton.style.opacity = scrollAmount <= 0 ? '0.5' : '1';
    nextButton.style.opacity = 
      scrollAmount >= productCards.scrollWidth - productCards.clientWidth 
        ? '0.5' 
        : '1';
  }

  prevButton.addEventListener('click', () => {
    scrollAmount = Math.max(scrollAmount - cardWidth, 0);
    productCards.scroll({
      left: scrollAmount,
      behavior: 'smooth'
    });
    updateButtonVisibility();
  });

  nextButton.addEventListener('click', () => {
    const maxScroll = productCards.scrollWidth - productCards.clientWidth;
    scrollAmount = Math.min(scrollAmount + cardWidth, maxScroll);
    productCards.scroll({
      left: scrollAmount,
      behavior: 'smooth'
    });
    updateButtonVisibility();
  });

  // Circular navigation (opcional)
  function updateCarouselCircular() {
    const cards = document.querySelectorAll('.product-card');
    const firstCard = cards[0];
    const lastCard = cards[cards.length - 1];
    
    if (scrollAmount > productCards.scrollWidth - productCards.clientWidth + cardWidth) {
      scrollAmount = 0;
      productCards.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    } else if (scrollAmount < -cardWidth) {
      scrollAmount = productCards.scrollWidth - productCards.clientWidth;
      productCards.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }

  // Observer para animação suave
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(20px)';
    card.style.transition = 'all 0.5s ease';
    observer.observe(card);
  });

  // Inicialização
  updateButtonVisibility();
});