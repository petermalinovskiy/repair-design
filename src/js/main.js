/*
document.addEventListener("DOMContentLoaded", function(event) { 
  const modal = document.querySelector('.modal');
  const modalBtn = document.querySelectorAll('[data-toggle=modal]');
  const closeBtn = document.querySelector('.modal__close');
  const switchModal = () => {
    modal.classList.toggle('modal--visible')
  }

  modalBtn.forEach(element => {
    element.addEventListener('click', switchModal);
  });

  closeBtn.addEventListener('click', switchModal);

  //закрытие по клику вне модального окна
  window.onclick = function(event) {
    if (event.target === modal) {
        modal.classList.remove('modal--visible');
    }
}

//закрытие по кнопке Escape
window.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
      modal.classList.remove('modal--visible');
  }
})
  
})
*/
$( document ).ready(function() {
  var modal = $('.modal'),
      modalBtn = $('[data-toggle=modal]'),
      closeBtn = $('.modal__close');

  modalBtn.on('click', function () {
    modal.toggleClass('modal--visible')
  })

  closeBtn.on('click', function () {
    modal.toggleClass('modal--visible')
  })

  $(document).keydown(function (event) {
    if (event.keyCode === 27) {
        $(modal).removeClass('modal--visible');
    }
  });

  $(document).click(function (event) {
      if ($(event.target).is(modal)) {
          $(modal).removeClass('modal--visible');
      }
  });

  var mySwiper = new Swiper ('.swiper-container', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },
  })

  var next = $('.swiper-button-next');
  var prev = $('.swiper-button-prev');
  var bullets = $('.swiper-pagination');

  next.css('left', prev.width() + 30 + bullets.width() + 30);
  bullets.css('left', prev.width() + 30)

  new WOW().init();

  //валидация формы модальное окно

  $('.form').each(function () {
    $(this).validate({
      errorClass: "invalid",        
      errorElement: 'div',
      rules: {
        // строчное правило
        userName: {
          required: true,
          minlength: 2,
          maxlength: 15
        }, 
        userPhone: {
          required: true,
          minlength: 18
        }, 
        userQuestion: "required",
        policyCheckbox: "required",
        // правило-объект
        userEmail: {
          required: true,
          email: true
        }
      }, // сообщения
      messages: {
        userName: {
          required: "Заполните поле",
          minlength: "Имя должно быть не короче 2 букв",
          maxlength: "Имя должно быть не длинее 15 букв"
        },
        userPhone: {        
        required: "Заполните поле",
        minlength: "Введите корректный номер телефона"
        },
        userQuestion: "Заполните поле",
        policyCheckbox: "Согласитесь с обработкой данных",
        userEmail: {
          required: "Заполните поле",
          email: "Введите корректный email в формате name@domain.com"
        }
      },
      errorPlacement: function (error, element) {
        if (element.attr("id") == "control-policy-checkbox") {
          error.insertAfter(".control__policy-label");
        }
        else if (element.attr("id") == "footer-policy-checkbox") {
          error.insertAfter(".footer__policy-label");
        }
        else if (element.attr("id") == "modal-policy-checkbox") {
              error.insertAfter(".modal__policy-label");
        } else {
          error.insertAfter(element);
        }  
      }

    })  
  });


  



  // Маска для телефона

  $('[type=tel]').mask('+7 (000) 000-00-00')

});