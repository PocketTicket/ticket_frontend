import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'

import type { CartItem } from '../models/CartItem'

type CartContextType = {
  cartItems: CartItem[]

  addToCart: (
    ticketTypeId: number,
    pricePerItem: number
  ) => void

  increaseQuantity: (ticketTypeId: number) => void
  decreaseQuantity: (ticketTypeId: number) => void
  deleteItem: (ticketTypeId: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(
  undefined
)

export function CartProvider({
  children,
}: {
  children: ReactNode
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function addToCart(
    ticketTypeId: number,
    pricePerItem: number
  ) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.ticketTypeId === ticketTypeId
      )

      if (existingItem) {
        return currentItems.map((item) =>
          item.ticketTypeId === ticketTypeId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      }

      return [
        ...currentItems,
        {
          ticketTypeId,
          quantity: 1,
          pricePerItem,
        },
      ]
    })
  }

  function increaseQuantity(ticketTypeId: number) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.ticketTypeId === ticketTypeId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    )
  }

  function decreaseQuantity(ticketTypeId: number) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.ticketTypeId === ticketTypeId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  function deleteItem(ticketTypeId: number) {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.ticketTypeId !== ticketTypeId
      )
    )
  }

  function clearCart() {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        deleteItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      'useCart muss innerhalb von CartProvider verwendet werden'
    )
  }

  return context
}