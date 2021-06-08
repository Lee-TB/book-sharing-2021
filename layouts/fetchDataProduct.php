<?php
    // **xuat ra
    $sql =  "SELECT `idpost`, `bookname`, `fullname`, `posttime`, `iduser`, `photo` ".
            "FROM `post` ".
                "INNER JOIN `user` ON `post`.`iduser` = `user`.`id` ".
                "INNER JOIN `book` ON `post`.`idbook` = `book`.`idbook` ".
            "ORDER BY `bookname`";
    $resultProduct = $connectDatabase->query($sql);
?>