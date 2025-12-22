document.addEventListener('DOMContentLoaded', () => {
    
    const track = document.querySelector('.carousel-track');
    
    if (!track) return;

    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    const counterDisplay = document.getElementById('slide-counter');
    const cards = Array.from(track.children);
    
    const cardWidth = 390; 
    let currentIndex = 0;

    const updateCarousel = () => {
        const amountToMove = -(cardWidth * currentIndex);
        track.style.transform = `translateX(${amountToMove}px)`;
        
        counterDisplay.textContent = `${currentIndex + 1} / ${cards.length}`;
        
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        prevButton.style.pointerEvents = currentIndex === 0 ? 'none' : 'all';
        
        const isAtEnd = currentIndex === cards.length - 1;
        nextButton.style.opacity = isAtEnd ? '0.5' : '1';
        nextButton.style.pointerEvents = isAtEnd ? 'none' : 'all';
    };

    nextButton.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    updateCarousel();
});