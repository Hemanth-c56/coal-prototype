import React from 'react'
import './authPage.css'
import {Link} from "react-router-dom"

function AuthPage(){
    return(
        <div className="login-container">
            <ul className='login-container-ul'>
                <Link to={"/head-login"}><li>Login as Head</li></Link>
                <Link to={"/gm-login"}><li>Login as GM</li></Link>
                <Link to={'/supervisor'}><li>Login as SuperVisor</li></Link>
                <Link to={'/operator'}><li>Login as WorkMen</li></Link>
            </ul>
        </div>
    )
}

export default AuthPage