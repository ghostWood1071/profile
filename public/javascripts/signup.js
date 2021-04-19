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

function validate(input){
    if ($(input).val().trim()=='')
        return false;
}

function showValidate(input){
    var thisAlert = $(input).parent();
    
    $(thisAlert).addClass('alert-validate')
}