import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./CommonComponents/Navbar";
import SignUp from "./Pages/Signup/Signup";
import Footer from "./CommonComponents/Footer";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import CompaniesPage from "./Pages/Companies/CompaniesPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/companies" element={<CompaniesPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
