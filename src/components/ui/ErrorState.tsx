import { AlertTriangle } from 'lucide-react'

export interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="max-w-sm mx-auto bg-white rounded-2xl border border-gray-100 shadow-md p-8 md:p-10 flex flex-col items-center text-center"
    >
      {/* Icon with soft circular background */}
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-5 flex-shrink-0">
        <AlertTriangle className="h-10 w-10 text-red-500" strokeWidth={2} aria-hidden="true" />
      </div>

      {/* Heading and Message */}
      <h3 className="text-xl font-bold text-gray-900">Oops!</h3>
      <p className="text-sm text-gray-500 mt-1.5">{message}</p>

      {/* Retry Button */}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 px-6 py-2.5 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-colors duration-200"
        >
          Retry
        </button>
      )}
    </div>
  )
}

export default ErrorState

