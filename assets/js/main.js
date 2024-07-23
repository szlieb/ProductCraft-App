document.addEventListener('DOMContentLoaded', () => {
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

    // Inject header and footer content
    document.getElementById('header').innerHTML = headerContent;
    document.getElementById('footer').innerHTML = footerContent;

    // Now that the header is injected, add event listeners for the menu
    const bars = document.querySelector("#menu-btn");
    const menu = document.querySelector("header ul");
    const overlay = document.querySelector(".overlay");

    // Mobile NavBar begins
    let isOpen = false;

    bars.addEventListener('click', function(event) {
        event.stopPropagation();
        menu.classList.toggle('open');
        isOpen = !isOpen;
        bars.classList.toggle('open');
        overlay.classList.toggle('active');   
    });

    document.addEventListener('click', function(event) {
        if (isOpen) {
            if (!menu.contains(event.target)) {
                menu.classList.toggle('open');
                bars.classList.toggle('open');
                overlay.classList.toggle('active');   
                isOpen = false;
            }
        }
    });

    menu.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // form validation begins
    const userForm = document.querySelector(".inTouch form");
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

    userForm.addEventListener("submit", () => {
        nameWarn.classList.remove("active");
        mailWarn.classList.remove("active");
        phoneWarn.classList.remove("active");
        messageWarn.classList.remove("active");
        let warnCount = 0;
        if (!nameInp.value) {
            nameWarn.classList.add("active");
            warnCount++;
        }
        if (!nameInp2.value) {
            name2Warn.classList.add("active");
            warnCount++;
        }
        if (!messageInp.value) {
            messageWarn.classList.add("active");
            warnCount++;
        }
        if (!mailInp.value) {
            mailWarn.classList.add("active");
            warnCount++;
        }
        if (!phoneInp.value) {
            phoneWarn.classList.add("active");
            warnCount++;
        }

        if (warnCount === 0) {
            // If there are no validation errors, allow the form to submit
            return true;
        } else {
            // If there are validation errors, prevent the form from submitting
            return false;
        }
    });

    // Add the function for capturing the selected method of contact
    function captureSelectedMethod() {
        const selectedMethod = document.querySelector('input[name="method"]:checked').value;
        document.getElementById('selectedMethod').value = selectedMethod;
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});