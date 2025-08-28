import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import StaffDirectory from './pages/StaffDirectory';
import Login from './pages/Login';
import Reports from './pages/Reports';
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';
import LeaveRequest from './components/LeaveRequestForm';
import Landing from './pages/Landing';
import DebugSidebar from './debug/DebugSidebar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './routes/ProtectedRoute';
import LeaveRequests from './pages/LeaveRequests';
import Onboarding from './pages/Onboarding';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Staff Dashboard (protected for staff + hr) */}
        <Route
          path="/staff"
          element={
            <ProtectedRoute allowedRoles={['staff', 'hr']}>
              <StaffDashboard />
            </ProtectedRoute>
          }
        />
         <Route
  path="/hr/leave-requests"
  element={
    <ProtectedRoute role="hr">
      <LeaveRequests />
    </ProtectedRoute>
  }
/>
<Route
  path="/hr/onboarding"
  element={
    <ProtectedRoute role="hr">
      <Onboarding />
    </ProtectedRoute>
  }
/>


        {/* Admin Routes with DashboardLayout */}
        <Route
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/directory" element={<StaffDirectory />} />
          <Route path="/reports" element={<Reports />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
