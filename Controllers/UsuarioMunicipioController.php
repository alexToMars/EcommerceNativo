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
    else if($funcion == "llenar_direcciones"){
        $id_usuario =  $_SESSION['id'];
        $usuario_municipio->llenar_direcciones($id_usuario);
        $json = array();
        foreach ($usuario_municipio->objetos as $objeto){
            $encrypted_id = openssl_encrypt($objeto->id,'AES-128-CBC' , "estelectronic", 0, '0001020304050607');
            $json[] = array(
                'id' => $encrypted_id,
                'direccion' => $objeto->direccion,
                'referencia' => $objeto->referencia,
                'municipio' => $objeto->municipio,
                'estado' => $objeto->estado,
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }else if($funcion == 'eliminar_direccion'){
        $id_usuario_municipio = openssl_decrypt( $_POST['id'],'AES-128-CBC' , "estelectronic", 0, '0001020304050607');
        if(is_numeric($id_usuario_municipio)){
            $usuario_municipio->eliminar_direccion($id_usuario_municipio);
            echo "success";
        }
        else{
            echo "error";
        }
    }
    
} else {
    echo "No se ha definido la función.";
}