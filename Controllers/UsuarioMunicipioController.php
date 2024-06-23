<?php
include_once ("../Models/UsuarioMunicipio.php");
$usuario_municipio = new UsuarioMunicipio();
session_start();
if (isset($_POST['funcion'])) {
    $funcion = $_POST['funcion'];
    if ($funcion == "crear_direccion") {
        $id_municipio = $_POST['id_municipio'];
        $id_usuario =  $_SESSION['id'];
        $direccion = $_POST['direccion'];
        $referencia = $_POST['referencia'];
        
        $result = $usuario_municipio->crear_usuario_municipio($id_municipio, $id_usuario, $referencia, $direccion);
        
        if ($result) {
            echo 'success';
        } else {
            echo 'error';
        }
    }
} else {
    echo "No se ha definido la función.";
}