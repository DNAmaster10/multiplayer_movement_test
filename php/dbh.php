<?php
    $dbServername = "localhost";
    $dbUsername = "SAMSi_main";
    $dbPassword = "samsi";
    $dbName = "multiplayer_game_test";
    $conn = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbName);
    if (mysqli_connect_errno())
    {
        echo "Failed to connect to MySQLi: " . mysqli_connect_error();
    }
?>
