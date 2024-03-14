export interface Data {
  _: number
  name: number
  id: number
  base_experience: number
  height: string
  weight: number
}

export interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

export type Order = 'asc' | 'desc'
