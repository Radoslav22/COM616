
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./config/firebaseConfig";
import Map from "./Views/Map";
import Login from './Views/Login';
import SignUp from './Views/Signup'
import useAuth from './services/firebase/useAuth';
import ProtectedRoutes from './Components/protectedRoutes';
import Book from './Views/Book'
import Home from "./Views/Home"
import Booking from "./Views/Booking"


function App() {
  const app = initializeApp(firebaseConfig);

  const { createEmailUser, signInEmailUser } =
    useAuth();


  return (
    <div className="app">
      <BrowserRouter>
        <Routes>

          <Route element={<ProtectedRoutes />}><Route path='/restaurants' element={<Map />} /></Route>
          <Route path='/' element={<Home />}></Route>
          <Route element={<ProtectedRoutes />}><Route path='/book/:restaurant_id' element={<Book />} /></Route>
          <Route element={<ProtectedRoutes />}><Route path='/book-table/:table_id' element={<Booking />} /></Route>
          <Route path="/login" element={<Login signInEmailUser={signInEmailUser} />} />
          <Route path="/signup" element={<SignUp createEmailUser={createEmailUser} />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
