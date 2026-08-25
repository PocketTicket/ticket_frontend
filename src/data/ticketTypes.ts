import type { TicketType } from '../models/TicketType'

export const ticketTypes: TicketType[] = [
  {
    id: 1,
    eventId: 1,
    title: 'Standard Ticket',
    description: 'Eintritt zum Schulfest',
    price: 10,
    capacity: 200,
  },
  {
    id: 2,
    eventId: 1,
    title: 'VIP Ticket',
    description: 'Eintritt inklusive VIP-Bereich',
    price: 25,
    capacity: 50,
  },
  {
    id: 3,
    eventId: 2,
    title: 'Abiball Ticket',
    description: 'Eintritt zum Abiball',
    price: 35,
    capacity: 400,
  },
]