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
const https = require('https');
const http = require('http');
const Stripe = require('stripe');
const db = require('./db');

let Anthropic;
try { Anthropic = require('@anthropic-ai/sdk'); } catch {}
const anthropic = (Anthropic && process.env.ANTHROPIC_API_KEY)
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }) : null;

const app = express();
app.set('trust proxy', 'loopback');
const PORT = process.env.PORT || 3010;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'hello@maisonpicard.com';
const SITE_URL = process.env.SITE_URL || `http://127.0.0.1:${PORT}`;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const ICAL_AIRBNB = process.env.ICAL_AIRBNB || '';
const ICAL_BOOKING = process.env.ICAL_BOOKING || '';
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
  ['/mentions-legales', 'mentions-legales.html'],
  ['/politique-confidentialite', 'politique-confidentialite.html'],
  ['/admin', 'admin.html'],
]);

app.get(['/index.html', '/villa.html', '/photos.html', '/equipements.html', '/localisation.html', '/tarifs.html', '/reservation.html', '/contact.html', '/reglement-interieur.html', '/mentions-legales.html', '/politique-confidentialite.html', '/admin.html'], (req, res) => {
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

  const signatures = db.upsertSignature(client, {
    documentType: req.body.documentType,
    signerName: req.body.signerName,
    signerEmail: req.body.signerEmail,
    acceptedText: req.body.acceptedText,
    signatureData: req.body.signatureData || null,
  }, {
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

function fetchUrl(url, redirectsLeft = 5) {
  return new Promise((resolve, reject) => {
    if (!url) return reject(new Error('URL vide'));
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { timeout: 10000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirectsLeft > 0) {
        return resolve(fetchUrl(res.headers.location, redirectsLeft - 1));
      }
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    });
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout iCal')); });
    req.on('error', reject);
  });
}

function parseIcalDate(str) {
  if (!str) return '';
  // Remove TZID=... prefix and VALUE=DATE: prefix
  const val = str.replace(/^.*?:/,'').replace(/[- ]/g,'').trim();
  // Take first 8 chars = YYYYMMDD
  return val.slice(0, 8);
}

function parseIcal(text) {
  const events = [];
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
    .replace(/\n[ \t]/g, '') // unfold
    .split('\n');
  let current = null;
  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') { current = {}; }
    else if (line === 'END:VEVENT') {
      if (current && current.start && current.end) events.push(current);
      current = null;
    } else if (current) {
      if (line.startsWith('DTSTART')) current.start = parseIcalDate(line.split(':').slice(1).join(':'));
      else if (line.startsWith('DTEND')) current.end = parseIcalDate(line.split(':').slice(1).join(':'));
      else if (line.startsWith('SUMMARY:')) current.summary = line.slice(8);
    }
  }
  return events;
}

app.get('/api/availability', async (req, res) => {
  const unconfigured = !ICAL_AIRBNB && !ICAL_BOOKING;
  if (unconfigured) return res.json({ events: [], unconfigured: true });

  const fetches = [ICAL_AIRBNB, ICAL_BOOKING].filter(Boolean).map((url) =>
    fetchUrl(url).then(parseIcal).catch(() => [])
  );
  const results = await Promise.all(fetches);
  const all = results.flat();
  const events = all.map((e) => ({ start: e.start, end: e.end }));
  res.json({ events, unconfigured: false });
});

const CHAT_SYSTEM = `Tu es l'assistant virtuel de Verdure & Cie, une villa de vacances à Saint-Pierre, La Réunion.
Tu réponds en français, de façon chaleureuse, précise et concise (2-4 phrases max par réponse).
Si la question ne concerne pas la villa, redirige poliment vers le sujet.

Informations clés :
- Adresse : 8 chemin Elie Hoarau, Basse-Terre, 97410 Saint-Pierre, La Réunion
- Capacité : 10 voyageurs maximum, 5 chambres, 3 salles de bain
- Équipements : piscine privée chauffée, billard, barbecue, 3 terrasses, jardin tropical, clim, wifi, parking
- Tarifs indicatifs : dès 120 €/nuit (basse saison), dès 160 € (moyenne), dès 220 € (haute)
- Caution : 800 € (chèque non encaissé à l'arrivée)
- Check-in : transmis après confirmation. Check-out : précisé dans le contrat
- Règlement : pas de fêtes ni nuisances sonores après 22h, non-fumeur intérieur, max 10 personnes, pas d'animaux
- Réservation directe sur verdure.maisonpicard.com/reservation ou via Airbnb et Booking.com
- Contact : 0692 51 27 66 ou hello@maisonpicard.com`;

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  if (!Array.isArray(messages) || !messages.length) {
    return res.status(400).json({ error: 'messages requis.' });
  }
  if (!anthropic) {
    return res.json({ reply: 'Le chat est momentanément indisponible. Contactez-nous au 0692 51 27 66.' });
  }
  try {
    const safeMessages = messages.slice(-10).map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content || '').slice(0, 500),
    }));
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system: CHAT_SYSTEM,
      messages: safeMessages,
    });
    res.json({ reply: response.content[0].text });
  } catch (err) {
    console.error('Chat error', err.message);
    res.json({ reply: 'Désolé, une erreur est survenue. Contactez-nous au 0692 51 27 66.' });
  }
});

