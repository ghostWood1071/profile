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
    var about_String;
    var research_interests_String;
    var academic_String;
    var teaching_String;
    var thesis_String;
    var research_grant_String;
    var publications_String;

    about_String=''
    var name = getDataByID('name');

    var position = getDataByID('position')

    var work = getChildsDataAndLinkByID1('work',1,1)

    var contact = getChildsDataByID('contact',1,0);
    contact[3]=contact[3].split('\n')
    
    var research_interests =getChildsDataByID('sortlist1',1,0)
    //
    var academicItemName = getDataByClassName('academic-item-name');
    var academicItemLocation = getDataByClassName('academic-item-location');
    var academicLevel = getDataByClassName('academic-level');
    var academicDescription= getDataByClassName('academic-description');
    var academicItemTime= getDataByClassName('academic-item-time');
    var academic =[]
    academic.push(academicItemName,academicItemLocation,academicLevel,academicDescription,academicItemTime)
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
    thesis.push([thesis_link,[thesis_name,thesis_content]])
    //
    research=getDataByClassNameHaveChilds('grant-list')
    //
    publication=[]
    publication_year=getDataByClassName('publication-year')
    publication_content=getDataByClassNameHaveChilds('publication-content')
    publication.push(publication_year,publication_content)
    //console.log(publication)
    //console.log(name);
    //console.log(position);
    //console.log(work);
    //console.log(contact);   
    //console.log(research);    
    //console.log(academic);
    //console.log(teaching);
    //console.log(thesis);
    //console.log(research);

//Save
function Save(){
    var name = getDataByID('name');
    var position = getDataByID('position')
    var work = getDataByID('work')
}


