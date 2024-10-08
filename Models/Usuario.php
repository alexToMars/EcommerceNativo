<?php
    include_once 'Conexion.php';

    class Usuario{
        var $objetos;
        public $acceso;
        public function __construct(){
            $db = new Conexion();
            $this ->acceso = $db->pdo;
        }
        function verificar_usuario($user){
            $sql = "SELECT*FROM usuario WHERE usuario=:user";
            $query = $this->acceso->prepare($sql);
            $query -> execute(array(':user'=>$user));
            $this->objetos =$query->fetchAll();
            return $this->objetos;
        }
        function registrar_usuario($username,$pass,$nombres,$apellidos,$dni,$email,$telefono){
            $sql = "INSERT INTO usuario(usuario,password,nombres,apellidos,dni,email,telefono,id_tipo) VALUES 
            (:user,:pass,:nombres,:apellidos,:dni,:email,:telefono,:id_tipo)";
            $query = $this->acceso->prepare($sql);
            $query -> execute(array(":user"=>$username,":pass"=>$pass,":nombres"=>$nombres,":apellidos"=>$apellidos,
            ":dni"=>$dni,":email"=>$email,":telefono"=>$telefono,":id_tipo"=>2));

        }

        function obtener_datos($usuario){
            $sql = "SELECT*FROM usuario JOIN tipo_usuario ON usuario.id_tipo = tipo_usuario.id WHERE usuario.id=:user";
            $query = $this->acceso->prepare($sql);
            $query -> execute(array(':user'=>$usuario));
            $this->objetos =$query->fetchAll();
            return $this->objetos;
        }

        function editar_datos($user_id,$nombres,$apellidos,$dni,$email,$telefono,$nombre){
            if($nombre != ''){
                $sql = "UPDATE usuario SET nombres=:nombres, apellidos=:apellidos, dni=:dni, email=:email, telefono=:telefono,avatar=:avatar WHERE id=:id_usuario";
                $query = $this->acceso->prepare($sql);
                $query -> execute(array(":nombres"=>$nombres,":apellidos"=>$apellidos,":dni"=>$dni,":email"=>$email,":telefono"=>$telefono,":avatar" =>$nombre,":id_usuario"=>$user_id));
            }else{
                $sql = "UPDATE usuario SET nombres=:nombres, apellidos=:apellidos, dni=:dni, email=:email, telefono=:telefono WHERE id=:id_usuario";
                $query = $this->acceso->prepare($sql);
                $query -> execute(array(":nombres"=>$nombres,":apellidos"=>$apellidos,":dni"=>$dni,":email"=>$email,":telefono"=>$telefono,":id_usuario"=>$user_id));
            }
            return $query->rowCount();
        }
        function cambiar_pass($user_id,$pass_new){
            $sql = "UPDATE usuario SET password=:pass WHERE id=:id_usuario";
            $query = $this->acceso->prepare($sql);
            $query -> execute(array(":id_usuario"=>$user_id,":pass"=>$pass_new));
            return $query->rowCount();
        }
    }
