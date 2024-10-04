import React from "react";
import Profile from "./Profile";
import CompaniesIntern from "./postedInternsShip/InternsShip";
import AddInterns from "./postedInternsShip/addInterns";
import { useParams } from 'react-router-dom';
const Comapny = () => {
  const { id } = useParams();
  return (
    <>
      <Profile companyId={id}/>
      <CompaniesIntern companyId={id}/>
      <AddInterns/>
      </>
  );
};

export default Comapny;
