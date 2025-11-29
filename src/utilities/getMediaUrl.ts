import { getClientSideURL } from '@/utilities/getURL'

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  // Decode URL if it's already encoded to avoid double encoding with Next.js Image
  let decodedUrl = url
  try {
    // If URL contains encoded characters, decode it first
    // Next.js Image will handle encoding automatically
    if (url.includes('%')) {
      decodedUrl = decodeURIComponent(url)
    }
  } catch {
    // If decoding fails, use original URL
    decodedUrl = url
  }

  // Handle cache tag
  if (cacheTag && cacheTag !== '') {
    const encodedCacheTag = encodeURIComponent(cacheTag)
    // Check if URL already has http/https protocol
    if (decodedUrl.startsWith('http://') || decodedUrl.startsWith('https://')) {
      return `${decodedUrl}?${encodedCacheTag}`
    }
    // Otherwise prepend client-side URL
    const baseUrl = getClientSideURL()
    return `${baseUrl}${decodedUrl}?${encodedCacheTag}`
  }

  // Check if URL already has http/https protocol
  if (decodedUrl.startsWith('http://') || decodedUrl.startsWith('https://')) {
    return decodedUrl
  }

  // Otherwise prepend client-side URL
  const baseUrl = getClientSideURL()
  return `${baseUrl}${decodedUrl}`
}
