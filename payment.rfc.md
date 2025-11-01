# RFC: Payment System Integration
## Online Ödeme Sistemi Entegrasyonu

**Tarih:** 2025-01-14  
**Durum:** Öneri (Proposal)  
**Öncelik:** Yüksek (Business Critical)  
**Tahmini Süre:** 8-12 saat

---

## 📋 Özet

UK Visa Solutions web sitesine müşterilerin online ödeme yapabileceği bir payment gateway entegrasyonu.

---

## 🎯 Amaç

- Kullanıcıların visa danışmanlık hizmetleri için online ödeme yapabilmesi
- Güvenli ödeme işlemi (PCI DSS compliant)
- Farklı ödeme yöntemleri (kredi kartı, banka kartı, PayPal vb.)
- Ödeme geçmişi ve fatura yönetimi
- Subscription/tek seferlik ödeme seçenekleri

---

## 💳 Ödeme Senaryoları

### Senaryo 1: Visa Danışmanlık Ücreti
- Tek seferlik ödeme
- Hizmet: Visa başvuru danışmanlığı
- Tutar: £500 - £2000 arası
- Ödeme sonrası: Danışmanlık süreci başlar

### Senaryo 2: Premium Hizmet Paketi
- Tek seferlik ödeme
- Hizmet: Premium visa danışmanlık + hızlandırılmış işlem
- Tutar: £1500 - £3000 arası
- Ödeme sonrası: Öncelikli destek aktif olur

### Senaryo 3: Eligibility Assessment Ücreti
- Tek seferlik ödeme
- Hizmet: Detaylı eligibility değerlendirmesi
- Tutar: £100 - £500 arası
- Ödeme sonrası: Detaylı rapor hazırlanır

### Senaryo 4: Document Review (Gelecek)
- Tek seferlik ödeme
- Hizmet: Belge inceleme ve kontrol
- Tutar: £200 - £800 arası

### Senaryo 5: Subscription Plan (Gelecek)
- Aylık/yıllık abonelik
- Hizmet: Sınırsız danışmanlık + öncelikli destek
- Tutar: £99/ay veya £999/yıl

---

## 🏗️ Teknik Mimari

### 1. Payment Gateway Seçenekleri

#### A. Stripe (Önerilen) ⭐
**Avantajlar:**
- ✅ Kolay entegrasyon
- ✅ PCI DSS compliance (built-in)
- ✅ 3D Secure desteği
- ✅ Subscription yönetimi
- ✅ Webhook desteği
- ✅ Multiple currencies
- ✅ İyi dokümantasyon
- ✅ UK-based (UK şirketleri için uygun)

**Dezavantajlar:**
- ❌ Transaction fee: 1.4% + 20p (UK cards)
- ❌ International cards: 2.9% + 20p

**Fiyatlandırma:**
- First £1M: %1.4 + 20p per transaction
- Sonrası: Daha düşük oranlar

#### B. PayPal
**Avantajlar:**
- ✅ Geniş kullanıcı tabanı
- ✅ Kolay entegrasyon
- ✅ Güvenilir marka
- ✅ Express Checkout

**Dezavantajlar:**
- ❌ Daha yüksek fees: 3.4% + 20p
- ❌ Limited customization
- ❌ UK odaklı değil

#### C. Square
**Avantajlar:**
- ✅ Basit pricing: %1.9 + 20p
- ✅ İyi UK desteği

**Dezavantajlar:**
- ❌ Stripe kadar yaygın değil
- ❌ Limited features

#### D. Mollie (Europe odaklı)
**Avantajlar:**
- ✅ Avrupa odaklı
- ✅ Multiple payment methods

**Dezavantajlar:**
- ❌ UK'de Stripe kadar bilinmiyor

**Öneri: Stripe** (En iyi UK entegrasyonu ve feature set)

---

### 2. Sistem Mimarisi

```
┌─────────────────┐
│   Frontend      │
│  Checkout Page  │
└────────┬────────┘
         │
         │ (Card Details)
         ▼
┌─────────────────┐
│  Stripe Elements│
│  (Secure Input)  │
└────────┬────────┘
         │
         │ (Payment Intent)
         ▼
┌─────────────────┐
│  Next.js API    │
│  /api/payments  │
└────────┬────────┘
         │
         │ (Stripe API Call)
         ▼
┌─────────────────┐
│   Stripe API    │
│   (Payment)     │
└────────┬────────┘
         │
         │ (Webhook)
         ▼
┌─────────────────┐
│  Webhook Handler│
│  Payment Status │
└────────┬────────┘
         │
         │ (Save to DB)
         ▼
┌─────────────────┐
│  Payload CMS    │
│  Payments Collection
└─────────────────┘
```

---

### 3. Collection Yapısı

#### Payments Collection

```typescript
// src/collections/Payments/index.ts
export const Payments: CollectionConfig = {
  slug: 'payments',
  access: {
    admin: authenticated,
    create: () => true, // Public payment creation
    read: (req) => {
      // Admin görebilir, kullanıcı sadece kendi ödemelerini
      if (req.user) {
        return { user: { equals: req.user.id } }
      }
      return false
    },
    update: authenticated, // Sadece admin güncelleyebilir
    delete: authenticated,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'public-users', // veya 'users'
      required: false, // Guest checkout için
    },
    {
      name: 'serviceType',
      type: 'select',
      options: [
        { label: 'Visa Consultation', value: 'visa-consultation' },
        { label: 'Premium Service', value: 'premium-service' },
        { label: 'Eligibility Assessment', value: 'eligibility-assessment' },
        { label: 'Document Review', value: 'document-review' },
      ],
      required: true,
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'currency',
      type: 'select',
      options: [
        { label: 'GBP (£)', value: 'gbp' },
        { label: 'USD ($)', value: 'usd' },
        { label: 'EUR (€)', value: 'eur' },
      ],
      defaultValue: 'gbp',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Succeeded', value: 'succeeded' },
        { label: 'Failed', value: 'failed' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Refunded', value: 'refunded' },
      ],
      defaultValue: 'pending',
    },
    {
      name: 'stripePaymentIntentId',
      type: 'text',
      admin: {
        description: 'Stripe Payment Intent ID',
      },
    },
    {
      name: 'stripeCustomerId',
      type: 'text',
      admin: {
        description: 'Stripe Customer ID (if logged in)',
      },
    },
    {
      name: 'paymentMethod',
      type: 'select',
      options: [
        { label: 'Card', value: 'card' },
        { label: 'Bank Transfer', value: 'bank_transfer' },
        { label: 'PayPal', value: 'paypal' },
      ],
    },
    {
      name: 'invoiceUrl',
      type: 'text',
      admin: {
        description: 'Stripe Invoice URL',
      },
    },
    {
      name: 'receiptUrl',
      type: 'text',
      admin: {
        description: 'Receipt download URL',
      },
    },
    {
      name: 'billingAddress',
      type: 'group',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'address', type: 'textarea' },
        { name: 'city', type: 'text' },
        { name: 'postcode', type: 'text' },
        { name: 'country', type: 'text' },
      ],
    },
    {
      name: 'refundAmount',
      type: 'number',
      admin: {
        condition: (data) => data.status === 'refunded',
      },
    },
    {
      name: 'refundReason',
      type: 'textarea',
      admin: {
        condition: (data) => data.status === 'refunded',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes',
      },
    },
  ],
  timestamps: true,
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        // Payment succeeded olduğunda email gönder
        if (doc.status === 'succeeded' && operation === 'update') {
          // Email service call
        }
      },
    ],
  },
}
```

#### Service Packages Collection (Opsiyonel)

```typescript
// src/collections/ServicePackages/index.ts
export const ServicePackages: CollectionConfig = {
  slug: 'service-packages',
  access: {
    read: () => true, // Herkes görebilir
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'price', type: 'number', required: true },
    { name: 'currency', type: 'select', options: ['gbp', 'usd', 'eur'] },
    { name: 'features', type: 'array', fields: [{ name: 'feature', type: 'text' }] },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
    { name: 'sortOrder', type: 'number' },
  ],
}
```

---

## 📁 Dosya Yapısı

```
src/
├── collections/
│   ├── Payments/
│   │   ├── index.ts
│   │   └── hooks.ts
│   └── ServicePackages/ (opsiyonel)
│       └── index.ts
├── app/(frontend)/
│   ├── checkout/
│   │   ├── page.tsx              # Checkout sayfası
│   │   └── success/
│   │       └── page.tsx          # Ödeme başarılı
│   └── payments/
│       ├── page.tsx              # Ödeme geçmişi
│       └── [id]/
│           └── page.tsx          # Ödeme detayı
├── app/api/
│   ├── payments/
│   │   ├── route.ts              # Payment intent oluştur
│   │   ├── webhook/
│   │   │   └── route.ts          # Stripe webhook handler
│   │   └── success/
│   │       └── route.ts          # Ödeme sonrası işlemler
│   └── stripe/
│       └── route.ts              # Stripe config (opsiyonel)
├── components/
│   ├── payment/
│   │   ├── CheckoutForm.tsx      # Ana checkout formu
│   │   ├── PaymentSummary.tsx    # Ödeme özeti
│   │   ├── StripeElements.tsx    # Stripe Elements wrapper
│   │   └── PaymentSuccess.tsx    # Başarılı ödeme mesajı
│   └── services/
│       └── ServiceCard.tsx       # Hizmet kartı (paket seçimi)
└── lib/
    └── stripe.ts                 # Stripe client helper
```

---

## 🔧 Implementation Adımları

### Phase 1: Stripe Setup
1. **Stripe Account**
   - Stripe hesabı oluştur (test ve live mode)
   - API keys al (Secret key, Publishable key)
   - Webhook endpoint oluştur

2. **Environment Variables**
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

3. **Dependencies**
   ```bash
   pnpm add stripe @stripe/stripe-js
   ```

### Phase 2: Backend API
1. **Payment Intent API**
   - `/api/payments` endpoint
   - Amount, currency, service type al
   - Stripe Payment Intent oluştur
   - Client secret döndür

2. **Webhook Handler**
   - `/api/payments/webhook` endpoint
   - Stripe events dinle:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `charge.refunded`
   - Payment status'u Payload'da güncelle

3. **Payment Collection**
   - Payload'a Payments collection ekle
   - Fields tanımla
   - Access control ayarla

### Phase 3: Frontend Checkout
1. **Checkout Page**
   - Service seçimi
   - Amount gösterimi
   - Billing address formu
   - Stripe Elements entegrasyonu

2. **Stripe Elements**
   - CardElement component
   - PaymentMethod element
   - 3D Secure handling
   - Error handling

3. **Payment Flow**
   ```
   User selects service
   → Enters billing info
   → Enters card details
   → Submits payment
   → Processing...
   → Success/Error redirect
   ```

### Phase 4: Post-Payment
1. **Success Page**
   - Confirmation mesajı
   - Receipt download
   - Next steps bilgisi
   - Email notification

2. **Payment History**
   - User dashboard'da ödeme geçmişi
   - Invoice download
   - Receipt download

### Phase 5: Testing & Polish
1. Test mode ile test
2. 3D Secure test
3. Error scenarios
4. Refund flow
5. Email notifications

---

## 💰 Fiyatlandırma Yapısı

### Service Packages

```typescript
const SERVICE_PACKAGES = {
  'visa-consultation': {
    title: 'Visa Consultation',
    description: 'Expert visa consultation and application support',
    basePrice: 500,
    tiers: {
      basic: 500,    // Standard consultation
      premium: 1500, // Premium with priority support
      vip: 3000,     // VIP with dedicated advisor
    },
  },
  'eligibility-assessment': {
    title: 'Eligibility Assessment',
    description: 'Detailed eligibility evaluation and report',
    basePrice: 100,
    tiers: {
      basic: 100,    // Basic report
      detailed: 300, // Detailed analysis
      premium: 500,   // Premium with recommendations
    },
  },
  // ... diğer servisler
}
```

