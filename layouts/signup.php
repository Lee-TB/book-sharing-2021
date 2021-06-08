<form id="sign-up" class="form" method="POST" action="../server/clients/signuphandle.php" autocomplete="on" enctype="multipart/form-data">
    <div class="form-header">
        <div class="form-title">Đăng Ký</div>
    </div>

    <div class="form-content">
        <div class="form-group">
            <input type="text" class="form-input" id="user-name" name="user-name" rules="required|userExisted|username|min:6|max:30" placeholder="Tên đăng nhập">
            <i class="fas fa-check-circle form-group-icon form-group-icon_success"></i>
            <i class="fas fa-exclamation-triangle form-group-icon form-group-icon_danger"></i>
            <div class="form-message"></div>
        </div>

        <div class="form-group">
            <input type="password" class="form-input" id="password" name="password" rules="required|password|min:8|max:16" placeholder="Mật khẩu">
            <i class="fas fa-check-circle form-group-icon form-group-icon_success"></i>
            <i class="fas fa-exclamation-triangle form-group-icon form-group-icon_danger"></i>
            <div class="form-message"></div>
        </div>

        <div class="form-group">
            <input type="password" class="form-input" id="password-repeat" name="password-repeat" rules="required|password|min:6|max:16|passwordRepeat" placeholder="Nhập lại mật khẩu">
            <i class="fas fa-check-circle form-group-icon form-group-icon_success"></i>
            <i class="fas fa-exclamation-triangle form-group-icon form-group-icon_danger"></i>
            <div class="form-message"></div>
        </div>

        <div class="form-group">
            <input type="text" class="form-input" id="full-name" name="full-name" rules="required" placeholder="Tên">
            <i class="fas fa-check-circle form-group-icon form-group-icon_success"></i>
            <i class="fas fa-exclamation-triangle form-group-icon form-group-icon_danger"></i>
            <div class="form-message"></div>
        </div>

        <div class="form-group">
            <label for="avatar">Ảnh đại diện</label>
            <input type="file" name="avatar" id="avatar">
            <div class="form-message"></div>
        </div>

        <div class="form-group">
            <label style="margin-right: 8px;">Giới tính</label>

            <div class="gender">
                <input type="radio" id="male" name="gender" value="Nam">
                <label for="male">Nam</label>
            </div>

            <div class="gender">
                <input type="radio" id="female" name="gender" value="Nữ">
                <label for="female">Nữ</label>
            </div>

            <div class="gender">
                <input type="radio" id="other" name="gender" value="Khác">
                <label for="other">Khác</label>
            </div>
            <div class="form-message"></div>
        </div>

        <div class="form-group">
            <input type="tel" class="form-input" id="phone" name="phone" rules="required" placeholder="Số điện thoại">
            <i class="fas fa-check-circle form-group-icon form-group-icon_success"></i>
            <i class="fas fa-exclamation-triangle form-group-icon form-group-icon_danger"></i>
            <div class="form-message"></div>
        </div>

        <div class="form-group">
            <input type="email" class="form-input" id="gmail" name="gmail" rules="required|email" placeholder="Gmail">
            <i class="fas fa-check-circle form-group-icon form-group-icon_success"></i>
            <i class="fas fa-exclamation-triangle form-group-icon form-group-icon_danger"></i>
            <div class="form-message"></div>
        </div>
    </div>

    <div class="form-submit">
        <button type="reset" class="btn submit-btn">Nhập Lại</button>
        <button type="submit" class="btn submit-btn">Đăng Ký</button>
    </div>
</form>