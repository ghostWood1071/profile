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
    if($("#file").val() === ""){
        var attr = $('.avatar img').attr('src');
        attr = attr.substr(attr.lastIndexOf("/")+1);
        console.log(attr);
        return attr;
    }
    else {
        
        var atts = getFileName($("#file").val());
        console.log(atts)
        return atts;
    }
  }
  
  var getAbout = function(){
    var name = $('#about .name').text();
    var position = $('#about .position').text();
    var eduElement = $('#about .education .hover');
    var educations = [];
    for(var i = 0; i<eduElement.length; i++){
        educations.push($(eduElement[i]).find(".list-group-item").text().trim());
    }
  
    var contactTag = $('.contact');
    
    var address = $(contactTag).find('.list-group-item')[0].textContent.trim()
    var phone = $(contactTag).find('.list-group-item')[1].textContent.trim()
    var fax = $(contactTag).find('.list-group-item')[2].textContent.trim()
    var mail = $(contactTag).find('.list-group-item')[3].textContent.trim().split(';');
  
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
        research_interest.push($(researchTag[i]).find(".list-group-item").text().trim());
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
  
  var getNew = function(){
      var name="";
      var content = []
      if($('#new').length=0){}
      else{
        var newTag = $('#new');
        var name = newTag.find('.title').text().trim();
        var contentNewTag=newTag.find('.hover');
        for (let i = 0; i < contentNewTag.length; i++) {
            const element = contentNewTag[i];
            content.push(element.textContent.trim());
        }
      }
      var newObj = {
          'name':name,
          'content':content
      }
      return newObj;
    } 
    console.log(getNew())
  var getTeaching = function(){
    var teachingTag = $('.teaching .list-group');
    var academicYear =  $(teachingTag).find(".list-group-item.teaching-year").text().trim();
    var graduateTag = $('.graduate .list-group .hover');
    var graduate = [];
    for(var i = 0; i<graduateTag.length; i++){
        graduate.push($(graduateTag[i]).find(".list-group-item").text().trim());
    }
  
    var unGraduateTag = $('.undergraduate .list-group .hover');
    var unGraduate = [];
    for(var i  = 0; i<unGraduateTag.length; i++){
        unGraduate.push($(unGraduateTag[i]).find(".list-group-item").text().trim());
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
        links.push($(linkTag[i]).find(".list-group-item").text().trim());
    }
  
    var thesisItemTag = $('.thesis-item');
    var thesisItem =[];
    for(var i = 0; i<thesisItemTag.length; i++){
        var name = $('.thesis-name')[i].textContent.trim();
        var contentTag = $(thesisItemTag[i]).find('.list-group .hover');
        var list = []
        for(var j = 0; j<contentTag.length; j++){
            list.push($(contentTag[j]).find('.list-group-item').text().trim())
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
    var researchGrantTag = $('.research-grant .list-group .hover');
    var researchGrant = [];
    for(var i = 0; i<researchGrantTag.length; i++){
        researchGrant.push($(researchGrantTag[i]).find(".list-group-item").text().trim());
    }
    return researchGrant;
  }
  
  function getFileName(s){
    var fileName = s.substr(s.lastIndexOf("\\")+1);
    return fileName;
  }
  
  var getPublication = function(){
    var publications=[];
    var bookTag = $('.publication-book .list-group .hover');
    var books = []
    for(var i = 0; i<bookTag.length; i++){
        content=$(bookTag[i]).find(".list-group-item").text().trim();
        books.push({
            'content': content
        })
    }
  
    var paperTag = $('.publication-name')
    var papers = [];
    for(var i = 0; i<paperTag.length; i++){
        var name = $($(paperTag)[i]).text().trim();
        var contentTag  = $($($(paperTag)[0]).siblings()).find('.hover');
        var contents = [];
        for(var j = 0; j<contentTag.length; j++){
            content=$(contentTag[j]).find(".list-group-item").text().trim()
            if(contentTag.find('input')[j]== null)
                link="";
            else{
                var fakePath = contentTag.find('input')[j].value;
                if(fakePath!="")
                    link= getFileName(fakePath);
                else link = "";
            }
            contents.push({
                'content':content,
                'link':link
            });
        }
        papers.push({
            'name': name,
            'contents': contents
        });
      }
      
    publications.push({
        'book': books,
        'paper': papers
    })
    return publications;
  }
  console.log(getPublication())
  
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
    
    console.log(data);
    // $.post("users", {'content': JSON.stringify(data)},
    //     function (dt, textStatus, jqXHR) {
    //         alert(dt);
    //         window.location.reload();
    //         console.log(dt);
    //     }
  
    // );
    var data = new FormData();
  
    $.each($("input"), function (i, fileInput) { 
         data.append('file-'+i,  $(fileInput).get(0).files[0])
         console.log($(fileInput).val())
    });
  
    // $.ajax({
    //     url: '/users/upfile',
    //     data: data,
    //     cache: false,
    //     contentType: false,
    //     processData: false,
    //     method: 'POST',
    //     type: 'POST', // For jQuery < 1.9
    //     success: function(data){
    //         alert(data);
    //     }
    // });
    console.log(getGuessHtml());
  }