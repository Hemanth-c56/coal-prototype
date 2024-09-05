import React, { useContext, useEffect, useState } from "react";
import axios from "axios"

import { AuthContext } from "../../components/context/auth-context";
import Modal from "../../components/UI/modal";
import ErrorModal from "../../components/UI/errorModal";
import "./head.css";

const companyName = {
  sccl: "Singareni Collories",
  cil: "Coal India Limited",
};

function Head() {

  const [formOpen, setFormOpen] = useState(false);  
  const [gmName, setGmName] = useState();
  const [gmKey, setGmKey] = useState();
  const [errorText, setErrorText] = useState();
  const [gms, setGms] = useState([])
  const auth = useContext(AuthContext);
  const company = auth.company || 'sccl';

  const fetchGms = async ()=>{
    const response = await axios.get('http://localhost:5000/api/v1/gms',  {
      params: {
        company,
      },
    }
    )
    setGms(response.data.gms)
  }

  useEffect(()=>{
    fetchGms()
  },[])
  
  const formOpenHandler = ()=>{
    setFormOpen(true);
  }

  const formCloseHandler = ()=>{
    setFormOpen(false);
  }

  const GenerateKey = (event)=>{
    event.preventDefault();
    setGmKey(Math.floor(1000 + Math.random() * 9000));
  }

  const clearError = ()=>{
    setErrorText("");
  }

  const formSubmitHandler = async ()=>{
    setFormOpen(false);
    try{
      await axios.post('http://localhost:5000/api/v1/gms', {gmName, gmKey, company})
      fetchGms()
    }
    catch(error){
      setErrorText(error.response.data.message);
    }
  }

  return (
    <React.Fragment>
      <ErrorModal error={errorText} onClear={clearError} />
      <Modal
        show={formOpen}
        onCancel={formCloseHandler}
        header="landing Collories"
        contentClass="Place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<div><button onClick={formCloseHandler}>CLOSE</button> <button onClick={formSubmitHandler}>SUBMIT</button></div>}
      >
        <form>
            <input type="text" placeholder="enter Gms name" onChange={(e)=>setGmName(e.target.value)} value={gmName} />
            <input type="number" onChange={(e)=>setGmKey(e.target.value)} value={gmKey} />
            <button onClick={GenerateKey}>Generate Key</button>
        </form>
      </Modal>

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
      <section className="head-section">
        <h2 className="title-heading">General Managers</h2>
        <div className="gm-container">
          {gms.map((gm,index)=>{
            return(
              <div key={index} className="gm-card">
              <h2>{gm.name}</h2>
              </div>
            )})
          }
          <button onClick={formOpenHandler}>Add GM</button>
        </div>
        <h2 className="title-heading">Mines</h2>
        <div className="mines-container">
          <div className="mines-card">RG-0</div>
          <div className="mines-card">RG-1</div>
          <div className="mines-card">RG-2</div>
          <div className="mines-card">RG-3</div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Head;
