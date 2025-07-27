document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById('customModal');
  const modalBody = document.getElementById('modalBody');
  const modalContent = document.getElementById('modal-content-area');
  const closeButton = document.querySelector('.btn-close-modal');
  const openButtons = document.querySelectorAll('.btn-open-modal');
  let isOpen = false;

  openButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      if (e.target.closest('.no-modal')) return;
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
          // 모달 내용이 로드된 후에 JavaScript 함수들을 실행
          initializeModalScripts();
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
    document.body.style.paddingRight = '';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      modalContent.innerHTML = '';
      isOpen = false;
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '';
    }
  });

  // ========== 추가된 모달 스크립트 함수들 ==========
  
  // 모달 내용이 로드된 후 실행될 함수들
  function initializeModalScripts() {
    generateModalActivityChart();
    initializeModalYearSelector();
  }

  // 활동 차트 생성
  function generateModalActivityChart() {
    const chart = document.getElementById('modalActivityChart');
    if (!chart) return; // 차트 요소가 없으면 종료
    
    // 기존 내용 제거
    chart.innerHTML = '';
    
    const months = 12;
    
    for (let i = 0; i < months; i++) {
      const bar = document.createElement('div');
      bar.className = 'modal-chart-bar';
      bar.style.left = `${(i * 100 / months) + 5}%`;
      bar.style.height = `${Math.random() * 80 + 20}%`;
      chart.appendChild(bar);
    }
  }

  // 연도 선택 기능
  function initializeModalYearSelector() {
    const yearItems = document.querySelectorAll('.modal-year-item');
    
    yearItems.forEach(item => {
      // 기존 이벤트 리스너 제거를 위해 클론으로 교체
      const newItem = item.cloneNode(true);
      item.parentNode.replaceChild(newItem, item);
      
      newItem.addEventListener('click', function() {
        document.querySelectorAll('.modal-year-item').forEach(yearItem => {
          yearItem.classList.remove('active');
        });
        this.classList.add('active');
        
        // 차트 재생성 (선택 사항)
        generateModalActivityChart();
      });
    });
  }
});