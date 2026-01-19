import { Routes, Route } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Doctors from './pages/Doctors'
import AddDoctor from './pages/AddDoctor'
import EditDoctor from './pages/EditDoctor'
import BookAppointment from './pages/BookAppointment'
import MyAppointments from './pages/MyAppointments'

function App() {
  const { loading } = useAuth()

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/edit-doctor/:id" element={<EditDoctor />} />
          <Route path="/book-appointment/:doctorId" element={<BookAppointment />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
