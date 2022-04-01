<?php
    session_start();
    $file_path = $_SERVER["DOCUMENT_ROOT"];
    include "$file_path/php/dbh.php";
    $time = time();
    $new_time = $time - 5;
    $username = $_SESSION["username"];
    $sql = "SELECT player_x,player_y FROM player_positions WHERE player!='".$username."' AND last_update >= ".$new_time."";
    $raw_result = mysqli_query($conn, $sql) or die (mysqli_error($conn));
    if ($raw_result -> num_rows > 0) {
        while ($row = mysqli_fetch_array($raw_result)) {
            echo ($row["player_x"].",".$row["player_y"].".");
        }
    }
    else {
        echo ("404");
    }
?>
