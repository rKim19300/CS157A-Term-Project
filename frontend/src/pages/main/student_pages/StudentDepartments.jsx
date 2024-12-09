// src/pages/main/student_pages/StudentDepartments.jsx
import React, { useEffect, useState } from 'react';
import { Flex, Text, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axiosInstance from '../../../axiosInstance';
import styles from "./StudentDepartments.module.css";

export default function StudentDepartments() {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axiosInstance.get('/api/departments');
                setDepartments(response.data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };
        fetchDepartments();
    }, []);

    return (
        <Flex className={styles.container} direction="column" p={4}>
            <Text fontSize="2xl" mb={4}>Departments</Text>
            <VStack align="start" spacing={3}>
                {departments.map(dept => (
                    <Button as={Link} to={`/student/depts/${dept.id}/courses`} key={dept.id} variant="link" colorScheme="blue">
                        {dept.name}
                    </Button>
                ))}
            </VStack>
        </Flex>
    );
}