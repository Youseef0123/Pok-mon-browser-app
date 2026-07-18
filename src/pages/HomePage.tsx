import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ViewToggle, type ViewMode } from '../components/common/ViewToggle'
import PaginationView from '../views/PaginationView'
import LoadMoreView from '../views/LoadMoreView'
import InfiniteScrollView from '../views/InfiniteScrollView'
import { saveScrollPosition, getScrollPosition } from '../utils/scrollMemory'

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeView = (searchParams.get('view') as ViewMode) || 'pagination'

  const setActiveView = (view: ViewMode) => {
    setSearchParams({ view }, { replace: false })
  }

  // Continuously track scroll position for the current view, throttled to ~100ms
  const scrollTimeoutRef = useRef<number | null>(null)
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current !== null) return
      scrollTimeoutRef.current = window.setTimeout(() => {
        saveScrollPosition(activeView, window.scrollY)
        scrollTimeoutRef.current = null
      }, 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [activeView])

  // Restore the saved scroll position for this view once its content has rendered
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      window.scrollTo(0, getScrollPosition(activeView))
    })
    return () => cancelAnimationFrame(frame)
  }, [activeView])

  // Map view modes to their respective subtitle text
  const getSubtitle = (view: ViewMode): string => {
    switch (view) {
      case 'pagination':
        return 'Discover and explore Pokemon with page controls'
      case 'loadMore':
        return 'Discover and explore Pokemon with load more'
      case 'infiniteScroll':
        return 'Discover and explore Pokemon with infinite scroll'
      default:
        return ''
    }
  }

  // Render views conditionally based on the active selection
  const renderViewContent = () => {
    switch (activeView) {
      case 'pagination':
        return <PaginationView />
      case 'loadMore':
        return <LoadMoreView />
      case 'infiniteScroll':
        return <InfiniteScrollView />
      default:
        return null
    }
  }

  const backgroundByView: Record<ViewMode, string> = {
    pagination: 'from-blue-50/60 via-indigo-50/20 to-white',
    loadMore: 'from-amber-50/70 via-yellow-50/30 to-white',
    infiniteScroll: 'from-emerald-50/70 via-green-50/30 to-white',
  }

  return (
    <div className={`min-h-screen w-full bg-gradient-to-b transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8 ${backgroundByView[activeView]}`}>
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header Section */}
        <header className="text-center mb-8 flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-950 flex items-center justify-center gap-2">
            ⚡ Pokédex
          </h1>
          <p className="text-sm md:text-base text-gray-500 font-medium mt-2 max-w-md transition-all duration-300">
            {getSubtitle(activeView)}
          </p>
        </header>

        {/* View Toggle Controller */}
        <section className="mb-10" aria-label="List view toggle controls">
          <ViewToggle activeView={activeView} onChange={setActiveView} />
        </section>

        {/* Dynamic Content Area */}
        <main className="w-full mt-2" aria-label="Pokemon list content">
          {renderViewContent()}
        </main>
      </div>
    </div>
  )
}

export default HomePage
