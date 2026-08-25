import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useCart } from '../context/CartContext'
import { useEvents } from '../context/EventContext'
import { useTicketTypes } from '../context/TicketTypeContext'
import { useUser } from '../context/UserContext'

function EventDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { events } = useEvents()
  const { ticketTypes } = useTicketTypes()
  const { addToCart, cartItems } = useCart()
  const { isLoggedIn } = useUser()

  const [showDescription, setShowDescription] =
    useState(false)

  const eventId = Number(id)

  const event = events.find(
    (event) => event.id === eventId
  )

  const availableTickets = ticketTypes.filter(
    (ticket) => ticket.eventId === eventId
  )

  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  if (!event) {
    return (
      <div>
        <h1>Veranstaltung nicht gefunden</h1>

        <Link to="/">
          ← Zurück
        </Link>
      </div>
    )
  }

  function handleAddToCart(
    ticketId: number,
    price: number
  ) {
    if (!isLoggedIn) {
      const shouldLogin = window.confirm(
        'Du musst angemeldet sein, um Tickets in den Warenkorb zu legen. Jetzt anmelden?'
      )

      if (shouldLogin) {
        navigate('/login')
      }

      return
    }

    addToCart(ticketId, price)
  }

  function getAccessLabel() {
    switch (event.access) {
      case 'authenticated':
        return 'Nur für angemeldete Nutzer'

      case 'school':
        return 'Nur mit Schulaccount'

      case 'code':
        return 'Nur mit Veranstaltungscode'

      default:
        return null
    }
  }

  const accessLabel = getAccessLabel()

  return (
    <div className="event-page">
      <Link
        className="back-link"
        to="/"
      >
        ← Zurück
      </Link>

      <section className="event-summary">
        <h1>{event.title}</h1>

        <p className="event-date-location">
          {event.date} · {event.location}
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
            ? 'Weniger Infos ↑'
            : 'Mehr Infos ↓'}
        </button>

        {showDescription && (
          <p className="event-description">
            {event.description}
          </p>
        )}

        {accessLabel && (
          <p className="event-access-notice">
            {accessLabel}
          </p>
        )}
      </section>

      <section className="ticket-section">
        <div className="ticket-section-header">
          <h2>Tickets</h2>

          {isLoggedIn && (
            <Link to="/cart">
              Warenkorb ({cartQuantity})
            </Link>
          )}
        </div>

        {availableTickets.length === 0 ? (
          <p>
            Für diese Veranstaltung sind noch keine
            Tickets verfügbar.
          </p>
        ) : (
          availableTickets.map((ticket) => (
            <article
              className="ticket-row"
              key={ticket.id}
            >
              <div className="ticket-row-info">
                <h3>{ticket.title}</h3>

                <p>{ticket.description}</p>

                <span className="ticket-availability">
                  Noch {ticket.capacity} verfügbar
                </span>
              </div>

              <div className="ticket-row-buy">
                <strong>
                  {ticket.price.toFixed(2)} €
                </strong>

                <button
                  onClick={() =>
                    handleAddToCart(
                      ticket.id,
                      ticket.price
                    )
                  }
                >
                  In den Warenkorb
                </button>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  )
}

export default EventDetailsPage