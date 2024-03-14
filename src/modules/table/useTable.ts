import { useState, useMemo } from 'react'

import useAbilities from 'hooks/usePokemons'

import { getComparator, stableSort } from 'modules/table/utils'

import type { Data, Order } from 'modules/table/types'

const useTable = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)

  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof Data>('base_experience')

  const { arePokemonsFilled, count, isFetching, pokemonsWithDescription } =
    useAbilities({ order, orderBy, page, rowsPerPage })

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const visibleRows = useMemo(() => {
    // @ts-expect-error object could be never[]
    return stableSort(pokemonsWithDescription, getComparator(order, orderBy))
  }, [order, orderBy, page, rowsPerPage, pokemonsWithDescription])

  return {
    arePokemonsFilled,
    count,
    isFetching,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    page,
    pokemonsWithDescription,
    order,
    orderBy,
    rowsPerPage,
    visibleRows
  }
}

export default useTable
