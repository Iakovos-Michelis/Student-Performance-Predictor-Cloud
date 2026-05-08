import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Predict from './components/Predict'
import History from './components/History'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
