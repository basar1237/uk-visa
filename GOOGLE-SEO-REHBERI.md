# Google'da "UK Immigration Helpline" İçin SEO Rehberi

Bu rehber, "uk immigration helpline" araması için Google'da ön plana çıkmak için yapmanız gereken tüm adımları içerir.

## 📋 İçindekiler

1. [Google Search Console Kurulumu](#1-google-search-console-kurulumu)
2. [Google Analytics Kurulumu](#2-google-analytics-kurulumu)
3. [Sitemap Gönderme](#3-sitemap-gönderme)
4. [Teknik SEO Optimizasyonu](#4-teknik-seo-optimizasyonu)
5. [İçerik Optimizasyonu](#5-içerik-optimizasyonu)
6. [Local SEO](#6-local-seo)
7. [Backlink Stratejisi](#7-backlink-stratejisi)
8. [Sosyal Medya Entegrasyonu](#8-sosyal-medya-entegrasyonu)
9. [Performans Optimizasyonu](#9-performans-optimizasyonu)
10. [İlerleme Takibi](#10-ilerleme-takibi)

---

## 1. Google Search Console Kurulumu

### 1.1 Google Search Console'a Kayıt

1. [Google Search Console](https://search.google.com/search-console) sayfasına gidin
2. Google hesabınızla giriş yapın
3. **"Özellik Ekle"** (Add Property) butonuna tıklayın
4. **"URL öneki"** (URL prefix) seçeneğini seçin
5. Domain'inizi girin: `https://ukimmigrationhelpline.com`
6. **Devam** butonuna tıklayın

### 1.2 Domain Doğrulama

Google size birkaç doğrulama yöntemi sunar:

#### Yöntem 1: HTML Etiketi (Önerilen)

1. Google Search Console size bir meta etiketi verecek, örneğin:
   ```html
   <meta name="google-site-verification" content="ABC123XYZ..." />
   ```

2. Vercel Environment Variables'a ekleyin:
   - Vercel Dashboard > Projeniz > Settings > Environment Variables
   - **Key**: `GOOGLE_SITE_VERIFICATION`
   - **Value**: Google'ın verdiği kod (content kısmındaki değer)
   - **Environment**: Production, Preview, Development (hepsine ekleyin)
   - **Save** butonuna tıklayın

3. Projeyi yeniden deploy edin:
   ```bash
   git commit --allow-empty -m "Add Google Search Console verification"
   git push
   ```

4. Google Search Console'da **"Doğrula"** (Verify) butonuna tıklayın

#### Yöntem 2: HTML Dosyası

1. Google size bir HTML dosyası indirmenizi ister
2. Bu dosyayı `public/` klasörüne koyun
3. Deploy edin
4. Google Search Console'da doğrulayın

#### Yöntem 3: DNS Kaydı

1. GoDaddy DNS panelinde TXT kaydı ekleyin
2. Google'ın verdiği TXT değerini girin
3. Google Search Console'da doğrulayın

### 1.3 Doğrulama Sonrası

Doğrulama başarılı olduktan sonra:
- Domain'iniz Google Search Console'da görünecek
- İndeksleme verilerini görmeye başlayacaksınız
- Hataları ve uyarıları takip edebileceksiniz

---

## 2. Google Analytics Kurulumu

### 2.1 Google Analytics Hesabı Oluşturma

1. [Google Analytics](https://analytics.google.com) sayfasına gidin
2. Hesap oluşturun (henüz yoksa)
3. **"Ölçüm"** (Measurement) > **"Özellik Oluştur"** (Create Property)
4. Özellik adı: `UK Immigration Helpline`
5. Zaman dilimi: `United Kingdom`
6. Para birimi: `GBP`
7. **"İleri"** butonuna tıklayın

### 2.2 Measurement ID Alma

1. **"Web"** seçeneğini seçin
2. Web sitesi URL'si: `https://ukimmigrationhelpline.com`
3. **"Oluştur"** butonuna tıklayın
4. **Measurement ID**'yi kopyalayın (örn: `G-XXXXXXXXXX`)

### 2.3 Vercel'e Environment Variable Ekleme

1. Vercel Dashboard > Projeniz > Settings > Environment Variables
2. **Key**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
3. **Value**: Google Analytics Measurement ID (örn: `G-XXXXXXXXXX`)
4. **Environment**: Production, Preview, Development
5. **Save** butonuna tıklayın

### 2.4 Deploy ve Test

1. Projeyi yeniden deploy edin
2. Tarayıcıda sitenizi açın
3. Google Analytics > **"Raporlar"** > **"Gerçek Zamanlı"** (Real-time)
4. Ziyaretçi görünüyorsa kurulum başarılı! ✅

---

## 3. Sitemap Gönderme

### 3.1 Sitemap URL'lerini Bulma

Projenizde otomatik sitemap'ler oluşturuluyor:
- `https://ukimmigrationhelpline.com/sitemap.xml` (Ana sitemap)
- `https://ukimmigrationhelpline.com/pages-sitemap.xml` (Sayfalar)
- `https://ukimmigrationhelpline.com/posts-sitemap.xml` (Blog yazıları)

### 3.2 Google Search Console'a Sitemap Gönderme

1. Google Search Console'da domain'inizi seçin
2. Sol menüden **"Sitemap'ler"** (Sitemaps) seçeneğine tıklayın
3. **"Yeni sitemap ekle"** (Add new sitemap) alanına şunu yazın:
   ```
   sitemap.xml
   ```
4. **"Gönder"** (Submit) butonuna tıklayın
5. Birkaç dakika içinde Google sitemap'i işlemeye başlayacak

### 3.3 Sitemap Durumunu Kontrol Etme

- **Başarılı**: Tüm sayfalar indeksleniyor
- **Hata**: Sitemap'te sorun var, kontrol edin
- **Uyarı**: Bazı sayfalar indekslenemiyor

---

## 4. Teknik SEO Optimizasyonu

### 4.1 robots.txt Kontrolü

Projenizde `robots.ts` dosyası var ve doğru yapılandırılmış:
- ✅ Admin paneli engellenmiş (`/admin/`)
- ✅ API endpoint'leri engellenmiş (`/api/`)
- ✅ Sitemap belirtilmiş

**Kontrol için:**
- `https://ukimmigrationhelpline.com/robots.txt` adresini ziyaret edin
- Google Search Console > **"Ayarlar"** > **"robots.txt Test Edici"** kullanın

### 4.2 Meta Tags Optimizasyonu

Projenizde zaten iyi meta tag'ler var, ancak şunları kontrol edin:

**Ana Sayfa (layout.tsx):**
- ✅ Title: "UK Immigration Helpline - Expert Visa & Immigration Services"
- ✅ Description: "Expert UK immigration and visa services..."
- ✅ Keywords: "UK immigration", "UK visa", "UK immigration helpline"
- ✅ Open Graph tags mevcut
- ✅ Twitter Card tags mevcut

**Öneriler:**
- Her sayfa için benzersiz title ve description kullanın
- Title 50-60 karakter arasında olmalı
- Description 150-160 karakter arasında olmalı
- "UK Immigration Helpline" kelimesini title'da kullanın

### 4.3 Structured Data (Schema.org)

Projenizde `StructuredData` component'i var. Şunları ekleyin:

**Organization Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "UK Immigration Helpline",
  "url": "https://ukimmigrationhelpline.com",
  "logo": "https://ukimmigrationhelpline.com/new-logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+44-XXX-XXX-XXXX",
    "contactType": "customer service"
  }
}
```

**LocalBusiness Schema (Sheffield için):**
```json
{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "UK Immigration Helpline",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Sheffield",
    "addressCountry": "GB"
  }
}
```

### 4.4 H1, H2, H3 Başlık Yapısı

- Her sayfada **sadece bir tane H1** olmalı
- H1'de "UK Immigration Helpline" veya ilgili anahtar kelime kullanın
- H2, H3 başlıkları mantıklı bir hiyerarşi oluşturmalı
- Başlıklarda anahtar kelimeleri doğal şekilde kullanın

### 4.5 URL Yapısı

- ✅ URL'ler temiz ve anlaşılır: `/about`, `/contact`, `/eligibility-check`
- ✅ Alt çizgi yerine tire kullanılıyor
- ✅ Küçük harf kullanılıyor
- ✅ Türkçe karakter yok

**Örnek iyi URL'ler:**
- `/uk-visa-services`
- `/immigration-advice`
- `/visa-consultation`

---

## 5. İçerik Optimizasyonu

### 5.1 Ana Sayfa İçeriği

Ana sayfada şu anahtar kelimeleri kullanın:
- "UK Immigration Helpline" (en az 3-4 kez)
- "UK visa services"
- "immigration lawyer"
- "visa consultation"
- "UK immigration advice"

**İçerik Önerileri:**
- 500-1000 kelime arası içerik
- Anahtar kelimeleri doğal şekilde kullanın (keyword stuffing yapmayın)
- Kullanıcı sorularına cevap veren içerik
- Call-to-action (CTA) butonları ekleyin

### 5.2 Blog İçeriği (Posts)

**Hedef Anahtar Kelimeler:**
- "UK immigration helpline"
- "UK visa application"
- "UK visa requirements"
- "UK immigration lawyer"
- "UK visa advice"

**Blog Yazısı Başlıkları Örnekleri:**
1. "Complete Guide to UK Visa Applications - UK Immigration Helpline"
2. "How to Apply for UK Settlement Visa - Expert Advice"
3. "UK Immigration Helpline: Your Questions Answered"
4. "Top 10 UK Visa Mistakes to Avoid - Immigration Lawyer Tips"

**Her blog yazısı için:**
- En az 1000 kelime
- Görseller ekleyin (alt text ile)
- İç linkler ekleyin (diğer sayfalara)
- Meta description yazın
- H1, H2, H3 yapısı kullanın

### 5.3 FAQ Sayfası

"UK Immigration Helpline" ile ilgili sık sorulan sorular:

**Örnek Sorular:**
- "What is UK Immigration Helpline?"
- "How can UK Immigration Helpline help me?"
- "Is UK Immigration Helpline a registered immigration service?"
- "How much does UK Immigration Helpline charge?"

### 5.4 İç Linkleme Stratejisi

- Ana sayfadan önemli sayfalara link verin
- Blog yazılarından ilgili sayfalara link verin
- Footer'da önemli sayfalara link verin
- "UK Immigration Helpline" kelimesini anchor text olarak kullanın

---

## 6. Local SEO

### 6.1 Google Business Profile

1. [Google Business Profile](https://www.google.com/business/) sayfasına gidin
2. İşletmenizi ekleyin:
   - İşletme adı: **UK Immigration Helpline**
   - Kategori: **Immigration Lawyer** veya **Legal Service**
   - Adres: Sheffield, UK (gerçek adresiniz)
   - Telefon: İletişim numaranız
   - Website: `https://ukimmigrationhelpline.com`
3. Doğrulama yapın (posta veya telefon ile)
4. Fotoğraflar ekleyin
5. Müşteri yorumları toplayın

### 6.2 Local Keywords

İçeriklerde şu local keyword'leri kullanın:
- "UK Immigration Helpline Sheffield"
- "Immigration lawyer Sheffield"
- "UK visa services Sheffield"
- "Immigration advice UK"

### 6.3 NAP (Name, Address, Phone)

Tüm sayfalarda tutarlı şekilde:
- **Name**: UK Immigration Helpline
- **Address**: Sheffield, United Kingdom
- **Phone**: +44-XXX-XXX-XXXX

### 6.4 Local Schema Markup

Sheffield için LocalBusiness schema ekleyin (yukarıdaki Structured Data bölümüne bakın).

---

## 7. Backlink Stratejisi

### 7.1 Backlink Kaynakları

**Yüksek Kaliteli Backlink'ler:**
1. **Immigration forum'ları**: UK immigration forum'larında profil oluşturun
2. **Legal directory'ler**: Avukat dizinlerine kayıt olun
3. **Guest posting**: İlgili blog'larda misafir yazı yazın
4. **Press release**: Basın bülteni yayınlayın
5. **Social media**: LinkedIn, Twitter, Facebook'ta aktif olun

### 7.2 Anchor Text Çeşitliliği

Backlink'lerde farklı anchor text'ler kullanın:
- "UK Immigration Helpline"
- "UK visa services"
- "immigration lawyer"
- "visa consultation"
- "ukimmigrationhelpline.com"

### 7.3 İçerik Pazarlama

- Değerli içerikler oluşturun (rehberler, kılavuzlar)
- İnfografikler paylaşın
- Video içerikler oluşturun
- Bu içerikler doğal backlink çekecektir

---

## 8. Sosyal Medya Entegrasyonu

### 8.1 Sosyal Medya Hesapları

Şu platformlarda hesap oluşturun:
- **LinkedIn**: UK Immigration Helpline
- **Twitter/X**: @ukimmigrationhelpline
- **Facebook**: UK Immigration Helpline
- **Instagram**: @ukimmigrationhelpline

### 8.2 Sosyal Medya Optimizasyonu

- Profil resimlerinde logo kullanın
- Bio'da "UK Immigration Helpline" ve website linki olsun
- Düzenli içerik paylaşın
- Website'den sosyal medyaya link verin
- Sosyal medyadan website'e trafik çekin

### 8.3 Open Graph Tags

Projenizde zaten Open Graph tags var, ancak şunları kontrol edin:
- `og:title`: Her sayfa için benzersiz
- `og:description`: Çekici açıklamalar
- `og:image`: 1200x630px görseller
- `og:url`: Doğru URL'ler

---

## 9. Performans Optimizasyonu

### 9.1 Page Speed

Google PageSpeed Insights ile test edin:
1. [PageSpeed Insights](https://pagespeed.web.dev/) sayfasına gidin
2. `https://ukimmigrationhelpline.com` adresini girin
3. Sonuçları kontrol edin
4. **Hedef**: 90+ skor (mobil ve desktop)

**Optimizasyon Önerileri:**
- Görselleri optimize edin (WebP formatı kullanın)
- Lazy loading ekleyin
- CSS ve JavaScript'i minify edin
- CDN kullanın (Vercel otomatik sağlıyor)

### 9.2 Mobile-Friendly

- Responsive tasarım kontrol edin
- Google Mobile-Friendly Test: [test sayfası](https://search.google.com/test/mobile-friendly)
- Touch target'lar yeterince büyük olmalı (48x48px)

### 9.3 Core Web Vitals

Google'ın önem verdiği metrikler:
- **LCP (Largest Contentful Paint)**: < 2.5 saniye
- **FID (First Input Delay)**: < 100 ms
- **CLS (Cumulative Layout Shift)**: < 0.1

Vercel Analytics veya Google Search Console'da bu metrikleri takip edin.

---

## 10. İlerleme Takibi

### 10.1 Google Search Console'da Takip

**Önemli Metrikler:**
- **Tıklanma sayısı** (Clicks)
- **Görüntülenme** (Impressions)
- **CTR** (Click-Through Rate)
- **Ortalama pozisyon** (Average Position)

**Hedef:**
- "uk immigration helpline" araması için ilk 3 sayfada olmak
- Zamanla ilk sayfaya çıkmak

### 10.2 Google Analytics'te Takip

**Önemli Metrikler:**
- Organik trafik artışı
- Hangi sayfalar en çok ziyaret ediliyor
- Kullanıcı davranışları
- Conversion rate

### 10.3 Anahtar Kelime Takibi

**Araçlar:**
- Google Search Console (ücretsiz)
- Google Keyword Planner (ücretsiz)
- Ahrefs (ücretli)
- SEMrush (ücretli)

**Takip Edilecek Anahtar Kelimeler:**
1. "uk immigration helpline"
2. "uk immigration helpline services"
3. "uk visa helpline"
4. "immigration lawyer uk"
5. "uk visa consultation"

### 10.4 Aylık Rapor

Her ay şunları kontrol edin:
- Google Search Console raporu
- Google Analytics raporu
- Backlink sayısı
- Sosyal medya etkileşimleri
- Organik trafik artışı

---

## 🎯 Hızlı Başlangıç Checklist

### İlk Hafta
- [ ] Google Search Console kurulumu ve doğrulama
- [ ] Google Analytics kurulumu
- [ ] Sitemap gönderme
- [ ] robots.txt kontrolü
- [ ] Meta tags kontrolü

### İlk Ay
- [ ] Google Business Profile oluşturma
- [ ] 5-10 blog yazısı yayınlama
- [ ] FAQ sayfası oluşturma
- [ ] Sosyal medya hesapları açma
- [ ] İlk backlink'leri toplama

### İlk 3 Ay
- [ ] Düzenli blog içeriği (haftada 2-3 yazı)
- [ ] Backlink kampanyası
- [ ] Local SEO optimizasyonu
- [ ] Performans optimizasyonu
- [ ] İlerleme takibi ve raporlama

---

## 📊 Beklenen Sonuçlar

**3 Ay Sonra:**
- "uk immigration helpline" için Google'da 3-5. sayfada görünme
- Aylık 500-1000 organik ziyaretçi

**6 Ay Sonra:**
- "uk immigration helpline" için Google'da 1-2. sayfada görünme
- Aylık 2000-5000 organik ziyaretçi

**12 Ay Sonra:**
- "uk immigration helpline" için Google'da ilk 3 sırada olma
- Aylık 10000+ organik ziyaretçi

**Not:** Sonuçlar içerik kalitesi, backlink sayısı ve rekabet seviyesine göre değişebilir.

---

## 🔧 Teknik Kontrol Listesi

### Environment Variables (Vercel)

Şu environment variable'ları eklediğinizden emin olun:

```bash
# Google Search Console
GOOGLE_SITE_VERIFICATION=your-verification-code

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Dosya Kontrolleri

- [ ] `robots.txt` doğru yapılandırılmış
- [ ] `sitemap.xml` çalışıyor
- [ ] Meta tags her sayfada var
- [ ] Open Graph tags mevcut
- [ ] Structured Data (Schema) eklenmiş

---

## 📞 Yardım ve Destek

**Sorun yaşarsanız:**
- Google Search Console Yardım: [support.google.com/webmasters](https://support.google.com/webmasters)
- Google Analytics Yardım: [support.google.com/analytics](https://support.google.com/analytics)
- SEO Community: [r/SEO](https://www.reddit.com/r/SEO/)

---

## 📚 Ek Kaynaklar

- [Google Search Central](https://developers.google.com/search)
- [Google Search Console Yardım](https://support.google.com/webmasters)
- [Moz SEO Beginner's Guide](https://moz.com/beginners-guide-to-seo)
- [Ahrefs SEO Blog](https://ahrefs.com/blog/)

---

**Son Güncelleme**: 2025

**Not**: SEO uzun vadeli bir süreçtir. Sabırlı olun ve düzenli içerik üretmeye devam edin. Sonuçlar 3-6 ay içinde görülmeye başlar.

