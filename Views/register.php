<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Register | EstElectron</title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <link rel="stylesheet" href="../Util/css/Css/all.min.css">
  <link rel="stylesheet" href="../Util/css/adminlte.min.css">
  <link rel="stylesheet" href="../Util/css/toastr.min.css">
  <link rel="stylesheet" href="../Util/css/sweetalert2.min.css">
  <style>
    .card2{
      width: 500px;
    }
  </style>
</head>
<!-- Modal -->
<div class="modal fade" id="terminos" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="card card-success">
        <div class="card-header">
          <h1 class="card-title fs-5">Terminos y condiciones</h1>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
        </div>
        <div class="card-body">
          <p> Utilizaremos sus datos para generar publicidad de acuerdo a sus gustos. </p>
          <p> La empresa no se hace responsable de fraudes o estafas. </p>
          
        </div>
        <div class="card-footer">
          <button type="button" class="btn btn-secondary btn-bloc" data-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</div>

<body class="hold-transition login-page">
  <div class="login-box">
    <div class="login-logo">
      <img src="../Util/img/logo.jpeg" class="profile-user-img img-fluid img-circle">
      <a href="../index.php"><b>Est</b>Electron</a>
    </div>
    <!-- /.login-logo -->
    <div class="card card2">
      <div class="card-body login-card-body">
        <p class="login-box-msg">Registrarse</p>
        <form id="form-register">
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <label for="username">Username</label>
                <input type="text" name="username" class="form-control" id="username" placeholder="Ingrese username">
              </div>
              <div class="form-group">
                <label for="telefono">Telefono</label>
                <input type="text" name="telefono" class="form-control" id="telefono"
                  placeholder="Ingrese telefono">
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <label for="pass">Password</label>
                <input type="password" name="pass" class="form-control" id="pass" placeholder="Ingrese password">
              </div>
              <div class="form-group">
                <label for="nombres">Nombres</label>
                <input type="text" name="nombres" class="form-control" id="nombres" placeholder="Ingrese nombres">
              </div>
              <div class="form-group">
                <label for="dni">DNI</label>
                <input type="text" name="dni" class="form-control" id="dni" placeholder="Ingrese dni">
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-group">
                <label for="pass_repeat">Repetir password</label>
                <input type="password" name="pass_repeat" class="form-control" id="pass_repeat"
                  placeholder="Repetir password">
              </div>
              <div class="form-group">
                <label for="apellidos">Apellidos</label>
                <input type="text" name="apellidos" class="form-control" id="apellidos" placeholder="Ingrese apellidos">
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="text" name="email" class="form-control" id="email" placeholder="Ingrese email">
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="form-group mb-0">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" name="terms" class="custom-control-input" id="terms">
                <label class="custom-control-label" for="terms">Estoy de acuerdo <a href="#" data-toggle="modal"
                    data-target="#terminos">con los terminos y condiciones</a>.</label>
              </div>
            </div>
          </div>
          <!-- /.card-body -->
          <div class="card-footer text-center">
            <button type="submit" class="btn btn-lg bg-gradient-primary">Registrarme</button>
          </div>
        </form>
      </div>
      <!-- /.login-card-body -->
    </div>
  </div>
  <!-- /.login-box -->

  <!-- jQuery -->
  <script src="../Util/js/jquery.min.js"></script>
  <!-- Bootstrap 4 -->
  <script src="../Util/js/bootstrap.bundle.min.js"></script>
  <!-- AdminLTE App -->
  <script src="../Util/js/adminlte.min.js"></script>
  <!-- LLamada al codigo de login js -->
  <script src="register.js"></script>
  <script src="../Util/js/toastr.min.js"></script>
  <script src="../Util/js/jquery.validate.min.js"></script>
  <script src="../Util/js/additional-methods.min.js"></script>
  <script src="../Util/js/sweetalert2.min.js"></script>
</body>

</html>