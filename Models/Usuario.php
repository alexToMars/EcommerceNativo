<?php
    include_once 'Conexion.php';

    class Usuario{
        var $objetos;
        public $acceso;
        public function __construct(){
            $db = new Conexion();
            $this ->acceso = $db->pdo;
        }

        function loguearse ($user,$pass){
            //$sql = "SELECT*FROM usuario JOIN tipo_usuario ON id_tipo= tipo_usuario.id WHERE usuario=:user AND password=:pass";
            $sql = "SELECT*FROM usuario WHERE usuario=:user AND password=:pass";
            $query = $this->acceso->prepare($sql);
            $query -> execute(array(':user'=>$user,':pass'=>$pass));
            $this->objetos =$query->fetchAll();
            return $this->objetos;
        }
    }
?>