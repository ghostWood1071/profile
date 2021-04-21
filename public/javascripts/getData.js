//remove space
function ignoreDoubleSpaces(string) {
    return string.replace(/ {2,}/g, ' ').trim();
}
//replace all
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
//id:id , indexOfChild1: First child work with, indexOfDatas: Index of child Of each child of indexOfChild1 to get data and link
function getChildsDataAndLinkByID1(id,indexOfChild1,indexOfDatas){
    var result=[];
    if(document.getElementById(id)!=null){
        var childs = document.getElementById(id).children[indexOfChild1].children
        for (var i=0; i < childs.length; i++) {
            result.push([childs[i].children[indexOfDatas].textContent,childs[i].children[indexOfDatas].getElementsByTagName('a')[0].href]);
        }
    }
    
    return result;
}
//id:id, indexOfDatas: Index of child to get data and link
function getChildsDataAndLinkByID2(id,indexOfDatas){
    var result=[];
    if(document.getElementById(id)!=null){
        var childs = document.getElementById(id).children
        for (var i=0; i < childs.length; i++) {
            result.push([childs[i].children[indexOfDatas].textContent,childs[i].children[indexOfDatas].getElementsByTagName('a')[0].href]);
        }
    }
    return result;
}
//id:id , indexOfChild1: First child work with, indexOfDatas: Index of child Of each child of indexOfChild1 to get data
function getChildsDataByID(id,indexOfChild1,indexOfDatas){
    var result=[];
    if(document.getElementById(id) !=null){
        var childs = document.getElementById(id).children[indexOfChild1].children
        for (var i=0; i < childs.length;i++) {
            result.push(ignoreDoubleSpaces(childs[i].children[indexOfDatas].textContent));
        }
    }
    return result;
}
//id:id , indexOfDatas: Index of child to get data
function getChildsDataByID(id,indexOfDatas){
    var result=[];
    if(document.getElementById(id) !=null){
        var childs =document.getElementById(id).children;
        for (var i=0; i < childs.length; i++) {
            result.push(childs[i].children[indexOfDatas].textContent);
        }
    }
    return result;
}
function getDataByID(id){
    if(document.getElementById(id) !=null){
        return ignoreDoubleSpaces(document.getElementById(id).textContent)
    }
}
function getDataByClassName(className) {
    var result =[]
    if(document.getElementsByClassName(className)!=null){
        childs=document.getElementsByClassName(className)
        for(var i=0;i<childs.length;i++){
            result.push(ignoreDoubleSpaces(childs[i].textContent))
        }
    }
    return result;
}
function getDataByClassNameHaveChilds(className) {
    var result =[]
    if(document.getElementsByClassName(className)!=null){
        childs=document.getElementsByClassName(className)
        for(var i=0;i<childs.length;i++){
            tmp=[]
            for(var k=0;k<childs[i].children.length;k++){
                tmp.push(ignoreDoubleSpaces(childs[i].children[k].textContent))
            }
            result.push(tmp)
        }
    }
    return result;
}


//test

