import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { doctorAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import './Doctors.css'

const Doctors = () => {
  const [doctors, setDoctors] = useState([])
  const [filteredDoctors, setFilteredDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [specialization, setSpecialization] = useState('')
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()

  const specializations = [
    'All',
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'General Medicine',
    'Gynecology',
    'Ophthalmology',
    'ENT'
  ]

  useEffect(() => {
    fetchDoctors()
  }, [])

  useEffect(() => {
    filterDoctors()
  }, [searchTerm, specialization, doctors])

  const fetchDoctors = async () => {
    try {
      const response = await doctorAPI.getAll()
      setDoctors(response.data)
      setFilteredDoctors(response.data)
    } catch (err) {
      setError('Failed to load doctors')
    } finally {
      setLoading(false)
    }
  }

  const filterDoctors = () => {
    let filtered = doctors

    if (searchTerm) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (specialization && specialization !== 'All') {
      filtered = filtered.filter(doctor =>
        doctor.specialization.toLowerCase() === specialization.toLowerCase()
      )
    }

    setFilteredDoctors(filtered)
  }

  const handleBookAppointment = (doctorId) => {
    if (!user) {
      navigate('/login')
      return
    }
    navigate(`/book-appointment/${doctorId}`)
  }

  const handleDeleteDoctor = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await doctorAPI.delete(id)
        fetchDoctors()
      } catch (err) {
        setError('Failed to delete doctor')
      }
    }
  }

  if (loading) return <div className="loading">Loading doctors...</div>

  return (
    <div className="doctors-page">
      <div className="doctors-header">
        <h1 className="page-title">Our Doctors</h1>
        {isAdmin() && (
          <button
            className="btn btn-primary"
            onClick={() => navigate('/add-doctor')}
          >
            + Add Doctor
          </button>
        )}
      </div>

      <div className="doctors-filters">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className="filter-select"
        >
          {specializations.map(spec => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="doctors-grid">
        {filteredDoctors.length === 0 ? (
          <p className="no-results">No doctors found</p>
        ) : (
          filteredDoctors.map(doctor => (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-avatar">
                {doctor.name.charAt(0)}
              </div>
              <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p className="specialization">{doctor.specialization}</p>
                <p className="contact">
                  <span>{doctor.email}</span>
                  <span>{doctor.phone}</span>
                </p>
                <p className="availability">
                  <strong>Available:</strong> {doctor.availableDays}
                </p>
              </div>
              <div className="doctor-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => handleBookAppointment(doctor.id)}
                >
                  Book Appointment
                </button>
                {isAdmin() && (
                  <>
                    <button
                      className="btn btn-secondary"
                      onClick={() => navigate(`/edit-doctor/${doctor.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteDoctor(doctor.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Doctors
