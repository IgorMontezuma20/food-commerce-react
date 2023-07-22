import axios from 'axios'
import { snackData } from '../interfaces/SnackData'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

export const getBurgers = () => api.get<snackData[]>('/burgers')
export const getPizzas = () => api.get<snackData[]>('pizzas')
export const getDrinks = () => api.get<snackData[]>('/drinks')
export const getDesserts = () => api.get<snackData[]>('/desserts')

export default api
