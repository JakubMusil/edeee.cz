#!/bin/bash

# ============================================
# Školní Trénink - Záloha databáze
# ============================================

BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="skolni-trenink_backup_$TIMESTAMP.db"

# Vytvoření adresáře pro zálohy
mkdir -p $BACKUP_DIR

echo "💾 Vytváření zálohy databáze..."

# Kopírování databáze z Docker volume
docker compose exec skolni-trenink cat /app/data/skolni-trenink.db > "$BACKUP_DIR/$BACKUP_FILE"

if [ -f "$BACKUP_DIR/$BACKUP_FILE" ]; then
    echo "✅ Záloha vytvořena: $BACKUP_DIR/$BACKUP_FILE"
    echo "📊 Velikost: $(du -h "$BACKUP_DIR/$BACKUP_FILE" | cut -f1)"
else
    echo "❌ Zálohu se nepodařilo vytvořit"
    exit 1
fi

# Odstranění záloh starších než 30 dní
find $BACKUP_DIR -name "*.db" -type f -mtime +30 -delete
echo "🧹 Staré zálohy odstraněny"
