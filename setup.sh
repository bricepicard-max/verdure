#!/bin/bash
set -e
DIR=/opt/verdure
ENV=$DIR/.env

cd $DIR
git pull origin main

# Génère le secret si absent
if ! grep -q "WEBHOOK_SECRET" $ENV 2>/dev/null; then
  SECRET=$(openssl rand -hex 32)
  echo "WEBHOOK_SECRET=$SECRET" >> $ENV
  echo ""
  echo "================================"
  echo "SECRET WEBHOOK GENERE :"
  echo "$SECRET"
  echo "================================"
  echo "Copie ce secret dans GitHub :"
  echo "github.com/bricepicard-max/verdure"
  echo "Settings > Webhooks > Add webhook"
  echo "URL: https://verdure.maisonpicard.com/api/webhook/github"
  echo "Content type: application/json"
  echo "================================"
else
  echo "WEBHOOK_SECRET deja configure."
fi

pm2 restart verdure
echo "Serveur redemarré. Déploiement auto actif."
