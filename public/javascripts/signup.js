var input = $('.input--style-5');

$('.card-body form').on('submit',function(){
    var check = true;

    for(var i=0; i< input.length; i++) {
        if(validate(input[i]) == false){
            showValidate(input[i]);
            check=false;
        }
    }

    return check;
});

$('.input--style-5').each(function(){
    $(this).focus(function(){
        hideValidate(this);
    });
})

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