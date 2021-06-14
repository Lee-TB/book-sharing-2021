<?php
require_once "../../vendor/autoload.php";
require_once "../../cloud_config.php";
use Cloudinary\Api\Upload\UploadApi;
// Nếu người dùng đã đăng nhập và có thêm sách 
if(isset($_COOKIE['id']) && $_POST !== array() && $_FILES !== array()) {
     /***Đưa thông tin SÁCH lên cở sở dữ liệu MySQL và ảnh lên Cloudinary */
    // Chuẩn bị thông tin từ $_POST
    var_dump ($_POST);
    echo "<hr>";
    $isbn = str_replace("-", "", $_POST['isbn']);
    $bookName = str_replace("'", "\'", $_POST['bookname']);
    $author = str_replace("'", "\'", $_POST['bookname']);
    $publisher = str_replace("'", "\'", $_POST['bookname']);
    $year = $_POST['year']; // number
    $typename = $_POST['typename']; //select option
    if(isset($_POST['optionloan'])) { // radio
        $optionLoan = join(',', $_POST['optionloan']);
    }
    echo $isbn;
    echo "<hr>";
    echo $bookName; 
    echo "<hr>";
    echo $author;
    echo "<hr>";
    echo $publisher;
    echo "<hr>";
    echo $year;
    echo "<hr>";
    echo $typename;
    echo "<hr>";
    echo $optionLoan;
    echo "<hr>";
    /**Kiểm tra và đưa ảnh lên Cloudinary */
    $uploadOk = true;

    // Check if image file is a actual image or fake image
    $check = getimagesize($_FILES["photo"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = true;
    } else {
        echo "File is not an image.";
        $uploadOk = false;
    }
    echo "<hr>";

    /*** kiểm tra file có phải là ảnh (4 loại: jpg png jpeg gif) */
    $fileType = strtolower(pathinfo($_FILES['photo']['name'],PATHINFO_EXTENSION));
    if($fileType != "jpg" && $fileType != "png" 
    && $fileType != "jpeg" && $fileType != "gif" ) {
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.<hr>";
        $uploadOk = false;
    }
    var_dump($_FILES);
    echo "<hr>";

    /**--> Upload file lên cloudinary và vào thu muc ChiaSeSach/Book*/
    if ($uploadOk) {
        $uploadResponse = (new UploadApi())->upload($_FILES['photo']['tmp_name'],
            [
            // 'public_id'=> $isbn,
            'folder' => 'ChiaSeSach/Book'
            ]
        );
        //trả về địa chỉ ảnh
        $urlImage = $uploadResponse["secure_url"];
    }
    //echo '<img src="'.$urlImage.'" alt="" width="300"><br>';
    echo $urlImage.'<br><hr>';
    var_dump($uploadResponse);

    /**Tạo đối tượng thời gian và set timezone */
    echo "<hr>";
    $date = date_create(date("Y-m-d H:i:s"));
    date_timezone_set($date, timezone_open("Asia/Ho_Chi_Minh"));
    $date = date_format($date,"Y-m-d H:i:s");
    var_dump($date); echo '<hr>';

/**Thêm dữ liệu vào MySQL */
    require_once "../../connection.php";
    // //**Thêm vào bảng book
    $sql = "INSERT INTO `book`(`isbn`, `bookname`, `author`, `photo`, `publisher`, `year`, `typename`) VALUES ('$isbn','$bookName','$author','$urlImage','$publisher','$year','$typename')";
    if ($connectDatabase->query($sql) === TRUE) {
        echo "New record created successfully<hr>";
    } else {
        echo "Lỗi: " . $sql . "<br>" . $connectDatabase->error;
    }

    //lấy idbook từ bảng book vừa insert
    $sql = "SELECT `idbook` FROM `book` WHERE `idbook` IN (SELECT MAX(`idbook`) AS `newid` FROM `book`)";
    $result = $connectDatabase->query($sql);
    if($result->num_rows != 0) {
        $dataBook = $result->fetch_assoc();
        $idBook = $dataBook['idbook'];
    }
    echo 'idbook = '.$idBook;

    //** */ lấy iduser đang đăng nhập
    echo '<hr>';
    $idUser = $_COOKIE['id'];
    echo 'iduser = '.$idUser;
    echo '<hr>';

    //** */ INSERT thông tin vào post
    $sql = "INSERT INTO `post`(`iduser`, `idbook`, `posttime`, `optionloan`) VALUES ('$idUser','$idBook','$date', '$optionLoan')";
    if ($connectDatabase->query($sql) === TRUE) {
        echo "New record created successfully<hr>";
        setcookie('added-book', "true", time() + 1, '/');
    } else {
        echo "Error: " . $sql . "<br>" . $connectDatabase->error;
        setcookie('added-book', "false", time() + 1, '/');
    }

    echo $pageCall;
    header("location: ../..".$pageCall);
} else {
    echo 'Lỗi!! Có thể bạn chưa đăng nhập hoặc Biến siêu toàn cục files và post không có thông tin';
}

