//navbar pop modal code...
const reportCaseBtn = document.getElementById('reportCaseBtn');
const reportCaseModal = document.getElementById('reportCaseModal');
const closeModalBtn = document.getElementById('closeModalBtn');

// Open modal when "Report Case" button is clicked
reportCaseBtn.addEventListener('click', () => {
  reportCaseModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

// Close modal when close button is clicked
closeModalBtn.addEventListener('click', () => {
  reportCaseModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

// Close modal if user clicks outside the modal content
reportCaseModal.addEventListener('click', (event) => {
  if (event.target === reportCaseModal) {
    reportCaseModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
});

