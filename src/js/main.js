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

});