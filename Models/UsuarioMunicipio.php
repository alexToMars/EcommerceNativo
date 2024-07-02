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
        return $query->rowCount();
    }
    function llenar_direcciones($id_usuario){
        $sql = "SELECT 
                usuario_municipio.id id,
                usuario_municipio.direccion, usuario_municipio.referencia ,
                municipios.municipio , estados.estado
                FROM usuario_municipio
                JOIN municipios ON usuario_municipio.id_municipio = municipios.id
                JOIN estados ON municipios.estado_id = estados.id WHERE usuario_municipio.id_usuario=:id_usuario AND usuario_municipio.estado='A'";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(":id_usuario"=> $id_usuario));
        $this->objetos =$query->fetchAll();
        return $this->objetos;
    }
    
    function eliminar_direccion($id_usuario_municipio){
        $sql = "UPDATE usuario_municipio SET estado='I' WHERE usuario_municipio.id =:id_usuario_municipio";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(":id_usuario_municipio" => $id_usuario_municipio));
        return $query->rowCount();
    }

    function recuperar_direccion($id_direccion){
        $sql = "SELECT 
                usuario_municipio.id id,
                usuario_municipio.direccion, usuario_municipio.referencia ,
                municipios.municipio , estados.estado
                FROM usuario_municipio
                JOIN municipios ON usuario_municipio.id_municipio = municipios.id
                JOIN estados ON municipios.estado_id = estados.id WHERE usuario_municipio.id=:id_direccion AND usuario_municipio.estado='A'";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(":id_direccion"=> $id_direccion));
        $this->objetos =$query->fetchAll();
        return $this->objetos;
    }
}