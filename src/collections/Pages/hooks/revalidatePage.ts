import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = doc.slug === 'home' ? '/' : `/${doc.slug}`

      payload.logger.info(`[REVALIDATION] Revalidating page at path: ${path}`)

      try {
        // Sayfa path'ini ve layout'u revalidate et (header layout'ta olduğu için)
        revalidatePath(path)
        revalidatePath(path, 'layout')
        revalidatePath(path, 'page')
        revalidateTag('pages-sitemap', 'max')

        payload.logger.info(`[REVALIDATION] Successfully revalidated page: ${path}`)
      } catch (error) {
        payload.logger.error(`[REVALIDATION] Error revalidating page ${path}:`, error)
      }
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`

      payload.logger.info(`[REVALIDATION] Revalidating old page at path: ${oldPath}`)

      try {
        revalidatePath(oldPath)
        revalidatePath(oldPath, 'layout')
        revalidatePath(oldPath, 'page')
        revalidateTag('pages-sitemap', 'max')

        payload.logger.info(`[REVALIDATION] Successfully revalidated old page: ${oldPath}`)
      } catch (error) {
        payload.logger.error(`[REVALIDATION] Error revalidating old page ${oldPath}:`, error)
      }
    }
  } else {
    payload.logger.warn(`[REVALIDATION] Revalidation disabled for page`)
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = doc?.slug === 'home' ? '/' : `/${doc?.slug}`
    revalidatePath(path)
    revalidateTag('pages-sitemap', 'max')
  }

  return doc
}
