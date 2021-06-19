<?php
    if ($_GET != array()) {
        require_once "../../connection.php";
        $iduser = $_GET['idusertake'];

        $sql =  "".
        "SELECT `post`.`idpost`, `post`.`iduser`, `bookname`, `author`, `posttime`, `user`.`fullname`, `loan`.`idusertake`".
        "FROM `post`".
        "INNER JOIN `loan` ON `post`.`idpost` = `loan`.`idpost`".
        "INNER JOIN `book` ON `post`.`idbook` = `book`.`idbook`".
        "INNER JOIN `user` ON `post`.`iduser` = `user`.`id`".
        "WHERE `loan`.`idusertake` = '$iduser'".
        "ORDER BY `loantime` DESC";

        $result = $connectDatabase->query($sql);
        $data = array();
        if ($result->num_rows > 0) {
            for ($i = 0; $i < $result->num_rows; $i++) {
                array_push($data, $result->fetch_assoc());
            }
        }
        
        echo json_encode($data);
        $connectDatabase->close();
    }
?>