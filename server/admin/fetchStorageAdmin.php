<?php
    if ($_GET !== array()) {
        require_once "../../connection.php";
        $role = $_GET['role'];
        if ($role) {
            $sql =  "SELECT `post`.`idpost`, `bookname`, `author`, `posttime`, `user`.`fullname` AS `fullnamepost`, `user2`.`fullname`, `loan`.`idusertake`".
                    "FROM `post` ".
                    "INNER JOIN `user` ON `post`.`iduser` = `user`.`id`".
                    "INNER JOIN `book` ON `post`.`idbook` = `book`.`idbook` ".
                    "LEFT JOIN `loan` ON `post`.`idpost` = `loan`.`idpost` ".
                    "LEFT JOIN `user` `user2` ON `loan`.`idusertake` = `user2`.`id`".
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
    }
?>