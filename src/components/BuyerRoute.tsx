import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

type BuyerRouteProps = {
  children: React.ReactNode
}

function BuyerRoute({ children }: BuyerRouteProps) {
  const { role, isLoggedIn } = useUser()

  if (!isLoggedIn || role !== 'buyer') {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default BuyerRoute