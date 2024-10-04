import React from "react";
import Profile from "./Profile";
import CompaniesIntern from "./postedInternsShip/InternsShip";
import AddInterns from "./postedInternsShip/addInterns";
import { useParams, useLocation } from "react-router-dom";

const Comapny = () => {
  const location = useLocation();
  const id = location.state?.company_id;
  console.log(id);

  return (
    <>
      <Profile companyId={id} />
      <CompaniesIntern companyId={id} />
      <AddInterns />
    </>
  );
};

export default Comapny;
