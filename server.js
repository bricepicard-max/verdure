/**
 * Verdure & Cie - serveur Express
 *
 * Sert le site vitrine et reçoit les demandes directes.
 */

require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const https = require('https');
const http = require('http');
const Stripe = require('stripe');
const PDFDocument = require('pdfkit');
const db = require('./db');
const nodemailer = require('nodemailer');

function createMailer() {
  if (!process.env.SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}
const mailer = createMailer();

const multer = require('multer');
const uploadPath = path.join(__dirname, 'assets', 'video');
const MAX_VIDEO_SIZE_BYTES = 50 * 1024 * 1024;
const videoUpload = multer({
  dest: uploadPath,
  limits: { fileSize: MAX_VIDEO_SIZE_BYTES },
  fileFilter: (req, file, cb) => {
    const ok = file.mimetype === 'video/mp4';
    cb(ok ? null : new Error('Seules les videos MP4 sont acceptees.'), ok);
  }
});

let Anthropic;
// DeepSeek chat (OpenAI-compatible API)
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';

const app = express();
app.set('trust proxy', 'loopback');
const PORT = process.env.PORT || 3010;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'verdure@maisonpicard.com';
const SITE_URL = process.env.SITE_URL || `http://127.0.0.1:${PORT}`;
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const ICAL_AIRBNB = process.env.ICAL_AIRBNB || '';
const ICAL_BOOKING = process.env.ICAL_BOOKING || '';
const STRIPE_CURRENCY = process.env.STRIPE_CURRENCY || 'eur';
const BANK_BENEFICIARY = process.env.BANK_BENEFICIARY || 'Magali & Paul';
const BANK_IBAN = process.env.BANK_IBAN || '';
const BANK_BIC = process.env.BANK_BIC || '';
const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));
app.use(express.json());

const pages = new Map([
  ['/', 'index.html'],
  ['/villa', 'villa.html'],
  ['/galerie', 'galerie.html'],
  ['/photos', 'galerie.html'],
  ['/equipements', 'equipements.html'],
  ['/localisation', 'localisation.html'],
  ['/tarifs', 'tarifs.html'],
  ['/reservation', 'reservation.html'],
  ['/contact', 'contact.html'],
  ['/reglement-interieur', 'reglement-interieur.html'],
  ['/mentions-legales', 'mentions-legales.html'],
  ['/politique-confidentialite', 'politique-confidentialite.html'],
  ['/admin', 'admin.html'],
  ['/faq', 'faq.html'],
]);

app.get(['/index.html', '/villa.html', '/galerie.html', '/photos.html', '/equipements.html', '/localisation.html', '/tarifs.html', '/reservation.html', '/contact.html', '/reglement-interieur.html', '/mentions-legales.html', '/politique-confidentialite.html', '/admin.html', '/faq.html'], (req, res) => {
  const cleanPath = req.path === '/index.html' ? '/' : req.path.replace(/\.html$/, '');
  res.redirect(301, cleanPath);
});

// ── Basic Auth espace admin ──────────────────────────────────────────────────
const ADMIN_USER = 'admin';
const ADMIN_PASS = '@Angelique08';

function requireBasicAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Basic ')) {
    const decoded = Buffer.from(auth.slice(6), 'base64').toString('utf8');
    const colonIdx = decoded.indexOf(':');
    const user = decoded.slice(0, colonIdx);
    const pass = decoded.slice(colonIdx + 1);
    if (user === ADMIN_USER && pass === ADMIN_PASS) return next();
  }
  res.setHeader('WWW-Authenticate', 'Basic realm="Espace Admin - Verdure & Cie"');
  res.status(401).send('Accès non autorisé. Veuillez vous identifier.');
}

// Routes admin protégées (avant le middleware static)
app.get(['/admin', '/admin.html'], requireBasicAuth, (req, res) => {
  if (req.path === '/admin.html') return res.redirect(301, '/admin');
  const html = fs.readFileSync(path.join(__dirname, 'public', 'admin.html'), 'utf8');
  res.send(html.replace('</head>', '<script>window.ADMIN_TOKEN=' + JSON.stringify(ADMIN_TOKEN) + ';</script></head>'));
});

function sendAdminToolPage(res, filename) {
  const html = fs.readFileSync(path.join(__dirname, 'public', filename), 'utf8');
  res.send(html.replace('</head>', '<script>window.ADMIN_TOKEN=' + JSON.stringify(ADMIN_TOKEN) + ';</script></head>'));
}

app.get(['/upload-photos', '/upload-photos.html'], requireBasicAuth, (req, res) => {
  sendAdminToolPage(res, 'upload-photos.html');
});

app.get(['/upload-video', '/upload-video.html'], requireBasicAuth, (req, res) => {
  sendAdminToolPage(res, 'upload-video.html');
});

// ── Fichiers statiques ────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1d' }));
app.use('/assets', express.static(path.join(__dirname, 'assets'), { maxAge: '7d' }));

