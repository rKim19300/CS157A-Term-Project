// src/pages/main/student_pages/StudentMyCourses.jsx
import React, { useState, useEffect } from "react";
import { Flex, Text, Divider, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import styles from "./StudentMyCourses.module.css";

export default function StudentMyCourses() {
    const [droppedCourses, setDroppedCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const getMyCourses = async () => {
        try {
            let response = await axiosInstance.get("/api/student/mycourses");
            if (response.status === 200) {  
                const enrolled = response.data.filter(course => course.enrollment_status === 'ENROLLED');
                const dropped = response.data.filter(course => course.enrollment_status === 'DROPPED');
                setEnrolledCourses(enrolled);
                setDroppedCourses(dropped);
            }
        } 
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getMyCourses();
    }, []);

    return (
        <Flex className={styles.container} direction="column" p={4}>
            <Text fontSize="2xl">My Courses</Text>
            <Divider my={4} />
            <VStack align="start" spacing={4}>
                <Text fontSize="xl">Enrolled Courses</Text>
                {enrolledCourses.length === 0 ? (
                    <Text>No enrolled courses.</Text>
                ) : (
                    enrolledCourses.map(course => (
                        <Flex key={course.course_id} justify="space-between" width="100%">
                            <Text>{course.course_name}</Text>
                            <Button as={Link} to={`/student/course-info/${course.course_id}`} size="sm">
                                View
                            </Button>
                        </Flex>
                    ))
                )}
                <Text fontSize="xl">Dropped Courses</Text>
                {droppedCourses.length === 0 ? (
                    <Text>No dropped courses.</Text>
                ) : (
                    droppedCourses.map(course => (
                        <Text key={course.course_id}>{course.course_name}</Text>
                    ))
                )}
            </VStack>
        </Flex>
    );
}