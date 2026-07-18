export interface LoadingSkeletonProps {
  count?: number
  className?: string
}

export function LoadingSkeleton({
  count = 8,
  className = '',
}: LoadingSkeletonProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${className}`.trim()}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="p-4 rounded-xl border border-gray-100/80 shadow-sm bg-white"
        >
          <div className="w-full aspect-[4/3] bg-gray-200 rounded-lg mb-3 animate-pulse" />
          <div className="h-4 w-20 bg-gray-200 rounded mx-auto animate-pulse" />
          <div className="h-3 w-10 bg-gray-100 rounded mx-auto mt-2 animate-pulse" />
        </div>
      ))}
    </div>
  )
}

export default LoadingSkeleton
