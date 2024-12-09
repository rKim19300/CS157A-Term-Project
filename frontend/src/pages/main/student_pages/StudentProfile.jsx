// src/pages/main/student_pages/StudentProfile.jsx
import React, { useState, useEffect } from 'react';
import { Flex, Text, VStack, Divider } from "@chakra-ui/react";
import axiosInstance from '../../../axiosInstance';
import styles from "./StudentProfile.module.css";

export default function StudentProfile() {
    const [studentInfo, setStudentInfo] = useState({});

    const getStudentInfo = async () => {
        try {
            const response = await axiosInstance.get("/api/student/info");
            if (response.status === 200) {  
                setStudentInfo(response.data);
            }
        } catch (error) {
            console.error('Error fetching student info:', error);
        }
    }

    useEffect(() => {
        getStudentInfo();
    }, []);

    return (
        <Flex className={styles.container} direction="column" p={4}>
            <Text fontSize="2xl" fontWeight="bold">Student Profile</Text>
            <Divider my={4} />
            <VStack align="start" spacing={4}>
                <Flex w="100%">
                    <Text className={styles.headerText} w="150px"><strong>Name:</strong></Text>
                    <Text className={styles.formText}>{studentInfo.first_name} {studentInfo.last_name}</Text>
                </Flex>
                <Flex w="100%">
                    <Text className={styles.headerText} w="150px"><strong>Email:</strong></Text>
                    <Text className={styles.formText}>{studentInfo.email}</Text>
                </Flex>
                <Flex w="100%">
                    <Text className={styles.headerText} w="150px"><strong>Major:</strong></Text>
                    <Text className={styles.formText}>{studentInfo.major}</Text>
                </Flex>
                <Flex w="100%">
                    <Text className={styles.headerText} w="150px"><strong>Academic Year:</strong></Text>
                    <Text className={styles.formText}>{studentInfo.academic_year}</Text>
                </Flex>
            </VStack>
        </Flex>
    );
}