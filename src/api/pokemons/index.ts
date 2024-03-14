import httpClient from 'api'

interface IAbility {
  name: string
  url: string
}

interface IStat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

interface IGetPokemonsResponse {
  count: number
  next: string
  previous: string
  results: IAbility[]
}

export interface IGetPokemonByIdResponse {
  base_experience: number
  id: number
  height: number
  name: string
  sprites: string[]
  stats: IStat[]
  weight: number
}

export const getPokemons = async (limit: number, offset: number) => {
  return (
    await httpClient.get<IGetPokemonsResponse>(
      `pokemon/?limit=${limit}&offset=${offset}`
    )
  ).data
}

export const getPokemonById = async (id: string) => {
  return (await httpClient.get<IGetPokemonByIdResponse>(`pokemon/${id}`)).data
}
