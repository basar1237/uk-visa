import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

describe('API', () => {
  beforeAll(async () => {
    try {
      console.log('Payload config yükleniyor...')
      const payloadConfig = await config
      console.log('Payload instance oluşturuluyor...')
      payload = await getPayload({ config: payloadConfig })
      console.log('Payload başarıyla başlatıldı')
    } catch (error) {
      console.error('Payload başlatma hatası:', error)
      throw error
    }
  }, 30000) // 30 saniye timeout

  it('fetches users', async () => {
    try {
      const users = await payload.find({
        collection: 'users',
      })
      expect(users).toBeDefined()
      expect(users.docs).toBeDefined()
    } catch (error) {
      console.error('Users fetch hatası:', error)
      throw error
    }
  })
})
