import { createContext, useState, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

import { snackData } from '../interfaces/SnackData'

import { snackEmoji } from '../helpers/snackEmoji'
import { CustomerData } from '../interfaces/CustomerData'

interface Snack extends snackData {
  quantity: number
  subtotal: number
}

interface UpdateCartProps {
  id: number
  snack: string
  newQuantity: number
}

interface removeSnackFromCartProps {
  id: number
  snack: string
}

interface CartContextProps {
  cart: Snack[]
  addSnackIntoCart: (snack: snackData) => void
  removeSnackFromCart: (snack: Snack) => void
  snackCartIncrement: (snack: Snack) => void
  snackCartDecrement: (snack: Snack) => void
  confirmOrder: () => void
  payOrder: (customer: CustomerData) => void
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextProps)

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Snack[]>([])
  const navigate = useNavigate()

  function addSnackIntoCart(snack: snackData): void {
    const snackExistentInCart = cart.find(
      (item) => item.snack === snack.snack && item.id === snack.id,
    )

    if (snackExistentInCart) {
      const newCart = cart.map((item) => {
        if (item.id === snack.id) {
          const quantity = item.quantity + 1
          const subtotal = item.price * quantity

          return { ...item, quantity, subtotal }
        }

        return item
      })

      toast.success(`Outro(a) ${snackEmoji(snack.snack)} ${snack.name} adicionado nos pedidos`)
      setCart(newCart)

      return
    }

    const newSnack = { ...snack, quantity: 1, subtotal: snack.price }
    const newCart = [...cart, newSnack]

    toast.success(`${snackEmoji(snack.snack)} ${snack.name} adicionado nos pedidos`)
    setCart(newCart)
  }

  function removeSnackFromCart(snack: Snack) {
    const newCart = cart.filter((item) => !(item.id === snack.id && item.snack === snack.snack))

    toast.success(`${snackEmoji(snack.snack)} ${snack.name} removido dos pedidos`)
    setCart(newCart)
  }

  function updateSnackQuantity(snack: Snack, newQuantity: number) {
    if (newQuantity <= 0) return

    const snackExistentInCart = cart.find(
      (item) => item.id === snack.id && item.snack === snack.snack,
    )

    if (!snackExistentInCart) return

    const newCart = cart.map((item) => {
      if (item.id === snackExistentInCart.id && item.snack === snackExistentInCart.snack) {
        return {
          ...item,
          quantity: newQuantity,
          subtotal: item.price * newQuantity,
        }
      }

      return item
    })

    setCart(newCart)
  }

  function snackCartIncrement(snack: Snack) {
    updateSnackQuantity(snack, snack.quantity + 1)
  }

  function snackCartDecrement(snack: Snack) {
    updateSnackQuantity(snack, snack.quantity - 1)
  }

  function confirmOrder() {
    navigate('/payment')
  }

  function payOrder(customer: CustomerData) {
    console.log('payOrder', cart, customer)

    return
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addSnackIntoCart,
        removeSnackFromCart,
        snackCartIncrement,
        snackCartDecrement,
        confirmOrder,
        payOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
