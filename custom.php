<<<<<<< HEAD
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
        <div class="collect-div">
          <video class="help-video" autoplay="autoplay" loop muted><source id="modal-vid-src" src="Result/'.$UserID.'.mp4" type="video/mp4"></video>
        </div>
      </div>';
    }
    else{
        echo "<script>alert('존재하지 않는 파일입니다.');  location.replace('collect.html');   </script>";
    }
  ?>
  <div class="container title_div">

  </div>

  <!-- TODO: Set href to the video's url -->
  <?php
  echo '
  <form method="get" action="Result/'.$UserID.'.mp4" class="button-div">
    <button type="submit" class="centered-button next-btn-on"><i>Download</i></button>
  </form>';
  ?>
</body>
</html>

=======

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

<body>
  <!-- Page Content -->
  <div class="container title_div">

    <h1 class="title text-center mt-4 mb-0">UGly-Net Gallery</h1>

    <div class="thumbnails row text-center text-lg-left">
        
    <?php
    //echo $UserID;
    for($i=0;$i<count($VideoArr);$i++){
      if(strpos($VideoArr[$i], $UserID) !== false) {
        $VideoName = $VideoArr[$i];
      }  
    }
    
    if(!isset($VideName) && file_exists("Result/".$UserID.".mp4")) {
      echo '<div class="w3-container w3-third work col-lg-4 col-md-6 col-12">
      <div class="d-block mb-4 h-100">
      <video class="thumbnail img-fluid img-thumbnail" autoplay="autoplay" preload="metadata" muted><source src="Result/'.$UserId.'.mp4" type="video/mp4"></video>
      <label class="vid-pane img-fluid" alt="" onclick="onClick(this)"></label>
      <img class="unet img-fluid img-thumbnail" src="img/unet1.png" alt="">
      </div></div>';
    }
    else{
        echo "<script>alert('존재하지 않는 파일입니다.');  location.replace('collect.html');   </script>";
    }



    ?>


    <button onclick="buttonOnClick()" class="custom-button next-btn-on"><i>Restart<i></button>

  <script>
  function buttonOnClick(element) {
    sessionStorage.clear();
    location.href='help.php';
  }
  </script>

</body>

</html>
>>>>>>> e31be106238bcc64d645f01f8a1bd6a39ec10d3d
