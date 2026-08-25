import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useUser } from '../context/UserContext'

function Header() {
  const { cartItems } = useCart()
  const { role, isLoggedIn, logout } = useUser()
  const navigate = useNavigate()

  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header>
      <Link to="/">
        <h2>Ticketing</h2>
      </Link>

      <nav>
        <Link to="/">
          Veranstaltungen
        </Link>

        {isLoggedIn && role === 'buyer' && (
          <>
            <Link to="/orders">
              Meine Bestellungen
            </Link>

            <Link to="/cart">
              Warenkorb ({cartQuantity})
            </Link>
          </>
        )}

        {isLoggedIn && role === 'organizer' && (
          <Link to="/events/create">
            Veranstaltung erstellen
          </Link>
        )}

        {!isLoggedIn ? (
          <Link to="/login">
            Login
          </Link>
        ) : (
          <button
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  )
}

export default Header