import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from './landingPage/landing'
import HeadLogin from './authentication/head/headLogin';
import Head from "./users/head/head.jsx"
import Gm from './users/gm/gm.jsx';
import { AuthContext } from './components/context/auth-context.jsx';

import './app.css'
import GmLogin from './authentication/gm/gmLogin.jsx';
import CreateMinesForm from './users/gm/createMines.jsx';
import SuperVisor from './users/supervisor/supervisor.jsx';
import Operator from './users/operator/operator.jsx';
import WorkersForm from './components/workers/shiftWorkers.jsx';
import Smp from './components/smp/smp.jsx';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const [company, setCompany] = useState();
  const [post, setPost] = useState();

  const login = (uId, uCompany, uPost)=>{
    setIsLoggedIn(true);
    setUserId(uId);
    setCompany(uCompany)
    setPost(uPost);
  }

  const logout = ()=>{
    setIsLoggedIn(false)
    setUserId(null);
    setCompany(null)
    setPost(null);
  }

  let routes;

  if(isLoggedIn){
    if(post === 'Head'){
      routes = (
        <React.Fragment>
          <Route path='/' element={<Head/>}/>
          <Route path='*' element={<Navigate to={"/"}/>}></Route>
        </React.Fragment>
      )
    }
    else if(post === 'Gm'){
      routes = (
        <React.Fragment>
          <Route path='/' element={<Gm/>}/>
          <Route path='/mines-form' element={<CreateMinesForm />}></Route>
          <Route path='*' element={<Navigate to={"/"}/>}></Route>
        </React.Fragment>
      )
    }
  }
  else{
    routes = (
      <React.Fragment>
        <Route path="/" element={<LandingPage/>}/>
        <Route path='/head-Login' element={<HeadLogin/>}/>
        <Route path='/gm-login' element={<GmLogin/>}/>
        <Route path='/supervisor' element={<SuperVisor />} />
        <Route path='/operator' element={<Operator />} />
        <Route path='/addOperator/:sid' element={<WorkersForm />} />
        <Route path='/smp' element={<Smp />} />
        <Route path='*' element={<Navigate to={"/"}/>}></Route>
      </React.Fragment>
    )
  }

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, userId: userId, company: company, post: post, login: login, logout: logout}}>
      <Router>
        <Routes>
          {routes}  
        </Routes>
      </Router>
    </AuthContext.Provider>
  )
}

export default App