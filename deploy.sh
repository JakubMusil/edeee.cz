#!/bin/bash

# ============================================
# Školní Trénink - Deployment Skript
# ============================================
# Tento skript nasadí aplikaci do Dockeru na Ubuntu
# Spuštění: curl -fsSL https://raw.githubusercontent.com/YOUR_REPO/main/deploy.sh | bash
# nebo: ./deploy.sh
# ============================================

set -e

# Barvy pro výstup
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logo
echo -e "${BLUE}"
echo "  ╔═══════════════════════════════════════╗"
echo "  ║     📚 Školní Trénink - Deploy       ║"
echo "  ║     Učení hrou pro české děti        ║"
echo "  ╚═══════════════════════════════════════╝"
echo -e "${NC}"

# Kontrola, zda běžíme na Linuxu/Ubuntu
if [ -f /etc/os-release ]; then
    . /etc/os-release
    echo -e "${GREEN}✓ Detekován OS: $NAME${NC}"
else
    echo -e "${YELLOW}! Nelze detekovat OS, pokračuji...${NC}"
fi

# ============================================
# INSTALACE DOCKERU (pokud není nainstalován)
# ============================================

if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}Docker není nainstalován. Instaluji Docker...${NC}"
    
    # Aktualizace balíčků
    sudo apt-get update
    
    # Instalace závislostí
    sudo apt-get install -y \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg \
        lsb-release
    
    # Přidání Docker GPG klíče
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    
    # Přidání Docker repozitáře
    echo \
        "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
        $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    # Instalace Dockeru
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    
    # Povolení Dockeru pro aktuálního uživatele
    sudo usermod -aG docker $USER
    
    echo -e "${GREEN}✓ Docker úspěšně nainstalován${NC}"
else
    echo -e "${GREEN}✓ Docker je již nainstalován${NC}"
fi

# ============================================
# KONTROLA DOCKER COMPOSE
# ============================================

if ! docker compose version &> /dev/null; then
    echo -e "${YELLOW}Docker Compose není dostupný. Instaluji...${NC}"
    sudo apt-get install -y docker-compose-plugin
    echo -e "${GREEN}✓ Docker Compose úspěšně nainstalován${NC}"
else
    echo -e "${GREEN}✓ Docker Compose je dostupný${NC}"
fi

# ============================================
# STAZENÍ APLIKACE (pokud není přítomna)
# ============================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo -e "${BLUE}📁 Pracovní adresář: $SCRIPT_DIR${NC}"

# ============================================
# SESTAVENÍ A SPUŠTĚNÍ
# ============================================

echo -e "${BLUE}🔨 Sestavování Docker image...${NC}"
docker compose build --no-cache

echo -e "${BLUE}🚀 Spouštění aplikace...${NC}"
docker compose up -d

# ============================================
# ČEKÁNÍ NA START
# ============================================

echo -e "${BLUE}⏳ Čekání na start aplikace...${NC}"
sleep 10

# Kontrola health status
MAX_RETRIES=30
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if curl -s http://localhost:3000 > /dev/null; then
        echo -e "${GREEN}✅ Aplikace úspěšně spuštěna!${NC}"
        break
    fi
    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo -e "${YELLOW}Čekání na aplikaci... ($RETRY_COUNT/$MAX_RETRIES)${NC}"
    sleep 2
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    echo -e "${RED}❌ Aplikaci se nepodařilo spustit včas${NC}"
    echo -e "${YELLOW}Zkontrolujte logy: docker compose logs${NC}"
    exit 1
fi

# ============================================
# INFORMACE
# ============================================

echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}🎉 Školní Trénink je připraven!${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}📱 Aplikace je dostupná na:${NC}"
echo -e "   ${GREEN}http://localhost:3000${NC}"
echo ""
echo -e "${BLUE}👤 Demo účet:${NC}"
echo -e "   Email: ${GREEN}demo@skolka.cz${NC}"
echo -e "   Heslo: ${GREEN}demo123${NC}"
echo ""
echo -e "${BLUE}📝 Užitečné příkazy:${NC}"
echo -e "   Zastavení:     ${YELLOW}docker compose down${NC}"
echo -e "   Restart:       ${YELLOW}docker compose restart${NC}"
echo -e "   Logy:          ${YELLOW}docker compose logs -f${NC}"
echo -e "   Status:        ${YELLOW}docker compose ps${NC}"
echo ""
echo -e "${BLUE}💾 Databáze je uložena v Docker volume:${NC}"
echo -e "   ${YELLOW}skolni-trenink-data${NC}"
echo ""
