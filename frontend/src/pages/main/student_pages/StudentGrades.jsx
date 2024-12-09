// src/pages/main/student_pages/StudentGrades.jsx
import React, { useState, useEffect } from "react";
import { 
    Flex, 
    Text, 
    Divider, 
    Grid,
    GridItem,
    HStack,
    VStack,
    Spinner
} from "@chakra-ui/react";
import axiosInstance from "../../../axiosInstance";
import styles from "./StudentGrades.module.css";

export default function StudentGrades() {
    const [courses, setCourses] = useState([]);
    const [gpa, setGpa] = useState(0);
    const [loading, setLoading] = useState(true);

    const getGrades = async () => {
        try {
            let response = await axiosInstance.get("/api/student/grades");
            if (response.status === 200) {  
                setCourses(response.data.courses);
                setGpa(response.data.gpa);
                setLoading(false);
            }
        } 
        catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getGrades();
    }, []);

    if (loading) return <Spinner size="xl" />;

    return (
        <Flex className={styles.container} direction="column" p={4}>
            <Text className={styles.statusText} color="#0055A2" fontSize="2xl">
              Completed Courses
            </Text>
            <Text fontSize="lg">Total GPA: {gpa.toFixed(2)}</Text>
            <Divider my={4} />
            {courses.length === 0 ? (
              <Text className={styles.messageText}>
                No completed courses.
              </Text>
            ) : (
                <VStack align="start" spacing={4}>
                    {courses.map((course) => (
                      <CourseComponent key={course.enrollment_date} course={course} />
                    ))}
                </VStack>
            )}
        </Flex>
    );
}

function CourseComponent({ course }) {
    return (
      <> 
        <VStack align="start" spacing={2}>
            <HStack>
                <Text className={styles.heading} fontSize="lg" fontWeight="bold">
                {course.dept_abbreviation} {course.course_number}: {course.course_name}
                </Text>
            </HStack>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                <GridItem>
                    <Text className={styles.infoText} fontWeight="semibold">Instructor</Text>
                    <Text>{course.instructor_first_name} {course.instructor_last_name}</Text>
                </GridItem>
                <GridItem>
                    <Text className={styles.infoText} fontWeight="semibold">Points</Text>
                    <Text>{course.points}</Text>
                </GridItem>
                <GridItem>
                    <Text className={styles.infoText} fontWeight="semibold">Grade</Text>
                    <Text>{getGrade(course.grade)}</Text>
                </GridItem>
            </Grid>     
        </VStack>
      </>
    );
}

function getGrade(grade) {
    switch (grade) {
        case 'A_MINUS':
            return 'A-';
        case 'B_PLUS':
            return 'B+';
        case 'B_MINUS':
            return 'B-';
        case 'C_PLUS':
            return 'C+';
        case 'C_MINUS':
            return 'C-';
        case 'D_PLUS':
            return 'D+';
        case 'D_MINUS':
            return 'D-';
        case 'F':
            return 'F';
        default:
            return 'N/A';
    }
}