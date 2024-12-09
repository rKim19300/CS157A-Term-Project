// src/pages/main/instructor_pages/InstructorProfile.jsx
import React, { useState, useEffect } from "react";
import { Flex, Text, Divider, VStack } from "@chakra-ui/react";
import axiosInstance from "../../../axiosInstance";
import styles from "./InstructorProfile.module.css";

export default function InstructorProfile() {
    const [instructorInfo, setInstructorInfo] = useState({});

    const getInstructorInfo = async () => {
        try {
            let response = await axiosInstance.get("/api/instructor/info");
            if (response.status === 200) {  
                setInstructorInfo(response.data);
            }
        } 
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getInstructorInfo();
    }, []);

    return (
        <Flex className={styles.container} direction="column" p={4}>
            <Text fontSize="2xl">Instructor Profile</Text>
            <Divider my={4} />
            <VStack align="start" spacing={2}>
                <Text><strong>Name:</strong> {instructorInfo.first_name} {instructorInfo.last_name}</Text>
                <Text><strong>Email:</strong> {instructorInfo.email}</Text>
                <Text><strong>Department:</strong> {instructorInfo.department}</Text>
                {/* Add more instructor details as needed */}
            </VStack>
        </Flex>
    );
}