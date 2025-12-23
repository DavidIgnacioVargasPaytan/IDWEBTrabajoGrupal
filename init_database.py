import sqlite3
import os

db_path = 'database.db'

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

print("=== VERIFICANDO ESTRUCTURA DE LA BASE DE DATOS ===\n")

cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()
print(f"Tablas encontradas: {tables}\n")

for table in tables:
    table_name = table[0]
    print(f"\n--- Estructura de la tabla '{table_name}' ---")
    cursor.execute(f"PRAGMA table_info({table_name});")
    columns = cursor.fetchall()
    for col in columns:
        print(f"  {col[1]} ({col[2]})")

print("\n\n=== CREANDO/VERIFICANDO TABLAS NECESARIAS ===\n")

cursor.execute('''
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
''')
print("✓ Tabla 'usuarios' verificada/creada")

cursor.execute('''
CREATE TABLE IF NOT EXISTS mensajes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    mensaje TEXT NOT NULL,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
''')
print("✓ Tabla 'mensajes' verificada/creada")

conn.commit()

print("\n\n=== CONTENIDO ACTUAL ===\n")
cursor.execute("SELECT COUNT(*) FROM usuarios")
user_count = cursor.fetchone()[0]
print(f"Usuarios registrados: {user_count}")

cursor.execute("SELECT COUNT(*) FROM mensajes")
msg_count = cursor.fetchone()[0]
print(f"Mensajes enviados: {msg_count}")

conn.close()
print("\n✓ Base de datos configurada correctamente!")