app.get([...pages.keys()], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', pages.get(req.path)));
});

function safeUploadFilename(value, fallback) {
  const raw = String(value || fallback || 'upload').trim();
  const clean = path.basename(raw).replace(/[^a-zA-Z0-9._-]/g, '-');
  return clean || 'upload';
}

function archiveExistingFile(filepath) {
  if (!fs.existsSync(filepath)) return null;
  const parsed = path.parse(filepath);
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const archivedPath = path.join(parsed.dir, `${parsed.name}-archive-${stamp}${parsed.ext}`);
  fs.renameSync(filepath, archivedPath);
  return archivedPath;
}


// Image upload pour la galerie
const imageUpload = multer({ 
  storage: multer.diskStorage({
    destination: path.join(__dirname, 'assets', 'images'),
    filename: (req, file, cb) => cb(null, safeUploadFilename(req.body.filename, file.originalname))
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Seules les images sont acceptées'));
  }
});

app.post('/admin/upload-photo', requireAdmin, (req, res) => {
  imageUpload.single('photo')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message || 'Upload impossible' });
    if (!req.file) return res.status(400).json({ error: 'Aucun fichier' });
    res.json({ success: true, file: req.file.filename });
  });
});
app.post('/upload-video', requireAdmin, (req, res) => {
  videoUpload.single('video')(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, error: err.message || 'Upload impossible' });
    if (!req.file) return res.status(400).json({ success: false, error: 'Aucun fichier reçu.' });
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    const finalPath = path.join(uploadPath, 'hero.mp4');
    archiveExistingFile(finalPath);
    fs.renameSync(req.file.path, finalPath);
    res.json({ success: true, url: '/assets/video/hero.mp4' });
  });
});

app.get('/espace-client', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'espace-client.html'));
});

app.get('/espace-client/:token', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'espace-client.html'));
});

app.get('/guide/:token', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'guide.html'));
});

app.get('/api/config', (req, res) => {
  res.json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
    siteUrl: SITE_URL,
    contactEmail: CONTACT_EMAIL,
    stripeEnabled: Boolean(stripe),
    bankBeneficiary: BANK_BENEFICIARY,
    bankIban: BANK_IBAN,
    bankBic: BANK_BIC,
  });
});

