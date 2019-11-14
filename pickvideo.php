<?php
$VideoArr = array_reverse(glob("Sample/*"));
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

  <!-- Custom fonts for this template -->
  <link href="https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap" rel="stylesheet">

  <!-- Custom styles for this template -->
  <link href="css/business-casual.css" rel="stylesheet">

  <script src="libraries/jquery-3.4.1.slim.min.js"></script>
</head>

<body>
  <!-- Page Content -->
  <div class="container title_div">

    <h1 class="title text-center mt-4 mb-0">Select Your Video</h1>

    <div class="thumbnails row text-center text-lg-left">

        <?php
        for($i = 1; $i<=count($VideoArr); $i++){
          echo '<div class="work col-lg-4 col-md-6 col-12">
            <input type="radio" name="original" class="vid-radio" id="sample'.$i.'" value="1"/>
            <div class="d-block mb-4 h-100">
              <video class="thumbnail img-fluid img-thumbnail" autoplay="autoplay" preload="metadata"><source src="Sample/sample'.$i.'.mp4" type="video/mp4"></video>
              <label for="sample'.$i.'" class="vid-pane img-fluid" alt=""></label>
            </div>
          </div>';
        }
        ?>
      </div>  

    </div>

  </div>

  <button id="next-btn" onclick="buttonOnClick()" class="custom-button next-btn-off"><i>Next<i></button>

  <script>
  jQuery( document ).ready(function($) {
    $('.vid-pane').click(function() {
      this.previousSibling.previousSibling.paused ? this.previousSibling.previousSibling.play() : this.previousSibling.previousSibling.pause();
      $('video').not($(this.previousSibling.previousSibling)).each(function() {
        this.pause();
      });
      VideoNum = this.htmlFor;
      document.getElementById('next-btn').style.display = 'block';
    });
  });

  function buttonOnClick() {
    sessionStorage.originalNo = $('input[name=original]:checked').val();
    location.href='unet.php?id='+VideoNum;
  }
  </script>

</body>

</html>
