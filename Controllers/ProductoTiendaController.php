<?php
include_once ("../Models/ProductoTienda.php");
$producto_tienda = new ProductoTienda();
session_start();

if (isset($_POST['funcion'])) {
    $funcion = $_POST['funcion'];
    if ($funcion == "llenar_productos") {
        $producto_tienda->llenar_productos();
        $json = array();
        foreach ($producto_tienda->objetos as $objeto) {
            $json []=array(
                'id' =>$objeto->id,
                'producto' =>$objeto->producto,
                'imagen' =>$objeto->imagen,
                'marca' =>$objeto->marca,
                'calificacion' =>'d',
                'envio' =>$objeto->envio,
                'precio' =>$objeto->precio,
                'descuento' =>$objeto->descuento,
                'precio_descuento' =>$objeto->precio_descuento,
            );
        }
        $jsonstring = json_encode($json);
        echo $jsonstring;
    }
} else {
    echo "No se ha definido la función.";
}
