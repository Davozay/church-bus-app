import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import QRCodePage from './pages/QRCodePage';
import RegistrationForm from './pages/RegistrationForm';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import RegistrationsPage from './pages/RegistrationsPage';
import SuccessPage from './pages/SuccessPage'; // Add this import

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<QRCodePage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/success" element={<SuccessPage />} /> {/* Add this route */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/dashboard" element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } />
          <Route path="/admin/registrations" element={
            <PrivateRoute>
              <RegistrationsPage />
            </PrivateRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;