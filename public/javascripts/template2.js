const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const sections = document.querySelectorAll('section');

const nav = document.querySelector('.nav');
const btnHamburger = document.querySelector('.hamburger');
const options = document.querySelector('.options')
//Options
$('.circle').click(() => {
  if(options.classList.contains('active')){
    options.classList.remove('active');
  }
  else {
    options.classList.add('active');
  }  
})

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

// Scroll navbar
window.addEventListener("scroll", () => {
  let current = sections[0].getAttribute('id');

  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
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

// Click
const focusCkeditor = document.querySelectorAll('.focus');
var status;

const items = document.querySelectorAll('.list-group-item');
items.forEach((element, index) => {

  element.addEventListener("click", () => {
      element.setAttribute('contentEditable', 'true');
      CKEDITOR.inline(element, {
        allowedContent: true,
        startupFocus: true
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

//add
$('.btn-plus').click(function(element) {
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

  $(this).parent().siblings('#group6').prepend(`<div class="hover">
  <i class="fas fa-trash-alt btn-trash"></i>
  <i class="fas fa-arrows-alt btn-arrow"></i>
  <div class="list-group-item book-content">NEW ITEM</div>
  </div>`)

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
})

//Xử lý group list
const btnPlus = document.querySelectorAll('.btn-plus');

btnPlus.forEach((element) => {
  element.addEventListener('click', function() {
    if (element.parentNode.classList.contains('publication-details-title')) {
      let node = document.createElement('div');
      node.setAttribute('class', 'publication-item');

      node.innerHTML = `<i class="fas fa-trash-alt btn-trash"></i><i class="fas fa-arrows-alt btn-arrow"></i><div class="publication-name"><div class="list-group-item">A) International Journals</div><i class="fas fa-plus-circle btn-plus"></i></div><div class="list-group publication-content"><div class="hover"><i class="fas fa-trash-alt btn-trash"></i><i class="fas fa-arrows-alt btn-arrow"></i><div class="list-group-item">Van-Quyet Nguyen, Quyet-Thang Huynh, Kyungbaek Kim. Estimating searching cost of regular path queries on large graphs by exploiting unit-subqueries. Journal of Heuristics (2018). https://doi.org/10.1007/s10732-018-9402-0. ISI, Q1 Journal, IF=1.129.</div></div><div class="hover"><i class="fas fa-trash-alt btn-trash"></i><i class="fas fa-arrows-alt btn-arrow"></i><div class="list-group-item">Nguyen Hung-Cuong, Huynh Quyet-Thang and Le Hai-Trieu. Different Ranking of NHPP Software Reliability Growth Models with Generalized Measure and Predictability. International Journal of Applied Information Systems, Series Volume 7, Number 11, November 2014. ISSN 2249: 0868. pp. 1-6. DOI: 10.5120/ijais14-451257.</div></div></div>`;
      document.querySelector('.publication-list').insertBefore(node, document.querySelector('.publication-list').childNodes[0]);
      var content = document.querySelector('.publication-content');

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
        handle: '.btn-arrow'
      });

      const name = document.querySelector('.publication-name > .btn-plus');
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
      })
    } else if(element.parentNode.classList.contains('publication-name')) {
      var content = document.querySelector('.publication-example');
      let nodeChild = document.createElement('div');
      nodeChild.setAttribute('class', 'hover');
      nodeChild.innerHTML = `<i class="fas fa-trash-alt btn-trash"></i><i class="fas fa-arrows-alt btn-arrow"></i><div class="list-group-item">NEW ITEM</div> `;
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
    } else if (element.parentNode.classList.contains('add')) {
      let node = document.createElement('div');
      node.setAttribute('class', 'thesis-item');

      node.innerHTML = `<i class="fas fa-trash-alt btn-trash"></i><i class="fas fa-arrows-alt btn-arrow"></i><div class="thesis-name"><div class="list-group-item">Phd Thesis Supervised</div><i class="fas fa-plus-circle btn-plus"></i></div><div class="list-group thesis-content"><div class="hover"><i class="fas fa-trash-alt btn-trash"></i><i class="fas fa-arrows-alt btn-arrow"></i><div class="list-group-item">Pham Thi Quynh (2007-2010): Measurement and checking Web service and business process</div></div><div class="hover"><i class="fas fa-trash-alt btn-trash"></i><i class="fas fa-arrows-alt btn-arrow"></i><div class="list-group-item">Pham Thi Quynh (2007-2010): Measurement and checking Web service and business process</div></div></div>`;
      document.querySelector('.thesis-list').insertBefore(node, document.querySelector('.thesis-list').childNodes[0]);
      var content = document.querySelector('.thesis-content');

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
        handle: '.btn-arrow'
      });

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
      })
    } else if (element.parentNode.classList.contains('thesis-name')) {
        var content = document.querySelector('.thesis-example');
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
    } else if (element.parentNode.classList.contains('teaching-title')) {
      let node = document.createElement('div');
      node.setAttribute('class', 'teaching-item');

      node.innerHTML = `<i class="fas fa-trash-alt btn-trash"></i><i class="fas fa-arrows-alt btn-arrow"></i><div class="teaching-year"><div class="list-group-item">2018 - 2019</div><i class="fas fa-plus-circle btn-plus"></i></div><div class="list-group teaching-content"><div class="hover"><i class="fas fa-trash-alt btn-trash"></i><i class="fas fa-arrows-alt btn-arrow white-color "></i><div class="list-group-item">IT5630 - Advanced Project Management</div></div><div class="hover"><i class="fas fa-trash-alt btn-trash"></i><i class="fas fa-arrows-alt btn-arrow white-color "></i><div class="list-group-item">IT5630 - Advanced Project Management</div></div></div>`;
      document.querySelector('.teaching-list').insertBefore(node, document.querySelector('.teaching-list').childNodes[0]);
      console.log(node);
      var content = document.querySelector('.teaching-content');

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
        handle: '.btn-arrow'
      });

      const year = document.querySelector('.teaching-year > .btn-plus');
      year.addEventListener('click', (element) => {
        let nodeChild = document.createElement('div');
        nodeChild.setAttribute('class', 'hover');
        nodeChild.innerHTML = `<i class="fas fa-trash-alt btn-trash"></i><i class="fas fa-arrows-alt btn-arrow white-color "></i><div class="list-group-item">NEW ITEM</div>`;
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
      })
      
    } else if (element.parentNode.classList.contains('teaching-year')) {
      var content = document.querySelector('.teaching-example');
      let nodeChild = document.createElement('div');
        nodeChild.setAttribute('class', 'hover');
        nodeChild.innerHTML = `<i class="fas fa-trash-alt btn-trash"></i><i class="fas fa-arrows-alt btn-arrow white-color "></i><div class="list-group-item">NEW ITEM</div>`;
        content.insertBefore(nodeChild, content.childNodes[0]);

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
    }
  })
})

//Move
$(".list-group").sortable({
  handle: '.btn-arrow'
});

