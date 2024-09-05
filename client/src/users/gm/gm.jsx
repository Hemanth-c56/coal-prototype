import React, { useContext } from "react";
import {Link} from "react-router-dom"

import { AuthContext } from "../../components/context/auth-context";

import "./gm.css";

const companyName = {
  sccl: "Singareni Collories",
  cil: "Coal India Limited",
};

function Gm() {
  const auth = useContext(AuthContext);

  return (
    <React.Fragment>
      <header className="home-header">
        <h1>{companyName[auth.company] || "Singareni Collories"}</h1>
        <button
          onClick={() => {
            auth.logout();
          }}
        >
          logout
        </button>
      </header>
      <h2 className="title-heading">Mines</h2>
      <section>
        <div className="mines-container">
          <div className="mines-card">RG-0</div>
          <div className="mines-card">RG-1</div>
          <div className="mines-card">RG-2</div>
          <div className="mines-card">RG-3</div>
        </div>
        <div style={{display: "flex", justifyContent: "center"}}>
            <Link to={'/mines-form'}><button className="add-mines-btn">Add Mines</button></Link>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Gm;
