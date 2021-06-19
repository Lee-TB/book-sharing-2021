<?php
    if ($_POST != array()) {
        require_once "../../connection.php";
        $idpost = $_POST['idpost'];
        $sql = "DELETE FROM `loan` WHERE `idpost` = '$idpost'";
        if ($connectDatabase->query($sql)) {
            echo 'Đã trả lại sách';
        } else {
            echo 'Trả sách thất bại';
        }
        $connectDatabase->close();
    }
?>