document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const form = document.getElementById('availabilityForm');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (nav) {
    const setShadow = () => {
      nav.style.boxShadow = window.scrollY > 40 ? '0 12px 34px rgba(27, 28, 24, 0.08)' : 'none';
    };
    setShadow();
    window.addEventListener('scroll', setShadow, { passive: true });
  }

  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach((input) => {
    input.setAttribute('min', today);
  });

  if (!form) return;

  const submit = document.getElementById('submitBtn');
  const error = document.getElementById('formError');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (error) {
      error.hidden = true;
      error.textContent = '';
    }

    const payload = {
      name: form.querySelector('#name').value.trim(),
      email: form.querySelector('#email').value.trim(),
      arrival: form.querySelector('#arrival').value,
      departure: form.querySelector('#departure').value,
      guests: form.querySelector('#guests').value,
      message: form.querySelector('#message').value.trim(),
    };

    if (!payload.name || !payload.email || !payload.email.includes('@')) {
      showError('Merci de renseigner un nom et un email valide.');
      return;
    }

    if (!payload.arrival || !payload.departure) {
      showError("Merci d'indiquer une date d'arrivée et une date de départ.");
      return;
    }

    if (new Date(payload.arrival) >= new Date(payload.departure)) {
      showError("La date de départ doit être postérieure à la date d'arrivée.");
      return;
    }

    if (submit) {
      submit.disabled = true;
      submit.textContent = 'Envoi en cours...';
    }

    try {
      const response = await fetch('/api/send-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Erreur lors de l'envoi.");
      }

      form.innerHTML = `
        <div class="form__success">
          <h3>Demande envoyée</h3>
          <p>Votre message a bien été transmis. Vous pouvez aussi consulter Airbnb ou Booking pour vérifier les disponibilités en temps réel.</p>
        </div>
      `;
    } catch (err) {
      showError(err.message || "La demande n'a pas pu être envoyée pour le moment.");
      if (submit) {
        submit.disabled = false;
        submit.textContent = 'Demander une disponibilité';
      }
    }
  });

  function showError(message) {
    if (!error) return;
    error.textContent = message;
    error.hidden = false;
  }
});
