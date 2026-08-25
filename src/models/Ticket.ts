export type TicketStatus =
  | 'valid'
  | 'used'
  | 'cancelled'
  
export type Ticket = {
  id: number
  ticketTypeId: number
  orderId: number
  userId: number
  ticketCode: string
  status: TicketStatus
  createdAt: string
}