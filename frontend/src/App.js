import CreateStudent from "./pages/main/instructor_pages/CreateStudent";
import AddCourse from "./pages/main/instructor_pages/AddCourse";
import AssignGrades from "./pages/main/instructor_pages/AssignGrades";
// src/App.js
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import WelcomePage from './pages/root/WelcomePage';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

import Student from './pages/main/Student';
import StudentCourses from './pages/main/student_pages/StudentCourses';
import StudentMyCourses from './pages/main/student_pages/StudentMyCourses';
import StudentGrades from './pages/main/student_pages/StudentGrades';
import StudentProfile from './pages/main/student_pages/StudentProfile';
import StudentDepartments from './pages/main/student_pages/StudentDepartments';
import CourseInfo from './pages/main/student_pages/CourseInfo';

import Instructor from './pages/main/Instructor';
import InstructorMyCourses from './pages/main/instructor_pages/InstructorMyCourses';
import InstructorProfile from './pages/main/instructor_pages/InstructorProfile';

import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Student Routes */}
          <Route element={<PrivateRoute role="student" />}>
            <Route path="/student" element={<Student />}>
              <Route index element={<Navigate to="mycourses" replace />} /> 
              <Route path="mycourses" element={<StudentMyCourses />} />
              <Route path="depts" element={<StudentDepartments />} />
              <Route path="depts/:id/courses" element={<StudentCourses />} />
              <Route path="course-info/:id" element={<CourseInfo />} />
              <Route path="grades" element={<StudentGrades />} />
              <Route path="profile" element={<StudentProfile />} />
            </Route>
          </Route>

          {/* Protected Instructor Routes */}
          <Route element={<PrivateRoute role="instructor" />}>
            <Route path="/instructor" element={<Instructor />}>
            <Route index element={<Navigate to="mycourses" replace />} /> 
              <Route path="mycourses" element={<InstructorMyCourses />} />
              <Route path="create-student" element={<CreateStudent />} />
              <Route path="add-course" element={<AddCourse />} />
              <Route path="assign-grades" element={<AssignGrades />} />
              <Route path="profile" element={<InstructorProfile />} />
            </Route>
          </Route>

          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;