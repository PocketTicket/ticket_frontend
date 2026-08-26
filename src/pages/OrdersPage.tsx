import { Link } from 'react-router-dom'
import { useOrders } from '../context/OrderContext'
import { useTicketTypes } from '../context/TicketTypeContext'

function OrdersPage() {
  const { orders } = useOrders()
  const { ticketTypes } = useTicketTypes()

  function getOrderStatusLabel(status: string) {
    switch (status) {
      case 'pending':
        return 'In Bearbeitung'
      case 'confirmed':
        return 'Bestätigt'
      case 'cancelled':
        return 'Storniert'
      case 'completed':
        return 'Abgeschlossen'
      default:
        return status
    }
  }

  function getPaymentStatusLabel(status: string) {
    switch (status) {
      case 'pending':
        return 'Ausstehend'
      case 'paid':
        return 'Bezahlt'
      case 'failed':
        return 'Fehlgeschlagen'
      case 'refunded':
        return 'Erstattet'
      default:
        return status
    }
  }

  function getPaymentTypeLabel(type: string) {
    switch (type) {
      case 'invoice':
        return 'Rechnung'
      case 'creditCard':
        return 'Kreditkarte'
      case 'applePay':
        return 'Apple Pay'
      default:
        return type
    }
  }

  return (
    <div className="orders-page">
      <Link
        className="back-link"
        to="/"
      >
        ← Zurück zu den Veranstaltungen
      </Link>

      <div className="orders-header">
        <h1>Meine Bestellungen</h1>

        <p>
          {orders.length === 1
            ? '1 Bestellung'
            : `${orders.length} Bestellungen`}
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h2>Noch keine Bestellungen</h2>

          <p>
            Sobald du Tickets kaufst, findest du deine
            Bestellungen hier.
          </p>

          <Link to="/">
            Veranstaltungen ansehen →
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <article
              className="order-card"
              key={order.orderNumber}
            >
              <div className="order-card-header">
                <div>
                  <span className="order-label">
                    BESTELLUNG
                  </span>

                  <h2>
                    #{order.orderNumber}
                  </h2>
                </div>

                <span className="order-status">
                  {getOrderStatusLabel(
                    order.orderStatus
                  )}
                </span>
              </div>

              <div className="order-meta">
                <div>
                  <span>Datum</span>

                  <strong>
                    {new Date(
                      order.dateOrdered
                    ).toLocaleString('de-DE')}
                  </strong>
                </div>

                <div>
                  <span>Zahlungsart</span>

                  <strong>
                    {getPaymentTypeLabel(
                      order.paymentType
                    )}
                  </strong>
                </div>

                <div>
                  <span>Zahlungsstatus</span>

                  <strong>
                    {getPaymentStatusLabel(
                      order.paymentStatus
                    )}
                  </strong>
                </div>
              </div>

              <div className="order-tickets">
                <h3>Tickets</h3>

                {order.items.map((item) => {
                  const ticket = ticketTypes.find(
                    (ticket) =>
                      ticket.id ===
                      item.ticketTypeId
                  )

                  return (
                    <div
                      className="order-ticket-row"
                      key={item.ticketTypeId}
                    >
                      <div>
                        <strong>
                          {ticket?.title ??
                            `Ticket #${item.ticketTypeId}`}
                        </strong>

                        <span>
                          {item.quantity} ×{' '}
                          {item.pricePerItem.toFixed(2)} €
                        </span>
                      </div>

                      <strong>
                        {(
                          item.pricePerItem *
                          item.quantity
                        ).toFixed(2)}{' '}
                        €
                      </strong>
                    </div>
                  )
                })}
              </div>

              <div className="order-total">
                <span>Gesamt</span>

                <strong>
                  {order.total.toFixed(2)} €
                </strong>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrdersPage