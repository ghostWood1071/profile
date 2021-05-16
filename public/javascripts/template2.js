const nav = document.querySelector('.nav');
const btnHamburger = document.querySelector('.hamburger');
const options = document.querySelector('.options')
var navLinks = Array.from(document.querySelectorAll('.nav-link'));
var sections = document.querySelectorAll('section');

// Scroll navbar
window.addEventListener("scroll", () => {
  let current = sections[0].getAttribute('id');
  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    
    if (pageYOffset >= sectionTop) {
      if(!section.classList.contains('hide')) {
        current = section.getAttribute("id");
      }
    }
  });

  navLinks.forEach((link) => {
    if (link.classList.contains(current)) {
      link.classList.add("current-page");
    } else {
      link.classList.remove("current-page");
    }
  });
});

//Options
$('.circle').click(() => {
  if(options.classList.contains('active')){
    options.classList.remove('active');
  }
  else {
    options.classList.add('active');
  }  
})
// Categories
$('.btn-list-categories').click(() => {
  if($('.categories').hasClass("show-categories")) {
      $('.categories').removeClass('show-categories');
  } else {
      $('.categories').addClass('show-categories');
  }
})

document.querySelectorAll('.btn-checkbox').forEach(function(element) {
  element.addEventListener('change', function() {
    if(element.classList.contains('research')) {
      if($(element).prop('checked') == false) {
        $('.research:not(.btn-checkbox)').addClass('hide');
      } else {
        $('.research:not(.btn-checkbox)').removeClass('hide');
      }
    } else if(element.classList.contains('academic')) {
      if($(element).prop('checked') == false) {
        $('.academic:not(.btn-checkbox)').addClass('hide');
      } else {
        $('.academic:not(.btn-checkbox)').removeClass('hide');
      }
    } else if(element.classList.contains('new')) {
      if($(element).prop('checked') == false) {
        $('.new:not(.btn-checkbox)').addClass('hide');
      } else {
        $('.new:not(.btn-checkbox)').removeClass('hide');
      }
    } else if(element.classList.contains('teaching')) {
      if($(element).prop('checked') == false) {
        $('.teaching:not(.btn-checkbox)').addClass('hide');
      } else {
        $('.teaching:not(.btn-checkbox)').removeClass('hide');
      }
    } else if(element.classList.contains('thesis')) {
      if($(element).prop('checked') == false) {
        $('.thesis:not(.btn-checkbox)').addClass('hide');
      } else {
        $('.thesis:not(.btn-checkbox)').removeClass('hide');
      }
    } else if(element.classList.contains('grant')) {
      if($(element).prop('checked') == false) {
        $('.grant:not(.btn-checkbox)').addClass('hide');
      } else {
        $('.grant:not(.btn-checkbox)').removeClass('hide');
      }
    } else if(element.classList.contains('publication')) {
      if($(element).prop('checked') == false) {
        $('.publication:not(.btn-checkbox)').addClass('hide');
      } else {
        $('.publication:not(.btn-checkbox)').removeClass('hide');
      }
    } else if(element.classList.contains('book')) {
      if($(element).prop('checked') == false) {
        $('.book:not(.btn-checkbox)').addClass('hide');
      } else {
        $('.book:not(.btn-checkbox)').removeClass('hide');
      }
    } else if(element.classList.contains('paper')) {
      if($(element).prop('checked') == false) {
        $('.paper:not(.btn-checkbox)').addClass('hide');
      } else {
        $('.paper:not(.btn-checkbox)').removeClass('hide');
      }
    }
  })
})

// Themes
$('.btn-list-themes').click(() => {
  if($('.themes').hasClass("show-themes")) {
      $('.themes').removeClass('show-themes');
  } else {
      $('.themes').addClass('show-themes');
  }
})

window.addEventListener('click', function(e) {
  if(!e.target.classList.contains('theme-show')) {
    $('.themes').removeClass('show-themes');
  }
})

