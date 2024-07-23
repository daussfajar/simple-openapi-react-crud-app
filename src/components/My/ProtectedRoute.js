import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import axiosInstance from '../../utils/axiosInstance';
import '../../assets/css/loading.css'; // Import CSS animasi

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const token = Cookies.get('token');
                
                if (!token) {
                    setIsAuthenticated(false);
                    return;
                }

                // Cek apakah token valid
                const response = await axiosInstance.get('verify-token');
                
                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Token verification failed', error);
                setIsAuthenticated(false);
            }
        };

        verifyToken();
    }, []); // Run once on mount

    if (isAuthenticated === null) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;