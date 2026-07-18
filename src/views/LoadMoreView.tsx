import PokemonGrid from '../components/shared/PokemonGrid'
import ErrorState from '../components/ui/ErrorState'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import { usePokemonList } from '../hooks/usePokemonList'

export function LoadMoreView() {
  const limit = 20
  const {
    flatItems,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = usePokemonList(limit, 'loadMore')

  // 1. Initial loading state (first page, no data loaded yet)
  if (isLoading && flatItems.length === 0) {
    return <LoadingSkeleton count={20} />
  }

  // 2. Error state when no data is loaded yet
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

  // 3. Success state (with fallback inline error for subsequent loads)
  return (
    <div className="w-full flex flex-col items-center">
      {/* Grid container */}
      <PokemonGrid items={flatItems} />

      {/* Load More Button / Inline Error / End of List message */}
      <div className="mt-12 mb-6 flex justify-center w-full min-h-[50px]">
        {isError ? (
          <div className="flex flex-col items-center gap-3">
            <p className="text-red-500 text-sm font-semibold">
              Error loading next batch: {error?.message ?? 'Unknown error'}
            </p>
            <button
              type="button"
              onClick={() => fetchNextPage()}
              className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 shadow-sm"
            >
              Retry Loading More
            </button>
          </div>
        ) : hasNextPage ? (
          <button
            type="button"
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="inline-flex items-center justify-center min-w-[140px] px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 shadow-sm"
          >
            {isFetchingNextPage ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </button>
        ) : (
          <span className="text-xs md:text-sm text-gray-400 font-medium select-none">
            You've caught them all! ({flatItems.length} Pokémon shown)
          </span>
        )}
      </div>
    </div>
  )
}

export default LoadMoreView

