//remove space
function ignoreDoubleSpaces(string) {
    return string.replace(/ {2,}/g, ' ').trim();
}
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


    var name = getDataByID('name');

    var position = getDataByID('position')

    var work = getChildsDataAndLinkByID1('work',1,1)

    var contact = getChildsDataByID('contact',1,0);
    contact[3]=contact[3].trim();
    contact[3]=contact[3].split('\n');
    for(var i = 0 ; i<contact[3].length;i++){
        contact[3][i]=contact[3][i].trim();
    }
    var research_interests =getChildsDataByID('sortlist1',1,0)
    //
    var academicItemName = getDataByClassName('academic-item-name');
    var academicItemLocation = getDataByClassName('academic-item-location');
    var academicLevel = getDataByClassName('academic-level');
    var academicDescription= getDataByClassName('academic-description');
    var academicItemTime= getDataByClassName('academic-item-time');
    var academic =[]
    if(academicItemName.length!=0){
        var count=academicItemName.length;
    }
    for(var i = 0 ; i <count;i++){
        academic.push([academicItemName[i],academicItemLocation[i],academicLevel[i],academicDescription[i],academicItemTime[i]])
    }
    
    //
    var teachingYear=getDataByClassName('teaching-year');
    var teaching_content=getDataByClassNameHaveChilds('teaching-content')
    var teaching=[]
    for( var i = 0 ; i<teachingYear.length;i++){
        teaching.push([teachingYear[i],teaching_content[i]])
    }
    //


    thesis_link=getChildsDataAndLinkByID2('sortlist3',1);
    thesis_name=getDataByClassName('thesis-year')
    thesis_content=getDataByClassNameHaveChilds('thesis-content')
    thesis=[]
    thesis.push(thesis_link,[thesis_name,thesis_content])

    
    //
    research=getDataByClassNameHaveChilds('grant-list')
    //


    publication=[]
    publication_year=getDataByClassName('publication-year')
    publication_content=getDataByClassNameHaveChilds('publication-content')
    publication.push(publication_year,publication_content)
    //
    
    console.log(publication);









    // console.log(name);
    // console.log(position);
    //console.log(work);
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
     mail=`["`+contact[3][0]+`","`+contact[3][1]+`"]`
     
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
    for(var i = 0 ;i<research[0].length;i++){
        research_content+=`"`+research[0][i]+`",`
    }
    research_content=research_content.substring(0,research_content.length-1);   


    var count = publication[0].length;
    var pub = "";
    for(var i =0 ; i <count ; i++){
        var pub_content="";
        for(var k = 0 ; k < publication[1][i].length;k++){
            pub_content+=`"`+publication[1][i][k]+`",`
        }
        pub_content=pub_content.substring(0,pub_content.length-1)
        pub +=`{
        "year": "`+publication[0][i]+`",
        "content": [`+pub_content+`]
        },`
    }
    pub=pub.substring(0,pub.length-1);

    console.log(pub);
    json_String=`
    "about":{
        "name": "`+name+`",
        "level":"`+position+`",
        "university": [
            `+university+`
        ]
        "address":"`+address+`",
        "phone": "`+phone+`",
        "fax": "`+fax+`",
        "mail": "`+mail+`",
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
    "publications":[
        `+pub+`
    ]
    `
    console.log(json_String);

//Save
function Save(){
    
}


