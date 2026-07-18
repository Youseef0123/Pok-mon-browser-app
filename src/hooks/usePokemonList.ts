import { useInfiniteQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { getPokemonList } from '../services/pokemonService'
import type {
  PokemonListResponse,
  PokemonListItem,
} from '../types/pokemon.types'

export function usePokemonList(limit: number, viewKey: string) {
  const query = useInfiniteQuery<PokemonListResponse, Error>({
    queryKey: ['pokemon', 'list', viewKey, limit],
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
