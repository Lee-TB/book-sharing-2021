<?php
require_once "../../vendor/autoload.php";
require_once "../../cloud_config.php";
use Cloudinary\Api\Upload\UploadApi;

// nếu $_POST tồn tại
if ($_POST !== array()) {

    // Nếu người dùng có nhập ảnh thi upload ảnh của người dùng lên cloudinary
    $fileName = pathinfo($_FILES['avatar']['name'], PATHINFO_FILENAME);
    if ($fileName !== "") {
        // Upload ảnh lên cloudinary
        $uploadOk = true;

        // Check if image file is a actual image or fake image
        if(isset($_POST)) {
            $check = getimagesize($_FILES["avatar"]["tmp_name"]);
            if($check !== false) {
            echo "File is an image - " . $check["mime"] . ".";
            $uploadOk = true;
            } else {
            echo "File is not an image.";
            $uploadOk = false;
            }
            echo "<br>";
        }

        // kiểm tra file có phải là ảnh (4 loại: jpg png jpeg gif)
        $fileType = strtolower(pathinfo($_FILES['avatar']['name'],PATHINFO_EXTENSION));
        if($fileType != "jpg" && $fileType != "png" 
        && $fileType != "jpeg" && $fileType != "gif" ) {
            echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.<br>";
            $uploadOk = false;
        }

        // Upload file lên cloudinary và vào thu muc ChiaSeSach/User
        if ($uploadOk) {
            $uploadResponse = (new UploadApi())->upload($_FILES['avatar']['tmp_name'],
                [   
                // "public_id" => $fileName,
                'folder' => 'ChiaSeSach/User'
                ]
            );
            //trả về địa chỉ ảnh
            $urlImage = $uploadResponse["secure_url"];
        }
        echo '<img src="'.$urlImage.'" alt="" width="300"><br>';
        echo $urlImage.'<br><hr>';
    }

    /********Đưa thông tin người dùng lên cở sở dữ liệu MySQL */
    // chuẩn bị thông tin từ $_POST
    $userName = $_POST['user-name'];
    $password = md5($_POST['password']);
    $fullName = $_POST['full-name'];
    $avatar = isset($urlImage) ? $urlImage : "NULL";
    $gender = isset($_POST['gender']) ? $_POST['gender'] : "NULL";
    $phone    = $_POST['phone'];
    $gmail    = $_POST['gmail'];

    require_once "../../connection.php"; //Kết nối với database
    $sql = "INSERT INTO `user`(`username`, `password`, `fullname`, `avatar`, `gender`, `phone`, `gmail`) VALUES ('$userName','$password','$fullName','$avatar','$gender','$phone','$gmail')";
    if ($connectDatabase->query($sql) === TRUE) {
        echo "New record created successfully";
        setcookie('signuped', "true", time() + 1, '/');
    } else {
        echo "Error: " . $sql . "<br>" . $connectDatabase->error;
        setcookie('signuped', "false", time() + 1, '/');
    }
    
    header("location: ../../index.php");
}
?>

