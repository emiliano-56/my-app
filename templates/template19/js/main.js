  
//avaScript 
  
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const reportCaseBtnMobile = document.getElementById('reportCaseBtnMobile');
  
    // Toggle mobile menu when menu button is clicked
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      document.body.classList.toggle('modal-open');
    });
  
    // Close mobile menu when close button is clicked
    closeMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      document.body.classList.remove('modal-open');
    });
  
    // Close mobile menu if user clicks outside the menu
    mobileMenu.addEventListener('click', (event) => {
      if (event.target === mobileMenu) {
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('modal-open');
      }
    });
  

  




  // JavaScript for form submission
  document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Form submitted!');
  });
