
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Views/Home";

function App() {
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
