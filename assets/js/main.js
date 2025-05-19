document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.appendChild(skipLink);

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
        form.addEventListener('input', handleFormInput);
    });

    // Handle form submission
    function handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        let isValid = true;

        // Validate first name
        const firstName = form.querySelector('#firstName');
        if (!firstName.value.trim()) {
            showError(firstName, 'First name is required');
            isValid = false;
        }

        // Validate last name
        const lastName = form.querySelector('#lastName');
        if (!lastName.value.trim()) {
            showError(lastName, 'Last name is required');
            isValid = false;
        }

        // Validate email
        const email = form.querySelector('#email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate phone (optional)
        const phone = form.querySelector('#phone');
        if (phone.value.trim()) {
            const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
            if (!phoneRegex.test(phone.value)) {
                showError(phone, 'Please enter a valid phone number (123-456-7890)');
                isValid = false;
            }
        }

        // Validate message
        const message = form.querySelector('#message');
        if (!message.value.trim()) {
            showError(message, 'Message is required');
            isValid = false;
        }

        // Validate contact method
        const contactMethod = form.querySelector('input[name="method"]:checked');
        if (!contactMethod) {
            const methodError = form.querySelector('.methodItemWrap');
            if (methodError) {
                methodError.setAttribute('aria-invalid', 'true');
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Please select a preferred contact method';
                errorMessage.setAttribute('role', 'alert');
                errorMessage.setAttribute('aria-live', 'polite');
                methodError.appendChild(errorMessage);
            }
            isValid = false;
        }

        if (isValid) {
            // Update hidden field with selected method
            const selectedMethod = form.querySelector('#selectedMethod');
            if (selectedMethod && contactMethod) {
                selectedMethod.value = contactMethod.value;
            }
            
            // Submit the form
            form.submit();
        } else {
            // Focus the first invalid field
            const firstInvalidField = form.querySelector('[aria-invalid="true"]');
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
        }
    }

    // Handle form input
    function handleFormInput(event) {
        const input = event.target;
        clearError(input);
    }

    // Show error message
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            const errorDiv = formGroup.querySelector('.error-message');
            if (errorDiv) {
                errorDiv.textContent = message;
                errorDiv.style.display = 'block';
            }
            input.setAttribute('aria-invalid', 'true');
        }
    }

    // Clear error message
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            const errorDiv = formGroup.querySelector('.error-message');
            if (errorDiv) {
                errorDiv.textContent = '';
                errorDiv.style.display = 'none';
            }
            input.removeAttribute('aria-invalid');
        }
    }

    // Header content
    const headerContent = `
    <div class="container">
        <a href="index.html">
            <img src="assets/images/logo.svg" alt="ProductCraft logo" class="logo" />
        </a>
        <nav aria-label="Main navigation">
            <ul>
                <li class="mobile-only">
                    <a href="index.html">
                        <img src="assets/images/logo.svg" alt="ProductCraft logo" class="logo" />
                    </a>
                </li>
                <li>
                    <a href="index.html">Home</a>
                </li>
                <li>
                    <a href="about.html">About Us</a>
                </li>
                <li>
                    <a href="why-choose-us.html">Why Choose Us</a>
                </li>
                <li class="menu-item">
                    <button 
                        class="services-link" 
                        aria-expanded="false" 
                        aria-controls="services-submenu"
                    >
                        Services <span class="arrow" aria-hidden="true"></span>
                    </button>
                    <ul id="services-submenu" class="submenu" role="menu">
                        <li class="submenu-item" role="none">
                            <a href="strategic-consulting.html" role="menuitem">Strategic Consulting</a>
                        </li>
                        <li class="submenu-item" role="none">
                            <a href="product-development.html" role="menuitem">Product Development</a>
                        </li>
                        <li class="submenu-item" role="none">
                            <a href="project-management.html" role="menuitem">Project Management</a>
                        </li>
                        <li class="submenu-item" role="none">
                            <a href="software-development.html" role="menuitem">Software Development</a>
                        </li>
                        <li class="submenu-item" role="none">
                            <a href="iterative-enhancements.html" role="menuitem">Iterative Enhancements</a>
                        </li>
                        <li class="submenu-item" role="none">
                            <a href="email-marketing.html" role="menuitem">Email Marketing</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="get-in-touch.html">Get In Touch</a>
                </li>
            </ul>
        </nav>
        <button 
            class="menu-btn" 
            id="menu-btn" 
            aria-label="Toggle menu" 
            aria-expanded="false" 
            aria-controls="mobile-menu"
        >
            <div class="menu-btn__burger" aria-hidden="true"></div>
        </button>
    </div>
    `;

    // Footer content
    const footerContent = `
    <div class="container">
        <div class="footerTop">
            <ul>
                <li>
                    <a href="about.html">About Us</a>
                </li>
                <li>
                    <a href="why-choose-us.html">Why Choose Us</a>
                </li>
                <li>
                    <a href="#services">Our Services</a>
                </li>
                <li>
                    <a href="get-in-touch.html">Get In Touch</a>
                </li>
            </ul>
            <div class="footerSocial">
                <a href="https://www.linkedin.com/in/placeholder" target="_blank" rel="noopener noreferrer" aria-label="Visit our LinkedIn profile">
                    <i class="fa-brands fa-linkedin" aria-hidden="true"></i>
                </a>
            </div>
        </div>
        <div class="footerBottom">
            <p>
                &copy; Copyright 2025, All Rights Reserved by ProductCraft Solutions
            </p>
        </div>
    </div>
    `;

    // Inject header and footer content if elements are present
    const headerElement = document.getElementById('header');
    const footerElement = document.getElementById('footer');

    if (headerElement) {
        console.log('Header element found');
        headerElement.innerHTML = headerContent;
    } else {
        console.error('Header element is missing');
    }

    if (footerElement) {
        console.log('Footer element found');
        footerElement.innerHTML = footerContent;
    } else {
        console.error('Footer element is missing');
    }

    // Mobile menu functionality
    const menuBtn = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.mobile-only');
    const overlay = document.querySelector('.overlay');

    if (menuBtn && mobileMenu && overlay) {
        menuBtn.addEventListener('click', function() {
            this.classList.toggle('open');
            mobileMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = this.classList.contains('open') ? 'hidden' : '';
        });

        overlay.addEventListener('click', function() {
            menuBtn.classList.remove('open');
            mobileMenu.classList.remove('active');
            this.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Services dropdown functionality
    const servicesLink = document.querySelector('.services-link');
    if (servicesLink) {
        servicesLink.addEventListener('click', function(e) {
            e.preventDefault();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            const submenu = document.getElementById('services-submenu');
            if (submenu) {
                submenu.style.display = isExpanded ? 'none' : 'block';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Update focus for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });
    });
});