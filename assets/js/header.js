// scripts for all pages have header

//* Header Sticky
// window.onscroll = function() {headerSticky()};
var headerMenu = document.getElementById("header-menu");
var sticky = headerMenu.offsetTop;

function headerSticky() {
    if (window.pageYOffset > sticky) {
        headerMenu.classList.add("sticky");
    } else {
        headerMenu.classList.remove("sticky");
    }
}

// * Modal
// mở modal
function openModal() {
    document.getElementById("modal").style.display = "flex";
}
// module.export
// *****************Trường Hợp có điều kiện
// mở form đăng ký
function onpenSignUp() {
    document.getElementById("sign-up").style.display = "block";
}
// mở form đăng nhập
function openLogIn() {
    document.getElementById("log-in").style.display = "block";
}
// mở book form 
function openBookForm() {
    document.getElementById("book-form").style.display = "block";
}
// mở chi tiết sản phẩm
function openProductDetail() {
    document.getElementById("product-detail").style.display = "block";
}
function closeProductDetail() {
    document.getElementById("product-detail").style.display = "";
}
// đóng modal
function closeModal() {
    document.getElementById("modal").style.display = "";
    document.getElementById("sign-up").style.display = "";
    document.getElementById("log-in").style.display = "";
    document.getElementById("book-form").style.display = "";
    document.getElementById("product-detail").style.display = "";
    clearInterval(productDetailControlTimer);
}
