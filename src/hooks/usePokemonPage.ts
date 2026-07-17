import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { getPokemonList } from '../services/pokemonService'
import type { PokemonListResponse } from '../types/pokemon.types'

/**
 * Fetches a single page of the Pokémon list for direct page-number
 * navigation (e.g. jumping to page 5), as used by the Pagination View.
 * Unlike `usePokemonList`, which accumulates pages, this hook always
 * fetches exactly one page and replaces the previous page's data.
 */
export function usePokemonPage(page: number, limit: number) {
  const offset = (page - 1) * limit

  const query = useQuery<PokemonListResponse, Error>({
    queryKey: ['pokemon', 'page', page, limit],
    queryFn: () => getPokemonList(limit, offset),
    staleTime: 2 * 60 * 1000,
    placeholderData: keepPreviousData,
  })

  const totalPages = query.data ? Math.ceil(query.data.count / limit) : 0

  return { ...query, totalPages }
}
