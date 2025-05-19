document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
        form.addEventListener('input', handleFormInput);
    });

    // Handle form submission
    function handleFormSubmit(event) {
        const form = event.target;
        const formData = new FormData(form);
        let isValid = true;

        // Validate required fields
        form.querySelectorAll('[required]').forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                showError(field, 'This field is required');
            } else {
                clearError(field);
            }
        });

        // Validate email format
        const emailField = form.querySelector('input[type="email"]');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                isValid = false;
                showError(emailField, 'Please enter a valid email address');
            }
        }

        // Validate phone format
        const phoneField = form.querySelector('input[type="tel"]');
        if (phoneField && phoneField.value) {
            const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
            if (!phoneRegex.test(phoneField.value)) {
                isValid = false;
                showError(phoneField, 'Please enter a valid phone number (123-456-7890)');
            }
        }

        // Validate radio button selection
        const radioGroup = form.querySelector('[role="radiogroup"]');
        if (radioGroup) {
            const selectedRadio = radioGroup.querySelector('input[type="radio"]:checked');
            if (!selectedRadio) {
                isValid = false;
                const errorMessage = 'Please select a preferred contact method';
                const errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                errorElement.textContent = errorMessage;
                errorElement.setAttribute('role', 'alert');
                errorElement.setAttribute('aria-live', 'polite');
                radioGroup.parentElement.appendChild(errorElement);
            }
        }

        if (!isValid) {
            event.preventDefault();
            // Focus the first field with an error
            const firstError = form.querySelector('.error-message:not(:empty)');
            if (firstError) {
                const field = form.querySelector(`[aria-describedby="${firstError.id}"]`);
                if (field) {
                    field.focus();
                }
            }
        }
    }

    // Handle form input
    function handleFormInput(event) {
        const field = event.target;
        if (field.hasAttribute('required') && field.value.trim()) {
            clearError(field);
        }
    }

    // Show error message
    function showError(field, message) {
        const errorId = field.getAttribute('aria-describedby');
        if (errorId) {
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.textContent = message;
                field.setAttribute('aria-invalid', 'true');
            }
        }
    }

    // Clear error message
    function clearError(field) {
        const errorId = field.getAttribute('aria-describedby');
        if (errorId) {
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.textContent = '';
                field.removeAttribute('aria-invalid');
            }
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
    const bars = document.querySelector("#menu-btn");
    const menu = document.querySelector("header ul");
    const overlay = document.querySelector(".overlay");

    if (bars && menu && overlay) {
        let isOpen = false;

        bars.addEventListener('click', function(event) {
            event.stopPropagation();
            menu.classList.toggle('open');
            isOpen = !isOpen;
            bars.classList.toggle('open');
            overlay.classList.toggle('active');
            bars.setAttribute('aria-expanded', isOpen);
        });

        document.addEventListener('click', function(event) {
            if (isOpen && !menu.contains(event.target)) {
                menu.classList.remove('open');
                bars.classList.remove('open');
                overlay.classList.remove('active');
                isOpen = false;
                bars.setAttribute('aria-expanded', 'false');
            }
        });

        menu.addEventListener('click', function(event) {
            event.stopPropagation();
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
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && targetId !== '' && !this.hasAttribute('data-no-scroll')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    // Update focus for keyboard users
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                }
            }
        });
    });
});