import { useState } from 'react'
import { Link } from 'react-router-dom'

import type { Event } from '../models/Event'
import { useEvents } from '../context/EventContext'
import { useTicketTypes } from '../context/TicketTypeContext'
import { useUser } from '../context/UserContext'

type EventCardProps = {
  event: Event
}

function EventCard({ event }: EventCardProps) {
  const [showDescription, setShowDescription] =
    useState(false)

  const { deleteEvent } = useEvents()
  const { ticketTypes, deleteTicketType } =
    useTicketTypes()

  const { role } = useUser()

  function handleDelete() {
    const confirmed = window.confirm(
      `Möchtest du "${event.title}" wirklich löschen?`
    )

    if (!confirmed) {
      return
    }

    const eventTickets = ticketTypes.filter(
      (ticket) => ticket.eventId === event.id
    )

    eventTickets.forEach((ticket) => {
      deleteTicketType(ticket.id)
    })

    deleteEvent(event.id)
  }

  return (
    <article className="event-list-item">
      <div className="event-list-content">
        <span className="event-list-date">
          {event.date}
        </span>

        <h2>{event.title}</h2>

        <p className="event-list-location">
          {event.location}
        </p>

        <button
          type="button"
          className="description-toggle"
          onClick={() =>
            setShowDescription(
              (current) => !current
            )
          }
        >
          {showDescription
            ? 'Weniger anzeigen ↑'
            : 'Mehr Infos ↓'}
        </button>

        {showDescription && (
          <p className="event-list-description">
            {event.description}
          </p>
        )}
      </div>

      <div className="event-list-actions">
        <Link
          className="event-ticket-link"
          to={`/events/${event.id}`}
        >
          Tickets ansehen →
        </Link>

        {role === 'organizer' && (
          <div className="organizer-actions">
            <Link to={`/events/${event.id}/edit`}>
              Bearbeiten
            </Link>

            <Link to={`/events/${event.id}/tickets`}>
              Tickets verwalten
            </Link>

            <button
              type="button"
              className="text-button"
              onClick={handleDelete}
            >
              Löschen
            </button>
          </div>
        )}
      </div>
    </article>
  )
}

export default EventCard