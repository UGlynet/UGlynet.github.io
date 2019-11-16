<?php
//$pic4 = $_POST['4pic'];






$data = $_POST['thumb'];
list($type, $data) = explode(';', $data);
list(, $data)      = explode(',', $data);
$data = base64_decode($data);

$estlatentopt = $_POST['est-latent-opt'];
$estlatentval = $_POST['est-latent-val'];
$estskipopt = $_POST['est-skip-opt'];
$estskipval = $_POST['est-skip-val'];
$estencoderopt = $_POST['est-encoder-opt'];
$estencoderval = $_POST['est-encoder-val'];
$estdecoderopt = $_POST['est-encoder-opt'];
$estdecoderval = $_POST['est-decoder-val'];
$intplatentopt = $_POST['intp-latent-opt'];
$intplatentval = $_POST['intp-latent-val'];
$intpskipopt = $_POST['intp-skip-opt'];
$intpskipval = $_POST['intp-skip-val'];
$intpencoderopt = $_POST['intp-encoder-opt'];
$intpencoderval = $_POST['intp-encoder-val'];
$intpdecoderopt = $_POST['intp-encoder-opt'];
$intpdecoderval = $_POST['intp-decoder-val'];
$rval = $_POST['r-val'];
$gval = $_POST['g-val'];
$bval = $_POST['b-val'];
$code = $_POST['code'];
$videonum = $_POST['videonum'];
//echo $code;
$name =  $code.'_'.$videonum.'_'.$estlatentopt.'_'. $estlatentval. '_'.$estskipopt. '_'.$estskipval. '_'.$estencoderopt. '_'.$estencoderval. '_'.$estdecoderopt. '_'.$estdecoderval.'_'.$intplatentopt.'_'.$intplatentval.'_'.$intpskipopt.'_'.$intpskipval.'_'.$intpencoderopt.'_'.$intpencoderval.'_'.$intpdecoderopt.'_'.$intpdecoderval.'_'.$rval .'_'.$gval.'_'. $bval;
file_put_contents('/var/www/html/Thumb/'.$name.'.png', $data);

?>


<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0>
    <title>UGly-Net</title>

    <!-- Bootstrap core CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom fonts for this template -->
    <link href="https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/business-casual.css" rel="stylesheet">
  </head>

  <body>
    
    <div class="container title_div">
      <h1 class="title text-center mt-4 mb-0">Video in Process...</h1>
    </div>
    <div class="info-div">
      <div class="info-text">
        <p>You can find your video at: <br>
          <span>uglynet.io/collect</span>
        </p>
        <p>Code:<br>
          <span id="code">
        </p>
      </div>
    </div>
    <div class="picture-div">
      <div class="picture-text">      
        <p>Take a Picture!<br>It may take up to 5 mins.</p>
      </div>
    </div>

    <button id="next-btn-on" onclick="buttonOnClick()" class="custom-button"><i>Next<i></button> 

    <script>
      document.getElementById('code').innerHTML = "" + sessionStorage.name;
      function buttonOnClick() {
        location.href = "gallery.php";
      }

      //document.write('<img src="<?php echo $_POST['thumb'];?>"/>');

    </script>
  </body>
</html>
