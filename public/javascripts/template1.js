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

const items = document.querySelectorAll('.list-group-item');
items.forEach((element, index) => {
      element.setAttribute('contentEditable', 'true');
      CKEDITOR.inline(element, {
        allowedContent: true
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
      var node = document.createElement('div');
      
      node.innerHTML = `<i class="fas fa-trash-alt btn-trash"></i><div class="subtitle hover publication-title"><div class="list-group-item">A) International Journals</div><i class="fas fa-plus-circle btn-plus"></i></div><div class="publication-content"><div class="hover"><i class="fas fa-trash-alt btn-trash"></i><div class="list-group-item text-content">Van-Quyet Nguyen, Huu-Duy Nguyen, Quyet-Thang Huynh, Nalini Venkatasubramanian, Kyungbaek Kim, "A Scalable Approach for Dynamic Evacuation Routing in Large Smart Buildings", In Proceedings of the Fifth International Conference on Smart Computing (SMARTCOMP 2019), June 12-14, 2019, Washington D.C., US. (to be appeared)</div></div><div class="hover"><i class="fas fa-trash-alt btn-trash"></i><div class="list-group-item text-content">Van-Quyet Nguyen, Huu-Duy Nguyen, Quyet-Thang Huynh, Nalini Venkatasubramanian, Kyungbaek Kim, "A Scalable Approach for Dynamic Evacuation Routing in Large Smart Buildings", In Proceedings of the Fifth International Conference on Smart Computing (SMARTCOMP 2019), June 12-14, 2019, Washington D.C., US. (to be appeared)</div></div></div>`;

      node.childNodes[1].childNodes[0].addEventListener('click', () => {
        node.childNodes[1].childNodes[0].setAttribute('contentEditable', 'true');
        CKEDITOR.inline(node.childNodes[1].childNodes[0],{
          allowedContent: true,
          startupFocus: true
        });
      })

      node.childNodes[0].addEventListener('click', function() {
        node.childNodes[0].parentNode.remove();
      })

      node.childNodes[2].childNodes.forEach((element) => {
        element.childNodes[0].addEventListener('click', function() {
          element.childNodes[0].parentNode.remove();
        })
      })

      node.childNodes[1].childNodes[1].addEventListener('click', (element) => {
        var nodeChild = document.createElement('div');
        nodeChild.setAttribute('class', 'hover');
        nodeChild.innerHTML = `<i class="fas fa-trash-alt btn-trash"></i><div class="list-group-item text-content">NEW ITEM</div>`;

        console.log(node.childNodes[2]);
        // node.childNodes[2].appendChild(nodeChild);
        node.childNodes[2].insertBefore(nodeChild, node.childNodes[2].childNodes[0]) 

        node.childNodes[2].childNodes.forEach((element) => {
            element.childNodes[0].addEventListener('click', () => {
              element.childNodes[0].parentNode.remove();
            })
        })

        nodeChild.childNodes[1].addEventListener('click', () => {
          nodeChild.childNodes[1].setAttribute('contentEditable', 'true');
          CKEDITOR.inline(nodeChild.childNodes[1],{
            allowedContent: true,
            startupFocus: true
          });
        })
      })

      node.childNodes[2].childNodes.forEach((element) => {
        element.childNodes[1].addEventListener('click', () => {
          element.childNodes[1].setAttribute('contentEditable', 'true');
          CKEDITOR.inline(element.childNodes[1],{
            allowedContent: true,
            startupFocus: true
          });
        })
      })
      document.querySelector('.publication-list-content').insertBefore(node, document.querySelector('.publication-list-content').childNodes[0]);
    } else if (element.parentNode.classList.contains('add')) {
      var node = document.createElement('div');
      
      node.innerHTML = `<i class="fas fa-trash-alt btn-trash"></i><div class="subtitle hover th-title"><div class="list-group-item">Phd Thesis Supervised</div><i class="fas fa-plus-circle btn-plus"></i></div><div class="thesis-content"><div class="hover"><i class="fas fa-trash-alt btn-trash"></i><div class="list-group-item text-content">Pham Thi Quynh (2007-2010): Measurement and checking Web service and business process</div></div><div class="hover"><i class="fas fa-trash-alt btn-trash"></i><div class="list-group-item text-content">Pham Thi Quynh (2007-2010): Measurement and checking Web service and business process</div></div></div>`;

      node.childNodes[1].childNodes[0].addEventListener('click', () => {
        node.childNodes[1].childNodes[0].setAttribute('contentEditable', 'true');
        CKEDITOR.inline(node.childNodes[1].childNodes[0],{
          allowedContent: true,
          startupFocus: true
        });
      })

      node.childNodes[0].addEventListener('click', function() {
        node.childNodes[0].parentNode.remove();
      })

      node.childNodes[2].childNodes.forEach((element) => {
        element.childNodes[0].addEventListener('click', function() {
          element.childNodes[0].parentNode.remove();
        })
      })

      node.childNodes[1].childNodes[1].addEventListener('click', (element) => {
        var nodeChild = document.createElement('div');
        nodeChild.setAttribute('class', 'hover');
        nodeChild.innerHTML = `<i class="fas fa-trash-alt btn-trash"></i><div class="list-group-item text-content">NEW ITEM</div>`;
        // node.childNodes[2].appendChild(nodeChild);
        node.childNodes[2].insertBefore(nodeChild, node.childNodes[2].childNodes[0]) 

        node.childNodes[2].childNodes.forEach((element) => {
            element.childNodes[0].addEventListener('click', () => {
              element.childNodes[0].parentNode.remove();
            })
        })

        nodeChild.childNodes[1].addEventListener('click', () => {
          nodeChild.childNodes[1].setAttribute('contentEditable', 'true');
          CKEDITOR.inline(nodeChild.childNodes[1],{
            allowedContent: true,
            startupFocus: true
          });
        })
      })

      node.childNodes[2].childNodes.forEach((element) => {
        element.childNodes[1].addEventListener('click', () => {
          element.childNodes[1].setAttribute('contentEditable', 'true');
          CKEDITOR.inline(element.childNodes[1],{
            allowedContent: true,
            startupFocus: true
          });
        })
      })
      document.querySelector('.thesis-content').insertBefore(node, document.querySelector('.thesis-content').childNodes[0]);
    } else if (element.parentNode.classList.contains('teaching-title')) {
      var node = document.createElement('div');
      
      node.innerHTML = `<i class="fas fa-trash-alt btn-trash"></i><div class="teaching-year"><div class="list-group-item">2018 - 2019</div><i class="fas fa-plus-circle btn-plus"></i></div><div class="teaching-content"><div class="hover"><i class="fas fa-trash-alt btn-trash"></i><div class="list-group-item">IT5630 - Advanced Project Management</div></div><div class="hover"><i class="fas fa-trash-alt btn-trash"></i><div class="list-group-item">IT5630 - Advanced Project Management</div> </div></div>`;

      node.childNodes[1].childNodes[0].addEventListener('click', () => {
        node.childNodes[1].childNodes[0].setAttribute('contentEditable', 'true');
        CKEDITOR.inline(node.childNodes[1].childNodes[0],{
          allowedContent: true,
          startupFocus: true
        });
      })

      node.childNodes[0].addEventListener('click', function() {
        node.childNodes[0].parentNode.remove();
      })

      node.childNodes[2].childNodes.forEach((element) => {
        element.childNodes[0].addEventListener('click', function() {
          element.childNodes[0].parentNode.remove();
        })
      })

      node.childNodes[1].childNodes[1].addEventListener('click', (element) => {
        var nodeChild = document.createElement('div');
        nodeChild.setAttribute('class', 'hover');
        nodeChild.innerHTML = `<i class="fas fa-trash-alt btn-trash"></i><div class="list-group-item">IT5630 - Advanced Project Management</div>`;
        node.childNodes[2].insertBefore(nodeChild, node.childNodes[2].childNodes[0]) 

        node.childNodes[2].childNodes.forEach((element) => {
            element.childNodes[0].addEventListener('click', () => {
              element.childNodes[0].parentNode.remove();
            })
        })

        nodeChild.childNodes[1].addEventListener('click', () => {
          nodeChild.childNodes[1].setAttribute('contentEditable', 'true');
          CKEDITOR.inline(nodeChild.childNodes[1],{
            allowedContent: true,
            startupFocus: true
          });
        })
      })

      node.childNodes[2].childNodes.forEach((element) => {
        element.childNodes[1].addEventListener('click', () => {
          element.childNodes[1].setAttribute('contentEditable', 'true');
          CKEDITOR.inline(element.childNodes[1],{
            allowedContent: true,
            startupFocus: true
          });
        })
      })
      document.querySelector('.teaching-list').insertBefore(node, document.querySelector('.teaching-list').childNodes[0]);
    }
  })
})
