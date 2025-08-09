// src/routes/PrivateRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')); // Pastikan diset saat login
  const location = useLocation();

  // Belum login
  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Kalau role tidak cocok, redirect ke dashboard sesuai role user
  if (role && user?.role !== role) {
    return <Navigate to={`/${user?.role}/dashboard`} replace />;
  }

  return children;
};

export default PrivateRoute;
