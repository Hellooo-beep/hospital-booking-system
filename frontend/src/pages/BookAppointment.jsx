import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doctorAPI, appointmentAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import './BookAppointment.css'

const BookAppointment = () => {
  const { doctorId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    appointmentDate: '',
    timeSlot: ''
  })

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '02:00 PM',
    '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
    '04:30 PM', '05:00 PM'
  ]

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchDoctor()
  }, [doctorId, user])

  const fetchDoctor = async () => {
    try {
      const response = await doctorAPI.getById(doctorId)
      setDoctor(response.data)
    } catch (err) {
      setError('Failed to load doctor information')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSubmitting(true)

    try {
      await appointmentAPI.create({
        customerId: user.id,
        doctorId: parseInt(doctorId),
        appointmentDate: formData.appointmentDate,
        timeSlot: formData.timeSlot
      })
      setSuccess('Appointment booked successfully!')
      setTimeout(() => {
        navigate('/my-appointments')
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment')
    } finally {
      setSubmitting(false)
    }
  }

  const getMinDate = () => {
    const today = new Date()
    today.setDate(today.getDate() + 1)
    return today.toISOString().split('T')[0]
  }

  if (loading) return <div className="loading">Loading...</div>
  if (!doctor) return <div className="error-message">Doctor not found</div>

  return (
    <div className="book-appointment-page">
      <div className="book-appointment-card">
        <h2>Book Appointment</h2>

        <div className="doctor-preview">
          <div className="doctor-avatar">
            {doctor.name.charAt(0)}
          </div>
          <div>
            <h3>{doctor.name}</h3>
            <p>{doctor.specialization}</p>
            <p className="available-days">Available: {doctor.availableDays}</p>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="appointmentDate">Select Date</label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              min={getMinDate()}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="timeSlot">Select Time Slot</label>
            <select
              id="timeSlot"
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              required
            >
              <option value="">Choose a time slot</option>
              {timeSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/doctors')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookAppointment
