<?php
    if ($_GET != array()) {
        $role = $_GET['role'];

        if ($role == '1') {
            require_once "../../connection.php";
            $sql = "SELECT `id`, `fullname`, `gender`, `phone`, `gmail`, `role` FROM `user` WHERE 1";
            $result = $connectDatabase->query($sql);
            if ($result->num_rows>0) {
                $arrayObject = array();
                for ($i = 0; $i < $result->num_rows; $i++) {
                    array_push($arrayObject, $result->fetch_assoc());
                }
                echo json_encode($arrayObject);
            }
            $connectDatabase->close();
        }
    }
?>