function checkPassword(){
    var password =  $("#oldPass").val();
    $.post("/users/passverify", {currentPass:password},
        function (data, textStatus, jqXHR) {
            if(data.head){
                $($(".form-error")[1]).css("opacity","0");
                $("#checkTrue").css("display","inline");
                $("#checkFalse").css("display","none");
                $("#checkTrue").addClass('active');
            }else{
                $($(".form-error")[1]).css("opacity","1");
                $("#checkTrue").css("display","none");
                $("#checkFalse").css("display","inline");
                $("#checkTrue").removeClass('active');
            }
        },
    );
}

function change(){
    $.post("users/changepassword", {
        password: $("#newPass").val()
    },
        function (data, textStatus, jqXHR) {
            if(data.head || !data.head){
                alert(data.message);
            }
        }
    );
}