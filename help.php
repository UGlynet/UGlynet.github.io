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
    <h1 class="title text-center mt-4 mb-0">Welcome</h1>
    <div class="thumbnails row text-center text-lg-left"></div>
    <div class="thumbnail">
      <video class="help-video" autoplay="autoplay" muted loop><source src="video/help_video_dark_3.mp4" type="video/mp4"></video>
    </div>
  </div>

  <button onclick="buttonOnClick()" class="custom-button next-btn-on"><i>Start</i></button>

  <script>
    function buttonOnClick() {
      location.href="pickvideo.php?id=1"
    }
  </script>

</body>
</html>
