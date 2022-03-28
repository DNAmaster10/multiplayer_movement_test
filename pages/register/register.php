<?php
    session_start();
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Register</title>
    </head>
    <body>
        <form action="./register_submit.php" method="POST">
            <input type="text" name="username" placeholder="username">
            <input type="submit" value="Register">
        </form>
        <p><?php if (isset($_SESSION["error_message"])) {echo $_SESSION["error_message"];} ?></p>
    </body>
</html>
