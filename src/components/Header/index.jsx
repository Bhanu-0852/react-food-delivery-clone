import {useState} from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineClose} from 'react-icons/ai'
import './index.css'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMenu = () => setIsMobileMenuOpen(false)

  const activePath = location.pathname

  return (
    <nav className="nav-header">
      <div className="nav-content">
        {/* --- MOBILE NAV BAR --- */}
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <div className="logo-title-container">
              <img
                className="website-logo"
                src="https://res.cloudinary.com/dakquidzb/image/upload/v1775288296/Frame_274website_logo_wa8qbm.png"
                alt="website logo"
              />
              <h1 className="header-title">Tasty Kitchens</h1>
            </div>
          </Link>
          <button type="button" className="nav-mobile-btn" onClick={toggleMenu}>
            <GiHamburgerMenu size="24" />
          </button>
        </div>
        {/* --- DESKTOP NAV BAR --- */}
        <div className="nav-bar-large-container">
          <Link to="/" className="logo-title-container-desktop">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dakquidzb/image/upload/v1775288296/Frame_274website_logo_wa8qbm.png"
              alt="website logo"
            />
            <h1 className="header-title">Tasty Kitchens</h1>
          </Link>

          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link
                to="/"
                className={`nav-link ${
                  activePath === '/' ? 'active-nav-link' : ''
                }`}
              >
                Home
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link
                to="/profile"
                className={`nav-link ${
                  activePath === '/profile' ? 'active-nav-link' : ''
                }`}
              >
                Profile
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link
                to="/cart"
                className={`nav-link ${
                  activePath === '/cart' ? 'active-nav-link' : ''
                }`}
              >
                Cart
              </Link>
            </li>
            <li className="nav-menu-item">
              <button
                type="button"
                className="logout-desktop-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul className="nav-menu-list-mobile">
            <li className="nav-menu-item-mobile">
              <Link
                to="/"
                className={`nav-link-mobile ${
                  activePath === '/' ? 'active-nav-link' : ''
                }`}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li className="nav-menu-item-mobile">
              <Link
                to="/profile"
                className={`nav-link-mobile ${
                  activePath === '/profile' ? 'active-nav-link' : ''
                }`}
              >
                Profile
              </Link>
            </li>
            <li className="nav-menu-item-mobile">
              <Link
                to="/cart"
                className={`nav-link-mobile ${
                  activePath === '/cart' ? 'active-nav-link' : ''
                }`}
                onClick={closeMenu}
              >
                Cart
              </Link>
            </li>
            <li className="nav-menu-item-mobile">
              <button
                type="button"
                className="logout-mobile-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
          <button type="button" className="close-menu-btn" onClick={closeMenu}>
            <AiOutlineClose size="24" />
          </button>
        </div>
      )}
    </nav>
  )
}

export default Header
