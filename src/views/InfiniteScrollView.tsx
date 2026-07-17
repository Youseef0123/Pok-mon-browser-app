import { useVirtualizer } from '@tanstack/react-virtual'
import { useEffect, useRef, useState } from 'react'
import PokemonCard from '../components/shared/PokemonCard'
import ErrorState from '../components/ui/ErrorState'
import { usePokemonList } from '../hooks/usePokemonList'
import { extractIdFromUrl } from '../utils/pokemon.utils'

export function InfiniteScrollView() {
  const limit = 20
  const parentRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState(4)

  const {
    flatItems,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = usePokemonList(limit)

  // 1. Monitor screen width and update columns matching PokemonGrid breakpoints
  useEffect(() => {
    const getColumnCount = () => {
      const width = window.innerWidth
      if (width < 640) return 1
      if (width < 768) return 2
      if (width < 1024) return 3
      return 4
    }

    setColumns(getColumnCount())

    const handleResize = () => {
      setColumns(getColumnCount())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 2. Set up row virtualization
  const rowCount = Math.ceil(flatItems.length / columns)

  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 280, // Approximate height of card (200px) + gap/padding
    overscan: 3,
  })

  // 3. Automated trigger to fetch next page when scrolling near the end
  const virtualItems = rowVirtualizer.getVirtualItems()
  useEffect(() => {
    if (virtualItems.length === 0) return

    const lastItem = virtualItems[virtualItems.length - 1]
    if (lastItem.index >= rowCount - 2 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [virtualItems, rowCount, hasNextPage, isFetchingNextPage, fetchNextPage])

  // 4. Initial loading state (first page, no data loaded yet)
  if (isLoading && flatItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4" role="status">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
        <p className="text-gray-500 font-semibold text-sm">Loading Pokémon...</p>
      </div>
    )
  }

  // 5. Error state when no data is loaded yet
  if (isError && flatItems.length === 0) {
    return (
      <div className="py-12">
        <ErrorState
          message={error?.message ?? 'Something went wrong while fetching Pokémon.'}
          onRetry={refetch}
        />
      </div>
    )
  }

  // 6. Success state: Virtualized grid
  return (
    <div className="w-full flex flex-col items-center">
      {/* Scrollable Container (Viewport) */}
      <div
        ref={parentRef}
        key={columns} // Force complete remount on column change to recompute virtual layout cleanly
        className="w-full h-[70vh] overflow-y-auto rounded-xl border border-gray-200/80 bg-white p-4 shadow-sm"
      >
        {/* Inner scroll container with absolute positioning */}
        <div
          className="relative w-full"
          style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
        >
          {virtualItems.map((virtualRow) => {
            const startIndex = virtualRow.index * columns
            const rowItems = flatItems.slice(startIndex, startIndex + columns)

            return (
              <div
                key={virtualRow.key}
                className="absolute top-0 left-0 w-full"
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div
                  className="grid gap-6 w-full"
                  style={{
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                    paddingBottom: '24px', // gap spacing equivalent
                  }}
                >
                  {rowItems.map((item) => {
                     const id = extractIdFromUrl(item.url)
                     const spriteUrl = id
                       ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
                       : null

                     return (
                       <PokemonCard
                         key={id}
                         id={id}
                         name={item.name}
                         imageUrl={spriteUrl}
                       />
                     )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom loading / completeness indicators */}
        <div className="mt-8 mb-4 flex justify-center w-full min-h-[40px]">
          {isFetchingNextPage ? (
            <div className="flex items-center gap-2" role="status">
              <div className="w-5 h-5 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
              <p className="text-gray-500 font-semibold text-xs md:text-sm">
                Loading more Pokémon...
              </p>
            </div>
          ) : !hasNextPage && flatItems.length > 0 ? (
            <span className="text-xs md:text-sm text-gray-400 font-semibold select-none">
              You've caught them all! ({flatItems.length} Pokémon shown)
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default InfiniteScrollView