/*
var value =desc.trim()
value=value.replaceAll('"',"|")
var str='{"data_'+parseInt(id)+'":"'+value+'"}';
str = str.replace(/\s/g, '');
var data=JSON.parse(str)
console.log(data.data_2017);
string = data.data_2017;
document.getElementById(id+'_content').innerHTML = string;
*/
    var picture=$('#avatar-img')[0].getAttribute("src");
    var name = $(".name")[0].textContent;
    var position = $(".position")[0].textContent;
    var work = [];
    for (let index = 0; index < $("#group1 div div").length; index++) {
        const element = $("#group1 div div")[index];
        work.push([ignoreDoubleSpaces(element.textContent),element.getElementsByTagName('a')[0].getAttribute("href")]);
    }
    var contact =[];
    for (let index = 0; index < $(".contact div div").length; index++) {
        const element = $(".contact div div")[index];
        contact.push([element.textContent])
    }
    contact[3][0]=contact[3][0].trim();
    contact[3][0]=contact[3][0].split('\n');
    for (let index = 0; index < contact[3][0].length; index++) {
        contact[3][0][index]=contact[3][0][index].trim();
    }
    var research_interests=[]
    for (let index = 0; index < $('#group2 div div').length; index++) {
        const element = $('#group2 div div')[index];
        research_interests.push(element.textContent);
    }
    var academic =[]
    var academicItemName = []
    var academicItemLocation = []
    var academicLevel = []
    var academicDescription= []
    var academicItemTime= []
    for (let index = 0; index < $('#group3 div div').length; index++) {
        const element = $('#group3 div div')[index];
        if(index%5==0)
            academicItemTime.push(ignoreDoubleSpaces(element.textContent))
        if(index%5==1)
            academicItemName.push(ignoreDoubleSpaces(element.textContent))
        if(index%5==2)
            academicItemLocation.push(ignoreDoubleSpaces(element.textContent))
        if(index%5==3)
            academicLevel.push(ignoreDoubleSpaces(element.textContent))
        if(index%5==4)
            academicDescription.push(ignoreDoubleSpaces(element.textContent)) 
    }
    for(var i = 0 ; i <academicItemTime.length;i++){
        academic.push([academicItemTime[i],academicItemName[i],academicItemLocation[i],academicLevel[i],academicDescription[i]])
    }
    

    teaching=[]
    //
    var teachingYear=getDataByClassName('teaching-year');
    var teaching_content=getDataByClassNameHaveChilds('teaching-content')
    var teaching=[]
    for( var i = 0 ; i<teachingYear.length;i++){
        teaching.push([teachingYear[i],teaching_content[i]])
    }
    //
    var thesis_link=[]
    for (let index = 0; index < $('.thesis-link div').length; index++) {
        const element = $('.thesis-link div')[index];
        thesis_link.push([ignoreDoubleSpaces(element.textContent),element.getElementsByTagName('a')[0].getAttribute("href")]);
    }
    thesis_name=[]
    for (let index = 0; index < $('.thesis-name div').length; index++) {
        const element = $('.thesis-name div')[index];
        thesis_name.push(element.textContent)
    }
    thesis_content=getDataByClassNameHaveChilds('thesis-content')
    thesis=[]
    thesis.push(thesis_link,[thesis_name,thesis_content])  
    //
    research=[];
    for (let index = 0; index < $('#group5 div div').length; index++) {
        const element = $('#group5 div div')[index];
        research.push(element.textContent);
    }
    //
    book=[]
    for (let index = 0; index < $('#group6 div div').length; index++) {
        const element = $('#group6 div div')[index];
        book.push(element.textContent);
    }
    paper=[]
    publication_name=[]
    for (let index = 0; index < $('.publication-name div').length; index++) {
        const element = $('.publication-name div')[index];
        publication_name.push(element.textContent)
    }
    publication_content=getDataByClassNameHaveChilds('publication-content')
    paper.push(publication_name,publication_content)
    //
    

     var university ="";
     for(var i = 0 ; i<work.length;i++){
        university+=`{
            "name": "`+work[i][0]+`",
            "link": "`+work[i][1]+`"
        },`
     }
     university=university.substring(0,university.length-1);
     //console.log(contact);   

     address=contact[0];
     phone=contact[1];
     fax=contact[2];
     mail=`["`+contact[3][0][0]+`","`+contact[3][0][1]+`"]`
     
     research_int="[";
     for(var i = 0 ; i<research_interests.length;i++){
         research_int+=`"`+research_interests[i]+`",`
     }
     research_int=research_int.substring(0,research_int.length-1);
     research_int+="]";
     
     //console.log(research);


     academic_s=``;
     for(var i = 0;i<academic.length;i++){
        academic_s+=`{
            "university": "`+academic[i][0]+`",
          "location": "`+academic[i][1]+`",
          "level": "`+academic[i][2]+`",
          "descript": "`+academic[i][3]+`",
          "time": "`+academic[i][4]+`"
        },`
     }
     academic_s=academic_s.substring(0,academic_s.length-1);
     //console.log(academic);
     //console.log(teaching);


     teaching_s="";
     for(var i =0 ; i<teaching.length;i++){
         var course = "[";
         for(var k = 0 ; k <teaching[i][1].length;k++){
             course+=`"`+teaching[i][1][k]+`",`
         }
         course=course.substring(0,course.length-1);
         course+=`]`;
         teaching_s+=`{
            "year": "`+teaching[i][0]+`",
            "course": `+course+`
         },`
     }
     teaching_s=teaching_s.substring(0,teaching_s.length-1);



     
     var count =thesis[0].length
     var link="[";
     for(var i = 0 ; i <count;i++){
         link+=`{
             "name" : "`+thesis[0][i][0]+`",
             "address" : "`+thesis[0][i][1]+`"
         },`
     }
     link=link.substring(0,link.length-1);
     link+=`]`
     //console.log(link);

     //console.log(thesis[1]);
     var content =`[`
    var count =thesis[1][0].length;
    for(var i = 0 ; i < count ; i ++){
        var list_content="";
        for(var k =0; k < thesis[1][1][i].length;k++){
            list_content+=`"`+thesis[1][1][i][k]+`",`
        }
        list_content=list_content.substring(0,list_content.length-1);
        content+=`{
            "name": "`+thesis[1][0][i]+`",
            "list-content": [`+list_content+`]
        },`
    }
    content=content.substring(0,content.length-1);
    content+=`]`
    //console.log(content);
    research_content="";
    for(var i = 0 ;i<research.length;i++){
        research_content+=`"`+research[i]+`",`
    }
    research_content=research_content.substring(0,research_content.length-1);   

    var paper_s=""
    for(var i = 0 ; i < paper[0].length;i++){
        content_s=""
        for( var k = 0 ; k < paper[1][i].length;k++){
            content_s+=`"`+paper[1][i][k]+`",`
        }
        content_s=content_s.substring(0,content_s.length-1);
        paper_s+=`{
            "name": "`+paper[0][i]+`",
            "content": [`+content_s+`]
        },`
    }
    paper_s=paper_s.substring(0,paper_s.length-1)
    book_s=""
    for(var i=0;i<book.length;i++){
        book_s+=`"`+book[i]+`",`
    }
    book_s=book_s.substring(0,book_s.length-1)

    json_String=`[{
    "template": "template2",
    "login": {
        "account": "quyetthang",
        "pass": "12345"
    },
    "avatar": "`+picture+`",
    "about":{
        "name": "`+name+`",
        "level":"`+position+`",
        "university": [
            `+university+`
        ],
        "address":"`+address+`",
        "phone": "`+phone+`",
        "fax": "`+fax+`",
        "mail": `+mail+`
    },
    "research_interests": `+research_int+`,
    "academic": `+academic_s+`,
    "teaching": `+teaching_s+`,
    "thesis": {
        "link": `+link+`,
        "content": `+content+`
    },
    "research_grant":{
        "content" :[`+research_content+`]
    },
    "publications":{
        "book":[`+book_s+`],
        "paper":[
            `+paper_s+`
        ]
    }
}]`

    console.log(JSON.parse(json_String));
