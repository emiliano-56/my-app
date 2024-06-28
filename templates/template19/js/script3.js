    // Handle click on "Report Case" button in mobile menu
    reportCaseBtnMobile.addEventListener('click', () => {
        // Add your logic to open the report case modal or navigate to report case form
        console.log('Report Case button clicked in mobile menu');
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('modal-open');
      });