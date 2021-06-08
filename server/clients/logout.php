<?php
    if(isset($_COOKIE['id'])) {
        setcookie('id', $data['id'], time() - 3600, '/');
    } 
    header("location: ../../index.php");
?>