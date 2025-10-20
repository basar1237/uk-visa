# RFC: İngilizce Dil Testi Sayfaları

## Yazar
Başar Yıldırım

## Tarih
20 Ekim 2025

## Durum
Taslak (Draft)

---

## Genel Bakış
Bu RFC, **İngilizce Dil Testi sayfalarının** tasarımı ve uygulanmasını kapsar.  
Site teknolojisi: **Next.js, React, TypeScript.

Amaç: Kullanıcıların  
1. İngilizce testini interaktif olarak yapabilmesi,  
2. Cevapları gönderdikten sonra CEFR seviyesini (A1, A2, B1, B2, C1) görmesi,  
sorular hepsı kod sayfalarında statık olarak olacak 
 
---

## Motivasyon
- Şu an sitenin İngilizce test bölümü yalnızca statik bilgi veriyor.  
- Kullanıcıların kendi seviyesini test edebilmesi, siteye etkileşim ve değer katar.  
- Danışmanlık hizmetlerinin daha profesyonel ve kullanıcı dostu görünmesini sağlar. 

---

## Gereksinimler

### Fonksiyonel Gereksinimler
1. **Dinamik Test Sayfası**
    - Her soru, seçilen cevaba göre puan alacak.

2. **Sonuç Hesaplama**
   - Toplam puan hesaplanacak.
   - CEFR seviyesi puana göre belirlenecek:
     - 0–4 → A1
     - 5–6 → A2
     - 7–8 → B1
     - 9 → B2
     - 10 → C1

3. **Sonuç Gösterimi**
   - Kullanıcıya CEFR seviyesi gösterilecek.
   - İstenirse kısa geri bildirim mesajı da verilecek.

4. **Routing**
   - Test sayfası `/english-test` rotasında erişilebilir olacak.
   - Next.js sayfa komponenti bu sayfayı render edecek.
 

---

### Fonksiyonel Olmayan Gereksinimler
- Responsive tasarım (Mobil ve Desktop uyumlu) — TailwindCSS veya Bootstrap kullanımı.  
- Erişilebilirlik (klavye ve ekran okuyucu desteği).  
- Minimal frontend JS; hesaplama client-side yapılacak.  
- TypeScript tipleri sorular, cevaplar ve sonuçlar için tanımlanacak.

---

## Önerilen Komponentler

### 1. `EnglishTestPage.tsx`
 - Soruları ve seçenekleri render eder.  
- `calculateResult()` fonksiyonu ile sonucu hesaplar.

### 2. `QuestionCard.tsx`
- Props:
```ts
interface QuestionCardProps {
  id: string;
  question: string;
  options: { label: string; value: number }[];
  onChange: (id: string, value: number) => void;
}
