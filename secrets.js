document.addEventListener('DOMContentLoaded', () => {
    console.log("Sistema de secretos cargado. Esperando input...");
    
    const secretCode = 'human';
    let inputBuffer = '';
    
    document.addEventListener('keydown', (e) => {
        inputBuffer += e.key.toLowerCase();

        if (inputBuffer.length > 20) {
            inputBuffer = inputBuffer.slice(-20);
        }

        if (inputBuffer.endsWith(secretCode)) {
            triggerParanoiaEvent();
            inputBuffer = ''; 
        }
    });

    function triggerParanoiaEvent() {

        const overlay = document.createElement('div');
        Object.assign(overlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255, 0, 0, 0.4)',
            zIndex: '9999',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mixBlendMode: 'hard-light'
        });

        const message = document.createElement('h1');
        message.innerText = "NO ERES UNO DE ELLOS";
        Object.assign(message.style, {
            color: '#fff',
            fontFamily: "'Chakra Petch', sans-serif",
            fontSize: '4rem',
            textAlign: 'center',
            textShadow: '0 0 20px #ff0000',
            backgroundColor: '#000',
            padding: '20px'
        });

        overlay.appendChild(message);
        document.body.appendChild(overlay);

        const originalAnimation = document.body.style.animation;
        document.body.style.animation = 'glitch-anim 0.2s infinite';

        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(110, audioCtx.currentTime);
            oscillator.frequency.linearRampToValueAtTime(880, audioCtx.currentTime + 0.5);
            
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.5);
        } catch (e) {
            console.log("Audio bloqueado por navegador");
        }

        setTimeout(() => {
            if(document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
            document.body.style.animation = originalAnimation;
            alert("SISTEMA DE LA AFAE: Tu firma biométrica ha sido verificada. Eres humano.");
        }, 3000);
    }
});