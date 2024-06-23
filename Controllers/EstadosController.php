<?php
include_once ("../Models/Estados.php");
$estado = new Estado();
session_start();

if (isset($_POST['funcion'])) {
    $funcion = $_POST['funcion'];
    if ($funcion == "llenar_estados") {
        $estado->llenar_estados();
        $json = array();
        foreach($estado->objetos as $objeto){
            $json[]=array(
                'id' => $objeto->id,
                'estado' => $objeto->estado,
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
} else {
    echo "No se ha definido la función.";
}
