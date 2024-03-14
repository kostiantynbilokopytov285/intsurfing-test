import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'

import Loader from 'common/components/loader'

import TableActions from './components/table-actions'
import EnhancedTableHead from './components/table-header'
import { default as Row } from './components/table-row'

import { ROWS_PER_PAGE_OPTIONS } from './constants'
import useTable from './useTable'

const TableAll = () => {
  const {
    count,
    isFetching,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    order,
    orderBy,
    page,
    rowsPerPage,
    visibleRows
  } = useTable()

  if (isFetching > 0) return <Loader />

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {visibleRows?.map((pokemon) => {
            {
              // @ts-ignore need extend props from base react component
              return pokemon ? <Row key={pokemon?.name} {...pokemon} /> : null
            }
          })}
          <TablePagination
            ActionsComponent={TableActions}
            colSpan={3}
            count={count ?? 0}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
            slotProps={{
              select: {
                inputProps: {
                  'aria-label': 'rows per page'
                },
                native: true
              }
            }}
          />
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableAll
