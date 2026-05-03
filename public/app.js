document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.textContent = isOpen ? '×' : '☰';
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.textContent = '☰';
      });
    });
  }

  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (link.getAttribute('href') === path) {
      link.setAttribute('aria-current', 'page');
    }
  });

  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach((input) => {
    input.setAttribute('min', today);
  });

  const form = document.getElementById('availabilityForm');
  if (!form) return;

  const submitBtn = document.getElementById('submitBtn');
  const error = document.getElementById('formError');

  const showError = (message) => {
    error.textContent = message;
    error.hidden = false;
    submitBtn.disabled = false;
    submitBtn.textContent = 'Envoyer la demande';
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    error.hidden = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi...';

    const data = Object.fromEntries(new FormData(form).entries());
    data.name = (data.name || '').trim();
    data.email = (data.email || '').trim();
    data.phone = (data.phone || '').trim();
    data.message = (data.message || '').trim();

    if (!data.name || !data.email || !data.arrival || !data.departure) {
      showError('Merci de renseigner votre nom, votre email et les dates souhaitées.');
      return;
    }

    if (!data.email.includes('@')) {
      showError('Merci de saisir une adresse email valide.');
      return;
    }

    if (new Date(data.arrival) >= new Date(data.departure)) {
      showError('La date de départ doit être après la date d’arrivée.');
      return;
    }

    try {
      const response = await fetch('/api/send-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        showError(result.error || 'La demande n’a pas pu être envoyée.');
        return;
      }

      form.innerHTML = `
        <div class="form__success">
          <p class="eyebrow">Demande envoyée</p>
          <h3>Merci ${data.name}</h3>
          <p>Votre demande a bien été transmise. Une réponse sera envoyée à <strong>${data.email}</strong>.</p>
          <a class="btn btn--outline" href="/reservation">Retour aux disponibilités</a>
        </div>
      `;
    } catch (err) {
      showError('Connexion impossible au serveur. Réessayez dans quelques instants.');
    }
  });
});
