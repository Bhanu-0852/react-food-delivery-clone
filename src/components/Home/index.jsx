import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {Oval} from 'react-loader-spinner'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Header from '../Header'
import Footer from '../Footer'
import AllRestaurants from '../AllRestaurants'

import './index.css'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [offersList, setOffersList] = useState([])

  useEffect(() => {
    getOffers()
  }, [])

  const getOffers = async () => {
    setIsLoading(true)
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedOffers = data.offers.map(eachOffer => ({
        id: eachOffer.id,
        imageUrl: eachOffer.image_url,
      }))
      setOffersList(formattedOffers)
    }
    setIsLoading(false)
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  }

  const renderOffersCarousel = () => (
    <div className="carousel-container">
      <Slider {...sliderSettings}>
        {offersList.map(eachOffer => (
          <div key={eachOffer.id} className="offer-image-container">
            <img src={eachOffer.imageUrl} alt="offer" className="offer-image" />
          </div>
        ))}
      </Slider>
    </div>
  )

  const renderLoader = () => (
    <div
      className="carousel-loader-container"
      testid="restaurants-offers-loader"
    >
      <Oval color="gold" height={40} width={50} />
    </div>
  )

  return (
    <>
      <Header />
      <div className="home-container">
        {isLoading ? renderLoader() : renderOffersCarousel()}
        <AllRestaurants />
      </div>
      <Footer />
    </>
  )
}

export default Home
