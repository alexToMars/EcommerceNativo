<?php
    include_once 'Conexion.php';

    class Historial{
        var $objetos;
        public $acceso;
        public function __construct(){
            $db = new Conexion();
            $this ->acceso = $db->pdo;
        }
        
        public function llenar_historial($user){
            $sql = "SELECT h.id as id, descripcion, fecha, th.nombre as tipo_historial, th.icono as th_icono , m.nombre as modulo, m.icono as m_icono FROM historial h
                    JOIN tipo_historial th ON h.id_tipo_historial =th.id
                    JOIN modulo m ON h.id_modulo = m.id WHERE id_usuario=:id_usuario ORDER BY fecha DESC";
            $query = $this->acceso -> prepare($sql);
            $query ->execute(array(':id_usuario'=>$user));
            $this -> objetos = $query->fetchAll();
            return $this->objetos;    
        }
        public function crear_historial($descripcion,$id_tipo_historial,$id_modulo,$id_usuario){
            $sql = "INSERT INTO historial(descripcion,id_tipo_historial,id_modulo,id_usuario) VALUES 
            (:descripcion,:id_tipo,:id_modulo,:id_usuario)";
            $query = $this->acceso -> prepare($sql);
            $query ->execute(array(':descripcion'=>$descripcion, ':id_tipo'=>$id_tipo_historial , ':id_modulo'=> $id_modulo , ':id_usuario'=>$id_usuario));
            $this -> objetos = $query->fetchAll();
            return $this->objetos;    
        }
    }
