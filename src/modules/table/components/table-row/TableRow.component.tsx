import { useState } from 'react'

import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'

import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import type { IGetPokemonByIdResponse } from 'api/pokemons'
import { Table, TableHead } from '@mui/material'

const Row = ({
  base_experience,
  id,
  height,
  name,
  stats,
  weight
}: IGetPokemonByIdResponse) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {name?.toUpperCase()}
        </TableCell>
        <TableCell component="th" scope="row">
          {id}
        </TableCell>
        <TableCell align="center">{base_experience}</TableCell>
        <TableCell align="center">{height}</TableCell>
        <TableCell align="center">{weight}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              width={100}
              height={100}
              alt="pokemon"
            />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Base Stat</TableCell>
                  <TableCell>Effort</TableCell>
                  <TableCell>Stat</TableCell>
                </TableRow>
              </TableHead>
              {stats?.map(({ base_stat, effort, stat }) => {
                return (
                  <TableRow key={stat.name}>
                    <TableCell>{stat.name}</TableCell>
                    <TableCell>{base_stat}</TableCell>
                    <TableCell>{effort}</TableCell>
                  </TableRow>
                )
              })}
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default Row
