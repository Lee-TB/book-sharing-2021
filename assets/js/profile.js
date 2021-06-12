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