<?php
    session_start();
    if (!isset($file_path)) {
        $file_path = $_SERVER["DOCUMMENT_ROOT"];
    }
    $table_name = "users";
    $column_name = "user";
    $where_column = "user";
    $where_value = $_SESSION["username"];
    include $file_path."/php/get_single.php";
    if ($result == "null") {
        header ("location: /pages/session_expired.php");
    }
?>
