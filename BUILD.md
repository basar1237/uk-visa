# UK Visa Solutions - Komut Rehberi

## 🚀 Geliştirme Komutları

### Temel Geliştirme
```bash
# Development server başlat - Hot reload ile geliştirme
pnpm dev

# Production build - Optimize edilmiş build oluştur
pnpm build

# Production server başlat - Build edilmiş projeyi çalıştır
pnpm start

# Development + Production build - Dev modunda build al
pnpm dev:prod
```

## 🧪 Test Komutları

### Tüm Testler
```bash
# Tüm testleri çalıştır (Integration + E2E) - Backend + Frontend testleri
pnpm test
```

### Integration Testleri
```bash
# Sadece API/Backend testleri - Database ve Payload CMS testleri
pnpm test:int
```

### E2E Testleri
```bash
# Sadece Frontend testleri - Browser otomasyonu ile UI testleri
pnpm test:e2e

# E2E test raporu aç - Test sonuçlarını HTML olarak görüntüle
pnpm exec playwright show-report

# Farklı port ile rapor aç - Port çakışması durumunda
pnpm exec playwright show-report --port 9324
```

## 🔧 Payload CMS Komutları

### Type Generation
```bash
# Payload tiplerini oluştur - TypeScript tiplerini günceller
pnpm generate:types
# veya
pnpm payload generate:types

# Import map oluştur - Admin panel için import optimizasyonu
pnpm generate:importmap
# veya
pnpm payload generate:importmap

# Database schema oluştur - Schema'yı database'den oluştur
pnpm payload generate:db-schema
```

### Payload CLI
```bash
# Payload komutları - CLI erişimi
pnpm payload

# Payload bilgileri - Sistem bilgilerini göster
pnpm payload info

# Payload server çalıştır - Standalone server
pnpm payload run

# Migration oluştur - Database schema değişiklikleri için
pnpm payload migrate:create

# Migration çalıştır - Database güncellemelerini uygula
pnpm payload migrate

# Migration durumu - Hangi migration'lar çalıştı
pnpm payload migrate:status

# Migration geri al - Son migration'ı geri al
pnpm payload migrate:down

# Migration yenile - Tüm migration'ları yeniden çalıştır
pnpm payload migrate:refresh

# Migration sıfırla - Tüm migration'ları geri al
pnpm payload migrate:reset

# Migration temizle - Database'i sıfırla ve migration'ları çalıştır
pnpm payload migrate:fresh

# Database schema oluştur - Schema'yı database'den oluştur
pnpm payload generate:db-schema

# Job'ları çalıştır - Scheduled job'ları manuel çalıştır
pnpm payload jobs:run

# Schedule'ları işle - Zamanlanmış işleri işle
pnpm payload jobs:handle-schedules
```

## 📦 Package Yönetimi

### Kurulum
```bash
# Dependencies yükle - package.json'daki paketleri kur
pnpm install

# Workspace ignore ile yükle - Workspace bağımlılıklarını atla
pnpm ii

# Tam yeniden kurulum - node_modules ve lock dosyasını sil, yeniden kur
pnpm reinstall
```

## 🧹 Code Quality

### Linting
```bash
# Code linting - Kod kalitesi kontrolü
pnpm lint

# Linting + otomatik düzeltme - Düzeltilebilir hataları otomatik düzelt
pnpm lint:fix
```

## 🚀 Deployment

### Build & Deploy
```bash
# Production build - Optimize edilmiş production build
pnpm build

# Sitemap oluştur (post-build) - SEO için sitemap.xml oluştur
pnpm postbuild

# Deployment kontrolü - Deploy öncesi kontroller
pnpm check:deployment
```

## 🐳 Docker

### Docker Komutları
```bash
# Docker container başlat - Database ve servisleri başlat
docker-compose up

# Docker container durdur - Tüm container'ları durdur
docker-compose down

# Docker build - Docker image oluştur
docker build .
```

## 🔍 Debug & Monitoring

### Logs & Debug
```bash
# Development server (debug mode)
cross-env NODE_OPTIONS=--no-deprecation pnpm dev

# Test (debug mode)
cross-env NODE_OPTIONS=--no-deprecation pnpm test

# E2E test (debug mode)
cross-env NODE_OPTIONS="--no-deprecation --no-experimental-strip-types" pnpm test:e2e
```

## 📁 Dosya Yolları

### Test Dosyaları
```
tests/
├── int/
│   └── api.int.spec.ts          # API testleri
└── e2e/
    └── frontend.e2e.spec.ts     # Frontend testleri
```

### Konfigürasyon Dosyaları
```
vitest.config.mts                # Vitest konfigürasyonu
playwright.config.ts             # Playwright konfigürasyonu
vitest.setup.ts                  # Test setup
```

### Build Çıktıları
```
.next/                           # Next.js build
test-results/                    # Test sonuçları
playwright-report/               # E2E test raporu
```

## 🌐 URL'ler

### Development
```
http://localhost:3000            # Frontend
http://localhost:3000/admin      # Payload CMS Admin
```

### Test Raporları
```
http://localhost:9323            # Playwright rapor (default)
http://localhost:9324            # Playwright rapor (alternatif)
```

## ⚡ Hızlı Komutlar

### Günlük Geliştirme
```bash
# Projeyi başlat
pnpm dev

# Test çalıştır
pnpm test

# Build al
pnpm build
```

### Sorun Giderme
```bash
# Cache temizle + yeniden kur
pnpm reinstall

# Test timeout artır (gerekirse)
# vitest.config.mts dosyasında hookTimeout: 30000

# Playwright browser yükle
pnpm exec playwright install
```

## 🎯 Environment Variables

### Gerekli .env Dosyası
```bash
# Database
DATABASE_URI=postgresql://...

# Payload
PAYLOAD_SECRET=your-secret

# Vercel
BLOB_READ_WRITE_TOKEN=your-token
CRON_SECRET=your-cron-secret
```

## 📊 Test Coverage

### Test Türleri
- **Integration Tests**: API, Database, Payload CMS
- **E2E Tests**: Frontend, User flows, UI components

### Test Komutları Özeti
```bash
pnpm test        # Tüm testler
pnpm test:int    # Backend testleri  
pnpm test:e2e    # Frontend testleri
```
