import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PasswordRecovery from "./pages/PasswordRecovery";
import Otp from "./pages/Otp";
import NewPassword from "./pages/NewPassword";
import Home  from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/test" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
