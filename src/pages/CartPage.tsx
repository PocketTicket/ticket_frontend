import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useTicketTypes } from '../context/TicketTypeContext'

function CartPage() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    deleteItem,
  } = useCart()

  const { ticketTypes } = useTicketTypes()

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.pricePerItem * item.quantity,
    0
  )

  return (
    <div className="cart-page">
      <Link className="back-link" to="/">
        ← Zurück zu den Veranstaltungen
      </Link>

      <div className="cart-header">
        <h1>Warenkorb</h1>

        <span>
          {cartItems.reduce(
            (total, item) => total + item.quantity,
            0
          )}{' '}
          Tickets
        </span>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Dein Warenkorb ist leer</h2>

          <p>
            Entdecke Veranstaltungen und füge Tickets hinzu.
          </p>

          <Link to="/">
            Veranstaltungen ansehen →
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-items">
            {cartItems.map((item) => {
              const ticket = ticketTypes.find(
                (ticket) =>
                  ticket.id === item.ticketTypeId
              )

              return (
                <article
                  className="cart-item"
                  key={item.ticketTypeId}
                >
                  <div className="cart-item-info">
                    <span className="cart-item-label">
                      TICKET
                    </span>

                    <h2>
                      {ticket?.title ??
                        `Ticket #${item.ticketTypeId}`}
                    </h2>

                    {ticket?.description && (
                      <p>{ticket.description}</p>
                    )}

                    <button
                      type="button"
                      className="cart-remove"
                      onClick={() =>
                        deleteItem(item.ticketTypeId)
                      }
                    >
                      Entfernen
                    </button>
                  </div>

                  <div className="cart-quantity">
                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(
                          item.ticketTypeId
                        )
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(
                          item.ticketTypeId
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-item-price">
                    <strong>
                      {(
                        item.pricePerItem *
                        item.quantity
                      ).toFixed(2)}{' '}
                      €
                    </strong>

                    <span>
                      {item.pricePerItem.toFixed(2)} €
                      pro Ticket
                    </span>
                  </div>
                </article>
              )
            })}
          </section>

          <aside className="cart-summary">
            <h2>Zusammenfassung</h2>

            <div className="summary-row">
              <span>Zwischensumme</span>
              <span>{totalPrice.toFixed(2)} €</span>
            </div>

            <div className="summary-row">
              <span>Gebühren</span>
              <span>0,00 €</span>
            </div>

            <div className="summary-total">
              <span>Gesamt</span>
              <strong>{totalPrice.toFixed(2)} €</strong>
            </div>

            <Link to="/checkout">
              <button className="checkout-button">
                Weiter zur Kasse
              </button>
            </Link>
          </aside>
        </div>
      )}
    </div>
  )
}

export default CartPage