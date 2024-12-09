// src/pages/main/instructor_pages/AddCourse.jsx
import React, { useState } from 'react';
import { Flex, Input, Button, VStack, Text, Select, useToast } from "@chakra-ui/react";
import axiosInstance from '../../../axiosInstance';
import styles from "./AddCourse.module.css";

export default function AddCourse() {
    const [courseName, setCourseName] = useState('');
    const [department, setDepartment] = useState('');
    const [points, setPoints] = useState('');
    const toast = useToast();

    const handleAddCourse = async () => {
        try {
            const response = await axiosInstance.post('/api/instructor/add-course', { course_name: courseName, department, points });
            if (response.status === 201) {
                toast({
                    title: "Course added successfully.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                // Clear form
                setCourseName('');
                setDepartment('');
                setPoints('');
            }
        } catch (error) {
            console.error('Adding course failed:', error);
            toast({
                title: "Failed to add course.",
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
                <Text fontSize="2xl">Add New Course</Text>
                <Input 
                    placeholder="Course Name" 
                    value={courseName} 
                    onChange={(e) => setCourseName(e.target.value)} 
                />
                <Select placeholder="Select Department" value={department} onChange={(e) => setDepartment(e.target.value)}>
                    {/* Populate with actual departments */}
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                </Select>
                <Input 
                    placeholder="Points" 
                    type="number" 
                    value={points} 
                    onChange={(e) => setPoints(e.target.value)} 
                />
                <Button colorScheme="green" onClick={handleAddCourse}>Add Course</Button>
            </VStack>
        </Flex>
    );
}