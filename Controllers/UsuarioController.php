<?php
include_once ("../Models/Usuario.php");
$usuario = new Usuario();
session_start();

if (isset($_POST['funcion'])) {
    $funcion = $_POST['funcion'];

    if ($funcion == 'login') {
        $user = $_POST['user'];
        $pass = $_POST['password'];
        $usuario->verificar_usuario($user);
        $pass_verify = $usuario->objetos[0]->password;
        $pass_encrypt= openssl_encrypt($pass,'AES-128-CBC' , "estelectronic", 0, '0001020304050607');
        if ($pass_verify == $pass_encrypt) {
            $_SESSION['id'] = $usuario->objetos[0]->id;
            $_SESSION['user'] = $usuario->objetos[0]->usuario;
            $_SESSION['tipo_usuario'] = $usuario->objetos[0]->id_tipo;
            $_SESSION['avatar'] = $usuario->objetos[0]->avatar;
            echo 'logueado';
        } else {
            echo 'Usuario o contraseña incorrectos';
        }
    }elseif ($funcion == "cambiar_contra") {
        $user_id = $_SESSION['id'];
        $user= $_SESSION['user'];
        $pass_old = $_POST['pass_old'];
        $pass_new = $_POST['pass_new'];
        $usuario->verificar_usuario($user);
        $pass_verify = $usuario->objetos[0]->password;
        $pass_old_encrypt= openssl_encrypt($pass_old,'AES-128-CBC' , "estelectronic", 0, '0001020304050607');
        $pass_new_encrypt = openssl_encrypt($pass_new,'AES-128-CBC' , "estelectronic", 0, '0001020304050607');
        if ($pass_verify == $pass_old_encrypt){
            $usuario ->cambiar_pass($user_id,$pass_new_encrypt);
            echo 'Success';
        } else{
            echo 'Error';
        }
        
    }elseif ($funcion == 'listar_usuario') {
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
        $pass_encrypt = openssl_encrypt($pass,'AES-128-CBC' , "estelectronic", 0, '0001020304050607');
        $nombres = $_POST['nombres'];
        $apellidos = $_POST['apellidos'];
        $dni = $_POST['dni'];
        $email = $_POST['email'];
        $telefono = $_POST['telefono'];
        $usuario->registrar_usuario($user,$pass_encrypt,$nombres,$apellidos,$dni,$email,$telefono);
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
        $nombres = $_POST['nombres_mod'];
        $apellidos = $_POST['apellidos_mod'];
        $dni = $_POST['dni_mod'];
        $email = $_POST['email_mod'];
        $telefono = $_POST['telefono_mod'];
        $avatar = $_FILES['avatar_mod']['name'];
        if($avatar != ''){
            $nombre =uniqid().'-'.$avatar;
            $ruta = '../Util/img/Users/'.$nombre;
            move_uploaded_file($_FILES['avatar_mod']['tmp_name'],$ruta);
            $usuario->obtener_datos($user_id);
            foreach($usuario->objetos as $objeto){
                $avatar_actual = $objeto->avatar;
                if($avatar_actual!='user_default.png'){
                    unlink('../Util/img/Users/'.$avatar_actual);
                }
            }
            $_SESSION['avatar'] = $nombre;
        }else{
            $nombre= '';
        }
        $usuario -> editar_datos($user_id, $nombres, $apellidos, $dni, $email, $telefono,$nombre);
        echo "Sucess";
    } 
} else {
    echo "No se ha definido la función.";
}
