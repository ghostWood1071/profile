
    function getHtmlPage(){
        $("i.fas.fa-upload").remove();
        $(".label-file-img.btn.btn-danger").remove();

        $("body").removeAttr("id");
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
            $('a.new').parent().remove()
        }
    
        //check tearch element
        var check_graduate = Check_Element_Empty($('.teaching .graduate'))
        var check_university = Check_Element_Empty($('.teaching .undergraduate'))
        if (check_graduate && check_university){
            $('.teaching').remove()
            $('a.teaching').parent().remove()
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
                $('a.thesis').parent().remove()
            }
    
        //check grants element
        if(Check_Element_Empty($('.research-grant'))){
            $('.research-grant').remove()
            $('a.grant').parent().remove()
        }
    
        //check publications element
        var check_book = Check_Element_Empty($('.publication .publication-book'))
        var check_paper = Check_Element_Empty($('.publication .publication-detail'))
        if (check_book && check_paper){
            $('.publication').remove()
            $('a.publication').parent().remove()
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
        
        //remove btn-submit
        $('.btn-submit').remove()
        if ($('.footer').html() == '')
            $('.footer').remove()
        var html = '<!DOCTYPE html>\n <html> \n'
        html += $('html').html()+"\n </html>";
        return html
    }
    function Check_Element_Empty(element){
        var list_group = $(element).find('.list-group')[0]
        if ($(list_group).children().length == 0)
            return true
        return false
    }
    
    function loadCKEDITOR() {
        for(selector in CKEDITOR.instances)
        {
            CKEDITOR.instances[selector].destroy(true);
        }
    }
    
    removeEditTools = () => {
        $('body').removeAttr('id');
        $('[contentEditable = "true"]').removeAttr('contentEditable');
        $('[draggable = "true"]').removeAttr('draggable');
        $('.fa-arrows-alt, .fa-trash-alt, .fa-plus, .nav-img-upload, .label-file-img, .pub-chosen-right, .success-wrapper, .mood-wrapper, .theme-setting, .footer, .submit').remove();
        $('script').each(function(ind, el) {
            if($(el).attr('src') == 'https://cdn.jsdelivr.net/npm/jquery-sortablejs@latest/jquery-sortable.js'
            || $(el).attr('src') == 'https://unpkg.com/sortablejs-make/Sortable.min.js'
            || $(el).attr('src') == '/ckeditor/ckeditor.js') {
                $(el).remove();
            }
        })
        loadCKEDITOR();
    }
    
    function getGuessHtml(){
        removeEditTools();
        return getHtmlPage();
    }    
