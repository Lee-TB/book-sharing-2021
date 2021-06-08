function Validator(formSelector) {

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var formRules =  {};
    /**
     * Quy ước tạo rule:
     * - Nếu có lỗi thì return `error message` 
     * - Nếu không có lỗi thì return `undefine`
     */
    var validatorRules = {
        required: function(value, placeholder) {
            return value ? undefined : `Vui lòng nhập ${placeholder}`;
        },
        photoRequired: function(value) {
            return value ? undefined : 'Vui lòng chọn ảnh';
        },
        email: function(value) {
            var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập email';
        },
        // fullname: function(value) {
        //     var regex = /^.[^~`!@#$%^&*()_+-={}]{4,40}$/;
        //     return regex.test(value) ? undefined : 'Tên không hợp lệ';
        // },
        username: function(value) {
            var regex = /^(?=[a-zA-Z0-9._]{1,}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
            return regex.test(value) ? undefined : 'Tên đăng nhập không hợp lệ';
        },
        userExisted: function (value) {
            var xmlhttp;
            if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp=new XMLHttpRequest();
            } else { // code for IE6, IE5
                xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.open("GET","../server/clients/userExisted.php?user-name="+value, true); //gửi đi value input
            xmlhttp.send();
            var responseText;
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                    responseText = xmlhttp.responseText;
                    // console.log(responseText);
                    return responseText == "" ? undefined : responseText;
                }
            }
        },
        password: function(value) {
            var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{3,}$/;
            return regex.test(value) ? undefined : 'Mật khẩu phải chứa cả ký tự hoa, thường và chữ số';
        },
        passwordRepeat: function(valuePasswordRepeat, valuePassword) {
            return valuePasswordRepeat == valuePassword ? undefined : 'Mật khẩu không khớp';
        },
        min: function(min) {
            return function (value) {
                return value.length >= min ? undefined : `Độ dài tối thiểu là ${min} ký tự`;
            }
        },
        max: function(max) {
            return function (value) {
                return value.length <= max ? undefined : `Độ dài tối đa là ${max} ký tự`;
            }
        }
    };

    //Lấy ra form element trong DOM theo `formSelector` 
    var formElement = document.querySelector(formSelector);
    
    // chỉ xử lý khi có element trong DOM
    if (formElement) {
        var inputs = formElement.querySelectorAll('[name][rules]');

        for (var input of inputs) 
        {
            var rules = input.getAttribute('rules').split('|');
            for(var rule of rules) {
                
                var funcRule; // value of validatorRules[rule];

                if(rule.includes(':')) { // is rule with param
                    var ruleInfo = rule.split(':');
                    rule = ruleInfo[0];
                    funcRule = validatorRules[rule](ruleInfo[1]);
                } else {
                    funcRule = validatorRules[rule];
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(funcRule);
                } else {
                    formRules[input.name] = [funcRule];
                }
            }

            // lắng nghe sự kiện để validate (blur, change)
            if(input.id === 'typename') {
                input.onchange = handleValidate;
            } else {
                input.onblur = handleValidate;
            }
            input.oninput = handleClearError;
        }

        // hàm thực hiện validate
        function handleValidate(event) {
            var rules = formRules[event.target.name];
            var errorMessage;
            if(event.target.id != 'typename') {
                var inputPlaceholder = event.target.placeholder.replace('Nhập ', '').toLowerCase();
            }
            var inputElement = event.target;
            var passwordElement = formElement.querySelector('#password');
            for (rule of rules) {
                if (rule.name == 'required') {
                    if(inputElement.id === 'typename') {
                        if(inputElement.value === 'Thể loại sách') {
                            errorMessage = 'Vui lòng nhập thể loại sách'
                        } else {
                            inputElement.style.color = '#000000';
                        }
                    } else {
                        errorMessage = rule(inputElement.value, inputPlaceholder);
                    }
                } else if (rule.name == 'passwordRepeat') {
                    errorMessage = rule(inputElement.value, passwordElement.value);
                } else {
                    errorMessage = rule(inputElement.value);
                }
                // console.log(errorMessage);
                if(errorMessage) break;
            }
            // Nếu có lỗi thì hiển thị message lỗi ra UI
            if (errorMessage) {
                var formGroup = getParent(event.target, '.form-group');
                if (formGroup) {
                    formGroup.classList.add('invalid');
                    inputElement.classList.add('border-danger');
                    formGroup.querySelector('.form-group-icon_danger').style.display = 'inline-block';

                    var formMessage = formGroup.querySelector('.form-message');
                    if(formMessage) {
                        formMessage.innerText = errorMessage;
                    }
                }
            } else {
                inputElement.classList.add('border-success');

                var formGroup = getParent(event.target, '.form-group');
                if (formGroup) {
                    formGroup.querySelector('.form-group-icon_success').style.display = 'inline-block';
                }
            }

            return !errorMessage;
        }

        // hàm clear massage lỗi 
        function handleClearError(event) {
            var formGroup = getParent(event.target, '.form-group');
            var inputElement = event.target;

            //clear border success
            if (inputElement.classList.contains('border-success')) {
                inputElement.classList.remove('border-success');
            }
            //clear border danger
            if (inputElement.classList.contains('border-danger')) {
                inputElement.classList.remove('border-danger');
            }
            // clear icon
            formGroup.querySelector('.form-group-icon_danger').style.display = '';
            formGroup.querySelector('.form-group-icon_success').style.display = '';

            if (formGroup.classList.contains('invalid')) {
                formGroup.classList.remove('invalid');
                var formMessage = formGroup.querySelector('.form-message');

                if(formMessage) {
                    formMessage.innerText = "";
                }
            }
        }

        // xử lý hành vi submit form
        formElement.onsubmit = function (event) {
            event.preventDefault();
            var isValid = true; 
            var inputs = formElement.querySelectorAll('[name][rules]');

            // kiểm tra xem khi qua handleValidate có erromassage không
            for (var input of inputs) {
                // chỉ cần isvalid sai một lần thì những lần sau đều sai
                // dùng Fix bug khi chỉ cần nhập dòng cuối cùng hợp lệ và submit thì vẩn thành công
                if (isValid) {
                    isValid = handleValidate({target: input});
                } else {
                    isValid = false;
                    handleValidate({target: input}); // validate các lỗi nhưng không cần gán cho isvalid nữa
                }
            }
            // Nếu không có lỗi (Valid)
            if (isValid) {
                console.log(formElement);
                formElement.submit();
            }
        }

        //xử lý hành vi reset
        formElement.onreset = function (event) {
            // clear all form message
            formMessages = event.target.querySelectorAll('.form-message');
            for (formMessage of formMessages) {
                formMessage.innerText = "";
            }
            // clear all border modifier of input
            inputs = event.target.querySelectorAll('[name][rules]');
            for (input of inputs) {
                if (input.classList.contains('border-danger')){
                    input.classList.remove('border-danger');
                }
                if (input.classList.contains('border-success')){
                    input.classList.remove('border-success');
                }
            }

            formGroups = event.target.querySelectorAll('.form-group');
            for (formGroup of formGroups) {
                // clear all icon of form group
                var formIconDanger = formGroup.querySelector('.form-group-icon_danger');
                if (formIconDanger) {
                    formIconDanger.style.display = '';
                }
                var formIconSuccess = formGroup.querySelector('.form-group-icon_success');
                if (formIconSuccess) {
                    formIconSuccess.style.display = '';
                }

                // clear all invalid class of form group
                if (formGroup.classList.contains('invalid')) {
                    formGroup.classList.remove('invalid');
                }
            }

            document.getElementById('typename').style.color = "";
        } 
    } 



}