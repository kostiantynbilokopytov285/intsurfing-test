import axios from 'axios'

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_APP_DEV_API_PATH
})

export default httpClient
