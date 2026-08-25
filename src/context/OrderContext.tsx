import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'

import type { Order } from '../models/Order'

type OrderContextType = {
  orders: Order[]
  addOrder: (order: Order) => void
}

const OrderContext = createContext<OrderContextType | undefined>(
  undefined
)

export function OrderProvider({
  children,
}: {
  children: ReactNode
}) {
  const [orders, setOrders] = useState<Order[]>([])

  function addOrder(order: Order) {
    setOrders((currentOrders) => [
      ...currentOrders,
      order,
    ])
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)

  if (!context) {
    throw new Error(
      'useOrders muss innerhalb von OrderProvider verwendet werden'
    )
  }

  return context
}