//**************************************************************************************************** */
//Save
function Save(){
    var picture=$('#avatar-img')[0].getAttribute("src");
    var name = $(".name")[0].textContent;
    var position = $(".position")[0].textContent;
    var work = [];
    for (let index = 0; index < $("#group1 div div").length; index++) {
        const element = $("#group1 div div")[index];
        work.push([ignoreDoubleSpaces(element.textContent),element.getElementsByTagName('a')[0].getAttribute("href")]);
    }
    var contact =[];
    for (let index = 0; index < $(".contact div div").length; index++) {
        const element = $(".contact div div")[index];
        contact.push([element.textContent])
    }
    contact[3][0]=contact[3][0].trim();
    contact[3][0]=contact[3][0].split('\n');
    for (let index = 0; index < contact[3][0].length; index++) {
        contact[3][0][index]=contact[3][0][index].trim();
    }
    var research_interests=[]
    for (let index = 0; index < $('#group2 div div').length; index++) {
        const element = $('#group2 div div')[index];
        research_interests.push(element.textContent);
    }
    var academic =[]
    var academicItemName = []
    var academicItemLocation = []
    var academicLevel = []
    var academicDescription= []
    var academicItemTime= []
    for (let index = 0; index < $('#group3 div div').length; index++) {
        const element = $('#group3 div div')[index];
        if(index%5==0)
            academicItemTime.push(ignoreDoubleSpaces(element.textContent))
        if(index%5==1)
            academicItemName.push(ignoreDoubleSpaces(element.textContent))
        if(index%5==2)
            academicItemLocation.push(ignoreDoubleSpaces(element.textContent))
        if(index%5==3)
            academicLevel.push(ignoreDoubleSpaces(element.textContent))
        if(index%5==4)
            academicDescription.push(ignoreDoubleSpaces(element.textContent)) 
    }
    for(var i = 0 ; i <academicItemTime.length;i++){
        academic.push([academicItemTime[i],academicItemName[i],academicItemLocation[i],academicLevel[i],academicDescription[i]])
    }
    

    teaching=[]
    //
    var teachingYear=getDataByClassName('teaching-year');
    var teaching_content=getDataByClassNameHaveChilds('teaching-content')
    var teaching=[]
    for( var i = 0 ; i<teachingYear.length;i++){
        teaching.push([teachingYear[i],teaching_content[i]])
    }
    //
    var thesis_link=[]
    for (let index = 0; index < $('.thesis-link div').length; index++) {
        const element = $('.thesis-link div')[index];
        thesis_link.push([ignoreDoubleSpaces(element.textContent),element.getElementsByTagName('a')[0].getAttribute("href")]);
    }
    thesis_name=[]
    for (let index = 0; index < $('.thesis-name div').length; index++) {
        const element = $('.thesis-name div')[index];
        thesis_name.push(element.textContent)
    }
    thesis_content=getDataByClassNameHaveChilds('thesis-content')
    thesis=[]
    thesis.push(thesis_link,[thesis_name,thesis_content])  
    //
    research=[];
    for (let index = 0; index < $('#group5 div div').length; index++) {
        const element = $('#group5 div div')[index];
        research.push(element.textContent);
    }
    //
    book=[]
    for (let index = 0; index < $('#group6 div div').length; index++) {
        const element = $('#group6 div div')[index];
        book.push(element.textContent);
    }
    paper=[]
    publication_name=[]
    for (let index = 0; index < $('.publication-name div').length; index++) {
        const element = $('.publication-name div')[index];
        publication_name.push(element.textContent)
    }
    publication_content=getDataByClassNameHaveChilds('publication-content')
    paper.push(publication_name,publication_content)
    //
    

     var university ="";
     for(var i = 0 ; i<work.length;i++){
        university+=`{
            "name": "`+work[i][0]+`",
            "link": "`+work[i][1]+`"
        },`
     }
     university=university.substring(0,university.length-1);
     //console.log(contact);   

     address=contact[0];
     phone=contact[1];
     fax=contact[2];
     mail=`["`+contact[3][0][0]+`","`+contact[3][0][1]+`"]`
     
     research_int="[";
     for(var i = 0 ; i<research_interests.length;i++){
         research_int+=`"`+research_interests[i]+`",`
     }
     research_int=research_int.substring(0,research_int.length-1);
     research_int+="]";
     
     //console.log(research);


     academic_s=``;
     for(var i = 0;i<academic.length;i++){
        academic_s+=`{
            "university": "`+academic[i][0]+`",
          "location": "`+academic[i][1]+`",
          "level": "`+academic[i][2]+`",
          "descript": "`+academic[i][3]+`",
          "time": "`+academic[i][4]+`"
        },`
     }
     academic_s=academic_s.substring(0,academic_s.length-1);
     //console.log(academic);
     //console.log(teaching);


     teaching_s="";
     for(var i =0 ; i<teaching.length;i++){
         var course = "[";
         for(var k = 0 ; k <teaching[i][1].length;k++){
             course+=`"`+teaching[i][1][k]+`",`
         }
         course=course.substring(0,course.length-1);
         course+=`]`;
         teaching_s+=`{
            "year": "`+teaching[i][0]+`",
            "course": `+course+`
         },`
     }
     teaching_s=teaching_s.substring(0,teaching_s.length-1);



     
     var count =thesis[0].length
     var link="[";
     for(var i = 0 ; i <count;i++){
         link+=`{
             "name" : "`+thesis[0][i][0]+`",
             "address" : "`+thesis[0][i][1]+`"
         },`
     }
     link=link.substring(0,link.length-1);
     link+=`]`
     //console.log(link);

     //console.log(thesis[1]);
     var content =`[`
    var count =thesis[1][0].length;
    for(var i = 0 ; i < count ; i ++){
        var list_content="";
        for(var k =0; k < thesis[1][1][i].length;k++){
            list_content+=`"`+thesis[1][1][i][k]+`",`
        }
        list_content=list_content.substring(0,list_content.length-1);
        content+=`{
            "name": "`+thesis[1][0][i]+`",
            "list-content": [`+list_content+`]
        },`
    }
    content=content.substring(0,content.length-1);
    content+=`]`
    //console.log(content);
    research_content="";
    for(var i = 0 ;i<research.length;i++){
        research_content+=`"`+research[i]+`",`
    }
    research_content=research_content.substring(0,research_content.length-1);   

    var paper_s=""
    for(var i = 0 ; i < paper[0].length;i++){
        content_s=""
        for( var k = 0 ; k < paper[1][i].length;k++){
            content_s+=`"`+paper[1][i][k]+`",`
        }
        content_s=content_s.substring(0,content_s.length-1);
        paper_s+=`{
            "name": "`+paper[0][i]+`",
            "content": [`+content_s+`]
        },`
    }
    paper_s=paper_s.substring(0,paper_s.length-1)
    book_s=""
    for(var i=0;i<book.length;i++){
        book_s+=`"`+book[i]+`",`
    }
    book_s=book_s.substring(0,book_s.length-1)

    json_String=`[{
    "template": "template2",
    "login": {
        "account": "quyetthang",
        "pass": "12345"
    },
    "avatar": "`+picture+`",
    "about":{
        "name": "`+name+`",
        "level":"`+position+`",
        "university": [
            `+university+`
        ],
        "address":"`+address+`",
        "phone": "`+phone+`",
        "fax": "`+fax+`",
        "mail": `+mail+`
    },
    "research_interests": `+research_int+`,
    "academic": `+academic_s+`,
    "teaching": `+teaching_s+`,
    "thesis": {
        "link": `+link+`,
        "content": `+content+`
    },
    "research_grant":{
        "content" :[`+research_content+`]
    },
    "publications":{
        "book":[`+book_s+`],
        "paper":[
            `+paper_s+`
        ]
    }
}]`

    return JSON.parse(json_String);
}