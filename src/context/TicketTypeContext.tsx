import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import type { TicketType } from '../models/TicketType'
import { ticketTypes as initialTicketTypes } from '../data/ticketTypes'

type TicketTypeContextType = {
  ticketTypes: TicketType[]
  addTicketType: (ticketType: TicketType) => void
  updateTicketType: (ticketType: TicketType) => void
  deleteTicketType: (id: number) => void
}

const TicketTypeContext =
  createContext<TicketTypeContextType | undefined>(undefined)

export function TicketTypeProvider({
  children,
}: {
  children: ReactNode
}) {
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>(() => {
    const saved = localStorage.getItem('ticketTypes')

    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return initialTicketTypes
      }
    }

    return initialTicketTypes
  })

  useEffect(() => {
    localStorage.setItem(
      'ticketTypes',
      JSON.stringify(ticketTypes)
    )
  }, [ticketTypes])

  function addTicketType(ticketType: TicketType) {
    setTicketTypes((current) => [
      ...current,
      ticketType,
    ])
  }

  function updateTicketType(updatedTicketType: TicketType) {
    setTicketTypes((current) =>
      current.map((ticketType) =>
        ticketType.id === updatedTicketType.id
          ? updatedTicketType
          : ticketType
      )
    )
  }

  function deleteTicketType(id: number) {
    setTicketTypes((current) =>
      current.filter(
        (ticketType) => ticketType.id !== id
      )
    )
  }

  return (
    <TicketTypeContext.Provider
      value={{
        ticketTypes,
        addTicketType,
        updateTicketType,
        deleteTicketType,
      }}
    >
      {children}
    </TicketTypeContext.Provider>
  )
}

export function useTicketTypes() {
  const context = useContext(TicketTypeContext)

  if (!context) {
    throw new Error(
      'useTicketTypes muss innerhalb von TicketTypeProvider verwendet werden'
    )
  }

  return context
}
