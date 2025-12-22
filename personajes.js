document.addEventListener('DOMContentLoaded', () => {
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const characterItems = document.querySelectorAll('.personaje-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            characterItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('oculto');
                    item.style.animation = 'none';
                    item.offsetHeight; 
                    item.style.animation = 'fadeInGrid 0.5s ease-out forwards';
                } else {
                    item.classList.add('oculto');
                }
            });
        });
    });
});