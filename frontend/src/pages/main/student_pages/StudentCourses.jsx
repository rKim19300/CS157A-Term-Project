// src/pages/main/student_pages/StudentCourses.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import { Flex, Text, Button, VStack } from "@chakra-ui/react";
import styles from "./StudentCourses.module.css";

export default function StudentCourses() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const navigate = useNavigate();

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
                navigate('/student/mycourses');
            }
        } catch (error) {
            console.error('Enrollment failed:', error);
        }
    };

    const dropCourse = async () => {
        try {
            const response = await axiosInstance.post(`/api/student/drop`, { course_id: id });
            if (response.status === 200) {
                navigate('/student/mycourses');
            }
        } catch (error) {
            console.error('Dropping course failed:', error);
        }
    };

    if (!course) return <Text>Loading...</Text>;

    return (
        <Flex className={styles.container} direction="column" p={4}>
            <Text fontSize="2xl">{course.course_name}</Text>
            <Text>Department: {course.department}</Text>
            <Text>Description: {course.description}</Text>
            {/* Additional course details */}
            <VStack mt={4} spacing={2}>
                <Button colorScheme="green" onClick={enrollInCourse}>Enroll</Button>
                <Button colorScheme="red" onClick={dropCourse}>Drop</Button>
            </VStack>
        </Flex>
    );
}