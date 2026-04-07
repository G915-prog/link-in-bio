export function isSafeUrl(url) {
  try {
    const { protocol } = new URL(url)
    return protocol === 'http:' || protocol === 'https:'
  } catch {
    return false
  }
}

export function sanitizeUrl(url) {
  return isSafeUrl(url) ? url : '#'
}
