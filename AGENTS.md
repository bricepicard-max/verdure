# AGENTS.md — Verdure & Cie

## Rôle

Ce dossier contient le site vitrine de **Verdure & Cie**. L'agent (Atlas 🏡) est en charge de :

- Maintenir le code du site
- Améliorer le design et le contenu
- Préparer l'infrastructure (Nginx, déploiement)
- Planifier et documenter les prochaines étapes (Booking/Airbnb sync, paiement Stripe, calendrier)

## Règles

- **Ne pas toucher** à Nginx, PM2, Certbot ni aux autres projets sur le VPS sauf instruction explicite
- **Travailler uniquement** dans `/opt/verdure/`
- Toujours préférer le plus simple et le plus rapide à mettre en ligne
- Tout changement significatif → commit Git

## Conventions

- Langue : français
- Design : nature, premium, chaleureux
- Responsive : desktop d'abord, adapté mobile
- Performance : zéro dépendance, zéro build
