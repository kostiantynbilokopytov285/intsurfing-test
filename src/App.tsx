import { QueryClientProvider } from '@tanstack/react-query'

import queryClient from 'common/query-client'

import Table from 'modules/table'

import './App.css'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Table />
    </QueryClientProvider>
  )
}

export default App
