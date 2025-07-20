document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById('customModal');
  const modalBody = document.getElementById('modalBody');
  const modalContent = document.getElementById('modal-content-area');
  const closeButton = document.querySelector('.btn-close-modal');
  const openButtons = document.querySelectorAll('.btn-open-modal');

  openButtons.forEach(button => {
    button.addEventListener('click', () => {
      const url = button.getAttribute('data-url');
      modal.style.display = 'block';
      isOpen = true;
      
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;
      modalBody.style.top = `${scrollY + viewportHeight / 2}px`;
      modalBody.style.transform = 'translate(-50%, -50%)';
      
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      fetch(url)
        .then(res => res.text())
        .then(html => {
          modalContent.innerHTML = html;
        })
        .catch(() => {
          modalContent.innerHTML = "<p>불러오기 실패</p>";
        });
        if (isOpen) {
          document.body.style.overflow = 'hidden';
        } else {
           document.body.style.overflow = 'auto';
        }
    });
  });

  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
    modalContent.innerHTML = '';
    isOpen = false;
    document.body.style.overflow = 'auto';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      modalContent.innerHTML = '';
      isOpen = false;
      document.body.style.overflow = 'auto';
    }
  });
});
