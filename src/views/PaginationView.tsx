import { useState } from 'react'
import PokemonGrid from '../components/shared/PokemonGrid'
import ErrorState from '../components/ui/ErrorState'
import LoadingSkeleton from '../components/ui/LoadingSkeleton'
import { usePokemonPage } from '../hooks/usePokemonPage'

export function PaginationView() {
  const [page, setPage] = useState(1)
  const limit = 20

  const { data, isLoading, isError, error, refetch, totalPages } = usePokemonPage(page, limit)

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Generates the array of page numbers/ellipsis representing the pagination control
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    if (totalPages <= 1) return pages

    // If total pages is small, just show all pages
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
      return pages
    }

    pages.push(1)

    let start = page - 2
    let end = page + 2

    if (start <= 2) {
      start = 2
      end = Math.min(5, totalPages - 1)
    }
    if (end >= totalPages - 1) {
      end = totalPages - 1
      start = Math.max(2, totalPages - 4)
    }

    if (start > 2) {
      pages.push('…')
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (end < totalPages - 1) {
      pages.push('…')
    }

    pages.push(totalPages)
    return pages
  }

  // 1. Loading state (initial page load only)
  if (isLoading) {
    return <LoadingSkeleton count={20} />
  }

  // 2. Error state
  if (isError) {
    return (
      <div className="py-12">
        <ErrorState
          message={error?.message ?? 'Something went wrong while fetching Pokémon.'}
          onRetry={refetch}
        />
      </div>
    )
  }

  // 3. Success state
  const items = data?.results ?? []
  const pageNumbers = getPageNumbers()

  return (
    <div className="w-full flex flex-col items-center">
      {/* Grid container */}
      <PokemonGrid items={items} />

      {/* Pagination controls */}
      {totalPages > 1 && (
        <nav
          className="flex flex-col items-center mt-12 mb-6"
          aria-label="Pagination Navigation"
        >
          {/* Page Buttons Container */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {/* Previous Button */}
            <button
              type="button"
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
              ‹ Previous
            </button>

            {/* Page Numbers */}
            {pageNumbers.map((num, idx) => {
              if (num === '…') {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-2 py-1.5 text-sm font-semibold text-gray-400 select-none"
                  >
                    …
                  </span>
                )
              }

              const isCurrent = num === page
              return (
                <button
                  key={`page-${num}`}
                  type="button"
                  onClick={() => handlePageChange(num as number)}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 ${
                    isCurrent
                      ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {num}
                </button>
              )
            })}

            {/* Next Button */}
            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
            >
              Next ›
            </button>
          </div>

          {/* Page Info Caption */}
          <span className="text-xs md:text-sm text-gray-400 mt-4 font-medium">
            Page {page} of {totalPages} ({items.length} Pokémon shown)
          </span>
        </nav>
      )}
    </div>
  )
}

export default PaginationView

