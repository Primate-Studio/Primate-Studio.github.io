document.addEventListener('DOMContentLoaded', function() {
    // Radial Navigation Functionality
    const navItems = document.querySelectorAll('.nav-item');
    const contentTabs = document.querySelectorAll('.content-tab');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target tab from data attribute
            const targetTab = this.getAttribute('data-tab');
            
            // Update active states
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            this.classList.add('active');
            
            // Show corresponding tab
            contentTabs.forEach(tab => {
                tab.classList.remove('active');
                if(tab.id === targetTab) {
                    tab.classList.add('active');
                }
            });
            
            // Smooth scroll to top of tab
            document.querySelector(`#${targetTab}`).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Initialize first tab as active
    if(navItems.length > 0 && contentTabs.length > 0) {
        navItems[0].classList.add('active');
        contentTabs[0].classList.add('active');
    }
});