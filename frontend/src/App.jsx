import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Analysis from './pages/Analysis'
import HospitalFinder from './pages/HospitalFinder'
import MedicinePrices from './pages/MedicinePrices'
import Services from './pages/Services'
import PatientCorner from './pages/PatientCorner'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/hospitals" element={<HospitalFinder />} />
        <Route path="/medicines" element={<MedicinePrices />} />
        <Route path="/services" element={<Services />} />
        <Route path="/patient-corner" element={<PatientCorner />} />
      </Routes>
    </Router>
  )
}

export default App
