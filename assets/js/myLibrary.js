// thư viện cơ bản "import đầu tiên"
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/**Xử lý việc hiển thị thời gian hoàn trả sách*/
function timeHandle(object) {
  if (object['borrowed'] == true) {
    //nếu cho luôn thì không cần tính thời gian hoàn trả
    if (object['loanterm'].indexOf('forever') != -1) {
      return 'Sách đã được tặng cho người khác';
    } else {
      let days;//Số ngày mượn dùng để đổi đơn vị từ tháng hay tuần trong csdl ra ngày
      if (object['loanterm'].indexOf('week') != -1) {
        days = parseInt(object['loanterm']) * 7; 
      }
      if (object['loanterm'].indexOf('month') != -1) {
        days = parseInt(object['loanterm']) * 30;
      }
      let loanTime = object['loantime'].replaceAll(' ', "T");
      let dateTime = new Date(Date.parse(loanTime));//Khởi tạo đối tượng date từ thời điểm mượn
      dateTime.setDate(dateTime.getDate() + days);//Sau đó + với số ngày định mượn
      // Thời hạn bằng thời điểm đến hạn trừ thời gian của hiện tại
      let milliSecond = dateTime.valueOf() - new Date().valueOf();// Đổi ra milli second để tính toán

      let timerString = '';
      timerString += Math.floor(milliSecond / 86400000) + ' ngày, '
      milliSecond = milliSecond % 86400000

      timerString += Math.floor(milliSecond / 3600000) + ' giờ, '
      milliSecond = milliSecond % 3600000

      timerString += Math.floor(milliSecond / 60000) + ' phút, '
      milliSecond = milliSecond % 60000

      timerString += Math.floor(milliSecond / 1000) + ' giây.'

      return { 'timerstring': timerString, 'expired': milliSecond };
    }
  }
}