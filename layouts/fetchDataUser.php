<?php
// xuat ra
if(isset($_COOKIE['id'])) {
    $id = $_COOKIE['id'];
    $sql = "SELECT * FROM `user` WHERE `id` = '$id'";
    $result = $connectDatabase->query($sql);
    if($result->num_rows != 0) {
        $dataUser = $result->fetch_assoc();
    }
}
?>