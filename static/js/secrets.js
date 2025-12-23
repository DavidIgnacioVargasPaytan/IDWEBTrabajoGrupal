document.addEventListener('DOMContentLoaded', () => {
    console.log("Módulo de Secretos Activo.");
    
    const secretCode = 'human';
    let inputBuffer = '';
    
    document.addEventListener('keydown', (e) => {
        inputBuffer += e.key.toLowerCase();
        if (inputBuffer.length > 20) inputBuffer = inputBuffer.slice(-20);

        if (inputBuffer.endsWith(secretCode)) {
            triggerParanoia();
            inputBuffer = ''; 
        }
    });

    function triggerParanoia() {
        const overlay = document.createElement('div');
        overlay.id = 'paranoia-overlay';
        Object.assign(overlay.style, {
            position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
            backgroundColor: 'rgba(20, 0, 0, 0.9)', zIndex: '9999',
            display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
        });

        const text = document.createElement('h1');
        text.innerText = "NO ERES UNO DE ELLOS";
        text.style.color = "red";
        text.style.fontFamily = "'Chakra Petch', sans-serif";
        text.style.fontSize = "4vw";
        text.style.textShadow = "0 0 20px red";

        overlay.appendChild(text);
        document.body.appendChild(overlay);

        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(100, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 1);
            osc.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 1);
        } catch(e) {}

        setTimeout(() => {
            overlay.style.transition = "opacity 1s";
            overlay.style.opacity = "0";
            setTimeout(() => overlay.remove(), 1000);
        }, 3000);
    }
});