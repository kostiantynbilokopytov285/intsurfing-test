import {
  keepPreviousData,
  useQuery,
  useQueries,
  useIsFetching
} from '@tanstack/react-query'

import { getPokemons, getPokemonById } from 'api/pokemons'
import QUERY_KEYS from 'common/enums'
import { Data, Order } from 'modules/table/types'

interface IUseAbilitiesProps {
  page: number
  rowsPerPage: number
  order: Order
  orderBy: keyof Data
}

const useAbilities = ({
  page,
  rowsPerPage,
  order,
  orderBy
}: IUseAbilitiesProps) => {
  const isFetching = useIsFetching()

  const { data: pokemons } = useQuery({
    queryKey: [QUERY_KEYS.GET_POKEMONS, page, rowsPerPage, order, orderBy],
    queryFn: () => getPokemons(rowsPerPage, page * rowsPerPage),
    placeholderData: keepPreviousData
  })

  const pokemonByIdQueries = useQueries({
    queries:
      pokemons?.results
        ?.flatMap(({ name }) => name)
        ?.flatMap((pokemonId) => {
          return {
            enabled: Boolean(pokemonId),
            queryKey: [
              `${QUERY_KEYS.GET_POKEMON_BY_ID} + ${pokemonId}`,
              pokemonId
            ],
            queryFn: () => getPokemonById(pokemonId),
            initialData: []
          }
        }) ?? []
  })

  const pokemonsWithDescription =
    pokemonByIdQueries?.map(({ data }) => data) ?? []
  const arePokemonsFilled = pokemonsWithDescription?.every((item) =>
    Boolean(item)
  )

  return {
    arePokemonsFilled,
    count: pokemons?.count,
    pokemons,
    pokemonsWithDescription,
    isFetching
  }
}

export default useAbilities
