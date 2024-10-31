//import useContext
import React, { useContext } from 'react';

//import context
import { AuthContext } from '../context/AuthContext.jsx';

//import react router dom
import { Routes, Route, Navigate } from "react-router-dom";

//import view home
import Home from "../views/home/index.jsx";

//import view register
import Register from "../views/auth/register.jsx";

//import view login
import Login from "../views/auth/login.jsx";
import Dashboard from '../views/admin/dashboard/index.jsx';
import UsersIndex from '../views/admin/dashboard/users/index.jsx';
import UsersCreate from '../views/admin/dashboard/users/create.jsx';
import UsersEdit from '../views/admin/dashboard/users/edit.jsx';

export default function AppRoutes() {

    //destructure context "isAuthenticated"
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <Routes>
            {/* route "/" */}
            <Route path="/" element={<Home />} />

            {/* route "/register" */}
            <Route path="/register" element={
                isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Register />
            } />

            {/* route "/login" */}
            <Route path="/login" element={
                isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <Login />
            } />

            {/* route "/admin/dashboard" */}
            <Route path="/admin/dashboard" element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
            } />


            {/* route "/admin/users" */}
            <Route path="/admin/users" element={
                isAuthenticated ? <UsersIndex /> : <Navigate to="/login" replace />
            } />

            {/* route "/admin/users/create" */}
            <Route path="/admin/users/create" element={
                isAuthenticated ? <UsersCreate /> : <Navigate to="/login" replace />
            } />

            {/* route "/admin/users/edit/:id" */}
            <Route path="/admin/users/edit/:id" element={
                isAuthenticated ? <UsersEdit /> : <Navigate to="/login" replace />
            } />
        </Routes>
    );
}