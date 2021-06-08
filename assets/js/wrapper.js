/***filter */
function newSortButton() {
    var productItemElement = document.querySelectorAll('.product-item');
    // console.log(productItemElement);
}

function filterInput (event) {
    var filter = event.value;
    var productItems = document.querySelectorAll('.product-item');

    for (item of productItems) {
        var productItemNames = item.querySelector('.product-item__name');
        var textValue = productItemNames.textContent || productItemNames.innerText;

        if (textValue.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
            item.parentElement.style.display = "";
        } else {
            item.parentElement.style.display = "none";
        }
    }
}

/***Main content */
var productItems = document.querySelectorAll('.product-item')
for (let item of productItems) {
    item.onclick = function () {//function call AJAX
        var idPost = parseInt(item.id);
        var xmlhttp;
        if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
        } else { // code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        
        var productDetailElement = document.getElementById("product-detail");
        xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                var myJson = xmlhttp.responseText;
                var dataProduct = JSON.parse(myJson);
                                
                productDetailElement.innerHTML = ''+
                '<div class="product-detail__borrowed">'+
                    '<span>Đang được mượn</span>'+
                '</div>'+
                '<div class="row">'+
                    '<div class="col-4">'+
                        '<div class="product-detail__img" style="background-image: url('+ dataProduct['photo'] +');"></div>'+
                    '</div>'+
                    '<div class="col-8">'+
                        '<h3 class="product-detail__heading">'+ dataProduct['bookname'] +'</h3>'+
                        '<h6 class="product-detail__sub-heading">'+ dataProduct['author'] +'</h6>'+
                        '<hr>'+
                        '<p class="product-detail__content"><strong>Nhà xuất bản :</strong> '+ dataProduct['publisher'] +'</p>'+
                        '<p class="product-detail__content"><strong>Năm xuất bản :</strong> '+ dataProduct['year'] +'</p>'+
                        '<p class="product-detail__content"><strong>Thể loại :</strong> '+ dataProduct['typename'] +'</p>'+
                        '<p class="product-detail__content"><strong>ISBN :</strong> '+ dataProduct['isbn'] +'</p>'+
                        '<p class="product-detail__content"><strong>Người đăng :</strong> '+ dataProduct['fullname'] +'</p>'+
                        '<p class="product-detail__content"><strong>Được đăng lúc :</strong> '+ dataProduct['posttime'] +'</p>'+

                        '<div class="product-detail__control">'+
                            '<div class="product-detail__control-group">'+
                                'Bạn muốn mượn trong bao lâu ?'+
                            '</div>'+

                            '<div class="product-detail__control-group" id="product-detail__control-group-btn">'+
                              
                            '</div>'+
                            
                            '<div class="product-detail__control-group">'+
                                '<button id="borrow-submit" class="my-btn my-btn-primary my-btn-primary--hover my-btn-xl">Mượn</button>'+
                            '</div>'+

                            '<div class="product-detail__control-timer">'+
                                '<label>Trả lại sau: </label><br>'+
                                '<span class="timer">6 ngày, 5 giờ, 48 phút, 33 giây</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>';
               
                if (dataProduct['optionloan'] == '') {
                    document.getElementById('product-detail__control-group-btn').innerHTML = ''+
                    '<label class="my-btn my-btn-outline my-btn-outline--active product-detail__btn" for="1week">1 tuần</label>'+
                    '<input type="radio" name="option-loan" value="1week" id="1week" class="input-none">'+
                    '<label class="my-btn my-btn-outline product-detail__btn" for="2week">2 tuần</label>'+
                    '<input type="radio" name="option-loan" value="2week" id="2week" class="input-none">'+
                    '<label class="my-btn my-btn-outline product-detail__btn" for="1month">1 tháng</label>'+
                    '<input type="radio" name="option-loan" value="1month" id="1month" class="input-none">';

                    var optionsLoanInput = document.getElementsByName('option-loan') // thẻ input type radio
                    var optionsLoanButton = document.getElementsByClassName('product-detail__btn') // thẻ label cho thẻ input đó 
                    var optionValue;
                    for (let option of optionsLoanInput) {
                        option.onclick = function () {
                            optionValue = option.value; // lấy giá trị của thẻ input được click
                            for(let button of optionsLoanButton) {
                                if (button.getAttribute('for') == optionValue) {
                                    button.classList.add('my-btn-outline--active') // style like radio for button
                                } else {
                                    button.classList.remove('my-btn-outline--active')
                                }
                            }
                        }
                    }
                    
                } else {
                    var optionsLoan = dataProduct['optionloan'].split(','); // array các tùy chọn mà người đăng đã nhập
                    let htmlText = ''; // Khởi tạo biến string để chứa html button
                    var activeButtonOnce = 'my-btn-outline--active'; //chỉ thêm vào nút đầu tiên
                    for (let option of optionsLoan) {
                        if (option.indexOf('week') != -1) {
                            var numberWeek = parseInt(option);
                            htmlText = htmlText +
                            '<label class="my-btn my-btn-outline '+activeButtonOnce+' product-detail__btn" for="'+numberWeek+'week">'+numberWeek+' tuần</label>'+
                            '<input type="radio" name="option-loan" value="'+numberWeek+'week" id="'+numberWeek+'week" class="input-none">';
                        }
                        if (option.indexOf('month') != -1) {
                            var numberMonth = parseInt(option);
                            htmlText = htmlText +
                            '<label class="my-btn my-btn-outline '+activeButtonOnce+' product-detail__btn" for="'+numberMonth+'month">'+numberMonth+' tháng</label>'+
                            '<input type="radio" name="option-loan" value="'+numberMonth+'month" id="'+numberMonth+'month" class="input-none">';
                        }
                        if (option.indexOf('forever') != -1) {
                            htmlText = htmlText +
                            '<label class="my-btn my-btn-outline '+activeButtonOnce+' product-detail__btn" for="forever">Lấy luôn</label>'+
                            '<input type="radio" name="option-loan" value="forever" id="forever" class="input-none">';
                        }
                        activeButtonOnce = ''; //chỉ sử dụng một lần, các lần sau sẽ bị làm rỗng
                    }
                    document.getElementById('product-detail__control-group-btn').innerHTML = htmlText;

                    var optionsLoanInput = document.getElementsByName('option-loan') // thẻ input type radio
                    var optionsLoanButton = document.getElementsByClassName('product-detail__btn') // thẻ label cho thẻ input đó 
                    for (let option of optionsLoanInput) {
                        option.onclick = function () {
                            optionValue = option.value; // lấy giá trị của thẻ input được click
                            for(let button of optionsLoanButton) {
                                if (button.getAttribute('for') == optionValue) {
                                    button.classList.add('my-btn-outline--active') // style like radio for button
                                } else {
                                    button.classList.remove('my-btn-outline--active')
                                }
                            }
                        }
                    }
                }

                // Nếu không có button nào được click thì option value sẽ là button đầu tiên đang được active
                optionValue = document.querySelector('.my-btn-outline.my-btn-outline--active.product-detail__btn').getAttribute('for');
                /**Xử lý việc submit */
                var borrowSubmit = document.getElementById('borrow-submit')
                borrowSubmit.onclick = function () {
                    console.log(optionValue)
                    if (getCookie('id') !== '') {

                    } else {
                        if(confirm('Vui lòng đăng nhập để mượn sách')) {
                            openModal(); 
                            closeProductDetail();
                            openLogIn(); 
                        }
                    }
                }
                
            }
        }
        xmlhttp.open("GET","../layouts/productDetail.php?idpost="+idPost, true);
        xmlhttp.send();
        openModal()
        openProductDetail()
    }
}