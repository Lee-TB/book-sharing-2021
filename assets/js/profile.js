/**Script for profile.php */
function openTab(event, idContent) {
    var tabContents, classNameOfGroupButton, classNameOfTabButton;
    classNameOfTabButton = event.target.classList[0]
    classNameOfGroupButton = event.target.classList[1]
    var tabButton = document.getElementsByClassName(classNameOfTabButton)
    for (let item of tabButton) {
        if (item.classList.contains(classNameOfTabButton+'--active')) {
            item.classList.remove(classNameOfTabButton+'--active')
        }
        // console.log(item)
    }

    var groupButton = document.getElementsByClassName(classNameOfGroupButton)
    for (let item of groupButton) {
        if (item.classList[0] != classNameOfTabButton) {
            for(let otherButton of document.getElementsByClassName(item.classList[0])) {
                if (otherButton.classList.contains(otherButton.classList[0]+'--active')) {
                    otherButton.classList.remove(otherButton.classList[0]+'--active')
                }
                // console.log(otherButton.classList[0])
                // console.log(otherButton)
            }
        }
    }

    var tabContents = document.getElementsByClassName('tab-content');
    for (let item of tabContents) {
        item.style.display = ''
    }

    for (let item of groupButton) {
        // console.log(item.classList[0]+'--active')
        item.classList.add(item.classList[0]+'--active')
    }

    document.getElementById(idContent).style.display = 'block'
}