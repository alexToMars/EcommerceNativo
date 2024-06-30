Table estados {
  id int [pk, increment]
  estado varchar(45)
}

Table historial {
  id int [pk, increment]
  descripcion varchar(500)
  fecha datetime [default: `current_timestamp()`]
  id_tipo_historial int
  id_modulo int
  id_usuario int

  indexes {
    (id_tipo_historial, id_modulo, id_usuario)
    (id_usuario)
    (id_modulo)
  }
}

Table modulo {
  id int [pk, increment]
  nombre varchar(100)
  icono varchar(100)
  estado varchar(10) [default: 'A']
}

Table municipios {
  id int [pk, increment]
  estado_id int 
  municipio varchar(100)

  indexes {
    (estado_id)
  }
}

Table tipo_historial {
  id int [pk, increment]
  nombre varchar(100)
  icono varchar(100)
  estado varchar(10) [default: 'A']
}

Table tipo_usuario {
  id int [pk, increment]
  tipo varchar(50)
  estado varchar(10) [default: 'A']
}

Table usuario {
  id int [pk, increment]
  password varchar(255)
  nombres varchar(50)
  apellidos varchar(50)
  dni int(12)
  email varchar(200)
  telefono int(14)
  avatar varchar(200) [default: 'user_default.png']
  estado varchar(10) [default: 'A']
  id_tipo int
  usuario varchar(50)

  indexes {
    (id_tipo)
  }
}

Table usuario_municipio {
  id int [pk, increment]
  direccion varchar(255)
  referencia varchar(255)
  id_municipio int
  id_usuario int
  estado varchar(10) [default: 'A']

  indexes {
    (id_municipio)
    (id_usuario)
  }
}

Ref: historial.id_usuario > usuario.id [delete: cascade, update: cascade]
Ref: historial.id_modulo > modulo.id
Ref: historial.id_tipo_historial > tipo_historial.id
Ref: municipios.estado_id > estados.id [delete: cascade, update: cascade]
Ref: usuario.id_tipo > tipo_usuario.id
Ref: usuario_municipio.id_municipio > municipios.id [delete: cascade, update: cascade]
Ref: usuario_municipio.id_usuario > usuario.id [delete: cascade, update: cascade]