import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Profile = () => {
  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="profile-card">
          <img
            src="https://ui-avatars.com/api/?name=Rahul&background=F59E0B&color=fff&size=128&rounded=true"
            alt="profile avatar"
            className="profile-avatar"
          />
          <h1 className="profile-name">Rahul</h1>
          <p className="profile-bio">Food Enthusiast & Prime Member</p>

          <div className="profile-details-box">
            <p className="profile-detail-text">
              <strong>Username:</strong> rahul
            </p>
            <p className="profile-detail-text">
              <strong>Email:</strong> rahul@tastykitchens.com
            </p>
            <p className="profile-detail-text">
              <strong>Phone:</strong> +91 9876543210
            </p>
            <p className="profile-detail-text">
              <strong>Address:</strong> 123, Food Street, Hyderabad
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Profile
