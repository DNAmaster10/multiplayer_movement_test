<?php
    session_start();
    $file_path = $_SERVER["DOCUMENT_ROOT"];
    include "$file_path/php/dbh.php";
    $username = $conn -> real_escape_string($_POST["username"]);
    $table_name = "users";
    $column_name = "user";
    $where_column = "user";
    $where_value = $username;
    include "$file_path/get_single.php";
    if (!$result == "null") {
        $_SESSION["error_message"] = "That account already exists!";
        header ("location: ./register.php");
    }
    else {
        $sql = "INSERT INTO users (user) VALUES ($username);";
        mysqli_query ($conn, $sql);
        $_SESSION["username"] = $username;
        unset($_SESSION["error_message"]);
        header ("location: /pages/game.php");
    }
?>