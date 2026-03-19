#!/bin/bash

# ============================================
# Školní Trénink - Aktualizační skript
# ============================================

set -e

echo "🔄 Aktualizace Školní Trénink..."

# Pull nové verze (pokud používáte git)
if [ -d .git ]; then
    echo "📥 Stahování nové verze..."
    git pull
fi

# Zastavení aplikace
echo "🛑 Zastavování aplikace..."
docker compose down

# Sestavení nové verze
echo "🔨 Sestavování nové verze..."
docker compose build --no-cache

# Spuštění
echo "🚀 Spouštění aplikace..."
docker compose up -d

# Čekání na start
echo "⏳ Čekání na start..."
sleep 10

if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Aplikace úspěšně aktualizována!"
else
    echo "❌ Aplikaci se nepodařilo spustit"
    docker compose logs
    exit 1
fi
