<?php
// Input
// nếu $_POST tồn tại
if ($_POST !== array()) {

    if (isset($_POST['user-name'])) $username = $_POST['user-name'];
    if (isset($_POST['password'])) $password = MD5($_POST['password']);
    require_once "../../connection.php";
    $sql = "SELECT * FROM `user` WHERE `username` = '$username' AND `password` = '$password'";
    $result = $connectDatabase->query($sql);
    if($result->num_rows != 0) {
        $data = $result->fetch_assoc();
        setcookie('id', $data['id'], time() + 3600, '/');
        setcookie('logged', "true", time() + 1, '/');
    } else {
        setcookie('logged', "false", time() + 1, '/');
    }
    
    header("location: ../../index.php");
}
