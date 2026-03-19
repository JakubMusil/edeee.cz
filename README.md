# 📚 Školní Trénink

Responzivní webová aplikace pro trénink dětí ve škole s modulárním systémem, gamifikací a českým jazykem.

![Version](https://img.shields.io/badge/version-1.0.0-green)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/license-MIT-purple)

## 🚀 Rychlé nasazení (Docker)

### Jeden příkaz na Ubuntu:

```bash
curl -fsSL https://raw.githubusercontent.com/YOUR_REPO/main/deploy.sh | bash
```

### Nebo ručně:

```bash
# Klonování repozitáře
git clone https://github.com/YOUR_REPO/skolni-trenink.git
cd skolni-trenink

# Spuštění deploy skriptu
chmod +x deploy.sh
./deploy.sh
```

Aplikace bude dostupná na **http://localhost:3000**

## 📦 Co je součástí

### Vzdělávací moduly

| Modul | Popis | Třída |
|-------|-------|-------|
| ✖️ **Malá násobilka** | Násobilka od 1 do 10 | 2.-5. třída |
| ➕ **Sčítání a odčítání** | Operace do 100 | 1.-4. třída |
| 📝 **Slovní druhy** | Rozpoznávání slovních druhů | 3.-5. třída |
| 💬 **Druhy vět** | Oznamovací, tázací, rozkazovací, přací | 3.-5. třída |

### Gamifikace

- ⭐ **Body a úrovně** - Získávej body a stoupej v úrovních
- 🏆 **Úspěchy** - Odemykej odznaky za splněné úkoly
- 📊 **Žebříček** - Soutěž s ostatními žáky
- 🔥 **Denní série** - Udržuj pravidelnost v učení

## 🐳 Docker příkazy

```bash
# Spuštění
docker compose up -d

# Zastavení
docker compose down

# Restart
docker compose restart

# Logy
docker compose logs -f

# Status
docker compose ps

# Aktualizace
./update.sh

# Záloha databáze
./backup.sh
```

## 💻 Lokální vývoj

```bash
# Instalace závislostí
bun install

# Nastavení databáze
bun run db:push
bun run db:seed

# Spuštění vývojového serveru
bun run dev
```

## 👤 Demo účet

- **Email:** `demo@skolka.cz`
- **Heslo:** `demo123`

## 🔧 Konfigurace

### Environment proměnné

Vytvořte `.env` soubor:

```env
DATABASE_URL=file:./data/skolni-trenink.db
```

### Port

Výchozí port je `3000`. Změňte v `docker-compose.yml`:

```yaml
ports:
  - "8080:3000"  # Aplikace na portu 8080
```

## 📁 Struktura projektu

```
skolni-trenink/
├── prisma/
│   ├── schema.prisma      # Databázové schéma
│   └── seed.ts            # Inicializační data
├── src/
│   ├── app/
│   │   ├── api/           # API endpoints
│   │   ├── page.tsx       # Hlavní stránka
│   │   └── layout.tsx     # Layout
│   ├── components/ui/     # UI komponenty
│   ├── lib/               # Knihovny a data
│   └── store/             # State management
├── Dockerfile             # Docker build
├── docker-compose.yml     # Docker Compose
├── deploy.sh              # Deploy skript
├── update.sh              # Aktualizační skript
└── backup.sh              # Záložní skript
```

## 🌐 Produkční nasazení

### Vercel

```bash
# Instalace Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Vlastní server s Docker

```bash
# Build
docker build -t skolni-trenink .

# Run
docker run -d \
  -p 3000:3000 \
  -v skolni-trenink-data:/app/data \
  --name skolni-trenink \
  skolni-trenink
```

## 🔒 Bezpečnost

- Non-root uživatel v Docker kontejneru
- Hashování hesel (bcrypt)
- Input validace
- XSS ochrana (Next.js built-in)

## 📝 Přidání nového modulu

1. Přidejte modul do `prisma/seed.ts`
2. Vytvořte generátor otázek v `/api/tests/generate/route.ts`
3. Přidejte data do `/lib/czech-language-data.ts` (pro český jazyk)

## 🤝 Přispívání

1. Fork repozitáře
2. Vytvořte feature branch (`git checkout -b feature/nova-funkce`)
3. Commit změn (`git commit -m 'Přidána nová funkce'`)
4. Push do branch (`git push origin feature/nova-funkce`)
5. Vytvořte Pull Request

## 📄 Licence

MIT License - volné použití pro vzdělávací účely.

---

**Vytvořeno s ❤️ pro české děti**
