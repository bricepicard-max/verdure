/* =========================================
   Verdure & Cie — App
   Navigation, form, scroll effects
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile nav toggle ---
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    if (toggle && links) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            links.classList.toggle('active');
        });

        // Close menu on link click (mobile)
        links.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                links.classList.remove('active');
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !links.contains(e.target)) {
                toggle.classList.remove('active');
                links.classList.remove('active');
            }
        });
    }

    // --- Nav background on scroll ---
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 80) {
            nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
        } else {
            nav.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // --- Smooth scroll for "scroll down" indicator ---
    const scrollBtn = document.querySelector('.hero__scroll');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            document.querySelector('#maison')?.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- Contact form (static / no backend) ---
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic validation
            const name = form.querySelector('#name').value.trim();
            const email = form.querySelector('#email').value.trim();
            const message = form.querySelector('#message').value.trim();

            const errors = [];
            if (!name) errors.push('Veuillez entrer votre nom.');
            if (!email || !email.includes('@')) errors.push('Veuillez entrer un email valide.');
            if (!message) errors.push('Veuillez écrire un message.');

            if (errors.length > 0) {
                alert(errors.join('\n'));
                return;
            }

            // Success state (static — no backend yet)
            const formContent = form.innerHTML;
            form.innerHTML = `
                <div class="form__success">
                    <h3>✅ Merci ${name} !</h3>
                    <p>Votre demande a bien été reçue. Nous vous répondrons rapidement à <strong>${email}</strong>.</p>
                    <p style="margin-top:16px; font-size:0.85rem; color:var(--gray-300);">(Mode démo — aucun email n'a été envoyé)</p>
                    <button class="btn btn--outline" style="margin-top:20px; color:var(--green-800); border-color:var(--green-800);" onclick="location.reload()">Nouvelle demande</button>
                </div>
            `;
        });
    }

    // --- Intersection Observer for fade-in animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections and cards
    document.querySelectorAll('.section, .card, .pricing__card, .gallery__item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
        observer.observe(el);
    });

});
