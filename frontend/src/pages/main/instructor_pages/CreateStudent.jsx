// src/pages/main/instructor_pages/CreateStudent.jsx
import React, { useState } from 'react';
import { Flex, Input, Button, VStack, Text, useToast } from "@chakra-ui/react";
import axiosInstance from '../../../axiosInstance';
import styles from "./CreateStudent.module.css";

export default function CreateStudent() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();

    const handleCreateStudent = async () => {
        try {
            const response = await axiosInstance.post('/api/instructor/create-student', { first_name: firstName, last_name: lastName, email, password });
            if (response.status === 201) {
                toast({
                    title: "Student created successfully.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                // Clear form
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            console.error('Creating student failed:', error);
            toast({
                title: "Failed to create student.",
                description: error.response?.data?.message || "An error occurred.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex className={styles.container}>
            <VStack spacing={4} p={6} bg="white" boxShadow="md" borderRadius="md" align="stretch">
                <Text fontSize="2xl">Create New Student</Text>
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
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <Input 
                    placeholder="Password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <Button colorScheme="blue" onClick={handleCreateStudent}>Create Student</Button>
            </VStack>
        </Flex>
    );
}