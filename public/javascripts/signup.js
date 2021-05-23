function validate(input){
    if ($(input).val().trim()=='')
        return false;
}

function showValidate(input){
    var thisAlert = $(input).parent();
    $(thisAlert).addClass('alert-validate')
}

function hideValidate(input){
    var thisAlert = $(input).parent();
    $(thisAlert).removeClass('alert-validate')
}

function validate_password(password1,password2){
    if (password1.value != password2.value)
        return false;
}

var input = $('.input--style-5');

var btn = $('.btn-container .btn')

var inputgroup = $('.input-group-desc');

btn[0].onclick = function() {
    var check = true;
    for(var i=0; i<input.length; i++) {
        if(validate(input[i]) == false){
            showValidate(input[i]);
            check = false;
        }
        else if (validate_password(input[4],input[5]) == false){
            inputgroup[2].dataset.validate = "Mật khẩu không khớp"
            showValidate(input[5])
            check = false;
        }
    }   
    if (!check)
        return check;

    var first_name = $(input[0]).val();
    var last_name = $(input[1]).val();
    var account = $(input[2]).val();
    var email = $(input[3]).val();
    var password = $(input[4]).val();

    $.post("signup",
    {
        first_name:first_name,
        last_name:last_name,
        account:account,
        password:password,
        email: email
    },
    function(data,Status,xhr){
        if(data.head){
            alert(data.message);
            return;
        }
        window.location.replace("/login");
    })
}

$('.input--style-5').each(function(){
    $(this).focus(function(){
        hideValidate(this);
   });
})

$('.input--style-5').each(function(){
    $(this).focusout(function(){
        if (validate(this) == false){
            this.parentElement.dataset.validate = "Hãy nhập đầy đủ thông tin"
            showValidate(this);
        }
    });
})