import { snackData } from "./SnackData"

export interface Snack extends snackData {
  quantity: number
  subtotal: number
}
