<?php
// Evita que errores de texto plano ensucien la respuesta JSON
error_reporting(0);
header('Content-Type: application/json');

// Conexión a la base de datos
$conexion = mysqli_connect("localhost", "root", "", "sistema_afae");

if (!$conexion) {
    echo json_encode(["status" => "error", "message" => "FALLO DE CONEXIÓN AL SERVIDOR"]);
    exit;
}

// Leer datos del fetch
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $nombre = mysqli_real_escape_string($conexion, $data['nombre']);
    $email = mysqli_real_escape_string($conexion, $data['email']);
    $mensaje = mysqli_real_escape_string($conexion, $data['mensaje']);

    // Asegúrate de que los nombres de las columnas coincidan con tu tabla 'mensajes'
    $sql = "INSERT INTO mensajes (nombre_id, email, mensaje) VALUES ('$nombre', '$email', '$mensaje')";
    
    if (mysqli_query($conexion, $sql)) {
        echo json_encode(["status" => "success", "message" => "TRANSMISIÓN RECIBIDA"]);
    } else {
        // Si el SQL falla, enviamos el error como JSON
        echo json_encode(["status" => "error", "message" => "ERROR SQL: " . mysqli_error($conexion)]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "DATOS NO RECIBIDOS"]);
}

mysqli_close($conexion);
?>