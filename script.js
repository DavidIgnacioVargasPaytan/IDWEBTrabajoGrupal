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
//EASTER EGG
document.addEventListener('DOMContentLoaded', () => {
    let buffer = "";
    
    document.addEventListener('keydown', (event) => {
        buffer += event.key.toLowerCase();
        if (buffer.length > 10) buffer = buffer.slice(-10);

        if (buffer.endsWith('human')) {
            // Efecto visual: Glitch rojo
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
            overlay.style.zIndex = '9999';
            overlay.style.pointerEvents = 'none';
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            
            const txt = document.createElement('h1');
            txt.innerText = "NO ERES UNO DE ELLOS";
            txt.style.color = "white";
            txt.style.fontFamily = "monospace";
            txt.style.fontSize = "3rem";
            txt.style.textShadow = "0 0 20px red";
            
            overlay.appendChild(txt);
            document.body.appendChild(overlay);
            
            // Sonido beep
            try {
                const ac = new (window.AudioContext || window.webkitAudioContext)();
                const osc = ac.createOscillator();
                osc.connect(ac.destination);
                osc.start();
                osc.stop(ac.currentTime + 0.2);
            } catch(e) {}

            setTimeout(() => {
                document.body.removeChild(overlay);
                alert("SISTEMA AFAE: Identidad Humana Confirmada.");
            }, 1000);
            
            buffer = "";
        }
    });
});