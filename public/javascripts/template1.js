var navItem = Array.from(document.querySelectorAll('.nav-item'));
var navLinks = Array.from(document.querySelectorAll('.nav-link'));
const sections = document.querySelectorAll('.content');

// Active navbar when click
navItem.forEach(function(element, index){
    element.classList.remove('active');
    navLinks[index].addEventListener('click', function(){
        element.classList.add('active');
    })
})

navItem[0].classList.add('active');

// Active sticky when scroll
window.addEventListener('scroll', function(){
    var nav = document.getElementsByTagName('nav')[0];
    var y = scrollY;
    if(y > 0 ){
        nav.classList.add('sticky')
    }
})

// Active navbar when scroll
window.addEventListener("scroll", () => {
    let current = sections[0].getAttribute('id');
  
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      
      if (pageYOffset >= sectionTop - 50) {
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

// window load

// Set color
const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`;

$('.btn-cogs').click(function(){
    if($(this).hasClass('active')){
        $(this).removeClass('active');
        $(this).parent().css('transform', 'translateX(100%)');
    }
    else{
        $(this).addClass('active');
        $(this).parent().css('transform', 'translateX(0)');
    }
})

$('.list-color li').click(function() {
    // $('.list-color li').removeClass('active');
    // $(this).addClass('active');
    var newColor = rgb2hex($(this).css('background-color'));
    document.documentElement.style.setProperty('--primary-color', newColor);
})

$('.list-background li').click(function() {
    // $('.list-background li').removeClass('active');
    // $(this).addClass('active');
    var newBackground = $(this).css('background-image');
    document.documentElement.style.setProperty('--primary-background', newBackground);
})

// Edit content
var items = Array.from(document.querySelectorAll('.list-group-item'));


btn_remove = () => {
    // Remove element
    $('.btn-trash').click(function(){
        $(this).parent().remove();
    });
    
    // Remove element has pdf
    $('.pub-chosen-right .fa-trash-alt').click(function(){
        $(this).parent().parent().remove();
    })
    
    $('.container-drag .fa-trash-alt').click(function() {
        $(this).parents('.container-drag').remove();
    })
    // Remove element
    $('.title .fa-trash-alt').click(function(){
        $(this).parents('.publication-item').remove();
    })
    
    
}

btn_remove();

// Add ckEditable
if(!document.querySelector("#forGuess")){
    items.forEach((el, ind) => {
        
        el.setAttribute('contentEditable', 'true');
        var ck = CKEDITOR.inline(items[ind], {
            allowedContent: true
        })
    })
}

// Show button plus
showBtn = () => {
    $('.title').hover(function () {
            $(this).find('.fa-plus, .fa-trash-alt').css('opacity', '1');
        }, function () {
            // out
            $(this).find('.fa-plus, .fa-trash-alt').css('opacity', '0');
        }
    );
}

showBtn();

// Add content when click button plus
$('.btn-add').click(function() {
    loadCKEDITOR();

    var check = true;

    $(this).parent().siblings('#group1').prepend(
        `<div class="hover">
            <i class="fas fa-arrows-alt btn-arrow"></i>
            <i class="fas fa-trash-alt btn-trash"></i>
            <div class="list-group-item">
                <a href="#"> Department of Software Engineering</a>
            </div>
        </div>`
    );

    $(this).parent().siblings('#group2').prepend(
        `<div class="hover">
            <i class="fas fa-arrows-alt btn-arrow"></i>
            <i class="fas fa-trash-alt btn-trash"></i>
            <div class="list-group-item">
            <span>EMPTY</span>
            </div>
        </div>`
    );

    $(this).parent().siblings('#group3').prepend(
        `<div class="academic-item hover">
        <i class="fas fa-arrows-alt btn-arrow"></i>
        <i class="fas fa-trash-alt btn-trash"></i>
        <div class="list-group-item academic-item-time">3/1991 - 12/1995</div>
        <div class="list-group-item academic-item-name">
          <a href="#">UNIVERSITY</a>
        </div>
        <div class="list-group-item academic-item-location">LOCATION</div>
        <div class="list-group-item academic-level">PHD DEGREE IN INFORMATION AND COMPUTER SCIENCES</div>
        <div class="list-group-item academic-description text-secondary">PhD thesis: Architectural model of a class numerical computing machine and its application on generating smooth curves and surface</div>
        </div>`
    );

    $(this).parent().siblings('#group6').prepend(
        `<div class="hover thesis-link">
            <i class="fas fa-arrows-alt btn-arrow"></i>
            <i class="fas fa-trash-alt btn-trash"></i>
            <div class="list-group-item">
            <a href="#">Proposed Topics for Undergraduate (2018-2019)</a>
            </div>
        </div>`
    );
    
    //#group4, #group5,#group7, #group8, #group9, #group11, #group12, #group13, #group14
    $(this).parent().siblings(`.list-group[name="same-text"], #group10`).prepend(
        `<div class="hover">
            <i class="fas fa-arrows-alt btn-arrow"></i>
            <i class="fas fa-trash-alt btn-trash"></i>
            <div class="list-group-item text-secondary">Empty</div>
        </div>`
    );

    if($(this).hasClass('addContentPublication')) {
        $(this).parent().siblings().prepend(
            `
            <div class="publication-item">
                <div class="title">
                    <h5 class="subtitle list-group-item">TITLE</h5>
                    <i class="fas fa-arrows-alt"></i>
                    <i class="fa fa-plus btn-addPub" aria-hidden="true"></i>
                    <i class="fas fa-trash-alt"></i>
                </div>
                <div class="list-group" name="same-text" data-addPub="addPublication">
                    <div class="hover">
                        <i class="fas fa-arrows-alt btn-arrow"></i>
                        <i class="fas fa-trash-alt btn-trash"></i>
                        <div class="list-group-item text-secondary">
                        Empty
                        </div>
                    </div>
                </div>
            </div>
            `
        );
        
    } 

    if($(this).hasClass('addPublishedPaper')) {
        $(this).parent().siblings('.published-paper-wrapper').prepend(
            `
            <div class="container-drag">
                <div class="title">
                    <div class="list-group-item mr-2">
                        <strong class="text-dark" style="opacity: 0.9; font-size: 17px"
                        >F) International Journals:</strong
                        >
                    </div>
                    <i class="fas fa-arrows-alt"></i>
                    <i class="fa fa-plus btn-addPub" aria-hidden="true"></i>
                    <i class="fas fa-trash-alt"></i>
                </div>
                <div class="list-group" name="same-text">
                    <div class="hover">
                    <i class="fas fa-arrows-alt btn-arrow"></i>
                    <i class="fas fa-trash-alt btn-trash"></i>
                    <div class="list-group-item text-secondary">
                        Empty
                    </div>
                    </div>
                </div>
            </div>
            `
        )
    }

    // Add sortable for elements
    $('.list-group').sortable({
        animation: 150,
        handle: '.fa-arrows-alt',
        scroll: true,
        scrollSensitivity: 40
    });

    // Add ckEditable again
    var items = Array.from(document.querySelectorAll('.list-group-item'));
    items.forEach((el, ind) => {
        el.setAttribute('contentEditable', 'true');
        var ck = CKEDITOR.inline(items[ind], {
            allowedContent: true
        })
    })

    btn_remove();
    showBtn();
})

