<?php
    include_once 'Conexion.php';

    class Estado{
        var $objetos;
        public $acceso;
        public function __construct(){
            $db = new Conexion();
            $this ->acceso = $db->pdo;
        }

        function llenar_estados (){
            $sql = "SELECT*FROM estados";
            $query = $this->acceso->prepare($sql);
            $query -> execute();
            $this->objetos =$query->fetchAll();
            return $this->objetos;
        }
    }
