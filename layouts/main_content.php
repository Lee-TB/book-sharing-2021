<div class="wrap-container">
    <div class="container">
        <div class="row">
            <div class="col-2">
                <nav class="category">
                    <h3 class="category__heading">
                        <i class="category__heading-icon fas fa-list"></i>
                        Danh mục
                    </h3>

                    <ul class="category-list">
                        <li class="category-item">
                            <a href="#" class="category-item__link">Tất cả</a>
                        </li>

                        <?php
                            $sql = "SELECT DISTINCT `typename` FROM `book` ORDER BY `typename`";
                            $result = $connectDatabase->query($sql);
                            for($i=1; $i<=$result->num_rows; $i++) {
                                $data = $result->fetch_assoc();
                                echo    '<li class="category-item">'.
                                        '<a href="#" class="category-item__link">'.$data['typename'].'</a>'.
                                        '</li>';
                            }
                        ?>

                    </ul>
                </nav>
            </div>

            <div class="col-10">
                <div class="filter">
                    <span class="filter-label">
                        Sắp xếp theo
                    </span>
                    <button class="my-btn my-btn-outline--hover filter-btn" onclick="sortPost(this, 'new')">Mới nhất</button>
                    <button class="my-btn my-btn-outline--hover filter-btn" onclick="sortPost(this, 'old')">Cũ nhất</button>
                    <input type="text" class="filter-input" onkeyup="filterInput(this);" placeholder="Lọc theo tên">

                    <!-- <div class="filter__page">
                        <span class="filter__page-num">
                            <span class="filter__page-current">1</span>/10
                        </span>
                        <div class="filter__page-control">
                            <a href="#" class="filter__page-btn filter__page-btn--disabled">
                                <i class="fas fa-angle-left filter__page-icon"></i>
                            </a>
                            
                            <a href="#" class="filter__page-btn">
                                <i class="fas fa-angle-right filter__page-icon"></i>
                            </a>
                        </div>
                    </div> -->

                </div>

                <div class="product">
                    
                    <div class="row">
                        <!-- <div class="col-2-4">
                            <div class="product-item">
                                <div class="product-item__img" style="background-image: url(https://res.cloudinary.com/leetb/image/upload/v1622272106/ChiaSeSach/Book/mpkxdhenpu7usawkuwye.jpg);"></div>
                                <h6 class="product-item__name" title="Giáo trình Kiến trúc và thiết kết phần mềm">
                                    Giáo trình Kiến trúc và thiết kết phần mềm
                                </h6>
                                <p class="product-item__user-post">Người đăng:<br>Trần Bùi Lý Đức</p>
                                <p class="product-item__time-post">Được đăng lúc:<br>2021-05-29 02:08:26</p>
                            </div>
                        </div> -->


                    </div>
                </div>
            </div>
        </div>
        
    </div>
</div>

<?php
    $arrayOfObjects = array();

    $sql =  "SELECT `idpost`, `bookname`, `fullname`, `posttime`, `iduser`, `photo` ".
    "FROM `post` ".
        "INNER JOIN `user` ON `post`.`iduser` = `user`.`id` ".
        "INNER JOIN `book` ON `post`.`idbook` = `book`.`idbook` ".
    "ORDER BY `bookname`";
    $resultPostUserBook = $connectDatabase->query($sql);
    for ($i=1; $i<=$resultPostUserBook->num_rows; $i++) {
        $dataPostUserBook = $resultPostUserBook->fetch_assoc();
        $idPost = $dataPostUserBook['idpost'];

        $sql = "SELECT * FROM `loan` WHERE `idpost` = '$idPost' ORDER BY `idloan` DESC LIMIT 1";
        $resultLoan = $connectDatabase->query($sql);

        if ($resultLoan->num_rows > 0){
            $dataLoan = $resultLoan->fetch_assoc();

            $dataPostUserBook['loantime'] = $dataLoan['loantime'];
            $dataPostUserBook['loanterm'] = $dataLoan['loanterm'];
            $dataPostUserBook['borrowed'] = 1;
        } else {
            $dataPostUserBook['borrowed'] = 0;
        }
        array_push($arrayOfObjects, $dataPostUserBook);
    }
    $myJSON = json_encode($arrayOfObjects);
?>

<script>
    var myJson = <?php echo $myJSON;?>;
    var productContainer = document.querySelector(".product .row");
    for (var i=0; i<myJson.length; i++) {
        var divCol_24 = document.createElement('div');
        divCol_24.classList.add('col-2-4');
        divCol_24.innerHTML =   '<div class="product-item" id="'+myJson[i].idpost+'-product-item">'+
                                    '<div class="product-item__borrowed">'+
                                        '<i class="fas fa-check"></i>'+
                                        '<span>Đang được mượn</span>'+
                                    '</div>'+

                                    '<div class="product-item__img" style="background-image: url('+myJson[i].photo+');"></div>'+
                                    '<h6 class="product-item__name" title="'+myJson[i].bookname+'">'+
                                        myJson[i].bookname+
                                    '</h6>'+
                                    '<p class="product-item__user-post">Người đăng:<br>'+myJson[i].fullname+'</p>'+
                                    '<p class="product-item__time-post">Được đăng lúc:<br>'+myJson[i].posttime+'</p>'+
                                '</div>';
        // console.log(myJson[i])
        if (typeof timeHandle(myJson[i]) !== 'undefined') {
            if (timeHandle(myJson[i]).expired > 0) {
                let productItemBorrowed = divCol_24.querySelector('.product-item__borrowed');
                productItemBorrowed.style.display = 'block';
                let productItemTimeOut = setTimeout(() => {
                    productItemBorrowed.style.display = ''; //đến hạn thì biến mất đánh dấu đã mượn
                    clearTimeout(productItemTimeOut);//clear chính nó
                }, timeHandle(myJson[i]).expired);
            }
        }
        productContainer.appendChild(divCol_24);
    }
</script>