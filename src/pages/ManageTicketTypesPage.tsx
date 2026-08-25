import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEvents } from '../context/EventContext'
import { useTicketTypes } from '../context/TicketTypeContext'

function ManageTicketTypesPage() {
  const { id } = useParams()
  const { events } = useEvents()

  const {
    ticketTypes,
    addTicketType,
    updateTicketType,
    deleteTicketType,
  } = useTicketTypes()

  const eventId = Number(id)

  const event = events.find(
    (event) => event.id === eventId
  )

  const eventTickets = ticketTypes.filter(
    (ticket) => ticket.eventId === eventId
  )

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [capacity, setCapacity] = useState('')

  const [editingId, setEditingId] =
    useState<number | null>(null)

  if (!event) {
    return (
      <div>
        <h1>Veranstaltung nicht gefunden</h1>
        <Link to="/">← Zurück</Link>
      </div>
    )
  }

  function resetForm() {
    setTitle('')
    setDescription('')
    setPrice('')
    setCapacity('')
    setEditingId(null)
  }

  function handleSubmit(
    submitEvent: React.FormEvent<HTMLFormElement>
  ) {
    submitEvent.preventDefault()

    if (editingId !== null) {
      updateTicketType({
        id: editingId,
        eventId,
        title,
        description,
        price: Number(price),
        capacity: Number(capacity),
      })
    } else {
      addTicketType({
        id: Date.now(),
        eventId,
        title,
        description,
        price: Number(price),
        capacity: Number(capacity),
      })
    }

    resetForm()
  }

  function handleEdit(ticketId: number) {
    const ticket = ticketTypes.find(
      (ticket) => ticket.id === ticketId
    )

    if (!ticket) {
      return
    }

    setEditingId(ticket.id)
    setTitle(ticket.title)
    setDescription(ticket.description)
    setPrice(ticket.price.toString())
    setCapacity(ticket.capacity.toString())
  }

  function handleDelete(ticketId: number) {
    const confirmed = window.confirm(
      'Möchtest du diese Ticketart wirklich löschen?'
    )

    if (confirmed) {
      deleteTicketType(ticketId)

      if (editingId === ticketId) {
        resetForm()
      }
    }
  }

  return (
    <div>
      <Link to="/">← Zurück</Link>

      <h1>Tickets verwalten</h1>

      <h2>{event.title}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Ticketname</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="z. B. Standard Ticket"
            required
          />
        </div>

        <br />

        <div>
          <label>Beschreibung</label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="z. B. Regulärer Eintritt"
            required
          />
        </div>

        <br />

        <div>
          <label>Preis in €</label>

          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Anzahl verfügbarer Tickets</label>

          <input
            type="number"
            min="1"
            value={capacity}
            onChange={(e) =>
              setCapacity(e.target.value)
            }
            required
          />
        </div>

        <br />

        <button type="submit">
          {editingId !== null
            ? 'Änderungen speichern'
            : 'Ticketart hinzufügen'}
        </button>

        {editingId !== null && (
          <>
            {' '}
            <button
              type="button"
              onClick={resetForm}
            >
              Abbrechen
            </button>
          </>
        )}
      </form>

      <hr />

      <h2>Vorhandene Ticketarten</h2>

      {eventTickets.length === 0 ? (
        <p>Noch keine Ticketarten vorhanden.</p>
      ) : (
        eventTickets.map((ticket) => (
          <div key={ticket.id}>
            <h3>{ticket.title}</h3>

            <p>{ticket.description}</p>
            <p>Preis: {ticket.price.toFixed(2)} €</p>
            <p>Verfügbar: {ticket.capacity}</p>

            <button
              type="button"
              onClick={() => handleEdit(ticket.id)}
            >
              Bearbeiten
            </button>

            {' '}

            <button
              type="button"
              onClick={() => handleDelete(ticket.id)}
            >
              Löschen
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  )
}

export default ManageTicketTypesPage