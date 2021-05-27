function checkPassword(){
    var password =  $("#oldPass").val();
    $.post("/users/passverify", {currentPass:password},
        function (data, textStatus, jqXHR) {
            if(data.head){
                $($(".form-error")[1]).css("opacity","0");
            }else{
                $($(".form-error")[1]).css("opacity","1");
            }
        },
    );
}