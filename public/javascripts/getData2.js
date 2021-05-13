
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
    return $('#about .avatar img').attr('src');
}

var getAbout = function(){
    var name = $('#about .about-right  h3 .name').text();
    var position = $('#about .about-right .position').text();
    var eduElement = $('#about .about-right .education .hover');
    var educations = [];
    for(var i = 0; i<eduElement.length; i++){
        educations.push($(eduElement[i]).find(".list-group-item p").html().trim());
    }

    var contactTag = $('.wrap-address .list-group .contact-group');
    var address = $(contactTag[0]).find('.list-group-item p').html().trim();
    var phone = $(contactTag[1]).find('.list-group-item p').html().trim();
    var fax = $(contactTag[2]).find('.list-group-item p').html().trim();
    var mail = $(contactTag[3]).find('.list-group-item p').html().trim().split(';');

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
    var researchTag = $('.research #group2 .hover');
    var research_interest = [];
    for(var i = 0; i<researchTag.length; i++){
        research_interest.push($(researchTag[i]).find(".list-group-item p").html().trim());
    }
    return research_interest;
}

var getAcademic = function(){
    var academicTag = $('.academic-record #group3 .hover .d-flex');
    var academic_record = [];
    for(var i = 0; i<academicTag.length; i++){
        var academicItem = academicTag[i];
        var info = $(academicItem).find(".col-9");
        var item = {
            "university":$(info).find("h4").text().split(",")[0].trim(),
            "location": $(info).find("h4").text().split(",")[1].trim(),
            "level": $(info).find(".academic-level p").html().trim(),
            "time": $(academicItem).find(".col-3 .academic-item-time p").html().trim(),
            "descript": $(info).find(".academic-description p").html().trim()
        }
        academic_record.push(item);
    }
    return academic_record;
}

var getTeaching = function(){
    var teachingTag = $('.teaching .list-group');
    var academicYear =  $(teachingTag).find(".wrap-year .list-group-item h4").html().trim();
    var graduateTag = $('.teaching .list-group .graduate .list-group .hover');
    var graduate = [];
    for(var i = 0; i<graduateTag.length; i++){
        graduate.push($(graduateTag[i]).find(".list-group-item p").html().trim());
    }

    var unGraduateTag = $('.teaching .list-group .university .list-group .hover');
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
    var linkTag = $('.content-thesis #group6 .hover');
    var links = [];
    for(var i = 0; i< linkTag.length; i++){
        links.push($(linkTag).find(".list-group-item p").html().trim());
    }

    var thesisItemTag = $('.thesis-item');
    var thesisItem =[];
    for(var i = 0; i<thesisItemTag.length; i++){
        var name = $(thesisItemTag[i]).find('.title h5').html().trim();
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
    var researchGrantTag = $('.research-grant #group10 .hover');
    var researchGrant = [];
    for(var i = 0; i<researchGrantTag.length; i++){
        researchGrant.push($(researchGrantTag[i]).find(".list-group-item p").html().trim());
    }
    return researchGrant;
}

var getPublication = function(){
    var bookTag = $('#publications #group11 .hover');
    var books = []
    for(var i = 0; i<bookTag.length; i++){
        books.push($(bookTag[i]).find(".list-group-item p").html().trim())
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



