# Verdure & Cie

Site vitrine premium pour la villa Verdure & Cie à Saint-Pierre, La Réunion.

## Objectif

- Présenter la villa de manière sobre, élégante et fiable.
- Mettre en avant Airbnb, Booking et une demande directe simple.
- Garder une architecture légère : HTML, CSS et JavaScript statiques servis par Express.
- Ne pas afficher de parcours de règlement sur la vitrine.

## Stack

- Frontend : `public/index.html`, `public/styles.css`, `public/app.js`
- Serveur : Node.js + Express dans `server.js`
- Assets : `assets/images/`
- Process : PM2 via `ecosystem.config.js`

## Lancer localement

```bash
npm install
npm start
```

Le site écoute par défaut sur `http://127.0.0.1:3010`.

## Déploiement

Le projet est prévu pour tourner derrière PM2 et Nginx. Ne pas modifier Nginx, PM2, Certbot ou les autres projets du serveur sans instruction explicite.

## Photos

La V3 utilise une sélection limitée de photos nommées lisiblement, par exemple :

- `assets/images/piscine.jpeg`
- `assets/images/salon.jpeg`
- `assets/images/terrasse.jpeg`
- `assets/images/cuisine.jpeg`
- `assets/images/exterieur.jpeg`
- `assets/images/vue.jpeg`

Les légendes doivent rester factuelles. Si une pièce n'est pas certaine, préférer une légende neutre comme “Espace de vie”, “Ambiance villa” ou “Détail de la maison”.
