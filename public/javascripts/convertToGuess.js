function Check_Empty(){
    //check research-interest element
    if (Check_Element_Empty($('.research'))){
        $('.research').remove()
    }

    //check academic-record element
    if (Check_Element_Empty($('.academic'))){
        $('.academic').remove()
    }

    //check new element
    if (Check_Element_Empty($('#new'))){
        $('#new').remove()
    }

    //check tearch element
    var check_graduate = Check_Element_Empty($('.teaching .graduate'))
    var check_university = Check_Element_Empty($('.teaching .undergraduate'))
    if (check_graduate && check_university){
        $('.teaching').remove()
    }   
    else if (check_graduate){
        $('.teaching .graduate').remove()
    }
    else if (check_university){
        $('.teaching .undergraduate').remove()
    } 

    //check thesis element
        //check thesis-item element
        var thesis_item = $('#thesis .thesis-item')
        for (var i=0;i<thesis_item.length;i++)
        {
            if (Check_Element_Empty(thesis_item[i])){
                $(thesis_item[i]).remove()
            }     
        }
        //check thesis-tag element
        if (Check_Element_Empty($('#thesis'))){
            $('#thesis').remove()
        }

    //check grants element
    if(Check_Element_Empty($('#research'))){
        $('#research').remove()
    }

    //check publications element
    var check_book = Check_Element_Empty($('.publication .publication-book'))
    var check_paper = Check_Element_Empty($('.publication .publication-detail'))
    if (check_book && check_paper){
        $('.publication').remove()
    }
    else{
        //check book element
        if (check_book){
            $('.publication .publication-book').remove()
        }

        //check paper element
        if (check_paper){
            $('.publication .publication-detail').remove()
        }

        //check publication-item element
        if (Check_Element_Empty($('.publication .publication-detail .publication-item'))){
            $('.publication .publication-detail .publication-item').remove()
        }
    }
}
function Check_Element_Empty(element){
    var list_group = $(element).find('.list-group')[0]
    if ($(list_group).children().length == 0)
        return true
    return false
}

removeEdit = () => {
    $('[contentEditable = "true"]').attr('contentEditable', 'false');
    $('[draggable = "true"]').attr('draggable', 'false');
    $('.fa-arrows-alt, .fa-trash-alt, .fa-plus, .chosen-file, .label-file, .pub-chosen-right, .nav-img-upload, .fa-upload').remove();
}
function Save(){
    Check_Empty()
    removeEdit()
}
