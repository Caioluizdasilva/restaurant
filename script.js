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

document.addEventListener('DOMContentLoaded', () => {
    // Animação de entrada para o hero
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    heroText.style.opacity = '0';
    heroText.style.transform = 'translateX(-50px)';
    heroImage.style.opacity = '0';
    heroImage.style.transform = 'translateX(50px)';

    setTimeout(() => {
        heroText.style.transition = 'all 0.8s ease';
        heroImage.style.transition = 'all 0.8s ease';
        heroText.style.opacity = '1';
        heroText.style.transform = 'translateX(0)';
        heroImage.style.opacity = '1';
        heroImage.style.transform = 'translateX(0)';
    }, 200);

    // Animação de scroll para elementos
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-up');
                fadeUpObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplicar animação fade-up em várias seções
    document.querySelectorAll('.category-card, .dish-card, .service-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        fadeUpObserver.observe(el);
    });

    // Carrossel de produtos com melhorias
    const initializeCarousel = (container, prevBtn, nextBtn, cardWidth) => {
        let scrollAmount = 0;
        let isDragging = false;
        let startX;
        let scrollLeft;

        const updateButtonVisibility = () => {
            prevBtn.style.opacity = scrollAmount <= 0 ? '0.5' : '1';
            nextBtn.style.opacity = 
                scrollAmount >= container.scrollWidth - container.clientWidth 
                    ? '0.5' 
                    : '1';
        };

        // Adicionar funcionalidade de arrastar
        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            container.classList.add('grabbing');
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('mouseleave', () => {
            isDragging = false;
            container.classList.remove('grabbing');
        });

        container.addEventListener('mouseup', () => {
            isDragging = false;
            container.classList.remove('grabbing');
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });

        prevBtn.addEventListener('click', () => {
            scrollAmount = Math.max(scrollAmount - cardWidth, 0);
            container.scroll({
                left: scrollAmount,
                behavior: 'smooth'
            });
            updateButtonVisibility();
        });

        nextBtn.addEventListener('click', () => {
            const maxScroll = container.scrollWidth - container.clientWidth;
            scrollAmount = Math.min(scrollAmount + cardWidth, maxScroll);
            container.scroll({
                left: scrollAmount,
                behavior: 'smooth'
            });
            updateButtonVisibility();
        });

        updateButtonVisibility();
    };

    // Inicializar carrosseis
    initializeCarousel(
        document.querySelector('.product-cards'),
        document.querySelector('.carousel-button.prev'),
        document.querySelector('.carousel-button.next'),
        274
    );

    initializeCarousel(
        document.querySelector('.dishes-carousel'),
        document.querySelector('.dishes-header .nav-button.prev'),
        document.querySelector('.dishes-header .nav-button.next'),
        324
    );

    // Animação do botão favorito
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            if (btn.classList.contains('active')) {
                btn.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    btn.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });

    // Animação para o scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header fixo com animação
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
});