import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doctorAPI } from '../services/api'
import './DoctorForm.css'

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    email: '',
    phone: '',
    availableDays: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const specializations = [
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await doctorAPI.create(formData)
      navigate('/doctors')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add doctor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="doctor-form-page">
      <div className="doctor-form-card">
        <h2>Add New Doctor</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Doctor Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter doctor's full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="specialization">Specialization</label>
            <select
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            >
              <option value="">Select specialization</option>
              {specializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="availableDays">Available Days</label>
            <input
              type="text"
              id="availableDays"
              name="availableDays"
              value={formData.availableDays}
              onChange={handleChange}
              placeholder="e.g., Monday, Wednesday, Friday"
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/doctors')}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Adding...' : 'Add Doctor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddDoctor
