import type { Event } from '../models/Event'

export const events: Event[] = [
  {
    id: 1,
    creatorId: 5,
    title: 'Schulfest 2026',
    description: 'Das jährliche Schulfest',
    location: 'Aula',
    date: '12.09.2026',
    capacity: 300,
    access: 'public',
  },
  {
    id: 2,
    creatorId: 5,
    title: 'Abiball 2027',
    description: 'Abiball unserer Schule',
    location: 'Stadthalle',
    date: '20.06.2027',
    capacity: 500,
    access: 'authenticated',
  },
]