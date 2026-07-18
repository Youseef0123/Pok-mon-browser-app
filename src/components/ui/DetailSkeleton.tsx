export function DetailSkeleton() {
  return (
    <div className="max-w-2xl mx-auto w-full bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gray-200 animate-pulse py-8 px-6 text-center">
        <div className="h-7 w-40 bg-gray-300 rounded mx-auto animate-pulse" />
        <div className="h-4 w-16 bg-gray-300/70 rounded-full mx-auto mt-3 animate-pulse" />
      </div>

      {/* Card Body */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
        {/* Left Column: Image, Type Badges, Height/Weight */}
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 md:w-56 md:h-56 bg-gray-200 rounded-full mx-auto animate-pulse" />

          {/* Type Badges */}
          <div className="flex flex-wrap gap-2 justify-center mt-5">
            <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
          </div>

          {/* Height / Weight metrics */}
          <div className="grid grid-cols-2 gap-4 mt-6 w-full max-w-[280px]">
            <div className="h-16 bg-gray-100 rounded-xl animate-pulse" />
            <div className="h-16 bg-gray-100 rounded-xl animate-pulse" />
          </div>
        </div>

        {/* Right Column: Base Stats, Abilities, Base Exp */}
        <div className="flex flex-col justify-between gap-6">
          {/* Base Stats */}
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-3 animate-pulse" />
            <div className="space-y-2.5">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-3 w-14 bg-gray-200 rounded animate-pulse" />
                  <div className="flex-1 h-2 bg-gray-100 rounded-full animate-pulse" />
                  <div className="h-3 w-6 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Abilities */}
          <div>
            <div className="h-4 w-20 bg-gray-200 rounded mb-3 animate-pulse" />
            <div className="flex flex-wrap gap-2">
              <div className="h-6 w-20 bg-gray-100 rounded-lg animate-pulse" />
              <div className="h-6 w-24 bg-gray-100 rounded-lg animate-pulse" />
              <div className="h-6 w-16 bg-gray-100 rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Base Experience */}
          <div>
            <div className="h-4 w-32 bg-gray-200 rounded mb-2 animate-pulse" />
            <div className="h-6 w-20 bg-gray-300 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailSkeleton
