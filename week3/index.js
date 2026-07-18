/* ==========================================================================
   INTERNSHIP SUBMISSION - WEEK 3 - CLIENT DYNAMICS & DOM INTERACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. INITIALIZE SPECIALIZATION FILTER
  // Pre-load Java Full-Stack roles visual highlight on startup
  switchActiveRole('java');

  // 2. TYPING CAROUSEL EFFECT (HERO SUB-HEADER)
  const typingTextElement = document.getElementById('typing-text');
  const roles = [
    "Java Full-Stack Developer",
    "ServiceNow CSA & CAD Certified",
    "Problem Solver (530+ DSA Solved)"
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function playTypingAnimation() {
    const currentText = roles[roleIndex];
    
    if (isDeleting) {
      // Backspace character
      typingTextElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Type next character
      typingTextElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let typingSpeed = isDeleting ? 40 : 80;
    
    // Pause rules
    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = 2000; // Hold full sentence
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length; // Loop role items
      typingSpeed = 400; // Brief pause before typing starts
    }
    
    setTimeout(playTypingAnimation, typingSpeed);
  }
  
  if (typingTextElement) {
    playTypingAnimation();
  }

  // 3. NAVBAR BACKDROP SHRINK ON SCROLL
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 4. MOBILE HAMBURGER MENU DRAWER
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      // Toggle class lists to activate styling transitions
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('open');
    });

    // Automatically collapse drawer when a navigation anchor is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('open');
      });
    });
  }
});

// 5. SPECIALIZATION PROFILE SWITCHING (GLOBAL EXPOSURE)
window.switchActiveRole = function(role) {
  const javaToggleBtn = document.getElementById('role-toggle-java');
  const snToggleBtn = document.getElementById('role-toggle-servicenow');
  
  if (!javaToggleBtn || !snToggleBtn) return;
  
  // Highlight active selector toggle
  if (role === 'java') {
    javaToggleBtn.classList.add('active');
    snToggleBtn.classList.remove('active');
    filterSections('java');
  } else if (role === 'servicenow') {
    snToggleBtn.classList.add('active');
    javaToggleBtn.classList.remove('active');
    filterSections('servicenow');
  }
};

// Internal filter system applying visibility modifiers
function filterSections(selectedRole) {
  const filterElements = document.querySelectorAll('.filter-section, .project-card');
  
  filterElements.forEach(element => {
    const elementRole = element.getAttribute('data-role');
    
    if (elementRole === selectedRole) {
      element.classList.remove('dimmed');
      element.classList.add('highlighted-role');
    } else {
      element.classList.remove('highlighted-role');
      element.classList.add('dimmed');
    }
  });
}