function requireAdmin(req, res, next) {
  const token = req.get('x-admin-token') || req.query.token || (req.body && req.body.adminToken);
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
    clientUrl: `${SITE_URL}/espace-client`,
    guideUrl: `${SITE_URL}/guide/${client.token}`,
    hasCredentials: Boolean(client.password_hash),
    mustChangePassword: Boolean(client.must_change_password),
    idDocUploaded: Boolean(client.id_doc_filename),
    idDocUploadedAt: client.id_doc_uploaded_at || null,
    paymentConfirmed: Boolean(client.payment_confirmed),
    paymentConfirmedAt: client.payment_confirmed_at || null,
    paymentPaid: Boolean(client.payment_paid),
    paymentPaidAt: client.payment_paid_at || null,
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

app.get('/api/client/me', requireClientAuth, (req, res) => {
  const client = req.client;
  res.json({
    client: serializeClient(client),
    signatures: db.listSignatures(client.id),
    mustChangePassword: Boolean(client.must_change_password),
    idDocUploaded: Boolean(client.id_doc_filename),
    paymentConfirmed: Boolean(client.payment_confirmed),
    paymentPaid: Boolean(client.payment_paid),
  });
});

app.get('/api/client/:token', (req, res) => {
  const client = db.getClientByToken(req.params.token);
  if (!client) return res.status(404).json({ error: 'Espace client introuvable.' });
  res.json({ client: serializeClient(client), signatures: db.listSignatures(client.id) });
});


// ── GED : génération PDF signé ───────────────────────────────────────────────
function generateGedPdf(client, docType, sigData, done) {
  const docNames = {
    contract: 'Contrat de location',
    reglement: 'Règlement intérieur',
    etat_des_lieux: "État des lieux d'entrée",
  };
  const clientGedDir = path.join(gedDir, client.token);
  fs.mkdirSync(clientGedDir, { recursive: true });
  const meta = {
    token: client.token,
    guestName: client.guest_name,
    guestEmail: client.guest_email,
    guestPhone: client.guest_phone,
    arrival: client.arrival,
    departure: client.departure,
    guests: client.guests,
    totalAmountCents: client.total_amount_cents,
    depositAmountCents: client.deposit_amount_cents,
    updatedAt: new Date().toISOString(),
  };
  fs.writeFileSync(path.join(clientGedDir, 'dossier.json'), JSON.stringify(meta, null, 2));

  const filepath = path.join(clientGedDir, docType + '_signe.pdf');
  const doc = new PDFDocument({ margin: 50, size: 'A4' });
  const stream = fs.createWriteStream(filepath);
  doc.pipe(stream);

  // Header
  doc.font('Helvetica-Bold').fontSize(22).fillColor('#1a2e1a').text('Verdure & Cie', { align: 'center' });
  doc.font('Helvetica').fontSize(10).fillColor('#666')
     .text('8 chemin Elie Hoarau · Basse-Terre · 97410 Saint-Pierre, La Réunion', { align: 'center' });
  doc.moveDown(0.4);
  doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#c8dfc0').lineWidth(1.5).stroke();
  doc.moveDown(1);

  // Title
  doc.font('Helvetica-Bold').fontSize(16).fillColor('#1a2e1a')
     .text(docNames[docType] || docType, { align: 'center' });
  doc.moveDown(1.5);

  // Client info
  doc.font('Helvetica-Bold').fontSize(9).fillColor('#888').text('DOSSIER CLIENT', { underline: true });
  doc.moveDown(0.4);
  [
    ['Client',     client.guest_name],
    ['Email',      client.guest_email],
    ['Téléphone',  client.guest_phone || '—'],
    ['Arrivée',    client.arrival    || '—'],
    ['Départ',     client.departure  || '—'],
    ['Voyageurs',  String(client.guests || '—')],
  ].forEach(([k, v]) => {
    const x = doc.x;
    doc.font('Helvetica-Bold').fontSize(9).fillColor('#888').text(k + ' :', x, doc.y, { continued: true, width: 90 });
    doc.font('Helvetica').fillColor('#222').text('  ' + v);
  });
  doc.moveDown(1);

  // Signature block
  doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#e0dbd4').lineWidth(0.5).stroke();
  doc.moveDown(0.8);
  doc.font('Helvetica-Bold').fontSize(9).fillColor('#888').text('SIGNATURE ÉLECTRONIQUE', { underline: true });
  doc.moveDown(0.4);
  const signedDate = sigData.signedAt
    ? new Date(sigData.signedAt).toLocaleString('fr-FR', { timeZone: 'Indian/Reunion' })
    : new Date().toLocaleString('fr-FR');
  doc.font('Helvetica').fontSize(9).fillColor('#333');
  doc.text('Signé par : ' + sigData.signerName);
  doc.text('Email : '    + sigData.signerEmail);
  doc.text('Date : '     + signedDate + ' (heure Réunion)');
  if (sigData.ipAddress) doc.text('Adresse IP : ' + sigData.ipAddress);
  doc.moveDown(0.5);
  doc.font('Helvetica-Oblique').fontSize(8).fillColor('#888')
     .text('"' + (sigData.acceptedText || 'Lu et approuvé') + '"');

  // Signature image if present
  if (sigData.signatureData && sigData.signatureData.startsWith('data:image/')) {
    try {
      const buf = Buffer.from(sigData.signatureData.split(',')[1], 'base64');
      doc.moveDown(1);
      doc.font('Helvetica-Bold').fontSize(9).fillColor('#444').text('Signature manuscrite :');
      doc.moveDown(0.3);
      doc.image(buf, { width: 200, height: 80 });
    } catch (_) {}
  }

  // Footer
  doc.font('Helvetica').fontSize(7).fillColor('#bbb')
     .text('Document certifié · Verdure & Cie · généré le ' + new Date().toLocaleDateString('fr-FR'),
           50, doc.page.height - 55, { align: 'center', width: 495 });

  doc.end();
  stream.on('finish', () => { if (done) done(null, filepath); });
  stream.on('error',  (e) => { console.error('GED PDF error:', e.message); if (done) done(e); });
}

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

  // Sauvegarde GED + envoi emails
  const _docLabel = { contract: 'Contrat de location', reglement: 'Règlement intérieur', etat_des_lieux: "État des lieux" }[req.body.documentType] || req.body.documentType;
  generateGedPdf(client, req.body.documentType, {
    signerName:    req.body.signerName,
    signerEmail:   req.body.signerEmail,
    acceptedText:  req.body.acceptedText,
    signatureData: req.body.signatureData || null,
    ipAddress:     req.ip,
    signedAt:      new Date().toISOString(),
  }, (err, pdfPath) => {
    if (!mailer) return;
    const attach = (!err && pdfPath) ? [{ filename: _docLabel.replace(/[^a-zA-Z0-9]/g, '_') + '_signe.pdf', path: pdfPath }] : [];
    mailer.sendMail({
      from: `"Verdure & Cie" <${process.env.SMTP_USER}>`,
      to: CONTACT_EMAIL,
      subject: `✍️ Document signé — ${client.guest_name} · ${_docLabel}`,
      html: `<p>Le client <b>${client.guest_name}</b> (${client.guest_email}) vient de signer le document : <b>${_docLabel}</b>.</p><p>Séjour : ${client.arrival || '—'} → ${client.departure || '—'}</p><p>Signé par : ${req.body.signerName} — IP : ${req.ip}</p>`,
      attachments: attach,
    }).catch(e => console.error('Email sign notif owner:', e.message));
    mailer.sendMail({
      from: `"Magali & Paul — Verdure & Cie" <${process.env.SMTP_USER}>`,
      to: client.guest_email,
      subject: `✅ Document signé — ${_docLabel} — Verdure & Cie`,
      html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto"><h2 style="color:#1a2e1a;font-family:Georgia,serif">Document signé ✅</h2><p>Bonjour <b>${client.guest_name}</b>,</p><p>Vous trouverez ci-joint votre exemplaire signé du document : <b>${_docLabel}</b>.</p><p>Séjour : <b>${client.arrival || '—'} → ${client.departure || '—'}</b></p><hr style="border:none;border-top:1px solid #ddd;margin:20px 0"><p style="font-size:12px;color:#888">Magali &amp; Paul · Verdure &amp; Cie · Saint-Pierre, La Réunion</p></div>`,
      attachments: attach,
    }).catch(e => console.error('Email sign notif client:', e.message));
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

app.post('/api/send-request', async (req, res) => {
  const { name, firstname, email, phone, arrival, departure, guests, message, rgpd, reglement } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Nom et email requis.' });
  }

  const fullName = firstname ? `${firstname} ${name}` : name;
  console.log(`Nouvelle demande : ${fullName} <${email}> — ${arrival} → ${departure}`);

  if (mailer) {
    // Email aux propriétaires
    try {
      await mailer.sendMail({
        from: `"Verdure & Cie" <${process.env.SMTP_USER}>`,
        to: CONTACT_EMAIL,
        subject: `🏡 Nouvelle demande — ${fullName} (${arrival} → ${departure})`,
        text: `Nouvelle demande de réservation\n\nPrénom : ${firstname || '—'}\nNom : ${name}\nEmail : ${email}\nTél : ${phone || '—'}\nArrivée : ${arrival || '—'}\nDépart : ${departure || '—'}\nVoyageurs : ${guests || '—'}\n\nMessage :\n${message || '—'}\n\nConsentements :\n- Règlement intérieur accepté : ${reglement ? 'Oui' : 'Non'}\n- RGPD accepté : ${rgpd ? 'Oui' : 'Non'}\n\n---\nEnvoyé depuis verdure.maisonpicard.com`,
        html: `<h2 style="color:#1a2e1a">Nouvelle demande de réservation</h2>
<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
  <tr><td style="padding:6px 12px 6px 0;font-weight:bold;color:#555">Prénom</td><td style="padding:6px 0">${firstname || '—'}</td></tr>
  <tr><td style="padding:6px 12px 6px 0;font-weight:bold;color:#555">Nom</td><td style="padding:6px 0">${name}</td></tr>
  <tr><td style="padding:6px 12px 6px 0;font-weight:bold;color:#555">Email</td><td style="padding:6px 0"><a href="mailto:${email}">${email}</a></td></tr>
  <tr><td style="padding:6px 12px 6px 0;font-weight:bold;color:#555">Téléphone</td><td style="padding:6px 0">${phone || '—'}</td></tr>
  <tr><td style="padding:6px 12px 6px 0;font-weight:bold;color:#555">Arrivée</td><td style="padding:6px 0">${arrival || '—'}</td></tr>
  <tr><td style="padding:6px 12px 6px 0;font-weight:bold;color:#555">Départ</td><td style="padding:6px 0">${departure || '—'}</td></tr>
  <tr><td style="padding:6px 12px 6px 0;font-weight:bold;color:#555">Voyageurs</td><td style="padding:6px 0">${guests || '—'}</td></tr>
</table>
<p style="margin-top:16px"><b>Message :</b><br>${(message || '—').replace(/\n/g,'<br>')}</p>
<p style="font-size:12px;color:#888;margin-top:16px">✅ Règlement intérieur accepté &nbsp;|&nbsp; ✅ Consentement RGPD donné</p>`,
      });
    } catch (err) {
      console.error('Email hôte échoué:', err.message);
    }

    // Email de confirmation au client
    try {
      await mailer.sendMail({
        from: `"Verdure & Cie" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Votre demande a bien été reçue — Verdure & Cie`,
        text: `Bonjour ${firstname || fullName},\n\nNous avons bien reçu votre demande de séjour pour les dates ${arrival || '—'} → ${departure || '—'}.\n\nMagali & Paul vous répondront personnellement sous 48h maximum.\n\nÀ très bientôt à Verdure & Cie !\n\n---\nMagali & Paul\nVerdure & Cie — Saint-Pierre, La Réunion\n📞 0692 51 27 66\n✉️ ${CONTACT_EMAIL}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto">
  <h2 style="color:#1a2e1a;font-family:Georgia,serif">Votre demande a bien été reçue ✅</h2>
  <p>Bonjour <b>${firstname || fullName}</b>,</p>
  <p>Nous avons bien reçu votre demande pour :</p>
  <table style="background:#f4f8f2;border-radius:8px;padding:14px 18px;border-collapse:collapse;width:100%">
    <tr><td style="padding:6px 12px 6px 0;color:#555">Arrivée</td><td style="font-weight:bold">${arrival || '—'}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;color:#555">Départ</td><td style="font-weight:bold">${departure || '—'}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;color:#555">Voyageurs</td><td style="font-weight:bold">${guests || '—'}</td></tr>
  </table>
  <p style="margin-top:20px"><b>Magali &amp; Paul vous répondront personnellement sous 48h maximum.</b></p>
  <p>À très bientôt à Verdure &amp; Cie !</p>
  <hr style="border:none;border-top:1px solid #ddd;margin:24px 0">
  <p style="font-size:12px;color:#888">Magali &amp; Paul · Verdure &amp; Cie · Saint-Pierre, La Réunion<br>
  📞 0692 51 27 66 · ✉️ ${CONTACT_EMAIL}</p>
</div>`,
      });
    } catch (err) {
      console.error('Email client échoué:', err.message);
    }
  }

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
  if (!DEEPSEEK_API_KEY) {
    return res.json({ reply: 'Bonjour ! Pour toute question sur Verdure & Cie, appelez le 0692 51 27 66 ou ecrivez a hello@maisonpicard.com' });
  }
  try {
    const safeMessages = messages.slice(-10).map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content || '').slice(0, 500),
    }));
    const dsRes = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + DEEPSEEK_API_KEY },
      body: JSON.stringify({
        model: 'deepseek-chat',
        max_tokens: 400,
        messages: [{ role: 'system', content: CHAT_SYSTEM }, ...safeMessages],
      }),
    });
    const data = await dsRes.json();
    const reply = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content)
      || 'Desole, une erreur est survenue. Contactez-nous au 0692 51 27 66.';
    res.json({ reply });
  } catch (err) {
    console.error('Chat DeepSeek error', err.message);
    res.json({ reply: 'Desole, une erreur est survenue. Contactez-nous au 0692 51 27 66.' });
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

  if (false) { /* anthropic generateAi - desactive */
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


// ── Crypto utils ─────────────────────────────────────────────────────────────
async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const key = await new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, k) => err ? reject(err) : resolve(k));
  });
  return `${salt}:${key.toString('hex')}`;
}

