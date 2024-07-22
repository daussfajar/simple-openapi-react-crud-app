import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const token = Cookies.get('token');

    if (!token) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;