import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`[REVALIDATION] Revalidating header and all pages`)

    try {
      // Header her sayfada göründüğü için tüm sayfaları revalidate et
      revalidatePath('/', 'layout')
      revalidatePath('/', 'page') // Tüm sayfaları da revalidate et
      revalidateTag('global_header')
      
      payload.logger.info(`[REVALIDATION] Successfully revalidated header`)
    } catch (error) {
      payload.logger.error(`[REVALIDATION] Error revalidating header:`, error)
    }
  } else {
    payload.logger.warn(`[REVALIDATION] Revalidation disabled for header`)
  }

  return doc
}
