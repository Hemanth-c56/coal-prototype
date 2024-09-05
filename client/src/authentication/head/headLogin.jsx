import React, {useContext, useState} from "react";
import axios from "axios";

import ErrorModal from "../../components/UI/errorModal";
import {AuthContext} from "../../components/context/auth-context.jsx"
import "./headLogin.css";

function HeadLogin() {

    const [name, setName] = useState("");
    const [lisence, setLisence] = useState("");
    const [company, setCompany] = useState("");
    const [errorText, setErrorText] = useState();
    const auth = useContext(AuthContext)

    const nameHanlder = (event)=>{
        setName(event.target.value)
    }

    const selectCompanyHanlder = (event)=>{
        setCompany(event.target.value);
    }
    
    const lisenceHandler = (event)=>{
        setLisence(event.target.value);
    }
    
    const clearError = ()=>{
      setErrorText("");
    }

    const formSubmitHanlder = async (event)=>{
        event.preventDefault();
        
        try{
          const user = await axios.post('http://localhost:5000/api/v1/heads', {name, lisence, company})
          auth.login(user.data.head._id, user.data.head.company, user.data.head.post) 
        }
        catch(error){
          setErrorText(error.response.data.message)
        }
    }
  return (
    <React.Fragment>
      <ErrorModal error={errorText} onClear={clearError} />
      <header>
        <h1>Ministry Of Coal</h1>
      </header>
      <section>
        <h1 style={{ textAlign: "center" }}>Head Name</h1>
        <form action="" className="form-head" onSubmit={formSubmitHanlder}>
          <div>
            <label htmlFor="">Name</label>
            <input type="text" placeholder="enter your name" onChange={nameHanlder} value={name} required/>
          </div>
          <div>
            <label htmlFor="">Lisence Number</label>
            <input type="password" placeholder="enter your password" onChange={lisenceHandler} value={lisence} required/>
          </div>
          <div>
            <label htmlFor="">Company</label>
            <select name="cars" id="cars" onChange={selectCompanyHanlder}>
              <option style={{backgroundColor: "black", color: "white"}} value="">Select Company</option>
              <option value="sccl">Singareni Collories</option>
              <option value="cil">Coal India Lmt</option>
              <option value="ccl">Central CoalField lmt</option>
            </select>
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </section>
    </React.Fragment>
  );
}

export default HeadLogin;
