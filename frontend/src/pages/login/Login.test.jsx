// src/pages/login/Login.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import { AuthProvider } from '../../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

test('renders login form', () => {
    render(
        <AuthProvider>
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        </AuthProvider>
    );
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
});