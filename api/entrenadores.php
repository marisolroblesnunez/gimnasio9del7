<?php
// api/entrenadores.php

// Incluir archivos de configuración y de base de datos
require_once '../config/config.php';
require_once '../config/database.php';
require_once '../data/entrenadorDB.php';

// Establecer la cabecera para la respuesta JSON
header('Content-Type: application/json');

// Crear una instancia de la base de datos y obtener la conexión
$database = new Database();

// Crear una instancia de entrenadorDB
$entrenadorDB = new entrenadorDB($database);

// Obtener todos los entrenadores
$entrenadores = $entrenadorDB->getAll();

// Devolver los datos en formato JSON
echo json_encode($entrenadores);
?>
