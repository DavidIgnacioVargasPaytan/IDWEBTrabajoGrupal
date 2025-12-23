document.addEventListener('DOMContentLoaded', () => {
    
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const statusLogin = formLogin.querySelector('.auth-status');
    const statusRegister = formRegister.querySelector('.auth-status');

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    
    const nameRegex = /^[a-zA-Z0-9\s]{3,20}$/;

    tabLogin.addEventListener('click', () => {
        switchTab(tabLogin, tabRegister, formLogin, formRegister);
        resetForm(formLogin, statusLogin, "Esperando credenciales...");
    });

    tabRegister.addEventListener('click', () => {
        switchTab(tabRegister, tabLogin, formRegister, formLogin);
        resetForm(formRegister, statusRegister, "Creando nuevo expediente...");
    });

    function switchTab(activeTab, inactiveTab, activeForm, inactiveForm) {
        activeTab.classList.add('active');
        inactiveTab.classList.remove('active');
        
        inactiveForm.classList.remove('active');
        inactiveForm.classList.add('hidden');
        
        activeForm.classList.remove('hidden');
        setTimeout(() => activeForm.classList.add('active'), 10);
    }

    formLogin.addEventListener('submit', (e) => {
        const emailInput = document.getElementById('login-email');
        const passInput = document.getElementById('login-pass');
        const btn = formLogin.querySelector('button');

        if (!emailRegex.test(emailInput.value)) {
            e.preventDefault(); 
            updateStatus(statusLogin, "ERROR: FORMATO DE CORREO INVÁLIDO", "error");
            pulseError(emailInput);
            return;
        }

        if (passInput.value.trim() === "") {
            e.preventDefault();
            updateStatus(statusLogin, "ERROR: INGRESE CLAVE DE ACCESO", "error");
            pulseError(passInput);
            return;
        }

        updateStatus(statusLogin, "CONECTANDO CON SERVIDOR...", "success");
        setLoadingState(btn, "VERIFICANDO...");
    });

    formRegister.addEventListener('submit', (e) => {
        const nameInput = document.getElementById('reg-name');
        const emailInput = document.getElementById('reg-email');
        const passInput = document.getElementById('reg-pass');
        const confirmInput = document.getElementById('reg-confirm');
        const humanCheck = document.getElementById('human-check');
        const btn = formRegister.querySelector('button');

        let isValid = true;
        let errorMsg = "";

        if (!humanCheck.checked) {
            isValid = false;
            errorMsg = "ERROR: PROTOCOLO HUMANO REQUERIDO";
            pulseError(humanCheck.parentElement);
        }
        else if (passInput.value !== confirmInput.value) {
            isValid = false;
            errorMsg = "ERROR: LAS CLAVES NO COINCIDEN";
            pulseError(confirmInput);
        }
        else if (!passRegex.test(passInput.value)) {
            isValid = false;
            errorMsg = "ERROR: CLAVE DÉBIL (Min 6 caracteres, letras y números)";
            pulseError(passInput);
        }
        else if (!emailRegex.test(emailInput.value)) {
            isValid = false;
            errorMsg = "ERROR: CORREO INVÁLIDO";
            pulseError(emailInput);
        }
        else if (!nameRegex.test(nameInput.value)) {
            isValid = false;
            errorMsg = "ERROR: NOMBRE INVÁLIDO (Use alfanuméricos)";
            pulseError(nameInput);
        }

        if (!isValid) {
            e.preventDefault(); 
            updateStatus(statusRegister, errorMsg, "error");
        } else {
            updateStatus(statusRegister, "ENCRIPTANDO DATOS PARA ENVÍO...", "success");
            setLoadingState(btn, "REGISTRANDO...");
        }
    });

    function updateStatus(element, message, type) {
        element.innerText = message;
        element.style.opacity = "1";
        
        if (type === 'error') {
            element.style.color = "#ff3333"; 
            element.style.textShadow = "0 0 10px #ff3333";
        } else if (type === 'success') {
            element.style.color = "#00ffaa"; 
            element.style.textShadow = "0 0 10px #00ffaa";
        } else {
            element.style.color = "#00ffff"; 
            element.style.textShadow = "none";
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

    function setLoadingState(button, text) {
        button.style.opacity = "0.7";
        button.innerText = text;
        button.style.cursor = "wait";
    }

    function resetForm(form, statusElement, defaultMsg) {
        form.reset();
        updateStatus(statusElement, defaultMsg, "normal");
        const btn = form.querySelector('button');
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
        if(form.id === 'form-login') btn.innerText = "ACCEDER AL SISTEMA";
        else btn.innerText = "CREAR EXPEDIENTE";
    }
});