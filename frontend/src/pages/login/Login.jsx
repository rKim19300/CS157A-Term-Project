// src/pages/login/Login.jsx
import React, { useState, useContext } from 'react';
import { Flex, Input, Button, VStack, Text, Select, useToast } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from "./Login.module.css";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const toast = useToast();

    const handleLogin = async () => {
        const result = await login(email, password);
        if (result.success) {
            toast({
                title: "Login successful.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            // Redirect based on role
            const role = sessionStorage.getItem("userRole");
            if (role === 'student') {
                navigate('/student');
            } else if (role === 'instructor') {
                navigate('/instructor');
            }
        } else {
            toast({
                title: "Login failed.",
                description: result.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex className={styles.container} align="center" justify="center" height="100vh">
            <VStack spacing={4} p={6} bg="white" boxShadow="md" borderRadius="md">
                <Text fontSize="2xl">Login</Text>
                <Input 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <Input 
                    placeholder="Password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <Button colorScheme="blue" onClick={handleLogin}>Login</Button>
            </VStack>
        </Flex>
    );
}