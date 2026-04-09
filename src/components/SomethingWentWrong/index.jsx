import './index.css'

const SomethingWentWrong = props => {
  const {onClickRetry} = props

  return (
    <div className="something-went-wrong-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/not-found-img.png"
        alt="something went wrong"
        className="went-wrong-image"
      />
      <h1 className="went-wrong-heading">Something Went Wrong</h1>
      <p className="went-wrong-description">
        We are having some trouble processing your request. Please try again.
      </p>
      <button type="button" className="retry-btn" onClick={onClickRetry}>
        Retry
      </button>
    </div>
  )
}

export default SomethingWentWrong
