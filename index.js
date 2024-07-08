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
                let template =``;
                productos.forEach(producto=>{
                    template+=`
                    <div class="col-sm-2">
                      <div class="card">
                        <div class="card-body">
                          <div class="row">
                            <div class="col-sm-12">
                              <img src="https://0tk57mq4-443.usw3.devtunnels.ms/Proyecto_EcommerceNativo/Util/img/producto/${producto.imagen}" class="img-fluid centrarImagen">
                            </div>
                            <div class="col-sm-12">
                              <span class="text-muted float-left">${producto.marca}</span><br>
                              <a class="titulo_producto" href="#">${producto.producto}</a><br>`
                              if(producto.envio =='Gratis'){
                                template +=`<span class="badge bg-success">Envio gratis</span><br>`;
                              } 
                              if(producto.calificacion != 0){
                                for(let index = 0; index<producto.calificacion; index++){
                                    template +=`<i class="fas fa-star text-warning"></i>`;;
                                }
                                let indiceEstrellasVacias = 5-producto.calificacion;
                                for(let index = 0; index<indiceEstrellasVacias; index++){
                                    template +=`<i class="far fa-star text-warning"></i>`;
                                }
                                template +=`<br>`;
                              }
                              if(producto.descuento !=0){
                                template+=`
                                <span class="cruzarTexto">$ ${producto.precio}</span>
                                <span >-${producto.descuento}%</span><br>`
                              }
                              template+=`
                              <h4 class="resaltarTexto">$${producto.precio_descuento}</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    `;
                });
                $('#productos').html(template);
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