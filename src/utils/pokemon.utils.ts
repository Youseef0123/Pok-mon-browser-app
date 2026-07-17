/**
 * Extracts the numeric ID from a PokéAPI resource URL.
 * E.g., "https://pokeapi.co/api/v2/pokemon/4/" -> 4
 */
export function extractIdFromUrl(url: string): number {
  if (!url) {
    console.warn(`extractIdFromUrl: could not parse id from "${url}"`)
    return 0
  }

  const segments = url.trim().split('/').filter(Boolean)
  const lastSegment = segments[segments.length - 1]
  const id = lastSegment ? parseInt(lastSegment, 10) : NaN

  if (isNaN(id)) {
    console.warn(`extractIdFromUrl: could not parse id from "${url}"`)
    return 0
  }

  return id
}
