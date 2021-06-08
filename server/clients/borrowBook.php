<?php
    if (isset($_GET)) {
        $idpost = $_GET['idpost'];
        $idusertake = $_GET['idusertake'];
        $loanterm = $_GET['loanterm'];
        $date = date_create(date("Y-m-d H:i:s"));
        date_timezone_set($date, timezone_open("Asia/Ho_Chi_Minh"));
        $loantime = date_format($date,"Y-m-d H:i:s");

        require_once "../../connection.php";
        $sql = "INSERT INTO `loan`(`idpost`, `idusertake`, `loantime`, `loanterm`) VALUES ('$idpost', '$idusertake', '$loantime', '$loanterm')";
        if ($connectDatabase->query($sql)) {
            echo "1"; // Thêm vào csdl thành công -> mượn thành công
        } else {
            echo "0"; // Thất bại
        }

    }
?>