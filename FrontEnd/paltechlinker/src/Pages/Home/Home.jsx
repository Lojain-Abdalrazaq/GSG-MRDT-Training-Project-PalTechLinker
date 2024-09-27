import React from "react";
import Header from "./Header/Header.jsx";
import Companies from "./Companies/Companies.jsx";
import Internships from "./Internships/Internships.jsx";

const Home = () => {
  return (
    <div>
      <Header />
      <Companies/>
      <Internships/>
    </div>
  );
};

export default Home;
