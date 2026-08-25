import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

type OrganizerRouteProps = {
  children: React.ReactNode
}

function OrganizerRoute({
  children,
}: OrganizerRouteProps) {
  const { role } = useUser()

  if (role !== 'organizer') {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default OrganizerRoute