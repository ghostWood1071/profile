var navItem = Array.from(document.querySelectorAll('.nav-item'));
var navLink = Array.from(document.querySelectorAll('.nav-link'));

navItem.forEach(function(element, index){
    element.classList.remove('active');
    navLink[index].addEventListener('click', function(){
        removeAllClassActive();

        element.classList.add('active');
    })
})

navItem[0].classList.add('active');

window.addEventListener('scroll', function(){
    var nav = document.getElementsByTagName('nav')[0];
    nav.classList.toggle('sticky', window.scrollY > 0);
})

// Edit content
var edit = Array.from(document.getElementsByClassName('edit'));
var save = Array.from(document.getElementsByClassName('save'));

edit.forEach(function(element, index){
    element.addEventListener('click', function(){
        var item = Array.from(document.querySelectorAll('#group' + (index + 1) + ' .list-group-item'));
        var itemTable = Array.from(document.querySelectorAll('#table' + (index + 1) + ' tr td div'));
        var remove = document.querySelectorAll('#group' + (index + 1) + ' .remove');
        $(remove).attr('contentEditable', 'false');
        $(remove).addClass('show');
        $('.remove.show').html('Del');
        item.forEach((el, ind) => {
            el.setAttribute('contentEditable', 'true');
            $(remove[ind]).click(function (e) { 
                e.preventDefault();
                $(el).remove();
            });    
            $(item[ind]).click(function() {
                CKEDITOR.disableAutoInline = true;
                var instance = CKEDITOR.inline(item[ind], {
                    startupFocus: true
                });
                el.addEventListener('click', function(){
                //el.setAttribute('draggable', 'false'); 
                    // el.setAttribute('contentEditable', 'true');
                    // for(var i = 0; i < item.length; i++)
                    //     if(i !== ind)
                    //         item[i].classList.remove('cke_focus');

                })

            })
            // el.addEventListener('click', function(){
            //     //el.setAttribute('draggable', 'false'); 
            //     for(var i = 0; i < item.length; i++)
            //     if(i !== ind)
            //         item[i].setAttribute('contentEditable', 'false');
            // })
        })
        itemTable.forEach((el, ind) => {
            el.setAttribute('contentEditable', 'true');
            // el.addEventListener('click', function(){
            //     //el.setAttribute('draggable', 'false'); 
            //     for(var i = 0; i < itemTable.length; i++)
            //     if(i !== ind)
            //         itemTable[i].setAttribute('contentEditable', 'false');
            // })
        })
        save[index].classList.add('show');
        element.style.display = 'none';
        save[index].addEventListener('click', function(){
            $('#group' + (index + 1) + ' .list-group-item').attr('contentEditable', 'false');
            $('#table' + (index + 1) + ' tr td div').attr('contentEditable', 'false');
            $('#group' + (index + 1) + ' .remove').removeClass('show');
            element.style.display = 'inline-block';
            save[index].classList.remove('show');
        })
        
    })
})

// Scroll active menu
const sections = document.querySelectorAll('section');

onscroll = function(){
    var scrollPosition = document.documentElement.scrollTop;

    sections.forEach(section => {
        if(scrollPosition >= section.offsetTop - section.offsetHeight*0.25 &&
            scrollPosition < section.offsetTop + section.offsetHeight - section.offsetHeight*0.25){
            var currentId = section.attributes.id.value;
            removeAllClassActive();
            addClassActive(currentId);
        }
    })
}

removeAllClassActive = function(){
    document.querySelectorAll('.navbar-nav .nav-item').forEach(el => {
        el.classList.remove('active');
    })
}

addClassActive = function(current){
    var id = `[data-page='${current}']`;
    document.querySelector(id).classList.add('active');
}

// Drag and Drop Items
// const container_drags = document.querySelectorAll('.container-drag');
// const draggables = document.querySelectorAll('.draggable');

// draggables.forEach((element) => {
//     element.addEventListener('dragstart', () => {
//         element.classList.add('dragging');
//     })

//     element.addEventListener('dragend', () => {
//         element.classList.remove('dragging');
//     })
// })

// container_drags.forEach(container_drag => {
//     container_drag.addEventListener('dragover', e => {
//         e.preventDefault();
//         const dragAfter = getDragAfterElement(container_drag, e.clientY);
//         console.log(dragAfter)
//         const draggable = document.querySelector('.dragging');
    
//         if(dragAfter == null){
//             container_drag.appendChild(draggable);
//         }
//         else{
//             container_drag.insertBefore(draggable, dragAfter);
//         }
//     })

// })

// function getDragAfterElement(container, y){
//     const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
//     return draggableElements.reduce((closest, child) => {
//         const box = child.getBoundingClientRect();
//         const offset = y - box.top - box.height / 2;

//         if(offset < 0 && offset > closest.offset)
//             return {offset: offset, element: child }
//         else
//             return closest
//     }, {offset: Number.NEGATIVE_INFINITY}).element
// }



$('#group4, #group3').sortable({
    animation: 150,
    group: 'list'
})

$('#table5 tr').sortable({
    multiDrag: true,
    selectedClass: 'selected',
    group: 'list'
})

function getData(){
    
}

