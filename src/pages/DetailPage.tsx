import { useParams, Link } from 'react-router-dom'
import ErrorState from '../components/ui/ErrorState'
import TypeBadge from '../components/shared/TypeBadge'
import { usePokemonDetail } from '../hooks/usePokemonDetail'

const statLabelMap: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Attack',
  'special-defense': 'Sp. Defense',
  speed: 'Speed',
}



export function DetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError, error, refetch } = usePokemonDetail(id ?? '')

  // 1. Loading state
  if (isLoading) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-50/40 via-pink-50/20 to-white py-12 px-4 gap-4"
        role="status"
      >
        <div className="w-10 h-10 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 font-semibold text-sm">Loading Pokémon...</p>
      </div>
    )
  }

  // 2. Error state
  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-50/40 via-pink-50/20 to-white py-12 px-4 gap-6">
        <ErrorState
          message={error?.message ?? 'Pokémon details could not be found.'}
          onRetry={refetch}
        />
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm font-semibold text-gray-700 hover:text-gray-950 hover:border-gray-300 shadow-sm transition-all"
        >
          ← Back to List
        </Link>
      </div>
    )
  }

  // 3. Success state
  const capitalizedName = data.name.charAt(0).toUpperCase() + data.name.slice(1)
  const formattedId = `#${String(data.id).padStart(3, '0')}`
  const spriteUrl = data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-50/40 via-pink-50/20 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto flex flex-col items-start gap-4">
        {/* Back Link Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200/60 rounded bg-white text-xs font-semibold text-gray-700 hover:text-gray-950 hover:border-gray-300 shadow-sm transition-all"
        >
          ← Back to List
        </Link>

        {/* Pokémon Details Card */}
        <main className="w-full bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 py-8 px-6 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-extrabold flex items-center justify-center gap-2 tracking-tight">
              ⚡ {capitalizedName}
            </h2>
            <span className="inline-block text-xs font-bold bg-white/20 text-white/95 px-2.5 py-0.5 rounded-full mt-2 tracking-wider">
              {formattedId}
            </span>
          </div>

          {/* Card Body */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Left Column: Image, Type Badges, Height/Weight */}
            <div className="flex flex-col items-center">
              {/* Image Circle container */}
              <div className="w-48 h-48 md:w-56 md:h-56 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center shadow-inner overflow-hidden">
                {spriteUrl ? (
                  <img
                    src={spriteUrl}
                    alt={capitalizedName}
                    className="w-36 h-36 md:w-44 md:h-44 object-contain hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  /* Pokéball SVG Fallback */
                  <svg
                    className="w-20 h-20 text-gray-300"
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

              {/* Type Badges */}
              <div className="flex flex-wrap gap-2 justify-center mt-5">
                {data.types.map((t) => (
                  <TypeBadge key={t.slot} type={t.type.name} />
                ))}
              </div>

              {/* Height / Weight metrics (converted) */}
              <div className="grid grid-cols-2 gap-4 mt-6 w-full max-w-[280px]">
                <div className="flex flex-col items-center justify-center p-3 bg-gray-50/70 border border-gray-100 rounded-xl">
                  <span className="text-gray-400 text-xs font-bold flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    Height
                  </span>
                  <span className="text-gray-900 font-extrabold text-sm md:text-base mt-1">
                    {(data.height / 10).toFixed(1)} m
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center p-3 bg-gray-50/70 border border-gray-100 rounded-xl">
                  <span className="text-gray-400 text-xs font-bold flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                      />
                    </svg>
                    Weight
                  </span>
                  <span className="text-gray-900 font-extrabold text-sm md:text-base mt-1">
                    {(data.weight / 10).toFixed(1)} kg
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Base Stats, Abilities, Base Exp */}
            <div className="flex flex-col justify-between gap-6">
              {/* Base Stats */}
              <div>
                <h3 className="font-bold text-gray-900 text-sm md:text-base border-b border-gray-100 pb-2 mb-3">
                  Base Stats
                </h3>
                <div className="space-y-2.5">
                  {data.stats.map((s) => {
                    const label = statLabelMap[s.stat.name.toLowerCase()] || s.stat.name
                    const percentage = Math.min(100, (s.base_stat / 150) * 100)
                    return (
                      <div key={s.stat.name} className="flex items-center text-xs md:text-sm">
                        <span className="w-20 text-gray-500 font-semibold truncate">
                          {label}
                        </span>
                        <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden mx-3">
                          <div
                            className="bg-gray-900 h-full rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="w-8 text-right font-bold text-gray-700">
                          {s.base_stat}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Abilities */}
              <div>
                <h3 className="font-bold text-gray-900 text-sm md:text-base border-b border-gray-100 pb-2 mb-3">
                  Abilities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.abilities.map((a) => {
                    const cleanName = a.ability.name
                      .replace(/-/g, ' ')
                      .replace(/\b\w/g, (char) => char.toUpperCase())
                    return (
                      <span
                        key={a.ability.name}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 border border-gray-200/50 rounded-lg text-xs font-semibold text-gray-700 shadow-sm"
                      >
                        {cleanName}
                        {a.is_hidden && (
                          <span className="text-[10px] text-gray-400 font-medium select-none">
                            (Hidden)
                          </span>
                        )}
                      </span>
                    )
                  })}
                </div>
              </div>

              {/* Base Experience */}
              <div>
                <h3 className="font-bold text-gray-900 text-sm md:text-base border-b border-gray-100 pb-2 mb-2">
                  Base Experience
                </h3>
                <span className="text-xl md:text-2xl font-black text-purple-600">
                  {data.base_experience ? `${data.base_experience} XP` : '0 XP'}
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DetailPage

