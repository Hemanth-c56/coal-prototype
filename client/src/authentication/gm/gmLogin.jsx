import React, {useContext, useState} from "react";
import axios from "axios";

import ErrorModal from "../../components/UI/errorModal";
import {AuthContext} from "../../components/context/auth-context.jsx"

function GmLogin(){

    const [gmName, setGmName] = useState();
    const [gmKey, setGmKey] = useState();
    const [errorText, setErrorText] = useState();
    const auth = useContext(AuthContext)

    const clearError = ()=>{
        setErrorText("");
    }

    const formSubmitHanlder = async (event)=>{
        event.preventDefault();
        try{
            const user = await axios.post('http://localhost:5000/api/v1/gms/gms-login', {gmName, gmKey})
            auth.login(user.data.gm._id, user.data.gm.company, user.data.gm.post) 
        }
        catch(error){
            setErrorText(error.response.data.message)
        }
    }

    return(
        <React.Fragment>
      <ErrorModal error={errorText} onClear={clearError} />
      <header>
        <h1>Ministry Of Coal</h1>
      </header>
      <section>
        <h1 style={{ textAlign: "center" }}>GM</h1>
        <form action="" className="form-head" onSubmit={formSubmitHanlder}>
          <div>
            <label htmlFor="">Name</label>
            <input type="text" placeholder="enter your name" onChange={(e)=>{setGmName(e.target.value)}} value={gmName} required/>
          </div>
          <div>
            <label htmlFor="">Key</label>
            <input type="Number" placeholder="enter your Key" onChange={(e)=>{setGmKey(e.target.value)}} value={gmKey} required/>
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </section>
    </React.Fragment>
    )
}

export default GmLogin