import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import StaffDirectory from './pages/StaffDirectory';
import Login from './pages/Login';
import Reports from './pages/Reports';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<StaffDirectory />} />
          <Route
            path="/reports"
            element={
              user?.role === 'admin' ? <Reports /> : <Navigate to="/" />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
