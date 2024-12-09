// src/pages/main/student_pages/CourseInfo.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import { Flex, Text, Button, VStack, useToast } from "@chakra-ui/react";
import styles from "./CourseInfo.module.css";

export default function CourseInfo() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axiosInstance.get(`/api/courses/${id}`);
                setCourse(response.data);
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };
        fetchCourse();
    }, [id]);

    const enrollInCourse = async () => {
        try {
            const response = await axiosInstance.post(`/api/student/enroll`, { course_id: id });
            if (response.status === 200) {
                toast({
                    title: "Enrollment successful.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                navigate('/student/mycourses');
            }
        } catch (error) {
            console.error('Enrollment failed:', error);
            toast({
                title: "Enrollment failed.",
                description: error.response?.data?.message || "Cannot enroll in course.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const dropCourse = async () => {
        try {
            const response = await axiosInstance.post(`/api/student/drop`, { course_id: id });
            if (response.status === 200) {
                toast({
                    title: "Course dropped successfully.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                navigate('/student/mycourses');
            }
        } catch (error) {
            console.error('Dropping course failed:', error);
            toast({
                title: "Failed to drop course.",
                description: error.response?.data?.message || "Cannot drop course.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    if (!course) return <Text>Loading...</Text>;

    return (
        <Flex className={styles.container} direction="column" p={4}>
            <Text fontSize="2xl">{course.course_name}</Text>
            <Text>Department: {course.department}</Text>
            <Text>Description: {course.description}</Text>
            {/* Add more course details as needed */}
            <VStack mt={4} spacing={2}>
                <Button colorScheme="green" onClick={enrollInCourse}>Enroll</Button>
                <Button colorScheme="red" onClick={dropCourse}>Drop</Button>
            </VStack>
        </Flex>
    );
}