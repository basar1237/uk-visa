import type { Block } from 'payload'
import { blockToggleField } from '@/fields/blockToggle'

export const FeaturesGrid: Block = {
  slug: 'featuresGrid',
  interfaceName: 'FeaturesGridBlock',
  fields: [
    blockToggleField,
    {
      name: 'title',
      type: 'text',
      required: false,
      admin: {
        description: 'Ana başlık (opsiyonel, örn: "Why Choose UK Legal Solutions?")',
      },
    },
    {
      name: 'features',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            // Temel İkonlar
            { label: '🌐 Globe - Dünya/Uluslararası', value: 'globe' },
            { label: '📱 Phone - Telefon/İletişim', value: 'phone' },
            { label: '⏰ Clock - Saat/Zaman', value: 'clock' },
            { label: '⚖️ Scales - Terazi/Hukuk', value: 'scales' },
            
            // Belge ve Vize İkonları
            { label: '📄 Passport - Pasaport', value: 'passport' },
            { label: '✓ Document - Belge/Onaylı', value: 'document' },
            { label: '📝 FileText - Dosya/Form', value: 'filetext' },
            { label: '✅ FileCheck - Onaylı Belge', value: 'filecheck' },
            { label: '🎫 Stamp - Damga/Vize', value: 'stamp' },
            { label: '📋 ClipboardCheck - Form Onayı', value: 'clipboardcheck' },
            { label: '🧾 Receipt - Makbuz/Fatura', value: 'receipt' },
            
            // Ev ve Aile
            { label: '🏠 House - Ev/Konut', value: 'house' },
            { label: '❤️ Heart - Kalp/Aile', value: 'heart' },
            { label: '👥 Users - Kullanıcılar/Aile', value: 'users' },
            
            // Hukuk ve Adalet
            { label: '👑 Crown - Taç/Kraliyet', value: 'crown' },
            { label: '⚖️ Justice - Adalet/Mahkeme', value: 'justice' },
            
            // İş ve Kariyer
            { label: '💼 Briefcase - Çanta/İş', value: 'briefcase' },
            { label: '🏢 Building - Bina/Ofis', value: 'building' },
            { label: '🏢 Building2 - İş Merkezi', value: 'building2' },
            { label: '🏛️ Landmark - Anıt/Resmi Bina', value: 'landmark' },
            { label: '🎓 University - Üniversite', value: 'university' },
            
            // Seyahat ve Lokasyon
            { label: '✈️ Plane - Uçak/Seyahat', value: 'plane' },
            { label: '📍 MapPin - Konum/Pin', value: 'mappin' },
            { label: '🧭 Navigation - Navigasyon', value: 'navigation' },
            { label: '🧭 Compass - Pusula/Yön', value: 'compass' },
            { label: '🗺️ Map - Harita', value: 'map' },
            { label: '🚩 Flag - Bayrak/Ülke', value: 'flag' },
            
            // Eğitim
            { label: '🎓 Graduation - Mezuniyet', value: 'graduation' },
            { label: '📖 BookOpen - Kitap/Eğitim', value: 'bookopen' },
            
            // İletişim
            { label: '✉️ Mail - E-posta', value: 'mail' },
            
            // Güvenlik
            { label: '🔒 Lock - Kilit/Güvenlik', value: 'lock' },
            { label: '🛡️ Shield - Kalkan/Koruma', value: 'shield' },
            { label: '🚨 Alert - Uyarı', value: 'handcuffs' },
            
            // Onay ve Başarı
            { label: '✓ CheckCircle - Onay', value: 'checkcircle' },
            { label: '✓ CheckCircle2 - Onay İşareti', value: 'checkcircle2' },
            { label: '✓ UserCheck - Onaylı Kullanıcı', value: 'usercheck' },
            { label: '✓ BadgeCheck - Onaylı Rozet', value: 'badgecheck' },
            { label: '👍 ThumbsUp - Beğeni/Onay', value: 'thumbsup' },
            { label: '⭐ Star - Yıldız/Kalite', value: 'star' },
            { label: '🏆 Award - Ödül/Başarı', value: 'award' },
            
            // Hız ve İlerleme
            { label: '🚀 Rocket - Roket/Hız', value: 'rocket' },
            { label: '⚡ Zap - Şimşek/Hız', value: 'zap' },
            { label: '📈 TrendingUp - Yükseliş', value: 'trending' },
            { label: '📉 TrendingDown - Düşüş', value: 'trendingdown' },
            { label: '🎯 Target - Hedef', value: 'target' },
            { label: '✨ Sparkles - İbre/Parlama', value: 'sparkles' },
            
            // Finans
            { label: '💵 Banknote - Para/Banka Notu', value: 'banknote' },
            { label: '👛 Wallet - Cüzdan', value: 'wallet' },
            { label: '💳 CreditCard - Kredi Kartı', value: 'creditcard' },
            
            // Zaman
            { label: '📅 Calendar - Takvim', value: 'calendar' },
            { label: '✓ CalendarCheck - Randevu/Tarih', value: 'calendarcheck' },
            { label: '⏱️ Timer - Zamanlayıcı', value: 'timer' },
            { label: '⏳ Hourglass - Kum Saati', value: 'hourglass' },
            
            // Analiz
            { label: '📊 BarChart - Çubuk Grafik', value: 'barchart' },
            { label: '📊 PieChart - Pasta Grafik', value: 'piechart' },
            
            // Dil
            { label: '🌍 Languages - Diller', value: 'languages' },
          ],
          admin: {
            description: 'Vize ve göç ile alakalı ikon seçin',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Özellik başlığı',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Açıklama metni',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Features Grids',
    singular: 'Features Grid',
  },
}
