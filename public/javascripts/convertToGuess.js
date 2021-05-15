function Check_Empty(){
    //check research-interest element
    if (Check_Element_Empty($('.research'))){
        $('.research').remove()
    }

    //check academic-record element
    if (Check_Element_Empty($('.academic_record'))){
        $('.academic_record').remove()
    }

    //check new element
    if (Check_Element_Empty($('#new'))){
        $('#new').remove()
    }

    //check tearch element
    var check_graduate = Check_Element_Empty($('#teach .graduate'))
    var check_university = Check_Element_Empty($('#teach .university'))
    if (check_graduate && check_university){
        $('#teach').remove()
    }   
    else if (check_graduate){
        $('#teach .graduate').remove()
    }
    else if (check_university){
        $('#teach .university').remove()
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
    if (Check_Element_Empty($('#publications'))){
        $('#publications').remove()
    }
    else{
        //check book element
        if (Check_Element_Empty($('#publications .publication-book'))){
            $('#publications .publication-book').remove()
        }

        //check paper element
        if (Check_Element_Empty($('#publications .publiccation-detail'))){
            $('#publications .publiccation-detail').remove()
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
    $('.fa-arrows-alt, .fa-trash-alt, .fa-plus, .chosen-file, .label-file, .pub-chosen-right').remove();
}

function Save(){
    Check_Empty()
    removeEdit()
}
