//Làm những hành vi khi người dùng đã đăng nhập
//ham getCookie() được định nghĩa trong myLibrary.js

//Nếu đăng nhập thành công
if (getCookie('id') !== '') {
  var userDropDownItems = document.querySelectorAll('.user-drop-down_item');
  var loggedItems = document.querySelectorAll('.logged');
  for (let item of userDropDownItems) {
    item.style.display = 'none';
  }
  for (let item of loggedItems) {
    item.style.display = 'list-item';
  }
} else {
  var userDropDownItems = document.querySelectorAll('.user-drop-down_item');
  var loggedItems = document.querySelectorAll('.logged');
  for (let item of userDropDownItems) {
    item.style.display = '';
  }
  for (let item of loggedItems) {
    item.style.display = '';
  }
}
// Nếu là admin
var isAdminItem = document.querySelector('.isAdmin');
if (getCookie('role') == true) {
  isAdminItem.style.display = 'list-item'
} else {
  isAdminItem.style.display = 'none'
}

//CHECK dang ky thanh cong
if(getCookie('signuped') === 'true') {
  alert('Đăng ký thành công');
} else if(getCookie('signuped') === 'false') {
  alert('Đăng ký thất bại');
}

// console.log(getCookie('logged'));
// console.log(getCookie('logged') === 'true');
// console.log(getCookie('logged') === 'false');

//CHECK dang nhap thanh cong
if(getCookie('logged') === 'true') {
  alert('Đăng nhập thành công');
} else if(getCookie('logged') === 'false') {
  alert('Sai tài khoản hoặc mật khẩu');
}


/***Thêm sách */
// check nếu người dùng đã đăng nhập 
// thì khi nhấn nút thêm sách mới hiện ra form
// ngược lại thì hiện lên khung đăng nhập
var addBookBtn = document.querySelector('.add-book-button');
if(getCookie('id') !== '') {
  addBookBtn.onclick = function() {
    openModal(); 
    openBookForm();
  }
} else {
  addBookBtn.onclick = function () {
    if(confirm('Vui lòng đăng nhập để thêm sách')) {
      openModal(); 
      openLogIn(); 
    }
  }
}
//message nếu người dùng thêm sách thành công
if(getCookie('added-book') === 'true') {
  alert('Thêm sách thành công');
} else if(getCookie('added-book') === 'false') {
  alert('Thêm sách thất bại');
}