async function verifyPassword(password, stored) {
  if (!stored || !stored.includes(':')) return false;
  const [salt, hash] = stored.split(':');
  const key = await new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, k) => err ? reject(err) : resolve(k));
  });
  try {
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(key.toString('hex'), 'hex'));
  } catch { return false; }
}

// ── Client auth middleware ────────────────────────────────────────────────────
function requireClientAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Session expirée. Reconnectez-vous.' });
  const sessionToken = auth.slice(7);
  const client = db.getClientBySession(sessionToken);
  if (!client) return res.status(401).json({ error: 'Session expirée. Reconnectez-vous.' });
  if (client.session_expires && new Date(client.session_expires) < new Date()) {
    db.clearClientSession(client.id);
    return res.status(401).json({ error: 'Session expirée. Reconnectez-vous.' });
  }
  req.client = client;
  next();
}

// ── Client login ─────────────────────────────────────────────────────────────
app.post('/api/client/login', async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) return res.status(400).json({ error: 'Email et mot de passe requis.' });
  const client = db.getClientByLogin(login.trim().toLowerCase());
  if (!client || !client.password_hash) return res.status(401).json({ error: 'Identifiants incorrects.' });
  const ok = await verifyPassword(password, client.password_hash);
  if (!ok) return res.status(401).json({ error: 'Identifiants incorrects.' });
  const sessionToken = crypto.randomBytes(32).toString('base64url');
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  db.setClientSession(client.id, sessionToken, expiresAt);
  res.json({ sessionToken, token: client.token, mustChangePassword: Boolean(client.must_change_password) });
});

