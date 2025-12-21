document.addEventListener('DOMContentLoaded', () => {
    const currentLocation = window.location.href;
    const menuItems = document.querySelectorAll('nav a');

    menuItems.forEach(item => {
        item.classList.remove('active');
        if (currentLocation.includes(item.getAttribute('href'))) {
            item.classList.add('active');
        }
    });

    const hiddenElements = document.querySelectorAll('article, section, .final-item, .personaje-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    hiddenElements.forEach((el) => {
        el.classList.add('hidden-scroll');
        observer.observe(el);
    });

    const buttons = document.querySelectorAll('button, nav a');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
        });
    });
});