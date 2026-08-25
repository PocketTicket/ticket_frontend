import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useEvents } from '../context/EventContext'
import type { EventAccess } from '../models/Event'

function CreateEventsPage() {
  const { addEvent } = useEvents()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [capacity, setCapacity] = useState('')

  const [access, setAccess] =
    useState<EventAccess>('public')

  const [accessCode, setAccessCode] = useState('')

  function handleSubmit(
    submitEvent: React.FormEvent<HTMLFormElement>
  ) {
    submitEvent.preventDefault()

    addEvent({
      id: Date.now(),
      creatorId: 1,
      title,
      description,
      location,
      date,
      capacity: Number(capacity),
      access,
      accessCode:
        access === 'code'
          ? accessCode
          : undefined,
    })

    navigate('/')
  }

  return (
    <div>
      <Link to="/">← Zurück</Link>

      <h1>Veranstaltung erstellen</h1>

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
            onChange={(e) =>
              setDescription(e.target.value)
            }
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
            onChange={(e) =>
              setCapacity(e.target.value)
            }
            required
          />
        </div>

        <hr />

        <h2>Zugang</h2>

        <div>
          <label>
            Wer darf die Veranstaltung sehen und Tickets kaufen?
          </label>

          <select
            value={access}
            onChange={(e) =>
              setAccess(
                e.target.value as EventAccess
              )
            }
          >
            <option value="public">
              Jeder
            </option>

            <option value="authenticated">
              Nur angemeldete Nutzer
            </option>

            <option value="school">
              Nur Schulaccount
            </option>

            <option value="code">
              Nur mit Veranstaltungscode
            </option>
          </select>
        </div>

        {access === 'code' && (
          <>
            <br />

            <div>
              <label>Veranstaltungscode</label>

              <input
                type="text"
                value={accessCode}
                onChange={(e) =>
                  setAccessCode(e.target.value)
                }
                required
              />
            </div>
          </>
        )}

        <br />
        <br />

        <button type="submit">
          Veranstaltung erstellen
        </button>
      </form>
    </div>
  )
}

export default CreateEventsPage