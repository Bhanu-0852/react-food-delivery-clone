import {useState} from 'react'
import {useNavigate, Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [demoBadge, setDemoBadge] = useState(false)   // ← new
  const navigate = useNavigate()

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />
  }

  const fillDemoCredentials = () => {      // ← new
    setUsername('rahul')
    setPassword('rahul@2021')
    setDemoBadge(true)
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    navigate('/', {replace: true})
  }

  const onSubmitFailure = errorMsg => {
    setShowSubmitError(true)
    setErrorMsg(errorMsg)
  }

  const submitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  return (
    <div className="login-container">
      <div className="login-image-container">
        <img
          src="https://res.cloudinary.com/dakquidzb/image/upload/v1775288298/Rectangle_1457login_landing_mobile_img_gmeczt.png"
          alt="website login"
          className="login-website-image-mobile"
        />
        <img
          src="https://res.cloudinary.com/dakquidzb/image/upload/v1775288304/Rectangle_1456login_landing_desktop_img_pooegp.png"
          alt="website login"
          className="login-website-image-desktop"
        />
      </div>

      <div className="form-container">
        <form className="login-form" onSubmit={submitForm}>
          <div className="logo-container">
            <img
              src="https://res.cloudinary.com/dakquidzb/image/upload/v1775288296/Frame_274website_logo_wa8qbm.png"
              alt="website logo"
              className="login-website-logo"
            />
            <h1 className="logo-heading">Tasty Kitchens</h1>
          </div>

          <h1 className="login-heading">Login</h1>

          <div className="input-container">
            <label className="input-label" htmlFor="username">USERNAME</label>
            <input
              type="text"
              id="username"
              className="login-input"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label className="input-label" htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              className="login-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {showSubmitError && <p className="error-message">{errorMsg}</p>}

          {/* ↓ Demo credentials button */}
          <button
            type="button"
            className="demo-button"
            onClick={fillDemoCredentials}
          >
            Use demo credentials
          </button>

          {demoBadge && (
            <p className="demo-hint">
              ✓ Filled — Username: <strong>rahul</strong> · Password: <strong>rahul@2021</strong>
            </p>
          )}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
