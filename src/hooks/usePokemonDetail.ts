import { useQuery } from '@tanstack/react-query'
import { getPokemonById } from '../services/pokemonService'
import type { PokemonDetail } from '../types/pokemon.types'

/**
 * Fetches details for a single Pokémon by id or name.
 *
 * `data` will be `undefined` while the query is loading, if it errors, or
 * while it is disabled (i.e. `id` is falsy).
 */
export function usePokemonDetail(id: string | number) {
  return useQuery<PokemonDetail, Error>({
    queryKey: ['pokemon', 'detail', id],
    queryFn: () => getPokemonById(id),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  })
}
