import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./CommonComponents/Navbar";
import SignUp from "./Pages/Signup/Signup";
import Footer from "./CommonComponents/Footer";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import CompaniesPage from "./Pages/Companies/CompaniesPage";
import Comapny from "./Pages/CompanyProfile/Comapny";
import Add from "./Pages/AddInternShip/AddInternShip";
import Edit from "./Pages/EditInternShip/EditInternShip";
import InternshipsPage from "./Pages/Internships/InternshipsPage";
import EditProfile from "./Pages/EditProfile/EditProfile";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Company/:id" element={<Comapny />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/internships" element={<InternshipsPage />} />
          <Route path="/AddInternShip/:id" element={<Add />} />
          <Route path="/EditInternShip/:id" element={<Edit />} />
          <Route path="/EditProfile/:id" element={<EditProfile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