---

## 🔒 Güvenlik

### 1. PCI DSS Compliance
- ✅ **Stripe Elements**: Card data asla server'a gitmez
- ✅ Sensitive data Stripe'da kalır
- ✅ Server sadece Payment Intent ID alır

### 2. Webhook Security
- ✅ Webhook signature verification
- ✅ Idempotency keys
- ✅ Event deduplication

### 3. Payment Validation
- ✅ Amount validation (min/max)
- ✅ Currency validation
- ✅ Service type validation
- ✅ Double payment prevention

### 4. Rate Limiting
- ✅ Payment attempt limiting
- ✅ Webhook rate limiting

---

## 📊 Ödeme Akışı (Flow)

### Normal Flow
```
1. User selects service → /checkout?service=visa-consultation
2. Enter billing address
3. Enter card details (Stripe Elements)
4. Click "Pay £500"
5. API call: Create Payment Intent
6. Confirm payment (Stripe handles 3D Secure if needed)
7. Payment processing
8. Webhook: payment_intent.succeeded
9. Update payment status in DB
10. Send confirmation email
11. Redirect to /checkout/success?payment_intent=pi_xxx
12. Show success message + receipt
```

### Error Flow
```
1. Payment fails (insufficient funds, card declined)
2. Webhook: payment_intent.payment_failed
3. Update payment status to "failed"
4. Show error message to user
5. Allow retry with different card
```

### Refund Flow
```
1. Admin initiates refund in Payload CMS
2. API call: Create refund in Stripe
3. Webhook: charge.refunded
4. Update payment status to "refunded"
5. Send refund confirmation email
```

---

## 🎨 UI/UX Tasarım

### Checkout Page
```
┌─────────────────────────────────────┐
│  Checkout                           │
├─────────────────────────────────────┤
│                                     │
│  Service: Visa Consultation         │
│  Amount: £500.00                   │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Billing Address               │ │
│  │ Name: [___________]           │ │
│  │ Email: [___________]           │ │
│  │ Address: [___________]         │ │
│  │ City: [___________]            │ │
│  │ Postcode: [___________]        │ │
│  │ Country: [___________]         │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Payment Method                │ │
│  │                               │ │
│  │ Card Number                   │ │
│  │ [_____________________]        │ │
│  │                               │ │
│  │ Expiry  CVC                   │ │
│  │ [____]  [___]                  │ │
│  │                               │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Total: £500.00                │ │
│  │                               │ │
│  │ [Pay £500.00]                 │ │
│  └───────────────────────────────┘ │
│                                     │
│  🔒 Secure payment by Stripe         │
└─────────────────────────────────────┘
```

### Success Page
```
┌─────────────────────────────────────┐
│  ✅ Payment Successful              │
├─────────────────────────────────────┤
│                                     │
│  Thank you for your payment!        │
│                                     │
│  Payment ID: PI_xxx                 │
│  Amount: £500.00                   │
│  Date: 14 Jan 2025                 │
│                                     │
│  [Download Receipt]                │
│  [View Payment Details]            │
│                                     │
│  What happens next?                 │
│  • You'll receive an email          │
│  • Our team will contact you       │
│  • Consultation will begin          │
│                                     │
│  [Return to Home]                  │
└─────────────────────────────────────┘
```

---

## 📧 Email Notifications

### Payment Succeeded
- **To:** Customer
- **Subject:** Payment Confirmed - £500.00
- **Content:**
  - Payment confirmation
  - Receipt PDF attachment
  - Next steps
  - Support contact

### Payment Failed
- **To:** Customer
- **Subject:** Payment Failed - Please Try Again
- **Content:**
  - Payment failure reason
  - Retry instructions
  - Support contact

