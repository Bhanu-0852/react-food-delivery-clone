import {useState, useEffect, useCallback} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Oval} from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import {BiRupee} from 'react-icons/bi'

import Header from '../Header'
import Footer from '../Footer'
import FoodItems from '../FoodItems'
import SomethingWentWrong from '../SomethingWentWrong'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const RestaurantDetails = () => {
  const [restaurantData, setRestaurantData] = useState({})
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const {id} = useParams()

  const getRestaurantDetails = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const updatedData = {
          id: data.id,
          name: data.name,
          cuisine: data.cuisine,
          imageUrl: data.image_url,
          location: data.location,
          rating: data.rating,
          costForTwo: data.cost_for_two,
          reviewsCount: data.reviews_count,
          opensAt: data.opens_at,
          foodItems: data.food_items.map(each => ({
            id: each.id,
            name: each.name,
            cost: each.cost,
            imageUrl: each.image_url,
            rating: each.rating,
            foodType: each.food_type,
          })),
        }
        setRestaurantData(updatedData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch {
      setApiStatus(apiStatusConstants.failure)
    }
  }, [id])

  useEffect(() => {
    getRestaurantDetails()
  }, [getRestaurantDetails])

  const renderLoadingView = () => (
    <div className="loader-container" testid="restaurant-details-loader">
      <Oval color="gold" height={50} width={50} />
    </div>
  )

  const renderSuccessView = () => {
    const {
      name,
      cuisine,
      imageUrl,
      location,
      rating,
      costForTwo,
      reviewsCount,
      foodItems,
      opensAt,
    } = restaurantData

    return (
      <>
        <div className="banner-bg">
          <div className="banner-content">
            <div className="banner-image-wrapper">
              <img
                src={imageUrl}
                alt="restaurant"
                className="restaurant-banner-image"
              />
            </div>
            <div className="restaurant-info-box">
              <h1 className="res-name">{name}</h1>
              <p className="res-cuisine">{cuisine}</p>
              <p className="res-location">{location}</p>
              {opensAt && (
                <p className="res-availability">
                  Currently Closed. Opens at: <strong>{opensAt}</strong>
                </p>
              )}
              <div className="stats-container">
                <div className="stat-block">
                  <div className="stat-value-row">
                    <FaStar className="star-icon" />
                    <p className="stat-text">{rating}</p>
                  </div>
                  <p className="stat-label">{reviewsCount}+ Ratings</p>
                </div>
                <div className="divider-line" />
                <div className="stat-block">
                  <div className="stat-value-row">
                    <BiRupee className="rupee-icon" size={20} />
                    <p className="stat-text">{costForTwo}</p>
                  </div>
                  <p className="stat-label">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items-list">
          {foodItems.map(item => (
            <FoodItems key={item.id} foodItem={item} />
          ))}
        </ul>
      </>
    )
  }

  const renderView = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return <SomethingWentWrong onClickRetry={getRestaurantDetails} />
      default:
        return null
    }
  }

  return (
    <div className="res-details-page">
      <Header />
      {renderView()}
      <Footer />
    </div>
  )
}

export default RestaurantDetails
