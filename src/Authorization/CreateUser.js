import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../loginScreen.css';

export default function CreateUser(){


const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [password, setPassword] = useState('');
const [emailAddress, setEmailAddress] = useState('');
const [userName, setUserName] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');



function postUser(res){
    fetch("http://localhost:5000/UserInfo/new", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            FirstName: firstName,
            LastName: lastName,
            EmailAddress: emailAddress,
            UserName: userName,
            Password: confirmPassword
        })
        
    }).then(
        res=> console.log("this Worked")
    )
}

function submitHandler(event) {
    postUser(event)
}


return (
    <div className='loginBox'>
        <h1>Create User</h1>
        <br></br>
            <form className='loginForm' onSubmit={submitHandler}>
            <label>First Name<abbr title="This field is mandatory" aria-label="required">*</abbr></label>
             <input type='text' value={firstName} onChange={(e)=> setFirstName(e.target.value)} required></input>
             <label>Last Name<abbr title="This field is mandatory" aria-label="required">*</abbr></label>
             <input type='text' value={lastName} onChange={(e)=> setLastName(e.target.value)} required></input>
             <br></br>
             <label>Email Address<abbr title="This field is mandatory" aria-label="required">*</abbr></label>
             <input type='email' value={emailAddress} onChange={(e)=> setEmailAddress(e.target.value)} required></input>
             <br></br>
             <label>UserName<abbr title="This field is mandatory" aria-label="required">*</abbr></label>
             <input type='text' value={userName} onChange={(e)=> setUserName(e.target.value)} required></input>
             <br></br>
            <label>Password <abbr title="This field is mandatory" aria-label="required">*</abbr></label>
        <input type='password' value={password} onChange={(e)=> setPassword(e.target.value)} required></input>
            <br></br>
            <label>Confirm Password<abbr title="This field is mandatory" aria-label="required">*</abbr> </label>
        <input type='password' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} required></input>
        <br></br>
        <button>Submit</button>
    </form>
    </div>
)
}