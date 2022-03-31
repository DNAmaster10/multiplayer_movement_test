<?php
    session_start();
    include "$_SERVER["DOCUMEENT_ROOT"]/php/dbh.php";
    $player_y = $conn -> real_escape_string($_GET["player_y"]);
    $player_x = $conn -> real_escape_string($_GET["player_x"]);
    $time = time();
    $sql = "UPDATE player_positions SET player_x=$player_x,player_y=$player_y,last_update=$time WHERE player=$_SESSION["username"];";
    mysqli_query ($conn, $sql);
?>
