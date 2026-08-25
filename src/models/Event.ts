export type EventAccess =
  | 'public'
  | 'authenticated'
  | 'school'
  | 'code'

export type Event = {
  id: number
  creatorId: number

  title: string
  description: string
  location: string
  date: string
  capacity: number

  access: EventAccess
  accessCode?: string
}