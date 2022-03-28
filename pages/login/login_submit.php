<?php
    session_start();
    $file_path = $_SERVER["DOCUMENTT_ROOT"];
    include $file_path."/php/dbh.php";
    $username = $conn -> real_escape_string ($_POST["username"]);
    $table_name = "users";
    $column_name = "user";
    $where_column = "user";
    $where_value = $username;
    include "$file_path/get_single.php";
    if ($result == "null") {
        $_SESSION["error_message"] = "User $username not found.";
        header ("location: /pages/login.php");
    }
    else {
        $_SESSION["username"] = $username;
        header ("location: /pages/main.php");
    }
?>
