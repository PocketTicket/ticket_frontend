import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

import type { Event } from '../models/Event'
import { events as initialEvents } from '../data/events'

type EventContextType = {
  events: Event[]
  addEvent: (event: Event) => void
  updateEvent: (event: Event) => void
  deleteEvent: (id: number) => void
}

const EventContext = createContext<EventContextType | undefined>(
  undefined
)

export function EventProvider({
  children,
}: {
  children: ReactNode
}) {
  const [events, setEvents] = useState<Event[]>(() => {
    const savedEvents = localStorage.getItem('events')

    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents)

        return parsedEvents.map(
          (event: Partial<Event> & { isPublic?: boolean }) => ({
            ...event,

            access:
              event.access ??
              (event.isPublic === false
                ? 'authenticated'
                : 'public'),
          })
        ) as Event[]
      } catch {
        return initialEvents
      }
    }

    return initialEvents
  })

  useEffect(() => {
    localStorage.setItem(
      'events',
      JSON.stringify(events)
    )
  }, [events])

  function addEvent(event: Event) {
    setEvents((currentEvents) => [
      ...currentEvents,
      event,
    ])
  }

  function updateEvent(updatedEvent: Event) {
    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === updatedEvent.id
          ? updatedEvent
          : event
      )
    )
  }

  function deleteEvent(id: number) {
    setEvents((currentEvents) =>
      currentEvents.filter(
        (event) => event.id !== id
      )
    )
  }

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}

export function useEvents() {
  const context = useContext(EventContext)

  if (!context) {
    throw new Error(
      'useEvents muss innerhalb von EventProvider verwendet werden'
    )
  }

  return context
}