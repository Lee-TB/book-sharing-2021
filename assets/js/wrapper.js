/**filter input */
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

/**Sort by id */
function sortPost(element, keySort) {
    var productContainer = document.querySelector(".product .row");
    //get html collection
    var products = document.getElementsByClassName('product-item')
    // convert html collection to array
    products = Array.prototype.slice.call(products)

    /**sort default -> when a button click 2 time */
    if (element.classList.contains('my-btn-primary')) {
        element.classList.remove('my-btn-primary')
        element.classList.add('my-btn-outline--hover')

         // sort array default by bookname(a->z)
         products.sort(function(a, b){
            var aText = a.querySelector('.product-item__name').innerText
            var bText = b.querySelector('.product-item__name').innerText
            //compare a and b
            return aText.localeCompare(bText);
        });
    } else {
        //clear active
        var filterButtons = document.getElementsByClassName('filter-btn')
        for (let button of filterButtons) {
            if (button.classList.contains('my-btn-primary')) {
                button.classList.remove('my-btn-primary')
                button.classList.add('my-btn-outline--hover')
            }
        }
    
        // button click add active
        element.classList.add('my-btn-primary')
        element.classList.remove('my-btn-outline--hover')
    
        // sort by new -> old
        if (keySort == 'new') {
            // sort array by id descend (a and b is element of array)
            products.sort(function(a, b){
                //compare a and b
                return parseInt(b.id) - parseInt(a.id);
            });
        }
    
        // sort by old -> new
        if (keySort == 'old') {
            // sort array by id ascend (a and b is element of array)
            products.sort(function(a, b){
                //compare a and b
                return parseInt(a.id) - parseInt(b.id);
            });
        }
    }

    /** append child into product containner (row)*/ 
    //The first empty product container
    productContainer.innerHTML = ''
    // append 
    for (let product of products) {
        var divCol_24 = document.createElement('div');
        divCol_24.classList.add('col-2-4');
        divCol_24.appendChild(product);
        productContainer.appendChild(divCol_24);
    }
}

/**category */
function openTabByTypeName(typename) {
    var categoryItems = document.getElementsByClassName('category-item')
    for (let item of categoryItems) {
        if (item.classList.contains('category-item'+'--active')) {
            item.classList.remove('category-item'+'--active')
        }

        if (item.children[0].innerHTML == typename) {
            item.classList.add('category-item'+'--active')
        }
    }
    
    var productProductItems = document.querySelectorAll(".product-item");
    for (let item of productProductItems) {
        // display = none all product items
        item.parentElement.style.display = 'none' //div-2-4
        
        if (typename == 'Tất cả') {
            item.parentElement.style.display = 'block' //div-2-4
        } else
        // display = block item with true condition
        if (item.querySelector('.product-item__typename').innerHTML == typename) {
            item.parentElement.style.display = 'block' //div-2-4
        }
    }
    

}

/***Display Product Detail */
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
                                //hiển thị chi tiết sản phẩm đã được mượn
                                productDetailBorrowedDisplay(object);
                                //hiển thị sản phẩm đã được mượn bên ngoài danh sách sản phẩm 
                                //và đồng thời settimeout để xóa hiển thị nếu thời đã đến hạn hoàn trả
                                let productItemBorrowed = document.getElementById(idPost+'-product-item').querySelector('.product-item__borrowed')
                                productItemBorrowed.style.display = 'block';
                                let productItemTimeOut = setTimeout(() => {
                                    productItemBorrowed.style.display = '';
                                    clearTimeout(productItemTimeOut);//clear chính nó
                                }, timeHandle(object).expired);
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
                
                /**Gọi hàm vừa tạo */
                if (dataProduct.borrowed && timeHandle(dataProduct).expired > 0) {
                    productDetailBorrowedDisplay(dataProduct)
                }
            }
        }
        xmlhttp.open("GET","../layouts/productDetail.php?idpost="+idPost, true);
        xmlhttp.send();
        openModal()
        openProductDetail()
    }
}

/** Mark sản phẩm nào đang được mượn*/ 
function productDetailBorrowedDisplay(object) {
    //Nếu đến hết hạn thì nút mượn sẽ được hiển thị
    productDetailTimeout = setTimeout(() => {
        let productDetailElement = document.getElementById("product-detail");
        productDetailElement.querySelector(".product-detail__borrowed").style.display = '';
        for (let item of productDetailElement.querySelectorAll(".product-detail__control-group")) {
            item.style.display = '';//Hiện các nút Mượn
        }
        //Ẩn thời gian  hoàn trả
        productDetailElement.querySelector(".product-detail__control-timer").style.display = '';
        productDetailElement.querySelector(".product-detail__control-timer span").innerHTML = 'loading...';
        clearTimeout(productDetailTimeout);
        clearInterval(productDetailInterval);
    }, timeHandle(object).expired);

    // Nếu sản phẩm đang được mượn thì gán nhãn đang được mượn và hiện thời gian hoàn trả
    if (timeHandle(object).expired > 0) {
        let productDetailElement = document.getElementById("product-detail");
        productDetailElement.querySelector(".product-detail__borrowed").style.display = 'block';
        for (let item of productDetailElement.querySelectorAll(".product-detail__control-group")) {
            item.style.display = 'none';
        }

        //hiện thời gian  hoàn trả theo hoạt ảnh giảm dần
        productDetailElement.querySelector(".product-detail__control-timer").style.display = 'block';
        productDetailInterval = setInterval(() => {
            productDetailElement.querySelector(".product-detail__control-timer span").innerHTML = timeHandle(object).timerstring;
        }, 1000);
    }
}