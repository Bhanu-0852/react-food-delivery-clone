import {Link} from 'react-router-dom'
import './index.css'

const CartEmpty = () => (
  <div className="empty-cart-container">
    <img
      src="https://res.cloudinary.com/dakquidzb/image/upload/v1775288296/cooking_1empty_cart_img_nrvbvp.png"
      alt="empty cart"
      className="empty-cart-image"
    />
    <h1 className="empty-cart-heading">No Orders Yet!</h1>
    <p className="empty-cart-description">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/">
      <button type="button" className="order-now-btn">
        Order Now
      </button>
    </Link>
  </div>
)

export default CartEmpty
