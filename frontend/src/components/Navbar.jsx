import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">+</span>
          Hospital Booking
        </Link>

        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/doctors" className="nav-link">Doctors</Link>

          {user ? (
            <>
              <Link to="/my-appointments" className="nav-link">
                {isAdmin() ? 'All Appointments' : 'My Appointments'}
              </Link>
              <div className="user-menu">
                <span className="user-name">{user.name}</span>
                <span className="user-role">{user.role}</span>
                <button className="btn btn-secondary logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
