// Configuration dynamique chargée depuis le serveur
window.VERDURE_CONFIG = {};

(async function loadConfig() {
  try {
    const r = await fetch('/api/config');
    window.VERDURE_CONFIG = await r.json();
  } catch (e) {
    console.warn('Config non chargée, mode statique');
    window.VERDURE_CONFIG = {
      publishableKey: '',
      siteUrl: window.location.origin,
      contactEmail: 'hello@maisonpicard.com',
    };
  }
})();
