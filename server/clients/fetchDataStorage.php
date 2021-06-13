<?php
    if ($_GET !== array()) {
        require_once "../../connection.php";
        $iduser = $_GET['iduser'];

        $sql =  "SELECT `post`.`idpost`, `bookname`, `author`, `posttime`, `fullname`".
                "FROM `post` ".
                "INNER JOIN `book` ON `post`.`idbook` = `book`.`idbook` ".
                "LEFT JOIN `loan` ON `post`.`idpost` = `loan`.`idpost` ".
                "LEFT JOIN `user` ON `user`.`id` = `loan`.`idusertake`".
                "WHERE `iduser` = '$iduser'".
                "ORDER BY `posttime` DESC";
        $result = $connectDatabase->query($sql);
        $data = array();
        if ($result->num_rows > 0) {
            for ($i=0; $i<$result->num_rows; $i++) {
                array_push($data, $result->fetch_assoc());
            }
        }
        echo json_encode($data);
        $connectDatabase->close();
    }
?>