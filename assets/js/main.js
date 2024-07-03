// menu resonsive

const bars = document.querySelector("#menu-btn")
const menu = document.querySelector("header ul")
const overlay = document.querySelector(".overlay")




// menu responsive ends

// Jamil's work start from here ------------------------------------------------------
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

// Jamil's work end here --------------------------------------------------------------




// form validation beigns
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

// form validation ends

// Your existing JavaScript code...

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});