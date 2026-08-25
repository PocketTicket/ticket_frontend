import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useOrders } from '../context/OrderContext'
import type { Order, PaymentType } from '../models/Order'

function CheckoutPage() {
  const { cartItems, clearCart } = useCart()
  const { addOrder } = useOrders()

  const [paymentType, setPaymentType] =
    useState<PaymentType>('creditCard')

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
      paymentType: paymentType,
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
      <div>
        <h1>Bestellung erfolgreich</h1>

        <p>Bestellnummer: {order.orderNumber}</p>
        <p>Gesamtpreis: {order.total.toFixed(2)} €</p>
        <p>Zahlungsart: {order.paymentType}</p>
        <p>Bestellstatus: {order.orderStatus}</p>

        <Link to="/orders">
          Meine Bestellungen
        </Link>

        <br />

        <Link to="/">
          Zurück zu den Veranstaltungen
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1>Checkout</h1>

      {cartItems.length === 0 ? (
        <>
          <p>Dein Warenkorb ist leer.</p>
          <Link to="/">Zurück zu den Veranstaltungen</Link>
        </>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.ticketTypeId}>
              <p>
                Ticket #{item.ticketTypeId} × {item.quantity}
              </p>

              <p>
                {(item.pricePerItem * item.quantity).toFixed(2)} €
              </p>
            </div>
          ))}

          <h2>Gesamt: {totalPrice.toFixed(2)} €</h2>

          <h3>Zahlungsart</h3>

          <select
            value={paymentType}
            onChange={(event) =>
              setPaymentType(
                event.target.value as PaymentType
              )
            }
          >
            <option value="creditCard">Kreditkarte</option>
            <option value="applePay">Apple Pay</option>
            <option value="invoice">Rechnung</option>
          </select>

          <br />
          <br />

          <button onClick={handleCheckout}>
            Bestellung abschließen
          </button>

          <br />
          <br />

          <Link to="/cart">
            ← Zurück zum Warenkorb
          </Link>
        </>
      )}
    </div>
  )
}

export default CheckoutPage