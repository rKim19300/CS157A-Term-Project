// src/pages/main/student_pages/Student.jsx
import StudentSideBar from "../../components/StudentSideBar";
import TopBar from "../../components/TopBar";
import { Flex } from "@chakra-ui/react";
import styles from "./Student.module.css";
import { Outlet } from "react-router-dom";

export default function Student() {
    return (
        <Flex className={styles.container}>
            <TopBar />
            <Flex className={styles.menuContent}>
                <StudentSideBar />
                <Outlet />
            </Flex>
        </Flex>
    );
}