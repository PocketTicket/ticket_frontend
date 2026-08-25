import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import OrganizerRoute from './components/OrganizerRoute'
import BuyerRoute from './components/BuyerRoute'

import EventsPage from './pages/EventsPage'
import EventDetailsPage from './pages/EventDetailsPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrdersPage from './pages/OrdersPage'
import CreateEventPage from './pages/CreateEventsPage'
import EditEventPage from './pages/EditPage'
import ManageTicketTypesPage from './pages/ManageTicketTypesPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<EventsPage />} />

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/events/:id"
            element={<EventDetailsPage />}
          />

          <Route
            path="/cart"
            element={
              <BuyerRoute>
                <CartPage />
              </BuyerRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <BuyerRoute>
                <CheckoutPage />
              </BuyerRoute>
            }
          />

          <Route
            path="/orders"
            element={
              <BuyerRoute>
                <OrdersPage />
              </BuyerRoute>
            }
          />

          <Route
            path="/events/create"
            element={
              <OrganizerRoute>
                <CreateEventPage />
              </OrganizerRoute>
            }
          />

          <Route
            path="/events/:id/edit"
            element={
              <OrganizerRoute>
                <EditEventPage />
              </OrganizerRoute>
            }
          />

          <Route
            path="/events/:id/tickets"
            element={
              <OrganizerRoute>
                <ManageTicketTypesPage />
              </OrganizerRoute>
            }
          />
        </Routes>
      </main>
    </>
  )
}

export default App