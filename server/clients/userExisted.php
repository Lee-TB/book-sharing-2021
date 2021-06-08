<?php
    $userName = $_GET['user-name'];
    require_once "../../connection.php";
    $sql = "SELECT * FROM `user` WHERE `username` = '$userName'";
    $result = $connectDatabase->query($sql);

    if($result->num_rows != 0)
    {
        echo "Tên đăng nhập đã tồn tại";
    } else {
        echo "";
    }
    $connectDatabase->close();
?>

