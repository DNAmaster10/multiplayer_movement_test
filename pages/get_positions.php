<?php
    session_start();
    include "$_SERVER["DOCUMENTT_ROOT"]/php/dbh.php";
    $sql = "SELECT player_x,player_y FROM player_positions WHERE online=1";
    $raw result = mysqli_query($conn, $sql);
    if ($raw_resut -> num_rows > 0 {
        while ($row = mysqli_fetch_array($raw_result)) {
            echo ("$row["player_x"],$row["player_y"].");
        }
    }
?>
