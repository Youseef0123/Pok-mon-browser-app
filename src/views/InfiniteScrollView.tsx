import { useWindowVirtualizer } from '@tanstack/react-virtual'
import { useEffect, useRef, useState } from 'react'
import PokemonCard from '../components/shared/PokemonCard'
import ErrorState from '../components/ui/ErrorState'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import { usePokemonList } from '../hooks/usePokemonList'
import { extractIdFromUrl } from '../utils/pokemon.utils'

const getColumnCount = () => {
  if (typeof window === 'undefined') return 4
  const width = window.innerWidth
  if (width < 640) return 2
  if (width < 768) return 2
  if (width < 1024) return 3
  return 4
}

export function InfiniteScrollView() {
  const limit = 20
  const parentRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState(() => getColumnCount())

  const {
    flatItems,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = usePokemonList(limit, 'infiniteScroll')

  // 1. Set up row virtualization using the window scrollbar
  const rowCount = Math.ceil(flatItems.length / columns)
  const [scrollMargin, setScrollMargin] = useState(0)

  // 2. Monitor screen width and update columns + scrollMargin together on every resize
  useEffect(() => {
    const updateLayout = () => {
      setColumns(getColumnCount())
      if (parentRef.current) {
        setScrollMargin(parentRef.current.offsetTop)
      }
    }

    updateLayout()
    window.addEventListener('resize', updateLayout)
    return () => window.removeEventListener('resize', updateLayout)
  }, [])

  const rowVirtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => 280, // Approximate height of card (200px) + gap/padding
    overscan: 3,
    scrollMargin,
    measureElement: (element) => element?.getBoundingClientRect().height ?? 280,
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
    return <LoadingSkeleton count={20} />
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

  // 6. Success state: Virtualized grid mapped to the window viewport
  return (
    <div className="w-full flex flex-col items-center">
      {/* Grid Container (Parent Ref) */}
      <div
        ref={parentRef}
        key={columns} // Force complete remount on column change to recompute virtual layout cleanly
        className="w-full relative"
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      >
        {virtualItems.map((virtualRow) => {
          const startIndex = virtualRow.index * columns
          const rowItems = flatItems.slice(startIndex, startIndex + columns)

          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              className="absolute top-0 left-0 w-full"
              style={{
                transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin}px)`,
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
      <div className="mt-12 mb-6 flex justify-center w-full min-h-[40px]">
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
  )
}

export default InfiniteScrollView


