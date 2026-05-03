/**
 * Verdure & Cie - serveur Express
 *
 * Sert le site vitrine et reçoit les demandes directes.
 */

require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const path = require('path');
const crypto = require('crypto');
const Stripe = require('stripe');
const db = require('./db');

const app = express();
app.set('trust proxy', 'loopback');
const PORT = process.env.PORT || 3010;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'hello@maisonpicard.com';
const SITE_URL = process.env.SITE_URL || `http://127.0.0.1:${PORT}`;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const STRIPE_CURRENCY = process.env.STRIPE_CURRENCY || 'eur';
const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));
app.use(express.json());

const pages = new Map([
  ['/', 'index.html'],
  ['/villa', 'villa.html'],
  ['/photos', 'photos.html'],
  ['/equipements', 'equipements.html'],
  ['/localisation', 'localisation.html'],
  ['/tarifs', 'tarifs.html'],
  ['/reservation', 'reservation.html'],
  ['/contact', 'contact.html'],
  ['/reglement-interieur', 'reglement-interieur.html'],
  ['/admin', 'admin.html'],
]);

app.get(['/index.html', '/villa.html', '/photos.html', '/equipements.html', '/localisation.html', '/tarifs.html', '/reservation.html', '/contact.html', '/reglement-interieur.html', '/admin.html'], (req, res) => {
  const cleanPath = req.path === '/index.html' ? '/' : req.path.replace(/\.html$/, '');
  res.redirect(301, cleanPath);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get([...pages.keys()], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', pages.get(req.path)));
});

app.get('/espace-client/:token', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'espace-client.html'));
});

app.get('/api/config', (req, res) => {
  res.json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
    siteUrl: SITE_URL,
    contactEmail: CONTACT_EMAIL,
    stripeEnabled: Boolean(stripe),
  });
});

function requireAdmin(req, res, next) {
  const token = req.get('x-admin-token') || req.query.token || req.body.adminToken;
  if (!ADMIN_TOKEN) {
    return res.status(503).json({ error: 'ADMIN_TOKEN non configuré sur le serveur.' });
  }
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Accès admin refusé.' });
  }
  next();
}

function centsFromEuros(value) {
  const number = Number(String(value || '0').replace(',', '.'));
  if (!Number.isFinite(number) || number < 0) return 0;
  return Math.round(number * 100);
}

function serializeClient(client) {
  return {
    token: client.token,
    guestName: client.guest_name,
    guestEmail: client.guest_email,
    guestPhone: client.guest_phone,
    arrival: client.arrival,
    departure: client.departure,
    guests: client.guests,
    totalAmountCents: client.total_amount_cents,
    depositAmountCents: client.deposit_amount_cents,
    swiklyUrl: client.swikly_url,
    notes: client.notes,
    status: client.status,
    clientUrl: `${SITE_URL}/espace-client/${client.token}`,
  };
}

app.get('/api/admin/clients', requireAdmin, (req, res) => {
  res.json({ clients: db.listClients().map(serializeClient) });
});

app.post('/api/admin/clients', requireAdmin, (req, res) => {
  const totalAmountCents = centsFromEuros(req.body.totalAmount);
  const depositAmountCents = Math.round(totalAmountCents * 0.30);

  if (!req.body.guestName || !req.body.guestEmail) {
    return res.status(400).json({ error: 'Nom et email client requis.' });
  }

  const client = db.createClient({
    token: crypto.randomBytes(18).toString('base64url'),
    guestName: req.body.guestName.trim(),
    guestEmail: req.body.guestEmail.trim(),
    guestPhone: (req.body.guestPhone || '').trim(),
    arrival: req.body.arrival || '',
    departure: req.body.departure || '',
    guests: req.body.guests || 0,
    totalAmountCents,
    depositAmountCents,
    swiklyUrl: (req.body.swiklyUrl || '').trim(),
    notes: (req.body.notes || '').trim(),
  });

  res.status(201).json({ client: serializeClient(client) });
});

app.get('/api/client/:token', (req, res) => {
  const client = db.getClientByToken(req.params.token);
  if (!client) return res.status(404).json({ error: 'Espace client introuvable.' });
  res.json({ client: serializeClient(client), signatures: db.listSignatures(client.id) });
});

app.post('/api/client/:token/sign', (req, res) => {
  const client = db.getClientByToken(req.params.token);
  if (!client) return res.status(404).json({ error: 'Espace client introuvable.' });

  const allowed = new Set(['contract', 'etat_des_lieux', 'reglement']);
  if (!allowed.has(req.body.documentType)) {
    return res.status(400).json({ error: 'Document inconnu.' });
  }
  if (!req.body.signerName || !req.body.signerEmail || !req.body.acceptedText) {
    return res.status(400).json({ error: 'Nom, email et mention de signature requis.' });
  }

  const signatures = db.upsertSignature(client, req.body, {
    ipAddress: req.ip,
    userAgent: req.get('user-agent') || '',
  });

  res.json({ success: true, signatures });
});

app.post('/api/client/:token/stripe-deposit', async (req, res) => {
  const client = db.getClientByToken(req.params.token);
  if (!client) return res.status(404).json({ error: 'Espace client introuvable.' });
  if (!stripe) return res.status(503).json({ error: 'Stripe n’est pas configuré sur le serveur.' });
  if (!client.deposit_amount_cents) return res.status(400).json({ error: 'Aucun acompte configuré pour ce dossier.' });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: client.guest_email,
      client_reference_id: client.token,
      line_items: [{
        quantity: 1,
        price_data: {
          currency: STRIPE_CURRENCY,
          product_data: { name: `Acompte 30% - Verdure & Cie` },
          unit_amount: client.deposit_amount_cents,
        },
      }],
      metadata: { client_token: client.token, type: 'deposit' },
      payment_intent_data: {
        metadata: { client_token: client.token, type: 'deposit' },
      },
      success_url: `${SITE_URL}/espace-client/${client.token}?paiement=acompte-ok`,
      cancel_url: `${SITE_URL}/espace-client/${client.token}?paiement=acompte-annule`,
    });

    db.recordPayment({
      clientId: client.id,
      provider: 'stripe',
      providerSessionId: session.id,
      amountCents: client.deposit_amount_cents,
      currency: STRIPE_CURRENCY,
      status: 'created',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Erreur Stripe Checkout', error);
    res.status(500).json({ error: 'Impossible de créer la session Stripe.' });
  }
});

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
