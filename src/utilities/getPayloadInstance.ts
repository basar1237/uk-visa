import configPromise from '@payload-config'
import { getPayload, Payload } from 'payload'

// Payload instance'ını cache'leyelim (singleton pattern)
// Bu sayede her çağrıda yeni bağlantı oluşturmaktan kaçınırız
let cachedPayload: Payload | null = null

export async function getPayloadInstance(): Promise<Payload> {
  if (cachedPayload) {
    return cachedPayload
  }
  
  cachedPayload = await getPayload({ config: configPromise })
  return cachedPayload
}