// ── Change password ───────────────────────────────────────────────────────────
app.post('/api/client/change-password', requireClientAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) return res.status(400).json({ error: 'Les deux mots de passe sont requis.' });
  if (newPassword.length < 8) return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 8 caractères.' });
  const ok = await verifyPassword(currentPassword, req.client.password_hash);
  if (!ok) return res.status(401).json({ error: 'Mot de passe actuel incorrect.' });
  const hash = await hashPassword(newPassword);
  db.setClientPassword(req.client.id, hash, false);
  res.json({ success: true });
});

// ── Get my data (authenticated) ───────────────────────────────────────────────
app.get('/api/client/me', requireClientAuth, (req, res) => {
  const client = req.client;
  res.json({
    client: serializeClient(client),
    signatures: db.listSignatures(client.id),
    mustChangePassword: Boolean(client.must_change_password),
    idDocUploaded: Boolean(client.id_doc_filename),
    paymentConfirmed: Boolean(client.payment_confirmed),
    paymentPaid: Boolean(client.payment_paid),
  });
});

// ── Logout ────────────────────────────────────────────────────────────────────
app.post('/api/client/logout', requireClientAuth, (req, res) => {
  db.clearClientSession(req.client.id);
  res.json({ success: true });
});

// ── Upload ID document ────────────────────────────────────────────────────────
const idUploadsDir = path.join(DATA_DIR, 'uploads');
fs.mkdirSync(idUploadsDir, { recursive: true });
const gedDir = path.join(DATA_DIR, 'ged');
fs.mkdirSync(gedDir, { recursive: true });
const idUpload = multer({
  dest: idUploadsDir,
  limits: { fileSize: 12 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = ['image/jpeg','image/png','image/webp','image/heic','application/pdf'].includes(file.mimetype);
    cb(ok ? null : new Error('Format non supporté'), ok);
  }
});

