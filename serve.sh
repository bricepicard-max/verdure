#!/bin/bash
# Lance un serveur de développement pour Verdure & Cie
cd /opt/verdure
echo "🏡 Verdure & Cie — http://localhost:3010"
python3 -m http.server 3010
