import EventCard from '../components/EventCard'
import { useEvents } from '../context/EventContext'

function EventsPage() {
  const { events } = useEvents()

  return (
    <div className="events-page">
      <section className="events-header">
        <div>
          <h1>Veranstaltungen</h1>
          <p>{events.length} Veranstaltungen verfügbar</p>
        </div>
      </section>

      <section className="event-list">
        {events.length === 0 ? (
          <p>Aktuell sind keine Veranstaltungen verfügbar.</p>
        ) : (
          events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))
        )}
      </section>
    </div>
  )
}

export default EventsPage