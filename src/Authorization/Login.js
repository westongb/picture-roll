import React, { useState, useEffect } from "react";
import '../loginScreen.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function LoginScreen(){


const [userName, setUserName] = useState('');
const [password, setPassword] = useState('');







return (
    <div className='loginBox'>
        <h1>Login</h1>
        <br></br>
            <form className='loginForm'>
             <lable>Username/Email Address</lable>
             <input type='text' value={userName} onChange={(e)=> setUserName(e.target.value)}></input>
             <br></br>
            <label>Password </label>
        <input type='password' value={password} onChange={(e)=> setPassword(e.target.value)}></input>
    </form>
    <br></br>
    <button ><a href="https://localhost:3000/createuser">Create User</a></button>
    </div>
    
)

}