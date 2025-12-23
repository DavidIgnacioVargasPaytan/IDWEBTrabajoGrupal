import sqlite3
import json
from flask import Flask, render_template, url_for, request, session, redirect, flash

app = Flask(__name__)
app.secret_key = 'clave_super_secreta_protocolo_fantasma'

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

def cargar_datos_json(archivo):
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
    lista = cargar_datos_json('personajes.json')
    return render_template('personajes.html', personajes_flask=lista)

@app.route('/objetos')
def objetos():
    lista = cargar_datos_json('objetos.json')
    return render_template('objetos.html', objetos_flask=lista)

@app.route('/origenes')
def origenes():
    return render_template('origenes.html')

@app.route('/finales')
def finales():
    return render_template('finales.html')

@app.route('/login')
def login():
    if 'usuario' in session:
        return redirect(url_for('home'))
    return render_template('login.html')

@app.route('/contacto', methods=['GET', 'POST'])
def contacto():
    mensaje_exito = None
    mensaje_error = None
    
    if request.method == 'POST':
        nombre = request.form.get('nombre', '').strip()
        email = request.form.get('email', '').strip()
        mensaje = request.form.get('mensaje', '').strip()
        
        if not nombre or len(nombre) < 3:
            mensaje_error = "ERROR: Identificación muy corta"
        elif not email or '@' not in email:
            mensaje_error = "ERROR: Email inválido"
        elif not mensaje or len(mensaje) < 10:
            mensaje_error = "ERROR: Mensaje demasiado corto"
        else:
            try:
                conn = get_db_connection()
                conn.execute('INSERT INTO mensajes (nombre, email, mensaje) VALUES (?, ?, ?)',
                           (nombre, email, mensaje))
                conn.commit()
                conn.close()
                
                mensaje_exito = f"Transmisión guardada en BD, Agente {nombre}. La AFAE le contactará."
            except Exception as e:
                mensaje_error = f"ERROR: No se pudo guardar el mensaje. {str(e)}"

    return render_template('contacto.html', exito=mensaje_exito, error=mensaje_error)

@app.route('/procesar_registro', methods=['POST'])
def procesar_registro():
    nombre = request.form.get('reg-name', '').strip()
    email = request.form.get('reg-email', '').strip()
    password = request.form.get('reg-pass', '').strip()
    
    if not nombre or not email or not password:
        return redirect(url_for('login'))
    
    conn = get_db_connection()
    try:
        conn.execute('INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
                     (nombre, email, password))
        conn.commit()
        session['usuario'] = nombre.upper()
        return redirect(url_for('home'))
    except sqlite3.IntegrityError:
        return render_template('login.html', error_registro="El email ya está registrado")
    except Exception as e:
        return render_template('login.html', error_registro=f"Error al registrar: {str(e)}")
    finally:
        conn.close()

@app.route('/procesar_login', methods=['POST'])
def procesar_login():
    email = request.form.get('login-email', '').strip()
    password = request.form.get('login-pass', '').strip()
    
    if not email or not password:
        return redirect(url_for('login'))
    
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM usuarios WHERE email = ?', (email,)).fetchone()
    conn.close()
    
    if user and user['password'] == password:
        session['usuario'] = user['nombre'].upper()
        return redirect(url_for('home'))
    else:
        return render_template('login.html', error_login="Credenciales inválidas")

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)