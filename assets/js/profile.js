/**Script for profile.php */
function openTab(event, idContent) {
    var tabContents, tabLinks, classNameOfTabLinks;
    classNameOfTabLinks = event.target.className
    var tabLinks = document.getElementsByClassName(classNameOfTabLinks);
    for (let item of tabLinks) {
        item.classList.remove(classNameOfTabLinks+'--active')
    }

    var tabContents = document.getElementsByClassName('tab-content');
    for (let item of tabContents) {
        item.style.display = ''
    }

    document.getElementById(idContent).style.display = 'block'
    event.target.classList.add(classNameOfTabLinks+'--active')
}