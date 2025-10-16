# CMS Blok Toggle Özelliği Dokümantasyonu

## Genel Bakış

Bu özellik, CMS admin panelinde her bloğun yanında aktif/pasif toggle butonu ekler. Bu sayede blokları istediğiniz zaman kolayca açıp kapatabilirsiniz.

## Nasıl Çalışır

- **Aktif (✓)**: Blok frontend'de görünür
- **Pasif (✗)**: Blok frontend'de gizli
- **Varsayılan**: Tüm bloklar aktif olarak gelir

## Dosya Yapısı ve Değişiklikler

### 1. Toggle Field Oluşturma

**Dosya**: `src/fields/blockToggle.ts`

```typescript
import type { Field } from 'payload'

export const blockToggleField: Field = {
  name: 'isActive',
  type: 'checkbox',
  defaultValue: true,
  admin: {
    description: 'Bu bloğu aktif/pasif yapın',
    position: 'sidebar',
    width: '50%',
  },
  label: 'Aktif',
}
```

**Açıklama**: 
- Tüm bloklarda kullanılacak ortak field
- `position: 'sidebar'` ile admin panelinin yan çubuğunda görünür
- `defaultValue: true` ile varsayılan olarak aktif

### 2. Blok Konfigürasyonlarına Ekleme

Her blok config dosyasına iki değişiklik yapıldı:

#### Import Ekleme
```typescript
import { blockToggleField } from '@/fields/blockToggle'
```

#### Fields Array'ine Ekleme
```typescript
export const BlockName: Block = {
  slug: 'blockName',
  interfaceName: 'BlockNameBlock',
  fields: [
    blockToggleField,  // ← Bu satır eklendi
    // ... diğer fieldlar
  ],
}
```

**Güncellenen Bloklar**:
- `src/blocks/ServicesGrid/config.ts`
- `src/blocks/FeaturesGrid/config.ts`
- `src/blocks/Content/config.ts`
- `src/blocks/FAQBlock/config.ts`
- `src/blocks/CallToAction/config.ts`
- `src/blocks/StatsBoxesBlock/config.ts`
- `src/blocks/TestimonialsBlock/config.ts`
- `src/blocks/MediaBlock/config.ts`
- `src/blocks/Form/config.ts`
- `src/blocks/Landing/config.ts`

### 3. Render Logic Güncelleme

**Dosya**: `src/blocks/RenderBlocks.tsx`

```typescript
export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          // isActive field'ını kontrol et - eğer false ise bloğu render etme
          if (block && 'isActive' in block && block.isActive === false) {
            return null
          }

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
```

**Açıklama**:
- Her blok render edilmeden önce `isActive` field'ı kontrol edilir
- `isActive === false` ise `return null` ile blok atlanır
- Bu sayede pasif bloklar frontend'de görünmez

## Kullanım

### CMS Admin Panelinde

1. `/admin` adresine gidin
2. Herhangi bir sayfa düzenleyin
3. Blokların yanında "Aktif" checkbox'ını göreceksiniz
4. Checkbox'ı işaretleyip kaldırarak bloğu aktif/pasif yapabilirsiniz

### Görsel Açıklama

```
┌─────────────────────────────────────┐
│ Services Grid Block                 │
├─────────────────────────────────────┤
│ Title: Our Services                 │
│ Services: [3 items]                 │
│                                     │
│ Sidebar:                            │
│ ┌─────────────────────────────────┐ │
│ │ ☑ Aktif                        │ │  ← Toggle burada
│ │   Bu bloğu aktif/pasif yapın   │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## Teknik Detaylar

### Field Özellikleri
- **Type**: `checkbox` - Boolean değer
- **Name**: `isActive` - Database'de saklanan field adı
- **Position**: `sidebar` - Admin panelinde yan çubukta görünür
- **Width**: `50%` - Yan çubukta yarım genişlik
- **Default**: `true` - Varsayılan olarak aktif

### TypeScript Desteği
Field'lar TypeScript ile tip güvenliği sağlar:
```typescript
interface BlockWithToggle {
  isActive?: boolean
  // ... diğer fieldlar
}
```

### Database Schema
Her blok için `isActive` boolean field'ı eklenir:
```sql
-- Örnek database yapısı
blocks: {
  id: string
  blockType: string
  isActive: boolean  -- ← Yeni eklenen field
  // ... diğer fieldlar
}
```

## Avantajlar

1. **Kolay Yönetim**: Blokları silmeden geçici olarak gizleyebilirsiniz
2. **Hızlı Test**: A/B testing için blokları hızlıca açıp kapatabilirsiniz
3. **Sezonsal İçerik**: Belirli dönemlerde gösterilecek blokları yönetebilirsiniz
4. **Güvenli**: Bloklar silinmez, sadece gizlenir
5. **Geri Dönüşüm**: İstediğiniz zaman tekrar aktif edebilirsiniz

## Gelecek Geliştirmeler

### Potansiyel İyileştirmeler

1. **Bulk Toggle**: Tüm blokları toplu olarak açıp kapatma
2. **Zamanlama**: Belirli tarihlerde otomatik açılıp kapanma
3. **Kullanıcı Rolleri**: Sadece admin'lerin toggle yapabilmesi
4. **Loglama**: Hangi kullanıcının ne zaman toggle yaptığını kaydetme
5. **Preview**: Toggle durumunu canlı önizlemede gösterme

### Kod Örnekleri

#### Bulk Toggle Hook
```typescript
const useBulkToggle = () => {
  const toggleAllBlocks = (blocks: Block[], isActive: boolean) => {
    return blocks.map(block => ({
      ...block,
      isActive
    }))
  }
  
  return { toggleAllBlocks }
}
```

#### Zamanlama Field'ı
```typescript
const schedulingField: Field = {
  name: 'schedule',
  type: 'group',
  fields: [
    {
      name: 'startDate',
      type: 'date',
      admin: {
        condition: (_, { isActive }) => !isActive
      }
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        condition: (_, { isActive }) => !isActive
      }
    }
  ]
}
```

## Sorun Giderme

### Yaygın Sorunlar

1. **Toggle Görünmüyor**
   - Import'un doğru yapıldığından emin olun
   - Field'ın fields array'inin başına eklendiğini kontrol edin

2. **Blok Gizlenmiyor**
   - RenderBlocks'ta kontrol logic'inin doğru olduğunu kontrol edin
   - Database'de isActive field'ının güncellendiğini kontrol edin

3. **TypeScript Hatası**
   - Payload types'ı yeniden generate edin: `npm run generate:types`

### Debug Komutu
```bash
# Payload types'ı yeniden generate et
npm run generate:types

# Development server'ı yeniden başlat
npm run dev
```

## Sonuç

Bu özellik CMS yönetimini büyük ölçüde kolaylaştırır ve içerik yöneticilerine daha fazla esneklik sağlar. Minimal kod değişikliği ile maksimum fayda elde edilir.
