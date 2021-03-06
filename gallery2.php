
<?php
//$VideoArr = glob("Result/*.png");
$VideoArr = array_reverse(glob("Result/*.png"));
if (!isset($_GET['id'])){
  $_GET['id'] = 1;
}

//var_dump($VideoArr);
?>

<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <META HTTP-EQUIV="refresh" CONTENT="60">
  <title>UGly-Net: Gallery</title>

  <!-- Bootstrap core CSS -->
  <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">

  <!-- Custom fonts for this template -->
  <link href="https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap" rel="stylesheet">

  <!-- Custom styles for this template -->
  <link href="css/business-casual.css" rel="stylesheet">
</head>

<body>
  <!-- Page Content -->
  <div class="container title_div">

    <h1 class="title text-center mt-4 mb-0">UGly-Net Gallery</h1>

    <div class="thumbnails row text-center text-lg-left">
    
    <?php
    for($i=($_GET['id']-1)*12; $i<($_GET['id']-1)*12+12 && $i<count($VideoArr);$i++) {
      #for($i = 0; $i<count($VideoArr);$i++){
      $NameList = explode('_',$VideoArr[$i]); //echo $NameList[0];      echo '<br>';
      $NameList = explode("/",$NameList[0]);

      echo '<div class="w3-container w3-third work col-lg-4 col-md-6 col-12">
      <div class="d-block mb-4 h-100">
      <video class="thumbnail img-fluid img-thumbnail" preload="metadata" muted><source src="Result/'.$NameList[1].'.mp4#t=0.01" type="video/mp4"></video>
      <label class="vid-pane img-fluid" alt="" onclick="onClick(this)"></label>
      <img class="unet img-fluid img-thumbnail" src="'.$VideoArr[$i].'" alt="">
      </div></div>';
    }
    ?>
            
    </div>

    <div>
      <?php
      $Next = min($_GET['id'] + 1, (int)(count($VideoArr)/12) + 1);
      $Pre = max($_GET['id'] - 1, 1);
      echo '<button class="arrow-button" style="margin-right: 40px" onclick="location.href=\'gallery2.php?id='.$Pre.'\'" ><img class="arrow-img" src="img/left-arrow.png"></button>'; 
      echo '<button class="arrow-button" style="margin-left: 40px" onclick="location.href=\'gallery2.php?id='.$Next.'\'" ><img class="arrow-img" src="img/right-arrow.png"></button>'; 
      ?>
    </div>

    <div id="modal-div" class="w3-modal gallery-modal" onclick="modalOnClick(this)">
    <video id="modal-vid" class="w3-modal-content" autoplay="autoplay" loop><source id="modal-vid-src" src="video/b.mp4" type="video/mp4"></video>
    </div>
  </div>

  <script>
  function onClick(element) {
    document.getElementById("modal-vid").src = element.previousElementSibling.children[0].src;
    document.getElementById("modal-div").style.display = "block";
    document.getElementById("modal-vid").play();
  }

  function modalOnClick(element) {
    element.style.display='none';
    document.getElementById("modal-vid").pause();
  }

  </script>

</body>

</html>
