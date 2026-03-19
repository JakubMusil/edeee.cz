# Školní Trénink - Vzdělávací aplikace pro děti

Responzivní webová aplikace pro trénink dětí ve škole s modulárním systémem, gamifikací a multiplayerem.

## Funkce

- **Modulární systém** - Snadno přidat nové vzdělávací moduly
- **Gamifikace** - Body, úrovně, odznaky a žebříčky
- **Multiplayer** - Soutěžení s ostatními žáky
- **Responzivní design** - Funguje na mobilu i desktopu
- **Český jazyk** - Připraveno pro české školy dle legislativy ČR

## Implementované moduly

1. **Malá násobilka** - Násobilka od 1 do 10 (pro 2.-5. třídu)
2. **Sčítání a odčítání do 100** - Základní operace (pro 1.-4. třídu)

## Technologie

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- Prisma ORM
- SQLite (pro vývoj)
- Zustand (state management)

## Lokální spuštění

```bash
# Instalace závislostí
bun install

# Nastavení databáze
bun run db:push
bun run db:seed

# Spuštění vývojového serveru
bun run dev
```

Aplikace bude dostupná na `http://localhost:3000`

## Demo účet

- Email: `demo@skolka.cz`
- Heslo: `demo123`

## Deployment na Vercel

### 1. Příprava repozitáře

```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Nastavení na Vercel

1. Přejděte na [vercel.com](https://vercel.com)
2. Importujte repozitář z GitHubu
3. Nastavte environment variables:
   - `DATABASE_URL` - URL k vaší databázi

### 3. Databáze pro produkci

Pro produkční nasazení doporučujeme použít:
- **PlanetScale** - MySQL kompatibilní
- **Turso** - SQLite na okraji sítě
- **Supabase** - PostgreSQL s dodatečnými funkcemi

#### Příklad pro Turso:

```bash
# Instalace Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

# Vytvoření databáze
turso db create skolni-trenink

# Získání URL
turso db show skolni-trenink --url
```

Upravte `prisma/schema.prisma` pro Turso:

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

### 4. Seedování produkční databáze

Po nasazení spusťte seed:

```bash
# Lokálně s produkční databází
DATABASE_URL="your-production-url" bun run db:push
DATABASE_URL="your-production-url" bun run db:seed
```

## Struktura projektu

```
├── prisma/
│   ├── schema.prisma    # Databázové schéma
│   └── seed.ts          # Inicializační data
├── src/
│   ├── app/
│   │   ├── api/         # API routes
│   │   ├── page.tsx     # Hlavní stránka
│   │   └── layout.tsx   # Layout
│   ├── components/
│   │   └── ui/          # shadcn/ui komponenty
│   ├── lib/
│   │   └── db.ts        # Prisma client
│   └── store/
│       └── useAppStore.ts  # Zustand store
└── package.json
```

## Přidání nového modulu

1. Upravte `prisma/seed.ts` a přidejte nový modul
2. Vytvořte API endpoint pro generování otázek v `/api/tests/generate/route.ts`
3. Modul se automaticky zobrazí v dashboardu

## Licence

MIT
