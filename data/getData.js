//remove space
function ignoreSpaces(string) {
    var temp = "";
    string = '' + string;
    splitstring = string.split(" ");
    for(i = 0; i < splitstring.length; i++)
    temp += splitstring[i];
    return temp.trim();
}
//id:id , childWorkWith: First child work with, indexOfChilds: Index of child Of each child of childWorkWith
function getChildsDataAndLinkByID(id,indexOfChild1,indexOfDatas){
    var result=[];
    if(document.getElementById(id)!=null){
        var childs = document.getElementById(id).children[indexOfChild1].children
        for (var i=0; i < childs.length; i++) {
            result.push([childs[i].children[indexOfDatas].textContent,childs[i].children[indexOfDatas].getElementsByTagName('a')[0].href]);
        }
    }
    
    return result;
}
function getChildsDataByID(id,indexOfChild1,indexOfDatas){
    var result=[];
    if(document.getElementById(id) !=null){
        var childs = document.getElementById(id).children[indexOfChild1].children
        for (var i=0; i < childs.length;i++) {
            result.push(ignoreSpaces(childs[i].children[indexOfDatas].textContent));
        }
    }
    return result;
}
function getChildsDataByID(id,indexOfDatas){
    var result=[];
    if(document.getElementById(id) !=null){
        var childs =document.getElementById(id).children;
        for (var i=0; i < childs.length; i++) {
            result.push(ignoreSpaces(childs[i].children[indexOfDatas].textContent));
        }
    }
    return result;
}
function getDataByID(id){
    if(document.getElementById(id) !=null){
        return ignoreSpaces(document.getElementById(id).textContent)
    }
}
function getDataByClassID(classID) {
    var result =[]
    childs=document.getElementsByClassName(classID)
    if(childs!=null){
        for(var i=0;i<childs.length;i++){
            result.push(childs[i].textContent)
        }
    }
    return result;
}
//test


    var name = getDataByID('name');

    var position = getDataByID('position')

    var work = getChildsDataAndLinkByID('work',1,1)

    var contact = getChildsDataByID('contact',1,0);
    contact[3]=contact[3].split('\n')

    var research =getChildsDataByID('sortlist1',1,0)

    var academicItemName = getDataByClassID('academic-item-name');
    var academicItemLocation = getDataByClassID('academic-item-location');
    var academicLevel = getDataByClassID('academic-level');
    var academicDescription= getDataByClassID('academic-description');
    var academicItemTime= getDataByClassID('academic-item-time');
    var academic =[]
    for(var i = 0 ; i < document.getElementsByClassName("academic-item").length;i++){
        academic.push([academicItemName[i],academicItemLocation[i],academicLevel[i],academicDescription[i],academicItemTime[i]])
    }
    
    console.log(name);
    console.log(position);
    console.log(work);
    console.log(contact);   
    console.log(research);
    console.log(academic);
    //var contact = getChildsDataByID('contact',0,1,0,2)
//Save
function Save(){
    var name = getDataByID('name');
    var position = getDataByID('position')
    var work = getDataByID('work')
}
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

