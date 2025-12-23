<?php
header('Content-Type: application/json');
// 1. Iniciamos sesión para que el navegador recuerde al usuario tras el login
session_start(); 

// Conexión a la base de datos
$conexion = mysqli_connect("localhost", "root", "", "sistema_afae");

if (!$conexion) {
    echo json_encode(["status" => "error", "message" => "Fallo de conexión a BD"]);
    exit;
}

// Leer datos enviados desde el JS
$data = json_decode(file_get_contents("php://input"), true);

// Verificamos que se hayan recibido datos antes de procesar
if (!$data) {
    echo json_encode(["status" => "error", "message" => "No se recibieron datos"]);
    exit;
}

$accion = $data['accion'] ?? '';

// --- LÓGICA DE REGISTRO ---
if ($accion === 'registro') {
    $nombre = mysqli_real_escape_string($conexion, $data['nombre']);
    $email = mysqli_real_escape_string($conexion, $data['email']);
    $pass = password_hash($data['password'], PASSWORD_BCRYPT);

    $sql = "INSERT INTO usuarios (nombre, email, password) VALUES ('$nombre', '$email', '$pass')";
    
    if (mysqli_query($conexion, $sql)) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => "El correo ya existe en el sistema"]);
    }
}

// --- LÓGICA DE LOGIN ---
if ($accion === 'login') {
    $email = mysqli_real_escape_string($conexion, $data['email']);
    $pass = $data['password'];

    // Buscamos al usuario por su correo
    $res = mysqli_query($conexion, "SELECT * FROM usuarios WHERE email = '$email'");
    $user = mysqli_fetch_assoc($res);

    // Verificamos si el usuario existe y si la clave (hash) coincide
    if ($user && password_verify($pass, $user['password'])) {
        // 2. Guardamos los datos en la sesión del servidor
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['nombre'] = $user['nombre'];
        
        echo json_encode([
            "status" => "success", 
            "nombre" => $user['nombre']
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Credenciales incorrectas"]);
    }
}

// 3. Cerramos la conexión para liberar recursos
mysqli_close($conexion);
?>