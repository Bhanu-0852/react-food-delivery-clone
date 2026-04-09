import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {Oval} from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {BsChevronLeft, BsChevronRight} from 'react-icons/bs'
import RestaurantsHeader from '../RestaurantsHeader'
import './index.css'

const sortByOptions = [
  {id: 0, displayText: 'Highest', value: 'Highest'},
  {id: 1, displayText: 'Lowest', value: 'Lowest'},
]

const LIMIT = 9

const AllRestaurants = () => {
  const [restaurantsList, setRestaurantsList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeSortOption, setActiveSortOption] = useState('Lowest')
  const [activePage, setActivePage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  const [activeSearch, setActiveSearch] = useState('')

  useEffect(() => {
    const getRestaurants = async () => {
      setIsLoading(true)
      const jwtToken = Cookies.get('jwt_token')
      const offset = (activePage - 1) * LIMIT
      const url = `https://apis.ccbp.in/restaurants-list?search=${activeSearch}&offset=${offset}&limit=${LIMIT}&sort_by_rating=${activeSortOption}`

      const options = {
        method: 'GET',
        headers: {Authorization: `Bearer ${jwtToken}`},
      }

      try {
        const response = await fetch(url, options)
        if (response.ok) {
          const data = await response.json()
          const formattedData = data.restaurants.map(each => ({
            id: each.id,
            name: each.name,
            cuisine: each.cuisine,
            imageUrl: each.image_url,
            rating: each.user_rating.rating,
            totalReviews: each.user_rating.total_reviews,
            ratingColor: each.user_rating.rating_color,
          }))
          setRestaurantsList(formattedData)
          setTotalPages(Math.ceil(data.total / LIMIT))
        } else {
          setRestaurantsList([])
          setTotalPages(0)
        }
      } catch (error) {
        setRestaurantsList([])
        setTotalPages(0)
      } finally {
        setIsLoading(false)
      }
    }

    getRestaurants()
  }, [activeSortOption, activePage, activeSearch])

  const onClickLeftArrow = () => {
    if (activePage > 1) setActivePage(prev => prev - 1)
  }

  const onClickRightArrow = () => {
    if (activePage < totalPages) setActivePage(prev => prev + 1)
  }

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value.toLowerCase())
  }

  const onKeyDownSearch = event => {
    if (event.key === 'Enter') {
      setActiveSearch(searchInput)
      setActivePage(1)
    }
  }

  const renderNoResultsView = () => (
    <div className="no-results-container">
      <h1 className="no-results-heading">No Restaurants Found!</h1>
      <p className="no-results-description">
        We could not find any restaurants matching your search. Please try
        another name.
      </p>
    </div>
  )

  return (
    <div className="all-restaurants-section">
      <div className="search-bar-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search restaurants..."
          value={searchInput}
          onChange={onChangeSearchInput}
          onKeyDown={onKeyDownSearch}
        />
      </div>

      <RestaurantsHeader
        sortByOptions={sortByOptions}
        activeOptionId={activeSortOption}
        updateOption={setActiveSortOption}
      />
      <hr className="hr-line" />

      {isLoading ? (
        <div className="loader-container" testid="restaurants-list-loader">
          <Oval color="gold" height={40} width={50} />
        </div>
      ) : restaurantsList.length === 0 ? (
        renderNoResultsView()
      ) : (
        <>
          <ul className="restaurants-list">
            {restaurantsList.map(item => (
              <Link
                to={`/restaurant/${item.id}`}
                className="restaurant-link"
                key={item.id}
              >
                <li testid="restaurant-item" className="restaurant-card">
                  <img
                    src={item.imageUrl}
                    alt="restaurant"
                    className="restaurant-image"
                  />
                  <div className="rest-info">
                    <h1 className="rest-name">{item.name}</h1>
                    <p className="rest-cuisine">{item.cuisine}</p>
                    <div className="rating-box">
                      <FaStar className="star" color={`#${item.ratingColor}`} />
                      <p className="rating-text">{item.rating}</p>
                      <h1 className="reviews-text">
                        ({item.totalReviews} ratings)
                      </h1>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>

          {restaurantsList.length > 0 && (
            <div className="pagination-container">
              <button
                type="button"
                className="page-btn"
                onClick={onClickLeftArrow}
                testid="pagination-left-button"
              >
                <BsChevronLeft size="20" />
              </button>
              <p className="page-count">
                <span testid="active-page-number">{activePage}</span> of{' '}
                {totalPages}
              </p>
              <button
                type="button"
                className="page-btn"
                onClick={onClickRightArrow}
                testid="pagination-right-button"
              >
                <BsChevronRight size="20" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AllRestaurants
