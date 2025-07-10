<?php
// api/clases.php

// Incluir archivos de configuración y de base de datos
require_once '../config/config.php';
require_once '../config/database.php';
require_once '../data/claseDB.php';

// Establecer la cabecera para la respuesta JSON
header('Content-Type: application/json');

// Crear una instancia de la base de datos y obtener la conexión
$database = new Database();

// Crear una instancia de claseDB
$claseDB = new claseDB($database);

// Obtener todas las clases con detalles
$clases = $claseDB->getAllClasesWithDetails();

// Devolver los datos en formato JSON
echo json_encode($clases);
?>
