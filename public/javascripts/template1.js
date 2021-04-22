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

$('.list-color li').click(function(){
    $('.list-color li').removeClass('active');
    $(this).addClass('active');
    var newColor = rgb2hex($(this).css('background-color'));
    document.documentElement.style.setProperty('--primary-color', newColor);
})

$('.list-background li').click(function(){
    $('.list-background li').removeClass('active');
    $(this).addClass('active');
    var newBackground = $(this).css('background-image');
    console.log(newBackground)
    document.documentElement.style.setProperty('--primary-background', newBackground);
})

// Edit content
var item = Array.from(document.querySelectorAll('.list-group-item'));

// Remove element
$('.btn-trash').click(function(){
    $(this).parent().remove();
});
//Remove element has pdf
$('.pub-chosen-right .fa-trash-alt').click(function(){
    $(this).parent().parent().remove();
})

// Add ckEditable
if(!document.querySelector("#forGuess")){
    item.forEach((el, ind) => {
        el.setAttribute('contentEditable', 'true');
        var ck = CKEDITOR.inline(item[ind], {
            allowedContent: true
        })
    })
}

// Show button plus
$('.title').hover(function () {
        $(this).find('.fa-plus').css('opacity', '1');
    }, function () {
        // out
        $(this).find('.fa-plus').css('opacity', '0');
    }
);

// Add content when click button plus
$('.fa-plus').click(function(){
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
        `<div class="hover mb-4">
            <i class="fas fa-arrows-alt btn-arrow"></i>
            <i class="fas fa-trash-alt btn-trash"></i>
            <div class="d-flex justify-content-between">
            <div class="academic-item col-9">
                <h4 class="list-group-item academic-item-name">
                <a href="#">VARNA TECHNICAL UNIVERSITY</a
                >, BULGARIA
                </h4>
                <div class="list-group-item academic-level">
                PHD DEGREE IN INFORMATION AND COMPUTER SCIENCES
                </div>
                <div class="text-secondary list-group-item academic-description"
                >PhD thesis: Architectural model of a class numerical
                computing machine and its application on generating smooth
                curves and surface</div
                >
            </div>
            <div class="academic-item col-3">
                <div class="list-group-item academic-item-time">3/1991 - 12/1995</div>
            </div>
            </div>
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
    // Add ckEditable again
    var item = Array.from(document.querySelectorAll('.list-group-item'));
    item.forEach((el, ind) => {
        el.setAttribute('contentEditable', 'true');
        var ck = CKEDITOR.inline(item[ind], {
            allowedContent: true
        })
    })
    // Remove again
    $('.btn-trash').click(function(){
        $(this).parent().remove();
    });
})

// Add sortable for elements
$('.list-group').sortable({
    animation: 150,
    handle: '.btn-arrow'
});

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
