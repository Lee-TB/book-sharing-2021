<header id="header">
    <div class="header-top">
        <div class="container">
            <div class="row">
                <div class="logo-header col-2">
                    <a href="../index.php" class="logo-header-link">
                        <img src="../assets/images/logoChiaSeSach.png" alt="" height="110px">
                    </a>
                </div>

                <div class="col-8"></div>

                <?php 
                    include_once "fetchDataUser.php";
                    if (isset($dataUser)) {
                ?>
                <div class="hello-user col-2">
                    <div class="hello-user__full-name"><?php echo $dataUser['fullname']; ?></div>
                    <div class="hello-user__avatar">
                        <a href="profile.php?idcontent=profile" class="hello-user__avatar-link" style="background-image: url(<?php echo $dataUser['avatar']; ?>);"></a>
                    </div>
                </div>
                <?php 
                    }
                ?>
            </div>
        </div>
    </div>

    <div id="header-menu">
        <div class="container">
            <div class="row">
                <div class="col-2">
                    <div class="menu-item">
                        <a href="../index.php" class="menu-item-link">Trang Chủ</a>
                    </div>
                </div>

                <div class="col-6">
                    <div class="field-search">
                        <form method="get" action="/" id="search-box" autocomplete="off">
                            <div class="search-query-wrap">
                                <input type="text" class="search-query" name="search-query" placeholder="Tìm kiếm sách">
                                
                                <div class="search-history">
                                    <ul class="search-history-list">
                                        <li class="search-history-item">Phân tích thiết kế thuật toán</li>
                                        <li class="search-history-item">Niên luận cơ sở ngành</li>
                                        <li class="search-history-item">Đồ họa máy tính</li>
                                    </ul>
                                </div>
                            </div>

                            <button type="submit" name="submit-search" class="btn button-search">
                                <i class="fas fa-search search-icon"></i>
                                <div class="search-title">Tìm Kiếm</div>
                            </button>
                        </form>
                    </div>
                </div>

                <div class="col-2" style="display: flex;">
                    <button class="add-book-button btn">Thêm Sách</button>
                </div>

                <div class="col-2">
                    <div class="user">
                        <div class="user-area">
                            <i class="fas fa-user user-icon"></i>
                            <p class="user-text">Tài Khoản</p>
                            <i class="fas fa-caret-down caret-down-icon"></i>
                        </div>

                        <ul class="user-drop-down">
                            <!-- Khi chưa Log In -->
                            <li class="user-drop-down_item">
                                <button class="user-drop-down_button" onclick="openModal(); openLogIn();">Đăng Nhập</button>
                            </li>

                            <li class="user-drop-down_item">
                                <button class="user-drop-down_button" onclick="openModal(); onpenSignUp();">Tạo Tài Khoản</button>
                            </li>

                            <!-- Khi đã Log In -->
                            <li class="user-drop-down_item isAdmin">
                                <button class="user-drop-down_button" onclick="location.href='admin.php'">Trang Quản Trị</button>
                            </li>

                            <li class="user-drop-down_item logged">
                                <button class="user-drop-down_button button-of-profile" onclick="linkToPageAndOpenTab(event,'profile')">Trang Cá Nhân</button>
                            </li>

                            <li class="user-drop-down_item logged">
                                <button class="user-drop-down_button button-of-storage" onclick="linkToPageAndOpenTab(event, 'storage')">Kho Sách Của Tui</button>
                            </li>

                            <li class="user-drop-down_item logged">
                                <button class="user-drop-down_button" onclick="location.href='../server/clients/logout.php';">
                                    Đăng Xuất
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>