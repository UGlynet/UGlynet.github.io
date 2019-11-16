<?php
$VideoArr = array_reverse(glob("Result/*.png"));
$UserID = $_GET['id'];

?>

<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>UGly-Net</title>

  <!-- Bootstrap core CSS -->
  <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">

  <!-- Custom fonts for this template -->
  <link href="https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap" rel="stylesheet">

  <!-- Custom styles for this template -->
  <link href="css/business-casual.css" rel="stylesheet">
</head>

<body class="collect-body">
  <!-- Page Content -->

  <?php
    //echo $UserID;
    for($i=0;$i<count($VideoArr);$i++){
      if(strpos($VideoArr[$i], $UserID) !== false) {
        $VideoName = $VideoArr[$i];
      }  
    }
    
    if(!isset($VideName) && file_exists("Result/".$UserID.".mp4")) {
      echo '<div class="container title_div">
        <h1 class="title text-center mt-4 mb-0">Your UGly-Net Video:</h1>
        <!-- TODO: Set href to the video url -->
        <div class="thumbnails row text-center text-lg-left"></div>
        <div class="thumbnail help-div">
          <video class="help-video" autoplay="autoplay" loop muted><source id="modal-vid-src" src="Result/'.$UserID.'.mp4" type="video/mp4"></video>
        </div>
      </div>';
    }
    else{
        echo "<script>alert('아직 비디오를 합성하는 중입니다.');  location.replace('collect.html');   </script>";
    }
  ?>
  <div class="container title_div">

  </div>

  <!-- TODO: Set href to the video's url -->
  <?php
  echo '
  <form method="get" action="Result/'.$UserID.'.mp4" class="button-div">
    <button type="submit" class="centered-button next-btn-on video-btn"><i>Download</i></button>
  </form>';
  ?>
</body>
</html>