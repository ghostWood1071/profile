
$(document).ready(function () {
    //
    $('.navbar-toggler').click(function() {
        $(this).siblings('.collapse-wrapper').slideToggle();
    });

    var navItem = Array.from(document.querySelectorAll('.nav-item'));
    const sections = document.querySelectorAll('.content');
    
    // Active navbar when click
    $('.nav-item').click(function() {
        $('.nav-item').removeClass('active');
        $(this).addClass('active');
        var el = document.getElementById($(this).attr('data-page'));
        $('html, body').animate({
            scrollTop: $(el).offset().top - 70
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
          
          if (pageYOffset >= sectionTop - 100) {
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
    if($("body").attr('id') == 'admin'){
        // Edit content
        $('.list-group-item').each(function (index, element) {
            // element == this
            element.setAttribute('contentEditable', 'true');
            var ck = CKEDITOR.inline(element, {
                allowedContent: true
            })
        });
        /* Change Image */
        const img = document.querySelector('#avatar-img');
        const btnFile = document.querySelector('#file-img');
        
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
        
        // Add sortable for elements
        $('.list-group').sortable({
            animation: 150,
            handle: '.fa-arrows-alt',
            scroll: true,
            scrollSensitivity: 40
        });

        // Popup alert
        $('.footer .btn').click(function() {
            $('.success-wrapper').addClass('active');
        })
        $('.list-theme li:not([data-theme="theme1"])').click(function() {
            $('.mood-wrapper').addClass('active');
        })
        //
        $('.btn-close').click(function() {
                $('.mood-wrapper, .success-wrapper').removeClass('active');
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
    btnAdd = () => {
        $('.btn-add').click(function() {
            loadCKEDITOR();
        
            $(this).parent().siblings('#group1').prepend(
                `<div class="hover">
                    <i class="fas fa-arrows-alt btn-arrow"></i>
                    <i class="fas fa-trash-alt btn-trash"></i>
                    <div class="list-group-item">
                        <a href="#"> Department of Software Engineering</a>
                    </div>
                </div>`
            );
        
            $(this).parent().siblings('#group2, #groupNew').prepend(
                `<div class="hover">
                    <i class="fas fa-arrows-alt btn-arrow"></i>
                    <i class="fas fa-trash-alt btn-trash"></i>
                    <div class="list-group-item">
                    <span>Empty</span>
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

            $(this).parent().siblings(`.list-group[name="same-pdf"]`).prepend(
                `
                <div class="hover">
                    <i class="fas fa-arrows-alt btn-arrow"></i>
                    <div class="pub-chosen-right">
                        <i class="fas fa-trash-alt"></i>
                        <input
                        type="file"
                        id="pdf"
                        name="pdf"
                        accept="application/pdf"
                        value="PDF"
                        />
                        <label class="pdf" for="pdf">PDF</label>
                    </div>
                    <div class="list-group-item text-secondary">
                        Empty
                    </div>
                </div>
                `
            )
        
            if($(this).hasClass('addContentPublication')) {
                $(this).parent().siblings().prepend(
                    `
                    <div class="publication-item">
                        <div class="title">
                            <h5 class="subtitle list-group-item">TITLE</h5>
                            <i class="fas fa-arrows-alt"></i>
                            <i class="fa fa-plus btn-addPub btn-add" aria-hidden="true"></i>
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
                $(this).parent().siblings('.publication-list').prepend(
                    `
                    <div class="publication-item">
                        <div class="title publication-name">
                        <div class="list-group-item mr-2">
                            <strong class="text-dark" style="opacity: 0.9; font-size: 17px"
                            >F) International Journals:</strong
                            >
                        </div>
                        <i class="fas fa-arrows-alt"></i>
                        <i class="fa fa-plus btn-add btn-addPub" aria-hidden="true"></i>
                        <i class="fas fa-trash-alt"></i>
                        </div>
                        <div class="list-group" name="same-pdf">
                            <div class="hover">
                                <i class="fas fa-arrows-alt btn-arrow"></i>
                                <div class="pub-chosen-right">
                                    <i class="fas fa-trash-alt"></i>
                                    <input
                                    type="file"
                                    id="pdf"
                                    name="pdf"
                                    accept="application/pdf"
                                    value="PDF"
                                    />
                                    <label class="pdf" for="pdf">PDF</label>
                                </div>
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
    }
    
    btnAdd();
    
    $('.addContentPublication').click(function() {
        $('.btn-addPub').click(function(e) {
            e.stopPropagation();
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
    })
    
    $('.addPublishedPaper').click(function() {
        $('.btn-addPub').click(function(e) {
            e.stopPropagation();
            loadCKEDITOR();
            //#group4, #group5,#group7, #group8, #group9, #group11, #group12, #group13, #group14
            $(this).parent().siblings(`.list-group[name="same-pdf"]`).prepend(
                `<div class="hover">
                    <i class="fas fa-arrows-alt btn-arrow"></i>
                    <div class="pub-chosen-right">
                        <i class="fas fa-trash-alt"></i>
                        <input
                        type="file"
                        id="pdf"
                        name="pdf"
                        accept="application/pdf"
                        value="PDF"
                        />
                        <label class="pdf" for="pdf">PDF</label>
                    </div>
                    <div class="list-group-item text-secondary">
                        Empty
                    </div>
                </div>`
            );
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
    })
    
    // reload ckeditor
    function loadCKEDITOR() {
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

    confirmTemplate = () => {
        $('.list-theme li').each(function(ind, el) {
            $(el).click(function() {
                var number = $(el).text();
                $('.btn-confirm-interface').click(function() {
                    $('#template').text(`template` + number);
                    Save();
                })
            })
        })
    }
    confirmTemplate();
    
    // Remove edit tool
    // removeEditTools = () => {
    //     $('[contentEditable = "true"]').attr('contentEditable', 'false');
    //     $('[draggable = "true"]').attr('draggable', 'false');
    //     $('.fa-arrows-alt, .fa-trash-alt, .fa-plus, .nav-img-upload, .label-file-img, .pub-chosen-right, .success-wrapper, .mood-wrapper, .theme-setting, .footer, .submit').remove();
    //     $('script').each(function(ind, el) {
    //         if($(el).attr('src') == 'https://cdn.jsdelivr.net/npm/jquery-sortablejs@latest/jquery-sortable.js'
    //         || $(el).attr('src') == 'https://unpkg.com/sortablejs-make/Sortable.min.js'
    //         || $(el).attr('src') == '/ckeditor/ckeditor.js') {
    //             $(el).remove();
    //         }
    //     })
    //     loadCKEDITOR();
    // }

    // if($('body').attr('id') != 'admin') removeEditTools();
});

