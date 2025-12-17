document.addEventListener('DOMContentLoaded', () => {

  if (!window.matchMedia('(max-width: 850px)').matches) return;

  const toggle = document.getElementById('menuToggle');
  const navMenu = document.querySelector('#navMenu ul');

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

});
