document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const btn = document.querySelector('.btn-submit');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Usamos selectores genéricos para evitar errores si cambias el placeholder
        const inputNombre = form.querySelector('input[type="text"]');
        const inputEmail = form.querySelector('input[type="email"]');
        const inputMensaje = form.querySelector('textarea');

        const datos = {
            nombre: inputNombre.value,
            email: inputEmail.value,
            mensaje: inputMensaje.value
        };

        btn.innerText = "TRANSMITIENDO...";
        btn.disabled = true;

        try {
            const response = await fetch('contacto_handler.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });

            if (!response.ok) throw new Error('Error en el servidor');

            const result = await response.json();

            if (result.status === 'success') {
                alert("SISTEMA AFAE: " + result.message);
                form.reset();
            } else {
                alert("ERROR DE PROTOCOLO: " + result.message);
            }
        } catch (error) {
            console.error(error);
            alert("ERROR CRÍTICO: No se pudo conectar con el servidor PHP.");
        } finally {
            btn.innerText = "ENVIAR TRANSMISIÓN";
            btn.disabled = false;
        }
    });
});