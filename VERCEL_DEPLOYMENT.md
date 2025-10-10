# Vercel Deployment Rehberi - Admin Dashboard Boş Ekran Çözümü

## Sorun
Production'da admin dashboard'ı açıldığında boş ekran görünüyor.

## Çözüm Adımları

### 1. Vercel Environment Variables Kontrolü

Vercel dashboard'unuzda **Settings > Environment Variables** bölümüne gidin ve şu değişkenlerin **Production, Preview ve Development** için ayarlandığından emin olun:

#### Gerekli Environment Variables:

```bash
# Database (Zorunlu)
DATABASE_URI=postgresql://user:password@host:5432/database

# Payload Secret (Zorunlu)
PAYLOAD_SECRET=your-secret-key-minimum-32-characters

# Vercel Blob Storage (Zorunlu - media uploads için)
BLOB_READ_WRITE_TOKEN=vercel_blob_token

# Server URL (Önemli!)
NEXT_PUBLIC_SERVER_URL=https://your-domain.vercel.app

# Node Options (Önerilen)
NODE_OPTIONS=--no-deprecation

# Cron Secret (Opsiyonel - scheduled jobs için)
CRON_SECRET=your-cron-secret
```

### 2. Build Settings Kontrolü

Vercel Project Settings > Build & Development Settings:

- **Framework Preset**: Next.js
- **Build Command**: `pnpm build` (varsayılan)
- **Output Directory**: `.next` (varsayılan)
- **Install Command**: `pnpm install` (varsayılan)

### 3. Node.js Version

Vercel Project Settings > General:

- **Node.js Version**: 20.x veya üzeri olmalı

### 4. Yeniden Deploy

Environment variables'ları ekledikten/güncelledikten sonra:

1. Vercel dashboard'dan "Redeploy" butonuna tıklayın
2. **ÖNEMLİ**: "Use existing Build Cache" seçeneğini **KAPATIN** (uncheck)
3. Deploy'u başlatın

### 5. Build Logs Kontrolü

Deploy sırasında build logs'u kontrol edin:

- ✅ `Linting and checking validity of types` başarılı olmalı
- ✅ `Compiling Client (initial)` başarılı olmalı  
- ✅ `Collecting page data` başarılı olmalı
- ✅ `Generating static pages` tamamlanmalı

Hata varsa logs'da göreceksiniz.

### 6. Admin Panel Erişimi

Deploy tamamlandıktan sonra:

```
https://your-domain.vercel.app/admin
```

URL'ine giderek admin panel'e erişmeyi deneyin.

## Yaygın Sorunlar ve Çözümleri

### Sorun 1: Blank Screen / Beyaz Ekran

**Nedeni**: Environment variables eksik veya yanlış

**Çözüm**:
- Vercel'de tüm environment variables'ların ayarlandığını kontrol edin
- `NEXT_PUBLIC_SERVER_URL` mutlaka `https://` ile başlamalı
- Redeploy yaparken build cache'i temizleyin

### Sorun 2: 500 Internal Server Error

**Nedeni**: Database bağlantı sorunu

**Çözüm**:
- `DATABASE_URI` doğru formatta olmalı: `postgresql://user:password@host:port/database`
- Database'in Vercel'den erişilebilir olduğundan emin olun
- SSL bağlantısı gerekliyse, URL sonuna `?sslmode=require` ekleyin

### Sorun 3: "Payload Secret is required"

**Nedeni**: `PAYLOAD_SECRET` eksik veya çok kısa

**Çözüm**:
- En az 32 karakter uzunluğunda bir secret oluşturun
- Güvenli bir random string kullanın

### Sorun 4: Media Upload Çalışmıyor

**Nedeni**: Vercel Blob Storage token eksik

**Çözüm**:
- Vercel dashboard'dan Blob Storage'ı etkinleştirin (Storage tab)
- `BLOB_READ_WRITE_TOKEN` environment variable otomatik oluşturulacak

## Hızlı Test

Deploy sonrası şu endpoint'leri test edin:

```bash
# 1. Ana sayfa çalışıyor mu?
curl https://your-domain.vercel.app

# 2. Admin sayfası yükleniyor mu?
curl -I https://your-domain.vercel.app/admin

# 3. API çalışıyor mu?
curl https://your-domain.vercel.app/api/pages
```

## Local'de Test

Production sorunlarını local'de test etmek için:

```bash
# 1. Environment variables'ı ayarlayın (.env.local dosyası oluşturun)
# 2. Production mode'da build yapın:
pnpm build

# 3. Production server'ı başlatın:
pnpm start

# 4. Test edin:
# http://localhost:3000/admin
```

## Destek

Hala sorun devam ediyorsa:

1. **Vercel Logs**: Vercel dashboard'da runtime logs'u kontrol edin
2. **Browser Console**: F12 ile console'da JavaScript hataları kontrol edin
3. **Network Tab**: F12 > Network tab'de failed requests kontrol edin

## Son Kontrol Listesi

- [ ] `DATABASE_URI` ayarlandı mı?
- [ ] `PAYLOAD_SECRET` ayarlandı mı (min 32 karakter)?
- [ ] `BLOB_READ_WRITE_TOKEN` ayarlandı mı?
- [ ] `NEXT_PUBLIC_SERVER_URL` doğru domain ile ayarlandı mı?
- [ ] Environment variables **Production** environment'a eklendi mi?
- [ ] Build cache temizlenerek yeniden deploy yapıldı mı?
- [ ] Deploy başarılı oldu mu (yeşil check)?
- [ ] Build logs'da hata yok mu?

Tüm bunlar tamamsa admin dashboard çalışıyor olmalı! 🎉

