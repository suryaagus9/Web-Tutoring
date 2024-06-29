import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

// Admin components
import AdminHome from "./components/Admin/AdminHome";
import EditUser from "./components/Admin/EditUser";
import EditClass from "./components/Admin/EditClass";

// Student components
import Home from "./components/Student/Home";
import About from "./components/Student/About";
import Class from "./components/Student/Class";
import Profile from "./components/Student/Profile";
import DetailClass from "./components/Student/DetailClass";
import JoinedClass from "./components/Student/JoinedClass";
import CreateProfile from "./components/Student/CreateProfile";
import EditProfile from "./components/Student/EditProfile";

// Tutor components
import HomeTutor from "./components/Tutor/HomeTutor";
import AboutTutor from "./components/Tutor/AboutTutor";
import ClassTutor from "./components/Tutor/ClassTutor";
import DetailTutor from "./components/Tutor/DetailClassTutor";
import ProfileTutor from "./components/Tutor/ProfileTutor";
import CreateProfileTutor from "./components/Tutor/CreateProfileTutor";
import EditProfileTutor from "./components/Tutor/EditProfileTutor";
import CreateClassTutor from "./components/Tutor/CreateClassTutor";
import EditClassTutor from "./components/Tutor/EditClassTutor";
import JoinedStudent from "./components/Tutor/JoinedStudent";

import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student Routes */}
        <Route path="/adminhome" element={<PrivateRoute><AdminHome /></PrivateRoute>} />
        <Route path="/adminhome/edit-user/:user_id" element={<PrivateRoute><EditUser /></PrivateRoute>} />
        <Route path="/adminhome/edit-class/:class_id" element={<PrivateRoute><EditClass /></PrivateRoute>} />

        {/* Student Routes */}
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
        <Route path="/class" element={<PrivateRoute><Class /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/class/:class_id" element={<PrivateRoute><DetailClass /></PrivateRoute>} />
        <Route path="/joinedclass" element={<PrivateRoute><JoinedClass /></PrivateRoute>} />
        <Route path="/profile/createprofile" element={<PrivateRoute><CreateProfile /></PrivateRoute>} />
        <Route path="/profile/editprofile/:student_id" element={<PrivateRoute><EditProfile /></PrivateRoute>} />

        {/* Tutor Routes */}
        <Route path="/tutorhome" element={<PrivateRoute><HomeTutor /></PrivateRoute>} />
        <Route path="/tutorabout" element={<PrivateRoute><AboutTutor /></PrivateRoute>} />
        <Route path="/tutorclass" element={<PrivateRoute><ClassTutor /></PrivateRoute>} />
        <Route path="/tutorclass/:class_id" element={<PrivateRoute><DetailTutor /></PrivateRoute>} />
        <Route path="/tutorprofile" element={<PrivateRoute><ProfileTutor /></PrivateRoute>} />
        <Route path="/tutorjoin" element={<PrivateRoute><JoinedStudent /></PrivateRoute>} />
        <Route path="/tutorprofile/createprofile" element={<PrivateRoute><CreateProfileTutor /></PrivateRoute>} />
        <Route path="/tutorprofile/editprofile/:tutor_id" element={<PrivateRoute><EditProfileTutor /></PrivateRoute>} />
        <Route path="/tutorprofile/createclass" element={<PrivateRoute><CreateClassTutor /></PrivateRoute>} />
        <Route path="/tutorprofile/editclass/:class_id" element={<PrivateRoute><EditClassTutor /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
