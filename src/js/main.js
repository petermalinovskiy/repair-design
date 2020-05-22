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

  //валидация формы

  $('.modal__form').validate({
    errorClass: "invalid",
    rules: {
      // строчное правило
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      }, 
      userPhone: "required",
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
        minlength: "Имя не короче дву букв",
        maxlength: "Имя не длинее пятнатцати букв"
      },
      userPhone: "Заполните поле",
      policyCheckbox: "Поставьте галочку",
      userEmail: {
        required: "Заполните поле",
        email: "Введите корректный email в формате name@domain.com"
      }
    }
  });

  // Маска для телефона

  $('[type=tel]').mask('+7 (000) 000-00-00', {placeholder: "+7 (___) ___-__-__"});

});