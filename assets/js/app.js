// Script for app.php(trang chủ) 

//* về đầu trang
// window.onscroll = function() {scrollToTopAppear()};
function scrollToTopAppear() {
    if(document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
        document.getElementById("to-top").style.display = "inline-block";
    } else {
        document.getElementById("to-top").style.display = "";
    }
}

// <!-- nút về đầu trang -->
function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//header sticky và làm nút về đầu trong xuất hiện
window.onscroll = function() {scrollToTopAppear(); headerSticky();};

/**Thể loại theo select option */
var typeNames = ['giáo trình', 'tài liệu tham khảo', 'truyện tranh', 'lập trình', 'tiểu thuyết', 'chính trị', 'pháp luật', 'khoa học công nghệ', 'kinh tế', 'văn học nghệ thuật', 'văn hóa xã hội', 'lịch sử', 'tâm lý', 'sách thiếu nhi'];
typeNames.sort()
for (text of typeNames) {
    var selectElement = document.getElementById('typename');
    var optionNode = document.createElement('option');
    optionNode.innerText = text;
    optionNode.setAttribute('value', text);
    selectElement.appendChild(optionNode)
}
