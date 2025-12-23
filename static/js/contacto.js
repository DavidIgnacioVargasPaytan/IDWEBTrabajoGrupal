document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-contacto');
    const statusMsg = document.getElementById('contact-status');
    
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    form.addEventListener('submit', (e) => {
        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const mensaje = document.getElementById('mensaje');
        const btn = form.querySelector('button');
        
        let isValid = true;
        let errorText = "";

        if (nombre.value.trim().length < 3) {
            isValid = false;
            errorText = "ERROR: IDENTIFICACIÓN MUY CORTA";
            pulseError(nombre);
        }
        
        else if (!emailRegex.test(email.value)) {
            isValid = false;
            errorText = "ERROR: FRECUENCIA (EMAIL) INVÁLIDA";
            pulseError(email);
        }
        
        else if (mensaje.value.trim().length < 10) {
            isValid = false;
            errorText = "ERROR: MENSAJE INSUFICIENTE (FALTAN DATOS)";
            pulseError(mensaje);
        }

        if (!isValid) {
            e.preventDefault(); 
            updateStatus(errorText, "error");
        } else {
            updateStatus("ESTABLECIENDO ENLACE SATELITAL...", "success");
            btn.innerText = "TRANSMITIENDO...";
            btn.style.opacity = "0.7";
        }
    });

    function updateStatus(text, type) {
        statusMsg.innerText = text;
        if (type === 'error') {
            statusMsg.style.color = "#ff3333";
            statusMsg.style.textShadow = "0 0 10px #ff3333";
        } else {
            statusMsg.style.color = "#00ffaa";
            statusMsg.style.textShadow = "0 0 10px #00ffaa";
        }
    }

    function pulseError(element) {
        element.style.borderColor = "#ff3333";
        element.style.boxShadow = "0 0 15px #ff3333";
        setTimeout(() => {
            element.style.borderColor = ""; 
            element.style.boxShadow = "";
        }, 2000);
    }
});