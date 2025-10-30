document.addEventListener('DOMContentLoaded', function() {
    // Tab Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const contentTabs = document.querySelectorAll('.content-tab');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get target tab ID
            const targetTab = this.getAttribute('data-tab');
            
            // Hide all tabs
            contentTabs.forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Show target tab
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // Button navigation
    document.querySelectorAll('[data-tab]').forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
                if(navItem.getAttribute('data-tab') === targetTab) {
                    navItem.classList.add('active');
                }
            });
            
            contentTabs.forEach(tab => {
                tab.classList.remove('active');
                if(tab.id === targetTab) {
                    tab.classList.add('active');
                }
            });
        });
    });
    
    // Experiment Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const experimentCards = document.querySelectorAll('.experiment-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter experiment cards
            experimentCards.forEach(card => {
                if(filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const cardStatus = card.getAttribute('data-status');
                    card.style.display = cardStatus === filter ? 'block' : 'none';
                }
            });
        });
    });
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if(!input.value.trim()) {
                    input.style.borderColor = 'var(--accent)';
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if(isValid) {
                alert('Thank you for your message! We will contact you soon.');
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
    
    // Team Member Modal Functionality
    const teamMembers = document.querySelectorAll('.team-member.clickable');
    const modal = document.getElementById('teamModal');
    const modalClose = document.querySelector('.modal-close');
    
    // Social media platform icons mapping
    const socialIcons = {
        linkedin: 'fab fa-linkedin',
        github: 'fab fa-github',
        artstation: 'fab fa-artstation',
        portfolio: 'fas fa-globe',
        twitter: 'fab fa-twitter',
        instagram: 'fab fa-instagram',
        behance: 'fab fa-behance'
    };
    
    // Platform display names
    const platformNames = {
        linkedin: 'LinkedIn',
        github: 'GitHub',
        artstation: 'ArtStation',
        portfolio: 'Portfolio',
        twitter: 'Twitter',
        instagram: 'Instagram',
        behance: 'Behance'
    };
    
    teamMembers.forEach(member => {
        member.addEventListener('click', function() {
            // Get data from clicked member
            const name = this.getAttribute('data-name');
            const role = this.getAttribute('data-role');
            const bio = this.getAttribute('data-bio');
            const image = this.querySelector('img').src;
            
            // Update modal content
            document.getElementById('modalName').textContent = name;
            document.getElementById('modalRole').textContent = role;
            document.getElementById('modalBio').textContent = bio;
            document.getElementById('modalImage').src = image;
            
            // Generate social links
            const socialLinksContainer = document.getElementById('modalSocialLinks');
            socialLinksContainer.innerHTML = '';
            
            // Check each possible social platform
            Object.keys(socialIcons).forEach(platform => {
                const link = this.getAttribute(`data-${platform}`);
                if (link && link.trim() !== '') {
                    const socialLink = document.createElement('a');
                    socialLink.href = link;
                    socialLink.target = '_blank';
                    socialLink.rel = 'noopener noreferrer';
                    socialLink.className = 'social-link';
                    
                    socialLink.innerHTML = `
                        <i class="${socialIcons[platform]}"></i>
                        ${platformNames[platform]}
                    `;
                    
                    socialLinksContainer.appendChild(socialLink);
                }
            });
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
    
    // Close modal functionality
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
    
    modalClose.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
});