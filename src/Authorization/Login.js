import React, { useState, useEffect } from "react";
import '../loginScreen.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateUser from "./CreateUser";

export default function LoginScreen(){


const [userName, setUserName] = useState('');
const [password, setPassword] = useState('');


function veryifyUser(res){
    fetch(`http://localhost:5000/login/${userName}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            userName: userName,
            password: password
        })
        
    }).then(
        res=> console.log("this Worked")
    )
}


const submitHandler = (event) =>{
    event.preventDefault()
    veryifyUser(event)
}

return (
    <div className='loginBox'>
        <h1>Login</h1>
        <br></br>
            <form className='loginForm' onSubmit={submitHandler}>
             <label>Username/Email Address</label>
             <input type='text' value={userName} onChange={(e)=> setUserName(e.target.value)}></input>
             <br></br>
            <label>Password </label>
        <input type='password' value={password} onChange={(e)=> setPassword(e.target.value)}></input>
        <br></br>
        <button  type="submit">Login</button>
    </form>
    <br></br>
    <button><Link to="/login/CreateUser" className='menuLink'>CreateUser</Link></button>
    </div>
    
)

}