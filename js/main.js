// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handler
function showAlert(message, isSuccess = true) {
    const alert = document.getElementById('formAlert');
    const alertMessage = document.getElementById('alertMessage');
    
    alertMessage.textContent = message;
    alert.className = isSuccess ? 'form-alert show' : 'form-alert show error';
    alert.querySelector('i').className = isSuccess ? 
        'fas fa-check-circle' : 'fas fa-exclamation-circle';
    
    setTimeout(() => {
        alert.classList.remove('show');
    }, 5000);
}

document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
            const data = await response.json();
            showAlert(data.message || '✓ Message sent successfully!');
            form.reset();
            
            const nextPage = form.querySelector('input[name="_next"]')?.value;
            if (nextPage) {
                setTimeout(() => {
                    window.location.href = nextPage;
                }, 1000);
            }
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error('Submission error:', error);
        showAlert('✓ Sent! (Confirmation pending)', false);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
    }
});