$(document).ready(function() {
    var funcion;
    bsCustomFileInput.init();
    verificar_sesion();
    obtener_datos();
    llenar_estados();
    llenar_direcciones();
    llenar_historial();

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
                    $.post('../Controllers/UsuarioMunicipioController.php', { funcion,id}, (response) =>{
                        console.log(response);
                        if(response =="success"){
                            swalWithBootstrapButtons.fire({
                                title: "Borrado!",
                                text: "La direccion fue borrada.",
                                icon: "success"
                            });
                            llenar_direcciones();
                            llenar_historial();
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

    $(document).on('click','.editar_datos', (e) =>{
        funcion = "obtener_datos";
        $.post('../Controllers/UsuarioController.php', {funcion}, (response) => {
            let usuario = JSON.parse(response);
            $("#nombres_mod").val(usuario.nombres);
            $("#apellidos_mod").val(usuario.apellidos);
            $("#dni_mod").val(usuario.dni);
            $("#email_mod").val(usuario.email);
            $("#telefono_mod").val(usuario.telefono);
        })
    })

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
            //#direccion tratandose de un contenedor (div) puesto anteriormente en nuestra vista
            $('#direcciones').html(template);
        });
    }

    function verificar_sesion() {
        funcion = 'verificar_sesion';
        $.post('../Controllers/UsuarioController.php', { funcion }, function(response) {
            if (response != '') {
                let session = JSON.parse(response);
                $('#nav_login').hide();
                $('#nav_register').hide();
                $('#usuario_nav').text(session.user);
                $('#avatar_nav').attr('src','../Util/img/Users/'+session.avatar);
                $('#avatar_menu').attr('src','../Util/img/Users/'+session.avatar);
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
            $('#avatar_perfil').attr('src','../Util/img/Users/' + usuario.avatar);
            $('#dni').text(usuario.dni);
            $('#email').text(usuario.email);
            $('#telefono').text(usuario.telefono);
        });
    }
    function llenar_historial(){
        funcion = 'llenar_historial';
        $.post('../Controllers/HistorialController.php' , { funcion } , (response)=>{
            let historiales = JSON.parse(response);
            let template = '';
            historiales.forEach(historial =>{
                template += `
                    <div class="time-label">
                        <span class="bg-danger">
                            ${historial[0].fecha}
                        </span>
                    </div>
                    `;
                historial.forEach(cambio =>{
                    template+=`
                    <div>
                        ${cambio.m_icono}

                        <div class="timeline-item">
                          <span class="time"><i class="far fa-clock"></i>${cambio.hora}</span>

                          <h3 class="timeline-header">${cambio.th_icono} Se realizó la accion ${cambio.tipo_historial} en ${cambio.modulo}</h3>

                          <div class="timeline-body">
                            ${cambio.descripcion}
                          </div>
                        </div>
                    </div>
                    `;
                });
            });
            template +=`
            <div>
                <i class="far fa-clock bg-gray"></i>
            </div>
            `;
            $('#historiales').html(template);
        })
    }

    $('#form-direccion').submit(function(e) {
        e.preventDefault(); // Prevent the default form submission

        funcion = 'crear_direccion';
        let id_municipio = $('#municipio').val();
        let direccion = $('#direccion').val();
        let referencia = $('#referencia').val();
        $.post('../Controllers/UsuarioMunicipioController.php', {funcion,id_municipio,direccion,referencia}, function(response) {
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
                  llenar_historial();
                  llenar_direcciones();
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
    //Validaciones
    // Configuración de jQuery Validator
    $.validator.setDefaults({
        submitHandler: function () {
            funcion = "editar_datos";
            let datos = new FormData($('#form-datos')[0]);
            datos.append("funcion",funcion);
            $.ajax({
                type : "POST",
                url : '../Controllers/UsuarioController.php',
                data : datos,
                cache : false,
                processData : false,
                contentType : false,
                success : function (response) {
                    console.log(response);
                    if(response == 'Success'){
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Se ha registrado exitosamente",
                            showConfirmButton: false,
                            timer: 1000
                          }).then(function(){
                            verificar_sesion();
                            obtener_datos();
                            llenar_historial();
                          });
                    }else if(response == 'Danger'){
                        Swal.fire({
                            icon: "warning",
                            title: "No alteró ningun cambio",
                            text: "Modifique algun cambio",
                          });
                    }else{
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Hubo error al editar sus datos, contactese con el area de sistemas",
                          });
                    }
                }
            })
        }
    });

    // Método personalizado para letras
    jQuery.validator.addMethod("letras",
        function(value, element) {
            return /^[A-Za-z\sáéíóúÁÉÍÓÚ]+$/.test(value); // Permite letras, espacios y acentos
        },
        "Este campo solo permite letras"
    );

    // Validación del formulario
    $('#form-datos').validate({
        rules: {
            nombres_mod: {
                required: true,
                letras: true
            },
            apellidos_mod: {
                required: true,
                letras: true
            },
            email_mod: {
                required: true,
                email: true
            },
            dni_mod: {
                required: true,
                digits: true,
                minlength: 8,
                maxlength: 8
            },
            telefono_mod: {
                required: true,
                digits: true,
                minlength: 8,
                maxlength: 14
            }
        },
        messages: {
            nombres_mod: {
                required: "Este campo es obligatorio"
            },
            apellidos_mod: {
                required: "Este campo es obligatorio"
            },
            email_mod: {
                required: "Este campo es obligatorio",
                email: "Ingresa una dirección válida"
            },
            dni_mod: {
                required: "Este campo es obligatorio",
                minlength: "El DNI debe tener exactamente 8 dígitos",
                maxlength: "El DNI debe tener exactamente 8 dígitos",
                digits: "El DNI solo puede contener números"
            },
            telefono_mod: {
                required: "Este campo es obligatorio",
                digits: "El teléfono solo puede contener números",
                minlength: "El teléfono debe tener al menos 8 dígitos",
                maxlength: "El teléfono debe tener como máximo 14 dígitos"
            }
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-valid').addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid').addClass('is-valid');
        }
    });
    $.validator.setDefaults({
        submitHandler: function () {
            funcion = "cambiar_contra";
            let pass_old = $('#pass_old').val();
            let pass_new = $('#pass_new').val();
            $.post('../Controllers/UsuarioController.php',{funcion, pass_old, pass_new},(response)=>{
                if(response == 'Success'){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Se ha registrado cambiado la password",
                        showConfirmButton: false,
                        timer: 1000
                      }).then(function(){
                        $('#form-contra').trigger('reset')
                      });
                } else if(response == 'Error'){
                    Swal.fire({
                        icon: "warning",
                        title: "Password incorrecto",
                        text: "Ingrese su password actual para poder cambiarla",
                      });
                } else{
                    Swal.fire({
                        icon: "Error",
                        title: "error",
                        text: "Hubo conflicto al cambiar su password",
                      });
                }
            })
        }
    });
    jQuery.validator.addMethod("letras",
        function (value, element) {
            return /^[A-Za-z\sáéíóúÁÉÍÓÚ]+$/.test(value); // Permite letras, espacios y acentos
        },
        "Este campo solo permite letras"
    );
    $('#form-contra').validate({
        rules: {
            pass_old: {
                required: true,
                minlength: 8,
                maxlength: 20
            },
            pass_new: {
                required: true,
                minlength: 8,
                maxlength: 20
            },
            pass_repeat: {
                required: true,
                equalTo : "#pass_new"
            },
        },
        messages: {
           
            pass_old: {
                required: "Este campo es obligatorio",
                minlength: "* La password debe ser de minimo 8 caracteres",
                maxlength: "* La password como maximo debe tener 20 caracteres",
            },
            pass_new: {
                required: "Este campo es obligatorio",
                minlength: "* La password debe ser de minimo 8 caracteres",
                maxlength: "* La password como maximo debe tener 20 caracteres",
            },
            pass_repeat: {
                required: "Este campo es obligatorio",
                equalTo: "*Las passwords no coinciden",
            },
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-valid');
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
            $(element).addClass('is-valid');
        }
    });
});