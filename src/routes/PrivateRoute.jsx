import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // Jika tidak ada token, redirect ke login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Jika ada token, lanjut render komponen tujuan
  return children;
};

export default PrivateRoute;
