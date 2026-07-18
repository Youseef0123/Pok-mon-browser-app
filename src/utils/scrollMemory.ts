const scrollPositions: Record<string, number> = {}

export function saveScrollPosition(key: string, y: number) {
  scrollPositions[key] = y
}

export function getScrollPosition(key: string): number {
  return scrollPositions[key] ?? 0
}
