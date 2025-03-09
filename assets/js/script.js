document.addEventListener('DOMContentLoaded', function() {
  // Determină calea relativă prefix în funcție de adâncimea paginii
  const pathDepth = location.pathname.split('/').filter(Boolean).length;
  const pathPrefix = pathDepth > 1 ? '../'.repeat(pathDepth) : './';
  
  // Încarcă header-ul
  const headerContainer = document.querySelector('#header-container');
  if (headerContainer) {
    fetch(pathPrefix + 'assets/components/header.html')
      .then(response => response.text())
      .then(data => {
        headerContainer.innerHTML = data;
        initMobileMenu();
      });
  }
  
  // Încarcă footer-ul
  const footerContainer = document.querySelector('#footer-container');
  if (footerContainer) {
    fetch(pathPrefix + 'assets/components/footer.html')
      .then(response => response.text())
      .then(data => {
        footerContainer.innerHTML = data;
        document.querySelector('#current-year').textContent = new Date().getFullYear();
      });
  }
  
  // Inițializează meniul mobil
  function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', function() {
        document.querySelector('.nav-links').classList.toggle('active');
        this.classList.toggle('active');
      });
    }
  }
});

// JavaScript pentru tutorialul Alege Sănătos
// Se adaugă în script.js existent

document.addEventListener('DOMContentLoaded', function() {
  // Verificăm dacă suntem pe pagina tutorialului Alege Sănătos
  if (document.querySelector('.tutorial-container')) {
    initTutorialFeatures();
  }
});

