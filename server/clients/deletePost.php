<?php
    if ($_POST != array()) {
        $idPost = $_POST['idpost'];
        require_once "../../connection.php";
        $sql = "DELETE `post`, `book` FROM `post` INNER JOIN `book` ON `post`.`idbook` = `book`.`idbook` WHERE `idpost` = $idPost";
        if ($connectDatabase->query($sql)) {
            echo 'Sách đã bị xóa';
        } else {
            $sqlLoan = "SELECT `idloan` FROM `loan` WHERE `idpost` = $idPost";
            $result = $connectDatabase->query($sqlLoan);
            if ($result->num_rows > 0) {
                echo 'Không thể xóa sách đang có người mượn';
            } else {
                echo 'Xóa thất bại';
            }
        }
        $connectDatabase->close();
    }
?>