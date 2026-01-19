import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Home.css'

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Book Your Doctor Appointment Online</h1>
          <p>
            Find the best doctors in your area and book appointments instantly.
            Skip the waiting room and get the care you need.
          </p>
          <div className="hero-buttons">
            <Link to="/doctors" className="btn btn-primary btn-large">
              Find Doctors
            </Link>
            {!user && (
              <Link to="/register" className="btn btn-secondary btn-large">
                Create Account
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏥</div>
              <h3>Expert Doctors</h3>
              <p>Access to qualified specialists across multiple departments</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Easy Booking</h3>
              <p>Book appointments in just a few clicks, anytime, anywhere</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h3>Save Time</h3>
              <p>No more waiting in long queues, arrive at your scheduled time</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Manage Online</h3>
              <p>View, reschedule, or cancel appointments from your dashboard</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of patients who trust us for their healthcare needs.</p>
          <Link to="/doctors" className="btn btn-primary btn-large">
            Browse Doctors
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
