/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 *
 * NOTE: Relative URLs are returned as-is (without prepending a base URL).
 * Prepending an origin resolved differently on the server (NEXT_PUBLIC_SERVER_URL)
 * and the client (window.location) causes React hydration mismatches whenever the
 * dev/prod port or host differs. A relative `src` renders identically on both sides.
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

  // Append cache tag if provided (works for both absolute and relative URLs)
  if (cacheTag && cacheTag !== '') {
    const encodedCacheTag = encodeURIComponent(cacheTag)
    return `${decodedUrl}?${encodedCacheTag}`
  }

  return decodedUrl
}
