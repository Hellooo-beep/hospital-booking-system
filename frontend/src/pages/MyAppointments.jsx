import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { appointmentAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import './MyAppointments.css'

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchAppointments()
  }, [user])

  const fetchAppointments = async () => {
    try {
      let response
      if (isAdmin()) {
        response = await appointmentAPI.getAll()
      } else {
        response = await appointmentAPI.getByCustomer(user.id)
      }
      setAppointments(response.data)
    } catch (err) {
      setError('Failed to load appointments')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await appointmentAPI.cancel(id)
        fetchAppointments()
      } catch (err) {
        setError('Failed to cancel appointment')
      }
    }
  }

  const handleStatusUpdate = async (id, status) => {
    try {
      await appointmentAPI.updateStatus(id, status)
      fetchAppointments()
    } catch (err) {
      setError('Failed to update status')
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'APPROVED': return 'status-approved'
      case 'CANCELLED': return 'status-cancelled'
      case 'PENDING': return 'status-pending'
      default: return ''
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) return <div className="loading">Loading appointments...</div>

  return (
    <div className="appointments-page">
      <div className="appointments-header">
        <h1 className="page-title">
          {isAdmin() ? 'All Appointments' : 'My Appointments'}
        </h1>
        {!isAdmin() && (
          <button
            className="btn btn-primary"
            onClick={() => navigate('/doctors')}
          >
            Book New Appointment
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {appointments.length === 0 ? (
        <div className="no-appointments">
          <p>No appointments found</p>
          {!isAdmin() && (
            <button
              className="btn btn-primary"
              onClick={() => navigate('/doctors')}
            >
              Book Your First Appointment
            </button>
          )}
        </div>
      ) : (
        <div className="appointments-list">
          {appointments.map(appointment => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-main">
                <div className="appointment-info">
                  <h3>Dr. {appointment.doctor?.name || 'Unknown'}</h3>
                  <p className="specialization">
                    {appointment.doctor?.specialization || 'N/A'}
                  </p>
                  {isAdmin() && (
                    <p className="customer-name">
                      Patient: {appointment.customer?.name || 'Unknown'}
                    </p>
                  )}
                </div>
                <div className="appointment-datetime">
                  <p className="date">{formatDate(appointment.appointmentDate)}</p>
                  <p className="time">{appointment.timeSlot}</p>
                </div>
                <div className={`appointment-status ${getStatusClass(appointment.status)}`}>
                  {appointment.status}
                </div>
              </div>

              <div className="appointment-actions">
                {isAdmin() && appointment.status === 'PENDING' && (
                  <>
                    <button
                      className="btn btn-success"
                      onClick={() => handleStatusUpdate(appointment.id, 'APPROVED')}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleStatusUpdate(appointment.id, 'CANCELLED')}
                    >
                      Reject
                    </button>
                  </>
                )}
                {!isAdmin() && appointment.status === 'PENDING' && (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleCancel(appointment.id)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyAppointments
