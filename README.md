# 🌿 Verdure & Cie — Site de réservation directe

Villa de charme avec piscine privée — Saint-Pierre, La Réunion.
Site vitrine + réservation directe avec Stripe.

## Stack

- **Backend** : Node.js + Express
- **Frontend** : HTML / CSS / JS statique (servi par Express)
- **Paiement** : Stripe Checkout (acompte 30%)
- **Process** : PM2 (auto-restart)
- **Serveur** : Nginx (reverse proxy → localhost:3010)

## Structure

```
/opt/verdure/
├── server.js              # Serveur Express + routes Stripe
├── package.json
├── .env.example           # Modèle des variables d'environnement
├── ecosystem.config.js    # Configuration PM2
├── public/
│   ├── index.html         # Page principale
│   ├── styles.css         # Design premium responsive
│   ├── app.js             # Logique frontend (galerie, formulaire)
│   ├── config.js          # Config dynamique depuis le serveur
│   ├── success.html       # Page après paiement réussi
│   ├── cancel.html        # Page après annulation paiement
│   ├── 404.html           # Page personnalisée
│   ├── robots.txt
│   └── sitemap.xml
├── assets/
│   └── images/            # 68 photos (UUID Airbnb)
├── README.md
├── AGENTS.md
├── ROADMAP.md
└── TASKS.md
```

## Lancer le site

```bash
cd /opt/verdure
npm install
cp .env.example .env        # Configurer Stripe (voir ci-dessous)
pm2 start ecosystem.config.js
pm2 save
```

Le site est accessible sur `http://localhost:3010`.
Nginx proxyfie vers `https://verdure.maisonpicard.com`.

## Configurer Stripe

1. Créez un compte Stripe → [dashboard.stripe.com](https://dashboard.stripe.com)
2. Allez dans **Developers → API Keys**
3. Copiez les clés test dans `.env` :
   ```
   STRIPE_SECRET_KEY=sk_test_xxxxx
   STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
   ```
4. Créez un produit **"Acompte 30% Verdure & Cie"** (montant fixe, 30% du prix moyen)
5. Copiez le Price ID (pri_test_xxxx) dans :
   ```
   STRIPE_PRICE_ID_ACOMPTE=pri_test_xxxxx
   ```
6. Redémarrez PM2 : `pm2 restart verdure`

### Mode test vs mode production

- **Sans clés** : le formulaire envoie une demande manuelle (pas de paiement)
- **Avec clés test** : paiement Stripe en mode test (carte : 4242 4242 4242 4242)
- **Avec clés production** : paiements réels

## Caution (500€)

La caution est gérée **semi-manuellement** :

1. **Affichée clairement** sur le site (section Conditions)
2. **Option Stripe** : si `STRIPE_PRICE_ID_CAUTION` est configuré, un bouton "Payer la caution" apparaît après réservation
3. **Remboursement** : manuel depuis le dashboard Stripe après le séjour (virement ou remboursement carte)

Stripe ne propose pas de préautorisation native via Checkout. La solution actuelle :
- Paiement séparé pour la caution (optionnel)
- Remboursement manuel via le dashboard Stripe
- Avant déploiement final, vous pouvez :
  - Utiliser Stripe Payment Links pour la caution
  - Ou intégrer Stripe Payment Intents pour une préautorisation (plus complexe)

## Modifier les photos

Les 68 photos sont dans `assets/images/`. Pour changer la galerie :

1. Ajoutez vos photos dans `assets/images/`
2. Modifiez le tableau `photos` dans `public/app.js` (fonction `loadGallery`)
3. Les photos sont référencées par leur nom de fichier

## Variables d'environnement

| Variable | Obligatoire | Description |
|----------|-------------|-------------|
| `STRIPE_SECRET_KEY` | Non (mode manuel) | Clé secrète Stripe |
| `STRIPE_PUBLISHABLE_KEY` | Non | Clé publiable Stripe |
| `STRIPE_WEBHOOK_SECRET` | Non | Secret webhook Stripe |
| `STRIPE_PRICE_ID_ACOMPTE` | Non | ID du prix acompte 30% |
| `STRIPE_PRICE_ID_CAUTION` | Non | ID du prix caution 500€ |
| `PORT` | Non (défaut: 3010) | Port local |
| `SITE_URL` | Non | URL publique du site |
| `CONTACT_EMAIL` | Non | Email de contact |

## Commandes utiles

```bash
pm2 status verdure          # Voir l'état
pm2 logs verdure            # Voir les logs
pm2 restart verdure         # Redémarrer
pm2 stop verdure            # Arrêter
curl -I https://verdure.maisonpicard.com  # Vérifier HTTPS
```

## Licence

Propriété de Brice — Tous droits réservés.
