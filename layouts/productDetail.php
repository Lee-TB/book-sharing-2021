<?php
    if(isset($_GET)) {
        $idpost = $_GET['idpost'];
        require_once "../connection.php";

        //Tạo một associative array lưu dữ liệu để chuyển thành json
        $assocArray = array();

        //SELECT xem idpost có tồn tại trong bảng loan hay chưa
        $sql = "SELECT * FROM `loan` WHERE `idpost` = '$idpost'";
        $result = $connectDatabase->query($sql);
        if ($result->num_rows != 0) {
            //đưa ra  thời gian trả
            $dataLoan = $result->fetch_assoc();
            $loanTime = $dataLoan['loantime'];
            $loanTerm = $dataLoan['loanterm'];
            $borrowed = true;
            $assocArray['loantime'] = $loanTime;
            $assocArray['loanterm'] = $loanTerm;
            $assocArray['borrowed'] = $borrowed;
        } else {
            $borrowed = false;
            $assocArray['borrowed'] = $borrowed;
        }

        // SELECT thông tin trong bảng post trước
        $sql = "SELECT * FROM `post` WHERE `idpost` = '$idpost'";
        $result = $connectDatabase->query($sql);
        if ($result->num_rows != 0) {
            $dataPost = $result->fetch_assoc();
            $idUser = $dataPost['iduser'];
            $idBook = $dataPost['idbook'];
            $postTime = $dataPost['posttime'];
            $optionLoan =  $dataPost['optionloan'];
        }

        // SELECT thông tin trong bảng book
        $sql = "SELECT * FROM `book` WHERE `idbook` = '$idBook'";
        $result = $connectDatabase->query($sql);
        if ($result->num_rows != 0) {
            $dataBook = $result->fetch_assoc();
            $bookName = $dataBook['bookname'];
            $author = $dataBook['author'];
            $isbn = $dataBook['isbn'];
            $photo = $dataBook['photo'];
            $publisher = $dataBook['publisher'];
            $publishYear = $dataBook['year'];
            $typeName = $dataBook['typename'];
        }

        // SELECT thông tin trong bảng book
        $sql = "SELECT `fullname` FROM `user` WHERE `id` = '$idUser'";
        $result = $connectDatabase->query($sql);
        if ($result->num_rows != 0) {
            $dataUser = $result->fetch_assoc();
            $fullName = $dataUser['fullname'];
        }

        // Đóng gói Json và gửi lại
        $json = json_encode(array_merge($assocArray, array('photo'=>$photo, 'bookname'=>$bookName, 'author'=>$author, 'publisher'=>$publisher,
        'year'=>$publishYear, 'typename'=>$typeName, 'isbn'=>$isbn, 'fullname'=>$fullName, 'posttime'=>$postTime, 'optionloan'=>$optionLoan)));
        echo $json;
        $connectDatabase->close();
    }
?>
