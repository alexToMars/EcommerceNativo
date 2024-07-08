$(document).ready(function() {
    var funcion;
    verificar_sesion();
    llenar_productos();
    
    function verificar_sesion() {
        funcion = 'verificar_sesion';
        $.post('Controllers/UsuarioController.php', { funcion: funcion }, function(response) {
            if(response != ''){
                let session= JSON.parse(response);
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

    async function llenar_productos() {
        funcion = "llenar_productos";
        let data = await fetch('Controllers/ProductoTiendaController.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'funcion=' + encodeURIComponent(funcion) 
        });
        if(data.ok){
            let response = await data.text();
            try {
                let productos = JSON.parse(response);
                console.log(productos)
            } catch (error) {
                console.error(error);
                console.log(response)
            }
        }else{
            Swal.fire({
                icon: "error",
                title: data.statusText,
                text: "Hubo conflicto de codigo : "+data.status,
              });
        }
    }
    
})