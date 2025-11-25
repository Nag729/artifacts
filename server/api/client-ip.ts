export default defineEventHandler((event) => {
  // Try to get IP from various headers (for proxies/CDNs)
  const forwarded = getHeader(event, 'x-forwarded-for')
  const realIp = getHeader(event, 'x-real-ip')
  const cfConnectingIp = getHeader(event, 'cf-connecting-ip') // Cloudflare

  // Get the first IP from x-forwarded-for (in case of multiple proxies)
  const ip =
    cfConnectingIp || realIp || (forwarded ? forwarded.split(',')[0]?.trim() : null) || '127.0.0.1'

  return {
    ip,
  }
})
