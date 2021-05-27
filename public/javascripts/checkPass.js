function checkPassword(){
    var password =  $("#oldPass").val();
    $.post("/users/passverify", {currentPass:password},
        function (data, textStatus, jqXHR) {
            console.log(data);
        },
    );
}