app.post('/api/client/upload-id', requireClientAuth, idUpload.single('id_doc'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Aucun fichier reçu.' });
  const ext = path.extname(req.file.originalname).toLowerCase() || '.jpg';
  const finalName = `id_${req.client.token}${ext}`;
  const finalPath = path.join(idUploadsDir, finalName);
  archiveExistingFile(finalPath);
  fs.renameSync(req.file.path, finalPath);
  db.setClientIdDoc(req.client.id, finalName);
  try {
    const cgd = path.join(gedDir, req.client.token);
    fs.mkdirSync(cgd, { recursive: true });
    const gedIdPath = path.join(cgd, 'piece_identite' + ext);
    archiveExistingFile(gedIdPath);
    fs.copyFileSync(finalPath, gedIdPath);
    const m2 = { token: req.client.token, guestName: req.client.guest_name, guestEmail: req.client.guest_email, arrival: req.client.arrival, departure: req.client.departure, guests: req.client.guests, updatedAt: new Date().toISOString() };
    fs.writeFileSync(path.join(cgd, 'dossier.json'), JSON.stringify(m2, null, 2));
  } catch (e) { console.error('GED ID copy:', e.message); }
  if (mailer) {
    const dlUrl = `${SITE_URL}/api/admin/id-doc/${req.client.token}?token=${ADMIN_TOKEN}`;
    mailer.sendMail({
      from: `"Verdure & Cie" <${process.env.SMTP_USER}>`,
      to: CONTACT_EMAIL,
      subject: `🪪 Pièce d'identité reçue — ${req.client.guest_name}`,
      html: `<p>Le client <b>${req.client.guest_name}</b> (${req.client.guest_email}) vient de déposer sa pièce d'identité.</p><p>Séjour : ${req.client.arrival || '—'} → ${req.client.departure || '—'}</p>${ADMIN_TOKEN ? `<p><a href="${dlUrl}">Télécharger la pièce d'identité</a></p>` : ''}`,
    }).catch(e => console.error('Email ID:', e.message));
  }
  res.json({ success: true });
});

// ── Confirm payment (client side) ─────────────────────────────────────────────
app.post('/api/client/confirm-payment', requireClientAuth, async (req, res) => {
  db.setClientPaymentConfirmed(req.client.id);
  if (mailer) {
    const amt = req.client.deposit_amount_cents ? (req.client.deposit_amount_cents / 100).toFixed(2) + ' €' : '—';
    mailer.sendMail({
      from: `"Verdure & Cie" <${process.env.SMTP_USER}>`,
      to: CONTACT_EMAIL,
      subject: `💶 Virement acompte confirmé — ${req.client.guest_name}`,
      html: `<p>Le client <b>${req.client.guest_name}</b> (${req.client.guest_email}) confirme avoir effectué le virement de l'acompte.</p><p><b>Montant attendu : ${amt}</b></p><p>Séjour : ${req.client.arrival || '—'} → ${req.client.departure || '—'}</p><p>Pensez à vérifier votre compte bancaire et à marquer le paiement comme reçu dans l'espace admin.</p>`,
    }).catch(e => console.error('Email virement:', e.message));
  }
  res.json({ success: true });
});

