import json
from flask import Flask, render_template, url_for, request

app = Flask(__name__)

def cargar_datos(archivo):
    ruta = f'data/{archivo}'
    try:
        with open(ruta, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

@app.route('/')
def home():
    return render_template('menu.html')

@app.route('/personajes')
def personajes():
    lista_personajes = cargar_datos('personajes.json')
    return render_template('personajes.html', personajes_flask=lista_personajes)

@app.route('/origenes')
def origenes():
    return render_template('origenes.html')

@app.route('/objetos')
def objetos():
    lista_objetos = cargar_datos('objetos.json')
    return render_template('objetos.html', objetos_flask=lista_objetos)

@app.route('/finales')
def finales():
    return render_template('finales.html')

@app.route('/contacto', methods=['GET', 'POST'])
def contacto():
    mensaje_exito = None
    error = None 
    
    if request.method == 'POST':
        nombre = request.form.get('nombre', '').strip()
        email = request.form.get('email', '').strip()
        mensaje = request.form.get('mensaje', '').strip()
        
        if not nombre or len(nombre) < 3:
            error = "Error: Identificación inválida."
        elif not email or '@' not in email:
            error = "Error: Frecuencia de respuesta inválida."
        elif not mensaje or len(mensaje) < 10:
            error = "Error: El mensaje carece de datos suficientes."
        else:
            print(f"--- NUEVO MENSAJE RECIBIDO ---")
            print(f"De: {nombre} ({email})")
            print(f"Mensaje: {mensaje}")
            print("------------------------------")
            mensaje_exito = f"Transmisión recibida, Agente {nombre}. La AFAE le contactará."

    return render_template('contacto.html', exito=mensaje_exito, error=error)

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/procesar_login', methods=['POST'])
def procesar_login():
    email = request.form.get('login-email')
    password = request.form.get('login-pass')
    
    print(f"INTENTO DE LOGIN: {email} | Pass: {password}")
    
    return render_template('menu.html')

@app.route('/procesar_registro', methods=['POST'])
def procesar_registro():
    nombre = request.form.get('reg-name')
    email = request.form.get('reg-email')
    
    print(f"NUEVO USUARIO: {nombre} | Email: {email}")
    
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True)