// ========================================
// WISHIE DIGITAL STUDIO
// Instagram-Only Inquiry System
// ========================================

const INSTAGRAM_USERNAME = "wishie.web";
const INSTAGRAM_PROFILE = "https://www.instagram.com/wishie.web/";

// 1. Mobile Navigation
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
        });
    });
}

// 2. Reveal Animations
const revealElements = document.querySelectorAll(
    ".reveal, .service-card, .portfolio-card"
);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}

// 3. Automatic Footer Year
const yearElement = document.querySelector("#year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// 4. Back-to-Top Button
const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("show", window.scrollY > 300);
    });

    backToTop.addEventListener("click", (event) => {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// 5. Select Service Automatically
const serviceCards = document.querySelectorAll("[data-service]");
const serviceSelect = document.querySelector(
    '#service, select[name="service"]'
);

serviceCards.forEach((card) => {
    card.addEventListener("click", () => {
        const selectedService = card.dataset.service;

        if (serviceSelect && selectedService) {
            serviceSelect.value = selectedService;

            const orderSection = document.querySelector(
                "#order, #contact, #inquiry"
            );

            if (orderSection) {
                orderSection.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }
    });
});

// 6. Instagram Inquiry Form
const inquiryForm = document.querySelector(
    "#inquiry-form, #order-form, #contact-form, form"
);

if (inquiryForm) {
    inquiryForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(inquiryForm);

        const name =
            formData.get("name") ||
            inquiryForm.querySelector('[name="name"]')?.value ||
            "";

        const email =
            formData.get("email") ||
            inquiryForm.querySelector('[name="email"]')?.value ||
            "";

        const instagram =
            formData.get("instagram") ||
            inquiryForm.querySelector('[name="instagram"]')?.value ||
            "";

        const service =
            formData.get("service") ||
            inquiryForm.querySelector('[name="service"]')?.value ||
            "";

        const budget =
            formData.get("budget") ||
            inquiryForm.querySelector('[name="budget"]')?.value ||
            "";

        const details =
            formData.get("details") ||
            inquiryForm.querySelector(
                '[name="details"], [name="message"]'
            )?.value ||
            "";

        if (!name.trim() || !service.trim()) {
            alert("Please enter your name and select a service.");
            return;
        }

        // Prepare the inquiry message
        const inquiryMessage =
`Hello Wishie! ✨

I'd like to inquire about your digital services.

Name: ${name}
Email: ${email || "Not provided"}
Instagram Username: ${instagram || "Not provided"}
Service Required: ${service}
Budget: ${budget || "Not decided"}

Project Details:
${details || "I'll share more details in DM."}

Found you through the Wishie Digital Studio website. 💛`;

        // Display the message for copying
        let messageBox = document.querySelector("#instagram-message-box");

        if (!messageBox) {
            messageBox = document.createElement("div");
            messageBox.id = "instagram-message-box";
            messageBox.style.cssText = `
                margin-top: 24px;
                padding: 22px;
                border: 1px solid #d4af37;
                border-radius: 12px;
                background: #171717;
                color: #ffffff;
                line-height: 1.7;
            `;

            inquiryForm.insertAdjacentElement("afterend", messageBox);
        }

        messageBox.innerHTML = `
            <h3 style="color:#d4af37;margin-bottom:12px;">
                Your inquiry is ready! ✨
            </h3>

            <p style="margin-bottom:14px;">
                Copy your message, open Instagram, and send it to
                <strong>@${INSTAGRAM_USERNAME}</strong>.
            </p>

            <textarea
                id="instagram-inquiry-message"
                readonly
                rows="10"
                style="
                    width:100%;
                    padding:12px;
                    border-radius:8px;
                    box-sizing:border-box;
                    background:#0b0b0b;
                    color:#ffffff;
                    border:1px solid #d4af37;
                    margin-bottom:12px;
                    font:inherit;
                "
            ></textarea>

            <button
                type="button"
                id="copy-inquiry-message"
                style="
                    padding:12px 18px;
                    border:0;
                    border-radius:6px;
                    background:#d4af37;
                    color:#111111;
                    font-weight:bold;
                    cursor:pointer;
                    margin-right:8px;
                    margin-bottom:10px;
                "
            >
                Copy Message
            </button>

            <a
                href="${INSTAGRAM_PROFILE}"
                target="_blank"
                rel="noopener noreferrer"
                style="
                    display:inline-block;
                    padding:12px 18px;
                    border-radius:6px;
                    background:#ffffff;
                    color:#111111;
                    text-decoration:none;
                    font-weight:bold;
                    margin-bottom:10px;
                "
            >
                Open Instagram
            </a>

            <p style="font-size:13px;color:#cccccc;margin-top:8px;">
                Note: Your message will not be sent automatically.
                Please paste it into your Instagram DM and send it.
            </p>
        `;

        const messageTextarea = messageBox.querySelector(
            "#instagram-inquiry-message"
        );

        messageTextarea.value = inquiryMessage;

        const copyButton = messageBox.querySelector(
            "#copy-inquiry-message"
        );

        copyButton.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(inquiryMessage);
                copyButton.textContent = "Copied! ✓";
            } catch (error) {
                messageTextarea.focus();
                messageTextarea.select();

                const copied = document.execCommand("copy");
                copyButton.textContent = copied
                    ? "Copied! ✓"
                    : "Select the message and copy it";

                if (!copied) {
                    alert("Please select the message and copy it manually.");
                }
            }
        });

        messageBox.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });
}

console.log("Wishie Digital Studio is ready! 💛");
