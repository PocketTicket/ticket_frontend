import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useUser()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Nur Test-Login.
    // Später werden E-Mail und Passwort
    // an Keycloak / Backend geschickt.
    console.log('E-Mail:', email)
    console.log('Passwort eingegeben:', password.length > 0)

    login('buyer')
    navigate('/')
  }

  function loginAsOrganizer() {
    login('organizer')
    navigate('/')
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Anmelden</h1>

        <form onSubmit={handleLogin}>
          <div>
            <label>E-Mail</label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="name@schule.de"
              required
            />
          </div>

          <br />

          <div>
            <label>Passwort</label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Passwort"
              required
            />
          </div>

          <br />

          <button type="submit">
            Anmelden
          </button>
        </form>

        <hr />

        <h3>Andere Anmeldewege</h3>

        <button type="button" disabled>
          Mit Schul-Account anmelden
        </button>

        <br />
        <br />

        <button
          type="button"
          onClick={loginAsOrganizer}
        >
          Veranstalter-Testlogin
        </button>

       
      </div>
    </div>
  )
}

export default LoginPage