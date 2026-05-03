document.addEventListener("DOMContentLoaded", () => {

    // ── NAV ───────────────────────────────────────────────────────────────────
    const toggle = document.querySelector(".nav-toggle");
    const nav    = document.querySelector("#main-nav");

    if (toggle && nav) {
        const page = window.location.pathname.split("/").pop() || "index.html";
        nav.querySelectorAll("a").forEach(link => {
            const href = link.getAttribute("href").split("#")[0].split("/").pop();
            if (href === page) link.setAttribute("aria-current", "page");
        });

        toggle.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("open");
            toggle.setAttribute("aria-expanded", String(isOpen));
            toggle.setAttribute("aria-label", isOpen ? "Uždaryti meniu" : "Atidaryti meniu");
            if (isOpen) nav.querySelector("a")?.focus();
        });

        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => closeMenu());
        });

        document.addEventListener("click", e => {
            if (!e.target.closest("header")) closeMenu();
        });

        document.addEventListener("keydown", e => {
            if (e.key === "Escape") { closeMenu(); toggle.focus(); }
        });

        function closeMenu() {
            nav.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Atidaryti meniu");
        }
    }


    const element = document.getElementById("heroTitle");
    if (element) {
        const text = "MIŠKŲ VAIDMUO TVARUMO IR KLIMATO KAITOS KONTEKSTE";

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            element.textContent = text;
            element.classList.add("finished");
        } else {
            let i = 0;
            function typing() {
                if (i < text.length) {
                    element.innerHTML += text[i++];
                    setTimeout(typing, 40);
                } else {
                    element.classList.add("finished");
                }
            }
            typing();
        }
    }

    // ── SCROLL REVEAL ─────────────────────────────────────────────────────────
    const revealItems = document.querySelectorAll(".reveal-left, .reveal-right");

    if (revealItems.length) {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            revealItems.forEach(el => el.classList.add("active"));
        } else {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.25 });

            revealItems.forEach(el => observer.observe(el));
        }
    }

    // ── CONTACT FORM ──────────────────────────────────────────────────────────
    const form = document.getElementById("contactForm");
    if (form) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        function setError(inputId, errorId, msg) {
            document.getElementById(inputId).classList.add("invalid");
            document.getElementById(errorId).textContent = msg;
        }

        function clearError(inputId, errorId) {
            document.getElementById(inputId).classList.remove("invalid");
            document.getElementById(errorId).textContent = "";
        }

        form.addEventListener("submit", e => {
            e.preventDefault();

            const name    = document.getElementById("name").value.trim();
            const email   = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();
            const status  = document.getElementById("formStatus");

            clearError("name", "name-error");
            clearError("email", "email-error");
            clearError("message", "message-error");
            status.textContent = "";
            status.className = "form-status";

            let valid = true;

            if (!name) {
                setError("name", "name-error", "Įveskite savo vardą.");
                valid = false;
            }

            if (!email) {
                setError("email", "email-error", "Įveskite el. paštą.");
                valid = false;
            } else if (!emailRegex.test(email)) {
                setError("email", "email-error", "El. pašto adresas neteisingas.");
                valid = false;
            }

            if (!message) {
                setError("message", "message-error", "Parašykite žinutę.");
                valid = false;
            }

            if (valid) {
                status.textContent = "Žinutė išsiųsta! Susisieksime su jumis greitai.";
                status.classList.add("success");
                form.reset();
            }
        });

        ["name", "email", "message"].forEach(id => {
            document.getElementById(id).addEventListener("input", () => {
                document.getElementById(id).classList.remove("invalid");
                document.getElementById(id + "-error").textContent = "";
            });
        });
    }

});
