<?php
    if ($_POST !== array()) {
        require_once "../../connection.php";
        $iduser = $_POST['iduser'];
        $fullname = $_POST['fullname'];
        $gender = $_POST['gender'];
        $phone = $_POST['phone'];
        $gmail = $_POST['gmail'];

        $sql = "UPDATE `user` SET `fullname`='$fullname', `gender`='$gender',`phone`='$phone',`gmail`='$gmail' WHERE `id`='$iduser'";
        if ($connectDatabase->query($sql)) {
            echo 'Thông tin tài khoản của bạn đã được cập nhật.';
        }

        $connectDatabase->close();
    }
?>