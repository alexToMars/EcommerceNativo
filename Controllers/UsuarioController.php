<?php
include_once ("../Models/Usuario.php");
$usuario = new Usuario();
session_start();

if (isset($_POST['funcion'])) {
    $funcion = $_POST['funcion'];

    if ($funcion == 'login') {
        $user = $_POST['user'];
        $pass = $_POST['password'];
        $usuario->loguearse($user, $pass);
        if ($usuario->objetos != null) {
            foreach ($usuario->objetos as $objeto) {
                $_SESSION['id'] = $objeto->id;
                $_SESSION['user'] = $objeto->usuario;
                $_SESSION['tipo_usuario'] = $objeto->id_tipo;
                $_SESSION['avatar'] = $objeto->avatar;
            }
            echo 'logueado';
        } else {
            echo 'Usuario o contraseña incorrectos';
        }
    } elseif ($funcion == 'listar_usuario') {
        echo "Listar usuarios";
    } elseif ($funcion == 'verificar_sesion') {
        if (!empty($_SESSION['id'])) {
            $json[] = array(
                'id' => $_SESSION['id'],
                'user' => $_SESSION['user'],
                'tipo_usuario' => $_SESSION['tipo_usuario'],
                'avatar' => $_SESSION['avatar']
            );
            $jsonstring = json_encode($json[0]);
            echo $jsonstring;
        } else {
            echo '';
        }
    } elseif ($funcion == 'verificar_usuario') {
        $username = $_POST['value'];
        $usuario->verificar_usuario($username);
        if ($usuario->objetos != null) {
            echo "success";
        }
    } elseif ($funcion == "registrar_usuario") {
        $user = $_POST['user'];
        $pass = $_POST['pass'];
        $nombres = $_POST['nombres'];
        $apellidos = $_POST['apellidos'];
        $dni = $_POST['dni'];
        $email = $_POST['email'];
        $telefono = $_POST['telefono'];
        $usuario->registrar_usuario($user,$pass,$nombres,$apellidos,$dni,$email,$telefono);
        echo "success";
    } elseif ($funcion == "obtener_datos") {
        $usuario ->obtener_datos($_SESSION['id']);
        foreach($usuario->objetos as $objeto){
            $json[]=array(
                'username' => $objeto->usuario,
                'nombres' => $objeto->nombres,
                'apellidos' => $objeto->apellidos,
                'dni' => $objeto->dni,
                'email' =>$objeto-> email,
                'telefono' => $objeto->telefono,
                'avatar'=> $objeto->avatar,
                'tipo_usuario' => $objeto->tipo,
            );
            $jsonstring = json_encode($json[0]);
            echo $jsonstring;
        }
    } else if($funcion == 'editar_datos'){
        $user_id = $_SESSION['id'];
        $nombres = $_POST['nombres'];
        $apellidos = $_POST['apellidos'];
        $dni = $_POST['dni'];
        $email = $_POST['email'];
        $telefono = $_POST['telefono'];
        $usuario -> editar_datos($user_id, $nombres, $apellidos, $dni, $email, $telefono);
        echo 'Success';
    }
} else {
    echo "No se ha definido la función.";
}
