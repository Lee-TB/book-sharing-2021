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

        if (item.children[0].innerHTML.toLowerCase() == typename) {
            item.classList.add('category-item'+'--active')
        }
    }
    
    var productProductItems = document.querySelectorAll(".product-item");
    for (let item of productProductItems) {
        // display = none all product items
        item.parentElement.style.display = 'none' //div-2-4
        
        if (typename == 't???t c???') {
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
                    '<span>??ang ???????c m?????n</span>'+
                '</div>'+
                '<div class="row">'+
                    '<div class="col-4">'+
                        '<div class="product-detail__img" style="background-image: url('+ dataProduct['photo'] +');"></div>'+
                    '</div>'+
                    '<div class="col-8">'+
                        '<h3 class="product-detail__heading">'+ dataProduct['bookname'] +'</h3>'+
                        '<h6 class="product-detail__sub-heading">'+ dataProduct['author'] +'</h6>'+
                        '<hr>'+
                        '<p class="product-detail__content"><strong>Nh?? xu???t b???n :</strong> '+ dataProduct['publisher'] +'</p>'+
                        '<p class="product-detail__content"><strong>N??m xu???t b???n :</strong> '+ dataProduct['year'] +'</p>'+
                        '<p class="product-detail__content"><strong>Th??? lo???i :</strong> '+ dataProduct['typename'] +'</p>'+
                        '<p class="product-detail__content"><strong>ISBN :</strong> '+ dataProduct['isbn'] +'</p>'+
                        '<p class="product-detail__content"><strong>Ng?????i ????ng :</strong> '+ dataProduct['fullname'] +'</p>'+
                        '<p class="product-detail__content"><strong>???????c ????ng l??c :</strong> '+ dataProduct['posttime'] +'</p>'+

                        '<div class="product-detail__control">'+
                            '<div class="product-detail__control-group">'+
                                'B???n mu???n m?????n trong bao l??u ?'+
                            '</div>'+

                            '<div class="product-detail__control-group" id="product-detail__control-group-btn">'+
                              
                            '</div>'+
                            
                            '<div class="product-detail__control-group">'+
                                '<button id="borrow-submit" class="my-btn my-btn-primary my-btn-primary--hover my-btn-xl">M?????n</button>'+
                            '</div>'+

                            '<div class="product-detail__control-timer">'+
                                '<label>Tr??? l???i sau: </label><br>'+
                                '<span class="timer">loading...</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>';
                
                /**T???o ra c??c n??t t??y ch???n th???i gian m?????n */
                //M???c ?????nh n???u ng?????i ????ng b??i kh??ng ch???n c??c t??y ch???n th???i gian cho m?????n th?? s??? t???o 3 button c?? b???n 1wek, 2week v?? 1month
                if (dataProduct['optionloan'] == '') {
                    document.getElementById('product-detail__control-group-btn').innerHTML = ''+
                    '<label class="my-btn my-btn-outline my-btn-outline--active product-detail__btn" for="1week">1 tu???n</label>'+
                    '<input type="radio" name="option-loan" value="1week" id="1week" class="input-none">'+
                    '<label class="my-btn my-btn-outline product-detail__btn" for="2week">2 tu???n</label>'+
                    '<input type="radio" name="option-loan" value="2week" id="2week" class="input-none">'+
                    '<label class="my-btn my-btn-outline product-detail__btn" for="1month">1 th??ng</label>'+
                    '<input type="radio" name="option-loan" value="1month" id="1month" class="input-none">';

                    var optionsLoanInput = document.getElementsByName('option-loan') // th??? input type radio
                    var optionsLoanButton = document.getElementsByClassName('product-detail__btn') // th??? label cho th??? input ???? 
                    var optionValue;
                    for (let option of optionsLoanInput) {
                        option.onclick = function () {
                            optionValue = option.value; // l???y gi?? tr??? c???a th??? input ???????c click
                            for(let button of optionsLoanButton) {
                                if (button.getAttribute('for') == optionValue) {
                                    button.classList.add('my-btn-outline--active') // style like radio for button
                                } else {
                                    button.classList.remove('my-btn-outline--active')
                                }
                            }
                        }
                    }
                    
                } else {//ng?????c l???i hi???n th??? c??c n??t m?? ng?????i ????ng ???? ch???n
                    var optionsLoan = dataProduct['optionloan'].split(','); // array c??c t??y ch???n m?? ng?????i ????ng ???? nh???p
                    let htmlText = ''; // Kh???i t???o bi???n string ????? ch???a html button
                    var activeButtonOnce = 'my-btn-outline--active'; //ch??? th??m v??o n??t ?????u ti??n
                    for (let option of optionsLoan) {
                        if (option.indexOf('week') != -1) {
                            var numberWeek = parseInt(option);
                            htmlText = htmlText +
                            '<label class="my-btn my-btn-outline '+activeButtonOnce+' product-detail__btn" for="'+numberWeek+'week">'+numberWeek+' tu???n</label>'+
                            '<input type="radio" name="option-loan" value="'+numberWeek+'week" id="'+numberWeek+'week" class="input-none">';
                        }
                        if (option.indexOf('month') != -1) {
                            var numberMonth = parseInt(option);
                            htmlText = htmlText +
                            '<label class="my-btn my-btn-outline '+activeButtonOnce+' product-detail__btn" for="'+numberMonth+'month">'+numberMonth+' th??ng</label>'+
                            '<input type="radio" name="option-loan" value="'+numberMonth+'month" id="'+numberMonth+'month" class="input-none">';
                        }
                        if (option.indexOf('forever') != -1) {
                            htmlText = htmlText +
                            '<label class="my-btn my-btn-outline '+activeButtonOnce+' product-detail__btn" for="forever">L???y lu??n</label>'+
                            '<input type="radio" name="option-loan" value="forever" id="forever" class="input-none">';
                        }
                        activeButtonOnce = ''; //ch??? s??? d???ng m???t l???n, c??c l???n sau s??? b??? l??m r???ng
                    }
                    document.getElementById('product-detail__control-group-btn').innerHTML = htmlText;

                    var optionsLoanInput = document.getElementsByName('option-loan') // th??? input type radio
                    var optionsLoanButton = document.getElementsByClassName('product-detail__btn') // th??? label cho th??? input ???? 
                    for (let option of optionsLoanInput) {
                        option.onclick = function () {
                            optionValue = option.value; // l???y gi?? tr??? c???a th??? input ???????c click
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

                // N???u kh??ng c?? button n??o ???????c click th?? option value s??? l?? button ?????u ti??n ??ang ???????c active
                optionValue = document.querySelector('.my-btn-outline.my-btn-outline--active.product-detail__btn').getAttribute('for');
                /**X??? l?? vi???c submit */
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
                                //hi???n th??? chi ti???t s???n ph???m ???? ???????c m?????n
                                productDetailBorrowedDisplay(object);
                                //hi???n th??? s???n ph???m ???? ???????c m?????n b??n ngo??i danh s??ch s???n ph???m 
                                //v?? ?????ng th???i settimeout ????? x??a hi???n th??? n???u th???i ???? ?????n h???n ho??n tr???
                                let productItemBorrowed = document.getElementById(idPost+'-product-item').querySelector('.product-item__borrowed')
                                productItemBorrowed.style.display = 'block';
                                let productItemTimeOut = setTimeout(() => {
                                    productItemBorrowed.style.display = '';
                                    clearTimeout(productItemTimeOut);//clear ch??nh n??
                                }, timeHandle(object).expired);
                            }
                        }

                        xmlhttp.open("GET","../server/clients/borrowBook.php?idpost="+idPost+"&idusertake="+getCookie('id')+"&loanterm="+optionValue, true);
                        xmlhttp.send();
                    } else {
                        if(confirm('Vui l??ng ????ng nh???p ????? m?????n s??ch')) {
                            closeProductDetail();
                            openLogIn(); 
                        }
                    }
                }
                
                /**G???i h??m v???a t???o */
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

/** Mark s???n ph???m n??o ??ang ???????c m?????n*/ 
function productDetailBorrowedDisplay(object) {
    //N???u ?????n h???t h???n th?? n??t m?????n s??? ???????c hi???n th???
    productDetailTimeout = setTimeout(() => {
        let productDetailElement = document.getElementById("product-detail");
        productDetailElement.querySelector(".product-detail__borrowed").style.display = '';
        for (let item of productDetailElement.querySelectorAll(".product-detail__control-group")) {
            item.style.display = '';//Hi???n c??c n??t M?????n
        }
        //???n th???i gian  ho??n tr???
        productDetailElement.querySelector(".product-detail__control-timer").style.display = '';
        productDetailElement.querySelector(".product-detail__control-timer span").innerHTML = 'loading...';
        clearTimeout(productDetailTimeout);
        clearInterval(productDetailInterval);
    }, timeHandle(object).expired);

    // N???u s???n ph???m ??ang ???????c m?????n th?? g??n nh??n ??ang ???????c m?????n v?? hi???n th???i gian ho??n tr???
    if (timeHandle(object).expired > 0) {
        let productDetailElement = document.getElementById("product-detail");
        productDetailElement.querySelector(".product-detail__borrowed").style.display = 'block';
        for (let item of productDetailElement.querySelectorAll(".product-detail__control-group")) {
            item.style.display = 'none';
        }

        //hi???n th???i gian  ho??n tr??? theo ho???t ???nh gi???m d???n
        productDetailElement.querySelector(".product-detail__control-timer").style.display = 'block';
        productDetailInterval = setInterval(() => {
            productDetailElement.querySelector(".product-detail__control-timer span").innerHTML = timeHandle(object).timerstring;
        }, 1000);
    }
}