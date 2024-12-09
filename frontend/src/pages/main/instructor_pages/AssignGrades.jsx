// src/pages/main/instructor_pages/AssignGrades.jsx
import React, { useState, useEffect } from 'react';
import { Flex, Text, Divider, VStack, Select, Button, Table, Thead, Tbody, Tr, Th, Td, useToast } from "@chakra-ui/react";
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import styles from "./AssignGrades.module.css";

export default function AssignGrades() {
    const { course_id } = useParams();
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [grade, setGrade] = useState('');
    const toast = useToast();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axiosInstance.get(`/api/instructor/courses/${course_id}/students`);
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };
        fetchStudents();
    }, [course_id]);

    const handleAssignGrade = async () => {
        try {
            const response = await axiosInstance.post(`/api/instructor/courses/${course_id}/assign-grade`, { student_id: selectedStudent, grade });
            if (response.status === 200) {
                toast({
                    title: "Grade assigned successfully.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                // Refresh students list
                const updatedResponse = await axiosInstance.get(`/api/instructor/courses/${course_id}/students`);
                setStudents(updatedResponse.data);
                setSelectedStudent('');
                setGrade('');
            }
        } catch (error) {
            console.error('Assigning grade failed:', error);
            toast({
                title: "Failed to assign grade.",
                description: error.response?.data?.message || "An error occurred.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex className={styles.container} direction="column" p={4}>
            <Text fontSize="2xl" mb={4}>Assign Grades</Text>
            <Divider my={4} />
            <VStack align="start" spacing={4}>
                <Select placeholder="Select Student" value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                    {students.map(student => (
                        <option key={student.student_id} value={student.student_id}>
                            {student.first_name} {student.last_name}
                        </option>
                    ))}
                </Select>
                <Select placeholder="Select Grade" value={grade} onChange={(e) => setGrade(e.target.value)}>
                    <option value="A">A</option>
                    <option value="A_MINUS">A-</option>
                    <option value="B_PLUS">B+</option>
                    <option value="B">B</option>
                    <option value="B_MINUS">B-</option>
                    <option value="C_PLUS">C+</option>
                    <option value="C">C</option>
                    <option value="C_MINUS">C-</option>
                    <option value="D_PLUS">D+</option>
                    <option value="D">D</option>
                    <option value="D_MINUS">D-</option>
                    <option value="F">F</option>
                </Select>
                <Button colorScheme="teal" onClick={handleAssignGrade} disabled={!selectedStudent || !grade}>
                    Assign Grade
                </Button>
            </VStack>
            <Divider my={4} />
            <Text fontSize="xl" mb={2}>Assigned Grades</Text>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Student Name</Th>
                        <Th>Grade</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {students.map(student => (
                        <Tr key={student.student_id}>
                            <Td>{student.first_name} {student.last_name}</Td>
                            <Td>{student.grade || 'N/A'}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Flex>
    );
}