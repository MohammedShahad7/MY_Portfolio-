// Page Loader - Animate progress bar and remove after page loads
window.addEventListener('load', () => {
  const pageLoader = document.getElementById('pageLoader');
  if (pageLoader) {
    // Loader will fade out after 1s via CSS animation
    // This ensures all content is loaded before fade-out begins
    setTimeout(() => {
      pageLoader.style.pointerEvents = 'none';
    }, 1500);
  }
});

// Alternative: Remove loader immediately if page already loaded (cached)
if (document.readyState === 'complete') {
  const pageLoader = document.getElementById('pageLoader');
  if (pageLoader) {
    pageLoader.style.opacity = '0';
    pageLoader.style.pointerEvents = 'none';
  }
}

// Update progress number as progress bar animates
window.addEventListener('load', () => {
  const progressNumber = document.querySelector('.progress-number');
  if (progressNumber) {
    let currentPercent = 0;
    const target = 100;
    const duration = 1000; // 1 second
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * target, target);
      progressNumber.textContent = Math.floor(progress);

      if (progress < target) {
        requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
  }
});

const form = document.getElementById('feedback-form');
const statusMessage = document.getElementById('feedback-status');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const feedbackEntry = {
    name: formData.get('name')?.toString().trim() || '',
    email: formData.get('email')?.toString().trim() || '',
    message: formData.get('message')?.toString().trim() || '',
    timestamp: new Date().toISOString(),
  };

  const saved = typeof saveFeedbackEntry === 'function' && saveFeedbackEntry(feedbackEntry);

  if (saved) {
    statusMessage.textContent = 'Thanks! Your feedback has been received and stored.';
    statusMessage.style.color = '#10b981';
    form.reset();
  } else {
    statusMessage.textContent = 'Sorry, we could not store your feedback. Please try again.';
    statusMessage.style.color = '#f97316';
  }
});

// Fade-in animation on scroll
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  observer.observe(section);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add subtle parallax effect to hero (desktop only)
const hero = document.querySelector('.hero');
if (hero && window.innerWidth > 768) {
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const heroHeight = hero.offsetHeight;
    
    // Only apply parallax while hero is in view
    if (scrollPos < heroHeight) {
      hero.style.transform = `translateY(${scrollPos * 0.3}px)`;
    }
  });
}

// Animate buttons on hover
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px)';
  });
  btn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Prevent parallax animation on mobile
window.addEventListener('resize', () => {
  if (window.innerWidth <= 768 && hero) {
    hero.style.transform = 'translateY(0)';
  }
});
