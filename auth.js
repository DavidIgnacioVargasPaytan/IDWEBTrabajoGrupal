document.addEventListener('DOMContentLoaded', () => {
    
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const regPass = document.getElementById('reg-pass');
    const regConfirm = document.getElementById('reg-confirm');
    const statusLogin = formLogin.querySelector('.auth-status');
    const statusRegister = formRegister.querySelector('.auth-status');

    tabLogin.addEventListener('click', () => {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        formLogin.classList.remove('hidden');
        setTimeout(() => formLogin.classList.add('active'), 10);
        formRegister.classList.remove('active');
        formRegister.classList.add('hidden');
    });

    tabRegister.addEventListener('click', () => {
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        formRegister.classList.remove('hidden');
        setTimeout(() => formRegister.classList.add('active'), 10);
        formLogin.classList.remove('active');
        formLogin.classList.add('hidden');
    });

    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        const btn = formLogin.querySelector('button');
        const originalText = btn.innerText;
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-pass').value;

        if (!email || !pass) {
            updateStatus(statusLogin, "ERROR: CAMPOS INCOMPLETOS", "error");
            return;
        }

        setLoadingState(btn, true, "VERIFICANDO CREDENCIALES...");
        updateStatus(statusLogin, "CONECTANDO CON SERVIDOR CENTRAL...", "normal");

        try {
            // Enviamos los datos al archivo PHP
            const response = await fetch('auth_handler.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    accion: 'login',
                    email: email,
                    password: pass
                })
            });

            const result = await response.json();
            setLoadingState(btn, false, originalText);

            if (result.status === 'success') {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName', result.nombre); 
                
                updateStatus(statusLogin, "ACCESO AUTORIZADO.", "success");
                setTimeout(() => { window.location.href = 'menu.html'; }, 1000);
            } else {
                updateStatus(statusLogin, "ERROR: " + result.message.toUpperCase(), "error");
            }

        } catch (error) {
            setLoadingState(btn, false, originalText);
            updateStatus(statusLogin, "ERROR DE CONEXIÓN CON EL NÚCLEO", "error");
        }
    });

    formRegister.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = formRegister.querySelector('button');
        const originalText = btn.innerText;
        const nombre = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const p1 = regPass.value;
        const p2 = regConfirm.value;
        const isHuman = document.getElementById('human-check').checked;

        if (p1 !== p2) {
            updateStatus(statusRegister, "ERROR: LAS CLAVES NO COINCIDEN", "error");
            regConfirm.style.borderColor = "#ff3333";
            return;
        }

        if (!isHuman) {
            updateStatus(statusRegister, "ERROR: PROTOCOLO HUMANO REQUERIDO", "error");
            return;
        }

        setLoadingState(btn, true, "ENCRIPTANDO DATOS...");
        updateStatus(statusRegister, "GENERANDO NUEVO EXPEDIENTE...", "normal");

        try {
            const response = await fetch('auth_handler.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    accion: 'registro',
                    nombre: nombre,
                    email: email,
                    password: p1
                })
            });

            const result = await response.json();
            setLoadingState(btn, false, originalText);

            if (result.status === 'success') {
                updateStatus(statusRegister, "REGISTRO COMPLETADO.", "success");
                formRegister.reset();
                setTimeout(() => {
                    tabLogin.click();
                    updateStatus(statusLogin, "LISTO PARA INICIAR SESIÓN.", "success");
                }, 1500);
            } else {
                updateStatus(statusRegister, "ERROR: " + result.message.toUpperCase(), "error");
            }

        } catch (error) {
            setLoadingState(btn, false, originalText);
            updateStatus(statusRegister, "ERROR AL CREAR EXPEDIENTE", "error");
        }
    });

    function updateStatus(element, message, type) {
        element.innerText = message;
        element.style.opacity = "1";
        if (type === 'error') element.style.color = "#ff3333"; 
        else if (type === 'success') element.style.color = "#00ffaa"; 
        else element.style.color = "#00ffff"; 
    }

    function setLoadingState(button, isLoading, text) {
        button.disabled = isLoading;
        button.innerText = text;
        button.style.opacity = isLoading ? "0.7" : "1";
        button.style.cursor = isLoading ? "wait" : "pointer";
    }
});