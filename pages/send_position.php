<?php
    session_start();
    include $_SERVER["DOCUMENT_ROOT"]."/php/dbh.php";
    $player_y = $conn -> real_escape_string($_GET["player_y"]);
    $player_y = intval($player_y);
    $player_x = $conn -> real_escape_string($_GET["player_x"]);
    $player_x = intval($player_x);
    $time = time();
    $sql = "UPDATE player_positions SET last_update=".$time.",player_x=".$player_x.",player_y=".$player_y." WHERE player='".$_SESSION["username"]."';";
    mysqli_query ($conn, $sql) or die (mysqli_error($conn));
?>
