import { api } from './ApiClient'
import { ENDPOINTS } from './endpoints'
import type { PokemonListResponse, PokemonDetail } from '../types/pokemon.types'

/**
 * Fetches a paginated list of Pokémon.
 */
export async function getPokemonList(
  limit: number,
  offset: number,
): Promise<PokemonListResponse> {
  const response = await api.get<PokemonListResponse>(
    ENDPOINTS.pokemon.list(limit, offset),
  )
  return response.data
}

/**
 * Fetches full details for a single Pokémon.
 */
export async function getPokemonById(
  id: string | number,
): Promise<PokemonDetail> {
  const response = await api.get<PokemonDetail>(
    ENDPOINTS.pokemon.byId(id),
  )
  return response.data
}
