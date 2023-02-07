import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import SignIn from "../Page/SignIn";
import SignUp from "../Page/SignUp";
import Dashboard from "../Page/Dashboard";

const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate replace to="/signin" />} />
    </Routes>
  );
};

export default RoutesMain;