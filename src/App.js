
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./config/firebaseConfig";
import Home from "./Views/Home";


function App() {
  const app = initializeApp(firebaseConfig);
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Home />} />
          <Route path="/update" element={<Home />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
