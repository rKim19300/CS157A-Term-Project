// src/components/TopBar.jsx
import React, { useContext } from 'react';
import { Flex, Text, Spacer } from "@chakra-ui/react";
import LogoutButton from './LogoutButton';
import { AuthContext } from '../context/AuthContext';

export default function TopBar() {
    const { user } = useContext(AuthContext);
    const { role } = user || {};

    const firstName = sessionStorage.getItem("firstName") || "FirstName";
    const lastName = sessionStorage.getItem("lastName") || "LastName";

    return (
        <Flex bg="blue.500" color="white" p={4} align="center">
            <Text fontSize="xl">Student Management System</Text>
            <Spacer />
            <Text mr={4}>{firstName} {lastName}</Text>
            <LogoutButton />
        </Flex>
    );
}