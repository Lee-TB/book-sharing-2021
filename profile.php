<?php require_once "connection.php"; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chia Sẻ Sách | Trang cá nhân</title>
  <link rel="shortcut icon" href="../assets/images/logoChiaSeSach.png" type="image/x-icon">
  <script src="https://kit.fontawesome.com/bac5106e3c.js" crossorigin="anonymous"></script>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">    
  <link rel="stylesheet" href="./assets/css/base.css">
  <link rel="stylesheet" href="./assets/css/layout.css">
  <link rel="stylesheet" href="./assets/css/components.css">
  <link rel="stylesheet" href="./assets/css/pages.css">
  <script src="./assets/js/myLibrary.js"></script>
  <script>
    if (getCookie('id') == '') {
      location.href = 'index.php'
    }
  </script>
</head>
<body>
  <!-- Modal, đăng ký, đăng nhập "modal không tách rời khỏi phần header"-->
  <div id="modal">
    <div class="overlay"></div>
    <div class="modal-inner">

      <div class="close-modal" onclick="closeModal();"><i class="fas fa-times close-modal-icon"></i></div>
      <?php include_once "./layouts/bookform.php";?>
      <div id="product-detail">

      </div>

    </div>
  </div>

  <!-- nút về đầu trang -->
  <button onclick="scrollToTop()" id="to-top" class="btn" title="Về đầu trang"><i class="fas fa-arrow-up to-top-icon"></i></button>

  <!-- phần header -->
  <?php include_once "./layouts/header.php";?>

  <section id="wrapper">
    <div class="wrap-container">
      <div class="container">
        <div class="row">
          <div class="col-2">
            <div class="tab">
              <button class="tab__links button-of-profile" onclick="openTab('profile')">Thông tin cá nhân</button>
              <button class="tab__links button-of-storage" onclick="openTab('storage')">Kho sách của tui</button>
              <button class="tab__links button-of-borrowed" onclick="openTab('borrowed')">Sách tui đã mượn</button>
            </div>
          </div>
          <div class="col-10">
            <div id="profile" class="tab-content">
              <div class="profile-title">Thông tin tài khoản</div>
              <?php require_once "layouts/fetchDataUser.php"?>
              <div id="profile-info">
                <div class="profile-info__form-group">
                  <label for="profile-info__fullname" class="profile-info__label">Họ tên</label>
                  <input type="text" id="profile-info__fullname" value="<?php echo $dataUser['fullname'];?>">
                </div>

                <div class="profile-info__form-group">
                  <label class="profile-info__label">Giới tính</label>

                  <div class="gender">
                      <input type="radio" id="male" name="gender" value="Nam">
                      <label for="male">Nam</label>
                  </div>

                  <div class="gender">
                      <input type="radio" id="female" name="gender" value="Nữ">
                      <label for="female">Nữ</label>
                  </div>

                  <div class="gender">
                      <input type="radio" id="other" name="gender" value="Khác">
                      <label for="other">Khác</label>
                  </div>
                </div>

                <div class="profile-info__form-group">
                  <label for="profile-info__phone" class="profile-info__label">Số điện thoại</label>
                  <input type="text" id="profile-info__phone" value="<?php echo $dataUser['phone'];?>">
                </div>

                <div class="profile-info__form-group">
                  <label for="profile-info__gmail" class="profile-info__label">Gmail</label>
                  <input type="text" id="profile-info__gmail" value="<?php echo $dataUser['gmail'];?>">
                </div>
                
                <div class="profile-info__form-group" style="justify-content: flex-end;">
                  <button id="profile-info__update-button" class="my-btn my-btn--warning my-btn-xl" onclick="updateProfile()">Cập nhật</button>
                </div>

                <div class="profile-info__form-group">
                  <div id="profile-info__update-message">
                  </div>
                </div>
              </div>
            </div>
    
            <div id="storage" class="tab-content">
              <div class="storage-title">Kho sách của tui</div>

              <div class="storage-container">
                <table>
                  <thead>
                    <tr>
                      <th>Tên sách</th>
                      <th>Tác giả</th>
                      <th>Đăng lúc</th>
                      <th>Người mượn</th>
                      <th>Xóa</th>
                    </tr>
                  </thead>
                  <tbody>

                  </tbody>
                </table>
              </div>
            </div>

            <div id="borrowed" class="tab-content">
              <div class="borrowed-title">Sách tui đã mượn</div>

              <div class="borrowed-container">
                <table>
                  <thead>
                    <tr>
                      <th>Tên sách</th>
                      <th>Tác giả</th>
                      <th>Đăng lúc</th>
                      <th>Người đăng</th>
                      <th>Trả lại</th>
                    </tr>
                  </thead>
                  <tbody>

                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>

  <?php include_once "layouts/footer.php";?> 
  
  <script src="./assets/js/header.js"></script>
  <script src="./assets/js/profile.js"></script>
  <script src="./assets/js/form.js"></script>
  <script src="./assets/js/validator.js"></script>
  <script src="./assets/js/checkUser.js"></script>
  <script src="./assets/js/app.js"></script>
  <script>
      fetchDataStorage(getCookie('id'))// call when page load
      fetchDataBorrowerStorage(getCookie('id'))// call when page load
      Validator("#book-form");
      var genderValue = '<?php echo $dataUser['gender'];?>'
      for (let radio of document.getElementsByName('gender')) {
        if (radio.value == genderValue) {
          radio.checked = true
        }
      }
  </script>
</body>
</html>
<?php $connectDatabase->close(); ?>
