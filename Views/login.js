$(document).ready(function() {
    var funcion;
    verificar_sesion();
    
    function verificar_sesion() {
        funcion = 'verificar_sesion';
        $.post('../Controllers/UsuarioController.php', { funcion: funcion }, function(response) {
            if(response != ''){
                location.href = '../index.php';
            }
        });
    }
    
    $('#form-login').submit(function(e) {
        funcion = 'login';
        let user = $('#user').val();
        let password = $('#pass').val();
        
        let data = {
            funcion: funcion,
            user: user,
            password: password
        };
        
        $.post('../Controllers/UsuarioController.php', data, function(response) {
            console.log(response);
            if(response == 'logueado'){
                toastr.success("* Logueado !");
                location.href = '../index.php';
            } else {
                toastr.error("* Usuario o contraseña incorrectos");
            }
        });

        e.preventDefault();
    });
});
