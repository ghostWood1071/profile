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
        else if (validate_password(input[0],input[1]) == false){
            inputgroup[1].dataset.validate = "password incorrect"
            showValidate(input[1])
            check = false;
        }
    }   
    if (!check)
        return check;
    var password = $(input[1]).val();
    $.post("/users/changePass",
    {
        password:password,
    },
    function(data,Status,xhr){
        if(data.head){
            alert(data.message);
            window.location.replace("/login");
            return;
        }
        alert(data.message);
        
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
            this.parentElement.dataset.validate = "Not empty"
            showValidate(this);
        }
    });
})