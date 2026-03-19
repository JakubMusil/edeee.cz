#!/bin/sh
set -e

# Nastavení DATABASE_URL pro prisma
export DATABASE_URL="file:/app/data/skolni-trenink.db"

# Vytvoření adresáře pro databázi, pokud neexistuje
mkdir -p /app/data

# Inicializace databáze při prvním spuštění
if [ ! -f /app/data/skolni-trenink.db ]; then
    echo "🔄 Inicializace databáze..."
    
    # Push schématu do databáze
    cd /app
    npx prisma db push --skip-generate
    
    # Seedování databáze
    echo "🌱 Seedování databáze..."
    bun run prisma/seed.ts
    
    echo "✅ Databáze inicializována!"
else
    echo "✅ Databáze již existuje, přeskakuji inicializaci."
fi

# Spuštění aplikace
exec "$@"
