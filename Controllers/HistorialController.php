<?php
include_once ("../Models/Historial.php");
$historial = new Historial();
session_start();

if (isset($_POST['funcion'])) {
    $funcion = $_POST['funcion'];

    if ($funcion == 'llenar_historial') {
        $id_usuario = $_SESSION['id'];
        $historial -> llenar_historial($id_usuario);
        var_dump($historial);
    }
} else {
    echo "No se ha definido la función.";
}