export type ViewMode = 'pagination' | 'loadMore' | 'infiniteScroll'

export interface ViewToggleProps {
  activeView: ViewMode
  onChange: (view: ViewMode) => void
}

export function ViewToggle({ activeView, onChange }: ViewToggleProps) {
  const options: { value: ViewMode; label: string }[] = [
    { value: 'pagination', label: 'Page Controls' },
    { value: 'loadMore', label: 'Load More' },
    { value: 'infiniteScroll', label: 'Infinite Scroll' },
  ]

  return (
    <div className="inline-flex bg-white border border-gray-100 p-1.5 rounded-full shadow-sm gap-1">
      {options.map((option) => {
        const isActive = activeView === option.value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`
              px-4 py-1.5 text-xs md:text-sm font-semibold rounded-full transition-all duration-200 ease-in-out whitespace-nowrap
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2
              ${
                isActive
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'bg-transparent text-gray-500 hover:text-gray-900'
              }
            `.trim()}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default ViewToggle

