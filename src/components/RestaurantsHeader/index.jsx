import {BsFilterLeft} from 'react-icons/bs'
import './index.css'

const RestaurantsHeader = props => {
  const {sortByOptions, activeOptionId, updateOption} = props

  const onChangeSortOption = event => {
    updateOption(event.target.value)
  }

  return (
    <div className="restaurants-header-container">
      <div className="title-description-container">
        <h1 className="popular-restaurants-heading">Popular Restaurants</h1>
        <p className="popular-restaurants-description">
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
      </div>
      <div className="sort-by-container">
        <BsFilterLeft className="sort-icon" />
        <p className="sort-by-text">Sort By</p>
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortOption}
        >
          {sortByOptions.map(eachOption => (
            <option
              key={eachOption.id}
              value={eachOption.value}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default RestaurantsHeader
