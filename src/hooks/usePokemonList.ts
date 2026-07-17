import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { getPokemonList } from '../services/pokemonService'
import type {
  PokemonListResponse,
  PokemonListItem,
} from '../types/pokemon.types'

/**
 * Fetches Pokémon list pages via sequential accumulation, shared by the
 * Load More View and the Infinite Scroll View — both append pages as more
 * are requested, unlike `usePokemonPage`, which jumps directly to an
 * arbitrary page number and replaces the current page's data.
 */
export function usePokemonList(limit: number) {
  const query = useInfiniteQuery<PokemonListResponse, Error>({
    queryKey: ['pokemon', 'list', limit],
    queryFn: ({ pageParam }) => getPokemonList(limit, pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined
      const offset = new URL(lastPage.next).searchParams.get('offset')
      return offset !== null ? Number(offset) : undefined
    },
    staleTime: 2 * 60 * 1000,
  })

  const flatItems = useMemo<PokemonListItem[]>(
    () => query.data?.pages.flatMap((page) => page.results) ?? [],
    [query.data],
  )

  return { ...query, flatItems }
}
