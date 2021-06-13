<?php
    if ($_GET != array()) {
        require_once "../../connection.php";
        $idUser = $_GET['idusertake'];
        $sql = "SELECT `fullname`, `gender`, `phone`, `gmail` FROM `user` WHERE `id` = '$idUser'";
        $result = $connectDatabase->query($sql);
        if ($result->num_rows > 0) {
            $data = $result->fetch_assoc();
            echo json_encode($data);
        }
        $connectDatabase->close();
    }
?>