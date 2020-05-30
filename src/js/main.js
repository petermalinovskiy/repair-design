
$(document).ready(function () {

  const modal = $('.modal'),
      modalBtn = $('[data-toggle=modal]'),
      closeBtn = $('.modal__close'),
      modalSuccess = $('.modal-success'),
      closeSuccess = $('.success-dialog__button');

  modalBtn.on('click', function () {
      modal.toggleClass('modal--visible');
  })
  closeBtn.on('click', function () {
      modal.toggleClass('modal--visible');

  })
  closeSuccess.on('click', function () {
    $(modalSuccess).removeClass('modal-success--visible');

})
  $(document).keydown(function (event) {
      if (event.keyCode === 27) {
          $(modal).removeClass('modal--visible');
          $(modalSuccess).removeClass('modal-success--visible')
      }
  });
  $(document).click(function (event) {
      if ($(event.target).is(modal) || $(event.target).is(modalSuccess)) {
          $(modal).removeClass('modal--visible');
          $(modalSuccess).removeClass('modal-success--visible');
      }
  });

  //Проверим если скролла нет, тогда не показываем кнопку
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.scroll-up').fadeIn();
    } else {
        $('.scroll-up').fadeOut();
    }
  });

  //Клик событие, чтобы проскролить вверх
  $('.scroll-up').click(function () {
      $('html, body').animate({scrollTop: 0}, 800);
      return false;
  });
  //Клик событие, чтобы проскролить вниз
  $('.hero__scroll-down').click(function () {
      $("html, body").animate({scrollTop: ($(window).height()) - ($('header').outerHeight())}, 600);
      return false;
  })

  //плавные якорные ссылки
  $('.menu__nav').on('click', 'a', function(e) {
    e.preventDefault();
    var o = $(this).attr('href')
    if (o.startsWith("#") && o.length > 1) {
            var i = $(o).offset().top;
            $('body,html').animate({
                scrollTop: i
            }, 1000)
        }
  })

  var mySwiper = new Swiper ('.swiper-container', {
    loop: true,
    spaceBetween: 30,
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

  next.css('left', prev.width() + 25 + bullets.width() + 25);
  bullets.css('left', prev.width() + 25)

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
      },
      submitHandler: function(form) {
        $.ajax({
          type: "POST",
          url: "send.php",
          data: $(form).serialize(),
          success: function (response) {
            $(form)[0].reset();
            $(modal).removeClass('modal--visible');
            $(modalSuccess).addClass('modal-success--visible')
          }
        });
      }

    })  
  });

  var player;

  $(".video__play").on("click", function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height:"460",
      width:"100%",
      videoId: 'oPx6nrcr-pw',
      events: {
        'onReady': videoPlay,
      }
    });
  })

  function videoPlay(event) {
    event.target.playVideo();
  }



  // Маска для телефона

  $('[type=tel]').mask('+7 (000) 000-00-00')

});