// src/pages/main/instructor_pages/Instructor.jsx
import React from 'react';
// Correct Relative Imports
import InstructorSideBar from '../../components/InstructorSideBar';
import TopBar from '../../components/TopBar';
import { Flex } from "@chakra-ui/react";
import styles from "./Instructor.module.css";
import { Outlet } from 'react-router-dom';

export default function Instructor() {
    return (
        <Flex className={styles.container} direction="column" height="100vh">
            <TopBar />
            <Flex className={styles.menuContent} flex="1">
                <InstructorSideBar />
                <Outlet />
            </Flex>
        </Flex>
    );
}