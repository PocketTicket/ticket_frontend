import type { CartItem } from './CartItem'
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed'


  export type PaymentStatus =
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded'

  export type PaymentType =
  | 'applePay'
  | 'invoice'
  | 'creditCard'

export type Order = {
  orderNumber: number
  userId: number
  dateOrdered: string
  orderStatus: string
  paymentType: string
  paymentStatus: string
  items: CartItem[]
  total: number
}