$(document).ready(function() {
    var funcion;
    verificar_sesion();
    obtener_datos();
    llenar_estados();

    $('#estado').select2({
        placeholder : "Seleccione un estado",
        language : {
            noResults : function() {
                return "No hay resultado";
            },
            searching : function() {
                return "Buscando . . .";
            }
        }
    });

    $('#municipio').select2({
        placeholder: "Seleccione un municipio",
        language: {
            noResults : function() {
                return "No hay resultado";
            },
            searching : function() {
                return "Buscando . . .";
            }
        }
    });

    function llenar_estados() {
        funcion = "llenar_estados";
        $.post('../Controllers/EstadosController.php', { funcion }, function(response) {
            let estados = JSON.parse(response);
            let template = '';
            estados.forEach(estado => {
                template += `<option value="${estado.id}">${estado.estado}</option>`;
            });
            $('#estado').html(template);
            $('#estado').val('').trigger('change');
        });
    }

    $("#estado").change(function() {
        let id_estado = $('#estado').val();
        funcion = "llenar_municipios";
        $.post("../Controllers/MunicipiosController.php", { funcion, id_estado }, function(response) {
            let municipios = JSON.parse(response);
            let template = '';
            municipios.forEach(municipio => {
                template += `<option value="${municipio.id}">${municipio.municipio}</option>`;
            });
            $('#municipio').html(template);
        });
    });

    function verificar_sesion() {
        funcion = 'verificar_sesion';
        $.post('../Controllers/UsuarioController.php', { funcion }, function(response) {
            console.log(response);
            if (response != '') {
                let session = JSON.parse(response);
                console.log(session);
                $('#nav_login').hide();
                $('#nav_register').hide();
                $('#usuario_nav').text(session.user);
                $('#avatar_nav').attr('src','../Util/img/'+session.avatar);
                $('#avatar_menu').attr('src','../Util/img/'+session.avatar);
                $('#usuario_menu').text(session.user);
            } else {
                $('#nav_usuario').hide();
                location.href = 'login.php';
            }
        });
    }

    function obtener_datos() {
        funcion = 'obtener_datos';
        $.post('../Controllers/UsuarioController.php', { funcion }, function(response) {
            let usuario = JSON.parse(response);
            $('#username').text(usuario.username);
            $('#tipo_usuario').text(usuario.tipo_usuario);
            $('#nombres').text(usuario.nombres+' '+usuario.apellidos);
            $('#avatar_perfil').attr('src','../Util/img/' + usuario.avatar);
            $('#dni').text(usuario.dni);
            $('#email').text(usuario.email);
            $('#telefono').text(usuario.telefono);
        });
    }

    $('#form-direccion').submit(function(e) {
        e.preventDefault(); // Prevent the default form submission

        funcion = 'crear_direccion';
        let id_municipio = $('#municipio').val();
        let direccion = $('#direccion').val();
        let referencia = $('#referencia').val();
        console.log(id_municipio);
        console.log(direccion);
        console.log(referencia);
        $.post('../Controllers/UsuarioMunicipioController.php', {funcion,id_municipio,direccion,referencia}, function(response) {
            console.log(response);
            if(response == 'success'){
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Se ha registrado exitosamente",
                  showConfirmButton: false,
                  timer: 500
                }).then(function(){
                  $('#form-direccion').trigger('reset');
                  $('#estado').val('').trigger('change');
                });
            }else{
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Hubo error al crear su direccion, contactese con el area de sistemas",
                });
            }
        });
        
    });
});
