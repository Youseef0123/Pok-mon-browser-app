import type { PokemonListItem } from '../../types/pokemon.types'
import { extractIdFromUrl } from '../../utils/pokemon.utils'
import PokemonCard from './PokemonCard'

export interface PokemonGridProps {
  items: PokemonListItem[]
  className?: string
}

export function PokemonGrid({ items, className = '' }: PokemonGridProps) {
  return (
    <div
      className={`grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ${className}`.trim()}
    >
      {items.map((item) => {
        const id = extractIdFromUrl(item.url)
        const spriteUrl = id
          ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          : null

        return (
          <PokemonCard
            key={id}
            id={id}
            name={item.name}
            imageUrl={spriteUrl}
          />
        )
      })}
    </div>
  )
}

export default PokemonGrid

