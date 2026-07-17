export interface PokemonListItem {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

export interface PokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonStat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface PokemonAbility {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

export interface PokemonSprites {
  front_default: string | null
  other?: {
    'official-artwork'?: {
      front_default: string | null
    }
  }
}

export interface PokemonDetail {
  id: number
  name: string
  /** Raw API value in decimetres, NOT metres. Convert at the display component level. */
  height: number
  /** Raw API value in hectograms, NOT kilograms. Convert at the display component level. */
  weight: number
  base_experience: number
  sprites: PokemonSprites
  types: PokemonType[]
  stats: PokemonStat[]
  abilities: PokemonAbility[]
}
