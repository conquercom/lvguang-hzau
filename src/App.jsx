import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Exchange from './pages/Exchange'
import Profile from './pages/Profile'
import PointsHistory from './pages/PointsHistory'
import Calendar from './pages/Calendar'
import Leaderboard from './pages/Leaderboard'
import Statistics from './pages/Statistics'
import Reports from './pages/Reports'
import Rewards from './pages/Rewards'
import Settings from './pages/Settings'
import Achievements from './pages/Achievements'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setIsLoggedIn(true)
    setUser(userData)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            isLoggedIn ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/home" 
          element={
            isLoggedIn ? <Home user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/exchange" 
          element={
            isLoggedIn ? <Exchange user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/profile" 
          element={
            isLoggedIn ? <Profile user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/points-history" 
          element={
            isLoggedIn ? <PointsHistory user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/calendar" 
          element={
            isLoggedIn ? <Calendar user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/leaderboard" 
          element={
            isLoggedIn ? <Leaderboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/statistics" 
          element={
            isLoggedIn ? <Statistics user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
          } 
        />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/reports" 
          element={
            isLoggedIn ? <Reports user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/rewards" 
          element={
            isLoggedIn ? <Rewards user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/settings" 
          element={
            isLoggedIn ? <Settings user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/achievements" 
          element={
            isLoggedIn ? <Achievements user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
          } 
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
