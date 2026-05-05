# POLOTENCE — Deploy Guide

## Локальный запуск

```bash
cd /Users/adamcubb/Desktop/cloude/POLOTENCE/website
export PATH="$HOME/.local/opt/node/bin:$PATH"   # если Node поставлен через tarball
cp .env.local.example .env.local                # затем заполнить ключи
npm run dev
```

Сайт откроется на http://localhost:3000.

## Что нужно настроить перед прод-деплоем

### 1. ЮКасса (https://yookassa.ru)

1. Зарегистрируй магазин (юр. лицо: ИП Кюльмялуома Э.А., ИНН 100128976705)
2. В админке → **Интеграция → API-ключи** — создай боевые ключи
3. Запиши `Shop ID` и `Secret Key`
4. **Подключение онлайн-кассы** — обязательно по 54-ФЗ:
   - Либо через ЮKassa-кассу (15 ₽/чек)
   - Либо своя касса (АТОЛ, Эвотор) с интеграцией
   - Либо самозанятый-режим (если перешёл с ИП на НПД)
   - В `lib/yookassa.ts` раскомментируй блок `receipt:` после подключения
5. **Webhook** в админке ЮКасса → **Уведомления (HTTP)**:
   - URL: `https://polotence.ru/api/yookassa-webhook`
   - События: `payment.succeeded`, `payment.canceled`

### 2. Resend (https://resend.com)

1. Зарегистрируйся, бесплатный план 3000 писем/мес
2. Подтверди свой домен (`polotence.ru`) для отправки
3. Создай API-ключ в **API Keys**
4. Запиши `RESEND_API_KEY` и `RESEND_FROM_EMAIL` (e.g. `orders@polotence.ru`)

### 3. Деплой на Vercel

```bash
cd website
npm install -g vercel
vercel login
vercel              # первый деплой → preview
vercel --prod       # деплой в прод
```

В **Vercel Dashboard → Settings → Environment Variables** добавь:
- `NEXT_PUBLIC_SITE_URL` = `https://polotence.ru` (или твой домен)
- `YOOKASSA_SHOP_ID`
- `YOOKASSA_SECRET_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_ADMIN_EMAIL`

### 4. Подключение домена

- В Vercel Dashboard → **Settings → Domains** → добавь `polotence.ru`
- Vercel покажет DNS-записи (A или CNAME) — пропиши их у регистратора домена
- SSL выпустится автоматически
- В `.env` обнови `NEXT_PUBLIC_SITE_URL`

## Архитектура файлов

```
website/
├── app/
│   ├── layout.tsx                    # root layout, Inter font, RU metadata
│   ├── page.tsx                      # главная (composes 9 sections)
│   ├── globals.css                   # design tokens (Visual DNA)
│   ├── sitemap.ts / robots.ts        # SEO
│   ├── checkout/
│   │   ├── page.tsx                  # форма заказа
│   │   ├── checkout-form.tsx         # client form
│   │   └── success/page.tsx          # после оплаты
│   ├── legal/
│   │   ├── oferta/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── delivery/page.tsx
│   │   └── return/page.tsx
│   └── api/
│       ├── create-payment/route.ts   # POST → ЮКасса → confirmation_url
│       └── yookassa-webhook/route.ts # ←ЮКасса POST notifications
├── components/
│   ├── ui/                           # Button, Badge, SectionLabel
│   └── sections/                     # 9 sections + Nav + Footer
├── lib/
│   ├── utils.ts                      # cn(), formatPrice()
│   ├── product.ts                    # static product data, FAQ, USPs
│   ├── yookassa.ts                   # ЮКасса API client
│   └── email.ts                      # Resend wrapper
└── public/assets/                    # symlinks to ../../assets/final/
```

## TODO после первой продажи

- [ ] Добавить аналитику (Plausible / Yandex.Metrika)
- [ ] OG-image 1200×630 в `public/og.png`
- [ ] Custom favicon (заменить дефолтный `app/favicon.ico`)
- [ ] Сохранение заказов в БД (сейчас в `console.log`) — Vercel KV или Supabase
- [ ] Промо-коды и скидочные купоны
- [ ] Multi-SKU поддержка (когда появится pack-of-2 / pack-of-6)
- [ ] Виджет ЮКасса вместо redirect (если хочется встроенную форму)
- [ ] Receipt-блок ФЗ-54 (раскомментировать в `lib/yookassa.ts`)
