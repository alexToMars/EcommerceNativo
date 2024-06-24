$(document).ready(function() {
    var funcion;
    verificar_sesion();
    obtener_datos();
    llenar_estados();
    llenar_direcciones();

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

    $(document).on('click','.eliminar_direccion', (e)=>{
            let elemento = $(this)[0].activeElement;
            let id = $(elemento).attr('dir_id');
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: "btn btn-success m-3",
                  cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
              });
              swalWithBootstrapButtons.fire({
                title: "Desea borrar esta direccion?",
                text: "Esta accion puede traer consecuencias!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si, borra esto!",
                cancelButtonText: "No, deseo cancelar!",
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                    funcion = "eliminar_direccion";
                    $.post('../Controllers/UsuarioMunicipioController.php', { funcion,id}, function(response) {
                        if(response =="success"){
                            swalWithBootstrapButtons.fire({
                                title: "Borrado!",
                                text: "La direccion fue borrada.",
                                icon: "success"
                            });
                            llenar_direcciones();
                        }else if (response == "error"){
                            swalWithBootstrapButtons.fire({
                                title: "Hubo un error",
                                text: "Hubo alteraciones en la integridad de datos",
                                icon: "error"
                              });
                        }else{
                            swalWithBootstrapButtons.fire({
                                title: "Hubo un error",
                                text: "Tenemos problemas en el sistema",
                                icon: "error"
                            });
                        }
                    })
                    /*
                    */
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                  swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "La dirección no se borro",
                    icon: "error"
                  });
                }
              });
        }
    )

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

    function llenar_direcciones(){
        funcion = "llenar_direcciones";
        $.post('../Controllers/UsuarioMunicipioController.php', { funcion }, function(response) {
            console.log(response);
            let direcciones = JSON.parse(response);
            let template = '';
            let contador = 0;
            direcciones.forEach(direccion => {
                contador++;
                template += `
                <div class="callout callout-info">
                    <div class="card-header">
                        <strong>Direccion ${contador}</strong>
                        <div class="card-tools">
                            <button dir_id="${direccion.id}" type="button" class="eliminar_direccion btn btn-tool">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                      <h2 class="lead"><b>${direccion.direccion}</b></h2>
                      <p class="text-muted text-sm"><b>Referencia: ${direccion.referencia}</b></p>
                      <ul class="ml-4 mb-0 fa-ul text-muted">
                        <li class="small">
                          <span class="fa-li"><i class="fas fa-lg fa-building"></i></span>
                          ${direccion.municipio} , ${direccion.estado}
                        </li>
                      </ul>
                    </div>
                </div>
                `;
            });
            $('#direcciones').html(template);
        });
    }

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
