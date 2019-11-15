
<?php
$VideoArr = array_reverse(glob("Result/*.png"));
//var_dump($VideoArr);
?>

<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

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
    for($i = 0; $i<count($VideoArr);$i++){
      //echo $VideoArr[$i];
//      echo '<br>';
      $NameList = explode('_',$VideoArr[$i]); //echo $NameList[0];      echo '<br>';
      $NameList = explode("/",$NameList[0]);
      //var_dump($NameList);

      echo '<div class="w3-container w3-third work col-lg-4 col-md-6 col-12">
      <div class="d-block mb-4 h-100">
      <video class="thumbnail img-fluid img-thumbnail" autoplay="autoplay" preload="metadata"><source src="Result/'.$NameList[1].'.mp4" type="video/mp4"></video>
      <label class="vid-pane img-fluid" alt="" onclick="onClick(this)"></label>
      <img class="unet img-fluid img-thumbnail" src="'.$VideoArr[$i].'" alt="">
      </div></div>';


//      echo $NameList[1];
    }
    ?>

    <div id="modal-div" class="w3-modal gallery-modal" onclick="modalOnClick(this)">
    <video id="modal-vid" class="w3-modal-content" autoplay="autoplay"><source id="modal-vid-src" src="video/b.mp4" type="video/mp4"></video>
    </div>


    <button onclick="buttonOnClick()" class="custom-button next-btn-on"><i>Restart<i></button>

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

  function buttonOnClick(element) {
    sessionStorage.clear();
    location.href='help.html';
  }
  </script>

</body>

</html>