window.addEventListener('click', function(e) {
  if(!e.target.classList.contains('categories-show')) {
    $('.categories').removeClass('show-categories');
  }
})


//Popup 
//Modal successful
$('.btn-apply').click(function() {
  $('.modal-themes').fadeOut(() => {
    $('.modal-themes').css('display', 'none');
  });
  $('.modal-successful').fadeIn(() => {
    $('.modal-successful').css('display', 'block');
  });
})

// Show Modal
$('.themes-item').click(() => {
  $('.modal-themes').fadeIn(() => {
      $('.modal-themes').css('display', 'block');
  });
})

// Close Modal
$('.btn-close-modal').click(() => {
  $('.modal').fadeOut(() => {
      $('.modal').css('display', 'none');
  });
})

// Close Modal
$('.btn-ok').click(() => {
  $('.modal').fadeOut(() => {
      $('.modal').css('display', 'none');
  });
})

$(window).click((e) => {
  if($(e.target).hasClass("modal")) {
      $('.modal').fadeOut(() => {
          $('.modal').css('display', 'none');
      });
  }
});

//Colors
const colors = document.querySelectorAll('.color');
colors.forEach((element) => {
  element.addEventListener("click", () => {
    if(element.classList.contains('green')) {
      document.documentElement.style.setProperty('--primaryColor', '#458966');
    } else if(element.classList.contains('brown')) {
      document.documentElement.style.setProperty('--primaryColor', '#493d34');
    } else if(element.classList.contains('default')) {
      document.documentElement.style.setProperty('--primaryColor', '#bd5d38');
    }
  })
})
//Title
document.title = $('.name').text();

//Hamburger
btnHamburger.addEventListener('click', () => {
  if(nav.classList.contains('open')){
    nav.classList.remove('open');
    document.querySelector('.wrapper').classList.remove('toggle');
  }
  else {
    nav.classList.add('open');
    document.querySelector('.wrapper').classList.add('toggle');
  }    
})

//Set img
function readURL(input, e) {
  const imgView = document.querySelector(e);
  if(input.files && input.files[0]) { //input.files: Trả về FileList bao gồm các thông tin của file
      var reader = new FileReader(); //Đọc các thông tin của file

      reader.onload = function(e) {
          imgView.setAttribute('src', e.target.result); 
      }
      reader.readAsDataURL(input.files[0]); //fileReader.result sẽ là 1 URL
  }
}

// PDF
$('.btn-pdf').click(function() {
  if($(this).parent().children().length == 4) {
    $(this).parent().append(`<div class="upload-pdf">
    <input type="file" name="pdf" accept=".pdf" class="file-pdf"/>
    <label for="#" class="lbl-pdf">PDF</label>
    <i class="fas fa-trash-alt btn-trash"></i>
    </div>`);

    const trashBtn = document.querySelectorAll('.btn-trash');
    trashBtn.forEach((element) => {
    element.addEventListener('click', function() {
      if(element.parentElement.classList.contains('item-list')) {
        element.parentNode.parentNode.remove();
      } else {
        element.parentNode.remove();
      }
    })
    })
  }
})
// Click
const items = document.querySelectorAll('.list-group-item');
if(document.getElementById('admin')) {
  items.forEach((element, index) => {
    $(element).click(function() {
      element.setAttribute('contentEditable', 'true');
      CKEDITOR.inline(element, {
        allowedContent: true,
        startupFocus: true
      })
      if(element.classList.contains('item-pdf')) {
        element.previousElementSibling.style.opacity = 1;
      }
    })
  
    document.querySelectorAll('.item-pdf').forEach(function(item) {
      item.addEventListener('blur', function() {
        item.previousElementSibling.style.opacity = 0;
      })
    })
  })
  
  //Remove
  const trashBtn = document.querySelectorAll('.btn-trash');
  trashBtn.forEach((element) => {
    element.addEventListener('click', function() {
      if(element.parentElement.classList.contains('item-list')) {
        element.parentNode.parentNode.remove();
      } else {
        element.parentNode.remove();
      }
    })
  })

  $(".publication-item").hover( function (e) {
    $(this).toggleClass('shadow', e.type === 'mouseenter');
  });
  $(".thesis-item").hover( function (e) {
    $(this).toggleClass('shadow', e.type === 'mouseenter');
  });
} else {
  $(".publication-item").hover( function (e) {
    $(this).removeClass('shadow', e.type === 'mouseenter');
  });
  $(".thesis-item").hover( function (e) {
    $(this).removeClass('shadow', e.type === 'mouseenter');
  });
}

