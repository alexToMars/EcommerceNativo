$(document).ready(function() {
    var funcion;
    verificar_sesion();
    obtener_datos();
    $('#estado').select2({
        placeholder : "Seleccione un estado",
        language : {
            noResults : function(){
                return "No hay resultado";
            },
            searching : function(){
                return "Buscando . . .";
            }
        }
    });

    $('#municipio').select2({
        placeholder: "Seleccione un departamento",
        language:{
            noResults : function(){
                return "No hay resultado";
            },
            searching : function(){
                return "Buscando . . .";
            }
        }
    });
    
    function verificar_sesion() {
        funcion = 'verificar_sesion';
        $.post('../Controllers/UsuarioController.php', { funcion: funcion }, function(response) {
            console.log(response);
            if(response != ''){
                let session= JSON.parse(response);
                console.log(session);
                $('#nav_login').hide();
                $('#nav_register').hide();
                $('#usuario_nav').text(session.user)
                $('#avatar_nav').attr('src','../Util/img/'+session.avatar);
                $('#avatar_menu').attr('src','../Util/img/'+session.avatar);
                $('#usuario_menu').text(session.user);
            }
            else{
                $('#nav_usuario').hide();
                location.href = 'login.php'
            }
        });
    }

    function obtener_datos() {
        funcion = 'obtener_datos';
        $.post('../Controllers/UsuarioController.php', { funcion: funcion }, function(response) {
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
})