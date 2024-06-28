$(document).ready(function (){
  {
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
      $.validator.setDefaults({
        submitHandler: function () {
          $.post('../Controllers/UsuarioController.php', {
            funcion: "registrar_usuario",
            user: $('#username').val(),
            pass: $('#pass').val(),
            nombres: $('#nombres').val(),
            apellidos: $('#apellidos').val(),
            dni: $('#dni').val(),
            email: $('#email').val(),
            telefono: $('#telefono').val(),
          }, (response) => {
            reponse = response.trim();
            console.log(response);
            if(response == 'success'){
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Se ha registrado exitosamente",
                showConfirmButton: false,
                timer: 2500
              }).then(function(){
                $('#form-register').trigger('reset');
                location.href = '../Views/login.php'
              });
            }else{
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo error al registrarse, contactese con el area de sistemas",
              });
            }
          });
        }
      });
      jQuery.validator.addMethod("usuario_existente",
          function(value,element){
              let funcion = "verificar_usuario";
              let bandera;
              $.ajax({
                type : "POST",
                url : "../Controllers/UsuarioController.php",
                data : 'funcion='+funcion+"&&value="+value,
                async : false,
                success : function(response){
                  if(response == "success"){
                    bandera = false;
                  }else{
                    bandera = true;
                  }
                }
              })
              console.log(bandera);
              return bandera;
          },
          "El usuario ya existe, por favor ingrese uno diferente");
      jQuery.validator.addMethod("letras",
        function(value, element) {
            return /^[A-Za-z\sáéíóúÁÉÍÓÚ]+$/.test(value); // Permite letras, espacios y acentos
        },
        "Este campo solo permite letras"
        );
      $('#form-register').validate({
        rules: {
          nombres:{
            required : true,
            letras: true
          },
          apellidos:{
            required : true,
            letras: true,
          },
          username :{
            required: true,
            minlength: 7,
            maxlength: 20,
            usuario_existente: true,
          },
          email: {
            required: true,
            email: true,
          },
          pass: {
            required: true,
            minlength: 8,
            maxlength: 20
          },
          pass_repeat:{
            required: true,
            equalTo : "#pass"
          },
          dni:{
            required: true,
            digits : true,
            minlength: 8,
            maxlength: 8
          },
          telefono:{
            required : true,
            digits : true,
            minlength : 8,
            maxlength : 14
          },
          terms: {
            required: true
          },
        },
        messages: {
          username:{
            required: "Este campo es obligatorio",
            minlength: "* El username debe ser de minimo 8 caracteres",
            maxlength: "* El username como maximo debe tener 20 caracteres",
          },
          email: {
            required: "Este campo es obligatorio",
            email: "Ingresa una direccion valida"
          },
          telefono:{
            required : "Este campo es obligatorio",
            digits : true,
            minlength : "El numero debe tener como minimo 8 digitos",
            maxlength : "En numero debe tener como maximo 14 digitos",
            digits : "Solo se aceptan numero en este campo, no otros caracteres"
          },
          pass: {
            required: "Este campo es obligatorio",
            minlength: "* La password debe ser de minimo 8 caracteres",
            maxlength: "* La password como maximo debe tener 20 caracteres",
          },
          pass_repeat:{
            required: "Este campo es obligatorio",
            equalTo : "*Las passwords no coinciden",
          },
          nombres: {
            required: "Este campo es obligatorio",
          },
          apellidos: {
            required: "Este campo es obligatorio",
          },
          dni:{
            required: "Este campo es obligatorio",
            minlength: "* El DNI debe ser de 8 caracteres",
            digits : "* El DNI solo esta compuesto por digitos"
          },
          terms: "Favor de aceptar los terminos"
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
    }
});