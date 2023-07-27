import axios from 'axios'
import { snackData } from '../interfaces/SnackData'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

export const getBurgers = () => api.get<snackData[]>('/snacks?snack=burger')
export const getPizzas = () => api.get<snackData[]>('snacks?snack=pizza')
export const getDrinks = () => api.get<snackData[]>('snacks?snack=drink')
export const getDesserts = () => api.get<snackData[]>('snacks?snack=ice-cream')

export default api
