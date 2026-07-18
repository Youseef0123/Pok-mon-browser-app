export interface TypeBadgeProps {
  type: string
}

export function TypeBadge({ type }: TypeBadgeProps) {
  const capitalized = type.charAt(0).toUpperCase() + type.slice(1)

  const colors: Record<string, string> = {
    normal: 'bg-gray-100 text-gray-800 border-gray-200',
    fire: 'bg-red-100 text-red-800 border-red-200',
    water: 'bg-blue-100 text-blue-800 border-blue-200',
    grass: 'bg-green-100 text-green-800 border-green-200',
    electric: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    ice: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    fighting: 'bg-orange-100 text-orange-800 border-orange-200',
    poison: 'bg-purple-100 text-purple-800 border-purple-200',
    ground: 'bg-amber-100 text-amber-800 border-amber-200',
    flying: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    psychic: 'bg-pink-100 text-pink-800 border-pink-200',
    bug: 'bg-lime-100 text-lime-800 border-lime-200',
    rock: 'bg-yellow-200 text-yellow-900 border-yellow-300',
    ghost: 'bg-violet-100 text-violet-800 border-violet-200',
    dragon: 'bg-violet-200 text-violet-900 border-violet-300',
    dark: 'bg-gray-700 text-gray-100 border-gray-800',
    steel: 'bg-slate-200 text-slate-800 border-slate-300',
    fairy: 'bg-pink-100 text-pink-800 border-pink-200',
  }

  const colorClasses = colors[type.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200'

  return (
    <span className={`px-3 py-1 text-xs font-extrabold rounded-full border shadow-sm ${colorClasses}`}>
      {capitalized}
    </span>
  )
}

export default TypeBadge
