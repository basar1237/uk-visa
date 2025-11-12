# Google'da Ön Sıraya Çıkmak İçin Rehber

## 1. Google Ads (Ücretli Reklamlar) - Hızlı Sonuç

### Adım 1: Google Ads Hesabı Oluşturun
1. https://ads.google.com adresine gidin
2. Hesap oluşturun
3. Ödeme bilgilerinizi ekleyin

### Adım 2: İlk Kampanyanızı Oluşturun
1. **Kampanya Türü:** "Arama" (Search Campaign)
2. **Hedef:** Web sitesi trafiği artırma
3. **Bütçe:** Günlük bütçe belirleyin (örn: £50/gün)
4. **Anahtar Kelimeler:** 
   - UK visa application
   - UK immigration lawyer
   - UK visa help
   - Spouse visa UK
   - Work visa UK
   - vb.

### Adım 3: Conversion Tracking Kurulumu
1. Google Ads > Tools > Conversions
2. Yeni conversion action oluşturun
3. Conversion ID'yi alın (örn: AW-XXXXXXXXX)
4. `.env` dosyasına ekleyin:
   ```
   NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX
   ```

### Adım 4: Conversion Label Oluşturun
1. Her conversion için bir label oluşturun:
   - Form gönderimi: `FormSubmission`
   - Telefon araması: `PhoneCall`
   - Randevu: `Appointment`
2. Bu label'ları form submit butonlarına ekleyin

## 2. SEO (Organik Arama) - Uzun Vadeli

### Yapılan Optimizasyonlar:
✅ Google Analytics entegrasyonu
✅ Structured Data (Schema.org) eklendi
✅ Sitemap otomatik oluşturuluyor
✅ Robots.txt eklendi
✅ Meta tags optimize edildi

### Yapmanız Gerekenler:

#### 1. Google Search Console Kurulumu
1. https://search.google.com/search-console
2. Site ekleyin
3. Doğrulama yapın (meta tag veya HTML dosyası ile)
4. Sitemap'i gönderin: `https://siteniz.com/sitemap.xml`

#### 2. İçerik Optimizasyonu
- **Başlıklar:** Her sayfada H1, H2 başlıkları kullanın
- **Anahtar Kelimeler:** Doğal şekilde içeriğe yerleştirin
- **Meta Descriptions:** Her sayfa için açıklayıcı meta description
- **Alt Text:** Tüm görsellere alt text ekleyin

#### 3. Backlink Oluşturma
- İngiltere'deki diğer web sitelerinden link alın
- Sosyal medya hesaplarınızda paylaşın
- İş ortağı web sitelerinden link alın

#### 4. Yerel SEO
- Google Business Profile oluşturun
- Yerel dizinlere kayıt olun
- Müşteri yorumları toplayın

## 3. Conversion Tracking Kullanımı

Form gönderimlerinde conversion tracking eklemek için:

```typescript
import { trackGoogleAdsConversion } from '@/components/GoogleAds'

// Form submit olduğunda:
trackGoogleAdsConversion('AW-XXXXXXXXX', 'FormSubmission', 100, 'GBP')
```

## 4. Önerilen İlk Adımlar

1. ✅ Google Analytics kuruldu
2. ⬜ Google Search Console'a kayıt olun
3. ⬜ Google Ads hesabı oluşturun
4. ⬜ İlk kampanyayı başlatın (£100-200 test bütçesi ile)
5. ⬜ Conversion tracking kurulumu yapın
6. ⬜ Sitemap'i Google'a gönderin

## 5. Bütçe Önerileri

- **Başlangıç:** £50-100/gün (test için)
- **Orta Seviye:** £100-300/gün
- **Yoğun Dönem:** £300-1000/gün

**ROAS (Return on Ad Spend) Hedefi:** En az 3:1 (her £1 harcamaya karşı £3 gelir)

## 6. İzlemeniz Gereken Metrikler

- **CTR (Click-Through Rate):** %2-5 arası ideal
- **Conversion Rate:** %2-5 arası ideal
- **Cost per Click (CPC):** £2-10 arası (anahtar kelimeye göre değişir)
- **Quality Score:** 7/10 ve üzeri ideal

## İpuçları

1. **Negatif Anahtar Kelimeler:** Gereksiz tıklamaları önlemek için ekleyin
2. **A/B Testing:** Farklı reklam metinlerini test edin
3. **Landing Page Optimizasyonu:** Reklamlara özel sayfalar oluşturun
4. **Zamanlama:** Aktif saatlerde daha fazla bütçe ayırın
5. **Lokasyon:** Sadece UK'de gösterim yapın

## Destek

Daha fazla bilgi için:
- Google Ads Yardım: https://support.google.com/google-ads
- Google Search Central: https://developers.google.com/search
