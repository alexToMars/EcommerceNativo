<?php
include_once 'Conexion.php';

class UsuarioMunicipio {
    var $objetos;
    public $acceso;

    public function __construct() {
        $db = new Conexion();
        $this->acceso = $db->pdo;
    }

    function crear_usuario_municipio($id_municipio, $id_usuario, $referencia, $direccion) {
        $sql = "INSERT INTO usuario_municipio(id_municipio, id_usuario, referencia, direccion) VALUES 
                (:id_municipio, :id_usuario, :referencia, :direccion)";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(
            ":id_municipio" => $id_municipio,
            ":id_usuario" => $id_usuario,
            ":referencia" => $referencia,
            ":direccion" => $direccion
        ));
        return $query->rowCount(); // Return number of affected rows
    }
}