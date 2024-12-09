// src/components/LogoutButton.jsx
import { Button } from "@chakra-ui/react";
import React, { useContext } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function LogoutButton() {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            // Optional: Send logout request to backend
            const response = await axiosInstance.get(`/api/logout`);
            if (response.status === 200) {
                // Clear authentication state using AuthContext
                logout();

                // Clear any additional session data if necessary
                sessionStorage.clear();

                // Redirect to login page
                navigate('/login');
            }
        }
        catch (err) {
            console.error('Logout failed:', err);
            // Even if backend logout fails, proceed to clear frontend auth
            logout();
            sessionStorage.clear();
            navigate('/login');
        }
    };

    return (
        <Button onClick={handleLogout} colorScheme="red">
            Log Out
        </Button>
    );
}