//add
$('.btn-plus').click(function(element) {
  loadCKEDITOR();
  $(this).siblings('#group1').prepend(`<div class="hover">
    <i class="fas fa-trash-alt btn-trash"></i>
    <i class="fas fa-arrows-alt btn-arrow"></i>
    <div class="list-group-item">
        <a href="#">NEW ITEM</a>
    </div>
  </div>`);

  $(this).parent().siblings('#group2').prepend(`<div class="hover research-item">
    <i class="fas fa-trash-alt btn-trash"></i>
    <i class="fas fa-arrows-alt btn-arrow"></i>
    <div class="list-group-item">NEW ITEM</div>
  </div>`);

  $(this).parent().siblings('#group3').prepend(`<div class="academic-item hover">
    <i class="fas fa-trash-alt btn-trash top-0"></i>
    <i class="fas fa-arrows-alt btn-arrow"></i>
    <i class="fas fa-graduation-cap ic-academic"></i>
    <div class="list-group-item academic-item-time text-primary">3/1991 - 12/1995</div>
    <div class="list-group-item academic-item-name text-primary">
        <a href="#">VARNA TECHNICAL UNIVERSITY</a>
    </div>
    <div class="list-group-item academic-item-location">BULGARIA</div>
    <div class="list-group-item academic-level">PHD DEGREE IN INFORMATION AND COMPUTER SCIENCES</div>
    <div class="list-group-item academic-description">PhD thesis: Architectural model of a class numerical computing machine and its application on generating smooth curves and surface</div>
  </div>`);

  $(this).parent().siblings('#group4').prepend(`<div class="hover thesis-link">
  <i class="fas fa-trash-alt btn-trash"></i>
  <i class="fas fa-arrows-alt btn-arrow"></i>
  <div class="list-group-item">
      <a href="#">NEW ITEM</a>
  </div>
  </div>`)

  $(this).parent().siblings('#group5').prepend(`<div class="hover grant-item">
  <i class="fas fa-trash-alt btn-trash"></i>
  <i class="fas fa-arrows-alt btn-arrow"></i>
  <div class="list-group-item">NEW ITEM</div>
  </div>`)

  $(this).parent().siblings('#group6').prepend(`<div class="hover book-item">
  <i class="fas fa-trash-alt btn-trash"></i>
  <i class="fas fa-arrows-alt btn-arrow"></i>
  <div class="list-group-item item-pdf">NEW ITEM</div>
  </div>`)

  $(this).parent().siblings('#group7').prepend(`<div class="hover">
  <i class="fas fa-trash-alt btn-trash"></i>
  <i class="fas fa-arrows-alt btn-arrow"></i>
  <div class="list-group-item">NEW ITEM</div> 
  </div>`)
  
  $(this).parent().siblings('#group8').prepend(`<div class="hover">
  <i class="fas fa-trash-alt btn-trash"></i>
  <i class="fas fa-arrows-alt btn-arrow"></i>
  <div class="list-group-item">NEW ITEM</div> 
  </div>`)

  $(this).parent().siblings('#group9').prepend(`<div class="hover">
  <i class="fas fa-trash-alt btn-trash"></i>
  <i class="fas fa-arrows-alt btn-arrow"></i>
  <i class="far fa-file-pdf btn-pdf"></i>
  <div class="list-group-item item-pdf">NEW ITEM</div> 
  </div>`)

  $(this).parent().siblings('#group10').prepend(`<div class="hover">
  <i class="fas fa-trash-alt btn-trash"></i>
  <i class="fas fa-arrows-alt btn-arrow"></i>
  <div class="list-group-item">NEW ITEM</div> 
  </div>`)

  $(this).parent().siblings('#group11').prepend(`<div class="hover new-item">
  <i class="fas fa-trash-alt btn-trash"></i>
  <i class="fas fa-arrows-alt btn-arrow"></i>
  <div class="list-group-item">NEW ITEM</div>
  </div>`);
  
  // //PDF
  $('.btn-pdf').click(function() {
    if($(this).parent().children().length == 4) {
      $(this).parent().append(`<div class="upload-pdf">
      <input type="file" name="pdf" accept=".pdf" class="file-pdf"/>
      <label for="#" class="lbl-pdf">PDF</label>
      <i class="fas fa-trash-alt btn-trash"></i>
      </div>`);
      const trashBtn = document.querySelectorAll('.btn-trash');
      trashBtn.forEach((element) => {
      element.addEventListener('click', function() {
        if(element.parentElement.classList.contains('item-list')) {
          element.parentNode.parentNode.remove();
        } else {
          element.parentNode.remove();
        }
      })
      })
    }
  })

  const items = document.querySelectorAll('.list-group-item');
  const trashBtn = document.querySelectorAll('.btn-trash');
  // //ADD
  items.forEach((element, index) => {
    $(element).click(function() {
      element.setAttribute('contentEditable', 'true');
      CKEDITOR.inline(element, {
        allowedContent: true,
        startupFocus: true
      })
      if(element.classList.contains('item-pdf')) {
        element.previousElementSibling.style.opacity = 1;
      }
    })
  
    document.querySelectorAll('.item-pdf').forEach(function(item) {
      item.addEventListener('blur', function() {
        item.previousElementSibling.style.opacity = 0;
      })
    })
  })

  //Remove
  trashBtn.forEach((element) => {
    element.addEventListener('click', function() {
      if(element.parentElement.classList.contains('item-list')) {
        element.parentNode.parentNode.remove();
      } else {
        element.parentNode.remove();
      }
    })
  })
  
  window.addEventListener('dragstart', function() {
    items.forEach((el) => {
        el.setAttribute('contentEditable', 'false');
    })
  })

  window.addEventListener('dragend', () => {
    loadCKEDITOR();
    items.forEach((el, ind) => {
        el.setAttribute('contentEditable', 'true');
        var ck = CKEDITOR.inline(items[ind], {
            allowedContent: true
        })
    })
  })
})

