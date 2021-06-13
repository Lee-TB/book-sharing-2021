function fetchDataBorrower(idUser) {
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var objectUser = JSON.parse(this.responseText)
            document.getElementById('profile-info__fullname').innerHTML = objectUser['fullname'];
            document.getElementById('profile-info__gender').innerHTML = objectUser['gender'];
            document.getElementById('profile-info__phone').innerHTML = objectUser['phone'];
            document.getElementById('profile-info__gmail').innerHTML = objectUser['gmail'];
        }
    }

    xmlhttp.open("GET", "../server/clients/fetchDataBorrower.php?idusertake="+idUser, true);
    xmlhttp.send();
}
