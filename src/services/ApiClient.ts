import axios from 'axios'

const DEFAULT_API_BASE_URL = 'https://pokeapi.co/api/v2'

const baseURL = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL

if (!import.meta.env.VITE_API_BASE_URL) {
  console.warn(
    `VITE_API_BASE_URL is not set. Falling back to ${DEFAULT_API_BASE_URL}. Create a .env file (see .env.example) to configure this explicitly.`,
  )
}

export const api = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message: string

    if (error.response) {
      switch (error.response.status) {
        case 404:
          message = 'Pokémon not found'
          break
        case 500:
          message = 'Server error, please try again'
          break
        default:
          message = 'Something went wrong while fetching data'
      }
    } else {
      message = 'Unable to connect. Please check your internet connection.'
    }

    console.error(message)

    return Promise.reject({ message, originalError: error })
  },
)
