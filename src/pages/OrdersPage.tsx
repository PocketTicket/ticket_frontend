import { Link } from 'react-router-dom'
import { useOrders } from '../context/OrderContext'

function OrdersPage() {
  const { orders } = useOrders()

  return (
    <div>
      <Link to="/">← Zurück zu den Veranstaltungen</Link>

      <h1>Meine Bestellungen</h1>

      {orders.length === 0 ? (
        <p>Noch keine Bestellungen vorhanden.</p>
      ) : (
        orders.map((order) => (
          <div key={order.orderNumber}>
            <h2>Bestellung #{order.orderNumber}</h2>

            <p>Datum: {new Date(order.dateOrdered).toLocaleString()}</p>
            <p>Status: {order.orderStatus}</p>
            <p>Zahlungsart: {order.paymentType}</p>
            <p>Zahlungsstatus: {order.paymentStatus}</p>

            <h3>Tickets</h3>

            {order.items.map((item) => (
              <div key={item.ticketTypeId}>
                <p>
                  Ticket #{item.ticketTypeId} × {item.quantity}
                </p>

                <p>
                  Einzelpreis: {item.pricePerItem.toFixed(2)} €
                </p>

                <p>
                  Summe:{' '}
                  {(item.pricePerItem * item.quantity).toFixed(2)} €
                </p>
              </div>
            ))}

            <h3>
              Gesamtpreis: {order.total.toFixed(2)} €
            </h3>

            <hr />
          </div>
        ))
      )}
    </div>
  )
}

export default OrdersPage