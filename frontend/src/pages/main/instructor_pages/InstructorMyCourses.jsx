// src/pages/main/instructor_pages/InstructorMyCourses.jsx
import React, { useEffect, useState } from 'react';
import { Flex, Text, Divider, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axiosInstance from '../../../axiosInstance';
import styles from "./InstructorMyCourses.module.css";

export default function InstructorMyCourses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchInstructorCourses = async () => {
            try {
                const response = await axiosInstance.get('/api/instructor/mycourses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching instructor courses:', error);
            }
        };
        fetchInstructorCourses();
    }, []);

    return (
        <Flex className={styles.container} direction="column" p={4}>
            <Text fontSize="2xl" mb={4}>My Courses</Text>
            <Divider my={4} />
            <VStack align="start" spacing={3}>
                {courses.map(course => (
                    <Flex key={course.course_id} justify="space-between" width="100%">
                        <Text>{course.course_name}</Text>
                        <Button as={Link} to={`/instructor/course-info/${course.course_id}`} size="sm">
                            Manage
                        </Button>
                    </Flex>
                ))}
            </VStack>
        </Flex>
    );
}