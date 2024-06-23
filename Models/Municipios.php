<?php
    include_once 'Conexion.php';

    class Municipio{
        var $objetos;
        public $acceso;
        public function __construct(){
            $db = new Conexion();
            $this ->acceso = $db->pdo;
        }

        function llenar_municipios ($id_estado){
            $sql = "SELECT id,municipio FROM municipios WHERE estado_id=:estado ";
            $query = $this->acceso->prepare($sql);
            $query -> execute(array(':estado'=>$id_estado));
            $this->objetos =$query->fetchAll();
            return $this->objetos;
        }
    }
