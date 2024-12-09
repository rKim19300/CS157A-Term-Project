// src/pages/signup/Signup.jsx
import React, { useState, useContext } from 'react';
import { Flex, Input, Button, VStack, Text, Select, useToast } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import styles from "./Signup.module.css";

export default function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const navigate = useNavigate();
    const toast = useToast();

    const handleSignup = async () => {
        try {
            const endpoint = role === 'student' ? '/api/signup/student' : '/api/signup/instructor';
            const response = await axiosInstance.post(endpoint, { first_name: firstName, last_name: lastName, email, password });
            if (response.status === 200) {
                toast({
                    title: "Signup successful.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                navigate('/login');
            }
        } catch (error) {
            console.error('Signup failed:', error);
            toast({
                title: "Signup failed.",
                description: error.response?.data?.message || "An error occurred.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex className={styles.container} align="center" justify="center" height="100vh">
            <VStack spacing={4} p={6} bg="white" boxShadow="md" borderRadius="md">
                <Text fontSize="2xl">Sign Up</Text>
                <Input 
                    placeholder="First Name" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                />
                <Input 
                    placeholder="Last Name" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                />
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
                <Select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="instructor">Student</option>
                    <option value="instructor">Instructor</option>
                </Select>
                <Button colorScheme="green" onClick={handleSignup}>Sign Up</Button>
            </VStack>
        </Flex>
    );
}