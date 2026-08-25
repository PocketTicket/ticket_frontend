import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'

export type UserRole = 'buyer' | 'organizer'

type UserContextType = {
  role: UserRole | null
  isLoggedIn: boolean
  login: (role: UserRole) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(
  undefined
)

export function UserProvider({
  children,
}: {
  children: ReactNode
}) {
  const [role, setRole] = useState<UserRole | null>(null)

  const isLoggedIn = role !== null

  function login(newRole: UserRole) {
    setRole(newRole)
  }

  function logout() {
    setRole(null)
  }

  return (
    <UserContext.Provider
      value={{
        role,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error(
      'useUser muss innerhalb von UserProvider verwendet werden'
    )
  }

  return context
}