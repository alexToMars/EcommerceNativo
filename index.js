$(document).ready(function() {
    var funcion;
    verificar_sesion();
    
    function verificar_sesion() {
        funcion = 'verificar_sesion';
        $.post('Controllers/UsuarioController.php', { funcion: funcion }, function(response) {
            console.log(response);
            if(response != ''){
                let session= JSON.parse(response);
                console.log(session);
                $('#nav_login').hide();
                $('#nav_register').hide();
                $('#usuario_nav').text(session.user)
                $('#avatar_nav').attr('src','Util/img/Users/'+session.avatar);
                $('#avatar_menu').attr('src','Util/img/Users/'+session.avatar);
                $('#usuario_menu').text(session.user);
            }
            else{
                $('#nav_usuario').hide();
            }
        });
    }
})