# Multi-stage build pro optimalizaci velikosti image

# Stage 1: Dependencies
FROM oven/bun:1 AS deps
WORKDIR /app

# Kopírování package souborů
COPY package.json bun.lock ./
COPY prisma ./prisma/

# Instalace závislostí
RUN bun install --frozen-lockfile

# Stage 2: Builder
FROM oven/bun:1 AS builder
WORKDIR /app

# Kopírování závislostí z předchozí stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generování Prisma klienta
RUN bunx prisma generate

# Build Next.js aplikace
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN bun run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Vytvoření non-root uživatele pro bezpečnost
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Instalace bun pro seedování a prisma pro migrace
RUN npm install -g bun prisma

# Kopírování potřebných souborů
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Kopírování seed skriptu
COPY --from=builder /app/prisma/seed.ts ./prisma/seed.ts

# Vytvoření adresáře pro databázi
RUN mkdir -p /app/data

# Kopírování a nastavení entrypoint skriptu
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Změna vlastníka souborů
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV DATABASE_URL="file:/app/data/skolni-trenink.db"

ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["node", "server.js"]
