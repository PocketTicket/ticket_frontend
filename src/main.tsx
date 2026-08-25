import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { CartProvider } from './context/CartContext'
import { OrderProvider } from './context/OrderContext'
import { EventProvider } from './context/EventContext'
import { TicketTypeProvider } from './context/TicketTypeContext'
import { UserProvider } from './context/UserContext'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <EventProvider>
          <TicketTypeProvider>
            <CartProvider>
              <OrderProvider>
                <App />
              </OrderProvider>
            </CartProvider>
          </TicketTypeProvider>
        </EventProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
)