// src/components/StudentSideBar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { VStack, Link } from "@chakra-ui/react";

export default function StudentSideBar() {
    return (
        <VStack align="stretch" spacing={4} p={4} bg="gray.100" height="100vh">
            <Link as={NavLink} to="/student/mycourses">My Courses</Link>
            <Link as={NavLink} to="/student/depts">Departments</Link>
            <Link as={NavLink} to="/student/grades">Grades</Link>
            <Link as={NavLink} to="/student/profile">Profile</Link>
            {/* Removed Logout Link */}
        </VStack>
    );
}