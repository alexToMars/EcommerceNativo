<?php
  include_once 'Views/Layouts/header.php';
?>
<style>
  .cruzarTexto{
    text-decoration: line-through;
    color : #959595;
  }
  .resaltarTexto{
    color: #FF2222;
  }

  .centrarImagen {
    width: 100%; 
    text-align: center; 
  }

  .centrarImagen img {
    display: block;
    margin: auto; 
  }

  .titulo_producto{
    color : #000000;
  }
  .titulo_producto:visited{
    color : #3333FF;
  }
  .titulo_producto:focus{
    border-bottom: 1px solid;
  }
  .titulo_producto:hover{
    border-bottom: 1px solid;
  }

  .titulo_producto:active{
    background: #000;
    color: #FFF;
  }
</style>
  <title>Home</title>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Home</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Blank Page</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>
    
    <!-- Main content -->
    <section class="content">

      <!-- Default box -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Productos</h3>
        </div>
        <div class="card-body">
          <div id="productos" class="row">
            <div class="col-sm-2">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-12">
                      <img src="Util/img/avatar.png" class="img-fluid centrarImagen">
                    </div>
                    <div class="col-sm-12">
                      <span class="text-muted float-left">Marca:</span><br>
                      <a class="titulo_producto" href="#">Titulo del producto</a><br>
                      <span class="badge bg-success">Envio gratis</span><br>
                      <i class="fas fa-star text-warning"></i>
                      <i class="fas fa-star text-warning"></i>
                      <i class="fas fa-star text-warning"></i>
                      <i class="far fa-star text-warning"></i>
                      <i class="far fa-star text-warning"></i><br>
                      <span class="cruzarTexto">$ 1000</span>
                      <span >-10%</span><br>
                      <h4 class="resaltarTexto">$900</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /.card-body -->
        <div class="card-footer">
          Footer
        </div>
        <!-- /.card-footer-->
      </div>
      <!-- /.card -->

    </section>
    <!-- /.content -->
<?php
  include_once 'Views/Layouts/footer.php';
?> 
<script src="index.js"></script>
