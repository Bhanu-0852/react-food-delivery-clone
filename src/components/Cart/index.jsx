import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {FaRupeeSign} from 'react-icons/fa'

import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'
import CartEmpty from '../CartEmpty'
import './index.css'

const Cart = () => {
  const [cartList, setCartList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('cartData')) || []
    setCartList(data)
  }, [])

  const updateLocalStorage = updatedList => {
    localStorage.setItem('cartData', JSON.stringify(updatedList))
    setCartList(updatedList)
  }

  const incrementQuantity = id => {
    const updatedList = cartList.map(item =>
      item.id === id ? {...item, quantity: item.quantity + 1} : item,
    )
    updateLocalStorage(updatedList)
  }

  const decrementQuantity = id => {
    const updatedList = cartList
      .map(item =>
        item.id === id ? {...item, quantity: item.quantity - 1} : item,
      )
      .filter(item => item.quantity > 0)

    updateLocalStorage(updatedList)
  }

  const calculateTotal = () =>
    cartList.reduce((acc, item) => acc + item.cost * item.quantity, 0)

  const onClickPlaceOrder = () => {
    localStorage.removeItem('cartData')
    navigate('/payment-success')
  }

  const renderCartView = () => (
    <div className="cart-content">
      {/* Desktop Headers */}
      <div className="cart-header-desktop">
        <p className="header-label item-col">Item</p>
        <p className="header-label qty-col">Quantity</p>
        <p className="header-label price-col">Price</p>
      </div>

      {/* Cart Items List */}
      <ul className="cart-list">
        {cartList.map(each => (
          <CartItem
            key={each.id}
            cartItemDetails={each}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />
        ))}
      </ul>

      <hr className="cart-hr" />

      {/* Order Total Section */}
      <div className="total-container">
        <h1 className="order-total-label">Order Total:</h1>
        <div className="total-price-box">
          <FaRupeeSign size="24" />
          <p className="total-price-text" testid="total-price">
            {calculateTotal()}
          </p>
        </div>
      </div>

      <button
        type="button"
        className="place-order-btn"
        onClick={onClickPlaceOrder}
      >
        Place Order
      </button>
    </div>
  )

  return (
    <div className="cart-page">
      <Header />
      <div className="cart-container">
        {cartList.length === 0 ? <CartEmpty /> : renderCartView()}
      </div>
      {cartList.length > 0 && <Footer />}
    </div>
  )
}

export default Cart
