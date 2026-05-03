/* =========================================
   Verdure & Cie — App v2
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // --- Hero slideshow ---
  (function heroSlideshow() {
    const slides = document.querySelectorAll('.hero__slide');
    const dots = document.querySelectorAll('.dot');
    if (!slides.length) return;
    let current = 0;
    const interval = setInterval(() => {
      slides[current].classList.remove('active');
      dots[current]?.classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
      dots[current]?.classList.add('active');
    }, 5000);
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.dataset.slide);
        if (idx === current) return;
        clearInterval(interval);
        slides[current].classList.remove('active');
        dots[current]?.classList.remove('active');
        current = idx;
        slides[current].classList.add('active');
        dots[current]?.classList.add('active');
      });
    });
  })();

  // --- Mobile nav toggle ---
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('active');
    });
    links.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('active');
      });
    });
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        toggle.classList.remove('active');
        links.classList.remove('active');
      }
    });
  }

  // --- Nav shadow on scroll ---
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 80 ? '0 2px 20px rgba(0,0,0,0.08)' : 'none';
  });

  // --- Gallery: load photos dynamically with neutral presentation ---
  (function loadGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    // Selected photos ordered by visual diversity.
    // Edit this array to reorder. Labels are intentionally neutral
    // since photo-to-room mapping isn't verified.
    const photos = [
      '9612f8e9-7aeb-4614-b4bd-3fab5d9cac3c.jpeg',
      'c51bdbc0-2402-4cb1-bed6-d405fe1c7205.jpeg',
      'ec9647e1-abf2-4c24-9759-c01fac768070.jpeg',
      'e1fac463-d33a-4cd2-92fd-0b669af7de93.jpeg',
      '26e34c49-0570-4b30-9990-ca682e0186d9.jpeg',
      '6fc1d7c1-0379-45a8-aa00-abe37bc13292.jpeg',
      'fb9bacde-eaa3-4e7c-8a52-986b688a2e6b.jpeg',
      'f370c62e-dba7-45b6-bf3d-48c3b550de6b.jpeg',
      'b52eb0f0-aef6-464b-9b03-649dce598010.jpeg',
      'd7fcc397-4e80-4584-a261-56d3e8d11f3d.jpeg',
      'd04151fa-ed05-41a0-8afb-62de188ccbc3.jpeg',
      'f991c03d-1e67-42c8-89bb-55872989d8f2.jpeg',
      'c6390307-8f88-4207-b593-3315483da4fc.jpeg',
      'e1183664-d608-4767-8420-81f166242e8e.jpeg',
      'c8b537a5-1609-4c8a-b72f-931e4a204d61.jpeg',
      'd3f706b9-c5c0-4112-895e-ee81213de1f3.jpeg',
    ];

    photos.forEach((file, i) => {
      const item = document.createElement('div');
      // First, fourth, eighth, tenth get wide span
      const isWide = i === 0 || i === 3 || i === 7 || i === 9;
      item.className = `gallery__item${isWide ? ' gallery__item--wide' : ''}`;
      item.innerHTML = `<img src="/assets/images/${file}" alt="Photo Verdure &amp; Cie" loading="lazy">`;
      grid.appendChild(item);
    });
  })();

  // --- Reservation form (Stripe or manual mode) ---
  const form = document.getElementById('reservationForm');
  if (form) {
    const submitBtn = document.getElementById('submitBtn');
    const formError = document.getElementById('formError');
    const stripeStatus = document.getElementById('stripeStatus');
    const formFootnote = document.getElementById('formFootnote');

    // Detect if Stripe is configured
    const config = window.VERDURE_CONFIG || {};
    const stripeReady = !!config.publishableKey;

    if (stripeReady) {
      submitBtn.textContent = "Payer l'acompte (30%) — Carte bancaire";
      stripeStatus.innerHTML = '<span>💳</span> Paiement Stripe sécurisé activé';
      stripeStatus.style.display = 'block';
      stripeStatus.style.color = 'var(--green-600)';
    } else {
      submitBtn.textContent = 'Envoyer la demande de réservation';
      formFootnote.textContent = '💬 Demande de réservation — je vous répondrai sous 24h par email';
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      formError.style.display = 'none';
      submitBtn.disabled = true;

      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const phone = form.querySelector('#phone').value.trim();
      const arrival = form.querySelector('#arrival').value;
      const departure = form.querySelector('#departure').value;
      const guests = form.querySelector('#guests').value;
      const message = form.querySelector('#message').value.trim();

      // Validation
      if (!name || !email || !arrival || !departure) {
        showError('Veuillez remplir tous les champs obligatoires (nom, email, dates).');
        return;
      }
      if (!email.includes('@')) {
        showError('Email invalide.');
        return;
      }
      if (new Date(arrival) >= new Date(departure)) {
        showError('Le départ doit être après l\'arrivée.');
        return;
      }

      if (stripeReady) {
        // Mode paiement Stripe
        submitBtn.textContent = 'Redirection vers Stripe...';
        try {
          const r = await fetch('/api/create-checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, arrival, departure, guests, message }),
          });
          const data = await r.json();
          if (data.url) {
            window.location.href = data.url;
          } else {
            showError(data.error || 'Erreur de paiement.');
          }
        } catch (err) {
          showError('Erreur de connexion.');
        }
      } else {
        // Mode demande manuelle
        submitBtn.textContent = 'Envoi en cours...';
        try {
          const r = await fetch('/api/send-request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, arrival, departure, guests, message }),
          });
          const data = await r.json();
          if (data.success) {
            form.innerHTML = `
              <div class="form__success">
                <div style="font-size:3rem;margin-bottom:12px;">✉️</div>
                <h3>Demande envoyée, ${name} !</h3>
                <p>Merci ! Je vous réponds sous 24h à <strong>${email}</strong> pour confirmer votre séjour.</p>
                <a href="/" class="btn btn--outline" style="margin-top:16px;color:var(--green-800);border-color:var(--green-800);">Retour à l'accueil</a>
              </div>
            `;
          } else {
            showError(data.error || 'Erreur lors de l\'envoi.');
          }
        } catch (err) {
          showError('Erreur de connexion au serveur.');
        }
      }
    });

    function showError(msg) {
      formError.textContent = msg;
      formError.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.textContent = stripeReady
        ? "Payer l'acompte (30%) — Carte bancaire"
        : 'Envoyer la demande de réservation';
    }
  }

  // --- Intersection Observer for animations ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.section, .villa__stat, .features__card, .pricing__card, .conditions__card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });

  // --- Date inputs: set min to today ---
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(el => {
    el.setAttribute('min', today);
  });

});
