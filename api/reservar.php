<?php
// api/reservar.php

// Iniciar sesión para acceder a $_SESSION['user_id']
session_start();

// Incluir archivos de configuración y de base de datos
require_once '../config/config.php';
require_once '../config/database.php';
require_once '../data/claseDB.php'; // Necesario para obtener cupo_maximo e inscritos_actuales
require_once '../data/inscripcionclaseDB.php'; // Necesario para insertar y verificar inscripciones

// Establecer la cabecera para la respuesta JSON
header('Content-Type: application/json');

// Solo permitir solicitudes POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
    exit();
}

// Verificar si el usuario está logueado
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Debes iniciar sesión para reservar una clase.', 'redirect' => 'admin/login.php']);
    exit();
}

$id_usuario = $_SESSION['user_id'];
$id_clase = filter_input(INPUT_POST, 'id_clase', FILTER_VALIDATE_INT);

// Validar id_clase
if (!$id_clase) {
    echo json_encode(['success' => false, 'message' => 'ID de clase no válido.']);
    exit();
}

// Crear instancias de las clases de base de datos
$database = new Database();
$claseDB = new claseDB($database);
$inscripcionClaseDB = new InscripcionClaseDB($database);

try {
    // 1. Verificar si el usuario ya está inscrito en esta clase
    if ($inscripcionClaseDB->estaInscrito($id_usuario, $id_clase)) {
        echo json_encode(['success' => false, 'message' => 'Ya estás inscrito en esta clase.']);
        exit();
    }

    // 2. Obtener detalles de la clase para verificar el cupo
    $clase = $claseDB->getById($id_clase);

    if (!$clase) {
        echo json_encode(['success' => false, 'message' => 'Clase no encontrada.']);
        exit();
    }

    // Obtener el número actual de inscritos para esta clase (usando la función de claseDB)
    // Nota: getById no devuelve inscritos_actuales. Necesitamos una forma de obtenerlo.
    // La función getAllClasesWithDetails() sí lo hace, pero es para todas las clases.
    // Para una sola clase, podemos contar las inscripciones directamente.
    $inscritos_actuales = $claseDB->getInscritosCount($id_clase);

    if ($inscritos_actuales >= $clase['cupo_maximo']) {
        echo json_encode(['success' => false, 'message' => 'Lo sentimos, el cupo para esta clase está lleno.']);
        exit();
    }

    // 3. Realizar la inscripción
    $result = $inscripcionClaseDB->insertarInscripcion($id_usuario, $id_clase);

    if ($result) {
        echo json_encode(['success' => true, 'message' => '¡Inscripción realizada con éxito!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al procesar la inscripción. Inténtalo de nuevo.']);
    }

} catch (Exception $e) {
    error_log("Error en reservar.php: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Ocurrió un error inesperado.']);
}

?>
