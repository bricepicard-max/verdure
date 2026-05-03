/**
 * Verdure & Cie — Serveur Express + Stripe
 * 
 * Routes :
 *   POST /api/send-request   → Envoi demande (mode manuel, sans Stripe)
 *   POST /api/create-checkout → Crée une session Stripe Checkout (si configuré)
 *   POST /api/webhook         → Stripe webhook
 *   GET  /api/config          → Config frontend
 */

require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3010;
const SITE_URL = process.env.SITE_URL || 'https://verdure.maisonpicard.com';
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'hello@maisonpicard.com';

// Stripe (optionnel — le site fonctionne sans)
let stripe = null;
if (process.env.STRIPE_SECRET_KEY) {
  try {
    stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    console.log('✅ Stripe initialisé avec succès');
  } catch (e) {
    console.log('ℹ️  Stripe non disponible (mode manuel actif)');
  }
}

// --- Middleware ---
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// --- API: mode manuel (sans Stripe) ---
app.post('/api/send-request', (req, res) => {
  const { name, email, phone, arrival, departure, guests, message } = req.body;

  if (!name || !email || !arrival || !departure) {
    return res.status(400).json({ error: 'Nom, email, arrivée et départ requis.' });
  }

  console.log('✉️  NOUVELLE DEMANDE DE RÉSERVATION');
  console.log(`   Nom: ${name}`);
  console.log(`   Email: ${email}`);
  console.log(`   Tél: ${phone || '—'}`);
  console.log(`   Arrivée: ${arrival}`);
  console.log(`   Départ: ${departure}`);
  console.log(`   Voyageurs: ${guests || '2'}`);
  console.log(`   Message: ${(message || '').substring(0, 200)}`);
  console.log(`   ———————————`);

  // TODO: envoyer email de notification à hello@maisonpicard.com
  // Via Nodemailer, SendGrid, ou autre service de votre choix.

  res.json({ success: true, message: 'Demande reçue.' });
});

// --- API: Stripe Checkout (si configuré) ---
app.post('/api/create-checkout', async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ error: 'Paiement non disponible. Utilisez le formulaire de demande.' });
  }

  try {
    const { name, email, phone, arrival, departure, guests, message } = req.body;

    if (!name || !email || !arrival || !departure) {
      return res.status(400).json({ error: 'Nom, email, arrivée et départ requis.' });
    }

    const priceId = process.env.STRIPE_PRICE_ID_ACOMPTE;
    if (!priceId) {
      return res.status(500).json({ error: 'Paiement non configuré. Contactez le propriétaire.' });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      metadata: {
        name, phone: phone || '', arrival, departure,
        guests: guests || '2',
        message: (message || '').substring(0, 500),
      },
      success_url: `${SITE_URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/cancel.html`,
      locale: 'fr',
    });

    console.log(`💰 Session Stripe créée: ${session.id} (${email})`);
    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: 'Erreur de paiement. Réessayez ou contactez-nous.' });
  }
});

// --- API: Stripe Webhook ---
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return res.status(501).json({ error: 'Webhook non configuré.' });
  }

  try {
    const event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);

    if (event.type === 'checkout.session.completed') {
      const s = event.data.object;
      console.log('✅ PAIEMENT REÇU !', {
        email: s.customer_email,
        montant: s.amount_total,
        metadata: s.metadata,
      });
      // TODO: envoyer email de confirmation + notifier propriétaire
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

// --- API: config frontend ---
app.get('/api/config', (req, res) => {
  res.json({
    stripeReady: !!stripe && !!process.env.STRIPE_PUBLISHABLE_KEY,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
    siteUrl: SITE_URL,
    contactEmail: CONTACT_EMAIL,
  });
});

// --- 404 ---
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// --- Start ---
app.listen(PORT, '127.0.0.1', () => {
  console.log(`\n🌿 Verdure & Cie — http://127.0.0.1:${PORT}`);
  console.log(`   Mode: ${stripe ? '✅ Stripe actif' : '📝 Demandes manuelles'}`);
  console.log(`   Site: ${SITE_URL}\n`);
});
