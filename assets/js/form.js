/**Book form */
var optionLoanLabelElements = document.querySelectorAll('.option-loan-label')
for (let element of optionLoanLabelElements) {
    element.onclick = function () {
        if(!element.classList.contains('my-btn-outline--active')) {
            element.classList.add('my-btn-outline--active');
        } else {
            element.classList.remove('my-btn-outline--active');
        }
    }
}