import { Link } from 'react-router-dom'

export interface PokemonCardProps {
  name: string
  imageUrl: string | null
  id: number
}

export function PokemonCard({ name, imageUrl, id }: PokemonCardProps) {
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)
  const formattedId = `#${String(id).padStart(3, '0')}`

  return (
    <Link
      to={`/pokemon/${id}`}
      className="group flex flex-col h-full bg-white p-4 rounded-xl border border-gray-100/80 shadow-sm hover:shadow-md hover:scale-[1.02] hover:border-gray-200/80 transition-all duration-300 ease-out"
    >
      <div className="w-full aspect-[4/3] bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden mb-3 flex-shrink-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={capitalizedName}
            className="object-contain transition-transform duration-300 ease-out w-28 h-28 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <svg
            className="w-12 h-12 text-gray-300 transition-transform duration-500 ease-out group-hover:rotate-45"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <circle cx="12" cy="12" r="3" fill="white" />
          </svg>
        )}
      </div>

      {/* Pokémon details */}
      <div className="flex flex-col justify-center flex-grow min-w-0 text-center">
        <h3 className="text-base font-semibold leading-tight break-words text-gray-950">
          {capitalizedName}
        </h3>
        <span className="inline-block mt-1 text-xs font-medium text-gray-400">
          {formattedId}
        </span>
      </div>
    </Link>
  )
}

export default PokemonCard
