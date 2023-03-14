
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate, } from "react-router-dom";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./config/firebaseConfig";
import Home from "./Views/Home";
import Login from './Views/Login';
import SignUp from './Views/Signup'
import useAuth from './services/firebase/useAuth';


function App() {
  const app = initializeApp(firebaseConfig);

  const { user, isAuthenticated, createEmailUser, signInEmailUser } =
    useAuth();
  const ProtectedRoute = ({ children }) => {

    console.log(isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login" />;
  }
  console.log(isAuthenticated);
  console.log(user);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />

          <Route path="/login" element={<Login signInEmailUser={signInEmailUser} />} />
          <Route path="/signup" element={<SignUp createEmailUser={createEmailUser} />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
