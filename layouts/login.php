<form id="log-in" class="form" action="../server/clients/loginhandle.php" method="post" autocomplete="off">
    <div class="form-header">
        <div class="form-title">Đăng Nhập</div>
    </div>

    <div class="form-content">
        <div class="form-group">
            <input type="text" class="form-input" id="user-name-login" name="user-name" rules="required|username|min:6|max:30" placeholder="Tên đăng nhập">
            <i class="fas fa-check-circle form-group-icon form-group-icon_success"></i>
            <i class="fas fa-exclamation-triangle form-group-icon form-group-icon_danger"></i>
            <div class="form-message"></div>
        </div>

        <div class="form-group">
            <input type="password" class="form-input" id="password-login" name="password" rules="required|password|min:8|max:16" placeholder="Mật khẩu">
            <i class="fas fa-check-circle form-group-icon form-group-icon_success"></i>
            <i class="fas fa-exclamation-triangle form-group-icon form-group-icon_danger"></i>
            <div class="form-message"></div>
        </div>
    </div>

    <div class="form-submit">
        <button type="reset" class="btn submit-btn">Nhập Lại</button>
        <button type="submit" class="btn submit-btn">Đăng Nhập</button>
    </div>
</form>