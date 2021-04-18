var navItem = Array.from(document.querySelectorAll('.nav-item'));
var navLinks = Array.from(document.querySelectorAll('.nav-link'));

navItem.forEach(function(element, index){
    element.classList.remove('active');
    navLinks[index].addEventListener('click', function(){
        removeAllClassActive();
        element.classList.add('active');
    })
})

navItem[0].classList.add('active');

window.addEventListener('scroll', function(){
    var nav = document.getElementsByTagName('nav')[0];
    var y = scrollY;
    if(y > 0 ){
        nav.classList.add('sticky')
    }
})

window.addEventListener("scroll", () => {
    let current = sections[0].getAttribute('id');
  
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    $('.nav-link').each(function(element){
        var text = $(this).attr('href');
        if(!current) $('[data-page="about"]').addClass('active')
        if(`#${current}` == text){
            $(this).parent().addClass('active');
        }
        else
            $(this).parent().removeClass('active');
    })
  });

// Edit content
var templates = [];
document.querySelectorAll('.list-group:not(#group1, .education) .hover:first-child').forEach(el => {
    templates.push(el.innerHTML);
})

var item = Array.from(document.querySelectorAll('.list-group-item'));
$('.fa-custom-trash').click(function(){
    $(this).parent().remove();
});
$('.pub-chosen-right .fa-trash').click(function(){
    $(this).parent().parent().remove();
})

item.forEach((el, ind) => {
    el.setAttribute('contentEditable', 'true');
    var ck = CKEDITOR.inline(item[ind], {
        allowedContent: true
    })
})

$('.wrap-chosen').hover(function () {
        $(this).find('.fa-plus').css('opacity', '1');
    }, function () {
        // out
        $(this).find('.fa-plus').css('opacity', '0');
    }
);

$('.fa-plus').click(function(){
    $(this).parent().siblings('#group2').prepend(
        `<div class="hover">
            <i class="fa fa-arrows" aria-hidden="true"></i>
            <i class="fa fa-trash fa-custom-trash" aria-hidden="true"></i>
            <div class="list-group-item">
            <span>EMPTY</span>
            </div>
        </div>`
    );
    $(this).parent().siblings('#group3').prepend(
        `<div class="hover mb-4">
            <i class="fa fa-arrows" aria-hidden="true"></i>
            <i class="fa fa-trash fa-custom-trash" aria-hidden="true"></i>
            <div class="hover d-flex justify-content-between">
            <div class="list-group-item academic col-9">
                <h4><a class="text-primary" href="#">VARNA TECHNICAL UNIVERSITY</a>, BULGARIA</h4>
                <div class="mb-3">PHD DEGREE IN INFORMATION AND COMPUTER SCIENCES</div>
                <span class="text-secondary">PhD thesis: Architectural model of a class numerical computing machine and its application on generating smooth curves and surface</span>
            </div>
            <div class="academic col-3">
                <div class="list-group-item time">
                3/1991 - 12/1995
                </div>
            </div>
            </div>
        </div>`
    );
    $(this).parent().siblings('#group6').prepend(
        `<div class="hover">
            <i class="fa fa-arrows" aria-hidden="true"></i>
            <i class="fa fa-trash fa-custom-trash" aria-hidden="true"></i>
            <div class="list-group-item">
            <a class="text-primary" href="#"><i> Proposed Topics for Undergraduate (2018-2019)</i></a>
            </div>
        </div>`
    );

    //#group4, #group5,#group7, #group8, #group9, #group10, #group11, #group12, #group13, #group14
    $(this).parent().siblings(`.list-group[name="same-text"]`).prepend(
        `<div class="hover">
            <i class="fa fa-arrows" aria-hidden="true"></i>
            <i class="fa fa-trash fa-custom-trash" aria-hidden="true"></i>
            <div class="list-group-item text-secondary">Empty</div>
        </div>`
    );
    var item = Array.from(document.querySelectorAll('.list-group-item'));
    item.forEach((el, ind) => {
        el.setAttribute('contentEditable', 'true');
        var ck = CKEDITOR.inline(item[ind], {
            allowedContent: true
        })
    })
    $('.fa-custom-trash').click(function(){
        $(this).parent().remove();
    });
})


// Scroll active menu
const sections = document.querySelectorAll('.title');

// onscroll = function(){
//     var scrollPosition = document.documentElement.scrollTop;

//     sections.forEach(section => {
//         if(scrollPosition >= section.offsetTop - section.offsetHeight*0.25 &&
//             scrollPosition < section.offsetTop + section.offsetHeight - section.offsetHeight*0.25){
//             var currentId = section.attributes.id.value;
//             removeAllClassActive();
//             addClassActive(currentId);
//         }
//     })
// }



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



$('.list-group').sortable({
    animation: 150,
    handle: '.fa-arrows'
});



/* Set Image */
const img = document.querySelector('#avatar');
const btnFile = document.querySelector('#file');

btnFile.addEventListener('change', function() {
    const file = this.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = function(){
            const result = reader.result;
            img.setAttribute('src', result);
        }
        reader.readAsDataURL(file);
    }
})
