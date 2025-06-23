document.addEventListener('DOMContentLoaded', () => {
    // Only show offline message if we detect an actual network error
    let hasNetworkError = false;
    let isInitialLoad = true;

    // Listen for online/offline events
    window.addEventListener('online', () => {
        hideOfflineMessage();
        hasNetworkError = false;
    });

    window.addEventListener('offline', () => {
        // Ignore offline events during initial load or if already showing error
        if (!hasNetworkError && !isInitialLoad) {
            hasNetworkError = true;
            showOfflineMessage();
        }
    });

    // Set initial load to false after a short delay
    setTimeout(() => {
        isInitialLoad = false;
    }, 1000);

    function showOfflineMessage() {
        // Only show if not already showing
        if (!document.getElementById('offline-message')) {
            const offlineMessage = document.createElement('div');
            offlineMessage.id = 'offline-message';
            offlineMessage.setAttribute('role', 'alert');
            offlineMessage.innerHTML = `
                <div class="offline-content">
                    <h2>Connection Error</h2>
                    <p>Unable to load some resources. Please check your internet connection and try again.</p>
                    <button onclick="window.location.reload()">Retry</button>
                </div>
            `;
            document.body.appendChild(offlineMessage);
        }
    }

    function hideOfflineMessage() {
        const offlineMessage = document.getElementById('offline-message');
        if (offlineMessage) {
            offlineMessage.remove();
        }
    }

    // Add error handling for image loading
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'assets/images/placeholder.png';
            this.alt = 'Image failed to load';
        });
    });

    console.log('DOM fully loaded and parsed');

    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea');
        const errorMessages = {};

        // Initialize error messages
        formInputs.forEach(input => {
            const errorId = input.id + '-error';
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorMessages[input.id] = errorElement;
            }
        });

        // Add method error message element
        const methodError = document.getElementById('method-error');
        if (methodError) {
            errorMessages['method'] = methodError;
        }

        // Real-time validation
        formInputs.forEach(input => {
            input.addEventListener('input', () => {
                validateField(input);
            });

            input.addEventListener('blur', () => {
                validateField(input);
            });
        });

        // Radio button validation
        const radioButtons = contactForm.querySelectorAll('input[type="radio"]');
        let previousRadio = null;

        radioButtons.forEach(radio => {
            radio.addEventListener('click', (e) => {
                if (radio === previousRadio) {
                    // If clicking the same radio button that's already selected, unselect it
                    e.preventDefault();
                    radio.checked = false;
                    previousRadio = null;
                } else {
                    // Update the previous radio reference
                    previousRadio = radio;
                }
                validateRadioGroup();
            });
        });

        function validateField(input) {
            const errorElement = errorMessages[input.id];
            if (!errorElement) return;

            let isValid = true;
            let errorMessage = '';

            if (input.required && !input.value.trim()) {
                isValid = false;
                errorMessage = `${input.getAttribute('aria-label') || input.name} is required`;
            } else if (input.type === 'email' && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
            } else if (input.type === 'tel' && input.value.trim()) {
                const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
                if (!phoneRegex.test(input.value.trim())) {
                    isValid = false;
                    errorMessage = 'Please enter a valid phone number (123-456-7890)';
                }
            }

            input.setAttribute('aria-invalid', !isValid);
            errorElement.textContent = errorMessage;
            
            if (isValid) {
                input.classList.remove('error');
            } else {
                input.classList.add('error');
            }

            return isValid;
        }

        function validateRadioGroup() {
            const radioGroup = contactForm.querySelector('.methodItemWrap');
            const selectedMethod = contactForm.querySelector('input[name="method"]:checked');
            const errorElement = errorMessages['method'];
            
            if (!errorElement) return;

            // Since it's optional, we don't need to show an error if nothing is selected
            radioGroup.setAttribute('aria-invalid', 'false');
            errorElement.textContent = '';
            return true;
        }

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            let firstInvalidField = null;

            // Validate all fields
            formInputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                    if (!firstInvalidField) {
                        firstInvalidField = input;
                    }
                }
            });

            // No need to validate radio group since it's optional
            if (!isValid) {
                // Focus the first invalid field
                if (firstInvalidField) {
                    firstInvalidField.focus();
                }
                return;
            }

            // Update hidden input with selected method if one is selected
            const selectedMethod = contactForm.querySelector('input[name="method"]:checked');
            if (selectedMethod) {
                document.getElementById('selectedMethod').value = selectedMethod.value;
            } else {
                document.getElementById('selectedMethod').value = '';
            }

            // Submit the form
            this.submit();
        });
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
                    <a 
                        href="#"
                        class="solutions-link"
                        aria-expanded="false"
                        aria-controls="solutions-submenu"
                        aria-haspopup="true"
                        role="button"
                        tabindex="0"
                    >
                        Solutions <span class="arrow" aria-hidden="true"></span>
                    </a>
                    <ul id="solutions-submenu" class="submenu" role="menu">
                        <li class="submenu-item menu-item" role="none">
                            <a href="#" class="services-link" aria-expanded="false" aria-controls="services-submenu" aria-haspopup="true" role="button" tabindex="0">
                                Services <span class="arrow" aria-hidden="true"></span>
                            </a>
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
                        <li class="submenu-item" role="none">
                            <a href="industries.html" role="menuitem">Industries We Serve</a>
                        </li>
                        <li class="submenu-item" role="none">
                            <a href="faq.html" role="menuitem">FAQ</a>
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
                <a href="https://www.linkedin.com/in/placeholder" target="_blank" rel="noopener noreferrer" aria-label="Visit our LinkedIn profile (opens in new tab)">
                    <i class="fa-brands fa-linkedin" aria-hidden="true"></i>
                    <span class="visually-hidden">Opens in new tab</span>
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
    const mobileMenu = document.querySelector('header .container ul');
    const overlay = document.querySelector('.overlay');

    if (menuBtn && mobileMenu && overlay) {
        menuBtn.addEventListener('click', function() {
            this.classList.toggle('open');
            mobileMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = this.classList.contains('open') ? 'hidden' : '';
            this.setAttribute('aria-expanded', this.classList.contains('open'));
        });

        overlay.addEventListener('click', function() {
            menuBtn.classList.remove('open');
            mobileMenu.classList.remove('active');
            this.classList.remove('active');
            document.body.style.overflow = '';
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    }

    // Solutions dropdown functionality
    const solutionsLink = document.querySelector('.solutions-link');
    if (solutionsLink) {
        solutionsLink.addEventListener('click', function(e) {
            if (e.target === solutionsLink && (e.type === 'click' || e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                const submenu = document.getElementById('solutions-submenu');
                if (submenu) {
                    submenu.style.display = isExpanded ? 'none' : 'block';
                }
            }
        });
    }
    // Services dropdown functionality (now nested under Solutions)
    const servicesLink = document.querySelector('.services-link');
    if (servicesLink) {
        servicesLink.addEventListener('click', function(e) {
            if (e.target === servicesLink && (e.type === 'click' || e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                const submenu = document.getElementById('services-submenu');
                if (submenu) {
                    submenu.style.display = isExpanded ? 'none' : 'block';
                }
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

    // Ensure all content is within landmarks
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        // Move any content outside of landmarks into the main landmark
        const bodyChildren = Array.from(document.body.children);
        bodyChildren.forEach(child => {
            if (!child.hasAttribute('role') && 
                child !== mainContent && 
                child !== headerElement && 
                child !== footerElement && 
                child !== skipLink) {
                mainContent.appendChild(child);
            }
        });
    }
});