### Payment Refunded
- **To:** Customer
- **Subject:** Refund Processed - £500.00
- **Content:**
  - Refund confirmation
  - Refund amount
  - Estimated processing time

---

## 🔗 Webhook Events

### Stripe Events to Handle

```typescript
const STRIPE_EVENTS = {
  'payment_intent.succeeded': {
    action: 'Update payment status to succeeded',
    sendEmail: true,
    triggerNextSteps: true,
  },
  'payment_intent.payment_failed': {
    action: 'Update payment status to failed',
    sendEmail: true,
  },
  'charge.refunded': {
    action: 'Update payment status to refunded',
    sendEmail: true,
  },
  'payment_intent.canceled': {
    action: 'Update payment status to cancelled',
    sendEmail: false,
  },
}
```

---

## 📈 Success Metrics

- ✅ Payment success rate > 95%
- ✅ Payment processing time < 30 seconds
- ✅ Zero PCI DSS violations
- ✅ Webhook reliability > 99%
- ✅ Email delivery rate > 99%
- ⏳ Refund processing < 5 business days

---

## ⚠️ Riskler ve Dikkat Edilmesi Gerekenler

### Riskler
1. **Double Payment**: Aynı payment intent iki kez confirm edilmemeli
2. **Webhook Failures**: Webhook başarısız olursa payment status yanlış kalabilir
3. **Currency Fluctuation**: Farklı para birimleri için conversion
4. **Refund Fraud**: Sahte refund talepleri
5. **Chargeback**: Müşteri chargeback açarsa

### Çözümler
- Idempotency keys kullan
- Webhook retry mechanism
- Payment logging ve audit trail
- Manual refund approval process
- Chargeback dispute handling

---

## 🚀 Gelecek Özellikler (v2, v3)

### v1.1 - Additional Payment Methods
- PayPal integration
- Bank transfer (manual)
- Apple Pay / Google Pay

### v1.2 - Subscription Management
- Recurring payments
- Subscription dashboard
- Auto-renewal
- Cancellation flow

### v1.3 - Advanced Features
- Payment plans (installments)
- Discount codes
- Referral discounts
- Loyalty points

### v1.4 - Analytics
- Revenue dashboard
- Payment analytics
- Conversion tracking
- Customer lifetime value

---

## 💡 Alternatif Ödeme Yöntemleri

### 1. Bank Transfer (Manual)
- IBAN bilgisi göster
- Manual confirmation gerekli
- Admin tarafında approve edilmeli

### 2. PayPal Express
- PayPal Checkout button
- Express payment
- Daha yüksek fees

### 3. Klarna (Buy Now Pay Later)
- Installment payments
- Genç müşteriler için

---

## 📝 Referanslar

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Elements](https://stripe.com/docs/stripe-js)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [PCI DSS Compliance](https://stripe.com/docs/security/guide)
- [Next.js + Stripe](https://stripe.com/docs/stripe-js/react)

---

## ✅ Checklist

### Setup
- [ ] Stripe account oluştur
- [ ] API keys al
- [ ] Webhook endpoint oluştur
- [ ] Environment variables ekle

### Backend
- [ ] Payments collection oluştur
- [ ] Payment Intent API endpoint
- [ ] Webhook handler
- [ ] Payment status management

### Frontend
- [ ] Checkout page
- [ ] Stripe Elements integration
- [ ] Payment flow
- [ ] Success page
- [ ] Error handling

### Testing
- [ ] Test mode ile test
- [ ] 3D Secure test
- [ ] Webhook test
- [ ] Error scenarios
- [ ] Refund test

### Production
- [ ] Live API keys
- [ ] Webhook security check
- [ ] Email templates
- [ ] Legal compliance (GDPR, consumer rights)

---

**Not:** Bu RFC sadece tasarım ve planlama amaçlıdır. Stripe entegrasyonu yapmadan önce legal ve güvenlik review gerekir.
