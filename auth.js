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

    formLogin.addEventListener('submit', (e) => {
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

        setTimeout(() => {
            setLoadingState(btn, false, originalText);
            
            if (pass.length < 6) {
                updateStatus(statusLogin, "ACCESO DENEGADO: CLAVE INCORRECTA", "error");
            } else {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName', email.split('@')[0]); 
                
                updateStatus(statusLogin, "ACCESO AUTORIZADO.", "success");
                
                setTimeout(() => {
                    window.location.href = 'menu.html';
                }, 1000);
            }
        }, 2000); 
    });

    formRegister.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = formRegister.querySelector('button');
        const originalText = btn.innerText;
        const p1 = regPass.value;
        const p2 = regConfirm.value;
        const isHuman = document.getElementById('human-check').checked;

        if (p1 !== p2) {
            updateStatus(statusRegister, "ERROR: LAS CLAVES NO COINCIDEN", "error");
            regConfirm.style.borderColor = "#ff3333";
            return;
        } else {
            regConfirm.style.borderColor = "#333";
        }

        if (!isHuman) {
            updateStatus(statusRegister, "ERROR: PROTOCOLO HUMANO REQUERIDO", "error");
            return;
        }

        setLoadingState(btn, true, "ENCRIPTANDO DATOS...");
        updateStatus(statusRegister, "GENERANDO NUEVO EXPEDIENTE...", "normal");

        setTimeout(() => {
            setLoadingState(btn, false, originalText);
            updateStatus(statusRegister, "REGISTRO COMPLETADO.", "success");
            formRegister.reset();
            
            setTimeout(() => {
                tabLogin.click();
                updateStatus(statusLogin, "LISTO PARA INICIAR SESIÓN.", "success");
            }, 1500);

        }, 2500);
    });

    function updateStatus(element, message, type) {
        element.innerText = message;
        element.style.opacity = "1";
        if (type === 'error') element.style.color = "#ff3333"; 
        else if (type === 'success') element.style.color = "#00ffaa"; 
        else element.style.color = "#00ffff"; 
    }

    function setLoadingState(button, isLoading, text) {
        if (isLoading) {
            button.disabled = true;
            button.innerText = text;
            button.style.opacity = "0.7";
            button.style.cursor = "wait";
        } else {
            button.disabled = false;
            button.innerText = text;
            button.style.opacity = "1";
            button.style.cursor = "pointer";
        }
    }
});