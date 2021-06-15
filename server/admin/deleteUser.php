<?php
    if($_POST != array()) {
        require_once "../../connection.php";
        $idUser = $_POST['iduser'];

        $sql = "DELETE FROM `user` WHERE `id` = '$idUser'";
        if ($connectDatabase->query($sql)) {
            echo 'Người dùng đã bị xóa';
        } else {
            echo 'Xóa thất bại';
        }
        $connectDatabase->close();
    }
?>