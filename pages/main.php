<?php
    session_start();
    $file_path = $_SERVER["DOCUMENT_ROOT"];
    //include "$file_path/php/check_login.php";
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Main</title>
    </head>
    <body>
        <canvas id="main_game_canvas" width="1000" height="1000" style="border:2px solid #000000;">
        </canvas>
        <button value="move down" onclick="move_down()">move down</button>
    </body>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="/pages/scripts/main.js"></script>
</html>
