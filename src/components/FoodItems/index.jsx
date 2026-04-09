import {useState, useEffect} from 'react'
import {FaStar} from 'react-icons/fa'
import {BiRupee} from 'react-icons/bi'
import './index.css'

const FoodItems = ({foodItem}) => {
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const itemInCart = cartData.find(item => item.id === foodItem.id)
    if (itemInCart) {
      setQuantity(itemInCart.quantity)
    }
  }, [foodItem.id])

  const updateLocalStorage = newQty => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    let updatedCartData

    if (newQty === 0) {
      // Remove item if quantity hits 0
      updatedCartData = cartData.filter(item => item.id !== foodItem.id)
    } else {
      const isItemExists = cartData.find(item => item.id === foodItem.id)
      if (isItemExists) {
        // Update existing item quantity
        updatedCartData = cartData.map(item =>
          item.id === foodItem.id ? {...item, quantity: newQty} : item,
        )
      } else {
        // Add new item to cart
        updatedCartData = [...cartData, {...foodItem, quantity: newQty}]
      }
    }

    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    setQuantity(newQty)
  }

  const onClickAddButton = () => {
    updateLocalStorage(1)
  }

  const onClickDecrement = () => {
    if (quantity > 0) {
      updateLocalStorage(quantity - 1)
    }
  }

  const onClickIncrement = () => {
    updateLocalStorage(quantity + 1)
  }

  return (
    <li className="food-card" testid="foodItem">
      <img src={foodItem.imageUrl} alt="food-item" className="food-img" />
      <div className="food-info">
        <h1 className="food-title">{foodItem.name}</h1>
        <div className="food-price">
          <BiRupee />
          <p className="price-val">{foodItem.cost}</p>
        </div>
        <div className="food-rating">
          <FaStar className="food-star-icon" />
          <p className="rating-val">{foodItem.rating}</p>
        </div>
        {quantity === 0 ? (
          <button
            type="button"
            className="add-button"
            onClick={onClickAddButton}
          >
            Add
          </button>
        ) : (
          <div className="quantity-controller">
            <button
              type="button"
              className="ctrl-btn"
              testid="decrement-count"
              onClick={onClickDecrement}
            >
              -
            </button>
            <p className="qty-num" testid="active-count">
              {quantity}
            </p>
            <button
              type="button"
              className="ctrl-btn"
              testid="increment-count"
              onClick={onClickIncrement}
            >
              +
            </button>
          </div>
        )}
      </div>
    </li>
  )
}

export default FoodItems
