import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer and all pages`)

    // Footer her sayfada göründüğü için tüm sayfaları revalidate et
    revalidatePath('/', 'layout')
    revalidateTag('global_footer', 'max')
  }

  return doc
}
