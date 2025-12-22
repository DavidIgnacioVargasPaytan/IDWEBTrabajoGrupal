document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split("/").pop();
    const menuItems = document.querySelectorAll('nav a');

    menuItems.forEach(item => {
        item.classList.remove('active');
        
        const linkHref = item.getAttribute('href');
        
        if (currentPath === linkHref || (currentPath === '' && linkHref === 'menu.html')) {
            item.classList.add('active');
        }
    });

    const hiddenElements = document.querySelectorAll('article, section, .final-item, .personaje-item, .objeto-card, .feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, { 
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px" 
    });

    hiddenElements.forEach((el) => {
        el.classList.add('hidden-scroll'); 
        observer.observe(el);
    });
    
    const loginBtn = document.querySelector('.btn-login-nav');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userName = localStorage.getItem('userName');

    if (loginBtn && isLoggedIn) {
        loginBtn.innerHTML = `<i class="fa-solid fa-power-off"></i> CERRAR SESIÓN (${userName})`;
        loginBtn.href = "#";
        
        loginBtn.style.borderColor = "#ff3333"; 
        loginBtn.style.color = "#ff3333";
        loginBtn.style.boxShadow = "0 0 10px rgba(255, 51, 51, 0.2)";

        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            if(confirm("¿CONFIRMAR DESCONEXIÓN DEL PROTOCOLO?")) {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userName');
                window.location.href = 'menu.html';
            }
        });
    }
});