/***filter */
function newSortButton() {
    var productItemElement = document.querySelectorAll('.product-item');
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
    item.onclick = fetchProductDetail;
    function fetchProductDetail() {//function call AJAX
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
                                '<span class="timer">loading...</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>';
                
                /**Tạo ra các nút tùy chọn thời gian mượn */
                //Mặc định nếu người đăng bài không chọn các tùy chọn thời gian cho mượn thì sẽ tạo 3 button cơ bản 1wek, 2week và 1month
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
                    
                } else {//ngược lại hiển thị các nút mà người đăng đã chọn
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
                    if (getCookie('id') !== '') {
                        var xmlhttp;
                        if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
                            xmlhttp=new XMLHttpRequest();
                        } else { // code for IE6, IE5
                            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                        }

                        xmlhttp.onreadystatechange=function() {
                            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                                let json = xmlhttp.responseText;
                                let object = JSON.parse(json);
                                productDetailBorrowedDisplay(object);           
                            }
                        }

                        xmlhttp.open("GET","../server/clients/borrowBook.php?idpost="+idPost+"&idusertake="+getCookie('id')+"&loanterm="+optionValue, true);
                        xmlhttp.send();
                    } else {
                        if(confirm('Vui lòng đăng nhập để mượn sách')) {
                            closeProductDetail();
                            openLogIn(); 
                        }
                    }
                }
                
                // Xử lý việc hiển thị thời gian hoàn trả sách
                function timeHandle(object) {
                    if (object['borrowed'] == true) {
                        //nếu cho luôn thì không cần tính thời gian hoàn trả
                        if (object['loanterm'].indexOf('forever') != -1) {
                            return 'Sách đã được tặng cho người khác';
                        } else {
                            let days;
                            if (object['loanterm'].indexOf('week') != -1) {
                                days = parseInt(object['loanterm']) * 7;
                            }
                            if (object['loanterm'].indexOf('month') != -1) {
                                days = parseInt(object['loanterm']) * 30;
                            }
                            let loanTime = object['loantime'].replaceAll(' ', "T");
                            let dateTime = new Date(Date.parse(loanTime));
                            dateTime.setDate(dateTime.getDate() + days);
                            let milliSecond = dateTime.valueOf() - new Date().valueOf();
                            
                            let timerString = '';
                            timerString += Math.floor(milliSecond / 86400000) + ' ngày, '
                            milliSecond = milliSecond % 86400000
        
                            timerString += Math.floor(milliSecond / 3600000) + ' giờ, '
                            milliSecond = milliSecond % 3600000
        
                            timerString += Math.floor(milliSecond / 60000) + ' phút, '
                            milliSecond = milliSecond % 60000
        
                            timerString += Math.floor(milliSecond / 1000) + ' giây.'

                            return timerString;
                        }
                    }
                }

                // Mark sản phẩm nào đang được mượn
                function productDetailBorrowedDisplay(object) {
                    // Nếu sản phẩm đang được mượn thì gán nhãn đang được mượn và hiện thời gian hoàn trả
                    if (object['borrowed']) {
                        let productDetailElement = document.getElementById("product-detail");
                        productDetailElement.querySelector(".product-detail__borrowed").style.display = 'block';
                        for (let item of productDetailElement.querySelectorAll(".product-detail__control-group")) {
                            item.style.display = 'none';
                        }
    
                        //hiện thời gian  hoàn trả
                        productDetailElement.querySelector(".product-detail__control-timer").style.display = 'block';
                        productDetailControlTimer = setInterval(() => {
                            productDetailElement.querySelector(".product-detail__control-timer span").innerHTML = timeHandle(object);
                        }, 1000);
                    }
                }

                /**Gọi hàm vừa tạo */
                productDetailBorrowedDisplay(dataProduct)

            }
        }
        xmlhttp.open("GET","../layouts/productDetail.php?idpost="+idPost, true);
        xmlhttp.send();
        openModal()
        openProductDetail()
    }
}