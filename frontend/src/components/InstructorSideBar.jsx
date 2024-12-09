// src/components/InstructorSideBar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { VStack, Link } from "@chakra-ui/react";

export default function InstructorSideBar() {
    return (
        <VStack align="stretch" spacing={4} p={4} bg="gray.100" height="100vh">
            <Link as={NavLink} to="/instructor/mycourses">My Courses</Link>
            <Link as={NavLink} to="/instructor/create-student">Create Student</Link>
            <Link as={NavLink} to="/instructor/add-course">Add Course</Link>
            <Link as={NavLink} to="/instructor/assign-grades">Assign Grades</Link>
            <Link as={NavLink} to="/instructor/profile">Profile</Link>
            {/* Removed Logout Link */}
        </VStack>
    );
}