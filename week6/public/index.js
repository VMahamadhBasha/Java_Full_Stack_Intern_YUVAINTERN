/* ==========================================================================
   INTERNSHIP SUBMISSION - WEEK 6 - CLIENT SCRIPTS WITH AJAX API FETCH PIPELINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. INITIALIZE SPECIALIZATION PROFILE
  switchActiveRole('java');

  // 2. HERO TYPING LOOP CAROUSEL
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
      typingTextElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingTextElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let typingSpeed = isDeleting ? 40 : 80;
    
    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }
    
    setTimeout(playTypingAnimation, typingSpeed);
  }
  
  if (typingTextElement) {
    playTypingAnimation();
  }

  // 3. SCROLL DETECTOR NAVBAR ACTION
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 4. MOBILE HAMBURGER MENU TOGGLE
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('open');
    });

    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('open');
      });
    });
  }

  // 5. ASYNCHRONOUS FORM SUBMISSION API INTEGRATION
  const contactForm = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-feedback-alert');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Stop page reload and mailto triggers

      // Reset feedback alert box state
      alertBox.className = 'form-feedback-alert';
      alertBox.style.display = 'none';

      // Pull input values
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      // Basic validation check
      if (!name || !email || !message) {
        showFeedback("All fields are required.", "error");
        return;
      }

      try {
        // Toggle visual loading state on the button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending Message...';

        console.log("Sending message to backend API...");

        // Dispatch AJAX POST query to backend contact endpoint
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, message })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Success case
          showFeedback(data.message, "success");
          contactForm.reset(); // Clear input boxes
        } else {
          // Failure response payload
          showFeedback(data.message || "Failed to deliver message.", "error");
        }
      } catch (err) {
        // Network connection error
        console.error("Network submission error details: ", err);
        showFeedback("Network error. Make sure your backend server is running.", "error");
      } finally {
        // Restore button visual state
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    });
  }

  // Helper function to handle notification presentation
  function showFeedback(text, type) {
    alertBox.textContent = text;
    alertBox.className = `form-feedback-alert ${type}`;
    alertBox.style.display = 'block';
  }
});

// 6. SPECIALIZATION FILTER (GLOBAL EXPOSURE)
window.switchActiveRole = function(role) {
  const javaToggleBtn = document.getElementById('role-toggle-java');
  const snToggleBtn = document.getElementById('role-toggle-servicenow');
  
  if (!javaToggleBtn || !snToggleBtn) return;
  
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