// ── Admin: send credentials email ─────────────────────────────────────────────
app.post('/api/admin/clients/:token/send-credentials', requireAdmin, async (req, res) => {
  const client = db.getClientByToken(req.params.token);
  if (!client) return res.status(404).json({ error: 'Client introuvable.' });
  const password = crypto.randomBytes(8).toString('base64url').slice(0, 10);
  const hash = await hashPassword(password);
  const login = client.guest_email.trim().toLowerCase();
  db.setClientLogin(client.id, login);
  db.setClientPassword(client.id, hash, true);
  if (!mailer) return res.status(503).json({ error: 'SMTP non configuré.' });
  const clientUrl = `${SITE_URL}/espace-client`;
  try {
    await mailer.sendMail({
      from: `"Magali & Paul — Verdure & Cie" <${process.env.SMTP_USER}>`,
      to: client.guest_email,
      subject: `🔑 Votre espace client est prêt — Verdure & Cie`,
      html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto">
  <h2 style="color:#1a2e1a;font-family:Georgia,serif">Votre espace client est prêt ✅</h2>
  <p>Bonjour <b>${client.guest_name}</b>,</p>
  <p>Votre dossier de réservation a été validé. Connectez-vous à votre espace pour :</p>
  <ul>
    <li>Signer le contrat de location et le règlement intérieur</li>
    <li>Déposer votre pièce d'identité</li>
    <li>Régler l'acompte de réservation</li>
    <li>Accéder au guide de séjour</li>
  </ul>
  <div style="background:#f4f8f2;border-radius:10px;padding:20px 24px;margin:20px 0;border:1px solid #c8dfc0">
    <p style="margin:0 0 8px;font-weight:bold">Vos identifiants de connexion :</p>
    <p style="margin:4px 0">Login : <code style="background:#fff;padding:2px 8px;border-radius:4px">${login}</code></p>
    <p style="margin:4px 0">Mot de passe : <code style="background:#fff;padding:2px 8px;border-radius:4px">${password}</code></p>
    <p style="font-size:12px;color:#888;margin-top:12px">⚠️ Vous devrez choisir un nouveau mot de passe à la première connexion.</p>
  </div>
  <p style="text-align:center;margin:28px 0">
    <a href="${clientUrl}" style="background:#2d6a2d;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px">Accéder à mon espace client →</a>
  </p>
  <p>Votre séjour : <b>${client.arrival || '—'} → ${client.departure || '—'}</b>${client.guests ? ' · ' + client.guests + ' voyageur(s)' : ''}</p>
  <hr style="border:none;border-top:1px solid #ddd;margin:24px 0">
  <p style="font-size:12px;color:#888">Magali &amp; Paul · Verdure &amp; Cie · Saint-Pierre, La Réunion<br>
  📞 0692 51 27 66 · ✉️ ${CONTACT_EMAIL}</p>
</div>`,
    });
    res.json({ success: true, login });
  } catch (err) {
    console.error('Email credentials:', err.message);
    res.status(500).json({ error: 'Erreur envoi email : ' + err.message });
  }
});

// ── Admin: reset client password ────────────────────────────────────────────
app.post('/api/admin/clients/:token/reset-password', requireAdmin, async (req, res) => {
  const client = db.getClientByToken(req.params.token);
  if (!client) return res.status(404).json({ error: 'Client introuvable.' });
  const password = crypto.randomBytes(8).toString('base64url').slice(0, 10);
  const hash = await hashPassword(password);
  const login = client.guest_email.trim().toLowerCase();
  db.setClientLogin(client.id, login);
  db.setClientPassword(client.id, hash, true);
  if (!mailer) return res.json({ success: true, password, note: 'SMTP non configuré — mot de passe non envoyé.' });
  try {
    await mailer.sendMail({
      from: `"Magali & Paul — Verdure & Cie" <${process.env.SMTP_USER}>`,
      to: client.guest_email,
      subject: `🔑 Nouveau mot de passe — Verdure & Cie`,
      html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto"><h2 style="color:#1a2e1a;font-family:Georgia,serif">Mot de passe réinitialisé 🔑</h2><p>Bonjour <b>${client.guest_name}</b>,</p><p>Votre mot de passe a été réinitialisé. Voici vos nouveaux identifiants :</p><div style="background:#f4f8f2;border-radius:10px;padding:20px 24px;margin:20px 0;border:1px solid #c8dfc0"><p style="margin:4px 0">Login : <code style="background:#fff;padding:2px 8px;border-radius:4px">${login}</code></p><p style="margin:4px 0">Mot de passe : <code style="background:#fff;padding:2px 8px;border-radius:4px">${password}</code></p><p style="font-size:12px;color:#888;margin-top:12px">⚠️ Vous devrez choisir un nouveau mot de passe à la prochaine connexion.</p></div><p style="text-align:center;margin:28px 0"><a href="${SITE_URL}/espace-client" style="background:#2d6a2d;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold">Accéder à mon espace client →</a></p><hr style="border:none;border-top:1px solid #ddd;margin:24px 0"><p style="font-size:12px;color:#888">Magali &amp; Paul · Verdure &amp; Cie · Saint-Pierre, La Réunion</p></div>`,
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Erreur envoi email : ' + err.message });
  }
});

// ── Client: request password reset by email ──────────────────────────────────
app.post('/api/client/request-reset', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email requis.' });
  const client = db.getClientByLogin(email.trim().toLowerCase());
  // Always respond OK to prevent enumeration
  if (!client || !mailer) { return res.json({ success: true }); }
  const password = crypto.randomBytes(8).toString('base64url').slice(0, 10);
  const hash = await hashPassword(password);
  db.setClientPassword(client.id, hash, true);
  mailer.sendMail({
    from: `"Magali & Paul — Verdure & Cie" <${process.env.SMTP_USER}>`,
    to: client.guest_email,
    subject: `🔑 Réinitialisation de mot de passe — Verdure & Cie`,
    html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto"><h2 style="color:#1a2e1a;font-family:Georgia,serif">Réinitialisation de mot de passe 🔑</h2><p>Bonjour <b>${client.guest_name}</b>,</p><p>Voici votre mot de passe temporaire :</p><div style="background:#f4f8f2;border-radius:10px;padding:20px 24px;margin:20px 0;border:1px solid #c8dfc0"><p style="margin:4px 0">Login : <code style="background:#fff;padding:2px 8px;border-radius:4px">${client.client_login}</code></p><p style="margin:4px 0">Mot de passe : <code style="background:#fff;padding:2px 8px;border-radius:4px">${password}</code></p><p style="font-size:12px;color:#888;margin-top:12px">⚠️ Vous devrez choisir un nouveau mot de passe à la connexion.</p></div><p style="text-align:center;margin:28px 0"><a href="${SITE_URL}/espace-client" style="background:#2d6a2d;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold">Accéder à mon espace client →</a></p><hr style="border:none;border-top:1px solid #ddd;margin:24px 0"><p style="font-size:12px;color:#888">Magali &amp; Paul · Verdure &amp; Cie · Saint-Pierre, La Réunion</p></div>`,
  }).catch(e => console.error('Email reset:', e.message));
  res.json({ success: true });
});

// ── Admin: mark payment as received ──────────────────────────────────────────
app.post('/api/admin/clients/:token/mark-paid', requireAdmin, async (req, res) => {
  const client = db.getClientByToken(req.params.token);
  if (!client) return res.status(404).json({ error: 'Client introuvable.' });
  db.setClientPaymentPaid(client.id);
  if (mailer) {
    const amt = client.deposit_amount_cents ? (client.deposit_amount_cents / 100).toFixed(2) + ' €' : '—';
    mailer.sendMail({
      from: `"Magali & Paul — Verdure & Cie" <${process.env.SMTP_USER}>`,
      to: client.guest_email,
      subject: `✅ Acompte reçu — votre dossier est complet · Verdure & Cie`,
      html: `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto">
  <h2 style="color:#1a2e1a;font-family:Georgia,serif">Votre dossier est complet ✅</h2>
  <p>Bonjour <b>${client.guest_name}</b>,</p>
  <p>Nous avons bien reçu votre acompte de <b>${amt}</b>. Votre réservation est confirmée.</p>
  <p>Séjour : <b>${client.arrival || '—'} → ${client.departure || '—'}</b></p>
  <p>Accédez au guide de séjour et retrouvez toutes les infos pratiques dans votre espace client.</p>
  <p style="text-align:center;margin:28px 0">
    <a href="${SITE_URL}/espace-client" style="background:#2d6a2d;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:bold">Mon espace client →</a>
  </p>
  <hr style="border:none;border-top:1px solid #ddd;margin:24px 0">
  <p style="font-size:12px;color:#888">Magali &amp; Paul · Verdure &amp; Cie<br>📞 0692 51 27 66</p>
</div>`,
    }).catch(e => console.error('Email paid notif:', e.message));
  }
  res.json({ success: true });
});

// ── Admin: download ID document ───────────────────────────────────────────────
app.get('/api/admin/id-doc/:token', requireAdmin, (req, res) => {
  const client = db.getClientByToken(req.params.token);
  if (!client || !client.id_doc_filename) return res.status(404).json({ error: 'Aucun document.' });
  const filePath = path.join(DATA_DIR, 'uploads', client.id_doc_filename);
  if (!require('fs').existsSync(filePath)) return res.status(404).json({ error: 'Fichier introuvable.' });
  res.download(filePath, `piece_identite_${client.guest_name.replace(/\s+/g,'_')}.jpg`);
});


// ── Admin : GED ───────────────────────────────────────────────────────────────
app.get('/api/admin/ged', requireAdmin, (req, res) => {
  if (!fs.existsSync(gedDir)) return res.json({ dossiers: [] });
  const dossiers = fs.readdirSync(gedDir)
    .filter(f => fs.statSync(path.join(gedDir, f)).isDirectory())
    .map(token => {
      const dir = path.join(gedDir, token);
      let meta = {};
      try { meta = JSON.parse(fs.readFileSync(path.join(dir, 'dossier.json'), 'utf8')); } catch {}
      const files = fs.readdirSync(dir).filter(f => f !== 'dossier.json');
      return { token, meta, files };
    })
    .sort((a, b) => (b.meta.updatedAt || '').localeCompare(a.meta.updatedAt || ''));
  res.json({ dossiers });
});

app.get('/api/admin/ged/:token/:filename', requireAdmin, (req, res) => {
  const safe = req.params.filename.replace(/[^a-zA-Z0-9_.\-]/g, '');
  const filepath = path.join(gedDir, req.params.token, safe);
  if (!filepath.startsWith(gedDir)) return res.status(403).end();
  if (!fs.existsSync(filepath)) return res.status(404).json({ error: 'Fichier introuvable.' });
  res.download(filepath);
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Verdure & Cie - http://127.0.0.1:${PORT}`);
});
