/**
 * Verdure & Cie - serveur Express
 *
 * Sert le site vitrine et reçoit les demandes directes.
 */

require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3010;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'hello@maisonpicard.com';

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.post('/api/send-request', (req, res) => {
  const { name, email, phone, arrival, departure, guests, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Nom et email requis.' });
  }

  console.log('Nouvelle demande de disponibilité');
  console.log(`   Nom: ${name}`);
  console.log(`   Email: ${email}`);
  console.log(`   Tél: ${phone || '—'}`);
  console.log(`   Arrivée: ${arrival || '—'}`);
  console.log(`   Départ: ${departure || '—'}`);
  console.log(`   Voyageurs: ${guests || '—'}`);
  console.log(`   Message: ${(message || '').substring(0, 300) || '—'}`);
  console.log(`   Contact: ${CONTACT_EMAIL}`);

  res.json({ success: true });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Verdure & Cie - http://127.0.0.1:${PORT}`);
});
