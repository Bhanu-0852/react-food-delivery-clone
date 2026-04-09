import {HiOutlineMinusSm} from 'react-icons/hi'
import {BsPlus} from 'react-icons/bs'
import {FaRupeeSign} from 'react-icons/fa'

import './index.css'

const CartItem = props => {
  const {cartItemDetails, incrementQuantity, decrementQuantity} = props
  const {id, name, cost, imageUrl, quantity} = cartItemDetails

  const onClickDecrement = () => decrementQuantity(id)
  const onClickIncrement = () => incrementQuantity(id)

  return (
    <li className="cart-item-list-item" testid="cartItem">
      <div className="item-info-col">
        <img src={imageUrl} alt={name} className="cart-item-image" />
        <p className="cart-item-desktop-name">{name}</p>
      </div>

      <div className="cart-item-details-container">
        <h1 className="cart-item-mobile-name">{name}</h1>

        <div className="quantity-container">
          <button
            type="button"
            className="quantity-btn"
            onClick={onClickDecrement}
            testid="decrement-quantity"
          >
            <HiOutlineMinusSm size={16} />
          </button>
          <p className="quantity-text" testid="item-quantity">
            {quantity}
          </p>
          <button
            type="button"
            className="quantity-btn"
            onClick={onClickIncrement}
            testid="increment-quantity"
          >
            <BsPlus size={16} />
          </button>
        </div>

        <div className="price-container">
          <FaRupeeSign className="rupee-icon" size={12} />
          <p className="total-item-price">{cost * quantity}</p>
        </div>
      </div>
    </li>
  )
}

export default CartItem
