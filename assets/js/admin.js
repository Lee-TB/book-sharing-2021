/**fetch all data user for admin */
function fetchDataUsersAdmin(role) {
    var xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var arrayOject = JSON.parse(xmlhttp.responseText)
            // console.log(arrayOject)
            for (let i=0; i<arrayOject.length; i++) {
                var tr = document.createElement('tr');
                tr.innerHTML = ''+
                '<td title="'+arrayOject[i].fullname+'">'+
                    '<a href="profileBorrower.php?idusertake='+arrayOject[i].id+'">'+arrayOject[i].username+'</a>'+
                '</td>'+
                '<td title="'+arrayOject[i].gender+'">'+arrayOject[i].gender+'</td>'+
                '<td title="'+arrayOject[i].phone+'">'+arrayOject[i].phone+'</td>'+
                '<td title="'+arrayOject[i].gmail+'">'+arrayOject[i].gmail+'</td>'+
                '<td>'+
                    (arrayOject[i].role=='1'?'Quản trị viên':'Người dùng')+
                '</td>'+
                '<td>'+
                    // '<button class="my-btn my-btn--warning">Sửa</button>'+
                    '<button class="my-btn my-btn--danger" onclick="if (confirm(\'Người dùng sẽ bị xóa, cùng tất cả bài viết của họ. Tất cả bài viết mà họ mượn sẽ được trả lại\')) {deleteUser(this)}"><i class="fas fa-trash-alt"></i></button>'+
                '</td>';
                tr.id = arrayOject[i].id+'-id-user'
                document.querySelector('#users table tbody').appendChild(tr)
            }
        }
    }

    xmlhttp.open("GET", "../server/admin/fetchUsersAdmin.php?role="+role, true);
    xmlhttp.send();
}

/** fetch all data storage for admin */
function fetchDataStorageAdmin(role) {
    var xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var arrayOject = JSON.parse(xmlhttp.responseText)
            // console.log(arrayOject)
            for (let i=0; i<arrayOject.length; i++) {
                var tr = document.createElement('tr');
                tr.innerHTML = ''+
                '<td title="'+arrayOject[i].bookname+'">'+arrayOject[i].bookname+'</td>'+
                '<td title="'+arrayOject[i].author+'">'+arrayOject[i].author+'</td>'+
                '<td title="'+arrayOject[i].fullnamepost+'">'+
                    '<a href="profileBorrower.php?idusertake='+arrayOject[i].iduserpost+'">'+arrayOject[i].fullnamepost+'</a>'+
                '</td>'+
                '<td title="'+arrayOject[i].posttime+'">'+arrayOject[i].posttime+'</td>'+
                '<td class="tabble-borrower">'+
                    (arrayOject[i].fullnametake==null?'Chưa được mượn':'<a href="profileBorrower.php?idusertake='+arrayOject[i].idusertake+'">'+arrayOject[i].fullnametake+'</a>')+
                '</td>'+
                '<td>'+
                    // '<button class="my-btn my-btn--warning">Sửa</button>'+
                    '<button class="my-btn my-btn--danger" onclick="if (confirm(\'Sách sẽ bị xóa\')) {deletePostAdmin(this)}"><i class="fas fa-trash-alt"></i></button>'+
                '</td>';
                tr.id = arrayOject[i].idpost+'-post-storage'
                document.querySelector('#storage table tbody').appendChild(tr)
                if (arrayOject[i].fullnametake==null) {
                    tr.querySelectorAll('td')[4].classList.add('text-disable')
                }
            }
        }
    }

    xmlhttp.open("GET", "../server/admin/fetchStorageAdmin.php?role="+role, true);
    xmlhttp.send();
}

/**Xóa người dùng */
function deleteUser(element) {
    var idUser = parseInt(element.parentElement.parentElement.id)
    var xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            //CẬP NHẬT LẠI TRANG SAU KHI XÓA NGƯỜI DÙNG
            document.querySelector('#users table tbody').innerHTML = '';
            fetchDataUsersAdmin(getCookie('role'))
            alert(this.responseText)
        }
    }

    xmlhttp.open("POST", "../server/admin/deleteUser.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("iduser="+idUser);
}

function deletePostAdmin(element) {
    var idPost = parseInt(element.parentElement.parentElement.id)
    // console.log(idPost)
    var xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            document.querySelector('#storage table tbody').innerHTML = '';
            fetchDataStorageAdmin(getCookie('role')) // call when delete to reload
            alert(this.responseText)
        }
    }

    xmlhttp.open("POST", "../server/clients/deletePost.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("idpost="+idPost);
}