// src/components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ roles }) => {
  const { user } = useContext(AuthContext);

  if (!user.isAuthenticated) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // Role not authorized
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;