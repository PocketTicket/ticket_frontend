import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEvents } from '../context/EventContext'

function EditEventPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { events, updateEvent } = useEvents()

  const event = events.find(
    (event) => event.id === Number(id)
  )

  const [title, setTitle] = useState(event?.title ?? '')
  const [description, setDescription] = useState(
    event?.description ?? ''
  )
  const [location, setLocation] = useState(
    event?.location ?? ''
  )
  const [date, setDate] = useState(event?.date ?? '')
  const [capacity, setCapacity] = useState(
    event?.capacity.toString() ?? ''
  )

  if (!event) {
    return (
      <div>
        <h1>Veranstaltung nicht gefunden</h1>
        <Link to="/">Zurück zu den Veranstaltungen</Link>
      </div>
    )
  }

  function handleSubmit(
    submitEvent: React.FormEvent<HTMLFormElement>
  ) {
    submitEvent.preventDefault()

    updateEvent({
      ...event,
      title,
      description,
      location,
      date,
      capacity: Number(capacity),
    })

    navigate('/')
  }

  return (
    <div>
      <Link to="/">← Zurück</Link>

      <h1>Veranstaltung bearbeiten</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Titel</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Beschreibung</label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Ort</label>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Datum</label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Kapazität</label>

          <input
            type="number"
            min="1"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">
          Änderungen speichern
        </button>
      </form>
    </div>
  )
}

export default EditEventPage