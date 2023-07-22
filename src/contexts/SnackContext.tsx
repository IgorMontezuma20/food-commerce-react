import { createContext, useState, useEffect, ReactNode } from 'react'

import { snackData } from '../interfaces/SnackData'

import { getBurgers, getPizzas, getDrinks, getDesserts } from '../services/api'

interface SnackContextProps {
  burgers: snackData[]
  pizzas: snackData[]
  drinks: snackData[]
  desserts: snackData[]
}

interface SnackProviderProps {
  children: ReactNode
}

export const SnackContext = createContext({} as SnackContextProps)

export function SnackProvider({ children }: SnackProviderProps) {
  const [burgers, setBurgers] = useState<snackData[]>([])
  const [pizzas, setPizzas] = useState<snackData[]>([])
  const [drinks, setDrinks] = useState<snackData[]>([])
  const [desserts, setDesserts] = useState<snackData[]>([])

  useEffect(() => {
    ;(async () => {
      try {
        const burgerRequest = await getBurgers()
        const pizzaRequest = await getPizzas()
        const drinkRequest = await getDrinks()
        const dessertRequest = await getDesserts()

        const requests = [burgerRequest, pizzaRequest, drinkRequest, dessertRequest]

        const [
          { data: burgerResponse },
          { data: pizzaResponse },
          { data: drinkResponse },
          { data: dessertResponse },
        ] = await Promise.all(requests)

        setBurgers(burgerResponse)
        setPizzas(pizzaResponse)
        setDrinks(drinkResponse)
        setDesserts(dessertResponse)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  return (
    <SnackContext.Provider value={{ burgers, pizzas, drinks, desserts }}>
      {children}
    </SnackContext.Provider>
  )
}
