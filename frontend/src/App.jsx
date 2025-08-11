import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import ServicesDashboard from './pages/ServicesDashboard';
import Healthcare from './pages/services/Healthcare';
import Education from './pages/services/Education';
import Financial from './pages/services/Financial';
import Welfare from './pages/services/Welfare';
import Login from './pages/Login';
import ForgotID from './pages/ForgotID'; // ✅ Import this

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<ServicesDashboard />} />
        <Route path="/services/healthcare" element={<Healthcare />} />
        <Route path="/services/education" element={<Education />} />
        <Route path="/services/financial" element={<Financial />} />
        <Route path="/services/welfare" element={<Welfare />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-id" element={<ForgotID />} /> {/* ✅ Route added */}

        {/* Fallback to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
