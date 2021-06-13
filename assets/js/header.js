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
    if (typeof productDetailTimeout !== 'undefined') {
        clearTimeout(productDetailTimeout);
    }
    if (typeof productDetailInterval !== 'undefined') {
        clearInterval(productDetailInterval);
    }
}

function linkToPageAndOpenTab(event, idContent) {
    if (location.pathname.indexOf('profile.php') == -1) {
        location.href = 'profile.php?idcontent='+idContent;
    }
    //openTab function only run on profile.php
    openTab(event, idContent)
}

function openTabDefault() {
    if (location.pathname.indexOf('profile.php') != -1) {
        var url_string = location.href
        var url = new URL(url_string);
        var idContent = url.searchParams.get('idcontent');
        
        document.getElementById(idContent).style.display = 'block'
        if (document.getElementById(idContent).style.display == 'block') {
            for (let item of document.getElementsByClassName('tab__links')) {
                if (item.classList[1] != undefined) {
                    if (item.classList[1].indexOf(idContent) != -1) {
                        item.classList.add(item.classList[0]+'--active')
                    }
                }
            }
        }
    }
}
openTabDefault()