document.addEventListener('DOMContentLoaded', () => {
    const currentLocation = window.location.href;
    const menuItems = document.querySelectorAll('nav a');

    menuItems.forEach(item => {
        if (!item.classList.contains('btn-login-nav')) {
            item.classList.remove('active');
        }
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
    }, { threshold: 0.1 });

    hiddenElements.forEach((el) => {
        el.classList.add('hidden-scroll');
        observer.observe(el);
    });
    
    const loginBtn = document.querySelector('.btn-login-nav');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userName = localStorage.getItem('userName');

    if (loginBtn) {
        if (isLoggedIn) {
            loginBtn.textContent = `CERRAR SESIÓN (${userName})`;
            loginBtn.href = "#";
            loginBtn.style.borderColor = "#ff3333"; 
            loginBtn.style.color = "#ff3333";
            loginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                if(confirm("¿Desconectar del sistema?")) {
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('userName');
                    
                    window.location.href = 'menu.html';
                }
            });
        } else {
            loginBtn.textContent = "ACCESO / REGISTRO";
        }
    }
});