function initTutorialFeatures() {
  // Animăm scroll-ul când se apasă pe butonul "Să începem!"
  const startButton = document.querySelector('.get-started .btn.primary');
  if (startButton) {
    startButton.addEventListener('click', function(e) {
      // Permitem link-ul să se deschidă într-o fereastră nouă
      // Dar facem și un smooth scroll către primul pas
      const firstStep = document.querySelector('.tutorial-step');
      if (firstStep) {
        setTimeout(() => {
          firstStep.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 200);
      }
    });
  }

  // Adăugăm efect de highlight pentru codul în blocuri Scratch când se face hover
  const codeImages = document.querySelectorAll('.code-image');
  codeImages.forEach(image => {
    image.addEventListener('mouseenter', function() {
      this.classList.add('highlight');
    });
    image.addEventListener('mouseleave', function() {
      this.classList.remove('highlight');
    });
  });

  // Adăugăm validare interactivă pentru fiecare pas
  const tutorialSteps = document.querySelectorAll('.tutorial-step');
  tutorialSteps.forEach((step, index) => {
    // Adăugăm un buton de verificare pentru fiecare pas (exceptând ultimul)
    if (index < tutorialSteps.length - 1) {
      const checkButton = document.createElement('button');
      checkButton.className = 'check-step-btn';
      checkButton.innerHTML = '<i class="fas fa-check-circle"></i> Am terminat acest pas';
      
      checkButton.addEventListener('click', function() {
        this.classList.add('completed');
        this.innerHTML = '<i class="fas fa-check-circle"></i> Pas completat!';
        
        // Facem scroll către următorul pas
        setTimeout(() => {
          tutorialSteps[index + 1].scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 500);
      });
      
      step.appendChild(checkButton);
    }
  });

  // Adăugăm efect de zoom pentru imagini
  const tutorialImages = document.querySelectorAll('.sprites-image, .preview-image');
  tutorialImages.forEach(image => {
    image.addEventListener('click', function() {
      this.classList.toggle('zoomed');
    });
  });

  // Adăugăm un indicator de progres
  createProgressBar();
}

function createProgressBar() {
  const tutorialContainer = document.querySelector('.tutorial-container');
  const steps = document.querySelectorAll('.tutorial-step');
  
  if (!tutorialContainer || !steps.length) return;
  
  const progressBar = document.createElement('div');
  progressBar.className = 'tutorial-progress';
  
  const progressTrack = document.createElement('div');
  progressTrack.className = 'progress-track';
  
  const progressIndicator = document.createElement('div');
  progressIndicator.className = 'progress-indicator';
  
  progressTrack.appendChild(progressIndicator);
  progressBar.appendChild(progressTrack);
  
  // Adăugăm marcaje pentru fiecare pas
  steps.forEach((_, index) => {
    const marker = document.createElement('div');
    marker.className = 'step-marker';
    marker.setAttribute('data-step', index + 1);
    progressTrack.appendChild(marker);
  });
  
  // Inserăm bara de progres după header
  const tutorialHeader = document.querySelector('.tutorial-header');
  if (tutorialHeader) {
    tutorialHeader.after(progressBar);
  }
  
  // Actualizăm progresul în funcție de scroll
  window.addEventListener('scroll', function() {
    updateProgressBar(steps, progressIndicator);
  });
}

function updateProgressBar(steps, progressIndicator) {
  // Obținem poziția curentă de scroll
  const scrollPosition = window.scrollY + window.innerHeight / 2;
  
  // Găsim pasul curent
  let currentStepIndex = 0;
  
  steps.forEach((step, index) => {
    const stepTop = step.offsetTop;
    const stepBottom = stepTop + step.offsetHeight;
    
    if (scrollPosition >= stepTop && scrollPosition < stepBottom) {
      currentStepIndex = index;
    }
  });
  
  // Calculăm procentul de progres
  const progressPercent = (currentStepIndex / (steps.length - 1)) * 100;
  
  // Actualizăm bara de progres
  progressIndicator.style.width = `${progressPercent}%`;
  
  // Actualizăm marcajele
  const markers = document.querySelectorAll('.step-marker');
  markers.forEach((marker, index) => {
    if (index <= currentStepIndex) {
      marker.classList.add('active');
    } else {
      marker.classList.remove('active');
    }
  });
}



// Cod JavaScript pentru implementarea lightbox-ului pentru imagini cu cod
document.addEventListener('DOMContentLoaded', function() {
  // Selectează toate imaginile cu cod
  const codeImages = document.querySelectorAll('.code-image');
  
  // Adaugă cursor pointer pentru a indica faptul că imaginile sunt clicabile
  codeImages.forEach(img => {
    img.style.cursor = 'pointer';
    
    // Adaugă event listener pentru click
    img.addEventListener('click', function() {
      createLightbox(this);
    });
  });
  
  // Funcția pentru crearea lightbox-ului
  function createLightbox(image) {
    // Creează overlay-ul
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    
    // Creează containerul pentru imaginea mărită
    const imageContainer = document.createElement('div');
    imageContainer.className = 'lightbox-container';
    
    // Clonează imaginea și ajustează-i proprietățile
    const clonedImage = image.cloneNode(true);
    clonedImage.className = 'lightbox-image';
    clonedImage.style.cursor = 'default';
    
    // Adaugă butonul de închidere
    const closeButton = document.createElement('span');
    closeButton.className = 'lightbox-close';
    closeButton.innerHTML = '&times;';
    closeButton.title = 'Închide';
    
    // Adaugă elementele în DOM
    imageContainer.appendChild(clonedImage);
    imageContainer.appendChild(closeButton);
    overlay.appendChild(imageContainer);
    document.body.appendChild(overlay);
    
    // Adaugă animație de fade in
    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 10);
    
    // Eveniment pentru închiderea lightbox-ului
    function closeLightbox() {
      overlay.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(overlay);
      }, 300); // Timpul ar trebui să coincidă cu durata tranziției din CSS
    }
    
    // Închide lightbox-ul la click pe overlay sau butonul de închidere
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closeLightbox();
      }
    });
    
    closeButton.addEventListener('click', closeLightbox);
    
    // Închide lightbox-ul la apăsarea tastei Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    }, { once: true }); // Elimină eventul după folosire
  }
});