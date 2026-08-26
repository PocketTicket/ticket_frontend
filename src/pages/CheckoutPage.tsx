import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useOrders } from '../context/OrderContext'
import type { Order, PaymentType } from '../models/Order'
import { useTicketTypes } from '../context/TicketTypeContext'

function CheckoutPage() {
  const { cartItems, clearCart } = useCart()
  const { addOrder } = useOrders()
  const { ticketTypes } = useTicketTypes()

  const [paymentType, setPaymentType] =
    useState<PaymentType>('invoice')

  const [order, setOrder] = useState<Order | null>(null)

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.pricePerItem * item.quantity,
    0
  )

  function handleCheckout() {
    if (cartItems.length === 0) {
      return
    }

    const newOrder: Order = {
      orderNumber: Date.now(),
      userId: 1,
      dateOrdered: new Date().toISOString(),
      orderStatus: 'confirmed',
      paymentType,
      paymentStatus: 'paid',
      items: [...cartItems],
      total: totalPrice,
    }

    addOrder(newOrder)
    setOrder(newOrder)
    clearCart()
  }

  if (order) {
    return (
      <div className="checkout-page">
        <div className="checkout-success">
          <span className="checkout-success-icon">
            ✓
          </span>

          <h1>Bestellung erfolgreich</h1>

          <p>
            Deine Bestellung wurde erfolgreich
            abgeschlossen.
          </p>

          <div className="checkout-success-box">
            <span>Bestellnummer</span>
            <strong>{order.orderNumber}</strong>
          </div>

          <div className="checkout-success-box">
            <span>Gesamt</span>
            <strong>
              {order.total.toFixed(2)} €
            </strong>
          </div>

          <Link to="/orders">
            <button>
              Meine Bestellungen
            </button>
          </Link>

          <br />
          <br />

          <Link to="/">
            Zurück zu den Veranstaltungen
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <Link
        className="back-link"
        to="/cart"
      >
        ← Zurück zum Warenkorb
      </Link>

      <div className="checkout-layout">
        <section className="checkout-main">
          <h1>Checkout</h1>

          <div className="checkout-section">
            <span className="checkout-step">
              1
            </span>

            <div>
              <h2>Deine Tickets</h2>

              {cartItems.map((item) => {
                const ticket = ticketTypes.find(
                  (ticket) =>
                    ticket.id ===
                    item.ticketTypeId
                )

                return (
                  <div
                    className="checkout-ticket"
                    key={item.ticketTypeId}
                  >
                    <div>
                      <strong>
                        {ticket?.title ??
                          `Ticket #${item.ticketTypeId}`}
                      </strong>

                      <p>
                        Menge: {item.quantity}
                      </p>
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
          </div>

          <div className="checkout-section">
            <span className="checkout-step">
              2
            </span>

            <div className="payment-area">
              <h2>Zahlungsart</h2>

              <div className="payment-options">
                <button
                  type="button"
                  className={
                    paymentType === 'invoice'
                      ? 'payment-option active'
                      : 'payment-option'
                  }
                  onClick={() =>
                    setPaymentType('invoice')
                  }
                >
                  <span className="payment-icon">
                    🧾
                  </span>

                  <span>
                    <strong>Rechnung</strong>
                    <small>
                      Zahlung per Rechnung
                    </small>
                  </span>

                  <span className="payment-check">
                    {paymentType === 'invoice'
                      ? '✓'
                      : ''}
                  </span>
                </button>

                <button
                  type="button"
                  className={
                    paymentType === 'creditCard'
                      ? 'payment-option active'
                      : 'payment-option'
                  }
                  onClick={() =>
                    setPaymentType('creditCard')
                  }
                >
                  <span className="payment-icon">
                    💳
                  </span>

                  <span>
                    <strong>Kreditkarte</strong>
                    <small>
                      Visa oder Mastercard
                    </small>
                  </span>

                  <span className="payment-check">
                    {paymentType === 'creditCard'
                      ? '✓'
                      : ''}
                  </span>
                </button>

                <button
                  type="button"
                  className={
                    paymentType === 'applePay'
                      ? 'payment-option active'
                      : 'payment-option'
                  }
                  onClick={() =>
                    setPaymentType('applePay')
                  }
                >
                  <span className="payment-icon">
                    
                  </span>

                  <span>
                    <strong>Apple Pay</strong>
                    <small>
                      Schnell und sicher bezahlen
                    </small>
                  </span>

                  <span className="payment-check">
                    {paymentType === 'applePay'
                      ? '✓'
                      : ''}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <aside className="checkout-summary">
          <h2>Zusammenfassung</h2>

          <div className="summary-row">
            <span>Zwischensumme</span>
            <span>
              {totalPrice.toFixed(2)} €
            </span>
          </div>

          <div className="summary-row">
            <span>Gebühren</span>
            <span>0,00 €</span>
          </div>

          <div className="summary-total">
            <span>Gesamt</span>

            <strong>
              {totalPrice.toFixed(2)} €
            </strong>
          </div>

          <button
            className="checkout-submit"
            onClick={handleCheckout}
          >
            Bestellung abschließen
          </button>

          <p className="checkout-note">
            Mit dem Abschluss der Bestellung
            bestätigst du deine Auswahl.
          </p>
        </aside>
      </div>
    </div>
  )
}

export default CheckoutPage