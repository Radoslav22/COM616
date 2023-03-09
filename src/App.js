
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./config/firebaseConfig";
import Home from "./Views/Home";
import Login from './Views/Login';
import SignUp from './Views/Signup'


function App() {
  const app = initializeApp(firebaseConfig);
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
