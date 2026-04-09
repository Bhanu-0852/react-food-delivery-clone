import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-logo-container">
          <img
            src="https://res.cloudinary.com/dakquidzb/image/upload/v1775288296/Frame_275footer_website_logo_xh1qpj.png"
            alt="website-footer-logo"
            className="footer-logo"
          />
          <h1 className="footer-heading">Tasty Kitchens</h1>
        </div>

        <p className="footer-text">
          The only thing we are serious about is food.
          <br /> Contact us on
        </p>

        <div className="social-icons-container">
          <FaPinterestSquare
            testid="pintrest-social-icon"
            className="social-icon"
          />
          <FaInstagram testid="instagram-social-icon" className="social-icon" />
          <FaTwitter testid="twitter-social-icon" className="social-icon" />
          <FaFacebookSquare
            testid="facebook-social-icon"
            className="social-icon"
          />
        </div>
      </div>
    </div>
  )
}

export default Footer
