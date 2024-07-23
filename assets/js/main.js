document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    // Header content
    const headerContent = `
    <div class="container">
        <a href="index.html">
            <img src="assets/images/logo.svg" alt="ProductCraft logo" class="logo" />
        </a>
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
                <a href="#">Services <span class="arrow"></span></a>
                <ul class="submenu">
                    <li class="submenu-item"><a href="strategic-consulting.html">Strategic Consulting</a></li>
                    <li class="submenu-item"><a href="product-development.html">Product Development</a></li>
                    <li class="submenu-item"><a href="project-management.html">Project Management</a></li>
                    <li class="submenu-item"><a href="software-integration-development.html">Software & Integration Development</a></li>
                    <li class="submenu-item"><a href="testing-iterative-enhancements.html">Testing & Iterative Enhancements</a></li>
                    <li class="submenu-item"><a href="email-marketing.html">Email Marketing</a></li>
                </ul>
            </li>
            <li>
                <a href="get-in-touch.html">Get In Touch</a>
            </li>
        </ul>
        <div class="menu-btn" id="menu-btn">
            <div class="menu-btn__burger"></div>
        </div>
    </div>
    `;

    // Footer content
    const footerContent = `
    <div class="container">
        <div class="footerTop">
            <img src="assets/images/logo.svg" alt="ProductCraft logo" class="footerLogo" />
            <ul>
                <li>
                    <a href="about.html">About Us</a>
                </li>
                <li>
                    <a href="why-choose-us.html">Why Choose Us</a>
                </li>
                <li>
                    <a href="#header">Our Services</a>
                </li>
                <li>
                    <a href="get-in-touch.html">Get In Touch</a>
                </li>
            </ul>
            <div class="footerSocial">
                <a href="#">
                    <i class="fa-brands fa-linkedin"></i>
                </a>
            </div>
        </div>
        <div class="footerBottom">
            <p>
                &copy; Copyright 2024, All Rights Reserved by ProductCraft Solutions
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

    // Debugging: Check if elements are present
    console.log('Header and footer injected');
    const bars = document.querySelector("#menu-btn");
    const menu = document.querySelector("header ul");
    const overlay = document.querySelector(".overlay");

    console.log('bars:', bars);
    console.log('menu:', menu);
    console.log('overlay:', overlay);

    if (bars && menu && overlay) {
        // Mobile NavBar begins
        let isOpen = false;

        bars.addEventListener('click', function(event) {
            event.stopPropagation();
            menu.classList.toggle('open');
            isOpen = !isOpen;
            bars.classList.toggle('open');
            overlay.classList.toggle('active');   
            console.log('Menu button clicked, isOpen:', isOpen);
        });

        document.addEventListener('click', function(event) {
            if (isOpen) {
                if (!menu.contains(event.target)) {
                    menu.classList.toggle('open');
                    bars.classList.toggle('open');
                    overlay.classList.toggle('active');   
                    isOpen = false;
                    console.log('Document clicked outside menu, isOpen:', isOpen);
                }
            }
        });

        menu.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    } else {
        console.error('One or more elements are missing');
    }

    // form validation begins
    const userForm = document.querySelector(".inTouch form");
    if (userForm) {
        console.log('Form element found');
        const nameInp = document.querySelector("#name");
        const nameInp2 = document.querySelector("#name2");
        const mailInp = document.querySelector("#mail");
        const phoneInp = document.querySelector("#phone");
        const messageInp = document.querySelector("#message");
        const nameWarn = document.querySelector(".nameWarn");
        const name2Warn = document.querySelector(".name2Warn");
        const mailWarn = document.querySelector(".mailWarn");
        const phoneWarn = document.querySelector(".phoneWarn");
        const messageWarn = document.querySelector(".messageWarn");

        userForm.addEventListener("submit", (event) => {
            console.log('Form submitted');
            nameWarn.classList.remove("active");
            mailWarn.classList.remove("active");
            phoneWarn.classList.remove("active");
            messageWarn.classList.remove("active");
            let warnCount = 0;
            if (!nameInp.value) {
                nameWarn.classList.add("active");
                warnCount++;
                console.log('Name input is empty');
            }
            if (!nameInp2.value) {
                name2Warn.classList.add("active");
                warnCount++;
                console.log('Last name input is empty');
            }
            if (!messageInp.value) {
                messageWarn.classList.add("active");
                warnCount++;
                console.log('Message input is empty');
            }
            if (!mailInp.value) {
                mailWarn.classList.add("active");
                warnCount++;
                console.log('Email input is empty');
            }
            if (!phoneInp.value) {
                phoneWarn.classList.add("active");
                warnCount++;
                console.log('Phone input is empty');
            }

            if (warnCount === 0) {
                console.log('Form validation passed');
                // If there are no validation errors, allow the form to submit
                return true;
            } else {
                console.log('Form validation failed');
                // If there are validation errors, prevent the form from submitting
                event.preventDefault();
                return false;
            }
        });

        // Add the function for capturing the selected method of contact
        function captureSelectedMethod() {
            const selectedMethod = document.querySelector('input[name="method"]:checked').value;
            document.getElementById('selectedMethod').value = selectedMethod;
            console.log('Selected method of contact:', selectedMethod);
        }
    } else {
        console.error('Form element is missing');
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Anchor link clicked:', this.getAttribute('href'));

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});