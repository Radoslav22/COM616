
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./config/firebaseConfig";
import Home from "./Views/Home";
import Login from './Views/Login';
import SignUp from './Views/Signup'
import useAuth from './services/firebase/useAuth';
import ProtectedRoutes from './Components/protectedRoutes';


function App() {
  const app = initializeApp(firebaseConfig);

  const { createEmailUser, signInEmailUser } =
    useAuth();


  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Home />} />
          </Route>
          <Route path="/login" element={<Login signInEmailUser={signInEmailUser} />} />
          <Route path="/signup" element={<SignUp createEmailUser={createEmailUser} />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
