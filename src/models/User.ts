export type UserRole = 'user' | 'creator' | 'admin'
export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  role: UserRole
  schoolId?: number
}
