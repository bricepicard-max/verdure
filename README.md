# 🌿 Verdure & Cie — Site de location saisonnière

Site vitrine statique pour la maison de vacances **Verdure & Cie**, propriété de Brice.

## Stack

- **HTML / CSS / JS** — site statique, responsive, sans backend
- **Nginx** — servi via `verdure.maisonpicard.com`
- **Aucune dépendance externe** — zéro build, zéro package
- **PM2** — processus géré automatiquement (port 3010)

## Structure

```
/opt/verdure/
├── index.html      # Page complète (hero, intro, équipements, galerie, tarifs, contact)
├── styles.css      # Design nature / premium — variables, grille, responsive
├── app.js          # Navigation mobile, animations, formulaire statique
├── README.md
├── AGENTS.md
├── ROADMAP.md
├── TASKS.md
└── assets/         # (futur) photos, icônes
```

## Développement local

```
python3 -m http.server 3010
# → http://localhost:3010
```

## Production (PM2)

Le site est géré par **PM2** avec redémarrage automatique :

```bash
pm2 status verdure
pm2 logs verdure
pm2 restart verdure
```

La configuration se trouve dans `ecosystem.config.js`.

## Déploiement

Le site est déployé sur le VPS à l'adresse :

- **URL** : https://verdure.maisonpicard.com
- **Racine** : `/var/www/verdure.maisonpicard.com/public_html/`

Voir `ROADMAP.md` pour les prochaines étapes.

---

*Fait avec 🏡 par Atlas pour Brice*

## Améliorations réalisées (v2)

| Domaine | Changement |
|---------|-----------|
| SEO | Balises Open Graph + Twitter Card + canonical |
| SEO | JSON-LD (VacationRental) |
| SEO | `robots.txt` + `sitemap.xml` |
| SEO | Balises heading hiérarchisées (h1 → h2 → h3 → h4) |
| Accessibilité | `lang="fr"`, `aria-label` sur le menu, labels de formulaire |
| Performance | Cache 7 jours CSS/JS, 30 jours favicon |
| Performance | Gzip activé (text/css, js, svg, text/plain) |
| Liens morts | Logo → `/`, liens Booking/Airbnb neutralisés |
| 404 | Page personnalisée cohérente avec le design |
| Favicon | SVG inline (🌿) |
| Infra | Nginx `proxy_intercept_errors` pour 404 custom |
