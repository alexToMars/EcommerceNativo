<?php
include_once ("../Models/Municipios.php");
$municipios = new Municipio();
session_start();

if (isset($_POST['funcion'])) {
    $funcion = $_POST['funcion'];
    if ($funcion == "llenar_municipios") {
        $id_municipio = $_POST['id_estado'];
        $municipios->llenar_municipios($id_municipio);
        $json = array();
        foreach($municipios->objetos as $objeto){
            $json[]=array(
                'id' => $objeto->id,
                'municipio' => $objeto->municipio,
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
} else {
    echo "No se ha definido la función.";
}