const META_PAGE_TOKEN = process.env.META_PAGE_TOKEN || '';
const META_PAGE_ID = process.env.META_PAGE_ID || '';
const META_IG_ID = process.env.META_IG_ID || '';

app.get('/api/admin/posts', requireAdmin, (req, res) => {
  res.json({ posts: db.listPosts() });
});

app.post('/api/admin/posts', requireAdmin, async (req, res) => {
  const { content, platform, imageHint, scheduledAt, generateAi } = req.body;
  let finalContent = (content || '').trim();

  if (generateAi && anthropic && !finalContent) {
    try {
      const hint = imageHint || 'la villa';
      const msg = await anthropic.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        messages: [{
          role: 'user',
          content: `Écris une publication courte (max 200 mots) pour Facebook/Instagram pour Verdure & Cie, une villa de vacances à Saint-Pierre, La Réunion. Thème : ${hint}. Style : chaleureux, évocateur, invite à rêver. Inclus 3-5 hashtags pertinents en fin de message.`,
        }],
      });
      finalContent = msg.content[0].text;
    } catch {}
  }

  if (!finalContent) return res.status(400).json({ error: 'Contenu requis ou génération IA impossible.' });

  const post = db.createPost({ platform: platform || 'both', content: finalContent, imageHint, scheduledAt });
  res.status(201).json({ post });
});

app.post('/api/admin/posts/:id/publish', requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const post = db.listPosts(500).find((p) => p.id === id);
  if (!post) return res.status(404).json({ error: 'Post introuvable.' });

  if (!META_PAGE_TOKEN || !META_PAGE_ID) {
    return res.status(503).json({ error: 'META_PAGE_TOKEN et META_PAGE_ID non configurés.' });
  }

  try {
    const fbRes = await fetchUrl(
      `https://graph.facebook.com/v19.0/${META_PAGE_ID}/feed`,
    );
    const body = JSON.stringify({ message: post.content, access_token: META_PAGE_TOKEN });
    const fbPost = await new Promise((resolve, reject) => {
      const req2 = https.request(`https://graph.facebook.com/v19.0/${META_PAGE_ID}/feed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
      }, (r) => {
        let d = '';
        r.on('data', (c) => { d += c; });
        r.on('end', () => resolve(JSON.parse(d)));
      });
      req2.on('error', reject);
      req2.write(body);
      req2.end();
    });
    if (fbPost.error) return res.status(400).json({ error: fbPost.error.message });
    const updated = db.updatePostStatus(id, 'published', fbPost.id);
    res.json({ post: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Verdure & Cie - http://127.0.0.1:${PORT}`);
});
