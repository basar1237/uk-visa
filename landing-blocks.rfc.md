# Landing Blocks RFC

## Amaç
Bu doküman, **Landing Page Builder** sisteminin temelini tanımlar.  
Amaç, her sayfada hero alanı ve modüler bileşenlerden oluşan dinamik, yeniden kullanılabilir ve esnek bir yapıyı tanımlamaktır.  
Bu sistem ile toplamda 40’tan fazla landing sayfa oluşturulabilecektir.

---

## Genel Yapı
Her landing page, sıralı bloklardan oluşur:
1. Hero Alanı  
2. İsteğe bağlı içerik blokları (Box Grid, Feature Block, Rich Text, vb.)  
3. Opsiyonel Section Separator  
4. SEO / Meta alanları  

Her blok bağımsız olarak yönetilebilir, görünürlük ve düzen seçeneklerine sahiptir.

---

## 1. Hero Alanı

### Özellikler
- **Media Type:** `image | video`
- **Background:** Resim veya video arka plan
- **Overlay Opacity:** Saydamlık oranı ayarlanabilir
- **Başlık (Title)**  
- **Alt Başlık (Subtitle)**  
- **Buton (CTA Button):**  
  - Text  
  - Link (URL)  
  - Buton görünümü opsiyoneldir (isteğe bağlı)
- **Visibility:** `all | desktop | mobile`

### Açıklama
Hero alanı her sayfanın görsel kimliğini oluşturur.  
Görsel veya video arka planlı olabilir. Overlay opaklığı her sayfa için değiştirilebilir.  
Buton eklendiğinde, buton hero alanında metnin altında konumlanır.

---

## 2. Kutular (Box Grid)

### Özellikler
- **Columns:** `2 | 3 | 4`
- **Box İçeriği:**
  - Görsel (Image)
  - Başlık (Title)
  - Açıklama (Description)
  - Opsiyonel Buton:
    - Text
    - Link (URL veya Dosya)
- **Arka Plan Rengi:** `backgroundColor`
- **Link Türü:** `linkType = url | file`
- **Visibility:** `all | desktop | mobile`

### Açıklama
Kutu alanları esnek şekilde yapılandırılabilir.  
2, 3 veya 4 kolonlu olabilir.  
Her kutuda isteğe bağlı olarak buton veya indirilebilir dosya bağlantısı yer alabilir.  
Buton, daima kutunun en altına hizalanır.  
Renk ve görünürlük ayarlarıyla her sayfa farklılaştırılabilir.

---

## 3. Büyük Görsel Alanı (Feature Block)

### Özellikler
- **Columns:** `2 | 3`
- **İçerik:**
  - Görsel (Image)
  - Başlık (Title)
  - Açıklama (Description)
  - Opsiyonel Buton (Text + Link)
- **Layout:** Normal veya `reverse` (görsel sağda/ solda)
- **Appearance (Animasyon):** `fade | slide | none`
- **Visibility:** `all | desktop | mobile`

### Açıklama
Feature Block, büyük görsel alanlar veya önemli içerik vurguları için kullanılır.  
Animasyon seçeneğiyle içerikler sayfa kaydırıldığında görsel olarak canlandırılabilir.  
Reverse seçeneği, sayfada görsel ve metin hizalamasını alternatörlü yapar.

---

## 4. Rich Text Alanı

### Özellikler
- **İçerik:** Rich Text Editor
- **Arka Plan:** `backgroundColor`
- **Metin Hizalaması:** `textAlignment = left | center | right`
- **Visibility:** `all | desktop | mobile`

### Açıklama
Tam serbest metin alanıdır.  
İçeriğe yazı, başlık, liste, bağlantı, vurgular gibi formatlamalar eklenebilir.  
Arka plan rengi ve hizalama seçenekleriyle her sayfa farklı bir düzen elde eder.

---

## 5. Section Separator

### Özellikler
- **Separator Type:** `none | wave | curve | line`
- **Color:** Varsayılan sayfa temasına göre değişir.

### Açıklama
Hero ile ilk içerik bloğu arasına yumuşak bir geçiş efekti ekler.  
Sayfalar arasında tasarımsal çeşitlilik sağlar.

---

## 6. SEO & Meta Alanları

### Özellikler
- **Meta Title**
- **Meta Description**
- **OG Image**

### Açıklama
Her landing sayfa için özel SEO verileri tanımlanabilir.  
Bu alanlar paylaşım ve indeksleme için gereklidir.

---

## 7. Visibility Mantığı

Tüm bloklar için görünürlük şu şekilde kontrol edilir:
- `all`: Her cihazda görünür.
- `desktop`: Sadece masaüstünde görünür.
- `mobile`: Sadece mobilde görünür.

Bu özellik, çok sayıda sayfa içinde farklı cihaz deneyimlerini yönetmeyi kolaylaştırır.

---

## 8. Global Block Reuse (Opsiyonel)

### Özellikler
- **Reusable Blocks:** Tek bir blok tanımı birden fazla sayfada kullanılabilir.
- **Reference Type:** “Block Reference” alanı üzerinden ilişkilendirilir.

### Açıklama
Aynı hero veya kutu setini birden fazla sayfada yeniden kullanma olanağı sunar.  
Bu özellik sistemin ölçeklenebilirliğini artırır, fakat yönetimi karmaşıklaştırabilir.  
İsteğe bağlı olarak aktif hale getirilebilir.

---

## 9. Görsel ve Tasarım Notları
- Tüm kartlar ve kutular `shadow-lg` ve `rounded-lg` stilinde görünmelidir.  
- Görseller responsive olmalı, yazılar her zaman okunabilir kontrastta bulunmalıdır.  
- Hero arka planı opaklıkla dengelenmelidir.  
- Mobil uyum: Kutular 2’li grid’e düşer, hero metinleri ortalanır.

---

## Sonuç

Bu RFC, 40’tan fazla landing sayfada tekrarlanabilir bir modüler yapı oluşturmayı hedefler.  
Sistem Payload CMS üzerinden yönetilecek ve her blok, kullanıcı tarafından dinamik olarak eklenebilir veya çıkarılabilir.  
Her sayfa benzersiz bir kombinasyonla oluşturulabilir, tasarım bütünlüğü korunur.
