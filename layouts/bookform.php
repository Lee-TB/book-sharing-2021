<form id="book-form" class="form" action="../server/clients/bookformhandle.php?page-call=" method="POST" autocomplete="off" enctype="multipart/form-data">
    <div class="form-header">
        <div class="form-title">Thêm sách</div>
    </div>

    <div class="form-content">

        <div class="form-group">
            <input type="text" class="form-input book-form__input" id="bookname" name="bookname" rules="required" placeholder="Tên sách">
            <i class="fas fa-check-circle form-group-icon form-group-icon_success"></i>
            <i class="fas fa-exclamation-triangle form-group-icon form-group-icon_danger"></i>
            <div class="form-message"></div>
        </div>

        <div class="form-group">
            <input type="text" class="form-input book-form__input" id="author" name="author" rules="required" placeholder="Tác giả">
            <i class="fas fa-check-circle form-group-icon form-group-icon_success"></i>
            <i class="fas fa-exclamation-triangle form-group-icon form-group-icon_danger"></i>
            <div class="form-message"></div>
        </div>

        <div class="form-group">
            <input type="text" class="form-input book-form__input" id="isbn" name="isbn" rules="required" placeholder="Mã ISBN">
            <i class="fas fa-check-circle form-group-icon form-group-icon_success"></i>
            <i class="fas fa-exclamation-triangle form-group-icon form-group-icon_danger"></i>
            <div class="form-message"></div>
        </div>
        
        <div class="form-group">
            <label for="avatar">Ảnh sách</label>
            <input type="file" name="photo" id="photo" rules="photoRequired">
            <i class="fas fa-check-circle form-group-icon form-group-icon_success"></i>
            <i class="fas fa-exclamation-triangle form-group-icon form-group-icon_danger"></i>
            <div class="form-message"></div>
        </div>

        <div class="form-group">
            <input type="text" class="form-input book-form__input" id="publisher" name="publisher" rules="required" placeholder="Nhà xuất bản">
            <i class="fas fa-check-circle form-group-icon form-group-icon_success"></i>
            <i class="fas fa-exclamation-triangle form-group-icon form-group-icon_danger"></i>
            <div class="form-message"></div>
        </div>

        <div class="form-group">
            <input type="text" maxlength="4" class="form-input book-form__input" id="year" name="year" rules="required" placeholder="Năm xuất bản">
            <i class="fas fa-check-circle form-group-icon form-group-icon_success"></i>
            <i class="fas fa-exclamation-triangle form-group-icon form-group-icon_danger"></i>
            <div class="form-message"></div>
        </div>

        <div class="form-group">
            <select id="typename" name="typename" rules="required">
                <option style="display: none;">Thể loại sách</option>
            </select>
            <i class="fas fa-check-circle form-group-icon form-group-icon_success"></i>
            <i class="fas fa-exclamation-triangle form-group-icon form-group-icon_danger"></i>
            <div class="form-message"></div>
        </div>

        <div class="form-group" style="display: flex; justify-content: space-between; align-items: center;">
            Chọn các thời gian mượn
            <label for="optionloan1" class="option-loan-label my-btn my-btn-outline my-btn-s">1 tuần</label>
            <input type="checkbox" name="optionloan[]" id="optionloan1" value="1week" class="input-option-loan">
            
            <label for="optionloan2" class="option-loan-label my-btn my-btn-outline my-btn-s">2 tuần</label>
            <input type="checkbox" name="optionloan[]" id="optionloan2" value="2week" class="input-option-loan">

            <label for="optionloan3" class="option-loan-label my-btn my-btn-outline my-btn-s">1 tháng</label>
            <input type="checkbox" name="optionloan[]" id="optionloan3" value="1month" class="input-option-loan">

            <label for="optionloan4" class="option-loan-label my-btn my-btn-outline my-btn-s">3 tháng</label>
            <input type="checkbox" name="optionloan[]" id="optionloan4" value="3month" class="input-option-loan">
            
            <label for="optionloan5" class="option-loan-label my-btn my-btn-outline my-btn-s">6 tháng</label>
            <input type="checkbox" name="optionloan[]" id="optionloan5" value="6month" class="input-option-loan">

            <label for="optionloan6" class="option-loan-label my-btn my-btn-outline my-btn-s">Cho luôn</label>
            <input type="checkbox" name="optionloan[]" id="optionloan6" value="forever" class="input-option-loan">

        </div>
        
    </div>

    <div class="form-submit">
        <button type="reset" class="btn submit-btn">Nhập Lại</button>
        <button type="submit" class="btn submit-btn">Thêm Sách</button>
    </div>
</form>
<script>
    document.getElementById('book-form').action = document.getElementById('book-form').action + location.pathname
</script>