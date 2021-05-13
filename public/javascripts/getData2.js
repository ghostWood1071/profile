
var getTemplateName  = function(){ 
    return $('#template').text()
};
var getBackGroundColor = function(){
    return $('html').css('--primary-background');
}

var getColor = function(){
    return $('html').css('--primary-color');
}
var getAvatar = function(){
    return $('.avatar img').attr('src');
}

var getAbout = function(){
    var name = $('#about .name').text();
    var position = $('#about .position').text();
    var eduElement = $('#about .education .hover');
    var educations = [];
    for(var i = 0; i<eduElement.length; i++){
        educations.push($(eduElement[i]).find(".list-group-item p").html().trim());
    }

    var contactTag = $('.contact');
    var address = $(contactTag).find('.list-group-item p')[0].innerHTML.trim();
    var phone = $(contactTag).find('.list-group-item p')[1].innerHTML.trim();
    var fax = $(contactTag).find('.list-group-item p')[2].innerHTML.trim();
    var mail = $(contactTag).find('.list-group-item p')[3].innerHTML.trim().split(';');

    return {
        'name': name,
        'level': position,
        'university': educations,
        'address': address,
        'phone': phone,
        'fax': fax,
        'mail': mail
    }
}

var getResearchInterest = function(){
    var researchTag = $('.research .hover');
    var research_interest = [];
    for(var i = 0; i<researchTag.length; i++){
        research_interest.push($(researchTag[i]).find(".list-group-item p").html().trim());
    }
    return research_interest;
}

var getAcademic = function(){
    var academicTag = $('.academic-item');
    var academic_record = [];
    for(var i = 0; i<academicTag.length; i++){
        var academicItem = academicTag[i];
        var item = {
            "university":$(academicItem).find(".academic-item-name").text().trim(),
            "location": $(academicItem).find(".academic-item-location").text().trim(),
            "level": $(academicItem).find(".academic-level").text().trim(),
            "time": $(academicItem).find(".academic-item-time").text().trim(),
            "descript": $(academicItem).find(".academic-description").text().trim()
        }
        academic_record.push(item);
    }
    return academic_record;
}

var getTeaching = function(){
    var teachingTag = $('.teaching .list-group');
    var academicYear =  $(teachingTag).find(".list-group-item.teaching-year").text().trim();
    var graduateTag = $('.graduate .list-group .hover');
    var graduate = [];
    for(var i = 0; i<graduateTag.length; i++){
        graduate.push($(graduateTag[i]).find(".list-group-item p").html().trim());
    }

    var unGraduateTag = $('.undergraduate .list-group .hover');
    var unGraduate = [];
    for(var i  = 0; i<unGraduateTag.length; i++){
        unGraduate.push($(unGraduateTag[i]).find(".list-group-item p").html().trim());
    }

    var teaching = {
        "academic_year": academicYear,
        "graduate_course": graduate,
        "undergraduate_courses": unGraduate
    }
    return teaching;
}

var getThesis = function(){
    var linkTag = $('.thesis .thesis-tag .hover');
    var links = [];
    for(var i = 0; i< linkTag.length; i++){
        links.push($(linkTag).find(".list-group-item p").html().trim());
    }

    var thesisItemTag = $('.thesis-item');
    var thesisItem =[];
    for(var i = 0; i<thesisItemTag.length; i++){
        var name = $(thesisItemTag[i]).find('.thesis-name').html().trim();
        var contentTag = $(thesisItemTag[i]).find('.list-group .hover');
        var list = []
        for(var j = 0; j<contentTag.length; j++){
            list.push($(contentTag[j]).find('.list-group-item p').html().trim())
        }
        thesisItem.push({
            'name': name,
            'list_content': list
        })
    }
    
    return {
        'link': links,
        'content': thesisItem
    }
    
}

var getResearchGrant = function(){
    var researchGrantTag = $('.research-grant list-group .hover');
    var researchGrant = [];
    for(var i = 0; i<researchGrantTag.length; i++){
        researchGrant.push($(researchGrantTag[i]).find(".list-group-item p").html().trim());
    }
    return researchGrant;
}

var getPublication = function(){
    var bookTag = $('.publication-book .list-group .hover');
    var books = []
    for(var i = 0; i<bookTag.length; i++){
        content=$(bookTag[i]).find(".list-group-item p").html().trim();
        if($(bookTag[i]).find("input").length=0)
            link="";
        else{
            link=$(bookTag[i]).find("input")[0].value;
        }
        books.push({
            'content': content,
            'link': link
        })
    }

    var paperTag = $('#publications .container-drag')
    var papers = [];
    for(var i = 0; i<paperTag.length; i++){
        var name = $(paperTag[i]).find('.title div').text().trim();
        var contentTag  = $(paperTag[i]).find(".list-group .hover");
        var contents = [];
        for(var j = 0; j<contentTag.length; j++){
            contents.push($(contentTag[j]).find(".list-group-item p").html().trim());
        }
        papers.push({
            'name': name,
            'content': contents
        });
    }

    return {
        'book': books,
        'paper': papers
    }
}


function Save(){

        var data ={ 
            'template':{
                'name': getTemplateName(),
                'color': getColor(),
                'background_color': getBackGroundColor()
            },
            'avatar': getAvatar(),
            'about': getAbout(),
            'research_interests': getResearchInterest(),
            'academic': getAcademic(),
            'teaching': getTeaching(),
            'thesis': getThesis(),
            'research_grant': getResearchGrant(),
            'publications': getPublication()
        };
    
    console.log($("#file").data())
    $.post("users", {'content': JSON.stringify(data)},
        function (dt, textStatus, jqXHR) {
            //alert(dt);
            //window.location.reload();
            console.log(dt);
        }
    );
}



