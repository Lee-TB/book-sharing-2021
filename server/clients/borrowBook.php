<?php
    if (isset($_GET)) {
        
        $idpost = $_GET['idpost'];
        $idusertake = $_GET['idusertake'];
        $loanterm = $_GET['loanterm'];
        $date = date_create(date("Y-m-d H:i:s"));
        date_timezone_set($date, timezone_open("Asia/Ho_Chi_Minh"));
        $loantime = date_format($date,"Y-m-d H:i:s");

        $assocArray = array();

        require_once "../../connection.php";
        $sql = "INSERT INTO `loan`(`idpost`, `idusertake`, `loantime`, `loanterm`) VALUES ('$idpost', '$idusertake', '$loantime', '$loanterm')";
        if ($connectDatabase->query($sql)) {
            // Thêm vào csdl thành công -> mượn thành công
            $assocArray['loanterm'] = $loanterm;
            $assocArray['loantime'] = $loantime;
            $assocArray['borrowed'] = 1;
            $json = json_encode($assocArray);
            echo $json;
        } else {
            // Thất bại
            $assocArray['borrowed'] = 0;
            $json = json_encode($assocArray);
            echo $json;
        }

    }
?>