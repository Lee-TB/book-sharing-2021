/**Script for profile.php */
function openTab(event, idContent) {
    var tabContents, tabButton

    tabButton = document.getElementsByClassName('tab__links')
    for (let item of tabButton) {
        if (item.classList.contains('tab__links'+'--active')) {
            item.classList.remove('tab__links'+'--active')
        }
    }

    var tabContents = document.getElementsByClassName('tab-content');
    for (let item of tabContents) {
        item.style.display = ''
    }

    document.getElementById(idContent).style.display = 'block'
    if (document.getElementById(idContent).style.display == 'block') {
        for (let item of document.getElementsByClassName('tab__links')) {
            if (item.classList[1] != undefined) {
                if (item.classList[1].indexOf(idContent) != -1) {
                    item.classList.add(item.classList[0]+'--active')
                }
            }
        }
    }
}

/**script for update profile */
function updateProfile() {
    var fullNameValue, phoneValue, gmailValue, genderValue;
    fullNameValue = document.getElementById('profile-info__fullname').value
    phoneValue = document.getElementById('profile-info__phone').value
    gmailValue = document.getElementById('profile-info__gmail').value
    for (let radio of document.getElementsByName('gender')) {
        if (radio.checked) {
            genderValue = radio.value
        }
    }

    var idUser = getCookie('id')
    var xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            console.log(xmlhttp.responseText)
            document.getElementById('profile-info__update-message').innerHTML=xmlhttp.responseText;
        }
    }

    xmlhttp.open("POST", "../server/clients/updateUser.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send('iduser='+idUser+'&fullname='+fullNameValue+'&gender='+genderValue+'&phone='+phoneValue+'&gmail='+gmailValue);
}