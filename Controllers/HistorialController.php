<?php
include_once ("../Models/Historial.php");
$historial = new Historial();
const MAXIMUM_DATES=3;
session_start();

if (isset($_POST['funcion'])) {
    $funcion = $_POST['funcion'];

    if ($funcion == 'llenar_historial') {
        $id_usuario = $_SESSION['id'];
        $historial -> llenar_historial($id_usuario);
        $bandera = '';
        $contador = 0;
        $fecha = array();
        foreach ($historial->objetos as $objeto){
            $fecha_hora = date_create($objeto->fecha);
            $hora = $fecha_hora->format('H:i:s');
            $fecha = date_format($fecha_hora,'d-m-Y');
            if($fecha!=$bandera){
                $contador++;
                $bandera = $fecha;
            }
            if($contador == MAXIMUM_DATES){
                $fechas [$contador-1][] = array(
                    'id' =>$objeto->id,
                    'descripcion' =>$objeto ->descripcion,
                    'fecha' => $fecha,
                    'hora' => $hora,
                    'tipo_historial' => $objeto->tipo_historial,
                    'th_icono' => $objeto->th_icono,
                    'modulo' => $objeto->modulo,
                    'm_icono' => $objeto->m_icono
                );
            }
            else{
                if ($contador == MAXIMUM_DATES+1){
                    break;
                }
                else{
                    $fechas [$contador-1][] = array(
                        'id' =>$objeto->id,
                        'descripcion' =>$objeto ->descripcion,
                        'fecha' => $fecha,
                        'hora' => $hora,
                        'tipo_historial' => $objeto->tipo_historial,
                        'th_icono' => $objeto->th_icono,
                        'modulo' => $objeto->modulo,
                        'm_icono' => $objeto->m_icono
                    );
                }
            }
        }
        $jsonstring = json_encode($fechas);
        echo $jsonstring;
    }
} else {
    echo "No se ha definido la función.";
}