var c = 0;
$('.addContentPublication, .addPublishedPaper').click(function() {
    
    $('.btn-addPub').click(function() {
        loadCKEDITOR();
        //#group4, #group5,#group7, #group8, #group9, #group11, #group12, #group13, #group14
        $(this).parent().siblings(`.list-group[name="same-text"]`).prepend(
            `<div class="hover">
                <i class="fas fa-arrows-alt btn-arrow"></i>
                <i class="fas fa-trash-alt btn-trash"></i>
                <div class="list-group-item text-secondary">Empty</div>
            </div>`
        );
        // Add ckEditable again
        var item = Array.from(document.querySelectorAll('.list-group-item'));
        item.forEach((el, ind) => {
            el.setAttribute('contentEditable', 'true');
            var ck = CKEDITOR.inline(item[ind], {
                allowedContent: true
            })
        })
        btn_remove();
        showBtn();
    })
})

// Add sortable for elements
$('.list-group').sortable({
    animation: 150,
    handle: '.fa-arrows-alt',
    scroll: true,
    scrollSensitivity: 40
});

// $('.published-paper-wrapper').sortable({
//     animation: 150,
//     scroll: true,
//     scrollSensitivity: 40
// })

/* Change Image */
const img = document.querySelector('#avatar-img');
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
    console.log(img.clientHeight)
})

// reload ckeditor
loadCKEDITOR = () => {
    for(selector in CKEDITOR.instances)
    {
        CKEDITOR.instances[selector].destroy(true);
    }
}

window.addEventListener('dragstart', function() {
    $('.list-group-item').each(function (index, element) {
        // element == this
        element.setAttribute('contentEditable', 'false');
    });
})    

window.addEventListener('dragend', () => {
    loadCKEDITOR();
    $('.list-group-item').each(function (index, element) {
        // element == this
        element.setAttribute('contentEditable', 'true');
        var ck = CKEDITOR.inline(element, {
            allowedContent: true
        })
    });
})