//Xử lý group list  (publication, thesis)
const btnPlus = document.querySelectorAll('.btn-plus');
btnPlus.forEach((element) => {
  element.addEventListener('click', function() {
    loadCKEDITOR();
    if (element.parentNode.classList.contains('publication-details-title')) {
      let node = document.createElement('div');
      node.setAttribute('class', 'publication-item');
      // Cái ban đầu
      // node.innerHTML = `<i class="fas fa-trash-alt btn-trash"></i><i class="fas fa-arrows-alt btn-arrow"></i><div class="publication-name"><div class="list-group-item">A) International Journals</div><i class="fas fa-plus-circle btn-plus"></i></div><div class="list-group publication-content"><div class="hover"><i class="fas fa-trash-alt btn-trash"></i><i class="fas fa-arrows-alt btn-arrow"></i><div class="list-group-item">Van-Quyet Nguyen, Quyet-Thang Huynh, Kyungbaek Kim. Estimating searching cost of regular path queries on large graphs by exploiting unit-subqueries. Journal of Heuristics (2018). https://doi.org/10.1007/s10732-018-9402-0. ISI, Q1 Journal, IF=1.129.</div></div><div class="hover"><i class="fas fa-trash-alt btn-trash"></i><i class="fas fa-arrows-alt btn-arrow"></i><div class="list-group-item">Nguyen Hung-Cuong, Huynh Quyet-Thang and Le Hai-Trieu. Different Ranking of NHPP Software Reliability Growth Models with Generalized Measure and Predictability. International Journal of Applied Information Systems, Series Volume 7, Number 11, November 2014. ISSN 2249: 0868. pp. 1-6. DOI: 10.5120/ijais14-451257.</div></div></div>`;
      node.innerHTML = `<i class="fas fa-trash-alt btn-trash"></i><i class="fas fa-arrows-alt btn-arrow"></i><div class="publication-name"><div class="list-group-item">A) International Journals</div><i class="fas fa-plus-circle btn-plus"></i></div><div id="group9" class="list-group publication-content publication-example"><div class="hover"><i class="fas fa-trash-alt btn-trash"></i><i class="fas fa-arrows-alt btn-arrow"></i><i class="far fa-file-pdf btn-pdf"></i><div class="list-group-item item-pdf">Van-Quyet Nguyen, Quyet-Thang Huynh, Kyungbaek Kim. Estimating searching cost of regular path queries on large graphs by exploiting unit-subqueries. Journal of Heuristics (2018). https://doi.org/10.1007/s10732-018-9402-0. ISI, Q1 Journal, IF=1.129.</div></div><div class="hover"><i class="fas fa-trash-alt btn-trash"></i><i class="fas fa-arrows-alt btn-arrow"></i><i class="far fa-file-pdf btn-pdf"></i><div class="list-group-item item-pdf">Nguyen Hung-Cuong, Huynh Quyet-Thang and Le Hai-Trieu. Different Ranking of NHPP Software Reliability Growth Models with Generalized Measure and Predictability. International Journal of Applied Information Systems, Series Volume 7, Number 11, November 2014. ISSN 2249: 0868. pp. 1-6. DOI: 10.5120/ijais14-451257.</div></div></div>`;
      document.querySelector('.publication-list').insertBefore(node, document.querySelector('.publication-list').childNodes[0]);
      var content = document.querySelector('.publication-content');

      const items = document.querySelectorAll('.list-group-item');
      const trashBtn = document.querySelectorAll('.btn-trash');
      items.forEach((element, index) => {
        $(element).click(function() {
          element.setAttribute('contentEditable', 'true');
          CKEDITOR.inline(element, {
            allowedContent: true,
            startupFocus: true
          })
          if(element.classList.contains('item-pdf')) {
            element.previousElementSibling.style.opacity = 1;
          }
        })
        document.querySelectorAll('.item-pdf').forEach(function(item) {
          item.addEventListener('blur', function() {
            item.previousElementSibling.style.opacity = 0;
          })
        })
      })
      
      trashBtn.forEach((element) => {
        element.addEventListener('click', function() {
          if(element.parentElement.classList.contains('item-list')) {
            element.parentNode.parentNode.remove();
          } else {
            element.parentNode.remove();
          }
        })
      })

      const name = document.querySelector('.publication-name > .btn-plus');
      name.addEventListener('click', (element) => {
        let nodeChild = document.createElement('div');
        nodeChild.setAttribute('class', 'hover');
        //Ban đầu
        // nodeChild.innerHTML = `<i class="fas fa-trash-alt btn-trash"></i><i class="fas fa-arrows-alt btn-arrow"></i><div class="list-group-item">NEW ITEM</div>`;
        nodeChild.innerHTML = `<i class="fas fa-trash-alt btn-trash"></i><i class="fas fa-arrows-alt btn-arrow"></i><i class="far fa-file-pdf btn-pdf"></i><div class="list-group-item item-pdf">Van-Quyet Nguyen, Quyet-Thang Huynh, Kyungbaek Kim. Estimating searching cost of regular path queries on large graphs by exploiting unit-subqueries. Journal of Heuristics (2018). https://doi.org/10.1007/s10732-018-9402-0. ISI, Q1 Journal, IF=1.129.</div>`;
        content.insertBefore(nodeChild, content.childNodes[0]) 

        const items = document.querySelectorAll('.list-group-item');
        const trashBtn = document.querySelectorAll('.btn-trash');
        items.forEach((element, index) => {
          $(element).click(function() {
            element.setAttribute('contentEditable', 'true');
            CKEDITOR.inline(element, {
              allowedContent: true,
              startupFocus: true
            })
            if(element.classList.contains('item-pdf')) {
              element.previousElementSibling.style.opacity = 1;
            }
          })
          document.querySelectorAll('.item-pdf').forEach(function(item) {
            item.addEventListener('blur', function() {
              item.previousElementSibling.style.opacity = 0;
            })
          })
        })
        
        trashBtn.forEach((element) => {
          element.addEventListener('click', function() {
            if(element.parentElement.classList.contains('item-list')) {
              element.parentNode.parentNode.remove();
            } else {
              element.parentNode.remove();
            }
          })
        })

        $(".list-group").sortable({
          handle: '.btn-arrow',
          animation: 150
        });

        window.addEventListener('dragstart', function() {
          items.forEach((el) => {
              el.setAttribute('contentEditable', 'false');
          })
        })
      
        window.addEventListener('dragend', () => {
          loadCKEDITOR();
          items.forEach((el, ind) => {
              el.setAttribute('contentEditable', 'true');
              var ck = CKEDITOR.inline(items[ind], {
                  allowedContent: true
              })
          })
        })
        //PDF
        $('.btn-pdf').click(function() {
          if($(this).parent().children().length == 4) {
            $(this).parent().append(`<div class="upload-pdf">
            <input type="file" name="pdf" accept=".pdf" class="file-pdf"/>
            <label for="#" class="lbl-pdf">PDF</label>
            <i class="fas fa-trash-alt btn-trash"></i>
            </div>`);
            const trashBtn = document.querySelectorAll('.btn-trash');
            trashBtn.forEach((element) => {
            element.addEventListener('click', function() {
              if(element.parentElement.classList.contains('item-list')) {
                element.parentNode.parentNode.remove();
              } else {
                element.parentNode.remove();
              }
            })
            })
          }
        })
      })
      //PDF
      $('.btn-pdf').click(function() {
        if($(this).parent().children().length == 4) {
          $(this).parent().append(`<div class="upload-pdf">
          <input type="file" name="pdf" accept=".pdf" class="file-pdf"/>
          <label for="#" class="lbl-pdf">PDF</label>
          <i class="fas fa-trash-alt btn-trash"></i>
          </div>`);
          const trashBtn = document.querySelectorAll('.btn-trash');
          trashBtn.forEach((element) => {
          element.addEventListener('click', function() {
            if(element.parentElement.classList.contains('item-list')) {
              element.parentNode.parentNode.remove();
            } else {
              element.parentNode.remove();
            }
          })
          })
        }
      })

      $(".list-group").sortable({
        handle: '.btn-arrow',
        animation: 150
      });

      window.addEventListener('dragstart', function() {
        items.forEach((el) => {
            el.setAttribute('contentEditable', 'false');
        })
      })
    
      window.addEventListener('dragend', () => {
        loadCKEDITOR();
        items.forEach((el, ind) => {
            el.setAttribute('contentEditable', 'true');
            var ck = CKEDITOR.inline(items[ind], {
                allowedContent: true
            })
        })
      })
    } else if (element.parentNode.classList.contains('add')) {
      let node = document.createElement('div');
      node.setAttribute('class', 'thesis-item');
      node.innerHTML = `<i class="fas fa-trash-alt btn-trash"></i><i class="fas fa-arrows-alt btn-arrow"></i><div class="thesis-name"><div class="list-group-item">Phd Thesis Supervised</div><i class="fas fa-plus-circle btn-plus"></i></div><div class="list-group thesis-content"><div class="hover"><i class="fas fa-trash-alt btn-trash"></i><i class="fas fa-arrows-alt btn-arrow"></i><div class="list-group-item">Pham Thi Quynh (2007-2010): Measurement and checking Web service and business process</div></div><div class="hover"><i class="fas fa-trash-alt btn-trash"></i><i class="fas fa-arrows-alt btn-arrow"></i><div class="list-group-item">Pham Thi Quynh (2007-2010): Measurement and checking Web service and business process</div></div></div>`;
      document.querySelector('.thesis-list').insertBefore(node, document.querySelector('.thesis-list').childNodes[0]);
      var content = document.querySelector('.thesis-content');

      const items = document.querySelectorAll('.list-group-item');
      const trashBtn = document.querySelectorAll('.btn-trash');
      items.forEach((element, index) => {
        $(element).click(function() {
          element.setAttribute('contentEditable', 'true');
          CKEDITOR.inline(element, {
            allowedContent: true,
            startupFocus: true
          })
          if(element.classList.contains('item-pdf')) {
            element.previousElementSibling.style.opacity = 1;
          }
        })
      
        document.querySelectorAll('.item-pdf').forEach(function(item) {
          item.addEventListener('blur', function() {
            item.previousElementSibling.style.opacity = 0;
          })
        })
      })
      
      trashBtn.forEach((element) => {
        element.addEventListener('click', function() {
          if(element.parentElement.classList.contains('item-list')) {
            element.parentNode.parentNode.remove();
          } else {
            element.parentNode.remove();
          }
        })
      })

      const name = document.querySelector('.thesis-name > .btn-plus');
      name.addEventListener('click', (element) => {
        let nodeChild = document.createElement('div');
        nodeChild.setAttribute('class', 'hover');
        nodeChild.innerHTML = `<i class="fas fa-trash-alt btn-trash"></i><i class="fas fa-arrows-alt btn-arrow"></i><div class="list-group-item">NEW ITEM</div>`;
        content.insertBefore(nodeChild, content.childNodes[0]) 

        const items = document.querySelectorAll('.list-group-item');
        const trashBtn = document.querySelectorAll('.btn-trash');
        items.forEach((element, index) => {
          element.setAttribute('contentEditable', 'true');
          CKEDITOR.inline(element, {
            allowedContent: true
          })
        })
        
        trashBtn.forEach((element) => {
          element.addEventListener('click', function() {
            if(element.parentElement.classList.contains('item-list')) {
              element.parentNode.parentNode.remove();
            } else {
              element.parentNode.remove();
            }
          })
        })
        $(".list-group").sortable({
          handle: '.btn-arrow',
          animation: 150
        });

        window.addEventListener('dragstart', function() {
          items.forEach((el) => {
              el.setAttribute('contentEditable', 'false');
          })
        })
      
        window.addEventListener('dragend', () => {
          loadCKEDITOR();
          items.forEach((el, ind) => {
              el.setAttribute('contentEditable', 'true');
              var ck = CKEDITOR.inline(items[ind], {
                  allowedContent: true
              })
          })
        })
      })

      $(".list-group").sortable({
        handle: '.btn-arrow',
        animation: 150
      });

      window.addEventListener('dragstart', function() {
        items.forEach((el) => {
            el.setAttribute('contentEditable', 'false');
        })
      })
    
      window.addEventListener('dragend', () => {
        loadCKEDITOR();
        items.forEach((el, ind) => {
            el.setAttribute('contentEditable', 'true');
            var ck = CKEDITOR.inline(items[ind], {
                allowedContent: true
            })
        })
      })
    } 
  })
})

//Move
$(".list-group").sortable({
  handle: '.btn-arrow',
  animation: 150
});

// reload ckeditor
loadCKEDITOR = () => {
  for(selector in CKEDITOR.instances) {
    CKEDITOR.instances[selector].destroy(true);
  }
}

window.addEventListener('dragstart', function() {
  items.forEach((el) => {
      el.setAttribute('contentEditable', 'false');
  })
})

window.addEventListener('dragend', () => {
  loadCKEDITOR();
  items.forEach((el, ind) => {
      el.setAttribute('contentEditable', 'true');
      var ck = CKEDITOR.inline(items[ind], {
          allowedContent: true
      })
  })
})

