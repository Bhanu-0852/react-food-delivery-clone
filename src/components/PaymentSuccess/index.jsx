import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const PaymentSuccess = () => {
  const successImageUrl =
    'https://res.cloudinary.com/dakquidzb/image/upload/v1775627955/check-circle.1_1payment_Success_wkvsis.png'

  return (
    <>
      <Header />
      <div className="payment-success-container">
        <img
          src={successImageUrl}
          alt="payment successful"
          className="success-img"
        />
        <h1 className="success-heading">Payment Successful</h1>
        <p className="success-description">
          Thank you for ordering Your payment is successfully completed.
        </p>
        <Link to="/" className="link-item">
          <button type="button" className="home-btn">
            Go To Home Page
          </button>
        </Link>
      </div>
    </>
  )
}

export default PaymentSuccess
